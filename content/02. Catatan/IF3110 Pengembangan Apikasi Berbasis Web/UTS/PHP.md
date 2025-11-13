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
> > - Apa itu PHP?
> >     
> > - Bagaimana sintaks dasar PHP?
> >     
> > - Apa saja tipe data di PHP?
> >     
> > - Bagaimana cara kerja Array?
> >     
> > - Apa saja jenis Array?
> >     
> > - Bagaimana cara mendefinisikan Fungsi?
> >     
> > - Apa itu _variable scope_?
> >     
> > - Apa itu variabel _predefined_?
> >     
> > - Bagaimana cara menangani Input?
> >     
> > - Bagaimana cara menghasilkan Output?
> >     
> > - Bagaimana cara akses File & Database?
> >     
> >
> > ## Reference Points
> >
> > - Slides 15-64
> >     
> 
> > ### Apa itu PHP?
> > 
> > PHP adalah singkatan rekursif dari **PHP: Hypertext Preprocessor**. Ini adalah bahasa skrip _open-source_ serbaguna yang dieksekusi di sisi server. Peran utamanya adalah untuk pengembangan web, di mana PHP dapat disematkan langsung ke dalam HTML.
> > 
> > **Karakteristik Utama:**
> > 
> > - **Server-Side:** Kode PHP dieksekusi di server, lalu hasilnya (biasanya HTML) dikirim ke browser klien. Ini berbeda dari JavaScript yang berjalan di browser.
> >     
> > - **Tujuan:** Dapat digunakan untuk apa saja, tetapi fokus utamanya adalah skrip sisi server, seperti mengumpulkan data form, menghasilkan konten halaman dinamis, serta mengirim dan menerima _cookies_.
> >     
> > 
> > ### Sintaks Dasar PHP
> > 
> > - **Tag Pembuka/Penutup:** Kode PHP ditulis di antara tag `<?php` dan `?>`.
> >     
> > - **Komentar:**
> >     
> >     - `// Komentar satu baris`
> >         
> >     - `# Komentar satu baris (gaya shell)`
> >         
> >     - `/* Komentar multi-baris */`
> >         
> > - **Statement:** Setiap instruksi atau _statement_ harus diakhiri dengan titik koma (`;`). Contoh: `$nama = "Andi";`
> >     
> > - **Menyisipkan dalam HTML:**
> >     
> >     ```
> >     <body>
> >       <p>Halo, nama saya <?php echo "Budi"; ?>.</p>
> >     </body>
> >     ```
> >     
> > 
> > ### Tipe Data di PHP
> > 
> > PHP mendukung beberapa jenis tipe data:
> > 
> > 1. **Scalar Types (Tipe Skalar):** Menyimpan satu nilai.
> >     
> >     - `boolean`: `true` atau `false`.
> >         
> >     - `integer`: Bilangan bulat (misal: `10`, `-5`).
> >         
> >     - `float` (atau `double`): Bilangan desimal (misal: `3.14`).
> >         
> >     - `string`: Kumpulan karakter (misal: `"Halo dunia"`).
> >         
> > 2. **Compound Types (Tipe Gabungan):** Menyimpan banyak nilai.
> >     
> >     - `array`: Kumpulan pasangan kunci-nilai yang terurut.
> >         
> >     - `object`: Instans dari sebuah _class_.
> >         
> > 3. **Special Types (Tipe Khusus):**
> >     
> >     - `resource`: Referensi ke sumber daya eksternal (misal: koneksi database, file yang dibuka).
> >         
> >     - `NULL`: Mewakili variabel tanpa nilai.
> >         
> > 
> > ### Array di PHP
> > 
> > Array di PHP sebenarnya adalah sebuah **peta terurut (ordered map)**, yaitu tipe data yang mengasosiasikan _nilai_ dengan _kunci_. Ini membuatnya sangat fleksibel dan bisa digunakan sebagai:
> > 
> > - **Array Terindeks (Indexed Array):** Kunci berupa integer (otomatis).
> >     
> >     ```php
> >     $buah = array("Apel", "Jeruk", "Mangga"); atau $buah = ["Apel", "Jeruk"];
> >     ```
> >     
> > - **Array Asosiatif (Associative Array):** Kunci berupa string.
> > 
> >     ```php
> >     $pengguna = array("nama" => "Budi", "umur" => 25);
> >     ```
> >     
> > - **Array Multidimensi:** Array yang berisi array lain.
> >     
> > 
> > **Operasi Umum:**
> > 
> > - Mengakses elemen: `$buah[0]` atau `$pengguna["nama"]`.
> >     
> > - Menambah elemen: `$buah[] = "Durian";`.
> >     
> > - Menghitung jumlah elemen: `count($buah)`.
> >     
> > - Iterasi: Menggunakan loop `for` atau `foreach`.
> >     
> > 
> > ### Fungsi (Function) di PHP
> > 
> > Fungsi adalah blok kode yang dapat digunakan kembali.
> > 
> > - **Definisi:** `function namaFungsi($parameter1, $parameter2) { ... }`
> >     
> > - **Return Value:** Menggunakan `return $nilai;` untuk mengembalikan nilai.
> >     
> > - **Scope Variabel:**
> >     
> >     - **Lokal:** Variabel di dalam fungsi hanya bisa diakses di dalam fungsi itu saja.
> >         
> >     - **Global:** Untuk mengakses variabel global dari dalam fungsi, gunakan _keyword_ `global`. Contoh: `global $nama;`
> >         
> > - **Static Variable:** Variabel di dalam fungsi yang nilainya tetap dipertahankan di antara pemanggilan fungsi. Didefinisikan dengan `static $counter = 0;`.
> >     
> > 
> > ### Variabel Predefined
> > 
> > PHP menyediakan banyak variabel _built-in_ yang berisi informasi dari server, request, dll. Beberapa yang paling penting adalah:
> > 
> > - `$_GET`: Berisi data yang dikirim melalui URL (query string).
> >     
> > - `$_POST`: Berisi data yang dikirim melalui form dengan metode `POST`.
> >     
> > - `$_REQUEST`: Gabungan dari `$_GET`, `$_POST`, dan `$_COOKIE`.
> >     
> > - `$_FILES`: Berisi informasi file yang diunggah.
> >     
> > - `$_SESSION`: Berisi variabel sesi.
> >     
> > - `$_COOKIE`: Berisi HTTP cookies.
> >     
> > - `$_SERVER`: Berisi informasi tentang server dan lingkungan eksekusi.
> >     
> > 
> > ### Penanganan Input dan Output
> > 
> > PHP dapat menerima input dari berbagai sumber dan menghasilkan berbagai jenis output.
> > 
> > |**Sumber Input**|**Variabel/Fungsi**|**Contoh Penggunaan**|
> > |---|---|---|
> > |URL Parameter|`$_GET`|`go.php?id=1` diambil dengan `$_GET['id']`|
> > |HTML Form|`$_POST`, `$_FILES`|Mengambil data dari form login.|
> > |Cookies|`$_COOKIE`|Membaca status login pengguna.|
> > |Session|`$_SESSION`|Menyimpan `userId` setelah login.|
> > |File System|`fopen()`, `fread()`|Membaca file log.|
> > |Database|`mysql_query()`|Mengambil data produk dari database.|
> > 
> > |**Tipe Output**|**Fungsi**|**Contoh Penggunaan**|
> > |---|---|---|
> > |HTML|`echo`, `print`|Menampilkan teks atau variabel ke halaman.|
> > |File System|`fopen()`, `fwrite()`|Menulis data ke sebuah file.|
> > |Cookies|`setcookie()`|Mengatur cookie di browser pengguna.|
> > |Gambar|`imagegif()`, `imagepng()`|Membuat gambar secara dinamis.|

