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
> > - Apa itu Views?
> > - Di mana Views disimpan?
> > - Apa tujuan Views?
> > - Bagaimana memanggil View?
> > - Cara mengirim data (parameter) ke View?
> > - *Nested View*?
> > - Apa itu Blade?
> > - Keuntungan Blade?
> > - Cara menampilkan data?
> > - Menampilkan data JSON?
> > - Menampilkan data tanpa *render*?
> > - *Directive* `@verbatim`?
> > - *Directive* Kondisional?
> > - *Directive* `@unless`?
> > - *Directive* `@isset` / `@empty`?
> > - *Directive* Looping?
> > - *Directive* `@forelse`?
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-10b-Web-Application-Framework-Laravel.pdf (Slide 22-30)
> 
> > ### Definisi Views
> > **Views** menyediakan cara yang nyaman untuk meletakkan semua kode HTML aplikasi di dalam file-file terpisah.
> > 
> > - **Tujuan:** Memisahkan **logika aplikasi/controller** dari **logika presentasi (tampilan)**. Daripada mengembalikan string HTML langsung dari rute, kita mengembalikan *view*.
> > - **Lokasi:** Disimpan di direktori `resources/views/`.
> > - **Templating:** Dibuat menggunakan *templating engine* bawaan Laravel, yaitu **Blade**.
> > 
> > ### Menggunakan Views
> > 
> > **Contoh View Sederhana:**
> > File `resources/views/greeting.blade.php`:
> > 
> > ```php
> > <html>
> >   <body>
> >     <h1>Hello, {{ $name }}</h1>
> >   </body>
> > </html>
> > ```
> > 
> > **Mengembalikan View dari Rute:**
> > Kita menggunakan fungsi *helper* `view()`:
> > 
> > ```php
> > Route::get('/', function () {
> >   return view('greeting', ['name' => 'James']);
> > });
> > ```
> > 
> > **Parameter Fungsi `view()`:**
> > 1.  Argumen pertama adalah nama file *view* di `resources/views/`. (Ekstensi `.blade.php` tidak perlu ditulis).
> > 2.  Argumen kedua adalah *array* berisi data yang ingin kita sediakan untuk *view* tersebut. Dalam *view*, data ini dapat diakses sebagai variabel (misal: `$name`).
> > 
> > **Nested View Directory:**
> > *View* dapat disimpan di dalam sub-direktori. Kita dapat mengaksesnya menggunakan notasi "titik" (`.`).
> > 
> > ```php
> > // Mengakses resources/views/admin/profile.blade.php
> > return view('admin.profile', $data);
> > ```
> > 
> > ### Blade Templating Engine
> > **Blade** adalah *templating engine* yang disertakan dengan Laravel.
> > 
> > - **Keuntungan:**
> >   1.  Memungkinkan kita menggunakan kode PHP biasa di dalam *template*.
> >   2.  *Template* Blade **dikompilasi menjadi kode PHP murni** dan **di-cache** sampai *template* tersebut dimodifikasi. Ini membuat *load* aplikasi menjadi sangat cepat.
> > 
> > ### Blade Directives: Menampilkan Data
> > 
> > - **Tampilan Dasar:** Menggunakan kurung kurawal ganda `{{ }}`.
> >
> >   ```php
> >   Hello, {{ $name }}.
> >   ```
> >   
> >   *(Ini secara otomatis akan "membersihkan" data (HTML escaping) untuk mencegah serangan XSS).*
> > 
> > - **Render JSON:** Menggunakan `@json` untuk mengubah *array* PHP menjadi JSON.
> > 	```php
> > 	<script> var app = @json($array); </script>
> > 	```
> >   
> > - **Tampilan Tanpa Render:** Jika kita ingin menampilkan `{{ $name }}` sebagai teks biasa, gunakan tanda `@`.
> >   
> >	```php
> >	Hello, @{{ $name }}. //(Akan tampil sebagai: Hello, {{ $name }}.)
> >	```
> > 
> > - **Blok Verbatim:** Untuk blok HTML besar yang tidak boleh di-*render*.
> >   ```php
> >   @verbatim
> >     <div class="container">{{ name }}</div> 
> >   @endverbatim`
> >	```
> >
> > ### Blade Directives: Kondisional
> > - **`@if / @elseif / @else / @endif`**: Struktur kondisional standar.
> > - **`@unless`**: Kebalikan dari `@if`. Kode di dalamnya dieksekusi jika kondisi *false*.
> >   ```php
> >   @unless (Auth::check())
> >     You are not signed in.
> >   @endunless
> > 	```
> > - **`@isset` / `@empty`**: Memeriksa apakah variabel ada (dan tidak *null*) atau "kosong".
> > 
> > ### Blade Directives: Loops (Perulangan)
> > 
> > - **`@for`**: `for` loop standar PHP.
> > - **`@foreach`**: `foreach` loop standar PHP.
> > - **`@while`**: `while` loop standar PHP.
> > - **`@forelse`**: *Directive* yang sangat berguna. Ini menggabungkan `foreach` dengan pemeriksaan `@empty`.
> >   ```php
> > 	@forelse ($users as $user) 
> > 		<li>{{ $user->name }}</li>
> > 	@empty
> > 		<p>No users</p>
> > 	@endforelse
> > 	```

> [!cornell] #### Summary
> 
> **Views** di Laravel bertugas untuk **memisahkan logika presentasi (HTML)** dari logika aplikasi, dan disimpan di `resources/views/`. Laravel menggunakan *templating engine* **Blade** yang kuat, yang mengkompilasi *template* (`.blade.php`) menjadi PHP murni dan menyimpannya dalam *cache* untuk performa tinggi. Blade menyediakan sintaks *directive* yang bersih (seperti **`{{ $data }}`** untuk menampilkan data secara aman, **`@if`** untuk kondisional, dan **`@foreach`** / **`@forelse`** untuk perulangan) agar penulisan *template* menjadi lebih mudah dan bersih daripada menggunakan PHP biasa.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Keamanan `{{ }}` vs. `{!! !!}`
> 
> Seperti yang disebutkan, `{{ $name }}` akan membersihkan (melakukan *escaping*) semua *output*.
> 
> - **Input:** `$name = '<script>alert("XSS");</script>'`
> - **Output `{{ $name }}`:** `&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt;`
> 
> Browser akan menampilkan teks `<script>...` tersebut, bukan mengeksekusinya. Ini adalah perlindungan **otomatis terhadap serangan XSS (Cross-Site Scripting)**.
> 
> Jika Anda **sangat yakin** bahwa data Anda aman dan Anda *ingin* me-*render* HTML (misalnya, dari *rich text editor*), Anda dapat menggunakan sintaks:
> 
> `{!! $htmlContent !!}`
> 
> Gunakan ini dengan sangat hati-hati.
> 
> #### Topik Teknis: @isset vs @empty
> 
> Sangat penting untuk memahami perbedaan antara `@isset` dan `@empty` dalam konteks PHP.
> 
> - **`@isset($records)`**: Akan bernilai `true` jika `$records` didefinisikan dan **bukan `null`**. Sebuah *array* kosong `[]` akan dianggap `true` oleh `isset`.
> - **`@empty($records)`**: Akan bernilai `true` jika variabel tersebut dianggap "kosong".
>   Kondisi "kosong" meliputi:
>   - `null`
>   - `false`
>   - `0` (integer 0)
>   - `""` (string kosong)
>   - `[]` (array kosong)
> 
> Inilah mengapa `@forelse` sangat berguna, karena ia menggunakan logika `@empty` (memeriksa apakah *array*-nya kosong), bukan `@isset`.