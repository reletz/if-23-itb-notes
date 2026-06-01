_Back to_ [[Latihan UAS IF3170]]
# Problem Set: Geometry & Optimization Models

**Mata Pelajaran:** Inteligensi Artifisial (IF3170)

**Topik:** Supervised Learning (Linear Models & SVM)

**Estimasi Waktu:** 75 Menit

**Total Nilai:** 40 Poin

## Tujuan Pembelajaran

Setelah menyelesaikan bagian ini, mahasiswa diharapkan dapat:

1. Melakukan simulasi manual pelatihan model **Regresi Logistik** menggunakan _Stochastic Gradient Ascent_.
    
2. Menentukan **Hyperplane** optimal dan **Margin** pada Support Vector Machine (SVM) Linear.
    
3. Memilih fungsi **Kernel** yang tepat untuk data non-linear.
    
4. Mengevaluasi kinerja model klasifikasi menggunakan metrik **Precision, Recall, dan F1-Score**.
    

## Petunjuk Umum

- Kerjakan soal secara berurutan.
    
- Tuliskan langkah perhitungan secara detail.
    
- Gunakan pembulatan **3 angka di belakang koma**.
    

### Soal 1. Pelatihan Regresi Logistik & Evaluasi Recall (10 Poin)

**Fokus:** Konsep dasar optimasi gradien (SGD), fungsi Sigmoid, dan evaluasi kinerja pada kasus medis.

Anda sedang melatih model Regresi Logistik sederhana untuk mendeteksi penyakit diabetes berdasarkan kadar gula darah.

- **Fitur (**$x$**):** Kadar Gula Darah (dinormalisasi).
    
- **Target (**$y$**):** 1 (Diabetes), 0 (Sehat).
    
- **Model:** $P(y=1|x) = \sigma(w_0 + w_1 x_1)$.
    
- **Bobot Awal (**$w$**):** $w_0 = 0, w_1 = 0.5$.
    
- **Learning Rate (**$\eta$**):** 0.1.
    

Diberikan satu data latih baru: **Data A:** $\langle x_1=2, y=1 \rangle$ (Pasien diabetes dengan gula darah tinggi).

**Pertanyaan:**

a. **(Prediksi Awal)** Hitung probabilitas prediksi $p$ bahwa Data A menderita diabetes menggunakan bobot awal.

- _Rumus Sigmoid:_ $\sigma(z) = \frac{1}{1 + e^{-z}}$.
    

b. **(Update Bobot)** Lakukan satu langkah update bobot menggunakan **Stochastic Gradient Ascent (SGA)** berdasarkan error dari Data A. Tuliskan nilai $w_0$ (bias) dan $w_1$ yang baru.

- _Rumus Update:_ $w_{new} = w_{old} + \eta (y - p) x$. (Ingat $x_0=1$ untuk bias).
    

c. **(Evaluasi Kinerja - Recall)** Misalkan setelah pelatihan selesai, model digunakan untuk memprediksi 5 pasien di data uji dengan hasil sebagai berikut:

|   |   |   |
|---|---|---|
|**Pasien**|**Status Asli (y)**|**Prediksi Model ($\hat{y}$​)**|
|P1|1|1|
|P2|1|0|
|P3|0|0|
|P4|1|1|
|P5|0|1|

Hitung nilai **Recall** dari model tersebut. Jelaskan implikasi medis jika nilai Recall rendah pada kasus deteksi penyakit ini.

### Soal 2. SVM Linear: Geometry & Precision (12 Poin)

**Fokus:** Konsep Support Vector, perhitungan Margin manual, dan evaluasi presisi.

Diberikan dataset 2D sederhana yang _linearly separable_ sebagai berikut:

- **Kelas Positif (+1):** $A(2, 2)$, $B(2, 0)$  
    
- **Kelas Negatif (-1):** $C(0, 0)$, $D(0, 2)$  
    

**Pertanyaan:**

