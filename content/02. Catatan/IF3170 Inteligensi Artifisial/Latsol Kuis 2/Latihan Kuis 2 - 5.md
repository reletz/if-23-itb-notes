_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set Regresi & Pelatihan: Lanjutan

Estimasi Waktu: 100 - 120 menit

**Tujuan Pembelajaran:**

1. Mampu membedakan fungsi biaya dan metode optimasi untuk Regresi Linear (LSE) dan Regresi Logistik (MLE).
2. Mampu menghitung parameter Regresi Linear ($b_0$, $b_1$) menggunakan metode LSE.
3. Mampu mensimulasikan proses pelatihan Regresi Logistik menggunakan _Stochastic Gradient Ascent_ (SGA).
4. Mampu menginterpretasikan koefisien model dan konsep inti (Log-Odds, Hyperplane, R2-Score).
    

## Bagian I: Teori dan Konsep (15 Soal)

### A. True/False (5 Soal)

Instruksi: Tentukan apakah pernyataan berikut Benar (True) atau Salah (False) dan jelaskan secara singkat alasannya.

|**No.**|**Pernyataan**|**Jawaban (T/F)**|
|---|---|---|
|**I.1**|Metode _Least Square Estimator_ (LSE) digunakan untuk melatih Regresi Logistik dengan cara memaksimalkan _Sum of Squared Errors_ (SSE).||
|**I.2**|_Stochastic Gradient Ascent_ (SGA) disebut "Ascent" (Naik) karena tujuannya adalah memaksimalkan _Log Conditional Likeliood_ (LCL), bukan meminimalkan _error_.||
|**I.3**|_Output_ dari Regresi Linear adalah probabilitas (nilai antara 0 dan 1), sedangkan _output_ dari fungsi Sigmoid (Regresi Logistik) adalah nilai kontinu (bisa $<$ 0 atau $>$ 1).||
|**I.4**|Dalam Regresi Logistik, _Hyperplane_ ($g(x)=0$) adalah permukaan keputusan di mana model memprediksi probabilitas tepat 0.5.||
|**I.5**|Metrik R2-Score adalah ukuran evaluasi utama untuk Regresi Logistik, yang mengukur seberapa banyak variasi _log-odds_ yang dapat dijelaskan oleh model.||

### B. Multiple Choice Multiple Answer (MCMA) (5 Soal)

Instruksi: Pilih **minimal dua (2)** jawaban yang paling tepat.

I.6. (Karakteristik Regresi Linear)

Pilih tiga (3) pernyataan yang paling tepat mendeskripsikan Regresi Linear Sederhana (SLR).

A. Menggunakan Maximum Likelihood Estimator (MLE) sebagai cost function.
B. Bertujuan meminimalkan Sum of Squares of the Residuals (SSE).
C. Koefisien $\beta_1$ (slope) dapat dihitung menggunakan $\text{Covariance}(X,Y) / \text{Variance}(X)$.
D. Menggunakan fungsi Sigmoid untuk membatasi output prediksi.
E. Dievaluasi menggunakan metrik seperti Mean Absolute Error (MAE) dan R2-Score.

I.7. (Konsep Regresi Logistik)

Pilih tiga (3) konsep inti dari Regresi Logistik.

A. Model ini secara fundamental memodelkan Log-Odds (Logit) sebagai kombinasi linear dari fitur-fitur input.
B. Decision Surface yang memisahkan kelas-kelas adalah sebuah Hyperplane.
C. Menggunakan Least Square Estimator (LSE) untuk menemukan parameter $b$ terbaik.
D. Fungsi Sigmoid ($p = 1 / (1 + e^{-z})$) digunakan untuk mengubah output linear ($z$) menjadi probabilitas.
E. Koefisien $b_1$ berarti "setiap kenaikan 1 unit $x_1$ akan menaikkan probabilitas $p$ sebesar $b_1$".

I.8. (Pelatihan Regresi Logistik - SGA)

Pilih tiga (3) pernyataan yang benar mengenai Stochastic Gradient Ascent (SGA).

A. SGA memperbarui bobot $b$ setelah menghitung error dari satu epoch penuh (seluruh data).
B. $\eta$ (learning rate) adalah parameter yang mengontrol seberapa besar langkah pembaruan bobot pada setiap iterasi.
C. Aturan pembaruan $b_j = b_j + \eta (y_i - p_i) x_{ij}$ menggunakan error $(y_i - p_i)$ sebagai sinyal untuk koreksi.
D. SGA lebih cepat per iterasinya dibandingkan Batch Gradient Ascent karena hanya menggunakan satu data acak.
E. SGA dijamin menemukan global maximum LCL dalam satu epoch.

