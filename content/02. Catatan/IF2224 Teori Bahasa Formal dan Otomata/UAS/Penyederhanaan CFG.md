---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Properti CFL (Bagian 1: Penyederhanaan CFG)
> 
> > ## Questions/Cues
> >
> > - Definisi Useless
> >     
> > - Generating vs Reachable
> >     
> > - Urutan Eliminasi
> >     
> > - Nullable Symbols
> >     
> > - Unit Productions
> >     
> > - Unit Pairs
> >     
> >
> > ## Reference Points
> >
> > - Slide 13_2025: Hal 1 - 21
> >     
> 
> > ### 1. Pendahuluan Penyederhanaan CFG
> >
> > Penyederhanaan dilakukan untuk mempermudah analisis tata bahasa dan merupakan syarat mutlak sebelum mengubah CFG ke dalam bentuk normal (seperti CNF). Terdapat tiga hal utama yang harus dihilangkan: simbol yang tidak berguna (_useless symbols_), produksi kosong (_epsilon-productions_), dan produksi satuan (_unit productions_).
> >
> > ### 2. Eliminasi Useless Symbols
> >
> > Sebuah simbol $X$ dikatakan **berguna (useful)** jika ia muncul dalam setidaknya satu derivasi yang menghasilkan string terminal: $S \Rightarrow^* \alpha X \beta \Rightarrow^* w$. Jika tidak, maka simbol tersebut dianggap **useless**.
> >
> > **Kriteria Simbol Berguna:**
> >
> > 1. **Generating:** Simbol $X$ dapat menurunkan string terminal ($X \Rightarrow^* w$).
> >     
> > 2. **Reachable:** Simbol $X$ dapat dicapai dari simbol start ($S \Rightarrow^* \alpha X \beta$).
> >     
> >
> > **Algoritma Eliminasi (Urutan Sangat Penting):**
> >
> > - **Langkah 1:** Identifikasi semua simbol yang **Generating**. Hapus variabel dan produksi yang tidak bisa menghasilkan terminal.
> >     
> > - **Langkah 2:** Dari hasil langkah 1, identifikasi simbol yang Reachable. Hapus semua simbol yang tidak pernah muncul dalam penurunan dari $S$.
> >     
> >     Catatan: Jika urutan dibalik, simbol useless tertentu mungkin tidak terdeteksi.
> >     
> >
> > ### 3. Eliminasi Epsilon-Productions ($A \rightarrow \epsilon$)
> >
> > Tujuannya adalah menghapus produksi yang menghasilkan string kosong, kecuali jika bahasa tersebut memang mengandung $\epsilon$.
> >
> > **Langkah-langkah:**
> >
> > 1. **Cari Nullable Symbols:** Variabel $A$ disebut nullable jika $A \Rightarrow^* \epsilon$.
> >     
> > 2. **Ekspansi Produksi:** Untuk setiap produksi $A \rightarrow X_1 X_2 \dots X_k$, buat variasi produksi baru dengan menghapus kombinasi variabel yang nullable.
> >     
> > 3. **Hapus** $\epsilon$**:** Buang semua produksi asli yang berbentuk $A \rightarrow \epsilon$.
> >     
> >
> > ### 4. Eliminasi Unit Productions ($A \rightarrow B$)
> >
> > Produksi unit adalah produksi di mana satu variabel langsung menurunkan variabel lain tanpa terminal.
> >
> > **Langkah-langkah menggunakan Unit Pairs:**
> >
> > 1. **Cari Unit Pairs** $(A, B)$**:** Pasangan di mana $A \Rightarrow^* B$ hanya menggunakan produksi unit.
> >     
> > 2. **Konstruksi Produksi Baru:** Jika $(A, B)$ adalah unit pair dan $B \rightarrow \alpha$ adalah produksi non-unit, maka tambahkan $A \rightarrow \alpha$ ke dalam tata bahasa.
> >     
> > 3. **Hapus Unit:** Buang semua produksi asli yang berbentuk $A \rightarrow B$.
> >     

> [!cornell] #### Summary
> 
> Penyederhanaan CFG melibatkan eliminasi tiga elemen pengganggu: **Useless Symbols** (dengan mengecek sifat _generating_ lalu _reachable_), **Epsilon-Productions** (dengan mengidentifikasi simbol _nullable_ dan melakukan ekspansi), serta **Unit Productions** (dengan mencari _unit pairs_). Proses ini menjaga agar bahasa yang dihasilkan tetap sama (ekuivalen) namun dengan struktur tata bahasa yang lebih efisien dan siap untuk dikonversi ke Chomsky Normal Form.

> [!ad-libitum]- Additional Information
> 
> #### Algoritma Menemukan Generating Symbols
> 
> 1. **Basis:** Semua simbol terminal ($T$) adalah generating.
>     
> 2. **Induksi:** Jika ada produksi $A \rightarrow \alpha$ dan semua simbol di dalam $\alpha$ sudah terbukti generating, maka tambahkan variabel $A$ ke dalam set generating.
>     
> 3. **Saturasi:** Ulangi sampai tidak ada lagi variabel yang bisa ditambahkan.
>     
> 
> #### Algoritma Menemukan Reachable Symbols
> 
> 1. **Basis:** Simbol start ($S$) adalah reachable.
>     
> 2. **Induksi:** Jika variabel $A$ adalah reachable dan ada produksi $A \rightarrow \alpha$, maka semua simbol (variabel dan terminal) yang ada di dalam $\alpha$ adalah reachable.
>     
> 
> #### Teorema 7.9 (Correctness $\epsilon$-elimination)
> 
> Hasil eliminasi produksi $\epsilon$ menghasilkan bahasa $L(G_1) = L(G) \setminus \{\epsilon\}$. Artinya, jika string kosong tadinya ada di bahasa tersebut, ia akan hilang, namun semua string terminal lainnya tetap dapat diderivasi secara identik.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 13_2025 IF 2124 ITB (Hal 1-21).
>     
> - Hopcroft, Motwani, & Ullman: _Introduction to Automata Theory_.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa urutan eliminasi Useless Symbols harus 'Generating' dulu baru 'Reachable'?</strong></summary>
> 
> Karena penghapusan simbol non-generating bisa menyebabkan simbol yang tadinya reachable menjadi tidak reachable. Jika dibalik, simbol non-generating yang tertinggal bisa tetap dianggap reachable padahal produksinya sudah tidak berguna.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Kapan sebuah variabel disebut 'Nullable'?</strong></summary>
> 
> Ketika variabel tersebut dapat menurunkan string kosong ($\epsilon$) baik secara langsung ($A \rightarrow \epsilon$) atau melalui serangkaian langkah derivasi.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa yang dimaksud dengan Unit Pair (A, B)?</strong></summary>
> 
> Kondisi di mana variabel A dapat menurunkan variabel B hanya dengan menggunakan satu atau lebih langkah produksi unit (seperti $A \rightarrow C$ dan $C \rightarrow B$).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Jika ada produksi $S \rightarrow AB$ dan A adalah nullable, produksi apa yang muncul setelah eliminasi $\epsilon$?</strong></summary>
> 
> Muncul produksi baru $S \rightarrow B$ (sebagai hasil dari $S \rightarrow AB$ dengan A dihapus). Produksi asli $S \rightarrow AB$ tetap dipertahankan.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa perbedaan antara simbol yang tidak generating dan simbol yang tidak reachable?</strong></summary>
> 
> Simbol tidak generating tidak bisa berakhir menjadi terminal (macet di variabel), sedangkan simbol tidak reachable tidak pernah bisa diakses mulai dari simbol awal S (terisolasi).
> 
> </details>