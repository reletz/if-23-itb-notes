---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin IF3270]]

> [!cornell] Batch Gradient Descent Optimization
>
> > ## Questions/Cues
> >
> > - Mengapa Batch GD menggunakan seluruh dataset?
> > - Bagaimana mekanisme pembaruan bobot Batch GD?
> > - Perbedaan konsep epoch antara Batch dan Stochastic GD
> > - Keuntungan Batch GD pada error surface konveks
> > - Tantangan konvergensi pada data non-separable
> >
> > ## Reference Points
> >
> > - Perceptron IF3270 (Slides 19-26, 28-31)
> > - Raschka (2022) Chapter on Optimization (Hal 142-150)
> >
>
> > ### Pengertian Batch Gradient Descent
> > Batch Gradient Descent (BGD) adalah algoritma optimasi yang memperbarui parameter model dengan menghitung gradien error menggunakan *seluruh* dataset pelatihan pada setiap iterasi. Berbeda dengan pendekatan inkremental, BGD mengakumulasi informasi dari semua sampel sebelum melakukan pembaruan bobot.
> > Prinsip dasarnya adalah meminimalkan fungsi error (biasanya Mean Squared Error) dengan bergerak berlawanan arah gradien. Jika diibaratkan mencari lembah terendah, BGD menghitung kemiringan seluruh permukaan bukit sebelum memutuskan langkah berikutnya. Ini menjadikannya lebih stabil namun komputasional lebih berat dibanding varian stokastik.
> > Contoh penerapannya pada perceptron: Misal terdapat 100 sampel latih, BGD akan menghitung akumulasi error dari seluruh 100 sampel tersebut sebelum menyesuaikan bobot sekali saja. Pendekatan ini menjamin penurunan error konsisten ke arah gradien global.
> > ### Mekanisme Pembaruan Bobot
> > Proses pembaruan bobot dalam BGD mengikuti rumus:
> > ```
> > Δw = η * (1/m) * Σ(y_i - ŷ_i) * x_i
> > ```
> > di mana:
> > - η: Learning rate (0.1 pada contoh slide 23)
> > - m: Jumlah sampel dalam dataset
> > - y_i: Label sebenarnya
> > - ŷ_i: Prediksi model (output fungsi aktivasi)
> > - x_i: Vektor fitur
> > Pada implementasinya (Slide 23):
> > 1. Inisialisasi bobot dengan nilai kecil acak (w = [0,0,0,0])
> > 2. Untuk setiap epoch:
> > - Hitung prediksi semua sampel (o_i)
> > - Akumulasi Δw dari seluruh sampel
> > - Pembaruan bobot hanya dilakukan sekali per epoch
> > 3. Terminasi saat error konvergen
> > Contoh numerik dari slide: Dengan learning rate 0.3, bobot diperbarui setelah memproses semua sampel, menghasilkan perubahan lebih stabil dibanding pembaruan per-sampel.
> > ### Perbandingan dengan Stochastic Gradient Descent
> > Perbedaan mendasar terletak pada frekuensi pembaruan bobot (Slide 28):
> > - **Batch GD**: Pembaruan 1 kali per epoch (setelah akumulasi seluruh sampel)
> > - **Stochastic GD**: Pembaruan tiap sampel (m kali per epoch)
> > Keunggulan BGD:
> > 1. Arah gradien lebih stabil karena menggunakan informasi komplet
> > 2. Konvergensi lebih halus pada error surface konveks (Gambar slide 26)
> > 3. Deterministik - hasil reproduktif dengan inisialisasi sama
> > Kelemahan BGD:
> > 1. Komputasi berat untuk dataset besar
> > 2. Risiko terjebak minimum lokal pada error surface kompleks
> > 3. Sensitif terhadap learning rate yang tidak tepat
> > ### Tantangan Implementasi Praktis
> > Masalah utama BGD (Slide 26):
> > 1. **Konvergensi Lambat**: Diperlukan banyak epoch untuk mencapai minimum global, terutama jika learning rate kecil. Solusi: Line search adaptif.
> > 2. **Minimum Lokal**: Pada fungsi error non-konveks, BGD tidak menjamin menemukan solusi optimal global. Teknik seperti momentum dapat membantu.
> > 3. **Sensitivitas Learning Rate**: η terlalu besar menyebabkan osilasi; terlalu kecil memperlambat konvergensi. Praktik terbaik: decay schedule (η = η0 / (1 + decay*t)).
> > 4. **Non-Separabilitas Data**: Jika data tidak linearly separable, BGD akan konvergen ke solusi "terbaik" namun tidak sempurna (Slide 20). Error residual tetap ada meski dengan epoch tak terbatas.

> [!cornell] #### Summary
>
> **Batch Gradient Descent** adalah algoritma optimasi yang memperbarui parameter model berdasarkan gradien rata-rata dari *seluruh* dataset. Metode ini menjamin penurunan error konsisten namun memerlukan komputasi intensif. Keunggulan utamanya terletak pada **stabilitas konvergensi** untuk fungsi error konveks, sementara kelemahan utamanya adalah **kinerja buruk pada data berskala besar**. Implementasi praktis memerlukan pertimbangan matang terhadap **pemilihan learning rate** dan **mekanisme terminasi** untuk menghindari konvergensi prematur atau komputasi berlebihan.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Formulasi BGD
> Turunan parsial fungsi error E(w) untuk perceptron dengan aktivasi linear:
> ```
> ∂E/∂w_j = (1/m) Σ (y_i - ŷ_i) * x_ij
> ```
> Pembaruan bobot mengikuti arah steepest descent:
> ```
> w^{(t+1)} = w^{(t)} - η ∇E(w^{(t)})
> ```
> Konvergensi dijamin jika η < 2/λ_max dengan λ_max eigenvalue terbesar matriks kovarians fitur.
>
> #### Implementasi Numerik
> Kode Python sederhana untuk BGD:
> ```python
> def batch_gd(X, y, lr=0.01, epochs=100):
> w = np.zeros(X.shape[1])
> for _ in range(epochs):
> grad = np.dot(X.T, (y - np.dot(X, w))) / len(y)
> w += lr * grad
> return w
> ```
>
> #### Studi Kasus: Data Non-Linear
> Pada dataset XOR (Slide 10), BGD gagal mencapai error nol karena keterbatasan linearitas perceptron. Error residual minimum yang dapat dicapai adalah 0.5 pada contoh tersebut, menunjukkan perlunya transformasi fitur atau model non-linear.
>
> #### Tools Visualisasi
> 1. TensorFlow Playground: Eksplorasi interaktif pengaruh learning rate
> 2. Matplotlib Animasi: Visualisasi lintasan konvergensi di ruang parameter
> 3. Plotly Surface Plot: Representasi 3D error surface
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan BGD untuk regresi linear dengan dataset Boston Housing. Bandingkan kecepatan konvergensi vs SGD.
> 2. Modifikasi algoritma dengan Nesterov Momentum dan analisis pengaruhnya terhadap kecepatan konvergensi.
> 3. Eksperimen dengan adaptive learning rate (Adam vs Adagrad) pada kasus data tidak terpisah linier.
>
> #### Bacaan Lanjutan
> - "Convex Optimization" oleh Boyd & Vandenberghe (Bab 9: Unconstrained Minimization)
> - "Neural Networks and Learning Machines" oleh Haykin (Bab 3: Gradient Descent)
> - Paper: "Understanding Machine Learning: From Theory to Algorithms" (Shalev-Shwartz & Ben-David)
> - Dokumentasi SciPy: Optimasi Non-Linier dengan Metode Quasi-Newton