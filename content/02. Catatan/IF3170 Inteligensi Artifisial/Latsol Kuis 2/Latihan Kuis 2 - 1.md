---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set: Supervised Learning - 1 (kNN, DTL, & Metrics)

Level: Menengah-Lanjutan

Estimasi Waktu: 60 - 75 menit

Tujuan Pembelajaran:

1. Mampu menjelaskan karakteristik fundamental dari algoritma k-NN dan Decision Tree.
    
2. Mampu menganalisis isu-isu kritis dalam Decision Tree Learning (DTL), seperti _overfitting_ dan bias Information Gain.
    
3. Mampu menerapkan dan menginterpretasikan metrik evaluasi klasifikasi (Precision, Recall, F1-Score) dalam konteks bisnis/nyata.
    
4. Mampu membandingkan dan menjustifikasi strategi pra-pemodelan (seperti _Feature Scaling_ dan _Pruning_).
    

## Bagian A: Soal Dasar (4 soal)

### Tipe Soal: True/False

|**No.**|**Pernyataan (Benar/Salah)**|**Jawaban (True/False)**|
|---|---|---|
|**A.1**|k-Nearest Neighbor (kNN) dikategorikan sebagai _Eager Learner_ karena ia menghabiskan sebagian besar waktu komputasi untuk membangun model hipotesis yang eksplisit selama fase pelatihan (_training_).||
|**A.2**|Atribut `StudentID` seringkali menghasilkan _Information Gain_ yang sangat tinggi dan oleh karena itu, merupakan kandidat yang sangat baik untuk menjadi _root node_ pertama dalam _Decision Tree_, karena menunjukkan kemampuan prediksi yang kuat.||

### Tipe Soal: Definisi Singkat

#### Soal 3 (Definisi: Confusion Matrix)

Dalam konteks Klasifikasi Biner, definisikan secara jelas apa yang dimaksud dengan False Negative (FN). Berikan satu contoh situasi di dunia nyata (selain deteksi penyakit) di mana terjadinya FN memiliki konsekuensi biaya kerugian yang sangat tinggi (misal: finansial, operasional, atau keamanan).

#### Soal 4 (Konsep: Entropy)

Jelaskan arti dari dua nilai ekstrem Entropy dalam Decision Tree Learning (DTL):

a. $\text{Entropy}(S) = 0$.

b. $\text{Entropy}(S) = 1$ (untuk kasus klasifikasi biner).

## Bagian B: Soal Menengah (3 soal)

### Tipe Soal: Multiple Choice Multiple Answer (MCMA) dan Aplikasi Hitungan

#### Soal 5 (MCMA: kNN)

Pilih dua pernyataan yang merupakan kelemahan kritis dari algoritma k-Nearest Neighbor (kNN) dan yang memerlukan langkah-langkah pre-processing khusus untuk diatasi. (Pilih 2 Jawaban)

A. kNN menghasilkan hipotesis yang terlalu sederhana (underfitting) untuk dataset non-linear.
B. Biaya komputasi untuk prediksi data baru (testing) menjadi sangat tinggi pada dataset yang besar.
C. Rentan terhadap Curse of Dimensionality, di mana konsep jarak menjadi tidak bermakna pada fitur yang sangat banyak.
D. Secara bawaan (default), kNN memperlakukan fitur numerik dengan skala besar (misal: gaji) dan skala kecil (misal: umur) secara adil.

#### Soal 6 (MCMA: DTL Issues)

Algoritma Decision Tree Learning (DTL) sangat rentan terhadap overfitting, terutama ketika pohon tumbuh terlalu dalam dan pure node dicapai dengan hanya sedikit contoh data. Dari pasangan solusi berikut, manakah dua pasangan yang benar-benar merupakan strategi pruning yang valid untuk mengatasi overfitting? (Pilih 2 Jawaban)

A. Pre-Pruning dan Reduced Error Pruning
B. Information Gain dan Gain Ratio
C. Split Information dan Cost-Sensitive Learning
D. Post-Pruning dan Rule Post-Pruning (seperti pada C4.5)

#### Soal 7 (Aplikasi: Prediction Measurement)

Sebuah model klasifikasi dikembangkan untuk memprediksi apakah seorang pelanggan akan churn (berhenti berlangganan). Kelas Positif adalah 'Churn'. Setelah pengujian pada 1.000 data:

- True Positive ($\text{TP}$) = 80
- True Negative ($\text{TN}$) = 880
- False Positive ($\text{FP}$) = 20
- False Negative ($\text{FN}$) = 20
    

