---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[OOP]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Sejarah & Tujuan Java
> > - Karakteristik & Lingkungan JVM
> > - "Hello World!" & Proses Kompilasi
> > - Tipe Primitif (Pass-by-Value)
> > - Tipe Referensi (Pass-by-Reference-Value)
> > - Wrapper Class & Auto-boxing
> > - Enkapsulasi & 4 Access Modifiers
> > - Atribut & Method `static`
> > - Penggunaan `this` untuk Ambiguitas
> > - Parameter Passing: Tipe Primitif
> > - Parameter Passing: Tipe Referensi
> >
>
> > ### Pengenalan Bahasa Java
> > **Nama & Sejarah**
> > Dinamai dari "Kopi Jawa". Dikembangkan oleh James Gosling di Sun Microsystems pada awal 1990-an dengan nama awal "Oak". Tujuannya untuk menciptakan bahasa yang sederhana, berorientasi objek, portabel, dan aman untuk perangkat elektronik.
> > 
> > **Karakteristik & Lingkungan (JVM)**
> > Kunci portabilitas Java adalah kompilasi menjadi **bytecode**. Kode ini dijalankan oleh **Java Virtual Machine (JVM)**, bukan oleh CPU secara langsung. Ini memungkinkan program Java berjalan di sistem apa pun yang memiliki JVM, sesuai semboyan **"Write Once, Run Anywhere"**. Fitur lainnya adalah manajemen memori otomatis melalui **Garbage Collection**.
> > 
> > ### Program Pertama: "Hello World!"
> > **Struktur Kode**
> > Semua kode di Java berada di dalam kelas. Nama file (`.java`) harus sama dengan nama kelas `public` di dalamnya.
> > ```java title:HelloWorld.java
> > class HelloWorld {
> > 	public static void main(String args[]) {
> > 		// Entry point program
> > 		System.out.println("Hello world!");
> > 	}
> > }
> >```
> > **Method `main`**
> > Merupakan titik masuk program.
> > - `public`: Agar dapat diakses dari luar kelas oleh JVM.
> > - `static`: Agar dapat dijalankan tanpa perlu membuat objek dari kelas `HelloWorld`.
> > - `void`: Method ini tidak mengembalikan nilai.
> > - `String args[]`: Menerima argumen dari command line sebagai array of String.
> > 
> > **Proses Kompilasi dan Eksekusi**
> > 1. **Kompilasi:** Perintah `javac HelloWorld.java` akan mengompilasi kode sumber menjadi bytecode dan menghasilkan file `HelloWorld.class`.
> > 2. **Menjalankan:** Perintah `java HelloWorld` (tanpa ekstensi `.class`) akan meminta JVM untuk memuat dan menjalankan bytecode dari file tersebut.
> > 
> > ### Tipe Data Bahasa Java
> > **Tipe Primitif**
> > Tipe data dasar bawaan (`int`, `long`, `char`, `boolean`, `float`, `double`). Variabel primitif menyimpan **nilai aktual** data tersebut. Operasi assignment (`=`) akan **menyalin nilainya**.
> > 
> > ``` java
> > int i = 10;
> > int j = i; // 'j' mendapatkan salinan nilai dari 'i'
> > j = 20;    // Mengubah 'j' tidak akan mengubah 'i'
> > // Di sini, i masih bernilai 10, dan j bernilai 20.
> > ```
> > **Tipe Referensi**
> > Semua **objek** adalah tipe referensi. Variabel referensi **tidak menyimpan objeknya**, melainkan menyimpan **alamat memori** tempat objek berada. Operasi assignment (`=`) hanya **menyalin alamat referensi**.
> > ``` java
> > Point p1 = new Point(5, 5);
> > Point p2 = p1; // 'p2' mendapatkan salinan alamat dari 'p1'.
> > // Keduanya kini menunjuk ke objek yang SAMA.
> > p2.setX(100);  // Mengubah state objek melalui 'p2'...
> > // ...akan terlihat juga melalui 'p1', karena objeknya sama.
> > // System.out.println(p1.getX()); akan mencetak 100.
> > ```
> > Setiap tipe primitif memiliki "kelas pembungkus" (`int` -> `Integer`). Fitur **auto-boxing** memungkinkan konversi otomatis dari primitif ke objek wrapper-nya, dan **auto-unboxing** sebaliknya. Ini menyederhanakan kode.
> > - _Sebelum Java 5:_ `Integer i = new Integer(10);` (eksplisit)
> > - _Sejak Java 5:_ `Integer i = 10;` (otomatis di-boxing)
> > 
> > ### Pemrograman Berorientasi Objek di Java
> > **Enkapsulasi (Access Modifiers)**
> > Mekanisme untuk mengatur visibilitas atribut dan method.
> > 1. `private`: Hanya bisa diakses dari dalam kelas itu sendiri. Paling restriktif.
> > 2. `default` (tanpa keyword): Bisa diakses oleh kelas lain dalam _package_ yang sama.
> > 3. `protected`: Bisa diakses oleh kelas dalam _package_ yang sama dan oleh _subclass_ (kelas turunan) di mana pun.
> > 4. `public`: Bisa diakses dari mana saja. Paling tidak restriktif.
> > 
> > **Keyword `static` (Milik Kelas)**
> > Menandakan bahwa atribut atau method adalah milik **kelas**, bukan milik setiap objek individu. Hanya ada **satu salinan** atribut `static` yang dibagikan oleh semua objek.
> > ```java title:Mahasiswa.java
> > class Mahasiswa {
> > 	private static int jumlah = 0; // Dibagikan oleh semua objek Mahasiswa
> > 	public Mahasiswa() {
> > 		jumlah++; // Setiap objek baru dibuat, counter bertambah
> > 	}
> > 	
> > 	public static int getJumlah() { // Method static diakses via kelas
> > 		return jumlah;
> > 	}
> > }
> > // Penggunaan:
> > // System.out.println(Mahasiswa.getJumlah()); // Diakses via nama kelas
> >```
> >
> >**Keyword `this` (Referensi ke Diri Sendiri)**
> >`this` adalah referensi yang menunjuk ke **instance objek saat ini**. Sangat penting untuk mengatasi **ambiguitas** nama antara parameter method dan atribut kelas. 
> > ```java title:Point.java
> > class Point {
> > 	private int x;
> > 	// Salah: parameter 'x' menutupi atribut 'x'. Ini tidak mengubah atribut.
> > 	public void setX_salah(int x) {
> > 		x = x; // Assignment ke diri sendiri (parameter = parameter)
> > 	}
> > 	// Benar: 'this.x' merujuk ke atribut kelas, 'x' ke parameter.
> > 	public void setX_benar(int x) {
> > 		this.x = x;
> > 	}
> > }
> > ```
> > 
> > **Mekanisme Passing Parameter (Selalu Pass-by-Value)**
> > - **Untuk Tipe Primitif:** Nilai dari variabel **disalin** ke parameter method. Method bekerja pada salinan tersebut
> > - **Untuk Tipe Objek (Referensi):** **Alamat referensi** dari variabel disalin ke parameter method. Karena alamatnya sama, keduanya menunjuk ke objek yang sama di memori.
> > ```java
> > public void swap(int a, int b) {
> > 	int temp = a; a = b; b = temp;
> > 	// 'a' dan 'b' di sini adalah salinan. Perubahan hanya lokal.
> > }
> > // int x = 5, y = 10;
> > // swap(x, y); -> x dan y di luar method tetap tidak berubah.
> > 
> > public void ubahPoint(Point p) {
> > 	// 'p' menerima salinan alamat 
> > 	p.setX(99); 
> > 	// Mengubah objek asli karena alamatnya sama
> > } 
> > // Point P1 = new Point(1,1); 
> > // ubahPoint(P1); -> P1.getX() sekarang menjadi 99.
> >  
> > public void gantiPoint(Point p) {
> > 	// 'p' di-assign ke objek BARU. 
> > 	p = new Point(0,0); // Ini hanya mengubah referensi lokal 'p', 
> > 	// tidak mengubah variabel asli di luar. 
> > } 
> >// Point P1 = new Point(1,1); 
> >// gantiPoint(P1); -> P1 tetap menunjuk ke objek Point(1,1).
> > ```

