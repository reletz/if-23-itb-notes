---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Assertion?
> > - Dua Bentuk `assert`
> > - Mengaktifkan Assertion
> > - Perbandingan dengan C++
> > - Kapan Sebaiknya Menggunakan `assert`?
> > - Invariant Internal & Alur Kontrol
> > - Preconditions, Postconditions, Class Invariants
> > - Kapan TIDAK Boleh Menggunakan `assert`?
> > - Apa itu Exception?
> > - Blok `try-catch-finally`
> > - `try-with-resources`
> > - `throw` dan `throws`
> > - Chained Exceptions
> > - Hirarki `Throwable`
> > - Checked vs. Unchecked Exception
> > - Membuat Exception Sendiri
> 
> > ### Assertion
> > - Sebuah statement untuk menguji asumsi tentang program kita. Berisi ekspresi boolean yang diyakini _true_. Jika _false_, sistem akan melempar `AssertionError`.
> > - **Tujuan:** Mendeteksi bug lebih awal, meningkatkan keyakinan pada kode, dan berfungsi sebagai dokumentasi internal.
> > 
> > **Dua Bentuk Assertion Statement:**
> > 1. `assert Expression1;`
> > 	- Bentuk sederhana. Jika `Expression1` bernilai `false`, `AssertionError` dilempar tanpa pesan detail.
> > 	- Contoh: `assert (speed < 300000);`
> > 2. `assert Expression1 : Expression2;`
> > 	- `Expression2` adalah sebuah nilai yang akan disertakan dalam pesan error untuk memberikan informasi lebih detail.
> > 	- Contoh: `assert (speed < 300000) : "kecepatan melebihi kecepatan cahaya";`
> > 
> > **Mengaktifkan Assertion:**
> > - Secara default, JVM tidak memeriksa `assert`. Untuk mengaktifkannya, program harus dijalankan dengan flag `-ea` (enable assertions).
> > - Contoh: `java -ea NamaKelas`
> > 
> > **Perbandingan dengan `assert` di C++:**
> > - Di C++, `assert` adalah sebuah _macro_ dari `<cassert>`.
> > - Jika ekspresi `false`, pesan error ditulis ke _standard error_ dan program dihentikan (`abort()` dipanggil).
> > - Dapat dinonaktifkan dengan mendefinisikan macro `NDEBUG` sebelum `#include <assert.h>`.
> > - Dirancang untuk menangkap kesalahan pemrograman, bukan kesalahan pengguna atau runtime.
> > 
> > **Kapan Sebaiknya Menggunakan `assert`?** 
> > - **Internal Invariants:** Untuk memastikan asumsi internal tentang state program selalu benar.
> > 	Contoh: Pada sebuah `else` clause yang seharusnya secara logika pasti benar
> > 
> > 	```java
> > 	if (i % 3 == 0) { ... } 
> > 	else if (i % 3 == 1) { ... } 
> > 	else { 
> > 			assert i % 3 == 2; 
> > 			... 
> > 	}
> > 	```
> >      
> > - **Control-Flow Invariants:** Untuk memastikan alur program berjalan sesuai asumsi.
> > 	 Contoh: Pada `default` case dari `switch` yang seharusnya tidak pernah tercapai.
> >  
> > 	```java
> > 	switch(suit) {
> > 			// ... case lain
> > 			default: 
> > 					assert false; // Seharusnya tidak pernah sampai sini
> > 	}
> > 	```
> >             
> >  - **Preconditions, Postconditions, dan Class Invariants:**
> > 	- **Preconditions (Method Non-Publik):** Untuk memvalidasi kondisi pada method `private` atau `protected`, di mana kita sebagai penulis kelas mengontrol semua pemanggilnya.
> > 	- **Postconditions:** Untuk memverifikasi hasil dari sebuah komputasi sebelum dikembalikan.
> > 	- **Class Invariants:** Untuk memastikan properti sebuah objek selalu konsisten (misal: nilai menit pada jam selalu antara 0-59).
> >  
> > **Kapan TIDAK Boleh Menggunakan `assert`?**
> > - **Pengecekan Argumen Method Publik:** Gunakan `if-then-throw` untuk melempar exception yang sesuai (misal: `IllegalArgumentException`). Ini adalah bagian dari kontrak API dan harus selalu aktif.
> > - **Melakukan Aksi Program:** Ekspresi dalam `assert` tidak boleh memiliki _side effects_ atau melakukan pekerjaan yang penting bagi program, karena `assert` bisa dinonaktifkan.
> > 	- **Salah:** `assert names.remove(null);`
> > 	- **Benar:**
> > 	
> > 		```java
> > 		boolean nullsRemoved = names.remove(null);
> > 		assert nullsRemoved;
> > 		```
> >             
> > ### Exception
> > Sebuah event yang mengganggu alur normal program. Saat error terjadi, method membuat _exception object_ dan melemparkannya (_throw_) ke _runtime system_. Objek ini adalah turunan dari kelas `Throwable` dan berisi informasi tentang error tersebut.
> > - **Blok `try-catch-finally`:**
> >     
> >     - **`try`:** Membungkus kode yang berpotensi melempar exception.
> >     - **`catch`:** Menangkap dan menangani exception dengan tipe tertentu. Sebuah blok `try` bisa diikuti oleh beberapa blok `catch` untuk menangani berbagai tipe exception.
> >     - **`finally`:** Blok kode yang **pasti akan dieksekusi**, baik terjadi exception maupun tidak. Berguna untuk membersihkan resource (seperti menutup file atau koneksi).
> > - **`try-with-resources` (Java 7+):**
> >     
> >     - Menyederhanakan blok `try-catch-finally` untuk resource yang harus ditutup. Resource (yang mengimplementasikan `AutoCloseable`) dideklarasikan dalam `try(...)` dan akan ditutup secara otomatis.
> >         
> > 	```java
> > 	try (PrintWriter out = new PrintWriter(new FileWriter("out.txt"))) {
> > 			// ... gunakan 'out'
> > 	} // 'out' akan otomatis di-close() di sini
> > 	```
> >         
> > - **`throw` dan `throws`:**
> >     
> >     - **`throw`:** Statement untuk melempar sebuah _exception object_.
> >     - **`throws`:** Keyword dalam signature method yang mendeklarasikan bahwa method tersebut mungkin melempar _checked exception_ tertentu.
> > - **Chained Exceptions:**
> >     
> >     - Mekanisme untuk menangkap sebuah exception, lalu melempar exception baru sambil menyertakan exception asli sebagai penyebabnya. Berguna untuk menambahkan konteks atau menerjemahkan exception tingkat rendah menjadi exception yang lebih relevan.
> > - **Hirarki `Throwable`:**
> >     ![[Pasted image 20250610225025.png]]
> >     - **`Error`:** Masalah serius yang umumnya tidak ditangani oleh aplikasi (misal: `OutOfMemoryError`). Bersifat _unchecked_.
> >     - **`Exception`:** Kondisi yang mungkin ingin ditangani aplikasi.
> >         - **`RuntimeException`:** Turunan `Exception` yang bersifat _unchecked_ (misal: `NullPointerException`, `IndexOutOfBoundsException`). Biasanya disebabkan oleh bug pemrograman.
> >         - **Exception Lain (Checked):** Turunan `Exception` selain `RuntimeException`. _Compiler_ memaksa kita untuk menanganinya (dengan `try-catch`) atau mendeklarasikannya (dengan `throws`). Contoh: `IOException`, `SQLException`.
> > - **Membuat Exception Sendiri:**
> >     
> >     -  Bisa membuat kelas exception kustom dengan mewarisi dari `Exception` (untuk _checked_) atau `RuntimeException` (untuk _unchecked_).
> >     - **Alasan:** Menyediakan informasi error yang lebih spesifik, memudahkan pengguna library kita, dan mengelompokkan error yang berhubungan.
> > 

