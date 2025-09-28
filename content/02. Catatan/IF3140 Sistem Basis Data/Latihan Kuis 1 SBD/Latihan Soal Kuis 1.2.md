# Problem Set: Query Processing & Optimization
_Back to_ [[IF3140 Sistem Basis Data]]

Level: Menengah - Lanjutan

Target: Mahasiswa Ilmu Komputer/Sistem Informasi yang ingin menguji pemahaman mendalam tentang optimisasi query.

Estimasi Waktu: 90 Menit

Tujuan Pembelajaran:

1. Menganalisis dan membandingkan _trade-off_ antar algoritma join dalam skenario yang tidak umum (non-equi join).
    
2. Memahami dampak dari subquery dan proses _decorrelation_ terhadap performa.
    
3. Menerapkan prinsip optimisasi heuristik untuk menentukan urutan join yang paling efisien dalam query multi-tabel.
    
4. Menyusun dan menghitung biaya rencana eksekusi yang kompleks dari awal hingga akhir, dengan mempertimbangkan semua statistik dan indeks yang ada.
    

Konteks Soal:

Anda adalah bagian dari tim pengembang Sistem Informasi Akademik (SIAK) di sebuah universitas. Belakangan ini, ada laporan bahwa beberapa fitur pencarian data akademik berjalan lambat. Tugas Anda adalah menganalisis dan mengoptimalkan query-query tersebut.

**Skema Basis Data:**

- **Mahasiswa**(`nim`, `nama`, `angkatan`, `ipk`)
    
    - `nim`: Primary Key
        
- **MataKuliah**(`kode_mk`, `nama_mk`, `sks`)
    
    - `kode_mk`: Primary Key
        
- **Nilai**(`id_nilai`, `nim`, `kode_mk`, `nilai_huruf`)
    
    - `id_nilai`: Primary Key
        
    - FK: `Nilai(nim)` -> `Mahasiswa(nim)`
        
    - FK: `Nilai(kode_mk)` -> `MataKuliah(kode_mk)`
        

**Asumsi & Statistik:**

- **Relasi Mahasiswa:**
    
    - nMahasiswa​ = 40.000 tuple
        
    - bMahasiswa​ = 4.000 blok
        
    - V(angkatan, Mahasiswa) = 10 (terdapat 10 angkatan unik)
        
- **Relasi MataKuliah:**
    
    - nMataKuliah​ = 500 tuple
        
    - bMataKuliah​ = 50 blok
        
- **Relasi Nilai:**
    
    - nNilai​ = 800.000 tuple
        
    - bNilai​ = 40.000 blok
        
    - V(nilai_huruf, Nilai) = 5 (A, B, C, D, E)
        
- Distribusi data untuk semua atribut diasumsikan seragam.
    
- Ukuran memori buffer yang tersedia (M) = 201 blok.
    
- Terdapat **primary index (B+-Tree)** pada `Mahasiswa.nim` dengan kedalaman hi​=3.
    
- Terdapat **secondary index (B+-Tree)** pada `Nilai.kode_mk` dengan kedalaman hi​=4.
    

## Bagian A: Soal Dasar (2 Soal)

### Soal 1: Analisis Konseptual Algoritma Join (Comprehension & Analysis)

Seorang analis data ingin menjalankan query non-equi join untuk membandingkan IPK mahasiswa. Query-nya adalah:

SELECT A.nama, B.nama FROM Mahasiswa A, Mahasiswa B WHERE A.ipk > B.ipk;

Dari tiga algoritma join utama (Nested-Loop Join, Hash Join, Merge Join), manakah yang **paling tidak cocok** (atau bahkan tidak bisa digunakan) untuk query ini? Jelaskan alasan teknisnya secara singkat.

### Soal 2: Estimasi Biaya Seleksi (Recall & Application)

Hitung dan bandingkan estimasi biaya (dalam jumlah blok transfer) untuk dua query seleksi berikut. Jelaskan mengapa terdapat perbedaan performa yang sangat signifikan antara keduanya.

a. Mencari data mahasiswa spesifik berdasarkan NIM.

SELECT * FROM Mahasiswa WHERE nim = '13523149';

b. Mencari semua mahasiswa dari angkatan 2023 ke atas.

SELECT * FROM Mahasiswa WHERE angkatan >= 2023; (Asumsikan angkatan 2023 dan 2024 ada dalam data).

## Bagian B: Soal Menengah (2 Soal)

### Soal 3: Analisis Biaya Subquery (Analysis)

Diberikan query untuk mencari nama mahasiswa yang mengambil mata kuliah 'IF3140':

```
SELECT nama FROM Mahasiswa
WHERE nim IN (SELECT nim FROM Nilai WHERE kode_mk = 'IF3140');
```

Asumsikan Query Optimizer memilih strategi eksekusi yang naif, yaitu **Correlated Evaluation** (menjalankan subquery satu kali untuk _setiap_ baris dari tabel `Mahasiswa`).

a. Jelaskan alur pemrosesan query dengan strategi Correlated Evaluation ini.

