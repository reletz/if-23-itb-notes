---
cssclasses: dashboard
---
_Back to_ [[IF3140 Sistem Basis Data]]

Materi: Operasi Dasar PSQL

 ## Perintah Bantuan psql (Meta-Commands)
- `\l`
	- Menampilkan daftar semua database yang ada di server.
- `\dt`
	- Menampilkan daftar semua tabel (_tables_) yang ada di dalam database yang sedang aktif.
- `\d nama_tabel`
	- Memberikan deskripsi detail dari sebuah tabel (kolom, tipe data, index, foreign key). Sangat berguna untuk "mengintip" struktur tabel.
- `\timing`
		- Perintah _toggle_ (on/off) untuk menampilkan waktu eksekusi aktual (dalam milidetik) dari setiap query yang dijalankan.
        

 ## Analisis & Optimasi Query
- `EXPLAIN [QUERY];`
	- Menampilkan **rencana eksekusi (query plan)** tanpa benar-benar menjalankan query. Berguna untuk mendiagnosis performa dan melihat bagaimana database akan bekerja (misal: `Seq Scan` vs `Index Scan`).
- `CREATE INDEX nama_index ON nama_tabel (nama_kolom);`
	- Membuat sebuah **indeks** pada kolom tertentu untuk mempercepat operasi pencarian (`SELECT` dengan `WHERE`).
        

## Manipulasi Data (DML)
- `SELECT kolom1, kolom2 FROM nama_tabel WHERE kondisi ORDER BY kolom DESC;`
	- Perintah dasar untuk mengambil data dengan filter dan mengurutkannya.
- `INSERT INTO nama_tabel (kolom1, kolom2) VALUES (nilai1, nilai2);`
	- Menambahkan satu baris data baru ke dalam tabel.
- `UPDATE nama_tabel SET kolom1 = nilai_baru WHERE kondisi;`
	- Memperbarui nilai pada baris yang sudah ada yang cocok dengan `kondisi`.
- `UPDATE tabel_target SET kolom = nilai FROM tabel_sumber WHERE tabel_target.id = tabel_sumber.id;`
	- Sintaks khusus PostgreSQL untuk melakukan `UPDATE` pada `tabel_target` berdasarkan data dari `tabel_sumber` (bisa tabel lain atau CTE). Kondisi join ditulis di dalam klausa `WHERE`.
- `DELETE FROM nama_tabel WHERE kondisi;`
	- Menghapus baris dari tabel yang cocok dengan `kondisi`. **PERHATIAN:** Tanpa `WHERE` akan menghapus **seluruh isi tabel**.
        

## Definisi Data (DDL)
- `CREATE TABLE nama_tabel (kolom1 TIPE_DATA, kolom2 TIPE_DATA, PRIMARY KEY (kolom1), FOREIGN KEY (kolom_lain) REFERENCES tabel_lain(kolom_pk));`
	- Membuat sebuah tabel baru lengkap dengan definisi kolom, Primary Key, dan Foreign Key.
- `CREATE VIEW nama_view AS [SELECT QUERY];`    
	- Membuat sebuah **view** (tabel virtual) berdasarkan hasil dari sebuah query `SELECT`. View ini bisa di-query seperti tabel biasa.
        

 ## Query Lanjutan (Advanced Querying)
- `JOIN ... ON ...`
	- Menggabungkan baris dari dua atau lebih tabel berdasarkan kolom yang berhubungan. Contoh: `_film JOIN _reservasi ON _film.idfilm = _reservasi.idfilm`.
- `GROUP BY kolom`
	- Mengelompokkan baris-baris yang memiliki nilai yang sama pada `kolom` tertentu menjadi satu baris ringkasan. Biasanya digunakan bersama fungsi agregat.
- `COUNT()`, `AVG()`, `SUM()`, `MAX()`, `MIN()`
	- Fungsi agregat yang digunakan bersama `GROUP BY` untuk melakukan kalkulasi pada setiap grup.
- `HAVING kondisi_agregat`
	- Memfilter hasil yang **sudah dikelompokkan** oleh `GROUP BY`. `HAVING` bekerja pada hasil agregasi (misal: `HAVING COUNT(*) > 100`).
- `WITH nama_cte AS ( ... )`
	- Membuat _Common Table Expression_ (CTE) atau tabel sementara yang hanya ada selama query berjalan.

## Functions & Triggers (PL/pgSQL)
- `CREATE FUNCTION nama_fungsi() RETURNS TRIGGER AS $$ BEGIN ... END; $$ LANGUAGE plpgsql;`
	- Membuat sebuah **fungsi** dalam bahasa prosedural PL/pgSQL. Fungsi ini biasanya berisi logika (IF/ELSE, kalkulasi, dll.) dan sering digunakan untuk dieksekusi oleh Trigger.
- `CREATE TRIGGER nama_trigger [BEFORE | AFTER] [INSERT | UPDATE | DELETE] ON nama_tabel FOR EACH ROW EXECUTE FUNCTION nama_fungsi();`
	- Membuat sebuah **trigger** yang akan secara otomatis menjalankan `nama_fungsi` setiap kali ada event (misal: `BEFORE INSERT`) terjadi pada `nama_tabel`.

## Contoh Penggunaan Query Kompleks

