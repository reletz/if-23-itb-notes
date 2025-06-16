---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > -   TSP & Prinsip Optimalitas
> > -   Karakteristik DP untuk TSP
> > -   State Kompleks: `(i, S)`
> > -   Formula Rekursif `f(i, S)`
> > -   Contoh n=4: Perhitungan Basis
> > -   Analisis Inkonsistensi Data
> > -   Perhitungan Tahap `|S|=1`
> > -   Perhitungan Tahap `|S|=2`
> > -   Perhitungan Akhir
> > -   Rekonstruksi Tur Optimal
>  
> > ### Persoalan Travelling Salesperson Problem (TSP) dengan Dynamic Programming
> > * **Definisi:** Menemukan tur terpendek dari kota asal, mengunjungi setiap kota lain tepat sekali, dan kembali ke kota asal.
> > * **Penerapan Prinsip Optimalitas:** *Dynamic programming* dapat diterapkan karena Prinsip Optimalitas berlaku. Jika tur `1 → k → ... → 1` adalah optimal, maka sub-jalur dari `k` ke `1` (yang melalui semua simpul sisanya) juga *harus* merupakan jalur terpendek dari `k` ke `1` yang melalui himpunan simpul tersebut.
> > 
> > -   **Langkah 1: Karakteristikkan Struktur Solusi Optimal:**
> >     * **Tahap:** Jumlah simpul yang telah dikunjungi dalam tur.
> >     * **State:** Ini adalah bagian yang paling krusial dan berbeda dari contoh sebelumnya. Sebuah status tidak cukup hanya dengan mengetahui posisi saat ini. Kita juga perlu tahu **simpul mana saja yang belum dikunjungi**. Oleh karena itu, status didefinisikan oleh sebuah pasangan: **`(i, S)`**.
> >         * **`i`**: Simpul saat ini (kota tempat kita berada sekarang).
> >         * **`S`**: Himpunan (set) dari simpul-simpul yang **masih harus dikunjungi** sebelum kembali ke simpul awal (simpul 1).
> >     * **Keputusan:** Dari status `(i, S)`, keputusan yang diambil adalah memilih simpul berikutnya, `j`, dari himpunan `S`.
> > 
> > -   **Langkah 2: Definisikan Hubungan Rekursif**
> >     * **Fungsi Tujuan:** Misalkan `f(i, S)` adalah panjang (biaya) lintasan terpendek yang dimulai dari simpul `i`, mengunjungi semua simpul dalam himpunan `S` tepat sekali, dan berakhir di simpul 1.
> >     * **Logika:** Untuk menghitung `f(i, S)`, kita mencoba semua kemungkinan untuk langkah berikutnya. Kita bisa pergi dari `i` ke salah satu simpul `j` di dalam `S`. Biaya untuk pilihan ini adalah biaya dari `i` ke `j` (`c_ij`) ditambah biaya sub-masalah sisanya, yaitu `f(j, S - {j})` (biaya terpendek dari `j`, mengunjungi sisa simpul `S-{j}`, lalu ke 1). Kita pilih `j` yang memberikan total biaya minimum.
> >     * **Formula Rekurens:**
> >         $$f(i, S) = \min_{j \in S} \{ c_{ij} + f(j, S - \{j\}) \}$$
> >     * **Basis:** Kasus dasar terjadi ketika tidak ada lagi simpul yang harus dikunjungi (himpunan `S` kosong). Dari simpul `i`, kita hanya perlu kembali ke simpul 1.
> >         $$f(i, \emptyset) = c_{i1}$$
> > 
> > -   **Langkah 3: Hitung Nilai Solusi Optimal (Contoh n=4)**
> > 
> > -   **Analisis Inkonsistensi Data:**
> >     * Materi sumber menyajikan beberapa matriks biaya yang berbeda. Kita akan gunakan yang terakhir disajikan sebelum perhitungan. Namun, nilai basis `c_{i1}` yang digunakan dalam perhitungan (`c_{21}=5, c_{31}=6, c_{41}=8`) juga tidak cocok dengan matriks tersebut. Untuk menjaga alur contoh, kita akan **mengikuti nilai-nilai yang digunakan dalam perhitungan sumber**, bukan nilai dari matriks yang ditampilkan.
> >     Matriks Biaya (untuk referensi): $C = \begin{pmatrix} 0 & 10 & 15 & 20 \\ 12 & 0 & 9 & 10 \\ 10 & 13 & 0 & 12 \\ 13 & 8 & 9 & 0 \end{pmatrix}$
> > 
> >     * **Tahap 1: Basis Kasus ($|S|=0$)**
> >         $f(2, \emptyset) = c_{21} = 5$
> >         $f(3, \emptyset) = c_{31} = 6$
> >         $f(4, \emptyset) = c_{41} = 8$
> > 
> >     * **Tahap 2: Perhitungan untuk $|S|=1$**
> >         $f(2, \{3\}) = c_{23} + f(3, \emptyset) = 9 + 6 = 15$
> >         $f(2, \{4\}) = c_{24} + f(4, \emptyset) = 10 + 8 = 18$
> >         $f(3, \{2\}) = c_{32} + f(2, \emptyset) = 13 + 5 = 18$
> >         $f(3, \{4\}) = c_{34} + f(4, \emptyset) = 12 + 8 = 20$
> >         $f(4, \{2\}) = c_{42} + f(2, \emptyset) = 8 + 5 = 13$
> >         $f(4, \{3\}) = c_{43} + f(3, \emptyset) = 9 + 6 = 15$
> > 
> >     * **Tahap 3: Perhitungan untuk $|S|=2$**
> >         $f(2, \{3, 4\}) = \min \{ c_{23} + f(3, \{4\}), \quad c_{24} + f(4, \{3\}) \} = \min \{ 9 + 20, \quad 10 + 15 \} = \min \{29, 25\} = \textbf{25}$
> >         $f(3, \{2, 4\}) = \min \{ c_{32} + f(2, \{4\}), \quad c_{34} + f(4, \{2\}) \} = \min \{ 13 + 18, \quad 12 + 13 \} = \min \{31, 25\} = \textbf{25}$
> >         $f(4, \{2, 3\}) = \min \{ c_{42} + f(2, \{3\}), \quad c_{43} + f(3, \{2\}) \} = \min \{ 8 + 15, \quad 9 + 18 \} = \min \{23, 27\} = \textbf{23}$
> > 
> >     * **Tahap Akhir: Menghitung Biaya Tur Lengkap**
> >         Tujuan kita adalah mencari $f(1, \{2, 3, 4\})$.
> >         $f(1, \{2, 3, 4\}) = \min \{ c_{12} + f(2, \{3, 4\}), \quad c_{13} + f(3, \{2, 4\}), \quad c_{14} + f(4, \{2, 3\}) \}$
> >         $= \min \{ 10 + 25, \quad 15 + 25, \quad 20 + 23 \}$
> >         $= \min \{35, 40, 43\} = \textbf{35}$
> > 
> > -   **Langkah 4: Rekonstruksi Tur Optimal**
> >     * Total biaya tur terpendek adalah **35**.
> >     1.  **Dari Simpul 1:** Nilai 35 didapat dari pilihan `j=2` ($10+25$). Maka, tur dimulai dengan **`1 → 2`**.
> >     2.  **Dari Simpul 2, dengan sisa {3,4}:** Kita lihat perhitungan $f(2, \{3, 4\})$. Nilai 25 didapat dari pilihan `j=4` ($10+15$). Maka, langkah berikutnya adalah ke simpul 4. Tur menjadi **`1 → 2 → 4`**.
> >     3.  **Dari Simpul 4, dengan sisa {3}:** Kita lihat perhitungan $f(4, \{3\})$. Hanya ada satu pilihan, yaitu ke simpul 3. Tur menjadi **`1 → 2 → 4 → 3`**.
> >     4.  **Dari Simpul 3, dengan sisa {}:** Tidak ada lagi simpul yang harus dikunjungi, maka kita kembali ke simpul 1.
> >     * **Tur Optimal:** **`1 → 2 → 4 → 3 → 1`**
> >     * **Verifikasi Biaya:** $c_{12} + c_{24} + c_{43} + c_{31} = 10 + 10 + 9 + 6 = 35$. Hasilnya konsisten.
> > 

