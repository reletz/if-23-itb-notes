---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Navigation Component Core Architecture
>
> > ## Questions/Cues
> >
> > - Mengapa Navigation Component menggunakan NavGraph?
> > - Bagaimana NavHost dan NavController berinteraksi?
> > - Langkah konfigurasi dependensi Navigation Component
> > - Peran XML dalam mendefinisikan tujuan navigasi
> > - Proses navigasi antar Fragment dengan action ID
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Slides 23-32, 36-42)
> > - Android Development with Kotlin (Slide 50 - Summary)
>
> > ### Arsitektur Navigation Component
> >
> > Navigation Component merupakan kerangka kerja terpadu untuk mengelola navigasi antar layar dalam aplikasi Android. Terdiri dari tiga komponen inti: **Navigation Graph** (XML yang memetakan alur layar), **NavHost** (wadah untuk menampilkan tujuan navigasi), dan **NavController** (pengatur logika navigasi). Komponen ini dirancang untuk menyederhanakan manajemen transisi antar Fragment dan memastikan konsistensi perilaku navigasi.
> >
> > Analogi: Bayangkan Navigation Graph sebagai peta perjalanan kereta api, NavHost sebagai stasiun tempat kereta berhenti, dan NavController sebagai masinis yang menentukan rute perjalanan berdasarkan rel yang tersedia.
> >
> > ### Konfigurasi Dependensi
> >
> > Untuk menggunakan Navigation Component, tambahkan dependensi berikut dalam file `build.gradle` level modul:
> >
> > ```kotlin
> >
> > dependencies {
> >
> > implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
> >
> > implementation "androidx.navigation:navigation-ui-ktx:$nav_version"
> >
> > }
> >
> > ```
> >
> > Variabel `nav_version` harus didefinisikan di file `build.gradle` level proyek. Versi terbaru dapat diperiksa melalui dokumentasi resmi Android. Konfigurasi ini memungkinkan penggunaan ekstensi Kotlin dan integrasi dengan komponen UI.
> >
> > ### Implementasi NavHost
> >
> > NavHost dideklarasikan dalam layout XML sebagai wadah placeholder untuk tujuan navigasi. Contoh implementasi:
> >
> > ```xml
> >
> > <fragment
> >
> > android:id="@+id/nav_host"
> >
> > android:name="androidx.navigation.fragment.NavHostFragment"
> >
> > android:layout_width="match_parent"
> >
> > android:layout_height="match_parent"
> >
> > app:defaultNavHost="true"
> >
> > app:navGraph="@navigation/nav_graph" />
> >
> > ```
> >
> > Atribut `app:defaultNavHost="true"` memungkinkan NavHost menangani tombol kembali secara otomatis. `app:navGraph` mengarah ke file XML yang berisi definisi Navigation Graph.
> >
> > ### Konstruksi Navigation Graph
> >
> > Navigation Graph (`nav_graph.xml`) adalah file XML di direktori `res/navigation` yang mendefinisikan:
> >
> > - **Destinasi**: Fragment atau Activity tujuan
> > - **Action**: Transisi antar destinasi
> > - **Argument**: Data yang dapat dikirim antar destinasi
> >
> > Contoh struktur dasar:
> >
> > ```xml
> >
> > <navigation xmlns:android="http://schemas.android.com/apk/res/android"
> >
> > xmlns:app="http://schemas.android.com/apk/res-auto"
> >
> > app:startDestination="@id/mainFragment">
> >
> > <fragment
> >
> > android:id="@+id/mainFragment"
> >
> > android:name="com.example.MainFragment"
> >
> > android:label="Main">
> >
> > <action
> >
> > android:id="@+id/action_main_to_detail"
> >
> > app:destination="@id/detailFragment" />
> >
> > </fragment>
> >
> > <fragment
> >
> > android:id="@+id/detailFragment"
> >
> > android:name="com.example.DetailFragment"
> >
> > android:label="Detail" />
> >
> > </navigation>
> >
> > ```
> >
> > ### Penggunaan NavController
> >
> > NavController adalah objek yang mengelola navigasi dalam NavHost. Cara inisialisasi:
> >
> > ```kotlin
> >
> > class MainActivity : AppCompatActivity() {
> >
> > private lateinit var navController: NavController
> >
> > override fun onCreate(savedInstanceState: Bundle?) {
> >
> > super.onCreate(savedInstanceState)
> >
> > navController = findNavController(R.id.nav_host)
> >
> > }
> >
> > fun navigateToDetail() {
> >
> > navController.navigate(R.id.action_main_to_detail)
> >
> > }
> >
> > }
> >
> > ```
> >
> > Metode `navigate()` menerima ID action yang didefinisikan di Navigation Graph. NavController secara otomatis menangani transisi Fragment dan manajemen back stack.

