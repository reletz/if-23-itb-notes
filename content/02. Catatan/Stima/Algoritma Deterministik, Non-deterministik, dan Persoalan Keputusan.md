_Back to_ [[01. Matkul/Stima]]

> [!cornell] Algoritma Deterministik, Non-deterministik, dan Persoalan Keputusan
> 
> > ## Questions/Cues
> > 
> > - Algoritma Deterministik Definisi
> > - Cara Kerja Algoritma Deterministik
> > - Contoh Algoritma Deterministik
> > - Algoritma Non-deterministik Definisi
> > - Mesin Non-deterministik
> > - Penggunaan Algoritma Non-deterministik
> > - Tahap Algoritma Non-deterministik (Menerka)
> > - Tahap Algoritma Non-deterministik (Verifikasi)
> > - Contoh Non-deterministic Search
> > - Kompleksitas Non-deterministic Search
> > - Persoalan Keputusan Definisi
> > - Contoh Persoalan Keputusan
> > - SAT (Satisfiable Problem)
> > - Persoalan Optimasi vs Keputusan
> > - Hubungan Solusi Optimasi & Keputusan
> 
> > ### Algoritma Deterministik, Non-deterministik, dan Persoalan Keputusan
> > 
> > **5. Algoritma Deterministik vs Non-deterministik** Klasifikasi ini berkaitan dengan bagaimana langkah selanjutnya dalam algoritma ditentukan.
> > 
> > - **Algoritma Deterministik:**
> >     
> >     - Adalah algoritma yang **dapat ditentukan dengan pasti aksi apa yang akan dikerjakan selanjutnya** pada setiap langkah. Tidak ada pilihan atau tebakan; setiap langkah mengikuti aturan yang jelas.
> >     - Algoritma ini bekerja **sesuai dengan cara program dieksekusi oleh komputer** sungguhan saat ini.
> >     - **Semua algoritma yang biasa dipelajari** dalam perkuliahan (seperti Sequential Search, Sorting, dll.) adalah algoritma deterministik.
> >     - **Contoh:** Sequential Search memiliki kompleksitas waktu O(n) karena setiap langkah perbandingan dan pergeseran indeks ditentukan secara pasti.
> > - **Algoritma Non-deterministik:**
> >     
> >     - Adalah algoritma yang di dalamnya berhadapan dengan **beberapa pilihan aksi (opsi)**, dan algoritma **memiliki kemampuan untuk menerka atau memilih sebuah aksi** dari opsi-opsi tersebut. Pilihan ini tidak ditentukan oleh aturan pasti, melainkan semacam "tebakan yang benar".
> >     - Algoritma ini dijalankan oleh **mesin non-deterministik** (komputer hipotetik, imajiner, atau teoritis). Contoh paling terkenal adalah mesin Turing non-deterministik. Mesin ini secara teoritis dapat "menjelajahi" semua kemungkinan pilihan secara paralel atau selalu membuat pilihan yang "benar" jika solusi ada.
> >     - Algoritma non-deterministik **dapat digunakan untuk menghampiri solusi persoalan-persoalan yang solusi eksaknya membutuhkan waktu komputasi yang mahal** (misalnya, eksponensial). Contohnya untuk menyelesaikan persoalan TSP, Knapsack, dll.
> >     - Ada **dua tahap** di dalam algoritma non-deterministik:
> >         1. **Tahap menerka atau memilih (non-deterministik):** Diberikan _instance_ persoalan, tahap ini memilih atau menerka satu opsi dari beberapa opsi yang ada. Cara membuat pilihan itu **tidak didefinisikan aturannya**; diasumsikan pilihan "tepat" yang akan mengarah ke solusi selalu dipilih jika ada.
> >         2. **Tahap verifikasi (deterministik):** Memeriksa apakah opsi yang diterka menyatakan solusi. Luaran dari tahap ini adalah sinyal sukses jika solusi ditemukan atau sinyal gagal jika bukan solusi. Tahap ini harus bersifat deterministik.
> >     - **Contoh: Non-deterministic Search** (mencari elemen x dalam array A berukuran n):
> >         - **Tahap menerka:** `k <- Pilih(1, n)` (pilih sebuah indeks k secara acak/non-deterministik dari 1 sampai n). Kompleksitasnya O(1) (secara teoritis).
> >         - **Tahap verifikasi:** Memeriksa `if (A[k] == x)`, lalu `write(k); Sukses()` atau `write(-1); Gagal()`. Langkah ini memiliki kompleksitas O(1) (hanya satu perbandingan).
> >         - **Total kompleksitas waktu** untuk algoritma non-deterministik Search adalah O(1). Ini menunjukkan kemampuan teoritis mesin non-deterministik untuk menerka solusi dengan cepat.
> > 
> > **6. Persoalan Keputusan (Decision Problem)**
> > 
> > - Dalam membahas teori kelas kompleksitas P dan NP, kita **membatasi pada persoalan keputusan**.
> > - **Persoalan keputusan** adalah persoalan yang **solusinya hanya jawaban “yes” atau “no”**. Ini ekivalen dengan accept/reject, ada/tidak ada, bisa/tidak bisa.
> > - **Contoh persoalan keputusan:**
> >     - Diberikan integer x, tentukan apakah elemen x terdapat di dalam tabel? (Ada/tidak ada).
> >     - Diberikan integer x, tentukan apakah x bilangan prima? (Prima/tidak prima).
> >     - **Persoalan sirkuit Hamilton:** Apakah terdapat sirkuit Hamilton di dalam graf ini? (Yes/no).
> >     - **Clique Problem:** Apakah terdapat _clique_ yang jumlah simpulnya 5? (Yes/no). (_Clique_ adalah subgraf lengkap di mana setiap pasang simpul terhubung).
> >     - **SAT (Satisfiable Problem):** Diberikan himpunan peubah Boolean X dan klausa C, apakah terdapat _assignment_ nilai-nilai peubah sehingga C _satisfied_ (bernilai _true_)? (Yes/no). Klausa Boolean mengandung peubah atau negasinya (misalnya x1​∨¬x2​). _Assignment_ nilai kebenaran (1=_true_, 0=_false_) untuk peubah-peubah diuji untuk melihat apakah seluruh klausa bernilai _true_ secara simultan. Stephen Arthur Cook memperkenalkan persoalan SAT pada tahun 1971.
> > 
> > **7. Persoalan Optimasi dan Persoalan Keputusan yang Bersesuaian**
> > 
> > - Setiap persoalan optimasi yang kita kenal memiliki **decision problem yang bersesuaian**. Artinya, masalah mencari nilai terbaik dapat diubah menjadi masalah "apakah ada nilai yang setidaknya sebesar/sekecil X?".
> > - **Contoh:**
> >     - **Travelling Salesperson Optimization Problem (TSOP):** Carilah tur dengan total bobot sisi minimal.
> >     - **Travelling Salesperson Decision Problem (TSDP):** Apakah terdapat tur dengan total bobot sisinya ≤d? (di mana d adalah nilai ambang batas yang diberikan).
> >     - **Integer Knapsack Optimization Problem:** Tentukan objek-objek yang dimasukkan ke dalam knapsack agar tidak melebihi kapasitas W namun memberikan total profit maksimum.
> >     - **Integer Knapsack Decision Problem:** Apakah dapat memasukkan objek-objek ke dalam knapsack agar tidak melebihi W tetapi total profitnya ≥P?
> >     - **Graph-Colouring Optimization Problem:** Tentukan jumlah minimal warna yang dibutuhkan untuk mewarnai graf sehingga dua simpul bertetangga memiliki warna berbeda.
> >     - **Graph-Colouring Decision Problem:** Apakah terdapat pewarnaan graf yang menggunakan paling banyak m warna sedemikian sehingga dua simpul bertetangga memiliki warna berbeda?
> > - Sampai saat ini, **belum ditemukan algoritma polinomial** untuk persoalan optimasi atau persoalan keputusan pada contoh-contoh di atas. Mereka masih dianggap sulit untuk diselesaikan secara efisien.
> > - Namun, **jika kita dapat menemukan algoritma polinomial untuk jenis persoalan optimasi tersebut, maka kita juga mempunyai algoritma polinomial untuk persoalan keputusan yang bersesuaian**.
> > - Ini karena **solusi persoalan optimasi secara otomatis menghasilkan solusi persoalan keputusan yang bersesuaian**.
> >     - **Contoh:** Jika TSOP tur minimalnya 120, maka jawaban TSDP adalah "yes" jika d≤120, dan "no" jika d>120. Jika Integer Knapsack Optimization Problem keuntungan optimalnya 230, jawaban untuk _decision problem_-nya adalah "yes" jika P≤230, dan "no" jika P>230.

> [!cornell] Summary
> **Algoritma deterministik** memiliki langkah yang pasti (seperti Sequential Search), sedangkan **non-deterministik** (dijalankan oleh mesin hipotetik) dapat 'menerka' solusi, terdiri dari tahap tebakan dan verifikasi (seringkali cepat, contohnya Non-deterministic Search dengan O(1)). Dalam teori kompleksitas, fokus pada **persoalan keputusan** yang jawabannya 'yes/no' (misalnya, sirkuit Hamilton, SAT). Setiap persoalan optimasi memiliki persoalan keputusan yang bersesuaian, dan jika optimasi dapat diselesaikan secara polinomial, maka keputusannya juga. Namun, hingga kini, banyak persoalan optimasi/keputusan sulit belum ditemukan algoritma polinomialnya.