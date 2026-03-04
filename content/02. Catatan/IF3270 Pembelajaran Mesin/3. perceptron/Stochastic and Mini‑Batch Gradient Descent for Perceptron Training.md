---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Stochastic and Mini‑Batch Gradient Descent for Perceptron Training
>
> > ## Questions/Cues
> >
> > - Mengapa SGD memperbarui bobot setelah tiap contoh?
> > - Bagaimana ukuran mini‑batch memengaruhi varians gradien?
> > - Kapan sebaiknya gunakan mini‑batch dibandingkan SGD murni?
> > - Apa peran jadwal penurunan learning rate pada SGD?
> > - Bagaimana GPU memanfaatkan mini‑batch untuk perceptron?
> >
> > ## Reference Points
> >
> > - Lecture_Slides_IF3270.pptx (Slides 27‑33)
> > - Raschka_2022_MLwithPyTorch.pdf (Pages 20‑23)
> > - Mitchell_1997_ML.pdf (Chapter 4, pages 112‑118)
>
> > ### Stochastic Gradient Descent (SGD)
> >
> > Stochastic Gradient Descent adalah varian dari metode penurunan gradien yang memperbarui bobot model setelah memproses **satu contoh pelatihan**. Ide dasarnya adalah menggunakan perkiraan gradien yang didapat dari satu contoh sebagai proxy untuk gradien keseluruhan fungsi kerugian. Karena perkiraan ini bersifat tidak teratur (stochastic), arah penurunan tidak selalu mengarah ke titik minimum global pada setiap iterasi, namun secara statistik ia mengarah ke arah yang menurunkan nilai rata‑rata kerugian. Pendekatan ini sangat berguna ketika dataset berukuran besar, karena menghindari kebutuhan menghitung gradien atas seluruh data pada setiap langkah.
> >
> > Pada perceptron, setiap contoh terdiri dari vektor fitur $\mathbf{x}_i$ dan label target $y_i$. Setelah memprediksi output dengan bobot saat ini, algoritma menghitung selisih antara prediksi dan target, lalu menyesuaikan bobot sedikit ke arah yang mengurangi kesalahan. Karena hanya satu contoh yang diproses, **waktu komputasi per iterasi** sangat kecil, memungkinkan model belajar secara **online**—artinya data dapat diproses seketika saat datang, tanpa menunggu seluruh dataset tersedia.
> >
> > Contoh konkret: Bayangkan seorang guru yang menilai satu pekerjaan rumah tiap kali siswa menyerahkannya, lalu langsung memberi umpan balik dan memperbaiki cara mengajar. Jika guru menunggu semua pekerjaan selesai baru menilai, proses menjadi jauh lebih lambat. Begitu pula SGD mempercepat proses pelatihan dengan memberi umpan balik segera.
> >
> > Meskipun SGD mempercepat iterasi, ia menghasilkan **varians tinggi** pada perkiraan gradien. Varians ini dapat menyebabkan lintasan pencarian menjadi “bergoyang‑goyang”, sehingga konvergensi ke nilai optimum memerlukan lebih banyak iterasi dibandingkan metode yang menghitung gradien penuh. Untuk mengatasi hal ini, praktisi biasanya menggabungkan SGD dengan teknik‑teknik seperti penurunan learning rate bertahap atau momentum.
> >
> > ### Mini‑Batch Gradient Descent
> >
> > Mini‑Batch Gradient Descent berada di antara SGD (batch size = 1) dan penurunan gradien batch penuh (batch size = seluruh dataset). Pada setiap iterasi, algoritma mengumpulkan **sekelompok kecil contoh** (mini‑batch) dan menghitung rata‑rata gradien di dalam kelompok tersebut sebelum memperbarui bobot. Ukuran mini‑batch biasanya dipilih dalam rentang 32‑256 contoh, tergantung pada memori dan arsitektur perangkat keras yang digunakan.
> >
> > Dengan menggabungkan beberapa contoh, mini‑batch **mengurangi varians** perkiraan gradien dibandingkan SGD, sehingga lintasan pencarian menjadi lebih stabil. Pada saat yang sama, komputasi tetap lebih efisien daripada menghitung gradien atas seluruh data, karena operasi matriks pada mini‑batch dapat diparalelkan secara optimal pada GPU atau TPU. Ini berarti bahwa **throughput** (jumlah contoh yang diproses per detik) meningkat secara signifikan, sementara **latency** per pembaruan tetap rendah.
> >
> > Sebagai analogi, bayangkan seorang koki yang mencicipi sup. Jika ia mencicipi satu sendok (SGD), rasa yang dirasakannya sangat dipengaruhi oleh fluktuasi kecil. Jika ia mencicipi seluruh panci sekaligus (batch penuh), ia harus menunggu lama sebelum dapat menyesuaikan rasa. Dengan mencicipi beberapa sendok sekaligus (mini‑batch), ia mendapatkan gambaran rasa yang lebih akurat tanpa harus menunggu terlalu lama.
> >
> > Mini‑batch juga memudahkan **regularisasi** melalui teknik seperti dropout atau batch normalization, yang secara alami bekerja pada kumpulan contoh. Karena setiap mini‑batch biasanya diacak (shuffled) sebelum diproses, model tidak belajar urutan data yang dapat menyebabkan bias.
> >
> > ### Perbandingan Praktis: SGD vs Mini‑Batch
> >
> > 1. **Kecepatan Konvergensi** – Mini‑batch biasanya membutuhkan lebih sedikit epoch (siklus penuh atas data) untuk mencapai akurasi yang sama karena gradien yang lebih stabil. Namun, setiap epoch memerlukan lebih banyak komputasi per iterasi dibandingkan SGD.
> > 2. **Penggunaan Memori** – SGD memerlukan memori minimal (hanya satu contoh pada satu waktu). Mini‑batch memerlukan memori yang cukup untuk menampung seluruh contoh dalam batch, sehingga ukuran batch harus disesuaikan dengan kapasitas GPU.
> > 3. **Parallelisme** – Mini‑batch memungkinkan pemrosesan paralel pada unit pemrosesan grafis (GPU) atau unit pemrosesan tensor (TPU). SGD tidak dapat memanfaatkan paralelisme secara efektif karena tiap contoh diproses secara berurutan.
> > 4. **Stabilitas Numerik** – Karena gradien mini‑batch merupakan rata‑rata, nilai pembaruan bobot cenderung lebih stabil, mengurangi risiko “exploding” atau “vanishing” yang dapat terjadi pada SGD dengan learning rate tinggi.
> >
> > ### Strategi Penyesuaian Learning Rate pada SGD dan Mini‑Batch
> >
> > Learning rate (tingkat pembelajaran) adalah parameter yang menentukan seberapa besar langkah pembaruan bobot pada setiap iterasi. Pada SGD, learning rate yang terlalu besar dapat menyebabkan lintasan melompat‑lompat melewati minimum, sedangkan nilai terlalu kecil membuat proses belajar sangat lambat. Oleh karena itu, **jadwal penurunan learning rate** (learning rate schedule) sering dipakai:
> >
> > - **Step Decay**: Mengurangi learning rate secara mendadak setiap beberapa epoch.
> > - **Exponential Decay**: Mengalikan learning rate dengan faktor eksponensial pada setiap epoch.
> > - **Cosine Annealing**: Mengurangi learning rate mengikuti kurva kosinus, memberikan penurunan yang halus di akhir pelatihan.
> >
> > Pada mini‑batch, karena gradien lebih stabil, learning rate dapat dipilih sedikit lebih tinggi dibandingkan SGD, namun tetap memerlukan penyesuaian seiring berjalannya epoch untuk menghindari osilasi di sekitar minimum. Praktik umum adalah memulai dengan learning rate yang relatif besar, kemudian menurunkannya secara bertahap ketika loss mulai melambat.
> >
> > ### Implementasi Praktis pada Perceptron
> >
> > Implementasi SGD atau mini‑batch untuk perceptron dapat dilakukan dengan pustaka populer seperti **Scikit‑Learn**, **PyTorch**, atau **TensorFlow**. Pada Scikit‑Learn, kelas `Perceptron` secara internal menggunakan algoritma SGD dengan opsi `learning_rate='optimal'` yang secara otomatis menyesuaikan learning rate. Pada PyTorch, model perceptron dapat didefinisikan sebagai satu lapisan linear, kemudian dilatih dengan `torch.optim.SGD` yang menerima parameter `batch_size` untuk mengontrol ukuran mini‑batch.
> >
> > Penting untuk **mengacak urutan data** (shuffle) sebelum setiap epoch, sehingga mini‑batch yang dihasilkan tidak memiliki pola yang dapat memperkenalkan bias. Selain itu, memantau nilai loss pada data validasi secara periodik membantu mendeteksi **overfitting** yang dapat muncul ketika batch size terlalu kecil dan model terlalu menyesuaikan noise pada data pelatihan.
> >
> > ### Ringkasan Kunci
> >
> > - **Stochastic Gradient Descent (SGD)** memperbarui bobot setelah tiap contoh, memberikan kecepatan iterasi tinggi namun dengan varians gradien yang besar.
> > - **Mini‑Batch Gradient Descent** menggabungkan beberapa contoh per iterasi, menurunkan varians, meningkatkan stabilitas, dan memanfaatkan paralelisme pada GPU.
> > - Pemilihan **ukuran mini‑batch** dan **jadwal learning rate** merupakan faktor kritis yang memengaruhi kecepatan konvergensi dan kualitas solusi akhir.
> > - Implementasi modern pada pustaka seperti Scikit‑Learn atau PyTorch menyederhanakan penggunaan SGD/mini‑batch dengan API yang sudah teroptimasi.

