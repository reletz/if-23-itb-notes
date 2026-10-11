[[IF5100 Pemrograman untuk Data Analitik]]

---

9.1 (concept) Sebutkan tiga alasan mengapa mengukur efisiensi dengan timer (`time`) tidak ideal untuk membandingkan **algoritma**. Mengapa menghitung jumlah operasi masih belum cukup?

9.2 (analyze, deck: `fact_iter`) Untuk fungsi berikut, berapa jumlah operasi (menurut slide `1 + 5n + 1`) dan apa kompleksitas Big O-nya? Mengapa konstanta diabaikan?

```python
def fact_iter(n):
    answer = 1
    while n > 1:
        answer *= n
        n -= 1
    return answer
```

9.3 (simplify, deck) Sederhanakan ke Big O: (a) `n^2 + 2n + 2`; (b) `log(n) + n + 4`; (c) `0.0001*n*log(n) + 300n`; (d) `2n^30 + 3^n`; (e) `5n^3 + 2^n + 10^9`.

9.4 (analyze, Law of Addition/Multiplication) Tentukan kompleksitas tiap potongan kode.

```python
# (a)
for i in range(n):
    print('a')
for j in range(n*n):
    print('b')

# (b)
for i in range(n):
    for j in range(n):
        print('a')

# (c)
for i in range(n):
    for j in range(i, n):
        pass

# (d)
for i in range(n):
    j = 1
    while j < n:
        j *= 2
```

9.5 (concept, best/average/worst) Untuk `search_for_elmt(L, e)` dari deck, jelaskan best, average, dan worst case. Mengapa kita biasanya fokus pada worst case?

9.6 (analyze, deck: fungsi rekursif) Tentukan kompleksitas tiga fungsi berikut dan hitung jumlah panggilan untuk `n = 8`.

```python
def f1(n):
    if n <= 0: return 1
    return 1 + f1(n-1)

def f2(n):
    if n <= 0: return 1
    return 1 + f2(n//2)

def f3(n):
    if n <= 0: return
    f3(n-1)
    f3(n-1)
```

9.7 (debug + analyze, deck: `intToStr`) Kode berikut gagal dijalankan. Perbaiki, lalu tentukan kompleksitasnya terhadap `i`.

```python
def intToStr(i):
    digits = '0123456789'
    if i == 0:
        return '0'
    res = ''
    while i > 0:
        res = digits[i % 10] + res
        i = i // 10
    return result
```

9.8 (analyze + improve, deck: `isSubset`) Tentukan kompleksitas `isSubset(L1, L2)` dari deck dan tunjukkan versi yang lebih cepat memakai `set`. Apa kompleksitas barunya?

9.9 (compare, deck: Fibonacci) Bandingkan `fib_iter` dan `fib_recur`. Berapa kali `fib_recur` dipanggil untuk `n = 10` dan `n = 20`? Apa yang membuatnya begitu mahal?

9.10 (classify, deck: operasi Python) Tentukan kompleksitas (average case): (a) `L[i]`; (b) `L.append(x)`; (c) `x in L`; (d) `d[k]`; (e) `for x in L1: if x in L2: ...` dengan `len(L1) = len(L2) = n`; (f) `for x in L1: if x in S2: ...` dengan `S2 = set(L2)`.

9.11 (write) Tulis fungsi `count_halvings(n)` yang menghitung berapa kali `n` bisa dibagi dua (`//`) hingga mencapai 1. Berapa kompleksitasnya? Berapa hasil untuk `n = 1024` dan `n = 10**6`?

---

9.1. Pembahasan: Timer bermasalah karena waktu berubah menurut **implementasi**, **komputer**, dan **input kecil tidak bisa memprediksi input besar**; selain itu hubungan input-waktu tidak bisa dinyatakan. Timer pada dasarnya menilai implementasi dan mesin, bukan algoritma. Menghitung operasi sudah bebas dari komputer, tetapi masih **bergantung implementasi**, tidak ada definisi jelas operasi mana yang dihitung, dan belum menyatakan hubungan umum antara ukuran input dan waktu. Karena itu dipakai **order of growth (Big O)**.

9.2. Pembahasan: Sebelum loop ada 1 operasi (`answer = 1`), tiap iterasi loop memakai sekitar 5 operasi (perbandingan `n > 1`, perkalian, assignment `answer`, pengurangan, assignment `n`) dan ada 1 operasi `return`. Jadi jumlah operasi `1 + 5n + 1 = 5n + 2`. Karena kita hanya peduli pertumbuhan saat `n` besar, **konstanta aditif (2)** dan **faktor pengali (5)** diabaikan, sehingga kompleksitas worst case adalah **O(n)**. Loop berjalan `n - 1` kali untuk `n >= 1`, jadi tumbuhnya linear terhadap `n`.

9.3. Pembahasan: Ambil dominant term dan buang konstanta. (a) **O(n^2)**. (b) **O(n)**, karena `n` mendominasi `log(n)`. (c) **O(n log n)**, karena `n log n` mendominasi `n` dan koefisien 0.0001 diabaikan. (d) **O(3^n)**, karena eksponensial mendominasi polinomial `n^30`. (e) **O(2^n)**, karena `2^n` mendominasi `5n^3` dan konstanta `10^9`.

