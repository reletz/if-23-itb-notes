_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set: Regresi Logistik dan Pelatihan Model

Mata Pelajaran: IF3170 Intelegensi Artifisial

Estimasi Waktu: 90 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Menganalisis secara kritis keterbatasan Regresi Linear untuk masalah klasifikasi.
    
2. Menjelaskan hubungan konseptual antara _Linear Discriminant Function_, _Hyperplane_, _Sigmoid_, _Odds_, dan _Log Odds (Logit)_.
    
3. Menginterpretasikan koefisien ($b_j$) dari model Regresi Logistik dalam konteks _Log Odds_.
    
4. Membandingkan secara mendalam perbedaan fundamental antara _Least Square Estimator_ (LSE) dan _Maximum Likelihood Estimator_ (MLE).
    
5. Menjelaskan tujuan dan derivasi konseptual dari fungsi _Log Conditional Likelihood_ (LCL) untuk klasifikasi biner.
    
6. Menganalisis dan menerapkan algoritma _Stochastic Gradient Ascent_ (SGA), termasuk menurunkan dan mengaplikasikan aturan pembaruan bobotnya ($b_j$).
    
7. Melakukan perhitungan manual untuk prediksi (menggunakan _Logit_) dan satu _epoch_ pelatihan (menggunakan SGA).
    

## Petunjuk Umum

- Problem set ini dirancang untuk menguji pemahaman analitis, bukan hanya hafalan.
    
- Baca setiap soal dengan teliti. Banyak soal saling terkait.
    
- Tuliskan semua langkah perhitungan dan justifikasi Anda dengan jelas untuk soal esai dan studi kasus.
    
- Alokasikan waktu Anda dengan bijak; Bagian II dan III memiliki bobot nilai yang lebih tinggi.
    

## BAGIAN I: Soal Fundamental (30 poin)

**Fokus:** Recall dan Comprehension - Menguji pemahaman konsep inti.

### Soal 1. (1-10) Konsep Inti (Format Benar/Salah) (10 poin, @1 poin)

Tentukan apakah pernyataan berikut **Benar** atau **Salah**.

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|Regresi Linear adalah pilihan yang baik untuk klasifikasi biner karena outputnya selalu antara 0 dan 1.|||
|2|_Linear Discriminant Function_ ($g(x) = w^T x$) adalah model yang sama dengan Regresi Linear.|||
|3|_Decision Surface_ atau _Hyperplane_ dalam Regresi Logistik didefinisikan oleh persamaan $g(x) = 0.5$.|||
|4|Fungsi Sigmoid mengubah output dari _Linear Discriminant Function_ (yang berkisar $-\infty$ s/d $+\infty$) menjadi probabilitas (0 s/d 1).|||
|5|"Odds" ($p/(1-p)$) merepresentasikan rasio probabilitas sukses terhadap probabilitas gagal, dengan rentang nilai [0, 1].|||
|6|"Logit" adalah nama lain untuk _Log Odds_, dan Regresi Logistik pada dasarnya adalah model linear untuk _Logit_.|||
|7|Regresi Logistik menggunakan LSE (Least Square Estimator) untuk menemukan parameternya, sama seperti Regresi Linear.|||
|8|Kita menggunakan _Gradient Ascent_ (bukan _Descent_) karena kita ingin **memaksimalkan** _Log Conditional Likelihood_ (LCL).|||
|9|Satu "Epoch" dalam pelatihan SGA berarti model memperbarui bobotnya menggunakan satu sampel data acak.|||
|10|SGA dijamin lebih cepat konvergen ke optimum global daripada _full-batch_ Gradient Ascent.|||

### Soal 2. (11-15) Klasifikasi Konsep (Format Matrix) (20 poin, @4 poin)

Pasangkan deskripsi di kolom "Isi Soal" dengan konsep yang paling tepat. Pilih **satu** jawaban per baris.

