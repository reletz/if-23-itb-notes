---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set DTL & Isu Kritis: Lanjutan

Estimasi Waktu: 100 - 120 menit

**Tujuan Pembelajaran:**

1. Mampu menguasai metrik Information Gain, Gain Ratio, dan Entropy pada kasus kompleks (termasuk _missing values_).
    
2. Mampu menganalisis dan menjustifikasi solusi untuk _overfitting_ (Pruning) dan bias (Gain Ratio).
    
3. Mampu menerapkan konsep _Cost-Sensitive Learning_ dan _Discretization_ dalam perhitungan.
    
4. Memahami peran _Validation Set_ dalam proses _Post-Pruning_.
    

## Bagian I: Teori dan Konsep (15 Soal)

### A. True/False (5 Soal)

Instruksi: Tentukan apakah pernyataan berikut Benar (True) atau Salah (False) dan jelaskan secara singkat alasannya.

|**No.**|**Pernyataan**|**Jawaban (T/F)**|
|---|---|---|
|**I.1**|_Rule Post-Pruning_ (C4.5) meningkatkan _interpretability_ model karena aturan (_rules_) dapat dipangkas secara independen, yang tidak mungkin dilakukan pada cabang (_branches_) _Decision Tree_.||
|**I.2**|Algoritma ID3 menggunakan _Information Gain_ yang cenderung bias memilih atribut _Ordinal_ karena mereka memiliki urutan yang jelas.||
|**I.3**|_Pre-Pruning_ adalah pendekatan yang lebih aman terhadap risiko _overfitting_ karena menghentikan pertumbuhan _tree_ berdasarkan ambang batas statistik, tanpa perlu _Validation Set_.||
|**I.4**|Dalam _Cost-Sensitive Learning_, jika _Cost_ perolehan atribut $A$ sangat tinggi, maka nilai $\frac{\text{Gain}^2(S,A)}{\text{Cost}(A)}$ akan meningkat, sehingga $A$ tetap diutamakan.||
|**I.5**|Atribut dengan nilai kontinu (misal: usia) yang telah di-_Discretization_ menjadi atribut biner (`Usia < 40` vs. Usia $\ge 40$) dapat menghasilkan _Information Gain_ yang berbeda untuk _threshold_ yang berbeda.||

### B. Multiple Choice Multiple Answer (MCMA) (5 Soal)

Instruksi: Pilih **minimal dua (2)** jawaban yang paling tepat.

I.6. (Pruning Kritis)

Pilih tiga (3) pernyataan yang mendeskripsikan tujuan dan cara kerja Reduced Error Pruning (REP).

A. REP dilakukan setelah tree tumbuh sempurna (Post-Pruning).
B. REP menggunakan Validation Set untuk mengukur efektivitas pemangkasan.
C. REP mencoba memangkas node yang paling meningkatkan akurasi training set.
D. REP mengganti subtree dengan leaf node yang merepresentasikan PLURALITY-VALUE dari Validation Set.
E. REP hanya memangkas tree jika akurasi training set menurun.

I.7. (Isu Kritis Gain Ratio)

Pilih dua (2) pernyataan yang benar mengenai kelemahan dan solusi Gain Ratio.

A. Gain Ratio dapat menghasilkan nilai tak terhingga (sangat tinggi) jika Split Information bernilai nol.
B. Gain Ratio hanya bisa digunakan untuk atribut kontinu.
C. Gain Ratio dapat menimbulkan bias pada atribut dengan Information Gain di bawah rata-rata.
D. Solusi heuristiknya adalah hanya mempertimbangkan atribut yang memiliki Gain di atas rata-rata Gain dari semua atribut.

I.8. (Penanganan Missing Values - C4.5)

Pilih tiga (3) hal yang dilakukan DTL (C4.5) dalam menghadapi missing values.

A. Menghitung $\text{Gain}(S,A)$ hanya menggunakan proporsi data yang nilainya diketahui (known).
B. Membagi instans yang missing secara fraksional ke semua cabang yang mungkin.
C. Saat prediksi, mengirim data missing ke cabang yang paling populer.
D. Mengisi nilai yang hilang dengan nilai yang paling umum dari atribut tersebut.
E. Menyesuaikan pembobotan pada leaf node untuk memperhitungkan fraksi data yang masuk.

I.9. (Tipe Atribut dan DTL)

Pilih tiga (3) pasangan tipe atribut dan sifatnya yang benar dalam konteks DTL.

