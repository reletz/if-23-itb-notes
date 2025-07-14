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
> > - Mengapa sebuah query perlu di-tuning?
> >     
> > - Apa itu Optimizer Hints dan Set Orientation?
> >     
> > - Apa masalah dari transaksi yang berjalan lama?
> >     
> > - Bagaimana cara menangani transaksi yang panjang?
> >     
> 
> > ### Query Tuning: Membantu Sang Optimizer
> > 
> > Terkadang, _query optimizer_ tidak memilih rencana eksekusi (_execution plan_) yang terbaik. Ini bisa terjadi karena statistik database sudah usang atau query-nya terlalu kompleks (misalnya, mengandung subquery bersarang). Untuk mengatasi ini, kita bisa:
> > 
> > - **Melihat Rencana Eksekusi:** Menggunakan perintah `EXPLAIN` untuk melihat rencana yang dipilih oleh optimizer.
> >     
> > - **Memperbarui Statistik:** Menjalankan perintah `ANALYZE` untuk menghitung ulang statistik agar optimizer memiliki data yang akurat.
> >     
> > - **Menulis Ulang Query:** Mengubah query kompleks, misalnya dengan mengganti subquery menjadi `JOIN`, agar lebih mudah dioptimalkan.
> >     
> > - **Menggunakan Optimizer Hints:** Menyisipkan instruksi khusus di dalam teks SQL (seperti `/*+ INDEX(...) */`) untuk "memaksa" optimizer menggunakan indeks atau metode tertentu.
> >     
> >
> > ### Teknik Set Orientation
> > 
> > **Set Orientation** adalah prinsip untuk meminimalkan jumlah panggilan ke database dari aplikasi. Daripada menjalankan satu query sederhana berulang kali di dalam sebuah _loop_ dengan parameter berbeda, lebih baik menulis satu query yang lebih kompleks (misal, dengan `GROUP BY`) yang dapat mengambil semua data yang dibutuhkan dalam satu kali panggilan.
> >
> > ### Transaction Tuning: Menangani Transaksi Panjang
> > 
> > Transaksi yang berjalan sangat lama, baik _read-only_ maupun _update_, dapat menyebabkan masalah serius:
> > 
> > - **Transaksi Read-Only Panjang:** Menyebabkan **kontensi kunci (lock contention)**, di mana ia "mengunci" data sehingga menghalangi transaksi update lain yang ingin mengubah data yang sama.
> >     
> > - **Transaksi Update Panjang:** Dapat menghabiskan ruang untuk _lock_ dan _log_, serta secara drastis memperlama waktu pemulihan (_recovery_) jika sistem _crash_.
> >     
> >
> > ### Solusi untuk Transaksi Panjang
> > 
> > - **Untuk Read Panjang:** Gunakan **multi-version concurrency control (MVCC)** seperti "snapshots" di Oracle yang tidak memerlukan _lock_, atau gunakan level konsistensi yang lebih rendah (meskipun hasilnya bisa tidak presisi).
> >     
> > - **Untuk Update Panjang:** Gunakan teknik **mini-batch transactions**, yaitu memecah satu transaksi update besar menjadi beberapa transaksi kecil yang dieksekusi secara berurutan. Ini mengurangi durasi _lock_ dan dampak jika terjadi kegagalan.
> >     

> [!cornell] #### Summary
> 
> Tuning pada level aplikasi fokus pada perbaikan kode yang berinteraksi dengan database. **Query Tuning** melibatkan analisis dan perbaikan query melalui `EXPLAIN`, `ANALYZE`, penulisan ulang, dan penggunaan _hints_ untuk membantu optimizer, serta menerapkan **set orientation** untuk mengurangi panggilan ke database. **Transaction Tuning** bertujuan mengatasi masalah transaksi yang berjalan lama, dengan menggunakan **MVCC** untuk transaksi baca dan **mini-batches** untuk transaksi update guna mengurangi _lock contention_ dan risiko kegagalan sistem.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Loop di Aplikasi: "Musuh" Performa Database
> 
> Salah satu _anti-pattern_ paling umum yang dilakukan oleh programmer aplikasi adalah melakukan query di dalam sebuah _loop_. Contoh: mengambil daftar ID produk, lalu melakukan _looping_ untuk mengambil detail setiap produk satu per satu. Setiap iterasi _loop_ adalah satu kali perjalanan pulang-pergi (_round trip_) ke database, yang sangat tidak efisien. Teknik _set orientation_ memperbaiki ini dengan mengambil semua detail produk yang dibutuhkan hanya dalam satu query menggunakan klausa `WHERE product_id IN (...)` atau `JOIN`.
> 
> #### Idempotency dalam Mini-Batches
> 
> Saat mengimplementasikan _mini-batch transactions_, penting untuk merancang setiap _batch_ agar bersifat **idempoten**. Artinya, jika sebuah _batch_ dijalankan lebih dari satu kali karena proses _recovery_ setelah kegagalan, hasilnya akan tetap sama seperti jika dijalankan sekali. Ini mencegah masalah seperti penambahan stok barang yang sama berulang kali jika sistem _crash_ di tengah-tengah proses _batch_.