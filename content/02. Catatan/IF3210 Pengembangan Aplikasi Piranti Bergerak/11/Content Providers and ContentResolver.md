---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Content Providers and ContentResolver
>
> > ## Questions/Cues
> >
> > - Mengapa Content Provider dibutuhkan untuk berbagi data antar aplikasi?
> > - Bagaimana alur permintaan data dari Activity hingga kembali sebagai Cursor?
> > - Apa saja komponen yang membentuk sebuah sistem Content Provider?
> > - Bagaimana cara mengimplementasikan Content Provider kustom?
> > - Mengapa pengaturan permission di manifest sangat penting untuk Content Provider?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 27-35)
>
> > ### Tujuan Content Provider
> >
> > **Content Provider** adalah komponen Android yang memungkinkan **berbagi data secara aman antar aplikasi yang berbeda**. Tanpa Content Provider, setiap aplikasi hanya dapat mengakses penyimpanan datanya sendiri dan tidak ada mekanisme standar untuk berbagi data ke luar.
> >
> > Content Provider hadir sebagai lapisan abstraksi di atas penyimpanan data. Ia menyembunyikan detail implementasi penyimpanan (apakah SQLite, file, atau jaringan) dan menyajikan antarmuka yang seragam kepada aplikasi konsumen. Karena akses dikelola melalui satu titik terpusat, **permission dan keamanan** dapat diterapkan secara konsisten.
> >
> > Contoh konkret: sebuah rantai toko topi memiliki satu Content Provider yang menyimpan data stok. Banyak aplikasi berbeda — aplikasi kasir, aplikasi inventaris, aplikasi analitik — semuanya dapat mengakses data yang sama melalui Content Provider tersebut tanpa perlu mengetahui bagaimana data disimpan secara internal.
> >
> > ### Alur Akses Data: Activity → ContentResolver → ContentProvider → Data
> >
> > ```mermaid
> > flowchart TD
> >     A["Activity </br>Adapter"] -->|"query / insert </br>update / delete"| CR["ContentResolver"]
> >     CR -->|"URI matching"| CP["ContentProvider"]
> >     CP -->|"operasi CRUD"| DB["Data</br>(SQLite / File)"]
> >     DB -->|"Cursor"| CP
> >     CP -->|"Cursor"| CR
> >     CR -->|"Cursor"| A
> > ```
> >
> > Alur kerja detail dari permintaan data:
> >
> > 1. **Activity atau Adapter** memanggil metode pada `ContentResolver` (misalnya `query()`) dengan menyertakan **URI** yang mengidentifikasi data yang diinginkan
> > 2. **ContentResolver** bertindak sebagai perantara — ia menerima request dan meneruskannya ke ContentProvider yang tepat berdasarkan authority di URI
> > 3. **ContentProvider** menerima request, menjalankan operasi CRUD pada sumber data yang sebenarnya (biasanya database SQLite)
> > 4. Hasil dikembalikan sebagai objek **`Cursor`** — sebuah pointer yang dapat diiterasi pada baris-baris hasil query
> >
> > ### Komponen Sistem Content Provider
> >
> > Sebuah sistem Content Provider yang lengkap terdiri dari beberapa komponen yang bekerja sama:
> >
> > | Komponen | Peran |
> > |----------|-------|
> > | **Data** | Penyimpanan aktual, biasanya SQLite database |
> > | **Contract Class** | Kelas publik yang mendokumentasikan URI, nama kolom, dan konstanta — berfungsi sebagai "API contract" bagi konsumen |
> > | **ContentProvider Subclass** | Implementasi CRUD yang menghubungkan request ke data aktual |
> > | **ContentResolver** | Klien yang digunakan oleh aplikasi konsumen untuk mengakses provider |
> > | **Permissions** | Deklarasi di manifest yang mengontrol siapa yang boleh read/write |
> >
> > **Contract class** adalah komponen yang sering diabaikan namun sangat penting — ia mendefinisikan konstanta publik seperti URI authority, nama tabel, dan nama kolom sehingga aplikasi konsumen tidak perlu menebak-nebak format string.
> >
> > ### Mengimplementasikan Content Provider Kustom
> >
> > Untuk membuat Content Provider kustom, buat kelas yang meng-extend `ContentProvider` dan implementasikan enam metode abstrak:
> >
> > - **`onCreate()`** — inisialisasi provider (buat atau buka database)
> > - **`query(uri, projection, selection, selectionArgs, sortOrder)`** — mengembalikan `Cursor` berisi data
> > - **`insert(uri, values)`** — menambah baris baru, mengembalikan URI baris yang baru dibuat
> > - **`update(uri, values, selection, selectionArgs)`** — memperbarui baris yang ada
> > - **`delete(uri, selection, selectionArgs)`** — menghapus baris
> > - **`getType(uri)`** — mengembalikan MIME type untuk URI yang diberikan
> >
> > Provider kemudian didaftarkan di `AndroidManifest.xml` menggunakan tag `<provider>`:
> >
> > ```xml
> > <provider
> >     android:name=".MyContentProvider"
> >     android:authorities="com.example.myapp.provider"
> >     android:exported="true"
> >     android:readPermission="com.example.myapp.READ"
> >     android:writePermission="com.example.myapp.WRITE" />
> > ```
> >
> > ### Pengaturan Permission di Manifest
> >
> > Secara default, Content Provider yang di-export (`android:exported="true"`) dapat dibaca dan ditulis oleh **semua aplikasi tanpa pembatasan**. Ini adalah risiko keamanan serius yang harus segera ditangani dengan mendefinisikan permission secara eksplisit.
> >
> > Langkah pengamanan yang benar:
> >
> > 1. **Definisikan permission** dengan tag `<permission>` menggunakan nama unik berbasis nama paket
> > 2. **Terapkan permission** ke provider via atribut `android:readPermission` dan `android:writePermission`
> > 3. **Minta permission** di aplikasi konsumen menggunakan `<uses-permission>` di manifest mereka
> >
> > Nama permission harus **unik secara global** — gunakan nama paket aplikasi sebagai prefix untuk menghindari tabrakan dengan aplikasi lain yang mungkin mendefinisikan permission dengan nama serupa.

