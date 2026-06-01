---
cssclasses: dashboard
---

_Back to_ [[IF3140 Sistem Basis Data]]

Materi: Query Processing and Optimization

## Analisis Kinerja Query

- `EXPLAIN [QUERY];`
    
    - Menampilkan **rencana eksekusi (query plan)** dari sebuah query tanpa menjalankannya. Berguna untuk melihat estimasi `cost` dan langkah-langkah yang akan diambil oleh database (misalnya `Seq Scan`, `Hash Join`).
        
- `EXPLAIN ANALYZE [QUERY];`
    
    - Menjalankan query dan menampilkan rencana eksekusi beserta **waktu eksekusi aktual** (`actual time`) dan statistik lainnya. Ini adalah alat utama untuk mengukur dan membandingkan performa query secara nyata.
        
- `\timing`
    
    - Meta-command di `psql` yang berfungsi sebagai _toggle_ (on/off) untuk menampilkan total waktu eksekusi (`Planning Time` + `Execution Time`) setiap kali query dijalankan.
        

## Strategi Umum Penulisan Query

Terdapat beberapa pendekatan untuk menulis query yang kompleks, masing-masing dengan kelebihan dan kekurangannya.

### 1. Standard `INNER JOIN`

Pendekatan paling umum dan seringkali mudah dibaca untuk menggabungkan data dari beberapa tabel.

- **Kelebihan:**
    
    - Sintaks yang lugas dan standar.
        
    - Seringkali sangat efisien jika kolom yang di-`JOIN` memiliki indeks.
        
- **Kekurangan:**
    
    - Bisa menjadi sangat panjang dan sulit dibaca jika melibatkan banyak tabel.
        

```sql
-- Mencari pesawat yang terbang ke PRANCIS
SELECT
    a.airplane_id,
    COUNT(f.to) AS total_ke_perancis
FROM
    airplane a
    INNER JOIN flight f ON f.airplane_id = a.airplane_id
    INNER JOIN airport ap ON ap.airport_id = f.to
    INNER JOIN airport_geo ag ON ap.airport_id = ag.airport_id
WHERE
    ag.country = 'FRANCE'
GROUP BY
    a.airplane_id
HAVING
    COUNT(a.airplane_id) > 5;
```

### 2. `WITH` Clause (Common Table Expression - CTE)

Memungkinkan Anda untuk membuat tabel sementara yang logis dalam sebuah query. Sangat baik untuk memecah masalah yang kompleks menjadi beberapa langkah yang lebih sederhana.

- **Kelebihan:**
    
    - **Modularitas & Keterbacaan:** Membuat query utama lebih bersih dan mudah dipahami.
        
    - **Filter Awal:** Memungkinkan filtering atau agregasi data di awal, sehingga `JOIN` pada query utama memproses lebih sedikit baris.
        
- **Kekurangan:**
    
    - Terkadang dapat menimbulkan _overhead_ atau _performance penalty_ jika optimizer database tidak menanganinya dengan efisien.
        

```sql
-- Menggunakan CTE untuk menyeleksi bandara di PRANCIS terlebih dahulu
WITH france_airports AS (
    SELECT ap.airport_id
    FROM airport ap
    INNER JOIN airport_geo ag ON ap.airport_id = ag.airport_id
    WHERE ag.country = 'FRANCE'
)
SELECT
    a.airplane_id,
    COUNT(f.to) AS total_ke_perancis
FROM
    airplane a
    INNER JOIN flight f ON f.airplane_id = a.airplane_id
    INNER JOIN france_airports fa ON f.to = fa.airport_id
GROUP BY
    a.airplane_id
HAVING
    COUNT(a.airplane_id) > 5;
```

### 3. Subquery dalam `WHERE` Clause

Menggunakan `SELECT` di dalam klausa `WHERE` (misalnya dengan `IN`, `EXISTS`).

- **Kelebihan:**
    
    - Dapat mengurangi jumlah `JOIN` eksplisit pada query utama.
        
- **Kekurangan:**
    
    - **Potensi Inefisiensi:** Subquery dapat dieksekusi berulang kali untuk setiap baris dari tabel luar, terutama jika tidak dioptimalkan dengan baik. Umumnya ini adalah pendekatan yang paling tidak efisien untuk dataset besar.
        

