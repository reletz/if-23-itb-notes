---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Prinsip Desain Visualisasi
>
> > ## Questions/Cues
> >
> > - Apa prinsip dasar desain visualisasi yang baik (intentional choice, statement of goal, define knowledge before structure)?
> > - Kapan sebaiknya memakai format default dan kapan berinovasi?
> > - Apa itu reader context dan compatibility with reality?
> > - Mengapa pattern dan consistency penting, dan apa aturan sederhananya?
> > - Apa maksud "comparisons need to compare", serta konsep data-ink ratio dan lie factor?
> >
> > ## Reference Points
> >
> > - IF5100 — Dataviz (Pages 36-38, 49-71)
>
> > ### Prinsip Dasar Desain
> >
> > Dari **Iliinsky dan Steele (2011)**, desain visualisasi dimulai dari **pilihan yang disengaja (intentional choice)**:
> >
> > - **Rumuskan tujuan secara ringkas** (statement of goal). Pembaca punya kebutuhan, dan keberhasilan Anda diukur dari terpenuhinya kebutuhan itu.
> > - **Data punya properti** (tipe, jumlah nilai unik, hubungan) yang membatasi encoding yang masuk akal.
> > - **Tetapkan pengetahuan yang diinginkan sebelum struktur**: tentukan dulu apa yang ingin pembaca pahami, baru pilih jenis chart.
> > - Pakai **encoding yang sesuai**. **Warna sulit** dan tidak berurutan, sehingga gunakan secukupnya.
> > - **Gunakan default, kecuali...**
> >
> > Agenda kuliah untuk bagian ini: data viz design, visual encoding, contoh, dan diskusi.
> >
> > ### Default vs Format Inovatif
> >
> > Pertanyaan kuncinya: apa **biaya** bagi Anda dan pembaca untuk membuat dan mempelajari format encoding baru dibanding **nilai** yang diberikan? Jika ada solusi yang benar-benar superior (dinilai **pembaca**, bukan ego Anda), silakan berinovasi. Jika tugas selesai dengan format standar, **hemat tenaga semua orang** dan pakai format standar.
> >
> > ### Reader Context dan Compatibility with Reality
> >
> > Faktor konteks pembaca: **titles, tags, tables**, penggunaan **warna**, **color blindness** (sekitar 8% pria punya defisiensi warna merah-hijau), dan **directional orientation**.
> >
> > **Compatibility** adalah kesesuaian encoding dengan realitas pembaca sehingga decoding mudah. Ada dua jenis konvensi:
> >
> > - **Natural convention (fisik)**: misalnya nilai besar di atas, lalu kecil di bawah. Contoh di slide (Gambar 4-7): menaruh perahu di atas pesawat terasa janggal karena di dunia fisik pesawat berada di atas.
> > - **Cultural convention**: merah berarti bahaya atau rugi, hijau berarti aman atau untung (dengan perkecualian budaya tertentu), waktu mengalir kiri ke kanan.
> >
> > ### Pattern dan Consistency
> >
> > Manusia mudah mengenali kesamaan bentuk, posisi, warna, ritme, dan perilaku; kemampuan ini fondasi bahasa dan pembelajaran. Dua implikasinya bagi desain:
> >
> > 1. Pembaca akan **melihat pola dan menganggapnya disengaja**, entah Anda merencanakannya atau tidak.
> > 2. Ketika pola terdeteksi, pembaca akan **mengharapkan pelanggaran pola bermakna**.
> >
> > **Aturan sederhana**: konsisten dalam keanggotaan, urutan, dan encoding lain. *Hal yang sama harus tampak sama, hal yang berbeda harus tampak berbeda.* Contohnya, kategori "Jawa Barat" harus selalu berwarna sama di semua panel, dan urutan kategori pada legenda sama dengan urutan batang.
> >
> > ### Comparisons Need to Compare
> >
> > Bila ingin pembaca membandingkan nilai, **susun representasinya secara ekuivalen lalu letakkan berdekatan**, seperti foto yang dibandingkan berdampingan, bukan di ruangan berbeda. Konsekuensinya: skala sumbu yang sama, panel berdampingan (**small multiples**), dan nilai yang ingin dibandingkan ditempatkan sedekat mungkin.
> >
> > Slide juga memuat contoh "Selecting Structure" yang baik dan beberapa slide "Observe!" untuk dianalisis kritis bersama kelas, serta pesan **Keep It Simple**: kerumitan yang tidak perlu membuat visualisasi gagal.
> >
> > ### Elemen Visualisasi (Rangkuman Spoerri)
> >
> > | Perceptual coding | Interaction | Information density |
> > | --- | --- | --- |
> > | Position, size, orientation, texture, shape, color, shading, depth cues, surface, motion, stereo, proximity, similarity, continuity, connectedness, closure, containment | Direct manipulation, immediate feedback, linked displays, animate shift of focus, dynamic sliders, semantic zoom, focus+context, details-on-demand, output sebagai input | **Maximize data-ink ratio**, **maximize data density**, **minimize lie factor** |
> >
> > ```mermaid
> > graph TD
> >     D["Desain visualisasi baik"] --> G["Tujuan ringkas<br/>&amp; kebutuhan pembaca"]
> >     D --> E["Encoding sesuai tipe data"]
> >     D --> C["Compatibility<br/>(fisik &amp; budaya)"]
> >     D --> K["Konsisten:<br/>sama tampak sama"]
> >     D --> P["Perbandingan:<br/>berdekatan &amp; ekuivalen"]
> >     D --> S["Sederhana<br/>(data-ink tinggi)"]
> > ```
>
> [!cornell] #### Summary
> Desain visualisasi yang baik berangkat dari tujuan yang dirumuskan ringkas dan kebutuhan pembaca, dengan encoding yang sesuai properti data; gunakan format default kecuali format inovatif jelas lebih bernilai bagi pembaca. Perhatikan konteks pembaca (judul, warna, buta warna, orientasi) dan compatibility dengan konvensi fisik maupun budaya. Karena pembaca menganggap pola sebagai hal yang disengaja, terapkan konsistensi (yang sama tampak sama, yang berbeda tampak berbeda), letakkan nilai yang dibandingkan berdekatan dan ekuivalen, serta jaga kesederhanaan dengan memaksimalkan data-ink ratio dan data density serta meminimalkan lie factor.

