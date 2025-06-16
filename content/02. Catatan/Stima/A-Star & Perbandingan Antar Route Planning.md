---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > -   Ide Utama Algoritma A*
> > -   Formula A*: `f(n) = g(n) + h(n)`
> > -   Hubungan A* dengan UCS & Greedy
> > -   Lacak Contoh A* (Peta Romania)
> > -   Properti Algoritma A*
> > -   A* vs. Branch & Bound
> > -   Heuristik Admisibel (`h(n) ≤ h*(n)`)
> > -   Pentingnya Admisibilitas
> > -   Studi Kasus: 8-Puzzle
> > -   Penyelesaian 8-Puzzle dengan A*
> > -   Studi Kasus: Soal UAS
> > -   Perbandingan Akhir: UCS, Greedy, A*
>  
> > ### Ide Utama Algoritma A\* (A-Star)
> > Algoritma A\* dirancang untuk menggabungkan keunggulan dari dua pendekatan sebelumnya:
> > 1.  **Uniform Cost Search (UCS):** Yang mempertimbangkan biaya riil dari awal (`g(n)`) sehingga bersifat optimal.
> > 2.  **Greedy Best-First Search:** Yang menggunakan estimasi heuristik ke tujuan (`h(n)`) sehingga bersifat efisien (terarah).
> > 
> > A* menyeimbangkan keduanya untuk menemukan jalur terpendek secara efisien, dengan **menghindari ekspansi pada jalur yang sudah terbukti mahal.**
> > 
> > -   **Formula Evaluasi A\*: `f(n) = g(n) + h(n)`**
> >     * Ini adalah inti dari A*. Setiap simpul `n` dievaluasi berdasarkan:
> >         * `g(n)`: Biaya **sebenarnya** (yang sudah diketahui) untuk mencapai simpul `n` dari titik awal.
> >         * `h(n)`: Biaya **estimasi** (heuristik) dari simpul `n` untuk mencapai tujuan.
> >         * `f(n)`: **Estimasi total biaya** dari sebuah lintasan yang melalui simpul `n`.
> > 
> > -   **Hubungan A\* dengan Algoritma Lain:**
> >     * A\* adalah algoritma yang general. Algoritma lain dapat dilihat sebagai kasus khusus dari A\*:
> >         * Jika `h(n) = 0`, maka `f(n) = g(n)`. Algoritma menjadi **Uniform Cost Search (UCS)**.
> >         * Jika `g(n) = 0`, maka `f(n) = h(n)`. Algoritma menjadi **Greedy Best-First Search**.
> > 
> > -   **Lacak Contoh A\* (Arad ke Bucharest):**
> >     * `g(n)` = Jarak dari Arad, `h(n)` = Jarak garis lurus ke Bucharest.
> >     1.  **Dari Arad (A):**
> >         * `f(Sibiu) = g(S) + h(S) = 140 + 253 = 393`
> >         * `f(Timisoara) = g(T) + h(T) = 118 + 329 = 447`
> >         * `f(Zerind) = g(Z) + h(Z) = 75 + 374 = 449`
> >         * A* memilih **Sibiu (S)** dengan `f(n)` terendah (393).
> >     2.  **Dari Sibiu (S):**
> >         * `f(Rimnicu Vilcea) = g(R) + h(R) = (140+80) + 193 = 220 + 193 = 413`
> >         * `f(Fagaras) = g(F) + h(F) = (140+99) + 176 = 239 + 176 = 415`
> >         * `f(Arad) = g(A) + h(A) = (140+140) + 366 = 280 + 366 = 646`
> >         * A* memilih **Rimnicu Vilcea (R)** dengan `f(n)` terendah (413).
> >     3.  **Dari Rimnicu Vilcea (R):**
> >         * `f(Pitesti) = g(P) + h(P) = (220+97) + 100 = 317 + 100 = 417`
> >         * `f(Craiova) = ... = 526`
> >         * `f(Sibiu) = ... = 553`
> >         * A* memilih **Pitesti (P)**. *Catatan: `f(Fagaras)` dari langkah sebelumnya (415) masih ada di antrian, namun lebih tinggi dari 413, jadi R tetap diekspansi. Namun, setelah P diekspansi, `f(Fagaras)=415` menjadi yang terendah di antrian, jadi selanjutnya Fagaras yang diekspansi.*
> >     4.  **Ekspansi berlanjut** hingga **Bucharest** dipilih dari antrian, yang akan memberikan jalur optimal **A → S → R → P → B** dengan biaya **418**.
> > 
> > -   **Properti Algoritma A\*:**
> >     * **Lengkap (Complete)?:** Ya (selama `b` terbatas dan biaya langkah positif).
> >     * **Optimal?:** Ya, dengan syarat tertentu (lihat Heuristik Admisibel).
> >     * **Kompleksitas Waktu:** Eksponensial pada kasus terburuk, `O(b^m)`.
> >     * **Kompleksitas Ruang:** Menyimpan semua simpul di memori, `O(b^m)`.
> > 
> > -   **A\* vs. Branch & Bound (B&B):**
> >     * Keduanya mencari solusi optimal dengan menggunakan *bound* (batas).
> >     * Pada B&B, `cost + bound` mirip dengan `g(n) + h(n)`.
> >     * Jika B&B menggunakan strategi *best-first* dan heuristiknya adalah `cost + bound`, maka **B&B pada dasarnya sama dengan A\***.
> >     * Perbedaannya, *bound* pada B&B (seperti pada TSP) bisa dihitung dengan cara yang jauh lebih canggih (misal: *reduced cost matrix*).
> > 
> > -   **Heuristik Admisibel (Syarat Optimalitas):**
> >     * Sebuah heuristik `h(n)` dikatakan **admisibel** jika nilainya **tidak pernah melebih-lebihkan (overestimate)** biaya sebenarnya untuk mencapai tujuan.
> >     * Formula: `h(n) ≤ h*(n)` untuk setiap simpul `n`, di mana `h*(n)` adalah biaya sebenarnya dari `n` ke tujuan.
> >     * Heuristik yang admisibel bersifat **optimistis**. Contoh: Jarak garis lurus selalu admisibel untuk pencarian rute darat, karena tidak mungkin ada jalan darat yang lebih pendek dari garis lurus.
> >     * **Teorema:** Jika `h(n)` admisibel, A* yang menggunakan pencarian berbasis pohon dijamin **optimal**.
> > 
> > -   **Pentingnya Admisibilitas:**
> >     * Jika heuristik **tidak admisibel** (terlalu pesimis, melebih-lebihkan biaya), A* bisa gagal menemukan solusi optimal. Ia mungkin "tertipu" untuk menghindari jalur yang sebenarnya optimal karena estimasi biayanya terlalu tinggi.
> > 
> > -   **Studi Kasus: 8-Puzzle:**
> >     * **Persoalan:** Menyusun ubin 3x3 dari konfigurasi acak ke konfigurasi terurut.
> >     * **A* untuk 8-Puzzle:**
> >         * `g(n)`: Jumlah langkah (geser) yang telah dilakukan dari awal.
> >         * `h(n)`: **Manhattan Distance**, yaitu jumlah total jarak horizontal dan vertikal dari setiap ubin ke posisi tujuannya.
> > 
> > -   **Contoh Penyelesaian 8-Puzzle dengan A\*:**
> >     * Dari **state awal**, hitung `h(n)` (Manhattan Distance) dan `g(n)=0`. `f(n) = 0 + h(n)`.
> >     * Bangkitkan semua kemungkinan langkah (anak-anaknya).
> >     * Untuk setiap anak, hitung `g(n)`-nya (yaitu `g(parent) + 1`) dan `h(n)`-nya yang baru.
> >     * Pilih anak dengan nilai `f(n) = g(n) + h(n)` terkecil untuk diekspansi selanjutnya.
> >     * Proses ini diulang hingga mencapai *goal state*.
> > 
> > -   **Studi Kasus: Soal UAS (Ujian Akhir Semester):**
> >     * Diberikan sebuah graf dengan biaya dan nilai heuristik (`banyaknya busur minimal ke tujuan`).
> >     * Soal meminta untuk mencari solusi dari titik A ke F menggunakan UCS, Greedy, dan A*.
> >     * **Hasil Perbandingan:**
> > 
> > | Algoritma              | Formula             | Jalur Ditemukan | Jarak (Biaya) | Iterasi | Optimal?      |
> > | :--------------------- | :------------------ | :-------------- | :------------ | :------ | :------------ |
> > | **UCS** | `f(n) = g(n)`       | A - B - E - F   | **5** | 6       | **Ya** |
> > | **Greedy Best First** | `f(n) = h(n)`       | A - E - F       | 7             | 3       | Tidak         |
> > | **A Star** | `f(n) = g(n) + h(n)`| A - B - E - F   | **5** | 4       | **Ya** |
> > 
> > * **Kesimpulan dari Soal:** A* berhasil menemukan jalur optimal seperti UCS, namun dengan jumlah iterasi yang lebih sedikit. Ini menunjukkan efisiensinya. Greedy adalah yang tercepat (iterasi paling sedikit) namun memberikan solusi yang salah.
> > ### Kesimpulan
> > Definisikan:
> > - $b$ = _branching factor_
> > - $d$ = _depth_
> > - $m$ = _max depth_
> >
> > Maka:
> > 
> > |Algoritma|Kriteria Utama|Kompleksitas Waktu|Kompleksitas Ruang|Optimal & Lengkap?|
> > |:--|:--|:--|:--|:--|
> > |**BFS**|Level terendah|$O(b^d)$|$O(b^d)$|Ya (jika biaya seragam)|
> > |**DFS**|Fokus satu cabang|$O(b^m)$|$O(bm)$|**Mungkin tidak lengkap**|
> > |**UCS**|Biaya g(n) terendah|$O(b^d)$|$O(b^d)$|Ya|
> > |**A***|Biaya f(n)=g(n)+h(n) terendah|$O(b^d)$|$O(b^d)$|Ya (jika h(n) admisibel)|
> > |**Greedy BFS**|Heuristik h(n) terendah|**$O(b^m)$**|**$O(b^m)$**|**Tidak**|

