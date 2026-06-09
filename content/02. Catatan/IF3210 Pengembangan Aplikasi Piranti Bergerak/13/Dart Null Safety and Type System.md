---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Dart Null Safety and Type System
>
> > ## Questions/Cues
> >
> > - Apa perbedaan fundamental antara `final` dan `const` yang sering membingungkan?
> > - Kapan menggunakan tipe `Object` vs `dynamic` dan apa risikonya?
> > - Bagaimana operator `?.`, `??`, `??=`, dan `!` bekerja secara konkret?
> > - Apa itu kata kunci `late` dan masalah apa yang dipecahkannya?
> > - Mengapa _sound null safety_ dianggap memberi keuntungan performa di production?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 13b: 3-14)
>
> > ### final vs const: Perbedaan yang Kritis
> >
> > `final` dan `const` sama-sama mencegah reassignment, tetapi memiliki semantik yang **sangat berbeda**:
> >
> > | Aspek | `final` | `const` |
> > |-------|---------|---------|
> > | Waktu evaluasi | Runtime | Compile-time |
> > | Kedalaman immutability | Referensi saja (_shallow_) | Seluruh objek (_deep_) |
> > | Isi objek | Bisa berubah | Tidak bisa berubah |
> > | Canonicalization | Tidak | Ya (satu salinan di memori) |
> > | Contoh valid | `final list = [1,2,3]; list.add(4);` | `const list = [1,2,3]; // list.add(4) ERROR` |
> >
> > **`final`** berarti variabel hanya memiliki **satu referensi** — tidak bisa diarahkan ke objek lain — tetapi objek yang dirujuk masih dapat dimutasi. **`const`** berarti seluruh objek bersifat _deeply immutable_ dan dikompilasi sebagai nilai tetap.
> >
> > **Canonicalization**: dua instans `const` dengan nilai yang sama adalah **objek yang identik** di memori (dapat diverifikasi dengan `identical()`). Ini berarti Dart hanya membuat satu salinan untuk semua widget `const` yang identik, yang menjadi alasan utama mengapa **widget `const` direkonstruksi lebih cepat** dalam Flutter.
> >
> > ### Immutable Classes dengan const Constructor
> >
> > Untuk membuat class yang seluruh instansnya bersifat _deeply immutable_, definisikan **_const constructor_** dengan semua field bertipe `final`:
> >
> > - Semua _instance fields_ wajib `final`
> > - Konstruktor dideklarasikan dengan kata kunci `const`
> > - Instans yang dibuat dengan `const MyClass(...)` dijamin identik jika parameternya sama (`identical()` mengembalikan `true`)
> >
> > Pola ini umum digunakan di Flutter untuk widget dan _data classes_ yang tidak perlu berubah, mengoptimalkan proses rebuild tree widget.
> >
> > ### Object vs dynamic: Keamanan Tipe
> >
> > Dart menyediakan dua tipe "super" yang tampak serupa tetapi berperilaku sangat berbeda:
> >
> > - **`Object`**: supertype dari semua tipe non-nullable di Dart. Penggunaan `Object` tetap diperiksa oleh **kompiler saat compile-time** — hanya method yang ada di class `Object` yang bisa dipanggil tanpa cast. Ini memberikan keamanan tipe penuh.
> > - **`dynamic`**: menonaktifkan seluruh pemeriksaan tipe Dart. Operasi apapun diperbolehkan oleh kompiler, tetapi **error tipe muncul saat runtime** (bukan compile-time). `dynamic` ibarat "lepas sabuk pengaman" — berbahaya jika tidak digunakan dengan hati-hati.
> >
> > Prinsipnya: gunakan `Object` (atau generics) kapanpun memungkinkan; gunakan `dynamic` hanya saat benar-benar diperlukan (misalnya saat berinteraksi dengan data JSON yang belum diketahui strukturnya).
> >
> > ### Pengecekan dan Konversi Tipe
> >
> > Dart menyediakan beberapa mekanisme untuk bekerja dengan tipe secara aman:
> >
> > - **`is` / `is!`**: operator pengecekan tipe yang mengembalikan `bool`. Setelah `is` check, Dart secara otomatis mempromosikan tipe variabel (_type promotion_) dalam blok tersebut.
> > - **`as`**: _type cast_ eksplisit. Akan melempar `TypeError` saat runtime jika objek bukan tipe yang dimaksud — gunakan hanya jika yakin tipenya.
> > - **`int.parse(String)`**: mengkonversi `String` ke `int`. Melempar `FormatException` jika string tidak valid.
> > - **`.toString()`**: mengkonversi nilai apa pun ke representasi `String`-nya.
> > - **`.toInt()` / `.toDouble()`**: konversi antar tipe numerik (tersedia di `num`, `int`, `double`).
> >
> > ### Null-Aware Operators
> >
> > _Sound null safety_ di Dart didukung oleh sekumpulan **operator null-aware** yang membuat penanganan nilai `null` lebih ringkas dan aman:
> >
> > | Operator | Nama | Perilaku |
> > |----------|------|---------|
> > | **`?.`** | _Null-conditional_ | `obj?.method()` — panggil `method()` hanya jika `obj` tidak null; kembalikan `null` jika `obj` null |
> > | **`??`** | _Null-coalescing_ | `expr ?? default` — kembalikan `expr` jika tidak null, atau `default` jika null |
> > | **`??=`** | _Null-aware assignment_ | `x ??= value` — assign `value` ke `x` hanya jika `x` saat ini null |
> > | **`!`** | _Null assertion_ | `obj!` — beritahu kompiler bahwa `obj` pasti tidak null; melempar `Null check operator used on a null value` saat runtime jika salah |
> >
> > ### Kata Kunci late
> >
> > **`late`** memungkinkan deklarasi variabel non-nullable yang diinisialisasi **setelah deklarasi**, bukan saat deklarasi. Ini mengatasi dua masalah umum:
> >
> > 1. **Inisialisasi yang mahal (_lazy initialization_)**: variabel `late` tidak diinisialisasi sampai pertama kali diakses, menghemat sumber daya jika variabel mungkin tidak pernah digunakan.
> > 2. **Field yang diinisialisasi di luar konstruktor**: misalnya field yang baru bisa diset setelah `super()` selesai, atau dalam callback `initState()` di Flutter.
> >
> > Jika variabel `late` diakses sebelum diinisialisasi, Dart melempar `LateInitializationError` saat runtime.
> >
> > ### Sound Null Safety: Manfaat dan Cara Kerja
> >
> > Sejak Dart 3.0, **_sound null safety_** adalah perilaku bawaan yang tidak bisa dinonaktifkan. Semua variabel secara default **tidak bisa bernilai `null`** — untuk variabel nullable, harus ditambahkan sufiks `?` pada tipenya (contoh: `String?`, `int?`).
> >
> > Manfaat utama _sound null safety_:
> >
> > - **Eliminasi null checks di runtime**: kompiler tahu variabel non-nullable tidak akan pernah null, sehingga tidak perlu menyisipkan pemeriksaan null saat runtime, menghasilkan kode yang lebih efisien.
> > - **Optimasi caching**: karena kompiler dapat membuktikan nilai tertentu tidak akan pernah null, ia bisa mengoptimalkan bagaimana nilai tersebut disimpan dan diakses.
> > - **Bug terdeteksi lebih awal**: `NullPointerException` yang biasanya hanya muncul saat runtime kini menjadi error kompiler yang muncul saat pengembangan.

