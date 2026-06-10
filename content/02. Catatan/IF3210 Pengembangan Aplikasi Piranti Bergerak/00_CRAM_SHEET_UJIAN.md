# Panduan Belajar Darurat Ujian IF3210: Pengembangan Aplikasi Piranti Bergerak


## 🟢 0. Prasyarat Wajib: Fundamental Kotlin
*Pahami ini dulu agar kamu bisa membaca kode Android di soal ujian.*

1. **[HARD] Null Safety (`?`, `?.`, `?:`, `!!`)**
   *   `String?` = Boleh null. `String` = Tidak boleh null.
   *   `?.` (Safe call): Hanya jalankan jika tidak null. `user?.name`
   *   `?:` (Elvis operator): Beri default jika null. `val p = name ?: "Anonim"`
   *   `!!` (Assertion): Memaksa compiler percaya ini tidak null. **Bahaya: Kalau ternyata null, aplikasi CRASH (NPE).**
   ```kotlin
   var name: String? = "John"
   val length1 = name?.length // Return 4 (karena name tidak null)
   name = null
   val length2 = name?.length ?: 0 // Return 0 (karena name null, pakai nilai default)
   // val lengthCrash = name!!.length // 💥 CRASH! NullPointerException
   ```
2. **[HARD] Coroutines (Dasar)**
   *   Fungsi dengan awalan `suspend` adalah fungsi yang memakan waktu (network/DB) dan bisa ditangguhkan tanpa memblokir thread.
   *   Hanya bisa dipanggil dari dalam coroutine (`launch`, `async`) atau `suspend` function lainnya.
   ```kotlin
   suspend fun fetchData(): String {
       delay(1000) // pura-puranya simulasi network 1 detik
       return "Data loaded"
   }
   
   // Panggil fungsi suspend dari dalam coroutine scope (misal di ViewModel)
   viewModelScope.launch {
       val data = fetchData()
       println(data)
   }
   ```
3. **[MEDIUM] Trailing Lambdas**
   *   Jika parameter fungsi terakhir adalah fungsi (lambda), tulis kurung kurawalnya `{}` di luar tanda kurung `()`. Ini sangat sering dipakai di Jetpack Compose:
   ```kotlin
   // Definisi Fungsi
   fun performAction(id: Int, callback: (Boolean) -> Unit) { /* ... */ }
   
   // Pemanggilan normal
   performAction(1, { success -> println(success) })
   
   // Pemanggilan dengan Trailing Lambda (Lebih sering dipakai, direkomendasikan)
   performAction(1) { success -> 
       println(success) 
   }
   
   // Contoh paling sering di Compose
   Button(onClick = { /* aksi klik */ }) { 
       Text("Klik Aku") // lambda ditaruh di luar kurung
   }
   ```
4. **[EASY] Data Class & Companion Object**
   *   `data class User(...)`: Otomatis buatkan `toString()`, `equals()`, dan setter-getter.
   *   `companion object`: Pengganti `static` di Java. Milik kelas, bukan instance.
   ```kotlin
   // Otomatis punya copy(), equals(), toString()
   data class User(val id: Int, val name: String)
   
   class ApiConfig {
       companion object {
           const val BASE_URL = "https://api.example.com"
           fun build() { /* ... */ }
       }
   }
   // Pemanggilan:
   val url = ApiConfig.BASE_URL 
   ApiConfig.build()
   ```
5. **[EASY] Variabel (`val` vs `var`)**
   *   `val` (Value) = Read-only / Tidak bisa diubah (mirip `final`).
   *   `var` (Variable) = Bisa diubah.
   ```kotlin
   val phi = 3.14
   // phi = 3.14159 // ❌ Error compile: val cannot be reassigned
   
   var count = 0
   count = 1 // ✅ Boleh diubah
   ```

---

## 🔵 0.5. Prasyarat Wajib: Fundamental Dart & Flutter
*Pahami sintaks dasar ini karena Dart punya aturan unik soal null dan tipe data.*

