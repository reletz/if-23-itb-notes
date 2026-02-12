_Back to_ [[Soal Latihan UAS TBFO]]
# Problem Set: Context-Free Grammar & Parse Tree

**Mata Kuliah:** Teori Bahasa Formal dan Otomata

**Topik:** CFG, Derivasi, Parse Tree, dan Ekuivalensi

**Estimasi Waktu:** 90 Menit

**Total Soal:** 30 Soal

## Petunjuk Pengerjaan

1. Soal di bawah ini adalah **Pilihan Ganda Majemuk**.
    
2. Setiap pertanyaan mungkin memiliki **lebih dari satu jawaban yang benar**.
    
3. Pilihlah **SEMUA** opsi yang Anda anggap benar sesuai dengan materi yang telah dipelajari.
    

## BAGIAN I: Definisi Fundamental & Komponen (CFG)

**Fokus:** Pemahaman definisi formal 4-tuple, komponen grammar, dan konsep dasar derivasi.

1. Sebuah Context-Free Grammar (CFG) didefinisikan secara formal sebagai tupel $G = (V, T, P, S)$. Manakah pernyataan berikut yang BENAR mengenai komponen-komponen tersebut?

- [ ] a. $V$ adalah himpunan simbol terminal yang tidak bisa dipecah lagi.

- [x] b. $T$ dan $V$ tidak boleh memiliki irisan ($V \cap T = \emptyset$).

- [x] c. $P$ berisi aturan produksi dengan format $A \to \alpha$, di mana $A \in V$.

- [ ] d. $S$ adalah anggota dari himpunan $T$ (Terminal).

- [x] e. $S$ adalah simbol awal yang merupakan anggota dari $V$.

2. Mengenai simbol Terminal ($T$) dan Variabel ($V$), manakah karakteristik yang tepat?

- [x] a. Variabel sering dianalogikan sebagai kategori sintaksis seperti (Subject) atau (Verb).

- [x] b. Terminal adalah elemen dasar pembentuk string akhir (seperti if, else, 0, 1).

- [x] c. Variabel dapat digantikan oleh string kosong ($\epsilon$).

- [ ] d. Terminal dapat muncul di sisi kiri tanda panah ($\to$) pada aturan produksi CFG standar.

- [ ] e. Variabel hanya boleh muncul di sisi kanan aturan produksi.

3. Tinjau aturan produksi berikut: $A \to 0B1$. Apa makna dari aturan ini?

- [x] a. Variabel $A$ dapat digantikan oleh string "0B1".

- [ ] b. String "0B1" pasti adalah string akhir (terminal).

- [x] c. Simbol '0' dan '1' adalah terminal, sedangkan $B$ adalah variabel.

- [ ] d. Aturan ini bersifat rekursif secara langsung.

- [ ] e. $A$ menghasilkan string yang panjangnya minimal 3 simbol (jika $B$ tidak kosong).

4. Apa yang dimaksud dengan Derivasi dalam konteks CFG?

- [ ] a. Proses pembentukan Parse Tree dari bawah ke atas (Bottom-up).

- [x] b. Proses sekuensial mengubah Start Symbol menjadi string terminal menggunakan aturan produksi.

- [ ] c. Himpunan semua string yang bisa dihasilkan oleh grammar.

- [x] d. Penerapan aturan produksi untuk mengganti variabel dengan body produksinya.

- [ ] e. Proses yang selalu menghasilkan string biner.

5. Manakah pernyataan yang BENAR mengenai notasi derivasi?

- [x] a. $\Rightarrow$ dibaca "menghasilkan dalam satu langkah".

- [x] b. $\Rightarrow^*$ dibaca "menghasilkan dalam nol atau lebih langkah".

- [x] c. Jika $A \to \alpha$, maka kita bisa menulis $A \Rightarrow^* \alpha$.

- [ ] d. Notasi $\Rightarrow$ hanya digunakan untuk derivasi terkiri (leftmost).

- [x] e. $S \Rightarrow^* S$ adalah pernyataan yang valid (nol langkah).

