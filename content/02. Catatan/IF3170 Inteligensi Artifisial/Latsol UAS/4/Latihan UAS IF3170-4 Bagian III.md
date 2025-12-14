_Back to_ [[Latihan UAS IF3170]]

# Problem Set: Unsupervised Learning & Evaluation (Paket D)

Mata Kuliah: Inteligensi Artifisial

Topik: Clustering (K-Means with Elbow Analysis, DBSCAN) & Model Evaluation Strategy

Sifat: Latihan Mandiri

## Soal 1: Segmentasi Pasar Berbasis WCSS

Diberikan dataset 6 produk dengan fitur campuran: **Kategori (Kat)** dan **Harga (Num)**.

|   |   |   |
|---|---|---|
|**ID**|**Kategori (C1​)**|**Harga (N1​)**|
|P1|Elektronik (E)|10|
|P2|Fashion (F)|2|
|P3|Elektronik (E)|12|
|P4|Fashion (F)|3|
|P5|Elektronik (E)|11|
|P6|Fashion (F)|1|

Metode Jarak (Mixed Distance):

$$D^2(x, y) = w_c \cdot d_{Hamming}(C_1)^2 + w_n \cdot (x_{harga} - y_{harga})^2$$

- **Bobot:** $w_c = 100$ (Kategori sangat penting), $w_n = 1$.
    
- **Jarak Hamming:** Sama = 0, Beda = 1.
    

Tugas Simulasi (Langkah demi Langkah):

Anda akan mensimulasikan proses K-Means untuk $k=1$ dan $k=2$ guna menghitung WCSS (Within-Cluster Sum of Squares) dan melakukan analisis Elbow.

**FASE A: Hitung WCSS untuk k=1**

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi / Pertanyaan**|**Jawaban & Perhitungan**|
|**1**|**Centroid Global (**$k=1$**):**  <br><br>  <br><br>Hitung centroid tunggal ($Z_{global}$) untuk seluruh data (P1-P6).  <br><br>  <br><br>_Aturan:_ Kat=Modus, Harga=Mean.|$Z_{global}$: Kat=..., Harga=...|
|**2**|**Hitung SSE per Titik:**  <br><br>  <br><br>Hitung jarak kuadrat ($D^2$) setiap titik ke $Z_{global}$.  <br><br>  <br><br>_Ingat bobot_ $w_c=100$_._|$D^2(P1) = ...$  <br><br>  <br><br>$D^2(P2) = ...$  <br><br>  <br><br>...  <br><br>  <br><br>$D^2(P6) = ...$|
|**3**|**Total WCSS (**$k=1$**):**  <br><br>  <br><br>Jumlahkan seluruh $D^2$ dari Langkah 2. Ini adalah nilai WCSS saat $k=1$.|$WCSS_{k=1} = \sum D^2 = ...$|

**FASE B: Hitung WCSS untuk k=2 (Iterasi K-Means)**

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi / Pertanyaan**|**Jawaban & Perhitungan**|
|**4**|**Inisialisasi (**$k=2$**):**  <br><br>  <br><br>Pilih **P2** sebagai Centroid 1 ($Z_1$) dan **P5** sebagai Centroid 2 ($Z_2$).|$Z_1$: {Fashion, 2}  <br><br>  <br><br>$Z_2$: {Elektronik, 11}|
|**5**|**Assignment (P1):**  <br><br>  <br><br>Hitung jarak P1 ke $Z_1$ dan $Z_2$. Tentukan clusternya.|Ke $Z_1$: ...  <br><br>  <br><br>Ke $Z_2$: ... $\to$ Masuk ...|
|**6**|**Assignment (P3 & P4):**  <br><br>  <br><br>Hitung jarak P3 dan P4 ke kedua centroid.|P3: ... $\to$ Masuk ...  <br><br>  <br><br>P4: ... $\to$ Masuk ...|
|**7**|**Assignment (P6):**  <br><br>  <br><br>Hitung jarak P6 ke kedua centroid.|P6: ... $\to$ Masuk ...  <br><br>  <br><br>_(P2 dan P5 sudah pasti masuk cluster sendiri sebagai centroid awal)_|
|**8**|**Update Centroid:**  <br><br>  <br><br>Berdasarkan anggota cluster yang terbentuk di langkah 5-7, hitung centroid baru ($Z_{1new}, Z_{2new}$).|$Z_{1new}$: ...  <br><br>  <br><br>$Z_{2new}$: ...|
|**9**|**Hitung SSE per Cluster (**$k=2$**):**  <br><br>  <br><br>Hitung total jarak kuadrat anggota cluster ke centroid barunya masing-masing.  <br><br>  <br><br>$SSE_1 = \sum_{x \in C1} D^2(x, Z_{1new})$  <br><br>  <br><br>$SSE_2 = \sum_{x \in C2} D^2(x, Z_{2new})$|$SSE_1 = ...$  <br><br>  <br><br>$SSE_2 = ...$|
|**10**|**Analisis Elbow:**  <br><br>  <br><br>Hitung Total $WCSS_{k=2} = SSE_1 + SSE_2$.  <br><br>  <br><br>Bandingkan dengan $WCSS_{k=1}$ dari Langkah 3.  <br><br>  <br><br>Berapa persentase penurunan errornya? Apakah penambahan cluster dari 1 ke 2 signifikan?|$WCSS_{k=2} = ...$  <br><br>  <br><br>Penurunan: ... %  <br><br>  <br><br>Kesimpulan: ...|

