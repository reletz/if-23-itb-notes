---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Regresi Logistik (Konsep, Klasifikasi, dan Logit)
> 
> > ## Questions/Cues
> >
> > - Apa masalah regresi linear untuk klasifikasi?
> >     
> > - Bagaimana cara menggunakan Regresi Linear untuk klasifikasi?
> >     
> > - Apa itu Linear Classifier?
> >     
> > - Apa itu Linear Discriminant Function?
> >     
> > - Apa itu $g(x)$?
> >     
> > - Apa itu Aturan Keputusan (Decision Rule)?
> >     
> > - Apa itu Decision Surface?
> >     
> > - Apa itu Hyperplane?
> >     
> > - Apa perbedaan utama Regresi Linear vs Logistik?
> >     
> > - Apa itu Fungsi Logistik (Sigmoid)?
> >     
> > - Kenapa output-nya antara 0 dan 1?
> >     
> > - Apa itu "Odds"?
> >     
> > - Apa itu "Log Odds" (Logit)?
> >     
> > - Apa hubungan Log Odds dengan Regresi Linear?
> >     
> > - Bagaimana menginterpretasi koefisien Regresi Logistik?
> >     
> >
> > ## Reference Points
> >
> > - IF3170 - 12 - Log-Regression (Slide 1-12)
> >     
> > - Walpole, R. E., et al. (2012)
> >     
> > - Duda, R. O., et al. (2001)
> >     
> 
> > ### 1. Masalah: Regresi Linear untuk Klasifikasi
> >
> > **Masalah:** Regresi Linear memprediksi nilai kontinu (misal: 1.5, -0.4, 100.2), sedangkan klasifikasi memprediksi kategori diskrit (misal: 0 atau 1, "Yes" atau "No").
> >
> > **Solusi Sederhana (Flawed):** Kita bisa menggunakan Regresi Linear + **Threshold** (nilai ambang batas).
> >
> > - **Contoh:** Untuk memprediksi apakah siswa masuk "honors class" (1) atau tidak (0).
> >     
> > - Kita buat model linear: $y\_hat = 0.03x - 1.33$.
> >     
> > - Kita tetapkan _threshold_ 0.5.
> >     
> > - **Aturan:** JIKA $y\_hat > 0.5$, prediksi "honors class" (1), JIKA TIDAK, prediksi "not honors" (0).
> >     
> > - Model ini disebut **Linear Classifier** atau **Linear Discriminant Function**.
> >     
> >
> > ### 2. Linear Discriminant Function & Hyperplane
> >
> > Ini adalah fungsi yang mengkombinasikan input $x$ secara linear untuk membuat keputusan.
> >
> > - Formula: $g(x) = w_0 x_0 + w_1 x_1 + ... + w_d x_d = w^T x$.
> >     
> >     (dimana $x_0=1$ dan $w_0$ adalah bias atau intercept)
> >     
> >
> > - **Aturan Keputusan (Decision Rule):**
> >     
> >   * Putuskan kelas $\omega_1$ (misal: 1) jika $g(x) > 0$.
> >   * Putuskan kelas $\omega_2$ (misal: 0) jika $g(x) < 0$.
> > 
> >
> > - **Decision Surface (Permukaan Keputusan):**
> >     
> >   * Ini adalah batas di mana model "bingung".
> >   * Batas ini didefinisikan oleh persamaan $g(x) = 0$.
> >   * Dalam ruang 2D, ini adalah sebuah **garis**.
> >   * Dalam ruang 3D atau lebih, ini disebut **Hyperplane**.
> >   * Hyperplane ini memisahkan ruang fitur menjadi dua wilayah (misal $\mathcal{R}_1$ di mana $g(x)>0$ dan $\mathcal{R}_2$ di mana $g(x)<0$).
> > 
> >
> > ### 3. Solusi: Regresi Logistik
> >
> > Regresi Linear + Threshold memiliki masalah (misal: sensitif terhadap _outlier_, outputnya bukan probabilitas). Regresi Logistik adalah pendekatan yang lebih baik untuk klasifikasi.
> >
> > **Perbedaan Utama:**
> >
> > |**Fitur**|**Regresi Linear**|**Regresi Logistik**|
> > |---|---|---|
> > |**Tujuan**|Prediksi nilai kontinu|Estimasi **probabilitas** kelas (0 s/d 1)|
> > |**Output**|$y = b_0 + b_1 x$ (Garis lurus)|$p = \frac{1}{1+e^{-(b_{0}+b_{1}x)}}$ (Kurva 'S')|
> > |**Varians Error**|Konstan (Homoscedasticity)|Tidak konstan|
> > |**Estimator**|Least Squares (LSE)|Maximum Likelihood (MLE)|
> >
> > **Fungsi Logistik (Sigmoid):**
> > 
> > Regresi Logistik mengambil output dari model linear ($z = b_0 + b_1 x$) dan memasukkannya ke dalam fungsi logistik (sigmoid).
> >
> > - **Formula:** $p = \frac{1}{1+e^{-z}}$  
> >     
> > - Fungsi ini "memaksa" output apapun (dari $-\infty$ sampai $+\infty$) menjadi nilai antara **0 dan 1**, yang bisa diinterpretasikan sebagai **probabilitas**.
> >     
> > - Jika $p \ge 0.5$, kita prediksi kelas 1. Jika $p < 0.5$, kita prediksi kelas 0.
> >     
> >
> > ### 4. Log Odds (Logit)
> >
> > Bagaimana koefisien ($b$) diinterpretasikan?
> > 
> > Koefisien $b$ tidak memiliki hubungan linear dengan probabilitas $p$, tetapi memiliki hubungan linear dengan Log Odds.
> >
> > 1. **Probability (p):** Peluang sukses, $P(y=1|x,b)$. (Nilai: 0 s/d 1)
> >     
> > 2. **Odds:** Rasio peluang sukses terhadap peluang gagal. (Nilai: 0 s/d $\infty$)
> >     
> >     - $Odds = \frac{p}{1-p}$.
> >         
> >     - Jika $p=0.8$, Odds = 0.8/0.2 = 4 (sukses 4x lipat dari gagal).
> >         
> > 3. **Log Odds (Logit):** Logaritma natural dari Odds. (Nilai: $-\infty$ s/d $+\infty$)
> >     
> >
> > Jika kita membalik formula fungsi logistik, kita mendapatkan:
> >
> > $$\hat{y} = \log(\frac{p}{1-p}) = b_0 + b_1 x_1 + ... + b_d x_d = b^T x$$
> >
> > **Interpretasi Emas:**
> >
> > - Regresi Logistik adalah **model linear untuk** _**Log Odds**_.
> >     
> > - Koefisien $b_1 = 0.08$ (pada contoh "write score") berarti: setiap kenaikan 1 poin pada "write score" akan **meningkatkan** _**log-odds**_ **untuk masuk "honors class" sebesar 0.08**.

