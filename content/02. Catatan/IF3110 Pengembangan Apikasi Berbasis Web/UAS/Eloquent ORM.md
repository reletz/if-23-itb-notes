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
> > - Apa itu Eloquent ORM?
> >     
> > - Apa itu ORM?
> >     
> > - Bagaimana membuat Model?
> >     
> > - Konvensi Eloquent?
> >     
> > - Lokasi Model?
> >     
> > - Cara _override_ konvensi?
> >     
> > - `protected $table`?
> >     
> > - `public $timestamps`?
> >     
> > - `protected $attributes`?
> >     
> > - Cara mengambil (retrieve) data?
> >     
> > - `::all()`
> >     
> > - `::where()`
> >     
> > - _Query Chaining_?
> >     
> > - Agregat (`count`, `max`)?
> >     
> > - `firstOrCreate` vs `firstOrNew`?
> >     
> > - Cara _insert_ data?
> >     
> > - `save()` vs `create()`?
> >     
> > - Cara _update_ data?
> >     
> > - Cara _delete_ data?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3110-10b-Web-Application-Framework-Laravel.pdf (Slide 31-41)
> >     
> 
> > ### Model: Eloquent ORM
> >
> > **Eloquent** adalah **ORM (Object-Relational Mapper)** bawaan Laravel.
> >
> > Apa itu ORM?
> > 
> > ORM adalah sebuah teknik yang "memetakan" tabel di database relasional (seperti MySQL) menjadi class dan object dalam bahasa pemrograman (seperti PHP).
> >
> > - **Tanpa ORM:** Kita menulis _query_ SQL manual: `SELECT * FROM flights WHERE active = 1`.
> >     
> > - **Dengan ORM:** Kita menggunakan _method_ pada _object_: `Flight::where('active', 1)->get()`.
> >     
> >
> > Ini membuat interaksi dengan _database_ terasa lebih alami, aman, dan mudah dikelola.
> >
> > **Membuat Model:**
> >
> > - Lokasi: Model disimpan di `app/Models/`
> >     
> > - Perintah Artisan: `php artisan make:model Flight`
> >     
> > - Perintah (dengan migrasi): `php artisan make:model Flight --migration` (Sangat direkomendasikan, ini akan membuat file _model_ dan file _migration_ sekaligus).
> >     
> >
> > ### Konvensi Eloquent ("Convention over Configuration")
> >
> > Eloquent mengasumsikan beberapa hal secara _default_ agar kita tidak perlu repot melakukan konfigurasi:
> >
> > 1. **Nama Tabel:** _Class_ `Flight` akan dipetakan ke tabel `flights` (plural, snake_case). _Class_ `UserRole` akan dipetakan ke `user_roles`.
> >     
> > 2. **Primary Key:** Diasumsikan ada _primary key_ bernama `id` (integer, auto-increment).
> >     
> > 3. **Timestamps:** Diasumsikan ada kolom `created_at` dan `updated_at` yang akan diisi otomatis.
> >     
> >
> > **Meng-override Konvensi:**
> > 
> > Kita bisa menimpa konvensi default dengan mendefinisikan property di dalam class Model:
> > 
> > ```php
> > class Flight extends Model {
> > 
> > 	// Menentukan nama tabel kustom
> > 	protected $table = 'my_flights';
> > 	
> > 	// Menentukan primary key kustom
> > 	protected $primaryKey = 'flight_id';
> > 	
> > 	// Primary key bukan auto-increment
> > 	public $incrementing = false;
> > 	
> > 	// Tipe data primary key
> > 	protected $keyType = 'string';
> > 	
> > 	// Menonaktifkan timestamps (created_at, updated_at)
> > 	public $timestamps = false;
> > 	
> > 	// Menentukan koneksi database kustom
> > 	protected $connection = 'sqlite';
> > 	
> > 	// Menentukan nilai default untuk atribut
> > 	protected $attributes = ['delayed' => false];
> > 
> > }
> > ```
> >
> > ### Operasi CRUD dengan Eloquent
> >
> > #### R: Retrieve (Mengambil Data)
> >
> > - Ambil Semua:
> >     
> >     ```php
> >     $flights = Flight::all(); // Mengembalikan Collection of Flight
> >     ```
> >     
> >
> > - Query Sederhana (Chaining): Kita bisa "merangkai" (chaining) beberapa method untuk membangun query. Query baru dieksekusi saat kita memanggil get().
> > 
> > 	```php
> >     $flights = Flight::where('active', 1)
> > 	    ->orderBy('name')
> > 	    ->take(10)
> > 	    ->get();
> >     ```
> >     
> >
> > - Agregat:
> >     
> >     ```php
> >     $count = Flight::where('active', 1)->count();
> >     $max = Flight::where('active', 1)->max('price');
> >     ```
> >     
> >
> > #### C: Create (Membuat Data)
> >
> > - Metode 1: new + save()
> >     
> >     ```php   
> >     $flight = new Flight;
> >     $flight->name = 'Jakarta to Singapore'; 
> >     $flight->save(); // Baru tersimpan ke DB
> >     ```
> >     
> >
> > - Metode 2: create() (Mass Assignment)
> >     
> >     ```php
> >     $flight = Flight::create(['name' => 'Warsaw to Budapest']);
> >     ```
> >     
> >     (Catatan: Metode ini memerlukan properti $fillable atau $guarded di Model untuk keamanan. Lihat Ad Libitum).
> >     
> >
> > - **`firstOrCreate` vs `firstOrNew`:**
> > 	- `firstOrCreate`: Mencari data. Jika ada, kembalikan. Jika tidak ada, **buat DAN simpan** ke *database*, lalu kembalikan.
> > 		`$flight = Flight::firstOrCreate(['name' => 'London to Paris']);`
> > 	- `firstOrNew`: Mencari data. Jika ada, kembalikan. Jika tidak ada, **buat *instance* baru** (di memori, **BELUM** disimpan ke *database*).
> > 		`$flight = Flight::firstOrNew(['name' => 'Tokyo to Sydney']);`
> > 	
> >
> > #### U: Update (Memperbarui Data)
> >
> > - Metode 1: find() + save()
> >     
> > 	```php
> > 	    $flight = Flight::find(1); // Cari data dengan ID 1
> > 	    $flight->name = 'Sankt-Peterburg to Novosibirsk';
> > 	    $flight->save(); // Update di DB
> >     ```
> >     
> >
> > - Metode 2: Mass Update
> > 
> > 	```php
> >     Flight::where('active', 1)
> > 	    ->where('destination', 'Seoul')
> > 	    ->update(['delayed' => 1]);
> >     ```
> >     
> >
> > #### D: Delete (Menghapus Data)
> >
> > - Metode 1: find() + delete()
> >     
> >     ```php
> >     $flight = Flight::find(1);
> >     $flight->delete();
> >     ```
> >     
> >
> > - Metode 2: Mass Delete
> >     
> >     ```php
> >     Flight::where('active', 0)->delete();
> >     ```
> >     

