---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2211 Strategi Algoritma]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > -   Persoalan 1: Coin-Row
> > -   Coin-Row: Relasi Rekursif & Algoritma
> > -   Coin-Row: Contoh & Rekonstruksi
> > -   Persoalan 2: Robot Coin-Collection
> > -   Robot: Relasi Rekursif & Algoritma
> > -   Robot: Contoh & Rekonstruksi
> > -   Persoalan 3: String Editing
> > -   String Editing: Relasi Rekursif
> > -   String Editing: Contoh & Rekonstruksi
> > -   Persoalan 4: Reliability Design
> > -   Reliability: Fungsi Multiplikatif & Rekurens
> > -   Reliability: Contoh & Rekonstruksi
>  
> > ### Persoalan 1: Coin-Row Problem
> > 
> > -   **Deskripsi Persoalan:**
> >     * Diberikan sebuah baris yang terdiri dari `n` koin dengan nilai $c_1, c_2, \dots, c_n$.
> >     * Tujuannya adalah mengambil sejumlah koin untuk mendapatkan **jumlah uang maksimum**, dengan syarat **tidak boleh mengambil dua koin yang posisinya bersebelahan** di barisan awal.
> > 
> > -   **Penyelesaian dengan Dynamic Programming:**
> >     * **Relasi Rekursif:**
> >         * Misalkan $F(n)$ adalah jumlah maksimum yang bisa diambil dari `n` koin pertama.
> >         * Untuk menentukan $F(n)$, kita mempertimbangkan dua pilihan untuk koin ke-`n`:
> >             1.  **Ambil koin ke-`n`:** Keuntungannya adalah nilai koin tersebut ($c_n$) ditambah keuntungan maksimum dari `n-2` koin pertama (karena koin `n-1` tidak bisa diambil), yaitu $c_n + F(n-2)$.
> >             2.  **Tidak ambil koin ke-`n`:** Keuntungannya sama dengan keuntungan maksimum dari `n-1` koin pertama, yaitu $F(n-1)$. 
> >         * Kita memilih yang terbesar dari kedua pilihan tersebut.
> >         * **Formula:**
> >             $F(n) = \max\{c_n + F(n-2), F(n-1)\}$ untuk $n > 1$. 
> >             **Basis:** $F(0)=0$ dan $F(1)=c_1$.  6]
> > 
> >     * **Algoritma (Bottom-Up):**  
> >         ```
> >         ALGORITHM CoinRow(C[1..n])
> >         F[0] <- 0; F[1] <- C[1]
> >         for i <- 2 to n do
> >             F[i] <- max(C[i] + F[i-2], F[i-1])
> >         return F[n]
> >         ```
> > 
> >     * **Contoh Perhitungan:**
> >         * Diberikan barisan koin dengan nilai: 5, 1, 2, 10, 6, 2.  
> >         * Perhitungan tabel `F` dilakukan langkah demi langkah:  9]
> >             * `F[0] = 0`
> >             * `F[1] = 5`
> >             * `F[2] = max(C[2]+F[0], F[1]) = max(1+0, 5) = 5`
> >             * `F[3] = max(C[3]+F[1], F[2]) = max(2+5, 5) = 7`
> >             * `F[4] = max(C[4]+F[2], F[3]) = max(10+5, 7) = 15`
> >             * `F[5] = max(C[5]+F[3], F[4]) = max(6+7, 15) = 15`
> >             * `F[6] = max(C[6]+F[4], F[5]) = max(2+15, 15) = 17`
> >         * Jumlah maksimum yang bisa didapat adalah **17**.  8]
> > 
> >     * **Rekonstruksi Solusi (Mencari Koin yang Dipilih):**
> >         * Kita melakukan penelusuran mundur (backtrace) untuk melihat pilihan mana yang menghasilkan nilai maksimum di setiap langkah.  11]
> >         1.  $F(6)=17$ berasal dari $c_6 + F(4)$, artinya koin **$c_6=2$ diambil**.  12]
> >         2.  Lanjut ke $F(4)=15$, yang berasal dari $c_4 + F(2)$, artinya koin **$c_4=10$ diambil**.  13]
> >         3.  Lanjut ke $F(2)=5$, yang berasal dari $F(1)$, artinya koin $c_2$ tidak diambil.  14]
> >         4.  $F(1)$ berarti koin **$c_1=5$ diambil**.  14]
> >         * **Himpunan koin optimal:** $\{c_1, c_4, c_6\}$ atau {5, 10, 2}.  15]
> >     * **Kompleksitas:** Waktu $\Theta(n)$ dan Ruang $\Theta(n)$.  16]
> > 
> > ### Persoalan 2: Robot Coin-Collection
> > 
> > -   **Deskripsi Persoalan:**
> >     * Terdapat papan berukuran `n x m` dengan beberapa koin diletakkan di sel-selnya (maksimal satu koin per sel).  19]
> >     * Sebuah robot mulai dari sel kiri atas `(1,1)` dan harus mencapai sel kanan bawah `(n,m)`.  20]
> >     * Robot hanya bisa bergerak **satu sel ke kanan** atau **satu sel ke bawah**.  21]
> >     * **Tujuan:** Mengumpulkan jumlah koin semaksimal mungkin.  20]
> > 
> > -   **Penyelesaian dengan Dynamic Programming:**
> >     * **Relasi Rekursif:**
> >         * Misalkan $F(i,j)$ adalah jumlah koin maksimum yang bisa dikumpulkan untuk mencapai sel `(i,j)`.  24]
> >         * Robot bisa mencapai `(i,j)` hanya dari sel `(i-1,j)` (atas) atau `(i,j-1)` (kiri).  25]
> >         * Maka, jumlah koin maksimum di `(i,j)` adalah jumlah maksimum dari kedua sel sebelumnya, ditambah koin yang mungkin ada di `(i,j)` itu sendiri.  29]
> >         * **Formula:**
> >             $F(i,j) = \max\{F(i-1,j), F(i,j-1)\} + c_{ij}$  30]
> >             di mana $c_{ij}=1$ jika ada koin di `(i,j)`, dan 0 jika tidak.  30]
> >         * **Basis:** $F(0,j)=0$ dan $F(i,0)=0$.  30]
> > 
> >     * **Algoritma:**
> >         * Isi tabel `F` berukuran `n x m` baris demi baris atau kolom demi kolom.  31, 33]
> > 
> >     * **Rekonstruksi Solusi (Mencari Jalur):**
> >         * Lakukan penelusuran mundur dari `F(n,m)`.
> >         * Di sel `(i,j)`, jika $F(i-1,j) > F(i,j-1)$, maka jalur optimal datang dari **atas**.  34]
> >         * Jika $F(i-1,j) < F(i,j-1)$, maka jalur optimal datang dari **kiri**.  35]
> >         * Jika nilainya sama, jalur bisa datang dari kedua arah, menghasilkan beberapa jalur optimal.  36]
> >         * Contoh pada Gambar 8.3 menunjukkan ada dua jalur optimal untuk mengumpulkan 5 koin.  37, 40]
> >     * **Kompleksitas:** Waktu $\Theta(nm)$ dan Ruang $\Theta(nm)$.  34]
> > 
> > ### Persoalan 3: String Editing
> > 
> > -   **Deskripsi Persoalan:**
> >     * Diberikan dua string, X dan Y.  41]
> >     * **Tujuan:** Mengubah string X menjadi Y menggunakan urutan operasi edit dengan **total biaya minimum**.  42, 44]
> >     * **Operasi yang Diizinkan:** *Insert* (sisip), *Delete* (hapus), dan *Change* (ubah), masing-masing memiliki biaya.  42]
> > 
> > -   **Penyelesaian dengan Dynamic Programming:**
> >     * **Prinsip Optimalitas:** Berlaku untuk masalah ini.  48] Jika seluruh urutan edit optimal, maka setelah operasi pertama, sisa urutan edit juga harus optimal untuk string yang tersisa.  48]
> >     * **Relasi Rekursif:**
> >         * Misalkan `cost(i,j)` adalah biaya minimum untuk mengubah `X[1..i]` (i karakter pertama X) menjadi `Y[1..j]` (j karakter pertama Y).  50]
> >         * Untuk menghitung `cost(i,j)`, ada tiga kemungkinan operasi terakhir:
> >             1.  **Hapus $x_i$**: Ubah `X[1..i-1]` menjadi `Y[1..j]`, lalu hapus $x_i$. Biaya: `cost(i-1, j) + D(x_i)`.  56]
> >             2.  **Ubah $x_i$ menjadi $y_j$**: Ubah `X[1..i-1]` menjadi `Y[1..j-1]`, lalu ubah $x_i$ menjadi $y_j$. Biaya: `cost(i-1, j-1) + C(x_i, y_j)`.  56]
> >             3.  **Sisip $y_j$**: Ubah `X[1..i]` menjadi `Y[1..j-1]`, lalu sisipkan $y_j$. Biaya: `cost(i, j-1) + I(y_j)`.  58]
> >         * **Formula:**
> >             `cost(i,j) = min { opsi 1, opsi 2, opsi 3 }`  59]
> >         * **Basis:** `cost(0,0)=0`. `cost(i,0)` adalah biaya menghapus `i` karakter pertama X. `cost(0,j)` adalah biaya menyisipkan `j` karakter pertama Y.  52, 54]
> > 
> >     * **Contoh & Rekonstruksi:**
> >         * Untuk X = "aabab" dan Y = "babb", dengan biaya D=1, I=1, C=2, tabel biaya `cost(i,j)` dapat dihitung.  69]
> >         * Nilai akhir `cost(5,4)` adalah **3**, yang merupakan biaya edit minimum.  74]
> >         * Dengan menelusuri kembali tabel, dapat ditemukan urutan editnya. Contoh, salah satu urutan optimal adalah hapus $x_1$, hapus $x_2$, dan sisipkan $y_4$.  74]
> >     * **Kompleksitas:** Waktu `O(mn)`.  66]
> > 
> > ### Persoalan 4: Reliability Design
> > 
> > -   **Deskripsi Persoalan:**
> >     * Sebuah sistem terdiri dari `n` perangkat ($D_i$) yang terhubung secara seri.  79]
> >     * Untuk meningkatkan keandalan, setiap perangkat pada tahap `i` dapat diduplikasi sebanyak $m_i$ kali secara paralel.  83]
> >     * **Tujuan:** Memilih jumlah duplikasi ($m_i$) untuk setiap perangkat guna **memaksimalkan keandalan total sistem**, dengan batasan **total biaya tidak melebihi C**.  92, 94]
> > 
> > -   **Penyelesaian dengan Dynamic Programming:**
> >     * **Fungsi Multiplikatif:** Keandalan total sistem adalah produk dari keandalan setiap tahap: $\Pi \phi_i(m_i)$.  91]
> >     * **Relasi Rekursif:**
> >         * Mirip dengan Knapsack/Capital Budgeting, tetapi menggunakan perkalian.
> >         * Misalkan $f_i(x)$ adalah keandalan **maksimum** dari `i` tahap pertama dengan total biaya tidak melebihi `x`.  9
> >         * **Formula:**
> >             $f_i(x) = \max_{1 \le m_i \le u_i} \{ \phi_i(m_i) \times f_{i-1}(x - c_i m_i) \}$  100]
> >             di mana $u_i$ adalah batas atas jumlah duplikasi untuk perangkat `i` yang dimungkinkan oleh anggaran.  96]
> >         * **Basis:** $f_0(x) = 1$ (keandalan sistem dengan 0 tahap adalah 100%).  100]
> > 
> >     * **Contoh & Rekonstruksi:**
> >         * Contoh diberikan dengan 3 tahap dan biaya total C=105.  102, 103]
> >         * Perhitungan dilakukan dengan menghasilkan himpunan `S^i` yang berisi pasangan `(keandalan, biaya)` yang tidak terdominasi.  101, 106]
> >         * Hasil akhir yang didapat adalah keandalan **0.648** dengan biaya **100**.  110]
> >         * Dengan menelusuri balik, ditemukan bahwa konfigurasi optimalnya adalah $m_1=1$, $m_2=2$, dan $m_3=2$.  110]



> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
> -   **Optimisasi Ruang (Space Optimization):** Untuk banyak masalah DP, kebutuhan ruang bisa dikurangi secara signifikan.
>     -   **Coin-Row:** Untuk menghitung `F[i]`, kita hanya butuh `F[i-1]` dan `F[i-2]`. Kita tidak perlu menyimpan seluruh array `F`. Dengan hanya menyimpan dua nilai sebelumnya, kompleksitas ruang dapat dikurangi dari `O(n)` menjadi `O(1)`.
>      -   **Robot-Collection & String Editing:** Untuk menghitung baris `i` pada tabel, kita hanya membutuhkan data dari baris `i-1`. Jadi, kita tidak perlu menyimpan seluruh tabel `n x m`. Kita hanya perlu menyimpan dua baris pada satu waktu, mengurangi kompleksitas ruang dari `O(nm)` menjadi `O(m)` (atau `O(n)` jika per kolom).
>  -   **Levenshtein Distance:** Masalah *String Editing* adalah implementasi dari algoritma yang sangat terkenal untuk menghitung **Levenshtein Distance**. Jarak ini mengukur "perbedaan" antara dua string dan memiliki aplikasi yang sangat luas, mulai dari fitur *spell-checker* di pengolah kata, deteksi plagiarisme, hingga penyelarasan sekuens DNA dalam bioinformatika.
>  -   **DP dengan Fungsi Multiplikatif:** Persoalan *Reliability Design* menunjukkan bagaimana kerangka DP dapat beradaptasi. Logika dasarnya tetap sama (membuat keputusan di setiap tahap), tetapi cara mengkombinasikan hasilnya berubah. Alih-alih `+` dan `0` (sebagai identitas aditif), kita menggunakan `*` dan `1` (sebagai identitas multiplikatif).
>  
>  #### Eksplorasi Mandiri
>  
>  -   **Implementasi String Editing:** Cobalah untuk mengimplementasikan algoritma String Editing. Visualisasikan tabel `cost(i,j)` yang dihasilkan. Setelah itu, implementasikan juga fungsi *backtracing* untuk mencetak urutan edit (delete, insert, change) yang sebenarnya.
>  -   **Variasi Coin-Row:** Bagaimana jika aturannya diubah: "Anda boleh mengambil koin yang bersebelahan, tetapi tidak boleh mengambil tiga koin berturut-turut"? Coba pikirkan bagaimana relasi rekursif `F(n)` akan berubah. (Petunjuk: *state* Anda mungkin perlu menyimpan lebih banyak informasi daripada hanya `F(n)`).
>  -   **Koneksi ke Masalah Lain:** Perhatikan bahwa *Robot Coin-Collection* adalah variasi dari masalah "Longest Common Subsequence" (LCS) dan "Shortest Path on a DAG" (Directed Acyclic Graph). Memahami koneksi ini akan memperluas kemampuan Anda dalam mengenali pola-pola DP.
