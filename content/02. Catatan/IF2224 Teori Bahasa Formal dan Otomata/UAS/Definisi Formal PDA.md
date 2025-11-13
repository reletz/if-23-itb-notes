---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Pushdown Automata (PDA): Pengenalan, Definisi, & Komputasi
> 
> > ## Questions/Cues
> >
> > - Apa itu Pushdown Automata (PDA)?
> >     
> > - Bagaimana cara kerja PDA?
> >     
> > - Contoh: Bahasa $L_{wwr}$ (Palindrom)
> >     
> > - Bagaimana PDA untuk $L_{wwr}$ bekerja?
> >     
> > - Apa definisi formal PDA (7-tuple)?
> >     
> > - Menjelaskan fungsi transisi ($\delta$)
> >     
> > - Apa itu _Instantaneous Descriptions_ (ID)?
> >     
> > - Notasi $\vdash$ dan $\vdash^{*}$  
> >     
> > - Apa properti (Teorema 6.5 & 6.6) dari komputasi ID?
> >     
> >
> > ## Reference Points
> >
> > - Slide 11_2023_Pushdown Automata.pdf (hlm. 1-11)
> >     
> 
> > ### Apa itu Pushdown Automata (PDA)?
> >
> > _Pushdown Automata_ (PDA) adalah model komputasi yang lebih kuat daripada Finite Automata (FA).
> >
> > Pada dasarnya, **PDA = NFA + Stack**.
> > 
> > ![[Pasted image 20251113075640.png]]
> >
> > - **NFA (Non-deterministic Finite Automata):** Memiliki _finite state control_ (kontrol state terbatas) dan bisa "menebak" (non-determinisme).
> >     
> > - **Stack:** Ini adalah memori tambahan. Stack adalah struktur data **LIFO (Last-In, First-Out)**. Ini memberikan PDA kemampuan untuk "mengingat" urutan simbol tanpa batas, sesuatu yang tidak bisa dilakukan NFA.
> >     
> >
> > ### Bagaimana Cara Kerja PDA?
> >
> > Dalam setiap langkah (transisi), PDA melakukan tiga hal secara bersamaan:
> >
> > 1. **Membaca Input:** Membaca simbol input berikutnya (atau $\epsilon$, yang berarti transisi spontan tanpa membaca input).
> >     
> > 2. **Mengubah State:** Pindah ke state baru (atau bisa tetap di state yang sama).
> >     
> > 3. **Memanipulasi Stack:** Mengganti simbol di puncak (_top_) stack dengan sebuah _string_ baru (yang bisa berisi 0, 1, atau banyak simbol).
> >     
> >     - Jika string baru = $\epsilon$ (string kosong): Ini adalah operasi **POP** (menghapus top stack).
> >         
> >     - Jika string baru = simbol top lama + simbol baru: Ini adalah operasi **PUSH** (menambahkan simbol baru di atas).
> >         
> >     - Jika string baru = simbol top lama: Stack tidak berubah.
> >         
> >
> > ### Contoh: Bahasa $L_{wwr}$ (Palindrom)
> >
> > Mari kita tinjau bahasa $L_{wwr} = \{ww^{R} : w \in \{0,1\}^{*}\}$.
> >
> > - $w$ adalah string apapun dari 0 dan 1 (misal: "010").
> >     
> > - $w^{R}$ adalah kebalikan (_reverse_) dari $w$ (misal: "010").
> >     
> > - $ww^{R}$ adalah gabungannya (misal: "010010"). Ini adalah bahasa **palindrom dengan panjang genap**.
> >     
> >
> > Bahasa ini tidak bisa dikenali oleh NFA biasa karena NFA tidak bisa mengingat seluruh bagian $w$ untuk dicocokkan dengan $w^{R}$. PDA bisa, menggunakan stack-nya.
> >
> > ### Bagaimana PDA untuk $L_{wwr}$ bekerja?
> >
> > PDA ini menggunakan non-determinisme untuk "menebak" di mana titik tengah string (batas antara $w$ dan $w^{R}$).
> >
> > 1. **Fase 1: Membaca** $w$ **(State** $q_0$**)**
> >     
> > 	- PDA "menebak" bahwa ia masih membaca bagian $w$.
> > 	- Setiap kali membaca simbol input (0 atau 1), ia **PUSH** simbol itu ke dalam stack.
> > 	- *Contoh:* Input "0110".
> > 			- Baca '0', push '0'. Stack: [0, $Z_0$]
> > 			- Baca '1', push '1'. Stack: [1, 0, $Z_0$]
> >
> > 2. **Fase 2: Menebak Titik Tengah (Transisi** $q_0 \rightarrow q_1$**)**
> >     
> > 	- Kapanpun (secara non-deterministik), PDA bisa "menebak" bahwa ia telah mencapai akhir $w$ dan akan mulai membaca $w^{R}$.
> > 	- Ia melakukan ini dengan transisi **spontan** (input $\epsilon$) dari state $q_0$ ke state $q_1$ tanpa mengubah stack.
> >	
> >
> > 3. **Fase 3: Membaca** $w^{R}$ **(State** $q_1$**)**
> >     
> > 	- Sekarang PDA berada di state $q_1$, ia mulai mencocokkan input dengan isi stack.
> > 	- Jika simbol input **cocok** dengan simbol di *top* stack, PDA akan **POP** stack.
> > 	- *Contoh (lanjutan):* Stack: [1, 0, $Z_0$]
> > 			- Baca '1', top stack '1'. Cocok\! Pop stack. Stack: [0, $Z_0$]
> > 			- Baca '0', top stack '0'. Cocok\! Pop stack. Stack: [$Z_0$]
> > 	- Jika input atau top stack tidak cocok, komputasi di jalur itu "mati".
> > 
> >
> > 4. **Fase 4: Penerimaan (Acceptance) (Transisi** $q_1 \rightarrow q_2$**)**
> >     
> > 	- Setelah semua input habis, jika stack kosong (hanya tersisa simbol awal $Z_0$), berarti seluruh $w$ telah berhasil dicocokkan dengan $w^{R}$.
> > 	- PDA melakukan transisi spontan (input $\epsilon$) ke *accept state* $q_2$.
> >	
> >![[Pasted image 20251113075744.png]]
> >
> > ### Apa definisi formal PDA (7-tuple)?
> >
> > PDA secara formal didefinisikan sebagai 7-tuple: $P=(Q,\Sigma,\Gamma,\delta,q_{0},Z_{0},F)$  
> >
> > - $Q$: Himpunan _state_ (terbatas), misal $\{q_0, q_1, q_2\}$.
> >     
> > - $\Sigma$: Alfabet _input_ (terbatas), misal $\{0, 1\}$.
> >     
> > - $\Gamma$: Alfabet _stack_ (terbatas), misal $\{0, 1, Z_0\}$.
> >     
> > - $\delta$: Fungsi transisi (dijelaskan di bawah).
> >     
> > - $q_{0}$: _Start state_.
> >     
> > - $Z_{0}$: Simbol awal stack (penanda bahwa stack awalnya kosong).
> >     
> > - $F$: Himpunan _accepting state_, misal $\{q_2\}$.
> >     
> >
> > ### Menjelaskan Fungsi Transisi ($\delta$)
> >
> > Ini adalah bagian paling penting. Fungsinya memetakan:
> > 
> > $\delta: Q \times (\Sigma \cup \{\epsilon\}) \times \Gamma \rightarrow 2^{Q \times \Gamma^{*}}$
> >
> > Mari kita bedah:
> >
> > - **Input:** $(q, a, X)$  
> >     
> >     - $q$: State saat ini.
> >         
> >     - $a$: Simbol input yang dibaca (bisa $\epsilon$).
> >         
> >     - $X$: Simbol di _top_ stack.
> >         
> > - **Output:** $2^{Q \times \Gamma^{*}}$  
> >     
> >     - Ini adalah _himpunan_ dari pasangan (state baru, string baru). Himpunan berarti bisa ada beberapa kemungkinan (non-determinisme).
> >         
> >     - $(p, \alpha)$:
> >         
> >         - $p$: State baru.
> >             
> >         - $\alpha$: String yang akan menggantikan $X$ di stack.
> >             
> >
> > _Contoh Transisi_ $L_{wwr}$_:_
> >
> > 1. $\delta(q_0, 0, Z_0) = \{(q_0, 0Z_0)\}$  
> >     
> >     - (Di $q_0$, baca '0', top stack $Z_0$) $\rightarrow$ (Tetap di $q_0$, ganti $Z_0$ dengan $0Z_0$. Efek: **push '0'**).
> >         
> > 2. $\delta(q_0, \epsilon, Z_0) = \{(q_1, Z_0)\}$  
> >     
> >     - (Di $q_0$, baca $\epsilon$, top stack $Z_0$) $\rightarrow$ (Pindah ke $q_1$, stack tidak berubah. Ini adalah **tebakan titik tengah**).
> >         
> > 3. $\delta(q_1, 0, 0) = \{(q_1, \epsilon)\}$  
> >     
> >     - (Di $q_1$, baca '0', top stack '0') $\rightarrow$ (Tetap di $q_1$, ganti '0' dengan $\epsilon$. Efek: **pop '0'**).
> >         
> >
> > ### Apa itu _Instantaneous Descriptions_ (ID)?
> >
> > ID adalah "snapshot" atau konfigurasi PDA pada satu waktu. Ini adalah cara formal untuk melacak komputasi.
> >
> > ID adalah sebuah triple: $(q, w, \gamma)$  
> >
> > - $q$: State PDA saat ini.
> >     
> > - $w$: Sisa string input yang _belum_ dibaca.
> >     
> > - $\gamma$: Seluruh isi stack, dengan simbol teratas ada di paling kiri.
> >     
> >
> > ### Notasi $\vdash$ dan $\vdash^{*}$  
> >
> > - $\vdash$ **("yields"):** Menunjukkan satu langkah komputasi.
> >     
> > 	- Kita menulis $(q, aw, X\beta) \vdash (p, w, \alpha\beta)$
> > 	- Ini berarti ada transisi $\delta(q, a, X)$ yang mengandung $(p, \alpha)$.
> > 	- PDA di state $q$, membaca $a$, dengan sisa input $w$. Top stack adalah $X$ dengan sisa $\beta$.
> > 	- PDA bergerak ke state $p$, sisa input $w$. Top stack $X$ diganti $\alpha$, sehingga stack menjadi $\alpha\beta$.
> > 	
> >
> > - $\vdash^{*}$ **("yields in 0 or more steps"):**
> >     
> >
> > 	- Ini adalah *reflexive-transitive closure* dari $\vdash$.
> > 	- $(q_1, w_1, \gamma_1) \vdash^{*} (q_k, w_k, \gamma_k)$ berarti ada serangkaian langkah (bisa 0, 1, atau lebih) yang membawa PDA dari konfigurasi pertama ke konfigurasi kedua.
> > 
> >
> > ### Apa properti (Teorema 6.5 & 6.6) dari komputasi ID?
> >
> > Ini adalah teorema formal tentang bagaimana komputasi berperilaku.
> >
> > - **Theorem 6.5:** Jika $(q, x, \alpha) \vdash^{*} (p, y, \beta)$, maka kita bisa menambahkan "ekor" input ($w$) dan "dasar" stack ($\gamma$) yang sama, dan komputasinya tetap valid:
> >     
> > 	- $(q, xw, \alpha\gamma) \vdash^{*} (p, yw, \beta\gamma)$
> > 	- *Artinya:* Komputasi PDA hanya peduli pada bagian atas stack dan awalan input yang dibacanya. Apa yang ada di "dasar" stack atau "akhir" input tidak akan mengganggu komputasi yang sudah terjadi.
> > 
> >
> > - **Theorem 6.6:** Jika $(q, xw, \alpha) \vdash^{*} (p, yw, \beta)$ (di mana $w$ tidak pernah tersentuh), maka $w$ bisa dihilangkan:
> >     
> > 	- $(q, x, \alpha) \vdash^{*} (p, y, \beta)$
> > 	- *Artinya:* Jika sebuah komputasi berhasil tanpa pernah membaca bagian akhir dari input, komputasi itu juga valid untuk input yang sudah dipotong (tanpa bagian akhir itu).
> > 

