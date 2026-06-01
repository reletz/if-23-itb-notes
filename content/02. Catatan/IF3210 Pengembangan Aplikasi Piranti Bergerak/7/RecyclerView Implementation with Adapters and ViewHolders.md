---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] RecyclerView Implementation with Adapters and ViewHolders
>
> > ## Questions/Cues
> >
> > - Mengapa RecyclerView lebih efisien daripada ListView?
> > - Peran Adapter dalam mengelola data RecyclerView
> > - Bagaimana ViewHolder mengoptimalkan penggunaan memori?
> > - Langkah implementasi dasar RecyclerView
> > - Fungsi onBindViewHolder vs onCreateViewHolder
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Pages 46-54)
>
> > ### Konsep Dasar RecyclerView
> >
> > RecyclerView adalah komponen Android untuk menampilkan kumpulan data dalam bentuk daftar yang dapat di-scroll. Berbeda dengan pendahulunya (ListView), RecyclerView menggunakan pola desain "ViewHolder" yang **secara otomatis mendaur ulang sel-sel tampilan** yang keluar dari layar, sehingga lebih efisien dalam penggunaan memori dan performa. Mekanisme ini mirip dengan sistem daur ulang buku catatan: alih-alih membuat halaman baru setiap kali, kita menulis ulang halaman yang sudah tidak terlihat dengan data baru.
> >
> > Contoh penggunaan khas RecyclerView termasuk daftar kontak, timeline media sosial, atau katalog produk. Keunggulan utamanya terletak pada kemampuannya menangani dataset besar tanpa membebani memori, karena hanya membuat tampilan untuk item yang terlihat di layar (+ beberapa buffer), bukan untuk seluruh dataset.
> >
> > ### Arsitektur Adapter
> >
> > Adapter bertindak sebagai **jembatan antara data dan tampilan** dalam RecyclerView. Tugas utamanya meliputi:
> >
> > 1. Menentukan jumlah item (`getItemCount()`)
> > 2. Membuat ViewHolder baru (`onCreateViewHolder()`)
> > 3. Mengikat data ke ViewHolder yang ada (`onBindViewHolder()`)
> >
> > Analogi sederhana: Adapter seperti kurator museum yang memutuskan berapa banyak lukisan yang ditampilkan (itemCount), menyiapkan bingkai baru (onCreateViewHolder), dan memasang lukisan tertentu ke bingkai yang tersedia (onBindViewHolder).
> >
> > Contoh implementasi dasar:
> >
> > ```kotlin
> >
> > class NumberAdapter(private val numbers: List<Int>) :
> >
> > RecyclerView.Adapter<NumberAdapter.ViewHolder>() {
> >
> > class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
> >
> > val textView: TextView = view.findViewById(R.id.number)
> >
> > }
> >
> > override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
> >
> > val view = LayoutInflater.from(parent.context)
> >
> > .inflate(R.layout.item_number, parent, false)
> >
> > return ViewHolder(view)
> >
> > }
> >
> > override fun onBindViewHolder(holder: ViewHolder, position: Int) {
> >
> > holder.textView.text = numbers[position].toString()
> >
> > }
> >
> > override fun getItemCount() = numbers.size
> >
> > }
> >
> > ```
> >
> > ### Pola ViewHolder
> >
> > ViewHolder berfungsi sebagai **wadah referensi ke elemen UI** dalam satu item daftar. Dengan menyimpan referensi view, kita menghindari pencarian berulang (`findViewById`) saat mengikat data baru, yang secara signifikan meningkatkan performa scroll.
> >
> > Proses daur ulang bekerja sebagai berikut:
> >
> > 1. Saat item scroll keluar layar, ViewHolder-nya masuk "kolam daur ulang"
> > 2. Ketika item baru akan muncul, RecyclerView meminjam ViewHolder dari kolam
> > 3. `onBindViewHolder()` mengupdate isi ViewHolder dengan data baru
> >
> > Contoh praktis: Jika layar hanya menampilkan 10 item sekaligus, RecyclerView hanya akan membuat ~13 ViewHolder (10 terlihat + 3 buffer), meskipun dataset berisi 1000 item.
> >
> > ### Implementasi Dasar RecyclerView
> >
> > Langkah-langkah penyiapan:
> >
> > 1. Tambahkan dependensi di build.gradle:
> >
> > ```gradle
> >
> > implementation 'androidx.recyclerview:recyclerview:1.3.2'
> >
> > ```
> >
> > 2. Tambahkan RecyclerView ke layout XML:
> >
> > ```xml
> >
> > <androidx.recyclerview.widget.RecyclerView
> >
> > android:id="@+id/rvNumbers"
> >
> > android:layout_width="match_parent"
> >
> > android:layout_height="match_parent"/>
> >
> > ```
> >
> > 3. Siapkan layout untuk item individual (item_number.xml)
> > 4. Buat Adapter dan ViewHolder seperti contoh sebelumnya
> > 5. Hubungkan ke Activity:
> >
> > ```kotlin
> >
> > val recyclerView = findViewById<RecyclerView>(R.id.rvNumbers)
> >
> > recyclerView.layoutManager = LinearLayoutManager(this)
> >
> > recyclerView.adapter = NumberAdapter((1..100).toList())
> >
> > ```
> >
> > Penting untuk mengatur LayoutManager karena RecyclerView tidak memiliki pengaturan layout default. Beberapa pilihan LayoutManager:
> >
> > - `LinearLayoutManager`: Daftar vertikal/horizontal
> > - `GridLayoutManager`: Tampilan grid
> > - `StaggeredGridLayoutManager`: Grid dengan item variabel

