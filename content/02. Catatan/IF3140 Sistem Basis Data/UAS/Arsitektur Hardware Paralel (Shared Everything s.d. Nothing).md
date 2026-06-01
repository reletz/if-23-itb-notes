---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Arsitektur Hardware Paralel (Shared Memory, Disk, Nothing)
> 
> > ## Questions/Cues
> > 
> > - Apa 3 topologi **Interconnection Network**?
> >     
> > - Apa itu **Bus**? (Kelemahan?)
> >     
> > - Apa itu **Mesh**?
> >     
> > - Apa itu **Hypercube**?
> >     
> > - Apa 3 arsitektur paralel **utama**?
> >     
> > - Apa itu **Shared Memory**?
> >     
> > - Kelebihan & Kekurangan Shared Memory?
> >     
> > - Apa itu **Shared Disk**?
> >     
> > - Kelebihan & Kekurangan Shared Disk?
> >     
> > - Apa itu **Shared Nothing (SN)**?
> >     
> > - Kelebihan & Kekurangan Shared Nothing?
> >     
> > - Arsitektur mana yang paling **scalable**?
> >     
> > - Apa itu **Hierarchical** / **NUMA**?
> >     
> >
> > ## Reference Points
> > 
> > - Slides "13 - Database System Architectures.pdf" (Slide 27-32)
> >     
> 
> > ### 1. Interconnection Network (Jaringan Interkoneksi)
> > 
> > Jaringan ini adalah "lem" yang menghubungkan semua CPU dan disk. Pilihannya memengaruhi _bottleneck_.
> > 
> > ![[Pasted image 20251218232020.png]]
> > 
> > 1. **Bus**: Satu kabel/jalur komunikasi tunggal yang dipakai bersama.
> >     
> >     - _Kekurangan_: Cepat menjadi _bottleneck_. Jika semua CPU bicara bersamaan, bus akan "penuh". Tidak skalabel.
> >         
> > 2. **Mesh**: Komponen (CPU) disusun seperti grid. Tiap komponen terhubung ke tetangga sebelahnya (atas, bawah, kiri, kanan).
> >     
> >     - _Kelebihan_: Lebih skalabel.
> >         
> >     - _Kekurangan_: Pesan mungkin perlu "melompat" (hops) beberapa kali untuk sampai ke CPU yang jauh.
> >         
> > 3. **Hypercube**: Topologi canggih di mana komponen terhubung jika alamat binernya hanya beda 1 bit (misal: 001 terhubung ke 011, 000, dan 101).
> >     
> >     - _Kelebihan_: Jumlah lompatan (hops) sangat sedikit, komunikasi efisien.
> >         
> > 
> > ### 2. Arsitektur Paralel Utama
> > 
> > Ini adalah tiga cara klasik untuk membangun sistem paralel, dibedakan berdasarkan apa yang "di-share".
> > 
> > ![[Pasted image 20251218232127.png]]
> > 
> > **a) Shared Memory (Berbagi Memori)**
> > 
> > - **Arsitektur**: Banyak CPU, semua terhubung ke satu _bus_ yang sama, dan semua berbagi satu **memori (RAM)** yang sama (dan juga disk yang sama).
> >     
> > - **Kelebihan**:
> >     
> >     - **Komunikasi Super Cepat**: CPU 1 bisa berkomunikasi dengan CPU 2 hanya dengan menulis data di alamat memori yang disepakati. Tidak perlu kirim pesan.
> >         
> > - **Kekurangan**:
> >     
> >     - **Tidak Skalabel**: _Bus_ memori menjadi _bottleneck_ utama. Semakin banyak CPU, semakin besar perebutan _bus_. (Biasanya mentok di 32 atau 64 CPU).
> >         
> > - **Contoh**: Server multi-core/multi-socket standar.
> >     
> > 
> > **b) Shared Disk (Berbagi Disk)**
> > 
> > - **Arsitektur**: Banyak CPU, setiap CPU punya **memori (RAM) sendiri-sendiri**, tapi semua terhubung ke satu _set_ **disk** yang sama melalui jaringan.
> >     
> > - **Kelebihan**:
> >     
> >     - **Lebih Skalabel**: Mengeliminasi _bottleneck_ _bus_ memori.
> >         
> >     - **Fault Tolerance**: Jika 1 CPU (node) mati, CPU lain bisa mengambil alih kerjanya karena datanya ada di disk yang bisa diakses bersama.
> >         
> > - **Kekurangan**:
> >     
> >     - **Bottleneck Pindah**: _Bottleneck_ pindah ke jaringan interkoneksi ke disk.
> >         
> >     - **Komunikasi Lambat**: Komunikasi antar CPU (misal: mengirim data dari RAM CPU 1 ke RAM CPU 2) harus lewat jaringan, lebih lambat.
> >         
> > 
> > **c) Shared Nothing (Tidak Berbagi Apapun)**
> > 
> > - **Arsitektur**: Sistem terdiri dari banyak "node". Setiap **node** memiliki paket komplit: **CPU sendiri, RAM sendiri, dan Disk sendiri**.
> >     
> > - **Komunikasi**: Node berkomunikasi satu sama lain _hanya_ melalui jaringan interkoneksi. Jika CPU 1 butuh data di Disk 2, ia harus _meminta_ (mengirim pesan) ke CPU 2.
> >     
> > - **Kelebihan**:
> >     
> >     - **Sangat Skalabel**: _Massively Scalable_. Bisa digabungkan hingga ribuan node tanpa _bottleneck_ terpusat (selain jaringan).
> >         
> > - **Kekurangan**:
> >     
> >     - **Komunikasi Mahal**: Biaya komunikasi (kirim pesan) sangat tinggi.
> >         
> >     - **Akses Disk Non-Lokal Lambat**: Mengambil data dari disk node lain jauh lebih lambat daripada dari disk lokal.
> >         
> > 
> > ### 3. Arsitektur Hibrida: Hierarchical / NUMA
> > 
> > **Hierarchical (Hibrida)**: Menggabungkan ketiga arsitektur di atas.
> > 
> > - Contoh: Arsitektur _Shared Nothing_ di level tertinggi (banyak node).
> >     
> > - Tapi _setiap node_ di dalamnya adalah sistem _Shared Memory_ (punya 4-8 CPU yang berbagi RAM lokal).
> >     
> > 
> > NUMA (Non-Uniform Memory Architecture):
> > 
> > Varian dari Shared Memory untuk mengatasi bottleneck. CPU punya akses ke semua memori, tapi akses ke memori yang "lokal" (terpasang di socket-nya) jauh lebih cepat daripada akses ke memori yang "jauh" (terpasang di socket CPU lain).

