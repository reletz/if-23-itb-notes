_Back to_ [[IF3170 Inteligensi Artifisial]]

Waktu: 90 Menit

Sifat: Individu, Tutup Buku & Tutup Catatan

Boleh menggunakan kalkulator (selain dari mobile devices)

## Bagian I: Konsep Regresi Logistik & Pelatihan (Nilai 40)

### 1.1 Pilihlah jawaban terbaik dari berbagai kandidat jawaban yang ada dengan memberi tanda silang (X) pada tabel di bawah ini.

|**No**|**Isi Soal**|**Sigmoid (Fungsi Logistik)**|**LCL (Log Conditional Likelihood)**|**SGA (Stochastic Gradient Ascent)**|**Logit (Log-Odds)**|**Hyperplane**|
|---|---|---|---|---|---|---|
|1|Fungsi yang "memaksa" _output_ linear ($z$) menjadi nilai probabilitas antara 0 dan 1.||||||
|2|Batas keputusan $g(x)=0$ di mana probabilitas prediksi model tepat 0.5. ||||||
|3|Fungsi yang ditransformasi ($\log(p/(1-p))$) yang memiliki hubungan linear dengan fitur input $X$. ||||||
|4|Fungsi tujuan (Cost Function) yang ingin **dimaksimalkan** oleh model Regresi Logistik. ||||||
|5|Metode optimasi iteratif yang memperbarui bobot model satu per satu data. ||||||

### 1.2 Bubuhkan tanda silang (X) pada kolom Benar atau Salah untuk setiap soal di bawah ini.

|   |   |   |   |
|---|---|---|---|
|**No**|**Isi Soal**|**Benar**|**Salah**|
|1|Regresi Logistik menggunakan _Least Square Estimator_ (LSE) karena LSE terbukti _convex_ untuk klasifikasi biner.|||
|2|Jika $b_1 = 0.2$, interpretasinya adalah "kenaikan 1 unit $X_1$ akan menaikkan probabilitas $P(Y=1)$ sebesar 0.2". [cite: uploaded:UAS/Regresi Logistik.md]|||
|3|Satu "Epoch" dalam SGA berarti algoritma telah melihat dan memperbarui bobot menggunakan seluruh data latih tepat satu kali. [cite: uploaded:UAS/Pelatihan Regresi Logistik.md]|||
|4|_Gradient Ascent_ digunakan (alih-alih _Descent_) karena tujuan optimasi MLE adalah **memaksimalkan** probabilitas (LCL). [cite: uploaded:UAS/Pelatihan Regresi Logistik.md]|||
|5|Jika _Learning Rate_ ($\eta$) diatur terlalu tinggi, SGA akan konvergen lebih cepat ke _global maximum_. [cite: uploaded:UAS/Pelatihan Regresi Logistik.md]|||

### 1.3 Tuliskan komponen fundamental untuk Pelatihan Regresi Logistik (SGA).

- **Hypothesis** $p(x)$**:**
    
    - _Jawaban:_
        
- **Cost Function** $J(b)$**:**
    
    - _Jawaban:_
        
- **Optimization Goal:**
    
    - _Jawaban:_
        
- **Update Rule** $b_j$**:**
    
    - _Jawaban:_
        

### 1.4 Pilihlah jawaban terbaik dari berbagai kandidat jawaban yang ada dengan memberi tanda silang (X) pada tabel di bawah ini.

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**No**|**Isi Soal**|**Odds (p/(1−p))**|**Log-Odds (Logit)**|**z=bTx**|**η (Learning Rate)**|
|1|Rasio probabilitas sukses terhadap probabilitas gagal. |||||
|2|_Output_ dari _Linear Discriminant Function_ yang menjadi _input_ untuk fungsi Sigmoid.|||||
|3|_Hyperparameter_ yang mengontrol seberapa besar langkah pembaruan bobot dalam SGA. |||||
|4|Transformasi $\log(p/(1-p))$ yang nilainya berkisar dari $-\infty$ hingga $+\infty$. |||||

## Bagian II: Studi Kasus Perhitungan Regresi Logistik & SGA (Nilai 60)

### 2.1 Studi Kasus: Konsep Log-Odds

Jawablah pertanyaan konseptual berikut terkait interpretasi Regresi Logistik.

