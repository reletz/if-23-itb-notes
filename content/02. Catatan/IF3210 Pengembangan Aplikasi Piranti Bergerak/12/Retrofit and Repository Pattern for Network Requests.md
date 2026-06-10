---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Retrofit and Repository Pattern for Network Requests
>
> > ## Questions/Cues
> >
> > - Apa perbedaan antara HttpsURLConnection, Retrofit, dan Volley?
> > - Bagaimana Retrofit mengubah HTTP API menjadi interface Kotlin?
> > - Apa peran Moshi dalam alur permintaan jaringan?
> > - Mengapa Repository pattern penting sebagai abstraksi sumber data?
> > - Bagaimana ViewModel dan SavedStateHandle membantu menangani perubahan konfigurasi?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 9-15)
>
> > ### Pilihan HTTP Client di Android
> >
> > Android menyediakan beberapa opsi untuk melakukan HTTP request, masing-masing dengan kelebihan dan kasus penggunaan yang berbeda:
> >
> > - **`HttpsURLConnection`** — klien HTTP bawaan Android yang mendukung TLS/SSL. Tidak memerlukan dependensi tambahan, tetapi penulisan kodenya lebih verbose dan membutuhkan penanganan koneksi, stream, dan parsing secara manual
> > - **Retrofit** — library jaringan yang mengubah HTTP API menjadi interface Kotlin. Dibangun di atas OkHttp yang mendukung HTTP/2, connection pooling, dan response caching. Sangat direkomendasikan untuk aplikasi yang berinteraksi dengan REST API
> > - **Volley** — library yang dikembangkan Google, cocok untuk request HTTP sederhana dan pengunduhan gambar, tetapi kurang fleksibel dibanding Retrofit untuk use case modern
> >
> > ### Retrofit: HTTP API sebagai Interface Kotlin
> >
> > **Retrofit** mengabstraksikan kompleksitas HTTP dengan cara yang elegan: developer mendefinisikan endpoint API sebagai **interface Kotlin**, dan Retrofit secara otomatis menghasilkan implementasinya saat runtime.
> >
> > Dependensi Gradle yang dibutuhkan:
> >
> > ```kotlin
> > // build.gradle.kts
> > dependencies {
> >     implementation("com.squareup.retrofit2:retrofit:2.x.x")
> >     implementation("com.squareup.retrofit2:converter-moshi:2.x.x")
> >     implementation("com.squareup.moshi:moshi:1.x.x")
> >     implementation("com.squareup.moshi:moshi-kotlin:1.x.x")
> > }
> > ```
> >
> > Contoh definisi service interface dengan Retrofit:
> >
> > ```kotlin
> > interface UserService {
> >     @GET("users/{id}")
> >     suspend fun getUser(@Path("id") userId: Int): User
> > }
> > ```
> >
> > Inisialisasi instance Retrofit dilakukan sekali dan digunakan ulang:
> >
> > ```kotlin
> > val retrofit = Retrofit.Builder()
> >     .baseUrl("https://api.example.com/")
> >     .addConverterFactory(MoshiConverterFactory.create())
> >     .build()
> >
> > val userService = retrofit.create(UserService::class.java)
> > ```
> >
> > Retrofit dibangun di atas **OkHttp** yang menyediakan fitur-fitur penting: dukungan **HTTP/2** (multiplexing koneksi), **connection pooling** (penggunaan ulang koneksi TCP), dan **response caching** (menghindari request duplikat yang tidak perlu).
> >
> > ### Moshi: Parsing JSON ke Objek Kotlin
> >
> > **Moshi** adalah library JSON modern dari Square yang dirancang khusus untuk Kotlin. Perannya dalam alur jaringan adalah mengkonversi JSON yang diterima dari server menjadi objek data Kotlin (dan sebaliknya).
> >
> > Untuk integrasi dengan Kotlin, Moshi menggunakan **`KotlinJsonAdapterFactory`** agar dapat memproses fitur bahasa Kotlin seperti parameter default dan nullability secara tepat:
> >
> > ```kotlin
> > private val moshi = Moshi.Builder()
> >     .add(KotlinJsonAdapterFactory())
> >     .build()
> > ```
> >
> > Data class yang akan di-parse harus dianotasi dengan `@JsonClass`:
> >
> > ```kotlin
> > @JsonClass(generateAdapter = true)
> > data class User(
> >     val id: Int,
> >     val name: String,
> >     val email: String
> > )
> > ```
> >
> > Moshi dikonfigurasi sebagai `ConverterFactory` saat membangun instance Retrofit, sehingga konversi JSON-ke-objek terjadi secara otomatis.
> >
> > ### Repository Design Pattern
> >
> > **Repository pattern** adalah pola arsitektur yang menempatkan sebuah kelas sebagai satu-satunya sumber kebenaran (single source of truth) untuk data tertentu. Repository bertanggung jawab untuk:
> >
> > - Mengorkestrasi operasi data dari berbagai sumber (jaringan, database lokal, cache)
> > - Menyembunyikan detail implementasi pengambilan data dari lapisan UI dan ViewModel
> > - Menyediakan API yang bersih sehingga ViewModel tidak perlu tahu apakah data berasal dari jaringan atau cache lokal
> >
> > ```kotlin
> > class UserRepository(private val userService: UserService) {
> >     suspend fun getUser(id: Int): User {
> >         return userService.getUser(id)
> >     }
> > }
> > ```
> >
> > ### Alur Data End-to-End
> >
> > Berikut alur lengkap dari permintaan data pengguna hingga ditampilkan di UI:
> >
> > ```mermaid
> > flowchart TD
> >     A["App UI</br>(Fragment/Activity)"] -->|"observe LiveData"| B["ViewModel"]
> >     B -->|"memanggil"| C["Repository"]
> >     C -->|"HTTP Request"| D["Retrofit</br>Service"]
> >     D -->|"via OkHttp"| E["Server</br>(REST API)"]
> >     E -->|"HTTP Response</br>(JSON)"| D
> >     D -->|"MoshiConverter</br>parsing"| C
> >     C -->|"objek Kotlin"| B
> >     B -->|"update LiveData"| A
> > ```
> >
> > Setiap lapisan memiliki tanggung jawab yang jelas: **UI** hanya mengamati dan menampilkan data; **ViewModel** mengelola state dan logika bisnis presentasi; **Repository** mengorkestrasi sumber data; **Retrofit** menangani komunikasi HTTP; **Moshi** menangani serialisasi/deserialisasi JSON.
> >
> > ### Mempertahankan Data Saat Perubahan Konfigurasi
> >
> > Perubahan konfigurasi seperti rotasi layar akan menghancurkan dan membuat ulang Activity/Fragment. Untuk mempertahankan data yang sudah di-fetch dari jaringan, gunakan **ViewModel** yang bertahan selama siklus hidup Activity. Untuk mempertahankan state input pengguna yang sederhana (misalnya ID yang sedang dilihat), gunakan **`SavedStateHandle`** di dalam ViewModel:
> >
> > ```kotlin
> > class UserViewModel(
> >     private val savedStateHandle: SavedStateHandle,
> >     private val repository: UserRepository
> > ) : ViewModel() {
> >     val userId = savedStateHandle.getStateFlow("userId", 0)
> > }
> > ```

