---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Pola Pengelolaan Data dan Ketahanan (Resiliency)
> 
> > ## Questions/Cues
> > 
> > - Mengapa data jadi tantangan di microservice?
> >     
> > - Apa itu pola **Database per Service**?
> >     
> > - Bagaimana menangani transaksi lintas service?
> >     
> > - Apa itu **Saga Pattern**?
> >     
> > - Apa itu _compensating transaction_?
> >     
> > - Apa itu pola **CQRS**?
> >     
> > - Mengapa ketahanan (_resiliency_) penting?
> >     
> > - Apa itu **Circuit Breaker Pattern**?
> >     
> > - Bagaimana cara menguji ketahanan?
> >     
> > - Apa itu **Simian Army** dari Netflix?
> >     
> > 
> > ## Reference Points
> > 
> > - 06-IF4031-05e-2024-Microservice.pdf (hlm. 20-28)
> >     
> > - 07-IF4031-Microservices.pdf (hlm. 62-65, 71-73)
> >     
> 
> > ### Pola Database: Mengelola Data Terdistribusi
> > 
> > Dalam arsitektur microservice, setiap layanan harus menjadi pemilik tunggal dari datanya dan hanya dapat diakses melalui API layanan tersebut. Ini mencegah ketergantungan erat (_tight coupling_) di level database.
> > 
> > **1. Database per Service**
> > Ini adalah pola fundamental. Setiap microservice mengelola databasenya sendiri. Database ini bisa berupa skema terpisah, atau bahkan server database yang sepenuhnya terpisah. Keuntungannya adalah isolasi total: perubahan skema di satu layanan tidak akan memengaruhi layanan lain. Ini juga memungkinkan setiap layanan memilih jenis database yang paling sesuai untuk kebutuhannya (misalnya, database relasional untuk layanan Order, dan database NoSQL untuk Product Catalog).
> > 
> > **Tantangan:** Bagaimana cara menjalankan _query_ yang menggabungkan data dari beberapa layanan? Bagaimana cara menangani transaksi yang harus mencakup beberapa layanan?
> > 
> > **2. Saga Pattern**
> > 
> > Saga adalah pola untuk mengelola konsistensi data lintas microservice tanpa menggunakan transaksi terdistribusi tradisional (yang sangat kompleks dan mengunci sistem). Saga adalah urutan transaksi lokal. Setiap transaksi lokal memperbarui database di dalam satu layanan dan memicu transaksi lokal berikutnya di layanan lain.
> > 
> > - **Jika semua transaksi berhasil:** Saga selesai dan data menjadi konsisten.
> >     
> > - **Jika satu transaksi gagal:** Saga akan menjalankan **compensating transactions** (transaksi kompensasi) untuk membatalkan atau mengompensasi pekerjaan yang telah dilakukan oleh transaksi-transaksi sebelumnya. Transaksi kompensasi adalah operasi yang secara bisnis membatalkan dampak dari langkah sebelumnya (misalnya, mengembalikan dana, membatalkan pesanan).
> >     
> > 
> > **3. Command Query Responsibility Segregation (CQRS)**
> > 
> > CQRS adalah pola yang memisahkan operasi tulis (Commands) dan operasi baca (Queries).
> > 
> > - **Command:** Bertujuan untuk mengubah _state_ sistem (misalnya, `CreateOrder`). Perintah ini dikirim ke model tulis dan database tulis.
> >     
> > - Query: Bertujuan untuk membaca state sistem tanpa mengubahnya (misalnya, GetOrderHistory). Kueri ini dikirim ke model baca dan database baca, yang sering kali dioptimalkan khusus untuk pembacaan cepat (misalnya, melalui denormalisasi).
> >     
> > Pola ini sangat berguna di microservices karena memungkinkan database baca untuk mengagregasi data dari beberapa layanan, sehingga mempermudah query yang kompleks tanpa melanggar prinsip Database per Service.
> >     
> > 
> > ### Pola Ketahanan (Resiliency): Merancang untuk Kegagalan
> > 
> > Dalam sistem terdistribusi, kegagalan (layanan tidak tersedia, latensi jaringan tinggi) adalah hal yang tak terhindarkan. Arsitektur harus dirancang untuk menangani kegagalan ini dengan anggun.
> > 
> > **1. Circuit Breaker Pattern**
> > 
> > Pola ini mencegah aplikasi berulang kali mencoba melakukan operasi yang kemungkinan besar akan gagal, sehingga tidak membuang sumber daya dan memperburuk masalah.
> > 
> > - Analogi: Seperti sekring listrik di rumah.
> > 
> > - Cara Kerja:
> > 
> > 	- **Closed:** Status normal. Permintaan diizinkan melewati ke layanan dependen. Jika jumlah kegagalan melebihi ambang batas, _breaker_ akan "trip" dan beralih ke status **Open**.
> > 	    
> > 	- **Open:** Permintaan langsung gagal tanpa mencoba memanggil layanan dependen. _Breaker_ akan mengembalikan _error_ atau _fallback_ (misalnya, data dari _cache_). Setelah periode _timeout_, _breaker_ beralih ke status **Half-Open**.
> > 	    
> > 	- **Half-Open:** Sejumlah kecil permintaan percobaan diizinkan lewat. Jika berhasil, _breaker_ kembali ke **Closed**. Jika gagal, ia kembali ke **Open**.
> >     
> > 
> > **2. Menguji Ketahanan: The Simian Army**
> > 
> > Netflix mempopulerkan konsep Chaos Engineering, yaitu secara sengaja menyuntikkan kegagalan ke dalam sistem produksi untuk menguji ketahanannya. Simian Army adalah sekumpulan tools untuk melakukan ini:
> > 
> > - **Chaos Monkey:** Secara acak mematikan _instance_ virtual machine atau container untuk memastikan layanan dapat bertahan dari kegagalan _instance_.
> >     
> > - **Latency Monkey:** Menambahkan latensi buatan pada komunikasi jaringan untuk menguji apakah sistem dapat menangani degradasi performa.
> >     
> > - **Chaos Gorilla:** Mensimulasikan kegagalan seluruh _Availability Zone_ di AWS.
> >     

