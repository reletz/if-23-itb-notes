---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Encoder-Decoder with Attention - Bahdanau and Luong
>
> > ## Questions/Cues
> >
> > - Apa perbedaan encoder-decoder tanpa dan dengan attention?
> > - Bagaimana decoder memakai context vector per timestep?
> > - Bagaimana proses "paying attention" dipelajari saat training?
> > - Apa perbedaan Bahdanau attention vs Luong attention?
> > - Apa fungsi scoring dot, general, dan concat pada Luong?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Attention &amp; Transformer (Pages 10-13)
> >
>
> > ### Encoder-Decoder tanpa vs dengan Attention
> > Pada arsitektur **encoder-decoder tanpa attention**, encoder memampatkan seluruh input menjadi **satu context vector tunggal** `c` (hidden state terakhir), dan decoder memprediksi tiap kata target berdasarkan vektor tetap itu:
> >
> > `p(yt | y1,…,yt-1, x) = g(yt-1, st, c)`
> >
> > Pada **encoder-decoder dengan attention**, context vector **tidak lagi tunggal** melainkan **berbeda untuk setiap timestep decoder** (`ct`). Decoder menjadi:
> >
> > `p(yt | y1,…,yt-1, x) = g(yt-1, st, ct)`
> > `st = f(st-1, yt-1, ct)`
> >
> > Dengan context vector per timestep, decoder dapat **menyorot bagian kalimat sumber yang berbeda** di setiap langkah produksi kata target — inilah inti perbaikan attention pada penerjemahan mesin.
> >
> > ### Notasi: Encoder vs Decoder
> > Untuk menghindari kebingungan, gunakan notasi konsisten:
> >
> > - **h** = hidden state pada **encoder**; **j** = time step pada **encoder**.
> > - **s** = hidden state pada **decoder**; **t** = time step pada **decoder**.
> >
> > Jadi context vector `ct` (untuk timestep decoder t) dibangun dari kumpulan hidden state encoder `h1, h2, …, hN`, dengan bobot attention yang ditentukan oleh kecocokan antara state decoder `st` dan tiap `hj`.
> >
> > ### Proses "Paying Attention" Dipelajari Saat Training
> > Penting dipahami bahwa **proses "paying attention" dipelajari selama training**. Model **tidak diberi tahu secara eksplisit** kata sumber mana yang berpadanan dengan kata target. Sebaliknya, dengan dataset **parallel corpus** dan fungsi target `x1x2…xN → y1y2…yT`, decoder dilatih untuk **memprediksi kata berikutnya yt** mengingat context vector `ct` dan semua kata yang telah diprediksi sebelumnya `{y1,…,yt-1}`. Melalui backpropagation, bobot attention menyesuaikan diri agar alignment yang dipelajari mendukung prediksi yang akurat.
> >
> > ### Contoh Translasi
> > Misalkan sumber adalah `Budi gave up` dan target `Budi menyerah <eos>`. Encoder mengubah `[Budi, gave, up]` menjadi hidden state `h1, h2, h3`. Saat decoder menghasilkan:
> >
> > - **y1 = "Budi"** → attention berfokus pada `h1` ("Budi").
> > - **y2 = "menyerah"** → attention menyebar ke `h2` ("gave") dan `h3` ("up"), karena frasa "gave up" berpadanan dengan satu kata "menyerah".
> > - **y3 = "<eos>"** → menandai akhir sekuens.
> >
> > Decoder memulai dari token start `<s>` dan secara autoregresif memakai output sebelumnya sebagai input berikutnya, sambil menghitung context vector baru di setiap langkah.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph Encoder
> >       XB["Budi"] --> H1["h1"]
> >       XG["gave"] --> H2["h2"]
> >       XU["up"] --> H3["h3"]
> >     end
> >     H1 --> CT["Context vector ct<br/>(per timestep decoder)"]
> >     H2 --> CT
> >     H3 --> CT
> >     subgraph Decoder
> >       S1["s1"] --> Y1["y1 = Budi"]
> >       S2["s2"] --> Y2["y2 = menyerah"]
> >       S3["s3"] --> Y3["y3 = &lt;eos&gt;"]
> >     end
> >     CT --> S1
> >     CT --> S2
> >     CT --> S3
> > ```
> >
> > ### Bahdanau vs Luong Attention
> > Terdapat dua varian utama mekanisme attention pada encoder-decoder:
> >
> > **Bahdanau Attention (additive, 2015)**: context vector dihitung **sebelum** state decoder baru, lalu masuk ke fungsi rekuren decoder:
> >
> > `p(yt | y1,…,yt-1, x) = g(yt-1, st, ct)`
> > `st = f(st-1, yt-1, ct)`
> >
> > Di sini `ct` menjadi **input** bagi perhitungan `st`.
> >
> > **Luong Attention (multiplicative, 2015)**: state decoder dihitung dulu tanpa context (`st = f(st-1, yt-1)`), kemudian digabung dengan context vector untuk membentuk hidden state attentional:
> >
> > `s̃t = f(ct, st) = tanh(Wc·[ct; st])`
> >
> > Di sini `ct` digabung **setelah** `st` terbentuk, lalu `s̃t` dipakai untuk prediksi.
> >
> > ### Scoring pada Luong: dot, general, concat
> > Luong memperkenalkan tiga **fungsi scoring** untuk menghitung alignment antara state decoder `st` dan hidden state encoder `hj`:
> >
> > - **dot**: `score(st, hj) = stᵀ·hj` — perkalian titik langsung, paling sederhana.
> > - **general**: `score(st, hj) = stᵀ·Wa·hj` — menambahkan matriks bobot `Wa` agar lebih fleksibel.
> > - **concat**: `score(st, hj) = vaᵀ·tanh(Wa·[st; hj])` — mirip pendekatan additive Bahdanau.
> >
> > Skor inilah yang dinormalisasi menjadi bobot attention. Secara umum, Luong attention lebih **sederhana dan komputasi-efisien** (terutama varian dot/general) dibanding additive Bahdanau, sementara keduanya menjadi cikal bakal **self-attention** pada Transformer.

> [!cornell] #### Summary
>
> **Encoder-decoder dengan attention** menggantikan **context vector tunggal** dengan **context vector ct per timestep decoder**, sehingga decoder menjadi `p(yt|y1,…,yt-1,x) = g(yt-1, st, ct)` dengan `st = f(st-1, yt-1, ct)`. Proses **"paying attention" dipelajari saat training** dari parallel corpus tanpa anotasi alignment eksplisit (contoh: `Budi gave up → Budi menyerah <eos>`). **Bahdanau attention** (additive) memasukkan ct ke perhitungan st, sedangkan **Luong attention** (multiplicative) menghitung `s̃t = tanh(Wc·[ct; st])` setelah st terbentuk, dengan tiga fungsi scoring: **dot, general, concat**. Notasi yang konsisten: **h/j** untuk hidden state dan timestep encoder, **s/t** untuk decoder.

> [!ad-libitum]- Additional Information
>
> #### Global vs Local Attention (Luong)
> Selain perbedaan dengan Bahdanau, Luong et al. (2015) juga membedakan **global attention** (memperhatikan seluruh hidden state encoder) dan **local attention** (hanya jendela kecil di sekitar posisi yang diperkirakan relevan). Local attention mengurangi biaya komputasi untuk kalimat panjang dengan memprediksi posisi fokus `pt` lalu membatasi attention pada jendela `[pt-D, pt+D]`.
>
> #### Teacher Forcing pada Pelatihan Decoder
> Saat training, decoder umumnya memakai **teacher forcing**: input langkah berikutnya diambil dari kata target sebenarnya (ground truth), bukan dari prediksi model. Ini mempercepat konvergensi, namun menimbulkan **exposure bias** karena saat inference model harus memakai prediksinya sendiri. Teknik seperti scheduled sampling mencoba menjembatani celah ini.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan encoder-decoder GRU dengan Bahdanau attention untuk penerjemahan Inggris-Indonesia, lalu visualisasikan matriks alignment per kata.
> 2. Bandingkan tiga fungsi scoring Luong (dot, general, concat) pada dataset translasi kecil dan ukur BLEU score masing-masing.
> 3. Eksperimen global vs local attention pada kalimat panjang dan amati pengaruhnya terhadap kualitas dan kecepatan.
>
> #### Bacaan Lanjutan
> - Bahdanau, D., Cho, K., & Bengio, Y. (2014). [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473).
> - Luong, M.-T., Pham, H., & Manning, C. D. (2015). [Effective Approaches to Attention-based Neural Machine Translation](https://arxiv.org/abs/1508.04025).
> - Tunstall, L., von Werra, L., & Wolf, T. (2022). *Natural Language Processing with Transformers*, O'Reilly.
