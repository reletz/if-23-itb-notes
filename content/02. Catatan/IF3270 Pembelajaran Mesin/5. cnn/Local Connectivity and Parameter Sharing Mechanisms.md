---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin]]

> [!cornell] Local Connectivity and Parameter Sharing Mechanisms
>
> > ## Questions/Cues
> >
> > - Mengapa konektivitas lokal meningkatkan generalisasi CNN?
> > - Bagaimana mekanisme berbagi parameter mengurangi kompleksitas?
> > - Apa perbedaan receptive field pada CNN vs ANN tradisional?
> > - Bagaimana eksperimen LeCun (1989) mendemonstrasikan manfaat parameter sharing?
> > - Mengapa operasi konvolusi lebih efisien secara komputasi?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin Slides (Halaman 20-34)
> > - Goodfellow et al., Deep Learning (Halaman 22, 28, 34)
> > - LeCun (1989) Generalization and Network Design Strategies
> >
>
> > ### Konsep Konektivitas Lokal
> > Konektivitas lokal merupakan prinsip dasar dalam CNN di mana setiap neuron pada lapisan konvolusional hanya terhubung ke subset kecil neuron pada lapisan sebelumnya. Ini meniru konsep **receptive field** pada sistem visual biologis yang ditemukan Hubel dan Wiesel (1959), di mana sel-sel saraf tertentu hanya merespons stimulus dari area terbatas pada retina. Pada CNN, receptive field didefinisikan sebagai area input yang mempengaruhi nilai satu unit pada feature map.
> > Contoh konkret: Untuk kernel berukuran 3x3, setiap neuron di feature map hanya terhubung ke 9 piksel input (pada satu channel), bukan ke seluruh gambar. Ini berbeda dengan ANN tradisional di mana setiap neuron output terhubung ke SEMUA neuron input (koneksi penuh). Pada gambar 32x32 RGB, ANN akan membutuhkan 32x32x3 = 3072 koneksi per neuron output, sedangkan CNN dengan kernel 3x3 hanya membutuhkan 3x3x3 = 27 koneksi.
> > ### Mekanisme Parameter Sharing
> > Parameter sharing adalah teknik dimana **filter/kernel yang sama** digunakan di seluruh lokasi spasial pada input. Artinya, sekumpulan bobot yang sama (kernel) diaplikasikan ke setiap bagian gambar melalui operasi konvolusi. Ini berbeda dengan lapisan _locally-connected_ tanpa sharing di mana setiap lokasi spasial memiliki filter unik.
> > Contoh perhitungan parameter: Untuk feature map 9x9 dengan kernel 3x3:
> > - **Tanpa sharing**: 81 neuron x (9 bobot + 1 bias) = 810 parameter
> > - **Dengan sharing**: 1 kernel x (9 bobot + 1 bias) = 10 parameter
> > Efisiensi ini memungkinkan CNN mempelajari fitur hierarkis seperti tepi → tekstur → objek parsial → objek utuh dengan parameter jauh lebih sedikit. Eksperimen LeCun (1989) menunjukkan peningkatan akurasi dari 88.5% (locally-connected) ke 98.4% dengan tambahan parameter sharing, sambil mengurangi parameter dari 1226 ke 1060.
> > ### Efisiensi Komputasi
> > Konektivitas lokal dan parameter sharing bersama-sama mengurangi kompleksitas komputasi secara eksponensial. Operasi konvolusi untuk edge detection pada gambar 320x280:
> > - **ANN**: Membutuhkan ~8 miliar operasi (320x280 x 319x280 perkalian matriks)
> > - **CNN**: Hanya ~268,000 operasi (319x280 x 3 operasi per kernel)
> > Rasio efisiensi mencapai 60,000:1. Pada arsitektur LeNet-5 asli, parameter sharing mengurangi bobot dari 64,660 menjadi hanya 8,824 tanpa penurunan akurasi signifikan. Efisiensi ini memungkinkan pelatihan model deep learning pada hardware terbatas.
> > ### Dampak Terhadap Generalisasi
> > Pembatasan konektivitas dan berbagi parameter bertindak sebagai **regularisasi implisit** dengan:
> > 1. Membatasi kapasitas model untuk overfit
> > 2. Memaksa model belajar fitur invarian terhadap translasi
> > 3. Menginduksi bias pembelajaran hierarki fitur spasial
> > Eksperimen pada Net-3 LeCun menunjukkan akurasi 98.4% dengan parameter sharing vs 88.5% tanpa sharing, membuktikan bahwa pembatasan parameter justru meningkatkan kemampuan generalisasi model pada data unseen.

