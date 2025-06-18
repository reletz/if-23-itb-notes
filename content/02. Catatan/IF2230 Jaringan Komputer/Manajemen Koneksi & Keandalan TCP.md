---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Manajemen Koneksi & Keandalan TCP
> 
> > ## Questions/Cues
> > 
> > - Bagaimana TCP memulai sebuah koneksi?
> > - Jelaskan proses **Three-Way Handshake**.
> > - Apa peran flag SYN dan ACK dalam handshake?
> > - Bagaimana TCP menutup sebuah koneksi?
> > - Jelaskan proses penutupan koneksi empat langkah.
> > - Mengapa ada status `Timed wait`?
> > - Bagaimana TCP menjamin keandalan pengiriman?
> > - Apa itu _timeout_ dan _retransmission_?
> > - Bagaimana jika ACK yang hilang?
> > - Apa itu _cumulative acknowledgment_?
> > 
> > ## Reference Points
> > 
> > - Lecture 7, Slides: 35-43
> 
> > ### Membangun Koneksi: Three-Way Handshake
> > 
> > TCP bersifat _connection-oriented_, yang berarti sebuah koneksi harus dibangun secara formal sebelum data dapat ditransfer. Proses ini disebut **Three-Way Handshake** dan tujuannya adalah agar kedua sisi (klien dan server) dapat saling menyetujui parameter komunikasi dan menyinkronkan nomor urut awal (_Initial Sequence Number_ atau ISN).
> > 
> > Prosesnya terdiri dari tiga langkah:
> > 
> > 1. **Langkah 1: [SYN] dari Klien ke Server**
> >     - Klien mengirim sebuah segmen TCP dengan flag `SYN` (Synchronize) aktif.
> >     - Segmen ini juga berisi _Initial Sequence Number_ (`client_isn`) yang dipilih secara acak oleh klien.
> >     - Ini pada dasarnya adalah pesan "permintaan koneksi".
> > 2. **Langkah 2: [SYN, ACK] dari Server ke Klien**
> >     - Server menerima segmen SYN, lalu mengalokasikan buffer dan variabel untuk koneksi tersebut.
> >     - Server merespons dengan segmen yang memiliki flag `SYN` dan `ACK` aktif.
> >     - Server menetapkan ISN-nya sendiri (`server_isn`) dan mengirimkannya.
> >     - Server juga mengakui segmen klien dengan mengatur _Acknowledgment Number_ menjadi `client_isn + 1`.
> >     - Ini pada dasarnya adalah pesan "permintaan diterima, ini nomorku, dan aku siap menerima datamu".
> > 3. **Langkah 3: [ACK] dari Klien ke Server**
> >     - Klien menerima segmen SYN-ACK dari server.
> >     - Klien merespons dengan segmen yang memiliki flag `ACK` aktif.
> >     - _Acknowledgment Number_ diatur menjadi `server_isn + 1`.
> >     - Setelah langkah ini, koneksi dianggap telah **terbentuk sepenuhnya** dan transfer data dapat dimulai. Segmen ACK ini bahkan bisa membawa data aplikasi pertama.
> > 
> > ### Menutup Koneksi
> > 
> > Karena koneksi TCP bersifat _full-duplex_ (komunikasi dua arah), setiap arah harus ditutup secara terpisah. Proses ini biasanya melibatkan empat langkah:
> > 
> > 1. **Langkah 1: [FIN] dari Klien ke Server**
> >     - Ketika klien tidak memiliki data lagi untuk dikirim, ia mengirim segmen dengan flag `FIN` (Finish) aktif.
> > 2. **Langkah 2: [ACK] dari Server ke Klien**
> >     - Server menerima FIN dan mengirimkan segmen `ACK` sebagai konfirmasi. Pada titik ini, server mungkin masih memiliki data untuk dikirim ke klien.
> > 3. **Langkah 3: [FIN] dari Server ke Klien**
> >     - Setelah server juga selesai mengirim semua datanya, ia akan mengirim segmen `FIN`-nya sendiri ke klien.
> > 4. **Langkah 4: [ACK] dari Klien ke Server**
> >     - Klien menerima FIN dari server dan merespons dengan `ACK` terakhir.
> >     - Setelah mengirim ACK ini, klien masuk ke status **`Timed wait`** untuk memastikan ACK terakhir sampai dan menangani paket yang mungkin tertinggal, sebelum akhirnya menutup koneksi sepenuhnya.
> > 
> > ### Mekanisme Keandalan Dasar: Timeout & Retransmisi
> > 
> > Fondasi keandalan TCP adalah kemampuannya untuk mendeteksi dan memperbaiki kehilangan data. Mekanisme utamanya adalah _timer timeout_ dan _retransmisi_.
> > 
> > - **Prinsip Dasar:** Setiap kali pengirim mengirim sebuah segmen, ia memulai sebuah timer. Jika timer tersebut habis sebelum menerima `ACK` untuk segmen itu, pengirim akan berasumsi segmen tersebut hilang di jaringan dan akan **mengirim ulang (retransmit)** segmen yang sama.
> >     
> > - **Skenario Penanganan Error:**
> >     
> >     - **Segmen Data Hilang:** Pengirim mengirim segmen, tetapi segmen tersebut tidak pernah sampai ke penerima. Timer di pengirim akan habis, dan segmen akan dikirim ulang.
> >     - **ACK Hilang:** Pengirim mengirim segmen, penerima berhasil menerimanya dan mengirim `ACK`, tetapi `ACK` tersebut hilang di jalan. Pengirim tidak menerima `ACK`, sehingga timer-nya akan habis dan ia akan mengirim ulang segmen yang sama. Penerima akan mendeteksi segmen ini sebagai duplikat (karena nomor urutnya sama dengan yang sudah diterima), membuang data duplikat tersebut, dan mengirim `ACK` lagi.
> > - **Cumulative Acknowledgment:** TCP menggunakan ACK kumulatif, yang sangat efisien. Jika penerima mengirim `ACK=120`, itu berarti ia mengonfirmasi telah menerima **semua byte hingga byte 119** dengan benar dan sekarang sedang menunggu byte 120. Ini memungkinkan satu ACK untuk mengonfirmasi penerimaan beberapa segmen sekaligus, dan membantu menghindari retransmisi yang tidak perlu jika hanya satu segmen di tengah-tengah yang hilang.
> >     

