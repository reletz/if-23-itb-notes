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
> > - Definisi Microservices?
> >     
> > - Contoh?
> >     
> > - Konsep _Information Hiding_?
> >     
> > - Peran API & Events?
> >     
> > - Hubungan dengan SOA?
> >     
> > - 5 Konsep Kunci?
> >     
> > - 1. Independent Deployability?
> >         
> > - 2. Modeled Around Business Domain?
> >         
> > - 3. Owning Their Own State?
> >         
> > - 4. Size (Ukuran)?
> >         
> > - 5. Flexibility?
> >         
> >
> > ## Reference Points
> >
> > - Slides IF3110-11b-Intro-to-Microservices-Arch.pdf (Slide 3-11)
> >     
> > - Sam Newman - Building Microservices, Ch. 1
> >     
> 
> > ### Definisi Microservices
> >
> > _Microservices_ adalah sebuah **pilihan arsitektur** untuk membangun sistem.
> >
> > Definisinya: **Layanan yang dapat dirilis secara independen (**_**independently releasable**_**)** yang dimodelkan di sekitar **domain bisnis**.
> >
> > Sebuah layanan mengenkapsulasi (membungkus) fungsionalitas dan membuatnya dapat diakses oleh layanan lain melalui jaringan. Sistem yang lebih kompleks dibangun dari gabungan layanan-layanan ini.
> >
> > Contoh:
> > 
> > Dalam sistem e-commerce, kita bisa memiliki:
> >
> > - Satu _microservice_ untuk **Inventory** (stok barang).
> >     
> > - Satu _microservice_ untuk **Order Management** (pesanan).
> >     
> > - Satu _microservice_ untuk **Shipping** (pengiriman).
> >     
> >
> > Ketiganya bekerja sama membentuk satu sistem _e-commerce_ yang utuh.
> >
> > ### Information Hiding (Penyembunyian Informasi)
> >
> > _Microservices_ sangat menganut konsep _information hiding_.
> >
> > - **Artinya:** Menyembunyikan sebanyak mungkin informasi (detail implementasi, skema database) di dalam sebuah komponen, dan mengekspos sesedikit mungkin fungsionalitas melalui _interface_ eksternal.
> >     
> > - Dari luar, sebuah _microservice_ diperlakukan sebagai **kotak hitam (**_**black box**_**)**.
> >     
> > - _Interface_ eksternal ini bisa berupa **REST API** (untuk _request_ sinkron) atau **Events** (untuk notifikasi asinkron).
> >     
> >
> > ### Hubungan dengan SOA (Service-Oriented Architecture)
> >
> > - **SOA:** Pendekatan desain di mana banyak layanan berkolaborasi untuk menyediakan kapabilitas. Ini adalah konsep yang luas.
> >     
> > - **Microservices:** Adalah **pendekatan spesifik** untuk SOA.
> >     
> > - **Analogi:** Jika _Agile software development_ adalah konsep luasnya, maka _Scrum_ atau _Extreme Programming (XP)_ adalah pendekatan spesifiknya.
> >     
> >
> > ### 5 Konsep Kunci Microservices
> >
> > 1. **Independent Deployability (Dapat Di-deploy Mandiri)**
> >     
> > 	- Ini adalah ide terpenting. Kita bisa membuat perubahan pada satu *microservice*, men-*deploy* nya, dan merilis perubahan itu ke pengguna **tanpa harus men-deploy layanan lain**.
> > 	- Untuk mencapainya, layanan harus **longgar-kopling (*loosely coupled*)**. Kita harus bisa mengubah satu layanan tanpa harus mengubah layanan lain.
> > 
> >
> > 2. **Modeled Around a Business Domain (Dimodelkan Seputar Domain Bisnis)**
> >     
> > 	- Layanan dipecah berdasarkan fungsi bisnis (misal: "Profile", "Purchase"), bukan berdasarkan lapisan teknis (misal: "UI Layer", "Database Layer").
> > 	- Ini memprioritaskan **kohesi fungsionalitas bisnis** di atas kohesi fungsionalitas teknis. Tujuannya agar perubahan pada fitur bisnis bisa dilakukan seefisien mungkin.
> > 
> > 3. **Owning Their Own State (Memiliki State Sendiri)**
> >
> > 	- Ide bahwa *microservices* harus **menghindari penggunaan *database* bersama (*shared databases*)**.
> > 	- Jika Layanan A butuh data dari Layanan B, ia harus *meminta* ke Layanan B (misal: via API). Layanan A tidak boleh mengakses *database* Layanan B secara langsung.
> > 	- Ini memberi layanan otonomi untuk memutuskan apa yang dibagikan (kontrak eksternal) vs. apa yang disembunyikan (implementasi internal), yang memungkinkan *independent deployability*.
> > 
> >
> > 4. **Size (Ukuran)**
> >     
> > 	- Seberapa "micro" (kecil)? Ini bukan soal jumlah baris kode.
> > 	- Kutipan James Lewis: "Sebesar kepala saya".
> > 	- Rasionalnya: Sebuah *microservice* harus dijaga ukurannya agar **cukup kecil untuk dapat dipahami dengan mudah** (oleh satu orang atau satu tim kecil).
> >
> >
> > 5. **Flexibility (Fleksibilitas)**
> > 		
> > 	- "Microservices membeli Anda opsi." - James Lewis.
> > 	- Pendekatan ini memiliki biaya (kompleksitas), tetapi biaya itu dibayar untuk mendapatkan fleksibilitas dalam berbagai aspek: organisasi, teknis, *scaling*, dan ketahanan (*robustness*).
> >

