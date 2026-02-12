---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Backpropagation Through Time (BPTT) in RNNs
>
> > ## Questions/Cues
> >
> > - Mengapa BPTT diperlukan untuk RNN?
> > - Bagaimana tahapan forward pass BPTT?
> > - Bagaimana menghitung gradien error mundur waktu?
> > - Apa perbedaan BPTT penuh dan terpotong?
> > - Bagaimana BPTT pada jaringan bidirectional?
> >
> > ## Reference Points
> >
> > - Materi Kuliah IF3270 (Slides 23-36)
> > - Goodfellow et al. Deep Learning (Chapter 10)
> > - Raschka et al. Machine Learning with Pytorch and Scikit-Learn (Chapter 15)
> >
>
> > ### Konsep Dasar BPTT
> > Backpropagation Through Time (BPTT) merupakan algoritma pembelajaran untuk Jaringan Saraf Berulang (RNN) yang memperluas backpropagation standar dengan memperhitungkan ketergantungan temporal. Berbeda dengan jaringan feedforward yang hanya memiliki jalur maju tunggal, RNN memiliki siklus yang membuat perhitungan gradien harus dilakukan secara berurutan untuk setiap langkah waktu.
> > BPTT bekerja dengan "membentangkan" RNN menjadi jaringan feedforward virtual di sepanjang sumbu waktu. Setiap langkah waktu dianggap sebagai lapisan tersendiri dengan parameter yang sama. Contoh sederhana: untuk kalimat 3 kata, RNN akan dibentangkan menjadi 3 lapisan dengan bobot identik di setiap lapisan. Pendekatan ini memungkinkan perhitungan gradien yang akurat melalui rantai aturan turunan berantai.
> > ### Proses Forward Pass
> > Pada fase forward pass, RNN memproses data sekuensial langkah demi langkah sambil menyimpan nilai aktivasi (hidden state) setiap langkah waktu:
> > 1. **Inisialisasi**: Hidden state awal (h₀) biasanya diinisialisasi dengan nilai nol atau acak kecil
> > 2. **Propagasi**: Untuk setiap langkah waktu t:
> > - Hitung hidden state baru: h_t = σ(W_xh * x_t + W_hh * h_{t-1} + b_h)
> > - Hitung output: y_t = σ(W_hy * h_t + b_y)
> > 3. **Penyimpanan**: Simpan semua nilai h_t dan y_t untuk digunakan dalam backward pass
> > Contoh numerik: Untuk input [0.5, 1.25], pertama hitung h₁ menggunakan x₁=0.5, lalu h₂ menggunakan x₂=1.25 dan h₁. Nilai h ini akan digunakan dalam perhitungan gradien mundur.
> > ### Proses Backward Pass
> > Fase backward pass menghitung gradien error secara berurutan dari langkah waktu terakhir ke awal:
> > 1. **Hitung error output**: δ_y(t) = (y_pred(t) - y_true(t)) * f'(y(t))
> > 2. **Propagasi mundur**: Untuk t = T sampai t = 0:
> > - Hitung gradien untuk parameter berdasarkan rantai turunan
> > - Update hidden state error: δ_h(t) = (W_hy^T δ_y(t) + W_hh^T δ_h(t+1)) * f'(h(t))
> > 3. **Akumulasi gradien**: Total gradien adalah penjumlahan gradien dari semua langkah waktu
> > Diferensial dilakukan menggunakan aturan rantai melalui seluruh jalur temporal, yang membuat komputasi menjadi intensif untuk urutan panjang.
> > ### Truncated BPTT
> > Untuk mengatasi kompleksitas komputasi BPTT penuh, digunakan Truncated BPTT yang membatasi panjang urutan:
> > - **Mekanisme**: Hanya melakukan backpropagation untuk τ langkah terakhir (τ << panjang urutan sebenarnya)
> > - **Keuntungan**: Menghemat memori dan komputasi
> > - **Kekurangan**: Gradien mungkin tidak mencapai awal urutan panjang
> > - **Implementasi**: Pada praktiknya, τ biasanya antara 50-200 langkah tergantung aplikasi
> > Contoh implementasi: Dalam pemrosesan teks buku, kita mungkin memotong menjadi segmen 100 kata untuk setiap iterasi update.
> > ### BPTT pada Bidirectional RNN
> > Pada arsitektur bidirectional, BPTT dijalankan untuk kedua arah (maju dan mundur):
> > 1. **Forward pass ganda**: Hitung hidden state untuk kedua arah (→ dan ←)
> > 2. **Backward pass terpisah**: Hitung gradien secara independen untuk setiap arah
> > 3. **Kombinasi gradien**: Gabungkan gradien dari kedua arah sebelum update parameter
> > Tantangan utama adalah sinkronisasi antara kedua aliran informasi dan manajemen memori yang lebih kompleks.

