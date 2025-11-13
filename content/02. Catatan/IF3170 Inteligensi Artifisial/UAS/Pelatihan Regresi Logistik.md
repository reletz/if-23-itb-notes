---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Pelatihan Regresi Logistik: MLE & Stochastic Gradient Ascent (SGA)
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan dari "pelatihan" model?
> >     
> > - Apa yang dicari saat pelatihan? (Bobot $b$)
> >     
> > - Apa perbedaan LSE vs MLE?
> >     
> > - Apa itu Maximum Likelihood Estimator (MLE)?
> >     
> > - Apa tujuan MLE?
> >     
> > - Apa itu LCL (Log Conditional Likelihood)?
> >     
> > - Kenapa menggunakan _log_ likelihood?
> >     
> > - Bagaimana cara memaksimalkan LCL?
> >     
> > - Apa itu Gradient Ascent?
> >     
> > - Kenapa "Ascent" bukan "Descent"?
> >     
> > - Apa itu Stochastic Gradient Ascent (SGA)?
> >     
> > - Apa itu $\eta$ (learning rate)?
> >     
> > - Apa formula update bobot SGA?
> >     
> > - Apa algoritma SGA?
> >     
> > - Apa itu "epoch"?
> >     
> >
> > ## Reference Points
> > 
> > - IF3170 - 12 - Log-Regression (Slide 13-19)
> >     
> > - Elkan, C. (2014). Maximum Likelihood, Logistic Regression, and Stochastic Gradient Training.
> >     
> 
> > ### 1. Model Regresi Logistik (Review)
> > 
> > Model Regresi Logistik adalah sebuah diagram yang mengubah input fitur $x$ menjadi prediksi kelas.
> > 
> > 1. **Input:** Vektor fitur $x = (1, x_1, ..., x_d)$. (Input $x_0=1$ selalu ditambahkan untuk bobot $b_0$ atau _bias_).
> >     
> > 2. **Parameter (Model):** Vektor bobot $b = (b_0, b_1, ..., b_d)$. Ini adalah nilai-nilai yang ingin kita "pelajari".
> >     
> > 3. **Kombinasi Linear:** Input dan bobot dikalikan dan dijumlahkan: $\Sigma = b^T x$.
> >     
> > 4. **Fungsi Logistik:** Hasil $\Sigma$ dimasukkan ke fungsi sigmoid untuk mendapatkan probabilitas $p$.
> >     
> >     - $p = P(y=1|x,b) = \frac{1}{1+e^{-b^{T}x}}$.
> >         
> > 5. **Output (Kelas):** $p$ dibandingkan dengan _threshold_ (misal 0.5) untuk menghasilkan kelas (0 atau 1).
> >     
> > 
> > ### 2. Estimasi Parameter: Maximum Likelihood (MLE)
> > 
> > **Pertanyaan:** Bagaimana kita menemukan nilai $b$ terbaik?
> > 
> > - Pada Regresi Linear, kita menggunakan **LSE** (meminimalkan error kuadrat).
> >     
> > - Pada Regresi Logistik, kita menggunakan **Maximum Likelihood Estimator (MLE)**.
> >     
> > 
> > Prinsip MLE:
> > 
> > Tujuannya adalah menemukan parameter $b$ yang memaksimalkan probabilitas gabungan (likelihood) dari data training yang kita observasi. Dengan kata lain: "Dari semua kemungkinan $b$, $b$ mana yang membuat data training yang kita miliki paling mungkin terjadi?"
> > 
> > - Kita ingin memaksimalkan **Log Conditional Likelihood (LCL)**, yang merupakan jumlah dari _log-likelihood_ setiap contoh training.
> >     
> > - Formula LCL:
> >     
> >     - $LCL = \sum_{i=1}^{n} \log L(\theta; y_i | x_i)$
> >     
> >     - $LCL = \sum_{i=1; y_i=1}^{n} \log p_i + \sum_{i=1; y_i=0}^{n} \log(1 - p_i)$
> >     
> >     (Di mana $p_i$ adalah probabilitas prediksi $P(y=1)$ untuk contoh $x_i$)
> >     
> > - Kita menggunakan _log_ karena mengubah perkalian probabilitas (yang sangat kecil) menjadi penjumlahan, yang lebih mudah dioptimasi secara numerik dan tidak _underflow_.
> >     
> > 
> > ### 3. Optimasi: Stochastic Gradient Ascent (SGA)
> > 
> > Tidak ada solusi analitis (rumus langsung) untuk memaksimalkan LCL. Kita harus menggunakan metode optimasi iteratif.
> > 
> > - **Gradient Ascent:** Metode untuk mencari _puncak_ (maksimum) dari sebuah fungsi. (Berbeda dengan _Gradient Descent_ yang mencari _lembah_/minimum). Karena tujuan kita adalah _memaksimalkan_ LCL, kita "mendaki" (ascend) gradiennya.
> >     
> > - **Stochastic (Acak):** Alih-alih menghitung gradien (turunan) dari LCL berdasarkan _seluruh_ dataset (yang mahal), kita menghitungnya berdasarkan **satu contoh acak** pada satu waktu. Ini jauh lebih cepat dan seringkali bisa lolos dari _local maxima_ yang buruk.
> >     
> > 
> > **Algoritma SGA:**
> > 
> > 1. Inisialisasi bobot $b$ (misal: semua 0).
> >     
> > 2. Loop untuk $T$ iterasi (disebut **epochs**). Satu epoch adalah satu kali melewati seluruh dataset.
> >     
> > 3. Di dalam setiap epoch, acak urutan data.
> >     
> > 4. Untuk setiap contoh $\langle x_i, y_i \rangle$ dalam data:
> >     
> >     a. Hitung prediksi probabilitas $p_i = \frac{1}{1 + e^{-b^T x_i}}$ menggunakan $b$ saat ini.
> >     
> >     b. Hitung "error": $(y_i - p_i)$ (nilai target asli - nilai prediksi).
> >     
> >     c. Perbarui setiap bobot $b_j$ sesuai aturan update.
> >     
> > 5. Kembalikan $b$.
> >     
> > 
> > **Aturan Update SGA:**
> > 
> > Turunan LCL terhadap satu bobot $b_j$ adalah $\frac{\partial LCL}{\partial b_j} = \sum_{i}(y_i - p_i)x_{ij}$.
> > 
> > Aturan update _stochastic_ (untuk satu contoh $i$) adalah:
> > 
> > $$b_j = b_j + \eta (y_i - p_i) x_{ij}$$
> > 
> > - $b_j$: Bobot untuk fitur ke-j (yang sedang di-update).
> >     
> > - $\eta$ (**learning rate**): Seberapa besar langkah yang kita ambil (misal: 0.1).
> >     
> > - $(y_i - p_i)$: Error. Jika prediksi benar ($p_i \approx y_i$), error kecil, update kecil.
> >     
> > - $x_{ij}$: Nilai fitur ke-j dari contoh $i$.