```sql
-- Menggunakan Subquery pada klausa WHERE
SELECT
    a.airplane_id,
    COUNT(f.to) AS total_ke_perancis
FROM
    airplane a
    INNER JOIN flight f ON f.airplane_id = a.airplane_id
WHERE
    f.to IN (
        SELECT ap.airport_id
        FROM airport ap
        INNER JOIN airport_geo ag ON ap.airport_id = ag.airport_id
        WHERE ag.country = 'FRANCE'
    )
GROUP BY
    a.airplane_id
HAVING
    COUNT(a.airplane_id) > 5;
```

## Teknik Optimasi Query

Berdasarkan analisis `EXPLAIN ANALYZE`, berikut adalah beberapa cara untuk menyederhanakan dan mempercepat query:

- **Hapus `JOIN` yang Tidak Perlu:** Jika sebuah tabel di-`JOIN` tetapi tidak ada kolomnya yang digunakan di `SELECT`, `WHERE`, atau `JOIN` lainnya, maka `JOIN` tersebut kemungkinan besar tidak diperlukan.
    
- **Ganti Subquery Kompleks dengan `JOIN`:** Seringkali, mengubah query yang menggunakan `WHERE ... IN (SELECT ...)` menjadi `INNER JOIN` langsung akan memberikan performa yang lebih baik karena query planner dapat membuat rencana eksekusi yang lebih optimal.
    
- **Filter Data Sedini Mungkin:** Lakukan penyaringan data menggunakan `WHERE` secepat mungkin dalam proses. Menggunakan CTE untuk memfilter data sebelum melakukan `JOIN` besar adalah salah satu contohnya.
    
- **Hindari `DISTINCT` yang Redundan:** `DISTINCT` memerlukan operasi sorting atau hashing yang memakan biaya. Jika logika query (misalnya `GROUP BY` pada Primary Key) sudah menjamin keunikan baris, `DISTINCT` tidak diperlukan.
    
- **Ganti `LIKE '%...%'` dengan `=` atau `LIKE '...%'`:** Jika memungkinkan, hindari penggunaan wildcard (`%`) di awal string karena ini mencegah penggunaan indeks pada kolom tersebut dan memaksa `Seq Scan`.
    

### Contoh Skenario: Penyederhanaan Query

**Kasus:** Mendapatkan data pesawat (ID, tipe, nama maskapai) yang berbasis di Perancis.

**Query Awal (Tidak Efisien):** Menggunakan dua subquery (CTE dan `WHERE IN`).

```sql
WITH airplane_types AS (
    SELECT DISTINCT
        ap.airplane_id, at.identifier, a.airlinename, a.base_airport
    FROM airplane ap
    JOIN airplane_type at ON ap.type_id = at.type_id
    JOIN airline a ON a.airline_id = ap.airline_id
)
SELECT ats.airplane_id, ats.identifier, ats.airlinename
FROM airplane_types ats
WHERE ats.base_airport IN (
    -- Subquery kedua untuk mendapatkan bandara di Prancis
    SELECT base_airport FROM airline ar JOIN airport_geo ag ON ar.base_airport = ag.airport_id WHERE country = 'FRANCE'
)
ORDER BY ats.airplane_id;
```

**Query Perbaikan (Lebih Optimal):** Menggabungkan semua logika menjadi satu query dengan `INNER JOIN`.

```sql
SELECT
    ap.airplane_id,
    at.identifier,
    a.airlinename
FROM
    airplane ap
    INNER JOIN airplane_type at ON ap.type_id = at.type_id
    INNER JOIN airline a ON a.airline_id = ap.airline_id
    INNER JOIN airport_geo ag ON a.base_airport = ag.airport_id -- Langsung JOIN ke sumber data
WHERE
    ag.country = 'FRANCE' -- Filter langsung
ORDER BY
    ap.airplane_id;
```

**Justifikasi:** Query perbaikan jauh lebih sederhana dan efisien karena:

1. Menghilangkan `WITH` dan subquery, mengurangi kompleksitas dan _overhead_.
    
2. Melakukan semua `JOIN` yang diperlukan dalam satu lingkup, memungkinkan optimizer untuk menemukan jalur eksekusi terbaik.
    
3. Menghapus `DISTINCT` yang tidak diperlukan.
    
4. Hasilnya, `cost` lebih rendah dan `execution time` lebih cepat.