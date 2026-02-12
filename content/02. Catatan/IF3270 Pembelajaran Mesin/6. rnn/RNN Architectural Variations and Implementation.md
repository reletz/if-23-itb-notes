---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin Lanjut]]

> [!cornell] RNN Architectural Variations and Implementation
>
> > ## Questions/Cues
> >
> > - Apa perbedaan arsitektur n-to-n dan many-to-many?
> > - Bagaimana implementasi many-to-one di Keras?
> > - Mengapa diperlukan Bidirectional RNN?
> > - Bagaimana menghitung parameter di RNN multilayer?
> > - Apa aplikasi praktis arsitektur one-to-many?
> >
> > ## Reference Points
> >
> > - Lecture_01_DFS.pptx (Slides 27-39)
> > - Advanced_Algorithms.pdf (Pages 142-150)
> >
>
> > ### Klasifikasi Arsitektur RNN
> > Recurrent Neural Networks memiliki tiga pola arsitektur utama berdasarkan hubungan input-output:
> > **1. One-to-Many**: Satu input menghasilkan sekuens output. Contoh: _Image Captioning_ dimana satu gambar (input tunggal) menghasilkan kalimat deskriptif (output sekuensial). Arsitektur ini menggunakan encoder CNN untuk ekstraksi fitur gambar dan decoder RNN untuk pembuatan teks.
> > **2. Many-to-One**: Sekuens input menghasilkan satu output. Contoh: Analisis sentimen teks dimana sekuens kata-kata (input) diklasifikasikan menjadi sentimen positif/negatif (output tunggal). Implementasi di Keras menggunakan lapisan SimpleRNN dengan `return_sequences=False`.
> > **3. Many-to-Many**: Terbagi menjadi dua subtipe:
> > - **Sinkron**: Setiap timestep input memiliki output terkait (e.g., _POS Tagging_)
> > - **Asinkron**: Output mulai dihasilkan setelah seluruh input diproses (e.g., _Machine Translation_)
> > ### Implementasi Many-to-One di Keras
> > Contoh implementasi analisis sentimen:
> > ```python
> > from keras.models import Sequential
> > from keras.layers import SimpleRNN, Dense
> > model = Sequential()
> > model.add(SimpleRNN(64, input_shape=(100, 300)))  # 64 neuron, input 100 timestep
> > model.add(Dense(1, activation='sigmoid'))  # Output klasifikasi biner
> > ```
> > Penjelasan parameter:
> > - `input_shape=(100, 300)`: 100 timestep dengan vektor fitur 300 dimensi
> > - Lapisan SimpleRNN secara otomatis mengembalikan hanya output terakhir
> > ### Arsitektur Many-to-Many
> > Dua pendekatan implementasi:
> > **1. Sinkron (Sequence Tagging)**:
> > ```python
> > model.add(SimpleRNN(32, return_sequences=True))
> > model.add(TimeDistributed(Dense(10)))  # Output untuk setiap timestep
> > ```
> > Digunakan untuk tugas seperti penandaan POS dimana setiap kata mendapatkan label.
> > **2. Asinkron (Encoder-Decoder)**:
> > - **Encoder**: Memproses seluruh input sequence menjadi _context vector_
> > - **Decoder**: Menggunakan context vector untuk menghasilkan output sequence
> > ### Bidirectional RNN
> > Mengkombinasikan dua RNN:
> > - **Forward Layer**: Memproses data secara kronologis
> > - **Backward Layer**: Memproses data secara terbalik
> > Keunggulan:
> > - Mencapture dependensi maju-mundur (e.g., dalam NLP: konteks kata dipengaruhi kata sebelum & sesudah)
> > - Implementasi di Keras:
> > ```python
> > from keras.layers import Bidirectional
> > model.add(Bidirectional(SimpleRNN(32)))
> > ```

> [!cornell] #### Summary
> **RNN** memiliki variasi arsitektur utama: **one-to-many** (generasi sekuens), **many-to-one** (klasifikasi sekuens), dan **many-to-many** (translasi/penandaan). Implementasi praktis menggunakan **return_sequences** untuk kontrol output, sementara **Bidirectional RNN** meningkatkan kinerja dengan konteks dua arah. Perhitungan parameter bergantung pada jumlah neuron dan dimensi input-output.
>

> [!ad-libitum]- Additional Information
>
> #### Perhitungan Parameter Lanjut
> Rumus umum parameter RNN layer:
> ```
> Parameter = (input_dim + hidden_units + 1) × hidden_units
> ```
> Contoh RNN multilayer:
> ```python
> model = Sequential()
> model.add(SimpleRNN(64, input_shape=(50,1), return_sequences=True))
> model.add(SimpleRNN(32, return_sequences=True))
> model.add(SimpleRNN(16))
> ```
> Perhitungan:
> - Layer 1: (1 + 64 + 1) × 64 = 4224
> - Layer 2: (64 + 32 + 1) × 32 = 3104
> - Layer 3: (32 + 16 + 1) × 16 = 784
>
> #### Optimasi Arsitektur
> Teknik advanced:
> - **Stacked RNN**: Multiple layer RNN untuk menangkap pola hierarkis
> - **Skip Connections**: Menghubungkan layer tidak berurutan untuk mitigasi _vanishing gradient_
> - **Dilated RNN**: Memperkenalkan celah temporal untuk perluasan reseptif
>
> #### Kasus Edge
> - **Long Sequences**: Problem _vanishing gradient_ pada data >100 timestep
> - **Sparse Data**: Input dengan banyak nilai nol menyebabkan pembelajaran tidak efisien
> - **Non-uniform Sampling**: Interval waktu tidak konsisten pada data time-series
>
> #### Proyek Eksplorasi
> 1. Bangun model pemetaan musik ke notasi (many-to-many)
> 2. Implementasi RNN untuk prediksi harga saham multi-variabel
> 3. Bandingkan kinerja SimpleRNN vs GRU pada dataset terjemahan kecil
>
> #### Tools & Sumberdaya
> - **Framework**: Keras/TensorFlow, PyTorch Lightning
> - **Dataset**: CMU Articulatory Corpus, Penn Treebank
> - **Visualisasi**: TensorBoard, Netron
>
> #### Bacaan Lanjut
> - "Deep Learning" (Goodfellow dkk.) Bab 10: Sequence Modeling
> - Dokumentasi Resmi Keras: Bidirectional RNN
> - Paper: "Empirical Evaluation of Gated RNNs" (Chung dkk. 2014)
> - Tutorial: WildML - RNN untuk Machine Translation