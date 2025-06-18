---
type: Note
cssclasses:
  - cornell-notes
---
_Back To_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Definisi Paging?
> > - Keuntungan Paging?
> > - Cara Kerja Dasar Paging? (Frames & Pages)
> > - Apa itu Page Table?
> > - Masalah Fragmentasi Internal pada Paging?
> > - Contoh Kalkulasi Fragmentasi Internal?
> > - Trade-off Ukuran Page?
> > - Apa itu Frame Table?
> > - Dukungan Hardware: PTBR & PTLR?
> > - Masalah Kinerja Paging & Solusinya?
> > - Apa itu TLB?
> > - Cara Kerja TLB (Hit vs. Miss)?
> > - Peran ASID di TLB?
> > - Apa itu TLB Reach?
> > - Proteksi Memori pada Paging?
> > - Fungsi Bit Valid-Invalid?
> > - Masalah Ukuran Page Table?
> > - Struktur: Paging Berjenjang (Hierarchical)?
> > - Struktur: Page Table Hash?
> > - Struktur: Page Table Terbalik (Inverted)?
> >
> 
> >
> > ### Konsep Dasar Paging
> > Paging adalah sebuah teknik manajemen memori yang mengizinkan ruang alamat fisik sebuah proses untuk **bersifat non-kontigu (tidak berdekatan)**. Ini adalah solusi paling umum untuk mengatasi fragmentasi eksternal.
> > 
> > **Keuntungan Paging**
> > - **Menghilangkan Fragmentasi Eksternal:** Karena proses dapat ditempatkan di frame fisik mana pun yang tersedia, tidak perlu lagi mencari blok memori kosong yang berdekatan.
> > - **Menyederhanakan Alokasi:** Sistem tidak lagi berurusan dengan "lubang" memori yang ukurannya bervariasi.
> >
> > **Cara Kerja Dasar Paging**
> > - Memori Fisik (RAM) dibagi menjadi blok-blok berukuran tetap yang disebut **Frame**.
> > - Memori Logis (yang dilihat proses) juga dibagi menjadi blok-blok dengan ukuran yang sama persis, yang disebut **Page**.
> > - Ukuran Page/Frame biasanya merupakan pangkat 2, berkisar antara 512 byte hingga 16 MB.
> > - Ketika sebuah proses berukuran N _page_ akan dijalankan, sistem operasi harus mencari N _frame_ kosong di RAM dan memuat _page-page_ tersebut ke dalamnya.
> >
> >
> > Alamat logis yang dibikin CPU sekarang dibagi jadi dua bagian:
> > - Nomor Halaman (p - page number): Bagian depan alamat, dipakai buat nyari di tabel khusus.
> > - Offset Halaman (d - page offset): Bagian belakang alamat, nunjukin posisi di dalam halaman itu.
> > 
> > **Page Table**
> > Buat nerjemahin alamat logis (p, d) jadi alamat fisik (lokasi beneran di RAM), ada tabel khusus namanya page table (tabel halaman). Setiap program punya page table sendiri. Isinya: buat tiap nomor halaman (p) dari program itu, dia disimpan di nomor bingkai (f) mana di RAM. Jadi, MMU bakal:
> > 1. Ambil nomor halaman (p) dari alamat logis.
> > 2. Pakai 'p' buat nyari di page table dan dapetin nomor bingkai (f) yang sesuai.
> > 3. Gabungin nomor bingkai (f) itu sama offset (d) dari alamat logis. 
> > ![[Pasted image 20250609134546.png]]
> > ![[Pasted image 20250609134648.png]]
> >
> > Meskipun Paging menyelesaikan fragmentasi eksternal, ia masih menderita **fragmentasi internal**. Karena alokasi dilakukan per unit _frame_, jika ukuran proses bukanlah kelipatan pas dari ukuran _page_, maka _frame_ terakhir yang dialokasikan tidak akan terisi penuh. Ruang sisa di dalam _frame_ terakhir inilah yang menjadi fragmentasi internal.
> > Contoh Kalkulasi Fragmentasi Internal:
> > - Ukuran Page/Frame: 2.048 byte.
> > - Ukuran Proses: 72.766 byte.
> > - Proses membutuhkan `72.766 / 2.048 = 35,53` page. Ini berarti proses akan dialokasikan 36 _frame_.
> > - Memori yang digunakan pada frame terakhir: `72.766 - (35 * 2.048) = 1.086 byte`.
> > - Fragmentasi Internal: `2.048 (ukuran frame) - 1.086 (yang terpakai) = 962 byte`.
> > - Rata-rata fragmentasi internal adalah **1/2 ukuran page**.
> > 
> > Ukuran page yang kecil mungkin diinginkan untuk mengurangi fragmentasi internal rata-rata. Namun, setiap entri page table membutuhkan memori untuk dilacak, dan overhead ini berkurang seiring bertambahnya ukuran page. Juga, I/O disk lebih efisien ketika jumlah data yang ditransfer lebih besar. Umumnya, ukuran page telah meningkat seiring waktu. 
> > - Solaris mendukung dua ukuran page: 8 KB dan 4 MB. 
> > - Pada sistem x86-64, Windows 10 mendukung ukuran page 4 KB dan 2 MB. 
> > - Linux juga mendukung dua ukuran page: ukuran default (biasanya 4 KB) dan ukuran yang lebih besar yang bergantung pada arsitektur yang disebut huge pages. Ukuran page pada sistem Linux bervariasi tergantung arsitektur.
> >
> > **Frame Table**
> > - Sistem operasi harus mengetahui detail alokasi memori fisik, seperti frame mana yang dialokasikan, frame mana yang tersedia, dan berapa total frame yang ada. 
> > - Informasi ini umumnya disimpan dalam struktur data tunggal di seluruh sistem yang disebut frame table. 
> > - Tabel frame memiliki satu entri untuk setiap frame page fisik, menunjukkan apakah frame tersebut bebas atau dialokasikan, dan jika dialokasikan, ke page proses mana.
> > 
> > OS memelihara _salinan page table_ untuk _setiap proses_. Salinan ini digunakan oleh OS untuk menerjemahkan alamat logis ke fisik saat OS perlu memetakan alamat logis secara manual. Salinan ini juga digunakan oleh dispatcher CPU untuk menentukan page table perangkat keras ketika sebuah proses akan dialokasikan CPU. Paging dengan page table di memori utama meningkatkan waktu context switch.
> >
> > ### Dukungan Perangkat Keras (Hardware Support)
> > **Dukungan Hardware**
> > - Setiap proses memiliki penunjuk ke _page table_-nya yang disimpan di **Process Control Block (PCB)**.
> > - **Page-Table Base Register (PTBR):** Register CPU yang menunjuk ke alamat awal dari _page table_ aktif di memori.
> > - **Page-Table Length Register (PTLR):** Register yang menyimpan ukuran _page table_ untuk memvalidasi alamat.
> >
> > Menyimpan _page table_ di RAM berarti setiap akses memori oleh program memerlukan **dua kali akses ke RAM**: satu untuk mengambil entri dari _page table_, dan satu lagi untuk mengakses data itu sendiri. Ini memperlambat sistem secara signifikan. Solusinya adalah **TLB**.
> >
> > **Translation Look-Aside Buffer (TLB)**
> > - TLB adalah **cache perangkat keras yang kecil dan sangat cepat**, bersifat asosiatif, yang menyimpan terjemahan alamat yang baru saja digunakan.
> > - TLB ini kayak contekan cepat. Isinya pasangan: nomor page (kunci) dan nomor frame (nilai).
> > - Pas mau nerjemahin alamat, komputer cek dulu ke TLB. Kalau ada (ini namanya TLB hit), nomor frame langsung dapat, ngebut!
> > - Kalau nomor page-nya tidak ada di TLB (ini namanya TLB miss), baru komputer baca page table yang ada di RAM. Pasangan nomor page dan nomor frame ini terus dimasukin ke TLB.**
> >
> > **Cara Kerja TLB (Hit vs. Miss)**
> > - Saat CPU menghasilkan alamat logis, perangkat keras pertama-tama memeriksa TLB.
> > - **TLB Hit:** Jika pemetaan page-ke-frame ditemukan di TLB, alamat fisik langsung didapat. Proses ini sangat cepat.
> > - **TLB Miss:** Jika tidak ditemukan, perangkat keras akan mengakses _page table_ di RAM. Setelah pemetaan ditemukan, entri tersebut ditambahkan ke TLB untuk referensi di masa depan (menggantikan entri lama jika TLB penuh).
> >
> > **Address-Space Identifiers (ASID)** 
> > Beberapa TLB menyimpan ASID, yaitu nomor unik untuk setiap proses. Ini memungkinkan TLB untuk menyimpan entri dari beberapa proses secara bersamaan tanpa tercampur. Tanpa ASID, TLB harus **dibersihkan (_flushed_)** setiap kali terjadi _context switch_.
> > 
> >  **TLB Reach**
> >  Jumlah total memori yang dapat diakses melalui entri di TLB. Dihitung sebagai: `(Jumlah Entri TLB) x (Ukuran Page)`. Semakin besar TLB Reach, semakin kecil kemungkinan terjadinya TLB Miss.
> >  
> >  ### Proteksi
> >  ** Protection Bit**
> >  Proteksi dilakukan dengan **bit proteksi** yang disimpan di setiap entri _page table_.
> >  - Contoh paling umum adalah bit **Read/Write**. Upaya untuk menulis ke _page_ yang ditandai _read-only_ akan menyebabkan _trap_ ke sistem operasi.
> >  - Bisa diperluas untuk **Read-Only, Read-Write, Execute-Only**. _Upaya ilegal akan di-trap ke OS._
> > 
> >  **Valid/Invalid Bit**
> >  Setiap entri _page table_ juga memiliki bit ini.
> >  - **Valid (1):** Menandakan bahwa _page_ tersebut adalah bagian yang sah dari ruang alamat logis proses.
> >  - **Invalid (0):** Menandakan _page_ tersebut tidak berada dalam ruang alamat logis proses. Setiap akses ke _page_ yang ditandai _invalid_ akan menyebabkan _trap_.
> >
> > ### Struktur Page Table
> > Pada sistem 64-bit, ruang alamat logis sangat besar, yang dapat membuat _page table_ linear menjadi luar biasa besar (bisa berukuran Gigabyte atau lebih). Ini tidak praktis.  Satu solusi sederhana adalah membagi page table menjadi unit yang lebih kecil. Ini dapat dicapai dengan:
> > - **Paging Berjenjang (Hierarchical Paging):** Memecah _page table_ menjadi beberapa tingkatan. Alih-alih satu tabel besar, kita membuat "page dari page table". Misalnya, dalam skema dua tingkat, alamat logis dibagi menjadi tiga: indeks untuk _outer page table_, indeks untuk _inner page table_, dan _offset_. Ini menghemat ruang karena tabel tingkat dalam hanya dibuat jika benar-benar dibutuhkan.
> > - **Page Table Hash (Hashed Page Tables):** Nomor _page_ virtual di-_hash_ ke dalam sebuah _hash table_. Setiap entri di _hash table_ berisi _linked list_ dari elemen-elemen yang memiliki nilai _hash_ yang sama (untuk menangani kolisi). Efektif untuk ruang alamat yang _sparse_ (tidak semua alamat digunakan).
> > - **Page Table Terbalik (Inverted Page Tables):** Daripada memiliki satu _page table_ per proses, sistem hanya memiliki **satu _page table_ untuk seluruh memori fisik**. Setiap entri merepresentasikan satu _frame_ fisik dan berisi informasi tentang (`proses_ID`, `nomor_page`) yang menempatinya. Ini sangat menghemat memori untuk tabel, tetapi membuat pencarian menjadi lebih lambat karena harus mencari di seluruh tabel untuk menemukan _page_ milik sebuah proses.

