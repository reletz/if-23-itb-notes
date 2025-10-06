---
cssclasses: dashboard
---
_Back to_ [[IF3140 Sistem Basis Data]]

Materi:
1. Operasi DML PostgreSQL sederhana-kompleks  
2. Menentukan metode performance tuning yang sesuai berdasarkan frequent query pada business rule yang diberikan.
3. Implementasi performance tuning pada PostgreSQL yang meliputi vertical splitting, horizontal splitting, denormalisasi, dan indexing.
4. Interpretasi performance query melalui EXPLAIN dan /timing

## Operasi DML PostgreSQL sederhana-kompleks

- `SELECT ... FROM ... WHERE ...;`
    
    - Mengambil data. Contoh: `SELECT title, release_year FROM film WHERE rating = 'PG-13';`
        
- `INSERT INTO ... VALUES ...;`
    
    - Menambahkan data baru. Contoh: `INSERT INTO actor (first_name, last_name) VALUES ('KEANU', 'REEVES');`
        
- `UPDATE ... SET ... WHERE ...;`
    
    - Mengubah data yang sudah ada. Contoh: `UPDATE film SET rental_rate = 4.99 WHERE film_id = 10;`
        
- `DELETE FROM ... WHERE ...;`
    
    - Menghapus data. Contoh: `DELETE FROM actor WHERE actor_id = 201;`
        
- `SELECT ... JOIN ... ON ...;`
    
    - Mengambil data dengan menggabungkan beberapa tabel.
        
- `WITH ... AS (...) SELECT ...;`
    
    - _Common Table Expression_ (CTE) untuk menyederhanakan dan merapikan query yang kompleks.
        

## Interpretasi performance query melalui EXPLAIN dan /timing

- `\timing`
    
    - Meta-command di `psql` untuk menyalakan/mematikan penampil waktu eksekusi aktual dari sebuah query. Memberikan durasi nyata dalam milidetik.
        
- `EXPLAIN [QUERY];`
    
    - Menampilkan **rencana eksekusi** query tanpa menjalankannya. Berguna untuk menganalisis bagaimana database akan bekerja.
        
    - **`Seq Scan`**: Pertanda bahwa database membaca seluruh tabel. Ini bisa menjadi sangat lambat jika tabel besar dan ada filter `WHERE`.
        
    - **`Index Scan`**: Pertanda bahwa database menggunakan indeks untuk mencari data secara langsung. Jauh lebih cepat dan efisien.
        
    - **`cost`**: Estimasi "beban kerja" dari query. Angka yang lebih kecil umumnya menandakan query yang lebih efisien.
        

## Menentukan metode performance tuning yang sesuai berdasarkan frequent query pada business rule yang diberikan

- **Indexing**
    
    - **Kapan digunakan?** Saat _business rule_ mengharuskan adanya query yang sering mencari data berdasarkan kolom yang sama (misal: mencari film berdasarkan judul, mencari pelanggan berdasarkan email). `EXPLAIN` menunjukkan `Seq Scan` pada query tersebut.
        
- **Denormalisasi**
    
    - **Kapan digunakan?** Saat _business rule_ mengharuskan adanya query yang sangat sering menampilkan data gabungan, dan query tersebut harus melakukan `JOIN` ke banyak tabel hanya untuk mengambil 1-2 kolom. Ini mempercepat `SELECT` dengan mengorbankan sedikit redudansi data.
        
- **Vertical Splitting**
    
    - **Kapan digunakan?** Saat sebuah tabel memiliki sangat banyak kolom, namun _business rule_ menunjukkan bahwa sebagian besar query hanya mengakses sekelompok kecil kolom (misal: data pribadi pelanggan), sementara kolom lain (misal: data preferensi) jarang diakses.
        
- **Horizontal Splitting (Partitioning)**
    
    - **Kapan digunakan?** Saat _business rule_ berurusan dengan data transaksional yang sangat besar dan terus bertambah (misal: tabel pembayaran, log aktivitas). Query seringkali hanya membutuhkan data dari periode waktu tertentu (misal: laporan bulanan).
        

## Implementasi performance tuning pada PostgreSQL

- **Indexing**
    
    - `CREATE INDEX nama_index ON nama_tabel (nama_kolom);`
        
- **Denormalisasi**
    
    1. `ALTER TABLE nama_tabel ADD COLUMN nama_kolom_baru TIPE_DATA;`
        
    2. `UPDATE nama_tabel SET nama_kolom_baru = ...;` (Untuk mengisi data awal).
        
- **Vertical Splitting**
    
    1. `CREATE TABLE tabel_baru AS SELECT id_pk, kolom_jarang_diakses FROM tabel_lama;`
        
    2. `ALTER TABLE tabel_lama DROP COLUMN kolom_jarang_diakses;`
        
- **Horizontal Splitting (Partitioning)**
    
    ```sql
    -- 1. Buat tabel utama (parent)
    CREATE TABLE payment_partitioned ( ... ) PARTITION BY RANGE (payment_date);
    -- 2. Buat partisi (anak) untuk setiap rentang
    CREATE TABLE payment_y2007_q1 PARTITION OF payment_partitioned
    FOR VALUES FROM ('2007-01-01') TO ('2007-04-01');
    ```
    

## Contoh Skenario & Implementasi

### Skenario 1: Pencarian Film Lambat (Indexing)

**Business Rule:** Kasir sering mencari film berdasarkan `title` untuk memeriksa ketersediaannya.
    
- **Analisis:** `EXPLAIN SELECT * FROM film WHERE title = 'ACADEMY DINOSAUR';` akan menunjukkan `Seq Scan`.
    
- **Implementasi:** `CREATE INDEX idx_film_title ON film (title);`
    
- **Verifikasi:** `EXPLAIN` yang sama sekarang akan menunjukkan `Index Scan`.
    

### Skenario 2: Menampilkan Kategori Film Terlalu Banyak Join (Denormalisasi)

**Business Rule:** Halaman detail film selalu menampilkan nama kategori. Query saat ini butuh 2 `JOIN` (`film` -> `film_category` -> `category`).
    
- **Implementasi:**
    ```sql
    ALTER TABLE film ADD COLUMN category_name VARCHAR(25);
    UPDATE film f SET category_name = (SELECT c.name FROM category c JOIN film_category fc ON c.category_id = fc.category_id WHERE fc.film_id = f.film_id);
    ```
        
- **Verifikasi:** Query yang tadinya `SELECT f.title, c.name FROM ...` sekarang menjadi 
	 ```sql
	 SELECT title, category_name FROM film WHERE film_id = 1;
	 ```
    

### Skenario 3: Laporan Pembayaran Bulanan Lambat (Horizontal Splitting)

 **Business Rule:** Manajer membutuhkan laporan pendapatan bulanan. Tabel `payment` sangat besar.
    
- **Implementasi:** Partisi tabel `payment` berdasarkan `payment_date`.
    
    ```sql
    CREATE TABLE payment_partitioned (...) PARTITION BY RANGE (payment_date);
    CREATE TABLE payment_y2007_m02 PARTITION OF payment_partitioned
    FOR VALUES FROM ('2007-02-01') TO ('2007-03-01');
    ```
    
- **Verifikasi:**
    ```sql
    EXPLAIN SELECT SUM(amount) FROM payment WHERE payment_date >= '2007-02-01' AND payment_date < '2007-0301';
    ```
  akan menunjukkan bahwa PostgreSQL hanya memindai partisi `payment_y2007_m02`.