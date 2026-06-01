---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu arsitektur _Decentralized_?
> >     
> > - Apa itu Peer-to-Peer (P2P)?
> >     
> > - 3 jenis P2P?
> >     
> > - Apa itu _Overlay Network_?
> >     
> > - Beda _Structured_ vs _Unstructured_ P2P?
> >     
> > - Contoh _Structured P2P_?
> >     
> > - Prinsip _Unstructured P2P_?
> >     
> > - Apa itu _Superpeer_?
> >     
> > - Contoh arsitektur hibrida?
> >     
> > - Bagaimana arsitektur BitTorrent?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 24-31 (10 - IF3130-09-Architecture-2022.pdf)
> >     
> > - Kuliah Arsitektur Sistem Terdistribusi
> >     
> 
> > ### 1. Arsitektur Terdesentralisasi (P2P)
> > 
> > Berbeda dengan model terpusat (Client-Server), arsitektur **Peer-to-Peer (P2P)** tidak memiliki server pusat. Semua _node_ (disebut _peers_) pada dasarnya setara.
> > 
> > **Overlay Networks:** Jaringan P2P adalah _overlay network_. Ini adalah jaringan logis yang dibangun di atas jaringan fisik (Internet). Ketetanggaan (siapa terhubung ke siapa) didefinisikan oleh aplikasi, bukan oleh kabel fisik.
> > 
> > ### 2. Tiga Jenis Sistem P2P
> > 
> > 1. **Structured P2P:**
> >     
> > 	![[Pasted image 20251111002357.png]]
> > 
> > 	- _Node_ diorganisasi berdasarkan struktur data terdistribusi tertentu (misal: _ring_ atau _grid_).
> > 	    
> > 	- Ada mekanisme pasti untuk mencari _key_ (data) ada di _node_ mana.
> > 	    
> > 	- _Contoh (Slide 25):_ **Distributed Hash Table (DHT)**. _Node_ diatur dalam _ring_ (0-15). Setiap _node_ bertanggung jawab atas _range_ kunci tertentu. (Misal: _Node_ 12 bertanggung jawab atas data dengan kunci 8, 9, 10, 11, 12).
> >     
> > 
> > 2. **Unstructured P2P:**
> >     
> >     ![[Pasted image 20251111002446.png]]
> > 
> > 	- _Node_ memilih _neighbors_ (tetangga) secara **acak**.
> > 	    
> > 	- Tidak ada struktur pasti. Untuk mencari data, _query_ harus "dibanjiri" (_flooded_) ke _neighbors_, yang kemudian meneruskannya ke _neighbors_ mereka.
> > 	    
> > 	- _Prinsip (Slide 27):_ Setiap _peer_ menjaga _partial view_ (daftar _neighbors_ terbatas). Secara periodik, _peer_ saling bertukar anggota _view_ mereka untuk menjaga _randomness_ dan _robustness_ (jika satu _node_ mati, jaringan tetap terhubung).
> > 	    
> > 
> > 3. **Hybrid P2P:**
> >     
> > 	![[Pasted image 20251111002425.png]]
> > 
> > 	- Menggabungkan elemen P2P dengan _node_ yang memiliki fungsi khusus (server).
> > 	    
> > 	- _Contoh:_ **Superpeers** (Slide 29).
> > 	    
> > 
> > ### 3. Superpeers (Hybrid P2P)
> > 
> > Ini adalah _node_ P2P biasa yang "dipromosikan" untuk melakukan pekerjaan spesifik karena memiliki kapasitas lebih (CPU, _bandwidth_, _uptime_).
> > 
> > _Node_ biasa (_Regular peer_) akan terhubung ke _Superpeer_. Jaringan _Superpeer_ membentuk jaringan P2P level lebih tinggi.
> > 
> > **Contoh Tugas Superpeer:**
> > 
> > - Menjaga _index_ file (untuk pencarian _file_).
> >     
> > - Memonitor status jaringan.
> >     
> > - Membantu _setup_ koneksi antar _peers_ (misal: jika ada di belakang NAT).
> >     
> > 
> > ### 4. Arsitektur Hibrida (Hybrid)
> > 
> > Arsitektur ini menggabungkan model Client-Server (CS) dengan P2P.
> > 
> > **Contoh 1: Edge-Server / CDN**
> > 
> > ![[Pasted image 20251111002512.png]]
> > 
> > - _Content Delivery Network (CDN)_ adalah arsitektur hibrida.
> >     
> > - **Bagian CS:** Ada _Content Provider_ (server pusat) yang menyimpan data asli.
> >     
> > - **Bagian CS (Edge):** Ada _Edge Servers_ (server-server yang tersebar di banyak lokasi geografis, dekat pengguna/ISP).
> >     
> > - **Alur:** _Client_ (pengguna) terhubung ke _Edge Server_ (secara Client-Server) yang lokasinya paling dekat. _Edge Server_ menyajikan konten yang sudah di-_cache_. Ini mengurangi beban _Content Provider_ dan mempercepat pengiriman.
> >     
> > 
> > **Contoh 2: BitTorrent**
> > 
> > ![[Pasted image 20251111002554.png]]
> >     
> > - **Bagian CS (Langkah Awal):**
> >     
> > 
> > 	1. _Client_ mencari _file_ `.torrent` di _Web Server_ (situs torrent).
> > 	    
> > 	2. _File_ `.torrent` berisi referensi ke **Tracker** (sebuah _File Server_ / Server khusus).
> > 	    
> > 	3. _Client_ menghubungi _Tracker_ (secara Client-Server).
> > 	    
> > 	4. _Tracker_ (Server) merespons dengan daftar _IP address_ _peers_ (Node 1...N) yang sedang men-_download_/_upload_ _file_ tersebut.
> > 	    
> > 
> > - **Bagian P2P (Swarm):**
> >     
> > 
> > 	1. _Client_ bergabung ke **"swarm"** (kumpulan _peers_).
> > 	    
> > 	2. _Client_ mulai men-_download_ potongan _file_ (_chunks_) dari _peers_ lain.
> > 	    
> > 	3. Secara bersamaan, _client_ juga meng-_upload_ _chunks_ yang sudah ia miliki ke _peers_ lain di _swarm_ tersebut.
> > 	    

