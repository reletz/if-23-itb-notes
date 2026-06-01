_Back to_ [[IF3140 Sistem Basis Data]]

# Problem Set: Analisis Mendalam Lock-Based Protocols & 2PL

Mata Pelajaran: Sistem Basis Data (Concurrency Control)

Estimasi Waktu: 90-120 menit

Total Nilai: 100 poin (Bobot terdistribusi)

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Menguasai dan membedakan konsep `lock-S` (Shared) dan `lock-X` (Exclusive) serta aturan kompatibilitasnya.
    
2. Menganalisis skenario konversi kunci (_lock upgrade_ dan _lock downgrade_).
    
3. Membedakan secara detail definisi, jaminan, dan masalah dari protokol 2PL (Dasar), Strict 2PL, dan Rigorous 2PL.
    
4. Mengidentifikasi penyebab dan konsekuensi dari _cascading rollback_ dan _dirty reads_.
    
5. Menganalisis jadwal (schedule) transaksi yang kompleks untuk menentukan kepatuhan terhadap berbagai protokol 2PL.
    
6. Mensintesis dan merancang jadwal transaksi yang memenuhi kriteria protokol tertentu (misal: Strict 2PL).
    

## Petunjuk Umum

- Bacalah setiap bagian soal dengan teliti.
    
- **Bagian I & II:** Jawablah langsung pada tabel yang disediakan (atau salin dan isi).
    
- **Bagian III:** Jawablah pertanyaan secara analitis dan berikan justifikasi yang kuat untuk setiap poin. Gunakan notasi yang ditentukan jika diminta.
    

## BAGIAN I: Matriks Analisis Konsep (Total 20 Poin)

**Fokus:** Pemahaman fundamental dan komparatif terhadap konsep kunci.

### Soal 1. Matriks Kompatibilitas & Konversi Kunci (10 poin)

Instruksi: Tentukan hasil dari permintaan (Request) oleh Transaksi T2, jika Transaksi T1 sedang memegang kunci (Hold) pada item data yang sama.

Pilihan:

- **A (Boleh/Grant):** Permintaan T2 langsung dikabulkan.
    
- **B (Tunggu/Wait):** T2 harus menunggu T1 melepaskan kuncinya.
    
- **C (N/A):** Skenario tidak relevan/tidak mungkin terjadi.
    
|**No**|**T1 Hold (pada data Q)**|**T2 Request (pada data Q)**|**Pilihan (A / B / C)**|
|---|---|---|---|
|1|`lock-S`|`lock-S`||
|2|`lock-S`|`lock-X`||
|3|`lock-X`|`lock-S`||
|4|`lock-X`|`lock-X`||
|5|T1 (S), T2 (S)|T3 Request `lock-S`||
|6|T1 (S), T2 (S)|T3 Request `lock-X`||
|7|T1 (S)|T1 Request _Upgrade_ (S -> X)||
|8|T1 (S), T2 (S)|T1 Request _Upgrade_ (S -> X)||
|9|T1 (X)|T1 Request _Downgrade_ (X -> S)||
|10|T1 (S)|T2 Request _Upgrade_ (S -> X)||

### Soal 2. Matriks Perbandingan Protokol 2PL (10 poin)

Instruksi: Untuk setiap pernyataan, tentukan apakah pernyataan tersebut berlaku untuk protokol 2PL (Dasar), Strict 2PL, dan Rigorous 2PL.

Pilihan:

- **Y (Ya):** Pernyataan berlaku untuk protokol ini.
    
- **N (Tidak):** Pernyataan tidak berlaku untuk protokol ini.
    

