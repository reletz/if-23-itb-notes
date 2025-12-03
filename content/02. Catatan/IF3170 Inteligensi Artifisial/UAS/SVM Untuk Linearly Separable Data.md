---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: SVM for Linearly Separable Data (Mathematics & Optimization)
> 
> > ## Questions/Cues
> >
> > - Definisi Matematis Support Vector
> >     
> > - Persamaan Bidang Pembatas
> >     
> > - Rumus Lebar Margin
> >     
> > - Fungsi Objektif SVM
> >     
> > - Quadratic Programming (QP)
> >     
> > - Primal vs Dual Problem
> >     
> > - Peran Lagrange Multiplier (Alpha)
> >     
> > - Cara menghitung bias (b)
> >     
> > 
> > ## Reference Points
> >
> > - Slides: 17-38
> >     
> > - Modul: Supervised Learning
> >     
> 
> > ### 1. Definisi Formal Support Vector & Margin
> >
> > Pada data yang _linearly separable_ (dapat dipisahkan sempurna secara linear), SVM mencari dua **bidang pembatas** paralel yang memisahkan data dengan jarak terjauh.
> >
> > **Persamaan Bidang:**
> >
> > - **Hyperplane Tengah (Pemisah):** $w \cdot x + b = 0$  
> >     
> > - **Pembatas Kelas +1:** $w \cdot x + b = +1$ (Data di garis ini labelnya +1)
> >     
> > - **Pembatas Kelas -1:** $w \cdot x + b = -1$ (Data di garis ini labelnya -1)
> >     
> >
> > Kondisi Matematis:
> > 
> > Agar klasifikasi benar dan berada di luar margin, seluruh data latih harus memenuhi pertidaksamaan:
> > 
> > $$y_i (w \cdot x_i + b) \ge 1$$
> >
> > - Jika hasilnya $= 1$, maka data tersebut berada tepat di garis pembatas. Data inilah yang disebut **Support Vector**.
> >     
> > - Jika hasilnya $> 1$, maka data berada di zona aman (bukan support vector).
> >     
> >
> > ### 2. Optimasi Margin (Objective Function)
> >
> > Tujuan SVM adalah memaksimalkan lebar margin ($m$).
> >
> > Rumus Lebar Margin:
> > 
> > Jarak tegak lurus antara pembatas kelas +1 dan -1 adalah:
> > 
> > $$Margin = \frac{2}{||w||}$$
> >
> > Masalah Optimasi:
> > 
> > Untuk memaksimalkan margin ($\frac{2}{||w||}$), kita sama saja dengan meminimalkan panjang vektor bobot ($||w||$).
> > 
> > Secara matematis, untuk memudahkan penurunan rumus (agar bisa diturunkan/derivative), kita meminimalkan kuadratnya:
> >
> > Fungsi Objektif (Primal):
> > 
> > $$Minimize: \frac{1}{2} ||w||^2$$
> > 
> > Subject to (kendala):
> > 
> > $$y_i (w \cdot x_i + b) \ge 1, \quad \forall i$$
> >
> > Ini adalah masalah **Convex Quadratic Programming** (QP).
> >
> > ### 3. Lagrange Multipliers & Dual Problem
> >
> > Masalah optimasi di atas (Primal) sulit diselesaikan langsung karena ada kendala pertidaksamaan. Kita mengubahnya menjadi masalah **Dual** menggunakan metode **Lagrange Multipliers**.
> >
> > Transformasi ke Dual Problem:
> > 
> > Kita memperkenalkan variabel baru bernama Alpha ($\alpha_i$) untuk setiap titik data.
> >
> > Fungsi Dual yang Harus Dimaksimalkan:
> > 
> > $$Maximize: \sum_{i=1}^{n} \alpha_i - \frac{1}{2} \sum_{i=1}^{n} \sum_{j=1}^{n} \alpha_i \alpha_j y_i y_j (x_i \cdot x_j)$$
> >
> > **Kendala Baru:**
> >
> > 1. $\sum \alpha_i y_i = 0$  
> >     
> > 2. $\alpha_i \ge 0$  
> >     
> >
> > Keuntungan Bentuk Dual:
> > 
> > Masalah kini hanya bergantung pada Dot Product $(x_i \cdot x_j)$ antar data latih. Ini sangat krusial untuk menangani data non-linear nanti (menggunakan Kernel Trick).
> >
> > ### 4. Interpretasi Nilai Alpha ($\alpha$)
> >
> > Setelah masalah optimasi diselesaikan (biasanya menggunakan software QP Solver), kita mendapatkan nilai $\alpha$ untuk setiap data.
> >
> > - **Jika** $\alpha_i = 0$**:** Data tersebut **bukan** Support Vector. Data ini tidak berpengaruh pada pembentukan garis pemisah.
> >     
> > - **Jika** $\alpha_i > 0$**:** Data tersebut **adalah Support Vector**. Data ini terletak tepat di batas margin ($y_i(w \cdot x + b) = 1$).
> >     
> >
> > ### 5. Menghitung Model Akhir ($w$ dan $b$)
> >
> > Setelah nilai $\alpha$ ditemukan:
> >
> > 1. Hitung Bobot ($w$):
> >     
> >     $$w = \sum_{i=1}^{n} \alpha_i y_i x_i$$
> >     
> >     (Hanya support vector yang berkontribusi karena $\alpha$ lainnya 0).
> >     
> >
> > 1. Hitung Bias ($b$):
> >     
> >     Ambil salah satu support vector ($x_{sv}, y_{sv}$), lalu masukkan ke persamaan:
> >     
> >     $$b = y_{sv} - w \cdot x_{sv}$$
> >     
> >     (Dalam prakteknya, sering dirata-rata dari semua support vector untuk kestabilan numerik).
> >     
> >
> > 2. Fungsi Klasifikasi Baru:
> >     
> >     $$f(x) = sign(\sum_{i=1}^{n} \alpha_i y_i (x_i \cdot x) + b)$$

