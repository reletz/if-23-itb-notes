[[IF5100 Pemrograman untuk Data Analitik]]

---

7.1 (concept) Define exhaustive enumeration and give one strength and one weakness.

7.2 (write) Write `is_prime(x)` by testing divisors from 2 to `x-1` (the deck's simplest method). Then state one optimization (hint: √x).

7.3 (write) Write `sqrt_bisection(x, epsilon)` that finds √x by bisection to within `epsilon`. Roughly how does its step count compare with exhaustive enumeration?

7.4 (concept) Newton–Raphson converges faster than bisection. In one sentence, why — and where in machine learning does this idea reappear (per the deck)?

7.5 (write, links to Topic 5) Convert your bisection sqrt into a recursive version. Why might it need a helper function to make the first call?

---

7.1. Pembahasan: **Exhaustive enumeration** adalah kelas algoritma yang mencoba/mendaftar **semua kemungkinan** secara berurutan sampai menemukan jawaban yang benar atau kehabisan ruang kemungkinan. **Kekuatan**: sangat **mudah dipahami dan ditulis** — tidak butuh wawasan matematis khusus tentang struktur masalahnya, cukup cek satu per satu. **Kelemahan**: bisa **sangat lambat** untuk ruang kemungkinan besar atau kontinu (misal akar kuadrat bilangan real), karena jumlah langkahnya tumbuh berbanding lurus (atau lebih buruk) dengan ukuran ruang pencarian — lihat perbandingan dengan bisection di 7.3.

7.2.
```python
def is_prime(x):
    if x < 2:
        return False
    for d in range(2, x):
        if x % d == 0:
            return False
    return True
```
Optimisasi: cukup cek pembagi dari `2` sampai `⌊√x⌋`, bukan sampai `x-1`. Alasannya, jika `x = a * b` dengan `a <= b`, maka pasti `a <= √x` — jadi kalau tidak ada pembagi sampai `√x`, tidak mungkin ada pasangan pembagi `(a, b)` yang lolos di atas `√x` juga (karena pasangannya `a` pasti sudah ditemukan di bawah `√x`). Ini menurunkan kompleksitas dari `O(x)` menjadi `O(√x)`:
```python
def is_prime_fast(x):
    if x < 2:
        return False
    d = 2
    while d * d <= x:
        if x % d == 0:
            return False
        d += 1
    return True
```

7.3.
```python
def sqrt_bisection(x, epsilon=0.01):
    low = 0.0
    high = max(1.0, x)
    ans = (high + low) / 2.0
    while abs(ans ** 2 - x) >= epsilon:
        if ans ** 2 < x:
            low = ans
        else:
            high = ans
        ans = (high + low) / 2.0
    return ans
```
Perbandingan jumlah langkah: exhaustive enumeration untuk akar kuadrat memakai langkah sebesar `epsilon**2` (lihat deck), sehingga jumlah langkahnya kira-kira `O(√x / epsilon**2)` — **hampir kuadratik terhadap `1/epsilon`**. Bisection membagi dua rentang pencariannya tiap langkah, sehingga jumlah langkahnya hanya `O(log2((high-low)/epsilon))` — **logaritmik**. Untuk `epsilon` kecil, selisihnya sangat besar: bisection butuh puluhan langkah di mana exhaustive enumeration bisa butuh ribuan.

7.4. Pembahasan: Newton–Raphson lebih cepat karena ia memakai informasi **gradien/turunan** (`f'(x)`, arah garis singgung) untuk melompat lebih dekat ke akar setiap iterasi, alih-alih bisection yang hanya membagi dua rentang secara membuta tanpa memperhitungkan seberapa "curam" fungsinya di titik tersebut — menurut slide, ide inti ini (**bergerak mengikuti arah gradien untuk mendekati solusi optimal**) muncul kembali sebagai dasar algoritma optimisasi di **backpropagation** pada pelatihan neural network, hanya saja dalam dimensi yang jauh lebih tinggi.

7.5.
```python
def sqrt_bisection_recc(x, epsilon=0.01):
    def helper(low, high):
        ans = (high + low) / 2.0
        if abs(ans ** 2 - x) < epsilon:
            return ans
        if ans ** 2 < x:
            return helper(ans, high)
        else:
            return helper(low, ans)

    low = 0.0
    high = max(1.0, x)
    return helper(low, high)
```
Butuh fungsi *helper* karena panggilan rekursif `helper(low, high)` perlu **dua parameter tambahan** (`low`, `high`) yang berubah tiap langkah — sementara antarmuka publik yang diinginkan pemanggil cukup `sqrt_bisection_recc(x, epsilon)`, tanpa harus tahu atau menyediakan nilai awal `low`/`high` secara manual. Fungsi luar (`sqrt_bisection_recc`) bertugas **menyiapkan panggilan pertama** (nilai awal `low = 0.0`, `high = max(1.0, x)`) sekali saja, lalu mendelegasikan seluruh proses rekursif ke `helper`, yang juga otomatis mengakses `x` dan `epsilon` lewat *closure* tanpa perlu meneruskannya ulang di setiap panggilan rekursif — pola yang sama seperti pada `sqrt_bs_helper`/`sqrt_nr_helper` di [[Newton-Raphson dan Versi Rekursif Pencarian Akar]].
