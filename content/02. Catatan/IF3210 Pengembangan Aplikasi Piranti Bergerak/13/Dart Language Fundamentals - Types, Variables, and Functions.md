---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Dart Language Fundamentals - Types, Variables, and Functions
>
> > ## Questions/Cues
> >
> > - Apa perbedaan antara `var`, `final`, dan `const` dalam deklarasi variabel?
> > - Bagaimana Dart mendukung dua mode kompilasi (JIT dan AOT)?
> > - Mengapa tipe dasar seperti `int` dan `String` dianggap sebagai objek di Dart?
> > - Apa kegunaan _named parameters_ dan kapan menggunakan kata kunci `required`?
> > - Bagaimana Dart menangani _multiple return values_ dan _anonymous functions_?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 13a: 3-21)
>
> > ### Evolusi dan Fitur Utama Dart
> >
> > **Dart** adalah bahasa pemrograman yang dikembangkan oleh Google, pertama kali dirilis sebagai **Dart 1.0** pada November 2013 sebagai alternatif JavaScript untuk web. Evolusinya berlanjut ke **Dart 2.0** (Agustus 2018) yang memperkenalkan _strong typing_, _null safety_, dan dukungan penuh untuk Flutter, kemudian mencapai **Dart 3.0** (Mei 2023) di mana _null safety_ menjadi perilaku bawaan tanpa bisa dinonaktifkan.
> >
> > Dart dirancang sebagai bahasa _platform-independent_ dengan sejumlah fitur unggulan: dukungan **garbage collection** untuk manajemen memori otomatis, fungsi sebagai **_first-class citizens_** (dapat disimpan dalam variabel dan diteruskan sebagai argumen), **_sound null safety_** yang menjamin variabel tidak bisa bernilai `null` kecuali dideklarasikan eksplisit, OOP penuh dengan enkapsulasi/pewarisan/polimorfisme, pemrograman asinkron via **`async`/`await`** dan `Isolates`, serta **FFI** (_Foreign Function Interface_) untuk berinteraksi dengan kode native C.
> >
> > ### Mode Kompilasi Dart: JIT dan AOT
> >
> > Dart mendukung dua mode kompilasi yang melayani kebutuhan berbeda:
> >
> > ```mermaid
> > flowchart TD
> >     A["Kode Dart"] --> B{"Mode?"}
> >     B -->|"Development"| C["JIT</br>(Just-In-Time)"]
> >     B -->|"Production"| D["AOT</br>(Ahead-Of-Time)"]
> >     C --> E["Dart VM</br>(bytecode dieksekusi</br>langsung)"]
> >     D --> F["Native Code</br>(binary spesifik</br>platform)"]
> >     E --> G["Hot Reload</br>(perubahan kode</br>langsung terlihat)"]
> >     F --> H["Performa Tinggi</br>(startup cepat,</br>tanpa VM overhead)"]
> > ```
> >
> > **JIT** (_Just-In-Time_) digunakan saat pengembangan: kode dikompilasi saat dijalankan oleh Dart VM, memungkinkan fitur **_hot reload_** yang sangat produktif — perubahan kode langsung terlihat tanpa restart aplikasi. **AOT** (_Ahead-Of-Time_) digunakan untuk produksi: kode dikompilasi penuh ke _native code_ sebelum dijalankan, menghasilkan performa startup yang cepat dan konsumsi memori yang lebih efisien.
> >
> > ### Variabel: var, final, dan const
> >
> > Dart menyediakan tiga cara utama mendeklarasikan variabel, masing-masing dengan semantik yang berbeda:
> >
> > - **`var`** — variabel biasa dengan _type inference_; tipe disimpulkan dari nilai awal dan tidak bisa berubah, tetapi nilainya bisa diubah kapan saja. Contoh: `var name = 'Dart';` membuat variabel bertipe `String`.
> > - **`final`** — variabel yang hanya bisa diassign **satu kali** (_single assignment_). Nilai dievaluasi saat runtime. Setelah diassign, variabel tidak bisa menunjuk ke objek lain, tetapi isi objek tersebut masih bisa berubah.
> > - **`const`** — konstanta **_compile-time_**: nilai harus diketahui saat kompilasi. Tidak hanya referensinya yang tetap, tetapi seluruh objek bersifat _deeply immutable_ dan di-_canonicalize_ (hanya satu salinan di memori untuk nilai yang sama).
> >
> > ### Tipe Bawaan Dart
> >
> > Dart memperlakukan semua nilai sebagai objek, termasuk tipe primitif. Tipe-tipe dasar meliputi:
> >
> > | Tipe | Keterangan | Contoh |
> > |------|-----------|--------|
> > | **`bool`** | Nilai benar/salah, immutable | `true`, `false` |
> > | **`int`** | Bilangan bulat | `42`, `-7` |
> > | **`double`** | Bilangan desimal | `3.14` |
> > | **`num`** | Supertype dari `int` dan `double` | `num x = 1;` |
> > | **`String`** | Teks Unicode, immutable | `'Halo'`, `"Dunia"` |
> > | **`List`** | Koleksi terurut (array) | `[1, 2, 3]` |
> > | **`Set`** | Koleksi unik tak terurut | `{1, 2, 3}` |
> > | **`Map`** | Pasangan kunci-nilai | `{'a': 1}` |
> > | **`Function`** | Fungsi sebagai objek | `() => print('hi')` |
> >
> > Karena `bool`, `int`, `double`, dan `String` bersifat **immutable**, setiap operasi seperti penggabungan string atau aritmatika menghasilkan objek baru, bukan memodifikasi yang lama. Meski demikian, tipe-tipe ini tetap memiliki _methods_ dan dapat diperlakukan layaknya objek biasa.
> >
> > ### Manajemen Memori dan Garbage Collection
> >
> > Dart menggunakan **_garbage collection_** (GC) untuk manajemen memori otomatis. Objek dialokasikan di _heap_ dan GC secara periodik menelusuri referensi aktif — objek yang tidak lagi dapat dijangkau dari referensi manapun (_unreachable_) akan dibebaskan memorinya. Pengembang tidak perlu memanggil `free()` atau `delete()` secara manual. Pemahaman ini penting untuk menghindari **_memory leak_**: selama ada referensi aktif ke suatu objek (misalnya callback yang tersimpan), GC tidak akan membebaskannya.
> >
> > ### Fungsi: Parameter, Default, dan Named
> >
> > Fungsi di Dart mendukung berbagai pola parameter:
> >
> > - **Parameter posisional wajib**: dideklarasikan langsung dalam tanda kurung.
> > - **Parameter posisional opsional**: dibungkus `[]`, dapat diberi nilai _default_.
> > - **_Named parameters_**: dibungkus `{}`, dipanggil dengan nama eksplisit. Gunakan kata kunci **`required`** untuk mewajibkannya.
> >
> > Dart juga mendukung **generics pada fungsi**, memungkinkan fungsi bekerja dengan berbagai tipe secara _type-safe_. Contoh: `T first<T>(List<T> list) => list[0];`.
> >
> > **_Multiple return values_** dicapai menggunakan **_records_** — tipe literal `(Type1, Type2)`. Contoh: `(String, int) getInfo() => ('Dart', 3);`. Nilai dikembalikan sebagai tuple dan bisa didestrukturisasi: `var (lang, version) = getInfo();`.
> >
> > **_Arrow function_** `=>` adalah sintaks ringkas untuk fungsi satu ekspresi: `int kuadrat(int x) => x * x;` setara dengan fungsi berblok yang mengembalikan `x * x`.
> >
> > ### Anonymous Functions dan Closures
> >
> > **_Anonymous function_** (lambda) adalah fungsi tanpa nama yang sering digunakan sebagai argumen. Contoh umum: `list.forEach((item) { print(item); });` atau dengan `map`: `list.map((x) => x * 2).toList()`.
> >
> > **_Closure_** adalah fungsi yang **menangkap variabel dari _lexical scope_** di mana ia didefinisikan — bukan dari scope pemanggil. Dart menangani _bad closure in loops_ dengan benar: setiap iterasi loop `for` mendapatkan salinan variabel `i`-nya sendiri, sehingga closure yang dibuat di dalam loop masing-masing menangkap nilai `i` yang berbeda. Perilaku ini berbeda dari JavaScript (pre-`let`) yang sering menyebabkan bug di mana semua closure berbagi referensi variabel yang sama.

