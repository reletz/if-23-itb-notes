---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Coroutines for Asynchronous Programming
>
> > ## Questions/Cues
> >
> > - Mengapa operasi long-running tidak boleh dijalankan di main thread?
> > - Apa keunggulan Kotlin Coroutines dibanding threading tradisional?
> > - Apa perbedaan antara Dispatchers.Main, IO, dan Default?
> > - Bagaimana `viewModelScope` membantu mengelola lifecycle coroutine?
> > - Apa perbedaan antara `launch` dan `async` dalam coroutine?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 29-45)
>
> > ### Mengapa Pemrograman Asinkron Diperlukan
> >
> > Setiap aplikasi Android berjalan di atas **main thread** (juga dikenal sebagai UI thread). Thread ini bertanggung jawab untuk menggambar UI dan merespons interaksi pengguna. Jika main thread diblokir oleh operasi yang memakan waktu lama (misalnya query database, request jaringan, atau pemrosesan file besar), aplikasi akan **berhenti merespons** dan sistem Android akan menampilkan dialog **"Application Not Responding" (ANR)** setelah 5 detik.
> >
> > Operasi yang dikategorikan sebagai **long-running tasks** dan harus dijalankan di luar main thread:
> >
> > - Permintaan jaringan (HTTP/REST API calls)
> > - Operasi baca/tulis database
> > - Pemrosesan file besar (gambar, video, CSV)
> > - Komputasi intensif
> >
> > Pendekatan tradisional untuk menangani ini adalah menggunakan **Thread** Java secara manual atau **callback**, namun keduanya memiliki kekurangan: Thread manual sulit dikelola dan callback menciptakan "callback hell" (nested callback yang sulit dibaca dan di-debug).
> >
> > ### Kotlin Coroutines
> >
> > **Kotlin Coroutines** adalah solusi yang direkomendasikan Google untuk pemrograman asinkron di Android. Coroutine adalah **blok kode yang dapat di-suspend dan di-resume** tanpa memblokir thread yang menjalankannya. Keunggulan utama coroutine dibanding pendekatan lain:
> >
> > - **Lightweight**: Ribuan coroutine dapat berjalan bersamaan tanpa overhead yang signifikan, karena coroutine bukan thread — mereka dijalankan di atas thread pool yang jauh lebih kecil
> > - **Fewer memory leaks**: Coroutines mendukung **structured concurrency** — coroutine anak selalu selesai sebelum coroutine induknya, mengurangi risiko memory leak
> > - **Built-in cancellation support**: Pembatalan dapat dipropagasi secara otomatis ke seluruh hierarki coroutine
> > - **Kode lebih bersih**: Kode asinkron ditulis seperti kode sekuensial biasa tanpa callback berlapis
> >
> > ### Suspend Functions
> >
> > Fungsi yang dapat di-suspend ditandai dengan kata kunci `suspend`. Sebuah **suspend function** dapat menangguhkan eksekusi coroutine yang memanggilnya tanpa memblokir thread, lalu melanjutkannya kembali saat hasilnya siap:
> >
> > ```kotlin
> > suspend fun fetchUserData(): User {
> >     return withContext(Dispatchers.IO) {
> >         // Operasi jaringan — tidak memblokir main thread
> >         apiService.getUser()
> >     }
> > }
> > ```
> >
> > Suspend function hanya dapat dipanggil dari dalam coroutine atau suspend function lain.
> >
> > ### Coroutine Dispatchers
> >
> > **Dispatcher** menentukan thread atau thread pool mana yang akan digunakan coroutine untuk menjalankan kodenya:
> >
> > ```mermaid
> > flowchart LR
> >     D["Coroutine Dispatchers"]
> >     MAIN["Dispatchers.Main\nUI thread\nUpdate UI, interaksi LiveData"]
> >     IO["Dispatchers.IO\nThread pool I/O\nDatabase, jaringan, file"]
> >     DEF["Dispatchers.Default\nThread pool CPU\nSorting, parsing JSON"]
> >     D --> MAIN
> >     D --> IO
> >     D --> DEF
> > ```
> >
> > - **`Dispatchers.Main`**: Menjalankan coroutine di main thread. Digunakan untuk operasi yang menyentuh UI, seperti mengupdate `LiveData` atau memanipulasi View
> > - **`Dispatchers.IO`**: Dioptimalkan untuk operasi I/O yang banyak menunggu (blocking I/O). Menggunakan thread pool dengan jumlah thread yang besar. Cocok untuk operasi database Room dan HTTP request
> > - **`Dispatchers.Default`**: Dioptimalkan untuk pekerjaan intensif CPU. Menggunakan thread pool dengan jumlah thread sebanyak jumlah core CPU. Cocok untuk pengurutan list besar atau parsing data
> >
> > ### withContext untuk Perpindahan Dispatcher
> >
> > Fungsi **`withContext(dispatcher)`** digunakan untuk menjalankan blok kode tertentu pada dispatcher yang berbeda, lalu secara otomatis kembali ke dispatcher semula setelah blok selesai:
> >
> > ```kotlin
> > suspend fun insertData(word: Word) {
> >     withContext(Dispatchers.IO) {
> >         // Blok ini berjalan di IO thread pool
> >         wordDao.insert(word)
> >     }
> >     // Kembali ke dispatcher semula setelah blok selesai
> > }
> > ```
> >
> > Pola ini sangat umum: coroutine dimulai di `Main`, berpindah ke `IO` untuk operasi database/jaringan, lalu hasil kembali diproses di `Main` untuk dirender ke UI.
> >
> > ### CoroutineScope dan viewModelScope
> >
> > **CoroutineScope** mendefinisikan batas hidup sekumpulan coroutine. Saat scope dibatalkan, semua coroutine di dalamnya otomatis dibatalkan juga. Beberapa scope yang tersedia:
> >
> > - **`GlobalScope`**: Coroutine hidup selama aplikasi berjalan. Umumnya **tidak direkomendasikan** karena dapat menyebabkan memory leak
> > - **`viewModelScope`**: Scope yang terikat ke lifecycle ViewModel. Coroutine otomatis dibatalkan saat ViewModel di-clear (Activity/Fragment destroyed). Ini adalah scope yang **paling direkomendasikan** untuk operasi yang dipicu dari UI
> > - **`lifecycleScope`**: Scope yang terikat ke lifecycle Activity/Fragment. Otomatis dibatalkan saat owner destroyed
> >
> > Contoh penggunaan `viewModelScope` dengan Room:
> >
> > ```kotlin
> > class WordViewModel(private val repository: WordRepository) : ViewModel() {
> >
> >     val allWords: LiveData<List<Word>> = repository.allWords.asLiveData()
> >
> >     fun insert(word: Word) = viewModelScope.launch {
> >         repository.insert(word)
> >     }
> > }
> > ```
> >
> > ### launch vs async
> >
> > Terdapat dua builder utama untuk memulai coroutine baru dalam sebuah scope:
> >
> > - **`launch`**: Memulai coroutine yang menjalankan pekerjaan tanpa mengembalikan hasil. Mengembalikan objek `Job` yang dapat digunakan untuk membatalkan coroutine. Cocok untuk operasi fire-and-forget seperti insert ke database
> > - **`async`**: Memulai coroutine yang mengembalikan hasil. Mengembalikan objek `Deferred<T>` yang hasilnya diambil dengan memanggil `.await()`. Cocok saat dua operasi perlu dijalankan secara paralel dan hasilnya digabungkan

