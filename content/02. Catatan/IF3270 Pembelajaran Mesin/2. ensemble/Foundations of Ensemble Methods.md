---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Foundations of Ensemble Methods
>
> > ## Questions/Cues
> >
> > - Mengapa keragaman model penting dalam ensemble?
> > - Bagaimana wisdom of crowds berlaku dalam ML?
> > - Perbedaan paralel vs sekuensial ensemble?
> > - Keuntungan heterogeneous vs homogeneous ensemble?
> > - Mengapa ensemble unggul untuk data terstruktur?
> >
> > ## Reference Points
> >
> > - Kunapuli (2023) Chapter 1 (Halaman 5-7, 23-25)
> > - Han et al. (2022) Bab Ensemble Methods (Halaman 34-37)
> > - Slide IF3270 Halaman 4-9, 23-25
> >
>
> > ### Definisi dan Prinsip Dasar Metode Ensemble
> > Metode ensemble merupakan pendekatan pembelajaran mesin yang menggabungkan prediksi dari beberapa model dasar (*base learners*) untuk menghasilkan prediksi akhir yang lebih akurat.
> > 
> > Konsep ini terinspirasi dari **"wisdom of the crowds"** (kebijaksanaan kerumunan) di mana keputusan kolektif dari kelompok yang beragam sering kali lebih baik daripada keputusan individu ahli.
> > 
> > Dua prinsip utama metode ensemble adalah:
> > 1. **Keragaman (Diversity)**: Setiap model dasar harus memiliki pendekatan atau perspektif berbeda dalam menganalisis data. Contoh analogi: seperti tim diagnostik rumah sakit dengan spesialisasi berbeda (ahli radiologi, patologi, klinis) yang memberikan pendapat independen (Slide 5).
> > 2. **Agregasi (Aggregation)**: Mekanisme untuk menggabungkan prediksi individual menjadi keputusan akhir, misalnya voting mayoritas untuk klasifikasi atau rerata untuk regresi (Slide 6).
> > 
> > Efektivitas ensemble bergantung pada keseimbangan antara akurasi individual model dan keragaman di antara mereka. Model yang terlalu serupa (high correlation) tidak memberikan manfaat ensemble signifikan.
> > ### Klasifikasi Metode Ensemble
> > Metode ensemble diklasifikasikan berdasarkan dua dimensi utama:
> > **1. Homogen vs Heterogen**
> > - **Homogen**: Semua model dasar menggunakan algoritma sama (contoh: Random Forest yang hanya menggunakan pohon keputusan). 
> > 	- *Keuntungan*: optimisasi lebih mudah.
> > - **Heterogen**: Menggabungkan berbagai jenis algoritma (misal: SVM + Neural Network + Regresi Logistik). 
> > 	- *Keuntungan*: keragaman alami, cocok untuk masalah kompleks dengan pola beragam.
> > 
> > **2. Paralel vs Sekuensial**
> > - **Paralel**: Model dilatih secara independen (bersamaan), kemudian digabungkan. 
> > 	- Contoh: Bagging dan Voting Classifier.
> > - **Sekuensial**: Model dilatih secara berurutan dimana model berikutnya memperbaiki kesalahan model sebelumnya. 
> > 	- Contoh: AdaBoost dan Gradient Boosting.
> > 
> > Kombinasi paradigma ini menghasilkan empat kategori utama, dengan teknik seperti **Stacking** (meta-ensemble) yang termasuk hybrid approach.
> > ### Keunggulan Metode Ensemble
> > Metode ensemble secara konsisten menunjukkan kinerja unggul pada data terstruktur karena beberapa alasan:
> > 1. **Reduksi Varians**: Dengan menggabungkan banyak model, ensemble mengurangi risiko overfitting dari model individual.
> > 2. **Stabilitas Prediksi**: Kesalahan acak (*random errors*) dari model individual saling meniadakan dalam agregasi.
> > 3. **Robust terhadap Noise**: Karena keputusan berdasarkan konsensus, ensemble lebih tahan terhadap outlier dan noise data.
> > 4. **Fleksibilitas Arsitektur**: Dapat mengombinasikan kekuatan berbagai algoritma untuk menangkap pola data yang kompleks.
> > 
> > Studi Olson et al. (2018) menunjukkan XGBoost, Random Forest, dan Gradient Boosting mendominasi leaderboard kompetisi Kaggle, membuktikan efektivitasnya pada masalah terstruktur (Slide 8).
> > ### Heterogeneous Parallel Ensembles
> > Pada ensemble heterogen paralel, mekanisme agregasi menjadi kritis karena model dasar memiliki karakteristik berbeda. Dua pendekatan utama:
> > 
> > **1. Weighted Voting**
> > Memberikan bobot berbeda pada setiap model berdasarkan akurasinya. Model dengan akurasi validasi lebih tinggi mendapat bobot lebih besar dalam voting final. Formula umum:
> > 
> > $$\text{Final Prediction} = argmax(Σ \text{weight}_i * \text{prediction}_i)$$
> > 
> > 
> > **2. Meta-Learning**
> > Menggunakan model sekunder (*meta-learner*) yang mempelajari cara terbaik menggabungkan prediksi model dasar. Contoh: menggunakan regresi logistik untuk mempelajari kombinasi optimal prediksi SVM, Decision Tree, dan k-NN.
> > 
> > Tantangan utama adalah menentukan mekanisme agregasi yang mempertahankan kekuatan masing-masing model sekaligus memitigasi kelemahannya.

