---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Foundations of Ensemble Learning: Concepts, Terminology, and the Wisdom of Crowds
>
> > ## Questions/Cues
> >
> > - Mengapa keberagaman model penting dalam ensemble?
> > - Bagaimana “wisdom of the crowd” diterapkan pada prediksi?
> > - Apa perbedaan utama antara ensemble paralel dan sekuensial?
> > - Kapan sebaiknya dipilih ensemble homogen vs heterogen?
> > - Bagaimana cara menggabungkan output model menjadi keputusan akhir?
> >
> > ## Reference Points
> >
> > - Kunapuli, G. (2023). *Ensemble methods for machine learning* (Chapter 1) (Halaman 6‑15)
> > - Livebook Manning (https://livebook.manning.com/book/ensemble-methods-for-machine-learning/chapter-1/19) (Halaman 8‑14)
> > - Olson et al. (2018). *Data‑driven advice for applying machine learning to bioinformatics problems* (Halaman 5‑6)
> > - Vivify Change Catalyst (2014). *Wisdom of the crowd* (Halaman 7‑9)
>
> > ### What is Ensemble Learning?
> >
> > Ensemble learning adalah pendekatan dalam pembelajaran mesin yang menggabungkan **beberapa model prediktif** (disebut *base learners* atau *estimators*) untuk menghasilkan satu keputusan yang biasanya lebih akurat, lebih stabil, dan lebih robust dibandingkan model tunggal. 
> > 
> > Ide dasarnya mirip dengan keputusan kolektif dalam masyarakat: ketika banyak orang dengan pengetahuan berbeda memberikan pendapat, rata‑rata atau mayoritas pendapat mereka cenderung lebih mendekati kebenaran daripada satu ahli saja. 
> > 
> > Dalam konteks mesin, setiap base learner belajar dari data yang sama atau berbeda, kemudian hasilnya di‑*aggregate* (digabung) melalui teknik seperti voting mayoritas (untuk klasifikasi) atau rata‑rata (untuk regresi).
> >
> > **Mengapa ensemble penting?**
> >
> > 1. **Pengurangan varians** – Model yang sangat fleksibel (misalnya pohon keputusan dalam keadaan penuh) cenderung overfit; dengan menggabungkan banyak model yang berbeda, fluktuasi prediksi pada data baru berkurang.
> > 2. **Pengurangan bias** – Kombinasi model yang masing‑masing memiliki bias berbeda dapat menyeimbangkan kesalahan sistematis, menghasilkan prediksi yang lebih netral.
> > 3. **Peningkatan ketahanan terhadap noise** – Kesalahan yang terjadi pada satu model dapat “ditutupi” oleh model lain yang tidak terpengaruh oleh noise yang sama.
> >
> > Secara statistik, peningkatan akurasi ensemble dapat dijelaskan melalui **dekomposisi bias‑variance‑covariance**: total error = bias² + variance + covariance antar model. Dengan menurunkan varians dan/atau kovarians (melalui keberagaman), error keseluruhan menurun.
> >
> > ### Wisdom of the Crowds
> >
> > Konsep *wisdom of the crowd* pertama kali dipopulerkan oleh James Surowiecki (2004) dan merujuk pada fenomena bahwa **pendapat kolektif** seringkali lebih akurat daripada pendapat individu, asalkan tiga kondisi terpenuhi: (1) **Keragaman** (diversity) – anggota kelompok memiliki informasi atau sudut pandang yang berbeda; (2) **Independensi** – masing‑masing anggota membuat keputusan tanpa dipengaruhi secara berlebihan oleh yang lain; (3) **Desentralisasi** – pengetahuan tersebar, bukan terpusat pada satu sumber.
> >
> > Dalam ensemble learning, ketiga prinsip ini diwujudkan melalui:
> >
> > - **Keragaman model** (menggunakan algoritma berbeda, parameter berbeda, atau data pelatihan yang berbeda).
> > - **Independensi** (model dilatih secara terpisah, tidak saling memengaruhi).
> > - **Desentralisasi** (setiap model “menyumbang” pengetahuannya masing‑masing).
> >
> > ![[Pasted image 20260212101820.png]]
> >
> > Analogi dokter Forrest pada slide 8 menggambarkan proses ini: setiap residen memiliki keahlian khusus; keputusan akhir diambil berdasarkan mayoritas diagnosis, sehingga mengurangi risiko kesalahan satu individu.
> >
> > ### Terminology Utama
> >
> > - **Base model / learner / estimator** – Model individu yang menjadi komponen ensemble.
> > - **Parallel ensemble** – Semua base model dilatih **secara independen** (bisa bersamaan). Contohnya adalah *homogeneous* ensemble yang menggunakan algoritma yang sama, atau *heterogeneous* ensemble yang menggabungkan algoritma berbeda.
> > - **Sequential ensemble** – Base model dilatih **bertahap**, di mana model selanjutnya memperbaiki kesalahan model sebelumnya (misalnya boosting).
> > - **Homogeneous vs Heterogeneous** – *Homogeneous* berarti semua base learner memakai algoritma yang sama (mis. semua decision tree). *Heterogeneous* berarti kombinasi algoritma yang berbeda (mis. decision tree + SVM + k‑NN).
> > - **Aggregation** – Proses menggabungkan prediksi: mayoritas voting (klasifikasi), rata‑rata (regresi), atau teknik lebih kompleks seperti weighted voting atau stacking.
> >
> > ### Parallel Ensembles
> > 
> > ![[Pasted image 20260212102049.png]]
> >
> > Pada ensemble paralel, **independensi** menjadi kunci. Karena setiap model dilatih terpisah, tidak ada “propagasi kesalahan” antar model. Keberagaman dapat dicapai melalui tiga cara utama tanpa masuk ke detail teknik khusus yang dilarang:
> >
> > 1. **Variasi data** – Menggunakan subset data yang berbeda (mis. teknik sampling).
> > 2. **Variasi algoritma** – Mengganti algoritma atau hyper‑parameter (mis. depth pohon yang berbeda).
> > 3. **Variasi representasi fitur** – Mengubah ruang fitur yang dipakai tiap model (mis. random subspace).
> >
> > Setelah semua model selesai dilatih, prediksi akhir dihasilkan dengan **model aggregation**. Pada klasifikasi, mayoritas voting menghitung kelas yang paling sering diprediksi; pada regresi, rata‑rata nilai prediksi memberikan estimasi akhir.
> > 
> > ![[Pasted image 20260212101901.png]]
> >
> > ### Heterogeneous Parallel Ensembles
> >
> > Heterogeneous ensembles memanfaatkan **keragaman algoritma** untuk menangkap pola yang mungkin tidak dapat dipelajari oleh satu jenis model saja. Misalnya, kombinasi antara pohon keputusan (yang baik dalam menangkap interaksi non‑linear) dan logistic regression (yang kuat pada hubungan linear) dapat menghasilkan prediksi yang lebih seimbang.
> >
> > Dua strategi umum untuk menggabungkan model heterogen:
> >
> > - **Weighted voting** – Setiap model diberikan bobot berdasarkan performa pada data validasi; prediksi akhir adalah kombinasi berbobot.
> > - **Meta‑learning (stacking)** – Model tingkat pertama (base learners) menghasilkan prediksi yang kemudian menjadi input bagi model tingkat kedua (meta‑learner) yang belajar cara mengoptimalkan kombinasi tersebut. Stacking dapat memperbaiki performa karena meta‑learner dapat mempelajari pola kesalahan masing‑masing base learner.
> >
> > ### Sequential Ensembles (Konsep Umum)
> >
> > Pada ensemble sekuensial, model dilatih **bertahap** sehingga setiap model baru berfokus pada contoh yang masih sulit diprediksi oleh model sebelumnya. Ide dasarnya adalah **memperbaiki kesalahan** secara iteratif. Meskipun teknik spesifik seperti AdaBoost atau Gradient Boosting dilarang untuk dijelaskan, prinsip umum ini tetap relevan: setiap iterasi menambahkan model lemah yang “mengisi celah” pada fungsi prediksi yang ada, sehingga secara kumulatif menghasilkan model kuat.
> >
> > ### Model Aggregation Techniques
> >
> > 1. **Majority Voting (Klasifikasi)** – Setiap base learner memberikan satu label; label dengan suara terbanyak dipilih. Jika ada tie, dapat dipilih berdasarkan probabilitas rata‑rata atau kebijakan lain.
> > 2. **Averaging (Regresi)** – Nilai prediksi semua model dijumlahkan dan dibagi dengan jumlah model.
> > 3. **Weighted Voting/Averaging** – Bobot diberikan kepada model berdasarkan akurasi atau metrik lain; model yang lebih baik berkontribusi lebih besar.
> > 4. **Stacking (Meta‑Learning)** – Prediksi base learner menjadi fitur baru; meta‑learner (mis. logistic regression, neural network) mempelajari cara mengkombinasikannya.
> > 5. **Blending** – Mirip stacking tetapi menggunakan subset data terpisah (hold‑out) untuk melatih meta‑learner, mengurangi risiko overfitting.
> >
> > Semua teknik ini berusaha menyeimbangkan **bias** (kesalahan sistematis) dan **varians** (fluktuasi) dengan memanfaatkan **keberagaman** dan **agregasi**.

> [!cornell] #### Summary
>
> **Ensemble learning** memanfaatkan prinsip *wisdom of the crowd* dengan menggabungkan banyak model yang beragam dan independen, sehingga mengurangi bias, varians, dan kovarians secara bersamaan. Keberagaman dapat dicapai lewat variasi data, algoritma, atau representasi fitur, sementara agregasi (voting, averaging, atau meta‑learning) menyatukan prediksi menjadi keputusan akhir yang lebih akurat. Pemilihan antara **parallel** vs **sequential**, serta **homogeneous** vs **heterogeneous**, tergantung pada sifat data, sumber daya komputasi, dan tujuan performa.

> [!ad-libitum]- Additional Information
>
> #### Advanced Topic 1 – Bias‑Variance‑Covariance Decomposition
>
> Pada ensemble, total error dapat diuraikan menjadi tiga komponen utama:
>
> - **Bias²** – Kesalahan rata‑rata model terhadap fungsi target yang sebenarnya. Model sederhana biasanya memiliki bias tinggi.
> - **Varians** – Sensitivitas model terhadap fluktuasi data pelatihan. Model kompleks (mis. pohon dalam) memiliki varians tinggi.
> - **Kovarians (atau korelasi) antar model** – Mengukur sejauh mana kesalahan dua model saling berhubungan. Jika semua model membuat kesalahan yang sama (korelasi tinggi), agregasi tidak banyak mengurangi error.
>
> Secara matematis, untuk regresi dengan rata‑rata prediksi, ekspektasi MSE (Mean Squared Error) dari ensemble $( \bar{f}(x) = \frac{1}{M}\sum_{m=1}^{M} f_m(x) )$ dapat dituliskan sebagai:
>
> $$
>
> \text{MSE}(\bar{f}) = \text{Bias}^2(\bar{f}) + \frac{1}{M}\text{Var}(f) + \left(1-\frac{1}{M}\right)\text{Cov}(f_i,f_j)
>
> $$
>
> Di sini, menurunkan **varians** dengan menambah jumlah model (M) membantu, tetapi **kovarians** tetap menjadi penghalang utama; itulah mengapa **keberagaman** (diversity) sangat penting.
>
> #### Advanced Topic 2 – Diversity Measures and Their Impact
>
> Untuk menilai seberapa beragam sebuah ensemble, beberapa metrik statistik telah dikembangkan:
>
> - **Q‑Statistic** – Mengukur korelasi biner antara dua classifier; nilai mendekati –1 menunjukkan diversitas tinggi, nilai mendekati 1 menunjukkan korelasi kuat.
> - **Correlation Coefficient** – Sama seperti Q‑Statistic tetapi untuk prediksi kontinu.
> - **Disagreement Measure** – Persentase contoh di mana dua classifier memberikan label berbeda.
> - **Double‑Fault Measure** – Persentase contoh di mana kedua classifier salah secara bersamaan; nilai rendah menandakan diversitas yang baik.
>
> Praktik umum: setelah melatih sekumpulan kandidat base learners, pilih subset dengan **maksimal diversitas** (mis. menggunakan algoritma greedy atau optimasi integer) untuk membangun ensemble yang lebih kuat.
>
> #### Advanced Topic 3 – Stacking and Meta‑Learning Architectures
>
> Stacking memperkenalkan **lapisan dua** (atau lebih) dalam arsitektur ensemble. Pada lapisan pertama, sejumlah base learners (bisa homogen atau heterogen) menghasilkan prediksi pada data pelatihan. Prediksi‑prediksi ini kemudian menjadi fitur input bagi **meta‑learner** pada lapisan kedua, yang belajar fungsi kombinasi optimal. Beberapa hal penting:
>
> 1. **Cross‑validation blending** – Untuk menghindari overfitting, prediksi base learner pada data training biasanya dihasilkan lewat k‑fold cross‑validation, sehingga meta‑learner tidak “melihat” data yang sama dengan base learner.
> 2. **Pemilihan meta‑learner** – Model linear (logistic regression) sering dipilih karena interpretabilitasnya; model non‑linear (neural network, gradient‑boosted trees) dapat menangkap interaksi kompleks antar prediksi.
> 3. **Regularisasi** – Karena meta‑learner dapat dengan mudah menyesuaikan noise, teknik regularisasi (L1/L2, dropout) penting untuk menjaga generalisasi.
>
> Stacking telah terbukti meningkatkan akurasi pada kompetisi Kaggle, terutama ketika kombinasi model sangat heterogen.
>
> #### Advanced Topic 4 – Ensemble Pruning and Resource Efficiency
>
> Meskipun menambah lebih banyak base learners biasanya menurunkan varians, **biaya komputasi** dan **latensi** dapat menjadi kendala. *Ensemble pruning* adalah proses memilih subset kecil dari model yang memberikan performa hampir sama dengan ensemble penuh. Metode pruning meliputi:
>
> - **Ranking‑based pruning** – Mengurutkan model berdasarkan akurasi individual atau kontribusi marginal pada error ensemble, kemudian mengambil top‑k.
> - **Optimization‑based pruning** – Memformulasikan pemilihan subset sebagai masalah optimasi (mis. integer programming) yang meminimalkan error sambil membatasi jumlah model.
> - **Diversity‑aware pruning** – Memilih model yang tidak hanya akurat tetapi juga tidak terlalu berkorelasi, menggunakan metrik diversitas yang disebutkan sebelumnya.
>
> Pruning tidak hanya mengurangi waktu inferensi, tetapi juga dapat meningkatkan interpretabilitas karena hanya sedikit model yang perlu dianalisis.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Stacking dari Scratch** – Gunakan tiga base learners (mis. Decision Tree, k‑Nearest Neighbors, Logistic Regression) pada dataset UCI (mis. *Wine*). Lakukan k‑fold cross‑validation untuk menghasilkan prediksi base, latih meta‑learner (Linear Regression) pada prediksi tersebut, dan bandingkan akurasi dengan masing‑masing model tunggal.
> 2. **Analisis Diversitas pada Ensemble Homogen** – Latih 20 pohon keputusan dengan parameter depth yang berbeda pada dataset *Breast Cancer*. Hitung Q‑Statistic dan Disagreement Measure antar semua pasangan model, kemudian visualisasikan distribusi diversitas. Selanjutnya, lakukan pruning berdasarkan diversitas tertinggi dan evaluasi perubahan akurasi.
>
> #### Tools and Resources
>
> - **scikit‑learn** (`sklearn.ensemble`) – Modul yang menyediakan `VotingClassifier`, `StackingClassifier`, serta fungsi untuk cross‑validation.
> - **mlxtend** – Library Python yang memudahkan implementasi stacking