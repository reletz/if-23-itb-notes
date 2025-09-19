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
> > - Apa saja algoritma join utama?
> >     
> > - Bagaimana cara kerja Nested-Loop Join?
> >     
> > - Apa itu Block Nested-Loop Join?
> >     
> > - Kapan Indexed Nested-Loop Join efisien?
> >     
> > - Bagaimana prinsip Merge-Join?
> >     
> > - Apa itu Hash-Join?
> >     
> > - Fase Partisi vs. Build/Probe di Hash-Join?
> >     
> > - Bagaimana menangani _overflow_ pada Hash-Join?
> >     
> > - Apa itu Hybrid Hash-Join?
> >     
> > - Cara menangani join kompleks (AND/OR)?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 26-44
> >     
> 
> > ### Nested-Loop Join
> > 
> > Ini adalah algoritma join yang paling dasar dan sederhana.
> > 
> > - **Cara Kerja:** Untuk **setiap tuple** di relasi luar (r), pindai **seluruh relasi** dalam (s) untuk mencari pasangan yang memenuhi kondisi join.
> >     
> > - **Kelebihan:** Dapat digunakan untuk semua jenis kondisi join (tidak hanya kesetaraan) dan tidak memerlukan indeks.
> >     
> > - **Kekurangan:** Sangat tidak efisien dan mahal.
> >     
> > - **Estimasi Biaya (Worst Case):** $n_r * b_s + b_r$ transfer blok, di mana $n_r$ adalah jumlah record di relasi r dan $b_s$ adalah jumlah blok di relasi s.
> >     
> > 
> > ### Block Nested-Loop Join
> > 
> > Merupakan variasi dari Nested-Loop Join yang bekerja pada level blok, bukan tuple.
> > 
> > - **Cara Kerja:** Untuk **setiap blok** di relasi luar (r), pindai **seluruh blok** di relasi dalam (s). Kemudian, untuk setiap pasang blok, semua kombinasi tuple di dalamnya akan diperiksa.
> >     
> > - **Estimasi Biaya (Worst Case):** $b_r * b_s + b_r$ transfer blok.
> >     
> > - **Optimasi:** Alokasikan $M-2$ blok memori untuk relasi luar, sehingga dapat membaca $M-2$ blok sekaligus dan mengurangi jumlah pemindaian relasi dalam. Biaya menjadi $\lceil b_r / (M-2) \rceil * b_s + b_r$.
> >     
> > 
> > ### Indexed Nested-Loop Join
> > 
> > Algoritma ini memanfaatkan indeks pada atribut join dari relasi dalam untuk mempercepat pencarian.
> > 
> > - **Syarat:** Kondisi join harus berupa _equi-join_ (atau natural join) dan harus ada indeks pada atribut join relasi dalam.
> >     
> > - **Cara Kerja:** Untuk setiap tuple di relasi luar (r), gunakan indeks pada relasi dalam (s) untuk langsung menemukan tuple yang cocok, tanpa perlu memindai seluruh relasi s.
> >     
> > - **Estimasi Biaya:** $b_r + n_r * c$, di mana `c` adalah biaya untuk mencari dan mengambil semua tuple yang cocok di `s` untuk satu tuple `r` menggunakan indeks.
> >     
> > 
> > ### Merge-Join
> > 
> > Algoritma ini efisien untuk _equi-joins_ dan _natural joins_.
> > 
> > - **Cara Kerja:**
> >     
> >     1. **Sort:** Urutkan kedua relasi (r dan s) berdasarkan atribut join mereka.
> >         
> >     2. **Merge:** Pindai kedua relasi yang sudah terurut secara bersamaan (mirip fase merge pada External Sort-Merge) untuk menemukan tuple yang cocok. Pointer akan bergerak maju secara sinkron di kedua relasi.
> >         
> > - **Estimasi Biaya (jika relasi sudah terurut):** $b_r + b_s$ transfer blok, karena setiap blok hanya perlu dibaca sekali. Jika belum terurut, biaya sorting harus ditambahkan.
> >     
> > 
> > ### Hash-Join
> > 
> > Ini adalah algoritma yang sangat efisien untuk _equi-joins_, terutama pada data besar.
> > 
> > - **Cara Kerja:**
> >     
> >     1. **Fase Partisi (Partition Phase):**
> >         
> >         - Pilih relasi yang lebih kecil sebagai _build input_ (misalnya s).
> >             
> >         - Gunakan fungsi hash `h1` pada atribut join untuk mempartisi `s` dan `r` ke dalam `n` _bucket_ atau partisi ($s_0, s_1, ...$ dan $r_0, r_1, ...$).
> >             
> >         - Tulis partisi-partisi ini ke disk. Keuntungannya adalah tuple di $r_i$ hanya mungkin cocok dengan tuple di $s_i$.
> >             
> >     2. **Fase Build & Probe (Matching Phase):**
> >         
> >         - Untuk setiap partisi i:
> >             
> >             a. Build: Baca partisi $s_i$ ke memori dan bangun hash table di memori menggunakan fungsi hash kedua (h2).
> >             
> >             b. Probe: Baca partisi $r_i$ blok per blok, dan untuk setiap tuple, gunakan h2 untuk mencari pasangannya di hash table $s_i$.
> >             
> > - **Penanganan Overflow:** Jika partisi $s_i$ tidak muat di memori, partisi tersebut dapat dipartisi ulang secara rekursif menggunakan fungsi hash lain, atau gunakan Block Nested-Loop Join untuk partisi yang meluap tersebut.
> >     
> > - **Estimasi Biaya (tanpa rekursi):** Sekitar $3(b_r + b_s)$ transfer blok (baca+tulis saat partisi, baca saat build/probe).
> >     
> > 
> > #### Hybrid Hash-Join
> > 
> > Sebuah optimasi dari Hash-Join ketika memori cukup besar.
> > 
> > - **Cara Kerja:** Selama fase partisi _build input_ (s), partisi pertama ($s_0$) tidak ditulis ke disk, melainkan langsung disimpan di memori sebagai _hash table_. Ketika _probe input_ (r) dipartisi, tuple yang masuk ke partisi $r_0$ tidak ditulis ke disk, melainkan langsung digunakan untuk mencari pasangan di _hash table_ $s_0$. Ini menghemat I/O untuk satu partisi penuh.
> >     
> > 
> > ### Complex Joins
> > 
> > - **Join dengan Kondisi Konjungtif (AND):** $r \bowtie_{\theta_1 \land \theta_2} s$
> >     
> >     - Hitung join untuk kondisi yang paling selektif (misalnya $\theta_1$), lalu terapkan kondisi sisanya ($\theta_2$) sebagai filter pada hasilnya.
> >         
> > - **Join dengan Kondisi Disjungtif (OR):** $r \bowtie_{\theta_1 \lor \theta_2} s$
> >     
> >     - Hitung hasil join untuk setiap kondisi secara terpisah ($r \bowtie_{\theta_1} s$` dan `$r \bowtie_{\theta_2} s$).
> >         
> >     - Gabungkan hasilnya menggunakan operasi `UNION`.
> >         

