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
> > - Apa itu Apache Thrift?
> >     
> > - Apa peran IDL?
> >     
> > - Bagaimana IDL mendukung evolusi service?
> >     
> > - Apa saja komponen framework Thrift?
> >     
> > - Apa itu Protocol dan Transport?
> >     
> > - Apa itu Processor dan Server?
> >     
> > - Bagaimana alur pengembangan aplikasi Thrift?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031-05a RemoteProcedureCall---Thrift
> >     
> 
> > ### Pengenalan Apache Thrift
> > 
> > Apache Thrift adalah sebuah _framework software_ berbasis RPC yang dikembangkan di Facebook. Tujuannya adalah untuk memfasilitasi komunikasi antar layanan yang **scalable, efisien, dan andal** di lingkungan multi-bahasa pemrograman. Thrift menangani semua "pipa ledeng" komunikasi jaringan, termasuk serialisasi, definisi service, dan model _threading_ server.
> >
> > ### IDL (Interface Definition Language)
> > 
> > Inti dari Thrift adalah **IDL**. Ini adalah sebuah file definisi (`.thrift`) tempat pengembang mendeskripsikan struktur data (structs) dan layanan (_services_ atau kumpulan fungsi) secara independen dari bahasa pemrograman. Kompiler Thrift (`thrift`) kemudian menggunakan file IDL ini untuk **menghasilkan kode** _**boilerplate**_ **(stubs)** untuk klien dan server dalam berbagai bahasa (Java, Python, C++, dll.). Ini memungkinkan, misalnya, server yang ditulis dalam C++ untuk dipanggil dengan mudah oleh klien Node.js.
> > 
> >  #### Tipe Data dan Evolusi Service
> >  
> >  IDL mendukung tipe data dasar (`bool`, `i32`, `string`), tipe khusus (`binary`), dan kontainer (`list`, `set`, `map`). Salah satu fitur kunci IDL adalah penomoran parameter secara eksplisit (e.g., `i32 add(1:i32 n1, 2:i32 n2)`). 
> >  
> > ![[Pasted image 20250917133258.png]]
> > 
> >  Ini sangat penting untuk memungkinkan evolusi service. Dengan nomor posisi yang tetap, pengembang dapat menambah, mengubah nama, atau bahkan menghapus parameter di masa depan tanpa merusak kompatibilitas dengan klien lama, selama nomor ID parameter yang ada tidak diubah. Aturan yang sama berlaku untuk field di dalam struct.
> > 
> > ![[Pasted image 20250917131907.png]]
> > 
> > ### Arsitektur Framework Thrift
> > 
> > ![[Pasted image 20250917132040.png]]
> > Framework Thrift dapat dibagi menjadi beberapa lapisan (layer) yang saling bekerjasama:
> > 
> > - **Kode Buatan Pengguna:** Ini adalah logika bisnis sebenarnya, yaitu implementasi _handler_ di sisi server dan kode pemanggil di sisi klien.
> >     
> > - **Kode Hasil Kompilasi IDL:**
> >     
> >     - **Service Stubs:** Kode _boilerplate_ yang menyederhanakan pemanggilan fungsi remote.
> >         
> >     - **User Types:** Representasi `struct` dan `exception` dari IDL dalam bahasa target.
> >         
> > - **Pustaka Runtime Thrift:**
> >     
> >	- **Protocol (`TProtocol`):** Lapisan yang bertanggung jawab untuk **serialisasi**. Jenis-jenisnya antara lain:
> >		- `TBinaryProtocol`: Format biner standar.
> >		- `TCompactProtocol`: Format biner yang sangat efisien dan padat.
> >		- `TJSONProtocol`: Menggunakan JSON untuk encoding.
> >		- `TSimpleJSONProtocol`: Format JSON _write-only_ untuk scripting.
> >		- `TDebugProtocol`: Format teks yang mudah dibaca manusia untuk debugging.
> >	- **Transport (`TTransport`):** Lapisan yang menangani **pembacaan/penulisan byte**. Jenis-jenisnya antara lain:
> >		- `TSocket`: Menggunakan blocking socket I/O untuk komunikasi TCP.
> >		- `TFramedTransport`: Mengirim data dalam frame (wajib untuk server non-blocking).
> >		- `TFileTransport`: Menulis data ke sebuah file.
> >		- `TMemoryTransport`: Menggunakan memori untuk I/O.
> >		- `TZlibTransport`: Melakukan kompresi menggunakan zlib.
> >	- **Processor (`TProcessor`):** Di sisi server, ini adalah "lem" yang membaca data dari _protocol_, memanggil _handler_ yang sesuai, dan menuliskan hasilnya kembali ke _protocol_.
> >	- **Server (`TServer`):** Komponen tingkat tinggi di sisi server. Jenis-jenis server yang disediakan:
> >		- `TSimpleServer`: Single-threaded dengan blocking I/O, baik untuk testing.
> >		- `TThreadPoolServer`: Multi-threaded dengan blocking I/O.
> >		- `TNonblockingServer`: Multi-threaded dengan non-blocking I/O (harus menggunakan `TFramedTransport`).
> > 
> > ### Alur Pengembangan
> > 
> > 1. **Buat File `.thrift`:** Definisikan semua tipe data (`struct`) dan fungsi (`service`).
> >     
> > 2. **Generate Kode:** Jalankan kompiler Thrift untuk menghasilkan kode _stub_ untuk bahasa server dan klien.
> >     
> > 3. **Implementasi Server:** Buat sebuah kelas _handler_ yang mengimplementasikan _interface service_ yang dihasilkan oleh kompiler, lalu jalankan `TServer`.
> >     
> > 4. **Implementasi Klien:** Gunakan kelas _client_ yang dihasilkan untuk membuat koneksi ke server, lalu panggil fungsi-fungsi remote seolah-olah mereka adalah fungsi lokal.
> >  
> >  **Contoh:**
> >  ```java
> >  namespace java if4031
> >  typedef i32 int
> >  service CalculatorService
> >  {
> > 	 int multiply(1:int n1, 2:int n2),
> > 	 int add(1:int n1, 2:int n2),
> >  }
> >  ```
> >  
> >  ###  Pembangkitan
> >  `thrift –gen <bahasa> calculator.thrift`
> >  
> >  **Menghasilkan:**
> >  - Kelas interface (Iface) `service`
> >  - Kelas client dan Processor (untuk `server`)
> >  - Kelas yang merepresentasikan struktur/tipe data dan exception (jika ada)
> >  
> >  ### Performance
> >  ![[Pasted image 20250917133530.png]]

