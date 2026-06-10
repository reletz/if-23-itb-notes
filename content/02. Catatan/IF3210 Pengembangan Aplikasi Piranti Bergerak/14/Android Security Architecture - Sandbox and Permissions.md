---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Android Security Architecture - Sandbox and Permissions
>
> > ## Questions/Cues
> >
> > - Apa tiga tujuan utama keamanan Android dan bagaimana arsitektur OS mewujudkannya?
> > - Mengapa setiap aplikasi Android mendapat UID unik dan apa implikasinya?
> > - Bagaimana Application Sandbox mencegah akses lintas-aplikasi?
> > - Apa model whitelist pada sistem permission Android dan apa kelemahannya?
> > - Apa saja layanan keamanan Google yang melindungi ekosistem Android?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 24-43)
>
> > ### Tujuan dan Risiko Keamanan Android
> >
> > Android dirancang dengan tiga tujuan keamanan utama: **melindungi data pengguna** dari akses tidak sah, **melindungi sumber daya sistem** (CPU, memori, jaringan) dari penyalahgunaan, dan **menyediakan isolasi aplikasi** agar satu aplikasi tidak dapat mengganggu aplikasi lain.
> >
> > Namun ancaman nyata tetap ada. Aplikasi berbahaya di Android dapat melakukan berbagai hal merusak: **mengeksploitasi bug** untuk mendapatkan permission lebih tinggi (privilege escalation), mengirim **spam**, membuat dirinya **tahan di-uninstall**, **menyebar** ke perangkat lain, **menyembunyikan file**, melakukan **data disclosure** ke pihak ketiga, **menghancurkan data**, melakukan **impersonasi** aplikasi sah, atau sengaja **menguras baterai** (resource exhaustion).
> >
> > ### Lapisan Keamanan Android
> >
> > ```mermaid
> > flowchart TB
> >     A["Application Layer\n(User Apps)"]
> >     B["Application Framework\n(Android APIs)"]
> >     C["Application Sandbox\n(UID Isolation per App)"]
> >     D["Linux Kernel\n(User-based Permissions, Process Isolation)"]
> >     E["Hardware\n(Filesystem Encryption, Secure Element)"]
> >     A --> B --> C --> D --> E
> > ```
> >
> >
> > Keamanan Android dibangun berlapis. **Linux kernel** menyediakan fondasi berupa model izin berbasis pengguna (user-based permissions) dan isolasi proses. Di atasnya, **Application Sandbox** menjamin setiap aplikasi berjalan terisolasi. **Android framework** menyediakan IPC yang aman dan sistem permission, sementara **lapisan aplikasi** tunduk pada deklarasi permission di manifest.
> >
> > ### Linux Kernel Security dan Application Sandbox
> >
> > Android mewarisi model keamanan Unix dari Linux. Setiap pengguna di Unix mendapat **User ID (UID)** unik dan hanya bisa mengakses file miliknya sendiri. Android mengadopsi konsep ini untuk aplikasi: **setiap aplikasi diperlakukan sebagai pengguna Linux tersendiri** dengan UID unik yang ditetapkan saat instalasi.
> >
> > **Application Sandbox** adalah mekanisme mandatory yang mengimplementasikan isolasi ini. Ciri-cirinya:
> > - Setiap aplikasi mendapat **UID unik** yang tidak berubah selama diinstal
> > - Setiap aplikasi berjalan dalam **proses terpisah** (separate process)
> > - Semua library yang digunakan aplikasi juga berada **dalam sandbox** yang sama
> > - Aplikasi **tidak dapat mengakses data aplikasi lain** secara langsung
> > - Bahkan dengan permission yang sama, dua aplikasi berbeda tetap tidak bisa saling akses data
> >
> > Terdapat kerentanan yang disebut **Shared UID regression**: jika malware berhasil mendapatkan UID yang sama dengan aplikasi yang sudah terinstal (misalnya melalui manipulasi saat instalasi), isolasi sandbox dapat ditembus karena sistem menganggap keduanya sebagai aplikasi yang sama.
> >
> > ### Empat Fondasi Keamanan Android
> >
> > Android membangun keamanannya di atas empat pilar:
> >
> > 1. **Application Sandbox**: Isolasi mandatory berbasis UID per aplikasi seperti dijelaskan di atas
> > 2. **Secure IPC (Inter-Process Communication)**: Komunikasi antar-aplikasi harus melalui mekanisme resmi (Intent, Binder, Content Provider) yang dikendalikan oleh sistem
> > 3. **System and User-defined Permissions**: Kontrol akses granular terhadap fitur sensitif, baik yang didefinisikan sistem maupun oleh aplikasi sendiri
> > 4. **Application Signing**: Setiap APK harus ditandatangani secara kriptografis; sistem menggunakan tanda tangan untuk verifikasi identitas pengembang dan memastikan integritas update
> >
> > **Pemisahan Hak Akses (Privilege Separation)** juga diterapkan pada level sistem. Contohnya, library pengolah media (*codecs*) yang sangat kompleks dan rawan celah keamanan dijalankan dalam proses terpisah dengan hak akses terbatas (**mediaserver**). Dengan demikian, jika terjadi eksploitasi pada parser media, penyerang tetap terisolasi dan tidak mendapatkan akses penuh ke sistem.
> >
> > ### Sistem Permission Android
> >
> > Permission di Android beroperasi sebagai **whitelist model**: akses ke resource sensitif diblokir secara default, dan aplikasi harus secara eksplisit meminta izin yang diperlukan. Terdapat lebih dari **194 permission** yang didefinisikan oleh sistem.
> >
> > Mekanisme utama:
> > - Setiap aplikasi berjalan sebagai pengguna Linux sendiri — file aplikasi tidak dapat diakses oleh aplikasi lain secara default
> > - Aplikasi **wajib mendeklarasikan permission** yang dibutuhkan di `AndroidManifest.xml`
> > - Kontrol akses bersifat **fine-grained**: per-fitur, per-hardware (kamera, mikrofon, GPS)
> > - Sejak Android 6.0 (Marshmallow), permission sensitif diminta **saat runtime**, bukan hanya saat instalasi
> >
> > **Best practices** penggunaan permission:
> > - **Minimize permissions**: Hanya minta permission yang benar-benar dibutuhkan
> > - **Ask at runtime**: Minta permission tepat saat dibutuhkan, bukan sekaligus di awal
> > - **Transparent**: Jelaskan ke pengguna mengapa permission tersebut diperlukan
> > - **Handle revocation gracefully**: Aplikasi harus tetap berfungsi (sebagian) saat permission dicabut
> > - **Restrict IPC interactions**: Batasi komponen yang bisa diakses oleh aplikasi lain
> >
> > **Masalah umum** terkait permission: banyak aplikasi meminta permission berlebihan, pengguna kewalahan dan cenderung menekan "izinkan" tanpa berpikir, update aplikasi dapat menambah permission baru, dan adanya potensi **privilege escalation** di mana aplikasi berbahaya memanfaatkan permission sah untuk tujuan lain.
> >
> > ### Google Security Services
> >
> > Google menyediakan beberapa layanan keamanan yang terintegrasi di ekosistem Android:
> > - **Play Integrity API**: Memverifikasi bahwa APK berasal dari Google Play dan belum dimodifikasi
> > - **Safe Browsing API**: Melindungi pengguna dari situs web berbahaya dalam WebView dan browser
> > - **Verify Apps (Google Play Protect)**: Memindai aplikasi yang terinstal secara berkala untuk mendeteksi malware
> > - **SafetyNet**: Suite API yang mencakup verifikasi perangkat, Safe Browsing, dan Captcha
> > - **Android Device Manager**: Memungkinkan pemilik melacak dan menghapus data perangkat dari jarak jauh

