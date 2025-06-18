---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Keamanan: Ancaman Keamanan Jaringan & Firewall
> 
> > ## Questions/Cues
> > 
> > - Di lapisan mana saja ancaman keamanan bisa terjadi?
> > - Apa itu **IP Spoofing**?
> > - Jelaskan serangan **Smurf Attack**.
> > - Apa itu serangan **SYN Flood**?
> > - Jelaskan serangan **Session Hijacking**.
> > - Apa itu **Denial of Service (DoS)**?
> > - Bedakan DoS dan **DDoS**.
> > - Apa itu **Worm**? Bagaimana cara penyebarannya?
> > - Apa fungsi **Firewall**?
> > - Jelaskan **Packet-Filtering Firewall**.
> > - Apa itu _Ingress_ dan _Egress Filtering_?
> > - Apa itu **DMZ (Demilitarized Zone)**?
> > 
> > ## Reference Points
> > 
> > - Lecture 11
> 
> > ### Lanskap Ancaman Keamanan Jaringan
> > 
> > Kerentanan keamanan dapat ditemukan di setiap lapisan tumpukan protokol jaringan, dari lapisan fisik hingga aplikasi.
> > 
> > - **Serangan Lapisan Jaringan (IP/ICMP):**
> >     
> >     - **IP Spoofing:** Penyerang memalsukan alamat IP sumber dalam sebuah paket. Tujuannya bisa untuk menyembunyikan identitas asli, atau untuk menyamar sebagai host tepercaya agar bisa melewati aturan keamanan sederhana yang berbasis alamat IP.
> >     ![[Pasted image 20250618220750.png]]
> >     - **ARP Spoofing:** Serangan di level LAN untuk mengasosiasikan MAC address penyerang dengan IP address korban.  
> > 	    - Penyerang (misalnya, Host A) mengirimkan pesan ARP (Address Resolution Protocol) palsu ke jaringan. Pesan ini mengasosiasikan alamat IP dari mesin target (misalnya, Host B) dengan alamat MAC milik penyerang (Host A). 
> > 	    - Ketika server S mencoba mengirim data ke Host B, ia akan secara keliru mengirimkannya ke alamat MAC milik Host A. Hal ini memungkinkan penyerang untuk mencegat (melakukan serangan _Man-in-the-Middle_) atau meniru identitas mesin lain di dalam jaringan lokal.
> >     - **Smurf Attack:** Ini adalah jenis serangan _amplification_. Penyerang mengirimkan _ICMP Echo Request_ (ping) ke alamat _broadcast_ sebuah jaringan, namun dengan memalsukan alamat IP sumber menjadi alamat IP korban. Akibatnya, semua host aktif di jaringan tersebut akan serentak mengirimkan balasan ping ke korban, membanjiri lalu lintasnya.
> >     ![[Pasted image 20250618220724.png]]
> >     - **ICMP Attacks:** Protokol ICMP dapat dieksploitasi, misalnya dengan mengirim pesan `ICMP Redirect` palsu untuk mengalihkan lalu lintas (serangan _man-in-the-middle_) atau `Destination Unreachable` untuk memutuskan koneksi yang sah.
> >     - **Routing Attacks:** Untuk **mengalihkan lalu lintas (divert traffic)** ke node berbahaya untuk tujuan **menguping (eavesdropping)** atau menghilangkannya sama sekali **(black-hole)**
> > 	    - Pada protokol **Distance-Vector (seperti RIP):** Penyerang bisa "mengiklankan" rute palsu dengan biaya (cost) yang sangat rendah, sehingga router lain akan memilih rute melalui penyerang.
> > 	    - Pada protokol **Link-State (seperti OSPF):** Penyerang bisa "menghilangkan" link dari topologi yang diiklankan, memanipulasi bagaimana router lain membangun peta jaringan.
> > 	    - Pada **BGP (protokol routing internet):** Ada kerentanan spesifik seperti **Prefix-hijacking** (mengklaim kepemilikan blok alamat IP orang lain) dan **Path alteration** (memanipulasi jalur AS_PATH).
> >
> > - **Serangan Lapisan Transport (TCP):**
> >     
> >     - **SYN Flood:** Sebuah serangan DoS di mana penyerang mengirimkan banyak paket `SYN` (permintaan koneksi) ke server. Server akan merespons dengan `SYN-ACK` dan mengalokasikan sumber daya untuk koneksi yang "setengah terbuka" ini. Namun, penyerang tidak pernah menyelesaikan _handshake_ dengan mengirim `ACK` terakhir. Ini menyebabkan antrian koneksi server menjadi penuh dan tidak dapat menerima koneksi yang sah.
> >     - **TCP Session Poisoning:** Serangan yang mengirim paket RST (Reset) untuk memutuskan koneksi TCP secara paksa. Penyerang tidak perlu menebak sequence number yang tepat - cukup sequence number yang berada dalam jangkauan window TCP, dan untuk window 64k diperlukan sekitar 64.000 paket atau 15 detik pada koneksi T1 untuk berhasil mereset koneksi.
> >     - **TCP Session Hijacking:** Penyerang "mengambil alih" sebuah sesi TCP yang sudah berjalan dengan cara menebak _sequence number_ yang benar dan kemudian mengirimkan paket palsu yang seolah-olah berasal dari salah satu pihak yang sah dalam komunikasi.
> >     ![[Pasted image 20250618220842.png]]
> >     ![[Pasted image 20250618220904.png]]
> > 
> > ### Serangan Skala Besar: DoS, DDoS, dan Worm
> > 
> > - **Denial of Service (DoS):** Serangan yang bertujuan untuk membuat sebuah layanan atau sumber daya jaringan menjadi tidak tersedia bagi pengguna yang sah. Ini bisa dilakukan dengan menghabiskan bandwidth jaringan atau menghabiskan sumber daya komputasi (CPU, memori) di server.
> > - **Distributed DoS (DDoS):** Versi DoS yang jauh lebih kuat, dilancarkan dari **banyak komputer terdistribusi** (sering disebut _zombie_ atau _botnet_) secara bersamaan. Karena serangan datang dari banyak sumber, sangat sulit untuk diblokir.
> > ![[Pasted image 20250618221113.png]]
> > 
> > - DDOS Khusus: **Reflector Attack**.
> > 	- **Mekanisme:** Penyerang tidak mengirim lalu lintas langsung dari _botnet_ ke korban. Sebaliknya, penyerang mengirimkan permintaan (misalnya, DNS query atau ping) ke banyak server pihak ketiga yang sah (disebut **Reflector**), tetapi dengan **memalsukan alamat IP sumber menjadi alamat IP korban**.
> > 	- **Hasil:** Semua server pihak ketiga tersebut akan mengirimkan balasannya ke korban, bukan ke penyerang. Ini membuat serangan lebih sulit dilacak karena lalu lintas yang diterima korban berasal dari server-server yang sah, bukan dari _botnet_.
> > - **Worm:** Program jahat yang dapat **mereplikasi dirinya sendiri** secara otomatis dan menyebar melalui jaringan dengan cara mengeksploitasi kerentanan keamanan pada sistem lain.
> > - _Bagaimana_ worm menemukan target barunya? -> _Scanning_
> > 	- **Random Scanning:** Worm menghasilkan alamat IP 32-bit secara acak untuk dipindai.
> > 	- **Local Subnet Scanning:** Worm lebih memprioritaskan pemindaian host lain yang berada di subnet lokal yang sama, karena kemungkinan besar host di jaringan yang sama memiliki konfigurasi dan kerentanan yang serupa.
> > 	- **Topological Scanning:** Worm menggunakan informasi dari mesin yang terinfeksi (misalnya, dari daftar email atau koneksi aktif) untuk menemukan target berikutnya.
> > 	- **Hitlist Scanning:** Penyerang memberikan daftar target potensial yang paling rentan kepada worm untuk diperiksa terlebih dahulu, mempercepat laju penyebaran awal.
> > 
> > ### Penanggulangan Umum
> > - **Pencegahan di Level Software:** Menerapkan praktik pengkodean yang aman seperti _array bounds checking_, menggunakan versi library yang aman (misal, `snprintf` daripada `sprintf`), dan melakukan analisis statis pada kode.
> > - **Keberagaman Host (Host Diversity):** Menghindari monokultur. Jika semua sistem menggunakan OS dan software yang sama, satu exploit dapat menjatuhkan semuanya.
> > - **Kerangka Penanggulangan:** Sebuah penanggulangan bisa berupa:
> > 	- **Prevention:** Mencegah serangan terjadi.
> > 	- **Detection:** Mendeteksi serangan saat sedang berlangsung.
> > 	- **Resilience:** Tetap dapat beroperasi meskipun sedang diserang.
> > 
> > ### Pertahanan Jaringan: Firewall
> > 
> > **Firewall** adalah sebuah sistem keamanan jaringan (bisa berupa perangkat keras atau perangkat lunak) yang ditempatkan di perbatasan antara jaringan tepercaya (internal) dan jaringan tidak tepercaya (eksternal, seperti internet). Fungsinya adalah untuk memonitor dan mengontrol lalu lintas yang masuk dan keluar berdasarkan seperangkat aturan keamanan yang telah ditentukan.
> > ![[Pasted image 20250618221639.png]]
> > 
> > ### Tipe dan Konfigurasi Firewall
> > 
> > 1. **Stateless Packet-Filtering Firewall:**
> >     - Firewall paling dasar. Ia memeriksa setiap paket secara individual berdasarkan informasi di header (IP sumber/tujuan, port, protokol). Keputusan untuk mengizinkan atau menolak paket dibuat tanpa mempertimbangkan konteks koneksi yang lebih besar.
> >     - Aturan penting: _**Ingress Filtering**_ (memblokir lalu lintas dari luar yang alamat sumbernya dipalsukan seolah dari dalam) dan _**Egress Filtering**_ (memblokir lalu lintas dari dalam yang alamat sumbernya tidak sah).
> > 2. **Stateful Packet-Filtering Firewall:**
> >     - Lebih canggih. Ia melacak status koneksi yang aktif (misalnya, koneksi TCP mana yang sudah terbentuk). Ini memungkinkannya membuat aturan yang lebih cerdas, seperti "izinkan lalu lintas masuk di port X hanya jika koneksi tersebut diinisiasi dari dalam jaringan".
> > 3. **Proxy Firewall (Application Layer Gateway):**
> >     - Bekerja di lapisan aplikasi dan bertindak sebagai perantara penuh antara klien dan server. Ini memberikan tingkat keamanan tertinggi karena dapat memeriksa konten aplikasi, tetapi bisa menjadi _bottleneck_ performa.
> > 
> > ![[Pasted image 20250618223148.png]]
> > - **Konfigurasi DMZ (Demilitarized Zone):** DMZ adalah sebuah subnet jaringan terisolasi yang berada di antara internet dan jaringan internal. Server-server yang perlu diakses oleh publik (seperti Web Server, Mail Server) ditempatkan di DMZ. Aturan firewall diatur sedemikian rupa sehingga jika server di DMZ berhasil diretas, penyerang tetap tidak memiliki akses langsung ke jaringan internal yang lebih sensitif dan tepercaya.
> > - **Pentingnya Memeriksa Flag ACK:** Aturan kedua (outbound) secara spesifik mensyaratkan `Ack Set? = Yes`. Ini adalah detail krusial yang memberikan kecerdasan "stateful" pada filter yang "stateless". Aturan ini memastikan bahwa lalu lintas keluar dari port 22 hanya diizinkan jika itu adalah bagian dari koneksi yang sudah ada (yaitu, sebuah balasan, yang ditandai dengan flag ACK aktif). Ini mencegah mesin internal yang mungkin telah diretas untuk memulai koneksi keluar _baru_ dari port 22 ke host eksternal.

