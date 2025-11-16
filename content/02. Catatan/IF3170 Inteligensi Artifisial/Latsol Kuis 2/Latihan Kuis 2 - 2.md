---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set Lanjutan: kNN & Prediction Measurement

Level: Lanjutan (Advanced)

Estimasi Waktu: 75 - 90 menit

Tujuan Pembelajaran:

1. Menganalisis implikasi komputasi dan statistik dari sifat _Lazy Learner_ kNN.
    
2. Memahami dan menjelaskan _Curse of Dimensionality_ dan solusinya dalam konteks kNN.
    
3. Menghitung dan menafsirkan metrik Precision, Recall, dan F1-Score pada kasus _Imbalanced Data_.
    
4. Mampu menjustifikasi pemilihan metrik yang tepat berdasarkan konteks dan biaya kesalahan (FP/FN) bisnis.
    

## Bagian A: Soal Dasar & True/False (4 soal)

### Tipe Soal: True/False dengan Analisis Kritis

|**No.**|**Pernyataan (Benar/Salah)**|**Jawaban (True/False)**|
|---|---|---|
|**A.1**|_Feature Scaling_ (Normalisasi/Standardisasi) adalah langkah _pre-processing_ yang hanya penting untuk atribut numerik tetapi tidak diperlukan untuk atribut simbolik (kategorikal) saat menggunakan kNN.||
|**A.2**|_Accuracy Paradox_ terjadi ketika model memiliki akurasi yang tinggi (misal 98%), namun model tersebut masih dianggap gagal dalam mencapai tujuan bisnis, ini biasanya terjadi pada kasus _Imbalanced Dataset_.||
|**A.3**|Dalam konteks deteksi fraud, di mana kelas 'Fraud' (Positif) hanya 0.1% dari total data, meningkatkan _Recall_ model seringkali berarti harus menoleransi sedikit penurunan _Precision_.||
|**A.4**|Jarak Manhattan ($D_m$) secara umum memberikan bobot yang lebih besar pada perbedaan fitur yang besar dibandingkan dengan Jarak Euclidean ($D_e$).||

## Bagian B: Soal Menengah & Multiple Choice Multiple Answer (4 soal)

### Tipe Soal: Multiple Choice Multiple Answer (Pilih > 1)

Soal 5 (MCMA: Karakteristik kNN Lanjutan)

Pilih tiga (3) karakteristik yang secara tepat mendefinisikan k-Nearest Neighbor (kNN) sebagai sebuah algoritma.

A. Membangun batas keputusan (Decision Boundary) secara eksplisit selama pelatihan (training).
B. Komputasi training yang rendah, namun komputasi testing yang tinggi.
C. Rentan terhadap noise data ketika nilai $k$ sangat kecil ($k=1$ atau $k=2$).
D. Menggunakan Maximum Likelihood Estimator (MLE) sebagai fungsi biaya (Cost Function).
E. Sering memerlukan teknik Dimensionality Reduction (misal: PCA) untuk mengatasi Curse of Dimensionality.

Soal 6 (MCMA: Metrik dan Biaya Kesalahan)

Dalam skenario apa saja Recall menjadi metrik evaluasi yang paling krusial (harus diutamakan)? (Pilih 2 Jawaban)

A. Filter Spam Email, di mana kita tidak ingin email non-spam (Negatif) salah diklasifikasikan sebagai spam (Positif/FP).
B. Diagnosis medis kanker, di mana kita tidak ingin pasien yang benar-benar sakit (Positif) didiagnosis sehat (Negatif/FN).
C. Sistem Pengenalan Wajah untuk otentikasi, di mana kita tidak ingin orang asing (Negatif) diberi akses (Positif/FP).
D. Prediksi kegagalan mesin (Positive = Failure), di mana kegagalan yang tidak terdeteksi (FN) menyebabkan kerugian operasional yang fatal.

Soal 7 (Aplikasi Hitungan & Analisis)

Anda memiliki data uji 500 email. Model pendeteksi email Phishing ('Positif') menghasilkan Confusion Matrix berikut:

|   |   |   |
|---|---|---|
|**Realitas**|**Prediksi: Phishing (Positif)**|**Prediksi: Aman (Negatif)**|
|**Phishing (Positif)**|100 (TP)|20 (FN)|
|**Aman (Negatif)**|30 (FP)|350 (TN)|

a. Hitung F1-Score model tersebut (dalam bentuk desimal, 2 angka di belakang koma).

b. Tentukan metrik mana (Precision atau Recall) yang lebih perlu ditingkatkan untuk model ini jika biaya utama dari Phishing adalah kerusakan sistem (diakibatkan oleh email Phishing yang lolos). Jelaskan mengapa.

Soal 8 (Teknik Jarak kNN)

Anda sedang bekerja dengan data numerik yang mengandung banyak outlier ekstrem (nilai-nilai yang sangat jauh dari rata-rata). Teknik pengukuran jarak manakah yang secara umum lebih robust (tahan banting) terhadap outlier tersebut?

A. Minkowski Distance dengan parameter $p=3$.

B. Euclidean Distance (Minkowski dengan $p=2$).

