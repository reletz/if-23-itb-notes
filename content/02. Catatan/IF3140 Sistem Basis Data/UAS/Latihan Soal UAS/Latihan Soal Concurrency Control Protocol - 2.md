_Back to_ [[IF3140 Sistem Basis Data]]

Naufarrel Zhafif Abhista
13523149

# 1. Timestamp dan Validation-Based Protocol

> **Periksalah** apakah schedule _S: R1(X); W2(X); W2(Y); W3(Y); W1(Y); C1; C2; C3;_ dapat dihasilkan dengan menggunakan protokol-protokol berikut ini. _Timestamp_ transaksi _Ti_ adalah _i_ dan sebelum _S_ dieksekusi _timestamp_ semua item data adalah 0. **Jelaskan** jawaban Anda.
>1. Timestamp ordering
>2. Timestamp ordering with Thomas’ Write Rule
>3. Validation based


## Timestamp Ordering

1. R1(X): TS(T1) = 1, W-TS(X) = 0. Karena 1 ≥ 0, OK. Set R-TS(X) = max(TS(T1), W-TS(X)) = 1.
2. W2(X): TS(T2) = 2, R-TS(X) = 1, W-TS(X) = 0. Karena 2 ≥ 1 dan 2 ≥ 0, OK. Set W-TS(X) = max(TS(T1), R-TS(X)) = 2.
3. W2(Y): TS(T2) = 2, R-TS(Y) = 0, W-TS(Y) = 0. Karena 2 ≥ 0, OK. Set W-TS(Y) = max(TS(T2), R-TS(Y)) = 2.
4. W3(Y): TS(T3) = 3, R-TS(Y) = 0, W-TS(Y) = 0. Karena 3 ≥ 0, OK. Set W-TS(Y) = max(TS(T3), R-TS(Y)) = 3.
5. W1(Y): TS(T1) = 1, R-TS(Y) = 0, W-TS(Y) = 3. Karena 1 !≥ 3, ABORT. 1 mencoba menulis nilai yang obsolete (usang). Timestamp T1 (yaitu 1) lebih kecil dari W-TS(Y) (yaitu 3), yang berarti data Y telah ditulis oleh transaksi T3 yang lebih baru.

Kesimpulan: Schedule S tidak dapat dihasilkan oleh protokol Timestamp Ordering dasar.

## Timestamp Ordering with Thomas' Write Rule

1. R1(X): TS(T1) = 1, W-TS(X) = 0. Karena 1 ≥ 0, OK. Set R-TS(X) = max(TS(T1), W-TS(X)) = 1.
2. W2(X): TS(T2) = 2, R-TS(X) = 1, W-TS(X) = 0. Karena 2 ≥ 1 dan 2 ≥ 0, OK. Set W-TS(X) = max(TS(T1), R-TS(X)) = 2.
3. W2(Y): TS(T2) = 2, R-TS(Y) = 0, W-TS(Y) = 0. Karena 2 ≥ 0, OK. Set W-TS(Y) = max(TS(T2), R-TS(Y)) = 2.
4. W3(Y): TS(T3) = 3, R-TS(Y) = 0, W-TS(Y) = 0. Karena 3 ≥ 0, OK. Set W-TS(Y) = max(TS(T3), R-TS(Y)) = 3.
5. W1(Y): TS(T1) = 1, R-TS(Y) = 0, W-TS(Y) = 3. Karena 1 !≥ 3, Thomas' Write Rule diterapkan. Operasi W1(Y) diabaikan (tidak ada perubahan pada data Y atau W-TS(Y)), tetapi T1 tidak di-abort
6. C1 OK
7. C2 OK
8. C3 OK.

Kesimpulan: Schedule S dapat dihasilkan oleh protokol Timestamp Ordering dengan Thomas’ Write Rule.

## Validation Based

