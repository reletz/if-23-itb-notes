---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] LSTM Architecture: Components and Gates
>
> > ## Questions/Cues
> >
> > - Mengapa LSTM memiliki cell state tambahan?
> > - Bagaimana gerbang lupa mengontrol informasi?
> > - Peran gerbang input dalam update state?
> > - Bagaimana gerbang output menghasilkan hidden state?
> > - Apa perbedaan struktural RNN vs LSTM?
> >
> > ## Reference Points
> >
> > - IF3270 Slides (Halaman 8-15, 21-22)
> > - http://colah.github.io/posts/2015-08-Understanding-LSTMs/
> >
>
> > ### Konsep Dasar Arsitektur LSTM
> > Long Short-Term Memory (LSTM) adalah jenis khusus Recurrent Neural Network (RNN) yang dirancang untuk mengatasi keterbatasan memori jangka panjang pada RNN konvensional. **Cell state** (Ct) berfungsi sebagai "memori jangka panjang" yang mengalir melalui seluruh rantai pemrosesan, mempertahankan informasi relevan dari langkah sebelumnya. Berbeda dengan RNN biasa yang hanya memiliki hidden state (ht), LSTM memperkenalkan tiga gerbang (gate) yang mengatur aliran informasi: Forget Gate, Input Gate, dan Output Gate.
> > Arsitektur LSTM terdiri dari empat lapisan neural network yang saling berinteraksi dalam setiap modul berulang. Setiap gerbang menggunakan fungsi aktivasi sigmoid (menghasilkan nilai 0-1) untuk menentukan proporsi informasi yang dilewatkan. Sistem gerbang ini memungkinkan LSTM secara selektif mengingat atau melupakan informasi dari input baru dan state sebelumnya.
> > ### Mekanisme Forget Gate
> > Forget Gate bertanggung jawab untuk menentukan informasi mana yang akan dipertahankan atau dibuang dari cell state sebelumnya. Gerbang ini menerima input dari hidden state sebelumnya (ht-1) dan input saat ini (xt), kemudian menghasilkan vektor nilai antara 0 dan 1 melalui fungsi sigmoid:
> > ```
> > ft = σ(Wf · [ht-1, xt] + bf)
> > ```
> > Nilai 1 menunjukkan "pertahankan seluruh informasi" sementara 0 berarti "buang seluruh informasi". Misalnya, dalam analisis sentimen kalimat, forget gate dapat memutuskan untuk membuang informasi tentang subjek kalimat sebelumnya jika konteks sudah berubah.
> > ### Operasi Input Gate dan Kandidat Update
> > Input Gate mengatur penambahan informasi baru ke cell state melalui dua komponen:
> > 1. **Lapisan sigmoid** memutuskan nilai mana yang akan diupdate
> > 2. **Lapisan tanh** membuat vektor nilai kandidat baru (Čt)
> > ```
> > it = σ(Wi · [ht-1, xt] + bi)
> > Čt = tanh(WC · [ht-1, xt] + bC)
> > ```
> > Kombinasi kedua komponen ini menentukan seberapa besar informasi baru akan mempengaruhi cell state. Analoginya seperti editor yang memutuskan bagian mana dari draf baru yang layak dimasukkan ke dokumen final.
> > ### Update Cell State
> > Proses update cell state menggabungkan operasi dari forget gate dan input gate:
> > ```
> > Ct = ft * Ct-1 + it * Čt
> > ```
> > Perkalian antara ft dan Ct-1 memfilter informasi lama yang tidak relevan, sementara penambahan it*Čt memasukkan informasi baru yang penting. Proses linear ini memungkinkan transfer informasi yang stabil tanpa degradasi gradien.
> > ### Output Gate dan Hidden State
> > Output Gate mengontrol informasi yang akan ditampilkan pada hidden state (ht) berdasarkan cell state saat ini:
> > ```
> > ot = σ(Wo · [ht-1, xt] + bo)
> > ht = ot * tanh(Ct)
> > ```
> > Hidden state berfungsi sebagai "memori jangka pendek" yang digunakan untuk prediksi dan diteruskan ke langkah berikutnya. Proses filtering melalui tanh memastikan nilai output berada dalam rentang [-1, 1]. Contoh aplikasi: dalam prediksi urutan teks, ht menentukan probabilitas karakter berikutnya berdasarkan konteks saat ini.

> [!cornell] #### Summary
>
> **LSTM** memperkenalkan **cell state** sebagai memori jangka panjang yang diatur oleh tiga gerbang spesialis: **Forget Gate** bertugas menyaring informasi tidak relevan, **Input Gate** mengontrol penambahan informasi baru, dan **Output Gate** menentukan representasi hidden state. **Model empat lapisan interaktif** ini memungkinkan retensi informasi jarak jauh yang lebih baik dibanding RNN konvensional. Implementasi parameter menggunakan formula `(m+n+1)*4*n + (n+1)*k` dimana m dimensi input, n neuron tersembunyi, dan k dimensi output.
>

> [!ad-libitum]- Additional Information
>
> #### Evolusi Arsitektur dari LSTM ke ReGU
> Perkembangan LSTM melahirkan varien seperti **GRU (Gated Recurrent Unit)** yang menggabungkan cell state dan hidden state serta mengurangi gerbang menjadi dua. Pada tahun 2019, **Residual Gated Unit (ReGU)** memperkenalkan koneksi residual (shortcut connection) yang memungkinkan aliran gradien lebih lancar melalui jaringan yang sangat dalam. Arsitektur ReGU mengadopsi mekanisme gate dari GRU dengan tambahan jalur paralel yang menghubungkan input langsung ke output.
>
> #### Optimasi Parameter pada Implementasi
> Jumlah parameter LSTM dapat dihitung dengan rumus `4(n(m+n+1)) + k(n+1)` dimana:
> - n: jumlah unit LSTM
> - m: dimensi input
> - k: dimensi output
> Parameter ini mencakup empat set bobot (Wf, Wi, WC, Wo) untuk gerbang dan cell state. Pada implementasi Keras, parameter `input_shape` mendefinisikan panjang urutan (time steps) dan fitur input per time step.
>
> #### Studi Kasus: Prediksi Deret Waktu
> Untuk implementasi masalah many-to-one (misal: prediksi harga saham), model Keras biasanya menggunakan lapisan LSTM dengan 10-100 neuron, diikuti dense layer dengan aktivasi linear untuk output regresi. Critical hyperparameter meliputi jumlah time steps (jendela observasi) dan ukuran batch yang mempengaruhi kemampuan model menangkap pola temporal jangka panjang.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan LSTM untuk prediksi cuaca dengan dataset historis: Eksperimen dengan variasi time steps (3 hari vs 7 hari) dan ukuran hidden layer
> 2. Bangun model klasifikasi sentimen Twitter dengan embedding layer + LSTM: Bandingkan akurasi antara arsitektur LSTM dan GRU
> 3. Visualisasi cell state dan gerbang: Gunakan library LSTMVis untuk melacak bagaimana informasi dipertahankan/diubah sepanjang urutan teks
>
> #### Sumber Lanjutan
> - "Deep Learning" (Goodfellow et al.) Bab 10: Sequence Modeling
> - Paper asli: Hochreiter & Schmidhuber (1997) "Long Short-Term Memory"
> - Tutorial interaktif: https://lstm.seas.harvard.edu
> - Dokumentasi TensorFlow: https://www.tensorflow.org/guide/keras/rnn