---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Membuat dan Menggunakan Class - Atribut dan Method
>
> > ## Questions/Cues
> >
> > - Apa perbedaan antara "mengimplementasikan" class dan "menggunakan" instance dari class itu?
> > - Apa peran `__init__`, `self`, dan `object` saat mendefinisikan class baru?
> > - Bagaimana cara mendefinisikan dan memanggil method, dan mengapa `c.distance(zero)` setara dengan `Coordinate.distance(c, zero)`?
> > - Mengapa kita perlu mendefinisikan `__str__`, dan apa yang terjadi jika tidak?
> > - Apa perbedaan makna `type(c)` vs `isinstance(c, Coordinate)`?
> >
> > ## Reference Points
> >
> > - IF5100 — Object-Oriented Programming (Slides 10-20)
>
> > ### Implementasi vs Penggunaan Class
> >
> > Ada dua perspektif berbeda saat bekerja dengan class: **membuat (creating)** class baru, dan **menggunakan (using)** instance dari class itu. **Membuat class** berarti mendefinisikan nama class dan atribut-atributnya — misalnya seseorang menulis kode untuk mengimplementasikan class `list` itu sendiri. **Menggunakan class** berarti membuat instance baru dari objek itu dan melakukan operasi padanya — misalnya `L = [1,2]` lalu `len(L)`, tanpa perlu tahu bagaimana `list` diimplementasikan di baliknya.
> >
> > ### Mendefinisikan Class Baru dengan `class`
> >
> > Class baru didefinisikan dengan keyword `class`, mirip `def` untuk fungsi — indentasi menandai kode yang menjadi bagian dari definisi class:
> >
> > ```python
> > class Coordinate(object):
> >     #define attributes here
> > ```
> >
> > Kata `object` di dalam kurung berarti `Coordinate` **mewarisi (inherit)** semua atribut milik `object` — `Coordinate` adalah **subclass** dari `object`, dan `object` adalah **superclass** dari `Coordinate`. Ini adalah bentuk paling dasar dari **inheritance**, yang akan diperluas ke hierarki class custom pada topik berikutnya.
> >
> > ### Apa Itu Attribute?
> >
> > Attribute adalah data dan prosedur yang "**dimiliki**" oleh class. **Data attribute** adalah objek-objek lain yang menyusun class itu (mis. sebuah `Coordinate` tersusun dari dua angka). **Method (procedural attribute)** adalah fungsi yang hanya bermakna untuk class tersebut — misalnya "jarak antar dua koordinat" masuk akal untuk didefinisikan, tetapi "jarak antar dua list" tidak punya makna alami.
> >
> > ### `__init__`: Cara Membuat Instance
> >
> > Method spesial `__init__` (diapit *double underscore*, disebut **dunder method**) dipakai untuk menginisialisasi data attribute saat instance dibuat:
> >
> > ```python
> > class Coordinate(object):
> >     def __init__(self, x, y):
> >         self.x = x
> >         self.y = y
> > ```
> >
> > `self` adalah parameter yang merujuk pada **instance itu sendiri**. `self.x` dan `self.y` adalah dua **data attribute** (disebut juga **instance variable**) milik setiap objek `Coordinate`. Saat instance benar-benar dibuat:
> >
> > ```python
> > c = Coordinate(3,4)
> > origin = Coordinate(0,0)
> > print(c.x)
> > print(origin.x)
> > ```
> >
> > baris pertama membuat objek baru bertipe `Coordinate`, meneruskan `3` dan `4` ke `__init__`. Notasi titik (`.`) dipakai untuk mengakses atribut instance `c`. **Kita tidak pernah memberi argumen untuk `self` secara eksplisit — Python melakukannya secara otomatis.**
> >
> > ### Method: Procedural Attribute
> >
> > Method adalah *procedural attribute* — mirip fungsi biasa, tetapi hanya bekerja untuk class tersebut. Python **selalu meneruskan objeknya sendiri sebagai argumen pertama**; konvensinya menamai argumen pertama ini `self` di semua method. Operator `.` dipakai untuk mengakses attribute apa pun — baik data attribute maupun method.
> >
> > ```python
> > class Coordinate(object):
> >     def __init__(self, x, y):
> >         self.x = x
> >         self.y = y
> >     def distance(self, other):
> >         x_diff_sq = (self.x-other.x)**2
> >         y_diff_sq = (self.y-other.y)**2
> >         return (x_diff_sq + y_diff_sq)**0.5
> > ```
> >
> > Selain adanya `self` dan notasi titik, method berperilaku persis seperti fungsi biasa: menerima parameter, melakukan operasi, dan mengembalikan nilai.
> >
> > ### Dua Cara Memanggil Method yang Setara
> >
> > ```python
> > c = Coordinate(3,4)
> > zero = Coordinate(0,0)
> > print(c.distance(zero))
> > ```
> >
> > setara persis dengan:
> >
> > ```python
> > c = Coordinate(3,4)
> > zero = Coordinate(0,0)
> > print(Coordinate.distance(c,zero))
> > ```
> >
> > Pemanggilan konvensional `c.distance(zero)` — objek tempat method dipanggil, nama method, lalu parameter **tanpa** `self` (karena `self` implisit adalah `c`) — setara dengan memanggil method langsung pada class-nya dan secara eksplisit meneruskan objek sebagai argumen pertama.
> >
> > ### Representasi Print: `__str__`
> >
> > Secara default, `print(c)` menghasilkan representasi yang tidak informatif:
> >
> > ```
> > >>> c = Coordinate(3,4)
> > >>> print(c)
> > <__main__.Coordinate object at 0x7fa918510488>
> > ```
> >
> > Dengan mendefinisikan method `__str__`, kita menentukan sendiri apa yang ditampilkan Python saat `print` dipanggil pada objek class kita — `__str__` **harus mengembalikan sebuah string**:
> >
> > ```python
> > class Coordinate(object):
> >     def __init__(self, x, y):
> >         self.x = x
> >         self.y = y
> >     def distance(self, other):
> >         x_diff_sq = (self.x-other.x)**2
> >         y_diff_sq = (self.y-other.y)**2
> >         return (x_diff_sq + y_diff_sq)**0.5
> >     def __str__(self):
> >         return "<"+str(self.x)+","+str(self.y)+">"
> > ```
> >
> > Sekarang `print(c)` menghasilkan `<3,4>`.
> >
> > ### Memahami Type dan Class
> >
> > ```
> > >>> c = Coordinate(3,4)
> > >>> print(c)
> > <3,4>
> > >>> print(type(c))
> > <class __main__.Coordinate>
> > >>> print(Coordinate)
> > <class __main__.Coordinate>
> > >>> print(type(Coordinate))
> > <type 'type'>
> > >>> print(isinstance(c, Coordinate))
> > True
> > ```
> >
> > Tipe objek `c` adalah class `Coordinate`. `Coordinate` **adalah sebuah class**; class `Coordinate` **adalah sebuah tipe objek**. Fungsi `isinstance()` memeriksa apakah suatu objek merupakan instance dari class tertentu.

