---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Attention Mechanism in RNNs
>
> > ## Questions/Cues
> >
> > - Apa ide sentral di balik mekanisme attention pada RNN?
> > - Bagaimana context vector dibangun dari hidden state?
> > - Apa perbedaan arsitektur RNN dengan dan tanpa attention?
> > - Bagaimana forward propagation many-to-one dengan attention dihitung?
> > - Bagaimana attention memengaruhi jumlah parameter model?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Attention &amp; Transformer (Pages 2-9)
> >
>
> > ### Ide Sentral di Balik Attention
> > Pada arsitektur encoder-decoder RNN klasik, seluruh sekuens input dipadatkan menjadi **satu context vector tunggal** (hidden state terakhir encoder). Pendekatan ini menimbulkan **bottleneck informasi**: untuk sekuens panjang, satu vektor berukuran tetap tidak mampu menyimpan seluruh informasi penting, sehingga informasi dari awal sekuens cenderung "terlupakan".
> >
> > Ide sentral **mekanisme attention** (Bahdanau, Cho, & Bengio, 2015) adalah **jangan membuang intermediate encoder states**, melainkan **memanfaatkan semua state** untuk membangun context vector yang dibutuhkan decoder dalam menghasilkan sekuens output. Dengan kata lain, alih-alih hanya memakai hidden state terakhir, model belajar "melihat kembali" ke seluruh riwayat hidden state dan memutuskan bagian mana yang paling relevan untuk setiap langkah prediksi.
> >
> > ### Many-to-One dengan Attention
> > Pada skenario **many-to-one** (banyak input, satu output, mis. klasifikasi sentimen atau prediksi deret Fibonacci), attention bekerja dengan **memberi bobot atau "perhatian"** ⍺t ke state-state masa lalu. Setiap hidden state h(j) dari timestep encoder memperoleh sebuah skor bobot ⍺j yang menyatakan seberapa penting state tersebut bagi output akhir.
> >
> > Bobot attention ⍺ ini **dinormalisasi** (umumnya melalui softmax) sehingga seluruhnya berjumlah 1, lalu digunakan untuk menggabungkan hidden state. Sebagai contoh, pada deret Fibonacci dengan input `[8, 13, 21]`, model dapat memberi bobot lebih besar pada dua state terakhir karena keduanya paling menentukan nilai berikutnya. Secara empiris, penambahan attention pada deret Fibonacci menurunkan **mean square error** pada test set dibanding model tanpa attention.
> >
> > ### Context Vector sebagai Weighted Sum
> > **Context vector** `c` adalah **jumlah berbobot (weighted sum)** dari seluruh hidden state encoder:
> >
> > `c = Σj ⍺j · h(j)`
> >
> > di mana ⍺j adalah bobot attention untuk hidden state h(j). Karena bobot ditentukan secara dinamis dan dipelajari, context vector ini merangkum informasi dari **seluruh timestep**, bukan hanya state terakhir. Inilah yang memungkinkan model menyoroti bagian sekuens yang paling informatif.
> >
> > ```mermaid
> > flowchart LR
> >     X1["x1 = 8"] --> H1["h1"]
> >     X2["x2 = 13"] --> H2["h2"]
> >     X3["x3 = 21"] --> H3["h3"]
> >     H1 -. "⍺1" .-> C["Context vector<br/>c = Σ ⍺j h(j)"]
> >     H2 -. "⍺2" .-> C
> >     H3 -. "⍺3" .-> C
> >     C --> Y["y3 = fy(Why·c + bhy)"]
> > ```
> >
> > ### Arsitektur dengan vs tanpa Attention
> > Pada implementasi (mis. Keras), perbedaan arsitektur tampak jelas. Untuk konfigurasi `Hidden_units = 2`, `Dense_units = 1`, `Time_steps = 20`:
> >
> > - **Tanpa attention**: jumlah parameter `#Params = (1+2+1)·2 + (2+1)·1 = 11`. Output langsung diambil dari hidden state terakhir.
> > - **Dengan attention** (`Attention_units = 1`): ditambahkan **attention weight** sebanyak 20 nilai (⍺t1..⍺t_ts) dengan **shape (time_steps, attention_units)**, serta **attention bias** sebanyak 2 dengan **shape (hidden_units, attention_units)**.
> >
> > Komponen tambahan ini (attention units, attention weight, attention bias) merupakan parameter baru yang harus dilatih, sehingga model belajar **cara mendistribusikan perhatian** ke setiap timestep.
> >
> > ### Forward Propagation Many-to-One dengan Attention
> > Forward propagation berjalan dalam dua tahap. Pertama, **encoder** menghitung hidden state untuk tiap timestep:
> >
> > `h(j) = fh(Wxh·x(j) + Whh·h(j-1) + bxh)`
> >
> > Kemudian bobot attention ⍺t1, ⍺t2, ⍺t3 dihitung dari hidden state, dan **context vector** `c` dibentuk sebagai weighted sum. Akhirnya, **output** dihasilkan dari context vector:
> >
> > `y(t) = fy(Why·c + bhy)`
> >
> > Bandingkan dengan model tanpa attention yang outputnya `y(3) = Linear(Why·h(3) + bhy)` — hanya bergantung pada satu hidden state terakhir. Pada versi attention, `y(3) = Linear(Why·c + bhy)` bergantung pada context vector yang merangkum seluruh state.
> >
> > ### Perhitungan Jumlah Parameter
> > Jumlah parameter RNN dasar (tanpa attention) adalah:
> >
> > `#Params = (ninput + nhidden + 1)·nhidden + (nhidden + 1)·noutput`
> >
> > Dengan penambahan **satu attention unit**, suku tambahan muncul untuk bobot attention sepanjang timestep:
> >
> > `#Params = (ninput + nhidden + 1)·nhidden + ntimestep + nhidden + (nhidden + 1)·noutput`
> >
> > Suku `ntimestep + nhidden` merepresentasikan bobot dan bias attention yang baru. Penambahan ini relatif kecil dibanding total parameter, namun memberi peningkatan kualitas yang berarti.
> >
> > ### Many-to-One vs Many-to-Many Attention
> > Perbedaan kunci antara kedua mode terletak pada **jumlah context vector**:
> >
> > - **Many-to-One**: dihasilkan **satu context vector** untuk satu output. `#Params attention = ntimestep_enc + nhidden`.
> > - **Many-to-Many**: dihasilkan **satu context vector per timestep decoder** (setiap langkah output punya distribusi attention sendiri). `#Params attention = (ntimestep_enc + nhidden)·ntimestep_dec`.
> >
> > Mode many-to-many inilah yang menjadi fondasi arsitektur **encoder-decoder dengan attention** untuk tugas seperti penerjemahan mesin, di mana setiap kata target dapat "memperhatikan" bagian berbeda dari kalimat sumber.

