---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu optimisasi berbasis biaya?
> >     
> > - Apa masalah utama dalam _Join Ordering_?
> >     
> > - Bagaimana _Dynamic Programming_ bekerja?
> >     
> > - Apa itu _Left-Deep Join Tree_?
> >     
> > - Mengapa _Left-Deep Tree_ penting?
> >     
> > - Apa itu "Interesting Sort Orders"?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides: 7 - Query Optimization.pdf (Hal. 27-33)
> >     
> 
> > ### Optimisasi Berbasis Biaya (Cost-Based Optimization)
> > 
> > Ini adalah pendekatan di mana optimizer secara sistematis:
> > 
> > 1. **Menghasilkan (enumerate)** berbagai rencana evaluasi yang logis ekuivalen.
> >     
> > 2. **Mengestimasi biaya** untuk setiap rencana tersebut menggunakan statistik.
> >     
> > 3. **Memilih** rencana dengan estimasi biaya terendah untuk dieksekusi.
> >     
> > 
> > Pendekatan ini berlawanan dengan optimisasi heuristik, yang hanya mengikuti aturan praktis (seperti "selalu lakukan seleksi dulu") tanpa menghitung biaya secara eksplisit.
> > 
> > ### Masalah Kompleksitas _Join Ordering_
> > 
> > Tantangan terbesar dalam optimisasi berbasis biaya adalah menemukan urutan join terbaik untuk kueri yang melibatkan banyak tabel. Jumlah kemungkinan urutan join tumbuh secara eksplosif (kombinatorial).
> > 
> > - Untuk n relasi, jumlah kemungkinan pohon join (pohon biner) adalah (n−1)!n!(2(n−1))!​ (Bilangan Catalan).
> >     
> > - Dengan n=10, ada lebih dari 176 miliar kemungkinan! Mencoba semua kemungkinan (brute force) adalah hal yang mustahil.
> >     
> > 
> > ### _Dynamic Programming_ untuk _Join Ordering_
> > 
> > Untuk mengatasi ledakan kombinatorial, optimizer menggunakan _dynamic programming_. Ide utamanya adalah **menyelesaikan masalah yang lebih kecil terlebih dahulu dan menggunakan solusinya untuk membangun solusi masalah yang lebih besar.**
> > 
> > **Prosesnya:**
> > 
> > 1. **Basis:** Temukan rencana akses termurah untuk setiap relasi tunggal (misalnya, menggunakan indeks atau scan tabel).
> >     
> > 2. **Rekursif/Iteratif:** Untuk menemukan rencana termurah untuk join himpunan relasi `{R1, R2, R3}`, pertimbangkan semua kemungkinan pemisahan menjadi dua sub-himpunan (misalnya, `{R1}` join `{R2, R3}`, `{R2}` join `{R1, R3}`, dst.).
> >     
> > 3. **Memoization:** Biaya dari rencana join terbaik untuk setiap sub-himpunan (seperti `{R1, R2}`) **disimpan**. Jika perhitungan ini dibutuhkan lagi nanti, hasilnya tinggal diambil, tidak perlu dihitung ulang.
> >     
> > 
> > Dengan pendekatan ini, rencana optimal untuk setiap sub-himpunan hanya dihitung **satu kali**.
> > 
> > ### _Left-Deep Join Tree_
> > 
> > Untuk mengurangi kompleksitas lebih lanjut, banyak optimizer hanya mempertimbangkan kelas pohon join tertentu yang disebut _Left-Deep Join Trees_.
> > 
> > - **Definisi:** Sebuah pohon join di mana input sebelah kanan dari setiap node join **selalu** merupakan relasi dasar (tabel asli), bukan hasil dari join perantara.
> >     
> > - **Perbedaan:** Pohon yang lebih umum, di mana kedua input bisa merupakan hasil join perantara, disebut _bushy tree_.
> >     
> > 
> > **Manfaat** _**Left-Deep Tree**_**:**
> > 
> > 1. **Mengurangi Ruang Pencarian:** Jumlah kemungkinan pohon _left-deep_ jauh lebih sedikit daripada _bushy tree_, sehingga proses optimisasi menjadi lebih cepat. Kompleksitasnya turun dari O(3n) menjadi O(n2n).
> >     
> > 2. **Ideal untuk Pipelining:** Hasil dari setiap join dapat langsung di-_pipeline_ (dialirkan) sebagai input sisi kiri untuk join berikutnya tanpa perlu disimpan sepenuhnya ke disk, sehingga sangat efisien dalam penggunaan memori.
> >     
> > 
> > ### _Interesting Sort Orders_
> > 
> > Konsep ini mengakui bahwa pilihan algoritma yang "lebih mahal" secara lokal bisa jadi menguntungkan secara global.
> > 
> > - **Skenario:** Misalkan _hash join_ lebih murah daripada _merge join_ untuk $R1 \bowtie R2$. Namun, _merge join_ menghasilkan output yang sudah terurut berdasarkan atribut join.
> >     
> > - **Manfaat:** Jika operasi berikutnya juga join dengan `R3` pada atribut yang sama, atau ada `ORDER BY` atau `GROUP BY` pada atribut tersebut, maka output yang sudah terurut dari _merge join_ pertama membuat operasi berikutnya menjadi jauh lebih murah.
> >     
> > - **Tindakan Optimizer:** Optimizer yang canggih akan mempertimbangkan biaya total. Ia akan menyimpan tidak hanya rencana termurah untuk setiap sub-himpunan, tetapi juga rencana termurah yang menghasilkan _interesting sort order_ tertentu.
> >     

