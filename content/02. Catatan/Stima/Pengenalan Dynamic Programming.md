---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> >   - Definisi Dynamic Programming
> >   - DP vs. Algoritma Greedy
> >   - Contoh Graf Multi-tahap
> >   - Prinsip Optimalitas
> >   - Karakteristik Persoalan DP
> >   - Pendekatan: Maju vs. Mundur
> >   - Langkah-langkah Pengembangan
> >   - Persoalan: Lintasan Terpendek
> >   - Langkah 1: Karakteristik Solusi
> >   - Langkah 2: Hubungan Rekursif
> >   - Langkah 3: Perhitungan (Tabel)
> >   - Analisis Inkonsistensi Data
> >   - Langkah 4: Rekonstruksi Solusi
> >   - Analisis Hasil Akhir
> >   - Latihan: Perusahaan Modifikasi
> 
> > ### Definisi Dynamic Programming
> > * **Dynamic programming** adalah sebuah metode pemecahan masalah dengan cara menguraikan solusi menjadi sekumpulan **tahapan (stage)**. Solusi dari persoalan dipandang sebagai serangkaian keputusan yang saling berkaitan.
> > * Istilah "program" di sini merujuk pada perencanaan atau tabulasi, bukan pemrograman komputer. Istilah "dinamis" digunakan karena solusi dicari melalui perhitungan menggunakan tabel yang nilainya dapat berkembang.
> > * Umumnya digunakan untuk menyelesaikan **persoalan optimisasi** (maksimasi atau minimisasi).
> > 
> > ### Dynamic Programming vs. Algoritma Greedy
> > * **Algoritma Greedy:** Pada setiap langkah, mengambil keputusan yang *tampak terbaik* saat itu (optimal lokal) tanpa mempertimbangkan dampaknya ke depan. Hanya satu rangkaian keputusan yang dihasilkan.
> > * **Dynamic Programming:** Mempertimbangkan *semua* kemungkinan keputusan pada setiap tahap dan memilih mana yang akan menghasilkan solusi optimal secara global.
> > * **Contoh Perbedaan (Lintasan Terpendek):**
> > 		* **Graf Multi-tahap:**
> > 		* **Solusi Greedy (menurut sumber):** Memilih `1 → 2 → 6 → 9 → 10` dengan total biaya `2 + 4 + 3 + 4 = 13`.
> > 		* **Analisis Greedy:** Jika kita benar-benar mengikuti aturan greedy (pilih sisi dengan bobot terkecil dari simpul saat ini), dari simpul 2 kita seharusnya memilih sisi `(2,7)` dengan bobot 3, bukan `(2,6)` dengan bobot 4. Ini menunjukkan bahwa pendekatan greedy bisa ambigu dan seringkali tidak optimal secara global. DP akan memeriksa semua jalur untuk menemukan yang terbaik.
> > 
> > ### Prinsip Optimalitas
> > * Ini adalah fondasi dari dynamic programming.
> > * **Bunyi Prinsip:** *Jika sebuah solusi total adalah optimal, maka bagian dari solusi tersebut dari awal hingga tahap ke-k juga harus optimal.*
> > * Artinya, saat kita menghitung solusi untuk tahap `k+1`, kita bisa percaya dan menggunakan hasil optimal dari tahap `k` yang sudah dihitung sebelumnya, tanpa perlu meninjau ulang keputusan-keputusan awal.
> > 
> > ### Karakteristik Persoalan yang Cocok untuk Dynamic Programming:**
> > 1.  Persoalan dapat dibagi menjadi beberapa **tahap (stage)**, di mana satu keputusan dibuat per tahap.
> > 2.  Setiap tahap memiliki sejumlah **status (state)**, yang merepresentasikan semua kemungkinan masukan pada tahap tersebut.
> > 3.  Keputusan pada suatu tahap mentransformasikan status saat ini ke status pada tahap berikutnya.
> > 4.  Biaya (cost) pada suatu tahap bergantung pada biaya tahap sebelumnya dan biaya transisi antar tahap.
> > 5.  Ada **hubungan rekursif** yang menghubungkan keputusan optimal di tahap `k` dengan tahap `k+1`.
> > 6.  Prinsip Optimalitas berlaku.
> > 
> >   ### Dua Pendekatan Dynamic Programming
> > -  **Maju (Forward / Top-Down):** Perhitungan dimulai dari tahap 1, terus maju ke tahap 2, 3, ..., n. Rangkaian keputusan yang dicari adalah $x_1, x_2, \dots, x_{n}$.
> > -  **Mundur (Backward / Bottom-Up):** Perhitungan dimulai dari tahap akhir (n), terus mundur ke tahap n-1, ..., 1. Rangkaian keputusan yang dicari adalah $x_n, x_{n-1}, \dots, x_1$.
> > 
> >  ### Langkah-langkah Pengembangan Algoritma Dynamic Programming
> > 1.  **Karakteristikkan struktur solusi optimal:** Identifikasi tahap, status, dan variabel keputusan.
> > 2.  **Definisikan secara rekursif nilai solusi optimal:** Rumuskan formula rekurens.
> > 3.  **Hitung nilai solusi optimal:** Lakukan perhitungan secara maju atau mundur, biasanya menggunakan tabel.
> > 4.  **Rekonstruksi solusi optimal (opsional):** Telusuri kembali tabel untuk menemukan rangkaian keputusan yang menghasilkan nilai optimal.
> > 
> > 
> > ### Latihan: Lintasan Terpendek (Shortest Path)
> > 
> >   - **Langkah 1: Karakteristikkan Struktur Solusi Optimal**
> > 
> >       * **Tahap (k):** Proses memilih simpul tujuan pada tahap `k+1` (ada 4 tahap).
> >       * **Status (s):** Simpul-simpul pada setiap tahap.
> >       * **Keputusan ($x\_k$):** Simpul yang dipilih pada tahap `k`.
> > 
> >   - **Langkah 2: Definisikan Hubungan Rekursif (Pendekatan Maju)**
> > 
> >       * Misalkan $f\_k(s)$ adalah biaya lintasan terpendek dari simpul awal (1) ke simpul (status) `s` pada tahap `k`.
> >       * **Basis (k=1):** $f\_1(s) = c\_{1,s}$ (biaya dari simpul 1 ke simpul `s` di tahap 1).
> >       * **Rekurens (k=2,3,4):** $f\_k(s) = \\min\_{x\_k} { f\_{k-1}(x\_k) + c\_{x\_k,s} }$ (biaya minimum untuk mencapai `s` dari semua kemungkinan simpul $x\_k$ di tahap sebelumnya).
> > 
> >   - **Langkah 3: Hitung Nilai Solusi Optimal (Menggunakan Tabel)**
> > 
> > **Tahap 1:**
> >   
> > | s | $f_1(s)$ | Pilihan $x_1^*$ |
> > | :- | :--- | :--- |
> > | 2 | 2 | 1 |
> > | 3 | 4 | 1 |
> > | 4 | 3 | 1 |
> > 
> >  **Tahap 2:**
> >       
> > | s | $x_2=2$ $(f_1=2)$ | $x_2=3$ $(f_1=4)$ | $x_2=4$ $(f_1=3)$ | $f_2(s)$ | Pilihan $x_2^*$ |
> > | :- | :--- | :--- | :--- | :--- | :--- |
> > | 5 | $2+7=9$ | $4+3=7$ | $3+4=7$ | **7** | 3 atau 4 |
> > | 6 | $2+4=6$ | $4+5=9$ | $3+3=6$ | **6** | 2 atau 4 |
> > | 7 | $2+3=5$ | - | $3+5=8$ | **5** | 2 |
> > 
> >   - **Analisis Inkonsistensi Data Sumber:**
> > 
> >       * Materi sumber mencatat $f\_2(7) = 8$ dengan pilihan $x\_2^*$ bisa 2, 3, atau 4. Berdasarkan graf yang ada, $f\_1(2) + c\_{2,7} = 2+3=5$, yang seharusnya menjadi nilai minimum. Untuk konsistensi dengan alur perhitungan di sumber, terkadang kita harus mengikuti nilai yang diberikan meskipun tampak keliru, namun penting untuk menyadari adanya potensi kesalahan data tersebut. **Untuk perhitungan selanjutnya, kita akan menggunakan nilai yang kita hitung sendiri (yang konsisten dengan graf), yaitu $f\_2(7) = 5$**.
> > 
> > **Tahap 3:**
> >       
> > | s | $x_3=5$ $(f_2=7)$ | $x_3=6$ $(f_2=6)$ | $x_3=7$ $(f_2=5)$ | $f_3(s)$ | Pilihan $x_3^*$ |
> > | :- | :--- | :--- | :--- | :--- | :--- |
> > | 8 | $7+4=11$ | $6+5=11$ | $5+3=8$ | **8** | 7 |
> > | 9 | $7+3=10$ | $6+3=9$ | $5+6=11$ | **9** | 6 |
> > 
> > **Tahap 4 (Tujuan Akhir):**
> >       
> > | s | $x_4=8$ $(f_3=8)$ | $x_4=9$ $(f_3=9)$ | $f_4(s)$ | Pilihan $x_4^*$ |
> > | :- | :--- | :--- | :--- | :--- |
> > | 10 | $8+4=12$ | $9+4=13$ | **12** | 8 |
> > 
> >   - **Langkah 4: Rekonstruksi Solusi Optimal**
> > 
> >       * **Biaya terpendek ditemukan adalah 12.** Mari kita telusuri kembali dari akhir:
> > 
> >     <!-- end list -->
> > 
> >     1.  Pada `Tahap 4`, $f_4(10)=12$ dicapai dari $x_4^*=8$. Jadi, langkah terakhir adalah `8 → 10`.
> >     2.  Pada `Tahap 3`, untuk mencapai simpul 8, $f_3(8)=8$ dicapai dari $x_3^*=7$. Jadi, langkah sebelumnya adalah `7 → 8`.
> >     3.  Pada `Tahap 2`, untuk mencapai simpul 7, $f_2(7)=5$ dicapai dari $x_2^*=2$. Jadi, langkah sebelumnya adalah `2 → 7`.
> >     4.  Pada `Tahap 1`, untuk mencapai simpul 2, $f_1(2)=2$ dicapai dari $x_1^*=1$. Jadi, langkah awal adalah `1 → 2`.
> > 
> >     <!-- end list -->
> > 
> >       * **Jalur Optimal:** **`1 → 2 → 7 → 8 → 10`**
> >       * **Total Biaya:** `2 + 3 + 3 + 4 = 12`.
> > 
> >   - **Analisis Hasil Akhir vs. Sumber:**
> > 
> >       * Sumber materi menyimpulkan ada 3 jalur terpendek dengan panjang **11**. Namun, setelah perhitungan ulang yang teliti berdasarkan graf yang sama, hasil yang konsisten adalah satu jalur optimal dengan panjang **12**. Perbedaan ini kemungkinan besar disebabkan oleh kesalahan pengetikan pada tabel-tabel perhitungan di materi sumber. Jalur `1 → 4 → 6 → 9 → 10` yang sering dianggap solusi memiliki biaya 13.
> > 
> > ### Latihan: Perusahaan Modifikasi Mobil (Repair Shop)
> > 
> >   - **Deskripsi Persoalan:** Sebuah proses modifikasi mobil melalui 4 tahap (Towing, I\&D, D\&R, R\&T), di mana setiap tahap memiliki beberapa stasiun kerja. Tujuannya adalah menemukan urutan stasiun kerja yang menghasilkan total biaya minimum.
> >   - **Analisis:** Ini adalah persoalan lintasan terpendek pada graf multi-tahap, identik dengan contoh sebelumnya. Setiap tahap adalah lapisan simpul (stasiun), dan tujuannya adalah mencari jalur termurah dari tahap 1 ke tahap 4.
> >   - **Penyelesaian (Berdasarkan Rekonstruksi Sumber):**
> >       * Sumber menyebutkan menggunakan **pendekatan mundur**, namun tidak menyertakan data biaya atau tabel perhitungan. Sumber hanya memberikan hasil akhir dari proses rekonstruksi.
> >       * **Jalur Mundur yang Direkonstruksi:**
> >         1.  Dari Tahap 4 (R\&T) Stasiun-1, jalur termurah berasal dari Tahap 3 (D\&R) **Stasiun-3**. (Biaya langkah ini = 35).
> >         2.  Dari Tahap 3 (D\&R) Stasiun-3, jalur termurah berasal dari Tahap 2 (I\&D) **Stasiun-2**. (Biaya langkah ini = 85).
> >         3.  Dari Tahap 2 (I\&D) Stasiun-2, jalur termurah berasal dari salah satu stasiun di Tahap 1 (Towing). (Biaya langkah ini = 70).
> >       * **Penjadwalan Optimal:** (Stasiun Awal di Tahap 1) → Stasiun 2 (I\&D) → Stasiun 3 (D\&R) → Stasiun 1 (R\&T).
> >       * **Total Biaya Minimum:** `70 + 85 + 35 = 190`.
> > 

