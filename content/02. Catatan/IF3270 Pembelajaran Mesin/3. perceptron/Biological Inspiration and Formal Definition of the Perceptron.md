---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Biological Inspiration and Formal Definition of the Perceptron
>
> > ## Questions/Cues
> >
> > - Mengapa neuron biologis menjadi inspirasi perceptron?
> > - Bagaimana sinyal kimia‑elektrik di neuron diterjemahkan menjadi model matematis?
> > - Apa persamaan antara dendrit, soma, dan akson dengan komponen perceptron?
> > - Bagaimana perceptron merepresentasikan sebuah hyperplane keputusan?
> > - Mengapa dataset harus bersifat linearly separable untuk perceptron?
> >
> > ## Reference Points
> >
> > - Slide_01_Perceptron.pptx (Halaman 5‑8)
> > - Mitchell, T. (1997). *Machine Learning*. McGraw‑Hill (Bab 4)
> > - Raschka, S., Liu, Y., & Mirjalili, V. (2022). *Machine Learning with PyTorch and Scikit‑Learn* (Bagian 2.1)
>
> > ### Biological Inspiration: Neuron as Information Processor
> >
> > Neuron biologis merupakan unit dasar sistem saraf yang memproses sinyal kimia dan listrik. Pada model klasik McCulloch‑Pitts, neuron digambarkan sebagai gerbang logika sederhana dengan dua tahap utama: (1) **Integrasi** sinyal‑sinyal masuk pada dendrit, dan (2) **Aktivasi** bila total sinyal melampaui ambang tertentu, menghasilkan impuls listrik yang mengalir melalui akson ke neuron‑neuron berikutnya. Analogi yang sering dipakai adalah **timbangan**: setiap sinyal masuk memiliki “berat” (kekuatan sinaptik) dan semua berat dijumlahkan; bila hasil penjumlahan melebihi **threshold** (ambang), timbangan “jatuh” dan menghasilkan output.
> >
> > Pada tingkat mikroskopik, sinyal kimia (neurotransmiter) mengubah potensial membran, sementara sinyal listrik (potensial aksi) menyebar sepanjang akson. Dalam konteks komputasi, proses ini dapat disederhanakan menjadi operasi **linear** (penjumlahan berbobot) diikuti fungsi aktivasi **diskrit** (biasanya fungsi tanda atau step). Penyederhanaan ini memungkinkan kita memetakan struktur biologis ke dalam model matematis yang dapat di‑implementasikan pada komputer.
> >
> > Contoh konkret: Bayangkan sebuah jaringan jalan yang menghubungkan beberapa kota (dendrit). Setiap jalan memiliki kapasitas (bobot). Jika total kapasitas yang masuk ke sebuah persimpangan melebihi batas tertentu, lampu lalu lintas (neuron) berubah menjadi hijau, mengizinkan kendaraan (sinyal) melanjutkan perjalanan ke tujuan berikutnya (akson). Jika tidak, lampu tetap merah dan tidak ada kendaraan yang lewat.
> >
> > **Mengapa inspirasi ini penting?** Karena ia memberikan dasar biologis untuk **model linear** yang dapat dipelajari secara otomatis: bobot‑bobot dapat disesuaikan (learning) sehingga fungsi keputusan yang dihasilkan mencerminkan pola dalam data.
> >
> > ### Formal Definition: Linear Threshold Unit
> >
> > Secara formal, perceptron didefinisikan sebagai fungsi **linear threshold** yang memetakan vektor fitur $\mathbf{x} = (x_1, x_2, \dots , x_d)$ ke output biner $y \in \{-1, +1\}$. Persamaan dasarnya:
> >
> > $$
> >
> > y = \operatorname{sign}\bigl( w_0 + \sum_{j=1}^{d} w_j x_j \bigr)
> >
> > $$
> >
> > dimana:
> >
> > - $w_0$ adalah **bias** (atau bobot pada unit input konstan $x_0 = 1$) yang berfungsi menggeser hyperplane keputusan,
> > - $w_j$ (untuk $j = 1,\dots ,d$) adalah **bobot** yang mengukur kontribusi masing‑masing fitur,
> > - $\operatorname{sign}(\cdot)$ adalah fungsi aktivasi diskrit yang menghasilkan +1 bila argumen positif, dan –1 bila negatif atau nol.
> >
> > Ruang hipotesis $ \mathcal{H} = \{ \mathbf{w} \in \mathbb{R}^{d+1} \}$ berisi semua vektor bobot yang mungkin. Setiap pilihan $\mathbf{w}$ menentukan sebuah **hyperplane** (dalam dua dimensi menjadi garis, dalam tiga dimensi menjadi bidang) yang memisahkan ruang fitur menjadi dua wilayah: satu menghasilkan output +1, yang lain –1. Karena fungsi aktivasi bersifat **threshold**, perceptron hanya dapat mempelajari **konsep yang dapat dipisahkan secara linear**.
> >
> > **Contoh numerik:** Misalkan $d = 2$ dengan fitur $(x_1, x_2)$. Pilih bobot $\mathbf{w} = (w_0, w_1, w_2) = (-0.5, 1, 1)$. Maka keputusan diberikan oleh:
> >
> > $$
> >
> > y = \operatorname{sign}(-0.5 + 1\cdot x_1 + 1\cdot x_2).
> >
> > $$
> >
> > Jika titik data $(x_1, x_2) = (0,1)$ dimasukkan, nilai dalam tanda sign adalah $-0.5 + 0 + 1 = 0.5 > 0$ sehingga output +1. Titik $(0,0)$ menghasilkan $-0.5 < 0$ sehingga output –1. Hyperplane keputusan adalah garis $x_1 + x_2 = 0.5$ yang memisahkan kedua kelas.
> >
> > ### Decision Surface: Hyperplane and Linear Separability
> >
> > Hyperplane keputusan yang dihasilkan oleh perceptron dapat divisualisasikan sebagai **permukaan pemisah** dalam ruang berdimensi‑$d$. Secara geometris, hyperplane didefinisikan oleh persamaan:
> >
> > $$
> >
> > w_0 + \sum_{j=1}^{d} w_j x_j = 0.
> >
> > $$
> >
> > Semua titik yang berada tepat pada hyperplane menghasilkan nilai netral (biasanya dipetakan ke –1 atau +1 tergantung pada konvensi). Titik di satu sisi menghasilkan nilai positif (output +1), sedangkan titik di sisi lain menghasilkan nilai negatif (output –1).
> >
> > **Mengapa linear separability penting?** Jika data tidak dapat dipisahkan oleh satu hyperplane (misalnya pola XOR), tidak ada kombinasi bobot $\mathbf{w}$ yang dapat menghasilkan klasifikasi sempurna. Dalam kasus tersebut, perceptron akan berulang‑ulang memperbarui bobot tanpa pernah mencapai konvergensi. Oleh karena itu, kemampuan perceptron terbatas pada **masalah klasifikasi biner yang linearly separable**.
> >
> > **Ilustrasi dua dimensi:** Bayangkan dua kelompok titik berwarna merah dan biru pada bidang kartesius. Jika dapat digambar satu garis lurus yang memisahkan semua titik merah di satu sisi dan semua titik biru di sisi lain, maka dataset tersebut linearly separable dan perceptron dapat menemukan garis tersebut (dengan cukup iterasi). Jika tidak, misalnya titik biru berada di dalam “lubang” merah, maka tidak ada garis lurus yang memisahkan, sehingga perceptron tidak dapat menyelesaikannya.
> >
> > **Hubungan dengan model biologis:** Hyperplane dapat dianggap sebagai “ambang aktivasi” pada neuron biologis; ketika total sinyal terintegrasi melampaui ambang, neuron “menyala”. Pada perceptron, ambang ini diwakili oleh bias $w_0$ dan bobot‑bobot yang menyesuaikan kontribusi masing‑masing sinyal masuk.
> >
> > **Keterbatasan praktis:** Meskipun model sederhana, perceptron menjadi fondasi bagi jaringan saraf multilapis (multilayer perceptron) yang menambahkan lapisan non‑linear untuk mengatasi data yang tidak dapat dipisahkan secara linear.