> [!cornell] #### Summary
> 
> **Arsitektur terdesentralisasi (P2P) menghilangkan server pusat, di mana** _**peers**_ **setara dan terhubung dalam** _**overlay network**_**. Jaringan ini bisa** _**Structured**_ **(terstruktur, misal: DHT) atau** _**Unstructured**_ **(acak). Arsitektur Hibrida menggabungkan model P2P dengan Client-Server. Contohnya adalah CDN (menggunakan** _**Edge Server**_ **terpusat) dan BitTorrent (menggunakan** _**Tracker**_ **terpusat untuk mengoordinasi** _**swarm**_ **P2P untuk berbagi** _**file**_**).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: DHT (Distributed Hash Table)
> 
> Ini adalah teknologi inti di balik _Structured P2P_ dan banyak sistem terdistribusi (termasuk beberapa database NoSQL).
> 
> - **Ide:** Menggunakan fungsi _hash_ untuk memetakan _key_ (nama data) ke sebuah _value_ angka. Angka ini menentukan _node_ mana di _ring_ yang bertanggung jawab menyimpan data tersebut.
>     
> - **Fitur:**
>     
> - **Pencarian Efisien:** Untuk mencari data "X", Anda tinggal _hash("X")_, dapat angka _K_. Anda tidak perlu _flood_ jaringan, cukup lompat ke _node_ yang bertanggung jawab untuk _K_.
>     
> - **Skalabilitas:** Saat _node_ baru bergabung, ia mengambil alih sebagian _range_ kunci dari tetangganya.
>     
> 
> #### Pendalaman: Cara Kerja BitTorrent "Tithe-for-Tat"
> 
> BitTorrent sangat sukses karena ia memecahkan masalah "free-riding" (orang yang hanya _download_ tapi tidak mau _upload_).
> 
> - **Mekanisme:** _Client_ Anda akan memprioritaskan _upload_ ke _peers_ yang juga sedang memberi Anda _upload_ (potongan _file_) dengan _rate_ terbaik.
>     
> - **Efek:** Jika Anda mematikan _upload_, _peers_ lain akan berhenti mengirimi Anda data. Ini menciptakan insentif ekonomi untuk berkontribusi (meng-upload) agar Anda bisa _download_ lebih cepat.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Cari tahu tentang **IPFS (InterPlanetary File System)**. Ini adalah sistem P2P modern yang bertujuan menggantikan HTTP, menggunakan prinsip-prinsip yang mirip dengan DHT dan BitTorrent.
>     
> - Pikirkan tentang Skype (versi lama) atau Spotify (versi lama) yang menggunakan P2P/Superpeers untuk _streaming_ data. Apa keuntungannya bagi perusahaan? (Petunjuk: Hemat _bandwidth_ server).
>