> [!cornell] #### Summary
> 
> PHP adalah bahasa skrip sisi server yang kuat, dirancang untuk disematkan dalam HTML guna menciptakan halaman web dinamis. Inti dari PHP terletak pada kemudahannya dalam mengelola data melalui tipe data fleksibel seperti array asosiatif, menangani input pengguna dari berbagai sumber (form, URL, cookies, sesi), dan berinteraksi dengan sumber daya eksternal seperti file sistem dan database. Penggunaan variabel _predefined_ seperti `$_POST` dan `$_GET` menjadi kunci dalam memproses permintaan HTTP dan membangun aplikasi web yang interaktif.

> [!ad-libitum]- Additional Information
> 
> #### Model Eksekusi PHP: Apache vs. NGINX
> 
> Cara PHP dieksekusi sangat bergantung pada web server yang digunakan.
> 
> 1. **Apache (dengan `mod_php`)**:
>     
>     - **Model:** _Process-driven_. Apache membuat _thread_ atau proses baru untuk setiap permintaan yang masuk.
>         
>     - **Karakteristik:** Model ini lebih sederhana untuk dikonfigurasi tetapi bisa memakan banyak memori dan CPU saat menangani banyak koneksi bersamaan, karena setiap proses memiliki _overhead_-nya sendiri.
>         
> 2. **NGINX (dengan PHP-FPM)**:
>     
>     - **Model:** _Event-driven_, _asynchronous_. NGINX menangani banyak koneksi dalam satu _thread_. Untuk kode PHP, NGINX akan meneruskan permintaan ke manajer proses terpisah yang disebut PHP-FPM (_FastCGI Process Manager_).
>         
>     - **Karakteristik:** Jauh lebih efisien dalam penggunaan memori dan dapat menangani ribuan koneksi bersamaan dengan performa tinggi. Ini adalah arsitektur modern yang paling umum digunakan saat ini.
>         
> 
> #### Fitur Baru di PHP 7+
> 
> PHP 7 membawa lompatan besar dalam performa dan fitur dibandingkan PHP 5.
> 
> - **Kecepatan:** Hingga dua kali lebih cepat dari PHP 5.6 berkat Zend Engine 3.
>     
> - **Strict Typing (Opsional):** Anda bisa mendeklarasikan tipe data untuk parameter fungsi dan nilai kembalian untuk kode yang lebih kuat. `function jumlah(int $a, int $b): int { ... }`
>     
> - **Error Handling:** Sebagian besar _fatal error_ diubah menjadi _Exception_, sehingga bisa ditangani dengan blok `try-catch`.
>     
> - **Operator Baru:**
>     
>     - **Spaceship Operator (`<=>`):** Untuk perbandingan tiga arah. Mengembalikan -1, 0, atau 1.
>         
>     - **Null Coalesce Operator (`??`):** Cara singkat untuk mengecek `isset()`. `$nama = $_GET['user'] ?? 'Guest';`
>         
> 
> #### Eksplorasi Mandiri
> 
> - Buat sebuah form HTML sederhana dengan input nama dan email. Arahkan `action` form ke sebuah file PHP. Di file PHP tersebut, gunakan `$_POST` untuk mengambil data yang dikirim, lalu tampilkan kembali data tersebut ke layar menggunakan `echo`.
>