|   |   |   |
|---|---|---|
|**No**|**Soal**|**Jawaban**|
|**a.**|Jika probabilitas $P(Y=1)$ adalah 0.8, berapakah nilai **Odds**? (Nilai 5)||
|**b.**|Jika **Odds** adalah 9 (peluang sukses 9:1), berapakah probabilitas $P(Y=1)$? (Nilai 5)||
|**c.**|Jika probabilitas $P(Y=1)$ adalah 0.5 (tepat di _Hyperplane_), berapakah nilai **Log-Odds (Logit)**? (Nilai 5)||
|**d.**|Diberikan model $\text{Logit}(p) = -1.2 + 0.4 \times (\text{JamBelajar})$. Jelaskan interpretasi bisnis dari koefisien $b_1 = 0.4$. (Nilai 5)||

### 2.2 Studi Kasus: Simulasi Stochastic Gradient Ascent (SGA)

Anda adalah seorang _data scientist_ yang melatih model Regresi Logistik. Anda harus melakukan **satu Epoch** penuh (melewati semua data latih satu kali) menggunakan SGA.

- **Bobot Awal (**$b_{\text{awal}}$**):** $b = [b_0, b_1, b_2] = [0.1, 0, 0]$  
    
- **Learning Rate (**$\eta$**):** 0.5
    
- **Data Latih (2 data):**
    
    1. Data 1 ($i$): $x_i = [1, 2, 1]$, $y_i = 1$ (Kelas Positif)
        
    2. Data 2 ($j$): $x_j = [1, 4, 3]$, $y_j = 0$ (Kelas Negatif)
        
- **Asumsi:** $e^{-0.3} \approx 0.741$, $e^{-0.955} \approx 0.385$  
    

_(Catatan:_ $x_0=1$ _selalu ditambahkan untuk_ $b_0$ _(bias))._

