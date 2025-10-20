---
type: Note
cssclasses:
- cornell-notes
---


_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Dari Model Relasional ke Dokumen
> 
> > ## Questions/Cues
> > 
> > - Bagaimana DB Relasional melakukan scaling?
> >     
> > - Apa itu _scale up_ vs _scale out_?
> >     
> > - Apa itu _partitioning_?
> >     
> > - Apa tantangan _partitioning_?
> >     
> > - Bagaimana data relasional direpresentasikan?
> >     
> > - Apa itu model Dokumen (JSON)?
> >     
> > - Apa kelebihan model Dokumen?
> >     
> > - Kapan memilih Relasional vs Dokumen?
> >     
> > 
> > ## Reference Points
> > 
> > - 12-IF4031-XX-DataModel.pdf (hlm. 2-12)
> >     
> 
> > ### Skalabilitas Database Relasional
> > 
> > Database relasional (RDBMS) dirancang untuk berjalan pada satu _node_. Skalabilitasnya dapat dicapai melalui dua cara utama:
> > 
> > 1. **Scale Up (Vertical Scaling):** Menambah kekuatan pada satu server dengan meningkatkan spesifikasinya (lebih banyak CPU, RAM, _storage_). 
> > 2. **Scale Out (Horizontal Scaling):** Mendistribusikan beban kerja ke beberapa server.
> >     
> >     - _**Read Replicas:**_ Membuat salinan _database_ hanya untuk dibaca (_read-only_). Kueri `SELECT` dialihkan ke replika ini, mengurangi beban pada _database_ utama (Primary). Kelemahannya adalah data di replika bisa sedikit tertinggal (_stale data_) karena replikasi biasanya bersifat asinkron.
> >         
> >     - _**Partitioning (Sharding):**_ Memecah sebuah tabel besar menjadi beberapa partisi fisik yang lebih kecil, yang dapat disimpan di _node_ yang berbeda.
> >         
> > 
> > **Jenis Partitioning:**
> > 
> > - **Horizontal:** Membagi baris-baris tabel (misalnya, data pelanggan dibagi berdasarkan wilayah).
> >     
> > - **Vertical:** Membagi kolom-kolom tabel (misalnya, data produk yang jarang berubah dipisah dari data stok yang sering berubah).
> >     
> > 
> > **Tantangan Partitioning:** Kueri yang membutuhkan `JOIN` antar partisi yang berbeda menjadi sangat mahal karena memerlukan banyak lalu lintas jaringan dan koordinasi antar _node_.
> > 
> > ### Model Relasional vs. Model Dokumen
> > 
> > **Model Relasional (Normalisasi)**
> > 
> > Dalam RDBMS, data dipecah-pecah menjadi banyak tabel kecil untuk mengurangi redundansi (proses normalisasi). Misalnya, profil pengguna dipecah menjadi tabel users, positions, education, dll. Untuk mendapatkan profil lengkap, diperlukan beberapa JOIN.
> > 
> > **Model Dokumen (JSON)**
> > 
> > Model ini merepresentasikan data dalam format dokumen yang memiliki struktur hirarkis (seperti JSON), mirip dengan objek dalam kode aplikasi. Seluruh informasi yang berhubungan (seperti profil lengkap pengguna) disimpan dalam satu dokumen tunggal.
> > 
> > **Kelebihan Model Dokumen:**
> > 
> > - **Lokalitas Data (**_**Data Locality**_**):** Karena semua data yang relevan ada dalam satu dokumen, tidak diperlukan `JOIN`. Mengambil satu profil pengguna hanya memerlukan satu kali baca dari _database_, yang membuatnya sangat cepat dan efisien.
> >     
> > - **Kesesuaian dengan Aplikasi:** Struktur JSON sangat cocok dengan model objek yang digunakan di banyak bahasa pemrograman, mempermudah pekerjaan pengembang.
> >     
> > - **Fleksibilitas Skema:** _Database_ dokumen sering kali _schemaless_, artinya tidak semua dokumen dalam satu koleksi harus memiliki struktur yang sama persis.
> >     
> > 
> > ### Kapan Memilih Salah Satunya?
> > 
> > - Gunakan **Model Relasional** jika aplikasi Anda memiliki banyak hubungan _many-to-many_ dan memerlukan konsistensi data yang kuat (ACID).
> >     
> > - Gunakan **Model Dokumen** jika data Anda secara alami memiliki struktur seperti dokumen atau pohon (hubungan _one-to-many_), dan aplikasi Anda sering membaca/menulis seluruh unit data secara bersamaan (misalnya, profil pengguna, postingan blog, katalog produk).
> >     

> [!cornell] #### Summary
> 
> **Database relasional melakukan scaling melalui** _**scale up**_ **(memperbesar server) atau** _**scale out**_ **(menggunakan** _**read replicas**_ **dan** _**partitioning**_**), namun menghadapi tantangan pada operasi `JOIN` terdistribusi. Sebagai alternatif, model Dokumen (seperti JSON) menawarkan performa lebih baik untuk kasus penggunaan tertentu dengan menyimpan semua data terkait dalam satu unit tunggal, menghilangkan kebutuhan `JOIN` dan meningkatkan lokalitas data, sehingga sangat cocok untuk aplikasi dengan data berstruktur hirarkis.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Embedding vs. Referencing
> 
> Dalam model dokumen, Anda memiliki dua pilihan utama untuk menangani hubungan data:
> 
> 1. **Embedding (Menanamkan):** Ini adalah pendekatan _default_ di mana Anda menempatkan data terkait langsung di dalam dokumen induk. Ini sangat ideal untuk hubungan _one-to-one_ atau _one-to-many_ di mana data anak tidak memiliki eksistensi di luar induknya (misalnya, daftar alamat untuk seorang pengguna). Inilah yang memberikan keuntungan _data locality_.
>     
> 2. **Referencing (Mereferensikan):** Mirip dengan _foreign key_ di RDBMS, Anda hanya menyimpan ID dari dokumen lain di dalam dokumen induk. Anda kemudian perlu melakukan kueri kedua (disebut _application-level join_) untuk mengambil data yang direferensikan. Pendekatan ini digunakan untuk hubungan _many-to-many_ atau ketika data yang direferensikan sering diperbarui dan perlu konsisten di banyak tempat (misalnya, profil penulis yang direferensikan oleh banyak artikel).
>     
> 
> Memilih antara _embedding_ dan _referencing_ adalah salah satu keputusan desain paling penting dalam model dokumen, yang menyeimbangkan antara performa baca dan kemudahan pembaruan.
> 
> #### Eksplorasi Mandiri
> 
> Coba modelkan sebuah "Playlist Lagu" sederhana.
> 
> - **Versi Relasional:** Anda mungkin butuh tabel `playlists` (`id`, `name`), tabel `songs` (`id`, `title`, `artist_id`), tabel `artists` (`id`, `name`), dan sebuah tabel penghubung `playlist_songs` (`playlist_id`, `song_id`).
>     
> - **Versi Dokumen:** Anda bisa membuat satu dokumen _playlist_ yang berisi _array_ dari objek-objek lagu. Pertimbangkan: apakah informasi artis harus di-_embed_ di setiap lagu, atau direferensikan dengan `artist_id`? Apa _trade-off_-nya?
>