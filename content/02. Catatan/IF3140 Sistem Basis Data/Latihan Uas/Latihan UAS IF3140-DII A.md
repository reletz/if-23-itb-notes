_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Integration and Interoperability - Paket A

**Mata Pelajaran:** Sistem Basis Data

**Topik:** ETL/ELT, Mapping, Latency, Integration Patterns, and Modern Architecture

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal A ini, mahasiswa diharapkan dapat:

1. Membedakan mekanisme integrasi data antara ETL (Staging-based) dan ELT (Target-based).
    
2. Menganalisis kebutuhan latensi data (Batch vs Real-time) berdasarkan kasus bisnis.
    
3. Merancang logika pemetaan data (_data mapping_) dari sistem sumber ke target.
    
4. Mengevaluasi efektivitas berbagai pola integrasi (Point-to-Point, Hub-and-Spoke, ESB).
    
5. Memahami peran Master Data Management (MDM) dan Change Data Capture (CDC) dalam ekosistem integrasi.
    

## BAGIAN I: Tabel Matrix - Klasifikasi Teknik Integrasi (Format A) [10 Poin]

**Instruksi:** Tentukan teknik integrasi yang paling sesuai untuk setiap karakteristik berikut.

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**No**|**Karakteristik / Sifat Mekanisme**|**ETL**|**ELT**|**Data Virtualization**|**CDC**|
|1|Transformasi dilakukan di area penampungan sementara (_staging area_) sebelum masuk ke target.|||||
|2|Memanfaatkan kekuatan pemrosesan dari database target (seperti Data Warehouse modern) untuk transformasi.|||||
|3|Menangkap perubahan data secara _real-time_ atau _near real-time_ berdasarkan log database.|||||
|4|Menyediakan tampilan data terintegrasi secara logis tanpa memindahkan data secara fisik ke gudang baru.|||||
|5|Sangat bergantung pada _middleware_ atau _engine_ integrasi eksternal untuk melakukan pembersihan data.|||||

## BAGIAN II: Benar/Salah - Konsep Integrasi (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Data Mapping_ hanya mencakup penentuan nama kolom yang sama, tanpa perlu memperhatikan transformasi tipe data.|||
|2|Integrasi _Real-time_ selalu lebih baik daripada _Batch_ untuk semua jenis laporan bisnis, termasuk laporan tahunan.|||
|3|_Enterprise Service Bus_ (ESB) bertindak sebagai _middleware_ yang mengurangi ketergantungan antar aplikasi (_decoupling_).|||
|4|Master Data Management (MDM) bertujuan untuk menciptakan "Golden Record" atau versi tunggal yang benar dari data inti.|||
|5|Latensi "Near Real-time" biasanya memiliki jeda waktu dalam hitungan detik hingga menit setelah data di sumber berubah.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Bandingkan dua pendekatan utama integrasi data berikut.

|   |   |   |   |
|---|---|---|---|
|**Aspek Komparasi**|**ETL (Extract-Transform-Load)**|**ELT (Extract-Load-Transform)**|**Justifikasi Pemilihan**|
|**Lokasi Transformasi**||||
|**Volume Data**||||
|**Kesiapan Data**||||

## BAGIAN IV: Step-by-Step Scaffolding - Alur Mapping (Format D) [15 Poin]

**Instruksi:** Lengkapi alur proses **Data Mapping** dari sistem CRM ke Data Warehouse.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Jawaban / Deskripsi Aksi**|
|a.|Source Discovery|Mengidentifikasi tabel dan kolom di CRM, misalnya kolom `Cust_Name` dan ...|
|b.|Target Definition|Menentukan struktur tabel di Warehouse, misalnya kolom `Customer_FullName` dengan tipe ...|
|c.|Transformation Logic|Menetapkan aturan, misalnya menggabungkan `First_Name` dan `Last_Name` serta mengubah menjadi ...|
|d.|Data Cleansing|Menangani data yang hilang (null) dengan memberikan nilai ...|
|e.|Loading|Menjalankan proses pemindahan data sesuai dengan frekuensi ...|

