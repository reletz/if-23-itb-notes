---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Class Variable dan Operator Overloading Lanjutan (Studi Kasus Rabbit)
>
> > ## Questions/Cues
> >
> > - Apa perbedaan class variable dan instance variable, dan bagaimana `Rabbit.tag` mendemonstrasikan itu?
> > - Bagaimana `get_rid` memakai `.zfill()` untuk memformat id?
> > - Bagaimana cara mengimplementasikan `__add__` agar operator `+` menghasilkan objek Rabbit baru?
> > - Mengapa membandingkan objek langsung (`self.parent1 == other.parent1`) di dalam `__eq__` berbahaya, dan bagaimana `__eq__` yang benar ditulis?
> > - Apa yang sebenarnya "dibeli" OOP secara keseluruhan (dekomposisi, abstraksi, akses konsisten)?
> >
> > ## Reference Points
> >
> > - IF5100 — Object-Oriented Programming (Slides 39-43)
>
> > ### Class Variable vs Instance Variable
> >
> > **Class variable** dan nilainya **dibagikan (shared) di antara SEMUA instance** dari class tersebut — berbeda dari instance variable yang nilainya unik per objek. `Rabbit` mendemonstrasikan ini lewat variabel `tag`:
> >
> > ```python
> > class Rabbit(Mammal):
> >     tag = 1
> >     def __init__(self, age, parent1=None, parent2=None):
> >         Mammal.__init__(self, age)
> >         self.parent1 = parent1
> >         self.parent2 = parent2
> >         self.rid = Rabbit.tag
> >         Rabbit.tag += 1
> > ```
> >
> > `tag` adalah **class variable** — dideklarasikan langsung di bawah `class Rabbit(Mammal):`, **bukan** di dalam `__init__`. Sebaliknya, `parent1`, `parent2`, dan `rid` adalah **instance variable** biasa (spesifik tiap objek, dibuat lewat `self....` di `__init__`).
> >
> > `self.rid = Rabbit.tag` **membaca** nilai class variable saat ini dan menyimpannya sebagai id unik instance itu. `Rabbit.tag += 1` **menaikkan** class variable — perubahan ini berlaku untuk **class itu sendiri**, sehingga instance Rabbit berikutnya yang dibuat akan melihat nilai `tag` yang sudah bertambah. Dengan pola ini, `tag` berfungsi sebagai **penghasil id unik otomatis** untuk setiap instance `Rabbit` baru yang dibuat — mirip *auto-increment* pada database.
> >
> > ### Getter Rabbit dan `.zfill()`
> >
> > ```python
> > class Rabbit(Mammal):
> >     tag = 1
> >     def __init__(self, age, parent1=None, parent2=None):
> >         Mammal.__init__(self, age)
> >         self.parent1 = parent1
> >         self.parent2 = parent2
> >         self.rid = Rabbit.tag
> >         Rabbit.tag += 1
> >     def get_rid(self):
> >         return str(self.rid).zfill(3)
> >     def get_parent1(self):
> >         return self.parent1
> >     def get_parent2(self):
> >         return self.parent2
> > ```
> >
> > `get_rid` memakai method string bawaan `.zfill(3)` untuk **mengisi angka dengan nol di depan** hingga panjang 3 digit (mis. `"001"` alih-alih `"1"`). `Rabbit` juga mewarisi `get_name`/`get_age` dari `Animal` (lewat `Mammal`), sehingga tidak perlu didefinisikan ulang.
> >
> > ### Operator `+` untuk Tipe Sendiri: `__add__`
> >
> > ```python
> > def __add__(self, other):
> >     # returning object of same type as this class
> >     return Rabbit(0, self, other)
> > ```
> >
> > Ini mendefinisikan operator `+` antara dua instance `Rabbit`: `r4 = r1 + r2` (r1, r2 adalah instance Rabbit). `r4` adalah instance `Rabbit` **baru** dengan umur `0`; `r4` memiliki `self` sebagai satu parent dan `other` sebagai parent lainnya — mengacu langsung pada signature `__init__(self, age, parent1=None, parent2=None)` milik `Rabbit`. Pola ini menunjukkan bagaimana operator overloading bisa **membangun objek baru dari kombinasi dua objek lama**, mensimulasikan "perkawinan" dua kelinci menghasilkan anak.
> >
> > ### Membandingkan Dua Rabbit: `__eq__`
> >
> > Diputuskan bahwa dua kelinci adalah **saudara (sibling)** jika keduanya memiliki **dua parent yang sama**:
> >
> > ```python
> > def __eq__(self, other):
> >     parents_same = self.parent1.rid == other.parent1.rid \
> >                     and self.parent2.rid == other.parent2.rid
> >     parents_opposite = self.parent2.rid == other.parent1.rid \
> >                         and self.parent1.rid == other.parent2.rid
> >     return parents_same or parents_opposite
> > ```
> >
> > Perbandingan dilakukan lewat **id parent** (`.rid`), karena id itu **unik** (berkat class variable `tag`). Harus ditangani **dua kemungkinan urutan**: `R1 == R2` dan `R2 == R1` harus sama-sama benar terlepas urutan parent1/parent2 disimpan — karena itu kode memeriksa pasangan "sama" (`parents_same`) **dan** pasangan "silang/kebalikan" (`parents_opposite`).
> >
> > **Peringatan penting**: kita **tidak bisa** membandingkan objek Rabbit secara langsung di dalam `__eq__`, misalnya `self.parent1 == other.parent1`. Ini akan **memicu rekursi tak terkendali** — membandingkan dua objek Rabbit dengan `==` memanggil `__eq__` lagi, yang di dalamnya memanggil `==` lagi pada parent-nya, dan seterusnya — sampai akhirnya `__eq__` dipanggil pada nilai `None` (karena default `parent1`/`parent2` adalah `None`), menghasilkan **`AttributeError`** saat kode mencoba mengakses `None.parent1`. Itulah sebabnya kode membandingkan `.rid` (sebuah `int`) alih-alih membandingkan objek `Rabbit` secara langsung — `int` punya `__eq__` bawaan yang aman, tidak rekursif ke `Rabbit.__eq__`.
> >
> > ### Penutup: Apa yang Diberikan OOP
> >
> > OOP memungkinkan kita **membuat koleksi data sendiri**, **mengorganisasi informasi**, **membagi pekerjaan** (divide-and-conquer antar class), **mengakses informasi secara konsisten** (lewat interface/getter-setter yang seragam), dan **menambah lapisan kompleksitas** secara bertahap (lewat inheritance). Sebagaimana fungsi, **class adalah mekanisme dekomposisi dan abstraksi** dalam pemrograman — fungsi mendekomposisi/mengabstraksi *perilaku*, class mendekomposisi/mengabstraksi *data beserta perilakunya sekaligus*.

