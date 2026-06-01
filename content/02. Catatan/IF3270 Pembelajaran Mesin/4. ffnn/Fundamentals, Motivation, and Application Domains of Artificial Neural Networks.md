---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Fundamentals, Motivation, and Application Domains of Artificial Neural Networks
>
> > ## Questions/Cues
> >
> > - Mengapa ANN cocok untuk data berdimensi tinggi?
> > - Apa perbedaan utama ANN dengan metode statistik tradisional?
> > - Bagaimana ANN menangani data yang mengandung noise?
> > - Contoh aplikasi ANN di bidang kesehatan dan mengapa efektif?
> > - Faktor apa yang mempengaruhi kemampuan generalisasi ANN?
> >
> > ## Reference Points
> >
> > - Lecture_Review.pptx (Slides 2‑2)
> > - Abiodun et al., *State‑of‑the‑art in artificial neural network applications* (Heliyon 4 (11), 2018) (Pages 1‑2)
> > - Sakib et al., *Fruits Recognition Classifier using Convolutional Neural Network* (arXiv 1904.00783) (Pages 1‑1)
> > - Russell & Norvig, *Artificial Intelligence: A Modern Approach* 4th ed. (Chapter 5, 2022) (Pages 11‑12)
> > - Goodfellow, Bengio, Courville, *Deep Learning* (MIT Press, 2016) (Chapter 1‑2)
>
> > ### Apa itu Artificial Neural Network?
> >
> > Artificial Neural Network (ANN) adalah kumpulan unit komputasi sederhana yang disebut **neuron** atau **unit** yang saling terhubung membentuk jaringan. Setiap neuron menerima sekumpulan nilai masukan (biasanya disebut *feature* atau *atribut*), mengalikan masing‑masing nilai tersebut dengan bobot yang bersifat parametrik, menjumlahkannya, lalu menerapkan fungsi aktivasi non‑linear untuk menghasilkan keluaran. Ide dasar ANN terinspirasi dari cara kerja otak manusia, di mana ribuan neuron biologis berinteraksi melalui sinapsis. Namun, ANN bukanlah tiruan detail otak; ia merupakan model matematis yang menekankan kemampuan belajar dari data melalui penyesuaian bobot.
> >
> > Pada tingkat paling dasar, ANN dapat berupa **perceptron** tunggal—sebuah unit yang hanya memiliki satu lapisan input dan satu output. Ketika banyak perceptron digabungkan dalam beberapa lapisan (input, tersembunyi, output), jaringan menjadi **multilayer perceptron (MLP)** yang mampu memodelkan fungsi non‑linear yang kompleks. Keberadaan lapisan tersembunyi dan fungsi aktivasi non‑linear adalah kunci mengapa ANN dapat mengekspresikan hubungan yang jauh lebih rumit dibandingkan model linear tradisional.
> >
> > Secara umum, ANN memiliki tiga komponen utama: (1) **struktur arsitektur** (jumlah lapisan, jumlah neuron per lapisan, jenis koneksi), (2) **parameter** (bobot dan bias) yang dipelajari selama proses pelatihan, dan (3) **fungsi aktivasi** yang menentukan cara sinyal diproses di setiap neuron. Kombinasi ketiga elemen ini memungkinkan ANN untuk menyesuaikan diri dengan pola data yang sangat beragam.
> >
> > ### Motivasi Penggunaan ANN
> >
> > 1. **Kemampuan Menangani Data Berbobot Tinggi**
> >
> > Pada banyak domain modern—seperti pengenalan citra, pemrosesan bahasa alami, atau genomik—setiap contoh data dapat memiliki ribuan bahkan jutaan fitur. Metode statistik klasik (misalnya regresi linear) biasanya memerlukan reduksi dimensi atau asumsi linearitas yang kuat, yang dapat menghilangkan informasi penting. ANN, dengan lapisan tersembunyi yang mengubah representasi data secara bertahap, secara otomatis mengekstrak fitur yang relevan tanpa perlu pra‑pemrosesan intensif. Analogi yang sering dipakai adalah “pembuat resep” yang secara bertahap menambahkan bumbu hingga rasa akhir menjadi optimal.
> >
> > 2. **Robustness Terhadap Noise dan Ketidaksempurnaan Data**
> >
> > Data dunia nyata sering mengandung kesalahan pengukuran, nilai yang hilang, atau outlier. Karena ANN belajar melalui optimisasi fungsi kerugian (loss function) yang dapat dipilih untuk menoleransi noise (misalnya *Huber loss*), jaringan dapat menemukan pola yang mendasar meskipun data tidak bersih. Proses ini mirip dengan cara otak manusia mengabaikan “suara” yang tidak relevan saat mendengar percakapan.
> >
> > 3. **Kemampuan Generalisasi**
> >
> > Dengan jumlah parameter yang besar, ANN berpotensi **overfit** pada data pelatihan. Namun, teknik regularisasi (seperti dropout, L2‑regularisasi, atau early stopping) memungkinkan jaringan untuk belajar representasi yang lebih umum, sehingga performa pada data yang belum pernah dilihat tetap tinggi. Ini penting dalam aplikasi kritis seperti diagnosis medis, di mana model harus bekerja baik pada pasien baru.
> >
> > 4. **Fleksibilitas Arsitektural**
> >
> > ANN tidak terbatas pada struktur feed‑forward sederhana. Berbagai varian—seperti **Convolutional Neural Networks (CNN)** untuk data spasial, **Recurrent Neural Networks (RNN)** untuk data berurutan, atau **Graph Neural Networks (GNN)** untuk data berbentuk graf—telah dirancang khusus untuk mengekstrak pola pada tipe data tertentu. Fleksibilitas ini menjadikan ANN “alat serbaguna” yang dapat disesuaikan dengan hampir semua domain.
> >
> > 5. **Skalabilitas Komputasi**
> >
> > Kemajuan perangkat keras (GPU, TPU) dan kerangka kerja perangkat lunak (TensorFlow, PyTorch, Keras) memungkinkan pelatihan jaringan dengan jutaan parameter dalam hitungan jam. Hal ini membuka peluang bagi peneliti dan praktisi untuk bereksperimen dengan model yang lebih besar dan lebih dalam, yang sebelumnya tidak mungkin dilakukan.
> >
> > ### Domain Aplikasi ANN
> >
> > **1. Pengolahan Citra dan Video**
> >
> > CNN telah menjadi standar de‑facto dalam tugas-tugas seperti klasifikasi gambar (misalnya ImageNet), deteksi objek, segmentasi semantik, dan peningkatan resolusi (super‑resolution). Karena konvolusi secara lokal mengekstrak pola visual (tepi, tekstur, bentuk), jaringan dapat mengenali objek meskipun posisi, skala, atau pencahayaan berubah. Contoh nyata: sistem diagnostik radiologi yang mendeteksi nodul paru pada CT‑scan dengan akurasi setara atau lebih tinggi daripada radiolog manusia.
> >
> > **2. Pemrosesan Bahasa Alami (NLP)**
> >
> > Model berbasis **Transformer** (seperti BERT, GPT) menggunakan mekanisme perhatian (attention) untuk menangkap hubungan jangka panjang dalam teks. ANN dalam konteks ini memungkinkan terjemahan otomatis, analisis sentimen, penjawab pertanyaan, dan bahkan penulisan kreatif. Keunggulannya terletak pada kemampuan mempelajari representasi semantik kata secara kontekstual.
> >
> > **3. Kesehatan dan Biomedis**
> >
> > ANN digunakan untuk prediksi penyakit (misalnya diabetes, kanker), analisis genomik (menemukan varian genetik yang berhubungan dengan penyakit), serta desain obat (menilai interaksi protein‑ligand). Karena data biomedis sering bersifat multidimensi dan tidak linier, ANN memberikan keunggulan dalam menemukan pola yang tidak terlihat oleh metode statistik tradisional.
> >
> > **4. Keuangan dan Ekonomi**
> >
> > Dalam perdagangan algoritmik, ANN memprediksi pergerakan harga saham, mendeteksi anomali transaksi (fraud detection), atau menilai risiko kredit. Kemampuan jaringan untuk memodelkan hubungan non‑linear antara indikator ekonomi membuatnya cocok untuk analisis pasar yang kompleks.
> >
> > **5. Robotika dan Kendaraan Otonom**
> >
> > ANN mengendalikan persepsi (mengidentifikasi rambu lalu lintas, mengukur jarak) serta keputusan (perencanaan jalur, kontrol dinamis). Kombinasi sensorik (kamera, lidar) dan jaringan saraf memungkinkan kendaraan untuk beradaptasi dengan lingkungan yang berubah-ubah secara real‑time.
> >
> > **6. Seni dan Kreativitas**
> >
> > Generative Adversarial Networks (GAN) dan Variational Autoencoders (VAE) menghasilkan gambar, musik, atau teks yang menyerupai karya manusia. Ini membuka peluang dalam desain grafis, produksi film, dan bahkan penulisan naskah.
> >
> > **7. Sistem Rekomendasi**
> >
> > ANN mempelajari preferensi pengguna dari riwayat interaksi (klik, rating) dan menghasilkan rekomendasi yang dipersonalisasi pada platform e‑commerce atau streaming. Pendekatan ini mengatasi keterbatasan model kolaboratif tradisional yang bergantung pada kesamaan eksplisit antar‑pengguna.
> >
> > Secara keseluruhan, keberhasilan ANN di berbagai domain berasal dari tiga sifat fundamental: (a) kemampuan mengekstrak fitur secara otomatis, (b) fleksibilitas arsitektural yang dapat disesuaikan dengan tipe data, dan (c) dukungan ekosistem komputasi modern yang memungkinkan pelatihan skala besar.

