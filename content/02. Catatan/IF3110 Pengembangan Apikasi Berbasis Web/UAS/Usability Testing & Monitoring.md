---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Usability Testing & System Monitoring
> 
> > ## Questions/Cues
> >
> > - Definisi Usability (ISO 9241-11)
> >     
> > - 3 Komponen ISO
> >     
> > - 5 Atribut Nielsen
> >     
> > - Dimensi 5Es (Quesenbery)
> >     
> > - Mengapa Perlu Monitoring?
> >     
> > - Keterbatasan Lab Testing
> >     
> > - Level 1: Standard Logs
> >     
> > - Level 2: Extended Logs
> >     
> > - Level 3: Custom Logging
> >     
> > - Implementasi Data Warehouse
> >     
> > - Analisis: Ad Hoc vs Dashboard
> >     
> > - Flow Analysis & Drop-offs
> >     
> > - Fitur "Insight" Otomatis
> >     
> >
> > ## Reference Points
> >
> > - Slide IF3110-14-Usability-Test-and-Monitoring
> >     
> > - ISO 9241-11:2018
> >     
> > - Jakob Nielsen (NNGroup)
> >     
> > - Whitney Quesenbery
> >     
> 
> > ### 1. Definisi Usability (Standar ISO)
> >
> > Berdasarkan ISO 9241-11:2018, Usability adalah:
> > 
> > "Tingkat sejauh mana sebuah sistem, produk, atau layanan dapat digunakan oleh pengguna tertentu untuk mencapai tujuan tertentu dengan efektivitas, efisiensi, dan kepuasan dalam konteks penggunaan tertentu."
> >
> > **Analisis Definisi:**
> >
> > - **Specified Users:** Tidak ada produk yang cocok untuk "semua orang".
> >     
> > - **Specified Goals:** Apa yang ingin dicapai user? (Beli barang, cari info, hiburan).
> >     
> > - **Specified Context:** Di mana dipakainya? (Kantor tenang, pabrik bising, atau mobile di jalan).
> >     
> >
> > ### 2. Lima Atribut Usability (Jakob Nielsen)
> >
> > Jakob Nielsen memecah usability menjadi 5 kualitas dasar:
> >
> > 1. **Learnability:** Seberapa mudah pengguna menyelesaikan tugas dasar saat pertama kali melihat desain? (Kurva belajar).
> >     
> > 2. **Efficiency:** Setelah pengguna mempelajari desain, seberapa cepat mereka bisa menyelesaikan tugas? (Kecepatan user ahli).
> >     
> > 3. **Memorability:** Ketika pengguna kembali setelah lama tidak menggunakan aplikasi, seberapa mudah mereka mengingat cara pakainya? (Tanpa perlu belajar ulang).
> >     
> > 4. **Errors:** Berapa banyak kesalahan yang dibuat pengguna? Seberapa parah? Dan seberapa mudah mereka memulihkannya?
> >     
> > 5. **Satisfaction:** Seberapa menyenangkan (pleasant) pengalaman menggunakan desain tersebut?
> >     
> >
> > ### 3. Dimensi 5Es (Whitney Quesenbery)
> >
> > Pendekatan alternatif yang menyeimbangkan fungsi dan pengalaman:
> >
> > 1. **Effective:** Seberapa lengkap dan akurat tujuan tercapai.
> >     
> > 2. **Efficient:** Seberapa cepat pekerjaan diselesaikan.
> >     
> > 3. **Engaging:** Seberapa baik antarmuka menarik pengguna ke dalam interaksi dan memberikan kepuasan (Aspek estetika/emosional).
> >     
> > 4. **Error Tolerant:** Seberapa baik produk mencegah error dan membantu pengguna bangkit dari kesalahan.
> >     
> > 5. **Easy** to **Learn:** Seberapa baik produk mendukung orientasi awal dan pembelajaran berkelanjutan.
> >     
> >
> > ### 4. Urgensi Monitoring (Pasca-Rilis)
> >
> > Mengapa Usability Testing di laboratorium saja tidak cukup?
> >
> > - **Keterbatasan Lab:** Jumlah partisipan sedikit, lingkungan terlalu dikontrol, dan skenario dibuat-buat.
> >     
> > - **Kelebihan Monitoring:** Melihat perilaku pengguna asli di dunia nyata ("in the wild"), mendapatkan data kuantitatif dari ribuan sesi, dan menemukan _edge cases_ yang terlewat saat testing.
> >     
> >
> > ### 5. Evolusi Pencatatan Data (Logging Levels)
> >
> > Slide menjelaskan tiga tahapan kedalaman logging:
> >
> > **Level 1: Standard Logs (Server Logs)**
> >
> > - **Mekanisme:** Dicatat otomatis oleh software server (Apache/Nginx/IIS).
> >     
> > - **Format (CLF):** IP Address, Timestamp, HTTP Request (GET /index.html), Status Code (200, 404), Bytes Sent.
> >     
> > - **Masalah:** Data ini "mentah" dan teknis. Kita tidak bisa melacak sesi user (stateless) dan tidak tahu konteks bisnis (apa yang user lakukan sebenarnya).
> >     
> >
> > **Level 2: Extended Logs**
> >
> > - **Mekanisme:** Mengonfigurasi server untuk mencatat header HTTP tambahan.
> >     
> > - **Data Tambahan:**
> >     
> > 	- **Cookie:** Untuk melacak Session ID (membedakan user unik meskipun IP sama).
> > 			
> > 	- **Referrer:** Dari mana user datang (Google, Iklan, Langsung).
> > 			
> > 	- **User-Agent:** Perangkat/Browser yang dipakai.
> >         
> > - **Manfaat:** Mulai bisa melakukan _Session Tracking_.
> >     
> >
> > **Level 3: Custom Application Logging (Augmented)**
> >
> > - **Mekanisme:** Memodifikasi kode aplikasi (software) untuk mencatat event spesifik ke database (RDBMS) atau Data Warehouse.
> >     
> > - **Data:** Aktivitas bisnis detail, misal: "User X klik Checkout", "User Y gagal validasi stok".
> >     
> > - **Output:** Membangun _Data Warehouse_ lengkap tentang perilaku user untuk analisis multidimensi.
> >     
> >
> > ### 6. Analisis dan Visualisasi
> >
> > Setelah data terkumpul (Recording), langkah selanjutnya adalah analisis:
> >
> > **Metode 1: Ad Hoc Queries**
> >
> > - Admin/Analis menulis query SQL manual ke database log untuk menjawab pertanyaan spesifik saat itu juga.
> >     
> > - _Contoh:_ "Berapa user yang gagal login antara jam 9-10 pagi ini?"
> >     
> >
> > **Metode** 2: Dashboards & Flow **Analysis**
> >
> > - Menggunakan tools visualisasi (seperti Google Analytics) untuk memantau kesehatan aplikasi secara real-time.
> >     
> >
> > **Komponen Dashboard Utama:**
> >
> > - **User Acquisition:** Grafik sumber trafik (Organic Search, Social, Referral).
> >     
> > - **Behavior Flow:** Visualisasi alur perpindahan user dari satu halaman ke halaman lain. Sangat berguna untuk melihat **Drop-off Points** (di halaman mana user pergi?).
> >     
> > - **Automated Insights:** Fitur modern yang memberi tahu anomali secara otomatis (misal: "Page views yesterday were greater than normal").
> >     
> >
> > **Metrik Kunci:**
> >
> > - **Users/New Users:** Pertumbuhan basis pengguna.
> >     
> > - **Engagement Time:** Berapa lama user aktif di aplikasi.
> >     
> > - **Bounce Rate:** Persentase user yang datang dan langsung pergi tanpa interaksi ("Mental").
> >     