> [!cornell] #### Summary
>
> **Content Provider** adalah komponen untuk berbagi data antar aplikasi secara aman melalui antarmuka yang seragam. Alur aksesnya: **Activity/Adapter** memanggil **`ContentResolver`** yang meneruskan request ke **`ContentProvider`**, yang mengoperasikan data dan mengembalikan **`Cursor`**. Sistem yang lengkap mencakup: data (SQLite), **contract class** sebagai dokumentasi API publik, subclass ContentProvider, ContentResolver di sisi konsumen, dan deklarasi permission di manifest. Secara default provider yang di-export terbuka untuk semua aplikasi, sehingga **permission eksplisit** dengan nama unik berbasis paket wajib dikonfigurasi untuk keamanan.

> [!ad-libitum]- Additional Information
>
> #### UriMatcher untuk Routing Request
>
> Di dalam implementasi ContentProvider, **`UriMatcher`** digunakan untuk memetakan URI yang masuk ke operasi yang tepat. Ini memungkinkan satu provider menangani banyak jenis resource (misalnya `/products` untuk semua produk dan `/products/#` untuk produk spesifik):
>
> ```kotlin
> private val uriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
>     addURI("com.example.myapp.provider", "products", CODE_PRODUCTS_DIR)
>     addURI("com.example.myapp.provider", "products/#", CODE_PRODUCT_ITEM)
> }
> ```
>
> #### CursorLoader untuk Query Asinkron
>
> Melakukan query ContentProvider di main thread akan memblokir UI. Gunakan **`CursorLoader`** atau kombinasi `ContentResolver.query()` dalam `Coroutine` (dengan `Dispatchers.IO`) untuk query asinkron yang tidak membekukan tampilan:
>
> ```kotlin
> viewModelScope.launch(Dispatchers.IO) {
>     val cursor = contentResolver.query(uri, null, null, null, null)
>     // proses cursor di sini
> }
> ```
>
> #### Content Provider Bawaan Android
>
> Android menyertakan sejumlah built-in Content Provider yang dapat diakses oleh aplikasi dengan permission yang sesuai:
>
> - **`ContactsContract`** — data kontak pengguna
> - **`MediaStore`** — foto, video, dan file audio di penyimpanan perangkat
> - **`CalendarContract`** — data kalender dan event
> - **`CallLog`** — riwayat panggilan telepon
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat Content Provider sederhana untuk menyimpan daftar catatan (title, content, timestamp) dan akses dari Activity di aplikasi yang sama menggunakan ContentResolver
> 2. Implementasikan UriMatcher untuk mendukung query semua catatan dan query catatan spesifik berdasarkan ID
> 3. Buat aplikasi kedua yang mengakses Content Provider dari aplikasi pertama dengan deklarasi `<uses-permission>` yang tepat
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Content Providers"
> - Android Developer Guide: "Creating a Content Provider"
> - Android Developer Guide: "Content Provider Basics"
> - "Android Programming: The Big Nerd Ranch Guide" — Bab Content Providers dan ContentResolver
