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
> > - Apa itu _Cardinality Constraint_?
> > - Bagaimana notasi kardinalitas di ERD?
> > - Apa bedanya _Total_ dan _Partial Participation_?
> > - Bagaimana menentukan Primary Key untuk sebuah _Relationship Set_?
> > - Apa itu _Weak Entity Set_?
> > - Apa itu _discriminator_?
> > - Bagaimana notasi untuk _Weak Entity Set_?
> 
> > ### Mapping Cardinality Constraints (Batasan Kardinalitas)
> > 
> > - **Definisi:** Sebuah aturan bisnis yang menyatakan jumlah **maksimum** entitas dari satu himpunan yang dapat berelasi dengan satu entitas dari himpunan lain.
> > - **Jenis Kardinalitas Biner:**
> >     - **One-to-One (1:1):** Satu entitas A berhubungan dengan paling banyak satu entitas B, dan sebaliknya.
> >     - **One-to-Many (1:N):** Satu entitas A bisa berhubungan dengan banyak entitas B, tetapi satu entitas B hanya bisa berhubungan dengan satu entitas A.
> >     - **Many-to-One (N:1):** Banyak entitas A bisa berhubungan dengan satu entitas B, tetapi satu entitas B bisa berhubungan dengan banyak entitas A. (Kebalikan dari 1:N).
> >     - **Many-to-Many (N:M):** Satu entitas A bisa berhubungan dengan banyak entitas B, dan sebaliknya.
> > - **Notasi Grafis:**
> >     - Garis dengan **panah (`->`)** menuju entitas berarti batasan "satu" (_one_).
> >     - Garis **tanpa panah (`-`)** menuju entitas berarti batasan "banyak" (_many_).
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     // One-to-One: Satu dosen mengepalai tepat satu departemen.
> >     (instructor) ----< (manages) >---- (department)
> >     
> >     // One-to-Many: Satu instruktur bisa menjadi pembimbing banyak mahasiswa.
> >     (instructor) ------< (advisor) >------ (student)
> >     ```
> >     
> > 
> > ### Participation Constraints (Batasan Partisipasi)
> > 
> > - **Definisi:** Aturan yang menentukan apakah keberadaan sebuah entitas **wajib** atau **tidak wajib** untuk berpartisipasi dalam sebuah relasi.
> > - **Jenis Partisipasi:**
> >     - **Total Participation:** Setiap entitas dalam himpunan **wajib** berpartisipasi dalam setidaknya satu relasi. Digambarkan dengan **garis ganda (`=`)** dari entitas ke relasi.
> >     - **Partial Participation:** Entitas **boleh tidak** berpartisipasi dalam relasi apapun. Digambarkan dengan **garis tunggal (`-`)**.
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     // Setiap mahasiswa (student) HARUS punya seorang pembimbing (advisor).
> >     // Partisipasi student bersifat TOTAL.
> >     (instructor) ------< (advisor) >====== (student)
> >     ```
> >     
> > 
> > ### Weak Entity Sets (Himpunan Entitas Lemah)
> > 
> > - **Definisi:** Sebuah _entity set_ yang tidak memiliki cukup atribut untuk membentuk _primary key_ sendiri. Keberadaan dan identitas uniknya bergantung pada _entity set_ lain yang lebih kuat, yang disebut **identifying entity**.
> > - **Komponen Kunci:**
> >     - **Identifying Relationship:** Relasi yang menghubungkan _weak entity_ dengan _identifying entity_-nya. Digambarkan dengan **belah ketupat ganda**.
> >     - **Discriminator (atau Partial Key):** Satu atau lebih atribut pada _weak entity_ yang berfungsi untuk membedakannya dari entitas lemah lain yang berhubungan dengan _identifying entity_ yang sama. Diberi **garis bawah putus-putus**.
> > - **Kunci Utama Entitas Lemah:** Dibentuk dari gabungan _primary key_ dari _identifying entity_ ditambah dengan _discriminator_ dari _weak entity_ itu sendiri.
> > - **Notasi Grafis:** _Weak entity set_ digambarkan dengan **persegi panjang ganda**.
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     +---------------+        +<==============>+        +===============+
> >     |    course     |        |  has_section   |        |    section    |
> >     | (Identifying) |        | (Identifying)  |        |     (Weak)    |
> >     |---------------|        |----------------|        |---------------|
> >     | _course_id_   |========|                |--------| _ _sec_id_ _  |
> >     | title         |        |                |        | semester      |
> >     +---------------+        +<==============>+        | year          |
> >                                                        +===============+
> >     ```
> >     
> >     _PK untuk `section` adalah (`course_id`, `sec_id`, `semester`, `year`)._
> > 
> > ### Studi Kasus: Kamar Hotel
> > 
> > Permasalahan:
> > 
> > "Sebuah Hotel memiliki banyak Room (kamar). Nomor kamar (room_no) hanya unik di dalam satu hotel saja (misalnya, Hotel A dan Hotel B sama-sama punya kamar nomor 101). Jadi, sebuah kamar tidak bisa diidentifikasi hanya dengan nomornya. Setiap hotel harus memiliki setidaknya satu kamar. Buatlah model ER untuk kasus ini."
> > 
> > **Analisis:**
> > 
> > - `Room` adalah **Weak Entity Set** karena `room_no` saja tidak unik secara global.
> > - `Hotel` adalah **Identifying Entity Set**.
> > - Hubungan `has_rooms` adalah **Identifying Relationship**.
> > - Partisipasi `Hotel` dalam `has_rooms` bersifat **total** (setiap hotel harus punya kamar).
> > - `room_no` adalah **discriminator** untuk `Room`.
> > 
> > **Diagram ASCII Solusi:**
> > 
> > ```
> >   +---------------+        +<==============>+        +===============+
> >   |     Hotel     |        |   has_rooms    |        |      Room     |
> >   |---------------|        |----------------|        |---------------|
> >   | _hotel_id_    |========|                |--------| _ _room_no_ _ |
> >   | hotel_name    |        |                |        | type          |
> >   +---------------+        +<==============>+        +===============+
> > ```

> [!cornell] #### Summary
> 
> Selain mendefinisikan entitas dan relasi dasar, Model ER diperkaya dengan batasan (constraints). Batasan Kardinalitas (1:1, 1:N, N:M) mengatur jumlah maksimum hubungan antar entitas. Batasan Partisipasi (total atau partial) menentukan apakah suatu entitas wajib terlibat dalam sebuah hubungan. Kasus khusus terjadi pada Weak Entity Set, yaitu entitas yang keberadaannya bergantung pada entitas lain dan diidentifikasi melalui gabungan primary key dari entitas induknya dan discriminator-nya sendiri.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Primary Key untuk Relationship Sets
> 
> Saat model ER diterjemahkan menjadi tabel, himpunan relasi juga menjadi tabel. Kunci utama (Primary Key) untuk tabel relasi ini ditentukan oleh kardinalitasnya:
> 
> - **Many-to-Many:** Primary Key adalah gabungan dari Primary Key semua entitas yang berpartisipasi.
> - **One-to-Many:** Primary Key dari sisi "Many" sudah cukup untuk menjadi Primary Key tabel relasi.
> - **One-to-One:** Primary Key dari salah satu entitas bisa dipilih untuk menjadi Primary Key tabel relasi.
> 
> Memahami ini penting untuk langkah selanjutnya, yaitu menerjemahkan diagram ER ke skema relasional (tabel).