a. Hitung Precision model tersebut (dalam bentuk desimal, 2 angka di belakang koma).
b. Hitung Recall model tersebut (dalam bentuk desimal, 2 angka di belakang koma).
c. Jika tujuan bisnis utama perusahaan adalah memastikan tidak ada pelanggan yang churn tanpa terdeteksi (meminimalkan kerugian), manakah dari dua metrik (Precision atau Recall) yang harus diutamakan dan mengapa?

## Bagian C: Soal Lanjutan (3 soal)

### Tipe Soal: Esai Analisis dan Sintesis

#### Soal 8 (Analisis Konsep: kNN vs DTL)

Jelaskan perbedaan mendasar antara algoritma k-Nearest Neighbor (kNN) dan Decision Tree Learning (DTL) dari perspektif "Proses Belajar (Learning Process)". Sertakan istilah kunci Lazy Learner dan Explicit Model dalam penjelasan Anda.

#### Soal 9 (Sintesis: Feature Scaling)

Mengapa Feature Scaling (Normalisasi/Standardisasi) merupakan langkah pre-processing yang wajib dilakukan pada algoritma kNN, tetapi tidak krusial (bahkan opsional) pada algoritma Decision Tree Learning (DTL)? Fokuskan penjelasan Anda pada bagaimana perbedaan mekanisme perhitungan jarak/split antara kedua algoritma tersebut dipengaruhi oleh skala fitur.

#### Soal 10 (Analisis DTL: Atribut Kontinu)

Algoritma ID3 dasar dirancang untuk atribut kategorikal. Jelaskan bagaimana DTL (seperti C4.5) menangani atribut bernilai kontinu (misal: Temperatur=$35.7^\circ \text{C}$) saat mencari atribut terbaik untuk split di suatu node. Uraikan secara singkat langkah-langkah kuncinya untuk menemukan threshold $c$ terbaik.



