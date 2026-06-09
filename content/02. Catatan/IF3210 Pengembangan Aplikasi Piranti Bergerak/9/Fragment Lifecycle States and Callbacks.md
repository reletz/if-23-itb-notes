---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Fragment Lifecycle States and Callbacks
>
> > ## Questions/Cues
> >
> > - Apa perbedaan lifecycle Fragment dibanding Activity?
> > - Kapan `onCreateView()` vs `onViewCreated()` digunakan?
> > - Mengapa ada dua tahap penghancuran: `onDestroyView()` dan `onDetach()`?
> > - Bagaimana cara menyimpan state Fragment saat perubahan konfigurasi?
> > - Apa fungsi `onAttach()` dan `onDetach()` dalam siklus hidup Fragment?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 19-27)
>
> > ### State Fragment dan Perbedaannya dengan Activity
> >
> > Fragment memiliki tujuh state utama yang umumnya sejajar dengan state Activity, namun dengan tambahan state **INITIALIZED** yang unik karena Fragment perlu dikaitkan ke Activity host sebelum lifecycle-nya benar-benar dimulai.
> >
> > | State | Callback Terkait | Kondisi Fragment |
> > |-------|-----------------|-----------------|
> > | **INITIALIZED** | `onAttach()` | Terhubung ke Activity host |
> > | **CREATED** | `onCreate()`, `onCreateView()`, `onViewCreated()` | Dibuat dan layout diinisialisasi |
> > | **STARTED** | `onStart()` | Terlihat dan dimulai |
> > | **RESUMED** | `onResume()` | Memiliki input focus |
> > | **PAUSED** | `onPause()` | Kehilangan input focus |
> > | **STOPPED** | `onStop()` | Tidak lagi terlihat |
> > | **DESTROYED** | `onDestroyView()`, `onDestroy()`, `onDetach()` | Dihapus dari host |
> >
> > ### Alur Lifecycle Fragment Lengkap
> >
> > ```mermaid
> > flowchart TD
> >     A([Fragment is added]) --> B[onAttach]
> >     B --> C[onCreate]
> >     C --> D[onCreateView]
> >     D --> E[onViewCreated]
> >     E --> F[onStart]
> >     F --> G[onResume]
> >     G --> H([Fragment is active])
> >     H --> I[onPause]
> >     I --> J[onStop]
> >     J --> K[onDestroyView]
> >     K --> L[onDestroy]
> >     L --> M[onDetach]
> >     M --> N([Fragment is destroyed])
> > ```
> >
> > ### Detail Callback Khusus Fragment
> >
> > **`onAttach()`** dipanggil pertama kali saat Fragment dikaitkan ke sebuah context (biasanya Activity). Ini adalah tempat yang tepat untuk mendapatkan referensi ke Activity atau memeriksa apakah Activity mengimplementasikan interface tertentu. Callback ini langsung mendahului `onCreate()`.
> >
> > **`onCreateView()`** bertugas untuk menginflate layout XML Fragment dan mengembalikan root view-nya. Ini adalah callback yang **tidak ada padanannya di Activity** karena Activity menginflate layout-nya di `onCreate()` menggunakan `setContentView()`. Contoh implementasi:
> >
> > ```kotlin
> > override fun onCreateView(
> >     inflater: LayoutInflater,
> >     container: ViewGroup?,
> >     savedInstanceState: Bundle?
> > ): View? {
> >     return inflater.inflate(R.layout.fragment_detail, container, false)
> > }
> > ```
> >
> > **`onViewCreated()`** dipanggil tepat setelah `onCreateView()` mengembalikan view. Ini adalah **tempat yang direkomendasikan** untuk melakukan inisialisasi komponen UI, setup observer, dan memulihkan state dari Bundle — bukan di `onCreateView()`. View sudah dijamin ada saat callback ini berjalan.
> >
> > **`onDestroyView()`** dipanggil saat view hierarchy Fragment dihapus, tetapi **instance Fragment itu sendiri masih ada**. Ini penting karena Fragment bisa kembali ke back stack; view-nya dihancurkan untuk menghemat memory, tetapi instance Fragment tetap hidup. Lepaskan semua referensi ke view di sini untuk mencegah memory leak.
> >
> > **`onDetach()`** adalah callback terakhir, dipanggil saat Fragment tidak lagi terhubung ke Activity host. Setelah ini, Fragment tidak boleh mengakses Activity karena referensinya sudah tidak valid.
> >
> > ### Menyimpan State Fragment
> >
> > Sama dengan Activity, Fragment perlu menyimpan state UI saat terjadi perubahan konfigurasi. Fragment menggunakan mekanisme yang sama — **Bundle via `onSaveInstanceState()`** — tetapi data tersebut dapat diambil di tiga lokasi berbeda:
> >
> > - `onCreate(savedInstanceState: Bundle?)` — untuk state non-UI
> > - `onCreateView(...)` — tersedia sebagai parameter `savedInstanceState`
> > - `onViewCreated(view, savedInstanceState)` — lokasi yang paling umum digunakan untuk memulihkan state UI

