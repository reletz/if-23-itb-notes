---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Fondasi dan Arsitektur Mesin Turing (Bagian 1)
> 
> > ## Questions/Cues
> >
> > - Definisi Dasar MT
> >     
> > - Komponen Fisik
> >     
> > - Fungsi Transisi
> >     
> > - 7-Tuple MT
> >     
> > - Instantaneous Description
> >     
> > - Syarat Acceptance
> >     
> >
> > ## Reference Points
> >
> > - Slide 14_2025: Hal 1 - 11
> >     
> 
> > ### 1. Pengertian Mesin Turing (MT)
> >
> > Mesin Turing adalah model matematika yang digunakan untuk mendefinisikan sistem komputasi secara umum. MT memiliki kemampuan yang lebih besar dibandingkan _Finite Automata_ (DFA/NFA) dan _Pushdown Automata_ (PDA) karena memiliki memori yang tidak terbatas dan fleksibilitas dalam memproses data.
> >
> > ### 2. Arsitektur dan Komponen Utama
> >
> > Mesin Turing terdiri dari tiga elemen fisik utama yang bekerja secara sinkron:
> >
> > - **Tape (Pita) Tak Terbatas:** Media penyimpanan yang terbagi dalam sel-sel. Tape ini bersifat tak terbatas ke dua arah (atau satu arah dalam model standar) dan setiap sel dapat berisi satu simbol.
> >     
> > - **Read/Write Head:** Alat yang berada di atas satu sel tape pada satu waktu. Head ini memiliki kemampuan untuk membaca simbol, menulis/mengganti simbol, dan bergerak satu sel ke kiri (L) atau ke kanan (R).
> >     
> > - **Unit Kontrol (Finite State Control):** Komponen yang menyimpan "state" atau keadaan mesin saat ini dan menentukan langkah berikutnya berdasarkan tabel transisi.
> >     
> >
> > ### 3. Mekanisme Kerja Teknis
> >
> > Pada setiap langkah komputasi, Mesin Turing melakukan urutan aksi berikut berdasarkan simbol yang dibaca di bawah head dan state saat ini:
> >
> > 1. Mengubah state internal (dari state $q$ ke state $p$).
> >     
> > 2. Menulis simbol baru pada sel tape saat ini (menggantikan simbol lama).
> >     
> > 3. Menggerakkan head satu langkah ke kiri (L) atau ke kanan (R).
> >     
> >
> > Notasi Transisi: $\delta(q, X) = (p, Y, D)$
> > 
> > Artinya: Dari state $q$, jika membaca simbol $X$, maka mesin akan pindah ke state $p$, menulis simbol $Y$ ke dalam sel tersebut, dan bergerak ke arah $D$ (L atau R).
> >
> > ### 4. Definisi Formal (7-Tuple)
> >
> > Mesin Turing didefinisikan secara matematis oleh $M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)$:
> >
> > - $Q$: Himpunan berhingga state.
> >     
> > - $\Sigma$: Alfabet input (simbol yang boleh ada di input awal).
> >     
> > - $\Gamma$: Alfabet tape (simbol input ditambah simbol khusus seperti blank).
> >     
> > - $\delta$: Fungsi transisi ($Q \times \Gamma \rightarrow Q \times \Gamma \times \{L, R\}$).
> >     
> > - $q_0$: Start state.
> >     
> > - $B$: Simbol _Blank_ (penanda sel kosong pada tape).
> >     
> > - $F$: Himpunan final state (state penerima).
> >     
> >
> > ### 5. Instantaneous Description (ID)
> >
> > ID digunakan untuk menggambarkan konfigurasi mesin pada satu titik waktu. Notasinya adalah $\alpha_1 q \alpha_2$, di mana:
> >
> > - $q$: State saat ini.
> >     
> > - $\alpha_1$: Seluruh isi tape di sebelah kiri head.
> >     
> > - $\alpha_2$: Isi tape yang dimulai dari posisi head ke arah kanan hingga simbol non-blank terakhir.
> >     
> >
> > ### 6. Kriteria Penerimaan Bahasa
> >
> > Bahasa $L(M)$ adalah himpunan string $w$ yang menyebabkan Mesin Turing mencapai salah satu _final state_ ($p \in F$).
> >
> > - Jika input diterima, mesin berhenti (_halts_).
> >     
> > - Jika input tidak diterima, mesin bisa berhenti di state bukan final, atau yang paling krusial, mesin bisa terjebak dalam putaran tak terbatas (_infinite loop_).
> >     

