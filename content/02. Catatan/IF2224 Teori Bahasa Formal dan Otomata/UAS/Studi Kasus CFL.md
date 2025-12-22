---
type: Note
tags:
  - CFG
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Studi Kasus & Latihan Soal (Penerapan Teori)
> 
> > ## Questions/Cues
> >
> > - **Strategi Konversi CNF**
> >     
> > - **Penanganan Unit &** $\epsilon$  
> >     
> > - **Trik Pembuktian Closure**
> >     
> > - **Logika Set Difference**
> >     
> > - **Tracing CYK Manual**
> >     
> > - **Analisis Tabel CYK**
> >     
> > - **Apa itu Pumping Lemma?**
> >     
> > - **Syarat Pumping Lemma**
> >     
> >
> > ## Reference Points
> >
> > - **Slide-15_2025_CNF.pdf** (Halaman 46) - _Sumber Soal Utama_
> >     
> > - **Bab 7 Sifat2 CFG.pdf** (Halaman 57, 68)
> >     
> 
> > ### 1. Studi Kasus 1: Konversi ke CNF
> >
> > Soal (Slide 15, Hal 46):
> > 
> > Ubah grammar berikut ke CNF: $S \to aSb \mid SS \mid \epsilon$
> >
> > **Penyelesaian Step-by-Step:**
> >
> > **Tahap 1: Eliminasi** $\epsilon$**-production**
> >
> > - Variabel Nullable: $S$ (karena $S \to \epsilon$).
> >     
> > - Produksi $S \to aSb$:
> >     
> > 	- S ada: $aSb$  
> > 			
> > 	- S hilang: $ab$  
> >         
> > - Produksi $S \to SS$:
> >     
> > 	- S dua-duanya ada: $SS$  
> > 			
> > 	- Satu S hilang: $S$  
> > 			
> > 	- Dua S hilang: $\epsilon$ (Hapus)
> > 			
> > - **Hasil Sementara:** $S \to aSb \mid ab \mid SS \mid S$  
> >     
> >
> > **Tahap 2: Eliminasi Unit Production**
> >
> > - Unit: $S \to S$ (Hapus saja, tidak ngefek).
> >     
> > - **Hasil Sementara:** $S \to aSb \mid ab \mid SS$  
> >     
> >
> > **Tahap 3: Konversi ke Bentuk Normal (**$A \to BC$ **atau** $A \to a$**)**
> >
> > - **Masalah 1:** $S \to ab$ (Terminal campur).
> >     
> > 	- Buat $A \to a$, $B \to b$.
> > 			
> > 	- Ubah jadi $S \to AB$.
> > 			
> > - **Masalah 2:** $S \to aSb$ (Panjang 3 & Terminal campur).
> >     
> > 	- Ubah terminal: $S \to A S B$.
> > 			
> > 	- Pecah body: $S \to A X_1$, $X_1 \to S B$.
> >         
> >
> > **Hasil Akhir (CNF):**
> >
> > 1. $S \to AX_1 \mid AB \mid SS$  
> >     
> > 2. $X_1 \to SB$  
> >     
> > 3. $A \to a$  
> >     
> > 4. $B \to b$
> >     
> >     (Catatan: Jika bahasa asli memuat $\epsilon$, boleh tambahkan $S \to \epsilon$ khusus di start symbol).
> >     
> >
> > ### 2. Studi Kasus 2: Pembuktian Closure
> >
> > Soal (Slide 15, Hal 46):
> > 
> > Apakah CFL tertutup (closed) terhadap operasi $L_1 - L_2$?
> > 
> > (Petunjuk: $L_1 - L_2 = L_1 \cap \overline{L_2}$)
> >
> > **Analisis Logika:**
> >
> > 1. Kita tahu rumus beda himpunan: $A - B = A \cap B^C$.
> >     
> > 2. Jadi, $L_1 - L_2$ melibatkan operasi **Komplemen** ($\overline{L_2}$) dan **Irisan** ($\cap$).
> >     
> > 3. **Fakta:** CFL TIDAK tertutup terhadap Komplemen.
> >     
> > 4. **Fakta:** CFL TIDAK tertutup terhadap Irisan.
> >     
> >
> > **Pembuktian Counter-Example:**
> >
> > - Misal $L_1 = \Sigma^*$ (Ini Regular, jadi pasti CFL).
> >     
> > - Misal $L_2$ adalah CFL.
> >     
> > - Maka $L_1 - L_2 = \Sigma^* - L_2 = \overline{L_2}$ (Komplemen dari $L_2$).
> >     
> > - Karena CFL tidak tertutup terhadap komplemen, maka operasi pengurangan ($L_1 - L_2$) juga **TIDAK TERTUTUP** (Not Closed).
> >     
> >
> > ### 3. Studi Kasus 3: Tracing Algoritma CYK
> >
> > Soal (Slide 15, Hal 46):
> > 
> > Cek apakah $w = \text{aabb}$ diterima oleh grammar:
> > 
> > $S \to AB$
> > 
> > $A \to AA \mid a$
> > 
> > $B \to BB \mid b$
> >
> > Penyelesaian Tabel CYK:
> > 
> > Input $w = a_1 a_2 b_3 b_4$.
> >
> > **Basis (Panjang 1):**
> >
> > - $X_{11}$ ($a$): $A \to a$. Isi **{A}**.
> >     
> > - $X_{22}$ ($a$): $A \to a$. Isi **{A}**.
> >     
> > - $X_{33}$ ($b$): $B \to b$. Isi **{B}**.
> >     
> > - $X_{44}$ ($b$): $B \to b$. Isi **{B}**.
> >     
> >
> > **Induksi (Panjang 2):**
> >
> > - $X_{12}$ ($aa$): $X_{11} \times X_{22} = \{A\} \times \{A\} = AA$. Cek $A \to AA$. Isi **{A}**.
> >     
> > - $X_{23}$ ($ab$): $X_{22} \times X_{33} = \{A\} \times \{B\} = AB$. Cek $S \to AB$. Isi **{S}**.
> >     
> > - $X_{34}$ ($bb$): $X_{33} \times X_{44} = \{B\} \times \{B\} = BB$. Cek $B \to BB$. Isi **{B}**.
> >     
> >
> > **Induksi (Panjang 3):**
> >
> > - $X_{13}$ ($aab$):
> >     
> >     - Split 1: $a \mid ab \to \{A\} \times \{S\} = AS$ (Tidak ada).
> >         
> >     - Split 2: $aa \mid b \to \{A\} \times \{B\} = AB$. Cek $S \to AB$. Isi **{S}**.
> >         
> > - $X_{24}$ ($abb$):
> >     
> >     - Split 1: $a \mid bb \to \{A\} \times \{B\} = AB$. Cek $S \to AB$. Isi **{S}**.
> >         
> >     - Split 2: $ab \mid b \to \{S\} \times \{B\} = SB$ (Tidak ada).
> >         
> >
> > **Induksi (Panjang 4 - Final):**
> >
> > - $X_{14}$ ($aabb$):
> >     
> >     - Split 1 ($a \mid abb$): $\{A\} \times \{S\} = AS$ (Nihil).
> >         
> >     - Split 2 ($aa \mid bb$): $\{A\} \times \{B\} = AB$. Ada $S \to AB$.
> >         
> >     - Split 3 ($aab \mid b$): $\{S\} \times \{B\} = SB$ (Nihil).
> >         
> > - Hasil $X_{14} = \{S\}$.
> >     
> >
> > **Kesimpulan:** Karena $S \in X_{14}$, maka string $aabb$ **DITERIMA (VALID)**.

