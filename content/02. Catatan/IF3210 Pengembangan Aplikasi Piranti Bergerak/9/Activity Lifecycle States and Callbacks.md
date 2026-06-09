---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Activity Lifecycle States and Callbacks
>
> > ## Questions/Cues
> >
> > - Mengapa lifecycle Activity penting untuk kualitas aplikasi?
> > - Apa enam state utama Activity dan kondisi masing-masing?
> > - Kapan `onPause()` vs `onStop()` dipanggil?
> > - Bagaimana cara menyimpan state UI saat terjadi perubahan konfigurasi?
> > - Apa perbedaan `onRestart()` dan `onCreate()` dalam alur lifecycle?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 3-15)
>
> > ### Mengapa Lifecycle Activity Penting
> >
> > Pemahaman lifecycle Activity merupakan fondasi pengembangan Android yang andal. Tanpa penanganan lifecycle yang benar, aplikasi dapat mengalami beberapa masalah kritis:
> >
> > - **Kehilangan data pengguna** saat pengguna meninggalkan aplikasi sementara (misalnya menerima telepon) lalu kembali
> > - **Crash** saat rotasi layar karena sistem menghancurkan dan membuat ulang Activity
> > - **Memory leak** jika resource tidak dilepas saat Activity tidak lagi terlihat
> >
> > Sistem Android memiliki otoritas penuh untuk menghancurkan proses aplikasi demi kebutuhan resource, sehingga pengembang harus mengantisipasi semua transisi state yang mungkin terjadi.
> >
> > ### State Activity dan Transisi
> >
> > Activity melewati enam state yang berbeda sepanjang masa hidupnya. Sistem memanggil callback tertentu saat bertransisi antar state:
> >
> > ```mermaid
> > flowchart TD
> >     A([Activity Launched]) --> B[onCreate]
> >     B --> C[onStart]
> >     C --> D[onResume]
> >     D --> E([Activity Running])
> >     E --> F[onPause]
> >     F --> G[onStop]
> >     G --> H[onDestroy]
> >     H --> I([Activity Shut Down])
> >     G --> J[onRestart]
> >     J --> C
> > ```
> >
> > | State | Callback | Kondisi Activity |
> > |-------|----------|-----------------|
> > | **CREATED** | `onCreate()` | Sedang diinisialisasi |
> > | **STARTED** | `onStart()` | Terlihat oleh pengguna |
> > | **RESUMED** | `onResume()` | Memiliki input focus, aktif berinteraksi |
> > | **PAUSED** | `onPause()` | Tidak memiliki input focus, masih terlihat |
> > | **STOPPED** | `onStop()` | Tidak lagi terlihat |
> > | **DESTROYED** | `onDestroy()` | Dihancurkan |
> >
> > ### Detail Setiap Callback Lifecycle
> >
> > **`onCreate()`** adalah satu-satunya callback yang wajib diimplementasikan. Di sinilah Activity menginflate layout UI, menginisialisasi variabel, dan menjalankan logika startup awal. Callback ini selalu dipanggil pertama kali saat Activity dibuat.
> >
> > **`onStart()`** dipanggil saat Activity mulai terlihat oleh pengguna. Dapat dipanggil setelah `onCreate()` (pertama kali) atau setelah `onRestart()` (jika Activity sebelumnya di-stop). Di sini biasanya dilakukan registrasi listener yang terkait visibilitas.
> >
> > **`onResume()`** dipanggil saat Activity mendapatkan input focus dan pengguna dapat mulai berinteraksi. Activity akan terus berada di state RESUMED sampai sistem memicunya berpindah ke PAUSED, misalnya saat dialog muncul di atas Activity.
> >
> > **`onPause()`** adalah kebalikan dari `onResume()`. Dipanggil saat Activity kehilangan focus tetapi masih terlihat sebagian (misalnya ada dialog transparan di depannya). Operasi di sini harus **sangat ringan** karena waktu eksekusi yang lambat dapat mempengaruhi transisi ke Activity berikutnya.
> >
> > **`onStop()`** dipanggil saat Activity tidak lagi terlihat sama sekali. Di sinilah sebaiknya resource yang tidak dibutuhkan dibebaskan dan data persisten (yang sedang diedit pengguna) disimpan agar tidak hilang.
> >
> > **`onDestroy()`** adalah callback terakhir sebelum Activity dihancurkan. Ini dapat terjadi karena Activity selesai atau karena perubahan konfigurasi (seperti rotasi layar). Jangan mengandalkan `onDestroy()` untuk menyimpan data pengguna — lakukan itu di `onStop()`.
> >
> > ### Menyimpan State dengan Bundle
> >
> > Saat terjadi perubahan konfigurasi (rotasi layar) atau sistem menghentikan aplikasi di background, Activity dihancurkan dan dibuat ulang. Pengguna mengharapkan state UI tetap sama setelah ini. Android menyediakan mekanisme **Bundle** untuk menyimpan state sementara:
> >
> > - Gunakan `onSaveInstanceState(outState: Bundle)` untuk menyimpan data state ke Bundle sebelum Activity dihancurkan
> > - `onCreate()` menerima Bundle yang sama sebagai argumen saat Activity dibuat kembali
> > - Data yang cocok disimpan di Bundle: nilai form input, posisi scroll, tab yang dipilih — bukan data besar seperti gambar (gunakan ViewModel untuk itu)

