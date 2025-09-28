# Problem Set: Query Processing & Optimization
_Back to _ [[IF3140 Sistem Basis Data]]

Level: Menengah - Lanjutan

Target: Mahasiswa Ilmu Komputer/Sistem Informasi yang sedang mengambil mata kuliah Sistem Basis Data tingkat lanjut.

Estimasi Waktu: 90 Menit

Tujuan Pembelajaran:

1. Menganalisis dan menghitung estimasi biaya (cost) dari sebuah rencana eksekusi (evaluation plan).
    
2. Memahami cara kerja dan kapan harus menggunakan berbagai algoritma operasi basis data (seleksi, join, sorting).
    
3. Menerapkan aturan ekuivalensi (transformasi) untuk mengubah sebuah ekspresi aljabar relasional menjadi bentuk yang lebih optimal.
    
4. Membandingkan efektivitas antara rencana eksekusi yang berbeda (misalnya, dengan dan tanpa memanfaatkan indeks).
    
5. Memahami perbedaan antara optimisasi heuristik dan optimisasi berbasis biaya.
    

Konteks Soal:

Anda adalah seorang Database Administrator (DBA) di sebuah perusahaan E-commerce buku bernama "BookNest". Anda ditugaskan untuk menganalisis dan mengoptimalkan query yang sering berjalan lambat. Gunakan skema basis data dan asumsi statistik berikut untuk menyelesaikan semua soal.

**Skema Basis Data:**

- **Produk**(`pid`, `nama_produk`, `harga`, `stok`, `kid`)
    
    - `pid`: Primary Key
        
- **Kategori**(`kid`, `nama_kategori`)
    
    - `kid`: Primary Key
        
- **Pelanggan**(`uid`, `nama_pelanggan`, `kota`, `umur`)
    
    - `uid`: Primary Key
        
- **Transaksi**(`tid`, `uid`, `pid`, `jumlah`, `tanggal`)
    
    - `tid`: Primary Key
        
    - FK: `Transaksi(uid)` -> `Pelanggan(uid)`
        
    - FK: `Transaksi(pid)` -> `Produk(pid)`
        

**Asumsi & Statistik:**

- **Relasi Produk:**
    
    - $n_{Produk}​ = 20.000$ tuple
        
    - $b_{Produk​} = 2.000$ blok
        
    - $V(kid, Produk) = 100$ (ada 100 kategori unik)
        
- **Relasi Kategori:**
    
    - $n_{Kategori}​ = 100$ tuple
        
    - $b_{Kategori​} = 10$ blok
        
- **Relasi Pelanggan:**
    
    - $n_{Pelanggan}​ = 50.000$ tuple
        
    - $b_{Pelanggan​} = 5.000$ blok
        
    - $V(kota, Pelanggan) = 50$ (ada 50 kota unik)
        
    - Distribusi `kota` dan `umur` seragam.
        
- **Relasi Transaksi:**
    
    - $n_{Transaksi}​ = 1.000.000$ tuple
        
    - $b_{Transaksi​} = 50.000$ blok
        
- Ukuran memori buffer yang tersedia (M) = 101 blok.
    
- Terdapat **secondary index (B+-Tree)** pada `Pelanggan.kota` dengan kedalaman $h_i​=3$.
    
- Terdapat **primary index (B+-Tree)** pada `Produk.pid` dengan kedalaman $h_i​=2$.
    
- Asumsikan ukuran tuple hasil join adalah jumlah dari ukuran tuple relasi-relasi pembentuknya.
    

## Bagian A: Soal Dasar (2 Soal)

### Soal 1: Estimasi Biaya Operasi Seleksi (Recall & Comprehension)

Hitung dan bandingkan estimasi biaya (dalam jumlah blok transfer) untuk dua query seleksi berikut. Tentukan algoritma seleksi yang paling efisien untuk masing-masing kasus dan jelaskan mengapa.

a. Mencari semua pelanggan dari kota 'Bandung'.

SELECT * FROM Pelanggan WHERE kota = 'Bandung';

b. Mencari semua produk dengan kid = 15.

SELECT * FROM Produk WHERE kid = 15;

### Soal 2: Konsep Algoritma Join (Comprehension)

Jelaskan secara singkat, dalam skenario seperti apa masing-masing algoritma join di bawah ini menjadi pilihan yang paling superior?

a. Indexed Nested-Loop Join

b. Hash Join

c. Merge Join

## Bagian B: Soal Menengah (2 Soal)

### Soal 3: Analisis Rencana Eksekusi (Application & Analysis)

Diberikan sebuah query untuk mencari nama pelanggan di 'Jakarta' yang pernah membeli produk dengan `pid` = 123.

```
SELECT P.nama_pelanggan
FROM Pelanggan P, Transaksi T
WHERE P.uid = T.uid AND P.kota = 'Jakarta' AND T.pid = 123;
```