> [!cornell] #### Summary
> Paging adalah teknik fundamental yang mengatasi fragmentasi eksternal dengan memungkinkan alokasi memori secara non-kontigu, namun memperkenalkan masalah baru yaitu fragmentasi internal dan overhead kinerja karena akses memori ganda. Untuk mengatasi kinerja, perangkat keras menyediakan _cache_ khusus bernama TLB yang mempercepat penerjemahan alamat. Untuk menangani masalah _page table_ yang membengkak pada arsitektur modern, digunakan struktur data canggih seperti Paging Berjenjang (Hierarchical), Page Table Hash, dan Page Table Terbalik (Inverted) yang masing-masing memiliki trade-off antara penggunaan memori dan kecepatan pencarian.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
>
> - **Detail Entri Page Table (PTE):** Sebuah entri _page table_ (PTE) pada sistem riil berisi lebih dari sekadar nomor _frame_. Bit-bit umum di dalamnya meliputi: 
 > 	  - **Present/Valid Bit:** Menandakan apakah _page_ ada di memori fisik.
 > 	  - **Frame Number:** Alamat fisik dari _frame_ tempat _page_ disimpan.
 > 	  - **Protection Bits:** Mengontrol akses (Read, Write, Execute).
 > 	  - **Modified/Dirty Bit:** Disetel oleh _hardware_ jika _page_ telah ditulis. Penting untuk _page replacement_.
 > 	  - **Referenced Bit:** Disetel oleh _hardware_ jika _page_ telah diakses (dibaca atau ditulis). Digunakan oleh algoritma _page replacement_.
 > 	  - **Caching Disabled Bit:** Mengizinkan OS untuk menonaktifkan _caching_ pada _page_ tertentu, penting untuk I/O yang dipetakan ke memori.
 >
 > - **Huge Pages dalam Praktik:** Dukungan untuk ukuran _page_ yang lebih besar (misal, 2MB atau 1GB, disebut _Huge Pages_) sangat penting untuk aplikasi performa tinggi seperti database, virtualisasi, dan komputasi saintifik. Dengan menggunakan satu _page_ besar, satu entri TLB dapat memetakan area memori yang jauh lebih besar, secara drastis mengurangi _TLB miss_ dan meningkatkan kinerja. Namun, risikonya adalah pemborosan memori yang lebih besar karena fragmentasi internal.
 > - **Koherensi TLB (TLB Shootdown):** Pada sistem multiprosesor, setiap inti CPU memiliki TLB-nya sendiri. Jika satu inti mengubah pemetaan alamat di _page table_ (misalnya, memindahkan _page_), entri TLB yang usang di inti lain harus dibatalkan. Proses mengirimkan _inter-processor interrupt_ untuk memaksa inti lain membersihkan entri TLB mereka disebut **TLB Shootdown**, sebuah operasi yang cukup memakan biaya.
 > #### Sumber & Referensi Lanjutan:
 > - **Dokumentasi Pengembang Intel/AMD:** Untuk detail implementasi _paging_ dan struktur PTE yang sesungguhnya, sumber terbaik adalah manual arsitektur dari Intel® 64 and IA-32 Architectures atau AMD64 Architecture.
 > - **Laman `man` di Linux:** `man 5 proc` akan memberikan informasi tentang sistem file `/proc` di Linux, di mana Anda bisa melihat file seperti `/proc/[pid]/maps` dan `/proc/[pid]/pagemap` untuk memeriksa pemetaan memori dari proses yang sedang berjalan.
 >
 > #### Eksplorasi Mandiri:
 > Pada sistem Linux, jalankan program apa pun. Dapatkan ID Prosesnya (PID) dengan `ps aux | grep nama_program`. Kemudian, jalankan perintah `cat /proc/[PID]/maps`. Anda akan melihat bagaimana sistem operasi menata ruang alamat virtual dari proses tersebut, membaginya menjadi segmen-segmen untuk kode, data, _heap_, _stack_, dan _library_ yang dipetakan. Ini memberikan gambaran nyata dari konsep ruang alamat logis.