---
type: Note
tags:
  - Komputasi
  - PDA
  - CFG
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: PDA dan Context-Free Grammar (CFG)
> 
> > ## Questions/Cues
> >
> > - **Apa Hubungan PDA & CFG?**
> >     
> > - **Mengapa Ekuivalen?**
> >     
> > - **Algoritma CFG** $\to$ **PDA**
> >     
> > - **Ide Dasar Simulasi**
> >     
> > - **Hanya butuh 1 State?**
> >     
> > - **Algoritma PDA** $\to$ **CFG**
> >     
> > - **Arti Variabel** $[pXq]$  
> >     
> > - **Contoh Konversi**
> >     
> >
> > ## Reference Points
> >
> > - Bab 6 PDA.pdf (Halaman 53-72)
> >     
> > - Konsep "Leftmost Derivation"
> >     
> 
> > ### 1. Ekuivalensi Kekuatan (The Power Duo)
> >
> > PDA dan CFG memiliki kekuatan ekspresif yang setara dalam mendefinisikan bahasa.
> >
> > - **Teorema:** Sebuah bahasa adalah Context-Free Language (CFL) **JIKA DAN HANYA JIKA** ada PDA yang menerimanya.
> >     
> > - **CFG:** Cara _generatif_ (membuat string dari aturan).
> >     
> > - **PDA:** Cara _rekognisi_ (mengecek string dengan mesin).
> > 
> > ![[Pasted image 20251223000415.png]]
> >     
> >
> > **Penting:** Hanya **Non-deterministic PDA (NPDA)** yang ekuivalen sepenuhnya dengan CFG. Deterministic PDA (DPDA) hanya mencakup sebagian kecil dari CFL (biasanya untuk parsing bahasa pemrograman) (dibahas nanti).
> >
> > ### 2. Konversi CFG ke PDA (Metode Empty Stack)
> >
> > Cara termudah mengubah Grammar menjadi Mesin adalah dengan mensimulasikan proses **Derivasi Paling Kiri (Leftmost Derivation)** di dalam stack PDA.
> >
> > **Prinsip**: PDA akan "meniru" langkah-langkah derivasi CFG pada stacknya.
> >
> > **Remember**: Leftmost Derivation bentuknya $xAα$ dimana:
> > - $x$: string *terminal* yang sudah diproses (sudah cocok dengan input)
> > - $A$: *variabel* paling kiri yang belum diganti
> > - $α$: bagian yang masih tersisa (tail)
> > 
> > #### Resep Konstruksi
> >
> > 1. **State:** Cukup gunakan **1 State** saja (misal $q$). Mesin ini tidak butuh pindah-pindah state, hanya fokus manipulasi stack.
> >     
> > 2. **Stack Symbol (**$\Gamma$**):** Gabungan dari Variabel ($V$) dan Terminal ($T$) milik CFG.
> >     
> > 3. **Start Symbol Stack:** Sama dengan Start Symbol Grammar ($S$).
> >     
> > 4. **Jenis Transisi (**$\delta$**):**
> >     
> >     - **Tipe 1 (Expand Variabel):** Jika Top Stack adalah Variabel (misal $A$), ganti dengan hasil produksinya (tanpa baca input/$\epsilon$).
> >         
> >         - Rule: $A \to \alpha$ $\Rightarrow$ $\delta(q, \epsilon, A) = \{(q, \alpha)\}$  
> >             
> >     - **Tipe 2 (Match Terminal):** Jika Top Stack adalah Terminal (misal $a$), cocokkan dengan input asli. Jika sama, pop keduanya.
> >         
> >         - Rule: $\delta(q, a, a) = \{(q, \epsilon)\}$  
> >             
> > 
> > #### Resep Konstruksi (Formal)
> > 
> > **Diberikan** CFG $G = (V, T, Q, S)$
> > **Susun** PDA $PG = (\{q\}, T , V ∪ T , δ, q, S)$ dengan:
> > - Hanya satu state: $\{q\}$
> > - Input alphabet: $T$ (terminal dari CFG)
> > - Stack alphabet: $V ∪ T$ (variabel dan terminal)
> > - Start stack symbol: $S$ (start symbol CFG)
> > 
> > **Fungsi Transisi**: 
> > Untuk variabel $A ∈ V$ :
> > $$δ(q, ε, A) = \{(q, β) : A → β ∈ Q\}$$
> > 
> > Untuk terminal $a ∈ T$ :
> > $$δ(q, a, a) = \{(q, ε)\}$$
> > 
> > ### 3. Contoh Studi Kasus: CFG $\to$ PDA
> >
> > Diberikan CFG:
> > 
> > $S \to 0S1 \mid \epsilon$
> > 
> > (Bahasa $0^n 1^n$)
> >
> > **Langkah Konversi:**
> > 
> > Kita buat PDA dengan state tunggal $q$.
> >
> > **1. Buat Aturan Expand (Transisi $\epsilon$):**
> > 
> > Lihat aturan produksi CFG:
> >
> > - Dari $S \to 0S1$: Tambahkan $\delta(q, \epsilon, S) = \{(q, 0S1)\}$  
> >     
> > - Dari $S \to \epsilon$: Tambahkan $\delta(q, \epsilon, S) = \{(q, \epsilon)\}$  
> >     
> >
> > **2. Buat Aturan Match (Transisi Input):**
> > 
> > Untuk setiap terminal ($0$ dan $1$) di grammar:
> >
> > - $\delta(q, 0, 0) = \{(q, \epsilon)\}$ (Jika stack minta 0, dan input ada 0, coret keduanya).
> >     
> > - $\delta(q, 1, 1) = \{(q, \epsilon)\}$ (Jika stack minta 1, dan input ada 1, coret keduanya).
> >     
> >
> > **Simulasi String "01":**
> > 
> > Stack awal berisi $S$.
> >
> > 1. $(q, 01, S) \vdash (q, 01, 0S1)$ (Expand $S \to 0S1$)
> >     
> > 2. $\vdash (q, 1, S1)$ (Match input `0` dengan top stack `0`)
> >     
> > 3. $\vdash (q, 1, 1)$ (Expand $S \to \epsilon$. $S$ hilang, sisa $1$)
> >     
> > 4. $\vdash (q, \epsilon, \epsilon)$ (Match input `1` dengan top stack `1`. Stack Kosong $\to$ **DITERIMA**)
> >     
> >
> > ### 4. Konversi PDA ke CFG (Konsep Inti)
> >
> > Ini jauh lebih rumit. Idenya adalah mengubah "sejarah perjalanan" mesin antar state menjadi Variabel Grammar.
> >
> > **Variabel Komposit $[pXq]$:**
> > 
> > Variabel ini bermakna: "Satu proses komputasi yang dimulai di state $p$ dengan top stack $X$, dan berakhir di state $q$ setelah stack $X$ tersebut (dan semua anak-anaknya) habis di-pop."
> >
> > **Logika Konversi Transisi:**
> >
> > - **Jika POP:** $\delta(p, a, X) = \{(q, \epsilon)\}$  
> >     
> > 	- Grammar: $[pXq] \to a$  
> > 			
> > 	- _Artinya:_ Dari $p$, baca $a$, buang $X$, sampai di $q$. Selesai.
> > 			
> > - **Jika PUSH:** $\delta(p, a, X) = \{(q, YZ)\}$  
> >     
> > 	- Ini ribet. Kita harus menebak "titik tengah" perjalanan.
> > 			
> > 	- Grammar: $[pXr] \to a [qYk] [kZr]$  
> > 			
> > 	- _Artinya:_ Baca $a$, lalu tugas dipecah dua: sub-tugas bereskan $Y$ (dari state $q$ ke $k$) dan sub-tugas bereskan $Z$ (dari state $k$ ke $r$). State perantara $k$ dan state akhir $r$ harus dicoba semua kombinasinya.
> > 			
> >
> > ### 5. Studi Kasus: PDA ke CFG (Latihan 6.3.3)
> >
> > Diberikan PDA dengan 2 state ($p, q$) dan transisi berikut. Mari ubah menjadi Grammar.
> > 
> > ![[Pasted image 20251223000232.png]]
> >
> > #### A. Setup Awal
> >
> > Start Symbol $S$ harus menghasilkan semua kemungkinan "perjalanan" dari start state $q$ untuk menghabiskan start symbol $Z_0$.
> >
> > - **Rule Awal:** $S \to [qZ_0q] \mid [qZ_0p]$  
> >     
> >
> > #### B. Konversi Transisi Pop (Mudah)
> >
> > Transisi: $\delta(q, \epsilon, X) = \{(q, \epsilon)\}$  
> >
> > - **Logika:** Dari $q$, baca $\epsilon$, pop $X$, berakhir di $q$.
> >     
> > - **Hasil CFG:** $[qXq] \to \epsilon$  
> >     
> >
> > Transisi: $\delta(p, 1, X) = \{(p, \epsilon)\}$  
> >
> > - **Logika:** Dari $p$, baca 1, pop $X$, berakhir di $p$.
> >     
> > - **Hasil CFG:** $[pXp] \to 1$  
> >     
> >
> > #### C. Konversi Transisi Stay/Replace (Sedang)
> >
> > Transisi: $\delta(q, 0, X) = \{(p, X)\}$  
> >
> > - **Logika:** Stack $X$ diganti $X$ lagi. Jadi perjalanan menghabiskan $X$ lama = baca 0 + perjalanan menghabiskan $X$ baru.
> >     
> > - **Hasil CFG (Coba semua state akhir):**
> >     
> >     1. $[qXq] \to 0 [pXq]$  
> >         
> >     2. $[qXp] \to 0 [pXp]$  
> >         
> >
> > #### D. Konversi Transisi Push (Rumit)
> >
> > Transisi: $\delta(q, 1, Z_0) = \{(q, XZ_0)\}$  
> >
> > - **Logika:** Stack $Z_0$ diganti $XZ_0$. Kita harus pecah tugas: bereskan $X$ dulu, baru bereskan $Z_0$.
> >     
> > - **Pola:** $[qZ_0\text{End}] \to 1 [qX\text{Mid}] [\text{Mid}Z_0\text{End}]$  
> >     
> > - **Hasil CFG (Kombinasi 2 State** $\times$ **2 State = 4 Aturan):**
> >     
> > 	1. $[qZ_0q] \to 1 [qXq] [qZ_0q]$ (Mid: $q$, End: $q$)
> > 			
> > 	2. $[qZ_0p] \to 1 [qXq] [qZ_0p]$ (Mid: $q$, End: $p$)
> > 			
> > 	3. $[qZ_0q] \to 1 [qXp] [pZ_0q]$ (Mid: $p$, End: $q$)
> > 			
> > 	4. $[qZ_0p] \to 1 [qXp] [pZ_0p]$ (Mid: $p$, End: $p$)
> > 			