> [!cornell] #### Summary
> Catatan ini mengukuhkan fondasi Java, mulai dari proses kompilasi `javac` dan eksekusi `java`, hingga ilustrasi kode konkret mengenai perbedaan fundamental antara tipe primitif yang menyalin nilai dan tipe referensi yang menyalin alamat. Konsep OOP dihidupkan melalui contoh penggunaan access modifiers untuk enkapsulasi, keyword `static` untuk data bersama tingkat kelas, dan `this` untuk mengatasi ambiguitas. Terakhir, mekanisme passing parameter dijelaskan secara rinci, menunjukkan mengapa method bisa mengubah isi objek (via referensi) tetapi tidak bisa mengubah variabel primitif atau referensi objek itu sendiri di pemanggilnya.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan
> **Struktur Memori JVM**
> Memori di dalam JVM secara umum dibagi menjadi beberapa area utama:
> - **Heap:** Tempat semua objek Java (`new Object()`) dialokasikan. Area ini dibersihkan oleh Garbage Collector.
> - **Stack:** Setiap _thread_ memiliki stack-nya sendiri. Stack menyimpan pemanggilan method (_stack frame_) dan variabel lokal (termasuk variabel primitif dan referensi ke objek di Heap). Memori di stack bersifat LIFO (Last-In, First-Out) dan dibebaskan secara otomatis saat method selesai dieksekusi.
> - **Metaspace (dulu PermGen):** Menyimpan metadata tentang kelas-kelas yang dimuat, seperti struktur kelas, method, dan field.
> 
> **Mekanisme Garbage Collection (GC) Sederhana**
> **Mark-and-Sweep:** Algoritma paling dasar.
> 1. **Mark (Tandai):** GC memulai dari "akar" (seperti variabel lokal di stack, variabel statis) dan menjelajahi semua objek yang dapat dijangkau. Semua objek yang bisa dijangkau ditandai sebagai "hidup".
> 2. **Sweep (Sapu):** GC memindai seluruh Heap. Setiap objek yang tidak ditandai "hidup" dianggap sampah dan memorinya diklaim kembali.