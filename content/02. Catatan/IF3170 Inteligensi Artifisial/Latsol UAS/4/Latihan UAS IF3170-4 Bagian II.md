_Back to_ [[Latihan UAS IF3170]]

# Problem Set: Geometry & Optimization Models (Paket C - Revisi)

Mata Kuliah: Inteligensi Artifisial

Topik: Geometry & Optimization Models (Logistic Regression, Multi-class Non-Linear SVM)

Sifat: Latihan Mandiri

## BAGIAN I: Logistic Regression (Stochastic Gradient Ascent)

**Soal 1: Prediksi Risiko Penyakit Jantung**

Diberikan dataset latih untuk memprediksi risiko penyakit jantung ($Y=1$: Risiko Tinggi, $Y=0$: Risiko Rendah) berdasarkan dua fitur: **Tekanan Darah** ($x_1$) dan **Kolesterol** ($x_2$).

|   |   |   |   |
|---|---|---|---|
|**No**|**Tekanan Darah (x1​)**|**Kolesterol (x2​)**|**Risiko (Y)**|
|1|2|1|0|
|2|4|5|1|
|3|3|2|0|
|4|5|6|1|

Model Hipotesis (Pembanding):

Seorang ahli jantung memberikan model aturan praktis (rule-based) sederhana sebagai pembanding:

$$h_{expert}(x) = \text{IF } (0.4x_1 + 0.6x_2) \ge 3.5 \text{ THEN } 1 \text{ ELSE } 0$$

Tugas Pelatihan:

Lakukan pelatihan model Logistic Regression Anda sendiri menggunakan Stochastic Gradient Ascent (SGA) dengan ketentuan:

- **Inisialisasi Bobot:** $\mathbf{w} = [w_0, w_1, w_2] = [-0.1, 0.2, 0.2]$.
    
- **Bias:** $x_0 = 1$ selalu disertakan.
    
- **Learning Rate (**$\eta$**):** 0.1
    
- **Fungsi Aktivasi:** Sigmoid $\sigma(z) = \frac{1}{1 + e^{-z}}$  
    
- **Jumlah Epoch:** 2 Epoch (Urutan data: 1 $\to$ 2 $\to$ 3 $\to$ 4, diulang 2 kali).
    

Instruksi:

a. Pelatihan Model: Lengkapi tabel perhitungan manual SGA di bawah ini (tuliskan hingga 3 angka desimal).

b. Prediksi Data Baru: Diberikan pasien baru dengan data $x_{new} = (3, 4)$.

* Hitung prediksi kelas menggunakan Model LogReg Hasil Latihan Anda.

* Hitung prediksi kelas menggunakan Model Hipotesis Ahli.

c. Komparasi Evaluasi: Hitung metrik Akurasi, Presisi, Recall, dan F1-Score untuk kedua model (LogReg vs Ahli) berdasarkan kinerja mereka terhadap Data Latih. Simpulkan model mana yang lebih baik pada data latih ini.

**Tabel Kerja (Epoch 1 & 2):**

|   |   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|---|
|**Epoch**|**Data**|**Input [1,x1​,x2​]**|**Target y**|**Logit z=wTx**|**Prediksi p=σ(z)**|**Error (y−p)**|**Update Δw**|**Bobot Baru wnew​**|
|1|1|$[1, 2, 1]$|0|$-0.1(1)+0.2(2)+0.2(1) = 0.5$|0.622|-0.622|$[-0.062, -0.124, -0.062]$|$[-0.162, 0.076, 0.138]$|
|1|2|...|...|...|...|...|...|...|
|...|...|...|...|...|...|...|...|...|

_(Lanjutkan hingga data ke-4 pada Epoch 2)_

## BAGIAN II: Multi-class SVM Non-Linear (DAGSVM)

**Soal 2: Klasifikasi Zona dengan DAGSVM (RBF Kernel)**

Diketahui sistem klasifikasi 3 kelas (**Zona A, Zona B, Zona C**) menggunakan strategi **DAGSVM (Directed Acyclic Graph SVM)**. Sistem ini menggunakan struktur graf eliminasi untuk mempercepat prediksi dibandingkan One-vs-Rest atau One-vs-One standar.

**Struktur DAGSVM:**

1. **Root Node:** Menguji **Zona A vs Zona C**.
    
    - Jika Menang A $\to$ Ke Node Kiri (Uji **A vs B**).
        
    - Jika Menang C $\to$ Ke Node Kanan (Uji **B vs C**).
        
2. **Node Lapis 2:**
    
    - **Node Kiri (A vs B):** Pemenang adalah kelas final.
        
    - **Node Kanan (B vs C):** Pemenang adalah kelas final.
        

Parameter Model (Kernel RBF):

