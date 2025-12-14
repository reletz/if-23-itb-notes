_Back to_ [[Latihan UAS IF3170]]
# Problem Set: Probabilistic & Tree-Based Models (Eksplorasi Pruning)

**Mata Pelajaran:** Inteligensi Artifisial (IF3170)

**Topik:** Supervised Learning (Bayes, DTL) & Probabilistic Reasoning (BN)

**Estimasi Waktu:** 75 Menit

**Total Nilai:** 40 Poin

## Tujuan Pembelajaran

1. Menganalisis dampak **Missing Values** pada perhitungan probabilitas Naive Bayes.
    
2. Mendemonstrasikan proses **Reduced Error Pruning (REP)** secara manual untuk mengatasi overfitting pada Decision Tree.
    
3. Menganalisis independensi kondisional pada struktur **Bayesian Network** yang memiliki _loop_ (secara visual) atau struktur _diamond_.
    

## Petunjuk Umum

- Gunakan dataset **"Kredit Mikro"** di bawah ini. Dataset dibagi menjadi **Training Set** (untuk membangun model) dan **Validation Set** (untuk evaluasi/pruning).
    
- Tuliskan langkah perhitungan secara eksplisit.
    
- Bulatkan hasil akhir hingga **3 angka di belakang koma**.
    

## Dataset "Kredit Mikro"

Dataset ini digunakan untuk memprediksi kelayakan pemberian kredit (`Layak` / `Risiko`).

### A. Training Set (12 Data)

Digunakan untuk membangun Pohon Keputusan awal.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Skor_Kredit**|**Pendapatan**|**Jaminan**|**Layak (Target)**|
|1|Tinggi|Stabil|Ada|**Layak**|
|2|Tinggi|Stabil|Tidak|**Layak**|
|3|Tinggi|Tidak|Ada|**Layak**|
|4|Tinggi|Tidak|Tidak|**Risiko**|
|5|Rendah|Stabil|Ada|**Layak**|
|6|Rendah|Stabil|Tidak|**Risiko**|
|7|Rendah|Tidak|Ada|**Risiko**|
|8|Rendah|Tidak|Tidak|**Risiko**|
|9|Tinggi|Stabil|Ada|**Layak**|
|10|Rendah|Tidak|Tidak|**Risiko**|
|11|Rendah|Stabil|Tidak|**Risiko**|
|12|Tinggi|Tidak|Ada|**Layak**|

### B. Validation Set (4 Data)

Digunakan untuk menguji generalisasi dan melakukan pruning.

|   |   |   |   |   |
|---|---|---|---|---|
|**ID**|**Skor_Kredit**|**Pendapatan**|**Jaminan**|**Layak (Target)**|
|V1|Rendah|Stabil|Ada|**Risiko**|
|V2|Rendah|Stabil|Tidak|**Risiko**|
|V3|Tinggi|Stabil|Tidak|**Layak**|
|V4|Tinggi|Tidak|Tidak|**Risiko**|

### Soal 1. Naive Bayes: Handling Unknowns (10 Poin)

**Fokus:** Dampak data latih yang "bersih" terhadap data uji yang memiliki nilai atribut tak terduga (_noise/missing_).

Gunakan Training Set (12 data) untuk melatih model Naive Bayes.

Terdapat nasabah baru dengan data: X = <Skor_Kredit=Rendah, Pendapatan=?, Jaminan=Ada>.

(Nilai Pendapatan hilang/tidak diketahui).

**Pertanyaan:**

a. **(Skenario "Missing at Prediction")** Jika kita mengabaikan atribut `Pendapatan` (hanya menggunakan Skor_Kredit dan Jaminan), hitung prediksi kelas untuk nasabah **X** menggunakan Naive Bayes (gunakan Laplace Smoothing $\alpha=1$ agar aman).

b. **(Skenario "Imputasi")** Jika kita memutuskan untuk mengisi nilai `?` pada Pendapatan dengan nilai **Modus** (nilai terbanyak muncul) dari atribut Pendapatan di Training Set, apakah prediksi kelasnya akan berubah? Tunjukkan perhitungannya.

