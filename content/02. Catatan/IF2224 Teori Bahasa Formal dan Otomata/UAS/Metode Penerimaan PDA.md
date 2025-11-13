---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Pushdown Automata (PDA): Metode Penerimaan & Ekuivalensi
> 
> > ## Questions/Cues
> > 
> > - Apa 2 cara PDA menerima bahasa?
> >     
> > - Definisi: _Acceptance by Final State_ ($L(P)$)
> >     
> > - Definisi: _Acceptance by Empty Stack_ ($N(P)$)
> >     
> > - Apa perbedaan utamanya?
> >     
> > - Apakah kedua metode ekuivalen?
> >     
> > - Teorema: Konversi _Empty Stack_ $\rightarrow$ _Final State_
> >     
> > - Bagaimana konstruksi $N(P_N) \rightarrow L(P_F)$?
> >     
> > - Teorema: Konversi _Final State_ $\rightarrow$ _Empty Stack_
> >     
> > - Bagaimana konstruksi $L(P_F) \rightarrow N(P_N)$?
> >     
> > 
> > ## Reference Points
> > 
> > - Slide 11_2023_Pushdown Automata.pdf (hlm. 12-21)
> >     
> 
> > ### Dua Metode Penerimaan (Acceptance)
> > 
> > Ada dua cara standar untuk mendefinisikan kapan sebuah PDA "menerima" (accept) sebuah string input.
> > 
> > 1. Dengan berakhir di _state_ penerima (_final state_).
> >     
> > 2. Dengan mengosongkan _stack_.
> >     
> > 
> > ### 1. Acceptance by Final State ($L(P)$)
> > 
> > Ini adalah metode yang paling umum, mirip dengan NFA.
> > 
> > Definisi Formal: Bahasa $L(P)$ dari sebuah PDA $P=(Q,\Sigma,\Gamma,\delta,q_{0},Z_{0},F)$ adalah:
> > 
> > $$L(P)=\{w \mid (q_{0},w,Z_{0}) \vdash^{*} (q,\epsilon,\alpha), \text{ dimana } q \in F\}$$
> > 
> > Penjelasan Sederhana:
> > 
> > Sebuah string $w$ diterima jika, setelah semua input habis dibaca (tersisa $\epsilon$), PDA berada di salah satu accepting state (state $q$ ada di himpunan $F$).
> > 
> > - **Poin Kunci:** Isi stack pada akhirnya ($\alpha$) **tidak penting**. Stack boleh berisi apa saja, boleh kosong, boleh penuh. Yang penting hanya state akhirnya.
> >     
> > - _Contoh:_ PDA untuk $L_{wwr}$ (palindrom) yang kita bahas di catatan pertama adalah contoh PDA yang menerima dengan _final state_.
> >     
> > 
> > ### 2. Acceptance by Empty Stack ($N(P)$)
> > 
> > Ini adalah metode alternatif yang berfokus pada memori (stack).
> > 
> > Definisi Formal: Bahasa $N(P)$ dari sebuah PDA $P=(Q,\Sigma,\Gamma,\delta,q_{0},Z_{0},F)$ adalah:
> > 
> > $$N(P)=\{w \mid (q_{0},w,Z_{0}) \vdash^{*} (q,\epsilon,\epsilon)\}$$
> > 
> > Penjelasan Sederhana:
> > 
> > Sebuah string $w$ diterima jika, setelah semua input habis dibaca (tersisa $\epsilon$), stack PDA menjadi benar-benar kosong (tersisa $\epsilon$).
> > 
> > - **Poin Kunci:** _State_ akhir PDA ($q$) **tidak penting**. PDA bisa berakhir di state mana saja, selama stack-nya kosong.
> >     
> > - _Catatan:_ Himpunan $F$ (final state) tidak relevan dalam definisi ini.
> >     
> > 
> > ### Ekuivalensi Metode Penerimaan
> > 
> > Kedua metode penerimaan ini **ekuivalen**. Artinya:
> > 
> > 1. Jika sebuah bahasa $L$ bisa diterima oleh PDA $P_N$ (dengan _empty stack_), maka pasti ada PDA $P_F$ (dengan _final state_) yang juga menerima $L$.
> >     
> > 2. Jika sebuah bahasa $L$ bisa diterima oleh PDA $P_F$ (dengan _final state_), maka pasti ada PDA $P_N$ (dengan _empty stack_) yang juga menerima $L$.
> >     
> > 
> > Kita dapat membuktikan ini dengan menunjukkan cara mengubah (konstruksi) satu jenis PDA ke jenis lainnya.
> > 
> > ### Teorema 6.9: Konversi Empty Stack ($N(P_N)$) $\rightarrow$ Final State ($L(P_F)$)
> > 
> > **Ide:** Kita membuat PDA baru ($P_F$) yang mensimulasikan PDA lama ($P_N$). $P_F$ akan memiliki "sensor" di dasar stack. Jika $P_N$ mengosongkan stack-nya, "sensor" ini akan terdeteksi, dan $P_F$ akan pindah ke _final state_ baru.
> > 
> > **Langkah Konstruksi:**
> > 
> > 1. Buat $P_F$ baru.
> >     
> > 2. Buat _new start state_ $p_0$ (yang akan menjadi _start state_ $P_F$).
> >     
> > 3. Buat _new final state_ $p_f$ (ini akan menjadi _satu-satunya_ final state di $P_F$).
> >     
> > 4. Buat _new stack bottom marker_ $X_0$. $X_0$ tidak ada di alfabet stack $P_N$.
> >     
> > 5. **Transisi 1 (Inisialisasi):** Tambahkan transisi dari $p_0$ ke _start state_ lama ($q_0$) tanpa membaca input ($\epsilon$). Transisi ini PUSH _start symbol_ lama ($Z_0$) dan _marker_ $X_0$ ke stack.
> >     
> >     - $\delta_F(p_0, \epsilon, X_0) = \{(q_0, Z_0X_0)\}$  
> >         
> > 6. **Transisi 2 (Salin Transisi Lama):** Salin semua transisi dari $P_N$ ke $P_F$.
> >     
> > 7. **Transisi 3 (Deteksi & Terima):** Tambahkan transisi baru. Dari _setiap_ state $q$ di $P_N$, jika top stack adalah _marker_ $X_0$ (artinya $P_N$ sudah mengosongkan stack aslinya), $P_F$ bisa pindah ke _final state_ $p_f$ dan POP $X_0$.
> >     
> >     - $\delta_F(q, \epsilon, X_0) = \{(p_f, \epsilon)\}$, untuk semua $q$ di $Q$ lama.
> >         
> > 
> > ### Teorema 6.11: Konversi Final State ($L(P_F)$) $\rightarrow$ Empty Stack ($N(P_N)$)
> > 
> > **Ide:** Kita buat PDA baru ($P_N$) yang mensimulasikan $P_F$. Jika $P_F$ masuk ke _final state_, kita aktifkan mode "kuras" di $P_N$ yang akan mengosongkan sisa isi stack.
> > 
> > **Langkah Konstruksi:**
> > 
> > 1. Buat $P_N$ baru.
> >     
> > 2. Buat _new start state_ $p_0$ dan _new "drain" state_ $p$.
> >     
> > 3. Buat _new stack bottom marker_ $X_0$.
> >     
> > 4. **Transisi 1 (Inisialisasi):** Sama seperti sebelumnya, PUSH $Z_0$ dan $X_0$, lalu pindah ke $q_0$.
> >     
> >     - $\delta_N(p_0, \epsilon, X_0) = \{(q_0, Z_0X_0)\}$  
> >         
> > 5. **Transisi 2 (Salin Transisi Lama):** Salin semua transisi dari $P_F$ ke $P_N$.
> >     
> > 6. **Transisi 3 (Deteksi Final State):** Tambahkan transisi baru. Dari _setiap_ state $q$ yang merupakan _final state_ di $P_F$ ($q \in F$), $P_N$ bisa spontan ($\epsilon$) pindah ke _drain state_ $p$ dan POP apapun yang ada di top stack.
> >     
> >     - $\delta_N(q, \epsilon, Y) = \{(p, \epsilon)\}$, untuk semua $q \in F$ dan semua $Y$ (termasuk $X_0$).
> >         
> > 7. **Transisi 4 (Kuras Stack):** Buat _loop_ di state $p$. State $p$ akan terus-menerus mem-POP isi stack sampai kosong, tanpa membaca input.
> >     
> >     - $\delta_N(p, \epsilon, Y) = \{(p, \epsilon)\}$, untuk semua $Y$ (termasuk $X_0$).
> >         
> > 
> > Dengan demikian, jika $P_F$ menerima $w$ (berakhir di $q \in F$), $P_N$ akan pindah ke $p$ dan mengosongkan stack-nya, sehingga $P_N$ juga menerima $w$.

