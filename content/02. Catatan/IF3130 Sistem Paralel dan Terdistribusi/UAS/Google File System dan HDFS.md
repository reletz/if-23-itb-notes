---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Distributed File System Skala Raksasa (GFS & HDFS)
> 
> > ## Questions/Cues
> >
> > - **Filosofi Desain GFS (Asumsi)**
> >     
> > - **Pola Akses (Read vs Write)**
> >     
> > - **Kenapa Chunk 64MB?**
> >     
> > - **Arsitektur GFS (Master, Chunkserver, Client)**
> >     
> > - **Single Master: Bottleneck?**
> >     
> > - **Manajemen Metadata**
> >     
> > - **Mekanisme Lease & Mutasi**
> >     
> > - **Algoritma Read (Langkah detail)**
> >     
> > - **Algoritma Write (Data vs Control Flow)**
> >     
> > - **Atomic Record Append**
> >     
> > - **Model Konsistensi (Relaxed)**
> >     
> > - **HDFS (Namenode vs Datanode)**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-17-Google Filesystem-2022.pdf
> >     
> > - Fokus: Big Data, Throughput Tinggi, Fault Tolerance
> >     
> 
> > ### 1. Asumsi Dasar & Motivasi Desain GFS
> >
> > GFS dirancang dengan asumsi yang sangat berbeda dari file system tradisional (seperti NFS atau AFS) untuk menangani kebutuhan _Big Data_ Google.
> >
> > - **Kegagalan adalah Norma (Component Failures):** GFS berjalan di atas ribuan mesin komoditas murah (_cheap commodity hardware_). Kerusakan disk, memori, atau mati listrik dianggap kejadian sehari-hari, bukan pengecualian. Sistem harus memiliki pemantauan konstan, deteksi kesalahan, dan pemulihan otomatis (_self-healing_).
> >     
> > - **Ukuran File Raksasa (Huge Files):** File berukuran multi-GB hingga TB adalah hal umum. Mengelola jutaan file kecil dianggap tidak efisien dan sulit dikelola.
> >     
> > - **Pola Akses Khusus:**
> >     
> > 	- **Write:** Didominasi oleh operasi **Append** (menambahkan data di akhir file, seperti log server atau hasil crawling web). Random write (mengubah data di tengah file) sangat jarang.
> > 			
> > 	- **Read:** Didominasi oleh **Large Streaming Reads** (membaca urut dari awal) dan **Sequential Reads**.
> > 			
> > - **Prioritas Kinerja:** Desain lebih mengutamakan **High Sustained Throughput** (bandwidth data besar) daripada **Low Latency** (respon cepat per request).
> >     
> >
> > ### 2. Arsitektur & Komponen GFS
> >
> > GFS menggunakan arsitektur **Master-Slave** tunggal untuk kesederhanaan.
> >
> > 1. **GFS Master (Tunggal):**
> >     
> > 	- **Fungsi:** Mengelola semua **Metadata** (Namespace/nama file, Access Control, Mapping file ke chunk, Lokasi chunk).
> > 			
> > 	- **Penyimpanan:** Seluruh metadata disimpan di **Memori (RAM)** agar operasi sangat cepat.
> > 			
> > 	- **Ketahanan:** Menyimpan _Operation Log_ dan _Checkpoints_ di disk untuk pemulihan jika crash.
> > 			
> > 	- **Tugas Lain:** Garbage collection, Rebalancing chunk, Manajemen Lease.
> > 			
> > 2. **GFS Chunkservers (Ratusan/Ribuan):**
> >     
> >     - **Fungsi:** Menyimpan data file yang sebenarnya.
> >         
> >     - **Penyimpanan:** Data disimpan sebagai file Linux biasa di disk lokal.
> >         
> >     - Tidak melakukan caching data (karena Linux buffer cache sudah cukup).
> >         
> > 3. **GFS Client:**
> >     
> >     - Berupa library kode yang terhubung dengan aplikasi.
> >         
> >     - Berkomunikasi dengan Master untuk metadata, dan langsung dengan Chunkserver untuk data.
> >         
> >
> > ### 3. Desain Chunk (64 MB)
> >
> > File di GFS dipecah menjadi unit berukuran tetap yang disebut **Chunk**.
> >
> > - **Ukuran 64 MB:** Jauh lebih besar dari blok file system biasa (4KB).
> >     
> > - **Alasan Ukuran Besar:**
> >     
> > 	1. **Mengurangi Metadata:** Karena metadata disimpan di RAM Master, chunk besar berarti jumlah entri metadata lebih sedikit, memungkinkan Master mengelola file system skala Petabyte.
> > 			
> > 	2. **Efisiensi Klien:** Klien dapat melakukan banyak operasi pada satu chunk tanpa perlu berulang kali menghubungi Master (mengurangi beban Master).
> > 			
> > 	3. **Jaringan:** Mengurangi overhead TCP handshake dengan menjaga koneksi persisten ke chunkserver.
> > 			
> > - **Replikasi:** Setiap chunk diberi _Chunk Handle_ (ID unik 64-bit) dan direplikasi (default **3 replika**) di Chunkserver berbeda (idealnya beda rak) untuk redundansi.
> >     
> >
> > ### 4. Mekanisme Lease & Mutasi (Perubahan Data)
> >
> > Untuk menjaga konsistensi saat data diubah (_mutation_), GFS menggunakan sistem **Lease** untuk mengurangi keterlibatan Master.
> >
> > - **Lease:** Master memberikan hak "Primary" ke salah satu replika chunk selama periode tertentu (misal 60 detik).
> >     
> > - **Peran Primary:** Primary bertanggung jawab menentukan **Urutan Serial (Serial Order)** untuk semua operasi write yang masuk ke chunk tersebut. Replika lain (Secondary) harus mengikuti urutan ini.
> >     
> > - **Pemisahan Aliran (Decoupling):**
> >     
> > 	- **Control Flow:** Informasi perintah (write command) mengalir dari Klien -> Primary -> Secondaries.
> > 			
> > 	- **Data Flow:** Data fisik didorong secara _linear pipeline_ antar Chunkserver untuk memaksimalkan bandwidth jaringan (memanfaatkan full-duplex link).
> > 			
> >
> > ### 5. Algoritma Read & Write (Langkah Detail)
> >
> > **Algoritma Read (Slide 15-16):**
> >
> > 1. Aplikasi minta baca `(Nama File, Byte Range)`.
> >     
> > 2. Klien menghitung index chunk, kirim request ke **Master**.
> >     
> > 3. **Master** merespon dengan `(Chunk Handle, Lokasi Replika)`.
> >     
> > 4. Klien menyimpan info ini (caching metadata).
> >     
> > 5. Klien memilih **Chunkserver** terdekat (misal satu rak), kirim request `(Chunk Handle, Byte Range)`.
> >     
> > 6. **Chunkserver** membaca data dari disk dan kirim ke Klien.
> >     
> >
> > **Algoritma Write (Slide 17-20):**
> >
> > 1. Klien tanya Master siapa pemegang Lease. Master memberitahu lokasi Primary & Secondaries.
> >     
> > 2. **Data Push:** Klien mendorong data ke semua replika (secara berantai/pipeline). Data disimpan di buffer memori Chunkserver (belum ditulis ke file).
> >     
> > 3. **Write Command:** Setelah data sampai di semua replika, Klien kirim perintah "Write" ke **Primary**.
> >     
> > 4. **Serialization:** Primary memberikan nomor urut pada mutasi tersebut (jika ada banyak klien menulis bersamaan).
> >     
> > 5. **Forwarding:** Primary meneruskan perintah tulis ke semua **Secondaries** sesuai urutan tadi.
> >     
> > 6. **Disk Write:** Semua replika menulis data dari buffer ke disk.
> >     
> > 7. **Ack:** Secondaries lapor sukses ke Primary. Primary lapor sukses ke Klien.
> >     
> > - _Catatan:_ Jika ada satu replika gagal, Primary lapor error ke Klien, dan Klien harus mengulangi proses (retry).
> >     
> >
> > ### 6. Konsistensi & Atomic Record Append
> >
> > GFS menerapkan **Relaxed Consistency Model**:
> >
> > - **Atomic Record Append:** Ini adalah fitur kunci GFS. Klien mengirim data tanpa menentukan offset (posisi). GFS (Primary) yang menentukan offset dan menjamin data tertulis **setidaknya satu kali (at least once)** secara atomik.
> >     
> >     - Berguna untuk situasi _multiple writers_ (banyak klien menulis log ke satu file bersamaan).
> >         
> >     - Tidak perlu _locking_ yang rumit dari sisi aplikasi.
> >         
> > - **Implikasi:** File mungkin mengandung _padding_ (ruang kosong) atau _duplikasi record_ (jika retry terjadi), tetapi data tidak akan rusak/tercampur. Aplikasi harus didesain untuk menangani ini (misal pakai checksum/ID unik di tiap record).
> >     
> >
> > ### 7. Hadoop Distributed File System (HDFS)
> >
> > HDFS adalah implementasi open-source dari GFS yang menjadi fondasi ekosistem Hadoop.
> >
> > - **Pemetaan Istilah:**
> >     
> > 	- GFS Master $\rightarrow$ **Namenode**.
> > 			
> > 	- GFS Chunkserver $\rightarrow$ **Datanode**.
> > 			
> > - **Karakteristik HDFS (Awal):**
> >     
> >     - Model _Write-Once-Read-Many_.
> >         
> >     - Awalnya hanya mendukung satu writer per file (beda dengan GFS yang support concurrent append).
> >         
> >     - Didesain spesifik untuk memfasilitasi komputasi **MapReduce** (memindahkan komputasi ke dekat data).
> >         

