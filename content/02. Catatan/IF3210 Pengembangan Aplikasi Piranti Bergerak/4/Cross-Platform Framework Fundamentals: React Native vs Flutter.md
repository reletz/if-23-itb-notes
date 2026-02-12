---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] Cross-Platform Framework Fundamentals: React Native vs Flutter
>
> > ## Questions/Cues
> >
> > - Bagaimana arsitektur React Native memfasilitasi komunikasi JavaScript-Native?
> > - Apa perbedaan pendekatan rendering antara React Native dan Flutter?
> > - Mengapa Flutter menggunakan widget tree untuk membangun UI?
> > - Bagaimana performa React Native dan Flutter dibandingkan secara teknis?
> > - Apa keunggulan Dart dalam ekosistem Flutter?
> > - Bagaimana implementasi cross-platform pada level renderer?
> >
> > ## Reference Points
> >
> > - Slide IF3210 (Slides 10-11, 15-23, 24-30)
> > - Studi Kasus Fentaw (2020) & Tollin (2023)
>
> > ### Arsitektur Dasar React Native
> >
> > React Native menggunakan **JavaScript Interface (JSI)** untuk komunikasi real-time antara kode JavaScript dan modul native. JSI memungkinkan referensi memori langsung antara JavaScript dan C++ tanpa serialisasi, meningkatkan efisiensi komunikasi. **Fabric Renderer** bertanggung jawab untuk manajemen UI dengan pendekatan deklaratif, menggantikan sistem rendering lama yang menggunakan bridge asynchronous.
> >
> > Contoh implementasi: Saat komponen React mengupdate state, Fabric secara langsung memanipulasi node UI native melalui JSI tanpa melalui proses bridging yang lambat. Pendekatan ini mengurangi latency untuk operasi seperti scrolling cepat atau animasi kompleks.
> >
> > ### Sistem Rendering Flutter
> >
> > Flutter menggunakan **Impeller** (iOS/Android) atau **Skia** (platform lain) sebagai rendering engine. Proses rendering diawali dengan pembangunan **widget tree** yang kemudian melalui tahap:
> >
> > 1. **Layout**: Menentukan posisi dan ukuran widget
> > 2. **Painting**: Memberikan properti visual seperti warna dan gradien
> > 3. **Compositing**: Menggabungkan lapisan widget dengan efek transparansi
> >
> > Berbeda dengan React Native yang mengandalkan komponen native, Flutter menggambar UI langsung ke kanvas grafis menggunakan **Dart framework**. Contoh implementasi: Text widget di Flutter di-render sebagai kumpulan geometri dan tekstur tanpa menggunakan komponen text native platform.
> >
> > ### Manajemen State dan UI React Native
> >
> > React Native mengadopsi model **reactive programming** dari React web. Komponen UI didefinisikan sebagai fungsi yang merespons perubahan state. **TurboModules** memungkinkan akses langsung ke API native melalui JSI dengan performa lebih baik daripada sistem bridge sebelumnya.
> >
> > Contoh kasus: Akses sensor perangkat melalui TurboModules mengeliminasi overhead komunikasi bridge tradisional. Sistem **View Flattening** mengoptimasi hierarki UI dengan menggabungkan view yang tidak perlu secara otomatis untuk mengurangi kompleksitas layout.
> >
> > ### Ekosistem dan Tooling Flutter
> >
> > Flutter menyediakan **DevTools suite** lengkap untuk profiling performa, inspeksi widget tree, dan analisis memory. Bahasa pemrograman **Dart** menawarkan fitur seperti:
> >
> > - **Ahead-of-Time (AOT)** compilation untuk performa native
> > - **Hot Reload** dengan state preservation
> > - Null safety melalui sound type system
> >
> > Contoh keunggulan: Dalam pengembangan fitur checkout e-commerce, Dart memungkinkan validasi form yang kompleks dengan minim runtime error berkat sistem tipenya.
> >
> > ### Perbandingan Teknis Fundamental
> >
> > | Aspek               | React Native                     | Flutter                          |
> >
> > |---------------------|----------------------------------|----------------------------------|
> >
> > | **Bahasa**          | JavaScript (dinamis)             | Dart (strongly typed)            |
> >
> > | **Rendering**       | Komponen native via JSI          | Custom engine (Impeller/Skia)    |
> >
> > | **Hot Reload**      | 1.3-2.1 detik                    | 0.8-1.5 detik                    |
> >
> > | **Size APK**        | ~25MB (dengan Hermes)            | ~18MB (release mode)             |
> >
> > | **Akses Native**    | TurboModules + JSI               | Platform Channels + FFI          |
> >
> > Studi **Fentaw (2020)** menunjukkan React Native unggul untuk aplikasi berbasis CRUD, sedangkan **Tollin (2023)** menemukan Flutter lebih konsisten dalam rendering grafis berat.

> [!cornell] #### Summary
>
> **React Native** menggunakan pendekatan hybrid dengan **JSI** untuk komunikasi JavaScript-native yang efisien dan **Fabric** untuk manajemen UI modern. **Flutter** memiliki arsitektur self-contained dengan **widget tree** dan rendering engine khusus yang memberikan konsistensi visual lintas platform. Kedua framework memiliki **tradeoff performa** yang berbeda: React Native lebih baik dalam integrasi modul native, sementara Flutter unggul pada rendering grafis kompleks. Pemilihan framework harus mempertimbangkan **kematangan ekosistem, kebutuhan performa spesifik, dan keahlian tim pengembang**.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Algoritma
>
> **React Native:**
>
> - Komunikasi JSI: O(1) untuk direct memory access
> - View reconciliation: O(n) dengan optimasi flattening
>
> **Flutter:**
>
> - Layout calculation: O(n) dengan batasan constraint-based system
> - Render tree traversal: O(n log n) untuk deep widget trees
>
> #### Teknik Optimasi Lanjutan
>
> **React Native:**
>
> - Penggunaan **Hermes Engine** untuk mengurangi startup time 30-50%
> - **Code Splitting** dengan Metro bundler untuk mengurangi bundle size
>
> **Flutter:**
>
> - **Shader Precompilation** untuk menghindari jank animasi pertama kali
> - **Dart Tree Shaking** menghapus kode tidak terpakai secara agresif
>
> #### Edge Cases dan Batasan
>
> - **React Native:** Kesulitan implementasi custom GPU-intensive animation tanpa native module
> - **Flutter:** Ukuran binary besar untuk aplikasi sederhana karena embedded engine
> - Keduanya: Pembatasan akses hardware khusus seperti NFC advanced features
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun aplikasi video player dengan custom controls:
> - React Native: Implementasi native module untuk hardware decoding
> - Flutter: Plugin FFI untuk integrasi langsung dengan libVLC
> 2. Benchmark memory usage pada list dengan 10.000 item:
> - Ukur performa VirtualizedList (RN) vs ListView.builder (Flutter)
>
> #### Tools dan Sumber Daya
>
> - **React Native:** Flipper (debugging), Reanimated (animasi), Reactotron (logging)
> - **Flutter:** Dart DevTools, Flame (game engine), Riverpod (state management)
> - Cloud testing: Firebase Test Lab, AWS Device Farm
>
> #### Bacaan Lanjutan
>
> - "Flutter Complete Reference" (2023) oleh Alberto Miola - Bab 12 (Platform Channels)
> - "React Native Architecture Deep Dive" (2024) oleh Marek Kalnik
> - Paper: "Comparative Analysis of Cross-Platform Frameworks" (ACM Computing Surveys 2024)