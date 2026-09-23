---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Operator Khusus, Getter-Setter, dan Information Hiding
>
> > ## Questions/Cues
> >
> > - Bagaimana operator seperti `+`, `==`, `<` bisa "bekerja" pada objek buatan sendiri?
> > - Apa fungsi getter dan setter, dan mengapa method itu dipakai alih-alih mengakses attribute langsung?
> > - Skenario apa yang menunjukkan bahaya mengakses data attribute langsung dari luar class?
> > - Dengan cara apa Python "lemah" dalam information hiding dibanding bahasa lain?
> > - Apa itu default argument pada method, dan bagaimana efeknya bila argumen tidak diberikan?
> >
> > ## Reference Points
> >
> > - IF5100 — Object-Oriented Programming (Slides 21-27)
>
> > ### Special Operator: Mengoperasikan Objek Sendiri
> >
> > Operator seperti `+`, `-`, `==`, `<`, `>`, serta fungsi bawaan seperti `len()` dan `print`, bisa **dioverride** agar bekerja pada class buatan sendiri, dengan mendefinisikan **dunder method** tertentu:
> >
> > | Dunder method | Dipicu oleh |
> > |---|---|
> > | `__add__(self, other)` | `self + other` |
> > | `__sub__(self, other)` | `self - other` |
> > | `__eq__(self, other)` | `self == other` |
> > | `__lt__(self, other)` | `self < other` |
> > | `__len__(self)` | `len(self)` |
> > | `__str__(self)` | `print(self)` |
> >
> > dan masih banyak lainnya (lihat dokumentasi Python bagian *data model — basic customization*). Ini adalah mekanisme yang sama seperti `__init__` dan `__str__` yang sudah dibahas sebelumnya — Python memanggil method dunder yang sesuai secara otomatis ketika operator/fungsi terkait dipakai pada objek.
> >
> > ### Contoh: Class Animal
> >
> > ```python
> > # class definition
> > class Animal(object):
> >     def __init__(self, age):
> >         self.age = age
> >         self.name = None
> > # using the class
> > myanimal = Animal(3)
> > ```
> >
> > `name` diinisialisasi `None` karena belum diberikan saat objek dibuat — pola umum untuk data attribute yang nilainya ditentukan belakangan.
> >
> > ### Getter dan Setter
> >
> > ```python
> > class Animal(object):
> >     def __init__(self, age):
> >         self.age = age
> >         self.name = None
> >     def get_age(self):
> >         return self.age
> >     def get_name(self):
> >         return self.name
> >     def set_age(self, newage):
> >         self.age = newage
> >     def set_name(self, newname=""):
> >         self.name = newname
> >     def __str__(self):
> >         return "animal:"+str(self.name)+":"+str(self.age)
> > ```
> >
> > **Getter** (`get_age`, `get_name`) membaca nilai data attribute; **setter** (`set_age`, `set_name`) mengubahnya. Aturan praktisnya: **getter dan setter sebaiknya dipakai dari luar class** untuk mengakses data attribute, bukan mengakses attribute-nya secara langsung.
> >
> > ### Mengapa Information Hiding Penting
> >
> > Penulis definisi class bisa saja **mengubah nama variabel data attribute** di kemudian hari — misalnya mengganti `age` menjadi `years`:
> >
> > ```python
> > class Animal(object):
> >     def __init__(self, age):
> >         self.years = age
> >     def get_age(self):
> >         return self.years
> > ```
> >
> > Jika kode di luar class mengakses data attribute secara langsung (`a.age`) dan definisi class berubah seperti di atas, kode itu akan **error** karena attribute `age` sudah tidak ada. Sebaliknya, kode yang memakai `a.get_age()` **tetap aman** karena interface getter-nya tidak berubah — hanya implementasi di dalamnya yang disesuaikan. Karena itu, di luar class **selalu gunakan getter/setter** (`a.get_age()`, BUKAN `a.age`) — ini gaya yang baik, memudahkan pemeliharaan kode, dan mencegah bug.
> >
> > ### Python Lemah dalam Information Hiding
> >
> > Berbeda dari bahasa lain yang memaksakan enkapsulasi (mis. lewat `private`), **Python mengizinkan**:
> >
> > - **membaca** data langsung dari luar definisi class (`print(a.age)`);
> > - **menulis** ke data langsung dari luar (`a.age = 'infinite'`);
> > - bahkan **membuat data attribute baru** untuk sebuah instance dari luar definisi class-nya (`a.size = "tiny"`).
> >
> > **Ketiganya BUKAN gaya yang baik**, meskipun secara teknis diizinkan Python — konvensi dan disiplin programmer-lah yang menjaga enkapsulasi, bukan penegakan bahasa.
> >
> > ### Default Argument pada Method
> >
> > Default argument pada formal parameter dipakai jika tidak ada actual argument yang diberikan saat pemanggilan:
> >
> > ```python
> > def set_name(self, newname=""):
> >     """ INPUT PARAMETER: ... """
> >     self.name = newname
> > ```
> >
> > ```python
> > a = Animal(3)
> > a.set_name("nama apapun")
> > print(a.get_name())   # mencetak "nama apapun" -- argumen yang diberikan dipakai
> > ```
> >
> > Sebaliknya, jika `set_name()` dipanggil **tanpa argumen**, default `""` yang dipakai.
> >
> > ### Latihan: Class Fraction
> >
> > Sebagai latihan mandiri, rancang tipe baru untuk merepresentasikan bilangan sebagai **pecahan (fraction)**. Representasi internalnya adalah **dua bilangan bulat**: pembilang (*numerator*) dan penyebut (*denominator*). Interface/method-nya mencakup: **menjumlahkan**, **mengurangkan**, **representasi print**, **mengonversi ke float**, dan **membalik pecahan (invert)**.

