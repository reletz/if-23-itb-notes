_Back to_ [[Latihan UAS IF3170]]
# Problem Set: Support Vector Machine

**Mata Pelajaran:** Machine Learning / Inteligensi Artifisial

**Topik:** SVM Linear & Non-Linear (Kernel)

**Estimasi Waktu:** 45-60 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. **Menerapkan** metode Sistem Persamaan Linear (SPL) untuk mencari parameter SVM ($\alpha$ dan $b$) secara manual.
    
2. **Menghitung** Gram Matrix (Dot Product) antar vektor fitur.
    
3. **Menganalisis** transformasi data menggunakan Kernel Trick untuk data yang tidak terpisah secara linear.
    
4. **Menentukan** hyperplane optimal serta fungsi keputusan akhir.
    

## Petunjuk Umum

- Problem set ini dirancang dengan format **Guided Discovery** (Terpandu).
    
- Ikuti langkah-langkah pada tabel yang disediakan secara berurutan.
    
- Tuliskan perhitungan detail pada kertas buram jika kolom "Isian/Jawaban" tidak muat, namun pastikan hasil akhir ditulis di tabel.
    
- Gunakan pecahan (misal: $1/4$) atau desimal (misal: $0.25$) secara konsisten.
    

## BAGIAN I: SVM Linear (Hard Margin)

**Bobot: 50 Poin** **Fokus:** Menyelesaikan SVM dengan menyusun dan menyelesaikan Sistem Persamaan Linear (SPL) dari syarat batas Support Vector.

### Soal 1. Penyelesaian dengan Sistem Persamaan Linear (SPL)

Diketahui dataset 2D sederhana yang _linearly separable_ sebagai berikut:

- **Kelas Positif (+1):** $x_1 = (2, 0)$, $x_2 = (0, 2)$  
    
- **Kelas Negatif (-1):** $x_3 = (0, 0)$  
    

Asumsikan ketiga titik tersebut adalah **Support Vector**. Selesaikan pencarian hyperplane optimal dengan mengisi tabel berikut:

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi/Pertanyaan**|**Isian / Jawaban**|
|**1**|**Hitung Gram Matrix (Dot Product)**<br><br>  <br><br>Hitunglah nilai $x_i \cdot x_j$ yang diperlukan untuk persamaan:<br><br>  <br><br>- $x_1 \cdot x_1$  <br><br>  <br><br>- $x_2 \cdot x_2$  <br><br>  <br><br>- $x_3 \cdot x_3$  <br><br>  <br><br>- Interaksi silang dengan $x_3$ (karena $x_3=(0,0)$)|$x_1 \cdot x_1 = \dots$  <br><br>  <br><br>$x_2 \cdot x_2 = \dots$  <br><br>  <br><br>$x_3 \cdot x_3 = \dots$  <br><br>  <br><br>$x_1 \cdot x_3 = \dots ; \quad x_2 \cdot x_3 = \dots$|
|**2**|**Susun Persamaan Support Vector**<br><br>  <br><br>Gunakan rumus: $\sum_{j=1}^{3} \alpha_j y_j (x_j \cdot x_i) + b = y_i$  <br><br>  <br><br>Susun 3 persamaan untuk titik $x_1, x_2, x_3$.|**Persamaan (1) untuk** $x_1$**:**<br><br>  <br><br>$\alpha_1(1)(x_1 \cdot x_1) + \alpha_2(1)(x_2 \cdot x_1) + \alpha_3(-1)(x_3 \cdot x_1) + b = 1$  <br><br>  <br><br>$\Rightarrow \dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 + b = 1$  <br><br>  <br><br>  <br><br>**Persamaan (2) untuk** $x_2$**:**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 + b = 1$  <br><br>  <br><br>  <br><br>**Persamaan (3) untuk** $x_3$**:**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 + b = -1$|
|**3**|**Susun Persamaan Constraint**<br><br>  <br><br>Tuliskan syarat $\sum \alpha_i y_i = 0$.|**Persamaan (4):**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + \dots \alpha_3 = 0$|
|**4**|**Selesaikan SPL (Mencari** $b$ **dan** $\alpha$**)**<br><br>  <br><br>Gunakan substitusi/eliminasi.<br><br>  <br><br>_Hint: Lihat Persamaan (3), karena_ $x_3$ _adalah vektor nol, banyak suku yang hilang._|Dari Persamaan (3):<br><br>  <br><br>$0 + 0 + 0 + b = -1 \Rightarrow \mathbf{b = \dots}$  <br><br>  <br><br>  <br><br>Substitusi $b$ ke Pers (1) & (2) untuk dapat $\alpha_1, \alpha_2$:<br><br>  <br><br>$\alpha_1 = \dots$  <br><br>  <br><br>$\alpha_2 = \dots$  <br><br>  <br><br>  <br><br>Substitusi ke Pers (4) untuk dapat $\alpha_3$:<br><br>  <br><br>$\alpha_3 = \dots$|
|**5**|**Fungsi Keputusan (**$w$ **dan** $f(x)$**)**<br><br>  <br><br>Hitung bobot $w = \sum \alpha_i y_i x_i$ dan tulis fungsi klasifikasinya.|$w = \dots (2,0) + \dots (0,2) - \dots (0,0)$  <br><br>  <br><br>$w = (\dots, \dots)$  <br><br>  <br><br>  <br><br>Fungsi $f(x) = \dots x_1 + \dots x_2 \dots$|

