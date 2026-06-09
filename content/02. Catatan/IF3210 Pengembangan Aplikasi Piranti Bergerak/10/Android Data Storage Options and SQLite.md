---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Android Data Storage Options and SQLite
>
> > ## Questions/Cues
> >
> > - Apa saja empat cara menyimpan data di Android dan kapan masing-masing digunakan?
> > - Apa perbedaan antara app-specific storage dan shared storage?
> > - Bagaimana struktur data dalam sebuah database relasional?
> > - Perintah SQL apa yang digunakan untuk operasi CRUD dasar?
> > - Apa keterbatasan penggunaan SQLite secara langsung tanpa abstraksi?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 3-8)
>
> > ### Pilihan Penyimpanan Data di Android
> >
> > Android menyediakan empat kategori utama penyimpanan data yang masing-masing cocok untuk kebutuhan yang berbeda:
> >
> > ```mermaid
> > flowchart LR
> >     ROOT["Penyimpanan Data Android"]
> >     A["App-Specific Storage\n(File internal/eksternal privat)"]
> >     B["Shared Storage\n(Media, dokumen, publik)"]
> >     C["Preferences\n(Key-value pairs sederhana)"]
> >     D["Databases\n(Data terstruktur, SQLite/Room)"]
> >     ROOT --> A
> >     ROOT --> B
> >     ROOT --> C
> >     ROOT --> D
> > ```
> >
> > **App-specific storage** adalah penyimpanan file yang hanya bisa diakses oleh aplikasi itu sendiri. File disimpan di direktori internal (`/data/data/<package>/`) atau direktori eksternal privat. Data ini otomatis dihapus saat aplikasi di-uninstall. Tidak diperlukan izin khusus untuk mengaksesnya.
> >
> > **Shared storage** adalah area penyimpanan yang dapat diakses oleh aplikasi lain dan pengguna, seperti koleksi media (foto, video, audio) atau dokumen umum. Pada Android 10+, akses ke shared storage diatur ketat oleh sistem melalui mekanisme **Scoped Storage**.
> >
> > **Preferences** digunakan untuk menyimpan pasangan key-value yang sederhana, seperti pengaturan pengguna (tema, bahasa, status login). Di Android, ini diimplementasikan melalui `SharedPreferences` atau `DataStore` (API modern pengganti SharedPreferences).
> >
> > **Databases** digunakan untuk menyimpan data terstruktur dalam jumlah besar yang membutuhkan query dan relasi antar entitas, misalnya daftar kontak, catatan, atau item keranjang belanja. Android menyediakan SQLite sebagai mesin database bawaan.
> >
> > ### Konsep Dasar Database Relasional
> >
> > Sebuah **database** adalah kumpulan data yang diorganisasikan secara sistematis agar mudah diakses, dikelola, dan diperbarui. Dalam model relasional, data disimpan dalam **tabel** yang terdiri dari:
> >
> > - **Baris (row / record)**: Satu entri data, misalnya satu kontak atau satu transaksi
> > - **Kolom (column / field)**: Atribut dari entitas, misalnya `nama`, `email`, `tanggal_lahir`
> > - **Primary key**: Nilai unik yang mengidentifikasi setiap baris secara definitif
> >
> > Setiap tabel merepresentasikan satu jenis entitas. Relasi antar tabel dibentuk melalui **foreign key** yang merujuk primary key tabel lain.
> >
> > ### SQL untuk Operasi CRUD
> >
> > **SQL (Structured Query Language)** adalah bahasa standar untuk berinteraksi dengan database relasional. Empat operasi dasar (CRUD) dalam SQL:
> >
> > **CREATE** — Membuat tabel baru beserta definisi kolom dan tipenya:
> > ```sql
> > CREATE TABLE word_table (word TEXT PRIMARY KEY NOT NULL);
> > ```
> >
> > **SELECT** — Mengambil data dari tabel, dapat disaring dengan `WHERE` dan diurutkan dengan `ORDER BY`:
> > ```sql
> > SELECT * FROM word_table ORDER BY word ASC;
> > ```
> >
> > **UPDATE** — Memperbarui nilai kolom pada baris tertentu:
> > ```sql
> > UPDATE word_table SET word = 'baru' WHERE word = 'lama';
> > ```
> >
> > **DELETE** — Menghapus baris dari tabel:
> > ```sql
> > DELETE FROM word_table WHERE word = 'hapus';
> > ```
> >
> > ### SQLite di Android
> >
> > **SQLite** adalah database relasional yang bersifat embedded — tersimpan sebagai satu file tunggal di perangkat tanpa memerlukan proses server terpisah. Android menyertakan SQLite secara bawaan sehingga setiap aplikasi dapat langsung menggunakannya tanpa dependensi tambahan.
> >
> > Android menyediakan API untuk berinteraksi langsung dengan SQLite melalui kelas `SQLiteDatabase` dan helper `SQLiteOpenHelper`. Namun, pendekatan raw SQLite ini memiliki beberapa **keterbatasan signifikan**:
> >
> > - **Tidak ada verifikasi query pada compile-time**: Query SQL ditulis sebagai `String` biasa sehingga kesalahan sintaks atau nama kolom yang salah hanya akan terdeteksi saat runtime, bukan saat kompilasi
> > - **Banyak boilerplate**: Pengembang harus menulis kode berulang untuk mengkonversi hasil query (`Cursor`) menjadi objek Kotlin/Java secara manual
> > - **Rawan human error**: Pengelolaan koneksi, versi skema, dan migrasi harus ditangani secara manual
> >
> > Keterbatasan inilah yang mendorong Google mengembangkan **Room Persistence Library** sebagai abstraksi yang lebih aman dan produktif di atas SQLite.

