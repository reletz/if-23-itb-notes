---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[OOP]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Aturan Inheritance di Java (`extends`)
> > - Polimorfisme & Hubungan `is-a`
> > - Keyword `final` (Method & Kelas)
> > - `abstract class` & `abstract method`
> > - Keyword `super` (Konstruktor & Method)
> > - Masalah _Multiple Inheritance_ (Ambiguitas)
> > - `interface` sebagai Solusi
> > - Implementasi `interface` & Contoh `Valuable`
> > - `abstract class` vs. `interface`: Perbedaan & Kapan Menggunakannya
>
> > ### Inheritance (Pewarisan) di Java
> > - Di Java hanya ada **single inheritance** (sebuah kelas hanya bisa `extends` satu superclass).
> > - Penurunan selalu bersifat **`public`**. Tidak ada `private` atau `protected` inheritance seperti di C++.
> > - Kata kunci yang digunakan adalah **`extends`**.
> > ```java
> > class Lingkaran extends Bangun { // ... }
> > ```
> > **Yang Terjadi Saat Inheritance:**
> > - **Atribut & Method:** Atribut dan method dari superclass dapat langsung digunakan oleh subclass.
> > - **Overriding:** Jika subclass mendefinisikan method dengan _nama_ dan _signature_ yang sama dengan superclass, maka method superclass tersebut di-**override**. Perilaku subclass yang akan digunakan.
> > - **Hiding:** Jika subclass mendeklarasikan atribut atau _method statik_ dengan nama yang sama, maka atribut/method statik di superclass menjadi tersembunyi (_hidden_).
> > 
> > ### Polymorphism dan Hubungan "is-a"
> > Java menggunakan _static polymorphism_. Sifat sebuah objek ditentukan oleh **tipe referensi yang ditunjuknya saat runtime**, bukan tipe saat deklarasi.
> > _Contoh:_ Jika `Bangun b = new Lingkaran();`, maka `b.getLuas()` akan memanggil method `getLuas()` milik `Lingkaran`.
> > ```java
> > Lingkaran l = new Lingkaran(10);
> > Segitiga s = new Segitiga(1, 2, 3);
> > 
> > Bangun b = l; // b menunjuk ke objek Lingkaran
> > System.out.println(b.getLuas()); // Mencetak luas lingkaran
> > 
> > b = s; // b sekarang menunjuk ke objek Segitiga
> > System.out.println(b.getLuas()); // Mencetak luas segitiga
> > ```
> > Jika `Lingkaran extends Bangun`, maka secara logis "sebuah Lingkaran **adalah sebuah** Bangun" (`Lingkaran is a Bangun`). Ini memungkinkan objek subclass di-supply ke method yang mengharapkan parameter bertipe superclass.
> > ```java
> > void doSomethingTo(Bangun b) { ... } 
> > Lingkaran l = new Lingkaran(5); 
> > doSomethingTo(l); // Valid karena Lingkaran "is a" Bangun
> >```
> > ### Keyword Final dan Abstract
> > - **`final`:**
> > 	- **Method `final`:** Tidak dapat di-override oleh subclass.
> > 	- **Kelas `final`:** Tidak dapat diwariskan (tidak bisa di-`extends`). Contoh: kelas `String` dan `System` di Java API.
> > - **`abstract`:**
> > 	- **Method `abstract`:** Dideklarasikan tanpa implementasi (tanpa `{}`), diakhiri dengan titik koma (`;`). Kelas yang memiliki method ini harus dideklarasikan `abstract`.
> > 	- **Kelas `abstract`:** Kelas yang tidak bisa diinstansiasi (tidak bisa dibuat objeknya dengan `new`). Berfungsi sebagai _blueprint_ untuk kelas turunannya.
> > ```java
> >  abstract class Bangun { // Method konkret 
> > 	 void test() { 
> > 		 System.out.println("Luas " + getLuas()); 
> > 	} 
> > 	 // Method abstract yang wajib diimplementasi oleh subclass non-abstrak
> > 	 abstract float getLuas(); 
> > } 
> > 
> > class Lingkaran extends Bangun { 
> > 	float r; 
> > 	
> > 	@Override 
> > 	float getLuas() {
> > 		return (float) (Math.PI * r * r); 
> > 	} 
> > }
> >  ```
> >  
> > ### Keyword `super`
> > - Digunakan untuk memanggil behavior dari _parent class_.
> > - **Memanggil Konstruktor Parent:**
> > 	- Gunakan `super(...)` dengan parameter yang sesuai.
> > 	- **Harus menjadi statement pertama** di dalam konstruktor subclass.
> > 	- Jika tidak dipanggil secara eksplisit, konstruktor default parent (`super()`) akan dipanggil secara implisit.
> >- **Memanggil Method Parent:**
> >	- Digunakan ketika sebuah method di subclass meng-override method parent, tetapi masih ingin menjalankan implementasi dari parent.
> > ```java
> > class Student extends Person {
> > 	void print() {
> > 		super.print(); // Memanggil method print() milik Person
> > 		System.out.println("id: " + studentId);
> > 	}
> > }
> > ```
> > ### Masalah _Multiple Inheritance_ dan Solusinya
> > Java tidak mengizinkan sebuah kelas `extends` lebih dari satu kelas. Hal ini untuk menghindari:
> > 1. **Masalah Ambiguitas (Diamond Problem):** Jika `Sub` mewarisi dari `Super1` dan `Super2`, dan keduanya memiliki `methodA()`, method mana yang harus dipanggil oleh `Sub`?
> > 2. **Masalah Efisiensi Runtime:** Pencarian method (dynamic binding) akan menjadi lebih kompleks dan lambat.
> > 
> > **Solusi di Java:** Menggunakan **`interface`**. Sebuah kelas boleh `implements` banyak `interface`.
> > - **Interface:** Sebuah "kontrak" yang mendefinisikan sekumpulan method _abstract_ (behavior). Interface tidak memiliki _state_ (atribut instance) atau konstruktor. Ia hanya mendefinisikan "apa yang bisa dilakukan" oleh sebuah objek.
> > 
> > Sebuah kelas `implements` sebuah interface dan wajib menyediakan implementasi untuk semua method di dalamnya.
> > ```java
> > // ValuableHouse adalah sebuah House DAN sebuah Valuable
> > public class ValuableHouse extends House implements Valuable {
> > 
> > 	@Override
> > 	public int value() {
> > 		// ... implementasi perhitungan nilai rumah
> > 		return (int) (getNoOfBedrooms() * 50000 * locationDesirabilityIndex);
> > 	}
> > }
> > 
> > // ValuableCar adalah sebuah Car DAN sebuah Valuable
> > public class ValuableCar extends Car implements Valuable {
> > 
> > 	@Override
> > 	public int value() {
> > 		// ... implementasi perhitungan nilai mobil
> > 		return (int) (getNoOfDoors() * 2000 * streetCredibilityIndex);
> > 	}
> > }
> > ```
> > Dengan `interface`, kita bisa membuat koleksi objek dari tipe yang sama sekali berbeda (`House`, `Car`), selama mereka semua mengimplementasikan `interface` yang sama (`Valuable`), dan memperlakukannya secara polimorfik.
> >
> > **Perbedaan dengan Abstract Class**
> >  Gunakan **`abstract class`** jika:
> > - Anda ingin berbagi kode (implementasi method) di antara beberapa kelas yang sangat berhubungan erat.
> > - Kelas-kelas turunan memiliki state (atribut) atau behavior dasar yang sama.
> > 
> >  Gunakan **`interface`** jika:
> > - Anda ingin mendefinisikan sebuah "kontrak" perilaku yang bisa diimplementasikan oleh kelas-kelas yang tidak berhubungan.
> > - Anda ingin memanfaatkan _multiple inheritance_ untuk tipe data.

