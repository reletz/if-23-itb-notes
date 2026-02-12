---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin]]

> [!cornell] CNN Architectural Design Patterns
>
> > ## Questions/Cues
> >
> > - Mengapa LeNet-5 menggunakan urutan konvolusi-pooling-berulang?
> > - Bagaimana evolusi arsitektur CNN meningkatkan akurasi model?
> > - Apa fungsi lapisan FC dalam arsitektur CNN modern?
> > - Bagaimana perbedaan pola desain LeNet-5 vs CNN-XGBoost?
> > - Mengapa arsitektur CNN cenderung semakin dalam?
> >
> > ## Reference Points
> >
> > - IF3270_Pembelajaran_Mesin.pptx (Halaman 12, 37-40, 52-58)
> > - Deep Learning (Goodfellow et al.) (Halaman 326-330)
> > - LeCun (1998) Gradient-based learning applied to document recognition
> >
>
> > ### Sejarah Perkembangan Arsitektur CNN
> > Arsitektur Convolutional Neural Network (CNN) telah mengalami lima era perkembangan utama sejak kemunculannya pada 1980-an. Awalnya terinspirasi dari sistem visual biologis, CNN pertama seperti LeNet-5 dirancang untuk tugas sederhana seperti pengenalan digit tulisan tangan. Pada era stagnasi (1990-2000), keterbatasan komputasi menghambat pengembangan model yang lebih dalam. Kebangkitan terjadi pada 2012 dengan keberhasilan AlexNet dalam ImageNet, diikuti ledakan inovasi arsitektur seperti VGG, ResNet, dan Transformer-based models.
> > Perkembangan ini ditandai dengan peningkatan kedalaman jaringan (dari 5 lapisan di LeNet-5 hingga >100 lapisan di ResNet), teknik koneksi residual, serta integrasi mekanisme perhatian (attention). Pola desain modern sering mengadopsi blok modular yang dapat diulang, berbeda dengan pendekatan sekuensial linier di arsitektur awal.
> > ### Pola Desain Dasar CNN
> > Arsitektur CNN umumnya mengikuti pola berulang: **Konvolusi → Aktivasi → Pooling** yang diulang beberapa kali sebelum lapisan _Fully Connected_ (FC). Contoh pada LeNet-5:
> > 1. **Input** → **Conv1** (6 filter 5x5) → **AvgPool1** (2x2)
> > 2. **Conv2** (16 filter 5x5) → **AvgPool2** (2x2)
> > 3. **Flatten** → **FC1** (120 neuron) → **FC2** (84 neuron) → **Output**
> > Pola ini memungkinkan ekstraksi fitur hierarkis: lapisan awal menangkap pola lokal (tepi, tekstur), lapisan tengah mengombinasikannya menjadi bagian objek (mata, telinga), lapisan akhir mengenali objek utuh. Implementasi modern menggantikan average pooling dengan max pooling dan menambahkan normalisasi batch setelah konvolusi.
> > ### Variasi Arsitektur Modern
> > **Hybrid CNN-XGBoost**: Mengganti lapisan FC dengan Extreme Gradient Boosting untuk klasifikasi multi-label. Contoh implementasi:
> > ```python
> > base_model = VGG16(weights='imagenet', include_top=False)
> > x = base_model.output
> > x = GlobalAveragePooling2D()(x)
> > predictions = XGBClassifier().fit(x_train, y_train).predict(x)
> > model = Model(inputs=base_model.input, outputs=predictions)
> > ```
> > **Arsitektur Multi-Input**: Memproses teks dan gambar secara paralel:
> > 1. **Branch Gambar**: Seri konvolusi-pooling
> > 2. **Branch Teks**: Embedding → Conv1D → Pooling
> > 3. **Gabungan**: Concatenate → FC → Output
> > **Desain Modular** (contoh: Inception Module): Menggunakan beberapa ukuran filter secara paralel (1x1, 3x3, 5x5) lalu menggabungkan hasilnya, memungkinkan jaringan memilih kombinasi filter optimal secara otomatis.