> [!cornell] #### Summary
> 
> **Pemilihan algoritma join adalah salah satu keputusan paling kritis dalam optimasi query, dengan setiap algoritma memiliki kelebihan pada skenario yang berbeda.** _Nested-Loop Join_ adalah metode universal tetapi lambat. _Block Nested-Loop Join_ memberikan perbaikan sederhana. _Indexed Nested-Loop Join_ sangat cepat jika tersedia indeks yang sesuai. _Merge-Join_ efisien untuk _equi-join_ pada data yang sudah atau dapat diurutkan dengan mudah. Terakhir, _Hash-Join_ seringkali menjadi pilihan tercepat untuk _equi-join_ pada data besar, dengan varian _Hybrid Hash-Join_ yang lebih lanjut mengoptimalkan penggunaan memori untuk mengurangi I/O disk.

> [!ad-libitum]- Additional Information
> 
> #### Tabel Perbandingan Algoritma Join
> 
> |**Algoritma**|**Kapan Digunakan Terbaik**|**Persyaratan**|**Kelemahan**|
> |---|---|---|---|
> |**Nested-Loop**|Relasi sangat kecil atau sebagai fallback|Tidak ada|Sangat lambat untuk data besar|
> |**Block Nested-Loop**|Salah satu relasi kecil, memori terbatas|Tidak ada|Kurang efisien dibanding hash/merge|
> |**Indexed Nested-Loop**|Relasi luar kecil, ada indeks efisien di relasi dalam|Indeks pada atribut join|Performa buruk jika indeks tidak selektif|
> |**Merge-Join**|Kedua relasi sudah terurut atau output perlu diurutkan|Equi-join, data terurut|Biaya sorting awal bisa mahal|
> |**Hash-Join**|Equi-join pada data besar, memori cukup|Equi-join|Sensitif terhadap data miring (_skew_) dan ukuran memori|
> 
> #### Dampak Data Skew (Kemiringan Data) pada Hash-Join
> 
> Kelemahan utama Hash-Join adalah jika data pada atribut join tidak terdistribusi merata (miring). Misalnya, jika banyak sekali tuple memiliki nilai yang sama pada atribut join, maka fungsi hash akan menempatkan semua tuple tersebut ke dalam satu partisi yang sama. Partisi ini akan menjadi sangat besar dan menyebabkan _overflow_, yang akan memaksa sistem menggunakan algoritma yang lebih lambat seperti Block Nested-Loop Join pada partisi tersebut, sehingga mengurangi efisiensi keseluruhan.
> 
> #### Eksplorasi Mandiri
> 
> Gunakan perintah `EXPLAIN` atau `EXPLAIN ANALYZE` pada DBMS favorit Anda untuk melihat bagaimana query optimizer memilih algoritma join.
> 
> 1. Buat dua tabel, `A` dan `B`.
>     
> 2. Lakukan `JOIN` tanpa membuat indeks apa pun. Kemungkinan besar optimizer akan memilih **Hash Join** atau **Merge Join**.
>     
> 3. Buat indeks B-Tree pada kolom join di tabel `B`.
>     
> 4. Jalankan kembali query `JOIN`. Jika tabel `A` cukup kecil, optimizer mungkin akan beralih ke **Indexed Nested-Loop Join** dengan `A` sebagai relasi luar dan `B` sebagai relasi dalam. Ini menunjukkan bagaimana optimizer secara dinamis memilih strategi terbaik berdasarkan struktur data yang tersedia.
>