> [!cornell] #### Summary
>
> **Activity lifecycle** mengelola transisi antara enam state: CREATED, STARTED, RESUMED, PAUSED, STOPPED, dan DESTROYED, masing-masing dipicu oleh callback spesifik. **`onCreate()`** wajib diimplementasikan untuk inisialisasi UI; **`onPause()`** untuk operasi ringan saat kehilangan focus; **`onStop()`** untuk melepas resource dan menyimpan data persisten. Perubahan konfigurasi seperti rotasi layar menghancurkan dan membuat ulang Activity, sehingga state UI harus disimpan via **`onSaveInstanceState()`** menggunakan Bundle agar dapat dipulihkan di `onCreate()`.

> [!ad-libitum]- Additional Information
>
> #### Lifecycle dan Penggunaan ViewModel
>
> Sejak Android Architecture Components diperkenalkan, penggunaan `onSaveInstanceState()` direkomendasikan hanya untuk data UI ringan (seperti ID yang dipilih). Untuk data kompleks, gunakan **ViewModel** yang bertahan saat perubahan konfigurasi:
>
> ```kotlin
> class MyViewModel : ViewModel() {
>     val userData = MutableLiveData<User>()
> }
>
> class MyActivity : AppCompatActivity() {
>     private val viewModel: MyViewModel by viewModels()
> }
> ```
>
> #### Logging untuk Debug Lifecycle
>
> Tambahkan log di setiap callback untuk memahami alur lifecycle selama development:
>
> ```kotlin
> override fun onStart() {
>     super.onStart()
>     Log.d("Lifecycle", "onStart called")
> }
> ```
>
> Gunakan tag yang konsisten agar mudah difilter di Logcat Android Studio.
>
> #### Kasus Khusus: Multi-window dan Picture-in-Picture
>
> Pada perangkat modern yang mendukung multi-window, Activity dapat berada di state PAUSED meskipun terlihat penuh dan pengguna masih berinteraksi dengannya. Ini karena Activity lain di window yang berbeda memiliki focus. Pertimbangkan ini saat memutuskan logika di `onPause()`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan `Log.d()` di setiap callback lifecycle sebuah Activity, lalu uji berbagai skenario: rotasi layar, menerima panggilan telepon, menekan tombol Home vs Back
> 2. Implementasikan `onSaveInstanceState()` untuk menyimpan teks yang diketik di EditText agar tidak hilang saat rotasi
> 3. Bandingkan pendekatan Bundle vs ViewModel untuk state preservation
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Understand the Activity Lifecycle"
> - Android Developer Guide: "Saving UI States"
> - Codelab: "Android Kotlin Fundamentals: Lifecycles and logging"
> - "Android Programming: The Big Nerd Ranch Guide" Bab 4 (Activity lifecycle)
