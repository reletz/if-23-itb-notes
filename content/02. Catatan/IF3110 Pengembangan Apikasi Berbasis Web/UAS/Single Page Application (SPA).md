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
> > - Apa itu SPA?
> >     
> > - Apa tujuan utama SPA?
> >     
> > - Beda SPA vs Tradisional?
> >     
> > - Contoh SPA populer?
> >     
> > - Apa keuntungan SPA?
> >     
> > - Apa kerugian SPA?
> >     
> > - Pendekatan Teknis: Hashes?
> >     
> > - Pendekatan Teknis: History API?
> >     
> > - Pendekatan Teknis: AJAX?
> >     
> > - Pendekatan Teknis: WebSockets?
> >     
> > - Pendekatan Teknis: Lainnya?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-09b-SPA.pdf
> >     
> 
> > ### Definisi Single Page Application (SPA)
> > 
> > **SPA** adalah aplikasi web atau situs web yang berinteraksi dengan pengguna dengan cara **menulis ulang halaman web saat ini secara dinamis** menggunakan data baru dari server.
> > 
> > Ini berbeda dengan metode standar browser yang **memuat seluruh halaman baru** setiap kali ada permintaan (misalnya, mengklik tautan).
> > 
> > Tujuan Utama:
> > 
> > Menciptakan transisi yang lebih cepat antar tampilan, sehingga membuat situs web terasa lebih responsif dan mirip dengan aplikasi native (aplikasi desktop atau seluler).
> > 
> > ### SPA vs. Aplikasi Web Tradisional
> > 
> > ![[Pasted image 20251221233548.png]]
> > ![[Pasted image 20251221233631.png]]
> > 
> > **Aplikasi Tradisional (Multi-Page Application):**
> > 
> > - **Model:** Setiap interaksi pengguna (misalnya, klik) memicu permintaan baru ke server.
> >     
> > - **Respon:** Server merespons dengan mengirimkan _seluruh halaman HTML baru_.
> >     
> > - **Efek:** Browser melakukan _refresh_ halaman penuh (halaman berkedip putih sesaat) untuk memuat konten baru.
> >     
> > - **Analogi:** Seperti membolak-balik halaman buku fisik. Setiap klik adalah membalik ke halaman baru yang utuh.
> >     
> > 
> > **Single Page Application (SPA):**
> > 
> > - **Model:** Sebagian besar sumber daya (HTML, CSS, JavaScript) dimuat **satu kali** di awal.
> >     
> > - **Respon:** Saat pengguna berinteraksi, SPA _tidak meminta halaman HTML baru_. Sebaliknya, ia meminta _data_ (biasanya dalam format JSON) dari server di latar belakang (menggunakan AJAX/Fetch).
> >     
> > - **Efek:** JavaScript di sisi klien menggunakan data tersebut untuk **memperbarui bagian-bagian tertentu** dari halaman yang ada secara dinamis (_dynamic rewrite_). Tidak ada _refresh_ halaman penuh.
> >     
> > - **Analogi:** Seperti buku ajaib. Anda tetap di halaman yang sama, dan saat Anda ingin melihat sesuatu yang baru, teks di halaman itu secara ajaib menulis ulang dirinya sendiri untuk menampilkan konten baru.
> >     
> > 
> > ### Contoh SPA Populer
> > 
> > Banyak situs web besar yang kita gunakan sehari-hari adalah SPA:
> > 
> > - **Google Workspace (GSuite):** Gmail, Maps, Drive, Calendar. (Perhatikan di Gmail, saat Anda mengklik email, hanya panel email yang berubah, bukan seluruh halaman).
> >     
> > - **Media Sosial:** Facebook, Twitter, Instagram.
> >     
> > - **Lainnya:** Whatsapp Web, GitHub.
> >     
> > 
> > ### Keuntungan (Advantages) SPA
> > 
> > 1. **Cepat & Responsif:** Sebagian besar sumber daya (HTML, CSS, Skrip) hanya dimuat sekali. Transisi antar "halaman" terasa instan karena hanya data kecil yang perlu diambil dari server.
> >     
> > 2. **Pengembangan Efisien:** Seringkali ada pemisahan yang jelas antara _frontend_ (SPA) dan _backend_ (API). Tim _backend_ hanya perlu menyediakan API, yang kemudian dapat digunakan oleh tim _frontend_ (web) dan tim _mobile_ (iOS/Android) secara bersamaan (_reusable backend code_).
> >     
> > 3. **Debugging:** Pengembang dapat dengan mudah memantau operasi jaringan (permintaan data JSON) dan menyelidiki elemen halaman menggunakan _developer tools_ browser.
> >     
> > 4. **Caching & Offline:** SPA dapat dengan efisien menyimpan data (_caching_) di penyimpanan lokal browser. Ini memungkinkannya untuk tetap berfungsi (meskipun terbatas) bahkan saat pengguna sedang _offline_.
> >     
> > 
> > ### Kerugian (Disadvantages) SPA
> > 
> > 1. **SEO (Search Engine Optimization):** Ini adalah tantangan terbesar. _Crawler_ mesin pencari (seperti Googlebot) secara historis kesulitan "melihat" konten yang dimuat secara dinamis oleh JavaScript. Mereka mungkin hanya melihat halaman HTML awal yang kosong. Ini memerlukan "trik" khusus seperti _Server-Side Rendering_ (SSR) untuk mengatasinya.
> >     
> > 2. **Pemuatan Awal Lambat:** Karena semua _framework_ JavaScript, CSS, dan HTML inti harus diunduh dan dieksekusi saat pertama kali pengguna mengunjungi situs, pemuatan awal bisa terasa berat dan lambat.
> >     
> > 3. **Membutuhkan JavaScript:** Jika pengguna karena alasan tertentu menonaktifkan JavaScript di browser mereka, SPA tidak akan berfungsi sama sekali.
> >     
> > 4. **Keamanan:** Lebih rentan terhadap serangan _Cross-Site Scripting_ (XSS). Karena SPA sangat bergantung pada skrip sisi klien yang memanipulasi data, jika data yang dimasukkan pengguna tidak divalidasi atau "dibersihkan" (sanitized) dengan benar, penyerang bisa menyuntikkan skrip berbahaya.
> >     
> > 5. **Memory Leaks:** Jika tidak dikelola dengan baik, aplikasi JavaScript yang berjalan lama di satu halaman dapat mengalami _memory leaks_ (kebocoran memori), yang menghabiskan sumber daya sistem pengguna dan membuat aplikasi lambat seiring waktu.
> >     
> > 
> > ### Pendekatan Teknis Implementasi SPA
> > 
> > **Document Hashes (URI Fragments):**
> > 
> > - **Cara Kerja:** Menggunakan tanda pagar (`#`) di URL (misal: `example.com/#/profile`).
> >     
> > - **Detail:** Bagian setelah `#` (yaitu _fragment_) tidak dikirim ke server oleh browser. JavaScript di sisi klien dapat "mendengarkan" perubahan pada _hash_ ini (via event `onhashchange`) dan kemudian memuat konten yang sesuai secara dinamis. Ini adalah cara lama untuk membuat _routing_ di sisi klien.
> >     
> > 
> > **History API:**
> > 
> > - **Cara Kerja:** Pendekatan yang lebih baru dan ramah SEO. Menggunakan fitur browser `History API` (seperti `pushState()` dan `replaceState()`).
> >     
> > - **Detail:** Ini memungkinkan JavaScript untuk mengubah URL yang ditampilkan di bilah alamat browser **tanpa memuat ulang halaman**. URL terlihat "bersih" (misal: `example.com/profile`). Ini juga memungkinkan tombol _back_ dan _forward_ browser berfungsi seperti yang diharapkan.
> >     
> > 
> > **AJAX (Asynchronous JavaScript and XML):**
> > 
> > - **Cara Kerja:** Ini adalah teknologi inti yang memungkinkan SPA.
> >     
> > - **Detail:** Memungkinkan JavaScript untuk membuat permintaan data ke server di _latar belakang_ (asinkron) tanpa menghentikan interaksi pengguna. Meskipun namanya XML, saat ini hampir selalu menggunakan **JSON** (JavaScript Object Notation) untuk transfer data. Menggunakan `XMLHttpRequest` (lebih tua) atau **Fetch API** (lebih baru).
> >     
> > 
> > **WebSockets:**
> > 
> > - **Cara Kerja:** Teknologi komunikasi _real-time_ dua arah (_bidirectional_).
> >     
> > - **Detail:** Membuka koneksi yang persisten antara klien dan server. Berbeda dengan AJAX (di mana klien harus _meminta_ data), WebSockets memungkinkan _server juga dapat mendorong_ (push) data ke klien secara instan. Sangat berguna untuk aplikasi obrolan, notifikasi _live_, atau data _feed_ yang terus diperbarui.
> >     
> > 
> > **Teknologi Lainnya:**
> > 
> > - **Server-Sent Events (SSE):** Mirip WebSockets tetapi hanya _satu arah_ (server-ke-klien). Efisien jika klien hanya perlu _menerima_ pembaruan dari server.
> >     
> > - **Browser Plugins:** (Contoh: Silverlight, Flash, Java Applets). Ini adalah teknologi _usang_ (legacy) dan tidak lagi digunakan untuk pengembangan web modern.
> >     

