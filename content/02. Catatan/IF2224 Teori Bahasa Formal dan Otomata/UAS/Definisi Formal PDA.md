---

type: Note

tags: [Komputasi, PDA]

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Fundamental Pushdown Automata (PDA)
> 
> > ## Questions/Cues
> >
> > - **Apa itu PDA?**
> >     
> > - **Analogi Stack (LIFO)**
> >     
> > - **Perbedaan Utama PDA vs FA**
> >     
> > - **3 Syarat Gerakan**
> >     
> > - **Tabel Simbol & Istilah**
> >     
> > - **Tabel Operasi Stack**
> >     
> > - **Notasi Formal (7-Tuple)**
> >     
> > - **Cara Membaca Fungsi Transisi**
> >     
> >
> > ## Reference Points
> >
> > - Bab 6 PDA.pdf (Halaman 1-10)
> >     
> > - Konsep Dasar Struktur Data (Stack)
> >     
> 
> > ### 1. Definisi & Intuisi Dasar
> >
> > **Pushdown Automata (PDA)** adalah mesin komputasi abstrak yang lebih "pintar" daripada Finite Automata (FA).
> >
> > **Mengapa kita butuh PDA?**
> > 
> > Finite Automata (FA) punya kelemahan besar: Pikun. Ia tidak punya memori untuk mengingat apa yang sudah lewat.
> >
> > - _Contoh FA:_ Bisa mengenali pola sederhana, tapi tidak bisa menghitung apakah jumlah huruf 'a' sama dengan jumlah huruf 'b' ($a^n b^n$) karena ia lupa berapa banyak 'a' yang sudah lewat.
> >     
> > - _Solusi PDA:_ PDA diberikan "buku catatan" berupa tumpukan (Stack).
> >
> > ![[Pasted image 20251222233125.png]]
> >
> > **Analogi Tumpukan Piring (Stack):**
> > 
> > Bayangkan PDA seperti pelayan yang memiliki tumpukan piring.
> >
> > 1. **LIFO (Last In, First Out):** Piring yang terakhir ditaruh (paling atas) adalah yang pertama kali harus diambil.
> >     
> > 2. **Akses Terbatas:** Anda HANYA bisa melihat dan mengambil piring **paling atas**. Piring di bawahnya tertutup.
> >     
> > 3. **Operasi:** Anda bisa menaruh piring baru (Push) atau mengambil piring teratas (Pop).
> >     
> >
> > **Kesimpulan:** PDA = NFA (Otak non-deterministik) + Stack (Memori Tumpukan tak terbatas).
> >
> > ### 2. Tabel Terminologi Dasar PDA
> >
> > Berikut adalah kamus istilah yang wajib dipahami untuk membaca diagram PDA:
> >
> > 
> > |**Simbol**|**Nama**|**Penjelasan Sederhana**|
> > |---|---|---|
> > |$Q$|**States**|Himpunan semua kondisi/state yang ada di mesin (seluruh lingkaran).|
> > |$q$|**State**|Satu kondisi spesifik tempat mesin berada sekarang (misal $q_0$ atau $q_{push}$).|
> > |$\Sigma$|**Input Alphabet**|Huruf/angka yang ada di string soal (misal: $\{a, b\}$ atau $\{0, 1\}$). Ini yang dibaca dari pita input.|
> > |$\Gamma$|**Stack Alphabet**|Daftar simbol yang **boleh** masuk ke dalam stack. Isinya bisa beda dengan input (misal: $\{X, Z_0, a, b\}$).|
> > |$\delta$|**Transition Function**|Aturan main: "Jika di state $q$, baca input $a$, dan top stack $X$, maka lakukan aksi..."|
> > |$q_0$|**Start State**|State awal saat mesin baru dinyalakan.|
> > |$Z_0$|**Initial Stack Symbol**|Penanda dasar stack. Kalau kamu lihat simbol ini di top, artinya stack sudah sampai dasar (kosong).|
> > |$F$|**Final States**|Himpunan state penerima (lingkaran ganda). Jika input habis dan mesin berhenti di sini, string diterima.|
> >
> > ### 3. Mekanisme Gerakan (Transition)
> >
> > PDA lebih kompleks daripada FA karena gerakannya ditentukan oleh **3 faktor sekaligus**.
> >
> > **Syarat Pindah State:**
> > 
> > Agar mesin bisa bergerak, ia harus mencocokkan tiga hal:
> >
> > 1. **Dimana saya?** (Current State - $q$)
> >     
> > 2. **Apa yang saya baca?** (Input Symbol - $a$)
> >     
> > 3. **Apa isi tumpukan paling atas?** (Top of Stack - $X$)
> >     
> >
> > Jika ketiga syarat ini cocok dengan aturan di $\delta$, mesin baru boleh bergerak.
> >
> > ### 4. Tabel Operasi Stack: Push, Pop, Skip
> >
> > Apa yang terjadi pada tumpukan saat mesin bergerak?
> >
> > |**Operasi**|**Notasi Transisi**|**Penjelasan Visual**|
> > |---|---|---|
> > |**PUSH (Tambah)**|$\delta(q, a, Z) = \{(p, \mathbf{aZ})\}$|**"Tumpuk di atasnya"**. Simbol lama $Z$ tidak dibuang, simbol baru $a$ ditaruh di atas $Z$. Stack jadi lebih tinggi.|
> > |**POP (Hapus)**|$\delta(q, a, X) = \{(p, \mathbf{\epsilon})\}$|**"Buang piring teratas"**. Simbol $X$ dihapus dan diganti dengan $\epsilon$ (kosong). Stack jadi lebih pendek.|
> > |**REPLACE (Ganti)**|$\delta(q, a, Z) = \{(p, \mathbf{X})\}$|**"Tukar piring"**. Simbol $Z$ dibuang, langsung diganti dengan $X$. Tinggi stack tetap sama.|
> > |**STAY / SKIP**|$\delta(q, a, Z) = \{(p, \mathbf{Z})\}$|**"Lihat saja"**. Simbol $Z$ diambil, lalu ditaruh lagi $Z$. Tidak ada perubahan isi stack.|
> >
> > ### 5. Formalisme Matematis (7-Tuple)
> >
> > Jika diminta mendefinisikan PDA secara formal, tuliskan 7 komponen ini:
> > 
> > $$M = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$$
> >
> > **Fungsi Transisi ($\delta$) secara detail:**
> > 
> > $$\delta(q, a, X) = \{(p, Y), (r, ZX), ...\}$$
> >
> > - **Input:** State $q$, Input $a$, Top Stack $X$.
> >     
> > - **Output:** Himpunan pasangan $\{(state\_baru, isi\_stack\_baru)\}$.
> >     
> > - **Kenapa Himpunan?** Karena PDA umumnya **Non-deterministic**. Satu input bisa memicu dua kemungkinan takdir (misal: satu jalan _push_, jalan lain _pop_). Mesin bisa "membelah diri" untuk mencoba semua kemungkinan.
> >     
> > ### 6. Studi Kasus Step-by-Step
> >
> > #### Studi Kasus 1: Desain PDA untuk $L = \{0^n 1^n | n \ge 1\}$  
> >
> > **Tujuan:** Membuat mesin yang menerima string jika jumlah '0' sama dengan jumlah '1', dan urutan '0' selalu di depan. Contoh diterima: `01`, `0011`, `000111`.
> >
> > **Logika Desain:**
> >
> > 1. **Fase 1 (Baca 0 - Push):** Setiap kali mesin melihat `0`, simpan penanda (misal $X$) ke dalam stack. Ini untuk "mengingat" berapa banyak `0` yang sudah lewat.
> >     
> > 2. **Transisi (Ganti Mode):** Saat pertama kali melihat `1`, berhenti menyimpan dan mulai mencocokkan.
> >     
> > 3. **Fase 2 (Baca 1 - Pop):** Setiap kali mesin melihat `1`, ambil satu penanda $X$ dari stack. Ini untuk "memasangkan" `1` dengan `0`.
> >     
> > 4. **Fase Akhir (Cek):** Jika input habis DAN stack kosong (tinggal $Z_0$), berarti jumlah pasangan cocok.
> >     
> >
> > **Definisi Transisi (**$\delta$**):**
> >
> > - **Start (**$q$**):**
> >     
> >     - $\delta(q, 0, Z_0) = \{(q, XZ_0)\}$ : Ketemu 0 pertama, tumpuk X.
> >         
> >     - $\delta(q, 0, X) = \{(q, XX)\}$ : Ketemu 0 berikutnya, tumpuk X lagi.
> >         
> > - **Switch (**$q \to p$**):**
> >     
> >     - $\delta(q, 1, X) = \{(p, \epsilon)\}$ : Ketemu 1 pertama, pindah state ke $p$ dan **POP** satu X.
> >         
> > - **Match (**$p$**):**
> >     
> >     - $\delta(p, 1, X) = \{(p, \epsilon)\}$ : Ketemu 1 lagi, **POP** lagi.
> >         
> > - **Accept (**$p \to f$**):**
> >     
> >     - $\delta(p, \epsilon, Z_0) = \{(f, Z_0)\}$ : Input habis, di stack tinggal $Z_0$. Terima!
> >         
> >
> > #### Studi Kasus 2: Penelusuran (Tracing) String `0011`
> >
> > Mari kita jalankan mesin di atas untuk input `0011`.
> >
> > **Notasi ID:** $(State, \text{Sisa Input}, \text{Isi Stack})$  
> >
> > 1. **Awal:** $(q, \mathbf{0}011, \mathbf{Z_0})$  
> >     
> >     - Aksi: Baca 0, Top $Z_0$ $\to$ Push $X$. State tetap $q$.
> >         
> > 2. **Langkah 1:** $\vdash (q, \mathbf{0}11, \mathbf{XZ_0})$  
> >     
> >     - Aksi: Baca 0, Top $X$ $\to$ Push $X$. Stack jadi $XXZ_0$.
> >         
> > 3. **Langkah 2:** $\vdash (q, \mathbf{1}1, \mathbf{XXZ_0})$  
> >     
> >     - Aksi: Baca 1, Top $X$ $\to$ **Pindah ke** $p$, Pop $X$. Stack sisa $XZ_0$.
> >         
> > 4. **Langkah 3:** $\vdash (p, \mathbf{1}, \mathbf{XZ_0})$  
> >     
> >     - Aksi: Baca 1, Top $X$ $\to$ Pop $X$. Stack sisa $Z_0$.
> >         
> > 5. **Langkah 4:** $\vdash (p, \epsilon, \mathbf{Z_0})$  
> >     
> >     - Aksi: Input habis ($\epsilon$), Top $Z_0$ $\to$ **Pindah ke** $f$ (Final).
> >         
> > 6. **Hasil:** $\vdash (f, \epsilon, Z_0)$ $\rightarrow$ **DITERIMA.**
> >

