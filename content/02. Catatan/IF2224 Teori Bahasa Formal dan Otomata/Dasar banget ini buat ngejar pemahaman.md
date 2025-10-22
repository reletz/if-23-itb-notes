_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

### 1. Konsep Dasar Finite Automata (FA)

(a) Perbedaan DFA/NFA:

Jelaskan perbedaan utama antara fungsi transisi ($\delta$) pada DFA dan NFA!

DFA -> Transisi ke satu state
NFA -> Transisi bisa lebih dari satu state

(b) Tracing DFA:

Diberikan DFA berikut ($\Sigma=\{0,1\}$, $q_0=A$, $F=\{C\}$):

| State | 0 | 1 |
| :---: |:-:|:-:|
| $\to A$ | B | A |
| B | B | C |
| $* C$ | B | A |

Tentukan state akhir setelah DFA membaca string `10110`! Apakah string tersebut diterima?

$\delta{(A, 1)} = A$
$\delta{(A, 0)} = B$
$\delta{(B, 1)} = C$
$\delta{(C, 1)} = A$
$\delta{(A, 0)} = B$

Bukan di final state -> Ditolak

(c) Epsilon Closure:

Diberikan $\epsilon$-NFA berikut:

- $Q = \{q_0, q_1, q_2\}$  
    
- $\Sigma = \{a, b\}$  
    
- $q_0$ = Start State
    
- $F = \{q_2\}$  
    
- Transisi $\delta$:
    
    - $\delta(q_0, \epsilon) = \{q_1\}$  
        
    - $\delta(q_1, a) = \{q_1\}$  
        
    - $\delta(q_1, b) = \{q_2\}$  
        
    - $\delta(q_2, \epsilon) = \{q_0\}$  
        

Hitunglah $\text{ECLOSE}(q_0)$ dan $\text{ECLOSE}(q_2)$!

> Cara cari ECLOSE: Masukin yang diminta ke himpunannnya. Liat ada transisi ke epsilon atau engga. Kalau ada, masukin next statenya

1. 
$ECLOSE = \{q_0\}$
$ECLOSE = \{q_0, q_1\}$

2. 
$ECLOSE = \{q_2\}$
$ECLOSE = \{q_2, q_0\}$
$ECLOSE = \{q_2, q_0, q_1\}$

### 2. Ekuivalensi & Regular Expression (RE)

(a) Subset Construction: 

Jelaskan ide utama di balik algoritma Subset Construction untuk mengubah NFA menjadi DFA! State baru di DFA merepresentasikan apa?

> Subset Construction bertujuan untuk menghilangkan nondeterminisme di NFA. Satu state di DFA baru akan melambangkan himpunan state lama di NFA.

(b) Regular Expression:

Tuliskan Regular Expression (RE) untuk bahasa $L$ pada $\Sigma=\{a,b\}$ yang terdiri dari semua string yang:

- Dimulai dengan 'a'.
    
- Diikuti oleh nol atau lebih 'b'.
    
- Diakhiri dengan 'a'.
    

Contoh string diterima: aa, aba, abba, abbba.
Contoh string ditolak: a, b, ba, baa.

> ab*a

### 3. Properties Bahasa Reguler

(a) Pumping Lemma:

Apa tujuan utama dari Pumping Lemma? Sebutkan 3 kondisi yang harus dipenuhi oleh pemecahan string $w=xyz$ dalam Pumping Lemma!

Jawaban:

> Bertujuan utama menunjukkan bahwa sebuah bahasa BUKAN bahasa reguler.
> 3 Kondisi:
> 1. |xy| < n
> 2. |y| > 0
> 3. Untuk setiap $i > 0$, berlaku $xy^iz \in L$ 

Untuk membuktikan bahasa $L = \{ a^k b^{2k} \mid k \ge 0 \}$ bukan reguler menggunakan Pumping Lemma, string $w$ mana yang paling strategis untuk dipilih (dengan $n$ adalah pumping length)?