c. **(Analisis)** Bandingkan kedua pendekatan di atas. Pendekatan mana yang menurut Anda lebih berisiko dalam konteks pemberian kredit? Mengapa?

### Soal 2. Decision Tree & Reduced Error Pruning (12 Poin)

**Fokus:** Membuktikan bahwa pohon yang lebih pendek (pruned) bisa lebih akurat daripada pohon lengkap.

**Pertanyaan:**

a. **(Konstruksi Pohon Penuh)** Bangunlah sebuah **Decision Tree** menggunakan algoritma ID3 berdasarkan **Training Set**.

- Gunakan `Skor_Kredit` sebagai **Root Node**.
    
- Lanjutkan percabangan hingga semua leaf node murni (Entropy=0) atau atribut habis.
    
- _Hint: Perhatikan cabang "Rendah" -> "Stabil". Pastikan cabang ini dipecah jika tidak murni._
    
- Gambarkan pohon hasil training tersebut.
    

b. **(Evaluasi Pohon Penuh)** Gunakan **Validation Set** (V1, V2, V3, V4) untuk menguji akurasi pohon penuh yang Anda buat di poin (a).

- Telusuri pohon untuk setiap data validasi.
    
- Hitung berapa banyak prediksi yang BENAR dan SALAH.
    
- Hitung Akurasi Validasi (Jumlah Benar / 4).
    

c. **(Reduced Error Pruning)** Lakukan analisis pruning pada node cabang **"Skor_Kredit=Rendah -> Pendapatan=Stabil"**.

1. **Tentukan Mayoritas:** Apa kelas mayoritas dari data **Training** yang sampai di node ini? (Jadikan ini prediksi jika node dijadikan leaf).
    
2. **Evaluasi Pruning:** Jika node ini dipangkas (diganti menjadi Leaf Node berisi kelas mayoritas), hitung ulang prediksi untuk data validasi yang relevan (V1 dan V2).
    
3. **Keputusan:** Apakah akurasi validasi meningkat, menurun, atau tetap setelah pemangkasan? Haruskah pruning dilakukan?
    

### Soal 3. Bayesian Network: The "Diamond" Structure (8 Poin)

**Fokus:** Analisis independensi pada struktur yang memiliki jalur ganda (_multiple paths_).

Perhatikan struktur BN berikut:

```
graph TD;
    A[Ekonomi Makro] --> B[Kinerja Perusahaan];
    A --> C[Sentimen Pasar];
    B --> D[Harga Saham];
    C --> D;
```

_(Struktur Diamond: A mempengaruhi B dan C. B dan C bersama-sama mempengaruhi D)._

**Pertanyaan:**

1. **Analisis Jalur:** Sebutkan ada berapa jalur yang menghubungkan node **Ekonomi Makro (A)** dan **Harga Saham (D)**? Sebutkan node perantara di setiap jalurnya.
    
2. **Independensi (Blocking):**
    
    - Apakah **Kinerja Perusahaan (B)** dan **Sentimen Pasar (C)** independen jika **Ekonomi Makro (A)** _TIDAK DIKETAHUI_? Jelaskan.
        
    - Apakah **Kinerja Perusahaan (B)** dan **Sentimen Pasar (C)** independen jika **Ekonomi Makro (A)** _DIKETAHUI_? Jelaskan dampaknya terhadap aliran informasi dari B ke C (apakah terblokir di A?).
        
3. **V-Structure Effect:**
    
    - Jika **Harga Saham (D)** _DIKETAHUI_ (Observed), bagaimana status hubungan antara **Kinerja Perusahaan (B)** dan **Sentimen Pasar (C)**? Apakah mereka menjadi dependen? Jelaskan fenomena _Explaining Away_ dalam konteks harga saham ini.
        

### Soal 4. Isu DTL: Atribut Kontinu & Split Point (6 Poin)

