_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Governance - Paket C

**Mata Pelajaran:** Sistem Basis Data

**Topik:** Advanced Governance, Compliance (UU PDP/GDPR), Audit, & Change Management

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal C ini, mahasiswa diharapkan dapat:

1. Mengevaluasi kesiapan organisasi terhadap regulasi perlindungan data pribadi (UU PDP/GDPR).
    
2. Merancang prosedur _Data Privacy Impact Assessment_ (DPIA) untuk proyek data sensitif.
    
3. Menerapkan strategi _Change Management_ (seperti ADKAR) untuk membangun budaya sadar data.
    
4. Menganalisis hasil audit tata kelola data dan menyusun rencana perbaikan teknis.
    
5. Mengkalkulasi nilai ekonomi dan risiko dari aset data (Data Valuation).
    

## BAGIAN I: Tabel Matrix - Kepatuhan & Regulasi (Format A) [10 Poin]

**Instruksi:** Tentukan apakah tindakan berikut sesuai dengan prinsip GDPR/UU PDP atau melanggar aturan.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Tindakan / Kebijakan Organisasi**|**Sesuai (Compliant)**|**Melanggar (Non-Compliant)**|**Justifikasi Singkat**|
|1|Menyimpan data lokasi pengguna selamanya untuk keperluan riset masa depan tanpa batas waktu.||||
|2|Memberikan hak kepada pengguna untuk menarik kembali data yang pernah diunggah (_Right to Erasure_).||||
|3|Menggunakan data nomor telepon pelanggan dari divisi kurir untuk penawaran pinjaman bank tanpa izin.||||
|4|Melakukan enkripsi pada data KTP nasabah saat disimpan di database (_Data at Rest_).||||
|5|Mengumpulkan data hobi nasabah saat pendaftaran asuransi jiwa tanpa kaitan fungsional.||||

## BAGIAN II: Benar/Salah - Audit & Kematangan (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Data Privacy Impact Assessment_ (DPIA) wajib dilakukan hanya setelah terjadi kebocoran data.|||
|2|Audit DG bertujuan untuk memverifikasi apakah kebijakan yang tertulis benar-benar dijalankan secara teknis.|||
|3|Dalam model Stanford, dimensi "People" lebih menekankan pada spesifikasi server daripada struktur organisasi.|||
|4|_Cultural Change_ dalam DG seringkali lebih sulit dicapai daripada implementasi _Tools_ baru.|||
|5|Metrik _Data Quality_ seperti akurasi adalah satu-satunya indikator keberhasilan _Data Governance_.|||

## BAGIAN III: Tabel Analisis Komparatif - Jenis Audit DG (Format C) [15 Poin]

**Instruksi:** Bandingkan jenis-jenis pengawasan tata kelola berikut.

|   |   |   |   |   |
|---|---|---|---|---|
|**Jenis Audit/Review**|**Fokus Utama**|**Output Yang Dihasilkan**|**Frekuensi Ideal**|**Contoh Kasus**|
|**Compliance Audit**|Kepatuhan Hukum||||
|**Data Quality Audit**|Akurasi & Konsistensi||||
|**Operational Audit**|Efisiensi Proses DG||||

## BAGIAN IV: Step-by-Step Scaffolding - DPIA (Format D) [15 Poin]

**Instruksi:** Lengkapi alur pelaksanaan **Data Privacy Impact Assessment (DPIA)**.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Deskripsi Tindakan**|
|a.|Screening|Menentukan apakah proyek tersebut melibatkan data ...|
|b.|Description|Mendokumentasikan alur data dan tujuan ...|
|c.|Assessment|Menilai kebutuhan dan proporsionalitas pengumpulan data terhadap ...|
|d.|Risk Mitigation|Mengidentifikasi ancaman privasi dan menentukan langkah ...|
|e.|Sign-off|Mendapatkan persetujuan dari _Data Protection Officer_ (DPO) dan ...|

## BAGIAN V: Studi Kasus Multi-Bagian - Change Management (Format E) [20 Poin]

Kasus:

Sebuah perusahaan asuransi multinasional ingin beralih dari sistem silo ke Centralized Data Platform. Tantangannya adalah para manajer senior di daerah menolak membagi data mereka ke pusat karena takut kehilangan kendali dan otonomi. Mereka sengaja memasukkan data yang tidak lengkap agar tidak bisa digunakan oleh tim analitik pusat.

Pertanyaan:

a. Berdasarkan kerangka kerja Change Management, sebutkan satu alasan psikologis mengapa manajer daerah melakukan data hoarding (penimbunan data).

b. Bagaimana strategi **"Communication Plan"** dapat digunakan untuk mengubah persepsi para manajer tersebut?

c. Usulkan satu bentuk **"Incentive Structure"** (insentif) yang bisa diberikan kepada departemen yang rajin menjaga kualitas data di sistem pusat.

d. Jika perusahaan ingin menerapkan **Offensive DG strategy** pada kasus ini untuk meningkatkan profit, sebutkan satu inisiatif analitik yang bisa ditawarkan kepada manajer daerah sebagai timbal balik atas data mereka.

e. Sebutkan peran **Executive Sponsor** dalam menjamin transisi budaya dari _data silos_ ke _data sharing_ ini berjalan sukses.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Mengenai **Regulasi Perlindungan Data (PDP)**, pilih prinsip yang tepat:
    
    - **Data Minimization:** a) Ambil data sebanyak mungkin b) Ambil hanya data yang diperlukan c) Hapus data lama d) Jual data user
        
    - **Storage Limitation:** a) Simpan selamanya b) Simpan selama dibutuhkan tujuan awal c) Hapus log d) Backup di RAM
        
2. Terkait **Struktur Organisasi Lanjutan**, pilih peran spesialis:
    
    - **Data Protection Officer (DPO):** a) Penanggung jawab kepatuhan hukum data b) Perancang kabel LAN c) Sales kartu kredit d) CS
        
    - **Ethics Steward:** a) Pengawas bias algoritma & moralitas b) Pengatur jam kerja c) Programmer UI d) IT Support
        
3. Mengenai **Model Kematangan Stanford**, pilih komponen intinya:
    
    - **Capabilities:** a) Skill, Tools, & Infrastructure b) Hanya gaji c) Lokasi kantor d) Merek laptop
        
    - **People:** a) Peran, Tanggung Jawab, & Struktur b) Jumlah karyawan c) Tinggi badan d) Umur server
        
4. Terkait **Strategi DG & ROI**, pilih metrik nilai bisnis:
    
    - **Hard ROI:** a) Penghematan biaya denda regulasi b) Kepuasan pelanggan c) Warna dashboard d) Jumlah meeting
        
    - **Soft ROI:** a) Peningkatan kepercayaan nasabah b) Keuntungan langsung c) Jumlah baris tabel d) Kecepatan CPU
        
5. Dalam konteks **Data Valuation**, pilih pendekatan yang sesuai:
    
    - **Market-based:** a) Nilai data jika dijual b) Biaya membuat data dari nol c) Kerugian jika data hilang d) Tanpa nilai
        
    - **Cost-based:** a) Biaya pengumpulan & penyimpanan b) Manfaat bisnis c) Nilai aset fisik d) Gaji pegawai
        
6. Mengenai **Audit Tata Kelola**, pilih teknik pengujian:
    
    - **Substantive Testing:** a) Cek isi data langsung b) Cek dokumen kebijakan saja c) Tanya satpam d) Restart komputer
        
    - **Compliance Testing:** a) Verifikasi alur persetujuan (approval) b) Cek merk disk c) Cek suhu ruangan d) Cek kecepatan internet
        
7. Terkait **Change Management (ADKAR)**, pilih tahap awalnya:
    
    - **Awareness:** a) Sadar akan kebutuhan perubahan b) Bisa pakai tools baru c) Punya keinginan d) Dapat sertifikat
        
    - **Desire:** a) Keinginan untuk mendukung perubahan b) Terpaksa ikut c) Takut dipecat d) Mengabaikan instruksi
        