> [!cornell] #### Summary
>
> Android menyediakan tiga opsi HTTP client utama: **`HttpsURLConnection`** (bawaan), **Retrofit** (antarmuka berbasis interface, direkomendasikan), dan **Volley** (untuk use case sederhana). Retrofit mengubah HTTP API menjadi interface Kotlin dengan anotasi seperti `@GET`, dibangun di atas **OkHttp** dengan dukungan HTTP/2 dan connection pooling. **Moshi** menangani konversi JSON ke objek Kotlin secara otomatis sebagai `ConverterFactory`. **Repository pattern** mengabstraksikan sumber data sehingga ViewModel mendapat API yang bersih tanpa perlu tahu detail implementasi. Seluruh alur data mengalir: UI → ViewModel → Repository → Retrofit → Server, lalu kembali melalui Moshi. **SavedStateHandle** menjaga state penting tetap ada saat terjadi perubahan konfigurasi.

> [!ad-libitum]- Additional Information
>
> #### Menambahkan Interceptor OkHttp untuk Logging
>
> Selama development, sangat berguna untuk melihat raw HTTP request dan response. Tambahkan `HttpLoggingInterceptor` dari OkHttp:
>
> ```kotlin
> val logging = HttpLoggingInterceptor().apply {
>     level = HttpLoggingInterceptor.Level.BODY
> }
>
> val okHttpClient = OkHttpClient.Builder()
>     .addInterceptor(logging)
>     .build()
>
> val retrofit = Retrofit.Builder()
>     .baseUrl("https://api.example.com/")
>     .client(okHttpClient)
>     .addConverterFactory(MoshiConverterFactory.create())
>     .build()
> ```
>
> #### Error Handling dengan Retrofit
>
> Selalu tangani kemungkinan kegagalan jaringan menggunakan try-catch di dalam coroutine:
>
> ```kotlin
> class UserRepository(private val userService: UserService) {
>     suspend fun getUser(id: Int): Result<User> {
>         return try {
>             Result.success(userService.getUser(id))
>         } catch (e: IOException) {
>             Result.failure(e) // Masalah jaringan
>         } catch (e: HttpException) {
>             Result.failure(e) // Respons HTTP error (4xx, 5xx)
>         }
>     }
> }
> ```
>
> #### Dependency Injection untuk Repository
>
> Di aplikasi yang lebih besar, gunakan dependency injection (Hilt/Dagger) untuk menyediakan instance Repository ke ViewModel tanpa membuat dependensi secara manual. Hilt menyederhanakan boilerplate secara signifikan:
>
> ```kotlin
> @HiltViewModel
> class UserViewModel @Inject constructor(
>     private val repository: UserRepository
> ) : ViewModel()
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi yang mengonsumsi public REST API (misalnya JSONPlaceholder) menggunakan Retrofit + Moshi, dan tampilkan hasilnya di RecyclerView
> 2. Implementasikan Repository pattern dengan dua sumber data: jaringan (Retrofit) dan cache lokal (Room), serta logika untuk memutuskan kapan menggunakan masing-masing
> 3. Tambahkan error handling yang robust dan tampilkan pesan error yang informatif ke pengguna saat koneksi gagal
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Retrofit: square.github.io/retrofit
> - Dokumentasi Resmi Moshi: github.com/square/moshi
> - Android Developer Guide: "Fetch data from the network"
> - Android Developer Guide: "Guide to app architecture" (Repository layer)
> - Codelab: "Android Kotlin Fundamentals: Internet data"
