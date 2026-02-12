---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Android Application Components Architecture
>
> > ## Questions/Cues
> >
> > - Apa perbedaan utama antara Activity dan Service?
> > - Bagaimana Content Provider berinteraksi dengan data aplikasi?
> > - Kapan menggunakan Broadcast Receiver?
> > - Bagaimana Android mengelola siklus hidup komponen?
> > - Apa hubungan antara Intent dan komponen aplikasi?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 23-26, 36-39, 64-68)
> > - Android Development with Kotlin (Slides 22-24)
>
> > ### Empat Komponen Utama Aplikasi Android
> >
> > Android menggunakan empat komponen utama yang menjadi fondasi arsitektur aplikasi:
> >
> > **1. Activity**: Merupakan komponen antarmuka pengguna yang merepresentasikan satu layar interaktif. Setiap Activity bertanggung jawab untuk menyelesaikan satu tugas utama pengguna, seperti menampilkan daftar kontak atau mengambil foto. Contoh kehidupan nyata: Halaman registrasi pengguna yang terpisah dari halaman login.
> >
> > **2. Service**: Komponen yang menjalankan tugas latar belakang jangka panjang tanpa antarmuka pengguna. Service tetap berjalan meskipun pengguna beralih ke aplikasi lain. Contoh: Memutar musik dalam aplikasi pemutar musik saat pengguna menjelajahi aplikasi lain.
> >
> > **3. Content Provider**: Mengelola kumpulan data terstruktur yang dibagikan antar aplikasi. Berfungsi sebagai antarmuka standar untuk mengakses database atau penyedia konten eksternal. Contoh: Aplikasi kalender yang membagikan data event ke aplikasi lain melalui Content Provider.
> >
> > **4. Broadcast Receiver**: Komponen yang merespons pengumuman sistem secara luas (broadcast). Tidak memiliki antarmuka pengguna tetapi dapat membuat notifikasi status. Contoh: Menerima pemberitahuan saat perangkat terhubung ke pengisi daya.
> >
> > ### Model Interaksi Berbasis Intent
> >
> > Komponen aplikasi berkomunikasi menggunakan **Intent** - pesan yang mendeskripsikan tindakan yang akan dilakukan. Ada dua jenis intent:
> >
> > **1. Explicit Intent**: Menentukan komponen target secara langsung, biasanya digunakan untuk memulai Activity dalam aplikasi yang sama. Contoh: Memulai Activity "Detail Produk" dari Activity "Daftar Produk".
> >
> > **2. Implicit Intent**: Mendeklarasikan tindakan umum tanpa menentukan komponen tertentu, memungkinkan komponen dari aplikasi lain menanganinya. Contoh: Membagikan foto ke media sosial melalui intent "SEND".
> >
> > Sistem Android menggunakan **Intent Filter** untuk menentukan komponen mana yang dapat menangani intent tertentu. Setiap komponen mendeklarasikan kemampuan melalui filter dalam AndroidManifest.xml.
> >
> > ### Siklus Hidup Komponen
> >
> > Setiap komponen memiliki siklus hidup yang dikelola sistem melalui callback methods:
> >
> > **Activity Lifecycle**:
> >
> > - onCreate(): Inisialisasi komponen
> > - onStart(): Komponen menjadi terlihat
> > - onResume(): Komponen siap interaksi
> > - onPause(): Aktivitas lain mengambil alih
> > - onStop(): Komponen tidak terlihat
> > - onDestroy(): Komponen dihapus dari memori
> >
> > **Service Lifecycle**:
> >
> > - onStartCommand(): Untuk started service
> > - onBind(): Untuk bound service
> > - onUnbind(): Klien unbind
> >
> > Sistem dapat menghentikan komponen untuk mengoptimalkan sumber daya, sehingga developer harus menyimpan dan memulihkan status dengan benar.
> >
> > ### Pola Desain Arsitektural
> >
> > Android merekomendasikan pola desain untuk mengelola kompleksitas komponen:
> >
> > **Model-View-ViewModel (MVVM)**:
> >
> > Memisahkan logika bisnis (Model), tampilan (View), dan mediator (ViewModel). ViewModel bertahan selama konfigurasi perubahan untuk mempertahankan data.
> >
> > **Dependency Injection**:
> >
> > Menggunakan framework seperti Dagger/Hilt untuk menyediakan dependensi ke komponen, mengurangi kopling langsung. Contoh: Menyediakan instance database ke Activity melalui injeksi.
> >
> > **Repository Pattern**:
> >
> > Lapisan abstraksi antara sumber data (database lokal, API jaringan) dan komponen UI. Memusatkan logika akses data dan caching.

> [!cornell] #### Summary
>
> **Arsitektur komponen Android** terdiri atas empat elemen utama: Activity (antarmuka pengguna), Service (proses latar belakang), Content Provider (manajemen data terstruktur), dan Broadcast Receiver (penanganan event sistem). Komponen berinteraksi melalui **mekanisme Intent** yang memungkinkan komunikasi antar komponen dalam aplikasi maupun lintas aplikasi. **Siklus hidup komponen** yang dikelola sistem memerlukan penanganan status yang tepat untuk memastikan perilaku aplikasi yang konsisten. Penggunaan **pola desain arsitektural modern** seperti MVVM dan Dependency Injection meningkatkan maintainability dan skalabilitas aplikasi.

> [!ad-libitum]- Additional Information
>
> #### Implementasi Broadcast Receiver Lanjut
>
> Untuk Broadcast Receiver yang terdaftar secara dinamis (melalui kode), perlu dilakukan unregister secara eksplisit untuk menghindari memory leak. Receiver yang dideklarasikan dalam manifest akan aktif meskipun aplikasi tidak berjalan. Prioritas intent filter dapat ditentukan menggunakan atribut android:priority.
>
> #### Content Provider dengan Room Database
>
> Implementasi Content Provider modern dapat menggunakan Room Persistence Library sebagai lapisan abstraksi SQLite. Gunakan UriMatcher untuk menangani berbagai pola URI. Selalu validasi input pengguna untuk mencegah SQL injection.
>
> #### Bound Services dengan IPC
>
> Untuk komunikasi antar proses (IPC), gunakan Messenger atau implementasikan antarmuka AIDL (Android Interface Definition Language). Contoh: Aplikasi media player yang mengekspos kontrol pemutaran ke aplikasi lain.
>
> #### Self-Exploration Projects
>
> 1. Bangun aplikasi dengan dua Activity yang berkomunikasi menggunakan Parcelable Objects melalui Intent
> 2. Implementasikan Background Service yang mengunduh file dengan progress notification
> 3. Buat Content Provider kustom untuk berbagi data catatan (notes) antar aplikasi
>
> #### Tools dan Resources
>
> - Android Profiler: Analisis penggunaan memori dan CPU komponen
> - App Inspection: Debug database Room secara langsung
> - LeakCanary: Deteksi memory leak dalam komponen
>
> #### Further Reading
>
> - "Android Application Components" (Dokumentasi Resmi Android)
> - "Pro Android Apps Performance Optimization" oleh Hervé Guihot
> - "Efficient Android Threading" oleh Anders Goransson