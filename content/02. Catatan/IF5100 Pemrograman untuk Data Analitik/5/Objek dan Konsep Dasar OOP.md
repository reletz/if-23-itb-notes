---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Objek dan Konsep Dasar OOP
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud "semua di Python adalah objek", dan apa tiga hal yang dimiliki setiap objek?
> > - Apa perbedaan antara data attribute dan method sebagai bentuk data abstraction?
> > - Mengapa representasi internal list (`[1,2,3,4]`) sebaiknya tidak dimanipulasi langsung dari luar?
> > - Apa saja keuntungan OOP dibanding menulis kode prosedural biasa?
> > - Bagaimana OOP meniru cara berpikir dunia nyata lewat data attribute dan procedural attribute?
> >
> > ## Reference Points
> >
> > - IF5100 — Object-Oriented Programming (Slides 3-9)
>
> > ### Objek: Fondasi Segala Sesuatu di Python
> >
> > Python mendukung banyak jenis data — `1234`, `3.14159`, `"Hello"`, `[1,5,7,11,13]`, `{"CA":"California","MA":"Massachusetts"}` — dan **setiap nilai tersebut adalah objek**. Ini adalah prinsip sentral **Object Oriented Programming (OOP)**: **EVERYTHING IN PYTHON IS AN OBJECT**, dan setiap objek punya sebuah **type**.
> >
> > Setiap objek memiliki tiga hal: **type** (jenisnya), **representasi data internal** (bisa primitif atau komposit), dan **sekumpulan prosedur untuk berinteraksi dengan objek tersebut**. Objek adalah **instance** dari sebuah **class** — misalnya `1234` adalah instance dari `int`, dan `"hello"` adalah instance dari `str`. Dalam siklus hidupnya, objek dapat **dibuat**, **dimanipulasi**, dan **dihancurkan** — baik secara eksplisit lewat `del`, atau cukup "dilupakan" (tidak direferensikan lagi) sehingga mekanisme **garbage collection** Python otomatis membebaskan memorinya.
> >
> > ### Data Abstraction: Attribute vs Method
> >
> > Objek adalah bentuk **abstraksi data** yang menggabungkan dua hal:
> >
> > 1. **Representasi internal**, dituangkan lewat **data attribute** — "apa" objek itu sebenarnya.
> > 2. **Antarmuka (interface)** untuk berinteraksi dengan objek, dituangkan lewat **method** (fungsi/prosedur) — "apa" yang bisa dilakukan objek itu, sambil **menyembunyikan detail implementasinya**.
> >
> > Pemisahan ini mengulang gagasan **black box** dari abstraksi fungsi: pengguna objek cukup tahu *interface*-nya (method apa yang tersedia dan efeknya), tanpa perlu tahu bagaimana data itu disimpan atau diolah di balik layar.
> >
> > ### Contoh: List sebagai Objek
> >
> > `[1,2,3,4]` bertipe `list`. Secara internal, list direpresentasikan sebagai **array dinamis di memori**. Kita memanipulasinya lewat interface yang disediakan: pengindeksan `L[i]`, *slicing* `L[i:j]`, operator `+`, fungsi `len()`, `min()`, `max()`, serta method seperti `del(L[i])`, `L.append()`, `L.extend()`, `L.count()`, `L.index()`, `L.insert()`, `L.pop()`, `L.remove()`, `L.reverse()`, `L.sort()`.
> >
> > Poin pentingnya: **representasi internal sebaiknya bersifat privat**. Jika kode di luar class memanipulasi representasi internal secara langsung (bukan lewat interface resmi), **perilaku yang benar dari objek bisa terganggu** — class list sudah dirancang agar konsistensinya terjaga selama diakses lewat method-nya, bukan lewat "mengintip" struktur array-nya secara langsung.
> >
> > ### Keuntungan OOP
> >
> > - **Pembungkusan (bundling)**: data digabung dalam satu paket bersama prosedur yang bekerja pada data itu, diakses lewat **interface yang jelas**.
> > - **Divide-and-conquer**: implementasi dan pengujian perilaku tiap class bisa dilakukan **terpisah**, sehingga modularitas meningkat dan kompleksitas berkurang.
> > - **Reusability**: class memudahkan penggunaan ulang kode — banyak modul Python mendefinisikan class baru, dan setiap class punya **environment terpisah** (tidak ada tabrakan nama fungsi antar class). **Inheritance (pewarisan)** memungkinkan subclass mendefinisikan ulang atau memperluas sebagian perilaku dari superclass-nya.
> >
> > ### Mengapa OOP? Meniru Dunia Nyata
> >
> > Motivasi OOP adalah **meniru cara kita mengelompokkan objek di dunia nyata** — mengelompokkan objek-objek berbeda yang merupakan bagian dari tipe yang sama. Contoh: Ginger, Kitty, dan Tiger adalah kucing-kucing berbeda (masing-masing punya umur dan warna sendiri), dan seekor kelinci — semuanya berbagi konsep umum "Animal", walau atributnya berbeda-beda per individu.
> >
> > Sekelompok objek seperti ini punya dua jenis atribut:
> >
> > - **Data attribute** — bagaimana objek direpresentasikan sebagai data, "**apa** objek itu" (untuk sebuah koordinat: nilai x dan y; untuk seekor hewan: umur, nama).
> > - **Procedural attribute (behavior/operation/method)** — bagaimana seseorang berinteraksi dengan objek itu, "**apa yang dilakukan**" objek itu (untuk koordinat: mencari jarak antar dua koordinat; untuk hewan: mengeluarkan suara).

