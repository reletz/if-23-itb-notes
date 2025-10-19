---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu JavaScript?
> >     
> > - Bagaimana JS dieksekusi?
> >     
> > - Tipe data dasar di JS?
> >     
> > - Perbedaan `==` & `===`?
> >     
> > - Apa itu `var`, `let`, `const`?
> >     
> > - Konsep Objects & Prototypes?
> >     
> > - Bagaimana JS berinteraksi dengan HTML?
> >     
> > - Apa itu DOM?
> >     
> > - Apa itu Event Loop?
> >     
> > - Mengapa perlu Asynchronous?
> >     
> > - Apa itu Callback?
> >     
> > - Apa itu Promise?
> >     
> > - Apa itu `async/await`?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-04-JavaScript.pdf
> >     
> 
> > ### Definisi dan Lingkungan Eksekusi JavaScript
> > 
> > **JavaScript (JS)** adalah bahasa pemrograman _interpreter-based_ yang dinamis dan _loosely-typed_. Awalnya hanya berjalan di browser, kini JS bisa berjalan di server (Node.js) atau lingkungan lain. JS adalah bahasa di balik interaktivitas halaman web.
> > 
> > **Cara Kerja (di Browser):**
> > 
> > 1. Kode JavaScript ditulis dalam file `.js` atau langsung di tag `<script>` dalam HTML.
> >     
> > 2. Ketika browser memuat halaman, **JavaScript Engine** (seperti Google V8 di Chrome atau SpiderMonkey di Firefox) akan mem-parsing dan mengeksekusi kode tersebut.
> >     
> > 3. Engine ini mengubah kode JS menjadi _bytecode_ dan kemudian menjadi kode mesin yang dioptimalkan untuk dijalankan.
> >     
> > 
> > ### Sintaks Dasar, Tipe Data, dan Variabel
> > 
> > **Sintaks Dasar:**
> > 
> > - Mirip dengan C atau Java, _case-sensitive_.
> >     
> > - Titik koma (`;`) di akhir baris bersifat opsional.
> >     
> > - Komentar menggunakan `//` (satu baris) atau `/* */` (banyak baris).
> >     
> > 
> > **Tipe Data Primitif:**
> > 
> > - **Number:** Semua angka adalah _floating-point 64-bit_ (double). Termasuk nilai spesial seperti `Infinity` dan `NaN` (Not a Number).
> >     
> > - **String:** Teks yang diapit oleh `"` atau `'`. Bersifat _immutable_ (tidak bisa diubah).
> >     
> > - **Boolean:** `true` atau `false`. Nilai-nilai seperti `0`, `""`, `null`, `undefined`, `NaN` dianggap "falsy" (akan menjadi `false` saat dikonversi).
> >     
> > - **null:** Representasi nilai "kosong" atau "tidak ada".
> >     
> > - **undefined:** Variabel yang sudah dideklarasikan tapi belum diberi nilai.
> >     
> > 
> > **Variabel:**
> > 
> > - **`var`:** Deklarasi variabel dengan lingkup fungsi (_function scope_). Bisa dideklarasi ulang. (Kurang disarankan di kode modern).
> >     
> > - **`let`:** Deklarasi variabel dengan lingkup blok (_block scope_). Tidak bisa dideklarasi ulang di lingkup yang sama.
> >     
> > - **`const`:** Sama seperti `let` tapi nilainya tidak bisa diubah setelah diinisialisasi (konstan).
> >     
> >
> > ### Operator dan Kontrol Alur
> > 
> > **Operator Perbandingan Penting:**
> > 
> > - **`==` (Loose Equality):** Membandingkan nilai setelah melakukan konversi tipe data. Contoh: `"5" == 5` hasilnya `true`.
> >     
> > - **`===` (Strict Equality):** Membandingkan nilai DAN tipe data, tanpa konversi. Contoh: `"5" === 5` hasilnya `false`. **Praktik terbaik adalah selalu menggunakan `===` untuk menghindari bug tak terduga.**
> >     
> > 
> > **Kontrol Alur:**
> > 
> > - **Kondisional:** `if...else`, `switch`.
> >     
> > - **Perulangan:** `for` (klasik, `for...in` untuk properti objek, `for...of` untuk nilai array), `while`.
> >     
> > - **Error Handling:** `try...catch...throw` untuk menangani pengecualian (exceptions).
> >     
> >
> > ### Functions, Objects, dan Prototypes
> > 
> > **Functions:**
> > 
> > - Adalah "first-class citizens", artinya fungsi bisa diperlakukan seperti data: disimpan dalam variabel, dilewatkan sebagai argumen, dan dikembalikan dari fungsi lain.
> >     
> > - Dapat didefinisikan dengan kata kunci `function` atau sebagai _arrow function_ (`=>`).
> >     
> > 
> > **Objects:**
> > 
> > - Hampir semua hal di JavaScript adalah objek. Objek adalah kumpulan pasangan _key-value_ (properti dan nilai).
> >     
> > - Dibuat menggunakan _object literal_ (`{}`) atau dengan _constructor function_ (`new Date()`).
> >     
> > 
> > **Prototypes & Inheritance:**
> > 
> > - JavaScript menggunakan _prototypal inheritance_. Setiap objek memiliki _prototype_ (objek lain) yang menjadi "cetakan" atau sumber properti dan method warisan.
> >     
> > - Sejak ES6, kata kunci `class` diperkenalkan sebagai "syntactic sugar" (penyederhanaan sintaks) di atas sistem prototype untuk membuatnya lebih mirip bahasa berbasis kelas tradisional.
> >     
> >
> > ### DOM, Events, dan Asynchronous
> > 
> > **Document Object Model (DOM):**
> > 
> > - Adalah representasi struktur halaman HTML dalam bentuk objek. JavaScript menggunakan DOM untuk memanipulasi konten, struktur, dan gaya halaman secara dinamis.
> >     
> > - Method umum: `document.getElementById()`, `document.querySelector()`, `document.createElement()`.
> >     
> > 
> > **Events:**
> > 
> > - JS bersifat _event-driven_. Skrip bereaksi terhadap aksi pengguna (event) seperti `click`, `mouseover`, `keydown`.
> >     
> > - **Event Listener** (`.addEventListener()`) digunakan untuk "mendengarkan" event pada sebuah elemen dan menjalankan fungsi (callback) saat event terjadi.
> >     
> > 
> > **Concurrency & Event Loop:**
> > 
> > - JavaScript pada dasarnya _single-threaded_. Untuk mencegah operasi yang lama (seperti request network) memblokir seluruh halaman, JS menggunakan model _asynchronous_ dengan **Event Loop**.
> >     
> > - **Event Loop:** Sebuah proses yang terus-menerus memeriksa **message queue** (antrian tugas). Jika **call stack** (tumpukan eksekusi) kosong, ia akan mengambil tugas dari antrian dan menjalankannya.     
> >
> > ### Mengelola Asynchronous: Callback, Promise, Async/Await
> > 
> > - **Callback:** Sebuah fungsi yang dilewatkan sebagai argumen ke fungsi lain, untuk dieksekusi nanti setelah operasi selesai. Penggunaan callback yang berlebihan dapat menyebabkan "Callback Hell"/"Pyramid of Doom" (kode yang sulit dibaca).
> >     
> > - **Promise:** Sebuah objek yang merepresentasikan hasil dari operasi asynchronous yang akan selesai di masa depan. Sebuah Promise memiliki tiga state: _pending_ (menunggu), _fulfilled_ (berhasil), atau _rejected_ (gagal). `then()` digunakan untuk menangani hasil sukses, dan `catch()` untuk menangani kegagalan. Ini membuat kode lebih rapi daripada callback.
> >     
> > - **`async/await`:** Sintaks modern yang dibangun di atas Promise. Kata kunci `async` membuat sebuah fungsi mengembalikan Promise. Kata kunci `await` digunakan di dalam fungsi `async` untuk menunggu sebuah Promise selesai, membuat kode asynchronous terlihat dan terasa seperti kode synchronous, sehingga jauh lebih mudah dibaca dan dikelola.
> > 
> > ![[Pasted image 20251019224222.png]]

