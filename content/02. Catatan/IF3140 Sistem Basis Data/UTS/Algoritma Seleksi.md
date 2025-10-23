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
> > - Apa itu File Scan (Linear Search)?
> >     
> > - Kapan Index Scan digunakan?
> >     
> > - Algoritma seleksi berdasarkan Primary Index?
> >     
> > - Algoritma seleksi berdasarkan Secondary Index?
> >     
> > - Bagaimana menangani seleksi dengan perbandingan (`<`, `>`)?
> >     
> > - Apa itu seleksi konjungtif (AND)?
> >     
> > - Algoritma untuk seleksi konjungtif?
> >     
> > - Apa itu seleksi disjungtif (OR)?
> >     
> > - Bagaimana menangani seleksi dengan negasi (NOT)?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 13-18
> >     
> 
> > ### Algoritma Dasar: File Scan
> > 
> > **A1 (Linear Search):** Ini adalah metode paling dasar di mana sistem memindai setiap blok file satu per satu dan menguji setiap record di dalamnya untuk melihat apakah memenuhi kondisi seleksi.
> > 
> > - **Kelebihan:** Dapat diterapkan untuk kondisi seleksi apa pun, tidak peduli urutan record, dan tidak memerlukan indeks.
> >     
> > - **Estimasi Biaya:**
> >     
> >     - Biaya transfer blok: $b_r$ (di mana $b_r$ adalah jumlah blok yang berisi record dari relasi _r_).
> >         
> >     - Jumlah seek: 1.
> >         
> >     - Total: $b_r + 1$.
> >         
> > - **Kasus Khusus (Key Attribute):** Jika seleksi dilakukan pada atribut kunci (key), pencarian bisa berhenti setelah record pertama ditemukan.
> >     
> >     - Estimasi Biaya Rata-rata: $(b_r / 2)$ transfer blok + 1 seek.
> >         
> > 
> > ### Seleksi Menggunakan Indeks (Index Scan)
> > 
> > Metode ini menggunakan struktur data indeks untuk menemukan record yang memenuhi syarat dengan lebih cepat. Syarat utamanya adalah kondisi seleksi harus pada atribut yang menjadi _search-key_ dari indeks tersebut.
> > 
> > #### A. Seleksi dengan Kondisi Kesetaraan ($=$)
> > 
> > **A2 (Primary Index, pada Key):** Digunakan untuk mengambil satu record unik yang memenuhi kondisi kesetaraan pada atribut kunci utama.
> > 
> > - **Estimasi Biaya:** $$(h_i + 1) * (t_T + t_S)$$
> > 
> > 	di mana $h_i$ adalah tinggi (level) dari indeks. Biaya ini mencakup penelusuran indeks ($h_i$) ditambah satu akses untuk mengambil blok data.
> >     
> > 
> > **A3 (Primary Index, pada Non-Key):** Digunakan untuk mengambil beberapa record yang memenuhi kondisi kesetaraan pada atribut yang bukan kunci unik. Karena ini adalah _primary index_, record-record yang cocok akan berada di blok-blok yang berurutan.
> > 
> > - **Estimasi Biaya:** $$(h_i * (t_T + t_S)) + t_S + (b * t_T)$$
> >  
> > 	di mana _b_ adalah jumlah blok yang berisi record yang cocok. Biaya ini mencakup penelusuran indeks, satu seek ke blok data pertama, dan transfer _b_ blok data secara sekuensial.
> >     
> > 
> > **A4 (Secondary Index, pada Non-Key):** Digunakan untuk mengambil record melalui indeks sekunder.
> > 
> > - **Jika Search-Key adalah Candidate Key:** Mengambil satu record. Biayanya sama seperti A2: $$(h_i + 1) * (t_T + t_S)$$
> >     
> > - **Jika Search-Key bukan Candidate Key:** Mengambil banyak record. Setiap record yang cocok bisa berada di blok yang berbeda-beda.
> >     
> >     - **Estimasi Biaya:** $$(h_i + n) * (t_T + t_S)$$
> >      
> > 	    di mana _n_ adalah jumlah record yang cocok. Biaya ini bisa menjadi **sangat mahal** karena setiap record mungkin memerlukan I/O (seek + transfer) terpisah.
> >         
> > 
> > #### B. Seleksi dengan Kondisi Perbandingan ($\geq$, $\leq$)
> > 
> > **A5 (Primary Index, Perbandingan):** Digunakan pada relasi yang sudah terurut berdasarkan atribut A.
> > 
> > - Untuk $σ_{A \geq V}(r)$: Gunakan indeks untuk menemukan tuple pertama yang nilainya $≥ V$, lalu pindai relasi secara sekuensial dari titik tersebut.
> >     
> > - Untuk $σ_{A \leq V}(r)$: Tidak perlu menggunakan indeks. Cukup pindai relasi dari awal hingga menemukan tuple pertama yang nilainya $> V$.
> >     
> > 
> > **A6 (Secondary Index, Perbandingan):**
> > 
> > - Untuk $σ_{A \geq V}(r)$: Gunakan indeks untuk menemukan entri pertama $≥ V$, lalu pindai _leaf node_ indeks secara sekuensial untuk mendapatkan pointer ke semua record yang relevan.
> >     
> > - Untuk $σ_{A \leq V}(r)$: Pindai _leaf node_ indeks dari awal hingga menemukan entri pertama $> V$.
> >     
> > - **Kekurangan:** Setiap pointer record yang ditemukan mungkin memerlukan I/O disk terpisah, sehingga dalam banyak kasus, **File Scan (A1) bisa jadi lebih murah**.
> >     
> > 
> > ### Algoritma untuk Seleksi Kompleks
> > 
> > Seleksi kompleks melibatkan kombinasi beberapa kondisi menggunakan operator logika AND, OR, dan NOT.
> > 
> > #### A. Konjungsi (AND): $σ_{θ1 ∧ θ2 ∧ ... ∧ θn}(r)$
> > 
> > **A7 (Menggunakan Satu Indeks):** Pilih satu kondisi $θ_i$ yang paling selektif (menghasilkan record paling sedikit) dan memiliki indeks yang paling efisien. Gunakan algoritma yang sesuai (A2-A6) untuk mengambil record berdasarkan $θ_i$. Setelah record diambil ke memori, terapkan kondisi $θ$  lainnya ($θ_1$, $θ_2$, ...) sebagai filter.
> > 
> > **A8 (Menggunakan Composite Index):** Jika ada indeks komposit (multi-key) yang sesuai dengan beberapa kondisi, gunakan indeks tersebut untuk pencarian langsung.
> > 
> > **A9 (Menggunakan Interseksi Identifier):** Metode ini memerlukan indeks yang menyimpan pointer record.
> > 
> > 1. Untuk setiap kondisi $θ_i$ yang memiliki indeks, ambil semua set pointer record yang memenuhi syarat.
> >     
> > 2. Lakukan operasi **interseksi (irisan)** pada semua set pointer tersebut.
> >     
> > 3. Ambil record dari file berdasarkan hasil interseksi pointer.
> >     
> > 
> > #### B. Disjungsi (OR): $σ_{θ1 ∨ θ2 ∨ ... ∨ θn}(r)$
> > 
> > **A10 (Menggunakan Union Identifier):** Hanya berlaku jika **semua** kondisi $θi$ memiliki indeks yang tersedia.
> > 
> > 1. Untuk setiap kondisi $θ_i$, ambil semua set pointer record yang memenuhi syarat.
> >     
> > 2. Lakukan operasi **union (gabungan)** pada semua set pointer tersebut.
> >     
> > 3. Ambil record dari file berdasarkan hasil union pointer.
> >     
> > 4. Jika salah satu kondisi tidak memiliki indeks, maka metode paling aman adalah menggunakan **Linear Scan (A1)**.
> >     
> > 
> > #### C. Negasi (NOT): $σ_{¬θ}(r)$
> > 
> > - Cara paling umum adalah menggunakan **Linear Scan (A1)** dan menerapkan kondisi $¬θ$ pada setiap record.
> >     
> > - Jika kondisi $θ$ sangat sedikit menghasilkan record (sangat selektif) dan memiliki indeks, alternatifnya adalah: temukan dulu semua record yang memenuhi $θ$ menggunakan indeks, lalu sisanya adalah hasil dari $¬θ$. Namun, ini tetap memerlukan cara untuk mengidentifikasi "sisa" record, yang seringkali kembali ke pemindaian file.
> >     

