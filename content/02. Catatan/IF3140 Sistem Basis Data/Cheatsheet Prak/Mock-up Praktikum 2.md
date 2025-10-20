_Back to_ [[IF3140 Sistem Basis Data]]

### **Praktikum 2: Query Processing & Optimization Lanjutan pada Database DVD Rental**

**Petunjuk Pengerjaan:**

1. Gunakan database [dvdrental](dvdrental.sql) yang telah disediakan.
    
2. Untuk setiap soal, sertakan query SQL yang Anda gunakan.
    
3. Untuk soal yang berkaitan dengan analisis performa, sertakan hasil dari `EXPLAIN ANALYZE` dan `\timing` sebelum dan sesudah optimasi sebagai bukti perbandingan.
    
4. Jawablah setiap pertanyaan justifikasi secara jelas dan berurutan.
    

### **Soal 1: Analisis Aktor Paling Populer**

**Business Rule:** Manajemen ingin memberikan penghargaan kepada 5 aktor yang paling banyak diminati (berdasarkan jumlah sewa film yang mereka bintangi). Informasi ini akan digunakan untuk kampanye marketing selanjutnya.

**Tugas:**

a. Query Awal (Pendekatan JOIN): Tulis sebuah query untuk menampilkan nama lengkap 5 aktor teratas beserta total jumlah film mereka yang disewa. Urutkan hasilnya dari jumlah sewa terbanyak.

b. Analisis: Jalankan EXPLAIN ANALYZE pada query tersebut. Catat dan amati nilai cost serta execution time-nya.

c. Query Alternatif (Pendekatan WITH Clause): Tulis ulang query untuk mendapatkan hasil yang sama, namun kali ini gunakan WITH Clause (CTE) untuk memecah logikanya. Misalnya, satu CTE untuk menghubungkan film dengan aktor, dan CTE lain untuk menghitung jumlah sewa per film.

d. Perbandingan: Jalankan EXPLAIN ANALYZE pada query alternatif. Bandingkan hasilnya dengan query pada poin (a). Jelaskan pendekatan mana yang lebih unggul dari segi keterbacaan dan performa untuk kasus ini.

### **Soal 2: Film Paling Menguntungkan di Setiap Kategori**

**Business Rule:** Departemen keuangan perlu membuat laporan mengenai film apa saja yang menghasilkan pendapatan tertinggi di setiap kategori. Laporan ini krusial untuk menentukan strategi investasi produksi film ke depan.

**Tugas:**

a. Query Kompleks: Tulis satu query untuk menampilkan nama kategori, judul film, dan total pendapatan (amount dari tabel payment) untuk film yang paling menguntungkan di setiap kategori. (Hint: Anda mungkin memerlukan WINDOW FUNCTION seperti RANK() atau ROW_NUMBER()).

b. Analisis Rencana Eksekusi: Gunakan EXPLAIN (tanpa ANALYZE) pada query Anda. Jelaskan langkah-langkah utama yang akan diambil oleh PostgreSQL untuk mengeksekusi query kompleks ini.

c. Justifikasi: Jelaskan mengapa query untuk menemukan "nilai top-1 per grup" seperti ini seringkali menjadi tantangan dari segi performa.

### **Soal 3: Identifikasi Pelanggan Setia di Negara Teratas**

**Business Rule:** Perusahaan ingin meluncurkan program loyalitas premium untuk pelanggan yang paling banyak menghabiskan uang di 3 negara dengan basis pelanggan terbesar.

**Tugas:**

a. Query dengan Subquery: Tulis sebuah query untuk mengidentifikasi pelanggan dengan total belanja tertinggi di masing-masing dari 3 negara dengan jumlah pelanggan terbanyak. Tampilkan nama negara, nama lengkap pelanggan, dan total belanjanya.

b. Analisis: Catat hasil EXPLAIN ANALYZE dari query tersebut.

c. Refactor dengan WITH Clause: Tulis ulang query yang sama dengan menggunakan serangkaian CTE untuk meningkatkan keterbacaan.

d. Perbandingan & Analisis: Bandingkan hasil EXPLAIN ANALYZE dari kedua pendekatan. Manakah yang lebih dioptimalkan oleh PostgreSQL?

### **Soal 4: Menghapus `JOIN` yang Tidak Perlu**

**Business Rule:** Seorang analis data junior membuat query untuk mendapatkan daftar email semua pelanggan yang berada di kota London.

**Query Awal (Tidak Efisien):**

```sql
SELECT
    c.first_name, c.last_name, c.email, f.title
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN inventory i ON c.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
WHERE ci.city = 'London';
```

**Tugas:**

a. Analisis Awal: Jalankan EXPLAIN ANALYZE pada query di atas dan catat cost serta execution time-nya.

b. Identifikasi Redundansi: Identifikasi JOIN mana yang tidak diperlukan untuk memenuhi permintaan.

c. Optimasi: Tulis ulang query tersebut dengan menghapus semua JOIN dan kolom yang tidak perlu.

d. Verifikasi: Jalankan EXPLAIN ANALYZE pada query yang sudah dioptimalkan dan jelaskan mengapa terjadi peningkatan performa yang signifikan.

### **Soal 5: Studi Kasus Perbandingan Kinerja Query**

**Skenario:** Tiga orang analis data—Ani, Budi, dan Cici—diberi tugas untuk mencari daftar email semua pelanggan di **Kanada** (_Canada_) yang pernah menyewa setidaknya satu film dari kategori **'Music'**. Masing-masing menghasilkan query yang berbeda.

**Query A - Ani (Pendekatan `JOIN` Langsung):**

```sql
SELECT DISTINCT c.email
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film_category fc ON i.film_id = fc.film_id
JOIN category cat ON fc.category_id = cat.category_id
WHERE co.country = 'Canada' AND cat.name = 'Music';
```

