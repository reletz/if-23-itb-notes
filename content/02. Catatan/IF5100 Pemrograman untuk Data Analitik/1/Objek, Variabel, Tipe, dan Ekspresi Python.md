---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Objek, Variabel, Tipe, dan Ekspresi Python
>
> > ## Questions/Cues
> >
> > - Apa isi sebuah program Python dan apa beda definisi vs command?
> > - Apa arti "semua di Python adalah objek" dan apa itu objek scalar vs non-scalar?
> > - Apa empat tipe scalar dasar dan bagaimana melakukan cast antar tipe?
> > - Bagaimana aturan tipe hasil operator aritmetika pada int dan float?
> > - Apa arti Python bertipe "strong tapi dynamic"?
> > - Apa yang terjadi di memori saat variabel di-assign ulang?
> >
> > ## Reference Points
> >
> > - IF5100 — Python Review (Slides 10-22)
>
> > ### Program, Definisi, dan Command
> >
> > Sebuah program Python adalah **sekuens definisi dan command**. **Definisi** dievaluasi, sedangkan **command (statement)** dieksekusi oleh interpreter di dalam shell dan menginstruksikan interpreter melakukan sesuatu. Command bisa diketik langsung di shell, atau disimpan dalam file yang lalu dibaca dan dievaluasi oleh shell.
> >
> > ### Objek dan Tipe
> >
> > Program memanipulasi **objek data**. Setiap objek punya **tipe** yang menentukan operasi apa yang bisa dikenakan padanya — analogi: Ana adalah manusia sehingga bisa berjalan dan berbahasa Inggris; Chewbacca adalah wookiee sehingga bisa berjalan dan "mwaaarhrhh". Objek Python dibagi menjadi **scalar** (tak bisa dipecah lagi) dan **non-scalar** (punya struktur internal yang bisa diakses). Di Python, **semua adalah objek** — bahkan angka: coba `(5).__add__(6)` yang setara dengan `5 + 6`.
> >
> > ### Objek Scalar dan type()
> >
> > Empat tipe scalar dasar:
> >
> > | Tipe | Arti | Contoh |
> > |---|---|---|
> > | `int` | bilangan bulat | `5` |
> > | `float` | bilangan real | `3.27` |
> > | `bool` | nilai Boolean | `True`, `False` |
> > | `NoneType` | tipe khusus dengan satu nilai | `None` |
> >
> > Fungsi `type()` menampilkan tipe sebuah objek: `type(5)` → `int`, `type(3.0)` → `float`, `type("hello")` → `str`.
> >
> > ### Konversi Tipe (Cast)
> >
> > Objek satu tipe bisa dikonversi ke tipe lain:
> >
> > - `float(3)` → `3.0` (int ke float)
> > - `int(3.9)` → `3` (float **dipotong/truncate**, bukan dibulatkan)
> > - `int("3")` → `3` (string ke int)
> > - `int("hello")` → **error** (string bukan representasi angka)
> >
> > ### Ekspresi dan Operator
> >
> > **Ekspresi** menggabungkan objek dan operator; setiap ekspresi punya **nilai** yang punya **tipe**. Bentuk sederhana: `<objek> <operator> <objek>`.
> >
> > Operator pada int dan float — **jika keduanya int hasilnya int; jika salah satu atau keduanya float hasilnya float**:
> >
> > - `i + j` jumlah, `i - j` selisih, `i * j` hasil kali
> > - `i / j` pembagian (**selalu menghasilkan float**)
> > - `i % j` sisa bagi (modulo)
> > - `i ** j` i pangkat j
> >
> > ### Sistem Tipe Python: Strong tapi Dynamic
> >
> > Ada dua sumbu klasifikasi sistem tipe: **strong vs weak** (seberapa ketat bahasa mencegah operasi antar tipe yang tidak kompatibel) dan **static vs dynamic** (kapan tipe diperiksa — saat kompilasi atau saat runtime). **Python bersifat strong tapi dynamic**: `3 + "hi"` langsung error (strong — tidak ada koersi diam-diam), tetapi tipe sebuah nama baru diketahui saat program berjalan dan bisa berubah (dynamic).
> >
> > ### Binding Variabel ke Nilai
> >
> > Tanda `=` adalah **assignment**: mengikat sebuah **nama variabel** ke sebuah **nilai** yang tersimpan di memori.
> >
> > ```python
> > pi = 3.14159
> > pi_approx = 22/7
> > ```
> >
> > Nilai yang terkait sebuah nama diperoleh kembali dengan menyebut namanya (mis. mengetik `pi`). Nama bisa **di-bind ulang** lewat assignment baru; nilai lama mungkin masih ada di memori tetapi *handle*-nya hilang. Penting: **nilai turunan tidak otomatis dihitung ulang** saat salah satu inputnya berubah.
> >
> > ```python
> > pi = 3.14
> > radius = 2.2
> > area = pi * (radius ** 2)   # area = 15.1976
> > radius = radius + 1         # radius jadi 3.2, TAPI area tetap 15.1976
> > ```
> >
> > ```mermaid
> > flowchart LR
> >     pi["pi"] --> v314["3.14"]
> >     radius["radius"] -. binding lama .-> v22["2.2"]
> >     radius --> v32["3.2"]
> >     area["area"] --> v151["15.1976 (tak ikut berubah)"]
> > ```
> >
> > ### String
> >
> > **String** memuat huruf, karakter khusus, spasi, digit, unicode, biner — diapit **kutip tunggal atau ganda**. String multiline diapit **tiga kutip** tunggal/ganda.
> >
> > ```python
> > hi = 'hello there'
> > hello = "world"
> > doc = """This is
> > a document"""
> > ```
> >
> > Operasi: **konkatenasi** dengan `+` dan **repetisi** dengan `*`.
> >
> > ```python
> > name = "ana"
> > greet = hi + name            # "hello thereana"
> > silly = hi + " " + name * 3  # "hello there anaanaana"
> > ```
> >
> > ### Input dan Output Dasar
> >
> > `input(prompt)` mengambil masukan (**selalu bertipe string**) dari keyboard konsol; `print(...)` menampilkan keluaran ke layar konsol.
> >
> > ```python
> > text = input("Type anything... ")
> > print(5 * text)
> > ```
> >
> > Jika pengguna mengetik `2`, `text` adalah string `"2"`, sehingga `5 * text` menghasilkan `"22222"` (repetisi string), **bukan** `10`.

