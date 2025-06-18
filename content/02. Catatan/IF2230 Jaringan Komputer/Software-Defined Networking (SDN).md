---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Keamanan & Jaringan Masa Depan: Software-Defined Networking (SDN)
> 
> > ## Questions/Cues
> > 
> > - Apa analogi di balik lahirnya **SDN**?
> > - Apa konsep inti dari SDN?
> > - Jelaskan pemisahan **Control Plane** dan **Data Plane**.
> > - Apa saja tiga lapisan dalam arsitektur SDN?
> > - Apa itu **Network OS (Controller)**?
> > - Apa itu **Southbound API**? Contohnya?
> > - Apa itu **Northbound API**?
> > - Bagaimana cara kerja protokol **OpenFlow**?
> > - Apa itu _Flow Table_?
> > - Apa saja keuntungan utama dari SDN?
> > - Apa konsekuensi SDN bagi industri?
> > 
> > ## Reference Points
> > 
> > - Lecture 12, Slides: 763-765, 767, 771, 773, 778-784, 797-798, 802
> 
> > ### Latar Belakang dan Konsep Inti SDN
> > 
> > **Analogi dengan Revolusi PC:** Kelahiran SDN diilhami oleh transisi industri komputer dari era _mainframe_ ke era PC. Sistem _mainframe_ bersifat **terintegrasi secara vertikal**: perangkat keras, sistem operasi, dan aplikasi semuanya berasal dari satu vendor yang sama, bersifat tertutup, dan lambat berinovasi. Sebaliknya, model PC bersifat **horizontal**: ada antarmuka terbuka yang memungkinkan berbagai vendor untuk membuat perangkat keras, OS, dan aplikasi yang dapat saling bekerja sama, mendorong inovasi yang cepat. SDN bertujuan membawa revolusi serupa ke dunia jaringan yang secara tradisional bersifat tertutup.
> > 
> > **Konsep Inti SDN:** Konsep fundamental dari SDN adalah **memisahkan _Control Plane_ dari _Data Plane_**.
> > 
> > - **Data Plane (Infrastructure Layer):** Ini adalah "otot" jaringan. Tugasnya hanya satu: meneruskan paket data secepat mungkin. Terdiri dari perangkat keras _forwarding_ yang relatif sederhana (misalnya, _switch OpenFlow_).
> > - **Control Plane (Control Layer):** Ini adalah "otak" jaringan. Tugasnya adalah menentukan _aturan_ atau _logika_ tentang bagaimana paket harus diteruskan. Dalam SDN, otak ini dipindahkan dari setiap perangkat jaringan individu dan dipusatkan pada sebuah **SDN Controller**.
> > 
> > ### Arsitektur Software-Defined Networking
> > 
> > Arsitektur SDN umumnya terdiri dari tiga lapisan:
> > 
> > 1. **Infrastructure Layer (Data Plane):** Lapisan terbawah yang berisi perangkat keras jaringan (switch, router) yang tugasnya hanya meneruskan paket sesuai instruksi dari atas.
> > 2. **Control Layer (Control Plane):** Lapisan tengah yang berisi **Network Operating System (Network OS)** atau **SDN Controller**. Controller ini memiliki pandangan global dan terpusat tentang seluruh topologi dan status jaringan.
> > 3. **Application Layer:** Lapisan teratas yang berisi aplikasi jaringan. Aplikasi ini (misalnya, aplikasi routing, _load balancing_, keamanan) berjalan "di atas" controller dan menggunakan informasi dari controller untuk "memprogram" perilaku jaringan secara keseluruhan.
> > 
> > - **API (Application Programming Interface):**
> >     - **Southbound API:** Antarmuka antara _Control Layer_ dan _Infrastructure Layer_. Contoh paling populer adalah **OpenFlow**.
> >     - **Northbound API:** Antarmuka antara _Application Layer_ dan _Control Layer_, memungkinkan aplikasi untuk mengakses data jaringan dan memprogram _control plane_.
> > 
> > ### Protokol OpenFlow: Southbound API
> > 
> > **OpenFlow** adalah standar protokol komunikasi terbuka yang paling umum digunakan sebagai _Southbound API_. Ia mendefinisikan cara bagi controller untuk berkomunikasi dengan dan memprogram perangkat di _data plane_.
> > 
> > - **Cara Kerja:**
> >     1. Controller menggunakan OpenFlow untuk mengisi dan memodifikasi **Flow Table** di dalam setiap switch.
> >     2. Setiap entri dalam _Flow Table_ terdiri dari pasangan **`<Match, Action>`**:
> >         - **Match:** Aturan untuk mencocokkan paket berdasarkan informasi di headernya (misalnya, alamat MAC sumber/tujuan, alamat IP sumber/tujuan, nomor port).
> >         - **Action:** Tindakan yang harus dilakukan jika ada paket yang cocok. Contoh: `teruskan ke port 5`, `buang paket`, `ubah header`, atau `kirim paket ini ke controller untuk instruksi lebih lanjut`.
> >     3. Ketika sebuah paket tiba di switch, switch akan mencari entri yang cocok di _Flow Table_-nya dan melakukan aksi yang sesuai. Jika tidak ada yang cocok, switch akan mengirim paket tersebut ke controller.
> > 
> > ### Keuntungan dan Konsekuensi SDN
> > 
> > - **Keuntungan Utama:**
> >     - **Manajemen Terpusat:** Administrator jaringan dapat melihat dan mengelola seluruh jaringan dari satu titik, menyederhanakan konfigurasi dan pemecahan masalah.
> >     - **Inovasi Cepat:** Fitur dan layanan jaringan baru dapat dikembangkan sebagai perangkat lunak (aplikasi di atas controller) tanpa harus menunggu vendor merilis perangkat keras atau firmware baru.
> >     - **Fleksibilitas dan Programabilitas:** Perilaku jaringan dapat diubah dan diotomatisasi secara dinamis sesuai kebutuhan aplikasi.
> >     - **Potensi Pengurangan Biaya:** Memungkinkan penggunaan perangkat keras komoditas (_white-box switches_) yang lebih murah karena kecerdasan sudah dipindahkan ke controller.
> > - **Konsekuensi bagi Industri:** SDN mengubah model bisnis dari penjualan perangkat keras yang mahal dan tertutup menjadi model yang lebih terbuka dan berorientasi pada perangkat lunak. Ini membuka pintu bagi banyak inovasi dan perusahaan _startup_ baru di bidang perangkat lunak jaringan.