> [!cornell] #### Summary
> 
> - Ancaman keamanan jaringan dapat terjadi di setiap lapisan, mulai dari **IP Spoofing** di lapisan jaringan, **SYN Flood** di lapisan transport, hingga serangan skala besar seperti **DDoS** dan penyebaran **Worm**.
> - **Firewall** adalah perangkat pertahanan perimeter fundamental yang menyaring lalu lintas jaringan berdasarkan seperangkat aturan keamanan. Jenis utamanya adalah _stateless filter_ (per paket) dan _stateful filter_ (per koneksi).
> - Konfigurasi firewall yang kuat sering kali melibatkan penggunaan **DMZ (Demilitarized Zone)** untuk mengisolasi server yang dapat diakses publik dari jaringan internal yang krusial, sehingga memberikan lapisan perlindungan tambahan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Di Luar Firewall: IDS/IPS
> 
> - Firewall bertindak seperti penjaga gerbang yang memeriksa "kartu identitas" (header paket). Namun, ia tidak selalu tahu apa isi "koper" yang dibawa. Untuk itu, ada **Intrusion Detection Systems (IDS)** yang memonitor lalu lintas untuk mencari pola serangan yang diketahui (_signature-based_) atau perilaku anomali (_anomaly-based_). Versi yang lebih canggih, **Intrusion Prevention Systems (IPS)**, tidak hanya mendeteksi tetapi juga dapat secara aktif memblokir lalu lintas yang dicurigai berbahaya. Keduanya melengkapi fungsi firewall.
> 
> #### Filosofi Modern: Zero Trust Architecture
> 
> - Paradigma keamanan tradisional bergantung pada konsep "perimeter tepercaya", di mana semua yang ada di dalam firewall dianggap aman. Filosofi modern **"Zero Trust"** menolak ide ini. Dalam arsitektur Zero Trust, tidak ada yang dipercaya secara default, bahkan jika berasal dari dalam jaringan. Setiap permintaan akses ke sumber daya harus diautentikasi dan diotorisasi secara ketat setiap saat. Ini adalah pergeseran dari pertahanan berbasis lokasi (perimeter) ke pertahanan berbasis identitas.
> 
> #### Eksplorasi Mandiri
> 
> - Coba periksa pengaturan firewall di sistem operasi Anda (misalnya, Windows Defender Firewall atau `ufw` di Ubuntu). Anda akan melihat daftar aturan yang mengizinkan aplikasi tertentu (seperti browser web) untuk berkomunikasi keluar, sementara secara default memblokir sebagian besar koneksi masuk yang tidak diminta. Ini adalah contoh firewall berbasis host yang melindungi perangkat Anda secara individual.