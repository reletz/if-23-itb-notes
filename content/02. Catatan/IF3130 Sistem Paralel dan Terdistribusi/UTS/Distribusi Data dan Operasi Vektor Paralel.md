---
type: Note

cssclasses:
- cornell-notes
---
_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa saja strategi partisi data?
> >     
> > - Bagaimana `MPI_Scatter` bekerja?
> >     
> > - Bagaimana `MPI_Gather` bekerja?
> >     
> > - Apa perbedaan `Gather` dan `Allgather`?
> >     
> > - Bagaimana memparalelkan perkalian matriks-vektor?
> >     
> > - Mengapa `Allgather` dibutuhkan dalam perkalian matriks-vektor?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 60-77
> >     
> 
> > ### Distribusi Data (Data Distribution)
> > 
> > Untuk masalah yang melibatkan struktur data besar seperti vektor atau matriks (contoh: penjumlahan vektor `z = x + y`), langkah pertama dalam paralelisasi adalah mempartisi atau membagi data tersebut ke seluruh proses. Tujuannya adalah agar setiap proses mengerjakan sebagian kecil dari total komputasi.
> > 
> > ### Strategi Partisi Vektor
> > 
> > Ada beberapa cara umum untuk membagi sebuah vektor dengan 12 komponen di antara 3 proses:
> > 
> > 1. **Block Partitioning:** Setiap proses mendapatkan satu blok komponen yang berurutan.
> >     
> >     - Proses 0: `[0, 1, 2, 3]`
> >         
> >     - Proses 1: `[4, 5, 6, 7]`
> >         
> >     - Proses 2: `[8, 9, 10, 11]`
> >         
> > 2. **Cyclic Partitioning:** Komponen didistribusikan secara _round-robin_ (bergiliran).
> >     
> >     - Proses 0: `[0, 3, 6, 9]`
> >         
> >     - Proses 1: `[1, 4, 7, 10]`
> >         
> >     - Proses 2: `[2, 5, 8, 11]`
> >         
> > 3. **Block-Cyclic Partitioning:** Merupakan gabungan keduanya, di mana blok-blok data didistribusikan secara _round-robin_.
> >     
> > 
> > Pemilihan strategi partisi bergantung pada pola akses data dari algoritma yang digunakan. Untuk penjumlahan vektor, partisi blok adalah yang paling sederhana dan efisien.
> > 
> > ### Menyebar Data: `MPI_Scatter`
> > 
> > MPI_Scatter adalah fungsi kolektif yang mengambil sebuah array di satu proses sumber (root) dan memecahnya menjadi beberapa bagian, lalu mengirimkan setiap bagian ke proses yang sesuai. Ini adalah implementasi efisien dari pola "satu-ke-banyak" untuk distribusi data.
> > 
> > int MPI_Scatter(void* send_buf_p, int send_count, ..., void* recv_buf_p, int recv_count, ..., int src_proc, MPI_Comm comm);
> > 
> > - `send_buf_p`: Hanya signifikan di `src_proc`. Pointer ke array lengkap yang akan disebar.
> >     
> > - `send_count`: Jumlah elemen yang dikirim **ke setiap proses**.
> >     
> > - `recv_buf_p`: Pointer ke buffer di setiap proses untuk menerima bagian datanya.
> >     
> > - `recv_count`: Jumlah elemen yang diterima oleh setiap proses (biasanya sama dengan `send_count`).
> >     
> > - `src_proc`: Rank dari proses yang memiliki data awal.
> >     
> > 
> > ### Mengumpulkan Data: `MPI_Gather`
> > 
> > MPI_Gather adalah kebalikan dari MPI_Scatter. Fungsi ini mengumpulkan data dari semua proses dalam komunikator dan menyusunnya kembali menjadi sebuah array tunggal di satu proses tujuan (destination). Ini adalah pola "banyak-ke-satu".
> > 
> > int MPI_Gather(void* send_buf_p, int send_count, ..., void* recv_buf_p, int recv_count, ..., int dest_proc, MPI_Comm comm);
> > 
> > - `send_buf_p`: Pointer ke data lokal di setiap proses yang akan dikirim.
> >     
> > - `recv_buf_p`: Hanya signifikan di `dest_proc`. Pointer ke array untuk menampung semua data yang terkumpul.
> >     
> > - `dest_proc`: Rank dari proses yang akan mengumpulkan data.
> >     
> > 
> > ### Mengumpulkan ke Semua: `MPI_Allgather`
> > 
> > `MPI_Allgather` bekerja seperti `MPI_Gather`, tetapi hasilnya tidak hanya disimpan di satu proses tujuan, melainkan **semua proses** menerima salinan lengkap dari data yang terkumpul. Ini adalah pola "banyak-ke-semua".
> > 
> > ### Studi Kasus: Perkalian Matriks-Vektor Paralel
> > 
> > Untuk menghitung `y = A * x`, di mana A adalah matriks dan x, y adalah vektor.
> > 
> > - **Pembagian Kerja:** Matriks A dipartisi secara baris (partisi blok). Setiap proses mendapatkan beberapa baris dari matriks A (`local_A`) dan bertanggung jawab untuk menghitung komponen `y` yang sesuai (`local_y`).
> >     
> > - **Masalah:** Untuk menghitung satu komponen `y_i`, diperlukan seluruh baris `i` dari matriks A dan **seluruh vektor x**. Artinya, setiap proses membutuhkan salinan lengkap dari vektor `x`.
> >     
> > - **Solusi:**
> >     
> >     1. Vektor `x` juga dipartisi dan didistribusikan ke setiap proses (`local_x`).
> >         
> >     2. Gunakan `MPI_Allgather` pada `local_x`. Ini akan mengumpulkan semua bagian `local_x` dan mendistribusikan kembali vektor `x` yang utuh ke semua proses.
> >         
> >     3. Setelah setiap proses memiliki `local_A` dan `x` yang lengkap, mereka dapat menghitung `local_y` secara paralel tanpa perlu komunikasi lebih lanjut.
> >         

