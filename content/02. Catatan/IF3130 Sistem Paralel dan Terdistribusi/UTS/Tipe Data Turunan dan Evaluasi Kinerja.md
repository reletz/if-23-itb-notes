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
> > - Apa itu Tipe Data Turunan?
> >     
> > - Mengapa kita membutuhkannya?
> >     
> > - Bagaimana cara membuatnya?
> >     
> > - Bagaimana cara mengukur waktu di MPI?
> >     
> > - Apa fungsi `MPI_Barrier`?
> >     
> > - Apa itu Speedup dan Efisiensi?
> >     
> > - Apa itu Skalabilitas?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 78-100
> >     
> 
> > ### Tipe Data Turunan (Derived Datatypes)
> > 
> > Tipe data turunan adalah mekanisme di MPI untuk mendefinisikan sebuah tipe data baru yang terdiri dari kumpulan item data yang tidak berdekatan di memori, atau terdiri dari tipe data dasar yang berbeda.
> > 
> > **Motivasi:** Daripada mengirim beberapa data (misalnya, `double a`, `double b`, `int n`) dengan beberapa panggilan `MPI_Bcast` atau `MPI_Send` yang terpisah, kita bisa menggabungkannya menjadi satu tipe data baru dan mengirimnya dalam **satu kali panggilan komunikasi**. Ini mengurangi _overhead_ (latensi) komunikasi dan menyederhanakan kode.
> > 
> > ### Membuat Tipe Data Turunan
> > 
> > Proses pembuatannya melibatkan beberapa langkah:
> > 
> > 1. **Definisi Struktur:** Tentukan tipe-tipe data dasar (`array_of_types`), jumlah elemen untuk setiap tipe (`array_of_blocklengths`), dan perpindahan (displacement) setiap elemen dari alamat awal (`array_of_displacements`).
> >     
> > 2. **Mendapatkan Alamat:** Gunakan `MPI_Get_address()` untuk mendapatkan alamat memori dari setiap variabel. Perbedaan alamat ini digunakan untuk menghitung _displacement_.
> >     
> > 3. **Membuat Tipe Baru:** Panggil `MPI_Type_create_struct()` dengan informasi di atas untuk membuat definisi tipe data yang baru.
> >     
> > 4. **Commit Tipe:** Panggil `MPI_Type_commit()` untuk mendaftarkan tipe data baru tersebut ke MPI. Setelah di-_commit_, tipe data ini siap digunakan dalam fungsi komunikasi seperti `MPI_Bcast`.
> >     
> > 5. **Membebaskan Tipe:** Setelah selesai digunakan, panggil `MPI_Type_free()` untuk melepaskan sumber daya yang dialokasikan.
> >     
> > 
> > ### Evaluasi Kinerja
> > 
> > Untuk menganalisis seberapa baik program paralel kita berjalan, kita perlu mengukur waktunya dan menghitung beberapa metrik standar.
> > 
> > - **Pengukuran Waktu:** Gunakan `double MPI_Wtime(void);`, yang mengembalikan waktu (dalam detik) yang telah berlalu sejak suatu titik di masa lalu. Untuk mengukur durasi, panggil sebelum dan sesudah blok kode yang ingin diukur, lalu hitung selisihnya.
> >     
> > - **Sinkronisasi dengan `MPI_Barrier`:** `int MPI_Barrier(MPI_Comm comm);` adalah fungsi kolektif yang akan mem-blok setiap proses hingga **semua proses** dalam komunikator mencapai titik tersebut. Ini sangat penting saat melakukan pengukuran waktu untuk memastikan tidak ada proses yang memulai "timer"-nya lebih dulu sebelum proses lain siap. Waktu eksekusi paralel biasanya diukur sebagai waktu maksimum dari semua proses, yang didapat setelah semua proses disinkronkan.
> >     
> > 
> > ### Metrik Kinerja
> > 
> > 1. Speedup (Percepatan): Mengukur seberapa banyak lebih cepat versi paralel dibandingkan versi serial.
> >     
> >     S=Tparallel​Tserial​​
> >     
> >     Idealnya, dengan p proses, kita mengharapkan speedup mendekati p.
> >     
> > 2. Efficiency (Efisiensi): Mengukur seberapa efektif setiap proses digunakan.
> >     
> >     E=pS​=p×Tparallel​Tserial​​
> >     
> >     Efisiensi 1.0 (atau 100%) adalah ideal, yang berarti semua proses bekerja penuh tanpa ada waktu yang terbuang.
> >     
> > 
> > ### Skalabilitas (Scalability)
> > 
> > Skalabilitas mengukur kemampuan sebuah program paralel untuk mempertahankan efisiensinya ketika jumlah proses ditingkatkan.
> > 
> > - **Strong Scalability (Skalabilitas Kuat):** Program dianggap memiliki skalabilitas kuat jika efisiensinya tetap tinggi saat jumlah proses ditambah, dengan **ukuran masalah yang tetap**. Ini sulit dicapai karena _overhead_ komunikasi menjadi lebih dominan.
> >     
> > - **Weak Scalability (Skalabilitas Lemah):** Program dianggap memiliki skalabilitas lemah jika efisiensinya tetap tinggi saat jumlah proses ditambah, dengan syarat **ukuran masalah per proses tetap sama** (artinya, total ukuran masalah meningkat).
> >     

