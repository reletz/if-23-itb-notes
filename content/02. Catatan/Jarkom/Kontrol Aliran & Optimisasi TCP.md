---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Kontrol Aliran & Optimisasi TCP
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan **Kontrol Aliran (Flow Control)**?
> > - Bedakan Flow Control vs Congestion Control.
> > - Bagaimana cara kerja **Sliding Window** di TCP?
> > - Apa itu `LastByteSent` & `LastByteAcked`?
> > - Apa itu `NextByteExpected` & `LastByteRcvd`?
> > - Apa itu _Receive Window_ (`RcvWindow`)?
> > - Bagaimana pengirim menggunakan `RcvWindow`?
> > - Apa itu **Silly Window Syndrome**?
> > - Apa penyebabnya?
> > - Bagaimana **Algoritma Nagle** bekerja?
> > - Jelaskan aturan dalam Algoritma Nagle.
> > 
> > ## Reference Points
> > 
> > - Lecture 7, Slides: 27, 44-49, 57-63
> 
> > ### Kontrol Aliran (Flow Control)
> > 
> > **Kontrol Aliran** adalah sebuah mekanisme yang bertujuan untuk mencegah pengirim mengirimkan data lebih cepat daripada kemampuan penerima untuk memprosesnya. Ini adalah layanan _speed-matching_ yang memastikan buffer di sisi penerima tidak meluap (_overflow_).
> > 
> > **Perbedaan dengan Congestion Control:**
> > 
> > - **Flow Control:** Fokus pada hubungan antara **satu pengirim** dan **satu penerima**. Ini adalah masalah lokal untuk melindungi sumber daya penerima.
> > - **Congestion Control:** Fokus pada pencegahan agar **terlalu banyak data** tidak disuntikkan ke dalam **jaringan** secara keseluruhan, yang dapat menyebabkan router atau link menjadi kelebihan beban. Ini adalah masalah global untuk melindungi sumber daya jaringan.
> > 
> > ### Mekanisme Sliding Window
> > 
> > Algoritma _Sliding Window_ adalah inti dari mekanisme flow control dan pengiriman andal di TCP. Ia memungkinkan pengirim untuk mengirim beberapa segmen sekaligus sebelum harus menunggu _acknowledgment_ (ACK).
> > 
> > - **Variabel Kunci:**
> >     
> >     - **Di Sisi Pengirim:**
> >         - `LastByteAcked`: Byte terakhir yang telah dikonfirmasi oleh penerima.
> >         - `LastByteSent`: Byte terakhir yang telah dikirim oleh pengirim.
> >         - Jumlah data _in-flight_ (terkirim tapi belum di-ACK) adalah `LastByteSent - LastByteAcked`.
> >     - **Di Sisi Penerima:**
> >         - `LastByteRcvd`: Byte terakhir yang telah diterima dari jaringan dan ditempatkan di buffer.
> >         - `LastByteRead`: Byte terakhir yang telah dibaca oleh aplikasi dari buffer.
> > - **Cara Kerja Flow Control:**
> >     
> >     1. Penerima memiliki buffer dengan ukuran tertentu (`RcvBuffer`).
> >     2. Jumlah ruang kosong di buffer ini disebut **Receive Window (`RcvWindow`)**. Nilainya adalah: `RcvWindow = RcvBuffer - (LastByteRcvd - LastByteRead)`.
> >     3. Penerima **mengiklankan (advertises)** nilai `RcvWindow` ini kepada pengirim melalui field _Receive Window_ di setiap segmen ACK yang dikirimkannya.
> >     4. Pengirim menerima nilai `RcvWindow` ini dan harus memastikan bahwa jumlah data _in-flight_-nya tidak pernah melebihi nilai tersebut. (`LastByteSent - LastByteAcked ≤ RcvWindow`).
> > 
> > ### Masalah Kinerja: Silly Window Syndrome
> > 
> > **Silly Window Syndrome** adalah sebuah masalah kinerja yang terjadi ketika data ditransmisikan dalam segmen-segmen yang sangat kecil secara berulang, menyebabkan efisiensi jaringan menurun drastis karena _overhead_ header TCP (minimal 20 byte) jauh lebih besar daripada data yang dibawanya.
> > 
> > **Analogi:** Seperti mengirim surat satu huruf per satu huruf, di mana setiap huruf dimasukkan ke dalam amplop besar yang ongkos kirimnya mahal.
> > 
> > **Penyebab:**
> > 
> > 5. **Pengirim yang Terlalu Cepat:** Aplikasi pengirim menghasilkan data byte demi byte (misalnya, dari ketikan keyboard) dan TCP langsung mengirimnya tanpa menunggu.
> > 6. **Penerima yang Terlalu Lambat:** Aplikasi penerima membaca data dari buffer sangat lambat, sehingga buffer hanya bisa menyediakan ruang kosong yang sangat kecil (misal, 1 byte), dan mengiklankan window kecil ini secara terus-menerus.
> > 
> > ### Solusi: Algoritma Nagle
> > 
> > **Algoritma Nagle** adalah solusi dari sisi pengirim untuk mencegah _Silly Window Syndrome_. Idenya adalah untuk menahan pengiriman data-data kecil dan mengumpulkannya menjadi satu segmen yang lebih besar dan efisien.
> > 
> > Aturan Algoritma Nagle:
> > 
> > Ketika aplikasi menghasilkan data baru untuk dikirim:
> > 
> > 7. **Kirim Segera Jika Besar:** Jika jumlah data yang tersedia dan window yang diiklankan oleh penerima lebih besar atau sama dengan MSS (_Maximum Segment Size_), maka kirim satu segmen penuh sekarang juga.
> > 8. **Tahan Jika Ada Data In-Flight:** Jika tidak, dan jika **masih ada data yang belum di-ACK** (data _in-flight_), maka **tahan** data baru tersebut di buffer. Jangan kirim dulu. Tunggu sampai ACK untuk data sebelumnya tiba.
> > 9. **Kirim Jika Idle:** Jika tidak, dan jika **tidak ada data in-flight**, maka kirim semua data baru yang ada sekarang, meskipun ukurannya kecil. Aturan ini penting untuk menjaga responsivitas aplikasi interaktif seperti Telnet.

