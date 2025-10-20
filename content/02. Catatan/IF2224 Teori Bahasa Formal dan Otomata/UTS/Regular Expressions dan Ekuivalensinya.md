---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Ekspresi Reguler (RE)?
> > - Bagaimana definisi formal RE?
> > - Apa urutan prioritas operator RE?
> > - Apa hubungan RE dengan Finite Automata?
> > - Bagaimana cara mengubah RE menjadi ε-NFA?
> > - Bagaimana cara mengubah DFA menjadi RE?
> > - Apa itu metode State Elimination?
> >
> > ## Reference Points
> >
> > - 2023_Regular Expressions and Conversions.pdf
> >     
> 
> > ### Pengenalan Ekspresi Reguler (RE)
> >
> > **Ekspresi Reguler** (Regular Expression atau Regex) adalah sebuah cara deklaratif berbasis teks untuk mendeskripsikan sebuah **Bahasa Regular**. Jika Finite Automata (DFA/NFA) adalah "cetak biru" untuk membangun _mesin pengenal_ bahasa, maka Ekspresi Reguler adalah "pola" atau _pattern_ yang mendefinisikan bahasa itu sendiri secara ringkas.
> >
> > RE sangat umum digunakan dalam praktik, misalnya pada perintah `grep` di UNIX atau pada _Lexical Analyzer_ (Lex/Flex) untuk _compiler_.
> >
> > ### Definisi Formal Ekspresi Reguler
> >
> > Sebuah Ekspresi Reguler didefinisikan secara induktif sebagai berikut:
> >
> > - **Langkah Basis:**
> > 	1.  $\epsilon$ adalah sebuah RE yang merepresentasikan bahasa $\{\epsilon\}$.
> > 	2.  $\emptyset$ adalah sebuah RE yang merepresentasikan bahasa kosong $\emptyset$.
> > 	3.  Untuk setiap simbol $a$ dalam alfabet $\Sigma$, $a$ adalah sebuah RE yang merepresentasikan bahasa $\{a\}$.
> > 
> >
> > - **Langkah Induksi:** Jika E dan F adalah Ekspresi Reguler, maka:
> > 	1.  **Union:** $(E+F)$ adalah RE yang merepresentasikan bahasa $L(E) \cup L(F)$.
> > 	2.  **Konkatenasi:** $(E.F)$ atau $(EF)$ adalah RE yang merepresentasikan bahasa $L(E)L(F)$.
> > 	3.  **Kleene Star:** $(E^*)$ adalah RE yang merepresentasikan bahasa $(L(E))^*$.
> > 
> > - **Prioritas Operator:** Dalam penulisan, untuk mengurangi penggunaan kurung, ditetapkan urutan prioritas (dari tertinggi ke terendah):
> > 	1. **Star (*)** 
> > 	2. **Konkatenasi (.)**
> > 	3. **Union (+)**
> >
> > 	Contoh: 01∗+1 akan dikelompokkan sebagai ((0(1∗))+1).
> >
> > ### Ekuivalensi dengan Finite Automata
> >
> > Teorema paling penting terkait RE adalah **ekuivalensinya dengan Finite Automata**. Ini berarti kelas bahasa yang bisa dideskripsikan oleh Ekspresi Reguler adalah kelas bahasa yang sama dengan yang bisa diterima oleh Finite Automata (yaitu Bahasa Regular).
> >
> > > Untuk setiap RE R, ada sebuah ε-NFA A yang ekuivalen (L(R)=L(A)).
> > 
> > > Untuk setiap DFA A, ada sebuah RE R yang ekuivalen (L(A)=L(R)).
> >
> > Ini melengkapi "lingkaran ekuivalensi": RE equiv ε-NFA equiv NFA equiv DFA.
> >
> > ### Konversi: Dari RE ke ε-NFA
> >
> > Proses ini mengikuti definisi induktif dari RE. Kita membangun ε-NFA untuk kasus-kasus basis, lalu menggabungkannya untuk kasus-kasus induktif.
> >
> > - **Basis:** Kita punya "blok bangunan" dasar untuk RE epsilon, emptyset, dan a.
> >     
> > - **Induksi (Penggabungan):**
> >     
> >     - **Untuk R+S (Union):** Buat start state baru, lalu buat ε-transition ke start state dari automata R dan S. Buat final state baru, lalu buat ε-transition dari final state R dan S ke sana.
> >         
> >     - **Untuk RS (Konkatenasi):** Hubungkan final state dari automata R dengan start state dari automata S menggunakan ε-transition.
> >         
> >     - **Untuk R* (Star):** Buat start state dan final state baru. Buat ε-transition dari start baru ke start R dan langsung ke final baru (untuk kasus string kosong). Buat ε-transition dari final R kembali ke start R (untuk repetisi) dan ke final baru.
> >         
> >
> > ### Konversi Dari DFA ke RE
> >
> > Proses ini lebih kompleks dan ada beberapa metode. Salah satu metode yang paling intuitif adalah **Metode Eliminasi State (State Elimination)**.
> >
> > 1. **Persiapan:** Anggap DFA sebagai sebuah graf di mana label pada panah (transisi) bisa berupa Ekspresi Reguler, bukan hanya simbol tunggal.
> > 2. **Proses Eliminasi:** Pilih sebuah state (selain start dan final state) untuk dieliminasi.
> > 3. **Update Transisi:** Untuk setiap pasang state $q_{in}$ (yang memiliki panah _ke_ state yang dieliminasi) dan $q_{out}$ (yang memiliki panah _dari_ state yang dieliminasi), buat atau update panah dari $q_{in}$ ke $q_{out}$. Label RE baru pada panah ini adalah kompensasi dari jalur yang hilang.
> > 4. **Ulangi:** Lakukan ini terus-menerus sampai hanya tersisa start state dan satu final state. RE pada panah yang menghubungkan keduanya (dengan memperhitungkan loop yang mungkin ada) adalah hasil akhirnya.
> >     

