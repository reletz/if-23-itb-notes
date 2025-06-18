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
> > ### Tantangan Unik pada Link Nirkabel
> > 
> > Komunikasi nirkabel jauh lebih sulit daripada komunikasi kabel karena beberapa faktor:
> > 
> > - **Atenuasi (Decreased Signal Strength):** Sinyal radio melemah secara signifikan seiring dengan bertambahnya jarak dan saat menembus materi (seperti dinding).
> > - **Interferensi:** Gangguan dari sumber radio lain yang menggunakan spektrum frekuensi yang sama (misalnya, microwave, perangkat Bluetooth, atau jaringan Wi-Fi tetangga).
> > - **Multipath Propagation:** Sinyal radio memantul dari berbagai objek (gedung, tanah) dan tiba di penerima melalui beberapa jalur dengan waktu yang sedikit berbeda. Hal ini dapat menyebabkan sinyal asli saling mengganggu (interferensi).
> > - **Hidden Terminal Problem:** Sebuah masalah klasik di mana dua host (misal A dan C) berada di luar jangkauan satu sama lain, namun keduanya berada dalam jangkauan AP (B) yang sama. Akibatnya, A dan C mungkin mengirim data ke B secara bersamaan tanpa menyadari keberadaan satu sama lain, yang menyebabkan **tabrakan (collision)** di AP.
> > 
> > ### Arsitektur 802.11 (Wi-Fi)
> > 
> > - **BSS (Basic Service Set):** Adalah unit dasar dari sebuah WLAN, terdiri dari satu **Access Point (AP)** dan satu atau lebih stasiun (STA) atau klien. Area cakupan dari sebuah BSS disebut **BSA (Basic Service Area)**.
> > - **ESS (Extended Service Set):** Merupakan gabungan dari dua atau lebih BSS yang terhubung melalui sebuah **Distribution System (DS)**, yang biasanya berupa jaringan kabel. ESS memungkinkan pengguna untuk berpindah (_roaming_) antar AP dalam satu jaringan besar tanpa terputus.
> > - **SSID & BSSID:**
> >     - **BSSID (Basic Service Set Identifier):** Alamat unik untuk sebuah BSS, yang pada praktiknya adalah alamat MAC dari AP tersebut.
> >     - **SSID (Service Set Identifier):** Nama jaringan Wi-Fi yang bisa dibaca manusia (misalnya, "WarkopAsik"). SSID inilah yang kita lihat saat mencari jaringan Wi-Fi.
> > 
> > ### Protokol Akses Media: CSMA/CA
> > 
> > **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)** adalah protokol yang digunakan oleh perangkat Wi-Fi untuk berbagi media udara.
> > 
> > - Mengapa Collision Avoidance (CA), bukan Collision Detection (CD)?
> >     
> >     Tidak seperti Ethernet (kabel), di lingkungan nirkabel sangat sulit bagi sebuah stasiun untuk mendeteksi tabrakan saat ia sedang aktif mengirim data. Ini karena daya sinyal yang ia pancarkan jauh lebih kuat daripada sinyal lemah yang mungkin ia terima dari stasiun lain. Oleh karena itu, strateginya adalah menghindari tabrakan sebelum terjadi, bukan mendeteksinya setelah terjadi.
> >     
> > - **Proses Dasar CSMA/CA:**
> >     
> >     1. **Listen Before Talk:** Sebelum mengirim, stasiun akan "mendengarkan" channel.
> >     2. Jika channel kosong selama periode waktu tertentu yang disebut **DIFS (Distributed Inter-Frame Space)**, stasiun akan mengirimkan seluruh frame datanya.
> >     3. Penerima, setelah berhasil menerima frame, akan menunggu sebentar (periode **SIFS**, yang lebih pendek dari DIFS) lalu mengirimkan frame **ACK (Acknowledgment)**.
> >     4. Jika pengirim tidak menerima ACK dalam waktu tertentu (misalnya karena terjadi tabrakan), ia akan menganggap frame hilang dan akan mencoba lagi setelah menunggu selama periode _random backoff_.
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

> [!cornell] #### Summary
> 
> - Jaringan nirkabel memiliki tantangan unik seperti **atenuasi sinyal, interferensi, dan _Hidden Terminal Problem_**, yang tidak ditemui pada jaringan kabel.
> - Arsitektur dasar Wi-Fi (802.11) terdiri dari **BSS** (satu Access Point) yang dapat digabungkan menjadi **ESS** (beberapa AP untuk roaming), di mana setiap jaringan diidentifikasi oleh nama **SSID**.
> - Untuk berbagi media udara secara adil, Wi-Fi menggunakan protokol **CSMA/CA (Collision Avoidance)** yang "mendengarkan sebelum berbicara", dan dapat dioptimalkan dengan mekanisme **RTS/CTS** untuk meminimalkan tabrakan pada pengiriman data berukuran besar.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Struktur Alamat Frame 802.11 yang Kompleks
> 
> - Berbeda dengan frame Ethernet yang hanya memiliki Alamat MAC Sumber dan Tujuan, frame 802.11 bisa memiliki hingga **empat field alamat**. Kompleksitas ini diperlukan untuk menangani berbagai skenario, seperti komunikasi dari host ke AP, lalu dari AP ke router di jaringan kabel. Secara umum:
>     - **Alamat 1:** Penerima nirkabel langsung (misalnya, MAC AP).
>     - **Alamat 2:** Pengirim nirkabel langsung (misalnya, MAC laptop Anda).
>     - **Alamat 3:** Alamat MAC tujuan akhir di luar segmen nirkabel (misalnya, MAC router di jaringan kabel).
>     - **Alamat 4:** Digunakan dalam mode yang lebih kompleks seperti _wireless distribution system_.
> 
> #### Evolusi Standar Wi-Fi
> 
> - Teknologi Wi-Fi telah berkembang pesat untuk mencapai kecepatan yang lebih tinggi dan efisiensi yang lebih baik. Evolusi ini ditandai oleh standar-standar seperti: 802.11b (11 Mbps) → 802.11a/g (54 Mbps) → 802.11n (Wi-Fi 4) → 802.11ac (Wi-Fi 5) → 802.11ax (Wi-Fi 6). Inovasi kunci seperti **MIMO** (menggunakan beberapa antena sekaligus) dan **OFDMA** (membagi channel untuk beberapa pengguna secara bersamaan) adalah pendorong utama peningkatan performa ini.
> 
> #### Eksplorasi Mandiri
> 
> - Gunakan aplikasi penganalisa Wi-Fi di laptop atau smartphone Anda (misalnya, _WiFi Analyzer_ untuk Android atau _inSSIDer_ untuk PC). Anda dapat melihat jaringan Wi-Fi di sekitar Anda, channel yang mereka gunakan, kekuatan sinyal (dalam dBm), dan BSSID mereka. Ini adalah cara yang bagus untuk melihat secara praktis bagaimana beberapa BSS berbagi ruang udara yang terbatas dan mengapa interferensi bisa menjadi masalah.