> [!cornell] #### Summary
>
> **`final`** dan **`const`** berbeda fundamental: `final` hanya mengunci referensi (_shallow_) dievaluasi saat runtime, sedangkan `const` mengunci seluruh objek (_deep_, compile-time) dan memungkinkan **canonicalization** (satu instans di memori untuk nilai identik). **`Object`** mempertahankan keamanan tipe compile-time; **`dynamic`** menonaktifkannya dan berisiko error runtime. **_Sound null safety_** menjadikan semua variabel non-nullable secara default — tipe nullable ditandai dengan `?`. Operator **`?.`** (akses aman), **`??`** (nilai default), **`??=`** (assign jika null), dan **`!`** (null assertion) memperlancar penanganan null. Kata kunci **`late`** mendukung _lazy initialization_ dan inisialisasi di luar konstruktor. Secara keseluruhan, null safety menggeser deteksi bug dari runtime ke compile-time dan memungkinkan optimasi performa oleh kompiler.

> [!ad-libitum]- Additional Information
>
> #### Null Safety dan Migrasi Kode Lama
>
> Proyek Dart yang ditulis sebelum null safety dapat dimigrasikan menggunakan tool `dart migrate`. Proses ini menganalisis kode dan menyarankan anotasi `?` dan `!` yang tepat. Selama masa transisi, kode lama (pre-null-safety) dan baru bisa hidup berdampingan menggunakan **_language version markers_**, meskipun ini tidak lagi relevan untuk proyek baru yang menggunakan Dart 3.
>
> #### Tipe Never dan Void
>
> Dart memiliki dua tipe khusus lainnya: **`Never`** adalah tipe bawah (_bottom type_) yang merepresentasikan nilai yang tidak pernah ada — fungsi yang selalu melempar exception dideklarasikan bertipe `Never`. **`void`** menandakan bahwa nilai kembalian tidak boleh digunakan (berbeda dari `Null`), umumnya dipakai sebagai return type fungsi yang hanya menimbulkan efek samping.
>
> #### Pattern Matching di Dart 3
>
> Dart 3 memperkenalkan **_pattern matching_** yang bekerja bersama null safety. Pola seperti `if (value case String s) { ... }` tidak hanya mengecek tipe tetapi sekaligus mendestrukturisasi dan mempromosikan variabel. Ini membuat kode penanganan tipe heterogen jauh lebih ekspresif.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat class dengan `const constructor` dan verifikasi canonicalization menggunakan `identical()` — bandingkan dengan class yang hanya menggunakan `final`
> 2. Eksperimen dengan `dynamic` vs `Object`: tulis fungsi yang menerima keduanya, coba panggil method yang tidak ada, dan amati kapan error muncul (compile-time vs runtime)
> 3. Implementasikan semua empat null-aware operators dalam satu program kecil yang mensimulasikan pengambilan data pengguna yang mungkin null
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Dart: "Understanding null safety" (dart.dev/null-safety/understanding-null-safety)
> - Dart: "Sound null safety" (dart.dev/null-safety)
> - Blog Dart: "Announcing Dart 3" — penjelasan perubahan null safety di Dart 3
> - "Effective Dart: Usage" — panduan kapan menggunakan `dynamic` secara bertanggung jawab
