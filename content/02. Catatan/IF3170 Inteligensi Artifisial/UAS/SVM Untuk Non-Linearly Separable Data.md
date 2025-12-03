---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic: SVM for Non-Linearly Separable Data (Soft Margin & Kernels)
> 
> > ## Questions/Cues
> >
> > - Penyebab Data Non-Linear
> >     
> > - Definisi Slack Variable
> >     
> > - Konsep Soft Margin
> >     
> > - Peran Parameter C
> >     
> > - Transformasi Dimensi
> >     
> > - Definisi Kernel Trick
> >     
> > - Jenis-jenis Kernel
> >     
> > - RBF Kernel
> >     
> >
> > ## Reference Points
> >
> > - Slides: 39-51
> >     
> > - Modul: Supervised Learning
> >     
> 
> > ### 1. Masalah Non-Linearly Separable
> >
> > Dalam dunia nyata, data jarang sekali terpisah sempurna secara linear. Hal ini disebabkan oleh dua faktor utama:
> >
> > - **Noise:** Data outlier atau kesalahan pengukuran yang membuat pemisahan sempurna tidak mungkin dilakukan tanpa overfitting.
> >     
> > - **Sifat Alami Data:** Pola data memang kompleks (misalnya melingkar) sehingga batasnya bukan garis lurus.
> >     
> >
> > ### 2. Solusi 1: Slack Variables (Soft Margin SVM)
> >
> > Untuk menangani noise, SVM memodifikasi kendala (constraint) agar lebih longgar. Kita mengizinkan beberapa data salah diklasifikasikan atau masuk ke dalam margin.
> >
> > - **Slack Variable (**$\xi_i$**):** Variabel non-negatif yang mengukur seberapa jauh sebuah titik melanggar margin.
> > 	* $\xi_i = 0$: Data terklasifikasi benar dan di luar margin (aman).
> > 	* $0 < \xi_i \le 1$: Data berada di dalam margin tetapi masih di sisi yang benar.
> > 	* $\xi_i > 1$: Data salah diklasifikasikan (misclassified).
> >
> > - Fungsi Objektif Baru: Kita tidak hanya meminimalkan $||w||^2$, tapi juga meminimalkan total kesalahan ($\sum \xi$).
> >     
> >     $$Minimize: \frac{1}{2}||w||^2 + C \sum_{i=1}^{N} \xi_i$$
> >
> > ### 3. Peran Parameter C (Regularization)
> >
> > Parameter **C** adalah konstanta yang ditentukan pengguna untuk mengontrol _trade-off_ antara margin yang lebar vs. kesalahan klasifikasi.
> >
> > - **C Besar:** Memberi hukuman berat pada kesalahan ($\xi$). Model akan berusaha keras mengklasifikasikan semua data latih dengan benar.
> >     
> >     - _Risiko:_ Margin sempit, rentan Overfitting (terlalu sensitif terhadap noise).
> >         
> > - **C Kecil:** Lebih mentoleransi kesalahan. Model lebih mementingkan margin yang lebar.
> >     
> >     - _Efek:_ Margin lebar, pola lebih umum (Underfitting jika terlalu kecil), tapi lebih tahan noise.
> >         
> >
> > ### 4. Solusi 2: Non-Linear Boundary Transformation
> >
> > Jika data memiliki pola non-linear (misal: lingkaran), garis lurus tidak akan pernah bisa memisahkannya.
> >
> > - **Ide Utama:** Petakan data dari dimensi rendah (Input Space) ke dimensi yang lebih tinggi (Feature Space) menggunakan fungsi pemetaan $\phi(x)$.
> >     
> > - **Contoh:** Data 2D melingkar ($x_1, x_2$) dipetakan ke 3D ($z_1, z_2, z_3$) di mana $z_3 = x_1^2 + x_2^2$. Di dimensi 3D, data tersebut mungkin menjadi terpisah secara linear oleh sebuah bidang datar. Saat dikembalikan ke 2D, bidang datar itu menjadi garis lengkung (lingkaran).
> >     
> >
> > ### 5. The Kernel Trick
> >
> > Memetakan data ke dimensi tinggi secara eksplisit sangat mahal secara komputasi (masalah "Curse of Dimensionality").
> >
> > - **Trik:** SVM sebenarnya hanya membutuhkan hasil **Dot Product** antar data $(x_i \cdot x_j)$ dalam optimasinya (lihat Dual Problem di Catatan 2).
> >     
> > - Fungsi Kernel: Kita bisa menggunakan fungsi $K(x_i, x_j)$ yang menghitung dot product di dimensi tinggi tanpa harus benar-benar mengubah koordinat data ke dimensi tinggi tersebut.
> >     
> >     $$K(x_i, x_j) = \phi(x_i) \cdot \phi(x_j)$$
> > - **Keuntungan:** Komputasi tetap ringan seolah-olah di dimensi rendah, tapi kemampuan pemisahan setara dimensi tinggi.
> >     
> >
> > ### 6. Jenis-Jenis Fungsi Kernel Umum
> >
> > - **Linear Kernel:** $K(x_i, x_j) = x_i^T x_j$ (Sama seperti SVM biasa).
> >     
> > - **Polynomial Kernel:** $K(x_i, x_j) = (\gamma \cdot x_i^T x_j + r)^p$. Baik untuk data yang batasnya melengkung polinomial.
> >     
> > - RBF (Radial Basis Function) / Gaussian: Kernel paling populer.
> >     
> >     $$K(x_i, x_j) = exp(-\gamma ||x_i - x_j||^2)$$
> >     
> >     Dapat menangani batas yang sangat kompleks dan tak terbatas dimensinya.
> >     
> > - **Sigmoid Kernel:** Mirip dengan fungsi aktivasi pada Neural Network.
> >     

