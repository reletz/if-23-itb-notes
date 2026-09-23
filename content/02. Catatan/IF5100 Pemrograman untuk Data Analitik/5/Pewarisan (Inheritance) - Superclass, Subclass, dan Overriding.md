---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Pewarisan (Inheritance) - Superclass, Subclass, dan Overriding
>
> > ## Questions/Cues
> >
> > - Apa perbedaan antara class (definisi generik dengan `self`) dan instance (objek spesifik)?
> > - Apa itu superclass dan subclass, dan apa saja yang bisa dilakukan subclass terhadap perilaku warisannya?
> > - Bagaimana Python menentukan method mana yang dipakai ketika nama method sama muncul di beberapa level hierarki?
> > - Mengapa `Person.__init__` perlu memanggil `Mammal.__init__(self, age)` secara eksplisit?
> > - Bagaimana subclass seperti `Cat`, `Person`, dan `Student` menambah atau mengoverride perilaku dari superclass-nya?
> >
> > ## Reference Points
> >
> > - IF5100 — Object-Oriented Programming (Slides 28-38)
>
> > ### Rekap: Implementasi vs Penggunaan Class
> >
> > Mengulang pembagian dua perspektif dari topik sebelumnya. **Mengimplementasikan tipe objek baru dengan class**: mendefinisikan class, mendefinisikan data attribute (WHAT — apa objek itu), mendefinisikan method (HOW TO — cara memakai objek itu). **Menggunakan tipe objek baru dalam kode**: membuat instance dari tipe objek itu, lalu melakukan operasi dengan instance tersebut. Kekuatan OOP: menggabungkan objek yang berbagi atribut dan prosedur umum, memakai abstraksi untuk memisahkan cara mengimplementasikan objek dari cara memakainya, membangun **lapisan-lapisan abstraksi objek** yang mewarisi perilaku dari class lain, dan membuat class sendiri di atas class dasar Python.
> >
> > ### Class vs Instance
> >
> > **Class** adalah nama tipe; ia didefinisikan secara **generik**, memakai `self` untuk merujuk pada "suatu" instance selama definisi class ditulis (mis. `(self.x+self.y)**2`) — `self` adalah parameter pada method-method di dalam definisi class. Class mendefinisikan data dan method yang **sama untuk semua instance**-nya.
> >
> > **Instance** adalah satu objek spesifik; nilai data attribute-nya **berbeda-beda antar instance** — `c1 = Coordinate(1,2)` dan `c2 = Coordinate(3,4)` adalah dua objek berbeda dengan nilai `.x` yang berbeda pula. Sebuah instance memiliki **struktur** yang didefinisikan oleh class-nya.
> >
> > ### Hierarki Class
> >
> > Contoh hierarki dunia nyata: ANIMAL sebagai kategori umum, dengan CAT (Ginger, Kitty, Tiger) dan RABBIT sebagai anak kategori sejajar di bawahnya; atau PEOPLE dengan STUDENT sebagai anak kategori di bawahnya. Pola ini diterjemahkan langsung ke hierarki class: **parent class (superclass)** dan **child class (subclass)**.
> >
> > **Child class mewarisi semua data dan behavior milik parent class**, dan bisa:
> >
> > - **menambah** informasi baru (data attribute baru),
> > - **menambah** perilaku baru (method baru),
> > - **mengoverride (menimpa)** perilaku yang sudah ada.
> >
> > Hierarki lengkap yang dibangun pada topik ini: `Animal` → `Mammal` → {`Person` → `Student`, `Cat`, `Rabbit`}.
> >
> > ```mermaid
> > flowchart TD
> >     Animal["Animal<br/>age, name<br/>get_age, get_name, set_age, set_name, __str__"]
> >     Mammal["Mammal<br/>(mewarisi Animal)"]
> >     Cat["Cat<br/>override __str__<br/>+ speak()"]
> >     Person["Person<br/>+ friends, get_friends, add_friend, age_diff<br/>override speak, __str__"]
> >     Student["Student<br/>+ major, change_major<br/>override speak (random), __str__"]
> >     Rabbit["Rabbit<br/>class var tag<br/>+ parent1, parent2, rid<br/>__add__, __eq__"]
> >     Animal --> Mammal
> >     Mammal --> Cat
> >     Mammal --> Person
> >     Mammal --> Rabbit
> >     Person --> Student
> > ```
> >
> > ### Parent Class: Mammal
> >
> > ```python
> > class Mammal(Animal):
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
> >         return "mammal:"+str(self.name)+":"+str(self.age)
> > ```
> >
> > `Mammal(Animal)` berarti `Mammal` adalah **subclass** dari `Animal`.
> >
> > ### Child Class: Cat
> >
> > ```python
> > class Cat(Mammal):
> >     def speak(self):
> >         print("meow")
> >     def __str__(self):
> >         return "cat:"+str(self.name)+":"+str(self.age)
> > ```
> >
> > `Cat` mewarisi seluruh attribute `Mammal`: `__init__()`, `age`, `name`, `get_age()`, `get_name()`, `set_age()`, `set_name()`, `__str__()` — tetapi **mengoverride** `__str__` dan **menambah** fungsionalitas baru lewat `speak()`. Instance bertipe `Cat` bisa memanggil `speak()`; instance bertipe `Mammal` akan **error** bila dipaksa memanggil method baru milik `Cat`. Perhatikan `Cat` **tidak** mendefinisikan `__init__` sendiri — ia otomatis memakai versi `__init__` milik `Mammal` (yang mewarisi dari `Animal`).
> >
> > ### Method Resolution: Method Mana yang Dipakai?
> >
> > Subclass bisa memiliki method dengan nama sama dengan superclass-nya. Untuk sebuah instance, **Python mencari nama method di definisi class saat ini terlebih dahulu**; bila tidak ditemukan, **pencarian naik ke hierarki** (parent, lalu grandparent, dan seterusnya); Python memakai **method pertama yang ditemukan** menyusuri hierarki dengan nama tersebut. Inilah konsep **Method Resolution Order (MRO)**.
> >
> > ### Person: Memanggil Constructor Parent Secara Eksplisit
> >
> > ```python
> > class Person(Mammal):
> >     def __init__(self, name, age):
> >         Mammal.__init__(self, age)
> >         self.set_name(name)
> >         self.friends = []
> >     def get_friends(self):
> >         return self.friends
> >     def add_friend(self, fname):
> >         if fname not in self.friends:
> >             self.friends.append(fname)
> >     def speak(self):
> >         print("hello")
> >     def age_diff(self, other):
> >         diff = self.age - other.age
> >         print(abs(diff), "year difference")
> >     def __str__(self):
> >         return "person:"+str(self.name)+":"+str(self.age)
> > ```
> >
> > Parent class dari `Person` adalah `Mammal`. `Mammal.__init__(self, age)` **secara eksplisit memanggil constructor parent** — pola ini diperlukan karena `Person` mendefinisikan `__init__`-nya sendiri (dengan signature berbeda, menerima `name` juga), sehingga `__init__` milik `Mammal` **tidak otomatis terpanggil** kecuali dipanggil manual. `self.set_name(name)` memanggil method yang **diwarisi** dari `Mammal`. `self.friends = []` menambah **attribute baru**. `get_friends`, `add_friend`, dan `age_diff` adalah **method baru**. `speak` dan `__str__` **mengoverride** versi milik `Mammal`.
> >
> > ### Student: Rantai Pewarisan Lebih Dalam
> >
> > ```python
> > import random
> >
> > class Student(Person):
> >     def __init__(self, name, age, major=None):
> >         Person.__init__(self, name, age)
> >         self.major = major
> >     def change_major(self, major):
> >         self.major = major
> >     def speak(self):
> >         r = random.random()
> >         if r < 0.25:
> >             print("i have homework")
> >         elif 0.25 <= r < 0.5:
> >             print("i need sleep")
> >         elif 0.5 <= r < 0.75:
> >             print("i should eat")
> >         else:
> >             print("i am watching tv")
> >     def __str__(self):
> >         return "student:"+str(self.name)+":"+str(self.age)+":"+str(self.major)
> > ```
> >
> > `import random` membawa masuk fungsi-fungsi dari modul `random`. `Student` mewarisi attribute milik `Person` sekaligus `Mammal` (rantai pewarisan: `Student` → `Person` → `Mammal` → `Animal`); `Person.__init__(self, name, age)` **merantai pemanggilan constructor naik ke hierarki**. `change_major` menambah perilaku baru yang mengubah data. `speak` **dioverride** dengan perilaku acak memakai `random.random()` (mengembalikan float di rentang [0,1)).