> [!cornell] #### Summary
> 
> **Single Page Application (SPA)** adalah pendekatan pengembangan web modern di mana **aplikasi dimuat satu kali** dan konten halaman **diperbarui secara dinamis** tanpa _refresh_ halaman penuh, memberikan pengalaman pengguna yang cepat dan mulus seperti aplikasi _native_. Berbeda dengan aplikasi tradisional yang **memerlukan pemuatan halaman baru** untuk setiap interaksi, SPA menggunakan teknologi _client-side_ seperti **AJAX** (untuk mengambil data) dan **History API** (untuk mengelola URL) guna mengubah tampilan secara dinamis. Meskipun SPA menawarkan keuntungan besar dalam **kecepatan, caching, dan penggunaan kembali kode** _**backend**_, SPA juga menghadapi tantangan teknis signifikan, terutama dalam hal **SEO (Search Engine Optimization), waktu muat awal yang lambat, dan peningkatan risiko keamanan** seperti XSS.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: History API vs. Hash Fragments
> 
> - **Hash Fragments (`#`):**
>     
>     - **Pro:** Sangat mudah diimplementasikan di sisi klien. Tidak memerlukan konfigurasi server sama sekali, karena server tidak pernah melihat bagian `#` dari URL.
>         
>     - **Kontra:** URL terlihat "tidak bersih" (menggunakan `#`). Kurang baik untuk SEO karena _crawler_ mungkin menganggapnya sebagai bagian dari halaman yang sama.
>         
> - **History API (`pushState`):**
>     
>     - **Pro:** Menghasilkan URL yang "bersih" dan "nyata" (misalnya, `/profile`, `/settings`). Jauh lebih baik untuk SEO dan pengalaman pengguna (misalnya, URL mudah dibagikan).
>         
>     - **Kontra:** Memerlukan konfigurasi di sisi **server**. Jika pengguna berada di `example.com/profile` dan menekan tombol _refresh_, browser akan membuat permintaan _GET_ ke `/profile` di server. Server _harus_ cukup pintar untuk tidak mencari file bernama `profile`, melainkan **mengembalikan file `index.html` (inti SPA) yang sama** untuk semua rute. SPA kemudian akan membaca URL (`/profile`) dan menampilkan komponen yang benar. Ini disebut _client-side routing fallback_.
>         
> 
> #### Pendalaman Teknis: Tantangan SEO dan Solusinya
> 
> Masalah inti SEO adalah _crawler_ mesin pencari mungkin tidak mengeksekusi JavaScript, sehingga hanya melihat HTML awal yang mungkin kosong (misalnya, `<div id="app"></div>`).
> 
> 1. **Server-Side Rendering (SSR):**
>     
>     - **Konsep:** Server _menjalankan_ aplikasi JavaScript di _backend_ untuk setiap permintaan. Server menghasilkan HTML penuh dari halaman yang diminta, lalu mengirimkannya ke klien.
>         
>     - **Hasil:** Pemuatan pertama sangat cepat dan _crawler_ melihat HTML lengkap (bagus untuk SEO). Setelah itu, SPA mengambil alih di sisi klien (_hydration_).
>         
>     - **Contoh Framework:** Next.js (untuk React), Nuxt.js (untuk Vue).
>         
> 2. **Static Site Generation (SSG):**
>     
>     - **Konsep:** Mirip SSR, tetapi semua halaman HTML dibuat **pada saat** _**build**_ (sebelum di-_deploy_).
>         
>     - **Hasil:** Menghasilkan situs statis yang sangat cepat, aman, dan sempurna untuk SEO. Ideal untuk konten yang tidak sering berubah (blog, portofolio, dokumentasi).
>         
>     - **Contoh Framework:** Gatsby, Astro, Next.js (juga mendukung SSG).
>         
> 3. **Dynamic Rendering / Pre-rendering:**
>     
>     - **Konsep:** Server mendeteksi jika pengunjung adalah _crawler_ (misalnya, Googlebot). Jika ya, server mengirimkan versi HTML halaman yang sudah di-_render_ sebelumnya (versi statis). Jika pengunjung adalah pengguna manusia, server mengirimkan SPA normal.
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Framework SPA Populer:**
>     
>     - [React](https://reactjs.org/ "null") (Dikembangkan oleh Facebook)
>         
>     - [Angular](https://angular.io/ "null") (Dikembangkan oleh Google)
>         
>     - [Vue.js](https://vuejs.org/ "null") (Dibuat oleh komunitas, dipimpin Evan You)
>         
> - **Dokumentasi Web MDN:**
>     
>     - [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API "null")
>         
>     - [Fetch API (AJAX)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API "null")
>         
>     - [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API "null")
>         
> - **Pola Solusi SEO:**
>     
>     - [Render di Web](https://web.dev/rendering-on-the-web/ "null") (Artikel Google yang menjelaskan SSR, CSR, SSG, dll.)
>