**Query B - Budi (Pendekatan `WHERE IN` Subquery):**

```sql
SELECT email FROM customer
WHERE address_id IN (SELECT address_id FROM address WHERE city_id IN
    (SELECT city_id FROM city WHERE country_id =
        (SELECT country_id FROM country WHERE country = 'Canada')))
AND customer_id IN (SELECT customer_id FROM rental WHERE inventory_id IN
    (SELECT inventory_id FROM inventory WHERE film_id IN
        (SELECT film_id FROM film_category WHERE category_id =
            (SELECT category_id FROM category WHERE name = 'Music'))));
```

**Query C - Cici (Pendekatan `WITH` Clause / CTE):**

```sql
WITH canadian_customers AS (
    SELECT c.customer_id, c.email FROM customer c
    JOIN address a ON c.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
    WHERE co.country = 'Canada'
),
music_renters AS (
    SELECT DISTINCT r.customer_id FROM rental r
    JOIN inventory i ON r.inventory_id = i.inventory_id
    JOIN film_category fc ON i.film_id = fc.film_id
    JOIN category cat ON fc.category_id = cat.category_id
    WHERE cat.name = 'Music'
)
SELECT cc.email
FROM canadian_customers cc
JOIN music_renters mr ON cc.customer_id = mr.customer_id;
```

**Tugas:**

a. Analisis Kinerja: Jalankan EXPLAIN ANALYZE untuk ketiga query di atas.

b. Pemeringkatan: Urutkan query dari yang paling baik (tercepat) hingga yang paling buruk (terlambat) berdasarkan execution time dan cost.

c. Justifikasi Teknis: Berikan penjelasan mendalam untuk peringkat yang Anda buat. Mengapa query planner mengeksekusi satu query lebih efisien daripada yang lain? Tunjukkan kelemahan spesifik pada query yang lebih lambat (misalnya: penggunaan DISTINCT setelah JOIN besar, ketergantungan subquery, dll.).

### **Soal 6: Optimasi Laporan dengan Menghindari Correlated Subquery**

**Business Rule:** Diperlukan sebuah laporan yang menampilkan nama setiap staf, total pendapatan yang mereka proses, dan di negara mana mereka bertugas.

**Query Awal (Tidak Efisien):**

```sql
SELECT
    s.first_name, s.last_name,
    (SELECT SUM(p.amount) FROM payment p WHERE p.staff_id = s.staff_id) AS total_revenue,
    (SELECT co.country FROM country co
     JOIN city ci ON co.country_id = ci.country_id
     JOIN address a ON ci.city_id = a.city_id
     WHERE a.address_id = s.address_id) AS country
FROM staff s;
```

**Tugas:**

a. Analisis Awal: Jalankan EXPLAIN ANALYZE pada query di atas dan amati rencana eksekusinya.

b. Identifikasi Masalah: Jelaskan secara konsep mengapa correlated subquery menyebabkan performa yang buruk.

c. Optimasi: Tulis ulang query di atas menjadi satu query yang efisien dengan menggunakan JOIN dan GROUP BY.

d. Verifikasi: Jalankan EXPLAIN ANALYZE pada query yang telah dioptimalkan dan jelaskan mengapa versi JOIN jauh lebih superior.

### **Soal 7: Efisiensi Pencarian Data dengan `EXISTS` vs. `JOIN`**

**Business Rule:** Departemen konten ingin mengetahui daftar semua bahasa (`language`) yang filmnya tersedia untuk disewa.

**Tugas:**

a. Query A (DISTINCT dan JOIN): Tulis query untuk mendapatkan nama bahasa yang unik dengan melakukan JOIN dari tabel language hingga inventory.

b. Query B (WHERE EXISTS): Tulis ulang query yang sama dengan menggunakan klausa WHERE EXISTS.

c. Analisis & Justifikasi: Jalankan EXPLAIN ANALYZE untuk kedua query. Jelaskan mengapa WHERE EXISTS seringkali lebih cepat dalam kasus seperti ini, di mana kita hanya perlu memeriksa keberadaan data.

### **Soal 8: Analisis dan Perbaikan Query Laporan yang Kompleks**

**Skenario:** Seorang intern membuat query untuk laporan penting: "Menampilkan 10 film teratas yang paling sering disewa oleh pelanggan dari kota 'Aurora'". Query yang dibuatnya sangat lambat.

**Query Awal (Tidak Optimal):**

```sql
SELECT DISTINCT f.title, COUNT(r.rental_id) AS rental_count
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.customer_id IN (
    SELECT c2.customer_id
    FROM customer c2
    JOIN address a ON c2.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    WHERE ci.city = 'Aurora'
)
GROUP BY f.title
ORDER BY rental_count DESC
LIMIT 10;
```

**Tugas:**

a. **Analisis Masalah:** Jalankan `EXPLAIN ANALYZE` pada query di atas. Identifikasi setidaknya **dua** masalah utama yang menyebabkan query ini tidak efisien (misalnya: penggunaan subquery yang bisa diganti `JOIN`, `JOIN` yang tidak perlu, atau `DISTINCT` yang berlebihan). 

b. **Rencana Perbaikan:** Untuk setiap masalah yang Anda identifikasi, jelaskan secara spesifik bagaimana Anda akan memperbaikinya. 

c. **Implementasi Query Optimal:** Tulis ulang query tersebut menjadi satu versi yang jauh lebih efisien dan bersih, dengan menerapkan perbaikan yang telah Anda rencanakan. 

d. **Verifikasi Peningkatan:** Jalankan `EXPLAIN ANALYZE` pada query baru Anda. Bandingkan `cost` dan `execution time`-nya dengan query awal dan buktikan bahwa perbaikan Anda berhasil secara signifikan.