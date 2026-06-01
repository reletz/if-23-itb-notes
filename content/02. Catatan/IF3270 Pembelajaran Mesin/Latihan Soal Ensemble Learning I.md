# Problem Set: Ensemble Learning & Meta-Algorithms

**Mata Pelajaran:** IF3270 Pembelajaran Mesin

**Estimasi Waktu:** 90 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Mengidentifikasi dan menjelaskan prinsip dasar ensemble learning, termasuk _wisdom of the crowds_ dan dekomposisi _bias-variance_.
    
2. Membedakan mekanisme kerja, kelebihan, dan keterbatasan dari metode paralel (Bagging, Random Forest) dan metode sekuensial (AdaBoost, Gradient Boosting).
    
3. Mengaplikasikan proses inferensi dan agregasi dari berbagai skema ensemble (Majority Voting, Weighted Voting, Stacking) pada data numerik.
    
4. Menganalisis strategi penanganan _overfitting_ dan _data leakage_ dalam perancangan arsitektur heterogen (Stacking meta-learning).
    

## Petunjuk Umum

- Problem set ini terdiri dari 3 Bagian: Fundamental (I), Aplikasi (II), dan Lanjutan (III).
    
- Bacalah setiap instruksi dengan teliti. Beberapa soal menuntut Anda untuk menunjukkan proses perhitungan (langkah demi langkah).
    
- Untuk soal esai/analisis, berikan argumentasi teknis yang solid berdasarkan konsep pembelajaran mesin (hindari jawaban yang terlalu umum).
    

## BAGIAN I: Soal Fundamental (30 poin)

**Fokus:** Recall dan Comprehension - Membangun fondasi pemahaman dasar

### Soal 1. Evaluasi Konsep Dasar Ensemble (10 poin)

Tentukan apakah pernyataan berikut terkait prinsip dasar _ensemble learning_ bernilai Benar atau Salah.

|        |                                                                                                                                                                                                  |           |           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | --------- |
| **No** | **Pernyataan**                                                                                                                                                                                   | **Benar** | **Salah** |
| 1      | Konsep _wisdom of the crowd_ dalam ensemble akan efektif meskipun semua _base learner_ memiliki tingkat kesalahan yang saling berkorelasi tinggi (kesalahan tumpang tindih).                     |           |           |
| 2      | _Bootstrap sampling_ pada proses Bagging bertujuan untuk menciptakan variasi data latih guna menurunkan _varians_ dari model secara keseluruhan.                                                 |           |           |
| 3      | Pada AdaBoost, sebuah _weak learner_ yang memiliki tingkat error ($\varepsilon_t$) sebesar 0.7 akan diberikan bobot ($\alpha_t$) yang tinggi karena model tersebut sangat membutuhkan perbaikan. |           |           |
| 4      | OOB (_Out-of-Bag_) error estimation memungkinkan model Random Forest untuk memperkirakan _generalization error_ tanpa memerlukan dataset validasi yang terpisah.                                 |           |           |

### Soal 2. Pemetaan Karakteristik Algoritma (10 poin)

Klasifikasikan karakteristik atau teknik berikut ini ke dalam algoritma Ensemble yang paling tepat. Berikan tanda centang ($\checkmark$) pada kolom yang sesuai (satu baris bisa memiliki lebih dari satu centang jika relevan).

|**No**|**Pernyataan/Karakteristik**|**Bagging**|**Random Forest**|**AdaBoost**|**XGBoost**|
|---|---|---|---|---|---|
|1|Menggunakan _random subspace_ (fitur acak) pada setiap _split node_.|||||
|2|Model dilatih untuk memprediksi _residual_ (error) dari kombinasi model sebelumnya.|||||
|3|Mengubah distribusi data latih dengan meng-update probabilitas/bobot tiap instance secara sekuensial.|||||
|4|Dapat diproses secara komputasi paralel sepenuhnya (_Homogeneous parallel ensemble_).|||||

### Soal 3. Anatomi Random Forest (10 poin)

Jelaskan mekanisme **Randomisasi Ganda** untuk membentuk _Model Diversity_ pada Random Forest:

- **[Komponen A - Level Data]:** _____________
    
- **[Komponen B - Level Fitur]:** _____________
    

## BAGIAN II: Soal Aplikasi (40 poin)

**Fokus:** Application dan Analysis - Menerapkan konsep ke situasi komputasional

### Soal 4. Studi Kasus Inferensi Multi-Model (20 poin)

**Kasus:** Diberikan sebuah model ensemble klasifikasi biner (kelas POSITIF atau NEGATIF) yang terdiri dari 3 _base classifiers_. Setiap _base classifier_ memberikan prediksi berupa **peluang kelas Positif**. Pada saat inferensi untuk satu instance baru $X$, diperoleh hasil sebagai berikut:

|   |   |   |
|---|---|---|
|**Base-classifier**|**Bobot Model (wt​)**|**Prediksi (P(Pos))**|
|Model 1|0.25|0.20|
|Model 2|0.45|0.75|
|Model 3|0.30|0.40|

_Catatan: Ambang batas klasifikasi kelas (threshold) adalah_ $> 0.5$ _untuk kelas POSITIF._

Berdasarkan data di atas, tentukan hasil prediksi akhir untuk $X$ (apakah POSITIF atau NEGATIF) beserta nilai perhitungannya untuk skema berikut:

a. **Bagging** (menggunakan agregasi _Majority Vote_ dari label kelas keras/hard voting)

b. **Random Forest** (menggunakan _mean predicted class probabilities_ / soft voting)

c. **Heterogeneous Ensemble** (menggunakan kombinasi linear berbobot / _weighted sum_ dari probabilitas)

d. **Stacking** (jika arsitektur Level 1 adalah Model 1 & 2, dan Level 2/Meta-learner adalah Model 3)

### Soal 5. Komparasi Solusi Model (20 poin)

Anda bekerja sebagai Data Scientist untuk memprediksi _fraud_ kartu kredit (data sangat tidak seimbang/imbalanced, fitur berdimensi sangat tinggi). Anda sedang mempertimbangkan antara **Random Forest** dan **XGBoost**. Lengkapi tabel komparatif berikut untuk melakukan justifikasi.

|   |   |   |   |
|---|---|---|---|
|**Metode/Konsep**|**Penanganan Imbalance Class secara alami**|**Kecepatan/Paralelisasi Training**|**Justifikasi Pemilihan untuk Kasus Ini**|
|**Random Forest**||||
|**XGBoost**||||

## BAGIAN III: Soal Lanjutan (30 poin)

**Fokus:** Synthesis dan Evaluation - Integrasi konsep dan arsitektur

### Soal 6. Merancang Arsitektur Stacking yang Kuat (30 poin)

**Kasus:** Anda merancang _Heterogeneous Parallel Ensemble_ menggunakan teknik **Stacking**. Sebagai _Base Learners_ (Level-1), Anda menggunakan SVM, K-Nearest Neighbors, dan Multi-Layer Perceptron (MLP). Sebagai _Meta-Learner_ (Level-2), Anda menggunakan Logistic Regression.

Saat mengevaluasi model pada data latih, akurasinya mencapai 99%, namun saat diuji pada _test set_, akurasinya anjlok menjadi 65%. Anda mencurigai terjadinya **Data Leakage** pada tahap pembuatan _Level-one dataset_.

Evaluasi masalah tersebut dan selesaikan menggunakan _scaffolding_ berikut:

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Jawaban / Analisis**|
|a. Identifikasi|Jelaskan secara spesifik **bagaimana** _data leakage_ dapat terjadi dalam proses ekstraksi prediksi dari Base Learners ke Meta-Learner jika Anda hanya melakukan `.fit()` dan `.predict()` pada set data latih yang sama.||
|b. Solusi|Rancang dan jelaskan prosedur _k-fold cross-validation blending_ yang benar untuk membangun _Level-one dataset_ tanpa membocorkan data target.||
|c. Justifikasi Meta-Learner|Mengapa Logistic Regression sering direkomendasikan sebagai _Meta-Learner_ alih-alih algoritma yang sangat kompleks (seperti Deep Neural Network berukuran besar)? Hubungkan dengan _Bias-Variance tradeoff_.||

