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
> > - Definisi Framework?
> >     
> > - Beda Framework vs Library?
> >     
> > - Apa itu Web App Framework?
> >     
> > - Apa itu Laravel?
> >     
> > - Pola Arsitektur Laravel?
> >     
> > - Apa itu MVC?
> >     
> > - Struktur Proyek: `app`?
> >     
> > - Struktur Proyek: `public`?
> >     
> > - Struktur Proyek: `resources`?
> >     
> > - Struktur Proyek: `routes`?
> >     
> > - Struktur Proyek: `database`?
> >     
> > - Struktur Proyek: `storage`?
> >     
> > - Struktur Proyek: `vendor`?
> >     
> > - Detail direktori `app`?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-10b-Web-Application-Framework-Laravel.pdf (Slide 1-11)
> >     
> 
> > ### Definisi Framework
> >
> > Sebuah **Software Framework** adalah abstraksi di mana kode yang menyediakan fungsionalitas generik (umum) dapat secara selektif **ditimpa (**_**overridden**_**)** atau **dispesialisasi** oleh kode pengguna untuk menyediakan fungsionalitas spesifik.
> >
> > ### Framework vs. Library
> >
> > Perbedaan utamanya terletak pada 4 hal:
> >
> > 1. **Inversion of Control (IoC):** Alur program diatur oleh _framework_, bukan oleh pemanggil (kode kita). _Framework_-lah yang memanggil kode kita saat dibutuhkan, bukan sebaliknya.
> >     
> > 2. **Extensibility:** Pengguna dapat memperluas (_extend_) _framework_, misalnya dengan _override_ method atau menambah fungsionalitas spesifik.
> >     
> > 3. **Non-modifiable Framework Code:** Kita _seharusnya_ tidak mengubah kode inti _framework_. Kita hanya menggunakannya.
> >     
> > 4. **Default Behaviour:** _Framework_ sudah menyediakan perilaku _default_ (misal: cara menangani _request_), yang kemudian kita kustomisasi.
> >     
> >
> > ### Web Application Framework
> >
> > Sekumpulan _tools_ yang membantu merancang pengembangan aplikasi web, mencakup:
> >
> > - **Front-end:** Penanganan _form_, _authentication_, _templating_ (seperti Blade).
> >     
> > - **Back-end:** _Routing_, _Database ORM_ (seperti Eloquent).
> >     
> > - Mengelola _services_, _resources_, dan _API_.
> >     
> >
> > ### Laravel: Framework Fokus
> >
> > - **Definisi:** Sebuah _framework_ web berbasis **PHP**.
> >     
> > - **Sejarah:** Rilis pertama tahun 2011, lisensi MIT (free, open-source).
> >     
> > - **Arsitektur:** Mengikuti pola arsitektur **MVC (Model-View-Controller)**.
> >     
> >
> > ### Pola Arsitektur MVC
> >
> > **MVC (Model-View-Controller)** adalah pola desain yang memisahkan aplikasi menjadi tiga komponen utama:
> >
> > 1. **Model:** Merepresentasikan data dan logika bisnis (misal: interaksi ke _database_).
> >     
> > 2. **View:** Merepresentasikan _User Interface_ (UI) atau apa yang dilihat pengguna (misal: halaman HTML).
> >     
> > 3. **Controller:** Bertindak sebagai perantara antara _Model_ dan _View_. Menerima _input_ (request) dari pengguna, memprosesnya (mungkin dengan memanggil _Model_), dan mengirimkan data ke _View_ untuk ditampilkan.
> >     
> >
> > ### Struktur Proyek (Root Directory)
> >
> > - **`app/`**: **Kode inti aplikasi.** Sebagian besar _class_ kita (Models, Controllers) akan ada di sini.
> >     
> >
> > - **`bootstrap/`**: Berisi file `app.php` yang "menyalakan" (_bootstraps_) _framework_. Jarang diubah.
> >     
> >
> > - **`config/`**: Berisi semua file konfigurasi aplikasi (database, _session_, dll).
> >     
> >
> > - **`database/`**: Berisi _migrations_ (struktur tabel database), _model factories_, dan _seeds_ (data _dummy_).
> >     
> >
> > - **`public/`**: **Folder** _**entry point**_. Berisi file **`index.php`**, yang merupakan titik masuk untuk semua _request_ ke aplikasi. Juga tempat menyimpan _web assets_ (CSS, JS, gambar).
> >     
> >
> > - **`resources/`**: Berisi **`views`** (file _template_ Blade), aset yang belum di-_compile_ (CSS/JS mentah seperti SASS/LESS), dan file bahasa.
> >     
> >
> > - **`routes/`**: **Definisi rute** aplikasi.
> > 	- `web.php`: Rute untuk web (menggunakan *session*, CSRF, *cookie*).
> > 	- `api.php`: Rute untuk API (*stateless*, diautentikasi via *token*).
> > 	- `console.php`: Perintah *console* kustom (Artisan).
> > 	- `channels.php`: Rute untuk *event broadcasting* (seperti WebSockets).
> > 
> >
> > - **`storage/`**: Berisi _logs_, _cache_ (Blade yang sudah di-_compile_, _file session_, _cache_ file), dan file lain yang di-_generate_ _framework_.
> >     
> >
> > - **`tests/`**: Berisi _automated tests_ (PHPUnit).
> >     
> >
> > - **`vendor/`**: Berisi dependensi **Composer** (semua _library_ pihak ketiga yang diinstal).
> >     
> >
> > ### Fokus: Direktori `app/`
> >
> > Ini adalah "otak" aplikasi kita, berisi sub-direktori penting:
> >
> > - **`Http/`**: Berisi **Controllers**, _Middleware_, dan _Form Requests_. Semua logika untuk menangani _request_ HTTP masuk diletakkan di sini.
> >     
> > - **`Models/`**: Berisi semua _class_ **Eloquent Model** (representasi tabel _database_).
> >     
> > - **`Console/`**: Berisi perintah Artisan kustom yang kita buat.
> >     
> >
> > Class di dalam `app/` di-_autoload_ secara otomatis oleh **Composer**.