|**No**|**Isi Soal**|**A. Sigmoid $\frac{1}{1+e^{−z}}$​**|**B. Logit $\log(\frac{p}{1−p}​)$**|**C. LCL $∑\log L(...)$**|**D. Aturan Update SGA $b_j​=...+η(y_i​−p_i​)x_{ij}​$**|
|---|---|---|---|---|---|
|11|Mekanisme iteratif untuk memperbarui parameter model berdasarkan error dari satu sampel.|||||
|12|Fungsi yang dioptimalkan (dimaksimalkan) oleh MLE untuk menemukan parameter $b$ terbaik.|||||
|13|Fungsi yang "memaksa" output linear $z=b^T x$ menjadi probabilitas $p$.|||||
|14|Transformasi yang menghubungkan probabilitas $p$ dengan model linear ($b^T x$).|||||
|15|Tujuan dari fungsi ini adalah untuk menemukan $b$ yang membuat data training yang terobservasi menjadi _paling mungkin_ terjadi.|||||

## BAGIAN II: Soal Aplikasi & Analisis (35 poin)

**Fokus:** Application dan Analysis - Menerapkan konsep ke skenario dan analisis teoritis.

### Soal 16. (16-18) Alur Konseptual (Format Isian Terstruktur) (9 poin)

Jelaskan alur kerja Regresi Logistik dengan melengkapi tiga konsep kunci berikut:

- **16. Kombinasi Linear (**$z$**):**
    
    - Persamaan: $z = b^T x = b_0 + b_1 x_1 + ...$  
        
    - Tujuan / Peran: _________________________________________________
        
- **17. Fungsi Sigmoid (**$p$**):**
    
    - Persamaan: $p = 1 / (1 + e^{-z})$  
        
    - Tujuan / Peran: _________________________________________________
        
- **18. Fungsi Logit (Log-Odds):**
    
    - Persamaan: $\log(p / (1-p))$  
        
    - Tujuan / Peran (Mengapa ini penting?): _________________________________________________
        

### Soal 17. (19-22) Studi Kasus: Prediksi Linear vs Logistik (12 poin)

Diberikan dua model untuk memprediksi kelulusan "honors class" (1=Ya, 0=Tidak) berdasarkan `write_score` (x). Threshold keputusan adalah 0.5.

- Model Linear (LSE): $\hat{y} = 0.03x - 1.35$  
    
- Model Logistik (MLE): $\text{log-odds} = 0.07x - 4.85$  
    

Seorang siswa memiliki write_score = 65.

a. (3 poin) Berapakah prediksi $\hat{y}$ dari Model Linear? Apa keputusan kelasnya (0 atau 1)?

b. (3 poin) Berapakah nilai log-odds ($z$) dari Model Logistik?

c. (3 poin) Berdasarkan nilai $z$ dari (b), hitung probabilitas $p$ (Gunakan $e^{0.30} \approx 1.35$ jika perlu).

d. (3 poin) Berapakah keputusan kelas (0 atau 1) dari Model Logistik? Bandingkan hasilnya dengan (a).

### Soal 18. (23) Analisis Metode Estimasi (Format Uraian Analitis) (7 poin)

Regresi Linear menggunakan LSE, sedangkan Regresi Logistik menggunakan MLE. Jelaskan secara mendalam mengapa LSE (meminimalkan SSE) BUKAN pilihan yang tepat untuk melatih model Regresi Logistik.

(Hint: Pikirkan tentang asumsi LSE, bentuk fungsi biaya (cost function) yang dihasilkan, dan sifat dari variabel target Y).

### Soal 19. (24) Analisis Fungsi Objektif (Format Uraian Analitis) (7 poin)

Jelaskan fungsi Log Conditional Likelihood (LCL) untuk klasifikasi biner.

Mengapa kita menggunakan Logaritma (Log)? Dan mengapa formula LCL memiliki dua bagian: $\sum_{y_i=1} \log p_i$ dan $\sum_{y_i=0} \log(1 - p_i)$?

## BAGIAN III: Soal Sintesis & Evaluasi (35 poin)

**Fokus:** Synthesis dan Evaluation - Menganalisis proses pelatihan (SGA).

### Soal 20. (25-29) Dekonstruksi Aturan Update SGA (Format Isian Terstruktur) (10 poin)

Aturan pembaruan bobot untuk Stochastic Gradient Ascent (SGA) adalah:

$b_j = b_j + \eta (y_i - p_i) x_{ij}$