> [!cornell] #### Summary
> Dynamic programming adalah pendekatan pemecahan masalah optimisasi yang memecah persoalan menjadi tahapan-tahapan dan memanfaatkan Prinsip Optimalitas untuk membangun solusi secara efisien. Dengan mendefinisikan hubungan rekursif dan menggunakan tabel untuk menyimpan solusi sub-masalah, ia dapat secara sistematis menemukan solusi optimal global, tidak seperti algoritma greedy. Penerapannya pada persoalan lintasan terpendek di graf multi-tahap menunjukkan kemampuannya untuk mengevaluasi semua jalur yang relevan dan merekonstruksi rute dengan biaya terendah, meskipun proses ini memerlukan ketelitian data yang tinggi.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
> - **Top-Down (Maju) vs. Bottom-Up (Mundur):**
> 	 - **Bottom-Up (Mundur):** Ini adalah pendekatan DP klasik yang menggunakan tabel (tabulasi). Dimulai dari kasus terkecil (misal, tahap akhir), lalu secara iteratif menghitung solusi untuk masalah yang lebih besar hingga mencapai solusi akhir. Contoh: Perhitungan `f(s)` di tabel lintasan terpendek.
> 	 - **Top-Down (Maju):** Pendekatan ini menggunakan rekursi biasa namun dengan tambahan **memoization** (mengingat/menyimpan hasil). Fungsi dipanggil untuk masalah utama. Jika sub-masalah ditemui untuk pertama kalinya, solusinya dihitung dan disimpan. Jika ditemui lagi, hasil yang disimpan langsung dikembalikan. Pendekatan ini seringkali lebih intuitif untuk ditulis.
> - **Memoization:** Ini adalah jantung dari DP Top-Down. Ini adalah teknik optimisasi di mana hasil dari pemanggilan fungsi yang mahal disimpan (di-cache) dan dikembalikan ketika input yang sama muncul kembali. Ini mengubah rekursi eksponensial menjadi perhitungan yang efisien, sama seperti pendekatan tabulasi Bottom-Up.
> - **Kompleksitas Lintasan Terpendek DP:** Untuk graf multi-tahap dengan `V` simpul dan `E` sisi, kompleksitasnya adalah **O(V + E)**. Ini karena setiap simpul dan sisi pada dasarnya hanya dikunjungi atau diproses sekali selama perhitungan maju atau mundur. Ini jauh lebih efisien daripada mencoba semua kemungkinan jalur secara brute-force.
> - **Menangani Inkonsistensi Sumber:** Kemampuan untuk mengenali dan menganalisis inkonsistensi dalam materi pembelajaran adalah keterampilan kritis. Dalam kasus ini, dengan melakukan perhitungan ulang secara mandiri, kita tidak hanya memverifikasi pemahaman kita tentang metode tersebut tetapi juga mengidentifikasi batasan dari materi yang diberikan.
> 
> #### Eksplorasi Mandiri
> 
> - **Perbaiki Contoh:** Ambil graf lintasan terpendek dari materi. Coba hitung ulang semua nilai `f_k(s)` menggunakan nilai dari tabel sumber yang tidak konsisten (misal, `f_2(7)=8`). Lihat apakah Anda bisa sampai pada kesimpulan akhir sumber (total biaya 11). Ini akan melatih ketelitian Anda dalam mengikuti alur logika, bahkan jika datanya keliru.
> - **Implementasi Sederhana:** Buat representasi graf multi-tahap sederhana dalam Python (misalnya, menggunakan list of lists untuk adjacency matrix antar tahap). Terapkan algoritma dynamic programming (maju) untuk menemukan jalur terpendek. Ini akan memberikan pemahaman yang lebih dalam daripada sekadar mengikuti tabel.