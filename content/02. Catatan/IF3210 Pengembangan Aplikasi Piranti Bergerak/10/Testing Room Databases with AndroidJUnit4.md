---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Testing Room Databases with AndroidJUnit4
>
> > ## Questions/Cues
> >
> > - Mengapa in-memory database lebih disukai untuk testing dibanding database biasa?
> > - Apa fungsi anotasi `@RunWith`, `@Before`, `@After`, dan `@Test`?
> > - Bagaimana cara membuat instance database Room untuk keperluan testing?
> > - Apa yang harus diverifikasi dalam sebuah tes insert-and-retrieve?
> > - Di mana file test instrumentasi Android ditempatkan dalam struktur proyek?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 46-51)
>
> > ### Mengapa Testing Database Penting
> >
> > Database adalah komponen kritikal dalam banyak aplikasi Android — kesalahan dalam logika query atau definisi Entity dapat menyebabkan data pengguna hilang, korup, atau tidak terbaca. **Automated testing** memastikan bahwa DAO dan Entity berperilaku sesuai harapan, dan bahwa perubahan kode di masa depan tidak secara tidak sengaja merusak fungsionalitas yang sudah ada (regresi).
> >
> > Untuk menguji komponen yang bergantung pada framework Android (seperti Room yang membutuhkan `Context`), digunakan **Instrumentation Test** yang berjalan pada perangkat Android fisik atau emulator, bukan pada JVM biasa di mesin pengembang.
> >
> > ### AndroidJUnit4 dan Anotasi Testing
> >
> > **AndroidJUnit4** adalah test runner yang memungkinkan pengujian kode Android pada perangkat nyata atau emulator sambil tetap menggunakan sintaks JUnit 4 yang familiar. Test instrumentasi ditempatkan di direktori `androidTest/` (bukan `test/` yang digunakan untuk unit test murni).
> >
> > Anotasi-anotasi utama yang digunakan:
> >
> > - **`@RunWith(AndroidJUnit4::class)`**: Dideklarasikan di level kelas. Menginstruksikan JUnit untuk menggunakan AndroidJUnit4 sebagai test runner, yang mengelola siklus hidup test di lingkungan Android
> > - **`@Before`**: Metode yang dianotasi ini dijalankan **sebelum setiap** metode `@Test`. Digunakan untuk setup — membuat instance database dan DAO
> > - **`@After`**: Metode yang dianotasi ini dijalankan **setelah setiap** metode `@Test`. Digunakan untuk teardown — menutup database agar tidak ada resource leak antar test
> > - **`@Test`**: Menandai sebuah metode sebagai kasus uji. Metode ini dijalankan oleh test runner dan hasilnya (pass/fail) dicatat
> >
> > ### In-Memory Database untuk Testing
> >
> > Perbedaan kunci antara setup database untuk testing dan produksi adalah penggunaan **`Room.inMemoryDatabaseBuilder()`** alih-alih `Room.databaseBuilder()`:
> >
> > - **Database biasa** (`databaseBuilder`): Data disimpan ke file `.db` di storage perangkat dan persisten antar sesi
> > - **In-memory database** (`inMemoryDatabaseBuilder`): Data hanya ada di RAM dan **otomatis terhapus saat koneksi database ditutup**
> >
> > Keunggulan in-memory database untuk testing:
> >
> > - **Isolasi**: Setiap test mendapat database yang bersih, tidak terpengaruh oleh test lain
> > - **Kecepatan**: Operasi RAM jauh lebih cepat daripada operasi disk
> > - **Tidak meninggalkan artefak**: Tidak ada file `.db` sisa yang perlu dibersihkan setelah test selesai
> >
> > ### Struktur Test Class
> >
> > Berikut adalah struktur lengkap kelas test untuk Room DAO:
> >
> > ```kotlin
> > @RunWith(AndroidJUnit4::class)
> > class WordDaoTest {
> >
> >     private lateinit var wordDao: WordDao
> >     private lateinit var db: WordRoomDatabase
> >
> >     @Before
> >     fun createDb() {
> >         val context = ApplicationProvider.getApplicationContext<Context>()
> >         db = Room.inMemoryDatabaseBuilder(context, WordRoomDatabase::class.java)
> >             .allowMainThreadQueries()
> >             .build()
> >         wordDao = db.wordDao()
> >     }
> >
> >     @After
> >     fun closeDb() {
> >         db.close()
> >     }
> >
> >     @Test
> >     @Throws(Exception::class)
> >     fun insertAndGetWord() {
> >         val word = Word(word = "hello")
> >         wordDao.insert(word)
> >         val allWords = wordDao.getAlphabetizedWords().first()
> >         assertEquals(allWords[0].word, word.word)
> >     }
> > }
> > ```
> >
> > Beberapa poin penting dari kode di atas:
> >
> > - **`ApplicationProvider.getApplicationContext()`**: Menyediakan `Context` Android yang valid di dalam test instrumentasi tanpa perlu Activity
> > - **`.allowMainThreadQueries()`**: Opsi khusus untuk testing yang memperbolehkan operasi database di main thread. Ini **tidak boleh** digunakan di kode produksi, hanya untuk menyederhanakan kode test
> > - **`assertEquals`**: Fungsi JUnit untuk memverifikasi bahwa nilai aktual sama dengan nilai yang diharapkan. Test gagal jika nilainya berbeda
> >
> > ### Alur Eksekusi Test
> >
> > Untuk setiap metode `@Test`, alur eksekusinya adalah:
> >
> > 1. **`@Before` dipanggil** — database in-memory baru dibuat, DAO disiapkan
> > 2. **Metode `@Test` dijalankan** — operasi dilakukan, assertion diverifikasi
> > 3. **`@After` dipanggil** — database ditutup, memori dibebaskan
> > 4. Siklus ini **berulang untuk setiap `@Test`**, memastikan isolasi penuh antar kasus uji

