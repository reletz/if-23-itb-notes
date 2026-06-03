---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Dataset Preparation and FFNN vs RNN for Time-Series
>
> > ## Questions/Cues
> >
> > - Bagaimana mengubah data time-series menjadi matriks dengan time window/lags?
> > - Apa itu dataset Airline Passenger?
> > - Bagaimana FFNN 1 fitur bekerja dan apa kelemahannya?
> > - Apa perbedaan FFNN 3 fitur dengan RNN 3 timestep?
> > - Mengapa RNN lebih unggul untuk data time-series?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - RNN Pt. 1 (Pages 23-29)
>
> > ### Transformasi Data Time-Series ke Matriks
> > Data time-series harus **ditransformasikan menjadi matriks** di mana setiap nilai dihubungkan dengan **time window (lags)** yang mendahuluinya. Artinya, untuk memprediksi nilai pada waktu t+1, kita menyusun fitur dari nilai-nilai pada waktu sebelumnya (t, t-1, t-2, dst.). Proses ini disebut **windowing** atau pembentukan **lag features**, dan merupakan langkah wajib sebelum data sekuensial dapat diumpankan ke model supervised learning.
> >
> > ### Dataset Airline Passenger
> > Dataset contoh yang digunakan adalah **Airline Passenger Dataset**, berisi total penumpang per bulan (dalam ribuan) dengan **144 observasi**. Beberapa baris awal: 1949-01 → **112**, 1949-02 → **118**, 1949-03 → **132**, 1949-04 → **129**, 1949-05 → **121**, dan seterusnya. Tugasnya adalah **memprediksi total penumpang** pada bulan berikutnya berdasarkan riwayat sebelumnya.
> >
> > ### FFNN dengan 1 Fitur
> > Pendekatan paling sederhana: **FFNN 1 fitur**, di mana input adalah satu nilai **X(t)** dan target adalah **Y = X(t+1)**. Dataset menjadi:
> >
> > ```
> > X(t)   Y = X(t+1)
> > 112    118
> > 118    132
> > 132    129
> > 129    121
> > 121    135
> > ```
> >
> > **Kelemahan model ini**: hanya melihat **satu nilai sebelumnya** untuk memprediksi nilai berikutnya. Model kehilangan konteks tren jangka panjang dan pola musiman — informasi penting yang tersebar di beberapa bulan sebelumnya tidak termanfaatkan.
> >
> > ### FFNN dengan 3 Fitur
> > Untuk menangkap lebih banyak konteks, digunakan **FFNN 3 fitur** dengan lag t-2, t-1, dan t sebagai input:
> >
> > ```
> > X1=X(t-2)  X2=X(t-1)  X3=X(t)  Y=X(t+1)
> > 112        118        132      129
> > 118        132        129      121
> > 132        129        121      135
> > 129        121        135      148
> > 121        135        148      148
> > ```
> >
> > Di sini model melihat **tiga nilai historis** sekaligus. Kelemahannya: jumlah fitur **fixed** (harus ditentukan di awal), dan **tidak ada mekanisme memori** yang eksplisit — setiap lag diperlakukan sebagai fitur independen tanpa pemahaman urutan temporal.
> >
> > ### RNN Single Layer dengan 3 Time Steps
> > **RNN single layer** memproses data yang sama tetapi sebagai **3 time steps**: nilai 112 (1949-01), 118 (1949-02), dan 132 (1949-03) diumpankan **satu per satu secara berurutan** melalui sel rekuren yang sama, untuk memprediksi 129. Bobot **Wxh**, **Whh**, dan **Why** di-share antar timestep, dan hidden state membawa konteks dari satu langkah ke langkah berikutnya.
> >
> > ### Perbandingan FFNN vs RNN
> > Perbedaan konseptual paling jelas terlihat pada bentuk dataset:
> >
> > - **FFNN (3 Feature Dataset)**: tiga lag sebagai **tiga fitur paralel** dalam satu vektor input — `[112, 118, 132] → 129`. Model melihatnya sebagai titik tunggal berdimensi 3.
> > - **RNN (1 Feature dengan 3 Time Steps)**: nilai yang sama disusun sebagai **sekuens 3 langkah waktu** — `[112] [118] [132] → 129`. Model memprosesnya **secara berurutan** dengan satu fitur per langkah, mempertahankan **urutan temporal** dan memori melalui hidden state.
> >
> > Konsekuensinya: FFNN terikat ke jumlah lag tetap dan kehilangan struktur waktu, sedangkan RNN dapat menangani sekuens dengan panjang bervariasi dan secara eksplisit memodelkan ketergantungan antar waktu.

> [!cornell] #### Summary
>
> Data **time-series** harus diubah menjadi **matriks lag/time window** sebelum dilatih; contohnya **Airline Passenger Dataset (144 observasi)**. **FFNN 1 fitur** memetakan `X(t) → X(t+1)` tetapi **buta terhadap konteks jangka panjang**; **FFNN 3 fitur** menambah lag t-2, t-1, t sebagai **tiga fitur paralel** namun tetap **tanpa memori temporal** dan jumlah lag tetap. **RNN single layer** memproses nilai yang sama sebagai **sekuens 3 time steps** (`[112][118][132] → 129`) dengan bobot **Wxh/Whh/Why di-share** dan hidden state membawa konteks. Perbedaan inti: FFNN melihat lag sebagai **fitur paralel sebuah titik**, sedangkan RNN melihatnya sebagai **sekuens berurutan**.

> [!ad-libitum]- Additional Information
>
> #### Sliding Window dengan Pandas/scikit-learn
> Pembentukan lag feature dapat diotomatisasi dengan `pandas.DataFrame.shift()` untuk membuat kolom lag, atau dengan `sklearn` melalui kelas khusus seperti `skforecast`'s `ForecasterAutoreg`. Untuk RNN, Keras menyediakan `tf.keras.utils.timeseries_dataset_from_array()` yang membentuk window secara langsung.
>
> #### Normalisasi Time-Series
> Sebelum melatih, nilai penumpang (112-600+) sebaiknya dinormalisasi (mis. MinMaxScaler ke rentang [0,1]) agar fungsi aktivasi seperti tanh tidak jenuh. Penting: scaler harus di-fit hanya pada data train untuk menghindari data leakage.
>
> #### Train-Test Split untuk Time-Series
> Berbeda dari data IID, time-series TIDAK boleh di-shuffle. Gunakan split kronologis (mis. 100 observasi pertama untuk train, 44 sisanya untuk test) atau `TimeSeriesSplit` untuk cross-validation yang menghormati urutan waktu.
>
> #### Proyek Eksplorasi Mandiri
> 1. Latih FFNN 1 fitur, FFNN 3 fitur, dan RNN single layer pada Airline Passenger Dataset, lalu bandingkan RMSE pada test set untuk membuktikan keunggulan RNN.
> 2. Eksperimen dengan ukuran window berbeda (3, 6, 12 bulan) dan amati pengaruhnya terhadap kemampuan menangkap musiman tahunan.
>
> #### Bacaan Lanjutan
> - Brownlee, J. [Time Series Prediction with LSTM Recurrent Neural Networks in Python with Keras](https://machinelearningmastery.com/time-series-prediction-lstm-recurrent-neural-networks-python-keras/)
> - [Skforecast: Time series forecasting with scikit-learn](https://cienciadedatos.net/documentos/py27-time-series-forecasting-python-scikitlearn)
