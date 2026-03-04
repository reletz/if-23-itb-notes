---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Practical Implementation of Feed‑Forward Neural Networks with Keras and Parameter Accounting
>
> > ## Questions/Cues
> >
> > - Bagaimana cara mendefinisikan arsitektur FFNN di Keras?
> > - Apa peran fungsi *loss* dan optimizer dalam `model.compile`?
> > - Bagaimana menghitung total parameter secara manual?
> > - Kapan harus menggunakan *batch size* kecil vs besar?
> > - Apa manfaat callback *EarlyStopping* pada pelatihan?
> > - Bagaimana menyimpan dan memuat model terlatih?
> > - Bagaimana melakukan pencarian hiperparameter dengan Keras‑Tuner?
> >
> > ## Reference Points
> >
> > - Lecture_Keras_Implementation.pdf (Slides 24‑25)
> > - Goodfellow et al., *Deep Learning* (Chapter 6, contoh kode Keras)
> > - Raschka, *Machine Learning with PyTorch and Scikit‑Learn* (Chapter 11, penjelasan parameter)
>
> > ### Definisi Model Feed‑Forward dengan API Sequential
> >
> > Keras menyediakan dua antarmuka utama untuk membangun jaringan saraf: **Sequential** dan **Functional**. Pada catatan ini kami fokus pada **Sequential**, yang paling cocok untuk jaringan berlapis lurus (feed‑forward) tanpa cabang. Sebuah objek `Sequential` berfungsi sebagai wadah berurutan untuk lapisan‑lapisan (`Dense`, `Dropout`, dll.). Setiap lapisan menerima output dari lapisan sebelumnya, sehingga alur data mengalir satu arah dari input ke output, sesuai sifat graf berarah tanpa siklus (DAG). Contoh kode dasar:
> >
> > ```python
> >
> > from keras.models import Sequential
> >
> > from keras.layers import Dense
> >
> > model = Sequential()
> >
> > model.add(Dense(12, input_dim=8, activation='relu'))   # lapisan tersembunyi pertama
> >
> > model.add(Dense(8, activation='relu'))                # lapisan tersembunyi kedua
> >
> > model.add(Dense(1, activation='sigmoid'))            # lapisan output
> >
> > ```
> >
> > Baris pertama `model.add(Dense(12, input_dim=8, activation='relu'))` menetapkan **jumlah neuron** (12) dan **dimensi input** (8). Parameter `activation='relu'` menentukan fungsi aktivasi yang akan diterapkan pada output linear tiap neuron; Keras secara internal menambahkan bias (bias term) untuk setiap neuron kecuali dinonaktifkan secara eksplisit. Karena semua lapisan `Dense` terhubung penuh, setiap neuron pada lapisan `i` memiliki bobot yang menghubungkannya ke semua neuron pada lapisan `i‑1`. Struktur ini mencerminkan arsitektur **Multi‑Layer Perceptron (MLP)** yang umum dipakai untuk klasifikasi biner atau regresi sederhana.
> >
> > ### Kompilasi Model: Memilih *Loss*, Optimizer, dan Metode Evaluasi
> >
> > Setelah arsitektur selesai, langkah selanjutnya adalah **kompilasi** model dengan `model.compile`. Pada tahap ini kita menentukan tiga komponen penting:
> >
> > 1. **Loss function** – mengukur selisih antara prediksi model (`y_pred`) dan nilai target (`y_true`). Untuk masalah klasifikasi biner, `binary_crossentropy` adalah pilihan standar karena mengasumsikan output berupa probabilitas (nilai antara 0‑1).
> > 2. **Optimizer** – algoritma yang memperbarui bobot berdasarkan gradien loss. `adam` (Adaptive Moment Estimation) adalah optimizer default yang menggabungkan kelebihan *AdaGrad* dan *RMSProp*, sehingga cocok untuk kebanyakan dataset tanpa perlu penyesuaian manual learning rate yang rumit.
> > 3. **Metrics** – metrik tambahan yang tidak memengaruhi proses pelatihan tetapi memberikan informasi kinerja selama training dan evaluasi. `accuracy` menghitung persentase prediksi yang tepat pada data pelatihan/validasi.
> >
> > Contoh kompilasi:
> >
> > ```python
> >
> > model.compile(loss='binary_crossentropy',
> >
> > optimizer='adam',
> >
> > metrics=['accuracy'])
> >
> > ```
> >
> > Keras secara otomatis menginisialisasi semua bobot (bias termasuk) dengan distribusi **Glorot Uniform** (juga dikenal sebagai *Xavier initialization*). Inisialisasi ini dirancang untuk menjaga varians sinyal tetap stabil ketika melewati banyak lapisan, sehingga mengurangi risiko *vanishing* atau *exploding* gradient pada tahap back‑propagation.
> >
> > ### Pelatihan dengan `model.fit`: Epoch, Batch Size, dan Callback
> >
> > Fungsi `model.fit` mengontrol proses **training**. Parameter utama meliputi:
> >
> > - **epochs**: jumlah iterasi penuh melalui seluruh dataset. Nilai yang terlalu tinggi dapat menyebabkan overfitting, sedangkan nilai terlalu rendah menghasilkan model yang underfit.
> > - **batch_size**: jumlah sampel yang diproses sekaligus sebelum bobot diperbarui. Batch kecil (mis. 10‑32) memberikan estimasi gradien yang lebih “berisik” tetapi dapat membantu model keluar dari minima lokal; batch besar (mis. 128‑256) menghasilkan gradien yang lebih stabil tetapi memerlukan memori GPU lebih banyak.
> > - **validation_split** atau **validation_data**: menyediakan data terpisah untuk memantau loss/metric pada setiap epoch, membantu mendeteksi overfitting secara dini.
> >
> > Callback paling umum adalah **EarlyStopping**, yang menghentikan training secara otomatis ketika loss pada data validasi tidak membaik selama sejumlah epoch (`patience`). Ini menghemat waktu komputasi dan mencegah overfitting.
> >
> > Contoh penggunaan:
> >
> > ```python
> >
> > from keras.callbacks import EarlyStopping
> >
> > early_stop = EarlyStopping(monitor='val_loss',
> >
> > patience=5,
> >
> > restore_best_weights=True)
> >
> > history = model.fit(X_train, y_train,
> >
> > epochs=150,
> >
> > batch_size=10,
> >
> > validation_split=0.2,
> >
> > callbacks=[early_stop])
> >
> > ```
> >
> > `history` menyimpan nilai loss dan metric per epoch, yang dapat dipetakan menjadi grafik untuk analisis visual.
> >
> > ### Menghitung Total Parameter: Analisis Manual vs `model.summary()`
> >
> > Setiap lapisan `Dense` memiliki **parameter bobot** (`weights`) dan **bias**. Jika sebuah lapisan memiliki `units = U` dan menerima `input_dim = I`, maka jumlah total parameter pada lapisan tersebut adalah:
> >
> > $$
> >
> > \text{Param} = (I + 1) \times U
> >
> > $$
> >
> > (satu tambahan untuk bias). Pada contoh kode di atas:
> >
> > - Lapisan 1: $(8 + 1) \times 12 = 108$
> > - Lapisan 2: $(12 + 1) \times 8 = 104$
> > - Lapisan 3 (output): $(8 + 1) \times 1 = 9$
> >
> > **Total** = 108 + 104 + 9 = 221 parameter.
> >
> > Keras menyediakan fungsi `model.summary()` yang menampilkan tabel terperinci berisi nama lapisan, output shape, dan jumlah parameter per lapisan, serta total parameter yang dapat diverifikasi dengan perhitungan manual di atas. Memahami cara menghitung parameter penting untuk memperkirakan **kapasitas model** dan **kebutuhan memori** pada GPU/CPU.
> >
> > ```python
> >
> > model.summary()
> >
> > ```
> >
> > ### Praktik Terbaik dalam Implementasi Keras
> >
> > 1. **Reproduksibilitas** – Tetapkan seed untuk NumPy, TensorFlow, dan Python `random` agar hasil pelatihan dapat direproduksi.
> > 2. **Normalisasi Input** – Skala fitur ke rentang [0, 1] atau standar deviasi 1.0; ini mempercepat konvergensi optimizer.
> > 3. **Regularisasi** – Tambahkan `Dropout` atau `kernel_regularizer=l2(0.001)` pada lapisan `Dense` untuk mengurangi overfitting pada dataset kecil.
> > 4. **Pemantauan** – Simpan `history` dan gunakan library seperti Matplotlib atau Seaborn untuk memvisualisasikan loss/accuracy vs epoch.
> > 5. **Penggunaan GPU** – Pastikan TensorFlow terinstal dengan dukungan CUDA; set `tf.config.experimental.set_memory_growth` untuk menghindari alokasi memori penuh pada GPU.
> >
> > Dengan mengikuti langkah‑langkah di atas, mahasiswa dapat membangun, melatih, dan mengevaluasi model feed‑forward yang dapat di‑deploy pada aplikasi nyata, sekaligus memahami cara menghitung dan mengontrol kompleksitas model melalui **parameter accounting**.