> [!cornell] #### Summary
>
> **Navigation Component** menyediakan solusi terstruktur untuk navigasi antar layar dengan tiga pilar utama: **Navigation Graph** (peta visual alur aplikasi), **NavHost** (wadah dinamis untuk Fragment), dan **NavController** (logika navigasi terpusat). Implementasi memerlukan konfigurasi dependensi Gradle dan definisi XML untuk NavHost serta Navigation Graph. **Keunggulan utama** meliputi manajemen siklus hidup otomatis, penanganan back stack terintegrasi, dan visualisasi alur navigasi melalui Navigation Editor di Android Studio.

> [!ad-libitum]- Additional Information
>
> #### Manajemen Back Stack Otomatis
>
> Navigation Component secara otomatis mengelola back stack menggunakan prinsip LIFO (Last-In-First-Out). Setiap kali navigasi ke destinasi baru, entri baru ditambahkan ke stack. Tombol kembali akan mem-pop stack teratas. Developer dapat mengustomisasi perilaku ini dengan `popUpTo` dan `popUpToInclusive` dalam definisi action:
>
> ```xml
>
> <action
>
> android:id="@+id/action_A_to_B"
>
> app:destination="@id/fragmentB"
>
> app:popUpTo="@id/fragmentA"
>
> app:popUpToInclusive="true" />
>
> ```
>
> Konfigurasi ini menghapus semua destinasi hingga `fragmentA` dari stack saat berpindah ke `fragmentB`.
>
> #### Deep Linking
>
> Navigation Component mendukung deep linking implisit dan eksplisit. Deep link memungkinkan aplikasi merespon URI spesifik untuk navigasi langsung ke destinasi tertentu. Contoh implementasi:
>
> ```xml
>
> <fragment
>
> android:id="@+id/deepLinkFragment"
>
> android:name="com.example.DeepLinkFragment">
>
> <deepLink
>
> app:uri="example://deeplink/{paramName}" />
>
> </fragment>
>
> ```
>
> Sistem Android akan otomatis mengarahkan URI `example://deeplink/...` ke fragment tersebut.
>
> #### Integrasi dengan ViewModel
>
> Untuk komunikasi data antar Fragment yang kompleks, kombinasi Navigation Component dengan ViewModel direkomendasikan:
>
> ```kotlin
>
> class SharedViewModel : ViewModel() {
>
> private val _data = MutableLiveData<String>()
>
> val data: LiveData<String> = _data
>
> fun setData(value: String) {
>
> _data.value = value
>
> }
>
> }
>
> // Dalam Fragment pengirim
>
> viewModel.setData("Informasi penting")
>
> navController.navigate(R.id.action_next)
>
> // Dalam Fragment penerima
>
> private val viewModel: SharedViewModel by activityViewModels()
>
> viewModel.data.observe(viewLifecycleOwner) { data ->
>
> // Proses data
>
> }
>
> ```
>
> #### Self-Exploration Projects
>
> 1. **Implementasi Nested Navigation**: Buat hierarki navigasi bertingkat dengan NavGraph bersarang untuk aplikasi dengan alur multi-modul
> 2. **Animasi Transisi Kustom**: Eksperimen dengan animasi enter/exit menggunakan `enterAnim`, `exitAnim`, `popEnterAnim`, dan `popExitAnim` dalam definisi action
> 3. **Tes Navigasi dengan Navigation Testing Library**: Implementasikan UI test untuk memverifikasi alur navigasi menggunakan `TestNavHostController`
>
> #### Tools dan Resources
>
> - **Navigation Editor**: Tool visual di Android Studio untuk membuat/mengedit Navigation Graph
> - **Navigation Testing**: `androidx.navigation:navigation-testing` untuk unit/integrasi testing
> - **Playground Navigation**: Contoh implementasi lengkap di [GitHub Android Architecture Components](https://github.com/android/architecture-components-samples)
>
> #### Further Reading
>
> - Dokumentasi Resmi: [Android Navigation Component](https://developer.android.com/guide/navigation)
> - Buku: "Android Navigation by Tutorials" (Raywenderlich)
> - Video: "Advanced Navigation Patterns" (Android Developers YouTube)
> - Artikel: "Navigation Component Under the Hood" (ProAndroidDev Medium)