---
type: Note 
cssclasses:
- cornell-notes
---

_Back to_ [[01. Matkul/Stima]]

> [!cornell] Pengenalan Algoritma Runut-balik (Backtracking)
> 
> > ## Questions/Cues
> > 
> > - Pengertian Backtracking
> > - Perbandingan Backtracking & Exhaustive Search
> > - Sejarah Backtracking
> > - Properti Solusi Backtracking
> > - Fungsi Pembangkit Backtracking
> > - Fungsi Pembatas Backtracking
> 
> > ### Pengenalan Algoritma Runut-balik (Backtracking)
> > 
> > **Definisi & Pendekatan**
> > Algoritma runut-balik, atau **backtracking**, bisa dipandang dari dua sudut utama. Pertama, ia adalah salah satu fase penting dalam algoritma traversal **Depth-First Search (DFS)**, artinya cara kerjanya mirip dengan penelusuran graf atau pohon secara mendalam. Kedua, backtracking adalah **metode pemecahan masalah yang efisien, terstruktur, dan sistematis**. Ini artinya metode ini punya aturan jelas dan efektif untuk menemukan solusi. Backtracking bisa dipakai untuk **persoalan optimasi** (mencari solusi terbaik, misalnya jalur terpendek) maupun **non-optimasi** (mencari semua solusi yang mungkin, atau hanya satu solusi yang memenuhi kriteria).
> > 
> > **Perbaikan dari Exhaustive Search**
> > Backtracking adalah penyempurnaan signifikan dari **exhaustive search** (pencarian menyeluruh atau _brute force_). Pada _exhaustive search_, kita mengeksplorasi dan mengevaluasi **semua kemungkinan solusi** satu per satu, tanpa kecuali. Ini sangat tidak efisien dan memakan waktu, terutama jika jumlah kemungkinan solusinya sangat banyak. Sebaliknya, algoritma backtracking jauh lebih pintar. Ia **hanya mengeksplorasi pilihan atau lintasan yang diketahui berpotensi mengarah ke solusi**. Jika ada pilihan atau lintasan yang sudah pasti tidak akan menghasilkan solusi (misalnya, melanggar aturan atau kendala masalah), maka pilihan tersebut langsung **tidak dipertimbangkan lagi**. Proses membuang atau mengabaikan simpul-simpul yang tidak menjanjikan ini disebut **memangkas (pruning) simpul-simpul yang tidak mengarah ke solusi**. Dengan begitu, pencarian menjadi jauh lebih cepat dan efisien.
> > 
> > **Sejarah Singkat Backtracking** 
> > Konsep algoritma runut-balik pertama kali diperkenalkan oleh **D. H. Lehmer pada tahun 1950**. Kemudian, **R. J. Walker, Golomb, dan Baumert** menyajikan uraian umum yang lebih komprehensif mengenai algoritma ini. Pada tahun 1972, **Edsger Dijkstra** menggunakan persoalan N-Ratu untuk mengilustrasikan prinsip pemrograman terstruktur dan menerbitkan deskripsi rinci tentang pengembangan algoritma backtracking yang berbasis _depth-first_.
> > 
> > ### Properti Umum Algoritma Runut-balik
> > 
> > Algoritma backtracking memiliki beberapa properti umum yang mendefinisikan bagaimana persoalan dan solusinya disusun:
> > 
> > 1. **Solusi Persoalan:**
> >     
> >     - Solusi dari sebuah persoalan backtracking selalu dinyatakan sebagai sebuah **vektor dengan n-tuple**: $X=(x_1​,x_2​,...,x_n​)$. Ini berarti solusi adalah serangkaian keputusan atau nilai yang berurutan.
> >     - Setiap komponen xi​ dalam vektor ini mengambil nilai dari sebuah **himpunan Si​**. Seringkali, semua himpunan ini adalah sama (S1​=S2​=...=Sn​).
> >     - **Contoh praktis:**
> >         - Pada **persoalan 1/0 Knapsack**, Si​={0,1}. Di sini, xi​=1 berarti item ke-i diambil (dimasukkan ke dalam tas), dan xi​=0 berarti item ke-i tidak diambil. Vektor solusinya akan terlihat seperti (1,0,1,1,...).
> >         - Pada **persoalan N-Ratu (misalnya N=8)**, solusinya bisa dinyatakan sebagai X=(x1​,...,x8​), di mana xi​ adalah **kolom tempat ratu pada baris ke-i**. Jadi, jika x1​=5, ratu pertama ada di baris 1, kolom 5. Untuk solusi yang valid, xi​ harus merupakan **permutasi dari 1..8**, artinya setiap kolom hanya diisi oleh satu ratu.
> > 2. **Fungsi Pembangkit Nilai xk​ (Generator Function):**
> >     
> >     - Dinyatakan sebagai fungsi T().
> >     - Fungsi T(x1​,x2​,...,xk−1​) ini bertanggung jawab untuk **membangkitkan (menghasilkan) nilai-nilai yang mungkin untuk komponen solusi xk​**. Pembangkitan nilai ini dilakukan berdasarkan nilai-nilai komponen sebelumnya yang sudah ditentukan (x1​ hingga xk−1​).
> >     - Urutan pembangkitan nilai xk​ biasanya mengikuti aturan tertentu, seperti urutan menaik (dari kecil ke besar), atau urutan prioritas operasi (misalnya, pada persoalan Labirin, gerakan `east` mungkin diprioritaskan sebelum `south`).
> > 3. **Fungsi Pembatas (Bounding Function):**
> >     
> >     - Dinyatakan sebagai predikat B(x1​,x2​,...,xk​) yang mengembalikan nilai **true/false**. Ini adalah fungsi kunci yang membuat backtracking efisien.
> >     - Fungsi B bernilai **true jika lintasan parsial (x1​,x2​,...,xk​) berpotensi mengarah ke solusi**. Arti dari "mengarah ke solusi" adalah lintasan parsial ini **tidak melanggar kendala (constraints) persoalan**. Ini menandakan bahwa lintasan tersebut "menjanjikan" (_promising_).
> >     - Jika B bernilai **true**, maka algoritma melanjutkan untuk membangkitkan nilai untuk komponen solusi berikutnya, xk+1​.
> >     - Jika B bernilai **false**, berarti lintasan parsial (x1​,x2​,...,xk​) sudah pasti tidak akan menghasilkan solusi. Oleh karena itu, lintasan ini **dibuang (pruning)**, dan proses pencarian di cabang ini dihentikan.

> [!cornell] #### Summary
> **Algoritma runut-balik (backtracking)** adalah metode efisien yang merupakan penyempurnaan dari _exhaustive search_, secara selektif mengeksplorasi lintasan solusi dengan **memangkas cabang yang tidak menjanjikan** menggunakan **fungsi pembatas (bounding function)**. Solusi direpresentasikan sebagai **vektor n-tuple**, dengan setiap komponen dibangkitkan secara sistematis oleh **fungsi pembangkit (generator function)** yang bekerja berdasarkan keputusan-keputusan sebelumnya.