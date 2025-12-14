_Back to_ [[Latihan UAS IF3170]]

# Problem Set: Unsupervised Learning & Evaluation

Mata Kuliah: Inteligensi Artifisial

Topik: Clustering (K-Means, DBSCAN) & Model Evaluation Strategy

Sifat: Latihan Mandiri

## Soal 1: Segmentasi Pelanggan Toko (Simulasi Iteratif)

Diberikan dataset 8 pelanggan dengan 4 fitur campuran: 2 Kategorikal (**Gender, Member**) dan 2 Numerikal (**Usia, Skor Belanja**).

|   |   |   |   |   |
|---|---|---|---|---|
|**ID**|**Gender (C1​)**|**Member (C2​)**|**Usia (N1​)**|**Skor Belanja (N2​)**|
|D1|Pria|Gold|20|80|
|D2|Wanita|Silver|22|78|
|D3|Pria|Silver|50|20|
|D4|Wanita|Gold|55|22|
|D5|Pria|Gold|21|82|
|D6|Wanita|Silver|52|18|
|D7|Pria|Silver|23|79|
|D8|Wanita|Gold|53|21|

Ketentuan Jarak (Mixed Distance):

Gunakan rumus jarak campuran berikut:

$$D(x, y) = \sqrt{ \sum d_{cat}(x_i, y_i)^2 + \sum d_{num}(x_j, y_j)^2 }$$

- **Kategorikal (**$d_{cat}$**):** Gunakan **Hamming Distance** (Jika beda = 1, Jika sama = 0).
    
- **Numerikal (**$d_{num}$**):** Gunakan selisih nilai biasa $(x_j - y_j)$.
    
- _Contoh:_ Jarak antara D1 dan D3:
    
    - Gender (Pria vs Pria): 0
        
    - Member (Gold vs Silver): 1
        
    - Usia (20 vs 50): -30
        
    - Skor (80 vs 20): 60
        
    - $D = \sqrt{0^2 + 1^2 + (-30)^2 + 60^2} = \sqrt{1 + 900 + 3600} = \sqrt{4501} \approx 67.09$  
        

**Inisialisasi:**

- Jumlah Cluster $k=2$.
    
- **Centroid Awal:** Menggunakan data **D1** (Cluster 1) dan **D3** (Cluster 2).
    

**Tugas:**

a. Iterasi 1 K-Means:

Lakukan satu kali iterasi penugasan (assignment) data ke centroid terdekat.

- Hitung jarak setiap data (D1 s.d D8) ke Centroid 1 (D1) dan Centroid 2 (D3).
    
- Tentukan keanggotaan cluster untuk setiap data.
    
- **Constraint Berhenti:** Anggap iterasi berhenti setelah 1 kali update keanggotaan ini (tidak perlu menghitung rata-rata centroid baru untuk iterasi ke-2). Tuliskan anggota final Cluster 1 dan Cluster 2.
    

b. Prediksi Data Baru:

Ada pelanggan baru: D_New (Pria, Silver, 22, 75).

Ke cluster manakah (C1 atau C2) pelanggan ini akan masuk berdasarkan centroid awal (D1 dan D3)?

c. Analisis Elbow Method:

Jika kita mengabaikan centroid awal dan mencoba menjalankan K-Means dengan $k=1$ hingga $k=8$, jelaskan secara konseptual bagaimana Elbow Method bekerja untuk menentukan jumlah cluster terbaik. Apa sumbu X dan Y pada grafik Elbow? Kriteria apa yang menentukan "titik siku" tersebut?

## Soal 2: Simulasi DBSCAN pada Fitur Numerikal

Gunakan kembali dataset pada Soal 1, namun **HANYA** perhatikan 2 fitur numerikalnya saja: **Usia (**$N_1$**)** dan **Skor Belanja (**$N_2$**)**. Abaikan fitur kategorikal.

Data Points:

- D1(20, 80), D2(22, 78), D3(50, 20), D4(55, 22)
    
- D5(21, 82), D6(52, 18), D7(23, 79), D8(53, 21)
    

**Parameter DBSCAN:**

- **Epsilon (**$\epsilon$**):** 5
    
- **MinPts:** 3 (termasuk titik itu sendiri)
    
- **Jarak:** Euclidean Distance pada 2D ($N_1, N_2$).
    

