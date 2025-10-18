---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Pola Algoritma Paralel: Konvolusi (Stencil Computation)
> 
> > ## Questions/Cues
> > 
> > - Apa itu komputasi konvolusi?
> >     
> > - Apa itu _stencil operation_?
> >     
> > - Bagaimana cara kerja konvolusi 1D?
> >     
> > - Apa masalah kondisi batas (_boundary condition_)?
> >     
> > - Apa itu _ghost cells_?
> >     
> > - Bagaimana implementasi konvolusi 2D?
> >     
> > - Mengapa _tiling_ sangat penting untuk konvolusi?
> >     
> > - Apa beda _Input Tile_ vs _Output Tile_?
> >     
> > - Bagaimana analisis performa Tiled Convolution?
> >     
> > 
> > ## Reference Points
> > 
> > - `7 - IF-3230-07-GPU-06-2023.pdf`
> >     
> 
> > ### Apa itu Komputasi Konvolusi?
> > 
> > **Konvolusi** adalah sebuah operasi matematis di mana setiap elemen output dihitung sebagai **jumlah terbobot (weighted sum) dari elemen-elemen tetangganya di input**. Pola komputasi ini juga dikenal sebagai **operasi stensil (stencil operation)**, karena seolah-olah ada sebuah "stensil" atau "cetakan" yang digeser di atas data input untuk menghasilkan setiap elemen output.
> > 
> > - **Komponen**:
> >     
> >     1. **Input Array**: Data sumber (misalnya, sinyal audio 1D atau gambar 2D).
> >         
> >     2. **Mask/Kernel Konvolusi**: Sebuah array kecil yang berisi bobot-bobot. Pola bobot ini menentukan efek dari konvolusi (misalnya, _blurring_, _sharpening_, deteksi tepi).
> >         
> >     3. **Output Array**: Hasil dari operasi.
> >         
> > 
> > ### Konvolusi 1D dan Kondisi Batas
> > 
> > Dalam konvolusi 1D, _mask_ 1D digeser di sepanjang array input. Untuk menghitung `P[i]`, kita menempatkan pusat _mask_ di atas `N[i]` dan melakukan perkalian-akumulasi dengan elemen-elemen tetangganya.
> > 
> > - **Contoh**: `P[2] = N[0]*M[0] + N[1]*M[1] + N[2]*M[2] + N[3]*M[3] + N[4]*M[4]`
> >     
> > 
> > **Masalah Kondisi Batas**: Apa yang terjadi ketika kita mencoba menghitung `P[0]`? _Mask_ akan membutuhkan elemen-elemen di `N[-2]` dan `N[-1]` yang tidak ada. Elemen "imajiner" di luar batas ini disebut **ghost cells** (atau halo cells).
> > 
> > **Solusi Umum**:
> > 
> > - **Zero Padding**: Mengasumsikan semua _ghost cells_ bernilai nol.
> >     
> > - **Clamping/Replication**: Mengulang nilai elemen di tepi (misalnya, `N[-1]` dianggap sama dengan `N[0]`).
> >     
> > - **Wrapping**: Mengasumsikan array bersifat periodik (misalnya, `N[-1]` dianggap sama dengan `N[end]`).
> >     
> > 
> > Implementasi kernel naif harus secara eksplisit memeriksa apakah indeks tetangga berada dalam rentang yang valid.
> > 
> > ### Konvolusi 2D
> > 
> > Konsepnya sama, tetapi diperluas ke dua dimensi. Sebuah _mask_ 2D digeser di atas gambar input 2D. Untuk menghitung nilai piksel output di `(row, col)`, pusat _mask_ ditempatkan di atas piksel input di `(row, col)`, dan operasi _weighted sum_ dilakukan pada area yang ditutupi oleh _mask_. Ini adalah operasi fundamental dalam _computer vision_ dan _deep learning_ (misalnya, Convolutional Neural Networks).
> > 
> > ### Tiled Convolution: Kunci Performa
> > 
> > Kernel konvolusi naif sangat tidak efisien karena **tingkat penggunaan kembali data (data reuse) yang masif**. Perhatikan bahwa untuk menghitung `P[i]` dan `P[i+1]`, keduanya menggunakan banyak elemen input yang sama. Kernel naif akan membaca elemen-elemen ini dari Global Memory berulang kali.
> > 
> > **Tiled Convolution** memecahkan masalah ini dengan:
> > 
> > 1. Memuat satu bagian besar dari input (sebuah _input tile_) ke Shared Memory.
> >     
> > 2. Melakukan komputasi untuk menghasilkan satu bagian dari output (sebuah _output tile_) sepenuhnya dari Shared Memory.
> >     
> > 
> > ### Input Tile vs. Output Tile
> > 
> > Ini adalah konsep kunci dalam _tiled convolution_. Karena setiap elemen output membutuhkan tetangganya, _input tile_ yang dibutuhkan untuk menghitung sebuah _output tile_ **harus lebih besar**.
> > 
> > - **Output Tile**: Bagian dari matriks output yang dihitung oleh satu _thread block_. Ukurannya, misalnya, `O_TILE_WIDTH x O_TILE_WIDTH`.
> >     
> > - **Input Tile**: Bagian dari matriks input yang perlu dimuat ke Shared Memory. Ukurannya adalah `(O_TILE_WIDTH + MASK_WIDTH - 1) x (O_TILE_WIDTH + MASK_WIDTH - 1)`.
> >     
> > 
> > Radius tambahan di sekitar _input tile_ ini berisi _ghost cells_ yang diperlukan untuk menghitung elemen-elemen di tepi _output tile_.
> > 
> > **Alur Kernel Tiled**:
> > 
> > 1. Setiap _thread_ dalam block memuat satu elemen dari _input tile_ yang besar dari Global Memory ke Shared Memory.
> >     
> > 2. `__syncthreads()` untuk memastikan seluruh _input tile_ telah dimuat.
> >     
> > 3. Setiap _thread_ menghitung nilai elemen outputnya dengan mengakses data **hanya** dari Shared Memory.
> >     
> > 4. Setiap _thread_ menulis hasil akhirnya ke Global Memory.
> >     
> > 
> > ### Analisis Pengurangan Bandwidth Memori
> > 
> > Keuntungan dari _tiling_ sangat signifikan. Rasio pengurangan bandwidth Global Memory untuk konvolusi 2D dapat dihitung sebagai:
> > 
> > $$\text{Reduction Ratio} = \frac{\text{O\_TILE\_WIDTH}^2 \times \text{MASK\_WIDTH}^2}{(\text{O\_TILE\_WIDTH} + \text{MASK\_WIDTH} - 1)^2}$$
> > 
> > - **Pembilang**: Jumlah total akses ke Shared Memory.
> >     
> > - **Penyebut**: Jumlah total pemuatan dari Global Memory.
> >     
> > 
> > Untuk `O_TILE_WIDTH = 16` dan `MASK_WIDTH = 5`, rasio pengurangannya adalah **16x**. Ini berarti lalu lintas ke Global Memory dikurangi sebanyak 16 kali, yang secara dramatis meningkatkan performa.

