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
> > - Apa itu Proses Penurunan (Parsing)?
> >     
> > - 2 Cara Penurunan?
> >     
> > - 2 Metode Parsing Utama?
> >     
> > - Bagaimana cara kerja Brute Force?
> >     
> > - Kelemahan Brute Force?
> >     
> > - Apa itu Rekursif Kiri?
> >     
> > - Bagaimana mengatasi Rekursif Kiri?
> >     
> > - Apa itu Recursive Descent Parser?
> >     
> > 
> > ## Reference Points
> > 
> > - Slide 10 - Parsing atau Proses Penurunan
> >     
> 
> > ### Proses Penurunan (Parsing)
> > 
> > **Parsing** adalah proses menganalisis sebuah string (urutan token) untuk menentukan struktur gramatikalnya berdasarkan aturan produksi dari sebuah tata bahasa formal. Tujuannya adalah untuk membangun sebuah pohon penurunan (parse tree) yang memvalidasi bahwa string tersebut memang valid menurut grammar.
> > 
> > ### Dua Cara Penurunan (Derivation)
> > 
> > Proses penurunan untuk menghasilkan sebuah string dari simbol awal dapat dilakukan melalui dua cara:
> > 
> > 1. **Penurunan Terkiri (Leftmost Derivation):** Pada setiap langkah, simbol non-terminal yang paling kiri yang akan diekspansi atau diturunkan terlebih dahulu.
> >     
> > 2. **Penurunan Terkanan (Rightmost Derivation):** Pada setiap langkah, simbol non-terminal yang paling kanan yang akan diturunkan terlebih dahulu.
> >     
> > 
> > Meskipun urutan penurunannya berbeda, jika sebuah string valid, kedua metode akan menghasilkan pohon sintaks yang sama.
> > 
> > ### Dua Metode Parsing Utama
> > 
> > Berdasarkan cara membangun pohon sintaks, metode parsing digolongkan menjadi dua kategori besar:
> > 
> > 1. **Top-Down Parsing:** Membangun pohon dari akar (simbol awal) ke bawah menuju daun (simbol terminal). Proses ini mencoba menemukan turunan paling kiri untuk sebuah input string.
> >     
> > 2. **Bottom-Up Parsing:** Membangun pohon dari daun ke atas menuju akar. Proses ini mencoba "mereduksi" input string kembali menjadi simbol awal.
> >     
> > 
> > ### Metode Top-Down: Brute Force
> > 
> > **Brute Force** adalah metode parsing top-down yang paling dasar dan intuitif. Cara kerjanya adalah dengan mencoba semua kemungkinan aturan produksi secara sistematis.
> > 
> > - **Proses:** Mulai dari simbol awal, metode ini akan memilih aturan produksi pertama dan mencoba mengembangkannya. Jika ekspansi ini tidak cocok dengan input string, ia akan **mundur (backtrack)** dan mencoba aturan produksi berikutnya. Proses ini berlanjut sampai seluruh string berhasil dicocokkan atau semua kemungkinan telah gagal.
> >     
> > 
> > ### Kelemahan Metode Brute Force
> > 
> > Meskipun sederhana, metode ini jarang digunakan dalam praktik karena memiliki kelemahan signifikan:
> > 
> > 1. **Lambat:** Mencoba semua kemungkinan aturan produksi memakan waktu eksekusi yang lama.
> >     
> > 2. **Memori Besar:** Perlu menyimpan jejak (backup) untuk setiap titik backtrack, yang memakan banyak memori.
> >     
> > 3. **Penanganan Kesalahan Buruk:** Sulit untuk memberikan pesan kesalahan yang spesifik karena parser terus mencoba-coba.
> >     
> > 4. **Masalah Rekursif Kiri:** Tidak dapat menangani tata bahasa yang memiliki aturan produksi rekursif kiri, karena akan menyebabkan **loop tak terbatas (infinite loop)**.
> >     
> > 
> > ### Masalah Rekursif Kiri (Left Recursion)
> > 
> > **Rekursif Kiri** terjadi ketika sebuah aturan produksi memiliki bentuk `A → Aβ`, di mana simbol non-terminal di ruas kiri (`A`) juga muncul sebagai simbol pertama di ruas kanan.
> > 
> > - **Contoh:** `E → E + T`
> >     
> > - **Masalah:** Saat parser top-down mencoba mengekspansi `E`, salah satu pilihannya adalah aturan `E → E + T`. Ini akan membuat parser mencoba mengekspansi `E` lagi, dan lagi, dan lagi, tanpa pernah mengonsumsi token input. Ini menciptakan sebuah loop tak berujung.
> >     
> > 
> > ### Menghilangkan Rekursif Kiri
> > 
> > Rekursif kiri harus dihilangkan dari sebuah grammar agar dapat di-parse menggunakan metode top-down. Ini dilakukan dengan mengubah aturan produksi.
> > 
> > - **Aturan Asli:**
> >     
> >     - Rekursif: `A → Aα1 | ... | Aαn`
> >         
> >     - Non-rekursif: `A → β1 | ... | βm`
> >         
> > - **Aturan Baru (setelah diubah):**
> >     
> >     - `A → β1Z | ... | βmZ`
> >         
> >     - `Z → α1Z | ... | αnZ | ε` (ε = string kosong)
> >         
> > 
> > Dengan transformasi ini, penurunan akan dimulai dengan salah satu `β` (yang tidak rekursif) dan kemudian diikuti oleh bagian rekursif `α` yang di-handle oleh variabel baru `Z`.
> > 
> > ### Metode Top-Down: Recursive Descent Parser
> > 
> > **Recursive Descent Parser** adalah metode top-down yang lebih efisien dan tidak memerlukan backtrack. Ini adalah salah satu metode yang paling umum untuk mengimplementasikan parser secara manual.
> > 
> > - **Konsep Inti:** Sebuah prosedur atau fungsi ditulis untuk setiap simbol non-terminal dalam grammar.
> >     
> > - **Cara Kerja:**
> >     
> >     1. Proses parsing dimulai dengan memanggil prosedur untuk simbol awal.
> >         
> >     2. Setiap prosedur bertanggung jawab untuk "mengenali" bagian dari input string yang cocok dengan non-terminal tersebut.
> >         
> >     3. Ketika sebuah prosedur bertemu dengan non-terminal lain di aturan produksinya, ia akan memanggil prosedur yang bersesuaian.
> >         
> >     4. Ketika bertemu simbol terminal, ia akan mencocokkannya dengan token input saat ini dan maju ke token berikutnya.
> >         
> > 
> > Metode ini secara alami mengikuti alur dari grammar dan lebih mudah diimplementasikan, asalkan grammar-nya tidak memiliki rekursif kiri.