a. **(Identifikasi Support Vector)** Gambarkan titik-titik tersebut pada koordinat Kartesius. Secara visual atau logika, tentukan titik mana saja yang menjadi **Support Vector**. (Hint: Cari titik terluar yang saling berhadapan antar kelas).

b. **(Hyperplane Optimal)** Tentukan persamaan garis pemisah optimal ($w \cdot x + b = 0$) yang berada tepat di tengah-tengah antara Support Vector kelas positif dan negatif. Tentukan nilai vektor bobot $\mathbf{w} = (w_1, w_2)$ dan bias $b$.

c. **(Perhitungan Margin)** Hitung lebar **Margin** ($m$) dari model SVM yang Anda buat pada poin (b) menggunakan rumus $m = \frac{2}{||w||}$.

d. **(Evaluasi Kinerja - Precision)** Sebuah sistem deteksi spam email menggunakan SVM. Dari 100 email yang diprediksi sebagai "Spam" oleh model, ternyata 80 di antaranya memang benar spam, dan 20 sisanya adalah email penting (bukan spam). Sementara itu, ada 10 email spam yang gagal terdeteksi (diprediksi bukan spam).

- Hitung nilai **Precision** model ini.
    
- Jika Anda adalah pengguna email, apakah Anda lebih mementingkan Precision tinggi atau Recall tinggi? Jelaskan alasan Anda.
    

### Soal 3. SVM Non-Linear & Kernel Trick (8 Poin)

**Fokus:** Menangani data yang tidak terpisah linear.

Perhatikan data 1D berikut:

- **Kelas Merah (-1):** $x = \{-3, -2, 2, 3\}$  
    
- **Kelas Biru (+1):** $x = \{-1, 0, 1\}$  
    

**Pertanyaan:**

a. **(Visualisasi Masalah)** Gambarkan data tersebut pada garis bilangan. Apakah data ini bisa dipisahkan oleh sebuah titik (pemisah linear 1D) tanpa error?

b. **(Transformasi Fitur)** Usulkan sebuah fungsi pemetaan $\phi(x)$ sederhana (misalnya menaikkan dimensi ke $x^2$) agar data tersebut menjadi terpisah secara linear (_linearly separable_) di dimensi baru.

- Hitung nilai $\phi(x)$ untuk semua titik.
    
- Gambarkan sketsa pemisahannya di dimensi baru.
    

c. **(Pemilihan Kernel)** Jika Anda menggunakan SVM dengan **Kernel RBF (Radial Basis Function)**, parameter apa yang harus diatur agar _boundary_ keputusan melengkung cukup fleksibel untuk membungkus kelas Biru? Jelaskan dampak jika parameter tersebut ($\gamma$) terlalu besar.

### Soal 4. Regresi Linear: Outlier & Metrics (6 Poin)

**Fokus:** Metrik evaluasi regresi dan sensitivitas model.

Anda membangun model prediksi harga rumah. Mayoritas rumah berharga 500 juta - 2 Milyar. Namun, ada satu data _outlier_ (rumah mewah) seharga 100 Milyar yang masuk ke data uji.

**Pertanyaan:**

1. **Dampak Outlier:** Jika model Anda memprediksi rumah mewah tersebut seharga 2 Milyar (error = 98 Milyar), bandingkan dampak error ini terhadap metrik **MSE (Mean Squared Error)** dan **MAE (Mean Absolute Error)**. Metrik mana yang nilainya akan melonjak lebih drastis? Jelaskan mengapa secara matematis.
    
2. **Pemilihan Metrik:** Jika tujuan bisnis Anda adalah membuat model yang _robust_ (tahan) terhadap data properti mewah yang jarang terjadi (tidak ingin performa keseluruhan "terlihat" hancur hanya gara-gara satu rumah mewah), metrik mana yang sebaiknya Anda jadikan acuan utama?
    