> [!cornell] #### Summary
> 
> Usability adalah ukuran kualitas pengalaman pengguna yang dinilai berdasarkan standar ISO 9241-11 (Efektivitas, Efisiensi, Kepuasan), prinsip Nielsen (5 Atribut), atau dimensi 5Es Quesenbery. Untuk memastikan usability terjaga di lingkungan produksi, diperlukan sistem Monitoring yang kuat. Implementasi monitoring bergerak dari Standard Logs (data teknis dasar), ke Extended Logs (pelacakan sesi via cookie), hingga Custom Logging (data perilaku bisnis di Data Warehouse). Data ini divisualisasikan melalui Dashboard dan Flow Analysis untuk mendeteksi hambatan (drop-offs) dan mengoptimalkan retensi pengguna.

> [!ad-libitum]- Additional Information (Deep Dive Teknis)
> 
> #### 1. Implementasi Teknis Extended Logging (Nginx)
> 
> Pada slide materi "Level 2: Extended Logs", dijelaskan perlunya mencatat data lebih dari sekadar log standar. Secara default, Nginx menggunakan format log `combined` yang tidak mencatat durasi request atau isi cookie.
> 
> Untuk keperluan monitoring usability dan performa yang serius, Anda wajib mendefinisikan format log kustom (`log_format`) di dalam blok `http` pada file `nginx.conf`.
> 
> **Konfigurasi Lengkap:**
> 
> ```
> http {
> 	# 1. Mendefinisikan format log bernama 'main_ext'
> 	# Format ini menangkap variable standar plus variable tambahan
> 	log_format main_ext '$remote_addr - $remote_user [$time_local] "$request" '
> 											'$status $body_bytes_sent "$http_referer" '
> 											'"$http_user_agent" "$http_x_forwarded_for" '
> 											'"$http_cookie" $request_time'; 
>                         
> 	# 2. Mengaktifkan format tersebut untuk access log
> 	access_log /var/log/nginx/access.log main_ext;
> }
> ```
> 
> **Analisis Parameter Kritis:**
> 
>
> - $http_cookie:
>     
> 	Variabel ini menangkap seluruh isi header Cookie dari request browser.
> 	
> 	- _Kenapa Penting?_ Protokol HTTP bersifat _stateless_. Server tidak tahu bahwa Request A (Home) dan Request B (Checkout) berasal dari orang yang sama. Cookie biasanya menyimpan `SESSION_ID`. Dengan mencatat ini di log, kita bisa melakukan **Session Tracking** (mengurutkan aktivitas user unik) meskipun IP mereka berubah-ubah atau sama (NAT).
> 			
> - $request_time:
>     
> 	Mencatat durasi waktu (dalam detik, dengan presisi milidetik) yang dibutuhkan server untuk memproses request—mulai dari byte pertama diterima hingga byte terakhir dikirim ke client.
> 	
> 	- _Kenapa Penting?_ Ini adalah metrik utama **Performance Monitoring**. Jika user mengeluh aplikasi "lemot", kita cek log ini. Jika `$request_time` tinggi pada URL `/process-payment`, berarti masalah ada di backend/database kita, bukan di koneksi internet user.
> 			
>
> #### 2. Konsep Data Warehouse Aktivitas Pengguna (Level 3)
>
> Level 3 (Custom Application Logging) melangkah lebih jauh dari sekadar log server. Aplikasi dimodifikasi untuk mencatat **Business Events**.
>
> **Perbedaan Struktur Data:**
>
> - **Log Server (Level 1/2):** Fokus pada _Resource_ (`GET /style.css`, `POST /login`).
>     
> - **Data Warehouse (Level 3):** Fokus pada _Intent/State_.
>     
>
> Contoh Skema Tabel user_activity_logs:
> 
> | Kolom | Tipe Data | Deskripsi |
> | :--- | :--- | :--- |
> | timestamp | DATETIME | Waktu kejadian |
> | user_id | INT | ID User (jika login) |
> | session_id | VARCHAR | ID Sesi (dari cookie) |
> | event_type | VARCHAR | Misal: ADD_TO_CART, VIEW_DETAILS, ERROR_VALIDATION |
> | page_url | VARCHAR | Di halaman mana kejadiannya |
> | metadata | JSON | Detail konteks (misal: {sku: "IPHONE13", price: 15000000}) |
>
> Contoh Ad-Hoc Query (SQL):
> 
> "Cari user yang mengalami error validasi lebih dari 3 kali dalam 10 menit terakhir."
>
> ```sql
> SELECT user_id, COUNT(*) as error_count 
> FROM user_activity_logs 
> WHERE event_type = 'ERROR_VALIDATION' 
>   AND timestamp > NOW() - INTERVAL 10 MINUTE
> GROUP BY user_id 
> HAVING error_count > 3;
> ```
> 
> Query ini membantu menemukan user yang sedang frustrasi (Usability Problem) secara real-time.
> 
> #### 3. Memahami Flow Analysis (Sankey Diagram)
> 
> Flow Analysis yang disebut di slide sering divisualisasikan menggunakan **Diagram Sankey**.
> 
> - **Visualisasi:** Node (Halaman) dihubungkan oleh Edge (Alur). Ketebalan Edge merepresentasikan volume trafik.
>     
> - **Drop-off Points (Titik Keluar):** > Biasanya ditandai dengan aliran berwarna merah yang mengarah "keluar" (bukan ke node berikutnya).
>     
> 	- _Kasus:_ Jika 80% user drop-off di halaman "Syarat & Ketentuan", itu indikasi kuat bahwa S&K terlalu panjang atau tombol "Setuju" sulit ditemukan.
> 			
> - Looping (Putaran):
>     
> 	Jika alur menunjukkan pola Login -> Login Error -> Login -> Login Error berulang kali, ini menandakan pesan error login tidak membantu user memperbaiki kesalahannya (melanggar prinsip Error Tolerant).
> 	
> 
> #### 4. Tools & Stack Rekomendasi
> 
> Berdasarkan slide dan praktik industri modern:
> 
> - **Google Analytics 4 (GA4):** Standar industri untuk dashboard monitoring. Menggunakan model data berbasis _Events_, bukan _Sessions_ (seperti UA lama), yang lebih cocok dengan konsep Level 3 Logging.
>     
> - **ELK Stack (Elasticsearch, Logstash, Kibana):** Solusi _open-source_ populer untuk mengolah Extended Logs (Nginx) menjadi dashboard visual tanpa mengirim data ke pihak ketiga.
>     
> - **Hotjar / Microsoft Clarity:** Alat tambahan untuk melihat _Heatmap_ (area mana yang sering diklik) dan _Session Replay_ (video rekaman layar user).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan utama antara Usability Testing (Lab) dan Monitoring (Produksi)?</strong></summary>
> 
> Usability testing dilakukan di lingkungan terkontrol dengan partisipan sedikit untuk menemukan masalah awal desain, sedangkan Monitoring dilakukan pada pengguna nyata secara masif untuk melihat perilaku asli dan tren penggunaan jangka panjang.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa variabel $http_cookie sangat krusial dalam Extended Logs?</strong></summary>
> 
> Karena cookie memungkinkan kita melakukan Session Tracking. Tanpa cookie, HTTP bersifat stateless, sehingga kita tidak bisa melacak alur navigasi (journey) satu pengguna secara utuh.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa fungsi variabel $request_time dalam konfigurasi Extended Log Nginx?</strong></summary>
> 
> Variabel ini mencatat total waktu yang dibutuhkan server untuk memproses permintaan hingga selesai. Ini adalah indikator utama untuk memantau performa backend dan mendeteksi API yang lambat.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Dalam Flow Analysis, apa yang diindikasikan oleh tingginya "Drop-off Rate" pada halaman formulir?</strong></summary>
> 
> Indikasi kuat adanya masalah usability, seperti formulir yang terlalu panjang, membingungkan, atau adanya error teknis yang menghalangi pengguna untuk lanjut.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa perbedaan "Standard Logs" dan "Custom Logs"?</strong></summary>
> 
> Standard logs dicatat otomatis oleh server web berisi data teknis (IP, Status Code), sedangkan Custom logs diprogram khusus dalam kode aplikasi untuk mencatat event bisnis (Klik Tombol, Transaksi Gagal) ke database tersendiri.
> 
> </details>