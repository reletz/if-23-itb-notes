---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Android Development with Kotlin]]

> [!cornell] Intents and Activity Navigation
>
> > ## Questions/Cues
> >
> > - Apa perbedaan intent eksplisit dan implisit?
> > - Bagaimana cara membuat intent untuk Activity lain?
> > - Kapan menggunakan ACTION_VIEW vs ACTION_SEND?
> > - Mengapa perlu memeriksa resolveActivity()?
> > - Bagaimana cara mengirim data ekstra dengan intent?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 3-9, 50)
>
> > ### Pengertian Intent dan Fungsinya
> >
> > Intent adalah mekanisme di Android untuk meminta aksi dari komponen aplikasi lain, biasanya digunakan untuk navigasi antar Activity. Setiap intent mengandung dua informasi utama: aksi yang ingin dilakukan (seperti melihat, mengedit, atau mengirim) dan data yang menjadi target operasi tersebut.
> >
> > Contoh analogi: Bayangkan intent seperti surat permintaan yang berisi jenis pekerjaan (aksi) dan dokumen yang perlu diproses (data). Sistem Android akan meneruskan "surat" ini ke komponen yang mampu menanganinya.
> >
> > Intent menjadi tulang punggung navigasi di Android karena memungkinkan:
> >
> > - Komunikasi antar Activity dalam satu aplikasi
> > - Integrasi dengan aplikasi pihak ketiga (misalnya membuka peta atau galeri foto)
> > - Eksekusi tindakan sistem (seperti berbagi konten atau pencarian web)
> >
> > ### Explicit Intent untuk Navigasi Internal
> >
> > Explicit intent digunakan ketika kita mengetahui secara pasti komponen tujuan. Format dasar pembuatan explicit intent:
> >
> > ```kotlin
> >
> > val intent = Intent(context, TargetActivity::class.java)
> >
> > startActivity(intent)
> >
> > ```
> >
> > Untuk mengirim data ke Activity tujuan, gunakan metode `putExtra()`:
> >
> > ```kotlin
> >
> > fun bukaDetailCatatan() {
> >
> > val intent = Intent(this, DetailActivity::class.java)
> >
> > intent.putExtra("ID_CATATAN", idCatatan) // Mengirim data ID
> >
> > startActivity(intent)
> >
> > }
> >
> > ```
> >
> > Contoh kasus nyata: Aplikasi e-commerce menggunakan explicit intent untuk membuka halaman detail produk dari daftar produk, dengan mengirim ID produk sebagai data ekstra.
> >
> > ### Implicit Intent untuk Aksi Umum
> >
> > Implicit intent digunakan saat kita ingin sistem menemukan komponen yang sesuai secara otomatis berdasarkan jenis aksi. Contoh khas:
> >
> > ```kotlin
> >
> > fun kirimEmail() {
> >
> > val intent = Intent(Intent.ACTION_SEND).apply {
> >
> > type = "text/plain"
> >
> > putExtra(Intent.EXTRA_EMAIL, arrayOf("contoh@email.com"))
> >
> > putExtra(Intent.EXTRA_TEXT, "Isi pesan...")
> >
> > }
> >
> > if (intent.resolveActivity(packageManager) != null) {
> >
> > startActivity(intent)
> >
> > }
> >
> > }
> >
> > ```
> >
> > Pentingnya pemeriksaan `resolveActivity()`: Metode ini memverifikasi apakah ada aplikasi yang bisa menangani intent sebelum dijalankan, mencegah crash jika tidak ada handler yang tersedia. Jika hasilnya `null`, sebaiknya tampilkan pesan error atau alternatif lain.
> >
> > ### Mekanisme StartActivity dan Data Return
> >
> > Proses navigasi Activity menggunakan `startActivity()` melibatkan:
> >
> > 1. Sistem Android mencari Activity yang cocok dengan intent
> > 2. Membuat instance Activity baru dan menampilkannya
> > 3. Menyimpan Activity sebelumnya di back stack
> >
> > Untuk menerima hasil dari Activity tujuan, gunakan `startActivityForResult()`:
> >
> > ```kotlin
> >
> > // Memulai Activity dengan request code
> >
> > startActivityForResult(intent, REQUEST_CODE)
> >
> > // Menangani hasil di Activity asal
> >
> > override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
> >
> > if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
> >
> > val hasil = data?.getStringExtra("HASIL")
> >
> > // Proses hasil
> >
> > }
> >
> > }
> >
> > ```
> >
> > Contoh penggunaan: Memilih kontak dari daftar kontak sistem dan menerima informasi kontak yang dipilih.