> [!cornell] #### Summary
>
> Android menyediakan empat mekanisme penyimpanan data: **app-specific storage** (file privat aplikasi), **shared storage** (media publik), **preferences** (key-value untuk pengaturan), dan **databases** (data terstruktur dengan SQLite). Database relasional mengorganisasikan data dalam **tabel** berisi baris dan kolom, dimanipulasi melalui perintah SQL: **CREATE**, **SELECT**, **UPDATE**, dan **DELETE**. Meskipun **SQLite** tersedia secara bawaan di Android, penggunaan langsungnya bermasalah karena tidak ada verifikasi query saat compile-time dan membutuhkan banyak boilerplate untuk konversi `Cursor` ke objek, sehingga mendorong penggunaan **Room Persistence Library**.

> [!ad-libitum]- Additional Information
>
> #### SharedPreferences vs DataStore
>
> `SharedPreferences` adalah API lama untuk menyimpan preferensi key-value. Google kini merekomendasikan migrasi ke **Jetpack DataStore** yang menawarkan:
>
> - API berbasis Kotlin Flow (asynchronous, non-blocking)
> - Dukungan untuk tipe data lebih kompleks melalui **Proto DataStore** (menggunakan Protocol Buffers)
> - Penanganan error yang lebih konsisten
>
> ```kotlin
> // Proto DataStore — menyimpan preferensi secara async
> val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
>
> suspend fun saveTheme(isDark: Boolean) {
>     context.dataStore.edit { prefs ->
>         prefs[DARK_MODE_KEY] = isDark
>     }
> }
> ```
>
> #### Scoped Storage di Android 10+
>
> Sejak Android 10 (API 29), akses ke shared storage dibatasi oleh **Scoped Storage**. Aplikasi hanya dapat mengakses file yang dibuatnya sendiri tanpa izin tambahan. Untuk mengakses file media milik aplikasi lain, diperlukan izin `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, atau `READ_MEDIA_AUDIO`. Penggunaan **MediaStore API** sangat direkomendasikan untuk berinteraksi dengan koleksi media shared.
>
> #### Tipe Data SQLite
>
> SQLite menggunakan sistem tipologi yang unik — **type affinity** — di mana tipe kolom bersifat fleksibel. Lima affinity utama: `TEXT`, `NUMERIC`, `INTEGER`, `REAL`, dan `BLOB`. Berbeda dengan database lain, SQLite memperbolehkan penyimpanan nilai dari tipe apapun di kolom manapun, meskipun praktik terbaik tetap merekomendasikan konsistensi tipe.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi sederhana yang menggunakan `SharedPreferences` untuk menyimpan preferensi tema (dark/light), lalu migrasikan ke `DataStore`
> 2. Eksperimen langsung dengan `SQLiteDatabase` untuk membuat tabel dan melakukan operasi CRUD, lalu bandingkan kode yang dihasilkan dengan Room
> 3. Investigasi bagaimana SQLite mengelola file database di direktori internal — gunakan Device File Explorer di Android Studio
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Data and file storage overview"
> - Android Developer Guide: "Save key-value data" (DataStore)
> - SQLite Documentation: "Datatypes In SQLite"
> - Blog Android Developers: "Scoped Storage in Android Q"