**Fokus:** Memahami bagaimana algoritma menentukan titik potong.

Misalkan kita punya atribut kontinu tambahan Usia dengan data training terurut dan kelasnya sebagai berikut:

22(R), 24(R), 25(L), 28(L), 30(L), 35(R), 40(R)

(R=Risiko, L=Layak).

1. **Identifikasi Kandidat Split:** Sebutkan nilai-nilai _threshold_ (titik tengah) yang akan dievaluasi oleh algoritma C4.5 sebagai kandidat _splitting point_.
    
2. **Evaluasi Lokal:** Tanpa menghitung Gain lengkap, threshold mana yang menurut Anda paling buruk untuk dipilih? Mengapa? (Tinjau dari sisi pemisahan kelompok mayoritas).
    

### Soal 5. Konsep Dasar (4 Poin)

**Fokus:** Pemahaman fundamental.

1. **Pernyataan:** Post-Pruning selalu menghasilkan pohon yang ukurannya lebih kecil atau sama dengan pohon awal, tidak mungkin lebih besar.
    
    - **Jawaban:** ________
        
    - **Alasan:** ________
        
2. **Pernyataan:** Jika dua variabel A dan B memiliki nilai _Covariance_ nol, maka mereka pasti Independen dalam konteks Probabilitas Bayesian.
    
    - **Jawaban:** ________
        
    - **Alasan:** ________
        

