---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Android Services - Started, Bound, and Foreground
>
> > ## Questions/Cues
> >
> > - Apa itu Service dan mengapa dibutuhkan untuk operasi jangka panjang?
> > - Apa perbedaan antara started service dan bound service?
> > - Mengapa Service berjalan di main thread dan apa implikasinya?
> > - Kapan harus menggunakan foreground service dan apa syaratnya?
> > - Bagaimana IntentService menyederhanakan pengelolaan lifecycle Service?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 8-18)
>
> > ### Apa Itu Service
> >
> > **Service** adalah komponen aplikasi Android yang dirancang untuk menjalankan **operasi jangka panjang di latar belakang** tanpa menyediakan antarmuka pengguna (UI). Service cocok digunakan untuk skenario seperti memutar musik, mengunduh file, melakukan sinkronisasi data ke server, atau operasi I/O yang tidak perlu melibatkan interaksi pengguna secara langsung.
> >
> > Berbeda dari Activity, Service tidak memiliki representasi visual dan dapat terus berjalan **bahkan ketika pengguna beralih ke aplikasi lain**. Namun, pengembang tetap harus mengelola lifecycle-nya secara eksplisit — Service tidak otomatis berhenti ketika sudah selesai bekerja kecuali diberhentikan secara manual.
> >
> > Karakteristik penting yang sering disalahpahami: secara default, Service **berjalan di main thread (UI thread)** aplikasi yang menjalankannya, bukan di thread terpisah. Ini berarti operasi berat seperti network I/O atau komputasi intensif di dalam Service akan tetap memblokir UI dan menyebabkan ANR (Application Not Responding). Pengembang harus secara eksplisit membuat thread baru di dalam Service bila diperlukan.
> >
> > ### Started Service vs Bound Service
> >
> > ```mermaid
> > flowchart TB
> >     A["Komponen (Activity, dll)"] -->|"startService(Intent)"| SS["Started Service"]
> >     A -->|"bindService(Intent, conn, flags)"| BS["Bound Service"]
> >     SS -->|"stopSelf() / stopService()"| D1["Service dihancurkan"]
> >     BS -->|"semua klien unbindService()"| D2["Service dihancurkan"]
> >     SS --> OA["onStartCommand()\nberjalan terus menerus"]
> >     BS --> OB["onBind()\nmengembalikan IBinder"]
> > ```
> >
> > **Started Service** dimulai oleh komponen lain dengan memanggil `startService()`. Setelah dimulai, service ini berjalan secara **independen** dari komponen yang memulainya — bahkan jika komponen tersebut dihancurkan, service tetap berjalan. Service harus menghentikan dirinya sendiri dengan `stopSelf()` saat pekerjaan selesai, atau dihentikan dari luar dengan `stopService()`. Karena tidak ada mekanisme pengembalian hasil langsung ke pemanggil, started service cocok untuk operasi "fire-and-forget" seperti mengunggah file.
> >
> > **Bound Service** menyediakan antarmuka **client-server** yang memungkinkan komponen lain (klien) untuk berinteraksi dengan service, mengirim request, dan menerima hasil. Klien mengikat dirinya ke service dengan `bindService()` dan melepaskan ikatan dengan `unbindService()`. Service akan otomatis dihancurkan ketika **semua klien** melepaskan ikatannya. Bound service mengimplementasikan `onBind()` yang mengembalikan objek `IBinder` sebagai antarmuka komunikasi.
> >
> > ### Foreground Service
> >
> > **Foreground Service** adalah jenis service yang menjalankan operasi yang **disadari oleh pengguna** dan dianggap cukup penting untuk tidak boleh dihentikan sistem saat membutuhkan resource. Contoh klasik adalah pemutar musik atau aplikasi navigasi yang terus berjalan saat pengguna beralih ke aplikasi lain.
> >
> > Syarat wajib foreground service: harus menampilkan sebuah **persistent notification** selama service berjalan. Notifikasi ini tidak dapat di-dismiss pengguna selama service masih aktif, berfungsi sebagai indikator visual bahwa ada proses penting yang sedang berlangsung. Karena karakteristik ini, foreground service mendapatkan **prioritas lebih tinggi** dari sistem dan jauh lebih kecil kemungkinannya untuk dimatikan saat memori rendah.
> >
> > Foreground service dimulai dengan `startForeground(id, notification)` yang dipanggil di dalam `onStartCommand()` sesegera mungkin setelah service dimulai.
> >
> > ### IntentService: Service yang Disederhanakan
> >
> > **IntentService** adalah subkelas Service yang menyediakan lifecycle yang jauh lebih sederhana untuk kasus penggunaan umum: menjalankan satu operasi latar belakang per request secara sekuensial. Karakteristiknya:
> >
> > - Secara otomatis membuat **worker thread** terpisah (bukan main thread)
> > - Request diproses satu per satu dalam antrian secara berurutan
> > - Service otomatis dihancurkan setelah `onHandleIntent()` selesai dieksekusi
> > - Tidak perlu memanggil `stopSelf()` secara manual
> >
> > Pengembang hanya perlu mengimplementasikan `onHandleIntent(Intent?)` yang berisi logika pekerjaan. IntentService ideal untuk task seperti mengunduh file atau mengirim data analitik.

