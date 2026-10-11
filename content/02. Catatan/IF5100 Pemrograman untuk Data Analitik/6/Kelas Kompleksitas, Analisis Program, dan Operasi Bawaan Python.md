---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Kelas Kompleksitas, Analisis Program, dan Operasi Bawaan Python
>
> > ## Questions/Cues
> >
> > - Apa isi **Law of Addition** dan **Law of Multiplication**, dan kapan masing-masing dipakai?
> > - Apa saja kelas kompleksitas (konstan sampai eksponensial) dan contoh algoritma tiap kelas?
> > - Mengapa linear search pada list terurut dan tak terurut sama-sama O(n)?
> > - Bagaimana menentukan kompleksitas fungsi rekursif, dan mengapa Fibonacci rekursif O(2^n) sedangkan iteratifnya O(n)?
> > - Berapa biaya operasi umum pada **list** dan **dictionary** Python?
> >
> > ## Reference Points
> >
> > - IF5100 — Algorithmic Complexity (Slides 20-39)
>
> > ### Menganalisis Program: Dua Hukum
> >
> > Kompleksitas program dianalisis dengan menggabungkan kelas kompleksitas pernyataan di dalam fungsi, lalu fokus pada **dominant term**.
> >
> > - **Law of Addition**: untuk pernyataan **berurutan (sequential)**, `O(f(n)) + O(g(n))` adalah `O(f(n) + g(n))`.
> > - **Law of Multiplication**: untuk pernyataan **bersarang (nested)**, `O(f(n)) * O(g(n))` adalah `O(f(n) * g(n))`.
> >
> > ```python
> > # Addition: O(n) + O(n*n) = O(n + n^2) = O(n^2)
> > for i in range(n):
> >     print('a')
> > for j in range(n*n):
> >     print('b')
> >
> > # Multiplication: O(n) * O(n) = O(n^2)
> > for i in range(n):
> >     for j in range(n):
> >         print('a')
> > ```
> >
> > ### Kelas Kompleksitas
> >
> > | Kelas | Nama | Ciri umum |
> > |---|---|---|
> > | `O(1)` | konstan | tidak bergantung ukuran masalah |
> > | `O(log n)` | logaritmik | masalah dibelah (1/2, 1/5, 1/10, ...) tiap iterasi |
> > | `O(n)` | linear | loop iteratif sederhana atau rekursi sederhana |
> > | `O(n log n)` | log-linear | mis. **merge sort** |
> > | `O(n^c)` | polinomial | loop bersarang atau rekursi (c konstanta) |
> > | `O(c^n)` | eksponensial | banyak panggilan rekursif di tiap level |
> >
> > ```mermaid
> > flowchart LR
> >     A["O(1)"] --> B["O(log n)"] --> C["O(n)"] --> D["O(n log n)"] --> E["O(n^c)"] --> F["O(c^n)"]
> > ```
> >
> > Urutan dari kiri ke kanan adalah dari **tumbuh paling lambat** ke **paling cepat**. Perbandingan jumlah operasi:
> >
> > | Kelas | n=10 | n=100 | n=1000 | n=1.000.000 |
> > |---|---|---|---|---|
> > | O(1) | 1 | 1 | 1 | 1 |
> > | O(log n) | 1 | 2 | 3 | 6 |
> > | O(n) | 10 | 100 | 1000 | 1.000.000 |
> > | O(n log n) | 10 | 200 | 3000 | 6.000.000 |
> > | O(n^2) | 100 | 10.000 | 1.000.000 | 10^12 |
> > | O(2^n) | 1024 | ~1,27 x 10^30 | bilangan sangat besar | "Good luck!!" |
> >
> > ### Contoh per Kelas
> >
> > #### Konstan: Akses List
> >
> > Mengakses elemen ke-`i` list adalah **O(1)**: bila semua elemen `int`, alamatnya `base + 4*i`; bila heterogen, list menyimpan **referensi** ke objek lain sehingga akses tetap konstan.
> >
> > #### Linear: Linear Search
> >
> > ```python
> > def linear_search(L, e):
> >     found = False
> >     for i in range(len(L)):
> >         if e == L[i]:
> >             found = True
> >     return found
> > ```
> >
> > Pada list **tak terurut**, seluruh elemen harus diperiksa untuk memastikan `e` tidak ada: `O(len(L))` untuk loop dikali `O(1)` untuk tes `e == L[i]`, yakni `O(1 + 4n + 1) = O(4n + 2) = O(n)`. Mempercepat dengan `return True` lebih awal tidak mengubah worst case.
> >
> > Pada list **terurut**, pencarian boleh berhenti begitu bertemu angka lebih besar dari `e` (dua tes per iterasi: `L[i] == e` dan `L[i] > e`). Worst case tetap melihat seluruh list, sehingga tetap **O(n)**: order of growth sama walau waktu aktual bisa berbeda.
> >
> > #### Logaritmik: Integer ke String
> >
> > ```python
> > def intToStr(i):
> >     digits = '0123456789'
> >     if i == 0:
> >         return '0'
> >     res = ''
> >     while i > 0:
> >         res = digits[i % 10] + res
> >         i = i // 10
> >     return res
> > ```
> >
> > Tidak ada pemanggilan fungsi, isi `while` berlangkah konstan, dan jumlah iterasi sama dengan berapa kali `i` bisa dibagi 10, yaitu **O(log i)**. (Kode slide mengembalikan `result`; seharusnya `res`.)
> >
> > #### Log-linear
> >
> > Kompleksitas tumbuh sebesar log ukuran input dikali ukuran input, **O(n log n)**. Banyak algoritma praktis berkelas ini; yang paling umum adalah **merge sort**.
> >
> > #### Polinomial: Cek Subset
> >
> > ```python
> > def isSubset(L1, L2):
> >     for e1 in L1:
> >         matched = False
> >         for e2 in L2:
> >             if e1 == e2:
> >                 matched = True
> >                 break
> >         if not matched:
> >             return False
> >     return True
> > ```
> >
> > Loop luar berjalan `len(L1)` kali, dan tiap iterasi menjalankan loop dalam hingga `len(L2)` kali dengan operasi konstan: `O(len(L1) * len(L2))`. Worst case saat `L1` dan `L2` sama panjang dan tak satu pun elemen `L1` ada di `L2`, sehingga **O(n^2)** dengan `n = len(L1)`.
> >
> > #### Eksponensial
> >
> > Biasanya muncul pada fungsi rekursif dengan **lebih dari satu panggilan rekursif** per ukuran masalah, mis. **Towers of Hanoi** dan **Fibonacci rekursif**. Banyak masalah penting yang secara inheren eksponensial; biayanya tinggi, sehingga kita mempertimbangkan **solusi aproksimasi** yang memberi jawaban cukup baik lebih cepat.
> >
> > ### Kompleksitas Fungsi Rekursif
> >
> > ```python
> > def recursiveFun1(n):      # O(n): n panggilan sampai base case
> >     if n <= 0:
> >         return 1
> >     else:
> >         return 1 + recursiveFun1(n-1)
> >
> > def recursiveFun2(n):      # O(log n): n dibagi 2 tiap panggilan
> >     if n <= 0:
> >         return 1
> >     else:
> >         return 1 + recursiveFun2(n/2)
> >
> > def recursiveFun3(n, m, o):  # eksponensial: dua panggilan tiap level
> >     if n <= 0:
> >         print("%d, %d\n", m, o)
> >     else:
> >         recursiveFun3(n-1, m+1, o)
> >         recursiveFun3(n-1, m, o+1)
> > ```
> >
> > Pada `recursiveFun3`, ukuran turun 1 tetapi tiap panggilan membuat dua anak, sehingga jumlah panggilan berlipat dua tiap level (slide menulisnya sebagai eksponensial berbasis 2).
> >
> > ### Fibonacci: Iteratif vs Rekursif
> >
> > ```python
> > def fib_iter(n):
> >     if n == 0:                    # O(1)
> >         return 0
> >     elif n == 1:
> >         return 1
> >     else:
> >         fib_i = 0                 # O(1)
> >         fib_ii = 1
> >         for i in range(n-1):      # O(n)
> >             tmp = fib_i
> >             fib_i = fib_ii
> >             fib_ii = tmp + fib_ii
> >         return fib_ii             # O(1)
> >
> > def fib_recur(n):
> >     """ assumes n an int >= 0 """
> >     if n == 0:
> >         return 0
> >     elif n == 1:
> >         return 1
> >     else:
> >         return fib_recur(n-1) + fib_recur(n-2)
> > ```
> >
> > - `fib_iter`: best case O(1) (saat `n` 0 atau 1); worst case `O(1) + O(n) + O(1)`, yaitu **O(n)**.
> > - `fib_recur`: pohon panggilan melebar 1, 2, 4, 8, ... (`2^0, 2^1, 2^2, 2^3, ...`) per level, sehingga worst case **O(2^n)**. Ini bisa diperbaiki dengan **memoization**.
> >
> > ### Biaya Operasi Umum Python
> >
> > **List** (`n` adalah `len(L)`):
> >
> > | Operasi | Kompleksitas |
> > |---|---|
> > | index `L[i]`, store `L[i] = x`, length, `append` | O(1) |
> > | `==`, `remove`, `copy`, `reverse`, iterasi, `in` list | O(n) |
> >
> > **Dictionary** (`n` adalah `len(d)`):
> >
> > | Operasi | Worst case | Average case |
> > |---|---|---|
> > | index, store, delete, length | O(n) | O(1) |
> >
> > Dictionary memakai **hashing**, sehingga rata-rata konstan. Pada kasus langka dengan fungsi hash buruk dan banyak **collision**, seluruh dictionary harus ditelusuri.
> >
> > ### Ringkasan Cepat Mengenali Kelas
> >
> > - `O(1)`: kode tidak bergantung ukuran masalah.
> > - `O(log n)`: masalah direduksi separuh (atau 1/5, 1/10, ...) tiap kali.
> > - `O(n)`: program iteratif atau rekursif sederhana.
> > - `O(n^c)`: loop bersarang atau panggilan rekursif bersarang.
> > - `O(c^n)`: beberapa panggilan rekursif di tiap level.

