_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set Ujian: Model Regresi Linear dan Logistik

Mata Pelajaran: IF3170 Intelegensi Artifisial

Estimasi Waktu: 120 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Membedakan secara analitis kasus penggunaan, asumsi, dan formulasi matematis antara Regresi Linear dan Regresi Logistik.
    
2. Menerapkan metode _Least Square Estimator_ (LSE) secara komputasi untuk menurunkan parameter model Regresi Linear.
    
3. Mengevaluasi performa model Regresi Linear menggunakan metrik MAE, SSE, dan R2-Score.
    
4. Menganalisis secara kritis keterbatasan LSE dan keunggulan _Maximum Likelihood Estimator_ (MLE) untuk masalah klasifikasi.
    
5. Menjelaskan alur konseptual Regresi Logistik, dari _Logit_ (Log-Odds) hingga fungsi _Sigmoid_ dan _Log Conditional Likelihood_ (LCL).
    
6. Menerapkan algoritma _Stochastic Gradient Ascent_ (SGA) secara komputasi untuk melatih model Regresi Logistik selama satu _epoch_.
    
7. Mensintesis dan membandingkan hasil prediksi dari model Linear vs Logistik pada dataset klasifikasi biner.
    

## Petunjuk Umum

- Baca setiap soal dengan sangat teliti.
    
- Jawaban yang tidak disertai justifikasi atau langkah perhitungan (jika diminta) tidak akan mendapat poin penuh.
    
- Dilarang menggunakan _library_ `sklearn` atau sejenisnya; semua perhitungan LSE dan SGA harus dilakukan secara manual.
    
- Semua soal disajikan terlebih dahulu. Kunci Jawaban dan Rubrik Penilaian terdapat di bagian akhir dokumen.
    

## BAGIAN I: Konsep Fundamental (20 poin)

**Fokus:** Recall & Comprehension - Menguji pemahaman konsep inti dan perbedaannya.

### Soal 1-10. Klasifikasi Konsep (Format Matrix) (10 poin, @1 poin)

Pasangkan deskripsi di kolom "Isi Soal" dengan konsep yang paling tepat. Pilih **satu** jawaban per baris.

|**No**|**Isi Soal**|**A. Regresi Linear (SLR/MLR)**|**B. Regresi Logistik**|**C. LSE**|**D. MLE**|**E. R2-Score**|**F. Logit**|**G. Sigmoid**|**H. SGA**|
|---|---|---|---|---|---|---|---|---|---|
|1|Tujuan utamanya adalah memprediksi nilai **kontinu** (misal: harga, suhu).|||||||||
|2|Tujuan utamanya adalah memprediksi **probabilitas** kelas biner (0 atau 1).|||||||||
|3|Metode optimasi yang bertujuan **meminimalkan** $\sum (y_i - \hat{y}_i)^2$.|||||||||
|4|Metode optimasi yang bertujuan **memaksimalkan** _Log Conditional Likelihood_ (LCL).|||||||||
|5|Fungsi yang memetakan nilai $z$ (dari $-\infty$ s/d $+\infty$) ke rentang [0, 1].|||||||||
|6|Metrik evaluasi yang mengukur proporsi varians $Y$ yang dijelaskan oleh $X$.|||||||||
|7|Nama lain dari "Log-Odds" ($\log(p/(1-p))$), yang memiliki hubungan linear dengan $X$.|||||||||
|8|Metode optimasi iteratif yang memperbarui bobot berdasarkan gradien satu sampel.|||||||||
|9|Model yang mengasumsikan hubungan $Y = b_0 + b_1 X$.|||||||||
|10|Batas keputusan (hyperplane) didefinisikan oleh $b^T x = 0$, yang ekuivalen dengan $p=0.5$.|||||||||

### Soal 11-20. Analisis Konsep (Format Benar/Salah) (10 poin, @1 poin)

Tentukan apakah pernyataan berikut **Benar** atau **Salah**.

