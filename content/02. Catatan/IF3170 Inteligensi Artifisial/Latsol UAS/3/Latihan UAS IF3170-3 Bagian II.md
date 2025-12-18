_Back to_ [[Latihan UAS IF3170]]

# Problem Set: Geometry & Optimization Models (Paket B)

Mata Kuliah: Inteligensi Artifisial

Topik: Geometry & Optimization Models (Linear/Logistic Regression, Multi-class SVM)

Sifat: Latihan Mandiri

## BAGIAN I: Logistic Regression (Stochastic Gradient Ascent)

**Soal 1: Prediksi Kelulusan Mahasiswa (Update Bobot Iteratif)**

Diberikan dataset latih untuk memprediksi kelulusan mahasiswa ($Y=1$: Lulus, $Y=0$: Tidak Lulus) berdasarkan dua fitur: **Jam Belajar** ($x_1$) dan **Kehadiran** ($x_2$).

|**No**|**Jam Belajar (x1​)**|**Kehadiran (x2​)**|**Status Lulus (Y)**|
|---|---|---|---|
|1|1|1|0|
|2|3|3|1|
|3|2|1|0|
|4|1|3|1|

Lakukan pelatihan model **Logistic Regression** menggunakan algoritma **Stochastic Gradient Ascent (SGA)** dengan ketentuan:

- **Inisialisasi Bobot:** $\mathbf{w} = [w_0, w_1, w_2] = [0.1, 0.1, 0.1]$. (Perhatikan: Bobot awal tidak nol).
    
- **Bias:** $x_0 = 1$ selalu disertakan.
    
- **Learning Rate (**$\eta$**):** 0.2
    
- **Fungsi Aktivasi:** Sigmoid $\sigma(z) = \frac{1}{1 + e^{-z}}$  
    
- **Jumlah Epoch:** 1 Epoch (Urutan data sesuai nomor: 1 $\to$ 2 $\to$ 3 $\to$ 4).
    

Instruksi:

a. Lengkapi tabel perhitungan manual di bawah ini (tuliskan hingga 3 angka di belakang koma).

b. Lakukan Self-Evaluation pada akhir Epoch 2: Prediksi kembali label kelas data latih menggunakan bobot akhir (Threshold $0.5$).

c. Hitung Akurasi dan F1-Score (anggap Kelas 1 sebagai Positif).

**Tabel Kerja (Epoch 1 & 2):**

|   |   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|---|
|**Epoch**|**Data Ke-**|**Input Augmented [1,x1​,x2​]**|**Target y**|**Logit z=wTx**|**Prediksi p=σ(z)**|**Error (y−p)**|**Update Δw=η(y−p)x**|**Bobot Baru wnew​**|
|1|1|$[1, 1, 1]$|0|$0.1(1)+0.1(1)+0.1(1) = 0.3$|0.574|-0.574|$[ -0.115, -0.115, -0.115 ]$|$[ -0.015, -0.015, -0.015 ]$|
|1|2|...|...|...|...|...|...|...|
|...|...|...|...|...|...|...|...|...|

## BAGIAN II: Multi-class SVM (Analitik & Strategi)

**Soal 2: Pembangunan Model Multi-class (OVR / OVO / DAGSVM)**

Diketahui dataset sederhana dengan 3 kelas: **Merah (R)**, **Hijau (G)**, dan **Biru (B)**. Data direpresentasikan dalam koordinat 2D ($x_1, x_2$).

|   |   |   |
|---|---|---|
|**Data Point**|**Koordinat (x1​,x2​)**|**Kelas**|
|$D_1$|$(1, 1)$|R|
|$D_2$|$(4, 4)$|G|
|$D_3$|$(1, 5)$|B|

Anda diminta membangun sistem klasifikasi SVM Multi-class untuk data ini. Karena SVM dasar adalah klasifikasi biner, Anda harus memecahnya menjadi beberapa sub-masalah.

Tugas:

Pilih SALAH SATU strategi berikut: One-vs-Rest (OVR) ATAU One-vs-One (OVO).

Kemudian, bangunlah model-model SVM (Hyperplane) yang diperlukan secara manual.

**Instruksi:**

1. **Strategi:** Tuliskan strategi yang Anda pilih (OVR atau OVO).
    
