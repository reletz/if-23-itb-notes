---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Dynamic Programming dan Memoization
>
> > ## Questions/Cues
> >
> > - Mengapa `fib(n)` rekursif biasa sangat boros, dan apa itu memoization?
> > - Apa dua syarat agar dynamic programming bekerja (optimal substructure dan overlapping subproblems)?
> > - Apakah 0/1 knapsack memenuhi kedua syarat itu, dan di mana subproblem yang tumpang tindih?
> > - Apa yang menjadi key memo di `fastMaxVal`, dan mengapa `len(toConsider)` cukup?
> > - Mengapa jumlah panggilan turun dari 65.536 ke sekitar 5.191 untuk 16 item?
> > - Apakah dynamic programming "mukjizat" yang mematahkan sifat eksponensial?
> >
> > ## Reference Points
> >
> > - IF5100 — Optimization Problems (Slides 31-47)
>
> > ### Fibonacci Rekursif dan Pekerjaan Berulang
> >
> > ```python
> > def fib(n):
> >     if n == 0 or n == 1:
> >         return 1
> >     else:
> >         return fib(n - 1) + fib(n - 2)
> > ```
> >
> > Pohon panggilan `fib(6) = 13` menghitung `fib(4)`, `fib(3)`, dan seterusnya berkali-kali. Diverifikasi: `fib(6)` membuat **25 panggilan**, `fib(20)` membuat **21.891 panggilan**. Hasil `fib(120) = 8.670.007.398.507.948.658.051.921` jelas tidak mungkin dihitung dengan cara ini.
> >
> > ### Memoization
> >
> > Ide: **menukar waktu dengan ruang**. Buat tabel (memo) untuk mencatat apa yang sudah dihitung. Sebelum menghitung `fib(x)`, cek apakah sudah ada di tabel: jika ya, ambil; jika belum, hitung lalu simpan.
> >
> > ```python
> > def fastFib(n, memo = {}):
> >     """Assumes n is an int >= 0, memo used only by recursive calls
> >        Returns Fibonacci of n"""
> >     if n == 0 or n == 1:
> >         return 1
> >     try:
> >         return memo[n]
> >     except KeyError:
> >         result = fastFib(n-1, memo) + fastFib(n-2, memo)
> >         memo[n] = result
> >         return result
> > ```
> >
> > Dengan memo, `fastFib(6)` hanya butuh **11 panggilan** (dibanding 25), dan `fastFib(120)` selesai seketika.
> >
> > ### Kapan Dynamic Programming Bekerja?
> >
> > - **Optimal substructure**: solusi optimal global dapat dibangun dari solusi optimal subproblem lokal. Contoh: `fib(x) = fib(x-1) + fib(x-2)` untuk `x > 1`.
> > - **Overlapping subproblems**: mencari solusi optimal melibatkan penyelesaian subproblem yang sama berulang kali. Contoh: `fib(x)` dihitung berkali-kali.
> >
> > ### Apakah 0/1 Knapsack Memenuhi?
> >
> > Deck menunjukkan dengan menu kecil `a(6,3)`, `b(7,3)`, `c(8,2)`, `d(9,5)` dan budget 5 kalori. Setiap node pada search tree berbentuk `<taken, left, value, remaining>`. Pertanyaan yang diselesaikan di tiap node: **diberi sisa berat, maksimalkan nilai dengan memilih dari item yang tersisa**. Himpunan item yang sudah dipilih (bahkan nilainya) **tidak berpengaruh**. Karena itu subproblem ditentukan hanya oleh pasangan `(item tersisa, sisa kalori)`.
> >
> > Overlap muncul, misalnya, pada node `{a}, [c,d], sisa 2` dan `{b}, [c,d], sisa 2` (keduanya "pilih dari `[c,d]` dengan sisa 2"), serta `{a}, [d], sisa 2` dan `{b}, [d], sisa 2`. Perhatikan nilai himpunan yang berbeda (6 vs 7) tidak mengubah subproblem. Pada menu kecil ini `maxVal` melakukan 17 panggilan (17 node), sedangkan versi memo hanya 14 panggilan.
> >
> > ```mermaid
> > flowchart TD
> >     N0["0: {} | [a,b,c,d] | sisa 5"] --> N1["1: {a} | [b,c,d] | sisa 2"]
> >     N0 --> N6["6: {} | [b,c,d] | sisa 5"]
> >     N1 --> N2["2: {a} | [c,d] | sisa 2"]
> >     N6 --> N7["7: {b} | [c,d] | sisa 2"]
> >     N6 --> N11["11: {} | [c,d] | sisa 5"]
> >     N2 --> N4["4: {a} | [d] | sisa 2"]
> >     N7 --> N9["9: {b} | [d] | sisa 2"]
> >     N4 -.->|"subproblem sama: [d], sisa 2"| N9
> >     N2 -.->|"subproblem sama: [c,d], sisa 2"| N7
> > ```
> >
> > ### `fastMaxVal`: maxVal dengan Memo
> >
> > - Tambahkan `memo` sebagai argumen ketiga: `def fastMaxVal(toConsider, avail, memo = {})`.
> > - **Key** memo adalah tuple `(len(toConsider), avail)`; item yang tersisa cukup diwakili `len(toConsider)` karena selalu berupa sufiks dari list awal.
> > - **Pertama**, body mengecek apakah jawaban optimal untuk key itu sudah ada di memo; **terakhir**, body memperbarui memo.
> >
> > ```python
> > def fastMaxVal(toConsider, avail, memo = {}):
> >     if (len(toConsider), avail) in memo:
> >         result = memo[(len(toConsider), avail)]
> >     elif toConsider == [] or avail == 0:
> >         result = (0, ())
> >     elif toConsider[0].getCost() > avail:
> >         result = fastMaxVal(toConsider[1:], avail, memo)
> >     else:
> >         nextItem = toConsider[0]
> >         withVal, withToTake = fastMaxVal(toConsider[1:], avail - nextItem.getCost(), memo)
> >         withVal += nextItem.getValue()
> >         withoutVal, withoutToTake = fastMaxVal(toConsider[1:], avail, memo)
> >         if withVal > withoutVal:
> >             result = (withVal, withToTake + (nextItem,))
> >         else:
> >             result = (withoutVal, withoutToTake)
> >     memo[(len(toConsider), avail)] = result
> >     return result
> > ```
> >
> > ### Performa
> >
> > Dari deck (menu acak, budget 750):
> >
> > | `len(items)` | `2**len(items)` | Jumlah panggilan `fastMaxVal` |
> > | --- | --- | --- |
> > | 2 | 4 | 7 |
> > | 4 | 16 | 25 |
> > | 8 | 256 | 427 |
> > | 16 | 65.536 | 5.191 |
> > | 32 | 4.294.967.296 | 22.701 |
> > | 64 | 18.446.744.073.709.551.616 | 42.569 |
> > | 128 | Big | 83.319 |
> > | 256 | Really Big | 176.614 |
> > | 512 | Ridiculously big | 351.230 |
> > | 1024 | Absolutely huge | 703.802 |
> >
> > Verifikasi: `2**16 = 65.536`. Jumlah panggilan bergantung pada menu acak; saat dijalankan ulang dengan seed 0, 1, dan 2 untuk 16 item saya mendapat 5.192, 4.329, dan 6.964 panggilan, jadi angka 5.191 pada deck cocok dengan orde besarnya (ribuan, bukan puluhan ribu). Untuk 128 item hasil run saya sekitar 150.000, lebih besar dari 83.319 pada deck, sehingga angka pada tabel hanya satu contoh acak.
> >
> > ### Bukankah Itu Mukjizat?
> >
> > Tidak. Masalahnya tetap eksponensial dalam kasus terburuk; yang terjadi adalah **kompleksitas bisa halus**. Waktu `fastMaxVal` ditentukan oleh **jumlah pasangan berbeda** `<toConsider, avail>`: nilai `toConsider` dibatasi `len(items)`, dan nilai `avail` dibatasi jumlah **jumlah berat yang berbeda**. Bila berat berupa bilangan bulat kecil, pasangan berbeda jumlahnya terbatas sehingga cepat. Solusi selalu **benar**, dan cepat **di bawah kondisi yang tepat**.

