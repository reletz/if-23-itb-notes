---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Arsitektur, Prinsip Desain, dan Skalabilitas ST
> 
> > ## Questions/Cues
> > 
> > - Mengapa kita butuh ST?
> >     
> > - Apa itu Inherent Distribution?
> >     
> > - Apa itu Distribusi sebagai Artifak?
> >     
> > - Apa tantangan utama (kesulitan) ST?
> >     
> > - Apa itu Middleware?
> >     
> > - Apa 4 goals utama desain ST?
> >     
> > - Apa itu Distribution Transparency?
> >     
> > - Sebutkan jenis-jenis transparansi!
> >     
> > - Apa itu Openness?
> >     
> > - Apa itu Scalability (Skalabilitas)?
> >     
> > - Apa 3 dimensi Skalabilitas?
> >     
> > - Apa saja teknik skalabilitas?
> >     
> > - Teknik: Hiding Latency?
> >     
> > - Teknik: Distribution?
> >     
> > - Teknik: Replication/Caching?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 23-33
> >     
> 
> > ### Mengapa Membangun Sistem Terdistribusi?
> > 
> > Ada dua alasan utama:
> > 
> > 1. **Inherent Distribution (Distribusi Alami):** Aplikasinya secara alami memang membutuhkan penyebaran informasi atau pembagian sumber daya antar entitas yang tersebar secara geografis.
> >     
> >     - Contoh: ATM (bank di lokasi beda-beda), sistem reservasi tiket, World Wide Web (WWW), game online.
> >         
> > 2. **Distribusi sebagai Artifak (Alat):** Distribusi digunakan sebagai "alat" untuk solusi masalah tertentu, meskipun masalahnya sendiri awalnya tidak terdistribusi.
> >     
> >     - Contoh: _Replicated servers_ (server yang digandakan) digunakan untuk mencapai **fault tolerance** (jika satu server mati, yang lain mengambil alih) atau untuk **meningkatkan performance/cost ratio** dan **QoS** (Quality of Service).
> >         
> > 
> > ### Tantangan Utama (Mengapa Sulit?)
> > 
> > Tiga hal utama yang membuat sistem terdistribusi sulit dirancang:
> > 
> > 1. **Konkurensi:** Banyak hal terjadi bersamaan. Perlu penanganan khusus untuk akses bersama ke sumber daya (data, file) agar tetap konsisten.
> >     
> > 2. **Sinkronisasi:** Karena tidak ada _global clock_, mengoordinasikan waktu dan urutan kejadian antar komputer yang berbeda itu sangat sulit.
> >     
> > 3. **Failures:** Komponen (komputer, jaringan) bisa gagal kapan saja secara independen. Sistem harus bisa mendeteksi dan pulih dari kegagalan ini.
> >     
> > 
> > ### Arsitektur: Middleware
> > 
> > - Banyak sistem terdistribusi modern menggunakan lapisan (layer) perangkat lunak yang disebut **Middleware**.
> >     
> > - Posisinya berada di antara Local OS (Sistem Operasi lokal di tiap komputer) dan Aplikasi.
> >     
> > - Tujuannya adalah untuk **menyembunyikan kompleksitas** dan heterogenitas (perbedaan) dari sistem terdistribusi. Middleware menyediakan tampilan yang seragam dan konsisten bagi aplikasi, seolah-olah semuanya berjalan di satu mesin.
> >     
> > - Contoh arsitektur modern adalah **Kubernetes Cluster**, yang mengabstraksi _Control Plane_ (manajemen) dan _Compute Machines_ (tempat aplikasi/container berjalan).
> >     
> > 
> > ### Goals (Tujuan) Desain Sistem Terdistribusi
> > 
> > Ada empat tujuan utama saat mendesain ST:
> > 
> > 1. **Making resources available** (Membuat sumber daya tersedia/dapat diakses)
> >     
> > 2. **Distribution Transparency** (Transparansi Distribusi)
> >     
> > 3. **Openness** (Keterbukaan)
> >     
> > 4. **Scalability** (Skalabilitas)
> >     
> > 
> > ### Desain Goal: Distribution Transparency
> > 
> > **Tujuan:** Menyembunyikan fakta bahwa proses dan sumber daya sebenarnya tersebar di banyak komputer. Sistem harus terlihat _satu_ dan _utuh_ bagi pengguna.
> >     
> > |Jenis-jenis Transparansi|Detail|
> > |---|---|
> > |**Access**|Menyembunyikan perbedaan representasi data dan cara pemanggilan (misal: beda OS, beda bahasa)|
> > |**Location**|Menyembunyikan _di mana_ sebuah objek (data/layanan) berada|
> > |**Migration**|Menyembunyikan fakta bahwa sistem bisa memindahkan objek ke lokasi lain _saat sedang digunakan_|
> > |**Relocation**|Mirip migration, tapi menyembunyikan dari _client_ bahwa lokasi objek telah berubah|
> > |**Replication**|Menyembunyikan fakta bahwa sebuah data/layanan _digandakan_ (direplikasi) di banyak lokasi|
> > |**Concurrency**|Menyembunyikan fakta bahwa banyak pengguna lain mungkin sedang mengakses objek yang sama secara bersamaan|
> > |**Failure**|Menyembunyikan kegagalan dan proses pemulihan (recovery) dari sebuah objek|
> >         
> > **Peringatan:** Transparansi penuh itu _berlebihan_ dan seringkali _tidak mungkin_ (misal: menyembunyikan kegagalan total) dan bisa _mengorbankan kinerja_.
> >     
> > 
> > ### Desain Goal: Openness (Keterbukaan)
> > 
> > - **Tujuan:** Sistem harus _conform_ (patuh) pada _interface_ (antarmuka) yang terdefinisi dengan baik.
> >     
> > - Ini memungkinkan sistem untuk:
> >     
> >     - **Portability:** Mudah dipindahkan.
> >         
> >     - **Interoperability:** Mudah dihubungkan/berinteraksi dengan sistem lain.
> >         
> > - Intinya adalah membuat sistem independen terhadap **heterogenitas** (perbedaan) _hardware_, _platform_ (OS), dan _bahasa_ pemrograman.
> >     
> > 
> > ### Desain Goal: Scalability (Skalabilitas)
> > 
> > - **Tujuan:** Sistem harus tetap efisien dan berkinerja baik meskipun terjadi peningkatan beban yang signifikan.
> >     
> > - **Tiga Dimensi Skalabilitas:**
> >     
> >     1. **Size Scalability:** Kemampuan menangani penambahan jumlah pengguna atau proses.
> >         
> >     2. **Geographical Scalability:** Kemampuan untuk tetap berfungsi baik meskipun jarak maksimal antar node sangat jauh (misalnya, antar benua).
> >         
> >     3. **Administrative Scalability:** Kemampuan untuk tetap mudah dikelola meskipun berada di bawah banyak domain administratif yang berbeda (misal: beda perusahaan, beda departemen).
> >         
> > 
> > ### Teknik-Teknik Skalabilitas
> > 
> > 1. **Hide Communication Latency (Menyembunyikan Latensi):**
> >     
> >     - Gunakan **komunikasi asinkron**. Pengirim tidak perlu menunggu balasan dan bisa lanjut bekerja.
> >         
> >     - Gunakan _handler_ terpisah untuk memproses balasan yang datang nanti.
> >         
> > 2. **Distribution (Distribusi):**
> >     
> >     - **Partisi data dan komputasi:** Pecah data dan pekerjaan ke banyak mesin.
> >         
> >     - Pindahkan komputasi ke _client_ (misal: JavaScript di browser, applet).
> >         
> >     - Contoh data terdesentralisasi: DNS (Domain Name System).
> >         
> > 3. **Replication / Caching (Replikasi / Caching):**
> >     
> >     - Gandakan data/layanan di banyak lokasi (_replicated file servers_).
> >         
> >     - Gunakan _cache_ untuk menyimpan salinan data yang sering diakses lebih dekat ke pengguna (_web cache_, _file cache_).
> >         