2. **Identifikasi Model:** Tuliskan pasangan kelas/grup apa saja yang akan dilatih. (Minimal 3 Model).
        
3. **Pembangunan Model:** Untuk **SETIAP** model yang Anda identifikasi di poin 2, tentukan persamaan Hyperplane terbaiknya ($w \cdot x + b = 0$).
    
    - _Petunjuk:_ Gunakan intuisi geometri sederhana untuk mencari garis tengah tegak lurus (perpendicular bisector) antara dua titik terdekat dari kelas yang berlawanan. Tidak perlu perhitungan Lagrange penuh yang panjang, cukup cari garis tengahnya.
        
    - _Contoh Geometri:_ Garis pemisah antara $(0,0)$ dan $(4,0)$ adalah garis vertikal $x=2$ (atau $1x + 0y - 2 = 0$).
        

|   |   |   |
|---|---|---|
|**Nama Model**|**Deskripsi (Kelas vs Kelas)**|**Persamaan Hyperplane (w1​x1​+w2​x2​+b=0)**|
|Model 1|... vs ...|...|
|Model 2|... vs ...|...|
|Model 3|... vs ...|...|

4. Prediksi (Voting/Max Score):
    
    Diberikan data baru $D_{test} = (2, 2)$. Lakukan prediksi kelas menggunakan model-model yang telah Anda buat di atas. Tunjukkan proses voting atau perbandingan skornya hingga didapat kesimpulan kelas akhir.
    

## BAGIAN III: Konsep & Visualisasi

**Soal 3: Kernel Trick & Dimensi Tinggi**

Bayangkan Anda memiliki dataset 1D sederhana yang tidak terpisah secara linear:

- **Kelas A:** $x \in [-1, 1]$ (Titik-titik di tengah garis)
    
- **Kelas B:** $x < -2$ atau $x > 2$ (Titik-titik di ujung kiri dan kanan)
    

Tugas:

a. Gambarkan posisi titik-titik tersebut pada sumbu 1D. Tunjukkan bahwa tidak ada satu titik pemisah yang bisa memisahkan Kelas A dan B secara sempurna.

b. Usulkan sebuah fungsi pemetaan (mapping function) $\phi(x)$ sederhana yang mentransformasi data 1D ini ($x$) menjadi data 2D ($z_1, z_2$) atau 1D baru ($z$) sehingga data menjadi linearly separable.

* Hint: Pikirkan fungsi kuadrat.

c. Gambarkan hasil transformasi data tersebut di ruang fitur (feature space) yang baru dan gambarkan garis pemisah (linear hyperplane)-nya.

## BAGIAN IV: Teori & Metrik Evaluasi

**Soal 4: Analisis Peran & Dampak**

Isilah tabel berikut mengenai peran parameter atau kondisi tertentu dalam model Geometry/Optimization.

|   |   |   |   |
|---|---|---|---|
|**Kondisi / Parameter**|**Pada Model...**|**Dampak / Peran Utama**|**Alasan / Mekanisme**|
|Parameter **MinPts** (Minimum Points) terlalu besar|DBSCAN (Clustering)|Banyak data akan dianggap sebagai **(Core / Noise)**|Karena syarat kepadatan menjadi sangat ketat, sehingga...|
|Inisialisasi Bobot Awal ($\mathbf{w}$) semua **Nol**|Logistic Regression|Model **(Bisa / Tidak Bisa)** belajar|Berbeda dengan Neural Network, LogReg adalah model cembung (convex), sehingga inisialisasi nol...|
|Menggunakan **RBF Kernel** dengan $\gamma$ (Gamma) sangat tinggi|SVM Non-Linear|Batas keputusan (boundary) menjadi sangat **(Halus / Berlekuk/Kompleks)**|Gamma mengontrol jangkauan pengaruh satu data latih. Gamma tinggi berarti jangkauan...|
|Data Latih memiliki **Multikolinearitas** tinggi (Fitur berkorelasi kuat)|Linear Regression|Koefisien regresi ($\beta$) menjadi **(Stabil / Tidak Stabil)**|Multikolinearitas menyulitkan model membedakan efek individu tiap fitur, sehingga variansi estimator...|

## BAGIAN V: Matriks Karakteristik Model

