_back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Governance - Paket B

**Mata Pelajaran:** Sistem Basis Data

**Topik:** Spesialisasi Stewardship, Strategi DG, Manajemen Isu, dan Optimasi Kematangan

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal B ini, mahasiswa diharapkan dapat:

1. Menganalisis perbedaan peran antara berbagai jenis _Data Steward_ (Domain, Project, Lead).
    
2. Mengevaluasi penerapan strategi DG _Defensive_ vs _Offensive_ berdasarkan kebutuhan bisnis.
    
3. Merancang alur resolusi isu data (Issue Management) yang efektif.
    
4. Mengidentifikasi karakteristik kematangan tingkat lanjut (Level 4 dan 5).
    
5. Menyusun artefak tata kelola seperti _Business Glossary_ dan _Data Lineage_ dalam konteks organisasi.
    

## BAGIAN I: Tabel Matrix - Spesialisasi Stewardship (Format A) [10 Poin]

**Instruksi:** Cocokkan aktivitas berikut dengan jenis _Data Steward_ yang paling bertanggung jawab.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Aktivitas Operasional**|**Project Steward**|**Domain Steward**|**Lead/Enterprise Steward**|
|1|Bertanggung jawab atas kualitas data pada area subjek tertentu (misal: Data Produk) secara lintas departemen.||||
|2|Menangani kebutuhan tata kelola data pada siklus pengembangan aplikasi spesifik atau migrasi sistem tertentu.||||
|3|Mengoordinasikan standar tata kelola di seluruh organisasi dan mendukung kebijakan tingkat eksekutif.||||
|4|Mendefinisikan aturan bisnis dan standar kualitas untuk data "Customer" yang digunakan di seluruh cabang.||||
|5|Memastikan dataset yang digunakan dalam modul "Laporan Keuangan Q4" telah memenuhi kriteria audit.||||

## BAGIAN II: Benar/Salah - Strategi & Implementasi (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|Strategi DG _Defensive_ lebih fokus pada peningkatan pendapatan (revenue) melalui analitik prediktif daripada kepatuhan regulasi.|||
|2|_Non-Invasive Data Governance_ mengasumsikan bahwa peran tata kelola sebenarnya sudah ada di organisasi, hanya perlu diidentifikasi dan diformalkan.|||
|3|Keberhasilan _Data Governance_ diukur hanya dari jumlah baris data yang diperbaiki, bukan dari pengurangan risiko operasional.|||
|4|_Data Lineage_ membantu organisasi melacak asal-usul data dan bagaimana data tersebut berubah saat berpindah antar sistem.|||
|5|Pada tingkat kematangan _Level 4 (Managed)_, kualitas data sudah dikontrol secara kuantitatif melalui metrik statistik yang ketat.|||

## BAGIAN III: Tabel Analisis Komparatif - Strategi DG (Format C) [15 Poin]

**Instruksi:** Bandingkan dua pendekatan strategi Tata Kelola Data berikut.

|   |   |   |   |
|---|---|---|---|
|**Aspek Komparasi**|**Strategi Defensive**|**Strategi Offensive**|**Justifikasi Transisi**|
|**Prioritas Utama**|Kepatuhan & Keamanan|||
|**Fokus Arsitektur**|Kontrol terpusat (SSOT)|||
|**Contoh Target**|Laporan Audit/Regulatori|||

## BAGIAN IV: Step-by-Step Scaffolding - Issue Management (Format D) [15 Poin]

**Instruksi:** Lengkapi alur proses **Manajemen Isu Data** (resolusi jika ditemukan ketidakkonsistenan data).

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Deskripsi Aksi / Penanggung Jawab**|
|a.|Identification|Menemukan dan mencatat isu data ke dalam ...|
|b.|Triage|Menilai tingkat keparahan (prioritas) dan menentukan ...|
|c.|Root Cause Analysis|Melakukan investigasi mendalam untuk menemukan penyebab ...|
|d.|Resolution|Implementasi perbaikan data atau perubahan proses oleh ...|
|e.|Verification|Melakukan pengecekan ulang dan menutup tiket isu oleh ...|

