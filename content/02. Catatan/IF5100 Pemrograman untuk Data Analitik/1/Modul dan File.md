---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Modul dan File
>
> > ## Questions/Cues
> >
> > - Mengapa program besar perlu dipecah ke banyak file, dan apa itu modul?
> > - Bagaimana cara mengimpor modul dan apa fungsi dot notation?
> > - Apa perbedaan `import m`, `from m import *`, dan `import m as c`?
> > - Apa saja mode `open()` dan method utama pada file handle?
> > - Mengapa `with` lebih baik daripada `open()`/`close()` manual?
> > - Apa konvensi penulisan import yang baik?
> >
> > ## Reference Points
> >
> > - IF5100 — Modules and Files (Slides 3-22)
>
> > ### Mengapa Modul
> >
> > Sejauh ini program disimpan dalam satu file, tidak bergantung pada kode yang ditulis sebelumnya, dan tidak menyimpan/mengakses data yang bertahan setelah program selesai. Seiring program membesar, lebih praktis **menyimpan bagian berbeda di file berbeda** — apalagi bila banyak orang mengerjakan program yang sama, dan program berguna umumnya perlu mengakses kode yang sudah ada (mis. *library module*).
> >
> > ### Membuat dan Mengimpor Modul
> >
> > **Modul** adalah file `.py` berisi definisi dan statement Python — biasanya memuat **statement yang dapat dieksekusi** dan **definisi fungsi**.
> >
> > ```python
> > # circle.py
> > pi = 3.14159
> >
> > def area(radius):
> >     return pi * (radius ** 2)
> >
> > def circumference(radius):
> >     return 2 * pi * radius
> > ```
> >
> > Untuk mengaksesnya dari program lain, pakai statement **`import`**, lalu **dot notation** untuk merujuk nama yang didefinisikan di modul:
> >
> > ```python
> > import circle
> > pi = 3
> > print(pi)            # 3      -> nama lokal
> > print(circle.pi)     # 3.14159 -> nama di modul
> > print(circle.area(3))
> > ```
> >
> > `pi` dan `circle.pi` merujuk **objek yang berbeda** — impor memberi *namespace* tersendiri.
> >
> > ### Varian Statement import
> >
> > ```mermaid
> > flowchart TD
> >     A["import circle"] --> A1["Bind nama 'circle';<br/>akses lewat circle.pi, circle.area"]
> >     B["from circle import *"] --> B1["Bind SEMUA objek modul ke scope kini;<br/>nama 'circle' sendiri TIDAK di-bind, sehingga circle.pi jadi NameError"]
> >     C["import circle as c"] --> C1["Bind nama 'circle' menjadi 'c';<br/>akses lewat c.pi"]
> > ```
> >
> > `import circle as c` berguna bila nama modul sudah dipakai untuk hal lain, atau untuk menyingkat nama modul yang panjang.
> >
> > ### Predefined Packages: math dan calendar
> >
> > Banyak *package* berguna sudah menjadi bagian **standard library** Python; sebagian besar distribusi juga membawa package di luar standar.
> >
> > ```python
> > import math
> > print(math.log(x, 2))            # logaritma basis 2
> >
> > import calendar as cal
> > c = cal.TextCalendar()
> > print(c.formatmonth(1949, 3))    # cetak kalender Maret 1949
> > print(cal.day_name[cal.weekday(2033, 12, 25)])  # hari Natal 2033
> > ```
> >
> > ### Operasi File Dasar
> >
> > File menyimpan hasil dari satu komputasi ke komputasi berikutnya. `open()` mengembalikan sebuah **file handle**:
> >
> > | Pemanggilan | Arti |
> > |---|---|
> > | `open(fn, 'w')` | buat file untuk **ditulis** (menimpa bila sudah ada) |
> > | `open(fn, 'r')` | buka file yang ada untuk **dibaca** |
> > | `open(fn, 'a')` | buka file yang ada untuk **ditambah** (append) |
> >
> > Method pada handle `fh`:
> >
> > - `fh.read()` → seluruh isi file sebagai satu string
> > - `fh.readline()` → baris berikutnya; `fh.readlines()` → list of string (satu elemen per baris)
> > - `fh.write(s)` → tulis string `s` di akhir file; `fh.writelines(S)` → tulis tiap elemen sekuens `S` sebagai baris
> > - `fh.close()` → tutup file
> >
> > File handle juga bisa langsung diiterasi: `for line in fh:` menghasilkan baris demi baris.
> >
> > ### Statement with
> >
> > `with` menjamin file **selalu ditutup**, bahkan bila terjadi error di tengah — menggantikan pola `try/finally` yang verbose:
> >
> > ```python
> > with open("kids.txt", 'w') as name_handle:
> >     n = int(input("Number of kids: "))
> >     for i in range(n):
> >         name = input("Enter name: ")
> >         name_handle.write(name + '\n')
> > # file otomatis tertutup di sini
> > ```
> >
> > ### Konvensi Import
> >
> > 1. **Satu modul per baris** `import`.
> > 2. Letakkan **semua import di awal** program.
> > 3. Urutkan: **modul standar** dulu, lalu **modul pihak ketiga** (mis. lewat Anaconda), terakhir **modul spesifik aplikasi**.

