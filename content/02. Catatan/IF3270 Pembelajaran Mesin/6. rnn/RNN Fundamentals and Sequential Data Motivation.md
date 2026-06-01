---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin Lanjut]]

> [!cornell] RNN Fundamentals and Sequential Data Motivation
>
> > ## Questions/Cues
> >
> > - Mengapa RNN diperlukan untuk data berurutan?
> > - Perbedaan mendasar Feedforward vs RNN
> > - Bagaimana parameter sharing bekerja di RNN?
> > - Contoh aplikasi RNN di kehidupan nyata
> > - Masalah utama RNN tradisional
> >
> > ## Reference Points
> >
> > - Lecture_01_DFS.pptx (Slides 5-11, 26-28)
> > - Advanced_Algorithms.pdf (Halaman 142-144)
> >
>
> > ### Konsep Jaringan Saraf Berulang
> > Recurrent Neural Network (RNN) adalah jenis jaringan saraf tiruan dengan sambungan umpan balik (feedback) yang memungkinkan informasi bertahan antar langkah waktu. Berbeda dengan jaringan feedforward yang hanya memproses input secara independen, RNN memiliki memori internal yang merekam konteks sekuensial. Mekanisme ini meniru cara manusia memahami bahasa - kita menginterpretasikan setiap kata berdasarkan urutan kata sebelumnya.
> > Analogi: Bayangkan membaca novel sambil mencatat karakter dan plot di buku catatan. RNN bertindak seperti buku catatan ini, di mana setiap halaman (hidden state) berisi ringkasan cerita hingga bab tersebut. Saat membaca bab baru (input baru), kita memperbarui catatan berdasarkan halaman sebelumnya.
> > ### Motivasi Data Sekuensial
> > RNN dirancang khusus untuk data dengan ketergantungan temporal atau urutan, dimana:
> > 1. **Data deret waktu** (time-series): Harga saham, data cuaca, lalu lintas
> > 2. **Data simbolik berurutan**: Histori penelusuran web, urutan klik pengguna
> > 3. **Data bahasa alami**: Teks, ucapan, terjemahan mesin
> > Contoh konkret: Prediksi jumlah penumpang maskenerapkan RNN dapat mengidentifikasi pola musiman (liburan) dan tren jangka panjang, sementara model feedforward hanya melihat snapshot waktu tertentu tanpa konteks historis.
> > ### Arsitektur Dasar RNN
> > RNN memiliki tiga komponen utama:
> > 1. **Input (xₜ)**: Vektor fitur pada langkah waktu t
> > 2. **Hidden state (hₜ)**: Memori jaringan yang menyimpan informasi dari langkah sebelumnya
> > 3. **Output (yₜ)**: Prediksi pada langkah t
> > Persamaan fundamental:
> > ```
> > hₜ = f(Uxₜ + Whₜ₋₁ + b)
> > ```
> > Dimana U, W adalah matriks bobot dan b adalah bias. Parameter ini **dibagikan** di semua langkah waktu, memungkinkan jaringan mempelajari pola berulang secara efisien. Karakteristik ini berbeda dengan CNN yang menggunakan parameter berbeda di setiap lapisan.
> > ### Keunggulan dan Tantangan
> > **Kelebihan RNN**:
> > - Mampu menangani input/output dengan panjang variabel
> > - Menangkap ketergantungan jarak jauh (teoretis)
> > - Efisien untuk data sekuensial melalui parameter sharing
> > **Tantangan Utama**:
> > - **Vanishing gradient**: Gradien menyusut secara eksponensial saat backpropagation melalui waktu, menyulitkan pembelajaran ketergantungan jangka panjang
> > - **Kekakuan memori**: RNN tradisional kesulitan memilih informasi mana yang perlu disimpan/dibuang
> > - Komputasi sekuensial menyulitkan paralelisasi

> [!cornell] #### Summary
>
> **RNN** merupakan solusi fundamental untuk pemrosesan data sekuensial dengan memperkenalkan **memori internal** melalui mekanisme hidden state. Arsitekturnya mengatasi keterbatasan model feedforward dengan **parameter sharing** di seluruh langkah waktu dan kemampuan menangkap konteks temporal. Meski memiliki keunggulan dalam tugas seperti prediksi deret waktu dan pemrosesan bahasa, RNN tradisional menghadapi tantangan utama dalam **pembelajaran ketergantungan jangka panjang** akibat masalah vanishing gradient.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Parameter Sharing
> Misalkan kita memproses sequence panjang T:
> - Jumlah parameter FFNN = O(T × d) untuk d fitur
> - Jumlah parameter RNN = O(d² + dh + h) dengan h dimensi hidden state
>
> Pada sequence panjang (T besar), RNN jauh lebih efisien. Bukti formal kompleksitas:
> ```
> Total Parameter = (d × h) + (h × h) + h = h(d + h + 1)
> ```
> Dimana d = dimensi input, h = unit hidden state.
>
> #### Vanishing Gradient: Bukti Formal
> Pertimbangkan gradien ∂L/∂W untuk loss L pada waktu T:
> ```
> ∂L/∂W = Σₜ₌₁ᴛ ∂L/∂hₜ × ∂hₜ/∂W
> ∂hₜ/∂W = Πₖ₌₁ᵗ diag(f'(netₖ)) × hₖ₋₁
> ```
> Jika |f'(netₖ)| < 1 (misal untuk aktivasi sigmoid), perkalian berturut-turut menyebabkan gradien menyusut secara eksponensial seiring bertambahnya T.
>
> #### Aplikasi Khusus RNN
> 1. **Generative Modelling**:
> - Komposisi musik dengan mempelajari pola notasi
> - Penulisan puisi otomatis dengan mempertahankan skema rima
> 2. **Sensor Fusion**:
> - Integrasi data accelerometer, gyroscope, dan GPS untuk prediksi aktivasi manusia
> 3. **Financial Microscopy**:
> - Pemodelan high-frequency trading dengan resolusi milidetik
>
> #### Self-Exploration Projects
> 1. **Prediksi Kualitas Udara**: Gunakan dataset https://airnow.gov untuk memprediksi PM2.5 24 jam ke depan berdasarkan data historis. Bandingkan performa RNN vs ARIMA.
> 2. **Generasi Lirik Lagu**: Latih RNN pada korpus lirik musisi tertentu, perhatikan bagaimana model menangkap gaya linguistik dan tema khas.
> 3. **Analisis Rantai Pasokan**: Modelkan ketergantungan antara permintaan produk, cuaca, dan hari libur menggunakan data ritel.
>
> #### Tools dan Resources
> - **Pustaka**: TensorFlow Time Series, PyTorch Lightning, Sktime
> - **Dataset**: UCI Time Series Repository, Kaggle Sequential Datasets
> - **Visualisasi**: TensorBoard Embedding Projector, Plotly Dynamic Plots
>
> #### Further Reading
> - Bengio, Y., et al. (1994). *Learning Long-Term Dependencies with Gradient Descent is Difficult*
> - LeCun, Y. (2022). *A Path Towards Autonomous Machine Intelligence*
> - Interactive RNN Tutorial: https://distill.pub/2020/understanding-rnns/