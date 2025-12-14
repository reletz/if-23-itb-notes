---
type: Note

course: IF-3170 Inteligensi Artifisial

tags: [AI, Clustering, K-Means, Algorithms]

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: 2. Partitioning Clustering (K-Means)
> >
> > ## Questions/Cues
> >
> > - Konsep Dasar Partitioning
> >     
> > - Algoritma K-Means (Detail)
> >     
> > - Fungsi Objektif (SSE)
> >     
> > - Studi Kasus 1: Data Kategorikal (Sesuai Slide)
> >     
> > - Studi Kasus 2: Data Numerik (Standar)
> >     
> > - Penentuan Nilai K (Elbow)
> >     
> > - Kelemahan & Solusi
> >     
> > - Kompleksitas Waktu
> >     
> >
> > ## Reference Points
> 
> > - Slide 21-23 (Algoritma & Konsep)
> >     
> > - Slide 24 (Flowchart)
> >     
> > - Slide 26-29 (Contoh Kasus Kategorikal)
> >     
> > - Slide 32-34 (Elbow Method)
> >     
> > - Slide 35 (Kompleksitas)
> >     
> >
> > ### 1. Konsep Dasar Partitioning Method
> >
> > Metode _partitioning_ adalah pendekatan clustering yang memecah himpunan data $D$ yang berisi $n$ objek menjadi sejumlah $k$ partisi (cluster) secara langsung.
> >
> > **Karakteristik Utama:**
> >
> > - **Eksklusif:** Setiap objek data harus masuk ke dalam **tepat satu** cluster (kecuali pada _Fuzzy Clustering_). Tidak ada tumpang tindih antar kelompok.
> >     
> > - **Syarat:** Setiap cluster harus berisi setidaknya satu objek.
> >     
> > - **Iterative Relocation:** Algoritma ini tidak "sekali jadi". Ia bekerja dengan cara memindah-mindahkan objek dari satu cluster ke cluster lain secara berulang-ulang (_iteratif_) untuk memperbaiki kualitas pengelompokan hingga optimal.
> >     
> >
> > ### 2. Algoritma K-Means
> >
> > K-Means adalah algoritma _centroid-based_, artinya setiap cluster direpresentasikan oleh sebuah titik pusat yang disebut **Centroid**.
> >
> > **Logika Dasar:**
> > 
> > Algoritma berusaha meminimalkan variasi intra-cluster. Secara matematis, ia meminimalkan fungsi objektif Sum of Squared Errors (SSE):
> > 
> > $$J = \sum_{j=1}^{k} \sum_{i=1}^{n} ||x_i^{(j)} - c_j||^2$$
> > 
> > Di mana $x_i$ adalah titik data dan $c_j$ adalah centroid cluster $j$. Semakin kecil nilai $J$, semakin "rapat" dan baik clusternya.
> >
> > **Langkah-langkah Detail:**
> >
> > 1. **Inisialisasi (Initialization):**
> >     
> > 	- Tentukan jumlah cluster $k$.
> > 			
> > 	- Pilih $k$ titik data secara acak (atau gunakan metode _K-Means++_) sebagai centroid awal. Posisi awal ini sangat krusial karena menentukan hasil akhir.
> > 			
> > 2. **Penugasan (Assignment):**
> >     
> > 	- Ambil setiap titik data dalam dataset.
> > 			
> > 	- Hitung jaraknya ke semua centroid yang ada (biasanya menggunakan **Euclidean Distance** untuk data numerik).
> > 			
> > 	- Masukkan titik tersebut ke anggota cluster dengan centroid terdekat (jarak minimum).
> > 			
> > 3. **Pembaruan (Update):**
> >     
> > 	- Setelah semua data ditugaskan, hitung ulang posisi centroid.
> > 			
> > 	- Posisi centroid baru adalah **rata-rata (arithmetic mean)** dari semua koordinat titik data yang ada di dalam cluster tersebut. Inilah mengapa disebut "K-Means".
> > 			
> > 4. **Iterasi / Berhenti:**
> >     
> > 	- Ulangi langkah 2 dan 3.
> > 			
> > 	- Berhenti jika salah satu kondisi terpenuhi:
> > 			
> > 		- **Konvergen:** Centroid tidak berpindah posisi lagi (atau perpindahannya sangat kecil di bawah _threshold_).
> > 				
> > 		- **Assignment Tetap:** Tidak ada objek yang berpindah cluster.
> > 				
> > 		- **Max Iteration:** Mencapai batas maksimum iterasi (misal 100 kali).
> > 				
> >
> > ### 3. Studi Kasus 1: Implementasi Data Kategorikal (Sesuai Slide 26-29)
> >
> > _Catatan: Contoh di slide menggunakan data kategorikal/biner. Pada kasus ini, "Jarak" dihitung berdasarkan perbedaan atribut (Hamming Distance) dan "Mean" diganti dengan Mode (Nilai Mayoritas). Ini teknisnya adalah varian K-Modes, tapi prinsip alurnya sama._
> >
> > **Dataset: 6 Orang (A-F) dengan 5 Atribut Biner (Ya/Tidak).**
> > 
> > Parameter: $K=3$.
> >
> > **Langkah 0: Inisialisasi**
> > 
> > Kita memilih 3 data pertama sebagai Centroid Awal (Seeds):
> >
> > - **C1:** A (Tidak, Ya, Ya, Tidak, Tidak)
> >     
> > - **C2:** B (Tidak, Tidak, Ya, Tidak, Ya)
> >     
> > - **C3:** C (Ya, Ya, Tidak, Ya, Tidak)
> >     
> >
> > **Langkah 1: Iterasi Pertama (Penugasan)** Hitung jarak setiap data ke C1, C2, C3. Jarak = Jumlah atribut yang beda. _Contoh hitung jarak D ke C1:_ D: (Tdk, Tdk, Tdk, Ya, Ya) vs C1: (Tdk, Ya, Ya, Tdk, Tdk). Beda di: Atribut 2, 3, 4, 5. Total Beda = 4.
> >
> > |**Data**|**Atribut Data (Pengalaman, Prog, B.Ing, Warna, Nikah)**|**Dist to C1 (A)**|**Dist to C2 (B)**|**Dist to C3 (C)**|**Cluster Terdekat**|
> > |---|---|---|---|---|---|
> > |**A**|Tidak, Ya, Ya, Tidak, Tidak|0|2|3|**1**|
> > |**B**|Tidak, Tidak, Ya, Tidak, Ya|2|0|5|**2**|
> > |**C**|Ya, Ya, Tidak, Ya, Tidak|3|5|0|**3**|
> > |**D**|Tidak, Tidak, Tidak, Ya, Ya|4|2|3|**2**|
> > |**E**|Ya, Tidak, Ya, Ya, Ya|4|2|3|**2**|
> > |**F**|Tidak, Ya, Tidak, Ya, Tidak|2|4|1|**3**|
> >
> > **Hasil Pengelompokan Iterasi 1:**
> >
> > - **Cluster 1:** {A}
> >     
> > - **Cluster 2:** {B, D, E}
> >     
> > - **Cluster 3:** {C, F}
> >     
> >
> > **Langkah 2: Update Centroid** Hitung "pusat" baru dengan mencari nilai mayoritas (_majority voting_) di setiap kolom atribut untuk masing-masing cluster.
> >
> > - **Centroid Baru C1 (dari data A saja):**
> >     
> > 	* Tetap sama: (Tidak, Ya, Ya, Tidak, Tidak)
> >
> > - **Centroid Baru C2 (dari data B, D, E):**
> >     
> > 	* *Pengalaman:* {Tdk, Tdk, Ya} $\rightarrow$ Mayoritas: **Tidak**
> > 	* *Prog:* {Tdk, Tdk, Tdk} $\rightarrow$ Mayoritas: **Tidak**
> > 	* *B.Ing:* {Ya, Tdk, Ya} $\rightarrow$ Mayoritas: **Ya**
> > 	* *Buta Warna:* {Tdk, Ya, Ya} $\rightarrow$ Mayoritas: **Ya**
> > 	* *Menikah:* {Ya, Ya, Ya} $\rightarrow$ Mayoritas: **Ya**
> > 	* **New C2:** (Tidak, Tidak, Ya, Ya, Ya)
> >
> >
> > - **Centroid Baru C3 (dari data C, F):**
> >     
> >   * Lakukan hal yang sama. Jika seri (1 Ya, 1 Tidak), biasanya pilih acak atau pertahankan nilai lama.
> >   * Misal hasilnya: (Ya, Ya, Tidak, Ya, Tidak)
> > 
> >
> > **Langkah 3: Iterasi Selanjutnya** Gunakan **New C1, New C2, New C3** untuk menghitung ulang jarak seluruh data (A-F) dan lakukan penugasan ulang. Ulangi terus hingga anggota cluster tidak berubah.
> >
> > ### 4. Studi Kasus 2: Data Numerik 2D (Standar K-Means)
> >
> > _Kasus ini untuk memperjelas penggunaan "Mean" secara matematis._ 
> > 
> > **Data:** A(1,1), B(2,1), C(4,3), D(5,4). 
> > 
> > **K=2**, Inisialisasi Centroid: $m_1=(1,1)$, $m_2=(2,1)$.
> >
> > **Iterasi 1:**
> >
> > 1. **Hitung Jarak (Euclidean):** $\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$  
> >     
> > 	* **A(1,1):** Jarak ke $m_1=0$, ke $m_2=1$. Masuk **Cluster 1**.
> > 	* **B(2,1):** Jarak ke $m_1=1$, ke $m_2=0$. Masuk **Cluster 2**.
> > 	* **C(4,3):**
> > 		* ke $m_1$: $\sqrt{(4-1)^2+(3-1)^2} = \sqrt{9+4} = 3.6$
> > 		* ke $m_2$: $\sqrt{(4-2)^2+(3-1)^2} = \sqrt{4+4} = 2.8$. Masuk **Cluster 2**.
> > 	* **D(5,4):**
> > 		* ke $m_1$: $\sqrt{(5-1)^2+(4-1)^2} = 5$
> > 		* ke $m_2$: $\sqrt{(5-2)^2+(4-1)^2} = 4.2$. Masuk **Cluster 2**.
> > 	* **Hasil:** Cluster 1 = {A}, Cluster 2 = {B, C, D}.
> >
> >
> > 2. **Update Centroid:**
> >     
> > 	* **New $m_1$:** Rata-rata A(1,1) $\rightarrow$ **(1, 1)**.
> > 	* **New $m_2$:** Rata-rata B(2,1), C(4,3), D(5,4).
> > 		* $x_{new} = (2+4+5)/3 = 3.67$
> > 		* $y_{new} = (1+3+4)/3 = 2.67$
> > 		* **New $m_2$ = (3.67, 2.67)**.
> > 
> >
> > 3. **Lanjut ke Iterasi 2** dengan centroid baru tersebut.
> >     
> >
> > ### 5. Penentuan Nilai K (The Elbow Method)
> >
> > Salah satu tantangan K-Means adalah kita harus "menebak" jumlah cluster ($k$) di awal. **Metode Siku (Elbow Method):**
> >
> > 1. Jalankan K-Means dengan $k=1$, hitung total SSE (sum of squared errors) atau WCSS.
> >     
> > 2. Jalankan lagi dengan $k=2$, hitung SSE.
> >     
> > 3. Lakukan hingga $k=n$ (atau batas wajar).
> >     
> > 4. Buat grafik garis: Sumbu X = $k$, Sumbu Y = SSE.
> >     
> > 5. Pilih nilai $k$ di mana penurunan SSE mulai **melandai secara drastis** (membentuk siku).
> >     
> >
> > _Logika:_ Menambah jumlah cluster pasti menurunkan error. Tapi jika penambahan cluster baru hanya mengurangi error sedikit, berarti cluster tersebut tidak signifikan (hanya memecah cluster yang sudah padat).
> >
> > ### 6. Analisis Kelemahan & Solusi
> >
> > |**Kelemahan**|**Penjelasan**|**Solusi/Mitigasi**|
> > |---|---|---|
> > |**Sensitif Inisialisasi**|Posisi awal centroid yang acak bisa menyebabkan hasil akhir terjebak di _local optimum_ (solusi jelek).|Gunakan **K-Means++** (algoritma inisialisasi cerdas yang menyebar centroid awal) atau jalankan K-Means berulang kali dan ambil SSE terkecil.|
> > |**Sensitif Outlier**|Karena menggunakan _Mean_ (rata-rata), satu data ekstrem bisa menarik centroid menjauh dari kerumunan data asli.|Gunakan **K-Medoids (PAM)** yang menggunakan titik data asli (median) sebagai pusat, bukan rata-rata hitung.|
> > |**Bentuk Cluster**|K-Means mengasumsikan cluster berbentuk bola/sferis. Gagal pada cluster berbentuk bulan sabit atau cincin.|Gunakan **DBSCAN** (Density-based) atau Spectral Clustering.|
> > |**Tipe Data**|Hanya untuk numerik (Euclidean distance).|Gunakan **K-Modes** untuk data kategorikal atau Gower Distance untuk data campuran.|