6. Apa definisi dari Bahasa yang dihasilkan oleh grammar, $L(G)$?

- [ ] a. Himpunan semua sentential form yang mungkin muncul.

- [x] b. Himpunan semua string terminal $w$ di mana $S \Rightarrow^* w$.

- [ ] c. Himpunan variabel yang bisa dicapai dari $S$.

- [ ] d. Semua string yang mengandung setidaknya satu variabel.

- [x] e. Himpunan string yang valid menurut aturan produksi grammar $G$.

7. Mengenai "Sentential Form", manakah pernyataan yang valid?

- [x] a. Semua string di dalam $L(G)$ adalah sentential form.

- [x] b. Sentential form bisa terdiri dari campuran variabel dan terminal.

- [ ] c. Sentential form hanya boleh berisi terminal saja.

- [x] d. Start symbol $S$ adalah sebuah sentential form.

- [x] e. Sentential form adalah hasil derivasi parsial dari $S$.

8. Dalam Hirarki Chomsky, posisi CFG adalah:

- [ ] a. Tipe-3 (Regular Grammar).

- [x] b. Tipe-2 (Context-Free Grammar).

- [x] c. Lebih kuat daripada Finite Automata.

- [ ] d. Lebih lemah daripada Regular Expression.

- [ ] e. Setara dengan Pushdown Automata (PDA).

9. Notasi BNF (Backus-Naur Form) sering digunakan untuk menulis CFG. Karakteristiknya adalah:

- [x] a. Menggunakan tanda ::= sebagai pengganti ->.

- [x] b. Variabel biasanya diapit kurung sudut <...>.

- [x] c. Simbol | digunakan untuk menyatakan pilihan (OR).

- [ ] d. Tidak bisa merepresentasikan grammar rekursif.

- [ ] e. Identik secara kekuatan ekspresif dengan CFG standar.

10. Sebuah grammar dikatakan AMBIGU jika:

- [x] a. Terdapat sebuah string $w$ yang memiliki lebih dari satu Leftmost Derivation.

- [x] b. Terdapat sebuah string $w$ yang memiliki lebih dari satu Parse Tree yang berbeda.

- [ ] c. Terdapat sebuah string $w$ yang memiliki Leftmost dan Rightmost derivation yang berbeda urutannya (namun pohonnya sama).

- [ ] d. Grammar tersebut memiliki aturan produksi rekursif.

- [x] e. Satu string dapat diinterpretasikan dengan struktur sintaksis yang berbeda.

## BAGIAN II: Struktur Parse Tree & Penelusuran

**Fokus:** Aturan pembentukan pohon, hubungan dengan derivasi, dan tracing visual.

11. Syarat valid sebuah Parse Tree untuk CFG $G=(V, T, P, S)$ adalah:

- [x] a. Akar (Root) harus dilabeli dengan simbol awal $S$.

- [ ] b. Setiap simpul internal (interior node) harus dilabeli dengan Terminal.

- [x] c. Setiap simpul internal harus dilabeli dengan Variabel.

- [x] d. Daun (Leaf) boleh dilabeli dengan Variabel, Terminal, atau $\epsilon$.

- [x] e. Setiap simpul internal dan anak-anaknya harus merepresentasikan satu aturan produksi di $P$.

12. Mengenai "Yield" dari sebuah Parse Tree:

- [x] a. Yield adalah string yang dibentuk dengan membaca daun dari kiri ke kanan.

- [x] b. Yield dari Parse Tree yang lengkap hanya berisi simbol terminal.

- [ ] c. Yield merepresentasikan string input yang sedang dianalisis.

- [ ] d. Yield adalah tinggi dari pohon penurunan.

- [ ] e. Yield harus selalu sama dengan Start Symbol.

13. Jika sebuah daun (leaf) pada Parse Tree dilabeli dengan $\epsilon$ (epsilon), maka:

- [x] a. Daun tersebut merepresentasikan string kosong.

- [ ] b. Simpul tersebut harus menjadi satu-satunya anak dari induknya.

- [ ] c. Pohon tersebut tidak valid.