> [!cornell] #### Summary
> 
> GFS (dan HDFS) adalah solusi penyimpanan terdistribusi untuk era Big Data, dirancang di atas asumsi kegagalan hardware yang sering. Arsitekturnya memisahkan Metadata (terpusat di RAM Master/Namenode) dan Data (disebar di Chunkservers/Datanodes dalam blok besar 64MB). Untuk kinerja, GFS memisahkan aliran kontrol dan data, serta menggunakan mekanisme Lease dan Pipelining. Fitur Atomic Record Append memungkinkan penulisan log konkuren yang efisien meski dengan model konsistensi yang dilonggarkan (relaxed).

> [!ad-libitum]- Additional Information (Deep Dive Technical)
> 
> #### Shadow Masters & High Availability
> 
> Karena Master adalah _single point of failure_, GFS menggunakan **Shadow Masters** (replika read-only dari master) yang mengikuti update log operasi master utama. Jika master utama mati, shadow master bisa melayani request baca (read-only) sampai master utama pulih atau digantikan. Di HDFS modern, ada fitur _High Availability (HA) Namenode_ dengan failover otomatis.
> 
> #### Kenapa "Data Flow" dipisahkan dari Master?
> 
> Bayangkan ribuan klien ingin membaca file 1 TB. Jika semua data harus melewati Master, Master akan menjadi hambatan (bottleneck) jaringan yang parah. Dengan membiarkan klien bicara langsung ke Chunkserver, bandwidth agregat dari ratusan mesin bisa dimanfaatkan sepenuhnya, sehingga throughput sistem bisa berskala linear seiring penambahan mesin.
> 
> #### Sumber & Referensi:
> 
> - **Paper:** Ghemawat, S., Gobioff, H., & Leung, S. T. (2003). "The Google File System". _ACM SOSP_.
>     
> - **Hadoop:** Dokumentasi resmi Apache Hadoop HDFS Architecture.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa GFS memilih ukuran chunk sebesar 64MB, padahal file system biasa hanya menggunakan 4KB?</strong></summary>
> 
> Ukuran chunk yang besar (64MB) mengurangi jumlah metadata yang harus disimpan di memori Master, sehingga Master mampu menangani sistem dengan kapasitas Petabyte tanpa kehabisan RAM. Selain itu, chunk besar memungkinkan klien mempertahankan koneksi TCP persisten ke chunkserver untuk waktu lama, mengurangi overhead jaringan, dan meminimalkan interaksi ke Master.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan peran "Primary Replica" dalam proses penulisan (Write) di GFS!</strong></summary>
> 
> Primary Replica adalah salah satu pemegang chunk yang diberi hak "Lease" oleh Master. Peran utamanya adalah menentukan urutan eksekusi (serialization order) dari semua operasi write yang masuk ke chunk tersebut. Ini memastikan bahwa semua replika (Primary dan Secondaries) menerapkan perubahan data dalam urutan yang persis sama, menjaga konsistensi data.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa perbedaan antara "Control Flow" dan "Data Flow" dalam arsitektur GFS?</strong></summary>
> 
> Control Flow adalah aliran informasi metadata (seperti lokasi chunk, lease, hak akses) yang terjadi antara Klien dan Master. Data Flow adalah aliran data fisik (isi file) yang terjadi langsung antara Klien dan Chunkservers (atau antar Chunkservers saat pipelining). Pemisahan ini mencegah Master menjadi bottleneck kinerja.
> 
> </details>