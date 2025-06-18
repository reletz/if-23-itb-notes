---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]

> [!cornell] Siklus Hidup Objek dan Manajemen Memori (The Big Four)
> 
> > ## Questions/Cues
> > 
> > - Apa itu ctor, dtor, cctor?
> > - Bagaimana _lifetime_ objek ditentukan?
> > - Kapan _Copy Constructor_ (cctor) dipanggil?
> > - Apa itu _Deep Copy_ vs _Bitwise Copy_?
> > - Apa itu _Constructor Initialization List_?
> > - Apa itu "The Big Four"?
> > 
> > ## Reference Points
> > 
> > - Materi PDF: "Bahasa C++: Konsep Kelas (bagian II)"
> > - Materi Pendukung: "Tutorial 1"
>
> > ### "The Big Four": ctor, dtor, cctor, dan operator=
> > 
> > Dalam C++, ada empat method khusus yang mengelola siklus hidup objek. Jika sebuah kelas mengelola sumber daya secara manual (misalnya, memori dinamis), sangat penting untuk mendefinisikan keempatnya.
> > 
> > 1. **Constructor (ctor)**: Method yang namanya sama dengan nama kelas, dipanggil secara otomatis saat objek **diciptakan**. Tugasnya adalah menginisialisasi atribut. Bisa berupa _default ctor_ (tanpa parameter) atau _user-defined ctor_ (dengan parameter).
> > 2. **Destructor (dtor)**: Method dengan nama `~NamaKelas`, dipanggil secara otomatis saat objek **dihancurkan**. Tugasnya adalah melepaskan sumber daya (misalnya, membebaskan memori yang dialokasikan dengan `new`).
> > 3. **Copy Constructor (cctor)**: Constructor berbentuk `NamaKelas(const NamaKelas&)`, dipanggil saat sebuah objek baru **diciptakan sebagai salinan** dari objek lain yang sudah ada.
> > 4. **Operator Assignment (`=`)**: Method `operator=` yang dipanggil saat nilai dari satu objek yang sudah ada **disalin ke objek lain** yang juga sudah ada (`a = b;`).
> > 
> > ### Lifetime (Masa Hidup) Objek
> > 
> > Objek di C++ memiliki masa hidup yang berbeda tergantung cara penciptaannya:
> > 
> > - **Automatic Object**: Dideklarasikan di dalam sebuah blok (`{...}`). Diciptakan saat eksekusi masuk ke blok, dihancurkan saat keluar dari blok.
> > - **Static Object**: Objek global atau yang dideklarasikan dengan keyword `static`. Diciptakan saat program dimulai, dihancurkan saat program berakhir.
> > - **Free Store Object**: Diciptakan secara eksplisit dengan `new`, dan harus dihancurkan secara eksplisit dengan `delete`.
> > 
> > ### Implicit Constructor
> > Jika kita tidak membuat (mendefinisikan) constructor sama sekali di dalam sebuah kelas, **program akan tetap berjalan karena C++ compiler akan secara otomatis membuatkannya untuk kita**. Constructor yang dibuat secara otomatis ini disebut **default constructor implisit** (_implicit_ atau _synthesized default constructor_). Bersifat:
> > 1. **Bersifat `public` dan Tidak Punya Parameter**: Compiler akan membuat constructor `public` tanpa parameter, sehingga Anda bisa membuat objek seperti ini: `NamaKelas objek;`.
> > 2. **Isinya Kosong**: Body dari constructor ini pada dasarnya kosong. Ia tidak melakukan inisialisasi apa pun terhadap anggota bertipe data primitif (seperti `int`, `float`, `double`, atau pointer). Akibatnya, nilai dari atribut-atribut ini akan "sampah" atau tidak terdefinisi (_indeterminate_).
> > 3. **Memanggil Default Constructor Milik Anggota**: Ini bagian yang penting. Jika kelas Anda memiliki atribut yang merupakan objek dari kelas lain (misalnya, atribut bertipe `std::string`), maka default constructor implisit ini akan **secara otomatis memanggil default constructor dari setiap atribut objek tersebut**.
> >
> > Misalkan kita punya kelas `Player` seperti ini, tanpa constructor sama sekali:
> > ```cpp
> > #include <iostream>
> > #include <string>
> > 
> > class Player {
> > 	public:
> > 	// Tidak ada constructor yang kita tulis
> > 	void display() {
> > 		std::cout << "Level: " << level << std::endl; // 'level' adalah int
> > 		std::cout << "Name: '" << name << "'" << std::endl; // 'name' adalah objek std::string
> > 	}
> > 	
> > 	// private: (dibuat public untuk kemudahan demo)
> > 	int level;
> > 	std::string name; 
> > };
> > 
> > int main() {
> > 	Player p1; // Ini valid karena compiler membuatkan Player::Player()
> > 	p1.display();
> > 	return 0;
> > }
> > ```
> > 
> > **Ketika dijalankan, outputnya akan terlihat seperti ini:**
> > ```
> > Level: 4202028       // Nilai acak atau "sampah"
> > Name: ''            // String kosong
> > ```
> >
> > ### Copy Constructor & Deep Copy
> > 
> > _Copy constructor_ dipanggil dalam tiga skenario utama:
> > 
> > 4. Saat deklarasi dengan inisialisasi: `Stack s2 = s1;`
> > 5. Saat melewatkan parameter ke fungsi secara _pass-by-value_.
> > 6. Saat sebuah fungsi mengembalikan objek secara _return-by-value_.
> > 
> > Jika cctor tidak didefinisikan, compiler akan melakukan **Bitwise Copy** (menyalin byte-per-byte). Ini berbahaya jika kelas memiliki pointer, karena hanya alamat pointer yang disalin, bukan data yang ditunjuk. Kedua objek akan menunjuk ke area memori yang sama.
> > 
> > Solusinya adalah **Deep Copy**, di mana cctor secara manual mengalokasikan memori baru untuk objek salinan dan menyalin isinya.
> > 
> > 
> > ```cpp
> > // Implementasi cctor untuk deep copy pada kelas Stack
> > Stack::Stack (const Stack& s) {
> >     size = s.size;
> >     topStack = s.topStack;
> >     data = new int[size]; // Alokasi memori baru, bukan hanya menyalin pointer
> >     for (int i=0; i<topStack; i++) {
> >         data[i] = s.data[i]; // Salin isinya
> >     }
> > }
> > ```
> > 
> > ### Constructor Initialization List
> > 
> > Ini adalah cara untuk menginisialisasi atribut **sebelum** body constructor dieksekusi. Ini adalah satu-satunya cara untuk menginisialisasi atribut `const` atau memanggil constructor non-default dari member objek.
> > 
> > ```cpp
> > class Parser {
> > public:
> >     Parser(int x);
> > private:
> >     Stack sym_stack, op_stack; // Member objek
> > };
> > 
> > // Inisialisasi sym_stack dan op_stack dengan ctor Stack(int)
> > Parser::Parser(int x): sym_stack(x), op_stack(x) {
> >     // Body constructor
> > }
> > ```

