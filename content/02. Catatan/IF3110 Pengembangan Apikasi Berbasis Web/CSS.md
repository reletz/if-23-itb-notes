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
> > - Apa itu CSS?
> >     
> > - Bagaimana CSS bekerja dengan DOM?
> >     
> > - Apa itu CSS Cascade?
> >     
> > - Struktur aturan CSS (ruleset)?
> >     
> > - Jenis-jenis CSS Selector?
> >     
> > - Apa itu CSS Specificity?
> >     
> > - Apa itu CSS Combinators?
> >     
> > - Konsep CSS Layout?
> >     
> > - Apa itu CSS Box Model?
> >     
> > - Apa itu Flexbox & Grid?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-03a-HTML--CSS.pdf
> >     
> 
> > ### Definisi dan Cara Kerja CSS
> >
> > **CSS** (Cascading **Style Sheets)** adalah bahasa yang digunakan untuk mendeskripsikan presentasi atau tampilan visual dari dokumen yang ditulis dalam HTML. CSS mengontrol bagaimana elemen HTML akan ditampilkan, termasuk warna, font, layout, dan spasi.
> >
> > Cara Kerja CSS dengan DOM:
> > 
> > Browser pertama-tama memuat dan mem-parsing HTML untuk membuat struktur pohon yang disebut DOM (Document Object Model). Setelah itu, browser akan memuat dan mem-parsing file CSS. Aturan-aturan gaya dari CSS kemudian "ditempelkan" ke node-node yang sesuai di dalam DOM sebelum halaman akhirnya dirender dan ditampilkan kepada pengguna.
> > 
> > ![[Pasted image 20250908085001.png]]
> >
> > ### The CSS Cascade
> >
> > Ini adalah algoritma inti yang digunakan browser untuk menyelesaikan konflik ketika ada beberapa aturan CSS yang menargetkan elemen yang sama. Urutan prioritasnya adalah sebagai berikut:
> >
> > 1. **Position and Order:** Urutan di mana aturan CSS Anda muncul. Aturan yang datang terakhir akan menimpa aturan sebelumnya jika prioritas lainnya sama.
> >     
> > 2. **Specificity:** Sebuah algoritma yang menentukan seberapa spesifik sebuah selector. Selector yang lebih spesifik akan menang.
> >     
> > 3. **Origin:** Asal dari CSS, apakah itu dari style default browser, ekstensi, atau CSS yang Anda tulis (authored CSS). Authored CSS akan lebih diutamakan.
> >     
> > 4. **Importance:** Aturan yang memiliki `!important` akan mendapatkan prioritas tertinggi, bahkan mengalahkan inline styles.
> >     
> >
> > ### Aturan, Selector, dan Specificity
> >
> > **Struktur Aturan CSS (Ruleset):**
> >
> > ```css
> > /* 'p' adalah selector */
> > p {
> >  /* 'color' adalah property, 'blue' adalah value */
> >  color: blue;
> >  font-size: 16px;
> > }
> > ```
> >
> > **Jenis-jenis Selector:**
> >
> > - **Element Selector:** Menargetkan semua elemen dengan nama tag tertentu. Cth: `div`.
> >     
> > - **Class Selector:** Menargetkan elemen dengan atribut `class` tertentu. Diawali dengan titik (`.`). Cth: `.info`.
> >     
> > - **ID Selector:** Menargetkan satu elemen unik dengan atribut `id` tertentu. Diawali dengan tagar (`#`). Cth: `#unique`.
> >     
> >
> > **CSS Specificity (Kekhususan):** Ini adalah sistem skor untuk menentukan selector mana yang akan diprioritaskan. 
> > 
> > ![[Pasted image 20250908085332.png]]
> > 
> > Hirarkinya dari yang paling tinggi ke rendah:
> >
> > 1. **Inline Style:** (cth: `<p style="color: red;">`) - Paling spesifik.
> >     
> > 2. **ID Selector:** (`#unique`)
> >     
> > 3. **Class, Pseudo-class, Attribute Selector:** (`.info`, `:hover`)
> >     
> > 4. **Element** & **Pseudo-element Selector:** (`p`, `::before`)
> > 
> > Contoh:
> > ![[Pasted image 20250908085214.png]]
> > 		Di gambar kedua, `Hello World!` akan berwarna hijau *instead of* merah.
> >
> > **Praktik Terbaik:** Gunakan _class_ untuk styling. Hindari penggunaan ID untuk styling (simpan untuk JavaScript) dan minimalkan penggunaan `!important`.
> >
> > ### CSS Combinators
> >
> > **Combinators** mendefinisikan hubungan antara selector-selector:
> >
> > - **Descendant Selector (spasi):** `.container div` (memilih semua `div` _di dalam_ `.container`, tidak peduli seberapa dalam).
> >     
> > - **Child Selector (>):** `.container > div` (hanya memilih `div` yang merupakan _anak langsung_ dari `.container`).
> >     
> > - **Adjacent Sibling Selector (+):** `h1 + p` (memilih elemen `p` yang berada _tepat setelah_ elemen `h1` pada level yang sama).
> >     
> > - **General Sibling Selector (~):** `h1 ~ p` (memilih _semua_ elemen `p` yang berada setelah `h1` pada level yang sama).
> >     
> >
> > ### Konsep CSS Layout
> >
> > CSS Box Model: Setiap elemen HTML pada dasarnya adalah sebuah "kotak". Kotak ini terdiri dari empat lapisan dari dalam ke luar: Content (konten teks/gambar), Padding (ruang di sekitar konten, di dalam batas), Border (garis batas), dan Margin (ruang di luar batas, memisahkan elemen dengan yang lain).
> >
> >![[Pasted image 20251019221744.png]]
> >
> > **Display Property:** Mengontrol bagaimana elemen ditampilkan dan berinteraksi dengan elemen lain. Nilai yang umum adalah:
> >
> > - `block`: Memulai di baris baru dan mengambil lebar penuh.
> >     
> > - `inline`: Mengalir bersama teks dan hanya mengambil lebar seperlunya.
> >     
> > - `flex`: Mengaktifkan model layout Flexbox.
> >     
> > - `grid`: Mengaktifkan model layout Grid.
> >     
> > - `none`: Menyembunyikan elemen sepenuhnya (tidak memakan ruang).
> >     
> >
> > **Flexbox:** Sebuah model layout _satu dimensi_ (baik baris atau kolom) yang sangat efektif untuk mengatur, menyelaraskan, dan mendistribusikan ruang di antara item dalam sebuah container.
> >
> > **Grid:** Sebuah model layout _dua dimensi_ (baris dan kolom), yang dirancang untuk layout halaman yang lebih kompleks dan terstruktur.
> > 
> > ![[Pasted image 20251019221837.png]]

