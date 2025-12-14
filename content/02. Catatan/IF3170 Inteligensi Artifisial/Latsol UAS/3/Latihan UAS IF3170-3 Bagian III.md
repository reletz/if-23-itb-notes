_Back to_ [[Latihan UAS IF3170]]
# Problem Set: Unsupervised Learning & Evaluation (Paket C)

Mata Kuliah: Inteligensi Artifisial

Topik: Clustering (K-Means, DBSCAN) & Advanced Model Evaluation

Sifat: Latihan Mandiri

## Soal 1: Segmentasi Karyawan (Mixed Data & Dynamic Constraint)

Diberikan dataset 6 karyawan dengan fitur campuran: **Divisi (Kat)**, **Tingkat Pendidikan (Kat)**, **Masa Kerja (Num)**, dan **Gaji (Num)**.

|   |   |   |   |   |
|---|---|---|---|---|
|**ID**|**Divisi (C1​)**|**Pendidikan (C2​)**|**Masa Kerja (N1​)**|**Gaji (N2​)**|
|K1|IT|S1|2|5|
|K2|HR|D3|8|6|
|K3|IT|S1|3|5|
|K4|HR|S1|10|8|
|K5|IT|D3|4|4|
|K6|HR|S1|12|9|

Metode Jarak (Mixed Distance):

$$D(x, y) = \sqrt{ w_c \cdot \sum d_{cat}(x_i, y_i)^2 + w_n \cdot \sum (x_j - y_j)^2 }$$

- **Bobot:** $w_c = 10$, $w_n = 1$.
    
- **Jarak Kategorikal:** Hamming (Beda=1, Sama=0).
    
- **Jarak Numerikal:** Euclidean biasa.
    

**Skenario Simulasi (Langkah demi Langkah):**

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi / Pertanyaan**|**Jawaban & Perhitungan**|
|**1**|**Inisialisasi Centroid (**$k=2$**):**<br><br>  <br><br>Pilih K1 sebagai Centroid 1 ($Z_1$) dan K6 sebagai Centroid 2 ($Z_2$). Tuliskan koordinat awalnya.|$Z_1$: {IT, S1, 2, 5}<br><br>  <br><br>$Z_2$: {HR, S1, 12, 9}|
|**2**|**Assignment Awal (Iterasi 1):**<br><br>  <br><br>Hitung jarak semua data ke $Z_1$ dan $Z_2$. Tentukan cluster (C1/C2).<br><br>  <br><br>_Contoh Hitung K2 ke_ $Z_1$_:_<br><br>  <br><br>Kat: (HR$\ne$IT) + (D3$\ne$S1) = $1^2+1^2=2$. Bobot $2 \times 10 = 20$.<br><br>  <br><br>Num: $(8-2)^2 + (6-5)^2 = 36 + 1 = 37$.<br><br>  <br><br>Total $D^2 = 57 \to D \approx 7.55$.|**K2 ke** $Z_1$**:** 7.55, **K2 ke** $Z_2$**:** ... $\to$ Masuk ...<br><br>  <br><br>**K3 ke** $Z_1$**:** ..., **K3 ke** $Z_2$**:** ... $\to$ Masuk ...<br><br>  <br><br>**K4 ke** $Z_1$**:** ..., **K4 ke** $Z_2$**:** ... $\to$ Masuk ...<br><br>  <br><br>**K5 ke** $Z_1$**:** ..., **K5 ke** $Z_2$**:** ... $\to$ Masuk ...|
|**3**|**Update Centroid (Iterasi 1):**<br><br>  <br><br>Hitung Centroid Baru ($Z_{1new}, Z_{2new}$) dari anggota cluster hasil Langkah 2.<br><br>  <br><br>**Aturan:**<br><br>  <br><br>- Fitur Kategorikal: Gunakan **Modus** (Nilai terbanyak).<br><br>  <br><br>- Fitur Numerikal: Gunakan **Mean** (Rata-rata).|$Z_{1new}$**:**<br><br>  <br><br>Divisi=..., Pend=..., MK=..., Gaji=...<br><br>  <br><br>$Z_{2new}$**:**<br><br>  <br><br>Divisi=..., Pend=..., MK=..., Gaji=...|
|**4**|**Re-Assignment (Iterasi 2 - Distance Constraint):**<br><br>  <br><br>Perusahaan menetapkan aturan ketat: _"Data hanya boleh masuk cluster jika jaraknya ke centroid < 5.0"_.<br><br>  <br><br>Cek kembali data **K5**. Hitung jaraknya ke $Z_{1new}$ dan $Z_{2new}$.<br><br>  <br><br>Apakah K5 masuk ke Cluster 1, Cluster 2, atau menjadi Outlier (tidak masuk keduanya)?|Jarak K5 ke $Z_{1new}$: ...<br><br>  <br><br>Jarak K5 ke $Z_{2new}$: ...<br><br>  <br><br>**Keputusan:** ...|
|**5**|**Evaluasi (SSE Final):**<br><br>  <br><br>Hitung SSE hanya untuk Cluster 1 (berdasarkan anggota final di langkah 4, tanpa K5 jika dia outlier).|Anggota C1: { ... }<br><br>  <br><br>SSE = $\sum dist(x, Z_{1new})^2$ = ...|

