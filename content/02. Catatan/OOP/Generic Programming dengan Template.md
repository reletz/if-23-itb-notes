---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]

> [!cornell] Generic Programming: Templates
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu _Template_?
> > - Apa itu _Function Template_?
> > - Apa itu _Class Template_ (Kelas Generik)?
> > - Bagaimana mendefinisikan method kelas generik?
> > - Bagaimana cara membuat objek dari kelas generik?
> > - Apa itu _Template Specialization_?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Bahasa C++: Function Template dan Kelas Generik"
> > - Materi Pendukung: "Tutorial 2", "Tutorial 3"
>
> > ### Motivasi: Kode yang Dapat Digunakan Kembali
> > 
> > Seringkali kita membutuhkan operasi yang sama untuk tipe data yang berbeda (misalnya, mencari nilai minimum dari dua `int` atau dua `float`). Menulis fungsi terpisah untuk setiap tipe akan menyebabkan duplikasi kode.
> > 
> > Solusi C++ untuk masalah ini adalah **template**, yang memungkinkan kita menulis kode generik yang aman secara tipe (_type-safe_). Ini jauh lebih baik daripada trik lama C menggunakan _macro_ (`#define`), yang hanya melakukan substitusi teks dan bisa menimbulkan _side effect_ yang tidak diinginkan.
> > 
> > ### Function Template
> > 
> > _Function template_ adalah sebuah "cetakan" untuk membuat sekelompok fungsi yang logikanya sama tetapi beroperasi pada tipe data yang berbeda. Deklarasinya diawali dengan `template <class T>`, di mana `T` adalah parameter tipe.
> > 
> > 
> > ```cpp
> > template <class T> // T adalah nama parameter tipe
> > T min (T a, T b) {
> >     return a < b ? a : b;
> > }
> > 
> > // Pemanggilan
> > int x = min(5, 10); // Compiler akan menginferensi bahwa T adalah int
> > double y = min<double>(3.14, 2.71); // Tipe ditentukan secara eksplisit
> > ```
> > 
> > ### Class Template (Kelas Generik)
> > 
> > _Class template_ adalah kelas yang didefinisikan secara umum, tidak terikat pada satu tipe data spesifik. Ini memungkinkan kita membuat satu definisi kelas (misalnya, `Stack<T>`) yang nantinya bisa diinstansiasi menjadi `Stack<int>`, `Stack<double>`, `Stack<Complex>`, dll.
> > 
> > 
> > ```cpp
> > template <class T> // T adalah parameter tipe untuk kelas Stack
> > class Stack {
> > public:
> >     void Push (T); // Method menggunakan tipe generik T
> >     void Pop (T&);
> >     // ...
> > private:
> >     T *data; // Atribut juga menggunakan tipe generik T
> >     // ...
> > };
> > ```
> > 
> > ### Implementasi Method Kelas Generik
> > 
> > Definisi _member function_ dari sebuah _class template_ juga harus berupa _function template_. Nama kelas harus diikuti dengan parameter tipe (`Stack<T>::`).
> > 
> > 
> > ```cpp
> > template <class T>
> > void Stack<T>::Push(T item) {
> >     // ... implementasi untuk push ...
> > }
> > ```
> > 
> > **Penting**: Definisi dari _class template_ dan method-methodnya umumnya ditempatkan seluruhnya di dalam file header (`.h`). Ini karena compiler memerlukan definisi lengkap dari template untuk bisa membuat kode spesifik saat ada instansiasi (misalnya, saat Anda mendeklarasikan `Stack<int>`).
> > 
> > ### Membuat Objek & Spesialisasi Template
> > 
> > - **Membuat Objek**: Objek dari kelas generik dibuat dengan menyertakan tipe data spesifik di dalam kurung sudut (`<>`).
> >     
> >     ```cpp
> >     Stack<int> stackInteger;
> >     Stack<double> stackDouble(30);
> >     ```
> >     
> > - **Template Specialization**: Memungkinkan kita untuk menyediakan implementasi yang **khusus dan berbeda** untuk sebuah tipe data tertentu, menimpa perilaku generiknya.
> >     
> >     ```cpp
> >     // Spesialisasi untuk mycontainer jika tipenya char
> >     template <>
> >     class mycontainer <char> {
> > 	    public:
> > 	        // Perilaku yang sama sekali berbeda dan spesifik untuk char
> > 	        char uppercase(); 
> >     };
> >     ```
> >     

> [!cornell] #### Summary
> 
> - Template adalah fondasi dari _generic programming_ di C++, memungkinkan pembuatan `function template` dan `class template` yang dapat beroperasi pada tipe data apa pun. Mekanisme ini secara drastis mengurangi duplikasi kode dan meningkatkan reusabilitas.
> - Sebuah _class template_ (misal: `Stack<T>`) berfungsi sebagai cetakan, yang kemudian diinstansiasi dengan tipe data spesifik (misal: `Stack<int>`) saat pembuatan objek.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### `typename` vs. `class`
> 
> - Dalam deklarasi template (`template <...>`), keyword `typename` dan `class` pada dasarnya dapat digunakan secara bergantian untuk mendeklarasikan parameter tipe. `typename` sering dianggap lebih deskriptif karena parameter tidak harus berupa sebuah `class`, bisa juga tipe primitif seperti `int`.
> 
> #### Non-Type Template Parameters
> 
> - Template tidak hanya bisa menerima tipe sebagai parameter, tetapi juga nilai konstan dari tipe integral, seperti `int`. Ini sangat berguna untuk menentukan ukuran atau properti lain saat kompilasi. Contoh `Vector2<T, N>` dalam materi tutorial menggunakan ini untuk menentukan ukuran array secara generik.
>     
>     C++
>     
>     ```
>     template <class T, int N>
>     class MyArray {
>         T data[N]; // Ukuran N ditentukan saat kompilasi
>     };
>     
>     MyArray<int, 10> my_array; // Membuat array integer dengan 10 elemen
>     ```
>     
>     Ini adalah konsep di balik `std::array<T, Size>` di C++ modern.