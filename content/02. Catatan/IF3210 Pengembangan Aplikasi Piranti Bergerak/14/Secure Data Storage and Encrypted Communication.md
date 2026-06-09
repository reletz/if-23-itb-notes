---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Secure Data Storage and Encrypted Communication
>
> > ## Questions/Cues
> >
> > - Apa saja pilihan penyimpanan data di Android dan mana yang paling aman untuk data sensitif?
> > - Bagaimana Android mengimplementasikan full filesystem encryption sejak versi 3.0?
> > - Mengapa KeyStore penting dan kapan harus digunakan?
> > - Algoritma enkripsi apa saja yang direkomendasikan dan mana yang harus dihindari?
> > - Bagaimana memastikan komunikasi jaringan aman di aplikasi Android?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 44-50)
>
> > ### Pilihan Penyimpanan Data di Android
> >
> > Android menyediakan beberapa mekanisme penyimpanan data, masing-masing dengan karakteristik keamanan yang berbeda:
> >
> > - **App-specific storage** (internal storage): Direktori privat di `/data/data/<package>`, hanya bisa diakses oleh aplikasi itu sendiri. Ini adalah pilihan **paling aman** untuk data sensitif.
> > - **Shared storage**: Area penyimpanan yang dapat diakses antar aplikasi (Downloads, Pictures, dll). Tidak cocok untuk data sensitif karena dapat dibaca aplikasi lain dengan permission yang sesuai.
> > - **Shared preferences**: Penyimpanan key-value untuk data konfigurasi ringan. Disimpan sebagai XML di internal storage, namun tidak dienkripsi secara default — gunakan `EncryptedSharedPreferences` untuk data sensitif.
> > - **Database (Room/SQLite)**: Penyimpanan terstruktur di internal storage. Seperti shared preferences, database tidak dienkripsi secara default.
> > - **Encrypted files dengan KeyStore**: File yang dienkripsi menggunakan kunci yang disimpan di Android KeyStore — pilihan terbaik untuk data sensitif yang perlu persisted.
> > - **Content providers**: Abstraksi berbagi data antar aplikasi dengan kontrol permission yang eksplisit.
> >
> > **Best practices** penyimpanan data:
> > - Gunakan **encrypted filesystem** dan manfaatkan enkripsi bawaan Android
> > - **Minimalkan pengumpulan data sensitif** — jangan simpan apa yang tidak perlu
> > - Simpan data sensitif di **app-specific internal storage**, bukan external
> > - **Batasi scope direktori** saat mengakses external storage (gunakan `getExternalFilesDir()`)
> > - **Periksa integritas** data sebelum digunakan
> > - Hanya **cache data non-sensitif** — jangan cache token, password, atau PII
> >
> > ### Enkripsi Filesystem Android
> >
> > Sejak **Android 3.0 (Honeycomb)**, Android mendukung **full filesystem encryption** (FDE). Enkripsi ini menggunakan standar kriptografi yang kuat:
> >
> > - **AES 256-bit** untuk enkripsi data komersial (simetris)
> > - **Elliptic Curve (EC) 224 atau 256-bit** untuk operasi kunci publik
> > - Block cipher modes yang didukung: **CBC** (Cipher Block Chaining), **CTR** (Counter), **GCM** (Galois/Counter Mode)
> > - **Penting**: Hindari penggunaan ulang IV (Initialization Vector) atau counter di mode CTR, karena ini dapat membatalkan jaminan kerahasiaan
> >
> > Sejak Android 7.0, Android memperkenalkan **File-Based Encryption (FBE)** yang lebih granular — memungkinkan file berbeda dienkripsi dengan kunci berbeda, sehingga beberapa data (seperti alarm) dapat diakses sebelum unlock perangkat.
> >
> > ### Manajemen Kunci dengan KeyStore
> >
> > **Android KeyStore** adalah sistem yang memungkinkan penyimpanan kunci kriptografi dengan aman, di mana kunci **tidak pernah meninggalkan perangkat** dalam bentuk plaintext:
> >
> > - Gunakan **`SecureRandom`** sebagai PRNG (Pseudo-Random Number Generator) yang aman — jangan gunakan `java.util.Random`
> > - Gunakan **`KeyGenerator`** untuk menghasilkan kunci simetris yang langsung disimpan di KeyStore
> > - **Simpan semua kunci kriptografi di KeyStore** — jangan hardcode kunci di kode sumber atau simpan di shared preferences
> > - KeyStore mendukung **attestation** untuk memverifikasi bahwa kunci dibuat dan disimpan di hardware yang aman (TEE atau Secure Element)
> >
> > **Password protection**: Password pengguna digunakan untuk melindungi **encryption key** di full filesystem encryption. Untuk data sensitif dalam aplikasi, terapkan **credential prompt** sebelum data dapat diakses — ini memastikan bahkan jika perangkat dicuri, data tetap terlindungi selama password tidak diketahui.
> >
> > ### Komunikasi Jaringan yang Aman
> >
> > Keamanan data tidak berhenti di penyimpanan — data yang dikirim lewat jaringan juga harus dilindungi:
> >
> > - **Gunakan HTTPS, bukan HTTP** untuk semua komunikasi dengan server — HTTPS mengenkripsi data in-transit menggunakan TLS
> > - **Jangan percaya data HTTP**: Data yang diterima melalui HTTP dapat dimodifikasi di tengah jalan (Man-in-the-Middle), sehingga tidak boleh dipercaya tanpa validasi tambahan
> > - **Validasi input WebView**: Konten yang dimuat di WebView harus divalidasi untuk mencegah XSS dan injeksi script berbahaya
> > - **Gunakan implicit intents** untuk komunikasi antar komponen yang tidak perlu menargetkan komponen spesifik — ini mengurangi risiko intent hijacking
> > - **Non-exported content providers**: Content Provider yang tidak perlu dibagi ke aplikasi lain harus diset `android:exported="false"` di manifest
> > - Implementasikan **Certificate Pinning** untuk aplikasi kritis agar tidak bisa diserang meskipun CA root dikompromikan

