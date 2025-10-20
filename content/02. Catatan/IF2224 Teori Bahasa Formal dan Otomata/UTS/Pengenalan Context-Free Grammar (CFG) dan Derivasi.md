---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu CFG?
> >     
> > - Komponen CFG?
> >     
> > - Apa itu Derivasi?
> >     
> > - Jenis Derivasi?
> >     
> > - Bahasa dari Grammar?
> >     
> > - Apa itu Sentential Form?
> >     
> >
> > ## Reference Points
> >
> > - Slide 07 - Context Free Grammars and Languages.pdf
> >    
> 
> > ### Apa itu Context-Free Grammar (CFG)?
> > 
> > **Context-Free Grammar (CFG)** adalah sebuah formalisme atau kerangka aturan yang digunakan untuk mendefinisikan sebuah **bahasa bebas konteks (Context-Free Language - CFL)**. Secara sederhana, CFG bisa dibayangkan seperti "resep" atau "aturan tata bahasa" yang menentukan cara membentuk semua string (kalimat) yang valid dalam sebuah bahasa.
> > 
> > CFG jauh lebih kuat daripada Regular Expression atau Finite Automata karena mampu menangani struktur yang bersifat rekursif atau bersarang (nested), seperti tanda kurung yang berpasangan atau struktur palindrom, yang tidak bisa ditangani oleh bahasa reguler.
> > 
> > **Contoh kegunaan:**
> > 
> > - **Bahasa Pemrograman:** Mendefinisikan sintaksis seperti struktur `if-else`, perulangan `for`, atau ekspresi aritmatika.
> >     
> > - **Markup Languages:** Mendefinisikan struktur dokumen seperti XML atau HTML.
> >     
> > - **Bahasa Alami:** Menganalisis struktur sintaktis kalimat.
> >     
> > 
> > ### Komponen Formal CFG: (V, T, P, S)
> > 
> > Sebuah CFG secara formal didefinisikan sebagai sebuah tupel 4-elemen `G = (V, T, P, S)`:
> > 
> > 1. **V (Variables):** Himpunan terbatas dari **simbol non-terminal**. Ini adalah simbol-simbol abstrak yang akan "dipecah" atau diperluas lagi menjadi struktur lain. Analogi: Kategori dalam tata bahasa seperti `(Kalimat)`, `(Subjek)`, `(Predikat)`.
> >     
> > 2. **T (Terminals):** Himpunan terbatas dari **simbol terminal**. Ini adalah elemen dasar atau "kata" aktual yang membentuk string akhir dan tidak bisa dipecah lagi. Analogi: Kata-kata seperti `saya`, `makan`, `0`, `1`, `+`, `*`. Himpunan V dan T tidak boleh memiliki irisan (`V ∩ T = ∅`).
> >     
> > 3. **P (Productions):** Himpunan terbatas dari **aturan produksi**. Ini adalah inti dari CFG, yang mendefinisikan bagaimana variabel dapat digantikan oleh kombinasi variabel lain dan/atau terminal. Formatnya adalah `A → α`, yang dibaca "A dapat menghasilkan α", di mana `A` adalah sebuah variabel (anggota V) dan `α` adalah string yang terdiri dari simbol-simbol di `(V U T)*`.
> >     
> > 4. **S (Start Symbol):** Sebuah variabel khusus (anggota V) yang menjadi titik awal dari semua proses pembentukan string.
> >     
> > 
> > Contoh (Grammar Palindrom):
> > 
> > G = ({P}, {0, 1}, A, P) di mana aturan produksi A adalah:
> > 
> > - `P → ε` (epsilon/string kosong)
> >     
> > - `P → 0`
> >     
> > - `P → 1`
> >     
> > - `P → 0P0`
> >     
> > - `P → 1P1`
> >     
> > 
> > Di sini: `V={P}`, `T={0, 1}`, `S=P`.
> > 
> > ### Proses Derivasi (Derivation)
> > 
> > **Derivasi** adalah proses sekuensial penerapan aturan produksi untuk mengubah simbol awal (Start Symbol) menjadi sebuah string terminal. Proses ini adalah cara CFG "menghasilkan" (generate) string-string dalam bahasanya.
> > 
> > - **Simbol `⇒`**: Dibaca "menghasilkan dalam satu langkah" (derives in one step). Contoh: `0P0 ⇒ 01P10` (karena ada aturan `P → 1P1`).
> >     
> > - **Simbol `⇒*`**: Dibaca "menghasilkan dalam nol atau lebih langkah" (derives in zero or more steps). Ini menunjukkan keseluruhan proses dari awal hingga akhir. Contoh: `P ⇒* 0110`.
> >     
> > 
> > ### Leftmost vs. Rightmost Derivation
> > 
> > Saat sebuah string mengandung lebih dari satu variabel, kita memiliki pilihan variabel mana yang akan diekspansi terlebih dahulu. Dua strategi sistematis untuk ini adalah:
> > 
> > 1. **Leftmost Derivation (`⇒lm`):** Pada setiap langkah, variabel **paling kiri** dalam string yang sedang diproses **selalu** dipilih untuk digantikan (diekspansi) sesuai aturan produksi.
> >     
> > 2. **Rightmost Derivation (`⇒rm`):** Pada setiap langkah, variabel **paling kanan** yang **selalu** dipilih untuk digantikan.
> >     
> > 
> > Meskipun urutan penerapannya berbeda, kedua jenis derivasi ini akan menghasilkan string terminal yang sama dan merepresentasikan struktur sintaktis yang sama (yang nantinya akan divisualisasikan oleh Parse Tree).
> > 
> > ### Bahasa dari Sebuah Grammar (L(G))
> > 
> > Bahasa yang didefinisikan oleh sebuah CFG `G`, dinotasikan sebagai `L(G)`, adalah himpunan **semua string terminal `w`** yang dapat diturunkan dari simbol awal `S`.
> > 
> > Secara formal: `L(G) = {w ∈ T* | S ⇒* w}`
> > 
> > Ini berarti, sebuah string `w` dianggap valid atau "diterima" oleh grammar `G` jika dan hanya jika ada setidaknya satu urutan derivasi yang bisa mengubah `S` menjadi `w`.
> > 
> > ### Sentential Form
> > 
> > **Sentential Form** adalah string apa pun (bisa berupa campuran variabel dan terminal) yang dapat diturunkan dari simbol awal `S`.
> > 
> > - **Perbedaan dengan `L(G)`:** `L(G)` adalah himpunan sentential form yang **hanya** terdiri dari simbol-simbol terminal. Semua string di `L(G)` adalah sentential form, tetapi tidak semua sentential form adalah bagian dari `L(G)`.
> >     
> > - **Left-Sentential Form:** Sebuah sentential form yang dihasilkan melalui proses _leftmost derivation_.
> >     
> > - **Right-Sentential Form:** Sebuah sentential form yang dihasilkan melalui proses _rightmost derivation_.
> >     
> > 
> > Contoh: dalam grammar ekspresi, `E * (I + E)` adalah sebuah sentential form karena bisa diturunkan dari `E`, tetapi bukan bagian dari `L(G)` karena masih mengandung variabel `E` dan `I`.