## Soal 2: Kepadatan dan Matriks Jarak

Diberikan 5 titik numerikal 1D sederhana:

- **A(1), B(2), C(5), D(6), E(15)**
    

**Parameter DBSCAN:** $\epsilon = 2$, $MinPts = 2$.

**Tugas A: Simulasi DBSCAN**

1. Buatlah **Matriks Jarak** (selisih absolut $|x-y|$) antar semua titik.
    
2. Tentukan status setiap titik (**Core, Border, Noise**) berdasarkan parameter.
    
3. Tuliskan hasil Cluster yang terbentuk.
    

Tugas B: Validasi Internal (Separation)

Hitung jarak antar cluster (Separation) menggunakan metode Single Linkage (jarak terdekat antar anggota cluster yang berbeda).

- Jika terbentuk Cluster 1 dan Cluster 2, berapa jarak terdekat antara anggota C1 dan C2?
    

## Soal 3: Interpretasi Grafik Elbow

Perhatikan data fiktif hasil WCSS untuk berbagai nilai $k$:

- $k=1 \to WCSS = 1000$  
    
- $k=2 \to WCSS = 300$  
    
- $k=3 \to WCSS = 150$  
    
- $k=4 \to WCSS = 130$  
    
- $k=5 \to WCSS = 110$  
    

**Tugas:**

1. Gambarkan sketsa grafik Elbow sederhana (Sumbu X: k, Sumbu Y: WCSS).
    
2. Di titik manakah "siku" (elbow) berada? Mengapa Anda memilih titik tersebut sebagai jumlah cluster optimal? Jelaskan menggunakan konsep _diminishing returns_ (penurunan hasil yang semakin kecil).
    

## Soal 4: Analisis Tabel

Lengkapi tabel perbandingan metode validasi berikut:

|   |   |   |
|---|---|---|
|**Kriteria**|**Stratified K-Fold**|**Leave-One-Out (LOOCV)**|
|**Cara Kerja**|Membagi data jadi K bagian, tapi menjaga **rasio kelas** (misal 70:30) tetap sama di setiap fold.|K-Fold ekstrim di mana $K=N$ (jumlah data). Setiap iterasi hanya 1 data jadi test, sisanya train.|
|**Kelebihan Utama**|Sangat krusial untuk **Data Imbalanced** agar test set representatif.|Tidak bias (hampir seluruh data dipakai training). Deterministik (hasil selalu sama).|
|**Kelemahan Utama**|Sedikit lebih rumit implementasinya dibanding K-Fold biasa.|**Sangat Mahal Komputasinya** (Training N kali). Variance tinggi pada estimasi error.|
|**Rekomendasi**|Wajib untuk klasifikasi **Fraud/Penyakit Langka**.|Hanya untuk dataset **Sangat Kecil** (< 50) & model cepat.|