> [!cornell] #### Summary
>  **Ekspresi Reguler (RE)** adalah notasi tekstual yang kuat dan deklaratif untuk mendefinisikan **Bahasa Regular**, dan terbukti memiliki kekuatan komputasi yang **ekuivalen** dengan Finite Automata. Ekuivalensi ini ditunjukkan oleh adanya algoritma konstruksi dua arah: RE dapat diubah menjadi **ε-NFA** yang ekuivalen melalui metode konstruksi induktif, dan DFA dapat diubah menjadi RE yang ekuivalen melalui metode seperti **Eliminasi State**.

> [!ad-libitum]- Additional Information (Optional)
>  #### "Regex" di Dunia Nyata
>  Penting untuk diketahui bahwa "regex" yang digunakan dalam bahasa pemrograman modern (seperti Python, JavaScript, Perl) seringkali lebih kuat daripada Ekspresi Reguler formal yang kita pelajari. Implementasi ini (sering disebut PCRE - Perl Compatible Regular Expressions) menyertakan fitur-fitur seperti _backreferences_ (misal `\1`) dan _lookarounds_. Fitur-fitur ini memungkinkan mereka untuk mengenali bahasa yang **bukan** Bahasa Regular (misalnya, bahasa anbnmidn0). Jadi, meskipun berakar pada teori yang sama, "regex" dalam praktik adalah "Ekspresi Reguler formal dengan steroid".
> 
> #### Eksplorasi Mandiri
> **Konstruksi RE ke ε-NFA:** Ambil sebuah RE sederhana, misalnya `(a+b)c*`. Coba bangun ε-NFA-nya secara manual di atas kertas menggunakan metode "blok bangunan": 
> 1. Buat automata untuk `a` dan `b`.
> 		
> 2. Gabungkan keduanya dengan konstruksi Union (+) untuk mendapatkan automata `(a+b)`.
> 		
> 3. Buat automata untuk `c` lalu terapkan konstruksi Star (*) untuk mendapatkan `c*`.
> 		
> 4. Terakhir, gabungkan automata `(a+b)` dan `c*` dengan konstruksi Konkatenasi.