A. Ordinal: DTL tidak dapat menggunakannya karena jarak antar nilainya tidak bermakna.
B. Ratio-Scaled: Memiliki titik nol mutlak dan harus di-Discretization sebelum digunakan.
C. Nominal: Cocok digunakan ID3 karena nilainya diskrit dan tidak memiliki urutan.
D. Binary Asymmetric: Salah satu kelasnya (positif/langka) memiliki bobot atau kepentingan yang lebih tinggi.
E. Interval-Scaled: Dapat dioperasikan secara matematis (penambahan/pengurangan) dan DTL harus mencari threshold terbaik.

I.10. (Minimal Description Length - MDL)

Pilih dua (2) komponen yang dicari untuk diminimalkan oleh prinsip Minimum Description Length (MDL) untuk memilih ukuran tree yang optimal.

A. Panjang (kompleksitas) tree itu sendiri.
B. Panjang noise yang harus di-encode oleh tree.
C. Gain Ratio dari root node.
D. Jumlah total leaf node yang pure.

### C. Matching (5 Soal)

Instruksi: Pasangkan istilah di Kiri dengan isu atau kriteria DTL terbaik di Kanan.

|**Istilah**|**Konsep Kritis DTL**|
|---|---|
|**I.11. Information Gain**|Metrik yang cenderung _biased_ memilih atribut dengan _high cardinality_.|
|**I.12. Entropy = 0**|Menghasilkan _Bias_ tinggi dan _Variance_ rendah pada model.|
|**I.13. Pre-Pruning**|Kondisi _leaf node_ yang tidak memerlukan _split_ lebih lanjut.|
|**I.14. Gini Impurity**|Alternatif _Information Gain_ yang digunakan oleh algoritma CART.|
|**I.15. Small Leaf Size**|Menghentikan pertumbuhan _tree_ berdasarkan ambang batas $\epsilon$.|

## Bagian II: Perhitungan dan Analisis Kasus (15 Soal)

### D. Perhitungan DTL dan Isu (6 Soal)

Gunakan dataset berikut (Total $N=9$). Atr1 adalah **kategorikal** dan Atr4 adalah **kontinu**.

|**No.**|**Atr1**|**Atr2**|**Atr3**|**Atr4 (Kontinu)**|**Class (Y/N)**|
|---|---|---|---|---|---|
|1|A|70|0|20|Yes|
|2|A|90|1|30|No|
|3|B|90|1|45|Yes|
|4|B|95|0|60|Yes|
|5|C|75|0|70|Yes|
|6|C|85|1|85|No|
|7|**?**|88|1|95|No|
|8|A|72|**?**|100|Yes|
|9|B|**?**|0|110|No|

II.1. Hitunglah nilai Entropy awal ($\text{Entropy}(S)$) untuk semua 9 data (S) tersebut.

II.2. Hitunglah Split Information ($\text{SplitInformation}(S, \text{Atr1})$) untuk atribut Atr1, dengan Missing Included (sebagai kategori terpisah).

II.3. Hitunglah Information Gain ($\text{Gain}(S, \text{Atr1})$) untuk atribut Atr1, dengan prosedur C4.5 (proporsi known value).

II.4. Hitunglah Gain Ratio ($\text{GainRatio}(S, \text{Atr1})$).

II.5. Lakukan Discretization pada atribut Atr4 (Kontinu). Tentukan dua (2) kandidat threshold $c$ yang harus diuji.

II.6. Hitung $\text{Gain}(S, \text{Atr4})$ untuk threshold $c$ yang Anda anggap terbaik di II.5. (Asumsikan $\text{Entropy}(S)=0.991$).

### E. Analisis Kasus & Cost-Sensitive Learning (5 Soal)

Asumsikan atribut **Atr5 (MRI)** memiliki _Cost_ = **30** dan atribut **Atr6 (Blood Test)** memiliki _Cost_ = **5**.

- Diketahui: $\text{Gain}(S, \text{Atr5}) = 0.60$ dan $\text{Gain}(S, \text{Atr6}) = 0.55$.
    
- Bobot $w$ (importance of cost) = 0.5.
    

II.7. Berdasarkan Information Gain saja, atribut mana yang akan dipilih sebagai root node?

II.8. Hitung skor bobot menggunakan formula $\frac{\text{Gain}^2(S,A)}{\text{Cost}(A)}$ untuk Atr5 dan Atr6. Atribut mana yang akan dipilih?

II.9. Hitung skor bobot menggunakan formula $\frac{2^{\text{Gain}(S,A)} - 1}{(\text{Cost}(A) + 1)^w}$ (dengan $w=0.5$) untuk Atr5 dan Atr6. Atribut mana yang akan dipilih?

II.10. Jelaskan apa interpretasi dari $w=0.5$ dalam formula II.9 tersebut.

