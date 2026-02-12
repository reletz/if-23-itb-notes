---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Attention Mechanisms for Contextual Processing
>
> > ## Questions/Cues
> >
> > - Mengapa vektor konteks tunggal menyebabkan bottleneck informasi?
> > - Bagaimana mekanisme attention menyelesaikan masalah urutan panjang?
> > - Apa perbedaan weighted sum vs final state sebagai konteks?
> > - Bagaimana menghitung bobot attention secara dinamis?
> > - Apa keuntungan menggunakan attention pada decoder?
> >
> > ## Reference Points
> >
> > - Attention_&_Transformer.pptx (Slides 2-21)
> >
>
> > ### Masalah Arsitektur Encoder-Decoder Tradisional
> > Arsitektur encoder-decoder konvensional menggunakan **vektor konteks tunggal** yang diambil dari state akhir encoder untuk menginisialisasi decoder. Pendekatan ini menimbulkan masalah **information bottleneck**, terutama untuk urutan panjang. Vektor konteks yang berukuran tetap harus menyimpan semua informasi dari seluruh urutan input, yang seringkali tidak memadai karena keterbatasan kapasitas memori jaringan saraf.
> > Contoh pada terjemahan mesin: Kalimat input 20 kata harus direpresentasikan dalam vektor 512-dimensi yang sama dengan kalimat 5 kata. Ini seperti mencoba menyimpan isi seluruh buku dalam satu paragraf ringkasan - detail penting akan hilang. Masalah ini semakin kritis ketika panjang urutan melebihi 30-50 token, di mana kinerja model tradisional menurun drastis.
> > ### Konsep Dasar Attention Mechanism
> > Mekanisme attention mengatasi keterbatasan tersebut dengan **memanfaatkan semua state encoder**, bukan hanya state akhir. Setiap langkah decoder mengakses **weighted sum** dari seluruh state encoder, di mana bobot (α) menentukan seberapa besar perhatian diberikan ke setiap posisi input.
> > Analogi: Seperti editor yang membuat ringkasan dokumen dengan menyoroti bagian-bagian kunci berbeda untuk setiap topik. Untuk menerjemahkan "memberi up" ke "menyerah", model memberi bobot tinggi pada kata kerja "gave" dan partikel "up", sambil mengabaikan kata "Budi". Proses ini **dipelajari secara otomatis** selama pelatihan melalui mekanisme alignment yang menyelaraskan input-output.
> > ### Arsitektur dengan Attention Layer
> > Lapisan attention ditempatkan antara encoder dan decoder. Terdiri dari tiga komponen utama:
> > 1. **Alignment Model**: Menghitung skor keselarasan antara state encoder (h_i) dan state decoder sebelumnya (s_{t-1})
> > 2. **Attention Weights**: Bobot α_i dihitung dengan softmax dari skor keselarasan
> > 3. **Context Vector**: Hasil weighted sum ∑α_i h_i
> > Pada implementasi Fibonacci, attention layer mengurangi MSE test set sebesar 40% dibanding model tanpa attention. Struktur parameternya melibatkan matriks berat U (input→hidden), W (recurrent), dan V (hidden→output), dengan perhitungan forward propagation:
> > ```
> > e_i = f(s_{t-1}, h_i)  # Skor keselarasan
> > α_i = exp(e_i) / ∑exp(e_j)
> > c_t = ∑α_i h_i
> > s_t = g(s_{t-1}, y_{t-1}, c_t)
> > ```
> > ### Dynamic Context Adaptation
> > Vektor konteks menjadi **dinamis** dan **spesifik-waktu**, berbeda dengan pendekatan tradisional yang menggunakan konteks statis. Setiap langkah decoder menghasilkan distribusi attention baru yang berfokus pada bagian input yang relevan dengan langkah output saat ini.
> > Contoh pada terjemahan "Budi gave up → Budi menyerah":
> > - Saat menghasilkan "Budi", α tinggi pada token pertama input
> > - Saat menghasilkan "menyerah", α tinggi pada "gave" dan "up"
> > Pola ini muncul sendiri melalui pelatihan end-to-end tanpa anotasi alignment eksplisit, menunjukkan kemampuan model untuk mempelajari ketergantungan lintas bahasa secara otomatis.
> > ### Manfaat dan Aplikasi Praktis
> > Penggunaan attention memberikan tiga keuntungan utama:
> > 1. **Peningkatan akurasi**: Model lebih baik dalam menangani urutan panjang (>50 token)
> > 2. **Interpretabilitas**: Distribusi α memberi insight proses pengambilan keputusan model
> > 3. **Fleksibilitas arsitektur**: Dapat diintegrasikan dengan berbagai RNN/LSTM/GRU
> > Aplikasi meliputi terjemahan mesin (BLEU score ↑3-7 poin), summarization teks, dan speech recognition. Pada tugas generasi urutan seperti prediksi Fibonacci, attention mengurangi error akumulatif dengan mempertimbangkan pola jangka panjang.

