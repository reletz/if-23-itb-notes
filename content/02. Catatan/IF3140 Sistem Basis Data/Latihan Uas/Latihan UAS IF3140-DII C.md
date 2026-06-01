_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Integration and Interoperability - Paket C

**Mata Pelajaran:** Sistem Basis Data

**Topik:** Modern Architectures (Data Lakehouse), API-led Connectivity, Data Orchestration, and Cloud Integration

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal C ini, mahasiswa diharapkan dapat:

1. Membedakan karakteristik dan evolusi arsitektur dari Data Warehouse, Data Lake, hingga Data Lakehouse.
    
2. Mengimplementasikan prinsip API-led Connectivity (System, Process, dan Experience APIs).
    
3. Mengevaluasi penggunaan teknologi streaming (Kafka/Flink) dalam arsitektur integrasi modern.
    
4. Memahami konsep Data Mesh dan Data Fabric sebagai pendekatan tata kelola integrasi baru.
    
5. Menganalisis kebutuhan orkestrasi data pada lingkungan Hybrid/Multi-Cloud.
    

## BAGIAN I: Tabel Matrix - Evolusi Arsitektur Data (Format A) [10 Poin]

**Instruksi:** Tentukan arsitektur mana yang paling sesuai dengan karakteristik berikut dengan memberikan tanda (X).

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Karakteristik Arsitektur**|**Data Warehouse**|**Data Lake**|**Data Lakehouse**|
|1|Fokus pada data terstruktur dengan skema kaku (_Schema-on-Write_).||||
|2|Menyimpan data mentah (_raw_) dalam format apa pun (structured, semi, unstructured).||||
|3|Mendukung fitur ACID transaksional di atas penyimpanan objek yang murah.||||
|4|Memisahkan penyimpanan (storage) dan komputasi secara total untuk skalabilitas awan.||||
|5|Menggunakan metadata layer untuk memberikan performa tinggi pada data di storage mentah.||||

## BAGIAN II: Benar/Salah - Modern Integration Patterns (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Data Mesh_ adalah pendekatan sosiotehnikal yang mendesentralisasi kepemilikan data ke domain bisnis.|||
|2|Dalam _API-led Connectivity_, "System API" adalah lapisan yang langsung berinteraksi dengan pengguna akhir (Mobile/Web).|||
|3|_Data Orchestration_ bertugas mengatur ketergantungan antar tugas (tasks) dalam pipa data yang kompleks.|||
|4|Integrasi berbasis _Streaming_ hanya bisa menangani data dalam jumlah kecil karena diproses per kejadian.|||
|5|_iPaaS_ (Integration Platform as a Service) memungkinkan integrasi antar aplikasi cloud tanpa infrastruktur on-premise.|||

## BAGIAN III: Tabel Analisis Komparatif - Batch vs Streaming (Format C) [15 Poin]

**Instruksi:** Bandingkan dua paradigma pemrosesan data berikut.

|   |   |   |   |
|---|---|---|---|
|**Aspek Komparasi**|**Batch Processing**|**Stream Processing**|**Justifikasi Kebutuhan**|
|**Satuan Data**|Kumpulan data besar (Bound)|||
|**Latensi**|Menit hingga Jam|||
|**Kompleksitas**|Relatif Rendah|||

## BAGIAN IV: Step-by-Step Scaffolding - API-led Connectivity (Format D) [15 Poin]

**Instruksi:** Lengkapi alur desain integrasi menggunakan pendekatan **API-led Connectivity**.

|   |   |   |
|---|---|---|
|**Langkah**|**Lapisan API**|**Deskripsi Aksi Utama**|
|a.|System APIs|Membuat lapisan akses yang aman ke sistem inti (ERP/Legacy) tanpa ...|
|b.|Process APIs|Menggabungkan data dari beberapa System APIs untuk membentuk ...|
|c.|Experience APIs|Menyesuaikan data dari Process APIs agar sesuai dengan format yang dibutuhkan oleh ...|
|d.|Reusability|Memastikan bahwa System APIs yang sudah dibuat dapat digunakan kembali oleh ...|
|e.|Security|Menerapkan kebijakan keamanan (API Key/OAuth) pada setiap ...|

