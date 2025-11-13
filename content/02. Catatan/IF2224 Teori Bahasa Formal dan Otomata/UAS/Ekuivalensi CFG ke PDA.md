---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Ekuivalensi PDA & CFG (Bagian 1: Konversi CFG ke PDA)
> 
> > ## Questions/Cues
> >
> > - Apa hubungan CFG & PDA?
> >     
> > - Apa tujuan konversi CFG $\rightarrow$ PDA?
> >     
> > - Apa ide utama di balik konversi ini?
> >     
> > - Bagaimana PDA mensimulasikan derivasi?
> >     
> > - Bagaimana jika top stack Variabel?
> >     
> > - Bagaimana jika top stack Terminal?
> >     
> > - Apa konstruksi formal $P_G$?
> >     
> > - Transisi Tipe 1 ($\delta(q,\epsilon,A)$)
> >     
> > - Transisi Tipe 2 ($\delta(q,a,a)$)
> >     
> > - Teorema 6.13
> >     
> >
> > ## Reference Points
> >
> > - Slide 12_2023_Equivalence PDA and CFG.pdf (hlm. 2-9)
> >     
> 
> > ### Hubungan Fundamental CFG & PDA
> >
> > Teorema inti dari bab ini adalah:
> >
> > Sebuah bahasa $L$ adalah _Context-Free Language_ (CFL) **jika dan hanya jika** bahasa $L$ tersebut diterima oleh sebuah _Pushdown Automata_ (PDA).
> >
> > Ini berarti:
> >
> > 1. Setiap bahasa yang bisa dibangkitkan oleh CFG, pasti bisa dikenali oleh PDA.
> >     
> > 2. Setiap bahasa yang bisa dikenali oleh PDA, pasti bisa dibangkitkan oleh CFG.
> >     
> >
> > Karena kita sudah tahu dari materi sebelumnya bahwa PDA (by final state) $\Leftrightarrow$ PDA (by empty stack), maka kita hanya perlu membuktikan:
> > 
> > CFG $\Leftrightarrow$ PDA (by empty stack).
> >
> > Catatan ini berfokus pada arah pertama: **CFG** $\rightarrow$ **PDA**.
> >
> > ### Tujuan: Konversi CFG $\rightarrow$ PDA
> >
> > Diberikan sebuah CFG $G=(V,T,Q,S)$, kita ingin membuat sebuah PDA $P_G$ yang menerima bahasa yang sama, $L(G)$. Kita akan menggunakan metode _acceptance by empty stack_.
> >
> > **Tujuannya:** Membuktikan bahwa $L(G) = N(P_G)$.
> >
> > ### Ide Utama: Simulasi Leftmost Derivation
> >
> > Ide utamanya adalah membuat PDA yang **mensimulasikan** _**leftmost derivation**_ ($\Rightarrow_{lm}$) dari grammar $G$.
> >
> > - **Stack PDA** akan digunakan untuk menyimpan _sentential form_ (bentuk kalimat) dari proses derivasi. _Sentential form_ adalah string yang berisi campuran Variabel dan Terminal.
> >     
> > - _Top_ (puncak) stack akan selalu mewakili simbol paling kiri dari _sentential form_ yang tersisa.
> >     
> >
> > ### Bagaimana PDA Mensimulasikan Derivasi?
> >
> > PDA $P_G$ akan bekerja sebagai berikut:
> >
> > 1. **Jika top stack adalah Variabel (misal** $A$**):**
> >     
> > 	- PDA secara *non-deterministik* akan memilih salah satu aturan produksi untuk $A$ dari grammar $G$ (misal $A \rightarrow \beta$).
> > 	- PDA akan **POP $A$** dari stack.
> > 	- PDA akan **PUSH $\beta$** (string isi aturan) ke stack.
> > 	- Ini semua terjadi dalam satu transisi **spontan** (membaca input $\epsilon$).
> > 
> >
> > 2. **Jika top stack adalah Terminal (misal** $a$**):**
> >     
> > 	- PDA harus mencocokkan simbol ini dengan string input.
> > 	- PDA akan **membaca simbol input** berikutnya.
> > 	- Jika simbol input = $a$ (cocok): PDA akan **POP $a$** dari stack dan melanjutkan.
> > 	- Jika simbol input $\neq a$ (tidak cocok): Komputasi di jalur non-deterministik ini "mati" (gagal).
> > 
> >
> > **Kondisi Penerimaan (Acceptance):**
> > 
> > Jika di akhir proses, semua input telah habis dibaca DAN stack menjadi kosong, berarti string input tersebut berhasil diderivasi dari simbol $S$, sehingga string tersebut diterima.
> >
> > ### Konstruksi Formal $P_G$  
> >
> > Diberikan $G=(V,T,Q,S)$, kita definisikan PDA $P_G$ sebagai:
> > 
> > $$P_G = (\{q\}, T, V \cup T, \delta, q, S)$$
> >
> > - **State** $Q$: Hanya punya **satu state**, yaitu $\{q\}$.
> >     
> > - **Alfabet Input** $\Sigma$: Adalah himpunan terminal $G$, yaitu $T$.
> >     
> > - **Alfabet Stack** $\Gamma$: Adalah gabungan Variabel dan Terminal $G$, yaitu $V \cup T$.
> >     
> > - **Fungsi Transisi** $\delta$: Didefinisikan dalam 2 tipe (lihat di bawah).
> >     
> > - **Start State** $q_0$: Adalah $q$.
> >     
> > - **Start Symbol** $Z_0$: Adalah _start symbol_ grammar, yaitu $S$.
> >     
> >
> > ### Transisi Tipe 1: Ekspansi Variabel
> >
> > Untuk setiap _Variabel_ $A \in V$, kita tambahkan transisi untuk setiap aturan produksinya.
> >
> > Jika $A \rightarrow \beta$ adalah aturan produksi di $G$, maka:
> > 
> > $$\delta(q, \epsilon, A) = \{(q, \beta)\}$$
> >
> > - _Artinya:_ Di state $q$, tanpa membaca input ($\epsilon$), jika top stack adalah $A$, ganti $A$ dengan $\beta$ (POP $A$, PUSH $\beta$). Ini adalah langkah "derivasi".
> >     
> >
> > ### Transisi Tipe 2: Pencocokan Terminal
> >
> > Untuk setiap _Terminal_ $a \in T$, kita tambahkan transisi pencocokan.
> >
> > $$\delta(q, a, a) = \{(q, \epsilon)\}$$
> >
> > - _Artinya:_ Di state $q$, jika input adalah $a$ dan top stack adalah $a$, maka POP $a$ dari stack (ganti $a$ dengan $\epsilon$) dan lanjut. Ini adalah langkah "pencocokan".
> >     
> >
> > ### Teorema 6.13
> >
> > Jika $P_G$ dibuat dari CFG $G$ dengan metode di atas, maka $N(P_G) = L(G)$.
> > 
> > Ini membuktikan bahwa untuk setiap CFG, ada PDA (by empty stack) yang ekuivalen.