1. Transaksi T1 Validasi (C1)
	
	- T1 adalah yang pertama. Tidak ada Tj yang sudah divalidasi sebelumnya.
	- Validasi T1: SUKSES.
	- Write Phase T1 dieksekusi: W1(Y) ditulis ke database. Finish(T1) tercapai.

2. Transaksi T2 Validasi (C2)

	- T2 harus divalidasi terhadap Tj = T1 (karena Validation(T1) < Validation(T2)).
	- Cek Kondisi 1: Finish(T1) < Start(T2)?
	    - Schedule menunjukkan R1(X) lalu W2(X). Start(T2) terjadi setelah Start(T1), tapi sebelum Finish(T1) (yang terjadi di C1).
	    - Kondisi 1: SALAH.
	- Cek Kondisi 2: WS(T1) ∩ RS(T2) = ∅?
	    - WS(T1) = {Y}
	    - RS(T2) = {}
	    - {Y} ∩ {} = ∅. (Benar)
	    - Kondisi 2: BENAR

3. Transaksi T3 Validasi (C3)
Pada titik ini, T1 dan T2 sudah dianggap commit (sudah tervalidasi sukses). T3 (sebagai Ti) sekarang harus divalidasi terhadap semua transaksi yang mendahuluinya.
T3 harus lolos tes melawan KEDUANYA.
RS(T3) = {}, WS(T3) = {Y}

Tes A: Validasi T3 terhadap T1

* Cek Kondisi 1: Finish(T1) < Start(T3)?

	* Start(T3)` terjadi di W3(Y).

	* Finish(T1)` terjadi di C1.

	* Dalam schedule: `... W3(Y) ... C1 ...`

	* Start(T3) terjadi sebelum Finish(T1).

	* Kondisi 1: SALAH.

* **Cek Kondisi 2: WS(T1) ∩ RS(T3) = ∅?

	* WS(T1) = {Y}

	* RS(T3) = {}

	* {Y} ∩ {} = ∅.

	* Kondisi 2: BENAR

* Hasil Tes A: T3 vs T1 -> SUKSES.

Tes B: Validasi T3 terhadap T2

* Cek Kondisi 1: Finish(T2) < Start(T3)?

	* Start(T3) terjadi di W3(Y)

	* Finish(T2) terjadi di C2.

	* Dalam schedule: `... W3(Y) ... C2 ...`

	* Start(T3) terjadi sebelum Finish(T2)

	* Kondisi 1: SALAH.

* Cek Kondisi 2: WS(T2) ∩ RS(T3) = ∅?

	* WS(T2) = {X, Y}

	* RS(T3) = {}

	* {X, Y} ∩ {} = ∅.

	* Kondisi 2: BENAR.

* Hasil Tes B: T3 vs T2 -> SUKSES.

Kesimpulan: Protokol VBP akan memvalidasi schedule ini.

# 2. Multiversion Timestamp Ordering Protocol

> Diberikan urutan kedatangan instruksi transaksi T1, T2, dan T3 ke DBMS berikut. Transaksi dimulai tepat sebelum instruksi pertama pada transaksi tersebut.  
Keterangan: R(Q) adalah read data Q dan W(Q) adalah write pada data Q untuk transaksi terkait.
> - **T1:** R(A), R(B), R(C), commit
> - **T2:** R(A), W(C), R(D), W(D), commit
> - **T3:** R(B), W(C), W(B), commit
> 
> Urutan eksekusi _interleaved_ (Jadwal S) adalah sebagai berikut:
> 1. `R1(A)`
> 2. `R2(A)`
> 3. `R3(B)`
> 4. `R1(B)`
> 5. `W3(C)`
> 6. `W2(C)`
> 7. `R1(C)`
> 8. `R2(D)`
> 9. `W3(B)`
> 10. `commit T3`
> 11. `commit T1`
> 12. `W2(D)`
> 13. `commit T2`
> 
> Tuliskan langkah-langkah untuk mengeksekusi jadwal di atas sampai semua transaksi tuntas dieksekusi dengan **multiversion timestamp ordering protocol** dan jelaskan setiap tahapan eksekusi, termasuk versi data yang dihasilkan. Sebutkan dan jelaskan apa yang terjadi pada tiap transaksi: apakah abort atau commit. Jika terjadi abort, jelaskan bagaimana proses rollback dilakukan. Jika dibutuhkan, timestamp (Tx,Ty,Tz) = (1,2,3).
> Asumsikan: Jika terjadi abort yang menyebabkan sebuah transaksi di-rollback, DBMS akan memprioritaskan eksekusi ulang dari instruksi transaksi tersebut hingga bagian instruksi yang menyebabkan abort.

