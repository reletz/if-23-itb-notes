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
> > - Apa itu Data Dictionary?
> >     
> > - Informasi apa saja yang disimpan sebagai metadata?
> >     
> > - Bagaimana cara DBMS menyimpan metadata?
> >     
> 
> > ### Definisi Data Dictionary
> > 
> > **Data Dictionary**, yang juga sering disebut **System Catalog**, adalah komponen dalam DBMS yang menyimpan **metadata**, yaitu "data tentang data". Metadata ini adalah informasi deskriptif mengenai struktur, pengguna, dan penyimpanan basis data itu sendiri, yang sangat penting bagi sistem untuk dapat beroperasi dengan benar.
> >
> > ### Konten Metadata
> > 
> > Data dictionary menyimpan berbagai macam informasi penting, di antaranya:
> > 
> > - **Informasi Relasi:** Nama tabel, nama dan tipe data setiap kolom, definisi _view_, serta _integrity constraints_ (seperti _primary key_ dan _foreign key_).
> >     
> > - **Informasi Pengguna:** Nama pengguna, password terenkripsi, dan grup keanggotaan.
> >     
> > - **Data Statistik:** Informasi seperti jumlah baris dalam setiap tabel, yang sangat berguna bagi _query optimizer_ untuk menentukan rencana eksekusi yang efisien.
> >     
> > - **Informasi Fisik:** Detail tentang bagaimana dan di mana data disimpan, termasuk metode organisasi file (misal, heap/sequential) dan lokasi fisik file.
> >     
> > - **Informasi Indeks:** Detail tentang semua indeks yang ada di dalam basis data.
> >     
> >
> > ### Representasi Penyimpanan Metadata
> > 
> > Metadata itu sendiri perlu disimpan. Banyak sistem basis data menyimpannya dalam bentuk **relasi (tabel) khusus** di dalam database itu sendiri. Contohnya, mungkin ada tabel bernama `Relation_metadata` atau `Attribute_metadata`. Keuntungannya adalah metadata ini bisa di-query menggunakan SQL. Untuk akses yang cepat saat sistem berjalan, metadata ini sering kali dimuat ke dalam struktur data khusus di **memori utama**.

> [!cornell] #### Summary
> 
> **Data Dictionary** atau **System Catalog** adalah repositori pusat untuk **metadata**, yaitu data yang mendeskripsikan basis data itu sendiri, mencakup informasi tentang **relasi, atribut, pengguna, statistik, dan struktur penyimpanan fisik**. Untuk kemudahan manajemen, metadata ini sering disimpan dalam bentuk **tabel relasional khusus**, namun dimuat ke dalam struktur data di **memori** untuk akses yang efisien selama operasi basis data.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Metadata Sebagai "Self-Describing System"
> 
> Kemampuan DBMS untuk menyimpan metadata tentang dirinya sendiri adalah salah satu fitur yang paling kuat. Ini membuatnya menjadi _self-describing_ (dapat mendeskripsikan dirinya sendiri). Anda tidak perlu melihat kode program atau dokumentasi eksternal untuk mengetahui struktur sebuah tabel; Anda cukup melakukan query ke data dictionary. Contoh query SQL-nya bisa seperti `SELECT column_name, data_type FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'nama_tabel_anda';` pada banyak sistem SQL.
> 
> #### Data Dictionary Aktif vs. Pasif
> 
> - **Data Dictionary Aktif:** Secara otomatis dikelola dan diakses oleh DBMS. Setiap kali Anda menjalankan perintah DDL seperti `CREATE TABLE`, DBMS secara otomatis memperbarui data dictionary. Inilah yang digunakan oleh hampir semua DBMS modern.
>     
> - **Data Dictionary Pasif:** Dikelola secara terpisah dari DBMS (misalnya dalam file teks atau spreadsheet) dan tidak diakses secara otomatis oleh sistem. Ini lebih merupakan alat dokumentasi daripada komponen sistem yang terintegrasi dan sudah jarang digunakan.
>