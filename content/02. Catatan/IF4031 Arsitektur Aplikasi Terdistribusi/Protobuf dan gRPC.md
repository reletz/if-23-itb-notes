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
> > - Apa itu Protocol Buffer (Protobuf)?
> >     
> > - Apa itu gRPC?
> >     
> > - Bagaimana arsitektur dasar gRPC?
> >     
> > - Apa peran HTTP/2?
> >     
> > - Apa itu Binary Framing?
> >     
> > - Apa itu Multiplexing & Stream?
> >     
> > - Bagaimana struktur file `.proto`?
> >     
> > - Bagaimana cara membangkitkan kode?
> >     
> > - Bagaimana serialisasi & parsing bekerja?
> >     
> > - Bagaimana mendefinisikan service gRPC?
> >     
> > - Apa saja jenis-jenis RPC di gRPC?
> >     
> > - Bagaimana alur kerja RPC?
> >     
> > - Apa perbedaan gRPC vs Thrift?
> >     
> > - Kapan menggunakan gRPC atau Thrift?
> >     
> > - Perbandingan tipe data
> >     
> >
> > ## Reference Points
> >
> > - Slides 04c-IF4031-05b-2022-RemoteProcedureCall---Protobuf.pdf
> >     
> 
> > ### Apa itu Protocol Buffer (Protobuf)?
> > 
> > **Protocol Buffer (Protobuf)** adalah sebuah _library_ untuk **serialisasi data** yang dikembangkan oleh Google. Ini juga berfungsi sebagai **Interface Definition Language (IDL)**, yang memungkinkan kita untuk mendefinisikan struktur data dan antarmuka layanan (service) dalam sebuah file khusus (`.proto`).
> > 
> > Komponen utamanya meliputi:
> > 
> > - **IDL**: Bahasa untuk mendeskripsikan skema data.
> >     
> > - **Compiler (`protoc`)**: Alat yang mengambil file `.proto` dan menghasilkan kode sumber dalam berbagai bahasa pemrograman (misalnya Java, C++, Python).
> >     
> > - **Library**: Pustaka runtime untuk setiap bahasa yang menangani proses serialisasi (mengubah objek menjadi byte stream) dan deserialisasi/parsing (mengubah byte stream kembali menjadi objek).
> >     
> > 
> > ### Apa itu gRPC?
> > 
> > **gRPC (gRPC Remote Procedure Call)** adalah sebuah _framework_ RPC _open-source_ modern yang juga dikembangkan oleh Google. gRPC dirancang untuk membangun layanan terdistribusi yang efisien dan dapat diandalkan.
> > 
> > Fokus utamanya adalah:
> > 
> > - **Efisiensi**: Menggunakan Protobuf untuk serialisasi data yang ringkas dan HTTP/2 untuk transport yang cepat.
> >     
> > - **Language Interoperability**: Memungkinkan client dan server berkomunikasi meskipun ditulis dalam bahasa pemrograman yang berbeda (misalnya client Java, server Go).
> >     
> > - **Usability**: Menyediakan alat untuk membangkitkan kode client dan server secara otomatis, menyederhanakan pengembangan.
> >     
> > 
> > ### Arsitektur Dasar & Alur Kerja gRPC
> > 
> > Alur kerja pengembangan dengan gRPC dimulai dengan mendefinisikan layanan dan pesan dalam sebuah file `.proto`.
> > 
> > 1. **Service Definition (`.proto` file)**: Developer mendefinisikan `service` (kumpulan metode RPC) dan `message` (struktur data) menggunakan sintaks Protobuf.
> >     
> > 2. **Code Generation**: Compiler `protoc` dengan plugin gRPC digunakan untuk menghasilkan:
> >     
> >     - **Client Stub (Sisi Konsumen)**: Sebuah objek lokal yang merepresentasikan layanan remote. Ketika client memanggil metode pada stub, gRPC akan menangani serialisasi permintaan, mengirimkannya ke server, dan mengembalikan respons yang sudah dideserialisasi.
> >         
> >     - **Server Skeleton (Sisi Penyedia Layanan)**: Kerangka antarmuka di sisi server. Developer hanya perlu mengimplementasikan logika bisnis dari setiap metode yang didefinisikan di file `.proto`.
> >         
> > 3. **Komunikasi**: Client dan Server berkomunikasi melalui **Protocol Buffer yang ditransmisikan di atas protokol HTTP/2**.
> >     
> > 
> > ![[Pasted image 20250922152204.png]]
> > 
> > ### Peran HTTP/2 dalam gRPC
> > 
> > gRPC secara spesifik memilih **HTTP/2** sebagai lapisan transportnya, berbeda dengan Thrift yang lebih fleksibel. Pilihan ini memberikan beberapa keuntungan signifikan:
> > 
> > #### 1. Binary Framing Layer
> > 
> > HTTP/2 memperkenalkan lapisan _binary framing_. Tidak seperti HTTP/1.1 yang berbasis teks, semua pesan HTTP/2 dipecah menjadi unit-unit biner yang lebih kecil yang disebut **frame**. Setiap frame memiliki tujuan tertentu, misalnya `HEADERS frame` untuk metadata dan `DATA frame` untuk payload. Pendekatan biner ini lebih efisien untuk diproses oleh mesin, mengurangi potensi kesalahan parsing, dan lebih ringkas.
> > 
> > ![[Pasted image 20250922152234.png]]
> > 
> > #### 2. Multiplexing & Streams
> > 
> > Fitur paling kuat dari HTTP/2 adalah **multiplexing**. Ini memungkinkan beberapa permintaan dan respons untuk dikirim secara bersamaan melalui **satu koneksi TCP tunggal** tanpa saling memblokir.
> > 
> > - **Stream**: Setiap pasangan permintaan/respons (misalnya, satu panggilan RPC) berjalan di dalam sebuah _stream_ independen.
> >     
> > - **Connection**: Semua stream ini berjalan di atas satu koneksi TCP.
> >     
> > 
> > Ini mengatasi masalah "head-of-line blocking" di HTTP/1.1 dan secara dramatis meningkatkan efisiensi jaringan, terutama untuk aplikasi yang membutuhkan banyak panggilan konkuren.
> > 
> > ![[Pasted image 20250922152246.png]]
> > 
> > ### Struktur File Definisi `.proto`
> > 
> > File `.proto` adalah pusat dari gRPC, tempat struktur data dan layanan didefinisikan.
> > 
> > ```java
> > // Menentukan versi sintaks yang digunakan
> > syntax = "proto3";
> > 
> > // Mendefinisikan namespace untuk mencegah konflik nama
> > package tutorial;
> >
> > // Opsi spesifik untuk bahasa, contoh untuk Java> >         
> > option java_package = "com.example.tutorial";
> > option java_outer_classname = "AddressBookProtos";
> >
> > // Definisi struktur data (message)
> > 
> > message Person {
> > 	// Aturan field: required (harus ada), optional (boleh tidak ada)
> > 	required string name = 1; // Angka 1 adalah tag unik untuk field
> > 	required int32 id = 2;
> > 	optional string email = 3;
> >
> > 	// Definisi tipe data enumerasi (enum)
> > 	
> > 	enum PhoneType {
> > 		MOBILE = 0;
> > 		HOME = 1;
> > 		WORK = 2;
> > 	}
> >	
> > 	message PhoneNumber {
> > 		required string number = 1;
> > 		// Field bisa memiliki nilai default
> > 		optional PhoneType type = 2 [default = HOME];
> > 	}
> >
> > 	// repeated menandakan field ini bisa berisi 0 atau lebih elemen (seperti list/array)
> > 	repeated PhoneNumber phone = 4;
> > }
> >
> > // Message lain yang menggunakan message Person
> > 
> > message AddressBook {
> > 	repeated Person person = 1;
> > }
> > ```
> > 
> > ### Pembangkitan Kode, Serialisasi & Parsing
> > 
> >
> > - Pembangkitan Kode: Menggunakan command-line tool protoc untuk mengompilasi file .proto. Contoh:
> >     
> >     ```bash
> >     protoc -I=<src_dir> --java_out=<dst_dir> <src_dir>/tutorial.proto
> >     ```
> >     
> > - **Penggunaan Kode**: Kode yang dihasilkan menyediakan _builder pattern_ untuk membuat objek dengan mudah.
> >     
> >     ```
> >     Person john = Person.newBuilder()
> >         .setId(1234)
> >         .setName("John Doe")
> >         .build();
> >     ```
> >     
> > - **Serialisasi & Parsing**: Library Protobuf menyediakan metode untuk mengubah objek menjadi byte dan sebaliknya.
> >     
> >     - `toByteArray()`: Serialisasi pesan menjadi byte array.
> >     - `writeTo(OutputStream)`: Serialisasi dan tulis ke output stream.
> >     - `parseFrom(byte[] data)`: Parsing pesan dari byte array.
> >     - `parseFrom(InputStream)`: Parsing pesan dari input stream.
> >         
> >
> > ### Definisi Service dan Jenis-jenis RPC di gRPC
> >
> > Layanan RPC didefinisikan dalam file `.proto` menggunakan kata kunci `service`.
> >
> > ```
> > service HelloService {
> >   // Mendefinisikan sebuah remote procedure
> >   rpc SayHello (HelloRequest) returns (HelloResponse);
> > }
> > ```
> > 
> > gRPC mendukung empat mode komunikasi:
> > 
> > 1. Unary RPC: Model client-server klasik. Client mengirim satu permintaan dan menerima satu respons.
> >     
> >     `rpc SayHello(HelloRequest) returns (HelloResponse);`
> >     
> > 2. Server Streaming RPC: Client mengirim satu permintaan, dan server merespons dengan sebuah stream (aliran) pesan. Berguna untuk notifikasi atau pengiriman data besar.
> >     
> >     `rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse);`
> >     
> > 3. Client Streaming RPC: Client mengirim sebuah stream pesan ke server, dan server merespons dengan satu pesan tunggal setelah semua pesan client diterima. Berguna untuk upload file atau data streaming.
> >     
> >     `rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse);`
> >     
> > 4. Bidirectional Streaming RPC: Client dan server saling mengirim stream pesan secara independen. Cocok untuk aplikasi interaktif seperti chat.
> >     
> >     `rpc BidiHello(stream HelloRequest) returns (stream HelloResponse);`
> >     
> > 
> > ### Alur Kerja Panggilan RPC
> > 
> > 1. **Client Call**: Client memanggil metode pada objek stub lokal (misal: `getProduct("ABC")`).
> >     
> > 2. **Stub Builds Message**: Client stub menyusun pesan permintaan menggunakan Protobuf, mengubahnya menjadi format biner.
> >     
> > 3. **Sent Across Network**: Pesan biner beserta headernya (seperti path service dan nama metode) dikirim melalui koneksi HTTP/2 ke server.
> >     
> > 4. **Server Stub Receives**: Server menerima frame HTTP/2 dan menyerahkannya ke server stub.
> >     
> > 5. **Stub Unpacks Message**: Server stub mem-parsing pesan biner kembali menjadi objek sesuai definisi `.proto`.
> >     
> > 6. **Local Call**: Server stub memanggil implementasi metode yang sebenarnya (`getProduct()`) di sisi server dengan objek hasil parsing sebagai argumen. Hasilnya dikirim kembali ke client melalui proses yang sama secara terbalik.
> >     
> > 
> > ![[Pasted image 20250922152311.png]]
> > 
> > ### Perbandingan: gRPC vs Apache Thrift
> > 
> > |**Fitur**|**gRPC**|**Apache Thrift**|
> > |---|---|---|
> > |**Transport**|Terikat pada HTTP/2. Kurang fleksibel namun dioptimalkan.|Lapisan transport yang _pluggable_ (bisa diganti). Mendukung TCP, HTTP/2, AMQP, dll. Sangat fleksibel.|
> > |**Streaming**|Mendukung _bidirectional streaming_ secara native.|Memerlukan implementasi manual atau kustom untuk streaming dua arah yang kompleks.|
> > |**Popularitas**|Saat ini lebih populer dan memiliki ekosistem yang berkembang pesat.|Sudah matang dan stabil, namun popularitasnya cenderung menurun dibandingkan gRPC.|
> > |**Tipe Data**|Menggunakan `message` untuk tipe komposit. Tidak memiliki tipe `map` atau `set` bawaan.|Menggunakan `struct`. Mendukung `list`, `set`, dan `map`.|
> > |**Konstanta**|Tidak mendukung definisi konstanta.|Mendukung definisi konstanta.|
> > |**Exception**|Tidak ada tipe `exception` khusus, error ditangani melalui kode status.|Mendukung definisi `exception` secara eksplisit.|
> > 
> > ![[Pasted image 20250922152729.png]]
> > 
> > **Hasil Benchmark (github.com/chrislee87/rpc_benchmark):**
> > 
> > - **Untuk koneksi jangka panjang (long connection)**: Performa QPS (Query Per Second) tidak jauh berbeda.
> >     
> >     - gRPC unggul dalam latensi yang lebih rendah.
> >         
> >     - Thrift unggul dalam penggunaan CPU yang lebih rendah.
> >         
> > - **Untuk koneksi jangka pendek (short connection)**: Thrift (menggunakan TCP) mengungguli gRPC (menggunakan HTTP/2) di semua metrik: QPS, CPU, dan latensi.
> >     
> > - **Catatan**: Latensi pada aplikasi Go tidak bisa sepenuhnya dikontrol karena adanya _Garbage Collector_ (GC) yang dapat "menghentikan dunia". Untuk aplikasi realtime dengan syarat latensi sangat ketat, disarankan menggunakan C/C++.
> >     

