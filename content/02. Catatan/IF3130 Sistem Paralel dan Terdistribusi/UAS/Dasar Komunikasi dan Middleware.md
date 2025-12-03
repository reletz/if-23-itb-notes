---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Dasar Komunikasi & Middleware Layer
> 
> > ## Questions/Cues
> >
> > - **Low Level vs Middleware**
> >     
> > - **Fungsi Middleware**
> >     
> > - **Transient vs Persistent**
> >     
> > - **Synchronous vs Asynchronous**
> >     
> > - **Kelemahan Model Client/Server Klasik**
> >     
> >
> > ## Reference Points
> >
> > - Slides: Page 2-8
> >     
> > - Materi: RPC dan Komunikasi
> 
> >
> > ### Lapisan Komunikasi (Communication Layers)
> >
> > Dalam sistem terdistribusi, komunikasi antar-komputer tidak terjadi secara ajaib. Ada tingkatan (layer) yang menangani tugas berbeda.
> >
> > 1. Low Level Layer (Transport Layer)
> > 
> > Ini adalah fondasi dasar. Di sini, kita berbicara tentang protokol standar jaringan seperti TCP (Transmission Control Protocol) dan UDP (User Datagram Protocol).
> >
> > - **Analogi:** Ini seperti infrastruktur jalan raya dan truk pengirim paket. Mereka hanya peduli bagaimana memindahkan data dari titik A ke titik B, tidak peduli apa isi paketnya.
> >     
> > - **Fungsi:** Menyediakan fasilitas komunikasi dasar (koneksi, transfer data mentah).
> >     
> >
> > 1. Middleware Layer
> > 
> > Layer ini berada di atas layer transport untuk "menyembunyikan" kerumitan jaringan dari programmer aplikasi. Middleware menyediakan layanan umum agar aplikasi yang berbeda bisa saling bicara tanpa pusing memikirkan detail jaringan.
> >
> > - **Layanan Utama Middleware:**
> >     
> >     - **(Un)marshaling Data:** Mengemas dan membuka kemasan data agar bisa dikirim lewat jaringan.
> >         
> >     - **Naming Protocols:** Memudahkan penamaan resource (agar kita bisa memanggil `FileServer1` daripada menghafal IP Address).
> >         
> >     - **Security Protocols:** Menangani enkripsi dan otentikasi.
> >         
> >     - **Scaling Mechanisms:** Menangani replikasi data dan caching secara otomatis.
> >         
> > - **Tujuannya:** Agar programmer hanya perlu fokus mengembangkan **protokol spesifik aplikasi**, bukan memikirkan cara mengirim bit data.
> >     
> >
> > ### Tipe Komunikasi Berdasarkan Waktu Penyimpanan
> >
> > Kita membedakan komunikasi berdasarkan apakah pesan "disimpan" oleh jaringan/middleware atau tidak.
> >
> > 1. Transient Communication (Komunikasi Sementara)
> > 
> > Pesan hanya hidup selama pengirim dan penerima sama-sama aktif saat itu. Jika penerima mati/offline, pesan hilang.
> >
> > - **Karakteristik:** Middleware/Server komunikasi akan membuang pesan jika tidak bisa dikirim langsung ke penerima atau simpul berikutnya.
> >     
> > - **Contoh:** Video call, HTTP request (browsing web), model Client-Server tradisional.
> >     
> >
> > 1. Persistent Communication (Komunikasi Persisten)
> > 
> > Pesan disimpan oleh server komunikasi (middleware) selama yang dibutuhkan sampai pesan berhasil dikirim ke penerima.
> >
> > - **Karakteristik:** Pengirim tidak perlu tahu apakah penerima sedang aktif atau tidak. Pesan antre (queued).
> >     
> > - **Contoh:** Email, Message-Oriented Middleware (RabbitMQ, Kafka).
> >     
> >
> > ### Tipe Komunikasi Berdasarkan Sinkronisasi
> >
> > Kita membedakan komunikasi berdasarkan apakah pengirim harus "menunggu" (blocking) atau bisa lanjut bekerja.
> >
> > **1. Synchronous Communication**
> > 
> > Pengirim (Client) mengirim request dan berhenti bekerja (blokir) sampai menerima balasan atau konfirmasi.
> >
> > - **Titik Sinkronisasi:** Bisa saat request dikirim, saat request sampai, atau setelah request selesai diproses server.
> >     
> > - **Kelemahan:** Jika server lambat atau jaringan putus, klien macet (hang) tidak bisa melakukan apa-apa.
> >     
> >
> > **2. Asynchronous Communication**
> > 
> > Pengirim mengirim pesan dan langsung lanjut bekerja tanpa menunggu balasan instan.
> >
> > - **Keuntungan:** Lebih efisien karena klien bisa melakukan tugas lain (misal: merender UI) sambil menunggu data di background.
> >     
> >
> > ### Observasi Model Client/Server
> >
> > Model Client/Server tradisional (seperti Web Server) umumnya menggunakan **Transient Synchronous Communication**.
> >
> > **Kelemahan Utama:**
> >
> > 1. **Blocking:** Client tidak bisa melakukan pekerjaan lain saat menunggu reply.
> >     
> > 2. **Penanganan Kegagalan:** Jika koneksi putus, klien harus menanganinya _saat itu juga_ (karena klien sedang menunggu).
> >     
> > 3. **Tidak Fleksibel:** Kurang cocok untuk aplikasi yang butuh pengiriman tertunda (seperti berita atau email).
> >     
> >
> > Solusi untuk masalah ini seringkali adalah beralih ke **Message-Oriented Middleware (MOM)** yang mendukung komunikasi _persistent asynchronous_.