Seorang DBA junior mengusulkan rencana eksekusi (evaluation plan) berikut dalam bentuk pohon aljabar relasional:
```
		Πnama_pelanggan​

					|

(σ_kota=′Jakarta′∧pid=123​)
					|
				⋈uid​
					/\
(Pelanggan)(Transaksi)
```
a. Terjemahkan pohon di atas menjadi urutan langkah-langkah evaluasi.

b. Hitung estimasi biaya total (dalam jumlah blok transfer) untuk menjalankan rencana tersebut. Gunakan algoritma join yang paling sesuai menurut Anda untuk langkah join-nya (asumsikan hasil seleksi tidak muat di memori).

c. Berapa estimasi jumlah tuple hasil akhir dari query ini?

### Soal 4: Transformasi Aljabar Relasional (Analysis & Synthesis)

Menggunakan **aturan ekuivalensi**, transformasikan pohon aljabar relasional dari Soal 3 menjadi sebuah pohon baru yang secara heuristik lebih optimal.

a. Gambarkan pohon aljabar relasional baru yang sudah dioptimalkan.

b. Jelaskan aturan heuristik utama yang Anda terapkan dan mengapa transformasi tersebut membuat rencana eksekusi menjadi lebih baik.

## Bagian C: Soal Lanjutan (1 Soal)

### Soal 5: Optimisasi Berbasis Biaya (Synthesis & Evaluation)

Berdasarkan pohon aljabar relasional baru yang Anda buat di **Soal 4**, buatlah sebuah _evaluation plan_ yang detail dan hitung estimasi biaya totalnya. Rencana ini harus memanfaatkan semua indeks yang tersedia untuk mendapatkan biaya serendah mungkin.

a. Tuliskan setiap langkah dalam evaluation plan Anda, sebutkan algoritma spesifik yang digunakan (misal: A4 Index Scan, Hash Join, dll.), dan hitung biaya serta estimasi jumlah tuple untuk setiap langkah.

b. Bandingkan total biaya dari rencana di Soal 5 ini dengan total biaya dari rencana di Soal 3. Apakah optimisasi yang Anda lakukan berhasil mengurangi biaya secara signifikan? Berikan kesimpulan Anda.

## Kunci Jawaban & Rubrik Penilaian

### Jawaban Soal 1

a. Query Pelanggan.kota = 'Bandung'

- Algoritma Pilihan: Index Scan (menggunakan secondary index pada Pelanggan.kota).

- Alasan: Terdapat indeks pada atribut kota, yang jauh lebih cepat daripada harus memindai seluruh tabel.

- Estimasi Biaya:

- Jumlah tuple yang diharapkan: nPelanggan​/V(kota, Pelanggan)=50.000/50=1000 tuple.

- Biaya A4 (Secondary Index): (hi​+n)=3+1000=1003 blok transfer (kasus terburuk dimana setiap tuple ada di blok berbeda).

- Biaya A1 (Linear Scan): bPelanggan​=5000 blok transfer.

- Kesimpulan: Index Scan jauh lebih efisien.

b. Query Produk.kid = 15

- Algoritma Pilihan: Linear Scan.

- Alasan: Tidak ada indeks pada atribut kid. Satu-satunya cara adalah memindai seluruh tabel.

- Estimasi Biaya:

- Biaya A1 (Linear Scan): bProduk​=2000 blok transfer.

### Jawaban Soal 2

a. Indexed Nested-Loop Join: Superior ketika salah satu relasi (relasi luar) sangat kecil, dan ada indeks yang sangat efisien (seperti primary key index) pada atribut join di relasi dalam.

b. Hash Join: Superior untuk equi-join pada data besar yang tidak terurut dan ketika memori cukup untuk menampung hash table dari relasi yang lebih kecil. Ini adalah algoritma join "pekerja keras" di banyak sistem.

c. Merge Join: Superior ketika kedua relasi sudah terurut berdasarkan atribut join, atau jika output dari query perlu diurutkan berdasarkan atribut tersebut (menghemat operasi sorting terpisah).

### Jawaban Soal 3

a. Urutan Langkah:

1. Lakukan theta join antara seluruh relasi Pelanggan dan Transaksi pada atribut uid.
2. Simpan hasilnya ke tabel temporer.
3. Lakukan seleksi pada tabel temporer dengan kondisi kota = 'Jakarta' DAN pid = 123.
4. Lakukan proyeksi untuk mengambil kolom nama_pelanggan dari hasil seleksi.

b. Estimasi Biaya Join:

- Karena relasi Pelanggan dan Transaksi besar dan tidak terurut, Hash Join adalah pilihan terbaik. Pelanggan lebih kecil dalam jumlah blok, jadi menjadi build input.

- Biaya Hash Join = 3×(bPelanggan​+bTransaksi​)=3×(5.000+50.000)=3×55.000=165.000 blok transfer.