I.9. (Interpretasi Koefisien)

Manakah dua (2) interpretasi koefisien ($b_1$) yang benar?

A. Regresi Linear: $b_1=0.5$ berarti kenaikan 1 unit $X$ akan menaikkan nilai $Y$ sebesar 0.5 unit.
B. Regresi Linear: $b_1=0.5$ berarti kenaikan 1 unit $X$ akan menaikkan log-odds $Y$ sebesar 0.5.
C. Regresi Logistik: $b_1=0.5$ berarti kenaikan 1 unit $X$ akan menaikkan log-odds (Logit) dari $P(Y=1)$ sebesar 0.5.
D. Regresi Logistik: $b_1=0.5$ berarti kenaikan 1 unit $X$ akan menaikkan probabilitas $P(Y=1)$ sebesar 0.5.

I.10. (LSE vs MLE)

Pilih dua (2) perbedaan fundamental antara LSE dan MLE.

A. LSE bertujuan meminimalkan SSE (Error Kuadrat).
B. LSE bertujuan memaksimalkan SSE (Error Kuadrat).
C. MLE bertujuan meminimalkan LCL (Log-Likelihood).
D. MLE bertujuan memaksimalkan LCL (Log-Likelihood).

### C. Matching (5 Soal)

Instruksi: Pasangkan istilah di Kiri dengan definisi atau formula terbaik di Kanan.

|**Istilah**|**Konsep Kritis Regresi**|
|---|---|
|**I.11. LSE (Least Square Est.)**|$\log\left(\frac{p}{1-p}\right) = b_0 + b_1 x$|
|**I.12. MLE (Max Likelihood Est.)**|$\text{argmin } \sum (y_i - \hat{y}_i)^2$|
|**I.13. Logit (Log-Odds)**|$p = \frac{1}{1+e^{-z}}$|
|**I.14. Sigmoid Function**|$\text{argmax}\sum{\log{P(y_i)}}$|
|**I.15. Hyperplane**|$g(x) = b^T x = 0$|

## Bagian II: Perhitungan dan Analisis Kasus (15 Soal)

### D. Perhitungan Regresi Linear (LSE) (4 Soal)

Diberikan 4 data latih untuk memprediksi **Harga (Y)** berdasarkan **Ukuran (X)**.

|**No.**|**Ukuran (X)**|**Harga (Y)**|
|---|---|---|
|1|10|9|
|2|20|11|
|3|30|15|
|4|40|17|

II.1. Hitunglah nilai rata-rata $\bar{x}$ (Mean X) dan $\bar{y}$ (Mean Y).

II.2. Hitunglah koefisien $b_1$ (slope) menggunakan formula LSE: $b_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}$.

II.3. Hitunglah koefisien $b_0$ (intercept) menggunakan formula $b_0 = \bar{y} - b_1 \bar{x}$.

II.4. Tuliskan hipotesis $h(x)$ (model regresi) dan hitung Mean Absolute Error (MAE) dari model Anda pada data latih.

### E. Simulasi Pelatihan Regresi Logistik (SGA) (6 Soal)

Diberikan 1 data latih $\langle x_i, y_i \rangle$ dan 1 data latih kedua.

- Data 1: $x_i = [1, 2, 3]$, $y_i = 1$ (Kelas Positif). (Angka '1' pertama pada $x_i$ adalah $x_0$ untuk _bias_).
    
- Data 2: $x_j = [1, 4, 1]$, $y_j = 0$ (Kelas Negatif).
    
- Bobot awal $b = [0, 0, 0]$ (yaitu $b_0=0, b_1=0, b_2=0$).
    
- _Learning Rate_ $\eta = 0.1$.
    
- Gunakan $e^x \approx 2.718$.
    

II.5. (Data 1): Hitung $z = b^T x_i$ menggunakan bobot awal.

II.6. (Data 1): Hitung $p_i = \frac{1}{1+e^{-z}}$ (probabilitas prediksi).

II.7. (Data 1): Hitung "error" $(y_i - p_i)$.

II.8. (Data 1): Hitung bobot baru $b_{\text{new}}$ menggunakan aturan update SGA: $b_j = b_j + \eta (y_i - p_i) x_{ij}$ untuk $b_0$, $b_1$, dan $b_2$.

II.9. (Data 2): Menggunakan bobot baru dari II.8, hitung $z = b_{\text{new}}^T x_j$ untuk Data 2.

II.10. (Data 2): Hitung $p_j = \frac{1}{1+e^{-z}}$ untuk Data 2.

### F. Esai Analisis Kasus Kritis (5 Soal)

