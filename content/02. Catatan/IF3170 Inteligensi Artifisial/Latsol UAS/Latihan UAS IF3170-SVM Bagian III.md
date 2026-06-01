_Back to_ [[Latihan UAS IF3170]]

# Problem Set: Support Vector Machine

**Mata Pelajaran:** Machine Learning / Inteligensi Artifisial

**Topik:** Advanced SV Selection & Multi-class Strategies (OvR vs OvO)

**Estimasi Waktu:** 75-90 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. **Menganalisis** dataset yang lebih padat (8 titik) untuk mengidentifikasi _boundary_ dan menyingkirkan _redundant data_ sebelum perhitungan.
    
2. **Menyelesaikan** SPL dengan 3 variabel $\alpha$ (kasus 3 Support Vector) secara manual.
    
3. **Menerapkan** dan **membandingkan** strategi _One-vs-Rest_ (OvR) dan _One-vs-One_ (OvO) untuk klasifikasi multi-kelas.
    
4. **Mengevaluasi** kelebihan dan kekurangan masing-masing strategi multi-kelas dalam konteks komputasi dan keseimbangan data.
    

## Petunjuk Umum

- Anda dituntut untuk memiliki intuisi visual yang kuat sebelum melakukan perhitungan.
    
- Pada Nomor 2, Anda tidak diminta menghitung nilai $\alpha$ detail, melainkan menyusun arsitektur dan logika keputusan sistem Multi-class.
    

## BAGIAN I: Linear SVM dengan Seleksi Data Masif

**Bobot: 50 Poin** **Fokus:** Efisiensi seleksi data. Dari banyak data, hanya sedikit yang berguna (Sparsity of SVM).

### Soal 1. Finding the "Golden Three"

Diketahui dataset 2D dengan **8 titik data** sebagai berikut:

|   |   |
|---|---|
|**Kelas Negatif (-1)**|**Kelas Positif (+1)**|
|$N_1 = (3, 0)$|$P_1 = (2, 2)$|
|$N_2 = (2, -1)$|$P_2 = (4, 2)$|
|$N_3 = (4, -1)$|$P_3 = (3, 3)$|
|$N_4 = (3, -2)$|$P_4 = (3, 4)$|

Tugas Anda adalah menemukan _Optimal Separating Hyperplane_. Jangan hitung semua! Temukan 3 titik kuncinya (2 dari satu kelas, 1 dari kelas lain) yang menjepit batas.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi/Pertanyaan**|**Isian / Jawaban**|
|**1**|**Visualisasi & Eliminasi (Mental Sandbox)**<br><br>  <br><br>Bayangkan atau sketsa posisi titik-titik tersebut.<br><br>  <br><br>1. Identifikasi "Garis Depan" kelas Positif (titik yang paling bawah/dekat dengan negatif).<br><br>  <br><br>2. Identifikasi "Garis Depan" kelas Negatif (titik yang paling atas/dekat dengan positif).<br><br>  <br><br>Sebutkan 3 titik yang menjadi kandidat kuat Support Vector (SV).|**Titik Positif Terdepan:**<br><br>  <br><br>1. $\dots$  <br><br>  <br><br>2. $\dots$ (Ada 2 titik sejajar paling bawah di kelas +1)<br><br>  <br><br>  <br><br>**Titik Negatif Terdepan:**<br><br>  <br><br>1. $\dots$ (Titik paling atas di kelas -1)<br><br>  <br><br>  <br><br>**Kandidat SV:** $\dots, \dots, \dots$|
|**2**|**Formulasi SPL (3 Variabel)**<br><br>  <br><br>Gunakan 3 kandidat SV dari Langkah 1.<br><br>  <br><br>Rumus: $\sum \alpha_j y_j (x_j \cdot x_i) + b = y_i$  <br><br>  <br><br>Susun 3 persamaan linear untuk masing-masing titik $i$.|**Persamaan 1 (SV Positif A):**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 + b = 1$  <br><br>  <br><br>  <br><br>**Persamaan 2 (SV Positif B):**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 + b = 1$  <br><br>  <br><br>  <br><br>**Persamaan 3 (SV Negatif):**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 + b = -1$|
|**3**|**Persamaan Constraint**<br><br>  <br><br>Syarat $\sum \alpha_i y_i = 0$.|$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 = 0$  <br><br>  <br><br>Hubungan yang didapat: $\alpha_3 = \dots$|
|**4**|**Solusi SPL**<br><br>  <br><br>Gunakan teknik eliminasi/substitusi.<br><br>  <br><br>_Hint: Kurangi Persamaan 1 dengan Persamaan 2 untuk melihat hubungan_ $\alpha_1$ _dan_ $\alpha_2$_._|1. $(Eq1) - (Eq2) \Rightarrow \dots \Rightarrow \alpha_1 = \alpha_2$  <br><br>  <br><br>2. Substitusi ke Constraint: $\alpha_3 = \dots \alpha_1$  <br><br>  <br><br>3. Masukkan semua ke salah satu persamaan awal untuk cari $\alpha_1$.<br><br>  <br><br>  <br><br>**Hasil:**<br><br>  <br><br>$\alpha_1 = \dots ; \quad \alpha_2 = \dots ; \quad \alpha_3 = \dots$  <br><br>  <br><br>$b = \dots$|
|**5**|**Analisis Hasil (**$w$**)**<br><br>  <br><br>Hitung $w$ dan jelaskan bentuk garis pemisahnya.<br><br>  <br><br>Apakah garisnya horizontal, vertikal, atau miring?|$w = \sum \alpha_i y_i x_i = \dots$  <br><br>  <br><br>Persamaan garis: $f(x) = \dots$  <br><br>  <br><br>**Bentuk Garis:** $\dots$ (Horizontal/Vertikal/Miring)|

