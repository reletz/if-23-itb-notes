---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Jaringan Nirkabel: Jaringan Seluler (2G hingga 4G LTE)
> 
> > ## Questions/Cues
> > 
> > - Apa saja komponen arsitektur jaringan seluler?
> > - Apa itu **sel (cell)** dan **Base Station (BS)**?
> > - Apa fungsi **Mobile Switching Center (MSC)**?
> > - Bagaimana spektrum radio dibagi?
> > - Bagaimana arsitektur jaringan **2G (voice)**?
> > - Bagaimana arsitektur jaringan **3G (voice+data)**?
> > - Apa peran **SGSN** dan **GGSN**?
> > - Apa perubahan besar pada arsitektur **4G LTE**?
> > - Apa itu _Evolved Packet Core (EPC)_?
> > - Apa peran **MME**, **S-GW**, dan **P-GW**?
> > - Jelaskan konsep "all-IP core".
> > - Bagaimana QoS diterapkan di LTE?
> > 
> > ## Reference Points
> > 
> > - Lecture 9, Slides: 542, 544-550, 553
> 
> > ### Arsitektur Dasar Jaringan Seluler
> > 
> > Arsitektur seluler dirancang untuk menyediakan konektivitas bagi pengguna yang bergerak dalam area geografis yang luas.
> > 
> > - **Komponen Dasar:**
> >     
> >     - **Cell:** Area cakupan geografis yang dilayani oleh satu stasiun pemancar. Jaringan seluler merupakan kumpulan dari banyak sel yang saling tumpang tindih.
> >     - **Base Station (BS):** Dikenal juga sebagai menara seluler. Berfungsi sebagai _access point_ untuk perangkat seluler di dalam sebuah sel.
> >     - **Mobile Switching Center (MSC):** Pusat dari beberapa BS. Bertugas mengelola pengaturan panggilan, menghubungkan jaringan seluler ke jaringan telepon kabel publik (PSTN), dan menangani _handoff_ (perpindahan pengguna dari satu sel ke sel lain).
> > - Pembagian Spektrum Radio:
> >     
> >     Untuk melayani banyak pengguna sekaligus dalam spektrum frekuensi yang terbatas, digunakan beberapa teknik, di antaranya:
> >     
> >     - **FDMA/TDMA:** Frekuensi dibagi menjadi beberapa channel (FDMA), dan setiap channel dibagi lagi menjadi slot waktu (TDMA). Setiap pengguna mendapat alokasi slot waktu pada channel tertentu.
> >     - **CDMA:** Semua pengguna menggunakan frekuensi yang sama pada waktu yang sama, namun dipisahkan oleh kode matematis yang unik.
> > 
> > ### Evolusi Arsitektur: Dari 2G ke 3G
> > 
> > - Jaringan 2G (Hanya Suara - Voice-centric):
> >     
> >     Arsitektur 2G (seperti GSM) dirancang utamanya untuk layanan suara. Inti jaringannya berbasis circuit-switching. Komponen utamanya adalah Base Station System (BSS) yang terhubung ke MSC. MSC inilah yang menjadi pusat kendali panggilan.
> >     
> > - Jaringan 3G (Suara + Data):
> >     
> >     Perubahan kunci pada 3G adalah penambahan jaringan inti data berbasis packet-switching yang beroperasi secara paralel dengan jaringan inti suara yang sudah ada.
> >     
> >     - Jaringan suara (berbasis MSC) tetap dipertahankan.
> >     - Jaringan data baru, disebut **GPRS Core**, ditambahkan dengan dua komponen utama:
> >         1. **SGSN (Serving GPRS Support Node):** Berfungsi seperti MSC untuk data. Ia melacak lokasi perangkat, mengelola sesi data, dan melakukan autentikasi.
> >         2. **GGSN (Gateway GPRS Support Node):** Berfungsi sebagai gerbang (_gateway_) yang menghubungkan jaringan data seluler internal ke jaringan eksternal seperti internet. Ia juga yang mengalokasikan alamat IP untuk perangkat pengguna.
> > 
> > ### Arsitektur 4G LTE: All-IP Core
> > 
> > 4G LTE membawa perubahan paradigma besar dengan memperkenalkan arsitektur yang lebih datar dan sepenuhnya berbasis IP. Tidak ada lagi pemisahan antara jaringan inti suara dan data.
> > 
> > - **Evolved Packet Core (EPC):** Ini adalah nama untuk arsitektur jaringan inti 4G yang serba IP (_All-IP Core_). Semua lalu lintas, baik data maupun suara (yang dikonversi menjadi VoIP), diperlakukan sebagai paket IP dan dilewatkan melalui EPC.
> >     
> > - **Komponen Kunci EPC:**
> >     
> >     - **MME (Mobility Management Entity):** Dianggap sebagai "otak" dari EPC. MME tidak menangani data pengguna, tetapi hanya sinyal kontrol. Tugasnya adalah mengelola status koneksi perangkat (aktif/idle), melakukan _paging_, melacak lokasi, dan menangani autentikasi.
> >     - **S-GW (Serving Gateway):** Titik jangkar (_anchor point_) untuk mobilitas. Bertugas merutekan dan meneruskan paket data pengguna di dalam jaringan operator. Saat pengguna berpindah antar _base station_ (eNodeB), S-GW memastikan koneksi tetap terjaga.
> >     - **P-GW (Packet Data Network Gateway):** Gerbang akhir antara jaringan EPC dan internet. Bertugas mengalokasikan alamat IP untuk perangkat, menerapkan kebijakan, dan memfilter paket.
> >     - **HSS (Home Subscriber Server):** Database terpusat yang menyimpan semua informasi terkait pelanggan, seperti profil layanan dan informasi keamanan.
> > 
> > ### Kualitas Layanan (QoS) di LTE
> > 
> > Karena arsitektur LTE dirancang untuk menangani berbagai jenis layanan (suara, video, web) di atas infrastruktur IP yang sama, QoS menjadi fitur yang sangat penting.
> > 
> > - QoS di LTE diimplementasikan melalui **QCI (QoS Class Identifier)**. Setiap aliran data (disebut _bearer_) diberi nilai QCI dari 1 hingga 9.
> > - Nilai QCI ini menentukan **prioritas, budget penundaan (delay budget), dan tingkat toleransi kehilangan paket (packet error loss rate)**.
> > - Contoh: Panggilan suara (VoLTE) akan mendapatkan QCI dengan prioritas tertinggi dan budget delay terketat, sedangkan Browse web biasa akan mendapatkan QCI dengan prioritas lebih rendah.