Digunakan RBF Kernel dengan $\gamma = 0.1$: $K(\mathbf{x}, \mathbf{y}) = \exp(-\gamma ||\mathbf{x} - \mathbf{y}||^2)$.

Setiap classifier biner (node) memiliki Support Vector ($SV$) dan bobot $\alpha$ berikut:

- **Model 1 (Root: A vs C):**
    
    - $SV_A = (1, 1)$, $\alpha_A y_A = +1.0$  
        
    - $SV_C = (7, 1)$, $\alpha_C y_C = -1.0$  
        
    - Bias $b_1 = -0.5$  
        
    - _Aturan:_ Jika $f(x) > 0 \to$ Pilih A (ke Kiri), Jika $f(x) < 0 \to$ Pilih C (ke Kanan).
        
- **Model 2 (Node Kiri: A vs B):**
    
    - $SV_A = (1, 1)$, $\alpha_A y_A = +1.0$  
        
    - $SV_B = (4, 4)$, $\alpha_B y_B = -1.0$  
        
    - Bias $b_2 = -0.2$  
        
    - _Aturan:_ Jika $f(x) > 0 \to$ Kelas A, Jika $f(x) < 0 \to$ Kelas B.
        
- **Model 3 (Node Kanan: B vs C):**
    
    - $SV_B = (4, 4)$, $\alpha_B y_B = +1.0$  
        
    - $SV_C = (7, 1)$, $\alpha_C y_C = -1.0$  
        
    - Bias $b_3 = +0.3$  
        
    - _Aturan:_ Jika $f(x) > 0 \to$ Kelas B, Jika $f(x) < 0 \to$ Kelas C.
        

Tugas Hitungan:

Diberikan titik uji baru $X_{new} = (3, 3)$. Lakukan penelusuran graf DAGSVM untuk menentukan kelasnya.

**Instruksi:**

1. **Langkah 1 (Root Node - A vs C):**
    
    - Hitung Jarak Kuadrat $X_{new}$ ke $SV_A$ dan $SV_C$.
        
    - Hitung Nilai Kernel $K(SV_A, X)$ dan $K(SV_C, X)$.
        
    - Hitung Skor Keputusan $f_1(x)$. Tentukan arah penelusuran (Kiri atau Kanan?).
        
2. **Langkah 2 (Node Berikutnya):**
    
    - Berdasarkan arah dari Langkah 1, pilih model yang relevan (Model 2 atau Model 3).
        
    - Hitung Jarak Kuadrat $X_{new}$ ke SV yang relevan untuk model tersebut.
        
    - Hitung Nilai Kernel.
        
    - Hitung Skor Keputusan $f(x)$.
        
3. **Kesimpulan Akhir:**
    
    - Berdasarkan hasil Langkah 2, apa prediksi kelas akhir untuk $X_{new}$?
        
    - Gambarkan jalur penelusuran keputusan yang diambil.
        

## BAGIAN III: Konsep & Visualisasi

**Soal 3: Transformasi Fitur Non-Linear**

Bayangkan data 1D di mana **Kelas P** berada di rentang $x \in [2, 4]$ dan **Kelas Q** berada di $x < 1$ atau $x > 5$.

Tugas:

a. Gambarkan arsitektur pemrosesan data (pipeline) mulai dari input $x$, transformasi $\phi(x)$, hingga klasifikasi linear.

b. Usulkan fungsi transformasi $\phi(x)$ (misalnya menggunakan polinomial) yang membuat data ini terpisah linear. Tuliskan persamaannya.

c. Gambarkan sketsa posisi data setelah ditransformasi dan di mana letak garis pemisahnya.

## BAGIAN IV: Teori & Metrik Evaluasi

**Soal 4: Analisis Metrik & Hyperparameter**

Isilah tabel berikut mengenai dampak parameter atau kondisi data.

|   |   |   |   |
|---|---|---|---|
|**Kondisi / Parameter**|**Pada Model...**|**Dampak / Peran Utama**|**Alasan / Mekanisme**|
|Menggunakan **L1 Regularization** (Lasso)|Linear/Logistic Regression|Bobot fitur yang tidak penting menjadi **(Mengecil / Nol)**|L1 menambahkan penalti nilai absolut $|
|Data Test memiliki distribusi kelas yang **Sangat Tidak Seimbang** (Imbalanced)|Evaluasi Model Klasifikasi|Metrik **(Akurasi / F1-Score)** menjadi tidak dapat dipercaya|Akurasi bisa terlihat tinggi hanya dengan memprediksi kelas mayoritas, sementara F1...|
|Nilai **Gamma (**$\gamma$**)** pada RBF Kernel terlalu **Kecil**|SVM Non-Linear|Model cenderung mengalami **(Overfitting / Underfitting)**|Gamma kecil berarti jangkauan pengaruh satu data latih sangat luas/jauh, membuat batas keputusan menjadi terlalu...|
|Menambah jumlah **Epoch** terlalu banyak tanpa henti|Logistic Regression (SGA)|Model pada data latih semakin bagus, tapi pada data uji risiko **(Overfitting / Underfitting)** naik|Model mulai "menghafal" noise yang ada pada data latih alih-alih pola umum.|

