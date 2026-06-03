---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] BPTT for LSTM - Worked Example
>
> > ## Questions/Cues
> >
> > - Apa notasi yang dipakai dalam update weight BPTT LSTM?
> > - Bagaimana forward pass di-unfold untuk contoh dua timestep?
> > - Bagaimana backward phase t=1 dan t=0 dihitung?
> > - Bagaimana chain rule menembus gate-gate LSTM?
> > - Bagaimana update phase memperbarui bobot dengan learning rate?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - LSTM (Pages 32-40)
>
> > ### BPTT untuk LSTM: Gambaran Umum
> >
> > BPTT pada LSTM mengikuti prinsip yang sama dengan RNN — membentangkan jaringan dan mengakumulasi gradien antar timestep — tetapi **lebih kompleks** karena chain rule harus menembus **keempat lapisan gate** (forget, input, candidate, output) serta jalur **cell state**. Setiap gate punya bobotnya sendiri, sehingga error harus dipropagasi ke masing-masing set bobot.
> >
> > ### Notasi Update Weight
> >
> > Notasi yang dipakai dalam perhitungan:
> >
> > - **fo', fh'** : turunan fungsi aktivasi di output layer / hidden layer.
> > - **δo(t)** : error di output layer pada timestep t.
> > - **δh(t)** : error di hidden layer pada timestep t.
> > - **⊙** : Hadamard product (perkalian element-wise).
> > - **s(t)** : hasil fh(ah(t)), yaitu aktivasi hidden state.
> >
> > Gradien bobot diperoleh dengan mengalikan error layer (δ) dengan aktivasi/input yang masuk ke layer tersebut, sama seperti backpropagation biasa, tetapi error δh(t) di LSTM merupakan akumulasi dari kontribusi output saat ini dan kontribusi yang mengalir balik dari timestep t+1.
> >
> > ### Contoh Forward Pass (Unfold)
> >
> > Contoh meng-unfold LSTM untuk dua timestep dengan input x1 dan x2. Bobot yang terlibat: Wa, Wi, Wf, Wo (bobot input untuk candidate/input/forget/output gate) dan Ua, Ui, Uf, Uo (bobot rekuren). Dengan input:
> >
> > ```
> > x1 = [1, 2]      x2 = [0.5, 3]
> >
> > Forward pass menghasilkan (ilustrasi nilai pada slide):
> >   timestep 1:  state internal a1 = 0.5    -> h(1) = 0.536
> >   timestep 2:  state internal a2 = 1.25   -> h(2) = 0.772
> > ```
> >
> > Tiap timestep menjalankan keenam persamaan LSTM secara berurutan, dengan h dan c dari timestep sebelumnya mengalir masuk. Hasil forward pass (nilai gate, cell state, hidden state) **disimpan** karena dibutuhkan saat backward pass.
> >
> > ### Backward Phase t=1
> >
> > Backward dimulai dari timestep terakhir (t=1 pada penomoran slide). Hitung error output δo(1) dari selisih prediksi dan target, lalu propagasi ke hidden state untuk mendapat δh(1). Dari δh(1), error dipecah ke **empat gate** melalui chain rule:
> >
> > - Kontribusi ke **output gate** melalui ∂h/∂ot.
> > - Kontribusi ke **cell state** melalui ∂h/∂C(t) = ot ⊙ tanh'(C(t)).
> > - Dari cell state, error mengalir ke **forget gate**, **input gate**, dan **candidate** masing-masing melalui ∂C/∂ft, ∂C/∂it, ∂C/∂Ĉt.
> >
> > Setiap cabang dikalikan turunan aktivasi gate-nya (sigmoid' atau tanh') untuk mendapatkan gradien terhadap bobotnya.
> >
> > ### Backward Phase t=0
> >
> > Pada timestep sebelumnya (t=0), error δh(0) bukan hanya dari output di t=0, tetapi juga **error yang mengalir balik dari t=1** melalui jalur rekuren (bobot U) dan melalui **cell state C(0)→C(1)**. Inilah inti BPTT: error dari masa depan ditambahkan ke error timestep saat ini. Chain rule kembali menembus keempat gate di t=0 dengan cara yang sama seperti t=1, menggunakan nilai forward pass yang tersimpan untuk t=0.
> >
> > Diagram berikut menunjukkan aliran gradien BPTT yang dibentangkan antar timestep:
> >
> > ```mermaid
> > flowchart RL
> >     L["Loss / CE error"]
> >     subgraph T1["timestep t=1"]
> >         dh1["delta_h(1)"]
> >         g1["gate-gate t=1<br/>(f, i, c_hat, o)"]
> >         c1["cell state c(1)"]
> >     end
> >     subgraph T0["timestep t=0"]
> >         dh0["delta_h(0)"]
> >         g0["gate-gate t=0<br/>(f, i, c_hat, o)"]
> >         c0["cell state c(0)"]
> >     end
> >     L --> dh1
> >     dh1 --> g1
> >     dh1 --> c1
> >     c1 --> g1
> >     dh1 -->|"jalur rekuren U"| dh0
> >     c1 -->|"jalur cell state additive"| c0
> >     dh0 --> g0
> >     dh0 --> c0
> >     c0 --> g0
> > ```
> >
> > ### Update Phase
> >
> > Setelah seluruh gradien dari semua timestep digabungkan (dijumlahkan karena bobot di-share), bobot diperbarui dengan **gradient descent**:
> >
> > `Wnew = Wold - λ · gradien`
> >
> > dengan **learning rate λ = 0.1** pada contoh slide. Pembaruan ini diterapkan ke seluruh set bobot LSTM (Wa, Wi, Wf, Wo, Ua, Ui, Uf, Uo dan bias-nya) sekaligus.