### Soal 5. Karakteristik Model (Matrix Matching) (4 Poin)

**Fokus:** Pemahaman sifat dasar algoritma.

Cocokkan karakteristik di kolom kiri dengan algoritma yang paling tepat di kolom kanan. (Satu algoritma bisa dipilih lebih dari satu kali, atau tidak sama sekali).

|   |   |
|---|---|
|**Karakteristik**|**Pilihan Algoritma**|
|1. Output utamanya adalah nilai probabilitas kelas (0 s.d 1).|A. Linear Regression|
|2. Bertujuan memaksimalkan jarak (gap) antara data terluar dua kelas.|B. Logistic Regression|
|3. Menggunakan _Least Square Error_ sebagai fungsi objektif.|C. Support Vector Machine (SVM)|
|4. Hanya titik-titik tertentu (sparse) yang mempengaruhi posisi garis keputusan.||

**Jawaban:**

1. ____
    
2. ____
    
3. ____
    
4. ____
    

> [!ad-libitum]- # Kunci Jawaban & Rubrik Penilaian (Bagian II)
> 
> ### Soal 1. Regresi Logistik (10 Poin)
> 
> **a. Prediksi Awal (2 Poin)**
> 
> - $z = w_0 + w_1 x_1 = 0 + (0.5 \times 2) = 1$.
>     
> - $p = \sigma(1) = \frac{1}{1 + e^{-1}} = \frac{1}{1 + 0.368} \approx \mathbf{0.731}$.
>     
> 
> **b. Update Bobot (4 Poin)**
> 
> - Error: $y - p = 1 - 0.731 = 0.269$.
>     
> - Update $w_0$ (ingat input bias $x_0=1$):
>     
>     $w_0^{new} = 0 + 0.1 \times (0.269) \times 1 = \mathbf{0.027}$.
>     
> - Update $w_1$ (input $x_1=2$):
>     
>     $w_1^{new} = 0.5 + 0.1 \times (0.269) \times 2 = 0.5 + 0.0538 = \mathbf{0.554}$.
>     
> 
> **c. Evaluasi Recall (4 Poin)**
> 
> - **TP (True Positive):** Pasien Asli 1, Prediksi 1. (P1, P4) $\rightarrow$ 2 orang.
>     
> - **FN (False Negative):** Pasien Asli 1, Prediksi 0. (P2) $\rightarrow$ 1 orang.
>     
> - **Recall** = $TP / (TP + FN) = 2 / (2 + 1) = \mathbf{0.667}$ (atau 66.7%).
>     
> - **Implikasi:** Recall rendah berarti banyak pasien diabetes yang **gagal terdeteksi** (dibilang sehat). Ini berbahaya karena penyakit tidak tertangani. Dalam medis, kita ingin Recall mendekati 100%.
>     
> 
> ### Soal 2. SVM Linear (12 Poin)
> 
> **a. Support Vector (3 Poin)**
> 
> - Positif: A(2,2), B(2,0). Negatif: C(0,0), D(0,2).
>     
> - Secara visual, titik yang paling dekat dengan "lawan" adalah **C(0,0)** dan **D(0,2)** dari sisi negatif, serta **B(2,0)** dan **A(2,2)** dari sisi positif.
>     
> - Sebenarnya, jika dilihat garis tengahnya ada di $x=1$. Maka **semua 4 titik** tersebut berjarak sama ke garis pemisah. Jadi keempatnya adalah Support Vector.
>     
> - _Alternatif jawaban:_ Mahasiswa yang menjawab perwakilan, misal B dan C (karena saling berhadapan di y=0) juga dapat nilai parsial, tapi jawaban tepat adalah keempatnya membentuk batas.
>     
> 
> **b. Hyperplane (3 Poin)**
> 
> - Garis pemisah jelas vertikal di $x = 1$.
>     
> - Persamaan garis vertikal $x=1$ bisa ditulis: $1 \cdot x_1 + 0 \cdot x_2 - 1 = 0$.
>     
> - Jadi vektor bobot $\mathbf{w} = (1, 0)$ dan bias $b = -1$.
>     
> - Cek:
>     
>     - Titik A(2,2): $1(2) - 1 = 1$ (+1 Benar).
>         
>     - Titik C(0,0): $1(0) - 1 = -1$ (-1 Benar).
>         
> 
> **c. Margin (3 Poin)**
> 
> - $||w|| = \sqrt{1^2 + 0^2} = 1$.
>     
> - Margin $m = \frac{2}{||w||} = \frac{2}{1} = \mathbf{2}$.
>     
> - _Verifikasi:_ Jarak dari $x=0$ (Negatif) ke $x=2$ (Positif) adalah 2.
>     
> 
> **d. Precision (3 Poin)**
> 
> - TP = 80 (Prediksi Spam, Asli Spam).
>     
> - FP = 20 (Prediksi Spam, Asli Bukan/Penting).
>     
> - **Precision** = $TP / (TP + FP) = 80 / (80 + 20) = \mathbf{0.8}$ (80%).
>     
> - **Preferensi:** Pengguna email lebih mementingkan **Precision Tinggi**.
>     
>     - Kenapa? Kalau Recall rendah (ada spam masuk inbox), pengguna cuma terganggu sedikit (tinggal hapus). Tapi kalau Precision rendah (FP tinggi), artinya email penting masuk folder Spam dan mungkin terhapus/hilang. Kehilangan email penting lebih fatal.
>         
> 
> ### Soal 3. SVM Non-Linear (8 Poin)
> 
> **a. Visualisasi (2 Poin)**
> 
> - Garis bilangan: Merah di pinggir kiri (-3,-2) dan kanan (2,3). Biru di tengah (-1,0,1).
>     
> - **Tidak bisa dipisahkan** oleh satu titik potong.
>     
> 
> **b. Transformasi (3 Poin)**
> 
> - Fungsi: $\phi(x) = x^2$.
>     
> - Nilai baru:
>     
>     - Merah: $(-3)^2=9, (-2)^2=4, 2^2=4, 3^2=9$. (Nilai $\ge 4$).
>         
>     - Biru: $(-1)^2=1, 0^2=0, 1^2=1$. (Nilai $\le 1$).
>         
> - **Pemisahan:** Sekarang data terpisah linear. Kita bisa taruh threshold di $y=2.5$. Semua di bawah 2.5 adalah Biru, di atas adalah Merah.
>     
> 
> **c. Kernel RBF (3 Poin)**
> 
> - Parameter $\gamma$ (gamma).
>     
> - Jika $\gamma$ **terlalu besar**, radius pengaruh setiap support vector menjadi sangat kecil. Akibatnya, _decision boundary_ akan sangat berlekuk-lekuk membungkus ketat setiap data latih (seperti pulau-pulau kecil). Ini menyebabkan **Overfitting**.
>     
> 
> ### Soal 4. Regresi Linear (6 Poin)
> 
> 1. **MSE vs MAE:**
>     
>     - Error = 98.
>         
>     - MAE akan rata-rata errornya naik sebesar $98/N$.
>         
>     - MSE akan rata-rata errornya naik sebesar $98^2/N = 9604/N$.
>         
>     - **MSE** akan melonjak jauh lebih drastis karena mengkuadratkan error.
>         
> 2. **Rekomendasi:** Gunakan **MAE** (Mean Absolute Error). MAE lebih _robust_ terhadap outlier karena tidak memberikan penalti kuadratik yang berlebihan pada satu data ekstrem tersebut.
>     
> 
> ### Soal 5. Matrix Matching (4 Poin)
> 
> 1. **B** (Logistic Regression)
>     
> 2. **C** (SVM)
>     
> 3. **A** (Linear Regression)
>     
> 4. **C** (SVM - Hanya Support Vector yang berpengaruh)