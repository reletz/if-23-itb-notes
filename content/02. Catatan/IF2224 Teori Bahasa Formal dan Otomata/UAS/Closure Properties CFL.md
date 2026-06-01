---
type: Note
tags:
  - CFG
  - Pembuktian
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Sifat Ketertutupan (Closure Properties) CFL
> 
> > ## Questions/Cues
> >
> > - **Definisi Closure**
> >     
> > - **Daftar Operasi "Closed"**
> >     
> > - **Bukti Union/Concat/Star**
> >     
> > - **Apa itu Substitusi?**
> >     
> > - **Homomorfisma (vs Inverse)**
> >     
> > - **Daftar Operasi "Not Closed"**
> >     
> > - **Bukti Intersection Gagal**
> >     
> > - **Bukti Complement Gagal**
> >     
> > - **CFL** $\cap$ **Regular?**
> >     
> >
> > ## Reference Points
> >
> > - **Slide-15_2025_CNF.pdf** (Hal 16-27) - _Sumber Utama_
> >     
> > - **Bab 7 Sifat2 CFG.pdf** (Hal 18-40) - _Detail Pembuktian_
> >     
> 
> > ### 1. Konsep Dasar Ketertutupan
> >
> > Sebuah kelas bahasa dikatakan tertutup (closed) terhadap suatu operasi jika:
> > 
> > "Mengambil anggota dari kelas tersebut, lalu melakukan operasi padanya, hasilnya DIJAMIN tetap anggota kelas tersebut."
> >
> > **Analogi:** Himpunan bilangan bulat tertutup terhadap penjumlahan ($1+2=3$, masih bulat), tapi TIDAK tertutup terhadap pembagian ($1/2=0.5$, bukan bulat).
> >
> > ### 2. Operasi yang TERTUTUP (Closed) untuk CFL
> >
> > Jika $L_1$ dan $L_2$ adalah CFL, maka hasil operasi berikut **PASTI** CFL:
> >
> > #### A. Operasi Standar (Union, Concatenation, Kleene Star)
> >
> > Pembuktiannya sangat mudah menggunakan konstruksi Grammar:
> >
> > - **Union (**$L_1 \cup L_2$**):** Buat start symbol baru $S \to S_1 \mid S_2$.
> >     
> > - **Concatenation (**$L_1 \cdot L_2$**):** Buat start symbol baru $S \to S_1 S_2$.
> >     
> > - **Kleene Star (**$L_1^*$**):** Buat start symbol baru $S \to S_1 S \mid \epsilon$.
> >     
> > - **Reversal (**$L^R$**):** Balik urutan body di setiap produksi ($A \to \alpha$ menjadi $A \to \alpha^R$).
> >     
> >
> > #### B. Substitusi (Substitution)
> >
> > Definisi: Mengganti setiap terminal $a$ dalam bahasa $L$ dengan sebuah bahasa lain $L_a$.
> >
> > - **Teorema:** Jika $L$ adalah CFL, dan setiap terminal $a$ diganti dengan bahasa $L_a$ yang juga CFL, maka hasilnya tetap CFL.
> >     
> > - **Logika Grammar:** Ganti terminal $a$ di body produksi dengan Start Symbol dari grammar $L_a$.
> >     
> >
> > #### C. Homomorfisma (Homomorphism)
> >
> > Definisi: Kasus khusus dari substitusi di mana setiap terminal $a$ diganti dengan satu string tertentu $w$ (bukan bahasa).
> >
> > - Karena substitusi bersifat tertutup, otomatis homomorfisma juga tertutup.
> >
> > #### D. Inverse Homomorphism ($h^{-1}(L)$)
> >
> > Definisi: Mencari semua string $w$ sedemikian sehingga jika diterjemahkan oleh $h$, hasilnya ada di $L$.
> >
> > - **Bukti:** Menggunakan konstruksi PDA dengan "Buffer State" yang membaca input, menerjemahkannya, lalu mensimulasikan PDA asli.
> >     
> >
> > ### 3. Operasi yang TIDAK TERTUTUP (Not Closed)
> >
> > Ini adalah kelemahan CFL dibanding Bahasa Reguler (Regular Languages).
> >
> > #### A. Intersection (Irisan) - $L_1 \cap L_2$  
> >
> > **CFL** $\cap$ **CFL** $\neq$ **CFL.**
> >
> > Bukti dengan Counter-Example:
> > 
> > Kita tahu bahasa $\{a^n b^n c^n\}$ BUKAN CFL (bisa dibuktikan dengan Pumping Lemma). Namun, bahasa ini bisa dibentuk dari irisan dua CFL sederhana:
> >
> > 1. $L_1 = \{a^n b^n c^m \mid n,m \ge 0\}$ (Jumlah a=b, c bebas). Ini CFL.
> >     
> > 2. $L_2 = \{a^m b^n c^n \mid m,n \ge 0\}$ (a bebas, jumlah b=c). Ini CFL.
> >     
> > 3. $L_1 \cap L_2 = \{a^n b^n c^n \mid n=n, m=n\} = \{a^n b^n c^n\}$.
> >     
> >     Karena hasil irisannya bukan CFL, maka CFL tidak tertutup terhadap irisan.
> >     
> >
> > #### B. Complement (Komplemen) - $\overline{L}$  
> >
> > Bukti dengan Kontradiksi:
> > 
> > Hukum De Morgan mengatakan:
> > 
> > $$L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}$$
> > 
> > Kita tahu:
> >
> > 1. CFL tertutup terhadap Union ($\cup$).
> >     
> > 2. Jika CFL tertutup terhadap Complement, maka $\overline{L_1}$ dan $\overline{L_2}$ adalah CFL. Hasil union mereka CFL. Dan komplemen dari hasil union itu juga CFL.
> >     
> > 3. Kesimpulan: Jika Complement tertutup, maka Intersection HARUS tertutup.
> >     
> > 4. **TAPI**, kita baru saja membuktikan Intersection TIDAK tertutup.
> >     
> > 5. Maka asumsi awal salah. Complement TIDAK tertutup.
> >     
> >
> > #### C. Set Difference ($L_1 - L_2$)
> >
> > Tidak tertutup karena $L_1 - L_2$ sama dengan $L_1 \cap \overline{L_2}$. Karena melibatkan komplemen dan irisan, operasi ini juga gagal.
> >
> > ### 4. Pengecualian Spesial: Intersection dengan Regular
> >
> > Walaupun CFL $\cap$ CFL belum tentu CFL, tetapi:
> > 
> > CFL $\cap$ Regular Language = PASTI CFL.
> >
> > - **Logika:** Kita bisa menggabungkan PDA (untuk CFL) dengan Finite Automata (untuk Regular) menjadi PDA baru. State PDA baru adalah pasangan $(q_{PDA}, q_{FA})$.
> >     
> > - Sifat ini sangat berguna untuk membuktikan suatu bahasa BUKAN CFL dengan cara mengirisnya dengan Regular Language agar bentuknya jadi sederhana (seperti $a^n b^n c^n$).
> >     

