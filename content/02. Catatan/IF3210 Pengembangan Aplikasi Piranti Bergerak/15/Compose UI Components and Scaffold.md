---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Compose UI Components and Scaffold
>
> > ## Questions/Cues
> >
> > - Apa perbedaan antara `Button`, `OutlinedButton`, dan `TextButton` dalam Compose?
> > - Bagaimana cara menampilkan gambar dari jaringan di Jetpack Compose?
> > - Mengapa `LazyColumn` lebih efisien dari `Column` untuk daftar panjang?
> > - Apa peran `Scaffold` dan slot apa saja yang disediakannya?
> > - Bagaimana cara membangun `TopAppBar` dengan menu dropdown?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 31-50)
>
> > ### Komponen Button
> >
> > Compose menyediakan tiga varian tombol Material Design:
> >
> > - **`Button {}`** — tombol terisi penuh (*contained button*) dengan latar belakang warna primer, digunakan untuk aksi utama
> > - **`OutlinedButton {}`** — tombol dengan garis tepi (*outlined button*) tanpa isian, digunakan untuk aksi sekunder
> > - **`TextButton {}`** — tombol teks saja (*text button*) tanpa tepi maupun isian, digunakan untuk aksi tersier atau di dalam dialog
> >
> > Ketiga varian menerima lambda sebagai konten dan parameter `onClick`. Ikon dapat ditambahkan di dalam lambda menggunakan `Icon` composable berdampingan dengan `Text`.
> >
> > ### Komponen Image
> >
> > Composable **`Image`** digunakan untuk menampilkan gambar dari berbagai sumber. Untuk gambar lokal (resource drawable), gunakan `painterResource(R.drawable.namaGambar)`:
> >
> > ```kotlin
> > Image(
> >     painter = painterResource(R.drawable.profile_photo),
> >     contentDescription = "Foto profil pengguna",
> >     contentScale = ContentScale.Crop,
> >     modifier = Modifier.size(80.dp).clip(CircleShape)
> > )
> > ```
> >
> > Parameter penting Image:
> >
> > - **`contentScale`** — menentukan cara gambar difit ke dalam area: `Crop` (potong), `Fit` (muat penuh), `FillBounds` (regangkan)
> > - **`colorFilter`** — menerapkan filter warna seperti tint menggunakan `ColorFilter.tint()`
> >
> > ### Gambar dari Jaringan (Accompanist)
> >
> > Library **Accompanist** menyediakan integrasi Compose dengan library image loading populer untuk menampilkan gambar dari URL:
> >
> > - **`rememberCoilPainter(url)`** — integrasi dengan library **Coil** (Kotlin-first, ringan)
> > - **`rememberGlidePainter(url)`** — integrasi dengan library **Glide** (mature, fitur lengkap)
> >
> > Kedua fungsi ini mengembalikan `Painter` yang dapat langsung digunakan sebagai argumen `painter` pada composable `Image`, termasuk dukungan placeholder dan error state.
> >
> > ### LazyColumn: Pengganti RecyclerView
> >
> > Sebelum Compose, menampilkan daftar panjang memerlukan **RecyclerView** dengan boilerplate yang signifikan: class Adapter, class ViewHolder, dan XML layout item. `LazyColumn` menggantikan seluruh kebutuhan itu dengan API yang jauh lebih ringkas.
> >
> > **`LazyColumn`** hanya merender item yang sedang terlihat di layar (*lazy rendering*), menjadikannya efisien untuk daftar dengan ratusan atau ribuan item. Fungsi-fungsi DSL di dalam `LazyColumn`:
> >
> > ```kotlin
> > LazyColumn {
> >     // Header tunggal
> >     item {
> >         Text("Header Daftar", style = MaterialTheme.typography.h6)
> >     }
> >
> >     // Iterasi list tanpa indeks
> >     items(dataList) { item ->
> >         ItemCard(item)
> >     }
> >
> >     // Iterasi list dengan indeks
> >     itemsIndexed(dataList) { index, item ->
> >         Text("$index: ${item.name}")
> >     }
> > }
> > ```
> >
> > ### Scaffold: Kerangka Layar Material
> >
> > **`Scaffold`** menyediakan struktur tata letak layar yang sesuai dengan spesifikasi Material Design. Scaffold memiliki beberapa **slot** (parameter lambda) yang dapat diisi:
> >
> > - **`topBar`** — bilah atas layar (biasanya `TopAppBar`)
> > - **`bottomBar`** — navigasi bawah layar (biasanya `BottomAppBar`)
> > - **`floatingActionButton`** — tombol aksi mengambang
> > - **`content`** — konten utama layar, menerima `PaddingValues` agar tidak tertimpa bar
> >
> > ### TopAppBar
> >
> > **`TopAppBar`** adalah komponen bilah atas Material dengan slot:
> >
> > - **`title`** — composable judul layar
> > - **`backgroundColor`** — warna latar bilah
> > - **`actions`** — composable untuk ikon atau tombol di sisi kanan
> >
> > Untuk menu dropdown di dalam `actions`, gunakan **`IconButton`** yang memicu **`DropdownMenu`**. `DropdownMenu` menerima parameter `expanded` (boolean state) dan `onDismissRequest` untuk menutup menu:
> >
> > ```kotlin
> > TopAppBar(
> >     title = { Text("Judul Layar") },
> >     actions = {
> >         var expanded by remember { mutableStateOf(false) }
> >         IconButton(onClick = { expanded = true }) {
> >             Icon(Icons.Default.MoreVert, contentDescription = "Menu")
> >         }
> >         DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
> >             DropdownMenuItem(onClick = { /* aksi */ }) { Text("Pengaturan") }
> >         }
> >     }
> > )
> > ```
> >
> > ### FloatingActionButton dan BottomAppBar
> >
> > **`FloatingActionButton`** adalah tombol aksi utama yang mengambang di atas konten, umumnya di pojok kanan bawah. Parameter: `onClick` (lambda), `backgroundColor`, `contentColor`.
> >
> > **`BottomAppBar`** digunakan untuk navigasi bawah. Berisi **`BottomNavigationItem`** yang masing-masing memiliki:
> >
> > - `icon` — composable ikon navigasi
> > - `selected` — boolean yang menandakan tab aktif
> > - `onClick` — lambda untuk menangani pergantian tab
> > - `label` — composable teks label opsional