## Soal 2: Kepadatan dan Validasi Silang

Gunakan dataset numerikal sederhana berikut (Fitur $X, Y$):

- **Cluster A (Pusat):** A1(2,2), A2(2,3), A3(3,2), A4(3,3)
    
- **Cluster B (Jauh):** B1(10,10), B2(10,11), B3(11,10)
    
- **Noise:** N1(6,6)
    

**Parameter DBSCAN:** $\epsilon = 1.5$, $MinPts = 3$.

**Tugas A: Simulasi DBSCAN**

1. Buatlah **Matriks Jarak Euclidean** (fokus pada titik yang relevan/berdekatan saja).
    
2. Tentukan status setiap titik (**Core, Border, Noise**).
    
3. Tuliskan hasil Cluster yang terbentuk.
    

Tugas B: Validasi Eksternal (Purity)

Asumsikan label asli (ground truth) adalah:

- **Kelas 1:** {A1, A2, A3, A4, N1} (Termasuk N1 yang sebenarnya noise secara visual).
    
- **Kelas 2:** {B1, B2, B3}
    

Berdasarkan hasil cluster DBSCAN Anda (Noise dianggap sebagai cluster tersendiri atau "tidak terklasifikasi" - pilih salah satu strategi dan jelaskan):

1. Hitung nilai **Purity**.
    

Tugas C: Validasi Internal (Analisis Metrik)

Hitunglah metrik berikut untuk mengevaluasi kualitas cluster:

1. **Cohesion (WSS):** Hitung WSS (Sum of Squared Error) untuk Cluster B (B1, B2, B3) terhadap centroid-nya sendiri.
    
2. **Separation (BSS):** Hitung jarak kuadrat antara Centroid Cluster A dan Centroid Cluster B.
    
3. **Silhouette Coefficient (untuk titik A1):**
    
    - $a(A1)$: Rata-rata jarak ke {A2, A3, A4}.
        
    - $b(A1)$: Rata-rata jarak ke Cluster B {B1, B2, B3}.
        
    - Hitung $s(A1)$.
        

## Soal 3: Identifikasi Visual

Perhatikan gambar distribusi titik di bawah ini. Lingkaran menunjukkan radius $\epsilon$. Syarat $MinPts = 4$.

_(Ilustrasi Abstrak: Titik X berada di jembatan tipis antara dua kepadatan besar. Titik Y berada di tengah kepadatan. Titik Z berada di pinggir kepadatan)_

Instruksi:

Lingkari atau sebutkan status titik berikut:

1. **Titik X:** ... (Apakah dia Core/Border/Noise? Apakah dia menghubungkan dua cluster?)
    
2. **Titik Y:** ... (Alasan: ...)
    
3. **Titik Z:** ... (Alasan: ...)
    

## Soal 4: Analisis Tabel

Lengkapi tabel perbandingan metode validasi berikut:

|   |   |   |   |
|---|---|---|---|
|**Skenario**|**Metode Validasi**|**Alasan Utama**|**Risiko/Kelemahan**|
|**Imbalanced Data** (Fraud 1% vs Normal 99%)|**Stratified K-Fold**|Menjaga proporsi kelas yang sama di setiap fold latih & uji.|...|
|**Time Series Data** (Data Saham)|**Time Series Split** (Forward Chaining)|Data masa depan tidak boleh bocor ke masa lalu (_data leakage_).|Data latihan awal sangat sedikit (pada fold pertama).|
|**Hyperparameter Tuning**|**Nested Cross-Validation**|Memisahkan loop optimasi parameter dan loop evaluasi performa agar tidak bias.|...|

