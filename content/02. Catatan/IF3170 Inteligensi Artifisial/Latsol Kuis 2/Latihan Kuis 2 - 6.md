_Back to_ [[IF3170 Inteligensi Artifisial]]

## Bagian I: Konsep Fundamental Regresi Linear (Nilai 40)

### 1.1 Pilihlah jawaban terbaik dari berbagai kandidat jawaban yang ada dengan memberi tanda silang (X) pada tabel di bawah ini.


|**No**|**Isi Soal**|**SLR (Simple Linear Regression)**|**MLR (Multivariate Linear Regression)**|**LSE (Least Square Estimator)**|**R2-Score**|
|---|---|---|---|---|---|
|1|Sebuah metode analitis untuk menemukan parameter $\theta$ (atau $b$) dengan cara meminimalkan $\sum (y_i - \hat{y}_i)^2$.|||||
|2|Model yang digunakan untuk memprediksi `HargaRumah` berdasarkan 10 fitur (misal: `LuasBangunan`, `JumlahKamar`, `Lokasi`, dll).|||||
|3|Metrik yang mengukur proporsi varians (keragaman) $Y$ yang dapat dijelaskan oleh model $X$.|||||
|4|Model $h(x) = \theta_0 + \theta_1 x_1$.|||||
|5|Digunakan untuk mengukur "seberapa baik model kita" dibandingkan dengan model "bodoh" yang hanya memprediksi nilai rata-rata ($\bar{y}$).|||||

### 1.2 Bubuhkan tanda silang (X) pada kolom Benar atau Salah untuk setiap soal di bawah ini.


|**No**|**Isi Soal**|**Benar**|**Salah**|
|---|---|---|---|
|1|Tujuan utama Regresi Linear adalah memprediksi variabel target yang bersifat kontinu.|||
|2|_Residual_ atau _Error_ ($e_i$) adalah selisih antara nilai prediksi $\hat{y}_i$ dan nilai rata-rata $\bar{y}$.|||
|3|Koefisien $\beta_1$ (atau $b_1$) disebut _intercept_, yang menunjukkan seberapa besar $Y$ berubah jika $X$ naik 1 unit.|||
|4|Jika $b_1 = 0$, ini mengindikasikan tidak ada hubungan linear antara variabel $X$ dan $Y$.|||
|5|Metrik _Mean Absolute Error_ (MAE) memberikan "hukuman" yang lebih besar pada _outlier_ (kesalahan prediksi yang ekstrim) dibandingkan _Mean Squared Error_ (MSE). |||

### 1.3 Tuliskan komponen fundamental untuk model Regresi Linear.

- **Hypothesis(** $h_\theta(x)$ **):**
    
    - _Jawaban:_
        
- **Cost Function**( $J(\theta)$ **):**
    
    - _Jawaban:_
        
- **Optimization Goal:**
    
    - _Jawaban:_
        
- **Analytical Solution(** $b_1$ **):**
    
    - _Jawaban:_
        

### 1.4 Pilihlah jawaban terbaik dari berbagai kandidat jawaban yang ada dengan memberi tanda silang (X) pada tabel di bawah ini.


|**No**|**Isi Soal**|**β0​ (Intercept)**|**β1​ (Slope)**|**ei​ (Residual)**|**MAE (Mean Absolute Error)**|
|---|---|---|---|---|---|
|1|Nilai $Y$ yang diprediksi ketika $X=0$.||||
|2|Rata-rata dari nilai absolut _error_. ($\frac{1}{n} \sum\|y_i - \hat{y}_i\|$). |||
|3|Menunjukkan perubahan rata-rata pada $Y$ untuk setiap 1 unit kenaikan pada $X$. |||||
|4|Selisih antara nilai $y$ asli dan nilai $y$ prediksi ($y_i - \hat{y}_i$). |||||

## Bagian II: Studi Kasus Perhitungan LSE & Analisis (Nilai 60)

### 2.1 Studi Kasus: Prediksi Pengalaman vs Gaji

Anda adalah seorang _data scientist_ yang diminta membuat model Regresi Linear Sederhana untuk memprediksi **Gaji (Y, dalam Juta Rupiah)** berdasarkan **Pengalaman (X, dalam Tahun)**.

Diberikan 5 data latih sebagai berikut:


