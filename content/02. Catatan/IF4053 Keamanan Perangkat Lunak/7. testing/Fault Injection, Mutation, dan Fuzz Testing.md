---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Fault Injection, Mutation, dan Fuzz Testing
>
> > ## Questions/Cues
> >
> > - Apa objektif Fault Injection dan apa beda compile-time vs run-time?
> > - Bagaimana fault model untuk sebuah web app (server/client/network)?
> > - Apa itu "kill the mutant" dan mengapa equivalent mutant problem undecidable?
> > - Apa perbedaan tujuan Regression testing vs Fuzz testing?
> > - Bagaimana instrumentasi dan input path tracing membantu menemukan bug?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W09 Security Testing — bagian "Fault Injection, Mutation Testing, dan Fuzz Testing")
>
> > ### Fault Injection
> >
> > **Fault Injection** adalah teknik untuk **meningkatkan coverage** sebuah pengujian dengan sengaja **menyuntikkan fault (kesalahan)** guna memaksa eksekusi melewati jalur kode tertentu. Targetnya terutama adalah **error-handling code paths** — jalur penanganan kesalahan yang jarang terpicu pada pengujian normal sehingga sering luput diuji. Padahal justru di jalur penanganan error inilah banyak kelemahan keamanan bersembunyi (misalnya pesan error yang membocorkan informasi, atau kegagalan yang membuka akses).
> >
> > Berdasarkan waktunya, ada dua pendekatan: **Compile-time**, yang mengubah kode sumber sebelum kompilasi dan menjelma menjadi **mutation testing**; dan **Run-time**, yang menggunakan **software trigger** untuk menyuntikkan fault ke sistem perangkat lunak yang sedang berjalan. Pilihan ini menentukan infrastruktur yang dibutuhkan: perubahan source code menuntut **recompile**; instrumentasi binary menuntut **host agent**; pengujian input API menuntut **test harness**; dan pengujian input jaringan menuntut **node jaringan tambahan**.
> >
> > Mekanisme injeksi fault yang umum mencakup **Code Insertion** (menyisipkan kode pemicu kesalahan), **State Corruption** (merusak nilai state/variabel di memori), dan **Fatal Exception** (memaksa exception fatal). Ketiganya bertujuan mendorong perangkat lunak ke kondisi abnormal yang belum tentu tertangani dengan aman.
> >
> > ### Fault Model untuk Web App
> >
> > Materi menyajikan **fault model** spesifik untuk aplikasi web, dikelompokkan berdasarkan komponen yang menjadi sasaran:
> >
> > - **Server** — meliputi **state manipulation** (memanipulasi state sesi/aplikasi), **access control** (menguji penegakan kontrol akses), dan **backend attack** melalui **malicious input/content** (input berbahaya yang menyerang lapisan belakang).
> > - **Client** — meliputi **bypass input restriction** (melewati pembatasan input sisi klien yang mudah dimodifikasi), **state manipulation**, dan **abuse active content** (menyalahgunakan konten aktif seperti skrip).
> > - **Network** — menyasar lapisan jaringan sebagai jalur injeksi.
> >
> > Model ini membantu penguji menyusun daftar fault yang sistematis: alih-alih menyuntik secara acak, penguji menargetkan titik-titik yang diketahui rentan pada arsitektur web tiga-komponen tersebut.
> >
> > ### Mutation Testing
> >
> > **Mutation Testing** membuat **versi cacat (mutants)** dari sebuah program dengan **mengubah pernyataan program secara otomatis** — misalnya mengganti sebuah operator atau menukar satu variabel dengan variabel lain di dalam ekspresi (mengubah `a + b` menjadi `a - b`, atau `>` menjadi `>=`). Setiap mutant adalah salinan program dengan satu cacat buatan.
> >
> > Kualitas sebuah **test suite** diukur dari kemampuannya **mendeteksi cacat buatan tersebut — disebut "kill the mutant"**. Jika test suite gagal membunuh sebuah mutant (artinya tidak ada test case yang outputnya berbeda antara program asli dan mutant), maka **test case baru harus ditambahkan** untuk meningkatkan fault-exposing potential, sampai semua mutant terbunuh.
> >
> > Persoalan penting adalah **equivalent mutant problem**: jika sebuah mutant ternyata **semantically equivalent** dengan program asli (berperilaku identik untuk semua input), maka ia **tidak akan pernah bisa dibunuh** oleh test case mana pun. Celakanya, **masalah mengidentifikasi equivalent mutant bersifat undecidable** — tidak ada algoritma umum yang dapat menentukannya secara pasti. Inilah keterbatasan teoretis mendasar dari mutation testing.
> >
> > ### Destructive Testing dan Fuzz Testing
> >
> > **Destructive Testing** bertujuan memverifikasi bahwa perangkat lunak tetap berfungsi dengan benar **bahkan ketika menerima input yang tidak valid atau tak terduga**, sehingga membuktikan **robustness** dari rutin validasi input dan manajemen error. Tekniknya adalah **berupaya membuat perangkat lunak atau sub-sistem gagal (fail)**, salah satunya melalui **software fault injection**.
> >
> > **Fuzz Testing** adalah teknik yang sering **otomatis atau semi-otomatis**, yang memberikan **input yang tidak valid, tak terduga, atau acak (random)** ke masukan sebuah program. Program kemudian **dipantau (monitored)** untuk **exceptions seperti crash**, **kegagalan built-in code assertions**, atau **potensi memory leak**. Fuzzing umum dipakai untuk menemukan masalah keamanan dalam perangkat lunak atau sistem komputer. Materi menampilkan contoh konkret di mana tool **Hailstorm membuat MS-SQL 7 crash** lewat fuzzing.
> >
> > Perbedaan tujuan dengan regression dijelaskan dengan tajam: **Regression testing** menjalankan program pada banyak **input normal** untuk mencari "badness", dengan tujuan **mencegah pengguna normal menemui error** (assertion yang gagal dianggap buruk). Sebaliknya, **Fuzzing** menjalankan program pada banyak **input abnormal** untuk mencari "badness", dengan tujuan **mencegah penyerang menemukan error yang dapat dieksploitasi** (di sini, assertion yang gagal justru sering "ok" karena menandakan input ditangkap sebelum membahayakan).
> >
> > ### Instrumentation, Input Path Tracing, dan Boron Tagging
> >
> > Untuk mengamati apa yang terjadi di dalam program selama fuzzing, dipakai **instrumentation**. Materi menyebut: **Rational Purify** (deteksi kesalahan memori), **API call hooks** (mengaitkan panggilan API untuk memantau argumen), dan **code-coverage tools seperti gcov** untuk mengukur jalur kode mana yang tereksekusi. Instrumentasi diarahkan ke titik-titik kritis seperti **canonicalization routines**, **filtering routines**, **decision logic**, dan **parsers** — tempat input berbahaya biasanya diproses.
> >
> > **Input Path Tracing** melacak ke mana data pengguna mengalir di dalam program. Untuk **path tracing** dipakai **ltrace** dan **truss**; untuk **data tracing** dipakai **GDB breakpoints** atau **modified ltrace**. Pertanyaan kuncinya: **"Where is user-data getting placed?"** dan apakah ia sampai ke **trusted API calls**. Contoh dalam materi memakai `truss` pada Solaris untuk menelusuri panggilan internal app-server, serta hook `strcpy` pada Win32.
> >
> > Teknik **Boron Tagging with GDB** menyisipkan penanda unik (sebuah **TEST_STRING**, misalnya string `"/iplanet/servers/TEST_STRING"`) ke dalam input, lalu menggunakan GDB (`x/8s $o0`) untuk **melacak di mana penanda itu muncul di memori**. Dengan begitu penguji dapat memastikan persis bagaimana input yang dikontrol pengguna mengalir hingga ke rutin sensitif seperti `util_uri_is_evil_internal` — membuktikan apakah ada jalur dari input ke titik berbahaya.