> [!cornell] #### Summary
> **CSS** adalah bahasa styling yang bekerja dengan menargetkan elemen HTML di dalam DOM dan menerapkan aturan visual pada mereka. Browser menggunakan algoritma Cascade dan Specificity untuk menentukan aturan mana yang akan diterapkan jika terjadi konflik. Konsep fundamental dalam layout CSS adalah Box Model, yang mendefinisikan setiap elemen sebagai sebuah kotak dengan content, padding, border, dan margin. Untuk menciptakan layout yang **modern dan responsif, CSS menyediakan sistem layout yang kuat seperti Flexbox (untuk layout satu dimensi) dan Grid (untuk layout dua dimensi).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: `position` Property
> 
> Selain `display`, properti `position` sangat krusial untuk layout. Nilai utamanya adalah:
> 
> - `static`: Posisi default, mengikuti alur normal dokumen.
>     
> - `relative`: Elemen dapat digeser dari posisi normalnya menggunakan `top`, `right`, `bottom`, `left`, tanpa mengubah posisi elemen lain.
>     
> - `absolute`: Elemen diposisikan relatif terhadap _ancestor terdekat yang memiliki posisi non-static_. Elemen ini akan keluar dari alur normal dokumen.
>     
> - `fixed`: Elemen diposisikan relatif terhadap _viewport_ (jendela browser). Elemen akan tetap di tempat yang sama bahkan saat halaman di-scroll.
>     
> - `sticky`: Gabungan antara `relative` dan `fixed`. Elemen akan berperilaku `relative` hingga mencapai titik tertentu saat scroll, lalu menjadi
>