> [!cornell] #### Summary
> 
> **Setiap** _**Context-Free Grammar**_ **(CFG) dapat diubah menjadi** _**Pushdown Automata**_ **(PDA) yang ekuivalen yang menerima bahasa yang sama melalui** _**empty stack**_**. PDA (**$P_G$**) ini bekerja dengan hanya satu state** $\{q\}$ **dan secara langsung mensimulasikan** _**leftmost derivation**_ **dari grammar. PDA menggunakan transisi** $\epsilon$ **untuk mengganti Variabel di top stack dengan isi aturannya (seperti langkah derivasi), dan menggunakan transisi input untuk mencocokkan dan menghapus Terminal di top stack dengan simbol input (langkah pencocokan). String diterima jika seluruh input habis dibaca dan stack menjadi kosong, yang membuktikan bahwa string tersebut dapat diderivasi dari** _**start symbol**_ $S$**.**

> [!ad-libitum]- Additional Information
> 
> #### Penting: Urutan PUSH Balik (Reverse Order)
> 
> Saat kita bilang "PUSH $\beta$", ada detail teknis yang sangat penting. Jika aturan produksinya adalah $A \rightarrow Y_1 Y_2 \dots Y_k$, stack bekerja dengan basis LIFO (Last-In, First-Out).
> 
> Agar $Y_1$ (simbol paling kiri) berada di _puncak_ stack dan diproses terlebih dahulu (sesuai _leftmost derivation_), kita harus me-PUSH simbol-simbol tersebut dalam **urutan terbalik**: PUSH $Y_k$, lalu PUSH $Y_{k-1}$, ..., lalu PUSH $Y_1$.
> 
> Dalam notasi formal $\delta(q, \epsilon, A) = \{(q, Y_1 Y_2 \dots Y_k)\}$, string $Y_1 \dots Y_k$ secara konvensi berarti $Y_1$ akan berada di puncak.
> 
> #### Contoh: Lacak String "01" pada $G: S \rightarrow 0S1 \mid \epsilon$  
> 
> 1. **Grammar** $G$**:**
>     
>     - $S \rightarrow 0S1$  
>         
>     - $S \rightarrow \epsilon$  
>         
> 2. **Konstruksi** $P_G$**:**
>     
>     - State: $\{q\}$, Start Symbol: $S$  
>         
>     - $\delta(q, \epsilon, S) = \{(q, 0S1), (q, \epsilon)\}$ (dari 2 aturan $S$)
>         
>     - $\delta(q, 0, 0) = \{(q, \epsilon)\}$ (match '0')
>         
>     - $\delta(q, 1, 1) = \{(q, \epsilon)\}$ (match '1')
>         
> 3. **Lacak Komputasi (ID) untuk input "01":**
>     
>     - `(q, 01, S)`
>         
>     - $\vdash (q, 01, 0S1)$ _(Pilih aturan_ $S \rightarrow 0S1$_. POP_ $S$_, PUSH_ $0S1$_. Top stack kini '0')_
>         
>     - $\vdash (q, 1, S1)$ _(Baca input '0', match top stack '0'. POP '0'. Top stack kini 'S')_
>         
>     - $\vdash (q, 1, 1)$ _(Pilih aturan_ $S \rightarrow \epsilon$_. POP_ $S$_, PUSH_ $\epsilon$_. Top stack kini '1')_
>         
>     - $\vdash (q, \epsilon, \epsilon)$ _(Baca input '1', match top stack '1'. POP '1'. Top stack kini kosong)_
>         
> 4. **Hasil:** Input habis ($\epsilon$), Stack kosong ($\epsilon$). String "01" **diterima**.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba lacak input "0011" menggunakan $P_G$ di atas.
>     
> - Coba lacak input "011" (seharusnya ditolak). Di mana komputasinya "mati"?
>