---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Rekursi - Konsep, Base Case, dan Recursive Step
>
> > ## Questions/Cues
> >
> > - Apa itu rekursi dan apa contohnya di luar pemrograman?
> > - Apa beda memandang rekursi secara *algoritmik* dan *semantik*?
> > - Apa syarat agar rekursi tidak menjadi tak berujung?
> > - Bagaimana masalah iteratif diterjemahkan ke bentuk rekursif (contoh perkalian)?
> > - Apa resep umum membuat algoritma rekursif?
> > - Apa trade-off antara iterasi dan rekursi?
> >
> > ## Reference Points
> >
> > - IF5100 — Recursion (Slides 3-9, 12)
>
> > ### Apa Itu Rekursi
> >
> > **Rekursi** adalah proses mengulang item dengan cara **serupa-diri** (*self-similar*) — sesuatu didefinisikan atau dikerjakan dengan merujuk pada bentuk dirinya yang lebih kecil. Contoh di luar kode:
> >
> > - Kewarganegaraan "*birthright*" didefinisikan sebagai: setiap anak yang lahir **di dalam** negara, **ATAU** setiap anak yang lahir dalam pernikahan **di luar** negara yang salah satu orang tuanya adalah **warga negara** — definisi "warga negara" memakai kata "warga negara".
> > - "PHP" adalah akronim dari "**PHP**: Hypertext Preprocessor" — akronim yang memuat dirinya sendiri.
> >
> > ### Dua Sudut Pandang
> >
> > **Secara algoritmik**, rekursi adalah cara merancang solusi dengan **divide-and-conquer** atau **decrease-and-conquer**: sebuah masalah **direduksi menjadi versi lebih sederhana dari masalah yang sama**.
> >
> > **Secara semantik**, rekursi adalah teknik pemrograman di mana **sebuah fungsi memanggil dirinya sendiri**. Tujuannya adalah **menghindari rekursi tak berujung** (*infinite recursion*), yang menuntut dua hal:
> >
> > - Ada **satu atau lebih base case** yang mudah diselesaikan langsung (tanpa pemanggilan rekursif).
> > - **Recursive step** menyelesaikan masalah yang sama pada input lain, dengan tujuan **menyederhanakan** input menuju base case.
> >
> > ### Dari Iteratif ke Rekursif: Contoh Perkalian
> >
> > "Kalikan `a * b`" setara dengan "jumlahkan `a` ke dirinya sendiri sebanyak `b` kali".
> >
> > Solusi **iteratif** menangkap komputasi dalam **state variable** yang diperbarui tiap putaran loop — sebuah penghitung yang turun dari `b` sampai `0`, dan `result` yang bertambah `a`:
> >
> > ```python
> > def multiply_iter(a, b):
> >     result = 0
> >     while b > 0:
> >         result += a
> >         b -= 1
> >     return result
> > ```
> >
> > Solusi **rekursif** memikirkan cara mereduksi masalah ke versi lebih kecil. `a * b = a + a * (b-1)`, dan saat `b == 1` jawabannya langsung `a` (**base case**):
> >
> > ```python
> > def mult(a, b):
> >     if b == 1:            # base case
> >         return a
> >     else:                 # recursive step
> >         return a + mult(a, b - 1)
> > ```
> >
> > ```mermaid
> > flowchart TD
> >     A["mult(a, 4)"] --> B["a + mult(a, 3)"]
> >     B --> C["a + mult(a, 2)"]
> >     C --> D["a + mult(a, 1)"]
> >     D --> E["base case: kembalikan a"]
> >     E -->|"unwind"| D
> >     D -->|"unwind"| C
> >     C -->|"unwind"| B
> >     B -->|"unwind"| A
> > ```
> >
> > ### Resep Membuat Algoritma Rekursif
> >
> > 1. **Tentukan input yang jawabannya sudah kita ketahui** — ini menjadi **base case**.
> > 2. **Reduksi masalahnya** — tulis ulang dalam bentuk sesuatu yang lebih sederhana untuk mendekati base case, yaitu memanggil kembali fungsi dengan input yang lebih sederhana. Ini menjadi **recursive step**.
> >
> > ### Contoh: Factorial
> >
> > `n! = n * (n-1) * (n-2) * ... * 1`.
> >
> > - Untuk `n` berapa kita tahu jawabannya? `n == 1` → `1! = 1` (**base case**).
> > - Bagaimana mereduksi? `n! = n * (n-1)!` (**recursive step**).
> >
> > ```python
> > def factorial(n):
> >     if n == 1:
> >         return 1
> >     else:
> >         return n * factorial(n - 1)
> > ```
> >
> > ### Iterasi vs Rekursi
> >
> > - Rekursi **bisa lebih sederhana dan intuitif** — kodenya sering lebih pendek dan lebih dekat ke definisi matematis masalah.
> > - Rekursi **efisien dari sudut pandang programmer** (waktu berpikir dan menulis).
> > - Rekursi **bisa kurang efisien dari sudut pandang komputer**: setiap pemanggilan fungsi menambah *frame* baru di **call stack** (biaya memori dan waktu), dan rekursi naif dapat mengulang komputasi yang sama berkali-kali.

