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
> > - Bagaimana TCP membuat kanal jadi andal?
> > - Apa itu protokol _pipelined_?
> > - Bagaimana TCP menangani segmen & ACK yang hilang?
> > - Apa itu _cumulative acknowledgment_?
> > - Apa itu algoritma _Sliding Window_?
> > - Apa variabel penting di pengirim & penerima?
> > - Bagaimana _Flow Control_ bekerja di TCP?
> > - Bagaimana cara menghitung _Advertised Window_?
> > - Bagaimana TCP melindungi dari _wraparound_?
> > - Apa itu _delay x bandwidth product_?
> >
> > ## Reference Points
> > 
> > - Slides 39-40
> > - Slide 41
> > - Slides 42-43
> > - Slides 44-46
> > - Slides 47-49
> > - Slides 50-52
> > - Slides 53-54
>
> > ### Prinsip Transfer Data Andal (Reliable Data Transfer)
> >
> > ![[Pasted image 20250618172907.png]]
> > Tujuan utama TCP adalah menyediakan kanal yang andal di atas jaringan yang tidak andal. Ini dicapai melalui beberapa mekanisme kunci.
> > 
> > 1. **Pelacakan Byte:** Keandalan diimplementasikan dengan melacak jumlah byte yang dikirim menggunakan _Sequence Number_ dan byte yang diterima menggunakan _Acknowledgment Number_.
> > 2. **Stop-and-Wait vs. Pipelined:**
> > 		![[Pasted image 20250618172935.png]]
> >     - _Stop-and-wait_ adalah metode sederhana di mana pengirim mengirim satu paket dan berhenti sampai menerima ACK sebelum mengirim paket berikutnya. Ini sangat tidak efisien.
> >     - TCP menggunakan metode **pipelined**, di mana pengirim dapat mengirim banyak segmen sekaligus tanpa menunggu ACK untuk setiap segmen. Ini memungkinkan "pipa" jaringan tetap terisi dan meningkatkan efisiensi secara drastis.
> > 
> > **Penanganan Error:**
> > 
> > - **Segmen Hilang:** Jika pengirim tidak menerima ACK untuk sebuah segmen dalam jangka waktu tertentu (disebut _timeout_), ia akan menganggap segmen tersebut hilang dan mengirimkannya kembali (_retransmit_).
> > - **ACK Hilang:** Jika sebuah ACK hilang, pengirim juga akan mengalami _timeout_ dan mengirim ulang segmen. Namun, TCP memiliki mekanisme cerdas untuk ini.
> > - _**Cumulative Acknowledgment:**_ ACK di TCP bersifat kumulatif. Jika penerima mengirim ACK=120, itu berarti semua byte hingga 119 telah diterima dengan baik. Ini sangat berguna. Jika ACK untuk segmen 100 hilang, tetapi ACK untuk segmen 120 tiba, pengirim tahu bahwa segmen 100 pasti sudah sampai dan tidak perlu mengirimnya ulang.
> >
> > ### Algoritma Sliding Window
> > 
> > _Sliding Window_ (Jendela Geser) adalah implementasi inti dari protokol _pipelined_ di TCP. Ia berfungsi untuk menjamin pengiriman yang andal, memastikan urutan data, dan menerapkan _flow control_.
> >
> > ![[Pasted image 20250618173102.png]]
> > **Di Sisi Pengirim (Sender):**
> > 
> > Jendela ini melacak byte-byte yang dikirim. Ada tiga penanda penting:
> > 
> > - **LastByteAcked:** Byte terakhir yang telah dikonfirmasi penerimaannya melalui ACK.
> > - **LastByteSent:** Byte terakhir yang telah dikirim. Data antara `LastByteAcked` dan `LastByteSent` adalah data yang "in-flight" (sedang dalam perjalanan).
> > - **LastByteWritten:** Byte terakhir yang ditulis oleh aplikasi ke dalam buffer TCP.
> >
> > Berlaku `LastByteAcked <= LastByteSent` dan `LastByteSent <= LastByteWritten`.
> >
> > **Di Sisi Penerima (Receiver):**
> > 
> > Jendela di penerima melacak byte-byte yang diterima.
> > 
> > - **LastByteRead:** Byte terakhir yang telah dibaca oleh aplikasi dari buffer.
> > - **NextByteExpected:** Byte berikutnya yang diharapkan untuk diterima secara berurutan.
> > - **LastByteRcvd:** Byte terakhir yang telah tiba di buffer penerima (bisa jadi tidak berurutan).
> >
> > Berlaku `LastByteRead <= NextByteExpected` dan `NextByteExpected <= LastByteRcvd + 1`.
> >
> > ### Flow Control: Mengatur Aliran Data
> > 
> > _Flow Control_ adalah mekanisme untuk memastikan pengirim tidak mengirim data lebih cepat daripada kemampuan penerima untuk memprosesnya. Ini diimplementasikan langsung menggunakan _Sliding Window_.
> > 
> > 1. **Penerima Mengiklankan Jendela:** Sisi penerima memiliki buffer penerimaan (_RcvBuffer_). Ruang kosong di buffer ini dihitung sebagai **RcvWindow**.
> > 2. **RcvWindow di Header:** Nilai `RcvWindow` ini disertakan dalam setiap segmen ACK yang dikirim oleh penerima ke pengirim. Ini secara efektif "mengiklankan" sisa kapasitas buffernya.
> > 3. **Pengirim Menyesuaikan Diri:** Pengirim akan memastikan bahwa jumlah data yang belum di-ACK (_unacknowledged data_, yaitu `LastByteSent - LastByteAcked`) tidak akan pernah melebihi nilai `AdvertisedWindow` yang diterima dari penerima.
> > 
> > ![[Pasted image 20250618173606.png]]
> > **Formula Penting:**
> > 
> > - `AdvertisedWindow = MaxRcvBuffer - (NextByteExpected - 1 - LastByteRead)`
> > - `LastByteSent - LastByteAcked ≤ AdvertisedWindow`
> >
> > **Formula Lain:**
> > - `LastByteRcvd − LastByteRead ≤ MaxRcvBuffer`
> > - `EffectiveWindow = AdvertisedWindow − (LastByteSent − LastByteAcked)`
> > - `LastByteWritten − LastByteAcked ≤ MaxSendBuffer`
> >
> > ### Isu-Isu Lanjutan dalam Sliding Window
> > 
> > **Melindungi dari Wraparound:**
> > 
> > - _Sequence Number_ TCP memiliki 32 bit, yang berarti ada sekitar 4.2 miliar nomor urut.
> > - _Wraparound_ terjadi ketika nomor urut habis dan kembali ke 0. Ini berbahaya jika sebuah paket lama dari siklus sebelumnya tiba-tiba muncul di koneksi saat ini.
> > - Aturan dasarnya adalah _Maximum Segment Lifetime (MSL)_ di Internet ditetapkan sekitar 120 detik. Kita harus memastikan nomor urut tidak habis dan berulang dalam waktu kurang dari 120 detik.
> > - Untuk jaringan berkecepatan sangat tinggi (misalnya di atas 2.5 Gbps), 32 bit bisa habis dalam hitungan detik. TCP memiliki mekanisme tambahan (seperti _timestamps_) untuk mengatasi ini, yang merupakan topik lanjutan.
> > 
> > **Menjaga Pipa Tetap Penuh (Keeping the Pipe Full):**
> > 
> > - Agar efisien, ukuran jendela (_window size_) harus cukup besar untuk menampung data sebanyak yang bisa ditampung oleh "pipa" jaringan.
> > - Ukuran ini dihitung dengan **Delay x Bandwidth Product**. Contoh: untuk RTT (delay) 100ms dan bandwidth 10 Mbps, diperlukan window sekitar 122 KB agar pengirim bisa terus mengirim data sambil menunggu ACK pertama tiba, sehingga tidak ada waktu yang terbuang.
> > - Field _AdvertisedWindow_ di header TCP (16 bit) hanya bisa menampung nilai hingga 64 KB. Untuk jaringan modern, ini tidak cukup. TCP menggunakan opsi _Window Scale_ di _handshake_ awal untuk memperbesar ukuran jendela efektif ini.

