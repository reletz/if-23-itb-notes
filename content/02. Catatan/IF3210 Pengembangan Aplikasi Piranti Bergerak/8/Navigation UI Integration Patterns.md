---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Navigation UI Integration Patterns
>
> > ## Questions/Cues
> >
> > - Mengapa menggunakan NavigationUI untuk integrasi menu?
> > - Bagaimana menghubungkan DrawerLayout dengan NavController?
> > - Peran AppBarConfiguration dalam navigasi
> > - Manajemen back stack dengan Navigation Component
> > - Keuntungan pola integrasi UI terpusat
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 44-46)
> > - Android Development with Kotlin (Slide 50)
>
> > ### Konsep Dasar NavigationUI
> >
> > NavigationUI adalah komponen dari Android Jetpack yang menghubungkan komponen UI navigasi seperti app bar, navigation drawer, dan bottom navigation dengan NavController. Pola ini memungkinkan sinkronisasi otomatis antara elemen UI dan tujuan navigasi dalam grafik navigasi aplikasi.
> >
> > Contoh implementasi dasar melibatkan penyetelan (setup) NavController dengan komponen seperti Toolbar atau NavigationView. Saat pengguna berinteraksi dengan elemen UI ini, NavigationUI secara otomatis menangani transisi antar tujuan sesuai dengan grafik navigasi yang didefinisikan. Pola ini mengurangi boilerplate code dan memastikan konsistensi perilaku navigasi.
> >
> > Analogi: Bayangkan NavigationUI sebagai penerjemah antara peta navigasi (NavGraph) dan alat kontrol fisik (UI) di mobil. Seperti cara kemudi dan pedal terhubung ke sistem navigasi kendaraan, NavigationUI menghubungkan komponen UI ke logika navigasi aplikasi.
> >
> > ### Integrasi DrawerLayout dengan Navigation Component
> >
> > DrawerLayout (panel navigasi samping) dapat diintegrasikan dengan Navigation Component melalui beberapa langkah kunci. Pertama, tambahkan DrawerLayout sebagai container utama di XML layout yang berisi NavHostFragment dan NavigationView. Kemudian hubungkan NavigationView dengan NavController menggunakan metode setupWithNavController().
> >
> > Contoh implementasi:
> >
> > ```kotlin
> >
> > val navView = findViewById<NavigationView>(R.id.nav_view)
> >
> > val navController = findNavController(R.id.nav_host_fragment)
> >
> > navView.setupWithNavController(navController)
> >
> > ```
> >
> > Langkah ini akan secara otomatis menyinkronkan item menu di navigation drawer dengan tujuan dalam grafik navigasi. Saat pengguna memilih item menu, NavigationUI akan menavigasi ke tujuan yang sesuai dan memperbarui status UI drawer. Mekanisme ini juga menangani pembaruan otomatis item yang terpilih saat navigasi terjadi melalui metode lain.
> >
> > ### Konfigurasi AppBar dengan NavigationUI
> >
> > AppBarConfiguration digunakan untuk mengkustomisasi perilaku navigasi pada app bar (action bar). Kelas ini memungkinkan pengembang menentukan tujuan utama (start destination) dan pola navigasi tingkat atas (top-level destinations) yang seharusnya tidak menampilkan tombol Up.
> >
> > Contoh implementasi:
> >
> > ```kotlin
> >
> > val appBarConfiguration = AppBarConfiguration(navController.graph, drawerLayout)
> >
> > setupActionBarWithNavController(navController, appBarConfiguration)
> >
> > ```
> >
> > Konfigurasi ini memastikan bahwa tombol navigasi (hamburger icon atau panah kembali) muncul secara konsisten sesuai dengan posisi pengguna dalam grafik navigasi. NavigationUI secara otomatis menangani perubahan ikon navigasi dan perilaku toggle drawer berdasarkan konteks navigasi saat ini.
> >
> > ### Manajemen Back Stack Terintegrasi
> >
> > NavigationUI menyediakan manajemen back stack otomatis yang terintegrasi dengan komponen UI. Saat navigasi terjadi melalui NavigationView atau menu, sistem secara otomatis mengelola riwayat navigasi dan memastikan perilaku tombol kembali yang konsisten.
> >
> > Contoh: Ketika pengguna memilih item dari navigation drawer, tujuan sebelumnya dalam back stack akan diganti dengan tujuan baru jika item tersebut merupakan bagian dari navigasi tingkat atas (top-level). Ini mencegah penumpukan aktivitas yang tidak perlu dalam back stack dan memastikan pengalaman pengguna yang intuitif.

