---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] UI Navigation Components Implementation
>
> > ## Questions/Cues
> >
> > - Bagaimana mengimplementasikan menu options di Activity?
> > - Apa peran DrawerLayout dalam navigasi UI?
> > - Bagaimana menghubungkan NavigationView dengan NavController?
> > - Mengapa perlu menangani back stack navigasi?
> > - Bagaimana struktur XML untuk menu navigation drawer?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 10-17, 44-48)
> > - Android Development with Kotlin (Slides 45-46)
>
> > ### Implementasi App Bar dan Menu Options
> >
> > App Bar (juga disebut Action Bar) merupakan komponen UI di bagian atas layar yang menampilkan judul aplikasi dan menu aksi. Untuk menambahkan menu, developer perlu membuat file XML di direktori `res/menu` yang mendefinisikan struktur menu. Setiap item menu memiliki properti seperti ID, ikon, dan judul yang dapat dikustomisasi.
> >
> > Contoh struktur XML menu sederhana:
> >
> > ```xml
> >
> > <menu xmlns:android="http://schemas.android.com/apk/res/android">
> >
> > <item
> >
> > android:id="@+id/action_settings"
> >
> > android:title="Pengaturan"
> >
> > android:orderInCategory="100"
> >
> > app:showAsAction="never"/>
> >
> > </menu>
> >
> > ```
> >
> > Untuk menampilkan menu di Activity, gunakan metode `onCreateOptionsMenu` dengan memanggil `menuInflater.inflate()`. Penanganan seleksi item menu dilakukan melalui `onOptionsItemSelected` dengan mencocokkan `item.itemId`. Analoginya mirip dengan membuat daftar tombol interaktif di toolbar aplikasi.
> >
> > ### Navigation Drawer dengan DrawerLayout
> >
> > Navigation Drawer merupakan panel geser yang menampilkan opsi navigasi utama aplikasi. Komponen ini diimplementasikan menggunakan `DrawerLayout` sebagai kontainer utama yang berisi dua child: konten utama (biasanya `NavHostFragment`) dan `NavigationView` untuk menu drawer.
> >
> > Struktur XML dasar:
> >
> > ```xml
> >
> > <androidx.drawerlayout.widget.DrawerLayout>
> >
> > <fragment
> >
> > android:id="@+id/nav_host_fragment"
> >
> > ... />
> >
> > <com.google.android.material.navigation.NavigationView
> >
> > android:id="@+id/nav_view"
> >
> > app:menu="@menu/drawer_menu" />
> >
> > </androidx.drawerlayout.widget.DrawerLayout>
> >
> > ```
> >
> > Untuk menghubungkan drawer dengan mekanisme navigasi, gunakan `setupWithNavController()` yang mengaitkan `NavigationView` dengan `NavController`. Ini memungkinkan seleksi item menu secara otomatis men-trigger navigasi ke destination yang sesuai dalam grafik navigasi.
> >
> > ### Manajemen Back Stack
> >
> > Back stack merupakan mekanisme penyimpanan riwayat navigasi dimana setiap destination baru ditumpuk di atas destination sebelumnya. Pada implementasi berbasis Fragment, sistem otomatis mengelola back stack saat melakukan transisi antar destination.
> >
> > Contoh visual back stack:
> >
> > ```
> >
> > Aktivitas 1
> >
> > Fragment A → Fragment B → Fragment C
> >
> > ```
> >
> > Ketika pengguna menekan tombol back, Fragment C akan di-pop dari stack dan tampilan kembali ke Fragment B. Developer dapat mengkustomisasi perilaku ini melalui `popUpTo` dan `popUpToInclusive` dalam definisi action di navigation graph.

> [!cornell] #### Summary
>
> **Implementasi komponen navigasi UI** melibatkan integrasi App Bar, Navigation Drawer, dan sistem menu dengan mekanisme navigasi inti. **DrawerLayout** berfungsi sebagai kontainer utama untuk navigation drawer yang berisi NavigationView dan NavHostFragment. **Menu options** diimplementasikan melalui file XML dan dihubungkan dengan logika navigasi melalui `onOptionsItemSelected`. **Manajemen back stack** yang efektif penting untuk memastikan pengalaman navigasi yang intuitif, dimana setiap destination baru ditambahkan ke tumpukan navigasi.

> [!ad-libitum]- Additional Information
>
> #### Optimisasi Performa Navigation Drawer
>
> Untuk aplikasi dengan menu kompleks, pertimbangkan untuk menggunakan `staggeredGridLayoutManager` atau mengimplementasikan view recycling dengan adapter kustom. Hindari inflate terlalu banyak item menu sekaligus - gunakan lazy loading untuk submenu yang jarang diakses.
>
> #### Custom Animasi Transisi
>
> Implementasi custom animasi untuk transisi menu dapat dilakukan dengan membuat file animasi XML di direktori `res/animator`:
>
> ```xml
>
> <objectAnimator
>
> xmlns:android="http://schemas.android.com/apk/res/android"
>
> android:propertyName="translationX"
>
> android:valueFrom="-100%"
>
> android:valueTo="0%"
>
> android:duration="300"/>
>
> ```
>
> Animasi kemudian di-link ke action navigasi melalui atribut `app:enterAnim` dan `app:exitAnim` dalam navigation graph.
>
> #### Studi Kasus: Aplikasi E-Commerce
>
> Pada aplikasi belanja dengan 50+ destination, implementasikan dynamic menu loading berdasarkan role user. Gunakan `NavigationSubMenu` untuk kategori produk dan cache fragment yang sering diakses. Monitor performance dengan Android Profiler untuk menghindari jank pada low-end devices.
>
> #### Self-Exploration Projects
>
> 1. Buat sistem menu dinamis yang mengubah opsi berdasarkan preferensi pengguna
> 2. Implementasikan custom transition animation antara fragment dengan motion layout
> 3. Bandingkan performa drawer navigation vs bottom navigation pada device rendah spesifikasi
>
> #### Tools dan Resources
>
> - Android Studio Layout Inspector
> - Material Design Components Library
> - LeakCanary untuk deteksi memory leak
> - Firebase Performance Monitoring
>
> #### Further Reading
>
> - "Advanced Android UI Development" oleh Apress
> - Dokumentasi Resmi Material Navigation: https://material.io/components/navigation-drawer
> - Pattern Navigasi Android: https://developer.android.com/guide/navigation/navigation-principles