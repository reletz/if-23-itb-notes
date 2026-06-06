---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Reverse Engineering, IPR, dan Tools-nya
>
> > ## Questions/Cues
> >
> > - Apa itu Intellectual Property Rights (IPR) dan tipe-tipe apa saja yang melindunginya?
> > - Bagaimana application protection menegakkan IPR secara teknis?
> > - Apa definisi reverse engineering dan kapan ia menjadi legal vs ilegal?
> > - Kategori tools apa saja yang digunakan dalam reverse engineering?
> > - Apa pelajaran dari studi kasus Microsoft, Sony, dan Adobe?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W12 Reverse Engineering & Application Protection — bagian "IPR, Reverse Engineering, Tools & Studi Kasus")
>
> > ### Intellectual Property Rights (IPR)
> >
> > **Intellectual Property Rights (IPR)** adalah hak legal yang melindungi kreasi pikiran (creations of the mind), termasuk perangkat lunak. Tujuan utamanya adalah memberikan creator kendali atas karyanya sekaligus memungkinkan mereka memperoleh profit dari hasil kerja intelektual tersebut. Tanpa kerangka hukum ini, sebuah karya orisinal dapat dengan mudah disalin dan dikomersialkan oleh pihak lain tanpa kompensasi bagi penciptanya, sehingga insentif untuk berinovasi menurun drastis.
> >
> > Terdapat tiga tipe utama IPR yang relevan bagi perangkat lunak. Pertama, **copyright (hak cipta)** melindungi ekspresi konkret dari sebuah karya, misalnya kode sumber dan kode biner sebuah aplikasi. Kedua, **patent (paten)** melindungi ide atau metode teknis yang baru dan inventif, contohnya algoritma kompresi unik atau mekanisme proteksi tertentu. Ketiga, **trade secret (rahasia dagang)** melindungi informasi rahasia yang memberi keunggulan kompetitif, seperti algoritma proprietary yang tidak pernah dipublikasikan dan hanya diketahui internal perusahaan.
> >
> > Ketiga tipe ini sering bekerja bersama dalam satu produk. Sebuah aplikasi komersial bisa memiliki kode yang di-copyright, fitur tertentu yang dipatenkan, sekaligus logika inti yang dijaga sebagai trade secret. Kombinasi ini menciptakan lapisan perlindungan hukum yang saling melengkapi, memungkinkan creator menuntut pihak yang melanggar melalui jalur yang berbeda-beda sesuai jenis pelanggarannya.
> >
> > ### IPR dan Application Protection
> >
> > **Application protection** adalah upaya teknis untuk menegakkan IPR dengan cara mempersulit aktivitas **copying** (penggandaan tidak sah) dan **tampering** (modifikasi tidak sah) terhadap perangkat lunak. Prinsip fundamentalnya adalah: perlindungan legal hanya efektif bila ada barrier teknis yang menyertainya. Sebuah lisensi atau klausul hukum tidak banyak berarti jika siapa pun dapat menyalin dan menjalankan software tanpa hambatan apa pun; hambatan teknis-lah yang membuat pelanggaran menjadi sulit, mahal, dan dapat dibuktikan.
> >
> > Dengan kata lain, hukum dan teknologi bekerja sebagai dua sisi mata uang yang sama. Hukum menetapkan apa yang boleh dan tidak boleh dilakukan, sedangkan teknologi (seperti obfuscation, code signing, dan tamper detection) membuat pelanggaran tersebut secara praktis sulit dilakukan. Tanpa barrier teknis, penegakan hukum menjadi reaktif dan terlambat—kerugian sudah terjadi sebelum pelanggar dapat ditindak.
> >
> > Namun, **reverse engineering (RE)** menantang IPR, terutama di negara-negara dengan penegakan hukum yang lemah. Di lingkungan seperti itu, pelaku dapat membongkar proteksi software dan menyebarkan versi bajakan dengan risiko hukum yang minimal. Inilah sebabnya banyak vendor besar tidak hanya mengandalkan satu mekanisme, melainkan menumpuk beberapa lapis proteksi teknis sekaligus untuk "menaikkan bar" (raising the bar) agar usaha membongkarnya menjadi tidak sebanding dengan hasilnya.
> >
> > ### What is Reverse Engineering?
> >
> > **Reverse engineering** adalah proses menganalisis perangkat lunak untuk menemukan kembali desain, kode, atau fungsionalitasnya. Karena software yang didistribusikan umumnya berupa kode biner (machine code), analis menggunakan berbagai teknik untuk merekonstruksi pemahaman tentang cara kerja internal program tanpa memiliki akses ke kode sumber aslinya.
> >
> > RE memiliki banyak penggunaan yang sah. Untuk **compatibility**, pengembang dapat mempelajari format file atau protokol tertutup agar produk mereka dapat berinteroperasi. Untuk **security analysis**, peneliti keamanan membongkar malware atau mencari kerentanan pada software pihak ketiga. Sayangnya, teknik yang sama juga digunakan untuk **piracy**—membongkar mekanisme proteksi agar software dapat digunakan secara ilegal tanpa lisensi.
> >
> > Batas legal dan etis dari RE bervariasi tergantung negara dan konteks. Di sebagian yurisdiksi, RE untuk tujuan interoperabilitas diperbolehkan secara eksplisit, sementara RE untuk membongkar proteksi hak cipta dilarang. Konteks penggunaan, niat (intent), dan ada-tidaknya perjanjian lisensi (EULA) yang melarang RE semuanya memengaruhi apakah suatu aktivitas RE dianggap sah. Praktisi keamanan yang etis harus selalu memastikan dasar hukum dan izin sebelum melakukan RE pada software milik orang lain.
> >
> > ### Tools & Techniques
> >
> > Reverse engineering didukung oleh beberapa kategori tools utama yang masing-masing menangani level abstraksi berbeda. **Disassembler** mengubah machine code menjadi assembly yang lebih dapat dibaca manusia; contoh paling terkenal adalah **IDA Pro**. **Decompiler** melangkah lebih jauh dengan mencoba merekonstruksi kode sumber tingkat tinggi dari biner; contohnya **Ghidra** (dirilis oleh NSA, gratis dan open-source) untuk biner native, serta **JD-GUI** untuk file Java `.class`.
> >
> > Selain itu, **debugger** memungkinkan analis menjalankan kode langkah demi langkah (step through) sambil mengamati nilai register dan memori secara dinamis; contohnya **x64dbg** dan **OllyDbg**. Terakhir, **hex editor** memungkinkan analis menyunting file biner secara langsung byte demi byte, misalnya untuk mem-patch sebuah instruksi atau mengubah konstanta. Kombinasi static analysis (disassembler/decompiler) dan dynamic analysis (debugger) memberikan gambaran lengkap tentang perilaku program.
> >
> > ```mermaid
> > flowchart LR
> >     B["Binary / Machine code"] --> D["Disassembler<br/>(IDA Pro)"]
> >     B --> C["Decompiler<br/>(Ghidra, JD-GUI)"]
> >     B --> G["Debugger<br/>(x64dbg, OllyDbg)"]
> >     B --> H["Hex Editor"]
> >     D --> U["Pemahaman desain &amp; fungsi"]
> >     C --> U
> >     G --> U
> >     H --> U
> > ```
> >
> > ### Studi Kasus
> >
> > Sejarah menunjukkan pertarungan terus-menerus antara vendor dan reverse engineer. **Microsoft Windows Activation Hacks**: versi awal Windows banyak dibajak; hacker me-reverse engineer mekanisme aktivasi sehingga salinan ilegal dapat dijalankan. Microsoft kehilangan miliaran dolar dan terpaksa mendesain ulang sistem proteksinya. Kasus ini menunjukkan bahwa mekanisme aktivasi yang lemah dapat menjadi titik serang utama.
> >
> > **Sony PlayStation Hacking**: hacker me-reverse engineer firmware PlayStation agar dapat menjalankan game bajakan maupun homebrew. Hal ini menyebabkan kerugian besar bagi Sony serta pertempuran hukum yang panjang dengan para hacker. Sony merespons dengan rangkaian update perangkat keras dan perangkat lunak—sebuah pola "kucing-dan-tikus" yang khas dalam dunia proteksi.
> >
> > **Adobe Software Cracks**: mekanisme licensing dan aktivasi Adobe di-bypass oleh reverse engineer, dan versi crack menyebar luas secara online sehingga menyebabkan revenue loss. Respons strategis Adobe adalah berpindah ke model **cloud-based subscription** (Creative Cloud), yang memberi kontrol jauh lebih baik karena validasi lisensi terjadi di server dan software membutuhkan koneksi periodik—sebuah pergeseran dari proteksi berbasis client ke proteksi berbasis layanan.

