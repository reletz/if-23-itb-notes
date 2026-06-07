---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Attacker-Oriented Code Review
>
> > ## Questions/Cues
> >
> > - Apa beda cara engineer membaca kode dengan cara attacker membacanya?
> > - Bagaimana empat langkah code review ala attacker (entry points → trace → authz → errors)?
> > - Apa yang harus ditelusuri saat mengikuti parameter `limit` di endpoint search Gitea?
> > - Tiga pertanyaan apa yang harus diajukan pada setiap authorization check?
> > - Bagaimana error response menjadi "oracle" yang membantu enumerasi repo privat?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W13 Attacker Mindset — bagian "Module 2: Attacker-oriented code review")
>
> > ### Membaca Kode ala Attacker
> >
> > **Engineer membaca kode untuk memahami apa yang kode itu lakukan.** **Attacker membaca apa yang kode itu terima dari luar (accepts from outside) dan apa yang dilakukannya terhadap input tersebut.** Pergeseran fokus ini melahirkan empat langkah review:
> >
> > 1. **Find the entry points** — di mana data tidak tepercaya (untrusted) masuk? HTTP handlers, query params, request body, file uploads, auth headers.
> > 2. **Trace the data inward** — ikuti sebuah parameter dari titik masuk hingga ke business logic. **Setiap asumsi yang dibuat kode tentang input adalah sebuah test case.**
> > 3. **Find the authorization checks** — apakah pengecekan ada di tempat yang benar? Pada hal yang benar? Adakah cabang di mana pengecekan dilewati sepenuhnya?
> > 4. **Read error handling like an attacker** — error yang berbeda untuk hasil logis yang sama = sebuah **oracle**. Oracle memungkinkan kita mengajukan pertanyaan ya/tidak tentang sistem.
> >
> > ### Step 1 — Find the Entry Points (Gitea Search Endpoint)
> >
> > Contoh konkret memakai Gitea: buka `routers/api/v1/repo/repo.go` dan lihat handler **Search**. Endpoint-nya:
> >
> > `GET /api/v1/repos/search?q=&topic=&limit=&page=`
> >
> > Pertanyaan kunci: **berapa banyak parameter ini yang dikontrol oleh pengguna yang tidak terautentikasi (unauthenticated)?** Jawabannya: **semuanya.** Hal-hal yang dicari di entry point antara lain: **route handlers**, **query params & path variables**, **request body fields**, **auth & cookie headers**, **file uploads**, dan **websocket messages**. Setiap titik ini adalah pintu masuk data yang sepenuhnya dikuasai penyerang.
> >
> > ### Step 2 — Trace the Data Inward (Parameter `limit`)
> >
> > Telusuri perjalanan satu parameter, `limit`, melalui tiga tahap:
> >
> > 1. **Masuk sebagai string** dari URL query string.
> > 2. **Diparse menjadi integer.**
> > 3. **Diteruskan ke database sebagai `LIMIT n`.**
> >
> > Pertanyaan attacker di setiap tahap: **apakah ada validasi di sini? Apa yang terjadi bila tidak ada?** Deck memetakan apa yang mungkin terjadi untuk berbagai nilai `limit`:
> >
> > | Nilai `limit` | Kemungkinan akibat |
> > | --- | --- |
> > | `999999999` | **DoS?** (memaksa query mengambil data sangat besar) |
> > | `-1` | **SQL error?** |
> > | `0` | **Empty result?** |
> > | `"abc"` | **Parse error?** |
> >
> > Prinsipnya: **tuliskan setiap asumsi yang dibuat kode tentang input — setiap asumsi adalah sebuah test case.** Misalnya kode mengasumsikan `limit` selalu integer positif yang wajar; setiap penyimpangan dari asumsi itu layak diuji.
> >
> > ### Step 3 — Authorization Checks → Elevation of Privilege
> >
> > **Di sinilah Elevation of Privilege (EoP) bersarang.** Baca setiap permission check **dengan curiga (with suspicion)**. Tiga pertanyaan yang harus diajukan:
> >
> > - **Di mana posisi pengecekan?** (Where is the check positioned?) Apakah di awal fungsi, atau terkubur di tengah? Bisakah aksi sensitif dijangkau **sebelum** pengecekan berjalan?
> > - **Apakah mengecek hal yang benar?** (Is it checking the right thing?) Misalnya kode mengecek bahwa user *memiliki* sebuah resource — tetapi tidak mengecek apakah resource itu *privat*. **Celah itu dapat dieksploitasi.**
> > - **Adakah cabang yang melewati pengecekan?** (Is there a branch that skips the check?) Perhatikan blok `if isAdmin` — apa isi `else`-nya? Adakah jalur yang mencapai aksi sensitif tanpa syarat (unconditionally)?
> >
> > Latihan Gitea: di `routers/api/v1/repo/repo.go`, temukan tempat kode mengecek apakah sebuah repo bersifat **private**, lalu telusuri apakah pemanggil **unauthenticated** dapat menjangkau data itu.
> >
> > ### Step 4 — Errors as Oracles
> >
> > **Engineer menulis error handling agar membantu (helpful). Attacker membaca error untuk memetakan sistem (map the system).** Setiap respons error membocorkan informasi:
> >
> > | Error response | Apa yang dipelajari attacker |
> > | --- | --- |
> > | **404 Not Found** | Resource tidak ada — *atau* kamu tidak boleh tahu bahwa ia ada |
> > | **403 Forbidden** | Resource memang ada — kamu hanya tidak boleh mengaksesnya |
> > | **500 Internal Error** | Kamu menyentuh jalur kode tak terduga — menarik |
> > | **Stack trace in body** | Seluruh jalur kode internal terungkap ke pemanggil |
> >
> > **Kode error berbeda untuk hasil logis yang sama = sebuah oracle.** Oracle membiarkan attacker mengajukan pertanyaan ya/tidak tentang sistem. Contoh Gitea: bandingkan `/api/v1/repos/owner/nonexistent` dengan sebuah repo privat. **Jika responsnya berbeda, attacker dapat melakukan enumerasi nama repo privat** — perbedaan 404 vs 403 membocorkan keberadaan resource yang seharusnya rahasia.