> [!ad-libitum]- ## Kunci Jawaban
> 
> ### Bagian A: Soal Dasar
> 
> |**No.**|**Pernyataan (Benar/Salah)**|**Jawaban**|
> |---|---|---|
> |**A.1**|k-Nearest Neighbor (kNN) dikategorikan sebagai _Eager Learner_ karena ia menghabiskan sebagian besar waktu komputasi untuk membangun model hipotesis yang eksplisit selama fase pelatihan (_training_).|**False**|
> |**A.2**|Atribut `StudentID` seringkali menghasilkan _Information Gain_ yang sangat tinggi dan oleh karena itu, merupakan kandidat yang sangat baik untuk menjadi _root node_ pertama dalam _Decision Tree_, karena menunjukkan kemampuan prediksi yang kuat.|**False**|
> 
> Soal 3 (Definisi: Confusion Matrix)
> 
> Jawaban:
> 
> False Negative (FN) adalah kondisi di mana Realitas adalah Positif, tetapi Prediksi Model adalah Negatif.
> 
> Contoh Konsekuensi FN Tinggi:
> 
> - **Sistem Deteksi Retak (Cacat) Produk Pabrik:** Jika produk _sebenarnya_ cacat (Positif), tetapi sistem memprediksi 'tidak cacat' (Negatif), maka produk cacat tersebut akan lolos dan dijual ke pasar, menyebabkan _recall product_ besar-besaran, hilangnya kepercayaan merek, dan tuntutan hukum. (Biaya reputasi dan finansial sangat tinggi).
>     
> 
> Soal 4 (Konsep: Entropy)
> 
> Jawaban:
> 
> a. $\text{Entropy}(S) = 0$: Mengindikasikan set data ($S$) berada dalam kondisi murni (pure). Semua contoh di dalam set tersebut memiliki kelas target yang sama. Tidak ada ketidakpastian.
> 
> b. $\text{Entropy}(S) = 1$: Mengindikasikan set data ($S$) berada dalam kondisi impure maksimal. Kelas target di dalam set tersebut terbagi rata (misal, 50% Positif dan 50% Negatif), menghasilkan ketidakpastian tertinggi, seperti melempar koin.
> 
> ### Bagian B: Soal Menengah
> 
> Soal 5 (MCMA: kNN)
> 
> Jawaban: B dan C
> 
> Rasional:
> 
> - **A** salah: kNN bisa memodelkan batas keputusan non-linear yang kompleks.
>     
> - **B** benar: Sebagai _Lazy Learner_, kNN harus menghitung jarak ke _setiap_ data latih saat prediksi, membuat biaya klasifikasi (testing) sangat tinggi pada dataset besar.
>     
> - **C** benar: Dengan dimensi tinggi, semua titik menjadi "jauh", membuat konsep kedekatan (jarak) menjadi tidak efektif, sehingga performa kNN menurun drastis.
>     
> - **D** salah: kNN sensitif terhadap skala fitur, sehingga fitur dengan skala besar (misal: Gaji) akan mendominasi perhitungan jarak.
>     
> 
> Soal 6 (MCMA: DTL Issues)
> 
> Jawaban: A dan D
> 
> Rasional:
> 
> - **A** benar: _Pre-Pruning_ (menghentikan pertumbuhan awal) dan _Reduced Error Pruning_ (post-pruning berbasis _validation set_) adalah strategi utama _pruning_.
>     
> - **B** salah: _Information Gain_ dan _Gain Ratio_ adalah metrik **pemilihan atribut**, bukan mekanisme _pruning_.
>     
> - **C** salah: _Split Information_ adalah bagian dari _Gain Ratio_; _Cost-Sensitive Learning_ mengatasi biaya perolehan atribut.
>     
> - **D** benar: _Post-Pruning_ adalah pendekatan umum, dan _Rule Post-Pruning_ (mengubah pohon menjadi aturan lalu memangkasnya) adalah implementasi spesifik dan sukses di C4.5.
>     
> 
> Soal 7 (Aplikasi: Prediction Measurement)
> 
> Jawaban:
> 
> a. Precision:
> 
> $$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}} = \frac{80}{80 + 20} = \frac{80}{100} = 0.80$$
> 
> b. **Recall:**
> 
> $$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} = \frac{80}{80 + 20} = \frac{80}{100} = 0.80$$
> 
> c. Metrik yang Diutamakan:
> 
> Tujuan: "memastikan tidak ada pelanggan yang churn tanpa terdeteksi" $\rightarrow$ Meminimalkan False Negative (FN).
> 
> Metrik yang fokus pada minimasi FN adalah Recall. Recall mengukur kemampuan model untuk menemukan semua kasus positif yang sebenarnya. Recall tinggi berarti sebagian besar pelanggan yang churn berhasil ditangkap oleh model, sehingga tim dapat segera mengambil tindakan pencegahan (prescriptive action).
> 
> ### Bagian C: Soal Lanjutan
> 
> Soal 8 (Analisis Konsep: kNN vs DTL)
> 
> Jawaban:
> 
> | Aspek | k-Nearest Neighbor (kNN) | Decision Tree Learning (DTL) |
> | :---: | :---: | :---: |
> | Proses Belajar | Lazy Learner. Tidak ada komputasi yang signifikan. Model hanya menyimpan seluruh data latih dan menunda semua komputasi hingga fase prediksi (testing) terjadi. | Eager Learner. Model melakukan komputasi intensif (greedy search Information Gain) selama training untuk menghasilkan pohon/struktur. |
> | Hasil Hipotesis | Instance-Based / Tanpa Explicit Model. Modelnya adalah representasi data latih itu sendiri. Prediksi didasarkan pada mayoritas tetangga terdekat, bukan pada aturan formal. | Explicit Model (Pohon Keputusan). Menghasilkan sebuah struktur (pohon) yang dapat diubah menjadi serangkaian aturan IF-THEN yang jelas dan mudah diinterpretasi. |
> 
> Soal 9 (Sintesis: Feature Scaling)
> 
> Jawaban:
> 
> Feature Scaling wajib untuk kNN karena kNN sepenuhnya bergantung pada perhitungan jarak spasial (misal: Euclidean Distance). Formula jarak menghitung kuadrat selisih antar fitur. Jika fitur Gaji (rentang $10^6$) tidak di-scaling, selisih kuadratnya akan mendominasi hasil jarak secara keseluruhan, membuat pengaruh fitur Umur (rentang $10^1$) menjadi hampir nol, seolah-olah fitur Umur diabaikan. Scaling menyamakan kontribusi semua fitur pada perhitungan jarak.
> 
> **Feature Scaling tidak krusial untuk DTL** karena Decision Tree menggunakan **Entropy/Information Gain** untuk memecah data. DTL mencari _titik potong_ (threshold) terbaik pada satu fitur pada satu waktu, terlepas dari nilai atau skala fitur lainnya. Misalnya, DTL akan mencari apakah `Gaji < 5 Juta` adalah _split_ terbaik, dan itu tidak dipengaruhi oleh nilai fitur `Umur`.
> 
> Soal 10 (Analisis DTL: Atribut Kontinu)
> 
> Jawaban:
> 
> DTL menangani atribut kontinu (seperti $A$) dengan mengubahnya menjadi atribut biner diskrit berdasarkan sebuah threshold $c$. Prosesnya disebut Discretization.
> 
> **Langkah-langkah Kunci:**
> 
> 1. **Pengurutan Nilai:** Semua nilai atribut kontinu $A$ diurutkan.
>     
> 2. **Identifikasi Kandidat** _**Threshold**_**:** _Threshold_ kandidat $c$ diidentifikasi di tengah-tengah dua nilai yang berdekatan yang memiliki **kelas target yang berbeda**.
>     
> 3. **Evaluasi** _**Gain**_**:** Untuk setiap kandidat _threshold_ $c$, atribut kontinu $A$ diperlakukan sebagai atribut biner (A $\le c$ vs. A $> c$). Information Gain dihitung untuk setiap _threshold_ kandidat.
>     
> 4. **Pemilihan** _**Threshold**_ **Terbaik:** _Threshold_ $c$ yang memberikan **Information Gain tertinggi** dipilih. Gain maksimal ini kemudian dibandingkan dengan Gain dari atribut-atribut kategorikal lain untuk menentukan _split_ terbaik.
> 
> Contoh kalau belum kebayang:
> #### **Contoh Diskretisasi Atribut Kontinu: Suhu**
> Misalkan kita memiliki 6 data latih dengan atribut **Suhu** (kontinu) dan target biner **Play** (Ya/No).
> 
> |**No.**|**Suhu (∘C)**|**Play (Target)**|
> |---|---|---|
> |1|22|**Ya**|
> |2|26|**Ya**|
> |3|29|**No**|
> |4|33|**Ya**|
> |5|37|**No**|
> |6|40|**No**|
> 
> ---
> #### **Langkah 1: Pengurutan Nilai**
> 
> Data sudah diurutkan berdasarkan Suhu: $22, 26, 29, 33, 37, 40$.
> 
> #### **Langkah 2: Identifikasi Kandidat _Threshold_ ($c$ Terbaik)**
> 
> Kita hanya mencari _threshold_ di antara pasangan data yang memiliki **kelas target berbeda**.
> 
> |**Pasangan Data**|**Kelas Target**|**Nilai Tengah (Kandidat c)**|
> |---|---|---|
> |Data 1 (22, Ya) & Data 2 (26, Ya)|Kelas **Sama**|_Diabaikan_|
> |Data 2 (26, Ya) & Data 3 (29, No)|Kelas **Berbeda** (Ya $\to$ No)|$c_1 = (26 + 29) / 2 = \mathbf{27.5}$|
> |Data 3 (29, No) & Data 4 (33, Ya)|Kelas **Berbeda** (No $\to$ Ya)|$c_2 = (29 + 33) / 2 = \mathbf{31.0}$|
> |Data 4 (33, Ya) & Data 5 (37, No)|Kelas **Berbeda** (Ya $\to$ No)|$c_3 = (33 + 37) / 2 = \mathbf{35.0}$|
> |Data 5 (37, No) & Data 6 (40, No)|Kelas **Sama**|_Diabaikan_|
> 
> Kita punya tiga kandidat _threshold_ yang harus diuji: **27.5, 31.0, dan 35.0**.
> 
> #### **Langkah 3: Evaluasi _Information Gain_ untuk Setiap Kandidat**
> 
> Pertama, hitung **Entropy Awal (Parent $S$)**:
> - Total Data (S): 6 data
> - Kelas: [3 Ya, 3 No].
> - $P(\text{Ya}) = 3/6 = 0.5$; $P(\text{No}) = 3/6 = 0.5$.
> - $\text{Entropy}(S) = - (0.5 \log_2 0.5) - (0.5 \log_2 0.5) = 1.0$ (Impure Maksimal).
> 
> Sekarang, kita hitung _Gain_ untuk setiap kandidat
> ##### **A. Uji $c_1 = 27.5 \implies$ Tes: $\text{Suhu} < 27.5$**
> 
> | Cabang | Data | Kelas [Ya, No] | Entropy Cabang | Bobot ($\|S_v\|/\|S\|$ ) |
> | :---: | :---: | :---: | :---: | :---: |
> | $\text{Suhu} < 27.5$ | (22, 26) | [2 Ya, 0 No] | 0.0 (Pure) | 2/6 |
> | $\text{Suhu} \ge 27.5$ | (29, 33, 37, 40) | [1 Ya, 3 No] | $-(1/4 \log_2 1/4) - (3/4 \log_2 3/4) = 0.81$ | 4/6 |
> | Gain | | | $\mathbf{1.0} - [(2/6 \times 0.0) + (4/6 \times 0.81)] \approx \mathbf{0.46}$ | |
> 
> #### **B. Uji $c_2 = 31.0 \implies$ Tes: $\text{Suhu} < 31.0$**
> 
> | Cabang | Data | Kelas [Ya, No] | Entropy Cabang | Bobot ($\|S_v\|/\|S\|$ )|
> | :---: | :---: | :---: | :---: | :---: |
> | $\text{Suhu} < 31.0$ | (22, 26, 29) | [2 Ya, 1 No] | $-(2/3 \log_2 2/3) - (1/3 \log_2 1/3) \approx 0.92$ | 3/6 |
> | $\text{Suhu} \ge 31.0$ | (33, 37, 40) | [1 Ya, 2 No] | $-(1/3 \log_2 1/3) - (2/3 \log_2 2/3) \approx 0.92$ | 3/6 |
> | Gain | | | $\mathbf{1.0} - [(3/6 \times 0.92) + (3/6 \times 0.92)] \approx \mathbf{0.08}$ | |
> 
> #### **C. Uji $c_3 = 35.0 \implies$ Tes: $\text{Suhu} < 35.0$**
> 
> | Cabang | Data | Kelas [Ya, No] | Entropy Cabang | Bobot ($\|S_v\|/\|S\|$ ) | 
> | :---: | :---: | :---: | :---: | :---: |
> | $\text{Suhu} < 35.0$ | (22, 26, 29, 33) | [3 Ya, 1 No] | $-(3/4 \log_2 3/4) - (1/4 \log_2 1/4) \approx 0.81$ | 4/6 |
> | $\text{Suhu} \ge 35.0$ | (37, 40) | [0 Ya, 2 No] | 0.0 (Pure) | 2/6 |
> | Gain | | | $\mathbf{1.0} - [(4/6 \times 0.81) + (2/6 \times 0.0)] \approx \mathbf{0.46}$ | |
> 
> ### **Langkah 4: Pemilihan _Threshold_ Terbaik**
> 
> Bandingkan semua _Gain_ yang dihitung:
> 
> - $\text{Gain}(\text{Suhu} \le 27.5) \approx \mathbf{0.46}$
>     
> - $\text{Gain}(\text{Suhu} \le 31.0) \approx 0.08$
>     
> - $\text{Gain}(\text{Suhu} \le 35.0) \approx \mathbf{0.46}$
>     
> 
> _Threshold_ **$c=27.5$** dan **$c=35.0$** sama-sama memberikan _Gain_ tertinggi (0.46). Algoritma akan memilih salah satunya (misal: $c=27.5$).
> 
> **Kesimpulan:** Atribut **Suhu** akan diwakili oleh pertanyaan biner: **"Apakah Suhu $\le 27.5$?"** yang memiliki Information Gain $\approx 0.46$. Nilai 0.46 ini kemudian dibandingkan dengan _Gain_ dari atribut-atribut lain (misal: _Outlook_, _Windy_, jika ada) untuk menentukan _node_ terbaik.


> ## Tips untuk Yang Sedang Mengerjakan
> 
> 1. **Fokus pada Kata Kunci:** Saat menjawab soal DTL dan kNN, pastikan menyertakan istilah teknis seperti _Lazy Learner_, _Instance-Based_, _Greedy Search_, _Entropy_, _Information Gain_, dan _Overfitting_ untuk menunjukkan pemahaman yang mendalam.
>    
> 2. **Visualisasikan Metrik:** Untuk Soal 7, bayangkan skenario _Confusion Matrix_ di pikiran Anda. Ketahui bahwa **Recall** adalah fokus vertikal (Kolom 'Realitas Positif') dan **Precision** adalah fokus horizontal (Baris 'Prediksi Positif').
>    
> 3. **Justifikasi Konsekuensi:** Dalam soal esai, jangan hanya menyatakan 'ya' atau 'tidak'. Selalu jelaskan **mengapa** - bagaimana mekanisme internal algoritma (perhitungan jarak, atau perhitungan Gain) dipengaruhi oleh faktor-faktor luar (skala, jumlah nilai unik, _noise_).