> [!cornell] #### Summary
> 
> MPI menyediakan mekanisme Tipe Data Turunan untuk menggabungkan data yang tersebar atau berbeda tipe menjadi satu unit komunikasi, yang secara signifikan mengurangi overhead dengan meminimalkan jumlah panggilan fungsi komunikasi. Kinerja program paralel dievaluasi dengan mengukur waktu eksekusi yang tersinkronisasi (`MPI_Wtime` dan `MPI_Barrier`) dan dianalisis menggunakan metrik Speedup dan Efisiensi untuk menentukan Skalabilitas program, yaitu kemampuannya mempertahankan kinerja saat jumlah proses dan ukuran masalah ditingkatkan.

> [!ad-libitum]- Additional Information
> 
> #### Batas Teoritis Speedup: Hukum Amdahl
> 
> Speedup tidak bisa selalu ideal. Hukum Amdahl menyatakan bahwa percepatan maksimal dari sebuah program dibatasi oleh bagian dari program yang harus dijalankan secara sekuensial. Jika 10% dari program Anda adalah serial, maka speedup maksimal yang bisa Anda capai tidak akan pernah lebih dari 10x, tidak peduli berapa banyak prosesor yang Anda tambahkan. Inilah mengapa meminimalkan bagian serial dalam kode sangatlah krusial.
> 
> #### Faktor yang Mempengaruhi Efisiensi
> 
> Selain bagian serial, beberapa faktor lain yang dapat menurunkan efisiensi adalah:
> 
> - **Communication Overhead:** Waktu yang dihabiskan untuk mengirim dan menerima data, bukan untuk komputasi.
>     
> - **Synchronization Cost:** Waktu yang dihabiskan proses untuk menunggu proses lain di titik sinkronisasi seperti `MPI_Barrier`.
>     
> - **Load Imbalance:** Beberapa proses mendapatkan pekerjaan lebih banyak daripada yang lain, sehingga proses yang "ringan" akan menganggur menunggu proses yang "berat" selesai.
>     
> - **Redundant Computations:** Terkadang, beberapa komputasi harus diulang di setiap proses dalam versi paralel.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Timing Granularity:** Coba gunakan `MPI_Wtime` dan `MPI_Barrier` pada program perkalian matriks-vektor dari catatan sebelumnya. Ukur waktu total, waktu untuk `MPI_Allgather` saja, dan waktu untuk komputasi lokal saja. Analisis bagian mana yang menjadi _bottleneck_ seiring bertambahnya jumlah proses.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Topik Pencarian:** "Amdahl's Law", "Gustafson's Law" (alternatif untuk weak scaling), "MPI derived datatype performance", "Parallel performance metrics".
>