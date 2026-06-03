---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Encoder-Decoder Models in Sequence Learning
>
> > ## Questions/Cues
> >
> > - Apa itu model sequence-to-sequence dan untuk apa digunakan?
> > - Apa saja use case encoder-decoder?
> > - Apa peran encoder dalam arsitektur ini?
> > - Apa itu encoder vector / context vector?
> > - Bagaimana decoder menghasilkan output?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - LSTM (Pages 45-51)
>
> > ### Model Sequence-to-Sequence
> >
> > Sebuah model **sequence-to-sequence (seq2seq)** bertujuan **memetakan input panjang-tetap ke output panjang-tetap, di mana panjang input dan output dapat berbeda**. Ini berbeda dari RNN biasa yang panjang input dan output-nya terikat sama. Kemampuan menangani panjang yang berbeda inilah yang membuat seq2seq cocok untuk tugas transformasi sekuens.
> >
> > ### Use Case
> >
> > Beberapa contoh penerapan model seq2seq:
> >
> > 1. **Machine Translation** — menerjemahkan kalimat antar bahasa. Contoh: [English] "Mary eats apples." → [French] "Marie mange des pommes." Perhatikan jumlah kata pada input (3) dan output (4) berbeda.
> > 2. **Question Answering** — menjawab pertanyaan berdasarkan konteks. Contoh: [Question] "Tim is playing in his room. || Where is Tim?" → [Answer] "Tim is in his room."
> > 3. **Video Captioning** — menghasilkan deskripsi teks dari rangkaian frame video (input visual sekuensial → output teks).
> >
> > ### Arsitektur RNN Encoder-Decoder
> >
> > Arsitektur ini terdiri dari tiga bagian: **Encoder → Encoder Vector (context vector) → Decoder**. Encoder "membaca" seluruh input dan memampatkannya menjadi satu vektor konteks, lalu decoder "menulis" output dari vektor tersebut.
> >
> > ```mermaid
> > flowchart LR
> >     X1["x1"] --> E1["Encoder<br/>RNN/LSTM"]
> >     X2["x2"] --> E2["Encoder<br/>RNN/LSTM"]
> >     X3["x3"] --> E3["Encoder<br/>RNN/LSTM"]
> >     E1 --> E2 --> E3
> >     E3 --> CV["Encoder Vector<br/>(context vector)"]
> >     CV --> D1["Decoder<br/>RNN/LSTM"]
> >     D1 --> D2["Decoder<br/>RNN/LSTM"]
> >     D2 --> D3["Decoder<br/>RNN/LSTM"]
> >     D1 --> Y1["y1"]
> >     D2 --> Y2["y2"]
> >     D3 --> Y3["y3"]
> > ```
> >
> > ### Encoder
> >
> > **Encoder** adalah **tumpukan beberapa recurrent unit** (RNN/LSTM/GRU) di mana setiap unit **menerima satu elemen dari sekuens input**, mengumpulkan informasi untuk elemen tersebut, dan **merambatkannya maju** ke unit berikutnya. Dengan begitu, hidden state encoder secara progresif mengakumulasi informasi seluruh input dari elemen pertama hingga terakhir.
> >
> > ### Encoder Vector / Context Vector
> >
> > **Encoder Vector** (disebut juga **context vector**) adalah **hidden state terakhir** yang dihasilkan bagian encoder. Karakteristiknya:
> >
> > - Dihitung memakai rumus encoder (hidden state RNN/LSTM pada timestep terakhir).
> > - Bertujuan **merangkum/mengenkapsulasi informasi seluruh elemen input** agar membantu decoder membuat prediksi akurat.
> > - **Berperan sebagai initial hidden state dari decoder.**
> >
> > Vektor inilah jembatan antara encoder dan decoder: seluruh "makna" input dipadatkan ke dalam satu vektor.
> >
> > ### Decoder
> >
> > **Decoder** adalah **tumpukan beberapa recurrent unit** di mana **setiap unit memprediksi satu output yt pada timestep t**. Setiap recurrent unit:
> >
> > - Menerima **hidden state dari unit sebelumnya**.
> > - Menghasilkan **output** sekaligus **hidden state-nya sendiri** untuk diteruskan.
> >
> > Decoder dimulai dari context vector sebagai initial hidden state, lalu menghasilkan output satu per satu hingga seluruh sekuens keluaran selesai (biasanya sampai token akhir/EOS).
> >
> > ### Contoh: Machine Translation
> >
> > Pada penerjemahan, encoder membaca kalimat sumber kata demi kata hingga seluruh kalimat terangkum dalam context vector. Decoder kemudian membangkitkan kalimat target kata demi kata: output kata pertama menjadi bagian dari konteks untuk memprediksi kata berikutnya, dan seterusnya, sehingga panjang kalimat hasil bisa berbeda dari kalimat sumber.

