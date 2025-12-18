_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Database System Architecture - Paket A

**Mata Pelajaran:** Sistem Basis Data

**Topik:** Centralized, Client-Server, Parallel, and Distributed Systems

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal A ini, mahasiswa diharapkan dapat:

1. Membedakan karakteristik arsitektur centralized, client-server, paralel, dan terdistribusi.
    
2. Menganalisis metrik kinerja sistem paralel (Speedup dan Scaleup).
    
3. Mengevaluasi kelebihan dan kekurangan berbagai arsitektur hardware paralel (Shared Everything s.d. Nothing).
    
4. Memahami perbedaan antara sistem terdistribusi homogen dan heterogen.
    
5. Merekomendasikan arsitektur terbaik berdasarkan skenario bisnis/teknis tertentu.
    

## BAGIAN I: Tabel Matrix - Klasifikasi Arsitektur (Format A) [10 Poin]

**Instruksi:** Tentukan kategori arsitektur yang paling sesuai untuk setiap pernyataan berikut.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Pernyataan / Karakteristik**|**Centralized**|**Client-Server**|**Distributed**|
|1|Seluruh pemrosesan dan data berada dalam satu mesin tunggal.||||
|2|Pembagian beban antara _front-end_ (user interface) dan _back-end_ (DBMS).||||
|3|Data disimpan di beberapa lokasi fisik yang terhubung via jaringan.||||
|4|Cocok untuk aplikasi di mana satu server melayani banyak terminal bodoh (_dumb terminals_).||||
|5|Memungkinkan otonomi lokal pada setiap situs penyimpan data.||||

## BAGIAN II: Benar/Salah (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Linear Speedup_ terjadi ketika waktu eksekusi berkurang setengahnya saat jumlah hardware digandakan.|||
|2|Dalam arsitektur _Transaction Server_, client mengirimkan permintaan file mentah ke server.|||
|3|Arsitektur _Shared Nothing_ memiliki skalabilitas yang lebih baik daripada _Shared Memory_.|||
|4|Sistem terdistribusi heterogen menggunakan perangkat lunak DBMS yang sama di semua situs.|||
|5|_Interquery Parallelism_ berarti satu query dijalankan secara simultan oleh banyak prosesor.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Bandingkan arsitektur hardware paralel berikut.

|   |   |   |   |   |
|---|---|---|---|---|
|**Arsitektur Hardware**|**Komponen yang Dibagi**|**Keunggulan Utama**|**Kelemahan Utama**|**Kasus Penggunaan**|
|**Shared Memory**|CPU, RAM, Disk||||
|**Shared Nothing**|Hanya Jaringan||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi alur penanganan query dalam arsitektur **Transaction Server**.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Jawaban / Aksi Sistem**|
|a.|Permintaan|Client mengirimkan query dalam bentuk ...|
|b.|Parsing|Server menerima query dan melakukan ...|
|c.|Eksekusi|Server menjalankan query dan mengakses data di ...|
|d.|Hasil|Server mengirimkan kembali hanya ... ke client.|
|e.|Komunikasi|Interaksi ini meminimalkan lalu lintas jaringan karena tidak mengirim ...|

## BAGIAN V: Studi Kasus Multi-Bagian (Format E) [20 Poin]

Kasus:

Sebuah lembaga riset meteorologi sedang membangun sistem prediksi cuaca ekstrem. Sistem ini harus mengolah data satelit berukuran Petabyte setiap hari dengan perhitungan matematis yang sangat intensif. Di sisi lain, peneliti dari berbagai negara harus bisa mengakses hasil analisis tersebut tanpa perlu mengunduh seluruh dataset mentah.

Pertanyaan:

a. Berdasarkan kebutuhan kekuatan komputasi dan volume data, apakah arsitektur Parallel atau Distributed yang lebih prioritas untuk pemrosesan internal? Jelaskan.

b. Jika lembaga tersebut memiliki keterbatasan dana dan ingin menggunakan ribuan PC komoditas (biasa) sebagai node, arsitektur hardware paralel mana (Shared Memory/Disk/Nothing) yang paling tepat?

c. Lembaga ingin mengukur efisiensi sistem saat menambah prosesor. Jika waktu pemrosesan tetap sama saat volume data ditambah 2x dan prosesor ditambah 2x, metrik apa yang sedang terpenuhi? (Speedup/Scaleup).

d. Untuk akses peneliti global, skema _Transaction Server_ dianggap lebih baik daripada _Data Server_. Berikan satu alasan teknis terkait penggunaan bandwidth jaringan.

e. Jika database riset di negara A menggunakan PostgreSQL dan di negara B menggunakan Oracle, namun tetap bisa saling terhubung, sebutkan jenis sistem terdistribusi ini.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Model Server**, pilih karakteristik yang tepat:
    
    - **Data Server:** a) Kirim hasil query b) Kirim blok data/file c) Kirim metadata d) Tanpa pengiriman
        
    - **Transaction Server:** a) Client sibuk b) Server sibuk c) Tanpa SQL d) Arsitektur jadul
        
2. Mengenai **Hardware Paralel**, pilih sifat komunikasinya:
    
    - **Shared Disk:** a) CPU berbagi RAM b) CPU berbagi Disk c) Tanpa pembagian d) Hanya untuk backup
        
    - **Hierarchical:** a) Campuran Shared Memory & Nothing b) Tanpa CPU c) Satu level d) Hanya untuk mobile
        