II.11. Mengapa menggunakan $\text{Gain}$ kuadrat (II.8) lebih disukai daripada hanya $\text{Gain}/\text{Cost}$?

### F. Analisis Pruning & Validation Set (4 Soal)

Sebuah _Decision Tree_ dilatih pada _Training Set_ (900 data) dan diuji pada _Validation Set_ (300 data).

|**Node**|**Total Data**|**Prediksi Mayoritas**|**Acc. di Val Set sebelum pangkas**|**Acc. di Val Set setelah pangkas**|**Keputusan Pruning**|
|---|---|---|---|---|---|
|**R** (Root)|300|Yes|78%|N/A|Jangan pangkas|
|**A** (Anak R)|120|No|85%|88%|?|
|**B** (Anak R)|180|Yes|82%|80%|?|
|**C** (Anak A)|50|No|85%|N/A|Pangkas|
|**D** (Anak A)|70|Yes|75%|N/A|Pangkas|

II.12. Jelaskan apa keputusan Pruning yang harus diambil pada Node A dan Node B (menggunakan teknik Reduced Error Pruning).

II.13. Jika Node A dipangkas, apa yang akan terjadi pada subtree di bawahnya (C dan D), dan apa label akhir dari Node A?

II.14. Jelaskan secara singkat mengapa kita tidak boleh menggunakan akurasi dari Training Set (900 data) untuk memutuskan apakah akan memangkas Node A.

