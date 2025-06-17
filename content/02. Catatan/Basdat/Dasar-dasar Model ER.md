---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan dari Model ER?
> > - Apa itu _Entity_ dan _Entity Set_?
> > - Apa itu _Relationship_ dan _Relationship Set_?
> > - Apa itu _Roles_ dalam relasi?
> > - Apa itu _Degree_ dari sebuah relasi?
> > - Apa saja jenis-jenis atribut?
> > - Bagaimana notasi grafis untuk E, R, A?
> 
> > ### Tujuan dan Pendekatan Desain
> > 
> > - **Fase Desain:** Proses perancangan basis data biasanya melalui beberapa tahap: dimulai dari memahami kebutuhan pengguna, kemudian memilih model konseptual (seperti ER Model) untuk membuat cetak biru, dan diakhiri dengan implementasi (Desain Logis & Fisik).
> > - **Tujuan Model ER:** Model Entity-Relationship (ER) adalah model data konseptual tingkat tinggi. Tujuannya adalah untuk memodelkan dunia nyata sebagai kumpulan **entitas** (objek) dan **relasi** (hubungan antar objek). Model ini digunakan untuk membuat **ER Diagram (ERD)**, yang berfungsi sebagai cetak biru visual sebelum menulis kode atau membuat tabel.
> > 
> > ### Entity Sets (Himpunan Entitas)
> > 
> > - **Definisi:**
> >     - **Entitas (_Entity_):** Objek di dunia nyata yang unik dan dapat dibedakan dari yang lain. Contoh: seorang mahasiswa spesifik bernama 'Budi'.
> >     - **Entity Set:** Kumpulan dari entitas-entitas sejenis yang memiliki properti yang sama. Contoh: `student` adalah himpunan dari semua entitas mahasiswa.
> > - **Atribut:** Properti atau karakteristik yang mendeskripsikan sebuah entitas. Contoh: entitas `student` memiliki atribut `ID`, `name`, dan `tot_cred`.
> > - **Notasi Grafis:**
> >     - **Entity Set:** Digambarkan sebagai **persegi panjang**.
> >     - **Primary Key:** Atribut yang menjadi pengenal unik diberi **garis bawah**.
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     +-----------------+
> >     |   instructor    |
> >     |-----------------|
> >     | _ID_            |
> >     | name            |
> >     | salary          |
> >     +-----------------+
> >     ```
> >     
> > 
> > ### Relationship Sets (Himpunan Relasi)
> > 
> > - **Definisi:**
> >     - **Relasi (_Relationship_):** Asosiasi atau hubungan antara beberapa entitas.
> >     - **Relationship Set:** Kumpulan dari relasi-relasi sejenis. Contoh: `advisor` adalah himpunan relasi yang menghubungkan `instructor` dan `student`.
> > - **Atribut pada Relasi:** Relasi juga bisa memiliki atribut. Contoh: relasi `advisor` dapat memiliki atribut `date` untuk mencatat kapan hubungan pembimbingan dimulai.
> > - **Notasi Grafis:** Digambarkan sebagai **belah ketupat (diamond)**, yang terhubung dengan garis ke entitas yang berpartisipasi.
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     +------------+      +-----------+      +---------+
> >     | instructor |------<  advisor  >------| student |
> >     +------------+      +-----------+      +---------+
> >     ```
> >     
> > 
> > ### Konsep Lanjutan pada Relasi
> > 
> > - **Roles (Peran):** Digunakan ketika sebuah _entity set_ berpartisipasi lebih dari satu kali dalam sebuah relasi. Label peran ditulis pada garis untuk memperjelas fungsi masing-masing.
> >     - **Contoh:** Dalam relasi `prereq`, entitas `course` muncul dua kali: sebagai mata kuliah utama dan sebagai prasyaratnya. `prereq_id` dan `course_id` bertindak sebagai **Roles**
> >  ![[Pasted image 20250616193625.png]]
> > - **Degree (Derajat Relasi):** Jumlah _entity set_ yang berpartisipasi dalam sebuah relasi.
> >     - **Binary:** Melibatkan dua _entity set_ (paling umum).
> >     - **Ternary:** Melibatkan tiga _entity set_.
> >     ![[Pasted image 20250616193745.png]]
> > 
> > ### Complex Attributes (Atribut Kompleks)
> > ![[Pasted image 20250616193815.png]]
> > - **Simple vs. Composite:**
> >     - **Simple:** Atribut yang tidak dapat dipecah lagi (atomik), contoh: `ID`.
> >     - **Composite:** Atribut yang dapat dipecah menjadi bagian-bagian yang lebih kecil. Contoh: `name` dapat terdiri dari `first_name` dan `last_name`.
> > - **Single-valued vs. Multi-valued:**
> >     - **Single-valued:** Atribut yang hanya memiliki satu nilai untuk setiap entitas. Contoh: `date_of_birth`.
> >     - **Multi-valued:** Atribut yang bisa memiliki banyak nilai. Contoh: `{phone_number}`. Digambarkan dengan kurung kurawal.
> > - **Derived Attribute:** Atribut yang nilainya dapat dihitung atau diturunkan dari atribut lain. Contoh: `age()` dapat dihitung dari `date_of_birth`. Digambarkan dengan tanda kurung.
> >     
> > 
> > ### Studi Kasus: Model ER Perpustakaan Sederhana
> > 
> > **Permasalahan:**
> > 
> > "Buatlah model ER dasar untuk sistem perpustakaan. Sebuah Book (buku) memiliki ISBN (unik) dan title. Seorang Member (anggota) memiliki member_id (unik) dan name. Anggota dapat 'meminjam' (borrows) buku. Catat juga tanggal peminjaman (date_borrowed) pada setiap transaksi peminjaman."
> > 
> > **Analisis:**
> > 
> > - **Entitas:** `Book`, `Member`.
> > - **Relasi:** `borrows`.
> > - **Atribut Entitas:** `ISBN` dan `title` untuk `Book`; `member_id` dan `name` untuk `Member`.
> > - **Atribut pada Relasi:** `date_borrowed` adalah properti dari aksi 'meminjam', sehingga menjadi atribut pada relasi `borrows`.
> > 
> > **Diagram ASCII Solusi:**
> > 
> > ```
> > +-----------------+         +-------------------+         +-----------------+
> > |      Book       |         |                   |         |     Member      |
> > |-----------------|         |    < borrows >    |         |-----------------|
> > | _ISBN_          |---------|                   |---------| _member_id_     |
> > | title           |         |                   |         | name            |
> > +-----------------+         +-------------------+         +-----------------+
> > 				  						                 |
> > 				  							       | date_borrowed |
> > ```