Jelaskan peran dari setiap komponen berikut dalam proses pembelajaran:

- **25.** $\eta$ **(learning rate):** _________________________________________________
    
- **26.** $(y_i - p_i)$ **(error term):** _________________________________________________
    
- **27.** $x_{ij}$ **(nilai fitur):** _________________________________________________
    
- **28. Mengapa operasinya Penjumlahan (+), bukan Pengurangan (-)?** _________________________________________________
    
- **29. Apa arti "Stochastic" dalam konteks aturan update ini?** _________________________________________________
    

### Soal 21. (30-35) Studi Kasus: Pelatihan SGA (Format Step-by-Step Scaffolding) (15 poin)

Anda akan mensimulasikan **satu epoch** pelatihan SGA pada dataset dengan 2 sampel.

- Data $D = \{ \langle x^{(A)}, y^{(A)} \rangle, \langle x^{(B)}, y^{(B)} \rangle \}$  
    
- Sampel A: $x^{(A)} = [62, 58]$ <br> $y^{(A)} = 1$  
    
- Sampel B: $x^{(B)} = [52, 41]$ <br> $y^{(B)} = 0$  
    
- Parameter: $\eta = 0.1$  
    
- (Ingat: tambahkan $x_0=1$ untuk bias. $x^{(A)} \rightarrow [1, 62, 58]$)
    

Ikuti langkah-langkah berikut (data diproses dalam urutan A, lalu B):

| Langkah | Instruksi | Jawaban |
|---|---|---|
| 30. | Inisialisasi bobot $b$ (epoch 0). | $b = [b_0, b_1, b_2] = [0, 0, 0]$ |
| 31. | Proses Sampel A: <br> Hitung $z = b^T x^{(A)}$ <br> Hitung $p^{(A)}$ <br> Hitung error $(y^{(A)} - p^{(A)})$ | $z = ...$ <br> $p^{(A)} = ...$ <br> $err^{(A)} = ...$ |
| 32. | Update Bobot (setelah A):  <br> $b_0 = b_0 + \eta(err^{(A)})x_0^{(A)}$ <br> $b_1 = b_1 + \eta(err^{(A)})x_1^{(A)}$ <br> $b_2 = b_2 + \eta(err^{(A)})x_2^{(A)}$ | $b_0 = ...$ <br> $b_1 = ...$ <br> $b_2 = ...$ <br> $b_{new} = [... , ... , ...]$ |
| 33. | Proses Sampel B (Gunakan $b_{new}$ dari langkah 32): <br> Hitung $z = b_{new}^T x^{(B)}$ <br> Hitung $p^{(B)}$ <br> Hitung error $(y^{(B)} - p^{(B)})$ | $z = ...$ <br> $p^{(B)} = ...$ <br> $err^{(B)} = ...$ |
| 34. | Update Bobot (setelah B): <br> $b_0 = b_0 + \eta(err^{(B)})x_0^{(B)}$ <br> $b_1 = b_1 + \eta(err^{(B)})x_1^{(B)}$ <br> $b_2 = b_2 + \eta(err^{(B)})x_2^{(B)}$ | $b_0 = ...$ <br> $b_1 = ...$ <br> $b_2 = ...$ |
| 35. | Tulis bobot final $b$ setelah 1 epoch. | $b_{final} = [... , ... , ...]$ |

### Soal 22. (36) Analisis Metode Optimasi (Format Uraian Analitis) (5 poin)

Bandingkan _Stochastic Gradient Ascent_ (SGA) dengan _Full-Batch Gradient Ascent_. Mengapa SGA sering lebih disukai dalam praktik meskipun _noise_ (fluktuatif)?

### Soal 23. (37) Interpretasi Koefisien (Format Uraian Analitis) (5 poin)