> [!cornell] #### Summary
>
> **Pola desain arsitektur CNN** berevolusi dari struktur sekuensial sederhana (LeNet-5) menjadi jaringan modular dalam-dalam dengan koneksi residual dan mekanisme perhatian. **LeNet-5 memperkenalkan pola dasar** konvolusi-pooling-berulang yang masih menjadi fondasi desain modern, sementara arsitektur hybrid seperti **CNN-XGBoost menunjukkan fleksibilitas** integrasi dengan metode lain. Tren utama meliputi peningkatan kedalaman jaringan, penggunaan blok bangun berulang, dan optimasi untuk komputasi efisien. **Implementasi praktis** memanfaatkan framework seperti Keras/TensorFlow dengan pola layer yang terstandarisasi.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Arsitektur
>
> | Arsitektur | Kedalaman | Inovasi Kunci | Akurasi Top-1 ImageNet |
> |------------|-----------|---------------|------------------------|
> | LeNet-5 (1998) | 7 layer | Pooling bertingkat | 99.2% (MNIST) |
> | AlexNet (2012) | 8 layer | ReLU, Dropout | 63.3% |
> | VGG-16 (2014) | 16 layer | 3x3 filter bertumpuk | 71.5% |
> | ResNet-50 (2015) | 50 layer | Skip connections | 76.6% |
>
> **Pola Emergen**: Arsitektur terkini mengadopsi "network-in-network" melalui 1x1 convolution untuk reduksi dimensi dan inverted residual blocks pada model mobile-optimized seperti MobileNetV3.
>
> #### Implementasi dengan Framework Modern
>
> Contoh implementasi LeNet-5 menggunakan TensorFlow 2.x:
> ```python
> model = tf.keras.Sequential([
> layers.Conv2D(6, (5,5), activation='tanh', input_shape=(32,32,1)),
> layers.AveragePooling2D(),
> layers.Conv2D(16, (5,5), activation='tanh'),
> layers.AveragePooling2D(),
> layers.Flatten(),
> layers.Dense(120, activation='tanh'),
> layers.Dense(84, activation='tanh'),
> layers.Dense(10, activation='softmax')
> ])
> ```
> Modifikasi kinerja tinggi: Ganti aktivasi tanh → ReLU, tambahkan BatchNormalization setelah setiap konvolusi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. **Implementasi Arsitektur Historis**: Bangun LeNet-5 dari nol menggunakan NumPy saja, bandingkan performa dengan versi TensorFlow pada dataset MNIST.
> 2. **Desain Arsitektur Hibrid**: Kombinasikan CNN dengan Transformer untuk klasifikasi video, menggunakan CNN untuk ekstraksi fitur spasial dan Transformer untuk pemodelan temporal.
> 3. **Optimasi untuk Edge Devices**: Modifikasi VGG16 dengan teknik depthwise separable convolution (MobileNet) dan ukur trade-off akurasi vs latency pada Raspberry Pi.
>
> #### Alat dan Sumber Daya
>
> - **Visualisasi Arsitektur**: Netron (https://netron.app/) untuk melihat diagram model
> - **Repositori Model**: TensorFlow Hub (https://tfhub.dev/) untuk arsitektur pra-latih
> - **Dataset Benchmark**: ImageNet-1K, CIFAR-100, Pascal VOC
> - **Buku Lanjutan**: "Deep Learning for Computer Vision" (Rajalingappaa Shanmugamani)
>
> #### Bacaan Lebih Lanjut
>
> - [Paper] "Deep Residual Learning for Image Recognition" (He et al., 2015)
> - [Tutorial] "CNN Architectures: From LeNet to EfficientNet" (Paperspace Blog)
> - [Buku] "Hands-On Neural Networks with Keras" (Leonardo De Marchi)
> - [Kursus] "Advanced Computer Vision with TensorFlow" (Coursera Specialization)