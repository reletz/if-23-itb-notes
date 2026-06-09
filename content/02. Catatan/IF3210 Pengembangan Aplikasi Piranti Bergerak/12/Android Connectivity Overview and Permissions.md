---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Android Connectivity Overview and Permissions
>
> > ## Questions/Cues
> >
> > - Apa saja jenis-jenis konektivitas yang tersedia di perangkat Android?
> > - Apa tiga tingkat proteksi dalam sistem perizinan Android dan perbedaannya?
> > - Kapan sistem Android menampilkan dialog permintaan izin ke pengguna?
> > - Permission apa saja yang wajib dideklarasikan untuk operasi jaringan?
> > - Mengapa operasi jaringan tidak boleh dijalankan di main thread?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 3-8)
>
> > ### Taksonomi Jenis Konektivitas Android
> >
> > Perangkat Android modern mendukung berbagai jenis konektivitas yang dapat dikategorikan berdasarkan teknologi dan jangkauannya:
> >
> > - **Konektivitas Seluler**: GPRS, 3G, LTE, dan 5G — menyediakan akses internet berbasis jaringan operator menggunakan alamat IP
> > - **Wi-Fi**: Koneksi nirkabel lokal berkecepatan tinggi menggunakan standar IEEE 802.11
> > - **Bluetooth**: Protokol jarak pendek untuk komunikasi antar perangkat, umum digunakan untuk aksesori dan transfer data
> > - **NFC** (Near Field Communication): Komunikasi jarak sangat dekat (< 4 cm), populer untuk pembayaran digital dan tag
> > - **Telephony/SMS**: Komunikasi suara dan pesan teks melalui jaringan seluler
> > - **Pihak Ketiga**: Teknologi seperti Zigbee dan WiMAX yang umumnya digunakan untuk perangkat IoT dan jaringan area luas metropolitan
> >
> > Setiap jenis konektivitas memiliki karakteristik konsumsi daya, latensi, dan bandwidth yang berbeda-beda, sehingga pemilihan jenis konektivitas yang tepat sangat penting untuk efisiensi aplikasi.
> >
> > ### Sistem Perizinan Android
> >
> > Android mengimplementasikan **sistem perizinan** (permission system) sebagai mekanisme perlindungan privasi pengguna. Setiap aplikasi harus mendeklarasikan permission yang dibutuhkan di file **`AndroidManifest.xml`** menggunakan tag `<uses-permission>`. Sistem membagi permission ke dalam tiga **tingkat proteksi** (protection levels):
> >
> > | Tingkat Proteksi | Kapan Diberikan | Prompt ke Pengguna | Contoh |
> > |---|---|---|---|
> > | **Normal** | Saat instalasi | Tidak | `INTERNET`, `ACCESS_WIFI_STATE`, `BLUETOOTH` |
> > | **Signature** | Saat instalasi (jika tanda tangan cocok) | Tidak | Permission antar aplikasi satu vendor |
> > | **Dangerous** | Saat runtime (pertama kali digunakan) | Ya | `CAMERA`, `CALL_PHONE`, `READ_CONTACTS` |
> >
> > **Normal permissions** diberikan secara otomatis oleh sistem saat instalasi karena risikonya terhadap privasi pengguna dianggap minimal. **Signature permissions** hanya diberikan jika aplikasi yang meminta ditandatangani dengan sertifikat yang sama dengan aplikasi yang mendefinisikan permission tersebut. **Dangerous permissions** menyentuh data sensitif atau fungsi perangkat yang berisiko, sehingga sistem wajib menampilkan dialog ke pengguna untuk meminta persetujuan secara eksplisit.
> >
> > ### Best Practices Meminta Dangerous Permission
> >
> > Meminta permission yang tepat dengan cara yang benar sangat penting untuk pengalaman pengguna dan kepercayaan mereka terhadap aplikasi:
> >
> > - **Hanya minta permission yang benar-benar dibutuhkan** — jangan meminta akses yang tidak relevan dengan fungsi utama aplikasi
> > - **Jelaskan konteks** mengapa permission tersebut diperlukan sebelum menampilkan dialog sistem — pengguna lebih cenderung mengizinkan jika mereka memahami manfaatnya
> > - **Tangani penolakan dengan graceful** — aplikasi harus tetap dapat berjalan (dengan fungsionalitas terbatas) meskipun permission ditolak; jangan langsung crash atau memberikan pesan error yang tidak informatif
> > - **Jangan meminta permission di awal tanpa konteks** — minta permission tepat saat fitur yang membutuhkannya hendak digunakan
> >
> > ### Permission Wajib untuk Operasi Jaringan
> >
> > Untuk melakukan operasi jaringan di Android, aplikasi wajib mendeklarasikan dua permission berikut di `AndroidManifest.xml`:
> >
> > - **`INTERNET`** — mengizinkan aplikasi membuka koneksi jaringan
> > - **`ACCESS_NETWORK_STATE`** — mengizinkan aplikasi membaca status koneksi jaringan yang sedang aktif
> >
> > Kedua permission ini termasuk tingkat **Normal**, sehingga tidak memerlukan dialog runtime ke pengguna.
> >
> > ### Larangan Operasi Jaringan di Main Thread
> >
> > Android secara eksplisit melarang operasi jaringan dijalankan di **main thread** (UI thread). Jika dilanggar, sistem akan melempar `NetworkOnMainThreadException` dan aplikasi akan crash. Alasannya adalah:
> >
> > - Main thread bertanggung jawab menggambar UI dan merespons input pengguna
> > - Operasi jaringan bersifat **blocking** dan tidak dapat diprediksi durasinya
> > - Jika main thread terblokir lebih dari 5 detik, sistem Android akan menampilkan dialog **ANR** (Application Not Responding)
> >
> > Semua operasi jaringan harus dijalankan di **background thread**, misalnya menggunakan Kotlin Coroutines dengan `suspend fun` yang dipanggil dalam `viewModelScope` atau `lifecycleScope`.