1. **[HARD] Null-aware Operators (`??`, `??=`, `?.`, `!`)**
   *   `??` (If null): Mengembalikan nilai default jika sebelah kiri null.
   *   `??=` (Assign if null): Isi variabel HANYA jika nilainya saat ini null.
   *   `!` (Null assertion): Mirip `!!` di Kotlin. Memaksa compiler percaya tidak null (Bisa CRASH!).
   ```dart
   String? name; // Nilai awal adalah null
   print(name?.length);      // ✅ Aman, print "null"
   print(name ?? "Anonim");  // ✅ Print "Anonim" karena name null
   
   name ??= "John";          // ✅ name sekarang diisi "John" karena tadinya null
   name ??= "Budi";          // ❌ name TETAP "John", karena sudah tidak null!
   
   // print(name!.length);   // 💥 CRASH runtime kalau name beneran null!
   ```
2. **[MEDIUM] Arrow Functions & Anonymous Functions**
   *   Fungsi di Dart yang isinya cuma 1 baris (mengembalikan nilai) sangat sering disingkat pakai `=>` (Arrow function).
   *   `=> expr` artinya sama persis dengan `{ return expr; }`.
   ```dart
   // Fungsi Normal
   int add(int a, int b) { return a + b; }
   
   // Arrow Function (Sering dipakai di build() Flutter)
   int add(int a, int b) => a + b;
   
   // Anonymous function (Lambda) di dalam list method
   var doubled = [1, 2, 3].map((n) => n * 2).toList();
   ```
3. **[EASY] Type Check & Casting (`is`, `as`)**
   *   `is`: Mengecek apakah variabel adalah tipe data tertentu.
   *   `as`: Memaksa konversi (casting) dari parent class ke child class.
   ```dart
   Object obj = "Hello";
   
   // Mengecek tipe data
   if (obj is String) {
       print("Ini String, panjangnya: ${obj.length}"); 
   }
   
   // Memaksa konversi (Casting)
   String text = obj as String; 
   ```
4. **[EASY] Named Parameters (`{}`)**
   *   Parameter yang dibungkus `{}` sifatnya bernama. Saat dipanggil, **wajib** menyebutkan namanya, dan **boleh dibolak-balik urutannya**.
   *   Pakai `required` jika wajib diisi. Jika tidak `required`, wajib diberi default value.
   ```dart
   // Deklarasi fungsi
   void setBox({required int width, int height = 10}) { 
       print("W: $width, H: $height"); 
   }
   
   // Pemanggilan fungsi (Bisa dibolak-balik urutannya!)
   setBox(height: 20, width: 50); 
   setBox(width: 30); // height otomatis ikut default = 10
   ```

---

## 🚀 1. Bab 15: Jetpack Compose (Paradigma Baru UI)
**Keywords:** *Declarative UI, @Composable, Recomposition, Modifier, State Hoisting, remember, Side Effects*

1. **[HARD] State & Recomposition**
   *   **Recomposition**: Compose otomatis merender ulang *hanya* fungsi yang membaca state yang berubah.
   *   `remember { mutableStateOf() }`: Menyimpan state saat recomposition agar tidak ter-reset.
   *   `rememberSaveable`: Seperti `remember`, tapi nilainya **tidak hilang saat layar dirotasi** (disimpan via Bundle).
   *   **State Hoisting**: Memindahkan state ke atas (parent), dan passing state ke bawah sebagai parameter nilai & callback (membuat composable jadi *stateless* dan reusable).
   ```kotlin
   @Composable
   fun Counter() {
       // State akan selamat dari recomposition & rotasi layar
       var count by rememberSaveable { mutableStateOf(0) }
       Button(onClick = { count++ }) { Text("Count: $count") }
   }
   ```
2. **[HARD] Side Effects (Efek Samping)**
   *   Fungsi Compose harus bebas efek samping. Jika butuh memanggil API atau timer:
   *   `LaunchedEffect(key)`: Jalankan coroutine (misal fetch data) saat pertama kali Compose muncul.
   *   `DisposableEffect(key)`: Untuk listener/observer yang butuh dibersihkan (`onDispose`) saat Compose hancur.
   *   `rememberCoroutineScope()`: Untuk meluncurkan aksi dari event (misal saat tombol diklik).
   ```kotlin
   LaunchedEffect(Unit) { // Jalan 1x saat pertama kali muncul
       delay(2000) // pura-puranya load API
       println("Selesai")
   }
   ```
3. **[MEDIUM] Urutan Modifier**
   *   `Modifier.padding(8.dp).background(Color.Red)` **BERBEDA** dengan `Modifier.background(Color.Red).padding(8.dp)`. Efek diterapkan berurutan dari kiri ke kanan/atas ke bawah.
   ```kotlin
   // Padding LUAR (margin), lalu background, lalu padding DALAM
   Modifier.padding(16.dp).background(Color.Blue).padding(8.dp)
   ```