- [x] d. Aturan produksi yang digunakan berbentuk $A \to \epsilon$.

- [ ] e. Induk dari simpul tersebut haruslah Start Symbol.

14. Perbedaan antara Leftmost Derivation ($\Rightarrow_{lm}$) dan Rightmost Derivation ($\Rightarrow_{rm}$) adalah:

- [x] a. Leftmost selalu mengganti variabel paling kiri di setiap langkah.

- [x] b. Rightmost selalu mengganti variabel paling kanan di setiap langkah.

- [ ] c. Hasil string akhir (yield) pasti berbeda antara Leftmost dan Rightmost.

- [x] d. Keduanya menghasilkan Parse Tree yang sama untuk struktur sintaksis yang sama.

- [ ] e. Rightmost derivation membaca string dari kanan ke kiri.

15. Diberikan Grammar: $S \to AB$, $A \to aA | a$, $B \to b$. Manakah langkah derivasi yang valid untuk string "aab"?

- [x] a. $S \Rightarrow AB \Rightarrow aAB \Rightarrow aaB \Rightarrow aab$

- [x] b. $S \Rightarrow AB \Rightarrow Ab \Rightarrow aAb \Rightarrow aab$

- [ ] c. $S \Rightarrow AB \Rightarrow Ab \Rightarrow ab$

- [x] d. Langkah (b) adalah contoh Rightmost Derivation.

- [x] e. Langkah (a) adalah contoh Leftmost Derivation.

16. Mengapa Parse Tree penting dalam desain kompilator?

- [x] a. Membantu visualisasi struktur hierarki kode.

- [x] b. Digunakan untuk mendeteksi ambiguitas sintaksis.

- [x] c. Menjadi dasar pembentukan Abstract Syntax Tree (AST).

- [ ] d. Menjamin program bebas dari error logika.

- [x] e. Menunjukkan presedensi operator (misal perkalian vs penjumlahan).

17. Concrete Syntax Tree (CST) berbeda dengan Abstract Syntax Tree (AST) dalam hal:

- [x] a. CST menampilkan semua detail sintaksis termasuk tanda baca/kurung.

- [x] b. AST lebih ringkas dan hanya menyimpan informasi struktural esensial.

- [ ] c. AST dibuat sebelum CST dalam proses kompilasi.

- [ ] d. CST digunakan untuk analisis semantik, sedangkan AST untuk parsing.

- [x] e. AST sering menghilangkan node yang tidak perlu seperti variabel perantara tunggal.

18. Perhatikan grammar ekspresi: $E \to E + E | E * E | id$. Mengapa grammar ini disebut ambigu?

- [x] a. String id + id * id bisa memiliki dua pohon berbeda.

- [x] b. Tidak jelas apakah + atau * yang harus dieksekusi duluan.

- [ ] c. Terdapat rekursi kiri ($E \to e...$).

- [x] d. Satu string bisa memiliki interpretasi (id+id)\*id atau id+(id\*id).

- [ ] e. Karena menggunakan simbol id.

19. Jika sebuah Parse Tree memiliki tinggi (height) $n$, maka:

- [ ] a. Derivasi yang menghasilkannya memiliki panjang minimal $n$.

- [ ] b. Simpul akar berada pada kedalaman 0 atau 1.

- [ ] c. Waktu parsing selalu linear terhadap $n$.

- [x] d. Ada jalur terpanjang dari akar ke daun sepanjang $n$.

- [ ] e. Yield-nya pasti memiliki panjang $2^n$.

20. Dalam visualisasi Parse Tree, hubungan "Parent-Child" merepresentasikan:

- [x] a. Sisi kiri (LHS) produksi adalah Parent.

- [x] b. Sisi kanan (RHS) produksi adalah urutan Children.

- [ ] c. Hubungan presedensi operator.

- [ ] d. Urutan eksekusi program dari atas ke bawah.

- [x] e. Derivasi satu langkah ($\Rightarrow$).

## BAGIAN III: Ekuivalensi & Teorema