|**No**|**Pernyataan**|**2PL (Dasar)**|**Strict 2PL**|**Rigorous 2PL**|
|---|---|---|---|---|
|1|Menjamin jadwal yang _conflict-serializable_.||||
|2|Menjamin jadwal bebas dari _deadlock_.||||
|3|Menjamin jadwal bebas dari _cascading rollback_.||||
|4|Mengharuskan transaksi menahan _semua lock-X_ hingga _commit/abort_.||||
|5|Mengharuskan transaksi menahan _semua lock-S_ hingga _commit/abort_.||||
|6|Memiliki _growing phase_ dan _shrinking phase_.||||
|7|Mengizinkan _unlock(S)_ dilakukan sebelum transaksi _commit_.||||
|8|_Lock point_ (akhir _growing phase_) menentukan urutan serialisasi.||||
|9|Semua jadwal yang mematuhi Strict 2PL, pasti mematuhi 2PL.||||
|10|Semua jadwal yang mematuhi 2PL, pasti mematuhi Rigorous 2PL.||||

## BAGIAN II: Analisis Konseptual Benar/Salah (Total 20 Poin)

**Fokus:** Menguji pemahaman mendalam dan nuansa antar konsep.

**Instruksi:** Tentukan apakah setiap pernyataan berikut **BENAR (B)** atau **SALAH (S)**.

|**No**|**Pernyataan**|**B / S**|
|---|---|---|
|1|`lock-X` (Exclusive) mengizinkan transaksi untuk melakukan `read` dan `write` pada item data.||
|2|Tujuan utama dari _lock_ adalah untuk meningkatkan _throughput_ sistem dengan mengizinkan semua transaksi berjalan bersamaan tanpa hambatan.||
|3|_Lost Update Problem_ dapat terjadi jika dua transaksi membaca data, memodifikasinya di memori, lalu menuliskannya kembali tanpa _locking_.||
|4|_Lock upgrade_ (S -> X) hanya dapat diberikan jika transaksi yang meminta adalah satu-satunya pemegang `lock-S` pada item tersebut.||
|5|_Lock downgrade_ (X -> S) adalah operasi yang dilarang dalam semua varian 2PL karena dapat melanggar _serializability_.||
|6|Aturan fundamental 2PL adalah: transaksi tidak boleh melepaskan _lock_ apapun sampai ia mendapatkan semua _lock_ yang ia butuhkan.||
|7|_Lock point_ adalah titik waktu di mana transaksi memulai _shrinking phase_ (yaitu, saat melakukan _unlock_ pertama).||
|8|Sebuah transaksi dapat memiliki beberapa _lock point_ jika ia mengakses banyak item data.||
|9|Protokol 2PL (Dasar) masih rentan terhadap masalah _dirty read_ (membaca data yang belum di-_commit_).||
|10|_Cascading rollback_ terjadi jika T2 membaca data "kotor" dari T1, lalu T1 _commit_ sementara T2 _abort_.||
|11|_Strict 2PL_ dirancang khusus untuk menyelesaikan masalah _deadlock_ yang ada pada 2PL (Dasar).||
|12|_Strict 2PL_ mencegah _cascading rollback_ dengan memastikan tidak ada transaksi yang membaca data yang ditulis oleh transaksi lain yang belum _commit_.||
|13|_Rigorous 2PL_ adalah protokol yang paling ketat dan paling umum digunakan oleh DBMS komersial.||
|14|_Rigorous 2PL_ memiliki tingkat konkurensi yang lebih tinggi daripada _Strict 2PL_ karena aturannya lebih sederhana.||
|15|Jadwal: `T1: XL(A); W(A); UL(A); T2: XL(A); W(A); UL(A); Commit;` mematuhi protokol 2PL.||
|16|Jadwal: `T1: SL(A); R(A); XL(B); W(B); UL(A); UL(B); Commit;` mematuhi protokol 2PL.||
|17|Jadwal: `T1: XL(A); W(A); UL(A); XL(B); W(B); UL(B); Commit;` mematuhi protokol 2PL.||
|18|Jadwal: `T1: XL(A); W(A); Commit; UL(A);` mematuhi _Strict 2PL_.||
|19|Sebuah jadwal yang _Strict 2PL_ juga pasti _Rigorous 2PL_.||
|20|Sebuah jadwal yang _Rigorous 2PL_ juga pasti _Strict 2PL_.||

