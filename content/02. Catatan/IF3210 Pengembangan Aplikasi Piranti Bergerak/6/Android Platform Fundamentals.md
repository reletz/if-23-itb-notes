---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi Android]]

> [!cornell] Android Platform Fundamentals
>
> > ## Questions/Cues
> >
> > - Mengapa Android disebut platform open-source?
> > - Apa perbedaan minSdkVersion dan targetSdkVersion?
> > - Bagaimana struktur direktori proyek Android?
> > - Mengapa penggunaan Kotlin dianjurkan untuk Android?
> > - Apa fungsi utama Android SDK?
> > - Bagaimana cara Android menangani berbagai ukuran layar?
> > - Apa keuntungan sistem build otomatis seperti Gradle?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 7-17, 19-24, 46-48, 50-63, 66-68)
>
> > ### Pengenalan Platform Android
> >
> > Android merupakan sistem operasi mobile berbasis kernel Linux yang bersifat open-source. Sifat open-source berarti kode sumber Android tersedia untuk publik dan dapat dimodifikasi oleh pengembang maupun produsen perangkat. Karakteristik ini memungkinkan kustomisasi tinggi pada berbagai perangkat seperti smartphone, smart TV, dan smartwatch. Contoh implementasinya adalah sistem operasi MIUI oleh Xiaomi dan OneUI oleh Samsung yang dikembangkan berdasarkan Android murni.
> >
> > Android mendominasi pasar perangkat mobile dengan lebih dari 80% pangsa pasar smartphone global. Per Maret 2023, terdapat lebih dari 3 miliar perangkat Android aktif bulanan dan 2.5 miliar pengguna Google Play. Keberhasilan ini didukung oleh model pengembangan kolaboratif melalui Open Handset Alliance yang terdiri dari 84 perusahaan teknologi.
> >
> > ### Android Software Development Kit (SDK)
> >
> > SDK Android adalah paket alat pengembangan yang menyediakan pustaka, emulator, dokumentasi, dan tools debugging. Komponen utamanya meliputi Android Debug Bridge (ADB) untuk komunikasi dengan perangkat, Android Emulator untuk pengujian virtual, dan Android Virtual Device (AVD) Manager untuk mengkonfigurasi perangkat virtual. SDK juga menyertakan Android Support Library yang memungkinkan kompatibilitas dengan versi Android lebih lama melalui forward compatibility.
> >
> > Contoh penggunaan SDK adalah ketika pengembang ingin mengimplementasikan fitur peta dalam aplikasi. Mereka dapat menggunakan Google Maps API yang sudah terintegrasi dalam SDK tanpa perlu membuat sistem peta dari awal. Dokumentasi komprehensif tersedia di developer.android.com dengan sampel kode untuk berbagai kasus penggunaan.
> >
> > ### Android Studio sebagai IDE Utama
> >
> > Android Studio merupakan Integrated Development Environment (IDE) resmi yang menyediakan lingkungan pengembangan terpadu. Fitur unggulannya meliputi Layout Editor untuk desain UI visual, APK Analyzer untuk mengoptimasi ukuran aplikasi, dan Profiler untuk memantau performa CPU, memori, dan jaringan. IDE ini menggunakan IntelliJ IDEA sebagai basis dan mendukung bahasa Kotlin secara native.
> >
> > Keuntungan utama Android Studio adalah sistem Instant Run yang mempercepat iterasi pengembangan dengan menerapkan perubahan kode tanpa perlu membuat ulang APK secara penuh. Fitur ini secara signifikan mengurangi waktu debugging dengan memperbarui aplikasi yang sedang berjalan dalam hitungan detik.
> >
> > ### Manajemen Versi Android
> >
> > Fragmentasi versi adalah tantangan utama pengembangan Android. Setiap versi Android memiliki nama kode (seperti Oreo, Pie), nomor versi (8.0, 9.0), dan API level (26, 28). Pengembang harus menentukan minSdkVersion sebagai versi minimum yang didukung, targetSdkVersion sebagai versi optimal yang diuji, dan compileSdkVersion sebagai versi yang digunakan untuk kompilasi.
> >
> > Strategi kompatibilitas yang umum adalah menggunakan Support Library dan menjalankan pemeriksaan versi pada runtime. Contoh implementasi:
> >
> > ```kotlin
> >
> > if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
> >
> > // Jalankan kode khusus untuk Oreo ke atas
> >
> > } else {
> >
> > // Fallback untuk versi lebih lama
> >
> > }
> >
> > ```
> >
> > ### Tantangan Pengembangan Android
> >
> > Pengembang menghadapi beberapa tantangan utama termasuk fragmentasi perangkat (berbagai ukuran layar, kepadatan piksel, dan konfigurasi hardware), optimasi performa, dan keamanan data. Untuk menangani berbagai resolusi layar, Android menyediakan sistem resource qualifier yang memungkinkan penyediaan aset berbeda berdasarkan ukuran layar, orientasi, dan kepadatan piksel.
> >
> > Contoh praktik terbaik adalah menggunakan vector drawable daripada gambar bitmap karena dapat diskalakan tanpa kehilangan kualitas. Untuk keamanan, Android menyediakan Enclave melalui Trusty TEE (Trusted Execution Environment) yang mengisolasi proses kritis seperti autentikasi biometrik.
> >
> > ### Manajemen Resource dan Kode
> >
> > Proyek Android mengikuti struktur direktori spesifik dengan pemisahan jelas antara kode (java/), resource (res/), dan file konfigurasi. Folder res/ berisi subdirektori seperti:
> >
> > - drawable/ untuk gambar dan vector asset
> > - layout/ untuk file tata letak UI
> > - values/ untuk string, warna, dan konstanta
> >
> > Sistem Resource ID Android secara otomatis menghasilkan referensi melalui kelas R yang memungkinkan akses resource melalui sintaks seperti R.string.app_name. Mekanisme ini memfasilitasi lokalisasi dengan menyediakan resource alternatif berdasarkan konfigurasi lokal perangkat.
> >
> > ### Kotlin sebagai Bahasa Utama
> >
> > Kotlin dipilih sebagai bahasa preferensial untuk Android karena sifatnya yang ringkas, aman dari null pointer exception, dan interoperabilitas penuh dengan Java. Fitur utama Kotlin seperti extension functions memungkinkan penambahan fungsi ke kelas existing tanpa inheritance, dan lambda expressions menyederhanakan penanganan callback.
> >
> > Contoh keunggulan Kotlin adalah pengurangan boilerplate code sebanyak 40% dibanding Java. Fitur null safety-nya mencegah NullPointerException melalui sistem tipe yang membedakan nullable dan non-nullable references:
> >
> > ```kotlin
> >
> > var neverNull: String = "Ini tidak boleh null" // Compile error jika diassign null
> >
> > var bisaNull: String? = "Ini bisa diassign null" // Aman
> >
> > ```

