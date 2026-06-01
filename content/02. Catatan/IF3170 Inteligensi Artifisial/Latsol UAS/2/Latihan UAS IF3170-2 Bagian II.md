_Back to_ [[Latihan UAS IF3170]]

# Problem Set: Geometry & Optimization Models

**Mata Kuliah:** Inteligensi Artifisial

**Topik:** Geometry & Optimization Models (Linear/Logistic Regression, SVM)

**Sifat:** Latihan Mandiri

## BAGIAN I: Logistic Regression (Stochastic Gradient Ascent)

**Soal 1: Update Bobot Iteratif**

Diberikan dataset latih sederhana untuk klasifikasi biner ($Y \in \{0, 1\}$) dengan dua fitur ($x_1, x_2$) sebagai berikut:

|   |   |   |   |
|---|---|---|---|
|**No**|**x1​**|**x2​**|**Kelas (Y)**|
|1|2|1|0|
|2|1|3|1|
|3|3|2|0|
|4|0|2|1|

Lakukan pelatihan model **Logistic Regression** menggunakan algoritma **Stochastic Gradient Ascent (SGA)** dengan ketentuan:

- **Inisialisasi Bobot:** $\mathbf{w} = [w_0, w_1, w_2] = [0, 0, 0]$. (Ingat $x_0 = 1$ untuk bias).
    
- **Learning Rate (**$\eta$**):** 0.1
    
- **Fungsi Aktivasi:** Sigmoid $\sigma(z) = \frac{1}{1 + e^{-z}}$  
    
- **Jumlah Epoch:** 1 Epoch (Urutan data sesuai nomor: 1 $\to$ 2 $\to$ 3 $\to$ 4, diulang 2 kali).
    

Instruksi:

a. Lengkapi tabel perhitungan manual di bawah ini (tuliskan hingga 3 angka di belakang koma).

b. Lakukan Self-Evaluation pada akhir Epoch 2: Prediksi kembali label kelas data latih menggunakan bobot akhir (Threshold $0.5$).

c. Hitung Akurasi dan F1-Score (anggap Kelas 1 sebagai Positif).

**Tabel Kerja (Epoch 1 & 2):**

|   |   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|---|
|**Epoch**|**Data Ke-**|**Input Augmented [1,x1​,x2​]**|**Target y**|**Logit z=wTx**|**Prediksi p=σ(z)**|**Error (y−p)**|**Update Δw=η(y−p)x**|**Bobot Baru wnew​**|
|1|1|$[1, 2, 1]$|0|0|0.5|-0.5|$[ -0.05, -0.1, -0.05 ]$|$[ -0.05, -0.1, -0.05 ]$|
|1|2|...|...|...|...|...|...|...|
|...|...|...|...|...|...|...|...|...|

_(Lanjutkan hingga data ke-4 pada Epoch 2)_

## BAGIAN II: Support Vector Machine (Analitik)

**Soal 2: Penurunan SVM & Lagrange Multiplier**

Diketahui 3 titik data berikut yang _linearly separable_:

- **Kelas Positif (+1):** $A(3, 3)$, $B(4, 3)$  
    
- **Kelas Negatif (-1):** $C(1, 1)$  
    

Anda diminta mencari _Optimal Separating Hyperplane_ dengan metode Lagrange Multiplier secara terpandu.

Instruksi:

Isilah langkah-langkah di bawah ini.