Misalkan setelah pelatihan penuh, model Anda untuk kelulusan "honors class" (1=Ya, 0=Tidak) memiliki koefisien $b_1 = 0.08$ untuk fitur `write_score`. Berikan interpretasi yang **presisi secara teknis** dari arti nilai $0.08$ ini. (Jangan hanya katakan "jika $x$ naik maka $y$ naik").

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I
> 
> **Soal 1 (B/S) (10 poin):**
> 
> 1. **Salah**. Output Regresi Linear tidak dijamin [0, 1].
>     
> 2. **Salah**. $g(x)$ adalah input untuk Sigmoid. Regresi Linear adalah $\hat{y} = w^T x$. Keduanya linear, tapi tujuannya beda.
>     
> 3. **Salah**. Hyperplane didefinisikan oleh $g(x) = 0$ <br> yang ekuivalen dengan probabilitas $p = 0.5$.
>     
> 4. **Benar**.
>     
> 5. **Salah**. Rentang "Odds" adalah [0, $+\infty$).
>     
> 6. **Benar**.
>     
> 7. **Salah**. Menggunakan MLE.
>     
> 8. **Benar**.
>     
> 9. **Salah**. Satu epoch berarti melewati _seluruh_ dataset, bukan satu sampel.
>     
> 10. **Salah**. SGA tidak dijamin konvergen ke optimum global (bisa terjebak di lokal) dan pergerakannya _noisy_.
>     
> 
> Soal 2 (Matrix) (20 poin):
> 
> 11. D. Aturan Update SGA. Ini adalah mekanisme pembaruan bobot per-sampel.
> 
> 12. C. LCL. Ini adalah fungsi objektif (likelihood) yang dimaksimalkan oleh MLE.
> 
> 13. A. Sigmoid. Ini adalah perannya: mengubah $z$ (skor linear) menjadi $p$ (probabilitas).
> 
> 14. B. Logit. Ini adalah "jembatan" yang memetakan probabilitas $p$ ke model linear $z=b^T x$.
> 
> 15. C. LCL. Ini adalah definisi konseptual dari prinsip Maximum Likelihood.
> 
> ### Bagian II
> 
> **Soal 16 (Isian Terstruktur) (9 poin):**
> 
> - 16. **Tujuan:** Mengagregasi semua fitur input ($x$) dan bobotnya ($b$) menjadi satu skor linear tunggal ($z$).
>         
> - 17. **Tujuan:** Memetakan skor linear ($z$) yang memiliki rentang tak terbatas ($-\infty, +\infty$) ke rentang probabilitas yang valid [0, 1].
>         
> - 18. **Tujuan:** Mentransformasi probabilitas ($p$) yang non-linear kembali ke domain linear ($z$). Ini penting karena membuktikan bahwa Regresi Logistik _adalah_ model linear, tetapi untuk _Log-Odds_, bukan untuk $p$ itu sendiri.
>         
> 
> **Soal 17 (Studi Kasus Prediksi) (12 poin):**
> 
> - a. $\hat{y} = 0.03(65) - 1.35 = 1.95 - 1.35 = 0.60$. Karena $0.60 > 0.5$ <br> **Prediksi = 1 (Honors)**.
>     
> - b. $z = 0.07(65) - 4.85 = 4.55 - 4.85 = -0.30$.
>     
> - c. $p = 1 / (1 + e^{-(-0.30)}) = 1 / (1 + e^{0.30}) \approx 1 / (1 + 1.35) = 1 / 2.35 \approx 0.4255$.
>     
> - d. Karena $p \approx 0.4255 < 0.5$ <br> **Prediksi = 0 (Not Honors)**. Hasilnya berbeda; Regresi Logistik (yang lebih tepat) memprediksi 0 sementara Regresi Linear memprediksi 1.
>     
> 
> **Soal 18 (Uraian LSE vs MLE) (7 poin):**
> 
> - **Poin Kunci:** (1) LSE bertujuan meminimalkan $\sum(y - \hat{y})^2$. (2) Dalam klasifikasi biner, $y$ adalah 0 atau 1. (3) Output $\hat{y}$ dari Regresi Logistik adalah probabilitas $p$ (non-linear). (4) Fungsi biaya LSE ($\sum(y - p)^2$) menjadi _non-convex_ untuk Regresi Logistik, yang berarti optimasi (seperti Gradient Descent) bisa terjebak di _local minima_ yang buruk. (5) MLE, di sisi lain, yang memaksimalkan LCL (berdasarkan asumsi distribusi Bernoulli), menghasilkan fungsi biaya yang _convex_ (specifically, _negative_ LCL-nya convex), sehingga menjamin konvergensi ke _global optimum_.
>     
> 
> **Soal 19 (Uraian LCL) (7 poin):**
> 
> - **Poin Kunci:** (1) **Mengapa Log?** Likelihood gabungan adalah _perkalian_ probabilitas $\prod L_i$. Perkalian angka yang sangat kecil (probabilitas) dapat menyebabkan _numerical underflow_ (hasilnya jadi 0 di komputer). Logaritma mengubah perkalian menjadi penjumlahan ($\sum \log L_i$), yang secara numerik jauh lebih stabil. (2) **Mengapa Dua Bagian?** Ini adalah cara cerdas untuk menulis _likelihood_ Bernoulli dalam satu formula.
>     
>     - Jika $y_i=1$ <br> bagian kedua ($\log(1-p)$) menjadi $\log(1-p)^0=0$ <br> menyisakan $\log p_i$. Kita ingin memaksimalkan $p_i$ (prediksi 1).
>         
>     - Jika $y_i=0$ <br> bagian pertama ($\log p_i$) menjadi $\log p_i^0=0$ <br> menyisakan $\log(1 - p_i)$. Kita ingin memaksimalkan $(1-p_i)$ (prediksi 0).
>         
>     - Keduanya memaksimalkan probabilitas dari _ground truth_ yang benar.
>         
> 
> ### Bagian III
> 
> **Soal 20 (Isian SGA) (10 poin):**
> 
> - 25. $\eta$: Mengontrol seberapa _besar_ langkah yang diambil untuk memperbarui bobot. Jika terlalu besar, bisa _overshoot_; jika terlalu kecil, pelatihan lambat.
>         
> - 26. $(y_i - p_i)$: Ini adalah _error_ atau _residual_ prediksi untuk satu sampel. Ini adalah _sinyal_ yang memberi tahu seberapa salah prediksi ($p_i$) dari target ($y_i$).
>         
> - 27. $x_{ij}$: Menskalakan pembaruan. Fitur dengan nilai $x_{ij}$ besar akan mendapat pembaruan bobot yang lebih besar. Ini menghubungkan error $(y-p)$ kembali ke fitur spesifik yang menyebabkannya.
>         
> - 28. **Penjumlahan (+):** Karena kita melakukan Gradient **Ascent** (mendaki/naik). Kita ingin bergerak _searah_ dengan gradien (turunan positif) untuk _memaksimalkan_ LCL. (Gradient Descent menggunakan Pengurangan untuk meminimalkan).
>         
> - 29. **Stochastic:** Berarti pembaruan ini dihitung menggunakan _gradien_ dari _hanya satu sampel_ ($i$) pada satu waktu, bukan dari seluruh dataset.
>         
> 
> **Soal 21 (Studi Kasus SGA) (15 poin):**
> 
> - 30. $b = [0, 0, 0]$  
>         
> - 31. **Proses A:** $x^{(A)} = [1, 62, 58]$ <br> $y^{(A)} = 1$  
>         
>     
>     - $z = (0*1) + (0*62) + (0*58) = 0$  
>         
>     - $p^{(A)} = 1 / (1 + e^{-0}) = 0.5$  
>         
>     - $err^{(A)} = 1 - 0.5 = 0.5$  
>         
> - 32. **Update A:**
>         
>     
>     - $b_0 = 0 + 0.1(0.5)(1) = 0.05$  
>         
>     - $b_1 = 0 + 0.1(0.5)(62) = 3.1$  
>         
>     - $b_2 = 0 + 0.1(0.5)(58) = 2.9$  
>         
>     - $b_{new} = [0.05, 3.1, 2.9]$  
>         
> - 33. **Proses B:** $x^{(B)} = [1, 52, 41]$ <br> $y^{(B)} = 0$ (Gunakan $b_{new}$)
>         
>     
>     - $z = (0.05*1) + (3.1*52) + (2.9*41) = 0.05 + 161.2 + 118.9 = 280.15$  
>         
>     - $p^{(B)} = 1 / (1 + e^{-280.15}) \approx 1.0$ (karena $e^{-280.15}$ sangat kecil)
>         
>     - $err^{(B)} = 0 - 1.0 = -1.0$  
>         
> - 34. **Update B:**
>         
>     
>     - $b_0 = 0.05 + 0.1(-1.0)(1) = -0.05$  
>         
>     - $b_1 = 3.1 + 0.1(-1.0)(52) = 3.1 - 5.2 = -2.1$  
>         
>     - $b_2 = 2.9 + 0.1(-1.0)(41) = 2.9 - 4.1 = -1.2$  
>         
> - 35. $b_{final} = [-0.05, -2.1, -1.2]$  
>         
> 
> **Soal 22 (Uraian SGA vs Batch) (5 poin):**
> 
> - **Poin Kunci:** (1) _Full-Batch_ menghitung gradien dari _seluruh_ dataset sebelum mengambil satu langkah update. Ini sangat mahal secara komputasi jika dataset besar. (2) SGA menghitung gradien dari _satu_ sampel. Ini jauh lebih cepat per-update dan memungkinkan progres yang cepat. (3) _Noise_ pada SGA (pergerakan yang fluktuatif) sebenarnya bisa menjadi keuntungan, karena memungkinkannya "melompat" keluar dari _local optima_ (minimum/maksimum lokal) yang buruk, yang mungkin menjebak _full-batch_.
>     
> 
> **Soal 23 (Uraian Interpretasi Koefisien) (5 poin):**
> 
> - **Jawaban Presisi:** "Setiap kenaikan 1 poin pada `write_score` (misal, dari 65 ke 66), **log-odds** untuk masuk 'honors class' diprediksi akan **meningkat** sebesar **0.08**."
>     
> - _(Rubrik: Harus menyebut 'log-odds' atau 'logit'. Menyebut 'probabilitas' secara langsung adalah salah, karena hubungannya tidak linear. Menyebut 'odds' juga bisa diterima, tetapi 'log-odds' adalah yang paling tepat)._
    