## BAGIAN II: SVM Non-Linear (Kernel Trick)

**Bobot: 50 Poin** **Fokus:** Memahami bagaimana Kernel Trick mengubah data non-linear menjadi linear di dimensi fitur (feature space).

### Soal 2. Polynomial Kernel 1D

Diketahui dataset 1 dimensi yang **tidak** _linearly separable_:

- **Kelas Positif (+1):** $x_1 = -2$, $x_2 = 2$  
    
- **Kelas Negatif (-1):** $x_3 = 0$  
    

Kita akan menggunakan Polynomial Kernel derajat 2: $K(x, z) = (x \cdot z)^2$.

Catatan: Rumus ini adalah penyederhanaan dari poly kernel standar $(x \cdot z + c)^d$ untuk kemudahan hitungan.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi/Pertanyaan**|**Isian / Jawaban**|
|**1**|**Analisis Awal**<br><br>  <br><br>Mengapa dataset di atas tidak bisa dipisahkan oleh Linear SVM biasa di dimensi 1D?||
|**2**|**Hitung Kernel Matrix (K)**<br><br>  <br><br>Hitung $K(x_i, x_j) = (x_i \cdot x_j)^2$ untuk:<br><br>  <br><br>- $K(x_1, x_1)$  <br><br>  <br><br>- $K(x_2, x_2)$  <br><br>  <br><br>- $K(x_3, x_3)$  <br><br>  <br><br>- $K(x_1, x_3)$|$K(-2, -2) = ((-2)(-2))^2 = 16$  <br><br>  <br><br>$K(2, 2) = \dots$  <br><br>  <br><br>$K(0, 0) = \dots$  <br><br>  <br><br>$K(-2, 0) = \dots$|
|**3**|**Pemetaan Implisit (**$\phi$**)**<br><br>  <br><br>Jika $K(x, z) = (xz)^2 = x^2 z^2$, maka sebenarnya fungsi pemetaan fitur $\phi(x)$ apa yang mengubah input $x$ menjadi fitur baru?|$\phi(x) = \dots$  <br><br>  <br><br>(Sehingga $x_1 \rightarrow \dots, x_2 \rightarrow \dots, x_3 \rightarrow \dots$)|
|**4**|**Visualisasi Konseptual**<br><br>  <br><br>Setelah dipetakan oleh $\phi(x)$ (hasil Langkah 3), apakah data tersebut kini menjadi _linearly separable_? Jelaskan posisinya.|**Ya/Tidak.**<br><br>  <br><br>Karena:<br><br>  <br><br>Posisi Kelas +1 ada di titik: \dots<br><br>  <br><br>Posisi Kelas -1 ada di titik: \dots|
|**5**|**Fungsi Keputusan Kernel**<br><br>  <br><br>Jika hasil optimasi (hipotetis) memberikan $\alpha_1=0.5, \alpha_2=0.5, \alpha_3=1$ dan $b=-2$, tuliskan fungsi hipotesis $f(x)$ dalam bentuk Kernel.|$f(x) = \sum \alpha_i y_i K(x_i, x) + b$  <br><br>  <br><br>$f(x) = \dots$  <br><br>  <br><br>_(Tuliskan persamaan akhirnya dalam variabel_ $x$_)_|

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I: SVM Linear (Metode SPL)
> 
> |   |   |   |
> |---|---|---|
> |**Langkah**|**Jawaban Kunci**|**Poin**|
> |**1**|$x_1 \cdot x_1 = 4$, $x_2 \cdot x_2 = 4$, $x_3 \cdot x_3 = 0$. Semua dot product dengan $x_3$ adalah 0 karena vektor nol.|5|
> |**2**|(1) $4\alpha_1 + b = 1$  <br><br>  <br><br>(2) $4\alpha_2 + b = 1$  <br><br>  <br><br>(3) $b = -1$ (Karena semua suku dot product bernilai 0)|15|
> |**3**|$\alpha_1(1) + \alpha_2(1) + \alpha_3(-1) = 0 \Rightarrow \mathbf{\alpha_1 + \alpha_2 - \alpha_3 = 0}$|5|
> |**4**|Dari pers (3), $\mathbf{b = -1}$.<br><br>  <br><br>Substitusi ke (1): $4\alpha_1 - 1 = 1 \Rightarrow 4\alpha_1 = 2 \Rightarrow \mathbf{\alpha_1 = 0.5}$.<br><br>  <br><br>Substitusi ke (2): $4\alpha_2 - 1 = 1 \Rightarrow 4\alpha_2 = 2 \Rightarrow \mathbf{\alpha_2 = 0.5}$.<br><br>  <br><br>Substitusi ke (4): $0.5 + 0.5 - \alpha_3 = 0 \Rightarrow \mathbf{\alpha_3 = 1}$.|15|
> |**5**|$w = 0.5(2,0) + 0.5(0,2) - 1(0,0) = (1, 0) + (0, 1) = \mathbf{(1, 1)}$  <br><br>  <br><br>Fungsi: $f(x) = x_1 + x_2 - 1$|10|
> 
> ### Bagian II: SVM Non-Linear
> 
> |   |   |   |
> |---|---|---|
> |**Langkah**|**Jawaban Kunci**|**Poin**|
> |**1**|Karena data kelas +1 ($x=-2$ dan $x=2$) mengapit data kelas -1 ($x=0$). Tidak ada satu titik potong (garis) di 1D yang bisa memisahkan mereka.|5|
> |**2**|$K(2,2) = 16$; $K(0,0) = 0$; $K(-2,0) = 0$.|10|
> |**3**|$\phi(x) = x^2$.<br><br>  <br><br>Pemetaan: $x_1 \rightarrow 4$, $x_2 \rightarrow 4$, $x_3 \rightarrow 0$.|10|
> |**4**|**Ya.** Kelas +1 berkumpul di titik 4, Kelas -1 di titik 0. Kita bisa menarik garis pemisah misal di $x=2$.|10|
> |**5**|$f(x) = 0.5(1)(x \cdot -2)^2 + 0.5(1)(x \cdot 2)^2 + 1(-1)(x \cdot 0)^2 - 2$  <br><br>  <br><br>$f(x) = 0.5(4x^2) + 0.5(4x^2) - 0 - 2$  <br><br>  <br><br>$\mathbf{f(x) = 4x^2 - 2}$|15|
## Tips Pengerjaan untuk Peserta

