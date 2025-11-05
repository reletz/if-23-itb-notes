---

type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]


> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu Pengukuran Prediksi?
> >     
> > - Apa itu Confusion Matrix?
> >     
> > - Apa itu True Positive (TP)?
> >     
> > - Apa itu True Negative (TN)?
> >     
> > - Apa itu False Positive (FP)?
> >     
> > - Apa itu False Negative (FN)?
> >     
> > - Apa itu Accuracy?
> >     
> > - Apa itu Precision?
> >     
> > - Apa itu Recall?
> >     
> > - Bagaimana cara menghitungnya (Latihan)?
> >     
> > - Kapan kita butuh Precision/Recall?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3170_Materi09_Seg03_AI-PredictionMeasurement.pdf
> >     
> 
> > ### Apa itu Pengukuran Prediksi?
> >
> > Setelah kita melatih model _Supervised Learning_ untuk membuat prediksi (misalnya, memprediksi 'Yes' atau 'No'), kita perlu cara untuk mengukur **seberapa bagus** atau **seberapa akurat** prediksi model tersebut.
> >
> > Kita melakukannya dengan membandingkan **Prediksi Model** dengan **Kelas Sebenarnya (Correct Class / Reality)** dari data uji.
> >
> > ### Confusion Matrix
> >
> > Cara terbaik untuk memvisualisasikan performa model adalah dengan **Confusion Matrix** (Matriks Kebingungan). Ini adalah tabel 2x2 yang merangkum 4 kemungkinan hasil dari prediksi.
> >
> > ||**Prediksi: Positif**|**Prediksi: Negatif**|
> > |---|---|---|
> > |**Realitas: Positif**|**True Positive (TP)**|**False Negative (FN)**|
> > |**Realitas: Negatif**|**False Positive (FP)**|**True Negative (TN)**|
> >
> > ### Definisi 4 Hasil Prediksi
> >
> > - **True Positive (TP)**:
> >     
> > - Realitas: Positif, Prediksi Model: Positif.
> >     
> > - **(Tebakan 'Positif' yang Benar)**.
> >     
> > - Contoh: Pasien _sebenarnya_ sakit, model memprediksi _sakit_.
> >     
> >
> > - **True Negative (TN)**:
> >     
> > - Realitas: Negatif, Prediksi Model: Negatif.
> >     
> > - **(Tebakan 'Negatif' yang Benar)**.
> >     
> > - Contoh: Pasien _sebenarnya_ sehat, model memprediksi _sehat_.
> >     
> >
> > - **False Positive (FP) -** _**Error Tipe I**_:
> >     
> > - Realitas: Negatif, Prediksi Model: Positif.
> >     
> > - **(Tebakan 'Positif' yang Salah)**.
> >     
> > - Contoh: Pasien _sebenarnya_ sehat, tapi model memprediksi _sakit_.
> >     
> >
> > - **False Negative (FN) -** _**Error Tipe II**_:
> >     
> > - Realitas: Positif, Prediksi Model: Negatif.
> >     
> > - **(Tebakan 'Negatif' yang Salah)**.
> >     
> > - Contoh: Pasien _sebenarnya_ sakit, tapi model memprediksi _sehat_. (Ini seringkali berbahaya!)
> >     
> >
> > ### Metrik Pengukuran Performa
> >
> > Berdasarkan 4 angka (TP, TN, FP, FN) dari Confusion Matrix, kita dapat menghitung metrik performa.
> >
> > ### 1. Accuracy (Akurasi)
> >
> > - **Apa itu?** Fraksi dari **total prediksi yang benar** (baik positif maupun negatif) dibagi dengan total seluruh data.
> >     
> > - **Formula**: `$$Accuracy = \frac{TP + TN}{TP + TN + FP + FN}$$`
> >     
> > - **Kapan digunakan?** Ini adalah metrik paling umum dan intuitif. Bekerja dengan baik ketika jumlah kelas **seimbang** (misalnya, 50% data Positif dan 50% data Negatif).
> >     
> >
> > ### 2. Precision (Presisi)
> >
> > - **Apa itu?** Dari semua instans yang **ditebak Positif** oleh model, berapa persen yang **benar-benar Positif**?
> >     
> > - **Formula**: `$$Precision = \frac{TP}{TP + FP}$$`
> >     
> > - **Kapan digunakan?** Saat biaya **False Positive (FP) sangat tinggi**.
> >     
> > - **Analogi**: Filter Spam Email. Kita ingin _Precision_ tinggi. Kita tidak mau email penting (Realitas: Negatif) salah diprediksi sebagai Spam (Prediksi: Positif). Sebuah **FP** di sini berarti kehilangan email penting. Lebih baik ada spam lolos (FN) daripada email penting hilang.
> >     
> >
> > ### 3. Recall (Perolehan / Sensitivitas)
> >
> > - **Apa itu?** Dari semua instans yang **seharusnya Positif**, berapa persen yang **berhasil ditemukan** (ter-retrieved/caught) oleh model?
> >     
> > - **Formula**: `$$Recall = \frac{TP}{TP + FN}$$`
> >     
> > - **Kapan digunakan?** Saat biaya **False Negative (FN) sangat tinggi**.
> >     
> > - **Analogi**: Deteksi Medis (misal, Kanker). Kita ingin _Recall_ tinggi. Kita tidak mau ada pasien yang sakit (Realitas: Positif) diprediksi sehat (Prediksi: Negatif). Sebuah **FN** di sini berarti pasien tidak mendapat pengobatan dan bisa berakibat fatal. Lebih baik ada pasien sehat diprediksi "mungkin sakit" (FP) untuk tes lebih lanjut.
> >
> > ### 4. F1 (jujur lupa)
> > ntar gue cari lagi
> >
> > ### Latihan 
> >
> > Mari kita hitung TP, TN, FP, FN dari data latihan untuk menghitung ketiga metrik.
> > 
> > - Data Total: 14 instans
> >     
> > - **TP (Realitas: +, Prediksi: +)**: Instans 1, 3, 5, 7, 10
> >     
> > - **Total TP = 5**
> >     
> > - **TN (Realitas: -, Prediksi: -)**: Instans 2, 8, 9, 12
> >     
> > - **Total TN = 4**
> >     
> > - **FP (Realitas: -, Prediksi: +)**: Instans 13
> >     
> > - **Total FP = 1**
> >     
> > - **FN (Realitas: +, Prediksi: -)**: Instans 4, 6, 11, 14
> >     
> > - **Total FN = 4**
> >     
> > 
> > (Pengecekan: 5 + 4 + 1 + 4 = 14. Total data cocok.)
> > 
> > **Perhitungan Metrik:**
> > 
> > 1. Accuracy = (TP + TN) / Total
> >     
> >     = (5 + 4) / 14
> >     
> >     = 9 / 14
> >     
> > 2. Precision = TP / (TP + FP)
> >     
> >     = 5 / (5 + 1)
> >     
> >     = 5 / 6
> >     
> > 3. Recall = TP / (TP + FN)
> >     
> >     = 5 / (5 + 4)
> >     
> >     = 5 / 9
> >     

