---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Fondasi Sistem Messaging dan Publish-Subscribe
> 
> > ## Questions/Cues
> > 
> > - Apa itu sistem messaging?
> >     
> > - Mengapa _decoupling_ penting?
> >     
> > - Apa saja komponen dasarnya?
> >     
> > - Apa saja jenis-jenis pesan?
> >     
> > - Apa beda model P2P dan Pub/Sub?
> >     
> > - Apa saja varian sistem Pub/Sub?
> >     
> > - Apa itu _delivery guarantee_?
> >     
> > - Apa itu JMS?
> >     
> > 
> > ## Reference Points
> > 
> > - 08-IF4031-06-2024-Message-Publish-Subscribe.pdf
> >     
> 
> > ### Sistem Messaging dan Decoupling
> > 
> > **Sistem Messaging** adalah fasilitas komunikasi antar proses (_peer-to-peer_) yang memungkinkan komponen aplikasi untuk saling mengirim pesan secara tidak langsung, biasanya melalui perantara yang disebut **Message Broker**.
> > 
> > Tujuan utamanya adalah untuk mencapai **decoupling** (pemisahan) antar komponen.
> > 
> > - **Space/Time Decoupling:** Pengirim (Producer) dan penerima (Consumer) tidak perlu aktif pada saat yang bersamaan atau bahkan tahu keberadaan satu sama lain. Producer hanya mengirim pesan ke broker, dan Consumer mengambilnya saat siap.
> >     
> > - **Synchronization Decoupling:** Producer tidak perlu menunggu Consumer untuk memproses pesan. Setelah mengirim pesan, Producer bisa langsung melanjutkan tugas lainnya (komunikasi asinkron).
> >     
> > 
> > ### Komponen dan Jenis Pesan
> > 
> > - **Producer/Publisher:** Aplikasi yang membuat dan mengirim pesan.
> >     
> > - **Consumer/Subscriber:** Aplikasi yang menerima dan memproses pesan.
> >     
> > - **Message Broker:** Server perantara yang mengelola antrian dan perutean pesan.
> >     
> > - **Message:** Struktur data yang dikirim, terdiri dari `Header` (metadata), `Properties`, dan `Body` (konten).
> >     
> > 
> > Pesan dapat dikategorikan berdasarkan tujuannya:
> > 
> > 1. **Command Message:** Berisi perintah untuk melakukan sebuah aksi (misalnya, `CreateOrder`).
> >     
> > 2. **Event Message:** Notifikasi bahwa sesuatu telah terjadi (misalnya, `OrderCreated`).
> >     
> > 3. **Document Message:** Event yang membawa seluruh data dari sebuah entitas.
> >     
> > 
> > ### Model Pertukaran Pesan
> > 
> > #### 1. Point-to-Point (P2P) / Message Queue
> > 
> > Dalam model ini, destinasi pesan dinyatakan secara eksplisit.
> > 
> > - Producer mengirim pesan ke sebuah **Queue** (antrian).
> >     
> > - Setiap pesan dalam _queue_ hanya dikonsumsi oleh **satu Consumer**.
> >     
> > - Jika ada beberapa _consumer_ pada _queue_ yang sama, mereka akan berbagi beban kerja (load balancing).
> >     
> > 
> > #### 2. Publish-Subscribe (Pub/Sub)
> > 
> > Model ini lebih fleksibel dan tidak menargetkan penerima spesifik.
> > 
> > - Publisher mengirim pesan ke sebuah **Topic** atau _resource_ bersama, tanpa mengetahui siapa _subscriber_-nya.
> >     
> > - Setiap pesan dapat dikonsumsi oleh **banyak Subscriber** yang tertarik pada _topic_ tersebut.
> >     
> > - Subscriber dapat mem-filter pesan yang ingin mereka terima.
> >     
> > 
> > ### Aspek Penting Sistem Pub/Sub
> > 
> > - **Persistency:** Apakah pesan dan _subscription_ akan tetap ada jika broker di-restart.
> >     
> > - **Filtering:** Mekanisme untuk memfilter pesan (berdasarkan sumber, _header_, atau konten).
> >     
> > - **Delivery Guarantee (Garansi Pengiriman):** Menentukan seberapa andal pengiriman pesan.
> >     
> >     - **At most once:** Pesan dikirim paling banyak satu kali (bisa hilang).
> >         
> >     - **At least once:** Pesan dijamin sampai, tapi bisa terkirim duplikat.
> >         
> >     - **Exactly once:** Pesan dijamin sampai tepat satu kali (paling ideal dan kompleks).
> >         
> > 
> > ### Java Messaging Service (JMS)
> > 
> > JMS adalah sebuah **spesifikasi API** Java, bukan produk. Ia mendefinisikan antarmuka standar untuk berinteraksi dengan sistem _messaging_. Implementasi dari JMS disebut **JMS Provider** (contoh: ActiveMQ). JMS mendefinisikan dua domain utama yang sesuai dengan model di atas: `Queues` (untuk P2P) dan `Topics` (untuk Pub/Sub).

> [!cornell] #### Summary
> 
> **Sistem messaging memfasilitasi komunikasi asinkron yang** _**loosely coupled**_ **antara komponen aplikasi melalui Message Broker. Dua model utamanya adalah Point-to-Point (Queue), di mana setiap pesan dikonsumsi oleh satu penerima, dan Publish-Subscribe (Topic), di mana satu pesan dapat disiarkan ke banyak penerima. Aspek krusial dalam sistem ini adalah garansi pengiriman pesan, sementara standar seperti JMS menyediakan API umum untuk berinteraksi dengan berbagai implementasi broker.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Acknowledgement (Ack) dan Delivery Guarantee
> 
> Garansi pengiriman sangat bergantung pada mekanisme _acknowledgement_.
> 
> - **Consumer Manual Ack:** Ini adalah kunci untuk mencapai _at least once delivery_. Broker mengirim pesan ke _consumer_ tetapi tidak akan menghapusnya dari _queue_ sampai _consumer_ secara eksplisit mengirimkan "ack" (konfirmasi) bahwa pesan telah berhasil diproses. Jika _consumer_ gagal sebelum mengirim ack, broker akan mengirim ulang pesan tersebut ke _consumer_ lain, yang bisa menyebabkan duplikasi.
>     
> - **Publisher Confirms:** Untuk memastikan pesan dari _producer_ tidak hilang sebelum mencapai broker, beberapa broker (seperti RabbitMQ) mendukung konfirmasi dari broker ke _producer_ bahwa pesan telah diterima dan berhasil disimpan.
>     
> 
> #### Kasus Penggunaan: Kapan Memilih P2P vs. Pub/Sub?
> 
> - **Gunakan P2P (Queue):** Ketika Anda memiliki serangkaian tugas yang perlu diproses dan setiap tugas hanya boleh dikerjakan oleh satu pekerja. Contoh: Memproses pesanan, mengirim email notifikasi, atau mengonversi video. Menambahkan lebih banyak _consumer_ ke _queue_ akan meningkatkan kapasitas pemrosesan secara paralel.
>     
> - **Gunakan Pub/Sub (Topic):** Ketika Anda memiliki suatu peristiwa yang perlu diketahui oleh beberapa bagian sistem yang berbeda, dan Anda tidak tahu (atau tidak peduli) siapa saja yang mendengarkan. Contoh: Peristiwa `UserSignedUp` mungkin perlu didengar oleh layanan _email_, layanan analitik, dan layanan manajemen pelanggan secara bersamaan.
>