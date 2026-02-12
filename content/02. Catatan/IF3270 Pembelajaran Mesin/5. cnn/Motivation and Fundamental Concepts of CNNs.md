---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Motivasi dan Konsep Dasar CNN
>
> > ## Questions/Cues
> >
> > - Mengapa ANN tidak efektif untuk klasifikasi gambar?
> > - Bagaimana CNN mengatasi masalah dimensi tinggi?
> > - Apa keunggulan model dalam dibanding dangkal?
> > - Mengapa CNN lebih efisien secara komputasi?
> > - Bagaimana cara kerja visi komputer vs manusia?
> >
> > ## Reference Points
> >
> > - Lecture_CNN.pptx (Halaman 6-19, 34-37)
> > - Deep Learning Book Reference (Halaman 8-10)
> > - Khan Survey Paper (Halaman 12)
> >
>
> > ### Keterbatasan ANN untuk Pemrosesan Gambar
> > Jaringan saraf tiruan tradisional (ANN) menghadapi tantangan signifikan saat memproses data gambar. Gambar digital direpresentasikan sebagai array multidimensi piksel (tinggi × lebar × saluran warna). Untuk gambar beresolusi 1024×1024 RGB, ANN harus memproses lebih dari 3 juta parameter input. Pendekatan flattening (meratakan gambar menjadi vektor 1D) menyebabkan hilangnya fitur spasial penting seperti tepi, pola lokal, dan hubungan geometris antar objek.
> > 
> > Contoh konkret: Gambar kucing 32x32 piksel RGB akan menjadi vektor input dengan 3.072 fitur (32×32×3). Lapisan tersembunyi pertama dengan 1.000 neuron akan menghasilkan lebih dari 3 juta parameter yang harus dilatih. Ini menyebabkan masalah komputasi dan berpotensi overfitting ketika dataset terbatas. Masalah ini dikenal sebagai kutukan dimensionalitas (curse of dimensionality), di mana kompleksitas model tumbuh secara eksponensial dengan dimensi input.
> > ### Peran Deep Learning dan CNN
> > Convolutional Neural Network (CNN) muncul sebagai solusi biologis yang terinspirasi dari sistem visual mamalia. Berbeda dengan ANN tradisional, CNN mempertahankan struktur spasial gambar melalui operasi konvolusi hierarkis. Lapisan awal mendeteksi fitur dasar seperti tepi dan tekstur, sementara lapisan yang lebih dalam mengkombinasikannya menjadi bentuk kompleks seperti mata atau bulu.
> > 
> > Keunggulan utama CNN terletak pada kemampuan ekstraksi fitur otomatis. Contoh praktis: Tanpa pemrograman eksplisit, CNN dapat mempelajari bahwa keberadaan kombinasi tepi melengkung dan garis vertikal mungkin mengindikasikan keberadaan roda mobil. Efisiensi komputasi CNN berasal dari penggunaan kernel yang dibagi parameter (parameter sharing) dan konektivitas lokal, walau mekanisme ini telah dibahas di materi lain.
> > 
> > ### Keuntungan Arsitektur Dalam
> > Teorema Universal Approximator menyatakan bahwa jaringan saraf dengan satu lapisan tersembunyi dapat mengaproksimasi fungsi apa pun. Namun praktik menunjukkan bahwa model dalam (deep) memiliki keunggulan generalisasi lebih baik. Pada eksperimen LeCun (1989), CNN dengan 4 lapisan mencapai akurasi 98.4% pada pengenalan digit tulisan tangan, sementara ANN dangkal hanya 87% dengan parameter 3x lebih banyak.
> > 
> > Alasan utama kedalaman meningkatkan performa: (1) Representasi hierarkis fitur yang analog dengan cara korteks visual mamalia memproses informasi, (2) Penggunaan kembali parameter melalui operasi konvolusi mengurangi risiko overfitting, dan (3) Kemampuan menangkap abstraksi bertingkat dari piksel → tepi → pola → objek parsial → objek utuh.
> > 
> > ### Efisiensi Komputasional CNN
> > CNN mencapai efisiensi melalui dua prinsip utama (tanpa menjelaskan mekanisme teknis). Untuk gambar 320×280, operasi deteksi tepi dengan kernel 3×3 hanya memerlukan ~268.000 operasi, sangkan ANN memerlukan >8 miliar operasi. Pengurangan kompleksitas ini memungkinkan pelatihan model pada hardware konsumen modern.
> > 
> > Contoh historis: Arsitektur LeNet-5 (1998) untuk pengenalan digit tulisan tangan hanya membutuhkan 60.000 parameter dibandingkan jutaan pada ANN setara. Model ini memanfaatkan pola lokal dalam gambar melalui operasi konvolusi berlapis, yang kemudian menjadi fondasi arsitektur CNN modern seperti AlexNet dan ResNet.