> [!cornell] #### Summary
> 
> Model ER adalah alat desain konseptual yang memvisualisasikan data sebagai Entitas (objek, digambarkan sebagai persegi panjang), Atribut (properti dari entitas), dan Relasi (hubungan antar entitas, digambarkan sebagai belah ketupat). Entitas memiliki atribut, di mana salah satunya berfungsi sebagai Primary Key (diberi garis bawah) untuk identifikasi unik. Atribut itu sendiri bisa kompleks, seperti composite, multi-valued, atau derived.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Menghindari Jebakan Desain
> 
> Tujuan utama dari pemodelan yang baik adalah untuk menghindari dua jebakan utama dalam desain basis data:
> 
> - **Redundansi:** Menyimpan informasi yang sama berulang kali. Ini tidak hanya membuang-buang ruang, tetapi juga dapat menyebabkan data menjadi tidak konsisten jika pembaruan hanya dilakukan di salah satu tempat.
> - **Incompleteness (Ketidaklengkapan):** Desain yang buruk dapat membuat beberapa aspek dari bisnis menjadi sulit atau bahkan tidak mungkin untuk dimodelkan dan disimpan dalam basis data.
> 
> Model ER yang dipikirkan dengan matang membantu mengatasi kedua masalah ini pada tahap awal perancangan.