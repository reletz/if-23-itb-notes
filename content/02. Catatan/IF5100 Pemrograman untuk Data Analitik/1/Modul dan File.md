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
> > `circle.py` pada slide juga memuat dua fungsi bola, dan program pemakainya mencetak lima baris (nilai di komentar):
> >
> > ```python
> > # tambahan di circle.py
> > def sphere_surface(radius):
> >     return 4.0 * area(radius)
> >
> > def sphere_volume(radius):
> >     return (4.0 / 3.0) * pi * (radius ** 3)
> >
> > # program pemakai
> > import circle
> > pi = 3
> > print(pi)                          # 3
> > print(circle.pi)                   # 3.14159
> > print(circle.area(3))              # 28.27431
> > print(circle.circumference(3))     # 18.849539999999998
> > print(circle.sphere_surface(3))    # 113.09724
> > print(circle.sphere_volume(3))     # 113.09723999999999
> > ```
> >
> > Perhatikan hasil `18.849539999999998`: artefak representasi *floating point*, bukan bug.
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
> > **Thanksgiving AS** selalu jatuh pada **Kamis keempat bulan November**. `calendar.monthcalendar(year, month)` mengembalikan list minggu (tiap minggu list 7 angka, hari di luar bulan bernilai `0`). Bila minggu pertama sudah memuat hari Kamis (`month[0][THURSDAY] != 0`), Kamis keempat ada di indeks minggu 3; bila tidak, ada di indeks minggu 4.
> >
> > ```python
> > import calendar as cal
> >
> > def find_thanksgiving(year):
> >     month = cal.monthcalendar(year, 11)
> >     if month[0][cal.THURSDAY] != 0:
> >         thanksgiving = month[3][cal.THURSDAY]
> >     else:
> >         thanksgiving = month[4][cal.THURSDAY]
> >     return thanksgiving
> >
> > print("In 2011", "U.S. Thanksgiving was on November", find_thanksgiving(2011))
> > # In 2011 U.S. Thanksgiving was on November 24
> > ```
> >
> > **Finger exercise**: tulis `shopping_days(year)` yang mengembalikan jumlah hari antara Thanksgiving AS dan Natal pada tahun tersebut. Spesifikasi slide: `year` berupa angka `<= 1941` (catatan: tanggal Thanksgiving 4th-Thursday secara hukum baru berlaku dari 1941/1942, sehingga solusi di bawah valid untuk tahun yang mengikuti aturan itu).
> >
> > ```python
> > def shopping_days(year):
> >     """year: a number <= 1941
> >     returns the number of days between US Thanksgiving and Christmas
> >     of the year"""
> >     # November punya 30 hari: sisa hari November + 25 hari Desember
> >     return (30 - find_thanksgiving(year)) + 25
> >
> > print(shopping_days(2011))   # 31  (24 Nov -> 25 Des)
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
> > Contoh **append lalu baca ulang** `kids.txt`:
> >
> > ```python
> > # baca isi file
> > with open("kids.txt", 'r') as name_handle:
> >     for line in name_handle:
> >         print(line)          # tiap baris dicetak dengan baris kosong di bawahnya
> >
> > # tambah dua nama, lalu baca ulang
> > name_handle = open("kids.txt", 'a')
> > for i in range(2):
> >     name = input("Enter new name: ")
> >     name_handle.write(name + '\n')
> > name_handle.close()
> >
> > name_handle = open("kids.txt", 'r')
> > for line in name_handle:
> >     print(line)
> > name_handle.close()
> > ```
> >
> > - **Gotcha baris kosong**: `line` sudah berakhir `'\n'`, dan `print` menambah `'\n'` lagi, sehingga keluaran berjarak dua baris. Perbaiki dengan `print(line, end='')` atau `print(line.strip())`.
> > - **`write()` hanya menerima string**: `fh.write(5)` memunculkan `TypeError`; ubah dulu dengan `str(5)`.
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
> > Tiga cara menulis ke file, dari yang paling rawan ke yang paling aman:
> >
> > ```python
> > # 1) open/close manual: bila write() error, close() tidak pernah tercapai
> > file = open('file_path', 'w')
> > file.write('hello world !')
> > file.close()
> >
> > # 2) try/finally: file pasti ditutup, tetapi verbose
> > file = open('file_path', 'w')
> > try:
> >     file.write('hello world')
> > finally:
> >     file.close()
> >
> > # 3) with: ringkas dan otomatis menutup file
> > with open('file_path', 'w') as file:
> >     file.write('hello world !')
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