|**No**|**Pernyataan**|**Benar**|**Salah**|
|---|---|---|---|
|11|Dalam Regresi Linear, $b_1 = \frac{\text{Cov}(X, Y)}{\text{Var}(X)}$.|||
|12|Dalam Regresi Linear, $b_0 = \overline{y} - b_1 \overline{x}$.|||
|13|_Mean Squared Error_ (MSE) lebih robust terhadap _outlier_ daripada _Mean Absolute Error_ (MAE).|||
|14|Menggunakan Regresi Linear untuk klasifikasi biner (0/1) adalah valid karena outputnya pasti antara 0 dan 1.|||
|15|Regresi Logistik mengasumsikan hubungan linear antara fitur $X$ dan probabilitas $p$.|||
|16|Rentang nilai dari "Odds" ($p/(1-p)$) adalah dari $-\infty$ s/d $+\infty$.|||
|17|Rentang nilai dari "Logit" ($\log(p/(1-p))$) adalah dari $-\infty$ s/d $+\infty$.|||
|18|Dalam aturan update SGA, $(y_i - p_i)$ adalah _error term_ yang menggerakkan pembaruan bobot.|||
|19|_Learning rate_ ($\eta$) yang sangat besar selalu mempercepat konvergensi dan direkomendasikan.|||
|20|Satu "Epoch" dalam pelatihan SGA berarti model telah memproses _seluruh_ data latih satu kali.|||

## BAGIAN II: Aplikasi & Analisis (40 poin)

**Fokus:** Application & Analysis - Perhitungan LSE dan analisis komparatif metode.

### Soal 21-28. Studi Kasus 1: Regresi Linear & LSE (24 poin)

Anda ditugaskan memodelkan Nilai Ujian (Y) berdasarkan Jam Belajar (X).

Data Latih (N=4):

- (X=1, Y=60)
    
- (X=2, Y=70)
    
- (X=4, Y=75)
    
- (X=5, Y=95)
    

**A. Pelatihan Model (LSE "From Scratch")**

21. (4 poin) Hitung nilai rata-rata $\overline{x}$ dan $\overline{y}$ dari data latih.
        
22. (4 poin) Hitung $\sum (x_i - \overline{x})(y_i - \overline{y})$ (Numerator $b_1$) dan $\sum (x_i - \overline{x})^2$ (Denominator $b_1$).
        
23. (4 poin) Hitung _slope_ ($b_1$) dan _intercept_ ($b_0$).
        
24. (2 poin) Tuliskan hipotesis (persamaan) final $h(x)$ Anda.
        

**B. Evaluasi Model**

Gunakan model $h(x)$ Anda dari (24) untuk dievaluasi pada Data Uji (N=2) berikut:

- (X=3, Y_aktual=80)
    
- (X=6, Y_aktual=90)
    
- Data Tambahan: Rata-rata $Y$ aktual dari data uji adalah $\overline{y}_{test} = 85$.
    

25. (4 poin) Hitung nilai prediksi $\hat{y}$ untuk _setiap_ data uji.
        
26. (2 poin) Hitung _Mean Absolute Error_ (MAE) pada data uji.
        
27. (2 poin) Hitung _Sum of Squared Errors_ (SSE) pada data uji.
        
28. (2 poin) Diberikan $SST = \sum (y_i - \overline{y}_{test})^2 = 50$, hitung R2-Score model Anda.
        

### Soal 29-31. Uraian Analitis (16 poin)

29. (5 poin) Jelaskan secara kritis minimal **dua** alasan utama mengapa menggunakan Regresi Linear (LSE) untuk masalah klasifikasi biner (target 0/1) adalah pendekatan yang buruk dan tidak dianjurkan.
        
30. (6 poin) Bandingkan LSE vs MLE. Jelaskan **mengapa** LSE adalah fungsi biaya yang cocok untuk Regresi Linear, tetapi **mengapa** MLE (dengan _Log Conditional Likelihood_) diperlukan untuk Regresi Logistik. (Hint: Bahas asumsi $Y$ dan bentuk _cost function_).
        
31. (5 poin) Jelaskan formula _Log Conditional Likelihood_ (LCL) untuk klasifikasi biner. Mengapa kita menggunakan **Logaritma**? Dan mengapa formulanya memiliki dua bagian (satu untuk $y_i=1$ dan satu untuk $y_i=0$)?
        

## BAGIAN III: Sintesis & Evaluasi (40 poin)

**Fokus:** Synthesis & Evaluation - Perbandingan komputasi LSE vs. SGA (MLE).

### Soal 32-42. Studi Kasus 2: Klasifikasi (LSE vs. SGA) (40 poin)