## Soal 5: Konsep Evaluasi

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**B/S**|**Alasan Singkat**|
|1|Dalam **Elbow Method**, kita selalu memilih nilai $k$ di mana WCSS bernilai paling kecil (minimum mutlak).|...|...|
|2|Algoritma **DBSCAN** tidak memiliki centroid yang eksplisit seperti K-Means, sehingga kita tidak bisa menghitung WCSS dengan cara yang sama persis.|...|...|
|3|Metrik **Recall** pada Confusion Matrix mengukur seberapa banyak prediksi Positif yang benar-benar Positif (akurasi tebakan positif).|...|...|

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (K-Means & Elbow Simulation)
> 
> **FASE A: WCSS k=1**
> 
> 1. **Centroid Global:** Modus Kat = {3E, 3F} (Ambil **E** misal). Mean Harga = $(10+2+12+3+11+1)/6 = 39/6 = \mathbf{6.5}$.
>     
> 2. **SSE per Titik (**$Z=\{E, 6.5\}$**):**
>     
>     - P1(E, 10): $0 + (10-6.5)^2 = 12.25$.
>         
>     - P2(F, 2): $100(Beda) + (2-6.5)^2 = 100 + 20.25 = 120.25$.
>         
>     - P3(E, 12): $0 + (12-6.5)^2 = 30.25$.
>         
>     - P4(F, 3): $100 + (3-6.5)^2 = 112.25$.
>         
>     - P5(E, 11): $0 + (11-6.5)^2 = 20.25$.
>         
>     - P6(F, 1): $100 + (1-6.5)^2 = 130.25$.
>         
> 3. **Total WCSS (**$k=1$**):** $12.25 + 120.25 + 30.25 + 112.25 + 20.25 + 130.25 = \mathbf{425.5}$.
>     
> 
> FASE B: WCSS k=2
> 
> 4. Inisialisasi: $Z_1(F, 2)$, $Z_2(E, 11)$.
> 
> 5. Assign P1(E, 10): Ke $Z_1(F,2) \to 100 + 64 = 164$. Ke $Z_2(E,11) \to 0 + 1 = 1$. Masuk C2.
> 
> 6. Assign P3(E, 12): Ke $Z_1 \to 100+100=200$. Ke $Z_2 \to 0+1=1$. Masuk C2.
> 
> Assign P4(F, 3): Ke $Z_1 \to 0+1=1$. Ke $Z_2 \to 100+64=164$. Masuk C1.
> 
> 7. Assign P6(F, 1): Ke $Z_1 \to 0+1=1$. Ke $Z_2 \to 100+100=200$. Masuk C1.
> 
> Hasil Cluster: C1 (F, Harga Rendah): {P2, P4, P6}. C2 (E, Harga Tinggi): {P1, P3, P5}.
> 
> 8. Update Centroid:
> 
> * $Z_{1new}$: Modus=F, Mean=$(2+3+1)/3 = \mathbf{2}$. $Z_{1new}=\{F, 2\}$.
> 
> * $Z_{2new}$: Modus=E, Mean=$(10+12+11)/3 = \mathbf{11}$. $Z_{2new}=\{E, 11\}$.
> 
> 9. SSE per Cluster ($k=2$):
> 
> * C1 (ke F, 2):
> 
> * P2(F,2): $0+0=0$.
> 
> * P4(F,3): $0+(3-2)^2=1$.
> 
> * P6(F,1): $0+(1-2)^2=1$.
> 
> * Total SSE1 = 2.
> 
> * C2 (ke E, 11):
> 
> * P1(E,10): $0+1=1$.
> 
> * P3(E,12): $0+1=1$.
> 
> * P5(E,11): $0+0=0$.
> 
> * Total SSE2 = 2.
> 
> 10. Analisis Elbow:
> 
> * $WCSS_{k=2} = 2 + 2 = \mathbf{4}$.
> 
> * Penurunan: Dari 425.5 menjadi 4. Turun drastis (99%).
> 
> * Kesimpulan: Penambahan cluster sangat signifikan. $k=2$ sangat bagus memisahkan data (Kategori Fashion-Murah vs Elektronik-Mahal terpisah sempurna).
> 
> ### Jawaban Soal 2 (DBSCAN 1D)
> 
> **A. Simulasi:**
> 
> - **Matriks Jarak:**
>     
>     - A-B: 1.
>         
>     - B-C: 3.
>         
>     - C-D: 1.
>         
>     - D-E: 9.
>         
> - **Status:**
>     
>     - **A(1):** Tetangga {B(2)} (Jarak 1 $\le$ 2). Total=2. ($\ge$ MinPts 2) $\to$ **Core**.
>         
>     - **B(2):** Tetangga {A(1)}. Total=2. $\to$ **Core**. (B ke C jarak 3, >2).
>         
>     - **C(5):** Tetangga {D(6)}. Total=2. $\to$ **Core**.
>         
>     - **D(6):** Tetangga {C(5)}. Total=2. $\to$ **Core**.
>         
>     - **E(15):** Tidak ada tetangga $\le 2$. Total=1 (diri sendiri). $\to$ **Noise**.
>         
> - **Cluster:**
>     
>     - A dan B saling jangkau $\to$ **Cluster 1 {A, B}**.
>         
>     - C dan D saling jangkau $\to$ **Cluster 2 {C, D}**.
>         
>     - E $\to$ **Noise**.
>         
> 
> **B. Validasi (Separation Single Linkage):**
> 
> - Jarak terdekat antara C1{1, 2} dan C2{5, 6} adalah jarak antara **B(2)** dan **C(5)**.
>     
> - **Jarak = 3**.
>     
> 
> ### Jawaban Soal 3 (Interpretasi Elbow)
> 
> 1. **Sketsa:** Grafik turun tajam dari k=1 ke k=2, lalu melandai.
>     
> 2. **Titik Siku:** $k=2$. Karena penurunan dari k=1 ke k=2 sangat besar (700 poin), sedangkan dari k=2 ke k=3 jauh lebih kecil (150 poin). Setelah k=2, penambahan cluster memberikan _diminishing returns_ (biaya komputasi nambah, tapi gain penurunan error sedikit).
>     
> 
> ### Jawaban Soal 5 (Benar/Salah)
> 
> 1. **Salah**. Jika cari minimum mutlak, kita akan pilih $k=N$ (WCSS=0), tapi itu tidak berguna. Kita cari _siku_.
>     
> 2. **Benar**. DBSCAN berbasis densitas dan konektivitas, bukan jarak ke pusat rata-rata.
>     
> 3. **Salah**. Itu definisi **Precision**. Recall mengukur seberapa banyak _Positif Asli_ yang berhasil ditebak (Sensitivity).