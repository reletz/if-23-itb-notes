---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Security Testing Realm - Level, Visibility, dan Teknik
>
> > ## Questions/Cues
> >
> > - Apa empat dimensi penyusun Security Testing Realm?
> > - Kapan Black Box, White Box, atau Grey Box paling tepat digunakan?
> > - Mengapa Black Box hanya menemukan "low-hanging fruit"?
> > - Mengapa White Box mahal dan membutuhkan expert?
> > - Apa contoh architecture flaws dan attack vectors yang perlu diuji?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W09 Security Testing — bagian "Security Testing Realm & Security Test Type")
>
> > ### Empat Dimensi Security Testing Realm
> >
> > Materi menyusun ruang pengujian keamanan (**Security Testing Realm**) sebagai kombinasi **empat dimensi** yang saling tegak lurus. Memilih satu nilai dari tiap dimensi menghasilkan satu "profil" pengujian yang spesifik. Keempat dimensi tersebut adalah:
> >
> > 1. **Level** — pada tahap mana pengujian dilakukan: **Unit**, **Integration**, **System**, atau **Acceptance**. Level menentukan granularitas dan seberapa awal cacat ditemukan.
> > 2. **Visibility** — seberapa banyak penguji mengetahui internal sistem: **Whitebox** (akses penuh ke source code), **Greybox** (akses parsial), atau **Blackbox** (tanpa akses internal).
> > 3. **Technique** — metode pembangkitan kasus uji: **Fuzz**, **Mutation**, atau **Fault Injection**.
> > 4. **Aspect** — sasaran apa yang diuji: **Network**, **API**, **Software**, atau **Platform**.
> >
> > Dengan memadukan keempatnya, misalnya "Blackbox + Fuzz + Network + System", tim dapat mendefinisikan ruang lingkup pengujian secara presisi dan memastikan cakupan yang seimbang alih-alih hanya menguji satu sudut.
> >
> > ```mermaid
> > flowchart LR
> >     ST["Security Testing Realm"]
> >     ST --> L["Level<br/>Unit / Integration<br/>System / Acceptance"]
> >     ST --> V["Visibility<br/>Whitebox / Greybox<br/>Blackbox"]
> >     ST --> T["Technique<br/>Fuzz / Mutation<br/>Fault Injection"]
> >     ST --> A["Aspect<br/>Network / API<br/>Software / Platform"]
> > ```
> >
> > ### Black Box Testing
> >
> > **Black Box testing** menguji sistem dari luar tanpa pengetahuan apa pun tentang internalnya — penguji hanya melihat input dan output. Keunggulan utamanya adalah **dapat diotomasi (can be automated)** dan **mudah menemukan "low-hanging fruit"**, yakni kerentanan dangkal yang gampang ditemukan secara otomatis. Karena itu Black Box cocok sebagai sapuan awal yang cepat dan murah.
> >
> > Materi menyebut beberapa **automated tools** untuk Black Box: **ISICS**, **SPIKE**, **Hailstorm**, dan **PROTOS**. Tools ini melontarkan berbagai input ke target dan memantau anomali. Namun, justru karena tidak mengetahui struktur internal, Black Box cenderung melewatkan kerentanan yang lebih dalam — misalnya logika otorisasi yang cacat di jalur kode yang jarang terpicu. Inilah keterbatasan pendekatan "dari luar saja".
> >
> > ### White Box Testing
> >
> > **White Box testing** memberi penguji akses penuh ke internal sistem, termasuk source code dan binary. Materi mencontohkan **IDA-Pro** sebagai alat **reverse assemble** untuk membongkar binary; contoh konkret dalam slide adalah merekonstruksi rutin `CanonicalizeURIPath` dari sebuah app-server populer melalui IDA. Dengan visibilitas penuh, penguji dapat menelusuri jalur kode yang tidak mungkin terjangkau Black Box.
> >
> > Konsekuensinya, White Box **lebih mahal (more expensive)**, **membutuhkan seorang expert**, dan **sangat memakan waktu (very time consuming)**. Membaca disassembly dan memahami alur kontrol level rendah menuntut keahlian reverse engineering yang langka. Karena itu White Box biasanya disasarkan ke komponen paling kritis, bukan ke seluruh aplikasi.
> >
> > ### Grey Box — A Fusion
> >
> > **Grey Box testing** adalah **fusi (a fusion)** yang menggabungkan kekuatan kedua pendekatan sebelumnya. Materi menjelaskan kombinasinya: sebuah **runtime debugger** (**SoftIce** atau **GDB**), sebuah **white box tool** (**IDA**), dan sebuah **black box tool** (**Hailstorm**). Dengan debugger, penguji dapat mengamati state saat program berjalan; dengan IDA, ia memahami struktur statis; dengan Hailstorm, ia melontarkan input secara otomatis.
> >
> > Perpaduan ini memberi keseimbangan antara kecepatan otomasi Black Box dan kedalaman analisis White Box. Penguji dapat, misalnya, menjalankan fuzzing otomatis (black box) sambil memasang breakpoint (debugger) pada rutin yang teridentifikasi dari disassembly (IDA) untuk menangkap persis di mana input berbahaya memicu kegagalan.
> >
> > ### Architecture Flaws dan Attack Vectors
> >
> > Selain cacat kode, pengujian harus menyasar **architecture flaws** — cacat pada level desain yang sering lebih berbahaya karena sulit ditambal belakangan. Materi mendaftarkan contohnya: **lack of randomness** (kurangnya keacakan, misalnya pada generator token), **hijacking keys**, **no authentication**, **bad configuration or design**, **no compartments** (tidak ada pemisahan/isolasi), penggunaan **buffer yang sama untuk data crypto dan clear** (sehingga data terenkripsi dan plaintext bercampur), serta **race conditions**.
> >
> > Untuk memahami dari mana serangan dapat masuk, materi mengelompokkan **attack vectors** menjadi: **Physsec** (keamanan fisik) yang mencakup vektor **Human** (manusia) dan **Physical**; dan **COMMSEC** (keamanan komunikasi) yang mencakup **Data networks**, **Telecommunication**, **Wireless communication**, serta **Other External Inputs**. Pemetaan ini mengingatkan bahwa permukaan serangan tidak hanya berupa kode aplikasi, melainkan juga manusia, perangkat fisik, dan seluruh kanal komunikasi.

