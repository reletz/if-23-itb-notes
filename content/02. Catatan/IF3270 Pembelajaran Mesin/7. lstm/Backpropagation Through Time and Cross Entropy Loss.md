---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Backpropagation Through Time and Cross Entropy Loss
>
> > ## Questions/Cues
> >
> > - Apa itu BPTT dan bagaimana hubungannya dengan unfolded network?
> > - Bagaimana total loss dihitung sepanjang seluruh timestep?
> > - Bagaimana menghitung cross entropy loss untuk satu instance?
> > - Bagaimana cross entropy diperluas untuk output sekuens?
> > - Apa langkah-langkah algoritma BPTT?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - LSTM (Pages 22-31)
>
> > ### Backpropagation Through Time (BPTT)
> >
> > **BPTT (Backpropagation Through Time)** adalah ekstensi dari backpropagation standar yang melakukan **gradient descent pada unfolded network** (jaringan rekuren yang "dibentangkan" menjadi rangkaian timestep). Ide dasarnya: **total loss L adalah jumlah seluruh fungsi loss pada tiap timestep** dari t=1 hingga t=T.
> >
> > `L = Σ (t=1 sampai T) L(t)`
> >
> > Notasi bobot yang dipakai pada slide RNN:
> >
> > - **U = Wxh** (bobot input ke hidden)
> > - **W = Whh** (bobot hidden ke hidden, rekuren)
> > - **V = Why** (bobot hidden ke output)
> >
> > Karena ketiga bobot ini **sama di semua timestep** (shared weights), gradien dari tiap timestep nantinya harus digabungkan.
> >
> > ### Cross Entropy Loss untuk Satu Instance
> >
> > Dengan target y dalam bentuk **one-hot encoded** (yi,true=1, lainnya 0), cross entropy loss dihitung sebagai L = -Σ yi·ln(ŷi). Beberapa contoh:
> >
> > ```
> > y=[1,0,0]; ŷ=[1,0,0]
> > L = -1·ln(1) - 0 - 0 = 0           (prediksi sempurna)
> >
> > y=[1,0,0]; ŷ=[0.7,0.2,0.1]
> > L = -1·ln(0.7) - 0·ln(0.2) - 0·ln(0.1) = 0.357
> >
> > y=[0,1,0]; ŷ=[1,0,0]
> > L = -0·ln(1) - 1·ln(0) - 0 = -1·(-inf) = inf   (prediksi nol pada kelas benar)
> > ```
> >
> > Kasus terakhir menunjukkan: jika model memprediksi probabilitas **nol** pada kelas yang sebenarnya benar, loss menjadi **tak hingga (∞)**, karena ln(0) = -∞. Inilah mengapa cross entropy menghukum keras keyakinan salah yang ekstrem.
> >
> > ### Cross Entropy Loss untuk Multiclass
> >
> > Untuk klasifikasi multiclass, prinsipnya sama: hanya komponen kelas benar (yi,true=1) yang berkontribusi karena komponen lain dikalikan 0. Loss total beberapa instance adalah penjumlahan negative log-likelihood tiap instance, contohnya:
> >
> > ```
> > L = -ln(0.71) - ln(0.98) - ln(0.49)
> > ```
> >
> > Selalu gunakan **logaritma natural (ln)**.
> >
> > ### Cross Entropy Loss untuk Output Sekuens
> >
> > Pada RNN/LSTM dengan output di setiap timestep, cross entropy dijumlahkan **sepanjang seluruh timestep**. Target tiap timestep tetap one-hot (ytrue=1, lainnya 0). Contoh sekuens 4 timestep:
> >
> > ```
> > L = -ln(0.253) - ln(0.26) - ln(0.299) - ln(0.240)
> >   = 1.374 + 1.347 + 1.207 + 1.427
> >   = 5.356
> > ```
> >
> > Total loss sekuens inilah yang diminimalkan oleh BPTT.
> >
> > ### Langkah-Langkah Algoritma BPTT
> >
> > **1. Forward pass:** dapatkan output sekuens saat ini menggunakan h(t)=fh(Wxh·x(t)+Whh·h(t-1)+bh) dan o(t)=fy(Who·h(t)+bho).
> >
> > **2. Backward pass:**
> > - (a) Hitung **cross entropy error** (negative log-likelihood dari y) menggunakan output sekuens saat ini (ŷ=ŷ1..ŷn) dan output aktual (y=y1..yn).
> > - (b) Untuk unrolled network, **gradien dihitung pada tiap timestep** terhadap parameter bobot.
> >
> > **3. Gabungkan gradien:** karena **bobot sama untuk semua timestep**, gradien dari seluruh timestep digabungkan, lalu bobot diperbarui untuk neuron rekuren maupun lapisan dense.
> >
> > ### Backward Pass pada RNN
> >
> > Pada slide RNN, net(t)=Why·h(t)+bhy dan ŷ(t)=fy(Who·h(t)+bho), sedangkan h(t)=fh(Wxh·x(t)+Whh·h(t-1)+bh). Backward pass memakai aturan rantai dari loss → output → hidden state → kembali menembus timestep sebelumnya melalui Whh. Karena ketergantungan h(t) pada h(t-1) pada h(t-2) dan seterusnya, gradien terhadap Whh mengakumulasi kontribusi dari semua timestep di belakangnya.

