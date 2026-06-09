---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Jetpack Compose Fundamentals - Declarative UI and Composables
>
> > ## Questions/Cues
> >
> > - Apa perbedaan mendasar antara paradigma UI imperatif dan deklaratif?
> > - Mengapa Android memerlukan toolkit UI baru setelah bertahun-tahun menggunakan View?
> > - Bagaimana anotasi `@Composable` mengubah cara kita mendefinisikan UI?
> > - Apa peran `setContent {}` dan bagaimana hubungannya dengan `setContentView()`?
> > - Bagaimana Material Theme bekerja sebagai elemen akar layar Compose?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 1-10)
>
> > ### Apa Itu Jetpack Compose
> >
> > **Jetpack Compose** adalah toolkit UI modern dan deklaratif milik Android untuk membangun antarmuka pengguna native dengan lebih sedikit kode menggunakan API Kotlin. Compose dirancang untuk menyederhanakan dan mempercepat pengembangan UI di Android dengan menggantikan pendekatan berbasis XML yang telah lama digunakan sejak Android 1.0.
> >
> > Keunggulan utama Compose dibandingkan toolkit lama:
> >
> > - **Lebih sedikit kode** — tidak perlu XML terpisah, binding boilerplate, atau adapter untuk tampilan sederhana
> > - **Kompatibel dengan aplikasi yang sudah ada** — dapat diadopsi secara bertahap (*progressive adoption*) tanpa menulis ulang seluruh aplikasi
> > - **Berbasis komponen** — UI dibangun dari unit-unit kecil yang dapat digunakan ulang (*components over screens*)
> > - **API Kotlin sepenuhnya** — memanfaatkan fitur bahasa seperti lambda, extension function, dan DSL
> >
> > ### Paradigma Imperatif vs Deklaratif
> >
> > **UI Imperatif** adalah pendekatan tradisional di mana entitas UI (seperti `View` atau `ViewGroup`) didefinisikan sepenuhnya terlebih dahulu, lalu diperbarui satu per satu melalui pemanggilan metode atau properti secara eksplisit. Seluruh kompleksitas pembaruan state UI menjadi tanggung jawab pengembang.
> >
> > **UI Deklaratif** adalah pendekatan di mana UI dan *state* didefinisikan bersama-sama. Framework yang mengelola pembaruan UI secara otomatis saat state berubah. Paradigma ini dipopulerkan oleh **React Native**, **SwiftUI**, dan **Flutter**.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph Imperatif
> >         direction TB
> >         A1["State Berubah"] --> B1["Pengembang\nmemanggil\nview.setText()"]
> >         B1 --> C1["UI Diperbarui\n(manual)"]
> >     end
> >     subgraph Deklaratif
> >         direction TB
> >         A2["State Berubah"] --> B2["Framework\nmemanggil ulang\nfungsi Composable"]
> >         B2 --> C2["UI Diperbarui\n(otomatis)"]
> >     end
> > ```
> >
> > ### Motivasi: Keterbatasan Toolkit Lama
> >
> > Toolkit View Android pertama kali diperkenalkan pada tahun **2008** dan dirancang untuk kondisi perangkat keras yang sangat berbeda dengan masa kini. Seiring waktu, beberapa keterbatasan menjadi nyata:
> >
> > - **Custom view sulit dibuat** — membuat komponen UI kustom memerlukan banyak kode boilerplate yang kompleks dan sulit dipelihara
> > - **Arsitektur yang sudah tua** — didesain sebelum pemahaman modern tentang arsitektur aplikasi mobile berkembang
> > - **Pemisahan XML dan Kotlin** — UI dideklarasikan di XML tetapi logika ada di Kotlin, menciptakan gap antara dua dunia yang harus selalu disinkronisasi
> > - **Susah di-compose ulang** — komponen View tidak dirancang untuk komposisi mudah, sehingga reuse menjadi rumit
> >
> > ### Anotasi @Composable dan Widget Tree
> >
> > Fungsi yang bertanda anotasi **`@Composable`** adalah unit dasar Compose. Fungsi ini mendeskripsikan UI (bukan mengembalikan View), dan dipanggil oleh framework untuk membangun *declarative widget tree*. Aturan penting:
> >
> > - Setiap fungsi yang membangun UI **wajib** diberi anotasi `@Composable`
> > - Fungsi `@Composable` hanya dapat dipanggil dari fungsi `@Composable` lain
> > - Secara konvensi, nama fungsi `@Composable` diawali dengan huruf kapital (seperti nama kelas)
> >
> > Di dalam `Activity`, metode `setContent {}` menggantikan `setContentView()` dan berfungsi sebagai titik masuk seluruh hierarki Compose:
> >
> > ```kotlin
> > class MainActivity : ComponentActivity() {
> >     override fun onCreate(savedInstanceState: Bundle?) {
> >         super.onCreate(savedInstanceState)
> >         setContent {
> >             MyAppTheme {
> >                 GreetingScreen()
> >             }
> >         }
> >     }
> > }
> > ```
> >
> > ### @Preview dan Material Theme
> >
> > Anotasi **`@Preview`** memungkinkan IDE (Android Studio) menampilkan pratinjau fungsi `@Composable` tanpa menjalankan aplikasi di perangkat. Fungsi yang diberi `@Preview` tidak boleh menerima parameter, sehingga biasanya dibuat fungsi preview terpisah.
> >
> > **Material Theme** adalah elemen akar yang mendefinisikan tema aplikasi secara menyeluruh, mencakup tiga aspek:
> >
> > - **Colors** — palet warna utama, sekunder, latar belakang, dan permukaan
> > - **Typography** — definisi gaya teks (heading, body, caption, dll.)
> > - **Shapes** — bentuk sudut komponen (rounded, cut corner, dll.) dalam tiga ukuran: small, medium, large
> >
> > Seluruh composable yang berada di dalam blok Material Theme akan mewarisi definisi tema tersebut, termasuk dukungan **dark theme** yang otomatis menyesuaikan warna berdasarkan preferensi sistem.

> [!cornell] #### Summary
>
> **Jetpack Compose** adalah toolkit UI deklaratif modern Android yang menggantikan sistem View berbasis XML yang telah ada sejak 2008. Berbeda dengan **UI imperatif** yang mengharuskan pengembang memperbarui UI secara manual, **UI deklaratif** memungkinkan framework memperbarui UI otomatis saat state berubah. Fungsi bertanda **`@Composable`** adalah unit dasar yang membangun *widget tree* deklaratif; `setContent {}` menggantikan `setContentView()` sebagai titik masuk di Activity. **`@Preview`** mempercepat iterasi desain di IDE, sementara **Material Theme** mendefinisikan warna, tipografi, dan bentuk sebagai elemen akar layar yang diwarisi seluruh composable di bawahnya.

> [!ad-libitum]- Additional Information
>
> #### Recomposition: Mekanisme Inti Compose
>
> Saat state berubah, Compose tidak menggambar ulang seluruh UI. Sebaliknya, Compose melakukan **recomposition** — hanya memanggil ulang fungsi composable yang membaca state yang berubah. Ini sangat efisien karena:
>
> ```kotlin
> @Composable
> fun Counter(count: Int) {
>     // Hanya composable ini yang dipanggil ulang saat count berubah
>     Text("Count: $count")
> }
> ```
>
> Compose menggunakan teknik *slot table* internal untuk melacak composable mana yang perlu diperbarui.
>
> #### Perbedaan ComponentActivity vs AppCompatActivity
>
> Dalam proyek Compose, `ComponentActivity` (bukan `AppCompatActivity`) adalah base class yang direkomendasikan karena lebih ringan dan tidak membawa overhead fragment back stack lama. `AppCompatActivity` tetap bisa digunakan untuk kompatibilitas dengan kode View lama.
>
> #### Compose Compiler dan Kotlin
>
> Compose bekerja melalui **Compose Compiler Plugin** yang memproses anotasi `@Composable` pada saat kompilasi. Plugin ini mengubah fungsi composable biasa menjadi fungsi yang dapat diinterupsi (*restartable*) dan dilacak oleh runtime Compose. Inilah mengapa Compose memerlukan versi Kotlin tertentu agar kompatibel.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi Compose pertama dengan `setContent {}` dan beberapa fungsi `@Composable` bersarang, lalu eksplorasi bagaimana perubahan state memicu recomposition
> 2. Bandingkan jumlah baris kode untuk membuat UI yang sama menggunakan XML + ViewBinding vs Jetpack Compose
> 3. Implementasikan dark theme support dengan `MaterialTheme` dan `isSystemInDarkTheme()`
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Jetpack Compose Overview"
> - Codelab: "Jetpack Compose Basics"
> - Blog: "Thinking in Compose" (Android Developers Medium)
> - "Jetpack Compose by Tutorials" — raywenderlich.com
