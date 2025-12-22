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
> > - Apa itu Parse Tree?
> >     
> > - Mengapa Parse Tree penting?
> >     
> > - Aturan membangun Parse Tree?
> >     
> > - Apa itu Yield?
> >     
> > - Hubungan Tree & Ambiguitas?
> >     
> >
> >## Reference Points
> >
> > - Slide 08 - Parse Trees and Conversions.pdf
> >   
> 
> > ### Apa itu Parse Tree?
> > 
> > **Parse Tree** (Pohon Penurunan) adalah sebuah representasi grafis (berbentuk pohon) yang menunjukkan bagaimana sebuah string dapat diturunkan dari simbol awal (start symbol) sebuah CFG. Ini adalah cara visual untuk melacak proses derivasi dan melihat struktur sintaktis dari sebuah string.
> > 
> > Jika derivasi adalah resep langkah-demi-langkah dalam bentuk teks, maka Parse Tree adalah diagram alir visual dari resep tersebut. Setiap simpul (node) dan cabang dalam pohon ini merepresentasikan penerapan sebuah aturan produksi.
> > 
> > ### Mengapa Parse Tree Penting?
> > 
> > 1. **Menunjukkan Struktur Sintaktis:** Parse Tree secara eksplisit menunjukkan bagaimana komponen-komponen sebuah string dikelompokkan bersama. Dalam bahasa pemrograman, ini menentukan bagaimana ekspresi seperti `a * (a + b00)` dievaluasi.
> >     
> > 2. **Alternatif Derivasi:** Ia menyajikan informasi yang sama dengan derivasi (baik _leftmost_ maupun _rightmost_), tetapi dalam format yang lebih intuitif dan mudah dipahami.
> >     
> > 3. **Dasar untuk Kompilator:** Kompilator menggunakan Parse Tree (atau variasinya yang lebih abstrak, AST) untuk memahami struktur kode sebelum menerjemahkannya ke bahasa mesin.
> >     
> > 4. **Mendeteksi Ambiguitas:** Jika sebuah string dapat menghasilkan lebih dari satu Parse Tree yang valid, maka grammar tersebut bersifat **ambigu**.
> >     
> > 
> > ### Aturan Formal Membangun Parse Tree
> > 
> > Sebuah pohon dianggap sebagai Parse Tree yang valid untuk sebuah CFG `G = (V, T, P, S)` jika memenuhi semua kondisi berikut:
> > 
> > 1. **Akar (Root):** Simpul paling atas dari pohon dilabeli dengan simbol awal, `S`.
> >     
> > 2. **Simpul Internal (Interior Nodes):** Setiap simpul yang bukan daun (memiliki anak) harus dilabeli dengan sebuah **variabel** (anggota `V`).
> >     
> > 3. **Daun (Leaf Nodes):** Setiap simpul daun dilabeli dengan sebuah **terminal** (anggota `T`), sebuah **variabel** (anggota `V`), atau simbol kosong **ε**.
> >     
> >     - Catatan khusus: Jika sebuah daun dilabeli `ε`, ia harus menjadi satu-satunya anak dari induknya.
> >         
> > 4. **Kesesuaian dengan Aturan Produksi:** Ini adalah aturan terpenting. Jika sebuah simpul internal `A` memiliki anak-anak `X1, X2, ..., Xk` (dibaca dari kiri ke kanan), maka harus ada aturan produksi `A → X1X2...Xk` di dalam `P`.
> >     
> > 
> > **Analogi:** Bayangkan setiap simpul internal sebagai "orang tua" dan anak-anaknya sebagai "keturunan". Aturan ini memastikan bahwa setiap "keluarga" (seorang tua dan anak-anaknya) terbentuk sesuai dengan "hukum" (aturan produksi) yang ada di grammar.
> > 
> > ### Yield dari Parse Tree
> > 
> > **Yield** dari sebuah Parse Tree adalah string yang terbentuk dengan membaca label dari semua **simpul daun (leaves)** secara berurutan dari kiri ke kanan.
> > 
> > Yield merepresentasikan string terminal akhir yang berhasil diturunkan atau "dihasilkan" oleh pohon tersebut. Sebuah Parse Tree dianggap **lengkap** atau "penting" jika:
> > 
> > 5. Akarnya adalah simbol awal `S`.
> >     
> > 6. Yield-nya adalah sebuah string yang seluruhnya terdiri dari simbol-simbol terminal.
> >     
> > 
> > Himpunan dari semua yield yang mungkin dari semua Parse Tree yang lengkap dalam sebuah grammar adalah `L(G)`, yaitu bahasa dari grammar tersebut.
> > 
> > ### Hubungan dengan Ambiguitas
> > 
> > Seperti yang disebutkan sebelumnya, Parse Tree adalah alat utama untuk mengidentifikasi ambiguitas. Sebuah grammar dianggap ambigu jika setidaknya ada satu string `w` di `L(G)` yang dapat direpresentasikan oleh **dua atau lebih Parse Tree yang berbeda**. Ini menunjukkan bahwa ada lebih dari satu cara untuk menginterpretasikan struktur sintaktis string tersebut, yang merupakan masalah serius dalam desain bahasa.

