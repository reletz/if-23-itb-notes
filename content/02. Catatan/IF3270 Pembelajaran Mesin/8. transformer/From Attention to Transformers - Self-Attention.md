---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] From Attention to Transformers - Self-Attention
>
> > ## Questions/Cues
> >
> > - Mengapa attention disebut terobosan untuk seq2seq dan transfer learning?
> > - Apa beda RNN enc-dec dengan attention vs Transformer?
> > - Apa keuntungan pemrosesan paralel pada Transformer?
> > - Bagaimana dot-product self-attention bekerja?
> > - Apa peran query, key, dan value?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Attention &amp; Transformer (Pages 14-20)
> >
>
> > ### Terobosan: Attention untuk Seq2Seq dan Transfer Learning
> > Mekanisme attention menjadi **terobosan ilmiah** pada dua front sekaligus. Pertama, untuk **encoder-decoder (Seq2Seq)**, attention menghilangkan bottleneck context vector tunggal dan secara dramatis meningkatkan kualitas penerjemahan mesin. Kedua, attention membuka pintu **transfer learning** di NLP: model besar yang dilatih pada korpus raksasa dapat di-*fine-tune* untuk tugas hilir (downstream) dengan data terbatas, persis seperti yang terjadi di visi komputer dengan CNN pra-latih.
> >
> > ### Vanilla RNN Enc-Dec with Attention vs Transformer
> > Perbedaan fundamental: arsitektur **Transformer mengganti unit rekuren** (RNN/LSTM) di dalam encoder dan decoder **sepenuhnya** dengan **lapisan self-attention** dan **jaringan feed-forward sederhana**. Akibatnya:
> >
> > - **Vanilla RNN enc-dec**: token diproses **sekuensial** — token ke-t hanya bisa dihitung setelah token ke-(t-1) selesai.
> > - **Transformer**: seluruh token diproses **paralel** melalui model dalam satu langkah, karena tidak ada ketergantungan rekuren antar timestep.
> >
> > ### Keuntungan Paralelisasi
> > Berpindah dari pemrosesan sekuensial ke **pemrosesan paralel penuh** membuka beberapa keuntungan besar:
> >
> > - **Efisiensi komputasi** — paralelisasi memungkinkan pelatihan pada **korpus berorde magnitudo lebih besar** untuk biaya komputasi yang sama.
> > - **Hilangnya bottleneck sekuensial** — informasi tidak harus mengalir lewat rantai timestep, sehingga Transformer lebih efisien pada tugas yang membutuhkan agregasi informasi **rentang panjang (long-range)**.
> > - **Scaling laws** deep learning — model yang **lebih besar** dilatih pada **data lebih banyak** dalam banyak kasus menghasilkan **hasil yang lebih baik**. Namun, scaling ini berbiaya: butuh data latih dalam jumlah sangat besar.
> >
> > Kombinasi inilah yang memicu "revolusi Transformer" dan kebangkitan transfer learning di NLP.
> >
> > ### Dot-Product Self-Attention
> > Berbeda dari attention RNN yang menghubungkan decoder ke encoder, **self-attention** menghitung attention **antar input dari sekuens yang sama**. Untuk tiap pasangan input `xi` dan `xj`, dihitung skor attention `a[xi, xj]` yang menyatakan seberapa besar `xi` "memperhatikan" `xj`.
> >
> > Output self-attention untuk posisi i adalah **weighted sum dari value** seluruh posisi:
> >
> > `sa_i = Σj a[xi, xj] · vj`
> >
> > Contoh dengan tiga input dan bobot yang sudah dinormalisasi:
> >
> > - `sa1 = 0.1·v1 + 0.3·v2 + 0.6·v3`
> > - `sa2 = 0.5·v1 + 0.2·v2 + 0.3·v3`
> > - `sa3 = 0.1·v1 + 0.2·v2 + 0.7·v3`
> >
> > Setiap output merupakan campuran value dari semua posisi, dengan proporsi ditentukan oleh skor attention.
> >
> > ### Query, Key, Value dari Transformasi Linear
> > Attention pada Transformer diambil dari **transformasi linear terhadap input**. Setiap input `xi` diproyeksikan menjadi tiga vektor berbeda lewat matriks bobot terpisah:
> >
> > - **Query (q = WQ·x)** — "apa yang sedang dicari" oleh posisi ini.
> > - **Key (k = WK·x)** — "label/penanda" yang dipakai posisi lain untuk dicocokkan.
> > - **Value (v = WV·x)** — "isi informasi" yang akan diagregasi.
> >
> > Skor attention dihitung dari **dot product antara query dan key**: `a[xi, xj] = softmax(qi · kj)`. Intuisinya seperti pencarian di basis data: query dari posisi i dibandingkan dengan key tiap posisi; semakin cocok, semakin besar bobotnya, lalu value yang bersesuaian diambil sebanding bobot tersebut.
> >
> > ```mermaid
> > flowchart TD
> >     X["Input x1, x2, x3"] --> Q["Query Q = WQ·x"]
> >     X --> K["Key K = WK·x"]
> >     X --> V["Value V = WV·x"]
> >     Q --> S["Scores = Q·Kᵀ"]
> >     K --> S
> >     S --> SC["Scale: / √dk"]
> >     SC --> SM["Softmax → bobot a[xi,xj]"]
> >     SM --> O["Output sa_i = Σ a[xi,xj]·vj"]
> >     V --> O
> > ```
> >
> > ### Scaled Dot-Product Self-Attention
> > Pada dimensi besar, hasil dot product `qi · kj` bisa membengkak sehingga softmax masuk ke wilayah gradien sangat kecil (saturasi). Karena itu Transformer memakai **scaled dot-product self-attention**: skor **dibagi dengan akar dimensi key** `√dk` sebelum softmax:
> >
> > $$Attention(Q, K, V) = softmax( \frac{Q·Kᵀ}{√d_k} ) · V$$
> >
> > Pembagian dengan `√dk` menstabilkan magnitudo skor sehingga softmax tetap berada di rentang gradien sehat, mempercepat dan menstabilkan pelatihan. Inilah formula self-attention inti yang menjadi blok bangun utama arsitektur Transformer.