## BAGIAN V: Studi Kasus Multi-Bagian - Kematangan & Eskalasi (Format E) [20 Poin]

Kasus:

Sebuah perusahaan logistik internasional memiliki program DG yang sudah berjalan 2 tahun. Saat ini, setiap departemen sudah memiliki kamus data masing-masing, namun belum ada kamus terpusat yang disepakati (Enterprise Business Glossary). Masalah muncul ketika departemen "Operasional" mendefinisikan "Waktu Pengiriman" sejak barang keluar gudang, sementara "Customer Service" mendefinisikannya sejak pesanan masuk.

Pertanyaan:

a. Berdasarkan kasus perbedaan definisi di atas, identifikasi area pengetahuan (Knowledge Area) DG mana yang sedang gagal diimplementasikan?

b. Jika perusahaan ingin naik dari Level 2 (Repeatable) ke Level 3 (Defined), langkah apa yang harus dilakukan terkait standarisasi definisi "Waktu Pengiriman" tersebut?

c. Siapa yang berhak memutuskan definisi final jika terjadi kebuntuan (deadlock) antara departemen Operasional dan Customer Service?

d. Sebutkan satu keuntungan memiliki Data Lineage yang jelas dalam menyelesaikan masalah perbedaan angka laporan antar departemen ini.

e. Usulkan satu metrik Data Governance (non-kualitas data) yang menunjukkan bahwa organisasi ini sedang menuju tingkat kematangan yang lebih tinggi.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Mengenai **Data Governance Framework**, pilih komponen yang tepat:
    
    - **Guiding Principles:** a) Standar teknis b) Nilai-nilai dasar (Integrity, Transparency) c) Kode SQL d) Merk software
        
    - **Accountability:** a) Siapa yang boleh menyalahkan b) Kejelasan tanggung jawab peran DG c) Jumlah server d) Lokasi backup
        
2. Terkait **Data Maturity Models**, pilih karakteristik tingkat lanjut:
    
    - **Level 5 (Optimized):** a) Proses otomatis & continuous improvement b) Baru mulai c) Menggunakan Excel d) Manual total
        
    - **Pengukuran:** a) Kualitatif saja b) Kuantitatif & Terukur c) Tebakan d) Tidak diukur
        
3. Mengenai **Data Stewardship Types**, pilih pasangannya:
    
    - **Domain Steward:** a) Fokus area subjek data b) Fokus satu aplikasi saja c) Fokus hardware d) Fokus HR
        
    - **Project Steward:** a) Fokus siklus hidup proyek b) Fokus selamanya c) Fokus strategi global d) Fokus budget
        
4. Terkait **Strategi DG**, pilih implementasi yang sesuai:
    
    - **Defensive:** a) Mitigasi risiko & Fraud detection b) Kampanye marketing c) Mencari nasabah baru d) Ekspansi pasar
        
    - **Offensive:** a) Data science & Customer insight b) Audit pajak c) Pengarsipan data lama d) Enkripsi database
        
5. Dalam konteks **Artefak DG**, pilih fungsi yang benar:
    
    - **Business Glossary:** a) Definisi istilah bisnis b) Skema fisik tabel c) Daftar nama karyawan d) Manual hardware
        
    - **Data Dictionary:** a) Struktur teknis kolom & tipe data b) Strategi CEO c) Alamat kantor d) Jadwal meeting
        
6. Mengenai **Issue Management**, pilih langkah eskalasi:
    
    - **Eskalasi 1:** a) Dari Steward ke Council b) Dari Staff ke Satpam c) Dari Client ke Vendor d) Dari IT ke Marketing
        
    - **Trigger:** a) Masalah tidak selesai di level operasional b) Komputer mati c) Ganti hari d) Password lupa
        
