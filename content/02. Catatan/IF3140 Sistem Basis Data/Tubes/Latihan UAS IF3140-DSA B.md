_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Database System Architecture - Paket B

**Mata Pelajaran:** Sistem Basis Data

**Topik:** Parallel & Distributed Database Systems (Performance, Transparency, & Protocols)

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal B ini, mahasiswa diharapkan dapat:

1. Menganalisis hambatan kinerja dalam sistem paralel (Interference & Skew).
    
2. Merancang strategi fragmentasi dan replikasi dalam sistem terdistribusi.
    
3. Memahami tingkatan transparansi dalam akses data terdistribusi.
    
4. Menjelaskan mekanisme protokol Two-Phase Commit (2PC) untuk menjaga atomisitas.
    
5. Membedakan karakteristik teknis antara model server dan skalabilitas hardware.
    

## BAGIAN I: Tabel Matrix - Klasifikasi Transparansi (Format A) [10 Poin]

**Instruksi:** Tentukan jenis transparansi yang dijelaskan oleh setiap kondisi di bawah ini.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Pernyataan / Kondisi User**|**Location Transparency**|**Fragmentation Transparency**|**Replication Transparency**|
|1|User tidak perlu tahu bahwa tabel `Pegawai` dipecah menjadi `Pegawai_Tetap` dan `Pegawai_Kontrak`.||||
|2|User bisa mengakses data tanpa mengetahui di kota mana (Jakarta/Surabaya) server berada.||||
|3|User tidak menyadari bahwa sistem secara otomatis memperbarui 3 salinan data di site yang berbeda.||||
|4|Query `SELECT * FROM Produk` bekerja meskipun baris-barisnya tersebar di beberapa server.||||
|5|User menggunakan nama relasi tunggal meskipun data fisiknya berupa salinan identik.||||

## BAGIAN II: Benar/Salah (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Batch Scaleup_ berfokus pada mempertahankan waktu eksekusi yang konstan saat ukuran masalah dan hardware ditambah secara proporsional.|||
|2|Masalah _Skew_ (beban tidak rata) dapat menyebabkan performa sistem paralel menurun drastis karena satu prosesor menjadi _bottleneck_.|||
|3|Dalam sistem terdistribusi homogen, setiap site diizinkan menggunakan skema database yang berbeda-beda.|||
|4|Protokol 2-Phase Commit (2PC) menjamin bahwa transaksi terdistribusi bersifat atomik di semua situs yang terlibat.|||
|5|Arsitektur _Shared Disk_ memiliki masalah keterbatasan skalabilitas karena adanya perebutan jalur akses (_contention_) ke memori utama.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Bandingkan model server dalam arsitektur Client-Server.

|   |   |   |   |
|---|---|---|---|
|**Aspek Komparasi**|**Transaction Server**|**Data Server**|**Justifikasi Pemilihan**|
|**Lokasi Eksekusi Query**||||
|**Unit Pengiriman Data**||||
|**Beban Network**||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi alur proses **Fase 1 (Prepare Phase)** pada protokol Two-Phase Commit (2PC).

|   |   |   |
|---|---|---|
|**Langkah**|**Pelaku**|**Instruksi / Deskripsi Aksi**|
|a.|Koordinator|Mengirimkan pesan "Prepare" ke seluruh ...|
|b.|Peserta|Menerima pesan dan memeriksa apakah transaksi bisa di- ...|
|c.|Peserta|Menulis semua log record ke _stable storage_ dan mengirimkan voting berupa ...|
|d.|Koordinator|Menunggu tanggapan dari semua peserta. Jika satu saja mengirim "No", maka ...|
|e.|Keputusan|Koordinator menentukan hasil akhir (Commit/Abort) berdasarkan ...|

## BAGIAN V: Studi Kasus Multi-Bagian (Format E) [20 Poin]

Kasus:

Sebuah perusahaan e-commerce besar, "GlobalShop", memiliki dua basis data utama di Singapura (Site S) dan London (Site L). Mereka ingin melakukan fragmentasi pada tabel Orders. Fragmentasi dilakukan secara horizontal: data pelanggan Asia di Site S dan Eropa di Site L. Selain itu, tabel Currency_Rates direplikasi di kedua site.

Pertanyaan:

a. Apa keuntungan utama melakukan replikasi penuh pada tabel Currency_Rates di setiap site terkait efisiensi query lokal?

b. Jika terjadi kegagalan jaringan antara London dan Singapura, apakah user di Singapura masih bisa melihat data pesanan pelanggan Eropa jika sistem tidak menggunakan replikasi untuk tabel `Orders`? Jelaskan.

c. Saat GlobalShop menambah jumlah server di Site S dari 10 menjadi 20 server dan waktu proses order berkurang dari 1 detik menjadi 0.5 detik, metrik performa apa yang tercapai?

d. Sebutkan satu potensi kerugian (overhead) dari penggunaan replikasi pada tabel `Currency_Rates` saat terjadi perubahan nilai kurs.

e. Dalam arsitektur sistem terdistribusi ini, jika Site S menggunakan SQL Server dan Site L menggunakan MySQL, tantangan teknis apa yang muncul dalam menjaga integrasi data?

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Dalam konteks **Parallelism Metrics**, pilih karakteristik yang tepat:
    
    - **Speedup:** a) Hardware tetap, beban tambah b) Hardware tambah, beban tetap c) Waktu tambah d) Tanpa hardware
        
    - **Scaleup:** a) Hardware & beban tambah b) Hardware tetap c) Kapasitas RAM turun d) Hanya untuk single-user
        