> [!cornell] #### Summary
> 
> **Regresi Logistik adalah sebuah model linear untuk klasifikasi biner, mengatasi kelemahan Regresi Linear + Threshold. Model ini memprediksi probabilitas (antara 0 dan 1) dengan cara memasukkan output dari fungsi diskriminan linear (**$z = b^T x$**) ke dalam fungsi logistik (sigmoid). Model ini secara fundamental memodelkan log-odds (**$log(\frac{p}{1-p})$**) sebagai kombinasi linear dari fitur-fitur input. Batas keputusan (**$g(x)=0$**) yang memisahkan kelas-kelas ini disebut sebagai hyperplane.**

> [!ad-libitum]- Additional Information (Technical Deep Dive)
> 
> #### Latihan: Prediksi `write score = 65` (Slide 11)
> 
> Diberikan data:
> 
> - Model Linear: $y\_hat = 0.03x - 1.35$  
>     
> - Model Logistik: $\text{log-odds} = 0.07x - 4.85$  
>     
> - Threshold: 0.5
>     
> 
> **1. Prediksi dengan Regresi Linear:**
> 
> - $y\_hat = 0.03 \times (65) - 1.35$  
>     
> - $y\_hat = 1.95 - 1.35 = 0.60$  
>     
> - Karena $0.60 > 0.5$ (threshold), model linear memprediksi **"honors class" (1)**.
>     
> 
> **2. Prediksi dengan Regresi Logistik:**
> 
> - Pertama, hitung _log-odds_ (ini adalah $z$):
>     
>     - $z = 0.07 \times (65) - 4.85$  
>         
>     - $z = 4.55 - 4.85 = -0.30$  
>         
> - Kedua, ubah $z$ kembali menjadi probabilitas ($p$) menggunakan fungsi sigmoid:
>     
>     - $p = \frac{1}{1 + e^{-z}} = \frac{1}{1 + e^{-(-0.30)}}$  
>         
>     - $p = \frac{1}{1 + e^{0.30}} \approx \frac{1}{1 + 1.3498} \approx \frac{1}{2.3498}$  
>         
>     - $p \approx 0.4255$  
>         
> - Karena probabilitas $p \approx 0.4255 < 0.5$ (threshold), model logistik memprediksi **"not honors class" (0)**.
>     
> 
> **Kesimpulan:** Kedua model memberikan prediksi yang berbeda. Regresi Logistik umumnya lebih dapat diandalkan untuk masalah klasifikasi karena outputnya adalah probabilitas yang terkalibrasi.