> [!cornell] #### Summary
>
> **Attention** menjadi terobosan ganda: memperbaiki **Seq2Seq** sekaligus membuka **transfer learning** di NLP. **Transformer** menggantikan unit rekuren sepenuhnya dengan **self-attention + feed-forward**, sehingga token diproses **paralel** bukan sekuensial — memberi efisiensi komputasi, menghapus bottleneck sekuensial, dan mendukung **scaling laws** (model lebih besar + data lebih banyak → hasil lebih baik). **Self-attention** menghitung attention antar input sekuens yang sama: tiap input diproyeksikan linear menjadi **Query, Key, Value**; skor `a[xi,xj]` dari dot product query-key, lalu output `sa_i = Σ a[xi,xj]·vj`. Versi **scaled dot-product** membagi skor dengan **√dk** sebelum softmax agar pelatihan stabil.

> [!ad-libitum]- Additional Information
>
> #### Kompleksitas Self-Attention vs RNN
> Self-attention memiliki kompleksitas `O(n²·d)` terhadap panjang sekuens n, sedangkan RNN `O(n·d²)`. Untuk sekuens pendek-menengah dengan dimensi besar, self-attention lebih murah dan sepenuhnya paralel; namun untuk sekuens sangat panjang, biaya kuadratik terhadap n menjadi penghambat — memicu riset efficient attention seperti Longformer, Performer, dan FlashAttention.
>
> #### Mengapa Tepat √dk
> Jika komponen q dan k adalah variabel acak independen dengan rata-rata 0 dan varians 1, maka dot product berdimensi dk memiliki varians dk. Membagi dengan √dk mengembalikan varians ke ~1, menjaga input softmax pada skala yang konsisten apa pun dimensinya — alasan matematis di balik pemilihan faktor skala ini.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan scaled dot-product self-attention dari nol dengan NumPy, lalu verifikasi outputnya cocok dengan `torch.nn.functional.scaled_dot_product_attention`.
> 2. Ukur waktu inference RNN vs self-attention pada panjang sekuens bervariasi untuk mengamati efek paralelisasi dan biaya O(n²).
> 3. Visualisasikan matriks bobot self-attention pada kalimat dan amati pola hubungan antar kata.
>
> #### Bacaan Lanjutan
> - Prince, S. J. D. (2024). [Understanding Deep Learning](https://anthology-of-data.science/resources/prince2023udl.pdf), MIT Press (bab self-attention).
> - Vaswani, A., et al. (2017). [Attention Is All You Need](https://arxiv.org/abs/1706.03762).
> - Kaplan, J., et al. (2020). [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361).
