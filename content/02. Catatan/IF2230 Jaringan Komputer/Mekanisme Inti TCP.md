---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Mekanisme Inti TCP
> 
> > ## Questions/Cues
> > 
> > - Apa itu **Transmission Control Protocol (TCP)**?
> > - Apa artinya _reliable_ dan _connection-oriented_?
> > - Jelaskan konsep layanan _byte-stream_.
> > - Apa saja komponen utama dalam **Header TCP**?
> > - Apa fungsi _Sequence Number_?
> > - Apa fungsi _Acknowledgment Number_?
> > - Jelaskan 6 _control flags_ TCP (UAPRSF).
> > - Apa fungsi field _Window_?
> > 
> > ## Reference Points
> > 
> > - Lecture 7, Slides: 10-11, 14, 25, 28-34
> 
> > ### Konsep Dasar Transmission Control Protocol (TCP)
> > 
> > **TCP (Transmission Control Protocol)** adalah salah satu protokol inti di Lapisan Transport yang dirancang untuk menyediakan pengiriman data yang andal dan terurut melalui jaringan.
> > 
> > Tiga pilar utama TCP adalah:
> > 
> > 1. _**Reliable (Andal):**_ TCP menjamin bahwa setiap byte data yang dikirim akan sampai ke tujuan tanpa cacat, tidak ada yang hilang, dan dalam urutan yang benar. Jika ada data yang hilang atau rusak, TCP akan mengirimkannya kembali.
> > 2. _**Connection-Oriented:**_ Sebelum data dapat dikirim, kedua proses (pengirim dan penerima) harus terlebih dahulu membangun sebuah koneksi melalui prosedur yang disebut _handshake_. Koneksi ini harus ditutup secara formal setelah selesai.
> > 3. _**Byte-Stream Service:**_ TCP memberikan abstraksi kepada aplikasi seolah-olah mereka sedang menulis dan membaca dari sebuah aliran data (stream) yang kontinu dan tak terputus. Aplikasi tidak perlu pusing memikirkan bagaimana data dipecah menjadi paket-paket. TCP di sisi pengirim akan menampung data di _send buffer_, memecahnya menjadi **segmen**, dan mengirimkannya. TCP di sisi penerima akan menyusun kembali segmen-segmen tersebut di _receive buffer_ sebelum diserahkan ke aplikasi.
> > 
> > ### Struktur Header dan Segmen TCP
> > 
> > Paket data yang dipertukarkan antar entitas TCP disebut **segmen**. Setiap segmen memiliki sebuah header yang berisi informasi kontrol penting untuk mengatur keandalan dan aliran data.
> > 
> > Field-field kunci dalam Header TCP meliputi:
> > 
> > - **Source Port & Destination Port (masing-masing 16 bit):** Digunakan untuk identifikasi proses aplikasi di pengirim dan penerima (demultiplexing).
> > - **Sequence Number (32 bit):** Ini adalah field yang sangat krusial. Fungsinya adalah untuk melacak urutan byte dalam _byte-stream_. Field ini berisi nomor urut dari byte pertama dalam segmen tersebut. TCP menghitung **byte**, bukan segmen.
> > - **Acknowledgment Number (32 bit):** Jika flag ACK aktif, field ini berisi nomor urut dari byte **berikutnya** yang diharapkan oleh penerima. Ini adalah mekanisme konfirmasi kumulatif; ACK untuk nomor `N` berarti semua byte hingga `N-1` telah berhasil diterima.
> > - **Header Length (4 bit):** Menunjukkan panjang header TCP dalam kelipatan 32-bit (4 byte). Nilainya berkisar antara 5 (untuk header 20 byte) hingga 15 (untuk header 60 byte, jika ada options).
> > - **Receive Window (16 bit):** Digunakan untuk _flow control_. Field ini memberitahu pengirim berapa banyak byte yang masih bersedia diterima oleh penerima.
> > - **Checksum (16 bit):** Digunakan untuk mendeteksi error pada header dan data segmen.
> > - **Control Flags (6 bit):** Enam flag satu-bit yang mengontrol status koneksi:
> >     - **URG (Urgent):** Menandakan bahwa data ini bersifat mendesak.
> >     - **ACK (Acknowledgment):** Menandakan bahwa field Acknowledgment Number valid.
> >     - **PSH (Push):** Meminta penerima untuk segera menyerahkan data yang telah diterima ke aplikasi tanpa menunggu buffer penuh.
> >     - **RST (Reset):** Mengindikasikan terjadi error dan koneksi harus dihentikan secara paksa.
> >     - **SYN (Synchronize):** Digunakan untuk memulai dan menyinkronkan koneksi (dalam proses handshake).
> >     - **FIN (Finish):** Digunakan untuk mengakhiri koneksi secara baik-baik.

> [!cornell] #### Summary
> 
> - TCP menyediakan layanan abstraksi **byte-stream** yang _reliable_ dan _connection-oriented_, yang menyembunyikan kompleksitas segmentasi dan pengiriman paket dari lapisan aplikasi.
> - Kunci dari fungsionalitas TCP terletak pada **Header TCP** yang kompleks, yang menggunakan _Sequence Number_ untuk pengurutan byte dan _Acknowledgment Number_ untuk konfirmasi pengiriman yang andal.
> - _Control Flags_ (seperti SYN, ACK, dan FIN) berfungsi sebagai sinyal kontrol yang mengatur seluruh siklus hidup koneksi, mulai dari pembentukan, transfer data, hingga penghentian.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Filosofi Desain: Byte-Stream vs. Message-Stream
> 
> - Penting untuk dipahami bahwa karena TCP adalah _byte-stream_, ia tidak mempertahankan batasan pesan (_message boundaries_) dari aplikasi. Jika aplikasi pengirim melakukan dua kali `write()` (satu 500 byte, satu lagi 700 byte), aplikasi penerima mungkin perlu melakukan satu kali `read()` untuk mendapatkan 1200 byte, atau beberapa kali `read()` (misalnya, 1000 byte lalu 200 byte). Aplikasi harus membangun logikanya sendiri untuk mengetahui di mana satu "pesan" berakhir dan "pesan" berikutnya dimulai.
> 
> #### Detail Teknis: Peran Ganda Sequence Number
> 
> - `Sequence Number` memiliki peran ganda yang bergantung pada flag `SYN`.
>     - **Saat SYN=1 (permintaan koneksi):** Field ini berisi _Initial Sequence Number (ISN)_, yang merupakan nomor acak sebagai titik awal penghitungan byte.
>     - **Saat SYN=0 (selama transfer data):** Field ini berisi nomor urut dari byte data pertama yang ada di dalam payload segmen tersebut.
> 
> #### Eksplorasi Mandiri
> 
> - Gunakan **Wireshark** saat Anda membuka sebuah situs web. Filter dengan `tcp`. Klik pada salah satu segmen TCP dan periksa bagian headernya. Anda akan dapat melihat secara detail nilai dari _Source Port, Destination Port, Sequence Number, ACK Number,_ dan flag mana yang sedang aktif (misalnya, [SYN], [ACK], [PSH, ACK]). Ini adalah cara terbaik untuk melihat teori ini dalam praktik.