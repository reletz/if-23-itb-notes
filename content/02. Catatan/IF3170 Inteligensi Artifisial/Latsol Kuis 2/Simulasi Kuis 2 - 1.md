_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set Ujian: Algoritma Klasifikasi dan Evaluasi

Mata Pelajaran: IF3170 Intelegensi Artifisial

Estimasi Waktu: 120 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Membedakan secara konseptual dan praktis antara algoritma _lazy learner_ (kNN) dan _eager learner_ (DTL).
    
2. Menerapkan perhitungan jarak _mixed-attribute_ (numerik dan kategorikal) untuk kNN dan menganalisis dampaknya.
    
3. Membuat dan menginterpretasikan _Confusion Matrix_ secara mendalam untuk menghitung dan menganalisis metrik (Akurasi, Presisi, Recall, F1-Score).
    
4. Menganalisis dan menerapkan berbagai teknik dalam _DTL Issues_, termasuk penanganan data kontinu, _missing values_, _Gain Ratio_, dan _Attribute Cost_.
    
5. Mensintesis pemahaman tentang _Overfitting_ dan strategi mitigasinya (_Pruning_).
    
6. Membangun sebuah _Decision Tree_ (pohon keputusan) parsial berdasarkan metrik Information Gain dan menangani kondisi _stopping condition_ (node murni atau pluralitas).
    

## Petunjuk Umum

- Jawaban yang tidak disertai justifikasi atau langkah perhitungan (jika diminta) tidak akan mendapat poin penuh.
    
- Semua soal disajikan terlebih dahulu. Kunci Jawaban dan Rubrik Penilaian terdapat di bagian akhir dokumen.
    
- Gunakan $log_2(0.1) = -3.32$, $log_2(0.2) = -2.32$, $log_2(0.3) = -1.74$, $log_2(0.4) = -1.32$, $log_2(0.5) = -1$, $log_2(0.6) = -0.74$, $log_2(0.7) = -0.51$, $log_2(0.8) = -0.32$, $log_2(0.9) = -0.15$.
    

## BAGIAN I: Konsep Fundamental (20 poin)

**Fokus:** Recall & Comprehension - Menguji pemahaman konsep dan perbedaannya.

### Soal 1-10. Klasifikasi Konsep (Format Matrix) (10 poin, @1 poin)

Pasangkan deskripsi di kolom "Isi Soal" dengan konsep yang paling tepat. Pilih **satu** jawaban per baris.


|**No**|**Isi Soal**|**A. kNN**|**B. DTL (ID3)**|**C. DTL Issues**|**D. Precision**|**E. Recall**|**F. Accuracy**|**G. Entropy**|**H. Gain Ratio**|
|---|---|---|---|---|---|---|---|---|---|
|1|Sebuah algoritma _lazy learner_ yang melakukan komputasi utama saat prediksi.|||||||||
|2|Ukuran _impurity_ atau ketidakpastian dalam satu set data.|||||||||
|3|Metrik yang sangat penting ketika biaya _False Negative_ (FN) tinggi (misal: deteksi kanker).|||||||||
|4|Sebuah algoritma _eager learner_ yang membangun model secara top-down dan greedy.|||||||||
|5|Metrik yang digunakan untuk memilih atribut, yang menormalisasi InfoGain dengan SplitInfo.|||||||||
|6|Metrik yang sangat penting ketika biaya _False Positive_ (FP) tinggi (misal: filter spam).|||||||||
|7|Konsep yang mencakup _Overfitting_, _Pruning_, dan penanganan _Missing Values_.|||||||||
|8|Metrik $(TP + TN) / Total$, yang bisa menyesatkan pada data tidak seimbang.|||||||||
|9|Performa algoritma ini sangat sensitif terhadap _feature scaling_ (penskalaan fitur).|||||||||
|10|Menggunakan Information Gain untuk memilih atribut terbaik secara rekursif.|||||||||

### Soal 11-20. Analisis Konsep (Format Benar/Salah) (10 poin, @1 poin)

Tentukan apakah pernyataan berikut **Benar** atau **Salah**.