> [!cornell] #### Summary
>
> **Android security architecture** dibangun berlapis dari Linux kernel hingga application layer. Fondasi utamanya adalah **Application Sandbox** yang memberikan UID unik per aplikasi sehingga proses dan data terisolasi secara mandatory. Empat pilar keamanan — **sandbox**, **secure IPC**, **permission system**, dan **application signing** — bekerja bersama untuk membatasi dampak aplikasi berbahaya. Sistem **permission** beroperasi sebagai whitelist (194+ permission), dengan best practice minimisasi, runtime request, dan graceful revocation handling. **Google Security Services** seperti Play Integrity API, Verify Apps, dan SafetyNet melengkapi pertahanan di tingkat ekosistem.

> [!ad-libitum]- Additional Information
>
> #### Scoped Storage: Evolusi Izin Penyimpanan
>
> Sejak Android 10 (Q), Google memperkenalkan **Scoped Storage** yang membatasi akses aplikasi ke external storage. Aplikasi hanya dapat mengakses file yang mereka buat sendiri atau file media melalui MediaStore API. Ini adalah respons langsung terhadap M9 OWASP (Insecure Data Storage) dan praktik buruk aplikasi yang membaca seluruh storage.
>
> #### Rooting dan Implikasi Keamanannya
>
> Rooting pada dasarnya menghancurkan Application Sandbox dengan memberikan akses root (UID 0) ke aplikasi. Perangkat yang di-root kehilangan jaminan isolasi karena aplikasi dengan akses root dapat membaca data aplikasi lain. Play Integrity API dan SafetyNet dirancang sebagian untuk mendeteksi kondisi ini dan memungkinkan aplikasi sensitif (banking, enterprise) menolak berjalan di perangkat yang di-root.
>
> #### Android vs iOS: Model Permission
>
> iOS menggunakan model yang mirip namun lebih ketat dalam beberapa aspek: permission dikategorikan lebih sedikit, tidak ada sideloading (di luar TestFlight), dan App Store review lebih intensif. Android di sisi lain lebih terbuka (APK dapat dipasang dari sumber luar) namun mengkompensasi dengan Verify Apps yang aktif memindai semua aplikasi terinstal, bukan hanya yang dari Play Store.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Gunakan `adb shell ps` dan `adb shell cat /proc/<pid>/status` untuk melihat UID masing-masing aplikasi yang sedang berjalan di emulator
> 2. Implementasikan permission request runtime yang proper di aplikasi Android Anda dengan `ActivityResultContracts.RequestPermission` dan tangani skenario penolakan permanen
> 3. Eksplorasi Play Integrity API dan implementasikan integrity check dasar di aplikasi Android Anda
>
> #### Bacaan Lanjutan
>
> - Android Security Bulletin — security.googleblog.com
> - "Android Internals: A Confectioner's Cookbook" — Jonathan Levin
> - Dokumentasi Resmi: "Android Security Overview"
> - OWASP Mobile Security Testing Guide — Chapter: Android Platform Overview