> [!cornell] #### Summary
>
> **Attacker-oriented code review** membaca kode bukan untuk memahami fungsinya, melainkan **apa yang ia terima dari luar dan apa yang dilakukannya**, lewat empat langkah. **Step 1 — find entry points**: di Gitea `GET /api/v1/repos/search` semua parameternya (`q`, `topic`, `limit`, `page`) dikuasai pengguna unauthenticated; cari pula body, header auth/cookie, file upload, websocket. **Step 2 — trace data inward**: ikuti `limit` (string → int → `LIMIT n`) dan uji nilai ekstrem (`999999999`→DoS, `-1`→SQL error, `0`→empty, `"abc"`→parse error); setiap asumsi kode adalah test case. **Step 3 — authorization checks** tempat **EoP** bersarang: periksa posisi check, apakah mengecek hal yang benar (mis. kepemilikan tapi bukan status privat), dan adakah cabang yang melewatinya. **Step 4 — errors as oracles**: 404/403/500/stack trace masing-masing membocorkan info; respons berbeda untuk hasil logis sama menjadi oracle yang memungkinkan **enumerasi repo privat**.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Taint Analysis Otomatis (DI LUAR sumber)
> Penelusuran data dari entry point ke sink ("trace the data inward") dapat diotomasi dengan **taint analysis**: input dari sumber tidak tepercaya (source) ditandai "tainted", lalu dilacak hingga ke operasi berbahaya (sink) seperti query SQL atau `exec`. Tool SAST seperti **CodeQL**, **Semgrep**, atau **Snyk Code** mengimplementasikan ini, sehingga sebagian Step 1–2 dapat diskalakan ke basis kode besar. Namun keputusan tentang *kebenaran logika otorisasi* (Step 3) tetap memerlukan tinjauan manusia karena bersifat kontekstual.
>
> #### Lebih dalam — Mencegah Error Oracle (DI LUAR sumber)
> Untuk menutup oracle 404-vs-403, praktik yang umum adalah **mengembalikan respons yang seragam** (mis. selalu 404) untuk resource yang tidak boleh diketahui keberadaannya oleh pemanggil, dan **tidak pernah mengirim stack trace ke klien** di lingkungan produksi (catat ke log internal saja). Selain itu, **timing yang konstan** mencegah oracle berbasis waktu. Tujuannya: jadikan dua hasil yang secara logis berbeda *tidak dapat dibedakan* dari sisi penyerang.
>
> #### Proyek Eksplorasi Mandiri
> 1. Clone Gitea, buka `routers/api/v1/repo/repo.go`, dan tandai sendiri keempat langkah: daftar entry point, jejak parameter `limit`, lokasi pengecekan repo private, dan jenis-jenis respons error.
> 2. Pada sebuah API lab, kirim permintaan ke resource yang tidak ada vs resource privat milik orang lain; catat apakah kode/teks/ukuran responsnya berbeda (uji apakah ada oracle).
> 3. Tulis aturan Semgrep sederhana yang menandai handler yang membaca query param lalu meneruskannya ke query DB tanpa validasi rentang.
>
> #### Bacaan Lanjutan
> - OWASP Code Review Guide.
> - Dokumentasi CodeQL/Semgrep tentang taint tracking.
> - OWASP WSTG — "Testing for Authorization" dan "Testing for Improper Error Handling".
