[[IF5100 Pemrograman untuk Data Analitik]]

---

8.1 (concept) An object bundles three things (per the deck). Name them, using `[1,5,7]` (a list) as your example.

8.2 (write) Implement the `Coordinate` class from the deck: `__init__(self, x, y)`, a `distance(self, other)` method, and a `__str__` that prints `<x,y>`.

8.3 (trace) Given that `Coordinate`, what prints?

```python
c = Coordinate(3, 4)
zero = Coordinate(0, 0)
print(c.distance(zero))
print(c)
```

8.4 (concept) Explain information hiding: why should code outside the class call `a.get_age()` instead of `a.age`? What breaks if the author renames `age` to `years`?

8.5 (write, the deck's Fractions exercise) Create a `Fraction` class storing numerator and denominator as ints, supporting `__add__`, `__str__`, an `invert()` method, and a `to_float()`.

8.6 (write, inheritance) Given a `Mammal` base class with `age`, `name`, getters/setters and `__str__`, write a `Cat(Mammal)` subclass that adds `speak()` (prints `"meow"`) and overrides `__str__`. Note which methods `Cat` inherits without rewriting.

8.7 (write, class variable) Implement `Rabbit(Mammal)` using a class variable `tag` to assign each new rabbit a unique id. Explain why `tag` is shared across all instances.

8.8 (write, operator overloading) Add `__add__` to `Rabbit` so `r1 + r2` returns a new age-0 `Rabbit` whose parents are `r1` and `r2`, and `__eq__` so two rabbits are equal iff they share the same two parents.

8.9 (concept) When looking up a method on an instance, how does Python decide which class's version to use? Illustrate with `Cat`, `Mammal`, `object`.

8.10 (trace, default argument) Given `Animal` with `set_name(self, newname="")`, what do the following print?

```python
a = Animal(3)
print(a.get_name())
a.set_name()
print(repr(a.get_name()))
a.set_name("fluffy")
print(a.get_name())
```

8.11 (trace, type vs isinstance) Given the `Person`/`Student` hierarchy from the deck with `c = Coordinate(3, 4)`, `s = Student("alice", 20, "CS")`, and `p = Person("jack", 30)`, what does each expression evaluate to (Python 3)? `type(c)`, `type(Coordinate)`, `isinstance(c, Coordinate)`, `isinstance(s, Person)`, `isinstance(p, Student)`, `type(s) == Person`.

8.12 (concept) `Person.__init__(self, name, age)` calls `Mammal.__init__(self, age)` explicitly. What happens if that line is deleted? Which calls fail afterwards?

8.13 (trace, inheritance chain) Using the deck's `Person` and `Student`, what prints?

```python
p = Person("jack", 30)
s = Student("alice", 20, "CS")
p.add_friend("jill")
p.add_friend("jill")
print(p.get_friends())
s.change_major("EE")
print(s)
s.age_diff(p)
```

8.14 (trace, class variable and zfill) Starting from `Rabbit.tag == 1`, what prints?

```python
r1 = Rabbit(3)
r2 = Rabbit(4)
r3 = r1 + r2
print(r3.get_rid())
print(r3.get_parent1().get_rid())
print(Rabbit.tag)
```

8.15 (concept/trace) Suppose `__eq__` is written as `self.parent1 == other.parent1 and self.parent2 == other.parent2` (comparing `Rabbit` objects, not `.rid`). With `a = Rabbit(1)`, `b = Rabbit(2)`, `c = Rabbit(0, a, b)`, trace `a == c`. What error occurs and why?

8.16 (write) Add `__len__` and `__lt__` to a class `Stack` that stores a list `items`, so that `len(s)` returns the number of items and `s1 < s2` compares by length. Does `s1 > s2` work without defining `__gt__`? What about `s1 <= s2`?

---

8.1. Pembahasan: Sebuah objek membungkus **(1) sebuah tipe**, **(2) representasi data internal**, dan **(3) sekumpulan prosedur** (method) untuk berinteraksi dengannya. Untuk `[1,5,7]`: **tipe**-nya adalah `list`; **representasi internal**-nya adalah array dinamis di memori yang menyimpan ketiga integer itu secara berurutan; **prosedurnya** adalah kumpulan method/operasi bawaan `list` seperti `len()`, `.append()`, pengindeksan `L[i]`, `L[i:j]`, dst.

8.2.
```python
class Coordinate(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def distance(self, other):
        x_diff_sq = (self.x - other.x) ** 2
        y_diff_sq = (self.y - other.y) ** 2
        return (x_diff_sq + y_diff_sq) ** 0.5
    def __str__(self):
        return "<" + str(self.x) + "," + str(self.y) + ">"
```

8.3. Kode verifikasi:
```python
c = Coordinate(3, 4)
zero = Coordinate(0, 0)
print(c.distance(zero))   # 5.0
print(c)                   # <3,4>
```
`distance` menghitung jarak Euclidean: `√((3-0)² + (4-0)²) = √25 = 5.0`. `print(c)` memanggil `__str__`, menghasilkan `<3,4>`.

8.4. Pembahasan: Kode di luar class **seharusnya tidak bergantung pada nama atribut data internal** — memanggil `a.get_age()` (lewat *interface*/method) daripada langsung `a.age` menjaga **information hiding**: penulis class bebas mengubah **bagaimana** data itu direpresentasikan secara internal tanpa mematahkan kode pemanggil, selama *interface* (nama method, tipe kembalian) tidak berubah. Kalau penulis class mengubah nama atribut `age` menjadi `years` (misal demi konsistensi internal), semua kode di luar yang memakai `a.age` langsung akan **rusak** (`AttributeError: 'Animal' object has no attribute 'age'`) — sedangkan kode yang memakai `a.get_age()` **tetap aman**, karena penulis class cukup mengubah isi `get_age()` menjadi `return self.years` tanpa mengubah nama method-nya sama sekali.

8.5.
```python
class Fraction:
    def __init__(self, numerator, denominator):
        self.numerator = numerator
        self.denominator = denominator
    def __add__(self, other):
        new_num = self.numerator * other.denominator + other.numerator * self.denominator
        new_den = self.denominator * other.denominator
        return Fraction(new_num, new_den)
    def __str__(self):
        return str(self.numerator) + "/" + str(self.denominator)
    def invert(self):
        return Fraction(self.denominator, self.numerator)
    def to_float(self):
        return self.numerator / self.denominator
```
Verifikasi: `Fraction(1,2) + Fraction(1,3)` → `5/6`, `.to_float()` → `0.833...`, `Fraction(1,2).invert()` → `2/1`.

8.6.
```python
class Cat(Mammal):
    def speak(self):
        print("meow")
    def __str__(self):
        return "cat:" + str(self.name) + ":" + str(self.age)
```
`Cat` **mewarisi tanpa menulis ulang**: `__init__`, `get_age`, `get_name`, `set_age`, `set_name` — semuanya dipakai langsung dari `Mammal` (walau tidak muncul di badan `Cat`). Hanya `speak` (baru) dan `__str__` (override) yang ditulis ulang di `Cat`.

8.7.
```python
class Rabbit(Mammal):
    tag = 1
    def __init__(self, age, parent1=None, parent2=None):
        Mammal.__init__(self, age)
        self.parent1 = parent1
        self.parent2 = parent2
        self.rid = Rabbit.tag
        Rabbit.tag += 1
```
`tag` dideklarasikan **langsung di bawah `class Rabbit`**, bukan di dalam `__init__` sebagai `self.tag` — ini menjadikannya **class variable**, yang hidup di objek class `Rabbit` itu sendiri dan **dibagikan** (satu salinan saja) oleh **semua instance**, bukan digandakan per instance seperti `self.parent1`/`self.rid` (instance variable). Karena semua instance mengakses `Rabbit.tag` yang sama, setiap kali sebuah Rabbit baru dibuat dan menjalankan `Rabbit.tag += 1`, perubahan itu **terlihat oleh semua Rabbit lain** — inilah yang membuat `tag` cocok dipakai sebagai penghasil id unik yang terus bertambah (*auto-increment*).

8.8.
```python
def __add__(self, other):
    return Rabbit(0, self, other)

def __eq__(self, other):
    parents_same = self.parent1.rid == other.parent1.rid \
                    and self.parent2.rid == other.parent2.rid
    parents_opposite = self.parent2.rid == other.parent1.rid \
                        and self.parent1.rid == other.parent2.rid
    return parents_same or parents_opposite
```
`__add__` memungkinkan `r1 + r2` langsung memanggil `Rabbit(0, r1, r2)` — bayi Rabbit baru berumur 0 dengan `r1`/`r2` sebagai kedua induknya. `__eq__` membandingkan **`.rid`** (integer unik dari class variable `tag`) milik masing-masing induk, bukan objek induknya secara langsung — dan harus mengecek **dua kemungkinan pasangan** (`parents_same` dan `parents_opposite`) supaya `r1 == r2` dan `r2 == r1` tetap konsisten walau urutan `parent1`/`parent2` di dua rabbit itu terbalik. Terverifikasi: dua Rabbit hasil `r1 + r2` yang berbeda tetap dianggap `==` (bersaudara) karena berbagi kedua induk yang sama.

8.9. Pembahasan: Python mencari method mulai dari **class instance itu sendiri** — jika ditemukan, langsung dipakai. Jika tidak, Python **naik satu tingkat ke superclass**-nya, lalu ke superclass di atasnya lagi, dan seterusnya, memakai **method pertama yang ditemukan** di sepanjang rantai itu (urutan pencarian ini disebut *Method Resolution Order*/MRO). Ilustrasi dengan `Cat` → `Mammal` → `object`: memanggil `instance_cat.speak()` — Python cek `Cat` dulu, ketemu `speak` di sana (Cat sendiri yang mendefinisikannya) → langsung dipakai, pencarian berhenti. Memanggil `instance_cat.get_age()` — Python cek `Cat`, **tidak ada** `get_age` di sana → naik ke `Mammal`, ketemu → dipakai. Memanggil sesuatu yang tidak didefinisikan di `Cat` maupun `Mammal` (misal representasi default sebelum `__str__` di-override) — Python akan naik lagi sampai ke `object`, superclass paling atas dari semua class Python.

8.10. Pembahasan: Baris pertama mencetak `None`, karena `__init__` menginisialisasi `self.name = None` dan `set_name` belum dipanggil. `a.set_name()` tanpa argumen memakai **default argument** `newname=""`, sehingga `repr(...)` menampilkan `''` (string kosong, bukan `None`). `a.set_name("fluffy")` memakai argumen yang dikirim, bukan default, sehingga mencetak `fluffy`. Keluaran: `None`, `''`, `fluffy`.

8.11. Pembahasan (Python 3, terverifikasi): `type(c)` adalah `<class '__main__.Coordinate'>`; `type(Coordinate)` adalah `<class 'type'>` (sebuah class adalah instance dari `type`); `isinstance(c, Coordinate)` adalah `True`; `isinstance(s, Person)` adalah `True` karena `Student` adalah subclass `Person`; `isinstance(p, Student)` adalah `False` (superclass bukan instance dari subclass-nya); `type(s) == Person` adalah `False` karena `type()` hanya mengembalikan class **persis** (`Student`), tanpa memperhitungkan pewarisan. Inilah beda utama `type` (kesamaan persis) dan `isinstance` (memperhitungkan hierarki).

8.12. Pembahasan: Karena `Person` mendefinisikan `__init__`-nya sendiri, `__init__` milik `Mammal`/`Animal` **tidak dipanggil otomatis**. Tanpa `Mammal.__init__(self, age)`, atribut `self.age` dan `self.name` tidak pernah dibuat (hanya `friends` dan nama via `set_name`). `Person("jack", 30).get_name()` masih berjalan (`set_name` menulis `self.name`), tetapi `get_age()` dan `age_diff()` melempar `AttributeError: 'Person' object has no attribute 'age'`. Umur `30` yang dikirim ke konstruktor juga hilang begitu saja.

8.13. Pembahasan (terverifikasi): `add_friend` memeriksa `if fname not in self.friends`, sehingga pemanggilan kedua tidak menambah duplikat; `print(p.get_friends())` mencetak `['jill']`. `s.change_major("EE")` mengubah `major`, dan `print(s)` memakai `__str__` milik `Student`: `student:alice:20:EE`. `s.age_diff(p)` memakai method yang **diwarisi** dari `Person`: `abs(20 - 30)` sehingga mencetak `10 year difference`.

8.14. Pembahasan (terverifikasi): `r1.rid = 1`, `r2.rid = 2`, dan `r3 = r1 + r2` membuat `Rabbit(0, r1, r2)` dengan `rid = 3`. `r3.get_rid()` mengembalikan `str(3).zfill(3)` yaitu `003`. `r3.get_parent1()` adalah `r1`, sehingga `get_rid()`-nya `001`. Setelah tiga instance dibuat, `Rabbit.tag` bernilai `4`. Keluaran: `003`, `001`, `4`.

8.15. Pembahasan (terverifikasi): `a == c` memanggil `a.__eq__(c)`, yang mengevaluasi `a.parent1 == c.parent1`, yaitu `None == a`. `None` tidak tahu cara membandingkan dirinya dengan `Rabbit`, sehingga Python mencoba sisi sebaliknya, `a.__eq__(None)`; di dalamnya `other.parent1` adalah `None.parent1`, yang melempar `AttributeError: 'NoneType' object has no attribute 'parent1'`. Membandingkan **objek** memicu `__eq__` bersarang menyusuri pohon silsilah sampai menabrak `None` (parent default). Perbandingan `c == d` dengan `d = Rabbit(0, b, a)` tidak error dan bernilai `True` (rekursi berhenti di kelinci tanpa parent), tetapi bergantung pada kebetulan itu. Solusinya membandingkan `.rid` (integer) seperti pada 8.8.

8.16.
```python
class Stack:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)
    def __lt__(self, other):
        return len(self) < len(other)
```
Verifikasi dengan `s1 = Stack([1, 2])`, `s2 = Stack([1, 2, 3])`: `len(s1)` adalah `2`, `s1 < s2` adalah `True`, `s2 < s1` adalah `False`. `s1 > s2` **bisa jalan tanpa `__gt__`**: Python mencoba `s1.__gt__(s2)` (tidak ada), lalu memakai refleksinya `s2.__lt__(s1)`, sehingga `False`. `s1 <= s2` melempar `TypeError: '<=' not supported between instances of 'Stack' and 'Stack'` karena `__le__` (dan refleksinya `__ge__`) tidak didefinisikan. Untuk melengkapi semua operator, definisikan `__eq__` dan pakai `functools.total_ordering`.