> [!cornell] #### Summary
> 
> Sistem terdistribusi dibangun di atas lapisan transport (TCP/UDP) namun sangat bergantung pada lapisan Middleware untuk menangani heterogenitas, keamanan, dan penamaan. Komunikasi dapat dikategorikan menjadi Transient (pesan hilang jika penerima mati) vs Persistent (pesan disimpan/antre), serta Synchronous (pengirim menunggu/blokir) vs Asynchronous (pengirim lanjut bekerja). Model Client/Server tradisional umumnya bersifat transient-synchronous, yang memiliki kelemahan blocking pada sisi klien, sehingga memicu kebutuhan akan middleware berbasis pesan (MOM) atau RPC asinkron.

> [!ad-libitum]- Additional Information
> 
> #### Detail Teknis: Middleware & Protokol
> 
> Middleware sering disebut sebagai "software glue". Dalam konteks RPC (Remote Procedure Call) yang akan dibahas nanti, middleware bertanggung jawab atas konversi format data.
> 
> - **Masalah Heterogenitas:** Komputer A (Intel) mungkin membaca integer sebagai _Little Endian_, sedangkan Komputer B (SPARC) membacanya sebagai _Big Endian_. Middleware (melalui protokol seperti XDR) memastikan data diterjemahkan (Marshaling) sebelum dikirim dan dikembalikan (Unmarshaling) saat diterima.
>     
> 
> #### Message-Oriented Middleware (MOM)
> 
> Slide menyinggung MOM sebagai solusi untuk kelemahan Client/Server sinkron.
> 
> - **Konsep:** Menggunakan antrean (queue). Pengirim menaruh pesan di antrean, penerima mengambilnya kapan saja.
>     
> - **Decoupling:** Pengirim dan penerima ter-decouple secara waktu (temporal decoupling).
>     
> - **Implementasi Populer:** Apache Kafka, RabbitMQ, ActiveMQ.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** "Distributed Systems: Principles and Paradigms" oleh Tanenbaum & Van Steen (Bab Komunikasi).
>     
> - **Protokol:** Pelajari spesifikasi TCP/IP (RFC 793) untuk memahami layer transport lebih dalam.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan utama antara komunikasi Transient dan Persistent?</strong></summary>
> 
> Pada komunikasi Transient, pesan akan dibuang oleh middleware/jaringan jika penerima tidak aktif saat pengiriman. Pada Persistent, pesan disimpan (biasanya dalam queue/storage) oleh middleware sampai penerima siap menerimanya.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa model Client/Server tradisional disebut menggunakan komunikasi Synchronous?</strong></summary>
> 
> Karena klien mengirim request dan kemudian memblokir eksekusi (menunggu) sampai menerima balasan (reply) dari server sebelum melanjutkan proses berikutnya.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa peran utama Middleware dalam tumpukan protokol sistem terdistribusi?</strong></summary>
> 
> Middleware menyediakan abstraksi dan layanan umum (seperti marshaling data, penamaan, keamanan) untuk menyembunyikan kompleksitas jaringan dan heterogenitas sistem dari aplikasi.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Sebutkan satu kerugian utama dari komunikasi sinkron pada sistem Client/Server!</strong></summary>
> 
> Klien tidak dapat melakukan pekerjaan lain (idle) selama menunggu respon dari server, dan kegagalan jaringan harus ditangani seketika itu juga.
> 
> </details>