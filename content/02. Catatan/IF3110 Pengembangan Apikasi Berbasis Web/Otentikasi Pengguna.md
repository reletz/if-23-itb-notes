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
> > - Apa itu Otentikasi?
> >     
> > - Mengapa otentikasi penting di web?
> >     
> > - Bagaimana alur otentikasi umum?
> >     
> > - Bagaimana cara menyimpan password dengan aman?
> >     
> > - Apa itu Hashing & Salting?
> >     
> > - Apa itu Otentikasi berbasis Database?
> >     
> > - Apa itu OAuth?
> >     
> > - Apa itu JWT?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 27-50
> >     
> 
> > ### Apa itu Otentikasi (Authentication)?
> > 
> > Otentikasi adalah proses **verifikasi identitas** untuk memastikan bahwa seseorang atau sesuatu adalah benar-benar seperti yang mereka klaim. Tujuannya adalah untuk menjawab pertanyaan: "Siapa Anda?".
> > 
> > Ada tiga cara umum untuk membuktikan identitas:
> > 
> > 1. **Sesuatu yang Anda tahu** (Contoh: Password, PIN).
> >     
> > 2. **Sesuatu yang Anda miliki** (Contoh: Token, kunci fisik, smartphone).
> >     
> > 3. **Sesuatu yang merupakan bagian dari diri Anda** (Contoh: Sidik jari, pemindaian retina).
> >     
> > 
> > Di konteks web, otentikasi sangat penting karena sifat HTTP yang _stateless_, sehingga server perlu cara untuk mengidentifikasi setiap pengguna yang berinteraksi dengannya.
> > 
> > ### Alur Otentikasi Umum di Web
> > 
> > Proses otentikasi paling umum di aplikasi web, terutama yang berbasis database, mengikuti alur berikut:
> > 
> > 4. **Tampilkan Form Login:** Pengguna melihat halaman dengan input untuk username dan password.
> >     
> > 5. **Kirim Kredensial:** Pengguna mengirimkan form. Data dikirim ke server.
> >     
> > 6. **Verifikasi di Server:** Server memeriksa kredensial yang dikirim dengan data yang tersimpan di database.
> >     
> > 7. **Buat Sesi (Session):** Jika kredensial valid, server memulai sebuah sesi dan menyimpan penanda identitas pengguna (misalnya, username atau ID) di `$_SESSION`.
> >     
> > 8. **Pemeriksaan Sesi:** Pada setiap permintaan berikutnya dari pengguna ke halaman yang dilindungi, server akan memeriksa apakah ada sesi yang valid.
> >     
> > 9. **Logout:** Saat pengguna keluar, sesi dihancurkan (`session_destroy()`) untuk menghapus status login.
> >     
> > 
> > ### Keamanan Password: Hashing dan Salting
> > 
> > **Aturan Paling Penting:** **JANGAN PERNAH MENYIMPAN PASSWORD DALAM BENTUK PLAINTEXT (TEKS ASLI)!**
> > 
> > Jika database bocor, semua password pengguna akan terekspos. Solusinya adalah menggunakan **hashing**.
> > 
> > - **Hashing:** Adalah proses mengubah string (password) menjadi string lain dengan panjang tetap yang tidak dapat dibalikkan (_one-way function_). Contoh algoritma: SHA-256.
> >     
> > - **Salting:** Sebelum melakukan hashing, sebuah string acak unik (_salt_) ditambahkan ke password. Ini memastikan bahwa bahkan dua pengguna dengan password yang sama akan memiliki hasil hash yang berbeda di database. _Salting_ sangat efektif melawan serangan _rainbow table_.
> >     
> > 
> > Di PHP, fungsi `password_hash()` sudah secara otomatis menangani hashing dan salting dengan aman. Untuk memverifikasi, gunakan `password_verify()`.
> > 
> > ### Otentikasi Berbasis Database
> > 
> > Ini adalah metode di mana aplikasi memvalidasi kredensial pengguna terhadap tabel pengguna di databasenya sendiri.
> > 
> > - **Proses Login:**
> >     
> >     1. Ambil baris data pengguna dari database berdasarkan `username` yang dimasukkan.
> >         
> >     2. Gunakan `password_verify()` untuk membandingkan password yang dikirim dengan hash yang tersimpan di database.
> >         
> >     3. Jika cocok, buat sesi. Jika tidak, tampilkan pesan error.
> >         
> > 
> > ### Otentikasi Eksternal: OAuth
> > 
> > **OAuth (Open Authorization)** adalah sebuah protokol otorisasi yang didelegasikan. Ini memungkinkan aplikasi pihak ketiga (_consumer_) untuk mendapatkan akses terbatas ke data pengguna di layanan lain (_service provider_), **tanpa aplikasi tersebut perlu mengetahui password pengguna**.
> > 
> > **Contoh:** Fitur "Login with Google".
> > 
> > - **Aktor dalam OAuth:**
> >     
> >     - **User:** Pemilik data.
> >         
> >     - **Resource Consumer (Client):** Aplikasi yang ingin mengakses data (misal: Tokopedia).
> >         
> >     - **Authorization Server:** Server yang mengotentikasi pengguna (misal: Google).
> >         
> >     - **Resource Server:** Server yang menyimpan data pengguna (misal: Google).
> >         
> > - **Alur Sederhana:** Aplikasi Anda mengarahkan pengguna ke Google. Pengguna login di Google dan memberikan izin. Google kemudian memberikan "token" kepada aplikasi Anda yang bisa digunakan untuk mengakses data yang diizinkan.
> >     
> > 
> > ### JSON Web Tokens (JWT)
> > 
> > JWT adalah sebuah standar terbuka untuk membuat token akses yang ringkas dan mandiri (_self-contained_). Token ini berisi "klaim" (informasi) dalam format JSON yang dapat diverifikasi secara kriptografis.
> > 
> > - **Struktur JWT:** Terdiri dari tiga bagian yang dipisahkan oleh titik (`.`):
> >     
> >     1. **Header:** Berisi informasi tentang algoritma enkripsi.
> >         
> >     2. **Payload:** Berisi klaim (data) seperti ID pengguna, peran, dan waktu kedaluwarsa token.
> >         
> >     3. **Signature:** Tanda tangan digital untuk memverifikasi bahwa token tidak diubah.
> >         
> > - **Penggunaan:** JWT sering digunakan dalam API dan aplikasi _single-page_ sebagai pengganti sesi tradisional karena sifatnya yang _stateless_ (tidak perlu disimpan di server).
> >     