> [!cornell] #### Summary
> 
> **Context-Free Languages (CFL)** memiliki sifat ketertutupan yang lebih lemah daripada Bahasa Reguler. CFL **TERTUTUP** terhadap operasi generatif seperti Union, Concatenation, Kleene Star, Reversal, Substitusi, Homomorfisma, dan Inverse Homomorfisma. Namun, CFL **TIDAK TERTUTUP** terhadap operasi pembatas seperti Intersection (Irisan) dan Complement (Komplemen). Contoh klasiknya adalah irisan dua CFL $L_1=\{a^n b^n c^m\}$ dan $L_2=\{a^m b^n c^n\}$ menghasilkan bahasa $\{a^n b^n c^n\}$ yang bukan CFL. Meski begitu, irisan antara CFL dengan Bahasa Reguler dijamin menghasilkan CFL.

> [!ad-libitum]- Ad Libitum: Pendalaman & Strategi Bukti
> 
> #### 1. Mengapa Intersection Gagal? (Intuisi Stack)
> 
> Bayangkan PDA. Ia hanya punya **satu** stack.
> 
> - Untuk mengenali $L_1 = \{a^n b^n c^m\}$, PDA menggunakan stack untuk mencocokkan jumlah $a$ dan $b$. Bagian $c$ diabaikan.
>     
> - Untuk mengenali $L_2 = \{a^m b^n c^n\}$, PDA menggunakan stack untuk mencocokkan jumlah $b$ dan $c$.
>     
> - Untuk mengenali irisannya $\{a^n b^n c^n\}$, mesin perlu mencocokkan $a=b$ DAN $b=c$ secara bersamaan.
>     
> - Masalahnya: Saat selesai mencocokkan $a$ dan $b$, stack sudah kosong (atau isinya sudah di-pop). Mesin "lupa" berapa jumlah $n$ tadi, sehingga tidak bisa membandingkannya lagi dengan $c$. Kita butuh **dua stack** untuk ini, yang mana itu adalah kekuatan _Turing Machine_, bukan PDA.
>     
> 
> #### 2. Strategi Membuktikan Bahasa BUKAN CFL
> 
> Jika Anda diminta membuktikan bahasa $L$ (yang aneh dan rumit) bukan CFL, jangan langsung pakai Pumping Lemma jika susah. Gunakan sifat **Closure Intersection dengan Regular Set**:
> 
> 1. Cari bahasa Regular $R$ yang sederhana.
>     
> 2. Lakukan $L \cap R$.
>     
> 3. Jika hasilnya adalah bahasa klasik non-CFL (seperti $a^n b^n c^n$ atau $ww$), maka $L$ asli pasti bukan CFL.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Sebutkan 3 operasi yang membuat CFL tetap menjadi CFL (Closed)!</strong></summary>
> 
> Union, Concatenation, Kleene Star (atau Substitution, Homomorphism, Reversal).
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Sebutkan 2 operasi yang bisa mengubah CFL menjadi bukan CFL (Not Closed)!</strong></summary>
> 
> Intersection dan Complement (serta Set Difference).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apakah hasil irisan antara CFL dengan Bahasa Reguler?</strong></summary>
> 
> Hasilnya PASTI CFL. (CFL $\cap$ Regular = CFL).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Mengapa kita bisa menyimpulkan Complement tidak closed jika kita sudah tahu Intersection tidak closed?</strong></summary>
> 
> Karena Intersection bisa dinyatakan dalam bentuk Union dan Complement (Hukum De Morgan). Karena Union closed, jika Complement closed, maka Intersection terpaksa harus closed juga (padahal tidak).
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa bukti penyangkal (counter-example) untuk Intersection CFL?</strong></summary>
> 
> Bahasa $\{a^n b^n c^m\}$ diiris dengan $\{a^m b^n c^n\}$ menghasilkan $\{a^n b^n c^n\}$, yang bukan merupakan Context-Free Language.
> 
> </details>