Berikut adalah beberapa contoh query kompleks yang menggabungkan konsep-konsep di atas, berdasarkan database bioskop.

### 1. Mencari Genre Paling Laris di Atas Rata-rata

Query ini menggunakan CTE untuk pertama-tama menghitung jumlah penonton per genre, lalu memfilter genre yang jumlah penontonnya di atas rata-rata dari semua genre.

```sql
CREATE VIEW above_avg_genre_penayangan AS
WITH GenrePenayangan AS (
  -- Langkah 1: Hitung jumlah reservasi (penonton) untuk setiap genre
  SELECT
    fhg.genre,
    COUNT(r.idreservasi) AS jumlah_penayangan
  FROM _reservasi AS r
  JOIN _film_has_genre AS fhg ON r.idfilm = fhg.idfilm
  GROUP BY fhg.genre
)
-- Langkah 2: Pilih dari hasil hitungan yang nilainya > rata-rata semua genre
SELECT
  gp.genre AS nama_genre,
  gp.jumlah_penayangan AS "jumlah penayangan"
FROM GenrePenayangan AS gp
WHERE
  gp.jumlah_penayangan > (SELECT AVG(jumlah_penayangan) FROM GenrePenayangan);

-- Menampilkan hasilnya
SELECT * FROM above_avg_genre_penayangan;
```

### 2. Update Rating Film Populer dengan Rating Rendah

Query ini menggunakan CTE di dalam perintah `UPDATE` untuk mengubah rating film yang memiliki lebih dari 500 penonton tetapi ratingnya masih di bawah 6.00.

```sql
-- Menggunakan CTE dengan sintaks UPDATE ... FROM
WITH filmview AS (
  SELECT idfilm
  FROM _reservasi
  GROUP BY idfilm
  HAVING COUNT(*) > 500
)
UPDATE _film
SET imdbrating = 6.00
FROM filmview
WHERE
  _film.imdbrating < 6.00 AND _film.idfilm = filmview.idfilm;

-- Verifikasi (query ini seharusnya tidak menghasilkan apa-apa)
SELECT f.idfilm, f.namafilm, f.imdbrating
FROM _film f JOIN filmview fv ON f.idfilm = fv.idfilm
WHERE f.imdbrating < 6.00;
```

### 3. Menambahkan Reservasi untuk Dua Orang dalam Satu Query

Query ini menggunakan beberapa CTE untuk mengumpulkan semua informasi yang dibutuhkan (film, penonton, ID pembayaran baru) lalu menggunakan `UNION ALL` di dalam `INSERT` untuk menambahkan dua tiket sekaligus.

```sql
WITH
  TargetPenayangan AS (
    SELECT idpenayangan, idfilm, waktumulai
    FROM _penayangan p JOIN _film f ON p.idfilm = f.idfilm
    WHERE f.imdbrating >= 7.0 AND p.waktumulai::date = '2011-01-01'
    LIMIT 1
  ),
  IDPembayaranBaru AS (
    SELECT MAX(idpembayaran) + 1 AS id FROM _reservasi
  ),
  Penonton AS (
    SELECT idpenonton FROM _penonton LIMIT 2
  )
INSERT INTO _reservasi (idpenayangan, idfilm, waktumulai, idkursi, idpembayaran, idpenonton)
SELECT
  tp.idpenayangan, tp.idfilm, tp.waktumulai, 'A1', idpb.id, (SELECT idpenonton FROM Penonton LIMIT 1 OFFSET 0)
FROM TargetPenayangan tp, IDPembayaranBaru idpb
UNION ALL
SELECT
  tp.idpenayangan, tp.idfilm, tp.waktumulai, 'A2', idpb.id, (SELECT idpenonton FROM Penonton LIMIT 1 OFFSET 1)
FROM TargetPenayangan tp, IDPembayaranBaru idpb;
```

### 4. Membuat Trigger untuk Mengisi Waktu Reservasi Otomatis

Contoh ini membuat sebuah fungsi yang akan mencari waktu tayang film dan mengisinya secara otomatis saat reservasi baru dibuat, lalu membuat trigger untuk mengeksekusi fungsi tersebut.

```sql
-- Langkah 1: Buat Function untuk mengambil waktu tayang
CREATE FUNCTION waktumulai_otomatis()
RETURNS TRIGGER AS $$
BEGIN
    -- Cek jika waktu mulai belum diisi saat INSERT
    IF NEW.waktumulai IS NULL THEN
        -- Cari waktu mulai dari tabel penayangan dan masukkan ke baris baru
        -- Asumsi 1 film hanya tayang di 1 studio pada satu waktu
        SELECT p.waktumulai
        INTO NEW.waktumulai
        FROM _penayangan p
        WHERE p.idfilm = NEW.idfilm AND p.idstudio = NEW.idstudio
        LIMIT 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Langkah 2: Buat Trigger yang akan menjalankan fungsi di atas
CREATE TRIGGER set_waktumulai_otomatis
BEFORE INSERT ON _reservasi
FOR EACH ROW
EXECUTE FUNCTION waktumulai_otomatis();

-- Testing (waktumulai akan terisi otomatis)
INSERT INTO _reservasi (idfilm, idstudio, idkursi, idpenonton)
VALUES (28, 0, 'A1', 14110);
```