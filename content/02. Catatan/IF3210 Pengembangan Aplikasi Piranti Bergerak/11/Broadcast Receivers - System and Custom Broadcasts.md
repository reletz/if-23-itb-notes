---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Broadcast Receivers - System and Custom Broadcasts
>
> > ## Questions/Cues
> >
> > - Apa perbedaan broadcast intent dengan implicit intent biasa?
> > - Bagaimana cara mendaftarkan sebuah BroadcastReceiver dan apa batasannya?
> > - Apa saja contoh system broadcast yang dikirim Android secara otomatis?
> > - Mengapa keamanan menjadi perhatian utama dalam penggunaan broadcast?
> > - Kapan sebaiknya menggunakan LocalBroadcastManager dibandingkan broadcast biasa?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 2-7)
>
> > ### Broadcast vs Implicit Intent
> >
> > Pada dasarnya, **broadcast** dan **implicit intent** sama-sama memanfaatkan mekanisme Intent Android, namun tujuan penggunaannya berbeda. **Implicit intent** (dikirim via `startActivity()` atau `startService()`) ditujukan untuk memulai sebuah komponen tertentu — sistem akan mencari satu target terbaik. Sebaliknya, **broadcast intent** (dikirim via `sendBroadcast()`) ditujukan untuk diterima oleh banyak komponen sekaligus tanpa mengharapkan respons langsung.
> >
> > Analogi sederhananya: implicit intent seperti mengirim pesan langsung kepada seseorang, sedangkan broadcast seperti mengumumkan sesuatu di radio — siapa saja yang memiliki penerima yang sesuai dapat menangkapnya.
> >
> > ### Apa Itu BroadcastReceiver
> >
> > **BroadcastReceiver** adalah komponen Android yang berfungsi mendengarkan dan merespons Intent yang dikirim melalui `sendBroadcast()`. Komponen ini berjalan di **latar belakang** bahkan saat aplikasi tidak sedang aktif atau tertutup, menjadikannya mekanisme ideal untuk merespons event sistem maupun event antar-aplikasi.
> >
> > Karakteristik krusial yang harus dipahami: receiver hanya memiliki **5 detik** untuk menyelesaikan seluruh pekerjaannya di dalam `onReceive()` sebelum sistem menganggapnya tidak responsif dan menghancurkannya. Oleh karena itu, `onReceive()` **tidak boleh** menjalankan operasi berat seperti akses jaringan atau query database yang memakan waktu lama. Jika pekerjaan lebih panjang dibutuhkan, receiver harus mendelegasikannya ke sebuah **Service**.
> >
> > ```mermaid
> > flowchart TD
> >     S["Sender </br> (App / System)"] -->|"sendBroadcast(Intent)"| SYS["Android System</br>(Intent Router)"]
> >     SYS -->|"mencocokkan IntentFilter"| R1["BroadcastReceiver A"]
> >     SYS -->|"mencocokkan IntentFilter"| R2["BroadcastReceiver B"]
> >     R1 --> OA["onReceive()</br>(maks 5 detik)"]
> >     R2 --> OB["onReceive()</br>(maks 5 detik)"]
> > ```
> >
> > ### Jenis-Jenis Broadcast
> >
> > **System Broadcasts** adalah siaran yang dikirimkan oleh Android sendiri sebagai respons atas event tingkat sistem. Beberapa contoh umum:
> >
> > - `android.intent.action.BOOT_COMPLETED` — perangkat selesai booting
> > - `android.net.wifi.WIFI_STATE_CHANGED` — status koneksi Wi-Fi berubah
> > - `android.intent.action.BATTERY_LOW` — baterai hampir habis
> > - `android.intent.action.AIRPLANE_MODE` — mode pesawat diaktifkan/dinonaktifkan
> >
> > **Custom Broadcasts** adalah siaran yang didefinisikan dan dikirim oleh aplikasi itu sendiri. Ada dua mekanisme pengiriman:
> >
> > - **`sendBroadcast(Intent)`** — mengirim broadcast normal; semua receiver yang cocok dipanggil secara tidak terurut
> > - **`sendOrderedBroadcast(Intent, ...)`** — mengirim broadcast terurut; receiver dipanggil satu per satu berdasarkan prioritas, dan setiap receiver dapat menghentikan penyebaran broadcast ke receiver berikutnya
> >
> > ### Keamanan dan LocalBroadcastManager
> >
> > Karena broadcast bersifat lintas aplikasi, ada beberapa **risiko keamanan** yang perlu diwaspadai:
> >
> > - **Keunikan nama action**: Nama action broadcast harus unik, umumnya menggunakan nama paket sebagai prefix (contoh: `com.example.myapp.MY_ACTION`) untuk menghindari tabrakan dengan aplikasi lain
> > - **Akses tidak sah**: Aplikasi lain yang tidak bertanggung jawab dapat mengirim broadcast palsu ke receiver kita, atau sebaliknya, receiver kita dapat menangkap broadcast yang dimaksudkan untuk aplikasi lain
> > - **Permission lintas aplikasi**: Gunakan `permission` di manifest untuk membatasi siapa yang boleh mengirim atau menerima broadcast tertentu
> >
> > Solusi paling aman untuk broadcast yang hanya perlu didengar di dalam aplikasi sendiri adalah menggunakan **`LocalBroadcastManager`**. Broadcast yang dikirim via `LocalBroadcastManager` tidak akan keluar dari proses aplikasi, sehingga aplikasi lain sama sekali tidak dapat mengirim atau menerima broadcast tersebut.