> [!cornell] #### Summary
> Materi ini menjelaskan dua pilar utama PBO di Java. `Inheritance` (`extends`) digunakan untuk menciptakan hierarki kelas `is-a` yang kuat, memungkinkan pewarisan dan polimorfisme, namun dibatasi hanya untuk satu superclass untuk menghindari ambiguitas. Batasan ini diatasi dengan `interface`, yang memungkinkan sebuah kelas mengadopsi banyak "perilaku" atau "kontrak" dari berbagai sumber. `Interface` menjadi solusi elegan untuk _multiple inheritance_, memungkinkan objek dari hierarki yang berbeda (seperti `House` dan `Car`) untuk diperlakukan secara seragam berdasarkan kemampuan yang sama (seperti `Valuable`), sementara `abstract class` lebih cocok untuk berbagi implementasi kode di antara kelas-kelas yang berkerabat dekat.

> [!ad-libitum]- Additional Information (Optional)
> #### **Pendalaman Teknis**
> - **Fitur Modern pada `interface` (Sejak Java 8):** Materi yang diberikan menggambarkan `interface` versi klasik. Penting untuk diketahui bahwa sejak Java 8, `interface` menjadi lebih kuat:
> 	1. **`default` Methods:** `interface` dapat memiliki method dengan implementasi penuh menggunakan keyword `default`. Tujuannya adalah untuk menambahkan fungsionalitas baru ke `interface` tanpa merusak semua kelas yang sudah mengimplementasikannya (memberikan implementasi bawaan).
> 	2. **`static` Methods:** `interface` juga dapat memiliki method `static`. Ini biasanya digunakan untuk fungsi-fungsi utilitas yang terkait dengan `interface` tersebut, tanpa perlu membuat kelas utilitas terpisah.
> - **Solusi "Diamond Problem" di Java 8:** Jika sebuah kelas mengimplementasikan dua `interface` yang kebetulan memiliki `default method` dengan _signature_ yang sama, Java akan menghasilkan _compile error_. Ini memaksa programmer untuk secara eksplisit meng-override method tersebut di dalam kelasnya dan memutuskan implementasi mana yang akan digunakan (atau menyediakan implementasi yang sama sekali baru), sehingga secara sadar menyelesaikan ambiguitas.