> [!cornell] #### Summary
>
> **Class variable** (`tag`, dideklarasikan langsung di badan class) **dibagikan di antara semua instance**, berbeda dari **instance variable** (`parent1`, `parent2`, `rid`) yang unik per objek; pola `self.rid = Rabbit.tag; Rabbit.tag += 1` memanfaatkan ini untuk **menghasilkan id unik otomatis**, ditampilkan rapi lewat `get_rid` yang memakai `str(...).zfill(3)`. **`__add__`** dioverload agar `r1 + r2` menghasilkan `Rabbit` baru dengan `age=0` dan kedua operand sebagai parent-nya — operator membangun objek baru dari kombinasi objek lama. **`__eq__`** mendefinisikan dua Rabbit sebagai "saudara" jika pasangan parent-nya sama (dicek dalam kedua urutan lewat `parents_same`/`parents_opposite`), dan **wajib membandingkan `.rid` (int)**, bukan objek Rabbit secara langsung — membandingkan objek langsung memicu **rekursi tak terkendali** pada `__eq__` yang akhirnya menabrak `None.parent1` dan melempar `AttributeError`. Secara keseluruhan, **OOP memberi**: koleksi data sendiri, organisasi informasi, pembagian kerja (divide-and-conquer), akses konsisten lewat interface, dan lapisan kompleksitas bertahap lewat inheritance — class, seperti fungsi, adalah **mekanisme dekomposisi dan abstraksi**.

> [!ad-libitum]- Additional Information
>
> #### `__hash__` Harus Konsisten dengan `__eq__`
>
> Ketika sebuah class mendefinisikan `__eq__`, Python **menonaktifkan** `__hash__` bawaannya secara default (objek jadi *unhashable*, tidak bisa dipakai sebagai key `dict` atau elemen `set`) — kecuali `__hash__` didefinisikan ulang secara eksplisit. Aturan pentingnya: **dua objek yang `__eq__`-nya `True` HARUS punya `__hash__` yang sama**, jika tidak perilaku `dict`/`set` menjadi rusak (objek "sama" bisa dianggap dua entri berbeda). Jika `Rabbit` ingin dipakai dalam `set`, perlu `__hash__` yang konsisten dengan definisi "saudara" di `__eq__`.
>
> #### `total_ordering` untuk Melengkapi Operator Perbandingan
>
> Dekorator `functools.total_ordering` memungkinkan mendefinisikan hanya `__eq__` dan satu operator lain (mis. `__lt__`), lalu Python otomatis melengkapi `__le__`, `__gt__`, `__ge__` — menghindari duplikasi kode untuk keenam operator perbandingan.
>
> #### Class Variable sebagai Registry/Counter — Pola Umum
>
> Pola `tag`/`rid` pada `Rabbit` adalah kasus khusus dari pola umum **"class-level registry"**: class variable berupa `list`/`dict`/counter yang melacak seluruh instance yang pernah dibuat (mis. `Rabbit.all_rabbits = []` yang di-`append` tiap `__init__`). Waspadai jebakan klasik: **default argument mutable** (`def __init__(self, tags=[])`) berbagi objek yang sama antar instance — beda dari class variable yang memang **sengaja** dibagikan; kasus mutable-default biasanya **tidak disengaja** dan jadi sumber bug.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan `__hash__` pada `Rabbit` yang konsisten dengan `__eq__` (mis. berbasis frozenset dari kedua `.rid` parent), lalu buktikan `Rabbit` bisa dimasukkan ke dalam `set` tanpa duplikat saudara.
> 2. Tambah class variable `Rabbit.population` yang berjalan naik tiap instance dibuat dan turun tiap instance "dihapus" (panggil manual method `retire()`), untuk melatih perbedaan class vs instance variable lebih jauh.
> 3. Implementasikan `__lt__` untuk `Rabbit` berdasarkan `age`, lalu pakai `sorted()` pada list berisi banyak `Rabbit` untuk mengurutkannya berdasarkan umur.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 8, bagian akhir "Generators" dan ringkasan OOP.
> - MIT OCW 6.0001, *Lecture 8: Object Oriented Programming* (bagian studi kasus Rabbit).
> - Dokumentasi Python: `object.__hash__`, `object.__eq__`; `functools.total_ordering`.