> [!cornell] #### Summary
> 
> Untuk menangani data yang tidak terpisah linear, SVM menggunakan dua pendekatan utama: **Soft Margin** dan **Kernel Trick**. **Soft Margin** menggunakan **Slack Variables (**$\xi$**)** untuk mentoleransi noise, dikontrol oleh parameter **C** (Regularisasi). **Kernel Trick** memungkinkan SVM memisahkan data dengan pola non-linear kompleks dengan cara memproyeksikan data ke dimensi tinggi secara implisit, menghindari beban komputasi transformasi manual. Kernel populer termasuk Polynomial dan RBF.

> [!ad-libitum]- Ad Libitum: Detail Matematis Kernel
> 
> #### 1. Formulasi Dual dengan Slack Variables
> 
> Menariknya, ketika kita menambahkan slack variable, bentuk persamaan Dual Problem tidak berubah drastis.
> 
> Persamaan Dual tetap:
> 
> $$Maximize: \sum \alpha_i - \frac{1}{2} \sum \sum \alpha_i \alpha_j y_i y_j K(x_i, x_j)$$
> 
> Perbedaannya hanya pada kendala nilai Alpha ($\alpha$):
> 
> - Hard Margin (Linear sempurna): $0 \le \alpha_i$  
>     
> - Soft Margin (Dengan Slack): $0 \le \alpha_i \le C$  
>     
> 
> Ini membatasi pengaruh satu data outlier agar tidak merusak model sepenuhnya (nilai $\alpha$ tidak bisa meledak sampai tak hingga).
> 
> #### 2. Contoh Perhitungan Kernel Polinomial (Slide 50)
> 
> Misal data 1D: $x = \{1, 2, 4, 5, 6\}$ dengan label $y = \{1, 1, -1, -1, 1\}$.
> 
> Menggunakan Kernel Polinomial derajat 2: $K(x, y) = (xy + 1)^2$.
> 
> Alih-alih menghitung koordinat baru, kita hitung matriks kernel antar semua titik.
> 
> Misal $K(1, 2) = (1\cdot2 + 1)^2 = 9$.
> 
> Setelah dimasukkan ke QP Solver, didapat Support Vectors di $x=\{2, 5, 6\}$.
> 
> Fungsi keputusan akhirnya menjadi persamaan kuadrat (parabola) yang memisahkan data tersebut.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa fungsi dari Slack Variable dalam SVM?</strong></summary>
> 
>   
> 
> Slack Variable ($\xi$) berfungsi untuk mengukur seberapa jauh sebuah titik data melanggar margin atau salah diklasifikasikan, memungkinkan SVM untuk menemukan hyperplane meskipun data tidak terpisah sempurna (Soft Margin).
> 
> </details>
> 
> <details>
> 
> <summary><strong>2. Jika model SVM Anda mengalami Overfitting, bagaimana sebaiknya Anda mengubah nilai parameter C?</strong></summary>
> 
>   
> 
> Anda harus <strong>mengecilkan</strong> nilai C. Nilai C yang besar memaksa model untuk tidak membuat kesalahan sama sekali pada data latih (sangat ketat), yang menyebabkan margin sempit dan sensitif terhadap noise (overfitting).
> 
> </details>
> 
> <details>
> 
> <summary><strong>3. Jelaskan konsep "Kernel Trick" dalam satu kalimat!</strong></summary>
> 
>   
> 
> Metode menghitung dot product data di dimensi tinggi menggunakan fungsi kernel $K(x_i, x_j)$ tanpa perlu melakukan transformasi koordinat data secara eksplisit, sehingga menghemat komputasi.
> 
> </details>
> 
> <details>
> 
> <summary><strong>4. Sebutkan dua jenis Kernel yang paling umum digunakan selain Linear Kernel!</strong></summary>
> 
>   
> 
> 1. Polynomial Kernel
>     
> 2. Radial Basis Function (RBF) Kernel / Gaussian Kernel
>     
>     </details>
>     
> 
> <details>
> 
> <summary><strong>5. Apa perbedaan batasan nilai Alpha ($\alpha$) pada Hard Margin SVM dan Soft Margin SVM?</strong></summary>
> 
>   
> 
> Pada Hard Margin, $\alpha_i \ge 0$ (tidak ada batas atas).
> 
> Pada Soft Margin, $0 \le \alpha_i \le C$ (dibatasi oleh parameter C).
> 
> </details>