II.15. Jelaskan mengapa Rule Post-Pruning (C4.5) seringkali tidak memerlukan Validation Set yang terpisah untuk setiap aturan.

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I: Teori dan Konsep
> 
> ### A. True/False
> 
> |**No.**|**Pernyataan**|**Jawaban**|
> |---|---|---|
> |**I.1**|_Rule Post-Pruning_ (C4.5) meningkatkan _interpretability_ model karena aturan (_rules_) dapat dipangkas secara independen, yang tidak mungkin dilakukan pada cabang (_branches_) _Decision Tree_.|**True**|
> |**I.2**|Algoritma ID3 menggunakan _Information Gain_ yang cenderung bias memilih atribut _Ordinal_ karena mereka memiliki urutan yang jelas.|**False**|
> |**I.3**|_Pre-Pruning_ adalah pendekatan yang lebih aman terhadap risiko _overfitting_ karena menghentikan pertumbuhan _tree_ berdasarkan ambang batas statistik, tanpa perlu _Validation Set_.|**False**|
> |**I.4**|Dalam _Cost-Sensitive Learning_, jika _Cost_ perolehan atribut $A$ sangat tinggi, maka nilai $\frac{\text{Gain}^2(S,A)}{\text{Cost}(A)}$ akan meningkat, sehingga $A$ tetap diutamakan.|**False**|
> |**I.5**|Atribut dengan nilai kontinu (misal: usia) yang telah di-_Discretization_ menjadi atribut biner (`Usia < 40` vs. `Usia $\ge 40$`) dapat menghasilkan _Information Gain_ yang berbeda untuk _threshold_ yang berbeda.|**True**|
> 
> ### B. Multiple Choice Multiple Answer (MCMA)
> 
> I.6. A, B
> 
> I.7. A, C, D (Gain Ratio menghukum Gain di bawah rata-rata)
> 
> I.8. A, B, E (Strategi C4.5: Memecah fraksional, menghitung Gain dengan proporsi known, dan menyesuaikan bobot leaf).
> 
> I.9. B, C, D, E (A salah, DTL bisa menggunakan Ordinal, tapi harus berhati-hati dengan urutannya).
> 
> I.10. A, B
> 
> ### C. Matching
> 
> |**Istilah**|**Konsep Kritis DTL**|
> |---|---|
> |**I.11. Information Gain**|Metrik yang cenderung _biased_ memilih atribut dengan _high cardinality_.|
> |**I.12. Entropy = 0**|Kondisi _leaf node_ yang tidak memerlukan _split_ lebih lanjut.|
> |**I.13. Pre-Pruning**|Menghentikan pertumbuhan _tree_ berdasarkan ambang batas $\epsilon$.|
> |**I.14. Gini Impurity**|Alternatif _Information Gain_ yang digunakan oleh algoritma CART.|
> |**I.15. Recall**|Jarak yang paling efektif meminimalkan _False Negative_ (FN).|
> 
> ### Bagian II: Perhitungan dan Analisis Kasus
> 
> ### D. Perhitungan DTL dan Isu
> 
> **II.1. Entropy Awal (**$\text{Entropy}(S)$**):**
> 
> - Total Data $N=9$. Kelas Yes: 5, Kelas No: 4.
>     
>     $$\text{Entropy}(S) = - \left( \frac{5}{9} \log_2 \frac{5}{9} \right) - \left( \frac{4}{9} \log_2 \frac{4}{9} \right) \approx \mathbf{0.991 \text{ bits}}$$
> 
> **II.2. Split Information (**$\text{SplitInformation}(S, \text{Atr1})$**) - Missing Included:**
> 
> - Data Atr1: 3 A, 3 B, 2 C, 1 ?. Total $N=9$.
>     
>     $$\text{SplitInformation}_{\text{Included}}(S, \text{Atr1}) = - \left( \frac{3}{9} \log_2 \frac{3}{9} \right) - \left( \frac{3}{9} \log_2 \frac{3}{9} \right) - \left( \frac{2}{9} \log_2 \frac{2}{9} \right) - \left( \frac{1}{9} \log_2 \frac{1}{9} \right) \approx \mathbf{1.89 \text{ bits}}$$
> 
> **II.3. Information Gain (**$\text{Gain}(S, \text{Atr1})$**) - Prosedur C4.5:**
> 
> - Data Known $N_{known}=8$. Data Missing $N_{missing}=1$. Faktor Koreksi $\frac{8}{9}$.
>     
> - Entropy Anak (dari Kunci Jawaban sebelumnya): $\text{Entropy}(S_A) \approx 0.918$, $\text{Entropy}(S_B) \approx 0.918$, $\text{Entropy}(S_C) = 1.0$.
>     
>     $$\text{Gain}_{\text{known}}(S, \text{Atr1}) = 0.991 - \left[ \frac{3}{8} \times 0.918 + \frac{3}{8} \times 0.918 + \frac{2}{8} \times 1.0 \right] \approx 0.0525$$$$\text{Gain}(S, \text{Atr1}) = \frac{8}{9} \times 0.0525 \approx \mathbf{0.0467}$$
> 
> II.4. Gain Ratio ($\text{GainRatio}(S, \text{Atr1})$):
> 
> $$\text{GainRatio}(S, \text{Atr1}) = \frac{0.0467}{1.89} \approx \mathbf{0.0247}$$
> 
> II.5. Kandidat Threshold Atr4 (Kontinu):
> 
> | Atr4 | Kelas |
> | :---: | :---: |
> | 20 | Yes |
> | 30 | No |
> | 45 | Yes |
> | 60 | Yes |
> | 70 | Yes |
> | 85 | No |
> | 95 | No |
> | 100 | Yes |
> | 110 | No |
> 
> - Kandidat harus di antara perubahan kelas:
>     
>     1. 30 (No) dan 45 (Yes) $\to c_1 = (30+45)/2 = \mathbf{37.5}$  
>         
>     2. 70 (Yes) dan 85 (No) $\to c_2 = (70+85)/2 = \mathbf{77.5}$  
>         
>     3. 95 (No) dan 100 (Yes) $\to c_3 = (95+100)/2 = \mathbf{97.5}$  
>         
>     4. 100 (Yes) dan 110 (No) $\to c_4 = (100+110)/2 = \mathbf{105}$  
>         
> - **Dua Kandidat Pilihan:** 37.5 dan 77.5 (Pilihan ini subjektif, tapi logis berdasarkan urutan).
>     
> 
> **II.6. Hitung** $\text{Gain}(S, \text{Atr4})$ **untuk** _**Threshold**_ **Terbaik (Ambil** $c = 77.5$**):**
> 
> - Tes: $\text{Atr4} < 77.5$ vs $\text{Atr4} \ge 77.5$.
>     
> - $\text{Atr4} < 77.5$ (5 data): [4 Yes, 1 No]. $\text{Entropy} \approx 0.722$  
>     
> - $\text{Atr4} \ge 77.5$ (4 data): [1 Yes, 3 No]. $\text{Entropy} \approx 0.811$
>     
>     $$\text{Gain}(S, \text{Atr4}) = 0.991 - \left[ \frac{5}{9} \times 0.722 + \frac{4}{9} \times 0.811 \right]$$$$\text{Gain}(S, \text{Atr4}) = 0.991 - [ 0.401 + 0.360 ] = 0.991 - 0.761 = \mathbf{0.230}$$
> 
> ### E. Analisis Kasus & Cost-Sensitive Learning
> 
> **II.7. Berdasarkan Information Gain:**
> 
> - $\text{Gain}(S, \text{Atr5}) = 0.60$ (Tertinggi) $\to$ **Atr5 (MRI)** akan dipilih.
>     
> 
> **II.8. Skor** $\frac{\text{Gain}^2(S,A)}{\text{Cost}(A)}$**:**
> 
> - Atr5 (MRI): $\frac{0.60^2}{30} = \frac{0.36}{30} = \mathbf{0.012}$  
>     
> - Atr6 (Blood Test): $\frac{0.55^2}{5} = \frac{0.3025}{5} = \mathbf{0.0605}$  
>     
> - **Keputusan:** **Atr6 (Blood Test)** akan dipilih karena skornya lebih tinggi.
>     
> 
> **II.9. Skor** $\frac{2^{\text{Gain}(S,A)} - 1}{(\text{Cost}(A) + 1)^w}$ **(**$w=0.5$**):**
> 
> - Atr5 (MRI): $\frac{2^{0.60} - 1}{(30 + 1)^{0.5}} \approx \frac{1.516 - 1}{5.568} \approx \frac{0.516}{5.568} \approx \mathbf{0.0927}$  
>     
> - Atr6 (Blood Test): $\frac{2^{0.55} - 1}{(5 + 1)^{0.5}} \approx \frac{1.464 - 1}{2.449} \approx \frac{0.464}{2.449} \approx \mathbf{0.1895}$  
>     
> - **Keputusan:** **Atr6 (Blood Test)** akan dipilih karena skornya lebih tinggi.
>     
> 
> **II.10. Interpretasi** $w=0.5$**:**
> 
> - $w$ (bobot) menentukan seberapa besar biaya perolehan memengaruhi skor. Nilai $w=0.5$ menunjukkan bahwa biaya perolehan **penting**, tetapi tidak sepenuhnya mendominasi keputusan. Bobot biaya dihitung sebagai akar kuadrat (pangkat 0.5) dari biaya + 1. Jika $w=1$ (biaya sangat penting), ATR6 akan semakin jauh unggul.
>     
> 
> **II.11. Mengapa** $\text{Gain}^2$ **(II.8) lebih disukai daripada** $\text{Gain}/\text{Cost}$**?**
> 
> - Jawab: Mengkuadratkan Gain memberikan bobot **ekstra** pada peningkatan akurasi (_predictive power_). Dengan $\text{Gain}^2$, atribut harus memberikan _Gain_ yang **substansial** (tidak hanya sedikit) untuk membenarkan biayanya. Ini memastikan bahwa _Decision Tree_ hanya mengambil tes yang mahal jika tes tersebut benar-benar sangat informatif.
>     
> 
> ### F. Analisis Pruning & Validation Set
> 
> **II.12. Keputusan** _**Pruning**_ **Node A dan B:**
> 
> - **Node A:** Akurasi sebelum pangkas (85%) vs. setelah pangkas (88%). $\to$ Akurasi **Meningkat**. Keputusan: **Pangkas (Prune)**.
>     
> - **Node B:** Akurasi sebelum pangkas (82%) vs. setelah pangkas (80%). $\to$ Akurasi **Menurun**. Keputusan: **Jangan Pangkas**.
>     
> 
> **II.13. Jika Node A dipangkas:**
> 
> - _Subtree_ di bawah Node A (Node C dan D) akan **dibuang** (dihapus).
>     
> - Label akhir Node A akan menjadi **No**, karena itu adalah _Prediksi Mayoritas_ (label kelas paling umum) di Node A (120 data).
>     
> 
> **II.14. Mengapa tidak boleh menggunakan** _**Training Set**_:
> 
> - Jawab: _Decision Tree_ sudah dioptimalkan (dan mungkin _overfit_) pada _Training Set_. Menggunakan _Training Set_ untuk _Pruning_ akan selalu menyarankan **"Jangan pangkas"** (karena pemangkasan hampir selalu menurunkan akurasi _training_). _Validation Set_ (data yang belum pernah dilihat model) memberikan estimasi _error_ yang jujur, memastikan keputusan _pruning_ meningkatkan **generalisasi** (akurasi pada data baru).
>     
> 
> **II.15. Mengapa** _**Rule Post-Pruning**_ **(C4.5) tidak memerlukan** _**Validation Set**_:
> 
> - Jawab: _Rule Post-Pruning_ menggunakan pendekatan berbasis **estimasi statistik** (misalnya, _confidence interval_) yang disebut **Pessimistic Error Estimation** untuk menentukan kapan harus memangkas aturan. Estimasi ini menggabungkan error _training set_ dengan penalti untuk kompleksitas, sehingga tidak memerlukan data _validation_ terpisah. Selain itu, setiap aturan dipangkas secara independen, yang membatasi ketergantungan pada _validation set_ tunggal.