## BAGIAN III: Studi Kasus & Analisis Jadwal (Total 60 Poin)

**Fokus:** Aplikasi, analisis, dan sintesis konsep 2PL pada skenario praktis.

### Soal 3. Analisis Kepatuhan Protokol (15 poin)

**Kasus:** Diberikan jadwal S1 yang melibatkan tiga transaksi (T1, T2, T3) dan tiga item data (A, B, C).

Jadwal S1:

T1: SL(A); R(A);

T2: XL(B); W(B);

T3: SL(C); R(C);

T1: XL(B); (Wait);

T2: Commit; UL(B);

T1: (Grant); W(B);

T3: XL(A); (Wait);

T1: Commit; UL(A); UL(B);

T3: (Grant); W(A); Commit; UL(A); UL(C);

Pertanyaan:

a. (5 poin) Identifikasi Lock Point (titik akhir growing phase) untuk T1, T2, dan T3.

b. (5 poin) Analisislah T1. Apakah T1 mematuhi 2PL? Strict 2PL? Rigorous 2PL? Berikan justifikasi untuk setiap protokol.

c. (5 poin) Analisislah T3. Apakah T3 mematuhi 2PL? Strict 2PL? Rigorous 2PL? Berikan justifikasi untuk setiap protokol.

### Soal 4. Studi Kasus: Transfer Dana & Audit (15 poin)

**Kasus:** Anda memiliki dua transaksi:

- **T1 (Transfer):** Mentransfer $100 dari rekening A ke rekening B. Ini melibatkan `Read(A)`, `Read(B)`, `Write(A)`, dan `Write(B)`.
    
- **T2 (Audit):** Membaca saldo A dan B, lalu menjumlahkannya untuk memastikan total saldo konsisten. Ini melibatkan `Read(A)` dan `Read(B)`.
    

Tugas:

Tuliskan sebuah jadwal (schedule) yang mengeksekusi T1 dan T2 secara konkuren (interleaved). Jadwal Anda WAJIB mematuhi Strict 2PL dan menjamin serializability (mencegah anomali unrepeatable read atau dirty read).

**Instruksi:**

1. Gunakan notasi `SL` (Shared Lock), `XL` (Exclusive Lock), `R` (Read), `W` (Write), `UL` (Unlock), `Commit`.
    
2. Tunjukkan dengan jelas kapan T2 harus menunggu (jika perlu).
    
3. Tandai di mana T1 dan T2 melakukan `Commit`.
    

### Soal 5. Analisis Konsekuensi: Pelanggaran Protokol (15 poin)

**Kasus:** Diberikan jadwal S2 yang dirancang dengan buruk.

Jadwal S2:

T1: XL(A); W(A);

T2: XL(B); W(B);

T1: UL(A);

T3: SL(A); R(A);

T2: UL(B);

T3: SL(B); R(B);

T1: XL(C); W(C);

T3: Commit; UL(A); UL(B);

T1: Abort; UL(C);

T2: Commit;

Pertanyaan:

a. (5 poin) Jelaskan secara spesifik mengapa T1 melanggar 2PL (Dasar)!

b. (5 poin) Jelaskan secara spesifik mengapa T1 dan T2 melanggar Strict 2PL!

c. (5 poin) Apa konsekuensi serius dari T1: Abort terhadap transaksi T3? Fenomena apa ini, dan mengapa ini terjadi berdasarkan jadwal S2?

### Soal 6. Esai Sintesis: Trade-off Rigorous 2PL (15 poin)

**Skenario:** Anda adalah seorang arsitek basis data yang merancang sistem reservasi tiket pesawat. Sistem ini memiliki dua jenis transaksi utama:

