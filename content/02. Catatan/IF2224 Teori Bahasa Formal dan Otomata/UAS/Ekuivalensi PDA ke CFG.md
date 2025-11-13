---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Ekuivalensi PDA & CFG (Bagian 2: Konversi PDA ke CFG)
> 
> > ## Questions/Cues
> >
> > - Apa tujuan konversi PDA $\rightarrow$ CFG?
> >     
> > - Apa ide utama di balik konversi ini?
> >     
> > - Apa bentuk Variabel CFG yang baru?
> >     
> > - Apa arti dari Variabel $[pXq]$?
> >     
> > - Bagaimana konstruksi formal $G$ dari $P$?
> >     
> > - Aturan Tipe 1 (Start Symbol)
> >     
> > - Aturan Tipe 2 (Transisi PDA)
> >     
> > - Bagaimana Tipe 2 menangani PUSH ($k>0$)?
> >     
> > - Bagaimana Tipe 2 menangani POP ($k=0$)?
> >     
> > - Contoh: Konversi PDA (slide 12)
> >     
> > - Teorema 6.14
> >     
> >
> > ## Reference Points
> >
> > - Slide 12_2023_Equivalence PDA and CFG.pdf (hlm. 10-20)
> >     
> 
> > ### Tujuan: Konversi PDA $\rightarrow$ CFG
> >
> > Ini adalah pembuktian arah sebaliknya: membuktikan bahwa bahasa apa pun yang diterima oleh PDA (khususnya $N(P)$, _acceptance by empty stack_) dapat dibangkitkan oleh sebuah _Context-Free Grammar_ (CFG).
> >
> > **Tujuannya:** Diberikan PDA $P$, kita ingin membuat CFG $G$ sehingga $L(G) = N(P)$.
> >
> > ### Ide Utama: Variabel sebagai "Tugas Komputasi"
> >
> > Ide utamanya sangat cerdik. Kita akan membuat CFG di mana setiap _Variabel_ dalam grammar mewakili sebuah "tugas" atau "sub-komputasi" yang harus diselesaikan oleh PDA.
> >
> > ### Bentuk Variabel Baru: $[pXq]$  
> >
> > Variabel dalam grammar $G$ yang baru akan memiliki bentuk $[pXq]$.
> >
> > - $p$ adalah state _awal_ PDA.
> >     
> > - $X$ adalah simbol stack yang berada di _puncak_.
> >     
> > - $q$ adalah state _akhir_ PDA.
> >     
> >
> > ### Arti dari Variabel $[pXq]$  
> >
> > Variabel $[pXq]$ mewakili "tugas" berikut:
> >
> > **"Hasilkan semua string** $w$ **yang dapat membawa PDA dari state** $p$ **ke state** $q$**, di mana efek bersih dari komputasi ini adalah menghabiskan (POP) tepat satu simbol** $X$ **dari stack."**
> >
> > Secara formal, $[pXq] \Rightarrow^{*} w$ jika dan hanya jika $(p, w, X) \vdash^{*} (q, \epsilon, \epsilon)$.
> >
> > ### Konstruksi Formal $G$ dari $P$  
> >
> > Diberikan PDA $P=(Q,\Sigma,\Gamma,\delta,q_{0},Z_{0})$, kita definisikan CFG $G=(V,\Sigma,R,S)$ sebagai:
> >
> > - $\Sigma$: Himpunan Terminal $G$ (sama dengan alfabet input $P$).
> >     
> > - $V$: Himpunan Variabel $G$, terdiri dari:
> >     
> > 	1. Sebuah _Start Symbol_ baru, $S$.
> > 			
> > 	2. Semua kemungkinan kombinasi variabel $[pXq]$ (untuk setiap $p,q \in Q$ dan $X \in \Gamma$).
> >         
> > - $R$: Himpunan aturan produksi (dijelaskan di bawah).
> >     
> > - $S$: _Start Symbol_ baru.
> >     
> >
> > ### Aturan Produksi Tipe 1: Aturan Start Symbol
> >
> > Aturan pertama menghubungkan $S$ dengan tugas awal PDA.
> >
> > $$S \rightarrow [q_0 Z_0 p]$ , untuk setiap $p \in Q$$.
> >
> > - _Artinya:_ "Untuk memulai grammar, mulailah komputasi di state awal $q_0$ dengan simbol stack awal $Z_0$. Tujuannya adalah untuk mengosongkan stack dan berakhir di _state_ $p$ _manapun_." (Karena $N(P)$ tidak peduli state akhir).
> >     
> >
> > ### Aturan Produksi Tipe 2: Mensimulasikan Transisi PDA
> >
> > Ini adalah inti dari konstruksi. Untuk **setiap transisi** di PDA:
> >
> > $$\delta(q, a, X) = \{(r, Y_1 Y_2 \dots Y_k)\}$$  
> >
> > ...kita membuat serangkaian aturan produksi baru.
> >
> > 1. **Kasus** $k=0$ **(POP):** Jika $\delta(q, a, X) = \{(r, \epsilon)\}$  
> >     
> > 	- Ini adalah kasus dasar. Transisi ini membaca $a$, mem-POP $X$, dan berakhir di $r$.
> > 	- Ini persis menyelesaikan tugas $[qXr]$.
> > 	- Aturan: **$[qXr] \rightarrow a$** (catatan: $a$ bisa $\epsilon$).
> > 
> >
> > 2. **Kasus** $k>0$ **(PUSH/Ganti):** Jika $\delta(q, a, X) = \{(r, Y_1 Y_2 \dots Y_k)\}$  
> >     
> >
> > 	- Transisi ini membaca $a$, mem-POP $X$, dan me-PUSH $Y_1 \dots Y_k$.
> > 	- Tugas $[qXp]$ (tugas "mem-POP $X$ dan berakhir di $p$") sekarang dipecah menjadi:
> > 		1.  Baca $a$.
> > 		2.  Selesaikan $k$ sub-tugas baru secara berurutan:
> > 					- POP $Y_1$ (mulai dari state $r$, berakhir di state $r_1$ baru).
> > 					- POP $Y_2$ (mulai dari $r_1$, berakhir di $r_2$ baru).
> > 					- ...
> > 					- POP $Y_k$ (mulai dari $r_{k-1}$, berakhir di $p$ yang kita tuju).
> > 	- Aturan: **$[qXp] \rightarrow a [r Y_1 r_1] [r_1 Y_2 r_2] \dots [r_{k-1} Y_k p]$**
> > 	- **PENTING:** Aturan ini harus dibuat untuk *setiap kemungkinan kombinasi* state perantara $r_1, r_2, \dots, r_{k-1} \in Q$.
> > 
> >
> > ### Contoh: PDA (Slide 12)
> >
> > - $P$: $(\{q\}, \{i,e\}, \{Z\}, \delta, q, Z)$  
> >     
> > - $\delta(q, i, Z) = \{(q, ZZ)\}$ ($k=2$)
> >     
> > - $\delta(q, e, Z) = \{(q, \epsilon)\}$ ($k=0$)
> >     
> >
> > **Konstruksi** $G$**:**
> >
> > - Variabel $V$: $\{S, [qZq]\}$ (satu-satunya kombinasi state dan simbol stack).
> >     
> > - Aturan Tipe 1: $S \rightarrow [qZq]$ (karena $q_0=q, Z_0=Z$, dan $p=q$).
> >     
> > - Aturan Tipe 2 (dari $\delta(q, e, Z) = \{(q, \epsilon)\}$):
> >     
> >     - $k=0$. $q=q, a=e, X=Z, r=q$.
> >         
> >     - Aturan: $[qZq] \rightarrow e$  
> >         
> > - Aturan Tipe 2 (dari $\delta(q, i, Z) = \{(q, ZZ)\}$):
> >     
> >     - $k=2$. $q=q, a=i, X=Z, r=q, Y_1=Z, Y_2=Z$.
> >         
> >     - Kita butuh 1 state perantara $r_1$. Satu-satunya pilihan adalah $r_1=q$.
> >         
> >     - Aturan: $[qZq] \rightarrow i [q Y_1 r_1] [r_1 Y_2 q]$  
> >         
> >     - Substitusi: $[qZq] \rightarrow i [qZq] [qZq]$  
> >         
> >
> > **Grammar Final:**
> > 
> > Jika kita ganti $A = [qZq]$, kita dapatkan:
> > 
> > $S \rightarrow A$
> > 
> > $A \rightarrow iAA \mid e$ (Ini adalah grammar terkenal untuk bahasa "Dyck" atau string kurung buka-tutup yang seimbang).
> >
> > ### Teorema 6.14
> >
> > Jika $G$ dibuat dari PDA $P$ dengan metode di atas, maka $L(G) = N(P)$. Ini membuktikan bahwa untuk setiap PDA (by empty stack), ada CFG yang ekuivalen.