> [!cornell] #### Summary
>
> **Android** merupakan platform mobile **open-source** berbasis kernel Linux yang mendominasi pasar dengan lebih dari 3 miliar perangkat aktif. Pengembangan aplikasi Android mengandalkan **Android SDK** yang menyediakan alat pengembangan lengkap, dengan **Android Studio** sebagai IDE resmi yang mendukung fitur canggih seperti Instant Run. Tantangan utama termasuk **fragmentasi versi OS** dan **keragaman perangkat**, yang diatasi melalui sistem resource qualifier dan compatibility libraries. **Kotlin** menjadi bahasa preferensial karena keamanan null pointer-nya dan sintaksis yang ringkas, meningkatkan produktivitas pengembangan secara signifikan.

> [!ad-libitum]- Additional Information
>
> #### Analisis Fragmentasi Versi Android
>
> Fragmentasi versi Android menciptakan kompleksitas dalam pengujian aplikasi. Data terbaru menunjukkan distribusi versi: Android 13 (12%), Android 12 (18%), Android 11 (20%), dan versi lebih lama (50%). Strategi pengembangan efektif melibatkan penargetan API level 21 (Lollipop 5.0) sebagai minimum untuk mencakup 98% perangkat aktif, sambil tetap memanfaatkan fitur terbaru melalui feature detection pada runtime.
>
> #### Best Practices Manajemen Resource
>
> Implementasi resource yang optimal meliputi:
>
> - Penggunaan vector drawable untuk aset ikon
> - Penyediaan alternatif gambar untuk kepadatan layar mdpi (1x), hdpi (1.5x), xhdpi (2x), xxhdpi (3x)
> - Pemisahan string lokalizable dalam values/strings.xml dengan dukungan bahasa melalui values-id/, values-en/, dll.
> - Penggunaan resource merging dalam library modul untuk menghindari duplikasi
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis APK: Ekstrak file APK menggunakan APK Analyzer dan pelajari struktur DEX, resource, dan native libraries
> 2. Perbandingan Build System: Implementasikan tugas build sederhana dengan Groovy vs. KTS scripting
> 3. Kompatibilitas Multi-API: Buat aplikasi dengan fitur terkondisi yang berbeda di API level 21, 24, dan 30
>
> #### Bacaan Lanjutan
>
> - "Kotlin in Action" oleh Dmitry Jemerov & Svetlana Isakova
> - "Android Internals" oleh Jonathan Levin
> - Dokumentasi Android Developers: https://developer.android.com/guide
> - Codelabs Android: https://developer.android.com/courses
> - Repositori Contoh Google: https://github.com/android