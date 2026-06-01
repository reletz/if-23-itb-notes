_Back to_ [[Latihan UAS IF3140]]
# Problem Set: Concurrency Control (Paket D - Advanced)

**Mata Pelajaran:** Sistem Basis Data

**Estimasi Waktu:** 120 Menit

**Total Nilai:** 100 Poin

## BAGIAN I: Pilihan Ganda (20 Soal - 40 Poin)

_Pilihlah satu jawaban yang paling tepat._

1. Dalam protokol Rigorous 2PL, kapankah sebuah transaksi $T_i$ diizinkan untuk melepaskan kunci Shared (S) yang dipegangnya?
    
    a. Segera setelah operasi read selesai.
    
    b. Setelah transaksi masuk ke Shrinking Phase.
    
    c. Hanya setelah transaksi melakukan commit atau abort.
    
    d. Setelah transaksi mendapatkan kunci terakhir yang dibutuhkannya (Lock Point).
    
2. Transaksi $T_1$ memegang kunci SIX pada Tabel Karyawan. Transaksi $T_2$ ingin melakukan read pada satu baris spesifik di tabel tersebut. Jenis kunci apa yang diminta $T_2$ dan apakah dikabulkan?
    
    a. $S$, dikabulkan karena SIX menyertakan hak akses S secara implisit.
    
    b. $IS$, dikabulkan karena kompatibel dengan komponen IX dari SIX.
    
    c. $S$, ditolak karena komponen IX pada SIX tidak mengizinkan akses S.
    
    d. $IX$, dikabulkan untuk tujuan pembacaan konkuren.
    
3. Pada Tree Protocol, jika transaksi $T_3$ ingin mengunci node $Q$, syarat utama yang harus dipenuhi adalah...
    
    a. $T_3$ harus memegang kunci pada seluruh jalur dari root hingga $Q$.
    
    b. $T_3$ harus memegang kunci pada parent langsung dari node $Q$.
    
    c. $T_3$ belum pernah melakukan unlock pada node manapun.
    
    d. Node $Q$ adalah root atau anak langsung dari root.
    
4. Manakah anomali yang TIDAK dapat dicegah oleh tingkat isolasi REPEATABLE READ pada standar SQL, namun dapat dicegah oleh SERIALIZABLE?
    
    a. Dirty Read.
    
    b. Non-repeatable Read.
    
    c. Phantom Read.
    
    d. Lost Update.
    
5. Dalam Basic Timestamp Ordering, jika $TS(T_i) < W-TS(Q)$ saat $T_i$ mencoba melakukan read(Q), maka tindakan DBMS adalah...
    
    a. Operasi diabaikan (ignored) dan $T_i$ lanjut.
    
    b. $T_i$ di-abort karena mencoba membaca nilai yang sudah ditimpa transaksi lebih muda.
    
    c. $T_i$ menunggu hingga transaksi pembuat $W-TS(Q)$ melepaskan kunci.
    
    d. $R-TS(Q)$ diperbarui menjadi $TS(T_i)$ untuk mencatat pembacaan lama.
    
6. Thomas' Write Rule memberikan pengecualian pada operasi write yang usang. Kondisi manakah yang memicu pengabaian operasi write tersebut?
    
    a. $TS(T_i) < R-TS(Q)$.
    
    b. $TS(T_i) < W-TS(Q)$.
    
    c. $TS(T_i) > W-TS(Q)$.
    
    d. $TS(T_i) = R-TS(Q)$.
    
7. Pada Validation-Based Protocol, fase manakah yang menyalin hasil penulisan dari variabel lokal ke basis data yang sebenarnya?
    
    a. Read Phase.
    
    b. Validation Phase.
    
    c. Write Phase.
    
    d. Execution Phase.
    
