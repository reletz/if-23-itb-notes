---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[Basdat]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa saja 3 level abstraksi data?
> > - Apa perbedaan antara Schema dan Instance?
> > - Apa itu _Physical Data Independence_?
> > - Apa itu DDL dan DML?
> > - Apa saja komponen inti dalam arsitektur DBMS?
> > - Apa perbedaan Arsitektur Two-Tier & Three-Tier?
> > - Siapa saja jenis-jenis pengguna basis data?
> > - Apa saja 5 bagian dari sebuah Sistem Basis Data?
> 
> > ### Level-Level Abstraksi (Arsitektur ANSI/SPARC)
> > 
> > Untuk menyembunyikan kompleksitas penyimpanan data dari pengguna, sistem basis data menggunakan beberapa level abstraksi, yang memungkinkan pengguna melihat data dengan cara yang berbeda-beda.
> > 
> > - **Physical Level (Level Fisik):** Ini adalah level terendah yang menjelaskan **bagaimana** sebuah record (data) secara fisik disimpan di media penyimpanan. Ini mencakup detail tentang struktur file, blok data, dan indeks. Level ini adalah urusan pengembang DBMS dan administrator, dan sepenuhnya disembunyikan dari pengguna biasa dan programmer aplikasi.
> >     
> > - **Logical Level (Level Logis):** Ini adalah level menengah yang menjelaskan **apa** data yang disimpan dalam basis data dan **hubungan** apa yang ada di antara data tersebut. Level ini mendefinisikan semua entitas (tabel), atribut (kolom), tipe data, dan batasan-batasan dalam basis data secara keseluruhan, tanpa mempedulikan bagaimana data tersebut disimpan secara fisik.
> >     
> > - **View Level (Level Tampilan):** Ini adalah level tertinggi yang paling dekat dengan pengguna. Level ini hanya menampilkan sebagian dari keseluruhan basis data yang relevan untuk pengguna atau aplikasi tertentu. Tujuannya adalah untuk menyederhanakan interaksi pengguna dan untuk keamanan, misalnya dengan menyembunyikan kolom gaji karyawan dari pengguna yang tidak berwenang.
> >     
> > 
> > ### Schema dan Instance
> > 
> > - **Schema (Skema):** Merupakan cetak biru atau deskripsi struktur keseluruhan dari sebuah basis data. Skema jarang sekali berubah.
> >     
> >     - _Logical Schema:_ Mendefinisikan keseluruhan struktur logis basis data.
> >     - _Physical Schema:_ Mendefinisikan keseluruhan struktur fisik basis data.
> > - **Instance (Instansi):** Merupakan konten atau data aktual dari basis data pada satu titik waktu tertentu. Instansi basis data terus berubah seiring dengan operasi penambahan, pengubahan, dan penghapusan data.
> >     
> > 
> > ### Independensi Data dan Bahasa
> > 
> > - **Physical Data Independence:** Sebuah konsep kunci yang merupakan kemampuan untuk memodifikasi skema fisik (misalnya, mengubah metode penyimpanan atau memindahkan data ke disk baru) **tanpa** harus mengubah skema logis atau aplikasi yang ada. Ini dimungkinkan karena adanya pemisahan antara level logis dan fisik.
> >     
> > - **Data Definition Language (DDL):** Sekumpulan perintah dalam SQL yang digunakan untuk **mendefinisikan** skema basis data. Perintah DDL (seperti `CREATE TABLE`) menghasilkan template tabel yang disimpan dalam kamus data (data dictionary), yang berisi metadata.
> >     
> > - **Data Manipulation Language (DML):** Bahasa yang digunakan untuk **mengakses dan memanipulasi** data (menambah, menghapus, memperbarui, mengambil) yang diorganisir oleh model data.
> >     
> >     - _DML Prosedural:_ Mengharuskan pengguna untuk menentukan data apa yang dibutuhkan dan **bagaimana cara mendapatkannya**.
> >     - _DML Deklaratif:_ Mengharuskan pengguna untuk menentukan data apa yang dibutuhkan **tanpa menentukan bagaimana cara mendapatkannya** (contoh utamanya adalah SQL).
> > 
> > ### Arsitektur dan Komponen
> > 
> > - **Komponen Fungsional DBMS:** Sebuah DBMS dipartisi menjadi beberapa modul fungsional:
> >     
> >     - _The Storage Manager:_ Bertanggung jawab atas interaksi dengan sistem file dan media penyimpanan fisik. Ini termasuk manajer file, manajer buffer, serta manajer otorisasi dan integritas.
> >     - _The Query Processor Component:_ Bertanggung jawab untuk menerjemahkan dan mengeksekusi perintah DDL dan DML. Ini termasuk DDL interpreter, DML compiler, dan query evaluation engine.
> >     - _The Transaction Management Component:_ Memastikan basis data tetap dalam keadaan konsisten meskipun terjadi kegagalan sistem dan adanya eksekusi transaksi secara bersamaan.
> > - **Arsitektur Aplikasi Basis Data:**
> >     
> >     - _Two-Tier Architecture:_ Aplikasi berada di mesin klien dan secara langsung memanggil fungsionalitas sistem basis data yang berjalan di mesin server.
> >     - _Three-Tier Architecture:_ Mesin klien bertindak sebagai _front end_ (misalnya, browser) dan tidak berisi panggilan basis data langsung. Klien berkomunikasi dengan _application server_ (sebagai _middle tier_), dan barulah _application server_ yang berkomunikasi dengan sistem basis data.
> > - **Sistem Basis Data:** Mengacu pada organisasi komponen secara keseluruhan, yang terdiri dari lima bagian utama: Hardware, Software, People (Pengguna), Prosedur, dan Data.
> >     
> > 
> > ### Pengguna Basis Data
> > 
> > Pengguna basis data dapat dikategorikan berdasarkan cara mereka berinteraksi dengan sistem:
> > 
> > - **Naive Users:** Pengguna awam yang berinteraksi melalui antarmuka pengguna yang telah dibuatkan, seperti aplikasi web atau seluler (contoh: teller bank, agen travel).
> >     
> > - **Application Programmers:** Profesional komputer yang menulis program aplikasi yang nantinya akan digunakan oleh _naive users_.
> >     
> > - **Sophisticated Users:** Pengguna yang berinteraksi dengan sistem tanpa menulis program, tetapi dengan membentuk permintaan mereka menggunakan bahasa query (seperti SQL) atau alat analisis data (contoh: analis data).
> >     
> > - **Database Administrator (DBA):** Orang yang memiliki kontrol pusat atas seluruh sistem basis data dan menggunakan alat administrasi untuk mengelola basis data.
> >     

