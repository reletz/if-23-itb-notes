---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[OOP]]

> [!cornell] Fondasi Kelas dan Objek di C++
> 
> > ## Questions/Cues
> > 
> > - Apa asal-usul & fitur C++?
> > - Bagaimana cara kerja _reference variable_?
> > - Apa beda `class` & `struct`?
> > - Bagaimana cara kontrol akses member?
> > - Bagaimana mendefinisikan _member function_?
> > - Apa itu pointer `this`?
> > - Bagaimana cara membuat objek dari kelas?
> > - Bagaimana struktur file `.h` & `.cpp`?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Bahasa C++: Konsep Kelas (bagian I)"
> > - Materi Pendukung: "Tutorial 1"
>
> > ### Asal-usul & Fitur C++ 
> > 
> > C++ diciptakan oleh **Bjarne Stroustrup** pada awal 1980-an dan berakar dari bahasa C, Simula67, Algol68, dan Ada. Dibandingkan C, C++ menambahkan fitur-fitur penting seperti:
> > 
> > 1. **Function Overloading**: Fungsi dengan nama sama tapi signature berbeda.
> > 2. **Reference Variables**: Alias untuk variabel lain.
> > 3. **Operator Overloading**: Memberi makna baru pada operator yang ada.
> > 4. **Templates**: Untuk kode generik.
> > 5. **Keywords Baru**: Seperti `class`, `private`, `new`, `delete`.
> > 
> > ### Class, Struct, & Kontrol Akses
> > 
> > _Kelas_ digunakan untuk menciptakan tipe data baru yang menggabungkan data (atribut) dan operasi (method). Perbedaan utamanya dengan `struct` adalah akses default:
> > 
> > - **`class`**: Default akses adalah **`private`**.
> > - **`struct`**: Default akses adalah **`public`**.
> > 
> > Pengaturan akses member dilakukan dengan keyword:
> > 
> > - **`public`**: Bisa diakses dari mana saja.
> > - **`private`**: Hanya bisa diakses oleh member function kelas itu sendiri.
> > - **`protected`**: Seperti `private`, tapi bisa diakses oleh kelas turunan.
> > 
> > ### Definisi Method & Pointer `this`
> > 
> > Method bisa didefinisikan di dalam _class body_ (otomatis inline) atau di luar _class body_ menggunakan _scope resolution operator_ (`::`).
> > 
> > 
> > ```cpp
> > // Definisi di luar class body
> > void Stack::push(int item) {
> >     // this-> adalah opsional, tapi menegaskan akses ke member objek saat ini
> >     this->data[this->topStack] = item; 
> >     this->topStack++;
> > }
> > ```
> > 
> > Setiap _member function_ memiliki pointer implisit **`this`** yang menunjuk ke objek yang memanggilnya.
> > 
> > ### Struktur Kode & Pembuatan Objek
> > 
> > Praktik yang baik adalah memisahkan kode kelas menjadi dua file:
> > 
> > 1. **File Header (.h)**: Berisi deklarasi kelas (antarmuka), dilindungi dengan `#ifndef` guard.
> > 2. **File Implementasi (.cpp)**: Berisi definisi method dan harus meng-`#include` file header-nya.
> > 
> > Objek dapat dibuat dengan berbagai cara, dan membernya diakses menggunakan operator `.` atau `->` untuk pointer.
> > 
> > ```cpp
> > Stack myStack;           // Objek di stack memory
> > Stack *pts = new Stack;  // Objek di free store (heap)
> > 
> > myStack.push(99);        // Akses via objek
> > pts->push(100);          // Akses via pointer
> > ```

> [!cornell] #### Summary
> 
> - C++ adalah ekstensi dari C yang memperkenalkan `class` untuk Pemrograman Berorientasi Objek (OOP), memungkinkan enkapsulasi data (biasanya `private`) dan method (biasanya `public`).
> - Fondasi utamanya meliputi definisi kelas, kontrol akses, pointer `this` yang menghubungkan method ke instance objek, serta praktik pemisahan kode ke file `.h` (interface) dan `.cpp` (implementasi).

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Konteks Desain
> 
> - Bjarne Stroustrup merancang C++ dengan filosofi "you don't pay for what you don't use." Artinya, fitur-fitur canggih seperti virtual function tidak akan menambah overhead jika tidak digunakan, menjaga C++ tetap efisien dan cocok untuk pemrograman sistem tingkat rendah seperti di C.
> 
> #### Bacaan Lanjutan
> 
> - **C++ Core Guidelines**: Sebuah proyek yang dipimpin oleh Bjarne Stroustrup dan Herb Sutter untuk menyediakan panduan modern dalam menulis kode C++ yang baik. Sangat direkomendasikan untuk melengkapi pemahaman dari materi kuliah.
> 
> #### Aplikasi Praktis
> 
> - Konsep dasar kelas dan objek ini adalah fondasi dari hampir semua software besar yang ditulis dalam C++, mulai dari _game engine_ (seperti Unreal Engine), aplikasi desktop (seperti Adobe Photoshop), hingga sistem operasi dan software finansial berkinerja tinggi.