8. Dalam Snapshot Isolation, anomali Write Skew terjadi karena...
    
    a. Dua transaksi menulis ke item data yang sama secara bersamaan.
    
    b. Transaksi membaca data kotor dari transaksi lain yang belum commit.
    
    c. Dua transaksi membaca data yang sama, namun menulis ke item data berbeda yang saling terkait secara logika.
    
    d. Transaksi gagal memvalidasi Read Set terhadap Write Set transaksi lain.
    
9. Protokol Multiversion 2PL memberikan keuntungan bagi transaksi Read-Only berupa...
    
    a. Prioritas tinggi dalam antrian kunci.
    
    b. Tidak pernah membutuhkan kunci (lock) sama sekali karena menggunakan versi lama.
    
    c. Dapat meng-upgrade kunci S menjadi X secara otomatis.
    
    d. Selalu membaca versi data terbaru meskipun belum di-commit.
    
10. Pada hirarki Multiple Granularity, aturan pelepasan kunci (unlock) harus dilakukan secara...
    
    a. Top-Down (dari Database ke Record).
    
    b. Bottom-Up (dari Record ke Database).
    
    c. Berurutan sesuai dengan urutan perolehan kunci.
    
    d. Bebas selama mematuhi aturan fase shrinking.
    
11. Skenario: $T_4 (TS=10)$ dan $T_5 (TS=20)$. $T_4$ melakukan write(A). Kemudian $T_5$ melakukan read(A) dan commit. Jika $T_4$ kemudian abort, maka $T_5$ harus di-rollback. Ini disebut...
    
    a. Deadlock.
    
    b. Cascading Rollback.
    
    c. Starvation.
    
    d. Livelock.
    
12. Dalam MVCC, jika $T_i$ ingin melakukan read(Q), versi $Q_k$ mana yang dipilih oleh sistem?
    
    a. Versi paling lama yang tersedia.
    
    b. Versi dengan $W-TS(Q_k)$ terbesar yang nilainya $\le TS(T_i)$.
    
    c. Versi dengan $R-TS(Q_k)$ terkecil.
    
    d. Versi yang paling baru di-commit oleh transaksi manapun.
    
13. Mengapa Validation-Based Protocol disebut sebagai skema Optimistic?
    
    a. Karena mengasumsikan transaksi akan selalu berhasil.
    
    b. Karena tidak melakukan pengecekan konflik hingga transaksi siap untuk commit.
    
    c. Karena mengizinkan pembacaan data tanpa lock internal.
    
    d. Karena mempercepat performa tulis di atas performa baca.
    
14. Pada Tree Protocol, kunci yang sudah dilepaskan oleh sebuah transaksi...
    
    a. Dapat diminta kembali selama transaksi memegang kunci pada parent-nya.
    
    b. Tidak boleh diminta kembali oleh transaksi yang sama pada node tersebut maupun turunannya.
    
    c. Otomatis akan menyebabkan transaksi di-abort jika meminta kunci baru.
    
    d. Berarti transaksi tersebut telah menyelesaikan seluruh operasinya.
    
15. Manakah kombinasi kunci niat berikut yang bersifat KOMPATIBEL pada node yang sama?
    
    a. IX dan S.
    
    b. SIX dan IX.
    
    c. IS dan IX.
    
    d. X dan IS.
    
1. Skenario: Transaksi $T_1$ menghitung jumlah baris dengan dept='Riset'. Transaksi $T_2$ melakukan INSERT data baru pada dept='Riset' dan COMMIT. Saat $T_1$ menghitung ulang, hasilnya berbeda. Fenomena ini disebut...
    
    a. Dirty Read.
    
    b. Non-repeatable Read.
    
    c. Phantom Problem.
    
    d. Lost Update.
    
2. Mekanisme penguncian pada rentang indeks (misal: semua record dengan nilai 'Riset') untuk mencegah masuknya data baru yang memenuhi kriteria kueri disebut...
    
    a. Record-Level Locking.
    
    b. Index-Range Locking.
    
    c. Predicate Locking.
    
    d. Gap Locking.
    
