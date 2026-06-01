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
> > - Bagaimana Struktur Kompiler?
> >     
> > - Apa itu Lexical Analysis (Scanner)?
> >     
> > - Apa itu Token & Besaran Leksikal?
> >     
> > - Apa itu Syntax Analysis (Parser)?
> >     
> > - Apa output dari Parser?
> >     
> > - Contoh Parse Tree?
> >     
> > 
> > ## Reference Points
> > 
> > - Slide 09 - Konsep dan Notasi Bahasa
> >     
> 
> > ### Struktur Umum Kompiler
> > 
> > Sebuah kompiler adalah program kompleks yang menerjemahkan kode dari satu bahasa (source code) ke bahasa lain (target code, biasanya object code atau machine code). Proses ini dibagi menjadi serangkaian fase yang bekerja secara berurutan. Secara garis besar, fase-fase ini dikelompokkan menjadi dua bagian utama:
> > 
> > 1. **Fase Analisis (Frontend):** Bertugas untuk memecah kode sumber menjadi bagian-bagian konstituennya dan menciptakan representasi perantara (intermediate representation) dari kode tersebut. Fase ini sangat bergantung pada teori bahasa formal.
> >     
> > 2. **Fase Sintesis (Backend):** Bertugas untuk membangun program target yang diinginkan dari representasi perantara. Fase ini lebih berkaitan dengan arsitektur mesin target.
> >     
> > 
> > Urutan fase dalam kompiler modern umumnya adalah:
> > 
> > Source Code → Lexical Analysis → Syntax Analysis → Semantic Analysis → Intermediate Code Generation → Code Optimization → Code Generation → Target Code
> > 
> > ### Lexical Analysis (Scanner)
> > 
> > **Lexical Analysis**, atau sering disebut _scanning_, adalah fase pertama dari kompiler. Tugas utamanya adalah membaca aliran karakter dari kode sumber dan mengelompokkannya ke dalam unit-unit leksikal yang bermakna yang disebut **token**.
> > 
> > - **Analogi:** Bayangkan Anda membaca sebuah kalimat. Mata Anda melihat huruf-huruf individual, tetapi otak Anda secara otomatis mengelompokkannya menjadi kata-kata. Scanner melakukan hal yang sama untuk kode sumber. Ia tidak peduli dengan tata bahasa kalimat, hanya mengenali "kata-kata" yang valid.
> >     
> > - **Fungsi Utama:**
> >     
> >     - Mengidentifikasi dan mengkategorikan token.
> >         
> >     - Menghapus karakter yang tidak relevan seperti spasi, baris baru (whitespace), dan komentar.
> >         
> >     - Menyimpan informasi tentang identifier ke dalam **Tabel Simbol (Symbol Table)**.
> >         
> >     - Melaporkan kesalahan leksikal (misalnya, simbol yang tidak valid).
> >         
> > 
> > ### Token dan Besaran Leksikal
> > 
> > **Token** adalah representasi abstrak dari satu atau lebih karakter dalam kode sumber yang secara logis saling terkait. Setiap token memiliki **tipe (jenis)** dan bisa memiliki **nilai (value)**. Kategori-kategori dari token ini disebut **Besaran Leksikal**.
> > 
> > - **Contoh Besaran Leksikal:**
> >     
> >     1. **Identifier:** Nama yang diberikan untuk variabel, fungsi, kelas, dll. Contoh: `fahrenheit`, `main`, `myClass`.
> >         
> >     2. **Keyword:** Kata-kata yang sudah memiliki makna khusus dalam bahasa pemrograman. Contoh: `if`, `else`, `while`, `int`.
> >         
> >     3. **Konstanta:** Nilai literal yang tetap. Contoh: `32` (integer), `1.8` (float), `"Hello"` (string).
> >         
> >     4. **Operator:** Simbol yang melakukan operasi. Contoh: `+`, `*`, `:=` (assignment), `>`.
> >         
> >     5. **Delimiter (Pemisah):** Simbol untuk pengelompokan atau pemisahan. Contoh: `(`, `)`, `{`, `}`, `;`, `,`.
> >         
> > 
> > ### Syntax Analysis (Parser)
> > 
> > **Syntax Analysis**, atau sering disebut _parsing_, adalah fase kedua kompiler. Setelah scanner menghasilkan aliran token, parser mengambil alih untuk memeriksa apakah token-token tersebut tersusun dalam urutan yang benar sesuai dengan aturan tata bahasa (grammar) dari bahasa sumber.
> > 
> > - **Analogi:** Jika scanner mengenali "kata-kata", maka parser memeriksa apakah kata-kata tersebut membentuk "kalimat" yang valid secara gramatikal (misalnya, mengikuti struktur Subjek-Predikat-Objek).
> >     
> > - **Tugas Utama:**
> >     
> >     - Memverifikasi bahwa urutan token sesuai dengan aturan produksi dari grammar.
> >         
> >     - Melaporkan kesalahan sintaksis (misalnya, titik koma yang hilang, tanda kurung tidak seimbang).
> >         
> >     - Membangun struktur data yang merepresentasikan struktur hierarkis dari kode, yang disebut **Pohon Sintaks (Parse Tree)**.
> >         
> > 
> > ### Output Parser: Pohon Sintaks (Parse Tree)
> > 
> > **Pohon Sintaks** atau _Parse Tree_ adalah representasi grafis berbentuk pohon dari bagaimana sebuah string atau statement dalam kode sumber diturunkan dari simbol awal grammar.
> > 
> > - **Struktur:**
> >     
> >     - **Akar (Root):** Simbol awal dari grammar.
> >         
> >     - **Simpul Internal (Internal Nodes):** Simbol non-terminal.
> >         
> >     - **Daun (Leaf Nodes):** Simbol terminal (token).
> >         
> > 
> > Pohon ini secara eksplisit menunjukkan bagaimana parser menerapkan aturan-aturan produksi untuk mengenali struktur kalimat. Pohon ini kemudian menjadi input fundamental untuk fase selanjutnya, yaitu analisis semantik.
> > 
> > ### Contoh Parse Tree
> > 
> > Untuk statement: `(A + B) * (C + D)`, parser akan menggunakan aturan grammar untuk ekspresi, term, dan faktor untuk membangun pohon sintaksis yang merepresentasikan struktur dan urutan operasi dari statement tersebut.