1. **Metode SPL:** Perhatikan bahwa persamaan $f(x_i) = y_i$ disusun untuk _setiap_ Support Vector. Karena kita mengasumsikan semua titik adalah Support Vector, kita punya 3 persamaan + 1 constraint = 4 persamaan untuk 4 variabel ($\alpha_1, \alpha_2, \alpha_3, b$).
    
2. **Peran Vektor Nol:** Karena $x_3 = (0,0)$, semua dot product yang melibatkan $x_3$ hasilnya 0. Ini sangat menyederhanakan perhitungan $b$ secara langsung.
    
3. **Kernel Trick:** Pada Soal 2, fokuslah pada pola angkanya. Anda tidak perlu menggambar grafik 3D, cukup lihat bagaimana nilai $x$ berubah menjadi nilai baru yang lebih mudah dikelompokkan.
    
4. **Verifikasi:** Coba masukkan titik data ke fungsi akhir. Misal $x_1(2,0)$ ke $f(x) = x_1 + x_2 - 1 \Rightarrow 2 + 0 - 1 = 1$ (Cocok, Kelas +1).
    

### Red Flags 🚩 (Hindari Ini!)

- ❌ **Salah Tanda (**$y_i$**):** Saat menyusun SPL, ingat $y_i$ di ruas kanan persamaan adalah target kelas (+1 atau -1).
    
- ❌ **Melupakan Constraint:** Persamaan $\sum \alpha_i y_i = 0$ seringkali menjadi kunci untuk menemukan nilai variabel terakhir.
    
- ❌ **Bingung antara** $x$ **(vektor) dan** $y$ **(label):** Pastikan kapan harus mengalikan koordinat, dan kapan mengalikan $+1/-1$.