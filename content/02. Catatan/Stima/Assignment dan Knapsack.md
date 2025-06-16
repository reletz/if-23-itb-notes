---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/Stima]]
> [!cornell] Topic
> > ### Question and Cues
> > -   Assignment Problem (AP): Definisi
> > -   AP: Pendekatan Greedy
> > -   AP: B&B dengan Lower Bound
> > -   AP: Contoh B&B (n=4)
> > -   Proses Ekspansi Simpul AP
> > -   0/1 Knapsack Problem (KP): Definisi
> > -   KP: B&B untuk Maksimasi
> > -   KP: Pentingnya Pengurutan Objek
> > -   KP: Formula Upper Bound
> > -   KP: Contoh B&B (n=4)
> > -   Proses Ekspansi Simpul KP
> > -   Menemukan Solusi Optimal KP
> > -   KP: Contoh Kedua (n=6)
>  
> > 
> > ### Bagian A: Assignment Problem (Masalah Penugasan)
> > 
> > -   **Definisi Assignment Problem:**
> >     * **Persoalan:** Diberikan `n` orang dan `n` pekerjaan (job). Setiap kombinasi penugasan orang ke pekerjaan memiliki biaya (ongkos) tertentu yang direpresentasikan dalam matriks biaya `n x n`.
> >     * **Tujuan:** Menemukan cara menugaskan setiap orang ke tepat satu pekerjaan (dan setiap pekerjaan diberikan ke tepat satu orang) sehingga **total biaya penugasan seminimal mungkin**. Ini adalah masalah **minimisasi**.
> > 
> > -   **Pendekatan Greedy (Sebagai Perbandingan):**
> >     * **Strategi:** Pada setiap langkah, pilih penugasan dengan biaya terkecil di seluruh matriks yang tersisa, lalu eliminasi baris dan kolom yang bersangkutan.
> >     * **Contoh:**
> >         1.  Biaya terkecil adalah `1` (Orang 3, Job 3). Tugaskan O3→J3. Total Biaya = 1.
> >         2.  Dari sisa, biaya terkecil adalah `2` (Orang 1, Job 2). Tugaskan O1→J2. Total Biaya = 1 + 2 = 3.
> >         3.  Dari sisa, biaya terkecil adalah `4` (Orang 4, Job 4). Tugaskan O4→J4. Total Biaya = 3 + 4 = 7.
> >         4.  Tersisa Orang 2 dan Job 1. Tugaskan O2→J1 (biaya `6`). Total Biaya = 7 + 6 = 13.
> >     * **Hasil Greedy:** Solusi `<2, 1, 3, 4>` (O1→J2, O2→J1, O3→J3, O4→J4) dengan total biaya **13**. *Catatan: Meskipun greedy memberikan solusi optimal dalam contoh ini, secara umum ia tidak menjamin optimalitas.*
> > 
> > -   **Pendekatan Branch & Bound untuk Assignment Problem:**
> >     * **Perhitungan Lower Bound (Batas Bawah):** Kita memerlukan cara sederhana untuk mengestimasi biaya minimum dari sebuah simpul (penugasan parsial).
> >     * **Metode:** *Lower bound* untuk sebuah simpul dihitung dengan **menjumlahkan nilai minimum dari setiap baris yang tersisa** pada matriks biaya.
> >     * **Logika:** Setiap solusi lengkap harus memilih satu pekerjaan dari setiap baris orang yang tersisa. Biaya totalnya pasti tidak akan lebih kecil dari jumlah nilai-nilai minimum di setiap baris tersebut.
> > 
> > -   **Contoh Lengkap B&B untuk Assignment Problem (n=4):**
> >     * **Matriks Biaya Awal:**
> >         ```
> >               Job 1  2  3  4   | Min Baris
> >         Orang 1   9  2  7  8   | -> 2
> >         Orang 2   6  4  3  7   | -> 3
> >         Orang 3   5  8  1  8   | -> 1
> >         Orang 4   7  6  9  4   | -> 4
> >         ```
> >     1.  **Cost Simpul Akar (Simpul 0 - Belum ada penugasan):**
> >         `ĉ(0) = (min baris 1) + (min baris 2) + (min baris 3) + (min baris 4)`
> >         `ĉ(0) = 2 + 3 + 1 + 4 = 10`.
> > 
> > -   **Proses Ekspansi Simpul (Assignment Problem):**
> >     1.  **Ekspansi Simpul 0:** Bangkitkan anak-anak dengan menugaskan Orang 1 ke setiap Job.
> >         -   **Simpul 1 (O1→J1):** Cost = `C(1,1)` + (min baris 2,3,4 di sisa matriks) = `9 + (3+1+4) = 17`.
> >         -   **Simpul 2 (O1→J2):** Cost = `C(1,2)` + (min baris 2,3,4 di sisa matriks) = `2 + (3+1+4) = 10`.
> >         -   **Simpul 3 (O1→J3):** Cost = `C(1,3)` + (min baris 2,3,4 di sisa matriks) = `7 + (4+5+4) = 20`.
> >         -   **Simpul 4 (O1→J4):** Cost = `C(1,4)` + (min baris 2,3,4 di sisa matriks) = `8 + (3+1+6) = 18`.
> >     2.  **Pilih Simpul-E:** Simpul hidup saat ini adalah {1(17), 2(10), 3(20), 4(18)}. Simpul dengan cost terkecil adalah **Simpul 2 (cost 10)**.
> >     3.  **Ekspansi Simpul 2 (O1→J2):** Bangkitkan anak dengan menugaskan Orang 2.
> >         -   **Simpul 5 (O2→J1):** Cost = `C(1,2)+C(2,1)` + (min baris 3,4 di sisa) = `2+6 + (1+4) = 13`.
> >         -   **Simpul 6 (O2→J3):** Cost = `C(1,2)+C(2,3)` + (min baris 3,4 di sisa) = `2+3 + (5+4) = 14`.
> >         -   **Simpul 7 (O2→J4):** Cost = `C(1,2)+C(2,4)` + (min baris 3,4 di sisa) = `2+7 + (1+7) = 17`.
> >     4.  **Pilih Simpul-E:** Simpul hidup saat ini {1,3,4,5,6,7}. Simpul cost terkecil adalah **Simpul 5 (cost 13)**.
> >     5.  **Ekspansi Simpul 5 (O1→J2, O2→J1):** Bangkitkan anak dengan menugaskan Orang 3.
> >         -   **Simpul 8 (O3→J3):** Ini adalah simpul daun (solusi lengkap). Cost = `C(1,2)+C(2,1)+C(3,3)+C(4,4) = 2+6+1+4 = 13`.
> >     6.  **Solusi Ditemukan:** Kita menemukan solusi lengkap dengan biaya **13**. Ini menjadi *Upper Bound* (U=13).
> >     7.  **Pruning:** Semua simpul hidup lainnya (Simpul 1(17), 3(20), 4(18), 6(14), 7(17)) memiliki *lower bound* yang lebih besar atau sama dengan 13. Mereka semua dipangkas karena tidak mungkin menghasilkan solusi yang lebih baik.
> >     8.  **Kesimpulan:** Solusi optimal adalah penugasan yang ditemukan di Simpul 8 dengan total biaya **13**.
> > 
> > ### Bagian B: 0/1 Knapsack Problem
> > 
> > -   **Definisi 0/1 Knapsack Problem:**
> >     * **Persoalan:** Diberikan `n` buah objek, masing-masing dengan berat `wᵢ` dan keuntungan `pᵢ`, serta sebuah tas (knapsack) dengan kapasitas angkut `K`.
> >     * **Tujuan:** Memilih objek-objek untuk dimasukkan ke dalam tas (setiap objek bisa diambil (1) atau tidak (0)) untuk **memaksimalkan total keuntungan**, dengan syarat total berat tidak melebihi kapasitas `K`. Ini adalah masalah **maksimasi**.
> > 
> > -   **Pendekatan Branch & Bound untuk Knapsack (Maksimasi):**
> >     * **Strategi:** Karena ini masalah maksimasi, kita akan menggunakan **Upper Bound (Batas Atas)**. Algoritma akan selalu memilih simpul hidup dengan **nilai Upper Bound terbesar** untuk dieksplorasi.
> >     * **Penting: Pengurutan Objek:** Sebelum memulai, objek-objek **harus diurutkan berdasarkan rasio keuntungan/berat (`pᵢ/wᵢ`) secara menurun (dari besar ke kecil)**. Ini sangat penting agar estimasi kita seakurat mungkin.
> > 
> > -   **Formula Perhitungan Upper Bound `ĉ(i)`:**
> >     * Upper Bound `ĉ(i)` di sebuah simpul dihitung dengan:
> >         $$\hat{c}(i) = F + (K - W) \times \frac{p_{i+1}}{w_{i+1}}$$
> >         * `F`: Keuntungan total yang **sudah terkumpul** hingga simpul saat ini.
> >         * `W`: Berat total yang **sudah terpakai** hingga simpul saat ini.
> >         * `K`: Kapasitas total knapsack.
> >         * `(K-W)`: Sisa kapasitas knapsack.
> >         * `pᵢ₊₁/wᵢ₊₁`: Rasio keuntungan/berat dari **objek berikutnya** dalam daftar yang sudah diurutkan.
> >     * **Logika:** Batas atas dihitung sebagai keuntungan riil yang sudah didapat (`F`) ditambah keuntungan paling optimis yang bisa didapat dari sisa kapasitas. Estimasi paling optimis adalah dengan mengisi sisa kapasitas tersebut dengan "fraksi" dari objek terbaik berikutnya.
> > 
> > -   **Contoh Lengkap B&B untuk Knapsack (n=4):**
> >     * **Data:** n=4, K=10. Objek (sudah terurut `p/w`):
> >         - O1: (w=4, p=40, p/w=10)
> >         - O2: (w=7, p=42, p/w=6)
> >         - O3: (w=5, p=25, p/w=5)
> >         - O4: (w=3, p=12, p/w=4)
> >     1.  **Cost Simpul Akar (Simpul 0):** W=0, F=0.
> >         `ĉ(0) = 0 + (10 - 0) * (p₁/w₁) = 10 * 10 = 100`.
> > 
> > -   **Proses Ekspansi Simpul (Knapsack):**
> >     1.  **Ekspansi Simpul 0:**
> >         -   **Kiri (Simpul 1, O1 diambil):** W=4, F=40. `ĉ(1) = 40 + (10 - 4) * (p₂/w₂) = 40 + 6*6 = 76`.
> >         -   **Kanan (Simpul 2, O1 tidak):** W=0, F=0. `ĉ(2) = 0 + (10 - 0) * (p₂/w₂) = 0 + 10*6 = 60`.
> >     2.  **Pilih Simpul-E:** Simpul hidup {1(76), 2(60)}. Pilih yang terbesar: **Simpul 1 (cost 76)**.
> >     3.  **Ekspansi Simpul 1:**
> >         -   **Kiri (Simpul 3, O2 diambil):** W=4+7=11. **Melebihi K=10**. Simpul ini mati (bounded).
> >         -   **Kanan (Simpul 4, O2 tidak):** W=4, F=40. `ĉ(4) = 40 + (10 - 4) * (p₃/w₃) = 40 + 6*5 = 70`.
> >     4.  **Pilih Simpul-E:** Simpul hidup {2(60), 4(70)}. Pilih terbesar: **Simpul 4 (cost 70)**.
> >     5.  **Ekspansi Simpul 4:**
> >         -   **Kiri (Simpul 5, O3 diambil):** W=4+5=9, F=40+25=65. `ĉ(5) = 65 + (10 - 9) * (p₄/w₄) = 65 + 1*4 = 69`.
> >         -   **Kanan (Simpul 6, O3 tidak):** W=4, F=40. `ĉ(6) = 40 + (10 - 4) * (p₄/w₄) = 40 + 6*4 = 64`.
> >     6.  **Pilih Simpul-E:** Simpul hidup {2(60), 5(69), 6(64)}. Pilih terbesar: **Simpul 5 (cost 69)**.
> >     7.  **Ekspansi Simpul 5:**
> >         -   **Kiri (Simpul 7, O4 diambil):** W=9+3=12. **Melebihi K=10**. Simpul mati.
> >         -   **Kanan (Simpul 8, O4 tidak):** W=9, F=65. Ini adalah simpul daun (semua objek sudah dipertimbangkan).
> > 
> > -   **Menemukan Solusi Optimal (Knapsack):**
> >     * **Solusi Ditemukan:** Simpul 8 adalah solusi *feasible* pertama yang kita temukan. Keuntungannya adalah **65**. Nilai ini menjadi *Lower Bound* (L=65) untuk solusi optimal (solusi terbaik yang kita pegang).
> >     * **Pruning:** Sekarang kita periksa semua simpul hidup yang tersisa: {2(60), 6(64)}. *Upper bound* dari kedua simpul ini **lebih kecil** dari solusi yang sudah kita temukan (60 < 65 dan 64 < 65). Artinya, cabang-cabang ini tidak mungkin menghasilkan keuntungan lebih dari 65. Keduanya **dipangkas**.
> >     * **Kesimpulan:** Tidak ada lagi simpul hidup untuk dieksplorasi. Solusi optimal adalah yang ditemukan di Simpul 8. **X = (1, 0, 1, 0)** (O1 & O3 diambil) dengan total keuntungan **65**.
> > 
> > -   **Contoh Knapsack Kedua (n=6, K=100):**
> >     * Materi sumber memberikan contoh lain yang lebih kompleks, di mana solusi greedy gagal memberikan hasil optimal. Melalui proses B&B yang sama (urutkan berdasarkan p/w, hitung upper bound, ekspansi simpul terbesar, temukan solusi feasible, dan pangkas), ditemukan solusi optimal dengan keuntungan **55** (dengan mengambil objek 2, 3, dan 6 dengan total berat 100), yang lebih baik dari solusi greedy (keuntungan 51).
> > 

