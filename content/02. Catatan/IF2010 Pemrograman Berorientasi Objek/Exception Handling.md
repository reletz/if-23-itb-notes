---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]

> [!cornell] Exception Handling
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu _Exception Handling_?
> > - Bagaimana mekanisme `try-throw-catch`?
> > - Bagaimana menangani berbagai tipe exception?
> > - Apa itu _catch-all handler_?
> > - Bagaimana cara membuat kelas exception kustom?
> > - Apa itu _Standard Exception_ C++?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Bahasa C++: Exception Handling"
> > - Materi Pendukung: "Tutorial 3"
>
> > ### Masalah dengan Penanganan Error Tradisional
> > 
> > Penanganan kesalahan menggunakan nilai kembalian khusus (misalnya, `return -1;`) membuat kode menjadi rumit. Logika utama program menjadi tercampur dengan banyak blok `if-else` hanya untuk memeriksa apakah setiap pemanggilan fungsi berhasil atau gagal.
> > 
> > ### Mekanisme `try-throw-catch`
> > 
> > C++ menyediakan mekanisme yang lebih bersih untuk memisahkan logika utama dari logika penanganan error menggunakan tiga keyword.
> > 
> > 1. **`throw`**: Digunakan untuk "melempar" sebuah _exception object_ ketika terjadi error. Objek yang dilempar ini bisa berupa tipe data apa pun (termasuk `const char*` atau `int`), tetapi praktik terbaiknya adalah menggunakan objek kelas.
> > 2. **`try`**: Sebuah blok yang membungkus kode yang berpotensi melempar exception.
> > 3. **`catch`**: Sebuah blok yang berfungsi sebagai _exception handler_. Blok ini akan "menangkap" exception yang dilempar dari dalam blok `try` jika tipenya cocok.
> > 
> > Ketika `throw` dieksekusi di dalam `try`, eksekusi blok `try` akan langsung berhenti dan alur program melompat ke blok `catch` yang sesuai.
> > 
> > ### Menangani Berbagai Tipe Exception
> > 
> > Sebuah blok `try` bisa diikuti oleh **beberapa blok `catch`**, masing-masing untuk menangani tipe exception yang berbeda. Runtime akan memilih `catch` pertama yang tipe parameternya cocok dengan tipe exception yang dilempar.
> > 
> > **Catch-All Handler**
> > 
> > Kita bisa menggunakan catch (...) sebagai catch terakhir untuk menangani semua jenis exception lain yang tidak tertangkap oleh handler sebelumnya.
> > 
> > 
> > ```cpp
> > try {
> >     // ... kode ...
> > } catch (StackExp& e) { // Handler untuk tipe StackExp
> >     // ...
> > } catch (AnotherExp& e) { // Handler untuk tipe lain
> >     // ...
> > } catch (...) { // Handler untuk semua exception lainnya
> >     // ...
> > }
> > ```
> > 
> > ### Membuat Kelas Exception Kustom
> > 
> > Untuk memberikan informasi error yang lebih kaya dan terstruktur, kita bisa membuat kelas exception sendiri. Kelas ini bisa menyimpan informasi detail tentang kesalahan yang terjadi.
> > 
> > **Contoh `StackExp`**: Kelas ini dirancang untuk menangani error pada `Stack`.
> > 
> > - Menyimpan ID pesan error (`msg_id`).
> > - Memiliki method `DisplayMsg()` untuk menampilkan pesan yang mudah dibaca.
> > - Memiliki member `static` untuk menghitung total exception yang terjadi.
> > 
> > Method `push` dan `pop` pada kelas `Stack` kemudian dimodifikasi untuk melempar objek `StackExp` saat stack penuh atau kosong.
> > 
> > 
> > ```cpp
> > // Contoh menangkap exception kustom
> > try {
> >     s << 10; // Mungkin melempar StackExp
> > } catch (StackExp& e) {
> >     e.DisplayMsg(); // Menampilkan pesan dari objek exception
> > }
> > ```
> > 
> > ### C++ Standard Exception
> > 
> > C++ Standard Library menyediakan serangkaian kelas exception standar yang bisa digunakan, semuanya diwariskan dari `std::exception`. Contohnya adalah `std::bad_alloc` yang dilempar saat alokasi memori dengan `new` gagal.
> > 
> > 
> > ```cpp
> > try {
> >     int* myarray = new int[1000000000];
> > } catch (std::exception& e) {
> >     // method what() memberikan deskripsi string dari error
> >     std::cout << "Standard exception: " << e.what() << std::endl;
> > }
> > ```

> [!cornell] #### Summary
> 
> - Exception handling di C++ menggunakan mekanisme `try`, `throw`, dan `catch` untuk memisahkan kode penanganan error dari alur program utama, menghasilkan kode yang lebih bersih dan robust.
> - `throw` digunakan untuk melempar exception, yang kemudian ditangkap oleh blok `catch` yang sesuai dengan tipenya. Membuat kelas exception kustom adalah praktik terbaik untuk memberikan informasi error yang spesifik dan terstruktur.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### RAII (Resource Acquisition Is Initialization)
> 
> - Ini adalah konsep fundamental di C++ yang sangat erat kaitannya dengan exception. RAII berarti manajemen sumber daya (seperti memori atau file) terikat pada masa hidup objek. Sumber daya didapat di constructor dan dilepas di destructor. Ketika sebuah exception dilempar, C++ menjamin bahwa destructor dari semua objek yang sudah dibuat di _stack_ akan dipanggil (_stack unwinding_). Ini memastikan sumber daya selalu dibebaskan dengan benar, bahkan saat terjadi error, membuat exception handling di C++ sangat aman.
> 
> #### `noexcept` Specifier (C++11)
> 
> - Kita bisa menandai sebuah fungsi dengan `noexcept` untuk memberitahu compiler bahwa fungsi tersebut berjanji tidak akan melempar exception. Ini memungkinkan compiler melakukan optimisasi yang signifikan. Jika fungsi `noexcept` ternyata melempar exception, program akan langsung dihentikan melalui `std::terminate`.