> [!cornell] #### Summary
>
> **Class** adalah definisi generik (memakai `self`) yang sama untuk semua instance-nya; **instance** adalah objek spesifik dengan nilai attribute yang bisa berbeda-beda. **Inheritance** membentuk hierarki **superclass**–**subclass**: subclass mewarisi seluruh data dan behavior superclass-nya, dan bisa **menambah** attribute/method baru atau **mengoverride** yang sudah ada — dicontohkan lewat hierarki `Animal` → `Mammal` → {`Cat`, `Person` → `Student`, `Rabbit`}. **Method resolution** mencari nama method mulai dari class instance itu sendiri, lalu naik ke parent, grandparent, dst., memakai **kecocokan pertama** yang ditemukan (MRO). Saat subclass mendefinisikan `__init__`-nya sendiri, constructor parent **tidak otomatis terpanggil** — harus dipanggil eksplisit (`Mammal.__init__(self, age)`, `Person.__init__(self, name, age)`), membentuk **rantai inisialisasi** naik hierarki. Contoh `Cat` (override `__str__`, tambah `speak`), `Person` (tambah `friends`/`get_friends`/`add_friend`/`age_diff`, override `speak`/`__str__`), dan `Student` (tambah `major`/`change_major`, override `speak` dengan `random.random()`) menunjukkan pola tambah-atribut, tambah-method, dan override secara konkret.