> [!cornell] #### Summary
>
> Program Python adalah sekuens **definisi** (dievaluasi) dan **command** (dieksekusi interpreter). Semua data adalah **objek** dengan **tipe** yang menentukan operasi validnya; objek **scalar** (`int`, `float`, `bool`, `NoneType`) tak bisa dipecah, non-scalar punya struktur internal. `type()` memeriksa tipe; cast lewat `int()`, `float()`, `str()` — `int()` **memotong** float, dan `int("hello")` error. **Ekspresi** `<objek> <operator> <objek>` punya nilai bertipe; aritmetika int menghasilkan int, tetapi hadirnya satu float (atau operator `/`) menghasilkan float. Python bertipe **strong** (tak ada koersi diam-diam, `3 + "hi"` error) tetapi **dynamic** (tipe diketahui saat runtime). `=` **mengikat nama ke nilai** di memori; assignment ulang mengganti binding, dan **nilai turunan seperti `area` tidak dihitung ulang otomatis**. String diapit kutip tunggal/ganda (tiga kutip untuk multiline), mendukung konkatenasi `+` dan repetisi `*`; `input()` selalu mengembalikan string.

> [!ad-libitum]- Additional Information
>
> #### Identitas, Kesetaraan, dan `id()`
>
> `==` menguji **kesetaraan nilai**, sedangkan `is` menguji **identitas objek** (apakah dua nama menunjuk objek yang sama di memori). `id(x)` mengembalikan alamat identitas objek. Python melakukan *caching* untuk int kecil (−5..256) dan sebagian string, sehingga `a = 256; b = 256; a is b` bisa `True` — jangan diandalkan.
>
> #### f-string dan Format Output
>
> Sejak Python 3.6 tersedia **f-string**: `f"Luas = {area:.2f}"`. Lebih ringkas dan cepat dibanding `"...".format()` atau operator `%`. Untuk `print`, argumen `sep` dan `end` mengatur pemisah antar argumen dan karakter akhir baris.
>
> #### Pembagian Bulat dan Presisi Float
>
> `//` adalah **floor division** (`7 // 2 == 3`), berguna saat butuh hasil int. Float mengikuti IEEE 754 sehingga `0.1 + 0.2 != 0.3`; gunakan `math.isclose()` atau modul `decimal`/`fractions` bila presisi penting.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis kalkulator BMI yang membaca berat dan tinggi lewat `input()`, meng-cast ke `float`, lalu menampilkan hasil dengan f-string 1 desimal. Uji apa yang terjadi bila input kosong atau berisi huruf.
> 2. Visualisasikan contoh `pi/radius/area` di [pythontutor.com](https://pythontutor.com) langkah demi langkah, lalu jelaskan mengapa `area` tak berubah setelah `radius` di-bind ulang.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 2 (Branching, Types, Strings).
> - Dokumentasi Python: *Built-in Types*, *Text Sequence Type — str*.
> - MIT OCW 6.0001, *Lecture 2: Branching and Iteration*.
