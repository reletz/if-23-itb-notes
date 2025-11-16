---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

# Problem Set DTL & kNN: Analisis Mendalam (30 Soal)

Level: Lanjutan (Membutuhkan Analisis Konsep dan Penerapan Formula)

Target: Mahasiswa Teknik/Sains Data (Fase Pemodelan & Evaluasi)

Estimasi Waktu: 100 - 120 menit

**Tujuan Pembelajaran:**

1. Menguasai terminologi DTL (_Entropy_, _Gain_, _Pruning_) dan kNN (_Lazy Learner_, _Curse of Dimensionality_).
    
2. Mampu menganalisis Trade-off desain model (Biaya Komputasi, Sensitivitas _Noise_).
    
3. Mampu melakukan perhitungan DTL secara manual (Entropy, Gain, Gain Ratio).
    
4. Mampu menerapkan kNN pada kasus _missing value_ dan skala berbeda.
    

## Bagian I: Teori dan Konsep (15 Soal)

### A. True/False (5 Soal)

Instruksi: Tentukan apakah pernyataan berikut Benar (True) atau Salah (False) dan jelaskan secara singkat alasannya.

| No. | Pernyataan | Jawaban (T/F) |
|---|---|---|
| I.1 | Algoritma k-Nearest Neighbor (kNN) tidak memerlukan Feature Scaling jika semua fitur numerik telah diubah menjadi nilai kategori menggunakan teknik Binning. | |
| I.2 | Information Gain (IG) memiliki bias untuk memilih atribut dengan banyak nilai unik. Solusi untuk bias ini adalah mengganti IG dengan metrik Gini Impurity. | |
| I.3 | Dalam DTL, strategi Pre-Pruning (penghentian awal) umumnya dianggap lebih sukses dalam praktik dibandingkan Post-Pruning (pangkas setelah overfit). | |
| I.4 | Curse of Dimensionality pada kNN menyebabkan jarak antar semua titik data cenderung semakin jauh dan sama, yang merusak konsep kedekatan. | |
| I.5 | Log Conditional Likelihood (LCL) adalah fungsi biaya (Cost Function) utama yang digunakan untuk melatih DTL. | |

### B. Multiple Choice Multiple Answer (MCMA) (5 Soal)

Instruksi: Pilih **minimal dua (2)** jawaban yang paling tepat.

**I.6. (DTL & Overfitting)** 

Pilih **tiga (3)** faktor utama yang menyebabkan sebuah _Decision Tree_ sangat rentan terhadap _overfitting_. 

A. Model hanya menghasilkan batas keputusan linear. 
B. Pohon diizinkan tumbuh hingga semua _leaf node_ menjadi _pure_ (murni) atau hanya memiliki sedikit data. 
C. Model tidak memiliki asumsi tentang distribusi probabilitas data. 
D. Adanya _noise_ atau _outlier_ di dalam data latih. 
E. Penggunaan _Reduced Error Pruning_ (REP) terlalu dini.

**I.7. (kNN Weaknesses)** 

Pilih **tiga (3)** kelemahan struktural k-Nearest Neighbor (kNN). 

A. Biaya prediksi _testing_ sangat tinggi pada dataset besar. 
B. Sangat rentan terhadap masalah _Imbalanced Data_. 
C. Menggunakan _Harmonic Mean_ (F1-Score) yang bias. 
D. Semua fitur (relevan atau tidak) berkontribusi sama pada perhitungan jarak. 
E. Tidak mampu menangani klasifikasi multi-kelas.

**I.8. (Strategi Pruning)** 

Pilih **dua (2)** teknik _Post-Pruning_ yang digunakan untuk menentukan ukuran _tree_ akhir. 

A. Menggunakan _Validation Set_ (seperti pada Reduced Error Pruning). 
B. Menghentikan pertumbuhan _node_ jika Gain-nya di bawah batas $\epsilon$ (epsilon). 
C. Menggunakan _Rule Post-Pruning_ (C4.5). 
D. Menggunakan _Minimum Description Length_ (MDL) untuk menyeimbangkan kompleksitas model dan error.

**I.9. (Distance Metrics)** 

