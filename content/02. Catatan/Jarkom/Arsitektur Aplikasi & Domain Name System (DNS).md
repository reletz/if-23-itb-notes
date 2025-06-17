---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Lapisan Aplikasi: Arsitektur & DNS
> 
> > ## Questions/Cues
> > 
> > - Apa saja arsitektur aplikasi jaringan?
> > - Jelaskan model **Client-Server**.
> > - Jelaskan model **Peer-to-Peer (P2P)**.
> > - Apa itu model **Hybrid**?
> > - Apa itu **Domain Name System (DNS)**?
> > - Mengapa DNS tidak dibuat terpusat?
> > - Jelaskan **hierarki DNS**.
> > - Apa peran _Root, TLD_, dan _Authoritative Server_?
> > - Apa itu _Local DNS Server_?
> > - Bedakan query **iteratif** dan **rekursif**.
> > - Apa saja tipe **DNS Record** yang umum?
> > - Bagaimana cara kerja _DNS Caching_?
> > 
> > ## Reference Points
> > 
> > - Lecture 10, Slides: 583, 585-592, 594, 596-600, 603-604, 606-607
> 
> > ### Arsitektur Aplikasi Jaringan
> > 
> > Ada tiga model arsitektur utama untuk aplikasi jaringan:
> > 
> > 1. **Client-Server:**
> >     - Terdapat sebuah **server** yang selalu aktif (_always-on_), memiliki alamat IP permanen, dan menunggu untuk melayani permintaan.
> >     - Terdapat banyak **klien** yang memulai komunikasi dengan server untuk meminta layanan. Klien bisa saja tidak selalu aktif dan alamat IP-nya bisa dinamis.
> >     - Klien tidak berkomunikasi langsung satu sama lain. Contoh klasik: Web (Browser sebagai klien, Web Server sebagai server).
> > 2. **Peer-to-Peer (P2P):**
> >     - Tidak ada server pusat yang selalu aktif.
> >     - Sistem-sistem akhir (disebut _peers_) berkomunikasi secara langsung satu sama lain.
> >     - Setiap _peer_ dapat bertindak sebagai klien sekaligus server.
> >     - Sangat skalabel tetapi lebih sulit untuk dikelola. Contoh: Gnutella, BitTorrent.
> > 3. **Hybrid:**
> >     - Menggabungkan elemen dari kedua model di atas.
> >     - Contoh: Instant Messaging. Deteksi kehadiran teman (_presence_) dilakukan secara terpusat melalui server, namun percakapan (chat) berlangsung secara P2P langsung antar pengguna.
> > 
> > ### Domain Name System (DNS)
> > 
> > **DNS** adalah sebuah sistem database terdistribusi yang berfungsi sebagai "buku telepon" internet. Tugas utamanya adalah menerjemahkan nama domain yang mudah diingat oleh manusia (misalnya, `www.google.com`) menjadi alamat IP numerik (misalnya, `142.250.66.78`) yang digunakan oleh mesin untuk merutekan paket.
> > 
> > - **Mengapa Terdistribusi?** DNS tidak dibuat terpusat karena alasan:
> >     - **Skalabilitas:** Satu server tidak akan mampu menangani semua query dari seluruh dunia.
> >     - **Ketahanan:** Jika server pusat mati, seluruh internet akan "lumpuh" (_single point of failure_).
> >     - **Jarak & Pemeliharaan:** Database terpusat akan lambat diakses dari lokasi yang jauh dan sulit untuk diperbarui.
> > 
> > ### Hierarki dan Komponen DNS
> > 
> > DNS memiliki struktur hierarkis yang terdistribusi secara global.
> > 
> > - **Komponen Utama Server DNS:**
> >     1. **Root DNS Servers:** Merupakan puncak dari hierarki. Ada 13 server root logis di seluruh dunia. Mereka tidak tahu jawaban akhir, tetapi mereka tahu siapa yang harus ditanya selanjutnya (yaitu, alamat server TLD).
> >     2. **Top-Level Domain (TLD) Servers:** Bertanggung jawab untuk domain tingkat atas seperti `.com`, `.org`, `.net`, dan semua domain negara (`.id`, `.uk`, dll.). Mereka tahu alamat dari server Authoritative untuk domain di bawahnya.
> >     3. **Authoritative DNS Servers:** Server DNS resmi milik sebuah organisasi. Server ini menyimpan catatan (records) nama-ke-IP yang definitif untuk semua host di dalam domainnya (misalnya, server DNS milik universitas menyimpan record untuk semua situs web dan mail server universitas tersebut).
> >     4. **Local DNS Server:** Ini adalah server DNS yang biasanya dioperasikan oleh ISP atau institusi Anda. Ketika komputer Anda ingin mencari alamat IP, ia akan bertanya ke Local DNS Server ini terlebih dahulu. Server ini bertindak sebagai _proxy_ yang akan melakukan pencarian ke dalam hierarki DNS atas nama Anda.
> > 
> > ### Proses Resolusi Nama & Caching
> > 
> > - **Tipe Query:**
> >     - **Recursive Query:** Klien meminta server untuk menyelesaikan seluruh proses pencarian dan memberikan jawaban akhir. Beban pencarian ada pada server yang ditanya. (Biasanya antara host Anda dan Local DNS Server).
> >     - **Iterative Query:** Server yang dikontak hanya memberikan referensi ke server lain yang lebih tahu. "Saya tidak tahu, tapi coba tanyakan ke server ini". (Biasanya antara server-server DNS dalam hierarki).
> > - **DNS Caching:** Untuk efisiensi, setiap server DNS yang menerima sebuah jawaban akan menyimpannya dalam _cache_ untuk sementara waktu. Jika ada permintaan lain untuk nama yang sama, server dapat langsung menjawab dari cache tanpa perlu mengulang seluruh proses query ke hierarki atas. Ini secara drastis mengurangi lalu lintas DNS dan mempercepat waktu respons.
> > 
> > ### DNS Records
> > 
> > Database DNS berisi **Resource Records (RR)**. Beberapa tipe record yang paling umum adalah:
> > 
> > - **Type A:** Memetakan sebuah hostname ke sebuah alamat **IPv4**.
> > - **Type NS:** Menunjukkan _Authoritative Name Server_ untuk sebuah domain.
> > - **Type CNAME:** Membuat sebuah nama alias (misalnya, `www.example.com`) yang menunjuk ke nama kanonis atau nama asli (misalnya, `server1.backup.example.com`).
> > - **Type MX:** Menentukan server email (_Mail Exchange_) untuk sebuah domain.