> [!cornell] #### Summary
> 
> - Siklus hidup objek C++ dikelola oleh empat fungsi khusus: **Constructor** (membuat), **Destructor** (menghancurkan), **Copy Constructor** (menyalin saat inisialisasi), dan **Operator Assignment** (menyalin ke objek yang sudah ada).
> - Untuk kelas yang mengelola memori dinamis, mendefinisikan "The Big Four" ini secara manual sangat penting untuk mengimplementasikan **Deep Copy**, yang mencegah masalah seperti _double-free_ atau _dangling pointers_ yang disebabkan oleh _Bitwise Copy_ default dari compiler.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### The Rule of Three / Five / Zero
> 
> - Konsep "The Big Four" adalah cikal bakal dari **"The Rule of Three"** di C++: jika Anda perlu mendefinisikan salah satu dari _cctor_, _operator=_, atau _dtor_, kemungkinan besar Anda perlu mendefinisikan ketiganya.
> - Sejak C++11, ini berkembang menjadi **"The Rule of Five"** dengan ditambahkannya _move constructor_ dan _move assignment operator_ untuk optimisasi performa (menghindari salinan yang tidak perlu).
> - Paradigma C++ modern mendorong **"The Rule of Zero"**: Rancanglah kelas Anda sedemikian rupa sehingga ia tidak mengelola sumber daya secara langsung (misalnya, gunakan _smart pointers_ atau container STL). Dengan begitu, Anda tidak perlu menulis satu pun dari kelima fungsi khusus ini, karena versi default yang dibuat compiler sudah cukup.