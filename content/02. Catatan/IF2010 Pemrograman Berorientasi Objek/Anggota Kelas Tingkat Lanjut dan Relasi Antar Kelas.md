---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]

> [!cornell] Anggota Kelas Tingkat Lanjut dan Relasi Antar Kelas
> 
> > ## Questions/Cues
> > 
> > - Bagaimana cara kerja `const` member?
> > - Apa itu anggota `static`?
> > - Bagaimana inisialisasi anggota `static`?
> > - Apa kegunaan `friend`?
> > - Apa itu `nested class`?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Bahasa C++: Konsep Kelas (bagian II)"
> > - Materi Pendukung: "Tutorial 1"
>
> > ### `const` Members: Atribut & Method
> > 
> > Keyword `const` digunakan untuk menegakkan _immutability_ (ketidakberubahan).
> > 
> > - **Atribut `const`**: Nilai atribut ini tidak dapat diubah setelah objek diciptakan. Pengisian nilainya **wajib** dilakukan melalui **Constructor Initialization List**, bukan di dalam body constructor.
> >     
> >     
> >     ```cpp
> >     class Foo {
> >     private:
> >         const int data; // Atribut const
> >     public:
> >         // Benar: Inisialisasi melalui initialization list
> >         Foo(int x): data(x) {} 
> >     };
> >     ```
> >     
> > - **Method `const`**: Method ini berjanji untuk **tidak mengubah** state atau nilai dari data member objek. Objek yang dideklarasikan sebagai `const` hanya bisa memanggil method yang juga ditandai sebagai `const`.
> > 
> > ### Anggota `static`: Atribut & Method
> > 
> > Anggota `static` adalah anggota yang **dimiliki oleh kelas**, bukan oleh masing-masing objek. Artinya, hanya ada satu salinan anggota statik yang dipakai bersama oleh seluruh objek dari kelas tersebut.
> > 
> > - **Atribut `static`**: Dipakai bersama oleh semua instance. Contoh: sebuah counter untuk menghitung jumlah objek yang telah dibuat.
> >     
> >     
> >     ```cpp
> >     // Di dalam class Stack (Stack.h)
> >     static int n_stack; // Deklarasi atribut statik
> >     ```
> >     
> > - **Method `static`**: Hanya dapat mengakses anggota `static` lainnya dan tidak memiliki pointer `this`. Dapat dipanggil langsung menggunakan nama kelas tanpa perlu membuat objek: `Stack::getNumOfStack();`.
> > 
> > ### Inisialisasi Anggota Statik
> > 
> > Inisialisasi atribut `static` **harus** dilakukan di luar deklarasi kelas dan di luar method. Biasanya ini dilakukan di file implementasi (`.cpp` atau `.cc`) untuk menghindari error _multiply defined name_ saat linking.
> > 
> > 
> > ```cpp
> > // Di file implementasi (Stack.cc)
> > int Stack::n_stack = 0; // Inisialisasi atribut statik
> > ```
> > 
> > ### Relasi `friend`
> > 
> > `friend` adalah mekanisme untuk memberikan hak akses kepada sebuah fungsi atau kelas lain untuk mengakses anggota `non-public` (`private` dan `protected`) dari suatu kelas.
> > 
> > - **Sifat**: Bersifat satu arah. Jika kelas `A` adalah `friend` dari kelas `B`, `A` bisa mengakses member `private` `B`, tetapi tidak sebaliknya.
> > - **Kapan Digunakan**: Sebaiknya dihindari kecuali benar-benar diperlukan, misalnya untuk implementasi _operator overloading_ tertentu yang harus berupa fungsi non-anggota.
> >     
> >     
> >     ```cpp
> >     class B {
> >         friend class A; // Kelas A kini bisa akses member private B
> >         friend void f(int, char*); // Fungsi f kini bisa akses member private B
> >         // ...
> >     };
> >     ```
> >     
> > 
> > ### Nested Class
> > 
> > _Nested class_ adalah kelas yang dideklarasikan di dalam deklarasi kelas lain.
> > 
> > - **Tujuan**: Biasanya digunakan untuk membuat kelas "pembantu" yang sangat erat kaitannya dengan kelas pemiliknya dan tidak dimaksudkan untuk digunakan dari luar. Ini adalah bentuk enkapsulasi yang kuat.
> > - **Visibilitas**: Jika dideklarasikan di bagian `private`, _nested class_ akan tersembunyi dari dunia luar, yang biasanya merupakan efek yang diinginkan.
> >     
> >     
> >     ```cpp
> >     class List {
> >     private:
> >         class ListElem { // Nested class ListElem
> >             // ... anggota ListElem
> >         };
> >         // ... anggota private kelas List
> >     public:
> >         // ... anggota public kelas List
> >     };
> >     ```
> >     

> [!cornell] #### Summary
> 
> - C++ menyediakan fitur tingkat lanjut untuk mengelola perilaku dan relasi kelas. `const` digunakan untuk menjamin _immutability_, `static` untuk membuat anggota tingkat kelas yang dibagi bersama, `friend` untuk memberikan hak akses khusus, dan `nested class` untuk enkapsulasi kelas pembantu.
> - Inisialisasi anggota `const` wajib melalui _initialization list_, sementara anggota `static` diinisialisasi secara global di file implementasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### `friend` sebagai "Code Smell"
> 
> - Penggunaan `friend` yang berlebihan terkadang dianggap sebagai _code smell_ (indikasi potensi masalah desain). Jika sebuah kelas memiliki terlalu banyak `friend`, ini bisa berarti kelas tersebut memiliki terlalu banyak tanggung jawab atau enkapsulasinya terlalu lemah. Namun, `friend` tetap merupakan alat yang sah dan tak tergantikan untuk kasus-kasus tertentu seperti implementasi `operator<<` untuk `std::ostream`.
> 
> #### `static` dan Singleton Pattern
> 
> - Anggota `static` adalah dasar dari salah satu _design pattern_ paling terkenal, yaitu **Singleton**. Pattern ini memastikan bahwa sebuah kelas hanya memiliki satu instance. Ini dicapai dengan membuat constructor `private` dan menyediakan sebuah method `public static` yang mengelola dan mengembalikan satu-satunya instance tersebut.
> 
> #### `const`-correctness
> 
> - Menulis kode dengan menggunakan `const` secara tepat di mana pun memungkinkan (pada variabel, parameter, pointer, dan method) disebut sebagai _const-correctness_. Ini adalah praktik yang sangat baik karena membantu compiler melakukan optimisasi dan, yang lebih penting, menangkap kesalahan logika saat kompilasi, bukan saat runtime.