> [!cornell] #### Summary
> 
> **Secara esensial, Context-Free Grammar (CFG) adalah sebuah sistem formal `(V, T, P, S)` yang mendefinisikan sebuah bahasa (Context-Free Language) melalui proses derivasi, di mana aturan produksi digunakan secara berulang untuk mengubah simbol awal menjadi sekumpulan string terminal.** Proses derivasi ini dapat dilakukan secara sistematis melalui _leftmost_ atau _rightmost derivation_, dan setiap string antara yang terbentuk dalam proses ini disebut _sentential form_. Bahasa `L(G)` adalah hasil akhir dari semua kemungkinan derivasi yang valid yang hanya mengandung simbol terminal.

> [!ad-libitum]- Additional Information
> 
> #### Hirarki Chomsky: Posisi CFG di Dunia Bahasa Formal
> 
> CFG bukanlah satu-satunya jenis grammar. Ahli bahasa Noam Chomsky mengklasifikasikan grammar formal ke dalam sebuah hirarki berdasarkan kompleksitas aturan produksinya. CFG berada di **Tipe-2**.
> 
> - **Tipe-3 (Regular Grammar):** Paling restriktif. Menghasilkan Bahasa Reguler. Diakui oleh Finite Automata (FA). Aturan: `A → a` atau `A → aB`.
>     
> - **Tipe-2 (Context-Free Grammar):** Aturan: `A → α`, di mana `A` adalah satu variabel. Menghasilkan Bahasa Bebas Konteks. Diakui oleh **Pushdown Automata (PDA)**. Ini adalah level yang kita pelajari.
>     
> - **Tipe-1 (Context-Sensitive Grammar):** Aturan lebih longgar, `αAβ → αγβ`. Penggantian `A` bergantung pada konteks `α` dan `β`. Diakui oleh Linear Bounded Automata (LBA).
>     
> - **Tipe-0 (Unrestricted Grammar):** Paling umum. Tidak ada batasan pada aturan. Setara dengan Mesin Turing.
>     
> 
> #### Notasi BNF (Backus-Naur Form)
> 
> Dalam praktik, terutama dalam definisi bahasa pemrograman, CFG sering ditulis dalam notasi **BNF**. Ini hanyalah cara penulisan lain yang lebih deskriptif.
> 
> - `→` diganti dengan `::=`
>     
> - Variabel ditulis di dalam kurung sudut, misal `<expression>`
>     
> - Terminal ditulis apa adanya atau dalam tanda kutip.
>     
> 
> Contoh Grammar Ekspresi dalam BNF:
> 
> ```
> <E> ::= <I>
>       | <E> + <E>
>       | <E> * <E>
>       | ( <E> )
> <I> ::= a | b | <I>a | <I>b | <I>0 | <I>1
> ```
> 
> #### Ambiguitas dalam Grammar
> 
> Sebuah grammar disebut **ambigu (ambiguous)** jika terdapat setidaknya satu string dalam bahasanya yang memiliki lebih dari satu _leftmost derivation_ (atau _rightmost derivation_, atau _parse tree_).
> 
> **Mengapa ini masalah?** Dalam kompilator, struktur sintaksis menentukan makna (semantik). Jika sebuah ekspresi seperti `3 + 4 * 5` memiliki dua parse tree yang berbeda, kompilator tidak tahu apakah harus melakukan penjumlahan atau perkalian terlebih dahulu. Ini fatal.
> 
> Contoh klasik grammar ambigu: E → E + E | E * E | id
> 
> String id + id * id bisa diturunkan dengan dua cara, yang mengarah pada dua interpretasi: (id + id) * id atau id + (id * id). Grammar yang baik untuk ekspresi aritmatika harus dirancang untuk tidak ambigu, biasanya dengan memisahkan level presedensi (misalnya, Term untuk perkalian, Factor untuk tanda kurung).
> 
> #### Eksplorasi Mandiri
> 
> - Coba rancang sebuah CFG sederhana untuk subset dari format data JSON (misalnya, hanya mendukung objek dengan key-value string).
>     
> - Analisis mengapa grammar ekspresi aritmatika dasar bersifat ambigu dan cari tahu bagaimana cara menghilangkannya (hint: perkenalkan variabel baru untuk setiap tingkat presedensi operator).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Buku: "Introduction to Automata Theory, Languages, and Computation" oleh Hopcroft, Motwani, dan Ullman. Ini adalah buku teks klasik dan referensi standar untuk subjek ini.
>     
> - Tools: Gunakan simulator online seperti "JFLAP" untuk bereksperimen dengan pembuatan dan pengujian CFG.
>