---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Convolutional Layer Operations and Hyperparameters
>
> > ## Questions/Cues
> >
> > - Operasi dasar apa yang dilakukan lapisan konvolusi?
> > - Bagaimana stride mempengaruhi dimensi output?
> > - Mengapa padding diperlukan dalam konvolusi?
> > - Peran fungsi aktivasi setelah operasi konvolusi?
> > - Bagaimana pooling mengurangi dimensi spasial?
> > - Rumus menghitung dimensi output konvolusi?
> >
> > ## Reference Points
> >
> > - IF3270 Convolutional Neural Network (Slides 35-49)
> > - Goodfellow et al., Deep Learning (Slides 37-38,44-45)
> >
>
> > ### Operasi Konvolusi Dasar
> > Lapisan konvolusi melakukan operasi matematis berupa **perkalian elemen-bijaksana (element-wise multiplication)** antara kernel/filter dengan bagian input yang sesuai, diikuti oleh **penjumlahan hasil perkalian**. Kernel bergerak melintasi seluruh input dengan pola sistematis untuk mengekstraksi fitur spasial.
> > Contoh konkret: Untuk gambar berwarna 5x5 piksel dengan 3 channel RGB, kernel 3x3x3 akan mengambil sub-region 3x3 dari setiap channel, mengalikan dengan bobot kernel yang sesuai, lalu menjumlahkan semua nilai untuk menghasilkan satu nilai output pada feature map. Proses ini diulang untuk setiap posisi kernel di seluruh gambar.
> > ### Hyperparameter: Stride dan Padding
> > **Stride** menentukan jumlah pergeseran kernel saat bergerak melintasi input. Stride 1 berarti kernel bergeser 1 piksel setiap langkah, menghasilkan output yang relatif besar. Stride 2 mengurangi ukuran output menjadi sekitar setengahnya. Contoh praktis: Input 7x7 dengan kernel 3x3 dan stride 2 menghasilkan output 3x3.
> > **Padding** menambahkan lapisan nol di sekitar input untuk mengontrol dimensi output. Padding "valid" berarti tidak ada penambahan, sementara "same" menambahkan padding untuk mempertahankan ukuran input. Contoh aplikasi: Untuk input 5x5 dengan kernel 3x3, padding 1 di semua sisi memungkinkan output tetap 5x5 (dengan stride 1).
> > ### Fungsi Aktivasi pada Detector Stage
> > Setelah operasi konvolusi linier, fungsi aktivasi non-linier seperti **ReLU (Rectified Linear Unit)** diterapkan untuk memperkenalkan non-linearitas. ReLU bekerja dengan mengubah semua nilai negatif menjadi nol (f(x) = max(0,x)). Keuntungan utamanya adalah mencegah masalah vanishing gradient dan mempercepat pelatihan dibanding fungsi sigmoid/tanh.
> > Contoh visual: Jika feature map setelah konvolusi bernilai [-0.5, 2.1, -3.0, 4.7], setelah ReLU menjadi [0, 2.1, 0, 4.7]. Transformasi ini membantu jaringan mempelajari hubungan yang lebih kompleks sambil menjaga komputasi tetap efisien.
> > ### Operasi Pooling
> > Pooling bertujuan untuk **mengurangi dimensi spasial** dan meningkatkan invariansi terhadap pergeseran kecil. **Max-pooling** adalah teknik paling umum yang mengambil nilai maksimum dalam region tertentu (biasanya 2x2). Contoh nyata: Region dengan nilai [5, 8, 3, 6] akan menghasilkan output 8 setelah max-pooling.
> > Average pooling mengambil nilai rata-rata region, sementara L2-norm pooling menggunakan norma L2. Ukuran pooling yang umum adalah 2x2 dengan stride 2, mengurangi dimensi menjadi setengahnya di setiap sumbu. Operasi ini membantu mengurangi overfitting dan beban komputasi.
> > ### Perhitungan Dimensi Output
> > Dimensi output konvolusi dihitung dengan rumus:
> > ```
> > W_out = [(W_in - F + 2P)/S] + 1
> > ```
> > dimana:
> > - W_in: Lebar/tinggi input
> > - F: Ukuran kernel (filter)
> > - P: Jumlah padding
> > - S: Nilai stride
> > Contoh numerik: Input 32x32 dengan kernel 5x5, padding 0, dan stride 1 menghasilkan output 28x28 karena (32-5+0)/1 +1 = 28. Untuk input yang sama dengan stride 2, output menjadi 14x14 [(32-5+0)/2 +1 =14].

> [!cornell] #### Summary
> **Lapisan konvolusi** melakukan ekstraksi fitur melalui operasi sliding kernel dengan mengaplikasikan hyperparameter **stride** untuk mengontrol pergeseran dan **padding** untuk mempertahankan dimensi. Fungsi aktivasi **ReLU** memperkenalkan non-linearitas penting setelah konvolusi, sementara **pooling** bertugas mengurangi dimensi spasial dan meningkatkan invariansi. Perhitungan dimensi output bergantung pada kombinasi parameter input, kernel, stride, dan padding melalui formula matematis yang terdefinisi dengan jelas.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Komputasi
> Kompleksitas operasi konvolusi bergantung pada ukuran input (W×H×C_in), ukuran kernel (K×K), dan jumlah filter (C_out). Operasi dasar yang diperlukan adalah O(W×H×C_in×K²×C_out). Teknik optimasi seperti separable convolutions dapat mengurangi kompleksitas menjadi O(W×H×C_in×K×C_out) dengan memisahkan konvolusi spasial dan channel mixing.
>
> Contoh implementasi efisien menggunakan im2col (image to column) yang mengubah operasi konvolusi menjadi perkalian matriks, memanfaatkan BLAS (Basic Linear Algebra Subprograms) yang sangat dioptimalkan pada hardware modern.
>
> #### Kasus Khusus: Dilasi dan Konvolusi Terpisah
> **Dilated convolution** memperkenalkan celah (gap) dalam kernel untuk memperluas receptive field tanpa meningkatkan parameter. Misalnya, kernel 3x3 dengan dilatasi 2 memiliki receptive field efektif 5x5. Teknik ini berguna dalam segmentasi citra medis dimana konteks spasial luas diperlukan.
>
> **Depthwise separable convolution** memisahkan operasi menjadi depthwise convolution (beroperasi pada setiap channel terpisah) diikuti pointwise convolution (kombinasi cross-channel). Metode ini mengurangi parameter secara signifikan, digunakan dalam MobileNet untuk aplikasi edge computing.
>
> #### Project Eksplorasi Mandiri
> 1. Implementasikan operasi konvolusi manual pada gambar grayscale menggunakan NumPy tanpa library deep learning. Bandingkan hasil dengan fungsi konvolusi OpenCV.
> 2. Eksperimen dengan kombinasi stride dan padding berbeda pada model CNN sederhana untuk dataset CIFAR-10. Amati pengaruhnya terhadap akurasi dan waktu pelatihan.
>
> #### Alat Implementasi Praktis
> - **TensorFlow Playground**: https://playground.tensorflow.org untuk visualisasi interaktif
> - **CNN Explainer**: https://poloclub.github.io/cnn-explainer/ untuk animasi operasi layer
> - **PyTorch Conv2D Documentation**: Tutorial resmi implementasi konvolusi https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html
>
> #### Bacaan Lanjutan
> - "A guide to convolution arithmetic for deep learning" (Vincent Dumoulin, Francesco Visin)
> - "Understanding Convolution in Deep Learning" (Tim Dettmers)
> - Kursus Deep Learning Specialization - Coursera (Andrew Ng) Modul 4: Convolutional Networks