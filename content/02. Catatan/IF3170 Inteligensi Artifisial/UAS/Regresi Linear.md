---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Regresi Linear (Dasar, LSE, & Evaluasi)
> 
> > ## Questions/Cues
> > 
> > - Apa itu Regresi?
> >     
> > - Apa tujuan dari regresi?
> >     
> > - Istilah: Variabel Dependen vs Independen?
> >     
> > - Apa itu Regresi Linear Sederhana (SLR)?
> >     
> > - Apa itu $\beta_0$ (intercept) dan $\beta_1$ (slope)?
> >     
> > - Apa itu Regresi Linear Multivariat (MLR)?
> >     
> > - Bagaimana cara mengestimasi parameter ($b_0$, $b_1$)?
> >     
> > - Apa itu LSE (Least Square Estimator)?
> >     
> > - Apa tujuan LSE?
> >     
> > - Formula $b_1$ (slope) "from scratch"?
> >     
> > - Formula $b_0$ (intercept) "from scratch"?
> >     
> > - Bagaimana regresi dilihat sebagai Supervised Learning?
> >     
> > - Apa itu hipotesis $h$?
> >     
> > - Bagaimana cara menguji/evaluasi model regresi?
> >     
> > - Apa itu MAE (Mean Absolute Error)?
> >     
> > - Apa itu MSE (Residual Sum of Squares)?
> >     
> > - Apa itu R2-Score?
> >     
> > - Apa itu Fungsi Biaya $J(\theta)$?
> >     
> > - Solusi Analitis vs Iteratif?
> >     
> >
> > ## Reference Points
> > 
> > - IF3170 - 11a - Regression (Slide 1-15)
> >     
> > - DTS - Thematic Academy 2021
> >     
> 
> > ### 1. Pengantar Regresi
> > 
> > **Regresi** adalah sebuah teknik _supervised learning_. Tujuannya adalah untuk menemukan sebuah formula atau fungsi yang dapat memprediksi nilai _output_ kontinu (misalnya harga) berdasarkan satu atau lebih fitur _input_.
> > 
> > - **Contoh:** Memprediksi harga rumah (output) berdasarkan jumlah kamar (fitur).
> >     
> > 
> > ### 2. Konsep Regresi Linear
> > 
> > Model ini mengasumsikan ada hubungan linear ("lurus") antara input dan output.
> > 
> > - **Variabel Dependen (Y):** Respons atau output yang ingin kita prediksi (misal: `Price`, `CO2EMISSIONS`).
> >     
> > - **Variabel Independen (x):** _Regressor_ atau _predictor_, yaitu fitur yang kita gunakan untuk memprediksi (misal: `Number of rooms`, `ENGINESIZE`).
> >     
> > 
> > **Regresi Linear Sederhana (SLR):**
> > 
> > Hanya menggunakan satu variabel independen (x).
> > 
> > - **Formula:** $Y = \beta_0 + \beta_1 X$.
> >     
> > - $\beta_0$ (**Intercept**): Nilai dasar $Y$ ketika $x$ adalah 0. Titik di mana garis memotong sumbu Y.
> >     
> > - $\beta_1$ (**Slope**): Kemiringan. Menunjukkan seberapa besar $Y$ berubah untuk setiap 1 unit perubahan pada $x$.
> >     
> > - **Contoh:** `Emisi CO2 = 124.41 + 39.43 * (Ukuran Mesin)`.
> >     
> > 
> > **Regresi Linear Multivariat (MLR):**
> > 
> > Menggunakan lebih dari satu variabel independen ($x_1, x_2, ..., x_n$).
> > 
> > - **Formula:** $h_{\theta}(x) = \theta_0 + \theta_1 x_1 + ... + \theta_n x_n = \theta^T x$.
> >     
> > - **Contoh:** `Emisi CO2 = 64.98 + 11.37*(EngineSize) + 7.26*(Cylinders) + 9.58*(FuelConsumption)`.
> >     
> > 
> > ### 3. Estimasi Parameter: Least Square Estimator (LSE)
> > 
> > **Tujuan:** Menemukan nilai terbaik untuk parameter ($b_0$ dan $b_1$) yang paling "pas" dengan data training. Garis terbaik adalah yang memiliki error terkecil.
> > 
> > **Metode:** **Least Square Estimator (LSE)** adalah metode yang bertujuan untuk **meminimalkan Sum of Squares of the Residuals/Errors (SSE)**.
> > 
> > - **Error/Residual (**$e_i$**):** Selisih (jarak vertikal) antara nilai $y$ asli dan nilai $\hat{y}$ yang diprediksi model ($y_i - \hat{y}_i$).
> >     
> > - **Formula SSE:** $SSE = \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 = \sum_{i=1}^{n} (y_i - b_0 - b_1 x_i)^2$.
> >     
> > 
> > ### 4. Regresi sebagai Supervised Learning
> > 
> > Prosesnya adalah _supervised learning_:
> > 
> > 1. **Training:** Kita memberikan data ber-label (`<data, label>`, misal: `<EngineSize, CO2Emission>`) ke algoritma LSE.
> >     
> > 2. **Learning:** Algoritma LSE "belajar" dan menghasilkan sebuah **Hipotesis** $h$ (model/fungsi). (Contoh: $h(x) = 124.41 + 39.43x$).
> >     
> > 3. **Prediction:** Hipotesis $h$ ini kemudian digunakan untuk memprediksi label $y$ pada data baru yang tak terlihat.
> >     
> > 
> > ### 5. Evaluasi Model (Testing)
> > 
> > Setelah training, kita perlu mengukur seberapa baik model kita bekerja pada data _testing_.
> > 
> > - **Mean Absolute Error (MAE):** Rata-rata dari nilai absolut error. Mudah diinterpretasi (misal: "rata-rata, prediksi kami meleset 22.50 unit").
> >     
> >     - $MAE = \frac{1}{n} \sum |y_i - \hat{y}_i|$.
> >         
> > - **Residual Sum of Squares (MSE):** Rata-rata dari kuadrat error. Memberi "hukuman" lebih besar pada error yang besar.
> >     
> >     - $MSE = \frac{1}{n} \sum (y_i - \hat{y}_i)^2$.
> >         
> > - **R2-Score (Coefficient of Determination):** Mengukur seberapa banyak variasi $Y$ yang bisa dijelaskan oleh $X$ menggunakan model. Nilainya antara 0-1 (semakin dekat ke 1, semakin baik).
> >     
> >     - $R2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$. (Membandingkan error model kita dengan error model "bodoh" yang hanya memprediksi nilai rata-rata $\bar{y}$).
> >         
> >     - Pada contoh CO2, model MLR (R2=0.87) lebih baik daripada model SLR (R2=0.73).
> >         
> > 
> > ### 6. Ringkasan LSE
> > 
> > - **Hipotesis** $h$**:** Fungsi linear $h_{\theta}(x) = \theta^{T} \cdot x$.
> >     
> > - **Fungsi Biaya** $J(\theta)$**:** Fungsi yang kita minimalkan. Untuk LSE, ini adalah SSE ($J(\theta) = SSE$).
> >     
> > - **Goal:** Cari parameter $\theta^*$ yang meminimalkan $J(\theta)$ ($\theta^* = \text{argmin } J(\theta)$).
> >     
> > - **Solusi:**
> >     
> >     1. **Analitis:** Menemukan $\theta$ dengan turunan $\nabla J(\theta) = 0$ (seperti pada LSE).
> >         
> >     2. **Iteratif:** Jika solusi analitis tidak bisa ditemukan, gunakan metode numerik seperti _gradient descent_.
> >         