> [!cornell] #### Summary
>
> **Mekanisme attention** merevolusi pemrosesan urutan dengan mengizinkan model fokus secara selektif pada bagian input yang relevan melalui **dynamic context vectors**. Teknik ini mengatasi **information bottleneck** arsitektur encoder-decoder tradisional dengan memanfaatkan **weighted sum seluruh state encoder**, menghasilkan peningkatan kinerja signifikan terutama pada urutan panjang. Implementasinya yang fleksibel memungkinkan integrasi dengan berbagai arsitektur dasar sambil menyediakan **visualisasi interpretabel** melalui distribusi bobot attention.
>

> [!ad-libitum]- Additional Information
>
> #### Perhitungan Matematis Bobot Attention
> Skor keselarasan e_ij antara state encoder h_j dan decoder s_{i-1} dihitung dengan:
> ```
> e_ij = v_a^T tanh(W_a s_{i-1} + U_a h_j)
> ```
> di mana W_a, U_a matriks berat dan v_a vektor konteks. Bobot α kemudian dinormalisasi dengan softmax:
> ```
> α_ij = exp(e_ij) / Σ_k exp(e_ik)
> ```
> Vektor konteks c_i merupakan kombinasi linear state encoder:
> ```
> c_i = Σ_j α_ij h_j
> ```
> Proses ini memungkinkan gradien mengalir melalui tiga jalur: encoder states, decoder states, dan parameter alignment model.
>
> #### Variasi Arsitektur Attention
> 1. **Global vs Local Attention**: Global menganggap semua posisi, local hanya window sekitar prediksi saat ini
> 2. **Self-Attention**: Menghitung bobot antar elemen dalam urutan yang sama
> 3. **Multi-Head Attention**: Beberapa set bobot independen untuk menangkap ragam hubungan
>
> #### Implementasi Praktis dengan Keras
> Contoh layer attention kustom untuk model many-to-one:
> ```python
> class AttentionLayer(Layer):
> def __init__(self, **kwargs):
> super(AttentionLayer, self).__init__(**kwargs)
>
> def build(self, input_shape):
> self.W = self.add_weight(name='att_weight',
> shape=(input_shape[-1], 1),
> initializer='normal')
> self.b = self.add_weight(name='att_bias',
> shape=(input_shape[1], 1),
> initializer='zeros')
> super(AttentionLayer, self).build(input_shape)
>
> def call(self, x):
> et = K.squeeze(K.tanh(K.dot(x, self.W) + self.b), axis=-1)
> at = K.softmax(et)
> at = K.expand_dims(at, axis=-1)
> output = x * at
> return K.sum(output, axis=1)
> ```
>
> #### Self-Exploration Projects
> 1. Implementasikan layer attention untuk tugas klasifikasi teks pada dataset IMDb
> 2. Visualisasikan distribusi bobot attention untuk input kalimat ambigu seperti "I saw her duck"
> 3. Bandingkan kinerja model seq2seq dengan dan tanpa attention pada dataset terjemahan Indonesia-Jawa
>
> #### Further Reading
> - Paper Fundamental: [Bahdanau et al. (2015) Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)
> - Buku Implementasi: "Natural Language Processing with Transformers" Chapter 3 (Attention Mechanisms)
> - Tutorial Praktis: [The Illustrated Attention](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)
> - Library: [TensorFlow Addons Attention Layers](https://www.tensorflow.org/addons/api_docs/python/tfa/layers/Attention)