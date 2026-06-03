---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Transformer Architecture - Multi-Head Attention and Positional Encoding
>
> > ## Questions/Cues
> >
> > - Apa inti gagasan paper "Attention is All You Need"?
> > - Bagaimana struktur encoder-decoder stack pada Transformer?
> > - Mengapa diperlukan multi-head attention?
> > - Mengapa Transformer butuh positional encoding?
> > - Bagaimana lapisan Linear + Softmax menghasilkan kata output?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Attention &amp; Transformer (Pages 21-34)
> >
>
> > ### "Attention is All You Need"
> > Paper **Vaswani et al. (2017)**, "Attention is All You Need", mengusulkan arsitektur jaringan baru bernama **Transformer** yang **berbasis sepenuhnya pada mekanisme attention**, **meniadakan rekurensi dan konvolusi secara total**. Eksperimen pada dua tugas penerjemahan mesin menunjukkan model ini **unggul dalam kualitas** sekaligus **lebih paralel** dan **butuh waktu latih jauh lebih sedikit**. Inilah fondasi dari hampir seluruh model bahasa modern (BERT, GPT, T5, dll.).
> >
> > ### Struktur Encoder-Decoder Stack
> > Transformer mengikuti pola **encoder-decoder**, namun keduanya kini berupa **tumpukan (stack)** dari blok identik (umumnya N = 6 lapisan):
> >
> > - **Encoder stack**: setiap blok berisi sub-lapisan **multi-head self-attention** diikuti **feed-forward network** posisi-wise. Setiap sub-lapisan dibungkus **residual connection** dan **layer normalization**.
> > - **Decoder stack**: setiap blok memiliki tiga sub-lapisan — **masked multi-head self-attention** (mencegah melihat token masa depan), **encoder-decoder attention** (query dari decoder, key/value dari output encoder), dan **feed-forward network**.
> >
> > Input mula-mula diubah menjadi **input embedding**, lalu dijumlahkan dengan **positional encoding** sebelum masuk ke stack.
> >
> > ### Multi-Head Attention
> > Alih-alih satu fungsi attention, Transformer menjalankan **beberapa attention head paralel**. Setiap head memiliki proyeksi Query/Key/Value sendiri, sehingga **tiap head dapat menangkap jenis relasi yang berbeda** antar token. Output seluruh head digabung (concatenate) lalu diproyeksikan linear kembali.
> >
> > Contoh klasik: saat meng-encode kata **"it"** dalam kalimat *"The animal didn't cross the street because it was too tired"*, **satu head berfokus pada "the animal"** (apa yang dirujuk "it"), sementara **head lain berfokus pada "tired"** (sifat yang melekat). Dengan demikian representasi "it" memuat sebagian representasi "animal" sekaligus "tired". Jika seluruh head ditumpuk, polanya memang menjadi lebih sulit ditafsirkan, namun secara kolektif memperkaya representasi.
> >
> > ### Positional Encoding
> > Karena Transformer **tidak memiliki rekurensi maupun konvolusi**, model tidak punya gagasan bawaan tentang **urutan** token — bagi self-attention, sebuah sekuens hanyalah himpunan tanpa orde. Untuk itu diinjeksikan **positional encoding**: informasi posisi token ditambahkan ke embedding input.
> >
> > Formulasi orisinal memakai fungsi sinus dan kosinus berfrekuensi berbeda:
> >
> > `PE(pos, 2i) = sin(pos / 10000^(2i/d))`
> > `PE(pos, 2i+1) = cos(pos / 10000^(2i/d))`
> >
> > Pola ini memberi setiap posisi "tanda tangan" unik dan memungkinkan model memperkirakan posisi relatif antar token. Tanpa positional encoding, kalimat "Budi memukul Andi" dan "Andi memukul Budi" akan tampak identik bagi model.
> >
> > ### Linear + Softmax Output Layer
> > Setelah melewati stack decoder, vektor keluaran diproses **output layer**:
> >
> > 1. **Linear layer** — jaringan fully-connected sederhana yang **memproyeksikan vektor** keluaran decoder menjadi **logits vector** yang jauh lebih besar, **seukuran vocabulary**. Bila model mengenal 10.000 kata, logits vector selebar 10.000 sel, tiap sel adalah skor satu kata unik.
> > 2. **Softmax layer** — mengubah skor menjadi **probabilitas** (semuanya positif, berjumlah 1.0).
> >
> > Sel dengan **probabilitas tertinggi** dipilih, dan kata yang bersesuaian menjadi output untuk timestep tersebut.
> >
> > ```mermaid
> > flowchart TD
> >     IE["Input Embedding"] --> ADD["+ Positional Encoding"]
> >     ADD --> ENC["Encoder Stack<br/>(N× Multi-Head Self-Attention<br/>&amp; Feed-Forward)"]
> >     OE["Output Embedding<br/>+ Positional Encoding"] --> DEC["Decoder Stack<br/>(N× Masked Self-Attention,<br/>Enc-Dec Attention &amp; FFN)"]
> >     ENC --> DEC
> >     DEC --> LIN["Linear (proyeksi ke logits<br/>seukuran vocabulary)"]
> >     LIN --> SM["Softmax → probabilitas"]
> >     SM --> OUT["Pilih kata dengan<br/>probabilitas tertinggi"]
> > ```

