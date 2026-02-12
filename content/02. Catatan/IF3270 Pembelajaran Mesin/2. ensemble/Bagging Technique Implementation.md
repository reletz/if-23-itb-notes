---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Bagging Technique Implementation
>
> > ## Questions/Cues
> >
> > - Mengapa bootstrap sampling digunakan dalam Bagging?
> > - Bagaimana proses agregasi prediksi bekerja?
> > - Perbedaan antara base model dalam Bagging
> > - Keuntungan menggunakan teknik Bagging
> > - Implementasi bootstrap sampling dalam Python
> >
> > ## Reference Points
> >
> > - Lecture_01_DFS.pptx (Slides 12-15)
> > - Data Mining: Concepts and Techniques (Halaman 142-145)
> >
>
> > ### Konsep Dasar Bagging
> > Bagging (**B**ootstrap **Agg**regat**ing**) adalah teknik ensemble paralel yang bertujuan meningkatkan stabilitas dan akurasi model dengan menggabungkan prediksi dari beberapa model dasar. 
> > 
> > Teknik ini bekerja dengan membuat beberapa versi dataset melalui bootstrap sampling (pengambilan sampel dengan pengembalian) lalu melatih model independen pada setiap subset data.
> > 
> > Analoginya seperti sekelompok dokter yang masing-masing mendiagnosis pasien berdasarkan rekam medis yang berbeda. Meskipun menggunakan keahlian yang sama (algoritma homogen), variasi dalam sampel data menyebabkan perbedaan diagnosis individu yang kemudian digabungkan untuk keputusan akhir.
> > - **Contoh implementasi:** Pada dataset dengan 1000 sampel, Bagging akan membuat 100 subset bootstrap (masing-masing 1000 sampel dengan duplikasi). 
> > - Setiap model dilatih pada subset berbeda, lalu prediksi digabungkan melalui voting mayoritas (klasifikasi) atau rata-rata (regresi).
> > ### Mekanisme Bootstrap Sampling
> > Bootstrap sampling adalah teknik pengambilan sampel dengan pengembalian yang memungkinkan terjadinya duplikasi data. Pada implementasi Bagging:
> > 1. Setiap subset bootstrap memiliki ukuran sama dengan dataset asli
> > 2. Probabilitas tiap sampel terpilih tetap sama tiap iterasi
> > 3. Sekitar 36.8% data asli tidak terpilih (out-of-bag samples) yang bisa digunakan untuk validasi
> > Implementasi Python:
> > ```python
> > import numpy as np
> > data_indices = np.arange(1000)
> > bootstrap_sample = np.random.choice(data_indices, size=1000, replace=True)
> > ```
> > Sifat pengambilan dengan pengembalian ini menciptakan variasi antar subset, memastikan keragaman (diversity) antar model meskipun menggunakan algoritma sama. Contoh: Satu sampel mungkin muncul 3 kali dalam subset A tetapi tidak ada dalam subset B.
> > ### Proses Agregasi Prediksi
> > Setelah semua model dasar dilatih, Bagging melakukan agregasi prediksi melalui:
> > 1. **Majority Voting** untuk klasifikasi: Kelas dengan suara terbanyak ditetapkan sebagai prediksi akhir
> > 2. **Rata-rata** untuk regresi: Nilai prediksi akhir merupakan rata-rata semua prediksi model dasar
> > Contoh: Dalam klasifikasi gambar 10 model dasar dengan prediksi:
> > 
> > 	- 7 model: "Kucing"
> > 	- 2 model: "Anjing"
> > 	- 1 model: "Kelinci"
> > 
> > **Prediksi ensemble:** "Kucing" (mayoritas suara).
> > 
> > Keunggulan agregasi ini adalah reduksi varians dan peningkatan generalisasi model, terutama ketika base learner cenderung overfitting.
> > 
> > ### Keuntungan dan Aplikasi Bagging
> > Keuntungan utama Bagging:
> > 1. **Stabilitas**: Mengurangi varians prediksi dengan rata-rata hasil multiple model
> > 2. **Parallelisasi**: Model dasar dapat dilatih secara paralel
> > 3. **Robust terhadap noise**: Outliers terdispersi di berbagai subset
> > 4. **Pencegahan overfitting**: Agregasi bertindak sebagai regularisasi alami
> > 
> > Aplikasi khas Bagging:
> > - Klasifikasi citra medis dengan akurasi tinggi
> > - Prediksi risiko kredit di perbankan
> > - Sistem rekomendasi yang stabil
> > 

> [!cornell] #### Summary
>
> **Bagging** merupakan teknik ensemble paralel yang meningkatkan kinerja model melalui **bootstrap sampling** dan **agregasi prediksi**. Metode ini bekerja dengan melatih **multiple model homogen** pada subset data berbeda yang dihasilkan melalui pengambilan sampel dengan pengembalian, lalu menggabungkan hasilnya melalui **voting mayoritas** atau **rata-rata**. Keunggulan utamanya terletak pada kemampuan **reduksi varians**, **stabilitas prediksi**, dan kemudahan **paralelisasi proses training**. Teknik ini sangat efektif untuk **data terstruktur** dan menjadi fondasi berbagai algoritma state-of-the-art dalam pembelajaran mesin.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Varians-Bias
> Bagging terutama efektif untuk model dengan varians tinggi dan bias rendah seperti decision tree yang dalam. Secara matematis, varians ensemble dapat dinyatakan sebagai:
> ```
> Var(H) = ρσ² + (1-ρ)σ²/M
> ```
> dimana ρ adalah korelasi antar model, σ² varians model tunggal, dan M jumlah model. Bagging mengurangi suku kedua melalui peningkatan M, sementara bootstrap sampling menurunkan ρ melalui diversifikasi data training.
>
> #### Perbandingan dengan Metode Lain
> | Aspek          | Bagging           | Boosting          |
> |----------------|-------------------|-------------------|
> | Paralelisasi   | Penuh             | Sebagian          |
> | Penanganan Noise | Robust          | Rentan            |
> | Fokus          | Reduksi varians   | Reduksi bias      |
> | Urutan Training| Independen        | Sekuensial        |
>
> #### Optimasi Parameter
> Parameter kritis dalam Bagging:
> 1. Jumlah model (M): Biasanya 50-500, peningkatan M meningkatkan performa hingga titik jenuh
> 2. Ukuran subset: Umumnya sama dengan dataset asli
> 3. Kompleksitas base learner: Semakin kompleks, semakin besar reduksi varians
>
> #### Eksplorasi Mandiri
> 1. Implementasi BaggingClassifier dari scikit-learn:
> ```python
> from sklearn.ensemble import BaggingClassifier
> from sklearn.tree import DecisionTreeClassifier
>
> base_model = DecisionTreeClassifier()
> bagging = BaggingClassifier(base_model, n_estimators=100, max_samples=0.8)
> bagging.fit(X_train, y_train)
> ```
>
> 2. Eksperimen pengaruh jumlah estimator terhadap akurasi:
> 	- Variasikan n_estimators dari 10 ke 500 dengan interval 50
> 	- Plot hubungan antara jumlah model dan akurasi validasi
> 	- Identifikasi titik jenuh performa
>
> #### Bacaan Lanjutan
> - Breiman, L. (1996). "Bagging Predictors". Machine Learning 24(2):123–140
> - Bühlmann, P. (2012). "Bagging, Boosting and Ensemble Methods". Handbook of Computational Statistics
> - Dokumentasi resmi scikit-learn: Ensemble Methods