> [!cornell] #### Summary
>
> Prinsip inti OOP di Python: **semua adalah objek**, dan setiap objek punya **type**, **representasi data internal**, dan **sekumpulan prosedur interaksi**; objek adalah **instance** dari sebuah **class**. Objek merupakan bentuk **abstraksi data** yang menyatukan **data attribute** (representasi internal, "apa objek itu") dengan **method** (interface, "apa yang bisa dilakukan") sambil **menyembunyikan detail implementasi** — dicontohkan lewat `list` yang secara internal berupa array dinamis namun diakses lewat interface seperti `append()`/`sort()`, dan representasi internalnya **sebaiknya tidak dimanipulasi langsung** agar perilakunya tetap konsisten. OOP memberi keuntungan **bundling** data+prosedur, **divide-and-conquer** (implementasi/pengujian per class terpisah, modularitas naik), dan **reusability** lewat environment class yang terisolasi serta **inheritance**. Motivasi mendasarnya adalah **meniru dunia nyata**: mengelompokkan objek berbeda dalam satu tipe yang sama, masing-masing dengan **data attribute** dan **procedural attribute** sendiri.

> [!ad-libitum]- Additional Information
>
> #### Duck Typing dan Protocol
>
> Python tidak mensyaratkan pewarisan eksplisit agar dua objek "kompatibel" — filosofi **duck typing** ("if it walks like a duck and quacks like a duck...") berarti yang penting adalah objek punya method/attribute yang dibutuhkan, bukan dari class apa ia berasal. Modul `typing` menyediakan `Protocol` untuk mendeklarasikan interface semacam ini secara statis tanpa memaksa inheritance.
>
> #### Semua adalah Objek — Termasuk Fungsi dan Class
>
> Karena fungsi dan class sendiri adalah objek (bertipe `function` dan `type`), Python mendukung pola seperti menyimpan fungsi dalam list, mengopernya sebagai argumen, atau membuat class secara dinamis dengan `type(name, bases, dict)`. Ini adalah lanjutan langsung dari gagasan "everything is an object".
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `type(1234)`, `type("hello")`, `type([1,2,3])`, `type(type)` di REPL dan amati bagaimana bahkan `type` sendiri adalah objek.
> 2. Buat list, lalu bandingkan efek memanggil `L.append(x)` (lewat interface) dengan mencoba mengubah representasi internalnya secara langsung (misalnya lewat `ctypes` atau sekadar mendiskusikan mengapa itu berbahaya).
> 3. Identifikasi tiga tipe bawaan Python (`dict`, `set`, `tuple`) dan untuk masing-masing, daftar data attribute konseptualnya vs method/interface publiknya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 8 (Classes and Object-Oriented Programming), bagian awal "Abstract Data Types and Classes".
> - MIT OCW 6.0001, *Lecture 8: Object Oriented Programming*.
> - Dokumentasi Python: *Data Model* (docs.python.org/3/reference/datamodel.html), bagian objects, values and types.