4. **[MEDIUM] Deklaratif vs Imperatif**
   *   **Imperatif (XML/Lama)**: Kita mengatur state UI secara manual (`textView.setText()`).
   *   **Deklaratif (Compose)**: UI adalah fungsi dari State. State berubah $\rightarrow$ UI otomatis ikut berubah.
5. **[EASY] Interoperabilitas**
   *   `ComposeView`: Memakai Compose di dalam layout XML lama.
   *   `AndroidView`: Memakai UI tradisional (seperti `WebView` atau `MapView`) di dalam Compose.

---

## 🛠️ 2. Bab 11: Android Services & Background Tasks
**Keywords:** *Main Thread, Started vs Bound vs Foreground, IntentService, BroadcastReceiver, Notification*

1. **[HARD] Konsep Service & Main Thread**
   *   **Jebakan Ujian:** Service secara default berjalan di **MAIN THREAD**. Melakukan proses berat (download/DB) di Service tanpa bikin thread baru akan bikin aplikasi **ANR (Application Not Responding)**.
2. **[HARD] 3 Jenis Service**
   *   **Started Service**: Dijalankan (`startService`), jalan terus di belakang sampai dipanggil `stopSelf()`. (Fire-and-forget).
   *   **Bound Service**: Hubungan Client-Server (`bindService`). Mengembalikan `IBinder` via `onBind()`. Hancur otomatis jika semua client unbind.
   *   **Foreground Service**: Untuk tugas yang disadari pengguna (music player). **Wajib** punya *persistent notification* (notif yang tidak bisa di-swipe tutup). Prioritasnya dijaga agar tidak dimatikan OS.
   ```kotlin
   // Cara mulai Started Service biasa
   val intent = Intent(this, MyService::class.java)
   startService(intent) // Di-stop oleh Service dengan stopSelf()
   ```
3. **[MEDIUM] WorkManager & IntentService**
   *   `IntentService` (deprecated): Otomatis bikin worker thread sendiri, ngerjain task berurutan, langsung hancur kalau selesai.
   *   `WorkManager` (Modern): Solusi background task masa kini. Bisa pakai constraint (contoh: "hanya jalan kalau ada Wi-Fi").
4. **[EASY] Broadcast & Content Provider**
   *   **Broadcast Receiver**: Menangkap pesan global (baterai low, internet nyala). Bisa Static (via Manifest) atau Dynamic (via kode).
   *   **Content Provider**: Cara share data antar aplikasi dengan aman via URI `content://`.
   ```kotlin
   // Mendaftarkan receiver secara dinamis di kode
   val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
   registerReceiver(receiver, filter)
   // Ingat: WAJIB panggil unregisterReceiver(receiver) di onDestroy()!
   ```

---

## 💾 3. Bab 10: Room Database & Coroutines
**Keywords:** *@Entity, @Dao, @Database, Dispatchers, viewModelScope, @Volatile*

1. **[HARD] Dispatchers & Scopes pada Coroutine**
   *   `Dispatchers.Main`: Khusus untuk UI update.
   *   `Dispatchers.IO`: Khusus input/output seperti panggil Room Database & Retrofit (network).
   *   `Dispatchers.Default`: Khusus komputasi berat CPU (sorting 10.000 data).
   *   `viewModelScope.launch { ... }`: Kalau ViewModel mati (Activity pindah), coroutine otomatis dibatalkan agar tidak *memory leak*.
   ```kotlin
   viewModelScope.launch(Dispatchers.Main) { // Mulai di Main Thread
       // Pindah ke thread IO sebentar buat panggil DB
       val data = withContext(Dispatchers.IO) { myDao.getAll() } 
       // Kembali ke Main Thread, update UI!
   }
   ```
2. **[MEDIUM] Database Singleton & Keamanan Thread**
   *   Instansiasi database itu berat, jadi hanya boleh ada **satu** (`Singleton`).
   *   `@Volatile` `INSTANCE`: Menjamin instance yang baru dibuat langsung terlihat oleh semua thread (tidak tersangkut di cache memori CPU).
   *   `synchronized(this)`: Mengunci agar kalau ada 2 thread meminta bikin DB bersamaan, cuma 1 yang boleh bikin.
   ```kotlin
   @Volatile private var INSTANCE: AppDatabase? = null
   fun getInstance(context: Context): AppDatabase {
       return INSTANCE ?: synchronized(this) { // Lock!
           INSTANCE ?: Room.databaseBuilder(...).build().also { INSTANCE = it }
       }
   }
   ```