8. Dalam **Data Governance Tools**, pilih fitur _Security_ yang krusial:
    
    - **Data Masking:** a) Anonimisasi data saat tampil b) Hapus data c) Tambah data d) Ganti password
        
    - **Audit Trail:** a) Log jejak siapa akses data apa b) Aliran listrik c) Daftar absensi d) Daftar inventaris
        
9. Terkait **Manajemen Risiko Data**, pilih mitigasi yang tepat:
    
    - **Inherent Risk:** a) Risiko bawaan sebelum kontrol b) Risiko setelah audit c) Risiko server mati d) Risiko uang hilang
        
    - **Residual Risk:** a) Risiko tersisa setelah kontrol dijalankan b) Risiko total c) Risiko tanpa IT d) Risiko awal
        
10. Mengenai **Etika AI dalam DG**, pilih tantangan utamanya:
    
    - **Explainability:** a) Kemampuan menjelaskan keputusan AI b) Kecepatan AI c) Harga GPU d) Warna lampu server
        
    - **Transparency:** a) Keterbukaan algoritma & data sumber b) Sembunyikan kode c) Proteksi IP d) Rahasia negara
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau konsep dalam Tata Kelola Data (DG) Lanjutan berikut:**

- **Data Sovereignty:** _________________________________________________
    
- **Data Ethics Framework:** ___________________________________________
    
- **Privacy by Design:** ________________________________________________
    
- **Data Monetization:** ________________________________________________
    
- **Chief Data Officer (CDO) KPI:** ____________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket C)

### Bagian I (Matrix)

1. Melanggar (Prinsip Storage Limitation)
    
2. Sesuai (Prinsip Right to Erasure/RTBF)
    
3. Melanggar (Prinsip Purpose Limitation)
    
4. Sesuai (Prinsip Integrity & Confidentiality)
    
5. Melanggar (Prinsip Data Minimization)
    

### Bagian II (Benar/Salah)

1. S | 2. B | 3. S | 4. B | 5. S
    

### Bagian III (Komparatif)

- Compliance: Fokus ke Regulasi; Output: Laporan Audit Hukum; Frekuensi: Tahunan.
    
- Data Quality: Fokus ke Akurasi; Output: DQ Dashboard; Frekuensi: Bulanan/Mingguan.
    
- Operational: Fokus ke Proses DG; Output: Efisiensi Workflow; Frekuensi: Kuartalan.
    

### Bagian IV (Scaffolding)

a. Sensitif/Privasi | b. Penggunaan | c. Hak individu | d. Mitigasi/Keamanan | e. Pemangku Kepentingan.

### Bagian V (Studi Kasus)

a. Takut akan kehilangan kekuasaan (Loss of Power) atau takut kinerja buruk mereka terlihat.

b. Menjelaskan "What's in it for me" (WIIFM), menunjukkan bahwa data terpusat akan membantu mereka mendapat laporan lebih cepat.

c. Memberikan "Data Excellence Award" atau anggaran tambahan bagi cabang dengan kualitas data terbaik.

d. Analitik Prediktif Perilaku Nasabah di daerah mereka yang tidak bisa dihitung jika data terpisah.

e. Memastikan visi DG selaras dengan strategi perusahaan dan menggunakan otoritasnya untuk mengatasi hambatan birokrasi.

### Bagian VI (Pilihan Ganda)

1. b, b | 2. a, a | 3. a, a | 4. a, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    

### Bagian VII (Isian)

- Sovereignty: Aturan bahwa data tunduk pada hukum negara tempat data itu berada.
    
- Ethics Framework: Panduan moral dalam mengelola bias dan privasi data.
    
- Privacy by Design: Pendekatan teknis yang menyertakan privasi sejak awal desain sistem.
    
- Monetization: Proses mengubah data menjadi nilai ekonomi (langsung/tidak langsung).
    
- CDO KPI: Ukuran keberhasilan pemimpin data (misal: pengurangan risiko denda, peningkatan pendapatan berbasis data).