> [!cornell] #### Summary
> 
> Protocol Buffer (Protobuf) adalah fondasi untuk serialisasi data yang efisien, sedangkan gRPC adalah framework RPC yang menggunakan Protobuf dan HTTP/2 untuk membangun layanan terdistribusi yang cepat, multi-bahasa, dan modern. Protobuf mendefinisikan "apa" yang dikirim (struktur data dan antarmuka layanan melalui file .proto), sementara gRPC dan HTTP/2 mendefinisikan "bagaimana" data itu dikirim (melalui panggilan prosedur jarak jauh yang efisien dengan fitur canggih seperti streaming dua arah dan multiplexing di atas satu koneksi TCP). Perbedaan utama dengan alternatif seperti Thrift terletak pada keterikatan gRPC pada HTTP/2 yang memberinya performa optimal untuk kasus penggunaan tertentu, meskipun dengan fleksibilitas transport yang lebih rendah.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Encoding Protobuf
> 
> Salah satu alasan efisiensi Protobuf adalah teknik encodingnya. Untuk integer, Protobuf menggunakan format yang disebut **Varints (Variable-length integers)**. Angka kecil hanya membutuhkan satu byte untuk disimpan, sedangkan angka yang lebih besar membutuhkan lebih banyak byte. Ini membuat payload sangat ringkas dibandingkan dengan mengirim angka sebagai teks (seperti di JSON) atau dalam format integer ukuran tetap (misalnya, 32-bit atau 64-bit setiap saat).
> 
> #### Pendalaman Teknis: Lapisan Transport Thrift yang Pluggable
> 
> Fleksibilitas Thrift berasal dari kemampuannya untuk memisahkan protokol serialisasi dari lapisan transport. Anda bisa menggunakan serialisasi Thrift di atas berbagai mekanisme transport, seperti:
> 
> - **TSocket**: Transport TCP/IP blocking standar.
>     
> - **TNonblockingSocket**: Transport non-blocking untuk server I/O yang efisien.
>     
> - **TFramedTransport**: Mengirim data dalam frame-frame berukuran tertentu. Diperlukan saat menggunakan `TNonblockingSocket`.
>     
> - THttpClient: Menggunakan protokol HTTP sebagai transport.
>     
>     Ini memungkinkan developer untuk memilih transport yang paling sesuai untuk arsitektur aplikasi mereka.
>     
> 
> #### Eksplorasi Mandiri
> 
> Untuk memahami konsep ini secara praktis, coba bangun sebuah microservice sederhana menggunakan gRPC.
> 
> 1. **Definisikan Service**: Buat file `notes.proto` yang mendefinisikan layanan `NoteService` dengan metode `AddNote`, `GetNote`, dan `ListNotes`.
>     
> 2. **Implementasi Server**: Tulis server dalam bahasa **Go** atau **Python** yang mengimplementasikan `NoteService`.
>     
> 3. **Implementasi Client**: Tulis client dalam bahasa **Java** atau **Node.js** yang memanggil metode pada server.
>     
> 4. **Eksperimen**: Coba ubah salah satu metode menjadi _server streaming_ (misalnya, `StreamNotes` yang mengirimkan catatan baru saat ditambahkan).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi Resmi gRPC**: [grpc.io](https://grpc.io/docs/what-is-grpc/introduction/ "null")
>     
> - **Dokumentasi Resmi Protocol Buffers**: [developers.google.com/protocol-buffers](https://developers.google.com/protocol-buffers "null")
>     
> - **Penjelasan Mendalam HTTP/2**: [http2.github.io](https://http2.github.io/ "null")
>     
> - **Dokumentasi Resmi Apache Thrift**: [thrift.apache.org](https://thrift.apache.org/ "null")
>