> [!cornell] #### Summary
> 
> **Pushdown Automata (PDA) adalah NFA yang diperkuat dengan memori stack (LIFO), yang memungkinkannya untuk mengenali Bahasa Bebas Konteks (Context-Free Languages) seperti palindrom** $L_{wwr}$**. PDA bekerja dengan membaca input, mengubah state, dan memanipulasi stack (push/pop). Perilaku ini didefinisikan secara formal oleh 7-tuple, terutama fungsi transisi** $\delta$ **yang bersifat non-deterministik. Untuk melacak proses komputasinya, kita menggunakan** _**Instantaneous Descriptions**_ **(ID) yang merepresentasikan snapshot dari (state, sisa input, isi stack) pada satu waktu.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Non-Determinisme adalah Kunci
> 
> Kunci dari PDA $L_{wwr}$ adalah _non-determinisme_. Ada dua transisi dari $q_0$ ketika top stack adalah $0$:
> 
> 1. $\delta(q_0, 0, 0) = \{(q_0, 00)\}$ (PUSH - tebak masih di $w$)
>     
> 2. $\delta(q_0, \epsilon, 0) = \{(q_1, 0)\}$ (Pindah state - tebak sudah di $w^{R}$)
>     
> 
> Ketika PDA berada di $q_0$ dan membaca '0', ia akan "mencabang" komputasinya. Satu cabang akan mengambil transisi 1 (tetap di $q_0$, push '0'), dan cabang lainnya akan mengambil transisi 2 (pindah ke $q_1$, stack tetap).
> 
> Sebuah string diterima jika **setidaknya satu** dari semua kemungkinan cabang komputasi ini berakhir di _accept state_ setelah semua input habis. Jika semua cabang "mati" (karena input tidak cocok dengan stack, dll), string ditolak.
> 
> #### Pendalaman: Kekuatan $\Gamma^{*}$ dalam $\delta$  
> 
> Fungsi transisi $\delta(q, a, X) \rightarrow (p, \alpha)$ di mana $\alpha \in \Gamma^{*}$ (string dari simbol stack) sangat kuat:
> 
> - Jika $\alpha = \epsilon$ (string kosong) $\rightarrow$ Ini adalah **POP**.
>     
> - Jika $\alpha = X$ $\rightarrow$ Stack **tidak berubah**.
>     
> - Jika $\alpha = YX$ $\rightarrow$ Ini mengganti $X$ dengan $YX$. Efeknya adalah **PUSH** $Y$ di atas $X$.
>     
> - Jika $\alpha = YZX$ $\rightarrow$ Ini mengganti $X$ dengan $YZX$. Efeknya adalah **PUSH** $Y$ **lalu PUSH** $Z$. (Atau bisa dilihat sebagai "mengganti $X$ dengan string $YZX$").
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba lacak komputasi (buat urutan ID) untuk PDA $L_{wwr}$ dengan input "0110".
>     
> - Coba lacak komputasi untuk input "010" (harus ditolak). Di mana komputasinya "mati"?
>     
> - Bagaimana Anda memodifikasi PDA ini untuk menerima $L_{wcwR}$ (misal "01c10")? (Petunjuk: transisi $c$ adalah penanda titik tengah, tidak perlu menebak).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** "Introduction to the Theory of Computation" oleh Michael Sipser (Chapter 2, Bagian "Pushdown Automata").
>     
> - **Konsep Terkait:** _Context-Free Grammars_ (CFG). PDA adalah mesin pengenal untuk _Context-Free Languages_ (CFL), yaitu bahasa yang dapat dibangkitkan oleh CFG. Ada teorema yang membuktikan bahwa CFG dan PDA adalah ekuivalen.
>