|**Karyawan**|**Pengalaman (X)**|**Gaji (Y)**|
|---|---|---|
|A|2|7|
|B|4|8|
|C|6|12|
|D|8|13|
|E|10|20|

Gunakan pendekatan _Least Square Estimator_ (LSE) untuk menjawab pertanyaan berikut.

|**No**|**Soal**|**Jawaban**|
|---|---|---|
|**a.**|Tentukan variabel dependen dan variabel independen. (Nilai 5)||
|**b.**|Hitung nilai rata-rata $\bar{x}$ (Mean X) dan $\bar{y}$ (Mean Y). (Nilai 10)||
|**c.**|Lengkapi tabel perhitungan LSE berikut untuk menemukan $b_1$ (slope). (Nilai 20)|_(Lihat tabel di bawah)_|
|**d.**|Hitung koefisien $b_1$ (slope) dan $b_0$ (intercept). (Nilai 10)||
|**e.**|Tuliskan hipotesis $h(x)$ (model regresi) dan prediksikan Gaji jika Pengalaman (X) = 7 Tahun. (Nilai 10)||
|**f.**|Jelaskan interpretasi bisnis dari nilai $b_1$ yang akan Anda temukan. (Nilai 5)||

**Tabel untuk Soal c:**

|**xi​**|**yi​**|**(xi​−xˉ)**|**(yi​−yˉ​)**|**(xi​−xˉ)(yi​−yˉ​)**|**(xi​−xˉ)2**|
|---|---|---|---|---|---|
|2|7|||||
|4|8|||||
|6|12|||||
|8|13|||||
|10|20|||||
|**Total**||||$\sum = ?$|$\sum = ?$|

