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
> > - Apa itu Controller?
> >     
> > - Mengapa butuh Controller?
> >     
> > - Lokasi Controller?
> >     
> > - _Base Controller_?
> >     
> > - Perintah Artisan?
> >     
> > - Contoh Controller?
> >     
> > - Bagaimana Rute memanggil Controller?
> >     
> > - Apa itu Single Action Controller?
> >     
> > - Method `__invoke`?
> >     
> > - Rute untuk Single Action Controller?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-10b-Web-Application-Framework-Laravel.pdf (Slide 52-56)
> >     
> 
> > ### Definisi Controller
> > 
> > **Controller** adalah _class_ yang bertugas **mengatur logika penanganan** _**request**_ **(request handling)**. Ini adalah 'C' dalam arsitektur **MVC (Model-View-Controller)**.
> > 
> > **Tujuan:**
> > 
> > Daripada mendefinisikan semua logika penanganan request sebagai Closure (fungsi anonim) di dalam file routes/web.php, kita memindahkannya ke class Controller.
> > 
> > - **Mengapa?** Ini membuat file rute tetap bersih, rapi, dan mudah dibaca. Logika aplikasi menjadi lebih terorganisir dan mudah dikelola.
> >     
> > 
> > ### Membuat Controller
> > 
> > - **Lokasi:** Disimpan di direktori `app/Http/Controllers/`.
> >     
> > - **Base Class:** Semua _controller_ harus _extend_ _class_ `App\Http/Controllers/Controller`.
> >     
> > - Perintah Artisan: Cara termudah membuat controller adalah dengan Artisan CLI:
> >     
> >     ```bash
> >     php artisan make:controller UserController
> >     ```
> >     
> > 
> > ### Contoh Controller (Basic)
> > 
> > 1. File Controller (app/Http/Controllers/UserController.php):
> > 
> >```php
> > <?php
> > 	namespace App\Http\Controllers;
> > 	use App\Http\Controllers\Controller;
> > 	use App\Models\User;
> > 
> > 	class UserController extends Controller {
> > 
> > 		/**
> > 		* Menampilkan profile untuk user tertentu.
> > 		*/
> > 		public function show($id) {
> > 			return view('user.profile', [
> > 				'user' => User::findOrFail($id)
> > 			]);
> > 		}
> > 	}
> > ?>
> > ```
> > 
> > 2. File Rute (routes/web.php):
> > 
> > Kita "menghubungkan" rute ke method show di UserController:
> > 
> > `use App\Http\Controllers\UserController;`
> > `Route::get('/user/{id}', [UserController::class, 'show']);`
> > 
> > _(Artinya: Untuk request GET ke `/user/{id}`, panggil method `show` di `UserController`)_.
> > 
> > ### Single Action Controllers
> > 
> > Terkadang, sebuah _controller_ hanya bertugas melakukan **satu aksi/tindakan** saja (misal: `ProvisionServer`).
> > 
> > Daripada membuat _method_ kustom (seperti `store` atau `run`), kita bisa membuat _controller_ ini sebagai _Single Action Controller_.
> > 
> > - **Method Khusus:** _Controller_ ini hanya akan memiliki satu _method_ "ajaib" yaitu `__invoke()`.
> >     
> > 
> > 1. File Controller (app/Http/Controllers/ProvisionServer.php):
> > 
> > ```php
> > class ProvisionServer extends Controller {
> > 	/**
> > 	* Menjalankan provisi server baru.
> > 	*/
> > 	public function __invoke() {
> > 		// ... Logika provisi server ...
> > 	}
> > }
> > ```
> > 
> > 2. File Rute (routes/web.php):
> > 
> > Saat mendaftarkan rute, kita tidak perlu menyebut nama method-nya. Laravel akan otomatis mencari `__invoke()`.
> > 
> >` use App\Http\Controllers\ProvisionServer;`
> > `Route::post('/server', ProvisionServer::class);`
> > 

> [!cornell] #### Summary
> 
> **Controller** di Laravel adalah _class_ yang berfungsi sebagai **organisator logika penanganan** _**request**_, memisahkan logika dari definisi rute (prinsip 'C' dalam MVC). _Controller_ disimpan di `app/Http/Controllers` dan dibuat menggunakan `php artisan make:controller`. Kita menghubungkan rute ke _method_ _controller_ menggunakan sintaks _array_ `[ControllerName::class, 'methodName']`. Untuk _controller_ yang hanya melakukan satu tugas, kita dapat menggunakan **Single Action Controller** dengan mengimplementasikan _method_ `__invoke()`, yang memungkinkan kita memanggil _controller_ langsung dari rute tanpa menentukan nama _method_.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: `find()` vs. `findOrFail()`
> 
> Dalam contoh _controller_ (slide 53), _method_ `User::findOrFail($id)` digunakan. Ini adalah _helper_ yang sangat berguna.
> 
> - **`User::find($id)`**: Akan mencari _user_ dengan ID tersebut. Jika tidak ditemukan, ia akan mengembalikan `null`. Kode Anda akan rusak jika Anda mencoba mengakses `null->name` di _view_.
>     
> - **`User::findOrFail($id)`**: Akan mencari _user_. Jika **tidak ditemukan**, ia akan **otomatis menghentikan eksekusi** dan mengirimkan **halaman error HTTP 404 (Not Found)** ke pengguna.
>     
> 
> Menggunakan `findOrFail` jauh lebih bersih dan aman di dalam _controller_ daripada melakukan pengecekan `if (!$user) { abort(404); }` secara manual.
> 
> #### Topik Teknis: Resource Controllers
> 
> _Slide_ (halaman 58) menyebutkan "Resource Controller" sebagai materi selanjutnya. Ini adalah konsep yang sangat mempercepat pengembangan.
> 
> Jika Anda memiliki _model_ `Post`, Anda pasti butuh halaman untuk:
> 
> 1. Menampilkan semua _post_ (index)
>     
> 2. Menampilkan form _create_ (create)
>     
> 3. Menyimpan _post_ baru (store)
>     
> 4. Menampilkan satu _post_ (show)
>     
> 5. Menampilkan form _edit_ (edit)
>     
> 6. Menyimpan _update_ _post_ (update)
>     
> 7. Menghapus _post_ (destroy)
>     
> 
> Daripada membuat 7 rute dan 7 _method_ manual, Anda bisa:
> 
> 1. Membuat _controller_: `php artisan make:controller PostController --resource`
>     
> 2. Mendaftar rute: `Route::resource('/posts', PostController::class);`
>     
> 
> Hanya dengan dua baris itu, Laravel **secara otomatis membuatkan 7 rute** yang terpetakan ke 7 _method_ yang sudah ada di `PostController` Anda.