## Kunci Jawaban & Rubrik Penilaian

### Bagian I (Total: 30 Poin)

**Soal 1. Evaluasi Konsep Dasar (10 poin - @2.5 poin)**

1. **Salah.** (Rasional: _Wisdom of the crowd_ bergantung pada **independensi** dan keragaman model. Jika kesalahan tumpang tindih / korelasi tinggi, maka ansambel akan mengulangi kesalahan yang sama).
    
2. **Benar.** (Rasional: _Bootstrap sampling_ menciptakan variasi data untuk melatih _base learner_ secara independen, menurunkan varians total).
    
3. **Salah.** (Rasional: Pada AdaBoost, jika error > 0.5, performa lebih buruk dari acak, $\alpha_t$ akan bernilai negatif, dan algoritma biasanya membatalkan/mengabaikan learner tersebut).
    
4. **Benar.** (Rasional: _Out-of-Bag_ menggunakan sampel data (~37%) yang tidak terambil dalam _bootstrap_ sebagai representasi tak bias untuk validasi).
    

**Soal 2. Pemetaan Karakteristik (10 poin - @2.5 poin per baris sempurna)**

1. **Random Forest**
    
2. **Gradient Boosting, XGBoost** (keduanya menggunakan _residual-based additive modeling_)
    
3. **AdaBoost**
    
4. **Bagging, Random Forest**
    

**Soal 3. Anatomi Random Forest (10 poin)**

- **[Komponen A - Level Data]:** _Bootstrap Sampling_ (Sampling dengan pengembalian pada data baris/observasi, menciptakan dataset bervariasi untuk tiap pohon). [5 poin]
    
- **[Komponen B - Level Fitur]:** _Random Subspace / Feature Randomization_ (Pada setiap split/node pohon, pemilihan fitur hanya dibatasi pada _subset_ acak dari total fitur, bukan seluruh fitur). [5 poin]
    

### Bagian II (Total: 40 Poin)

**Soal 4. Studi Kasus Inferensi Multi-Model (20 poin - @5 poin)**

_Langkah awal: Konversi probabilitas ke Kelas berdasarkan Threshold > 0.5_

- Model 1: 0.20 -> **Negatif**
    
- Model 2: 0.75 -> **Positif**
    
- Model 3: 0.40 -> **Negatif**
    

**a. Bagging (Majority Vote dari label)**

- Suara Positif: 1 (Model 2)
    
- Suara Negatif: 2 (Model 1, Model 3)
    
- **Hasil:** Mayoritas = **NEGATIF**
    

**b. Random Forest (Mean Predicted Class Probabilities)**

- Rata-rata peluang = $(0.20 + 0.75 + 0.40) / 3 = 1.35 / 3 = 0.45$  
    
- Karena $0.45 \le 0.5$, maka **Hasil:** **NEGATIF**
    

**c. Heterogeneous Ensemble (Weighted Voting / Kombinasi Linear)**

- Perhitungan: $\sum (w_t \cdot P_t) = (0.25 \cdot 0.20) + (0.45 \cdot 0.75) + (0.30 \cdot 0.40)$  
    
- $= 0.05 + 0.3375 + 0.12 = 0.5075$  
    
- Karena $0.5075 > 0.5$, maka **Hasil:** **POSITIF**
    

**d. Stacking (Level 2/Meta-learner = Model 3)**

- Pada inferensi _stacking_, prediksi akhir 100% ditentukan oleh keluaran dari meta-learner (Level 2).
    
- Karena meta-learner adalah Model 3 dan prediksinya adalah 0.40 (Negatif), maka **Hasil:** **NEGATIF**
    

**Soal 5. Komparasi Solusi Model (20 poin)**

_Penilaian berfokus pada ketepatan analisis komparatif._

- **Random Forest:**
    
    - _Imbalance_: Tidak menangani imbalance secara alami (meskipun bisa diakali dengan _class weighting_). Cenderung bias ke kelas mayoritas. [3 poin]
        
    - _Kecepatan_: Sangat cepat dan _embarrassingly parallel_ karena tiap pohon dibangun secara independen. [3 poin]
        
