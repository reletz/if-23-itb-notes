_Back to_ [[IF3140 Sistem Basis Data]]

### **Praktikum 1: DML & Performance Tuning pada Database Bioskop**

**Petunjuk Pengerjaan:**

1. Gunakan database bioskop yang telah disediakan.
    
2. Untuk setiap soal, sertakan query SQL yang Anda gunakan.
    
3. Untuk soal yang berkaitan dengan _performance tuning_, sertakan hasil `EXPLAIN` dan `\timing` sebelum dan sesudah optimasi sebagai bukti.
    
4. Jawablah setiap pertanyaan secara berurutan.
    

---

### **Soal 1: Operasi DML dan Analisis Awal**

Manajemen bioskop ingin mengadakan promosi "Throwback Thursday" dengan sedikit menaikkan rating IMDb untuk film-film klasik bergenre 'Action' agar lebih menarik.

**Tugas:**

a. Analisis Awal: Jalankan query untuk mencari semua film bergenre 'Action' yang dirilis sebelum tahun 1995. Gunakan \timing dan EXPLAIN untuk menganalisis performa query ini. Ambil screenshot atau salin-tempel hasilnya.

b. Eksekusi DML: Buatlah satu query UPDATE untuk menaikkan imdbrating sebesar 0.3 poin untuk semua film bergenre 'Action' yang dirilis sebelum tahun 1995. Pastikan rating tidak melebihi 8.0.

c. Verifikasi: Tampilkan idfilm, namafilm, tahun, dan imdbrating dari film yang baru saja Anda update untuk membuktikan bahwa perubahannya berhasil.
![[Pasted image 20251006133131.png]]
![[Pasted image 20251006133152.png]]

---

### **Soal 2: Identifikasi Bottleneck dan Implementasi Indexing**

**Business Rule:** Staf layanan pelanggan (CS) seringkali menerima telepon dari penonton yang lupa detail tiketnya. Query yang paling sering mereka jalankan adalah mencari semua riwayat reservasi seorang penonton berdasarkan nama lengkapnya. Saat ini, proses pencarian ini terasa sangat lambat.

**Tugas:**

a. Simulasi & Analisis: Tulis dan jalankan query untuk mencari semua data reservasi (`_reservasi`) untuk penonton bernama 'Corrine Yow'. Gunakan \timing dan EXPLAIN pada query gabungan tersebut. Identifikasi dari hasil EXPLAIN, operasi apa yang menjadi bottleneck (paling lambat) dalam query ini.
![[Pasted image 20251006133503.png]]
![[Pasted image 20251006133517.png]]

b. Penentuan Metode Tuning: Berdasarkan analisis Anda, metode performance tuning apa yang paling tepat untuk mempercepat query ini? Jelaskan mengapa Anda memilih metode tersebut.
> Index tuning pada `_pelanggan.namapelanggan`, menghilangkan Seq Scan

c. Implementasi: Tulis dan jalankan perintah SQL untuk mengimplementasikan metode tuning yang Anda pilih.
```sql
CREATE INDEX idx_pelanggan_nama ON _pelanggan (namapelanggan);
```

d. Verifikasi: Jalankan kembali query dari poin (a). Sertakan hasil \timing dan EXPLAIN yang baru. Bandingkan hasilnya dengan sebelum tuning dan jelaskan mengapa performanya meningkat.
![[Pasted image 20251006134452.png]]

---

### **Soal 3: Optimasi Laporan dengan Denormalisasi**

**Business Rule:** Tim marketing membutuhkan laporan harian yang menampilkan detail setiap reservasi: nama film, nama penonton, dan nama studio tempat film ditayangkan. Karena tabel `_reservasi` sangat besar, query untuk laporan ini yang melakukan 3 `JOIN` (`_film`, `_penonton`, `_studio`) membebani database setiap hari.

**Tugas:**

a. Analisis Query Awal: Tulis query SELECT yang melakukan JOIN dari tabel `_reservasi` ke `_film`, `_penonton`, dan `_studio` untuk mendapatkan kolom namafilm, namapelanggan, dan namastudio. Jalankan EXPLAIN pada query ini.

b. Penentuan Metode Tuning: Untuk mempercepat query laporan harian ini secara drastis, metode performance tuning apa yang paling sesuai? Jelaskan keuntungan dan kerugian dari penerapan metode ini.

c. Implementasikan perubahan yang telah diajukan.

d. Verifikasi: Tulis query SELECT yang baru dan jauh lebih sederhana dari tabel _reservasi yang sudah didenormalisasi untuk menghasilkan laporan yang sama. Bandingkan dengan query pada poin (a) dan jelaskan mengapa query baru ini jauh lebih efisien.

---

### **Soal 4: Pengarsipan Data Lama dengan Splitting**

**Business Rule:** Database bioskop telah beroperasi selama puluhan tahun. Tabel `_reservasi` kini berisi jutaan baris data, termasuk data dari tahun 1990-an. Query untuk laporan bulanan tahun ini menjadi lambat karena harus memindai data lama yang sudah tidak relevan. Aturan bisnis menyatakan bahwa data reservasi yang lebih tua dari 10 tahun (misalnya, sebelum tahun 2000) sangat jarang diakses dan bisa diarsipkan.

**Tugas:**

a. Analisis Kondisi Awal: Jalankan query `SELECT COUNT(*) FROM _reservasi;` untuk mengetahui jumlah total reservasi.

b. Penentuan Metode Tuning: Berdasarkan kebutuhan untuk memisahkan data lama dan baru, metode performance tuning apa yang harus digunakan?

c. Implementasikan perubahan yang diajukan.

d. Verifikasi:

1. Jalankan kembali SELECT COUNT(*) pada tabel _reservasi dan _reservasi_archive. Tunjukkan bahwa total baris dari kedua tabel jika dijumlahkan sama dengan total pada poin (a).

2. Jelaskan mengapa query laporan untuk data setelah tahun 2000 sekarang akan berjalan lebih cepat di tabel _reservasi.