II.11. (Interpretasi Koefisien)

Seorang analis data memiliki dua model:

1. **Model LR (Harga Rumah):** $b_{\text{luas}} = 2.5$.
    
2. Model LogR (Lulus/Gagal): $b_{\text{belajar}} = 0.8$.
    
    Jelaskan interpretasi dari $b_{\text{luas}} = 2.5$ dan $b_{\text{belajar}} = 0.8$ dalam konteks bisnis yang jelas.
    

II.12. (Masalah LR untuk Klasifikasi)

Jelaskan dua (2) alasan utama mengapa menggunakan Regresi Linear (LSE) + Threshold 0.5 adalah ide yang buruk untuk masalah klasifikasi, dibandingkan dengan Regresi Logistik.

II.13. (Fungsi Biaya: LSE vs MLE)

Jelaskan secara konseptual mengapa Regresi Linear menggunakan Least Square Estimator (LSE) sementara Regresi Logistik menggunakan Maximum Likelihood Estimator (MLE). Mengapa LSE tidak cocok untuk Regresi Logistik?

II.14. (Epoch dan $\eta$ dalam SGA)

Apa yang dimaksud dengan "Epoch" dalam konteks SGA? Jelaskan apa yang akan terjadi jika Learning Rate ($\eta$) diatur terlalu tinggi atau terlalu rendah.

II.15. (R2-Score vs MAE)

