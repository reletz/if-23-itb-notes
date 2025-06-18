---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Dasar-dasar dan UDP
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan utama Lapisan Transport?
> > - Apa saja fungsi-fungsi kuncinya?
> > - Apa itu _demultiplexing_?
> > - Bagaimana port number bekerja?
> > - Apa itu **User Datagram Protocol (UDP)**?
> > - Sebutkan karakteristik utama UDP.
> > - Kapan sebaiknya menggunakan UDP?
> > - Bisakah UDP dibuat andal?
> > - Bagaimana cara kerja Checksum UDP?
> > 
> > ## Reference Points
> > 
> > - Lecture 7, Slides: 2, 5-7, 10-11, 14, 17-23
> 
> > ### Peran dan Fungsi Lapisan Transport
> > 
> > Tujuan utama dari lapisan transport adalah untuk menyediakan **komunikasi logis** antara **proses-proses aplikasi** yang berjalan pada host yang berbeda. Ini merupakan peningkatan dari layanan lapisan jaringan yang hanya menyediakan komunikasi dari host-ke-host.
> > 
> > **Analogi:** Jika alamat IP (Lapisan Jaringan) adalah alamat sebuah gedung, maka nomor port (Lapisan Transport) adalah nomor unit apartemen di dalam gedung itu. Lapisan transport memastikan pesan sampai ke aplikasi yang tepat.
> > 
> > Fungsi-fungsi utamanya meliputi:
> > 
> > 1. **Menjamin Pengiriman Pesan:** Memastikan data sampai ke tujuan (fitur TCP).
> > 2. **Menjaga Urutan Pesan:** Mengirimkan pesan sesuai urutan pengirimannya (fitur TCP).
> > 3. **Mendukung Pesan Besar:** Memecah pesan besar dari aplikasi menjadi segmen-segmen yang lebih kecil dan menyusunnya kembali di penerima.
> > 4. **Demultiplexing:** Menggunakan **nomor port** untuk mengarahkan segmen yang masuk ke proses aplikasi yang benar di host penerima. Setiap host memiliki banyak _message queue_, dan UDP/TCP akan menempatkan paket yang datang ke antrian yang sesuai berdasarkan nomor port tujuan.
> > 5. **Kontrol Aliran (Flow Control):** Mengizinkan penerima untuk mengontrol kecepatan pengirim agar tidak kewalahan (fitur TCP).
> > 
> > ### User Datagram Protocol (UDP)
> > 
> > UDP adalah protokol lapisan transport yang **sederhana**, **connectionless**, dan **tidak andal** (_unreliable_). Ia menyediakan layanan "best effort", yang berarti ia akan berusaha mengirimkan segmen namun tanpa jaminan apa pun.
> > 
> > Karakteristik utama UDP adalah:
> > 
> > - **Connectionless:** Tidak ada proses "jabat tangan" (handshake) sebelum mengirim data. Tidak ada pesan SYN atau FIN. Paket data, yang disebut _datagram_, langsung dikirim begitu saja.
> > - **Unreliable:** Tidak ada jaminan segmen akan sampai. Segmen bisa hilang (_lost_) atau tiba tidak sesuai urutan (_out of order_). UDP tidak memiliki _sequence number_ atau _acknowledgment_ untuk melacak pengiriman.
> > - **Cepat dan Efisien:** Karena minim fitur, _overhead_ UDP sangat kecil, membuatnya lebih cepat dibandingkan TCP.
> > 
> > **Kapan UDP Digunakan?**
> > 
> > - Saat **kecepatan** lebih penting daripada keandalan 100%.
> > - Aplikasi yang sensitif terhadap penundaan (_delay_), seperti streaming multimedia, game online, dan VoIP.
> > - Aplikasi yang bisa mentolerir kehilangan sebagian kecil data.
> > - Layanan jaringan fundamental seperti DNS (naming) dan SNMP (network management).
> > 
> > **Keandalan pada UDP**
> > 
> > - Secara inheren, UDP tidak andal. Namun, keandalan dapat diimplementasikan oleh **lapisan aplikasi**.
> > - Aplikasi itu sendiri yang harus bertanggung jawab untuk melacak data, meminta transmisi ulang jika ada yang hilang, dan mengurutkan kembali data yang diterima. Contohnya adalah protokol TFTP.
> > 
> > **Mekanisme Checksum UDP**
> > 
> > - UDP menyediakan mekanisme _checksum_ untuk mendeteksi error (misalnya, bit yang terbalik) pada segmen yang ditransmisikan.
> > - **Proses di Pengirim:**
> >     1. Seluruh isi segmen (header + data) dianggap sebagai urutan bilangan integer 16-bit.
> >     2. Semua bilangan tersebut dijumlahkan menggunakan _1's complement sum_.
> >     3. Hasil akhir dari penjumlahan tersebut dimasukkan ke dalam field _checksum_ di header UDP.
> > - **Proses di Penerima:**
> >     1. Penerima menghitung ulang checksum dari segmen yang diterima.
> >     2. Jika hasil perhitungan **tidak sama** dengan nilai di field checksum, maka terdeteksi adanya error. Jika sama, dianggap tidak ada error.

> [!cornell] #### Summary
> 
> - Lapisan Transport menyediakan komunikasi **logis antar aplikasi (proses-ke-proses)** dengan menggunakan nomor port untuk membedakan layanan di satu host.
> - **UDP (User Datagram Protocol)** adalah pilihan protokol yang **cepat dan efisien** karena sifatnya yang _connectionless_ dan _unreliable_, ideal untuk aplikasi yang memprioritaskan kecepatan di atas keandalan data 100% seperti streaming video atau DNS.
> - Fitur utama UDP adalah **demultiplexing** menggunakan nomor port dan **deteksi error** melalui _checksum_ opsional, sementara mekanisme keandalan lainnya diserahkan kepada lapisan aplikasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Konteks Sejarah & Standar
> 
> - UDP didefinisikan dalam **RFC 768**, sebuah dokumen yang sangat singkat dan sederhana, mencerminkan kesederhanaan protokol itu sendiri. Dokumen ini diterbitkan pada tahun 1980 dan tetap menjadi standar hingga hari ini.
> 
> #### Aplikasi Praktis
> 
> - **Wireshark:** Anda dapat menggunakan tool penganalisa jaringan seperti Wireshark untuk melihat datagram UDP secara langsung. Saat Anda melakukan query DNS (misalnya, dengan perintah `nslookup google.com`), Wireshark akan menunjukkan paket UDP yang dikirim ke port 53 (port standar DNS) dengan header yang sederhana. Ini memberikan pemahaman praktis tentang bagaimana UDP bekerja di dunia nyata.
> 
> #### Bacaan Lebih Lanjut
> 
> - Untuk pemahaman mendalam tentang bagaimana UDP bekerja tanpa jaminan, Anda bisa membaca tentang "best-effort delivery model" yang menjadi filosofi dasar dari arsitektur awal Internet. Model ini mengasumsikan bahwa jaringan inti harus dibuat sesederhana mungkin, dan kecerdasan (seperti penanganan error dan keandalan) harus ditempatkan di ujung-ujung jaringan (_end-to-end principle_).