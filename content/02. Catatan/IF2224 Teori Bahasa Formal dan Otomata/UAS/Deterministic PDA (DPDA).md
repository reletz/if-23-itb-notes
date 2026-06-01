---
type: Note
tags:
  - Komputasi
  - PDA
  - DPDA
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Deterministic PDA & Hierarki Bahasa
> 
> > ## Questions/Cues
> >
> > - **Definisi Formal DPDA**
> >     
> > - **2 Syarat Determinisme**
> >     
> > - **Eksklusivitas Transisi**
> >     
> > - **Peran Marker 'c'**
> >     
> > - **Contoh** $L_{wcw^R}$  
> >     
> > - **Masalah Guesser**
> >     
> > - **Hierarki Bahasa**
> >     
> > - **Prefix Property**
> >     
> > - **Ambiguitas Inheren**
> >     
> >
> > ## Reference Points
> >
> > - Bab 6 PDA.pdf (Halaman 73-74)
> >     
> > - Slide 12_2025: Hal 20 - 30
> >     
> > - Teorema 6.20 & 6.21
> >     
> 
> > ### 1. Definisi Mendalam Deterministic PDA (DPDA)
> >
> > PDA disebut **deterministik** jika dalam setiap langkah komputasinya, mesin tidak pernah memiliki lebih dari satu pilihan aksi.
> >
> > **Definisi Formal:**
> > 
> > Sebuah PDA $P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ adalah DPDA jika memenuhi dua syarat ketat:
> >
> > 1. *Maksimal Satu Transisi:*
> >     
> > 	Untuk setiap kombinasi state $q$, simbol input $a$ (bisa $\epsilon$), dan simbol stack $X$, fungsi transisi memberikan paling banyak satu hasil.
> > 	
> > 	$$|\delta(q, a, X)| \le 1$$
> >
> > 2. *Eksklusivitas $\epsilon$-move:*
> >     
> >     Jika mesin memiliki transisi untuk input real $a$ ($\delta(q, a, X) \neq \emptyset$), maka pada saat yang sama mesin dilarang memiliki transisi $\epsilon$ ($\delta(q, \epsilon, X) = \emptyset$).
> >     
> >
> > _Intinya:_ Mesin tidak boleh bingung antara "baca input" atau "lakukan gerakan $\epsilon$". Harus jelas pilihannya.
> >
> > ### 2. Analisis Contoh: Marker vs Non-Marker
> >
> > #### A. Bahasa dengan Marker ($L_{wcw^R}$): DETERMINISTIK
> >
> > **Bahasa:** $\{wcw^R : w \in \{0,1\}^*\}$. Contoh: `011c110`.
> >
> > Mengapa DPDA? -> Keberadaan simbol 'c' menghilangkan keraguan.
> >
> > - **Fase 1 (Baca** $w$**):** Selama input bukan 'c', PUSH ke stack.
> >     
> > 	- $\delta(q_0, 0, Z_0) = \{(q_0, 0Z_0)\}$  
> > 			
> > 	- $\delta(q_0, 1, 0) = \{(q_0, 10)\}$, dst.
> >         
> > - **Fase Transisi (Trigger):** Begitu baca 'c', pindah state tanpa ubah stack.
> >     
> > 	- $\delta(q_0, c, \text{any}) = \{(q_1, \text{any})\}$ -> _Hanya satu jalan!_
> > 			
> > - **Fase 2 (Baca** $w^R$**):** Cocokkan input dengan pop stack.
> >     
> > 	- $\delta(q_1, 0, 0) = \{(q_1, \epsilon)\}$  
> > 			
> >
> > #### B. Bahasa Tanpa Marker ($L_{ww^R}$): NON-DETERMINISTIK
> >
> > **Bahasa:** $\{ww^R : w \in \{0,1\}^*\}$. Contoh: `011110`.
> >
> > Masalah Guesser:
> > 
> > Saat mesin membaca 011..., mesin tidak tahu apakah 1 kedua adalah bagian dari $w$ atau awal dari $w^R$. Mesin harus "menebak" (guessing) secara non-deterministik di setiap langkah. DPDA tidak bisa menebak, jadi DPDA tidak bisa mengenali bahasa ini.
> >
> > ### 3. Hierarki Bahasa: Di Mana Posisi DPDA?
> >
> > Kita memiliki struktur hierarki yang bersifat _Proper Subset_ (himpunan bagian murni):
> >
> > $$\text{Reguler} \subset L(\text{DPDA}) \subset \text{CFL}$$
> >
> > 1. **Reguler** $\subset$ **L(DPDA):** Setiap DFA bisa diubah menjadi DPDA yang "malas" (tidak pernah menggunakan stack-nya, stack hanya berisi $Z_0$ diam).
> >     
> > 2. **L(DPDA)** $\subset$ **CFL:** DPDA lebih kuat dari DFA (karena punya stack), tapi lebih lemah dari NPDA/CFL (karena tidak bisa menebak).
> >     
> >
> > ### 4. DPDA dengan Empty Stack Acceptance
> >
> > DPDA biasanya menggunakan _Final State Acceptance_. Jika dipaksa menggunakan _Empty Stack_, DPDA menjadi lebih lemah lagi.
> >
> > Syarat Prefix Property:
> > 
> > Agar bisa diterima oleh DPDA Empty Stack, bahasa $L$ tidak boleh memiliki string yang merupakan awalan (prefix) dari string lain di bahasa yang sama.
> >
> > - **Contoh Gagal:** $\{0\}^* = \{\epsilon, 0, 00, \dots\}$.
> >     
> > 	- String '0' ada di bahasa.
> > 			
> > 	- String '00' ada di bahasa.
> > 			
> > 	- Jika DPDA mengosongkan stack saat baca '0' (terima), mesin mati. Ia tidak bisa lanjut baca '0' berikutnya untuk terima '00'.
> > 			
> >
> > ### 5. Ambiguitas dan DPDA
> >
> > - **Unambiguous CFG:** Jika sebuah bahasa bisa diterima oleh DPDA, maka bahasa tersebut PASTI memiliki Grammar yang tidak ambigu.
> >     
> > - **Inherently Ambiguous:** Ada bahasa CFL yang "sangat kacau" sehingga semua grammar-nya pasti ambigu (contoh: $L = \{a^i b^j c^k \mid i=j \text{ atau } j=k\}$). Bahasa jenis ini **mustahil** dikenali oleh DPDA.
> >     

