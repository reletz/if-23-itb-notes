---

type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu k-Nearest Neighbor (kNN)?
> >     
> > - Apa karakteristik utama kNN?
> >     
> > - Bagaimana proses kNN untuk memprediksi data baru?
> >     
> > - Bagaimana kNN menghitung 'Jarak'?
> >     
> > - Apa beda jarak Simbolik vs Numerik?
> >     
> > - Apa itu Euclidean, Manhattan, Minkowski?
> >     
> > - Apa contoh klasifikasi kNN (Play Tennis)?
> >     
> > - Bagaimana Latihan (Hobi) dikerjakan?
> >     
> > - Apa keuntungan kNN?
> >     
> > - Apa kerugian kNN?
> >     
> > - Bagaimana memilih 'k' yang tepat?
> >     
> > - Apa itu 'Curse of Dimensionality'?
> >     
> > - Kenapa 'Feature Scaling' penting?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3170_Materi09_Seg01_AI-kNN.pdf
> >     
> 
> > ### Apa itu k-Nearest Neighbor (kNN)?
> >
> > **k-Nearest Neighbor (kNN)** adalah sebuah algoritma yang termasuk dalam kategori **Supervised Learning** (Pembelajaran Terarah). Ini adalah salah satu algoritma klasifikasi yang paling sederhana namun cukup kuat.
> >
> > ### Karakteristik Utama kNN
> >
> > kNN memiliki beberapa karakteristik unik yang membedakannya:
> >
> > 1. **Instance-Based Classifier**: Ini adalah ciri utamanya. Alih-alih membangun satu "model" atau "hipotesis" umum dari data latih, kNN **menyimpan semua data latih (training data)** secara harfiah di memori.
> >     
> > 2. **Lazy Learner (Pembelajar Malas)**: Disebut "malas" karena ia tidak melakukan proses "belajar" (komputasi) yang intensif saat fase pelatihan. Proses "belajar"-nya hanyalah menyimpan data. Semua pekerjaan berat (komputasi) terjadi nanti, saat ada permintaan untuk memprediksi data baru.
> >     
> > 3. **No Hypothesis (Tanpa Hipotesis)**: Berbeda dengan algoritma lain (seperti Decision Tree), kNN tidak menghasilkan model atau aturan umum (misalnya, "jika `humidity`=high, maka `play`=no").
> >     
> >
> > ### Proses kNN untuk Memprediksi Data Baru
> >
> > Ketika kNN diminta untuk memprediksi kelas dari sebuah data baru (_unseen data_ atau _query_), ia melakukan langkah-langkah berikut:
> >
> > 1. **Mengukur Jarak**: Algoritma akan menghitung "jarak" atau "kesamaan" (similarity) dari data baru tersebut ke **setiap** data yang ada di dalam penyimpanan data latih. Cara menghitung jarak adalah bagian paling krusial dari kNN (dijelaskan di bawah).
> >     
> > 2. **Menemukan k Tetangga Terdekat**: Setelah semua jarak dihitung, algoritma akan mengidentifikasi **'k'** buah data dari data latih yang memiliki jarak paling kecil (paling dekat/mirip). Nilai 'k' ini kita tentukan (misalnya, k=1, k=3, k=5).
> >     
> > 3. **Menentukan Kelas Mayoritas**: Dari 'k' tetangga terdekat yang sudah ditemukan, algoritma akan melihat apa kelas dari masing-masing tetangga tersebut (misal: 2 'Yes', 1 'No').
> >     
> > 4. **Prediksi**: Kelas yang paling banyak muncul (mayoritas) di antara 'k' tetangga tersebut (dalam contoh di atas: 'Yes') akan ditetapkan sebagai **prediksi kelas** untuk data baru.
> >     
> >
> > ### Pengukuran Jarak (Distance Measurement)
> >
> > 1. **Untuk Atribut Simbolik (Kategorikal)**:
> > 	
> > 	* Contoh: `Outlook` (Sunny, Overcast, Rainy), `Hobi` (Game, Baca, Olahraga).
> > 	* Metode: **Hamming Distance**.
> > 	* Cara hitung: Diberi nilai **1** jika nilainya **berbeda**, dan **0** jika nilainya **sama**.
> > 	* *Contoh*: Jarak antara `Outlook=Sunny` dan `Outlook=Rainy` adalah 1. Jarak antara `Outlook=Sunny` dan `Outlook=Sunny` adalah 0.
> >
> > 2. **Untuk Atribut Numerik (Kontinu)**:
> > 	
> > 	* Contoh: `Temperature` (25, 30.5), `Brightness` (20, 40).
> > 	* Metode: Ada beberapa, yang paling umum adalah:
> > 		* **Euclidean Distance (De)**: Ini adalah jarak "garis lurus" yang paling intuitif.
> > 		$$D_e = \sqrt{\sum_{i=1}^{n}(p_i - q_i)^2}$$
> > 			*Contoh (dari PDF hal 9)*: Data baru (Brightness=20, Saturation=35) ke Data 1 (Brightness=40, Saturation=20).
> > 			$$d1 = \sqrt( (20-40)^2 + (35-20)^2 ) = \sqrt( (-20)^2 + (15)^2 ) = \sqrt(400 + 225) = \sqrt(625) = 25$$
> > 		* **Manhattan Distance (Dm)**: Jarak "blok kota" (seperti jalan di kota kotak).
> > 		$$D_m = \sum_{i=1}^{n}|p_i - q_i|$$
> > 		* **Minkowski Distance**: Ini adalah generalisasi dari keduanya. Euclidean adalah Minkowski dengan `p=2`, dan Manhattan adalah Minkowski dengan `p=1`.
> > 
> >
> > ### Contoh Klasifikasi: Data <Sunny, Cool, High, True>
> >
> > Kita memprediksi data baru: <Outlook=Sunny, Temp=Cool, Humidity=High, Windy=True>.
> > 
> > Karena semua atribut bersifat simbolik, kita hitung jarak (Hamming Distance) ke setiap data latih:
> >
> > - **vs Data 1** (<Sunny, Hot, High, False>): `Temp` beda (1), `Windy` beda (1). **Jarak = 2**.
> >     
> > - **vs Data 2** (<Sunny, Hot, High, True>): `Temp` beda (1). **Jarak = 1**.
> >     
> > - **vs Data 6** (<Rainy, Cool, Normal, True>): `Outlook` beda (1), `Humidity` beda (1). **Jarak = 2**.
> >     
> >
> > **Prediksi berdasarkan 'k'**:
> >
> > - **Jika k=1** (Cari 1 tetangga terdekat):
> >     
> >     - Tetangga terdekat adalah `Data 2` (jarak=1). Kelasnya: **No**.
> >         
> >     - **Prediksi: Play = No**.
> >         
> > - **Jika k=3** (Cari 3 tetangga terdekat):
> >     
> >     - Tetangga terdekat adalah `Data 2` (jarak=1), `Data 1` (jarak=2), dan `Data 6` (jarak=2). _Catatan: Ada banyak data lain dengan jarak 2, slide memilih ini sebagai contoh._
> >         
> >     - Kelasnya: {No, No, No}.
> >         
> >     - Mayoritas dari {No, No, No} adalah **No**.
> >         
> >     - **Prediksi: Play = No**.
> >         
> >
> > ### Latihan Simbolik: (Hobi, Umur, Pendidikan)
> >
> >  Kita diminta memprediksi **kelas** untuk data uji: `<hobi=olahraga, umur=dewasa, pendidikan=s1>`
> >
> > **1. Hitung Jarak (Hamming) ke semua data latih:**
> >
> > - vs D1 (Game, remaja, sma): 1 + 1 + 1 = **3**
> >     
> > - vs D2 (Game, dewasa, s1): 1 + 0 + 0 = **1**
> >     
> > - vs D3 (Game, dewasa, diploma): 1 + 0 + 1 = **2**
> >     
> > - vs D4 (Baca, dewasa, s1): 1 + 0 + 0 = **1**
> >     
> > - vs D5 (Olahraga, dewasa-muda, s1): 0 + 1 + 0 = **1**
> >     
> > - vs D6 (Olahraga, dewasa-muda, diploma): 0 + 1 + 1 = **2**
> >     
> > - ...dan seterusnya (mengikuti perhitungan di slide).
> >     
> >
> > **2. Prediksi untuk k=5:**
> >
> > - Kita perlu 5 tetangga terdekat. Mari kita temukan 5 jarak terkecil:
> >     
> >     - Jarak 1: `Data 2` (Kelas 2), `Data 4` (Kelas 3), `Data 5` (Kelas 2)
> >         
> >     - Jarak 2: `Data 3` (Kelas 3), `Data 6` (Kelas 3), `Data 8` (Kelas 1), `Data 10` (Kelas 3), `Data 13` (Kelas 3)
> >         
> > - 5 tetangga terdekat adalah: `Data 2`, `Data 4`, `Data 5` (semua jarak 1), dan kita ambil dua dari yang berjarak 2, misal `Data 3` dan `Data 6`.
> >     
> > - Kumpulan 5 tetangga: {D2, D4, D5, D3, D6}
> >     
> > - Kelas dari 5 tetangga: {Kelas 2, Kelas 3, Kelas 2, Kelas 3, Kelas 3}
> >     
> > - **Voting**: Ada dua 'Kelas 2' dan tiga 'Kelas 3'.
> >     
> > - **Prediksi**: Mayoritas adalah **Kelas 3**.
> >     
> >     
> >  ### Latihan Numerikal
> >  Saat atribut/fitur data bersifat numerik (angka kontinu), kita tidak bisa lagi menggunakan hitungan 0 atau 1 (Hamming Distance). Kita perlu menghitung jarak spasial antar titik data.
> >  Kita memiliki data baru (data uji) yang ingin kita klasifikasikan:
> >  - **Data Uji**: `Brightness=20`, `Saturation=35`
> >  
> > Kita akan menghitung jaraknya ke semua data latih menggunakan **Euclidean Distance**
> > 
> > 1. **Perhitungan Jarak ke Data Latih 1**
> > 	- **Data Latih 1**: `(Brightness=40, Saturation=20)`
> > 	- Kalkulasi $d_1$:
> > 		- $d_1 = \sqrt{(20 - 40)^2 + (35 - 20)^2}$ 
> > 		- $d_1 = \sqrt{(-20)^2 + (15)^2}$
> > 		- $d_1 = \sqrt{400 + 225} = \sqrt{625} = 25$
> > 
> > 2. **Perhitungan Jarak ke Data Latih 2:**
> > 	- **Data Latih 2**: `(Brightness=50, Saturation=50)`
> > 	- Kalkulasi $d_2$:
> > 		- $d_2 = \sqrt{(20 - 50)^2 + (35 - 50)^2}$ 
> > 		- $d_2 = \sqrt{(-30)^2 + (-15)^2}$
> > 		- $d2 = \sqrt{900 + 225} = \sqrt{1125} = 33.54$ 
> > 
> > 3. **Hasil Akhir (Setelah dihitung ke semua data):**
> > 	
> > 	|**Brightness**|**Saturation**|**Class**|**Distance**|
> > 	|---|---|---|---|
> > 	|40|20|Red|25.0|
> > 	|50|50|Blue|33.54|
> > 	|60|90|Blue|68.01|
> > 	|**10**|**25**|**Red**|**10.0**|
> > 	|70|70|Blue|61.03|
> > 	|60|10|Red|47.17|
> > 	|25|80|Blue|45.0|
> >
> >
> > - **Jika `k=1`**:
> > 	- Kita cari 1 jarak terdekat. Jarak terdekat adalah **10.0**.
> > 	- Data tersebut memiliki kelas **'Red'**.
> > 	- **Prediksi: Red**.
> > - **Jika `k=3`**:
> > 	- Kita cari 3 jarak terdekat:
> > 		1. Jarak **10.0** (Kelas Red) 
> > 		2. Jarak **25.0** (Kelas Red) 
> > 		3. Jarak **33.54** (Kelas Blue)
> > 	- **Voting**: {Red, Red, Blue}.
> > 	- Mayoritas adalah **Red**.
> > 	- **Prediksi: Red**.
> >
> > ### Keuntungan kNN
> >
> > - **Aproksimasi bisa lebih tidak kompleks untuk fungsi target yang kompleks**: kNN sangat fleksibel dan dapat menangkap pola data yang rumit (non-linear) tanpa membuat asumsi apa pun tentang bentuk data.
> >     
> >
> > ### Kerugian kNN
> >
> > 1. **Biaya klasifikasi data baru tinggi**: Ini adalah kelemahan terbesar. Karena harus menghitung jarak ke _setiap_ data latih setiap kali ada prediksi baru, ini bisa menjadi sangat lambat jika jumlah data latih sangat besar (jutaan data).
> >     
> > 2. **Mempertimbangkan semua fitur**: kNN secara _default_ memberi bobot yang sama pada semua fitur. Ini menjadi masalah jika fungsi target (kelas) sebenarnya hanya bergantung pada beberapa fitur saja, sementara fitur "sampah" (tidak relevan) ikut memengaruhi perhitungan jarak dan "merusak" hasil prediksi.
> >     
> 

