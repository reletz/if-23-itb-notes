---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Bagging dan Random Forests: Bootstrap Sampling, Model Diversity, dan Majority Voting
>
> > ## Questions/Cues
> >
> > - Mengapa bootstrap sampling meningkatkan keragaman model?
> > - Bagaimana cara kerja voting mayoritas pada klasifikasi?
> > - Apa perbedaan utama antara bagging dan random forest?
> > - Bagaimana OOB score dihitung dalam bagging?
> > - Mengapa pemilihan fitur acak meningkatkan performa random forest?
> >
> > ## Reference Points
> >
> > - Kunapuli, G. (2023). *Ensemble methods for machine learning* (Slides 15‑23)
> > - Olson et al. (2018). *Data‑driven advice for applying machine learning to bioinformatics problems* (Slides 5‑6)
> > - Scikit‑learn documentation: Ensemble module (Slides 24‑26)
> > - Fernández‑Delgado et al. (2014). *Do we need hundreds of classifiers?* (Slides 27‑28)
>
> > ### Bootstrap Sampling (Bagging)
> >
> > **Bootstrap sampling**, atau *sampling dengan penggantian*, adalah teknik menghasilkan beberapa set data pelatihan yang berbeda dari satu dataset asli. Pada setiap iterasi, sejumlah contoh dipilih secara acak dari dataset induk, memungkinkan satu contoh muncul lebih dari satu kali atau tidak muncul sama sekali. Proses ini menghasilkan *bootstrap sample* yang masing‑masing memiliki distribusi statistik yang mirip dengan data asli, namun dengan variasi yang cukup untuk membuat setiap model dasar (base estimator) belajar pola yang sedikit berbeda. Contoh kode Python sederhana menggunakan NumPy memperlihatkan cara menghasilkan indeks‑indeks bootstrap:
> >
> > ```python
> >
> > import numpy as np
> >
> > bag = np.random.choice(range(0, 50), size=50, replace=True)
> >
> > oob = np.setdiff1d(range(0, 50), bag)
> >
> > ```
> >
> > Di sini, `bag` berisi contoh‑contoh yang dipilih untuk satu model, sedangkan `oob` (out‑of‑bag) berisi contoh yang tidak terpilih dan nantinya dapat dipakai untuk memperkirakan error tanpa data validasi terpisah.
> >
> > **Mengapa teknik ini penting?** Karena setiap model yang dilatih pada bootstrap sample yang berbeda akan memiliki struktur pohon (jika menggunakan decision tree) yang tidak identik. Perbedaan ini menurunkan korelasi antar model, yang pada gilirannya menurunkan varians keseluruhan ensemble ketika prediksi digabungkan. Secara statistik, bagging dapat dipandang sebagai estimasi Monte‑Carlo dari ekspektasi model pada distribusi data yang tak diketahui.
> >
> > ### Model Diversity dalam Bagging
> >
> > Keragaman model (*model diversity*) adalah inti keberhasilan ensemble. Pada bagging, keragaman diperoleh melalui dua mekanisme utama: (1) **Bootstrap sampling** yang menghasilkan data pelatihan yang berbeda, dan (2) **Randomisasi internal** pada algoritma pembelajar, misalnya dengan membatasi kedalaman pohon atau memilih split secara acak. Ketika setiap pohon keputusan dibangun, ia hanya melihat subset contoh yang berbeda; sehingga pola yang dipelajari tidak sepenuhnya tumpang tindih.
> > 
> > Pada praktik, keragaman dapat diukur dengan metrik seperti *disagreement* atau *Q‑statistic* antara pasangan model. Nilai keragaman yang tinggi biasanya berhubungan dengan penurunan error ensemble, asalkan akurasi individu tidak terlalu rendah.
> >
> > **Contoh konkret:** Pada dataset *Breast Cancer* dari scikit‑learn, sebuah `BaggingClassifier` dengan `DecisionTreeClassifier(max_depth=3)` menghasilkan akurasi sekitar 0,98, jauh di atas akurasi satu pohon tunggal (sekitar 0,93). Keuntungan ini berasal dari kombinasi banyak pohon yang belajar pada data yang sedikit berbeda.
> >
> > ### Majority Voting (Aggregasi Prediksi)
> >
> > Setelah setiap base estimator menghasilkan prediksi, ensemble harus menggabungkannya menjadi satu keputusan akhir. Pada tugas klasifikasi, metode yang paling umum adalah **majority voting** (pemungutan suara mayoritas). Setiap model memberikan satu label kelas; kelas yang memperoleh suara terbanyak menjadi prediksi akhir. Jika terdapat *ties*, biasanya dipilih kelas dengan probabilitas rata‑rata tertinggi atau dipilih secara acak.
> >
> > Secara matematis, untuk \(M\) model dan kelas \(c\), prediksi akhir \($\hat{y}$\) diberikan oleh:
> >
> > $$
> >
> > \hat{y} = \arg\max_{c} \sum_{m=1}^{M} \mathbf{1}\{h_m(x)=c\}
> >
> > $$
> >
> > di mana $(\mathbf{1})$ adalah fungsi indikator. Pada regresi, agregasi yang setara adalah **rata‑rata sederhana** (simple averaging) dari nilai prediksi.
> >
> > Implementasi di scikit‑learn (`BaggingClassifier` atau `RandomForestClassifier`) secara default menggunakan voting mayoritas, namun juga menyediakan opsi `predict_proba` yang mengembalikan rata‑rata probabilitas kelas, memberikan gambaran yang lebih halus tentang kepercayaan model.
> >
> > **Mengapa voting efektif?** Karena kesalahan individu yang bersifat acak cenderung saling meniadakan ketika digabungkan, sementara kesalahan sistematis (bias) tetap ada. Dengan kata lain, voting menurunkan **varians** tanpa menambah bias secara signifikan, yang tercermin dalam analisis bias‑varians klasik.
> >
> > ### Random Forest: Randomized Decision Trees
> > 
> > ![[Pasted image 20260212102615.png]]
> >
> > **Random Forest** adalah ekstensi dari bagging yang menambahkan satu lapisan randomisasi tambahan pada proses pembentukan pohon keputusan. Pada setiap split node, alih‑alih mempertimbangkan semua fitur yang tersedia, algoritma secara acak memilih subset fitur berukuran `max_features`. Dari subset ini, split terbaik dipilih berdasarkan impurity (misalnya Gini atau entropy).
> >
> > Randomisasi fitur ini mengatasi kelemahan bagging tradisional, di mana fitur yang sangat informatif dapat mendominasi semua pohon, sehingga mengurangi keragaman. Dengan membatasi ruang pencarian fitur pada tiap node, setiap pohon menjadi lebih *independen* satu sama lain, meningkatkan keragaman tanpa mengorbankan akurasi secara signifikan.
> >
> > Pada implementasi `RandomForestClassifier` di scikit‑learn, parameter penting meliputi `n_estimators` (jumlah pohon), `max_features` (jumlah fitur acak per split), `max_depth` (kedalaman maksimum), dan `oob_score=True` untuk mengaktifkan estimasi OOB.
> >
> > **Perbandingan performa:** Pada contoh kode yang sama dengan dataset *Breast Cancer*, `RandomForestClassifier` dengan `max_features=10` dan `max_depth=5` menghasilkan akurasi sekitar 0,965, sedikit lebih rendah daripada bagging dengan depth 3 pada contoh tersebut, namun pada dataset dengan banyak fitur dominan, random forest biasanya mengungguli bagging karena keragaman fitur yang lebih tinggi.
> >
> > ### Random Forest vs. Bagging: Kapan Memilih?
> >
> > Kedua teknik merupakan *homogeneous parallel ensembles* yang menggunakan decision tree sebagai base learner. Pilihan antara keduanya tergantung pada karakteristik data:
> >
> > - **Dimensi tinggi (d >> n)**: Ketika jumlah fitur jauh lebih besar daripada jumlah sampel, random forest lebih stabil karena tidak semua fitur dipertimbangkan pada tiap split, menghindari over‑fitting pada fitur yang jarang muncul.
> > - **Dataset kecil dengan sedikit fitur**: Bagging dapat cukup, karena keragaman yang dihasilkan oleh bootstrap sudah signifikan.
> > - **Kebutuhan interpretabilitas fitur penting**: Random forest menyediakan estimasi *feature importance* yang lebih informatif, karena kontribusi tiap fitur diukur melalui penurunan impurity rata‑rata pada semua pohon.
> > - **Keterbatasan memori**: Bagging dengan pohon dangkal (shallow trees) biasanya lebih ringan secara komputasi dibandingkan random forest yang menelusuri banyak split acak.
> >
> > Secara keseluruhan, baik bagging maupun random forest menurunkan varians model dasar, meningkatkan akurasi pada data terstruktur, dan menjadi pilihan utama dalam kompetisi data science (misalnya Kaggle) untuk masalah klasifikasi dan regresi.

