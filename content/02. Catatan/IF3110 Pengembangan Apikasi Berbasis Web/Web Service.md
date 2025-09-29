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
> > - Apa itu Web Service?
> >     
> > - Apa itu SOA?
> >     
> > - **Pendekatan 1: SOAP**
> >     
> > - Apa itu WSDL & SOAP?
> >     
> > - **Pendekatan 2: REST**
> >     
> > - Apa itu RESTful Web Service?
> >     
> > - Apa perbedaan utama SOAP vs REST?
> >     
> > - Apa saja prinsip-prinsip REST?
> >     
> > - Apa fungsi HTTP Methods (GET, POST, etc.)?
> >     
> > - Apa itu OpenAPI (Swagger)?
> >     
> >
> > ## Reference Points
> >
> > - Slides 1-61
> >     
> 
> > ### Definisi dan Motivasi Web Service
> > 
> > **Web Service** adalah sistem perangkat lunak yang dirancang untuk mendukung interaksi **antar mesin (machine-to-machine)** melalui jaringan. Tujuannya bukan untuk menghasilkan antarmuka visual (HTML) bagi manusia, melainkan menyediakan data dan fungsionalitas dalam format yang dapat diproses oleh aplikasi lain.
> > 
> > **Motivasi Utama:**
> > 
> > - Memungkinkan aplikasi yang berbeda (beda bahasa, beda platform) untuk saling berkomunikasi.
> >     
> > - Membangun aplikasi besar dengan menyusun layanan-layanan kecil yang sudah ada.
> >     
> > - Menyediakan akses terprogram ke data atau fungsionalitas.
> >     
> > 
> > ### Arsitektur Berorientasi Layanan (SOA)
> > 
> > Web service adalah implementasi dari **SOA (Service-Oriented Architecture)**. Model ini memisahkan peran menjadi tiga:
> > 
> > 1. **Service Provider:** Pihak yang membuat dan mempublikasikan service.
> >     
> > 2. **Service Requestor:** Aplikasi yang menggunakan service.
> >     
> > 3. **Discovery Agency:** Direktori untuk menemukan service yang tersedia.
> >     
> > 
> > ### Pendekatan 1: Web Service Tradisional (SOAP)
> > 
> > Ini adalah pendekatan yang lebih tua, sangat terstruktur, dan berbasis protokol yang ketat.
> > 
> > - **WSDL (Web Services Description Language):** Sebuah "kontrak" berbasis XML yang mendeskripsikan secara detail apa yang bisa dilakukan sebuah service, data apa yang dibutuhkan, dan bagaimana cara mengaksesnya. Ini mirip seperti manual instruksi yang sangat rinci untuk mesin.
> >     
> > - **SOAP (Simple Object Access Protocol):** Protokol berbasis XML untuk mendefinisikan format pesan yang dikirim antara klien dan server. Pesan SOAP memiliki struktur yang kaku:
> >     
> >     - **Envelope:** Membungkus seluruh pesan.
> >         
> >     - **Header (Opsional):** Berisi metadata (info otentikasi, transaksi).
> >         
> >     - **Body:** Berisi data utama (panggilan fungsi dan parameternya).
> >         
> > 
> > ### Pendekatan 2: Web Service Modern (REST)
> > 
> > **REST (Representational State Transfer)** bukanlah protokol, melainkan sebuah **gaya arsitektur** yang memanfaatkan standar web yang sudah ada (terutama HTTP). Pendekatan ini jauh lebih sederhana dan fleksibel dibandingkan SOAP.
> > 
> > **Perbedaan Utama SOAP vs REST:**
> > 
> > - **SOAP** adalah tentang **aksi/fungsi** (misalnya, `getUserDetails()`).
> >     
> > - **REST** adalah tentang **sumber daya/benda** (misalnya, `/users/123`).
> >     
> > 
> > Contoh permintaan untuk mendapatkan detail pengguna ID 12345:
> > 
> > - **SOAP:** Memerlukan "amplop" XML yang panjang dan dikirim via HTTP POST.
> >     
> > - **REST:** Cukup dengan mengakses URL: `GET http://api.example.com/users/12345`
> >     
> > 
> > ### Prinsip-Prinsip Arsitektur REST
> > 
> > 1. **Addressable Resources (Sumber Daya Beralamat):** Setiap "benda" atau sumber daya (seperti pengguna, produk) memiliki alamat uniknya sendiri yang disebut **URI** (Uniform Resource Identifier). Contoh: `/products/42`.
> >     
> > 2. **Uniform & Constrained Interface (Antarmuka Seragam):** Interaksi dengan sumber daya dilakukan menggunakan metode standar HTTP yang sudah ada, yang dipetakan ke operasi CRUD (Create, Read, Update, Delete).
> >     
> >     - **GET:** Membaca/mengambil data (Read).
> >         
> >     - **POST:** Membuat data baru (Create).
> >         
> >     - **PUT:** Memperbarui/mengganti data yang sudah ada (Update).
> >         
> >     - **DELETE:** Menghapus data (Delete).
> >         
> > 3. **Representation-Oriented (Berorientasi Representasi):** Klien dan server bertukar _representasi_ dari sumber daya. Representasi ini bisa dalam berbagai format, seperti **JSON** (paling populer), XML, atau lainnya.
> >     
> > 4. **Stateless Communication (Komunikasi Tanpa Status):** Setiap permintaan dari klien harus berisi semua informasi yang dibutuhkan server untuk memahaminya. Server tidak menyimpan status sesi klien di antara permintaan.
> >     
> > 
> > ### Deskripsi API Modern: OpenAPI Specification (Swagger)
> > 
> > Jika WSDL adalah kontrak untuk SOAP, maka **OpenAPI** adalah standar modern untuk mendeskripsikan API RESTful. Ini adalah file (biasanya dalam format YAML atau JSON) yang mendefinisikan semua _endpoint_ (URL), metode HTTP yang tersedia, parameter yang dibutuhkan, dan contoh respons. OpenAPI memudahkan manusia dan mesin untuk memahami dan berinteraksi dengan sebuah API.