> [!cornell] #### Summary
>
> Program besar dipecah ke banyak file; sebuah **modul** adalah file `.py` berisi definisi dan statement. `import m` membuat namespace `m` yang diakses lewat **dot notation** (`m.pi`), sehingga `m.pi` dan `pi` lokal adalah objek berbeda. Varian: `from m import *` mem-bind semua objek modul ke scope kini tetapi **bukan** nama `m` sendiri; `import m as c` memberi alias. **Standard library** menyediakan package seperti `math` dan `calendar`. **File** memberi persistensi antar-eksekusi: `open(fn, mode)` dengan mode `'w'`/`'r'`/`'a'` mengembalikan **file handle** ber-method `read`/`readline`/`readlines`/`write`/`writelines`/`close`, dan handle bisa langsung diiterasi per baris. **`with open(...) as fh:`** menjamin file tertutup meski terjadi error. Konvensi import: satu modul per baris, semua di awal, urutan standar → pihak ketiga → aplikasi.

> [!ad-libitum]- Additional Information
>
> #### `if __name__ == "__main__"` dan Cara Modul Dijalankan
>
> Saat modul diimpor, **seluruh statement level-atasnya dieksekusi**. Idiom `if __name__ == "__main__":` membungkus kode yang hanya boleh jalan saat file dieksekusi langsung (`python circle.py`), bukan saat diimpor. Ini memisahkan "kode library" dari "kode skrip".
>
> #### Package, `__init__.py`, dan `sys.path`
>
> **Package** adalah direktori berisi modul (dan historisnya `__init__.py`). Python mencari modul di sepanjang `sys.path` (direktori skrip, `PYTHONPATH`, lalu lokasi instalasi). `pip` memasang package pihak ketiga dari PyPI; *virtual environment* (`venv`) mengisolasi dependensi per proyek.
>
> #### Encoding, Mode Biner, dan `pathlib`
>
> Selalu pertimbangkan `open(fn, 'r', encoding='utf-8')` untuk teks non-ASCII; mode `'rb'`/`'wb'` untuk data biner (gambar, pickle). `pathlib.Path` menawarkan API berorientasi objek untuk manipulasi path yang lebih aman lintas OS daripada string.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat modul `stats.py` berisi `mean`, `median`, `stdev` ber-docstring, lalu impor dari skrip terpisah dengan tiga varian `import` dan bandingkan.
> 2. Tulis program yang menyimpan 10 bilangan bulat positif pertama ke `intpos_file.txt` (satu per baris), lalu membacanya kembali dan mencetaknya — sekali dengan `open`/`close` manual, sekali dengan `with`.
> 3. Pakai `calendar` untuk menghitung selisih hari antara Thanksgiving AS dan Natal pada tahun pilihanmu.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab tentang Modules and Files.
> - Dokumentasi Python: *Modules*, *Reading and Writing Files*, *The Python Standard Library* (`math`, `calendar`, `pathlib`).
> - GeeksforGeeks: "with statement in Python".