> [!cornell] #### Summary
>
> **Backpropagation Through Time (BPTT)** adalah algoritma fundamental untuk pelatihan RNN yang memperluas prinsip backpropagation dengan memperhitungkan ketergantungan temporal melalui pembentangan jaringan sepanjang sumbu waktu. Proses ini melibatkan **fase forward pass** untuk menghitung output dan menyimpan aktivasi setiap langkah waktu, diikuti **fase backward pass** yang menghitung gradien secara berurutan dari akhir ke awal urutan. Implementasi praktis sering menggunakan **Truncated BPTT** untuk menangani urutan panjang dengan membatasi rentang propagasi gradien. Pada arsitektur bidirectional, BPTT dijalankan untuk kedua arah dengan mekanisme kombinasi gradien yang hati-hati.
>

> [!ad-libitum]- Additional Information
>
> #### Derivasi Matematis Lengkap
> Turunan lengkap untuk parameter RNN dengan fungsi aktivasi tanh:
>
> Misalkan fungsi error E = Σ E_t, dengan E_t = ½(y_t - ŷ_t)²
>
> Turunan terhadap W_hh:
> ∂E/∂W_hh = Σ_{t=1}^T [Σ_{k=t}^T (∂E_k/∂h_t) · ∂h_t/∂W_hh]
>
> ∂h_t/∂W_hh = diag(tanh'(W_xh x_t + W_hh h_{t-1})) · (h_{t-1} + W_hh ∂h_{t-1}/∂W_hh)
>
> Relasi rekursif ini menunjukkan sifat komputasi yang eksponensial dalam BPTT penuh.
>
> #### Optimasi Memori dengan Gradient Checkpointing
> Teknik untuk mengurangi penggunaan memori dalam BPTT:
> - **Prinsip**: Hanya menyimpan subset hidden state selama forward pass
> - **Re-komputasi**: Menghitung ulang state yang tidak disimpan saat backward pass
> - **Trade-off**: Mengurangi memori O(√T) dengan komputasi tambahan O(T)
>
> Implementasi umum dalam framework seperti PyTorch menggunakan `torch.utils.checkpoint`.
>
> #### Studi Kasus: Implementasi Numerik
> Contoh update parameter untuk input sederhana:
> ```
> Inisialisasi: W = 0.5
> Forward pass:
> t=0: h0 = tanh(W * 0.5) = 0.462
> t=1: h1 = tanh(W * 0.462 + 1.25) = 0.843
> Error: E = 0.5*(0.843 - 1.25)^2 = 0.0827
>
> Backward pass:
> ∂E/∂W = ∂E/∂h1 * [∂h1/∂W + ∂h1/∂h0 * ∂h0/∂W]
> = (0.843-1.25) * [0.462*(1-0.843²) + 0.5*(1-0.462²)*(1-0.843²)]
> = (-0.407) * [0.183 + 0.193] = -0.153
>
> Update (η=0.1): W_new = 0.5 - 0.1*(-0.153) = 0.5153
> ```
>
> #### Aplikasi dalam Pemrosesan Bahasa Alami
> Implementasi BPTT untuk tugas prediksi kata:
> - **Dataset**: Kumpulan artikel berita (urutan 10.000 kata)
> - **Arsitektur**: RNN dengan 128 unit tersembunyi
> - **Truncation**: τ = 64 langkah
> - **Teknik**: Gradient clipping pada 1.0 untuk mencegah ledakan gradien
> - **Hasil**: Akurasi validasi 58.7% pada prediksi kata berikutnya
>
> #### Bibliografi Lanjutan
> 1. "Backpropagation Through Time: What It Does and How to Do It" - Werbos (1990)
> 2. "On the difficulty of training recurrent neural networks" - Pascanu et al. (2013)
> 3. "Truncated Backpropagation Through Time" - Mikolov et al. (2014)
> 4. Dokumentasi TensorFlow: Custom Training Loops for RNNs
>
> #### Projek Eksplorasi Mandiri
> 1. Implementasikan BPTT dari awal untuk model RNN sederhana menggunakan NumPy
> 2. Bandingkan kinerja BPTT penuh dan truncated pada dataset sinyal waktu (contoh: prediksi saham)
> 3. Eksperimen dengan teknik optimasi memori seperti gradient checkpointing pada model besar
>
> #### Alat dan Sumber Daya
> - **Perpustakaan**: TensorFlow/PyTorch RNN modules, CuDNN-optimized LSTM
> - **Dataset**: Penn Treebank, Google Billion Words
> - **Visualisasi**: TensorBoard Trace View untuk profiling komputasi BPTT