|   |   |   |
|---|---|---|
|**No**|**Soal**|**Jawaban**|
|**e.**|**(Iterasi 1: Data 1)** Hitung $z_i = b_{\text{awal}}^T x_i$. (Nilai 5)||
|**f.**|**(Iterasi 1: Data 1)** Hitung probabilitas prediksi $p_i = \frac{1}{1+e^{-z_i}}$. (Nilai 5)||
|**g.**|**(Iterasi 1: Data 1)** Hitung _error_ $(y_i - p_i)$. (Nilai 5)||
|**h.**|**(Iterasi 1: Data 1)** Hitung bobot baru ($b_{\text{baru}}$) menggunakan aturan _update_ SGA untuk $b_0, b_1, b_2$. (Nilai 10)||
|**i.**|**(Iterasi 2: Data 2)** Menggunakan $b_{\text{baru}}$ dari (h), hitung $z_j = b_{\text{baru}}^T x_j$. (Nilai 5)||
|**j.**|**(Iterasi 2: Data 2)** Hitung probabilitas prediksi $p_j = \frac{1}{1+e^{-z_j}}$. (Gunakan asumsi yang diberikan). (Nilai 5)||
|**k.**|**(Iterasi 2: Data 2)** Hitung _error_ $(y_j - p_j)$. (Nilai 5)||
|**l.**|**(Iterasi 2: Data 2)** Hitung bobot akhir ($b_{\text{akhir}}$) setelah 1 Epoch penuh. (Nilai 10)||

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ## Bagian I: Konsep Regresi Logistik & Pelatihan
> 
> ### 1.1 Pilihlah jawaban terbaik
> 
> |   |   |   |   |   |   |   |
> |---|---|---|---|---|---|---|
> |**No**|**Isi Soal**|**Sigmoid (Fungsi Logistik)**|**LCL (Log Conditional Likelihood)**|**SGA (Stochastic Gradient Ascent)**|**Logit (Log-Odds)**|**Hyperplane**|
> |1|Fungsi yang "memaksa" _output_ linear ($z$) menjadi nilai probabilitas antara 0 dan 1.|**X**|||||
> |2|Batas keputusan $g(x)=0$ di mana probabilitas prediksi model tepat 0.5.|||||**X**|
> |3|Fungsi yang ditransformasi ($\log(p/(1-p))$) yang memiliki hubungan linear dengan fitur input $X$.||||**X**||
> |4|Fungsi tujuan (Cost Function) yang ingin **dimaksimalkan** oleh model Regresi Logistik.||**X**||||
> |5|Metode optimasi iteratif yang memperbarui bobot model satu per satu data.|||**X**|||
> 
> ### 1.2 Bubuhkan tanda silang (X) pada kolom Benar atau Salah
> 
> |   |   |   |   |
> |---|---|---|---|
> |**No**|**Isi Soal**|**Benar**|**Salah**|
> |1|Regresi Logistik menggunakan _Least Square Estimator_ (LSE) karena LSE terbukti _convex_ untuk klasifikasi biner.||**X**|
> |2|Jika $b_1 = 0.2$, interpretasinya adalah "kenaikan 1 unit $X_1$ akan menaikkan probabilitas $P(Y=1)$ sebesar 0.2".||**X**|
> |3|Satu "Epoch" dalam SGA berarti algoritma telah melihat dan memperbarui bobot menggunakan seluruh data latih tepat satu kali.|**X**||
> |4|_Gradient Ascent_ digunakan (alih-alih _Descent_) karena tujuan optimasi MLE adalah **memaksimalkan** probabilitas (LCL).|**X**||
> |5|Jika _Learning Rate_ ($\eta$) diatur terlalu tinggi, SGA akan konvergen lebih cepat ke _global maximum_.||**X**|
> 
> ### 1.3 Tuliskan komponen fundamental untuk Pelatihan Regresi Logistik (SGA).
> 
> - **P (Performance/Hypothesis** $p(x)$**):**
>     
>     - _Jawaban:_ $p(x) = \frac{1}{1+e^{-b^T x}}$ (Fungsi Sigmoid)
>         
> - **E (Environment/Cost Function** $J(b)$**):**
>     
>     - _Jawaban:_ LCL (Log Conditional Likelihood)
> 
> - **A (Actuator/Optimization Goal):**
>     
>     - _Jawaban:_ $\text{argmax}_b J(b)$ (Mencari $b$ yang memaksimalkan LCL)
>         
> - **S (Sensor/Update Rule** $b_j$**):**
>     
>     - _Jawaban:_ $b_j = b_j + \eta (y_i - p_i) x_{ij}$
>         
> 
> ### 1.4 Pilihlah jawaban terbaik
> 
> |   |   |   |   |   |   |
> |---|---|---|---|---|---|
> |**No**|**Isi Soal**|**Odds (p/(1−p))**|**Log-Odds (Logit)**|**z=bTx**|**η (Learning Rate)**|
> |1|Rasio probabilitas sukses terhadap probabilitas gagal.|**X**||||
> |2|_Output_ dari _Linear Discriminant Function_ yang menjadi _input_ untuk fungsi Sigmoid.|||**X**||
> |3|_Hyperparameter_ yang mengontrol seberapa besar langkah pembaruan bobot dalam SGA.||||**X**|
> |4|Transformasi $\log(p/(1-p))$ yang nilainya berkisar dari $-\infty$ hingga $+\infty$.||**X**|||
> 
> ## Bagian II: Studi Kasus Perhitungan Regresi Logistik & SGA
> 
> ### 2.1 Studi Kasus: Konsep Log-Odds
> 
> |   |   |   |
> |---|---|---|
> |**No**|**Soal**|**Jawaban**|
> |**a.**|Jika probabilitas $P(Y=1)$ adalah 0.8, berapakah nilai **Odds**? (Nilai 5)|$\text{Odds} = \frac{p}{1-p} = \frac{0.8}{1-0.8} = \frac{0.8}{0.2} = \mathbf{4}$|
> |**b.**|Jika **Odds** adalah 9 (peluang sukses 9:1), berapakah probabilitas $P(Y=1)$? (Nilai 5)|$\text{Odds} = \frac{p}{1-p} \Rightarrow 9 = \frac{p}{1-p} \Rightarrow 9(1-p) = p \Rightarrow 9 - 9p = p \Rightarrow 9 = 10p \Rightarrow p = \mathbf{0.9}$|
> |**c.**|Jika probabilitas $P(Y=1)$ adalah 0.5 (tepat di _Hyperplane_), berapakah nilai **Log-Odds (Logit)**? (Nilai 5)|$\text{Odds} = \frac{0.5}{1-0.5} = 1$.<br><br>  <br><br>$\text{Logit} = \log(1) = \mathbf{0}$|
> |**d.**|Diberikan model $\text{Logit}(p) = -1.2 + 0.4 \times (\text{JamBelajar})$. Jelaskan interpretasi bisnis dari koefisien $b_1 = 0.4$. (Nilai 5)|"Setiap 1 jam tambahan belajar, **log-odds** (logit) siswa untuk Lulus diprediksi **meningkat sebesar 0.4**."|
> 
> ### 2.2 Studi Kasus: Simulasi Stochastic Gradient Ascent (SGA)
> 
> _(Data 1:_ $x_i = [1, 2, 1]$_,_ $y_i = 1$ _| Data 2:_ $x_j = [1, 4, 3]$_,_ $y_j = 0$ _|_ $b_{\text{awal}} = [0.1, 0, 0]$ _|_ $\eta = 0.5$_)_
> 
> |   |   |   |
> |---|---|---|
> |**No**|**Soal**|**Jawaban**|
> |**e.**|**(Iterasi 1: Data 1)** Hitung $z_i = b_{\text{awal}}^T x_i$. (Nilai 5)|$z_i = (0.1 \times 1) + (0 \times 2) + (0 \times 1) = \mathbf{0.1}$|
> |**f.**|**(Iterasi 1: Data 1)** Hitung probabilitas prediksi $p_i = \frac{1}{1+e^{-z_i}}$. (Nilai 5)|$p_i = \frac{1}{1+e^{-0.1}} \approx \frac{1}{1+0.905} \approx \frac{1}{1.905} \approx \mathbf{0.525}$|
> |**g.**|**(Iterasi 1: Data 1)** Hitung _error_ $(y_i - p_i)$. (Nilai 5)|$(1 - 0.525) = \mathbf{0.475}$|
> |**h.**|**(Iterasi 1: Data 1)** Hitung bobot baru ($b_{\text{baru}}$) menggunakan aturan _update_ SGA untuk $b_0, b_1, b_2$. (Nilai 10)|$b_0 = b_0 + \eta (y_i - p_i) x_{i0} = 0.1 + (0.5 \times 0.475 \times 1) = 0.1 + 0.2375 = \mathbf{0.3375}$  <br><br>  <br><br>$b_1 = b_1 + \eta (y_i - p_i) x_{i1} = 0 + (0.5 \times 0.475 \times 2) = 0 + 0.475 = \mathbf{0.475}$  <br><br>  <br><br>$b_2 = b_2 + \eta (y_i - p_i) x_{i2} = 0 + (0.5 \times 0.475 \times 1) = 0 + 0.2375 = \mathbf{0.2375}$  <br><br>  <br><br>($b_{\text{baru}} = [0.3375, 0.475, 0.2375]$)|
> |**i.**|**(Iterasi 2: Data 2)** Menggunakan $b_{\text{baru}}$ dari (h), hitung $z_j = b_{\text{baru}}^T x_j$. (Nilai 5)|$z_j = (0.3375 \times 1) + (0.475 \times 4) + (0.2375 \times 3)$  <br><br>  <br><br>$z_j = 0.3375 + 1.9 + 0.7125 = \mathbf{2.95}$|
> |**j.**|**(Iterasi 2: Data 2)** Hitung probabilitas prediksi $p_j = \frac{1}{1+e^{-z_j}}$. (Gunakan asumsi $e^{-2.95} \approx 0.052$). (Nilai 5)|$p_j = \frac{1}{1+e^{-2.95}} \approx \frac{1}{1+0.052} \approx \frac{1}{1.052} \approx \mathbf{0.95}$ (Prediksi salah, model memprediksi 1)|
> |**k.**|**(Iterasi 2: Data 2)** Hitung _error_ $(y_j - p_j)$. (Nilai 5)|$(0 - 0.95) = \mathbf{-0.95}$|
> |**l.**|**(Iterasi 2: Data 2)** Hitung bobot akhir ($b_{\text{akhir}}$) setelah 1 Epoch penuh. (Nilai 10)|$b_0 = 0.3375 + (0.5 \times -0.95 \times 1) = 0.3375 - 0.475 = \mathbf{-0.1375}$  <br><br>  <br><br>$b_1 = 0.475 + (0.5 \times -0.95 \times 4) = 0.475 - 1.9 = \mathbf{-1.425}$  <br><br>  <br><br>$b_2 = 0.2375 + (0.5 \times -0.95 \times 3) = 0.2375 - 1.425 = \mathbf{-1.1875}$  <br><br>  <br><br>($b_{\text{akhir}} = [-0.1375, -1.425, -1.1875]$)|