> [!cornell] #### Summary
> TCP mencapai keandalan dan efisiensi melalui algoritma **Sliding Window**, sebuah implementasi dari protokol _pipelined_ yang memungkinkan pengiriman banyak segmen sekaligus. Mekanisme ini menggunakan **Sequence/ACK numbers** untuk melacak data dan **timeout** untuk menangani kehilangan. _Flow Control_ diimplementasikan secara elegan di dalam _Sliding Window_, di mana penerima **mengiklankan kapasitas buffernya (RcvWindow)** agar pengirim tidak mengirim data secara berlebihan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Go-Back-N vs. Selective Repeat
> 
> - _Sliding Window_ adalah konsep umum. Ada dua strategi utama untuk retransmisi:
>     1. **Go-Back-N (GBN):** Jika segmen N hilang, pengirim akan mengirim ulang semua segmen mulai dari N, meskipun segmen N+1, N+2, dst. sudah sampai di penerima. Ini lebih sederhana tetapi boros bandwidth.
>     2. **Selective Repeat (SR):** Pengirim hanya akan mengirim ulang segmen yang benar-benar hilang. Penerima harus bisa menyimpan segmen yang datang tidak berurutan. Ini lebih efisien tetapi lebih kompleks.
> - TCP secara klasik mirip dengan GBN karena ACK-nya kumulatif, tetapi dalam praktiknya ia merupakan **hibrida**. Dengan menggunakan opsi **SACK (Selective Acknowledgment)**, penerima bisa memberitahu pengirim blok data mana saja yang sudah diterima, sehingga pengirim hanya perlu mengirim ulang blok yang hilang, mirip seperti SR.
> 
> #### Zero-Window Probing
> 
> - Apa yang terjadi jika penerima mengiklankan jendela berukuran 0 karena buffernya penuh? Apakah pengirim berhenti selamanya? Tidak. Untuk mencegah kebuntuan (_deadlock_), pengirim akan secara periodik mengirim segmen kecil (biasanya 1 byte) yang disebut **Zero-Window Probe**. Tujuannya adalah untuk "memancing" respons dari penerima yang berisi nilai window terbaru, dan akan terus melakukannya sampai jendela terbuka kembali.