> [!cornell] #### Summary
>
> **BroadcastReceiver** adalah komponen yang mendengarkan Intent yang dikirim via `sendBroadcast()`, berjalan di background bahkan saat aplikasi tertutup, dengan batasan ketat **5 detik** di dalam `onReceive()` untuk mencegah ANR. Terdapat dua jenis broadcast: **system broadcast** (dikirim Android untuk event seperti `BOOT_COMPLETED` dan `WIFI_STATE_CHANGED`) dan **custom broadcast** (dikirim aplikasi, bisa normal atau terurut via `sendOrderedBroadcast()`). Aspek keamanan kritis mencakup keunikan nama action, pembatasan permission lintas aplikasi, dan penggunaan **`LocalBroadcastManager`** untuk broadcast yang hanya relevan dalam satu aplikasi.

> [!ad-libitum]- Additional Information
>
> #### Mendaftarkan BroadcastReceiver: Manifest vs Dynamic
>
> Ada dua cara mendaftarkan receiver. **Static registration** dilakukan di `AndroidManifest.xml` menggunakan tag `<receiver>` dan cocok untuk menerima system broadcast:
>
> ```xml
> <receiver android:name=".MyReceiver" android:exported="true">
>     <intent-filter>
>         <action android:name="android.intent.action.BOOT_COMPLETED"/>
>     </intent-filter>
> </receiver>
> ```
>
> **Dynamic registration** dilakukan di dalam kode (biasanya di `onStart()`/`onResume()` Activity) dan harus di-unregister di `onStop()`/`onPause()` untuk mencegah memory leak:
>
> ```kotlin
> val filter = IntentFilter("com.example.MY_ACTION")
> registerReceiver(myReceiver, filter)
> // Di onStop():
> unregisterReceiver(myReceiver)
> ```
>
> Sejak Android 8.0 (Oreo), sebagian besar static broadcast untuk implicit intent dibatasi. Hanya daftar broadcast tertentu yang masih diizinkan melalui manifest.
>
> #### Ordered Broadcast dan Chaining
>
> Pada ordered broadcast, receiver dengan nilai `android:priority` tertinggi dipanggil terlebih dahulu. Receiver dapat memanggil `abortBroadcast()` untuk menghentikan penyebaran, atau `setResult()` untuk mengoper data ke receiver berikutnya — membentuk semacam pipeline pemrosesan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat BroadcastReceiver yang mendeteksi `BOOT_COMPLETED` dan otomatis menjadwalkan reminder notifikasi
> 2. Implementasikan ordered broadcast dengan dua receiver yang memiliki prioritas berbeda; amati urutan eksekusi dan coba `abortBroadcast()`
> 3. Bandingkan LocalBroadcastManager dengan broadcast biasa dari sisi keamanan menggunakan log
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Broadcasts Overview"
> - Android Developer Guide: "Restrict broadcasts with permissions"
> - Android 8.0 Behavior Changes: "Background Execution Limits"
> - "Android Programming: The Big Nerd Ranch Guide" — Bab tentang Intent dan BroadcastReceiver