> [!cornell] #### Summary
>
> **BPTT (Backpropagation Through Time)** adalah ekstensi backpropagation yang melakukan gradient descent pada **unfolded network**, dengan **total loss L sebagai jumlah loss tiap timestep** (t=1..T) dan notasi **U=Wxh, W=Whh, V=Why**. Fungsi loss yang dipakai adalah **cross entropy** dengan target one-hot: untuk satu instance contohnya y=[1,0,0], ŷ=[0.7,0.2,0.1] menghasilkan **L=0.357**, sedangkan prediksi nol pada kelas benar menghasilkan **L=∞**. Untuk **output sekuens**, cross entropy dijumlahkan seluruh timestep, contohnya **L=-ln(0.253)-ln(0.26)-ln(0.299)-ln(0.240)=5.356**. Langkah BPTT: **forward pass** → **backward pass** (hitung CE error, lalu gradien tiap timestep) → **gabungkan gradien** karena bobot sama di semua timestep, baru perbarui bobot rekuren dan dense.

> [!ad-libitum]- Additional Information
>
> #### Kaitan Softmax dan Cross Entropy
> Output sekuens biasanya melewati **softmax** sebelum cross entropy. Gabungan softmax + cross entropy menghasilkan gradien yang sangat rapi: ∂L/∂net = ŷ - y, yaitu selisih prediksi dengan target one-hot. Inilah alasan praktis kombinasi ini hampir selalu dipakai di lapisan output klasifikasi sekuens.
>
> #### Label Smoothing untuk Menghindari L Tak Hingga
> Masalah L=∞ saat ŷ=0 pada kelas benar dihindari secara numerik dengan menambah epsilon kecil (clipping ŷ ke [ε, 1-ε]) atau dengan **label smoothing**, yang mengganti target one-hot keras menjadi distribusi lunak (mis. 0.9 untuk kelas benar, sisanya tersebar). Ini juga meningkatkan generalisasi.
>
> #### Akumulasi Gradien pada Shared Weights
> Karena W=Whh dipakai di tiap timestep, ∂L/∂W = Σt ∂L(t)/∂W. Secara implementasi, kerangka kerja seperti PyTorch menangani ini otomatis lewat autograd: setiap pemakaian W menambahkan kontribusi ke `.grad` yang sama saat `loss.backward()` dipanggil.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan cross entropy loss untuk sekuens di NumPy dan verifikasi nilai 5.356 dari contoh pada slide.
> 2. Turunkan secara manual gradien softmax+cross entropy dan buktikan ∂L/∂net = ŷ - y.
> 3. Bandingkan total loss sekuens dengan dan tanpa clipping ŷ untuk melihat dampak numerik prediksi mendekati nol.
>
> #### Bacaan Lanjutan
> - Goodfellow, I., Bengio, Y., &amp; Courville, A. (2016). *Deep Learning* (Chapter 10: Sequence Modeling).
> - Werbos, P. (1990). *Backpropagation Through Time: What It Does and How to Do It*.
> - [Softmax and the Negative Log-Likelihood](https://ljvmiranda921.github.io/notebook/2017/08/13/softmax-and-the-negative-log-likelihood/)
