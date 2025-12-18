_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Management - Paket B

**Mata Pelajaran:** Sistem Basis Data

**Topik:** DAMA Knowledge Areas, Data Quality, Metadata, & Advanced Ethics

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal B ini, mahasiswa diharapkan dapat:

1. Mengidentifikasi fungsi dari berbagai _Knowledge Areas_ dalam DAMA-DMBOK.
    
2. Menganalisis dimensi kualitas data untuk pemecahan masalah operasional.
    
3. Membedakan peran Metadata Teknis, Bisnis, dan Operasional.
    
4. Mengevaluasi risiko etika dalam penggunaan data besar (_Big Data_) dan AI.
    
5. Merancang langkah-langkah peningkatan kualitas data secara sistematis.
    

## BAGIAN I: Tabel Matrix - DAMA Knowledge Areas (Format A) [10 Poin]

**Instruksi:** Cocokkan aktivitas di bawah ini dengan _Knowledge Area_ yang paling sesuai pada roda DAMA (DAMA Wheel).

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**No**|**Aktivitas Pengelolaan Data**|**Data Quality**|**Metadata Mgmt**|**Data Security**|**Master Data**|
|1|Menetapkan definisi standar untuk entitas bisnis utama seperti "Pelanggan".|||||
|2|Mengatur hak akses (role-based access control) untuk melindungi data sensitif.|||||
|3|Mengidentifikasi dan memperbaiki data yang duplikat atau tidak konsisten.|||||
|4|Mendokumentasikan silsilah data (_data lineage_) dari sumber hingga laporan.|||||
|5|Mengelola integrasi data dari berbagai sistem untuk mendapatkan _single version of truth_.|||||

## BAGIAN II: Benar/Salah - Lifecycle & Quality (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|Biaya untuk memperbaiki kualitas data di awal siklus hidup lebih murah daripada memperbaikinya saat sudah di tahap pelaporan.|||
|2|_Data Profiling_ adalah proses statistik untuk memahami frekuensi, pola, dan anomali dalam dataset.|||
|3|Metadata hanya berguna bagi tim IT dan tidak memberikan nilai bagi pengguna bisnis.|||
|4|Penghapusan data (_Data Destruction_) harus dilakukan secara permanen dan tidak dapat dipulihkan untuk memenuhi standar etika privasi.|||
|5|Kualitas data yang buruk seringkali disebabkan oleh masalah teknis, bukan karena kesalahan proses bisnis.|||

## BAGIAN III: Tabel Analisis Komparatif - Jenis Metadata (Format C) [15 Poin]

**Instruksi:** Bandingkan tiga jenis metadata berikut berdasarkan fokus dan audiens utamanya.

|   |   |   |   |   |
|---|---|---|---|---|
|**Jenis Metadata**|**Fokus Informasi**|**Contoh Elemen**|**Audiens Utama**|**Justifikasi Nilai**|
|**Business Metadata**|||||
|**Technical Metadata**|||||
|**Operational Metadata**|||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi alur **Peningkatan Kualitas Data (Data Quality Improvement)** berikut.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Deskripsi Aksi**|
|a.|Define|Menentukan standar kualitas dan ...|
|b.|Profile|Menganalisis data saat ini untuk menemukan ...|
|c.|Root Cause|Mencari penyebab mengapa data tersebut ...|
|d.|Remediate|Melakukan pembersihan atau perbaikan proses di ...|
|e.|Monitor|Melakukan pengecekan berkala menggunakan ...|

## BAGIAN V: Studi Kasus Multi-Bagian - Etika & Big Data (Format E) [20 Poin]

Kasus:

Sebuah perusahaan ritel raksasa menggunakan algoritma untuk menganalisis kebiasaan belanja pelanggan guna memprediksi kehamilan. Algoritma ini mengirimkan kupon produk bayi kepada seorang remaja sebelum ayahnya mengetahui bahwa ia hamil. Data ini didapat dari analisis pola pembelian sabun tanpa aroma dan suplemen tertentu.

Pertanyaan:

a. Dari sisi Etika Penanganan Data, apakah tindakan prediksi tanpa izin subjek ini melanggar prinsip Right to Privacy? Jelaskan.

b. Identifikasi risiko Unintended Consequences (konsekuensi tak terduga) dari penggunaan data analitik dalam kasus ini.

c. Bagaimana prinsip Transparency (transparansi) dapat diterapkan agar pelanggan tahu bagaimana data mereka digunakan untuk profil pemasaran?

d. Sebutkan satu dimensi Kualitas Data yang terancam jika sistem salah memprediksi (false positive) dan mengirimkan kupon tersebut kepada orang yang tidak relevan.

e. Rekomendasikan satu kebijakan dalam Data Governance untuk membatasi penggunaan data sensitif (seperti data kesehatan/prediksi medis) untuk tujuan pemasaran.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Dimensi Kualitas Data**, pilih pasangan yang tepat:
    
    - **Accuracy:** a) Data sesuai kenyataan b) Data tepat waktu c) Data tidak kosong d) Data rahasia
        
    - **Consistency:** a) Data sama di berbagai sistem b) Data unik c) Data berwarna d) Data terenkripsi
        
