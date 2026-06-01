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
> > - Kenapa HTTP umum digunakan untuk API?
> >     
> > - Apa kerugian menggunakan HTTP?
> >     
> > - Apa alternatif selain REST/HTTP?
> >     
> > - Apa itu Apache Thrift & Protocol Buffers?
> >     
> > - Bagaimana perbandingan efisiensinya?
> >     
> > - Bagaimana evolusi RPC?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF4031 Hal 19-20, 30
> >     
> 
> > ### Alasan Penggunaan HTTP untuk API
> >
> > HTTP menjadi sangat dominan karena ekosistem web telah menyelesaikan banyak masalah fundamental dalam komunikasi jaringan:
> >
> > - **Enkripsi:** HTTPS menyediakan keamanan data saat transit secara standar.
> >     
> > - **Kompresi:** HTTP mendukung kompresi (seperti gzip) untuk mengurangi ukuran data.
> >     
> > - **Ekosistem Matang:** Setiap bahasa pemrograman modern memiliki pustaka HTTP yang solid. Banyak sekali _server framework_ (Tomcat, Django, Node.js) yang sudah menangani masalah-masalah umum.
> >     
> > - **Infrastruktur Pendukung:** Dapat memanfaatkan infrastruktur web yang ada seperti _proxy_ dan _cache_.
> >     
> > - **Kode Respons Generik:** Kode status HTTP (200, 404, 500, dll.) cukup umum untuk digunakan dalam berbagai jenis layanan.
> >     
> >
> > ### Kerugian Menggunakan HTTP
> >
> > Meskipun populer, HTTP juga membawa beberapa kekurangan, terutama untuk komunikasi internal antar service:
> >
> > - **Kompleksitas Bawaan:** Mewarisi banyak fitur (seperti headers, cookies) yang mungkin tidak diperlukan untuk komunikasi _machine-to-machine_.
> >     
> > - **Overhead Format Teks:** Format yang dapat dibaca manusia (JSON) memiliki _overhead_ tambahan dibandingkan format biner. Membutuhkan lebih banyak byte dan proses parsing yang lebih lambat.
> >     
> > - **Keterbatasan Semantik:** Memaksakan semua operasi agar sesuai dengan model REST (resources dan metode HTTP) terkadang terasa tidak natural.
> >     
> >
> > ### Alternatif: RPC Biner
> >
> > Untuk mengatasi kekurangan HTTP, terutama dalam hal performa, ada standar alternatif yang tidak dibangun di atas HTTP. Dua yang paling populer adalah:
> >
> > - **Apache Thrift:** Awalnya dikembangkan di Facebook.
> >     
> > - **Protocol Buffers (gRPC):** Dikembangkan oleh Google.
> >     
> >
> > Keduanya adalah _framework_ RPC yang menggunakan format **serialisasi biner**.
> >
> > #### Karakteristik RPC Biner
> >
> >  - **Efisien:** Pesan jauh lebih ringkas (hemat _space_) dan lebih cepat diproses karena tidak _human-readable_.
> >      
> >  - **Tanpa Overhead HTTP:** Komunikasi terjadi pada level protokol yang lebih rendah, mengurangi latensi.
> >      
> >  - **Definisi API Formal:** Pengembang mendefinisikan layanan (fungsi, parameter, tipe data) dalam sebuah file skema khusus. Dari file ini, _tool_ akan secara otomatis menghasilkan kode _client_ dan _server_ dalam berbagai bahasa. Ini membuat pemanggilan fungsi remote terasa seperti memanggil fungsi lokal.
> >      
> >
> > ### Evolusi RPC
> >
> > Sejarah RPC menunjukkan pergeseran dari protokol biner yang kaku ke fleksibilitas berbasis teks (web), dan kini kembali lagi ke protokol biner yang dioptimalkan untuk era _microservices_.
> >
> > 1. **Awal** Mula (1980s): Sun RPC (protokol biner untuk sistem Unix).
> >     
> > 2. **Era Objek (1990s):** CORBA, Java RMI.
> >     
> > 3. **Era Web (Akhir 90an - 2000an):** XML-RPC, SOAP, lalu REST yang mendominasi.
> >     
> > 4. **Era Modern (2010s):** Munculnya gRPC, Apache Thrift, dan GraphQL sebagai respons atas kebutuhan performa tinggi di arsitektur _microservices_.
> >     

> [!cornell] #### Summary
> 
> HTTP diadopsi secara luas untuk API karena memanfaatkan ekosistem web yang matang untuk enkripsi, kompresi, dan dukungan pustaka, meskipun membawa overhead dari format teks dan kompleksitas yang tidak perlu. Sebagai alternatif yang lebih efisien, terutama untuk komunikasi internal antar layanan, framework RPC biner seperti Apache Thrift dan gRPC menawarkan performa superior dengan pesan yang ringkas dan pemrosesan cepat, serta kemudahan pengembangan melalui pembuatan kode otomatis dari skema API yang formal.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Interface Definition Language (IDL)
> 
> Jantung dari Thrift dan gRPC adalah **IDL (Interface Definition Language)**. Ini adalah file teks tempat Anda mendefinisikan _service_ Anda, mirip seperti mendefinisikan sebuah _interface_ dalam bahasa pemrograman.
> 
> **Contoh IDL untuk gRPC (`.proto` file):**
> 
> ```
> syntax = "proto3";
> // Layanan untuk Kalkulator
> 
> service Calculator {
> 	// Fungsi untuk menambahkan dua angka
> 	rpc Add(AddRequest) returns (AddResponse);
> }
>
> // Pesan request untuk fungsi Add
> message AddRequest {
> 	int32 number1 = 1;
> 	int32 number2 = 2;
> }
>
> // Pesan respons untuk fungsi Add
> 
> message AddResponse {
> 	int32 sum = 1;
> }
> 
> ```
> 
> Dari file `.proto` ini, `protoc` (Protocol Buffer Compiler) dapat menghasilkan kode dalam Java, Python, Go, C++, dll., yang sudah berisi semua *boilerplate code* untuk serial