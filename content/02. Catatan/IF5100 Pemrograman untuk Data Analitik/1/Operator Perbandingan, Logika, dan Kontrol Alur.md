---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Operator Perbandingan, Logika, dan Kontrol Alur
>
> > ## Questions/Cues
> >
> > - Apa saja operator perbandingan dan tipe apa hasilnya?
> > - Bagaimana `not`, `and`, `or` bekerja pada bool?
> > - Mengapa indentasi penting di Python?
> > - Bagaimana struktur dan semantik loop `while`?
> > - Apa yang dilakukan `range(start, stop, step)` dan nilai defaultnya?
> > - Apa efek `break` dan kapan memilih `for` vs `while`?
> >
> > ## Reference Points
> >
> > - IF5100 — Python Review (Slides 23-33)
>
> > ### Operator Perbandingan
> >
> > Untuk variabel `i` dan `j`, operator berikut mengevaluasi ke sebuah **Boolean**:
> >
> > - `i > j`, `i >= j`, `i < j`, `i <= j`
> > - `i == j` — uji **kesetaraan**, `True` bila `i` sama dengan `j`
> > - `i != j` — uji **ketidaksetaraan**, `True` bila `i` tidak sama dengan `j`
> >
> > Perbandingan string dilakukan **leksikografis** berdasarkan urutan kode karakter (`"apple" < "banana"`, dan huruf besar mendahului huruf kecil karena kode ASCII-nya lebih kecil). Untuk objek non-primitif, perbandingan bergantung pada bagaimana kelasnya mendefinisikan method seperti `__eq__` dan `__lt__`; tanpa itu `==` jatuh ke perbandingan identitas.
> >
> > ### Operator Logika pada Bool
> >
> > Untuk `a` dan `b` bernilai Boolean:
> >
> > - `not a` → `True` bila `a` adalah `False`
> > - `a and b` → `True` bila keduanya `True`
> > - `a or b` → `True` bila salah satu atau keduanya `True`
> >
> > Pada nilai non-Boolean, Python memakai konsep *truthiness*: nilai seperti `0`, `""`, `[]`, `None` dianggap "falsy", selain itu "truthy". `and`/`or` melakukan **short-circuit** dan mengembalikan salah satu **operan**, bukan selalu `True`/`False` — mis. `"" or "default"` menghasilkan `"default"`, `3 and 5` menghasilkan `5`.
> >
> > ### Percabangan dan Indentasi
> >
> > Pada percabangan, `<condition>` bernilai `True` atau `False`; blok di bawahnya dieksekusi hanya bila `<condition>` bernilai `True`.
> >
> > ```python
> > if x > 0:
> >     print("positif")
> > elif x == 0:
> >     print("nol")
> > else:
> >     print("negatif")
> > ```
> >
> > **Indentasi menentukan blok kode di Python** — bukan sekadar gaya, melainkan sintaks. Blok yang tertekuk sama dalam merupakan satu kesatuan. Gunakan IDE untuk menjaga konsistensi indentasi.
> >
> > ### Perulangan while
> >
> > ```python
> > while <condition>:
> >     <expression>
> >     <expression>
> >     ...
> > ```
> >
> > `<condition>` dievaluasi ke Boolean; bila `True`, seluruh langkah dalam blok dijalankan, lalu `<condition>` **diperiksa lagi**, berulang sampai `<condition>` bernilai `False`. Programmer bertanggung jawab memastikan kondisi akhirnya menjadi `False` (jika tidak → loop tak berujung).
> >
> > ```mermaid
> > flowchart TD
> >     S["Mulai"] --> C{"condition True?"}
> >     C -->|Ya| B["Jalankan blok"]
> >     B --> C
> >     C -->|Tidak| E["Lanjut setelah loop"]
> > ```
> >
> > ### Perulangan for dan range()
> >
> > `for` memperpendek iterasi melalui sekuens angka:
> >
> > ```python
> > # dengan while
> > n = 0
> > while n < 5:
> >     print(n)
> >     n = n + 1
> >
> > # shortcut dengan for
> > for n in range(5):
> >     print(n)
> > ```
> >
> > Bentuk umum: `for <variable> in range(<some_num>):`. Tiap iterasi `<variable>` mengambil nilai — mulai dari yang terkecil, lalu bertambah tiap putaran. `range(start, stop, step)` dengan **default `start = 0` dan `step = 1`**; loop berjalan hingga nilai `stop - 1` (batas atas eksklusif).
> >
> > ### break dan for vs while
> >
> > `break` **langsung keluar dari loop tempat ia berada**, melewati sisa ekspresi di blok, dan **hanya keluar dari loop terdalam**:
> >
> > ```python
> > while <condition_1>:
> >     while <condition_2>:
> >         <expression_a>
> >         break          # keluar hanya dari while dalam
> >         <expression_b> # tak pernah dijalankan
> >     <expression_c>     # tetap dijalankan
> > ```
> >
> > Pemilihan: gunakan **`for`** bila jumlah iterasi atau sekuensnya diketahui di muka (menghitung, iterasi koleksi); gunakan **`while`** bila perulangan bergantung pada kondisi yang baru diketahui saat runtime (mis. "ulangi sampai pengguna memasukkan nilai valid"). `for` cenderung lebih ringkas dan kecil kemungkinan lupa memperbarui counter.