> [!ad-libitum]- # KUNCI JAWABAN
> 
> ## Bagian I: Konsep Fundamental Regresi Linear
> 
> ### 1.1 Pilihlah jawaban terbaik
> 
> |   |   |   |   |   |   |
> |---|---|---|---|---|---|
> |**No**|**Isi Soal**|**SLR**|**MLR**|**LSE**|**R2-Score**|
> |1|Sebuah metode analitis untuk menemukan parameter $\theta$ (atau $b$) dengan cara meminimalkan $\sum (y_i - \hat{y}_i)^2$.|||**X**||
> |2|Model yang digunakan untuk memprediksi `HargaRumah` berdasarkan 10 fitur (misal: `LuasBangunan`, `JumlahKamar`, `Lokasi`, dll).||**X**|||
> |3|Metrik yang mengukur proporsi varians (keragaman) $Y$ yang dapat dijelaskan oleh model $X$.||||**X**|
> |4|Model $h(x) = \theta_0 + \theta_1 x_1$.|**X**||||
> |5|Digunakan untuk mengukur "seberapa baik model kita" dibandingkan dengan model "bodoh" yang hanya memprediksi nilai rata-rata ($\bar{y}$).||||**X**|
> 
> ### 1.2 Bubuhkan tanda silang (X) pada kolom Benar atau Salah
> 
> |   |   |   |   |
> |---|---|---|---|
> |**No**|**Isi Soal**|**Benar**|**Salah**|
> |1|Tujuan utama Regresi Linear adalah memprediksi variabel target yang bersifat kontinu.|**X**||
> |2|_Residual_ atau _Error_ ($e_i$) adalah selisih antara nilai prediksi $\hat{y}_i$ dan nilai rata-rata $\bar{y}$.||**X**|
> |3|Koefisien $\beta_1$ (atau $b_1$) disebut _intercept_, yang menunjukkan seberapa besar $Y$ berubah jika $X$ naik 1 unit.||**X**|
> |4|Jika $b_1 = 0$, ini mengindikasikan tidak ada hubungan linear antara variabel $X$ dan $Y$.|**X**||
> |5|Metrik _Mean Absolute Error_ (MAE) memberikan "hukuman" yang lebih besar pada _outlier_ (kesalahan prediksi yang ekstrim) dibandingkan _Mean Squared Error_ (MSE).||**X**|
> 
> ### 1.3 Tuliskan komponen fundamental untuk model Regresi Linear
> 
> - **P (Performance/Hypothesis** $h_\theta(x)$**):**
>     
>     - _Jawaban:_ $h_{\theta}(x) = \theta_0 + \theta_1 x_1 + \dots + \theta_n x_n$ [cite: uploaded:UAS/Regresi Linear.md]
>         
> - **E (Environment/Cost Function** $J(\theta)$**):**
>     
>     - _Jawaban:_ $J(\theta) = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$ (atau SSE, _Sum of Squared Errors_) [cite: uploaded:UAS/Regresi Linear.md]
>         
> - **A (Actuator/Optimization Goal):**
>     
>     - _Jawaban:_ $\text{argmin } J(\theta)$ (Mencari $\theta$ yang meminimalkan $J(\theta)$) [cite: uploaded:UAS/Regresi Linear.md]
>         
> - **S (Sensor/Analytical Solution** $b_1$**):**
>     
>     - _Jawaban:_ $b_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}$ [cite: uploaded:UAS/Regresi Linear.md]
>         
> 
> ### 1.4 Pilihlah jawaban terbaik
> 
> |   |   |   |   |   |   |
> |---|---|---|---|---|---|
> |**No**|**Isi Soal**|**β0​ (Intercept)**|**β1​ (Slope)**|**ei​ (Residual)**|**MAE (Mean Absolute Error)**|
> |1|Nilai $Y$ yang diprediksi ketika $X=0$.|**X**||||
> |2|Rata-rata dari nilai absolut _error_. ($\frac{1}{n} \sum\|y_i - \hat{y}_i\|$).||||**X**|
> |3|Menunjukkan perubahan rata-rata pada $Y$ untuk setiap 1 unit kenaikan pada $X$.||**X**|||
> |4|Selisih antara nilai $y$ asli dan nilai $y$ prediksi ($y_i - \hat{y}_i$).|||**X**||
> 
> ## Bagian II: Studi Kasus Perhitungan LSE & Analisis
> 
> |   |   |   |
> |---|---|---|
> |**No**|**Soal**|**Jawaban**|
> |**a.**|Tentukan variabel dependen dan variabel independen. (Nilai 5)|**Dependen (Y):** Gaji<br><br>  <br><br>**Independen (X):** Pengalaman|
> |**b.**|Hitung nilai rata-rata $\bar{x}$ (Mean X) dan $\bar{y}$ (Mean Y). (Nilai 10)|$\bar{x} = (2+4+6+8+10) / 5 = 30 / 5 = \mathbf{6}$  <br><br>  <br><br>$\bar{y} = (7+8+12+13+20) / 5 = 60 / 5 = \mathbf{12}$|
> |**c.**|Lengkapi tabel perhitungan LSE berikut untuk menemukan $b_1$ (slope). (Nilai 20)|_(Lihat tabel di bawah)_|
> |**d.**|Hitung koefisien $b_1$ (slope) dan $b_0$ (intercept). (Nilai 10)|$b_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2} = \frac{58}{40} = \mathbf{1.45}$  <br><br>  <br><br>  <br><br>$b_0 = \bar{y} - b_1 \bar{x} = 12 - (1.45 \times 6)$  <br><br>  <br><br>$b_0 = 12 - 8.7 = \mathbf{3.3}$|
> |**e.**|Tuliskan hipotesis $h(x)$ (model regresi) dan prediksikan Gaji jika Pengalaman (X) = 7 Tahun. (Nilai 10)|$h(x) = \mathbf{3.3 + 1.45x}$  <br><br>  <br><br>  <br><br>Prediksi $h(7) = 3.3 + (1.45 \times 7)$  <br><br>  <br><br>$h(7) = 3.3 + 10.15 = \mathbf{13.45}$ (Juta Rupiah)|
> |**f.**|Jelaskan interpretasi bisnis dari nilai $b_1 = 1.45$ yang Anda temukan. (Nilai 5)|"Setiap 1 tahun penambahan pengalaman kerja diprediksi akan **menaikkan gaji sebesar 1.45 Juta Rupiah**."|
> 
> **Tabel untuk Soal c (Kunci Jawaban):**
> 
> |   |   |   |   |   |   |
> |---|---|---|---|---|---|
> |**xi​**|**yi​**|**(xi​−xˉ)**|**(yi​−yˉ​)**|**(xi​−xˉ)(yi​−yˉ​)**|**(xi​−xˉ)2**|
> |2|7|-4|-5|20|16|
> |4|8|-2|-4|8|4|
> |6|12|0|0|0|0|
> |8|13|2|1|2|4|
> |10|20|4|8|32|16|
> |**Total**||||$\sum = \mathbf{58}$|$\sum = \mathbf{40}$|