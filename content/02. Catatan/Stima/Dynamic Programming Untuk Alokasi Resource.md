---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > -   Persoalan Integer Knapsack
> > -   Knapsack: Karakteristik & Rekurens
> > -   Knapsack: Perhitungan Tabel Tahap 1
> > -   Knapsack: Perhitungan Tabel Tahap 2
> > -   Knapsack: Perhitungan Tabel Tahap 3
> > -   Knapsack: Rekonstruksi Solusi
> > -   Persoalan Capital Budgeting
> > -   CB: Karakteristik & Rekurens
> > -   CB: Perhitungan Tabel Tahap 1
> > -   CB: Perhitungan Tabel Tahap 2
> > -   CB: Perhitungan Tabel Tahap 3
> > -   CB: Rekonstruksi Solusi Optimal
>  
> > ### Persoalan 2: Integer Knapsack
> > 
> > -   **Deskripsi Persoalan:**
> >     * Diberikan sebuah tas (knapsack) dengan kapasitas **M**. Terdapat **n** buah objek, di mana setiap objek `i` memiliki bobot **$w_i$** dan keuntungan **$p_i$**.
> >     * **Tujuan:** Memilih objek-objek untuk dimasukkan ke dalam tas sehingga **total keuntungan maksimal**, dengan syarat total bobot tidak melebihi kapasitas M.
> > 
> > -   **Langkah 1 & 2: Karakteristik dan Hubungan Rekursif**
> >     * **Tahap (k):** Proses mempertimbangkan objek ke-`k`.
> >     * **Status (y):** Kapasitas knapsack yang tersisa, dengan `y` berkisar dari 0 hingga M.
> >     * **Keputusan ($x_k$):** Apakah objek ke-`k` dimasukkan ($x_k=1$) atau tidak ($x_k=0$).
> >     * **Fungsi Tujuan:** Misalkan $f_k(y)$ adalah keuntungan **maksimum** yang bisa didapat dari `k` objek pertama dengan kapasitas `y`.
> >     * **Hubungan Rekursif:** Untuk setiap objek `k` dan kapasitas `y`, kita punya dua pilihan:
> >         1.  **Tidak Masukkan Objek `k`:** Keuntungan sama dengan tahap sebelumnya: $f_{k-1}(y)$.
> >         2.  **Masukkan Objek `k`:** (Hanya jika $y \ge w_k$). Keuntungan adalah $p_k$ ditambah keuntungan dari kapasitas sisa pada tahap sebelumnya: $p_k + f_{k-1}(y - w_k)$.
> >     * **Formula:**
> >         $$f_k(y) = \max \{ f_{k-1}(y), \quad p_k + f_{k-1}(y - w_k) \}$$
> >     * **Basis:** $f_0(y) = 0$ untuk semua `y` (keuntungan nol jika tidak ada objek).
> > 
> > -   **Langkah 3: Hitung Nilai Solusi Optimal (Contoh n=3, M=5)**
> >     * O1: ($w_1=2, p_1=65$), O2: ($w_2=3, p_2=80$), O3: ($w_3=1, p_3=30$)
> > 
> > **Tahap 1 (Objek 1: w=2, p=65):** $f_1(y) = \max\{ f_0(y), 65 + f_0(y-2) \}$
> > 
> > | y | $f_0(y)$ | $65+f_0(y-2)$ | $f_1(y)$ | Keputusan ($x_1$) |
> > | :- | :--- | :--- | :--- | :--- |
> > | 0 | 0 | -∞ | **0** | Tidak ambil |
> > | 1 | 0 | -∞ | **0** | Tidak ambil |
> > | 2 | 0 | 65 | **65** | Ambil |
> > | 3 | 0 | 65 | **65** | Ambil |
> > | 4 | 0 | 65 | **65** | Ambil |
> > | 5 | 0 | 65 | **65** | Ambil |
> > 
> > **Tahap 2 (Objek 2: w=3, p=80):** $f_2(y) = \max\{ f_1(y), 80 + f_1(y-3) \}$
> > 
> > | y | $f_1(y)$ | $80+f_1(y-3)$ | $f_2(y)$ | Keputusan ($x_2$) |
> > | :- | :--- | :--- | :--- | :--- |
> > | 0 | 0 | -∞ | **0** | Tidak ambil |
> > | 1 | 0 | -∞ | **0** | Tidak ambil |
> > | 2 | 65 | -∞ | **65** | Tidak ambil |
> > | 3 | 65 | $80+f_1(0)=80$ | **80** | Ambil |
> > | 4 | 65 | $80+f_1(1)=80$ | **80** | Ambil |
> > | 5 | 65 | $80+f_1(2)=145$ | **145**| Ambil |
> > 
> > **Tahap 3 (Objek 3: w=1, p=30):** $f_3(y) = \max\{ f_2(y), 30 + f_2(y-1) \}$
> > 
> > | y | $f_2(y)$ | $30+f_2(y-1)$ | $f_3(y)$ | Keputusan ($x_3$) |
> > | :- | :--- | :--- | :--- | :--- |
> > | 0 | 0 | -∞ | **0** | Tidak ambil |
> > | 1 | 0 | $30+f_2(0)=30$ | **30** | Ambil |
> > | 2 | 65 | $30+f_2(1)=30$ | **65** | Tidak ambil |
> > | 3 | 80 | $30+f_2(2)=95$ | **95** | Ambil |
> > | 4 | 80 | $30+f_2(3)=110$ | **110**| Ambil |
> > | 5 | 145 | $30+f_2(4)=110$ | **145**| Tidak ambil |
> > 
> > -   **Langkah 4: Rekonstruksi Solusi Optimal**
> >     * Keuntungan maksimum untuk kapasitas **M=5** adalah **$f_3(5) = 145$**.
> >     1.  **Tahap 3 (y=5):** Nilai 145 berasal dari $f_2(5)$, bukan dari $30+f_2(4)$. Artinya, **Objek 3 tidak diambil** ($x_3=0$). Kita sekarang melihat status `y=5` pada tahap sebelumnya.
> >     2.  **Tahap 2 (y=5):** Nilai 145 berasal dari $80+f_1(2)$, bukan dari $f_1(5)$. Artinya, **Objek 2 diambil** ($x_2=1$). Kapasitas sisa yang perlu diperiksa di tahap sebelumnya adalah `y = 5 - w_2 = 5 - 3 = 2`.
> >     3.  **Tahap 1 (y=2):** Nilai 65 berasal dari $65+f_0(0)$. Artinya, **Objek 1 diambil** ($x_1=1$).
> >     * **Solusi Akhir:** Objek yang diambil adalah {Objek 1, Objek 2}. Vektor solusi **X = (1, 1, 0)**.
> >     * **Verifikasi:** Total bobot = $w_1+w_2 = 2+3=5$ (sesuai M). Total keuntungan = $p_1+p_2 = 65+80=145$.
> > 
> > ### Persoalan 3: Penganggaran Modal (Capital Budgeting)
> > 
> > -   **Deskripsi Persoalan:**
> >     * Sebuah perusahaan memiliki anggaran total **M** untuk diinvestasikan pada **n** buah pabrik. Setiap pabrik mengajukan beberapa proposal proyek, di mana setiap proposal memiliki biaya **$c_i$** dan menghasilkan keuntungan **$R_i$**.
> >     * **Tujuan:** Memilih satu proposal dari setiap pabrik untuk **memaksimalkan total keuntungan** tanpa melebihi total anggaran M.
> > 
> > -   **Langkah 1 & 2: Karakteristik dan Hubungan Rekursif**
> >     * **Tahap (k):** Proses alokasi dana untuk Pabrik ke-`k`.
> >     * **Status ($x_k$):** **Jumlah modal kumulatif** yang telah dialokasikan dari tahap 1 hingga tahap `k`.
> >     * **Keputusan ($p_k$):** Proposal proyek yang dipilih untuk Pabrik ke-`k`.
> >     * **Hubungan Rekursif:** Misalkan $f_k(x_k)$ adalah keuntungan maksimum dari `k` pabrik pertama dengan total alokasi modal sebesar $x_k$.
> >         $$f_k(x_k) = \max_{p_k: c_k(p_k) \le x_k} \{ R_k(p_k) + f_{k-1}[x_k - c_k(p_k)] \}$$
> >     * **Logika:** Keuntungan maksimum di tahap `k` dengan modal $x_k$ adalah hasil dari memilih proposal terbaik $p_k$ (yang biayanya tidak melebihi $x_k$) ditambah keuntungan maksimum yang bisa didapat dari sisa modal ($x_k - c_k(p_k)$) untuk `k-1` pabrik sebelumnya.
> > 
> > -   **Langkah 3: Hitung Nilai Solusi Optimal (Contoh M=5, n=3)**
> > 
> > **Tahap 1 (Pabrik 1):**
> > 
> > | $x_1$ | $f_1(x_1)$ (Keuntungan Maks) | $p_1^*$ (Proposal yg Dipilih) |
> > | :---- | :--- | :--- |
> > | 0 | 0 | 1 |
> > | 1 | 5 | 2 |
> > | 2 | 6 | 3 |
> > | 3 | 6 | 3 |
> > | 4 | 6 | 3 |
> > | 5 | 6 | 3 |
> > 
> >  **Tahap 2 (Pabrik 2):**
> >  
> > | $x_2$ | $f_2(x_2)$ | $p_2^*$ |
> > | :---- | :--- | :--- |
> > | 0 | 0 | 1 |
> > | 1 | 5 | 1 |
> > | 2 | 8 | 2 |
> > | 3 | 13 | 2 |
> > | 4 | 14 | 2 atau 3 |
> > | 5 | 17 | 4 |
> > 
> >   **Tahap 3 (Pabrik 3):**
> > 
> > | $x_3$ | $f_3(x_3)$ | $p_3^*$ |
> > | :---- | :--- | :--- |
> > | 5 | **17** | 1 atau 2 |
> > 
> > -   **Langkah 4: Rekonstruksi Tiga Solusi Optimal**
> >     * Keuntungan maksimum total adalah **$f_3(5) = 17$ milyar**. Ini bisa dicapai melalui dua pilihan untuk Pabrik 3.
> >     * **Kasus 1: Pabrik 3 memilih $p_3^*=1$ (Biaya=0, Untung=0)**
> >         * Modal untuk tahap sebelumnya: $x_2 = 5 - c_3(1) = 5 - 0 = 5$.
> >         * Di tabel Tahap 2, $f_2(5)=17$ dicapai dengan $p_2^*=4$ (Biaya=4).
> >         * Modal untuk tahap awal: $x_1 = 5 - c_2(4) = 5 - 4 = 1$.
> >         * Di tabel Tahap 1, $f_1(1)=5$ dicapai dengan $p_1^*=2$ (Biaya=1).
> >         * **Solusi #1: Proyek {2, 4, 1}.** Biaya: 1+4+0=5. Keuntungan: 5+12+0=17.
> > 
> >     * **Kasus 2: Pabrik 3 memilih $p_3^*=2$ (Biaya=1, Untung=3)**
> >         * Modal untuk tahap sebelumnya: $x_2 = 5 - c_3(2) = 5 - 1 = 4$.
> >         * Di tabel Tahap 2, $f_2(4)=14$ dicapai dengan **$p_2^*=2$** (Biaya=2) atau **$p_2^*=3$** (Biaya=3).
> >         * **Sub-kasus 2a: Pabrik 2 memilih $p_2^*=2$**
> >             * Modal untuk tahap awal: $x_1 = 4 - c_2(2) = 4 - 2 = 2$.
> >             * Di tabel Tahap 1, $f_1(2)=6$ dicapai dengan $p_1^*=3$ (Biaya=2).
> >             * **Solusi #2: Proyek {3, 2, 2}.** Biaya: 2+2+1=5. Keuntungan: 6+8+3=17.
> >         * **Sub-kasus 2b: Pabrik 2 memilih $p_2^*=3$**
> >             * Modal untuk tahap awal: $x_1 = 4 - c_2(3) = 4 - 3 = 1$.
> >             * Di tabel Tahap 1, $f_1(1)=5$ dicapai dengan $p_1^*=2$ (Biaya=1).
> >             * **Solusi #3: Proyek {2, 3, 2}.** Biaya: 1+3+1=5. Keuntungan: 5+9+3=17.