## BAGIAN V: Studi Kasus Multi-Bagian (Format E) [20 Poin]

Kasus:

Sebuah perusahaan retail besar "IndoMart" ingin mengintegrasikan data dari ribuan mesin kasir (POS) di seluruh Indonesia ke pusat data. Mereka membutuhkan laporan stok barang yang diperbarui setiap 15 menit agar tim logistik bisa segera mengirim barang. Namun, untuk laporan keuangan bulanan, mereka lebih memilih data yang sudah bersih dan tervalidasi total meskipun prosesnya memakan waktu lama.

Pertanyaan:

a. Untuk kebutuhan laporan stok setiap 15 menit, jenis Latency apa yang paling tepat diterapkan? (Batch/Real-time/Near Real-time).

b. Antara pola **Point-to-Point** dan **Hub-and-Spoke**, mana yang lebih disarankan jika mesin kasir tersebut akan terus bertambah jumlahnya di masa depan? Jelaskan.

c. Mengapa pendekatan **ELT** mungkin lebih cocok jika perusahaan menggunakan teknologi _Cloud Data Warehouse_ seperti BigQuery atau Snowflake untuk mengolah data jutaan transaksi tersebut?

d. Identifikasi satu tantangan **Data Quality** yang mungkin muncul saat menggabungkan data alamat pelanggan dari aplikasi _mobile_ dan data dari mesin kasir fisik.

e. Bagaimana peran **Change Data Capture (CDC)** dalam membantu proses sinkronisasi stok tanpa harus menarik seluruh data (full load) setiap 15 menit?

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Metode Pergerakan Data**, pilih karakteristik yang tepat:
    
    - **ETL:** a) Transformasi di staging b) Transformasi di target c) Tanpa transformasi d) Transformasi manual
        
    - **Data Virtualization:** a) Data tidak pindah b) Data pindah ke disk c) Data dihapus d) Data di-enkripsi
        
2. Mengenai **Konsep Latensi**, pilih pasangan yang benar:
    
    - **Batch:** a) Proses periodik (misal: harian) b) Proses instan c) Proses per detik d) Tanpa jadwal
        
    - **Real-time:** a) Jeda minimal (< 1 detik) b) Jeda 1 jam c) Jeda 1 hari d) Jeda 1 minggu
        
3. Terkait **Pola Integrasi**, pilih sifat arsitekturnya:
    
    - **Enterprise Service Bus (ESB):** a) Berbasis pesan (Messaging) b) Tanpa middleware c) Hubungan langsung d) Hanya untuk file
        
    - **Point-to-Point:** a) Spaghetti architecture b) Terstruktur c) Skalabilitas tinggi d) Menggunakan Hub
        
4. Dalam **Data Mapping**, pilih elemen transformasinya:
    
    - **Filtering:** a) Membuang data tidak relevan b) Menambah kolom c) Mengubah warna d) Mengurutkan data
        
    - **Aggregation:** a) Menjumlahkan/Merangkum data b) Memecah data c) Menghapus data d) Mengganti nama
        
5. Mengenai **Master Data Management (MDM)**, pilih tujuannya:
    
    - **Data Consistency:** a) Menghilangkan versi berbeda b) Menambah data c) Menghapus database d) Membuat web
        
    - **Entity Resolution:** a) Mengidentifikasi data orang yang sama b) Mencari virus c) Memperbaiki RAM d) Install OS
        
6. Terkait **Alat Bantu Integrasi**, pilih teknologi yang sesuai:
    
    - **EAI (Enterprise Application Integration):** a) Fokus integrasi aplikasi b) Fokus integrasi hardware c) Fokus marketing d) Fokus HR
        
    - **EDI (Electronic Data Interchange):** a) Pertukaran dokumen bisnis standar b) Pertukaran email c) Pertukaran voice d) Pertukaran video
        