> [!cornell] #### Summary
> 
> - Arsitektur aplikasi jaringan dapat berupa **Client-Server** (terpusat), **Peer-to-Peer (P2P)** (terdesentralisasi), atau **Hybrid** dari keduanya, masing-masing dengan kelebihan dan kekurangannya.
> - **DNS** adalah sistem database terdistribusi dan hierarkis yang fundamental bagi internet, berfungsi untuk menerjemahkan nama domain menjadi alamat IP melalui hierarki server **Root, TLD, dan Authoritative**.
> - Proses resolusi nama DNS biasanya melibatkan query **iteratif** antar server, dan sangat bergantung pada mekanisme **caching** untuk memberikan respons yang cepat dan efisien.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Keamanan DNS (DNSSEC)
> 
> - Protokol DNS asli tidak dirancang dengan mempertimbangkan keamanan, sehingga rentan terhadap serangan seperti _DNS spoofing_ atau _cache poisoning_, di mana penyerang dapat memalsukan jawaban DNS untuk mengarahkan pengguna ke situs berbahaya. Untuk mengatasi ini, dikembangkan **DNSSEC (DNS Security Extensions)**, yang menggunakan tanda tangan digital kriptografis untuk memverifikasi bahwa data DNS yang diterima adalah asli dan tidak diubah di tengah jalan.
> 
> #### Tipe DNS Record Lainnya
> 
> - Selain tipe-tipe utama, ada banyak tipe record lain, seperti:
>     - **AAAA:** Sama seperti record A, tetapi untuk alamat **IPv6**.
>     - **TXT:** Memungkinkan administrator untuk menyimpan teks biasa dalam DNS. Sering digunakan untuk tujuan verifikasi domain dan kebijakan keamanan email seperti SPF (Sender Policy Framework).
>     - **SRV:** Record layanan yang lebih umum, yang dapat menunjuk ke layanan apa pun pada host dan port tertentu, tidak hanya layanan standar seperti web atau email.
> 
> #### Eksplorasi Mandiri
> 
> - Anda dapat berinteraksi langsung dengan DNS melalui _command line_. Di Windows, gunakan perintah `nslookup`. Di Linux atau macOS, `dig` adalah alat yang lebih powerful.
>     - Coba jalankan: `nslookup www.google.com` (untuk melihat record A)
>     - Coba jalankan: `nslookup -type=NS google.com` (untuk melihat Name Server-nya)
>     - Coba jalankan: `nslookup -type=MX google.com` (untuk melihat Mail Server-nya)