**Fokus:** Hubungan matematis antara Derivasi, Parse Tree, dan Inferensi Rekursif.

21. Empat representasi yang dinyatakan EKUIVALEN untuk keanggotaan string dalam CFL adalah:

- [x] a. Inferensi Rekursif.

- [x] b. Parse Tree.

- [x] c. Leftmost Derivation.

- [x] d. Rightmost Derivation.

- [ ] e. Deterministic Finite Automata (DFA).

22. Teorema "Dari Parse Tree ke Leftmost Derivation" menyatakan bahwa:

- [x] a. Jika ada Parse Tree dengan akar $A$ dan yield $w$, pasti ada Leftmost Derivation $A \Rightarrow^*_{lm} w$.

- [x] b. Konversi dilakukan dengan melakukan traversal Pre-order pada pohon.

- [x] c. Setiap sub-pohon dapat dikonversi menjadi sub-derivasi secara independen.

- [ ] d. Hanya berlaku untuk grammar yang tidak ambigu.

- [x] e. Proses ini membuktikan bahwa pohon dan derivasi adalah representasi yang setara.

23. Apa yang dimaksud dengan sifat "Context-Free" (Bebas Konteks) dalam pembuktian ekuivalensi ini?

- [x] a. Aturan produksi $A \to \alpha$ dapat diterapkan pada variabel $A$ di mana pun ia muncul.

- [x] b. Penerapan aturan tidak bergantung pada simbol-simbol di sekitar $A$ (konteks).

- [x] c. Sub-pohon untuk variabel $A$ dapat dibangun secara independen.

- [x] d. Sub-derivasi untuk $A$ dapat disubstitusikan ke dalam derivasi yang lebih besar.

- [ ] e. Grammar tidak memiliki variabel yang berulang.

24. Inferensi Rekursif adalah cara pandang:

- [x] a. Bottom-up: Membuktikan string dari terminal menuju variabel.

- [ ] b. Top-down: Membuktikan dari Start Symbol menuju terminal.

- [ ] c. Membangun bukti keanggotaan berdasarkan panjang string atau langkah.

- [x] d. Setara dengan membangun Parse Tree dari daun menuju akar.

- [ ] e. Metode yang tidak valid untuk CFG.

25. Jika kita memiliki derivasi $S \Rightarrow AB \Rightarrow aB \Rightarrow ab$, manakah pernyataan yang benar terkait ekuivalensinya?

- [x] a. Pasti ada Parse Tree dengan yield "ab".

- [x] b. Pasti ada Inferensi Rekursif yang membuktikan "ab" ada di bahasa $S$.

- [x] c. "ab" adalah anggota dari $L(G)$.

- [x] d. Derivasi tersebut adalah Leftmost Derivation.

- [x] e. Parse Tree-nya akan memiliki akar $S$, anak $A$ dan $B$.

21. Dalam pembuktian ekuivalensi, kita sering menggunakan Induksi Matematika. Induksi pada "Tinggi Pohon" biasanya digunakan untuk membuktikan:

- [x] a. Konversi dari Parse Tree ke Derivasi.

- [ ] b. Konversi dari Derivasi ke Parse Tree (biasanya induksi panjang langkah).

- [ ] c. Bahwa bahasa tersebut Finite.

- [x] d. Bahwa setiap variabel memiliki sub-pohon yang valid.

- [ ] e. Validitas algoritma parsing.

27. Hubungan antara Parser dan Teorema Ekuivalensi adalah:

- [x] a. Parser Top-Down mencoba membangun Leftmost Derivation.

- [x] b. Parser Bottom-Up mencoba membangun Rightmost Derivation secara terbalik (reverse).

- [x] c. Jika parser gagal membangun Parse Tree, berarti string tidak valid (syntax error).

- [x] d. Parser membuktikan keberadaan salah satu dari 4 representasi ekuivalen tersebut.

- [ ] e. Parser hanya bekerja pada grammar Regular.

28. Jika diketahui sebuah string $w$ memiliki Leftmost Derivation, maka secara otomatis:

- [x] a. String $w$ memiliki Rightmost Derivation.