**Tugas:**

a. Matriks Jarak (Distance Matrix):

Buatlah tabel matriks jarak (segitiga bawah cukup) antar semua titik. Hitunglah jarak Euclidean antar titik yang sekiranya berdekatan (kelompok muda dan kelompok tua).

- _Hint: Jarak antara (20, 80) dan (50, 20) pasti jauh (>_ $\epsilon$_), tidak perlu dihitung detail. Fokus pada titik yang berdekatan._
    

b. Penentuan Status Titik & Cluster:

Berdasarkan parameter $\epsilon = 5$ dan $MinPts = 3$:

1. Tentukan status setiap titik: **Core Point**, **Border Point**, atau **Noise**.
    
2. Bentuklah Cluster-nya. Ada berapa cluster yang terbentuk? Sebutkan anggotanya.
    

## Soal 3: Visualisasi DBSCAN

Perhatikan ilustrasi titik-titik 2D di bawah ini. Lingkaran di sekitar titik menggambarkan radius Epsilon ($\epsilon$).

Diketahui parameter MinPts = 4.

_(Ilustrasi Abstrak: Titik P punya 5 tetangga dalam radius. Titik Q punya 2 tetangga dalam radius, tapi salah satunya adalah P. Titik R sendirian jauh dari yang lain)_

Tugas:

Gambarkan atau jelaskan status (Label) untuk titik P, Q, dan R berdasarkan logika DBSCAN:

1. **Titik P** (punya 5 tetangga): Statusnya adalah ... karena ...
    
2. **Titik Q** (punya 2 tetangga, bertetangga dengan P): Statusnya adalah ... karena ...
    
3. **Titik R** (punya 0 tetangga): Statusnya adalah ... karena ...
    

## Soal 4: Analisis Perbandingan Skema Validasi

Anda adalah seorang Data Scientist yang harus memilih metode validasi model. Isilah tabel perbandingan berikut untuk menentukan metode mana yang paling tepat digunakan berdasarkan ukuran data.

|   |   |   |   |
|---|---|---|---|
|**Kriteria**|**Hold-out Validation (Train/Test Split)**|**K-Fold Cross Validation**|**Bootstrapping**|
|**Cara Kerja Singkat**|Membagi data 1x menjadi set latih dan uji (misal 80:20).|...|Sampling dengan pengembalian (_replacement_) sebanyak N kali.|
|**Kelebihan Utama**|...|Estimasi performa lebih stabil/tidak bias (semua data jadi test set bergantian).|...|
|**Kelemahan Utama**|Sangat bergantung pada potongan acak (bias tinggi pada data kecil).|...|Data test set tumpang tindih (overlap) tinggi, komputasi berulang.|
|**Rekomendasi Penggunaan**|Cocok untuk **Data Besar** (>100k baris).|Cocok untuk **Data ...**|Cocok untuk **Data Sangat Kecil**.|

## Soal 5: Benar/Salah (Kritis)

Tentukan apakah pernyataan berikut **Benar** atau **Salah**, dan berikan **Alasan** singkat yang padat.

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**B/S**|**Alasan**|
|1|Dalam evaluasi Clustering tanpa label asli (_ground truth_), nilai **Silhouette Coefficient** mendekati 1 menunjukkan cluster yang buruk (tumpang tindih).|...|...|
|2|Metrik **Purity** (Kemurnian) dalam clustering memiliki kelemahan: nilainya akan selalu meningkat (menjadi 100%) jika kita memecah data menjadi cluster sebanyak jumlah data ($k=N$).|...|...|
|3|Pada Confusion Matrix kasus medis (Deteksi Kanker), memperkecil **False Negative (FN)** lebih prioritas daripada memperkecil False Positive (FP), sehingga kita fokus menaikkan **Recall**.|...|...|
|4|Jika dataset sangat _imbalanced_ (99% Negatif, 1% Positif), model yang selalu memprediksi "Negatif" akan memiliki **Akurasi** tinggi tetapi **F1-Score** rendah (atau 0).|...|...|

