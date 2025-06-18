---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa saja layanan yang ditawarkan TCP?
> > - Apa beda _byte-stream_ & segmen?
> > - Apa itu _Flow Control_ vs _Congestion Control_?
> > - Apa saja field penting di header TCP?
> > - Apa fungsi _Sequence_ & _ACK Number_?
> > - Apa fungsi dari flag TCP (SYN, ACK, FIN)?
> > - Bagaimana cara kerja _3-Way Handshake_?
> > - Bagaimana cara menutup koneksi TCP?
> >
> > ## Reference Points
> > 
> > - Slides 25, 38
> > - Slides 28, 29
> > - Slide 27
> > - Slides 30-34
> > - Slides 31, 50-52
> > - Slides 34, 66-67
> > - Slide 35
> > - Slide 37
>
> > ### Layanan dan Konsep Dasar TCP
> > 
> > **Layanan Utama TCP (Transmission Control Protocol):** Tidak seperti UDP, TCP dirancang untuk menyediakan layanan komunikasi yang sangat andal.
> > 
> > - _**Reliable**_ **(Andal):** Menjamin data sampai tanpa error, tidak hilang, dan sesuai urutan.
> > - _**Connection-Oriented**_ **(Berbasis Koneksi):** Harus ada proses "jabat tangan" (_handshake_) untuk membangun koneksi logis sebelum data dapat dikirim.
> > - _**Byte-Stream Service**_ **(Layanan Aliran Byte):** Bagi aplikasi, koneksi TCP terlihat seperti sebuah aliran data dua arah yang kontinu, seperti membaca atau menulis dari sebuah file, tanpa perlu tahu batasan-batasan paket di bawahnya.
> > 
> > **Byte-Stream vs. Segmen:**
> > 
> > - Aplikasi menulis data sebagai **aliran byte (byte-stream)** ke dalam _send buffer_ TCP.
> > - TCP mengambil data dari buffer ini dan membungkusnya ke dalam unit-unit paket yang disebut **segmen** untuk dikirim melalui jaringan.
> > - Di sisi penerima, TCP mengeluarkan data dari segmen dan menempatkannya di _receive buffer_, di mana aplikasi dapat membacanya kembali sebagai byte-stream.
> > 
> > **Flow Control vs. Congestion Control:**
> > 
> > - _**Flow Control:**_ Mekanisme untuk mencegah **pengirim** membanjiri buffer **penerima**. Ini adalah masalah antara dua titik akhir (end-to-end).
> > - _**Congestion Control:**_ Mekanisme untuk mencegah **terlalu banyak data** yang disuntikkan ke dalam **jaringan**, yang bisa menyebabkan switch atau link kewalahan. Ini adalah masalah kestabilan jaringan secara keseluruhan.
> >
> > ### Header TCP: Mesin Keandalan
> > 
> > Header TCP jauh lebih kompleks dari UDP karena harus membawa informasi untuk manajemen koneksi, keandalan, dan flow control.
> > ![[Pasted image 20250618172341.png]]
> > - **Source & Destination Port (16-bit each):** Mengidentifikasi proses aplikasi pengirim dan penerima.
> > - **Sequence Number (32-bit):** Nomor urut byte pertama dalam segmen data. Jika flag SYN aktif, ini adalah _Initial Sequence Number_ (ISN). Perhitungan dilakukan per byte, bukan per segmen.
> > - **Acknowledgment Number (32-bit):** Jika flag ACK aktif, field ini berisi _sequence number_ dari byte **berikutnya** yang diharapkan oleh pengirim ACK. Ini secara implisit memberitahu bahwa semua byte sebelumnya telah diterima dengan baik.
> > - **Header Length (4-bit):** Menunjukkan panjang header TCP dalam kelipatan 32-bit (4-byte). Minimum 5 (20 byte), maksimum 15 (60 byte).
> > - **Flags (6-bit):** Bit kontrol yang sangat penting:
> >     - **SYN:** Digunakan untuk memulai (sinkronisasi) koneksi.
> >     - **ACK:** Menandakan bahwa field Acknowledgment Number valid.
> >     - **FIN:** Digunakan oleh pengirim untuk menandakan tidak ada lagi data yang akan dikirim (mengakhiri koneksi).
> >     - **RST:** Mereset koneksi secara paksa, biasanya karena ada error.
> >     - **PSH:** Mendorong penerima untuk segera menyerahkan data ke aplikasi.
> >     - **URG:** Menandakan ada data darurat (_urgent_).
> > - **Receive Window (16-bit):** Digunakan untuk _flow control_. Memberitahu pengirim berapa banyak byte yang masih tersedia di buffer penerima.
> >
> > ### Manajemen Koneksi: Siklus Hidup TCP
> > 
> > **Membangun Koneksi (Three-Way Handshake):**
> > ![[Pasted image 20250618172512.png]]
> > 1. _**SYN:**_ Klien mengirim segmen TCP dengan **flag SYN (Synchronize) aktif** dan sebuah _Initial Sequence Number_ (ISN) acak. Ini adalah permintaan untuk membuka koneksi.
> > 2. _**SYN-ACK:**_ Server merespons dengan segmen yang memiliki **flag SYN dan ACK aktif**. Server membuat ISN-nya sendiri dan mengirim ACK untuk ISN klien (dengan menambahkan 1).
> > 3. _**ACK:**_ Klien merespons kembali dengan segmen yang memiliki **flag ACK aktif**. ACK ini memberitahukan penerimaan ISN dari server. Setelah ini, koneksi dianggap **terbuka (established)** dan transfer data dapat dimulai.
> > 
> > **Menutup Koneksi:**
> > ![[Pasted image 20250618172541.png]]
> > 
> > 4. _**FIN:**_ Klien (atau pihak mana pun yang ingin menutup) mengirim segmen dengan **flag FIN aktif**.
> > 5. _**ACK:**_ Pihak lain merespons dengan ACK untuk mengonfirmasi penerimaan permintaan FIN. Pada titik ini, koneksi masuk ke kondisi setengah-tertutup (_half-closed_); pihak yang menerima FIN masih bisa mengirim data.
> > 6. _**FIN:**_ Ketika pihak kedua juga sudah selesai mengirim data, ia akan mengirim segmen **FIN**-nya sendiri.
> > 7. _**ACK:**_ Pihak pertama merespons dengan ACK terakhir. Setelah menunggu beberapa saat (status _Timed Wait_), koneksi di kedua sisi akhirnya benar-benar ditutup.