> [!cornell] #### Summary
> 
> **PDA dapat menerima bahasa dengan dua cara yang ekuivalen: (1)** _**Acceptance by Final State**_ **(**$L(P)$**), di mana PDA harus berakhir di** _**accept state**_ **setelah input habis, dan (2)** _**Acceptance by Empty Stack**_ **(**$N(P)$**), di mana PDA harus mengosongkan stack-nya setelah input habis. Kekuatan kedua metode ini sama, karena terdapat algoritma konstruksi formal (Teorema 6.9 dan 6.11) untuk mengubah satu jenis PDA ke jenis lainnya, yang intinya menggunakan** _**stack marker**_ **baru (**$X_0$**) dan** _**state**_ **baru untuk mendeteksi kondisi penerimaan yang lama dan memicunya ke kondisi penerimaan yang baru.**

> [!ad-libitum]- Additional Information
> 
> #### Analogi Konstruksi Ekuivalensi
> 
> - $N(P) \rightarrow L(P)$ (Empty Stack ke Final State):
>     
>     Bayangkan Anda memasang sensor tekanan ($X_0$) di dasar tumpukan piring ($Z_0$). Anda menjalankan mesin pencuci piring (PDA $P_N$). Jika tumpukan piring habis dan sensor $X_0$ terdeteksi (artinya stack asli $P_N$ kosong), lampu hijau ($p_f$, final state) akan menyala.
>     
> - $L(P) \rightarrow N(P)$ (Final State ke Empty Stack):
>     
>     Bayangkan mesin Anda memiliki lampu hijau ($q \in F$). Anda memasang sensor $X_0$ di dasar tumpukan $Z_0$. Anda menjalankan mesin (PDA $P_F$). Segera setelah lampu hijau menyala, Anda menekan tombol "kuras" (pindah ke state $p$). Mode "kuras" ini akan membuang semua piring yang tersisa di tumpukan, termasuk sensor $X_0$ di dasarnya, sampai tumpukan benar-benar kosong. Penerimaan terjadi saat tumpukan kosong.
>     
> 
> #### Pendalaman: Contoh $P_N$ (Slide 18)
> 
> Slide 18 memberikan contoh $P_N$ untuk bahasa `if-else`. Mari kita analisis PDA yang _tertulis_ di slide:
> 
> - $P_N = (\{q\},\{i,e\},\{Z\},\delta_{N},q,Z)$  
>     
> - Transisi 1: $\delta_{N}(q,i,Z)=\{(q,ZZ)\}$  
>     
> - Transisi 2: $\delta_{N}(q,e,Z)=\{(q,\epsilon)\}$  
>     
> 
> Mari kita lacak cara kerjanya.
> 
> - Setiap kali membaca 'i', PDA mengganti 1 'Z' dengan 'ZZ'. Efek bersihnya adalah **PUSH 1 'Z'**.
>     
> - Setiap kali membaca 'e', PDA mengganti 1 'Z' dengan $\epsilon$. Efek bersihnya adalah **POP 1 'Z'**.
>     
> 
> PDA ini akan menerima string jika stack-nya kosong di akhir. Ini akan terjadi jika jumlah 'e' yang dibaca **sama dengan** jumlah 'Z' yang di-push. Karena `Z` awal sudah ada 1, dan setiap `i` menambah 1 `Z`, maka string diterima jika:
> 
> _Jumlah 'e' = 1 (dari_ $Z_0$_) + Jumlah 'i'_
> 
> Mari kita uji:
> 
> - **Input: "ie"**
>     
>     - $(q, ie, Z) \vdash (q, e, ZZ)$ (karena baca 'i')
>         
>     - $\vdash (q, \epsilon, Z)$ (karena baca 'e')
>         
>     - **Ditolak** (Stack tidak kosong).
>         
> - **Input: "iee"**
>     
>     - $(q, iee, Z) \vdash (q, ee, ZZ)$ (karena baca 'i')
>         
>     - $\vdash (q, e, Z)$ (karena baca 'e')
>         
>     - $\vdash (q, \epsilon, \epsilon)$ (karena baca 'e')
>         
>     - **Diterima!** (Stack kosong).
>         
> - **Input: "iieee"**
>     
>     - $(q, iieee, Z) \vdash (q, ieee, ZZ) \vdash (q, eee, ZZZ) \vdash (q, ee, ZZ) \to (q, e, Z) \to (q, \epsilon, \epsilon)$  
>         
>     - **Diterima!**
>         
> 
> Jadi, PDA ini menerima bahasa $L = \{i^n e^{n+1} \mid n \ge 0\}$.
> 
> (Catatan: Ini berbeda dari bahasa "if-else" yang seimbang, namun ini adalah cara kerja PDA yang tertulis di slide).
> 
> #### Eksplorasi Mandiri
> 
> - Coba ambil PDA $L_{wwr}$ dari Catatan 1 (yang menerima by _final state_ $q_2$).
>     
> - Gunakan algoritma dari Teorema 6.11 untuk mengubahnya menjadi $P_N$ yang menerima $L_{wwr}$ by _empty stack_.
>