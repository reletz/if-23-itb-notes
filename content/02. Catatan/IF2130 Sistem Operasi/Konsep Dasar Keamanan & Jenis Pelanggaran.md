---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Definisi Keamanan
> > - Pentingnya Keamanan
> > - Ancaman vs. Serangan
> > - Penyebab Masalah Keamanan
> > - Pelanggaran Kerahasiaan
> > - Pelanggaran Integritas
> > - Pelanggaran Ketersediaan
> > - Pencurian Layanan
> > - Denial of Service (DoS)
>
> > ### Definisi dan Pentingnya Keamanan
> > Keamanan didefinisikan sebagai ukuran kepercayaan bahwa **integritas (keutuhan) dan data sebuah sistem akan terjaga**. Ini adalah sebuah jaminan bahwa sistem tidak akan dilanggar.
> > - **Analogi:** Anggap sistem komputer sebagai rumah. Keamanan adalah gabungan dari semua elemen yang membuat Anda percaya bahwa rumah itu aman dari penyusup, seperti pintu yang kokoh, jendela terkunci, dan sistem alarm.
> > - **Pentingnya:** Keamanan sangat krusial karena sistem komputer seringkali menyimpan data sensitif (misalnya, data finansial, rahasia dagang, informasi pribadi) dan mengontrol infrastruktur penting. Kegagalan keamanan dapat menyebabkan kerugian finansial, kerusakan reputasi, hingga gangguan operasional yang fatal bagi sebuah organisasi.
> > 
> >  ### Masalah Keamanan (Ancaman vs. Serangan)
> >  - **Sistem Aman:** Sebuah sistem dianggap aman jika semua sumber dayanya digunakan dan diakses **sesuai dengan niat perancangnya** dalam segala situasi. Namun, keamanan absolut (100%) adalah hal yang mustahil dicapai.
> >  - **Ancaman (Threat):** Ini adalah **potensi** terjadinya pelanggaran keamanan. Ini adalah kemungkinan bahaya yang ada.
> > 	 - _Contoh:_ Adanya celah keamanan (kerentanan) pada sebuah software adalah sebuah ancaman.
> >  - **Serangan (Attack):** Ini adalah **upaya aktif** untuk melanggar keamanan. Ini adalah aksi yang mengeksploitasi ancaman.
> > 	 - _Contoh:_ Seseorang menggunakan celah keamanan pada software untuk masuk ke sistem. Serangan bisa disengaja (berbahaya) atau tidak disengaja (misalnya, kesalahan konfigurasi oleh admin).
> > 
> > ### Penyebab Munculnya Masalah Keamanan
> > - **Target Menarik:** Sistem komersial besar adalah target yang sangat menarik karena berisi data berharga yang dapat dicuri dan dijual (misalnya, data kartu kredit).
> > - **Penyalahgunaan Sumber Daya:** Penyerang juga tertarik untuk menggunakan sumber daya komputasi korban untuk aktivitas ilegal, seperti menambang cryptocurrency (bitcoin mining) atau mengirim email spam, sehingga mereka tidak perlu membayar biayanya.
> > - **Dampak Kehilangan Data:** Kehilangan data, baik disengaja atau tidak, dapat secara langsung melumpuhkan fungsi sebuah organisasi.
> >  
> > ### Kategori Pelanggaran Keamanan
> > **Pelanggaran Kerahasiaan (Breach of Confidentiality):**
> > - **Apa itu:** Terjadinya akses atau pembacaan data oleh pihak yang tidak berwenang. Ini adalah serangan terhadap privasi dan kerahasiaan informasi.
> > - **Analogi:** Seseorang mengintip atau membaca surat pribadi Anda tanpa izin.
> > - **Contoh Praktis:** Peretas mencuri database berisi nama pengguna dan password, atau menyadap komunikasi untuk mendapatkan informasi kartu kredit.
> > 
> > **Pelanggaran Integritas (Breach of Integrity):**
> > - **Apa itu:** Modifikasi atau pengubahan data oleh pihak yang tidak berwenang. Tujuannya adalah merusak keakuratan dan keaslian data.
> > - **Analogi:** Seseorang mengubah isi surat Anda sebelum sampai ke penerima.
> > - **Contoh Praktis:** Seorang penyerang mengubah jumlah saldo pada rekening bank, atau menyisipkan kode berbahaya ke dalam kode sumber sebuah program.
> > 
> > **Pelanggaran Ketersediaan (Breach of Availability):**
> > - **Apa itu:** Penghancuran data atau pencegahan akses yang sah ke sumber daya sistem. Tujuannya adalah membuat sistem atau data tidak dapat digunakan.
> > - **Analogi:** Seseorang membakar surat Anda atau mengunci kotak pos Anda sehingga Anda tidak bisa mengakses surat-surat Anda.
> > - **Contoh Praktis:** Serangan Ransomware yang mengenkripsi semua file Anda, atau serangan DDoS yang membuat sebuah website tidak dapat diakses.
> > 
> > **Pencurian Layanan (Theft of Service):**
> > - **Apa itu:** Penggunaan sumber daya komputasi (CPU, storage, jaringan) oleh pihak yang tidak berwenang tanpa izin.
> > - **Analogi:** Tetangga Anda diam-diam menyambungkan kabel listrik ke rumah Anda untuk menyalakan AC mereka, sehingga tagihan listrik Anda membengkak.
> > - **Contoh Praktis:** Penyerang menginstal program di server korban untuk dijadikan tempat penyimpanan file ilegal atau sebagai _relay_ untuk mengirim jutaan email spam.
> > 
> > **Denial of Service (DoS)**
> > - **Apa itu:** Sebuah serangan yang bertujuan **mencegah pengguna yang sah untuk menggunakan sistem**. Ini adalah bentuk ekstrem dari pelanggaran ketersediaan.
> > - **Analogi:** Sekelompok orang berkerumun di depan pintu toko Anda sehingga pelanggan asli tidak bisa masuk.
> > - **Contoh Praktis:** Membanjiri sebuah server web dengan permintaan palsu hingga server tersebut kehabisan sumber daya dan tidak dapat melayani pengguna yang sebenarnya.

