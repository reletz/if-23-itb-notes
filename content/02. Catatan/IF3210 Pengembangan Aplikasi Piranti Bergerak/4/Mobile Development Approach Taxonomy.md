---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] Mobile Development Approach Taxonomy
>
> > ## Questions/Cues
> >
> > - Mengapa fragmentasi menjadi tantangan utama pengembangan mobile?
> > - Perbedaan toolchain native Android vs iOS?
> > - Keuntungan utama pendekatan mobile web?
> > - Kapan memilih pendekatan cross-platform?
> > - Contoh implementasi nyata tiap pendekatan?
> >
> > ## Reference Points
> >
> > - Lecture_IF3210_Mobile_Approaches.pptx (Slides 1-33)
> > - IEEE Access Vol.6 (Halaman 17711-17728)
>
> > ### Tantangan Fragmentasi dalam Pengembangan Mobile
> >
> > Fragmentasi mengacu pada variasi platform, perangkat, dan spesifikasi teknis yang harus diakomodasi dalam pengembangan aplikasi mobile. Setiap platform (Android/iOS) memiliki antarmuka, standar, bahasa pemrograman, API, dan SDK yang berbeda. Bahkan dalam satu platform, terdapat perbedaan antar perangkat seperti kapasitas memori, resolusi layar, dan kemampuan hardware. Studi oleh Ahmad et al. (2018) menunjukkan bahwa fragmentasi meningkatkan kompleksitas pengujian, optimasi kinerja, dan konsistensi UX antar perangkat.
> >
> > Contoh nyata: Aplikasi yang berjalan lancar di smartphone flagship mungkin mengalami lag atau crash di perangkat entry-level karena perbedaan kapasitas memori. Perbedaan aspect ratio layar juga membutuhkan desain UI yang adaptif.
> >
> > ### Pendekatan Pengembangan Native
> >
> > Pengembangan native menggunakan bahasa dan tools spesifik platform:
> >
> > - **Android**: Kotlin/Java dengan Android Studio, Gradle
> > - **iOS**: Swift/Objective-C dengan Xcode, CocoaPods
> >
> > Keunggulan: Akses penuh ke fitur native, optimasi performa maksimal, dukungan tooling terintegrasi. Kekurangan: Biaya pengembangan tinggi (tim terpisah tiap platform), kurva belajar berbeda. Cocok untuk aplikasi berat seperti game 3D atau aplikasi yang memanfaatkan penuh hardware spesifik.
> >
> > Contoh implementasi: Aplikasi banking yang membutuhkan keamanan tinggi dan integrasi deep dengan sistem operasi.
> >
> > ### Pendekatan Mobile Web
> >
> > Menggunakan teknologi web (JavaScript, HTML, CSS) untuk aplikasi yang diakses melalui browser mobile. Tools utama: React/Vue/Angular, Chromium/WebKit engines, npm/yarn.
> >
> > Keunggulan: Cross-platform otomatis, pembaruan instan (tanpa app store), ukuran aplikasi kecil. Kekurangan: Akses terbatas ke fitur native (bluetooth, sensor), performa inferior untuk komputasi intensif. Ideal untuk aplikasi konten-centric seperti portal berita atau katalog produk.
> >
> > Contoh implementasi: Versi mobile web aplikasi e-commerce untuk menjangkau pengguna dengan storage terbatas.
> >
> > ### Pendekatan Cross-Platform
> >
> > Menggunakan single codebase untuk multi-platform dengan framework khusus. Menyediakan balance antara akses native dan efisiensi pengembangan. Keuntungan utama: Reusable code (hingga 80%), waktu peluncuran lebih cepat, biaya lebih efisien, dan UX near-native.
> >
> > Kapan memilih: Ketika target pasar luas (Android+iOS), tim developer terbatas, dan aplikasi tidak membutuhkan optimasi hardware ekstrem. Studi kasus: Aplikasi Starlink (SpaceX) menggunakan React Native untuk visualisasi 3D real-time jaringan satelit, dan aplikasi pendamping mobil listrik Xiaomi SU7 menggunakan Flutter.

> [!cornell] #### Summary
>
> **Fragmentasi perangkat dan platform** merupakan tantangan utama pengembangan mobile yang mempengaruhi konsistensi UX dan kompleksitas pengembangan. Tiga pendekatan utama meliputi: **native** (optimasi maksimal tapi mahal), **mobile web** (universal tapi fitur terbatas), dan **cross-platform** (balance antara efisiensi dan performa). Pemilihan pendekatan harus mempertimbangkan **audience target**, **kompleksitas fungsional**, dan **sumber daya teknis**. Implementasi nyata oleh SpaceX dan Xiaomi menunjukkan efektivitas solusi cross-platform untuk skala enterprise.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Mendalam
>
> | Parameter           | Native           | Mobile Web       | Cross-Platform   |
>
> |---------------------|------------------|------------------|------------------|
>
> | Biaya Pengembangan  | Tinggi (2 tim)   | Rendah           | Sedang           |
>
> | Waktu Peluncuran    | Lama             | Sangat Cepat     | Cepat            |
>
> | Akses Hardware      | Penuh            | Terbatas         | Parsial (via bridge) |
>
> | Performa            | Optimal          | Variabel         | Near-native      |
>
> | Maintainability     | Kompleks         | Sangat Mudah     | Moderat          |
>
> #### Tren Industri 2024
>
> - Peningkatan adopsi **Kotlin Multiplatform** untuk solusi hybrid yang lebih dekat ke native
> - **WebAssembly** mulai digunakan untuk mobile web dengan performa near-native
> - Arsitektur **modular** memungkinkan kombinasi pendekatan (core native + fitur cross-platform)
>
> #### Studi Kasus Tambahan
>
> 1. **Twitter Lite**: Aplikasi Progressive Web App (PWA) yang mengurangi penggunaan data hingga 70% dibanding native app
> 2. **Alibaba**: Migrasi dari native ke Flutter meningkatkan produktivitas developer 50% dengan performa setara native
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bandingkan performa rendering list 10.000 item dengan tiga pendekatan menggunakan tools benchmark
> 2. Implementasikan fitur akses kamera dengan tiga pendekatan dan analisis kompleksitas kodenya
> 3. Buat tabel perbandingan biaya pengembangan menggunakan data dari layanan cloud (AWS Amplify vs Firebase)
>
> #### Tools Rekomendasi
>
> - **Performa Testing**: Android Profiler, Xcode Instruments, Lighthouse
> - **Cross-Platform Debugging**: Flipper, Dart DevTools
> - **CI/CD**: GitHub Actions (mobile web), Bitrise (native), Codemagic (cross-platform)
>
> #### Bacaan Lanjutan
>
> - Google Research: "Mobile Development Trends 2024"
> - IEEE Paper: "Cross-Platform Frameworks Performance Benchmark"
> - Buku: "Mobile Systems Design Patterns" oleh Jonathan Levin