> [!cornell] #### Summary
>
> **Law of Addition** dipakai untuk pernyataan **berurutan** (jumlahkan, ambil dominant term) dan **Law of Multiplication** untuk **loop bersarang** (kalikan). Kelas kompleksitas dari lambat ke cepat tumbuh: **O(1)**, **O(log n)**, **O(n)**, **O(n log n)**, **O(n^c)**, **O(c^n)**. Contohnya: akses list (konstan), **linear search** (linear, sama untuk list terurut maupun tak terurut), `intToStr` (**O(log i)**), **merge sort** (log-linear), **isSubset** (**O(n^2)**), dan **Fibonacci rekursif** (**O(2^n)**, bandingkan **O(n)** pada versi iteratif). Pada fungsi rekursif, hitung jumlah panggilan: mengurangi 1 per panggilan menghasilkan linear, membagi 2 menghasilkan logaritmik, dan dua panggilan per level menghasilkan eksponensial. Pada list Python, index/store/length/`append` bernilai **O(1)** dan sisanya **O(n)**; pada dictionary operasi rata-rata **O(1)** berkat **hashing**, meski worst case **O(n)**.

> [!ad-libitum]- Additional Information
>
> #### Tabel Biaya Lengkap dan Jebakan Umum
>
> Beberapa jebakan: `L.insert(0, x)` dan `L.pop(0)` adalah **O(n)** karena elemen harus digeser; `s in set` rata-rata **O(1)** tetapi `x in list` **O(n)**; `L + M` membuat list baru sehingga O(len(L) + len(M)); *slicing* `L[i:j]` O(j-i). Untuk antrean, `collections.deque` memberi `popleft()` O(1).
>
> #### Fibonacci Rekursif Tepatnya
>
> Jumlah panggilan `fib_recur(n)` tumbuh seperti bilangan Fibonacci sendiri (sekitar `phi^n`, dengan `phi` kira-kira 1,618), sehingga batas atas ketat sebenarnya lebih kecil dari `2^n`, tetapi `O(2^n)` tetap batas atas yang valid dan umum dipakai. Pada eksperimen, `fib_recur(10)` memerlukan 177 panggilan dan `fib_recur(20)` memerlukan 21.891 panggilan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan penghitung panggilan global ke `fib_recur` dan plot jumlah panggilan untuk `n = 1..25`; bandingkan dengan `2^n`.
> 2. Terapkan **memoization** (dictionary) pada `fib_recur` dan tentukan kompleksitas barunya.
> 3. Ubah `isSubset` memakai `set(L2)` dan analisis kompleksitas barunya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 11 (Introduction to Computational Complexity), bagian "Some Important Complexity Classes".
> - MIT OCW 6.0001, *Lecture 10* dan *Lecture 11*.
> - Python Wiki: *TimeComplexity* (wiki.python.org/moin/TimeComplexity).
