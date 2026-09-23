[[IF5100 Pemrograman untuk Data Analitik]]

---

6.1 (concept) Name the exception each raises: (a) `[1,7,4][4]`; (b) `int("hello")`; (c) `undefined_var`; (d) `"a" / 4`; (e) `1 / 0`.

6.2 (write) Wrap two `int(input(...))` reads and a division in `try`/`except` with separate handlers for `ValueError` and `ZeroDivisionError`, plus a catch-all.

6.3 (concept) The deck lists three ways to handle a bad case in `avg(grades)`: print a warning, return `0.0`, or re-raise. Give a situation where each is the right choice.

6.4 (trace) What prints, in what order?

```python
try:
    print("A")
    x = 1 / 0
    print("B")
except ZeroDivisionError:
    print("C")
else:
    print("D")
finally:
    print("E")
```

6.5 (write, assertion) Rewrite `avg(grades)` to use an `assert` guaranteeing a non-empty list, with a message.

6.6 (concept) When should you use an assertion versus raising/handling an exception? (Hint: programmer error vs. expected bad user input.)

---

6.1. Pembahasan:
- (a) `[1,7,4][4]` → **`IndexError`** (indeks 4 di luar jangkauan list berpanjang 3).
- (b) `int("hello")` → **`ValueError`** (string tidak bisa diparsing jadi integer).
- (c) `undefined_var` → **`NameError`** (nama belum pernah didefinisikan).
- (d) `"a" / 4` → **`TypeError`** (operator `/` tidak didukung antara `str` dan `int`).
- (e) `1 / 0` → **`ZeroDivisionError`**.

6.2.
```python
try:
    a = int(input("Masukkan bilangan pertama: "))
    b = int(input("Masukkan bilangan kedua: "))
    print(a / b)
except ValueError:
    print("Input harus berupa bilangan bulat yang valid")
except ZeroDivisionError:
    print("Tidak bisa membagi dengan nol")
except Exception as e:
    print("Terjadi kesalahan tak terduga:", e)
```
Urutan `except` penting: klausa yang lebih spesifik (`ValueError`, `ZeroDivisionError`) diletakkan **sebelum** catch-all (`Exception`) — Python mencoba klausa `except` dari atas ke bawah dan memakai yang pertama cocok.

6.3. Pembahasan:
- **Cetak peringatan** (lalu lanjut dengan nilai default/di-skip) — cocok untuk *tooling* interaktif/skrip eksplorasi di mana pengguna langsung melihat output dan bisa menilai sendiri apakah data kosong itu wajar (misal notebook analisis data).
- **Kembalikan `0.0`** — cocok kalau pemanggil (kode lain) mengharapkan sebuah angka untuk dipakai lebih lanjut dalam komputasi (misal dijumlahkan ke total), dan nilai kosong = 0 adalah asumsi bisnis yang wajar/terdokumentasi (misal: siswa tanpa nilai dianggap kontribusi 0 ke rata-rata kelas).
- **Re-raise (memicu ulang) exception** — cocok untuk *library*/fungsi *reusable* di mana keputusan "apa yang harus terjadi kalau data kosong" **bukan tanggung jawab fungsi ini**, melainkan pemanggilnya — biarkan pemanggil yang tahu konteks memutuskan (catch dan tangani, atau biarkan program berhenti karena ini memang bug).

6.4. Kode verifikasi:
```python
try:
    print("A")
    x = 1 / 0
    print("B")
except ZeroDivisionError:
    print("C")
else:
    print("D")
finally:
    print("E")
```
Output: `A`, `C`, `E` (dalam urutan itu).
- `print("A")` dieksekusi.
- `1 / 0` memicu `ZeroDivisionError` — eksekusi **langsung lompat** ke blok `except` yang cocok, sehingga `print("B")` **tidak pernah dijalankan**.
- `except ZeroDivisionError` cocok → `print("C")`.
- Klausa `else` **hanya** dijalankan jika blok `try` selesai **tanpa** exception — di sini terjadi exception, jadi `else` (dan `print("D")`) **dilewati**.
- `finally` **selalu** dijalankan terakhir, ada exception atau tidak → `print("E")`.

6.5.
```python
def avg(grades):
    assert len(grades) != 0, "avg() dipanggil dengan list nilai kosong"
    return sum(grades) / len(grades)
```

6.6. Pembahasan: Gunakan **`assert`** untuk memeriksa kondisi yang **seharusnya selalu benar jika kode di sekitarnya (dan pemanggilnya) tidak punya bug** — kegagalannya menandakan **kesalahan programmer** (*programmer error*), bukan kondisi yang wajar terjadi saat program berjalan normal, misalnya prasyarat internal fungsi atau invarian struktur data. Gunakan **exception (`raise`/`try-except`)** untuk kondisi yang **bisa terjadi secara sah** akibat masukan dari luar kendali kode — input pengguna, isi file, respons jaringan — di mana program **diharapkan** menangani atau memberi tahu penggunanya dengan cara yang baik, bukan sekadar berhenti mendadak. Aturan praktis dari petunjuk soal: *programmer error* → `assert`; *masukan buruk yang diharapkan/wajar terjadi* → exception.
