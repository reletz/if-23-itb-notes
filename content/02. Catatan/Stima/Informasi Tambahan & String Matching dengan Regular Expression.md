_Back to_ [[IF2211 Strategi Algoritma]]

> [!cornell] Informasi Tambahan & String Matching dengan Regular Expression
> 
> > ## Questions/Cues
> > 
> > - Pencocokan String dengan Regex
> > - Definisi Regex
> > - Contoh Regex: Exact vs Regex Matching
> > - Notasi Dasar Regex: Brackets []
> > - Notasi Dasar Regex: Range []
> > - Notasi Dasar Regex: Caret ^ (Negasi)
> > - Notasi Dasar Regex: Tanda Tanya ? (Opsional)
> > - Notasi Dasar Regex: Titik . (Karakter Apapun)
> > - Notasi Dasar Regex: Backslash \ (Escape)
> > - Notasi Umum Regex Lainnya
> > - Contoh Regex Pola Kata Kapital
> > - Regex di Java
> > - Regex di Python (Modul `re`)
> > - `re.compile`
> > - `pattern.search`
> > - `pattern.match`
> > - `re.findall`
> > - Contoh Python Regex `\d{4}`
> > - Aplikasi Regex: ELIZA
> > - Konsep ELIZA
> 
> > ### Informasi Tambahan (More Information)
> > Sumber memberikan beberapa referensi tambahan dan tautan ke animasi algoritma untuk pemahaman lebih lanjut. Ini sangat direkomendasikan untuk melihat bagaimana algoritma ini bekerja secara visual.
> > 
> > **Latihan Soal Pencocokan String:** Sumber juga mencakup contoh soal latihan dari UAS 2023 dan UAS 2019 yang menanyakan penerapan algoritma KMP, Brute Force, dan Boyer-Moore, termasuk perhitungan fungsi pinggiran dan jumlah perbandingan karakter. Ini menunjukkan pentingnya memahami cara kerja detail dari setiap algoritma, bukan hanya definisinya.
> > 
> > ### String Matching dengan Regular Expression (Regex)
> > 
> > Bagian ini memperkenalkan cara lain yang sangat fleksibel untuk mendefinisikan _pattern_ menggunakan Regular Expression.
> > 
> > - **String Matching (menggunakan Regex):** Diberikan teks T dan _pattern_ P yang didefinisikan dalam bentuk Regular Expression, carilah lokasi di dalam teks T yang bersesuaian dengan _pattern_ P.
> > - **Definisi Regex:** **Regular Expression (Regex)** memungkinkan deskripsi _pattern_ yang jauh lebih kompleks dan fleksibel daripada sekadar string literal biasa. Dengan Regex, Anda tidak hanya mencari urutan karakter yang persis sama, tetapi juga pola atau struktur karakter.
> >     - **Contoh 1: Exact Matching:** Ini adalah jenis pencarian yang dilakukan oleh Brute Force, KMP, atau Boyer-Moore. Anda mencari string literal yang sama persis (misalnya, mencari "apple" di dalam teks).
> >     - **Contoh 2: Regex Matching:** Mencari _pattern_ yang didefinisikan oleh ekspresi reguler. Ini bisa mencakup _wildcard_ (karakter yang cocok dengan apa saja), karakter opsional, pengulangan karakter atau grup, dan banyak lagi.
> > 
> > ### Notasi Umum Regex (Basic Regular Expression Patterns)
> > 
> > Regex menggunakan berbagai karakter khusus, yang disebut _metacharacter_, untuk mendefinisikan pola:
> > 
> > - **Brackets `[]`:** Digunakan untuk **disjungsi**, yang berarti "cocokkan salah satu karakter di dalam kurung siku".
> >     - **Contoh:** `[aeiou]` akan cocok dengan salah satu huruf vokal (a, e, i, o, u).
> > - **Brackets dengan garis sambung `[]` (Range):** Digunakan untuk mendefinisikan **rentang karakter**.
> >     - **Contoh:** `[A-Z]` akan cocok dengan huruf kapital apa pun dari A sampai Z. `[a-z]` cocok dengan huruf kecil apa pun. `[0-9]` cocok dengan digit apa pun.
> > - **Caret `^` (di dalam `[]`):** Digunakan untuk **negasi**, yang berarti "cocokkan karakter apa pun _kecuali_ yang ada di dalam kurung siku".
> >     - **Contoh:** `[^aeiou]` akan cocok dengan karakter apa pun kecuali huruf vokal.
> > - **Tanda tanya `?`:** Menandakan bahwa karakter atau grup sebelumnya adalah **opsional**. Ini akan cocok dengan **0 atau 1 kemunculan** dari elemen yang mendahuluinya.
> > - **Titik `.`:** Ini adalah _metacharacter_ yang cocok dengan **karakter apa pun** (kecuali karakter _newline_).
> > - **Backslash `\`:** Digunakan untuk "meng-escape" _metacharacter_ jika Anda ingin mencocokkan karakter _metacharacter_ itu sendiri secara literal.
> >     - **Contoh:** `\.` akan cocok dengan karakter titik literal, bukan _wildcard_. `\\` akan cocok dengan karakter backslash literal.
> > - **Simbol lain yang sering digunakan (implied dalam konsep Regex):**
> >     - `*`: Nol atau lebih kemunculan dari elemen sebelumnya.
> >     - `+`: Satu atau lebih kemunculan dari elemen sebelumnya.
> >     - `{n}`: Tepat n kemunculan dari elemen sebelumnya.
> >     - `{n,}`: Minimal n kemunculan dari elemen sebelumnya.
> >     - `{n,m}`: Antara n dan m kemunculan (inklusif) dari elemen sebelumnya.
> >     - `|`: OR logis, untuk mencocokkan salah satu dari beberapa alternatif.
> > 
> > **Notasi Regex: Contoh:**
> > 
> > - Regex untuk kata yang berawal huruf kapital: `[A-Z][a-z]*`. Ini berarti dimulai dengan satu huruf kapital (`[A-Z]`) dilanjutkan dengan nol atau banyak (`*`) huruf kecil (`[a-z]`).
> > - Contoh penggunaan titik dan backslash: Misalnya, jika Anda ingin mencari string "[www.example.com](https://www.example.com)", Anda akan menggunakan `www\.example\.com` agar titiknya dicocokkan secara literal.
> > - Contoh Regex untuk Email dan Nomor Telepon: Membuat Regex untuk pola ini biasanya diberikan sebagai latihan karena cukup kompleks.
> > 
> > ### Regex di dalam Bahasa Pemrograman
> > 
> > Hampir semua bahasa pemrograman modern memiliki dukungan bawaan untuk Regular Expression.
> > 
> > - **Java:** Memiliki _package_ `java.util.regex` yang menyediakan kelas `Pattern` dan `Matcher` untuk bekerja dengan Regex.
> > - **Python:** Menggunakan modul `re`. Berikut adalah beberapa fungsi dan metode penting dari modul `re`:
> >     - `re.compile(pattern, flags=0)`: Ini adalah praktik terbaik. Mengkompilasi _pattern_ Regex menjadi sebuah **objek regex**. Objek yang dikompilasi ini dapat digunakan berulang kali untuk pencocokan, yang lebih efisien daripada mengkompilasi _pattern_ setiap kali.
> >     - `pattern.search(string[, pos[, endpos]])`: Memindai `string` dari kiri ke kanan untuk mencari **lokasi pertama di mana regex cocok**. Mengembalikan objek `match` jika ada kecocokan, atau `None` jika tidak ada. Anda bisa menentukan posisi awal (`pos`) dan akhir (`endpos`) pencarian.
> >     - `pattern.match(string[, pos[, endpos]])`: Berbeda dengan `search`, `match` hanya memeriksa apakah _pattern_ cocok pada **awal** `string` (nol atau lebih karakter di awal). Ini mengembalikan objek `match` jika cocok pada awal string, `None` jika tidak. Bisa juga ditentukan posisi awal dan akhir.
> >     - `re.findall(pattern, string, flags=0)`: Mengembalikan **semua kecocokan _non-overlapping_** dari _pattern_ dalam `string` sebagai sebuah daftar (_list_) string atau _tuple_. Pemindaian dilakukan dari kiri ke kanan, dan kecocokan dikembalikan sesuai urutan ditemukan. Kecocokan dengan panjang nol juga disertakan.
> >     - **Contoh Python Regex:** `\d{4}` artinya "digit karakter tepat 4 karakter". Di sini, `\d` adalah _shorthand_ untuk `[0-9]` (cocok dengan digit apa pun).
> >     - **Referensi Python Regex:** Dokumen resmi Python (`docs.python.org/3/library/re.html`) dan tutorial-tutorial online.
> > 
> > ### Aplikasi Regex
> > 
> > - **ELIZA:** Salah satu aplikasi historis dan menarik dari pencocokan _pattern_ (mirip Regex) adalah program **ELIZA**. ELIZA adalah _chatbot_ sederhana yang dikembangkan pada tahun 1960-an, terkenal karena kemampuannya meniru percakapan manusia.
> >     - ELIZA menggunakan pencocokan _pattern_ (mirip Regex) untuk mengenali frasa-frasa input pengguna (misalnya, "Saya butuh X" atau "Saya merasa Y").
> >     - Setelah mengenali pola, ia akan mengubahnya menjadi respons yang sesuai (misalnya, jika input "Saya butuh X", responsnya bisa "Apa hubungannya keinginan X dengan diskusi ini?").
> >     - ELIZA adalah program komputer klasik yang digunakan untuk studi komunikasi bahasa alami antara manusia dan mesin, menunjukkan bagaimana pola sederhana dapat menghasilkan interaksi yang tampaknya kompleks.

> [!cornell] ### Summary
> **Regular Expression (Regex)** menyediakan cara fleksibel untuk **pencocokan string** dengan mendefinisikan pola kompleks (bukan hanya literal), menggunakan notasi khusus seperti `[]` (disjungsi/range), `^` (negasi), `?` (opsional), `.` (karakter apapun), dan `\` (escape). Bahasa pemrograman seperti **Java dan Python** mendukung Regex (`java.util.regex`, `re`), dengan fungsi seperti `compile`, `search`, `match`, dan `findall`. Aplikasi praktis Regex termasuk **ELIZA**, _chatbot_ berbasis pola yang memproses input dan menghasilkan respons, menunjukkan bagaimana pola sederhana dapat meniru percakapan kompleks.

---

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Aspek Teknis Lanjutan:
> 
> - **Algoritma di Balik Regex:** Sebagian besar mesin Regex modern menggunakan algoritma yang didasarkan pada **Finite Automata** (otomat terbatas). Regex dapat dikonversi menjadi **Non-deterministic Finite Automaton (NFA)** yang kemudian dapat dikonversi menjadi **Deterministic Finite Automaton (DFA)**. Pencocokan dengan DFA memiliki kompleksitas waktu linear O(N) terhadap panjang teks, terlepas dari kompleksitas _pattern_ (setelah _preprocessing_ _pattern_). Namun, beberapa fitur Regex yang lebih kompleks (seperti _backreferences_) mungkin memerlukan pendekatan _backtracking_ yang lebih lambat.
> - **Good Suffix Rule (Boyer-Moore Lanjutan):** Selain _Bad Character Rule_ (yang memanfaatkan fungsi L()), algoritma Boyer-Moore yang lengkap juga menggunakan _Good Suffix Rule_. Aturan ini membandingkan _suffix_ yang cocok dari _pattern_ dengan _suffix_ lain dari _pattern_ itu sendiri atau _prefix_ dari _pattern_. Kombinasi kedua aturan (Bad Character dan Good Suffix) memberikan pergeseran yang optimal dan membuat Boyer-Moore menjadi salah satu algoritma pencocokan string tercepat dalam praktiknya.
> - **Perbandingan Implementasi Algoritma:** Meskipun KMP adalah O(m+n) dan Boyer-Moore bisa O(nm) di kasus terburuk, dalam praktik untuk teks dan _pattern_ umum (misalnya bahasa Inggris), Boyer-Moore seringkali lebih cepat karena pergeseran besar yang diberikannya. KMP unggul ketika teks sangat besar dan tidak bisa dimuat ke memori sepenuhnya (misalnya, _stream_ data), karena ia tidak pernah "mundur" di teks.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks Khusus String Matching:**
>     - "Algorithms on Strings, Trees and Sequences: Computer Science and Computational Biology" oleh Dan Gusfield. Ini adalah buku yang sangat mendalam dan komprehensif tentang algoritma string.
> - **Materi Kuliah Lanjutan:** Cari materi kuliah universitas (misalnya, dari MIT, Stanford, atau ITB) yang membahas "Advanced String Algorithms" atau "Text Processing Algorithms" untuk mempelajari varian algoritma ini atau algoritma lain seperti Rabin-Karp, Suffix Trees/Arrays.
> - **Dokumentasi Resmi Regex:**
>     - **Python `re` module:** [https://docs.python.org/3/library/re.html](https://docs.python.org/3/library/re.html)
>     - **Java `java.util.regex` package:** [https://docs.oracle.com/javase/8/docs/api/java/util/regex/package-summary.html](https://docs.oracle.com/javase/8/docs/api/java/util/regex/package-summary.html)
>     - **Regex101.com:** Situs web interaktif yang memungkinkan Anda menguji ekspresi reguler dan memahami bagaimana mereka bekerja.
> 
> #### Eksplorasi Mandiri:
> 
> - **Implementasikan Boyer-Moore dengan _Good Suffix Rule_:** Tantang diri Anda untuk mengimplementasikan aturan pergeseran kedua dari Boyer-Moore untuk melihat bagaimana kompleksitas dan performanya meningkat.
> - **Pecahkan Soal-soal LeetCode/HackerRank:** Cari soal-soal pencocokan string di platform ini. Banyak di antaranya dirancang untuk dipecahkan dengan KMP atau Boyer-Moore, atau bahkan algoritma berbasis Regex.
> - **Buat Aplikasi Sederhana dengan Regex:** Cobalah membuat skrip Python atau Java sederhana yang menggunakan Regex untuk memvalidasi format email, nomor telepon, atau mengurai data dari file log. Ini akan memberikan pemahaman praktis yang kuat.