> [!cornell] #### Summary
> **Konektivitas lokal** membatasi setiap neuron hanya merespons area terbatas (receptive field), meniru sistem visual biologis dan mengurangi koneksi redundant. **Parameter sharing** menggunakan filter yang sama di seluruh input, menurunkan kompleksitas model secara eksponensial sambil memaksa pembelajaran fitur invarian spasial. Kombinasi keduanya menghasilkan efisiensi komputasi hingga 60,000× lebih baik dibanding ANN tradisional dan meningkatkan generalisasi model melalui regularisasi implisit, seperti dibuktikan LeCun (1989) dengan peningkatan akurasi 10% pada tugas pengenalan digit.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Eksperimen LeCun 1989
> Arsitektur Net-3 menggunakan tiga lapisan tersembunyi dengan strategi hybrid:
> - Lapisan 1: 256 unit, locally-connected 8x8 dengan kernel 3x3 (640 parameter)
> - Lapisan 2: 64 unit, kernel 5x5 dengan sharing (416 parameter)
> - Lapisan 3: 16 unit fully-connected (170 parameter)
> Total parameter dengan sharing: 1,226 vs 206 jika full sharing. Implementasi modern menunjukkan bahwa partial sharing (campuran lokal dan global) sering memberikan trade-off optimal antara fleksibilitas dan efisiensi.
>
> #### Matematika Efisiensi Parameter
> Rumus umum kompleksitas parameter:
> - **Tanpa sharing**: `N × ((F×F×D) + 1)`
> `N = outputHeight × outputWidth × featureMaps`
> - **Dengan sharing**: `K × ((F×F×D) + 1)`
> `K = jumlah feature maps`
>
> Studi kasus LeNet-5:
> - Lapisan C3: 16 feature maps 10x10 → 16×(5×5×6+1)=2416 parameter (dengan sharing)
> - Tanpa sharing: 10×10×16×(25+1)=41,600 parameter → Reduksi 17.2×
>
> #### Implementasi Modern
> Framework seperti TensorFlow/Keras mengimplementasikan parameter sharing melalui:
> ```python
> Conv2D(filters=16, kernel_size=(3,3), use_bias=True) # Dengan sharing
> LocallyConnected2D(filters=16, kernel_size=(3,3))     # Tanpa sharing
> ```
> Benchmark pada dataset CIFAR-10 menunjukkan Conv2D 3× lebih cepat dalam pelatihan dan menggunakan memori 15× lebih sedikit dibanding LocallyConnected2D dengan akurasi setara.
>
> #### Proyek Eksplorasi Mandiri
> 1. **Eksperimen Parameter Sharing**:
> - Bangun dua model CNN pada PyTorch/Keras: satu dengan Conv2D standar, satu dengan lapisan lokal tanpa sharing
> - Bandingkan akurasi, waktu pelatihan, dan penggunaan memori pada dataset MNIST
>
> 2. **Visualisasi Receptive Field**:
> - Gunakan library tf-keras-vis untuk memvisualisasikan area input yang paling mempengaruhi neuron tertentu
> - Bandingkan pola receptive field pada lapisan awal vs lapisan dalam
>
> #### Bacaan Lanjutan
> - [Original Paper] LeCun, Y. (1989). Generalization and network design strategies
> - [Book Chapter] Goodfellow et al., Deep Learning Chapter 9: Convolutional Networks
> - [Review] Krizhevsky et al. (2017). ImageNet Classification with Deep CNNs
> - [Tools] TensorFlow Receptive Field Calculator: https://distill.pub/2019/computing-receptive-fields/