> [!cornell] #### Summary
> 
> **Sistem terdistribusi dibangun karena kebutuhan alami (**_**inherent**_**) atau sebagai alat (**_**artifact**_**) untuk mencapai** _**fault tolerance**_ **dan kinerja, namun memiliki tantangan** _**konkurensi**_**,** _**sinkronisasi**_**, dan** _**failure**_**. Arsitektur modern seperti** _**middleware**_ **bertujuan untuk mencapai** _**Openness**_ **(keterbukaan/interoperabilitas) dan** _**Distribution Transparency**_ **(menyembunyikan kompleksitas). Tujuan utamanya adalah** _**Scalability**_**, yang dicapai melalui tiga teknik utama:** _**hiding latency**_ **(komunikasi asinkron),** _**distribution**_ **(partisi data), dan** _**replication/caching**_ **(menggandakan data).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Masalah Konsistensi Replikasi
> 
> Teknik _Replication/Caching_ adalah kunci skalabilitas, namun ia memunculkan masalah baru: **Bagaimana menjaga agar semua salinan (replika) tetap konsisten?**
> 
> Ini melahirkan konsep **Consistency Models** (Model Konsistensi):
> 
> - **Strong Consistency (Konsistensi Kuat):**
>     
>     - Juga dikenal sebagai **Linearizability**.
>         
>     - Menjamin bahwa setiap operasi (baca/tulis) terlihat terjadi _seketika_ (instan). Begitu sebuah data ditulis, semua pembaca _di mana pun_ akan melihat data baru tersebut.
>         
>     - **Kelebihan:** Sangat mudah dipahami oleh programmer (seperti bekerja di satu mesin).
>         
>     - **Kekurangan:** Sangat lambat dan mahal. Membutuhkan banyak komunikasi antar node untuk berkoordinasi (sering menggunakan algoritma konsensus seperti Paxos/Raft).
>         
> - **Eventual Consistency (Konsistensi Pada Akhirnya):**
>     
>     - Asumsi yang _lemah_. Sistem menjamin bahwa _jika tidak ada update baru_, semua replika _pada akhirnya_ (eventually) akan memiliki nilai yang sama.
>         
>     - Ini memperbolehkan adanya periode di mana replika berbeda-beda (stale read).
>         
>     - **Kelebihan:** Sangat cepat (operasi tulis bisa langsung dibalas) dan sangat _available_ (bisa tetap beroperasi saat jaringan terpartisi).
>         
>     - **Kekurangan:** Sulit dipahami oleh programmer. Aplikasi harus bisa menangani data yang mungkin kedaluwarsa atau konflik (misal: dua orang mengedit data yang sama di dua replika berbeda $\rightarrow$ _conflict resolution_).
>         
>     - **Contoh:** DNS, Amazon DynamoDB, Cassandra.
>         
> 
> #### Pendalaman: Pola Partisi Data (Sharding)
> 
> Teknik _Distribution (partisi data)_ sering disebut **Sharding**. Ini adalah teknik memecah database besar menjadi potongan-potongan kecil (shard) yang disimpan di server berbeda.
> 
> - **Tujuan:** _Horizontal Scaling_ untuk database.
>     
> - **Strategi Sharding:**
>     
>     1. **Range-Based Sharding:** Data dipartisi berdasarkan _range_ dari _shard key_.
>         
>         - Contoh: Shard A (User ID 1-1000), Shard B (User ID 1001-2000).
>             
>         - **Kelebihan:** Mudah melakukan _range query_ (ambil semua user dari 100-200).
>             
>         - **Kekurangan:** Risiko **Hotspot**. Jika User ID baru selalu berurutan (1001, 1002, 1003...), semua operasi tulis akan menghantam Shard B, membuat server itu kelebihan beban.
>             
>     2. **Hash-Based Sharding:** Data dipartisi berdasarkan _hash_ dari _shard key_.
>         
>         - Contoh: `shard_id = hash(user_id) % jumlah_shard`.
>             
>         - **Kelebihan:** Distribusi data jauh lebih merata. Tidak ada hotspot.
>             
>         - **Kekurangan:** _Range query_ menjadi mustahil (User ID 100 dan 101 bisa berada di shard yang berbeda).
>             
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Paper Dynamo:** "Dynamo: Amazon's Highly Available Key-value Store" (Paper klasik tentang _eventual consistency_ dan desain sistem AP).
>     
> - **Artikel:** "Database Sharding" (Banyak artikel online yang menjelaskan strategi sharding secara mendalam).
>