b. Berapa estimasi biaya total (dalam blok transfer) untuk menjalankan query dengan strategi yang sangat tidak efisien ini? (Asumsikan tidak ada indeks pada Nilai.kode_mk untuk subquery ini agar terlihat dampak buruknya).

### Soal 4: Transformasi Subquery menjadi Join (Synthesis)

Masih terkait Soal 3, seorang developer senior menyarankan untuk menulis ulang query tersebut menggunakan `JOIN` eksplisit untuk menghindari masalah performa.

a. Tuliskan versi query yang sudah dioptimalkan menggunakan JOIN.

b. Gambarkan pohon aljabar relasional untuk query versi JOIN ini yang sudah menerapkan aturan heuristik "mendorong seleksi sedini mungkin".

c. Jelaskan mengapa pendekatan ini (dikenal sebagai decorrelation) secara fundamental jauh lebih unggul daripada Correlated Evaluation.

## Bagian C: Soal Lanjutan (1 Soal)

### Soal 5: Optimisasi Urutan Join Multi-Tabel (Synthesis & Evaluation)

Anda ditugaskan untuk mengoptimalkan query pencarian nama mahasiswa angkatan 2022 yang mendapat nilai 'A' di mata kuliah 'Sistem Basis Data' (`kode_mk` = 'IF3140').

Query aljabar relasionalnya setelah mendorong seleksi ke bawah adalah:

Πnama​((σangkatan=2022​(Mahasiswa))⋈(σnilai_huruf=′A′​(Nilai))⋈(σkode_mk=′IF3140′​(MataKuliah)))

Sebagai optimizer, Anda harus menentukan urutan join terbaik.

a. Identifikasi dua kemungkinan utama untuk urutan join (misalnya: (Mahasiswa ⋈ Nilai) ⋈ MataKuliah vs. (MataKuliah ⋈ Nilai) ⋈ Mahasiswa).

b. Untuk setiap urutan, hitung ukuran (estimasi jumlah tuple) dari hasil join perantara pertama.

c. Berdasarkan hasil (b), tentukan urutan join mana yang paling optimal dan jelaskan alasannya.

d. Buatlah evaluation plan yang paling efisien untuk urutan join optimal yang Anda pilih. Rincikan setiap langkah, sebutkan algoritma yang digunakan, estimasi biayanya, dan estimasi jumlah tuple hasilnya. Manfaatkan semua indeks yang tersedia.

## Kunci Jawaban & Rubrik Penilaian

### Jawaban Soal 1

- **Algoritma Paling Tidak Cocok:** **Hash Join**.
    
- **Alasan Teknis:** Hash Join secara fundamental dirancang **hanya untuk equi-join** (kondisi join dengan operator `=`). Ia bekerja dengan cara memetakan nilai dari kedua tabel ke _bucket_ hash yang sama. Konsep ini tidak bisa diterapkan untuk operator perbandingan seperti `>` atau `<`. Nested-Loop Join bisa digunakan, dan Merge Join (dengan modifikasi menjadi Sort-Merge Join) juga bisa menangani kondisi ini, meskipun lebih kompleks.
    

### Jawaban Soal 2

a. Query nim = '13523149'

* Algoritma: Index Scan (menggunakan primary index pada Mahasiswa.nim).

* Biaya (A2): hi​+1=3+1=4 blok transfer. Ini sangat cepat karena langsung menunjuk ke satu record.

b. Query angkatan >= 2023

* Algoritma: Linear Scan.

* Alasan: Tidak ada indeks pada kolom angkatan.

* Biaya (A1): bMahasiswa​=4.000 blok transfer.

* Penjelasan Perbedaan: Perbedaannya drastis (4 vs 4000 blok) karena query pertama memanfaatkan struktur indeks yang sangat efisien untuk pencarian nilai unik, sementara query kedua harus memindai seluruh isi tabel secara paksa karena tidak ada "jalan pintas".

### Jawaban Soal 3

a. Alur Pemrosesan:

1. Sistem akan membaca baris pertama dari tabel Mahasiswa.

2. Untuk baris mahasiswa tersebut, sistem akan menjalankan subquery SELECT nim FROM Nilai WHERE kode_mk = 'IF3140' secara penuh.

3. Sistem memeriksa apakah nim mahasiswa dari langkah 1 ada di hasil subquery.

4. Sistem mengulangi langkah 1-3 untuk semua 40.000 baris di tabel Mahasiswa.

b. Estimasi Biaya:

* Biaya untuk membaca tabel Mahasiswa luar: bMahasiswa​=4.000 blok.

* Biaya untuk satu kali eksekusi subquery (Linear Scan pada Nilai): bNilai​=40.000 blok.

* Total Biaya = (Biaya baca Mahasiswa) + (Jumlah Mahasiswa × Biaya subquery)

* Total Biaya = 4.000+(40.000×40.000)=4.000+1.600.000.000=1.600.004.000 blok transfer. Biaya ini sangat besar dan tidak realistis, menunjukkan betapa buruknya strategi ini.

### Jawaban Soal 4

a. Query Versi JOIN:

sql SELECT M.nama FROM Mahasiswa M JOIN Nilai N ON M.nim = N.nim WHERE N.kode_mk = 'IF3140';

b. Pohon Aljabar Relasional Optimal:

Π_{nama} | (Mahasiswa ⋈_{nim} (σ_{kode_mk='IF3140'}(Nilai)))

c. **Keunggulan Decorrelation:** Pendekatan `JOIN` jauh lebih unggul karena **setiap tabel hanya dibaca satu kali**. Tabel `Nilai` dipindai sekali untuk mencari semua `nim` yang relevan, dan hasilnya (yang jauh lebih kecil) kemudian di-join dengan tabel `Mahasiswa`. Ini menghindari pemindaian ulang tabel `Nilai` sebanyak puluhan ribu kali, yang merupakan sumber inefisiensi masif dari _Correlated Evaluation_.

### Jawaban Soal 5

a. Dua Kemungkinan Urutan Join:

1. (σ_{angkatan=2022}(Mahasiswa) ⋈ σ_{nilai_huruf='A'}(Nilai)) ⋈ σ_{kode_mk='IF3140'}(MataKuliah)

2. (σ_{kode_mk='IF3140'}(MataKuliah) ⋈ σ_{nilai_huruf='A'}(Nilai)) ⋈ σ_{angkatan=2022}(Mahasiswa)

b. Ukuran Hasil Join Perantara:

* Ukuran setelah filter awal:

* Mahasiswafilt​: 40.000/10=4.000 tuple.

* Nilaifilt​: 800.000/5=160.000 tuple.

* MataKuliahfilt​: 1 tuple.

* Ukuran Perantara (Urutan 1): Mahasiswa_filt ⋈ Nilai_filt. Estimasi: 160.000×(4.000/40.000)=16.000 tuple.

* Ukuran Perantara (Urutan 2): MataKuliah_filt ⋈ Nilai_filt. Ini adalah jumlah nilai 'A' di MK 'IF3140'. Estimasi: (800.000/500)×(1/5)=1600/5=320 tuple.

c. Urutan Optimal: Urutan 2 adalah yang paling optimal.

* Alasan: Aturan heuristik utama adalah melakukan join yang menghasilkan relasi perantara terkecil terlebih dahulu. Urutan 2 menghasilkan hasil perantara yang sangat kecil (320 tuple) dibandingkan Urutan 1 (16.000 tuple). Ini membuat join terakhir menjadi jauh lebih ringan dan murah.

d. **Evaluation Plan Lengkap untuk Urutan 2:**

|**Langkah**|**Operasi**|**Algoritma & Penjelasan**|**Estimasi Biaya (Blok)**|**Estimasi Tuple**|
|---|---|---|---|---|
|1|σkode_mk=′IF3140′​(MataKuliah)|**Linear Scan**. Tabel `MataKuliah` sangat kecil.|50|1|
|2|(Hasil #1) ⋈ σnilai_huruf=′A′​(Nilai)|**Indexed Nested-Loop Join**. Hasil #1 (1 tuple) sebagai relasi luar. Lakukan probe ke `Nilai` menggunakan **secondary index** pada `kode_mk`. Filter `nilai_huruf='A'` diterapkan on-the-fly.|1+1×(hi​+nmk​)=1+(4+1600)=1605|320|
|3|(Hasil #2) ⋈ σangkatan=2022​(Mahasiswa)|**Indexed Nested-Loop Join**. Hasil #2 (320 tuple) sebagai relasi luar. Lakukan probe ke `Mahasiswa` menggunakan **primary index** pada `nim`. Filter `angkatan=2022` diterapkan on-the-fly.|bluar​+nluar​×(hi​+1)=⌈20320​⌉+(320×(3+1))=16+1280=1296|32|
|4|Πnama​ (dari Hasil #3)|**Pipelined**. Hasil akhir langsung diproyeksikan.|0|32|
|**Total**|||**50 + 1605 + 1296 = 2.951**|**32 (Tuple final)**|

## Tips untuk Yang Sedang Mengerjakan

- **Identifikasi Kondisi:** Perhatikan baik-baik kondisi join dan seleksi. Apakah ini _equi-join_ atau _non-equi join_? Apakah ada indeks yang bisa dimanfaatkan? Jawaban ini menentukan pilihan algoritma Anda.
    
- **Waspadai Subquery:** Jika melihat subquery dalam klausa `WHERE`, selalu pikirkan: "Bisakah ini diubah menjadi `JOIN`?". Jawabannya hampir selalu "ya", dan itu hampir selalu lebih cepat.
    
- **Hitung Selektivitas:** Sebelum menentukan urutan join, hitung dulu ukuran hasil setelah setiap operasi seleksi. Ini akan membantu Anda mengidentifikasi join mana yang harus didahulukan.
    
- **Manfaatkan Indeks:** Jangan lupakan indeks yang tersedia! Menggunakan _Index Scan_ daripada _Linear Scan_, atau _Indexed Nested-Loop Join_ daripada _Hash Join_ untuk set data kecil, dapat mengurangi biaya secara dramatis.