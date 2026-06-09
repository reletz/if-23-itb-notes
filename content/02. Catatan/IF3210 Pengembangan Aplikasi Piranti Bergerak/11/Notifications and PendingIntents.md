---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Notifications and PendingIntents
>
> > ## Questions/Cues
> >
> > - Apa itu notifikasi dan di mana saja ia bisa ditampilkan?
> > - Apa peran NotificationCompat.Builder vs NotificationManager?
> > - Bagaimana langkah-langkah membuat dan menampilkan notifikasi?
> > - Apa itu PendingIntent dan mengapa ia dibutuhkan untuk aksi notifikasi?
> > - Bagaimana tingkat prioritas notifikasi memengaruhi cara tampilnya?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 18-27)
>
> > ### Apa Itu Notifikasi
> >
> > **Notifikasi** adalah pesan yang ditampilkan **di luar antarmuka utama aplikasi** untuk menyampaikan informasi kepada pengguna. Secara visual, sebuah notifikasi standar terdiri dari beberapa elemen utama: **small icon** (ikon kecil di status bar), **title** (judul singkat), dan **detail text** (isi pesan). Selain itu, notifikasi dapat diperluas untuk menampilkan konten lebih kaya seperti teks panjang, gambar, atau kontrol media.
> >
> > Notifikasi dapat muncul di beberapa lokasi sekaligus tergantung konfigurasi dan versi Android:
> >
> > - **Status bar** — ikon kecil muncul di bagian atas layar
> > - **Notification drawer** — detail lengkap terlihat saat pengguna menarik status bar ke bawah
> > - **Heads-up notification** — muncul sebagai banner mengambang di atas layar saat prioritas tinggi
> > - **Lock screen** — tampil di layar kunci tergantung visibilitas yang dikonfigurasi
> >
> > ### Dua Kelas Utama: Builder dan Manager
> >
> > Android memisahkan tanggung jawab pembuatan notifikasi ke dalam dua kelas yang berbeda:
> >
> > **`NotificationCompat.Builder`** bertugas membangun **konten dan tampilan** notifikasi. Kelas ini menggunakan pola builder untuk mengonfigurasi semua atribut visual dan interaktif notifikasi: icon, judul, teks, aksi tombol, style, dan lain sebagainya. Penggunaan `NotificationCompat` (bukan `Notification` langsung) dianjurkan karena menjamin kompatibilitas mundur ke versi Android yang lebih lama.
> >
> > **`NotificationManager`** (atau `NotificationManagerCompat`) bertugas **menerbitkan** notifikasi yang sudah dibangun ke sistem Android. Kelas ini adalah antarmuka antara aplikasi dan sistem notifikasi Android.
> >
> > ### Langkah-Langkah Membuat Notifikasi
> >
> > Implementasi notifikasi mengikuti alur yang sistematis:
> >
> > 1. **Definisikan variabel** — tentukan channel ID, notification ID, dan konten teks
> > 2. **Instansiasi NotificationManager** — ambil referensi sistem via `getSystemService()`
> > 3. **Buat Notification Channel** (wajib di Android 8.0+) — daftarkan channel dengan ID, nama, dan tingkat kepentingan
> > 4. **Bangun notifikasi** dengan `NotificationCompat.Builder` — set small icon, title, text, priority, dan aksi
> > 5. **Terbitkan notifikasi** dengan `notificationManager.notify(id, notification)`
> >
> > ```mermaid
> > flowchart LR
> >     A["Definisikan\nVariabel"] --> B["Instansiasi\nNotificationManager"]
> >     B --> C["Buat\nNotification Channel\n(Android 8+)"]
> >     C --> D["Build dengan\nNotificationCompat.Builder"]
> >     D --> E["notify(id, notification)"]
> >     E --> F["Notifikasi\nTampil ke Pengguna"]
> > ```
> >
> > ### PendingIntent untuk Aksi Pengguna
> >
> > Sebuah notifikasi menjadi interaktif melalui **`PendingIntent`**. PendingIntent adalah **deskripsi dari sebuah Intent beserta aksi targetnya** yang dapat dieksekusi oleh aplikasi atau sistem lain di masa mendatang, seolah-olah dieksekusi oleh aplikasi pemilik PendingIntent.
> >
> > Konsep kunci PendingIntent: ia **mendelegasikan izin** kepada penerima (dalam hal ini sistem Android) untuk menjalankan Intent yang terkandung di dalamnya atas nama aplikasi pembuat. Ini penting karena saat pengguna mengetuk notifikasi, sistem yang mengeksekusi aksi tersebut, bukan aplikasi secara langsung.
> >
> > PendingIntent dibuat menggunakan factory method statis:
> >
> > - `PendingIntent.getActivity()` — untuk membuka Activity
> > - `PendingIntent.getService()` — untuk memulai Service
> > - `PendingIntent.getBroadcast()` — untuk mengirim Broadcast
> >
> > PendingIntent kemudian dilekatkan ke notifikasi via `.setContentIntent(pendingIntent)` pada builder untuk aksi tap utama, atau via `.addAction()` untuk tombol aksi tambahan.
> >
> > ### Tingkat Prioritas Notifikasi
> >
> > Prioritas notifikasi mengontrol seberapa mengganggu dan seberapa mencolok notifikasi akan tampil. Terdapat 5 level prioritas:
> >
> > | Konstanta | Nilai | Perilaku |
> > |-----------|-------|----------|
> > | `PRIORITY_MAX` | +2 | Heads-up notification, suara & getaran |
> > | `PRIORITY_HIGH` | +1 | Heads-up notification |
> > | `PRIORITY_DEFAULT` | 0 | Muncul di notification drawer |
> > | `PRIORITY_LOW` | -1 | Tanpa suara, muncul di bawah list |
> > | `PRIORITY_MIN` | -2 | Tersembunyi, hanya di notification drawer |
> >
> > Prioritas di atas 0 akan memicu tampilan **heads-up notification** — banner yang muncul mengambang di bagian atas layar, bahkan saat pengguna sedang menggunakan aplikasi lain.
> >
> > ### Layout Style Notifikasi
> >
> > `NotificationCompat.Builder` menyediakan beberapa **style** untuk notifikasi yang diperluas:
> >
> > - **`BigTextStyle`** — menampilkan teks panjang yang dapat di-expand; cocok untuk pesan email atau pesan teks
> > - **`InboxStyle`** — menampilkan daftar baris teks; cocok untuk merangkum beberapa notifikasi
> > - **`BigPictureStyle`** — menampilkan gambar besar saat di-expand
> > - **`ProgressBar`** — menampilkan progress bar; cocok untuk mengindikasikan kemajuan unduhan atau proses
> > - **`MediaStyle`** — menampilkan kontrol media (play/pause/skip); cocok untuk pemutar musik

