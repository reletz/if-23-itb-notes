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
> > - Apa itu API?
> >     
> > - Apa saja pertimbangan desain API?
> >     
> > - Apa itu REST?
> >     
> > - Apa saja metode HTTP umum?
> >     
> > - Apa itu Idempotence?
> >     
> > - Bagaimana desain API yang RESTful?
> >     
> > - Apa itu JSON?
> >     
> > - Apa itu XML?
> >     
> > - Apa itu Serialisasi?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF4031 Hal 2-18
> >     
> 
> > ### Definisi API (Application Programming Interface)
> >
> > API adalah sebuah antarmuka yang mendefinisikan bagaimana sebuah software dapat berinteraksi atau digunakan oleh software lain. Untuk layanan jaringan (_network service_), API ini seringkali berbentuk **Remote Procedure Call (RPC)**.
> >
> > ### Pertimbangan Desain API
> >
> > Saat merancang sebuah API, beberapa hal utama yang perlu dipertimbangkan adalah:
> >
> > - **Format Data:** Apakah akan menggunakan format teks (human-readable seperti JSON) atau biner (lebih efisien).
> >     
> > - **Architectural Style:** Apakah akan berorientasi pada _resource_ (seperti REST), RPC (pemanggilan fungsi langsung), atau query (seperti GraphQL).
> >     
> >
> > ### REST (Representational State Transfer)
> >
> > REST adalah sebuah **gaya arsitektur**, bukan protokol atau standar yang kaku. REST memanfaatkan fitur-fitur standar dari protokol HTTP untuk komunikasi.
> >
> >  #### Metode HTTP dan Semantiknya
> >
> >  - `GET`: Meminta atau membaca data dari sebuah resource.
> >      
> >  - `POST`: Mengirimkan data untuk membuat entitas baru di bawah sebuah resource.
> >      
> >  - `PUT`: Membuat atau mengganti sebuah resource secara keseluruhan pada URL tertentu.
> >      
> >  - `DELETE`: Menghapus sebuah resource.
> >    
> > - `HEAD`: Serupa `GET`, namun hanya mengembalikan _header_
> > 
> > #### Response
> > - `2XX`: Sukses
> > - `3XX`: Perlu aksi tambahan sehingga aksi dapat dipenuhi
> > - `4XX`: Masalah terjadi pada klien
> > - `5XX`: Masalah terjadi pada server
> > 
> >  #### Idempotence
> >
> > Sebuah operasi disebut **idempotent** jika menjalankannya berkali-kali akan memberikan hasil yang sama seperti menjalankannya sekali. Dalam HTTP, `GET`, `HEAD`, `PUT`, dan `DELETE` harus bersifat idempotent, sedangkan `POST` tidak.
> >
> >  - **Contoh Buruk:** `DELETE /posts/latest`. Jika dipanggil berulang kali, ini akan terus menghapus post yang "terbaru" pada saat itu.
> >      
> >  - **Contoh Baik:** `DELETE /posts/123`. Memanggil ini berulang kali hanya akan menghapus post dengan ID 123; setelah yang pertama, panggilan berikutnya tidak akan mengubah state sistem lagi.
> >     
> >
> >  #### Desain Resource-Oriented
> >
> >  Dalam REST, _path_ atau URI merepresentasikan "resources" (kata benda), bukan "actions" (kata kerja).
> >
> >  - **Kurang RESTful:** `POST /createUser`
> >      
> >  - **Lebih RESTful:** `POST /users`
> >      
> >
> > ### Format Data dan Serialisasi
> >
> >  #### JSON (JavaScript Object Notation)
> >
> >  Format data berbasis teks yang ringan dan mudah dibaca manusia. Menjadi standar de facto untuk REST API modern. Strukturnya terdiri dari _objects_ `{}` (pasangan key-value) dan _arrays_ `[]` (daftar berurut).
> >
> >  #### XML (eXtensible Markup Language)
> >
> >  Format yang lebih tua dan lebih verbose, menggunakan _tags_ (`<tag>...</tag>`) untuk menstrukturkan data. Dulu populer, kini jarang digunakan untuk API baru karena kompleksitasnya.
> >
> >  #### Serialisasi
> >
> >  Serialisasi adalah proses mengubah struktur data kompleks di dalam memori (seperti objek atau graf) menjadi format linier (urutan byte) agar dapat ditransmisikan melalui jaringan atau disimpan dalam file. JSON dan XML adalah format hasil serialisasi.

> [!cornell] #### Summary
> 
> API adalah antarmuka yang memungkinkan komunikasi antar software, dengan REST menjadi gaya arsitektur yang paling dominan untuk layanan web. REST memanfaatkan metode standar HTTP (GET, POST, PUT, DELETE) dan berfokus pada konsep "resources" yang idempotent. Untuk mentransmisikan data, struktur data di memori harus melalui proses serialisasi menjadi format teks seperti JSON, yang kini menjadi standar industri, atau XML yang lebih lawas.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: HATEOAS
> 
> Prinsip REST yang sering dilupakan adalah **HATEOAS (Hypermedia as the Engine of Application State)**. Ini berarti respons dari API seharusnya menyertakan link (hypermedia) ke aksi-aksi lain yang relevan yang bisa dilakukan selanjutnya. Contoh pada slide 7 menunjukkan ini dengan baik:
> 
> ```
> "links": {
>   "deposit": "/accounts/12345/deposit",
>   "withdraw": "/accounts/12345/withdraw"
> }
> ```
> 
> Dengan ini, klien tidak perlu "menghafal" struktur URL, melainkan bisa "menemukan" aksi yang tersedia dari respons yang diterima.
> 
> #### JSON vs. XML: Mengapa JSON Menang?
> 
> 1. **Ringkas:** JSON jauh lebih tidak verbose (hemat karakter) dibandingkan XML.
>     
> 2. **Parsing:** JSON lebih mudah dan cepat untuk di-parse oleh mesin, terutama di lingkungan web karena sintaksnya adalah subset dari JavaScript.
>     
> 3. **Keterbacaan:** Bagi banyak developer, struktur key-value JSON lebih mudah dibaca daripada struktur tag XML.
>     
> 
> #### Tools untuk Bekerja dengan API
> 
> - **Postman:** Aplikasi desktop yang menjadi standar industri untuk merancang, menguji, dan mendokumentasikan API. Sangat berguna untuk mengirim berbagai jenis request HTTP dan melihat responsnya.
>     
> - **Swagger/OpenAPI:** Sebuah spesifikasi untuk mendefinisikan REST API. Ini memungkinkan pembuatan dokumentasi interaktif secara otomatis, bahkan pembuatan _client library_ dalam berbagai bahasa.
>