Protokol _Multiversion Timestamp Ordering_ (MTO) menggunakan _timestamp_ transaksi (`TS`) untuk mengelola versi data. Setiap versi data `Qk` memiliki `W-TS(Qk)` (timestamp tulis) dan `R-TS(Qk)` (timestamp baca terbesar).

### Aturan MTO

1. **Read `R_i(Q)`:**
    
    - Sistem mencari versi `Qk` dengan `W-TS(Qk)` terbesar yang **`<= TS(T_i)`**.
        
    - Operasi _read_ **selalu berhasil**.
        
    - Sistem memperbarui `R-TS(Qk) = max( R-TS(Qk), TS(T_i) )`.
        
2. **Write `W_i(Q)`:**
    
    - Sistem mencari versi `Qk` dengan `W-TS(Qk)` terbesar yang **`<= TS(T_i)`**.
        
    - **Pengecekan Abort:** Jika **`TS(T_i) < R-TS(Qk)`**, maka `T_i` harus **ABORT**. (Artinya: `T_i` mencoba menulis versi yang "seharusnya" sudah ditulisnya, tetapi versi tersebut sudah telanjur dibaca oleh transaksi lain yang lebih baru).
        
    - **Pengecekan Timpa (Overwrite):** Jika `TS(T_i) == W-TS(Qk)`, `T_i` menimpa data di versi `Qk`. (Jarang terjadi).
        
    - **Buat Versi Baru:** Jika lolos, `T_i` membuat versi baru `Q_i` dengan `W-TS(Q_i) = TS(T_i)` dan `R-TS(Q_i) = TS(T_i)`.
        

### 1. Inisialisasi

- **Timestamp Transaksi:** `TS(T1)=1`, `TS(T2)=2`, `TS(T3)=3`.
    
- **Versi Data Awal:**
    
    - `A_0`: `W-TS=0`, `R-TS=0`
        
    - `B_0`: `W-TS=0`, `R-TS=0`
        
    - `C_0`: `W-TS=0`, `R-TS=0`
        
    - `D_0`: `W-TS=0`, `R-TS=0`
        

### 2. Langkah-Langkah Eksekusi (Tracing)

1. **`R1(A)`**:
    
    - `TS(T1) = 1`. Mencari `A_k` dengan `W-TS <= 1`. Menemukan `A_0` (W-TS=0).
        
    - T1 membaca `A_0`.
        
    - Set `R-TS(A_0) = max(0, 1) = 1`.
        
    - **OK**.
        
2. **`R2(A)`**:
    
    - `TS(T2) = 2`. Mencari `A_k` dengan `W-TS <= 2`. Menemukan `A_0` (W-TS=0).
        
    - T2 membaca `A_0`.
        
    - Set `R-TS(A_0) = max(1, 2) = 2`.
        
    - **OK**.
        
3. **`R3(B)`**:
    
    - `TS(T3) = 3`. Mencari `B_k` dengan `W-TS <= 3`. Menemukan `B_0` (W-TS=0).
        
    - T3 membaca `B_0`.
        
    - Set `R-TS(B_0) = max(0, 3) = 3`.
        
    - **OK**.
        