> [!cornell] #### Summary
>
> **Intellectual Property Rights (IPR)** melindungi kreasi pikiran termasuk software melalui **copyright**, **patent**, dan **trade secret**, memberi creator kontrol dan profit. **Application protection** menegakkan IPR secara teknis dengan mempersulit copying dan tampering, karena proteksi legal hanya efektif bila ada barrier teknis. **Reverse engineering** menganalisis software untuk menemukan desain dan fungsinya—berguna untuk compatibility dan security analysis, namun juga dipakai untuk piracy, dengan batas legal yang bervariasi antar negara. Tools utamanya mencakup **disassembler** (IDA Pro), **decompiler** (Ghidra, JD-GUI), **debugger** (x64dbg, OllyDbg), dan **hex editor**. Studi kasus Microsoft, Sony, dan Adobe menunjukkan pertarungan berkelanjutan vendor vs reverse engineer, dengan Adobe akhirnya beralih ke model cloud subscription untuk kontrol yang lebih kuat.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Pertarungan antara proteksi dan reverse engineering sering dijelaskan dengan konsep **economics of security**: tujuannya bukan membuat software mustahil dibongkar (secara teoretis tidak mungkin untuk kode yang dijalankan di mesin yang dikuasai penyerang), melainkan membuat biaya membongkarnya lebih besar daripada keuntungan yang diperoleh. Inilah inti "raising the bar". Dalam praktiknya, vendor modern menggabungkan proteksi client-side dengan validasi **server-side** (online activation, streaming asset, server-authoritative logic) karena penyerang tidak menguasai server—pergeseran yang persis tercermin pada langkah Adobe menuju Creative Cloud.
>
> Secara hukum, di Amerika Serikat **DMCA Section 1201** melarang "circumvention of technological protection measures", namun terdapat pengecualian (exemptions) untuk interoperabilitas, riset keamanan, dan accessibility. Di Uni Eropa, **Software Directive (2009/24/EC) Article 6** secara eksplisit mengizinkan dekompilasi untuk tujuan interoperabilitas dengan syarat ketat. Memahami kerangka ini penting agar aktivitas RE yang sah tidak terjerat pasal pidana.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil program "Hello World" sederhana yang Anda compile sendiri (C/C++), lalu buka di **Ghidra**. Bandingkan decompiled output dengan kode sumber asli dan amati informasi apa saja yang hilang (nama variabel, komentar, tipe).
> 2. Gunakan **JD-GUI** pada file `.jar` open-source, lalu coba alat obfuscator seperti ProGuard dan dekompilasi ulang. Dokumentasikan perbedaan keterbacaan sebelum dan sesudah obfuscation.
> 3. Buat tabel perbandingan legal RE antara tiga yurisdiksi (AS, UE, Indonesia) untuk kasus interoperabilitas, riset keamanan, dan piracy.
>
> #### Bacaan Lanjutan
> - Eldad Eilam, "Reversing: Secrets of Reverse Engineering" — referensi klasik tentang teknik RE.
> - Dokumentasi resmi Ghidra (ghidra-sre.org) dan IDA Pro (hex-rays.com).
> - WIPO — "What is Intellectual Property?" untuk dasar IPR internasional.
> - hackaday.com — "How the Sony PlayStation Was Hacked" (referensi studi kasus dari slide).
