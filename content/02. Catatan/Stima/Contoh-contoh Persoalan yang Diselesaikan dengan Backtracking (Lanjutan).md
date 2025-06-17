---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2211 Strategi Algoritma]]

> [!cornell] Contoh-contoh Persoalan yang Diselesaikan dengan Backtracking (Lanjutan)
> 
> > ## Questions/Cues
> > 
> > - Persoalan Pewarnaan Graf
> > - Aplikasi Pewarnaan Graf
> > - Solusi Pewarnaan Graf
> > - Pohon Ruang Status Pewarnaan Graf
> > - Fungsi Pembatas Pewarnaan Graf
> > - Algoritma Pewarnaan Graf (Prinsip)
> > - Kompleksitas Waktu Pewarnaan Graf
> > - Persoalan Sirkuit Hamilton
> > - Solusi Sirkuit Hamilton
> > - Kriteria Simpul Sirkuit Hamilton
> > - Algoritma Sirkuit Hamilton (Prinsip)
> > - Persoalan Labirin
> > - Gerakan Labirin
> > - Prioritas Gerakan Labirin
> > - Solusi Labirin
> > - Fungsi Pembatas Labirin
> > - Pohon Pencarian Labirin
> 
> > ### Contoh-contoh Persoalan yang Diselesaikan dengan Backtracking (Lanjutan)
> > 
> > 3. **Pewarnaan Graf (Graph Colouring):**
> >     
> >     - **Persoalan:** Diberikan sebuah graf G dengan n simpul dan m buah warna yang tersedia. Tujuannya adalah mewarnai semua simpul sedemikian rupa sehingga **tidak ada dua simpul yang bertetangga (terhubung langsung) memiliki warna yang sama**. Tidak semua m warna harus digunakan.
> >     - **Contoh Aplikasi:** Salah satu aplikasi klasik adalah pewarnaan peta, di mana negara-negara yang bertetangga tidak boleh memiliki warna yang sama agar mudah dibedakan.
> >     - **Solusi:** Solusi dinyatakan sebagai vektor X=(x1​,x2​,...,xn​), di mana xi​ adalah **warna yang diberikan untuk simpul ke-i**. Warna biasanya direpresentasikan dengan angka (misalnya, 1, 2, ..., m).
> >     - **Pohon Ruang Status:** Untuk n simpul dan m warna, pohon ruang statusnya adalah **pohon m-ary dengan tinggi n**. Ini berarti setiap simpul pada level i (saat kita sedang memutuskan warna untuk simpul i) dapat memiliki m anak, yang sesuai dengan m kemungkinan warna (1 sampai m) untuk simpul tersebut.
> >     - **Fungsi Pembatas (Bounding Function):** Fungsi ini memeriksa apakah warna xk​ (warna yang sedang dipertimbangkan untuk simpul k) **tidak sama dengan warna simpul-simpul tetangganya yang sudah diwarnai**. Jika ada tetangga yang warnanya sama, fungsi ini akan bernilai `false`, dan cabang tersebut dipangkas.
> >     - **Algoritma:** Pseudocode untuk algoritma rekursif `PewarnaanGraf(k)`. Algoritma ini dimulai dengan menginisialisasi array warna x (biasanya dengan 0, menandakan belum diwarnai) dan memanggil `PewarnaanGraf(1)`. Prosedur `PewarnaanGraf(k)` akan mencari warna untuk simpul ke-k. Di dalamnya, akan ada prosedur `WarnaiSimpul(k)` yang membangkitkan warna potensial (1 sampai m) untuk simpul k dan memeriksa validitasnya menggunakan fungsi pembatas. Jika warna valid ditemukan:
> >         - xk​ diisi dengan warna tersebut.
> >         - Jika k=n (semua simpul sudah berhasil diwarnai), maka solusi ditemukan dan dicetak.
> >         - Jika k<n, panggil rekursif `PewarnaanGraf(k + 1)` untuk mewarnai simpul berikutnya.
> >         - Jika tidak ada warna yang valid untuk simpul k setelah mencoba semua kemungkinan, xk​ bisa di-reset ke 0, dan proses runut-balik terjadi secara implisit.
> >     - **Kompleksitas Waktu:** Pohon ruang status memiliki jumlah simpul internal sekitar ∑i=0n−1​mi. Setiap simpul internal (yang melibatkan pemanggilan `WarnaiSimpul`) membutuhkan waktu O(mn) untuk memeriksa semua m kemungkinan warna terhadap hingga n tetangga. Total waktu kebutuhan algoritma diperkirakan dalam O(mn⋅(mn−1)/(m−1)), yang secara kasar adalah **O(nmn) untuk m>1**. Ini menunjukkan bahwa masalah ini bisa sangat kompleks jika jumlah warna atau simpul banyak.
> > 4. **Sirkuit Hamilton (Hamiltonian Circuit):**
> >     
> >     - **Persoalan:** Diberikan sebuah graf terhubung G dengan n simpul. Tujuannya adalah menemukan semua **sirkuit (siklus) Hamilton**, yaitu sebuah perjalanan yang **mengunjungi semua simpul tepat satu kali** dan **kembali lagi ke simpul awal**.
> >     - **Solusi:** Solusi dinyatakan sebagai vektor X=(x1​,x2​,...,xn​), di mana xi​ adalah **simpul ke-i dalam sirkuit Hamilton**. Jadi, x1​ adalah simpul awal, x2​ adalah simpul kedua yang dikunjungi, dan seterusnya.
> >     - **Pohon Ruang Status:** Pohon ruang status dimulai dari simpul awal yang ditentukan (misalnya, simpul 1). Setiap tingkat ke-k dalam pohon merepresentasikan **pemilihan simpul ke-k dalam lintasan/sirkuit** yang sedang dibangun.
> >     - **Algoritma:** Pseudocode untuk algoritma rekursif `SirkuitHamilton(k)`. Algoritma dimulai dengan menginisialisasi array x dengan x1​=1 (mulai dari simpul 1) dan lainnya 0, lalu memanggil `SirkuitHamilton(2)`. Prosedur `SirkuitHamilton(k)` mencari simpul ke-k dalam sirkuit. Di dalamnya, ada prosedur `SimpulBerikutnya(k)` yang bertugas membangkitkan simpul potensial berikutnya untuk xk​ dan memeriksa validitasnya. Simpul berikutnya xk​ harus memenuhi kriteria:
> >         
> >         1. Harus ada **sisi (edge) dari simpul sebelumnya** (xk−1​) ke simpul potensial xk​ (yaitu, `G[x_k-1, x_k]` bernilai `true`). Ini memastikan bahwa kedua simpul tersebut terhubung dalam graf.
> >         2. Simpul potensial xk​ **belum terdapat di dalam lintasan sebelumnya** (x1​,...,xk−1​). Ini memastikan setiap simpul hanya dikunjungi tepat satu kali.
> >         3. Jika k=n (artinya sudah mengunjungi semua n simpul), maka simpul terakhir xn​ harus **terhubung kembali ke simpul awal** (x1​) (yaitu, `G[x_n, 1]` bernilai `true`). Ini untuk menutup sirkuit. Jika simpul valid ditemukan oleh `SimpulBerikutnya`:
> >         
> >         - xk​ diisi dengan simpul tersebut.
> >         - Jika k=n (semua simpul dikunjungi dan kembali ke simpul 1), solusi sirkuit Hamilton ditemukan dan dicetak.
> >         - Jika k<n, panggil rekursif `SirkuitHamilton(k + 1)` untuk mencari simpul berikutnya. Jika `SimpulBerikutnya` tidak menemukan simpul valid (menghasilkan 0), xk​ menjadi 0, dan proses runut-balik terjadi.
> > 5. **Persoalan Labirin (Maze Problem - Contoh Soal UAS 2019):**
> >     
> >     - **Persoalan:** Mencari jalur dari titik Start (S) menuju titik Goal (G) dalam sebuah labirin berbentuk grid. Beberapa sel dalam labirin tidak bisa dilewati (ditandai arsiran). Kita hanya bisa bergerak ke 4 arah: east (timur), south (selatan), west (barat), north (utara). Jarak antar titik adalah 1 satuan.
> >     - **Contoh:** Titik S: (1,4), Titik G: (1,1).
> >     - **Prioritas Operasi:** Untuk pembangkitan gerakan, urutan prioritas biasanya ditentukan, misalnya: `east`, `south`, `west`, `north`. Ini mempengaruhi urutan penjelajahan cabang.
> >     - **Solusi:** Solusi dinyatakan sebagai vektor X=(x1​,x2​,...,xm​), di mana xi​ adalah **operasi (gerakan) yang dilakukan pada langkah ke-i**.
> >     - **Fungsi Pembangkit T():** Mencoba meng-assign xi​ dengan urutan prioritas yang telah ditentukan (east, south, west, north).
> >     - **Fungsi Pembatas B:** Memeriksa validitas gerakan saat ini. B bernilai `true` jika koordinat sel sekarang setelah gerakan tersebut **tidak melanggar kendala**:
> >         1. Belum mencapai **batas labirin** (misalnya, pada contoh (1,4) ke (4,1), batas bisa dianggap 1≤x≤4 dan 1≤y≤4).
> >         2. Tidak masuk ke dalam **sel yang diarsir** (sel yang tidak bisa dilewati).
> >         3. **Belum pernah mengunjungi sel yang sama sebelumnya** dalam lintasan saat ini. Ini sangat penting untuk menghindari siklus tak terbatas dan menemukan jalur yang sebenarnya. Jika B bernilai `false` (melanggar salah satu kendala), simpul dimatikan (pruned).
> >     - **Pohon Pencarian Jalur:** Dibangun dengan aturan DFS dan pemangkasan oleh fungsi pembatas. Setiap simpul menyatakan posisi (koordinat) saat itu, dan sisi merepresentasikan gerakan yang dilakukan. Nomor di dalam simpul dapat menunjukkan urutan pembangkitan simpul sesuai aturan DFS dan prioritas gerakan.
> >     - **Pencarian Berhenti:** Ketika sudah mencapai titik Goal (G).
> >     - **Contoh Solusi:** Untuk labirin yang diberikan, salah satu solusi yang ditemukan adalah serangkaian gerakan yang mengarah dari (1,4) ke (1,1), misalnya (south, east, south, south, west) yang mengarah ke (1,3) -> (2,3) -> (2,2) -> (2,1) -> (1,1).

