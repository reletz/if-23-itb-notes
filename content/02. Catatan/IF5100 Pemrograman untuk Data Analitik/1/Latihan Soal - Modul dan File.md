[[IF5100 Pemrograman untuk Data Analitik]]

---

3.1 (concept) After `import circle`, why do `pi` and `circle.pi` refer to different objects? What does `from circle import *` change about that?

3.2 (concept) Give one concrete reason to use `import numpy as np` (the `as` form) rather than plain `import numpy`.

3.3 (trace) Given `circle.py` (with `pi = 3.14159`, `area(r) = pi*r**2`), what prints?

```python
import circle
pi = 3
print(pi)
print(circle.pi)
print(circle.area(2))
```

3.4 (write, finger exercise from deck) Write a program that writes the first ten positive integers to `intpos_file.txt`, one per line, then reopens the file and prints them.

3.5 (concept) Rewrite this using a `with` statement and explain what problem `with` prevents:

```python
f = open("data.txt", "w")
f.write("hello")
f.close()
```

3.6 (fix the bug) A student wants to append a line to an existing log but keeps overwriting it. What's wrong?

```python
with open("log.txt", "w") as f:
    f.write("new entry\n")
```

3.7 (write, finger exercise from deck) Using `calendar`, write `shopping_days(year)` that returns the number of days between US Thanksgiving (fourth Thursday of November) and Christmas of that year. Check it with 2011.

---

3.1. Pembahasan: `import circle` menaruh nama **`circle`** (modul itu sendiri sebagai objek) ke *namespace* saat ini — isi modul hanya bisa diakses lewat *dot notation* (`circle.pi`). Jika kode saat ini juga mendefinisikan variabel `pi` sendiri, itu adalah nama **terpisah** di *namespace* saat ini; keduanya kebetulan sama-sama bernama `pi` tapi hidup di *namespace* berbeda, jadi tidak saling menimpa. `from circle import *` **mengubah ini** — ia menyalin semua nama publik modul (termasuk `pi`) langsung ke *namespace* saat ini, sehingga `pi` lokal (jika ada, didefinisikan setelah `import *`) akan **menimpa** `pi` dari `circle`, atau sebaliknya jika `import *` dieksekusi setelah `pi` lokal didefinisikan — berpotensi tabrakan nama (*name collision*) yang sulit dilacak sumbernya.

3.2. Pembahasan: `import numpy as np` memberi **alias pendek** untuk modul, sehingga pemanggilan berulang (`np.array(...)`, `np.mean(...)`) jauh lebih ringkas daripada `numpy.array(...)`. Ini juga **konvensi komunitas** yang luas dipakai (`np`, `pd` untuk pandas, dst.), membuat kode lebih mudah dibaca orang lain, dan menghindari tabrakan nama jika ada beberapa modul dengan nama fungsi serupa yang ingin dibedakan dengan alias masing-masing.

3.3. Kode verifikasi (asumsi `circle.py` berisi `pi = 3.14159` dan `def area(r): return pi*r**2`):
```python
import circle
pi = 3
print(pi)            # 3
print(circle.pi)      # 3.14159
print(circle.area(2)) # 12.56636
```
`pi = 3` hanya membuat variabel `pi` baru di *namespace* saat ini; `circle.pi` tetap merujuk objek `pi` di dalam modul `circle`, tidak terpengaruh. `circle.area(2)` memakai `pi` milik `circle` sendiri (3.14159), bukan `pi = 3` di luar.

3.4.
```python
with open("intpos_file.txt", "w") as f:
    for i in range(1, 11):
        f.write(str(i) + "\n")

with open("intpos_file.txt", "r") as f:
    for line in f:
        print(line.strip())
```
`f.write` butuh **string**, jadi `i` (int) harus di-cast dulu dengan `str()`; `"\n"` menambah baris baru per angka. Saat membaca ulang, `line.strip()` membuang karakter *newline* di ujung sebelum dicetak.

3.5.
```python
with open("data.txt", "w") as f:
    f.write("hello")
```
`with` menjamin `f.close()` **otomatis dipanggil** begitu blok selesai — **bahkan jika terjadi exception** di tengah `f.write(...)`. Versi manual (`open` ... `close`) berisiko: kalau exception muncul sebelum baris `f.close()` tercapai, file tidak pernah ditutup — bisa menyebabkan data belum ter-*flush* ke disk (hilang/tidak lengkap) dan file handle bocor (*resource leak*), yang makin bermasalah kalau program membuka banyak file berulang.

3.6. Bug: modus `"w"` **menimpa ulang** (*overwrite*) seluruh isi file setiap kali dibuka, karena `"w"` selalu memulai dari file kosong. Untuk menambah baris ke file yang sudah ada tanpa menghapus isinya, harus pakai modus **append**:
```python
with open("log.txt", "a") as f:
    f.write("new entry\n")
```

3.7. Kode verifikasi:
```python
import calendar as cal

def find_thanksgiving(year):
    month = cal.monthcalendar(year, 11)
    if month[0][cal.THURSDAY] != 0:
        return month[3][cal.THURSDAY]
    return month[4][cal.THURSDAY]

def shopping_days(year):
    """year: a number <= 1941
    returns the number of days between US Thanksgiving and Christmas
    of the year"""
    return (30 - find_thanksgiving(year)) + 25

print(shopping_days(2011))   # 31
```
`monthcalendar(year, 11)` mengembalikan list minggu dengan `0` untuk hari di luar bulan. Bila minggu pertama sudah memuat Kamis, Kamis keempat ada di `month[3]`; jika tidak di `month[4]`. Thanksgiving 2011 jatuh pada 24 November, sehingga sisa November = 30 - 24 = 6 hari, ditambah 25 hari Desember = 31 hari.