> [!cornell] #### Summary
> Distribusi data yang efisien adalah kunci dalam komputasi paralel, yang dapat dicapai dengan strategi partisi (seperti block atau cyclic) dan fungsi kolektif MPI. `MPI_Scatter` digunakan untuk menyebar data dari satu proses ke semua, sementara `MPI_Gather` mengumpulkannya kembali. Untuk algoritma seperti perkalian matriks-vektor di mana setiap proses membutuhkan akses ke seluruh data input (vektor x), `MPI_Allgather` menjadi alat yang esensial untuk mereplikasi data tersebut ke semua proses yang berpartisipasi.

> [!ad-libitum]- Additional Information
> 
> #### Distribusi Fleksibel: `MPI_Scatterv` dan `MPI_Gatherv`
> 
> `MPI_Scatter` dan `MPI_Gather` mengasumsikan bahwa data dibagi rata (`send_count` dan `recv_count` sama untuk semua). Bagaimana jika pembagiannya tidak rata (misalnya, karena _load balancing_)? MPI menyediakan versi yang lebih fleksibel:
> 
> - `MPI_Scatterv`: Memungkinkan Anda menentukan jumlah elemen (`sendcounts`) dan _displacement_ (offset awal) yang berbeda untuk setiap proses.
>     
> - `MPI_Gatherv`: Memungkinkan proses root untuk menerima jumlah elemen yang berbeda dari setiap proses.
>     
> 
> Huruf 'v' berarti "vector", di mana Anda menyediakan array (vektor) yang mendefinisikan bagaimana data akan disebar atau dikumpulkan.
> 
> #### Pertimbangan Kinerja `MPI_Allgather`
> 
> `MPI_Allgather` sangat berguna, tetapi bisa menjadi operasi yang mahal. Operasi ini mereplikasi seluruh data yang dikumpulkan ke setiap proses. Jika data tersebut sangat besar, ini akan memakan banyak memori di setiap node dan menghasilkan trafik jaringan yang tinggi. Dalam beberapa kasus, mungkin lebih efisien untuk merancang ulang algoritma agar tidak semua proses memerlukan semua data, misalnya dengan menggunakan komunikasi point-to-point untuk mengirim hanya data yang benar-benar dibutuhkan.
> 
> #### Eksplorasi Mandiri
> 
> - **Implementasi Penjumlahan Vektor:** Tulis program MPI lengkap untuk menjumlahkan dua vektor. Gunakan `MPI_Scatter` untuk mendistribusikan bagian dari dua vektor input ke setiap proses, lakukan penjumlahan lokal, lalu gunakan `MPI_Gather` untuk mengumpulkan vektor hasil akhir di proses 0 untuk dicetak.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Topik Pencarian:** "MPI_Scatterv example", "Parallel matrix algorithms", "Data decomposition patterns in parallel computing".
>