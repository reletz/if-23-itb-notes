---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin Lanjut]]

> [!cornell] Backpropagation dalam Jaringan Konvolusional
>
> > ## Questions/Cues
> >
> > - Mengapa backpropagation diperlukan dalam CNN?
> > - Bagaimana gradien dihitung untuk kernel konvolusi?
> > - Apa perbedaan backpropagation di CNN vs ANN?
> > - Bagaimana implementasi praktis backpropagation CNN?
> > - Tantangan optimasi parameter CNN?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin (Slides 62-73)
> > - Goodfellow et al., Deep Learning (Ch. 6)
> >
>
> > ### Tinjauan Umum Backpropagation dalam CNN
> > Backpropagation pada Convolutional Neural Networks (CNN) merupakan proses kalkulasi gradien error terhadap parameter jaringan (termasuk kernel konvolusi) untuk memperbarui bobot melalui algoritma optimasi seperti Stochastic Gradient Descent. Proses ini memungkinkan CNN mempelajari fitur hierarkis secara otomatis dari data pelatihan.
> > Pada CNN, terdapat dua jenis parameter yang perlu diperbarui: bobot pada lapisan fully-connected dan nilai kernel pada lapisan konvolusi. Kompleksitas utama terletak pada perhitungan gradien untuk kernel konvolusi karena sifat operasi konvolusi yang melibatkan penerapan kernel yang sama pada seluruh wilayah input (parameter sharing).
> > Contoh: Pada jaringan dengan satu lapisan konvolusi diikuti lapisan fully-connected, gradien error harus dipropagasi balik melalui operasi matriks fully-connected terlebih dahulu, kemudian melalui operasi konvolusi untuk memperbarui nilai kernel.
> > ### Perhitungan Gradien pada Lapisan Konvolusional
> > Untuk menghitung gradien kernel konvolusi (K), digunakan aturan rantai (chain rule) melalui empat komponen utama:
> > 1. **Gradien error terhadap output** (∂E/∂O): Bergantung pada fungsi loss yang digunakan
> > 2. **Gradien output terhadap net** (∂O/∂net): Bergantung pada fungsi aktivasi
> > 3. **Gradien net terhadap feature map** (∂net/∂H): Matriks bobot lapisan berikutnya
> > 4. **Gradien feature map terhadap kernel** (∂H/∂K): Input asli yang dikonvolusi
> > Rumus umum gradien kernel:
> > ∂E/∂K = ∂E/∂O * ∂O/∂net * ∂net/∂H * ∂H/∂K
> > Dimana ∂H/∂K dihitung melalui operasi konvolusi antara input (X) dan gradien dari lapisan berikutnya.
> > Analogi: Bayangkan mengoreksi kesalahan dalam mendeteksi tepi gambar. Kesalahan di lapisan output dipetakan balik ke kernel konvolusi dengan melihat area mana pada gambar input yang paling berkontribusi terhadap kesalahan tersebut.
> > ### Contoh Implementasi Langkah Demi Langkah
> > **Kasus**: CNN sederhana dengan arsitektur Input → Konvolusi (1 kernel 3x3) → Fully Connected → Output
> > **Langkah 1: Forward Pass**
> > - Input X = matriks 5x5
> > - Konvolusi dengan kernel K (3x3) menghasilkan feature map H (3x3)
> > - H di-flatten menjadi vektor
> > - Fully connected layer dengan bobot W menghasilkan output O
> > **Langkah 2: Backward Pass**
> > 1. Hitung ∂E/∂W menggunakan error di output:
> > ∂E/∂W = (O - target) * turunan aktivasi * H
> > 2. Hitung gradien untuk kernel K:
> > ∂E/∂K = X ⨂ (∂E/∂H)
> > Dimana ⨂ menyatakan operasi konvolusi valid dan ∂E/∂H = (∂E/∂O * ∂O/∂net * W)
> > Contoh numerik: Jika error di output adalah 2.5 dan turunan ReLU di feature map adalah 0.8, gradien kernel dihitung dengan mengkonvolusi input asli dengan gradien yang telah dipropagasi.
> > ### Tantangan dan Pertimbangan Praktis
> > 1. **Vanishing Gradients**: Lapisan konvolusi bertingkat dapat menyebabkan gradien mengeksponensial kecil saat propagasi balik, terutama dengan fungsi aktivasi sigmoid/tanh. Solusi: Gunakan ReLU dan teknik inisialisasi bobot tepat.
> > 2. **Komputasi Memori**: Feature maps yang besar membutuhkan penyimpanan nilai aktivasi selama forward pass untuk backpropagation. Teknik checkpointing dapat digunakan untuk menghemat memori.
> > 3. **Parameter Sharing**: Memperbarui kernel yang sama di seluruh peta fitur memerlukan akumulasi gradien dari semua lokasi spasial sebelum pembaruan bobot.
> > 4. **Kecepatan Konvergensi**: Optimasi adaptive learning rate (Adam, RMSProp) sering diperlukan karena sensitivitas konvolusi terhadap perubahan bobot.