- Biaya Seleksi & Proyeksi: Biaya seleksi pada hasil join akan memerlukan pembacaan hasil join tersebut. Ukuran hasil join (kasus terburuk) adalah nTransaksi​ karena setiap transaksi pasti memiliki satu pelanggan. bhasil_join​≈bTransaksi​=50.000 blok.

- Total Biaya: 165.000 (join) + 50.000 (seleksi) = 215.000 blok transfer. (Proyeksi dianggap pipelined).

c. Estimasi Tuple Hasil:

- Jumlah pelanggan di Jakarta: 50.000/50=1000 pelanggan.

- Jumlah transaksi untuk produk pid=123 (asumsi 1 produk dari 20.000): 1.000.000/20.000=50 transaksi.

- Probabilitas seorang pelanggan di Jakarta melakukan transaksi produk ini sangat kecil. Estimasi yang lebih realistis:

- Fraksi pelanggan Jakarta: 1000/50000=1/50.

- Dari 50 transaksi produk pid=123, yang dilakukan oleh pelanggan Jakarta adalah 50×(1/50)=1 tuple.

- Estimasi hasil akhir: 1 tuple.

### Jawaban Soal 4

a. **Pohon Aljabar Relasional Baru:**
```
Πnama_pelanggan​

|

(σ_{pid=123}​(Transaksi)⋈_{uid}​σ_{kota=′Jakarta′}​(Pelanggan))
```


b. Aturan Heuristik:

- Mendorong Seleksi Sedini Mungkin (Push Selections Down): Ini adalah aturan paling penting yang diterapkan. Operasi seleksi (σ) pada Pelanggan dan Transaksi dilakukan sebelum operasi join yang mahal.

- Alasan: Dengan memfilter data terlebih dahulu, ukuran relasi input untuk operasi join menjadi jauh lebih kecil. Pelanggan yang di-join bukan lagi 50.000 tuple, tetapi hanya ~1000 tuple. Transaksi yang di-join bukan lagi 1.000.000 tuple, tetapi hanya ~50 tuple. Ini secara drastis mengurangi biaya komputasi dan I/O dari operasi join.

### Jawaban Soal 5

a. **Evaluation Plan Rinci:**

|**Langkah**|**Operasi**|**Algoritma & Penjelasan**|**Estimasi Biaya (Blok)**|**Estimasi Tuple**|
|---|---|---|---|---|
|1|σkota=′Jakarta′​(Pelanggan)|**A4 (Index Scan)** pada `Pelanggan.kota`.|1003|1000|
|2|σpid=123​(Transaksi)|**Linear Scan**, karena tidak ada indeks pada `Transaksi.pid`.|50.000|50|
|3|(Hasil #1) ⋈uid​ (Hasil #2)|**Indexed Nested-Loop Join**. Hasil #2 (50 tuple) sangat kecil, ideal sebagai relasi luar. Gunakan indeks pada `Pelanggan.uid` (asumsi ada karena PK).|bluar​+nluar​×c≈1+50×(hi​+1)≈1+50×(2+1)=151|1|
|4|Πnama_pelanggan​ (dari Hasil #3)|**Pipelined**.|0|1|
|**Total**|||**1003 + 50.000 + 151 = 51.154**|**1 (Tuple final)**|

b. Perbandingan dan Kesimpulan:

- Biaya Rencana Awal (Soal 3): ~215.000 blok transfer.

- Biaya Rencana Optimal (Soal 5): ~51.154 blok transfer.
**Kesimpulan:** Ya, optimisasi berhasil secara signifikan. Dengan menerapkan aturan heuristik (mendorong seleksi) dan kemudian memilih algoritma yang tepat berbasis biaya (memanfaatkan indeks yang ada), biaya eksekusi query berhasil diturunkan sekitar **76%**. Ini menunjukkan betapa krusialnya peran query optimizer dalam menemukan rencana eksekusi yang efisien dari berbagai kemungkinan yang ada. Biaya terbesar pada rencana optimal berasal dari linear scan pada tabel `Transaksi`, yang mengindikasikan bahwa jika query ini sangat penting, membuat indeks pada `Transaksi.pid` akan memberikan peningkatan performa lebih lanjut.

## Tips untuk Yang Sedang Mengerjakan

- **Pahami Asumsi:** Bacalah semua asumsi dan statistik dengan teliti. Nilai seperti nr​, br​, dan V(A,r) adalah kunci untuk semua perhitungan.
    
- **Pilih Algoritma yang Tepat:** Jangan asal memilih algoritma. Pertimbangkan ketersediaan indeks, ukuran data, dan apakah data terurut.
    
- **Kerjakan Bertahap:** Untuk soal perhitungan biaya, pecah menjadi langkah-langkah kecil. Hitung biaya dan jumlah tuple untuk setiap operasi secara terpisah sebelum menjumlahkannya.
    
- **Gambarkan Pohon:** Menggambar pohon aljabar relasional sangat membantu dalam memvisualisasikan urutan operasi dan mengidentifikasi peluang optimisasi.