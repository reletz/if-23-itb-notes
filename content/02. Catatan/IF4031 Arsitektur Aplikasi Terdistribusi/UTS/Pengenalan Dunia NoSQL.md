---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Pengenalan Dunia NoSQL
> 
> > ## Questions/Cues
> > 
> > - Apa itu NoSQL?
> >     
> > - Apa tujuan utama NoSQL?
> >     
> > - Apa itu Teorema CAP? (Implisit)
> >     
> > - Apa beda **ACID** vs **BASE**?
> >     
> > - Apa strategi utama NoSQL?
> >     
> > - Apa itu _denormalization_?
> >     
> > - Apa saja 4 jenis utama DB NoSQL?
> >     
> > - Apa contoh masing-masing?
> >     
> > 
> > ## Reference Points
> > 
> > - 12-IF4031-XX-DataModel.pdf (hlm. 21-44)
> >     
> 
> > ### Apa itu NoSQL?
> > 
> > **NoSQL** ("Not Only SQL") adalah istilah umum untuk _database_ yang dirancang untuk model data spesifik dan skema yang fleksibel, berbeda dengan model relasional tabel yang kaku. Tujuannya bukan untuk menggantikan RDBMS, melainkan menyediakan solusi alternatif untuk kasus penggunaan di mana RDBMS tidak cocok, terutama untuk skala besar, _throughput_ tinggi, dan data tidak terstruktur.
> > 
> > ### Tujuan dan Filosofi NoSQL: BASE vs. ACID
> > 
> > **RDBMS Tradisional (ACID):**
> > 
> > Mengutamakan Konsistensi. Transaksi harus mematuhi properti ACID:
> > 
> > - **Atomicity:** Semua operasi dalam transaksi berhasil, atau tidak sama sekali.
> >     
> > - **Consistency:** Transaksi membawa _database_ dari satu _state_ valid ke _state_ valid lainnya.
> >     
> > - **Isolation:** Transaksi yang berjalan bersamaan tidak saling mengganggu.
> >     
> > - **Durability:** Setelah transaksi berhasil, perubahannya permanen.
> >     
> > 
> > **Database NoSQL (BASE):**
> > 
> > Mengutamakan Ketersediaan (Availability). Berdasarkan Teorema CAP (Consistency, Availability, Partition Tolerance), sistem terdistribusi hanya dapat menjamin dua dari tiga properti. NoSQL sering kali mengorbankan konsistensi kuat untuk ketersediaan dan toleransi partisi.
> > 
> > - **Basically Available:** Sistem menjamin ketersediaan.
> >     
> > - **Soft State:** _State_ sistem dapat berubah seiring waktu, bahkan tanpa input.
> >     
> > - **Eventual Consistency:** Sistem pada akhirnya akan mencapai konsistensi setelah tidak ada input baru yang masuk. Mungkin ada periode singkat di mana data yang dibaca tidak konsisten.
> >     
> > 
> > - **Strategi Denormalisasi:** Berbeda dengan RDBMS yang melakukan normalisasi (memecah data untuk mengurangi redundansi), NoSQL sering kali menggunakan denormalisasi. Data yang terkait digandakan dan disimpan bersama untuk mempercepat kueri baca, dengan mengorbankan kompleksitas saat melakukan pembaruan data.
> > 
> > ### Klasifikasi Database NoSQL
> > 
> > **1. Key-Value Store**
> > 
> > - **Konsep:** Paling sederhana. Menyimpan data sebagai koleksi pasangan kunci-nilai, mirip _hash map_ atau kamus.
> >     
> > - **Kelebihan:** Sangat cepat untuk operasi baca/tulis berdasarkan kunci.
> >     
> > - **Contoh:** **Redis**, Memcached, Riak.
> >     
> > 
> > **2. Document Store**
> > 
> > - **Konsep:** Menyimpan data dalam format dokumen (JSON, BSON, XML). Setiap dokumen memiliki struktur internal sendiri dan dapat dikueri berdasarkan kontennya.
> >     
> > - **Kelebihan:** Fleksibel, intuitif untuk pengembang.
> >     
> > - **Contoh:** **MongoDB**, CouchDB.
> >     
> > 
> > **3. Wide-Column (or Column-Family) Store**
> > 
> > - **Konsep:** Menyimpan data dalam tabel yang terdiri dari baris dan kolom, tetapi baris yang berbeda dapat memiliki kolom yang berbeda pula. Data dioptimalkan untuk akses per kolom.
> >     
> > - **Kelebihan:** Sangat skalabel untuk menangani data dalam jumlah masif (petabytes).
> >     
> > - **Contoh:** **Cassandra**, HBase, Google Bigtable.
> >     
> > 
> > **4. Graph Database**
> > 
> > - **Konsep:** Didesain khusus untuk menyimpan dan menavigasi hubungan antar data. Menggunakan model _node_ dan _edge_.
> >     
> > - **Kelebihan:** Sangat efisien untuk kueri yang melibatkan penelusuran hubungan yang kompleks.
> >     
> > - **Contoh:** **Neo4j**, Amazon Neptune.
> >     

> [!cornell] #### Summary
> 
> **NoSQL merujuk pada kelas database yang menawarkan alternatif dari model relasional, dengan mengutamakan skalabilitas dan fleksibilitas skema. Berbeda dengan RDBMS yang berprinsip ACID (mengutamakan konsistensi), banyak sistem NoSQL menganut prinsip BASE (mengutamakan ketersediaan) dan menggunakan denormalisasi untuk optimasi baca. Empat kategori utama NoSQL adalah Key-Value Store (untuk kecepatan), Document Store (untuk fleksibilitas), Wide-Column Store (untuk skala masif), dan Graph Database (untuk hubungan kompleks).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Teorema CAP
> 
> Teorema CAP, atau Teorema Brewer, adalah fondasi teoritis di balik banyak pilihan desain sistem terdistribusi, termasuk NoSQL. Teorema ini menyatakan bahwa dari tiga jaminan berikut, sebuah sistem terdistribusi hanya dapat menyediakan dua di antaranya secara bersamaan:
> 
> 1. **Consistency (C):** Setiap operasi baca menerima data tulis terbaru atau sebuah error. Semua node melihat data yang sama pada saat yang bersamaan.
>     
> 2. **Availability (A):** Setiap permintaan menerima respons (bukan error), tanpa jaminan bahwa respons tersebut berisi data tulis terbaru. Sistem selalu aktif.
>     
> 3. **Partition Tolerance (P):** Sistem terus beroperasi meskipun terjadi _network partition_ (kegagalan komunikasi) antara _node-node_.
>     
> 
> Dalam praktiknya, _Partition Tolerance_ (P) adalah suatu keharusan yang tidak bisa dikompromikan untuk sistem terdistribusi. Oleh karena itu, pilihannya adalah antara **CP** (Konsistensi dan Toleransi Partisi) dan **AP** (Ketersediaan dan Toleransi Partisi).
> 
> - **Sistem CP (misalnya, beberapa RDBMS terdistribusi):** Akan memilih untuk mengembalikan _error_ atau berhenti merespons jika tidak dapat menjamin konsistensi saat terjadi partisi jaringan.
>     
> - **Sistem AP (misalnya, Cassandra, Riak):** Akan memilih untuk tetap merespons (tetap _available_), meskipun data yang dikembalikan mungkin usang (_stale_). Inilah inti dari filosofi **BASE**.
>