|**No**|**Pernyataan**|**Benar**|**Salah**|
|---|---|---|---|
|11|_Reduced Error Pruning_ adalah teknik _pre-pruning_ yang menghentikan pohon tumbuh lebih awal.|||
|12|_Overfitting_ terjadi ketika model memiliki akurasi tinggi pada data latih namun akurasi rendah pada data uji.|||
|13|_Information Gain_ memiliki bias lebih menyukai atribut dengan kardinalitas tinggi (banyak nilai unik).|||
|14|F1-Score adalah rata-rata aritmatika dari Presisi dan Recall.|||
|15|Dalam _Rule Post-Pruning_, pohon keputusan pertama-tama dikonversi menjadi satu set aturan IF-THEN.|||
|16|Untuk atribut kontinu, DTL mengevaluasi _setiap_ nilai sebagai _split point_ potensial.|||
|17|Jika _Cost(A) = 100_ dan _Cost(B) = 1_, DTL standar (ID3) akan lebih memilih B daripada A.|||
|18|Sebuah _leaf node_ (daun) dalam DTL selalu merepresentasikan node yang 100% murni (pure).|||
|19|_Curse of Dimensionality_ adalah masalah serius untuk DTL, tetapi tidak terlalu berdampak pada kNN.|||
|20|Jika dataset memiliki 50% 'Ya' dan 50% 'Tidak', Akurasi adalah metrik evaluasi yang sudah cukup baik.|||

## BAGIAN II: Studi Kasus 1 - kNN & Performance Metrics (40 poin)

**Fokus:** Application & Analysis - Perhitungan kNN dengan data campuran dan evaluasi model.

### Skenario A: Prediksi kNN (Soal 21-25)

Anda ingin memprediksi apakah user akan `Beli Premium` (Ya/Tidak) berdasarkan data berikut.

|**ID**|**Jam Nonton (X1)**|**Tipe Akun (X2)**|**Beli Premium (Y)**|
|---|---|---|---|
|D1|10|Gratis|Tidak|
|D2|50|Gratis|Ya|
|D3|20|Pelajar|Tidak|
|D4|40|Pelajar|Ya|
|D5|60|Keluarga|Ya|
|D6|15|Gratis|Tidak|

**Data Baru (Query):** $Q$ = (Jam Nonton = 25, Tipe Akun = 'Gratis')

Anda **diwajibkan** menggunakan pendekatan berikut untuk jarak:

1. **Normalisasi Min-Max** untuk fitur numerik (Jam Nonton) ke rentang [0, 1].
    
2. **Hamming Distance** (0 jika sama, 1 jika beda) untuk fitur kategorikal (Tipe Akun).
    
3. **Jarak Gabungan (Mixed Distance):** $Distance(Q, D) = \sqrt{ (X1_{norm\_Q} - X1_{norm\_D})^2 + (Hamming(X2_Q, X2_D)) }$  
    

- **21. (5 poin) Normalisasi Data:** Lakukan Normalisasi Min-Max untuk fitur `Jam Nonton (X1)` dari D1-D6 dan data Query $Q$. (Min=10, Max=60). Tampilkan hasil normalisasinya.
    
- **22. (12 poin) Perhitungan Jarak:** Hitung Jarak Gabungan (Mixed Distance) dari Query $Q$ (yang sudah dinormalisasi) ke setiap 6 data latih (D1-D6).
    
- **23. (3 poin) Prediksi (k=1):** Apa prediksi kelas (Ya/Tidak) untuk $Q$ jika $k=1$?
    
- **24. (3 poin) Prediksi (k=3):** Apa prediksi kelas (Ya/Tidak) untuk $Q$ jika $k=3$?
    
- **25. (3 poin) Prediksi (k=5):** Apa prediksi kelas (Ya/Tidak) untuk $Q$ jika $k=5$?
    

### Skenario B: Evaluasi Performa (Soal 26-30)

Sebuah model klasifikasi (bisa jadi kNN) telah diuji pada 100 data uji baru.