> [!cornell] #### Summary
> JavaScript adalah bahasa dinamis single-threaded yang menghidupkan web melalui manipulasi DOM dan penanganan event. Untuk menangani operasi yang memakan waktu tanpa memblokir antarmuka pengguna, JS menggunakan model asynchronous berbasis Event Loop. Pola modern untuk mengelola asynchronous telah berevolusi dari Callback menjadi Promise yang lebih terstruktur, dan disederhanakan lebih lanjut dengan sintaks `async/await` yang intuitif, memungkinkan penulisan kode non-blocking yang bersih dan mudah dibaca.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Closures
> 
> Sebuah _closure_ adalah kombinasi dari sebuah fungsi dan lingkungan leksikal (lingkup) di mana fungsi tersebut dideklarasikan. Artinya, sebuah fungsi "mengingat" variabel-variabel yang ada di lingkup luarnya, bahkan setelah lingkup luar tersebut selesai dieksekusi. Ini adalah konsep kuat yang memungkinkan pembuatan _private variables_ dan _stateful functions_.
> 
> #### Eksplorasi Mandiri: TypeScript
> 
> TypeScript adalah _superset_ dari JavaScript yang dikembangkan oleh Microsoft. Ia menambahkan fitur _static typing_ opsional ke dalam bahasa. Dengan mendefinisikan tipe data untuk variabel dan parameter fungsi, TypeScript dapat menangkap banyak error pada saat _compile-time_ (sebelum kode dijalankan), bukan saat _runtime_. Kode TypeScript pada akhirnya akan di-_transpile_ menjadi JavaScript biasa agar dapat dijalankan oleh browser.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **MDN Web Docs - JavaScript:** [developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "null")
>     
> - **JavaScript.info:** [javascript.info](https://javascript.info/ "null") - Penjelasan mendalam dari dasar hingga topik lanjutan.
>     
> - **Visualisasi Event Loop oleh Philip Roberts:** [latentflip.com/loupe](http://latentflip.com/loupe/ "null") - Alat interaktif untuk memahami cara kerja Event Loop.
>