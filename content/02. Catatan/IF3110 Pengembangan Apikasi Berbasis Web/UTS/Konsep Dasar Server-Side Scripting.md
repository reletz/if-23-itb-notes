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
> > - Apa itu _Web Stack_?
> >     
> > - Apa saja komponen utama _Web Stack_?
> >     
> > - Apa saja contoh _Web Stack_ yang populer?
> >     
> > - Apa itu _Server-Side Scripting_?
> >     
> > - Apa saja 4 aspek utama _Server-Side_?
> >     
> > - Bagaimana cara kerja _Routing_?
> >     
> > - Apa fungsi dari _Templating_?
> >     
> > - Bagaimana alur pemrosesan form?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-14
> >     
> 
> >### Apa itu Web Stack?
> >
> >_Web Stack_ adalah **kumpulan lapisan teknologi software** yang dibutuhkan untuk membangun dan menjalankan sebuah aplikasi web. Ini mencakup semua komponen mulai dari sistem operasi di level terendah hingga _framework_ di level tertinggi. Analogi sederhananya adalah seperti fondasi dan kerangka sebuah rumah; Anda memerlukan semua bagian ini agar rumah bisa berdiri dan berfungsi.
> >
> >### Komponen dan Contoh Web Stack
> >
> >Sebuah _Web Stack_ umumnya terdiri dari:
> >
> >1. **Sistem Operasi (Operating System):** Fondasi tempat semua software lain berjalan. Contoh: Linux, Windows Server.
> >    
> >2. **Web Server:** Software yang menerima permintaan HTTP dari klien (browser) dan mengirimkan respons. Contoh: Apache, NGINX, IIS.
> >    
> >3. **Database Server:** Sistem untuk menyimpan, mengelola, dan mengambil data secara terstruktur. Contoh: MySQL, MongoDB, PostgreSQL.
> >    
> >4. **Bahasa Pemrograman & Framework:** Logika inti dari aplikasi web ditulis di sini. Ini adalah "otak" dari aplikasi. Contoh: PHP (Laravel), Python (Django), JavaScript (Node.js).
> >     
> > 
> > Beberapa contoh _Web Stack_ yang populer:
> > 
> > - **LAMP:** **L**inux, **A**pache, **M**ySQL, **P**HP. Ini adalah salah satu stack klasik dan sangat populer.
> >     
> > - **MEAN:** **M**ongoDB, **E**xpress.js, **A**ngular, **N**ode.js. Stack modern yang sepenuhnya berbasis JavaScript.
> >     
> > - **MERN/MEVN:** Mirip dengan MEAN, namun menggunakan **R**eact atau **V**ue.js sebagai pengganti Angular.
> >     
> > - **WINS:** **W**indows Server, **I**IS, .**N**ET, **S**QL Server. Stack yang umum di lingkungan enterprise berbasis teknologi Microsoft.
> >     
> > 
> > ### Server-Side Scripting
> > 
> > _Server-Side Scripting_ adalah proses di mana **kode program dieksekusi di sisi server**, bukan di browser klien. Tugas utamanya adalah memproses permintaan, berinteraksi dengan database, dan menghasilkan konten dinamis (biasanya HTML) yang kemudian dikirimkan ke browser untuk ditampilkan.
> > 
> > Perbedaan kuncinya dengan _client-side scripting_ (seperti JavaScript biasa) adalah:
> > 
> > - **Server-Side:** Berjalan di server, bisa akses database, hasilnya adalah halaman HTML jadi.
> >     
> > - **Client-Side:** Berjalan di browser pengguna, tidak bisa akses database secara langsung, digunakan untuk membuat halaman interaktif.
> >     
> > 
> > ### Aspek Fundamental Server-Side
> > 
> > Ada empat pilar utama dalam pengembangan aplikasi sisi server:
> > 
> > 1. **Routing:**
> >     
> >     - **Apa itu?** _Routing_ adalah mekanisme yang **memetakan sebuah URL ke fungsi atau controller tertentu** di dalam aplikasi. Saat pengguna mengunjungi `https://aplikasi.com/profil`, sistem _routing_ akan menentukan fungsi mana yang harus dijalankan untuk menangani permintaan tersebut.
> >         
> >     - **Analogi:** Anggap _routing_ seperti resepsionis di sebuah kantor besar. Resepsionis (router) akan mengarahkan panggilan atau tamu (permintaan URL) ke departemen atau orang yang tepat (fungsi/controller).
> >         
> > 2. **Templating:**
> >     
> >     - **Apa itu?** _Templating_ adalah teknik untuk **memisahkan logika aplikasi dari presentasi (HTML)**. _Template_ adalah file HTML yang disisipi dengan _placeholder_ (penanda tempat) untuk data dinamis.
> >         
> >     - **Contoh:** Sebuah file template `hasil.html` bisa berisi: `<p>Sentimen: {{ sentiment }}</p>`. Saat dirender, _engine template_ akan mengganti `{{ sentiment }}` dengan nilai variabel yang sebenarnya (misalnya, "Positif").
> >         
> >     - **Tujuan:** Membuat kode lebih bersih, mudah dikelola, dan memungkinkan desainer bekerja pada tampilan tanpa harus menyentuh logika backend.
> >         
> > 3. **Form Processing:**
> >     
> >     - **Apa itu?** Ini adalah proses menangani data yang dikirim oleh pengguna melalui form HTML, biasanya menggunakan metode `POST`.
> >         
> >     - **Alur Kerja:**
> >         
> >         1. Pengguna mengisi form di browser dan menekan tombol _submit_.
> >             
> >         2. Browser mengirimkan data form ke URL yang ditentukan dalam atribut `action` form.
> >             
> >         3. Di server, fungsi yang terhubung dengan URL tersebut (melalui _routing_) akan menerima data.
> >             
> >         4. Fungsi tersebut kemudian memproses data (validasi, simpan ke database, dll.) dan mengirimkan respons, misalnya halaman sukses atau kembali ke form dengan pesan error.
> >             
> > 5. **Data Access:**
> >     
> >     - **Apa itu?** Ini merujuk pada cara aplikasi berinteraksi dengan sumber data, seperti **database atau sistem file**. Logika server-side bertanggung jawab untuk mengambil data yang akan ditampilkan atau menyimpan data baru yang dikirim oleh pengguna.
> >         