7. Mengenai **Modern Architecture**, pilih tempat penyimpanan datanya:
    
    - **Data Lake:** a) Simpan data mentah (raw) b) Simpan data rapi c) Simpan log saja d) Simpan metadata saja
        
    - **Data Warehouse:** a) Simpan data terstruktur & bersih b) Simpan data kotor c) Simpan sampah d) Simpan hardware
        
8. Dalam **Change Data Capture (CDC)**, pilih mekanismenya:
    
    - **Log-based:** a) Baca log transaksi DB b) Baca file excel c) Tanya user d) Cek fisik barang
        
    - **Trigger-based:** a) Gunakan trigger di DB b) Gunakan alarm c) Gunakan sensor d) Gunakan jadwal harian
        
9. Terkait **Integrasi Interoperability**, pilih standar formatnya:
    
    - **XML/JSON:** a) Format pertukaran data b) Format gambar c) Format video d) Format audio
        
    - **API/Web Services:** a) Cara aplikasi berkomunikasi b) Cara aplikasi mati c) Cara instalasi d) Cara penulisan kode
        
10. Mengenai **Data Quality in Integration**, pilih proses pembersihannya:
    
    - **Parsing:** a) Memecah string data b) Menggabungkan tabel c) Menghapus index d) Restart server
        
    - **Enrichment:** a) Menambah info dari sumber luar b) Mengurangi data c) Mengunci data d) Menjual data
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau terminologi dalam Integrasi Data (DII) berikut:**

- **Extract-Transform-Load (ETL) Engine:** ______________________________
    
- **Source-to-Target Mapping:** ________________________________________
    
- **Publish/Subscribe (Pub-Sub) Pattern:** _____________________________
    
- **Data Cleansing on Staging:** _______________________________________
    
- **Semantic Interoperability:** _______________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket A)

### Bagian I (Matrix)

1. ETL | 2. ELT | 3. CDC | 4. Virtualization | 5. ETL
    

### Bagian II (Benar/Salah)

1. S | 2. S | 3. B | 4. B | 5. B
    

### Bagian III (Komparatif)

- ETL: Transformasi di Engine Staging; Volume: Sedang; Kesiapan: Data bersih sebelum masuk target.
    
- ELT: Transformasi di Target (DB); Volume: Besar/Big Data; Kesiapan: Data mentah masuk dulu, baru diproses.
    

### Bagian IV (Scaffolding)

a. Atribut sumber | b. Tipe data (VARCHAR/INT) | c. Uppercase/Formatted | d. Default value (misal: 'N/A') | e. Batch/Real-time.

### Bagian V (Studi Kasus)

a. Near Real-time (karena ada jeda 15 menit, bukan instan milidetik).

b. Hub-and-Spoke (untuk skalabilitas, agar tidak terjadi kerumitan koneksi Point-to-Point saat cabang bertambah).

c. Karena Warehouse tersebut memiliki kekuatan komputasi (CPU/RAM) yang sangat besar untuk melakukan transformasi secara internal (Push-down optimization).

d. Inkonsistensi format (misal: aplikasi mobile menggunakan koordinat GPS, kasir menggunakan alamat teks manual).

e. CDC memantau perubahan pada database POS dan hanya mengirimkan data yang berubah saja, sehingga menghemat bandwidth dan mempercepat sinkronisasi.

### Bagian VI (Pilihan Ganda)

1. a, a | 2. a, a | 3. a, a | 4. a, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- ETL Engine: Perangkat lunak yang menjalankan logika ekstraksi dan transformasi.
    
- Mapping: Dokumen yang menjelaskan hubungan kolom antara sumber dan target.
    
- Pub-Sub: Pola di mana pengirim pesan (publisher) tidak mengirim langsung ke penerima tertentu, tapi ke kategori/topic.
    
- Cleansing: Proses standarisasi data di area sementara agar tidak mengotori target utama.
    
- Semantic: Kemampuan sistem untuk bertukar data dengan makna yang dipahami bersama secara tepat.