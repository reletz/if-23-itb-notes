---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]

> [!cornell] Contoh-contoh Persoalan yang Diselesaikan dengan Backtracking
> 
> > ## Questions/Cues
> > 
> > - Persoalan N-Ratu
> > - Solusi N-Ratu (Vektor X)
> > - Brute Force N-Ratu
> > - Pohon Ruang Status N-Ratu
> > - Fungsi Pembatas N-Ratu (Tempat)
> > - Algoritma N-Ratu (Prinsip)
> > - Persoalan Sum of Subsets
> > - Contoh Sum of Subsets
> > - Solusi Sum of Subsets (Vektor Biner)
> > - Pohon Ruang Status Sum of Subsets
> > - Pentingnya Pengurutan Bobot
> > - Fungsi Pembatas Sum of Subsets (Promising)
> > - Algoritma Sum of Subsets (Prinsip)
> 
> > ### Contoh-contoh Persoalan yang Diselesaikan dengan Backtracking
> > 
> > Berikut adalah beberapa contoh persoalan klasik yang dapat diselesaikan secara efektif menggunakan algoritma backtracking:
> > 
> > 1. **Persoalan N-Ratu (The N-Queens Problem):**
> >     
> >     - **Persoalan:** Ini adalah masalah catur klasik. Tujuannya adalah menempatkan N buah ratu pada papan catur berukuran N×N sedemikian rupa sehingga **tidak ada dua ratu atau lebih yang saling menyerang**. Dalam catur, ratu dapat menyerang secara horizontal (baris), vertikal (kolom), atau diagonal. Jadi, ini berarti tidak boleh ada dua ratu di baris, kolom, atau diagonal yang sama.
> >     - **Solusi:** Solusi persoalan ini dinyatakan sebagai sebuah vektor X=(x1​,x2​,...,xN​), di mana xi​ menyatakan **kolom tempat ratu pada baris ke-i**. Sebagai contoh, jika x1​=3, artinya ratu di baris 1 ditempatkan di kolom 3. Untuk sebuah solusi N-Ratu yang valid, vektor solusi X harus merupakan **permutasi dari bilangan 1, 2, ..., N**. Ini secara otomatis memastikan bahwa setiap ratu berada di baris dan kolom yang berbeda.
> >     - **Penyelesaian Brute Force:** Jika kita mencoba _brute force_ untuk N-Ratu, kita akan mencoba semua kemungkinan penempatan ratu. Untuk N=8, ini bisa melibatkan C(64,8) (pemilihan 8 petak dari 64), atau 88 (jika menempatkan satu ratu per baris tanpa batasan kolom), atau 8! (jika menempatkan satu ratu per baris dan memastikan setiap kolom terisi satu ratu – ini adalah _exhaustive search_ yang lebih efisien). Backtracking secara drastis memperbaiki _brute force_ yang melibatkan permutasi ini dengan _pruning_.
> >     - **Pohon Ruang Status:** Dalam pohon ruang status untuk N-Ratu, setiap tingkat (level) merepresentasikan **penempatan ratu pada baris ke-k**. Sisi-sisi (cabang) yang keluar dari simpul merepresentasikan pilihan kolom (dari 1 hingga N) untuk ratu tersebut.
> >     - **Fungsi Pembatas (Bounding Function):** Fungsi kunci di sini adalah `Tempat(k, i)`. Fungsi ini memeriksa apakah ratu ke-k **dapat ditempatkan pada baris k dan kolom i** tanpa menyerang ratu-ratu yang sudah ditempatkan sebelumnya (pada baris 1 hingga k−1). Fungsi ini bernilai `true` jika:
> >         1. Tidak ada ratu lain di **kolom yang sama**: xj​=i untuk semua j<k.
> >         2. Tidak ada ratu lain di **diagonal yang sama**: ABS(xj​–i)=ABS(j–k) untuk semua j<k. (Ini secara matematis memeriksa apakah selisih baris sama dengan selisih kolom, yang mengindikasikan diagonal yang sama). Jika salah satu kondisi ini `true`, maka `Tempat` bernilai `false` (penempatan tidak valid), dan cabang tersebut dipangkas. Jika tidak, `Tempat` bernilai `true`.
> >     - **Algoritma:** Algoritma N-Ratu, baik versi rekursif (`Nratu_R`) maupun iteratif (`Nratu_I`), akan dimulai dengan memanggil prosedur untuk baris pertama (misalnya `Nratu_R(1, N)`). Prosedur rekursif akan mencoba setiap kolom i (dari 1 hingga N) untuk menempatkan ratu di baris k. Jika `Tempat(k, i)` bernilai `true`, ratu ditempatkan (xk​=i). Jika k=N (semua ratu ditempatkan), solusi ditemukan. Jika k<N, algoritma memanggil dirinya sendiri secara rekursif untuk baris k+1. Jika tidak ada kolom yang valid di baris k, maka terjadi runut-balik.
> > 2. **Persoalan Sum of Subsets (Penjumlahan Himpunan Bagian):**
> >     
> >     - **Persoalan:** Diberikan n buah bobot positif (w1​,w2​,...,wn​) dan sebuah nilai target m. Tujuannya adalah **menemukan semua himpunan bagian (subset) dari bobot tersebut yang jika dijumlahkan, hasilnya sama dengan m**. Penting dicatat bahwa mungkin tidak ada solusi sama sekali.
> >     - **Contoh:** Jika n=4, bobotnya (11,13,24,7), dan target m=31. Solusinya adalah {11,13,7} (karena 11+13+7=31) dan {24,7} (karena 24+7=31).
> >     - **Contoh Dunia Nyata:** Masalah ini mirip dengan pemilihan barang dengan budget tertentu, pengisian truk dengan kapasitas terbatas, atau alokasi tugas dengan total durasi tertentu.
> >     - **Solusi:** Solusi dinyatakan sebagai sebuah **vektor biner** X=(x1​,x2​,...,xn​), di mana xi​=1 jika bobot wi​ dimasukkan ke dalam subset, dan xi​=0 jika tidak.
> >     - **Pohon Ruang Status:** Pohon ruang status untuk masalah ini adalah **pohon biner**.
> >         - **Cabang kiri (saat xi​=1):** Artinya bobot wi​ diambil (dimasukkan ke dalam subset).
> >         - **Cabang kanan (saat xi​=0):** Artinya bobot wi​ tidak diambil. Setiap lintasan dari akar ke daun merepresentasikan sebuah himpunan bagian yang lengkap (yaitu, keputusan untuk setiap bobot).
> >     - **Langkah Penting Awal:** Sebelum memulai pencarian, **semua bobot harus diurutkan secara menaik**. Ini krusial karena membantu fungsi pembatas bekerja lebih efektif.
> >     - **Fungsi Pembatas (Bounding Function) `promising(k, Wt, sisabobot)`:** Fungsi ini memeriksa apakah lintasan parsial sampai simpul k (dengan total bobot `Wt` yang sudah diambil) masih "menjanjikan" untuk mengarah ke solusi m. Fungsi ini bernilai `true` jika dan hanya jika:
> >         1. **(Wt + sisabobot ≥ m)**: Jumlah bobot yang sudah diambil (`Wt`) ditambah total bobot yang tersisa (`sisabobot`, yaitu jumlah dari wk+1​ sampai wn​) **masih lebih besar atau sama dengan m**. Ini memastikan bahwa target m masih mungkin dicapai dengan sisa bobot yang ada. Jika tidak, mustahil mencapai m, dan cabang dipangkas.
> >         2. **DAN** (logika 'and')
> >         3. **(Wt == m ATAU Wt + wk + 1​ ≤ m)**:
> >             - Jika `Wt == m`, berarti kita sudah menemukan solusi, jadi ini "menjanjikan".
> >             - Jika `Wt != m`, maka kita perlu memeriksa apakah **jumlah bobot saat ini ditambah bobot berikutnya yang paling kecil (wk+1​)** **tidak melebihi m**. Karena bobot sudah diurutkan, wk+1​ adalah bobot terkecil berikutnya. Jika bahkan dengan mengambil bobot terkecil berikutnya saja sudah melebihi m, maka lintasan ini tidak menjanjikan jika kita memilih untuk mengambil wk+1​ (yaitu, xk+1​=1). Namun, jalur xk+1​=0 (tidak mengambil wk+1​) mungkin masih menjanjikan. Sumber menggabungkan kedua kondisi ini dalam fungsi `promising`.
> >     - **Algoritma:** Langkah-langkahnya meliputi mengurutkan bobot, menghitung total bobot, dan memanggil prosedur rekursif `SumOfSubsets(0, 0, total_bobot)`. Prosedur `SumOfSubsets(k, Wt, sisabobot)` akan mencoba membangun solusi mulai dari komponen ke-(k+1). Jika `promising(k, Wt, sisabobot)` bernilai `true`:
> >         - Jika `Wt == m`, berarti solusi ditemukan, dan dicetak.
> >         - Jika `Wt != m`, algoritma akan mencoba dua kemungkinan untuk xk+1​:
> >             - Mengatur xk+1​=1 (ambil wk+1​), lalu memanggil rekursif `SumOfSubsets(k+1, Wt + w_{k+1}, sisabobot - w_{k+1})`.
> >             - Mengatur xk+1​=0 (jangan ambil wk+1​), lalu memanggil rekursif `SumOfSubsets(k+1, Wt, sisabobot - w_{k+1})`.

> [!cornell] #### Summary
> **N-Ratu** adalah masalah penempatan ratu tanpa saling menyerang, dengan solusi direpresentasikan sebagai vektor kolom per baris, dan fungsi pembatas `Tempat` yang memeriksa bentrok kolom atau diagonal. **Sum of Subsets** mencari himpunan bagian bobot yang berjumlah target m, direpresentasikan sebagai vektor biner keputusan ambil/tidak ambil, dan memerlukan pengurutan bobot awal untuk efisiensi fungsi pembatas `promising` yang memastikan jumlah bobot saat ini ditambah sisa bobot masih bisa mencapai m, dan bahwa penambahan bobot terkecil berikutnya tidak melebihi m. Kedua contoh ini secara jelas menunjukkan bagaimana backtracking menggunakan fungsi pembatas spesifik masalah untuk memangkas pohon ruang status.