> [!cornell] #### Summary
> 
> **Arsitektur hardware paralel dibedakan oleh sumber daya apa yang dibagi. **Shared Memory** membagi RAM, membuatnya sangat cepat untuk komunikasi tapi tidak skalabel karena** _**bottleneck**_ **bus memori. **Shared Disk** membagi Disk (tiap CPU punya RAM sendiri), memberikan** _**fault tolerance**_ **tapi memindahkan** _**bottleneck**_ **ke jaringan disk. **Shared Nothing** (SN) tidak berbagi apapun (tiap node punya CPU, RAM, Disk sendiri), membuatnya **sangat skalabel** (hingga ribuan node) namun mengorbankan kecepatan komunikasi antar node. Arsitektur **Hierarchical** (atau **NUMA**) adalah hibrida yang menggabungkan model-model ini, misal node-node SN yang masing-masing adalah sistem Shared Memory.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Perbandingan Arsitektur
> 
> |   |   |   |   |
> |---|---|---|---|
> |**Fitur**|**Shared Memory**|**Shared Disk**|**Shared Nothing**|
> |**Sumber Daya**|CPU|CPU, Memori|CPU, Memori, Disk|
> |**Yang Dibagi**|Memori, Disk|Disk|Tidak ada|
> |**Skalabilitas**|Rendah|Sedang|Sangat Tinggi|
> |**Kecepatan Komunikasi**|Sangat Cepat (via RAM)|Lambat (via Jaringan)|Sangat Lambat (via Jaringan)|
> |**Bottleneck Utama**|Bus Memori|Jaringan I/O Disk|Jaringan Antar Node|
> |**Fault Tolerance**|Rendah|Tinggi|Tinggi (jika ada replikasi)|
> |**Contoh Komersial**|Server Multi-socket|Oracle Rdb (dulu)|Teradata, Greenplum|
> 
> #### Pendalaman Teknis: Shared Nothing adalah Masa Depan
> 
> Hampir semua sistem database modern yang berskala sangat besar (Big Data, Data Warehousing) menggunakan arsitektur **Shared Nothing**.
> 
> - **Sistem Tradisional**: Teradata, Netezza, Greenplum.
>     
> - **Sistem Big Data**: Arsitektur Hadoop (HDFS + MapReduce) pada dasarnya adalah implementasi _Shared Nothing_. Setiap DataNode memiliki CPU, RAM, dan Disk-nya sendiri.
>     
> - **Cloud Data Warehouse**: Google BigQuery, Amazon Redshift, Snowflake, semuanya berjalan di atas infrastruktur _Shared Nothing_ (menggunakan ribuan mesin virtual independen).
>     
> 
> Mengapa? Karena _scalability_ (kemampuan untuk terus menambah node) adalah raja. Masalah _cost of communication_ diatasi dengan algoritma query yang sangat pintar yang meminimalkan perpindahan data (disebut _data shuffling_).
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 20.3.2.
>     
> - **Konsep**: "Scalability: Vertical vs. Horizontal", "NUMA (Non-Uniform Memory Access)".
>