> [!cornell] #### Summary
> 
> **Microservices** adalah sebuah arsitektur yang terdiri dari **layanan yang dapat dirilis secara independen** (_independent deployability_), di mana setiap layanan dimodelkan di sekitar **domain bisnis** tertentu (misal: "Shipping"). Konsep intinya adalah _**information hiding**_, di mana setiap layanan adalah _black box_ yang **memiliki** _**database**_**-nya sendiri (**_**owning their own state**_**)** dan hanya mengekspos fungsionalitas via API atau _events_. Tujuannya adalah untuk mencapai **fleksibilitas** dan memungkinkan perubahan yang cepat, dengan menjaga ukuran layanan agar **mudah dipahami**.

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis: Kenapa "No Shared Database" Sangat Penting?
> 
> Konsep "Owning Their Own State" adalah aturan yang paling fundamental dan sering dilanggar.
> 
> - **Skenario Buruk (**_**Shared Database**_**):**
>     
>     - Layanan `Inventory` dan layanan `Shipping` keduanya mengakses tabel `Products` di _database_ yang sama.
>         
>     - Tim `Inventory` memutuskan untuk mengubah skema tabel `Products` (misal: mengubah nama kolom `weight_kg` menjadi `weight_g`).
>         
>     - **Apa yang terjadi?** Layanan `Shipping` yang masih membaca `weight_kg` akan _crash_.
>         
>     - **Hasil:** Kedua layanan menjadi **terikat erat (**_**tightly coupled**_**)**. Mereka tidak bisa di-_deploy_ secara independen. Perubahan di `Inventory` _memaksa_ perubahan di `Shipping`. Ini adalah _Distributed Monolith_.
>         
> - **Skenario Baik (**_**Owning State**_**):**
>     
>     - Layanan `Inventory` memiliki _database_ `Inventory_DB` (dengan tabel `Products`).
>         
>     - Layanan `Shipping` memiliki _database_ `Shipping_DB`.
>         
>     - Jika `Shipping` butuh info berat produk, ia **memanggil API** `Inventory` (misal: `GET /products/123`).
>         
>     - Layanan `Inventory` mengembalikan JSON: `{ "id": 123, "weight": { "unit": "kg", "value": 5 } }`.
>         
>     - Sekarang, tim `Inventory` bebas mengubah _database_ internal mereka (misal: dari `weight_kg` ke `weight_g`). Selama **kontrak API** mereka tetap sama (mereka tetap mengembalikan JSON dengan format yang sama), layanan `Shipping` **tidak akan pernah tahu dan tidak akan pernah** _**crash**_.
>         
> 
> Inilah inti dari _loose coupling_ dan _independent deployability_.