## BAGIAN II: Multi-class SVM Strategies

**Bobot: 50 Poin** **Fokus:** Perancangan arsitektur klasifikasi untuk data > 2 kelas (Apel, Jeruk, Mangga).

### Soal 2. One-vs-Rest (OvR) vs One-vs-One (OvO)

Kita memiliki dataset dengan **3 Kelas**:

- **Kelas A (Apel)**
    
- **Kelas B (Batu)**
    
- **Kelas C (Cacing)**
    

Anda diminta merancang sistem klasifikasi menggunakan SVM.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi/Pertanyaan**|**Isian / Jawaban**|
|**1**|**Skenario** One-vs-Rest **(OvR)**<br><br>  <br><br>Strategi ini melatih 1 model per kelas.<br><br>  <br><br>Tuliskan daftar model (Binary Classifier) yang harus dilatih dan apa yang dipisahkan oleh masing-masing model.|**Model 1:** Melatih Kelas **A** vs Kelas **(B + C)**<br><br>  <br><br>**Model 2:** Melatih Kelas $\dots$ vs Kelas $\dots$  <br><br>  <br><br>**Model 3:** Melatih Kelas $\dots$ vs Kelas $\dots$  <br><br>  <br><br>  <br><br>**Total Model:** $\dots$ buah.|
|**2**|**Keputusan OvR**<br><br>  <br><br>Misalkan ada data baru $x_{new}$.<br><br>  <br><br>Output skor ($w \cdot x + b$) dari ketiga model adalah:<br><br>  <br><br>- Model A: $0.8$  <br><br>  <br><br>- Model B: $-0.2$  <br><br>  <br><br>- Model C: $-0.5$  <br><br>  <br><br>Kelas mana yang dipilih? Jelaskan mekanismenya.|**Kelas Pemenang:** $\dots$  <br><br>  <br><br>**Alasan:** (Jelaskan konsep _Confidence Score_ / _Max Wins_ pada OvR)|
|**3**|**Skenario One-vs-One (OvO)**<br><br>  <br><br>Strategi ini melatih model untuk setiap _pasangan_ kelas.<br><br>  <br><br>Tuliskan daftar model yang harus dilatih.|**Model 1:** Kelas A vs Kelas B<br><br>  <br><br>**Model 2:** Kelas $\dots$ vs Kelas $\dots$  <br><br>  <br><br>**Model 3:** Kelas $\dots$ vs Kelas $\dots$  <br><br>  <br><br>  <br><br>**Total Model:** $\dots$ buah.|
|**4**|**Keputusan OvO (Voting)**<br><br>  <br><br>Misalkan data baru $x_{new}$ diuji:<br><br>  <br><br>- Model (A vs B) $\to$ A menang<br><br>  <br><br>- Model (A vs C) $\to$ C menang<br><br>  <br><br>- Model (B vs C) $\to$ B menang<br><br>  <br><br>Siapa pemenangnya? Jelaskan masalah yang mungkin timbul di sini.|**Hasil Voting:**<br><br>  <br><br>A: 1 poin<br><br>  <br><br>B: $\dots$ poin<br><br>  <br><br>C: $\dots$ poin<br><br>  <br><br>**Masalah:** Terjadi kondisi $\dots$. Bagaimana cara SVM menyelesaikannya? (Sebutkan satu cara, misal: _confidence sum_ atau _DAG_).|
|**5**|**Analisis Komparatif (Final)**<br><br>  <br><br>Bandingkan kedua strategi ini. Kapan harus pakai OvR, kapan OvO?<br><br>  <br><br>Isi tabel perbandingan di samping.||

