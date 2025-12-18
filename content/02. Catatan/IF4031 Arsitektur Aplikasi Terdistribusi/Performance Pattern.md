---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic: Design Patterns dalam Sistem Terdistribusi (Studi Kasus Uber)
> 
> > ## Questions/Cues
> >
> > - Apa itu Sharding?
> >     
> > - Cara kerja Gossip Protocol
> >     
> > - Fungsi Gateway Aggregation
> >     
> > - Apa itu BFF?
> >     
> > - Konsep Circuit Breaker
> >     
> > - Kegunaan WAL
> >     
> > - Exponential Backoff
> >     
> >
> > ## Reference Points
> >
> > - Arsitektur Uber.pdf (Halaman 2: Patterns)
> >     
> > - Karakteristik Sistem Kompleks.pdf (Solusi teknis)
> >     
> 
> > ### 1. Sharding (Penskalaan Horizontal)
> >
> > Konteks: Digunakan ketika satu database (seperti PostgreSQL tunggal di Uber) tidak lagi mampu menampung volume data yang masif.
> > 
> > Penerapan: Membagi data besar ke dalam partisi-partisi logis yang disebut shards berdasarkan kunci tertentu (misal: UUID perjalanan).
> > 
> > Manfaat: Memungkinkan penambahan node database baru secara linear tanpa mengganggu sistem secara keseluruhan.
> >
> > ### 2. Gossip Dissemination (Protokol Gosip)
> >
> > Konteks: Kebutuhan untuk mendeteksi kesehatan ribuan server tanpa bergantung pada satu koordinator pusat (Single Point of Failure).
> > 
> > Penerapan: Setiap node server secara acak memilih node lain untuk bertukar informasi status (ping). Informasi kesehatan server menyebar ke seluruh klaster seperti "gosip".
> > 
> > Tools: Uber menggunakan library Ringpop untuk manajemen status pengemudi yang terdistribusi.
> >
> > ### 3. Gateway Aggregation & Backends for Frontends (BFF)
> >
> > Konteks: Aplikasi mobile tidak efisien jika harus memanggil ratusan microservices secara langsung.
> > 
> > Gateway Aggregation: Menggunakan satu titik masuk (Edge Gateway) untuk menggabungkan banyak permintaan dari klien menjadi satu.
> > 
> > BFF: Membuat lapisan khusus (Presentation Layer) yang melayani kebutuhan spesifik antarmuka (iOS/Android), memisahkan logika tampilan dari logika bisnis di backend.
> >
> > ### 4. Circuit Breaker & Retry
> >
> > Konteks: Mencegah kegagalan di satu layanan agar tidak merambat ke seluruh sistem (cascading failure).
> > 
> > Circuit Breaker: Memutus koneksi secara otomatis ke layanan yang sedang bermasalah/lambat.
> > 
> > Retry: Melakukan percobaan ulang otomatis untuk menangani kegagalan sementara (transient failures).
> >
> > ### 5. Write-Ahead Log (WAL)
> >
> > Konteks: Menjamin durabilitas data agar tidak hilang saat sistem mati mendadak.
> > 
> > Penerapan: Setiap perubahan data tidak langsung menimpa data lama, melainkan ditulis sebagai entri baru yang berurutan dalam log yang tidak dapat diubah (append-only). Log ini menjadi sumber kebenaran (source of truth) untuk replikasi.
> >
> > ### 6. Exponential Backoff & Jitter
> >
> > Konteks: Menangani fenomena Retry Storm agar server yang baru pulih tidak langsung tumbang lagi.
> > 
> > Penerapan: Menambahkan jeda waktu yang meningkat secara bertahap sebelum melakukan percobaan ulang, serta menambahkan delay acak (jitter) agar permintaan dari jutaan klien tidak masuk di detik yang sama.

> [!cornell] #### Summary
> 
> Design Patterns adalah solusi standar untuk masalah berulang dalam arsitektur sistem. Pola seperti Sharding dan Gossip Protocol menangani masalah skalabilitas dan koordinasi, sementara Circuit Breaker dan BFF berfokus pada ketahanan sistem dan efisiensi komunikasi antara klien dan server. Penggunaan pola yang tepat, seperti WAL, memastikan integritas data tetap terjaga dalam kondisi ekstrem sekalipun.

> [!ad-libitum]- Additional Information: Pendalaman Teknis
> 
> #### Implementasi Sharding di Uber (Schemaless)
> 
> Uber tidak hanya melakukan sharding biasa, mereka membangun sistem bernama **Schemaless** di atas MySQL. Data perjalanan dipecah berdasarkan _Trip ID_. Karena data bersifat _append-only_, mereka tidak pernah melakukan `UPDATE`, melainkan selalu menambah baris baru. Ini sangat mempermudah proses sharding dan replikasi data antar pusat data.
> 
> #### Gossip Protocol vs Centralized Coordinator
> 
> Berbeda dengan ZooKeeper atau Consul yang bertindak sebagai "polisi pusat", Gossip Protocol membuat setiap server menjadi "informan". Ini membuat sistem lebih tahan banting karena tidak ada satu server pun yang jika mati akan meruntuhkan seluruh mekanisme pemantauan kesehatan klaster.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - _Uber Engineering_: "Service-Oriented Architecture at Uber".
>     
> - _Cloud Design Patterns_: Microsoft Azure Architecture Center.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan utama antara Sharding dan database tunggal?</strong></summary>
> 
> Database tunggal menyimpan semua data di satu mesin (penskalaan vertikal), sedangkan Sharding membagi data ke banyak mesin berbeda (penskalaan horizontal) untuk menangani beban yang lebih besar.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa pola BFF (Backends for Frontends) penting untuk aplikasi mobile?</strong></summary>
> 
> Karena aplikasi mobile seringkali memiliki batasan bandwidth dan daya baterai. BFF membantu meringkas ratusan panggilan API backend menjadi satu panggilan tunggal yang sudah diformat khusus untuk kebutuhan layar ponsel.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Kapan sebuah "Circuit Breaker" akan berpindah ke status 'Open' (Terbuka)?</strong></summary>
> 
> Ketika ambang batas kegagalan (misal: 50% request gagal atau timeout) pada layanan tujuan tercapai. Saat statusnya 'Open', semua request akan langsung ditolak tanpa mencoba menghubungi layanan yang rusak tersebut.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Apa keuntungan menggunakan Write-Ahead Log (WAL) dalam sistem storage?</strong></summary>
> 
> Menjamin urutan kejadian data dan memudahkan pemulihan jika terjadi crash, karena semua instruksi perubahan tercatat secara permanen di log sebelum diaplikasikan ke database utama.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Bagaimana Jitter membantu mencegah kegagalan sistem saat recovery?</strong></summary>
> 
> Jitter memberikan variasi waktu acak pada setiap percobaan ulang (retry), sehingga jutaan perangkat tidak menyerang server secara bersamaan (mencegah lonjakan trafik yang tiba-tiba).
> 
> </details>