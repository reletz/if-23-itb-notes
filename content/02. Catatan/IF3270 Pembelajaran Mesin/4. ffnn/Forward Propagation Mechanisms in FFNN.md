---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin]]

> [!cornell] Forward Propagation Mechanisms in FFNN
>
> > ## Questions/Cues
> >
> > - Bagaimana alur informasi dalam forward propagation?
> > - Peran fungsi aktivasi dalam perhitungan output?
> > - Contoh implementasi XOR dengan aktivasi berbeda?
> > - Perbedaan input vector vs mini-batch processing?
> > - Bagaimana menghitung parameter di Keras?
> >
> > ## Reference Points
> >
> > - Lecture_ANN_IF3270.pdf (Halaman 12-20, 22-25)
> > - Goodfellow et al. Deep Learning (Halaman 17-21)
> > - Raschka Machine Learning with PyTorch (Halaman 13-14)
> >
>
> > ### Mekanisme Dasar Forward Propagation
> > Forward propagation adalah proses perhitungan output jaringan saraf dengan mengalirkan informasi dari input layer melalui hidden layer menuju output layer. Pada FFNN (Feed Forward Neural Network), aliran ini bersifat satu arah tanpa adanya loop atau siklus.
> > Setiap neuron menerima input berupa bobot (weights) yang dikalikan dengan nilai input sebelumnya, kemudian dijumlahkan dan ditambahkan bias. Hasil penjumlahan ini kemudian diproses oleh fungsi aktivasi untuk menghasilkan output neuron tersebut. Misalnya, untuk neuron hidden layer pertama:
> > h1 = f(w1 * x1 + w2 * x2 + b), dimana f adalah fungsi aktivasi.
> > Contoh analogi: Bayangkan sistem pipa air dimana input adalah tekanan awal, setiap sambungan pipa (neuron) mengatur aliran dengan katup (bobot), dan fungsi aktivasi seperti filter yang mengubah karakteristik aliran.
> > ### Fungsi Aktivasi dan Perannya
> > Fungsi aktivasi menentukan apakah suatu neuron akan "menyala" berdasarkan input yang diterima. Dua fungsi umum:
> > 1. **Sigmoid**: Mengkompres nilai ke rentang 0-1, cocok untuk klasifikasi biner
> > σ(z) = 1/(1+e^(-z))
> > 2. **ReLU**: Mengembalikan 0 untuk input negatif dan nilai linear untuk positif
> > ReLU(z) = max(0, z)
> > Pada contoh XOR, fungsi sigmoid memungkinkan jaringan mempelajari keputusan non-linear. ReLU sering digunakan di hidden layer karena efisiensi komputasi dan mitigasi masalah vanishing gradient.
> > ### Studi Kasus: Implementasi XOR
> > **Model Sigmoid** (Halaman 15-16):
> > - Hidden layer:
> > h1 = σ(-10 + 20x1 + 20x2)
> > h2 = σ(30 - 20x1 - 20x2)
> > - Output:
> > y = σ(-30 + 20h1 + 20h2)
> > **Model ReLU + Linear** (Halaman 18):
> > - Hidden layer:
> > h1 = ReLU(0 + x1 + x2)
> > h2 = ReLU(-1 + x1 + x2)
> > - Output linear:
> > y = 0 + h1 - 2h2
> > Kedua model menunjukkan bagaimana kombinasi fungsi aktivasi dan arsitektur layer dapat menyelesaikan masalah non-linear seperti XOR.
> > ### Pemrosesan Input Vector vs Mini-Batch
> > **Input Vector** (Single Instance):
> > - Perhitungan dilakukan per sampel
> > - Formula: f(x) = f2(why^T * f1(wxh^T * x + c) + b)
> > **Mini-Batch** (Multiple Instances):
> > - Diolah secara paralel menggunakan operasi matriks
> > - Formula: f(X) = f2(f1(X * wxh + c) * why + b)
> > - Memanfaatkan optimasi GPU untuk komputasi cepat
> > Contoh XOR mini-batch (Halaman 20) menunjukkan efisiensi komputasi saat memproses banyak data sekaligus.
> > ### Implementasi Praktis dengan Keras
> > Kode dasar FFNN 3-layer (Halaman 24):
> > ```python
> > model = Sequential()
> > model.add(Dense(12, input_dim=8, activation='relu'))  # Hidden layer 1
> > model.add(Dense(8, activation='relu'))               # Hidden layer 2
> > model.add(Dense(1, activation='sigmoid'))            # Output layer
> > ```
> > **Perhitungan Parameter** (Halaman 25):
> > - Layer 1: (8 input + 1 bias) * 12 neuron = 108
> > - Layer 2: (12 input + 1 bias) * 8 neuron = 104
> > - Output: (8 input + 1 bias) * 1 neuron = 9
> > - Total: 221 parameter

> [!cornell] #### Summary
> **Forward propagation** adalah inti dari proses inferensi FFNN yang menghitung output berdasarkan input dan bobot jaringan. **Fungsi aktivasi** seperti Sigmoid dan ReLU memungkinkan pembelajaran pola non-linear, diimplementasikan dalam contoh XOR dengan dua pendekatan berbeda. Pemrosesan **mini-batch** meningkatkan efisiensi komputasi melalui paralelisasi matriks. Implementasi praktis di Keras menunjukkan bagaimana menghitung parameter dan membangun arsitektur bertingkat. **Kemampuan FFNN** dalam memodelkan hubungan kompleks bergantung pada konfigurasi bobot, fungsi aktivasi, dan kedalaman jaringan.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Komputasi
> Kompleksitas forward propagation untuk jaringan dengan L layer adalah O(Σ l=1^L n_l * n_{l-1}), dimana n_l adalah jumlah neuron di layer ke-l. Operasi dominan adalah perkalian matriks-vektor. Pada GPU modern, operasi ini dioptimasi melalui paralelisasi tinggi.
>
> #### Optimasi Numerik
> Teknik seperti batch normalization dan initialisasi bobot cerdas (He/Glorot) meningkatkan stabilitas numerik selama forward propagation. Untuk jaringan sangat dalam, floating point 16-bit (FP16) sering digunakan untuk mempercepat komputasi.
>
> #### Edge Cases Penting
> 1. **Input Nol**: Beberapa fungsi aktivasi seperti ReLU menghasilkan output nol untuk input negatif
> 2. **Saturasi Fungsi**: Sigmoid dan tanh dapat mengalami saturasi pada nilai ekstrim, menghilangkan gradien
> 3. **Ketergantungan Bobot**: Inisialisasi bobot tidak tepat menyebabkan semua neuron mempelajari pola sama (symmetry breaking problem)
>
> #### Proyek Eksperimen Mandiri
> 1. Bangun FFNN dari scratch menggunakan NumPy untuk dataset MNIST, bandingkan waktu komputasi untuk input single vs batch
> 2. Eksplorasi pengaruh fungsi aktivasi berbeda (Swish, GELU) pada akurasi model XOR
> 3. Visualisasi distribusi aktivasi layer menggunakan TensorBoard
>
> #### Alat dan Referensi Lanjut
> - **Tools**: TensorFlow Playground, Netron (Visualizer Arsitektur)
> - **Buku**: "Neural Networks and Deep Learning" oleh Michael Nielsen
> - **Paper**: "Understanding the difficulty of training deep feedforward neural networks" (Glorot & Bengio, 2010)
> - **Dataset**: UCI Machine Repository untuk masalah klasifikasi non-linear