> [!cornell] #### Summary
>
> **Feed‑Forward Neural Network** dapat diimplementasikan secara cepat dengan Keras Sequential API, di mana setiap lapisan `Dense` menambah bobot dan bias yang dihitung dengan rumus $(\text{input}+1)\times\text{units}$. Proses **kompilasi** menentukan fungsi loss, optimizer, dan metrik yang memandu pembaruan bobot selama `model.fit`, sementara **epoch**, **batch size**, dan **callback** seperti EarlyStopping mengontrol dinamika pelatihan. Menggunakan `model.summary()` atau perhitungan manual memungkinkan **parameter accounting** yang penting untuk memperkirakan kapasitas model dan kebutuhan memori. Praktik terbaik meliputi penetapan seed, normalisasi data, regularisasi, visualisasi training curve, serta pemanfaatan GPU untuk percepatan komputasi.

> [!ad-libitum]- Additional Information
>
> #### Custom Layers & Weight Initialization
>
> Keras memungkinkan pembuatan **layer kustom** dengan mewarisi kelas `tf.keras.layers.Layer`. Pada level ini, Anda dapat mendefinisikan bobot menggunakan `self.add_weight(shape, initializer='he_normal')`, yang memberi kontrol penuh atas distribusi inisialisasi (mis. He‑Normal untuk ReLU). Contoh sederhana:
>
> ```python
>
> class MyDense(tf.keras.layers.Layer):
>
> def __init__(self, units, **kwargs):
>
> super().__init__(**kwargs)
>
> self.units = units
>
> def build(self, input_shape):
>
> self.w = self.add_weight(shape=(input_shape[-1], self.units),
>
> initializer='he_normal')
>
> self.b = self.add_weight(shape=(self.units,),
>
> initializer='zeros')
>
> def call(self, inputs):
>
> return tf.nn.relu(tf.matmul(inputs, self.w) + self.b)
>
> ```
>
> Layer ini dapat dipasang dalam `Sequential` seperti lapisan standar, memberi fleksibilitas untuk eksperimen arsitektur eksotis (mis. *weight tying* atau *shared layers*).
>
> #### Hyperparameter Tuning dengan Keras‑Tuner
>
> Memilih jumlah neuron, learning rate, atau tipe optimizer secara manual sering kali tidak optimal. **Keras‑Tuner** menyediakan kerangka kerja pencarian hyperparameter berbasis *RandomSearch*, *BayesianOptimization*, atau *Hyperband*. Anda mendefinisikan fungsi model yang menerima objek `hp` untuk mendeklarasikan ruang pencarian:
>
> ```python
>
> def build_model(hp):
>
> model = tf.keras.Sequential()
>
> model.add(tf.keras.layers.Dense(
>
> units=hp.Int('units_1', min_value=8, max_value=64, step=8),
>
> activation='relu',
>
> input_dim=8))
>
> model.add(tf.keras.layers.Dense(
>
> units=hp.Int('units_2', min_value=4, max_value=32, step=4),
>
> activation='relu'))
>
> model.add(tf.keras.layers.Dense(1, activation='sigmoid'))
>
> model.compile(
>
> optimizer=tf.keras.optimizers.Adam(
>
> hp.Float('lr', 1e-4, 1e-2, sampling='log')),
>
> loss='binary_crossentropy',
>
> metrics=['accuracy'])
>
> return model
>
> tuner = kt.Hyperband(build_model,
>
> objective='val_accuracy',
>
> max_epochs=50,
>
> factor=3,
>
> directory='my_dir',
>
> project_name='ffnn_tuning')
>
> tuner.search(X_train, y_train, validation_split=0.2)
>
> ```
>
> Hasil pencarian memberikan kombinasi hyperparameter yang memaksimalkan akurasi validasi, mengurangi kebutuhan trial‑and‑error manual.
>
> #### Model Serialization & Deployment
>
> Setelah model terlatih, **serialisasi** menjadi dua format utama:
>
> 1. **SavedModel** – direktori yang berisi grafik TensorFlow, bobot, dan metadata; kompatibel dengan TensorFlow Serving, TensorFlow.js, dan TensorFlow Lite.
> 2. **HDF5 (`.h5`)** – file tunggal yang menyimpan arsitektur (JSON) dan bobot; mudah dibuka kembali dengan `tf.keras.models.load_model`.
>
> Contoh penyimpanan:
>
> ```python
>
> model.save('my_ffnn_savedmodel')          # SavedModel
>
> model.save('my_ffnn.h5')                  # HDF5
>
> ```
>
> Untuk deployment pada **REST API**, Anda dapat membungkus model SavedModel dengan **TensorFlow Serving** dan mengaksesnya melalui endpoint gRPC atau HTTP. Alternatif ringan untuk perangkat seluler adalah mengkonversi ke **TensorFlow Lite** (`tflite_convert`) dan mengintegrasikannya ke aplikasi Android/iOS.
>
> #### Efisiensi Komputasi: Mixed Precision & Data Pipelines
>
> Pada GPU modern (NVIDIA Volta, Turing, Ampere), penggunaan **mixed‑precision training** (float16 untuk aktivasi & bobot, float32 untuk akumulasi gradien) dapat meningkatkan throughput hingga 2‑3× tanpa mengorbankan akurasi. Aktifkan dengan:
>
> ```python
>
> from tensorflow.keras import mixed_precision
>
> mixed_precision.set_global_policy('mixed_float16')
>
> ```
>
> Selain itu, **tf.data** API memungkinkan pembuatan pipeline data yang paralel, prefetch, dan cache, mengurangi bottleneck I/O selama training:
>
> ```python
>
> ds = tf.data.Dataset.from_tensor_slices((X, y))
>
> ds = ds.shuffle(buffer_size=1024).batch(32).prefetch(tf.data.AUTOTUNE)
>
> model.fit(ds, epochs=100, callbacks=[early_stop])
>
> ```
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Kustom Optimizer** – Buat optimizer berbasis *Nesterov Accelerated Gradient* dengan penyesuaian learning‑rate schedule, lalu bandingkan konvergensi terhadap Adam pada dataset MNIST.
> 2. **Transfer