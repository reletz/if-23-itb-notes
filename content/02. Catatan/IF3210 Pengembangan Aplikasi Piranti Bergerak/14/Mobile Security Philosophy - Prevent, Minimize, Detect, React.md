---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Mobile Security Philosophy - Prevent, Minimize, Detect, React
>
> > ## Questions/Cues
> >
> > - Mengapa pendekatan "hanya pencegahan" tidak cukup dalam keamanan mobile?
> > - Apa saja mekanisme teknis yang digunakan Android untuk pilar Prevent?
> > - Bagaimana pilar Minimize bekerja untuk membatasi dampak saat pencegahan gagal?
> > - Apa peran fuzzing dan honeypot dalam pilar Detect?
> > - Bagaimana mekanisme React (OTA update) Android dibandingkan platform lain?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 51-67)
>
> > ### Filosofi Keamanan: Mengapa Empat Pilar?
> >
> > Keamanan mobile tidak bisa mengandalkan satu strategi tunggal. Dua realitas memaksa pendekatan berlapis: pertama, **sumber daya terbatas** — tidak ada cukup waktu atau tenaga untuk membuat sistem yang sempurna; kedua, **kesenjangan pemahaman** — mayoritas pengembang dan pengguna tidak memiliki latar belakang keamanan yang memadai.
> >
> > Dari kondisi ini lahirlah filosofi empat pilar: **Prevent** (cegah pelanggaran terjadi), **Minimize** (kurangi dampak saat pencegahan gagal), **Detect** (identifikasi kelemahan dan insiden), dan **React** (respons cepat terhadap ancaman yang ditemukan). Keempat pilar ini harus bekerja secara siklus dan berkesinambungan.
> >
> > ### Siklus Empat Pilar Keamanan Mobile
> >
> > ```mermaid
> > flowchart TD
> >     P["PREVENT</br>Sandbox · ASLR · ProPolice</br>Filesystem Encryption</br>Input Validation"]
> >     M["MINIMIZE</br>UID Isolation</br>Same Origin Policy</br>SafetyNet"]
> >     D["DETECT</br>Code Audit · Fuzzing</br>Honeypot</br>Community Reports"]
> >     R["REACT</br>OTA Updates</br>Auto-patch</br>High Update Rate"]
> >     P --> M --> D --> R --> P
> > ```
> >
> >
> > ### Pilar 1: Prevent — Mencegah Pelanggaran
> >
> > Android menginvestasikan sumber daya besar dalam pencegahan. Dengan **5 juta baris kode** dan lebih dari **100 library open source**, tim keamanan Android bekerja sama dengan Google, iSEC Partners, dan n.runs untuk fokus pada area berisiko tinggi: **remote attacks** (serangan dari jaringan) dan **media codecs** (parser file yang sering menjadi vektor eksploitasi).
> >
> > Mekanisme teknis Prevent di level kernel dan runtime:
> > - **ProPolice**: Stack overflow protection — mendeteksi buffer overflow di stack sebelum menyebabkan kerusakan
> > - **Heap protection di dlmalloc**: `dlmalloc` (dynamic memory allocator Android) dimodifikasi untuk mencegah **heap consolidation attacks** dengan memeriksa pointer `fd` (forward) dan `bk` (backward) sebelum operasi free. Serangan yang mencoba mengeksploitasi korupsi heap akan terdeteksi sebelum berjalan.
> > - **ASLR (Address Space Layout Randomization)**: Menempatkan komponen memori di alamat acak sehingga attacker tidak bisa memprediksi lokasi kode yang ingin di-jump ke
> > - **NX (No-Execute) bit**: Menandai halaman memori sebagai non-executable agar injeksi shellcode tidak dapat dijalankan
> > - **OpenBSD dlmalloc**: Versi dlmalloc yang diperkeras dari proyek OpenBSD
> > - **Application Sandbox** dan **encrypted filesystem** (dibahas di catatan terpisah)
> >
> > Prevent di level aplikasi:
> > - Simpan data sensitif di lokasi yang tepat (internal storage + KeyStore)
> > - **KeyStore untuk semua kunci kriptografi** — jangan simpan kunci di kode atau preferences
> > - **Input validation** — validasi semua input sebelum diproses untuk mencegah injection attacks
> > - **Hindari dynamic code loading** — jangan muat dan jalankan kode dari sumber tidak tepercaya saat runtime
> > - **Nonaktifkan IPC secara default** — set `android:exported="false"` untuk semua komponen yang tidak perlu diakses dari luar
> > - **Enforced HTTPS** — tolak komunikasi HTTP cleartext
> >
> > ### Pilar 2: Minimize — Membatasi Dampak
> >
> > Tidak ada sistem yang sempurna, sehingga perlu mekanisme untuk membatasi kerusakan saat pencegahan gagal. Prinsip utamanya adalah **least privilege** — setiap komponen hanya memiliki akses minimum yang dibutuhkan.
> >
> > Mekanisme Minimize di Android:
> > - **Privilege separation per app UID**: Karena setiap aplikasi memiliki UID berbeda, kompromi satu aplikasi tidak otomatis memberikan akses ke aplikasi atau data lain. Dampak eksploitasi terisolasi dalam sandbox aplikasi tersebut.
> > - **Same Origin Policy**: WebView dan komponen web di Android menerapkan Same Origin Policy sehingga skrip dari satu origin tidak dapat mengakses data dari origin berbeda — mencegah data leakage antar situs yang dimuat di WebView.
> > - **SafetyNet** (sekarang bagian dari Play Integrity): Suite layanan yang mencakup **verifyApp** (memindai malware), **Safe Browsing** (URL berbahaya), **Captcha**, dan **Compatibility Check**. SafetyNet bekerja sebagai safety net — jaring pengaman — ketika pertahanan pertama sudah ditembus.
> >
> > ### Pilar 3: Detect — Menemukan Kelemahan
> >
> > Deteksi proaktif lebih baik daripada menunggu laporan insiden. Android menggunakan beberapa teknik:
> >
> > - **Code audits**: Tinjauan kode secara manual oleh tim keamanan internal maupun eksternal, fokus pada area kritis seperti crypto, parsing, dan IPC
> > - **Fuzzing**: Pengujian otomatis dengan input data yang acak atau semi-acak untuk menemukan crash dan kerentanan yang tidak terduga di parser, codec, dan komponen jaringan. Sangat efektif untuk menemukan buffer overflow dan integer overflow.
> > - **Honeypot**: Sistem jebakan yang terlihat seperti target nyata untuk menarik dan mengidentifikasi attacker serta teknik serangan baru
> > - **Community reporting**: Android memiliki program untuk memungkinkan **pengguna**, **pengembang**, dan **security researchers** melaporkan kerentanan yang ditemukan — termasuk Android Security Rewards Program (bug bounty)
> >
> > ### Pilar 4: React — Respons Cepat
> >
> > Deteksi tanpa kemampuan respons cepat tidak berguna. Android memiliki mekanisme distribusi patch yang unggul:
> >
> > - **Autoupdaters / OTA (Over-The-Air) updates**: Patch keamanan dapat didistribusikan dan dipasang secara otomatis tanpa intervensi pengguna
> > - **Automatic updates**: Tingkat update yang sangat tinggi di ekosistem Android — Google Play Services yang diperbarui secara mandiri memungkinkan perbaikan keamanan menjangkau perangkat jauh lebih cepat dari update OS penuh
> >
> > ### Praktik Kode Tambahan
> >
> > Di luar empat pilar utama, ada beberapa praktik kode yang mendukung keseluruhan filosofi keamanan:
> > - **Input validation**: Validasi semua input dari sumber mana pun — jaringan, Intent, user input
> > - **WebView allowlisting**: Hanya izinkan URL yang benar-benar dibutuhkan dimuat di WebView
> > - **No dynamic code loading**: Hindari `DexClassLoader` dari sumber tidak tepercaya
> > - **User-resettable identifiers**: Gunakan identifier yang dapat diatur ulang oleh pengguna — **jangan gunakan IMEI** sebagai identifier karena bersifat permanen dan tidak bisa diganti
> > - **No background mic/camera access**: Aplikasi tidak boleh mengakses mikrofon atau kamera di background tanpa sepengetahuan pengguna — ini adalah prinsip privacy by design

