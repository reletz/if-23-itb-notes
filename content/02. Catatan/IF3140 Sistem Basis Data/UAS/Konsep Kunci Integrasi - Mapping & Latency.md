---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Mapping?
> >     
> > - Apa itu Latency?
> >     
> > - Apa itu Batch processing?
> >     
> > - Delta vs Snapshot?
> >     
> > - Near-Real-Time / Event-Driven?
> >     
> > - Apa itu Change Data Capture (CDC)?
> >     
> > - 3 teknik CDC?
> >     
> > - Asynchronous (Asinkron)?
> >     
> > - Real-Time Synchronous (Sinkron)?
> >     
> > - Kapan sinkron dipakai?
> >     
> > - Kekurangan sinkron?
> >     
> > - Low Latency / Streaming?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 17-24
> >     
> 
> > ### Mapping
> > 
> > **Mapping** adalah dua hal:
> > 
> > 1. **Proses:** Aktivitas untuk mengembangkan "matriks lookup" yang merinci bagaimana data di sistem sumber (source) terhubung ke struktur di sistem target.
> >     
> > 2. **Hasil:** Dokumen (hasil dari proses) yang mendefinisikan aturan main integrasi.
> >     
> > 
> > Dokumen mapping ini **wajib** ada dalam proyek integrasi dan biasanya berisi:
> > 
> > - Sumber data yang akan diekstrak.
> >     
> > - Aturan untuk mengidentifikasi data (misal: `SELECT * WHERE status_aktif = 1`).
> >     
> > - Target tabel yang akan diisi.
> >     
> > - Aturan untuk update data (jika data sudah ada).
> >     
> > - Aturan transformasi atau kalkulasi yang perlu diterapkan.
> >     
> > 
> > ### Latency (Waktu Tunda)
> > 
> > **Latency** adalah **perbedaan waktu (jeda)** antara saat data _dihasilkan_ di sistem sumber dan saat data tersebut _tersedia_ untuk digunakan di sistem target.
> > 
> > Pilihan pendekatan integrasi akan menghasilkan tingkat latensi yang berbeda, disesuaikan dengan kebutuhan bisnis.
> > 
> > ### Jenis Latency: Batch
> > 
> > - Data dipindahkan dalam "kumpulan" (clumps) atau file besar secara periodik terjadwal (misal: setiap jam 12 malam).
> >     
> > - Ini adalah mode pemrosesan data paling umum dan tradisional.
> >     
> > - **Latency: Tinggi** (data bisa tertunda 24 jam).
> >     
> > - **Cocok untuk:** Volume data yang sangat tinggi dalam jendela waktu singkat (misal: proses tutup buku harian).
> >     
> > - **Jenis data:**
> >     
> >     - **Snapshot:** Seluruh set data pada satu titik waktu (misal: semua data pelanggan).
> >         
> >     - **Delta:** Hanya data yang berubah sejak batch terakhir.
> >         
> > 
> > ### Jenis Latency: Near-Real-Time atau Event-Driven
> > 
> > - Data diproses dalam set yang lebih kecil dan lebih sering, atau dipicu oleh sebuah **event** (misal: "setiap ada data yang di-update").
> >     
> > - **Latency: Rendah** (lebih rendah dari batch, misal: per 5 menit).
> >     
> > - **Tantangan:** Data bisa datang tidak berurutan, sehingga sistem target harus bisa mengelola "state" (status) untuk memastikan data dibangun dengan benar.
> >     
> > 
> > ### Jenis Latency: Change Data Capture (CDC)
> > 
> > **CDC** adalah sebuah **metode** spesifik untuk mengurangi beban jaringan dengan memfilter dan mengirimkan **hanya data yang berubah (deltas)**.
> > 
> > **3 Teknik CDC:**
> > 
> > 1. **Berbasis Elemen Data:** Sistem sumber mengisi penanda (seperti `timestamp` kapan di-update, atau _flag_ `sudah_diproses=0`). Proses extract kemudian menyeleksi berdasarkan penanda itu.
> >     
> > 2. **Berbasis Daftar (List-based):** Sistem sumber menambahkan "daftar" ID objek yang berubah, dan daftar itu dipakai untuk mengontrol ekstraksi.
> >     
> > 3. **Berbasis Salinan (Copy-based):** Sistem sumber (melalui _trigger_ atau _log_) menyalin data yang berubah ke tabel/objek terpisah, yang kemudian digunakan sebagai sumber ekstraksi. (Ini adalah metode yang paling andal).
> >     
> > 
> > ### Jenis Latency: Asynchronous
> > 
> > - Sistem sumber (penyedia data) **tidak menunggu** konfirmasi (acknowledgment) dari sistem penerima. Setelah mengirim data, ia lanjut ke proses berikutnya.
> >     
> > - Ini adalah implementasi umum dari _near-real-time_.
> >     
> > - **Kelebihan:** Sistem sumber tidak "tergantung" atau terhenti jika sistem target sedang sibuk atau _down_.
> >     
> > 
> > ### Jenis Latency: Real-Time Synchronous
> > 
> > - Digunakan ketika data di dua sistem **harus sempurna sinkron** (in synch).
> >     
> > - Proses yang mengeksekusi (sistem sumber) akan **menunggu (wait)** konfirmasi dari sistem target sebelum melanjutkan ke aktivitas berikutnya.
> >     
> > - **Kekurangan:**
> >     
> >     - **Lambat:** Menurunkan throughput transaksi karena harus menunggu.
> >         
> >     - **Berisiko Tinggi:** Dapat menyebabkan _blocking_ (antrian) dan jika sistem target _down_, sistem sumber akan ikut _down_ atau terhenti.
> >         
> > - **Contoh:** Transfer antar bank, update stok barang saat checkout.
> >     
> > 
> > ### Jenis Latency: Low Latency atau Streaming
> > 
> > - Didesain untuk **meminimalkan waktu respons** terhadap _event_.
> >     
> > - Biasanya digunakan untuk _data stream_ (aliran data berkelanjutan) seperti: klik di website, komen media sosial, data sensor IoT, harga saham.
> >     
> > - **Karakteristik:**
> >     
> >     - Membutuhkan investasi besar (hardware: SSD, software: in-memory database).
> >         
> >     - Umumnya menggunakan solusi **Asynchronous**.
> >         
> >     - Menggunakan **Massive Multi-Processing** (pemrosesan paralel besar-besaran).
> >         

