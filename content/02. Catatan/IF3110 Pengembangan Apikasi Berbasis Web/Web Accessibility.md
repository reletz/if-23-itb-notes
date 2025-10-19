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
> > - Definisi Aksesibilitas Web?
> >     
> > - Mengapa aksesibilitas penting?
> >     
> > - Siapa saja yang diuntungkan?
> >     
> > - Apa itu WCAG?
> >     
> > - 4 Prinsip Aksesibilitas?
> >     
> > - Contoh implementasi konkret?
> >     
> > - Cara mengevaluasi aksesibilitas?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 34-41
> >     
> 
> > ### Definisi Web Accessibility (Aksesibilitas Web)
> > 
> > **Web Accessibility** (sering disingkat **a11y**) adalah praktik merancang dan mengembangkan situs web, _tools_, dan teknologi sehingga dapat digunakan oleh semua orang, termasuk **penyandang disabilitas**. Tujuannya adalah untuk menghilangkan hambatan yang mungkin menghalangi akses dan interaksi dengan konten di web.
> > 
> > - **Kutipan Kunci:** Seperti yang dikatakan oleh Tim Berners-Lee, "Kekuatan Web terletak pada universalitasnya. Akses oleh semua orang tanpa memandang disabilitas adalah aspek esensial."
> >     
> > - **Analogi:** Bayangkan aksesibilitas web seperti membangun sebuah gedung. Kita tidak hanya membangun tangga, tetapi juga menyediakan _ramp_ (jalan landai), lift, dan pintu yang lebar. Tujuannya agar semua orang, baik yang berjalan, menggunakan kursi roda, atau membawa kereta bayi, dapat masuk dan menggunakan gedung tersebut dengan mudah. Di dunia web, "ramp" ini bisa berupa teks alternatif untuk gambar atau kemampuan navigasi menggunakan keyboard.
> >     
> > 
> > ### Pentingnya Aksesibilitas dan Siapa yang Diuntungkan
> > 
> > Aksesibilitas web penting karena memastikan partisipasi digital yang setara. Ini mencakup berbagai jenis disabilitas:
> > 
> > - **Visual:** Kebutaan, rabun senja, buta warna.
> >     
> > - **Auditori:** Tuli atau kesulitan mendengar.
> >     
> > - **Motorik:** Kesulitan menggunakan tangan, tremor, atau kelumpuhan.
> >     
> > - **Kognitif:** Gangguan belajar, kesulitan fokus, atau masalah memori.
> >     
> > 
> > Namun, manfaat aksesibilitas **jauh lebih luas** dan juga membantu pengguna tanpa disabilitas dalam situasi tertentu (_situational limitations_):
> > 
> > - **Pengguna Lansia:** Mengalami penurunan kemampuan penglihatan atau motorik.
> >     
> > - **Pengguna di Lokasi Terang/Bising:** Sulit melihat layar di bawah sinar matahari atau mendengar audio di tempat ramai.
> >     
> > - **Pengguna dengan Koneksi Lambat:** Teks alternatif akan muncul lebih dulu sebelum gambar dimuat.
> >     
> > - **Pengguna dengan Perangkat Berbeda:** Navigasi keyboard berguna jika mouse rusak atau saat menggunakan perangkat tanpa mouse.
> >     
> > 
> > ### Standar Aksesibilitas: WCAG
> > 
> > **Web Content Accessibility Guidelines (WCAG)** adalah standar internasional yang dikembangkan oleh W3C Web Accessibility Initiative (WAI). WCAG menyediakan serangkaian pedoman teknis yang dapat diikuti oleh developer untuk membuat konten web lebih mudah diakses. Versi yang paling banyak dirujuk adalah WCAG 2.0 (yang juga merupakan standar ISO/IEC 40500) dan versi terbarunya.
> > 
> > ### Empat Prinsip Utama Aksesibilitas (POUR)
> > 
> > WCAG dibangun di atas empat prinsip dasar yang harus dipenuhi agar sebuah situs dianggap aksesibel:
> > 
> > 1. **Perceivable (Dapat Dipersepsikan):** Informasi dan komponen antarmuka harus dapat disajikan kepada pengguna dengan cara yang dapat mereka persepsikan. Ini berarti pengguna harus bisa mengenali konten, terlepas dari indra mana yang mereka gunakan.
> >     
> >     - _Contoh:_ Menyediakan teks alternatif (`alt text`) untuk gambar agar pembaca layar (_screen reader_) bisa menjelaskannya.
> >         
> > 2. **Operable (Dapat Dioperasikan):** Komponen antarmuka dan navigasi harus dapat dioperasikan. Pengguna harus bisa berinteraksi dengan semua kontrol dan elemen interaktif.
> >     
> >     - _Contoh:_ Semua fungsionalitas harus bisa diakses sepenuhnya hanya dengan menggunakan keyboard, tanpa bergantung pada mouse.
> >         
> > 3. **Understandable (Dapat Dipahami):** Informasi dan pengoperasian antarmuka harus dapat dipahami. Konten harus jelas, konsisten, dan dapat diprediksi.
> >     
> >     - _Contoh:_ Menggunakan bahasa yang sederhana dan memberikan instruksi yang jelas untuk mengisi formulir, serta memberi tahu pengguna ketika terjadi kesalahan input.
> >         
> > 4. **Robust (Andal):** Konten harus cukup andal untuk dapat diinterpretasikan secara konsisten oleh berbagai macam agen pengguna, termasuk teknologi asistif (seperti _screen reader_).
> >     
> >     - _Contoh:_ Menggunakan HTML yang valid dan semantik agar struktur halaman dapat dipahami dengan benar oleh teknologi masa depan.
> >         
> > 
> > ### Contoh Implementasi dan Evaluasi
> > 
> > - **Teks Alternatif:** `<img src="logo.png" alt="Logo W3C Web Accessibility Initiative">`
> >     
> > - **Navigasi Keyboard:** Pastikan urutan fokus saat menekan tombol `Tab` logis dan semua elemen interaktif (link, tombol, form) dapat dijangkau dan diaktifkan.
> >     
> > - **Transkrip & Teks Film (Caption):** Sediakan transkrip untuk konten audio (seperti podcast) dan _caption_ untuk video.
> >     
> > - **Evaluasi:** Proses evaluasi dapat dilakukan dengan kombinasi:
> >     
> >     - **Tools Otomatis:** Seperti Lighthouse di Chrome DevTools, WAVE, atau axe. Tools ini dapat menangkap banyak masalah umum.
> >         
> >     - **Pengujian Manual:** Menavigasi situs hanya dengan keyboard, menggunakan _screen reader_ (seperti NVDA atau VoiceOver), dan memeriksa kontras warna secara manual.
> >         

