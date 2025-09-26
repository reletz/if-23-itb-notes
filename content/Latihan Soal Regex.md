Bacalah Subab dibawah ini, dari buku **Automata Theory, Language, and Computation Introduction** _(terlampir):_

- Algebraic Laws for Regular Expressions (Ch. 3.4)
- Pumping Lemma (Ch. 4.1) 
- Closure Properties (Ch. 4.2)
- Decision Properties (Ch. 4.3)
- Minimization Techniques (Ch. 4.4)

Untuk setiap sub-bab, Jelaskan **minimal 1 contoh persoalan** dari hasil bacaan yang menurutmu paling jelas menjelaskan konsep tersebut.
Sertakan refleksinya:
- Untuk setiap sub-bab, jawab:  
    - Apa hal baru yang kamu pahami dari bacaan?  
    - Bagaimana hubungan materi ini dengan konsep automata/regex yang sudah kamu ketahui sebelumnya?  
    - Menurutmu, di mana konsep ini bermanfaat dalam dunia nyata (misalnya compiler, pencarian teks, dll)?
- Format Output  
    Ditulis **tangan** di kertas, lalu difoto (save PDF) kemudian disubmit.  
    Struktur untuk **per sub-bab**:  
    - Contoh  
    - Refleksi

### 1. Pumping Lemma (Ch. 4.1)

Konsep _Pumping Lemma_ untuk Bahasa Reguler adalah alat yang digunakan untuk **membuktikan bahwa suatu bahasa _tidak_ bersifat reguler**. Intinya, jika suatu bahasa $L$ adalah reguler, maka setiap _string_ yang cukup panjang ($w$) dalam $L$ dapat dipecah menjadi tiga bagian, $w = xyz$, sedemikian rupa sehingga bagian tengah ($y$) dapat diulang (_pumped_) berkali-kali (termasuk nol kali) dan _string_ hasilnya ($xy^k z$) masih tetap berada di dalam bahasa $L$.

**Contoh Persoalan yang Paling Jelas Menjelaskan Konsep:**

Contoh yang paling jelas adalah bahasa $L_{a^b}$ yang didefinisikan sebagai **$L_{a^b} = {a^n b^n \mid n \ge 1}$**. Bahasa ini terdiri dari _string-string_ yang memiliki sejumlah 'a' diikuti oleh jumlah 'b' yang sama (misalnya, $ab$, $aabb$, $aaabbb$, dst.).

Untuk membuktikan $L_{a^b}$ tidak reguler menggunakan _Pumping Lemma_, kita harus menganggapnya sebagai _permainan adversari_:

1. **Pemain 1 (Adversari)** memberikan konstanta $n$ (yang merupakan jumlah keadaan/state dalam DFA yang diduga mengenali $L_{a^b}$).
2. **Kita** memilih _string_ $w = a^n b^n$ dari $L_{a^b}$ yang panjangnya jelas lebih besar dari $n$ (yaitu, $|w| = 2n$).
3. **Pemain 1** memecah $w$ menjadi $w = xyz$, dengan syarat $y \ne \epsilon$ (tidak kosong) dan $|xy| \le n$.
4. Karena panjang $xy$ maksimal $n$, dan $w$ dimulai dengan $n$ huruf 'a', maka $x$ dan $y$ **hanya boleh terdiri dari simbol 'a'**.
5. **Kita** memilih nilai _pump_ $k=0$ (menghilangkan $y$), sehingga menghasilkan _string_ baru $w' = xz$.
6. Karena $y$ berisi setidaknya satu 'a' ($y \ne \epsilon$) dan kita menghilangkannya, _string_ $w'$ sekarang memiliki jumlah 'a' yang lebih sedikit daripada $n$, tetapi masih memiliki $n$ buah 'b'.
7. Karena $w'$ tidak lagi memiliki jumlah 'a' dan 'b' yang sama, **$w'$ tidak berada dalam $L_{a^b}$**.

