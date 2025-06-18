---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2010 Pemrograman Berorientasi Objek]]
> [!cornell] Topic
> > ## Questions/Cues 
> > - Apa itu Stream API?
> > - Perbandingan: Loop vs. Stream
> > - Proses Utama Stream
> > - Operasi `filter()`
> > - Operasi `map()`
> > - Operasi `reduce()`
> > - Operasi `forEach()`
> 
> > ### Apa itu Java Stream API?
> > - Diperkenalkan pada Java 8, Stream API adalah cara baru untuk memproses koleksi data dengan gaya pemrograman **fungsional** dan **deklaratif**.
> > - **Ide Utama:** Stream memandang koleksi bukan sebagai wadah data statis, tetapi sebagai aliran (_stream_) data yang mengalir dan siap diproses melalui serangkaian operasi.
> > - **Karakteristik:**
> > 	- **Deklaratif:** Anda menyatakan _apa_ yang ingin Anda lakukan, bukan _bagaimana_ melakukannya (seperti pada `for` loop).
> > 	- **Fluent:** Operasi dapat dirangkai (di-_chain_) menjadi sebuah _pipeline_ yang elegan dan mudah dibaca.
> > 	- **Tidak Mengubah Sumber:** Operasi stream tidak mengubah koleksi aslinya, melainkan menghasilkan stream baru atau hasil akhir.
> > 	- **Bisa Paralel:** Dapat dengan mudah dieksekusi secara paralel untuk meningkatkan performa.
> > - **Perbandingan: Gaya Imperatif (Loop) vs. Gaya Deklaratif (Stream):**
> >     
> >     - **Tugas:** Dari sebuah list string, saring yang berawalan "c", ubah menjadi huruf besar, urutkan, lalu cetak.
> >     - **Dengan Loop (Imperatif):** Kita mengontrol setiap langkah secara manual: iterasi, pengecekan kondisi, penambahan ke list baru, pengurutan, dan pencetakan.
> >         
> >         ```java
> >         List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");
> >         List<String> target = new ArrayList<>();
> >         for (String s: myList) {
> >             if (s.startsWith("c")) {
> >                 target.add(s.toUpperCase());
> >             }
> >         }
> >         Collections.sort(target);
> >         for (String s: target) {
> >             System.out.println(s);
> >         }
> >         ```
> >         
> >     - **Dengan Stream API (Deklaratif):** Kita merangkai operasi menjadi sebuah _pipeline_ yang menjelaskan alur transformasi data.
> >         
> >         ```java
> >         List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");
> >         myList
> >             .stream()                      // 1. Buat stream dari list
> >             .filter(s -> s.startsWith("c")) // 2. Saring elemen
> >             .map(String::toUpperCase)      // 3. Transformasi setiap elemen
> >             .sorted()                      // 4. Urutkan elemen yang tersisa
> >             .forEach(System.out::println); // 5. Lakukan aksi pada setiap elemen
> >         ```
> >         
> > - **Proses Utama dalam Pipeline Stream:**
> >     1. **Sumber (Source):** Sebuah koleksi, array, atau channel I/O yang menghasilkan data. Contoh: `myList.stream()`.
> >     2. **Operasi Perantara (Intermediate Operations):** Operasi yang mengubah stream menjadi stream lain. Operasi ini bersifat _lazy_, artinya tidak akan dieksekusi sampai ada operasi terminal. Contoh: `filter()`, `map()`, `sorted()`.
> >     3. **Operasi Terminal (Terminal Operation):** Operasi yang memulai pemrosesan stream dan menghasilkan sebuah hasil akhir atau _side-effect_. Setelah operasi terminal dipanggil, stream tidak bisa digunakan lagi. Contoh: `forEach()`, `reduce()`, `collect()`.
> > - **Operasi `filter(Predicate<T> predicate)`:**
> >     
> >     - **Tujuan:** Menyaring elemen dari stream. Hanya elemen yang memenuhi kondisi (_predicate_) yang akan diloloskan ke stream berikutnya.
> >     - **Input:** Sebuah _stream_.
> >     - **Output:** Sebuah _stream_ baru dengan tipe yang sama, yang mungkin memiliki elemen lebih sedikit.
> >     - **Contoh:** `s -> s.startsWith("c")` adalah _lambda expression_ yang mengembalikan `true` jika string `s` berawalan "c".
> > - **Operasi `map(Function<T, R> mapper)`:**
> >     
> >     - **Tujuan:** Mentransformasi setiap elemen dalam stream dari satu tipe ke tipe lain (atau tipe yang sama).
> >     - **Input:** Sebuah _stream_.
> >     - **Output:** Sebuah _stream_ baru (bisa dengan tipe elemen yang berbeda) dengan jumlah elemen yang sama persis dengan stream input.
> >     - **Contoh:** `String::toUpperCase` adalah _method reference_ yang setara dengan lambda `s -> s.toUpperCase()`. Ini mengubah setiap elemen string menjadi versi huruf besarnya.
> > - **Operasi `reduce(T identity, BinaryOperator<T> accumulator)`:**
> >     
> >     - **Tujuan:** Menggabungkan semua elemen stream menjadi satu nilai tunggal.
> >     - **Parameter:**
> >         1. `identity`: Nilai awal (misalnya 0 untuk penjumlahan).
> >         2. `accumulator`: Fungsi yang mengambil dua argumen (subtotal sejauh ini dan elemen berikutnya) dan menghasilkan subtotal baru.
> >     - **Contoh:** Menjumlahkan semua angka dalam sebuah list.
> >          
> >         ```java
> >         List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
> >         int sum = numbers.stream()
> >                          .reduce(0, (subtotal, element) -> subtotal + element);
> >         // Cara kerja:
> >         // subtotal=0, element=1 -> 1
> >         // subtotal=1, element=2 -> 3
> >         // subtotal=3, element=3 -> 6
> >         // ... dan seterusnya hingga hasil akhir 21
> >         System.out.println(sum); // Output: 21
> >         ```
> >         
> > - **Operasi `forEach(Consumer<T> action)`:**
> >     
> >     - **Tujuan:** Melakukan sebuah aksi pada setiap elemen stream. Ini adalah operasi terminal yang tidak mengembalikan nilai (void).
> >     - **Penggunaan Umum:** Mencetak setiap elemen ke konsol atau menyimpannya ke database.
> >     - **Contoh:** Mencetak setiap nama dalam list.
> >         
> >         ```java
> >         List<String> names = Arrays.asList("Larry", "Steve", "James");
> >         names.forEach(System.out::println); // Method reference untuk s -> System.out.println(s)
> >         // Output:
> >         // Larry
> >         // Steve
> >         // James
> >         ```
> >         
> > 

> [!cornell] #### Summary
> Java Stream API menyediakan pendekatan fungsional dan deklaratif untuk memproses koleksi data dengan merangkai operasi dalam sebuah _pipeline_. Pipeline ini terdiri dari operasi perantara (_intermediate_) seperti `filter()` untuk menyaring dan `map()` untuk mentransformasi elemen, yang dieksekusi secara _lazy_ dan diakhiri dengan operasi terminal seperti `forEach()` untuk melakukan aksi atau `reduce()` untuk menggabungkan stream menjadi satu nilai tunggal, menghasilkan kode yang lebih ringkas dan ekspresif dibandingkan loop imperatif tradisional.