9.4. Pembahasan:
(a) Dua loop **berurutan**, pakai Law of Addition: `O(n) + O(n^2) = O(n + n^2) = O(n^2)`.
(b) Loop **bersarang**, pakai Law of Multiplication: `O(n) * O(n) = O(n^2)`.
(c) Loop dalam berjalan `n, n-1, ..., 1` kali, total `n(n+1)/2` iterasi, yakni `O(n^2)` (konstanta 1/2 dan suku `n` diabaikan). Terverifikasi: `n = 10` memberi 55 iterasi, `n = 100` memberi 5050.
(d) Loop luar `n` kali, loop dalam menggandakan `j` hingga `n` sehingga `log2(n)` kali: `O(n) * O(log n) = O(n log n)`. Terverifikasi: `n = 16` memberi 64 iterasi (`16 * 4`), `n = 1024` memberi 10.240 (`1024 * 10`).

9.5. Pembahasan: **Best case**: `e` adalah elemen pertama, loop berhenti seketika, **O(1)**. **Worst case**: `e` tidak ada di list (atau di posisi terakhir), seluruh `len(L)` elemen diperiksa, **O(n)**. **Average case**: kira-kira separuh elemen diperiksa, tetap **O(n)** karena `n/2` dan `n` setara menurut Big O. Fokus pada worst case karena merupakan **batas atas** yang menjamin waktu tidak akan lebih buruk, sering terjadi, dan menjadi **bottleneck** saat program berjalan.

9.6. Pembahasan: Kode verifikasi menghitung jumlah panggilan:
```python
# n = 8
f1(8)  # 9 panggilan
f2(8)  # 5 panggilan  (8 -> 4 -> 2 -> 1 -> 0)
f3(8)  # 511 panggilan (= 2^(8+1) - 1)
```
`f1` mengurangi `n` dengan 1 tiap panggilan, sehingga `n + 1` panggilan: **O(n)**, linear. `f2` membagi `n` dengan 2 tiap panggilan: **O(log n)**, logaritmik (`n = 16` hanya 6 panggilan). `f3` memanggil dirinya dua kali per level dengan kedalaman `n`, sehingga panggilan berlipat dua per level: `2^(n+1) - 1` panggilan, yakni **O(2^n)**, eksponensial (`n = 16` sudah 131.071 panggilan).

9.7. Pembahasan: Bug: variabel yang dikembalikan `result` tidak pernah didefinisikan (`NameError`); seharusnya `res`.
```python
def intToStr(i):
    digits = '0123456789'
    if i == 0:
        return '0'
    res = ''
    while i > 0:
        res = digits[i % 10] + res
        i = i // 10
    return res
```
Terverifikasi: `intToStr(907)` menghasilkan `'907'` dengan 3 iterasi, `intToStr(10**6)` menghasilkan `'1000000'` dengan 7 iterasi. Isi `while` berlangkah konstan, dan jumlah iterasi sama dengan berapa kali `i` bisa dibagi 10 (yakni jumlah digit), sehingga kompleksitasnya **O(log i)**.

9.8. Pembahasan: Versi deck memakai loop bersarang: `O(len(L1) * len(L2))`, worst case **O(n^2)** (tak satu pun elemen `L1` ada di `L2`). Versi lebih cepat:
```python
def isSubset(L1, L2):
    s = set(L2)           # O(len(L2))
    for e in L1:          # O(len(L1))
        if e not in s:    # O(1) rata-rata
            return False
    return True
```
Membangun `set` memerlukan `O(len(L2))`, loop `O(len(L1))` dengan tes keanggotaan rata-rata `O(1)`. Total `O(len(L1) + len(L2))`, yaitu **O(n)** untuk panjang sama. Terverifikasi: `isSubset([1,2],[3,2,1])` memberi `True` dan `isSubset([1,9],[3,2,1])` memberi `False`, sama dengan versi lama. Ini contoh tradeoff **waktu vs ruang** (set memakai memori tambahan).

9.9. Pembahasan: `fib_iter` hanya satu loop `n - 1` iterasi: `O(1) + O(n) + O(1) = O(n)`. `fib_recur` memanggil dua sub-masalah, `fib_recur(n-1)` dan `fib_recur(n-2)`, sehingga pohon panggilan melebar (1, 2, 4, 8, ...) menjadi **O(2^n)**. Hasil eksperimen: `fib_recur(10)` memerlukan **177** panggilan dan `fib_recur(20)` memerlukan **21.891** panggilan, padahal `fib_iter(20)` hanya sekitar 19 iterasi. Pemborosan terjadi karena sub-masalah yang sama dihitung berulang kali (mis. `fib(2)` dihitung ulang berkali-kali); **memoization** menghilangkannya dan menurunkan biaya menjadi O(n).

9.10. Pembahasan: (a) **O(1)**. (b) **O(1)**. (c) **O(n)** (tes keanggotaan pada list menelusuri elemen). (d) **O(1)** rata-rata (hashing; worst case O(n) bila banyak collision). (e) Loop luar `n` kali dikali `x in L2` yang O(n), jadi **O(n^2)**. (f) Loop luar `n` kali dikali tes `set` rata-rata O(1), jadi **O(n)** (ditambah O(n) untuk membuat `S2`, tetap O(n)).

9.11. Pembahasan:
```python
def count_halvings(n):
    k = 0
    while n > 1:
        n //= 2
        k += 1
    return k
```
Tiap iterasi memotong `n` separuh, sehingga jumlah iterasi sekitar `log2(n)`: kompleksitas **O(log n)**. Terverifikasi: `count_halvings(1024)` menghasilkan `10` dan `count_halvings(10**6)` menghasilkan `19`.