Anda ingin memprediksi Lulus (1=Ya, 0=Tidak) berdasarkan Skor (X).

Data Latih (N=4):

- Sampel 1: (X=40, Y=0)
    
- Sampel 2: (X=50, Y=0)
    
- Sampel 3: (X=70, Y=1)
    
- Sampel 4: (X=80, Y=1)
    

**Data Uji:** (X=60)

**A. Pendekatan Naif: Regresi Linear (LSE)**

32. (8 poin) Terapkan metode LSE "From Scratch" (seperti di Soal 21-23) pada 4 data latih di atas untuk menemukan $b_1$ dan $b_0$. (Tunjukkan perhitungan $\overline{x}, \overline{y}, \sum(...), b_1, b_0$).
        
33. (2 poin) Tuliskan persamaan linear $h(x)$ yang dihasilkan.
        
34. (2 poin) Gunakan $h(x)$ untuk memprediksi Data Uji (X=60). Berapa nilai $\hat{y}$? (Jangan gunakan threshold).
        

B. Pendekatan Tepat: Regresi Logistik (SGA)

Anda akan melatih model Regresi Logistik $p = 1 / (1 + e^{-b^T x})$ menggunakan SGA selama satu epoch.

- Gunakan $\eta = 0.1$.
    
- Inisialisasi bobot: $b = [b_0, b_1] = [0, 0]$.
    
- Ingat: $x$ menjadi $x = [1, x_1]$ (misal: $[1, 40]$).
    
- Proses data latih secara berurutan (Sampel 1, 2, 3, 4).
    

35. (4 poin) **Proses Sampel 1 (X=40, Y=0):** Hitung $z, p, err = (y - p)$.
        
36. (3 poin) **Update Bobot (setelah S1):** Hitung $b_0$ dan $b_1$ yang baru.
        
37. (4 poin) **Proses Sampel 2 (X=50, Y=0):** (Gunakan $b$ dari S36). Hitung $z, p, err$.
        
38. (3 poin) **Update Bobot (setelah S2):** Hitung $b_0$ dan $b_1$ yang baru.
        
39. (4 poin) **Proses Sampel 3 (X=70, Y=1):** (Gunakan $b$ dari S38). Hitung $z, p, err$.
        
40. (3 poin) **Update Bobot (setelah S3):** Hitung $b_0$ dan $b_1$ yang baru.
        
41. (4 poin) **Proses Sampel 4 (X=80, Y=1):** (Gunakan $b$ dari S40). Hitung $z, p, err$. (Bobot final tidak perlu dihitung).
        

**C. Analisis dan Perbandingan**