> [!cornell] #### Summary
>
> **Mekanisme attention pada RNN** (Bahdanau et al., 2015) lahir dari ide untuk **tidak membuang intermediate encoder states** melainkan **memanfaatkan seluruh hidden state** dalam membangun **context vector**. Pada **many-to-one**, model memberi **bobot ⍺t** ke tiap state masa lalu, lalu menggabungkannya menjadi context vector `c = Σ ⍺j·h(j)` (weighted sum) yang dipakai menghasilkan output `y(t) = fy(Why·c + bhy)`. Dibanding RNN biasa, attention menambah **attention weight (shape time_steps × attention_units)** dan **attention bias**, sehingga jumlah parameter bertambah suku `ntimestep + nhidden`. Perbedaan **many-to-one vs many-to-many** terletak pada jumlah context vector: satu vektor untuk satu output, atau **satu context vector per timestep decoder** yang menjadi dasar encoder-decoder dengan attention.

> [!ad-libitum]- Additional Information
>
> #### Cara Bobot Attention Dihitung (Alignment Score)
> Bobot ⍺j umumnya dihasilkan dari **alignment score** `e_j` yang mengukur kecocokan antara state decoder dan tiap hidden state encoder, lalu dinormalisasi dengan softmax: `⍺j = exp(e_j) / Σk exp(e_k)`. Pada formulasi additive (Bahdanau), `e_j = vᵀ·tanh(W·[s; h_j])`. Karena softmax differentiable, seluruh mekanisme dapat dilatih end-to-end melalui backpropagation tanpa anotasi alignment eksplisit.
>
> #### Interpretabilitas via Heatmap Attention
> Salah satu keuntungan praktis attention adalah **interpretabilitas**. Dengan memvisualisasikan matriks bobot ⍺ sebagai heatmap, kita dapat melihat timestep input mana yang "diperhatikan" model saat menghasilkan output tertentu — berguna untuk debugging dan menjelaskan keputusan model pada tugas seperti penerjemahan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan custom attention layer pada RNN untuk prediksi deret Fibonacci, lalu bandingkan MSE test set dengan dan tanpa attention.
> 2. Latih klasifikasi sentimen (many-to-one) dengan attention pada dataset IMDB, lalu visualisasikan bobot ⍺ tiap kata untuk melihat kata mana yang paling berpengaruh.
> 3. Bandingkan jumlah parameter dan waktu latih antara LSTM biasa dan LSTM + attention pada panjang sekuens yang berbeda.
>
> #### Bacaan Lanjutan
> - Bahdanau, D., Cho, K., & Bengio, Y. (2015). [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473), ICLR 2015.
> - [Adding a Custom Attention Layer to Recurrent Neural Network in Keras](https://machinelearningmastery.com/adding-a-custom-attention-layer-to-recurrent-neural-network-in-keras/)
> - Olah, C. & Carter, S. (2016). [Attention and Augmented Recurrent Neural Networks](https://distill.pub/2016/augmented-rnns/), Distill.
