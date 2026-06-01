_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Governance - Paket A

**Mata Pelajaran:** Manajemen Basis Data

**Topik:** Fondasi, Struktur Organisasi, Implementasi, dan Kematangan DG

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal A ini, mahasiswa diharapkan dapat:

1. Membedakan konsep _Data Governance_ (DG) dan _Data Management_ (DM).
    
2. Mengidentifikasi peran dan tanggung jawab dalam struktur organisasi DG (Owner, Steward, Custodian).
    
3. Memahami langkah-langkah implementasi program DG dalam organisasi.
    
4. Menganalisis tingkat kematangan tata kelola data menggunakan model standar (IBM/Stanford).
    
5. Menentukan metrik kinerja (KPI) yang relevan untuk keberhasilan program DG.
    

## BAGIAN I: Tabel Matrix - Peran dan Tanggung Jawab (Format A) [10 Poin]

**Instruksi:** Tentukan peran mana yang paling bertanggung jawab atas aktivitas berikut dengan memberikan tanda (X).

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Aktivitas Tata Kelola Data**|**Data Owner**|**Data Steward**|**Data Custodian**|
|1|Memiliki akuntabilitas bisnis tertinggi atas aset data tertentu.||||
|2|Menjalankan operasional teknis, backup, dan keamanan fisik data.||||
|3|Menjembatani kebutuhan bisnis dengan aturan kualitas data harian.||||
|4|Memberikan persetujuan (approval) atas akses data sensitif.||||
|5|Mengimplementasikan skema database dan kontrol akses teknis.||||

## BAGIAN II: Benar/Salah - Fondasi DG (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Data Governance_ adalah bagian dari IT, sehingga pimpinan bisnis tidak perlu terlibat dalam pengambilan keputusan data.|||
|2|Program DG yang sukses biasanya bersifat "proyek sekali jalan" dan berakhir setelah kebijakan dibuat.|||
|3|Salah satu tujuan utama DG adalah mengurangi risiko kepatuhan dan meningkatkan nilai bisnis data.|||
|4|_Data Stewardship_ fokus pada eksekusi taktis dari kebijakan yang telah ditetapkan oleh _Data Governance Council_.|||
|5|Model kematangan data membantu organisasi mengidentifikasi kesenjangan (_gap_) antara kondisi saat ini dengan target masa depan.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Bandingkan dua model struktur operasional DG berikut.

|   |   |   |   |
|---|---|---|---|
|**Aspek Komparasi**|**Terpusat (Centralized)**|**Terdesentralisasi (Federated)**|**Justifikasi Pemilihan**|
|**Otoritas Keputusan**||||
|**Kecepatan Adaptasi**||||
|**Konsistensi Standar**||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi alur **Implementasi Program DG** tahap awal berikut.

|   |   |   |
|---|---|---|
|**Langkah**|**Nama Tahapan**|**Deskripsi Aksi Utama**|
|a.|Assessment|Melakukan evaluasi terhadap tingkat ... saat ini.|
|b.|Strategy & Roadmap|Menentukan visi, misi, dan menyusun urutan ...|
|c.|Framework Design|Menetapkan struktur organisasi, peran, dan ...|
|d.|Policy Development|Membuat aturan tertulis mengenai standar dan ...|
|e.|Launch & Rollout|Melakukan sosialisasi dan menjalankan pilot project pada ...|

## BAGIAN V: Studi Kasus Multi-Bagian - Organisasi & Implementasi (Format E) [20 Poin]

Kasus:

Sebuah Bank Nasional baru saja mengalami audit yang menemukan bahwa data alamat nasabah berbeda-beda di sistem kartu kredit, tabungan, dan pinjaman. Bank tersebut memutuskan membentuk tim Data Governance. CEO menunjuk Kepala Divisi IT sebagai satu-satunya penanggung jawab. Namun, setelah 6 bulan, divisi Bisnis tetap tidak mau mengikuti standar data baru karena merasa itu "urusan IT".

Pertanyaan:

a. Berdasarkan prinsip Data Governance Foundation, mengapa penunjukan Kepala IT sebagai penanggung jawab tunggal dianggap kurang tepat?

b. Apa peran **Data Governance Council (DGC)** dalam menyelesaikan konflik antara divisi IT dan divisi Bisnis di atas?

c. Identifikasi satu jenis **Data Steward** (Business/Technical) yang paling dibutuhkan untuk membereskan masalah alamat nasabah yang tidak konsisten tersebut.

d. Jika Bank tersebut berada pada **Level 1 (Initial)** dalam model kematangan, sebutkan satu ciri utama operasional datanya saat ini.

e. Usulkan satu metrik (KPI) yang bisa digunakan tim DG untuk membuktikan bahwa kualitas data alamat nasabah telah membaik setelah program dijalankan.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Prinsip Dasar DG**, pilih karakteristik yang tepat:
    
    - **Fokus Utama:** a) Coding aplikasi b) Pengaturan (Governing) aset data c) Install server d) Marketing
        
    - **Orientasi:** a) Operasional murni b) Strategis & Bisnis c) Hardware d) Hanya keamanan
        
2. Mengenai **Struktur Organisasi DG**, pilih fungsi DGC:
    
    - **DGC (Council):** a) Level eksekutif pengambil kebijakan b) Tukang entri data c) Programmer d) Sales
        
    - **Frekuensi Pertemuan:** a) Tiap jam b) Berkala (Bulanan/Kuartalan) c) Sekali setahun d) Tidak pernah
        