> [!cornell] #### Summary
>
> **Membuat class** (definisi, atribut) berbeda dari **menggunakan class** (instansiasi, operasi). Class baru didefinisikan lewat `class NamaClass(object):`, mewarisi `object` sebagai superclass. **`__init__(self, ...)`** menginisialisasi **data attribute/instance variable** lewat `self.atribut = nilai`, dan dipanggil otomatis saat instance dibuat (`c = Coordinate(3,4)`); `self` selalu diisi otomatis oleh Python. **Method** adalah *procedural attribute* yang selalu menerima objeknya sendiri sebagai argumen pertama (`self`); pemanggilan `c.distance(zero)` setara dengan `Coordinate.distance(c, zero)`. Notasi titik (`.`) mengakses attribute apa pun — data maupun method. **`__str__(self)`** mendefinisikan representasi string kustom untuk `print()`, dan harus mengembalikan string. `type(c)` mengembalikan class dari objek `c`; `isinstance(c, Coordinate)` memeriksa keanggotaan class — keduanya menegaskan bahwa sebuah class sekaligus **adalah** sebuah tipe objek.

> [!ad-libitum]- Additional Information
>
> #### `__repr__` vs `__str__`
>
> Selain `__str__` (representasi "ramah pengguna" untuk `print`), Python punya **`__repr__`** — representasi "tidak ambigu", idealnya bisa di-*eval* ulang untuk membentuk objek yang sama (`repr(c)` atau tampilan di REPL interaktif). Jika `__str__` tidak didefinisikan, Python jatuh kembali ke `__repr__`. Konvensi umum: `__repr__` untuk debugging (`Coordinate(x=3, y=4)`), `__str__` untuk tampilan pengguna (`<3,4>`).
>
> #### `@property`: Getter/Setter yang Lebih Pythonic
>
> Dekorator `@property` memungkinkan method diakses seolah-olah data attribute biasa (`c.x` alih-alih `c.get_x()`), sambil tetap menjalankan logika validasi di baliknya:
> ```python
> class Coordinate(object):
>     def __init__(self, x, y):
>         self._x = x
>     @property
>     def x(self):
>         return self._x
>     @x.setter
>     def x(self, value):
>         if not isinstance(value, (int, float)):
>             raise TypeError("x harus angka")
>         self._x = value
> ```
> Ini akan dibahas lebih lanjut sebagai alternatif getter/setter eksplisit pada topik information hiding.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan method `__repr__` ke class `Coordinate` dan bandingkan hasil `print(c)` dengan mengetik `c` langsung di REPL.
> 2. Implementasikan class `Vector2D` dengan `__init__`, `distance`, `__str__`, lalu tambahkan method `midpoint(self, other)` yang mengembalikan `Coordinate` baru.
> 3. Coba panggil `Coordinate.distance(c, zero)` dan `c.distance(zero)` lalu buktikan hasilnya identik dengan `assert`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 8, bagian "Defining New Classes".
> - MIT OCW 6.0001, *Lecture 8: Object Oriented Programming*.
> - Dokumentasi Python: *Data Model* — `object.__init__`, `object.__str__`, `object.__repr__`.