> [!cornell] #### Summary
> 
> **Pushdown Automata (PDA)** adalah upgrade dari Finite Automata yang dilengkapi dengan memori **Stack (LIFO)**. Hal ini memungkinkan PDA mengenali struktur bahasa yang lebih kompleks (**Context-Free Languages**). Komponen terpenting PDA adalah **Fungsi Transisi (**$\delta$**)** yang menentukan aksi mesin berdasarkan tiga input: **State saat ini**, **Input yang dibaca**, dan **Simbol Top Stack**. Aksi utamanya meliputi **Push** (menambah data), **Pop** (menghapus data), atau **Replace** (mengganti data). Secara formal, PDA didefinisikan dengan **7-Tuple** $(Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$.

> [!ad-libitum]- Ad Libitum: Pendalaman Teknis
> 
> #### 1. Konsep Non-Determinism pada PDA
> 
> Berbeda dengan Deterministic Finite Automata (DFA), **Non-deterministic PDA (NPDA)** adalah standar default dalam teori otomata.
> 
> - **NPDA:** Untuk input dan stack yang sama, bisa ada banyak pilihan langkah. Contoh: $\delta(q, a, X) = \{(p, \epsilon), (q, aX)\}$. Mesin bisa memilih untuk _pop_ ATAU _push_ sekaligus (secara konseptual paralel).
>     
> - **DPDA (Deterministic):** Setiap situasi hanya punya **maksimal satu** langkah pasti. DPDA lebih lemah daripada NPDA (DPDA hanya bisa mengenali sebagian CFL, biasanya untuk parsing bahasa pemrograman).
>     
> 
> #### 2. Notasi String Stack ($\alpha$)
> 
> Dalam transisi $(p, \alpha)$, string $\alpha$ ditulis dari kiri ke kanan merepresentasikan urutan dari **Top ke Bawah** di stack.
> 
> - Jika $\alpha = YZ$, maka $Y$ akan berada di paling atas (Top baru), dan $Z$ di bawahnya.
>     
> - Hati-hati: Urutan penulisan sangat penting saat melakukan operasi Push multiple symbol.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan utama antara Finite Automata (FA) dan Pushdown Automata (PDA) dalam hal memori?</strong></summary>
> 
> FA tidak memiliki memori penyimpanan (hanya state), sedangkan PDA memiliki memori eksternal berbentuk Stack (tumpukan) yang bekerja dengan prinsip LIFO.
> 
> </details>
> <details>
> 
> <summary><strong>2. Sebutkan 7 tuple yang mendefinisikan PDA!</strong></summary>
> 
> $Q$ (states), $\Sigma$ (input alphabet), $\Gamma$ (stack alphabet), $\delta$ (transition function), $q_0$ (start state), $Z_0$ (start stack symbol), $F$ (final states).
> 
> </details>
> <details>
> 
> <summary><strong>3. Apa tiga parameter yang dibutuhkan oleh fungsi transisi PDA untuk menentukan langkah selanjutnya?</strong></summary>
> 
> 1. Current State ($q$)
> 2. Current Input Symbol ($a$ atau $\epsilon$)
> 3. Top of Stack Symbol ($Z$)
> 
> </details>
> 
> <details>
> 
> <summary><strong>4. Dalam transisi $\delta(q, a, Z) = \{(p, \epsilon)\}$, apa yang terjadi pada stack?</strong></summary>
> 
> Terjadi operasi POP. Simbol $Z$ dihapus dari tumpukan dan digantikan oleh string kosong ($\epsilon$).
> 
> </details>
> <details>
> 
> <summary><strong>5. Mengapa PDA disebut non-deterministik secara default?</strong></summary>
> 
> Karena untuk satu kombinasi (state, input, stack symbol), fungsi transisi bisa menghasilkan lebih dari satu kemungkinan langkah selanjutnya (outputnya berupa himpunan).
> 
> </details>

