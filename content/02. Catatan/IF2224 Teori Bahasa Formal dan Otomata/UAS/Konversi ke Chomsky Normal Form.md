---
type: Note
tags:
  - CFG
  - CNF
  - Algoritma
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Konversi ke Chomsky Normal Form (CNF)
> 
> > ## Questions/Cues
> >
> > - **Definisi Formal CNF**
> >     
> > - **Mengapa bentuk lain salah?**
> >     
> > - **Prasyarat Konversi**
> >     
> > - **Algoritma Utama**
> >     
> > - **Step 1: Pisahkan Terminal**
> >     
> > - Variabel baru ($X_a$)
> >     
> > - **Step 2: Pecah Body Panjang**
> >     
> > - Teknik _Cascading_
> >     
> > - Jumlah variabel baru
> >     
> > - **Studi Kasus Lengkap**
> >     
> > - Contoh Ekspresi Matematika
> >     
> >
> > ## Reference Points
> >
> > - **Slide-15_2025_CNF.pdf** (Hal 10-14) - _Sumber Contoh Lengkap_
> >     
> > - Bab 7 Sifat2 CFG.pdf (Hal 13-14)
> >     
> 
> > ### 1. Definisi Ketat Chomsky Normal Form
> >
> > Sebuah CFG dikatakan dalam bentuk CNF jika dan hanya jika **setiap** aturan produksinya memenuhi salah satu dari dua pola ini:
> >
> > 1. Variabel $\to$ Dua Variabel:
> >     
> > 	$$A \to BC$$
> > 	
> > 	(Syarat: B dan C adalah variabel, bukan terminal)
> >     
> > 2. Variabel $\to$ Satu Terminal:
> >     
> > 	$$A \to a$$
> > 	
> > 	(Syarat: a adalah terminal)
> >     
> >
> > **Bentuk yang DILARANG di CNF:**
> >
> > - $A \to aB$ (Campuran terminal & variabel di body $\ge 2$)
> >     
> > - $A \to ABC$ (Lebih dari 2 variabel)
> >     
> > - $A \to \epsilon$ (Kecuali pada Start Symbol, jika bahasa memuat $\epsilon$)
> >     
> > - $A \to B$ (Unit production)
> >     
> >
> > ### 2. Algoritma Konversi (Setelah Penyederhanaan)
> >
> > Asumsikan grammar sudah "bersih" (bebas $\epsilon$, unit, useless). Kita tinggal memperbaiki **bentuk** body produksinya.
> >
> > #### Langkah 1: Isolasi Terminal (Terminal Separation)
> >
> > Masalah: Ada aturan di mana terminal "bercampur" dengan variabel dalam body yang panjangnya $\ge 2$. Contoh: $A \to aBc$.
> >
> > **Solusi:**
> >
> > 1. Untuk setiap terminal $a$ yang muncul di body campuran, buat variabel baru (misal $X_a$ atau $T_a$).
> >     
> > 2. Tambahkan aturan: $X_a \to a$.
> >     
> > 3. Ganti semua kemunculan $a$ di body campuran dengan $X_a$.
> >     
> >
> > Contoh:
> > 
> > Awal: $S \to aSb$
> > 
> > Revisi:
> >
> > - Buat $A \to a$ dan $B \to b$.
> >     
> > - Ubah $S \to aSb$ menjadi $S \to ASB$.
> >     
> >
> > #### Langkah 2: Pecah Body Panjang (Cascading)
> >
> > Masalah: Ada aturan dengan $\ge 3$ variabel di body. Contoh: $S \to ASB$.
> >
> > **Solusi:**
> > 
> > Pecah menjadi rantai aturan biner menggunakan variabel perantara (new variables).
> >
> > Pola: $A \to V_1 V_2 V_3 ... V_k$
> > 
> > **Ubah menjadi:**
> > 
> > $A \to V_1 C_1$
> > 
> > $C_1 \to V_2 C_2$
> > 
> > ...
> > 
> > $C_{k-2} \to V_{k-1} V_k$
> >
> > _Contoh (_$S \to ASB$_):_
> >
> > 1. Ambil 2 simbol pertama/terakhir. Misal kita sisakan $A$ di depan.
> >     
> > 2. $S \to A C_1$  
> >     
> > 3. Sisa body adalah $SB$. Karena panjangnya sudah 2, jadikan aturan untuk $C_1$.
> >     
> > 4. $C_1 \to SB$.
> >     
> >     Hasil Akhir: $S \to AC_1, C_1 \to SB$ (Semuanya bentuk CNF).
> >     
> >
> > ### 3. Studi Kasus Lengkap (Walkthrough)
> >
> > Mari kita gunakan contoh kompleks dari **Slide-15_2025_CNF.pdf (Hal 12-14)**: Grammar Ekspresi Matematika.
> >
> > Grammar Awal (Setelah Simplify):
> > 
> > $E \to E+T \mid T*F \mid (E) \mid a$
> > 
> > $T \to T*F \mid (E) \mid a$
> > 
> > $F \to (E) \mid a$
> >
> > **Tahap 1: Pisahkan Terminal**
> > 
> > Terminal yang bercampur: $+$, $*$, $($, $)$.
> > 
> > Buat variabel baru untuk mereka:
> >
> > - $P \to +$ (Plus)
> >     
> > - $M \to *$ (Multiply)
> >     
> > - $L \to ($ (Left paren)
> >     
> > - $R \to )$ (Right paren)
> >     
> >
> > Substitusi ke grammar:
> > 
> > $E \to EPT \mid TMF \mid LER \mid a$
> > 
> > $T \to TMF \mid LER \mid a$
> > 
> > $F \to LER \mid a$
> > 
> > (Perhatikan: $E \to a$ dibiarkan karena sudah CNF)
> >
> > **Tahap 2: Pecah Body Panjang**
> > 
> > Kita punya body panjang 3 variabel: $EPT$, $TMF$, $LER$.
> >
> > 1. **Pecah** $E \to EPT$**:**
> >     
> > 	- $E \to E C_1$
> > 	- $C_1 \to PT$
> >  
> > 2. **Pecah** $T \to TMF$ **(dan** $E \to TMF$**):**
> >     
> > 	- $E \to T C_2$
> > 	- $T \to T C_2$
> > 	- $C_2 \to MF$
> >
> > 3. **Pecah** $F \to LER$ **(dan lainnya):**
> >     
> > 	- $F \to L C_3$
> > 	- $E \to L C_3$
> > 	- $T \to L C_3$
> > 	- $C_3 \to ER$
> > 
> > **Hasil Akhir Grammar CNF:**
> > 
> > $E \to EC_1 \mid TC_2 \mid LC_3 \mid a$
> > 
> > $T \to TC_2 \mid LC_3 \mid a$
> > 
> > $F \to LC_3 \mid a$
> >
> > $C_1 \to PT, \quad C_2 \to MF, \quad C_3 \to ER$
> > 
> > $P \to +, \quad M \to *, \quad L \to (, \quad R \to )$

> [!cornell] #### Summary
> 
> Konversi ke **Chomsky Normal Form (CNF)** berfokus pada restrukturisasi sintaksis grammar agar sesuai dengan format biner ketat ($A \to BC$ atau $A \to a$). Proses ini dilakukan setelah tahap penyederhanaan dan terdiri dari dua langkah sistematis: (1) **Isolasi Terminal**, di mana terminal yang berada dalam body majemuk diganti dengan variabel baru khusus, dan (2) **Pemecahan Body (Cascading)**, di mana produksi dengan 3 variabel atau lebih dipecah menjadi rantai produksi biner menggunakan variabel-variabel perantara baru. Hasil akhirnya adalah grammar yang secara struktural lebih besar (lebih banyak variabel) namun sangat teratur dan mudah diproses oleh mesin.