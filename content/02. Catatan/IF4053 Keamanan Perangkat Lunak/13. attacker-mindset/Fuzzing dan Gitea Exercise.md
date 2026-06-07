---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Fuzzing dan Gitea Exercise
>
> > ## Questions/Cues
> >
> > - Mengapa fuzzing disebut "systematic distrust" dan apa beda sikap engineer vs fuzzer?
> > - Apa yang ditemukan fuzzing tetapi luput dari code review?
> > - Bagaimana cara kerja Go native fuzzer (`FuzzParseLimit`) dan HTTP fuzzer Python?
> > - Sinyal apa pada output fuzzer yang menandai sebuah finding ("A 500 is not a failure")?
> > - Apa empat langkah guided exercise Gitea dan tiga kebiasaan attacker?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W13 Attacker Mindset — bagian "Module 3: Fuzzing, Module 4: Guided exercise & Closing")
>
> > ### Fuzzing sebagai Systematic Distrust
> >
> > **Fuzzing** adalah **ketidakpercayaan yang sistematis (systematic distrust)** terhadap input. Perbedaan sikapnya tajam: seorang **engineer** berkata *"I tested the happy path and two error cases"*; sebuah **fuzzer** berkata *"I will send 10,000 inputs and watch what breaks"*. Engineer menguji segelintir kasus yang ia bayangkan; fuzzer membanjiri program dengan input dalam jumlah besar lalu mengamati apa yang patah.
> >
> > _Singgungan dengan W09:_ definisi umum fuzzing (melontarkan input invalid/random lalu memantau crash/assertion/memory leak) dibahas di [[Fault Injection, Mutation, dan Fuzz Testing]]. Di sini sudut pandangnya **attacker/praktik** — bagaimana fuzzing dipakai untuk menemukan dan membuktikan kerentanan — bukan metodologi testing-nya.
> >
> > ### Apa yang Ditemukan Fuzzing tetapi Luput dari Code Review
> >
> > Code review membaca logika; fuzzing menemukan hal-hal yang sulit terlihat dengan membaca, yaitu:
> >
> > - **Integer overflow/underflow**: `MAX_INT`, `-1`, `0`.
> > - **Special chars**: `%00`, `../`, `' OR 1=1`.
> > - **Resource exhaustion** pada input yang sangat besar.
> > - **Crashes** pada data yang malformed-tapi-masih-parseable.
> > - **Inconsistent behaviour** antar endpoint.
> > - **Timing differences** yang mengungkap logika percabangan.
> >
> > Dua jenis fuzzer dibedakan menurut tingkatannya: **Go native fuzzer** — function-level, unit testing, input parsing; dan **RESTler / HTTP fuzzer** — end-to-end, API behaviour, auth bypass.
> >
> > ### Go Native Fuzzer
> >
> > Fuzzing tingkat unit di Go: kamu **mendefinisikan invariant** (apa yang harus selalu benar), lalu fuzzer berusaha **melanggarnya (violate it)**. Cocok untuk parsing functions, input sanitisation, dan logika tingkat unit.
> >
> > ```go
> > func FuzzParseLimit(f *testing.F) {
> >     f.Add(10)    // seed: normal value
> >     f.Add(0)     // seed: boundary
> >     f.Add(-1)    // seed: negative
> >     f.Fuzz(func(t *testing.T, limit int) {
> >         result := parseLimit(limit)
> >         // invariant: result must always be 1-50
> >         if result < 1 || result > 50 {
> >             t.Errorf("parseLimit(%d) = %d, out of range", limit, result)
> >         }
> >     })
> > }
> > ```
> >
> > Dijalankan dengan: `go test -fuzz=FuzzParseLimit`. Seed (`f.Add`) memberi nilai awal; fuzzer lalu memutasinya untuk mencoba membuat `parseLimit` mengembalikan nilai di luar rentang invariant 1–50.
> >
> > ### HTTP Fuzzing (Skrip Python requests)
> >
> > Untuk fuzzing tingkat end-to-end terhadap endpoint search Gitea, dipakai skrip Python berbasis `requests`:
> >
> > ```python
> > import requests
> >
> > TARGET = "http://localhost:3000/api/v1/repos/search"
> >
> > payloads = {
> >     "limit": [0, -1, 999999, "abc", None, "%00", 2**31],
> >     "q":     ["", " ", "a"*10000, "../admin", "' OR '1'='1"],
> >     "page":  [0, -1, 999999, "abc", None],
> > }
> >
> > for param, values in payloads.items():
> >     for value in values:
> >         r = requests.get(TARGET, params={param: value}, timeout=5)
> >         print(f"{param}={repr(value):20} -> {r.status_code} | {len(r.content)} bytes")
> > ```
> >
> > Skrip mengiterasi setiap parameter dengan daftar payload bermasalah (nilai ekstrem, special chars, string sangat panjang, percobaan SQL injection) lalu mencetak **kode status** dan **ukuran body** tiap respons — dua sinyal utama untuk dibaca.
> >
> > ### Membaca Output Fuzzer
> >
> > Yang dipantau dalam aliran respons:
> >
> > | Sinyal | Arti | Interpretasi attacker |
> > | --- | --- | --- |
> > | **500** | Unexpected code path hit | Sesuatu yang developer tak duga harus ditangani — **ini sebuah finding, bukan kegagalan fuzzer** |
> > | **large body** | Respons luar biasa besar | Potensi **data leakage** — data yang dikembalikan lebih banyak dari semestinya |
> > | **timeout** | Request timeout | Potensi **DoS vector** — input ini menghabiskan terlalu banyak sumber daya server |
> > | **different** | Respons inkonsisten untuk tipe input sama | **Oracle behaviour** — memungkinkan pertanyaan ya/tidak tentang state tersembunyi sistem |
> >
> > Prinsip penutup modul ini: **"A 500 is not a failure of your fuzzer. It is a finding."** Status 500 berarti input menyentuh jalur kode yang tidak diantisipasi developer — justru itulah yang dicari.
> >
> > ### Gitea Guided Exercise
> >
> > Setup: `docker run -p 3000:3000 gitea/gitea` · Python + `requests` · Swagger di `localhost:3000/swagger`. Empat langkah berurutan:
> >
> > 1. **Entry point mapping** — daftarkan 3 endpoint dengan parameter integer, 3 dengan parameter string, dan 1 di mana **autentikasi mengubah data yang dikembalikan**.
> > 2. **Code review** (5 mnt) — di `/api/v1/repos/search`: temukan tempat `limit` diparse. Apakah ada maksimum yang dipaksakan? **Apa yang terjadi dengan `limit=1000000`?**
> > 3. **Run the fuzzer** (7 mnt) — perluas skrip: fuzz `topic` dengan nilai non-boolean, `q` dengan string sangat panjang, `page` dengan integer besar. Catat semua status code tak terduga.
> > 4. **Write a finding** (3 mnt) — format: *"Input [X] to param [Y] on endpoint [Z] produced response [W]. An attacker could use this to [impact]."*
> >
> > ### Closing — Tiga Kebiasaan Attacker
> >
> > Tiga kebiasaan untuk diterapkan pada setiap code review sepanjang karier:
> >
> > 1. **Assume every input is hostile** — sampai *kode itu sendiri* membuktikan sebaliknya; bukan niat developer, bukan dokumentasi, melainkan kode.
> > 2. **Read permission checks with suspicion** — apakah ada di tempat yang benar, mengecek hal yang benar, dan mustahil dilewati dari jalur kode mana pun?
> > 3. **Different outputs for the same logical input is a finding** — error oracle, perbedaan timing, dan perbedaan ukuran respons semuanya memberi attacker informasi tentang sistem.
> >
> > Kutipan penutup: *"The developer imagined a user who wants the software to work. Your job as a security tester is to be the user who doesn't."*

