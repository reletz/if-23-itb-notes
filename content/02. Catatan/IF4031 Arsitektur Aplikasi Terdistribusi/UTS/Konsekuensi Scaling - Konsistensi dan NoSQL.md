---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Konsekuensi Scaling - Konsistensi dan NoSQL
> 
> > ## Questions/Cues
> > 
> > - Mengapa _sharding_ sulit di RDBMS?
> >     
> > - Apa itu _graph partitioning problem_?
> >     
> > - Bagaimana NoSQL menyelesaikan masalah _sharding_?
> >     
> > - Apa itu **denormalisasi**?
> >     
> > - Apa kekurangan denormalisasi?
> >     
> > - Apa masalah **konsistensi** di sistem terdistribusi?
> >     
> > - Apa itu _Client-Centric Consistency_?
> >     
> > - Apa itu **Monotonic Reads**?
> >     
> > - Apa itu **Read Your Writes**?
> >     
> > - Apa itu **Monotonic Writes**?
> >     
> > 
> > ## Reference Points
> > 
> > - 15-IF4031-13-2022-Database-Konsistensi-Availability.pdf
> >     
> 
> > ### Tantangan Sharding pada Data Ternormalisasi
> > 
> > Dalam RDBMS, data dinormalisasi untuk menghindari duplikasi, menggunakan _foreign key_ untuk menghubungkan data antar tabel. Ketika data ini di-_shard_, hubungan _foreign key_ menjadi _edge_ antar _node_ dalam sebuah graf.
> > 
> > **Graph Partitioning Problem:** Tujuan _sharding_ adalah mempartisi graf data ini sedemikian rupa sehingga jumlah _edge_ (referensi) antar partisi minimal. Masalah ini secara komputasi sangat sulit (NP-complete) dan dalam praktiknya, akses data lintas partisi (`JOIN`) tetap tidak terhindarkan dan menjadi _bottleneck_.
> > 
> > ### Solusi NoSQL: Denormalisasi
> > 
> > Database NoSQL mengambil pendekatan radikal: **hilangkan** _**foreign key**_ **dan `JOIN`**. Sebagai gantinya, mereka menggunakan **denormalisasi**: data yang direferensikan diduplikasi dan disimpan bersama dengan data induk dalam satu dokumen atau baris.
> > 
> > - **Contoh:** Alih-alih menyimpan `region_id` di profil pengguna dan melakukan `JOIN` ke tabel `regions`, profil pengguna di NoSQL akan langsung menyimpan nama region "Greater Seattle Area".
> >     
> > 
> > Dengan denormalisasi, setiap unit data (misal, satu profil pengguna) menjadi independen dan dapat disimpan di satu _shard_ tanpa memerlukan referensi ke _shard_ lain. Ini membuat _partitioning_ menjadi trivial dan sangat skalabel.
> > 
> > **Kekurangan Denormalisasi:**
> > 
> > - **Pemborosan Ruang:** Data menjadi terduplikasi di banyak tempat.
> >     
> > - **Anomali Update:** Jika data yang diduplikasi perlu diubah (misalnya, nama region berubah), perubahan itu harus diterapkan di semua tempat data tersebut muncul, yang lebih kompleks.
> >     
> > 
> > ### Masalah Konsistensi di Sistem Terdistribusi
> > 
> > Ketika data direplikasi dan dipartisi, akan ada jeda waktu (_delay_) hingga perubahan data disebarkan ke semua replika. Hal ini menciptakan kemungkinan **inkonsistensi sementara**, di mana klien dapat membaca data yang usang (_stale data_).
> > 
> > ### Model Konsistensi Berpusat pada Klien (_Client-Centric_)
> > 
> > Model ini tidak menjamin konsistensi global, tetapi memberikan jaminan tertentu dari sudut pandang **satu klien tunggal** untuk memberikan pengalaman pengguna yang masuk akal.
> > 
> > **1. Monotonic Reads**
> > 
> > - **Jaminan:** Jika seorang klien membaca sebuah nilai, setiap pembacaan berikutnya oleh klien yang **sama** akan selalu mengembalikan nilai yang sama atau yang lebih baru.
> >     
> > - **Mencegah:** Pengguna melihat suatu data (misal, komentar postingan), lalu me-_refresh_ halaman dan data tersebut "menghilang" sementara.
> >     
> > 
> > **2. Read Your Writes**
> > 
> > - **Jaminan:** Setelah seorang klien menulis sebuah nilai, setiap pembacaan berikutnya oleh klien yang **sama** akan selalu melihat nilai yang baru saja ia tulis (atau yang lebih baru).
> >     
> > - **Mencegah:** Pengguna memposting komentar, me-_refresh_ halaman, dan tidak melihat komentarnya sendiri.
> >     
> > 
> > **3. Monotonic Writes**
> > 
> > - **Jaminan:** Jika seorang klien melakukan beberapa penulisan secara berurutan, sistem akan memprosesnya dalam urutan yang sama.
> >     
> > - **Mencegah:** Pengguna mengedit postingan lalu menghapusnya, tetapi karena _network delay_, sistem malah memproses penghapusan terlebih dahulu lalu editan, menyebabkan postingan "muncul kembali".
> >     
> > 
> > **Penyebab Kegagalan:** Semua properti ini bisa gagal jika klien pada permintaan yang berbeda dilayani oleh replika yang berbeda, di mana salah satu replika belum menerima pembaruan terbaru.