(i) $a^n b^n$
(ii) $a^n b^{2n}$
(iii) $(ab)^{2n}$
(iv) $b^{2n} a^n$

> (ii). Ini bentuk umum string di L. Kalau kita pecah ke x, y, dan z, kan xy < n, berarti xy tuh pasti kumpulan string a. Kita definisikan $x = a^j,  y = a^k, z = a^{n-j-k}b^{2n}$
> Misalkan kita pilih $i=0$:
> Artinya tercipta string baru $w = xz = a^ja^{n-j-k}b^{2n} = a^{n-k}b^{2n}$
> Padahal, $2(n-k) \neq 2n$. Maka kontradiksi terjadi. L bukan bahasa reguler.


(b) Closure Properties:

Jika $L_1$ adalah bahasa reguler (diterima oleh DFA $M_1$) dan $L_2$ adalah bahasa reguler (diterima oleh DFA $M_2$), apakah bahasa $L = L_1 \cup L_2$ (gabungan $L_1$ dan $L_2$) juga dijamin reguler? Jelaskan secara singkat mengapa!

Jawaban:

> Ya, dijamin reguler. Karena jika $L_1$ punya RE $R_1$ dan $L_2$ punya RE $R_2$, maka $L_1 \cup L_2$ memiliki RE $R_1 + R_2$, yang juga merupakan RE valid. 

Diketahui $L_1 = \{ \text{string biner dengan jumlah 0 genap} \}$ dan $L_2 = \{ \text{string biner dengan jumlah 1 ganjil} \}$. Keduanya adalah bahasa reguler. Apakah bahasa $L_3 = L_1 \cap L_2$ (string dengan jumlah 0 genap DAN jumlah 1 ganjil) juga reguler? Mengapa?

> Ya, $L_3$ reguler. Karena kelas bahasa reguler tertutup (closed) terhadap operasi irisan (intersection).

(c) Minimasi DFA:

Apa tujuan dari minimasi DFA? Kriteria dasar apa yang digunakan oleh Algoritma Table-Filling untuk menandai pasangan state yang distinguishable (dapat dibedakan) pada langkah awalnya?

Jawaban:

> - **Tujuan:** Mendapatkan DFA dengan jumlah state _paling sedikit_ yang menerima bahasa yang sama (efisien dan representasi standar).
> - **Kriteria Dasar (Basis):** Menandai semua pasangan state $\{p, q\}$ di mana **salah satunya adalah final state dan yang lainnya bukan final state**. Pasangan ini jelas dapat dibedakan oleh string kosong ($\epsilon$).
    
    
Perhatikan DFA berikut:

- $Q = \{A, B, C\}$, $q_0 = A$, $F=\{C\}$  
    
- $\delta(A, 0) = B$, $\delta(A, 1) = A$  
    
- $\delta(B, 0) = C$, $\delta(B, 1) = B$  
    
- $\delta(C, 0) = C$, $\delta(C, 1) = C$  
    

Gunakan Algoritma Table-Filling untuk menentukan state yang indistinguishable:

1. Identifikasi state Final (F) dan Non-Final (N).
    
2. Langkah Basis: Pasangan mana saja yang langsung ditandai (distinguishable) karena merupakan pasangan (F, N)?
    
3. Langkah Induksi: Periksa pasangan (A, B). Apakah $\delta(A,0)$ dan $\delta(B,0)$ mengarah ke pasangan yang sudah ditandai di langkah 2? Jika ya, tandai (A, B).
    
4. Kesimpulan: Pasangan state mana yang tersisa (tidak ditandai) sebagai indistinguishable?

> 1. F = {C}, N = {A, B}
> 2. (A, C) dan (B, C)
> 3. (A, B)
> 4. Tidak ada
    

### 4. Context-Free Grammar (CFG) & Parse Tree

(a) Definisi CFG:

Sebuah CFG didefinisikan sebagai $G = (V, T, P, S)$. Jelaskan secara singkat apa arti dari masing-masing komponen $V, T, P, S$!