> [!ad-libitum]- Additional Information
>
> #### `super()` sebagai Alternatif Pemanggilan Eksplisit
>
> Alih-alih menulis `Mammal.__init__(self, age)`, Python modern lazim memakai `super().__init__(age)` — `super()` mengembalikan proxy ke parent class sesuai **MRO**, sehingga tidak perlu menuliskan nama parent secara hardcoded (memudahkan refactor hierarki dan krusial pada **multiple inheritance**):
> ```python
> class Person(Mammal):
>     def __init__(self, name, age):
>         super().__init__(age)
>         self.set_name(name)
>         self.friends = []
> ```
>
> #### Multiple Inheritance dan C3 Linearization
>
> Python mendukung **multiple inheritance** (`class C(A, B):`), yang membuat MRO tidak sesederhana "naik satu jalur" — Python memakai algoritma **C3 linearization** untuk menentukan urutan pencarian method yang konsisten. Urutan ini bisa diperiksa lewat `NamaClass.__mro__` atau `NamaClass.mro()`.
>
> #### Abstract Base Class (`abc`)
>
> Modul `abc` memungkinkan pendefinisian **superclass abstrak** yang memaksa subclass mengimplementasikan method tertentu, memakai `ABC` dan `@abstractmethod`:
> ```python
> from abc import ABC, abstractmethod
> class Animal(ABC):
>     @abstractmethod
>     def speak(self):
>         pass
> ```
> Mencoba membuat instance `Animal` langsung (tanpa subclass yang mengimplementasikan `speak`) akan melempar `TypeError`. Ini relevan karena pada hierarki `Animal` di slide, `speak()` sebenarnya konseptual milik tiap subclass konkret (`Cat`, `Person`, `Student`), bukan `Animal`/`Mammal` itu sendiri.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Refactor seluruh hierarki `Animal`/`Mammal`/`Cat`/`Person`/`Student` memakai `super()` alih-alih pemanggilan constructor eksplisit, lalu verifikasi perilakunya tidak berubah.
> 2. Tambahkan subclass baru `Dog(Mammal)` dengan `speak()` sendiri, lalu buat list berisi campuran `Cat`, `Person`, `Dog`, dan panggil `speak()` pada tiap elemen — amati **polymorphism** ini bekerja tanpa `if/elif` bertipe.
> 3. Cetak `Student.__mro__` dan jelaskan urutannya dalam kalimat sendiri; ulangi untuk hierarki dengan multiple inheritance buatan sendiri.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 8, bagian "Inheritance".
> - MIT OCW 6.0001, *Lecture 8: Object Oriented Programming* (bagian hierarki hewan).
> - Dokumentasi Python: *`super()`*, modul `abc`, *The Python 2.3 Method Resolution Order* (spesifikasi C3 linearization).