2. Mengenai **Hardware Arsitektur**, pilih sifat utamanya:
    
    - **Shared Disk:** a) CPU berbagi RAM b) CPU berbagi Disk c) Bebas interferensi d) Paling skalabel
        
    - **Shared Memory:** a) Komunikasi via pesan b) Komunikasi via memori bersama c) Sangat murah d) Tanpa bottleneck
        
3. Terkait **Fragmentasi Data**, pilih teknik yang sesuai:
    
    - **Horizontal:** a) Membagi kolom b) Membagi baris (tuple) c) Menambah index d) Menghapus tabel
        
    - **Vertical:** a) Membagi kolom berdasarkan atribut b) Membagi baris c) Menggabungkan tabel d) Backup data
        
4. Dalam **Sistem Terdistribusi**, pilih keuntungan utamanya:
    
    - **Reliability:** a) Satu mati semua mati b) Satu mati sistem tetap jalan c) Tanpa error d) Kecepatan tinggi
        
    - **Efficiency:** a) Akses data dekat user b) Data jauh dari user c) Tanpa jaringan d) Biaya mahal
        
5. Mengenai **Query Processing**, pilih faktor biaya utamanya:
    
    - **Distributed:** a) Biaya transmisi data via network b) Biaya listrik c) Biaya lisensi d) Biaya kabel
        
    - **Parallel:** a) Sinkronisasi antar prosesor b) Ukuran layar c) Jumlah keyboard d) Kecepatan ketik
        
6. Terkait **Software Terdistribusi**, pilih klasifikasinya:
    
    - **Homogeneous:** a) Versi DBMS berbeda b) Versi DBMS sama c) Tanpa OS d) Arsitektur heterogen
        
    - **Heterogeneous:** a) Satu bahasa b) Berbagai jenis DBMS (Oracle, SQL, dsb) c) Tanpa integrasi d) Satu server
        
7. Mengenai **Hambatan Speedup**, pilih penyebab utamanya:
    
    - **Interference:** a) Perebutan resource hardware b) Data kembar c) Query cepat d) User logoff
        
    - **Startup Overhead:** a) Waktu inisialisasi proses paralel b) Waktu commit c) Waktu input d) Waktu istirahat
        
8. Dalam **Data Server Architecture**, pilih sifat operasinya:
    
    - **Cache:** a) Client menyimpan blok data b) Server menyimpan data c) Tanpa memori d) Hanya untuk log
        
    - **Locking:** a) Dilakukan oleh client b) Dilakukan oleh server (complex) c) Tanpa locking d) Locking manual
        
9. Terkait **Transaction Server**, pilih komponen interaksinya:
    
    - **RPC/SQL Call:** a) Cara client kirim perintah b) Cara client kirim file c) Cara server mati d) Cara simpan log
        
    - **Result Set:** a) Hanya baris yang diminta b) Seluruh isi disk c) Metadata d) Tanpa hasil
        
10. Mengenai **Fragmentation Schema**, pilih aturannya:
    
    - **Completeness:** a) Semua data harus masuk fragmen b) Sebagian data hilang c) Data ganda d) Tanpa data
        
    - **Disjointness:** a) Fragmen tidak boleh overlap b) Fragmen harus sama c) Fragmen di satu disk d) Fragmen dihapus
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau konsep dalam Sistem Terdistribusi berikut:**

- **Autonomous Site:** _________________________________________________
    
- **Global Schema:** ___________________________________________________
    
- **Two-Phase Commit (Voting):** _______________________________________
    
- **Data Transparency:** _______________________________________________
    
- **Parallel Query Optimization:** _____________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket B)

### Bagian I (Matrix)

1. Frag | 2. Loc | 3. Repl | 4. Frag | 5. Repl
    

### Bagian II (Benar/Salah)

1. B | 2. B | 3. S | 4. B | 5. S (Itu Shared Memory)
    

### Bagian III (Komparatif)

- Transaction: Eksekusi di Server; Unit: Hasil Tuple; Network: Ringan.
    
- Data: Eksekusi di Client; Unit: Blok/File; Network: Berat (banyak blok dikirim).
    

### Bagian IV (Scaffolding)

a. Peserta | b. Commit/Ready | c. Vote-Commit/Vote-Abort | d. Abort Global | e. Suara mayoritas/mutlak semua peserta.

### Bagian V (Studi Kasus)

a. Query kurs mata uang menjadi sangat cepat karena dibaca secara lokal tanpa akses jaringan (Local Autonomy).

b. Tidak bisa, karena London memegang fragmen data Eropa yang tidak dimiliki Singapura (Single Point of Failure per fragmen).

c. Linear Speedup.

d. Write Overhead (setiap perubahan kurs harus dikirim ke semua replika, memperlambat proses update).

e. Heterogeneity (perbedaan dialek SQL, tipe data, dan protokol transaksi).

### Bagian VI (Pilihan Ganda)

1. b, a | 2. b, b | 3. b, a | 4. b, a | 5. a, a
    
2. b, b | 7. a, a | 8. a, b | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- Autonomous: Kemampuan site mengelola data lokal sendiri.
    
- Global Schema: Definisi logis dari seluruh data yang tersebar.
    
- 2PC Voting: Tahap di mana semua site setuju atau tidak untuk commit.
    
- Transparency: Penyembunyian detail implementasi fisik dari user.
    
- Optimization: Mencari rencana eksekusi tercepat di banyak prosesor.