> [!cornell] #### Summary
>
> **Intent** berfungsi sebagai mekanisme navigasi utama di Android dengan dua jenis utama: **eksplisit** untuk target spesifik dalam aplikasi, dan **implisit** untuk aksi umum yang bisa ditangani aplikasi lain. Pengiriman data antar Activity menggunakan `putExtra()` dengan key-value pairs, sementara pemeriksaan `resolveActivity()` penting untuk mencegah crash. **Explicit intent** menggunakan konstruktor dengan class tujuan eksplisit, sedangkan **implicit intent** mendefinisikan aksi dan tipe data untuk dicocokkan sistem. Pemahaman kedua jenis intent ini penting untuk membangun alur navigasi yang efektif.

> [!ad-libitum]- Additional Information
>
> #### Intent Filters untuk Aplikasi Pihak Ketiga
>
> Agar aplikasi bisa menangani implicit intent dari aplikasi lain, perlu mendeklarasikan intent filter di AndroidManifest.xml:
>
> ```xml
>
> <activity android:name=".ShareActivity">
>
> <intent-filter>
>
> <action android:name="android.intent.action.SEND" />
>
> <category android:name="android.intent.category.DEFAULT" />
>
> <data android:mimeType="text/plain" />
>
> </intent-filter>
>
> </activity>
>
> ```
>
> Sistem akan mencocokkan komponen berdasarkan action, category, dan data yang dideklarasikan. Jika beberapa aplikasi cocok, sistem akan menampilkan dialog pemilihan aplikasi.
>
> #### Keamanan dan Batasan Intent
>
> - **Exported Activity**: Activity yang mengekspor intent filter harus mempertimbangkan keamanan karena bisa diakses aplikasi lain
> - **Permission**: Bisa membatasi akses dengan permission custom
> - **Data Validation**: Selalu validasi data yang diterima dari intent eksternal
> - **PendingIntent**: Untuk operasi yang dijalankan nanti dengan hak akses aplikasi pengirim
>
> #### Penanganan Error dan Edge Cases
>
> 1. ActivityNotFoundException: Terjadi saat tidak ada Activity yang cocok untuk explicit intent
> 2. SecurityException: Saat mencoba mengakses Activity tanpa permission
> 3. Data overflow: Hindari mengirim data terlalu besar via intent (lebih dari 1MB)
> 4. Background limits: Pada Android 8+ (API 26+), startService dari background dibatasi
>
> #### Best Practices
>
> 1. Gunakan explicit intent untuk komunikasi internal aplikasi
> 2. Selalu tangkap SecurityException saat memanggil intent eksternal
> 3. Batasi data di intent (gunakan ViewModel untuk data besar)
> 4. Gunakan FLAG_ACTIVITY_NEW_TASK untuk memulai Activity dari non-UI context
> 5. Implementasikan deep linking dengan skema URI khusus
>
> #### Eksperimen Mandiri
>
> 1. Buat aplikasi dengan dua Activity yang saling mengirim data dengan berbagai tipe (String, Parcelable, Serializable)
> 2. Implementasikan implicit intent untuk membuka URL, peta, dan berbagi teks
> 3. Uji error handling dengan mematikan fitur yang diperlukan (misal: nonaktifkan semua browser untuk ACTION_VIEW)
> 4. Bandingkan performa pengiriman data besar via intent vs ViewModel
>
> #### Tools dan Referensi
>
> 1. Android Studio Intent Tool: `adb shell am start` untuk testing intent
> 2. Deep Link Tester (Android Studio)
> 3. PendingIntentCompat dari AndroidX
> 4. Dokumentasi Resmi: [Intent dan Intent Filter](https://developer.android.com/guide/components/intents-filters)
>
> #### Bacaan Lanjutan
>
> - "Android Programming: The Big Nerd Ranch Guide" Chapter 24
> - "Efficient Android Threading" Chapter 7 (Komunikasi antar komponen)
> - Repositori GitHub: android/architecture-samples (Pola navigasi lanjutan)