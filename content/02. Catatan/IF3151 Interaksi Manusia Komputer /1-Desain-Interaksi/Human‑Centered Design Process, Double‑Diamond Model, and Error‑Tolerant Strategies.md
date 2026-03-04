---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Human‑Centered Design Process, Double‑Diamond Model, and Error‑Tolerant Strategies
>
> > ## Questions/Cues
> >
> > - Mengapa “user error” dianggap kegagalan desain?
> > - Bagaimana Double‑Diamond memandu penemuan masalah?
> > - Apa langkah utama dalam siklus HCD empat tahap?
> > - Perbedaan utama antara slip dan mistake?
> > - Strategi apa yang mengurangi konsekuensi kesalahan pengguna?
> > - Bagaimana forcing function bekerja dalam konteks nyata?
> > - Metode apa untuk menguji ketahanan terhadap error?
> >
> > ## Reference Points
> >
> > - IF3151_Desain_Interaksi.pdf (Halaman 27‑30) – Filosofi HCD, Double‑Diamond, proses empat tahap
> > - IF3151_Desain_Interaksi.pdf (Halaman 32‑37) – Tipe error manusia, penyebab sistemik, strategi toleransi error
>
> > ### Filosofi Human‑Centered Design (HCD)
> >
> > Human‑Centered Design (HCD) menekankan bahwa teknologi harus melayani kebutuhan, kemampuan, dan batasan manusia, bukan sebaliknya. Prinsip dasarnya adalah menggeser perspektif dari “user error” menjadi “design failure”. Artinya, ketika pengguna melakukan kesalahan, penyebab utama biasanya terletak pada cara sistem dirancang: antarmuka yang tidak jelas, prosedur yang rumit, atau kurangnya petunjuk yang memadai. Dengan mengadopsi mindset ini, desainer berkomitmen untuk mengidentifikasi dan memperbaiki akar penyebab kegagalan sistem, bukan menyalahkan pengguna.
> >
> > Contoh konkret dapat dilihat pada sistem check‑in bandara yang dulu mengharuskan penumpang mengisi formulir manual sambil menunggu panggilan. Kesalahan input data sering terjadi karena formulir tidak menampilkan contoh yang jelas. Dengan mengubah desain menjadi antarmuka digital yang menampilkan contoh real‑time dan validasi otomatis, kesalahan berkurang drastis, menunjukkan bagaimana HCD mengubah “user error” menjadi “design improvement”.
> >
> > Filosofi ini juga menuntut produk menjadi **usable**, **understandable**, **enjoyable**, dan **resilient to error**. Keempat kualitas tersebut saling melengkapi: sebuah sistem yang mudah dipahami akan mengurangi beban kognitif, sehingga pengguna lebih menikmati interaksi dan lebih mampu mengatasi atau menghindari kesalahan.
> >
> > ### Model Double‑Diamond
> >
> > Model Double‑Diamond, yang dipopulerkan oleh British Design Council, menggambarkan proses desain sebagai dua berlian berurutan: fase pertama untuk menemukan masalah yang tepat, dan fase kedua untuk menemukan solusi yang tepat. Setiap berlian memiliki dua tahap: **Diverge** (mengeksplorasi secara luas) dan **Converge** (menyaring dan memfokuskan). Pada fase pertama, tim desainer mengamati pengguna dalam konteks nyata, mengumpulkan data kualitatif, dan mengidentifikasi kebutuhan tersembunyi. Setelah itu, mereka menyaring temuan menjadi definisi masalah yang jelas.
> >
> > Pada fase kedua, proses divergen kembali terjadi melalui ideasi kreatif—brainstorming tanpa penilaian, penciptaan konsep liar, dan eksplorasi alternatif. Kemudian, fase konvergen menyeleksi ide‑ide paling menjanjikan, mengembangkan prototipe, dan menguji solusi secara iteratif. Model ini menekankan pentingnya **iterasi** dan **toleransi terhadap ambiguitas**, karena penemuan masalah yang tepat seringkali memerlukan waktu dan eksplorasi yang mendalam.
> >
> > Analogi yang berguna: bayangkan seorang arkeolog yang menggali situs bersejarah. Pada awalnya, ia menggali area luas (diverge) untuk menemukan artefak apa pun. Setelah menemukan beberapa petunjuk, ia mempersempit fokus pada area yang paling menjanjikan (converge) untuk mengungkap struktur utama situs. Demikian pula, Double‑Diamond membantu tim desain menemukan inti masalah sebelum beralih ke solusi.
> >
> > ### Proses Human‑Centered Design Empat Tahap
> >
> > **1. Observation (Observasi)**
> >
> > Pada tahap ini, desainer melakukan etnografi terapan: mengamati pengguna dalam lingkungan alami mereka, mencatat aktivitas, tujuan, frustrasi, serta strategi kerja‑samping (workarounds). Fokusnya bukan pada demografi semata, melainkan pada **aktivitas**—apa yang sebenarnya dilakukan pengguna untuk mencapai tujuan mereka. Misalnya, dalam merancang aplikasi musik, tim dapat mengamati bagaimana pengguna beralih antara playlist, menyesuaikan volume, dan berbagi lagu di media sosial, sambil mencatat titik-titik kebingungan atau langkah berulang yang tidak efisien.
> >
> > **2. Idea Generation (Ideasi)**
> >
> > Ideasi menuntut **brainstorming tanpa penilaian** dan dorongan untuk mengajukan “pertanyaan bodoh” yang menantang asumsi yang ada. Kuantitas diprioritaskan atas kualitas pada tahap awal, karena banyak ide meningkatkan peluang menemukan solusi inovatif. Teknik seperti *Crazy‑8s* atau *SCAMPER* dapat mempercepat proses ini. Contoh: tim dapat menghasilkan ide untuk kontrol suara, gestur, atau integrasi AI dalam aplikasi musik, meskipun beberapa ide tampak tidak realistis pada awalnya.
> >
> > **3. Prototyping (Prototipe)**
> >
> > Prototipe dibuat cepat dan dengan fidelitas rendah (sketsa kertas, mockup digital, atau role‑play). Metode “Wizard of Oz” memungkinkan simulasi sistem kompleks dengan manusia yang berperan di belakang layar, sehingga tim dapat menguji konsep tanpa mengembangkan kode penuh. Misalnya, untuk menguji fitur rekomendasi lagu berbasis AI, tim dapat menyiapkan daftar lagu yang dipilih secara manual oleh peneliti, memberi kesan bahwa sistem otomatis menghasilkan rekomendasi.
> >
> > **4. Testing (Pengujian)**
> >
> > Pengujian melibatkan pengguna yang berinteraksi dengan prototipe sambil **think‑aloud** (berpikir keras). Observasi mencatat tindakan, kebingungan, dan komentar. Praktik “5‑users‑per‑iteration” (lima pengguna per iterasi) cukup untuk mengidentifikasi mayoritas masalah kegunaan. Hasil pengujian kemudian diintegrasikan kembali ke tahap observasi, memulai siklus iteratif hingga solusi memenuhi kriteria HCD.
> >
> > Seluruh siklus bersifat **iteratif**: setelah pengujian, tim kembali ke observasi atau ideasi untuk memperbaiki desain, memastikan solusi terus beradaptasi dengan kebutuhan pengguna yang berubah.
> >
> > ### Tipe Kesalahan Manusia: Slip dan Mistake
> >
> > Kesalahan manusia dibagi menjadi dua kategori utama dalam literatur kognitif: **slip** dan **mistake**.
> >
> > **Slip** terjadi ketika tujuan atau rencana pengguna sudah tepat, tetapi eksekusi gagal. Contohnya: seorang barista menuangkan susu ke dalam cangkir kopi, lalu secara tidak sadar menaruh cangkir tersebut di dalam kulkas. Slip biasanya terjadi pada level **sub‑konstektual**—misalnya, ketika perhatian terpecah atau ketika gerakan otomatis (habit) bertabrakan dengan konteks baru.
> >
> > **Mistake** muncul ketika tujuan atau rencana itu sendiri keliru. Misalnya, pilot yang menggunakan satuan pound alih‑alih kilogram untuk mengisi bahan bakar, yang mengakibatkan kecelakaan fatal (kasus *Gimli Glider*). Mistake berakar pada **level kognitif yang lebih tinggi**, seperti pemahaman konsep, pengetahuan domain, atau interpretasi informasi yang salah.
> >
> > Memahami perbedaan ini penting karena strategi mitigasi yang efektif berbeda: slip dapat dikurangi dengan **constraint** atau **forcing function**, sedangkan mistake memerlukan **educational support**, **clear labeling**, dan **model konseptual** yang akurat.
> >
> > ### Penyebab Sistemik Kesalahan
> >
> > Kesalahan tidak selalu muncul dari kelemahan individu; seringkali **faktor sistemik** yang memicu slip atau mistake. Beberapa penyebab utama meliputi:
> >
> > 1. **Tuntutan tugas yang tidak alami** – prosedur yang memaksa pengguna menahan perhatian terus‑menerus atau melakukan operasi presisi tinggi (misalnya, memasukkan kode keamanan dalam waktu singkat).
> > 2. **Interupsi** – gangguan yang memutus siklus aksi, sehingga memori kerja tidak dapat melanjutkan langkah selanjutnya dengan benar.
> > 3. **Tekanan waktu** – keharusan menyelesaikan tugas cepat dapat menyebabkan langkah terlewat atau keputusan terburu‑burui.
> > 4. **Umpan balik yang buruk** – tanpa sinyal yang jelas, pengguna tidak dapat memverifikasi apakah tindakan mereka berhasil atau tidak.
> > 5. **Tekanan sosial atau institusional** – contoh klasik adalah kecelakaan bandara Tenerife (1977), di mana pilot terpaksa meluncurkan pesawat karena tekanan untuk tidak menunda keberangkatan.
> >
> > Memahami konteks ini membantu desainer merancang **lingkungan kerja** yang meminimalkan beban kognitif dan menyediakan sinyal yang cukup untuk menghindari kesalahan.
> >
> > ### Strategi Desain Toleransi Error
> >
> > Karena kesalahan tidak dapat dihindari sepenuhnya, pendekatan **error‑tolerant** berfokus pada pencegahan, mitigasi, dan pemulihan. Beberapa strategi utama meliputi:
> >
> > - **Constraint**: Membatasi aksi yang tidak valid secara fisik atau logis (misalnya, colokan USB yang hanya dapat dimasukkan satu arah).
> > - **Forcing Function**: Memaksa urutan tindakan tertentu sebelum sistem melanjutkan (contoh: microwave tidak dapat beroperasi jika pintu terbuka).
> > - **Undo / Redo**: Menyediakan mekanisme pembatalan aksi dengan satu atau beberapa tingkat, memungkinkan pengguna kembali ke keadaan sebelumnya tanpa konsekuensi permanen.
> > - **Sensibility Checks**: Memvalidasi input secara real‑time dan menolak nilai yang tidak masuk akal (misalnya, dosis radiasi yang 1000 kali lebih tinggi dari batas normal).
> > - **Mode Elimination / Visibility**: Mengurangi atau menonjolkan mode aktif sehingga pengguna tidak secara tidak sengaja berada dalam mode yang salah.
> > - **Support for Interruption**: Menyimpan konteks kerja (state) sehingga pengguna dapat melanjutkan tugas setelah gangguan tanpa kehilangan progres.
> >
> > Implementasi strategi ini harus dipertimbangkan bersama dengan **prinsip HCD**: desain harus tetap intuitif, tidak menambah beban kognitif, dan tetap menyenangkan. Misalnya, menambahkan tombol “Undo” yang jelas berikon panah melengkung dapat meningkatkan rasa aman tanpa mengganggu alur kerja.
> >
> > ### Prinsip Sistem Toleran Error
> >
> > 1. **Asumsikan error akan terjadi** – desain harus resilien, bukan mengandalkan pengguna untuk selalu sempurna.
> > 2. **Letakkan pengetahuan di dunia, bukan di kepala** – informasi penting (seperti batasan atau status) harus terlihat secara eksternal, sehingga pengguna tidak harus mengingatnya.
> > 3. **Jembatani Gulfs** – gunakan signifier, constraint, dan mapping yang jelas untuk mengurangi *Gulf of Execution*, serta berikan umpan balik yang cepat dan dapat dipahami untuk menutup *Gulf of Evaluation*. (Catatan: penjelasan detail tentang signifier dan mapping tidak dibahas karena berada di luar ruang lingkup topik yang dilarang.)
> > 4. **Ganti rasa bersalah dengan rasa ingin tahu** – ketika error terjadi, tim harus meneliti penyebabnya (“What led to this?”) alih‑alih menyalahkan pengguna, sehingga perbaikan sistematis dapat dilakukan.
> >
> > Dengan menerapkan prinsip‑prinsip ini, produk tidak hanya menjadi lebih mudah dipakai, tetapi juga lebih aman dan dapat diandalkan dalam situasi kritis.