> [!cornell] #### Summary
> Algoritma Branch & Bound adalah teknik serbaguna yang dapat menangani baik masalah minimisasi maupun maksimasi. Untuk masalah minimisasi seperti *Assignment Problem*, ia menggunakan *lower bound* untuk memangkas cabang yang biayanya terlalu tinggi. Sebaliknya, untuk masalah maksimasi seperti *0/1 Knapsack*, ia menggunakan *upper bound* yang dihitung secara optimis untuk memangkas cabang yang keuntungannya tidak akan melebihi solusi terbaik yang telah ditemukan. Kunci keberhasilannya adalah definisi fungsi batas yang cerdas dan strategi eksplorasi yang terpandu untuk menemukan solusi optimal secara efisien.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
>  
>  -   **Assignment Problem - Hungarian Algorithm:** Penting untuk diketahui bahwa meskipun B&B bisa menyelesaikan Assignment Problem, ada algoritma khusus yang jauh lebih efisien bernama **Hungarian Algorithm**. Algoritma ini dapat menemukan solusi optimal dalam waktu polinomial (O(n³)), sementara B&B pada kasus terburuknya masih eksponensial. B&B adalah pendekatan umum, sedangkan Hungarian Algorithm adalah spesialis.
>  -   **Knapsack - Hubungan dengan Fractional Knapsack:** Formula *upper bound* pada B&B untuk 0/1 Knapsack pada dasarnya adalah solusi dari **Fractional Knapsack Problem**. Pada Fractional Knapsack, kita boleh mengambil sebagian dari sebuah objek. Masalah ini dapat diselesaikan secara optimal dengan strategi greedy (ambil objek dengan p/w tertinggi terus-menerus). Karena solusi Fractional Knapsack selalu lebih besar atau sama dengan solusi 0/1 Knapsack, ia menjadi *upper bound* yang sempurna.
>  -   **Knapsack - Solusi dengan Dynamic Programming:** Selain B&B, 0/1 Knapsack juga dapat diselesaikan secara optimal menggunakan **Dynamic Programming (DP)**. Solusi DP memiliki kompleksitas *pseudo-polinomial* O(nK), yang sangat efisien jika kapasitas `K` tidak terlalu besar, namun bisa lebih buruk dari B&B jika `K` sangat besar.
>  
>  #### Sumber & Referensi Lanjutan
>  
>  -   **Topik Pencarian Online:** "Hungarian Algorithm for Assignment Problem", "Dynamic Programming solution for 0/1 Knapsack", "Fractional vs 0/1 Knapsack".
>  -   **Visualisasi:** Cari visualizer online untuk B&B pada Knapsack Problem. Melihat pohon ruang status dibangun dan dipangkas secara real-time dapat sangat membantu pemahaman.
>  
>  #### Eksplorasi Mandiri
>  
>  -   **Implementasi:** Coba implementasikan algoritma B&B untuk 0/1 Knapsack. Pastikan Anda mengimplementasikan pengurutan `p/w`, *priority queue* untuk memilih simpul dengan *upper bound* terbesar, dan logika pemangkasan.
>  -   **Analisis Kasus:** Buat beberapa contoh Knapsack Problem. Selesaikan dengan metode Greedy, lalu selesaikan dengan B&B. Bandingkan hasilnya dan identifikasi kasus-kasus di mana Greedy gagal dan mengapa.