|**Langkah**|**Pertanyaan**|**Isian / Jawaban**|
|---|---|---|
|**1**|Tuliskan fungsi **Primal** SVM (yang ingin diminimalkan) beserta constraint-nya.|Minimize: $\frac{1}{2}\|w\|^2$ <br><br>Subject to: $y(w \cdot x_i + b) \geq 1$|
|**2**|Tuliskan fungsi **Dual** SVM (yang ingin dimaksimalkan dalam $\alpha$) beserta constraint $\alpha$.|Maximize: $L_D(\alpha) = \sum \alpha_i - \frac{1}{2} \sum_{i,j} \alpha_i \alpha_j y_i y_j (\mathbf{x}_i \cdot \mathbf{x}_j)$<br><br>  <br><br>Subject to: $\alpha_i \ge 0$ dan $\sum \alpha_i y_i = 0$|
|**3**|Hitung nilai **Dot Product** $(\mathbf{x}_i \cdot \mathbf{x}_j)$ untuk semua pasangan data (Gram Matrix).|$A \cdot A = 18$, $A \cdot B = 21$, $A \cdot C = 6$<br><br>  <br><br>$B \cdot B = \dots$, $B \cdot C = \dots$, $C \cdot C = \dots$|
|**4**|Susun persamaan dari turunan parsial Lagrange atau substitusi nilai ke fungsi Dual. (Asumsikan titik B bukan Support Vector, sehingga $\alpha_B = 0$).|Persamaan kendala: $\alpha_A(1) + \alpha_B(1) + \alpha_C(-1) = 0 \Rightarrow \alpha_A = \alpha_C = \alpha$.<br><br>  <br><br>Masukkan ke $L_D(\alpha)$ dan sederhanakan dalam variabel $\alpha$.|
|**5**|Cari nilai $\alpha$ optimal dengan menurunkan persamaan langkah 4 terhadap $\alpha$ dan samakan dengan 0.|$\frac{\partial L_D}{\partial \alpha} = 0 \Rightarrow \alpha = \dots$|
|**6**|Hitung vektor bobot $\mathbf{w}$ dari nilai $\alpha$ yang didapat.|$\mathbf{w} = \sum \alpha_i y_i \mathbf{x}_i = \dots$|
|**7**|Hitung bias $b$ menggunakan salah satu Support Vector.|$b = y_{sv} - \mathbf{w} \cdot \mathbf{x}_{sv} = \dots$|

## BAGIAN III: Konsep & Visualisasi

**Soal 3: Non-Linear SVM & Kernel Trick**

Bayangkan dataset 2D berbentuk "Cincin": Kelas A berada di pusat (lingkaran kecil), dan Kelas B mengelilingi Kelas A (cincin luar). Dataset ini tidak bisa dipisahkan secara linear di 2D.

Tugas:

a. Gambarkan skema/arsitektur proses Kernel Trick. Skema harus menunjukkan alur dari:

Input Space (2D) $\to$ Feature Map Function $\phi(x)$ $\to$ Feature Space (3D/High Dim) $\to$ Linear Hyperplane.

b. Jelaskan secara singkat mengapa kita menggunakan Kernel Function $K(x_i, x_j)$ alih-alih menghitung transformasi $\phi(x)$ secara eksplisit.

c. Sebutkan jenis Kernel yang paling cocok untuk kasus "Cincin" ini.

## BAGIAN IV: Teori & Metrik Evaluasi

**Soal 4: Analisis Metrik & Parameter**

Isilah tabel berikut mengenai dampak parameter atau kondisi data terhadap model.

|   |   |   |   |
|---|---|---|---|
|**Kondisi / Parameter**|**Pada Model...**|**Dampak / Peran Utama**|**Alasan / Mekanisme**|
|Adanya **Outlier Ekstrem** pada Data Training|Regresi Linear (Evaluasi MSE)|Nilai MSE akan **(Meningkat Drastis / Sedikit Berubah)**|Karena MSE menggunakan fungsi kuadrat $(y-\hat{y})^2$, sehingga error besar pada outlier akan...|
|Adanya **Outlier Ekstrem** pada Data Training|Regresi Linear (Evaluasi MAE)|Nilai MAE akan **(Meningkat Drastis / Sedikit Berubah)** dibanding MSE|Karena MAE menggunakan nilai absolut $|
|Parameter **C** bernilai **Sangat Besar**|SVM (Soft Margin)|Margin menjadi **(Sempit / Lebar)** dan risiko Overfitting **(Naik / Turun)**|Nilai C besar memberikan penalti/hukuman yang besar pada variabel... ($\xi$), sehingga model memaksakan kebenaran klasifikasi.|
|Parameter **Learning Rate** ($\eta$) terlalu kecil|Logistic Regression|Proses konvergensi menjadi **(Cepat / Lambat)**|Karena langkah update bobot $\Delta w$ menjadi sangat kecil, sehingga butuh...|

