---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]

> [!cornell] Inheritance dan Polymorphism
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu _Inheritance_?
> > - Bagaimana sintaks & mode pewarisan?
> > - Apa itu _Polymorphism_ & _Dynamic Binding_?
> > - Apa peran keyword `virtual`?
> > - Apa itu _Virtual Destructor_ & mengapa penting?
> > - Apa itu _Abstract Base Class_ (ABC)?
> > - Apa itu _Diamond Problem_?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Konsep Inheritance", "Bahasa C++: Inheritance", "Bahasa C++: Keyword 'virtual'"
> > - Materi Pendukung: "Tutorial 2"
>
> > ### Konsep Dasar Inheritance (Pewarisan)
> > 
> > **Inheritance** adalah kemampuan sebuah kelas (`derived class` atau `subclass`) untuk menurunkan (mewarisi) atribut dan method dari kelas lain (`base class` atau `superclass`). Ini merepresentasikan hubungan **"is-a"** (adalah seorang/sebuah), contohnya `Mobil` _is-a_ `Kendaraan`.
> > 
> > **Tujuannya** adalah untuk _code reuse_ dan menghindari logika kondisional yang kompleks. Daripada memiliki satu kelas `Kendaraan` dengan banyak `if-else` untuk kategori yang berbeda, lebih baik membuat `subclass` untuk setiap kategori (`Bus`, `Minibus`, dll.) yang mengimplementasikan perilakunya sendiri.
> > 
> > **Sintaks & Mode Pewarisan**
> > 
> > ```cpp
> > class Minibus: public Kendaraan { 
> >     // ... anggota kelas Minibus ...
> > };
> > ```
> > 
> > Mode pewarisan (`public`, `protected`, `private`) menentukan bagaimana tingkat akses anggota dari _base class_ akan terlihat di _derived class_. Pewarisan `public` adalah yang paling umum digunakan.
> > 
> > ### Polymorphism dan Dynamic Binding
> > 
> > **Polymorphism** (poly=banyak, morph=bentuk) adalah kemampuan sebuah pointer atau reference bertipe _base class_ untuk menunjuk atau mengacu pada objek dari _derived class_-nya saat runtime.
> > 
> > Ini memungkinkan **Dynamic Binding**: proses penentuan versi method mana yang akan dipanggil terjadi pada saat **runtime**, berdasarkan tipe aktual dari objek yang ditunjuk, bukan tipe statik dari pointernya.
> > 
> > ### Peran Keyword `virtual`
> > 
> > _Dynamic binding_ hanya terjadi jika method di _base class_ dideklarasikan dengan keyword **`virtual`**. Tanpa `virtual`, pemanggilan method akan menggunakan _static binding_, di mana versi _base class_ yang akan selalu dipanggil, mengabaikan tipe objek sebenarnya.
> > 
> > 
> > ```cpp
> > // Di Base class
> > virtual void f() { std::cout << "base\n"; }
> > 
> > // Di Derived class
> > void f() override { std::cout << "derived\n"; } // 'override' disarankan
> > 
> > // ... Di main()
> > Base* dp = new Derived();
> > dp->f(); // Akan mencetak "derived" karena f() adalah virtual
> > ```
> > 
> > ### Fitur Penting dalam Inheritance
> > 
> > - **Virtual Destructor**
> >     
> >     - **Masalah**: Jika Anda menghapus objek _derived class_ melalui pointer _base class_ (`delete base_ptr;`), hanya destructor dari _base class_ yang akan dipanggil jika ia tidak virtual. Ini menyebabkan _memory leak_ jika _derived class_ mengelola sumber dayanya sendiri.
> >     - **Solusi**: Selalu jadikan destructor di _base class_ **`virtual`** jika kelas tersebut dimaksudkan untuk digunakan secara polimorfik.
> >     
> >     ```cpp
> >     class Base {
> >     public:
> >         virtual ~Base() { /* ... */ } // Virtual destructor
> >     };
> >     ```
> >     
> > - **Abstract Base Class (ABC)**
> >     
> >     - Adalah kelas yang **tidak bisa diinstansiasi** (tidak bisa dibuat objeknya) dan berfungsi sebagai _interface_ untuk kelas turunannya.
> >     - Sebuah kelas menjadi abstrak jika memiliki setidaknya satu **pure virtual function**, yaitu method yang dideklarasikan dengan `= 0;`.
> >     
> >     ```cpp
> >     class Shape {
> >     public:
> >         virtual void Draw() = 0; // Pure virtual function
> >     };
> >     ```
> >     
> >     _Derived class_ yang non-abstrak **wajib** mengimplementasikan semua _pure virtual function_ dari ABC-nya.
> > 
> > ### Masalah dalam Multiple Inheritance
> > 
> > - **Diamond Problem**: Terjadi ketika sebuah kelas D mewarisi dari dua kelas B dan C, yang keduanya sama-sama mewarisi dari kelas A. Ini menyebabkan D memiliki dua salinan anggota dari A, sehingga terjadi ambiguitas saat mengakses anggota tersebut.
> > - **Solusi C++**: Menggunakan **virtual inheritance**. Kelas B dan C harus mewarisi dari A dengan keyword `virtual` (`class B : virtual public A`). Ini memastikan kelas D hanya akan memiliki satu salinan anggota dari A.

> [!cornell] #### Summary
> 
> - _Inheritance_ memungkinkan pembuatan hierarki kelas dengan hubungan "is-a" untuk _code reuse_ dan desain yang bersih. Keyword **`virtual`** adalah kunci untuk mengaktifkan **polymorphism**, di mana pointer _base class_ dapat memanggil method dari _derived class_ saat runtime (_dynamic binding_).
> - Untuk manajemen memori yang aman dalam polimorfisme, _destructor_ pada _base class_ harus `virtual`. _Abstract Base Class_ (ABC) dengan _pure virtual function_ digunakan untuk mendefinisikan _interface_ yang tidak dapat diinstansiasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### `override` dan `final` Specifiers (C++11)
> 
> - C++ modern memperkenalkan keyword `override` untuk dipasang pada method di _derived class_. Ini akan membuat compiler memeriksa apakah method tersebut benar-benar meng-override sebuah method `virtual` dari _base class_, sehingga mencegah bug akibat salah ketik nama atau signature.
> - Keyword `final` bisa digunakan pada method `virtual` untuk mencegahnya di-override lebih lanjut di kelas turunan, atau pada kelas untuk mencegahnya diwarisi sama sekali.
> 
> #### Komposisi vs. Pewarisan (Composition vs. Inheritance)
> 
> - Aturan praktis yang sering dianjurkan adalah **"utamakan komposisi daripada pewarisan"** (_prefer composition over inheritance_). Gunakan _inheritance_ hanya jika ada hubungan "is-a" yang jelas dan Anda membutuhkan perilaku polimorfik. Untuk hubungan "has-a" (misalnya `Mobil` _has-a_ `Mesin`), gunakan komposisi, di mana satu kelas memiliki objek dari kelas lain sebagai atributnya.