> [!cornell] #### Summary
> 
> **Eloquent** adalah **Object-Relational Mapper (ORM)** Laravel yang memetakan _class_ Model (seperti `Flight`) ke tabel _database_ (seperti `flights`) menggunakan **konvensi**. Ini menyederhanakan interaksi _database_ dengan menyediakan _method_ berbasis _object_ untuk melakukan operasi **CRUD (Create, Retrieve, Update, Delete)**. Kita bisa mengambil data dengan `::all()` atau `::where()->get()`, membuat data dengan `new Model + save()` atau `::create()`, memperbarui dengan `find() + save()` atau `::update()`, dan menghapus dengan `find() + delete()` atau `::where()->delete()`.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Keamanan Mass Assignment (`$fillable` vs `$guarded`)
> 
> _Slide_ (halaman 39) menyebutkan: `//require specifying properties like 'guarded' or 'fillable'`. Ini sangat penting.
> 
> Bayangkan Anda memiliki _form_ registrasi dan _Model_ `User`. Jika seorang _hacker_ menambahkan _field_ tersembunyi di _form_ HTML: `<input type="hidden" name="is_admin" value="1">`.
> 
> Jika Anda menggunakan `User::create($request->all());` tanpa perlindungan, _hacker_ tersebut bisa membuat akunnya sendiri menjadi admin.
> 
> **Solusinya:**
> 
> 1. $fillable (Whitelist - Direkomendasikan)
>     
>     Menentukan hanya kolom mana yang boleh diisi melalui Mass Assignment.
>     
>     class User extends Model {
>     
>     protected $fillable = ['name', 'email', 'password'];
>     
>     // 'is_admin' tidak ada di sini, jadi akan diabaikan
>     
>     }
>     
> 2. $guarded (Blacklist)
>     
>     Menentukan kolom mana yang tidak boleh diisi.
>     
>     class User extends Model {
>     
>     protected $guarded = ['is_admin', 'balance'];
>     
>     }
>     
> 
> #### Topik Teknis: `get()` vs `first()` vs `find()`
> 
> Ini adalah hal yang sering membingungkan pemula:
> 
> - get(): Mengeksekusi query dan selalu mengembalikan Collection (kumpulan data, seperti array), meskipun hasilnya hanya 1 atau 0.
>     
>     $users = Flight::where('active', 1)->get();
>     
> - first(): Mengeksekusi query dan mengembalikan satu instance Model pertama yang ditemukan, atau null jika tidak ada.
>     
>     $user = Flight::where('active', 1)->first();
>     
> - find($id): Shortcut untuk where('primary_key', $id)->first().
>     
>     $user = Flight::find(1); // Mengembalikan 1 Model atau null
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi Eloquent (Eloquent: Getting Started):** [https://laravel.com/docs/9.x/eloquent](https://laravel.com/docs/9.x/eloquent "null")
>