C. Manhattan Distance (Minkowski dengan $p=1$).

D. Hamming Distance (Khusus untuk data kategorikal).

## Bagian C: Soal Lanjutan (2 soal)

### Tipe Soal: Esai Analisis Mendalam

Soal 9 (Esai: Lazy Learner dan Komputasi)

Jelaskan mengapa sifat kNN sebagai Lazy Learner (Pembelajar Malas) menjadi kelemahan komputasi terbesar ketika model sudah dilatih dan beralih ke lingkungan produksi (deployment) dengan volume data yang sangat besar. Bandingkan dengan algoritma Eager Learner (seperti Decision Tree), jelaskan perbedaan fundamental dalam Cost of Prediction (Biaya Prediksi).

Soal 10 (Esai: Curse of Dimensionality)

Uraikan secara rinci fenomena Curse of Dimensionality dan bagaimana ia secara spesifik merusak kinerja algoritma kNN. Selain Feature Selection, jelaskan satu metode Dimensionality Reduction (Reduksi Dimensi) yang umum digunakan untuk mengatasi masalah ini, dan mengapa metode tersebut efektif.

> [!ad-libitum]- ## Kunci Jawaban
> 
> ### Bagian A: Soal Dasar & True/False
> 
> |**No.**|**Pernyataan (Benar/Salah)**|**Jawaban**|
> |---|---|---|
> |**A.1**|_Feature Scaling_ (Normalisasi/Standardisasi) adalah langkah _pre-processing_ yang hanya penting untuk atribut numerik tetapi tidak diperlukan untuk atribut simbolik (kategorikal) saat menggunakan kNN.|**True**|
> |**A.2**|_Accuracy Paradox_ terjadi ketika model memiliki akurasi yang tinggi (misal 98%), namun model tersebut masih dianggap gagal dalam mencapai tujuan bisnis, ini biasanya terjadi pada kasus _Imbalanced Dataset_.|**True**|
> |**A.3**|Dalam konteks deteksi fraud, di mana kelas 'Fraud' (Positif) hanya 0.1% dari total data, meningkatkan _Recall_ model seringkali berarti harus menoleransi sedikit penurunan _Precision_.|**True**|
> |**A.4**|Jarak Manhattan ($D_m$) secara umum memberikan bobot yang lebih besar pada perbedaan fitur yang besar dibandingkan dengan Jarak Euclidean ($D_e$).|**False**|
> |**Penjelasan A.4:** Euclidean Distance ($D_e$) mengambil kuadrat selisih, yang secara eksponensial melebih-lebihkan (membobot lebih besar) jarak yang besar. Manhattan Distance ($D_m$) hanya menjumlahkan selisih absolut, sehingga lebih linear dalam pembobotan.|||
> 
> ### Bagian B: Soal Menengah & Multiple Choice Multiple Answer
> 
> Soal 5 (MCMA: Karakteristik kNN Lanjutan)
> 
> Jawaban: B, C, dan E.
> 
> Rasional:
> 
> - A salah: kNN adalah _Lazy Learner_, tidak membangun model eksplisit.
>     
> - **B benar:** Biaya _training_ rendah (hanya menyimpan), biaya _testing_ tinggi (harus menghitung jarak ke semua data).
>     
> - **C benar:** $k$ kecil berarti rentan terhadap _noise_ dari satu atau dua tetangga yang anomali.
>     
> - D salah: MLE digunakan di Regresi Logistik, bukan kNN.
>     
> - **E benar:** _Curse of Dimensionality_ (banyak fitur) merusak kNN, sehingga PCA (Feature Extraction) atau Feature Selection diperlukan.
>     
> 
> Soal 6 (MCMA: Metrik dan Biaya Kesalahan)
> 
> Jawaban: B dan D.
> 
> Rasional: Kedua skenario ini berfokus pada meminimalkan False Negative (FN).
> 
> - **B** (Diagnosis Kanker): FN (sakit dibilang sehat) berakibat fatal.
>     
> - **D** (Kegagalan Mesin): FN (gagal dibilang aman) berakibat bencana operasional.
>     
> - A & C berfokus pada **meminimalkan False Positive (FP)** (Precision).
>     
> 
> Soal 7 (Aplikasi Hitungan & Analisis)
> 
> Jawaban:
> 
> a. F1-Score:
> 
> 1. Hitung Precision: $\text{P} = \frac{\text{TP}}{\text{TP} + \text{FP}} = \frac{100}{100 + 30} = \frac{100}{130} \approx 0.77$  
>     
> 2. Hitung Recall: $\text{R} = \frac{\text{TP}}{\text{TP} + \text{FN}} = \frac{100}{100 + 20} = \frac{100}{120} \approx 0.83$  
>     
> 3. Hitung F1-Score:
>     
>     $$\text{F1} = 2 \times \frac{\text{P} \times \text{R}}{\text{P} + \text{R}} = 2 \times \frac{0.77 \times 0.83}{0.77 + 0.83} = 2 \times \frac{0.6391}{1.60} \approx 2 \times 0.3994 \approx \mathbf{0.80}$$
> 
> b. **Metrik yang Diutamakan:** **Recall**.
> 
> - **Alasan:** Kerugian utama adalah **kerusakan sistem akibat email yang lolos** (_Phishing_ yang tidak terdeteksi).
>     
> - Email Phishing adalah **Realitas Positif**.
>     
> - Email yang lolos adalah **diprediksi Negatif**.
>     
> - Ini adalah kasus **False Negative (FN)**.
>     
> - Metrik **Recall** secara langsung mengukur kemampuan model untuk meminimalkan FN (menemukan semua Positif yang ada). Oleh karena itu, _Recall_ harus diutamakan, bahkan jika harus menoleransi beberapa _False Positive_ (email aman terdeteksi Phishing).
>     
> 
> Soal 8 (MCMA: Teknik Jarak kNN)
> 
> Jawaban: C 
> 
> Rasional:  **C benar (Manhattan** $p=1$**):** Karena hanya menjumlahkan selisih absolut, ia tidak mengambil kuadrat perbedaan. Ini membuatnya lebih tahan banting terhadap _outlier_ daripada Euclidean.
>     
> 
> ### Bagian C: Soal Lanjutan
> 
> Soal 9 (Esai: Lazy Learner dan Komputasi)
> 
> Jawaban:
> 
> Sifat kNN sebagai Lazy Learner adalah kelemahan komputasi terbesarnya di lingkungan produksi karena biaya prediksi (testing) yang sangat tinggi.
> 
> 1. **Model kNN (Lazy Learner):**
>     
>     - **Cost of Training:** Nol (Model hanya menyimpan data latih $D$).
>         
>     - **Cost of Prediction:** Tinggi. Ketika ada data baru $x_{\text{new}}$ datang, model harus menghitung **jarak** $x_{\text{new}}$ ke **setiap** $N$ data latih yang disimpan. Kompleksitasnya adalah $O(N \cdot D)$, di mana $N$ adalah jumlah data latih dan $D$ adalah dimensi. Jika $N$ mencapai jutaan, waktu prediksi per sampel akan sangat lambat.
>         
> 2. **Model DTL (Eager Learner):**
>     
>     - **Cost of Training:** Tinggi. Model menghabiskan waktu untuk membangun struktur pohon yang optimal (melalui _Greedy Search_ Information Gain).
>         
>     - **Cost of Prediction:** Rendah. Setelah model (pohon) terbentuk, prediksi data baru hanya memerlukan _traversal_ (penelusuran) dari _root_ ke _leaf_. Kompleksitasnya adalah $O(\log N)$, yang jauh lebih cepat daripada kNN.
>         
> 
> **Kesimpulan:** DTL membayar biaya komputasi di awal, menghasilkan **Explicit Model** yang cepat saat prediksi. kNN menunda komputasi, membuat model mudah di _training_ tetapi sangat lambat dan mahal (memori + CPU) di fase _deployment_.
> 
> Soal 10 (Esai: Curse of Dimensionality)
> 
> Jawaban:
> 
> Fenomena Curse of Dimensionality menjelaskan bahwa ketika jumlah fitur (dimensi) dalam dataset sangat tinggi, volume ruang fitur tumbuh secara eksponensial, menyebabkan data menjadi sangat jarang (sparse).
> 
> **Dampaknya pada kNN:**
> 
> 1. **Konsep Jarak Rusak:** Di ruang berdimensi tinggi, jarak antara dua titik data (misal menggunakan Euclidean Distance) cenderung **konvergen** (menjadi sangat mirip) satu sama lain. Secara efektif, semua titik menjadi "jauh" dari semua titik lainnya.
>     
> 2. **Noise Dominasi:** Ketika dimensi tinggi, setiap fitur, termasuk fitur yang tidak relevan (_noise_), menyumbang pada perhitungan jarak. Fitur yang tidak relevan ini **merusak** perhitungan jarak dan menyebabkan tetangga terdekat yang ditemukan oleh kNN mungkin bukan lagi tetangga yang relevan secara konseptual. Akibatnya, kinerja kNN menurun drastis.
>     
> 
> **Metode** _**Dimensionality Reduction**_ **(Reduksi Dimensi):**
> 
> Metode yang umum dan efektif adalah **Principal Component Analysis (PCA)**.
> 
> - **Cara Kerja PCA:** PCA adalah teknik **Feature Extraction** yang menemukan set fitur baru (_Principal Components_ - PC) yang merupakan kombinasi linear dari fitur asli. PCA memproyeksikan data ke sub-ruang berdimensi lebih rendah sambil **mempertahankan varians (informasi)** sebanyak mungkin.
>     
> - **Efektivitas Terhadap kNN:**
>     
>     - PC yang dihasilkan **tidak berkorelasi** satu sama lain.
>         
>     - Kita dapat membuang PC yang memiliki varians kecil (informasi rendah).
>         
>     - Ini menghilangkan _noise_ dan redundansi, menghasilkan set fitur baru yang lebih kompak dan informatif, sehingga perhitungan jarak kNN menjadi **lebih bermakna** di ruang dimensi yang dikurangi.