> [!cornell] #### Summary
> 
> **k-Nearest Neighbor (kNN) adalah algoritma supervised learning yang "malas" (lazy learner) dan berbasis instans (instance-based), yang tidak membangun model hipotesis. Sebaliknya, kNN menyimpan semua data latih dan memprediksi data baru dengan cara mencari 'k' tetangga terdekat berdasarkan 'distance metric' (Hamming untuk simbolik, Euclidean/Manhattan untuk numerik), lalu mengambil kelas mayoritas dari tetangga-tetangga tersebut. Metode ini fleksibel, namun memiliki biaya komputasi yang tinggi saat prediksi dan sensitif terhadap fitur yang tidak relevan serta skala data.**

> [!ad-libitum]- #### Additional Information
> #### Catatan Teknis Tambahan (Penting dalam Praktik)
> 
>  - **Memilih Nilai 'k'**:
>      
> 	* **'k' kecil (misal, k=1)**: Akan sangat sensitif terhadap *noise* (data pencilan). Jika satu tetangga terdekat kebetulan adalah data yang anomali, prediksi Anda akan salah.
> 	* **'k' besar (misal, k=20)**: Akan lebih "halus" (smooth) dan lebih tahan terhadap noise, tetapi bisa jadi "kabur" dan mengabaikan pola-pola lokal yang penting dalam data.
> 	* **Praktek Umum**: Biasanya 'k' dipilih sebagai angka ganjil (k=3, 5, 7) untuk menghindari hasil seri/imbang saat voting. Nilai 'k' terbaik dicari menggunakan *cross-validation*.
> 
>  - **Kutukan Dimensi (Curse of Dimensionality)**:
> 
> 	* Ini terkait dengan kerugian No. 2. Ketika jumlah fitur (dimensi) sangat tinggi (misal, ribuan fitur), konsep "jarak" menjadi tidak bermakna karena semua titik menjadi "jauh" satu sama lain. Performa kNN akan menurun drastis.
> 
>  - **Pentingnya Penskalaan Fitur (Feature Scaling)**:
>     
> 
>    * Ini **WAJIB** dilakukan jika kita menggunakan data numerik dengan skala berbeda (misal, fitur 'Gaji' [jutaan] dan 'Umur' [puluhan]).
>    * Jika tidak di-scaling, fitur 'Gaji' akan mendominasi perhitungan jarak Euclidean, dan fitur 'Umur' praktis akan diabaikan.
>    * Solusi: Lakukan normalisasi (misal, ubah semua skala fitur ke [0, 1]) sebelum menjalankan kNN.