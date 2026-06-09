---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Room Persistence Library - Entity, DAO, and Database
>
> > ## Questions/Cues
> >
> > - Apa tiga komponen utama Room dan apa peran masing-masing?
> > - Bagaimana anotasi `@Entity`, `@PrimaryKey`, dan `@ColumnInfo` digunakan?
> > - Apa perbedaan antara `@Query`, `@Insert`, `@Update`, dan `@Delete` di DAO?
> > - Mengapa RoomDatabase dibuat dengan pola singleton?
> > - Bagaimana alur data dari aplikasi sampai ke SQLite melalui Room?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 10-27)
>
> > ### Room sebagai Abstraksi di Atas SQLite
> >
> > **Room Persistence Library** adalah bagian dari Android Jetpack yang menyediakan lapisan abstraksi di atas SQLite. Room mengatasi keterbatasan raw SQLite dengan menawarkan:
> >
> > - **Verifikasi query SQL pada compile-time** — kesalahan sintaks atau nama kolom yang salah terdeteksi sebelum aplikasi dijalankan
> > - **Konversi objek otomatis** — tidak perlu menulis kode boilerplate untuk mengonversi `Cursor` ke objek data
> > - **Integrasi dengan Kotlin Flow dan LiveData** — memungkinkan observasi perubahan database secara reaktif
> >
> > Untuk menambahkan Room ke proyek, tambahkan dependensi berikut di `build.gradle` (modul app):
> >
> > ```kotlin
> > dependencies {
> >     val room_version = "2.6.1"
> >     implementation("androidx.room:room-runtime:$room_version")
> >     ksp("androidx.room:room-compiler:$room_version")
> >     implementation("androidx.room:room-ktx:$room_version")
> > }
> > ```
> >
> > ### Arsitektur Room
> >
> > Room terdiri dari tiga komponen utama yang bekerja bersama:
> >
> > ```mermaid
> > flowchart TD
> >     APP["Aplikasi\n(ViewModel/Repository)"]
> >     DAO["@Dao\n(Interface)"]
> >     DB["@Database\n(RoomDatabase)"]
> >     SQLITE["SQLite\n(File .db)"]
> >     APP -->|"memanggil metode"| DAO
> >     DAO -->|"query/operasi"| DB
> >     DB -->|"abstraksi"| SQLITE
> >     SQLITE -->|"hasil query"| DB
> >     DB -->|"data"| DAO
> >     DAO -->|"objek Kotlin"| APP
> > ```
> >
> > - **Entity** — representasi Kotlin dari sebuah tabel dalam database
> > - **DAO (Data Access Object)** — interface yang mendefinisikan semua operasi database
> > - **Database** — kelas abstrak yang menghubungkan Entity dengan DAO dan berfungsi sebagai titik akses utama ke database
> >
> > ### Mendefinisikan Entity
> >
> > **Entity** adalah data class Kotlin yang dianotasi dengan `@Entity`. Setiap property class menjadi kolom dalam tabel. Anotasi penting:
> >
> > - **`@Entity(tableName = "nama_tabel")`** — mendeklarasikan kelas sebagai entitas dan menentukan nama tabel. Jika `tableName` tidak diisi, nama kelas digunakan sebagai nama tabel
> > - **`@PrimaryKey`** — menandai property sebagai primary key. Tambahkan `autoGenerate = true` agar nilai diisi otomatis oleh database
> > - **`@ColumnInfo(name = "nama_kolom")`** — mengkustomisasi nama kolom di database agar berbeda dari nama property Kotlin
> >
> > Contoh definisi Entity:
> >
> > ```kotlin
> > @Entity(tableName = "word_table")
> > data class Word(
> >     @PrimaryKey(autoGenerate = true)
> >     val id: Int = 0,
> >
> >     @ColumnInfo(name = "word")
> >     val word: String
> > )
> > ```
> >
> > ### Mendefinisikan DAO
> >
> > **DAO** adalah interface yang dianotasi dengan `@Dao`. Setiap metode dalam interface ini merepresentasikan satu operasi database. Room akan men-generate implementasinya secara otomatis pada compile-time.
> >
> > Anotasi yang tersedia untuk metode DAO:
> >
> > - **`@Query("SQL")`** — untuk operasi SELECT (dan SQL kustom lainnya). String SQL diverifikasi saat compile-time
> > - **`@Insert(onConflict = OnConflictStrategy.IGNORE)`** — menyisipkan satu atau beberapa entitas. Strategi konflik menentukan perilaku saat terjadi duplikasi primary key
> > - **`@Update`** — memperbarui entitas berdasarkan primary key-nya
> > - **`@Delete`** — menghapus entitas berdasarkan primary key-nya
> >
> > Contoh DAO:
> >
> > ```kotlin
> > @Dao
> > interface WordDao {
> >
> >     @Query("SELECT * FROM word_table ORDER BY word ASC")
> >     fun getAlphabetizedWords(): Flow<List<Word>>
> >
> >     @Insert(onConflict = OnConflictStrategy.IGNORE)
> >     suspend fun insert(word: Word)
> >
> >     @Query("DELETE FROM word_table")
> >     suspend fun deleteAll()
> > }
> > ```
> >
> > ### Membuat RoomDatabase
> >
> > Kelas database adalah kelas abstrak yang meng-extend `RoomDatabase` dan dianotasi dengan `@Database`. Anotasi ini menerima daftar entities dan nomor versi database (digunakan untuk migrasi skema).
> >
> > Pola **singleton** wajib digunakan agar hanya ada satu instance database yang aktif sekaligus, menghindari race condition dan pemborosan resource:
> >
> > ```kotlin
> > @Database(entities = [Word::class], version = 1, exportSchema = false)
> > abstract class WordRoomDatabase : RoomDatabase() {
> >
> >     abstract fun wordDao(): WordDao
> >
> >     companion object {
> >         @Volatile
> >         private var INSTANCE: WordRoomDatabase? = null
> >
> >         fun getDatabase(context: Context): WordRoomDatabase {
> >             return INSTANCE ?: synchronized(this) {
> >                 val instance = Room.databaseBuilder(
> >                     context.applicationContext,
> >                     WordRoomDatabase::class.java,
> >                     "word_database"
> >                 ).build()
> >                 INSTANCE = instance
> >                 instance
> >             }
> >         }
> >     }
> > }
> > ```
> >
> > Anotasi **`@Volatile`** memastikan nilai `INSTANCE` selalu dibaca dari main memory (bukan dari CPU cache), sehingga aman di lingkungan multithreaded. Blok `synchronized` memastikan hanya satu thread yang dapat membuat instance database pada satu waktu.
> >
> > ### Menggunakan DAO
> >
> > Setelah database dan DAO terdefinisi, DAO diakses melalui instance database. Umumnya ini dilakukan melalui **Repository** yang kemudian diakses oleh `ViewModel`:
> >
> > ```kotlin
> > class WordRepository(private val wordDao: WordDao) {
> >     val allWords: Flow<List<Word>> = wordDao.getAlphabetizedWords()
> >
> >     suspend fun insert(word: Word) {
> >         wordDao.insert(word)
> >     }
> > }
> > ```

