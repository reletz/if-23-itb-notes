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
> > - Apa tujuan model sequence-to-sequence?
> > - Bagaimana encoder mengolah input sequential?
> > - Fungsi apa yang dimiliki vector encoder?
> > - Mengapa decoder memerlukan hidden state awal?
> > - Bagaimana aplikasi praktis encoder-decoder?
> >
> > ## Reference Points
> >
> > - Lecture_IF3270.pptx (Slides 37-43)
> > - Goodfellow et al. Deep Learning (Chapter 10)
> >
>
> > ### Konsep Dasar Sequence-to-Sequence
> > Model sequence-to-sequence (seq2seq) dirancang untuk memetakan input berurutan dengan panjang tetap ke output berurutan yang mungkin memiliki panjang berbeda. Pendekatan ini menjadi dasar untuk berbagai tugas pemrosesan bahasa alami seperti **terjemahan mesin**, **penjawab pertanyaan otomatis**, dan **generasi teks deskriptif untuk video**. Berbeda dengan model RNN tradisional yang memerlukan panjang input-output sama, arsitektur ini memungkinkan fleksibilitas dalam struktur data.
> > Contoh aplikasi nyata:
> > - Terjemahan: "Mary eats apples" (Bahasa Inggris) → "Marie mange des pommes" (Bahasa Prancis)
> > - QA System: "Tim is playing in his room.||Where is Tim?" → "Tim is in his room"
> > - Video captioning: Deretan frame video → "Seorang wanita sedang memasak di dapur"
> > ### Arsitektur Encoder
> > Bagian encoder terdiri dari beberapa unit recurrent (biasanya RNN atau variannya) yang memproses setiap elemen input secara berurutan. Setiap unit:
> > 1. Menerima satu elemen input (misalnya kata dalam kalimat)
> > 2. Mengumpulkan informasi kontekstual
> > 3. Meneruskan state tersembunyi (_hidden state_) ke unit berikutnya
> > Proses ini analog dengan **penerjemah manusia yang mendengarkan seluruh kalimat** sebelum mulai menerjemahkan. Setelah memproses seluruh input, encoder menghasilkan **encoder vector** (state tersembunyi akhir) yang mengkapsulasi informasi esensial dari seluruh urutan input.
> > ### Encoder Vector sebagai Memori Kontekstual
> > Encoder vector berfungsi sebagai:
> > - Representasi terpadu seluruh input
> > - State awal untuk decoder
> > - "Memori kerja" yang menyimpan dependensi jangka panjang
> > Dalam implementasi teknis, vector ini dihitung melalui fungsi:
> > ```
> > h_encoder = f(W * x_t + U * h_{t-1} + b)
> > ```
> > di mana `f` adalah fungsi aktivasi, `W` dan `U` matriks berat, `x_t` input timestep-t, dan `b` bias.
> > ### Mekanisme Decoder
> > Decoder merupakan jaringan recurrent yang menggunakan encoder vector sebagai state awal untuk memulai generasi output. Pada setiap timestep:
> > 1. Menerima state tersembunyi sebelumnya
> > 2. Menghasilkan prediksi output
> > 3. Memperbarui state tersembunyi untuk timestep berikutnya
> > Contoh proses terjemahan:
> > 1. Encoder vector (yang menyimpan makna "Mary eats apples") diinisialisasi sebagai h_0 decoder
> > 2. Decoder menghasilkan "Marie" sebagai output pertama
> > 3. State tersembunyi diperbarui dengan mempertimbangkan output sebelumnya
> > 4. Proses berlanjut hingga menghasilkan tanda akhir kalimat
> > ### Aplikasi dan Variasi Model
> > Selain terjemahan mesin, arsitektur ini digunakan untuk:
> > - **Text Summarization**: Input dokumen panjang → output ringkasan
> > - **Speech Recognition**: Input sinyal audio → output transkripsi teks
> > - **Image Captioning**: Input citra → deskripsi tekstual
> > Variasi modern meliputi:
> > - **Attention Mechanism**: Memungkinkan decoder fokus pada bagian spesifik encoder vector
> > - **Transformer Architecture**: Menggantikan RNN dengan self-attention untuk penangkapan konteks lebih baik

