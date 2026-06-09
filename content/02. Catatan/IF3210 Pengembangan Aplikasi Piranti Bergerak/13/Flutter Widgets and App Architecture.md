---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Flutter Widgets and App Architecture
>
> > ## Questions/Cues
> >
> > - Apa perbedaan utama `StatelessWidget` dan `StatefulWidget`, dan kapan menggunakan masing-masing?
> > - Mengapa Flutter menggunakan _composition over inheritance_ untuk membangun UI?
> > - Apa itu _state lifting_ dan mengapa diperlukan dalam arsitektur Flutter?
> > - Bagaimana _switch expression_, spread, dan `if`/`for` dalam _collection literal_ menyederhanakan kode?
> > - Apa peran **Flutter Inspector** dalam proses debugging UI?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 13a: 30-32, 13b: 24-39)
>
> > ### Struktur Proyek Flutter dan Entry Point
> >
> > Proyek Flutter memiliki struktur direktori yang terorganisir: folder `lib/` berisi seluruh kode Dart, dengan **`lib/main.dart`** sebagai _entry point_ aplikasi. Fungsi `main()` memanggil `runApp()` yang menerima widget root. Widget root biasanya adalah **`MaterialApp`** yang menyediakan tema Material Design, routing, dan konfigurasi aplikasi secara global.
> >
> > Setiap widget mendefinisikan UI-nya melalui method **`build()`** yang mengembalikan widget tree. Method ini dipanggil oleh framework Flutter setiap kali widget perlu dirender ulang. Prinsip utamanya: **UI adalah fungsi dari state** — tampilan ditentukan sepenuhnya oleh data, bukan oleh mutasi langsung elemen DOM seperti di web tradisional.
> >
> > ### StatelessWidget vs StatefulWidget
> >
> > Flutter membagi widget menjadi dua kategori berdasarkan kemampuan mengelola state:
> >
> > ```mermaid
> > flowchart TD
> >     A["Widget baru dibutuhkan"] --> B{"Apakah UI perlu</br>berubah berdasarkan</br>data internal?"}
> >     B -->|"Tidak"| C["StatelessWidget"]
> >     B -->|"Ya"| D["StatefulWidget"]
> >     C --> E["build() dipanggil</br>hanya saat parent</br>membangun ulang"]
> >     D --> F["State object</br>terpisah dari Widget"]
> >     F --> G["setState() memicu</br>build() ulang"]
> >     C --> H["Contoh: ikon,</br>label, kartu statis"]
> >     D --> I["Contoh: form,</br>animasi, counter"]
> > ```
> >
> > **`StatelessWidget`** tidak memiliki state internal yang berubah — sekali dibuat, tampilan hanya bergantung pada properti yang diteruskan dari parent. Method `build()` hanya dipanggil ulang jika parent membangun ulang.
> >
> > **`StatefulWidget`** terdiri dari dua objek: widget itu sendiri (immutable) dan objek **`State`** terpisah yang dapat berubah. Memanggil **`setState()`** memberitahu framework bahwa state telah berubah dan `build()` perlu dipanggil ulang untuk merefleksikan perubahan tersebut di UI.
> >
> > ### Control Flow Lanjutan: switch Expression, Spread, if, dan for
> >
> > Dart 3 memperkenalkan **_switch expression_** (berbeda dari _switch statement_): ekspresi ini **dievaluasi menjadi nilai** dan dapat digunakan langsung di dalam ekspresi lain. Sintaksnya menggunakan `=>` dan tidak memerlukan `break`. Kompiler memastikan semua kemungkinan nilai tertangani (_exhaustive_).
> >
> > Di dalam **_collection literals_** (`[]`, `{}`, `{:}`), Dart mendukung tiga operator khusus yang sangat berguna untuk membangun UI Flutter secara deklaratif:
> >
> > - **Spread operator `...`**: menyisipkan seluruh elemen koleksi lain ke dalam koleksi saat ini. Juga tersedia `...?` untuk spread yang null-safe.
> > - **`if` dalam collection**: menyertakan elemen secara kondisional tanpa perlu membuat list sementara. Contoh: `[Widget1(), if (kondisi) Widget2()]`.
> > - **`for` dalam collection**: menghasilkan elemen secara iteratif. Contoh: `[for (var item in items) ItemWidget(item)]`.
> >
> > Ketiga fitur ini menjadi tulang punggung cara Flutter membangun widget tree secara dinamis dan deklaratif di dalam method `build()`.
> >
> > ### Konvensi Kode Dart
> >
> > Tim Dart mendefinisikan konvensi penamaan yang konsisten:
> >
> > | Konteks | Konvensi | Contoh |
> > |---------|----------|--------|
> > | Variabel & fungsi | `lowerCamelCase` | `userName`, `fetchData()` |
> > | Class & enum | `UpperCamelCase` | `UserProfile`, `AppStatus` |
> > | Package & file | `snake_case` | `user_profile.dart`, `my_app` |
> > | Parameter tidak dipakai | `_` | `(_, index) => ...` |
> > | Konstanta global | Awalan `k` | `kDefaultPadding` |
> > | String literal | Single quote `'...'` | `'Halo'` |
> >
> > Dokumentasi menggunakan `///` (doc comment) untuk komentar yang muncul di hover tooltip IDE, dan `/** */` untuk komentar blok multi-baris.
> >
> > ### Data Models: PODO (Plain Old Dart Objects)
> >
> > Model data di Dart biasanya diimplementasikan sebagai **PODO** (_Plain Old Dart Objects_) — class sederhana yang berisi data dengan _getter_ dan _setter_. Konvensi Flutter merekomendasikan field privat dengan `_` prefix dan akses via getter/setter publik untuk enkapsulasi yang baik. Method `copyWith()`, `toString()`, `==`, dan `hashCode` sering ditambahkan untuk kemudahan penggunaan (_value semantics_).
> >
> > ### State Lifting: Arsitektur State Antar Widget
> >
> > Ketika dua atau lebih widget perlu berbagi atau saling mempengaruhi state yang sama, solusinya adalah **_state lifting_**: **pindahkan state ke widget leluhur terdekat** yang menjadi parent bersama kedua widget tersebut.
> >
> > Widget parent meneruskan data ke child via _constructor parameters_ (props). Untuk memungkinkan child mengubah state di parent, parent meneruskan **_callback function_** sebagai parameter — ini adalah **_closure_** yang menangkap referensi ke `setState()` dari parent. Ketika child memanggil callback tersebut, state di parent berubah dan seluruh subtree dirender ulang.
> >
> > Alur state lifting secara sederhana:
> > - **State** disimpan di widget parent (misal `_selectedIndex`)
> > - **Data** diteruskan ke bawah ke child yang membutuhkan tampilan (`child1.selectedIndex = _selectedIndex`)
> > - **Callback** diteruskan ke child yang perlu memicu perubahan (`child2.onSelected = (i) => setState(() => _selectedIndex = i)`)
> >
> > ### Styling dan List di Flutter
> >
> > Flutter mendukung **Google Fonts** melalui package `google_fonts` yang mengunduh dan men-cache font dari Google Fonts API. _Rounded corners_ dibuat menggunakan `BorderRadius.circular()` pada dekorasi widget.
> >
> > Untuk filter data pada list, gunakan method **`.where()`** dari `Iterable` yang menerima fungsi predikat dan mengembalikan `Iterable` baru berisi elemen yang memenuhi kondisi. Kombinasikan dengan `.toList()` untuk mengkonversi hasilnya.
> >
> > Untuk list yang dapat discroll, Flutter menyediakan:
> > - **`SingleChildScrollView`**: membungkus satu child yang mungkin lebih besar dari layar — cocok untuk form atau konten panjang yang tidak diketahui jumlahnya.
> > - **`Expanded`**: mengisi ruang yang tersedia dalam `Row` atau `Column` — penting agar `ListView` di dalam `Column` bisa scrollable tanpa overflow.
> >
> > ### Flutter Inspector
> >
> > **Flutter Inspector** adalah tool developer yang terintegrasi di Android Studio dan VS Code. Fungsinya meliputi visualisasi widget tree secara interaktif, pemeriksaan properti setiap widget, highlight batas widget di layar, dan debug masalah layout seperti overflow. Inspector membantu memahami bagaimana widget tree yang kompleks disusun dan di mana masalah rendering terjadi.

