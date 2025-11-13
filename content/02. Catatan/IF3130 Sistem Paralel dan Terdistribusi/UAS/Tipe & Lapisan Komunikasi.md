---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa inti dari sistem terdistribusi?
> >     
> > - Apa itu layer _low-level_?
> >     
> > - Apa itu _middleware layer_?
> >     
> > - 6 fungsi _middleware_?
> >     
> > - Beda _Transient_ vs _Persistent_?
> >     
> > - Beda _Asynchronous_ vs _Synchronous_?
> >     
> > - 3 tempat sinkronisasi?
> >     
> > - Kekurangan komunikasi sinkronus C/S?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-8 (11 - IF3130-11-Communication-2022.pdf)
> >     
> > - Kuliah Komunikasi
> >     
> 
> > ### 1. Inti Komunikasi
> > 
> > **Interprocess communication (IPC)** adalah jantung dari semua sistem terdistribusi. Komunikasi ini selalu didasarkan pada _message passing_ (pengiriman pesan) level rendah yang disediakan oleh jaringan di bawahnya.
> > 
> > ### 2. Low-Level Layer
> > 
> > Antarmuka (interface) terbawah yang digunakan oleh sebagian besar sistem terdistribusi adalah _network layer_. Namun, **Transport Layer** (seperti TCP dan UDP) adalah yang sesungguhnya menyediakan fasilitas komunikasi praktis.
> > 
> > ### 3. Middleware Layer
> > 
> > _Middleware_ adalah sebuah layer (lapisan) perangkat lunak yang dibuat di atas _low-level layer_ untuk menyediakan **layanan dan protokol umum** yang dapat digunakan kembali oleh berbagai aplikasi.
> > 
> > Tujuannya adalah agar _developer_ tidak perlu pusing memikirkan masalah umum dan bisa fokus pada logika aplikasi spesifik.
> > 
> > Layanan yang disediakan _middleware_:
> > 
> > 1. **Protokol Komunikasi:** Menyediakan abstraksi yang lebih tinggi dari TCP/UDP (contoh: RPC, MOM).
> >     
> > 2. **(Un)marshaling Data:** Proses _packing_ dan _unpacking_ data agar bisa dikirim lewat jaringan.
> >     
> > 3. **Naming Protocols:** Memudahkan penemuan dan _sharing resources_.
> >     
> > 4. **Security Protocols:** Untuk komunikasi yang aman (enkripsi, otentikasi).
> >     
> > 5. **Scaling Mechanisms:** Seperti replikasi dan _caching_.
> >     
> > 
> > ### 4. Tipe Komunikasi: Transient vs Persistent
> > 
> > 6. **Transient Communication:**
> >     
> > 
> > - Pesan akan **dibuang (discard)** jika tidak berhasil terkirim (misal: _receiver_ sedang _offline_).
> >     
> > - Aplikasi _sender_ (pengirim) dan _receiver_ (penerima) **harus aktif** pada saat proses pengiriman pesan.
> >     
> > - _Contoh:_ Panggilan telepon, _streaming_ langsung, komunikasi Socket TCP standar.
> >     
> > 
> > 2. **Persistent Communication:**
> >     
> > 
> > - Pesan akan **disimpan** oleh _communication middleware_ (misal: dalam _queue_).
> >     
> > - Pesan akan disimpan sampai bisa dikirimkan ke _receiver_ (saat _receiver_ kembali _online_).
> >     
> > - Aplikasi _sender_ dan _receiver_ **tidak harus aktif** pada saat bersamaan.
> >     
> > - _Contoh:_ Email, WhatsApp/Telegram, SMS.
> >     
> > 
> > ### 5. Tipe Komunikasi: Asynchronous vs Synchronous
> > 
> > 1. **Asynchronous Communication:**
> >     
> > 
> > - Pengirim (sender) **melanjutkan proses** segera setelah mengirim pesan, tanpa menunggu balasan (ACK).
> >     
> > - Ini bersifat _**non-blocking**_.
> >     
> > 
> > 2. **Synchronous Communication:**
> >     
> > 
> > - Pengirim (sender) akan **terblokir (blocking)** dan menunggu sampai ada informasi ketersampaian pesan.
> >     
> > 
> > ![[Pasted image 20251111152134.png]]
> > 
> > Ada 3 level "blocking" yang berbeda dalam komunikasi sinkronus:
> > 
> > 1. **Synchronize at request submission:** Client _blocking_ hanya sampai pesan _request_ berhasil dikirim (diserahkan ke OS/jaringan).
> >     
> > 2. **Synchronize at request delivery:** Client _blocking_ sampai server _benar-benar menerima_ pesan.
> >     
> > 3. **Synchronize after processing:** Client _blocking_ paling lama, yaitu sampai server selesai memproses _request_ dan mengirim _Reply_. Ini adalah model Client-Server standar.
> >     
> > 
> > ### 6. Kekurangan Komunikasi Sinkronus (Client/Server)
> > 
> > Model _transient synchronous_ (model C/S standar) memiliki kelemahan:
> > 
> > - _Client_ tidak bisa melakukan pekerjaan lain saat _blocking_ menunggu _reply_.
> >     
> > - Kegagalan (misal: server _crash_) harus ditangani saat itu juga, karena _client_ sedang menunggu.
> >     
> > - Model ini tidak cocok untuk semua aplikasi (misal: email, berita, yang lebih cocok _persistent_).
> >     

