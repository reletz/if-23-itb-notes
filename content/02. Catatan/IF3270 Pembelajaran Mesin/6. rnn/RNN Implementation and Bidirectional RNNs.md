---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] RNN Implementation and Bidirectional RNNs
>
> > ## Questions/Cues
> >
> > - Bagaimana implementasi RNN many-to-one di Keras?
> > - Bagaimana rumus menghitung jumlah parameter Simple RNN?
> > - Bagaimana menghitung parameter pada stacked RNN bertingkat?
> > - Apa itu Bidirectional RNN dan kapan digunakan?
> > - Aplikasi apa yang cocok untuk Bidirectional RNN?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - RNN Pt. 1 (Pages 42-47)
>
> > ### Implementasi RNN di Keras: Many-to-One
> > Untuk kasus **many-to-one** (mis. memprediksi harga penutupan saham Amazon dari 50 timestep), implementasi Keras sederhana:
> >
> > ```python
> > # predict amazon stock closing prices, RNN 50 timestep
> > from keras import Sequential
> > from keras.layers import SimpleRNN, Dense
> >
> > model = Sequential()
> > model.add(SimpleRNN(10, input_shape=(50, 1)))
> > # simple recurrent layer, 10 neurons & process 50x1 sequences
> > model.add(Dense(1, activation='linear'))
> > # linear output because this is a regression problem
> > ```
> >
> > Layer **SimpleRNN(10, input_shape=(50,1))** memproses sekuens berukuran 50×1 dengan 10 neuron hidden, dan secara default hanya mengembalikan **state terakhir** (cocok untuk many-to-one). Layer **Dense(1)** dengan aktivasi linear menghasilkan output regresi tunggal.
> >
> > ### Rumus Jumlah Parameter Simple RNN
> > Jumlah parameter Simple RNN dihitung sebagai:
> >
> > - **Layer RNN** = (input dimension + hidden neurons + 1) × hidden neurons. Ini menggabungkan **Wxh** (hidden × input), **Whh** (hidden × hidden), dan bias (hidden × 1).
> > - **Layer Dense** = (hidden neurons + 1) × output neurons (yaitu **Why** + bias output).
> >
> > Untuk model di atas (input=1, hidden=10, output=1):
> >
> > ```
> > Total parameter = (1 + 10 + 1) * 10 + (10 + 1) * 1
> >                 = 12 * 10 + 11 * 1
> >                 = 120 + 11
> >                 = 131
> > ```
> >
> > ### Contoh Stacked RNN Bertingkat
> > RNN dapat ditumpuk (stacked) dengan `return_sequences=True` pada setiap layer kecuali yang terakhir, agar layer berikutnya menerima sekuens penuh:
> >
> > ```python
> > model = Sequential()  # initialize model
> > model.add(SimpleRNN(64, input_shape=(50, 1), return_sequences=True))  # 64 neurons
> > model.add(SimpleRNN(32, return_sequences=True))  # 32 neurons
> > model.add(SimpleRNN(16))  # 16 neurons
> > model.add(Dense(8, activation='tanh'))
> > model.add(Dense(1, activation='linear'))
> > ```
> >
> > Perhitungan parameter tiap layer:
> >
> > ```
> > SimpleRNN(64): (1 + 64 + 1) * 64  = 4224
> > SimpleRNN(32): (64 + 32 + 1) * 32 = 3104
> > SimpleRNN(16): (32 + 16 + 1) * 16 = 784
> > Dense(8):      (16 + 1) * 8        = 136
> > Dense(1):      (8 + 1) * 1         = 9
> > Total parameter = 8257
> > ```
> >
> > Perhatikan bahwa input dimension layer RNN ke-2 dan ke-3 adalah **jumlah neuron layer sebelumnya** (64 dan 32), bukan dimensi fitur asli.
> >
> > ### Bidirectional RNN
> > Pada banyak aplikasi, kita ingin menghasilkan prediksi **y(t)** yang **bergantung pada seluruh sekuens input** — bukan hanya konteks masa lalu. **Bidirectional RNN** menggabungkan satu RNN yang **bergerak maju (forward)** melalui waktu mulai dari awal sekuens dengan RNN lain yang **bergerak mundur (backward)** mulai dari akhir sekuens. Output di setiap timestep adalah **gabungan** hidden state dari kedua arah, sehingga setiap posisi memiliki konteks **kiri dan kanan** sekaligus.
> >
> > Aplikasi yang cocok: **POS tagging** (penentuan kelas kata bergantung pada tetangga kanan), **speech recognition** (co-articulation antar fonem), dan **information extraction / sequence tagging** secara umum — semua kasus di mana output suatu posisi bergantung pada seluruh konteks sekuens.
> >
> > ```mermaid
> > flowchart LR
> >     x1["x(1)"] --> f1["fwd h(1)"]
> >     x2["x(2)"] --> f2["fwd h(2)"]
> >     x3["x(3)"] --> f3["fwd h(3)"]
> >     f1 --> f2 --> f3
> >     x1 --> b1["bwd h(1)"]
> >     x2 --> b2["bwd h(2)"]
> >     x3 --> b3["bwd h(3)"]
> >     b3 --> b2 --> b1
> >     f1 --> m1["concat → y(1)"]
> >     b1 --> m1
> >     f2 --> m2["concat → y(2)"]
> >     b2 --> m2
> >     f3 --> m3["concat → y(3)"]
> >     b3 --> m3
> > ```

