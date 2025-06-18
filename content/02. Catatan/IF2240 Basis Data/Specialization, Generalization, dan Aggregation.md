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
> > - Apa itu _Specialization_?
> > - Apa itu _Generalization_?
> > - Bagaimana notasi untuk Specialization/Generalization?
> > - Apa saja batasan pada Generalization?
> > - Apa itu _Aggregation_?
> > - Kapan _Aggregation_ digunakan?
> > - Bagaimana notasi untuk _Aggregation_?
> 
> > ### Specialization (Spesialisasi)
> > 
> > - **Definisi:** Sebuah proses desain **top-down** di mana kita mengidentifikasi sub-grup di dalam sebuah _entity set_ yang memiliki atribut atau relasi yang unik, yang tidak dimiliki oleh semua anggota _entity set_ tersebut.
> > - **Contoh:** Dalam _entity set_ `person`, kita bisa mengidentifikasi sub-grup `student` (yang memiliki atribut `tot_cred`) dan `instructor` (yang memiliki atribut `salary`).
> > - **Konsep:** Sub-grup ini disebut juga _subclass_, dan _entity set_ utamanya adalah _superclass_. _Subclass_ mewarisi semua atribut dan relasi dari _superclass_-nya (disebut _attribute inheritance_).
> > - Dapat didefinisikan Spesialisasi yang berbeda untuk sebuah entitas.
> > ![[Pasted image 20250617025434.png]]
> > 
> > ### Generalization (Generalisasi)
> > 
> > - **Definisi:** Sebuah proses desain **bottom-up** yang merupakan kebalikan dari spesialisasi. Kita mengidentifikasi beberapa _entity set_ yang memiliki fitur-fitur yang sama, lalu menggabungkan fitur-fitur tersebut ke dalam satu _entity set_ level yang lebih tinggi (_superclass_).
> > - **Contoh:** Entitas `car` dan `truck` sama-sama memiliki atribut `vehicle_id` dan `license_plate`. Kita bisa menggeneralisasi keduanya menjadi _superclass_ `vehicle`.
> > 
> > ### Notasi dan Batasan
> > 
> > - **Notasi Grafis:** Specialization/Generalization direpresentasikan dengan sebuah **segitiga berlabel "ISA"** yang menunjuk dari _subclass_ ke _superclass_.
> > - **Ilustrasi ASCII (Generalization):**
> >     
> >     ```
> >               +-----------+
> >               |  person   | <---- Superclass
> >               +-----------+
> >                    ^
> >                    |
> >                 /-----\
> >                 | ISA |
> >                 \-----/
> >                 /     \
> >                /       \
> >         +----------+ +------------+
> >         | student  | | instructor | <---- Subclasses
> >         +----------+ +------------+
> >     ```
> >     
> > - **Batasan pada Generalization:**
> >     - **User-defined vs. Condition-defined:**
> >         - _User-defined_: Keanggotaan dalam sebuah sub-grup ditentukan **secara otomatis** oleh sebuah kondisi atau nilai atribut di entitas induk (_superclass_).
> >         - _Condition-defined_: Tidak ada kondisi otomatis. Pengguna sistem (misalnya, operator data entry) yang secara **manual menentukan** keanggotaan sebuah entitas.
> >     - **Disjoint vs. Overlapping:**
> >         - _Disjoint:_ Sebuah entitas hanya bisa menjadi anggota dari **satu** _subclass_. Ditandai dengan menuliskan "Disjoint" pada ISA yang bersesuaian.
> >         - _Overlapping:_ Sebuah entitas bisa menjadi anggota dari **beberapa** _subclass_ secara bersamaan (misalnya, seseorang bisa menjadi mahasiswa sekaligus instruktur)(Default).
> >     - **Total vs. Partial:**
> >         - _Total:_ Setiap entitas di _superclass_ **harus** termasuk dalam salah satu _subclass_.
> >         - _Partial:_ Sebuah entitas di _superclass_ **boleh tidak** termasuk dalam _subclass_ manapun.
> >        
> >   ![[Pasted image 20250617025706.png]]
> > 
> > ### Aggregation (Agregasi)
> > 
> > - **Definisi:** Sebuah abstraksi di mana himpunan relasi (_relationship sets_) diperlakukan seolah-olah sebagai _entity sets_ level yang lebih tinggi.
> > - **Tujuan:** Untuk memodelkan situasi di mana kita perlu membuat sebuah relasi **ke sebuah relasi lain**. ER model secara dasar tidak mengizinkan ini, sehingga kita perlu "mengagregasi" relasi target menjadi sebuah objek semu.
> > - **Contoh Kasus:** Misalkan ada mahasiswa (`student`) yang mengerjakan proyek (`project`), dimodelkan dengan relasi `proj_guide`. Kemudian, seorang dosen (`instructor`) perlu memberikan evaluasi (`eval_for`) terhadap pengerjaan proyek tersebut. Relasi `eval_for` ini bukan ke `student` atau `project` secara terpisah, melainkan ke **keseluruhan relasi `proj_guide`** itu sendiri.
> > - **Notasi Grafis:** Relasi yang akan diagregasi (beserta entitas-entitasnya) dimasukkan ke dalam sebuah **kotak besar**.
> > - **Ilustrasi ASCII:**
> >     
> >     ```
> >     +------------------------------------------------------+
> >     |                                                      |
> >     |  +---------+       +------------+       +---------+  |
> >     |  | student |-------< proj_guide >-------| project |  | <--- Aggregation
> >     |  +---------+       +------------+       +---------+  |
> >     |                                                      |
> >     +------------------------------------------------------+
> >                          |
> >                          |
> >                    +<----------+
> >                    | eval_for  |
> >                    +---------->+
> >                          |
> >                          |
> >                    +------------+
> >                    | instructor |
> >                    +------------+
> >     ```
> >     
> > 
> > ### Studi Kasus: Hirarki Universitas
> > 
> > Permasalahan:
> > 
> > "Di sebuah universitas, ada person yang bisa menjadi employee atau student. Seorang employee selanjutnya bisa menjadi instructor atau staff. Tunjukkan pemodelan hirarki ini."
> > 
> > Analisis:
> > 
> > Ini adalah contoh Specialization/Generalization bertingkat. person adalah superclass utama. employee dan student adalah subclass dari person. Kemudian, employee sendiri menjadi superclass untuk instructor dan staff.
> > 
> > **Diagram ASCII Solusi:**
> > 
> > ```
> >                        +---------+
> >                        | person  |
> >                        +---------+
> >                             ^
> >                             |
> >                          /-----\
> >                          | ISA |
> >                          \-----/
> >                         /       \
> >                  +----------+  +---------+
> >                  | employee |  | student |
> >                  +----------+  +---------+
> >                       ^
> >                       |
> >                    /-----\
> >                    | ISA |
> >                    \-----/
> >                   /       \
> >            +------------+ +-------+
> >            | instructor | | staff |
> >            +------------+ +-------+
> > ```

> [!cornell] #### Summary
> 
> Model ER dapat diperluas untuk menangani skenario yang lebih kompleks. Specialization (top-down) dan Generalization (bottom-up) digunakan untuk memodelkan hubungan superclass-subclass (hirarki 'ISA'), lengkap dengan batasan seperti disjoint/overlapping dan total/partial. Di sisi lain, Aggregation digunakan untuk memperlakukan sebuah relasi sebagai satu unit entitas, yang memungkinkan kita untuk membuat relasi baru yang menunjuk ke relasi yang sudah ada tersebut.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Perbandingan dengan UML
> 
> Konsep Specialization dan Generalization dalam ERD sangat mirip dengan konsep pewarisan (inheritance) dalam diagram kelas UML (Unified Modeling Language). Keduanya menggunakan notasi panah yang menunjuk dari kelas/entitas anak ke kelas/entitas induk untuk menunjukkan hubungan 'ISA'. UML juga memiliki mekanisme untuk merepresentasikan agregasi dan komposisi, meskipun notasinya sedikit berbeda. Bagi mereka yang sudah terbiasa dengan pemodelan berorientasi objek, konsep-konsep ini akan terasa sangat familiar.