> [!cornell] #### Summary
> **Algoritma seleksi berfungsi untuk memilih subset tuple dari sebuah relasi berdasarkan kondisi tertentu, di mana pilihan algoritma sangat bergantung pada ketersediaan dan jenis indeks untuk meminimalkan biaya I/O disk.** Metode paling dasar adalah _File Scan_ (pencarian linear) yang selalu dapat digunakan tetapi seringkali tidak efisien. Penggunaan _Index Scan_ secara signifikan mempercepat pencarian untuk kondisi kesetaraan (`=`) maupun perbandingan (`<`, `>`), dengan biaya yang bervariasi tergantung pada apakah indeks tersebut _primary_ atau _secondary_. Untuk seleksi kompleks yang melibatkan `AND` dan `OR`, strategi seperti memilih indeks paling efisien, menggunakan indeks komposit, atau melakukan operasi irisan/gabungan pada pointer record dapat diterapkan untuk mencapai efisiensi yang lebih tinggi daripada sekadar melakukan scan penuh.

> [!ad-libitum]- Additional Information
> 
> #### Rincian Variabel Biaya
> 
> Untuk memahami formula biaya dengan lebih baik, berikut adalah arti dari variabel yang digunakan:
> 
> - $b_r$: Jumlah blok disk yang ditempati oleh relasi `r`.
>    
> - $n_r$: Jumlah record/tuple dalam relasi `r`.
>     
> - $h_i$: Tinggi (jumlah level) dari struktur indeks, tidak termasuk leaf level.
>     
> - $t_T$: Waktu yang dibutuhkan untuk mentransfer satu blok disk.
>     
> - $t_S$: Waktu yang dibutuhkan untuk satu kali _seek_ (pergerakan head disk).
>     
> 
> #### Trade-Off: Kapan Linear Scan Lebih Baik dari Index Scan?
> 
> Mungkin terdengar aneh, tetapi ada skenario di mana `A1 (Linear Scan)` lebih unggul daripada `A4 (Secondary Index Scan)` atau `A6 (Secondary Index Comparison)`.
> 
> - **Skenario:** Ketika sebuah query `SELECT * FROM mahasiswa WHERE ipk > 3.5;` mengembalikan sebagian besar mahasiswa (misalnya 40% dari total record).
>     
> - **Alasan:** Menggunakan _secondary index_ pada `ipk` akan menghasilkan banyak sekali pointer record. Karena ini adalah _secondary index_, setiap record bisa berada di blok disk yang berbeda. Mengambil setiap record satu per satu akan menyebabkan _seek_ dan _transfer_ yang sangat banyak (biaya $(h_i + n)$). Sebaliknya, melakukan _linear scan_ hanya membaca semua blok secara sekuensial ($b_r$) yang jauh lebih sedikit operasinya.
>     
> - **Kesimpulan:** _Secondary index_ sangat efisien untuk query dengan selektivitas tinggi (mengembalikan sedikit record), tetapi menjadi tidak efisien untuk selektivitas rendah.
>     
> 
> #### Peran Query Optimizer
> 
> Dalam sistem basis data nyata, programmer tidak memilih algoritma A1-A10 secara manual. **Query Optimizer** adalah komponen yang secara otomatis menganalisis query, melihat statistik data (jumlah record, kardinalitas, distribusi nilai), dan ketersediaan indeks untuk **memilih rencana eksekusi (termasuk algoritma seleksi) dengan estimasi biaya terendah**.
> 
> #### Eksplorasi Mandiri
> 
> Coba buat sebuah tabel besar di DBMS pilihan Anda (misalnya PostgreSQL atau MySQL).
> 
> 1. Isi dengan jutaan baris data acak.
>     
> 2. Jalankan query `SELECT` dengan kondisi `WHERE` pada kolom yang tidak memiliki indeks. Gunakan perintah seperti `EXPLAIN` atau `EXPLAIN ANALYZE` untuk melihat rencana eksekusi. Anda kemungkinan besar akan melihat "Sequential Scan" atau "Table Scan".
>     
> 3. Sekarang, buat B-Tree index pada kolom tersebut.
>     
> 4. Jalankan kembali query yang sama. Gunakan `EXPLAIN` lagi. Anda sekarang seharusnya melihat "Index Scan" atau sejenisnya, terutama jika query Anda cukup selektif. Perhatikan bagaimana estimasi biayanya berubah drastis.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks:** "Database System Concepts" oleh Silberschatz, Korth, dan Sudarshan, Chapter 15.
>     
> - **Tools:** PostgreSQL, MySQL, SQL Server, Oracle (semuanya memiliki perintah `EXPLAIN` untuk menganalisis rencana query).
>