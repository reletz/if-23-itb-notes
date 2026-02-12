---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Fundamentals of Artificial Neural Networks (ANN) Architecture
>
> > ## Questions/Cues
> >
> > - Mengapa ANN cocok untuk data atribut kompleks?
> > - Bagaimana arsitektur FFNN berbeda dengan perceptron?
> > - Apa fungsi lapisan tersembunyi dalam ANN?
> > - Mengapa XOR menjadi benchmark penting untuk ANN?
> > - Bagaimana representasi grafis ANN menjelaskan aliran informasi?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin (Slides 1-41)
> > - Mitchell, Machine Learning (1997)
> > - Raschka, Machine Learning with Pytorch and Scikit-Learn (Chapter 11)
> > - Goodfellow, Deep Learning (2016)
> >
>
> > ### Pengantar Jaringan Saraf Tiruan
> > Jaringan Saraf Tiruan (JST/ANN) merupakan model komputasi yang terinspirasi oleh sistem saraf biologis. ANN terdiri dari unit-unit pemrosesan sederhana (neuron) yang saling terhubung dan bekerja secara paralel untuk menyelesaikan tugas pembelajaran. **Keunggulan utama ANN** terletak pada kemampuannya mempelajari pola kompleks dari data mentah dengan banyak atribut, menangani noise dalam data, dan menghasilkan output fleksibel (diskrit, kontinu, atau vektor).
> > 
> > ANN cocok untuk masalah dimana:
> > - Data memiliki banyak atribut (high-dimensional)
> > - Output yang diinginkan bisa beragam bentuk
> > - Data training mungkin mengandung kesalahan
> > - Waktu pelatihan yang lama dapat ditoleransi
> > - Interpretasi model tidak menjadi prioritas utama
> > - 
> > ### Arsitektur Dasar ANN
> > **Tiga komponen utama arsitektur ANN**:
> > 1. **Lapisan Input**: Menerima data masukan (misal: fitur-fitur vektor)
> > 2. **Lapisan Tersembunyi**: Melakukan transformasi non-linear melalui fungsi aktivasi
> > 3. **Lapisan Output**: Menghasilkan prediksi akhir
> > 
> > **Perceptron** merupakan bentuk ANN paling sederhana dengan hanya lapisan input dan output. **Multi-Layer Perceptron (MLP)** memperkenalkan lapisan tersembunyi yang memungkinkan pemodelan hubungan non-linear kompleks. Setiap neuron pada lapisan tersembunyi menerima input dari seluruh neuron di lapisan sebelumnya (fully connected) dan mengaplikasikan fungsi aktivasi seperti sigmoid atau ReLU.
> > 
> > **Contoh analogi**: Bayangkan ANN sebagai pabrik pengolahan data dimana setiap departemen (lapisan tersembunyi) melakukan spesialisasi pengolahan tertentu sebelum hasil akhir dikirim ke manajemen (lapisan output).
> > ### Klasifikasi Arsitektur ANN
> > 
> > **Feedforward Neural Network (FFNN)**:
> > - Aliran informasi satu arah (input → hidden → output)
> > - Tidak memiliki siklus/loop (acyclic)
> > - Contoh: MLP untuk klasifikasi gambar
> > 
> > **Recurrent Neural Network (RNN)**:
> > - Memiliki feedback loop yang memungkinkan "memori"
> > - Cocok untuk data sekuensial (teks, time-series)
> > - **Tidak dibahas detail dalam catatan ini**
> > 
> > **Visualisasi arsitektur** dapat menggunakan representasi grafis dimana node merepresentasikan neuron dan edge merepresentasikan bobot koneksi. Kedalaman (depth) jaringan ditentukan oleh jumlah lapisan tersembunyi.
> > ### Penyelesaian Masalah XOR dengan ANN
> > Masalah XOR menjadi benchmark penting karena:
> > - Tidak dapat diselesaikan oleh perceptron tunggal (linear inseparability)
> > - Membutuhkan minimal satu lapisan tersembunyi dengan dua neuron
> > 
> > **Implementasi dengan fungsi aktivasi sigmoid**:
> > - Neuron tersembunyi pertama: `h1 = σ(-10 + 20x1 + 20x2)`
> > - Neuron tersembunyi kedua: `h2 = σ(30 - 20x1 - 20x2)`
> > - Neuron output: `y = σ(-30 + 20h1 + 20h2)`
> > 
> > **Implementasi alternatif dengan ReLU**:
> > - Menggunakan fungsi aktivasi ReLU di lapisan tersembunyi
> > - Output linear menunjukkan fleksibilitas desain arsitektur
> > 
> > Contoh ini menunjukkan bagaimana lapisan tersembunyi **membuat transformasi non-linear** yang mengubah masalah non-linear menjadi separable secara linear di ruang fitur baru.

> [!cornell] #### Summary
>
> **Jaringan Saraf Tiruan (ANN)** adalah model komputasi terinspirasi biologis yang terdiri dari neuron-neuron terhubung dalam lapisan input, tersembunyi, dan output. **Feedforward Neural Network (FFNN)** merupakan arsitektur dasar dengan aliran informasi searah tanpa loop, cocok untuk masalah klasifikasi dan regresi kompleks. **Lapisan tersembunyi** memungkinkan ANN mempelajari representasi non-linear, seperti terbukti dalam penyelesaian masalah XOR yang membutuhkan minimal satu lapisan tersembunyi. **Pemilihan arsitektur** (jumlah lapisan, neuron, fungsi aktivasi) merupakan faktor krusial yang menentukan kemampuan pemodelan ANN.
>

> [!ad-libitum]- Additional Information
>
> #### Perkembangan Terkini Arsitektur ANN
> Dalam dekade terakhir, berkembang berbagai varian arsitektur seperti Convolutional Neural Networks (CNN) untuk pemrosesan gambar, Transformer untuk pemrosesan bahasa alami, dan Graph Neural Networks untuk data berbasis graf. Inovasi terbaru fokus pada arsitektur yang lebih efisien secara komputasi seperti MobileNet untuk aplikasi edge computing dan Neural Architecture Search (NAS) untuk desain otomatis arsitektur optimal.
>
> #### Tantangan Desain Arsitektur
> - **Vanishing/Exploding Gradients**: Masalah pada jaringan sangat dalam yang menyulitkan pelatihan
> - **Overfitting**: Risiko tinggi ketika jumlah parameter sangat besar dibanding ukuran dataset
> - **Interpretabilitas**: Kesulitan memahami keputusan model kompleks ("black box problem")
> - **Resource Intensity**: Kebutuhan komputasi tinggi untuk arsitektur berskala besar
>
> #### Aplikasi ANN di Berbagai Bidang
> 1. **Kesehatan**: Deteksi kanker dari citra medis
> 2. **Keuangan**: Prediksi risiko kredit
> 3. **Otomotif**: Sistem navigasi otonom
> 4. **Pertanian**: Prediksi hasil panen berdasarkan data iklim
> 5. **Energi**: Optimasi distribusi listrik smart grid
>
> #### Tools untuk Eksperimen
> - **TensorFlow Playground**: https://playground.tensorflow.org
> - **NN-SVG**: Tools visualisasi arsitektur jaringan
> - **Keras Tuner**: Otomasi hyperparameter tuning
>
> #### Bacaan Lanjutan
> - "Neural Networks and Deep Learning" oleh Michael Nielsen (online book)
> - "Deep Learning Specialization" oleh Andrew Ng (Coursera)
> - Jurnal Nature: "Deep learning for predicting complex traits in plants"