> [!cornell] #### Summary
>
> **Notifikasi** adalah pesan di luar UI aplikasi yang tampil di status bar, notification drawer, atau sebagai heads-up banner. Dua kelas inti: **`NotificationCompat.Builder`** membangun konten dan tampilan, sementara **`NotificationManager`** menerbitkan notifikasi ke sistem. **`PendingIntent`** memungkinkan aksi interaktif dengan mendelegasikan izin eksekusi Intent kepada sistem. Prioritas berkisar dari `PRIORITY_MIN` (-2) hingga `PRIORITY_MAX` (+2); nilai di atas 0 memicu heads-up notification. Untuk tampilan yang lebih kaya, gunakan style seperti `BigTextStyle`, `ProgressBar`, atau `MediaStyle`.

> [!ad-libitum]- Additional Information
>
> #### Notification Channels (Android 8.0+)
>
> Sejak Android 8.0, semua notifikasi **wajib** ditempatkan dalam sebuah **Notification Channel**. Channel adalah cara bagi pengguna untuk mengontrol kategori notifikasi secara individual di pengaturan sistem — mereka dapat menonaktifkan channel tertentu tanpa mematikan seluruh notifikasi aplikasi.
>
> ```kotlin
> val channel = NotificationChannel(
>     "channel_id",
>     "Nama Channel",
>     NotificationManager.IMPORTANCE_HIGH
> ).apply {
>     description = "Deskripsi channel ini"
> }
> notificationManager.createNotificationChannel(channel)
> ```
>
> #### Notification Groups dan Bundling
>
> Saat aplikasi mengirim banyak notifikasi, sistem dapat mengelompokkannya secara otomatis atau manual menggunakan `setGroup()`. Ini mencegah notification drawer penuh dan meningkatkan pengalaman pengguna.
>
> #### Izin POST_NOTIFICATIONS (Android 13+)
>
> Sejak Android 13, aplikasi harus secara eksplisit meminta runtime permission `POST_NOTIFICATIONS` kepada pengguna sebelum dapat menampilkan notifikasi. Pengguna yang menolak tidak akan menerima notifikasi sama sekali.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi timer yang mengirim notifikasi heads-up saat waktu habis dengan tombol aksi "Set Timer Lagi" menggunakan PendingIntent
> 2. Implementasikan notifikasi progress bar yang diperbarui setiap detik untuk mensimulasikan proses unduhan
> 3. Buat beberapa notification channel dengan tingkat kepentingan berbeda, lalu uji perilakunya di pengaturan sistem
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Notifications Overview"
> - Android Developer Guide: "Create a Notification"
> - Android Developer Guide: "PendingIntent"
> - Material Design Guidelines: "Notifications" — panduan desain dan konvensi UX