> [!cornell] #### Summary
> 
> **CFG dan PDA** adalah ekuivalen. Kita bisa mengubah sembarang CFG menjadi PDA yang hanya memiliki **1 state** menggunakan metode **Empty Stack**. Stack PDA berfungsi sebagai tempat simulasi derivasi: Variabel di-expand (push body produksi), dan Terminal di-match (pop jika sesuai input). Sebaliknya, mengubah PDA ke CFG membutuhkan variabel kompleks berbentuk $[pXq]$ yang merepresentasikan perjalanan mesin menghabiskan simbol stack $X$ dari state $p$ ke $q$.

> [!ad-libitum]- Ad Libitum: Detail Transisi PDA ke CFG
> 
> #### Contoh Transisi Push (Exercise 6.3.3)
> 
> Misal ada transisi PDA: $\delta(q, 1, Z) = \{(q, XZ)\}$.
> 
> Ini adalah operasi PUSH ($Z$ diganti $XZ$).
> 
> Dalam CFG, ini diterjemahkan menjadi sekumpulan aturan untuk Variabel $[qZ...]$.
> 
> Karena stack menjadi $XZ$ (dua tumpuk), perjalanan harus dibagi dua seri.
> 
> **Pola Umum:** $[qZ\_akhir] \to 1 [qX\_tengah] [\_tengahZ\_akhir]$  
> 
> Jika state PDA hanya ada dua ($p, q$), kita harus membuat kombinasi untuk semua kemungkinan state "tengah" dan "akhir":
> 
> 1. Target akhir $q$, tengah $q$:
>     
>     $[qZq] \to 1 [qXq] [qZq]$
>     
> 2. Target akhir $p$, tengah $q$:
>     
>     $[qZp] \to 1 [qXq] [qZp]$
>     
> 3. Target akhir $q$, tengah $p$:
>     
>     $[qZq] \to 1 [qXp] [pZq]$
>     
> 4. Target akhir $p$, tengah $p$:
>     
>     $[qZp] \to 1 [qXp] [pZp]$
>     
> 
> Bayangkan betapa banyaknya aturan produksi yang dihasilkan dari satu transisi PDA saja!

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa konversi CFG ke PDA umumnya hanya menggunakan 1 state?</strong></summary>
> 
> Karena logika percabangan/keputusan sudah diwakili oleh simbol-simbol Variabel di dalam stack. State hanya berfungsi sebagai "tempat berjalannya mesin", sementara memori kontrol ada di stack.
> 
> </details>
> <details>
> 
> <summary><strong>2. Apa makna variabel $[pXq]$ dalam konversi PDA ke CFG?</strong></summary>
> 
> $[pXq]$ merepresentasikan proses menghabiskan simbol $X$ dari stack, dimulai saat mesin di state $p$ dan berakhir saat mesin sampai di state $q$ (tepat saat $X$ di-pop bersih).
> 
> </details>
> <details>
> 
> <summary><strong>3. Dalam konversi CFG ke PDA, apa yang dilakukan mesin jika Top Stack adalah Terminal?</strong></summary>
> 
> Mesin melakukan "Matching". Ia mengecek apakah input saat ini sama dengan terminal di stack. Jika sama, keduanya dihapus (pop & next input). Jika beda, mesin crash/reject.
> 
> </details>
> <details>
> 
> <summary><strong>4. Apakah DPDA (Deterministic) bisa dikonversi menjadi CFG yang mencakup seluruh CFL?</strong></summary>
> 
> Tidak selalu. DPDA hanya setara dengan subset dari CFL (disebut Deterministic CFL). Ada bahasa CFL (inherently ambiguous) yang tidak bisa dikenali oleh DPDA.
> 
> </details>