## Soal 5: Konsep Evaluasi

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**B/S**|**Alasan Singkat**|
|1|**Silhouette Coefficient** negatif menandakan bahwa sebuah titik data mungkin salah ditempatkan (lebih dekat ke cluster tetangga daripada cluster sendiri).|...|...|
|2|Dalam K-Means, jika kita terus menambah jumlah cluster $k$ hingga $k=N$, nilai **SSE (Sum of Squared Errors)** akan mencapai maksimum.|...|...|
|3|**Bootstrapping** lebih disarankan daripada K-Fold Cross Validation jika dataset kita sangat besar (jutaan baris).|...|...|

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (K-Means Advanced)
> 
> **Langkah 2 (Assignment Iterasi 1):**
> 
> - **K1 (IT, S1, 2, 5)** adalah Centroid 1 ($Z_1$).
>     
> - **K6 (HR, S1, 12, 9)** adalah Centroid 2 ($Z_2$).
>     
> - **Hitung K2 (HR, D3, 8, 6):**
>     
>     - Ke $Z_1$: Kat(2 beda)=20. Num $(8-2)^2+(6-5)^2 = 36+1=37$. Total $D^2=57, D=7.55$.
>         
>     - Ke $Z_2$: Kat(1 beda)=10. Num $(8-12)^2+(6-9)^2 = 16+9=25$. Total $D^2=35, D=5.92$.
>         
>     - **Masuk Cluster 2**.
>         
> - **Hitung K3 (IT, S1, 3, 5):**
>     
>     - Ke $Z_1$: Kat(0 beda)=0. Num $(3-2)^2+(5-5)^2 = 1$. Total $D^2=1, D=1$.
>         
>     - Ke $Z_2$: Kat(1 beda)=10. Num $(3-12)^2+(5-9)^2 = 81+16=97$. Total $D^2=107, D=10.3$.
>         
>     - **Masuk Cluster 1**.
>         
> - **Hitung K4 (HR, S1, 10, 8):**
>     
>     - Ke $Z_1$: Kat(1 beda)=10. Num $(10-2)^2+(8-5)^2 = 64+9=73$. Total $D^2=83, D=9.1$.
>         
>     - Ke $Z_2$: Kat(0 beda)=0. Num $(10-12)^2+(8-9)^2 = 4+1=5$. Total $D^2=5, D=2.23$.
>         
>     - **Masuk Cluster 2**.
>         
> - **Hitung K5 (IT, D3, 4, 4):**
>     
>     - Ke $Z_1$: Kat(1 beda)=10. Num $(4-2)^2+(4-5)^2 = 4+1=5$. Total $D^2=15, D=3.87$.
>         
>     - Ke $Z_2$: Kat(2 beda)=20. Num $(4-12)^2+(4-9)^2 = 64+25=89$. Total $D^2=109, D=10.4$.
>         
>     - **Masuk Cluster 1**.
>         
> 
> **Hasil Awal:**
> 
> - **Cluster 1:** {K1, K3, K5}
>     
> - **Cluster 2:** {K2, K4, K6}
>     
> 
> **Langkah 3 (Update Centroid):**
> 
> - $Z_{1new}$ **(K1, K3, K5):**
>     
>     - Divisi: Modus{IT, IT, IT} = **IT**.
>         
>     - Pend: Modus{S1, S1, D3} = **S1**.
>         
>     - Masa Kerja: Mean(2, 3, 4) = **3**.
>         
>     - Gaji: Mean(5, 5, 4) = **4.67**.
>         
>     - $Z_{1new} = \{IT, S1, 3, 4.67\}$  
>         
> - $Z_{2new}$ **(K2, K4, K6):**
>     
>     - Divisi: Modus{HR, HR, HR} = **HR**.
>         
>     - Pend: Modus{D3, S1, S1} = **S1**.
>         
>     - Masa Kerja: Mean(8, 10, 12) = **10**.
>         
>     - Gaji: Mean(6, 8, 9) = **7.67**.
>         
>     - $Z_{2new} = \{HR, S1, 10, 7.67\}$  
>         
> 
> **Langkah 4 (Re-Assignment K5 dengan Constraint < 5.0):**
> 
> - **K5 (IT, D3, 4, 4) ke** $Z_{1new}$ **(IT, S1, 3, 4.67):**
>     
>     - Kat: (IT=IT, D3$\ne$S1) $\to$ 1 beda $\to$ Bobot 10.
>         
>     - Num: $(4-3)^2 + (4-4.67)^2 = 1 + 0.4489 = 1.45$.
>         
>     - Total $D^2 = 11.45 \to D = \sqrt{11.45} \approx \mathbf{3.38}$.
>         
> - **K5 ke** $Z_{2new}$ **(HR, S1, 10, 7.67):**
>     
>     - Kat: 2 beda $\to$ 20.
>         
>     - Num: $(4-10)^2 + (4-7.67)^2 = 36 + 13.4 = 49.4$.
>         
>     - Total $D^2 = 69.4 \to D \approx 8.3$.
>         
> - **Keputusan:** Jarak ke $Z_{1new}$ adalah 3.38 (< 5.0). Maka K5 tetap masuk **Cluster 1**.
>     
> 
> Langkah 5 (SSE Cluster 1):
> 
> Anggota: K1, K3, K5. Centroid $Z_{1new}$.
> 
> - $d(K1)^2$: Kat(0)+Num($(2-3)^2+(5-4.67)^2$) = $0 + 1 + 0.11 = 1.11$.
>     
> - $d(K3)^2$: Kat(0)+Num($(3-3)^2+(5-4.67)^2$) = $0 + 0 + 0.11 = 0.11$.
>     
> - $d(K5)^2$: Kat(10)+Num(1.45) = 11.45 (dari langkah 4).
>     
> - **SSE Total** = $1.11 + 0.11 + 11.45 = \mathbf{12.67}$.
>     
> 
> ### Jawaban Soal 2 (DBSCAN & Validasi)
> 
> **A. Clusterisasi DBSCAN:**
> 
> - **Cluster A:** A1, A2, A3, A4 saling berjarak 1 atau $\sqrt{2} \approx 1.41$ (semua < 1.5). Semua jadi Core. Cluster A = {A1, A2, A3, A4}.
>     
> - **Cluster B:** B1, B2, B3 saling berjarak 1 atau $\sqrt{2}$. Semua jadi Core. Cluster B = {B1, B2, B3}.
>     
> - **Noise:** N1(6,6) berjarak jauh dari manapun. Status Noise.
>     
> 
> **B. Purity:**
> 
> - Cluster A (4 data): Mayoritas Kelas 1 (4 data).
>     
> - Cluster B (3 data): Mayoritas Kelas 2 (3 data).
>     
> - Noise N1 (1 data): Dianggap cluster sendiri/sampah. Mayoritas Kelas 1 (1 data).
>     
> - Total Benar = 4 (di A) + 3 (di B) + 1 (di N, jika noise dianggap singleton) = 8.
>     
> - **Purity** = $8/8 = 1.0$. (Atau jika Noise diabaikan, $7/7 = 1.0$).
>     
> 
> **C. Validasi Internal:**
> 
> 1. **Cohesion (WSS) Cluster B:**
>     
>     - Centroid B = $(10.33, 10.33)$.
>         
>     - $SSE = (10-10.33)^2...$ dst. $\approx 0.67$.
>         
> 2. **Separation (BSS):**
>     
>     - Centroid A = $(2.5, 2.5)$. Centroid B = $(10.33, 10.33)$.
>         
>     - Jarak^2 $\approx (7.83)^2 + (7.83)^2 \approx 122$.
>         
> 3. **Silhouette A1:**
>     
>     - $a(A1)$: Jarak ke A2(1), A3(1), A4(1.41). Rata-rata = 1.13.
>         
>     - $b(A1)$: Jarak ke B1, B2, B3 (Jauh, $\approx 11$).
>         
>     - $s = (11 - 1.13) / 11 \approx \mathbf{0.9}$.
>         
> 
> ### Jawaban Soal 4 (Tabel Validasi)
> 
> - **Stratified:** Mencegah satu fold hanya berisi kelas negatif saja (representative).
>     
> - **Nested CV:** Komputasi sangat mahal (Training berkali-kali lipat).
>     
> 
> ### Jawaban Soal 5 (Benar/Salah)
> 
> 1. **Benar**. Nilai negatif berarti $a(i) > b(i)$, artinya lebih dekat ke tetangga.
>     
> 2. **Salah**. SSE akan mencapai **Minimum** (0) saat $k=N$.
>     
> 3. **Salah**. Untuk data jutaan, **Hold-out** cukup dan lebih efisien. Bootstrapping untuk data kecil.