> [!cornell] #### Summary
> 
> - **Software-Defined Networking (SDN)** adalah arsitektur jaringan revolusioner yang **memisahkan _control plane_ (otak) dari _data plane_ (otot)**, dan memusatkan kecerdasan jaringan pada sebuah **SDN Controller**.
> - Arsitektur SDN terdiri dari tiga lapisan: **Aplikasi**, **Kontrol (Controller)**, dan **Infrastruktur (Switch)**. Komunikasi antara Controller dan Switch diatur oleh **Southbound API** seperti protokol **OpenFlow**.
> - Dengan memungkinkan jaringan untuk diprogram melalui perangkat lunak, SDN menawarkan keuntungan berupa **manajemen terpusat, inovasi yang lebih cepat, dan fleksibilitas tinggi**, yang secara fundamental mengubah cara jaringan dirancang dan dioperasikan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Konsep Terkait: Network Function Virtualization (NFV)
> 
> - NFV adalah konsep yang sering berjalan beriringan dengan SDN. Jika SDN memisahkan kontrol dari _forwarding_, NFV bertujuan untuk **mem-virtualisasi fungsi-fungsi jaringan** yang sebelumnya berjalan di perangkat keras khusus—seperti firewall, _load balancer_, atau IDS—agar dapat berjalan sebagai perangkat lunak di server komoditas standar. Kombinasi SDN dan NFV memungkinkan terciptanya jaringan yang sangat dinamis, fleksibel, dan otomatis.
> 
> #### Tantangan SDN
> 
> - Meskipun memiliki banyak keuntungan, SDN juga memiliki tantangan. **Skalabilitas dan ketahanan (_resilience_) dari controller** menjadi sangat krusial. Jika controller mati, seluruh jaringan di bawahnya bisa "buta" dan berhenti berfungsi. **Keamanan** juga menjadi perhatian utama, karena controller yang terpusat menjadi target serangan yang sangat bernilai tinggi.
> 
> #### Eksplorasi Mandiri
> 
> - Cara terbaik untuk memahami SDN adalah dengan mencobanya. Gunakan simulator jaringan seperti **Mininet**, yang memungkinkan Anda membuat topologi jaringan virtual lengkap (switch, host, controller) di dalam satu mesin Linux. Anda dapat menjalankan controller OpenFlow sumber terbuka (seperti Ryu atau POX) dan menulis skrip Python sederhana untuk memprogram perilaku switch, misalnya, membuat switch bertindak seperti hub, switch Layer 2, atau bahkan router dasar. Ini memberikan pengalaman langsung merasakan kekuatan pemrograman jaringan.