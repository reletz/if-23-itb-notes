_Back To_ [[Latihan UAS IF3170]]

# Problem Set: Unsupervised Learning & Evaluation (Paket B)

Mata Kuliah: Inteligensi Artifisial

Topik: Clustering (K-Means, DBSCAN) & Model Evaluation Strategy

Sifat: Latihan Mandiri

## Soal 1: Pengelompokan Data Logistik

Sebuah perusahaan logistik ingin mengelompokkan 6 gudang berdasarkan karakteristiknya. Data memiliki 3 fitur campuran: **Tipe Gudang (Kat)**, **Kapasitas (Num)**, dan **Jarak ke Kota (Num)**.

|   |   |   |   |
|---|---|---|---|
|**ID**|**Tipe Gudang (C1​)**|**Kapasitas (N1​)**|**Jarak (N2​)**|
|G1|Besar (B)|100|5|
|G2|Kecil (K)|20|30|
|G3|Besar (B)|110|8|
|G4|Kecil (K)|25|28|
|G5|Besar (B)|95|15|
|G6|Kecil (K)|15|35|

Metode Jarak (Mixed Distance):

$$D = \sqrt{w_c \cdot d_{Hamming}(C_1)^2 + w_n \cdot (d_{Euclidean}(N_1, N_2))^2}$$

- Bobot: $w_c = 50$ (Kategorikal sangat penting), $w_n = 1$ (Numerikal standar).
    
- Jarak Kategorikal: Sama = 0, Beda = 1.
    
- Jarak Numerikal: Euclidean 2D biasa.
    

Skenario Simulasi (5 Langkah):

Ikuti tabel di bawah ini untuk mensimulasikan proses K-Means.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi / Pertanyaan**|**Jawaban & Perhitungan**|
|**1**|**Inisialisasi Centroid (**$k=2$**):**<br><br>  <br><br>Pilih G1 sebagai Centroid 1 ($Z_1$) dan G2 sebagai Centroid 2 ($Z_2$). Tuliskan koordinat awalnya.|$Z_1$: {Besar, 100, 5}<br><br>  <br><br>$Z_2$: {Kecil, 20, 30}|
|**2**|**Assignment Awal (Iterasi 1):**<br><br>  <br><br>Hitung jarak G3 dan G4 ke kedua centroid. Tentukan cluster mereka.<br><br>  <br><br>_Contoh Hitung G3 ke_ $Z_2$_:_<br><br>  <br><br>$Kat: B \ne K \to 1^2 \times 50 = 50$<br><br>  <br><br>$Num: (110-20)^2 + (8-30)^2 = 90^2 + (-22)^2 = 8100 + 484 = 8584$<br><br>  <br><br>Total $D^2 = 8634 \to D = \sqrt{8634} \approx 92.9$|**Jarak G3 ke** $Z_1$**:** ...<br><br>  <br><br>**Jarak G3 ke** $Z_2$**:** ... $\to$ Masuk Cluster ...<br><br>  <br><br>**Jarak G4 ke** $Z_1$**:** ...<br><br>  <br><br>**Jarak G4 ke** $Z_2$**:** ... $\to$ Masuk Cluster ...|
|**3**|**Update Centroid (Iterasi 1):**<br><br>  <br><br>Asumsikan hasil assignment iterasi 1 menghasilkan:<br><br>  <br><br>**C1 = {G1, G3, G5}**, **C2 = {G2, G4, G6}**.<br><br>  <br><br>Hitung Centroid Baru ($Z_{1new}, Z_{2new}$).<br><br>  <br><br>_Catatan: Untuk Kategori, gunakan Modus (Majority Voting). Untuk Numerik, gunakan Mean._|$Z_{1new}$**:** Kat=..., Kap=..., Jar=...<br><br>  <br><br>$Z_{2new}$**:** Kat=..., Kap=..., Jar=...|
|**4**|**Constraint Twist (Data Baru):**<br><br>  <br><br>Tiba-tiba masuk data **G_Baru {Kecil, 50, 20}**.<br><br>  <br><br>Hitung jarak G_Baru ke $Z_{1new}$ dan $Z_{2new}$.<br><br>  <br><br>Ke mana ia akan masuk?|Jarak ke $Z_{1new}$: ...<br><br>  <br><br>Jarak ke $Z_{2new}$: ...<br><br>  <br><br>Cluster Tujuan: ...|
|**5**|**Evaluasi Cluster (SSE):**<br><br>  <br><br>Hitung Sum of Squared Errors (SSE) hanya untuk Cluster 2 (anggota: G2, G4, G6) terhadap centroid $Z_{2new}$.<br><br>  <br><br>Rumus: $\sum dist(x, Z_{2new})^2$.|$SSE_{C2} = dist(G2, Z_{2new})^2 + dist(G4, Z_{2new})^2 + dist(G6, Z_{2new})^2$<br><br>  <br><br>Hasil: ...|