2. Mengenai **Data Handling Ethics**, pilih prinsip yang benar:
    
    - **Non-Maleficence:** a) Jangan merugikan b) Beri diskon c) Simpan selamanya d) Jual data
        
    - **Informed Consent:** a) Izin tanpa dipaksa b) Syarat & ketentuan tersembunyi c) Paksaan d) Tanpa izin
        
3. Terkait **Master Data Management (MDM)**, pilih karakteristiknya:
    
    - **Fungsi Utama:** a) Kelola data referensi inti b) Backup database c) Hapus log d) Design UI
        
    - **Data Entitas:** a) Produk, Pelanggan, Lokasi b) Nilai transaksi harian c) Alamat IP d) CPU usage
        
4. Dalam konteks **Metadata**, pilih karakteristik Technical Metadata:
    
    - **Isi:** a) Tipe data & panjang kolom b) Definisi KPI c) Nama manajer d) Strategi diskon
        
    - **Sumber:** a) Data Dictionary/Catalog b) Email CEO c) Media sosial d) Struk belanja
        
5. Mengenai **Data Security**, pilih mekanisme perlindungan:
    
    - **Masking:** a) Sembunyikan sebagian data b) Hapus data c) Tambah data d) Jual data
        
    - **Encryption:** a) Ubah data jadi kode rahasia b) Copy data c) Analisis data d) Share data publik
        
6. Terkait **Data Architecture**, pilih artefak yang dihasilkan:
    
    - **Model Data:** a) Diagram ERD/Class b) Kode Python c) Manual user d) Desain logo
        
    - **Data Flow:** a) Alur perpindahan data b) Alur listrik c) Alur kas d) Alur parkir
        
7. Mengenai **Data Quality Tools**, pilih fitur utamanya:
    
    - **Parsing:** a) Memecah komponen data b) Menggabungkan disk c) Menghapus user d) Mematikan server
        
    - **Standardization:** a) Menyamakan format b) Mengubah isi data c) Menghapus database d) Membuat tabel baru
        
8. Dalam **Data Governance roles**, pilih tanggung jawab Data Custodian:
    
    - **Aspek Teknis:** a) Keamanan & penyimpanan fisik b) Menetapkan nilai bisnis c) Menyetujui budget d) Marketing
        
    - **Kepatuhan:** a) Jalankan kebijakan DG b) Membuat kebijakan baru c) Menghapus aturan d) Mengabaikan audit
        
9. Terkait **Data Warehousing**, pilih fokus utamanya:
    
    - **Tujuan:** a) Analitik & Pelaporan b) Transaksi harian (OLTP) c) Hosting web d) Chatting
        
    - **Data:** a) Historis & Terintegrasi b) Data sementara c) Data acak d) Metadata saja
        
10. Mengenai **Big Data Ethics**, pilih tantangan utamanya:
    
    - **Algorithmic Bias:** a) Diskriminasi oleh kode b) Kecepatan CPU c) Kapasitas disk d) Harga sensor
        
    - **Ownership:** a) Siapa pemilik data hasil olahan b) Merk server c) Lokasi gedung d) Warna kabel
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan 5 Prinsip Etika Data menurut Framework DAMA:**

- **Ownership:** ________________________________________________________
    
- **Transactionality:** _________________________________________________
    
- **Consent:** __________________________________________________________
    
- **Privacy:** __________________________________________________________
    
- **Currency:** _________________________________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket B)

### Bagian I (Matrix)

1. Master Data | 2. Data Security | 3. Data Quality | 4. Metadata | 5. Master Data
    

### Bagian II (Benar/Salah)

1. B | 2. B | 3. S | 4. B | 5. S (Proses bisnis sering jadi akar masalah)
    

### Bagian III (Komparatif)

- Business: Arti istilah bisnis, pemilik data. Audiens: User Bisnis.
    
- Technical: Struktur tabel, tipe data. Audiens: Developer/DBA.
    
- Operational: Log eksekusi, statistik load. Audiens: Data Ops/Support.
    

### Bagian IV (Scaffolding)

a. Metrik (threshold) | b. Anomali/Error | c. Terjadi (System/Human) | d. Sumber (Source) | e. Dashboard/Reports.

### Bagian V (Studi Kasus)

a. Ya, karena melakukan pemprofilan sensitif tanpa persetujuan untuk tujuan yang tidak diharapkan subjek.

b. Kerusakan reputasi, trauma emosional subjek, dan potensi masalah hukum.

c. Menyediakan kebijakan privasi yang jelas dan opsi bagi pelanggan untuk tidak dilacak pola belanjanya.

d. Accuracy (jika prediksi salah) atau Relevancy.

e. Kebijakan "Data Privacy Impact Assessment" (DPIA) untuk setiap algoritma baru yang menggunakan data personal.

### Bagian VI (Pilihan Ganda)

1. a, a | 2. a, a | 3. a, a | 4. a, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- Ownership: Hak kontrol subjek atas data mereka.
    
- Transactionality: Transparansi dalam pertukaran data.
    
- Consent: Izin eksplisit penggunaan data.
    
- Privacy: Perlindungan identitas dan data sensitif.
    
- Currency: Hak subjek untuk mendapatkan imbalan/nilai dari data mereka.