> [!cornell] #### Summary
> 
> K-Means adalah algoritma partisi iteratif yang sangat populer karena kesederhanaan dan kecepatannya ($O(nkt)$). Algoritma ini bekerja dengan meminimalkan jarak kuadrat antara data dan pusat clusternya (SSE). Prosesnya terdiri dari empat tahap utama: Inisialisasi $\rightarrow$ Penugasan (Assignment) $\rightarrow$ Pembaruan (Update Mean) $\rightarrow$ Iterasi hingga Konvergen. Meskipun efisien, K-Means memiliki kelemahan fundamental yaitu sensitivitas terhadap posisi awal centroid dan keberadaan outlier. Untuk hasil optimal, metode ini sering dipadukan dengan Elbow Method untuk mencari $k$ terbaik dan teknik inisialisasi K-Means++.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis
> 
> #### 1. Voronoi Tessellation
> 
> Secara geometris, K-Means sebenarnya membagi ruang data menjadi sel-sel **Voronoi**. Garis batas antar cluster adalah garis tegak lurus (perpendicular bisector) antara dua centroid. Inilah sebabnya mengapa batas cluster K-Means selalu berupa garis lurus (linear) dan cluster yang dihasilkan cenderung berbentuk poligon cembung (convex).
> 
> #### 2. K-Means++ Initialization
> 
> Algoritma standar memilih centroid awal secara random total (Uniform). **K-Means++** memperbaikinya dengan cara:
> 
> 1. Pilih centroid pertama secara acak.
>     
> 2. Untuk setiap titik data lain, hitung jarak kuadrat terdekat ke centroid yang sudah ada ($D(x)^2$).
>     
> 3. Pilih centroid baru dari titik data tersebut dengan probabilitas proporsional terhadap $D(x)^2$. (Artinya: Titik yang jauh dari centroid yang sudah ada punya peluang lebih besar terpilih).
>     
>     Ini menjamin centroid awal tersebar merata, mempercepat konvergensi secara signifikan.
>     
> 
> #### 3. Kompleksitas Algoritma (Slide 35)
> 
> Mengapa K-Means disebut "skalabel"?
> 
> Kompleksitasnya adalah $O(n \cdot k \cdot t \cdot d)$, di mana:
> 
> - $n$: Jumlah data
>     
> - $k$: Jumlah cluster
>     
> - $t$: Jumlah iterasi
>     
> - $d$: Jumlah dimensi/fitur
>     
>     Karena biasanya $k, t, d \ll n$, maka kompleksitasnya dianggap Linear terhadap jumlah data ($O(n)$). Ini jauh lebih cepat dibanding Hierarchical Clustering yang umumnya kuadratik $O(n^2)$ atau kubik $O(n^3)$.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa hasil K-Means bisa berbeda-beda setiap kali dijalankan meskipun datanya sama?</strong></summary>
> 
> Karena posisi awal centroid (inisialisasi) dipilih secara acak. Jika posisi awal berbeda, algoritma bisa konvergen ke solusi local optimum yang berbeda pula.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan perbedaan antara langkah "Assignment" dan "Update" dalam satu kalimat!</strong></summary>
> 
> <em>Assignment</em> adalah memindahkan data ke pemilik (centroid) terdekat, sedangkan <em>Update</em> adalah memindahkan pemilik (centroid) ke tengah-tengah kerumunan data barunya.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Kapan kita sebaiknya TIDAK menggunakan K-Means?</strong></summary>
> 
> Saat data memiliki banyak <em>noise/outlier</em> ekstrem, saat cluster memiliki bentuk non-sferis (seperti melengkung atau memanjang tak beraturan), atau saat tipe data adalah kategorikal murni (kecuali dimodifikasi menjadi K-Modes).
> 
> </details>