> [!cornell] #### Summary
>
> **BPTT untuk LSTM** memperluas BPTT RNN namun lebih rumit karena chain rule harus menembus **empat gate** dan jalur **cell state**. Notasi kunci: **fo'/fh'** (turunan aktivasi), **δo(t)** (error output layer), **δh(t)** (error hidden layer), **⊙** (Hadamard), dan **s(t)=fh(ah(t))**. Pada **contoh forward pass** LSTM di-unfold dua timestep dengan input x1, x2 dan nilai hidden state tersimpan. **Backward phase t=1** memecah δh(1) ke output gate dan ke cell state, lalu ke forget/input/candidate gate; **backward phase t=0** menambahkan error yang mengalir balik dari t=1 lewat jalur rekuren dan cell state additive. Akhirnya **update phase** menggabungkan seluruh gradien dan memperbarui bobot dengan **Wnew = Wold - λ·gradien**, λ=0.1.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Cell State Menyederhanakan Backward
> Pada jalur cell state, ∂C(t)/∂C(t-1) = ft (forget gate), bukan perkalian matriks bobot seperti pada RNN. Karena ini berupa perkalian element-wise dengan nilai gate yang bisa mendekati 1, gradien dapat mengalir jauh ke belakang tanpa menyusut drastis — fondasi mengapa LSTM tahan vanishing gradient. Lihat [[Truncated BPTT and the Vanishing Gradient Problem]].
>
> #### Gradient Clipping pada LSTM
> Meski LSTM mengatasi vanishing gradient, ia masih rentan **exploding gradient** pada sekuens panjang. Praktik standar adalah **gradient clipping**: jika norma gradien melebihi ambang (mis. 5.0), gradien diskalakan turun. Ini menjaga update Wnew = Wold - λ·gradien tetap stabil.
>
> #### Verifikasi Gradien Numerik
> Implementasi BPTT manual sebaiknya diverifikasi dengan **numerical gradient checking**: bandingkan gradien analitik dengan (L(W+ε) - L(W-ε)) / (2ε). Selisih relatif di bawah 1e-7 menandakan turunan gate sudah benar.
>
> #### Proyek Eksplorasi Mandiri
> 1. Reproduksi contoh worked example dua timestep di NumPy dan cocokkan h(1)=0.536, h(2)=0.772.
> 2. Implementasikan BPTT LSTM penuh dengan gradient checking pada keempat gate.
> 3. Bandingkan magnitudo gradien terhadap C(t-1) pada LSTM vs gradien terhadap h(t-1) pada RNN untuk sekuens panjang 50.
>
> #### Bacaan Lanjutan
> - Gomez, A. (2016). [Backpropagating an LSTM: A Numerical Example](https://medium.com/@aidangomez/let-s-do-this-f9b699de31d9)
> - Graves, A. (2012). *Supervised Sequence Labelling with Recurrent Neural Networks*.
> - Goodfellow, I., Bengio, Y., &amp; Courville, A. (2016). *Deep Learning* (Chapter 10).
