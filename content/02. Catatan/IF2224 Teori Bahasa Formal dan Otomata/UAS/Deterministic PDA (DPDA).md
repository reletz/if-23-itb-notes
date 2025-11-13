---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Ekuivalensi PDA & CFG (Bagian 3: Deterministic Pushdown Automata - DPDA)
> 
> > ## Questions/Cues
> >
> > - Apa itu _Deterministic_ PDA (DPDA)?
> >     
> > - Apa 2 kondisi determinisme?
> >     
> > - Contoh: $L_{wcwr}$  
> >     
> > - Bagaimana hirarki bahasa (Regular, L(DPDA), CFL)?
> >     
> > - Kenapa $L_{wwr}$ bukan L(DPDA)?
> >     
> > - Apa itu _Prefix Property_?
> >     
> > - Hubungan DPDA (Empty Stack) & _Prefix Property_
> >     
> > - Teorema 6.19
> >     
> > - Hubungan DPDA & Ambiguitas
> >     
> > - Teorema 6.20 & 6.21
> >     
> >
> > ## Reference Points
> >
> > - Slide 12_2023_Equivalence PDA and CFG.pdf (hlm. 21-25)
> >     
> 
> > ### Apa itu Deterministic PDA (DPDA)?
> >
> > Sebuah _Deterministic Pushdown Automata_ (DPDA) adalah PDA yang **tidak pernah** memiliki pilihan (non-determinisme) dalam langkah komputasinya.
> >
> > Untuk setiap konfigurasi (state, input, top stack), hanya ada **paling banyak satu** langkah selanjutnya yang mungkin.
> >
> > ### Dua Kondisi Determinisme
> >
> > Sebuah PDA $P$ bersifat deterministik jika kedua kondisi berikut terpenuhi:
> >
> > 1. Tidak Ada Pilihan Ganda untuk Input:
> >     
> > 	- $\delta(q, a, X)$ selalu berisi paling banyak satu anggota. (PDA tidak bisa memilih antara $(p_1, \alpha_1)$ dan $(p_2, \alpha_2)$).
> >     
> >
> > 1. Tidak Ada Pilihan $\epsilon$ vs Input:
> >     
> > 	- Jika $\delta(q, \epsilon, X)$ tidak kosong (ada transisi $\epsilon$), maka $\delta(q, a, X)$ harus kosong untuk setiap $a \in \Sigma$. (PDA tidak bisa memilih antara "melakukan transisi $\epsilon$" atau "membaca input $a$").
> >     
> >
> > ### Contoh: $L_{wcwr}$  
> >
> > Bahasa $L_{wcwr} = \{wcw^R : w \in \{0,1\}^*\}$ (contoh: "01c10") **dapat** dikenali oleh DPDA.
> >
> > - **Cara Kerja:**
> >     
> > 	1. Di $q_0$, PUSH semua simbol input ke stack.
> > 			
> > 	2. Jika membaca 'c', pindah ke state $q_1$ (tanpa mengubah stack).
> > 			
> > 	3. Di $q_1$, POP stack untuk setiap input yang cocok.
> > 			
> > 	4. Jika stack kosong ($Z_0$) di akhir, pindah ke $q_2$ (final state).
> > 			
> > - **Kenapa Deterministik?** Simbol 'c' bertindak sebagai penanda yang jelas. PDA tidak perlu "menebak" kapan harus beralih dari mode PUSH ke POP.
> >     
> >
> > ### Hirarki Bahasa (Regular $\subset$ L(DPDA) $\subset$ CFL)
> >
> > DPDA mendefinisikan kelas bahasa baru, $L(DPDA)$.
> >
> > 1. **Regular** $\subset$ **L(DPDA):** Setiap bahasa Regular dapat dikenali oleh DPDA (yang pada dasarnya mengabaikan stack-nya, seperti DFA).
> >     
> > 2. **L(DPDA)** $\subset$ **CFL:**
> >     
> > 	- Ada bahasa $L(DPDA)$ yang tidak Regular (contoh: $L_{wcwr}$).
> > 			
> > 	- Ada bahasa CFL yang _tidak_ L(DPDA) (contoh: $L_{wwr}$).
> > 			
> >
> > ### Kenapa $L_{wwr}$ bukan L(DPDA)?
> >
> > Bahasa $L_{wwr} = \{ww^R\}$ (palindrom genap, misal "0110") **tidak bisa** dikenali oleh DPDA.
> >
> > - **Alasan:** PDA untuk $L_{wwr}$ _harus_ "menebak" di mana titik tengah string (batas antara $w$ dan $w^R$).
> >     
> > - Sebuah DPDA tidak bisa menebak. Jika ia melihat input "0110", ia tidak tahu apakah harus PUSH '1' (karena masih di $w$) atau POP '1' (karena sudah di $w^R$).
> >     
> >
> > ### _Prefix Property_
> >
> > Sebuah bahasa $L$ memiliki _prefix property_ jika **tidak ada** string di $L$ yang merupakan _prefix_ (awalan) dari string lain di $L$.
> >
> > - **Contoh Punya:** $L_{wcwr}$. String "0c0" ada di $L$, tapi "0c01c1" tidak. Tidak ada string yang jadi awalan string lain.
> >     
> > - **Contoh Tidak Punya:** $\{0\}^* = \{\epsilon, 0, 00, 000, \dots\}$. String "0" ada di $L$ dan juga merupakan _prefix_ dari "00" yang juga ada di $L$.
> >     
> >
> > ### Teorema 6.19: DPDA (Empty Stack) & _Prefix Property_
> >
> > Metode penerimaan sangat penting untuk DPDA.
> >
> > - DPDA yang menerima via _empty stack_ ($N(P)$) memiliki masalah: jika $w$ diterima (stack kosong), DPDA tidak bisa melanjutkan komputasi untuk $wx$ (karena stack sudah kosong).
> >     
> > - **Teorema:** Sebuah bahasa $L$ adalah $N(P)$ untuk suatu DPDA $P$ **jika dan hanya jika** $L$ memiliki _prefix property_ DAN $L$ adalah $L(P')$ untuk suatu DPDA $P'$ (by final state).
> >     
> >
> > ### DPDA & Ambiguitas
> >
> > DPDA memiliki hubungan erat dengan grammar yang _tidak ambigu_.
> >
> > - **Ambiguitas:** Grammar G bersifat ambigu jika ada setidaknya satu string $w \in L(G)$ yang memiliki _dua_ atau lebih _leftmost derivation_ (atau _parse tree_) yang berbeda.
> >     
> >
> > - **Teorema 6.20 & 6.21:** Jika sebuah bahasa $L$ diterima oleh DPDA (baik $L(P)$ maupun $N(P)$), maka $L$ **dijamin memiliki CFG yang** _**unambiguous**_.
> >     
> >
> > - **Poin Penting:**
> >     
> > 	1.  $L(DPDA) \subset$ Himpunan Bahasa Non-Ambigu.
> > 	2.  Kebalikannya tidak berlaku. $L_{wwr}$ memiliki grammar non-ambigu ($S \rightarrow 0S0 \mid 1S1 \mid \epsilon$), tapi $L_{wwr}$ *bukan* L(DPDA).
> > 	

> [!cornell] #### Summary
> 
> **Sebuah** _**Deterministic PDA**_ **(DPDA) adalah PDA yang tidak memiliki pilihan (non-determinisme) pada setiap langkahnya, yang diatur oleh dua kondisi ketat. Kelas bahasa yang dikenali DPDA,** $L(DPDA)$**, lebih kuat dari Regular (bisa mengenali** $L_{wcwr}$**) tetapi lebih lemah dari CFL (tidak bisa mengenali** $L_{wwr}$ **karena DPDA tidak bisa "menebak"). DPDA yang menerima via** _**empty stack**_ **hanya bisa mengenali bahasa dengan** _**prefix property**_**. Yang terpenting, setiap bahasa yang diterima oleh DPDA dijamin dapat dibangkitkan oleh** _**CFG yang tidak ambigu**_**.**

> [!ad-libitum]- Additional Information
> 
> #### $L(DPDA)$ vs $N(DPDA)$  
> 
> Tidak seperti PDA non-deterministik, pada DPDA, pilihan metode penerimaan (_final state_ vs _empty stack_) sangat berpengaruh.
> 
> - $L(DPDA)$ (by final state) adalah kelas bahasa yang diterima oleh DPDA.
>     
> - $N(DPDA)$ (by empty stack) adalah _subset_ dari $L(DPDA)$ yang hanya berisi bahasa-bahasa dengan _prefix property_.
>     
> - $L(DPDA)$ lebih kuat dari $N(DPDA)$. Contoh: Bahasa $\{0\}^*$ dapat diterima oleh DPDA _final state_, tetapi tidak oleh DPDA _empty stack_ (karena tidak punya _prefix property_).
>     
> 
> #### Parsing dan DPDA
> 
> Konsep DPDA adalah fondasi teoretis untuk _parser_ yang digunakan dalam kompilator (misalnya, _parser_ LALR(1) yang digunakan oleh YACC/Bison). Bahasa pemrograman dirancang agar _deterministic context-free_ sehingga dapat di-_parse_ secara efisien (tanpa _backtracking_) oleh mesin yang mirip DPDA. Inilah mengapa $L(DPDA)$ adalah kelas bahasa yang sangat penting dalam ilmu komputer praktis.
> 
> #### Eksplorasi Mandiri
> 
> - Coba buktikan secara informal mengapa $L = \{a^n b^n \mid n \ge 0\} \cup \{a^n b^{2n} \mid n \ge 0\}$ tidak dapat diterima oleh DPDA. (Petunjuk: Saat membaca $a$, DPDA tidak tahu apakah harus mencocokkannya dengan $b^n$ atau $b^{2n}$).
>