4. **`R1(B)`**:
    
    - `TS(T1) = 1`. Mencari `B_k` dengan `W-TS <= 1`. Menemukan `B_0` (W-TS=0).
        
    - T1 membaca `B_0`.
        
    - Set `R-TS(B_0) = max(3, 1) = 3`.
        
    - **OK**.
        
5. **`W3(C)`**:
    
    - `TS(T3) = 3`. Mencari `C_k` dengan `W-TS <= 3`. Menemukan `C_0` (W-TS=0).
        
    - Cek Abort: `TS(T3) < R-TS(C_0)`? -> `3 < 0`? **Tidak**.
        
    - **OK**. Membuat versi baru `C_3`.
        
    - Status `C`: `C_0 {W-TS=0, R-TS=0}`, `C_3 {W-TS=3, R-TS=3}`.
        
6. **`W2(C)`**:
    
    - `TS(T2) = 2`. Mencari `C_k` dengan `W-TS <= 2`. Menemukan `C_0` (W-TS=0).
        
    - Cek Abort: `TS(T2) < R-TS(C_0)`? -> `2 < 0`? **Tidak**.
        
    - **OK**. Membuat versi baru `C_2`.
        
    - Status `C` (terurut): `C_0 {W-TS=0, R-TS=0}`, `C_2 {W-TS=2, R-TS=2}`, `C_3 {W-TS=3, R-TS=3}`.
        
7. **`R1(C)`**:
    
    - `TS(T1) = 1`. Mencari `C_k` dengan `W-TS <= 1`. Menemukan `C_0` (W-TS=0).
        
    - T1 membaca `C_0`.
        
    - Set `R-TS(C_0) = max(0, 1) = 1`.
        
    - **OK**.
        
8. **`R2(D)`**:
    
    - `TS(T2) = 2`. Mencari `D_k` dengan `W-TS <= 2`. Menemukan `D_0` (W-TS=0).
        
    - T2 membaca `D_0`.
        
    - Set `R-TS(D_0) = max(0, 2) = 2`.
        
    - **OK**.
        
9. **`W3(B)`**:
    
    - `TS(T3) = 3`. Mencari `B_k` dengan `W-TS <= 3`. Menemukan `B_0` (W-TS=0).
        
    - Cek Abort: `TS(T3) < R-TS(B_0)`? -> `3 < 3`? **Tidak**. (Karena `3 < 3` adalah `false`).
        
    - **OK**. Membuat versi baru `B_3`.
        
    - Status `B`: `B_0 {W-TS=0, R-TS=3}`, `B_3 {W-TS=3, R-TS=3}`.
        
10. **`commit T3`**:
    
    - T3 tidak mengalami _abort_.
        
    - **OK (COMMIT)**.
        
11. **`commit T1`**:
    
    - T1 tidak mengalami _abort_.
        
    - **OK (COMMIT)**.
        
12. **`W2(D)`**:
    
    - `TS(T2) = 2`. Mencari `D_k` dengan `W-TS <= 2`. Menemukan `D_0` (W-TS=0).
        
    - Cek Abort: `TS(T2) < R-TS(D_0)`? -> `2 < 2`? **Tidak**. (Karena `2 < 2` adalah `false`).
        
    - **OK**. Membuat versi baru `D_2`.
        
    - Status `D`: `D_0 {W-TS=0, R-TS=2}`, `D_2 {W-TS=2, R-TS=2}`.
        
13. **`commit T2`**:
    
    - T2 tidak mengalami _abort_.
        
    - **OK (COMMIT)**.
        

### 3. Kesimpulan

Seluruh schedule **berhasil dieksekusi** dengan tuntas. **Tidak ada transaksi yang di-abort** atau di-_rollback_.

Protokol MTO berhasil menangani semua operasi. Operasi _read_ selalu menemukan versi yang valid (T1, T2, T3 selalu membaca versi `_0` karena tidak ada versi lain yang dibuat dengan W-TS lebih kecil dari `TS` mereka). Operasi _write_ juga berhasil karena kondisi _abort_ ( `TS(Ti) < R-TS(Qk)` ) tidak pernah terpenuhi.

