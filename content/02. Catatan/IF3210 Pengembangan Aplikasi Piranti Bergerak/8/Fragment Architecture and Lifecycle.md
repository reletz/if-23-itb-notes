---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Fragment Architecture and Lifecycle
>
> > ## Questions/Cues
> >
> > - Mengapa Fragment disebut "microactivity"?
> > - Bagaimana hubungan lifecycle Fragment dengan Activity?
> > - Langkah implementasi dasar Fragment AndroidX
> > - Perbedaan Fragment dengan Activity dalam UI
> > - Kapan harus menggunakan Fragment vs Activity?
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Pages 18-22, 28)
>
> > ### Definisi dan Konsep Dasar Fragment
> >
> > Fragment merupakan komponen UI yang merepresentasikan sebagian antarmuka pengguna atau perilaku dalam sebuah Activity. Istilah "microactivity" digunakan karena Fragment memiliki lifecycle sendiri namun harus selalu berada dalam konteks Activity sebagai host-nya. Tidak seperti Activity yang berdiri sendiri, Fragment dirancang untuk modularitas dan reuseabilitas antarmuka pengguna.
> >
> > Contoh penggunaan umum Fragment termasuk:
> >
> > - Membuat tampilan responsif untuk perangkat tablet (misal: menampilkan daftar item dan detail bersebelahan)
> > - Mengelola bagian UI yang kompleks secara terpisah
> > - Membuat antarmuka dinamis yang dapat diubah saat runtime
> >
> > ### Siklus Hidup Fragment
> >
> > Lifecycle Fragment terkait erat dengan Activity host-nya namun memiliki beberapa tahapan tambahan:
> >
> > 1. **onAttach()**: Fragment terhubung ke Activity
> > 2. **onCreate()**: Inisialisasi komponen esensial
> > 3. **onCreateView()**: Menginflate layout UI
> > 4. **onViewCreated()**: Setup tampilan setelah inflate
> > 5. **onStart()**: Fragment menjadi terlihat
> > 6. **onResume()**: Fragment aktif berinteraksi
> > 7. **onPause()**: Fragment mulai tidak aktif
> > 8. **onStop()**: Fragment tidak terlihat
> > 9. **onDestroyView()**: View dihancurkan
> > 10. **onDestroy()**: Fragment dihancurkan
> > 11. **onDetach()**: Fragment terlepas dari Activity
> >
> > Analogi: Bayangkan Fragment sebagai tanaman dalam pot (Activity). Saat pot dipindahkan (Activity pause/stop), tanaman juga terpengaruh, tetapi memiliki siklus hidup sendiri.
> >
> > ### Implementasi Fragment dengan AndroidX
> >
> > Gunakan AndroidX Fragment (`androidx.fragment.app.Fragment`) bukan versi platform yang sudah deprecated. Implementasi dasar:
> >
> > ```kotlin
> >
> > class DetailFragment : Fragment() {
> >
> > override fun onCreateView(
> >
> > inflater: LayoutInflater,
> >
> > container: ViewGroup?,
> >
> > savedInstanceState: Bundle?
> >
> > ): View? {
> >
> > // Inflate layout XML
> >
> > return inflater.inflate(R.layout.detail_fragment, container, false)
> >
> > }
> >
> > override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
> >
> > super.onViewCreated(view, savedInstanceState)
> >
> > // Setup UI components here
> >
> > }
> >
> > }
> >
> > ```
> >
> > Penting untuk menggunakan `onViewCreated()` daripada `onCreateView()` untuk inisialisasi komponen UI karena view sudah diinflate sepenuhnya.
> >
> > ### Fragment dan Manajemen UI
> >
> > Fragment mengelola bagian UI sendiri melalui metode `onCreateView()` yang mengembalikan root view. Keunggulan dibanding Activity:
> >
> > - **Reusabilitas**: Fragment yang sama dapat digunakan di multiple Activity
> > - **Modularitas**: Tiap bagian UI dikelola secara terpisah
> > - **Dinamis**: Dapat ditambah/dihapus saat runtime dengan FragmentTransaction
> >
> > Contoh praktis: Aplikasi e-commerce menggunakan Fragment terpisah untuk kategori produk, keranjang belanja, dan detail produk yang dapat dikombinasi berbeda di handphone vs tablet.

> [!cornell] #### Summary
>
> **Fragment** merupakan komponen UI modular yang berperan sebagai "microactivity" dengan lifecycle terkait Activity host-nya. **Lifecycle Fragment** memiliki tahapan khusus seperti `onAttach()` dan `onDetach()` yang mengatur hubungan dengan Activity. Implementasi wajib menggunakan **AndroidX Fragment** (`androidx.fragment.app.Fragment`) untuk kompatibilitas jangka panjang. Fragment ideal untuk membuat **UI responsif** yang dapat dikombinasikan ulang dan diubah saat runtime, berbeda dengan Activity yang lebih cocok untuk layar penuh independen.

> [!ad-libitum]- Additional Information
>
> #### Perbandingan Lifecycle Fragment dan Activity
>
> | Tahapan Fragment | Tahapan Activity | Keterangan |
>
> |------------------|------------------|------------|
>
> | onAttach()       | onCreate()       | Fragment terhubung ke Activity |
>
> | onViewCreated()  | onStart()        | UI siap berinteraksi |
>
> | onDestroyView()  | onStop()         | View dihancurkan tapi instance tetap |
>
> | onDetach()       | onDestroy()      | Fragment terlepas dari Activity |
>
> #### Optimasi Performa Fragment
>
> - Gunakan `setRetainInstance(true)` untuk mempertahankan instance saat perubahan konfigurasi (rotate device)
> - Hindari heavy operation di `onCreateView()`
> - Gunakan View Binding untuk akses view yang aman
>
> #### Edge Cases dan Batasan
>
> - Fragment tidak dapat eksis tanpa Activity
> - Komunikasi antar Fragment harus melalui Activity
> - Nested Fragment memiliki lifecycle kompleks
> - Back stack management memerlukan FragmentTransaction.addToBackStack()
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi dengan 3 Fragment berbeda (Daftar, Detail, Setting) dalam satu Activity
> 2. Implementasi komunikasi antar Fragment menggunakan ViewModel bersama
> 3. Eksperimen dengan FragmentTransaction untuk mengganti Fragment secara dinamis
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: Fragment Architecture
> - "Android Programming: The Big Nerd Ranch Guide" (Bab 10: Fragments)
> - Codelab Android: Advanced Fragment Usage
> - Library: Navigation Component untuk manajemen Fragment kompleks
>
> ```kotlin
>
> // Contoh implementasi ViewModel bersama
>
> class SharedViewModel : ViewModel() {
>
> val selectedItem = MutableLiveData<Item>()
>
> }
>
> class ListFragment : Fragment() {
>
> private val model: SharedViewModel by activityViewModels()
>
> fun onItemClick(item: Item) {
>
> model.selectedItem.value = item
>
> }
>
> }
>
> ```