- [x] b. String $w$ memiliki Parse Tree.

- [ ] c. Grammar tersebut pasti ambigu.

- [x] d. String $w$ valid dalam bahasa tersebut.

- [x] e. Panjang derivasi Leftmost sama dengan panjang derivasi Rightmost (jumlah langkah).

29. Sebuah "Left-Sentential Form" adalah:

- [x] a. Sentential form yang muncul dalam proses Leftmost Derivation.

- [x] b. String yang mungkin masih mengandung variabel.

- [ ] c. String yang variabelnya (jika ada) selalu berada di posisi paling kanan.

- [x] d. String yang variabelnya (jika ada) selalu berada di posisi paling kiri relatif terhadap variabel lain yang belum diekspansi.

- [ ] e. String yang hanya terdiri dari terminal.

30. Mengapa kita perlu membuktikan bahwa semua representasi ini ekuivalen?

- [x] a. Untuk menjamin bahwa cara kita mendefinisikan bahasa (grammar) konsisten dengan cara kita memvisualisasikannya (pohon).

- [x] b. Agar kita bebas menggunakan metode mana pun yang paling mudah untuk membuktikan keanggotaan string.

- [x] c. Karena parser komputer bekerja dengan cara yang berbeda-beda (ada yang pakai pohon, ada yang pakai derivasi).

- [ ] d. Untuk membuktikan bahwa CFG lebih kuat dari Regular Grammar.

- [x] e. Untuk memastikan bahwa ambiguitas tidak mempengaruhi keanggotaan string dalam bahasa (hanya mempengaruhi strukturnya).

## Kunci Jawaban Singkat

1. **b, c, e** ($T$ terminal, $V \cap T = \emptyset$, $S \in V$)
    
2. **a, b, c** ($V$ kategori, $T$ dasar, $V \to \epsilon$)
    
3. **a, c** ($A \to$ string campuran, $0,1$ terminal)
    
4. **b, d** (Proses sekuensial, penerapan aturan)
    
5. **a, b, c, e** (Semua definisi notasi benar)
    
6. **b, e** (String terminal hasil derivasi)
    
7. **a, b, d, e** (Termasuk $S$, campuran, hasil derivasi)
    
8. **b, c, e** (Tipe-2, >FA, =PDA)
    
9. **a, b, c** (`::=`, `<>`, `|`)
    
10. **a, b, e** (Multi LM, Multi Tree, Multi Interpretasi)
    
11. **a, c, d, e** (Root S, Interior V, Leaf V/T/$\epsilon$, sesuai P)
    
12. **a, b** (Baca daun kiri-kanan)
    
13. **a, b, d** (String kosong, anak tunggal, $A \to \epsilon$)
    
14. **a, b, d** (Strategi ganti variabel, pohon sama)
    
15. **a, b, d, e** (Langkah valid, itu LM dan juga bisa dianggap RM karena urutan)
    
16. **a, b, c, e** (Visualisasi, dasar AST, presedensi)
    
17. **a, b, e** (CST detail, AST ringkas/semantik)
    
18. **a, b, d** (Pohon ganda, interpretasi ganda)
    
19. **d** (Jalur terpanjang = tinggi)
    
20. **a, b, e** (LHS Parent, RHS Children, Derivasi 1 langkah)
    
21. **a, b, c, d** (Semua kecuali DFA)
    
22. **a, b, c, e** (Eksistensi, Pre-order, Independensi, Setara)
    
23. **a, b, c, d** (Definisi bebas konteks)
    
24. **a, d** (Bottom-up, dari terminal/daun)
    
25. **a, b, c, d, e** (Semua benar karena ekuivalensi)
    
26. **a, d** (Induksi tinggi untuk Tree $\to$ Derivasi)
    
27. **a, b, c, d** (Cara kerja parser)
    
28. **a, b, d, e** (Otomatis punya representasi lain)
    
29. **a, b, d** (Hasil LM, mengandung variabel, var paling kiri)
    
30. **a, b, c, e** (Konsistensi, Fleksibilitas, Implementasi Parser)