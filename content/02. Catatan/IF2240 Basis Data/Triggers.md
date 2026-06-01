---
type: Note 
cssclasses:
- cornell-notes
---
_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Trigger? 
> > - Bagaimana cara merancang Trigger? 
> > - Kapan Trigger distandarisasi? 
> > - Apa saja *event* pemicu Trigger? 
> > - Bagaimana mereferensikan nilai lama/baru? 
> > - Kapan `BEFORE` Trigger digunakan? 
> > - Contoh `BEFORE` Trigger? 
> > - Contoh `AFTER` Trigger? 
> > - Apa itu *Statement Level Trigger*? 
> > - Kapan sebaiknya tidak menggunakan Trigger? 
> > - Apa saja risiko penggunaan Trigger? 
> >
> > ## Reference Points
> > - Slide 31-37 dari "20. IF2240-SemII_2425-m13-1-Integrity-Constraints.pdf"
>
> >
> > ### Pengertian dan Desain Trigger
> > - Sebuah **Trigger** adalah pernyataan yang dieksekusi secara otomatis oleh sistem sebagai efek samping dari modifikasi pada *database*. Ini berarti *trigger* akan aktif dan menjalankan kode tertentu setiap kali terjadi perubahan data yang telah ditentukan sebelumnya.
> > - Untuk merancang mekanisme *trigger*, kita harus:
> >   1.  **Menentukan kondisi** di mana *trigger* akan dieksekusi. Kondisi ini bisa berupa jenis operasi data (misalnya, penyisipan, pembaruan, penghapusan) atau perubahan pada kolom tertentu.
> >   2.  **Menentukan tindakan** yang akan diambil ketika *trigger* dieksekusi. Tindakan ini bisa berupa satu atau beberapa pernyataan SQL atau blok kode prosedural.
> > - *Trigger* diperkenalkan ke standar SQL pada **SQL:1999**, meskipun sebagian besar *database* sudah mendukungnya lebih awal dengan sintaks non-standar. Penting untuk selalu memeriksa manual sistem *database* yang digunakan karena sintaks dapat bervariasi.
> >
> > ### Event Pemicu dan Aksi dalam SQL
> > - **Event Pemicu (Triggering Event)** dapat berupa operasi **`INSERT`**, **`DELETE`**, atau **`UPDATE`**.
> > - *Trigger* pada operasi `UPDATE` dapat dibatasi pada atribut spesifik. Misalnya, `after update of takes on grade` berarti *trigger* hanya akan aktif jika ada pembaruan pada kolom `grade` di tabel `takes`.
> > - **Referensi Nilai Lama dan Baru:**
> >   - Nilai atribut **sebelum** dan **sesudah** sebuah pembaruan dapat direferensikan dalam *trigger*.
> >   - **`referencing old row as <nama_alias>`**: Digunakan untuk operasi `DELETE` dan `UPDATE`, mengacu pada kondisi baris data *sebelum* perubahan.
> >   - **`referencing new row as <nama_alias>`**: Digunakan untuk operasi `INSERT` dan `UPDATE`, mengacu pada kondisi baris data *setelah* perubahan.
> > - *Trigger* dapat diaktifkan **`BEFORE`** sebuah *event* (sebelum perubahan data terjadi) atau **`AFTER`** sebuah *event* (setelah perubahan data terjadi). *Trigger* `BEFORE` sering digunakan sebagai batasan tambahan, misalnya untuk mengubah *grade* yang kosong menjadi *null*.
> >
> > ### Contoh Trigger
> > - **Contoh `BEFORE` Trigger: `setnull_trigger`** 
> >   ```sql
> >   create trigger setnull_trigger before update of takes
> >   referencing new row as nrow
> >   for each row
> >   when (nrow.grade = '')
> >   begin atomic
> >     set nrow.grade = null;
> >   end;
> >   ```
> >   * **Penjelasan**: Trigger ini aktif `BEFORE` setiap `UPDATE` pada tabel `takes` (untuk setiap baris). Jika kolom `grade` pada baris baru (`nrow.grade`) adalah string kosong `''`, maka nilai `grade` pada baris baru tersebut akan diatur menjadi `null` sebelum pembaruan benar-benar terjadi. Ini memastikan konsistensi data *grade*.
> > - **Contoh `AFTER` Trigger: `credits_earned`** 
> >   ```sql
> >   create trigger credits_earned after update of takes on (grade)
> >   referencing new row as nrow
> >   referencing old row as orow
> >   for each row
> >   when nrow.grade <> 'F' and nrow.grade is not null
> >     and (orow.grade = 'F' or orow.grade is null)
> >   begin atomic
> >     update student
> >     set tot_cred = tot_cred + (select credits from course where course.course_id = nrow.course_id)
> >     where student.id = nrow.id;
> >   end;
> >   ```
> >   * **Penjelasan**: Trigger ini aktif `AFTER` setiap `UPDATE` pada kolom `grade` di tabel `takes` (untuk setiap baris). Kondisi `WHEN` memastikan bahwa trigger hanya dijalankan jika *grade* baru **bukan** 'F' dan **bukan** *null*, DAN *grade* lama adalah 'F' atau *null*. Jika kondisi terpenuhi, total kredit (`tot_cred`) mahasiswa yang bersangkutan akan diperbarui dengan menambahkan kredit dari mata kuliah yang relevan.
> >
> > ### Statement Level Triggers
> > - Alih-alih mengeksekusi aksi terpisah untuk setiap baris yang terpengaruh, sebuah aksi tunggal dapat dieksekusi untuk **semua baris yang terpengaruh oleh sebuah transaksi**.
> > - Penggunaan: Menggunakan klausa **`for each statement`** (bukan `for each row`).
> > - Untuk merujuk pada baris yang terpengaruh, digunakan **`referencing old table`** atau **`referencing new table`** untuk merujuk pada tabel sementara (disebut *transition tables*) yang berisi baris-baris yang terpengaruh.
> > - Pendekatan ini bisa **lebih efisien** ketika berurusan dengan pernyataan SQL yang memperbarui sejumlah besar baris sekaligus.
> >
> > ### Kapan Sebaiknya Tidak Menggunakan Trigger
> > - *Trigger* dulunya sering digunakan untuk tugas-tugas seperti:
> >   - Memelihara data ringkasan (misalnya, total gaji setiap departemen).
> >   - Mereplikasi *database* dengan mencatat perubahan ke relasi khusus (*change* atau *delta relations*) dan memiliki proses terpisah yang menerapkan perubahan ke replika.
> > - Namun, **ada cara yang lebih baik** untuk melakukan tugas-tugas tersebut sekarang:
> >   - *Database* modern menyediakan fasilitas **`materialized view`** bawaan untuk memelihara data ringkasan secara efisien.
> >   - *Database* menyediakan **dukungan bawaan untuk replikasi**.
> >   - Fasilitas **enkapsulasi** dapat digunakan alih-alih *trigger* dalam banyak kasus, yaitu dengan mendefinisikan metode untuk memperbarui *field* dan melakukan tindakan sebagai bagian dari metode pembaruan tersebut.
> >
> > ### Risiko Penggunaan Trigger
> > - Terdapat **risiko eksekusi *trigger* yang tidak disengaja**, misalnya ketika:
> >   - Memuat data dari salinan *backup*.
> >   - Mereplikasi pembaruan di situs jarak jauh.
> >   - Eksekusi *trigger* dapat dinonaktifkan sebelum tindakan tersebut dilakukan.
> > - Risiko lain dengan *trigger* adalah:
> >   - **Kesalahan** yang dapat menyebabkan kegagalan transaksi penting yang memicu *trigger*.
> >   - Potensi **eksekusi *cascading***, di mana satu *trigger* memicu *trigger* lain, dan seterusnya, yang bisa menjadi sangat kompleks dan sulit dikelola atau di-*debug*.