> [!cornell] #### Summary
> 
> **Untuk mengukur performa model, kita menggunakan** _**Confusion Matrix**_ **(TP, TN, FP, FN) untuk membandingkan prediksi dengan realitas.** _**Accuracy**_ **mengukur total tebakan benar (TP+TN) dan baik untuk data seimbang. Namun, untuk data tidak seimbang atau kasus kritis, kita menggunakan** _**Precision**_ **(fokus menekan FP, penting saat FP mahal, seperti filter spam) dan** _**Recall**_ **(fokus menekan FN, penting saat FN mahal, seperti deteksi medis).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: Paradoks Akurasi (Accuracy Paradox)
> 
> _Accuracy_ bisa sangat **menyesatkan** pada **Imbalanced Datasets** (Dataset Tidak Seimbang).
> 
> - **Skenario**: Bayangkan dataset deteksi penipuan kartu kredit di mana 99% transaksi adalah 'Negatif' (valid) dan 1% adalah 'Positif' (penipuan).
>     
> - **Model Bodoh**: Jika Anda membuat model yang _selalu_ memprediksi 'Negatif' (tidak ada penipuan), model ini akan memiliki akurasi 99% (karena 99% tebakannya benar).
>     
> - **Masalah**: Akurasi 99% terdengar hebat, tetapi model ini sama sekali tidak berguna. Ia gagal total dalam tugas utamanya, yaitu menemukan 1% kasus penipuan (Recall-nya 0%).
>     
> - **Kesimpulan**: Untuk data tidak seimbang, _Accuracy_ adalah metrik yang buruk. Anda harus menggunakan _Precision_ dan _Recall_.
>     
> 
> #### Pendalaman Teknis 2: F1-Score (Menggabungkan Precision & Recall)
> 
> Seringkali, ada _trade-off_ antara Precision dan Recall (meningkatkan satu seringkali menurunkan yang lain). Bagaimana jika Anda butuh satu angka yang menyeimbangkan keduanya?
> 
> - **F1-Score**: Adalah **rata-rata harmonik** (harmonic mean) dari Precision dan Recall.
>     
> - **Formula**: `$$F_1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}$$`
>     
> - **Kenapa Harmonic Mean?** Rata-rata harmonik memberi "hukuman" lebih berat pada nilai-nilai ekstrem. F1-Score hanya akan tinggi jika _kedua_ Precision dan Recall tinggi.
>     
> - Contoh Latihan: Dari latihan di atas (P=5/6, R=5/9):
>     
>     F1 = 2 * ( (5/6) * (5/9) ) / ( (5/6) + (5/9) )
>     
>     F1 = 2 * (25/54) / ( (15/18) + (10/18) )
>     
>     F1 = 2 * (25/54) / (25/18)
>     
>     F1 = 2 * (25/54) * (18/25) = 2 * (18/54) = 2 * (1/3) = 2/3
>     
> 
> #### Pendalaman Teknis 3: ROC Curve & AUC
> 
> Untuk model klasifikasi yang memberikan probabilitas (bukan hanya 'Ya' atau 'Tidak'), ada metrik yang lebih canggih:
> 
> - **ROC Curve (Receiver Operating Characteristic)**: Sebuah grafik yang memplot **True Positive Rate (Recall)** vs. **False Positive Rate** pada berbagai ambang batas (threshold) probabilitas.
>     
> - **AUC (Area Under the Curve)**: Adalah luas area di bawah kurva ROC.
>     
>     - **AUC = 1.0**: Model sempurna.
>         
>     - **AUC = 0.5**: Model tidak berguna (sama seperti tebakan acak).
>         
>     - **AUC = 0.8**: Model yang cukup baik.
>         
> - **Keuntungan**: AUC adalah satu angka yang merangkum performa model di _semua_ kemungkinan threshold, dan tidak sensitif terhadap dataset yang tidak seimbang.
>     
> 
> #### Pendalaman Teknis 4: Klasifikasi Multi-Kelas
> 
> TP, TN, FP, FN, Precision, dan Recall pada dasarnya dirancang untuk klasifikasi **biner** (Positif/Negatif).
> 
> - **Bagaimana untuk Multi-Kelas?** (misal: memprediksi 'Kucing', 'Anjing', atau 'Burung')
>     
> - **Solusi**: Anda menghitung metrik untuk setiap kelas secara terpisah (misal, "Kucing" vs "Bukan Kucing"), lalu menggabungkannya.
>     
> - **Metode Penggabungan**:
>     
>     - **Macro-Averaging**: Hitung metrik (misal, Precision) untuk setiap kelas, lalu ambil rata-rata sederhananya. Ini memberi bobot yang sama untuk setiap kelas, tidak peduli seberapa banyak datanya.
>         
>     - **Micro-Averaging**: Jumlahkan semua TP, FP, FN dari _semua_ kelas, lalu hitung metriknya sekali saja. Ini memberi bobot lebih pada kelas yang memiliki lebih banyak data.
>