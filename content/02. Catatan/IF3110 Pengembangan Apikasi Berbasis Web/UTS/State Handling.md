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
> > - Mengapa HTTP disebut _stateless_?
> >     
> > - Apa itu _State Management_?
> >     
> > - Bagaimana cara kerja _URL Parameter Passing_?
> >     
> > - Bagaimana cara kerja _Hidden Field_?
> >     
> > - Bagaimana cara kerja _Cookies_?
> >     
> > - Apa saja batasan _Cookies_?
> >     
> > - Apa perbedaan utama ketiga teknik ini?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-10
> >     
> 
> > ### Sifat Stateless pada HTTP
> > 
> > Protokol HTTP (Hypertext Transfer Protocol) pada dasarnya bersifat **stateless**. Ini berarti **setiap permintaan (request) dari klien ke server dianggap sebagai transaksi yang terisolasi dan independen**. Server tidak memiliki ingatan bawaan tentang permintaan-permintaan sebelumnya yang datang dari klien yang sama.
> > 
> > **Analogi:** Bayangkan Anda berbicara dengan seseorang yang memiliki ingatan sangat pendek. Setiap kali Anda mengucapkan kalimat baru, orang tersebut lupa semua kalimat yang Anda ucapkan sebelumnya.
> > 
> > **Implikasi Praktis:** Jika Anda mendefinisikan sebuah variabel di `page1.php`, nilai variabel tersebut akan hilang dan tidak akan dikenali saat pengguna pindah ke `page2.php`. Ini menjadi masalah besar untuk aplikasi yang membutuhkan alur multi-langkah, seperti keranjang belanja atau proses login.
> > 
> > ### Apa itu State Management?
> > 
> > _State Management_ (Manajemen Status) adalah **proses atau teknik untuk mempertahankan informasi status dan halaman di antara beberapa permintaan (request)**. Tujuannya adalah untuk "mengakali" sifat stateless HTTP, sehingga aplikasi web bisa "mengingat" informasi tentang pengguna dan interaksi mereka.
> > 
> > ### Teknik 1: Message Passing via URL (Parameter URL)
> > 
> > Ini adalah salah satu cara paling sederhana untuk membawa data dari satu halaman ke halaman lain.
> > 
> > - **Cara Kerja:** Data dilampirkan langsung ke URL sebagai pasangan `kunci=nilai`, yang disebut _query string_.
> >     
> > - **Implementasi:**
> >     
> >     - Di halaman pengirim, buat link yang menyertakan data:
> > 		```php
> >         <a href='page2.php?produk_id=123&aksi=edit'>Edit</a>
> >         ```
> >         
> >     - Di halaman penerima (page2.php), data diambil menggunakan variabel global $_GET:
> >         ```php
> >         `$id = $_GET['produk_id']; // $id akan berisi '123'`
> >         ```
> >       
> >      ![[Pasted image 20250929075438.png]]
> > 
> > ### Teknik 2: Hidden Field (Input Tersembunyi)
> > 
> > Teknik ini digunakan di dalam form HTML untuk membawa data tanpa menampilkannya kepada pengguna.
> > 
> > - **Cara Kerja:** Sebuah input field ditambahkan ke dalam form dengan `type="hidden"`. Nilainya akan dikirim bersama data form lainnya saat di-_submit_.
> >     
> > - **Implementasi:**
> >     
> >     - Di dalam form HTML:
> >         
> >         ```html
> >         <input type="hidden" name="user_id" value="99">
> >         ```
> >         
> >     - Di skrip PHP yang memproses form, data diambil menggunakan $_POST (jika method="post"):
> > 
> >         ```php
> >         $userId = $_POST['user_id']; // $userId akan berisi '99'
> >         ```
> >         
> > 
> > ### Teknik 3: Cookies
> > 
> > _Cookie_ adalah potongan kecil data yang dikirim oleh server untuk disimpan di browser klien. Browser kemudian akan mengirimkan kembali _cookie_ tersebut secara otomatis setiap kali membuat permintaan baru ke server yang sama.
> > 
> > - **Cara Kerja:**
> >     
> >     1. **Server Mengatur Cookie:** Server mengirimkan _cookie_ ke browser melalui `Set-Cookie` _header_. Di PHP, ini dilakukan dengan fungsi `setcookie("nama", "nilai");`.
> >         
> >     2. **Browser Menyimpan Cookie:** Browser menyimpan _cookie_ tersebut.
> >         
> >     3. **Browser Mengirim Cookie:** Pada setiap permintaan berikutnya ke domain yang sama, browser akan menyertakan _cookie_ tersebut dalam `Cookie` _header_.
> >         
> >     4. **Server Membaca Cookie:** Server membaca data _cookie_ melalui variabel global `$_COOKIE`.
> >         
> > - **Batasan (Limitation):**
> >     
> >     - **Ukuran Terbatas:** Sekitar 4KB per _cookie_.
> >         
> >     - **Jumlah Terbatas:** Sekitar 20 _cookies_ per domain, dan total 300 _cookies_ per klien.
> >         
> >     - **Bergantung pada Klien:** Pengguna dapat menonaktifkan, mengubah, atau menghapus _cookies_ di browser mereka.
> >     
> >     ![[Pasted image 20250929075524.png]]
> >
> > ### Teknik 4: Session (Sisi Server)
> > 
> > _Session_ adalah teknik di mana data pengguna **disimpan di sisi server**. Ini adalah metode yang paling umum dan aman untuk menangani data sensitif.
> > 
> > - **Cara Kerja:**
> >     
> >     1. **Inisiasi:** Skrip PHP memanggil `session_start();`.
> >         
> >     2. **Identifikasi:** Server membuat sebuah ID unik untuk sesi tersebut (_Session ID_). ID ini dikirim ke browser klien dan disimpan dalam sebuah _cookie_.
> >         
> >     3. **Penyimpanan Data:** Data disimpan di server dalam sebuah file yang namanya sesuai dengan _Session ID_. Di PHP, ini dilakukan melalui variabel global `$_SESSION`. Contoh: `$_SESSION['user_id'] = 123;`.
> >         
> >     4. **Retrieval Data:** Pada request berikutnya, browser mengirimkan _cookie_ berisi _Session ID_. Server menggunakan ID ini untuk mencari file sesi yang sesuai dan memuat datanya ke dalam `$_SESSION`, sehingga data tersebut tersedia kembali untuk skrip.
> >         
> > - **Keunggulan:** **Data asli tidak pernah meninggalkan server**. Yang berpindah antara klien dan server hanyalah ID sebagai penanda.  
> > 
> > 	 ![[Pasted image 20250929075552.png]]

> [!cornell] #### Summary
> 
> Karena protokol HTTP bersifat _**stateless**_, aplikasi web memerlukan _**State Management**_ untuk "mengingat" data antar halaman. Tiga teknik dasar yang berpusat pada klien adalah: _**URL Parameter Passing**_ yang menyematkan data langsung di URL (terlihat dan tidak aman), _**Hidden Field**_ yang menyembunyikan data di dalam form (tidak terlihat langsung tapi masih terekspos di source code), dan _**Cookies**_ yang menyimpan data di browser pengguna untuk persistensi (namun memiliki batasan ukuran dan dapat dimanipulasi oleh pengguna). Terakhir, terdapat  _**Session**_ adalah teknik sisi server yang menyimpan semua data di server dan hanya menggunakan _Session ID_ (disimpan di _cookie_ klien) sebagai kunci pengenal, menjadikannya standar industri untuk menangani informasi login, keranjang belanja, dan data rahasia lainnya.

> [!ad-libitum]- Additional Information
> 
> #### Perbandingan Keuntungan & Kerugian
> 
> |**Teknik**|**Keuntungan (Advantage)**|**Kerugian (Disadvantage)**|**Kapan Digunakan?**|
> |---|---|---|---|
> |**URL Parameter**|Sederhana, mudah di-debug, halaman bisa di-_bookmark_|**Tidak aman** (data terlihat jelas), panjang URL terbatas, tidak cocok untuk data kompleks.|Untuk data non-sensitif seperti ID produk, nomor halaman, atau filter pencarian.|
> |**Hidden Field**|Sederhana, menyembunyikan data dari tampilan UI|**Tidak aman** (terlihat di _source code_), memerlukan form untuk pengiriman.|Untuk membawa data yang tidak perlu diubah pengguna dalam alur multi-langkah (misal: ID item saat update).|
> |**Cookies**|Persisten (bisa bertahan setelah browser ditutup), transparan bagi pengguna.|**Bisa dimanipulasi/dinonaktifkan** oleh klien, ukuran terbatas, risiko keamanan (CSRF/XSS).|Untuk menyimpan preferensi pengguna (tema gelap/terang), atau token "remember me". **Jangan simpan data sensitif!**|
> 
> #### Isu Keamanan: Mana yang Paling Buruk?
> 
> Secara umum, **URL Parameter Passing adalah yang paling tidak aman** untuk data sensitif karena data tersebut terekspos di mana-mana: di bilah alamat browser, di riwayat browser, di log server, dan jika URL tersebut dibagikan. Jangan pernah meletakkan informasi seperti kata sandi, token sesi, atau data pribadi di URL.
> 
> #### Eksplorasi Mandiri
> 
> - Buat halaman `halaman1.php` yang memiliki link ke `halaman2.php?nama=Budi`. Di `halaman2.php`, tangkap nilai `nama` menggunakan `$_GET` dan tampilkan pesan "Selamat datang, Budi!".  