#### Versi Data Final

- **A**: `A_0 {W-TS=0, R-TS=2}`
    
- **B**: `B_0 {W-TS=0, R-TS=3}`, `B_3 {W-TS=3, R-TS=3}`
    
- **C**: `C_0 {W-TS=0, R-TS=1}`, `C_2 {W-TS=2, R-TS=2}`, `C_3 {W-TS=3, R-TS=3}`
    
- **D**: `D_0 {W-TS=0, R-TS=2}`, `D_2 {W-TS=2, R-TS=2}`

# 3. Multiversion Two-phase Locking Protocol

> Diberikan urutan kedatangan instruksi transaksi T1, T2, dan T3 ke DBMS berikut. Transaksi dimulai tepat sebelum instruksi pertama pada transaksi tersebut.  Keterangan: R(Q) adalah read data Q dan W(Q) adalah write pada data Q untuk transaksi terkait.
> 
> - **T1:** R(A), R(B), R(C), commit
> - **T2:** R(A), W(C), R(D), W(D), commit
> - **T3:** R(B), W(C), W(B), commit
>
> Urutan eksekusi _interleaved_ (Jadwal S) adalah sebagai berikut:
> 
> 1. `R1(A)`
> 2. `R2(A)`
> 3. `R3(B)`
> 4. `R1(B)`
> 5. `W3(C)`
> 6. `W2(C)`
> 7. `R1(C)`
> 8. `R2(D)`
> 9. `W3(B)`
> 10. `commit T3`
> 11. `commit T1`
> 12. `W2(D)`
> 13. `commit T2`
> 
> **Tuliskan langkah-langkah** untuk mengeksekusi jadwal di atas sampai semua transaksi tuntas dieksekusi dengan _**multiversion two-phase locking protocol**_ dan jelaskan setiap tahapan eksekusi, termasuk versi data yang dihasilkan.


Protokol Multiversion Two-Phase Locking (MV-2PL) membagi transaksi menjadi dua jenis: **Read-Only** dan **Update**.

1. **Klasifikasi Transaksi:**
    
    - **T1 (Read-Only):** Hanya melakukan `R(A), R(B), R(C)`. T1 akan diberi _timestamp_ (`TS(T1)`) saat dimulai dan **tidak menggunakan _lock_**.
        
    - **T2 (Update):** Melakukan _read_ dan _write_. T2 harus mengikuti **Rigorous 2PL** (memperoleh _lock_ S/X dan menahannya sampai _commit_).
        
    - **T3 (Update):** Melakukan _read_ dan _write_. T3 juga harus mengikuti **Rigorous 2PL**.
        

### Aturan MV-2PL

- **T-Update (T2, T3):** Harus mendapatkan `S-lock` untuk _read_ dan `X-lock` untuk _write_. Semua _lock_ ditahan sampai _commit_. Saat _write_, T-Update membuat versi baru yang _uncommitted_.
    
- **T-Read-Only (T1):** Tidak pernah _lock_. Saat `R1(Q)`, T1 akan membaca versi data `Qk` **terbaru yang sudah di-_commit_** dengan `W-TS(Qk) <= TS(T1)`.
    

### 1. Inisialisasi

- **Transaksi:** `T1` (Read-Only, `TS(T1)`), `T2` (Update), `T3` (Update).
    
- **Versi Data Awal (Committed):** `A_0`, `B_0`, `C_0`, `D_0` (semua dengan `W-TS=0`).
    
- **Lock Table:** Kosong.
    

### 2. Langkah-Langkah Eksekusi (Tracing)

1. **`R1(A)`**:
    
    - `T1` (Read-Only) dimulai, mendapatkan `TS(T1)`.
        
    - T1 mencari versi `A` terbaru yang _committed_ dengan `W-TS <= TS(T1)`. Ia menemukan `A_0`.
        
    - **OK**. T1 membaca `A_0`. (Tidak ada _lock_).
        