> [!cornell] #### Summary
> Keamanan sistem adalah fondasi kepercayaan terhadap integritas dan kerahasiaan data, di mana masalah muncul dari adanya ancaman (potensi bahaya) dan serangan (upaya aktif) yang mengeksploitasi nilai data atau sumber daya sistem. Pelanggaran keamanan dapat diklasifikasikan menjadi lima kategori utama: pelanggaran kerahasiaan (akses tidak sah), integritas (modifikasi tidak sah), ketersediaan (pencegahan akses sah), pencurian layanan (penggunaan sumber daya tidak sah), dan Denial of Service (DoS) yang secara spesifik melumpuhkan layanan bagi pengguna yang sah.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> **Model Keamanan CIA Triad dan Perluasannya (Parkerian Hexad):**
>  - Konsep **Kerahasiaan (Confidentiality), Integritas (Integrity), dan Ketersediaan (Availability)** dikenal sebagai **CIA Triad**. Ini adalah model fundamental dalam keamanan informasi.
>  - Namun, untuk analisis yang lebih mendalam, sering digunakan model yang diperluas, yaitu **Parkerian Hexad**. Model ini menambahkan tiga atribut lagi:
> 	 1. **Possession atau Control:** Mengontrol kepemilikan atau kendali atas informasi. Berbeda dari kerahasiaan, di sini datanya mungkin tidak rahasia, tetapi Anda kehilangan kontrol atasnya (misalnya, data Anda dihapus oleh penyerang, tetapi penyerang juga tidak bisa membacanya).
> 	 2. **Authenticity (Keaslian):** Jaminan bahwa data, transaksi, atau komunikasi berasal dari sumber yang sebenarnya. Ini sangat terkait dengan integritas, tetapi lebih fokus pada identitas sumber.
> 	 3. **Utility (Kegunaan):** Jaminan bahwa data tetap berguna bagi tujuannya. Data bisa saja tersedia, utuh, dan rahasia, tetapi jika formatnya diubah menjadi tidak dapat digunakan oleh perangkat lunak yang sah, maka aspek kegunaannya telah dilanggar.
> 
> **Hubungan Antara Ancaman, Kerentanan, dan Risiko:**
> - Dalam praktik profesional, istilah-istilah ini memiliki makna yang sangat spesifik dan saling terkait dalam sebuah formula manajemen risiko:
> 	- **Ancaman (Threat):** Peristiwa potensial yang dapat menyebabkan kerugian (seperti yang dijelaskan di catatan).
> 	- **Kerentanan (Vulnerability):** Kelemahan atau celah dalam sistem, proses, atau kontrol yang dapat dieksploitasi oleh ancaman. Contoh: software yang belum di-patch.
> 	- **Risiko (Risk):** Potensi kerugian yang dihasilkan ketika sebuah ancaman mengeksploitasi sebuah kerentanan.
> - Formula konseptualnya sering ditulis sebagai: $$ Risiko = Ancaman \times Kerentanan \times Dampak $$
> - Organisasi profesional melacak kerentanan yang diketahui publik melalui database seperti **CVE (Common Vulnerabilities and Exposures)** yang dikelola oleh MITRE Corporation.
>
> **Klasifikasi Serangan Denial of Service (DoS) Lebih Detail:**
>  Serangan DoS dapat diklasifikasikan lebih lanjut berdasarkan lapisan (layer) yang diserang:
>  1. **Volume-based Attacks:** Tujuannya adalah membanjiri jaringan dengan lalu lintas data yang masif untuk menghabiskan seluruh _bandwidth_ yang tersedia. Contoh: **UDP Floods**, **ICMP Floods**.
>  2. **Protocol Attacks:** Tujuannya adalah menghabiskan sumber daya server (bukan bandwidth) dengan mengeksploitasi cara kerja protokol jaringan. Contoh: **SYN Flood**, yang mengeksploitasi proses jabat tangan tiga arah (three-way handshake) pada protokol TCP.
>  3. **Application Layer Attacks:** Tujuannya adalah menghabiskan sumber daya aplikasi dengan mengirimkan permintaan yang terlihat sah tetapi dirancang untuk membebani aplikasi. Contoh: **HTTP Flood** (membanjiri web server dengan permintaan GET/POST) atau serangan **Slowloris** (membuka banyak koneksi dan menjaganya tetap terbuka selama mungkin).
>
> #### Sumber & Referensi Lanjutan:
>
>**Buku Teks:**
>- **"Security Engineering" oleh Ross Anderson:** Dianggap sebagai salah satu karya fundamental dalam bidang rekayasa keamanan, mencakup aspek teknis dan manusia.
>- **"Computer Security: Principles and Practice" oleh William Stallings dan Lawrie Brown:** Buku teks standar di tingkat universitas yang mencakup topik-topik ini secara mendalam.
> **Standar & Database Profesional:**
> - **NIST (National Institute of Standards and Technology):** Publikasi dari NIST, terutama seri SP 800 (Special Publications), adalah rujukan utama untuk praktik keamanan di industri dan pemerintahan.
> - **CVE (Common Vulnerabilities and Exposures):** Kunjungi situs `cve.mitre.org` untuk melihat daftar standar kerentanan keamanan informasi yang diketahui publik.
>#### Eksplorasi Mandiri:
>
> - **Analisis Studi Kasus:** Cari berita tentang insiden pelanggaran data besar (misalnya, Equifax, Yahoo!, atau insiden lokal). Coba analisis insiden tersebut menggunakan kerangka CIA Triad atau Parkerian Hexad. Atribut keamanan mana yang paling jelas dilanggar?
> - **Jelajahi Database CVE:** Buka situs web CVE dan coba cari perangkat lunak yang Anda gunakan sehari-hari (misalnya, browser web Anda, sistem operasi, atau aplikasi favorit). Lihat apakah ada kerentanan yang terdaftar untuk perangkat lunak tersebut. Ini akan memberi Anda gambaran nyata tentang bagaimana kerentanan ditemukan dan dilacak.
> - **Pahami Jejak Digital Anda:** Gunakan alat dasar seperti `ping` dan `traceroute` dari terminal/command prompt Anda ke situs web terkenal seperti `google.com`. Perhatikan "jalur" yang diambil data Anda. Ini adalah langkah pertama untuk memahami jaringan yang menjadi medium bagi banyak serangan.