Hal ini kontradiksi dengan _Pumping Lemma_ (yang menyatakan $w'$ harus ada di $L$), sehingga membuktikan bahwa $L_{a^b} = {a^n b^n \mid n \ge 1}$ **bukanlah bahasa reguler**.

#### Refleksi Pribadi

- **Apa hal baru yang kamu pahami dari bacaan?** Hal baru yang saya pahami adalah bahwa _Pumping Lemma_ menyediakan metode formal dan meyakinkan untuk mendefinisikan batas kemampuan bahasa reguler. Pemahaman intuitif bahwa DFA (yang memiliki jumlah _state_ terbatas) tidak dapat "mengingat" hitungan yang tidak terbatas (seperti memastikan $a$ dan $b$ berjumlah sama) kini diformalkan melalui konstanta $n$ dalam lemma tersebut dan konsep _permainan adversari_.
    
- **Bagaimana hubungan materi ini dengan konsep automata/regex yang sudah kamu ketahui sebelumnya?** Materi sebelumnya mengajarkan bahwa DFA, NFA, $\epsilon$-NFA, dan Ekspresi Reguler semuanya mendefinisikan kelas bahasa yang sama: **Bahasa Reguler**. _Pumping Lemma_ berfungsi sebagai _ujian negatif_ bagi kelas ini. Jika suatu bahasa terbukti melanggar lemma ini, maka bahasa tersebut tidak mungkin diakui oleh DFA atau didefinisikan oleh Ekspresi Reguler mana pun.
    
- **Menurutmu, di mana konsep ini bermanfaat dalam dunia nyata (misalnya compiler, pencarian teks, dll)?** Konsep ini sangat bermanfaat dalam **desain kompiler**, khususnya untuk membedakan antara tugas _analisis leksikal_ dan _parsing_. Tugas yang dapat diatasi oleh DFA (seperti mengenali token, yang merupakan Bahasa Reguler) harus dipisahkan dari tugas yang membutuhkan "memori" tak terbatas (seperti memeriksa keseimbangan tanda kurung atau struktur bersarang), yang harus ditangani oleh _Context-Free Grammars_ dan _parser_ yang lebih kuat.
    

---

### 2. Closure Properties (Ch. 4.2)

_Closure Properties_ (Sifat Ketertutupan) Bahasa Reguler adalah serangkaian teorema yang menyatakan bahwa jika kita melakukan operasi tertentu (seperti gabungan, irisan, atau komplemen) pada satu atau lebih Bahasa Reguler, hasilnya **juga akan menjadi Bahasa Reguler**.

**Contoh Persoalan yang Paling Jelas Menjelaskan Konsep:**

Contoh yang paling jelas dan transformatif dalam menjelaskan sifat ketertutupan adalah **Ketertutupan di bawah Operasi Irisan (Intersection)**.

**Teorema:** Jika $L$ dan $M$ adalah bahasa reguler, maka $L \cap M$ (irisan $L$ dan $M$) juga merupakan bahasa reguler.

**Penjelasan Konsep melalui Konstruksi Produk (Product Construction):**

Untuk membuktikannya, kita menggunakan representasi DFA:

1. Misalkan kita memiliki DFA $A_L$ yang mengenali $L$, dan DFA $A_M$ yang mengenali $M$.
2. Kita membangun DFA baru, $A$, yang mengenali $L \cap M$.
3. _Konstruksi Produk_ ini menciptakan _state_ baru di $A$ yang berupa pasangan dari _state_ di $A_L$ dan $A_M$, yaitu $(q_L, q_M)$. Tujuannya adalah menjalankan $A_L$ dan $A_M$ secara paralel.
4. Sebuah _string_ $w$ diterima oleh $A$ jika dan hanya jika $w$ diterima oleh _kedua_ DFA, $A_L$ dan $A_M$.
5. Oleh karena itu, **keadaan penerimaan** ($F$) dari DFA $A$ adalah semua pasangan _state_ $(q_L, q_M)$ di mana $q_L$ adalah _state_ penerimaan di $A_L$ dan $q_M$ adalah _state_ penerimaan di $A_M$.

DFA $A$ yang dihasilkan adalah representasi formal dari irisan $L$ dan $M$, sehingga membuktikan bahwa hasil irisan tersebut tetap merupakan bahasa reguler.

#### Refleksi Pribadi

- **Apa hal baru yang kamu pahami dari bacaan?** Hal baru yang saya pahami adalah fleksibilitas pembuktian sifat ketertutupan, di mana memilih representasi yang tepat (DFA atau Ekspresi Reguler) sangat penting. Bukti untuk Union menjadi trivial menggunakan Ekspresi Reguler ($R \cup S$), sementara bukti untuk Complementasi dan Irisan menjadi mudah hanya jika menggunakan DFA (dengan membalik _final states_ atau menggunakan _Product Construction_).
    
- **Bagaimana hubungan materi ini dengan konsep automata/regex yang sudah kamu ketahui sebelumnya?** Materi ini memperkuat keyakinan bahwa DFA dan Ekspresi Reguler adalah sama kuatnya, karena semua operasi dasar yang dapat dilakukan pada satu representasi dapat ditiru pada representasi lainnya (walaupun mungkin memerlukan konstruksi yang rumit, seperti mengonversi hasil komplemen DFA kembali ke Ekspresi Reguler). Sifat ketertutupan menunjukkan **kekokohan** kelas Bahasa Reguler.
    
- **Menurutmu, di mana konsep ini bermanfaat dalam dunia nyata (misalnya compiler, pencarian teks, dll)?** _Closure Properties_ sangat bermanfaat dalam **verifikasi sistem digital dan protokol komunikasi**. Misalnya, jika kita memodelkan dua aspek berbeda dari suatu protokol (seperti urutan yang sah untuk pengiriman dan penerimaan data) menggunakan dua DFA berbeda. Untuk memastikan sistem secara keseluruhan berfungsi dengan benar (misalnya, kondisi $L \cap M$), kita dapat secara mekanis membangun DFA gabungan ($A$) yang memvalidasi kedua kondisi secara simultan. Kemampuan ini memungkinkan algoritma _model checking_ untuk memverifikasi protokol.