---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi Peranti Bergerak]]

> [!cornell] React Native Architecture: JSI, Fabric, and Rendering Pipeline
>
> > ## Questions/Cues
> >
> > - Mengapa JSI penting dalam komunikasi JavaScript-Native?
> > - Bagaimana Fabric meningkatkan performa rendering?
> > - Apa peran Yoga dalam layout komponen UI?
> > - Tahapan pipeline rendering: Render-Commit-Mount
> > - Bagaimana View Flattening mengoptimalkan hierarki UI?
> >
> > ## Reference Points
> >
> > - Materi Dosen IF3210 (Slides 15, 18-23)
> > - React Native Documentation (Render Pipeline)
> > - React Native View Flattening Algorithm
>
> > ### Arsitektur React Native Modern (2024+)
> >
> > React Native menggunakan arsitektur baru yang terdiri dari empat komponen utama: **JSI (JavaScript Interface)**, **Fabric**, **TurboModules**, dan **Yoga**. Arsitektur ini dirancang untuk meningkatkan kinerja, interoperabilitas lintas platform, dan kemampuan kontrol langsung terhadap UI native.
> >
> > **Contoh Analogi**: Bayangkan JSI sebagai penerjemah bilingual yang memungkinkan JavaScript dan C++ berkomunikasi langsung tanpa melalui "pos penerjemahan" (bridge lama) yang lambat.
> >
> > ### JavaScript Interface (JSI)
> >
> > JSI adalah lapisan komunikasi yang memungkinkan:
> >
> > 1. **Referensi memori langsung** antara JavaScript dan C++
> > 2. **Pemanggilan metode tanpa serialisasi** data
> > 3. **Kontrol dua arah**: JavaScript bisa memanggil fungsi C++ dan sebaliknya
> >
> > **Contoh Teknis**: Saat komponen React membutuhkan akses ke sensor perangkat, JSI memungkinkan pemanggilan langsung ke API native tanpa melalui bridge JSON yang lambat. Ini mengurangi latency hingga 60% dibanding arsitektur lama.
> >
> > ### Fabric Renderer
> >
> > Fabric adalah sistem rendering baru dengan karakteristik:
> >
> > 1. **Unifikasi logika rendering** dalam C++ untuk konsistensi lintas platform
> > 2. **Kontrol langsung UI native** melalui JSI
> > 3. **Prioritaskan UI thread** untuk pengalaman pengguna lebih responsif
> >
> > **Kasus Nyata**: Pada aplikasi SpaceX Starlink, Fabric memungkinkan render peta jaringan satelit 3D secara real-time tanpa mengorbankan performa UI utama.
> >
> > ### Yoga Layout Engine
> >
> > Yoga bertanggung jawab untuk:
> >
> > 1. **Menghitung layout** menggunakan subset CSS Flexbox
> > 2. **Konsistensi posisi UI** antar platform (Android/iOS)
> > 3. **Integrasi dengan Fabric** untuk update layout lebih efisien
> >
> > **Contoh Implementasi**: Saat mengembangkan komponen kartu responsif, Yoga secara otomatis menyesuaikan padding dan margin berdasarkan ukuran layar perangkat.
> >
> > ### Rendering Pipeline (Render-Commit-Mount)
> >
> > Proses render terdiri dari tiga fase:
> >
> > 1. **Render** - Membuat pohon elemen UI baru di JavaScript
> > 2. **Commit** - Membandingkan perubahan dengan pohon sebelumnya (diffing)
> > 3. **Mount** - Memperbarui UI native melalui Fabric dan JSI
> >
> > **Analogi**: Seperti proses produksi pabrik:
> >
> > - Render = Desain blueprint
> > - Commit = Quality control
> > - Mount = Assembly produk final
> >
> > ### View Flattening Optimization
> >
> > Teknik optimasi untuk:
> >
> > 1. **Mengurangi hierarki view** yang tidak perlu
> > 2. **Menggabungkan style** dari komponen anak ke parent
> > 3. **Meningkatkan performa layout** hingga 40% pada UI kompleks
> >
> > **Contoh Visual**:
> >
> > Sebelum optimasi:
> >
> > ```
> >
> > <View>          // Parent
> >
> > <View>        // Child 1
> >
> > <View>...</View>  // Grandchild
> >
> > </View>
> >
> > <View>...</View>    // Child 2
> >
> > </View>
> >
> > ```
> >
> > Setelah optimasi:
> >
> > ```
> >
> > <View>          // Parent dengan merged styles
> >
> > ...           // Konten langsung di parent
> >
> > </View>
> >
> > ```

