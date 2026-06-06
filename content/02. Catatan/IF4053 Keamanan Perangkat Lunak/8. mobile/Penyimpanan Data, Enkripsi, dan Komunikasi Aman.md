---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Penyimpanan Data, Enkripsi, dan Komunikasi Aman
>
> > ## Questions/Cues
> >
> > - Apa saja opsi penyimpanan data Android dan bagaimana memilih yang aman?
> > - Bagaimana enkripsi filesystem Android melindungi data pada perangkat hilang/dicuri?
> > - Mengapa kunci enkripsi harus dilindungi password pengguna di KeyStore?
> > - Apa best practice komunikasi aman (HTTPS, pinning, certificate)?
> > - Bagaimana contoh serangan JS browser Android 2.2/2.3 membaca file plaintext?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W10 Mobile Security — bagian "Storing Data, Encryption & Communication")
>
> > ### Storing Data: Opsi Penyimpanan dan Praktik Aman
> >
> > Karena **setiap aplikasi berjalan sebagai pengguna tersendiri**, file yang dibuat satu aplikasi tidak dapat dibaca atau diubah aplikasi lain kecuali pengembang secara eksplisit mengeksposnya. Android menyediakan beberapa **opsi Data Store**: **app-specific** (penyimpanan privat aplikasi), **shared storage** (penyimpanan eksternal yang dapat diakses bersama), **preference** (key-value untuk pengaturan), dan **database** (SQLite). Setiap opsi memiliki implikasi keamanan berbeda—penyimpanan eksternal jauh lebih terbuka dibanding internal.
> >
> > Untuk melindungi file sensitif, **enkripsi file dengan kunci tertentu**: tempatkan kunci di **KeyStore** dan **lindungi dengan password pengguna yang tidak disimpan di perangkat**. Alternatif berbagi data terkontrol adalah **content provider**, yang menawarkan permission baca/tulis ke aplikasi lain dan dapat memberikan *grant* dinamis per kasus, atau menggunakan **explicit intent dengan grant akses data sekali pakai (on-time data access)**.
> >
> > Praktik penyimpanan aman mencakup: aktifkan **encrypted filesystem** untuk melindungi data pada perangkat hilang/dicuri; **buat pengguna sadar** kapan dan mengapa aplikasi mengumpulkan/menggunakan/membagikan data sensitif; **simpan data sensitif di internal app-specific storage**; **batasi scope direktori di external storage**; **periksa integritas/autentisitas data**; dan **hanya simpan data non-sensitif di cache files**. Prinsipnya: data sensitif tetap di lingkup internal, eksternal seminimal dan secakupnya mungkin.
> >
> > ### Encryption: Algoritma, Mode, dan Kunci
> >
> > Sejak **Android 3.0+**, tersedia **full filesystem encryption** sehingga seluruh data pengguna dapat dienkripsi di kernel. Rekomendasi algoritmanya spesifik: gunakan **AES 256-bit** untuk keperluan komersial (jika tidak tersedia, gunakan **AES 128-bit**); gunakan ukuran kunci publik **224- atau 256-bit untuk kriptografi elliptic curve (EC)**. Pengembang juga harus **memahami kapan menggunakan mode blok CBC, CTR, atau GCM**, dan **menghindari IV/counter reuse pada mode CTR**—pastikan IV/counter bersifat *cryptographically random*.
> >
> > Untuk integritas, ketika menggunakan enkripsi mode **CBC atau CTR**, implementasikan integritas dengan salah satu fungsi: **HMAC-SHA1, HMAC-SHA-256, HMAC-SHA-512, atau mode GCM** (yang sudah menyediakan integritas terotentikasi). Selain itu, gunakan **SecureRandom** untuk PRNG dan **KeyGenerator** untuk kunci kriptografi, lalu **simpan kunci di KeyStore**.
> >
> > Aspek krusial pada perangkat hilang/dicuri: **full filesystem encryption Android menggunakan password perangkat untuk melindungi kunci enkripsi**, sehingga **memodifikasi bootloader atau sistem operasi pun tidak cukup** untuk mengakses data pengguna tanpa password perangkat tersebut. Terkait **Password Protection**, Android dapat **meminta password yang dipasok pengguna sebelum memberikan akses ke perangkat**; password ini **melindungi kunci kriptografi untuk full file system encryption**. Aplikasi juga sebaiknya **meminta kredensial sebelum menampilkan data sensitif**.
> >
> > ### Communication: HTTPS, Pinning, dan Certificate
> >
> > Komunikasi aman dimulai dengan **memaksa penggunaan komunikasi aman**: gunakan **implicit intents** dan **non-exported content providers** untuk membatasi paparan. Aturan utamanya, **gunakan HTTPS over HTTP di mana pun HTTPS didukung**. Praktik terbaik HTTPS meliputi **CA Blacklisting**, **certificate Pinning** (mengikat aplikasi ke sertifikat/kunci publik server tertentu agar kebal MITM dengan CA palsu), dan **Client Cert** (autentikasi dua arah).
> >
> > Prinsip pertahanan lainnya: **jangan percayai data yang diunduh via HTTP atau protokol tidak aman lainnya**. Ini mencakup **validasi input pada WebView** dan **validasi respons terhadap intent yang diterbitkan melawan HTTP**. Dengan kata lain, semua data yang masuk dari jaringan harus diperlakukan sebagai tidak tepercaya hingga divalidasi.
> >
> > Pada sisi distribusi, **signed apps/stores** menambah lapisan kepercayaan: aplikasi **ditandatangani dengan private developer key**, dan di Android/iPhone aplikasi **harus ditandatangani di market**. **Persetujuan manual mengurangi kemungkinan aplikasi nakal**, dan aplikasi dari **App Store/Market resmi umumnya dianggap telah diaudit**—meski slide menantang asumsi ini ("Apakah ini benar untuk Apple/Google Play?"). Pengguna juga dapat menilai dan mengomentari aplikasi, namun rating bukan jaminan keamanan.
> >
> > ### Contoh Serangan dan Praktik Kode Lainnya
> >
> > Slide menyajikan **contoh serangan konkret** pada **Android 2.2/2.3** yang memiliki kerentanan. Skenarionya: **browser mengunduh halaman HTML** yang **berisi kode JavaScript**; kode JS tersebut **dapat self-execute kemudian dalam konteks "local"**. Konteks local ini **memiliki permission lebih tinggi dan dapat memodifikasi local file system**. Jika sebuah **aplikasi ABC menyimpan data sensitif** (yang penting secara finansial) di **local file system sebagai file plaintext**, maka **kode JS jahat tersebut dapat membaca dan mengaksesnya**. Ini mengilustrasikan bahaya menyimpan data sensitif tanpa enkripsi dan mengeksekusi konten web dalam konteks ber-privilege.
> >
> > Untuk mencegah kelas serangan semacam ini, terapkan **Other Code Practices for Security & Privacy**: **lakukan input validation**; **gunakan WebView (jika perlu) hanya dengan konten allowlisted**; **hindari dynamic code loading** (memuat kode saat runtime sulit diaudit dan rawan injeksi); **disable IPC secara default**; dan gunakan **user-resettable identifiers**—**jangan gunakan IMEI** sebagai identifier permanen, serta **jangan izinkan akses Mic & Camera saat aplikasi berada di background**. Praktik tambahan lain mencakup pengecekan kompatibilitas perangkat dengan **SafetyNet**, pengecekan URL dengan **Safe Browsing API**, dan memperbarui **java.security Provider** untuk melindungi dari eksploitasi SSL.