## BAGIAN V: Matriks Karakteristik Model

**Soal 5: Komparasi Model**

Berikan tanda centang ($\checkmark$) jika model memiliki karakteristik tersebut, dan tuliskan **Argumentasi Singkat** di bawahnya mengapa model tersebut memilikinya/tidaknya.

|   |   |   |   |
|---|---|---|---|
|**Karakteristik**|**Linear Regression**|**Logistic Regression**|**Support Vector Machine (SVM)**|
|**Output berupa Probabilitas**|...|...|...|
|_Argumentasi:_|_(Contoh: Tidak, outputnya kontinu tanpa batas)_|||
|**Memaksimalkan Margin**|...|...|...|
|_Argumentasi:_||||
|**Menggunakan Least Square Error**|...|...|...|
|_Argumentasi:_||||
|**Dapat menangani Non-Linearity dengan Kernel**|...|...|...|
|_Argumentasi:_||||

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ### Jawaban Soal 1 (Logistic Regression)
> 
> **a. Tabel Perhitungan (Ringkasan)**
> 
> _Inisialisasi:_ $w = [0, 0, 0]$  
> 
> **Epoch 1:**
> 
> 1. **Data 1 (2,1 | 0):** $z=0$, $p=0.5$, $err=-0.5$. $\Delta w = 0.1(-0.5)[1,2,1] = [-0.05, -0.1, -0.05]$. $w_{baru} = [-0.05, -0.1, -0.05]$.
>     
> 2. **Data 2 (1,3 | 1):** $z = -0.05(1) -0.1(1) -0.05(3) = -0.3$. $p \approx 0.426$. $err = 0.574$. $\Delta w = [0.057, 0.057, 0.172]$. $w_{baru} = [0.007, -0.043, 0.122]$.
>     
> 3. **Data 3 (3,2 | 0):** $z = 0.007(1) -0.043(3) + 0.122(2) = 0.007 - 0.129 + 0.244 = 0.122$. $p \approx 0.53$. $err = -0.53$. $\Delta w = [-0.053, -0.159, -0.106]$. $w_{baru} = [-0.046, -0.202, 0.016]$.
>     
> 4. **Data 4 (0,2 | 1):** $z = -0.046 + 0.016(2) = -0.014$. $p \approx 0.496$. $err = 0.504$. $\Delta w = [0.050, 0, 0.101]$. $w_{baru} = [0.004, -0.202, 0.117]$.
>     
> b. Self Evaluation (Pada Data Latih)
> 
> Model: $z = -0.05 - 0.3x_1 + 0.3x_2$
> 
> 1. Data 1 (2,1): $z = -0.05 - 0.6 + 0.3 = -0.35$. $p<0.5 \to$ Prediksi **0**. (Benar)
>     
> 2. Data 2 (1,3): $z = -0.05 - 0.3 + 0.9 = 0.55$. $p>0.5 \to$ Prediksi **1**. (Benar)
>     
> 3. Data 3 (3,2): $z = -0.05 - 0.9 + 0.6 = -0.35$. $p<0.5 \to$ Prediksi **0**. (Benar)
>     
> 4. Data 4 (0,2): $z = -0.05 + 0.6 = 0.55$. $p>0.5 \to$ Prediksi **1**. (Benar)
>     
> 
> **c. Metrik**
> 
> - TP (Kelas 1 Benar): 2
>     
> - TN (Kelas 0 Benar): 2
>     
> - FP: 0, FN: 0
>     
> - **Akurasi:** $4/4 = 100\%$  
>     
> - **F1-Score:** $1.0$  
>     
> 
> ### Jawaban Soal 2 (SVM)
> 
> |   |   |
> |---|---|
> |**Langkah**|**Isian / Jawaban**|
> |**3**|$B \cdot B = 16+9=25$, $B \cdot C = 4+3=7$, $C \cdot C = 1+1=2$|
> |**4**|Persamaan Dual: $L = (\alpha_A + \alpha_C) - \frac{1}{2} [ \alpha_A^2(18) + \alpha_C^2(2) + 2\alpha_A\alpha_C(-1)(6) ]$<br><br>  <br><br>Substitusi $\alpha_A = \alpha_C = \alpha$:<br><br>  <br><br>$L = 2\alpha - \frac{1}{2} [ 18\alpha^2 + 2\alpha^2 - 12\alpha^2 ] = 2\alpha - \frac{1}{2}(8\alpha^2) = 2\alpha - 4\alpha^2$|
> |**5**|Turunan: $2 - 8\alpha = 0 \Rightarrow 8\alpha = 2 \Rightarrow \mathbf{\alpha = 0.25}$|
> |**6**|$\mathbf{w} = 0.25(1)[3,3] + 0.25(-1)[1,1] = [0.75, 0.75] - [0.25, 0.25] = \mathbf{[0.5, 0.5]}$|
> |**7**|Pakai titik C(1,1) $y=-1$:<br><br>  <br><br>$b = -1 - ( [0.5, 0.5] \cdot [1, 1] ) = -1 - (0.5+0.5) = \mathbf{-2}$|
> 
> **Persamaan Hyperplane:** $0.5x_1 + 0.5x_2 - 2 = 0$  
> 
> ### Jawaban Soal 3 (Non-Linear SVM)
> 
> a. Skema:
> 
> Mahasiswa harus menggambar data 2D (input) masuk ke proses $\phi$ (mapping) menjadi data 3D yang terpisah bidang datar, lalu dicari linear separator-nya.
> 
> b. Alasan Kernel Trick:
> 
> Menghitung transformasi $\phi(x)$ ke dimensi tinggi sangat mahal secara komputasi (bahkan tak hingga). Kernel Trick memungkinkan kita menghitung dot product di dimensi tinggi $K(x,y) = \langle \phi(x), \phi(y) \rangle$ langsung dari input aslinya tanpa perlu tahu koordinat transformasinya.
> 
> c. Jenis Kernel:
> 
> RBF (Radial Basis Function) atau Polynomial Kernel (derajat 2).
> 
> ### Jawaban Soal 4 (Teori)
> 
> 1. **Meningkat Drastis**; mengkuadratkan error (hukuman berat untuk outlier).
>     
> 2. **Sedikit Berubah (Lebih Robust)**; error linear tidak membesar secara eksponensial.
>     
> 3. **Sempit**; **Naik** (Overfitting); variabel _Slack_ ($\xi$).
>     
> 4. **Lambat**; butuh banyak iterasi untuk mencapai minimum.
>     
> 
> ### Jawaban Soal 5 (Matriks Model)
> 
> |   |   |   |   |
> |---|---|---|---|
> |**Karakteristik**|**LogReg**|**SVM**|**Argumentasi**|
> |**Output Probabilitas**|$\checkmark$|-|LogReg menggunakan Sigmoid menghasilkan nilai 0-1 (probabilitas). SVM outputnya adalah jarak/skor (kecuali dikalibrasi).|
> |**Max Margin**|-|$\checkmark$|Ini adalah _objective function_ utama SVM. LogReg memaksimalkan Likelihood.|
> |**Least Square Error**|-|-|LinReg pakai LSE. LogReg pakai _Log-Loss/MLE_. SVM pakai _Hinge Loss_.|
> |**Kernel Trick**|-|$\checkmark$|SVM mempermudah penggunaan Kernel lewat Dual Form. LogReg bisa tapi sangat jarang/mahal.|