> [!cornell] #### Summary
>
> **Room Persistence Library** menyediakan abstraksi aman di atas SQLite dengan tiga komponen: **Entity** (data class dengan `@Entity` yang merepresentasikan tabel), **DAO** (interface dengan `@Dao` berisi metode `@Query`/`@Insert`/`@Update`/`@Delete` yang diverifikasi saat compile-time), dan **RoomDatabase** (kelas abstrak yang menghubungkan keduanya). Database dibuat menggunakan `Room.databaseBuilder()` dengan pola **singleton** menggunakan `@Volatile` dan blok `synchronized` untuk keamanan multithreaded. DAO biasanya diakses melalui Repository yang kemudian dikonsumsi oleh ViewModel, mengikuti pola arsitektur MVVM yang direkomendasikan Android.

> [!ad-libitum]- Additional Information
>
> #### Migrasi Skema Database
>
> Saat skema database berubah (menambah tabel, kolom, atau mengubah tipe), nomor `version` di `@Database` harus dinaikkan dan objek `Migration` harus disediakan:
>
> ```kotlin
> val MIGRATION_1_2 = object : Migration(1, 2) {
>     override fun migrate(database: SupportSQLiteDatabase) {
>         database.execSQL("ALTER TABLE word_table ADD COLUMN last_updated INTEGER")
>     }
> }
>
> Room.databaseBuilder(context, WordRoomDatabase::class.java, "word_database")
>     .addMigrations(MIGRATION_1_2)
>     .build()
> ```
>
> Tanpa migrasi yang tepat, Room akan melempar `IllegalStateException` saat versi berubah.
>
> #### TypeConverter untuk Tipe Kustom
>
> Room secara native hanya mendukung tipe primitif dan `String`. Untuk menyimpan tipe seperti `Date` atau `List`, digunakan `@TypeConverter`:
>
> ```kotlin
> class Converters {
>     @TypeConverter
>     fun fromTimestamp(value: Long?): Date? = value?.let { Date(it) }
>
>     @TypeConverter
>     fun dateToTimestamp(date: Date?): Long? = date?.time
> }
>
> @Database(entities = [Word::class], version = 1)
> @TypeConverters(Converters::class)
> abstract class WordRoomDatabase : RoomDatabase()
> ```
>
> #### Relasi Antar Tabel di Room
>
> Room mendukung relasi One-to-One, One-to-Many, dan Many-to-Many melalui anotasi `@Relation` dan data class wrapper:
>
> ```kotlin
> data class UserWithPlaylists(
>     @Embedded val user: User,
>     @Relation(parentColumn = "userId", entityColumn = "userCreatorId")
>     val playlists: List<Playlist>
> )
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan aplikasi Notes sederhana menggunakan Room dengan Entity `Note`, DAO dengan operasi CRUD lengkap, dan tampilkan daftar catatan via `Flow<List<Note>>`
> 2. Tambahkan migrasi dari versi 1 ke versi 2 dengan menambahkan kolom `category` pada tabel notes
> 3. Eksplorasi file `.db` yang dihasilkan Room menggunakan DB Browser for SQLite untuk melihat struktur tabel aktual
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi AndroidX: "Save data in a local database using Room"
> - Android Codelabs: "Android Room with a View — Kotlin"
> - Dokumentasi Room: "Defining data using Room entities"
> - Blog: "7 Pro-tips for Room" (Android Developers Medium)
