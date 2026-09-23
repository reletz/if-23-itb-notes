[[IF5100 Pemrograman untuk Data Analitik]]

---

2.1 (concept) In your own words, distinguish abstraction from decomposition, and name the Python mechanism each is achieved with in this week's material.

2.2 (trace) What is printed, and why is one line `None`?

```python
def greet(name):
    print("Hi " + name)

result = greet("Ana")
print(result)
```

2.3 (concept) Explain the scope rule: inside a function you can read an outer variable but cannot rebind it (without `global`). Why is `global` "frowned upon"?

2.4 (trace) Give the output:

```python
x = 3
def f(y):
    x = y + 1
    return x
print(f(10))
print(x)
```

2.5 (write + docstring) Write `is_leap_year(year)` with a PEP 257 docstring. Rule: divisible by 4, except centuries unless divisible by 400.

2.6 (write, functions as arguments) Write `apply_twice(func, x)` that returns `func(func(x))`. Show it called with a lambda/function that increments by 1, for `x = 5`.

2.7 (fix the bug) This should return the larger of two numbers but misbehaves. Find and fix the bug:

```python
def bigger(a, b):
    if a > b:
        result = a
    return result
```

---

2.1. Pembahasan: **Dekomposisi** adalah memecah masalah besar menjadi bagian-bagian lebih kecil yang bisa dikerjakan terpisah — di Python dicapai dengan memecah program menjadi banyak **fungsi** (dan modul). **Abstraksi** adalah menyembunyikan detail implementasi di balik sebuah antarmuka, sehingga pemanggil cukup tahu *apa* yang dilakukan fungsi tanpa perlu tahu *bagaimana* — di Python dicapai lewat **definisi fungsi** (`def`) plus **docstring** sebagai kontrak/spesifikasi, tanpa pemanggil perlu membaca badan fungsinya.

2.2. Kode verifikasi:
```python
def greet(name):
    print("Hi " + name)

result = greet("Ana")
print(result)
```
Output:
```
Hi Ana
None
```
`greet` tidak punya statement `return`, jadi secara implisit ia mengembalikan `None`. `result` menampung `None` itu, dan baris kedua mencetaknya. Baris `Hi Ana` dicetak oleh `print` **di dalam** `greet`, bukan oleh nilai kembaliannya.

2.3. Pembahasan: Python mengizinkan **membaca** variabel dari *scope* luar di dalam fungsi (mencari nama secara bertingkat: lokal → *enclosing* → global → built-in), tapi **assignment** ke sebuah nama di dalam fungsi otomatis menjadikannya variabel **lokal baru** kecuali dideklarasikan `global` — sehingga tanpa `global`, `x = x + 1` di dalam fungsi akan gagal dengan `UnboundLocalError` (Python melihat ada assignment ke `x`, jadi menganggap `x` lokal di seluruh badan fungsi, termasuk sebelum baris assignment-nya). `global` "dikerutkan dahinya" karena ia merusak **enkapsulasi**: fungsi jadi punya efek samping tersembunyi pada state di luar dirinya, membuat kode sulit dilacak, sulit diuji terpisah, dan rawan konflik nama saat program membesar.

2.4. Kode verifikasi:
```python
x = 3
def f(y):
    x = y + 1
    return x
print(f(10))
print(x)
```
Output:
```
11
3
```
`x` di dalam `f` adalah variabel **lokal baru** (karena ada assignment `x = y + 1`), sama sekali terpisah dari `x` global — memodifikasinya tidak menyentuh `x` di luar.

2.5.
```python
def is_leap_year(year):
    """
    Menentukan apakah year adalah tahun kabisat.

    year: int, tahun (positif) yang akan dicek.

    Aturan: habis dibagi 4, KECUALI tahun abad (kelipatan 100),
    yang hanya kabisat jika juga habis dibagi 400.

    returns: bool, True jika year tahun kabisat.
    """
    if year % 4 != 0:
        return False
    if year % 100 != 0:
        return True
    return year % 400 == 0
```

2.6.
```python
def apply_twice(func, x):
    return func(func(x))

print(apply_twice(lambda n: n + 1, 5))   # 7
```
`apply_twice` memanggil `func` pada `x`, lalu memanggil `func` lagi pada hasilnya. Dengan `func = lambda n: n + 1` dan `x = 5`: `func(5) = 6`, lalu `func(6) = 7`.

2.7. Bug: variabel `result` **hanya di-assign di cabang `if`**; ketika `a <= b`, `result` tidak pernah dibuat, sehingga `return result` memicu `NameError: name 'result' is not defined`. Perbaikan — tambahkan cabang `else`:
```python
def bigger(a, b):
    if a > b:
        result = a
    else:
        result = b
    return result
```