> [!cornell] ### Summary
> Backtracking efektif untuk **Pewarnaan Graf** dengan menghindari warna sama pada simpul bertetangga, memanfaatkan pohon m-ary dan fungsi pembatas cek konflik warna yang dapat mengakibatkan kompleksitas O(nmn). Untuk **Sirkuit Hamilton**, algoritma menemukan siklus unik yang mengunjungi semua simpul sekali dan kembali ke awal, dengan fungsi pembatas memastikan konektivitas dan keunikan simpul. Terakhir, pada **Persoalan Labirin**, backtracking mencari jalur dari start ke goal, memangkas gerakan ilegal (luar batas, sel terlarang, kunjungan ulang) berdasarkan prioritas gerakan hingga tujuan tercapai.

---

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Aspek Teknis Lanjutan:
> 
> - **Optimasi Fungsi Pembatas:** Efisiensi algoritma backtracking sangat bergantung pada kualitas dan kekuatan fungsi pembatas. Semakin "pintar" fungsi pembatas, semakin banyak cabang di pohon ruang status yang dapat dipangkas sejak dini, sehingga mengurangi jumlah simpul yang harus dieksplorasi secara signifikan. Desain fungsi pembatas yang efektif seringkali merupakan bagian tersulit dan paling kreatif dari penerapan backtracking.
> - **Backtracking vs. Branch and Bound:** Backtracking adalah dasar dari metode yang lebih umum disebut **Branch and Bound**. Perbedaan utamanya adalah, Branch and Bound biasanya digunakan untuk masalah optimasi (mencari solusi _terbaik_, bukan hanya solusi yang valid) dan menggunakan fungsi batas (_bound function_) untuk memperkirakan nilai solusi terbaik yang mungkin dicapai dari simpul saat ini. Jika perkiraan ini lebih buruk dari solusi terbaik yang sudah ditemukan, maka cabang tersebut dipangkas. Backtracking lebih fokus pada menemukan _semua_ solusi atau _satu_ solusi yang valid.
> - **Penerapan dalam AI:** Backtracking merupakan algoritma dasar yang digunakan dalam berbagai masalah kecerdasan buatan, terutama dalam pencarian ruang status, seperti dalam _game playing_ (misalnya, untuk mencari langkah terbaik dalam catur atau permainan lainnya), atau dalam _constraint satisfaction problems_ (CSP) seperti Sudoku.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks Klasik:**
>     - **"Algorithm Design" oleh Jon Kleinberg dan Éva Tardos:** Memberikan pandangan modern tentang desain algoritma, termasuk backtracking.
>     - **"Introduction to Algorithms" oleh Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, dan Clifford Stein (CLRS):** Referensi standar yang mencakup Depth-First Search, yang merupakan fondasi backtracking.
>     - **"Fundamentals of Computer Algorithms" oleh Ellis Horowitz, Sartaj Sahni, dan Sanguthevar Rajasekaran:** Memiliki bab khusus yang mendalam tentang algoritma backtracking.
> - **Sumber Online:**
>     - **GeeksforGeeks:** Portal yang sangat baik untuk penjelasan konsep algoritma dan implementasi dalam berbagai bahasa.
>     - **LeetCode/HackerRank:** Platform untuk latihan soal-soal algoritma, banyak di antaranya dapat diselesaikan dengan backtracking.
> 
> #### Eksplorasi Mandiri:
> 
> - **Implementasi Lanjutan:** Coba implementasikan persoalan lain yang diselesaikan dengan backtracking, seperti **Knight's Tour Problem** (mencari jalur kuda catur yang mengunjungi setiap petak satu kali) atau masalah **Sudoku Solver**. Perhatikan bagaimana Anda mendefinisikan vektor solusi, fungsi pembangkit, dan terutama fungsi pembatas untuk setiap masalah.
> - **Visualisasi Pohon Ruang Status:** Gunakan alat visualisasi (misalnya, dengan membuat program Python sederhana yang mencetak pohon atau menggunakan library grafis) untuk memvisualisasikan bagaimana pohon ruang status tumbuh dan bagaimana _pruning_ terjadi. Ini akan sangat membantu pemahaman intuitif Anda.
> - **Analisis Kompleksitas yang Lebih Dalam:** Pilih satu masalah (misalnya, N-Ratu) dan coba analisis secara matematis bagaimana jumlah simpul hidup dan mati berubah seiring dengan peningkatan N, dan bagaimana ini mempengaruhi kompleksitas waktu praktis.