> [!cornell] #### Summary
>
> **Memoization** menyimpan hasil subproblem dalam tabel agar tidak dihitung ulang (menukar waktu dengan ruang): `fib(6)` turun dari 25 ke 11 panggilan. **Dynamic programming** bekerja bila ada **optimal substructure** dan **overlapping subproblems**. 0/1 knapsack memenuhi keduanya karena subproblem hanya bergantung pada `(item tersisa, sisa kalori)`, bukan item yang sudah dipilih; `fastMaxVal` memakai memo dengan key `(len(toConsider), avail)`. Panggilan turun drastis (16 item: `2^16 = 65.536` vs sekitar 5 ribu), bukan karena masalah tak lagi eksponensial, melainkan karena waktu dibatasi oleh jumlah pasangan `<toConsider, avail>` yang berbeda. Greedy memberi solusi cepat tetapi belum tentu optimal; DP memberi solusi pasti benar dan sering cepat.

> [!ad-libitum]- Additional Information
>
> #### Jebakan Default Argument `memo = {}`
>
> Default argument dievaluasi **sekali** saat `def`, sehingga `memo` yang sama dipakai bersama oleh semua pemanggilan top-level. Untuk `fastFib` ini tidak berbahaya (nilai `fib(n)` selalu sama), tetapi untuk `fastMaxVal` berbahaya karena key hanya `(len(toConsider), avail)`: setelah `fastMaxVal(A, 5)` dengan 4 item, memanggil `fastMaxVal(B, 5)` untuk list `B` berbeda berpanjang 4 mengembalikan jawaban lama. Pada percobaan, hasil yang benar untuk `B` adalah 2 tetapi pemanggilan tanpa memo baru mengembalikan 15. Solusi aman: `memo=None` lalu `if memo is None: memo = {}`, atau teruskan `{}` baru di setiap pemanggilan top-level.
>
> #### Top-Down vs Bottom-Up
>
> Memoization adalah DP **top-down** (rekursif dengan cache). Bentuk **bottom-up** mengisi tabel secara iteratif, misalnya `dp[i][w]` untuk nilai terbaik dengan `i` item pertama dan kapasitas `w`, dengan waktu `O(n * W)` (pseudo-polinomial).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan penghitung panggilan ke `fib` dan `fastFib`, lalu buat tabel untuk `n = 5, 10, 20, 25`.
> 2. Jalankan `fastMaxVal` untuk menu acak 8, 16, 24 item dengan seed berbeda dan bandingkan jumlah panggilannya dengan `2**n`.
> 3. Ganti `memo = {}` dengan pola `memo=None` dan buktikan bahwa bug stale memo hilang.
> 4. Implementasikan versi bottom-up `dp[i][w]` untuk knapsack dan cocokkan hasilnya dengan `fastMaxVal`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 15.4 (Dynamic Programming).
> - MIT OCW 6.0002, *Lecture 2: Optimization Problems* (kode `lecture2.py`).
