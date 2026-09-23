[[IF5100 Pemrograman untuk Data Analitik]]

---

1.1 (concept) Classify each as declarative or imperative knowledge: (a) "√x is the y such that y·y = x"; (b) a step-by-step bisection procedure to approximate √x; (c) "a prime has exactly two divisors."

1.2 (concept) For each snippet, say whether it's a syntax error, a static semantic error, or runs fine: (a) `3 + "hi"`; (b) `print("hello"`; (c) `3.2 * 5`; (d) `"5"5`.

1.3 (trace) Predict the output:

```python
x, y = 7, 2
print(x / y, x // y, x % y, x ** y)
```

1.4 (trace) Predict the output, and note each value's type:

```python
print(int(3.9))
print(float(3))
print(int("3") + 4)
print(3 * "2")
```

1.5 (trace) What does `area` print, and why?

```python
pi = 3.14
radius = 2
area = pi * radius ** 2
radius = radius + 1
print(area)
```

1.6 (trace) The user types `2` at the prompt. What is printed?

```python
text = input("Enter: ")
print(5 * text)
```

1.7 (concept) Evaluate each to True/False: (a) `3 < 5 and 5 < 4`; (b) `not (3 == 3)`; (c) `"apple" < "banana"`; (d) `"Zebra" < "apple"`. Explain (d).

1.8 (trace) Give the output:

```python
n, total = 0, 0
while n < 5:
    total += n
    n += 1
print(total)
```

1.9 (write) Write a for loop using `range` that prints every multiple of 3 from 3 to 30 inclusive.

1.10 (write) Write FizzBuzz for 1–20: print `Fizz` for multiples of 3, `Buzz` for multiples of 5, `FizzBuzz` for both, else the number.

1.11 (concept) The 3b deck ends by asking "Is using `break` good practice?" Give one argument for and one against, with a scenario for each.

---

1.1. Pembahasan:

- (a) **Declarative** — mendefinisikan *apa* itu akar kuadrat (sifatnya), bukan cara menghitungnya.
- (b) **Imperative** — langkah-langkah konkret (*how-to*) untuk sampai ke jawaban.
- (c) **Declarative** — mendefinisikan sifat bilangan prima, bukan cara mengecek/menghasilkannya.

1.2. Pembahasan:

- (a) `3 + "hi"` — **static semantic error** (`TypeError` saat dijalankan): sintaksnya sah, tapi tipe `int` dan `str` tidak kompatibel untuk operator `+`.
- (b) `print("hello"` — **syntax error**: kurung tidak ditutup, parser gagal mengenali struktur kalimat.
- (c) `3.2 * 5` — **runs fine**, menghasilkan `16.0` (float).
- (d) `"5"5` — **syntax error**: literal string diikuti literal angka tanpa operator di antaranya bukan ekspresi yang sah.

1.3. Kode verifikasi:
```python
x, y = 7, 2
print(x / y, x // y, x % y, x ** y)
```
Output: `3.5 3 1 49`. `/` selalu menghasilkan float (*true division*), `//` pembagian bulat ke bawah (*floor division*), `%` sisa bagi, `**` pangkat.

1.4. Pembahasan:
```python
print(int(3.9))       # 3   (int) — dipotong (truncate), bukan dibulatkan
print(float(3))        # 3.0 (float)
print(int("3") + 4)    # 7   (int) — string "3" di-cast ke int dulu
print(3 * "2")          # "222" (str) — perkalian int dengan str = pengulangan string
```

1.5. Kode verifikasi:
```python
pi = 3.14
radius = 2
area = pi * radius ** 2
radius = radius + 1
print(area)
```
Output: `12.56`. `area` dihitung **sekali** memakai nilai `radius` saat itu (`2`); mengubah `radius` setelahnya tidak mengubah nilai `area` yang sudah tersimpan — variabel Python bukan formula yang otomatis dihitung ulang (bukan seperti sel spreadsheet).

1.6. Pembahasan: `input()` **selalu mengembalikan string**, meski pengguna mengetik digit. Jadi `text = "2"` (string, bukan int). `5 * text` adalah perkalian `int` dengan `str`, yang mengulang string tersebut 5 kali → dicetak `22222` (bukan `10`).

1.7. Pembahasan:
- (a) `3 < 5 and 5 < 4` → `True and False` → **False**.
- (b) `not (3 == 3)` → `not True` → **False**.
- (c) `"apple" < "banana"` → **True** (perbandingan string leksikografis per karakter, `'a' < 'b'`).
- (d) `"Zebra" < "apple"` → **True**. Alasannya: perbandingan string membandingkan **kode ASCII/Unicode** per karakter, dan huruf kapital (`'Z'` = 90) memiliki kode lebih kecil daripada huruf kecil (`'a'` = 97) — bukan urutan alfabet biasa yang mengabaikan kapitalisasi.

1.8. Kode verifikasi:
```python
n, total = 0, 0
while n < 5:
    total += n
    n += 1
print(total)
```
Output: `10` (`0+1+2+3+4`).

1.9.
```python
for i in range(3, 31, 3):
    print(i)
```

1.10.
```python
for i in range(1, 21):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```
Urutan pengecekan penting: `i % 15 == 0` harus dicek **paling awal**, sebelum `% 3` dan `% 5` sendiri-sendiri, supaya kelipatan 15 tidak "terjebak" hanya mencetak `Fizz` atau `Buzz` saja.

1.11. Pembahasan:
- **Argumen mendukung**: `break` membuat kode lebih mudah dibaca saat kondisi berhenti alami terjadi di tengah badan loop (misal mencari elemen dalam list — begitu ketemu, langsung `break` daripada memaksakan semuanya ke kondisi `while`). Contoh: mencari indeks elemen pertama yang memenuhi syarat lalu berhenti.
- **Argumen menentang**: `break` menambah jalur keluar tersembunyi yang membuat alur kontrol sulit dilacak, terutama pada loop bersarang (`break` hanya keluar dari loop terdalam, bukan semuanya) — bisa menimbulkan bug jika programmer lain lupa jalur keluar ini ada. Contoh: loop panjang dengan beberapa `break` di tempat berbeda membuat sulit memastikan semua kasus tercakup.