> [!cornell] #### Summary
> 
> Optimisasi berbasis biaya mengatasi masalah ledakan kombinatorial dalam penentuan urutan join dengan menggunakan _**dynamic programming**_. Algoritma ini secara sistematis menemukan dan menyimpan rencana termurah untuk semua sub-himpunan relasi, menghindari perhitungan berulang. Untuk membuat proses ini lebih praktis, banyak optimizer membatasi pencarian hanya pada _**left-deep join trees**_, yang mengurangi kompleksitas dan sangat efisien untuk _**pipelining**_. Selain itu, optimizer juga dapat mempertimbangkan _**interesting sort orders**_, di mana sebuah rencana yang sedikit lebih mahal dipilih jika outputnya yang terurut dapat secara signifikan mengurangi biaya operasi selanjutnya dalam kueri.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Cara Kerja _Dynamic Programming_ (Contoh Sederhana)
> 
> Bayangkan kita ingin mencari join termurah untuk R $\bowtie$ S $\bowtie$ T.
> 
> 1. **Langkah 1 (Ukuran 1):**
>     
>     - Hitung biaya `BestPlan({R})`, `BestPlan({S})`, `BestPlan({T})`. Ini adalah biaya akses tabel (scan/index). Simpan hasilnya.
>         
> 2. **Langkah 2 (Ukuran 2):**
>     
>     - **Untuk `{R, S}`:** Hanya ada satu cara: R $\bowtie$ S. Biayanya = `Cost(BestPlan({R}))` + `Cost(BestPlan({S}))` + `Cost(Join R, S)`. Simpan hasil `BestPlan({R,S})`.
>         
>     - **Untuk `{R, T}`:** Hitung R $\bowtie$ T. Simpan `BestPlan({R,T})`.
>         
>     - **Untuk `{S, T}`:** Hitung S $\bowtie$ T. Simpan `BestPlan({S,T})`.
>         
> 3. **Langkah 3 (Ukuran 3):**
>     
>     - **Untuk `{R, S, T}`:** Sekarang kita gunakan hasil yang sudah disimpan.
>         
>         - Opsi 1: (R $\bowtie$ S) $\bowtie$ T. Biaya = `Cost(BestPlan({R,S}))` + `Cost(BestPlan({T}))` + `Cost(Join RS, T)`.
>             
>         - Opsi 2: (R $\bowtie$ T) $\bowtie$ S. Biaya = `Cost(BestPlan({R,T}))` + `Cost(BestPlan({S}))` + `Cost(Join RT, S)`.
>             
>         - Opsi 3: (S $\bowtie$ T) $\bowtie$ R. Biaya = `Cost(BestPlan({S,T}))` + `Cost(BestPlan({R}))` + `Cost(Join ST, R)`.
>             
>     - Optimizer memilih opsi dengan total biaya terendah sebagai rencana final. Perhatikan bagaimana `BestPlan({R,S})`, dll tidak perlu dihitung ulang.
>         
> 
> #### Eksplorasi Mandiri: Perintah `EXPLAIN`
> 
> Hampir semua sistem basis data SQL modern menyediakan perintah seperti `EXPLAIN`, `EXPLAIN PLAN`, atau `SHOWPLAN`. Perintah ini tidak menjalankan kueri, tetapi menampilkan rencana evaluasi yang dipilih oleh optimizer.
> 
> - **Coba Jalankan:** `EXPLAIN SELECT * FROM instructor JOIN teaches ON instructor.ID = teaches.ID WHERE dept_name = 'Music';`
>     
> - **Amati:** Lihat bagaimana database memilih urutan join, algoritma join (misalnya, Nested Loop, Hash Join), dan metode akses (misalnya, Index Scan, Seq Scan). Ini adalah cara terbaik untuk melihat teori optimisasi dalam praktik.
>