## BAGIAN V: Studi Kasus Multi-Bagian - Cloud-Native Integration (Format E) [20 Poin]

Kasus:

Sebuah perusahaan logistik global, "SkyExpress", beralih ke arsitektur Multi-Cloud. Mereka menggunakan AWS untuk penyimpanan data mentah, Google Cloud untuk mesin AI, dan aplikasi SaaS (Salesforce) untuk CRM. Mereka ingin agar setiap kali ada paket baru masuk, data tersebut langsung tersedia untuk diprediksi oleh mesin AI dan statusnya diperbarui di Salesforce dalam waktu kurang dari 5 detik.

Pertanyaan:

a. Berdasarkan kebutuhan waktu < 5 detik, apakah perusahaan sebaiknya menggunakan pendekatan Batch ETL atau Event-Driven Streaming? Jelaskan.

b. Sebutkan satu teknologi Message Broker atau Streaming Platform (misal: Kafka/Pub-Sub) yang cocok untuk menjadi tulang punggung integrasi ini.

c. Mengapa penggunaan Data Lakehouse (seperti Databricks atau Snowflake) lebih disarankan daripada Data Warehouse tradisional untuk menyimpan data paket yang beragam (foto bukti kirim, teks alamat, koordinat GPS)?

d. Jelaskan peran Experience API dalam mempermudah kurir di lapangan untuk mengakses data prediksi AI melalui aplikasi mobile mereka.

e. Sebutkan satu risiko integrasi Multi-Cloud terkait biaya transfer data (Egress Costs) yang perlu dipertimbangkan tim integrasi.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Arsitektur Data Mesh**, pilih prinsip utamanya:
    
    - **Kepemilikan:** a) Sentralisasi di tim Data b) Desentralisasi di tim Domain c) Tanpa pemilik d) Hanya CEO
        
    - **Data as a Product:** a) Data harus mudah ditemukan & berkualitas b) Data adalah rahasia c) Data dibuang d) Data manual
        
2. Mengenai **Streaming Processing Tools**, pilih teknologi yang tepat:
    
    - **Real-time Engine:** a) Apache Spark Streaming / Flink b) Microsoft Excel c) Notepad++ d) BIOS
        
    - **Data Ingestion:** a) Apache Kafka / Amazon Kinesis b) FTP manual c) Flashdisk d) Struk kertas
        
3. Terkait **API-led Connectivity Layers**, pilih urutan akses yang benar:
    
    - **Experience API:** a) Interaksi User b) Interaksi Database c) Interaksi Kabel d) Interaksi Listrik
        
    - **Process API:** a) Logika Bisnis b) User Interface c) Hard Drive d) RAM
        
4. Dalam konteks **iPaaS (Integration Platform as a Service)**, pilih karakteristiknya:
    
    - **Deployment:** a) Berbasis Cloud b) Harus install server fisik c) Offline d) Tanpa internet
        
    - **Connector:** a) Library siap pakai untuk SaaS (Salesforce, dll) b) Coding manual dari nol c) Tanpa koneksi d) Kabel LAN
        
5. Mengenai **Data Lakehouse**, pilih fitur kuncinya:
    
    - **Storage:** a) Object Storage (S3/Azure Blob) b) Floppy Disk c) CD-ROM d) Tape
        
    - **Feature:** a) Support ACID Transactions b) Hanya data teks c) Tanpa metadata d) Akses manual
        
6. Terkait **Data Orchestration**, pilih alat yang umum digunakan:
    
    - **Workflow Tool:** a) Apache Airflow / Dagster b) Adobe Photoshop c) VLC Player d) Winamp
        
    - **Struktur:** a) DAG (Directed Acyclic Graph) b) Garis lurus c) Lingkaran d) Tanpa struktur
        