> [!cornell] #### Summary
>
> Android menyediakan opsi penyimpanan **app-specific, shared storage, preference, dan database**; data sensitif harus disimpan di **internal app-specific storage**, dienkripsi dengan kunci di **KeyStore** yang dilindungi **password pengguna** (tidak disimpan di perangkat), dengan scope eksternal dibatasi dan integritas diperiksa. **Full filesystem encryption (Android 3.0+)** memakai **AES-256/128**, EC **224/256-bit**, mode **CBC/CTR/GCM** (hindari IV reuse), integritas via **HMAC-SHA/GCM**, serta **SecureRandom + KeyStore**; password perangkat melindungi kunci sehingga modifikasi bootloader/OS tak cukup membobol data. Komunikasi harus **HTTPS over HTTP** dengan **CA blacklisting, certificate pinning, client cert**, tanpa memercayai data HTTP dan memvalidasi WebView. Aplikasi **ditandatangani** dan diaudit app store. Contoh serangan **Android 2.2/2.3**—JS browser self-execute di konteks local membaca file plaintext—menegaskan pentingnya enkripsi, **input validation**, **WebView allowlisted**, hindari **dynamic code loading**, disable IPC default, dan identifier resettable (bukan IMEI).

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Sejak Android 7.0, **File-Based Encryption (FBE)** menggantikan **Full-Disk Encryption (FDE)** lama, memungkinkan **Direct Boot**—sebagian data terenkripsi dengan *Device Encrypted (DE)* storage tersedia sebelum unlock, sisanya *Credential Encrypted (CE)* baru terbuka setelah password dimasukkan. Untuk pengembang, **Android Keystore** dapat mengikat kunci ke hardware (TEE/StrongBox) dengan properti seperti `setUserAuthenticationRequired()` sehingga kunci hanya dapat dipakai setelah autentikasi biometrik. Terkait pinning, pendekatan modern adalah **Network Security Configuration** (XML deklaratif) yang menggantikan pinning manual rawan-bug, dan kewaspadaan terhadap **TrustManager yang menerima semua sertifikat**—antipola umum yang membatalkan seluruh manfaat TLS. Serangan JS konteks-local pada slide adalah varian **file:// scheme** / `setAllowFileAccessFromFileURLs`, kini dinonaktifkan secara default pada WebView modern.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan enkripsi data dengan **Jetpack Security (EncryptedFile/EncryptedSharedPreferences)** yang memanfaatkan Android Keystore; verifikasi kunci tidak pernah meninggalkan TEE.
> 2. Konfigurasikan **certificate pinning** via Network Security Configuration, lalu uji dengan proxy MITM (mitmproxy) untuk membuktikan koneksi gagal saat sertifikat dipalsukan.
> 3. Reproduksi prinsip serangan WebView file-access pada aplikasi demo lama, dokumentasikan mitigasi dengan menonaktifkan `allowFileAccess` dan menerapkan allowlist konten.
>
> #### Bacaan Lanjutan
> - Dokumentasi resmi: https://developer.android.com/topic/security/data dan Android Keystore system.
> - OWASP MASTG — bab Data Storage, Cryptography, dan Network Communication.
> - Google Android Security Report (tahunan) untuk tren enkripsi dan Verified Boot.
