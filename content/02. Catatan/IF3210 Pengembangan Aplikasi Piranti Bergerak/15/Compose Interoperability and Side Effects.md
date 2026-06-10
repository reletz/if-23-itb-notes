---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] Compose Interoperability and Side Effects
>
> > ## Questions/Cues
> >
> > - Bagaimana cara menggunakan Composable di dalam Fragment atau layout XML?
> > - Apa itu `AndroidView` dan kapan kita membutuhkannya?
> > - Bagaimana `AndroidViewBinding` memudahkan migrasi dari sistem View?
> > - Apa perbedaan `LaunchedEffect`, `DisposableEffect`, dan `rememberCoroutineScope`?
> > - Mengapa side effects diperlukan dalam paradigma deklaratif Compose?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 58-67)
>
> > ### Interoperabilitas: Compose dalam Sistem View
> >
> > Jetpack Compose dirancang untuk adopsi bertahap, memungkinkan integrasi dengan sistem View yang sudah ada melalui beberapa mekanisme:
> >
> > **1. Compose dalam Fragment**: Gunakan `ComposeView` di dalam `onCreateView`.
> > ```kotlin
> > override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
> >     return ComposeView(requireContext()).apply {
> >         setContent {
> >             AppTheme {
> >                 YourComposable()
> >             }
> >         }
> >     }
> > }
> > ```
> >
> > **2. Compose dalam Layout XML**: Tambahkan elemen `ComposeView` di file XML, lalu panggil `setContent` di Activity/Fragment.
> > ```xml
> > <androidx.compose.ui.platform.ComposeView
> >     android:id="@+id/compose_view"
> >     android:layout_width="match_parent"
> >     android:layout_height="wrap_content" />
> > ```
> >
> > **3. AbstractComposeView**: Subclassing `AbstractComposeView` untuk membuat View kustom yang isinya adalah Composable, sehingga bisa digunakan langsung di XML seperti View biasa.
>
> > ### Interoperabilitas: View di dalam Compose
> >
> > Sebaliknya, untuk menggunakan komponen sistem View yang belum tersedia di Compose (misalnya `WebView`, `MapView`, atau `CalendarView`), digunakan **`AndroidView`**:
> >
> > ```kotlin
> > @Composable
> > fun LegacyViewWrapper() {
> >     AndroidView(
> >         factory = { context ->
> >             // Inisialisasi View tradisional di sini
> >             CalendarView(context).apply { ... }
> >         },
> >         update = { view ->
> >             // Update View saat state Compose berubah
> >         }
> >     )
> > }
> > ```
> >
> > Untuk layout yang menggunakan View Binding, tersedia **`AndroidViewBinding`** (memerlukan library `androidx.compose.ui:ui-viewbinding`) yang secara otomatis menginflate layout XML dan menyediakan akses ke binding object di dalam Compose.
>
> > ### Side Effects di Jetpack Compose
> >
> > Karena fungsi Composable harus bebas dari efek samping (*side-effect free*) agar dapat di-recompose secara efisien, Compose menyediakan API khusus untuk menjalankan logika yang berinteraksi dengan dunia luar:
> >
> > **1. `LaunchedEffect(key)`**: Menjalankan coroutine saat Composable masuk ke dalam composition. Jika `key` berubah, coroutine lama dibatalkan dan yang baru dijalankan. Sangat cocok untuk memicu network request atau navigasi.
> >
> > **2. `DisposableEffect(key)`**: Mirip dengan LaunchedEffect tetapi untuk logika yang membutuhkan pembersihan (*cleanup*). Menyediakan blok `onDispose` yang dipanggil saat Composable keluar dari composition atau key berubah. Cocok untuk mendaftarkan/melepaskan listener.
> >
> > **3. `rememberCoroutineScope()`**: Mengembalikan `CoroutineScope` yang terikat ke siklus hidup composition. Digunakan untuk meluncurkan coroutine sebagai respons terhadap event interaksi (seperti klik tombol) di mana kita tidak bisa menggunakan `LaunchedEffect` langsung.
> >
> > ```kotlin
> > val scope = rememberCoroutineScope()
> > Button(onClick = {
> >     scope.launch { /* Operasi asinkron */ }
> > }) { Text("Mulai") }
> > ```

> [!cornell] #### Summary
>
> Jetpack Compose mendukung **interoperabilitas penuh** dengan sistem View melalui **`ComposeView`** (untuk menaruh Compose di View/Fragment/XML) dan **`AndroidView`** (untuk menaruh View tradisional di dalam Compose). API **`AndroidViewBinding`** semakin memudahkan migrasi dengan mendukung layout XML secara langsung. Untuk menangani logika di luar UI, Compose menyediakan **Side Effect API**: **`LaunchedEffect`** untuk coroutine saat startup, **`DisposableEffect`** untuk listener dengan cleanup, dan **`rememberCoroutineScope`** untuk memicu operasi asinkron dari event interaksi pengguna.

> [!ad-libitum]- Additional Information
>
> #### Kapan Menggunakan LaunchedEffect(Unit)?
> Menggunakan `Unit` atau konstanta sebagai key pada `LaunchedEffect` memastikan bahwa blok kode tersebut hanya dijalankan **satu kali** selama masa hidup Composable di layar, tidak peduli seberapa banyak recomposition terjadi. Ini adalah pola umum untuk inisialisasi data di ViewModel.
>
> #### Penggunaan SideEffect API Lainnya
> Selain tiga yang utama, terdapat juga:
> - **`SideEffect`**: Menjalankan kode setiap kali recomposition berhasil (sinkronisasi state Compose dengan objek non-Compose).
> - **`derivedStateOf`**: Mengoptimalkan recomposition dengan hanya memicu perubahan jika hasil kalkulasi dari state lain benar-benar berubah.
> - **`produceState`**: Mengonversi sumber data eksternal (seperti sensor atau stream) menjadi State Compose.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat layar Compose yang menampilkan `WebView` menggunakan `AndroidView` dan implementasikan navigasi back handle tradisional.
> 2. Implementasikan timer sederhana menggunakan `LaunchedEffect` dan `delay`, lalu tampilkan hitung mundur di UI.
> 3. Gunakan `DisposableEffect` untuk memantau status sensor akselerometer dan pastikan sensor dimatikan saat user berpindah layar.
>
> #### Bacaan Lanjut
> - Dokumentasi Resmi: "Interoperability APIs"
> - Dokumentasi Resmi: "Side-effects in Compose"
> - Codelab: "Using State in Jetpack Compose" (Bagian Effects)
> - Blog: "Jetpack Compose Interop - Using Compose in a View-based app"
