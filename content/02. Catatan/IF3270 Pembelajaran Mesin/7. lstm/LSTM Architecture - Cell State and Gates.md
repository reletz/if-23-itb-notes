---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] LSTM Architecture - Cell State and Gates
>
> > ## Questions/Cues
> >
> > - Mengapa LSTM diperkenalkan untuk menggantikan RNN standar?
> > - Apa perbedaan utama antara RNN dan LSTM dari sisi state?
> > - Apa fungsi cell state sebagai "conveyor belt"?
> > - Bagaimana cara kerja forget gate, input gate, dan output gate?
> > - Bagaimana cell state diperbarui dan menghasilkan hidden state baru?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - LSTM (Pages 6-16)
>
> > ### Tinjauan Ulang RNN dan Motivasi LSTM
> >
> > Pada **Recurrent Neural Network (RNN)** standar, setiap timestep menghitung hidden state dengan rumus h(t)=fh(Wxh·x(t)+Whh·h(t-1)+bh) dan output o(t)=fy(Who·h(t)+bho). Modul yang berulang (repeating module) di RNN memiliki struktur yang sangat sederhana, biasanya hanya **satu lapisan tanh**. Struktur sederhana ini membuat RNN kesulitan menyimpan informasi jangka panjang karena masalah **long-term dependency**: ketika jarak antara informasi relevan dan titik prediksi terlalu jauh, RNN gagal menghubungkannya.
> >
> > **LSTM (Long Short Term Memory)** diperkenalkan oleh **Hochreiter & Schmidhuber (1997)** dan secara eksplisit dirancang untuk menghindari masalah long-term dependency tersebut. LSTM adalah jenis khusus RNN: alih-alih satu lapisan tanh, modul berulang di LSTM berisi **empat lapisan yang saling berinteraksi** yang bekerja sama mengatur aliran informasi.
> >
> > ### RNN vs LSTM: Dua Jenis State
> >
> > Perbedaan paling fundamental adalah LSTM memiliki **dua jalur state** sedangkan RNN hanya satu. RNN hanya membawa **hidden state h(t)** dari satu timestep ke timestep berikutnya. LSTM menambahkan **cell state c(t)** yang berjalan paralel di samping hidden state h(t). Dengan dua state ini, LSTM dapat memisahkan "memori jangka panjang" (cell state) dari "keluaran/aktivasi saat ini" (hidden state).
> >
> > Hidden state h(t) tetap dipakai untuk prediksi dan diteruskan ke timestep berikutnya, namun cell state c(t) berperan sebagai memori utama yang relatif terlindungi dari perubahan drastis.
> >
> > ### Cell State sebagai "Conveyor Belt"
> >
> > **Cell state c(t)** ibarat **ban berjalan (conveyor belt)** atau **jalan raya memori (memory highway)** yang membentang lurus di sepanjang seluruh rantai timestep, hanya dengan sedikit interaksi linear. Karena interaksinya minimal (hanya perkalian dan penjumlahan element-wise), informasi sangat mudah mengalir tanpa banyak berubah, sehingga LSTM dapat mempertahankan informasi penting selama banyak timestep. Inilah inti mengapa LSTM mengatasi vanishing gradient: jalur cell state bersifat **additive**, bukan berlapis perkalian matriks.
> >
> > **Gate** adalah cara untuk secara opsional meloloskan informasi. Setiap gate memakai lapisan **sigmoid** yang menghasilkan nilai antara 0 dan 1, menggambarkan seberapa banyak tiap komponen boleh lewat: nilai **0 berarti "jangan loloskan apa pun"** dan **1 berarti "loloskan semuanya"**.
> >
> > ### Tiga Gate pada LSTM
> >
> > **1. Forget Gate (ft).** Memutuskan informasi apa yang akan dibuang dari cell state. Gate ini melihat h(t-1) dan x(t), lalu mengeluarkan angka antara 0 dan 1 untuk setiap angka di cell state C(t-1).
> >
> > `ft = σ(Wxf·x(t) + Whf·h(t-1) + bf) = σ(Wf·[h(t-1), x(t)] + bf)`
> >
> > Nilai **1 berarti "benar-benar simpan ini"** sedangkan **0 berarti "benar-benar buang ini"**.
> >
> > **2. Input Gate (it) dan Tanh Layer Kandidat.** Memutuskan informasi baru apa yang akan disimpan ke cell state. Terdiri dari dua bagian: lapisan input gate memilih nilai mana yang akan diperbarui, dan lapisan tanh membuat vektor nilai kandidat baru Ĉt (input activation layer) yang bisa ditambahkan ke state.
> >
> > `it = σ(Wxi·x(t) + Whi·h(t-1) + bi) = σ(Wi·[h(t-1), x(t)] + bi)`
> >
> > `Ĉt = tanh(Wxc·x(t) + Whc·h(t-1) + bc) = tanh(WC·[h(t-1), x(t)] + bc)`
> >
> > **3. Pembaruan Cell State.** Cell state lama dikalikan dengan forget gate (membuang yang sudah diputuskan untuk dilupakan), lalu ditambahkan kandidat baru yang diskalakan oleh input gate.
> >
> > `C(t) = (C(t-1) ⊙ ft) ⊕ (it ⊙ Ĉt)`
> >
> > dengan ⊙ adalah **Hadamard product** (perkalian element-wise) dan ⊕ adalah penjumlahan element-wise.
> >
> > **4. Output Gate (ot) dan Hidden State.** Output h(t) didasarkan pada C(t) tetapi merupakan versi tersaring. Jalankan lapisan sigmoid untuk memutuskan bagian cell state mana yang akan dikeluarkan, lewatkan C(t) melalui tanh (mendorong nilai ke rentang -1 sampai 1), lalu kalikan keduanya.
> >
> > `ot = σ(Wxo·x(t) + Who·h(t-1) + bo) = σ(Wo·[h(t-1), x(t)] + bo)`
> >
> > `h(t) = ot ⊙ tanh(C(t))`
> >
> > ### Kumpulan Lengkap Persamaan LSTM
> >
> > Keenam persamaan inti yang dipakai setiap timestep:
> >
> > ```
> > ft = σ(Wxf·x(t) + Whf·h(t-1) + bf)
> > it = σ(Wxi·x(t) + Whi·h(t-1) + bi)
> > Ĉt = tanh(Wxc·x(t) + Whc·h(t-1) + bc)
> > C(t) = (C(t-1) ⊙ ft) ⊕ (it ⊙ Ĉt)
> > ot = σ(Wxo·x(t) + Who·h(t-1) + bo)
> > h(t) = ot ⊙ tanh(C(t))
> > ```
> >
> > Diagram berikut menunjukkan satu unit LSTM dengan cell state mengalir melalui ketiga gate:
> >
> > ```mermaid
> > flowchart LR
> >     Cprev["c(t-1)<br/>cell state"]
> >     Hprev["h(t-1)"]
> >     X["x(t)"]
> >     F["Forget Gate<br/>ft = sigma"]
> >     I["Input Gate<br/>it = sigma"]
> >     Cand["Candidate<br/>Ct_hat = tanh"]
> >     O["Output Gate<br/>ot = sigma"]
> >     Mul1["x (multiply)"]
> >     Add["+ (add)"]
> >     Cnew["c(t)<br/>cell state baru"]
> >     Tanh["tanh"]
> >     Mul2["x (multiply)"]
> >     Hnew["h(t)"]
> >     Hprev --> F &amp; I &amp; Cand &amp; O
> >     X --> F &amp; I &amp; Cand &amp; O
> >     Cprev --> Mul1
> >     F --> Mul1
> >     Mul1 --> Add
> >     I --> Add
> >     Cand --> Add
> >     Add --> Cnew
> >     Cnew --> Tanh
> >     Tanh --> Mul2
> >     O --> Mul2
> >     Mul2 --> Hnew
> > ```