> [!cornell] #### Summary
>
> **Flutter** membangun UI secara deklaratif menggunakan widget tree dengan `build()` sebagai fungsi dari state. **`StatelessWidget`** digunakan untuk UI statis; **`StatefulWidget`** untuk UI yang berubah, dengan **`setState()`** memicu rebuild. **_Composition over inheritance_** adalah prinsip utama — widget dibuat dengan menggabungkan widget yang lebih kecil, bukan mewarisi. **_State lifting_** memindahkan state ke parent bersama dan meneruskan **callback closure** ke bawah untuk mutasi. _Collection literal_ mendukung **spread `...`**, **`if`**, dan **`for`** untuk membangun widget tree dinamis secara deklaratif. Model data diimplementasikan sebagai **PODO**, scrolling dikelola via **`SingleChildScrollView`/`Expanded`**, dan **Flutter Inspector** adalah alat debugging layout utama.

> [!ad-libitum]- Additional Information
>
> #### InheritedWidget dan Provider
>
> _State lifting_ manual efektif untuk hierarki widget yang dangkal, tetapi menjadi tidak praktis untuk aplikasi besar. **`InheritedWidget`** adalah mekanisme Flutter untuk meneruskan data ke bawah widget tree tanpa harus mengoper lewat setiap level. Package **Provider** (dan penggantinya **Riverpod**) membangun abstraksi di atas `InheritedWidget` untuk _state management_ yang lebih scalable.
>
> #### Widget Keys
>
> **`Key`** di Flutter membantu framework mengidentifikasi widget secara unik saat widget tree direkonstruksi. Tanpa key, Flutter bisa gagal mempertahankan state yang tepat ketika urutan widget berubah (misalnya saat item list di-reorder). `ValueKey`, `ObjectKey`, dan `UniqueKey` adalah varian yang tersedia.
>
> #### const Widget untuk Performa
>
> Menandai widget dengan `const` (saat semua propertinya adalah konstanta compile-time) membuat Flutter melewati proses rekonstruksi widget tersebut selama rebuild. Ini adalah optimasi performa yang signifikan terutama untuk widget yang sering dirender ulang karena adanya parent `StatefulWidget`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat aplikasi Flutter sederhana dengan counter yang diimplementasikan menggunakan `StatefulWidget`, kemudian refaktor menggunakan _state lifting_ dengan dua widget child yang berbeda
> 2. Implementasikan daftar item yang dapat difilter menggunakan `.where()` — hubungkan filter input (`TextField`) dengan list output menggunakan _state lifting_
> 3. Eksplorasi Flutter Inspector di Android Studio: buka widget tree, inspeksi properti padding/margin, dan identifikasi widget mana yang merupakan `StatefulWidget`
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Flutter: "Introduction to widgets" (docs.flutter.dev/ui/widgets-intro)
> - Dokumentasi Resmi Flutter: "State management" (docs.flutter.dev/data-and-backend/state-mgmt)
> - Codelab: "Your first Flutter app" (docs.flutter.dev/get-started/codelab)
> - "Flutter in Action" (Eric Windmill) — Bab arsitektur widget dan state management