> [!cornell] #### Summary
> 
> Pelatihan model Regresi Logistik bertujuan menemukan vektor bobot $b$ terbaik dengan menggunakan **Maximum Likelihood Estimator (MLE)**, bukan LSE. Tujuannya adalah untuk **memaksimalkan Log Conditional Likelihood (LCL)**, yaitu probabilitas (log) gabungan dari data training yang diamati. Karena tidak ada solusi analitis, ini diselesaikan secara iteratif menggunakan **Stochastic Gradient Ascent (SGA)**, sebuah metode optimasi yang memperbarui bobot $b$ selangkah demi selangkah untuk setiap contoh data $\langle x_i, y_i \rangle$, "naik" menuju nilai LCL yang maksimum menggunakan aturan update $b_j = b_j + \eta (y_i - p_i) x_{ij}$.

> [!ad-libitum]- Additional Information (Technical Deep Dive)
> 
> #### Contoh Perhitungan SGA (1 Epoch) (Slide 16)
> 
> - Data $D = \{ \langle[52,41], 0\rangle, \langle[62,58], 1\rangle \}$  
>     
> - $T=1$ (1 epoch), $\eta=0.1$ (learning rate)
>     
> - Input $x$ ditambahi $x_0=1$, misal: $\langle x_i=[1, 52, 41], y_i=0 \rangle$ dan $\langle x_i=[1, 62, 58], y_i=1 \rangle$  
>     
> 
> **1. Inisialisasi:** $b = [b_0, b_1, b_2] = [0, 0, 0]$  
> 
> **2. Mulai** $t=1$**:**
> 
> **Contoh A (dipilih acak):** $\langle x_i=[1, 62, 58], y_i=1 \rangle$  
> 
> - Hitung $\Sigma = b^T x = (0 \times 1) + (0 \times 62) + (0 \times 58) = 0$  
>     
> - Hitung $p_i = \frac{1}{1 + e^{-\Sigma}} = \frac{1}{1 + e^{-0}} = 0.5$  
>     
> - Hitung error: $(y_i - p_i) = (1 - 0.5) = 0.5$  
>     
> - **Update bobot:** $b_j = b_j + \eta \times (error) \times x_{ij}$  
>     
>     - $b_0 = 0 + 0.1 \times (0.5) \times 1 = 0.05$  
>         
>     - $b_1 = 0 + 0.1 \times (0.5) \times 62 = 3.1$  
>         
>     - $b_2 = 0 + 0.1 \times (0.5) \times 58 = 2.9$  
>         
> - Bobot $b$ sekarang: $[0.05, 3.1, 2.9]$  
>     
> 
> **Contoh B:** $\langle x_i=[1, 52, 41], y_i=0 \rangle$  
> 
> - Hitung $\Sigma = b^T x = (0.05 \times 1) + (3.1 \times 52) + (2.9 \times 41)$  
>     
> - $\Sigma = 0.05 + 161.2 + 118.9 = 280.15$  
>     
> - Hitung $p_i = \frac{1}{1 + e^{-280.15}} \approx 1.0$ (karena $e^{-280.15}$ sangat kecil)
>     
> - Hitung error: $(y_i - p_i) = (0 - 1.0) = -1.0$  
>     
> - **Update bobot:**
>     
>     - $b_0 = 0.05 + 0.1 \times (-1.0) \times 1 = -0.05$  
>         
>     - $b_1 = 3.1 + 0.1 \times (-1.0) \times 52 = 3.1 - 5.2 = -2.1$  
>         
>     - $b_2 = 2.9 + 0.1 \times (-1.0) \times 41 = 2.9 - 4.1 = -1.2$  
>         
> 
> **3. Selesai Epoch 1.**
> 
> - Model $b$ final: $[-0.05, -2.1, -1.2]$  
>     
> 
> #### Prediksi (Setelah 1 Epoch) (Slide 17)
> 
> - **Untuk x1=[52,41] (target 0):** $\Sigma = -0.05 - 2.1*52 - 1.2*41 = -158.45$. $p \approx 1.53 \times 10^{-69}$. Prediksi $\rightarrow$ **kelas 0**. (BENAR)
>     
> - **Untuk x2=[62,58] (target 1):** $\Sigma = -0.05 - 2.1*62 - 1.2*58 = -199.85$. $p \approx 1.61 \times 10^{-87}$. Prediksi $\rightarrow$ **kelas 0**. (SALAH)
>     
> - Akurasi Training: 1/2 = 50%. (Model ini masih sangat buruk, perlu lebih banyak epoch untuk _konvergen_).
>     