>[!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (K-Means Mixed Distance)
> 
> **a. Iterasi 1 (Assignment)**
> 
> - **Centroid 1 (C1):** D1 (Pria, Gold, 20, 80)
>     
> - **Centroid 2 (C2):** D3 (Pria, Silver, 50, 20)
>     
> 
> **Perhitungan Jarak ke C1 (D1):**
> 
> - D1 ke C1 = 0
>     
> - D2 (W, Slv, 22, 78) ke C1: $\sqrt{1^2+1^2+(2)^2+(-2)^2} = \sqrt{1+1+4+4} = \sqrt{10} \approx 3.16$  
>     
> - D3 (P, Slv, 50, 20) ke C1: $\sqrt{0+1+(30)^2+(-60)^2} = \sqrt{1+900+3600} \approx 67.09$  
>     
> - D4 (W, Gld, 55, 22) ke C1: $\sqrt{1+0+(35)^2+(-58)^2} = \sqrt{1+1225+3364} \approx 67.7$  
>     
> - D5 (P, Gld, 21, 82) ke C1: $\sqrt{0+0+(1)^2+(2)^2} = \sqrt{5} \approx 2.23$  
>     
> - D6 (W, Slv, 52, 18) ke C1: Jauh (mirip D3/D4)
>     
> - D7 (P, Slv, 23, 79) ke C1: $\sqrt{0+1+(3)^2+(-1)^2} = \sqrt{11} \approx 3.31$  
>     
> - D8 (W, Gld, 53, 21) ke C1: Jauh
>     
> 
> **Perhitungan Jarak ke C2 (D3):**
> 
> - D1, D2, D5, D7 ke C2: Jauh (beda Usia & Skor mencolok)
>     
> - D4 (W, Gld, 55, 22) ke C2: $\sqrt{1+1+(5)^2+(2)^2} = \sqrt{31} \approx 5.56$  
>     
> - D6 (W, Slv, 52, 18) ke C2: $\sqrt{1+0+(2)^2+(-2)^2} = \sqrt{9} = 3$  
>     
> - D8 (W, Gld, 53, 21) ke C2: $\sqrt{1+1+(3)^2+(1)^2} = \sqrt{12} \approx 3.46$  
>     
> 
> **Hasil Cluster:**
> 
> - **Cluster 1 (Dekat D1):** {D1, D2, D5, D7} -> (Kelompok Muda, Belanja Tinggi)
>     
> - **Cluster 2 (Dekat D3):** {D3, D4, D6, D8} -> (Kelompok Tua, Belanja Rendah)
>     
> 
> **b. Prediksi Data Baru (D_New: P, Slv, 22, 75)**
> 
> - Jarak ke C1 (D1: P, Gld, 20, 80): $\sqrt{0+1+(2)^2+(-5)^2} = \sqrt{1+4+25} = \sqrt{30} \approx 5.47$  
>     
> - Jarak ke C2 (D3: P, Slv, 50, 20): $\sqrt{0+0+(-28)^2+(55)^2} \approx \sqrt{3800} \approx 61.7$  
>     
> - **Prediksi:** Masuk **Cluster 1**.
>     
> 
> **c. Elbow Method**
> 
> - Sumbu X: Jumlah Cluster ($k$).
>     
> - Sumbu Y: WCSS / SSE (_Sum of Squared Errors_ - total variansi dalam cluster).
>     
> - Mekanisme: Menambah $k$ akan selalu menurunkan SSE. Titik siku adalah titik di mana penurunan SSE mulai melambat signifikan (diminishing returns).
>     
> 
> ### Jawaban Soal 2 (DBSCAN Numerikal)
> 
> a. Matriks Jarak (Kelompok Relevan)
> 
> Hanya hitung numerik: $\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$
> 
> _Grup 1 (Muda, Skor Tinggi):_ D1(20,80), D2(22,78), D5(21,82), D7(23,79)
> 
> - D1-D2: $\sqrt{2^2+(-2)^2} = \sqrt{8} \approx 2.8$  
>     
> - D1-D5: $\sqrt{1^2+2^2} = \sqrt{5} \approx 2.2$  
>     
> - D1-D7: $\sqrt{3^2+(-1)^2} = \sqrt{10} \approx 3.1$  
>     
> - D2-D5: $\sqrt{(-1)^2+4^2} = \sqrt{17} \approx 4.1$  
>     
> - D2-D7: $\sqrt{1^2+1^2} = \sqrt{2} \approx 1.4$  
>     
> - D5-D7: $\sqrt{2^2+(-3)^2} = \sqrt{13} \approx 3.6$
>     
>     (Semua jarak < 5)
>     
> 
> _Grup 2 (Tua, Skor Rendah):_ D3(50,20), D4(55,22), D6(52,18), D8(53,21)
> 
> - D3-D6: $\sqrt{2^2+(-2)^2} \approx 2.8$  
>     
> - D3-D8: $\sqrt{3^2+1^2} \approx 3.1$  
>     
> - D6-D8: $\sqrt{1^2+3^2} \approx 3.1$  
>     
> - D4-D8: $\sqrt{(-2)^2+1^2} \approx 2.2$  
>     
> - D4-D3: $\sqrt{5^2+2^2} = \sqrt{29} \approx 5.3$ (> 5, Tidak bertetangga langsung)
>     
> 
> **b. Status & Cluster**
> 
> - **Grup 1:** D1 punya tetangga {D2, D5, D7} dalam radius 5. Jumlah = 4 (termasuk diri sendiri). MinPts=3 terpenuhi.
>     
>     - Semua D1, D2, D5, D7 adalah **Core Points**.
>         
>     - Membentuk **Cluster 1**: {D1, D2, D5, D7}.
>         
> - **Grup 2:**
>     
>     - D3 tetangga: {D6, D8}. Total=3. ($\ge$ MinPts) -> **Core**.
>         
>     - D6 tetangga: {D3, D8}. Total=3. -> **Core**.
>         
>     - D8 tetangga: {D3, D6, D4}. Total=4. -> **Core**.
>         
>     - D4 tetangga: {D8}. Total=2. (< MinPts). Tapi D4 bertetangga dengan Core (D8). -> **Border Point**.
>         
>     - Membentuk **Cluster 2**: {D3, D4, D6, D8}.
>         
> 
> **Hasil:** 2 Cluster terbentuk, tidak ada Noise.
> 
> ### Jawaban Soal 3 (Visual DBSCAN)
> 
> 1. **Titik P:** **Core Point**. Karena memiliki jumlah tetangga $\ge$ MinPts (5 $\ge$ 4).
>     
> 2. **Titik Q:** **Border Point**. Karena jumlah tetangganya kurang dari MinPts (2 < 4), TETAPI salah satu tetangganya adalah Core Point (P).
>     
> 3. **Titik R:** **Noise / Outlier**. Karena jumlah tetangganya kurang dari MinPts (0 < 4) dan tidak bertetangga dengan Core Point manapun.
>     
> 
> ### Jawaban Soal 4 (Skema Validasi)
> 
> |   |   |   |
> |---|---|---|
> |**Kriteria**|**K-Fold Cross Validation**|**Bootstrapping**|
> |**Cara Kerja**|Membagi data jadi K bagian. Iterasi K kali (1 bagian jadi test, sisanya train).|Sampling N kali dengan replacement untuk Train, sisanya (Out-of-Bag) untuk Test.|
> |**Kelebihan**|Estimasi performa lebih stabil & tidak bias (semua data terpakai).|Memaksimalkan jumlah data training pada dataset kecil.|
> |**Kelemahan**|Komputasi mahal (Training K kali).|Data uji tidak murni (overlap statistik tinggi), bias optimis.|
> |**Rekomendasi**|Cocok untuk **Data Menengah** (Ribuan/Puluhan Ribu).|Cocok untuk **Data Sangat Kecil** (< 100).|
> 
> ### Jawaban Soal 5 (Benar/Salah)
> 
> 4. **Salah**. Nilai Silhouette mendekati +1 berarti cluster **Sangat Baik** (Rapat dan Terpisah). Mendekati 0 berarti tumpang tindih.
>     
> 5. **Benar**. Jika setiap data menjadi clusternya sendiri, kemurnian (homogenitas) maksimal, tapi tidak bermakna (trivial solution).
>     
> 6. **Benar**. FN berarti orang sakit dibilang sehat (fatal). Maka Recall (menangkap semua yg positif) lebih penting dari Presisi.
>     
> 7. **Benar**. Akurasi tinggi (99%) menipu. F1-Score akan hancur karena Recall atau Precision terhadap kelas minoritas (Positif) akan mendekati 0.