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
> > - Relasi One-to-One?
> >     
> > - Method `hasOne`?
> >     
> > - Relasi (inverse) `belongsTo`?
> >     
> > - Cara query relasi 1-to-1?
> >     
> > - Relasi One-to-Many?
> >     
> > - Method `hasMany`?
> >     
> > - Cara query relasi 1-to-many?
> >     
> > - Query relasi (method)?
> >     
> > - Relasi Many-to-Many?
> >     
> > - Struktur tabel M-to-M?
> >     
> > - Apa itu "Pivot Table"?
> >     
> > - Method `belongsToMany`?
> >     
> > - Cara query relasi M-to-M?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-10b-Web-Application-Framework-Laravel.pdf (Slide 42-51)
> >     
> 
> > ### Pendahuluan Relasi
> > 
> > Eloquent memungkinkan kita mendefinisikan relasi antar model. Ini membuat kita bisa mengambil dan memanipulasi data yang terhubung dengan cara yang sangat mudah dan intuitif.
> > 
> > ### Relasi One-to-One (1-ke-1)
> > 
> > Contoh: Satu `User` memiliki satu `Phone`.
> > 
> > **Definisi Model:**
> > 
> > - Di Model User (misal: app/Models/User.php):
> >     
> >     ```php
> >     public function phone() {
> > 	    return $this->hasOne(Phone::class);
> >     }
> >     ```
> >     
> > - Di Model Phone (Relasi kebalikan / inverse):
> >     
> >     ```php
> >     public function user() {
> > 	    return $this->belongsTo(User::class);
> >     }
> >     ```
> >     
> >     (Eloquent berasumsi foreign key di tabel phones adalah user_id).
> >     
> > 
> > **Cara Query:**
> > 
> > Kita bisa mengakses relasi ini seolah-olah property dari model (disebut dynamic property).
> > 
> > `$phone = User::find(1)->phone;`
> > 
> > ### Relasi One-to-Many (1-ke-banyak)
> > 
> > Contoh: Satu `Post` memiliki banyak `Comment`.
> > 
> > **Definisi Model:**
> > 
> > - Di Model Post (app/Models/Post.php):
> >     
> >     ```php
> >     public function comments() {
> > 	    return $this->hasMany(Comment::class);
> >     }
> >     ```
> > 
> >     
> > - Di Model Comment (Relasi kebalikan / inverse):
> >     
> >     ```php
> >     public function post() {
> > 	    return $this->belongsTo(Post::class);
> >     }
> >     ```
> >     
> >     (Eloquent berasumsi foreign key di tabel comments adalah post_id).
> >     
> > 
> > **Cara Query:**
> > 
> > - Mengambil semua comment dari post ID 1:
> >     
> >     `$comments = Post::find(1)->comments; // Mengembalikan Collection`
> >     
> > - Mengambil post dari sebuah comment:
> >     
> >     `$postTitle = Comment::find(1)->post->title;`
> >     
> > 
> > Query pada Relasi:
> > 
> > Jika kita ingin menambahkan constraint (seperti where) pada relasi, kita harus mengakses relasi sebagai method (menggunakan ()), bukan property:
> >
> > ```php 
> > $comment = Post::find(1)->comments()
> > 	->where('title', 'foo')
> > 	->first();
> > ```
> > 
> > ### Relasi Many-to-Many (banyak-ke-banyak)
> > 
> > Contoh: Satu `User` bisa memiliki banyak `Role` (peran), dan satu `Role` bisa dimiliki oleh banyak `User`.
> > 
> > **Struktur Tabel:**
> > 
> > Relasi ini memerlukan tabel perantara (pivot table).
> > 
> > - `users` (kolom: id, name)
> >     
> > - `roles` (kolom: id, name)
> >     
> > - `role_user` (kolom: user_id, role_id) -> Ini adalah _pivot table_.
> >     
> > 
> > **Definisi Model:**
> > 
> > - Di Model User (app/Models/User.php):
> >     
> >     ```php
> >     public function roles() {
> > 	    return $this->belongsToMany(Role::class);    
> >     }
> >     ```
> >     
> > - Di Model Role (app/Models/Role.php):
> >     
> >     ```php   
> >     public function users() { 
> > 	    return $this->belongsToMany(User::class);
> >     }
> >     ```
> >     
> > 
> > **Cara Query:**
> > 
> > ```php
> > 
> > // Mengambil semua role dari user ID 1
> > $user = User::find(1);
> > foreach ($user->roles as $role) { ... }
> > 
> > // Bisa juga di-query sebagai method
> > $roles = User::find(1)->roles()->orderBy('name')->get();
> > ```

> [!cornell] #### Summary
> 
> **Eloquent Relationships** adalah fitur inti yang menghubungkan _model_ satu sama lain, mencerminkan relasi di _database_. Relasi didefinisikan sebagai _method_ di dalam _class_ Model. **`hasOne`** (1-ke-1) dan **`hasMany`** (1-ke-banyak) digunakan untuk mendefinisikan relasi "maju", sementara **`belongsTo`** digunakan untuk relasi "kebalikan" (_inverse_). Relasi **`belongsToMany`** (banyak-ke-banyak) memerlukan sebuah _tabel pivot_ perantara untuk berfungsi. Kita dapat mengakses data relasi dengan mudah sebagai _dynamic property_ (misal: `$user->phone`) atau sebagai _query builder_ untuk _filtering_ lebih lanjut (misal: `$user->comments()->where(...)`).

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: `->phone` vs `->phone()` (Property vs Method)
> 
> Ini adalah konsep paling penting namun sering membingungkan dalam Eloquent:
> 
> 1. **`$user->phone` (Dynamic Property)**
>     
>     - **Apa ini?** Mengakses relasi sebagai _property_.
>         
>     - **Apa yang dilakukan?** Eloquent akan **langsung mengeksekusi** _**query**_ untuk mengambil data relasi dan mengembalikan **hasilnya** (satu _instance_ Model `Phone` atau `null`).
>         
>     - **Kapan digunakan?** 90% kasus, saat Anda hanya ingin _mengambil_ data.
>         
> 2. **`$user->phone()` (Relationship Method)**
>     
>     - **Apa ini?** Mengakses relasi sebagai _method_ (dengan `()`).
>         
>     - **Apa yang dilakukan?** Eloquent **tidak mengeksekusi** _**query**_. Ia mengembalikan _**instance**_ **dari** _**query builder**_ relasi itu sendiri.
>         
>     - **Kapan digunakan?** Saat Anda perlu **menambahkan** _**constraint**_ (seperti `where`, `orderBy`) pada _query_ relasi tersebut _sebelum_ dieksekusi, atau saat Anda ingin **membuat/menyimpan** data relasi baru (misal: `$user->comments()->create(...)`).
>         
> 
> #### Penamaan Tabel Pivot (Many-to-Many)
> 
> Eloquent sangat bergantung pada konvensi. Untuk _pivot table_ antara `User` dan `Role`, Eloquent akan mencari tabel bernama `role_user` (nama _model_ singular, diurutkan berdasarkan abjad, dipisah _underscore_). Jika nama tabel Anda berbeda (misal: `users_to_roles`), Anda harus menentukannya secara manual:
> 
> `return $this->belongsToMany(Role::class, 'users_to_roles');`