**Soal 5: Komparasi Model**

Berikan tanda centang ($\checkmark$) jika model memiliki karakteristik tersebut, dan tuliskan **Argumentasi Singkat** di bawahnya.

|   |   |   |   |
|---|---|---|---|
|**Karakteristik**|**K-Nearest Neighbor (KNN)**|**Decision Tree (ID3/C4.5)**|**Support Vector Machine (SVM)**|
|**Instance-Based Learning** (Lazy Learner)|...|...|...|
|_Argumentasi:_||||
|**Model Geometris** (Menggunakan Jarak/Hyperplane)|...|...|...|
|_Argumentasi:_||||
|**Rawan terhadap Outlier**|...|...|...|
|_Argumentasi:_||||
|**Menghasilkan Rule IF-THEN**|...|...|...|
|_Argumentasi:_||||

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (Logistic Regression - SGA)
> 
> **a. Tabel Perhitungan (Ringkasan)**
> 
> _Inisialisasi:_ $\mathbf{w} = [0.1, 0.1, 0.1]$, $\eta = 0.2$  
> 
> **Epoch 1:**
> 
> 1. **Data 1 (1,1 | 0):** $z = 0.3$. $p = \sigma(0.3) \approx 0.574$. $Err = -0.574$. $\Delta w = 0.2(-0.574)[1,1,1] = [-0.115, -0.115, -0.115]$. $w_{baru} = [-0.015, -0.015, -0.015]$.
>     
> 2. **Data 2 (3,3 | 1):** $z = -0.015(1) -0.015(3) -0.015(3) = -0.105$. $p \approx 0.474$. $Err = 0.526$. $\Delta w = 0.2(0.526)[1,3,3] = [0.105, 0.316, 0.316]$. $w_{baru} = [0.090, 0.301, 0.301]$.
>     
> 3. **Data 3 (2,1 | 0):** $z = 0.090 + 0.301(2) + 0.301(1) = 0.993$. $p \approx 0.730$. $Err = -0.730$. $\Delta w = 0.2(-0.730)[1,2,1] = [-0.146, -0.292, -0.146]$. $w_{baru} = [-0.056, 0.009, 0.155]$.
>     
> 4. **Data 4 (1,3 | 1):** $z = -0.056 + 0.009(1) + 0.155(3) = 0.418$. $p \approx 0.603$. $Err = 0.397$. $\Delta w = 0.2(0.397)[1,1,3] = [0.079, 0.079, 0.238]$. $w_{baru} = [0.023, 0.088, 0.393]$.
>     
> 
> b. Self Evaluation (Data Latih)
> 
> Model contoh: $z = -0.15 - 0.25x_1 + 0.55x_2$
> 
> 1. Data 1 (1,1): $z = -0.15 - 0.25 + 0.55 = 0.15$. $p>0.5 \to$ **1**. (Salah, target 0)
>     
> 2. Data 2 (3,3): $z = -0.15 - 0.75 + 1.65 = 0.75$. $p>0.5 \to$ **1**. (Benar, target 1)
>     
> 3. Data 3 (2,1): $z = -0.15 - 0.50 + 0.55 = -0.10$. $p<0.5 \to$ **0**. (Benar, target 0)
>     
> 4. Data 4 (1,3): $z = -0.15 - 0.25 + 1.65 = 1.25$. $p>0.5 \to$ **1**. (Benar, target 1)
>     
> 
> **c. Metrik**
> 
> - TP: 2 (Data 2, 4)
>     
> - TN: 1 (Data 3)
>     
> - FP: 1 (Data 1 diprediksi 1 padahal 0)
>     
> - FN: 0
>     
> - **Akurasi:** $3/4 = 75\%$  
>     
> - **Precision:** $TP/(TP+FP) = 2/3 = 67\%$  
>     
> - **Recall:** $TP/(TP+FN) = 2/2 = 100\%$  
>     
> - **F1-Score:** $2 \cdot (0.67 \cdot 1) / (0.67+1) \approx 0.80$  
>     
> 
> ### Jawaban Soal 2 (Multi-class SVM)
> 
> **Pilihan Strategi:** One-vs-One (OVO) - _Contoh Jawaban_
> 
> **Identifikasi Model:**
> 
> 1. **R vs G:** Titik $(1,1)$ vs $(4,4)$. Titik tengah $(2.5, 2.5)$. Garis tegak lurus arah vektor $(3,3)$ adalah garis dengan gradien -1. Persamaan: $x_1 + x_2 - 5 = 0$ (Jika $>0$ ke arah G, $<0$ ke arah R).
>     
> 2. **R vs B:** Titik $(1,1)$ vs $(1,5)$. Titik tengah $(1,3)$. Garis tegak lurus arah vertikal adalah garis horizontal $y=3$ (atau $x_2 - 3 = 0$).
>     
> 3. **G vs B:** Titik $(4,4)$ vs $(1,5)$. Titik tengah $(2.5, 4.5)$.
>     
> 
> Tabel Model:
> 
> | Nama Model | Deskripsi | Persamaan Hyperplane (Contoh) |
> |:---:|:---:|:---:|
> | M1 | R vs G | $x_1 + x_2 - 5 = 0$ |
> | M2 | R vs B | $x_2 - 3 = 0$ |
> | M3 | G vs B | $3x_1 - x_2 - 3 = 0$ (Aproksimasi) |
> 
> **Prediksi Data Baru (2, 2):**
> 
> - **M1 (R vs G):** $2+2-5 = -1$ (Negatif $\to$ Kelas **R** menang).
>     
> - **M2 (R vs B):** $2 - 3 = -1$ (Negatif $\to$ Kelas **R** menang).
>     
> - **M3 (G vs B):** $3(2) - 2 - 3 = 1$ (Positif $\to$ Kelas **G** menang).
>     
> - **Voting:** R (2 suara), G (1 suara), B (0 suara).
>     
> - **Hasil:** Kelas **Merah (R)**.
>     
> 
> _(Jawaban mahasiswa bisa bervariasi pada persamaan garis, yang penting logika geometrinya benar memisahkan dua titik)._
> 
> ### Jawaban Soal 3 (Kernel Trick)
> 
> a. Gambar 1D:
> 
> B --- B --- [ A --- A ] --- B --- B
> 
> Jelas tidak bisa dipisahkan oleh satu titik potong.
> 
> b. Fungsi Pemetaan:
> 
> $\phi(x) = x^2$.
> 
> - Kelas A ($x \in [-1, 1]$) $\to x^2 \in [0, 1]$.
>     
> - Kelas B ($|x| > 2$) $\to x^2 > 4$.
>     
> 
> c. Gambar Feature Space:
> 
> Pada sumbu baru $z = x^2$, Kelas A berkumpul di kiri (0 s.d 1), Kelas B di kanan (>4).
> 
> Garis pemisah (Hyperplane) bisa diletakkan di $z = 2.5$ (atau angka antara 1 dan 4).
> 
> Persamaan Linear: $x^2 - 2.5 = 0$.
> 
> ### Jawaban Soal 4 (Teori)
> 
> 1. **Noise**; Syarat ketat membuat banyak data valid yang kurang padat dianggap noise.
>     
> 2. **Bisa**; LogReg convex, gradient akan tetap mengarahkan ke minimum global meski mulai dari 0.
>     
> 3. **Berlekuk/Kompleks** (Overfitting); Jangkauan sempit membuat model membentuk "pulau" kecil di sekitar setiap data latih.
>     
> 4. **Tidak Stabil**; Variansi besar membuat koefisien berubah drastis dengan sedikit perubahan data.
>     
> 
> ### Jawaban Soal 5 (Matriks Model)
> 
> |   |   |   |   |   |
> |---|---|---|---|---|
> |**Karakteristik**|**KNN**|**ID3/C4.5**|**SVM**|**Argumentasi**|
> |**Instance-Based**|$\checkmark$|-|-|KNN menyimpan data mentah, SVM/DT membangun model abstrak.|
> |**Model Geometris**|$\checkmark$|-|$\checkmark$|KNN pakai jarak, SVM pakai hyperplane. DT pakai logika aturan.|
> |**Rawan Outlier**|$\checkmark$|-|-|KNN (jika k kecil) dan SVM (jika C besar) sensitif. DT lebih robust.|
> |**Rule IF-THEN**|-|$\checkmark$|-|Hanya Decision Tree yang outputnya eksplisit berupa aturan logika.|