> [!cornell] #### Summary
>
> **Human‑Centered Design** menempatkan manusia sebagai pusat keputusan desain, mengubah “user error” menjadi indikasi “design failure”. Model **Double‑Diamond** memandu proses dari eksplorasi masalah hingga solusi melalui fase divergen‑konvergen yang iteratif. Empat tahap HCD—observasi, ideasi, prototipe, dan pengujian—menjamin solusi yang terus disesuaikan dengan kebutuhan nyata pengguna. Memahami perbedaan **slip** dan **mistake**, serta penyebab sistemik seperti interupsi dan tekanan waktu, memungkinkan penerapan **strategi toleransi error** (constraint, forcing function, undo, sensibility checks) yang meningkatkan ketahanan sistem. Akhirnya, prinsip‑prinsip desain error‑tolerant menekankan asumsi kesalahan, penempatan pengetahuan eksternal, dan penutupan *gulfs* untuk menciptakan produk yang **usable**, **understandable**, **enjoyable**, dan **resilient**.

> [!ad-libitum]- Additional Information
>
> #### Formal Error Taxonomy and Cognitive Models
>
> Dalam literatur kognitif, error diklasifikasikan tidak hanya menjadi slip dan mistake, tetapi juga **lapse**, **violation**, dan **mode error**. Lapse merujuk pada kegagalan memori kerja (misalnya, lupa menutup tab browser), sedangkan violation adalah pelanggaran sadar terhadap prosedur (misalnya, mengabaikan protokol keamanan). Mode error terjadi ketika pengguna berada dalam mode yang salah karena indikator yang tidak jelas. Model **GOMS** (Goals, Operators, Methods, and Selection rules) dapat memetakan langkah‑langkah mental pengguna, membantu mengidentifikasi titik rentan di mana slip atau lapse paling mungkin terjadi. Dengan memetakan alur GOMS, desainer dapat menambahkan constraint atau forcing function tepat pada titik kritis.
>
> #### Comparative Analysis of Constraint vs. Forcing Function
>
> **Constraint** bersifat pasif; ia hanya mencegah aksi yang tidak valid tanpa memaksa urutan tertentu. Contoh: bentuk fisik konektor yang hanya dapat dipasang satu arah. **Forcing Function**, di sisi lain, aktif memaksa urutan atau kondisi sebelum melanjutkan (misalnya, oven tidak dapat memanaskan jika pintu terbuka). Analisis biaya‑manfaat menunjukkan bahwa forcing function memberikan keamanan lebih tinggi pada sistem kritis (medis, penerbangan), namun dapat menambah friksi pada tugas rutin. Oleh karena itu, kombinasi keduanya sering dipilih: constraint untuk pencegahan dasar, forcing function untuk skenario berisiko tinggi.
>
> #### Designing for Error Recovery: Undo Stacks and Transaction Models
>
> **Undo stack** menyimpan riwayat perubahan dalam struktur data berbentuk *stack* atau *log*, memungkinkan pengguna melangkah mundur satu atau beberapa langkah. Implementasi yang baik mencakup *granularitas* (apakah setiap klik atau setiap aksi logis) dan *visual cue* yang menandakan status undo tersedia. Pada sistem basis data, **transaction model** (AC