- Kenyataannya, terdapat **30** kasus 'Ya' (Positif) dan **70** kasus 'Tidak' (Negatif).
    
- Model memprediksi **40** kasus sebagai 'Ya'.
    
- Dari 40 prediksi 'Ya' tersebut, **25** di antaranya adalah prediksi yang benar.
    
- **26. (4 poin) Confusion Matrix:** Berdasarkan informasi di atas, lengkapi _Confusion Matrix_ (TP, FP, FN, TN).
    
- **27. (2 poin) Akurasi:** Hitung Akurasi model.
    
- **28. (2 poin) Presisi:** Hitung Presisi model (untuk kelas 'Ya').
    
- **29. (2 poin) Recall:** Hitung Recall model (untuk kelas 'Ya').
    
- **30. (4 poin) Skenario Analisis:** (a) Untuk skenario **Filter Spam**, metrik mana (Presisi atau Recall) yang lebih penting? (b) Untuk skenario **Deteksi Penipuan (Fraud)**, metrik mana yang lebih penting? Berikan justifikasi singkat untuk keduanya.
    

## BAGIAN III: Studi Kasus 2 - DTL & DTL Issues (40 poin)

**Fokus:** Synthesis & Evaluation - Menerapkan ID3 dengan isu data riil.

### Skenario: Prediksi Lolos Kredit

Anda akan membangun Decision Tree untuk memprediksi Lolos_Kredit (Ya/Tidak) menggunakan dataset berikut yang memiliki missing values ('?').

Set Data Latih (S): Total 10 data. [4 Ya, 6 Tidak]. $E(S) = 0.971$

|**ID**|**Pendapatan (juta)**|**Status_Rumah**|**Riwayat_Kredit**|**Lolos_Kredit**|
|---|---|---|---|---|
|D1|30|Sewa|Baik|Ya|
|D2|80|Milik|Baik|Ya|
|D3|40|Sewa|Buruk|Tidak|
|D4|70|Milik|Cukup|Ya|
|D5|35|Sewa|Cukup|Tidak|
|D6|50|Sewa|Baik|Ya|
|D7|60|?|Cukup|Tidak|
|D8|45|Milik|Buruk|Tidak|
|D9|90|Milik|?|Ya|
|D10|40|Sewa|?|Tidak|

- **31. (6 poin) Atribut Kontinu (Pendapatan):** Algoritma DTL menemukan dua _split point_ kandidat terbaik untuk `Pendapatan`:
    
    - Kandidat A: `Pendapatan <= 47.5`
        
        - Subset <= 47.5: 5 data [1 Ya, 4 Tidak] $\rightarrow E = 0.722$  
            
        - Subset > 47.5: 5 data [3 Ya, 2 Tidak] $\rightarrow E = 0.971$  
            
    - Kandidat B: `Pendapatan <= 65.0`
        
        - Subset <= 65.0: 7 data [2 Ya, 5 Tidak] $\rightarrow E = 0.863$  
            
        - Subset > 65.0: 3 data [2 Ya, 1 Tidak] $\rightarrow E = 0.918$
            
	Hitung Information Gain untuk kedua kandidat (A dan B). Kandidat mana yang akan dipilih untuk Pendapatan?
            
- **32. (8 poin) Gain Ratio (Riwayat_Kredit):** Anda akan mengevaluasi atribut `Riwayat_Kredit`.
    
    - _PENTING_: Perlakukan _missing value_ ('?') sebagai kategori keempat yang terpisah.
        
    - Subset 'Baik': 3 data [2 Ya, 1 Tdk] $\rightarrow E = 0.918$  
        
    - Subset 'Buruk': 2 data [0 Ya, 2 Tdk] $\rightarrow E = 0$ (Murni)
        
    - Subset 'Cukup': 3 data [1 Ya, 2 Tdk] $\rightarrow E = 0.918$  
        
    - Subset '?': 2 data [1 Ya, 1 Tdk] $\rightarrow E = 1.0$
        
	(a) Hitung Information Gain(S, Riwayat_Kredit).
	
	(b) Hitung SplitInformation(S, Riwayat_Kredit).
	
	(c) Hitung GainRatio(S, Riwayat_Kredit).
	
