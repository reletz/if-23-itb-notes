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
> > - Apa itu Hirarki Chomsky?
> >     
> > - Apa saja 4 tingkatan bahasa?
> >     
> > - Apa itu Bahasa Tipe 3 (Regular)?
> >     
> > - Apa itu Bahasa Tipe 2 (Context-Free)?
> >     
> > - Apa itu Bahasa Tipe 1 (Context-Sensitive)?
> >     
> > - Apa itu Bahasa Tipe 0 (Unrestricted)?
> >     
> > - Mesin apa yang mengenali setiap tipe?
> >     
> > - Bagaimana aturan produksi untuk setiap tipe?
> >     
> > - Bagaimana hubungan antar tingkatan?
> >     
> >
> > ## Reference Points
> > 
> > - `slide-09.pdf` (hlm. 2, 5, 7, 9)
>  
> > ### Definisi Tata Bahasa (Grammar)
> > **Tata bahasa (grammar)** adalah sebuah kerangka kerja formal yang mendefinisikan aturan-aturan untuk membentuk kalimat (string) yang valid dalam sebuah bahasa. Secara formal, ini adalah sekumpulan dari empat komponen utama:
> > 1. **Simbol Non-Terminal (Variabel):** Ini adalah simbol-simbol abstrak yang dapat diturunkan atau dipecah lagi menjadi simbol lain. Mereka berfungsi sebagai "placeholder" untuk struktur yang lebih kompleks. Biasanya direpresentasikan dengan huruf besar (contoh: `<Expression>`, `A`, `B`).
> > 2. **Simbol Terminal:** Ini adalah simbol-simbol dasar atau "kata-kata" aktual dari bahasa yang tidak bisa diturunkan lagi. Biasanya direpresentasikan dengan huruf kecil, angka, atau simbol operator (contoh: `a`, `+`, `32`).
> > 3. **Simbol Awal (Start Symbol):** Satu simbol non-terminal khusus yang menjadi titik awal dari semua proses penurunan untuk menghasilkan sebuah kalimat.
> >  4. **Aturan Produksi:** Inti dari tata bahasa yang mendefinisikan bagaimana simbol non-terminal dapat diubah atau diperluas menjadi kombinasi simbol terminal dan/atau non-terminal lainnya.
> >    
> >
> > ### Peran Aturan Produksi
> >
> > **Aturan produksi** adalah jantung dari sebuah tata bahasa. Fungsinya adalah untuk mendefinisikan transformasi dari satu bentuk string ke bentuk lainnya. Aturan ini menentukan legalitas struktur sebuah bahasa.
> >
> > - **Format Umum:** `α → β`
> >    
> >    - **α (Alpha):** Ruas kiri, berisi setidaknya satu simbol non-terminal.
> >        
> >    - **β (Beta):** Ruas kanan, berisi kombinasi simbol terminal dan/atau non-terminal yang merupakan hasil "penurunan" atau "penggantian" dari ruas kiri.
> >       
> > - **Analogi:** Bayangkan aturan produksi seperti resep dalam buku masak. `α` adalah nama hidangan (misalnya, "Adonan Kue"), dan `β` adalah bahan-bahan dan langkah-langkah untuk membuatnya (misalnya, "Tepung + Gula + Telur"). Dengan mengikuti resep-resep ini, kita bisa membuat "kue" (kalimat valid) dari bahan-bahan dasar.
> >    
> >
> > ### Perbedaan Syntax dan Semantic
> >
> > **Syntax** dan **Semantic** adalah dua konsep fundamental yang mengatur bahasa, termasuk bahasa pemrograman.
> > 
> > - **Syntax (Sintaksis):** Merujuk pada **struktur** atau **bentuk** dari sebuah kalimat. Ini adalah seperangkat aturan yang menentukan apakah sebuah kombinasi simbol atau kata adalah valid secara gramatikal, tanpa memperdulikan artinya.
> >   
> >   - **Contoh:** Dalam bahasa C, `int x = 5;` adalah sintaks yang valid. Sebaliknya, `int = x 5;` adalah sintaks yang tidak valid.
> >        
> >- **Semantic (Semantik):** Merujuk pada **makna** dari sebuah kalimat yang sudah valid secara sintaksis. Ini menentukan apa yang seharusnya dilakukan oleh program atau apa arti dari instruksi tersebut.
> >    
> >    - **Contoh:** Sintaks `x = a + b;` adalah valid. Semantiknya adalah: "ambil nilai dari variabel `a`, tambahkan dengan nilai dari variabel `b`, lalu simpan hasilnya ke dalam variabel `x`." Kesalahan semantik bisa terjadi jika `a` dan `b` adalah string, karena operasi `+` mungkin tidak terdefinisi untuk tipe data tersebut.
> >
> > ### Hirarki Chomsky
> >
> > Diperkenalkan oleh Noam Chomsky pada tahun 1950-an, **Hirarki Chomsky** adalah sebuah sistem klasifikasi yang mengelompokkan tata bahasa formal ke dalam empat tingkatan (tipe) berdasarkan kompleksitas dan batasan pada aturan produksinya. Hirarki ini bersifat inklusif, artinya bahasa yang lebih sederhana merupakan subset dari bahasa yang lebih kompleks.
> > 
> > 1. **Tipe 3: Bahasa Reguler (Regular Language)**
> >     
> >     - **Aturan Produksi:** Paling ketat. Ruas kiri adalah satu variabel, dan ruas kanan maksimal memiliki satu variabel yang harus berada di posisi paling kanan (`A → a` atau `A → aB`).
> >         
> >     - **Mesin Pengenal:** Finite State Automata (FSA), baik DFA maupun NFA. Mesin ini tidak memiliki memori.
> >         
> >     - **Kegunaan:** Mengenali pola-pola sederhana seperti identifier, angka, dan kata kunci dalam analisis leksikal (scanning).
> >         
> > 2. **Tipe 2: Bahasa Bebas Konteks (Context-Free Language/CFL)**
> >     
> >     - **Aturan Produksi:** Ruas kiri harus **tepat satu simbol variabel** (`A → α`, di mana `α` adalah kombinasi variabel dan terminal). Aturan ini "bebas konteks" karena `A` dapat diganti dengan `α` di mana pun ia muncul.
> >         
> >     - **Mesin Pengenal:** Pushdown Automata (PDA). Mesin ini adalah FSA yang dilengkapi dengan satu stack sebagai memori.
> >         
> >     - **Kegunaan:** Ini adalah subjek utama kita. Digunakan untuk mendefinisikan sintaks sebagian besar bahasa pemrograman (struktur `if-then-else`, loop, ekspresi aritmatika).
> >         
> > 3. **Tipe 1: Bahasa Sensitif Konteks (Context-Sensitive Language)**
> >     
> >     - **Aturan Produksi:** Lebih longgar dari Tipe 2. Panjang string di ruas kiri harus lebih kecil atau sama dengan panjang string di ruas kanan (`|α| ≤ |β|`). Aturan ini memungkinkan "konteks" karena beberapa simbol di sekitar variabel dapat memengaruhi produksi.
> >         
> >     - **Mesin Pengenal:** Linear Bounded Automata (LBA). Ini adalah Mesin Turing yang ruang pitanya dibatasi sebanding dengan panjang input.
> >         
> >     - **Kegunaan:** Mengenali bahasa yang memerlukan pencocokan jumlah, seperti `aⁿbⁿcⁿ`, yang tidak dapat ditangani oleh CFG.
> >         
> > 4. **Tipe 0: Bahasa Tanpa Batasan (Unrestricted Language)**
> >     
> >     - **Aturan Produksi:** Tidak ada batasan sama sekali pada aturan produksi, selama ruas kiri tidak kosong.
> >         
> >     - **Mesin Pengenal:** Mesin Turing. Model komputasi paling kuat yang diketahui.
> >         
> >     - **Kegunaan:** Secara teoretis mampu mendeskripsikan semua bahasa yang dapat dihitung (computable), termasuk bahasa alami manusia yang sangat kompleks dan ambigu.
> >         