- **XGBoost:**
    
    - _Imbalance_: Sangat baik, karena secara sekuensial akan memberi fokus (lewat gradien/Hessian) pada observasi minoritas yang memiliki _residual_ tinggi karena sering salah diprediksi. [4 poin]
        
    - _Kecepatan_: Secara konseptual sekuensial (pohon berikutnya bergantung pada sebelumnya), namun XGBoost mengimplementasikan _Histogram-based splitting_ dan paralelisasi di level penentuan _node split_, membuatnya kompetitif. [4 poin]
        
- **Justifikasi (6 poin):** **XGBoost** lebih direkomendasikan untuk kasus _fraud_ karena kemampuan optimasi second-order-nya secara alami fokus pada presisi klasifikasi pada error/residual tinggi (seperti kelas fraud yang minoritas), dan _regularization term_-nya mencegah overfitting pada data berdimensi tinggi.
    

### Bagian III (Total: 30 Poin)

**Soal 6. Merancang Arsitektur Stacking yang Kuat (30 poin - @10 poin)**

|   |   |
|---|---|
|**Langkah**|**Analisis yang Diharapkan (Kunci Jawaban & Rubrik)**|
|**a. Identifikasi**|_Data Leakage_ terjadi karena base learners dilatih di data $X$ dan langsung melakukan prediksi pada data $X$ yang sama untuk melatih meta-learner. Karena base learner telah "melihat" $X$ saat _training_, prediksinya sangat optimistik (terutama MLP/KNN yang mudah overfit). Meta-learner akhirnya belajar dari prediksi overfit tersebut (belajar dari _noise_ data latih, bukan generalisasinya).<br><br>  <br><br>_(Rubrik: 10 poin jika menjelaskan konsep prediksi pada data yang sudah dilihat oleh model / optimisme bias)._|
|**b. Solusi**|Solusinya adalah **k-fold cross-validation blending**. Data latih dibagi $K$ _fold_. Base learner dilatih pada $K-1$ _fold_, lalu memprediksi 1 _fold_ tersisa (out-of-fold). Proses ini diulang $K$ kali hingga semua observasi memiliki _out-of-fold prediction_. Prediksi gabungan inilah yang menjadi _Level-one dataset_ bagi Meta-learner, sehingga Meta-learner dipastikan belajar dari output data yang _unseen_ oleh base learner.<br><br>  <br><br>_(Rubrik: 10 poin jika menjabarkan siklus training out-of-fold secara logis)._|
|**c. Justifikasi Meta-Learner**|Meta-learner seperti _Logistic Regression_ adalah model yang sangat sederhana (Bias tinggi, Varians rendah). Base learners di level 1 (MLP, KNN) sudah sangat kompleks (menangkap non-linearitas tingkat tinggi). Jika meta-learner juga kompleks, model ansambel keseluruhan akan memiliki total varians yang ekstrim dan langsung _overfit_. Regresi Logistik mengkombinasikan prediktor dengan _linear bounds_ yang menekan varians (bertindak sebagai regularisator).<br><br>  <br><br>_(Rubrik: 10 poin jika mengaitkan kompleksitas base learner vs kesederhanaan meta learner melalui dekomposisi Bias-Varians)._|

## Tips Pengerjaan untuk Peserta

1. **Bagian I:** Pahami betul terminologi. Ingat perbedaan utama metode **Paralel (mengurangi Varians)** vs metode **Sekuensial (mengurangi Bias)**.
    
2. **Bagian II:** Pada saat menghitung agregasi voting, selalu perhatikan tipe _thresholding_-nya. Perhitungan linier harus teliti, terutama saat menjumlahkan probabilitas dikalikan bobot.
    
3. **Bagian III:** Saat membahas konsep Meta-Learning, pikirkan proses ini sebagai sistem "dua tahap". Pastikan Anda bisa membayangkan _pipeline_ pergerakan matriks data dari Level 1 menuju Level 2 agar terhindar dari bias desain arsitektur.