3. Di antara level isolasi berikut, manakah yang merupakan level paling lemah dan mengizinkan pembacaan data yang belum di-commit (Dirty Read)?
    
    a. READ COMMITTED.
    
    b. REPEATABLE READ.
    
    c. READ UNCOMMITTED.
    
    d. SERIALIZABLE.
    
4. Standar level isolasi READ COMMITTED menjamin bahwa...
    
    a. Data yang dibaca tidak akan berubah selama transaksi berlangsung.
    
    b. Tidak akan ada baris baru yang muncul saat kueri diulang.
    
    c. Transaksi hanya membaca data yang sudah berhasil di-commit.
    
    d. Tidak akan terjadi konflik tulis-tulis antar transaksi.
    
5. Fenomena Non-repeatable Read terjadi ketika...
    
    a. Transaksi membaca data yang dihapus transaksi lain.
    
    b. Transaksi membaca nilai yang berbeda pada baris yang sama karena transaksi lain melakukan UPDATE dan COMMIT.
    
    c. Transaksi membaca data yang belum di-commit oleh transaksi lain.
    
    d. Transaksi gagal menulis data karena kunci dipegang oleh transaksi hantu.
    

## BAGIAN II: Benar atau Salah (10 Soal - 20 Poin)

_Tentukan apakah pernyataan berikut Benar (B) atau Salah (S)._

21. [ ] Protokol **Strict 2PL** dirancang khusus untuk memastikan sistem bebas dari _Cascading Rollback_.
    
22. [ ] Pada **Tree Protocol**, transaksi diperbolehkan melakukan penguncian pertama pada node mana pun, tidak harus dari _root_.
    
23. [ ] Dalam skema **Multiversion Timestamp Ordering**, operasi `read` dijamin tidak akan pernah menyebabkan transaksi di-_abort_.
    
24. [ ] Kunci **SIX** pada level Tabel memberikan izin baca eksplisit di level tabel tersebut dan izin tulis di level baris di bawahnya.
    
25. [ ] **Thomas' Write Rule** menjamin jadwal yang dihasilkan selalu bersifat _Conflict Serializable_.
    
26. [ ] Pada **Validation-Based Protocol**, urutan serialisasi transaksi ditentukan oleh waktu saat transaksi dimulai (`Start(Ti)`).
    
27. [ ] **Snapshot Isolation** mampu mencegah fenomena _Non-repeatable Read_ dengan memberikan "foto" database yang konsisten.
    
28. [ ] Untuk mendapatkan kunci **X** pada level _Record_, transaksi wajib memegang kunci **IX** atau **SIX** pada seluruh leluhur (_ancestor_) record tersebut.
    
29. [ ] Protokol **2PL** dasar dijamin aman dari kondisi saling tunggu atau _deadlock_.
    
30. [ ] Pada **MVCC**, versi lama dari data segera dihapus begitu ada transaksi baru yang melakukan `write` pada data tersebut.
    

## BAGIAN III: Matriks Berganda (10 Soal - 40 Poin)

_Instruksi: Analisislah skenario/tabel berikut dengan teliti._

### Matriks 1: Kompatibilitas Kunci (Poin: 20)

Berikan tanda **V** (Kompatibel) atau **X** (Konflik) pada permintaan kunci berikut jika node sedang dipegang oleh transaksi lain:

|**Status (Held) \ Request**|**IS**|**IX**|**S**|**SIX**|**X**|
|---|---|---|---|---|---|
|**IS**|(31)|(32)|(33)|(34)|(35)|
|**SIX**|(36)|(37)|(38)|(39)|(40)|

### Matriks 2: Matriks Perbandingan Protokol (Studi Kasus Analitis)

Tentukan apakah karakteristik berikut dimiliki oleh protokol terkait (Isi dengan "Ya" atau "Tidak").

|**Fitur / Protokol**|**Rigorous 2PL**|**Tree Protocol**|**Timestamp Ordering**|**Validation**|
|---|---|---|---|---|
|Menjamin _Conflict Serializability_|||||
|Menjamin Bebas _Deadlock_|||||
|Menahan seluruh kunci hingga _Commit_|||||
|Memungkinkan _Abort_ di fase Validasi|||||