> [!cornell] #### Summary
>
> **Lifecycle Fragment** memiliki 11 callback dibanding 7 milik Activity, dengan tambahan `onAttach()`/`onDetach()` untuk manajemen hubungan ke host, serta pemisahan antara `onCreateView()` (inflate layout) dan `onViewCreated()` (inisialisasi UI). Perbedaan kritis: **view Fragment bisa dihancurkan** (`onDestroyView()`) sementara instance Fragment tetap hidup di back stack — sehingga referensi ke view harus dilepas di `onDestroyView()` untuk mencegah memory leak. State dipulihkan via Bundle yang tersedia di `onCreate()`, `onCreateView()`, dan `onViewCreated()`.

> [!ad-libitum]- Additional Information
>
> #### View Binding dan Lifecycle
>
> Penggunaan View Binding di Fragment memerlukan penanganan lifecycle yang hati-hati. Binding harus di-nullify di `onDestroyView()`:
>
> ```kotlin
> private var _binding: FragmentDetailBinding? = null
> private val binding get() = _binding!!
>
> override fun onCreateView(...): View {
>     _binding = FragmentDetailBinding.inflate(inflater, container, false)
>     return binding.root
> }
>
> override fun onDestroyView() {
>     super.onDestroyView()
>     _binding = null  // Mencegah memory leak
> }
> ```
>
> #### Lifecycle Bertingkat: Fragment dalam Fragment
>
> Fragment mendukung nested fragment (Fragment di dalam Fragment). Lifecycle nested fragment terikat ke Fragment parent-nya, bukan ke Activity. Gunakan `childFragmentManager` (bukan `parentFragmentManager`) untuk mengelola nested fragment agar lifecycle-nya terkelola dengan benar.
>
> #### LiveData dan viewLifecycleOwner
>
> Saat mengobservasi LiveData di Fragment, gunakan `viewLifecycleOwner` bukan `this` sebagai lifecycle owner. Hal ini memastikan observer dihapus saat view dihancurkan (`onDestroyView()`), bukan saat Fragment dihancurkan:
>
> ```kotlin
> viewModel.data.observe(viewLifecycleOwner) { data ->
>     binding.textView.text = data
> }
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat Fragment dengan EditText, log semua 11 callback, lalu uji skenario: navigate away dan back, rotasi layar
> 2. Implementasikan `onSaveInstanceState()` di Fragment untuk mempertahankan input teks
> 3. Eksperimen dengan `viewLifecycleOwner` vs `this` dalam observasi LiveData dan amati perbedaan perilaku
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Fragment Lifecycle"
> - Android Developer Guide: "Save state with fragments"
> - Codelab: "Android Kotlin Fundamentals: Fragments"
> - Blog: "Fragments: The Solution to All of Android's Problems" (Android Developers Medium)