> [!cornell] #### Summary
> 
> - **Kontrol Aliran (Flow Control)** TCP menggunakan mekanisme **Sliding Window** untuk mencegah pengirim membanjiri penerima, di mana penerima secara dinamis mengiklankan sisa kapasitas buffernya (`RcvWindow`) kepada pengirim.
> - **Silly Window Syndrome** adalah masalah kinerja di mana segmen-segmen kecil yang tidak efisien dikirimkan secara terus-menerus, sehingga membuang-buang sumber daya jaringan untuk _overhead_ header.
> - **Algoritma Nagle** mengatasi masalah ini dari sisi pengirim dengan cara menahan pengiriman data kecil jika masih ada data lain yang belum di-ACK, untuk mengumpulkannya menjadi segmen yang lebih besar dan efisien.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Dilema Nagle dan Aplikasi Interaktif
> 
> - Meskipun sangat berguna untuk efisiensi, Algoritma Nagle dapat menimbulkan sedikit penundaan (_latency_) karena menahan data. Untuk sebagian besar aplikasi, ini tidak terasa. Namun, untuk aplikasi yang sangat sensitif terhadap latensi seperti _game online multiplayer_ atau beberapa jenis _remote desktop_, penundaan kecil ini bisa mengganggu. Oleh karena itu, _socket API_ menyediakan opsi (`TCP_NODELAY`) bagi para programmer untuk secara eksplisit menonaktifkan Algoritma Nagle untuk koneksi tertentu jika diperlukan.
> 
> #### Perhitungan Effective Window
> 
> - "Jendela" yang benar-benar bisa digunakan oleh pengirim untuk mengirim data baru disebut _Effective Window_. Nilainya dihitung sebagai berikut: `EffectiveWindow = AdvertisedWindow - (LastByteSent - LastByteAcked)`. Ini secara logis berarti "ruang yang diiklankan penerima dikurangi data yang sudah saya kirim tapi belum dikonfirmasi".
> 
> #### Eksplorasi Mandiri
> 
> - Dalam **Wireshark**, field yang sesuai dengan `RcvWindow` adalah `Window size value`. Anda dapat mengamati bagaimana nilainya berubah di setiap ACK yang datang dari penerima. Jika nilainya tiba-tiba menjadi sangat kecil, itu bisa menjadi indikasi bahwa aplikasi di sisi penerima sedang sibuk atau lambat dalam memproses data yang masuk.