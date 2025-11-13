_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> Pilihlah 1 aplikasi yang ada di handphone kalian.  
> 
> Kemudian jelaskan pendekatan yang diambil oleh aplikasi tersebut terkait dengan:  
> - Consistency  
> - Available  
> - Partition Tolerance


## Dipilih: WhatsApp

### 1. Consistency (Konsistensi)

WhatsApp tidak memprioritaskan strong consistency, melainkan menggunakan eventual consistency:

- Pesan tidak selalu langsung tersinkronisasi di semua perangkat secara bersamaan. Ketika kita mengirim pesan, ada tanda centang yang menunjukkan status pengiriman bertahap
- Saat menggunakan WhatsApp Web/Desktop bersamaan dengan HP, terkadang ada delay singkat sebelum pesan muncul di semua perangkat
- Status "Last Seen": Informasi ini bisa sedikit berbeda antarpengguna karena update yang tidak real-time sempurna

### 2. Availability (Ketersediaan)

WhatsApp sangat memprioritaskan availability:

- Kita tetap bisa membuka aplikasi, membaca chat history, dan mengetik pesan meskipun tidak ada koneksi internet
- Pesan yang dikirim saat offline akan masuk ke queue dan otomatis terkirim saat koneksi kembali
- Data chat disimpan secara lokal di perangkat, sehingga selalu bisa diakses
- WhatsApp menggunakan multiple servers untuk memastikan layanan tetap berjalan

### 3. Partition Tolerance (Toleransi Partisi)

WhatsApp memiliki partition tolerance yang baik:

- Semua pesan disimpan di database lokal (SQLite), sehingga aplikasi tetap berfungsi meski terputus dari server pusat
- Pesan yang gagal terkirim akan di-queue dan retry otomatis
- Proses enkripsi dilakukan di level perangkat, tidak bergantung pada server pusat
- Saat ada gangguan network, fitur tetap berjalan dengan keterbatasan (misal: pesan tertunda, status tidak update)

## → WhatsApp mengambil pendekatan AP (Availability + Partition Tolerance)

WhatsApp mengorbankan strong consistency demi memastikan:

- Aplikasi selalu tersedia dan responsif
- Tetap berfungsi saat ada network partition
- Konsistensi data bersifat eventual (akan konsisten setelah beberapa saat)