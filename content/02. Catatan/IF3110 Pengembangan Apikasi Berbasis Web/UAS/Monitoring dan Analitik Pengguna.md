type: Note

cssclasses:

- cornell-notes
    

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: User Monitoring & Analytics
> 
> > ## Questions/Cues
> 
> > - Tujuan Monitoring
> >     
> > - Actionable Insights
> >     
> > - Server Logs (Access & Error)
> >     
> > - Data Augmentation (Cookies)
> >     
> > - Data Warehouse
> >     
> > - Dashboards & Flow Analysis
> >     
> 
> > ## Reference Points
> 
> > - Slides: IF3110-14-Usability-Test-and-Monitoring (Pages 18-23)
> >     
> > - Log Analysis Concepts
> >     
> 
> > ### Mengapa Monitoring Diperlukan?
> 
> > Setelah aplikasi rilis, kita perlu data nyata untuk validasi asumsi desain. Prosesnya adalah:
> 
> > 1. **Monitor:** Kumpulkan data.
> >     
> > 2. **Information:** Olah data menjadi informasi.
> >     
> > 3. **Action:** Gunakan informasi untuk perbaikan.
> >     
> 
> > ### Pertanyaan yang Memicu Aksi (Actionable Questions)
> 
> > Jangan cuma simpan data, tapi tanyakan hal yang berujung pada perbaikan:
> 
> > - _Q: URL mana yang menghasilkan Server Error?_ -> **Action:** Fix broken code/links.
> >     
> > - _Q: Apakah user mengunjungi fitur baru (/foobar/)?_ -> **Action:** Jika <50%, tambah link/promosi di halaman utama.
> >     
> > - _Q: Halaman mana tempat user "kabur" (abandon)?_ -> **Action:** Perbaiki UI atau instruksi di halaman tersebut.
> >     
> > - _Q: Dari mana user "kaya" (high-profit) datang? Google atau NYTimes?_ -> **Action:** Beli iklan lebih banyak di sumber yang menguntungkan.
> >     
> 
> > ### Sumber Data 1: Apa yang Tersedia? (Server Logs)
> 
> > Server web (seperti Apache/Nginx) otomatis mencatat aktivitas standar:
> 
> > - **Access Log:** Mencatat setiap request.
> >     
> >     - _Contoh:_ `193.2.79.250 ... "GET /dogs/george HTTP/1.1" 200 ... "Mozilla/4.0..."`
> >         
> >     - _Info:_ IP Address, Waktu, File yang diminta, Kode Status (200 OK, 404 Not Found), User Agent (Browser/OS).
> >         
> > - **Error Log:** Mencatat kegagalan sistem atau request file yang tidak ada.
> >     
> 
> > ### Sumber Data 2: Informasi Tambahan (Augmentation)
> 
> > Log standar seringkali kurang detail untuk analisis perilaku user (session tracking).
> 
> > - **Cookies:** Konfigurasi server untuk mencatat isi cookie header agar bisa melacak user yang sama meski IP berubah atau sesi terputus.
> >     
> > - **Application Logging (RDBMS):** Tambahkan kode di aplikasi untuk mencatat aktivitas spesifik ke database (misal: "User A klik tombol Beli").
> >     
> > - **Data Warehouse:** Bangun gudang data multidimensi khusus untuk analisis historis user activity (terpisah dari database operasional agar tidak berat).
> >     
> 
> > ### Visualisasi & Analisis (Dashboards)
> 
> > Data mentah (logs) sulit dibaca. Gunakan _Tools_ (seperti Google Analytics) untuk melihat:
> 
> > - **Flow Analysis:** Peta perjalanan user. (Masuk Home -> Klik Produk -> Masuk Cart -> Checkout). Kita bisa lihat di mana panah aliran mengecil drastis (Drop-off point).
> >     
> > - **User Segmentation:** Membedakan perilaku user baru vs user lama, atau berdasarkan lokasi/perangkat.
> >     
> > - **Engagement:** Berapa lama waktu yang dihabiskan user di situs.
> >     

> [!cornell] #### Summary
> 
> User Monitoring mengubah data mentah menjadi keputusan bisnis/teknis. Dimulai dari mengajukan pertanyaan yang tepat ("Actionable Questions"), kita mengumpulkan data dari Log Server (Access/Error) yang diperkaya dengan Cookies dan Application Logging. Data ini kemudian diolah dalam Data Warehouse dan divisualisasikan melalui Dashboard/Flow Analysis untuk mendeteksi pola perilaku, error, dan peluang optimasi.

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Bedah Format Log (Common Log Format)
> 
> Contoh log di slide:
> 
> 193.2.79.250 - - [06/Mar/2003:09:11:59 -0500] "GET /dogs/george HTTP/1.1" 200 0 ...
> 
> - `%h` (193.2.79.250): IP Address Client.
>     
> - `%t` ([06/Mar...]): Timestamp.
>     
> - `%r` ("GET /dogs..."): Request Line (Method, Path, Protocol).
>     
> - `%>s` (200): HTTP Status Code (200=OK, 404=Not Found, 500=Server Error).
>     
> - `%b` (0): Ukuran respon dalam bytes.
>     
> - `User-Agent`: Info browser/OS (Penting untuk deteksi mobile vs desktop).
>     
> 
> #### Modern Monitoring Stack
> 
> Di era modern, kita jarang baca raw log file teks. Kita menggunakan stack seperti **ELK (Elasticsearch, Logstash, Kibana)** atau **Prometheus + Grafana**.
> 
> - _Logstash:_ Mengambil log dari server.
>     
> - _Elasticsearch:_ Menyimpan dan mengindeks log agar bisa dicari.
>     
> - _Kibana:_ Membuat dashboard visualisasi dari data log tersebut.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa tujuan utama dari mengubah data monitoring menjadi "Actionable Insights"?</strong></summary>
> 
> Agar data tidak hanya menjadi arsip, tetapi memicu tindakan perbaikan spesifik (misal: memperbaiki link rusak atau mengubah strategi marketing).
> 
> </details>

> <details>
> 
> <summary><strong>2. Apa perbedaan Access Log dan Error Log?</strong></summary>
> 
> Access Log mencatat setiap permintaan yang masuk ke server (sukses/gagal), sedangkan Error Log fokus mencatat detail kesalahan sistem atau permintaan yang gagal diproses.
> 
> </details>

> <details>
> 
> <summary><strong>3. Mengapa kita perlu menggunakan Cookies dalam logging aktivitas user?</strong></summary>
> 
> Karena protokol HTTP bersifat stateless. Tanpa cookies, sulit membedakan apakah 10 request berasal dari 1 user yang sama atau 10 user berbeda, terutama jika IP address mereka dinamis/berubah.
> 
> </details>

> <details>
> 
> <summary><strong>4. Apa fungsi "Flow Analysis" dalam dashboard analitik?</strong></summary>
> 
> Untuk memvisualisasikan jalur perpindahan user antar halaman, sehingga kita bisa mengidentifikasi di halaman mana user paling banyak berhenti atau keluar (drop-off/abandonment).
> 
> </details>