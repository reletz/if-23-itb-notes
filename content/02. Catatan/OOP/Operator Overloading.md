---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[OOP]]

> [!cornell] Operator Overloading
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Operator Overloading_?
> > - Bagaimana cara deklarasi & implementasi?
> > - Kapan pakai _member_ vs. _non-member_ (`friend`)?
> > - Apa saja aturan & batasan overloading?
> > - Bagaimana implementasi `operator=` (Assignment)?
> > - Bagaimana implementasi `operator[]` (Subscript)?
> > - Bagaimana implementasi `operator<<` & `operator>>` (Stream)?
> > - Apa itu "Anggota Kelas Minimal"?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Bahasa C++: Operator Overloading"
> > - Materi PDF: "Bahasa C++: Konsep Kelas (bagian II)"
> > - Materi Pendukung: "Tutorial 1"
>
> > ### Konsep Dasar Operator Overloading
> > 
> > **Operator Overloading** adalah fasilitas di C++ yang memungkinkan kita memberikan makna baru pada simbol operator yang sudah ada (seperti `+`, `-`, `*`, `=`, `<<`) untuk digunakan pada tipe data yang kita definisikan sendiri (objek kelas). Tujuannya adalah untuk membuat sintaks manipulasi objek menjadi lebih alami dan intuitif.
> > 
> >
> > ```cpp
> > // Tanpa overloading, kode bisa jadi kurang intuitif
> > Complex z = x.add(y.divide(z)); 
> > 
> > // Dengan overloading, kode lebih matematis dan mudah dibaca
> > Complex z = x + y / z; 
> > ```
> > 
> > Ini pada dasarnya adalah bentuk _function overloading_, di mana nama fungsinya adalah `operator@`, dengan `@` adalah simbol operator.
> > 
> > ### Implementasi: Member vs. Non-Member Function
> > 
> > Ada dua cara untuk mendefinisikan fungsi operator:
> > 
> > 1. **Sebagai Fungsi Anggota (Member Function)**
> >     
> >     - Dideklarasikan di dalam kelas.
> >     - Operan di sebelah kiri operator secara implisit adalah objek itu sendiri (`*this`).
> >     - Jumlah parameter formalnya adalah jumlah operan dikurangi satu.
> >     
> >     C++
> >     
> >     ```cpp
> >     class Complex {
> >     public:
> >         Complex operator/(const Complex& other); // Hanya butuh 1 parameter untuk operan kanan
> >     };
> >     ```
> >     
> > 2. **Sebagai Fungsi Non-Anggota (Non-Member Function)**
> >     
> >     - Dideklarasikan di luar kelas.
> >     - Jumlah parameter formalnya sama dengan jumlah operan.
> >     - Jika perlu mengakses anggota `private` atau `protected` dari kelas, fungsi ini harus dideklarasikan sebagai **`friend`** di dalam kelas tersebut.
> >     
> >     ```cpp
> >     class Matrix {
> >         friend Matrix operator*(const Matrix& a, const Matrix& b); // Butuh 2 parameter
> >     };
> >     
> >     // Implementasi non-member
> >     Matrix operator*(const Matrix& a, const Matrix& b){
> > 	    Matrix result; 
> > 	    // Logika perkalian matriks di sini. 
> > 	    // Fungsi ini bisa mengakses anggota private dari 'a' dan 'b' 
> > 	    // karena sudah diberi izin 'friend'. 
> > 	    // ... 
> > 	    return result;
> >     }
> >     ```
> >     
> > 
> > ### Kapan Memilih Member vs. Non-Member?
> > 
> > - Operator `=`, `[]`, `()`, dan `->` **wajib** diimplementasikan sebagai fungsi anggota.
> > - Jika operan di sebelah kiri **bukan** merupakan objek dari kelas kita (contoh: `std::cout << myObject;`), operator tersebut **wajib** diimplementasikan sebagai fungsi non-anggota (biasanya `friend`).
> > 
> > ### Aturan dan Batasan Overloading
> > 
> > - **Tidak bisa** mengubah _presedensi_ (urutan prioritas) dan _arity_ (jumlah operan) dari sebuah operator.
> > - **Tidak bisa** membuat simbol operator baru.
> > - Operator `::` (scope), `.` (member selector), `.*`, `?:` (ternary), dan `sizeof` **tidak bisa** di-overload.
> > - Untuk membedakan `++` _prefix_ dan _postfix_, versi _postfix_ didefinisikan dengan satu parameter `int` dummy: `T& operator++();` (prefix) vs `T operator++(int);` (postfix).
> > 
> > ### Studi Kasus: Operator Kunci
> > 
> > - **`operator=` (Assignment)**
> >     
> >     - Berbeda dengan _copy constructor_. Assignment (`a = b;`) terjadi pada dua objek yang **keduanya sudah ada**, sementara _copy constructor_ (`Stack s2 = s1;`) menciptakan objek baru.
> >     - Implementasinya harus melakukan _deep copy_: membebaskan memori lama, mengalokasikan memori baru, lalu menyalin konten.
> >     - Harus mengembalikan `*this` by reference (`Stack&`) untuk mendukung _chaining_ (`a = b = c;`).
> >     
> >     
> >     ```cpp
> >     Stack& Stack::operator=(const Stack& s) {
> >         delete[] data; // 1. Bebaskan memori lama
> >         size = s.size;
> >         data = new int[size]; // 2. Alokasikan memori baru
> >         topStack = s.topStack;
> >         for (int i=0; i<topStack; i++) data[i] = s.data[i]; // 3. Salin konten
> >         return *this; // 4. Kembalikan reference ke objek saat ini
> >     }
> >     ```
> >     
> > - **`operator[]` (Subscript)**
> >     - Memungkinkan objek untuk diakses seperti array. Berguna untuk membuat container kustom atau map yang bisa melakukan pengecekan batas indeks.
> > - **`operator<<` & `operator>>` (Stream)**
> >     - Digunakan untuk membuat I/O yang seragam dan intuitif. Biasanya diimplementasikan sebagai fungsi `friend` non-anggota karena operan kirinya adalah objek stream (`std::ostream` atau `std::istream`), bukan objek kelas kita.
> > 
> > ### Anggota Kelas Minimal ("The Big Four")
> > 
> > - Konsep ini menekankan kembali bahwa perancang kelas yang mengelola sumber daya (seperti memori dinamis dengan `new`) sebaiknya selalu mendefinisikan empat fungsi berikut untuk memastikan perilaku penyalinan dan penghancuran yang benar:
> >     1. Constructor
> >     2. Copy Constructor
> >     3. **Operator Assignment (`=`)**
> >     4. Destructor

