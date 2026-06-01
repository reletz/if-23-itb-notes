---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi Mobile]]

> [!cornell] Navigation Systems in Android and iOS
>
> > ## Questions/Cues
> >
> > - Perbedaan pola navigasi Android vs iOS
> > - Fungsi Navigation Drawer di Android
> > - Keunggulan Bottom Bar di iOS
> > - Perilaku tombol kembali di kedua platform
> > - Peran gesture geser di navigasi iOS
> >
> > ## Reference Points
> >
> > - UI/UX Principles in Mobile Apps Development (Slides 8, 11)
>
> > ### Pola Navigasi Android
> >
> > Sistem navigasi Android menggunakan tiga komponen utama: **Navigation Drawer**, **Top Tabs**, dan **Tombol Kembali**. Navigation Drawer adalah panel sisi yang tersembunyi (biasanya muncul saat pengguna menggeser dari tepi kiri layar) yang berisi menu untuk mengakses berbagai bagian aplikasi. Contohnya di aplikasi Gmail, pengguna dapat membuka drawer untuk beralih ke folder Spam, Draft, atau Settings tanpa kembali ke layar utama.
> >
> > Top Tabs ditempatkan di bagian atas layar dan ideal untuk aplikasi dengan beberapa kategori konten yang setara. Misalnya, aplikasi berita menggunakan tab "Terbaru", "Populer", dan "Rekomendasi". Tombol Kembali di Android bisa berupa tombol fisik (pada perangkat lama) atau virtual di layar, dengan perilaku konsisten untuk kembali ke layar sebelumnya dalam hierarki aplikasi atau antar-aplikasi.
> >
> > ### Pola Navigasi iOS
> >
> > iOS mengutamakan **Bottom Navigation Bar**, **Navigasi Hierarkis**, dan **Swipe Gestures**. Bottom Navigation Bar (biasanya berisi 3-5 ikon) memberikan akses cepat ke bagian utama aplikasi. Desain ini memudahkan operasi satu tangan karena letaknya di bagian bawah layar yang mudah dijangkau ibu jari. Contohnya di aplikasi Instagram, tab Beranda, Eksplorasi, dan Profil selalu dapat diakses.
> >
> > Navigasi hierarkis di iOS menggunakan tombol kembali di pojok kiri atas yang spesifik untuk setiap aplikasi, bukan sistem global seperti Android. Swipe Gestures memungkinkan navigasi dengan menggeser jari ke kiri/kanan, seperti dalam aplikasi Mail untuk membuka/menutup email atau di Safari untuk berpindah tab. Gesture ini memberikan pengalaman yang lebih alami dan intuitif.
> >
> > ### Perbandingan Pendekatan Navigasi
> >
> > Perbedaan mendasar terletak pada posisi elemen navigasi dan filosofi interaksi. Android menempatkan menu navigasi utama di sisi atas/samping (Navigation Drawer/Top Tabs), sementara iOS memprioritaskan akses bawah layar (Bottom Bar). Tombol kembali di Android bersifat universal, sedangkan di iOS bersifat kontekstual dalam aplikasi.
> >
> > Analogi yang tepat: Android seperti gedung dengan banyak tangga darurat (akses cepat dari berbagai titik), sementara iOS seperti gedung dengan lift utama di lobi (titik akses terpusat). Keduanya efektif tapi membutuhkan pola pikir berbeda dalam penggunaannya.
> >
> > ### Implikasi terhadap Pengalaman Pengguna
> >
> > Desain navigasi Android menawarkan fleksibilitas lebih untuk aplikasi kompleks dengan banyak fitur (misal: aplikasi produktivitas), sedangkan iOS memberikan konsistensi tinggi dan kemudahan akses satu tangan untuk aplikasi sehari-hari (misal: media sosial). Pemahaman perbedaan ini penting untuk merancang alur pengguna yang alami sesuai platform target.

> [!cornell] #### Summary
>
> **Sistem navigasi Android** menggunakan Navigation Drawer dan Top Tabs untuk akses multi-level dengan tombol kembali universal, ideal untuk aplikasi kompleks. **iOS mengandalkan Bottom Navigation Bar** dan swipe gestures untuk navigasi satu-tangan dengan tombol kembali kontekstual, optimal untuk kesederhanaan. Perbedaan filosofi ini menciptakan pola interaksi berbeda: **Android menekankan efisiensi akses**, sementara **iOS fokus pada konsistensi dan kealamian**. Pengembang harus menerapkan pola sesuai platform agar pengguna merasa familiar dengan konvensi navigasi yang berlaku.

> [!ad-libitum]- Additional Information
>
> #### Implementasi Teknis Navigation Drawer
>
> Navigation Drawer di Android diimplementasikan menggunakan `DrawerLayout` dan `NavigationView` dari Android Jetpack. Komponen ini memungkinkan pembuatan menu sisi dengan header kustom dan item menu dinamis. Penting untuk mengatur `lockMode` agar tidak bertabrakan dengan gesture sistem (seperti back gesture di Android 10+). Untuk performa optimal, gunakan `Fragment` untuk setiap tujuan navigasi daripada `Activity` baru.
>
> #### Best Practices Bottom Navigation iOS
>
> Menurut Human Interface Guidelines, Bottom Navigation Bar harus memiliki 3-5 item dengan ikon dan label jelas. Hindari menggunakan lebih dari 5 item karena akan memampatkan ruang. Gunakan `UITabBarController` sebagai controller utama dan `UINavigationController` untuk tiap tab. Animasi transisi harus halus dengan durasi 0.3 detik menggunakan `UIView.animate(withDuration:)`.
>
> #### Studi Kasus: Swipe Gestures Kompleks
>
> Aplikasi Pinterest menggunakan advanced swipe gestures: geser ke atas untuk menyimpan pin, geser bawah untuk menutup detail. Implementasi menggunakan `UIPanGestureRecognizer` dengan threshold 150px. Di Android, gesture serupa bisa diimplementasikan dengan `GestureDetector` dan `OnGestureListener`, namun perlu mempertimbangkan konsistensi dengan platform.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun aplikasi dengan 3 layar menggunakan Bottom Navigation di iOS dan Navigation Drawer di Android. Bandingkan pengalaman pengguna melalui survei sederhana.
> 2. Implementasikan sistem back custom di Android yang menggabungkan gesture sistem dan tombol fisik dengan meng-override `onBackPressedDispatcher`.
>
> #### Alat dan Framework
>
> - Android: Navigation Component, `DrawerLayout`, MotionLayout untuk animasi
> - iOS: `UINavigationController`, `UITabBarController`, `UISwipeGestureRecognizer`
> - Tools: Framer untuk prototipe gesture, Firebase Analytics untuk melacak pola navigasi
>
> #### Bacaan Lanjutan
>
> - "Android Navigation Patterns" oleh Google Codelabs
> - "iOS Human Interface Guidelines: Navigation" (dokumen resmi Apple)
> - Buku "Mobile Navigation Design Patterns" oleh Michael Dick