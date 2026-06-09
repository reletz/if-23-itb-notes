---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] Compose Modifiers and Layout System
>
> > ## Questions/Cues
> >
> > - Apa itu Modifier dan mengapa urutan pemanggilan Modifier sangat penting?
> > - Bagaimana `Column`, `Row`, dan `Box` berbeda dalam mengatur posisi anak-anaknya?
> > - Kapan sebaiknya menggunakan `ConstraintLayout` dibanding layout dasar Compose?
> > - Bagaimana cara membuat list yang dapat discroll menggunakan `Column` atau `Row`?
> > - Apa perbedaan `CutCornerShape`, `RoundedCornerShape`, dan `CircleShape`?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 11-30)
>
> > ### Modifier: Dekorator Elemen Compose
> >
> > **Modifier** adalah objek yang digunakan untuk mendekorasi elemen Compose, memberikan parameter layout, atau menetapkan perilaku interaktif. Modifier diterapkan sebagai argumen pertama (secara konvensi) pada composable dan dirantai menggunakan operator titik (`.`).
> >
> > Aturan paling kritis tentang Modifier: **urutan pemanggilan sangat berpengaruh pada hasil akhir**. Modifier diterapkan dari luar ke dalam, sehingga menukar urutan `padding` dan `border` menghasilkan tampilan yang berbeda:
> >
> > ```kotlin
> > // Border di luar padding (border lebih besar)
> > Modifier.border(2.dp, Color.Red).padding(16.dp)
> >
> > // Padding di luar border (border di dalam ruang padding)
> > Modifier.padding(16.dp).border(2.dp, Color.Red)
> > ```
> >
> > Operasi Modifier yang umum digunakan:
> >
> > | Modifier | Fungsi |
> > |---|---|
> > | `fillMaxWidth()` | Melebar mengisi lebar induk sepenuhnya |
> > | `fillMaxSize()` | Mengisi seluruh ruang yang tersedia |
> > | `padding(dp)` | Menambahkan ruang di dalam elemen |
> > | `border(width, color, shape)` | Menggambar tepi di sekeliling elemen |
> > | `background(color, shape)` | Mengisi latar belakang dengan warna dan bentuk |
> > | `clickable { }` | Menjadikan elemen dapat diklik dengan lambda callback |
> > | `size(dp)` | Menetapkan ukuran tetap |
> > | `wrapContentSize()` | Mengecilkan elemen sesuai kontennya |
> >
> > ### Shape dalam Modifier
> >
> > Modifier `background` dan `border` menerima argumen `shape` untuk menentukan bentuk elemen:
> >
> > - **`CutCornerShape(percent)`** — sudut dipotong lurus membentuk sudut miring (bevel)
> > - **`RoundedCornerShape(dp/percent)`** — sudut dibulatkan, paling umum digunakan
> > - **`CircleShape`** — pintasan untuk `RoundedCornerShape(50%)`, menghasilkan lingkaran sempurna jika elemen berbentuk persegi
> >
> > ### Layout Dasar: Column, Row, Box
> >
> > Compose menyediakan tiga layout dasar yang setara dengan `LinearLayout` (vertikal/horizontal) dan `FrameLayout` di sistem View:
> >
> > ```mermaid
> > flowchart LR
> >     subgraph Column["Column (Vertikal)"]
> >         direction TB
> >         C1["Item 1"]
> >         C2["Item 2"]
> >         C3["Item 3"]
> >         C1 --- C2 --- C3
> >     end
> >     subgraph Row["Row (Horizontal)"]
> >         direction LR
> >         R1["Item 1"] --- R2["Item 2"] --- R3["Item 3"]
> >     end
> >     subgraph Box["Box (Tumpuk)"]
> >         B1["Layer Bawah"]
> >         B2["Layer Atas"]
> >         B1 -.- B2
> >     end
> > ```
> >
> > **`Column`** menyusun anak-anaknya secara **vertikal** dari atas ke bawah. Parameter utama: `verticalArrangement` (jarak antar item) dan `horizontalAlignment` (perataan horizontal).
> >
> > **`Row`** menyusun anak-anaknya secara **horizontal** dari kiri ke kanan. Parameter utama: `horizontalArrangement` dan `verticalAlignment`.
> >
> > **`Box`** menumpuk anak-anaknya di atas satu sama lain, mirip `FrameLayout`. Posisi setiap anak dapat dikontrol dengan `modifier.align(Alignment.*)`, misalnya `Alignment.Center`, `Alignment.BottomEnd`, atau `Alignment.TopStart`.
> >
> > ### ConstraintLayout
> >
> > **`ConstraintLayout`** dari library `androidx.constraintlayout:constraintlayout-compose` digunakan untuk tata letak yang lebih kompleks di mana posisi komponen bergantung pada komponen lain. Cocok untuk UI datar yang dalam (flat hierarchy) yang tidak dapat diekspresikan secara bersih dengan Column/Row bersarang.
> >
> > Tiga langkah utama penggunaan:
> >
> > 1. **`createRefs()`** — membuat referensi untuk setiap komponen yang akan di-constraint
> > 2. **`constrainAs(ref) { ... }`** — mendefinisikan constraint satu komponen terhadap yang lain
> > 3. **`linkTo(anchor)`** — menghubungkan sisi (top, bottom, start, end) ke anchor lain
> >
> > ```kotlin
> > ConstraintLayout {
> >     val (title, subtitle) = createRefs()
> >
> >     Text("Judul", modifier = Modifier.constrainAs(title) {
> >         top.linkTo(parent.top, margin = 16.dp)
> >         start.linkTo(parent.start)
> >     })
> >
> >     Text("Sub", modifier = Modifier.constrainAs(subtitle) {
> >         top.linkTo(title.bottom, margin = 8.dp)
> >         start.linkTo(title.start)
> >     })
> > }
> > ```
> >
> > ### Column dan Row yang Dapat Discroll
> >
> > Secara default, `Column` dan `Row` tidak dapat discroll jika kontennya melebihi ukuran layar. Untuk mengaktifkan scrolling, gunakan Modifier dengan `rememberScrollState()`:
> >
> > - **Column yang bisa discroll vertikal**: `Modifier.verticalScroll(rememberScrollState())`
> > - **Row yang bisa discroll horizontal**: `Modifier.horizontalScroll(rememberScrollState())`
> >
> > `rememberScrollState()` membuat dan mengingat state scroll antar recomposition. Perlu dicatat bahwa pendekatan ini **tidak efisien untuk list panjang** karena seluruh konten dirender sekaligus — gunakan `LazyColumn`/`LazyRow` untuk itu.

