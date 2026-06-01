---
type: Note
tags:
  - CFG
  - Simplifikasi
  - Algoritma
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Teknik Penyederhanaan (Simplification) CFG
> 
> > ## Questions/Cues
> > 
> > - **Mengapa perlu disederhanakan?**
> >     
> > - **Urutan Pengerjaan (CRITICAL)**
> >     
> > - **1. Simbol Useless**
> >     
> > - _Generating_ vs _Reachable_
> >     
> > - Algoritma Pencarian Generating
> >     
> > - Algoritma Pencarian Reachable
> >     
> > - **2. Produksi Epsilon (**$\epsilon$**)**
> >     
> > - Definisi _Nullable Variable_
> >     
> > - Algoritma Pencarian Nullable
> >     
> > - Cara Substitusi Produksi
> >     
> > - **3. Produksi Unit**
> >     
> > - Masalah Unit Pair $(A, B)$  
> >     
> > - Algoritma Unit Pair
> >     
> > - Teknik Penghapusan
> >     
> >
> > ## Reference Points
> > 
> > - **Slide-13_2025_Properti CFL.pdf** (Hal 6-21) - _Sumber Utama Algoritma_
> >     
> > - Bab 7 Sifat2 CFG.pdf (Hal 4-12)
> >     
> > - Slide-15_2025_CNF.pdf (Hal 9)
> >     
> 
> > ### 1. Urutan Pengerjaan (The Golden Rule)
> > 
> > Dalam menyederhanakan tata bahasa, **urutan eksekusi algoritma sangat krusial**. Jika urutan salah, masalah yang sudah dihapus bisa muncul kembali.
> > 
> > **Urutan Wajib:**
> > 
> > 1. **Eliminasi** $\epsilon$**-Productions** (Hilangkan variabel yang bisa jadi kosong).
> >     
> > 2. **Eliminasi Unit Productions** (Hilangkan oper-operan variabel $A \to B$).
> >     
> > 3. **Eliminasi Useless Symbols** (Bersihkan sampah sisa).
> >     
> >     - _Sub-urutan:_ Cek **Generating** dulu, baru cek **Reachable**.
> >         
> >
> > ### 2. Eliminasi Simbol Useless (Sampah)
> > 
> > Simbol dianggap berguna (useful) HANYA jika memenuhi dua syarat sekaligus: **Generating** (bisa menghasilkan string) DAN **Reachable** (bisa diakses dari start).
> > 
> > #### A. Tahap 1: Generating Symbols ($g(G)$)
> > 
> > Simbol $X$ disebut _generating_ jika $X \Rightarrow^* w$ (terminal string).
> > 
> > **Algoritma Pencarian:**
> > 
> > 1. **Basis:** Semua simbol Terminal ($T$) otomatis masuk himpunan $g(G)$.
> >     
> > 2. **Induksi:** Jika ada produksi $A \to \alpha$ dimana semua simbol dalam string $\alpha$ SUDAH ada di $g(G)$, maka masukkan $A$ ke $g(G)$.
> >     
> > 3. Ulangi induksi sampai tidak ada penambahan baru.
> >     
> > 4. **Hapus** semua variabel yang TIDAK ada di $g(G)$ beserta produksi yang melibatkannya.
> >     
> > 
> > **Contoh:**
> > 
> > $S \to AB | a, \quad A \to b$
> > 
> > - Basis: $\{a, b\}$ generating.
> >     
> > - Langkah 1: $A \to b$ (body generating), jadi $A$ masuk. Set: $\{a, b, A\}$.
> >     
> > - Langkah 2: $S \to a$ (body generating), jadi $S$ masuk. Set: $\{a, b, A, S\}$.
> >     
> > - Variabel $B$ tidak pernah masuk karena tidak punya produksi menuju terminal. $B$ dihapus.
> >     
> > 
> > #### B. Tahap 2: Reachable Symbols ($r(G)$)
> > 
> > Simbol $X$ disebut _reachable_ jika $S \Rightarrow^* \alpha X \beta$.
> > 
> > **Algoritma Pencarian:**
> > 
> > 1. **Basis:** Start Symbol ($S$) otomatis masuk $r(G)$.
> >     
> > 2. **Induksi:** Untuk setiap variabel $A$ yang sudah ada di $r(G)$, cari semua produksinya $A \to X_1...X_k$. Masukkan semua simbol di body ($X_1...X_k$) ke dalam $r(G)$.
> >     
> > 3. Ulangi sampai jenuh.
> >     
> > 4. **Hapus** semua simbol yang TIDAK ada di $r(G)$.
> >     
> > 
> > _Penting:_ Lakukan tahap Generating dulu, baru Reachable. Jika dibalik, penghapusan simbol generating bisa menyebabkan simbol lain menjadi tidak reachable (kerja dua kali).
> >
> > ### 3. Eliminasi $\epsilon$-Productions (Nullable)
> > 
> > Tujuan: Menghapus aturan $A \to \epsilon$ tanpa mengubah bahasa (kecuali string kosong itu sendiri).
> > 
> > #### Langkah 1: Cari Nullable Variables ($n(G)$)
> > 
> > Variabel $A$ disebut _nullable_ jika $A \Rightarrow^* \epsilon$.
> > 
> > **Algoritma:**
> > 
> > 1. **Basis:** Jika ada produksi langsung $A \to \epsilon$, maka $A$ adalah nullable.
> >     
> > 2. **Induksi:** Jika ada produksi $B \to C_1 C_2 ... C_k$ dan SEMUA $C_i$ adalah nullable, maka $B$ juga nullable.
> >     
> > 
> > Contoh:
> > 
> > $S \to AB, \quad A \to \epsilon, \quad B \to \epsilon$
> > 
> > - Basis: $A, B$ nullable.
> >     
> > - Induksi: $S \to AB$ (A dan B nullable), maka $S$ juga nullable.
> >     
> > 
> > #### Langkah 2: Konstruksi Produksi Baru
> > 
> > Untuk setiap produksi $A \to X_1 ... X_m$:
> > 
> > 1. Identifikasi posisi simbol-simbol nullable di body.
> >     
> > 2. Buat variasi produksi dengan **menghadirkan** atau **menghilangkan** simbol nullable tersebut dalam segala kombinasi.
> >     
> > 3. **Hapus** produksi asli $A \to \epsilon$.
> >     
> > 
> > Contoh Kasus:
> > 
> > $S \to AB$, dimana $A, B$ nullable.
> > 
> > Kombinasi:
> > 
> > - $A$ hadir, $B$ hadir: $S \to AB$  
> >     
> > - $A$ hadir, $B$ hilang: $S \to A$  
> >     
> > - $A$ hilang, $B$ hadir: $S \to B$  
> >     
> > - $A$ hilang, $B$ hilang: $S \to \epsilon$ (Jangan dimasukkan jika tujuan kita menghapus $\epsilon$).
> >     
> >     Hasil: $S \to AB | A | B$.
> >     
> >
> > ### 4. Eliminasi Unit Productions
> > 
> > Unit production adalah aturan bentuk $A \to B$ (satu variabel ke satu variabel). Ini boros langkah.
> > 
> > #### Algoritma Unit Pairs
> > 
> > Kita mencari pasangan $(A, B)$ yang berarti "$A$ bisa berubah menjadi $B$ lewat serangkaian unit production".
> > 
> > 1. **Basis:** $(A, A)$ adalah unit pair untuk semua variabel.
> >     
> > 2. **Induksi:** Jika $(A, B)$ adalah unit pair, dan ada produksi unit $B \to C$, maka tambahkan $(A, C)$ sebagai unit pair.
> >     
> > 
> > Contoh:
> > 
> > $E \to T, \quad T \to F, \quad F \to a$
> > 
> > Unit Pairs:
> > 
> > - $(E, E), (T, T), (F, F)$ (Basis)
> >     
> > - $(E, T)$ (karena $E \to T$)
> >     
> > - $(T, F)$ (karena $T \to F$)
> >     
> > - $(E, F)$ (Transitif: $E \to T \to F$)
> >     
> > 
> > #### Langkah Penghapusan
> > 
> > 1. Untuk setiap unit pair $(A, B)$, cari aturan **non-unit** milik $B$ (misal $B \to \alpha$).
> >     
> > 2. Tambahkan aturan $A \to \alpha$ ke grammar.
> >     
> > 3. Hapus semua aturan unit asli ($A \to B$).
> >     
> > 
> > Hasil Contoh:
> > 
> > Pasangan $(E, F)$ berarti $E$ mewarisi aturan non-unit milik $F$.
> > 
> > $F \to a$ (non-unit), maka tambahkan $E \to a$.
> > 
> > Hasil akhir: $E$ punya aturan langsung ke terminal, rantai $E \to T \to F$ putus.

> [!cornell] #### Summary
> 
> Penyederhanaan CFG adalah proses sistematis yang **wajib** dilakukan sebelum konversi ke bentuk normal. Proses ini terdiri dari tiga algoritma utama yang harus dijalankan berurutan: (1) **Eliminasi** $\epsilon$ dengan mengidentifikasi variabel _nullable_ dan mensubstitusi kehadirannya; (2) **Eliminasi Unit** dengan melacak _unit pairs_ (pasangan pewarisan) dan menyalin body non-unit ke variabel leluhur; dan (3) **Eliminasi Useless** dengan menyaring simbol yang _generating_ (bisa jadi terminal) terlebih dahulu, baru menyaring yang _reachable_ (bisa diakses). Ketidakpatuhan pada urutan ini dapat menyebabkan ketidakefisienan atau kesalahan pada grammar hasil.