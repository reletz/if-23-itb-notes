---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Network State Monitoring and Battery Optimization
>
> > ## Questions/Cues
> >
> > - Bagaimana cara memeriksa jenis dan status koneksi jaringan yang sedang aktif?
> > - Apa itu NetworkCapabilities dan informasi apa yang disediakannya?
> > - Bagaimana cara mendengarkan perubahan jaringan secara real-time?
> > - Bagaimana aplikasi seharusnya berperilaku di jaringan metered (Data Saver)?
> > - Mengapa bundling transfer jaringan lebih efisien secara baterai dibanding request terpisah?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 16-35)
>
> > ### Memeriksa Koneksi Jaringan dengan ConnectivityManager
> >
> > Android menyediakan **`ConnectivityManager`** sebagai titik masuk utama untuk semua informasi terkait konektivitas jaringan. Untuk menggunakannya, dapatkan instance-nya melalui sistem:
> >
> > ```kotlin
> > val connMgr = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
> > ```
> >
> > Untuk memeriksa apakah ada koneksi aktif yang tersedia:
> >
> > ```kotlin
> > val activeNetwork: NetworkInfo? = connMgr.activeNetworkInfo
> > val isConnected = activeNetwork?.isConnected == true
> > ```
> >
> > Untuk mengetahui jenis koneksi yang sedang aktif (Wi-Fi atau data seluler), gunakan konstanta **`TYPE_WIFI`** dan **`TYPE_MOBILE`**:
> >
> > ```kotlin
> > val networkType = activeNetwork?.type
> > val isWifi = networkType == ConnectivityManager.TYPE_WIFI
> > val isMobile = networkType == ConnectivityManager.TYPE_MOBILE
> > ```
> >
> > Informasi jenis koneksi ini penting untuk memutuskan perilaku aplikasi — misalnya hanya mengunduh file besar jika terhubung ke Wi-Fi.
> >
> > ### NetworkCapabilities: Detail Kemampuan Jaringan
> >
> > Untuk informasi yang lebih kaya tentang jaringan aktif, gunakan **`NetworkCapabilities`**. Objek ini menyediakan informasi tentang kemampuan dan batasan jaringan yang sedang digunakan:
> >
> > | Capability | Deskripsi |
> > |---|---|
> > | `NET_CAPABILITY_INTERNET` | Jaringan memiliki akses ke internet |
> > | `NET_CAPABILITY_NOT_METERED` | Jaringan tidak dikenakan biaya per data (tidak metered) |
> > | `NET_CAPABILITY_NOT_VPN` | Koneksi bukan melalui VPN |
> > | `NET_CAPABILITY_VALIDATED` | Koneksi telah divalidasi memiliki akses internet aktual |
> >
> > Cara mengambil `NetworkCapabilities`:
> >
> > ```kotlin
> > val network = connMgr.activeNetwork
> > val capabilities = connMgr.getNetworkCapabilities(network)
> > val hasInternet = capabilities?.hasCapability(NET_CAPABILITY_INTERNET) == true
> > val isNotMetered = capabilities?.hasCapability(NET_CAPABILITY_NOT_METERED) == true
> > ```
> >
> > **`LinkProperties`** menyediakan informasi lebih rendah level: nama interface jaringan, alamat IP, daftar server DNS, konfigurasi proxy, dan daftar route yang tersedia.
> >
> > ### Mendengarkan Perubahan Jaringan Secara Real-time
> >
> > Aplikasi yang bergantung pada jaringan perlu merespons perubahan konektivitas secara dinamis. Gunakan **`registerDefaultNetworkCallback`** untuk mendaftarkan listener yang dipanggil otomatis saat jaringan default berubah:
> >
> > ```kotlin
> > val networkCallback = object : ConnectivityManager.NetworkCallback() {
> >     override fun onAvailable(network: Network) {
> >         // Jaringan tersedia — lanjutkan operasi yang tertunda
> >     }
> >     override fun onLost(network: Network) {
> >         // Jaringan hilang — tampilkan pesan offline ke pengguna
> >     }
> >     override fun onCapabilitiesChanged(network: Network, caps: NetworkCapabilities) {
> >         // Kemampuan jaringan berubah — misalnya berpindah dari metered ke Wi-Fi
> >     }
> >     override fun onLinkPropertiesChanged(network: Network, props: LinkProperties) {
> >         // Properti link berubah — misalnya IP address berubah
> >     }
> > }
> >
> > connMgr.registerDefaultNetworkCallback(networkCallback)
> > ```
> >
> > Selalu **unregister** callback saat komponen tidak lagi aktif untuk mencegah memory leak:
> >
> > ```kotlin
> > connMgr.unregisterNetworkCallback(networkCallback)
> > ```
> >
> > Untuk memantau jaringan dengan kriteria spesifik (bukan hanya default), gunakan **`NetworkRequest.Builder`** dengan menentukan capability yang diinginkan, lalu daftarkan via `requestNetwork()` atau `registerNetworkCallback()`.
> >
> > ### Optimasi untuk Jaringan Metered dan Data Saver
> >
> > Pengguna dengan paket data terbatas atau yang mengaktifkan fitur **Data Saver** mengharapkan aplikasi menghormati keterbatasan tersebut. Untuk memeriksa apakah jaringan aktif saat ini adalah metered:
> >
> > ```kotlin
> > val isMetered = connMgr.isActiveNetworkMetered
> > ```
> >
> > Saat pengguna mengaktifkan Data Saver di sistem, aplikasi dapat mengetahui statusnya melalui `getRestrictBackgroundStatus()` yang mengembalikan salah satu dari tiga nilai:
> >
> > - **`RESTRICT_BACKGROUND_STATUS_ENABLED`** — Data Saver aktif dan aplikasi ini dibatasi background data-nya
> > - **`RESTRICT_BACKGROUND_STATUS_WHITELISTED`** — Data Saver aktif tetapi aplikasi ini masuk whitelist (diizinkan background data)
> > - **`RESTRICT_BACKGROUND_STATUS_DISABLED`** — Data Saver tidak aktif
> >
> > Aplikasi yang baik akan mengurangi kualitas gambar, menangguhkan sinkronisasi background, atau menunda pengunduhan file besar saat terdeteksi berada di jaringan metered atau saat Data Saver aktif.
> >
> > ### Radio State Machine dan Biaya Energi
> >
> > Radio seluler di perangkat Android beroperasi sebagai **state machine** dengan beberapa level daya:
> >
> > ```mermaid
> > flowchart LR
> >     A["Full Power</br>(Transfer Aktif)"] -->|"~5-10 dtk idle"| B["Low Power</br>(Tail Time)"]
> >     B -->|"~12 dtk idle"| C["Standby</br>(Radio Hemat Daya)"]
> >     C -->|"Ada aktivitas jaringan"| A
> >     B -->|"Ada aktivitas jaringan"| A
> > ```
> >
> > Transisi antar state memiliki **latensi dan biaya energi** yang signifikan. Masalah kritis yang sering diabaikan: **1 request kecil setiap 18 detik** sudah cukup untuk menjaga radio tetap berada di state Full Power secara terus-menerus, menguras baterai secara drastis meskipun data yang ditransfer sangat sedikit.
> >
> > Pola ini — yang disebut **unbundled transfers** — sangat berbahaya. Sebaliknya, **bundled transfers** mengelompokkan semua request dalam satu sesi sehingga radio dapat kembali ke Standby lebih cepat.
> >
> > ### Strategi Optimasi Baterai untuk Jaringan
> >
> > Beberapa teknik terbukti efektif untuk meminimalkan konsumsi baterai akibat aktivitas jaringan:
> >
> > - **Gunakan Wi-Fi jika tersedia** — Wi-Fi umumnya lebih hemat daya dibanding radio seluler untuk transfer data besar
> > - **Bandwidth lebih besar, frekuensi lebih jarang** — lebih baik melakukan satu transfer besar daripada banyak transfer kecil yang sering
> > - **Bundling requests** — kumpulkan semua request yang tertunda dan kirimkan sekaligus dalam satu sesi jaringan
> > - **Pre-fetching data** — unduh data yang kemungkinan besar dibutuhkan dalam waktu dekat (misalnya halaman berikutnya) saat jaringan sudah aktif
> > - **Kurangi jumlah koneksi** — gunakan connection pooling (OkHttp melakukan ini secara otomatis) dan hindari membuka koneksi baru yang tidak perlu
> > - **Event-based bukan polling** — gunakan push notification (FCM) atau WebSocket sebagai pengganti polling berkala yang terus-menerus membangkitkan radio

