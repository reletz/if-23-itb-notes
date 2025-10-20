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
> > - Apa itu Bitmap Index dan kapan ia berguna?
> >     
> > - Bagaimana cara kerja query pada Bitmap Index?
> >     
> > - Bagaimana cara membuat dan menghapus indeks di SQL?
> >     
> 
> > ### Konsep Bitmap Index
> > 
> > **Bitmap Index** adalah jenis indeks khusus yang dirancang untuk atribut dengan jumlah nilai unik yang relatif sedikit (_low cardinality_), seperti 'gender' (Pria, Wanita), 'negara', atau 'status' (Aktif, Non-aktif). Untuk setiap nilai unik, sebuah **bitmap** (serangkaian bit 0 dan 1) dibuat. Panjang bitmap ini sama dengan jumlah baris di tabel. Bit ke-i akan bernilai 1 jika baris ke-i memiliki nilai tersebut, dan 0 jika tidak.
> >
> > ### Query Menggunakan Operasi Bitwise
> > 
> > Keunggulan utama bitmap index adalah kemampuannya menjawab query yang melibatkan beberapa atribut secara sangat efisien. Ini dilakukan dengan menggunakan **operasi bitwise** yang sangat cepat pada bitmap-bitmap yang relevan:
> > 
> > - **AND (Intersection):** Untuk kondisi 'dan'.
> >     
> > - **OR (Union):** Untuk kondisi 'atau'.
> >     
> > - **NOT (Complementation):** Untuk kondisi 'bukan'.
> >     
> > 
> > Contoh: Untuk mencari "pria dengan level pendapatan L1", sistem akan mengambil bitmap untuk 'pria' dan melakukan operasi `AND` dengan bitmap untuk 'L1'. Hasilnya adalah bitmap baru yang menunjukkan baris mana yang memenuhi kedua kondisi tersebut.
> >
> > ### Definisi Indeks dalam SQL
> > 
> > Bahasa SQL menyediakan perintah standar untuk mengelola indeks:
> > 
> > - **Membuat Indeks:** Menggunakan perintah `CREATE INDEX nama_indeks ON nama_tabel(nama_kolom);`.
> >     
> > - **Membuat Indeks Unik:** Perintah `CREATE UNIQUE INDEX` digunakan untuk memastikan bahwa nilai pada kolom yang diindeks bersifat unik, yang juga bisa berfungsi sebagai penegak _candidate key_.
> >     
> > - **Menghapus Indeks:** Menggunakan perintah `DROP INDEX nama_indeks;`.
> >     

> [!cornell] #### Summary
> 
> **Bitmap Index** adalah tipe indeks yang efisien untuk atribut berkardinalitas rendah, di mana setiap nilai unik direpresentasikan oleh sebuah **bitmap**. Query yang melibatkan banyak atribut dapat dijawab dengan sangat cepat melalui **operasi bitwise** (AND, OR, NOT) pada bitmap-bitmap ini. Secara praktis, indeks dapat dibuat dan dihapus dalam database menggunakan perintah SQL standar seperti **`CREATE INDEX`** dan **`DROP INDEX`**.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Kelemahan Bitmap Index
> 
> Bitmap index sangat tidak efisien untuk atribut dengan kardinalitas tinggi (banyak nilai unik), seperti kolom 'email' atau 'nomor_telepon', karena akan ada terlalu banyak bitmap yang harus dibuat dan disimpan. Selain itu, bitmap index juga tidak cocok untuk lingkungan OLTP yang sangat sibuk dengan banyak operasi `UPDATE`. Mengubah satu nilai pada satu baris saja mengharuskan sistem untuk memperbarui dua bitmap: mengubah bit dari 1 ke 0 di bitmap lama, dan dari 0 ke 1 di bitmap baru, yang bisa menyebabkan masalah konkurensi.
> 
> #### Penggunaan di Data Warehouse
> 
> Bitmap index paling bersinar di lingkungan **Data Warehouse** atau **OLAP**. Dalam sistem seperti ini, data jarang di-update (_read-only_) dan query sering kali bersifat kompleks, melibatkan banyak filter pada kolom-kolom dimensi yang biasanya berkardinalitas rendah (seperti kategori produk, wilayah geografis, atau status pelanggan). Kemampuan bitmap index untuk menggabungkan filter-filter ini dengan cepat menggunakan operasi bitwise membuatnya menjadi pilihan yang sangat superior dibandingkan B+-Tree untuk jenis _workload_ ini.