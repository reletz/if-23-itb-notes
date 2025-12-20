---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Properti Keputusan & Algoritma CYK
> 
> > ## Questions/Cues
> >
> > - Masalah Emptiness
> >     
> > - Masalah Membership
> >     
> > - Algoritma CYK
> >     
> > - Tabel Triangular $X_{ij}$  
> >     
> > - Langkah Basis (Baris 1)
> >     
> > - Langkah Induksi (Split)
> >     
> > - Masalah Undecidable
> >     
> > - Kompleksitas CYK
> >     
> >
> > ## Reference Points
> 
> > - Slide 15_2025: Hal 28 - 43
> >     
> >
> > ### 1. Masalah Keputusan yang Decidable
> >
> > Masalah keputusan adalah masalah yang dapat dijawab dengan algoritma dalam waktu berhingga (YES/NO).
> >
> > **A. Emptiness (Apakah** $L(G) = \emptyset$**?)**
> >
> > - **Metode**: Cek apakah start symbol $S$ bersifat _generating_.
> >     
> > - **Kompleksitas**: $O(n)$ terhadap ukuran grammar.
> >     
> >
> > **B. Membership (Apakah** $w \in L(G)$**?)**
> >
> > - **Metode**: Menggunakan algoritma CYK (_Cocke-Younger-Kasami_).
> >     
> > - **Syarat**: Grammar harus dalam bentuk CNF.
> >     
> > - **Kompleksitas**: $O(n^3)$ terhadap panjang string.
> >     
> >
> > ### 2. Algoritma CYK (Step-by-Step)
> >
> > Algoritma ini menggunakan pendekatan _Dynamic Programming_ dengan tabel triangular $X_{ij}$.
> >
> > **Langkah 1: Inisialisasi Basis (Baris Pertama)**
> >
> > - Untuk setiap sel $X_{ii}$ pada baris 1: masukkan semua variabel $A$ yang memiliki produksi $A \rightarrow a_i$ (di mana $a_i$ adalah terminal pada posisi $i$ dalam string).
> >     
> >
> > **Langkah 2: Pengisian Tabel (Baris Selanjutnya)**
> >
> > - Untuk mengisi sel $X_{ij}$ (mencakup substring dari posisi $i$ ke $j$):
> >     
> > 	1. Tentukan semua kemungkinan titik pemisahan (_split point_) $k$ antara $i$ dan $j-1$.
> > 			
> > 	2. Untuk setiap $k$, cek apakah ada produksi $A \rightarrow BC$ sedemikian sehingga $B \in X_{ik}$ dan $C \in X_{k+1,j}$.
> > 			
> > 	3. Masukkan variabel $A$ ke dalam sel $X_{ij}$ jika kondisi di atas terpenuhi.
> >         
> >
> > **Langkah 3: Keputusan Akhir**
> >
> > - String diterima jika dan hanya jika simbol start $S$ berada di sel paling atas tabel ($S \in X_{1n}$).
> >     
> >
> > ### 3. Masalah yang TIDAK Dapat Diputuskan (Undecidable)
> >
> > Berbeda dengan Bahasa Reguler, beberapa masalah pada CFL tidak bisa diselesaikan oleh algoritma apa pun:
> >
> > 1. **Equivalence**: Apakah $L(G_1) = L(G_2)$?
> >     
> > 2. **Subset**: Apakah $L(G_1) \subseteq L(G_2)$?
> >     
> > 3. **Universality**: Apakah $L(G) = \Sigma^*$?
> >     

> [!cornell] #### Summary
> 
> Masalah **Emptiness** (melalui pengecekan _generating symbols_) dan **Membership** (melalui **Algoritma CYK**) pada CFL bersifat **decidable**. Algoritma CYK bekerja dengan mengisi tabel triangular secara bertahap berdasarkan pemisahan substring. Sebaliknya, masalah perbandingan antar dua bahasa seperti **Equivalence dan Subset** bersifat **undecidable** pada level CFL.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Kompleksitas Algoritma CYK
> 
> Kompleksitas $O(n^3 \cdot |G|)$ berasal dari tiga loop utama:
> 
> 1. Loop panjang substring ($O(n)$).
>     
> 2. Loop posisi awal substring ($O(n)$).
>     
> 3. Loop titik pemisahan $k$ ($O(n)$).
>     
>     Ditambah pengecekan terhadap seluruh aturan produksi $|G|$. Untuk string yang sangat panjang, algoritma ini jauh lebih efisien dibandingkan mencoba semua kemungkinan derivasi secara brute force.
>     
> 
> #### Trade-off: Ekspresivitas vs Keputusan
> 
> Ada hukum dasar dalam teori automata: Semakin kuat (ekspresif) sebuah model bahasa, semakin sedikit masalah keputusannya yang dapat diselesaikan secara algoritmik. CFL lebih ekspresif daripada Bahasa Reguler (bisa menangani rekursi/stack), namun sebagai konsekuensinya, kita kehilangan kemampuan untuk membandingkan dua bahasa (Undecidable Equivalence).
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 15_2025 CNF & CFL Properties (Hal 28-43).
>     
> - Algoritma CYK untuk Parsing Struktur Bahasa.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa syarat utama grammar agar bisa diproses dengan algoritma CYK?</strong></summary>
> 
> Grammar harus dalam bentuk Chomsky Normal Form (CNF).
> 
> </details>
> <details>
> 
> <summary><strong>2. Bagaimana cara mengetahui bahwa sebuah string diterima dalam tabel CYK?</strong></summary>
> 
> Jika simbol start $S$ muncul pada sel paling atas (sel $X_{1n}$ yang mencakup seluruh panjang string).
> 
> </details>
> <details>
> 
> <summary><strong>3. Berapa kompleksitas waktu algoritma CYK untuk string sepanjang $n$?</strong></summary>
> 
> $O(n^3)$.
> 
> </details>
> <details>
> 
> <summary><strong>4. Mengapa masalah Equivalence pada CFL bersifat Undecidable?</strong></summary>
> 
> Karena tidak ada algoritma umum yang dapat secara pasti memverifikasi kesamaan dua struktur bahasa yang memiliki fleksibilitas bebas konteks (tidak ada prosedur mekanis tunggal yang mencakup semua kasus).
> 
> </details>
> <details>
> 
> <summary><strong>5. Apa yang disimpan dalam sel tabel $X_{ij}$ pada algoritma CYK?</strong></summary>
> 
> Himpunan semua variabel yang dapat menghasilkan substring string input dari posisi $i$ sampai posisi $j$.
> 
> </details>