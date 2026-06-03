---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Truncated BPTT and the Vanishing Gradient Problem
>
> > ## Questions/Cues
> >
> > - Apa itu Truncated BPTT dan mengapa dikembangkan?
> > - Apa tradeoff dari memotong panjang BPTT?
> > - Bagaimana BPTT bekerja pada bidirectional RNN?
> > - Apa penyebab vanishing gradient problem?
> > - Bagaimana LSTM mengatasi vanishing gradient?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - LSTM (Pages 41-44)
>
> > ### Truncated BPTT
> >
> > **Truncated BPTT (TBPTT)** dikembangkan untuk **mengurangi kompleksitas komputasi** setiap pembaruan parameter pada recurrent neural network. Pada sekuens yang sangat panjang, melakukan BPTT penuh dari timestep terakhir sampai timestep pertama sangat mahal secara komputasi dan memori.
> >
> > TBPTT **memecah forward dan backward pass menjadi sekumpulan operasi forward/backward yang lebih kecil**. Panjang spesifik segmen forward/backward ini (disebut **panjang TBPTT**) adalah parameter yang ditentukan pengguna. Alih-alih merambatkan gradien sepanjang ratusan timestep, kita hanya merambatkannya dalam jendela berukuran tetap (mis. 4 atau 20 timestep).
> >
> > ### Tradeoff Truncated BPTT
> >
> > Misalkan **panjang TBPTT = 4**. Andaikan pada timestep 10 jaringan perlu menyimpan informasi dari timestep 0 untuk membuat prediksi akurat:
> >
> > - **BPTT standar:** tidak masalah — gradien dapat mengalir mundur sepenuhnya sepanjang unrolled network, dari timestep 10 hingga timestep 0.
> > - **Truncated BPTT:** **bermasalah** — gradien dari timestep 10 **tidak mengalir cukup jauh** ke belakang untuk memicu pembaruan parameter yang diperlukan agar informasi tersimpan.
> >
> > Inilah **tradeoff** TBPTT: dependency yang sangat panjang bisa hilang karena gradien terpotong. Namun, tradeoff ini biasanya sepadan, dan selama panjang TBPTT diatur tepat (cukup mencakup dependency yang relevan), TBPTT bekerja baik dalam praktik.
> >
> > Diagram berikut membandingkan aliran gradien BPTT standar dengan segmen-segmen pada TBPTT:
> >
> > ```mermaid
> > flowchart LR
> >     subgraph STD["BPTT standar (gradien menyusut)"]
> >         s0["t0<br/>grad besar"] --> s1["t1"] --> s2["t2"] --> s3["t3"] --> s4["t4<br/>grad mengecil"]
> >     end
> >     subgraph TBP["Truncated BPTT (length=4)"]
> >         a0["t0"] --> a1["t1"] --> a2["t2"] --> a3["t3 | putus"]
> >         b0["t4"] --> b1["t5"] --> b2["t6"] --> b3["t7 | putus"]
> >     end
> > ```
> >
> > ### Bidirectional RNN: BPTT
> >
> > Pada **bidirectional RNN**, terdapat dua lapisan rekuren: satu memproses sekuens dari depan ke belakang (forward) dan satu dari belakang ke depan (backward). BPTT diterapkan pada **kedua arah** secara terpisah: gradien untuk lapisan forward dirambatkan dari timestep terakhir ke awal, sedangkan gradien lapisan backward dirambatkan dari awal ke akhir. Output tiap timestep menggabungkan kedua hidden state, sehingga jaringan memanfaatkan konteks masa lalu **dan** masa depan.
> >
> > ### Vanishing Gradient Problem
> >
> > **Backpropagation menghitung gradien melalui chain rule** — mengalikan banyak turunan parsial secara berantai. Dalam beberapa kasus, gradien menjadi **sangat kecil (vanishingly small)**, secara efektif **mencegah bobot mengubah nilainya**. Dalam kasus terburuk, ini bisa **menghentikan pelatihan jaringan sepenuhnya**.
> >
> > Mekanisme: chain rule mengalikan **n bilangan kecil** ini untuk menghitung gradien lapisan "depan" pada jaringan n-lapis (atau n-timestep). Akibatnya **gradien (sinyal error) menyusut secara eksponensial dengan n**. Karena turunan fungsi aktivasi **sigmoid dan tanh selalu < 1** (turunan sigmoid maksimum 0.25, turunan tanh maksimum 1 tapi umumnya jauh lebih kecil), mengalikan banyak nilai < 1 dengan cepat membuat hasilnya mendekati nol.
> >
> > Pada RNN, ini berarti error dari timestep akhir nyaris tak sampai ke timestep awal, sehingga RNN gagal mempelajari **long-term dependency**.
> >
> > ### Bagaimana LSTM Mengatasinya
> >
> > **LSTM mengatasi vanishing gradient melalui cell state yang bersifat additive.** Pembaruan cell state adalah C(t)=(C(t-1)⊙ft)⊕(it⊙Ĉt) — sebuah **penjumlahan**, bukan perkalian matriks bobot berulang. Akibatnya turunan ∂C(t)/∂C(t-1) = ft (forget gate), yang dapat bernilai mendekati 1. Ketika forget gate dipelajari untuk menjaga informasi (ft≈1), gradien dapat mengalir mundur sepanjang banyak timestep **tanpa menyusut eksponensial**. Jalur cell state inilah "memory highway" yang menjaga sinyal error tetap hidup, memungkinkan LSTM belajar dependency jangka panjang yang gagal ditangani RNN standar.

