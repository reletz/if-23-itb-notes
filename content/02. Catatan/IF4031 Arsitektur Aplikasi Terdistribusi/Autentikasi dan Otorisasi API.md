---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Bagaimana alur autentikasi web HTML?
> >     
> > - Apa itu Session ID & Cookie?
> >     
> > - Beda Random ID vs Rich Token?
> >     
> > - Apa itu OAuth 2.0?
> >     
> > - Bagaimana alur autentikasi REST API?
> >     
> > - Apa itu JWT?
> >     
> > - Apa saja komponen JWT?
> >     
> > - Bagaimana token dikirim ke server?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 21-28
> >     
> 
> > ### Autentikasi Antarmuka Web (HTML)
> > 
> > Alur autentikasi tradisional pada web berbasis HTML umumnya menggunakan **cookies** dan **sessions**.
> > 
> > 1. **Login:** Pengguna mengirimkan username dan password.
> >     
> > 2. **Verifikasi & Pembuatan Sesi:** Server memverifikasi kredensial. Jika valid, server membuat sebuah _session_ (catatan di database server) dan menghasilkan sebuah **Session ID** yang unik.
> >     
> > 3. **Pengiriman Cookie:** Server mengirimkan Session ID ini kembali ke browser dalam bentuk _cookie_.
> >     
> > 4. **Request Berikutnya:** Untuk setiap request selanjutnya, browser akan secara otomatis menyertakan _cookie_ tersebut. Server menggunakan Session ID dari _cookie_ untuk mencari data sesi dan mengidentifikasi pengguna.
> >     
> > 
> > #### Random ID vs. Rich Token
> > 
> > - **Random Unique ID:** Session ID adalah string acak yang tidak bermakna. Server perlu melakukan _query_ ke database pada setiap request untuk mendapatkan informasi pengguna. Ini aman tetapi bisa menjadi _bottleneck_.
> >     
> > - **Rich Token:** Informasi pengguna (seperti user ID, role, waktu kedaluwarsa) disematkan langsung di dalam _token_ itu sendiri. Server tidak perlu _query_ ke database, cukup memverifikasi _token_. Namun, _token_ ini harus diamankan dengan tanda tangan digital (_signature_) agar tidak bisa dipalsukan.
> >     
> > 
> > ### Autentikasi Antarmuka RESTful
> > 
> > Untuk API, terutama yang diakses oleh aplikasi non-browser (seperti aplikasi mobile), standar yang umum digunakan adalah **OAuth 2.0**.
> > 
> >  #### OAuth 2.0
> >  
> >  OAuth adalah **standar otorisasi**, bukan autentikasi. Ia mendefinisikan alur bagaimana sebuah aplikasi (klien) bisa mendapatkan izin untuk mengakses _resource_ milik seorang pengguna tanpa harus mengetahui _password_ pengguna tersebut. Hasil akhir dari alur OAuth adalah sebuah **Access Token**.
> > 
> >  #### Alur Umum dengan OAuth
> >  
> >  1. Aplikasi Klien meminta otorisasi dari pengguna dan mengarahkannya ke **Authorization Server**.
> >      
> >  2. Pengguna login di Authorization Server dan menyetujui permintaan akses.
> >      
> >  3. Authorization Server mengembalikan sebuah _token_ ke Aplikasi Klien.
> >      
> >  4. Aplikasi Klien menggunakan _token_ ini untuk mengakses **Resource Server** (API sebenarnya).
> >      
> > 
> > ### JSON Web Token (JWT)
> > 
> > JWT adalah format standar untuk membuat _access token_ yang bersifat _self-contained_ atau _rich token_. Token JWT terlihat seperti string panjang yang acak, tetapi sebenarnya terdiri dari tiga bagian yang dipisahkan oleh titik (`.`), di-encode menggunakan Base64Url.
> > 
> >  #### Komponen JWT
> > 
> >  1. **Header:** Berisi metadata tentang token, seperti algoritma _signature_ yang digunakan (`alg`).
> >      
> >  2. **Payload:** Berisi data sebenarnya, yang disebut _claims_. Contohnya `sub` (subject/user ID), `name` (nama pengguna), dan `exp` (waktu kedaluwarsa).
> >      
> >  3. **Signature:** Dihasilkan dengan menggabungkan _header_ dan _payload_, lalu menandatanganinya dengan sebuah _secret key_ yang hanya diketahui oleh server. Ini digunakan untuk memverifikasi bahwa token tersebut asli dan tidak diubah di tengah jalan.
> >     
> > 
> > ### Pengiriman Token
> > 
> > Klien umumnya mengirimkan _access token_ (seperti JWT) ke server pada setiap request melalui _HTTP header_ `Authorization` dengan skema `Bearer`.
> > 
> > `Authorization: Bearer <token_jwt_panjang_disini>`

> [!cornell] #### Summary
> 
> Autentikasi API telah berevolusi dari mekanisme berbasis sesi dan cookie yang umum di web HTML, menjadi alur otorisasi berbasis token yang distandarisasi oleh OAuth 2.0. Dalam sistem modern, Authorization Server mengeluarkan sebuah Access Token, seringkali dalam format JSON Web Token (JWT), setelah pengguna memberikan persetujuan. JWT ini adalah sebuah rich token yang berisi informasi pengguna dan diverifikasi menggunakan signature digital, yang kemudian dikirim oleh klien pada setiap request di header `Authorization: Bearer` untuk mengakses resource yang dilindungi.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Alur Grant Type di OAuth 2.0
> 
> OAuth 2.0 sangat fleksibel dan memiliki beberapa "grant types" atau alur untuk mendapatkan token, disesuaikan dengan jenis klien:
> 
> - **Authorization Code:** Alur paling aman dan umum untuk aplikasi web tradisional. Melibatkan _redirect_ ke server otorisasi.
>     
> - **Implicit:** Alur yang disederhanakan untuk aplikasi _single-page_ (SPA) yang berjalan di browser, tetapi kini kurang direkomendasikan.
>     
> - **Resource Owner Password Credentials:** Klien langsung meminta _username_ dan _password_ pengguna. Hanya boleh digunakan untuk klien yang sangat dipercaya (misalnya, aplikasi resmi dari pemilik layanan).
>     
> - **Client Credentials:** Digunakan untuk komunikasi _machine-to-machine_, di mana tidak ada pengguna akhir yang terlibat. Klien mengautentikasi dirinya sendiri untuk mengakses API.
>     
> 
> #### Masalah Keamanan Cookie
> 
> - **XSS (Cross-Site Scripting):** Jika sebuah situs rentan terhadap XSS, penyerang bisa menyuntikkan JavaScript untuk mencuri _cookie_ pengguna dan mengambil alih sesi mereka. Atribut _cookie_ `HttpOnly` membantu mencegah ini.
>     
> - **CSRF (Cross-Site Request Forgery):** Penyerang menipu browser pengguna untuk mengirim request ke situs lain di mana pengguna sedang login. Atribut _cookie_ `SameSite` dirancang untuk mengatasi masalah ini.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **jwt.io:** Situs web yang sangat berguna untuk men-_decode_, memverifikasi, dan men-_generate_ JWT untuk keperluan debugging.
>     
> - **Auth0:** Salah satu penyedia layanan identitas (_Identity-as-a-Service_) terkemuka yang memiliki banyak dokumentasi dan artikel bagus yang menjelaskan OAuth 2.0 dan JWT dengan sangat jelas.
>