2. **`R2(A)`**:
    
    - `T2` (Update) harus mendapatkan `S-lock(A)`.
        
    - Lock table kosong.
        
    - **OK**. T2 mendapatkan `S-lock(A)`.
        
    - _Lock Table:_ `T2: S-lock(A)`.
        
3. **`R3(B)`**:
    
    - `T3` (Update) harus mendapatkan `S-lock(B)`.
        
    - Lock table kosong.
        
    - **OK**. T3 mendapatkan `S-lock(B)`.
        
    - _Lock Table:_ `T2: S-lock(A)`; `T3: S-lock(B)`.
        
4. **`R1(B)`**:
    
    - `T1` (Read-Only) mencari versi `B` terbaru yang _committed_ dengan `W-TS <= TS(T1)`. Ia menemukan `B_0`.
        
    - **OK**. T1 membaca `B_0`. T1 **tidak perlu menunggu** `T3` yang memegang `S-lock(B)`. Ini adalah fitur utama MV-2PL.
        
5. **`W3(C)`**:
    
    - `T3` (Update) harus mendapatkan `X-lock(C)`.
        
    - Lock table kosong.
        
    - **OK**. T3 mendapatkan `X-lock(C)`. T3 membuat versi baru `C_3` (uncommitted).
        
    - _Lock Table:_ `T2: S-lock(A)`; `T3: S-lock(B), X-lock(C)`.
        
    - _Data Versions:_ `C_0` (committed), `C_3` (uncommitted, locked by T3).
        
6. **`W2(C)`**:
    
    - `T2` (Update) harus mendapatkan `X-lock(C)`.
        
    - Lock Manager memeriksa: `T3` sedang memegang `X-lock(C)`.
        
    - **KONFLIK (X-X)**.
        
    - Menurut aturan Rigorous 2PL (yang harus dipatuhi `T2` dan `T3`), `T2` **HARUS MENUNGGU** (`WAIT`/`BLOCK`) sampai `T3` melepaskan `X-lock(C)`.
        
    - `T3` baru akan melepaskan `lock`-nya saat _commit_ di **langkah 10**.
        

### 3. Kesimpulan

Jadwal (schedule) yang diberikan **TIDAK DAPAT** dihasilkan oleh protokol Multiversion Two-Phase Locking.

> Alasan: Pada langkah 6 (W2(C)), transaksi T2 (sebagai Update Transaction) akan diblokir karena T3 (juga Update Transaction) sudah memegang X-lock pada C.

`T2` tidak akan bisa melanjutkan eksekusinya (`R1(C)`, `R2(D)`, dst. tidak bisa terjadi) sampai `T3` _commit_ pada **langkah 10**. Oleh karena itu, urutan _interleaving_ yang disajikan dalam jadwal tersebut secara fundamental melanggar aturan _locking_ yang wajib dipatuhi oleh transaksi _update_ dalam skema MV-2PL.

# 4. Snapshot Isolation (First-committer Wins)


> Diberikan urutan kedatangan instruksi transaksi T1, T2, dan T3 ke DBMS. Transaksi dimulai tepat sebelum instruksi pertama pada transaksi tersebut. Keterangan: R(Q) adalah read data Q dan W(Q) adalah write pada data Q untuk transaksi terkait.
> - **Asumsi nilai awal:** A=10, B=20, C=0, D=30.
> - **T1:** R(A), R(B), R(C), commit
> - **T2:** R(A), C:=35, W(C), R(D), D:=0.2*D+A, W(D), commit
> - **T3:** R(B), C:=50, W(C), B:=B-0.1*C, W(B), commit
> 
> Urutan eksekusi _interleaved_ (Jadwal S) adalah sebagai berikut:
> 1. `R1(A)`
> 2. `R2(A)`
> 3. `R3(B)`
> 4. `R1(B)`
> 5. `C:=50` (T3)
> 6. `W3(C)`
> 7. `C:=35` (T2)
> 8. `W2(C)`
> 9. `R1(C)`
> 10. `commit T1`
> 11. `R2(D)`
> 12. `B:=B-0.1*C` (T3)
> 13. `W3(B)`
> 14. `commit T3`
> 15. `D:=0.2*D+A` (T2)
> 16. `W2(D)`
> 17. `commit T2`
> 
> Tuliskan langkah-langkah untuk mengeksekusi jadwal di atas dengan snapshot isolation (dengan first-committer wins). Jelaskan setiap tahapan, versi data, dan nasib tiap transaksi (abort/commit). Sebutkan pula nilai versi data final.


