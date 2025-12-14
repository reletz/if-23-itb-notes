_Back to_ [[Latihan UAS IF3170]]

# Problem Set Paket B: Support Vector Machine

**Mata Pelajaran:** nteligensi Artifisial

**Topik:** SVM Selection Strategy & Kernel Trick Analysis

**Estimasi Waktu:** 60 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. **Mengidentifikasi** kandidat Support Vector (SV) dari sekumpulan data sebelum melakukan perhitungan.
    
2. **Menyelesaikan** masalah optimasi SVM Linear menggunakan Sistem Persamaan Linear (SPL) pada titik yang relevan.
    
3. **Memilih** fungsi Kernel yang tepat berdasarkan karakteristik distribusi data (Linear, Polynomial, RBF, Sigmoid).
    
4. **Menerapkan** perhitungan manual Kernel Trick untuk transformasi data non-linear.
    

## Petunjuk Umum

- **Paket B** ini memiliki tingkat kesulitan lebih tinggi dari Paket A karena Anda harus menentukan sendiri titik mana yang menjadi Support Vector.
    
- Gunakan intuisi visual atau perhitungan jarak Euclidean sederhana untuk memfilter data sebelum masuk ke perhitungan matriks yang rumit.
    
- Format pengerjaan tetap menggunakan tabel terpandu (Guided Discovery).
    

## BAGIAN I: SVM Linear (Support Vector Identification)

**Bobot: 50 Poin** **Fokus:** Efisiensi komputasi dengan memilih hanya titik yang relevan (Support Vectors) sebelum menyusun SPL.

### Soal 1. Seleksi & Optimasi

Diketahui dataset 2D dengan 4 titik sebagai berikut:

- **Kelas Negatif (-1):** 
	- $N_1 = (1, 1)$  
    
	- $N_2 = (0, 0)$  
        
- **Kelas Positif (+1):** 
	- $P_1 = (3, 3)$  
    
	- $P_2 = (4, 4)$  
        

Tugas Anda adalah mencari _Optimal Separating Hyperplane_. Jangan gunakan semua titik! Identifikasi dulu mana yang berada di "garis depan".

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi/Pertanyaan**|**Isian / Jawaban**|
|**1**|**Identifikasi Support Vector (Visual/Logika)**<br><br>  <br><br>Support Vector adalah titik terluar dari kelasnya yang paling dekat dengan kelas lawan.<br><br>  <br><br>Hitung jarak antar pasangan terdekat (misal $N_1$ ke $P_1$, $N_1$ ke $P_2$, dll) atau gambar sketsa kasar.<br><br>  <br><br>Titik mana saja yang **PASTI BUKAN** Support Vector? Jelaskan alasannya.|**Titik yang dibuang:**  <br><br>  <br><br>1. $\dots$ (Alasan: Terhalang oleh titik $\dots$)<br><br>  <br><br>2. $\dots$ (Alasan: Jaraknya lebih jauh dari $\dots$)<br><br>  <br><br>  <br><br>**Sisa Kandidat Support Vector:**<br><br>  <br><br>1. $\dots$  <br><br>  <br><br>2. $\dots$|
|**2**|**Susun SPL untuk Kandidat SV**<br><br>  <br><br>Hanya gunakan titik kandidat dari Langkah 1.<br><br>  <br><br>Gunakan rumus: $\alpha_i y_i (x_i \cdot x_i) + \alpha_j y_j (x_j \cdot x_i) + \dots + b = y_i$  <br><br>  <br><br>Susun persamaannya.|**Persamaan 1 (untuk** $SV_1$**):**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + b = \dots$  <br><br>  <br><br>  <br><br>**Persamaan 2 (untuk** $SV_2$**):**<br><br>  <br><br>$\dots \alpha_1 + \dots \alpha_2 + b = \dots$|
|**3**|**Persamaan Constraint**<br><br>  <br><br>Tuliskan syarat $\sum \alpha_i y_i = 0$ untuk kandidat SV yang tersisa.|$\dots \alpha_1 + \dots \alpha_2 = 0$  <br><br>  <br><br>Sehingga: $\alpha_1 = \dots$|
|**4**|**Selesaikan SPL**<br><br>  <br><br>Substitusi hasil Langkah 3 ke Langkah 2 untuk mencari nilai $\alpha$ dan $b$.|Dari Persamaan Constraint, kita tahu hubungan $\alpha_1$ dan $\alpha_2$.<br><br>  <br><br>Substitusi ke Persamaan 1:<br><br>  <br><br>$\dots$  <br><br>  <br><br>  <br><br>**Hasil Akhir:**<br><br>  <br><br>$\alpha_1 = \dots$  <br><br>  <br><br>$\alpha_2 = \dots$  <br><br>  <br><br>$b = \dots$|
|**5**|**Verifikasi Titik Non-SV**<br><br>  <br><br>Anda membuang beberapa titik di Langkah 1. Buktikan keputusan itu benar dengan menguji titik tersebut ke fungsi $f(x) = w \cdot x + b$.<br><br>  <br><br>Apakah hasilnya memenuhi syarat $y_i f(x) > 1$ (Zona Aman)?|**Fungsi Keputusan:** $f(x) = \dots$  <br><br>  <br><br>  <br><br>**Uji Titik** $N_2 (0,0)$**:**<br><br>  <br><br>$f(0,0) = \dots$  <br><br>  <br><br>Apakah $-1 \times (\dots) > 1$? (Ya/Tidak)<br><br>  <br><br>  <br><br>**Uji Titik** $P_2 (4,4)$**:**<br><br>  <br><br>$f(4,4) = \dots$  <br><br>  <br><br>Apakah $1 \times (\dots) > 1$? (Ya/Tidak)|

