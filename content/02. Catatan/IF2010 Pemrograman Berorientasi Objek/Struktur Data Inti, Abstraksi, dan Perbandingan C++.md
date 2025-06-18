---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Sifat String: Immutable
> > - `==` vs `.equals()` untuk String
> > - `StringBuilder` untuk Efisiensi
> > - Pentingnya Method `toString()`
> > - Array sebagai Objek
> > - Inisialisasi Array & Array of Objects
> > - C++ vs Java: Perbedaan Kunci
> > - Inheritance di Java: `extends`
> > - `Abstract Class`
> > - `Interface` & Implementasi Ganda
> > - Polimorfisme via Interface
> >
>
> > ### `String` di Java
> > **String adalah Objek Immutable**
> > `String` di Java bukanlah tipe primitif, melainkan sebuah kelas. Sifatnya yang paling penting adalah **immutable** (tidak bisa diubah). Setiap kali Anda melakukan operasi yang terlihat seperti memodifikasi String, Java sebenarnya membuat objek String baru di memori.
> > ```java
> > String s = "Hello";
> > s = s + " World"; // Ini tidak mengubah objek "Hello"
> > 								// Ini membuat objek BARU "Hello World"
> > 								// dan membuat 's' menunjuk ke objek baru tersebut.
> > 								// Objek "Hello" yang lama akan dibersihkan oleh Garbage Col
> > ```
> >**Perbandingan String**
> > Karena String adalah objek, aturan perbandingan berlaku:
> > - `==`: Membandingkan **alamat memori**. Hanya `true` jika kedua variabel menunjuk ke objek yang identik. **Jangan gunakan ini untuk membandingkan isi String.**
> > - `.equals()`: Method yang **wajib** digunakan untuk membandingkan **isi (konten)** dua String.
> > - `.compareTo()`: Membandingkan urutan **leksikografis** (urutan kamus) dan mengembalikan `int` (`0` jika sama, `<0` jika string ini lebih dulu, `>0` jika string ini belakangan).
> >
> >**Kelas StringBuilder untuk String yang Mutable**
> > Karena membuat objek String baru terus-menerus itu tidak efisien, Java menyediakan kelas `StringBuilder` (atau `StringBuffer` yang thread-safe) untuk manipulasi String yang intensif. `StringBuilder` bersifat **mutable** (bisa diubah).
> > ``` java
> > // Tidak efisien untuk loop yang besar
> > String result = "";
> > for (String val : values) {
> > 	result += val; 
> > }
> > 
> > // Efisien
> > StringBuilder sb = new StringBuilder();
> > for (String val : values) {
> > 	sb.append(val); // Memodifikasi objek sb yang sama, tidak membuat baru
> > }
> > String finalResult = sb.toString();
> > ```
> > 
> > **Method toString()**
> > Semua objek di Java mewarisi method `toString()` dari kelas `Object`. Secara default, method ini mencetak nama kelas dan hashcode alamat memori. Sangat dianjurkan untuk melakukan **override** (mendefinisikan ulang) method ini di kelas agar menghasilkan representasi String yang lebih informatif.
> > 
> > ### Penanganan `Array` di Java
> > **Array adalah Objek**
> > Berbeda dengan C++, array di Java adalah objek. Mereka dibuat di Heap dan memiliki atribut, contohnya `length` untuk mendapatkan ukurannya.
> > 
> > **Deklarasi dan Alokasi**
> > Membuat array adalah proses dua langkah: deklarasi referensi dan alokasi memori untuk array itu sendiri dengan `new`.
> > ```java
> > int[] anArray = new int[10]; // Alokasi memori untuk 10 integer
> >```
> > **Alokasi Array of Objects**
> > Ini adalah poin penting. Saat membuat array objek, kita hanya mengalokasikan ruang untuk **referensi**, bukan untuk objek-objeknya itu sendiri. Kita harus mengalokasikan setiap objek secara manual.
> > ``` java
> > // 1. Alokasi array untuk 5 referensi Lingkaran (semuanya masih null)
> > Lingkaran[] ling = new Lingkaran[5];
> > 
> > // 2. Alokasi setiap objek Lingkaran secara individual
> > for (int i = 0; i < ling.length; i++) {
> > 	ling[i] = new Lingkaran(); // Setiap elemen kini menunjuk ke objek baru
> > }
> >```
> >
> > ### Abstraksi & Perbandingan dengan C++
> > **Perbedaan Kunci Java vs. C++**
> > - **Pointer:** Java tidak memiliki pointer eksplisit. Semua objek diakses melalui referensi.
> > - **Memory Management:** Java menggunakan Garbage Collection otomatis; C++ memerlukan `new`/`delete` manual.
> > - **Operator Overloading:** Tidak didukung di Java.
> > - **Templates:** Java menggunakan **Generics** (`ArrayList<String>`).
> > - **Namespace:** Java menggunakan **Packages**.
> > 
> > **[[Inheritance]]**
> > - Java menggunakan keyword `extends`.
> > - Java hanya mendukung **single inheritance** (satu kelas hanya bisa `extends` satu kelas lain).
> > - Semua inheritance di Java bersifat `public`. Tidak ada `protected` atau `private` inheritance seperti di C++.
> >
> > **Abstract Class**
> > - Sebuah kelas yang dideklarasikan dengan `abstract` dan **tidak bisa diinstansiasi** (tidak bisa dibuat objeknya dengan `new`).
> > - Berfungsi sebagai _blueprint_ parsial. Bisa memiliki atribut, konstruktor, method konkret (dengan implementasi), dan **method abstract** (tanpa implementasi).
> > - Kelas turunan (subclass) **wajib** meng-override semua method abstract dari parent-nya, atau kelas turunan tersebut juga harus dideklarasikan sebagai `abstract`.
> > ```java
> > abstract class Rekening {
> > 	protected double saldo;
> > 	public double getSaldo() { return saldo; } // Method konkret
> > 	public abstract void update(); // Method abstract, tanpa body
> > }
> > ```
> >
> >**Interface**
> >- Sebuah "kontrak" murni yang hanya berisi deklarasi method (secara default `public abstract`) dan konstanta (`public static final`).
> >- Sebuah kelas bisa **`implements` banyak interface**, yang merupakan cara Java untuk mencapai manfaat dari _multiple inheritance_.
> >- Mendefinisikan sebuah "perilaku" atau "kemampuan" tanpa peduli implementasinya. Ini adalah pilar utama polimorfisme di Java.
> > ``` java
> > interface Tarikable {
> > 	void tarik(double jumlah); // Otomatis public abstract
> > }
> > 
> > interface Setorable {
> > 	void setor(double jumlah);
> > }
> > 
> > // Kelas ini berjanji untuk menyediakan implementasi untuk kedua interface
> > class RekeningBank implements Tarikable, Setorable {
> > 	public void tarik(double jumlah) { /* implementasi */ }
> > 	public void setor(double jumlah) { /* implementasi */ }
> > }

> [!cornell] #### Summary
> Catatan ini membahas dua pilar penting Java: penanganan struktur data inti dan mekanisme abstraksi. `String` diperlakukan sebagai objek immutable yang memerlukan `StringBuilder` untuk modifikasi efisien, sementara `Array` juga merupakan objek yang alokasi elemen objeknya harus dilakukan secara eksplisit. Untuk abstraksi, Java menawarkan `abstract class` sebagai blueprint parsial dengan implementasi sebagian, dan `interface` sebagai kontrak perilaku murni. `Interface` menjadi kunci bagi Java untuk mengadopsi polimorfisme yang fleksibel dan meniru manfaat _multiple inheritance_ tanpa kompleksitasnya, membedakannya secara signifikan dari C++.

> [!ad-libitum]- Additional Information (Optional)
> #### Pendalaman Teknis
> - **String Pool:** Untuk efisiensi, JVM menyimpan String literal (misal, `"hello"`) dalam sebuah area memori khusus yang disebut **String Pool**. Ketika Anda mendeklarasikan `String s1 = "text";` dan `String s2 = "text";`, JVM cerdas dan membuat kedua variabel merujuk ke objek `"text"` yang sama di dalam pool. Inilah sebabnya `s1 == s2` akan menghasilkan `true`. Namun, jika Anda menggunakan `String s3 = new String("text");`, Anda secara eksplisit memaksa pembuatan objek baru di Heap (di luar pool), sehingga `s1 == s3` akan menghasilkan `false`. Ini adalah alasan teknis mengapa `.equals()` adalah satu-satunya cara yang aman untuk membandingkan konten string.
> - **Default Methods di Interface (Java 8+):** Sejak Java 8, `interface` dapat memiliki `default` methods, yaitu method yang memiliki implementasi default. Ini memungkinkan pengembang untuk menambahkan fungsionalitas baru ke `interface` yang sudah ada tanpa merusak semua kelas yang mengimplementasikannya. Ini sedikit mengaburkan batas antara `interface` dan `abstract class`, tetapi memberikan fleksibilitas luar biasa untuk evolusi API.