Snapshot Isolation (SI) bekerja dengan aturan berikut:

1. **Read (Baca):** Setiap transaksi (`Ti`) membaca dari "snapshot" database yang konsisten, yaitu nilai-nilai yang sudah di-_commit_ tepat **sebelum `Ti` dimulai**. Bacaan tidak pernah diblokir.
    
2. **Write (Tulis):** Semua penulisan dilakukan di _workspace_ pribadi (lokal) transaksi.
    
3. **Commit (Validasi):** Saat `Ti` mencoba _commit_, sistem melakukan validasi:
    
    - `Ti` membuat daftar item yang ia tulis, disebut **Write Set `WS(Ti)`**.
        
    - Sistem memeriksa apakah ada transaksi lain (`Tj`) yang sudah _commit_ **setelah `Ti` dimulai** (`Start(Ti) < Commit(Tj)`), DAN
        
    - `WS(Ti)` dan `WS(Tj)` beririsan (ada konflik _Write-Write_).
        
    - Jika **YA**, `Ti` harus **ABORT**. Ini adalah aturan _First-Committer Wins_: `Tj` (yang _commit_ duluan) menang, `Ti` (yang _commit_ belakangan) kalah dan harus _abort_.
        

### 1. Inisialisasi

- **Nilai Awal (Committed):** `A=10`, `B=20`, `C=0`, `D=30`.
    
- **Workspace (Private):** `T1={}` , `T2={}` , `T3={}`
    
- **Waktu Mulai (Start Time):**
    
    - `Start(T1)` = langkah 1
        
    - `Start(T2)` = langkah 2
        
    - `Start(T3)` = langkah 3
        
- **Snapshot (Apa yang mereka lihat):**
    
    - `Snapshot(T1)`: {A=10, B=20, C=0, D=30}
        
    - `Snapshot(T2)`: {A=10, B=20, C=0, D=30}
        
    - `Snapshot(T3)`: {A=10, B=20, C=0, D=30}
        
- **Write Sets (Daftar item yang akan ditulis):**
    
    - `WS(T1)`: {} (T1 _read-only_)
        
    - `WS(T2)`: {C, D}
        
    - `WS(T3)`: {B, C}
        

### 2. Langkah-Langkah Eksekusi (Tracing)

1. **`R1(A)`**: T1 (mulai) membaca `A=10` dari snapshot-nya.
    
2. **`R2(A)`**: T2 (mulai) membaca `A=10` dari snapshot-nya.
    
3. **`R3(B)`**: T3 (mulai) membaca `B=20` dari snapshot-nya.
    
4. **`R1(B)`**: T1 membaca `B=20` dari snapshot-nya.
    
5. **`C:=50` (T3)**: Kalkulasi lokal T3.
    
6. **`W3(C)`**: T3 menulis ke workspace-nya. `Workspace(T3) = {C=50}`. (Nilai di database masih C=0).
    
7. **`C:=35` (T2)**: Kalkulasi lokal T2.
    
8. **`W2(C)`**: T2 menulis ke workspace-nya. `Workspace(T2) = {C=35}`. (Nilai di database masih C=0).
    
9. **`R1(C)`**: T1 membaca `C=0` dari snapshot-nya (tidak terpengaruh oleh T2 atau T3).
    