> [!cornell] #### Summary
>
> Testing database Room menggunakan **AndroidJUnit4** sebagai test runner (dideklarasikan via `@RunWith`) karena test memerlukan context Android nyata. Setup dilakukan di metode **`@Before`** dengan membuat **in-memory database** menggunakan `Room.inMemoryDatabaseBuilder()` — yang menjamin isolasi dan kecepatan karena data hanya ada di RAM dan terhapus saat database ditutup. Teardown dilakukan di metode **`@After`** dengan menutup database. Setiap metode **`@Test`** melakukan operasi pada DAO lalu memverifikasi hasilnya dengan `assertEquals`. Opsi **`.allowMainThreadQueries()`** digunakan khusus untuk testing agar kode test tetap sederhana tanpa perlu coroutine setup.

> [!ad-libitum]- Additional Information
>
> #### Dependensi yang Diperlukan
>
> Tambahkan dependensi berikut di `build.gradle` untuk mendukung testing Room:
>
> ```kotlin
> dependencies {
>     // Room testing
>     testImplementation("androidx.room:room-testing:$room_version")
>     // AndroidJUnit4 runner
>     androidTestImplementation("androidx.test.ext:junit:1.2.1")
>     androidTestImplementation("androidx.test:core-ktx:1.6.1")
>     // Coroutine testing (untuk suspend DAO)
>     testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
> }
> ```
>
> #### Testing Suspend DAO Functions
>
> Jika metode DAO menggunakan `suspend`, test harus dijalankan dalam coroutine scope. Library `kotlinx-coroutines-test` menyediakan `runTest` untuk ini:
>
> ```kotlin
> @Test
> fun insertAndRetrieve() = runTest {
>     val word = Word(word = "kotlin")
>     wordDao.insert(word) // suspend function
>     val result = wordDao.getAlphabetizedWords().first()
>     assertThat(result).contains(word)
> }
> ```
>
> #### Testing Migrasi Database
>
> Room juga menyediakan `MigrationTestHelper` untuk menguji migrasi skema:
>
> ```kotlin
> @Rule
> @JvmField
> val helper: MigrationTestHelper = MigrationTestHelper(
>     InstrumentationRegistry.getInstrumentation(),
>     WordRoomDatabase::class.java
> )
>
> @Test
> fun migrate1To2() {
>     helper.createDatabase(TEST_DB, 1).apply { close() }
>     helper.runMigrationsAndValidate(TEST_DB, 2, true, MIGRATION_1_2)
> }
> ```
>
> #### Perbedaan `test/` vs `androidTest/`
>
> Struktur proyek Android memiliki dua direktori test:
>
> - **`src/test/`** — Unit tests yang berjalan di JVM lokal mesin pengembang. Cepat, tidak memerlukan emulator/perangkat. Cocok untuk testing logika bisnis murni (ViewModel, Repository, utility functions)
> - **`src/androidTest/`** — Instrumentation tests yang berjalan di perangkat Android nyata atau emulator. Lebih lambat tapi dapat mengakses Android framework, Room, SharedPreferences, dll.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis test untuk semua operasi CRUD (insert, update, delete, query) pada DAO yang telah dibuat di sesi Room
> 2. Tambahkan test untuk memverifikasi constraint database — misalnya, pastikan insert dua entitas dengan primary key yang sama mengikuti `OnConflictStrategy` yang dikonfigurasi
> 3. Uji migrasi dari versi 1 ke 2 menggunakan `MigrationTestHelper` setelah menambahkan kolom baru pada Entity
>
> #### Bacaan Lanjutan
>
> - Dokumentasi AndroidX: "Test your database"
> - Android Developer Guide: "Build effective unit tests"
> - Codelab: "Advanced Android in Kotlin: Testing and Dependency Injection"
> - Blog: "Write once, run everywhere: Unit testing with the Android Testing Support Library"