> [!cornell] #### Summary
>
> **Truncated BPTT (TBPTT)** dikembangkan untuk **mengurangi kompleksitas komputasi** dengan **memecah forward/backward pass menjadi segmen lebih kecil** sepanjang TBPTT yang ditentukan pengguna; tradeoff-nya adalah **gradien tidak mengalir cukup jauh ke belakang** sehingga dependency sangat panjang bisa hilang (mis. dengan length=4, informasi timestep 0 tak tersampaikan ke timestep 10). Pada **bidirectional RNN**, BPTT dijalankan pada kedua arah forward dan backward. **Vanishing gradient problem** terjadi karena chain rule **mengalikan n bilangan kecil** sehingga gradien **menyusut eksponensial dengan n**, diperparah karena turunan **sigmoid/tanh selalu < 1**, dan dalam kasus terburuk menghentikan pelatihan. **LSTM mengatasinya lewat cell state yang additive** (∂C(t)/∂C(t-1)=ft≈1), menjadikannya "memory highway" yang menjaga gradien tetap mengalir sepanjang banyak timestep.

> [!ad-libitum]- Additional Information
>
> #### Exploding Gradient: Sisi Sebaliknya
> Jika faktor perkalian dalam chain rule justru > 1, gradien malah **meledak (exploding)** menjadi sangat besar, membuat update tidak stabil (NaN). Solusinya **gradient clipping**: skalakan gradien turun bila normanya melewati ambang. Vanishing dan exploding gradient adalah dua sisi dari masalah perkalian berantai yang sama.
>
> #### ReLU dan Inisialisasi untuk Jaringan Dalam
> Di jaringan feed-forward dalam, vanishing gradient juga dilawan dengan aktivasi **ReLU** (turunan 1 untuk input positif) dan skema inisialisasi seperti **Xavier/Glorot** atau **He** yang menjaga varians sinyal stabil antar lapisan. Untuk RNN, alternatif arsitektural seperti LSTM/GRU lebih efektif daripada sekadar mengganti aktivasi.
>
> #### Memilih Panjang TBPTT
> Panjang TBPTT yang umum adalah 20-50 timestep. Terlalu pendek: dependency hilang. Terlalu panjang: mahal dan rentan exploding. Beberapa kerangka kerja memakai skema k1/k2 (Williams &amp; Peng): forward setiap k1 timestep, backward sepanjang k2 timestep.
>
> #### Proyek Eksplorasi Mandiri
> 1. Latih RNN dan LSTM pada tugas dependency jarak jauh (mis. paritas bit berjarak 30) dan amati mana yang berhasil belajar.
> 2. Plot norma gradien per timestep pada RNN untuk memvisualisasikan penyusutan eksponensial.
> 3. Eksperimen panjang TBPTT berbeda (4, 16, 64) dan ukur dampaknya terhadap akurasi pada deret waktu panjang.
>
> #### Bacaan Lanjutan
> - Bengio, Y., Simard, P., &amp; Frasconi, P. (1994). *Learning Long-Term Dependencies with Gradient Descent is Difficult*.
> - Pascanu, R., Mikolov, T., &amp; Bengio, Y. (2013). *On the Difficulty of Training Recurrent Neural Networks*.
> - [DeepLearning4J: Truncated BPTT](https://deeplearning4j.org/docs/latest/deeplearning4j-nn-recurrent)