> [!cornell] #### Summary
> TCP menyediakan layanan komunikasi yang **andal dan berorientasi koneksi** dengan memperlakukan data sebagai **aliran byte (byte-stream)**. Keandalannya dimungkinkan oleh **header TCP yang kompleks**, terutama penggunaan _Sequence Number_ dan _Acknowledgment Number_. Siklus hidup koneksi diatur secara ketat melalui proses **Three-Way Handshake** untuk memulai koneksi dan prosedur penutupan berbasis **FIN/ACK** untuk mengakhirinya.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Randomisasi Initial Sequence Number (ISN)
> 
> - ISN tidak dimulai dari 0 atau 1, melainkan dipilih secara acak. Ini adalah mekanisme keamanan yang krusial untuk mencegah serangan _TCP Session Hijacking_. Jika ISN dapat diprediksi, penyerang bisa dengan mudah memalsukan segmen dan menyamar sebagai salah satu pihak dalam koneksi yang sudah terjalin.
> 
> #### State Machine TCP
> 
> - Seluruh siklus hidup koneksi TCP (mulai dari `CLOSED`, `LISTEN`, `SYN_SENT`, `ESTABLISHED`, `FIN_WAIT_1`, `FIN_WAIT_2`, `TIME_WAIT`, dll.) dapat digambarkan secara formal menggunakan sebuah **Finite State Machine (FSM)**. Memahami diagram FSM ini memberikan gambaran yang sangat detail tentang bagaimana TCP menangani setiap kemungkinan skenario dalam manajemen koneksi.
> 
> #### Eksplorasi Mandiri
> 
> - **Analisis Handshake di Wireshark:** Jalankan Wireshark, lalu gunakan command `curl http://example.com` di terminal Anda. Filter dengan `tcp`. Anda akan dapat melihat dengan jelas tiga paket pertama yang merupakan proses `SYN`, `SYN-ACK`, dan `ACK`. Periksa nilai _Sequence Number_ dan _Acknowledgment Number_ pada setiap paket untuk melihat bagaimana mereka berhubungan.