> [!cornell] #### Summary
> 
> **Regresi Linear adalah teknik** _**supervised learning**_ **untuk memprediksi nilai** _**output**_ **kontinu (variabel dependen) dengan menemukan hubungan linear terhadap satu (SLR) atau beberapa (MLR) fitur** _**input**_ **(variabel independen). Metode paling umum untuk menemukan parameter (bobot/koefisien** $\beta$**) adalah** _**Least Square Estimator**_ **(LSE), yang bekerja dengan cara meminimalkan total kuadrat error (SSE) antara prediksi dan nilai sebenarnya. Parameter** $b_0$ **(intercept) dan** $b_1$ **(slope) dapat ditemukan secara analitis melalui turunan parsial, yang disederhanakan menjadi formula berbasis** _**mean**_**,** _**variance**_**, dan** _**covariance**_**. Kualitas model dievaluasi menggunakan data** _**testing**_ **dengan metrik seperti MAE (Mean Absolute Error), MSE (Mean Squared Error), dan R2-Score.**

> [!ad-libitum]- Additional Information (Technical Deep Dive)
> 
> #### Penurunan Rumus LSE (Finding $b_0$ and $b_1$)
> 
> Kita ingin meminimalkan $SSE = \sum_{i=1}^{n}(y_{i}-b_{0}-b_{1}x_{i})^{2}$. Ini dilakukan dengan mengambil turunan parsial terhadap $b_0$ dan $b_1$, lalu menyamakannya dengan 0 (mencari titik minimum).
> 
> 1. Turunan terhadap $b_0$:
>     
>     $\frac{\partial(SSE)}{\partial b_{0}} = -2\sum_{i=1}^{n}(y_{i}-b_{0}-b_{1}x_{i}) = 0$
>     
>     $\sum y_i - n b_0 - b_1 \sum x_i = 0$
>     
>     $n b_0 = \sum y_i - b_1 \sum x_i$
>     
>     $b_{0} = \frac{\sum y_i}{n} - b_1 \frac{\sum x_i}{n}$
>     
>     $b_{0} = \overline{y} - b_1 \overline{x}$ (mean Y - b1 * mean X)
>     
> 2. Turunan terhadap $b_1$:
>     
>     $\frac{\partial(SSE)}{\partial b_{1}} = -2\sum_{i=1}^{n}(y_{i}-b_{0}-b_{1}x_{i})x_{i} = 0$
>     
>     (Setelah substitusi $b_0$ dan penyederhanaan aljabar yang panjang)
>     
>     $b_{1} = \frac{n\sum x_i y_i - (\sum x_i)(\sum y_i)}{n\sum x_i^2 - (\sum x_i)^2} = \frac{\sum_{i=1}^{n}(x_{i}-\overline{x})(y_{i}-\overline{y})}{\sum_{i=1}^{n}(x_{i}-\overline{x})^{2}}$
>     
> 
> #### Implementasi "From Scratch" (Formula Statistik)
> 
> Rumus $b_1$ secara esensial adalah $\frac{\text{Covariance}(X, Y)}{\text{Variance}(X)}$.
> 
> - **Variance (**$\sigma^2$**):** Ukuran sebaran data dari meannya.
>     
>     - $\sigma^{2}=E[(X-\mu)^{2}]$.
>         
> - **Covariance (**$\sigma_{XY}$**):** Ukuran bagaimana dua variabel berubah bersama-sama.
>     
>     - $\sigma_{XY}=E[(X-\mu_{X})(Y-\mu_{Y})]$.
>         
> 
> Ini memungkinkan kita menghitung $b_1$ dan $b_0$ secara langsung:
> 
> 1. `b1 = train.CO2EMISSIONS.cov(train.ENGINESIZE) / train.ENGINESIZE.var()`
>     
> 2. `b0 = train.CO2EMISSIONS.mean() - b1 * train.ENGINESIZE.mean()`
>     
> 
> Hasil dari `sklearn` dan "from scratch" identik, membuktikan bahwa `sklearn` menggunakan LSE.