> [!cornell] #### Summary
> Dynamic programming *sangat efektif untuk masalah alokasi sumber daya terbatas*. Baik pada persoalan Knapsack maupun Capital Budgeting, polanya serupa: mendefinisikan *state* sebagai jumlah sumber daya yang tersedia (kapasitas atau modal), lalu pada setiap tahap, membuat keputusan optimal (ambil/tidak, atau pilih proyek mana) dengan mempertimbangkan keuntungan saat ini dan keuntungan optimal yang bisa didapat dari sisa sumber daya. Metode tabulasi memastikan semua kombinasi yang relevan dievaluasi untuk menjamin solusi optimal global.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:**
>  
>  -   **Generalisasi Masalah Alokasi:** Knapsack dan Capital Budgeting adalah contoh dari kelas masalah alokasi sumber daya. Pola pikir DP ini dapat diterapkan pada banyak skenario lain, seperti alokasi waktu untuk belajar berbagai mata pelajaran demi nilai maksimal, atau alokasi server untuk berbagai layanan demi latensi minimal. Kuncinya adalah adanya sumber daya yang terbatas dan "item" atau "tahapan" yang memberikan "nilai" dengan "biaya" tertentu.
>  -   **Knapsack: 0/1 vs. Unbounded:**
>     -   **0/1 Knapsack (yang dibahas):** Setiap objek hanya ada satu, bisa diambil atau tidak.
>     -   **Unbounded Knapsack:** Anda memiliki pasokan tak terbatas dari setiap jenis objek. Relasi rekursifnya sedikit berbeda dan lebih sederhana: $f(y) = \max_{i} \{ p_i + f(y - w_i) \}$. Perhatikan bahwa `f` di sisi kanan adalah `f`, bukan `f_{k-1}`, karena pada kapasitas yang sama kita bisa mempertimbangkan semua objek lagi.
>  -   **Kompleksitas Pseudo-Polinomial:** Kompleksitas DP untuk Knapsack adalah **O(n * M)**. Ini disebut *pseudo-polinomial* karena efisiensinya tidak hanya bergantung pada jumlah item (`n`), tetapi juga pada nilai numerik dari kapasitas (`M`). Jika `M` sangat besar (misal, $2^n$), algoritma ini menjadi tidak praktis dan kembali bersifat eksponensial.
>  -   **Hubungan dengan Coin Change Problem:** Masalah "Coin Change" (menemukan jumlah koin minimum untuk membentuk jumlah uang tertentu) adalah masalah DP klasik yang sangat mirip dengan Unbounded Knapsack. State-nya adalah jumlah uang yang harus dibentuk, dan keputusannya adalah koin mana yang akan digunakan selanjutnya.
>  
>  #### **Eksplorasi Mandiri:**
>  
>  -   **Modifikasi Soal:** Coba selesaikan kembali soal Knapsack di atas, tetapi asumsikan ini adalah Unbounded Knapsack (Anda boleh mengambil Objek 1, 2, atau 3 berkali-kali). Apakah solusi optimalnya berubah?
>  -   **Implementasi Kode:** Coba implementasikan solusi DP untuk 0/1 Knapsack dalam bentuk kode. Anda akan melihat bahwa membuat tabel 2D (`n` x `M`) dan mengisinya secara iteratif (bottom-up) adalah pendekatan yang paling lugas.
>  -   **Latihan Manual:** Buat soal Capital Budgeting Anda sendiri dengan 2 pabrik dan total anggaran 4. Lakukan perhitungan tabel secara manual untuk melatih pemahaman Anda tentang alur kerja dan proses rekonstruksi.