> [!cornell] #### Summary
> Server-side scripting adalah teknologi inti yang memungkinkan aplikasi web menjadi dinamis dengan menjalankan kode di server untuk memproses permintaan, mengakses data, dan menghasilkan HTML. Teknologi ini bergantung pada "Web Stack" (kumpulan software seperti OS, web server, dan database) dan diimplementasikan melalui aspek-aspek fundamental seperti _**Routing**_ (memetakan URL ke fungsi), _**Templating**_ (memisahkan logika dari tampilan), dan _**Form Processing**_ (menangani input pengguna).

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Siklus HTTP Request/Response
> 
> Seluruh proses server-side scripting adalah bagian dari siklus _Request/Response_ HTTP.
> 
> 1. **Request**: Browser pengguna mengirim permintaan HTTP ke server. Permintaan ini berisi:
>     
>     - **Method**: `GET` (minta data), `POST` (kirim data), dll.
>         
>     - **URL**: Alamat yang dituju.
>         
>     - **Headers**: Informasi tambahan seperti jenis browser, cookie, dll.
>         
>     - **Body**: (Khusus untuk `POST`) Data yang dikirim, misalnya dari form.
>         
> 2. **Processing**: Web server menerima permintaan dan meneruskannya ke aplikasi web. Aplikasi menjalankan logika yang sesuai (routing, akses database, dll.).
>     
> 3. **Response**: Server mengirimkan kembali respons HTTP ke browser, berisi:
>     
>     - **Status Code**: `200 OK`, `404 Not Found`, `500 Internal Server Error`, dll.
>         
>     - **Headers**: Informasi tambahan seperti tipe konten (`text/html`), cookie yang akan disimpan, dll.
>         
>     - **Body**: Konten utama, biasanya kode HTML yang akan ditampilkan browser.
>         
> 
> #### Perbandingan Kunci: Client-Side vs Server-Side
> 
> |**Aspek**|**Client-Side Scripting**|**Server-Side Scripting**|
> |---|---|---|
> |**Lokasi Eksekusi**|Browser pengguna|Server web|
> |**Tujuan Utama**|Manipulasi DOM, interaktivitas UI, validasi form instan|Logika bisnis, otentikasi, akses database, pemrosesan data|
> |**Bahasa Umum**|JavaScript, TypeScript|PHP, Python, Ruby, Java, Node.js (JavaScript)|
> |**Akses Data**|Tidak bisa langsung ke database (harus lewat API)|Bisa terhubung langsung ke database dan file sistem|
> 
> #### Eksplorasi Mandiri
> 
> - Coba buat sebuah "Hello World" sederhana menggunakan web framework seperti Flask (Python) atau Express (Node.js). Perhatikan bagaimana Anda mendefinisikan sebuah _route_ untuk URL root (`/`) dan mengembalikan sebuah string HTML.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **MDN Web Docs:** [Gambaran Umum Sisi Server](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction "null")
>     
> - **Flask Documentation:** [Quickstart Flask](https://flask.palletsprojects.com/en/2.0.x/quickstart/ "null")
>     
> - **Express.js:** [Hello world example](https://expressjs.com/en/starter/hello-world.html "null")
>