> [!cornell] #### Summary
> 
> **Implementasi DII memerlukan `Mapping` (dokumen "blueprint" yang merinci aturan transformasi source-to-target) dan pemilihan tingkat `Latency` (waktu tunda) yang tepat. Latency berkisar dari `Tinggi` (Batch, diproses periodik), `Rendah` (Near-Real-Time/Asynchronous, diproses sering/event-driven, sering menggunakan CDC untuk mengirim delta), hingga `Nol` (Real-Time Synchronous, di mana sistem sumber menunggu konfirmasi target). Untuk data bervolume sangat tinggi dan berkelanjutan (seperti klik atau data sensor), digunakan arsitektur `Streaming` berlatensi rendah.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: CDC (Change Data Capture) - Log-Based
> 
> Tiga teknik CDC yang disebutkan di slide (timestamp, list, copy) memiliki kelemahan.
> 
> - **Timestamp/Flag:** Sulit menangani data yang _dihapus_ (DELETE).
>     
> - **List/Trigger:** Memberi beban (overhead) tambahan pada database sumber saat transaksi terjadi.
>     
> 
> Metode CDC paling modern dan dianggap "gold standard" adalah **Log-Based CDC**.
> 
> Setiap database transaksional (seperti Oracle, SQL Server, MySQL, PostgreSQL) memiliki _Transaction Log_ (atau Write-Ahead Log/WAL) yang mencatat _setiap_ perubahan yang terjadi pada data (INSERT, UPDATE, DELETE) sebelum ditulis ke disk, untuk keperluan recovery.
> 
> Alat CDC modern (seperti Debezium) "membaca" log ini secara non-invasif (tanpa mengganggu database). Alat ini memonitor log, menangkap setiap perubahan, dan mengirimkannya sebagai _event_ ke sistem target.
> 
> **Kelebihan Log-Based CDC:**
> 
> 1. **Overhead Sangat Rendah:** Tidak mengganggu database sumber.
>     
> 2. **Menangkap DELETE:** Karena penghapusan data juga dicatat di log.
>     
> 3. **Real-time:** Perubahan bisa ditangkap dalam hitungan milidetik.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba klasifikasikan kebutuhan latensi untuk kasus-kasus berikut:
>     
>     1. Laporan penjualan harian untuk manajer regional? (Kemungkinan: **Batch**)
>         
>     2. Update stok barang di Tokopedia saat Anda berhasil checkout? (Kemungkinan: **Real-Time Synchronous**)
>         
>     3. Rekomendasi produk "Orang lain juga membeli" setelah Anda memasukkan barang ke keranjang? (Kemungkinan: **Near-Real-Time/Asynchronous**)
>         
>     4. Dashboard monitoring pergerakan armada Gojek/Grab di peta? (Kemungkinan: **Low Latency / Streaming**)
>