> [!cornell] #### Summary
>
> Android mendukung berbagai jenis konektivitas mulai dari **seluler (GPRS hingga 5G)**, **Wi-Fi**, **Bluetooth**, **NFC**, hingga **Telephony/SMS** dan teknologi pihak ketiga. **Sistem perizinan** Android melindungi privasi pengguna melalui tiga tingkat proteksi: **Normal** (diberikan otomatis saat instalasi), **Signature** (berbasis kecocokan sertifikat), dan **Dangerous** (membutuhkan persetujuan eksplisit pengguna saat runtime). Operasi jaringan membutuhkan permission `INTERNET` dan `ACCESS_NETWORK_STATE`, dan wajib dijalankan di **background thread** — bukan main thread — untuk menghindari `NetworkOnMainThreadException` dan menjaga responsivitas UI.

> [!ad-libitum]- Additional Information
>
> #### Deklarasi Permission di AndroidManifest.xml
>
> Contoh deklarasi permission jaringan yang benar di `AndroidManifest.xml`:
>
> ```xml
> <manifest xmlns:android="http://schemas.android.com/apk/res/android">
>     <uses-permission android:name="android.permission.INTERNET" />
>     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
>     ...
> </manifest>
> ```
>
> #### Meminta Dangerous Permission Secara Programatik
>
> Untuk meminta dangerous permission seperti `CAMERA` di runtime:
>
> ```kotlin
> private val requestPermissionLauncher =
>     registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
>         if (isGranted) {
>             // Permission diberikan — lanjutkan fungsionalitas
>         } else {
>             // Permission ditolak — tampilkan UI terbatas atau penjelasan
>         }
>     }
>
> // Meminta permission
> requestPermissionLauncher.launch(Manifest.permission.CAMERA)
> ```
>
> #### Pemeriksaan Status Permission
>
> Sebelum menggunakan fitur yang membutuhkan dangerous permission, selalu periksa statusnya terlebih dahulu:
>
> ```kotlin
> if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
>         == PackageManager.PERMISSION_GRANTED) {
>     // Langsung gunakan fitur
> } else {
>     // Minta permission
>     requestPermissionLauncher.launch(Manifest.permission.CAMERA)
> }
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi sederhana yang meminta izin `CAMERA` dengan penjelasan kontekstual, dan tangani semua skenario: diberikan, ditolak, dan "jangan tanya lagi"
> 2. Eksperimen dengan menempatkan operasi jaringan di main thread dan amati `NetworkOnMainThreadException`, lalu pindahkan ke coroutine dan bandingkan hasilnya
> 3. Identifikasi semua permission yang digunakan oleh aplikasi populer di perangkat Anda dan kategorikan ke dalam Normal vs Dangerous
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Permissions on Android"
> - Android Developer Guide: "Request app permissions"
> - Android Developer Guide: "Permissions best practices"
> - Codelab: "Android Kotlin Fundamentals: Permissions"