> [!cornell] #### Summary
> **Triggers** adalah pernyataan yang dieksekusi otomatis oleh sistem *database* sebagai respons terhadap perubahan data (`INSERT`, `UPDATE`, `DELETE`), berfungsi untuk menegakkan logika bisnis dan batasan yang kompleks. Mereka dapat diaktifkan `BEFORE` atau `AFTER` *event* dan dapat mereferensikan nilai data lama atau baru. Meskipun sangat fleksibel, penggunaan *trigger* harus dipertimbangkan matang karena adanya alternatif yang lebih baik (seperti *materialized views* atau fitur replikasi bawaan) untuk beberapa tugas, serta risiko seperti eksekusi tidak disengaja dan *cascading* yang dapat menyebabkan masalah performa atau kegagalan transaksi.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Blok `BEGIN ATOMIC ... END`**: Pernyataan `atomic` memastikan bahwa semua operasi di dalam blok tersebut diperlakukan sebagai satu unit logis. Jika salah satu operasi gagal, seluruh blok akan dibatalkan (*rolled back*) untuk mempertahankan konsistensi *database*. Ini sangat penting dalam *trigger* untuk memastikan integritas data tidak terganggu oleh kegagalan parsial.
> - **Implikasi Performa**: Meskipun *trigger* sangat kuat, penggunaan yang berlebihan atau desain yang tidak efisien dapat berdampak signifikan pada performa *database*. Setiap kali *event* pemicu terjadi, *trigger* akan dieksekusi, yang dapat menambah *overhead* pada operasi DML (Data Manipulation Language).
> - **Debug Triggers**: Mendebug *trigger* bisa menjadi tantangan karena sifatnya yang otomatis dan tersembunyi dari kode aplikasi. Banyak sistem *database* menyediakan alat bantu atau log khusus untuk membantu dalam melacak eksekusi *trigger* dan masalah yang mungkin timbul.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Silberschatz, Korth, Sudarshan: "Database System Concepts", Edisi ke-7, Bagian 5.3: Triggers.
> - **Dokumentasi Resmi Database**: Untuk detail sintaks dan perilaku spesifik, selalu merujuk pada dokumentasi resmi dari sistem manajemen *database* yang Anda gunakan (misalnya, PostgreSQL, MySQL, SQL Server, Oracle).
>
> #### Eksplorasi Mandiri:
> - **Proyek Mini**: Coba implementasikan sebuah *trigger* sederhana di *database* lokal Anda. Misalnya, buat *trigger* yang mencatat setiap perubahan harga produk ke dalam tabel *log* terpisah, atau yang secara otomatis memperbarui stok barang setelah penjualan.
> - **Studi Kasus**: Telusuri studi kasus nyata di mana *trigger* digunakan untuk memecahkan masalah integritas data atau logika bisnis yang kompleks. Analisis pro dan kontra dari pendekatan *trigger* dalam kasus tersebut.