> [!cornell] #### Summary
>
> **Metode ensemble** memanfaatkan **kebijaksanaan kerumunan** dengan menggabungkan prediksi beberapa model dasar melalui prinsip **keragaman dan agregasi**. Pendekatan ini diklasifikasikan menjadi **homogen/heterogen** dan **paralel/sekuensial**, masing-masing cocok untuk skenario berbeda. Keunggulan utamanya terletak pada kemampuan **mengurangi varians**, **meningkatkan stabilitas prediksi**, dan **fleksibilitas arsitektur**, membuatnya menjadi state-of-the-art untuk data terstruktur. **Ensemble heterogen** memerlukan strategi agregasi canggih seperti weighted voting atau meta-learning untuk mengoptimalkan kinerja kolektif.
>

> [!ad-libitum]- Additional Information
>
> #### Landasan Teoretis
> **Bias-Variance Decomposition** menjelaskan manfaat ensemble:
> ```
> E[(y - H(x))^2] = Bias^2 + Variance + Noise
> ```
> Ensemble mengurangi komponen variance melalui agregasi prediksi. Pada kasus model uncorrelated, error ensemble turun secara linear dengan jumlah model (Kunapuli Theorem 2.1).
>
> **Condorcet Jury Theorem** (1785) membuktikan secara matematis bahwa dengan asumsi:
> 1. Setiap classifier memiliki probabilitas benar > 50%
> 2. Prediksi independen
> Maka akurasi ensemble meningkat secara monoton dengan jumlah classifier.
>
> #### Analogi Sistem Kompleks
> Ensemble mirip dengan sistem biologis (koloni semut) atau sosial (pasar saham) dimana interaksi komponen sederhana menghasilkan perilaku kolektif cerdas. Prinsip emergent behavior ini menjelaskan mengapa ensemble sering melebihi kapasitas model individual.
>
> #### Tabel Perbandingan Arsitektur
> | Kriteria          | Homogen Paralel | Heterogen Paralel | Sekuensial       |
> |-------------------|-----------------|-------------------|------------------|
> | Kompleksitas      | Rendah          | Sedang-Tinggi     | Tinggi           |
> | Paralelisasi      | Tinggi          | Sedang            | Rendah           |
> | Interpretabilitas | Rendah          | Rendah            | Sedang           |
> | Robustness        | Tinggi          | Sangat Tinggi     | Variatif         |
> | Use Case          | Data homogen    | Data multimodal   | Pattern ordering |
>
> #### Tools dan Implementasi
> - **Scikit-learn**: VotingClassifier, StackingClassifier
> - **H2O AutoML**: Otomatis membangun stacked ensembles
> - **ML-Ensemble**: Library khusus untuk nested ensembling
> - **TPOT**: Menggunakan genetic programming untuk optimisasi ensemble
>
> #### Proyek Eksplorasi Mandiri
> 1. Analisis 5 solusi pemenang Kaggle (https://kaggle.com/winners) dan identifikasi pola penggunaan ensemble
> 2. Implementasikan heterogeneous ensemble dengan kombinasi 3 algoritma berbeda dan bandingkan akurasi vs model individual
> 3. Eksperimen dengan teknik stacking menggunakan meta-learner neural network pada dataset MNIST
>
> #### Bacaan Lanjutan
> - **Buku**: "Ensemble Methods: Foundations and Algorithms" oleh Zhi-Hua Zhou
> - **Paper**: "Ensemble Learning: A Survey" (Sollich & Krogh, 2020) di Wiley Interdisciplinary Reviews
> - **Tutorial**: "Advanced Ensemble Strategies for Machine Learning" (https://mlensemble.org/docs)
> - **Kursus**: Coursera "Advanced Machine Learning Specialization" Bab 4 oleh Higher School of Economics