> [!cornell] #### Summary
>
> Model **sequence-to-sequence** memetakan **input panjang-tetap ke output panjang-tetap yang panjangnya bisa berbeda**, cocok untuk **machine translation**, **question answering**, dan **video captioning**. Arsitektur **RNN encoder-decoder** terdiri dari **Encoder** (tumpukan recurrent unit yang menerima tiap elemen input dan merambatkannya maju), **Encoder Vector / context vector** (hidden state terakhir encoder yang merangkum seluruh input dan menjadi **initial hidden state decoder**), dan **Decoder** (tumpukan recurrent unit yang memprediksi output yt tiap timestep dari hidden state sebelumnya sambil menghasilkan hidden state baru). Seluruh makna input dipadatkan ke satu context vector, lalu decoder membangkitkan keluaran satu per satu — seperti pada contoh penerjemahan "Mary eats apples." → "Marie mange des pommes."

> [!ad-libitum]- Additional Information
>
> #### Keterbatasan Context Vector Tunggal dan Attention
> Memampatkan seluruh input ke **satu** context vector menjadi bottleneck pada kalimat panjang — informasi awal cenderung "terlupa". **Mekanisme attention** (Bahdanau 2014, Luong 2015) mengatasi ini dengan membiarkan decoder "melihat" seluruh hidden state encoder dan memberi bobot pada bagian input yang relevan di tiap langkah, bukan hanya bergantung pada satu vektor.
>
> #### Teacher Forcing saat Pelatihan
> Saat melatih decoder, teknik **teacher forcing** memberi token target yang benar sebagai input langkah berikutnya (bukan prediksi model). Ini mempercepat konvergensi, tetapi menimbulkan **exposure bias** saat inferensi karena model harus memakai prediksinya sendiri. Solusi: scheduled sampling.
>
> #### Dari Seq2Seq ke Transformer
> Encoder-decoder berbasis RNN adalah pendahulu **Transformer** (Vaswani 2017), yang mengganti recurrence dengan **self-attention** penuh, memungkinkan paralelisasi dan menangkap dependency jarak jauh lebih baik — fondasi model modern seperti BERT dan GPT.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun model seq2seq LSTM sederhana untuk menerjemahkan tanggal format bebas ke format ISO (mis. "3 Juni 2026" → "2026-06-03").
> 2. Tambahkan mekanisme attention dan bandingkan kualitas terjemahan pada kalimat panjang vs context vector tunggal.
> 3. Visualisasikan bobot attention sebagai heatmap untuk melihat alignment input-output.
>
> #### Bacaan Lanjutan
> - Sutskever, I., Vinyals, O., &amp; Le, Q. (2014). *Sequence to Sequence Learning with Neural Networks*.
> - Cho, K., et al. (2014). *Learning Phrase Representations using RNN Encoder-Decoder*.
> - Bahdanau, D., Cho, K., &amp; Bengio, Y. (2015). *Neural Machine Translation by Jointly Learning to Align and Translate*.
> - [Understanding Encoder-Decoder Sequence to Sequence Model](https://medium.com/data-science/understanding-encoder-decoder-sequence-to-sequence-model-679e04af4346)
