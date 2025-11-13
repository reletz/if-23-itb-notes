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
> > - Routing dasar?
> > - Di mana file rute?
> > - Beda `web.php` vs `api.php`?
> > - Apa saja metode Router?
> > - Apa itu CSRF Protection?
> > - Rute *redirect*?
> > - Rute *view*?
> > - Parameter Wajib (*Required*)?
> > - Parameter Opsional?
> > - Apa itu Route Groups?
> > - *Subdomain Routing*?
> > - *Route Prefixes*?
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-10b-Web-Application-Framework-Laravel.pdf (Slide 12-21)
> 
> > ### Routing Dasar
> > Routing di Laravel adalah proses mendefinisikan cara aplikasi merespons permintaan (request) HTTP ke URI tertentu.
> > 
> > Bentuk paling dasar adalah menghubungkan sebuah **URI** dengan sebuah **Closure** (fungsi anonim).
> > 
> > ```php
> > use Illuminate\Support\Facades\Route;
> > Route::get('/greeting', function () {
> >   return 'Hello world';
> > });
> > ```
> > 
> > ### File Rute (`routes/`)
> > Semua rute didefinisikan di dalam file di direktori `routes/`. File-file ini dimuat secara otomatis.
> > 
> > - **`routes/web.php`**: Mendefinisikan rute untuk *interface* web. Rute di sini memiliki fitur seperti *session state* dan *CSRF protection*. Sebagian besar rute aplikasi Anda akan ada di sini.
> > - **`routes/api.php`**: Rute di sini bersifat *stateless* (tidak ada *session*). Permintaan ke rute ini biasanya diautentikasi menggunakan *token*.
> > 
> > ### Metode Router (Router Methods)
> > *Router* memungkinkan kita mendaftar rute untuk berbagai *method* HTTP:
> > - `Route::get($uri, $callback);` 
> > - `Route::post($uri, $callback);` 
> > - `Route::put($uri, $callback);` 
> > - `Route::patch($uri, $callback);` 
> > - `Route::delete($uri, $callback);` 
> > - `Route::options($uri, $callback);` 
> > 
> > ### CSRF Protection
> > **CSRF (Cross-Site Request Forgery)** adalah serangan di mana pengguna yang tidak sah melakukan tindakan atas nama pengguna yang terautentikasi.
> > 
> > Laravel secara otomatis melindungi rute di `web.php`. Setiap *form* HTML yang menunjuk ke rute `POST`, `PUT`, `PATCH`, atau `DELETE` **wajib** menyertakan *field* token CSRF.
> >
> > ```html
> > <form method="POST" action="/profile">
> >   @csrf 
> >   ...
> > </form>
> > ```
> > 
> > ### Tipe Rute Khusus
> > 
> > **Redirect Routes:**
> > Untuk rute yang hanya berfungsi mengalihkan (redirect) ke URI lain.
> > - `Route::redirect('/here', '/there');` 
> >
> > Bisa juga menyertakan status kode, misal 301 (Moved Permanently).
> > - `Route::permanentRedirect('/here', '/there');` (Otomatis 301) 
> > 
> > **View Routes:**
> > Untuk rute yang hanya bertugas mengembalikan sebuah *view*.
> > - `Route::view('/welcome', 'welcome');` 
> > 
> > Kita juga bisa langsung mengirimkan data ke *view* tersebut.
> > - `Route::view('/welcome', 'welcome', ['name' => 'Taylor']);` 
> > 
> > ### Route Parameters
> > 
> > **Required Parameters (Wajib):**
> > Digunakan untuk menangkap segmen dinamis dari URI.
> > 
> > ```php
> > Route::get('/user/{id}', function ($id) { 
> >   return 'User ' . $id;
> > });
> > ```
> > 
> > **Optional Parameters (Opsional):**
> > Tambahkan tanda tanya `?` setelah nama parameter dan berikan nilai *default* di *closure*.
> > 
> > ```php
> > Route::get('/user/{name?}', function ($name = null) { 
> >   return $name; 
> > });
> > ```
> >
> > ### Route Groups
> > *Route Group* (Grup Rute) memungkinkan kita berbagi atribut (seperti *middleware* atau *prefix*) ke banyak rute sekaligus, tanpa harus mendefinisikannya di setiap rute.
> > 
> > **Route Prefixes:**
> > Menggunakan *method* `prefix` untuk memberi awalan URI pada semua rute di dalam grup.
> > 
> > ```php
> > // URL akan menjadi /admin/users
> > Route::prefix('admin')->group(function () { 
> >   Route::get('/users', function () { ... });
> > });
> > ```
> > 
> > **Subdomain Routing:**
> > Rute juga dapat dikelompokkan berdasarkan *subdomain*.
> > 
> > ```php
> > Route::domain('{account}.example.com')->group(function () {
> >   Route::get('user/{id}', function ($account, $id) { ... });
> > });
> > ```

> [!cornell] #### Summary
> 
> **Routing** di Laravel adalah mekanisme inti yang **memetakan URI (URL) ke logika aplikasi** (baik *Closure* atau *method* Controller). Rute utama didefinisikan dalam `routes/web.php` (untuk web dengan *session* dan CSRF) dan `routes/api.php` (untuk API *stateless*). Laravel menyediakan *method* untuk semua kata kerja HTTP (`get`, `post`, dll.) dan mendukung parameter dinamis (wajib dan opsional). Untuk efisiensi, **Route Groups** memungkinkan pengelompokan rute untuk berbagi atribut umum seperti **Prefixes** (misal: `/admin`) atau **Subdomain**.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Closure vs. Controller
> 
> *Slide* menunjukkan penggunaan *Closure* (fungsi anonim) langsung di file rute. Ini sangat bagus untuk proyek kecil atau rute sederhana (seperti `Route::view` atau `Route::redirect`).
> 
> **Namun**, untuk aplikasi yang lebih besar, **sangat disarankan** untuk memindahkan logika ini ke **Controller**.
> 
> - **Closure (File `routes/web.php`):**
>   `Route::get('/user/{id}', function ($id) {`
>   `  $user = User::find($id);`
>   `  return view('user.profile', ['user' => $user]);`
>   `});`
> 
> - **Controller (Cara yang Lebih Rapi):**
>   *File `routes/web.php`:*
>   `use App\Http\Controllers\UserController;`
>   `Route::get('/user/{id}', [UserController::class, 'show']);`
> 
>   *File `app/Http/Controllers/UserController.php`:*
>   `class UserController extends Controller {`
>   `  public function show($id) {`
>   `    $user = User::find($id);`
>   `    return view('user.profile', ['user' => $user]);`
>   `  }`
>   `}`
> 
> Pemindahan ke *controller* membuat file `routes/` tetap bersih dan berfungsi murni sebagai "peta" aplikasi, sementara semua logika penanganan *request* berada di *controller* yang sesuai.
> 
> #### Topik Teknis: Pentingnya `api.php`
> 
> Rute di `api.php` secara otomatis diawali dengan `/api` oleh Laravel. Jadi, rute `Route::get('/users', ...)` di `api.php` akan diakses melalui `http://domain.com/api/users`.
> 
> Perbedaan utamanya adalah **stateless**. Ini berarti *framework* tidak akan repot-repot memulai *session* atau memeriksa *cookie* CSRF. Ini ideal untuk API yang akan dikonsumsi oleh aplikasi eksternal atau *Single Page Application* (SPA) yang menggunakan autentikasi *token* (seperti JWT atau Sanctum).