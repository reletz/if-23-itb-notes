---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Chomsky Normal Form (CNF) & Konversi
> 
> > ## Questions/Cues
> >
> > - Definisi Formal CNF
> >     
> > - Motivasi CNF
> >     
> > - Syarat Produksi
> >     
> > - Langkah 1: Clean Up
> >     
> > - Langkah 2: Terminal
> >     
> > - Langkah 3: Cascade
> >     
> >
> > ## Reference Points
> >
> > - Slide 15_2025: Hal 3 - 15
> >     
> 
> > ### 1. Definisi Chomsky Normal Form (CNF)
> >
> > Sebuah Tata Bahasa Bebas Konteks (CFG) berada dalam bentuk CNF jika dan hanya jika setiap aturan produksi memenuhi salah satu dari dua format berikut:
> >
> > 1. $A \rightarrow BC$: Variabel menurunkan tepat dua variabel.
> >     
> >
> > 2. $A \rightarrow a$: Variabel menurunkan tepat satu terminal.
> >     
> >
> > Segala bentuk produksi lain seperti produksi kosong ($\epsilon$), produksi unit ($A \rightarrow B$), atau campuran terminal-variabel di sisi kanan dilarang.
> >
> > ### 2. Langkah-Langkah Konversi CFG ke CNF
> >
> > Proses konversi dilakukan melalui tiga tahapan utama secara berurutan:
> >
> > **Langkah 1: Pembersihan Grammar (Clean Up)**
> >
> > Sebelum konversi, grammar harus dibersihkan dari tiga masalah:
> >
> > - **Eliminasi Useless Symbols**: Menghapus simbol yang tidak bisa menghasilkan terminal string (_non-generating_) atau tidak bisa dicapai dari start symbol (_non-reachable_).
> >     
> >
> > - **Eliminasi** $\epsilon$**-productions**: Menghapus $A \rightarrow \epsilon$ dengan menduplikasi aturan produksi yang mengandung variabel nullable tersebut.
> >     
> > - **Eliminasi Unit Productions**: Menghapus $A \rightarrow B$ dengan menggantinya dengan semua produksi non-unit yang dimiliki oleh $B$.
> >     
> > **Langkah 2: Pemisahan Terminal dalam Produksi Panjang**
> >
> > Masalah: Produksi dengan panjang $\ge 2$ yang mengandung terminal (contoh: $A \rightarrow aB$).
> >
> > - **Prosedur**: Untuk setiap terminal $a$ dalam body produksi panjang, buat variabel baru $X_a$. Ganti $a$ dengan $X_a$ dan tambahkan aturan $X_a \rightarrow a$.
> >     
> > **Langkah 3: Pemecahan Body Panjang (Cascade)**
> > Masalah: Produksi dengan jumlah variabel di sisi kanan $\ge 3$ (contoh: $A \rightarrow B_1 B_2 B_3$).
> > - **Prosedur**: Pecah menjadi rangkaian produksi biner menggunakan variabel pembantu.
> >      
> > - Misal $A \rightarrow B_1 B_2 B_3$ diubah menjadi:
> >     
> >
> > 1.  $A \rightarrow B_1 C_1$
> > 
> > 2.  $C_1 \rightarrow B_2 B_3$
> > 
> >
> > ### 3. Karakteristik Parse Tree CNF
> >
> > Dalam format CNF, setiap _parse tree_ akan memiliki struktur pohon biner. Jika string memiliki panjang $n$, maka pohon penurunan tersebut akan memiliki tepat $2n-1$ node internal. Struktur yang seragam ini memungkinkan implementasi algoritma parsing yang lebih efisien.

> [!cornell] #### Summary
> 
> **Chomsky Normal Form (CNF)** adalah bentuk standar CFG yang hanya mengizinkan produksi $A \rightarrow BC$ **atau** $A \rightarrow a$. Proses konversi melibatkan **pembersihan grammar** (hapus $\epsilon$, unit, dan useless symbols), **pemisahan terminal** menggunakan variabel baru pada produksi panjang, serta **pemecahan variabel jamak** menjadi struktur kaskade biner. Standarisasi ini sangat penting untuk efisiensi algoritma parsing seperti CYK.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Kompleksitas Konversi
> 
> Konversi dari CFG ke CNF secara teoretis dapat menyebabkan pertumbuhan jumlah produksi secara eksponensial jika dilakukan secara naif (terutama pada eliminasi $\epsilon$). Namun, dengan optimasi (memecah body sebelum eliminasi nullable), pertumbuhan ini dapat ditekan menjadi polinomial ($O(n^2)$ terhadap ukuran grammar asli).
> 
> #### Alasan Matematis Pembatasan Biner
> 
> Pembatasan menjadi tepat dua variabel ($A \rightarrow BC$) bertujuan untuk membatasi ruang pencarian saat melakukan parsing. Dengan struktur biner, algoritma dapat menggunakan teknik _divide and conquer_ yang sistematis untuk mengecek setiap kemungkinan titik pemisahan (_split point_) pada string input.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 15_2025 CNF & CFL Properties (Hal 3-15).
>     
> - Hopcroft, Motwani, & Ullman: _Introduction to Automata Theory, Languages, and Computation_.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> <summary><strong>1. Apa syarat produksi variabel dalam CNF?</strong></summary>
> Sisi kanan produksi harus terdiri dari tepat dua buah variabel (tidak boleh terminal atau campuran).
> 
> </details>
> <details>
> <summary><strong>2. Mengapa produksi $A \rightarrow aB$ tidak diperbolehkan dalam CNF?</strong></summary>
> Karena melanggar syarat bentuk normal; produksi yang mengandung terminal di sisi kanan hanya boleh berisi tepat satu terminal saja ($A \rightarrow a$).
> 
> </details>
> <details>
> <summary><strong>3. Sebutkan urutan eliminasi yang harus dilakukan pada tahap "Clean Up"!</strong></summary>
> Eliminasi $\epsilon$-productions, eliminasi unit productions, lalu eliminasi useless symbols.
> 
> </details>
> <details>
> <summary><strong>4. Bagaimana cara memecah produksi $A \rightarrow BCD$ menjadi format CNF?</strong></summary>
> Membuat kaskade: $A \rightarrow B C_1$ dan $C_1 \rightarrow CD$, di mana $C_1$ adalah variabel baru.
> 
> </details>
> <details>
> <summary><strong>5. Berapa jumlah node internal pada parse tree CNF untuk string sepanjang $n=5$?</strong></summary>
> Menggunakan rumus $2n-1$, maka $2(5)-1 = 9$ node internal.
> 
> </details>