> [!cornell] #### Summary
> 
> - _Operator Overloading_ memungkinkan kelas kustom di C++ untuk bekerja dengan operator standar (`+`, `=`, `<<`, dll.), membuat kode lebih intuitif. Implementasi dapat dilakukan sebagai _member function_ (jika operan kiri adalah objek kelas) atau _non-member/friend function_ (untuk fleksibilitas, seperti pada stream I/O).
> - Mendefinisikan `operator=` dengan benar—melakukan _deep copy_ dan mengembalikan `*this` by reference—adalah bagian krusial dari "Anggota Kelas Minimal" untuk manajemen sumber daya yang aman dan dapat diprediksi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### The Copy-and-Swap Idiom
> 
> - Cara yang sangat populer dan aman untuk mengimplementasikan _operator assignment_ adalah dengan idiom "copy-and-swap". Ini memanfaatkan _copy constructor_ dan `std::swap` untuk menyediakan _strong exception safety_ (jika alokasi memori gagal, objek asli tetap dalam keadaan valid).
>     
>     C++
>     
>     ```
>     // Di dalam kelas MyClass
>     MyClass& operator=(MyClass other) { // Terima parameter by-value, memanggil cctor
>         swap(*this, other); // Tukar isi objek saat ini dengan salinannya
>         return *this;
>     } // 'other' akan dihancurkan di sini, membawa serta data lama dari '*this'
>     ```
>     
> 
> #### Overloading dan Konversi Tipe
> 
> - Selain operator, C++ juga memungkinkan Anda mendefinisikan _conversion operators_ yang memungkinkan objek kelas Anda dikonversi secara implisit ke tipe lain. Contoh: `operator bool() const;` akan memungkinkan objek Anda digunakan dalam konteks `if (myObject) { ... }`.