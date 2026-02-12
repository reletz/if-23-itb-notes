---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Android dengan Kotlin]]

> [!cornell] Android Screen Adaptation and Density-Independent Units
>
> > ## Questions/Cues
> >
> > - Mengapa px tidak direkomendasikan untuk layout?
> > - Bagaimana menghitung dp ke px aktual?
> > - Perbedaan penggunaan sp vs dp
> > - Kategori density bucket Android
> > - Dampak density layar pada rendering
> >
> > ## Reference Points
> >
> > - Android Development with Kotlin (Halaman 4-11, 55-57)
>
> > ### Konsep Dimensi Independen-Densitas
> >
> > **Density-independent pixels (dp)** adalah unit pengukuran yang memastikan ukuran konsisten di berbagai perangkat Android dengan kepadatan layar berbeda. Android menggunakan dp sebagai standar pengukuran untuk elemen UI karena menyesuaikan dengan kepadatan layar aktual perangkat. Satu dp setara dengan satu piksel pada layar 160 dpi (baseline density).
> >
> > **Scale-independent pixels (sp)** khusus digunakan untuk ukuran teks, karena mempertimbangkan preferensi ukuran font pengguna. Jika pengguna mengatur ukuran font besar di sistem, teks yang menggunakan sp akan otomatis menyesuaikan. Contoh praktis: Tombol sebaiknya menggunakan ukuran 48dp untuk tinggi minimum yang dapat disentuh, sementara teks body menggunakan 16sp.
> >
> > **Pixel aktual (px)** tidak direkomendasikan karena menghasilkan tampilan tidak konsisten. Misalnya, elemen berukuran 100px akan terlihat sangat kecil di layar xxhdpi (480dpi) tetapi besar di layar mdpi (160dpi).
> >
> > ### Density Bucket dan Konversi
> >
> > Android mengelompokkan perangkat ke dalam density bucket untuk menyederhanakan adaptasi antarmuka:
> >
> > | Kualifikasi | Deskripsi       | Perkiraan DPI |
> >
> > |-------------|-----------------|---------------|
> >
> > | ldpi        | Low density     | 120 dpi       |
> >
> > | mdpi        | Medium density  | 160 dpi       |
> >
> > | hdpi        | High density    | 240 dpi       |
> >
> > | xhdpi       | Extra-high      | 320 dpi       |
> >
> > | xxhdpi      | Extra-extra-high| 480 dpi       |
> >
> > | xxxhdpi     | Ultra-high      | 640 dpi       |
> >
> > Rumus konversi dp ke px:
> >
> > **px = dp × (dpi / 160)**
> >
> > Contoh: Elemen 100dp di layar xhdpi (320dpi) = 100 × (320/160) = 200px. Pengembang harus menyediakan aset gambar terpisah untuk tiap bucket guna menghindari penskalaan otomatis yang mengurangi kualitas.
> >
> > ### Siklus Rendering View
> >
> > Proses rendering UI Android terdiri dari tiga tahap berurutan:
> >
> > 1. **Measure**: Menghitung dimensi semua view berdasarkan constraint parent dan ukuran konten
> > 2. **Layout**: Menentukan posisi akhir setiap view berdasarkan hasil pengukuran
> > 3. **Draw**: Render grafis ke layar berdasarkan hasil pengukuran dan layout
> >
> > Margin dan padding memengaruhi proses ini secara berbeda. Margin adalah ruang di luar batas view yang memengaruhi posisi relatif terhadap view lain, sementara padding adalah ruang di dalam batas view yang memengaruhi posisi konten internal. Contoh praktis: Tombol dengan margin 16dp akan memiliki jarak dari elemen sekitarnya, sedangkan padding 8dp membuat teks di dalam tombol tidak menempel ke tepi.
> >
> > ### Praktik Terbaik Adaptasi Layar
> >
> > 1. Selalu gunakan dp untuk dimensi non-teks dan sp untuk teks
> > 2. Hindari nilai dimensi absolut, gunakan constraint relatif (dibahas di catatan lain)
> > 3. Uji layout di berbagai density menggunakan Android Studio Layout Validation Tool
> > 4. Sediakan alternatif layout untuk orientasi landscape dan layar lebar
> > 5. Gunakan VectorDrawable untuk ikon agar tetap tajam di semua density
> >
> > Contoh kasus: Aplikasi e-commerce harus menampilkan tombol "Beli" dengan ukuran konsisten di semua perangkat. Dengan menetapkan tinggi 48dp dan lebar 120dp, tombol akan tetap mudah disentuh dan proporsional baik di tablet maupun ponsel kecil.