> [!cornell] #### Summary
>
> **Convolutional Neural Network (CNN)** merupakan terobosan penting dalam deep learning untuk pemrosesan data grid-like seperti gambar. **Keunggulan utama CNN** terletak pada preservasi fitur spasial dan efisiensi komputasi melalui operasi konvolusi berlapis. Dibanding ANN tradisional, CNN **mengurangi parameter secara signifikan** sambil **meningkatkan akurasi** pada tugas visi komputer. Arsitektur dalam CNN memungkinkan **ekstraksi fitur hierarkis otomatis** dari level rendah (tepi, tekstur) hingga tinggi (bentuk kompleks).
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Kutukan Dimensionalitas
> Masalah dimensionalitas formal dapat dimodelkan dengan ruang fitur berdimensi tinggi. Untuk dataset dengan `d` fitur independen dan `n` sampel, kepadatan data berkurang secara eksponensial sebagai `(1/n)^(1/d)`. Pada gambar 100×100 RGB (d=30.000), dibutuhkan dataset berukuran `10^30.000` untuk mencapai kepadatan setara dataset 1D dengan 10 sampel. CNN mengatasi ini melalui translasi invarian dan ekstraksi fitur lokal.
>
> #### Evolusi Historis CNN
> Perkembangan CNN melalui lima era: (1) Prinsip dasar oleh Fukushima (1980), (2) Implementasi praktis LeNet (1990), (3) Kebangkitan kembali pasca ImageNet 2012, (4) Dominasi arsitektur seperti VGG/ResNet, (5) Inovasi kontemporer dengan attention mechanisms. Kemajuan hardware (GPU) dan dataset besar (ImageNet) menjadi katalis utama adopsi CNN.
>
> #### Perbandingan dengan Model Deep Learning Lain
> ![Perbandingan Arsitektur](https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZafnvC4hj1etSyQeyeHvFQ.png)
> - **RNN**: Optimal untuk data sekuensial (teks/sinyal temporal)
> - **Autoencoder**: Fokus pada kompresi dan rekonstruksi fitur
> - **Transformers**: Dominan di NLP dengan mekanisme attention
> - **CNN**: Tetap unggul untuk tugas visi murni karena bias induktif spasial
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan MLP sederhana untuk klasifikasi MNIST dan bandingkan kompleksitas parameternya dengan CNN sederhana
> 2. Eksperimen dengan dimensionality reduction (PCA) pada fitur gambar sebelum input ke ANN, analisis dampak pada akurasi
> 3. Visualisasi perbedaan representasi fitur di lapisan awal vs akhir CNN menggunakan teknik seperti DeepDream
>
> #### Bacaan Lanjutan
> - Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning* (Bab 9: Convolutional Networks)
> - LeCun, Y., Bengio, Y., & Hinton, G. (2015). [Deep learning review in Nature](https://www.nature.com/articles/nature14539)
> - Khan, A., et al. (2020). [Survey of CNN Architectures](https://link.springer.com/article/10.1007/s10462-020-09825-6)
> - Kursus Online: [Deep Learning Specialization (Coursera)](https://www.coursera.org/specializations/deep-learning)