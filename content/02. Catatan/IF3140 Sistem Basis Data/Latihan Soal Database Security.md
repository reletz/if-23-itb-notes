_Back to_ [[IF3140 Sistem Basis Data]]

PG-nya udah bener semua (8/11)

![[Pasted image 20251009154955.png]]
![[Pasted image 20251009155018.png]]
![[Pasted image 20251009155106.png]]
![[Pasted image 20251009155124.png]]
![[Pasted image 20251009155417.png]]
![[Pasted image 20251009155701.png]]
![[Pasted image 20251009160231.png]]
![[Pasted image 20251009160210.png]]

Pertimbangan yang diberikan adalah sebagai berikut:
1. Untuk Devan, Jimmy, dan Program SIP, dibuatkan View spesifik untuk menerapkan **Principle of Least Privilege**. Mereka hanya berinteraksi dengan view ini, bukan tabel asli.
2. Devan hanya diberikan hak `SELECT` dan `UPDATE` pada view-nya, sesuai fungsinya sebagai manajer untuk memantau dan memperbarui data performa timnya.
3. Jimmy diberikan hak `SELECT`, `INSERT`, `UPDATE` pada view-nya untuk tugas manajemen data kepegawaian di wilayahnya. Kebutuhan untuk melihat daftar Jabatan/Departemen akan ditangani oleh aplikasi, bukan dengan memberikan akses langsung ke tabel master.
4. Karin sebagai Direktur hanya memerlukan akses `Read` untuk monitoring dan tidak diberi hak untuk mengubah data. Ia juga diberikan akses pada view SIP yang sudah menyajikan data lengkap.
5. Program SIP hanya bertindak sebagai penampil data melalui view `INFORMASI_SIP` dan tidak memiliki akses ke tabel asli sama sekali

View Query:
```sql
-- Devan
CREATE VIEW PEGAWAI_DEVAN AS
SELECT *
FROM Pegawai
WHERE IDPegawai IN (101, 102, 103, 104, 105)
OR IDManajer = 120;

GRANT SELECT, UPDATE ON PEGAWAI_DEVAN TO User_Devan;

-- Jimmy
CREATE VIEW PEGAWAI_JABAR AS
SELECT P.*
FROM Pegawai P
JOIN Jabatan J ON P.IDJabatan = J.IDJabatan
JOIN Departemen D ON J.IDDepartemen = D.IDDepartemen
JOIN Lokasi L ON D.IDLokasi = L.IDLokasi
WHERE L.Provinsi = 'Jawa Barat';

GRANT SELECT, INSERT, UPDATE ON PEGAWAI_JABAR TO User_Jimmy;

-- SIP (Diberi ke SIP dan Karin)
CREATE VIEW INFORMASI_SIP AS
SELECT
    p.IDPegawai,
    p.Nama AS NamaPegawai,
    j.NamaJabatan,
    d.NamaDepartemen,
    l.Kota,
    l.Provinsi,
    m.Nama AS NamaManajer
FROM
    Pegawai p
LEFT JOIN Jabatan j ON p.IDJabatan = j.IDJabatan
LEFT JOIN Departemen d ON j.IDDepartemen = d.IDDepartemen
LEFT JOIN Lokasi l ON d.IDLokasi = l.IDLokasi
LEFT JOIN Pegawai m ON p.IDManajer = m.IDPegawai;

GRANT SELECT ON INFORMASI_SIP TO Program_SIP;
GRANT SELECT ON INFORMASI_SIP TO User_Karin;
```

**Model Kontrol Akses DAC:**

|Subject / Object|Relasi Pegawai|Relasi Departemen|Relasi Lokasi|Relasi Jabatan|View PEGAWAI_DEVAN|View PEGAWAI_JABAR|View INFORMASI_SIP|
|---|---|---|---|---|---|---|---|
|**User Devan**|-|-|-|-|Read, Update (`SELECT`, `UPDATE`)|-|-|
|**User Jimmy**|-|-|-|-|-|Read, Insert, Update (`SELECT`, `INSERT`, `UPDATE`)|-|
|**User Karin**|Read (`SELECT`)|Read (`SELECT`)|Read (`SELECT`)|Read (`SELECT`)|-|-|Read (`SELECT`)|
|**Program SIP**|-|-|-|-|-|-|Read (`SELECT`)|

![[Pasted image 20251009200700.png]]

a. Harry sebagai S, berdasarkan Simple Security Property, akan melihat (Read) seluruh data dalam Tabel Karyawan (karena tidak ada role yang lebih tinggi isi datanya daripada S)
Gambaran data:

|IDKaryawan|Nama|TanggalLahir|NilaiKinerja|
|---|---|---|---|
|1234567891|Jonathan Christie|15 September 1997|Sangat Baik|
|1235674120|Anthony Sinisuka|20 Oktober 1996|Baik|
b. Edward sebagai U, berdasarkan Simple Security Property, hanya akan melihat (Read) atribut `Nama` dengan isi `Jonathan Christie`

|Nama|
|---|
|Jonathan Christie|
c. Tidak bisa, berdasarkan Star Property, Harry hanya diperbolehkan menulis dengan tingkatan yang setara atau lebih tinggi, yakni ke S atau TS.

![[Pasted image 20251009203005.png]]
1. 
   ```sql
   GRANT SELECT ON Instruktur, Pelajaran, Pengajaran TO User_A;
   ```

2. 
   ```sql
   CREATE ROLE head_instructor;
   
   GRANT INSERT, UPDATE, DELETE ON Instruktur TO head_instructor WITH GRANT OPTION;
   
   GRANT ROLE head_instructor TO User_B;
   GRANT ROLE head_instructor TO User_C;
   ```

3. 
   ```sql
   CREATE VIEW Pengajaran_Instruktur_12345_2014 AS (
	   SELECT *
	   FROM Pengajaran
	   WHERE IDInstruktur = 12345 AND Tahun = 2014
	 );
	 GRANT SELECT ON Pengajaran_Instruktur_12345_2014 TO User_D;
	   ```

4. 
   ```sql
   REVOKE SELECT ON Pengajaran FROM User_A
   ```

5. 
   ```sql
   REVOKE INSERT, UPDATE, DELETE ON Instruktur FROM User_B CASCADE;
   ```