3. **[EASY] 3 Komponen Room**
   *   `@Entity`: Representasi tabel (Data Class). Pakai `@PrimaryKey(autoGenerate = true)`.
   *   `@Dao`: Interface untuk naruh SQL Query (`@Query("SELECT *...")`, `@Insert`).
   *   `@Database`: Kelas abstract penyambung DAO dan Entity.
   ```kotlin
   @Entity(tableName = "users")
   data class User(@PrimaryKey(autoGenerate = true) val id: Int, val name: String)
   
   @Dao
   interface UserDao {
       @Query("SELECT * FROM users")
       suspend fun getAll(): List<User> // HARUS suspend function!
   }
   ```

---

## 🌀 4. Bab 9: Android Lifecycle & Komponen
**Keywords:** *onCreate, onResume, onPause, onStop, Bundle, Fragment, Launch Modes*

1. **[WAJIB HAFAL] Alur Lifecycle Activity & Fragment**
   *   **Activity:** `onCreate` (Inisialisasi) $\rightarrow$ `onStart` (Mulai terlihat) $\rightarrow$ `onResume` (Fokus & bisa disentuh) $\rightarrow$ **[RUNNING]** $\rightarrow$ `onPause` (Kehilangan fokus sebagian) $\rightarrow$ `onStop` (Layar tertutup total) $\rightarrow$ `onDestroy` (Dihancurkan).
   *   **Fragment:** `onAttach` $\rightarrow$ `onCreate` $\rightarrow$ `onCreateView` (Buat UI) $\rightarrow$ `onViewCreated` (UI siap) $\rightarrow$ `onStart` $\rightarrow$ `onResume` $\rightarrow$ **[RUNNING]** $\rightarrow$ `onPause` $\rightarrow$ `onStop` $\rightarrow$ `onDestroyView` $\rightarrow$ `onDestroy` $\rightarrow$ `onDetach`.
2. **[HARD] Launch Modes (Task & Back Stack)**
   *   `standard`: Normal, bisa numpuk duplikat.
   *   `singleTop`: Kalau Activity itu lagi di pucuk layar, jangan buat baru, tapi panggil `onNewIntent()`.
   *   `singleTask`: Kalau Activity sudah ada di mana pun di stack, hancurkan semua Activity di atasnya agar ia pindah ke paling atas.
   *   `singleInstance`: Activity ini sombong, dia bikin Task baru dan cuma dia satu-satunya penghuni Task itu.
   ```xml
   <!-- Didefinisikan di AndroidManifest.xml -->
   <activity android:name=".MyActivity" android:launchMode="singleTop" />
   ```
2. **[MEDIUM] Activity Lifecycle (`onPause` vs `onStop`)**
   *   `onPause()`: Kehilangan fokus tapi masih terlihat sebagian (misal ada dialog numpang di atasnya). Kerja di sini harus super ringan!
   *   `onStop()`: Layar hilang total dari pandangan user. Di sini tempat terbaik matikan GPS, stop animasi, dan simpan kerjaan.
   *   `onDestroy()`: Activity dihancurkan (bisa karena rotasi layar).
3. **[MEDIUM] Menyimpan State saat Rotasi Layar**
   *   Gunakan `onSaveInstanceState(outState: Bundle)`.
   ```kotlin
   override fun onSaveInstanceState(outState: Bundle) {
       outState.putString("KEY_SCORE", score)
       super.onSaveInstanceState(outState) // Wajib dipanggil
   }
   ```
4. **[EASY] Fragment Lifecycle**
   *   Beda utama: `onCreateView()` meng-inflate layout, sedangkan `onViewCreated()` dipakai untuk setup logika UI agar lebih aman (view sudah pasti ada).

---

## 🐦 5. Bab 13: Dart & Flutter
**Keywords:** *final vs const, Canonicalization, Sound Null Safety, late, StatefulWidget Lifecycle*