**Tabel Langkah 5: Perbandingan Strategi**

|**Fitur**|**One-vs-Rest (OvR)**|**One-vs-One (OvO)**|
|---|---|---|
|**Jumlah Model** (untuk $K$ kelas)|$\dots$|$\dots$|
|**Ukuran Data Training per Model**|||
|**Masalah Imbalanced Data**|||
|**Waktu Training**|||
|**Rekomendasi Penggunaan**|||

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I: Linear SVM (8 Titik)
> 
> |   |   |   |
> |---|---|---|
> |**Langkah**|**Jawaban Kunci**|**Poin**|
> |**1**|**Visualisasi:**<br><br>  <br><br>Kelas +1 ada di atas ($y \ge 2$). Garis depannya adalah $P_1(2,2)$ dan $P_2(4,2)$. ($P_3, P_4$ di belakang).<br><br>  <br><br>Kelas -1 ada di bawah ($y \le 0$). Garis depannya adalah $N_1(3,0)$. ($N_2, N_3, N_4$ di belakang).<br><br>  <br><br>**SV:** $P_1(2,2)$, $P_2(4,2)$, $N_1(3,0)$.|10|
> |**2**|Dot Product:<br><br>  <br><br>$P_1 \cdot P_1 = 8$, $P_2 \cdot P_2 = 20$, $N_1 \cdot N_1 = 9$  <br><br>  <br><br>$P_1 \cdot P_2 = 12$, $P_1 \cdot N_1 = 6$, $P_2 \cdot N_1 = 12$  <br><br>  <br><br>  <br><br>Persamaan (dengan $y$):<br><br>  <br><br>(1) $8\alpha_1 + 12\alpha_2 - 6\alpha_3 + b = 1$  <br><br>  <br><br>(2) $12\alpha_1 + 20\alpha_2 - 12\alpha_3 + b = 1$  <br><br>  <br><br>(3) $-6\alpha_1 - 12\alpha_2 + 9\alpha_3 + b = -1$|15|
> |**3**|$\alpha_1(1) + \alpha_2(1) + \alpha_3(-1) = 0 \Rightarrow \mathbf{\alpha_3 = \alpha_1 + \alpha_2}$|5|
> |**4**|Kurangi (2)-(1): $4\alpha_1 + 8\alpha_2 - 6\alpha_3 = 0$.<br><br>  <br><br>Substitusi $\alpha_3 = \alpha_1 + \alpha_2$ ke hasil di atas:<br><br>  <br><br>$4\alpha_1 + 8\alpha_2 - 6(\alpha_1 + \alpha_2) = 0 \Rightarrow -2\alpha_1 + 2\alpha_2 = 0 \Rightarrow \mathbf{\alpha_1 = \alpha_2}$.<br><br>  <br><br>  <br><br>Maka $\alpha_3 = 2\alpha_1$. Substitusi semua ke (1):<br><br>  <br><br>$8\alpha_1 + 12\alpha_1 - 6(2\alpha_1) + b = 1 \Rightarrow 8\alpha_1 + b = 1$  <br><br>  <br><br>Substitusi ke (3):<br><br>  <br><br>$-6\alpha_1 - 12\alpha_1 + 9(2\alpha_1) + b = -1 \Rightarrow b = -1$  <br><br>  <br><br>  <br><br>**Solusi:** $b = -1$.<br><br>  <br><br>$8\alpha_1 - 1 = 1 \Rightarrow \alpha_1 = 0.25$.<br><br>  <br><br>$\alpha_2 = 0.25$, $\alpha_3 = 0.5$.|15|
> |**5**|$w = 0.25(2,2) + 0.25(4,2) - 0.5(3,0)$  <br><br>  <br><br>$w = (0.5, 0.5) + (1, 0.5) - (1.5, 0) = (0, 1)$.<br><br>  <br><br>**Analisis:** Vektor bobot $(0,1)$ berarti garis normal ke atas.<br><br>  <br><br>Garis pemisah: $0x_1 + 1x_2 - 1 = 0 \Rightarrow y = 1$.<br><br>  <br><br>**Bentuk:** Horizontal. Memisahkan $y=2$ dan $y=0$ tepat di tengah ($y=1$).|5|
> 
> ### Bagian II: Multi-class SVM
> 
> |**Langkah**|**Jawaban Kunci**|**Poin**|
> |---|---|---|
> |**1**|Model 2: B vs (A+C); Model 3: C vs (A+B). Total 3 Model (sama dengan jumlah kelas $K$).|5|
> |**2**|**Kelas A.** Karena memiliki nilai confidence score paling tinggi/positif (0.8). OvR memilih model yang paling "yakin" bahwa data tersebut adalah miliknya.|10|
> |**3**|Model 2: A vs C; Model 3: B vs C. Total 3 Model (Rumus $\frac{K(K-1)}{2}$).|5|
> |**4**|Hasil Voting: A=1, B=1, C=1. **Masalah:** Seri (Tie).<br><br>  <br><br>Solusi: Menggunakan nilai probabilitas/confidence dari masing-masing duel untuk pembobotan, atau menggunakan struktur DAG (Directed Acyclic Graph).|10|
> |**5**|**Jumlah Model:** OvR = $K$; OvO = $K(K-1)/2$.<br><br>  <br><br>**Masalah Imbalance:** OvR Rentan; OvO Lebih Stabil.<br><br>  <br><br>**Waktu Training:** OvR Lambat (Data besar); OvO Cepat (Data terpecah).<br><br>  <br><br>**Rekomendasi:** OvR untuk Linear/Simple; OvO untuk Kernel/Complex (default LibSVM/Sklearn).|20|
> 
## Tips Pengerjaan Paket C