> [!cornell] #### Summary
> Assertion dan Exception adalah dua mekanisme fundamental untuk menciptakan program yang robust. `Assertion` (`assert`) berfungsi sebagai alat bantu development untuk memvalidasi asumsi internal programmer yang dapat dinonaktifkan di lingkungan produksi. Sebaliknya, `Exception` (dengan blok `try-catch-finally` dan `try-with-resources`) adalah mekanisme runtime yang integral untuk menangani kondisi error yang bisa terjadi, memisahkan logika penanganan error dari alur utama program, dan dikategorikan sebagai _checked_ (wajib ditangani) atau _unchecked_ (biasanya bug pemrograman).

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Kontrol Granular Assertion:** Selain `-ea` (enable all) dan `-da` (disable all), kita bisa mengontrol assertion pada level paket atau kelas. Misalnya, `java -ea:com.myapp.util... -da:com.myapp.gui.LegacyWidget MyProgram` akan mengaktifkan assertion untuk paket `util` dan semua sub-paketnya, tetapi menonaktifkannya untuk kelas `LegacyWidget`. Tanda `...` menunjukkan rekursif ke sub-paket.
> 	- **`NoClassDefFoundError` vs. `ClassNotFoundException`:** Ini adalah jebakan wawancara yang umum.
> 	- **`ClassNotFoundException` (Checked Exception):** Terjadi saat kita mencoba me-load sebuah kelas secara dinamis saat runtime (misalnya menggunakan `Class.forName()`) dan kelas tersebut tidak ditemukan di classpath. Ini adalah kondisi yang bisa diantisipasi dan ditangani.
> 	- **`NoClassDefFoundError` (Error):** Terjadi ketika sebuah kelas yang _ada saat kompilasi_ tidak dapat ditemukan oleh JVM saat runtime. Ini biasanya terjadi karena masalah konfigurasi classpath atau file `.jar` yang hilang. Ini adalah `Error`, yang mengindikasikan masalah serius pada setup aplikasi yang umumnya tidak bisa ditangani.
> - **Biaya Performa `try-catch`:** Memasuki blok `try` memiliki biaya performa yang sangat minimal atau bahkan nol pada JVM modern. Biaya yang signifikan baru muncul ketika sebuah _exception object_ **dibuat dan dilempar**. Proses ini melibatkan pembuatan _stack trace_, yang merupakan operasi yang relatif mahal karena harus merekam seluruh jejak pemanggilan method.
> - **Debat Checked vs. Unchecked Exception:** Ini adalah salah satu debat filosofis terbesar dalam desain API Java.
> 	- **Pro-Checked:** Memaksa pemanggil API untuk menangani error, membuat kode lebih robust karena error tidak bisa diabaikan secara tidak sengaja.
> 	- **Pro-Unchecked (Fail-Fast):** Banyak framework modern (seperti Spring) lebih menyukai unchecked exception. Argumennya adalah bahwa kebanyakan checked exception adalah _unrecoverable_ dalam praktiknya dan hanya menambah _boilerplate code_ (`try-catch` yang kosong atau hanya melempar ulang). Dengan unchecked exception, kode lebih bersih dan error akan menyebabkan kegagalan cepat (_fail-fast_), yang lebih mudah untuk di-debug.
> #### Sumber & Referensi Lanjutan:
> - **Buku:** "Effective Java, 3rd Edition" oleh Joshua Bloch. Bab 10 (Items 69-77) memberikan panduan mendalam dan pragmatis tentang penggunaan exception secara efektif. Ini adalah bacaan esensial.
> - **Dokumentasi Oracle:**
> 	- [The Java™ Tutorials - Lesson: Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html)
> 	- [Oracle Docs - Programming With Assertions](https://docs.oracle.com/javase/8/docs/technotes/guides/language/assert.html)
> - **Artikel:** Cari artikel tentang "Java Checked vs Unchecked Exceptions best practices" untuk melihat berbagai perspektif dari para praktisi ahli mengenai kapan harus menggunakan masing-masing.
>#### Eksplorasi Mandiri:
>- **Membuat Exception Hirarki:** Buat sebuah aplikasi kecil (misal, parser untuk file konfigurasi sederhana). Rancang hirarki exception kustom kita sendiri. Misalnya, sebuah `ConfigurationException` sebagai kelas dasar, dengan turunan seperti `InvalidKeyFormatException` dan `MissingRequiredKeyException`. Ini melatih kita untuk berpikir tentang bagaimana mengelompokkan dan mengkategorikan error.
>- **Refactoring Error Codes:** Cari contoh kode (atau tulis sendiri) yang menangani error dengan mengembalikan nilai khusus (seperti `null` atau kode integer `-1`). Lakukan refactoring pada kode tersebut untuk menggunakan mekanisme exception handling yang tepat. Amati bagaimana kode menjadi lebih bersih dan lebih ekspresif.
>- **Menganalisis Stack Trace:** Sengaja buat program yang melempar chained exception (exception yang dibungkus di dalam exception lain). Jalankan program, lihat output `e.printStackTrace()`, dan latih diri kita untuk membaca dan memahami stack trace, terutama bagian `Caused by: ...`. Ini adalah skill debugging yang sangat krusial.