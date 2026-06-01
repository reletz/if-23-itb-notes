---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Forward Propagation in LSTM Networks
>
> > ## Questions/Cues
> >
> > - Bagaimana aliran informasi dalam forward propagation LSTM?
> > - Peran fungsi aktivasi sigmoid dan tanh dalam LSTM?
> > - Tahapan update cell state pada forward pass?
> > - Implementasi forward propagation di Keras?
> > - Perhitungan parameter pada jaringan LSTM?
> >
> > ## Reference Points
> >
> > - Lecture_IF3270.pptx (Slides 8-15, 19-22)
> > - Medium_Article_LSTM_Implementation (Pages 17-19)
> >
>
> > ### Arsitektur Dasar LSTM
> > Long Short-Term Memory (LSTM) merupakan jenis khusus Recurrent Neural Network (RNN) yang dirancang untuk menangani ketergantungan jangka panjang. Modul berulang pada LSTM terdiri dari beberapa lapisan yang saling berinteraksi, berbeda dengan RNN standar yang hanya menggunakan lapisan tanh tunggal. Selama fase forward propagation, informasi mengalir melalui tiga tahap utama: komputasi gate, update cell state, dan generasi output.
> > Contoh analogi: Bayangkan LSTM seperti sistem penyaringan surat di kantor pos. Setiap gate bertindak sebagai petugas yang memutuskan surat mana yang disimpan (input gate), dibuang (forget gate), atau dikirim ke tujuan (output gate). Cell state berperan sebagai ban berjalan yang membawa semua informasi penting antar tahap pemrosesan.
> > ### Tahapan Forward Propagation
> > **1. Komputasi Gate:**
> > - **Forget Gate:** Menghitung informasi yang akan dipertahankan dari cell state sebelumnya menggunakan fungsi sigmoid. Nilai mendekati 0 menunjukkan informasi akan dibuang, sedangkan nilai mendekati 1 dipertahankan.
> > - **Input Gate:** Menentukan nilai update baru menggunakan fungsi sigmoid dan tanh. Sigmod memfilter informasi penting, sedangkan tanh menghasilkan vektor kandidat update.
> > **2. Update Cell State:**
> > Cell state diperbarui dengan menggabungkan informasi dari forget gate dan input gate:
> > ```
> > Ct = (Ct-1 * ft) + (it * Čt)
> > ```
> > di mana ft adalah output forget gate, it output input gate, dan Čt vektor kandidat baru.
> > **3. Generasi Output:**
> > Output gate mengatur informasi yang akan dikirim ke hidden state berikutnya. Cell state yang telah diperbarui diproses melalui tanh kemudian dikalikan dengan output gate:
> > ```
> > ht = ot * tanh(Ct)
> > ```
> > ### Contoh Implementasi Praktis
> > Implementasi forward propagation LSTM menggunakan Keras untuk model Many-to-One:
> > ```python
> > from keras.models import Sequential
> > from keras.layers import LSTM, Dense
> > model = Sequential()
> > model.add(LSTM(10, input_shape=(50,1)))  # 10 neuron, input 50 timestep
> > model.add(Dense(1, activation='linear'))
> > ```
> > Pada contoh ini, lapisan LSTM memproses urutan data 50 langkah waktu dengan 1 fitur per langkah. Output gate terhubung ke lapisan Dense untuk menghasilkan prediksi numerik.
> > ### Visualisasi Aliran Data
> > Diagram alur forward propagation:
> > ```
> > Input (xt) → [Gate Layer] → [Cell State Update] → [Output Gate] → Hidden State (ht)
> > ↑               ↑                    ↑
> > Hidden State (ht-1) Cell State (Ct-1)  Cell State (Ct)
> > ```
> > Setiap panah merah menunjukkan aliran data selama forward pass, dengan operasi element-wise multiplication (*) dan addition (+).

> [!cornell] #### Summary
>
> **Forward propagation pada LSTM** melibatkan tiga tahap inti: komputasi gate menggunakan fungsi sigmoid dan tanh, update cell state melalui kombinasi informasi lama dan baru, serta generasi output melalui filter output gate. Proses ini memungkinkan LSTM **mempertahankan informasi relevan** antar langkah waktu dengan mekanisme gate yang terkelola. Implementasi praktis menggunakan framework seperti Keras menunjukkan konfigurasi parameter input_shape yang menentukan dimensi urutan waktu. **Perhitungan parameter** LSTM secara signifikan lebih kompleks dibanding RNN standar karena adanya empat transformasi linear berbeda dalam setiap sel.
>

> [!ad-libitum]- Additional Information
>
> #### Perhitungan Parameter LSTM
> Rumus umum perhitungan parameter untuk LSTM dengan:
> - `m`: dimensi input
> - `n`: jumlah neuron LSTM
> - `k`: dimensi output
>
> Total parameter = `4*(m*n + n^2 + n) + (n*k + k)`
>
> Contoh untuk arsitektur dengan 10 neuron, input 1 dimensi, output 1 dimensi:
> ```
> = 4*(1*10 + 10^2 + 10) + (10*1 + 1)
> = 4*(10 + 100 + 10) + 11
> = 4*120 + 11 = 491 parameter
> ```
> Komponen utama berasal dari empat set weight matrices (input gate, forget gate, output gate, dan cell state candidate) serta bias untuk masing-masing gate.
>
> #### Variasi Arsitektur LSTM Modern
> **1. Peephole Connections:**
> Memungkinkan gate mengakses cell state secara langsung tanpa melalui hidden state. Memodifikasi persamaan gate menjadi:
> ```
> ft = σ(Wf · [ht-1, xt] + Uf · Ct-1 + bf)
> ```
>
> **2. Convolutional LSTM:**
> Mengganti transformasi linear dengan operasi konvolusi, cocok untuk data spasio-temporal seperti video. Digunakan secara luas dalam video captioning (*referensi terlarang - hanya disebutkan tanpa penjelasan*).
>
> #### Optimasi Implementasi
> Teknik optimasi komputasi forward propagation:
> - **Kernel Fusion:** Menggabungkan operasi matriks untuk mengurangi overhead memori
> - **Quantization:** Menggunakan presisi 16-bit untuk komputasi
> - **Parallelization:** Memproses multiple time steps secara paralel pada GPU
>
> #### Self-Exploration Projects
> 1. Implementasikan forward propagation LSTM manual dengan NumPy untuk input sequence [0.5, 1.2, -0.3] dan visualisasikan perubahan cell state tiap langkah waktu
> 2. Bandingkan output LSTM Keras dengan implementasi manual menggunakan bobot yang sama
> 3. Eksperimen dengan berbagai fungsi aktivasi alternatif untuk gate (contoh: sigmoid vs hard sigmoid)
>
> #### Tools dan Referensi
> - **Library:** Keras, PyTorch Lightning, CuDNN-LSTM
> - **Visualisasi:** TensorBoard LSTM Traces, Netron
> - **Buku:** "Deep Learning" (Goodfellow et al.) Bab 10 - Sequence Modeling
> - **Paper:** "LSTM: A Search Space Odyssey" (Greff et al., 2017)