Pilih **dua (2)** pernyataan yang benar mengenai Jarak Manhattan ($p=1$) dibandingkan Jarak Euclidean ($p=2$) dalam konteks kNN. 

A. Jarak Manhattan lebih sensitif terhadap _outlier_ ekstrem. 
B. Jarak Euclidean merefleksikan jarak garis lurus (geometris). 
C. Jarak Manhattan memberikan pembobotan yang linear pada selisih fitur. 
D. Jarak Manhattan dapat menghasilkan _Decision Boundary_ yang non-linear.

**I.10. (Missing Values in DTL)** 

Pilih **dua (2)** strategi yang digunakan algoritma DTL (C4.5) untuk menangani nilai atribut yang hilang (_missing values_) selama perhitungan Information Gain. 

A. Mengisi nilai yang hilang dengan nilai yang paling umum di _node_ tersebut. 
B. Menganggap nilai hilang sebagai kategori unik tersendiri. 
C. Menghitung Gain hanya berdasarkan proporsi data yang nilainya diketahui (_known values_). 
D. Memecah instans dengan nilai hilang secara fraksional ke semua cabang yang mungkin.

### C. Matching (5 Soal)

Instruksi: Pasangkan istilah di Kiri dengan definisi atau konsep terbaik di Kanan.

| Istilah | Konsep yang Cocok |
|---|---|
| I.11. Euclidean Distance | Jarak yang paling efektif meminimalkan False Negative (FN). |
| I.12. Lazy Learner | Sebuah metrik yang menormalkan Information Gain untuk mengatasi bias. |
| I.13. F1-Score | Jarak yang digunakan kNN ketika data berdimensi tinggi dan tidak dinormalisasi. |
| I.14. Gain Ratio | Algoritma yang menunda komputasi hingga fase prediksi. |
| I.15. Recall | Rata-rata harmonik dari Precision dan Recall. |

## Bagian II: Perhitungan dan Analisis Kasus (15 Soal)

### D. Perhitungan DTL (6 Soal)

Gunakan dataset berikut (total 9 data) yang mengandung 3 _missing values_ (ditandai '?'). 
_Catatan: Asumsi_ $log_2$ _yang digunakan sesuai dengan aturan kelas._

|**Atr1**|**Atr2**|**Atr3**|**Class**|
|---|---|---|---|
|A|70|0|Yes|
|A|90|1|No|
|B|90|1|Yes|
|B|95|0|Yes|
|C|75|0|Yes|
|C|85|1|No|
|**?**|88|1|No|
|A|72|**?**|Yes|
|B|**?**|0|No|

II.1. Tentukan proporsi data berkelas "Yes" dan "No" untuk semua 9 data (termasuk yang missing).

II.2. Hitunglah nilai Entropy awal ($\text{Entropy}(S)$) untuk semua 9 data (S) tersebut.

II.3. Tentukan jumlah data yang diketahui (known) dan yang hilang (missing) untuk atribut Atr1.

II.4. Hitunglah Information Gain (Gain) untuk atribut Atr1 ($\text{Gain}(S, \text{Atr1})$), dengan asumsi missing value dihitung berdasarkan proporsi known value pada Gain keseluruhan (sesuai C4.5).

II.5. Hitunglah Split Information ($\text{SplitInformation}(S, \text{Atr1})$) untuk atribut Atr1  (dengan atau tanpa mengabaikan data yang hilang).

II.6. Hitunglah Gain Ratio ($\text{GainRatio}(S, \text{Atr1})$).

### E. Simulasi kNN & Analisis (4 Soal)

Diberikan 4 data latih (D1-D4) dan 1 data uji (D_new). Kita ingin memprediksi Kelas target (A/B) menggunakan Jarak Euclidean.

| No. | Umur | Gaji (juta) | Status | Kelas |
|---|---|---|---|---|
| D1 | 25 | 10 | Menikah | A |
| D2 | 30 | 5 | Lajang | B |
| D3 | 40 | 15 | Menikah | A |
| D4 | 50 | 8 | Lajang | B |
| D_new | 35 | 12 | Menikah | ? |