> [!cornell] #### Summary
>
> **Fuzzing** adalah *systematic distrust*: alih-alih menguji happy path + dua error case (engineer), fuzzer mengirim 10.000 input dan mengamati apa yang patah. Ia menemukan hal yang luput dari code review — **integer overflow** (`MAX_INT`/`-1`/`0`), **special chars** (`%00`, `../`, `' OR 1=1`), **resource exhaustion**, **crash** pada data malformed, perilaku inkonsisten, dan **timing differences**. **Go native fuzzer** (`FuzzParseLimit`, dijalankan `go test -fuzz=`) menguji invariant tingkat unit; **HTTP fuzzer Python** membanjiri endpoint search Gitea lalu mencetak status code + ukuran body. Membaca output: **500** = unexpected code path (*"A 500 is not a failure... It is a finding"*), **large body** = data leakage, **timeout** = DoS, **different** = oracle. **Gitea exercise** empat langkah: entry-point mapping, code review (`limit=1000000`), run fuzzer, write a finding. **Tiga kebiasaan attacker**: anggap setiap input hostile, baca permission check dengan curiga, dan output berbeda untuk input logis sama = sebuah finding.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Coverage-Guided vs Black-Box HTTP Fuzzing (DI LUAR sumber)
> Go native fuzzer (`testing.F`) bersifat **coverage-guided**: runtime menginstrumentasi kode dan memprioritaskan input yang membuka jalur baru, mirip libFuzzer/AFL. Sebaliknya, skrip `requests` di deck adalah **black-box HTTP fuzzing** — tidak ada feedback coverage, hanya daftar payload statis. Tool seperti **RESTler** (disebut di deck) menjembatani keduanya dengan menyimpulkan dependensi antar-request dari spesifikasi OpenAPI/Swagger untuk membentuk urutan panggilan yang stateful, sehingga mampu menemukan **auth bypass** end-to-end yang tak terjangkau payload satu-request.
>
> #### Lebih dalam — Menulis Finding yang Baik (DI LUAR sumber)
> Format finding deck (*input X → param Y → endpoint Z → response W → impact*) sejajar dengan praktik laporan kerentanan profesional yang menambahkan: **langkah reproduksi** yang deterministik, **severity** (mis. CVSS), dan **rekomendasi mitigasi**. Sebuah 500 atau timeout sebaiknya disertai PoC minimal dan dampak yang dijelaskan dalam istilah bisnis (mis. "menghabiskan worker pool → seluruh API tak responsif") agar dapat diprioritaskan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan Gitea via Docker, eksekusi skrip Python di atas, lalu perluas sesuai langkah 3 exercise; kumpulkan tabel `param=value -> status | bytes` dan tandai setiap 500/timeout.
> 2. Tulis `FuzzParseLimit` untuk fungsi parsing milikmu sendiri, definisikan invariant-nya, dan jalankan `go test -fuzz=` hingga menemukan input yang melanggar.
> 3. Tulis satu finding lengkap (format deck) dari hasil fuzzing endpoint search, lengkap dengan langkah reproduksi dan saran mitigasi (mis. memaksakan `limit` maksimum).
>
> #### Bacaan Lanjutan
> - Go Blog & dokumentasi resmi: "Go Fuzzing" (`testing.F`).
> - Microsoft Research, "RESTler: Stateful REST API Fuzzing".
> - OWASP WSTG — bagian fuzzing dan testing input handling.
> - Repositori Gitea: `routers/api/v1/repo/repo.go` (handler Search).