## Kunci Jawaban & Pembahasan Paket D

### Bagian I: Pilihan Ganda

1. **c** (Rigorous 2PL menahan kunci S dan X hingga transaksi selesai).
    
2. **a** (SIX memiliki hak baca di level tersebut, sehingga request S dikabulkan).
    
3. **b** (Syarat penguncian rekursif pada Tree Protocol).
    
4. **c** (Repeatable read mencegah perubahan nilai, tapi tidak mencegah penambahan baris).
    
5. **b** (Aturan Read-TO: TS(Ti) < W-TS(Q) berarti data terlalu baru bagi Ti).
    
6. **b** (Aturan Thomas untuk write usang: TS(Ti) < W-TS(Q)).
    
7. **c** (Fase fisik pembaruan basis data).
    
8. **c** (Interaksi antar variabel yang tidak terdeteksi oleh validasi tulis-tulis SI).
    
9. **b** (Keunggulan utama pembacaan versi tanpa _lock_).
    
10. **b** (Aturan protokol MG untuk efisiensi sistem).
    
11. **b** (Definisi ketergantungan rollback).
    
12. **b** (Logika pemilihan versi pada MVCC).
    
13. **b** (Karena pengecekan ditunda hingga akhir).
    
14. **b** (Aturan "No-Revisit" pada Tree Protocol).
    
15. **c** (Niat baca dan niat tulis tidak konflik di level atas).
    
16. **c** (Munculnya baris hantu dari transaksi konkuren).
    
17. **b** (Solusi untuk mencegah anomali Phantom).
    
18. **c** (Level paling permisif dalam SQL).
    
19. **c** (Fungsi dasar dari tingkat isolasi ini).
    
20. **b** (Nilai baris yang sama berubah karena pembaruan oleh transaksi lain).
    

### Bagian II: Benar atau Salah

21. **B** (Strict mencegah Dirty Read yang memicu cascading).
    
22. **B** (Aturan Tree Protocol: lock pertama bebas).
    
23. **B** (Karena sistem selalu mencarikan versi lama yang sesuai).
    
24. **B** (Definisi SIX: S di node tersebut, IX di bawahnya).
    
25. **S** (Thomas Rule menjamin _View Serializability_, bukan _Conflict_).
    
26. **S** (Ditentukan oleh waktu masuk fase validasi: `Validation(Ti)`).
    
27. **B** (Setiap kueri dalam satu transaksi SI melihat data yang sama).
    
28. **B** (Aturan protokol Multiple Granularity).
    
29. **S** (2PL rentan terhadap deadlock karena mekanisme tunggu).
    
30. **S** (Versi lama tetap disimpan selama masih ada transaksi aktif yang membutuhkannya).
    

### Bagian III: Matriks (Ringkasan)

- **Matriks 1:** 31-34 (V), 35 (X), 36 (V), 37-40 (X).
    
- **Matriks 2**:

	|**Fitur / Protokol**|**Rigorous 2PL**|**Tree Protocol**|**Timestamp Ordering**|**Validation**|
	|---|---|---|---|---|
	|Menjamin _Conflict Serializability_|Ya|Ya|Ya|Ya|
	|Menjamin Bebas _Deadlock_|Tidak|Ya|Ya|Ya|
	|Menahan seluruh kunci hingga _Commit_|Ya|Tidak|Tidak|Tidak|
	|Memungkinkan _Abort_ di fase Validasi|Tidak|Tidak|Tidak|Ya|
    

**Strategi Lanjutan:** Perhatikan bahwa pada tingkat **Advanced**, pemahaman Anda mengenai perbedaan antara _Conflict Serializability_ dan _View Serializability_ (seperti pada Thomas' Write Rule) sangat krusial. Selain itu, kuasai perbedaan antara level isolasi **Repeatable Read** dan **Snapshot Isolation** karena sering terjadi tumpang tindih konsep.