> [!cornell] #### Summary
> 
> **Web Service memungkinkan komunikasi antar aplikasi, yang dapat diimplementasikan melalui dua pendekatan utama. Pendekatan tradisional menggunakan SOAP, sebuah protokol ketat berbasis XML dengan deskripsi layanan formal melalui WSDL. Pendekatan modern yang lebih populer adalah REST, sebuah gaya arsitektur yang lebih ringan dan fleksibel, yang memperlakukan data sebagai sumber daya (resource) yang dapat diakses melalui URI dan dimanipulasi menggunakan metode standar HTTP (GET, POST, PUT, DELETE), dengan deskripsi API yang didefinisikan oleh OpenAPI.**

> [!ad-libitum]- Additional Information
> 
> #### Tabel Perbandingan: SOAP vs. REST
> 
> |**Fitur**|**SOAP**|**REST**|
> |---|---|---|
> |**Filosofi**|Protokol (aturan ketat)|Gaya Arsitektur (panduan fleksibel)|
> |**Format Data**|Hanya XML|JSON (umumnya), XML, teks, dll.|
> |**Kontrak**|WSDL (Wajib & Kaku)|OpenAPI/Swagger (Opsional & Fleksibel)|
> |**Transport**|Bisa via HTTP, SMTP, dll.|Umumnya hanya HTTP/HTTPS|
> |**Performa**|Lebih "berat" karena overhead XML.|Lebih ringan dan cepat.|
> |**Keamanan**|Standar WS-Security bawaan yang komprehensif.|Mengandalkan standar transport (HTTPS) dan skema otentikasi (OAuth, JWT).|
> |**Use Case**|Sistem enterprise, perbankan, transaksi yang butuh standar ketat.|API publik, aplikasi mobile, microservices, di mana kecepatan dan fleksibilitas penting.|
> 
> #### Apa itu JSON?
> 
> **JSON (JavaScript Object Notation)** adalah format pertukaran data yang ringan dan mudah dibaca manusia. Strukturnya mirip dengan objek di JavaScript, menggunakan pasangan kunci-nilai. Karena lebih ringkas daripada XML, JSON menjadi format data pilihan untuk sebagian besar API RESTful modern.
> 
> ```
> {
>   "id": 123,
>   "name": "John Doe",
>   "email": "john.doe@example.com",
>   "isActive": true
> }
> ```