> [!cornell] #### Summary
> 
> **Laravel** adalah **framework web PHP** modern yang menerapkan pola arsitektur **MVC (Model-View-Controller)**. Perbedaan utama _framework_ dengan _library_ adalah **Inversion of Control (IoC)**, di mana _framework_-lah yang mengatur alur aplikasi. Laravel menyediakan struktur direktori yang terorganisir dengan jelas: **`routes/`** mendefinisikan URL, **`public/`** (dengan `index.php`) bertindak sebagai _entry point_, **`app/Http/Controllers/`** menangani logika _request_, **`app/Models/`** mengurus data (ORM), dan **`resources/views/`** berisi _template_ (Blade) untuk ditampilkan ke pengguna.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Alur Request di Laravel (Siklus Hidup)
> 
> Memahami struktur folder di atas membantu memvisualisasikan alur _request_ dasar di Laravel:
> 
> 1. Pengguna mengunjungi `/user/1` di browser.
>     
> 2. _Request_ masuk melalui `public/index.php`.
>     
> 3. Laravel memuat _framework_ (dari `bootstrap/app.php`).
>     
> 4. Laravel mencari rute yang cocok di `routes/web.php`. Ia menemukan rute: `Route::get('/user/{id}', [UserController::class, 'show']);`
>     
> 5. Laravel memanggil _method_ `show` di dalam `app/Http/Controllers/UserController.php`.
>     
> 6. Di dalam _Controller_, Anda mungkin memanggil _Model_: `User::find(1);` (dari `app/Models/User.php`). _Model_ ini mengambil data dari _database_.
>     
> 7. _Controller_ kemudian mengembalikan _View_: `return view('user.profile', ['user' => $user]);`
>     
> 8. Laravel mengambil _template_ dari `resources/views/user/profile.blade.php`, memasukkan data `$user` ke dalamnya.
>     
> 9. HTML yang sudah di-_render_ dikirim kembali sebagai respons ke browser pengguna.
>     
> 
> #### Topik Teknis: Composer dan `vendor/`
> 
> Direktori `vendor/` sangat penting. Laravel sendiri, dan _library_ lain yang digunakannya, diinstal sebagai "dependensi" melalui manajer paket PHP yang disebut **Composer**. Anda tidak pernah mengedit file di `vendor/` secara manual. Jika Anda ingin _update_ Laravel atau _library_ lain, Anda menjalankan perintah `composer update`.
> 
> #### Topik Teknis: Artisan CLI
> 
> _Framework_ modern seperti Laravel hadir dengan _Command-Line Interface_ (CLI) untuk mempermudah pengembangan. Di Laravel, ini disebut **Artisan**. Kita bisa membuat _file-file_ MVC dengan cepat menggunakan perintah seperti:
> 
> - `php artisan make:controller UserController`
>     
> - `php artisan make:model User`
>     
> - `php artisan make:migration create_users_table`
>