> [!cornell] #### Summary
>
> **Service** adalah komponen tanpa UI untuk operasi jangka panjang di latar belakang, berjalan di **main thread** secara default sehingga operasi berat harus dieksekusi di thread terpisah secara manual. **Started service** (via `startService()`) berjalan independen dan harus dihentikan sendiri; **bound service** (via `bindService()`) menyediakan antarmuka client-server dan berhenti otomatis saat semua klien unbind. **Foreground service** diprioritaskan sistem dengan syarat wajib menampilkan persistent notification, cocok untuk operasi yang disadari pengguna. **IntentService** menyederhanakan semuanya dengan worker thread otomatis dan lifecycle yang berakhir sendiri setelah `onHandleIntent()` selesai.

> [!ad-libitum]- Additional Information
>
> #### WorkManager sebagai Pengganti Modern IntentService
>
> Di era modern Android, **WorkManager** dari Android Jetpack adalah solusi yang direkomendasikan untuk menggantikan IntentService dan sebagian besar use case started service. WorkManager menjamin eksekusi task bahkan jika aplikasi atau perangkat di-restart, mendukung constraint (seperti "hanya jalankan saat ada Wi-Fi"), dan terintegrasi baik dengan lifecycle sistem:
>
> ```kotlin
> val uploadRequest = OneTimeWorkRequestBuilder<UploadWorker>()
>     .setConstraints(
>         Constraints.Builder()
>             .setRequiredNetworkType(NetworkType.CONNECTED)
>             .build()
>     )
>     .build()
> WorkManager.getInstance(context).enqueue(uploadRequest)
> ```
>
> #### Perbedaan Service dan Thread
>
> Service bukanlah thread. Service adalah komponen Android dengan lifecycle yang dikelola sistem; ia berjalan di main thread kecuali ditentukan lain. Untuk concurrency di dalam Service, gunakan `Thread`, `Coroutine`, atau `Executor` secara eksplisit.
>
> #### Batasan Background Service di Android 8.0+
>
> Sejak Android 8.0 (Oreo), sistem sangat membatasi started service yang dijalankan dari background — sistem akan menghentikannya dalam beberapa menit. Untuk operasi panjang dari background, gunakan foreground service atau WorkManager.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi pemutar musik sederhana menggunakan foreground service dengan MediaPlayer dan persistent notification yang menampilkan judul lagu
> 2. Implementasikan bound service untuk menghitung waktu yang telah berlalu (stopwatch); hubungkan dengan Activity menggunakan IBinder
> 3. Migrasi sebuah IntentService ke WorkManager dan bandingkan kompleksitas kode serta keandalannya
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Services Overview"
> - Android Developer Guide: "Bound Services Overview"
> - Android Developer Guide: "Background Work Overview" (WorkManager)
> - "Android Programming: The Big Nerd Ranch Guide" — Bab tentang Services dan Background Tasks