> [!cornell] #### Summary
>
> **Security Testing Realm** disusun dari empat dimensi ortogonal — **Level** (Unit/Integration/System/Acceptance), **Visibility** (Whitebox/Greybox/Blackbox), **Technique** (Fuzz/Mutation/Fault Injection), dan **Aspect** (Network/API/Software/Platform) — yang dipadukan untuk mendefinisikan ruang lingkup uji secara presisi. **Black Box** dapat diotomasi dan menemukan low-hanging fruit dengan tools seperti SPIKE, PROTOS, dan Hailstorm, tetapi melewatkan cacat dalam. **White Box** (IDA-Pro) menelusuri internal secara mendalam namun mahal, lambat, dan butuh expert. **Grey Box** memadukan debugger (GDB/SoftIce) + IDA + black box tool untuk keseimbangan kecepatan dan kedalaman. Pengujian juga harus menyasar **architecture flaws** (lack of randomness, no compartments, race conditions) dan beragam **attack vectors** dari kategori Physsec hingga COMMSEC.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — SAST, DAST, dan IAST (DI LUAR sumber)
> Dalam terminologi industri modern, dimensi Visibility dipetakan ke tiga kelas tooling: **SAST** (Static Application Security Testing) yang setara White Box karena menganalisis source/bytecode tanpa menjalankan program; **DAST** (Dynamic Application Security Testing) yang setara Black Box karena menyerang aplikasi yang sedang berjalan dari luar; dan **IAST** (Interactive Application Security Testing) yang setara Grey Box karena memasang instrumentasi di dalam runtime sambil mengamati lalu lintas dari luar. Memahami pemetaan ini membantu memilih alat komersial (mis. Semgrep/CodeQL untuk SAST, OWASP ZAP/Burp untuk DAST, Contrast untuk IAST).
>
> #### Lebih dalam — Architecture Flaws dan Threat Modeling
> Architecture flaws seperti "no compartments" paling efektif ditangkap lewat **threat modeling** dini (mis. metode STRIDE atau diagram data flow), bukan lewat scanning. Pemisahan kompartemen (compartmentalization) adalah penerapan prinsip **least privilege** dan **defense in depth** pada level arsitektur; kegagalannya berarti satu komponen yang jebol dapat mengompromikan seluruh sistem. Inilah mengapa cacat arsitektur jauh lebih mahal diperbaiki dibanding bug implementasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil satu aplikasi web sederhana, jalankan satu alat DAST (OWASP ZAP) sebagai Black Box dan satu alat SAST (Semgrep) sebagai White Box; bandingkan jenis temuan masing-masing dan jelaskan mengapa keduanya saling melengkapi.
> 2. Buat tabel pemetaan empat dimensi Realm terhadap satu skenario uji nyata (mis. menguji endpoint login), isi nilai untuk setiap dimensi, dan justifikasi pilihannya.
> 3. Lakukan threat modeling STRIDE pada arsitektur fiktif tiga-tier dan identifikasi minimal tiga architecture flaws dari daftar materi.
>
> #### Bacaan Lanjutan
> - OWASP Web Security Testing Guide v4.2
> - Kali Linux — Assuring Security by Penetration Testing
> - Adam Shostack, "Threat Modeling: Designing for Security"
> - Dokumentasi IDA Pro dan GDB untuk reverse engineering