> [!cornell] #### Summary
>
> Operator seperti `+`, `-`, `==`, `<`, dan fungsi `len()`/`print` bisa dioverload pada class sendiri lewat **dunder method** (`__add__`, `__sub__`, `__eq__`, `__lt__`, `__len__`, `__str__`, dst.). Contoh `Animal` menunjukkan pola **getter** (`get_age`, `get_name`) dan **setter** (`set_age`, `set_name`) sebagai cara resmi mengakses/mengubah data attribute dari luar class. **Information hiding** penting karena implementasi internal class bisa berubah (mis. `age` → `years`); kode luar yang memakai getter/setter **tetap aman**, sedangkan yang mengakses attribute langsung akan **rusak**. Namun **Python lemah dalam menegakkan information hiding**: attribute tetap bisa dibaca, ditulis, bahkan dibuat baru dari luar class — ini **bukan praktik yang baik** meski diizinkan secara teknis; disiplin memakai getter/setter tetap tanggung jawab programmer. **Default argument** pada method (`def set_name(self, newname="")`) dipakai bila pemanggil tidak memberi argumen. Latihan `Fraction` merangkum semua konsep ini: representasi internal privat (numerator/denominator) + interface publik (tambah, kurang, print, ke-float, invert).

> [!ad-libitum]- Additional Information
>
> #### Konvensi Underscore: `_protected` dan `__private`
>
> Python tidak punya `private` sejati, tetapi punya **konvensi**: awalan satu underscore (`_age`) menandakan "internal, jangan diakses dari luar" (hanya konvensi, tidak dipaksakan). Awalan **dua underscore** (`__age`) memicu **name mangling** — Python mengganti nama menjadi `_NamaClass__age` secara internal, membuatnya lebih sulit (tapi tetap tidak mustahil) diakses tanpa sengaja dari luar atau dari subclass.
>
> #### `@property` sebagai Getter/Setter Modern
>
> Alih-alih `get_age()`/`set_age()` eksplisit, Python modern sering memakai dekorator `@property` dan `@nama.setter` agar attribute tetap diakses dengan sintaks `a.age` namun tervalidasi di baliknya — mendapat keamanan getter/setter tanpa mengorbankan sintaks yang ringkas. Ini relevan langsung dengan masalah information hiding yang dibahas di atas.
>
> #### `dataclasses` untuk Class Berisi Data
>
> Modul `dataclasses` (`@dataclass`) mengotomatisasi pembuatan `__init__`, `__repr__`, dan `__eq__` untuk class yang didominasi data attribute, mengurangi boilerplate seperti pada `Coordinate`/`Animal`:
> ```python
> from dataclasses import dataclass
> @dataclass
> class Fraction:
>     numerator: int
>     denominator: int
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan class `Fraction` penuh sesuai spesifikasi slide: `__init__`, `__add__`, `__sub__`, `__str__`, method `to_float()`, dan `invert()`.
> 2. Tambahkan `__eq__` dan `__lt__` pada `Fraction` agar dua pecahan bisa dibandingkan nilainya (mis. `1/2 == 2/4` harus `True`).
> 3. Ubah `Animal` agar `age` memakai `@property` dengan validasi "umur tidak boleh negatif", lalu buktikan `a.age = -5` melempar `ValueError`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 8, bagian "Data Abstraction and Encapsulation".
> - MIT OCW 6.0001, *Lecture 8: Object Oriented Programming*.
> - Dokumentasi Python: *Data Model — basic customization* (docs.python.org/3/reference/datamodel.html#basic-customization); PEP 557 (`dataclasses`).
