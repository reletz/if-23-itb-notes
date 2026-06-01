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
> > - Apa itu Model Relasional?
> > - Apa syarat sebuah tabel agar bisa disebut "Relasi"?
> > - Apa itu Atribut dan Domain?
> > - Apa arti nilai atribut "atomik"?
> > - Apa arti dari nilai `NULL`?
> > - Apa bedanya Skema Relasi & Instansi Relasi?
> > - Mengapa informasi perlu dipecah ke beberapa relasi?
> 
> > ### Konsep Model Relasional
> > 
> > - **Asal Mula:** Model Relasional adalah sebuah konsep matematis yang didasarkan pada teori himpunan (_set theory_). Model ini pertama kali diusulkan oleh Dr. E.F. Codd dari IBM Research pada tahun 1970.
> >     
> > - **Signifikansi:** Makalahnya memicu revolusi dalam bidang manajemen basis data dan menjadi dasar bagi hampir semua sistem basis data modern (RDBMS - Relational Database Management System) yang kita gunakan saat ini. Kita mempelajarinya karena ini adalah model yang paling dominan di industri.
> >     
> > 
> > ### Relation (Relasi)
> > 
> > - **Definisi:** Dalam model ini, sebuah **relasi** adalah istilah formal untuk sebuah **tabel** dua dimensi yang memiliki nama. Tabel ini terdiri dari baris (disebut _record_ atau _tuple_) dan kolom (disebut _attribute_ atau _field_).
> >     
> > - **Syarat Formal Sebuah Relasi:** Tidak semua tabel bisa disebut relasi. Sebuah tabel harus memenuhi syarat-syarat ketat berikut:
> >     
> >     - Harus memiliki **nama yang unik** dalam satu basis data.
> >     - Setiap nilai atribut harus **atomik**, artinya tidak dapat dibagi lagi menjadi bagian yang lebih kecil. Contoh: sebuah kolom `phone_number` hanya boleh berisi satu nomor, tidak boleh berisi daftar nomor telepon.
> >     - Setiap **baris (tuple) harus unik**. Tidak boleh ada dua baris yang nilainya sama persis di semua kolom.
> >     - Setiap **atribut (kolom) harus memiliki nama yang unik** di dalam relasi tersebut.
> >     - **Urutan kolom tidak penting.** Posisi kolom `Nama` sebelum atau sesudah `NIM` tidak mengubah makna relasi.
> >     - **Urutan baris juga tidak penting.** Data baris pertama bisa ditukar dengan baris ketiga tanpa masalah.
> >     
> >     _Catatan: Relasi yang memenuhi syarat ini secara otomatis berada dalam **First Normal Form (1NF)**._
> >     
> > 
> > ### Attribute (Atribut) dan Domain
> > 
> > - **Atribut:** Adalah nama dari sebuah kolom dalam suatu relasi yang merepresentasikan sebuah properti atau karakteristik dari entitas yang dimodelkan.
> >     
> > - **Domain:** Adalah himpunan semua nilai yang valid atau diperbolehkan untuk suatu atribut. Contoh: Domain untuk atribut `hari` bisa jadi adalah {'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'}.
> >     
> > - **Nilai NULL:** Merupakan nilai khusus yang menjadi anggota dari setiap domain. `NULL` digunakan untuk merepresentasikan kondisi di mana sebuah nilai:
> >     
> >     - **Tidak diketahui** (misalnya, alamat email mahasiswa belum diisi).
> >     - **Ada, tetapi tidak tersedia** saat ini.
> >     - **Tidak berlaku** untuk tuple tersebut (misalnya, kolom `nama_gadis_ibu` untuk data pria). Penting: `NULL` tidak sama dengan 0 atau string kosong, dan perbandingan `NULL = NULL` akan menghasilkan kondisi yang tidak pasti (_unknown_).
> > 
> > ### Skema dan Instansi
> > 
> > - **Skema Relasi (_Relation Schema_):** Merupakan definisi atau cetak biru dari sebuah relasi. Ini mendeskripsikan nama relasi dan nama-nama atributnya. Formatnya: `NamaRelasi(Atribut1, Atribut2, ..., AtributN)`. Contoh: `instructor(ID, name, dept_name, salary)`.
> >     
> > - **Instansi Relasi (_Relation Instance_):** Merupakan data aktual yang ada di dalam sebuah relasi pada satu waktu tertentu. Ini adalah "snapshot" dari tabel beserta seluruh baris datanya. Instansi bisa berubah setiap saat, sedangkan skema bersifat lebih permanen.
> >     
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     Skema Relasi: instructor(ID, name, dept_name, salary)
> >     
> >     Instansi Relasi (Contoh pada waktu T):
> >     +-------+-----------+-------------+--------+
> >     |   ID  |   name    |  dept_name  | salary |  <-- Atribut (Schema)
> >     +-------+-----------+-------------+--------+
> >     | 22222 | Einstein  | Physics     |  95000 |  <-- Tuple 1
> >     | 12121 | Wu        | Finance     |  90000 |  <-- Tuple 2
> >     | 32343 | El Said   | History     |  60000 |  <-- Tuple 3
> >     +-------+-----------+-------------+--------+   (Instance)
> >     ```
> >     
> > 
> > ### Mengapa Informasi Perlu Dipecah?
> > 
> > - Menyimpan semua informasi dalam satu relasi besar (misalnya, `bank(nomor_akun, saldo, nama_nasabah, alamat_nasabah, cabang_bank, alamat_cabang)`) akan menyebabkan masalah serius:
> >     
> >     - **Duplikasi Informasi:** Jika satu nasabah memiliki tiga akun, maka nama dan alamat nasabah akan diulang sebanyak tiga kali. Ini membuang-buang ruang dan menciptakan risiko inkonsistensi.
> >     - **Kebutuhan Nilai `NULL`:** Jika kita ingin mencatat data seorang nasabah yang belum memiliki akun, maka semua kolom yang berhubungan dengan akun (`nomor_akun`, `saldo`) harus diisi dengan `NULL`.
> > - **Normalization Theory:** Untuk mengatasi ini, digunakan sebuah proses formal yang disebut **normalisasi**. Tujuannya adalah untuk merancang skema relasional yang "baik" dengan memecah informasi ke dalam beberapa tabel yang lebih kecil dan logis.
> >     

> [!cornell] #### Summary
> 
> Model Relasional merepresentasikan data dalam bentuk tabel yang disebut relasi. Sebuah tabel harus memenuhi syarat ketat, seperti memiliki nilai yang atomik dan baris yang unik, untuk dapat disebut sebagai relasi. Struktur sebuah relasi didefinisikan oleh skema, sedangkan data aktual di dalamnya disebut instansi. Informasi sengaja dipecah ke dalam beberapa relasi untuk menghindari anomali seperti duplikasi data, sebuah proses desain yang dipandu oleh Teori Normalisasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### "A Relational Model for Large Shared Data Banks"
> 
> Ini adalah judul makalah monumental karya Dr. E.F. Codd yang diterbitkan dalam "Communications of the ACM" pada bulan Juni 1970. Makalah ini tidak hanya memperkenalkan konsep relasi, tetapi juga meletakkan dasar untuk bahasa query (yang kemudian mengarah pada SQL) dan konsep normalisasi. Ini dianggap sebagai salah satu makalah paling berpengaruh dalam sejarah ilmu komputer, karena secara efektif menciptakan industri sistem manajemen basis data relasional (RDBMS) yang bernilai miliaran dolar.