> [!cornell] #### Summary
> 
> **Komunikasi antar proses adalah inti dari sistem terdistribusi, yang difasilitasi oleh** _**transport layer**_ **(TCP/UDP) dan diabstraksi oleh** _**middleware**_ **untuk menyediakan layanan umum seperti** _**(un)marshaling**_ **dan keamanan. Komunikasi dapat dikategorikan berdasarkan dua sumbu: (1) **Transient** (harus aktif bersamaan) vs **Persistent** (pesan disimpan, misal:** _**queue**_**), dan (2) **Asynchronous** (**_**non-blocking**_**) vs **Synchronous** (**_**blocking**_**).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: (Un)Marshaling
> 
> - **Marshaling:** Proses mengambil struktur data di memori (seperti _object_, _struct_, atau _record_) dan mengubahnya menjadi format _serial_ (seperti _byte stream_, JSON, atau XML) agar bisa dikirim melalui jaringan atau disimpan ke _disk_.
>     
> - **Unmarshaling:** Proses kebalikannya, yaitu membaca data dari format _serial_ dan membangun kembali struktur data di memori.
>     
> 
> Ini adalah fungsi krusial _middleware_ karena _sender_ dan _receiver_ bisa jadi ditulis dalam bahasa pemrograman yang berbeda atau berjalan di arsitektur mesin yang berbeda (misal: _big-endian_ vs _little-endian_).
> 
> #### Pendalaman: TCP vs UDP
> 
> - **TCP (Transmission Control Protocol):** Adalah protokol _transient_ yang _connection-oriented_ dan _reliable_. Ia menjamin pesan sampai, berurutan, dan tanpa eror. Cocok untuk data yang butuh keutuhan (web, email).
>     
> - **UDP (User Datagram Protocol):** Adalah protokol _transient_ yang _connectionless_ dan _unreliable_. Pesan (datagram) dikirim begitu saja tanpa jaminan. Cocok untuk data yang butuh kecepatan di atas keutuhan (game, VoIP, streaming).
>     
> 
> #### Eksplorasi Mandiri
> 
> - Pikirkan aplikasi sehari-hari:
>     
> - **Email:** _Persistent_ (Anda bisa kirim email ke teman yang _offline_) & _Asynchronous_ (Anda tidak _blocking_ setelah klik 'kirim').
>     
> - **Panggilan WhatsApp:** _Transient_ (jika teman Anda _offline_, panggilan gagal) & _Synchronous_ (Anda menunggu sampai terhubung).
>     
> - **Browsing Web (HTTP):** _Transient_ & _Synchronous_ (Browser Anda _blocking_/menunggu _reply_ dari server).
>