> [!cornell] #### Summary
>
> **Kotlin Coroutines** mengatasi masalah pemblokiran main thread (yang menyebabkan ANR) dengan menyediakan blok kode yang dapat di-suspend dan di-resume secara efisien. Tiga **Dispatcher** utama mengontrol thread eksekusi: **Main** untuk UI, **IO** untuk operasi database dan jaringan, dan **Default** untuk komputasi CPU. Fungsi **`withContext()`** digunakan untuk berpindah dispatcher di tengah coroutine. **`viewModelScope`** adalah scope yang direkomendasikan karena terikat ke lifecycle ViewModel dan otomatis membatalkan semua coroutine saat ViewModel destroyed. Builder **`launch`** digunakan untuk operasi tanpa nilai kembalian, sementara **`async`** digunakan untuk operasi paralel yang menghasilkan nilai via `.await()`.

> [!ad-libitum]- Additional Information
>
> #### Structured Concurrency secara Mendalam
>
> Prinsip **structured concurrency** memastikan bahwa coroutine tidak dapat "bocor" keluar dari scope-nya. Ini berarti:
>
> 1. Jika sebuah coroutine induk dibatalkan, semua coroutine anak ikut dibatalkan
> 2. Jika sebuah coroutine anak gagal dengan exception, exception tersebut dipropagasi ke induknya
> 3. Coroutine induk tidak selesai sampai semua coroutine anaknya selesai
>
> Ini berbeda dengan Thread Java biasa yang dapat terus berjalan meskipun yang membuatnya sudah tidak ada.
>
> #### Exception Handling di Coroutines
>
> Exception di dalam `launch` akan menyebabkan Job-nya gagal dan dapat di-handle dengan `CoroutineExceptionHandler`:
>
> ```kotlin
> val handler = CoroutineExceptionHandler { _, exception ->
>     Log.e("Coroutine", "Error: ${exception.message}")
> }
>
> viewModelScope.launch(handler) {
>     repository.riskyOperation()
> }
> ```
>
> Untuk `async`, exception tidak langsung dilempar — ia disimpan di `Deferred` dan baru dilempar saat `.await()` dipanggil, sehingga `try-catch` di sekitar `.await()` adalah cara penanganan yang tepat.
>
> #### Flow vs LiveData
>
> Room mendukung pengembalian **`Flow<T>`** dari DAO. Berbeda dengan `LiveData`, `Flow` adalah pure Kotlin (tidak bergantung pada Android framework), sehingga lebih mudah diuji. Konversi dari `Flow` ke `LiveData` dapat dilakukan dengan ekstensi `.asLiveData()` dari library `lifecycle-livedata-ktx`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bandingkan performa secara visual: buat tombol yang menjalankan operasi berat (sorting 100.000 elemen) langsung di main thread vs di `Dispatchers.Default`, amati perbedaan responsivitas UI
> 2. Implementasikan dua network call paralel menggunakan `async`/`await` dan bandingkan waktunya dengan eksekusi sekuensial menggunakan `withContext`
> 3. Uji pembatalan coroutine: batalkan `viewModelScope` secara manual dan verifikasi bahwa operasi yang sedang berjalan berhenti
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Kotlin: "Coroutines guide"
> - Android Developer Guide: "Kotlin coroutines on Android"
> - Codelab: "Use Kotlin Coroutines in your Android App"
> - Blog: "Coroutines & Patterns for work that shouldn't be cancelled" (Android Developers)