**II.7.** Jelaskan mengapa Anda **tidak bisa** langsung menggunakan fitur `Gaji` dan `Umur` pada perhitungan Jarak Euclidean. 
**II.8.** Lakukan **Feature Scaling** sederhana (Min-Max Normalization) untuk fitur `Umur` dan `Gaji` pada D_new (gunakan rentang min/max dari D1-D4). Tuliskan nilai _scaled_ untuk D_new. 
**II.9.** Menggunakan **Hamming Distance** untuk fitur `Status` dan **Scaled Euclidean Distance** dari **II.8** untuk fitur `Umur` dan `Gaji`, hitunglah jarak total (Manhattan-like summation) antara D_new dan D3. 
**II.10.** Berdasarkan **II.9**, jika k=3, dan Anda tahu D1 dan D4 adalah tetangga lain yang paling dekat, manakah kelas prediksi untuk D_new? (Asumsi Jarak D_new-D1 = 0.5; Jarak D_new-D4 = 1.0; Jarak D_new-D3 dari II.9).

### F. Esai Analisis Kasus Kritis (5 Soal)

**II.11. (Analisis Konsep DTL & Outlier)** Jelaskan mengapa DTL dianggap **lebih robust (tahan banting)** terhadap _outlier_ pada fitur input numerik dibandingkan dengan Regresi Linear. Hubungkan jawaban Anda dengan cara DTL memecah data (split) dan cara Regresi Linear mencari garis terbaik.

**II.12. (Justifikasi Pruning)** Jelaskan perbedaan mendasar antara tujuan _Pre-Pruning_ dan _Post-Pruning_. Mengapa _Post-Pruning_ yang menggunakan _Validation Set_ seringkali merupakan strategi yang lebih disukai dalam praktik?

**II.13. (Efek Nilai k pada kNN)** Anda melatih kNN dengan dua nilai k: k=1 dan k=21. Jelaskan dampak utama dari k=1 dan k=21 terhadap _Bias-Variance Tradeoff_ dan sensitivitas model terhadap _noise_.

**II.14. (Cost-Sensitive Learning)** Dalam masalah diagnosis medis, _cost_ (biaya) untuk mendapatkan hasil tes $T_A$ (tes darah) jauh lebih rendah daripada _cost_ untuk tes $T_B$ (MRI). Bagaimana algoritma DTL harus dimodifikasi untuk memastikan _tree_ yang dihasilkan lebih memilih _split_ pada $T_A$ di _root node_? (Gunakan konsep penyesuaian Gain).

**II.15. (Implikasi Pemilihan Jarak)** Anda memiliki data dimana fitur-fiturnya tidak dinormalisasi. Anda menggunakan Jarak Euclidean ($p=2$). Jelaskan apa yang terjadi jika salah satu fitur memiliki unit pengukuran 1000 kali lebih besar daripada fitur lainnya. (Hubungkan dengan konsep dominasi fitur).