> [!cornell] #### Summary
> 
> **Otentikasi adalah proses verifikasi identitas pengguna, yang di web umumnya dilakukan melalui form login yang divalidasi oleh database dan dikelola statusnya menggunakan** _**session**_**. Untuk keamanan, password pengguna **wajib** disimpan sebagai** _**hash**_ **yang di-**_**salt**_**, bukan teks asli, menggunakan fungsi seperti `password_hash()`. Selain otentikasi internal, protokol seperti **OAuth** memungkinkan otorisasi yang didelegasikan (seperti "Login with Google"), sementara **JWT** menyediakan format token yang** _**stateless**_ **untuk otentikasi di API dan aplikasi modern.**

> [!ad-libitum]- Additional Information
> 
> #### Otentikasi vs. Otorisasi (Authentication vs. Authorization)
> 
> Ini adalah dua konsep yang sering tertukar, namun sangat berbeda:
> 
> - **Otentikasi (Authentication):** Menjawab "Siapa Anda?". Ini adalah proses verifikasi identitas. (Contoh: Menunjukkan KTP saat masuk gedung).
>     
> - **Otorisasi (Authorization):** Menjawab "Apa yang boleh Anda lakukan?". Ini adalah proses memberikan izin akses ke sumber daya tertentu. (Contoh: Setelah KTP diverifikasi, Anda diberi kartu akses yang hanya bisa membuka pintu ke lantai 5).
>     
> 
> Proses otentikasi selalu terjadi sebelum otorisasi.
> 
> #### Session vs. JWT
> 
> |**Fitur**|**Session**|**JWT**|
> |---|---|---|
> |**Penyimpanan**|Data disimpan di server.|Data (klaim) disimpan di dalam token di sisi klien.|
> |**Sifat**|Stateful (Server perlu menyimpan state).|Stateless (Server tidak perlu menyimpan state).|
> |**Skalabilitas**|Bisa menjadi masalah di sistem terdistribusi (memerlukan _session store_ bersama).|Sangat mudah diskalakan karena tidak ada state di server.|
> |**Keamanan**|Dianggap lebih aman karena data sensitif tidak pernah meninggalkan server.|Jika token bocor, bisa disalahgunakan hingga kedaluwarsa. Perlu implementasi yang hati-hati.|
> 
> #### Tips Keamanan Tambahan
> 
> - **Auto Log-off:** Secara otomatis hancurkan sesi setelah periode tidak aktif tertentu (`session.gc_maxlifetime`).
>     
> - **HttpOnly Cookies:** Atur cookie sesi sebagai `HttpOnly` untuk mencegah skrip JavaScript di sisi klien (misalnya dari serangan XSS) mengakses ID sesi.
>