> [!cornell] #### Summary
>
> **Unit dp dan sp** merupakan fondasi adaptasi layar Android yang memastikan konsistensi visual di berbagai kepadatan layar. Penerapan yang tepat menghindari masalah skala otomatis dan meningkatkan aksesibilitas. Proses rendering yang melibatkan **measure-layout-draw** menjelaskan bagaimana sistem mengubah spesifikasi layout menjadi tampilan aktual. Pengembang harus memahami **density bucket** dan teknik konversi dp-px untuk optimasi aset grafis. **Kombinasi unit independen-densitas dengan constraint relatif** menghasilkan UI yang responsif.

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Konversi Unit
>
> Konversi dp-px dapat dimodelkan sebagai fungsi linier:
>
> `f(dpi) = dp * (dpi / 160)`
>
> Untuk layar 320dpi (xhdpi), faktor skala = 2.0. Implementasi aktual di sistem Android menggunakan rumus diskrit untuk menghindari pecahan:
>
> ```java
>
> public static int dpToPx(int dp, float density) {
>
> return Math.round(dp * density);
>
> }
>
> ```
>
> Perhatikan bahwa pembulatan dapat menyebabkan perbedaan 1px di beberapa perangkat. Solusi: Gunakan nilai dp genap untuk menghindari artefak render.
>
> #### Optimisasi Multi-Density
>
> Teknik advanced untuk mengurangi ukuran APK:
>
> - Gunakan WebP format dengan lossless compression
> - Implementasi resource qualifiers: drawable-xxhdpi, drawable-xxxhdpi
> - Gunakan teknik density stripping di Gradle:
>
> ```gradle
>
> android {
>
> splits {
>
> density {
>
> enable true
>
> exclude "ldpi", "mdpi"
>
> }
>
> }
>
> }
>
> ```
>
> #### Kasus Edge
>
> 1. Perangkat dengan aspect ratio ekstrim (19:9 atau 21:9) mungkin memerlukan nilai dimensi berbeda
> 2. Mode malam/daya rendah dapat mengubah persepsi visual density
> 3. Perangkat dengan DPI tidak standar (mis. 250dpi) akan dipetakan ke bucket terdekat
> 4. Pengguna dengan pengaturan font sistem custom bisa memengaruhi layout
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun Density Calculator App yang mengonversi dp-sp-px secara interaktif
> 2. Analisis performa rendering dengan GPU Overdraw di berbagai density
> 3. Implementasikan adaptive layout yang berbeda untuk hdpi dan xxhdpi
> 4. Eksperimen dengan constraint berbeda di berbagai ukuran layar
>
> #### Tools dan Resources
>
> - Android Screen Compatibility Test Suite (CTS)
> - Pixel 4 XL emulator dengan density 560dpi
> - Library: AndroidKTX (ekstensi dp/sp)
> - Alat online: Density Converter (designers-toolbox.com)
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi: "Support different pixel densities" (developer.android.com)
> - Buku: "Android High Performance Programming" (Ch. 5 - Rendering Optimization)
> - Paper: "A Systematic Review of Android Screen Fragmentation"
> - Tutorial: "Mastering Android Screen Adaptation" (Udacity Nanodegree)