> [!cornell] Summary
> **Perceptron** adalah model komputasi yang terinspirasi dari neuron biologis, mengubah sinyal kimia‑elektrik menjadi operasi linear terboboti diikuti fungsi aktivasi diskrit. Secara formal, ia didefinisikan oleh persamaan $y = \operatorname{sign}(w_0 + \sum w_j x_j)$ yang menghasilkan sebuah **hyperplane keputusan** di ruang fitur. Hyperplane ini memisahkan dua kelas hanya bila data **linearly separable**; bila tidak, perceptron tidak dapat menemukan solusi yang konvergen. Model ini menjadi batu loncatan penting bagi perkembangan jaringan saraf yang lebih kompleks.

> [!ad-libitum]- Additional Information
>
> #### Advanced Topic 1 – Relationship to Linear Classifiers (SVM, Logistic Regression)
>
> Perceptron dapat dipandang sebagai **linear classifier** paling dasar. Berbeda dengan Support Vector Machine (SVM), yang secara eksplisit memaksimalkan margin (jarak terdekat antara hyperplane dan contoh terdekat), perceptron hanya mencari **sebuah** hyperplane yang memisahkan data tanpa memperhatikan margin. Logistic Regression, di sisi lain, menggunakan fungsi sigmoid untuk menghasilkan probabilitas, sehingga dapat dioptimalkan dengan log‑likelihood. Kedua metode ini memperkenalkan **regularisasi** (L1/L2) untuk menghindari overfitting, sesuatu yang tidak ada pada perceptron klasik.
>
> Secara matematis, semua tiga model dapat dituliskan dalam bentuk umum:
>
> $$
>
> f(\mathbf{x}) = \mathbf{w}^\top \mathbf{x} + b,
>
> $$
>
> namun fungsi aktivasi dan kriteria optimasi berbeda. Perceptron menggunakan fungsi **sign** dan kriteria **zero‑one loss**, sementara SVM meminimalkan **hinge loss** dan Logistic Regression meminimalkan **cross‑entropy**. Perbedaan ini menjelaskan mengapa SVM dan Logistic Regression biasanya memiliki performa yang lebih stabil pada data nyata.
>
> #### Advanced Topic 2 – Limitasi Linear Separability dan Kernel Trick
>
> Keterbatasan utama perceptron adalah ketidakmampuannya menangani data yang tidak dapat dipisahkan secara linear (misalnya fungsi XOR). Salah satu cara mengatasi hal ini adalah dengan memetakan data ke **ruang berdimensi lebih tinggi** menggunakan fungsi **kernel**. Ide dasarnya mirip dengan “menambahkan dimensi baru” sehingga data menjadi linearly separable di ruang baru. Contoh kernel yang paling terkenal adalah **kernel polinomial** dan **Radial Basis Function (RBF)**. Pada dasarnya, kita tidak menghitung koordinat baru secara eksplisit, melainkan menghitung produk dalam (inner product) dalam ruang fitur yang diperluas.
>
> Meskipun kernel trick secara tradisional diasosiasikan dengan SVM, konsep yang sama dapat diterapkan pada perceptron dengan **kernel perceptron**: setiap kali memperbarui bobot, kita menyimpan contoh‑contoh pelatihan yang “aktif” dan menghitung prediksi sebagai kombinasi linear dari kernel antara contoh baru dan contoh‑contoh yang disimpan. Ini memungkinkan perceptron menangani masalah non‑linear tanpa mengubah algoritma dasarnya.
>
> #### Advanced Topic 3 – Extensi Multilayer Perceptron (MLP) dan Back‑Propagation
>
> Untuk mengatasi keterbatasan linear, jaringan saraf modern menumpuk beberapa lapisan perceptron, membentuk **Multilayer Perceptron (MLP)**. Setiap lapisan menambahkan fungsi aktivasi non‑linear (misalnya ReLU, sigmoid, tanh) sehingga jaringan dapat mempelajari representasi hierarkis. Pelatihan MLP dilakukan dengan algoritma **back‑propagation**, yang menghitung gradien kesalahan melalui rantai turunan (chain rule) dan memperbarui bobot secara simultan di semua lapisan.
>
> Secara matematis, output lapisan $l$ diberikan oleh:
>
> $$
>
> \mathbf{a}^{(l)} = \sigma\!\bigl( \mathbf{W}^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)} \bigr),
>
> $$
>
> dimana $\sigma$ adalah fungsi aktivasi non‑linear. Dengan menambahkan cukup lapisan dan neuron, MLP dapat mendekati **fungsi universal approximator**, artinya dapat mendekati fungsi kontinu apa pun pada domain tertutup dengan presisi sewenang‑wenang.
>
> #### Advanced Topic 4 – Edge Cases, Convergence Issues, dan Regularisasi
>
> Meskipun perceptron sederhana, ada beberapa **edge case** yang penting untuk dipahami:
>
> 1. **Data tidak terpisahkan** – algoritma perceptron klasik tidak konvergen; solusi meliputi penggunaan margin (Perceptron dengan margin) atau beralih ke model lain (SVM, MLP).
> 2. **Skala fitur** – bobot sangat dipengaruhi oleh skala masing‑masing fitur; normalisasi (mis. standar deviasi) dapat mempercepat konvergensi.
> 3. **Overfitting pada dataset kecil** – karena model hanya memiliki $d+1$ parameter, risiko overfitting relatif rendah, namun bila data sangat sedikit, model dapat “menghafal” noise. Regularisasi L2 (penalti $\lambda \|\mathbf{w}\|^2$) dapat menstabilkan solusi.
> 4. **Numerical stability** – fungsi sign dapat menghasilkan nilai nol pada titik tepat pada hyperplane; implementasi praktis biasanya menambahkan epsilon kecil atau menggunakan fungsi step dengan ambang terbuka.
>
> **Strategi mitigasi:**
>
> - Terapkan **feature scaling** sebelum pelatihan.
> - Jika data tidak terpisahkan, gunakan **perceptron dengan margin** atau **kernel perceptron**.
> - Tambahkan **regularisasi** untuk menghindari bobot yang sangat besar.
>
> #### Self‑Exploration Projects
>
> 1. **Visualisasi Hyperplane 2‑D/3‑D** – Buat dataset sintetis yang linearly separable (mis. dua buah awan titik Gaussian) dan implementasikan perceptron dalam Python. Plot data bersama hyperplane keputusan pada setiap iterasi untuk melihat evolusi bobot.
> 2. **Kernel Perceptron untuk XOR** – Implementasikan kernel perceptron dengan kernel polinomial derajat 2 dan tunjukkan bahwa model dapat mempelajari fungsi XOR yang tidak dapat dipisahkan secara linear. Bandingkan hasilnya dengan perceptron klasik.
>
> #### Tools and Resources
>
> - **Scikit‑learn**: `sklearn.linear_model.Perceptron` – API sederhana untuk melatih perceptron pada dataset standar.
> - **TensorFlow/Keras**: Membuat MLP dengan lapisan `Dense` dan aktivasi `relu`/`sigmoid` untuk memperluas konsep perceptron.
> - **Matplotlib** / **Plotly**: Visualisasi data dan hyperplane dalam 2‑D/3‑D.
> - **Jupyter Notebook**: Lingkungan interaktif untuk eksperimen kode dan visualisasi.
>
> #### Further Reading
>
> - Mitchell, T. *Machine Learning*, 2nd ed., McGraw‑Hill, 1997 – Bab 4 (Perceptron dan Linear Classifiers).
> - Raschka, S., Liu, Y., & Mirjalili, V. *Machine Learning with PyTorch and Scikit‑Learn*, Packt, 2022 – Bagian 2.1 (Neural Networks Foundations).
> - Bishop, C. M. *Pattern Recognition and Machine Learning*, Springer, 2006 – Chapter 4 (Linear Models).
> - Vapnik, V. *The Nature of Statistical Learning Theory*, Springer, 1995 – Untuk pemahaman mendalam tentang margin dan SVM.
> - Goodfellow, I.,