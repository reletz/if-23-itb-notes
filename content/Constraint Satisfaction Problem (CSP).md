---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu CSP?
> >     
> > - Apa saja komponen utama CSP?
> >     
> > - Bagaimana contoh CSP (Map Coloring)?
> >     
> > - Apa itu 'constraint graph'?
> >     
> > - Apa saja jenis-jenis constraint?
> >     
> > - Apa itu 'constraint propagation'?
> >     
> > - Apa itu 'arc consistency'?
> >     
> > - Bagaimana cara kerja Backtracking Search untuk CSP?
> >     
> > - Apa itu heuristik Min-Conflicts?
> >     
> >
> > ## Reference Points
> >
> > - IF3170_Materi04_AI-CSP.pdf
> >     
> 
> > ### Definisi Constraint Satisfaction Problem (CSP)
> >
> > **Constraint Satisfaction Problem (CSP)** adalah jenis masalah di mana tujuannya adalah untuk menemukan sebuah _state_ atau solusi yang memenuhi sejumlah batasan atau **constraints**. CSP menyediakan bahasa formal untuk merepresentasikan masalah yang didefinisikan oleh sekumpulan batasan.
> >
> > ### Komponen Utama CSP
> >
> > Setiap CSP didefinisikan oleh tiga komponen utama:
> >
> > 1. **Variabel (X)**: Satu set variabel X_1,X_2,...,X_n yang perlu diberi nilai.
> >     
> > 2. **Domain (D)**: Satu set domain D_1,D_2,...,D_n, di mana setiap domain D_i berisi nilai-nilai yang mungkin untuk variabel X_i.
> >     
> > 3. **Constraints (C)**: Satu set batasan yang menentukan kombinasi nilai yang diizinkan untuk variabel-variabel tersebut.
> >     
> >
> > - **Solusi CSP**: Sebuah penugasan nilai (_assignment_) yang **lengkap** (setiap variabel punya nilai) dan **konsisten** (tidak melanggar _constraint_ apapun).
> >     
> >
> > ### Contoh: Map-Coloring Problem
> >
> > - **Variabel (X)**: Wilayah di peta Australia WA,NT,Q,NSW,V,SA,T.
> >     
> > - **Domain (D)**: Himpunan warna yang bisa digunakan, misal D_i=textmerah,hijau,biru.
> >     
> > - **Constraints (C)**: Wilayah yang bertetangga harus memiliki warna yang berbeda. Contoh: WAneqNT, SAneqWA, SAneqNT, dst.
> >     
> >
> > ### Visualisasi CSP: Constraint Graph
> >
> > Sebuah CSP dapat divisualisasikan menggunakan **constraint graph**.
> >
> > - **Node**: Merepresentasikan variabel.
> >     
> > - **Edge/Arc**: Menghubungkan dua variabel yang terlibat dalam sebuah _constraint_.
> >     
> >
> > ### Constraint Propagation (Inferensi)
> >
> > **Constraint Propagation** adalah proses menggunakan _constraint_ untuk mengurangi jumlah nilai legal (nilai yang mungkin) untuk sebuah variabel. Proses ini disebut juga inferensi. Kuncinya adalah menerapkan konsistensi lokal.
> >
> > - **Arc Consistency**: Ini adalah bentuk propagasi yang paling umum. Sebuah variabel X_i disebut _arc-consistent_ terhadap variabel lain X_j jika untuk **setiap nilai** dalam domain D_i, ada **setidaknya satu nilai** dalam domain D_j yang tidak melanggar _constraint_ biner antara keduanya. Jika ditemukan nilai di D_i yang tidak memiliki "pasangan" di D_j, maka nilai tersebut dapat dihapus dari D_i.
> >     
> >
> > ### Algoritma Penyelesaian CSP
> >
> > 1. **Backtracking Search**:
> >     
> > 	* **Cara Kerja**: Ini adalah pendekatan Depth-First Search (DFS) yang membangun solusi secara parsial. Ia memilih satu variabel yang belum diberi nilai, mencoba memberinya satu nilai dari domainnya, lalu secara rekursif melanjutkan ke variabel berikutnya.
> > 	* **Pengecekan Konsistensi**: Setiap kali sebuah nilai diberikan ke variabel, algoritma akan memeriksa apakah penugasan tersebut konsisten dengan nilai-nilai variabel yang sudah ditetapkan sebelumnya.
> > 	* **Backtrack**: Jika tidak ada nilai yang valid untuk variabel saat ini, atau jika rekursi gagal menemukan solusi, algoritma akan "mundur" (backtrack) ke variabel sebelumnya dan mencoba nilai lain.
> > 	* **Heuristik**: Efisiensi backtracking dapat ditingkatkan secara drastis dengan heuristik cerdas, seperti *Minimum Remaining Values* (pilih variabel dengan domain terkecil) dan *Least Constraining Value* (pilih nilai yang paling sedikit membatasi pilihan variabel lain).
> > 
> > 2. **Local Search dengan Min-Conflicts**:
> >  
> > 	* **Cara Kerja**: Ini adalah pendekatan Local Search yang dimulai dengan sebuah **solusi lengkap** yang mungkin melanggar beberapa *constraint*.
> > 	* **Iterasi**: Pada setiap langkah, algoritma memilih secara acak sebuah variabel yang sedang berkonflik (melanggar *constraint*).
> > 	* **Heuristik Min-Conflicts**: Kemudian, algoritma memilih nilai baru untuk variabel tersebut, yaitu nilai yang **meminimalkan jumlah konflik** dengan variabel lain.
> > 	* **Efektivitas**: Sangat efektif untuk masalah seperti n-Queens, seringkali menemukan solusi dalam waktu yang sangat cepat.
> > 

