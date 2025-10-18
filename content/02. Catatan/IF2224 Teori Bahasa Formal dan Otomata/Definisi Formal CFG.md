---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >  
> >  - Apa definisi formal CFG?
> >      
> >  - Apa itu 4-tuple `G=(V,T,P,S)`?
> >      
> >  - Apa itu Variabel (V)?
> >      
> >  - Apa itu Terminal (T)?
> >      
> >  - Apa itu Aturan Produksi (P)?
> >      
> >  - Apa itu Simbol Awal (S)?
> >      
> >  - Bagaimana cara membedakan V & T?
> >      
> >  - Apa arti "Context-Free"?
> >      
> > 
> >  ## Reference Points
> >  
> >  - `slide-07.pdf` (hlm. 5-7)
> >      
> >  - `slide-09.pdf` (hlm. 3, 6)
> >      
> 
> > ### Definisi Formal Context-Free Grammar
> > 
> > Setelah memahami CFG secara informal, kita perlu mendefinisikannya secara matematis. Sebuah _Context-Free Grammar_ (CFG) secara formal didefinisikan sebagai sebuah **4-tuple** (empat komponen):
> > 
> > `G = (V, T, P, S)`
> > 
> > Di mana setiap komponen memiliki peran yang spesifik:
> > 
> > ### 1. V: Himpunan Variabel (Non-Terminal)
> > 
> > **V** adalah himpunan terbatas dari **variabel**, yang juga dikenal sebagai **non-terminal**.
> > 
> > - **Peran:** Variabel adalah simbol-simbol placeholder yang mewakili sebuah konsep, struktur, atau "kategori sintaksis" dalam bahasa. Mereka adalah blok bangunan abstrak yang harus diuraikan lebih lanjut.
> >     
> > - **Analogi:** Anggap variabel seperti nama bab dalam sebuah buku (misalnya, "Pendahuluan", "Isi"). Nama bab itu sendiri bukanlah konten, tetapi sebuah label untuk konten yang lebih detail.
> >     
> > - **Konvensi:** Biasanya ditulis dengan huruf besar, seperti `A`, `B`, `E`, `S`, atau diapit kurung sudut seperti `<statement>`.
> >     
> > - **Contoh:** Dalam `G_pal`, himpunan variabelnya adalah `V = {P}`.
> >     
> > 
> > ### 2. T: Himpunan Terminal
> > 
> > **T** adalah himpunan terbatas dari **terminal**.
> > 
> > - **Peran:** Terminal adalah simbol-simbol dasar dan konkret yang membentuk string akhir dalam bahasa. Mereka tidak dapat diuraikan atau digantikan lagi.
> >     
> > - **Analogi:** Jika variabel adalah "nama bab", maka terminal adalah "kata-kata" aktual yang ada di dalam bab tersebut.
> >     
> > - **Konvensi:** Biasanya ditulis dengan huruf kecil (`a`, `b`), angka (`0`, `1`), atau simbol operator (`+`, `*`, `(`). Himpunan `V` dan `T` harus saling lepas (tidak boleh ada simbol yang sama di keduanya).
> >     
> > - **Contoh:** Dalam `G_pal`, himpunan terminalnya adalah `T = {0, 1, ε}`.
> >     
> > 
> > ### 3. P: Himpunan Aturan Produksi
> > 
> > **P** adalah himpunan terbatas dari **aturan produksi** (atau sering disebut _rules_).
> > 
> > - **Peran:** Aturan produksi adalah jantung dari CFG. Aturan ini mendefinisikan cara-cara bagaimana variabel dapat digantikan atau diuraikan menjadi kombinasi variabel lain dan/atau terminal.
> >     
> > - **Format:** Setiap aturan berbentuk `A → α` (dibaca: "A menghasilkan α"), di mana:
> >     
> >     - `A` **harus** merupakan satu simbol variabel (anggota `V`).
> >         
> >     - `α` (alpha) adalah sebuah string yang bisa terdiri dari kombinasi variabel dan terminal (`α ∈ (V ∪ T)*`).
> >         
> > - **Contoh:** Dalam `G_pal`, himpunan produksinya adalah `P = {P → ε, P → 0, P → 1, P → 0P0, P → 1P1}`.
> >     
> > 
> > ### 4. S: Simbol Awal (Start Symbol)
> > 
> > **S** adalah satu variabel khusus yang disebut **simbol awal**.
> > 
> > - **Peran:** `S` adalah titik awal dari semua proses "pembangunan" atau penurunan string. Setiap string yang valid dalam bahasa harus dapat dihasilkan mulai dari `S`. `S` harus merupakan anggota dari `V`.
> >     
> > - **Analogi:** `S` adalah judul dari keseluruhan buku, atau variabel `<program>` dalam sebuah bahasa pemrograman.
> >     
> > - **Contoh:** Dalam `G_pal`, simbol awalnya adalah `S = P`.
> >     

> [!cornell] #### Summary
> 
> Definisi formal dari sebuah Context-Free Grammar (CFG) adalah sebuah 4-tuple `G = (V, T, P, S)` yang secara matematis menstrukturkan sebuah bahasa, di mana aturan utamanya terletak pada himpunan Aturan Produksi (P). Setiap aturan produksi harus memiliki satu Variabel (V) di sisi kiri, yang memungkinkannya diganti dengan kombinasi variabel dan Terminal (T) secara "bebas konteks"—artinya, penggantian ini berlaku tanpa mempedulikan simbol-simbol di sekitarnya, dan semua proses untuk menghasilkan string valid harus dimulai dari Simbol Awal (S).

> [!ad-libitum]- Additional Information
> 
> #### Mengapa Disebut "Context-Free" (Bebas Konteks)?
> 
> Nama "Context-Free" atau "Bebas Konteks" berasal dari batasan pada aturan produksinya (`A → α`). Aturan ini menyatakan bahwa variabel `A` dapat digantikan oleh `α` **kapan pun `A` muncul**, tanpa mempedulikan simbol-simbol di sekelilingnya (konteksnya). Misalnya, jika ada aturan `E → I`, maka di mana pun dalam string kita menemukan `E`, kita bisa menggantinya dengan `I`, baik itu dalam `(E)` maupun `E+E`. Ini berbeda dengan _Context-Sensitive Grammar_ (Tipe 1), di mana aturan bisa berbentuk `xAy → xαy`, yang artinya `A` hanya bisa menjadi `α` jika diapit oleh `x` dan `y`.
> 
> #### Notasi Alternatif
> 
> Aturan produksi sering kali dikelompokkan untuk variabel yang sama menggunakan simbol | (dibaca "atau"). Ini membuat grammar lebih ringkas. Contoh G_pal bisa ditulis sebagai:
> 
> P → ε | 0 | 1 | 0P0 | 1P1
> 
> #### Eksplorasi Mandiri
> 
> Kembali ke bahasa `L = {0^n1^n | n ≥ 0}` dari catatan sebelumnya. Aturan produksinya bisa jadi `S → 0S1 | ε`.
> 
> Coba definisikan bahasa ini secara formal menggunakan notasi 4-tuple `G = (V, T, P, S)`. Apa saja anggota dari masing-masing himpunan `V`, `T`, `P`, dan apa simbol `S`-nya?