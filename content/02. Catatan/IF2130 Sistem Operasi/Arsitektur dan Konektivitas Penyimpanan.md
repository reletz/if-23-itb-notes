---
type: Note
cssclasses:
  - cornell-notes
---
> [!cornell] Topic
> > ## Questions/Cues
> > Place key questions, terms, concepts, or cues in this left column. Examples:
> > - Bagaimana drive terhubung?
> > - Peran Host & Device Controller?
> > - Apa itu Host-Attached Storage?
> > - Apa itu Network-Attached Storage (NAS)?
> > - Apa itu Storage Area Network (SAN)?
> > - Perbedaan utama NAS vs SAN?
> > - Apa itu Storage Array?
> > - Kapan menggunakan Object Storage?
> > - Karakteristik Object Storage?
>
> > ### Metode Koneksi Penyimpanan
> > Perangkat penyimpanan terhubung ke komputer melalui berbagai jenis bus dan antarmuka. Beberapa yang paling umum adalah:
> > - **SATA (Serial ATA):** Antarmuka standar untuk menghubungkan HDD dan SSD internal di komputer pribadi dan server.
> > - **NVMe (via PCIe bus):** Antarmuka super cepat yang dirancang khusus untuk SSD modern, memberikan latensi terendah dan throughput tertinggi.
> > - **USB (Universal Serial Bus):** Paling umum untuk menghubungkan perangkat penyimpanan eksternal.
> > - **Fibre Channel (FC):** Protokol jaringan berkecepatan tinggi yang digunakan terutama di lingkungan enterprise untuk membangun Storage Area Network (SAN).
> >
> > ### Host & Device Controller
> > Komunikasi antara komputer dan drive diatur oleh dua jenis kontroler:
> > 1. **Host Controller (atau Host Bus Adapter - HBA):** Kumpulan sirkuit di sisi komputer yang mengelola komunikasi melalui bus I/O.
> > 2. **Device Controller:** Kumpulan sirkuit di dalam perangkat penyimpanan itu sendiri yang menerima perintah dari host controller dan mengoperasikan mekanisme internal drive untuk mengeksekusi perintah tersebut. Transfer data besar biasanya ditangani oleh **DMA (Direct Memory Access)** untuk membebaskan CPU.
> >
> > ### Akses Penyimpanan
> > Komputer mengakses penyimpanan dengan tiga cara:
> > 
> > **Host-Attached Storage (DAS - Direct-Attached Storage):**
> > Ini adalah arsitektur paling sederhana dimana perangkat penyimpanan terhubung **langsung ke satu komputer** dan tidak dapat diakses secara native oleh komputer lain.
> > - **Contoh:** Hard disk internal di laptop Anda, atau drive USB eksternal yang Anda colokkan.
> > - **Karakteristik:** Sederhana, murah, kinerja tinggi, tetapi sulit untuk dibagikan dan tidak mudah diskalakan.
> >
> > **Network-Attached Storage (NAS):** 
> > Sebuah perangkat penyimpanan mandiri yang terhubung ke **jaringan area lokal (LAN)** dan menyediakan akses penyimpanan ke banyak klien di jaringan tersebut.
> > - **Cara Kerja:** NAS pada dasarnya adalah sebuah server file yang disederhanakan. Klien mengaksesnya melalui protokol file standar seperti **NFS** (untuk Linux/UNIX) atau **CIFS/SMB** (untuk Windows). Bagi komputer klien, NAS terlihat seperti sebuah _shared folder_ di jaringan.
> > - **Penggunaan:** Ideal untuk berbagi file di rumah atau di kantor kecil/menengah.
> >
> > **Storage Area Network (SAN):** 
> > Sebuah **jaringan terpisah, berkecepatan sangat tinggi**, yang didedikasikan khusus untuk menghubungkan server ke perangkat penyimpanan tingkat blok (seperti _storage array_).
> > - **Cara Kerja:** SAN menggunakan protokol khusus seperti **Fibre Channel**. Bagi server, penyimpanan di SAN terlihat seolah-olah itu adalah disk lokal yang terpasang langsung, bukan sebagai _network share_. Ini memungkinkan server untuk memformat dan mengelola penyimpanan tersebut sesuka hati.
> > - **Penggunaan:** Lingkungan enterprise yang membutuhkan kinerja I/O sangat tinggi dan latensi rendah, seperti untuk server database atau virtualisasi skala besar.
> > - **Storage Array:** Sebuah sistem penyimpanan canggih yang terdiri dari banyak drive (bisa ratusan), satu atau lebih kontroler cerdas, memori cache yang besar, dan perangkat lunak untuk menyediakan fitur-fitur canggih seperti **RAID, snapshots, replikasi data, dan deduplikasi**. _Storage array_ adalah komponen inti dalam sebuah SAN.
> > ### Object Storage
> >  Sebuah arsitektur penyimpanan yang berbeda secara fundamental, dirancang untuk data dalam skala sangat besar (petabyte hingga exabyte) dan tidak terstruktur.
> >  - **Konsep:** Alih-alih hierarki folder dan file, data disimpan sebagai **"objek"** dalam sebuah kolam penyimpanan (storage pool) raksasa yang datar. Setiap objek terdiri dari data itu sendiri, metadata yang kaya, dan sebuah ID unik global.
> >  - **Penggunaan:** Bukan untuk sistem operasi, tetapi untuk aplikasi skala besar seperti:
> > 	 - Penyimpanan cloud (misalnya, Amazon S3, Google Cloud Storage)
> > 	 - Penyimpanan konten media sosial (foto Facebook, video TikTok)
> > 	 - Backup dan arsip data dalam jumlah masif
> > 	 - Analitik Big Data
> >  - **Karakteristik Object Storage:**
> > 	 - **Akses via API:** Objek diakses melalui panggilan API (HTTP), bukan dengan me-mount drive.
> > 	 - **Sangat Skalabel (Horizontal):** Kapasitas dapat ditambah hanya dengan menambahkan lebih banyak server (node) ke dalam _pool_.
> > 	 - **Ideal untuk Data Statis:** Sangat baik untuk data yang ditulis sekali dan banyak dibaca (_write-once-read-many_), seperti foto, video, dan backup.
> > 