1. **[HARD] final vs const & Canonicalization**
   *   `final`: Nilai dievaluasi saat **runtime** (bisa dari hasil API/DB) & tidak bisa diganti.
   *   `const`: Nilai pasti saat **compile-time**. 
   *   *Kenapa penting di Flutter?* Flutter punya *Canonicalization*: Objek `const` yang sama hanya dibikin **1x di memori**. Flutter tahu widget `const` tidak mungkin berubah, jadi **di-skip saat rebuild** (Performa sangat cepat!).
   ```dart
   final time = DateTime.now(); // ✅ OK, dievaluasi saat runtime
   // const time = DateTime.now(); // ❌ ERROR, nilai tidak konstan
   ```
2. **[HARD] StatefulWidget Lifecycle**
   *   `createState()` $\rightarrow$ `initState()` (cuma jalan 1x buat setup) $\rightarrow$ `build()` (merender UI) $\rightarrow$ `setState()` (ngasih tahu Flutter ada data berubah, panggil `build()` lagi) $\rightarrow$ `dispose()` (matiin listener/controller, cuma 1x).
   ```dart
   void _updateUI() {
       setState(() {
           // WAJIB ditaruh dalam setState() agar trigger build() ulang
           _counter++; 
       });
   }
   ```
3. **[MEDIUM] Sound Null Safety & `late`**
   *   Di Dart 3.0, variabel secara default gak boleh null.
   *   Keyword `late`: Janji sama compiler bahwa variabel ini gak boleh null, *tapi* aku mau inisialisasi dia **nanti** (misal di `initState`), bukan sekarang.
   ```dart
   late String name; // Boleh declare tanpa inisialisasi awal
   // print(name);  // 💥 CRASH! Jika diakses sebelum diisi
   name = "Dart";    // Diinisialisasi! ✅
   ```
4. **[EASY] JIT vs AOT**
   *   **JIT (Just-In-Time)**: Waktu *Development*. Kompilasi sambil jalan. *Kenapa penting?* Memungkinkan fitur **Hot Reload** (tak perlu re-compile seluruh app, cukup suntik kode baru, UI langsung terupdate).
   *   **AOT (Ahead-Of-Time)**: Waktu *Production* (build rilis). Kode dikompilasi duluan jadi bahasa mesin ARM/x86. *Kenapa penting?* Agar aplikasi bisa langsung jalan sangat cepat (*fast startup*) dan UI stabil 60fps tanpa nge-lag saat pertama dibuka.

---

## 🔒 6. Bab 14: Mobile Security
**Keywords:** *Sandbox, Keystore, EncryptedSharedPreferences, HTTPS, Certificate Pinning*

1. **[HARD] Penyimpanan Data Sensitif & TEE (Trusted Execution Environment)**
   *   **App-Specific Internal Storage**: Paling aman. Data disimpan di `/data/data/<package>` (terisolasi/Sandbox).
   *   Untuk hal rahasia (token, password), simpan kuncinya di **Android Keystore** (mendukung TEE / Secure Element Hardware). 
   *   *Kenapa TEE tidak bisa diretas?* TEE adalah chip / area pemrosesan yang terisolasi secara **hardware** di dalam CPU (memiliki mini-OS sendiri seperti TrustZone). Walaupun OS utama (Android) sudah di-root atau kena malware parah, hacker tetap tidak bisa membaca kunci dari TEE karena terpisah secara fisik & logika.
2. **[MEDIUM] Keamanan Jaringan & SSL Pinning**
   *   Gunakan **HTTPS**, hindari HTTP.
   *   **Certificate Pinning**: Hardcode sertifikat server (public key-nya) ke dalam aplikasi. *Kenapa?* Agar aplikasi cuma mau komunikasi dengan server yang sertifikatnya persis sama. Walau hacker sukses ngakalin CA (Certificate Authority) di HP (Man-In-The-Middle attack), aplikasi tetap menolak koneksi!
3. **[EASY] Filosofi Keamanan (Prevent, Minimize, Detect)**
   *   **Prevent:** Cegah dari awal! Pakai Sandbox (tiap aplikasi beda Linux UID sehingga dilarang saling intip folder), enkripsi AES 256.
   *   **Minimize:** Minimalisir kerugian kalau kebobolan! (Prinsip *Least Privilege* = jangan minta permission lokasi kalau cuma butuh kamera).
   *   **Detect:** Deteksi bahaya! Gunakan SafetyNet (ngecek device di-root atau tidak).

---

