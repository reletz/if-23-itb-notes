---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Mekanisme Scaling Database - Replikasi dan Partisi
> 
> > ## Questions/Cues
> > 
> > - Mengapa DB sering jadi _bottleneck_?
> >     
> > - Apa peran RAM dan _caching_?
> >     
> > - Apa itu _horizontal scaling_?
> >     
> > - Bagaimana cara kerja **Read Replica**?
> >     
> > - Apa kelebihan & kekurangan _read replica_?
> >     
> > - Apa itu **Partitioning / Sharding**?
> >     
> > - Apa itu _functional vs data partitioning_?
> >     
> > - Apa kelebihan & kekurangan _sharding_?
> >     
> > 
> > ## Reference Points
> > 
> > - 14-IF4031-12-2022-Database-Storage.pdf
> >     
> 
> > ### Database sebagai Bottleneck
> > 
> > Dalam arsitektur aplikasi web modern, komponen aplikasi (_app clones_) dapat dengan mudah di-_scale out_ (ditambah jumlahnya) di belakang _load balancer_. Namun, semua klon tersebut biasanya berbagi satu _database_ pusat. _Database_ ini menjadi titik pusat untuk **shared state dan koordinasi**, sehingga sering menjadi _bottleneck_ performa.
> > 
> > Kinerja _database_ sangat bergantung pada kemampuannya untuk menyimpan data yang sering diakses (_hot data_) dan indeks di dalam **RAM (cache)**, karena akses RAM ribuan kali lebih cepat daripada akses disk (SSD/HDD).
> > 
> > ### Strategi Scaling Database (Horizontal Scaling)
> > 
> > Untuk mengatasi keterbatasan satu mesin, digunakan teknik _horizontal scaling_:
> > 
> > **1. Read Replica (Replikasi Baca)**
> > 
> > - **Konsep:** Membuat beberapa salinan lengkap dari _database_ utama. Semua operasi tulis (`INSERT`, `UPDATE`, `DELETE`) tetap dikirim ke _database_ **Primary**, yang kemudian secara asinkron menyalin perubahan tersebut ke semua **Replica**. Operasi baca (`SELECT`) disebar ke banyak _replica_ untuk mengurangi beban.
> >     
> > - **Kelebihan:**
> >     
> >     - Sangat efektif untuk _workload_ yang dominan baca (_read-heavy_), yang merupakan kasus umum (>95% trafik).
> >         
> >     - Mudah diimplementasikan.
> >         
> > - **Kekurangan:**
> >     
> >     - **Write tidak scalable:** Semua operasi tulis masih terpusat di satu _Primary DB_.
> >         
> >     - **Kapasitas tidak scalable:** Setiap _replica_ harus menyimpan salinan lengkap dari seluruh data.
> >         
> >     - **Primary menjadi Single Point of Failure.**
> >         
> >     - **Consistency Lag:** Data di _replica_ bisa sedikit tertinggal (_stale_) karena replikasi bersifat asinkron.
> >         
> > 
> > **2. Partitioning / Sharding**
> > 
> > - **Konsep:** Memecah data secara horizontal menjadi beberapa bagian yang lebih kecil dan independen yang disebut **shard**. Setiap _shard_ disimpan di _node database_ yang terpisah.
> >     
> > - **Jenis Partisi:**
> >     
> >     - **Functional Partitioning:** Memisahkan _database_ berdasarkan fungsi bisnis (misal: DB Pengguna, DB Produk, DB Pesanan). Kurang skalabel.
> >         
> >     - **Data Partitioning (Sharding):** Membagi baris-baris dari sebuah tabel besar berdasarkan sebuah **sharding key** (misal: data pengguna dibagi berdasarkan region atau _hash_ dari `user_id`).
> >         
> > - **Kelebihan:**
> >     
> >     - **Capacity & Write Scalable:** Kapasitas total adalah jumlah dari semua _shard_, dan operasi tulis dapat didistribusikan ke _shard_ yang relevan, menghilangkan _bottleneck_ terpusat.
> >         
> > - **Kekurangan:**
> >     
> >     - **Kompleksitas Aplikasi:** Aplikasi harus tahu ke _shard_ mana sebuah kueri harus diarahkan. SQL biasa tidak bisa langsung digunakan.
> >         
> >     - **Cross-Shard Queries:** Kueri yang membutuhkan data dari beberapa _shard_ sekaligus (misalnya `JOIN`) menjadi sangat lambat dan kompleks.
> >         
> >     - **Hot Spots:** Jika _sharding key_ tidak dipilih dengan baik, beberapa _shard_ bisa menjadi jauh lebih sibuk daripada yang lain.
> >         

> [!cornell] #### Summary
> 
> **Database sering menjadi** _**bottleneck**_ **karena perannya sebagai** _**shared state**_ **terpusat. Untuk mengatasinya, digunakan** _**horizontal scaling**_ **melalui dua teknik utama:** _**Read Replica**_**, yang mendistribusikan beban baca ke banyak salinan database, efektif untuk aplikasi** _**read-heavy**_ **namun tidak menyelesaikan masalah** _**write**_**; dan** _**Sharding**_**, yang mempartisi data ke beberapa** _**node**_ **untuk meningkatkan skalabilitas kapasitas dan** _**write**_**, namun dengan mengorbankan kompleksitas pada level aplikasi dan kueri lintas-**_**shard**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Hierarki Read Replica
> 
> Untuk mengurangi beban replikasi pada _Primary DB_ jika jumlah _replica_ sangat banyak, _replica_ dapat disusun secara hierarkis. _Primary_ hanya mereplikasi ke beberapa _Middle Replica_, dan kemudian _Middle Replica_ inilah yang bertanggung jawab untuk mereplikasi data ke _replica-replica_ di bawahnya. Ini menciptakan pohon replikasi yang mendistribusikan beban.
> 
> #### Pemilihan Sharding Key
> 
> Memilih _sharding key_ yang baik adalah seni dan ilmu. Kunci yang buruk dapat menyebabkan "hot shards" (satu shard menerima sebagian besar trafik) dan membuat keuntungan dari _sharding_ menjadi sia-sia. Dua pendekatan umum adalah:
> 
> 1. **Range-based Sharding:** Mempartisi data berdasarkan rentang nilai (misal, A-D di shard 1, E-H di shard 2). Mudah, tetapi bisa menyebabkan _hot spot_ jika data tidak terdistribusi merata (misal, lebih banyak pengguna dengan nama awalan 'S').
>     
> 2. **Hash-based Sharding:** Mempartisi data berdasarkan nilai _hash_ dari _sharding key_. Ini mendistribusikan data secara lebih acak dan merata, tetapi menghilangkan kemampuan untuk melakukan kueri rentang (_range query_) yang efisien.
>     
> 
> #### Implementasi Sharding
> 
> Karena kebanyakan RDBMS tradisional tidak mendukung _sharding_ secara _native_, pengembang sering kali mengandalkannya pada:
> 
> - **Level Aplikasi:** Logika untuk menentukan _shard_ mana yang akan dihubungi ditulis langsung di dalam kode aplikasi. Ini paling fleksibel tetapi paling rumit untuk dikelola.
>     
> - **Proxy SQL:** Menggunakan _proxy_ di antara aplikasi dan _database_ (seperti Vitess atau ProxySQL) yang memahami skema _sharding_ dan secara otomatis merutekan kueri ke _shard_ yang benar. Ini menyembunyikan kompleksitas dari aplikasi.
>