> [!cornell] #### Summary
>
> **Modifier** mendekorasi, memberikan constraint layout, dan menetapkan perilaku pada elemen Compose; urutan rantai Modifier sangat kritis karena diterapkan dari luar ke dalam. Tiga layout dasar Compose: **`Column`** (vertikal), **`Row`** (horizontal), dan **`Box`** (tumpuk dengan `align()`), masing-masing memiliki parameter pengaturan jarak dan perataan. **`ConstraintLayout`** tersedia untuk tata letak kompleks berbasis constraint dengan `createRefs()` dan `constrainAs{}`. Scrolling pada `Column`/`Row` diaktifkan melalui `verticalScroll`/`horizontalScroll` dengan **`rememberScrollState()`**, meskipun untuk daftar panjang `LazyColumn` jauh lebih efisien.

> [!ad-libitum]- Additional Information
>
> #### Modifier.weight() untuk Distribusi Ruang Proporsional
>
> Di dalam `Column` atau `Row`, `Modifier.weight(float)` mendistribusikan ruang yang tersisa secara proporsional, mirip dengan `layout_weight` di `LinearLayout`:
>
> ```kotlin
> Row {
>     Box(Modifier.weight(1f).background(Color.Red))   // 1/3 lebar
>     Box(Modifier.weight(2f).background(Color.Blue))  // 2/3 lebar
> }
> ```
>
> #### Arrangement dan Alignment
>
> `Column` dan `Row` mendukung pengaturan distribusi anak-anaknya:
>
> - `Arrangement.SpaceBetween` — jarak merata di antara item, tidak ada di tepi
> - `Arrangement.SpaceAround` — jarak merata di sekitar item, termasuk tepi (setengah di ujung)
> - `Arrangement.SpaceEvenly` — jarak merata termasuk tepi penuh
> - `Arrangement.Center` — semua item dikelompokkan di tengah
>
> #### Intrinsic Measurements
>
> Ketika menghadapi dependensi ukuran antar sibling (misalnya, dua Text yang ingin memiliki tinggi yang sama meski kontennya berbeda), gunakan `IntrinsicSize.Min` atau `IntrinsicSize.Max` pada `height` atau `width` Modifier induk.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat kartu profil pengguna menggunakan `Box` untuk menumpuk foto profil dengan badge status online, pastikan `CircleShape` diterapkan pada gambar
> 2. Eksperimen dengan urutan `padding` dan `border` di Modifier untuk memahami efek urutan secara visual
> 3. Migrasikan sebuah layout XML `ConstraintLayout` yang kompleks ke `ConstraintLayout` Compose
>
> #### Bacaan Lanjutan
>
> - Dokumentasi Resmi Android: "Layouts in Compose"
> - Dokumentasi Resmi Android: "Modifiers in Compose"
> - Codelab: "Jetpack Compose Layouts"
> - Blog: "ConstraintLayout in Compose" (Android Developers)