> [!cornell] #### Summary
>
> **NavigationUI** menyediakan pola terintegrasi untuk menghubungkan komponen UI navigasi dengan **NavController**, memastikan sinkronisasi otomatis dan mengurangi boilerplate code. **DrawerLayout** dihubungkan melalui metode `setupWithNavController()` yang mengatur navigasi berdasarkan grafik yang didefinisikan. **AppBarConfiguration** mengelola tampilan tombol navigasi dan status app bar sesuai konteks tujuan saat ini. Sistem ini secara otomatis menangani **manajemen back stack** untuk memastikan konsistensi perilaku navigasi dan pengalaman pengguna yang intuitif.

> [!ad-libitum]- Additional Information
>
> #### Custom Behavior NavigationUI
>
> Untuk kasus penggunaan lanjut, NavigationUI memungkinkan kustomisasi melalui antarmuka OnDestinationChangedListener. Ini memungkinkan:
>
> ```kotlin
>
> navController.addOnDestinationChangedListener { _, destination, _ ->
>
> when (destination.id) {
>
> R.id.detail_fragment -> customAppBarBehavior()
>
> R.id.settings_fragment -> hideBottomNavigation()
>
> }
>
> }
>
> ```
>
> Menggunakan NavigationUI dengan BottomNavigationView memerlukan pendekatan berbeda karena keterbatasan dalam manajemen back stack. Solusi umum melibatkan penggunaan ID menu yang sama dengan ID fragment dalam grafik navigasi.
>
> #### Deep Linking dengan UI Navigasi
>
> NavigationUI mendukung deep linking otomatis ke dalam komponen UI. Dengan menambahkan properti `android:autoVerify="true"` dalam intent filter, aplikasi dapat menangani link eksternal yang secara otomatis membuka drawer navigasi ke tujuan tertentu. Implementasi ini memerlukan konfigurasi tag <deepLink> dalam file navigasi XML.
>
> #### Manajemen State Kompleks
>
> Untuk aplikasi dengan alur navigasi kompleks, NavigationUI menyediakan mekanisme penyimpanan state melalui SavedStateRegistry. Pendekatan ini memungkinkan pemulihan state UI navigasi setelah perubahan konfigurasi atau penghentian proses aplikasi. State disimpan dalam Bundle khusus yang terkait dengan NavController.
>
> #### Self-Exploration Projects
>
> 1. Implementasikan custom navigation behavior dengan mengganti logika navigasi default menggunakan NavigationUI.setupWithNavController() dengan implementasi kustom
> 2. Bangun sistem tracking untuk memonitor pola navigasi pengguna dengan mengintegrasikan Firebase Analytics ke dalam OnDestinationChangedListener
> 3. Eksperimen dengan animasi transisi kustom antara destination yang dipicu melalui NavigationUI
>
> #### Tools dan Resources
>
> - Navigation Editor di Android Studio: Alat visual untuk mengelola grafik navigasi
> - Material Design Components: Library untuk implementasi Navigation Drawer dan Bottom Navigation
> - LeakCanary: Deteksi memory leak dalam implementasi Navigation Component
>
> #### Further Reading
>
> - "Advanced Android App Architecture" oleh raywenderlich.com
> - Dokumentasi Resmi Android: Integrasi UI dengan Navigation Component
> - Repositori GitHub: Android Architecture Components Samples
> - Artikel Medium: "Advanced NavigationUI Patterns for Complex Apps"