> [!cornell] #### Summary
>
> Compose menyediakan tiga varian **Button** (Button/OutlinedButton/TextButton) dan composable **Image** dengan dukungan `contentScale` dan `colorFilter`; untuk gambar dari jaringan digunakan library **Accompanist** dengan `rememberCoilPainter` atau `rememberGlidePainter`. **`LazyColumn`** menggantikan RecyclerView+Adapter+ViewHolder dengan API DSL yang ringkas menggunakan `item{}`, `items()`, dan `itemsIndexed()`. **`Scaffold`** menyediakan kerangka layar Material dengan slot `topBar`, `bottomBar`, `floatingActionButton`, dan `content`; dilengkapi `TopAppBar` (dengan `DropdownMenu` untuk aksi), `FloatingActionButton`, dan `BottomAppBar` dengan `BottomNavigationItem`.

> [!ad-libitum]- Additional Information
>
> #### LazyRow dan LazyVerticalGrid
>
> Selain `LazyColumn`, Compose juga menyediakan:
>
> - **`LazyRow`** — setara `LazyColumn` namun horizontal, untuk carousel atau daftar chip
> - **`LazyVerticalGrid`** — menampilkan grid dengan jumlah kolom tetap (`FixedColumns(n)`) atau adaptif (`Adaptive(minSize)`)
>
> ```kotlin
> LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 128.dp)) {
>     items(photoList) { photo -> PhotoCard(photo) }
> }
> ```
>
> #### Coil sebagai Library Pilihan di Proyek Kotlin
>
> **Coil** (*Coroutine Image Loader*) adalah pilihan yang direkomendasikan untuk proyek Kotlin modern karena:
>
> - Dibangun dengan Kotlin Coroutines secara native
> - Ukuran APK lebih kecil dari Glide
> - API Compose tersedia langsung via `coil-compose` artifact
>
> ```kotlin
> // Cara modern dengan coil-compose 2.x
> AsyncImage(
>     model = "https://example.com/image.jpg",
>     contentDescription = null
> )
> ```
>
> #### Material 3 Scaffold
>
> Di Material Design 3 (Material You), `Scaffold` memiliki parameter yang sedikit berbeda: `topBar` tetap ada, tetapi `floatingActionButton` kini memiliki slot terpisah untuk `floatingActionButtonPosition`. Komponen `SmallTopAppBar`, `CenterAlignedTopAppBar`, dan `LargeTopAppBar` tersedia sebagai varian baru.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat layar daftar kontak menggunakan `LazyColumn` dengan `itemsIndexed`, header alfabet menggunakan `item{}`, dan kartu kontak dengan avatar dari URL menggunakan Coil
> 2. Implementasikan `Scaffold` lengkap dengan `TopAppBar` (termasuk dropdown menu), `FloatingActionButton`, dan `BottomAppBar` dengan minimal 3 tab navigasi
> 3. Bandingkan performa rendering `Column` biasa vs `LazyColumn` untuk 1000 item menggunakan Android Studio Profiler
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Lists in Compose"
> - Dokumentasi Resmi Android: "Scaffold"
> - Dokumentasi Coil: "coil-compose" (coil-kt.github.io)
> - Codelab: "Jetpack Compose — Build Beautiful Material Design Apps"