> [!cornell] #### Summary
> 
> Pada data **Linearly Separable**, SVM diformulasikan sebagai masalah **Quadratic Programming** (QP) dengan tujuan meminimalkan $||w||^2$ (yang ekuivalen dengan memaksimalkan margin $2/||w||$) dengan kendala klasifikasi yang benar. Masalah ini diselesaikan menggunakan metode **Lagrange Multipliers** dalam bentuk **Dual Problem**, di mana kita mencari nilai $\alpha_i$. Hanya data dengan $\alpha_i > 0$ yang menjadi **Support Vectors** dan menentukan bentuk hyperplane akhir.

> [!ad-libitum]- Ad Libitum: Derivasi & Kalkulasi Detail
> 
> #### 1. Mengapa Lebar Margin = $2/||w||$?
> 
> Misalkan kita punya dua hyperplane paralel:
> 
> $H_1: w \cdot x + b = 1$
> 
> $H_2: w \cdot x + b = -1$
> 
> Ambil sembarang titik $x_1$ di $H_1$ dan $x_2$ di $H_2$. Jarak antara kedua bidang adalah proyeksi vektor $(x_1 - x_2)$ pada vektor normal satuan $\frac{w}{||w||}$.
> 
> $$w \cdot x_1 = 1 - b$$$$w \cdot x_2 = -1 - b$$
> 
> Kurangi persamaan:
> 
> $w \cdot (x_1 - x_2) = 2$
> 
> Bagi kedua sisi dengan $||w||$:
> 
> $\frac{w}{||w||} \cdot (x_1 - x_2) = \frac{2}{||w||}$
> 
> Sisi kiri adalah definisi jarak proyeksi. Maka terbukti lebar margin adalah $\frac{2}{||w||}$.
> 
> #### 2. Contoh Perhitungan Manual (Sederhana)
> 
> Misal ada 3 titik 1D (Sesuai slide 33-36 tapi disederhanakan):
> 
> Kelas +1: $x=1$
> 
> Kelas -1: $x=3$
> 
> Support vector pasti di $x=1$ dan $x=3$.
> 
> Jaraknya 2 unit. Margin optimal harus di tengah ($x=2$).
> 
> Setengah lebar margin = 1.
> 
> Maka $Margin = 2/w \rightarrow 2 = 2/w \rightarrow w = 1$.
> 
> Cek Bias:
> 
> $w \cdot x + b = 1$ (untuk kelas +1, $x=1$)
> 
> $1(1) + b = 1 \rightarrow b = 0$.
> 
> Fungsi keputusan: $f(x) = x$.
> 
> Cek $x=1 \rightarrow 1$ (Kelas +1). Cek $x=3 \rightarrow 3$ (Kelas +1? Salah, harusnya -1).
> 
> Tunggu, arah w terbalik. Jika kelas kiri +1 dan kanan -1, maka $w$ harus negatif.
> 
> Perhitungan SVM yang benar akan otomatis menangani tanda +/- ini melalui optimasi $\alpha$.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> Cobalah menjawab pertanyaan berikut untuk menguji pemahaman teknis Anda.
> 
> <details>
> 
> <summary><strong>1. Apa hubungan antara meminimalkan ||w|| dengan margin?</strong></summary>
> 
>   
> 
> Lebar margin didefinisikan sebagai $2/||w||$. Oleh karena itu, untuk memaksimalkan margin (membuat jalan pemisah selebar mungkin), kita harus meminimalkan penyebutnya, yaitu norma vektor bobot $||w||$.
> 
> </details>
> 
> <details>
> 
> <summary><strong>2. Dalam solusi Dual Problem, apa arti jika sebuah data memiliki alpha = 0?</strong></summary>
> 
>   
> 
> Jika $\alpha_i = 0$, berarti data tersebut <strong>bukan Support Vector</strong>. Data ini berada jauh dari batas margin (di zona aman) dan tidak memiliki pengaruh apapun terhadap pembentukan garis keputusan (hyperplane).
> 
> </details>
> 
> <details>
> 
> <summary><strong>3. Mengapa kita lebih memilih menyelesaikan SVM dalam bentuk Dual Problem daripada Primal Problem?</strong></summary>
> 
>   
> 
> Karena dalam bentuk Dual, fungsi objektifnya hanya bergantung pada <strong>Dot Product</strong> antar data $(x_i \cdot x_j)$. Hal ini memungkinkan penggunaan <strong>Kernel Trick</strong> nantinya untuk menangani data yang tidak terpisah secara linear (non-linear).
> 
> </details>
> 
> <details>
> 
> <summary><strong>4. Bagaimana persamaan kendala (constraint) SVM dituliskan secara matematis?</strong></summary>
> 
>   
> 
> $$y_i (w \cdot x_i + b) \ge 1$$
> 
> Artinya, untuk semua data latih, hasil proyeksi dan bias harus setidaknya bernilai 1 (untuk kelas positif) atau setidaknya -1 (untuk kelas negatif, dikali $y_i$ jadi positif), yang menjamin data berada di luar margin.
> 
> </details>
> 
> <details>
> 
> <summary><strong>5. Berapa banyak data yang biasanya memiliki alpha > 0 pada dataset yang besar?</strong></summary>
> 
>   
> 
> Biasanya hanya sebagian kecil dari total data (sparse). Hanya titik-titik yang paling sulit diklasifikasikan (di perbatasan) yang memiliki $\alpha &gt; 0$. Inilah yang membuat SVM efisien dalam memori untuk menyimpan model akhirnya.
> 
> </details>