> [!cornell] #### Summary
> 
> **Deterministic PDA (DPDA)** adalah varian PDA yang membatasi fungsi transisi agar **maksimal memiliki satu aksi** untuk setiap situasi dan melarang tumpang tindih antara input-move dan $\epsilon$-move. DPDA sangat bergantung pada **marker (seperti 'c')** untuk menentukan pergantian fase komputasi secara pasti. Dalam hierarki bahasa, DPDA berada di antara Bahasa Reguler dan CFL ($Reguler \subset DPDA \subset CFL$). Keterbatasan utamanya adalah ketidakmampuan menangani ambiguitas dan kebutuhan akan **Prefix Property** jika menggunakan metode penerimaan _Empty Stack_.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis & Implementasi
> 
> #### 1. Implementasi Marker End ($)
> 
> Untuk mengatasi kelemahan DPDA _Empty Stack_ pada bahasa tanpa _Prefix Property_, kita bisa menggunakan teknik **End Marker**.
> 
> - Tambahkan simbol khusus `$` di akhir semua string input.
>     
> - Bahasa $L' = L\$$ sekarang pasti memiliki prefix property karena `$` menjamin tidak ada string yang jadi awalan string lain.
>     
> - Teknik ini sering digunakan dalam perancangan parser.
>     
> 
> #### 2. DPDA dalam Compiler Design (LR Parsers)
> 
> Sebagian besar bahasa pemrograman (C++, Java, Python) didesain agar strukturnya bisa dikenali oleh DPDA.
> 
> - **Kenapa?** Kita butuh compiler yang cepat (waktu linier $O(n)$) dan pasti (tidak ambigu). NPDA butuh waktu eksponensial atau kubik $O(n^3)$ yang terlalu lambat untuk kompilasi kode jutaan baris.
>     
> - Parser seperti **LR(k)** adalah implementasi praktis dari DPDA.
>     
> 
> #### 3. Teorema Pelengkap: Konvers yang Salah
> 
> Perlu diingat: **Unambiguous CFL** $\neq$ **L(DPDA)**.
> 
> - Semua bahasa DPDA pasti Unambiguous.
>     
> - TAPI, tidak semua bahasa Unambiguous bisa dikerjakan DPDA.
>     
> - Contoh: Palindrom genap ($ww^R$) memiliki grammar yang tidak ambigu ($S \to 0S0 \mid 1S1 \mid \epsilon$), tapi tetap bukan bahasa DPDA karena butuh tebakan titik tengah.
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
> Bahasa palindrom tanpa marker tengah ($L_{ww^R}$) atau bahasa yang memiliki ambiguitas inheren seperti $\{a^i b^j c^k \mid i=j \text{ atau } j=k\}$.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa yang terjadi jika kita mencoba membuat DPDA untuk bahasa $\{0\}^*$ dengan metode empty stack?</strong></summary>
> 
> Mesin akan gagal karena bahasa tersebut tidak memenuhi Prefix Property. Begitu stack kosong setelah membaca '0', mesin mati dan tidak bisa lagi melanjutkan untuk menerima '00'.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Apa hubungan hierarki antara Bahasa Reguler, DPDA, dan CFL?</strong></summary>
> 
> Reguler adalah subset murni dari DPDA, dan DPDA adalah subset murni dari CFL ($Reguler \subset DPDA \subset CFL$).
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Mengapa bahasa $L = \{wcw^R\}$ disebut deterministik?</strong></summary>
> 
> Karena keberadaan simbol 'c' memberikan informasi pasti (trigger) kapan mesin harus berhenti melakukan operasi 'push' (menyimpan $w$) dan mulai melakukan operasi 'pop' (mencocokkan dengan $w^R$).
> 
> </details>