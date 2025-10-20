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
> > - Apa itu Materialized View?
> >     
> > - Kapan sebaiknya membuat indeks?
> >     
> > - Kapan sebaiknya menghindari indeks?
> >     
> > - Bagaimana menyeimbangkan jumlah indeks?
> >     
> 
> > ### Materialized Views
> > 
> > **Materialized View** adalah sebuah objek database yang menyimpan hasil dari sebuah query secara fisik. Ini sangat berguna untuk mempercepat query yang kompleks, terutama query agregat. Namun, ada _overhead_ yang perlu dipertimbangkan, yaitu ruang penyimpanan tambahan dan waktu yang dibutuhkan untuk menjaga view tetap sinkron dengan data aslinya (_view maintenance_). Pemeliharaan ini bisa dilakukan secara langsung saat data diupdate (_immediate_) atau ditunda (_deferred_).
> >
> > ### Kapan Harus Membuat Indeks?
> > 
> > Membuat indeks adalah keputusan strategis. Indeks sangat direkomendasikan pada:
> > 
> > - **Primary Keys:** DBMS biasanya secara otomatis membuat indeks unik pada primary key.
> >     
> > - **Foreign Keys:** Kolom yang digunakan untuk `JOIN` hampir selalu merupakan kandidat yang baik untuk diindeks.
> >     
> > - **Kolom Filtering:** Kolom yang sering muncul di klausa `WHERE` dan menghasilkan persentase baris yang kecil.
> >     
> > - **Kolom Pengurutan:** Kolom yang sering digunakan dalam klausa `ORDER BY` dan `GROUP BY`.
> >     
> >
> > ### Kapan Harus Menghindari Indeks?
> > 
> > Indeks tidak selalu menjadi solusi. Hindari membuat indeks pada:
> > 
> > - **Tabel Kecil:** Overhead dari pembacaan indeks bisa lebih mahal daripada melakukan _full table scan_.
> >     
> > - **Kolom dengan Banyak Update:** Setiap `UPDATE` pada kolom yang diindeks akan memaksa sistem untuk memperbarui indeksnya juga, yang memperlambat performa.
> >     
> > - **Kolom dengan Banyak Nilai NULL.**
> >     
> > - **Kolom yang Menghasilkan Banyak Baris:** Jika klausa `WHERE` pada kolom tersebut mengembalikan sebagian besar data tabel, lebih efisien untuk melakukan _full table scan_.
> >     
> >
> > ### Keseimbangan Jumlah Indeks
> > 
> > Menambah indeks mempercepat `SELECT` tetapi memperlambat `INSERT`, `UPDATE`, dan `DELETE`. Oleh karena itu, perlu ada keseimbangan. Sistem **OLTP** (banyak transaksi update) biasanya memiliki lebih sedikit indeks dibandingkan sistem **DSS** (_Decision Support System_) yang _read-heavy_. Untuk membantu DBA, beberapa DBMS menyediakan **Index Tuning Wizard** yang dapat menganalisis workload dan merekomendasikan set indeks yang optimal.
> > 
> > ### Index Tuning Wizard
> > 
> > **Index Tuning Wizard** adalah sebuah alat (tool) yang memungkinkan pengguna, bahkan yang tidak memiliki pemahaman mendalam tentang struktur internal database, untuk memilih dan membuat set indeks dan statistik yang optimal.
> > - **Tujuan utamanya** adalah menyederhanakan proses _tuning_ performa database. Pengguna tidak perlu menjadi ahli dalam hal:
> > 	- Struktur database yang kompleks.
> > 	- _Workload_ atau beban kerja kueri yang berjalan.
> > 	- Detail internal dari server database.
> > - **Contoh** dari alat ini adalah yang terdapat pada **Microsoft® SQL Server™ 2000**.
> > - **Cara Kerja dan Hasil:**
> > 	1. **Analisis Berbasis Workload Nyata:** Untuk memberikan hasil terbaik, wizard ini menganalisis workload (kumpulan kueri SQL) yang realistis. Data workload ini biasanya ditangkap atau direkam menggunakan alat lain seperti SQL Profiler. Dengan menganalisis kueri yang benar-benar dijalankan, rekomendasi yang diberikan menjadi jauh lebih akurat dan relevan.
> > 	2. **Rekomendasi Berupa Perintah SQL:** Hasil atau output dari wizard ini bukanlah laporan yang rumit, melainkan langsung berupa perintah-perintah SQL (`CREATE INDEX`, `UPDATE STATISTICS`, dll.). Perintah ini sudah siap pakai dan bisa langsung dijalankan pada database melalui alat seperti SQL Query Analyzer.
> > 
> > Secara singkat, Index Tuning Wizard **mengotomasikan** tugas kompleks dalam mengoptimalkan indeks database, membuatnya dapat diakses oleh lebih banyak orang, tidak hanya administrator database (DBA) ahli.
> > 

> [!cornell] #### Summary
> 
> **Materialized View** dapat mempercepat query agregat dengan menyimpan hasilnya secara fisik, namun memiliki _overhead_ pemeliharaan. **Index Tuning** adalah tentang membuat keputusan strategis: **buat indeks** pada kolom kunci (PK/FK), kolom `WHERE`, dan kolom pengurutan untuk mempercepat `SELECT`. Namun, **hindari indeks** pada tabel kecil, kolom yang sering diupdate, atau kolom yang tidak selektif. Kuncinya adalah **menyeimbangkan** kebutuhan antara query `SELECT` yang cepat dengan performa operasi DML (`INSERT`/`UPDATE`/`DELETE`).

> [!ad-libitum]- Additional Information (Optional)
> 
> #### "Index Suppression"
> 
> Terkadang, cara kita menulis query bisa secara tidak sengaja "mematikan" atau membuat indeks tidak bisa digunakan oleh optimizer. Contoh umum adalah menerapkan fungsi atau operasi matematika pada kolom di dalam klausa `WHERE`.
> 
> - **Query Buruk:** `WHERE total + 3 = 20`
>     
> - **Query Baik:** `WHERE total = 17`
>     
> 
> Pada query pertama, meskipun ada indeks pada kolom `total`, DBMS tidak bisa menggunakannya karena harus menghitung `total + 3` untuk setiap baris. Pada query kedua, indeks bisa langsung digunakan untuk mencari nilai `17`.
> 
> #### Clustered Index: Hanya Satu dan Berharga
> 
> Karena _clustered index_ menentukan urutan fisik data, ia sangat berharga. Pilihlah kolom yang paling sering digunakan untuk _range query_ (misalnya, `WHERE tanggal BETWEEN ...`) sebagai _clustered index_. Ini akan membuat pengambilan data dalam rentang tersebut sangat cepat karena sistem hanya perlu membaca blok-blok data yang berurutan secara fisik.