> [!cornell] #### Summary
> 
> Konvolusi adalah operasi stensil di mana setiap elemen output adalah jumlah terbobot dari tetangganya di input, yang sangat penting dalam pemrosesan sinyal dan gambar. Karena adanya penggunaan kembali data yang sangat besar, implementasi naif yang mengakses Global Memory berulang kali sangat tidak efisien. Solusi berkinerja tinggi adalah dengan menggunakan Tiled Convolution, di mana satu thread block memuat input tile yang diperbesar (untuk mencakup ghost cells) ke Shared Memory, lalu menghitung output tile sepenuhnya dari memori on-chip yang cepat, sehingga secara drastis mengurangi bottleneck bandwidth memori.

> [!ad-libitum]- Additional Information
> 
> #### Optimasi: Separable Convolution
> 
> Untuk _mask_ tertentu (seperti Gaussian blur), konvolusi 2D dapat dipecah menjadi dua lintasan konvolusi 1D: satu secara horizontal, lalu satu lagi secara vertikal pada hasilnya.
> 
> - **Kompleksitas Naif 2D**: Untuk mask `MxM`, diperlukan `M²` perkalian-akumulasi per piksel.
>     
> - Kompleksitas Separable: Memerlukan M operasi untuk lintasan horizontal dan M operasi untuk lintasan vertikal, total 2*M operasi per piksel.
>     
>     Untuk mask 5x5, ini mengubah 25 operasi menjadi hanya 10 operasi. Ini adalah penghematan komputasi yang signifikan di samping penghematan memori dari tiling.
>     
> 
> #### Optimasi: Constant Memory untuk Mask
> 
> _Mask_ konvolusi adalah kandidat yang sempurna untuk disimpan di **Constant Memory**. Alasannya:
> 
> 1. **Read-Only**: Nilainya tidak pernah berubah selama eksekusi kernel.
>     
> 2. **Akses Seragam**: Semua _thread_ dalam satu _warp_ akan mengakses elemen _mask_ yang sama pada saat yang bersamaan saat mereka menghitung stensil.
>     
> 
> Penggunaan Constant Memory memungkinkan hardware untuk men-cache nilai _mask_ dan melakukan _broadcast_ ke semua _thread_ dalam _warp_ dalam satu siklus, yang jauh lebih efisien daripada setiap _thread_ membacanya dari Global atau bahkan Shared Memory.
> 
> #### Eksplorasi Mandiri
> 
> - Coba analisis rasio pengurangan bandwidth untuk konvolusi 1D. Bagaimana formulanya berubah dari versi 2D?
>     
> - Pikirkan tentang desain _thread block_ untuk _tiled convolution_. Haruskah ukuran block sama dengan _output tile_ atau _input tile_? Masing-masing memiliki implikasi. Jika ukuran block sama dengan _input tile_, beberapa _thread_ hanya akan memuat data dan tidak menghitung output. Jika ukuran block sama dengan _output tile_, beberapa _thread_ mungkin perlu memuat lebih dari satu elemen input.
>