> [!cornell] #### Summary
> Constraint Satisfaction Problem (CSP) adalah kerangka kerja untuk menyelesaikan masalah dengan cara mendefinisikan variabel, domain nilai, dan batasan (constraints) yang harus dipenuhi. Solusi ditemukan dengan mencari penugasan nilai yang lengkap dan konsisten, seringkali menggunakan algoritma seperti Backtracking Search yang membangun solusi secara sistematis, atau Local Search dengan Min-Conflicts yang memperbaiki solusi lengkap secara iteratif.

> [!ad-libitum]- Additional Information
> 
> #### Jenis-Jenis Constraint
> 
> - **Unary Constraint**: Melibatkan satu variabel (Contoh: SAneqtexthijau).
>     
> - **Binary Constraint**: Melibatkan dua variabel (Contoh: SAneqWA). Ini adalah jenis yang paling umum.
>     
> - **Higher-Order Constraint**: Melibatkan lebih dari dua variabel (Contoh: _constraint_ dalam puzzle Cryptarithmetic seperti `TWO + TWO = FOUR`).
>     
> 
> #### Interleaving Search and Inference
> 
> Pendekatan yang sangat kuat adalah menggabungkan pencarian (seperti backtracking) dengan inferensi (seperti _arc consistency_).
> 
> - **Forward Checking**: Setelah variabel X diberi nilai, hapus nilai-nilai yang tidak konsisten dari domain semua variabel tetangga X yang belum diberi nilai.
>     
> - **Maintaining Arc Consistency (MAC)**: Setelah X diberi nilai, jalankan algoritma _arc consistency_ penuh untuk menyebarkan dampaknya ke seluruh _constraint graph_, yang mungkin akan mengurangi domain variabel lain lebih jauh lagi. Ini dapat mendeteksi kegagalan lebih awal.
>     
> 
> #### Aplikasi CSP
> 
> CSP digunakan di berbagai bidang, termasuk:
> 
> - **Penjadwalan**: Penjadwalan mata kuliah, penjadwalan penerbangan, alokasi kru.
>     
> - **Alokasi Sumber Daya**: Manajemen bandwidth, alokasi register dalam kompilator.
>     
> - **Desain dan Konfigurasi**: Mendesain layout sirkuit, mengkonfigurasi produk.
>     
> - **Visi Komputer**: Menginterpretasikan gambar 3D dari gambar 2D.
>