> [!cornell] #### Summary
>
> **Stochastic Gradient Descent** memungkinkan perceptron belajar secara online dengan memperbarui bobot setelah setiap contoh, namun menghasilkan lintasan pencarian yang berfluktuasi karena varians tinggi. **Mini‑Batch Gradient Descent** menyeimbangkan kecepatan dan stabilitas dengan mengolah sekumpulan contoh kecil secara bersamaan, memanfaatkan paralelisme perangkat keras, dan mengurangi varians gradien. Kedua metode memerlukan penyesuaian learning rate yang cermat, biasanya melalui jadwal penurunan, untuk memastikan konvergensi yang efisien dan menghindari osilasi. Implementasi praktis dapat dilakukan dengan pustaka seperti Scikit‑Learn atau PyTorch, yang menyediakan kontrol atas ukuran batch, pengacakan data, dan strategi learning rate.

> [!ad-libitum]- Additional Information
>
> #### Formal Convergence Properties
>
> Analisis konvergensi SGD biasanya didasarkan pada asumsi bahwa fungsi kerugian bersifat **konveks** dan **L‑Lipschitz**. Dalam konteks perceptron, fungsi kerugian yang umum dipakai (misalnya hinge loss) memenuhi sifat konveks, sehingga dapat diterapkan hasil teoretis klasik: dengan learning rate yang menurun secara harmonik ($\alpha_t = \frac{a}{t}$), ekspektasi nilai kerugian setelah $T$ iterasi mendekati optimum dengan laju $\mathcal{O}\left(\frac{1}{\sqrt{T}}\right)$. Pada mini‑batch, varians gradien berkurang secara proporsional dengan ukuran batch $B$, sehingga laju konvergensi dapat ditingkatkan menjadi $\mathcal{O}\left(\frac{1}{\sqrt{TB}}\right)$ asalkan batch dipilih secara acak dan independen.
>
> Meskipun teori ini memberikan batas atas, dalam praktik jaringan perceptron yang tidak konveks (misalnya dengan aktivasi non‑linear) konvergensi tidak dijamin. Oleh karena itu, teknik tambahan seperti **momentum**, **Nesterov accelerated gradient**, atau **Adam optimizer** sering dipakai untuk mempercepat penurunan loss dan menghindari jebakan pada saddle point.
>
> #### Variance Reduction Techniques
>
> Beberapa metode modern bertujuan mengurangi varians gradien tanpa harus meningkatkan ukuran mini‑batch secara signifikan. Contohnya:
>
> - **Stochastic Variance Reduced Gradient (SVRG)**: Menggunakan gradien penuh yang dihitung secara periodik sebagai referensi untuk mengkoreksi perkiraan gradien mini‑batch.
> - **SAGA**: Memelihara tabel gradien individu untuk setiap contoh, memungkinkan pembaruan yang lebih akurat.
> - **AdaGrad** dan **RMSProp**: Menyesuaikan learning rate secara adaptif per parameter berdasarkan akumulasi kuadrat gradien historis, yang secara tidak langsung menurunkan varians pada dimensi yang sering berubah.
>
> Teknik‑teknik ini sangat berguna ketika dataset sangat besar dan memori terbatas, karena mereka memungkinkan penggunaan batch size kecil sambil tetap menjaga kestabilan pelatihan.
>
> #### Hardware‑Aware Mini‑Batch Design
>
> Pada GPU modern, ukuran mini‑batch yang optimal biasanya merupakan kelipatan ukuran **warp** (32 thread pada NVIDIA) atau **SIMD lane** pada CPU. Memilih batch size yang tidak selaras dapat menyebabkan **under‑utilization** sumber daya, meningkatkan waktu eksekusi per epoch. Praktik terbaik meliputi:
>
> 1. Mengukur **throughput** (contoh per detik) untuk beberapa ukuran batch (misalnya 32, 64, 128, 256) dan memilih yang memberikan throughput tertinggi tanpa melebihi memori.
> 2. Menggunakan **mixed‑precision training** (float16) untuk mengurangi beban memori, memungkinkan batch size yang lebih besar.
> 3. Memanfaatkan **data loader** yang melakukan prefetching dan augmentasi secara paralel, sehingga GPU tidak idle menunggu I/O.
>
> Dengan mengoptimalkan ukuran batch dan strategi memori, pelatihan perceptron dapat mencapai kecepatan hampir **linear scaling** pada banyak GPU.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi SGD vs Mini‑Batch pada Dataset MNIST**: Buat dua model perceptron (satu dengan SGD, satu dengan mini‑batch) menggunakan PyTorch. Bandingkan kurva loss, akurasi, dan waktu pelatihan untuk batch size 1, 32, 128. Analisis bagaimana varians gradien memengaruhi stabilitas pelatihan.
> 2. **Eksperimen Variance Reduction**: Tambahkan mekanisme SVRG atau SAGA pada pelatihan perceptron mini‑batch. Evaluasi apakah konvergensi menjadi lebih cepat dibandingkan mini‑batch standar dengan batch size yang sama.
>
> #### Tools and Resources
>
> - **PyTorch** – `torch.optim.SGD` dan `torch.utils.data.DataLoader` untuk mengatur batch size dan shuffling.
> - **TensorFlow 2.x** – `tf.keras.optimizers.SGD` dengan argumen `batch_size` pada `model.fit`.
> - **scikit‑learn** – `Perceptron` class dengan parameter `learning_rate='optimal'` dan `eta0` untuk mengatur learning rate awal.
> - **NVIDIA Nsight Systems** – Profiling tool untuk mengukur efisiensi GPU saat melatih dengan berbagai ukuran mini‑batch.
> - **Weights & Biases (wandb)** – Platform pelacakan eksperimen yang memudahkan visualisasi loss, learning rate schedule, dan penggunaan memori.
>
> #### Further Reading
>
> - Bottou, L. (2010). *Large‑Scale Machine Learning with Stochastic Gradient Descent*. Proceedings of COMPSTAT.
> - Kingma, D. P., & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. International Conference on Learning Representations (ICLR).
> - Ruder, S. (2016). *An Overview of Gradient Descent Optimization Algorithms*. arXiv preprint arXiv:1609.04747.
> - Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press – Chapter 8 (Optimization for Training).
> - PyTorch Documentation – Optimizers: https://pytorch.org/docs