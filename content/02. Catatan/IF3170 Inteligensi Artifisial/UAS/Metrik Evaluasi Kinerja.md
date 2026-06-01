---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: Evaluation Metrics (Pengukuran Kinerja Model - Part 2)
> 
> > ## Questions/Cues
> >
> > - Metrik Klasifikasi Utama
> >     
> > - Perbedaan Precision vs Recall
> >     
> > - Kapan pakai F1-Score?
> >     
> > - Makna ROC-AUC
> >     
> > - Confusion Matrix (TP, FP, TN, FN)
> >     
> > - Metrik Regresi (MSE, MAE)
> >     
> > - Metrik Clustering
> >     
> >
> > ## Reference Points
> >
> > - Slides: 11-19
> >     
> > - Topik: Metrik Evaluasi
> >     
> 
> > ### 1. Metrik Klasifikasi: Confusion Matrix
> >
> > Dasar evaluasi klasifikasi adalah Confusion Matrix yang terdiri dari 4 komponen:
> >
> > - **TP (True Positive):** Prediksi Positif, Kenyataan Positif (Benar).
> >     
> > - **TN (True Negative):** Prediksi Negatif, Kenyataan Negatif (Benar).
> >     
> > - **FP (False Positive):** Prediksi Positif, Kenyataan Negatif (Salah - Tipe I Error).
> >     
> > - **FN (False Negative):** Prediksi Negatif, Kenyataan Positif (Salah - Tipe II Error).
> >     
> >
> > ### 2. Metrik Turunan Klasifikasi
> >
> > - **Akurasi:** $(TP+TN) / Total$. Persentase total prediksi yang benar. _Hati-hati pada data tidak seimbang._
> >     
> > - **Precision:** $TP / (TP+FP)$. Seberapa akurat saat model bilang "Positif". Penting jika biaya FP mahal (misal: deteksi spam, jangan sampai email penting masuk spam).
> >     
> > - **Recall (Sensitivity):** $TP / (TP+FN)$. Seberapa banyak kasus positif asli yang berhasil ditangkap. Penting jika biaya FN mahal (misal: deteksi kanker, jangan sampai ada pasien sakit dibilang sehat).
> >     
> > - **F1-Score:** $2 \times (Precision \times Recall) / (Precision + Recall)$. Rata-rata harmonik. Digunakan untuk menyeimbangkan Precision dan Recall.
> >     
> >
> > ### 3. ROC-AUC (Receiver Operating Characteristic)
> >
> > Kurva yang memplot kinerja model pada berbagai **threshold** klasifikasi.
> >
> > - **Sumbu Y:** True Positive Rate (Recall).
> >     
> > - **Sumbu X:** False Positive Rate ($FP / (FP+TN)$).
> >     
> > - **AUC (Area Under Curve):** Luas area di bawah kurva ROC.
> >     
> >     - AUC = 1.0: Model Sempurna.
> >         
> >     - AUC = 0.5: Model Acak (tebak-tebakan).
> >         
> >     - **Keunggulan:** Tidak bergantung pada satu threshold tertentu, bagus untuk melihat performa model secara keseluruhan.
> >         
> >
> > ### 4. Metrik Regresi
> >
> > Digunakan saat memprediksi nilai kontinu (angka).
> >
> > - **MAE (Mean Absolute Error):** Rata-rata selisih mutlak error. $\frac{1}{n}\sum |y - \hat{y}|$. Mudah diinterpretasi.
> >     
> > - **MSE (Mean Squared Error):** Rata-rata kuadrat error. $\frac{1}{n}\sum (y - \hat{y})^2$. Menghukum error besar lebih berat.
> >     
> > - **RMSE (Root MSE):** Akar dari MSE. Mengembalikan satuan ke skala asli data.
> >     
> > - **R-squared (**$R^2$**):** Seberapa baik variansi data dijelaskan oleh model.
> >     
> > - **MAPE (Mean Absolute Percentage Error):** Error dalam bentuk persentase, memudahkan perbandingan antar skala data berbeda.
> >     

> [!cornell] #### Summary
> 
> Pemilihan metrik bergantung pada masalah bisnis. **Akurasi** seringkali menipu pada data _imbalanced_. **Precision** fokus meminimalkan _False Positive_, sedangkan **Recall** fokus meminimalkan _False Negative_. **F1-Score** adalah jalan tengah keduanya. **ROC-AUC** mengukur kemampuan pemisahan kelas di berbagai threshold. Untuk regresi, **RMSE** dan **MAE** mengukur besaran error prediksi, di mana RMSE lebih sensitif terhadap error ekstrem (outlier).

> [!ad-libitum]- Ad Libitum: Interpretasi ROC Curve
> 
> #### Membaca Kurva ROC
> 
> - **Pojok Kiri Bawah (0,0):** Model tidak memprediksi positif sama sekali (Threshold = 1.0).
>     
> - **Pojok Kanan Atas (1,1):** Model memprediksi semua data sebagai positif (Threshold = 0.0).
>     
> - **Pojok Kiri Atas (0,1):** Titik Ideal (TPR=1, FPR=0). Model menangkap semua positif tanpa kesalahan.
>     
> 
> Semakin kurva melengkung mendekati pojok kiri atas, semakin baik model memisahkan kelas positif dan negatif. Jika kurva berupa garis diagonal lurus (y=x), model tidak memiliki kemampuan diskriminatif (sama saja melempar koin).

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Dalam kasus deteksi penipuan kartu kredit (Fraud Detection), metrik mana yang lebih prioritas: Precision atau Recall?</strong></summary>
>
> **Recall** biasanya lebih prioritas. Kita ingin menangkap sebanyak mungkin transaksi curang (Positif) agar tidak lolos (meminimalkan False Negative). Meskipun konsekuensinya kita mungkin memblokir beberapa transaksi sah (False Positive), itu lebih baik daripada membiarkan pencurian terjadi.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa kelemahan utama metrik Akurasi?</strong></summary>
>
> Akurasi tidak bisa dipercaya pada dataset yang **tidak seimbang (imbalanced)**. Contoh: Jika 99% data adalah "Sehat" dan 1% "Sakit", model yang memprediksi SEMUA orang "Sehat" akan punya akurasi 99%, tapi model itu tidak berguna sama sekali untuk mendeteksi penyakit.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa perbedaan MSE dan MAE dalam menangani outlier?</strong></summary>
>
> **MSE** mengkuadratkan error, sehingga memberikan penalti yang sangat besar (bobot lebih berat) pada outlier atau prediksi yang meleset jauh. **MAE** memperlakukan semua error secara linear, sehingga lebih robust (tidak terlalu sensitif) terhadap outlier dibanding MSE.
> 
> </details>