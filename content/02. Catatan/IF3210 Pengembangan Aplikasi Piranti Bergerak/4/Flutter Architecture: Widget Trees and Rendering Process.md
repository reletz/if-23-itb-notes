---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] Flutter Architecture: Widget Trees and Rendering Process
>
> > ## Questions/Cues
> >
> > - Mengapa Flutter menggunakan pendekatan komposisi widget?
> > - Bagaimana hubungan widget tree dengan proses rendering?
> > - Tahapan utama dalam Flutter rendering pipeline
> > - Perbedaan widget stateless vs stateful
> > - Peran Skia/Impeller dalam proses rendering
> >
> > ## Reference Points
> >
> > - Lecture_Flutter_Architecture.pptx (Slides 24-30)
> > - Flutter_Documentation.pdf (Pages 27-29)
>
> > ### Konsep Dasar Widget Tree
> >
> > Widget Tree merupakan struktur data hierarkis yang menjadi fondasi pembangunan antarmuka pengguna di Flutter. Setiap elemen UI (tombol, teks, layout) direpresentasikan sebagai widget yang disusun secara parent-child, membentuk pohon komponen yang lengkap. Berbeda dengan pendekatan view tradisional, Flutter menerapkan komposisi widget di mana widget sederhana digabungkan menjadi widget kompleks.
> >
> > Contoh konkret widget tree sederhana:
> >
> > - Scaffold (widget root)
> > - AppBar (widget anak)
> > - Column (widget anak)
> > - Text (widget cucu)
> > - Button (widget cucu)
> >
> > Flutter membedakan dua jenis widget utama:
> >
> > 1. **StatelessWidget**: Widget statis yang propertinya tidak berubah setelah dibuat
> > 2. **StatefulWidget**: Widget dinamis yang dapat memperbarui tampilannya ketika state internal berubah
> >
> > ### Arsitektur Layered Flutter
> >
> > Flutter mengadopsi arsitektur berlapis yang terdiri dari empat komponen utama:
> >
> > 1. **Dart App Layer**: Tempat developer menulis logika bisnis dan komposisi widget
> > 2. **Framework Layer**: Menyediakan widget sistem dan API tingkat tinggi
> > 3. **Engine Layer**: Bertanggung jawab untuk rasterisasi grafis (menggunakan Dart UI)
> > 4. **Embedder Layer**: Menghubungkan dengan sistem operasi dasar
> >
> > Lapisan ini bekerja secara independen dimana setiap lapisan hanya berkomunikasi dengan lapisan di bawahnya melalui antarmuka yang terdefinisi dengan jelas. Embedder layer ditulis dalam bahasa native platform (Java/C++ untuk Android, Swift/Objective-C untuk iOS) yang memungkinkan Flutter berjalan di berbagai platform.
> >
> > ### Proses Rendering Flutter
> >
> > Proses transformasi widget tree menjadi tampilan visual melibatkan lima tahap utama:
> >
> > 1. **Reconciliation**:
> > - Membandingkan widget tree baru dengan sebelumnya
> > - Mengidentifikasi perubahan menggunakan algoritma linear (O(n))
> > - Meminimalkan operasi pembaruan UI
> > 2. **Layout**:
> > - Menentukan ukuran dan posisi setiap widget
> > - Menggunakan constraint-based layout system
> > - Melakukan proses dari root widget ke leaf widget
> > 3. **Painting**:
> > - Memberikan atribut visual (warna, gradient, border)
> > - Menggambar setiap widget pada canvas
> > - Menggunakan retained rendering untuk optimasi
> > 4. **Compositing**:
> > - Menggabungkan layer yang telah di-paint
> > - Menangani efek transparansi dan overlay
> > - Membentuk scene final menggunakan compositor
> > 5. **Rendering**:
> > - Mengubah scene menjadi instruksi GPU
> > - Menggunakan renderer Skia (default) atau Impeller
> > - Mengirim frame ke display melalui platform embedder
> >
> > Proses ini terjadi pada setiap frame animasi, memastikan UI tetap responsif dengan refresh rate tinggi (60-120fps).

