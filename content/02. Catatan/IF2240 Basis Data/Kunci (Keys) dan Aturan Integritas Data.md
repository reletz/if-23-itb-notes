---
type: Note
cssclasses:
  - cornell-notes
---

## type: Note cssclasses:   - cornell-notes

_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa fungsi dari _Keys_?
> > - Apa itu _Superkey_?
> > - Apa bedanya _Candidate Key_ dan _Primary Key_?
> > - Apa itu _Foreign Key_?
> > - Apa itu _Integrity Constraint_?
> > - Apa itu _Domain Constraint_?
> > - Apa itu _Entity Integrity_?
> > - Apa itu _Referential Integrity_?
> > - Apa saja aturan hapus pada _Referential Integrity_?
> 
> > ### Keys (Kunci)
> > 
> > **Keys** adalah atribut atau kombinasi atribut yang berfungsi sebagai pengenal unik untuk setiap baris (tuple) dalam sebuah relasi. Penggunaan keys sangat fundamental untuk membedakan satu record dengan record lainnya dan untuk menghubungkan data antar tabel.
> > 
> > - **Superkey:** Adalah satu atau lebih atribut yang secara kolektif dapat mengidentifikasi sebuah tuple secara unik. Sebuah superkey bisa saja memiliki atribut berlebih. Contoh: Jika `ID` mahasiswa sudah unik, maka `{ID}` adalah superkey. Kombinasi `{ID, Nama}` dan `{ID, Nama, Alamat}` juga merupakan superkey karena sudah pasti unik jika mengandung `ID`.
> >     
> > - **Candidate Key (Kunci Kandidat):** Adalah sebuah superkey yang **minimal**. Artinya, ia adalah superkey yang tidak memiliki atribut berlebih. Jika ada satu saja atribut yang dihilangkan dari candidate key, maka ia tidak lagi bisa menjamin keunikan. Sebuah relasi bisa memiliki lebih dari satu candidate key. Contoh: Mungkin `ID` dan `Nomor_KTP` keduanya bisa menjadi candidate key karena sama-sama unik dan minimal.
> >     
> > - **Primary Key (Kunci Utama):** Adalah **satu** _candidate key_ yang dipilih oleh desainer basis data untuk menjadi pengenal utama dari sebuah relasi. Primary key harus unik dan **tidak boleh bernilai NULL**. Atribut yang dipilih biasanya yang nilainya tidak pernah atau jarang sekali berubah (misalnya, ID lebih baik daripada alamat email).
> >     
> >     - _Simple Key:_ Primary key yang terdiri dari satu atribut saja.
> >     - _Composite Key:_ Primary key yang terdiri dari gabungan beberapa atribut.
> > - **Foreign Key (Kunci Asing):** Adalah sebuah atribut (atau kumpulan atribut) dalam satu tabel yang nilainya merujuk ke **primary key** di tabel lain. Foreign key adalah mekanisme utama untuk menciptakan hubungan atau "link" antar tabel.
> >     
> > - **Ilustrasi ASCII untuk Primary & Foreign Key:**
> >     
> >     ```
> >     Tabel: department
> >     +----------------+----------+
> >     | dept_name (PK) | building |
> >     +----------------+----------+
> >     | Comp. Sci.     | Taylor   |
> >     | Physics        | Watson   |
> >     +----------------+----------+
> >            ^
> >            | (FK merujuk ke PK)
> >            |
> >     Tabel: instructor
> >     +---------+------------+----------------+
> >     | ID (PK) | name       | dept_name (FK) |
> >     +---------+------------+----------------+
> >     | 10101   | Srinivasan | Comp. Sci.     |
> >     | 22222   | Einstein   | Physics        |
> >     +---------+------------+----------------+
> >     ```
> >     
> >     _Nilai 'Comp. Sci.' di tabel `instructor` merujuk ke baris 'Comp. Sci.' di tabel `department`._
> >     
> > 
> > ### Integrity Constraints (Batasan Integritas)
> > 
> > Ini adalah serangkaian aturan yang diterapkan pada data untuk menjaga akurasi, konsistensi, dan validitasnya. DBMS akan secara otomatis menolak operasi apapun (insert, update, delete) yang melanggar batasan ini.
> > 
> > - **Domain Constraint (Batasan Domain):** Aturan paling dasar yang mengharuskan semua nilai dalam suatu kolom harus sesuai dengan domain (tipe data, format, atau rentang nilai) yang telah ditentukan untuk atribut tersebut. Contoh: Kolom `nilai` harus berisi angka antara 0 dan 100.
> >     
> > - **Entity Integrity (Integritas Entitas):** Aturan yang sangat penting: **Atribut yang menjadi bagian dari Primary Key tidak boleh bernilai NULL.** Aturan ini memastikan bahwa setiap baris dalam tabel memiliki pengenal yang valid, lengkap, dan unik, sehingga tidak ada record "anonim".
> >     
> > - **Referential Integrity (Integritas Referensial):** Aturan yang menjaga konsistensi hubungan antar tabel. Aturan ini menyatakan bahwa setiap nilai _foreign key_ harus:
> >     
> >     1. Cocok dengan nilai _primary key_ yang benar-benar ada di tabel yang dirujuk, ATAU
> >     2. Bernilai `NULL` (jika dan hanya jika kolom foreign key tersebut diizinkan untuk NULL).
> > - **Aturan Hapus pada Referential Integrity:** Menentukan tindakan yang diambil DBMS jika sebuah baris di tabel induk (yang memiliki primary key) dihapus:
> >     
> >     - **Restrict:** Mencegah penghapusan baris induk jika masih ada baris anak yang merujuk padanya. Ini adalah opsi teraman.
> >     - **Cascade:** Jika baris induk dihapus, maka semua baris anak yang terkait dengannya akan ikut terhapus secara otomatis. Opsi ini kuat namun harus digunakan dengan hati-hati.
> >     - **Set-to-Null:** Jika baris induk dihapus, nilai foreign key pada baris-baris anak yang terkait akan diubah menjadi `NULL`. Opsi ini hanya bisa digunakan jika kolom foreign key tersebut tidak memiliki batasan `NOT NULL`.

> [!cornell] #### Summary
> 
> Keys (Kunci) adalah fondasi dari model relasional, yang digunakan untuk mengidentifikasi baris secara unik (Primary Key) dan untuk menghubungkan tabel (Foreign Key). Untuk menjaga agar data tetap akurat dan konsisten, sistem basis data menerapkan Batasan Integritas. Aturan utamanya adalah Entity Integrity (Primary Key tidak boleh NULL) dan Referential Integrity (Foreign Key harus merujuk ke Primary Key yang ada atau bernilai NULL).

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Schema Diagram
> 
> Untuk memvisualisasikan seluruh struktur basis data, termasuk semua relasi, kunci, dan hubungan, desainer sering menggunakan **Schema Diagram**. Dalam diagram ini:
> 
> - Setiap relasi digambarkan sebagai sebuah kotak.
> - Atribut-atributnya ditulis di dalam kotak.
> - Atribut yang menjadi **primary key** diberi garis bawah.
> - Hubungan **foreign key** digambarkan sebagai panah yang ditarik dari atribut foreign key di satu tabel ke atribut primary key di tabel yang dirujuk.
> 
> Diagram ini sangat membantu untuk memahami bagaimana semua tabel saling terkait dalam sebuah skema basis data yang kompleks.