> [!cornell] #### Summary
>
> **Model encoder-decoder** memungkinkan pemrosesan urutan dengan panjang input-output berbeda melalui dua komponen utama: **encoder** yang mengompresi input menjadi representasi vektor, dan **decoder** yang menggunakan vektor tersebut untuk membangkitkan output berurutan. Arsitektur ini menjadi landasan sistem terjemahan mesin modern dan aplikasi NLP lanjutan, dengan kemampuan menangani dependensi jangka panjang melalui mekanisme state tersembunyi. **Encoder vector** berperan kritis sebagai pembawa informasi kontekstual antar komponen.
>

> [!ad-libitum]- Additional Information
>
> #### Evaluasi Kinerja Model
> Metrik evaluasi utama untuk model seq2seq:
> - **BLEU Score**: Mengukur kecocokan n-gram antara output model dan referensi manusia
> - **ROUGE**: Fokus pada recall n-gram untuk tugas summarization
> - **METEOR**: Mempertimbangkan sinonim dan stemming dalam evaluasi
>
> Tantangan utama meliputi masalah **penyusutan kosa kata** (_vocabulary bottleneck_) dan **generasi output repetitif** yang diatasi dengan teknik seperti _beam search_ dan _sampling stokastik_.
>
> #### Implementasi Praktis dengan TensorFlow
> Contoh implementasi dasar encoder-decoder:
> ```python
> # Encoder
> encoder_inputs = Input(shape=(max_input_len,))
> encoder_embedding = Embedding(input_vocab_size, 256)(encoder_inputs)
> encoder_lstm = LSTM(128, return_state=True)
> encoder_outputs, state_h, state_c = encoder_lstm(encoder_embedding)
>
> # Decoder
> decoder_inputs = Input(shape=(max_output_len,))
> decoder_embedding = Embedding(output_vocab_size, 256)(decoder_inputs)
> decoder_lstm = LSTM(128, return_sequences=True, return_state=True)
> decoder_outputs, _, _ = decoder_lstm(decoder_embedding, initial_state=[state_h, state_c])
> decoder_dense = Dense(output_vocab_size, activation='softmax')
> output = decoder_dense(decoder_outputs)
> ```
>
> #### Tantangan dalam Training
> - **Alignment Problem**: Hubungan kompleks antara posisi input-output
> - **Exposure Bias**: Discrepancy antara training (menggunakan ground truth) dan inference (menggunakan prediksi model)
> - **Mode Collapse**: Kecenderungan menghasilkan output generik berulang
>
> Solusi terkini meliputi teknik _curriculum learning_, _reinforcement learning_, dan _adversarial training_.
>
> #### Self-Exploration Projects
> 1. Bangun model terjemahan Inggris-Indonesia menggunakan dataset Paralel TED Talks
> 2. Implementasikan beam search decoding dengan panjang beam 3-5
> 3. Eksperimen dengan mekanisme attention sederhana berbasis dot-product
> 4. Ukur pengaruh ukuran embedding (64 vs 256 dimensi) terhadap akurasi BLEU
>
> #### Tools dan Resources
> - **Framework**: TensorFlow Seq2Seq Tutorial, PyTorch TorchText
> - **Dataset**: WMT14, Multi30k, OPUS
> - **Library**: HuggingFace Transformers, OpenNMT-py
> - **Visualization**: TensorBoard Embedding Projector
>
> #### Further Reading
> - "Neural Machine Translation by Jointly Learning to Align and Translate" (Bahdanau et al. 2014)
> - "Attention Is All You Need" (Vaswani et al. 2017)
> - "Sequence to Sequence Learning with Neural Networks" (Sutskever et al. 2014)
> - Buku "Natural Language Processing with PyTorch" oleh Delip Rao