> [!cornell] #### Summary
> 
> - Jaringan seluler berevolusi dari arsitektur **2G** yang fokus pada suara, ke **3G** yang menambahkan jaringan data paralel (dengan komponen **SGSN/GGSN**), hingga **4G LTE** yang menyatukan semuanya dalam arsitektur **All-IP Core** yang disebut **EPC**.
> - Arsitektur **4G LTE** lebih sederhana dan datar, dengan komponen inti yang memisahkan fungsi kontrol (**MME**) dan fungsi data (**S-GW** untuk mobilitas internal dan **P-GW** sebagai gerbang ke internet).
> - Semua lalu lintas di 4G, termasuk suara, diperlakukan sebagai paket IP. **Kualitas Layanan (QoS)** dikelola secara ketat melalui nilai **QCI** untuk memastikan performa yang sesuai bagi berbagai jenis aplikasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Konsep "Bearer" di LTE
> 
> - Di dunia LTE, sebuah koneksi logis dari perangkat pengguna ke P-GW untuk layanan tertentu disebut _bearer_. Setiap _bearer_ memiliki parameter QoS (seperti nilai QCI dan bit rate) yang terkait dengannya. Sebuah perangkat dapat memiliki beberapa _bearer_ yang aktif secara bersamaan, misalnya, satu _default bearer_ untuk koneksi internet "selalu aktif" dan satu _dedicated bearer_ dengan QoS tinggi yang dibuat khusus saat ada panggilan VoLTE (Voice over LTE).
> 
> #### Tunneling di Jaringan Seluler
> 
> - Paket IP dari perangkat pengguna tidak dirutekan secara langsung di jaringan inti seluler. Sebaliknya, paket tersebut "dibungkus" atau di-**tunnel** di dalam protokol lain (seperti **GTP - GPRS Tunneling Protocol**) saat bergerak dari _base station_ (eNodeB) ke S-GW dan P-GW. Mekanisme tunneling ini memungkinkan jaringan inti untuk mengelola mobilitas dan menerapkan kebijakan tanpa harus memeriksa atau mengubah paket IP asli dari pengguna.
> 
> #### Menuju 5G
> 
> - 5G melanjutkan evolusi arsitektur serba IP ini dengan membuatnya lebih fleksibel dan tervirtualisasi. Konsep inti di 5G adalah **Service-Based Architecture (SBA)** dan **Network Slicing**, yang memungkinkan operator untuk membuat beberapa "irisan" jaringan virtual di atas satu infrastruktur fisik yang sama, di mana setiap irisan dioptimalkan untuk kasus penggunaan yang berbeda (misalnya, satu irisan untuk mobile broadband, satu untuk IoT latensi rendah, dan satu lagi untuk komunikasi kritis).