> [!cornell] #### Summary
>
> Paper **"Attention is All You Need" (Vaswani et al., 2017)** memperkenalkan **Transformer**, arsitektur **berbasis attention sepenuhnya tanpa rekurensi/konvolusi**, yang lebih paralel dan cepat dilatih. Strukturnya berupa **encoder-decoder stack** dari blok identik berisi multi-head attention dan feed-forward dengan residual + layer norm. **Multi-head attention** menjalankan beberapa head paralel sehingga tiap head menangkap relasi berbeda (mis. "it" → satu head ke "the animal", head lain ke "tired"). Karena tak ada rekurensi, **positional encoding** diinjeksikan untuk memberi informasi urutan posisi token. Di akhir, **Linear layer** memproyeksikan keluaran decoder ke **logits vector seukuran vocabulary**, lalu **softmax** mengubahnya menjadi probabilitas dan kata dengan probabilitas tertinggi dipilih sebagai output.

> [!ad-libitum]- Additional Information
>
> #### Residual Connection dan Layer Normalization
> Setiap sub-lapisan Transformer dibungkus pola `LayerNorm(x + Sublayer(x))`. Residual connection memungkinkan gradien mengalir mulus ke lapisan dalam (mengatasi vanishing gradient), sedangkan layer normalization menstabilkan distribusi aktivasi. Varian modern (Pre-LN) menempatkan normalisasi sebelum sub-lapisan untuk pelatihan yang lebih stabil pada model sangat dalam.
>
> #### Keluarga Model Turunan Transformer
> Dari arsitektur dasar lahir tiga keluarga besar: **encoder-only** (BERT — untuk pemahaman/klasifikasi), **decoder-only** (GPT — untuk generasi autoregresif), dan **encoder-decoder** (T5, BART — untuk seq2seq seperti translasi/ringkasan). Pilihan keluarga menyesuaikan jenis tugas.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan multi-head attention dari nol dan visualisasikan bobot tiap head pada kalimat untuk mengamati relasi berbeda yang ditangkap.
> 2. Bandingkan positional encoding sinusoidal vs learned positional embedding pada tugas kecil dan ukur dampaknya.
> 3. Fine-tune model Transformer pra-latih (mis. BERT/DistilBERT via Hugging Face) untuk klasifikasi teks dan analisis attention map-nya.
>
> #### Bacaan Lanjutan
> - Vaswani, A., et al. (2017). [Attention Is All You Need](https://arxiv.org/abs/1706.03762).
> - Alammar, J. [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/).
> - [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) (visualisasi interaktif).
> - Tunstall, L., von Werra, L., & Wolf, T. (2022). *Natural Language Processing with Transformers*, O'Reilly.