> [!cornell] #### Summary
> 
> Apache Thrift adalah framework RPC yang kuat untuk membangun layanan lintas bahasa yang efisien, dengan menggunakan Interface Definition Language (IDL) sebagai pusatnya untuk mendefinisikan struktur data dan service. Arsitekturnya yang berlapis memisahkan logika bisnis dari detail komunikasi, di mana lapisan Transport menangani pengiriman byte, lapisan Protocol mengurus serialisasi (misalnya ke format biner yang ringkas), dan kode yang dihasilkan otomatis oleh kompiler Thrift menyediakan "lem" yang menghubungkan semuanya, memungkinkan pengembangan yang cepat dan service yang mudah berevolusi.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Perbandingan Kinerja
> 
> Seperti yang ditunjukkan pada grafik di slide 29, performa Thrift (terutama dengan `TCompactProtocol` dan `TSocket`) jauh mengungguli arsitektur berbasis HTTP/Teks seperti REST/JSON dan SOAP/XML. Waktu yang dibutuhkan untuk menyelesaikan 1 juta request bisa **10 hingga 20 kali lebih cepat**. Ini karena:
> 
> 1. **Serialisasi Biner:** Format `TCompactProtocol` sangat padat dan efisien, menghasilkan _payload_ yang jauh lebih kecil.
>     
> 2. **Overhead Protokol:** Komunikasi langsung melalui TCP (`TSocket`) menghilangkan semua _overhead_ dari parsing _header_ HTTP.
>     
> 
> Inilah alasan utama mengapa Thrift dan gRPC menjadi pilihan utama untuk komunikasi latensi rendah antar _microservices_ di dalam data center.
> 
> #### Eksplorasi Mandiri: Kapan Menggunakan `required` vs. `optional`?
> 
> Di dalam `struct` Thrift, Anda dapat menandai _field_ sebagai `required` atau `optional`.
> 
> - **`required`**: Thrift akan memastikan _field_ ini selalu ada saat serialisasi dan deserialisasi. Jika tidak ada, ia akan melempar _exception_. Gunakan ini untuk data yang mutlak harus ada agar objek valid.
>     
> - **`optional`**: _Field_ ini mungkin ada atau tidak. Jika tidak ada, ia akan diabaikan. Gunakan ini untuk data yang tidak krusial atau ditambahkan pada versi service yang lebih baru.
>     
> 
> Aturan praktisnya: Mulailah dengan `optional` untuk sebagian besar _field_ kecuali Anda benar-benar yakin data tersebut tidak akan pernah bisa absen. Ini memberikan fleksibilitas terbesar untuk evolusi skema di masa depan.