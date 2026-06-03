---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] RNN Fundamentals and Sequential Data Motivation
>
> > ## Questions/Cues
> >
> > - Apa perbedaan data sekuensial dengan asumsi IID pada supervised learning?
> > - Mengapa vanilla neural network terbatas untuk data berurutan?
> > - Apa saja kategori sequence modeling dan contohnya?
> > - Apa itu RNN dan mengapa diperlukan?
> > - Bagaimana sejarah singkat perkembangan RNN?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - RNN Pt. 1 (Pages 5-16)
>
> > ### Data Sekuensial vs Asumsi IID
> > Pada **supervised learning** klasik, terdapat asumsi **IID (independent and identically distributed)** di mana data dianggap saling **independen secara mutual** sehingga **urutan** pemberian contoh ke model tidak relevan dan model **tidak memiliki memori** terhadap contoh yang telah dilihat sebelumnya. Asumsi ini **gugur** ketika kita berhadapan dengan **data sekuensial (sequences)**, karena di sana **urutan menentukan makna**.
> >
> > **Time series** merupakan jenis khusus data sekuensial di mana setiap contoh dikaitkan dengan **dimensi waktu** yang menentukan urutan antar data point — misalnya **harga saham**, **rekaman suara/speech**, atau prediksi nilai tukar **USD ke IDR**. Namun, tidak semua data sekuensial memiliki dimensi waktu. Pada **data teks** atau **sekuens DNA**, contoh-contohnya terurut (kata demi kata, basa demi basa) tetapi **tidak memenuhi syarat sebagai time series** karena tidak ada sumbu waktu eksplisit — hanya **keterurutan**.
> >
> > ### Keterbatasan Vanilla Neural Network
> > **Vanilla neural network** menerima **vektor berukuran tetap (fixed-sized)** sebagai input (misalnya sebuah gambar) dan menghasilkan **vektor berukuran tetap** sebagai output (misalnya probabilitas berbagai kelas). Pemetaan ini dilakukan dengan **jumlah langkah komputasi tetap** (misalnya sebanyak jumlah layer dalam model). Keterbatasan inilah yang menjadi masalah: ketika input, output, atau keduanya berupa **sekuens dengan panjang bervariasi**, arsitektur fixed-size tidak mampu menanganinya. Diperlukan arsitektur yang dapat memproses sekuens pada input, output, atau **keduanya** sekaligus.
> >
> > ### Kategori Sequence Modeling
> > Berdasarkan posisi sekuens, pemodelan sekuens dibagi menjadi beberapa kategori:
> >
> > - **Many-to-one** (sekuens di input): input berupa sekuens, output berupa vektor/skalar tetap. Contoh: **sentiment analysis** (input ulasan film → output label suka/tidak), **essay scoring**, **time-series forecasting** (peramalan permintaan, churn detection), serta **video classification** (deepfake detection).
> > - **One-to-many** (sekuens di output): input format standar (bukan sekuens), output berupa sekuens. Contoh klasik: **image captioning**, di mana input sebuah gambar dan output kalimat yang merangkum isi gambar (arsitektur **CNN encoder + RNN/LSTM decoder**, Vinyals dkk., 2014).
> > - **Many-to-many synchronized**: input dan output keduanya sekuens dan **selaras (sinkron)** per timestep. Contoh: **Named-entity Recognition (NER)** di mana setiap token diberi label (ORG, O, EVT) secara bersamaan.
> > - **Many-to-many delayed (seq2seq)**: input dan output keduanya sekuens namun output **tertunda** — model membaca seluruh input dulu baru menghasilkan output. Contoh: **mesin penerjemah**.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph O2O["One-to-One"]
> >         i1["input"] --> o1["output"]
> >     end
> >     subgraph O2M["One-to-Many"]
> >         i2["input"] --> o2a["out"] --> o2b["out"] --> o2c["out"]
> >     end
> >     subgraph M2O["Many-to-One"]
> >         i3a["in"] --> i3b["in"] --> i3c["in"] --> o3["output"]
> >     end
> >     subgraph M2M["Many-to-Many"]
> >         i4a["in"] --> o4a["out"]
> >         i4b["in"] --> o4b["out"]
> >         i4c["in"] --> o4c["out"]
> >     end
> > ```
> >
> > ### RNN: Apa &amp; Mengapa
> > **Recurrent Neural Network (RNN)** adalah **ANN yang memiliki forward link sekaligus backward link**. Berbeda dengan jaringan feedforward biasa, RNN memiliki koneksi rekuren yang membuatnya mampu **mengingat konteks** sepanjang sekuens. Hal ini menjadikannya topologi yang tepat ketika **urutan data penting**. Secara sejarah singkat: konsep **recurrent nets** muncul pada **1985** (Rumelhart, Hinton, Williams), disusul **LSTM** dan **Bi-RNN** pada **1997** (Hochreiter &amp; Schmidhuber; Schuster &amp; Paliwal), lalu **GRU** pada **2014** (Chung dkk.), dan inovasi lanjutan seperti **Residual LSTM** (2017) serta **Residual Gated Unit** (2019).

> [!cornell] #### Summary
>
> **Data sekuensial** melanggar asumsi **IID** supervised learning karena **urutan menentukan makna**; **time series** (harga saham, suara) adalah subset yang punya dimensi waktu, sedangkan **teks/DNA** terurut tanpa waktu. **Vanilla NN** terbatas pada input/output **berukuran tetap**, sehingga muncul **sequence modeling** dengan kategori **many-to-one** (sentiment analysis, forecasting), **one-to-many** (image captioning), **many-to-many synchronized** (NER), dan **delayed/seq2seq** (terjemahan). **RNN** adalah **ANN dengan forward + backward link** yang mampu mengingat konteks, berkembang dari **recurrent nets (1985)**, **LSTM/Bi-RNN (1997)**, hingga **GRU (2014)**.

> [!ad-libitum]- Additional Information
>
> #### Karpathy: The Unreasonable Effectiveness of RNNs
> Visualisasi kategori sequence modeling (one-to-one, one-to-many, many-to-one, many-to-many) berasal dari blog Andrej Karpathy. Idenya: setiap kotak adalah vektor dan anak panah adalah fungsi (mis. perkalian matriks). RNN memberi fleksibilitas karena ukuran komputasi tidak lagi terikat ke ukuran input/output tetap, melainkan mengikuti panjang sekuens.
>
> #### Mengapa Memori Penting: Contoh Konkret
> Pada kalimat "Bank di tepi sungai" vs "Bank menyetujui pinjaman", kata "bank" hanya bisa diartikan dengan benar bila model mengingat konteks sekitarnya. Inilah inti keunggulan RNN dibanding model bag-of-words yang mengabaikan urutan.
>
> #### Alternatif Modern untuk Data Sekuensial
> - **Transformer** dengan mekanisme self-attention kini mendominasi NLP, memproses seluruh sekuens secara paralel tanpa rekursi.
> - **Temporal Convolutional Network (TCN)** menggunakan dilated causal convolution sebagai alternatif RNN untuk time series.
> - **State Space Models** (mis. Mamba) menawarkan pemrosesan sekuens panjang yang efisien secara linear.
>
> #### Proyek Eksplorasi Mandiri
> 1. Klasifikasikan setiap kalimat dalam dataset ke kategori sequence modeling (many-to-one, one-to-many, dst.) untuk 10 aplikasi ML nyata.
> 2. Bandingkan akurasi model bag-of-words (mengabaikan urutan) vs RNN sederhana pada dataset sentiment analysis IMDB untuk membuktikan pentingnya urutan.
> 3. Buat garis waktu (timeline) interaktif perkembangan arsitektur RNN dari 1985 hingga sekarang lengkap dengan kontribusi masing-masing paper.
>
> #### Bacaan Lanjutan
> - Raschka, S., et al. (2022). *Machine Learning with PyTorch and Scikit-Learn* (Chapter 15). Packt Publishing.
> - Karpathy, A. (2015). [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)
> - Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1985). *Learning internal representations by error propagation*.