> [!cornell] #### Summary
> Arsitektur penyimpanan berevolusi dari koneksi langsung (Host-Attached) untuk satu komputer, menjadi akses file bersama melalui jaringan standar dengan NAS, hingga jaringan blok berkinerja tinggi yang terisolasi dengan SAN untuk kebutuhan enterprise. Setiap arsitektur melayani kebutuhan skala dan kinerja yang berbeda. Untuk skala data yang ekstrem dan tidak terstruktur yang ditemukan di cloud dan aplikasi web modern, paradigma yang sama sekali berbeda yaitu Object Storage digunakan, yang menggantikan hierarki file tradisional dengan kolam objek raksasa yang dapat diskalakan secara masif.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **iSCSI (Internet SCSI):** Ini adalah protokol SAN yang menjadi jembatan antara dunia SAN dan NAS. iSCSI mengenkapsulasi perintah SCSI level blok ke dalam paket TCP/IP. Ini memungkinkan pembuatan SAN menggunakan infrastruktur jaringan Ethernet standar, bukan Fibre Channel yang mahal. Meskipun kinerjanya mungkin tidak setinggi FC, ini adalah alternatif yang jauh lebih hemat biaya untuk banyak aplikasi.
> - **Fibre Channel vs. Ethernet untuk Penyimpanan:**
> - **Fibre Channel (FC):** Dirancang dari awal untuk penyimpanan. Protokolnya _lossless_ (tanpa kehilangan paket) dan memiliki latensi sangat rendah. Switch FC adalah perangkat khusus yang mahal.
> - **Ethernet:** Jaringan serbaguna. Untuk dapat diandalkan untuk penyimpanan berkinerja tinggi, ia memerlukan teknologi tambahan seperti **Data Center Bridging (DCB)** atau **RoCE (RDMA over Converged Ethernet)** untuk mengurangi kehilangan paket dan latensi.
> - **Software-Defined Storage (SDS):** Platform seperti **Ceph** atau **GlusterFS** adalah contoh SDS. Mereka mengambil server komoditas (perangkat keras standar) dengan disk internal dan menggunakan perangkat lunak untuk membuat sebuah _storage pool_ yang terdistribusi. Platform ini sangat fleksibel dan seringkali dapat menyediakan penyimpanan **objek**, **blok**, dan **file** dari _pool_ yang sama, mengaburkan batas-batas tradisional antara NAS, SAN, dan Object Storage.
> #### Sumber & Referensi Lanjutan:
> - **Dokumentasi Vendor:** Telusuri white paper dari vendor terkemuka seperti Dell EMC (untuk SAN/Storage Array), NetApp (untuk NAS), dan AWS (untuk Object Storage S3) untuk memahami produk dan arsitektur mereka.
> - **Proyek Open Source:** Jelajahi dokumentasi untuk proyek seperti **FreeNAS/TrueNAS** (platform NAS/SAN berbasis ZFS) atau **Ceph** untuk pemahaman mendalam tentang implementasi modern.
> - **Tutorial iSCSI:** Cari tutorial online tentang cara mengkonfigurasi _iSCSI Target_ (server) dan _iSCSI Initiator_ (klien) di Linux untuk pengalaman langsung.
> #### Eksplorasi Mandiri:
> - Bandingkan biaya switch Fibre Channel 16Gbps dengan switch Ethernet 10Gbps atau 25Gbps. Ini akan memberi Anda gambaran nyata tentang perbedaan biaya infrastruktur antara SAN FC dan SAN berbasis Ethernet (iSCSI/RoCE).
> - Instal dan konfigurasikan **OpenMediaVault** (sistem operasi NAS berbasis Debian) di mesin virtual untuk mensimulasikan dan menjelajahi fitur-fitur perangkat NAS.
> - Buat akun AWS Free Tier dan coba gunakan Amazon S3 untuk mengunggah beberapa file. Perhatikan bagaimana Anda berinteraksi dengannya melalui konsol web atau CLI, yang merupakan bentuk interaksi berbasis API, bukan sistem file.