> [!cornell] #### Summary
>
> **`ConnectivityManager`** adalah API utama untuk memeriksa status jaringan, termasuk jenis koneksi (`TYPE_WIFI`, `TYPE_MOBILE`) dan ketersediaannya via `activeNetworkInfo`. **`NetworkCapabilities`** memberikan informasi lebih kaya seperti `NET_CAPABILITY_INTERNET`, `NOT_METERED`, dan `VALIDATED`. Untuk pemantauan real-time, gunakan **`registerDefaultNetworkCallback`** dengan override `onAvailable`, `onLost`, `onCapabilitiesChanged`. Di jaringan metered atau saat **Data Saver** aktif, aplikasi harus mengurangi transfer background. Radio seluler beroperasi sebagai **state machine** dengan biaya transisi energi yang signifikan — pola **unbundled transfers** (request kecil-kecil sering) sangat boros baterai. Solusinya adalah **bundling requests**, **pre-fetching**, menggunakan Wi-Fi saat tersedia, dan beralih ke arsitektur **event-based** daripada polling.

> [!ad-libitum]- Additional Information
>
> #### Menggunakan WorkManager untuk Background Network Tasks
>
> Untuk tugas jaringan yang tidak harus segera dieksekusi, **WorkManager** adalah solusi yang tepat. WorkManager dapat dikonfigurasi dengan `NetworkType.CONNECTED` atau `NetworkType.UNMETERED` sebagai constraint:
>
> ```kotlin
> val constraints = Constraints.Builder()
>     .setRequiredNetworkType(NetworkType.UNMETERED) // Hanya saat Wi-Fi
>     .build()
>
> val syncRequest = OneTimeWorkRequestBuilder<SyncWorker>()
>     .setConstraints(constraints)
>     .build()
>
> WorkManager.getInstance(context).enqueue(syncRequest)
> ```
>
> WorkManager akan otomatis menunda eksekusi hingga constraint terpenuhi, bahkan setelah perangkat di-restart.
>
> #### Memanfaatkan BroadcastReceiver untuk Perubahan Konektivitas
>
> Pada versi Android lama (sebelum API 24), perubahan konektivitas dapat dideteksi via `BroadcastReceiver` dengan action `CONNECTIVITY_ACTION`. Namun sejak API 24, pendekatan ini deprecated untuk implicit broadcast dan digantikan oleh `NetworkCallback`. Tetap pertahankan kompatibilitas ke belakang jika target minimum SDK masih rendah.
>
> #### Analisis Traffic dengan Android Profiler
>
> Android Studio menyediakan **Network Profiler** di dalam Android Profiler yang memungkinkan visualisasi semua aktivitas jaringan aplikasi secara real-time: kapan request terjadi, berapa lama, berapa byte yang ditransfer, dan isi request/response. Ini adalah alat yang sangat berguna untuk mengidentifikasi pola jaringan yang tidak efisien.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan `NetworkCallback` di sebuah Activity dan tampilkan status koneksi secara real-time di UI (termasuk jenis jaringan dan apakah metered)
> 2. Bandingkan konsumsi baterai antara dua strategi: polling API setiap 15 detik versus menggunakan FCM push notification untuk trigger refresh
> 3. Implementasikan logika adaptif di Repository yang mengambil gambar resolusi rendah saat jaringan metered dan resolusi penuh saat Wi-Fi
>
> #### Bacaan Lanjutan
>
> - Android Developer Guide: "Monitor connectivity status and connection metering"
> - Android Developer Guide: "Optimize network access"
> - Android Developer Guide: "Optimize for battery life"
> - Android Developer Guide: "Transfer data without draining the battery"
> - Dokumentasi WorkManager: "Support for long-running workers"
