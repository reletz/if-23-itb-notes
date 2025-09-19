---

type: Note

cssclasses:

- cornell-notes
    

---
_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Bagaimana cara kerja operasi Agregasi?
> >     
> > - Metode implementasi Agregasi?
> >     
> > - Optimasi pada Agregasi?
> >     
> > - Bagaimana menangani `AVG`?
> >     
> > - Bagaimana implementasi operasi Set (Union, Intersection, Difference)?
> >     
> > - Cara kerja Set Operations menggunakan Hashing?
> >     
> > - Apa itu Outer Join?
> >     
> > - Bagaimana memodifikasi Merge Join untuk Outer Join?
> >     
> > - Bagaimana memodifikasi Hash Join untuk Outer Join?
> >     
> >
> > ## Reference Points
> >
> > - Slides 45, 55-59
> >     
> 
> > ### Operasi Agregasi
> >
> > Agregasi (`SUM`, `COUNT`, `MIN`, `MAX`, `AVG`) digunakan untuk menghitung nilai tunggal dari sekelompok tuple. Implementasinya sangat mirip dengan proses eliminasi duplikat.
> >
> > #### Metode Implementasi
> >
> > 1. **Sorting:** Urutkan tuple berdasarkan atribut `GROUP BY`. Setelah diurutkan, semua tuple dalam grup yang sama akan berada berdekatan. Fungsi agregat kemudian dapat diterapkan pada setiap grup secara berurutan.
> >     
> > 2. **Hashing:** Gunakan fungsi hash pada atribut `GROUP BY` untuk menempatkan tuple-tuple dari grup yang sama ke dalam _bucket_ yang sama. Setelah semua tuple terdistribusi, fungsi agregat diterapkan pada setiap _bucket_.
> >     
> >
> > #### Optimasi
> >
> > Proses agregasi dapat dioptimalkan dengan melakukan **agregasi parsial** pada tahap awal.
> >
> > - **Saat External Sort-Merge:**
> >     
> >     - **Selama pembuatan run:** Saat blok data dibaca ke memori untuk diurutkan, tuple dalam grup yang sama dapat langsung digabungkan dengan menghitung nilai agregat parsialnya.
> >         
> >     - **Selama proses merge:** Ketika beberapa _run_ digabungkan, nilai agregat parsial dari grup yang sama juga dapat digabungkan.
> >         
> > - **Contoh:**
> >     
> >     - **Untuk `COUNT`:** Jumlahkan nilai-nilai `COUNT` parsial.
> >         
> >     - **Untuk `SUM`, `MIN`, `MAX`:** Lakukan operasi yang sesuai pada nilai-nilai parsial.
> >         
> >     - **Untuk `AVG`:** Perlu menyimpan dua nilai parsial: `SUM` dan `COUNT`. Nilai akhir dihitung dengan membagi `SUM` total dengan `COUNT` total.
> >         
> >
> > ### Operasi Set (`UNION`, `INTERSECTION`, `EXCEPT`/`MINUS`)
> >
> > Operasi set juga dapat diimplementasikan menggunakan variasi dari algoritma sorting atau hashing.
> >
> > #### Implementasi Menggunakan Hashing
> >
> > 1. **Partisi:** Partisi kedua relasi (`r` dan `s`) menggunakan fungsi hash yang sama pada semua atributnya. Setiap tuple dari `r` akan masuk ke partisi `$r_i$` dan setiap tuple dari `s` akan masuk ke partisi `$s_i$`.
> >     
> > 2. Proses per Partisi: Untuk setiap pasang partisi ($r_i$, $s_i$), lakukan langkah berikut:
> >     
> >     a. Bangun hash index di memori untuk partisi yang lebih kecil (misalnya $r_i$) menggunakan fungsi hash yang berbeda.
> >     
> >     b. Pindai partisi lainnya ($s_i$) dan lakukan aksi berdasarkan operasinya:
> >     
> >     - Union (r ∪ s): Untuk setiap tuple di $s_i$, jika belum ada di hash index, tambahkan ke hash index. Di akhir, semua tuple yang ada di hash index adalah hasilnya.
> >     
> >     - Intersection (r ∩ s): Untuk setiap tuple di $s_i$, jika sudah ada di hash index, keluarkan tuple tersebut sebagai hasil.
> >     
> >     - Difference (r - s): Untuk setiap tuple di $s_i$, jika ditemukan di hash index, hapus tuple tersebut dari hash index. Di akhir, semua tuple yang tersisa di hash index adalah hasilnya.
> >     
> >
> > ### Operasi Outer Join
> >
> > Outer Join mirip dengan join biasa (inner join), tetapi juga menyertakan tuple yang tidak memiliki pasangan di relasi lain, dengan mengisi atribut yang kosong menggunakan `NULL`.
> >
> > #### Modifikasi Algoritma Join
> >
> > 1. **Menggunakan Merge Join (untuk `r ⟕ s` - Left Outer Join):**
> > 	- Selama proses merge, jika sebuah tuple `$t_r$` dari relasi `r` tidak menemukan pasangan di relasi `s`, jangan buang tuple tersebut.
> > 	- Sebaliknya, keluarkan tuple `$t_r$` tersebut dengan menambahkan nilai `NULL` untuk semua atribut dari relasi `s`.
> > 	- *Right outer join* dan *full outer join* dapat diimplementasikan dengan logika serupa.
> >
> > 2. **Menggunakan Hash Join (untuk `r ⟕ s` - Left Outer Join):**
> > 	- **Jika `r` adalah *probe relation*:** Saat memindai `r` dan sebuah tuple `$t_r$` tidak menemukan pasangan di *hash table* (yang dibangun dari `s`), langsung keluarkan `$t_r$` dengan padding `NULL`.
> > 	- **Jika `r` adalah *build relation*:** Saat membangun *hash table* dari `r`, tambahkan sebuah flag (misalnya, `matched = false`) pada setiap entri. Saat memindai `s` dan menemukan pasangan, ubah flag menjadi `true`. Setelah selesai memindai `s`, pindai kembali *hash table* `r` dan keluarkan semua tuple yang flag-nya masih `false` dengan padding `NULL`.
> > 