> [!ad-libitum]- ## Kunci Jawaban
>
> ### Bagian I: Teori dan Konsep
>
> ### A. True/False
> 
> | No. | Pernyataan | Jawaban |
> |---|---|---|
> | I.1 | Algoritma k-Nearest Neighbor (kNN) tidak memerlukan Feature Scaling jika semua fitur numerik telah diubah menjadi nilai kategori menggunakan teknik Binning. | True |
> | I.2 | Information Gain (IG) memiliki bias untuk memilih atribut dengan banyak nilai unik. Solusi untuk bias ini adalah mengganti IG dengan metrik Gini Impurity. | False |
> | I.3 | Dalam DTL, strategi Pre-Pruning (penghentian awal) umumnya dianggap lebih sukses dalam praktik dibandingkan Post-Pruning (pangkas setelah overfit). | False |
> | I.4 | Curse of Dimensionality pada kNN menyebabkan jarak antar semua titik data cenderung semakin jauh dan sama, yang merusak konsep kedekatan. | True |
> | I.5 | Log Conditional Likelihood (LCL) adalah fungsi biaya (Cost Function) utama yang digunakan untuk melatih DTL. | False |
> 
> ### B. Multiple Choice Multiple Answer (MCMA)
> 
> **I.6.** B, D **I.7.** A, B, D **I.8.** A, C, D (Koreksi: Menggunakan uji statistik juga termasuk teknik _Post-Pruning_, jadi D juga benar) **I.9.** B, C **I.10.** C, D
> 
> ### C. Matching
> 
> | Istilah | Konsep yang Cocok |
> |---|---|
> | I.11. Euclidean Distance | Jarak yang digunakan kNN ketika data berdimensi tinggi dan tidak dinormalisasi. |
> | I.12. Lazy Learner | Algoritma yang menunda komputasi hingga fase prediksi. |
> | I.13. F1-Score | Rata-rata harmonik dari Precision dan Recall. |
> | I.14. Gain Ratio | Sebuah metrik yang menormalkan Information Gain untuk mengatasi bias. |
> | I.15. Recall | Jarak yang paling efektif meminimalkan False Negative (FN). |
> 
> ### Bagian II: Perhitungan dan Analisis Kasus
> 
> ### D. Perhitungan DTL (Berdasarkan C4.5 - Proporsi Known Values)
> 
> **II.1. Proporsi Data:**
> 
> - Total Data = 9
>     
> - Kelas Yes: 5 instans (D1, D3, D4, D5, D8)
>     
> - Kelas No: 4 instans (D2, D6, D7, D9)
>     
> - Proporsi: $p(\text{Yes}) = 5/9 \approx 0.5556$, $p(\text{No}) = 4/9 \approx 0.4444$  
>     
> 
> II.2. Entropy Awal ($\text{Entropy}(S)$):
> 
> $$\text{Entropy}(S) = - \left( \frac{5}{9} \log_2 \frac{5}{9} \right) - \left( \frac{4}{9} \log_2 \frac{4}{9} \right)$$$$\text{Entropy}(S) \approx - (0.5556 \times -0.848) - (0.4444 \times -1.169) \approx 0.471 + 0.520 = \mathbf{0.991 \text{ bits}}$$
> 
> **II.3. Data Known/Missing untuk Atr1:**
> 
> - Total Data Known (D1-D6, D8-D9): 8
>     
> - Total Data Missing (D7): 1
>     
> - Baris Data:
>     
> 	| Atr1 | Class |
> 	| :---: | :---: |
> 	| A | Yes (D1, D2, D8) |
> 	| B | Yes (D3, D4) No (D9) |
> 	| C | Yes (D5) No (D6) |
> 	| ? | No (D7) |
>     
> 
> **II.4. Information Gain (**$\text{Gain}(S, \text{Atr1})$**) dengan** _**Missing Value**_**:**
> 
> - **Data Known:** $N_{known} = 8$.
>     
> - **Data Missing:** $N_{missing} = 1$.
>     
> - **Faktor Koreksi Proporsi Known Value:** $\frac{N_{known}}{N_{total}} = \frac{8}{9}$.
>     
> 
> | Atr1 Value ($v$) | Data Subset ($S_v$) | Bobot $\|(S_v)\| / \|S_{known}\|$ | Kelas [Y, N] | $\text{Entropy}(S_v)$ |
> | :---: | :---: | :---: | :---: | :---: |
> | A | D1, D2, D8 | $3/8$ | [2, 1] | $-(2/3 \log_2 2/3) - (1/3 \log_2 1/3) \approx 0.918$ |
> | B | D3, D4, D9 | $3/8$ | [2, 1] | $-(2/3 \log_2 2/3) - (1/3 \log_2 1/3) \approx 0.918$ |
> | C | D5, D6 | $2/8$ | [1, 1] | 1.0 |
> 
> $$\text{Gain}_{\text{known}}(S, \text{Atr1}) = \text{Entropy}(S) - \sum_{v \in \{\text{A, B, C}\}} \frac{|S_v|}{N_{\text{known}}} \times \text{Entropy}(S_v)$$$$\text{Gain}_{\text{known}}(S, \text{Atr1}) \approx 0.991 - \left[ \frac{3}{8} \times 0.918 + \frac{3}{8} \times 0.918 + \frac{2}{8} \times 1.0 \right]$$$$\text{Gain}_{\text{known}}(S, \text{Atr1}) \approx 0.991 - [ 0.34425 + 0.34425 + 0.25 ] = 0.991 - 0.9385 \approx 0.0525$$$$\text{Gain}(S, \text{Atr1}) = \frac{8}{9} \times \text{Gain}_{\text{known}}(S, \text{Atr1}) \approx 0.8889 \times 0.0525 \approx \mathbf{0.0467}$$
> 
> II.5a. Split Information ($\text{SplitInformation}(S, \text{Atr1})$) - Missing Ignored
> 
> Hanya menggunakan 8 data yang diketahui (Atr1: 3 A, 3 B, 2 C).
> 
> $$\text{SplitInformation}(S, \text{Atr1}) = - \left( \frac{3}{8} \log_2 \frac{3}{8} \right) - \left( \frac{3}{8} \log_2 \frac{3}{8} \right) - \left( \frac{2}{8} \log_2 \frac{2}{8} \right)$$$$\text{SplitInformation}(S, \text{Atr1}) \approx - [ (0.375 \times -1.415) \times 2 + (0.25 \times -2.0) ]$$$$\text{SplitInformation}(S, \text{Atr1}) \approx - [ -1.061 + (-0.5) ] = \mathbf{1.561}$$
> 
> II.6a. Gain Ratio ($\text{GainRatio}(S, \text{Atr1})$):
> 
> $$\text{GainRatio}(S, \text{Atr1}) = \frac{\text{Gain}(S, \text{Atr1})}{\text{SplitInformation}(S, \text{Atr1})}$$$$\text{GainRatio}(S, \text{Atr1}) \approx \frac{0.0467}{1.561} \approx \mathbf{0.0299}$$
> 
> II.5b. Split Information ($\text{SplitInformation}(S, \text{Atr1})$) - Missing Included
> 
> 1. **Total Data $N=9$.**
> 2. **Pembagian Data:**
> 	- $|S_A| = 3$. Proporsi $3/9$.
> 	- $|S_B| = 3$. Proporsi $3/9$.
> 	- $|S_C| = 2$. Proporsi $2/9$.
> 	- $|S_{?}| = 1$. Proporsi $1/9$.
> 
> $$\text{SplitInformation}_{\text{Included}}(S, \text{Atr1}) = - \left( \frac{3}{9} \log_2 \frac{3}{9} \right) - \left( \frac{3}{9} \log_2 \frac{3}{9} \right) - \left( \frac{2}{9} \log_2 \frac{2}{9} \right) - \left( \frac{1}{9} \log_2 \frac{1}{9} \right)$$
> - $\log_2 (3/9) \approx -1.585$.
> - $\log_2 (2/9) \approx -2.170$.
> - $\log_2 (1/9) \approx -3.170$.
> 
> $$\text{SplitInformation}_{\text{Included}}(S, \text{Atr1}) \approx - [ (3/9 \times -1.585) + (3/9 \times -1.585) + (2/9 \times -2.170) + (1/9 \times -3.170) ]$$\
> $$\text{SplitInformation}_{\text{Included}}(S, \text{Atr1}) \approx - [ -0.528 + -0.528 + -0.482 + -0.352 ]$$
> $$\text{SplitInformation}_{\text{Included}}(S, \text{Atr1}) \approx \mathbf{1.89 \text{ bits}}$$
>
>
> Penting untuk dicatat bahwa ada dua cara standar untuk menghitung _Split Information_ dalam konteks _missing value_:
> 
> |**Prosedur**|**Perhitungan**|**Tujuan & Efek**|
> |---|---|---|
> |**1. Missing Ignored** |Hanya menggunakan data yang diketahui ($N_{\text{known}}$) dalam rumus.|Mengukur kompleksitas perpecahan hanya berdasarkan data yang **dapat diklasifikasikan** secara langsung.|
> |**2. Missing Included** |Memasukkan _missing_ sebagai kategori terpisah dalam rumus, menggunakan total data ($N$).|Mengukur kompleksitas total perpecahan, termasuk _cabang_ tambahan yang dibuat untuk menangani data yang hilang.|
>
> II.6b. Gain Ratio ($\text{GainRatio}(S, \text{Atr1})$):
> 
> $$\text{GainRatio}(S, \text{Atr1}) = \frac{\text{Gain}(S, \text{Atr1})}{\text{SplitInformation}(S, \text{Atr1})}$$$$\text{GainRatio}(S, \text{Atr1}) \approx \frac{0.0467}{1.89} \approx \mathbf{0.0247}$$
> 
> ### E. Simulasi kNN & Analisis
> 
> **II.7. Alasan Feature Scaling:**
> 
> - Jawab: Tidak bisa. Fitur `Gaji` (rentang 5-15, yaitu $10^7$) memiliki skala 1000x lebih besar daripada `Umur` (rentang 25-50, yaitu $10^1$). Dalam Jarak Euclidean, perbedaan pada `Gaji` akan dikuadratkan, menyebabkan fitur `Gaji` **mendominasi** perhitungan jarak dan secara efektif mengabaikan `Umur`. _Feature Scaling_ wajib agar kedua fitur berkontribusi secara adil.
>     
> 
> **II.8. Feature Scaling Min-Max untuk D_new:**
> 
> - Range Umur: $\min=25$, $\max=50$. Range Gaji: $\min=5$, $\max=15$.
>     
> - $\text{Umur}_{\text{scaled}} = \frac{35 - 25}{50 - 25} = \frac{10}{25} = \mathbf{0.4}$  
>     
> - $\text{Gaji}_{\text{scaled}} = \frac{12 - 5}{15 - 5} = \frac{7}{10} = \mathbf{0.7}$  
>     
> 
> **II.9. Jarak Total D_new dan D3:**
> 
> - $\text{Status}$ (Menikah vs Menikah): Hamming Distance = 0.
>     
> - $\text{Umur}_{\text{D3}}$ scaled: $\frac{40 - 25}{25} = 0.6$. $\text{Gaji}_{\text{D3}}$ scaled: $\frac{15 - 5}{10} = 1.0$.
>     
> - Jarak $\text{Umur Gaji}$ (Euclidean): $D_{\text{num}} = \sqrt{(0.4 - 0.6)^2 + (0.7 - 1.0)^2} = \sqrt{(-0.2)^2 + (-0.3)^2} = \sqrt{0.04 + 0.09} = \sqrt{0.13} \approx 0.36$.
>     
> - Jarak Total (Manhattan-like Sum): $\text{Jarak}_{\text{Total}} = D_{\text{status}} + D_{\text{num}} = 0 + 0.36 = \mathbf{0.36}$  
>     
> 
> **II.10. Prediksi Kelas (k=3):**
> 
> - Tetangga 1: D3 (Jarak 0.36) $\to$ Kelas A
>     
> - Tetangga 2: D1 (Jarak 0.5) $\to$ Kelas A
>     
> - Tetangga 3: D4 (Jarak 1.0) $\to$ Kelas B
>     
> - Voting: {A, A, B}. Mayoritas adalah **Kelas A**.
>     
> - Prediksi: **Kelas A**
>     
> 
> ### F. Esai Analisis Kasus Kritis
> 
> **II.11. (Analisis Konsep DTL & Outlier)**
> 
> - Jawab: DTL lebih robust karena fokusnya adalah pada **pengelompokan berdasarkan batas keputusan** (_threshold_), bukan pada _error_ kuadrat.
>     
>     - **DTL:** Saat DTL menentukan _split_ (misalnya, $\text{Suhu} < 30$), keputusan ini tidak peduli jika ada satu _outlier_ $\text{Suhu}=1000$. Selama batas 30 masih memberikan _Gain_ tertinggi, _outlier_ tersebut hanya akan berakhir di satu cabang (misal: $\text{Suhu} \ge 30$) dan tidak mengubah _split_ pada _root node_.
>         
>     - **Regresi Linear:** Mencari garis terbaik dengan **meminimalkan kuadrat error (LSE/MSE)**. _Outlier_ akan memiliki _error_ yang sangat besar, dan karena dikuadratkan, _outlier_ tersebut akan **menarik garis regresi secara paksa** (_leverage_) agar sedekat mungkin dengannya, merusak model secara keseluruhan.
>         
> 
> **II.12. (Justifikasi Pruning)**
> 
> - Jawab:
>     
>     - **Pre-Pruning (Stop Awal):** Bertujuan menghentikan pertumbuhan _tree_ sebelum mencapai _overfit_. Kelemahan: Sulit menentukan titik henti optimal, berisiko menghentikan _split_ yang sebenarnya bermanfaat.
>         
>     - **Post-Pruning (Pangkas Nanti):** Bertujuan membiarkan _tree_ tumbuh hingga _overfit_, lalu memotong cabang yang tidak signifikan.
>         
>     - **Mengapa** _**Post-Pruning**_ **Disukai:** _Post-Pruning_ (khususnya dengan _Validation Set_) lebih disukai karena model dapat melihat seluruh struktur data latih. _Validation Set_ memberikan metrik yang objektif untuk memutuskan apakah pemangkasan cabang tertentu akan meningkatkan generalisasi model. Ini menghindari kesalahan fatal _Pre-Pruning_ yang mungkin menghentikan _split_ bermanfaat di awal.
>         
> 
> **II.13. (Efek Nilai k pada kNN)**
> 
> - Jawab:
>     
>     - **k=1 (Extremely Small):** Model memiliki _Variance_ sangat **tinggi** dan _Bias_ sangat **rendah**. Karena hanya mengandalkan satu tetangga, batas keputusan menjadi sangat kompleks (non-linear) dan sangat sensitif (_overfit_) terhadap **noise** atau _outlier_ pada data latih.
>         
>     - **k=21 (Large):** Model memiliki _Variance_ sangat **rendah** dan _Bias_ sangat *_tinggi_. Model menjadi terlalu halus (_smooth_) dan cenderung memprediksi kelas mayoritas pada area yang luas, mengabaikan detail lokal yang penting. Ini menghasilkan model yang terlalu sederhana (_underfit_) dan kebal terhadap _noise_.
>         
> 
> **II.14. (Cost-Sensitive Learning)**
> 
> - Jawab: Algoritma DTL harus dimodifikasi dengan memasukkan _cost_ perolehan atribut ke dalam formula seleksi atribut, alih-alih hanya memaksimalkan _Gain_.
>     
> - **Penyesuaian Gain:** Gunakan formula yang **membagi atau mengurangi Gain dengan** _**Cost**_. Contoh penyesuaian yang disarankan: $\frac{\text{Gain}^2(S, A)}{\text{Cost}(A)}$ atau $\frac{2^{\text{Gain}(S, A)} - 1}{(\text{Cost}(A) + 1)^w}$.
>     
> - **Implikasi:** Karena $\text{Cost}(T_A) < \text{Cost}(T_B)$, $T_A$ akan mendapatkan nilai skor seleksi yang jauh lebih tinggi (karena dibagi dengan bilangan yang lebih kecil) daripada $T_B$ untuk _Gain_ yang setara, sehingga $T_A$ dipilih sebagai _root node_ terlebih dahulu.
>     
> 
> **II.15. (Implikasi Pemilihan Jarak)**
> 
> - Jawab: Jika satu fitur (misalnya, `Gaji` dengan skala $10^7$) memiliki unit 1000 kali lebih besar dari fitur lain (misalnya, `Umur` dengan skala $10^4$), dan kita menggunakan Jarak Euclidean:
>     
>     - **Dominasi Fitur:** Jarak Euclidean akan **didominasi sepenuhnya** oleh fitur dengan skala terbesar (`Gaji`).
>         
>     - **Contoh:** Selisih Umur $= 10$ dan Selisih Gaji $= 1000$. Jarak $D = \sqrt{10^2 + 1000^2} = \sqrt{100 + 1.000.000} \approx 1000.05$. Kontribusi 100 dari Umur menjadi tidak relevan.
>         
>     - **Hasil:** Model kNN secara efektif akan mengabaikan fitur `Umur` dan hanya memprediksi berdasarkan fitur `Gaji`, menghasilkan model yang bias dan mungkin tidak akurat.