> [!cornell] #### Summary
>
> **Rekursi** adalah pengulangan item secara **serupa-diri**. Secara **algoritmik** ia mereduksi masalah menjadi **versi lebih sederhana dari masalah yang sama** (divide/decrease-and-conquer); secara **semantik** ia adalah **fungsi yang memanggil dirinya sendiri**. Agar tidak tak berujung, wajib ada **≥1 base case** yang mudah plus **recursive step** yang menyederhanakan input menuju base case. Contoh perkalian: `mult(a, b) = a + mult(a, b-1)` dengan base `b == 1 → a`; factorial: `n * factorial(n-1)` dengan base `n == 1 → 1`. **Resepnya**: tentukan input yang jawabannya diketahui (base case), lalu tulis ulang masalah dalam bentuk lebih sederhana (recursive step). Dibanding iterasi, rekursi lebih ringkas dan intuitif bagi programmer tetapi lebih mahal bagi komputer karena pertambahan **call stack** dan potensi komputasi berulang.

> [!ad-libitum]- Additional Information
>
> #### Call Stack, `RecursionError`, dan Tail Call
>
> Python membatasi kedalaman rekursi (default ±1000, lihat `sys.getrecursionlimit()` / `sys.setrecursionlimit()`); melewatinya memicu `RecursionError`. Python **tidak** melakukan *tail-call optimization*, jadi rekursi yang dalam sebaiknya ditulis iteratif atau dengan struktur data stack eksplisit. Bahasa fungsional (Scheme, Haskell) mengoptimasi *tail call* sehingga rekursi ekor berjalan dalam ruang konstan.
>
> #### Memoization: Menambal Komputasi Berulang
>
> Rekursi naif seperti Fibonacci mengulang subproblem secara eksponensial. **Memoization** (menyimpan hasil subproblem) atau `functools.lru_cache` menurunkannya ke linear. Ini jembatan menuju **dynamic programming**, di mana subproblem yang tumpang tindih diselesaikan sekali dan disimpan.
>
> #### Rekursi Berganda dan Pohon Rekursi
>
> Bila recursive step memanggil dirinya lebih dari sekali (Fibonacci, Menara Hanoi, *merge sort*), eksekusinya membentuk **pohon rekursi**. Menganalisis tinggi pohon dan jumlah node memberi kompleksitas waktu — teknik yang diformalkan lewat *Master Theorem*.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis `sum_digits(n)` rekursif yang menjumlahkan digit sebuah bilangan bulat, lalu bandingkan dengan versi `while`.
> 2. Implementasikan `power(base, exp)` rekursif dua cara: linear (`base * power(base, exp-1)`) dan *fast exponentiation* (`exp` genap → kuadratkan). Hitung jumlah pemanggilan untuk `exp = 1024`.
> 3. Visualisasikan `factorial(5)` dan `mult(3, 4)` di [pythontutor.com](https://pythontutor.com) dan gambar sendiri call stack-nya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 4 (Recursion).
> - MIT OCW 6.0001, *Lecture 6: Recursion, Dictionaries*.
> - Dokumentasi Python: `sys.setrecursionlimit`, `functools.lru_cache`.
