---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Ekuivalensi PDA & CFG (Bagian 1: Konversi CFG ke PDA)
> 
> > ## Questions/Cues
> >
> > - Teorema Utama
> >     
> > - Left-Sentential Form
> >     
> > - Simulasi Derivasi
> >     
> > - Aturan Variabel
> >     
> > - Aturan Terminal
> >     
> > - Syarat Accept
> >     
> >
> > ## Reference Points
> >
> > - Slide 12_2025: Hal 1 - 11
> >     
> 
> > ### 1. Teorema Ekuivalensi Utama
> >
> > Ketiga model komputasi berikut didefinisikan setara (ekuivalen), artinya mereka mengenali kelas bahasa yang sama, yaitu **Context-Free Language (CFL)**:
> >
> > 1. Bahasa yang dihasilkan oleh **Context-Free Grammar (CFG)**.
> >     
> > 2. Bahasa yang diterima oleh **PDA dengan Empty Stack**.
> >     
> > 3. Bahasa yang diterima oleh **PDA dengan Final State**.
> >     
> >
> > _Analogi:_ Bayangkan CFG sebagai "resep masakan" (aturan produksi) dan PDA sebagai "juru masak" (mesin yang menjalankan). Teorema ini menyatakan bahwa resep apa pun yang ditulis dengan aturan CFG pasti bisa dimasak oleh mesin PDA, baik dengan cara mengosongkan panci (empty stack) atau mencapai kondisi selesai (final state).
> >
> > ### 2. Ide Dasar: Simulasi Leftmost Derivation
> >
> > PDA dirancang untuk mensimulasikan proses **Leftmost Derivation** dari sebuah CFG. PDA akan menyimpan bagian dari derivasi yang belum terselesaikan di dalam **Stack**.
> >
> > Konsep Kunci: **Left-Sentential Form**
> > 
> > Bentuknya adalah $x A \alpha$, di mana:
> >
> > - $x$: String terminal yang sudah cocok dengan input.
> >     
> > - $A$: Variabel paling kiri yang akan diturunkan berikutnya.
> >     
> > - $\alpha$: Sisa simbol (tail) yang menunggu giliran.
> >     
> >
> > ### 3. Mekanisme Kerja PDA (Langkah-demi-Langkah)
> >
> > PDA hanya menggunakan **satu state** (biasanya disebut $q$) dan melakukan operasi berdasarkan apa yang ada di puncak stack:
> >
> > **A. Jika Top Stack adalah Variabel (A)**:
> > 
> > PDA melakukan "ekspansi". Ia tidak membaca input ($\epsilon$-move).
> >
> > - _Aksi:_ Ambil (pop) $A$, lalu masukkan (push) seluruh tubuh produksi $\beta$ (jika ada aturan $A \rightarrow \beta$).
> >     
> > - _Fungsi Transisi:_ $\delta(q, \epsilon, A) = \{(q, \beta) : A \rightarrow \beta \in Q\}$  
> >     
> >
> > **B. Jika Top Stack adalah Terminal (a):**
> > 
> > PDA melakukan "pencocokan" (match).
> >
> > - _Aksi:_ Baca input $a$. Jika simbol input sama dengan top stack, maka pop $a$.
> >     
> > - _Fungsi Transisi:_ $\delta(q, a, a) = \{(q, \epsilon)\}$  
> >     
> > - _Catatan:_ Jika tidak cocok, PDA akan me-reject string tersebut.
> >     
> >
> > ### 4. Contoh Konstruksi
> >
> > Misalkan ada grammar $E \rightarrow E+T | T$. Maka PDA akan memiliki transisi:
> >
> > - Untuk variabel $E$: $\delta(q, \epsilon, E) = \{(q, E+T), (q, T)\}$. Ini bersifat non-deterministik karena PDA harus "menebak" jalur mana yang benar.
> >     
> > - Untuk terminal '+': $\delta(q, +, +) = \{(q, \epsilon)\}$.
> >     

> [!cornell] #### Summary
> 
> Teorema ekuivalensi menyatakan bahwa **CFG dan PDA (baik empty stack maupun final state) adalah setara**. Untuk mengubah CFG menjadi PDA, kita membuat mesin satu state yang **mensimulasikan leftmost derivation** dengan cara memasukkan tubuh produksi ke stack saat bertemu variabel, dan mencocokkan input saat bertemu terminal. String diterima jika **stack kosong tepat saat input habis**.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Pembuktian Correctness (Teorema 6.13)
> 
> Pembuktian bahwa $N(P_G) = L(G)$ dilakukan melalui dua arah menggunakan induksi matematika:
> 
> 1. **Arah** $L(G) \subseteq N(P_G)$: Dibuktikan bahwa jika string $w$ dapat diturunkan dalam $n$ langkah derivasi, maka PDA dapat mengosongkan stack setelah membaca $w$. Basisnya adalah derivasi 1 langkah ($S \Rightarrow w$).
>     
> 2. **Arah** $N(P_G) \subseteq L(G)$: Menggunakan **Lemma Utama**: Jika PDA dapat berpindah dari kondisi stack berisi variabel $A$ menjadi stack kosong setelah membaca string $x$, maka $A$ pasti bisa menurunkan $x$ di grammar ($A \Rightarrow^* x$).
>     
> 
> #### Penanganan Non-Determinisme
> 
> Penting untuk diingat bahwa PDA hasil konversi CFG hampir selalu bersifat **Non-Deterministik**. Dalam simulasi (seperti pada slide hal. 8), PDA akan mencoba semua kemungkinan produksi secara paralel. Cukup **satu jalur** yang berhasil mencapai stack kosong untuk menyatakan string tersebut "Accepted".
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Hopcroft, Motwani, & Ullman. _Introduction to Automata Theory, Languages, and Computation_.
>     
> - Slides IF 2124 (ITB) - November 2025.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa tiga model yang dinyatakan ekuivalen dalam Teorema Utama?</strong></summary>
> 
> CFG, PDA dengan penerimaan empty stack, dan PDA dengan penerimaan final state.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa yang disimpan PDA di dalam stack saat mensimulasikan CFG?</strong></summary>
> 
> Bagian dari "Left-sentential form" yang belum diproses, yaitu variabel yang akan diturunkan dan sisa terminal (tail).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Mengapa transisi variabel pada PDA hasil konversi CFG menggunakan $\epsilon$-move?</strong></summary>
> 
> Karena proses penurunan variabel (expansions) adalah proses internal grammar yang tidak mengonsumsi input terminal dari luar.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Apa yang terjadi jika top stack adalah terminal 'b' tetapi input yang dibaca adalah 'a'?</strong></summary>
> 
> PDA akan gagal (reject) pada jalur komputasi tersebut karena terjadi ketidakcocokan (mismatch).
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Sebutkan syarat sebuah string diterima (accept) oleh PDA hasil konversi CFG ini!</strong></summary>
> 
> Stack harus benar-benar kosong (empty stack) tepat pada saat seluruh string input telah selesai dibaca.
> 
> </details>