1. **T_Book (Booking):** Transaksi singkat yang sangat sering terjadi (ribuan per detik). T_Book harus `Read` ketersediaan kursi (data A) dan `Write` ke manifes penumpang (data B) dan mengurangi stok kursi (data A). Ini butuh `lock-S(A)`, lalu _upgrade_ ke `lock-X(A)`, dan `lock-X(B)`.
    
2. **T_Report (Laporan):** Transaksi analitik yang berjalan sangat lama (bisa 2-3 menit). T_Report hanya `Read` data A dan B untuk menghitung okupansi. Ini butuh `lock-S(A)` dan `lock-S(B)`.
    

Anda memutuskan untuk menerapkan **Rigorous 2PL** untuk _semua_ transaksi demi kesederhanaan dan jaminan konsistensi (mencegah _cascading rollback_).

Tugas (Esai Analisis):

Analisislah trade-off dari keputusan ini.

a. (5 poin) Apa keuntungan utama menerapkan Rigorous 2PL untuk T_Book?

b. (5 poin) Apa kerugian (masalah kinerja) besar dari penerapan Rigorous 2PL untuk T_Report? (Fokus pada dampaknya terhadap T_Book).

c. (5 poin) Mengingat masalah di (b), sarankan satu modifikasi (bisa terkait protokol atau level isolasi) untuk T_Report agar T_Book tetap berjalan lancar, sambil menjaga T_Report tetap konsisten (misal: tidak membaca data "setengah jadi" dari T_Book).