> [!cornell] #### Summary
>
> **Dart** berevolusi dari alternatif JavaScript (2013) menjadi bahasa modern dengan _sound null safety_ bawaan (2023), mendukung **JIT** untuk _hot reload_ saat development dan **AOT** untuk _native code_ performa tinggi di produksi. Deklarasi variabel memiliki tiga tingkat: **`var`** (mutable dengan type inference), **`final`** (single assignment, dievaluasi runtime), dan **`const`** (compile-time constant, deeply immutable). Semua tipe dasar (`bool`, `int`, `String`, dll.) adalah **objek immutable** yang dikelola oleh **garbage collector**. Fungsi mendukung _named parameters_ dengan **`required`**, _multiple return values_ via **records** `(Type1, Type2)`, dan **arrow functions** `=>`. **Anonymous functions** dan **closures** memungkinkan gaya pemrograman fungsional, dengan Dart secara aman menangkap salinan variabel loop untuk menghindari bug _bad closure_.

> [!ad-libitum]- Additional Information
>
> #### Dart di Luar Flutter
>
> Meskipun Dart paling dikenal sebagai bahasa Flutter, Dart juga dapat digunakan untuk server-side programming via **Dart on the server** (framework seperti Shelf atau Dart Frog), command-line tools, dan kompilasi ke JavaScript untuk aplikasi web. Ekosistem Dart dikelola melalui **pub.dev**, repositori paket resmi Dart/Flutter.
>
> #### Sound Null Safety: Dampak Kompiler
>
> Dengan _sound null safety_, kompiler Dart dapat melakukan **optimasi flow analysis**: setelah sebuah variabel nullable diperiksa `!= null`, kompiler secara otomatis mempromosikannya ke tipe non-nullable dalam blok kode berikutnya tanpa _cast_ manual. Ini disebut **_type promotion_** dan sangat mengurangi kode boilerplate.
>
> #### Perbedaan List vs Array
>
> `List` di Dart secara konseptual setara dengan array dinamis di bahasa lain. Dart tidak memiliki tipe array tetap seperti di Java (`int[]`). Untuk performa maksimum dengan data numerik, gunakan **`Uint8List`** atau tipe lain dari `dart:typed_data` yang menggunakan memori contigous.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat program Dart yang mendemonstrasikan perbedaan `var`, `final`, dan `const` — coba modifikasi setiap jenis dan amati error kompiler
> 2. Tulis fungsi dengan _named parameters_, _optional positional parameters_, dan _records_ sebagai return value, lalu panggil dari fungsi `main()`
> 3. Implementasikan contoh closure dalam loop dan bandingkan perilakunya dengan JavaScript menggunakan `var` (gunakan DartPad di dartpad.dev)
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Dart: "Language Tour" (dart.dev/language)
> - Dart: "Sound null safety" (dart.dev/null-safety)
> - DartPad (dartpad.dev) untuk eksperimen interaktif
> - "Flutter & Dart: The Complete Guide" — Bab Dart Fundamentals