> [!cornell] #### Summary
> 
> **Setiap** _**Pushdown Automata**_ **(PDA) yang menerima via** _**empty stack**_ **dapat diubah menjadi** _**Context-Free Grammar**_ **(CFG) yang ekuivalen. Metode ini menciptakan Variabel grammar baru yang canggih berbentuk** $[pXq]$**, yang merepresentasikan "tugas" untuk menghasilkan string** $w$ **yang membawa PDA dari state** $p$ **ke state** $q$ **dengan efek bersih mem-POP** $X$**. Aturan produksi CFG kemudian dibangun dengan memecah setiap transisi PDA menjadi serangkaian sub-tugas (sub-variabel) ini. Aturan** _**Start Symbol**_ $S$ **bertugas memulai komputasi dari** $(q_0, Z_0)$ **untuk berakhir di state manapun dengan stack kosong.**

> [!ad-libitum]- Additional Information
> 
> #### Kompleksitas Konstruksi PDA $\rightarrow$ CFG
> 
> Metode konstruksi ini, meskipun terbukti benar, sangat tidak praktis untuk dilakukan manual pada PDA yang besar.
> 
> - **Jumlah Variabel:** Jika PDA memiliki $|Q|$ state dan $|\Gamma|$ simbol stack, CFG akan memiliki $1 + (|Q|^2 \times |\Gamma|)$ variabel. Untuk PDA dengan 5 state dan 3 simbol stack, kita sudah memiliki $1 + (25 \times 3) = 76$ variabel.
>     
> - **Jumlah Aturan:** Jumlah aturan produksi bisa meledak secara eksponensial. Untuk transisi PUSH $k$ simbol: $\delta(q, a, X) \rightarrow (r, Y_1 \dots Y_k)$, kita harus membuat $1 \times |Q|^{k-1}$ aturan produksi baru (satu untuk setiap kombinasi state perantara $r_1 \dots r_{k-1}$).
>     
> 
> Inilah sebabnya mengapa dalam praktiknya, lebih mudah mengubah CFG ke PDA daripada sebaliknya.
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan aturan produksi untuk PDA $L_{wcwr}$ (dari slide 21, walaupun itu DPDA).
>     
> - Misalnya transisi $\delta(q_0, 0, Z_0) = \{(q_0, 0Z_0)\}$. Ini adalah kasus $k=2$.
>     
> - Jika PDA memiliki state $\{q_0, q_1, q_2\}$, maka aturan $[q_0 Z_0 q_0] \rightarrow 0 [q_0 0 q_0] [q_0 Z_0 q_0]$ adalah salah satu dari $3^1=3$ aturan yang harus dibuat (pilihan lain: $r_1=q_1$ atau $r_1=q_2$).
>