7. Mengenai **Modern Data Stack**, pilih komponen transformasinya:
    
    - **Tools:** a) dbt (data build tool) b) Microsoft Paint c) Calculator d) Web Browser
        
    - **Method:** a) SQL-based transformation b) Assembly language c) Binary d) Voice command
        
8. Dalam **Interoperability Standards**, pilih format modern:
    
    - **Format:** a) JSON / Avro / Parquet b) .exe c) .mp3 d) .avi
        
    - **Karakteristik:** a) Efisien untuk mesin & manusia b) Hanya untuk audio c) Sangat berat d) Berbayar mahal
        
9. Terkait **Hybrid Cloud Integration**, pilih solusinya:
    
    - **Connectivity:** a) VPN / Direct Connect b) Surat pos c) Telepon d) Radio
        
    - **Challenge:** a) Latensi jaringan & Keamanan b) Harga kertas c) Cuaca d) Warna kabel
        
10. Mengenai **Data Fabric**, pilih konsep intinya:
    
    - **Mekanisme:** a) Metadata-driven integration b) Manual copy-paste c) Hapus data d) Sembunyikan data
        
    - **Tujuan:** a) Automasi akses data b) Memperumit akses c) Menghapus database d) Mematikan server
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau konsep dalam Arsitektur Integrasi Modern berikut:**

- **Data Lakehouse (Definition):** _______________________________________
    
- **Event-Driven Architecture (EDA):** ___________________________________
    
- **Push vs Pull Integration:** _________________________________________
    
- **Idempotency in APIs:** ______________________________________________
    
- **Zero-ETL (Trend):** _________________________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket C)

### Bagian I (Matrix)

1. Warehouse | 2. Lake | 3. Lakehouse | 4. Lakehouse/Lake | 5. Lakehouse
    
    Skor: 2 poin per nomor.
    

### Bagian II (Benar/Salah)

1. B | 2. S (Experience API yang interaksi user) | 3. B | 4. S | 5. B
    
    Skor: 2 poin per nomor.
    

### Bagian III (Komparatif)

- Batch: Satuan: Bound; Latensi: Jam; Kompleksitas: Rendah.
    
- Streaming: Satuan: Unbound (Events); Latensi: Milidetik; Kompleksitas: Tinggi.
    
    Justifikasi: Gunakan Streaming untuk operasional real-time, Batch untuk analitik jangka panjang.
    

### Bagian IV (Scaffolding)

a. Mengekspos detail teknis | b. Logika Bisnis | c. Aplikasi/Pengguna | d. Banyak Process APIs | e. Endpoint/Lapisan.

Skor: 3 poin per langkah.

### Bagian V (Studi Kasus)

a. Event-Driven Streaming (karena butuh respons < 5 detik yang tidak mungkin dicapai Batch).

b. Apache Kafka atau Google Cloud Pub/Sub.

c. Karena Lakehouse mampu menyimpan data tidak terstruktur (foto bukti) sekaligus mendukung kueri cepat untuk data koordinat (structured).

d. Menyediakan data yang sudah diformat khusus untuk layar HP kurir, menggabungkan info rute dan hasil prediksi AI secara ringkas.

e. Egress Cost (biaya saat data keluar dari satu penyedia cloud ke penyedia lain) yang bisa membengkak jika data mentah sering dipindah antar cloud.

### Bagian VI (Pilihan Ganda)

1. b, a | 2. a, a | 3. a, a | 4. a, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- Lakehouse: Arsitektur gabungan fleksibilitas Data Lake dan performa/transaksional Data Warehouse.
    
- EDA: Desain sistem yang bereaksi terhadap perubahan state (events) secara asinkron.
    
- Push/Pull: Push (sumber kirim data), Pull (target ambil data).
    
- Idempotency: Sifat API di mana eksekusi berulang dengan input sama tidak akan merubah state lebih dari sekali.
    
- Zero-ETL: Tren integrasi di mana data direplikasi antar sistem secara otomatis tanpa perlu pipeline ETL manual.