3. Terkait **Metrik Paralelisme**, pilih definisi yang benar:
    
    - **Batch Scaleup:** a) Tugas besar tetap b) Tugas kecil bertambah c) Waktu meningkat d) Hardware tetap
        
    - **Linear Speedup:** a) Kurva melengkung b) Kurva garis lurus c) Nilai negatif d) Tidak mungkin dicapai
        
4. Dalam **Sistem Terdistribusi**, pilih jenis transparansinya:
    
    - **Location Transparency:** a) User tahu lokasi b) User tidak perlu tahu lokasi data c) Data di satu tempat d) Data hilang
        
    - **Replication Transparency:** a) User harus copy data b) Sistem kelola replika secara otomatis c) Tanpa replika d) Replikasi manual
        
5. Mengenai **Query Parallelism**, pilih tipenya:
    
    - **Intraquery:** a) Banyak query berbeda b) Satu query dibagi c) Tanpa query d) Query sekuensial
        
    - **Interquery:** a) Banyak query dijalankan simultan b) Satu query pelan c) Query di satu CPU d) Logika query
        
6. Terkait **Arsitektur Client-Server**, pilih pembagian tugasnya:
    
    - **Front-end:** a) Integritas data b) User interface & Form c) SQL Optimization d) Log recovery
        
    - **Back-end:** a) Tampilan grafik b) Manajemen transaksi & storage c) Input keyboard d) Cetak laporan
        
7. Mengenai **Sistem Terdistribusi Homogen**, pilih syaratnya:
    
    - **Software:** a) DBMS berbeda b) DBMS sama di tiap site c) Tanpa DBMS d) Hanya web server
        
    - **Skema:** a) Skema berbeda b) Skema global konsisten c) Tanpa skema d) Skema lokal rahasia
        
8. Dalam **Arsitektur Distributed**, pilih tantangan utamanya:
    
    - **Software:** a) Terlalu sederhana b) Kompleksitas pengembangan c) Murah d) Tanpa jaringan
        
    - **Keamanan:** a) Lebih aman b) Lebih rentan karena banyak titik akses c) Tanpa password d) Akses fisik saja
        
9. Terkait **Parallel Hardware Bottleneck**, pilih penyebab utamanya:
    
    - **Shared Memory:** a) Bus contention (perebutan jalur) b) Kabel putus c) Disk penuh d) Layar mati
        
    - **Shared Nothing:** a) Interference jaringan b) RAM penuh c) CPU lambat d) Fan berisik
        
10. Mengenai **Metrik Kinerja**, pilih faktor penghambat:
    
    - **Startup Overheads:** a) Waktu inisialisasi proses b) Waktu query c) Waktu tidur d) Waktu commit
        
    - **Skew:** a) Beban rata b) Beban tidak merata antar prosesor c) Data hilang d) Hardware baru
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau konsep arsitektur berikut:**

- **Speedup Formula:** _________________________________________________
    
- **Scaleup Formula:** _________________________________________________
    
- **Distributed Data Catalog:** ________________________________________
    
- **Replication vs Fragmentation:** ____________________________________
    
- **Thin Client vs Thick Client:** _____________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket A)

### Bagian I (Matrix)

1. Centralized | 2. Client-Server | 3. Distributed | 4. Centralized | 5. Distributed
    

### Bagian II (Benar/Salah)

1. B | 2. S (Itu Data Server) | 3. B | 4. S (Itu Homogen) | 5. S (Itu Intraquery)
    

### Bagian III (Komparatif)

- **Shared Memory:** Komponen: RAM/Disk; Keunggulan: Komunikasi cepat antar CPU; Kelemahan: Bottleneck pada Bus (Limit < 64 CPU).
    
- **Shared Nothing:** Komponen: Jaringan; Keunggulan: Skalabilitas sangat tinggi; Kelemahan: Komunikasi data via jaringan lambat.
    

### Bagian IV (Scaffolding)

a. SQL/Permintaan | b. Parsing & Optimasi | c. Disk/Database | d. Hasil/Tuple | e. Blok data mentah.

### Bagian V (Studi Kasus)

a. Parallel (untuk kekuatan komputasi besar pada dataset raksasa).

b. Shared Nothing (paling murah dan skalabel untuk PC komoditas).

c. Linear Scaleup.

d. Transaction Server hanya mengirim hasil (misal: 1 baris), sementara Data Server mengirim blok data (misal: 8KB) yang memboroskan bandwidth.

e. Heterogeneous Distributed System.

### Bagian VI (Pilihan Ganda)

1. b, b | 2. b, a | 3. b, b | 4. b, b | 5. b, a
    
2. b, b | 7. b, b | 8. b, b | 9. a, a | 10. a, b
    

### Bagian VII (Isian)

- Speedup: Waktu_lama / Waktu_baru (dengan hardware baru).
    
- Scaleup: Waktu_lama / Waktu_baru (dengan hardware & data baru).
    
- Catalog: Metadata penyimpan lokasi data di sistem terdistribusi.
    
- Repl/Frag: Replika (copy data), Fragmentasi (pecah data jadi bagian kecil).
    
- Thin/Thick: Thin (client ringan, logika di server), Thick (client berat, logika di client).