---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Jaringan Nirkabel: Dasar-dasar & Wi-Fi (802.11)
> 
> > ## Questions/Cues
> > 
> > - Apa saja elemen dasar jaringan nirkabel?
> > - Bedakan mode **infrastruktur** dan mode **ad hoc**.
> > - Apa saja tantangan unik pada link nirkabel?
> > - Jelaskan _Hidden Terminal Problem_.
> > - Apa itu arsitektur **802.11 (Wi-Fi)**?
> > - Apa itu _BSS_, _BSA_, dan _ESS_?
> > - Bedakan _SSID_ dan _BSSID_.
> > - Bagaimana sebuah perangkat terhubung ke AP?
> > - Apa itu **CSMA/CA**? Mengapa CA, bukan CD?
> > - Jelaskan proses dasar CSMA/CA (DIFS, SIFS).
> > - Apa tujuan mekanisme **RTS/CTS**?
> > - Bagaimana skema pengalamatan pada frame 802.11?
> > 
> > ## Reference Points
> > 
> > - Lecture 9, Slides: 448-453, 457, 459, 497-510, 526-533
> 
> > ### Elemen dan Mode Jaringan Nirkabel
> > 
> > Jaringan nirkabel terdiri dari beberapa elemen dasar:
> > 
> > - **Wireless Hosts:** Perangkat pengguna akhir seperti laptop, smartphone, yang menjalankan aplikasi.
> > - **Base Station:** Titik pusat yang terhubung ke jaringan kabel dan berfungsi sebagai perantara (relay) untuk host nirkabel. Contohnya adalah _Access Point_ (AP) pada Wi-Fi atau menara seluler.
> > - **Wireless Link:** Media komunikasi yang menggunakan gelombang radio untuk menghubungkan host ke base station atau host ke host.
> > 
> > Terdapat dua mode operasi utama:
> > 
> > 1. **Infrastructure Mode:** Host nirkabel berkomunikasi melalui sebuah _base station_ (AP) yang terhubung ke infrastruktur jaringan kabel yang lebih besar (misalnya, internet). Mode ini mendukung _handoff_, yaitu perpindahan koneksi host dari satu AP ke AP lain secara mulus.
> > 2. **Ad Hoc Mode:** Tidak ada _base station_. Host nirkabel berkomunikasi langsung satu sama lain (_peer-to-peer_) dalam jangkauan sinyal mereka. Mereka harus mengorganisir dan merutekan lalu lintas di antara mereka sendiri.
> >
> > ![[Pasted image 20250618200235.png]]
> > 
> > Taksonomi Jaringan Nirkabel:
> > 
> > |**Kategori**|**Single Hop**|**Multiple Hops**|
> > |---|---|---|
> > |**Berinfrastruktur** <br>(mis. Access Point)|Host terhubung ke stasiun pangkalan (WiFi, WiMAX, seluler) yang terhubung ke Internet yang lebih besar|Host mungkin harus meneruskan melalui beberapa node nirkabel untuk terhubung ke Internet yang lebih besar: jaringan mesh|
> > |**Tanpa Infrastruktur**|Tidak ada stasiun pangkalan, tidak ada koneksi ke Internet yang lebih besar (Bluetooth, jaringan ad hoc)|Tidak ada stasiun pangkalan, tidak ada koneksi ke Internet yang lebih besar. Mungkin harus meneruskan untuk mencapai node nirkabel tertentu (MANET, VANET)|
> > 
> > ### Tantangan Unik pada Link Nirkabel
> > 
> > Komunikasi nirkabel jauh lebih sulit daripada komunikasi kabel karena beberapa faktor:
> > 
> > - **Atenuasi (Decreased Signal Strength):** Sinyal radio melemah secara signifikan seiring dengan bertambahnya jarak dan saat menembus materi (seperti dinding).
> >   ![[Pasted image 20250618203321.png]]
> >
> > - **Interferensi:** Gangguan dari sumber radio lain yang menggunakan spektrum frekuensi yang sama (misalnya, microwave, perangkat Bluetooth, atau jaringan Wi-Fi tetangga).
> > - **Multipath Propagation:** Sinyal radio memantul dari berbagai objek (gedung, tanah) dan tiba di penerima melalui beberapa jalur dengan waktu yang sedikit berbeda. Hal ini dapat menyebabkan sinyal asli saling mengganggu (interferensi).
> > - **Hidden Terminal Problem:** Sebuah masalah klasik di mana dua host (misal A dan C) berada di luar jangkauan satu sama lain, namun keduanya berada dalam jangkauan AP (B) yang sama. Akibatnya, A dan C mungkin mengirim data ke B secara bersamaan tanpa menyadari keberadaan satu sama lain, yang menyebabkan **tabrakan (collision)** di AP.
> >   ![[Pasted image 20250618203337.png]]
> >
> > ### WLAN
> > ![[Pasted image 20250618204331.png]]
> > ![[Pasted image 20250618204836.png]]
> > ### Arsitektur 802.11 (Wi-Fi)
> >  ![[Pasted image 20250618203400.png]]
> > - **BSS (Basic Service Set):** Adalah unit dasar dari sebuah WLAN, terdiri dari satu **Access Point (AP)** dan satu atau lebih stasiun (STA) atau klien. Area cakupan dari sebuah BSS disebut **BSA (Basic Service Area)**.
> > - **DS (Distribution System):** Adalah mekanisme atau infrastruktur yang digunakan untuk menghubungkan beberapa Access Point (AP) dalam satu jaringan yang lebih besar. Ia bertindak sebagai "tulang punggung" (backbone) yang memungkinkan komunikasi antar BSS (Basic Service Set) yang berbeda.
> > - **ESS (Extended Service Set):** Merupakan gabungan dari dua atau lebih BSS yang terhubung melalui sebuah **Distribution System (DS)**, yang biasanya berupa jaringan kabel. Dari sudut pandang pengguna, seluruh ESS terlihat seperti satu jaringan tunggal yang luas. ESS memiliki satu nama jaringan (SSID) yang sama untuk semua AP di dalamnya. Tujuan utamanya adalah untuk memfasilitasi **roaming**, yaitu kemampuan pengguna untuk berpindah dari area cakupan satu AP ke AP lain secara mulus tanpa kehilangan koneksi
> > - **SSID & BSSID:**
> >     - **BSSID (Basic Service Set Identifier):** Alamat unik untuk sebuah BSS, yang pada praktiknya adalah alamat MAC dari AP tersebut.
> >     - **SSID (Service Set Identifier):** Nama jaringan Wi-Fi yang bisa dibaca manusia (misalnya, "WarkopAsik"). SSID inilah yang kita lihat saat mencari jaringan Wi-Fi.
> >  - **Virtual Access Point (VAP):** adalah sebuah fitur yang memungkinkan satu perangkat AP fisik untuk beroperasi seolah-olah ia adalah beberapa AP yang terpisah. VAP bertujuan untuk membuat beberapa WLAN (jaringan nirkabel) yang terisolasi secara logis menggunakan satu perangkat keras yang sama
> > 
> > ![[Pasted image 20250618205313.png]]
> >
> > ### Menemukan dan Terhubung ke Jaringan Wi-Fi
> > Sebuah host (STA) harus terlebih dahulu menemukan dan melakukan asosiasi dengan sebuah Access Point (AP). Ada dua cara utama untuk melakukan ini.
> > 1. **Passive Scanning:** > &#9;- AP secara periodik mengirimkan frame **Beacon** yang berisi informasi tentang AP tersebut (termasuk SSID dan BSSID). > &#9;- Host akan memindai semua channel, mendengarkan Beacon, lalu mengirim **Association Request** ke AP yang dipilih. > &#9;- AP akan merespons dengan **Association Response** untuk menyelesaikan koneksi.
> > 2. **Active Scanning:** > &#9;- Host menyiarkan (broadcast) sebuah frame **Probe Request** untuk mencari jaringan. > &#9;- Semua AP yang menerima permintaan ini akan merespons dengan **Probe Response**. > &#9;- Host kemudian memilih AP dan melanjutkan dengan proses **Association Request/Response** seperti pada passive scanning.
> > 
> > ### Protokol Akses Media: CSMA/CA
> > 
> > **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)** adalah protokol yang digunakan oleh perangkat Wi-Fi untuk berbagi media udara.
> > 
> > - **Mengapa Collision Avoidance (CA), bukan Collision Detection (CD)?**
> >     Tidak seperti Ethernet (kabel), di lingkungan nirkabel sangat sulit bagi sebuah stasiun untuk mendeteksi tabrakan saat ia sedang aktif mengirim data. Ini karena daya sinyal yang ia pancarkan jauh lebih kuat daripada sinyal lemah yang mungkin ia terima dari stasiun lain. Oleh karena itu, strateginya adalah menghindari tabrakan sebelum terjadi, bukan mendeteksinya setelah terjadi.
> >     
> > - **Proses Dasar CSMA/CA:**
> >     
> >     1. **Listen Before Talk:** Sebelum mengirim, stasiun akan "mendengarkan" channel.
> >     2. Jika channel kosong selama periode waktu tertentu yang disebut **DIFS (Distributed Inter-Frame Space)**, stasiun akan mengirimkan seluruh frame datanya.
> >     3. Penerima, setelah berhasil menerima frame, akan menunggu sebentar (periode **SIFS**, yang lebih pendek dari DIFS) lalu mengirimkan frame **ACK (Acknowledgment)**.
> >     4. Jika pengirim tidak menerima ACK dalam waktu tertentu (misalnya karena terjadi tabrakan), ia akan menganggap frame hilang dan akan mencoba lagi setelah menunggu selama periode _random backoff_.
> >  
> >  ![[Pasted image 20250618205552.png]]
> > 
> > ### Optimisasi: Mekanisme RTS/CTS
> > 
> > Mekanisme ini adalah cara opsional untuk lebih lanjut menghindari tabrakan, terutama untuk frame data yang besar dan untuk mengatasi _Hidden Terminal Problem_.
> > 
> > - **Proses:**
> >     1. Stasiun pengirim mengirim frame **RTS (Request to Send)** yang kecil ke AP untuk "memesan" channel.
> >     2. AP merespons dengan frame **CTS (Clear to Send)** yang dapat didengar oleh semua stasiun di dalam BSS.
> >     3. Semua stasiun lain yang mendengar CTS akan "diam" dan tidak akan mengirim data selama durasi yang ditentukan dalam frame CTS.
> >     4. Stasiun pengirim asli kini dapat mengirim frame datanya yang panjang dengan risiko tabrakan yang jauh lebih kecil.
> >     
> >  ![[Pasted image 20250618205420.png]]
> >   
> >  ### Struktur Frame 802.11: Pengalamatan
> >  ![[Pasted image 20250618205454.png]]
> > Frame 802.11 memiliki hingga **empat field alamat** (masing-masing 6 byte), berbeda dengan frame Ethernet yang hanya punya dua. Ini diperlukan untuk menangani skenario di mode infrastruktur.
> > - **Address 1:** Alamat MAC dari penerima nirkabel langsung (misalnya, AP). 
> > - **Address 2:** Alamat MAC dari pengirim nirkabel langsung (misalnya, host). 
> > - **Address 3:** Alamat MAC dari perangkat di jaringan kabel yang menjadi tujuan akhir atau sumber awal (misalnya, router). 
> > - **Address 4:** Hanya digunakan dalam mode ad-hoc atau sistem distribusi nirkabel.
> > 
> > **Contoh Kasus (Host H1 mengirim paket ke Router R1 melalui AP):**
> > ```
> > - **Address 1 (Penerima nirkabel):** MAC Address AP.
> > - **Address 2 (Pengirim nirkabel):** MAC Address H1.
> > - **Address 3 (Tujuan akhir):** MAC Address R1.
> > ```
> > 
> > **Lebih detail:**
> > ![[Pasted image 20250618205530.png]]
> > 
> > ### Personal Area Network (802.15)
> > 802.15 adalah standar untuk Personal Area Network (PAN) yang dirancang khusus untuk komunikasi jarak pendek antar perangkat personal. Teknologi ini berkembang dari spesifikasi Bluetooth dan ditujukan untuk menggantikan kabel-kabel penghubung perangkat seperti mouse, keyboard, dan headphone.
> > 
> > **Jangkauan dan Coverage**
> > - **Diameter maksimal**: Kurang dari 10 meter
> > - **Area coverage**: Sangat terbatas, hanya untuk area personal di sekitar pengguna
> > - **Radius coverage**: Membentuk lingkaran kecil di sekitar perangkat master
> > 
> > **Arsitektur Jaringan**
> > - **Tipe**: Ad hoc - tidak memerlukan infrastruktur khusus
> > - **Topologi**: Master/Slave configuration
> > - **Struktur**: Piconet (jaringan kecil dengan satu master dan beberapa slave)
> > 
> > **Sistem Master/Slave**
> > - **Slave devices**: Harus meminta izin kepada master sebelum mengirim data
> > - **Master device**: Mengontrol akses medium dan memberikan izin pengiriman
> > - **Manajemen perangkat**: Perangkat dapat "parkir" (inactive) ketika tidak digunakan
> > 
> > ![[Pasted image 20250618210831.png]]
> > 
> > **Frekuensi dan Kecepatan**
> > - **Frekuensi operasi**: 2.4-2.5 GHz radio band
> > - **Kecepatan maksimal**: Hingga 721 kbps
> > - **Teknologi dasar**: Evolved from Bluetooth specification
> > 
> > **Penggunaan Praktis**
> >  - **Pengganti kabel**: Mouse nirkabel, keyboard nirkabel, headphone Bluetooth
> >  - **Komunikasi perangkat**: Transfer file antar smartphone, laptop, dan perangkat mobile
> >  - **Sinkronisasi data**: Antara perangkat personal seperti PDA, smartphone, dan komputer
> > 
> > **Keunggulan 802.15**
> > 1. **Hemat energi**: Konsumsi daya rendah cocok untuk perangkat battery-powered
> > 2. **Mudah setup**: Tidak memerlukan konfigurasi infrastruktur yang kompleks
> > 3. **Cost-effective**: Biaya implementasi rendah
> > 4. **Plug-and-play**: Mudah untuk pairing dan connecting perangkat
> > 5. **Mobilitas tinggi**: Sangat portable dan fleksibel untuk penggunaan personal
> > 
> > **Kelemahan 802.15**
> > - **Jangkauan terbatas**: Hanya efektif dalam radius sangat pendek
> > - **Kecepatan rendah**: Tidak cocok untuk transfer data besar
> > - **Interferensi**: Beroperasi di frekuensi 2.4 GHz yang crowded
> > - **Kapasitas terbatas**: Jumlah perangkat dalam satu piconet dibatasi
> > 
> > ### Perbandingan 802.11 vs 802.15
> > |**Aspek**|**802.11 (WiFi)**|**802.15 (Personal Area Network)**|
> > |---|---|---|
> > |**Jangkauan**|Hingga 100+ meter|Kurang dari 10 meter diameter|
> > |**Tipe Jaringan**|WLAN (Wireless LAN)|PAN (Personal Area Network)|
> > |**Infrastruktur**|Menggunakan Access Point|Ad hoc: tanpa infrastruktur|
> > |**Arsitektur**|Infrastructure mode dengan AP sebagai pusat|Master/Slave: <br>• Slave meminta izin untuk mengirim (ke master) <br>• Master memberikan permintaan|
> > |**Penggunaan Utama**|Koneksi internet nirkabel, jaringan lokal|Pengganti kabel (mouse, keyboard, headphone)|
> > |**Teknologi Dasar**|Standar WiFi|Berkembang dari spesifikasi Bluetooth|
> > |**Frekuensi**|2.4 GHz, 5 GHz, 6 GHz|2.4-2.5 GHz|
> > |**Kecepatan**|Hingga beberapa Gbps (tergantung standar)|Hingga 721 kbps|
> > |**Manajemen Perangkat**|Perangkat terhubung ke AP|Perangkat parkir (inactive) saat tidak digunakan|
> > |**Topologi**|Star (dengan AP sebagai pusat)|Piconet (master-slave)|