> [!cornell] #### Summary
>
> **Arsitektur Flutter** dibangun berdasarkan konsep widget tree yang menggunakan komposisi hierarkis untuk membangun antarmuka pengguna. Proses rendering melibatkan tahapan **reconciliation, layout, painting, compositing, dan GPU rendering** yang dioptimalkan untuk performa tinggi. **Layered architecture** Flutter memisahkan logika aplikasi (Dart), framework widget, engine grafis (Skia/Impeller), dan platform embedder, memungkinkan portabilitas lintas platform. **State management** yang efisien melalui StatefulWidget memungkinkan pembaruan UI dinamis dengan kinerja optimal.

> [!ad-libitum]- Additional Information
>
> #### Perbandingan Renderer Skia vs Impeller
>
> Flutter awalnya menggunakan Skia sebagai rendering engine lintas platform. Pada 2022, Google memperkenalkan Impeller sebagai renderer baru yang dikhususkan untuk Flutter dengan arsitektur pre-compiled shaders untuk menghindari jank pada frame pertama. Impeller menggunakan Vulkan di Android dan Metal di iOS, sedangkan Skia masih mengandalkan OpenGL. Perbedaan utama:
>
> - Impeller: Kompilasi ahead-of-time, pipeline state object caching
> - Skia: Runtime shader compilation, lebih kompatibel dengan perangkat lama
>
> #### Optimasi Performa Render Tree
>
> Untuk aplikasi kompleks dengan widget tree besar, Flutter menerapkan beberapa teknik optimasi:
>
> - **Const Widgets**: Membuat widget sebagai konstanta untuk menghindari rebuild
> - **RepaintBoundary**: Mengisolasi area yang perlu di-repaint
> - **ListView.builder**: Render lazy untuk konten scrollable
> - **Opacity Layer**: Menggunakan dedicated layer untuk efek transparansi
>
> #### Edge Cases dalam Layout System
>
> Beberapa skenario khusus yang memerlukan penanganan khusus:
>
> - **Parent-Child Size Dependence**: Circular constraint dalam nested layout
> - **Aspect Ratio Preservation**: Menangani perubahan ukuran dengan rasio tetap
> - **Intrinsic Size Calculation**: Widget dengan ukuran intrinsik kompleks
> - **Multilingual Layout**: Perubahan ukuran teks pada terjemahan panjang
>
> #### Self-Exploration Projects
>
> 1. Bangun aplikasi dengan nested widget tree (min. 5 level) dan analisis performa render menggunakan DevTools
> 2. Implementasikan custom render object untuk membuat shape geometri non-standar
> 3. Bandingkan frame rendering time antara aplikasi menggunakan Skia vs Impeller
> 4. Buat animasi kompleks dengan 20+ widget bergerak dan optimasi menggunakan RepaintBoundary
>
> #### Tools and Resources
>
> - **Flutter DevTools**: Suite debugging untuk inspeksi widget tree, performa rendering, dan memory usage
> - **Dart DevTools**: CPU profiler dan memory analyzer untuk optimasi kode Dart
> - **Rive**: Tools untuk membuat animasi vektor kompleks yang terintegrasi dengan Flutter
> - **Flutter Rendering Debugger**: Ekstensi VSCode untuk visualisasi proses layout dan paint
>
> #### Further Reading
>
> - Flutter Architectural Overview: https://docs.flutter.dev/resources/architectural-overview
> - Inside Flutter's Rendering Pipeline: https://medium.com/flutter-community/flutter-rendering-pipeline-73a3e727f64
> - Flutter RenderObject Deep Dive: https://www.youtube.com/watch?v=UUfXWzp0-DU
> - Impeller Rendering Engine Documentation: https://github.com/flutter/flutter/wiki/Impeller
> - Advanced Layout Techniques: https://docs.flutter.dev/ui/layout/adaptive-responsive