> [!cornell] #### Summary
> 
> Pengelolaan data dalam microservices mengandalkan pola Database per Service untuk memastikan isolasi, dengan tantangan konsistensi data lintas layanan yang diatasi oleh Saga Pattern melalui transaksi lokal dan kompensasi. Di sisi lain, ketahanan sistem terdistribusi dicapai dengan merancang untuk kegagalan menggunakan pola seperti Circuit Breaker untuk mencegah kegagalan beruntun (_**cascading failures**_), serta secara proaktif menguji ketahanan sistem terhadap kondisi kacau melalui praktik Chaos Engineering seperti yang dipelopori oleh Netflix dengan Simian Army.**

> [!ad-libitum]- Additional Information
> 
> #### Implementasi Saga: Koreografi vs. Orkestrasi
> 
> Ada dua cara utama untuk mengkoordinasikan saga:
> 
> 1. **Choreography (Koreografi):** Setiap layanan mempublikasikan _event_ ketika menyelesaikan transaksi lokalnya. Layanan lain yang tertarik akan "mendengarkan" _event_ tersebut dan menjalankan transaksi lokal mereka sendiri. Tidak ada titik kontrol pusat. Ini lebih sederhana dan _loosely coupled_, tetapi sulit untuk melacak alur kerja saga secara keseluruhan.
>     
> 2. **Orchestration (Orkestrasi):** Ada sebuah layanan _orchestrator_ pusat yang bertanggung jawab untuk memberi tahu setiap partisipan saga apa yang harus dilakukan dan kapan. _Orchestrator_ memanggil layanan secara sekuensial melalui _command_. Ini lebih mudah dipahami dan dimonitor, tetapi menciptakan ketergantungan pada _orchestrator_ dan berisiko menjadi titik kegagalan tunggal (_single point of failure_).
>     
> 
> #### Implementasi Teknis Circuit Breaker (Hystrix)
> 
> **Hystrix** (sekarang dalam mode _maintenance_, tetapi konsepnya abadi) adalah _library_ dari Netflix yang mempopulerkan pola ini. Fitur utamanya meliputi:
> 
> - **Bulkheading:** Setiap dependensi diisolasi dalam _thread pool_-nya sendiri. Jika sebuah layanan menjadi lambat, hanya _thread pool_ untuk layanan itu yang akan jenuh, sementara panggilan ke layanan lain tidak terpengaruh.
>     
> - **Fallbacks:** Menyediakan logika alternatif yang akan dieksekusi ketika sebuah panggilan gagal, _timeout_, atau sirkuit dalam keadaan _open_. Ini bisa berupa data _cache_, nilai _default_, atau pesan _error_ yang ramah pengguna.
>     
> - **Real-time Monitoring:** Menyediakan _dashboard_ untuk memvisualisasikan kesehatan setiap koneksi, status _circuit breaker_, dan latensi secara _real-time_.
>