> [!cornell] #### Summary
> 
> Latihan soal ini mendemonstrasikan aplikasi praktis dari teori CFL. **Konversi CNF** mengajarkan kita disiplin memecah struktur grammar kompleks menjadi bentuk biner sederhana. **Pembuktian Closure** melatih logika himpunan untuk membuktikan ketidaktetupan operasi pengurangan. **Algoritma CYK** membuktikan keampuhannya sebagai parser yang sistematis; meskipun kita bisa menebak $aabb$ valid secara intuitif ($A \to aa, B \to bb, S \to AB$), CYK memberikan bukti matematis yang tak terbantahkan melalui pengisian tabel.

> [!ad-libitum]- Ad Libitum: The Missing Link (Pumping Lemma)
> 
> Dalam slide sering disebutkan _"bisa dibuktikan dengan Pumping Lemma"_. Apa itu sebenarnya?
> 
> **Pumping Lemma untuk CFL** adalah alat utama untuk membuktikan sebuah bahasa **BUKAN** CFL.
> 
> Konsep Inti:
> 
> Jika $L$ adalah CFL, maka setiap string panjang $z$ di dalam $L$ dapat dipompa (diulang bagian tengahnya) dan hasilnya tetap di dalam $L$.
> 
> String $z$ dipecah jadi 5 bagian: $z = uvwxy$.
> 
> - **v** dan **x** adalah bagian yang bisa di-"pompa" (diulang $i$ kali).
>     
> - Syarat: $|vx| > 0$ (v dan x tidak boleh kosong barengan).
>     
> - Hasil: $uv^i w x^i y$ harus tetap ada di $L$ untuk setiap $i \ge 0$.
>     
> 
> **Cara Pakai untuk Pembuktian (Kontradiksi):**
> 
> 1. Anggap $L$ adalah CFL.
>     
> 2. Ambil string contoh yang "sulit", misal $z = a^n b^n c^n$.
>     
> 3. Tunjukkan bahwa bagaimanapun cara kita memecah $z$ jadi $uvwxy$, hasil pompanya ($uv^2wx^2y$) pasti akan merusak pola jumlah $a, b, c$ yang harus sama.
>     
> 4. Karena hasil pompa keluar dari bahasa, asumsi awal salah $\to$ $L$ **BUKAN CFL.**
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa operasi $L_1 - L_2$ tidak tertutup (not closed) pada CFL?</strong></summary>
> 
> Karena operasi selisih himpunan melibatkan operasi Komplemen ($L_1 \cap L_2^C$), dan CFL diketahui tidak tertutup terhadap Komplemen.
> 
> </details>
> <details>
> 
> <summary><strong>2. Dalam konversi CNF, apa yang harus dilakukan jika ada produksi $S \to aSb$?</strong></summary>
> 
> Terminal $a$ dan $b$ harus "dibungkus" menjadi variabel baru (misal $A \to a, B \to b$), dan body yang panjang harus dipecah (Cascading) menjadi $S \to A X_1$ dan $X_1 \to S B$.
> 
> </details>
> <details>
> 
> <summary><strong>3. Apa tanda sebuah string diterima oleh algoritma CYK?</strong></summary>
> 
> Jika pada sel puncak tabel (yang mewakili panjang string penuh, $X_{1n}$), terdapat Start Symbol ($S$).
> 
> </details>
> <details>
> 
> <summary><strong>4. Apa kegunaan utama Pumping Lemma dalam teori CFL?</strong></summary>
> 
> Digunakan untuk membuktikan bahwa suatu bahasa BUKAN merupakan Context-Free Language (biasanya bahasa yang butuh membandingkan 3 variabel atau lebih seperti $a^n b^n c^n$).
> 
> </details>