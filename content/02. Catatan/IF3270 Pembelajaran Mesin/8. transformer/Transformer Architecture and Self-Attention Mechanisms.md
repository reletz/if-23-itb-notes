---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Transformer Architecture and Self-Attention Mechanisms
>
> > ## Questions/Cues
> >
> > - Mengapa Transformer menghilangkan kebutuhan RNN/LSTM?
> > - Bagaimana Self-Attention menghitung hubungan antar token?
> > - Keuntungan pemrosesan paralel pada Transformer?
> > - Fungsi positional encoding dalam Transformer?
> > - Perbedaan utama Multi-Head vs Single-Head Attention?
> >
> > ## Reference Points
> >
> > - Attention & Transformer Slides (Halaman 17-20)
> > - Vaswani et al. (2017) Paper Original Transformer
> >
>
> > ### Arsitektur Transformer
> > Transformer memperkenalkan pendekatan baru dalam pemrosesan sequence yang sepenuhnya mengandalkan mekanisme attention tanpa menggunakan RNN atau LSTM. Arsitektur ini terdiri dari encoder dan decoder yang masing-masing memiliki beberapa lapisan identik, tetapi tidak seperti model seq2seq tradisional, Transformer memproses seluruh sequence secara paralel.
> > Komponen utama Transformer:
> > 1. **Self-Attention Layer**: Menghitung bobot penting antar setiap elemen dalam sequence
> > 2. **Feed-Forward Network**: Memproses representasi secara independen untuk setiap posisi
> > 3. **Positional Encoding**: Memberikan informasi urutan temporal tanpa rekurensi
> > Contoh analogi: Bayangkan tim penerjemah yang bekerja bersama-sama. Setiap anggota (token) dapat langsung berkomunikasi dengan semua anggota lain (melalui self-attention) untuk memahami konteks lengkap, bukan hanya mengandalkan informasi dari anggota sebelumnya seperti dalam RNN.
> > ### Mekanisme Self-Attention
> > Self-Attention memungkinkan setiap token dalam sequence untuk "memperhatikan" semua token lain dengan bobot berbeda yang dihitung secara dinamis. Proses ini melibatkan tiga vektor utama:
> > - **Query (Q)**: Representasi token saat ini yang mencari informasi
> > - **Key (K)**: Representasi token lain yang menjadi target perhatian
> > - **Value (V)**: Nilai aktual yang akan diagregasikan
> > Rumus dasar Self-Attention:
> > \[ \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V \]
> > Contoh praktis: Dalam kalimat "Kucing itu duduk di atas kursi yang merah", kata "yang" akan memiliki bobot attention tinggi ke "kursi" untuk memahami kata benda yang dimodifikasi.
> > ### Multi-Head Attention
> > Transformer menggunakan Multi-Head Attention untuk menangkap berbagai jenis hubungan secara paralel. Setiap "head" mempelajari pola attention yang berbeda:
> > 1. Head 1 mungkin fokus pada hubungan kata benda-pronomina
> > 2. Head 2 menangkap relasi struktur kalimat
> > 3. Head 3 memperhatikan konteks posisional
> > Hasil dari semua head kemudian digabungkan (concatenated) dan diproyeksikan ke dimensi akhir. Pendekatan ini memungkinkan model untuk memahami berbagai jenis dependensi dalam data secara simultan.
> > ### Positional Encoding
> > Karena Transformer tidak memiliki informasi urutan bawaan seperti RNN, positional encoding ditambahkan untuk memberikan informasi posisi token. Metode yang umum digunakan adalah fungsi sinusoidal:
> > \[ PE_{(pos,2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right) \]
> > \[ PE_{(pos,2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right) \]
> > Contoh implementasi: Untuk kalimat "Saya belajar NLP", setiap kata akan mendapatkan vektor posisi unik yang ditambahkan ke embedding-nya, memungkinkan model membedakan urutan tanpa rekurensi.
> > ### Keunggulan Arsitektur Transformer
> > 1. **Paralelisasi Penuh**: Memproses seluruh sequence sekaligus berbeda dengan RNN yang sequential
> > 2. **Efisiensi Komputasi**: Kompleksitas O(n²·d) lebih baik daripada O(n·d²) pada RNN untuk sequence panjang
> > 3. **Kemampuan Menangkap Ketergantungan Jarak Jauh**: Tidak ada masalah vanishing gradient seperti pada RNN
> > 4. **Skalabilitas**: Mudah diadaptasi untuk berbagai task dengan transfer learning
> > Studi kasus: Dalam terjemahan mesin, Transformer dapat memproses kalimat 50 kata 5x lebih cepat dibanding LSTM dengan akurasi lebih tinggi.

> [!cornell] #### Summary
> **Transformer** merevolusi pemrosesan sequence dengan menggantikan rekurensi menggunakan **mekanisme self-attention** yang memungkinkan pemrosesan paralel penuh. Arsitekturnya yang terdiri dari encoder-decoder dengan **multi-head attention** dan **positional encoding** mengatasi keterbatasan RNN dalam menangani dependensi jarak jauh. **Paralelisasi** yang unggul memungkinkan pelatihan model skala besar, membuka era transfer learning dalam NLP. Penggunaan **layer normalisasi** dan **residual connection** meningkatkan stabilitas pelatihan model deep.
>

> [!ad-libitum]- Additional Information
>
> #### Detail Matematis Self-Attention
> Self-Attention dihitung melalui:
> 1. Proyeksi matriks input ke Q, K, V
> 2. Perhitungan skor attention: \( \text{Score}_{ij} = \frac{Q_i \cdot K_j^T}{\sqrt{d_k}} \)
> 3. Aplikasi softmax untuk normalisasi skor
> 4. Agregasi nilai berbasis bobot yang dihasilkan
>
> Skala \( \frac{1}{\sqrt{d_k}} \) mencegah nilai dot product menjadi terlalu besar yang dapat menyebabkan gradien kecil setelah softmax.
>
> #### Analisis Kompleksitas
> - **Waktu**: O(n²·d) untuk sequence length n dan dimensi d
> - **Memori**: O(n²) untuk menyimpan matriks attention
> - Optimasi: Blok sparse attention mengurangi kompleksitas menjadi O(n√n)
>
> #### Implementasi dengan TensorFlow
> ```python
> class MultiHeadAttention(tf.keras.layers.Layer):
> def __init__(self, d_model, num_heads):
> super(MultiHeadAttention, self).__init__()
> self.num_heads = num_heads
> self.d_model = d_model
> self.depth = d_model // num_heads
>
> self.wq = tf.keras.layers.Dense(d_model)
> self.wk = tf.keras.layers.Dense(d_model)
> self.wv = tf.keras.layers.Dense(d_model)
> self.dense = tf.keras.layers.Dense(d_model)
>
> def split_heads(self, x, batch_size):
> x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
> return tf.transpose(x, perm=[0, 2, 1, 3])
>
> def call(self, q, k, v, mask):
> batch_size = tf.shape(q)[0]
>
> q = self.wq(q)
> k = self.wk(k)
> v = self.wv(v)
>
> q = self.split_heads(q, batch_size)
> k = self.split_heads(k, batch_size)
> v = self.split_heads(v, batch_size)
>
> scaled_attention = scaled_dot_product_attention(q, k, v, mask)
> concat_attention = tf.transpose(scaled_attention, perm=[0, 2, 1, 3])
> concat_attention = tf.reshape(concat_attention, (batch_size, -1, self.d_model))
> output = self.dense(concat_attention)
> return output
> ```
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan Self-Attention dari scratch untuk task sentiment analysis
> 2. Bandingkan performa Transformer vs LSTM pada dataset terjemahan kecil
> 3. Eksperimen dengan berbagai jenis positional encoding (sinusoidal, learned, relative)
> 4. Visualisasi matriks attention untuk memahami pola yang dipelajari
>
> #### Bacaan Lanjut
> - [Paper Asli "Attention Is All You Need" (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
> - [The Illustrated Transformer oleh Jay Alammar](https://jalammar.github.io/illustrated-transformer/)
> - [Implementasi Pytorch Lightning Transformer](https://pytorch-lightning.readthedocs.io/en/stable/notebooks/lightning_examples/transformer.html)
> - [HuggingFace Transformers Documentation](https://huggingface.co/docs/transformers)