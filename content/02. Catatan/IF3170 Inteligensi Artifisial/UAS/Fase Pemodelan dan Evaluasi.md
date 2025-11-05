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
> > - Apa tujuan fase Pemodelan?
> >     
> > - Apa saja 3 bagian skenario pemodelan?
> >     
> > - Mengapa data perlu dibagi (split)?
> >     
> > - Apa itu data latih & data uji?
> >     
> > - Mengapa perlu eksperimen?
> >     
> > - Prinsip "No Free Lunch"?
> >     
> > - Apa itu proses pelatihan (training)?
> >     
> > - Apa itu proses pengujian (testing)?
> >     
> > - Apa tujuan fase Evaluasi?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-data-science.pdf (Slide 22-28)
> >     
> 
> > ### Fase 4: Pemodelan (Modeling)
> > 
> > Pada fase ini, berbagai teknik pemodelan dipilih dan diterapkan, dan parameternya diatur untuk mendapatkan hasil yang optimal. Fase ini sangat bersifat teknis dan iteratif.
> > 
> > #### Membangun Skenario Pemodelan
> > 
> > Sebelum melatih model, kita perlu membuat strategi yang jelas.
> > 
> > 1. **Memilih Algoritma**:
> >     
> >     - Pilihan algoritma disesuaikan dengan **Tugas Analitik** yang telah ditentukan di fase _Business Understanding_ (Klasifikasi, Regresi, Clustering).
> >         
> >     - **Prinsip "No Free Lunch"**: Tidak ada satu algoritma pun yang selalu menjadi yang terbaik untuk semua masalah. Oleh karena itu, praktik terbaik adalah mencoba beberapa algoritma yang berbeda.
> >         
> >     - Contoh algoritma: k-NN, Naïve Bayes, Regresi Linear/Logistik, SVM, Decision Tree, Random Forest, Deep Learning.
> >         
> > 2. **Membagi Data (Data Splitting)**:
> >     
> >     - Data yang sudah bersih dibagi menjadi (minimal) dua set:
> >         
> >         - **Data Latih (Training Set)**: Digunakan untuk "mengajari" atau "melatih" model agar ia belajar pola dari data.
> >             
> >         - **Data Uji (Test Set)**: Digunakan untuk menguji seberapa baik model yang sudah dilatih dapat melakukan generalisasi pada data baru yang belum pernah dilihat sebelumnya. **Data ini "disembunyikan" dari model selama pelatihan.**
> >             
> >     - Pembagian ini krusial untuk mencegah _overfitting_ dan untuk mendapatkan estimasi performa model yang jujur.
> >         
> > 3. **Menentukan Langkah Eksperimen**:
> >     
> >     - Proses mencari kombinasi algoritma dan _hyperparameter_ terbaik.
> >         
> >     - Pendekatan bisa bervariasi dari _Best Guess_ (coba-coba), _One Factor at a Time_, hingga pendekatan sistematis seperti **Grid Search** (mencoba semua kemungkinan kombinasi hyperparameter).
> >         
> > 
> > #### Membangun Model
> > 
> > - **Proses Pelatihan (Training)**: Algoritma machine learning dijalankan pada **Data Latih**. Algoritma akan menyesuaikan parameter internalnya untuk meminimalkan error atau memaksimalkan tujuannya, sehingga menghasilkan sebuah **Model** (misalnya, sebuah pohon keputusan, set bobot neural network, atau garis regresi).
> >     
> > - **Proses Pengujian (Testing)**: Model yang sudah jadi kemudian digunakan untuk membuat prediksi pada **Data Uji**. Hasil prediksi ini kemudian dibandingkan dengan label sebenarnya dari Data Uji untuk diukur performanya.
> >     
> > 
> > ### Fase 5: Evaluasi (Evaluation)
> > 
> > Pada tahap ini, kita secara menyeluruh menilai model yang telah dibangun.
> > 
> > 1. **Mengevaluasi Hasil Model**:
> >     
> >     - Mengukur performa model menggunakan metrik teknis yang relevan (yang dipilih di fase _Business Understanding_). Contoh metrik untuk klasifikasi: _Accuracy, Precision, Recall, F1-Score_.
> >         
> >     - Membandingkan performa beberapa model yang telah dicoba dan memilih yang terbaik.
> >         
> > 2. **Review Proses**:
> >     
> >     - Menilai apakah ada batasan atau kekurangan dari model yang dibangun. Apakah ada asumsi yang dilanggar?
> >         
> > 3. **Menentukan Langkah Selanjutnya**:
> >     
> >     - Berdasarkan evaluasi, kita memutuskan apakah model sudah cukup baik untuk di-_deploy_, atau kita perlu kembali ke fase sebelumnya (misalnya, perlu _feature engineering_ lagi atau mencoba algoritma lain).
> >         