> [!cornell] #### Summary
> Dynamic programming **menyediakan metode yang pasti (eksak) untuk menyelesaikan TSP** dengan mengubahnya menjadi serangkaian sub-masalah yang tumpang tindih. Kuncinya adalah mendefinisikan *state* secara cerdas menggunakan pasangan `(simpul saat ini, himpunan simpul sisa)`. Dengan menghitung biaya optimal untuk setiap kemungkinan *state* secara bertahap (bottom-up), dari himpunan sisa terkecil hingga terbesar, algoritma ini dapat menjamin penemuan tur dengan biaya terpendek. Meskipun optimal, kompleksitasnya yang eksponensial membuatnya hanya praktis untuk jumlah kota yang relatif kecil.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
>  
>  -   **Kompleksitas Algoritma:** Ini adalah poin paling penting tentang DP untuk TSP. Kompleksitasnya adalah **O(n² * 2ⁿ)**.
>      -   Ada sekitar **n * 2ⁿ** kemungkinan *state* `(i, S)`. (Ada `n` pilihan untuk `i`, dan sekitar `2^n` kemungkinan himpunan bagian `S`).
>      -   Untuk setiap *state*, kita perlu melakukan `n` operasi untuk menghitung `min`.
>      -   Hasilnya, `n * 2ⁿ * n = n² * 2ⁿ`. Ini jauh lebih baik daripada brute-force `O(n!)`, tetapi masih termasuk kelas masalah eksponensial dan tidak praktis untuk `n > 20`.
>  -   **Implementasi dengan Bitmask:** Dalam pemrograman kompetitif atau implementasi nyata, himpunan `S` tidak disimpan sebagai *set* atau *list*. Ia direpresentasikan sebagai **bitmask**: sebuah bilangan bulat di mana bit ke-`k` bernilai 1 jika kota `k` ada di dalam himpunan, dan 0 jika tidak. Ini membuat operasi seperti `menambah elemen`, `menghapus elemen`, dan `mengecek keanggotaan` menjadi operasi bitwise yang sangat cepat (`OR`, `XOR`, `AND`), sehingga implementasinya menjadi jauh lebih efisien.
>  -   **Perbandingan dengan Metode Lain:**
>      -   **Brute Force O(n!):** Mencoba semua permutasi, tidak mungkin.
>      -   **Dynamic Programming O(n²2ⁿ):** Jauh lebih baik, tapi masih eksponensial. Menemukan solusi eksak.
>      -   **Branch and Bound:** Tidak memiliki jaminan kompleksitas waktu yang ketat (bisa sama buruknya), tetapi dengan heuristik yang baik, ia seringkali dapat "memangkas" pohon pencarian dan menemukan solusi optimal lebih cepat di banyak kasus praktis.
>      -   **Algoritma Aproksimasi:** Untuk TSP dengan `n` yang besar, solusi eksak tidak dicari. Sebaliknya, digunakan algoritma aproksimasi (misalnya, Christofides algorithm) yang menjamin solusi dalam batas persentase tertentu dari solusi optimal, atau heuristik (misalnya, 2-opt, simulated annealing) yang menemukan solusi "sangat baik" tetapi tanpa jaminan optimalitas.
>  
>  #### Eksplorasi Mandiri
>  
>  -   **Latihan Manual 3 Kota:** Coba selesaikan TSP untuk 3 kota dengan matriks biaya buatan Anda sendiri menggunakan metode `f(i,S)`. Anda hanya perlu menghitung `f(i, ∅)` dan `f(i, {j})` sebelum menghitung `f(1, {2,3})`. Ini akan sangat memperkuat pemahaman Anda tentang cara kerja *state* dan rekurensi.
>  -   **Pikirkan tentang Memori:** Mengapa algoritma ini membutuhkan banyak memori? Karena kita perlu menyimpan hasil dari setiap `f(i,S)` dalam sebuah tabel (atau memoization cache). Jumlah *state* `(i, S)` sangat besar, sehingga kebutuhan memorinya juga eksponensial.