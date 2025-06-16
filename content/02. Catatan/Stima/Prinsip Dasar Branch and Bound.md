---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]
> [!cornell] Topic
> > - Tinjauan Algoritma Pencarian?
> > - Esensi Branch & Bound (B&B)?
> > - Perbandingan Detail: B&B vs. Backtracking?
> > - Mekanisme Fungsi Pembatas (Pruning)?
> > - Konsep Inti: Least Cost Search?
> > - Pseudocode Algoritma B&B?
> > - Studi Kasus 1: N-Queens Problem?
> > - Studi Kasus 2: 15-Puzzle Problem?
> > - Peran Kunci Fungsi Heuristik `ĉ(i)`?
> > - Teorema Solvabilitas 15-Puzzle?
> 
> >  ### Tinjauan Algoritma Pencarian
> >  Sebelum memahami B&B, penting untuk mengetahui dasar-dasar algoritma pencarian solusi dalam pohon ruang status
> >  
> > - **BFS (Breadth-First Search):** Menjelajahi simpul level-demi-level. 
> > 	- **Kelebihan:** Menjamin penemuan solusi dengan langkah (lintasan) minimum. 
> > 	- **Kelemahan:** Membutuhkan ruang memori yang bisa tumbuh secara eksponensial karena harus menyimpan semua simpul pada satu level.
> > - **DFS (Depth-First Search):** Menjelajahi satu cabang sedalam mungkin sebelum mundur (backtrack). 
> > 	- **Kelebihan:** Umumnya lebih efisien dari segi memori. 
> > 	- **Kelemahan:** Lintasan yang ditemukan bisa sangat panjang dan tidak optimal. Jika pohon memiliki kedalaman tak terhingga, DFS bisa terjebak dan tidak pernah menemukan solusi.
> > - **DLS (Depth-Limited Search):** Modifikasi dari DFS yang diberi batas kedalaman maksimum untuk mencegah penjelajahan tak terbatas. 
> > 	- **Kelemahan:** Solusi mungkin tidak akan ditemukan jika berada di luar batas kedalaman yang ditentukan.
> > - **IDS (Iterative Deepening Search):** Menggabungkan kelebihan BFS dan DFS. Ia melakukan serangkaian DLS dengan batas kedalaman yang terus meningkat (1, 2, 3, ...).
> > - **Backtracking:** Sebuah penyempurnaan dari DFS. Ia hanya akan memperluas (menjelajahi) sebuah simpul jika arah tersebut "menjanjikan" (memenuhi fungsi pembatas). Jika tidak, ia langsung mundur dan mencoba jalur lain, secara efektif memangkas cabang pencarian.
> > 
> > ### Esensi Branch & Bound (B&B)
> >   - B&B adalah algoritma yang dirancang secara spesifik untuk **persoalan optimisasi**. Tujuannya adalah untuk menemukan solusi yang **meminimalkan atau memaksimalkan** sebuah fungsi objektif, sambil tetap mematuhi semua batasan (*constraints*) yang ada.
> >   - B&B dapat dipandang sebagai perpaduan cerdas antara strategi **BFS** dan pencarian berbasis biaya yang disebut **Least Cost Search**.
> >   - Berbeda dengan BFS yang berekspansi berdasarkan urutan (FIFO), B&B memberikan sebuah **nilai *cost* (biaya)** pada setiap simpul, yang dinotasikan sebagai `ĉ(i)`. Nilai ini adalah *taksiran* nilai lintasan termurah (untuk kasus minimasi) menuju simpul tujuan yang melalui simpul `i`.
> > 
> > ### Perbandingan Detail: B&B vs. Backtracking
> > - **Persamaan:** Keduanya adalah teknik pencarian solusi yang bekerja dengan membangun pohon ruang status dan melakukan "pemangkasan" (*pruning*) pada simpul-simpul yang dianggap tidak akan mengarah ke solusi yang valid atau optimal.
> > - **Perbedaan:**
> > 	1.  **Sifat Persoalan:** Backtracking lebih umum digunakan untuk persoalan non-optimisasi (misalnya, menemukan *semua* konfigurasi N-Ratu), sementara B&B dikhususkan untuk persoalan optimisasi (misalnya, menemukan *rute terpendek* dalam TSP).
> > 	2.  **Penentuan Batas (Bound):** Pada B&B, perhitungan nilai batas (ongkos terendah atau keuntungan tertinggi) untuk setiap solusi parsial adalah komponen yang **eksplisit dan fundamental**. Ini sering kali melibatkan kombinasi ongkos yang sudah dikeluarkan dan taksiran ongkos di masa depan. Pada Backtracking, batasannya lebih implisit, seringkali hanya berupa pengecekan "apakah langkah ini valid?".
> > 	3.  **Pembangkitan Simpul:** Backtracking hampir selalu menggunakan strategi **DFS**. Sebaliknya, B&B menggunakan aturan pemilihan simpul yang lebih fleksibel, dengan yang paling umum adalah **aturan *best-first*** (memilih simpul dengan *cost* terbaik/terkecil untuk minimasi, atau terbesar untuk maksimasi).
> > 
> > ** Tabel Perbandingan **
> > 
> > |Aspek|Backtracking|Branch and Bound (B&B)|
> > |:--|:--|:--|
> > |**Tujuan Utama**|Menemukan semua solusi yang valid|Menemukan satu solusi optimal|
> > |**Tipe Masalah**|Constraint Satisfaction (pemenuhan batasan)|Optimization (optimasi)|
> > |**Basis Pruning**|Melanggar **batasan/constraint**|Tidak mungkin lebih baik dari **solusi terbaik saat ini**|
> > |**Membutuhkan**|Aturan/batasan yang jelas|Fungsi pembatas (_bounding function_) untuk estimasi|
> >
> > 
> > ### Mekanisme Fungsi Pembatas (Pruning)
> >   - *Pruning* adalah strategi B&B untuk mengabaikan seluruh cabang dari pohon pencarian, sehingga menghemat waktu komputasi secara signifikan. Sebuah jalur dipangkas berdasarkan kriteria berikut:
> >     1.  **Nilai Simpul Kalah dari Solusi Terbaik:** Taksiran nilai *cost* dari simpul saat ini tidak lebih baik dari nilai solusi terbaik yang sudah ditemukan sejauh ini (*the best solution so far*). Misalnya, jika kita sudah punya rute dengan total ongkos 28, semua simpul hidup yang taksiran ongkosnya > 28 akan langsung dimatikan.
> >     2.  **Simpul Tidak Feasible:** Simpul tersebut merepresentasikan solusi parsial yang melanggar batasan persoalan. Contoh: dalam Knapsack Problem, total berat barang sudah melebihi kapasitas knapsack.
> >     3.  **Solusi Parsial Tidak Dapat Diperluas:** Solusi pada simpul tersebut hanya terdiri dari satu titik (solusi lengkap telah tercapai di simpul itu). Nilai fungsi objektifnya kemudian dibandingkan dengan solusi terbaik saat ini untuk memperbarui jika perlu.
> > 
> > ### Konsep Inti: Least Cost Search
> >  Ini adalah aturan main dalam B&B untuk memilih simpul berikutnya yang akan diekspansi (disebut *simpul-E*). Dari semua simpul yang "hidup" (yang sudah dibangkitkan tapi belum diekspansi), B&B akan memilih simpul yang memiliki **nilai cost `ĉ(i)` paling kecil** (dalam kasus minimasi). Ini adalah pendekatan yang optimis, karena algoritma selalu mencoba jalur yang *tampak* paling murah terlebih dahulu.
> > 
> > - **Pseudocode Algoritma B&B (Deskripsi Langkah demi Langkah):**
> >   1. Masukkan simpul akar ke dalam antrian `Q`. Jika simpul akar adalah simpul solusi (*goal node*), solusi ditemukan. Stop jika hanya satu solusi yang diinginkan.
> >   2. Jika `Q` kosong, maka pencarian selesai (tidak ada solusi lagi). Stop.
> >   3. Jika `Q` tidak kosong, pilih dari antrian `Q` simpul `i` yang mempunyai nilai cost `ĉ(i)` **paling kecil** (untuk kasus minimasi). Jika ada beberapa simpul dengan cost yang sama, pilih sembarang.
> >   4. Jika simpul `i` adalah simpul solusi, maka solusi ditemukan. Catat solusi ini. Pada persoalan optimasi, periksa *cost* semua simpul hidup lainnya di `Q`; jika *cost*-nya lebih besar dari *cost* simpul solusi yang baru ditemukan ini, matikan simpul-simpul tersebut (*pruning*).
> >   5. Jika simpul `i` bukan simpul solusi, bangkitkan semua anak-anaknya. Jika `i` tidak punya anak, kembali ke langkah 2.
> >   6. Untuk setiap anak `j` dari simpul `i`, hitung nilai *cost*-nya (`c(j)`), dan masukkan semua anak tersebut ke dalam antrian `Q`.
> >   7. Kembali ke langkah 2.
> >
> >### Studi Kasus
> > - **Studi Kasus 1: N-Queens Problem:**
> >   - **Tantangan:** Menempatkan N ratu pada papan catur NxN sehingga tidak ada dua ratu yang berada di baris, kolom, atau diagonal yang sama.
> >   - **Pendekatan B&B:** Simpul hidup yang menjadi *simpul-E* (untuk diekspansi) adalah yang memiliki *cost* terkecil. Untuk kasus ideal N-Ratu, kita bisa mengasumsikan panjang lintasan solusi diketahui (misal, 4 untuk 4-Ratu). *Cost* bisa didefinisikan sebagai panjang lintasan dari simpul tersebut ke simpul solusi terdekat. Pohon dibangun menggunakan *priority queue* untuk menyimpan simpul hidup, dan simpul dengan *cost* terkecil diekspansi. Dalam contoh materi, solusi untuk 4-Ratu ditemukan pada **simpul 30**.
> > 
> > - **Studi Kasus 2: 15-Puzzle Problem:**
> >   - **Tantangan:** Menyusun ubin bernomor 1-15 dalam kotak 4x4 dengan satu ruang kosong untuk mencapai konfigurasi target. Terdapat ~20.9 triliun susunan, namun hanya separuhnya yang bisa dicapai dari status awal tertentu.
> >   - **Fungsi Cost Heuristik `ĉ(i) = f(P) + g(P)`:** Ini adalah kunci penyelesaiannya.
> >     - `f(P)`: Ongkos **pasti** dari simpul akar ke simpul P (yaitu, kedalaman simpul atau jumlah gerakan yang sudah dilakukan).
> >     - `g(P)`: Ongkos **taksiran/heuristik** dari simpul P ke simpul tujuan. Ini bisa dihitung sebagai jumlah ubin yang salah tempat (*misplaced tiles*) atau total jarak Manhattan (jumlah pergeseran baris & kolom untuk setiap ubin ke posisi seharusnya).
> >   - **Proses:** B&B akan selalu memilih simpul dengan nilai `ĉ(i)` terkecil. Contoh perhitungan dari materi: `C(4) = f(4) + g(4) = 1 (gerakan) + 2 (ubin salah tempat) = 3`. Karena C(4) adalah yang terkecil, simpul 4 diekspansi selanjutnya. Solusi dalam contoh ditemukan pada **simpul 23**.
> > 
> > - **Teorema Solvabilitas 15-Puzzle:**
> >   - Sebuah status tujuan hanya dapat dicapai dari status awal jika nilai **Σ(KURANG(i)) + X** bernilai **genap**.
> >     - **KURANG(i):** Banyaknya ubin bernomor `j` sedemikian sehingga `j < i` dan `POSISI(j) > POSISI(i)`. Ini menghitung berapa banyak ubin yang lebih kecil dari `i` tetapi muncul setelah `i` dalam urutan baca (kiri-ke-kanan, atas-ke-bawah).
> >     - **X:** Bernilai 1 jika sel kosong berada di baris genap (dihitung dari 1), dan 0 jika di baris ganjil (dengan asumsi baris diarsir adalah baris genap). Teorema ini sangat kuat untuk *pruning* di awal.
> > 
> > - **Peran Kunci Fungsi Heuristik `ĉ(i)`:**
> >   - Pada umumnya, letak simpul solusi tidak diketahui (tidak seperti kasus ideal N-Ratu). Untuk persoalan seperti 15-Puzzle, Knapsack, atau TSP, `ĉ(i)` adalah **estimasi ongkos termurah (batas bawah)** dari simpul `i` ke simpul solusi yang tidak diketahui letaknya. Nilai ini dihitung secara **heuristik**, dan kualitas heuristik inilah yang menentukan seberapa cepat B&B akan menemukan solusi optimal.
 