> [!cornell] #### Summary
> 
> **Fase** _**Modeling**_ **adalah inti teknis dari data science, di mana data yang telah disiapkan dibagi menjadi set latih dan uji, lalu berbagai algoritma machine learning dilatih pada data latih untuk menghasilkan model. Selanjutnya, pada fase** _**Evaluation**_**, performa model-model tersebut diukur secara objektif menggunakan data uji dan metrik yang relevan. Hasil evaluasi ini menentukan apakah model siap untuk** _**deployment**_ **ataukah proses perlu diulang kembali untuk perbaikan lebih lanjut.**

> [!ad-libitum]- Additional Information
> 
> #### Validasi Silang (Cross-Validation)
> 
> Pembagian data menjadi _train/test set_ tunggal rentan terhadap kebetulan; hasilnya bisa sangat baik atau buruk tergantung pada bagaimana data dibagi. **Validasi Silang K-Fold (K-Fold Cross-Validation)** adalah teknik yang lebih robust:
> 
> 4. Data dibagi secara acak menjadi _K_ "lipatan" (folds) yang berukuran sama.
>     
> 5. Model dilatih sebanyak _K_ kali.
>     
> 6. Pada setiap iterasi, satu lipatan digunakan sebagai data validasi (test set) dan _K-1_ lipatan lainnya digunakan sebagai data latih.
>     
> 7. Metrik performa dari _K_ iterasi tersebut kemudian dirata-ratakan untuk mendapatkan estimasi performa yang lebih stabil.
>     
> 
> #### Dilema Bias-Variance (Bias-Variance Tradeoff)
> 
> Ini adalah konsep fundamental dalam pemodelan.
> 
> - **Bias**: Error yang berasal dari asumsi yang salah dalam algoritma pembelajaran. Bias yang tinggi menyebabkan model gagal menangkap hubungan yang relevan antara fitur dan target (_underfitting_). Modelnya terlalu sederhana.
>     
> - **Variance**: Error yang berasal dari sensitivitas model terhadap fluktuasi kecil dalam data latih. Variance yang tinggi menyebabkan model menangkap _noise_ dari data latih (_overfitting_). Modelnya terlalu kompleks.
>     
> 
> Tujuan pemodelan adalah menemukan keseimbangan yang tepat antara bias dan variance untuk meminimalkan total error pada data yang belum pernah dilihat.
> 
> #### Metrik Evaluasi Detail
> 
> - **Regresi**:
>     
>     - **Mean Absolute Error (MAE)**: Rata-rata dari nilai absolut error. Mudah diinterpretasikan.
>         
>     - **Root Mean Squared Error (RMSE)**: Akar kuadrat dari rata-rata error kuadrat. Memberikan bobot lebih besar pada error yang besar.
>         
>     - **R-squared (R²)**: Proporsi varians pada variabel target yang dapat diprediksi dari variabel independen. Nilainya antara 0-1 (semakin tinggi semakin baik).
>         
> - **Klasifikasi**:
>     
>     - **Confusion Matrix**: Tabel yang merangkum hasil prediksi (True Positive, False Positive, True Negative, False Negative).
>         
>     - **Precision**: Dari semua yang diprediksi positif, berapa persen yang benar-benar positif? (TP/(TP+FP)). Penting ketika biaya False Positive tinggi.
>         
>     - **Recall (Sensitivity)**: Dari semua yang sebenarnya positif, berapa persen yang berhasil diprediksi? (TP/(TP+FN)). Penting ketika biaya False Negative tinggi.
>         
>     - **AUC - ROC Curve**: Area di bawah kurva ROC. Mengukur kemampuan model untuk membedakan antar kelas. Nilai 1 sempurna, 0.5 acak.
>         
> 
> #### Tuning Hyperparameter
> 
> - **Grid Search**: Mencoba setiap kombinasi hyperparameter yang Anda tentukan secara sistematis. Sangat komprehensif tapi mahal secara komputasi.
>     
> - **Random Search**: Mencoba kombinasi acak dari hyperparameter. Seringkali lebih efisien daripada Grid Search.
>     
> - **Bayesian Optimization**: Membangun model probabilistik dari fungsi (hyperparameter -> performa model) dan menggunakannya untuk memilih hyperparameter yang paling menjanjikan untuk dievaluasi pada iterasi berikutnya.
>     
> 
> #### Tools dan Software
> 
> - **Python `scikit-learn`**: Menyediakan hampir semua yang dibutuhkan: implementasi puluhan algoritma, fungsi untuk `train_test_split`, `KFold`, `GridSearchCV`, `RandomizedSearchCV`, dan berbagai metrik di `sklearn.metrics`.
>