> [!cornell] #### Summary
>
> **Bagging** menggunakan *bootstrap sampling* untuk menghasilkan data pelatihan yang berbeda, sehingga menciptakan keragaman model yang menurunkan varians keseluruhan. Prediksi akhir pada klasifikasi diperoleh melalui **majority voting**, yang mengagregasi keputusan individu menjadi satu keputusan kolektif. **Random Forest** memperluas ide bagging dengan menambahkan *random subspace* pada tiap split pohon, meningkatkan keragaman fitur dan memberikan estimasi pentingnya fitur. Kedua metode merupakan solusi *homogeneous parallel ensembles* yang sangat efektif pada data terstruktur, terutama ketika jumlah fitur tinggi atau ketika diperlukan robustitas terhadap over‑fitting.

> [!ad-libitum]- Additional Information
>
> #### Out‑of‑Bag (OOB) Error Estimation
>
> Salah satu keunggulan praktis bagging dan random forest adalah kemampuan menghitung **OOB error** tanpa memerlukan data validasi terpisah. Karena setiap bootstrap sample meninggalkan sekitar 37 % contoh yang tidak terpilih (disebut out‑of‑bag), prediksi untuk contoh‑contoh ini dapat dihasilkan oleh semua pohon yang **tidak** melihatnya selama pelatihan. Rata‑rata kesalahan pada semua OOB contoh memberikan perkiraan yang tidak bias terhadap generalisasi model.
>
> Implementasi di scikit‑learn cukup mengaktifkan `oob_score=True`; setelah pelatihan, atribut `oob_score_` menyimpan akurasi (klasifikasi) atau R² (regresi). Penelitian menunjukkan bahwa OOB error hampir identik dengan error yang diperoleh melalui cross‑validation 5‑fold pada banyak dataset, menjadikannya pilihan efisien untuk tuning hyperparameter.
>
> #### Feature Importance dan Permutation Importance
>
> Random forest secara alami menghasilkan **feature importance** berbasis *Mean Decrease Impurity* (MDI), yaitu rata‑rata penurunan impurity (Gini atau entropy) yang diakibatkan oleh split pada tiap fitur di seluruh pohon. Meskipun MDI cepat dihitung, ia dapat bias terhadap fitur dengan banyak kategori atau nilai kontinu.
>
> Alternatif yang lebih robust adalah **Permutation Importance**, yang mengukur penurunan akurasi model ketika nilai sebuah fitur diacak secara acak (permute). Prosedur ini menilai kontribusi fitur secara model‑agnostic dan dapat diterapkan pada bagging maupun random forest. Kedua teknik penting untuk interpretabilitas model, terutama dalam domain medis atau keuangan di mana pemahaman faktor prediktif krusial.
>
> #### Bias‑Variance Decomposition pada Ensemble
>
> Dari perspektif statistik, ensemble bagging dapat dijelaskan melalui **dekomposisi bias‑variance**. Misalkan \(\hat{f}(x)\) adalah prediksi rata‑rata dari \(M\) model dasar. Dekomposisi menghasilkan:
>
> \[
>
> \mathbb{E}\big[(\hat{f}(x)-y)^2\big] = \underbrace{\text{Bias}^2}_{\text{error sistematis}} + \underbrace{\frac{1}{M}\text{Var}}_{\text{varians berkurang}} + \underbrace{\sigma^2}_{\text{noise}}.
>
> \]
>
> Karena setiap model memiliki varians yang hampir sama, penambahan model meningkatkan faktor \(\frac{1}{M}\) sehingga varians total menurun secara signifikan. Random forest menurunkan varians lebih jauh dengan menambah keragaman fitur, sementara bias biasanya tetap rendah karena pohon keputusan bersifat *low‑bias* bila kedalamannya cukup.
>
> #### Computational Considerations and Parallelization
>
> Baik bagging maupun random forest sangat cocok untuk **komputasi paralel** karena setiap pohon dapat dilatih secara independen. Pada scikit‑learn, parameter `n_jobs=-1` memanfaatkan semua core CPU yang tersedia. Pada skala besar (misalnya jutaan contoh), implementasi terdistribusi seperti **Spark MLlib** atau **H2O.ai** menyediakan versi teroptimasi yang mengeksekusi training pada cluster.
>
> Namun, ada trade‑off: penyimpanan semua pohon dapat memakan memori signifikan, terutama bila `max_depth` besar. Teknik *tree pruning* atau *feature hashing* dapat mengurangi jejak memori tanpa mengorbankan akurasi secara drastis.
>
> #### Edge Cases and Limitations
>
> 1. **Data dengan noise tinggi**: Karena pohon keputusan cenderung over‑fit pada data berisik, bagging dapat memperparah noise jika tidak ada regularisasi (misalnya membatasi kedalaman).
> 2. **Fitur sangat korelatif**: Random forest mengurangi dominasi fitur kuat, namun bila semua fitur sangat berkorelasi, keragaman yang dihasilkan tetap rendah, sehingga manfaat ensemble berkurang.
> 3. **Imbalance kelas**: Pada dataset dengan distribusi kelas yang sangat tidak seimbang, voting mayoritas dapat bias ke kelas mayoritas. Teknik penyeimbangan seperti *class weighting* atau *SMOTE* sebelum bagging dapat memperbaiki performa.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi OOB Error dari Scratch**: Buat fungsi Python yang menghasilkan bootstrap samples, melatih decision tree pada masing‑masing, dan menghitung akurasi OOB untuk setiap contoh. Bandingkan hasilnya dengan `oob_score_` pada `BaggingClassifier`.
> 2. **Analisis Feature Importance dengan Permutation**: Pada dataset *Titanic* atau *Breast Cancer*, hitung MDI dan Permutation Importance menggunakan `sklearn.inspection.permutation_importance`. Visualisasikan perbedaan dan diskusikan mengapa beberapa fitur memiliki nilai penting yang berbeda antara dua metode.
>
> #### Tools and Resources
>
> - **scikit‑learn** (`BaggingClassifier`, `RandomForestClassifier`) – dokumentasi resmi: https://scikit-learn.org/stable/modules/ensemble.html
> - **XGBoost** (meskipun fokus pada boosting, berguna untuk perbandingan performa) – https://xgboost.readthedocs.io
> - **mlxtend** – modul `ensemble` untuk voting classifier custom: https://rasbt.github.io/mlxtend/user_guide/ensemble/VotingClassifier/
> - **Jupyter Notebook** – lingkungan interaktif untuk eksperimen visualisasi pohon dan OOB error.
>
> #### Further Reading
>
> - Breiman, L. (2001). *Random Forests*. Machine Learning, 45(1), 5‑32.
> - Fernández‑Delgado, M., Cernadas, E., Barro, S., & Amorim, D. (2014). *Do we need hundreds of classifiers?* Journal of Machine Learning Research, 15(1), 3133‑3181.
> - Zhou, Z.-H. (2012). *Ensemble Methods: Foundations and Algorithms*. CRC Press.
> - Scikit‑learn User Guide: *Bagging and Random Forests* – https://scikit-learn.org/stable/modules/ensemble.html#bagging-forests
> - Hands‑on tutorial: *Random Forest from Scratch* – https://towardsdatascience.com/implementing-random-forest-from-scratch-in-python-8c5c5c5c5c5c