Jelaskan perbedaan interpretasi antara R2-Score = 0.75 dan MAE = 10.5 pada sebuah model Regresi Linear. Metrik mana yang lebih mudah dipahami oleh pemangku kepentingan non-teknis?

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I: Teori dan Konsep
> 
> ### A. True/False
> 
> |**No.**|**Pernyataan**|**Jawaban**|
> |---|---|---|
> |**I.1**|Metode _Least Square Estimator_ (LSE) digunakan untuk melatih Regresi Logistik...|**False** (LogR menggunakan MLE; LSE meminimalkan SSE, bukan memaksimalkan).|
> |**I.2**|_Stochastic Gradient Ascent_ (SGA) disebut "Ascent" (Naik) karena tujuannya adalah memaksimalkan _Log Conditional Likeliood_ (LCL)...|**True** (Ascent untuk Maksimasi LCL; Descent untuk Minimasi Error).|
> |**I.3**|_Output_ dari Regresi Linear adalah probabilitas...|**False** (Kebalikan. LR $\to$ Kontinu; LogR/Sigmoid $\to$ Probabilitas 0-1).|
> |**I.4**|Dalam Regresi Logistik, _Hyperplane_ ($g(x)=0$) adalah permukaan keputusan di mana model memprediksi probabilitas tepat 0.5.|**True** (Jika $g(x)=z=0$, maka $p = 1 / (1+e^0) = 1/2 = 0.5$).|
> |**I.5**|Metrik R2-Score adalah ukuran evaluasi utama untuk Regresi Logistik...|**False** (R2-Score untuk Regresi Linear. LogR menggunakan metrik Klasifikasi seperti Akurasi, F1, atau LCL).|
> 
> ### B. Multiple Choice Multiple Answer (MCMA)
> 
> I.6. B, C, E (A salah, LR pakai LSE. D salah, LR tidak pakai Sigmoid).
> 
> I.7. A, B, D (C salah, LogR pakai MLE. E salah, $b_1$ menaikkan log-odds, bukan probabilitas secara linear).
> 
> I.8. B, C, D (A salah, SGA update per data, bukan epoch. E salah, SGA tidak dijamin global optimum, apalagi dalam 1 epoch).
> 
> I.9. A, C (B salah, itu interpretasi LogR. D salah, itu interpretasi LogR yang salah).
> 
> I.10. A, D (LSE = Minimalkan Error Kuadrat; MLE = Maksimalkan Log-Likelihood).
> 
> ### C. Matching
> 
> |**Istilah**|**Konsep Kritis Regresi**|
> |---|---|
> |**I.11. LSE (Least Square Est.)**|$\text{argmin } \sum (y_i - \hat{y}_i)^2$|
> |**I.12. MLE (Max Likelihood Est.)**|$\text{argmax } \sum \log P(y_i)$|
> |**I.13. Logit (Log-Odds)**|$\log\left(\frac{p}{1-p}\right) = b_0 + b_1 x$|
> |**I.14. Sigmoid Function**|$p = \frac{1}{1+e^{-z}}$|
> |**I.15. Hyperplane**|$g(x) = b^T x = 0$|
> 
> ### Bagian II: Perhitungan dan Analisis Kasus
> 
> ### D. Perhitungan Regresi Linear (LSE)
> 
> **II.1. Rata-rata:**
> 
> - $\bar{x} = (10 + 20 + 30 + 40) / 4 = 100 / 4 = \mathbf{25}$  
>     
> - $\bar{y} = (9 + 11 + 15 + 17) / 4 = 52 / 4 = \mathbf{13}$  
>     
> 
> II.2. Koefisien $b_1$ (slope):
> 
> | $x_i$ | $y_i$ | $(x_i - \bar{x})$ | $(y_i - \bar{y})$ | $(x_i - \bar{x})(y_i - \bar{y})$ | $(x_i - \bar{x})^2$ |
> | :---: | :---: | :---: | :---: | :---: | :---: |
> | 10 | 9 | -15 | -4 | 60 | 225 |
> | 20 | 11 | -5 | -2 | 10 | 25 |
> | 30 | 15 | 5 | 2 | 10 | 25 |
> | 40 | 17 | 15 | 4 | 60 | 225 |
> | Total | | | | $\sum = \mathbf{140}$ | $\sum = \mathbf{500}$ |
> 
> - $b_1 = 140 / 500 = \mathbf{0.28}$  
>     
> 
> **II.3. Koefisien** $b_0$ **(intercept):**
> 
> - $b_0 = \bar{y} - b_1 \bar{x} = 13 - (0.28 \times 25) = 13 - 7 = \mathbf{6}$  
>     
> 
> **II.4. Hipotesis** $h(x)$ **dan MAE:**
> 
> - $h(x) = 6 + 0.28x$
>     
> 	| $x_i$ | $y_i$ (Real) | $\hat{y}_i = 6 + 0.28x_i$ | $\|y_i - \hat{y}_i\|$ (Error Absolut) |
> 	| :---: | :---: | :---: | :---: |
> 	| 10 | 9 | $6 + 2.8 = 8.8$ | $0.2$ |
> 	| 20 | 11 | $6 + 5.6 = 11.6$ | $0.6$ |
> 	| 30 | 15 | $6 + 8.4 = 14.4$ | $0.6$ |
> 	| 40 | 17 | $6 + 11.2 = 17.2$ | $0.2$ |
>     
> - **Total Error Absolut:** $0.2 + 0.6 + 0.6 + 0.2 = 1.6$  
>     
> - **MAE:** $1.6 / 4 = \mathbf{0.4}$  
>     
> 
> ### E. Simulasi Pelatihan Regresi Logistik (SGA)
> 
> **II.5. (Data 1): Hitung** $z$ **(Bobot Awal** $b=[0,0,0]$**)**
> 
> - $z = b^T x_i = (0 \times 1) + (0 \times 2) + (0 \times 3) = \mathbf{0}$  
>     
> 
> **II.6. (Data 1): Hitung** $p_i$  
> 
> - $p_i = 1 / (1 + e^{-z}) = 1 / (1 + e^0) = 1 / (1 + 1) = \mathbf{0.5}$  
>     
> 
> **II.7. (Data 1): Hitung "error" (**$y_i=1$**)**
> 
> - $(y_i - p_i) = (1 - 0.5) = \mathbf{0.5}$  
>     
> 
> **II.8. (Data 1): Hitung Bobot Baru (**$b_{\text{new}}$**)**
> 
> - $\eta=0.1$, $x_i = [1, 2, 3]$  
>     
> - $b_0 = 0 + (0.1 \times 0.5 \times 1) = \mathbf{0.05}$  
>     
> - $b_1 = 0 + (0.1 \times 0.5 \times 2) = \mathbf{0.10}$  
>     
> - $b_2 = 0 + (0.1 \times 0.5 \times 3) = \mathbf{0.15}$  
>     
> - $b_{\text{new}} = [0.05, 0.10, 0.15]$  
>     
> 
> **II.9. (Data 2): Hitung** $z$ **(Bobot Baru** $b_{\text{new}}$**)**
> 
> - $x_j = [1, 4, 1]$  
>     
> - $z = b_{\text{new}}^T x_j = (0.05 \times 1) + (0.10 \times 4) + (0.15 \times 1)$  
>     
> - $z = 0.05 + 0.40 + 0.15 = \mathbf{0.60}$  
>     
> 
> **II.10. (Data 2): Hitung** $p_j$  
> 
> - $p_j = 1 / (1 + e^{-z}) = 1 / (1 + e^{-0.60}) \approx 1 / (1 + 0.549) \approx 1 / 1.549 \approx \mathbf{0.645}$
>     
>     (Prediksi untuk Data 2 (Kelas 0) adalah 0.645, yang masih salah, tapi bobotnya sudah mulai bergerak).
>     
> 
> ### F. Esai Analisis Kasus Kritis
> 
> **II.11. (Interpretasi Koefisien)**
> 
> - **Model LR (**$b_{\text{luas}} = 2.5$**):** Interpretasi ini linear dan langsung. "Untuk setiap kenaikan 1 meter persegi luas bangunan, harga rumah diprediksi **naik sebesar 2.5 juta Rupiah** (atau 2.5 unit mata uang), dengan asumsi faktor lain tetap."
>     
> - **Model LogR (**$b_{\text{belajar}} = 0.8$**):** Interpretasi ini non-linear (Log-Odds). "Untuk setiap kenaikan 1 jam belajar, **log-odds** (logit) mahasiswa tersebut untuk Lulus (Y=1) diprediksi **meningkat sebesar 0.8**." Ini _bukan_ berarti probabilitasnya naik 80%.
>     
> 
> **II.12. (Masalah LR untuk Klasifikasi)**
> 
> 1. **Output Tidak Terbatas:** Output Regresi Linear adalah kontinu ($-\infty$ hingga $+\infty$). Outputnya bisa 1.5 atau -0.2, yang tidak dapat diinterpretasikan sebagai probabilitas kelas. Regresi Logistik (Sigmoid) "memaksa" output menjadi 0-1.
>     
> 2. **Sensitivitas terhadap Outlier:** LSE (yang digunakan LR) sangat sensitif terhadap _outlier_. Satu titik data _outlier_ yang ekstrim dapat menggeser seluruh garis regresi (hiperplane), yang akan mengacaukan _threshold_ 0.5 dan menyebabkan kesalahan klasifikasi pada banyak data lain.
>     
> 
> **II.13. (Fungsi Biaya: LSE vs MLE)**
> 
> - **Regresi Linear (LSE):** Asumsi dasarnya adalah _error_ (residual) terdistribusi normal. Dalam kasus ini, meminimalkan _error_ kuadrat (LSE) secara matematis setara dengan memaksimalkan _likelihood_. Jadi, LSE adalah cara yang efisien untuk mencapai tujuan.
>     
> - **Regresi Logistik (MLE):** Outputnya adalah probabilitas, dan _error_-nya tidak terdistribusi normal (mengikuti distribusi Bernoulli). Jika kita mencoba menggunakan LSE pada _output_ 0/1, fungsi biayanya menjadi non-konveks (banyak minimum lokal), sehingga optimasi gagal. MLE (memaksimalkan LCL) memberikan fungsi biaya yang konveks, yang dapat dioptimasi dengan andal oleh _Gradient Ascent_.
>     
> 
> **II.14. (Epoch dan** $\eta$ **dalam SGA)**
> 
> - **Epoch:** Satu _epoch_ adalah satu kali iterasi penuh di mana algoritma telah melihat (dan berlatih) pada **setiap data** dalam _training set_ tepat satu kali. (Jika data di-shuffle, ini berarti satu putaran penuh).
>     
> - $\eta$ **Terlalu Tinggi:** Langkahnya terlalu besar. Model akan "melompati" (overshoot) titik _maximum_ (atau _minimum_). Pelatihan menjadi tidak stabil dan mungkin tidak akan pernah konvergen (berhenti di solusi baik).
>     
> - $\eta$ **Terlalu Rendah:** Langkahnya terlalu kecil. Model akan konvergen, tetapi akan membutuhkan waktu yang **sangat lama** (sangat banyak _epoch_) untuk mencapai titik _maximum_ (atau _minimum_).
>     
> 
> **II.15. (R2-Score vs MAE)**
> 
> - **R2-Score = 0.75:** Ini adalah metrik **relatif**. "Model (fitur) ini berhasil menjelaskan **75% dari varians** (keragaman) data _output_ Y. 25% sisanya tidak terjelaskan (disebabkan oleh _noise_ atau fitur lain)." Ini mengukur _kekuatan_ model.
>     
> - **MAE = 10.5:** Ini adalah metrik **absolut** dan menggunakan unit yang sama dengan _output_ Y. "Rata-rata, prediksi model ini **meleset (salah) sebesar 10.5 unit** (misal, 10.5 juta Rupiah) dari harga sebenarnya."
>     
> - **Lebih Mudah Dipahami:** **MAE** hampir selalu lebih mudah dipahami oleh pemangku kepentingan non-teknis karena menggunakan unit bisnis yang familier (misal: "Prediksi Anda salah 10.5 juta"). R2-Score (proporsi varians) lebih abstrak secara statistik.