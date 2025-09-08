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
> > - Apa itu HTML?
> >     
> > - Analogi HTML & CSS?
> >     
> > - Struktur dasar dokumen HTML?
> >     
> > - Anatomi elemen HTML?
> >     
> > - Apa itu elemen Block vs Inline?
> >     
> > - Apa itu HTML5?
> >     
> > - Fitur-fitur baru di HTML5?
> >     
> > - Apa itu Elemen Semantik?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-03a-HTML--CSS.pdf
> >     
> 
> > ### Definisi & Analogi HTML
> >
> > **HTML (Hypertext Markup Language)** adalah bahasa standar yang digunakan untuk membuat dan menyusun konten di halaman web. HTML bekerja dengan cara mendeskripsikan struktur konten menggunakan elemen-elemen yang "ditandai" (markup).
> >
> > **Analogi yang Mudah Dipahami:**
> >
> > - **HTML adalah Kerangka (Skeleton):** HTML menyediakan struktur dasar dan konten utama dari sebuah halaman web, sama seperti kerangka yang menopang tubuh manusia. Ia mendefinisikan bagian-bagian seperti kepala (`<head>`), badan (`<body>`), judul (`<h1>`), paragraf (`<p>`), dll.
> >     
> >
> > - **CSS sebagai "Pakaian":** Walaupun catatan ini fokus pada HTML, penting untuk mengingat bahwa CSS-lah yang nantinya akan memberikan gaya visual pada kerangka HTML ini.
> > 
> > ![[Pasted image 20250908084843.png]]
> > 
> > ### Struktur Dokumen dan Elemen HTML
> >
> > Sebuah dokumen HTML memiliki struktur dasar yang terdiri dari elemen-elemen yang saling bersarang (nested).
> >
> > ```html
> > <!DOCTYPE html> <!-- Deklarasi tipe dokumen, wajib untuk HTML5 -->
> > <html> <!-- Elemen root/akar dari semua elemen lain -->
> >  <head>
> >    <!-- Berisi meta-informasi tentang dokumen, tidak ditampilkan di body -->
> >    <title>Judul Halaman</title>
> >  </head>
> >  <body>
> >    <!-- Semua konten yang terlihat oleh pengguna ada di sini -->
> >    <h1>Ini adalah Judul Utama</h1>
> >    <p>Ini adalah sebuah paragraf.</p>
> >  </body>
> > </html>
> > ```
> >
> > **Anatomi Elemen HTML:**
> >
> > - **Opening Tag:** `<h1>` - Menandai awal dari sebuah elemen.
> >     
> >
> > - **Content:** `Ini adalah Judul Utama` - Konten yang berada di dalam elemen.
> >     
> >
> > - **Closing Tag:** `</h1>` - Menandai akhir dari sebuah elemen.
> >     
> >
> > - **Attribute:** `<a href="https://itb.ac.id">` - Informasi tambahan pada elemen. `href` adalah nama atribut dan `"https://itb.ac.id"` adalah nilainya.
> >     
> >
> > ### Elemen Block vs. Inline
> >
> > - **Block-level Element:**
> > 	- Selalu dimulai di baris baru.
> > 	- Mengambil seluruh lebar yang tersedia (memanjang ke kiri dan kanan sejauh mungkin).
> > 	- Contoh: `<div>`, `<p>`, `<h1>` - `<h6>`, `<ul>`, `<li>`.
> >
> > - **Inline Element:**
> > 	- Tidak dimulai di baris baru; ia akan melanjutkan di baris yang sama.
> > 	- Hanya mengambil lebar sebanyak yang diperlukan oleh kontennya.
> > 	- Tidak bisa berisi elemen block-level.
> > 	- Contoh: `<span>`, `<a>`, `<img>`.
> >
> > ### Pengenalan HTML5 dan Fitur Barunya
> >
> > **HTML5** adalah revisi besar dari standar HTML yang memperkenalkan banyak fitur baru untuk mendukung aplikasi web modern.
> >
> > **Fitur-fitur Utama HTML5:**
> >
> > 1. **Elemen Semantik:** Elemen yang mendeskripsikan artinya dengan jelas baik untuk browser maupun developer, seperti `<header>`, `<footer>`, `<nav>`, `<section>`, dan `<article>`. Ini membantu struktur halaman menjadi lebih jelas dan SEO-friendly.
> >     
> > 2. **Forms 2.0:** Peningkatan pada form dengan tipe input baru seperti `date`, `email`, `number`, `range` yang memiliki validasi bawaan.
> >     
> > 3. **Web Storage:** Mekanisme penyimpanan data di sisi klien yang lebih baik dari cookies, yaitu `localStorage` (data persisten) dan `sessionStorage` (data per sesi).
> >     
> > 4. **Audio & Video:** Elemen `<audio>` dan `<video>` untuk menyematkan media secara native tanpa memerlukan plugin pihak ketiga seperti Flash.
> >     
> > 5. **Canvas & SVG:** `<canvas>` untuk menggambar grafis 2D secara dinamis menggunakan JavaScript (berbasis bitmap), dan **SVG** (Scalable Vector Graphics) untuk grafis berbasis vektor yang skalabel.
> >     
> > 6. **Geolocation:** API untuk mendapatkan lokasi geografis pengguna (dengan izin).
> >     
> > 7. **Web Workers & Service Workers:** Memungkinkan skrip berjalan di background (thread terpisah) tanpa mengganggu antarmuka pengguna, penting untuk PWA (Progressive Web Apps) dan fungsionalitas offline.
> >     

> [!cornell] #### Summary
> **HTML (Hypertext Markup Language)** berfungsi sebagai fondasi dari setiap halaman web, menyediakan struktur dan konten melalui sistem elemen bertingkat (nested). Analogi yang tepat adalah sebagai kerangka (skeleton) yang menopang seluruh "tubuh" halaman. HTML5 merupakan evolusi besar yang memperkenalkan elemen semantik seperti `<header>` dan `<footer>` untuk struktur yang lebih bermakna, serta API canggih seperti Web Storage, Geolocation, dan elemen media native (`<audio>`, `<video>`) untuk membangun aplikasi web yang lebih kaya dan interaktif.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Atribut `data-*`
> 
> Atribut `data-*` memungkinkan Anda menyimpan informasi tambahan atau data kustom pada elemen HTML standar. Ini sangat berguna untuk JavaScript, karena Anda dapat menyimpan data yang relevan langsung di elemennya tanpa harus mencarinya di tempat lain.
> 
> ```html
> <div id="user" data-user-id="123" data-role="admin">John Doe</div>
> ```
>
> #### Eksplorasi Mandiri: Aksesibilitas Web (Web Accessibility)