> - V = Variabel (Simbol non-terminal)
> - T = Terminal (Simbol dasar)
> - P = Production Rule (Cara ubah suatu Variabel jadi Variabel/Terminal)
> - S = Simbol Awal (Tempat mulai derivasi)

(b) Derivasi:

Diberikan CFG berikut:

- $V = \{S, A\}$      
- $T = \{0, 1\}$  
- $P = \{ S \to 0A1, A \to 1A | \epsilon \}$  
- $S = S$  
    

Lakukan _leftmost derivation_ untuk menghasilkan string `011`!

> Mulai dari S
> S -> 0A1
> Pilih variabel paling kiri, A (dengan production rule A -> 1A)
> S -> 01A1
> Ambil lagi variabel paling kiri (dengan production rule A -> $\epsilon$)
> S -> 01 $\epsilon$ 1 = 011 

(c) Parse Tree:

Gambarkan Parse Tree yang sesuai dengan derivasi yang kamu lakukan di soal (b)!
```
	 S
/  |  \
0  A   1
   | \
   1  A
      |
      e
```

(d) Rekursif Kiri:

Apa masalah yang disebabkan oleh aturan produksi rekursif kiri (contoh: $E \to E + T$) pada metode parsing top-down?

> Menyebabkan parser masuk ke dalam **loop tak terbatas (infinite loop)**. Parser akan terus mencoba mengekspansi variabel yang sama (misal 'E') tanpa pernah membaca input, karena pilihan pertama ekspansinya adalah memanggil dirinya sendiri lagi.
> 
> **Cara Memperbaiki Rekursif Kiri (Contoh):** Aturan rekursif kiri umumnya berbentuk: $A \to A\alpha \mid \beta$ (di mana $\alpha$ adalah bagian rekursif, dan $\beta$ adalah bagian non-rekursif yang tidak dimulai dengan A).
> Cara memperbaikinya adalah dengan mengubah aturan menjadi: 
> - $A \to \beta A'$ 
> - $A' \to \alpha A' \mid \epsilon$ (di mana $A'$ adalah variabel baru).
>  
> **Contoh Penerapan:** Misalkan aturan asli: $E \to E + T \mid T$
> - Identifikasi: $A=E$, $\alpha = + T$, $\beta = T$.
> - Terapkan transformasi:
> 	- $E \to T E'$
> 	- $E' \to + T E' \mid \epsilon$ 
> 
>  Aturan baru ini menghasilkan bahasa yang sama tetapi tidak lagi rekursif kiri, sehingga aman untuk parser top-down.

(e) Ambiguitas: 

Apa yang dimaksud dengan **ambiguitas** dalam Context-Free Grammar? Berikan contoh CFG yang ambigu dan tunjukkan ambiguitasnya untuk sebuah string!

> **Definisi:** Sebuah CFG disebut ambigu jika terdapat **setidaknya satu string** dalam bahasanya yang memiliki **lebih dari satu leftmost derivation** ATAU **lebih dari satu rightmost derivation** ATAU **lebih dari satu parse tree**. Ini berarti struktur sintaksis string tersebut bisa diinterpretasikan dengan cara yang berbeda.
> 
> **Contoh Grammar Ambigu (Ekspresi Aritmatika Sederhana):**
>  $E \to E + E \mid E * E \mid \textbf{id}$
> 
> **String:** `id + id * id`
> 
> **Ambiguitas (Dua Leftmost Derivations):**
> 
> 1. **Derivasi 1 (Penjumlahan dulu):** $E \Rightarrow_{lm} E + E$ $\Rightarrow_{lm} \textbf{id} + E$ $\Rightarrow_{lm} \textbf{id} + E * E$ $\Rightarrow_{lm} \textbf{id} + \textbf{id} * E$ $\Rightarrow_{lm} \textbf{id} + \textbf{id} * \textbf{id}$ _(Interpretasi: (id + id) * id)_
> 2. **Derivasi 2 (Perkalian dulu):** $E \Rightarrow_{lm} E * E$ $\Rightarrow_{lm} E + E * E$ $\Rightarrow_{lm} \textbf{id} + E * E$ $\Rightarrow_{lm} \textbf{id} + \textbf{id} * E$ $\Rightarrow_{lm} \textbf{id} + \textbf{id} * \textbf{id}$ _(Interpretasi: id + (id * id))_
> 
> Karena ada dua leftmost derivation yang berbeda untuk string yang sama, grammar ini ambigu.
>
> - **Cara Memperbaiki Ambiguitas (Menegakkan Precedence & Associativity):** Ambiguitas pada grammar ekspresi biasanya diatasi dengan memperkenalkan level variabel yang berbeda untuk setiap tingkat **precedence** (prioritas operator) dan menggunakan rekursi untuk **associativity** (arah pengelompokan).
> 
> - **Grammar Tidak Ambigu (Perbaikan):**
> 	1. $E \to E + T \mid T$ (_Expression_: penjumlahan, precedence terendah, left-associative)
> 	2. $T \to T * F \mid F$ (_Term_: perkalian, precedence lebih tinggi, left-associative)
> 	3. $F \to (E) \mid \textbf{id}$ (_Factor_: unit dasar - identifier atau ekspresi dalam kurung, precedence tertinggi)
> - Dengan grammar ini, string `id + id * id` hanya akan memiliki _satu_ parse tree yang valid, yang secara paksa mengelompokkan perkalian terlebih dahulu: `id + (id * id)`, sesuai aturan precedence matematika standar.

### 5. Konsep Dasar Compiler

(a) Fase Compiler:

Sebutkan tiga fase frontend dalam sebuah compiler! Apa input dan output dari masing-masing fase tersebut?

> 1. **Analisis Leksikal (Lexical Analysis / Scanning):**
>    - **Input:** Urutan karakter kode sumber.        
>    - **Output:** Urutan _token_ (unit leksikal bermakna).
>       
> 2. **Analisis Sintaksis (Syntax Analysis / Parsing):**
>    - **Input:** Urutan _token_ dari fase sebelumnya.
>    - **Output:** _Parse Tree_ (Pohon Sintaks) atau struktur data serupa yang merepresentasikan struktur gramatikal kode.
>   
> 3. **Analisis Semantik (Semantic Analysis):**
>    - **Input:** _Parse Tree_ dari fase Parsing
>    - **Output:** _Annotated Parse Tree_, Sinyal lolos/gagal 

(b) Scanner & Token:

Apa tugas utama Scanner (Lexical Analyzer)? Apa yang dimaksud dengan token? Berikan contoh token dari kode if (x > 10)!


> - **Tugas Scanner:** Membaca kode sumber karakter per karakter, mengelompokkannya menjadi unit leksikal (token), membuang whitespace dan komentar, dan melaporkan error leksikal. 
> - **Token:** Representasi abstrak dari satu unit leksikal, biasanya terdiri dari _tipe_ token (misal: KEYWORD, IDENTIFIER, NUMBER) dan kadang _nilai_ token (misal: nama identifier `x`, angka `10`).
> 	- **Contoh Token dari `if (x > 10)`:** `KEYWORD(if)`, `DELIMITER(()`, `IDENTIFIER(x)`, `OPERATOR(>)`, `NUMBER(10)`, `DELIMITER())`
    

(c) Parser & Grammar:

Apa tugas utama Parser (Syntax Analyzer)? Bagaimana hubungannya dengan Context-Free Grammar (CFG) dan Parse Tree?

> - **Tugas Parser:** Memeriksa apakah urutan token yang diterima dari scanner sesuai dengan aturan tata bahasa (grammar) dari bahasa pemrograman. Membangun representasi struktur sintaksis (biasanya Parse Tree). Melaporkan error sintaksis.
>   
> - **Hubungan:** Parser menggunakan **CFG** sebagai definisi formal dari tata bahasa. Ia mencoba untuk **membangun Parse Tree** untuk urutan token input berdasarkan aturan-aturan dalam CFG tersebut. Jika Parse Tree berhasil dibangun, berarti kode secara sintaksis valid.