10. **`commit T1`**:
    
    - **Validasi:** `WS(T1) = {}` (Read-Only). Transaksi Read-Only selalu lolos validasi.
        
    - **Status: COMMIT SUKSES.**
        
11. **`R2(D)`**: T2 membaca `D=30` dari snapshot-nya.
    
12. **`B:=B-0.1*C` (T3)**: Kalkulasi lokal T3. Menggunakan `B` dari snapshot (`20`) dan `C` dari _workspace_-nya sendiri (`50`).
    
    - `B = 20 - (0.1 * 50) = 20 - 5 = 15`.
        
13. **`W3(B)`**: T3 menulis ke workspace-nya. `Workspace(T3) = {C=50, B=15}`.
    
14. **`commit T3`**:
    
    - **Validasi:** `WS(T3) = {B, C}`.
        
    - Sistem mengecek: Apakah ada transaksi lain yang sudah _commit_ sejak `Start(T3)` (langkah 3)?
        
    - Ya, `T1` sudah _commit_ (di langkah 10).
        
    - Cek konflik: `WS(T3) ∩ WS(T1)`? -> `{B, C} ∩ {} = ∅`.
        
    - Tidak ada konflik dengan `T1`.
        
    - **Status: COMMIT SUKSES.**
        
    - Workspace T3 ditulis permanen ke database.
        
    - **Nilai Database Sekarang:** `A=10`, **`B=15`**, **`C=50`**, `D=30`.
        
15. **`D:=0.2*D+A` (T2)**: Kalkulasi lokal T2. Menggunakan `D` dan `A` dari snapshot-nya.
    
    - `D = (0.2 * 30) + 10 = 6 + 10 = 16`.
        
16. **`W2(D)`**: T2 menulis ke workspace-nya. `Workspace(T2) = {C=35, D=16}`.
    
17. **`commit T2`**:
    
    - **Validasi:** `WS(T2) = {C, D}`.
        
    - Sistem mengecek: Apakah ada transaksi lain yang sudah _commit_ sejak `Start(T2)` (langkah 2)?
        
    - Ya, `T1` (commit di 10) dan `T3` (commit di 14).
        
    - **Cek vs T1:** `WS(T2) ∩ WS(T1)`? -> `{C, D} ∩ {} = ∅`. (Aman).
        
    - **Cek vs T3:** `WS(T2) ∩ WS(T3)`? -> `{C, D} ∩ {B, C} = {C}`.
        
    - **KONFLIK DITEMUKAN PADA ITEM C!**
        
    - `T3` sudah _commit_ (menang) pada langkah 14. Berdasarkan aturan _first-committer wins_, `T2` (yang mencoba _commit_ belakangan) harus kalah.
        
    - **Status: ABORT (GAGAL).**
        
    - **Rollback:** Workspace T2 (`{C=35, D=16}`) dibuang. Perubahannya tidak pernah diterapkan ke database.
        

---

### 3. Kesimpulan Transaksi

- **T1 (Read-Only):** Berhasil **COMMIT**. Selalu lolos validasi.
    
- **T3 (Update):** Berhasil **COMMIT**. Ini adalah _first committer_ untuk item `B` dan `C`. Nilai dari T3 (`B=15`, `C=50`) berhasil ditulis ke database.
    
- **T2 (Update):** **ABORT**. Transaksi ini gagal validasi karena `WS(T2)` berkonflik dengan `WS(T3)` pada item `C`. Karena T3 sudah _commit_ lebih dulu, T2 harus dibatalkan.
    

---

### Nilai Data Final

Nilai data akhir adalah nilai awal yang ditimpa oleh satu-satunya transaksi update yang berhasil _commit_ (T3).

- **A:** 10 (Tidak berubah)
    
- **B:** 15 (Ditulis oleh T3)
    
- **C:** 50 (Ditulis oleh T3)
    
- **D:** 30 (Tulisan T2 di-abort, jadi kembali ke nilai awal)