> [!cornell] #### Summary
>
> **Fault Injection** meningkatkan coverage dengan menyuntikkan fault untuk memaksa eksekusi jalur error-handling, baik compile-time (menjadi **mutation testing**) maupun run-time (via software trigger), lewat code insertion, state corruption, atau fatal exception; **fault model web app** menargetkan server, client, dan network. **Mutation Testing** membuat mutants dan mengukur kualitas test suite dari kemampuan **"kill the mutant"**, terkendala **equivalent mutant problem** yang **undecidable**. **Destructive Testing** dan **Fuzz Testing** melontarkan input invalid/random untuk memicu crash, kegagalan assertion, atau memory leak; berbeda dari regression yang memakai input normal untuk melindungi pengguna, fuzzing memakai input abnormal untuk mencegah eksploitasi penyerang. **Instrumentation** (Purify, API hooks, gcov), **input path tracing** (ltrace/truss/gdb), dan **Boron tagging** melacak aliran user-data hingga ke rutin sensitif.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Coverage-Guided Fuzzing (DI LUAR sumber)
> Generasi fuzzer modern seperti **AFL (American Fuzzy Lop)** dan **libFuzzer** menyempurnakan ide instrumentasi materi dengan **coverage-guided fuzzing**: instrumentasi kompilasi (mis. `-fsanitize-coverage`) memberi feedback jalur mana yang baru terjangkau, lalu algoritma genetik memprioritaskan input yang membuka jalur baru. Ini jauh lebih efisien daripada fuzzing acak murni dan menjadi standar industri (mis. Google OSS-Fuzz memfuzz ribuan proyek open-source secara kontinu). Dipadu dengan **AddressSanitizer (ASan)**, pengganti modern Purify, crash dapat ditangkap beserta lokasi memori pelanggarannya.
>
> #### Lebih dalam — Mutation Score dan Tooling
> Dalam praktik, kualitas test suite dikuantifikasi sebagai **mutation score** = (mutant terbunuh / total mutant non-ekuivalen). Tools modern seperti **PIT (PITest)** untuk Java atau **Stryker** untuk JavaScript mengotomasi pembuatan dan eksekusi mutant. Karena equivalent mutant tidak dapat dideteksi secara umum, praktik lapangan memakai heuristik dan timeout untuk membatasinya, lalu meninjau mutant yang lolos secara manual.
>
> #### Proyek Eksplorasi Mandiri
> 1. Fuzz sebuah parser sederhana (mis. parser JSON kecil dalam C) memakai libFuzzer + ASan; dokumentasikan crash pertama dan lacak input pemicunya — versi modern dari Boron tagging.
> 2. Jalankan PITest pada proyek Java kecil, hitung mutation score-nya, lalu tambahkan test case untuk membunuh mutant yang lolos; identifikasi satu kandidat equivalent mutant.
> 3. Gunakan `ltrace`/`strace` untuk melacak aliran sebuah string input melalui sebuah binary CLI dan tentukan apakah ia mencapai panggilan `system()` atau `exec()`.
>
> #### Bacaan Lanjutan
> - Michael Sutton et al., "Fuzzing: Brute Force Vulnerability Discovery"
> - Dokumentasi AFL++ dan libFuzzer (LLVM)
> - Jia & Harman, "An Analysis and Survey of the Development of Mutation Testing"
> - Greg Hoglund & Gary McGraw, "Exploiting Software: How to Break Code"