> [!cornell] #### Summary
> 
> **Parse Tree adalah representasi visual berbentuk pohon dari proses derivasi dalam sebuah CFG, yang secara gamblang menunjukkan struktur sintaktis sebuah string.** Dibangun berdasarkan aturan formal di mana setiap simpul internal dan anak-anaknya harus sesuai dengan aturan produksi, pohon ini menghasilkan sebuah string terminal yang disebut _yield_ dengan membaca daun-daunnya dari kiri ke kanan. Parse Tree merupakan alternatif yang ekuivalen dengan derivasi dan menjadi alat fundamental untuk memahami struktur bahasa serta mendeteksi ambiguitas.

> [!ad-libitum]- Additional Information
> 
> #### Concrete Syntax Tree (CST) vs. Abstract Syntax Tree (AST)
> 
> Parse Tree yang kita bahas di sini secara teknis lebih dikenal sebagai **Concrete Syntax Tree (CST)**. Disebut "concrete" karena ia menunjukkan setiap detail dari sintaksis, termasuk aturan-aturan yang tidak esensial untuk makna, seperti tanda kurung atau variabel antara.
> 
> Dalam praktiknya, kompilator sering kali mengubah CST menjadi **Abstract Syntax Tree (AST)**. AST adalah versi yang lebih sederhana dan "abstrak" yang hanya menangkap struktur semantik (makna) yang esensial.
> 
> - **CST:** Memiliki node untuk `E → (E)`, menunjukkan keberadaan tanda kurung.
>     
> - **AST:** Menghilangkan node untuk tanda kurung karena struktur pohonnya sendiri sudah menyiratkan urutan operasi. AST lebih ringkas dan langsung digunakan untuk analisis semantik dan pembuatan kode.
>     
> 
> #### Algoritma Parsing: Bagaimana Parse Tree Dibuat?
> 
> Parse Tree tidak dibuat secara manual; mereka dibangun oleh program yang disebut **parser**. Ada dua pendekatan utama untuk parsing:
> 
> 1. **Top-Down Parsing:** Dimulai dari akar (Start Symbol) dan mencoba membangun pohon ke bawah menuju daun (string input). Contoh: Parser LL. Ini seperti mencoba "menebak" derivasi yang benar dari atas.
>     
> 2. **Bottom-Up Parsing:** Dimulai dari daun (string input) dan mencoba membangun pohon ke atas menuju akar. Ini seperti mencoba "mengurangi" string kembali menjadi Start Symbol. Contoh: Parser LR. Pendekatan ini lebih kuat dan umum digunakan dalam banyak kompilator.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Visualisasi:** Gunakan tool seperti JFLAP atau simulator online lainnya untuk memasukkan grammar dan string, lalu lihat bagaimana Parse Tree-nya dibuat secara otomatis. Ini sangat membantu untuk membangun intuisi.
>     
> - **Buku:** "Compilers: Principles, Techniques, and Tools" (dikenal sebagai "Buku Naga") oleh Aho, Lam, Sethi, dan Ullman memberikan penjelasan mendalam tentang peran parsing dan syntax tree dalam desain kompilator.
>