- **33. (4 poin) Attribute Cost:** Misalkan Anda mendapatkan hasil Gain berikut:
    
    - `Gain(Pendapatan@47.5) = 0.1245` (Biaya Tes: 1 poin, karena data internal)
        
    - `Gain(Riwayat_Kredit) = 0.2202` (Biaya Tes: 5 poin, karena cek ke BI)
        
    - `Gain(Status_Rumah) = 0.1500` (Biaya Tes: 1 poin, karena data internal)
        
	Jika menggunakan metrik seleksi Gain^2 / Cost, atribut mana yang akan dipilih sebagai root node? Tunjukkan perhitungan skor untuk ketiganya.
        
- **34. (3 poin) Overfitting & Pruning:** Apa yang dimaksud dengan _Overfitting_? Jelaskan secara singkat strategi _Reduced Error Pruning_ untuk mengatasinya.
    
- **35. (3 poin) Penanganan Missing Value:** Selain memperlakukan '?' sebagai nilai baru, sebutkan dua strategi lain untuk menangani _missing values_ saat _training_ atau _testing_.
    

### Soal 36-40: Membangun Pohon Keputusan

Berdasarkan perhitungan di soal sebelumnya (Soal 31-33), `Gain(Riwayat_Kredit) = 0.2202` adalah yang tertinggi (sebelum mempertimbangkan biaya atau rasio). Mari kita gunakan **Information Gain** murni sebagai kriteria untuk membangun pohon.

- **Root Node (dipilih):** `Riwayat_Kredit` (Gain = 0.2202)
    
- `Gain(Status_Rumah)` = 0.1500
    
- `Gain(Pendapatan@47.5)` = 0.1245
    
- **36. (3 poin)** `Riwayat_Kredit` memiliki 4 cabang ('Baik', 'Buruk', 'Cukup', '?'). Cabang mana yang langsung menjadi _leaf node_ (daun) karena datanya murni (pure)? Apa label _leaf_ tersebut?
    
- **37. (3 poin)** Untuk cabang `Riwayat_Kredit = '?'`, data tersisa adalah [D9 (Ya), D10 (Tidak)]. Cabang ini tidak murni dan tidak ada atribut tersisa. Sesuai algoritma DTL (ID3), apa label _leaf_ yang harus diberikan pada cabang ini? (Hint: `PLURALITY-VALUE` dari parent).
    
- **38. (3 poin)** Untuk cabang `Riwayat_Kredit = 'Baik'`, data tersisa adalah [D1(Ya), D2(Ya), D6(Ya)].  Data untuk cabang 'Baik' adalah 3 data [3 Ya, 0 Tdk]. Apa yang terjadi pada cabang ini?
        
- **39. (3 poin)** Untuk cabang `Riwayat_Kredit = 'Cukup'` (data: [D4(Ya), D5(Tdk), D7(Tdk)]), kita harus memilih atribut baru. Jika `Gain(S_cukup, Pendapatan)` > `Gain(S_cukup, Status_Rumah)`, atribut apa yang akan menjadi node selanjutnya di bawah cabang 'Cukup'?
    
- **40. (4 poin)** Gambarkan diagram pohon keputusan parsial berdasarkan jawaban Anda dari soal 36-39.
    

## BAGIAN IV: Esai Sintesis (20 poin)

**Fokus:** Sintesis & Evaluasi Kritis

- **41. (10 poin) kNN vs DTL:** Bandingkan secara kritis algoritma kNN dan DTL dalam hal-hal berikut:
    
    - (a) Proses Pelatihan (Lazy vs Eager)
        
    - (b) Representasi Model (Hasil modelnya berupa apa?)
        
    - (c) Penanganan Fitur Tidak Relevan (Mana yang lebih sensitif?)
        
    - (d) Biaya Komputasi (Saat training vs saat testing/prediksi)
        