## 🌐 7. Bab 12: Network & Connectivity
**Keywords:** *Retrofit, Repository Pattern, @GET, @Path, @Query*

1. **[HARD] Optimasi Baterai & Radio State Machine (Sering Ditanyakan!)**
   *   *Kenapa kita harus "Bundle Request" (Kirim data internet sekaligus)?* Jaringan seluler memiliki **Radio State Machine** (Standby $\rightarrow$ Active $\rightarrow$ Tail $\rightarrow$ Standby). Menyalakan antena radio itu menyedot baterai sangat besar. 
   *   Jika aplikasi kita minta data kecil-kecil tapi terus-menerus (*unbundled transfer*, misalnya 1 KB per detik selama 18 detik), antena radio tidak akan pernah masuk ke mode Standby. Antena nyangkut di state Active/Tail terus, yang bikin **baterai bocor/boros parah**.
   *   *Solusi:* Pre-fetch data sekalian banyak, dan gabungkan request (Bundle).
2. **[MEDIUM] Retrofit Interface & Coroutines**
   *   Buat request API jadi `suspend fun` agar jalan di coroutine (background).
   *   `@Path`: Ganti ID di tengah URL `users/{id}`.
   *   `@Query`: Nambah parameter search `users?name=budi`.
   ```kotlin
   interface ApiService {
       @GET("users/{userId}") // {userId} digantikan argumen @Path
       suspend fun getUser(
           @Path("userId") id: String, 
           @Query("type") type: String // Jadi -> /users/123?type=admin
       ): User
   }
   ```
3. **[EASY] Repository Pattern**
    *   Single Source of Truth. Repository tugasnya mikir data ini harus diambil dari DB lokal (Room) atau narik API baru (Retrofit). ViewModel gak perlu tahu datanya dari mana.

---

## 🔥 8. BONUS: Cheat Sheet Syntax & Code untuk Soal Ujian
*Lihat file terpisah `00_CODE_SYNTAX_NOTES.md` untuk SEMUA snippet lengkap. Di bawah ini rangkuman terpenting.*

### ⚠️ "Apa yang Salah?" - Jebakan Soal Paling Umum

| ❌ Salah | ✅ Benar | Penjelasan |
|---|---|---|
| `URL("...").readText()` di main thread | Wrap dalam `viewModelScope.launch { withContext(Dispatchers.IO) { } }` | **NetworkOnMainThreadException** |
| `fun getAll(): List<Color>` (Room DAO tanpa `suspend`) | `suspend fun getAll(): List<Color>` | Blocking main thread! |
| `var count = mutableStateOf(0)` (Compose tanpa `remember`) | `var count by remember { mutableStateOf(0) }` | State reset setiap recomposition |
| `_counter++` (Flutter tanpa `setState`) | `setState(() { _counter++; })` | UI tidak update |
| `const date = DateTime.now()` (Dart) | `final date = DateTime.now()` | `const` hanya untuk compile-time constant |
| `int b;` (Dart tanpa nullable) | `int? b;` atau `late int b;` | Dart 3.0: non-nullable by default |
| Lupa `unregisterReceiver()` di `onDestroy` | Pasangkan `register/unregister` | Memory leak |
| Service melakukan download tanpa thread baru | Buat thread/coroutine di dalam service | Service = main thread → ANR |

### 📝 Method/Syntax Yang Sering Ditanyakan

**Kotlin/Android:**
- `?.` `?:` `!!` = Null safety operators
- `by lazy { }` = Inisialisasi saat pertama kali diakses
- `viewModelScope.launch { }` = Coroutine yang auto-cancel
- `withContext(Dispatchers.IO) { }` = Pindah ke thread IO
- `LiveData.observeAsState()` = Observe LiveData di Compose
- `rememberSaveable { }` = State yang survive screen rotation
- `LaunchedEffect(key) { }` = Side effect di Compose
- `onSaveInstanceState(outState: Bundle)` = Simpan state saat rotasi

**Dart/Flutter:**
- `String?` `?.` `??` `??=` `!` = Null-aware operators
- `final` vs `const` = Runtime vs compile-time immutability
- `const Widget(...)` → Canonicalized, 1 copy, skip rebuild
- `setState(() { })` = Trigger rebuild UI
- `=>` = Arrow function (1 expression saja)
- `is` `is!` `as` = Type check & cast
- `required` = Named param wajib diisi
- `with Mixin` = Multiple inheritance
- `extension X on Type { }` = Tambah method ke class yang ada

