---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin Lanjut]]

> [!cornell] Vanishing Gradient Problem in RNNs
>
> > ## Questions/Cues
> >
> > - Mengapa vanishing gradient terjadi pada RNN?
> > - Bagaimana fungsi aktivasi memengaruhi propagasi gradien?
> > - Apa dampak eksponensial perkalian gradien?
> > - Solusi alternatif selain LSTM untuk masalah ini
> > - Perbedaan vanishing vs exploding gradient
> >
> > ## Reference Points
> >
> > - Lecture_IF3270_RNN.pptx (Slides 6, 8)
> > - Goodfellow et al. Deep Learning (Chapter 10)
> > - Raschka Machine Learning with PyTorch (Chapter 15)
> >
>
> > ### Pengertian Vanishing Gradient Problem
> > Vanishing Gradient Problem adalah fenomena dalam pelatihan **jaringan saraf berulang (RNN)** di mana gradien error menjadi semakin kecil saat propagasi mundur melalui lapisan waktu. Hal ini menyebabkan:
> > - **Bobot jaringan tidak terupdate** secara signifikan pada lapisan awal
> > - **Pembelajaran jangka panjang (long-term dependencies)** menjadi tidak mungkin
> > - Konvergensi model melambat atau berhenti sama sekali
> > Masalah ini terutama kritis pada RNN karena sifatnya yang **berulang (recurrent)**. Setiap langkah waktu setara dengan lapisan tambahan dalam jaringan feedforward yang sangat dalam. Contoh: RNN dengan 100 langkah waktu setara dengan jaringan feedforward 100 lapisan.
> > ### Penyebab Matematis
> > Penyebab utama vanishing gradient terletak pada **aturan rantai (chain rule)** dalam kalkulus diferensial. Dalam RNN, gradien error ∂E/∂W dihitung dengan mengalikan serangkaian turunan parsial:
> > ```
> > ∂E/∂W = ∂E/∂h_t * ∂h_t/∂h_{t-1} * ∂h_{t-1}/∂h_{t-2} * ... * ∂h_1/∂W
> > ```
> > Jika setiap elemen ∂h_t/∂h_{t-1} bernilai < 1 (karena fungsi aktivasi tanh/sigmoid yang memiliki turunan maksimal 1), hasil perkalian akan **mengecil secara eksponensial** seiring bertambahnya langkah waktu. Contoh numerik: jika rata-rata turunan parsial = 0.8, setelah 50 langkah waktu gradien akan menjadi 0.8⁵⁰ ≈ 1.4e-05 (nyaris nol).
> > ### Dampak pada Pelatihan Model
> > 1. **Gagal mempelajari ketergantungan jangka panjang**: Model hanya mampu mengingat pola dalam rentang waktu pendek (misal 5-10 langkah)
> > 2. **Stagnasi parameter**: Bobot di lapisan awal tetap statis meski pelatihan berlanjut
> > 3. **Bias terhadap informasi terbaru**: Model menjadi terlalu fokus pada input terkini dan mengabaikan konteks historis
> > Contoh nyata: Pada analisis sentimen kalimat panjang, model mungkin hanya mempertimbangkan kata terakhir ("Saya suka film ini tapi aktingnya buruk, alur ceritanya kacau, dan endingnya tidak memuaskan → positif?")
> > ### Solusi Umum (Non-LSTM)
> > **1. Fungsi Aktivasi ReLU:**
> > Memiliki turunan konstan 1 untuk input positif, mencegah perkalian gradien mengecil. Namun rentan terhadap exploding gradient.
> > **2. Inisialisasi Bobot Ortogonal:**
> > Mempertahankan norma gradien dengan menginisialisasi matriks bobot recurrent sebagai matriks ortogonal (WᵀW = I)
> > **3. Gradient Clipping:**
> > Membatasi nilai maksimum gradien selama backpropagation:
> > ```python
> > grad_norm = np.linalg.norm(gradients)
> > if grad_norm > threshold:
> > gradients *= threshold / grad_norm
> > ```
> > **4. Skip Connections:**
> > Menambahkan jalur langsung yang melewati beberapa lapisan waktu (residual connections), memungkinkan gradien mengalir tanpa melalui fungsi aktivasi.

> [!cornell] #### Summary
>
> **Vanishing gradient** pada RNN terjadi karena **perkalian eksponensial gradien kecil** melalui banyak langkah waktu, terutama saat menggunakan fungsi aktivasi seperti tanh/sigmoid. Masalah ini **menghambat pembelajaran ketergantungan jangka panjang** dan menyebabkan stagnasi parameter. Solusi alternatif termasuk penggunaan **ReLU, inisialisasi ortogonal, gradient clipping, dan arsitektur residual**, sementara **LSTM** (tidak dibahas detail di sini) merupakan solusi khusus melalui mekanisme gating.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Mendalam
> Untuk RNN sederhana dengan fungsi aktivasi tanh, turunan parsial ∂h_t/∂h_{t-1} = W * (1 - tanh²(a_{t-1})). Karena 0 < (1 - tanh²(x)) ≤ 1 untuk semua x riil, perkalian berulang akan menyebabkan gradien menyusut secara eksponensial jika nilai eigen W < 1. Analisis nilai eigen matriks bobot menunjukkan bahwa vanishing gradient terjadi ketika radius spektral ρ(W) < 1.
>
> #### Truncated BPTT
> Teknik **Truncated Backpropagation Through Time** membatasi panjang unrolled network selama pelatihan:
> - Membagi urutan panjang menjadi segmen pendek (biasanya 50-100 langkah)
> - Mengupdate bobot berdasarkan gradien lokal setiap segmen
> - Mengurangi komputasi dan memitigasi vanishing gradient dengan membatasi kedalaman efektif
>
> #### Perbandingan Exploding Gradient
> | Karakteristik | Vanishing Gradient | Exploding Gradient |
> |---------------|-------------------|--------------------|
> | Penyebab      | ρ(W) < 1          | ρ(W) > 1           |
> | Gejala        | Gradien → 0       | Gradien → ∞        |
> | Solusi        | ReLU, Clipping    | Gradient Clipping  |
>
> #### Studi Kasus Numerik
> Simulasi perkalian gradien untuk RNN 10 langkah dengan W = 0.9 dan turunan aktivasi rata-rata 0.6:
> ```
> Langkah 1: grad = 0.9 * 0.6 = 0.54
> Langkah 5: grad ≈ (0.54)^5 = 0.045
> Langkah 10: grad ≈ (0.54)^10 = 0.0021
> ```
>
> #### Self-Exploration Projects
> 1. Implementasikan RNN sederhana untuk sequence classification pada dataset IMDB. Amati perbedaan akurasi ketika menggunakan aktivasi tanh vs ReLU.
> 2. Visualisasi norma gradien selama pelatihan dengan TensorBoard untuk mengamati fenomena vanishing gradient.
>
> #### Tools dan Resources
> - PyTorch: `torch.nn.utils.clip_grad_norm_` untuk gradient clipping
> - TensorFlow: `tf.clip_by_global_norm` untuk implementasi clipping optimal
> - Paper: "On the difficulty of training recurrent neural networks" (Pascanu et al., 2013)
>
> #### Further Reading
> - "Understanding the exploding gradient problem" oleh Pascanu et al. (2012)
> - Bab 10 "Sequence Modeling: Recurrent and Recursive Nets" dari Deep Learning (Goodfellow et al.)
> - Tutorial interaktif: https://distill.pub/2019/memorization-in-rnns/