> [!cornell] #### Summary
> 
> **Web Accessibility adalah praktik fundamental untuk memastikan bahwa web bersifat universal dan dapat digunakan oleh semua orang, termasuk penyandang disabilitas, dengan menghilangkan hambatan akses. Praktik ini berlandaskan pada empat prinsip utama yang dikenal sebagai POUR (Perceivable, Operable, Understandable, Robust) dan diatur oleh standar internasional Web Content Accessibility Guidelines (WCAG). Implementasi konkretnya mencakup penyediaan teks alternatif untuk gambar, memastikan fungsionalitas penuh melalui navigasi keyboard, dan menggunakan HTML semantik. Manfaatnya tidak hanya dirasakan oleh penyandang disabilitas, tetapi juga oleh berbagai pengguna dalam situasi terbatas, sehingga pada akhirnya menciptakan pengalaman web yang lebih baik dan lebih inklusif untuk semua orang.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: HTML Semantik vs. `<div>`
> 
> Salah satu pilar dari prinsip **Robust** adalah penggunaan HTML semantik. Daripada membangun segalanya dengan `<div>`, gunakan elemen yang sesuai dengan fungsinya:
> 
> - `<nav>` untuk blok navigasi.
>     
> - `<main>` untuk konten utama halaman.
>     
> - `<article>` untuk konten mandiri seperti postingan blog.
>     
> - `<aside>` untuk konten sampingan seperti sidebar.
>     
> - `<button>` untuk aksi, bukan `<div onclick="...">`.
>     
> 
> Mengapa ini penting? Karena _screen reader_ dan mesin pencari mengandalkan elemen-elemen ini untuk memahami struktur dan makna halaman Anda. Sebuah _screen reader_ bisa memberi tahu pengguna, "Ini adalah navigasi utama," yang jauh lebih berguna daripada hanya mengatakan, "Ini adalah sebuah grup elemen."
> 
> #### Pendalaman Teknis: ARIA (Accessible Rich Internet Applications)
> 
> Terkadang, HTML semantik saja tidak cukup, terutama untuk komponen web yang kompleks seperti _slider_, _tab_, atau _modal dialog_ yang dibangun dengan JavaScript. Di sinilah **ARIA** berperan. ARIA adalah sekumpulan atribut yang bisa Anda tambahkan ke elemen HTML untuk meningkatkan aksesibilitasnya.
> 
> - **Contoh:** Anda bisa menggunakan `role="alert"` pada sebuah `<div>` yang muncul untuk memberi tahu _screen reader_ agar segera membacakan pesan kesalahan tersebut. Atau menggunakan `aria-label` untuk memberikan nama yang lebih deskriptif pada sebuah tombol ikon.
>     
> - **Aturan Emas ARIA:** Aturan pertama penggunaan ARIA adalah: jika ada elemen HTML asli yang sudah memiliki aksesibilitas bawaan (seperti `<button>` atau `<input type="checkbox">`), **selalu gunakan elemen tersebut** daripada membuat versi `<div>` Anda sendiri lalu menambahkan atribut ARIA.
>     
> 
> #### Eksplorasi Mandiri
> 
> Lakukan audit aksesibilitas sederhana pada situs web favorit Anda:
> 
> 1. **Audit Otomatis:** Buka situs tersebut di Google Chrome, buka Developer Tools (F12), pilih tab **Lighthouse**, dan jalankan laporan untuk kategori **Accessibility**. Lihat skor dan rekomendasinya.
>     
> 2. **Tes Keyboard:** Coba navigasi seluruh situs hanya menggunakan tombol `Tab`. Apakah Anda bisa mencapai semua link dan tombol? Apakah urutannya logis? Apakah Anda bisa melihat elemen mana yang sedang aktif (memiliki _focus outline_)?
>     
> 3. **Tes Kontras:** Gunakan _color picker extension_ pada browser untuk memeriksa rasio kontras antara teks dan latar belakangnya pada beberapa bagian situs. Apakah memenuhi standar WCAG (minimal 4.5:1 untuk teks normal)?
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **W3C Web Accessibility Initiative (WAI):** [https://www.w3.org/WAI/](https://www.w3.org/WAI/ "null")
>     
> - **WCAG 2.1 Guidelines:** [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/ "null")
>     
> - **The A11Y Project (Checklist & Resources):** [https://www.a11yproject.com/](https://www.a11yproject.com/ "null")
>     
> - **MDN Web Docs - Accessibility:** [https://developer.mozilla.org/en-US/docs/Web/Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility "null")
>