3. Terkait **Data Stewardship**, pilih klasifikasi steward yang benar:
    
    - **Business Steward:** a) Paham proses bisnis & arti data b) Paham SQL & Scripting c) Jual produk d) Jaga satpam
        
    - **Technical Steward:** a) Paham struktur database & metadata b) Paham strategi harga c) Paham desain logo d) Paham legal
        
4. Dalam konteks **Implementasi DG**, pilih strategi yang disarankan:
    
    - **Pendekatan:** a) Big Bang (semua sekaligus) b) Iteratif/Bertahap c) Tanpa rencana d) Rahasia
        
    - **Komunikasi:** a) Terbuka & edukatif b) Hanya untuk IT c) Tidak perlu d) Lewat bisikan
        
5. Mengenai **Kematangan DG (IBM Model)**, pilih ciri levelnya:
    
    - **Level 3 (Defined):** a) Proses terstandarisasi b) Reaktif c) Sangat canggih d) Tanpa aturan
        
    - **Level 5 (Optimized):** a) Fokus perbaikan berkelanjutan b) Baru mulai c) Menggunakan Excel d) Sering crash
        
6. Terkait **Metrik Kinerja (KPI)**, pilih kategori yang tepat:
    
    - **Conformance:** a) Tingkat kepatuhan standar b) Jumlah klik c) Kecepatan CPU d) Warna kabel
        
    - **Business Value:** a) Pengurangan biaya/peningkatan profit b) Jumlah email c) Jumlah meja d) Luas kantor
        
7. Mengenai **Implementasi Praktis**, pilih hambatan umum:
    
    - **Budaya:** a) Resistensi terhadap perubahan b) Hardware terlalu baru c) Kantor terlalu bagus d) AC dingin
        
    - **Dukungan:** a) Kurangnya komitmen pimpinan b) Terlalu banyak uang c) User terlalu pintar d) Data terlalu sedikit
        
8. Dalam **Struktur Data Governance**, pilih peran penjamin teknis:
    
    - **Data Custodian:** a) Keamanan & Integritas fisik data b) Pembuat visi bisnis c) Pemilik dana d) Mencari nasabah
        
    - **Lokasi Kerja:** a) Data Center/IT Dept b) Front Office c) Kantin d) Parkiran
        
9. Terkait **Kerangka Kerja DG**, pilih fokus dimensi Stanford:
    
    - **People:** a) Struktur organisasi & stewardship b) Jumlah database c) Kecepatan jaringan d) Tipe kabel
        
    - **Policy:** a) Aturan & Standar b) Meja kantor c) Merek laptop d) Jatah cuti
        
10. Mengenai **Aktivitas DG**, pilih contoh implementasi praktis:
    
    - **Data Glossary:** a) Kamus istilah bisnis b) Daftar inventaris PC c) Jadwal shift d) Daftar menu
        
    - **Data Lineage:** a) Silsilah asal-usul data b) Aliran listrik c) Aliran air d) Aliran uang
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau model dalam Tata Kelola Data (DG) berikut:**

- **Data Governance Council (DGC):** ____________________________________
    
- **Enterprise Data Steward:** _________________________________________
    
- **IBM Maturity Model Level 2 (Repeatable):** __________________________
    
- **Non-Invasive Data Governance:** ____________________________________
    
- **Data Issue Log:** __________________________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket A)

### Bagian I (Matrix)

1. Owner | 2. Custodian | 3. Steward | 4. Owner | 5. Custodian
    

### Bagian II (Benar/Salah)

1. S | 2. S | 3. B | 4. B | 5. B
    

### Bagian III (Komparatif)

- Centralized: Otoritas tunggal, Lambat adaptasi lokal, Konsistensi sangat tinggi.
    
- Federated: Otoritas bersama, Cepat adaptasi per unit, Konsistensi menantang.
    

### Bagian IV (Scaffolding)

a. Kematangan (Maturity) | b. Prioritas (Inisiatif) | c. Metrik (KPI) | d. Prosedur | e. Unit Bisnis tertentu.

### Bagian V (Studi Kasus)

a. DG bukan proyek IT, tapi inisiatif bisnis. Harus ada keterwakilan pimpinan bisnis agar kebijakan ditaati.

b. Menetapkan kebijakan tingkat tinggi yang mengikat kedua belah pihak dan menyelaraskan tujuan data dengan strategi bank.

c. Business Data Steward (untuk mendefinisikan standar alamat yang benar secara bisnis).

d. Reaktif, tidak ada standar formal, penanganan masalah data dilakukan secara "ad-hoc".

e. Persentase data alamat yang unik dan tervalidasi antar sistem (Consistency Rate).

### Bagian VI (Pilihan Ganda)

1. b, b | 2. a, b | 3. a, a | 4. b, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- DGC: Komite pengambil keputusan tertinggi dalam program DG.
    
- Enterprise Steward: Steward yang mengelola data lintas departemen (domain besar).
    
- Level 2: Proses mulai berulang tapi belum terstandarisasi secara organisasi (masih per unit).
    
- Non-Invasive: Mengakui peran yang sudah ada tanpa merombak total struktur organisasi.
    
- Issue Log: Dokumentasi masalah data, pemilik masalah, dan status penyelesaiannya.