Ekspor ke Spreadsheet
> > 

> [!cornell] #### Summary
> Algoritma A\* adalah standar emas dalam pencarian rute optimal. Dengan secara cerdas menyeimbangkan biaya riil yang telah ditempuh (`g(n)`) dengan estimasi biaya ke depan yang optimis (`h(n)`), A* mampu mengarahkan pencariannya secara efisien tanpa mengorbankan jaminan optimalitas. Syarat utamanya adalah penggunaan heuristik yang *admisibel* (tidak melebih-lebihkan biaya). Seperti yang ditunjukkan dalam studi kasus, A* secara konsisten mengungguli UCS dalam hal efisiensi (langkah pencarian) dan mengungguli Greedy dalam hal ketepatan (optimalitas).

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:**
>  
>  -   **Konsistensi (Monotonicity):** Ini adalah syarat yang lebih kuat dari admisibilitas. Sebuah heuristik disebut konsisten jika untuk setiap simpul `n` dan setiap suksesornya `n'`, berlaku `h(n) ≤ c(n, n') + h(n')`, di mana `c(n, n')` adalah biaya langkah dari `n` ke `n'`. Ini pada dasarnya adalah "hukum segitiga" untuk heuristik. Jika sebuah heuristik konsisten, maka ia pasti admisibel. Keuntungan utama dari heuristik yang konsisten adalah A* menjadi lebih efisien karena nilai `f(n)` di sepanjang lintasan tidak akan pernah menurun, dan A* dijamin menemukan jalur optimal ke sebuah simpul pada kali pertama ia mengunjunginya.
>  -   **Penerapan di Dunia Nyata:** A* dan variannya (seperti IDA* dan A* dengan *landmark*) adalah inti dari banyak sistem navigasi modern, mulai dari pathfinding AI dalam video game hingga perencanaan rute di Google Maps. Tentu saja, implementasi di dunia nyata jauh lebih kompleks, melibatkan graf yang dinamis, perhitungan heuristik yang canggih, dan optimisasi untuk menangani jutaan simpul.
>  -   **Trade-off Akurasi vs. Biaya Heuristik:** Ada pertukaran antara akurasi heuristik dan biaya komputasinya.
>      -   Heuristik yang sangat akurat (`h(n)` sangat dekat dengan `h*(n)`) akan memangkas pohon pencarian secara drastis, mengurangi jumlah simpul yang dieksplorasi.
>      -   Namun, jika heuristik itu sendiri sangat mahal untuk dihitung, total waktu pencarian bisa meningkat. Tujuan praktisnya adalah menemukan heuristik yang "cukup baik" dan "cukup murah" untuk dihitung.
>  
>  #### Eksplorasi Mandiri
>  
>  -   **Implementasi 8-Puzzle:** Tantang diri Anda untuk mengimplementasikan A* untuk 8-puzzle. Bagian yang paling menantang biasanya adalah menghitung *Manhattan Distance* secara efisien setiap kali sebuah state baru dihasilkan.
>  -   **Bandingkan Heuristik:** Setelah implementasi Anda berjalan, coba ganti fungsi heuristik dari *Manhattan Distance* menjadi heuristik yang lebih sederhana: "jumlah ubin yang salah posisi". Jalankan kedua versi pada beberapa puzzle awal yang sama dan bandingkan jumlah total simpul yang diekspansi. Anda akan melihat secara langsung bagaimana heuristik yang lebih akurat (Manhattan) secara signifikan mengurangi ruang pencarian.