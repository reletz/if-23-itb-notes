---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Ekuivalensi PDA & CFG (Bagian 3: Deterministic PDA & Hierarki)
> 
> > ## Questions/Cues
> >
> > - Definisi Formal DPDA
> >     
> > - Kondisi Eksklusivitas
> >     
> > - Contoh: Marker 'c'
> >     
> > - Masalah Guesser
> >     
> > - Hierarki Bahasa
> >     
> > - Prefix Property
> >     
> > - Ambiguitas Inheren
> >     
> >
> > ## Reference Points
> >
> > - Slide 12_2025: Hal 20 - 30
> >     
> 
> > ### 1. Definisi Mendalam Deterministic PDA (DPDA)
> >
> > PDA disebut **deterministik** jika dalam setiap langkah komputasinya, mesin tidak pernah memiliki lebih dari satu pilihan aksi. Secara formal, sebuah PDA $P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ adalah DPDA jika memenuhi dua syarat ketat:
> >
> > 1. **Maksimal Satu Transisi:** Untuk setiap state $q$, simbol input $a$ (atau $\epsilon$), dan simbol stack $X$, fungsi transisi memberikan paling banyak satu hasil: $|\delta(q, a, X)| \le 1$.
> >     
> > 2. **Eksklusivitas** $\epsilon$**-move:** Jika mesin dikonfigurasi untuk bisa melakukan transisi dengan membaca input terminal $a$ ($\delta(q, a, X) \neq \emptyset$), maka pada saat yang sama mesin **dilarang** memiliki transisi $\epsilon$ ($\delta(q, \epsilon, X) = \emptyset$).
> >     
> >
> > _Penting:_ Syarat kedua memastikan tidak ada ambiguitas antara "apakah saya harus membaca input sekarang?" atau "apakah saya harus melakukan operasi stack tanpa membaca input?".
> >
> > ### 2. Analisis Contoh: Marker dan Non-Marker
> >
> > **A. Bahasa dengan Marker (**$L_{wcw^R}$**): DETERMINISTIK**
> >
> > - **Bahasa:** $\{wcw^R : w \in \{0,1\}^*\}$. Contoh: `011c110`.
> >     
> > - **Strategi:**
> >     
> >     1. Selama belum bertemu 'c', setiap input (0 atau 1) langsung di-_push_ ke stack.
> >         
> >     2. Begitu input 'c' terbaca, mesin pindah _state_ (mode ganti).
> >         
> >     3. Setelah itu, setiap input baru harus cocok dengan simbol yang di-_pop_ dari stack.
> >         
> > - **Mengapa DPDA?** Simbol 'c' bertindak sebagai pemicu (trigger) yang jelas bagi mesin untuk berhenti menumpuk dan mulai mencocokkan. Tidak ada keraguan.
> >     
> >
> > **B. Bahasa Tanpa Marker (**$L_{ww^R}$**): NON-DETERMINISTIK**
> >
> > - **Bahasa:** $\{ww^R : w \in \{0,1\}^*\}$. Contoh: `011110`.
> >     
> > - **Masalah:** Mesin tidak tahu di mana titik tengahnya. Apakah `11` di tengah itu adalah akhir dari $w$ atau masih bagian dari $w$?
> >     
> > - **Mengapa bukan DPDA?** Mesin harus melakukan "tebakan" (guessing) secara non-deterministik untuk setiap posisi input: "Apakah saya ganti mode sekarang?".
> >     
> >
> > ### 3. Hierarki Bahasa: Di Mana Posisi DPDA?
> >
> > Kita memiliki struktur hierarki yang bersifat Proper Subset (himpunan bagian murni):
> > 
> > Reguler $\subset$ L(DPDA) $\subset$ CFL
> >
> > - **Reguler** $\subset$ **L(DPDA):** Setiap DFA bisa diubah menjadi DPDA yang tidak menggunakan stack-nya. Stack hanya berisi simbol $Z_0$ yang tidak pernah berubah.
> >     
> > - **L(DPDA)** $\subset$ **CFL:** Ada bahasa bebas konteks (seperti $L_{ww^R}$) yang mustahil dikerjakan oleh mesin deterministik.
> >     
> >
> > ### 4. DPDA dengan Empty Stack Acceptance
> >
> > Jika kita ingin DPDA menerima bahasa dengan cara mengosongkan stack (_Empty Stack_), bahasa tersebut wajib memiliki **Prefix Property**.
> >
> > **Definisi Prefix Property:** Sebuah bahasa $L$ memilikinya jika tidak ada string $x \in L$ yang merupakan awalan dari string lain $y \in L$ (di mana $x \neq y$).
> >
> > - **Contoh Gagal:** $\{0\}^* = \{\epsilon, 0, 00, \dots\}$ tidak punya prefix property karena '0' adalah prefix dari '00'. Jika mesin mengosongkan stack di string '0', ia tidak bisa lanjut membaca untuk menerima '00'.
> >     
> > - **Solusi:** Itulah sebabnya untuk bahasa yang tidak punya prefix property, kita lebih sering menggunakan _Final State Acceptance_ untuk DPDA.
> >     
> >
> > ### 5. Ambiguitas dan DPDA
> >
> > - **Teorema 6.20 & 6.21:** Bahasa yang diterima DPDA (baik empty stack maupun final state) dijamin memiliki **Unambiguous CFG**.
> >     
> > - **Inherently Ambiguous:** Ada bahasa CFL yang "sangat kacau" sehingga semua grammar-nya pasti ambigu, contoh: $L = \{a^i b^j c^k : i=j \text{ atau } j=k\}$. Bahasa ini sudah pasti **tidak bisa** dibuatkan DPDA-nya.
> >     