> [!cornell] #### Summary
> 
> **Algoritma untuk Agregasi, Operasi Set, dan Outer Join secara fundamental memanfaatkan teknik yang sama seperti operasi dasar lainnya, yaitu sorting dan hashing, dengan modifikasi logika untuk memenuhi kebutuhan spesifik setiap operasi.** Agregasi dapat dioptimalkan dengan komputasi parsial selama proses sorting. Operasi Set seperti `UNION`, `INTERSECTION`, dan `DIFFERENCE` dapat diimplementasikan secara efisien dengan mempartisi kedua relasi menggunakan hashing dan kemudian memproses setiap pasang partisi di memori. Sementara itu, Outer Join diimplementasikan dengan mengadaptasi algoritma join standar (seperti Merge Join atau Hash Join) untuk memastikan tuple yang tidak memiliki pasangan tetap disertakan dalam hasil akhir dengan padding `NULL`.

> [!ad-libitum]- Additional Information
> 
> #### Agregasi dengan `DISTINCT`
> 
> Bagaimana jika query-nya adalah `COUNT(DISTINCT nama_dosen)`?
> 
> - Operasi ini menjadi lebih kompleks. Sebelum melakukan agregasi, sistem harus melakukan **eliminasi duplikat** terlebih dahulu pada kolom `nama_dosen`.
>     
> - Ini berarti ada langkah tambahan yang juga dapat diimplementasikan menggunakan sorting atau hashing untuk menghilangkan nilai yang sama sebelum fungsi agregat (`COUNT`) diterapkan. Biaya operasi ini akan menjadi penjumlahan dari biaya eliminasi duplikat dan biaya agregasi.
>     
> 
> #### `UNION` vs `UNION ALL`
> 
> - `UNION` dalam SQL secara default akan menghilangkan duplikat dari hasil gabungan kedua relasi. Implementasinya (seperti yang dijelaskan di atas dengan hashing) memerlukan proses pengecekan duplikat.
>     
> - `UNION ALL`, di sisi lain, hanya menggabungkan semua hasil tanpa memeriksa duplikat. Operasi ini jauh lebih murah karena pada dasarnya hanya merupakan "append" atau penambahan. Query optimizer akan selalu memilih `UNION ALL` jika memungkinkan karena biayanya lebih rendah.
>     
> 
> #### Performa Outer Join
> 
> - Biaya Outer Join sedikit lebih mahal daripada Inner Join yang setara.
>     
> - Pada Hash Join, jika relasi yang lebih besar digunakan sebagai _build relation_ (yang harus dipertahankan untuk dicek mana yang tidak cocok), kebutuhan memori dan pemrosesan akhir untuk mengeluarkan tuple yang tidak cocok akan menambah overhead.
>     
> - Pada Merge Join, logikanya menjadi sedikit lebih kompleks karena harus melacak tuple dari kedua sisi yang tidak menemukan pasangan.
>     
> - Karena kompleksitas tambahan ini, jika logika bisnis memungkinkan, menggunakan `INNER JOIN` akan selalu lebih cepat daripada `OUTER JOIN`.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba jalankan query `EXPLAIN SELECT COUNT(kolom) FROM tabel;` dan `EXPLAIN SELECT COUNT(DISTINCT kolom) FROM tabel;` pada tabel besar. Perhatikan bagaimana rencana eksekusinya berbeda. Anda mungkin akan melihat langkah tambahan seperti "HashAggregate" untuk yang pertama dan "HashAggregate" yang didahului oleh "Unique" atau "Sort" untuk yang kedua.
>     
> - Bandingkan performa `UNION` dan `UNION ALL` pada dua tabel. Ukur waktu eksekusinya; `UNION ALL` hampir selalu akan menang telak.
>