> [!cornell] #### Summary
> 
> **Mesin Turing (MT)** adalah model komputasi paling kuat yang terdiri dari **pita tak terbatas (tape)**, **head** yang bisa baca-tulis-gerak, dan **unit kontrol**. Secara formal, MT bekerja berdasarkan **fungsi transisi 7-tuple** yang mengatur perubahan simbol dan pergerakan head. Konfigurasi mesin dicatat dalam **Instantaneous Description (ID)**, dan sebuah bahasa diterima jika mesin berhasil mencapai **final state**, meskipun ada risiko mesin tidak pernah berhenti jika input ditolak.

> [!ad-libitum]- Additional Information
> 
> #### Penjelasan Teknis: Pergerakan Head pada ID
> 
> Perubahan ID saat transisi sangat spesifik:
> 
> 1. **Gerak Kanan (R):** Jika $\delta(q, X_i) = (p, Y, R)$, maka $X_1 \dots X_{i-1} q X_i \dots X_n \vdash X_1 \dots X_{i-1} Y p X_{i+1} \dots X_n$. Simbol $Y$ menggantikan $X_i$, dan state $p$ berpindah ke kanan $Y$.
>     
> 2. **Gerak Kiri (L):** Jika $\delta(q, X_i) = (p, Y, L)$, maka $X_1 \dots X_{i-1} q X_i \dots X_n \vdash X_1 \dots X_{i-2} p X_{i-1} Y X_{i+1} \dots X_n$. Head mundur satu langkah sehingga $X_{i-1}$ sekarang berada di bawah pantauan head dalam state $p$.
>     
> 
> #### Simbol Blank (B)
> 
> Simbol Blank bukan merupakan bagian dari alfabet input ($\Sigma$), tetapi merupakan bagian dari alfabet tape ($\Gamma$). Blank merepresentasikan sel yang belum pernah ditulisi atau sel yang isinya telah dihapus. Secara teoritis, seluruh tape diisi oleh $B$ kecuali sel yang berisi string input.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 14_2025 IF 2124 ITB (Hal 1-11).
>     
> - Alan Turing (1936) - "On Computable Numbers, with an Application to the Entscheidungsproblem".
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan mendasar antara memori pada PDA dan Mesin Turing?</strong></summary>
> 
> PDA menggunakan Stack (LIFO) yang hanya bisa diakses di puncak, sedangkan Mesin Turing menggunakan Tape tak terbatas yang bisa dibaca dan ditulis di posisi mana pun dengan menggerakkan head ke kiri atau kanan.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Sebutkan aksi apa saja yang terjadi dalam satu langkah fungsi transisi MT!</strong></summary>
> 
> Mengubah state, menulis simbol baru ke sel tape, dan menggerakkan head ke kiri atau ke kanan satu sel.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa yang dimaksud dengan simbol Blank (B) dalam definisi formal MT?</strong></summary>
> 
> Simbol khusus dalam alfabet tape ($\Gamma$) yang menandakan bahwa suatu sel tidak berisi data input atau informasi komputasi.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Dalam notasi ID $X_1 q X_2$, di mana posisi head berada?</strong></summary>
> 
> Head berada tepat di atas simbol pertama dari rangkaian simbol $X_2$.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa risiko yang muncul jika Mesin Turing diberikan input yang tidak termasuk dalam bahasanya?</strong></summary>
> 
> Mesin Turing mungkin berhenti (halt) di state yang bukan final state, atau mesin bisa terus berjalan selamanya (infinite loop) tanpa pernah memberikan jawaban.
> 
> </details>