> [!cornell] #### Summary
> 
> **Hirarki Chomsky adalah sebuah kerangka kerja fundamental yang mengklasifikasikan bahasa formal ke dalam empat tingkatan bersarang (Tipe 3 hingga Tipe 0) berdasarkan tingkat restriksi aturan produksinya, di mana setiap tingkatan memiliki kekuatan ekspresif yang meningkat dan berkorespondensi dengan model mesin komputasi yang lebih kuat. Dalam hirarki ini, Context-Free Grammar (CFG) menempati posisi krusial sebagai Tipe 2, yang diakui oleh Pushdown Automata dan menjadi dasar teoritis untuk analisis sintaksis sebagian besar bahasa pemrograman modern, menjembatani kesenjangan antara pola reguler sederhana dan kompleksitas bahasa yang sensitif terhadap konteks.**

> [!ad-libitum]- Additional Information
> 
> #### Mengapa Hirarki ini Penting untuk Ilmu Komputer?
> 
> Hirarki Chomsky memberikan peta jalan bagi para perancang kompilator dan bahasa. Saat merancang bahasa baru, mereka dapat bertanya:
> 
> - "Apakah sintaks fitur ini bisa dikenali oleh FSA (Reguler)?" Jika ya, ini sangat efisien.
>     
> - "Apakah kita membutuhkan PDA (Context-Free)?" Sebagian besar sintaks bahasa pemrograman berada di sini.
>     
> - "Apakah ada aturan yang Context-Sensitive?" Misalnya, aturan bahwa variabel harus dideklarasikan sebelum digunakan.
>     
> 
> Mengetahui di mana sebuah masalah bahasa berada dalam hirarki ini menentukan seberapa kompleks algoritma (parser) yang dibutuhkan untuk menyelesaikannya.
> 
> #### Bahasa Pemrograman: Sebagian Besar Context-Free
> 
> Meskipun struktur utama bahasa pemrograman (seperti loop, ekspresi) adalah Context-Free, banyak aturan lain yang sebenarnya bersifat Context-Sensitive. Contoh klasik adalah "sebuah variabel harus dideklarasikan sebelum digunakan." Aturan ini tidak dapat diverifikasi hanya dengan CFG karena grammar tidak memiliki "memori" untuk mengingat deklarasi sebelumnya. Masalah ini dalam kompilator diselesaikan pada fase **analisis semantik**, biasanya menggunakan alat bantu seperti **tabel simbol**, bukan pada fase parsing murni.