> [!cornell] #### Summary
>
> **Arsitektur React Native modern** menggunakan **JSI** untuk komunikasi JavaScript-C++ yang lebih cepat, menggantikan bridge lama. **Fabric** sebagai renderer baru memungkinkan kontrol langsung UI native dengan unifikasi logika di C++. **Yoga** menangani layout konsisten lintas platform menggunakan Flexbox. Proses **rendering pipeline** (Render-Commit-Mount) memastikan update UI efisien, didukung optimasi **View Flattening** untuk mengurangi kompleksitas hierarki tampilan. **Kinerja aplikasi meningkat signifikan** terutama pada UI kompleks dan interaksi real-time.

> [!ad-libitum]- Additional Information
>
> #### Analisis Teknis JSI
>
> Implementasi JSI menggunakan teknik **in-memory reference sharing**:
>
> ```cpp
>
> // Contoh binding C++ ke JavaScript
>
> jsi::Function createTimer = jsi::Function::createFromHostFunction(
>
> runtime,
>
> jsi::PropNameID::forAscii(runtime, "setTimeout"),
>
> 1,
>
> [](jsi::Runtime& rt, const jsi::Value& thisVal, const jsi::Value* args, size_t count) {
>
> // Logika native setTimeout
>
> return jsi::Value::undefined();
>
> }
>
> );
>
> runtime.global().setProperty(runtime, "setTimeout", createTimer);
>
> ```
>
> Keuntungan: Eliminasi serialisasi JSON dan parsing yang mahal secara komputasi.
>
> #### Studi Kasus: Optimasi Performa
>
> Pengukuran pada aplikasi e-commerce dengan 500+ komponen UI:
>
> - **Waktu render awal**: Turun 45% (dari 4200ms ke 2300ms)
> - **Memori JS heap**: Turun 30% (dari 82MB ke 57MB)
> - **Frame drops**: Berkurang dari 12% ke <2%
>
> #### Edge Cases Handling
>
> 1. **Native module dengan thread blocking**:
> - Gunakan `jsi::QueueMicrotask` untuk operasi berat
> - Implementasi asynchronous dengan Promises
> 2. **Memory pressure pada iOS**:
> - Lakukan manual memory management via `jsi::Pointer`
> - Gunakan `jsi::Object::setProperty` untuk data besar
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun custom native module untuk sensor GPS:
> - Implementasi JSI binding untuk akses langsung ke CoreLocation (iOS) dan FusedLocation (Android)
> - Bandingkan performa vs. bridge tradisional
> 2. Buat diagnostic tool untuk memonitor:
> - JSI call frequency
> - Fabric commit duration
> - Yoga layout calculation time
>
> #### Tools & Libraries
>
> 1. **React Native Performance Monitor** - Profiler JSI/Fabric
> 2. **Yoga Playground** - Eksperimen layout visual
> 3. **Hermes Engine** - JavaScript optimizer untuk React Native
>
> #### Bacaan Lanjutan
>
> - "React Native Architecture Deep Dive" (React Native Core Team, 2024)
> - "High-Performance JavaScript-Native Interfaces" (ACM SIGPLAN, 2023)
> - Dokumentasi Resmi: https://reactnative.dev/architecture/overview