> [!ad-libitum]- Additional Information
>
> #### Data-Ink Ratio dan Lie Factor (Tufte)
> **Data-ink ratio** = tinta yang merepresentasikan data dibagi total tinta pada grafik; hapus gridline berlebih, border, dan dekorasi (chartjunk). **Lie factor** = (ukuran efek yang tampak di grafik) / (ukuran efek di data); nilai ideal 1, dan di luar rentang 0,95 sampai 1,05 dianggap distorsi. Contoh distorsi klasik: sumbu y bar chart tidak dimulai dari nol, atau ikon 3D yang membesar di dua dimensi sekaligus.
>
> #### Praktik Aksesibilitas
> Jangan mengandalkan warna saja: tambahkan bentuk marker (`style=` di seaborn), label langsung, atau pola. Periksa dengan simulator buta warna. Kontras teks terhadap latar minimal 4,5:1 (pedoman WCAG).
>
> #### Small Multiples
> Dengan `sns.FacetGrid` atau `sns.relplot(..., col="kategori")` kita menerapkan "comparisons need to compare": panel identik, sumbu sama (`sharex`, `sharey`), sehingga mata cukup membandingkan posisi.
>
> #### Proyek Eksplorasi Mandiri
> - Ambil satu chart buruk dari media (sumbu terpotong, 3D, warna pelangi), hitung lie factor-nya, lalu gambar ulang dengan matplotlib.
> - Buat versi sebelum dan sesudah dari satu plot: hapus chartjunk, ganti judul menjadi kesimpulan, dan pakai warna secara konsisten.
>
> #### Bacaan Lanjutan
> - Noah Iliinsky dan Julie Steele, *Designing Data Visualizations* (O'Reilly, 2011).
> - Edward Tufte, *The Visual Display of Quantitative Information*.
> - Donna Wong, *The Wall Street Journal Guide to Information Graphics*.
> - Knaflic, *Storytelling with Data*.
> - *The Big Book of Dashboards*.