> [!cornell] #### Summary
> 
> **Deterministic PDA (DPDA)** mengisi celah antara Bahasa Reguler dan CFL umum. Syarat utamanya adalah **tiadanya pilihan transisi** dan **eksklusivitas antara** $\epsilon$**-move dan input move**. DPDA sangat bergantung pada **marker (seperti 'c')** untuk menentukan pergantian logika komputasi. Bahasa DPDA adalah subset dari CFL yang dijamin **tidak ambigu**. Jika menggunakan metode _empty stack_, bahasa tersebut harus memenuhi **Prefix Property**, yang melarang satu string menjadi awalan string lainnya dalam bahasa yang sama.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Implementasi Marker End ($)
> 
> Untuk mengubah DPDA yang menerima dengan _final state_ menjadi _empty stack_ (meskipun bahasanya tidak punya prefix property), kita bisa menggunakan teknik **End Marker**.
> 
> - Tambahkan simbol khusus `$` di akhir string.
>     
> - Bahasa $L' = L\$$ sekarang pasti memiliki prefix property karena `$` hanya muncul di akhir.
>     
> - Ini memungkinkan kita membuat Unambiguous CFG untuk bahasa yang tadinya sulit ditangani.
>     
> 
> #### DPDA dalam Compiler Design
> 
> Sebagian besar bahasa pemrograman (seperti C++, Java, Python) dirancang agar bisa di-_parse_ oleh varian DPDA yang disebut **LR(k) Parser**. Determinisme sangat penting di sini agar compiler bisa memberikan pesan error yang akurat dan bekerja dengan kecepatan linier $O(n)$, bukan eksponensial.
> 
> #### Teorema Pelengkap: Konvers yang Salah
> 
> Perlu diingat: Unambiguous CFL $\neq$ L(DPDA).
> 
> Ada bahasa yang tata bahasanya tidak ambigu ($L_{ww^R}$ punya grammar $S \rightarrow 0S0 | 1S1 | \epsilon$), tapi ia tetap bukan bahasa DPDA. Jadi, "Tidak Ambigu" belum tentu "Deterministik".
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Hopcroft, Motwani, & Ullman (Bab 6.4: Deterministic Pushdown Automata).
>     
> - Slides IF 2124 (ITB) - Hal 20-30.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa transisi $\delta(q, a, X)$ dan $\delta(q, \epsilon, X)$ tidak boleh ada bersamaan dalam DPDA?</strong></summary>
> 
> Karena jika keduanya ada, mesin akan memiliki dua pilihan aksi saat bertemu input 'a': membaca input tersebut atau mengabaikannya dan melakukan $\epsilon$-move. Ini melanggar prinsip determinisme.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Berikan contoh bahasa CFL yang terbukti tidak bisa diterima oleh DPDA!</strong></summary>
> 
> Bahasa palindrom tanpa marker tengah, $L_{ww^R}$, atau bahasa yang memiliki ambiguitas inheren seperti $\{a^i b^j c^k : i=j \text{ atau } j=k\}$.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa yang terjadi jika kita mencoba membuat DPDA untuk bahasa $\{0\}^*$ dengan metode empty stack?</strong></summary>
> 
> Mesin akan gagal karena bahasa tersebut tidak memenuhi Prefix Property. Begitu stack kosong setelah membaca '0', mesin tidak bisa lagi melanjutkan untuk menerima '00', '000', dst.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Apa hubungan antara bahasa reguler dan DPDA?</strong></summary>
> 
> Bahasa reguler adalah subset dari bahasa DPDA. Artinya, setiap bahasa reguler bisa diterima oleh DPDA (dengan mengabaikan stack), tetapi ada bahasa DPDA (seperti $0^n 1^n$) yang bukan bahasa reguler.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Mengapa bahasa $L = \{wcw^R\}$ disebut deterministik?</strong></summary>
> 
> Karena keberadaan simbol 'c' memberikan informasi pasti kapan mesin harus berhenti melakukan operasi 'push' (menyimpan $w$) dan mulai melakukan operasi 'pop' (mencocokkan dengan $w^R$).
> 
> </details>