> [!cornell] #### Summary
>
> **RecyclerView** merupakan komponen efisien untuk menampilkan dataset besar dengan menerapkan pola **ViewHolder** yang mendaur ulang tampilan keluar layar. **Adapter** berfungsi sebagai penghubung antara data dan tampilan melalui tiga metode inti: `getItemCount`, `onCreateViewHolder`, dan `onBindViewHolder`. Implementasi dasar memerlukan penyiapan **layout item**, pembuatan **kelas Adapter**, dan pengaturan **LayoutManager**. Performa optimal dicapai dengan meminimalkan operasi berat di `onBindViewHolder` dan menggunakan pola ViewHolder dengan benar.

> [!ad-libitum]- Additional Information
>
> #### Optimisasi dengan DiffUtil
>
> Untuk update dataset yang efisien, gunakan `DiffUtil` yang menganalisis perubahan item:
>
> ```kotlin
>
> val diffResult = DiffUtil.calculateDiff(object : DiffUtil.Callback() {
>
> override fun getOldListSize() = oldList.size
>
> override fun getNewListSize() = newList.size
>
> override fun areItemsTheSame(oldPos: Int, newPos: Int) =
>
> oldList[oldPos].id == newList[newPos].id
>
> override fun areContentsTheSame(oldPos: Int, newPos: Int) =
>
> oldList[oldPos] == newList[newPos]
>
> })
>
> diffResult.dispatchUpdatesTo(adapter)
>
> ```
>
> Ini menghasilkan animasi perubahan otomatis dan hanya mengupdate item yang berubah.
>
> #### Berbagai Jenis LayoutManager
>
> 1. **LinearLayoutManager**: Tampilan daftar linear (vertical/horizontal)
> 2. **GridLayoutManager**: Tampilan grid dengan jumlah kolom tetap
> 3. **StaggeredGridLayoutManager**: Grid dengan tinggi/lebar item variabel
> 4. **Custom LayoutManager**: Implementasi khusus untuk efek scroll unik
>
> #### Animasi Item
>
> Tambahkan animasi default atau kustom dengan:
>
> ```kotlin
>
> recyclerView.itemAnimator = DefaultItemAnimator()
>
> // Atau animasi kustom
>
> recyclerView.itemAnimator = CustomItemAnimator()
>
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasi RecyclerView dengan multiple view types (contoh: chat dengan bubble berbeda untuk pengirim/penerima)
> 2. Tambahkan swipe-to-dismiss dengan `ItemTouchHelper`
> 3. Buat efek scroll parabolic dengan custom LayoutManager
>
> #### Bacaan Lanjutan
>
> - Dokumen Resmi: [RecyclerView Android Developers](https://developer.android.com/guide/topics/ui/layout/recyclerview)
> - Buku: "Android Programming: The Big Nerd Ranch Guide" (Bab 9)
> - Video: "Advanced RecyclerView" (Android Developers YouTube)