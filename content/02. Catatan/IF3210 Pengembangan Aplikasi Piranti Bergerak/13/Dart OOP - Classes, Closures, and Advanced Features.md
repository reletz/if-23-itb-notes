---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Dart OOP - Classes, Closures, and Advanced Features
>
> > ## Questions/Cues
> >
> > - Bagaimana cara mendefinisikan konstruktor bernama (_named constructor_) dan kapan digunakannya?
> > - Apa perbedaan `extends`, `implements`, dan `with` dalam hierarki kelas Dart?
> > - Mengapa Dart tidak memiliki kata kunci `interface` dan bagaimana cara kerjanya?
> > - Apa keunggulan **extension** dibanding subclassing untuk menambah fungsionalitas?
> > - Bagaimana **mixin** memungkinkan pewarisan berganda tanpa diamond problem?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 13a: 22-29, 13b: 16-22)
>
> > ### Kelas: Konstruktor, Methods, dan Named Constructors
> >
> > **Class** di Dart adalah _blueprint_ untuk membuat objek. Setiap class dapat memiliki _fields_ (variabel anggota), konstruktor, dan _methods_. Konstruktor default dibuat otomatis jika tidak didefinisikan eksplisit.
> >
> > **_Named constructor_** memungkinkan sebuah class memiliki **beberapa konstruktor** dengan nama berbeda, berguna untuk skenario inisialisasi yang berbeda. Contoh: `Point.fromJson(Map json)` atau `Color.fromRGB(int r, int g, int b)`. Ini menggantikan _constructor overloading_ yang ada di Java/Kotlin karena Dart tidak mendukung _method overloading_.
> >
> > Dart juga mendukung **_initializer list_** pada konstruktor (menggunakan `:` setelah parameter) untuk menginisialisasi _final fields_ sebelum tubuh konstruktor dieksekusi. Pola `this.fieldName` dalam parameter konstruktor (_initializing formals_) adalah cara singkat untuk mengassign parameter ke field dengan nama yang sama.
> >
> > ### Pewarisan: extends, super, dan @override
> >
> > Dart mendukung **pewarisan tunggal** menggunakan kata kunci **`extends`**. Subclass mewarisi semua anggota publik dari superclass dan dapat meng-**override** method menggunakan anotasi **`@override`**. Anotasi ini bersifat opsional secara teknis tetapi sangat direkomendasikan karena kompiler akan memberikan peringatan jika method yang di-override tidak ada di superclass (membantu mendeteksi typo).
> >
> > Kata kunci **`super`** digunakan untuk:
> > - Memanggil konstruktor superclass: `super(param)` atau `super.namedConstructor(param)`
> > - Memanggil implementasi method superclass dari dalam override: `super.methodName()`
> >
> > ### Polimorfisme: is, is!, as, dan runtimeType
> >
> > Polimorfisme memungkinkan objek diperlakukan sebagai instans dari tipe yang berbeda dalam hierarkinya. Dart menyediakan operator khusus untuk ini:
> >
> > | Operator | Fungsi | Contoh |
> > |----------|--------|--------|
> > | **`is`** | Cek tipe, kembalikan `bool` | `if (animal is Dog)` |
> > | **`is!`** | Negasi cek tipe | `if (animal is! Cat)` |
> > | **`as`** | _Type cast_ (gagal jika tidak kompatibel) | `(animal as Dog).bark()` |
> > | **`.runtimeType`** | Dapatkan tipe aktual saat runtime | `print(obj.runtimeType)` |
> >
> > Dart mendukung **_type promotion_**: setelah `is` check berhasil, dalam blok kode tersebut variabel otomatis dipromosikan ke tipe yang lebih spesifik tanpa perlu cast eksplisit.
> >
> > ### Static Members dan Enums
> >
> > **Anggota `static`** milik class itu sendiri, bukan instans tertentu. Static field digunakan untuk data yang dibagi seluruh instans; static method tidak dapat mengakses `this`. Contoh penggunaan: counter jumlah instans, konstanta terkait class.
> >
> > **`enum`** mendefinisikan himpunan konstanta bernama yang terbatas. Dart mendukung **_enhanced enums_** yang dapat memiliki fields, konstruktor, dan methods. Enum sangat cocok digunakan bersama **`switch`** karena kompiler memastikan semua _case_ tertangani (_exhaustive checking_):
> >
> > ```mermaid
> > flowchart LR
> >     A["enum Status"] --> B["pending"]
> >     A --> C["active"]
> >     A --> D["closed"]
> >     E["switch(status)"] --> F["case pending:"]
> >     E --> G["case active:"]
> >     E --> H["case closed:"]
> >     F & G & H --> I["Kompiler verifikasi</br>semua case tertangani"]
> > ```
> >
> > ### Abstract Class: Pengganti Interface di Dart
> >
> > Dart **tidak memiliki kata kunci `interface`** yang terpisah. Sebagai gantinya, **setiap class secara implisit mendefinisikan sebuah interface** — class lain dapat mengimplementasikan interface tersebut menggunakan `implements` tanpa mewarisi implementasinya. Class yang mendeklarasikan `abstract` tidak bisa diinstansiasi langsung dan bisa memiliki **_abstract methods_** (tanpa implementasi) yang wajib di-override oleh subclass.
> >
> > Perbedaan `extends` vs `implements`:
> > - **`extends`**: mewarisi implementasi dan bisa menggunakan `super`
> > - **`implements`**: hanya mewarisi kontrak (interface), wajib mengimplementasikan ulang semua method
> >
> > ### Anotasi: @protected dan @nonVirtual
> >
> > Dart menggunakan **anotasi** (dari package `meta`) untuk mengkomunikasikan intensi desain kepada kompiler dan pengembang lain:
> >
> > - **`@protected`**: method hanya boleh dipanggil dari class itu sendiri atau subclass-nya. Mirip `protected` di Java, tetapi di Dart ini hanya sebuah peringatan analisis statis, bukan enforced oleh runtime.
> > - **`@nonVirtual`**: method tidak boleh di-override oleh subclass. Berguna untuk memastikan perilaku kritis tidak diubah secara tidak sengaja.
> >
> > ### Extension: Menambah Fungsionalitas Tanpa Subclassing
> >
> > **Extension** memungkinkan penambahan method (dan getter/setter/operator) ke tipe yang sudah ada **tanpa mengubah kode sumber aslinya** dan tanpa membuat subclass. Ini sangat berguna untuk menambahkan method utilitas ke tipe bawaan seperti `String`, `List`, atau tipe dari library eksternal.
> >
> > Contoh: `extension StringUtils on String { bool get isPalindrome => this == split('').reversed.join(); }`. Setelah definisi ini, setiap `String` memiliki getter `isPalindrome` yang bisa dipanggil langsung.
> >
> > ### Mixin: Pewarisan Berganda yang Aman
> >
> > **Mixin** adalah mekanisme untuk menggunakan kembali kode antar hierarki class yang berbeda, memungkinkan sejenis **_multiple inheritance_** tanpa _diamond problem_. Mixin didefinisikan dengan kata kunci `mixin` dan digunakan dengan kata kunci **`with`**.
> >
> > Urutan penerapan mixin bersifat deterministik (dari kiri ke kanan dalam deklarasi `with`), sehingga konflik method dapat diprediksi. Dart menyelesaikan konflik dengan mengutamakan mixin yang disebutkan terakhir. Mixin tidak bisa diinstansiasi secara langsung dan dapat dibatasi hanya bisa digunakan pada class tertentu menggunakan `on`.