> [!cornell] #### Summary
> 
> - TCP menggunakan proses **Three-Way Handshake (SYN, SYN-ACK, ACK)** untuk membangun koneksi yang andal, di mana kedua pihak menyetujui parameter dan menyinkronkan nomor urut awal.
> - Penutupan koneksi dilakukan secara terstruktur melalui pertukaran flag **FIN** dan **ACK** dari kedua sisi untuk memastikan tidak ada kehilangan data saat mengakhiri sesi komunikasi.
> - Keandalan dasar TCP dijamin oleh mekanisme **timeout dan retransmisi**, di mana segmen yang tidak mendapatkan konfirmasi (`ACK`) dalam rentang waktu tertentu akan dianggap hilang dan dikirim ulang.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Detail Teknis: Status `Timed wait`
> 
> - Status `Timed wait` (biasanya diatur selama 2 kali _Maximum Segment Lifetime_ atau 2*MSL) sangat penting untuk mencegah masalah. Tujuannya adalah untuk memastikan bahwa semua paket dari koneksi lama (termasuk ACK yang mungkin tertunda) benar-benar hilang dari jaringan sebelum koneksi baru dengan pasangan alamat IP dan port yang sama dapat dibuat. Tanpa ini, paket `FIN` yang tertunda dari koneksi lama bisa tiba-tiba muncul dan secara keliru menutup koneksi baru.
> 
> #### Skenario Lanjutan: Fast Retransmit
> 
> - Menunggu timer timeout habis bisa sangat lambat dan menurunkan performa. Untuk mengatasi ini, TCP memiliki mekanisme yang lebih cerdas bernama **Fast Retransmit**. Jika pengirim menerima beberapa ACK duplikat (biasanya tiga) untuk segmen yang sama, ia akan segera mengirim ulang segmen yang hilang tersebut tanpa harus menunggu timer habis. Konsep ini akan dibahas lebih dalam pada topik Kontrol Kemacetan.
> 
> #### Eksplorasi Mandiri
> 
> - Buka kembali **Wireshark** dan lakukan aktivitas seperti mengunduh file atau memuat halaman web yang kompleks. Kali ini, fokus pada awal dan akhir dari _stream_ TCP. Anda akan dapat dengan jelas mengidentifikasi urutan `[SYN]`, `[SYN, ACK]`, `[ACK]` di awal, dan serangkaian `[FIN, PSH, ACK]` serta `[ACK]` di akhir sesi. Ini adalah cara terbaik untuk melihat teori manajemen koneksi dalam praktik.