> > [!cornell] #### Summary:
> > Algoritma Branch & Bound adalah sebuah kerangka kerja fundamental untuk persoalan optimisasi yang secara metodis membangun pohon ruang status dan menggunakan strategi *Least Cost Search* untuk memprioritaskan penjelajahan simpul yang paling menjanjikan. Kekuatan utamanya terletak pada perhitungan *cost* heuristik (`ĉ(i)`) yang berfungsi sebagai batas bawah (atau atas) dan mekanisme *pruning* yang secara agresif memangkas cabang pencarian yang tidak *feasible* atau terbukti tidak akan menghasilkan solusi yang lebih baik dari yang sudah ditemukan, memastikan penemuan solusi optimal dengan cara yang jauh lebih efisien daripada pencarian brute-force.

> [!ad-libitum] Pendalaman Teknis
> #### Aspek Teknis Lanjutan:
> - __Hubungan Erat dengan Algoritma A_ (A-star):_* Metode B&B yang menggunakan fungsi cost c^(P)=f(P)+gˉ​(P) pada dasarnya adalah implementasi dari algoritma pencarian heuristik yang sangat terkenal bernama __A_ (A-star)_*. Dalam terminologi A*, `f(P)` adalah _path-cost_ (biaya yang sudah diketahui dari awal ke simpul P), dan `g(P)` adalah fungsi _heuristik_. A* adalah salah satu algoritma pencarian lintasan terpendek yang paling efisien dan banyak digunakan, misalnya dalam _pathfinding_ pada video game.
> - **Kunci Optimalitas: Heuristik yang _Admissible_:** Untuk menjamin bahwa B&B/A* menemukan solusi yang benar-benar optimal (ongkos termurah), fungsi heuristik `g(P)` harus bersifat _**admissible**_ (dapat diterima). Sebuah heuristik disebut _admissible_ jika nilainya **tidak pernah melebih-lebihkan** ongkos sebenarnya untuk mencapai tujuan.
> - _Contoh:_ Pada 15-Puzzle, heuristik "jumlah ubin yang salah tempat" adalah _admissible_ karena setiap ubin yang salah tempat pasti membutuhkan setidaknya satu gerakan untuk dibenarkan. Heuristik "Manhattan distance" juga _admissible_ dan umumnya lebih baik (lebih informatif) karena memberikan estimasi yang lebih ketat. Heuristik yang tidak _admissible_ dapat membuat algoritma menemukan solusi sub-optimal dengan lebih cepat.
> 
> - **Dasar Matematis Teorema Solvabilitas 15-Puzzle:** Teorema `Σ(KURANG(i)) + X` berakar pada konsep matematika **paritas permutasi**
> 	- `Σ(KURANG(i))` menghitung jumlah total **inversi** dalam susunan ubin. Sebuah inversi adalah sepasang ubin `(a, b)` di mana `a > b` tetapi `a` muncul sebelum `b` dalam urutan baca.
> 	- Setiap gerakan geser ubin akan mengubah jumlah inversi ini dengan angka ganjil.
> 	- Posisi `X` (baris ganjil/genap dari sel kosong) juga memengaruhi paritas total dari sistem. Konfigurasi hanya dapat diselesaikan jika paritas status awal sama dengan paritas status akhir. Ini memungkinkan kita untuk secara instan membuang separuh dari seluruh kemungkinan status sebagai _unsolvable_.
> #### Sumber & Referensi Lanjutan:
>
>- **Buku:**
>   - **"Artificial Intelligence: A Modern Approach"** oleh Stuart Russell dan Peter Norvig: Dianggap sebagai "kitab suci" AI, buku ini memiliki bab-bab yang sangat mendalam mengenai pencarian heuristik, algoritma A*, dan pengembangan fungsi heuristik.
>  - **"Introduction to Algorithms"** oleh CLRS (Cormen, Leiserson, Rivest, Stein): Untuk pendalaman tentang struktur data yang mendukung B&B, terutama **Antrian Prioritas (Priority Queue)** dan implementasinya menggunakan **Heap**.
>  - **Visualisasi Online:** Cari "A* Pathfinding Visualization" atau "15-Puzzle Solver Visualization" di internet. Banyak situs web interaktif yang memungkinkan Anda untuk melihat secara visual bagaimana algoritma menjelajahi simpul, memilih jalur dengan _cost_ terendah, dan melakukan _pruning_.
>
> #### Eksplorasi Mandiri:
>- **Implementasi Solver 15-Puzzle:** Cobalah untuk membuat program solver 15-Puzzle sendiri menggunakan Python. Tantangan utamanya adalah mengelola daftar simpul hidup (_live nodes_ atau "open set") secara efisien. Gunakan modul `heapq` di Python untuk mengimplementasikan antrian prioritas (_min-heap_) yang akan selalu memberikan Anda simpul dengan nilai c^(P) terkecil
>- **Eksperimen Heuristik:** Dalam program solver Anda, implementasikan dua fungsi heuristik yang berbeda: (1) `misplaced_tiles` dan (2) `manhattan_distance`. Jalankan solver pada beberapa puzzle awal yang sama menggunakan kedua heuristik tersebut. Catat dan bandingkan **jumlah simpul yang diekspansi** untuk setiap kasus. Anda akan melihat secara langsung bagaimana heuristik yang lebih baik (Manhattan distance) secara drastis mengurangi jumlah pekerjaan yang harus dilakukan algoritma. 
> 