> [!ad-libitum]- # Kunci Jawaban & Rubrik Penilaian
>
> ### Soal 1. Naive Bayes: Handling Unknowns (10 Poin)
> 
> **Statistik Training Set (12 Data):**
> 
> - **Layak (L):** 6 data (1,2,3,5,9,12). Prior = 0.5.
>     
> - **Risiko (R):** 6 data (4,6,7,8,10,11). Prior = 0.5.
>     
> 
> a. Mengabaikan Pendapatan (Smoothing $\alpha=1$):
> 
> X = <Skor=Rendah, Jaminan=Ada>
> 
> - **Kelas Layak:**
>     
>     - $P(\text{Rendah}|\text{L})$: Data(5) = 1. Sm: $(1+1)/(6+2) = 2/8$.
>         
>     - $P(\text{Ada}|\text{L})$: Data(1,3,5,9,12) = 5. Sm: $(5+1)/(6+2) = 6/8$.
>         
>     - Score L $\propto 0.5 \times 0.25 \times 0.75 = \mathbf{0.094}$.
>         
> - **Kelas Risiko:**
>     
>     - $P(\text{Rendah}|\text{R})$: Data(6,7,8,10,11) = 5. Sm: $(5+1)/(6+2) = 6/8$.
>         
>     - $P(\text{Ada}|\text{R})$: Data(7) = 1. Sm: $(1+1)/(6+2) = 2/8$.
>         
>     - Score R $\propto 0.5 \times 0.75 \times 0.25 = \mathbf{0.094}$.
>         
> - **Hasil:** Seimbang (**Tie**). Model ragu-ragu karena bukti saling bertentangan (Skor Rendah $\to$ Risiko, Jaminan Ada $\to$ Layak).
>     
> 
> **b. Imputasi Modus:**
> 
> - Modus `Pendapatan` di Training:
>     
>     - Stabil: 1,2,5,6,9,11 (6 data).
>         
>     - Tidak: 3,4,7,8,10,12 (6 data).
>         
>     - _Modus ganda_. Mari asumsikan kita ambil **"Stabil"** (karena urutan/alfabet) atau anggap seri. Jika ambil Stabil:
>         
> - **Hitung Likelihood Pendapatan=Stabil:**
>     
>     - $P(\text{Stabil}|\text{L})$: Data(1,2,5,9) = 4. Sm: $(4+1)/(6+2) = 5/8$.
>         
>     - $P(\text{Stabil}|\text{R})$: Data(6,11) = 2. Sm: $(2+1)/(6+2) = 3/8$.
>         
> - **Posterior Baru:**
>     
>     - Score L $\propto 0.094 \times 5/8 = \mathbf{0.059}$.
>         
>     - Score R $\propto 0.094 \times 3/8 = \mathbf{0.035}$.
>         
> - **Hasil:** **Layak**. (Informasi tambahan "Stabil" mendorong ke arah Layak).
>     
> 
> **c. Analisis:**
> 
> - Pendekatan Imputasi lebih berisiko jika asumsi modusnya salah. Dalam kasus kredit, salah prediksi "Layak" (False Positive) mengakibatkan gagal bayar. Mengabaikan atribut (poin a) mencerminkan ketidakpastian yang sebenarnya (hasil seri), yang bisa menjadi sinyal untuk tinjauan manual, yang lebih aman.
>     
> 
> ### Soal 2. Decision Tree & REP (12 Poin)
> 
> **a. Konstruksi Pohon Penuh (Training):**
> 
> - **Root: Skor_Kredit**
>     
>     - **Tinggi:** {1,2,3,4,9,12}. (5 Layak, 1 Risiko).
>         
>         - Cek `Pendapatan`:
>             
>             - Stabil (1,2,9) $\to$ Layak. (Murni)
>                 
>             - Tidak (3,4,12) $\to$ {3,12 Layak, 4 Risiko}. Split by `Jaminan`.
>                 
>                 - Ada (3,12) $\to$ Layak.
>                     
>                 - Tidak (4) $\to$ Risiko.
>                     
>     - **Rendah:** {5,6,7,8,10,11}. (1 Layak, 5 Risiko).
>         
>         - Cek `Pendapatan`:
>             
>             - **Stabil** (5,6,11) $\to$ {5 Layak, 6,11 Risiko}. **(Impure)**.
>                 
>                 - Split by `Jaminan`:
>                     
>                     - Ada (5) $\to$ **Layak**.
>                         
>                     - Tidak (6,11) $\to$ **Risiko**.
>                         
>             - **Tidak** (7,8,10) $\to$ Risiko. (Murni).
>                 
> 
> **Gambar Struktur Cabang "Rendah":**
> 
> ```
> ...
> ├── Rendah
> │   ├── Pendapatan = Tidak --> [Leaf: Risiko]
> │   └── Pendapatan = Stabil
> │       ├── Jaminan = Ada   --> [Leaf: Layak]  <-- Data 5 (Noise Pattern)
> │       └── Jaminan = Tidak --> [Leaf: Risiko]
> ...
> ```
> 
> **b. Evaluasi Pohon Penuh (Validation):**
> 
> - **V1 (Rendah, Stabil, Ada)** $\to$ **Risiko:**
>     
>     - Masuk cabang: Rendah $\to$ Stabil $\to$ Jaminan=Ada $\to$ Leaf: **Layak**.
>         
>     - Prediksi: Layak. Aktual: Risiko. **(SALAH)**.
>         
> - **V2 (Rendah, Stabil, Tidak)** $\to$ **Risiko:**
>     
>     - Masuk cabang: Rendah $\to$ Stabil $\to$ Jaminan=Tidak $\to$ Leaf: **Risiko**.
>         
>     - Prediksi: Risiko. Aktual: Risiko. **(BENAR)**.
>         
> - **V3 (Tinggi, Stabil, Tidak)** $\to$ **Layak:** (Masuk cabang Tinggi $\to$ Stabil $\to$ Layak). **(BENAR)**.
>     
> - **V4 (Tinggi, Tidak, Tidak)** $\to$ **Risiko:** (Masuk cabang Tinggi $\to$ Tidak $\to$ Jaminan=Tidak $\to$ Risiko). **(BENAR)**.
>     
> - **Akurasi Validasi Awal:** 3/4 = **75%**.
>     
> 
> **c. Reduced Error Pruning:**
> 
> 1. **Mayoritas Training:** Di node "Rendah $\to$ Stabil", data trainingnya adalah {5(L), 6(R), 11(R)}. Mayoritas = **Risiko** (2 vs 1).
>     
> 2. **Evaluasi Pruning:** Ubah node "Rendah $\to$ Stabil" menjadi Leaf Node **Risiko**.
>     
>     - Cek V1 (Rendah, Stabil, Ada): Masuk ke Leaf baru $\to$ Prediksi: **Risiko**. Aktual: Risiko. **(JADI BENAR)**.
>         
>     - Cek V2 (Rendah, Stabil, Tidak): Masuk ke Leaf baru $\to$ Prediksi: **Risiko**. Aktual: Risiko. **(TETAP BENAR)**.
>         
> 3. **Keputusan:**
>     
>     - Akurasi Baru = 4/4 = **100%**.
>         
>     - Karena akurasi meningkat (75% $\to$ 100%), maka **PRUNING DILAKUKAN**.
>         
> 
> ### Soal 3. Bayesian Network (8 Poin)
> 
> 4. **Analisis Jalur:** Ada 2 jalur dari A ke D.
>     
>     - Jalur 1: A $\to$ B $\to$ D.
>         
>     - Jalur 2: A $\to$ C $\to$ D.
>         
> 5. **Independensi (Blocking):**
>     
>     - **A Tidak Diketahui:** B dan C **Dependen**. A adalah _Common Cause_ (Diverging). Variasi pada B memberi info tentang A, yang kemudian memberi info tentang C.
>         
>     - **A Diketahui:** B dan C **Independen**. Mengetahui _Common Cause_ memblokir aliran informasi antar efeknya. (Kecuali jika ada jalur lain lewat D yang terbuka).
>         
> 6. **V-Structure Effect (Collider):**
>     
>     - Di node D, strukturnya adalah B $\to$ D $\leftarrow$ C (Converging).
>         
>     - Jika **D Diketahui**, maka jalur B-C lewat D menjadi **AKTIF**. B dan C menjadi **Dependen**.
>         
>     - _Explaining Away:_ Jika Harga Saham (D) naik, dan kita tahu Kinerja Perusahaan (B) _buruk_, maka probabilitas Sentimen Pasar (C) _baik_ akan meningkat drastis untuk "menjelaskan" kenaikan harga tersebut.
>         
> 
> ### Soal 4. Isu DTL: Atribut Kontinu (6 Poin)
> 
> 7. **Kandidat Threshold:** Titik tengah antara perubahan kelas.
>     
>     - 22(R), 24(R) $\to$ Tidak ada.
>         
>     - 24(R) ke 25(L) $\to$ **24.5**.
>         
>     - 25(L), 28(L), 30(L) $\to$ Tidak ada.
>         
>     - 30(L) ke 35(R) $\to$ **32.5**.
>         
>     - 35(R), 40(R) $\to$ Tidak ada.
>         
>     - Kandidat: **24.5** dan **32.5**.
>         
> 8. **Evaluasi Lokal:** Threshold **32.5** memisahkan data menjadi {<=32.5: 2R, 3L} dan {>32.5: 2R}. Sisi kiri sangat tidak murni (campuran). Threshold **24.5** memisahkan {<=24.5: 2R} dan {>24.5: 3L, 2R}.
>     
>     - Secara visual, threshold 32.5 buruk karena membiarkan mayoritas data (kiri) dalam keadaan tercampur. Namun, perhitungan Gain harus dilakukan untuk memastikan.
>         
> 
> ### Soal 5. Konsep Dasar (4 Poin)
> 
> 9. **BENAR.** Pruning adalah proses _penghapusan_ atau _penggantian_ subtree dengan leaf. Struktur pohon hanya bisa berkurang atau tetap (jika tidak ada yang diprune), tidak bisa bertambah.
>     
> 10. **SALAH.** Covariance hanya mengukur hubungan **linear**. Dua variabel bisa memiliki Covariance nol tapi tetap dependen secara non-linear (misal $Y = X^2$). Dalam Bayes, independensi berarti $P(A|B) = P(A)$, yang mencakup semua jenis hubungan, bukan hanya linear.