> [!cornell] #### Summary
>
> Implementasi RNN **many-to-one** di Keras cukup dengan **SimpleRNN(10, input_shape=(50,1))** lalu **Dense(1)**. Jumlah parameter dihitung dengan **(input + hidden + 1) × hidden** untuk layer RNN dan **(hidden + 1) × output** untuk Dense, contohnya **(1+10+1)×10 + (10+1)×1 = 131**. Pada **stacked RNN** (64→32→16 dengan `return_sequences=True`), input layer berikutnya adalah jumlah neuron sebelumnya, menghasilkan **total 8257** parameter. **Bidirectional RNN** menggabungkan RNN **maju + mundur** sehingga setiap output mendapat konteks seluruh sekuens — berguna untuk **POS tagging** dan **speech recognition** di mana output bergantung pada konteks kiri dan kanan.

> [!ad-libitum]- Additional Information
>
> #### SimpleRNN vs LSTM vs GRU di Keras
> SimpleRNN rawan vanishing/exploding gradient pada sekuens panjang. Keras menyediakan `LSTM` dan `GRU` sebagai pengganti drop-in dengan API identik (`return_sequences`, `input_shape`) namun dengan gating untuk mengatasi long-term dependency. Jumlah parameter LSTM ≈ 4× Simple RNN (empat gate), GRU ≈ 3×.
>
> #### Membungkus dengan Bidirectional
> Di Keras, bidirectional dibuat dengan wrapper: `model.add(Bidirectional(SimpleRNN(10, return_sequences=True)))`. Ini menggandakan jumlah unit output (forward + backward di-concat secara default), sehingga parameter dan dimensi output menjadi dua kali lipat.
>
> #### Verifikasi Jumlah Parameter
> Selalu konfirmasi perhitungan manual dengan `model.summary()` di Keras, yang mencetak jumlah parameter per layer dan total. Ini cara cepat menangkap kesalahan dimensi input_shape.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun model many-to-one untuk prediksi harga saham, lalu bandingkan SimpleRNN, LSTM, dan GRU pada metrik RMSE dan jumlah parameter (`model.summary()`).
> 2. Implementasikan Bidirectional LSTM untuk POS tagging pada dataset Penn Treebank dan bandingkan akurasinya dengan RNN searah.
>
> #### Bacaan Lanjutan
> - [A Comprehensive Guide to Working with RNNs in Keras](https://towardsdatascience.com/a-comprehensive-guide-to-working-with-recurrent-neural-networks-in-keras-f3b2d5e2fa7f)
> - Schuster, M., & Paliwal, K. K. (1997). *Bidirectional recurrent neural networks*. IEEE Transactions on Signal Processing.
> - [Sequence Tagging with LSTM-CRF](https://www.depends-on-the-definition.com/sequence-tagging-lstm-crf/)