## BAGIAN II: SVM Non-Linear (Kernel Strategy)

**Bobot: 50 Poin** **Fokus:** Memilih kernel yang tepat berdasarkan bentuk data dan menghitung transformasinya.

### Soal 2. Analisis Kernel & Perhitungan

Terdapat 4 jenis Kernel utama: **Linear, Polynomial, RBF (Gaussian), dan Sigmoid**. Anda diberikan kasus data 1D sebagai berikut:

- **Kelas Positif (+1):** Data tersebar di area ekstrem: $x \in \{-3, 3\}$  
    
- **Kelas Negatif (-1):** Data berkumpul di tengah: $x = 0$  
    

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi/Pertanyaan**|**Isian / Jawaban**|
|**1**|**Pemilihan Kernel**<br><br>  <br><br>Jika data memiliki pola "Cincin" atau "Terpisah di tengah" (non-linear), kernel mana yang **paling efektif** untuk memisahkannya?  <br><br>  <br><br>Pilih antara **Polynomial** atau **Linear**. Jelaskan alasannya.|**Pilihan:** $\dots$  <br><br>  <br><br>**Alasan:** Kernel Linear hanya bisa membuat batas berupa $\dots$, sedangkan data ini membutuhkan batas berupa $\dots$|
|**2**|**Simulasi Kernel Polynomial**<br><br>  <br><br>Kita pilih Kernel Polynomial derajat 2 dengan rumus lengkap:<br><br>  <br><br>$K(x, z) = (x \cdot z + 1)^2$  <br><br>  <br><br>Hitung nilai Kernel untuk pasangan:<br><br>  <br><br>- $K(-3, -3)$  <br><br>  <br><br>- $K(0, 0)$  <br><br>  <br><br>- $K(-3, 0)$|$K(-3, -3) = ((-3)(-3) + 1)^2 = (10)^2 = 100$  <br><br>  <br><br>$K(0, 0) = (\dots)^2 = \dots$  <br><br>  <br><br>$K(-3, 0) = (\dots)^2 = \dots$|
|**3**|**Analisis Dimensi Fitur (**$\phi$**)**<br><br>  <br><br>Jika $K(x, z) = (xz + 1)^2 = x^2z^2 + 2xz + 1$,<br><br>  <br><br>maka pemetaan fiturnya adalah $\phi(x) = [x^2, \sqrt{2}x, 1]$.<br><br>  <br><br>Hitung koordinat baru untuk titik $x_1 = -3$ dan $x_2 = 0$ di dimensi 3D ini.|**Untuk** $x = -3$**:**<br><br>  <br><br>$\phi(-3) = [\dots, \dots, \dots]$  <br><br>  <br><br>  <br><br>**Untuk** $x = 0$**:**<br><br>  <br><br>$\phi(0) = [\dots, \dots, \dots]$|
|**4**|**Hitung Jarak di Feature Space**<br><br>  <br><br>Hitung jarak Euclidean antara titik $x=-3$ dan $x=0$ **SETELAH** ditransformasi (menggunakan hasil Langkah 3).||
|**5**|**Interpretasi**<br><br>  <br><br>Bandingkan jarak di dimensi asli (1D) vs dimensi fitur (3D). Apa efek kernel terhadap keterpisahan data ini?|Jarak Asli:|

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### Bagian I: SVM Linear (Seleksi)
> 
> |   |   |   |
> |---|---|---|
> |**Langkah**|**Jawaban Kunci**|**Poin**|
> |**1**|**Dibuang:** $N_2(0,0)$ (dibelakang $N_1$) dan $P_2(4,4)$ (dibelakang $P_1$).<br><br>  <br><br>**Sisa SV:** $N_1(1,1)$ dan $P_1(3,3)$.|10|
> |**2**|$x_1 \cdot x_1 = 2$; $x_2 \cdot x_2 = 18$; $x_1 \cdot x_2 = 6$.<br><br>  <br><br>(1) $2\alpha_1 + 6\alpha_2 + b = -1$  <br><br>  <br><br>(2) $6\alpha_1 + 18\alpha_2 + b = 1$|10|
> |**3**|$\alpha_1(-1) + \alpha_2(1) = 0 \Rightarrow \mathbf{\alpha_1 = \alpha_2}$|5|
> |**4**|Substitusi $\alpha_1 = \alpha_2$ ke persamaan:<br><br>  <br><br>(1) $8\alpha_1 + b = -1$  <br><br>  <br><br>(2) $24\alpha_1 + b = 1$  <br><br>  <br><br>Kurangi (2)-(1): $16\alpha_1 = 2 \Rightarrow \mathbf{\alpha_1 = 0.125}, \mathbf{\alpha_2 = 0.125}$.<br><br>  <br><br>Cari b: $8(0.125) + b = -1 \Rightarrow 1 + b = -1 \Rightarrow \mathbf{b = -2}$.|15|
> |**5**|$w = 0.125(-1)(1,1) + 0.125(1)(3,3) = (-0.125, -0.125) + (0.375, 0.375) = (0.25, 0.25)$.<br><br>  <br><br>$f(x) = 0.25x_1 + 0.25x_2 - 2$.<br><br>  <br><br>**Uji** $N_2(0,0)$**:** $f(0,0) = -2$. Kelas -1. Benar ($|-2|
> 
> ### Bagian II: SVM Non-Linear
> 
> |   |   |   |
> |---|---|---|
> |**Langkah**|**Jawaban Kunci**|**Poin**|
> |**1**|**Polynomial.** Karena data -1 diapit oleh data +1. Linear hanya bisa membuat satu garis potong, tidak bisa memisahkan "tengah" dari "pinggir".|5|
> |**2**|$K(0,0) = (0+1)^2 = 1$.<br><br>  <br><br>$K(-3,0) = (0+1)^2 = 1$.|10|
> |**3**|$\phi(-3) = [9, -3\sqrt{2}, 1]$.<br><br>  <br><br>$\phi(0) = [0, 0, 1]$.|15|
> |**4**|$d =\sqrt{(9-0)^2 + (-3\sqrt{2}-0)^2 + (1-1)^2}$  <br><br>  <br><br>$d = \sqrt{81 + 18} = \sqrt{99} \approx 9.95$.|10|
> |**5**|Jarak membesar drastis dari 3 menjadi ~9.95. Kernel "melempar" titik ekstrem jauh dari titik tengah, memudahkan pemisahan.|10|

## Tips Pengerjaan

1. **Filter Data:** Jangan buang waktu menghitung persamaan untuk titik yang jelas-jelas ada di "belakang". Titik $(0,0)$ pasti aman jika $(1,1)$ saja sudah jadi batas.
    
2. **Rumus Kernel:** Perhatikan rumus yang diberikan di soal. Kadang ada tambahan konstanta bias $(x \cdot z + c)^d$. Jangan terpaku pada $x \cdot z$ saja.
    
3. **Dimensi Fitur:** Jika diminta menghitung $\phi(x)$, lihat koefisien hasil penjabaran aljabar $(a+b)^2$.
    
    - $(xz+1)^2 = x^2z^2 + 2xz + 1$.
        
    - Bagian variabel $z$: $z^2, z, 1$.
        
    - Bagian variabel $x$ (fitur): $x^2, \sqrt{2}x, 1$. (Koefisien 2 dipecah jadi $\sqrt{2} \cdot \sqrt{2}$ agar sesuai dot product vector).
        

### Red Flags 🚩

- ❌ **Menggunakan semua 4 titik untuk SPL:** Anda akan memiliki lebih banyak persamaan daripada variabel, atau sistem menjadi tidak konsisten tanpa Slack Variable.
    
- ❌ **Salah menghitung kuadrat Kernel:** Ingat urutan operasi: Kalikan dulu (dot product), tambah 1, _baru_ dikuadratkan.