42. (3 poin) Bandingkan hasil prediksi Anda untuk X=60: $\hat{y}$ dari Soal 34 (Linear) vs $p$ dari Soal 39 (Logistic, setelah memproses $X=70$). Manakah yang lebih masuk akal sebagai "probabilitas kelulusan" dan mengapa?
        

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I
> 
> **Soal 1-10 (Matrix) (10 poin):**
> 
> 1. **A. Regresi Linear (SLR/MLR)**: Memprediksi nilai kontinu.
>     
> 2. **B. Regresi Logistik**: Memprediksi probabilitas.
>     
> 3. **C. LSE**: Metode minimasi error kuadrat.
>     
> 4. **D. MLE**: Metode maksimasi likelihood (LCL).
>     
> 5. **G. Sigmoid**: Fungsi pemetaan $z$ ke $p$ [0, 1].
>     
> 6. **E. R2-Score**: Metrik proporsi varians.
>     
> 7. **F. Logit**: Nama lain Log-Odds, hubungannya linear $z = b^T x$.
>     
> 8. **H. SGA**: Optimasi iteratif per-sampel.
>     
> 9. **A. Regresi Linear (SLR/MLR)**: $Y = b_0 + b_1 X$ adalah asumsi dasarnya.
>     
> 10. **B. Regresi Logistik**: $b^T x = 0$ adalah _hyperplane_ di mana $z=0$ dan $p=0.5$.
>     
> 
> Soal 11-20 (B/S) (10 poin):
> 
> 11. Benar. $b_1 = \text{Cov}(X,Y) / \text{Var}(X)$.
> 
> 12. Benar. $b_0$ adalah mean $Y$ yang disesuaikan oleh mean $X$ terkali slope.
> 
> 13. Salah. MSE (kuadrat) jauh lebih sensitif terhadap outlier daripada MAE (absolut).
> 
> 14. Salah. Outputnya tidak dijamin [0, 1] dan asumsi LSE dilanggar.
> 
> 15. Salah. Hubungan linearnya adalah antara $X$ dan Log-Odds (Logit), bukan $p$.
> 
> 16. Salah. Rentang Odds adalah [0, $+\infty$).
> 
> 17. Benar. Logaritma dari [0, $+\infty$) adalah [$-\infty, +\infty$).
> 
> 18. Benar.
> 
> 19. Salah. $\eta$ terlalu besar dapat menyebabkan overshooting dan gagal konvergen.
> 
> 20. Benar.
> 
> ### Bagian II
> 
> **Soal 21-28 (Studi Kasus 1: LSE) (24 poin)**
> 
> - 21. (4 poin)
>         
>     
>     - $\overline{x} = (1 + 2 + 4 + 5) / 4 = 12 / 4 = 3.0$  
>         
>     - $\overline{y} = (60 + 70 + 75 + 95) / 4 = 300 / 4 = 75.0$  
>         
> - 22. (4 poin)
>         
>     
>     - $\sum (x_i - \overline{x})(y_i - \overline{y}) = (1-3)(60-75) + (2-3)(70-75) + (4-3)(75-75) + (5-3)(95-75)$
>         
>         $= (-2)(-15) + (-1)(-5) + (1)(0) + (2)(20) = 30 + 5 + 0 + 40 = 75.0$
>         
>     - $\sum (x_i - \overline{x})^2 = (1-3)^2 + (2-3)^2 + (4-3)^2 + (5-3)^2$
>         
>         $= (-2)^2 + (-1)^2 + (1)^2 + (2)^2 = 4 + 1 + 1 + 4 = 10.0$
>         
> - 23. (4 poin)
>         
>     
>     - $b_1 = 75.0 / 10.0 = 7.5$  
>         
>     - $b_0 = \overline{y} - b_1 \overline{x} = 75.0 - (7.5 * 3.0) = 75.0 - 22.5 = 52.5$  
>         
> - 24. (2 poin) $h(x) = 52.5 + 7.5 x$ (atau `Nilai = 52.5 + 7.5 * Jam Belajar`)
>         
> - 25. (4 poin)
>         
>     
>     - $\hat{y}$ (X=3): $52.5 + 7.5(3) = 52.5 + 22.5 = 75.0$  
>         
>     - $\hat{y}$ (X=6): $52.5 + 7.5(6) = 52.5 + 45.0 = 97.5$  
>         
> - 26. (2 poin)
>         
>     
>     - $e_1 = 80 - 75.0 = 5.0$  
>         
>     - $e_2 = 90 - 97.5 = -7.5$  
>         
>     - $MAE = (|5.0| + |-7.5|) / 2 = (5.0 + 7.5) / 2 = 12.5 / 2 = 6.25$  
>         
> - 27. (2 poin)
>         
>     
>     - $SSE = (5.0)^2 + (-7.5)^2 = 25.0 + 56.25 = 81.25$  
>         
> - 28. (2 poin) $R2 = 1 - (SSE / SST) = 1 - (81.25 / 50) = 1 - 1.625 = -0.625$
>         
>         (Rubrik: Nilai R2 negatif menunjukkan model performanya lebih buruk daripada hanya menebak nilai rata-rata $\overline{y}_{test}$)
>         
> 
> **Soal 29-31 (Uraian Analitis) (16 poin)**
> 
> - 29. (5 poin) **Rubrik:**
>         
> 		1. **Output Tidak Terbatas:** Output $\hat{y}$ dari Regresi Linear adalah $[-\infty, +\infty]$, bukan [0, 1] yang dibutuhkan untuk probabilitas. Prediksi bisa $\hat{y}=1.5$ atau $\hat{y}=-0.2$, yang tidak bermakna.
> 				
> 		2. **Pelanggaran Asumsi LSE:** LSE mengasumsikan $Y$ terdistribusi normal (Homoscedasticity). $Y$ dalam klasifikasi biner terdistribusi Bernoulli, bukan Normal.
> 				
> 		3. _(Bonus)_ **Sensitivitas Outlier:** Outlier (data X yang jauh) dapat sangat menggeser garis regresi (hyperplane) dan mengubah klasifikasi data lain secara drastis.
>         
> - 30. (6 poin) **Rubrik:**
>         
> 		1. **LSE (Linear):** Cocok karena LSE meminimalkan error _kuadrat_. Asumsi Regresi Linear adalah error terdistribusi normal. Meminimalkan SSE secara analitis (solusi $\text{Cov}/\text{Var}$) setara dengan MLE jika error-nya Normal. Fungsi biayanya ($J(\theta) = SSE$) berbentuk _convex_ (parabola).
> 				
> 		2. **MLE (Logistic):** Dibutuhkan karena $Y$ adalah Bernoulli (0/1). Kita tidak bisa meminimalkan error $y-p$ secara langsung.
> 				
> 		3. **Mengapa LSE Gagal di Logistik:** Jika kita paksakan LSE ($J = \sum (y - p)^2 = \sum (y - \frac{1}{1+e^{-b^T x}})^2$), fungsi biayanya menjadi _non-convex_ (bergelombang, banyak _local minima_).
> 				
> 		4. **Solusi MLE:** MLE memaksimalkan _likelihood_ (LCL) $\prod p^y (1-p)^{1-y}$. Menggunakan Log (LCL) mengubahnya menjadi fungsi yang _concave_ (atau _negative_ LCL yang _convex_), sehingga Gradient (Ascent/Descent) dijamin menemukan _global optimum_.
> 	        
> - 31. (5 poin) **Rubrik:**
>         
> 		1. **Mengapa Log?** Likelihood gabungan adalah _perkalian_ probabilitas $\prod L_i$. Perkalian angka kecil (<1) berulang kali menyebabkan _numerical underflow_ (hasilnya 0). Logaritma mengubah perkalian menjadi penjumlahan ($\sum \log L_i$), yang numeriknya stabil.
> 				
> 		2. **Mengapa Dua Bagian?** Ini adalah trik aljabar untuk fungsi Bernoulli.
> 				
> 				- Jika $y_i=1$, formula LCL menjadi $\log(p_i)$ (karena $\log(1-p_i)$ dikali 0). Kita ingin memaksimalkan $p_i$.
> 						
> 				- Jika $y_i=0$, formula LCL menjadi $\log(1-p_i)$ (karena $\log(p_i)$ dikali 0). Kita ingin memaksimalkan $(1-p_i)$ (probabilitas gagal).
> 						
> 				- Dalam kedua kasus, kita memaksimalkan probabilitas dari hasil yang _sebenarnya_ terjadi (ground truth).
> 						
> 
> ### Bagian III
> 
> **Soal 32-42 (Studi Kasus 2: LSE vs. SGA) (40 poin)**
> 
> **A. Pendekatan Naif: Regresi Linear (LSE)**
> 
> - 32. (8 poin) Data: (40,0), (50,0), (70,1), (80,1)
>         
>     
>     - $\overline{x} = (40+50+70+80) / 4 = 240 / 4 = 60.0$  
>         
>     - $\overline{y} = (0+0+1+1) / 4 = 2 / 4 = 0.5$  
>         
>     - $\sum (x_i - \overline{x})(y_i - \overline{y}) = (40-60)(0-0.5) + (50-60)(0-0.5) + (70-60)(1-0.5) + (80-60)(1-0.5)$
>         
>         $= (-20)(-0.5) + (-10)(-0.5) + (10)(0.5) + (20)(0.5) = 10 + 5 + 5 + 10 = 30.0$
>         
>     - $\sum (x_i - \overline{x})^2 = (40-60)^2 + (50-60)^2 + (70-60)^2 + (80-60)^2$
>         
>         $= (-20)^2 + (-10)^2 + (10)^2 + (20)^2 = 400 + 100 + 100 + 400 = 1000.0$
>         
>     - $b_1 = 30.0 / 1000.0 = 0.03$  
>         
>     - $b_0 = \overline{y} - b_1 \overline{x} = 0.5 - (0.03 * 60.0) = 0.5 - 1.8 = -1.3$  
>         
> - 33. (2 poin) $h(x) = -1.3 + 0.03 x$  
>         
> - 34. (2 poin) $\hat{y} (X=60) = -1.3 + 0.03(60) = -1.3 + 1.8 = 0.5$  
>         
> 
> **B. Pendekatan Tepat: Regresi Logistik (SGA)**
> 
> - 35. (4 poin) **S1 (X=40, Y=0):** $b=[0, 0]$, $\eta=0.1$  
>         
>     
>     - $z = b^T x = (0*1) + (0*40) = 0$  
>         
>     - $p = 1 / (1 + e^{-0}) = 0.5$  
>         
>     - $err = (y - p) = 0 - 0.5 = -0.5$  
>         
> - 36. (3 poin) **Update S1:**
>         
>     
>     - $b_0 = b_0 + \eta(err)x_0 = 0 + 0.1(-0.5)(1) = -0.05$  
>         
>     - $b_1 = b_1 + \eta(err)x_1 = 0 + 0.1(-0.5)(40) = -2.0$  
>         
>     - $b_{new} = [-0.05, -2.0]$  
>         
> - 37. (4 poin) **S2 (X=50, Y=0):** $b=[-0.05, -2.0]$  
>         
>     
>     - $z = b^T x = (-0.05*1) + (-2.0*50) = -0.05 - 100 = -100.05$  
>         
>     - $p = 1 / (1 + e^{-(-100.05)}) = 1 / (1 + e^{100.05}) \approx 0.0$ (Sangat kecil)
>         
>     - $err = (y - p) = 0 - 0 = 0$  
>         
> - 38. (3 poin) **Update S2:** (Error $\approx 0$, update $\approx 0$)
>         
>     
>     - $b_0 = -0.05 + 0.1(0)(1) = -0.05$  
>         
>     - $b_1 = -2.0 + 0.1(0)(50) = -2.0$  
>         
>     - $b_{new} = [-0.05, -2.0]$  
>         
> - 39. (4 poin) **S3 (X=70, Y=1):** $b=[-0.05, -2.0]$  
>         
>     
>     - $z = b^T x = (-0.05*1) + (-2.0*70) = -0.05 - 140 = -140.05$  
>         
>     - $p = 1 / (1 + e^{-(-140.05)}) = 1 / (1 + e^{140.05}) \approx 0.0$ (Sangat kecil)
>         
>     - $err = (y - p) = 1 - 0 = 1.0$  
>         
> - 40. (3 poin) **Update S3:**
>         
>     
>     - $b_0 = -0.05 + 0.1(1.0)(1) = 0.05$  
>         
>     - $b_1 = -2.0 + 0.1(1.0)(70) = -2.0 + 7.0 = 5.0$  
>         
>     - $b_{new} = [0.05, 5.0]$  
>         
> - 41. (4 poin) **S4 (X=80, Y=1):** $b=[0.05, 5.0]$  
>         
>     
>     - $z = b^T x = (0.05*1) + (5.0*80) = 0.05 + 400 = 400.05$  
>         
>     - $p = 1 / (1 + e^{-400.05}) \approx 1.0$  
>         
>     - $err = (y - p) = 1 - 1.0 = 0.0$  
>         
> 
> **C. Analisis dan Perbandingan**
> 
> - 42. (3 poin) **Rubrik:**
>         
> 	    1. **Hasil Linear (Soal 34):** $\hat{y} = 0.5$.
> 	        
> 	    2. **Hasil Logistic (Soal 39):** $p \approx 0.0$.
> 	        
> 	    3. **Analisis:** Hasil $\hat{y}=0.5$ dari LSE (Soal 34) adalah _ambigu_ (tepat di threshold) dan _salah_ (setelah melihat data X=70 dan X=80, X=60 harusnya _lebih dekat_ ke 0). Hasil $p \approx 0.0$ dari SGA (Soal 39) jauh lebih masuk akal; model logistik (setelah melihat S3) belajar bahwa $X=70$ adalah 1, sehingga $X=60$ (yang _jauh_ dari 70) harusnya memiliki probabilitas 1 yang sangat rendah.
> 	        
> 	    4. **Kesimpulan:** Model Logistik (SGA) menghasilkan prediksi $p \approx 0.0$ (setelah S3) yang jauh lebih intuitif dan bermakna sebagai "probabilitas" (sangat rendah) dibandingkan $\hat{y}=0.5$ dari Regresi Linear.