1. **Jangan Terjebak Noise:** Titik seperti $(3, -2)$ atau $(3, 4)$ di soal nomor 1 sengaja diletakkan jauh dari perbatasan. Jika Anda memasukkan mereka ke perhitungan SPL, Anda hanya akan mempersulit diri sendiri. Support Vector selalu berada di "barisan terdepan" pertempuran antar kelas.
    
2. **Cek Logika** $w$**:** Di Soal 1, karena datanya simetris kiri-kanan (pusat di $x=3$) tapi terpisah atas-bawah, maka wajar jika $w$ hanya punya komponen $y$ (komponen $x$ nol). Garisnya mendatar.
    
3. **Hafalan Multi-class:**
    
    - **OvR (One-vs-Rest):** "Saya lawan Dunia". (Rentan depresi/imbalance).
        
    - **OvO (One-vs-One):** "Turnamen Duel". (Adil, tapi banyak pertandingan).
        

### Red Flags 🚩

- ❌ **Salah identifikasi SV:** Jika Anda memilih titik $(3, 4)$ sebagai SV, hasil $\alpha$ nanti akan negatif (melanggar syarat SVM) atau SPL tidak konsisten.
    
- ❌ **Menjumlahkan Model OvO:** Jangan bilang "Model A vs B ditambah Model B vs C". Model SVM berdiri sendiri-sendiri, keputusannya digabung lewat Voting.