> [!cornell] #### Summary
>
> **LSTM (Hochreiter &amp; Schmidhuber, 1997)** adalah jenis khusus RNN yang dirancang untuk mengatasi masalah **long-term dependency**. Berbeda dari RNN yang hanya membawa **hidden state h(t)**, LSTM menambahkan **cell state c(t)** yang berperan sebagai **conveyor belt / memory highway** dengan interaksi linear minimal sehingga informasi mudah mengalir tanpa berubah. Modul berulang LSTM berisi **empat lapisan interaksi** yang diatur oleh **tiga gate berbasis sigmoid**: **forget gate (ft)** memutuskan apa yang dibuang dari cell state (0=lupakan, 1=simpan), **input gate (it)** bersama **tanh layer kandidat (Ĉt)** menentukan informasi baru, lalu cell state diperbarui secara additive **C(t)=(C(t-1)⊙ft)⊕(it⊙Ĉt)**, dan **output gate (ot)** menghasilkan **h(t)=ot⊙tanh(C(t))**. Sifat additive pada jalur cell state inilah yang menjadikan LSTM tahan terhadap vanishing gradient.

> [!ad-libitum]- Additional Information
>
> #### Peephole Connections dan Coupled Gates
> Varian LSTM yang dikenalkan Gers &amp; Schmidhuber menambahkan **peephole connections**, yaitu membiarkan gate "mengintip" cell state secara langsung (mis. ft melihat C(t-1)). Varian lain adalah **coupled forget-input gate**, di mana keputusan untuk melupakan dan menambahkan dilakukan bersamaan (it = 1 - ft), sehingga kita hanya menambahkan informasi baru saat melupakan sesuatu yang lama. Penyederhanaan ini mengurangi jumlah parameter.
>
> #### Mengapa Empat Lapisan, Bukan Satu
> RNN standar hanya memiliki satu transformasi tanh per timestep, sehingga setiap update memaksa seluruh state ditulis ulang. LSTM memisahkan operasi menjadi empat lapisan terlatih (forget, input, candidate, output), memberi jaringan kontrol selektif: ia bisa mempertahankan sebagian memori sambil memperbarui sebagian lain. Ini analog dengan memori komputer yang punya operasi read/write/erase terpisah.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan satu unit LSTM dari nol dengan NumPy dan visualisasikan nilai forget/input/output gate pada deret waktu sinusoidal.
> 2. Bandingkan kemampuan RNN vs LSTM mempelajari dependency jangka panjang pada tugas "copy memory task" dengan panjang sekuens berbeda.
> 3. Eksperimen menonaktifkan salah satu gate (mis. fiksasi ft=1) dan amati dampaknya terhadap kemampuan model melupakan informasi.
>
> #### Bacaan Lanjutan
> - Hochreiter, S., &amp; Schmidhuber, J. (1997). *Long Short-Term Memory*. Neural Computation 9(8).
> - Olah, C. (2015). [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
> - Raschka, S., et al. (2022). *Machine Learning with PyTorch and Scikit-Learn* (Chapter 15).
> - Goodfellow, I., Bengio, Y., &amp; Courville, A. (2016). *Deep Learning* (Chapter 10).