> [!cornell] #### Summary
>
> **Artificial Neural Networks** merupakan kerangka komputasi yang meniru cara kerja otak melalui neuron‑neuron terhubung, memungkinkan pemodelan fungsi non‑linear yang kompleks. Motivasi utama penggunaannya meliputi kemampuan menangani data berdimensi tinggi, toleransi terhadap noise, serta fleksibilitas arsitektural yang dapat disesuaikan dengan berbagai tipe data. ANN telah terbukti efektif di bidang **pengolahan citra, bahasa alami, kesehatan, keuangan, robotika, seni, dan sistem rekomendasi**, berkat kemampuan otomatis mengekstrak fitur dan dukungan perangkat keras serta perangkat lunak modern. Keberhasilan aplikasi tersebut bergantung pada strategi regularisasi dan optimisasi yang tepat untuk memastikan **generalisasi** yang baik pada data baru.

> [!ad-libitum]- Additional Information
>
> #### Advanced Topic 1: Aktivasi dan Properti Matematisnya
>
> Fungsi aktivasi mengubah sinyal linier menjadi non‑linear, sehingga jaringan dapat mempelajari keputusan yang tidak dapat dipisahkan secara linear. Aktivasi paling umum meliputi **sigmoid**, **tanh**, **ReLU (Rectified Linear Unit)**, serta varian‑varian seperti **Leaky ReLU**, **ELU**, dan **Swish**. Secara matematis, ReLU didefinisikan sebagai \\(f(z)=\\max(0, z)\\), yang menghasilkan gradien konstan 1 untuk nilai positif dan 0 untuk nilai negatif, mempercepat konvergensi pada jaringan dalam. Namun, ReLU dapat mengalami “dead neuron” ketika bobot menghasilkan nilai negatif secara konsisten; varian seperti Leaky ReLU menambahkan kemiringan kecil pada sisi negatif untuk mengatasi masalah ini. Analisis turunan pertama dan kedua dari fungsi aktivasi penting untuk memahami stabilitas pelatihan, terutama dalam konteks **vanishing gradient** pada fungsi sigmoid atau tanh.
>
> #### Advanced Topic 2: Teknik Optimasi Pelatihan
>
> Optimasi jaringan saraf biasanya dilakukan dengan **Stochastic Gradient Descent (SGD)** dan turunannya. SGD memperbarui bobot berdasarkan perkiraan gradien pada mini‑batch, yang mengurangi biaya komputasi dibandingkan menghitung gradien pada seluruh dataset. Varian populer meliputi **Momentum**, yang menambahkan komponen kecepatan untuk mengatasi lembah‑lembah datar pada permukaan loss; **AdaGrad**, yang menyesuaikan laju belajar per‑parameter berdasarkan akumulasi kuadrat gradien; **RMSProp**, yang memperbaiki AdaGrad dengan melupakan akumulasi lama; serta **Adam**, yang menggabungkan momentum dan RMSProp menjadi algoritma adaptif yang menjadi standar de‑facto dalam banyak proyek. Pemilihan optimizer, beserta penyesuaian **learning rate schedule** (misalnya cosine annealing atau warm‑up), dapat secara signifikan mempengaruhi kecepatan konvergensi dan kualitas solusi akhir.
>
> #### Advanced Topic 3: Arsitektur Khusus – CNN, RNN, dan Transformer
>
> **Convolutional Neural Networks (CNN)** memperkenalkan operasi konvolusi yang mengekstrak pola lokal pada data grid (gambar, spektrum audio). Lapisan konvolusi menggunakan filter kecil yang dipindahkan (stride) melintasi input, menghasilkan peta fitur (feature maps) yang mengekspresikan keberadaan pola seperti tepi atau tekstur. **Pooling** (max atau average) mengurangi dimensi spasial, menambah invariansi terhadap translasi.
>
> **Recurrent Neural Networks (RNN)** dirancang untuk data berurutan (teks, sinyal waktu). Dengan mengalirkan status tersembunyi (hidden state) dari satu langkah ke langkah berikutnya, RNN dapat mengingat konteks historis. Namun, RNN tradisional mengalami masalah **vanishing/exploding gradient**, yang diatasi oleh varian **LSTM (Long Short‑Term Memory)** dan **GRU (Gated Recurrent Unit)** yang memperkenalkan gerbang‑gerbang kontrol aliran informasi.
>
> **Transformer** menggantikan mekanisme rekursif dengan **self‑attention**, yang menghitung bobot relevansi antar‑token secara paralel. Ini memungkinkan pelatihan yang jauh lebih efisien pada dataset besar dan menghasilkan model bahasa yang sangat kuat (BERT, GPT‑3). Self‑attention juga telah diadaptasi ke domain non‑teks, seperti **Vision Transformers (ViT)** untuk citra.
>
> #### Advanced Topic 4: Praktik Implementasi, Hyperparameter Tuning, dan Sumber Daya
>
> Implementasi ANN modern biasanya dilakukan dengan kerangka kerja **TensorFlow**, **PyTorch**, atau **Keras**. Kedua kerangka menyediakan API tingkat tinggi untuk mendefinisikan lapisan, fungsi aktivasi, dan optimizer, serta otomatisasi **autodiff** (automatic differentiation) yang menghitung gradien secara akurat.
>
> **Hyperparameter tuning** meliputi pencarian nilai optimal untuk learning rate, ukuran batch, jumlah lapisan, ukuran lapisan, dan jenis aktivasi. Teknik pencarian meliputi **grid search**, **random search**, serta metode berbasis model seperti **Bayesian Optimization** (misalnya paket *Optuna* atau *Hyperopt*).
>
> **Hardware acceleration**: GPU (NVIDIA CUDA) mempercepat operasi matriks besar, sementara TPU (Google) menawarkan throughput lebih tinggi untuk model berskala sangat besar. Penggunaan **mixed‑precision training** (float16) dapat mengurangi penggunaan memori tanpa mengorbankan akurasi signifikan.
>
> **Self‑Exploration Projects**
>
> 1. **Implementasi CNN untuk klasifikasi buah‑buah** menggunakan dataset publik (misalnya Fruit‑360). Bandingkan akurasi antara arsitektur sederhana (2‑lapis konvolusi) dan arsitektur modern (ResNet‑18).
> 2. **Membangun model Transformer untuk analisis sentimen bahasa Indonesia** dengan dataset ulasan produk. Eksperimen dengan variasi ukuran kepala perhatian (heads) dan kedalaman lapisan (layers) untuk mengamati trade‑off antara akurasi dan waktu pelatihan.
>
> **Tools and Resources**
>
> - **PyTorch Lightning** – kerangka kerja ringan untuk mengatur pelatihan, logging, dan checkpointing.
> - **Weights & Biases (wandb)** – platform visualisasi metrik pelatihan dan hyperparameter sweep.
> - **DeepLearning.AI Coursera Specialization** – kursus terstruktur tentang CNN, RNN, dan Transformer.
> - **Paper**: “Attention Is All You Need” (Vaswani et al., 2017); “Deep Residual Learning for Image Recognition” (He et al., 2015); “Batch Normalization: Accelerating Deep Network Training” (Ioffe & Szegedy, 2015).
>
> **Further Reading**
>
> - Goodfellow, I., Bengio, Y., & Courville, A. *Deep Learning*. MIT Press, 2016.
> - Russell, S., & Norvig, P. *Artificial Intelligence: A