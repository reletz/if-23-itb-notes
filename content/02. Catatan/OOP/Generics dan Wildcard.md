---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues
> > 
> > - Mengapa perlu Generics?
> > - Apa itu Kelas Generik?
> > - Konvensi Penamaan Tipe
> > - Metode & Konstruktor Generik
> > - Apa itu Type Inference?
> > - Bounded Type Parameters (`extends`)
> > - Perbandingan dengan C++
> > - Subtyping dan Generik
> > - Apa itu Wildcard (`?`)?
> > - Unbounded Wildcard (`<?>`)
> > - Upper-Bounded Wildcard (`? extends`)
> > - Lower-Bounded Wildcard (`? super`)
> > - Prinsip Penggunaan Wildcard
> > - Perbedaan Generik vs Wildcard
> 
> > ### Pengantar Bug dan Generik
> > - Tujuan utama Generics adalah meningkatkan stabilitas dan keandalan kode dengan memindahkan deteksi error dari _run-time_ (saat program berjalan) ke _compile-time_ (saat kode ditulis).
> > - **Contoh Masalah (Tanpa Generik):** Sebuah kelas `SimpleBox` yang menggunakan `Object` untuk menyimpan data bisa menerima tipe data apa pun.
> > 	```java
> > 	public class SimpleBox {
> > 			private Object object;
> > 			public void put(Object object) { this.object = object; }
> > 			public Object get() { return object; }
> > 	}
> > 	```
> > - Jika kita berniat menyimpan `Integer`, tetapi secara tidak sengaja memasukkan `String`, program akan lolos kompilasi. Namun, saat kita mencoba mengambil data dan melakukan _casting_ ke `Integer`, akan terjadi `java.lang.ClassCastException` saat program berjalan. Ini adalah _run-time bug_ yang berbahaya.
> > 	```java
> > 	SimpleBox intBox = new SimpleBox();
> > 	intBox.put("10"); // Tidak ada error saat kompilasi
> > 	int someInt = (int) intBox.get(); // Error terjadi di sini saat runtime!
> > 	```
> >         
> > ### Kelas Generik pada Java
> > - Kelas generik memungkinkan kita untuk mendefinisikan sebuah kelas dengan "parameter tipe" yang akan diganti dengan tipe data asli saat objek dibuat.
> > - **Sintaks:** Menggunakan kurung sudut `<T>` setelah nama kelas. `T` adalah parameter tipe.
> >         
> > 	```java
> > 	public class Box<T> {
> > 			private T t; // 't' adalah variabel dengan tipe T
> > 			public void put(T t) { this.t = t; }
> > 			public T get() { return t; }
> > 	}
> > 	```
> >         
> >  - **Keuntungan:** Error tipe data kini terdeteksi saat kompilasi. Kita tidak perlu lagi melakukan _casting_ manual.
> >         
> > 	```java
> > 	Box<Integer> intBox = new Box<>(); // Tipe ditentukan sebagai Integer
> > 	intBox.put("10"); // COMPILE ERROR! Mencegah bug sejak awal.
> > 	int someInt = intBox.get(); // Tidak perlu casting.
> > 	```
> >         
> >  - **Type Erasure:** Saat kompilasi, Java menghapus informasi generik dan menggantinya dengan _bound_-nya (atau `Object` jika tidak ada _bound_), serta menambahkan _casting_ yang diperlukan secara otomatis. Ini memastikan kompatibilitas dengan versi Java yang lebih lama.
> > - **Konvensi Penamaan Tipe Generik:** Gunakan satu huruf kapital untuk menjaga keterbacaan.
> >     - **E:** Element (digunakan di Java Collections Framework)
> >     - **K:** Key
> >     - **V:** Value
> >     - **N:** Number
> >     - **T:** Type
> >     - **S, U, V:** Tipe kedua, ketiga, dst.
> > - **Generic Methods & Constructors:**
> >     - Metode atau konstruktor juga bisa memiliki parameter tipenya sendiri, yang terpisah dari parameter tipe kelas.
> >     - **Contoh:** Metode `inspect` menerima parameter `u` dengan tipe `U`, yang bisa berbeda dari tipe `T` milik kelas `Box`.
> >         
> > 		```java
> > 		public <U> void inspect(U u) {
> > 				System.out.println("T: " + t.getClass().getName()); // T dari kelas
> > 				System.out.println("U: " + u.getClass().getName()); // U dari metode
> > 		}
> > 		```
> >         
> > - **Type Inference:**
> >     - Kemampuan _compiler_ Java untuk menebak tipe generik yang digunakan dalam pemanggilan metode berdasarkan tipe argumen yang diberikan. Ini mengurangi verbositas kode.
> >     - **Contoh:** Kita tidak perlu menulis `Box.<Crayon>fillBoxes(...)`, cukup `Box.fillBoxes(...)` dan _compiler_ akan menyimpulkan bahwa `U` adalah `Crayon`.
> > - **Bounded Type Parameters:**
> >     - Membatasi tipe apa saja yang boleh digunakan sebagai argumen untuk parameter tipe generik. Menggunakan kata kunci `extends`.
> >     - **Sintaks:** `<U extends Number>` berarti `U` harus merupakan kelas `Number` atau salah satu turunannya (misal: `Integer`, `Double`).
> >     - **Tujuan:** Memungkinkan kita untuk memanggil metode dari kelas _bound_. Contohnya, kita bisa memanggil `doubleValue()` pada objek bertipe `U` karena kita tahu `U` pasti turunan `Number`.
> >         
> >         ```java
> >         // Operator '<' tidak bisa untuk objek, maka kita gunakan metode dari Number'
> >         public static <T extends Number> T max_elmt(T[] arr) {
> >             T max_result = arr[0];
> >             for (int i = 1; i < arr.length; i++) {
> >                 if (max_result.doubleValue() < arr[i].doubleValue()) {
> >                     max_result = arr[i];
> >                 }
> >             }
> >             return max_result;
> >         }
> >         ```
> >         
> >     - Batasan bisa juga menggunakan `&` untuk beberapa _interface_, contoh: `<U extends Number & Serializable>`.
> > - **Subtyping dan Generik:**
> >     
> >     - Ini adalah konsep kunci yang sering disalahpahami. Jika `Integer` adalah _subtype_ dari `Number`, **TIDAK BERARTI** `Box<Integer>` adalah _subtype_ dari `Box<Number>`. Keduanya adalah tipe yang sama sekali berbeda dan tidak berhubungan dalam hierarki pewarisan.
> >     - `Number num = new Integer(10);` // OK
> >     - `Box<Number> boxNum = new Box<Integer>();` // COMPILE ERROR!
> > ### Wildcard (`?`)
> > Digunakan untuk merepresentasikan tipe yang "tidak diketahui". Ini memberikan fleksibilitas saat bekerja dengan generik, terutama sebagai parameter metode. `List<?>` (dibaca: "List of unknown") adalah supertype dari semua jenis `List` (misal: `List<String>`, `List<Integer>`, dll). Ini berbeda dari `List<Object>`.
> > - **Unbounded Wildcard (`<?>`):**
> >     
> >     - **Guna:** Ketika tipe data tidak penting dan metode hanya menggunakan fungsionalitas dari kelas `Object`.
> >     - **Aturan:** Anda bisa membaca elemen dari koleksi ini, dan hasilnya akan selalu dianggap sebagai `Object`. Anda **tidak bisa** menambahkan elemen apa pun (kecuali `null`) ke dalamnya, karena _compiler_ tidak tahu tipe apa yang aman untuk ditambahkan.
> >         
> >         ```java
> >         void printList(List<?> list) {
> >             for (Object elem : list) { // Membaca sebagai Object, OK
> >                 System.out.print(elem + " ");
> >             }
> >             // list.add("new elem"); // COMPILE ERROR!
> >         }
> >         ```
> >         
> > - **Upper Bounded Wildcard (`<? extends Tipe>`):**
> >     
> >     - **Arti:** "Sesuatu yang merupakan turunan dari `Tipe`". Contoh: `List<? extends Animal>`.
> >     - **Prinsip (Producer Extends):** Digunakan ketika Anda hanya perlu **membaca/mengambil** data dari struktur data (struktur data bertindak sebagai _producer_).
> >     - **Aturan:** Anda bisa mengambil elemen dan _compiler_ tahu itu setidaknya adalah tipe `Animal`. Anda tetap **tidak bisa** menambahkan elemen, karena _compiler_ tidak tahu pasti apakah harus menambahkan `Lion` atau `Butterfly` ke `List<? extends Animal>`.
> >         
> >         ```java
> >         void feedAnimals(List<? extends Animal> animals) {
> >             for (Animal a : animals) { // Mengambil/membaca sebagai Animal, OK
> >                 a.feedMe();
> >             }
> >             // animals.add(new Lion()); // COMPILE ERROR!
> >         }
> >         ```
> >         
> > - **Lower Bounded Wildcard (`<? super Tipe>`):**
> >     
> >     - **Arti:** "Sesuatu yang merupakan leluhur (_supertype_) dari `Tipe`". Contoh: `List<? super Integer>`. Ini bisa berupa `List<Integer>`, `List<Number>`, atau `List<Object>`.
> >     - **Prinsip (Consumer Super):** Digunakan ketika Anda hanya perlu **menambahkan** data ke struktur data (struktur data bertindak sebagai _consumer_).
> >     - **Aturan:** Anda bisa menambahkan objek bertipe `Integer` atau turunannya (karena mereka pasti cocok dengan `Integer`, `Number`, atau `Object`). Namun, saat Anda **membaca** elemen, Anda tidak bisa menjamin apa pun selain bahwa itu adalah `Object`.
> >         
> >         ```java
> >         void addNumbers(List<? super Integer> list) {
> >             list.add(new Integer(50)); // Menambahkan, OK
> >             // Integer i = list.get(0); // COMPILE ERROR!
> >             Object o = list.get(0); // Hanya bisa aman dibaca sebagai Object
> >         }
> >         ```
> >         
> > - **Kapan Menggunakan Wildcard (Prinsip PECS):**
> >     
> >     - **PECS:** **P**roducer **E**xtends, **C**onsumer **S**uper.
> >     - Jika variabel generik hanya **dibaca** (producer), gunakan `<? extends T>`.
> >     - Jika variabel generik hanya **ditulis/dimodifikasi** (consumer), gunakan `<? super T>`.
> >     - Jika variabel **dibaca dan ditulis**, jangan gunakan wildcard. Gunakan tipe generik yang pasti (misal: `<T>`).
> > - **Perbedaan Kunci: Generic Type (`<T>`) vs. Wildcard (`<?>`):**
> >     
> >     - **Batasan:** `<T>` bisa punya banyak batasan (`<T extends Number & Runnable>`), `?` hanya satu.
> >     - **Bound:** `<T>` hanya punya _upper bound_ (`extends`). `?` punya _upper_ (`extends`) dan _lower bound_ (`super`).
> >     - **Referensi Tipe:** Tipe `T` bisa dirujuk kembali di dalam metode (misal: `T newItem = ...`). Tipe `?` bersifat anonim dan tidak bisa dirujuk.
> >     - **Hubungan Tipe:** `<T>` bisa memaksa hubungan tipe antara beberapa parameter. Contoh: `copy(List<T> dest, List<T> src)` memastikan `dest` dan `src` punya tipe yang sama. Dengan wildcard, `copy(List<?> dest, List<?> src)` tidak bisa menjamin itu.
> > 

> [!cornell] #### Summary
> Generics di Java menyediakan keamanan tipe (type safety) pada saat kompilasi dengan mendefinisikan kelas, interface, dan metode menggunakan parameter tipe (`<T>`), yang secara fundamental mencegah `ClassCastException` saat runtime. Fleksibilitasnya ditingkatkan melalui _bounded types_ (`<T extends Number>`) untuk membatasi tipe dan _wildcards_ untuk menangani hierarki tipe dalam koleksi: `<? extends T>` (Producer/Read-Only) digunakan untuk mengambil data dari struktur, sementara `<? super T>` (Consumer/Write-Only) digunakan untuk menambahkan data ke dalamnya, mengikuti prinsip PECS.

> [!ad-libitum]- Additional Information (Optional)
> #### Include material that's interesting but not essential:
> - Historical context
> - Related concepts
> - Further reading
> - Practical applications