> [!cornell] #### Summary
>
> Operator perbandingan (`>`, `>=`, `<`, `<=`, `==`, `!=`) menghasilkan **Boolean**; string dibandingkan **leksikografis**, objek non-primitif bergantung pada method `__eq__`/`__lt__`. Operator logika `not`, `and`, `or` bekerja pada bool, dan pada nilai lain mengikuti *truthiness* dengan **short-circuit** yang mengembalikan salah satu operan. **Indentasi adalah sintaks** penanda blok. Loop **`while <condition>`** mengulang selama kondisi `True` dan memerlukan jaminan terminasi; **`for ... in range(start, stop, step)`** (default `start=0`, `step=1`, batas atas `stop-1`) adalah shortcut untuk iterasi terhitung. **`break`** keluar dari loop **terdalam** saja. Pilih `for` untuk iterasi yang jumlahnya diketahui, `while` untuk perulangan berbasis kondisi runtime.

> [!ad-libitum]- Additional Information
>
> #### `continue`, `else` pada Loop, dan `enumerate`
>
> Selain `break`, ada `continue` yang melompat ke iterasi berikutnya. Loop Python bisa punya klausa `else` yang dijalankan **hanya bila loop selesai tanpa `break`** — berguna untuk pola pencarian. `for i, v in enumerate(seq):` memberi indeks dan nilai sekaligus tanpa `range(len(...))`.
>
> #### Apakah `break` Praktik yang Baik?
>
> Perdebatan klasik: `break`/`continue` bisa membuat alur sulit dilacak (mirip kritik terhadap `goto`), tetapi *early exit* sering **lebih jelas** daripada menumpuk kondisi bersarang atau flag boolean. Konsensus modern: gunakan seperlunya untuk mempersingkat *guard*, hindari bila membuat logika loop tersebar.
>
> #### De Morgan dan Penyederhanaan Kondisi
>
> `not (a and b)` setara `(not a) or (not b)`; `not (a or b)` setara `(not a) and (not b)`. Hukum De Morgan sering dipakai membalik kondisi `while` menjadi bentuk yang lebih mudah dibaca.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan penyelesai labirin sederhana bergaya "loop selama belum sampai finish": representasikan labirin sebagai list of list, lalu telusuri dengan `while` + arah gerak.
> 2. Tulis validasi input: minta pengguna memasukkan bilangan 1-10, ulangi dengan `while` sampai valid, gunakan `break` saat berhasil, dan bandingkan keterbacaannya dengan versi tanpa `break`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 2-3 (Branching, Iteration).
> - Dokumentasi Python: *More Control Flow Tools* (`break`, `continue`, `else` on loops, `range`).
> - MIT OCW 6.0001, *Lecture 2-3*.