## Tips Pengerjaan untuk Peserta

### Strategi Umum:

1. **Baca Semuanya:** Baca soal Bagian III terlebih dahulu. Soal-soal tersebut (terutama Soal 20) memberikan _clue_ untuk memahami materi di Bagian II.
    
2. **Fokus pada "Mengapa":** Soal esai berfokus pada "mengapa" (Mengapa MLE? Mengapa Logit? Mengapa SGA?). Jangan hanya menghafal formula, pahami tujuannya.
    
3. **Alokasi Waktu:** Bagian I (15-20 menit). Bagian II (35 menit). Bagian III (35 menit).
    

### Strategi Per Bagian:

- **Bagian I:** Hati-hati dengan _false friends_. Pernyataan di B/S No. 2, 3, 5, 9, 10 dirancang untuk menjebak.
    
- **Bagian II:** Untuk Soal 18 & 19, susun argumen Anda langkah demi langkah. Mulai dari "Apa tujuannya?" (misal: LSE) -> "Apa asumsinya?" -> "Mengapa asumsi itu dilanggar oleh Regresi Logistik?".
    
- **Bagian III:** Untuk Soal 21 (SGA), kerjakan dengan sangat teliti, baris per baris. Kesalahan di "Update A" akan menyebabkan kesalahan di "Proses B". Gunakan kalkulator Anda.
    

### Red Flags untuk Dihindari:

- ❌ Menulis bahwa $b_1$ (koefisien) adalah "peningkatan probabilitas". **SALAH**. $b_1$ adalah peningkatan _Log-Odds_.
    
- ❌ Tertukar antara _Gradient Ascent_ (Maksimalkan, tambah) dan _Gradient Descent_ (Minimalkan, kurang).
    
- ❌ Lupa menggunakan bobot $b_{new}$ yang baru di-update saat memproses sampel data berikutnya (Soal 21, langkah 33).
    
- ❌ Lupa menambahkan fitur bias $x_0=1$ dalam perhitungan $z = b^T x$.
    

## Sumber Belajar yang Direkomendasikan

- Materi `UAS/Regresi Logistik.md`
    
- Materi `UAS/Pelatihan Regresi Logistik.md`