> [!cornell] #### Summary
> **Backpropagation dalam CNN** memungkinkan pelatihan end-to-end dengan menghitung gradien error terhadap kernel konvolusi dan bobot fully-connected melalui propagasi balik. Proses ini melibatkan **operasi konvolusi terbalik** untuk menghitung gradien kernel, memanfaatkan **parameter sharing** untuk efisiensi komputasi. Tantangan utama meliputi **manajemen memori** untuk nilai aktivasi dan **strategi optimasi** untuk menangani vanishing gradient. Implementasi praktis memerlukan **akumulasi gradien spasial** dan **penyesuaian hyperparameter** untuk mencapai konvergensi stabil.
>

> [!ad-libitum]- Additional Information
>
> #### Implementasi Matriks Jacobian
> Untuk kernel konvolusi berdimensi tinggi, gradien ∂H/∂K dapat direpresentasikan sebagai matriks Jacobian dimana setiap elemen J[i,j] = ∂H_i/∂K_j. Pada implementasi nyata, operasi ini dioptimasi menggunakan:
> - **im2col**: Mengubah blok input menjadi matriks kolom
> - **GEMM (General Matrix Multiply)**: Perkalian matriks teroptimasi BLAS
>
> Kompleksitas komputasi turunan: O(n^2 * m^2) untuk kernel m×m dan input n×n.
>
> #### Algoritma Optimasi Khusus CNN
> 1. **AdaGrad for Convolutions**: Menyesuaikan learning rate per parameter kernel
> 2. **Hessian-Free Optimization**: Pendekatan kuasi-Newton untuk permukaan loss non-konveks
> 3. **Batch Normalization**: Menstabilkan distribusi input ke lapisan konvolusi
>
> #### Perbandingan Kompleksitas
> | Operasi           | Forward Pass | Backward Pass |
> |--------------------|--------------|---------------|
> | Konvolusi 3x3      | O(n²k²)      | O(n²k⁴)       |
> | Fully-Connected    | O(mn)        | O(mn)         |
> | Max-Pooling        | O(n²)        | O(1)          |
>
> #### Self-Exploration Projects
> 1. **Implementasi Backprop Manual**: Bangun CNN mini dengan numpy (tanpa framework) yang mendukung:
> - Konvolusi 2D dengan stride dan padding
> - Perhitungan gradien kernel
> - Update parameter dengan SGD
>
> 2. **Visualisasi Gradien**: Gunakan teknik guided backpropagation untuk memvisualisasikan fitur yang dipelajari kernel pada berbagai lapisan.
>
> #### Tools dan Framework
> - **PyTorch**: `torch.nn.gradconv2d` untuk kalkulasi gradien eksplisit
> - **TensorFlow**: `tf.GradientTape` dengan operasi konvolusi khusus
> - **CuDNN**: Primitive `cudnnConvolutionBackwardFilter` untuk akselerasi GPU
>
> #### Further Reading
> - "Deep Learning" Goodfellow et al. (Ch. 9: Convolutional Networks)
> - "Neural Networks and Deep Learning" Aggarwal (Ch. 8: Backpropagation CNNs)
> - Paper: "Backpropagation Applied to Handwritten Zip Code Recognition" (LeCun 1989)
> - Tutorial: "Deriving Backpropagation for CNNs" (https://arxiv.org/abs/1605.09338)