> [!cornell] #### Summary
> 
> _**Sharding**_ **pada RDBMS menjadi sulit karena data yang ternormalisasi menciptakan banyak dependensi lintas** _**shard**_**. NoSQL mengatasi ini dengan **denormalisasi**, yaitu menduplikasi data untuk membuat setiap unit data independen, sehingga mudah dipartisi. Namun, pendekatan terdistribusi ini menimbulkan masalah **konsistensi**. Untuk mengatasinya, model konsistensi berpusat pada klien seperti** _**Monotonic Reads**_**,** _**Read Your Writes**_**, dan** _**Monotonic Writes**_ **memberikan jaminan perilaku yang dapat diprediksi dari perspektif pengguna tunggal, meskipun konsistensi global belum tercapai.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Bagaimana Jaminan Konsistensi Diterapkan?
> 
> Untuk mencapai jaminan _client-centric_, sistem terdistribusi sering menggunakan beberapa teknik:
> 
> - **Sticky Sessions (Client Affinity):** _Load balancer_ atau _router_ aplikasi dapat dikonfigurasi untuk selalu mengarahkan permintaan dari klien yang sama ke _node_ atau replika yang sama. Ini adalah cara paling sederhana untuk menjamin _Monotonic Reads_ dan _Read Your Writes_, karena klien akan selalu "berbicara" dengan _database_ yang sama yang memiliki data terbarunya (dari perspektif klien tersebut).
>     
> - **Membaca dari Quorum:** Untuk _Read Your Writes_, klien dapat menunggu hingga penulisan dikonfirmasi oleh sejumlah replika (W) dan kemudian melakukan pembacaan dari sejumlah replika (R) di mana W + R > N (N adalah jumlah total replika). Ini memastikan bahwa setidaknya ada satu replika yang tumpang tindih antara set penulisan dan pembacaan, sehingga klien pasti akan melihat tulisannya sendiri.
>     
> - **Vector Clocks:** Untuk _Monotonic Writes_ dan deteksi konflik yang lebih canggih, setiap data dapat diberi stempel versi (_vector clock_) yang melacak riwayat perubahannya di berbagai replika. Ini memungkinkan sistem untuk memahami urutan kausal dari berbagai peristiwa.
>     
> 
> #### Eksplorasi: Denormalisasi pada E-commerce
> 
> Bayangkan data pesanan (_order_) di situs e-commerce.
> 
> - **Model Normalisasi (SQL):** Tabel `orders` akan memiliki `product_id` dan `user_id`. Untuk menampilkan detail pesanan, Anda perlu melakukan `JOIN` ke tabel `products` untuk mendapatkan nama dan harga produk, dan ke tabel `users` untuk mendapatkan alamat pengiriman.
>     
> - **Model Denormalisasi (NoSQL):** Dokumen `order` akan menyimpan salinan lengkap dari informasi produk (nama, harga saat dibeli) dan alamat pengiriman pengguna.
>     
> - **Pertimbangkan:** Apa yang terjadi jika harga produk berubah setelah pesanan dibuat? Dalam model normalisasi, `JOIN` akan mengambil harga baru yang salah. Dalam model denormalisasi, harga historis yang benar sudah tersimpan di dalam pesanan itu sendiri. Ini adalah contoh di mana denormalisasi tidak hanya untuk performa, tetapi juga untuk kebenaran data historis.
>