> [!ad-libitum]- ## Kunci Jawaban & Rubrik Penilaian
> 
> ### BAGIAN I: Matriks Analisis Konsep
> 
> **Soal 1. Matriks Kompatibilitas & Konversi Kunci**
> 
> |**No**|**T1 Hold (pada data Q)**|**T2 Request (pada data Q)**|**Pilihan (A / B / C)**|
> |---|---|---|---|
> |1|`lock-S`|`lock-S`|**A (Boleh)**|
> |2|`lock-S`|`lock-X`|**B (Tunggu)**|
> |3|`lock-X`|`lock-S`|**B (Tunggu)**|
> |4|`lock-X`|`lock-X`|**B (Tunggu)**|
> |5|T1 (S), T2 (S)|T3 Request `lock-S`|**A (Boleh)**|
> |6|T1 (S), T2 (S)|T3 Request `lock-X`|**B (Tunggu)**|
> |7|T1 (S)|T1 Request _Upgrade_ (S -> X)|**A (Boleh)** (Asumsi T1 sendirian)|
> |8|T1 (S), T2 (S)|T1 Request _Upgrade_ (S -> X)|**B (Tunggu)** (Harus menunggu T2 selesai)|
> |9|T1 (X)|T1 Request _Downgrade_ (X -> S)|**A (Boleh)** (Selalu diizinkan)|
> |10|T1 (S)|T2 Request _Upgrade_ (S -> X)|**C (N/A)** (T2 tidak memegang S, T2 hanya _request_ S->X)|
> 
> **Soal 2. Matriks Perbandingan Protokol 2PL**
> 
> |**No**|**Pernyataan**|**2PL (Dasar)**|**Strict 2PL**|**Rigorous 2PL**|
> |---|---|---|---|---|
> |1|Menjamin jadwal yang _conflict-serializable_.|**Y**|**Y**|**Y**|
> |2|Menjamin jadwal bebas dari _deadlock_.|**N**|**N**|**N**|
> |3|Menjamin jadwal bebas dari _cascading rollback_.|**N**|**Y**|**Y**|
> |4|Mengharuskan transaksi menahan _semua lock-X_ hingga _commit/abort_.|**N**|**Y**|**Y**|
> |5|Mengharuskan transaksi menahan _semua lock-S_ hingga _commit/abort_.|**N**|**N**|**Y**|
> |6|Memiliki _growing phase_ dan _shrinking phase_.|**Y**|**Y**|**Y**|
> |7|Mengizinkan _unlock(S)_ dilakukan sebelum transaksi _commit_.|**Y**|**Y**|**N**|
> |8|_Lock point_ (akhir _growing phase_) menentukan urutan serialisasi.|**Y**|**Y**|**Y**|
> |9|Semua jadwal yang mematuhi Strict 2PL, pasti mematuhi 2PL.|**Y**|**Y**|**Y**|
> |10|Semua jadwal yang mematuhi 2PL, pasti mematuhi Rigorous 2PL.|**N**|**N**|**N**|
> 
>
> ### BAGIAN II: Analisis Konseptual Benar/Salah
> 
> |**No**|**Pernyataan**|**B / S**|
> |---|---|---|
> |1|`lock-X` (Exclusive) mengizinkan transaksi untuk melakukan `read` dan `write` pada item data.|**B**|
> |2|Tujuan utama dari _lock_ adalah untuk meningkatkan _throughput_ sistem dengan mengizinkan semua transaksi berjalan bersamaan tanpa hambatan.|**S** (Tujuannya konsistensi, _lock_ justru _menghambat_ demi konsistensi)|
> |3|_Lost Update Problem_ dapat terjadi jika dua transaksi membaca data, memodifikasinya di memori, lalu menuliskannya kembali tanpa _locking_.|**B**|
> |4|_Lock upgrade_ (S -> X) hanya dapat diberikan jika transaksi yang meminta adalah satu-satunya pemegang `lock-S` pada item tersebut.|**B**|
> |5|_Lock downgrade_ (X -> S) adalah operasi yang dilarang dalam semua varian 2PL karena dapat melanggar _serializability_.|**S** (Diperbolehkan di 2PL dan Strict 2PL (di _shrinking phase_), dilarang di Rigorous)|
> |6|Aturan fundamental 2PL adalah: transaksi tidak boleh melepaskan _lock_ apapun sampai ia mendapatkan semua _lock_ yang ia butuhkan.|**S** (Aturannya adalah: tidak boleh _acquire_ setelah _release_ pertama)|
> |7|_Lock point_ adalah titik waktu di mana transaksi memulai _shrinking phase_ (yaitu, saat melakukan _unlock_ pertama).|**S** (_Lock point_ adalah saat _acquire lock terakhir_ / akhir _growing phase_)|
> |8|Sebuah transaksi dapat memiliki beberapa _lock point_ jika ia mengakses banyak item data.|**S** (Hanya ada satu _lock point_ per transaksi)|
> |9|Protokol 2PL (Dasar) masih rentan terhadap masalah _dirty read_ (membaca data yang belum di-_commit_).|**B** (Karena _unlock(X)_ bisa terjadi sebelum _commit_)|
> |10|_Cascading rollback_ terjadi jika T2 membaca data "kotor" dari T1, lalu T1 _commit_ sementara T2 _abort_.|**S** (Terjadi jika T1 _abort_, T2 (yang membaca data T1) harus ikut _abort_)|
> |11|_Strict 2PL_ dirancang khusus untuk menyelesaikan masalah _deadlock_ yang ada pada 2PL (Dasar).|**S** (Dirancang untuk mencegah _cascading rollback_)|
> |12|_Strict 2PL_ mencegah _cascading rollback_ dengan memastikan tidak ada transaksi yang membaca data yang ditulis oleh transaksi lain yang belum _commit_.|**B** (Dengan menahan _lock-X_)|
> |13|_Rigorous 2PL_ adalah protokol yang paling ketat dan paling umum digunakan oleh DBMS komersial.|**B**|
> |14|_Rigorous 2PL_ memiliki tingkat konkurensi yang lebih tinggi daripada _Strict 2PL_ karena aturannya lebih sederhana.|**S** (Lebih rendah, karena _lock-S_ ditahan lebih lama)|
> |15|Jadwal: `T1: XL(A); W(A); UL(A); T2: XL(A); W(A); UL(A); Commit;` mematuhi protokol 2PL.|**B** (T1 & T2 2PL, meski T2 harus menunggu)|
> |16|Jadwal: `T1: SL(A); R(A); XL(B); W(B); UL(A); UL(B); Commit;` mematuhi protokol 2PL.|**B** (Growing: SL(A), XL(B). Shrinking: UL(A), UL(B))|
> |17|Jadwal: `T1: XL(A); W(A); UL(A); XL(B); W(B); UL(B); Commit;` mematuhi protokol 2PL.|**S** (Pelanggaran 2PL. `XL(B)` diminta setelah `UL(A)`)|
> |18|Jadwal: `T1: XL(A); W(A); Commit; UL(A);` mematuhi _Strict 2PL_.|**B** (_Lock-X_ ditahan hingga _commit_)|
> |19|Sebuah jadwal yang _Strict 2PL_ juga pasti _Rigorous 2PL_.|**S** (Bisa jadi tidak, karena _Strict 2PL_ boleh melepas _lock-S_ sebelum _commit_)|
> |20|Sebuah jadwal yang _Rigorous 2PL_ juga pasti _Strict 2PL_.|**B** (Karena _Rigorous_ lebih ketat dari _Strict_)|
> 
> ### BAGIAN III: Studi Kasus & Analisis Jadwal
> 
> Soal 3. Analisis Kepatuhan Protokol
> 
> a. Lock Points:
> 
> * T1: Saat XL(B) diberikan (setelah T2 commit).
> 
> * T2: Saat XL(B) diberikan (di awal).
> 
> * T3: Saat XL(A) diberikan (setelah T1 commit).
> 
> b. Analisis T1:
> 
> * 2PL: Ya. Growing: SL(A), XL(B). Shrinking: UL(A), UL(B). Tidak ada acquire setelah release.
> 
> * Strict 2PL: Ya. T1 hanya memiliki lock-X pada B. T1 menahannya (W(B)) hingga Commit baru melepaskannya (UL(B)).
> 
> * Rigorous 2PL: Tidak. T1 menahan lock-X (B) hingga commit, TAPI ia juga memiliki lock-S (A) yang ditahan hingga commit (UL(A) setelah commit). Wait. Mari kita cek lagi: Commit; UL(A); UL(B);. T1 melepaskan semua kuncinya (S dan X) setelah commit. Maka, T1 juga mematuhi Rigorous 2PL.
> 
> c. Analisis T3:
> 
> * 2PL: Ya. Growing: SL(C), XL(A). Shrinking: UL(A), UL(C).
> 
> * Strict 2PL: Ya. T3 memiliki lock-X pada A. Ia menahannya (W(A)) hingga Commit baru melepaskannya (UL(A)).
> 
> * Rigorous 2PL: Tidak. T3 melepaskan lock-S pada C (UL(C)) setelah commit. Ia juga melepaskan lock-X pada A (UL(A)) setelah commit. Maka, T3 juga mematuhi Rigorous 2PL.
> 
> _(Self-correction: Jawaban di atas menunjukkan T1 dan T3 mematuhi Rigorous 2PL. Ini adalah analisis yang benar berdasarkan definisi "melepas semua lock HANYA setelah commit/abort")._
> 
> Soal 4. Studi Kasus: Transfer Dana & Audit (Contoh Jawaban)
> 
> Tujuan: T2 (Audit) tidak boleh melihat A sudah berkurang tapi B belum bertambah.
> 
> T1: XL(A); R(A);
> 
> T2: SL(A); (Wait);
> 
> T1: XL(B); R(B);
> 
> T1: W(A); (Misal A = 900)
> 
> T1: W(B); (Misal B = 1100)
> 
> T1: Commit;
> 
> T1: UL(A);
> 
> T1: UL(B);
> 
> T2: (Grant A); R(A); (T2 melihat A=900)
> 
> T2: SL(B); R(B); (T2 melihat B=1100)
> 
> T2: (Menjumlahkan 900+1100 = 2000)
> 
> T2: Commit;
> 
> T2: UL(A);
> 
> T2: UL(B);
> 
> _Analisis:_ Jadwal ini mematuhi Strict 2PL. T1 menahan _lock-X_ (A dan B) hingga _commit_. T2 (Audit) terpaksa menunggu T1 selesai, sehingga T2 membaca data yang konsisten.
> 
> Soal 5. Analisis Konsekuensi: Pelanggaran Protokol
> 
> a. Pelanggaran 2PL (T1): T1 melanggar 2PL karena ia melakukan acquire lock baru (XL(C)) setelah ia melepaskan lock sebelumnya (UL(A)). Ini adalah growing setelah shrinking.
> 
> b. Pelanggaran Strict 2PL (T1 & T2):
> 
> * T1 melanggar Strict 2PL karena melepaskan lock-X pada A (UL(A)) sebelum ia Abort.
> 
> * T2 melanggar Strict 2PL karena melepaskan lock-X pada B (UL(B)) sebelum ia Commit.
> 
> c. Konsekuensi T1: Abort pada T3:
> 
> * T3 melakukan SL(A) dan R(A) setelah T1 melakukan W(A) dan UL(A).
> 
> * T3 telah membaca data "kotor" (dirty read) yang ditulis oleh T1.
> 
> * Ketika T1 Abort, perubahan pada A harus dibatalkan.
> 
> * Karena T3 telah membaca data A yang tidak valid dan T3 sudah Commit, ini menyebabkan inkonsistensi data yang tidak dapat dipulihkan (unrecoverable). T3 telah commit berdasarkan data sampah. Ini adalah skenario bencana yang lebih buruk dari cascading rollback.
> 
> Soal 6. Esai Sintesis: Trade-off Rigorous 2PL
> 
> a. Keuntungan (T_Book): Menerapkan Rigorous 2PL pada T_Book sangat penting. Ini menjamin konsistensi absolut (mencegah cascading rollback). Jika transaksi booking gagal (misal: pembayaran gagal di akhir), lock-X pada stok (A) dan manifes (B) yang ditahan memastikan tidak ada T_Book lain yang melihat stok yang salah. Ini adalah jaminan recoverability dan strictness yang vital untuk transaksi finansial/inventaris.
> 
> b. Kerugian (T_Report): Ini adalah masalah besar. T_Report (analitik) berjalan 3 menit dan hanya butuh lock-S. Karena menggunakan Rigorous 2PL, T_Report akan menahan lock-S pada A (stok) dan B (manifes) selama 3 menit penuh.
> 
> * Dampak: Selama 3 menit itu, T_Book (booking) yang perlu lock-X(A) atau lock-X(B) akan ter-blokir dan harus menunggu. T_Book adalah transaksi yang sangat sering terjadi (ribuan/detik). Ini berarti seluruh sistem booking akan "freeze" atau antriannya menumpuk parah (konkurensi anjlok) hanya karena satu laporan sedang berjalan. Ini melanggar kebutuhan high availability dari sistem reservasi.
> 
> c. Solusi (Modifikasi):
> 
> * Masalahnya adalah lock-S dari T_Report mem-blokir lock-X dari T_Book.
> 
> * Solusi Terbaik: Gunakan Multiversion Concurrency Control (MVCC) atau Snapshot Isolation untuk T_Report.
> 
> * Penjelasan: Alih-alih T_Report me-lock data A dan B, T_Report diberikan "snapshot" (salinan) data A dan B pada titik waktu T_Report dimulai. T_Report berjalan selama 3 menit pada salinan data ini.
> 
> * Keuntungan: T_Report tidak memegang lock-S sama sekali pada data live. T_Book dapat terus berjalan (mengambil lock-X pada A dan B) tanpa pernah ter-blokir oleh T_Report. T_Report mendapatkan data yang konsisten (sesuai timestamp snapshot-nya) dan T_Book mendapatkan konkurensi maksimal.