> [!cornell] #### Summary
> 
> **Parsing adalah proses membangun pohon sintaks dari sebuah string berdasarkan aturan grammar, yang dapat dilakukan dengan penurunan terkiri atau terkanan. Metode parsing utama adalah Top-Down (dari akar ke daun) dan Bottom-Up. Metode Top-Down sederhana seperti Brute Force bekerja dengan coba-coba dan backtrack, namun memiliki kelemahan besar yaitu tidak bisa menangani aturan rekursif kiri yang menyebabkan loop tak terbatas. Masalah ini harus diatasi dengan mengubah grammar sebelum dapat menggunakan metode Top-Down yang lebih canggih seperti Recursive Descent Parser, yang mengimplementasikan setiap non-terminal sebagai sebuah prosedur rekursif.**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: LL vs LR Parser
> 
> - **Recursive Descent Parser** adalah salah satu jenis dari **LL Parser**. LL berarti memproses input dari **L**eft-to-right dan membangun **L**eftmost derivation. LL parser termasuk dalam kategori Top-Down.
>     
> - **LR Parser** adalah jenis parser yang paling umum untuk kategori Bottom-Up. LR berarti memproses input dari **L**eft-to-right dan membangun **R**ightmost derivation secara terbalik. LR parser lebih kuat daripada LL parser karena dapat menangani kelas grammar yang lebih luas, termasuk rekursif kiri, tanpa modifikasi.
>     
> 
> #### Topik Teknis 2: Rekursif Kiri vs Asosiativitas Operator
> 
> Rekursif kiri, meskipun menjadi masalah untuk parser top-down, sebenarnya sangat berguna untuk mendefinisikan asosiativitas operator secara alami.
> 
> - **Asosiatif Kiri** (seperti `+`, `-`, `*`, `/`): `expr → expr + term`. Aturan rekursif kiri ini secara alami mengelompokkan operasi dari kiri ke kanan. `a - b - c` akan menjadi `(a - b) - c`.
>     
> - Asosiatif Kanan (seperti operator assignment = atau pangkat ^): expr → term ^ expr. Aturan rekursif kanan mengelompokkan dari kanan ke kiri. a = b = c akan menjadi a = (b = c).
>     
>     Saat menghilangkan rekursif kiri, kita harus memastikan bahwa asosiativitas operator tetap terjaga pada grammar yang baru.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba lakukan transformasi penghilangan rekursif kiri pada grammar ekspresi aritmatika berikut: `E → E + T | T` dan `T → T * F | F`.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Website:** "Crafting Interpreters" oleh Robert Nystrom adalah sumber online gratis yang luar biasa, memberikan panduan langkah demi langkah untuk membangun interpreter (termasuk parser recursive descent) dari awal.
>