> [!cornell] #### Summary
>
> Keamanan data di Android mencakup dua aspek: **penyimpanan** dan **transmisi**. Untuk penyimpanan, data sensitif harus disimpan di **app-specific internal storage** atau dienkripsi menggunakan kunci dari **Android KeyStore**; hindari menyimpan data sensitif di external storage atau cache. Android mendukung **full filesystem encryption** (AES-256) sejak versi 3.0, dengan **File-Based Encryption** yang lebih granular sejak Android 7.0. Untuk kriptografi: gunakan **SecureRandom** untuk PRNG dan hindari penggunaan ulang IV di mode CTR. Untuk komunikasi jaringan, selalu gunakan **HTTPS**, validasi input WebView, gunakan implicit intents, dan set content providers sebagai non-exported jika tidak perlu dibagikan.

> [!ad-libitum]- Additional Information
>
> #### EncryptedSharedPreferences dan EncryptedFile
>
> Library **AndroidX Security** (Jetpack) menyediakan `EncryptedSharedPreferences` dan `EncryptedFile` yang mengabstraksikan kompleksitas enkripsi menggunakan Tink library dari Google. Ini adalah cara termudah untuk mengenkripsi data ringan:
>
> ```kotlin
> val masterKey = MasterKey.Builder(context)
>     .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
>     .build()
>
> val sharedPreferences = EncryptedSharedPreferences.create(
>     context,
>     "secret_shared_prefs",
>     masterKey,
>     EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
>     EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
> )
> ```
>
> #### Network Security Configuration
>
> Android 7.0+ memperkenalkan **Network Security Configuration** yang memungkinkan konfigurasi keamanan jaringan melalui file XML tanpa mengubah kode:
>
> ```xml
> <!-- res/xml/network_security_config.xml -->
> <network-security-config>
>     <domain-config cleartextTrafficPermitted="false">
>         <domain includeSubdomains="true">example.com</domain>
>         <pin-set>
>             <pin digest="SHA-256">base64encodedpin==</pin>
>         </pin-set>
>     </domain-config>
> </network-security-config>
> ```
>
> #### Bahaya Logging Data Sensitif
>
> Salah satu kesalahan umum adalah mencetak data sensitif (token, password, PII) ke Logcat menggunakan `Log.d()`. Di production build, pastikan semua logging sensitif dinonaktifkan menggunakan BuildConfig flags atau library logging yang mendukung level control.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan penyimpanan token autentikasi menggunakan `EncryptedSharedPreferences` di aplikasi Android Anda
> 2. Konfigurasi Network Security Configuration untuk memblokir cleartext traffic dan mengaktifkan certificate pinning
> 3. Gunakan `adb shell run-as <package>` di debug build untuk menjelajahi isi internal storage aplikasi dan verifikasi bahwa file sensitif terenkripsi
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Data and file storage overview"
> - Dokumentasi AndroidX Security: "Work with data more securely"
> - Google Tink cryptography library documentation
> - OWASP Mobile Testing Guide: "Testing Data Storage on Android"