7. Terkait **Kualitas Data dalam DG**, pilih aturan (rules) yang tepat:
    
    - **Data Quality Rules:** a) Ambang batas (threshold) error b) Jumlah kabel c) Merk monitor d) Jam kerja
        
    - **Enforcement:** a) Dilakukan di level entri/sumber b) Dilakukan di laporan saja c) Tidak dilakukan d) Hanya saat audit
        
8. Dalam **Data Governance roles**, pilih tanggung jawab Data Owner:
    
    - **Hak Akses:** a) Memberi otorisasi penggunaan data b) Meminjamkan laptop c) Mengatur AC d) Menentukan gaji
        
    - **Valuasi:** a) Menentukan nilai bisnis aset data b) Menghitung harga disk b) Membayar tagihan listrik d) Menjual data
        
9. Terkait **Change Management**, pilih elemen keberhasilannya:
    
    - **Budaya:** a) Literasi data & dukungan pimpinan b) Software mahal c) Kantor mewah d) Koneksi internet cepat
        
    - **Komunikasi:** a) Sosialisasi manfaat DG b) Rahasia perusahaan c) Memo tertutup d) Tanpa pengumuman
        
10. Mengenai **Data Governance Tools**, pilih fungsionalitas utama:
    
    - **Cataloging:** a) Inventarisasi aset data b) Menghapus data c) Restart server d) Mengirim email
        
    - **Workflow:** a) Alur persetujuan kebijakan/isu b) Alur listrik c) Alur air d) Alur parkir
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau konsep dalam Tata Kelola Data (DG) berikut:**

- **Single Source of Truth (SSOT):** ____________________________________
    
- **Enterprise Data Warehouse (EDW) in DG:** ___________________________
    
- **Data Privacy Impact Assessment (DPIA):** ___________________________
    
- **Data Stewardship Council:** ________________________________________
    
- **Data Governance Metrics (ROI):** ____________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket B)

### Bagian I (Matrix)

1. Domain | 2. Project | 3. Lead | 4. Domain | 5. Project
    

### Bagian II (Benar/Salah)

1. S | 2. B | 3. S | 4. B | 5. B
    

### Bagian III (Komparatif)

- Defensive: Fokus: Kepatuhan; Arsitektur: SSOT/Kontrol Ketat; Target: Audit/Regulasi.
    
- Offensive: Fokus: Nilai Bisnis/Insight; Arsitektur: Multiple Version/Flexibility; Target: Analitik/Revenue.
    
- Justifikasi: Organisasi butuh Defensive untuk fondasi keamanan, lalu Offensive untuk keunggulan kompetitif.
    

### Bagian IV (Scaffolding)

a. Issue Log | b. Data Steward terkait | c. Masalah (Data/System) | d. Tim IT/Bisnis | e. Data Steward/User.

### Bagian V (Studi Kasus)

a. Metadata Management (Business Glossary) dan Data Standardization.

b. Membentuk kelompok kerja (working group) untuk menyepakati satu definisi tunggal (Global Definition) yang didokumentasikan dalam Enterprise Business Glossary.

c. Data Governance Council (DGC) atau Chief Data Officer (CDO).

d. Membantu melihat di mana kalkulasi "waktu" tersebut berubah/dihitung sehingga bisa diidentifikasi titik perbedaan formulanya secara teknis.

e. "Data Literacy Rate" (Tingkat pemahaman staf terhadap standar data) atau "Number of Resolved Data Issues per Quarter".

### Bagian VI (Pilihan Ganda)

1. b, b | 2. a, b | 3. a, a | 4. a, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- SSOT: Konsep di mana satu data hanya memiliki satu referensi benar di seluruh organisasi.
    
- EDW in DG: Gudang data terintegrasi yang menjadi objek utama pengetatan kebijakan DG.
    
- DPIA: Proses identifikasi risiko privasi sebelum menjalankan proyek data baru.
    
- Stewardship Council: Forum di mana para steward bertemu untuk menyelaraskan aturan data antar departemen.
    
- ROI: Metrik untuk mengukur nilai finansial yang didapat (misal: penghematan biaya operasional) dari program DG.