> [!cornell] #### Summary
> 
> - Jaringan nirkabel memiliki tantangan unik seperti **atenuasi sinyal, interferensi, dan _Hidden Terminal Problem_**, yang tidak ditemui pada jaringan kabel.
> - Arsitektur dasar Wi-Fi (802.11) terdiri dari **BSS** (satu Access Point) yang dapat digabungkan menjadi **ESS** (beberapa AP untuk roaming), di mana setiap jaringan diidentifikasi oleh nama **SSID**.
> - Untuk berbagi media udara secara adil, Wi-Fi menggunakan protokol **CSMA/CA (Collision Avoidance)** yang "mendengarkan sebelum berbicara", dan dapat dioptimalkan dengan mekanisme **RTS/CTS** untuk meminimalkan tabrakan pada pengiriman data berukuran besar.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Evolusi Standar Wi-Fi
> 
> - Teknologi Wi-Fi telah berkembang pesat untuk mencapai kecepatan yang lebih tinggi dan efisiensi yang lebih baik. Evolusi ini ditandai oleh standar-standar seperti: 802.11b (11 Mbps) → 802.11a/g (54 Mbps) → 802.11n (Wi-Fi 4) → 802.11ac (Wi-Fi 5) → 802.11ax (Wi-Fi 6). Inovasi kunci seperti **MIMO** (menggunakan beberapa antena sekaligus) dan **OFDMA** (membagi channel untuk beberapa pengguna secara bersamaan) adalah pendorong utama peningkatan performa ini.
> 
> #### Eksplorasi Mandiri
> 
> - Gunakan aplikasi penganalisa Wi-Fi di laptop atau smartphone Anda (misalnya, _WiFi Analyzer_ untuk Android atau _inSSIDer_ untuk PC). Anda dapat melihat jaringan Wi-Fi di sekitar Anda, channel yang mereka gunakan, kekuatan sinyal (dalam dBm), dan BSSID mereka. Ini adalah cara yang bagus untuk melihat secara praktis bagaimana beberapa BSS berbagi ruang udara yang terbatas dan mengapa interferensi bisa menjadi masalah.