> [!cornell] #### Summary
>
> Filosofi keamanan mobile Android diorganisir dalam empat pilar siklus: **Prevent** menggunakan pertahanan berlapis (ProPolice, ASLR/NX, dlmalloc heap protection, Application Sandbox, encrypted filesystem, input validation, no dynamic code loading); **Minimize** membatasi dampak saat pencegahan gagal melalui isolasi per-UID, Same Origin Policy, dan SafetyNet; **Detect** menemukan kelemahan secara proaktif via code audits, fuzzing, honeypot, dan program community reporting; **React** mendistribusikan perbaikan cepat melalui OTA autoupdates dengan tingkat adopsi tinggi. Praktik kode tambahan melengkapi filosofi ini: WebView allowlisting, larangan IMEI sebagai identifier, dan tidak mengakses kamera/mikrofon di background.

> [!ad-libitum]- Additional Information
>
> #### Android Security Rewards Program
>
> Google menjalankan **Android Security Rewards (ASR)** — bug bounty program yang membayar peneliti keamanan yang menemukan dan melaporkan kerentanan di Android secara bertanggung jawab. Hadiah bisa mencapai ratusan ribu dolar untuk kerentanan kritis yang memungkinkan remote code execution tanpa interaksi pengguna. Ini adalah mekanisme Detect berbasis komunitas yang sangat efektif.
>
> #### Project Zero dan Keamanan Android
>
> **Google Project Zero** adalah tim peneliti keamanan elite Google yang secara proaktif menemukan kerentanan zero-day di berbagai platform, termasuk Android. Temuan mereka menghasilkan patch yang kemudian didistribusikan melalui mekanisme React (OTA). Ini contoh sinergi sempurna antara pilar Detect dan React.
>
> #### ASLR dan Bypass Techniques
>
> Meskipun ASLR efektif, penyerang canggih kadang menggunakan teknik **memory spraying** atau **information leak** untuk mem-bypass ASLR. Modern Android menggunakan ASLR dengan entropy yang lebih tinggi dan dikombinasikan dengan CFI (Control Flow Integrity) untuk mempersulit bypass lebih lanjut.
>
> #### Mengapa Tidak Menggunakan IMEI
>
> IMEI adalah identifier hardware permanen yang tidak dapat diubah. Menggunakannya untuk tracking pengguna menimbulkan masalah privasi serius dan melanggar kebijakan Google Play sejak 2021. Sebagai gantinya, gunakan `Settings.Secure.ANDROID_ID` (yang bisa di-reset) atau `Advertising ID` (yang bisa dinonaktifkan pengguna).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Audit aplikasi Android Anda terhadap daftar praktik kode aman (input validation, WebView allowlisting, no IMEI, no background mic/camera) dan perbaiki yang ditemukan
> 2. Pelajari cara melakukan basic fuzzing menggunakan AFL (American Fuzzy Lop) atau Radamsa pada sebuah native library sederhana
> 3. Implementasikan certificate pinning di aplikasi Android menggunakan OkHttp `CertificatePinner` dan uji dengan mitmproxy
>
> #### Bacaan Lanjutan
>
> - "Android Security Internals" — Nikolay Elenkov
> - Google Android Security Year in Review (annual report)
> - "The Android Security Model" — paper dari tim keamanan Google
> - OWASP Mobile Security Testing Guide — Chapter: Android Anti-Reversing Defenses