> [!cornell] #### Summary
> 
> **Sebuah kompiler bekerja melalui serangkaian fase, diawali dengan Fase Analisis.** _**Lexical Analyzer (Scanner)**_ **membaca kode sumber dan mengubahnya menjadi aliran token yang bermakna. Aliran token ini kemudian diterima oleh** _**Syntax Analyzer (Parser)**_**, yang memverifikasi apakah urutannya sesuai dengan tata bahasa formal dan membangun sebuah Pohon Sintaks (Parse Tree) untuk merepresentasikan struktur hierarkis dari program, yang akan digunakan oleh fase-fase selanjutnya.**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: Tabel Simbol (Symbol Table)
> 
> Tabel Simbol adalah struktur data krusial yang digunakan di hampir semua fase kompiler. Ia berfungsi sebagai "database" untuk menyimpan informasi tentang semua identifier yang digunakan dalam program, seperti nama, tipe data, scope (lingkup), dan alamat memori. Scanner adalah yang pertama kali memasukkan identifier ke dalam tabel ini, dan fase-fase berikutnya (seperti semantic analysis dan code generation) akan terus-menerus mengakses dan memperbaruinya.
> 
> #### Topik Teknis 2: Jenis-jenis Teknik Parsing
> 
> Ada dua pendekatan utama dalam parsing:
> 
> 1. **Top-Down Parsing:** Parser mencoba membangun pohon sintaks dari akar (simbol awal) ke bawah menuju daun (token). Contohnya adalah parser LL (Left-to-right scan, Leftmost derivation).
>     
> 2. **Bottom-Up Parsing:** Parser mencoba membangun pohon dari daun (token) ke atas menuju akar. Ini seperti mencoba "mereduksi" urutan token kembali ke simbol awal. Contohnya adalah parser LR (Left-to-right scan, Rightmost derivation), yang lebih kuat dan umum digunakan.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Ambil sepotong kecil kode dari bahasa yang Anda kenal (misalnya, `int result = a + 10;`). Coba lakukan analisis leksikal secara manual: identifikasi semua token dan klasifikasikan ke dalam besaran leksikalnya (identifier, keyword, konstanta, operator, delimiter).
>     
> - Pikirkan mengapa komentar dan whitespace dihapus oleh scanner. Apa yang akan terjadi jika parser harus menanganinya?
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Tools:** Untuk merasakan bagaimana fase analisis bekerja secara praktis, Anda bisa mengeksplorasi tools generator parser seperti **Flex** (untuk scanner) dan **Bison** (untuk parser). Anda mendefinisikan aturan leksikal dan sintaksis, dan tools ini akan menghasilkan kode C yang berfungsi sebagai scanner/parser.
>