> [!cornell] #### Summary
>
> **OOP di Dart** dibangun di atas **pewarisan tunggal** (`extends`) dengan dukungan **_named constructors_** untuk menggantikan _constructor overloading_. Polimorfisme difasilitasi oleh operator **`is`/`is!`/`as`** dan _type promotion_ otomatis. Dart menggantikan kata kunci `interface` dengan konsep bahwa **setiap class adalah interface implisit** — gunakan `implements` untuk kontrak dan `extends` untuk implementasi. **`enum`** yang diperkuat bekerja sempurna dengan _exhaustive switch_. **Extension** memungkinkan penambahan method ke tipe yang ada tanpa subclassing, sementara **mixin** (`with`) memungkinkan _multiple inheritance_ yang aman dan deterministik. Anotasi **`@protected`** dan **`@nonVirtual`** mengkomunikasikan batasan desain lewat analisis statis.

> [!ad-libitum]- Additional Information
>
> #### Sealed Classes di Dart 3
>
> Dart 3.0 memperkenalkan **`sealed`** class sebagai fitur baru. Sealed class mirip `abstract` tetapi semua subclass-nya harus berada dalam file yang sama (_closed type hierarchy_). Ini memungkinkan kompiler melakukan **_exhaustive checking_** pada `switch` expressions atas sealed class, membuat kode lebih aman dan ekspresif.
>
> #### Factory Constructor
>
> **_Factory constructor_** (`factory` keyword) adalah pola untuk mengontrol pembuatan instans — dapat mengembalikan instans yang sudah ada dari cache, subclass tertentu, atau melakukan logika inisialisasi kompleks. Berbeda dengan konstruktor biasa, factory constructor tidak harus membuat objek baru. Ini umum dipakai untuk pola Singleton dan deserialisasi JSON.
>
> #### Mixin vs Abstract Class: Kapan Menggunakan Mana
>
> Gunakan **abstract class** saat ingin mendefinisikan kontrak dengan kemungkinan implementasi default dan relasi "is-a". Gunakan **mixin** saat ingin berbagi kemampuan (_capability_) antar class yang tidak terkait dalam hierarki — misalnya kemampuan "dapat diserialisasi" atau "dapat dilog" yang relevan untuk berbagai class berbeda.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat hierarki class `Shape` (abstract) dengan subclass `Circle` dan `Rectangle`, implementasikan polimorfisme dengan method `area()` dan demonstrasikan `is`/`as` operator
> 2. Tulis `mixin Printable { void printInfo(); }` dan terapkan ke beberapa class berbeda menggunakan `with`, lalu panggil `printInfo()` secara polimorfis
> 3. Buat `extension` pada `List<int>` yang menambahkan method `sum()` dan `average()`, lalu gunakan di fungsi `main()`
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Dart: "Classes" (dart.dev/language/classes)
> - Dokumentasi Resmi Dart: "Mixins" (dart.dev/language/mixins)
> - Dokumentasi Resmi Dart: "Extension methods" (dart.dev/language/extension-methods)
> - "Effective Dart: Design" — panduan gaya OOP resmi dari tim Dart