> [!cornell] #### Summary
> 
> Arsitektur sistem basis data dirancang secara berlapis (Fisik, Logis, Tampilan) untuk menciptakan independensi data, yang memungkinkan perubahan pada satu level tanpa mempengaruhi level lainnya. Inti dari sistem ini adalah DBMS, yang berfungsi sebagai pengelola pusat untuk semua operasi data melalui DDL (untuk definisi) dan DML (untuk manipulasi). Sistem secara keseluruhan (termasuk hardware, software, dan pengguna) dapat diakses melalui arsitektur aplikasi two-tier atau three-tier, dan dilayani oleh berbagai jenis pengguna, mulai dari pengguna awam hingga administrator (DBA) yang memiliki keahlian teknis.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Proses Desain Basis Data
> 
> Perancangan basis data itu sendiri adalah proses dua langkah yang terkait erat dengan arsitektur ini:
> 
> - **Logical Design:** Fase di mana kita memutuskan skema basis data. Ini adalah keputusan yang melibatkan pertimbangan bisnis ("Informasi apa yang perlu kita rekam?") dan ilmu komputer ("Bagaimana cara menyusun relasi dan atribut yang baik untuk menghindari redundansi?").
> - **Physical Design:** Fase di mana kita memutuskan tata letak fisik basis data di media penyimpanan. Ini adalah keputusan teknis yang mempengaruhi performa dan efisiensi penyimpanan.