**Room:**
- `@Entity(tableName = "...")` + `@PrimaryKey(autoGenerate = true)`
- `@Dao` → `@Query("... WHERE x = :param")`, `@Insert`, `@Update`, `@Delete`
- `@Database(entities = [...], version = N)` → `abstract class ... : RoomDatabase()`
- `@Volatile` + `synchronized(this)` + `.also { INSTANCE = it }` = Singleton pattern

**Retrofit:**
- `@GET("/path/{id}")` + `@Path("id")` = URL parameter
- `@Query("name")` = Query string `?name=value`
- `Retrofit.Builder().baseUrl("...").addConverterFactory(MoshiConverterFactory.create(moshi)).build()`

---

## 🧠 9. TEORI 'HEAVY' & STUDI KASUS (Bocoran PPT)

### A. Lifecycle & Komponen (Bab 9 & 11)
1. **onRestart() Flow:** `onRestart()` dipanggil *sebelum* `onStart()` jika Activity kembali dari state `onStop`. Jadi `onStart()` bisa dipanggil setelah `onCreate()` (awal mula) ATAU `onRestart()` (kembali).
2. **Batas Waktu BroadcastReceiver:** Method `onReceive()` HANYA PUNYA WAKTU **5 DETIK**! Lebih dari itu = ANR/Dihancurkan sistem. Jangan lakukan operasi DB/Network yang lama di sini.
3. **Kenapa pakai PendingIntent di Notifikasi?** Karena sistem Notifikasi berjalan di proses/app yang berbeda. `PendingIntent` memberikan hak kepada OS untuk mengeksekusi aksi **seolah-olah ia adalah aplikasi kamu** (membawa permission milikmu).
4. **Fragment Bundle:** Fragment bisa membaca `savedInstanceState` (Bundle) di 3 tempat: `onCreate()`, `onCreateView()`, dan `onViewCreated()`. (Sedangkan Activity cuma di `onCreate()`).

### B. Security & Network (Bab 12 & 14)
1. **OWASP Mobile Top 10 (2024):**
   *   M1: Improper Credential Usage
   *   M2: Inadequate Supply Chain Security
   *   M3: Insecure Authentication/Authorization
   *   M9: Insecure Data Storage
2. **Permission Levels:**
   *   **Normal:** Otomatis disetujui saat install (Contoh: `INTERNET`, `VIBRATE`).
   *   **Dangerous:** Harus minta izin (prompt dialog) ke user saat *runtime* (Contoh: `CAMERA`, `READ_CONTACTS`).
3. **Moshi + Retrofit Setup (Sering keluar di soal kodingan):**
   ```kotlin
   val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()
   val retrofit = Retrofit.Builder()
       .baseUrl(BASE_URL)
       .addConverterFactory(MoshiConverterFactory.create(moshi)) // Wajib pakai MoshiConverterFactory
       .build()
   ```

### C. Dart & Compose (Bab 13 & 15)
1. **Jebakan Loop Closure di Dart vs JavaScript:**
   ```dart
   var counters = <Function>[];
   for (var i = 0; i < 3; i++) { counters.add(() => i); }
   for (var c in counters) { print(c()); }
   ```
   *Output Dart:* `0`, `1`, `2`. (Dart menyimpan/meng-*capture* copy variabel untuk tiap loop. Berbeda dengan JS yang akan nge-print `3`, `3`, `3`).
2. **LazyColumn vs RecyclerView:**
   *   **RecyclerView (Lama):** Sangat ribet! Butuh buat class `Adapter`, `ViewHolder`, file XML layout terpisah, dan di-setup di Activity.
   *   **LazyColumn (Compose):** Super singkat! Cukup pakai blok `items(data) { item -> Text(item.nama) }`.
3. **Compose Modifier Ordering (Margin vs Padding):**
   *   `Modifier.padding(16.dp).background(Color.Red)` = Layar kosong (margin) 16dp, lalu kotak merah.
   *   `Modifier.background(Color.Red).padding(16.dp)` = Kotak merah yang isinya menjorok 16dp ke dalam.
4. **Observing ViewModel di Compose:**
   Wajib menggunakan *extension method* agar UI otomatis update: `val users by viewModel.allUsers.observeAsState()` (Butuh dependensi `lifecycle-viewmodel-compose`).