## Soal 2: Kepadatan dan Validasi Kualitas

Diberikan dataset 2D sederhana (hanya fitur numerikal) dari soal sebelumnya untuk analisis DBSCAN:

- **G1(100, 5), G2(20, 30), G3(110, 8)**
    
- **G4(25, 28), G5(95, 15), G6(15, 35)**
    

**Parameter DBSCAN:** $\epsilon = 15$, $MinPts = 2$.

**Tugas A: Clusterisasi DBSCAN**

1. Buatlah **Matriks Jarak Euclidean** (segitiga bawah) antar semua titik.
    
2. Tentukan status (**Core, Border, Noise**) untuk setiap titik.
    
3. Tuliskan hasil akhir Cluster yang terbentuk (misal: Cluster 1 = {..., ...}, Noise = { ... }).
    

Tugas B: Validasi Eksternal (Purity)

Asumsikan kita memiliki Label Asli (Ground Truth) sebagai berikut:

- **Kelas A (Gudang Besar):** {G1, G3, G5}
    
- **Kelas B (Gudang Kecil):** {G2, G4, G6}
    

Berdasarkan hasil cluster DBSCAN Anda di Tugas A:

1. Untuk setiap cluster yang terbentuk, tentukan **Kelas Mayoritas**-nya.
    
2. Hitung nilai Purity total dari hasil clustering tersebut.
    
    $$Purity = \frac{1}{N} \sum_{k} \max_{j} |Cluster_k \cap Kelas_j|$$

Tugas C: Validasi Internal (Silhouette Concept)

Ambil salah satu titik, misalnya G4 (yang berada di Cluster Kecil).

Misalkan hasil clustering Anda adalah:

- $C_{kecil} = \{G2, G4, G6\}$  
    
- $C_{besar} = \{G1, G3, G5\}$  
    

Hitunglah komponen **Silhouette Coefficient** untuk titik **G4**:

1. **Cohesion (**$a(i)$**):** Rata-rata jarak G4 ke anggota lain di cluster yang sama (G2, G6).
    
2. **Separation (**$b(i)$**):** Rata-rata jarak G4 ke anggota cluster tetangga terdekat ($C_{besar}$).
    
3. Silhouette Score ($s(i)$): Hitung nilai $s$ untuk G4.
    
    $$s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}$$
4. **Interpretasi:** Apa arti nilai $s$ tersebut terhadap posisi G4? (Apakah terkelompokkan dengan baik?)
    

## Soal 3: Identifikasi Visual

Perhatikan gambar distribusi titik di bawah ini. Lingkaran menunjukkan radius $\epsilon$. Syarat $MinPts = 4$.

_(Ilustrasi: Titik A di tengah kerumunan padat. Titik B di pinggir kerumunan, hanya punya 2 tetangga tapi salah satunya A. Titik C terpencil sendirian)_

Instruksi:

Lingkari atau sebutkan status titik berikut:

1. **Titik A:** ... (Alasan: ...)
    
2. **Titik B:** ... (Alasan: ...)
    
3. **Titik C:** ... (Alasan: ...)
    

## Soal 4: Analisis Tabel

Lengkapi tabel perbandingan metode validasi berikut:

|   |   |   |   |
|---|---|---|---|
|**Skenario Data**|**Metode Validasi Terbaik**|**Alasan Utama**|**Kelemahan Potensial**|
|**Data Kecil** (< 50 sampel)|**Bootstrapping**|Memaksimalkan data latih dengan sampling _replacement_.|Bias optimis karena data uji tumpang tindih (_overlap_) dengan data latih.|
|**Data Menengah** (1000 - 10k)|**K-Fold Cross Validation**|...|...|
|**Data Sangat Besar** (> 1 Juta)|**Hold-out Validation**|...|...|

## Soal 5: Konsep Evaluasi

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**B/S**|**Alasan Singkat**|
|1|Nilai **Cohesion** (WSS) yang _semakin besar_ menandakan cluster yang semakin baik dan padat.|...|...|
|2|Jika nilai **Purity = 1.0**, itu _selalu_ berarti algoritma clustering kita sempurna dan berguna, terlepas dari jumlah clusternya.|...|...|
|3|**McNemar Test** digunakan untuk menguji signifikansi perbedaan performa antara dua model klasifikasi pada data uji yang sama.|...|...|

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (Simulasi K-Means)
> 
> **Langkah 2 (Assignment G3 & G4):**
> 
> - **G3 (Besar, 110, 8):**
>     
>     - Ke $Z_1$ (Besar, 100, 5): $0 + (10^2 + 3^2) = 109$. $D = \sqrt{109} \approx 10.4$.
>         
>     - Ke $Z_2$ (Kecil, 20, 30): $50 + (90^2 + 22^2) = 50 + 8584 = 8634$. $D \approx 92.9$.
>         
>     - **Keputusan:** Masuk **Cluster 1**.
>         
> - **G4 (Kecil, 25, 28):**
>     
>     - Ke $Z_1$: $50 + (75^2 + 23^2) = 50 + 5625 + 529 = 6204$. $D \approx 78.7$.
>         
>     - Ke $Z_2$: $0 + (5^2 + 2^2) = 29$. $D \approx 5.4$.
>         
>     - **Keputusan:** Masuk **Cluster 2**.
>         
> 
> **Langkah 3 (Update Centroid):**
> 
> - $Z_{1new}$ **(dari G1, G3, G5):**
>     
>     - Kat: Modus{Besar, Besar, Besar} = **Besar**.
>         
>     - Kap: Mean(100, 110, 95) = **101.67**.
>         
>     - Jar: Mean(5, 8, 15) = **9.33**.
>         
> - $Z_{2new}$ **(dari G2, G4, G6):**
>     
>     - Kat: Modus{Kecil, Kecil, Kecil} = **Kecil**.
>         
>     - Kap: Mean(20, 25, 15) = **20**.
>         
>     - Jar: Mean(30, 28, 35) = **31**.
>         
> 
> **Langkah 4 (Data Baru G_Baru {Kecil, 50, 20}):**
> 
> - Ke $Z_{1new}$ (Besar, 101.7, 9.3):
>     
>     - Kat Beda ($50$) + Num $(50-101.7)^2 + (20-9.3)^2$.
>         
>     - $50 + 2672.89 + 114.49 \approx 2837$. $D \approx 53.2$.
>         
> - Ke $Z_{2new}$ (Kecil, 20, 31):
>     
>     - Kat Sama ($0$) + Num $(50-20)^2 + (20-31)^2$.
>         
>     - $0 + 900 + 121 = 1021$. $D \approx 31.9$.
>         
> - **Keputusan:** Masuk **Cluster 2** (Lebih dekat).
>     
> 
> Langkah 5 (Evaluasi SSE Cluster 2):
> 
> Anggota: G2(20,30), G4(25,28), G6(15,35). Centroid $Z_{2new}(20, 31)$.
> 
> - $d(G2)^2 = (20-20)^2 + (30-31)^2 = 0 + 1 = 1$  
>     
> - $d(G4)^2 = (25-20)^2 + (28-31)^2 = 25 + 9 = 34$  
>     
> - $d(G6)^2 = (15-20)^2 + (35-31)^2 = 25 + 16 = 41$  
>     
> - **SSE Total** = $1 + 34 + 41 = \mathbf{76}$.
>     
> 
> ### Jawaban Soal 2 (DBSCAN & Validasi)
> 
> **A. Clusterisasi DBSCAN:**
> 
> - **Jarak:**
>     
>     - Grup 1 (G1, G3, G5): Jarak antar mereka dekat (< 15).
>         
>         - G1-G3: $\sqrt{10^2+3^2} \approx 10.4$.
>             
>         - G3-G5: $\sqrt{15^2+7^2} \approx 16.5$ (>15, tidak direct).
>             
>         - G1-G5: $\sqrt{5^2+10^2} \approx 11.2$.
>             
>     - Grup 2 (G2, G4, G6): Jarak dekat.
>         
>         - G2-G4: $\sqrt{5^2+2^2} \approx 5.4$.
>             
>         - G4-G6: $\sqrt{10^2+7^2} \approx 12.2$.
>             
>     - Antar Grup: Jauh (> 60).
>         
> - **Status:**
>     
>     - G1 tetangga {G3, G5}. Total=3 $\to$ Core.
>         
>     - G3 tetangga {G1}. Total=2 $\to$ Core (MinPts=2).
>         
>     - G5 tetangga {G1}. Total=2 $\to$ Core.
>         
>     - G2, G4, G6 saling bertetangga $\to$ Core.
>         
> - **Hasil:**
>     
>     - **Cluster 1:** {G1, G3, G5}
>         
>     - **Cluster 2:** {G2, G4, G6}
>         
> 
> **B. Purity:**
> 
> - Cluster 1 (3 data): Mayoritas Kelas A (3 data). Benar=3.
>     
> - Cluster 2 (3 data): Mayoritas Kelas B (3 data). Benar=3.
>     
> - Total Benar = 6. Total Data = 6.
>     
> - **Purity** = $6/6 = 1.0$ (100%).
>     
> 
> **C. Silhouette (G4):**
> 
> - **Cohesion** $a(G4)$**:** Rata-rata jarak ke G2 dan G6.
>     
>     - $d(G4, G2) \approx 5.4$  
>         
>     - $d(G4, G6) \approx 12.2$  
>         
>     - $a = (5.4 + 12.2) / 2 = \mathbf{8.8}$  
>         
> - **Separation** $b(G4)$**:** Rata-rata jarak ke Cluster 1 (G1, G3, G5).
>     
>     - $d(G4, G1) \approx \sqrt{75^2 + 23^2} \approx 78.4$ (Hitungan kasar cukup, pasti jauh).
>         
>     - Ambil rata-rata kasar $\approx 80$.
>         
>     - $b \approx \mathbf{80.0}$  
>         
> - **Score** $s(G4)$**:**
>     
>     - $s = \frac{80 - 8.8}{80} = \frac{71.2}{80} \approx \mathbf{0.89}$  
>         
> - **Interpretasi:** Nilai sangat mendekati 1, berarti G4 terkelompokkan dengan sangat baik (rapat di cluster sendiri, jauh dari cluster lain).
>     
> 
> ### Jawaban Soal 4 (Tabel Validasi)
> 
> - **K-Fold:** Estimasi stabil/tidak bias (semua data terpakai jadi test). _Kelemahan:_ Komputasi mahal (Training K kali).
>     
> - **Hold-out:** Efisien secara komputasi (hanya 1x training). _Kelemahan:_ Bergantung pada potongan acak (bisa bias).
>     
> 
> ### Jawaban Soal 5 (Benar/Salah)
> 
> 1. **Salah**. Cohesion (WSS) mengukur error/jarak dalam cluster. Semakin **Kecil** nilainya, semakin padat/baik clusternya.
>     
> 2. **Salah**. Purity bisa dimanipulasi dengan membuat cluster sebanyak jumlah data (setiap data 1 cluster = Purity 100%), tapi itu solusi trivial yang tidak berguna.
>     
> 3. **Benar**. McNemar test menggunakan tabel kontingensi untuk melihat apakah perbedaan prediksi benar/salah antara dua model signifikan secara statistik.