- **42. (10 poin) Analisis Skenario Metrik:** Anda sedang membangun dua sistem AI:
    
    - **Sistem A (Filter Email):** Memprediksi apakah email adalah 'Spam' (Positif) atau 'Penting' (Negatif).
        
    - Sistem B (Deteksi Medis): Memprediksi apakah pasien 'Sakit Kanker' (Positif) atau 'Sehat' (Negatif).
        
        Jelaskan untuk Sistem A, mana error yang lebih fatal (FP atau FN)? Metrik apa (Presisi atau Recall) yang harus Anda prioritaskan?
        
        Jelaskan untuk Sistem B, mana error yang lebih fatal (FP atau FN)? Metrik apa (Presisi atau Recall) yang harus Anda prioritaskan? Berikan justifikasi lengkap untuk kedua sistem.
        

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I
> 
> **Soal 1-10 (Matrix) (10 poin):**
> 
> 1. **A. kNN**: (atau DTL, tapi kNN lebih pas sebagai _lazy_)
>     
> 2. **G. Entropy**: Ukuran ketidakpastian/impurity.
>     
> 3. **E. Recall**: Fokus pada penemuan semua kasus positif (menghindari FN).
>     
> 4. **B. DTL (ID3)**: Model _eager_ yang membangun pohon.
>     
> 5. **H. Gain Ratio**: (InfoGain / SplitInfo).
>     
> 6. **D. Precision**: Fokus pada akurasi prediksi positif (menghindari FP).
>     
> 7. **C. DTL Issues**: Ini adalah daftar topik dalam DTL Issues.
>     
> 8. **F. Accuracy**: Metrik standar (TP+TN)/Total.
>     
> 9. **A. kNN**: Jarak sangat dipengaruhi oleh skala (misal: Gaji vs Umur).
>     
> 10. **B. DTL (ID3)**: Kriteria split standar ID3.
>     
> 
> Soal 11-20 (B/S) (10 poin):
> 
> 11. Salah. Ini adalah teknik post-pruning.
> 
> 12. Benar. Ini adalah definisi klasik overfitting.
> 
> 13. Benar. (Misal: Atribut 'ID', 'Tanggal').
> 
> 14. Salah. Rata-rata Harmonik.
> 
> 15. Benar. Ini adalah langkah pertama dalam metode C4.5.
> 
> 16. Salah. Hanya mengevaluasi split point di antara nilai yang berganti kelas.
> 
> 17. Salah. ID3 murni hanya melihat InfoGain, mengabaikan biaya. (Metode Gain^2/Cost akan memilih B).
> 
> 18. Salah. Bisa juga impure jika kehabisan atribut atau data (menggunakan PLURALITY-VALUE).
> 
> 19. Salah. Kebalikannya. Curse of Dimensionality (banyak fitur) sangat buruk untuk kNN (jarak menjadi tidak bermakna), DTL lebih robust.
> 
> 20. Benar. Jika data seimbang, Akurasi adalah metrik awal yang baik (meskipun F1-Score tetap lebih baik).
> 
> ### Bagian II
> 
> **Soal 21-25 (kNN) (26 poin total Skenario A):**
> 
> - **21. (5 poin)** Min=10, Max=60, Range=50.
>     
>     - D1: (10-10)/50 = 0.0
>         
>     - D2: (50-10)/50 = 0.8
>         
>     - D3: (20-10)/50 = 0.2
>         
>     - D4: (40-10)/50 = 0.6
>         
>     - D5: (60-10)/50 = 1.0
>         
>     - D6: (15-10)/50 = 0.1
>         
>     - Query (Q): (25-10)/50 = 0.3
>         
> - **22. (12 poin)** Jarak dari $Q = [0.3, 'Gratis']$  
>     
>     - vs D1 [0.0, 'Gratis']: $\sqrt{(0.3-0.0)^2 + 0} = \sqrt{0.09} = 0.3$  
>         
>     - vs D2 [0.8, 'Gratis']: $\sqrt{(0.3-0.8)^2 + 0} = \sqrt{(-0.5)^2} = 0.5$  
>         
>     - vs D3 [0.2, 'Pelajar']: $\sqrt{(0.3-0.2)^2 + 1^2} = \sqrt{0.01 + 1} = \sqrt{1.01} \approx 1.005$  
>         
>     - vs D4 [0.6, 'Pelajar']: $\sqrt{(0.3-0.6)^2 + 1^2} = \sqrt{0.09 + 1} = \sqrt{1.09} \approx 1.044$  
>         
>     - vs D5 [1.0, 'Keluarga']: $\sqrt{(0.3-1.0)^2 + 1^2} = \sqrt{0.49 + 1} = \sqrt{1.49} \approx 1.221$  
>         
>     - vs D6 [0.1, 'Gratis']: $\sqrt{(0.3-0.1)^2 + 0} = \sqrt{0.04} = 0.2$  
>         
> - **23. (3 poin)** Tetangga terdekat (k=1): D6 (Jarak 0.2). Kelas D6 = **'Tidak'**.
>     
> - **24. (3 poin)** 3 Tetangga terdekat:
>     
>     1. D6 (Jarak 0.2, Kelas 'Tidak')
>         
>     2. D1 (Jarak 0.3, Kelas 'Tidak')
>         
>     3. D2 (Jarak 0.5, Kelas 'Ya')
>         
>         Voting: 2 'Tidak', 1 'Ya'. Prediksi = 'Tidak'.
>         
> - **25. (3 poin)** 5 Tetangga terdekat:
>     
>     1. D6 (Jarak 0.2, Kelas 'Tidak')
>         
>     2. D1 (Jarak 0.3, Kelas 'Tidak')
>         
>     3. D2 (Jarak 0.5, Kelas 'Ya')
>         
>     4. D3 (Jarak 1.005, Kelas 'Tidak')
>         
>     5. D4 (Jarak 1.044, Kelas 'Ya')
>         
>         Voting: 3 'Tidak', 2 'Ya'. Prediksi = 'Tidak'.
>         
> 
> **Soal 26-30 (Metrics) (14 poin total Skenario B):**
> 
> - **26. (4 poin)**
>     
>     - Info: Real P=30, Real N=70. Pred P=40. TP=25.
>         
>     - TP = 25
>         
>     - FP = Pred P - TP = 40 - 25 = 15
>         
>     - FN = Real P - TP = 30 - 25 = 5
>         
>     - TN = Real N - FP = 70 - 15 = 55
>         
>     - **Matrix:**
>         
>         - | Real Ya | Pred Ya | 25 (TP) |
>             
>         - | Real Ya | Pred Tdk| 5 (FN) |
>             
>         - | Real Tdk| Pred Ya | 15 (FP) |
>             
>         - | Real Tdk| Pred Tdk| 55 (TN) |
>             
> - **27. (2 poin) Akurasi:** (TP+TN) / Total = (25 + 55) / 100 = **80%**
>     
> - **28. (2 poin) Presisi:** TP / (TP+FP) = 25 / (25 + 15) = 25 / 40 = **62.5%**
>     
> - **29. (2 poin) Recall:** TP / (TP+FN) = 25 / (25 + 5) = 25 / 30 = **83.3%**
>     
> - **30. (4 poin) Analisis Skenario:**
>     
>     - (a) **Filter Spam:** FP (Email Penting masuk Spam) lebih fatal daripada FN (Spam lolos ke inbox). Biaya FP tinggi $\rightarrow$ Prioritaskan **Presisi**.
>         
>     - (b) **Deteksi Penipuan (Fraud):** FN (Ada fraud tapi lolos) lebih fatal daripada FP (Transaksi normal ditandai). Biaya FN tinggi $\rightarrow$ Prioritaskan **Recall**.
>         
> 
> ### Bagian III
> 
> **Soal 31-40 (DTL) (40 poin):**
> 
> - **31. (6 poin)** Ingat $E(S) = 0.971$.
>     
>     - Gain(A, 47.5) = $E(S) - [ (5/10) \times E_{A1} + (5/10) \times E_{A2} ]$
>         
>         = $0.971 - [ 0.5 \times 0.722 + 0.5 \times 0.971 ]$
>         
>         = $0.971 - [ 0.361 + 0.4855 ] = 0.971 - 0.8465 = \textbf{0.1245}$
>         
>     - Gain(B, 65.0) = $E(S) - [ (7/10) \times E_{B1} + (3/10) \times E_{B2} ]$
>         
>         = $0.971 - [ 0.7 \times 0.863 + 0.3 \times 0.918 ]$
>         
>         = $0.971 - [ 0.6041 + 0.2754 ] = 0.971 - 0.8795 = \textbf{0.0915}$
>         
>     - **Pilihan:** Kandidat A (`Pendapatan <= 47.5`) dipilih karena Gain-nya lebih tinggi (0.1245 > 0.0915).
>         
> - **32. (8 poin)**
>     
>     - (a) Information Gain:
>         
>         = $E(S) - [ (3/8)E_{Baik} + (2/8)E_{Buruk} + (3/8)E_{Cukup} ]$
>         
>         = $0.971 - [ (3/8 \times 0.918) + (0.25 \times 0) + (3/8 \times 0.918)]$
>         
>		=$\textbf{0.2825}$
>
>		=> IG Keseluruhan = $\frac{n_{\text{known}}}{n} \times 0.2825 = 0.226$
>         
>     - (b) Split Information: (Proporsi: 3/10, 2/10, 3/10, 2/10)
>         
>         = $- [ (0.3 \log_2 0.3) + (0.2 \log_2 0.2) + (0.3 \log_2 0.3) + (0.2 \log_2 0.2) ]$
>         
>         = $- [ 2 \times (0.3 \times -1.74) + 2 \times (0.2 \times -2.32) ]$
>         
>         = $- [ 2 \times (-0.522) + 2 \times (-0.464) ]$
>         
>         = $- [ -1.044 - 0.928 ] = \textbf{1.972}$
>         
>     - (c) **Gain Ratio:** = Gain / SplitInfo = $0.2226 / 1.972 = \textbf{0.1114}$  
>         
> - **33. (4 poin)**
>     
>     - Skor(Pendapatan) = $0.1245^2 / 1 = 0.0155$  
>         
>     - Skor(Riwayat_Kredit) = $0.2202^2 / 5 = 0.0485 / 5 = 0.0097$  
>         
>     - Skor(Status_Rumah) = $0.1500^2 / 1 = 0.0225$  
>         
>     - **Pilihan:** `Status_Rumah` akan dipilih (Skor 0.0225 tertinggi).
>         
> - **34. (3 poin)**
>     
>     - **Overfitting:** Model yang "menghafal" data latih, termasuk noise/kebetulan. Performanya sangat baik di data latih, tapi sangat buruk di data uji baru.
>         
>     - **Reduced Error Pruning:** Teknik _post-pruning_ di mana pohon dibiarkan tumbuh penuh, lalu _node_ dipangkas dari bawah ke atas. Pemangkasan (misal: mengganti _subtree_ dengan _leaf_) dipertahankan jika akurasi pada _validation set_ (set data validasi terpisah) meningkat atau tetap sama.
>         
> - **35. (3 poin)**
>     
>     1. **Isi dengan Nilai Umum (Mean/Median/Modus):** Isi '?' dengan nilai paling umum (modus) dari _seluruh_ atribut (misal: 'Sewa' untuk Status_Rumah).
>         
>     2. **Isi dengan Nilai Umum (Per Kelas):** Isi '?' dengan modus, tapi khusus untuk data yang kelasnya sama (misal: jika Y=Ya, isi '?' dengan modus Status_Rumah dari data Y=Ya).
>         
>     3. **Probabilitas (C4.5):** Memecah data '?' secara fraksional ke semua cabang anak sesuai proporsi data yang diketahui.
>         
> - **36. (3 poin)** Cabang `Riwayat_Kredit = 'Buruk'` (Data [D3, D8] $\rightarrow$ [0 Ya, 2 Tdk]). Data ini **Murni** (Pure). **Label Leaf = 'Tidak'**.
>     
> - **37. (3 poin)** Cabang `Riwayat_Kredit = '?'` (Data [D9(Ya), D10(Tdk)]). Data tidak murni, atribut habis.
>     
>     - Gunakan `PLURALITY-VALUE(parent)`.
>         
>     - Parent (S) memiliki [4 Ya, 6 Tidak].
>         
>     - Pluralitas (mayoritas) adalah 'Tidak'. **Label Leaf = 'Tidak'**.
>         
> - **38. (3 poin)** Data `Riwayat_Kredit = 'Baik'` adalah [D1(Ya), D2(Ya), D6(Ya)].
>     
>     - Data ini [3 Ya, 0 Tdk]. Data ini **Murni** (Pure).
>         
>     - **Label Leaf = 'Ya'**.
>         
> - **39. (3 poin)** Atribut `Pendapatan` akan dipilih sebagai node selanjutnya di bawah cabang `Riwayat_Kredit = 'Cukup'`.
>     
> - **40. (4 poin)**
>     
>     ```mermaid
>     graph TD
>         A[Riwayat_Kredit?] ---|Baik| B(Leaf: Ya);
>         A ---|Buruk| C(Leaf: Tidak);
>         A ---|Cukup| D(Node: Pendapatan?);
>         A ---|?| E(Leaf: Tidak);
>
>		D ---|Pendapatan <= 47.5| F(Leaf: Tidak);
>		D ---|Pendapatan > 47.5| G(Leaf: Ya);
>     ```
>     
> 
> ### Bagian IV
> 
> - **41. (10 poin) kNN vs DTL:**
>     
>     - (a) **Proses Pelatihan:** kNN adalah _lazy learner_ (malas), proses "pelatihan" hanya menyimpan data. DTL adalah _eager learner_ (antusias), proses pelatihan membangun model (pohon) secara intensif.
>         
>     - (b) **Representasi Model:** Model kNN adalah _seluruh data latih_ itu sendiri. Model DTL adalah _pohon keputusan_ (struktur data tree) atau satu set _aturan IF-THEN_.
>         
>     - (c) **Fitur Tidak Relevan:** kNN sangat sensitif. Fitur yang tidak relevan (noise) akan "merusak" perhitungan jarak dan memberi bobot yang sama. DTL (via InfoGain) secara alami akan "mengabaikan" fitur yang tidak relevan karena Gain-nya akan rendah.
>         
>     - (d) **Biaya Komputasi:**
>         
>         - kNN: Training cepat (O(1)), Prediksi lambat (O(N*D), harus bandingkan dengan N data).
>             
>         - DTL: Training lambat (O(N_D_logN) atau lebih), Prediksi sangat cepat (O(depth), hanya menelusuri pohon).
>             
> - **42. (10 poin) Analisis Metrik:**
>     
>     - **Sistem A (Filter Spam):**
>         
>         - **Error Fatal:** _False Positive_ (FP). (Email 'Penting' diprediksi 'Spam' dan hilang/tidak terbaca).
>             
>         - **Justifikasi:** Kehilangan email penting (misal: tagihan, tawaran kerja) jauh lebih merugikan daripada membiarkan satu email spam lolos (FN) ke inbox.
>             
>         - **Prioritas Metrik:** **Presisi**. (Kita ingin $TP / (TP+FP)$ tinggi. Kita ingin dari semua yang kita prediksi Spam, kita sangat yakin itu Spam, minimalkan FP).
>             
>     - **Sistem B (Deteksi Medis):**
>         
>         - **Error Fatal:** _False Negative_ (FN). (Pasien 'Sakit Kanker' diprediksi 'Sehat').
>             
>         - **Justifikasi:** Gagal mendeteksi penyakit (FN) berakibat pasien tidak mendapat perawatan dan bisa fatal. Jauh lebih baik "salah" memprediksi pasien sehat sebagai sakit (FP), yang hanya berakibat tes lebih lanjut.
>             
>         - **Prioritas Metrik:** **Recall**. (Kita ingin $TP / (TP+FN)$ tinggi. Kita ingin menemukan _semua_ pasien yang sakit, minimalkan FN).