## BAGIAN V: Matriks Karakteristik Model

**Soal 5: Komparasi Model**

Berikan tanda centang ($\checkmark$) jika model memiliki karakteristik tersebut, dan tuliskan **Argumentasi Singkat** di bawahnya.

|   |   |   |   |
|---|---|---|---|
|**Karakteristik**|**Naive Bayes**|**Neural Network (MLP)**|**Support Vector Machine (SVM)**|
|**Asumsi Independensi Fitur**|...|...|...|
|_Argumentasi:_||||
|**Black Box Model** (Sulit Diinterpretasi)|...|...|...|
|_Argumentasi:_||||
|**Global Optimum Guaranteed** (Convex Optimization)|...|...|...|
|_Argumentasi:_||||
|**Probabilistik Generatif**|...|...|...|
|_Argumentasi:_||||

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (Logistic Regression - SGA)
> 
> **a. Tabel Perhitungan (Ringkasan)**
> 
> _Inisialisasi:_ $\mathbf{w} = [-0.1, 0.2, 0.2]$, $\eta = 0.1$  
> 
> **Epoch 1:**
> 
> 1. **Data 1 (2,1 | 0):** $z = 0.5$. $p \approx 0.622$. $Err = -0.622$. $\Delta w = [-0.062, -0.124, -0.062]$. $\mathbf{w}_{new} = [-0.162, 0.076, 0.138]$.
>     
> 2. **Data 2 (4,5 | 1):** $z = -0.162 + 0.076(4) + 0.138(5) = 0.832$. $p \approx 0.697$. $Err = 0.303$. $\Delta w = [0.030, 0.121, 0.152]$. $\mathbf{w}_{new} = [-0.132, 0.197, 0.290]$.
>     
> 3. **Data 3 (3,2 | 0):** $z = -0.132 + 0.197(3) + 0.290(2) = 1.039$. $p \approx 0.739$. $Err = -0.739$. $\Delta w = [-0.074, -0.222, -0.148]$. $\mathbf{w}_{new} = [-0.206, -0.025, 0.142]$.
>     
> 4. **Data 4 (5,6 | 1):** $z = -0.206 - 0.025(5) + 0.142(6) = 0.521$. $p \approx 0.627$. $Err = 0.373$. $\Delta w = [0.037, 0.187, 0.224]$. $\mathbf{w}_{new} = [-0.169, 0.162, 0.366]$.
>     
> 
> Epoch 2 (Lanjutan):
> 
> (Proses berlanjut update dari bobot terakhir). Misalkan setelah Epoch 2 bobot akhir (aproksimasi) adalah: $\mathbf{w}_{final} \approx [-0.3, 0.1, 0.5]$. (Angka ilustratif untuk kunci).
> 
> **b. Prediksi Data Baru (3, 4)**
> 
> - **Model LogReg:** $z = -0.3 + 0.1(3) + 0.5(4) = 2.0$. $p = \sigma(2.0) \approx 0.88 > 0.5$. Prediksi: **1 (Risiko Tinggi)**.
>     
> - **Model Ahli:** $0.4(3) + 0.6(4) = 1.2 + 2.4 = 3.6$. Karena $3.6 \ge 3.5$, Prediksi: **1 (Risiko Tinggi)**.
>     
> 
> c. Komparasi Evaluasi (Data Latih)
> 
> Analisis: Data Latih: (0, 1, 0, 1).
> 
> - **LogReg (Bobot Akhir** $\approx [-0.3, 0.1, 0.5]$**):**
>     
>     - D1(2,1): $z=0.4 \to 1$ (Salah)
>         
>     - D2(4,5): $z=2.6 \to 1$ (Benar)
>         
>     - D3(3,2): $z=1.0 \to 1$ (Salah)
>         
>     - D4(5,6): $z=3.2 \to 1$ (Benar)
>         
>     - **Hasil:** TP=2, TN=0, FP=2, FN=0.
>         
>     - Akurasi: 50%, Presisi: 50%, Recall: 100%, F1: 0.67.
>         
> - **Model Ahli:**
>     
>     - D1(2,1): $0.4(2)+0.6(1)=1.4 < 3.5 \to 0$ (Benar)
>         
>     - D2(4,5): $0.4(4)+0.6(5)=4.6 \ge 3.5 \to 1$ (Benar)
>         
>     - D3(3,2): $0.4(3)+0.6(2)=2.4 < 3.5 \to 0$ (Benar)
>         
>     - D4(5,6): $0.4(5)+0.6(6)=5.6 \ge 3.5 \to 1$ (Benar)
>         
>     - **Hasil:** TP=2, TN=2, FP=0, FN=0.
>         
>     - Akurasi: 100%, Presisi: 100%, Recall: 100%, F1: 1.0.
>         
> - **Kesimpulan:** Model **Ahli lebih baik** pada data latih ini (LogReg masih _underfitting_ butuh lebih banyak epoch).
>     
> 
> ### Jawaban Soal 2 (DAGSVM)
> 
> **1. Langkah 1: Root Node (A vs C)**
> 
> - Jarak ke $SV_A(1,1): (3-1)^2 + (3-1)^2 = 8$. $K_A = e^{-0.8} \approx 0.449$.
>     
> - Jarak ke $SV_C(7,1): (3-7)^2 + (3-1)^2 = 20$. $K_C = e^{-2.0} \approx 0.135$.
>     
> - Skor $f_1 = (1.0)(0.449) + (-1.0)(0.135) - 0.5 = 0.449 - 0.135 - 0.5 = \mathbf{-0.186}$.
>     
> - **Keputusan:** Karena $f_1 < 0$, pemenangnya adalah **C** (tapi dalam struktur DAGSVM, jika kalah A, maka A yang dieliminasi). Maka kita lanjut ke Node Kanan (**B vs C**). _Note: Aturan di soal "Jika < 0 -> Pilih C (ke Kanan)"._
>     
> 
> **2. Langkah 2: Node Kanan (B vs C)**
> 
> - Jarak ke $SV_B(4,4): (3-4)^2 + (3-4)^2 = 2$. $K_B = e^{-0.2} \approx 0.819$.
>     
> - Jarak ke $SV_C(7,1): 20$. $K_C \approx 0.135$.
>     
> - Skor $f_3 = (1.0)(0.819) + (-1.0)(0.135) + 0.3 = 0.819 - 0.135 + 0.3 = \mathbf{0.984}$.
>     
> - **Keputusan:** Karena $f_3 > 0$, maka **Kelas B** menang.
>     
> 
> **3. Kesimpulan:**
> 
> - **Prediksi Akhir:** Zona B.
>     
> - **Jalur:** Root (A vs C) $\to$ Kanan (Eliminasi A) $\to$ Node (B vs C) $\to$ Menang B.
>     
> 
> ### Jawaban Soal 3 (Transformasi Fitur)
> 
> a. Arsitektur:
> 
> Input x $\to$ Transformasi Polinomial $\phi(x)$ $\to$ Fitur Baru z $\to$ Linear Classifier (Thresholding di z).
> 
> b. Fungsi Transformasi:
> 
> Gunakan fungsi kuadrat yang digeser pusatnya ke tengah antara P dan Q.
> 
> Pusat P $\approx 3$, Q di luar.
> 
> $\phi(x) = (x - 3)^2$.
> 
> - Jika $x \in [2, 4]$, maka $(x-3) \in [-1, 1]$, jadi $z \in [0, 1]$.
>     
> - Jika $x < 1$ atau $x > 5$, maka $|x-3| > 2$, jadi $z > 4$.
>     
> 
> c. Gambar:
> 
> Sumbu $z$ (nilai kuadrat). Data P berkumpul di kiri (0-1), Data Q berkumpul di kanan (>4).
> 
> Garis pemisah di $z = 2.5$.
> 
> Persamaan linear: $(x-3)^2 - 2.5 = 0$.
> 
> ### Jawaban Soal 4 (Teori)
> 
> 1. **Nol**; solusi _sparse_ (berguna untuk seleksi fitur otomatis).
>     
> 2. **Akurasi**; bias ke kelas mayoritas, F1 lebih robust karena rata-rata harmonik P&R.
>     
> 3. **Underfitting**; batas keputusan terlalu sederhana/rata (mendekati linear) karena pengaruh data terlalu luas.
>     
> 4. **Overfitting**; model menyesuaikan diri dengan noise data latih.
>     
> 
> ### Jawaban Soal 5 (Matriks Model)
> 
> |   |   |   |   |   |
> |---|---|---|---|---|
> |**Karakteristik**|**Naive Bayes**|**Neural Network**|**SVM**|**Argumentasi**|
> |**Asumsi Independensi**|$\checkmark$|-|-|Sifat utama NB ("Naive"). NN/SVM menangkap korelasi antar fitur.|
> |**Black Box**|-|$\checkmark$|-|NN sulit dilacak alurnya (bobot jutaan). SVM (geometris) dan NB (probabilitas) lebih transparan.|
> |**Global Optimum**|-|-|$\checkmark$|SVM adalah masalah Convex Optimization (pasti ketemu global optimum). NN non-convex (banyak local minima).|
> |**Probabilistik Generatif**|$\checkmark$|-|-|NB memodelkan $P(X)$|