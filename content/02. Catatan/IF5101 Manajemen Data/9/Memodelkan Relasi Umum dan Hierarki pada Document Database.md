---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Memodelkan Relasi Umum dan Hierarki pada Document Database
>
> > ## Questions/Cues
> >
> > - Bagaimana memodelkan relasi **one-to-many** dan **many-to-many**?
> > - Apa tiga pola untuk memodelkan **hierarki**?
> > - Kapan denormalisasi berlebihan merugikan?
> > - Kapan boleh "say no to joins" dan kapan join di kode aplikasi dipakai?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 39-49)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 7
>
> > ### One-to-Many
> >
> > Contoh: satu order punya banyak order item, satu gedung punya banyak apartemen, satu organisasi punya banyak departemen. Polanya: entitas **"one" menjadi dokumen utama**, dan entitas **"many" menjadi array dokumen tersemat**. Contoh slide: pelanggan `customer_id: 76123` dengan array `address` berisi dua alamat.
> >
> > ### Many-to-Many
> >
> > Contoh: dokter-pasien, user-group OS, mahasiswa-mata kuliah, orang-klub. Dimodelkan dengan **dua collection**, satu per entitas, dan masing-masing menyimpan **daftar identifier** entitas terkait:
> >
> > - `Courses`: `courseID`, `title`, `instructor`, `credits`, `enrolledStudents: ['S1837', 'S3737', ...]`
> > - `Students`: `studentID`, `name`, `gradYear`, `courses: ['C1667', 'C2873', ...]`
> >
> > Pola ini meminimalkan duplikasi data karena memakai ID, bukan dokumen tersemat.
> >
> > ### Hierarki
> >
> > Hierarki menggambarkan relasi **parent-child** atau **part-subpart**. Contoh: kategori produk `Product Categories → Office Supplies → Writing Instruments → Pencils`.
> >
> > ```mermaid
> > flowchart TD
> >     P01["P01 Product Categories"] --> PC37["PC37 Office Supplies"]
> >     PC37 --> PC72["PC72 Writing Instruments"]
> >     PC72 --> PC233["PC233 Pencils"]
> > ```
> >
> > | Pola | Isi dokumen | Cocok bila |
> > | --- | --- | --- |
> > | **Parent reference** | `parentID` | Sering menampilkan suatu instans lalu tipe yang lebih umum |
> > | **Child references** | `childrenIDs: [...]` | Rutin mengambil anak atau subpart |
> > | **List of ancestors** | `ancestors: ['PC72','PC37','P01']` | Perlu path lengkap ke root dalam **satu read**; kelemahan: perubahan hierarki bisa memerlukan banyak write |
> >
> > ### Jangan Berlebihan Mendenormalisasi
> >
> > Dokumen besar berarti **lebih sedikit dokumen per blok data** yang dibaca dari penyimpanan, sehingga total pembacaan blok bisa naik. Contoh: `Order_Items` cukup menyimpan `product_name` secara redundan, sedangkan `product_description`, `list_price`, dan `product_category` tetap di `Products`. Penyimpanan sedikit bertambah, tetapi sebagian besar query selesai dengan satu lookup.
> >
> > ### Kadang Katakan Tidak pada Join
> >
> > Bila menyimpan data terkait di dua collection memang desain terbaik, join boleh dilakukan di **kode aplikasi** (loop atas `collection1` dan `collection2`).
> >
> > ### Rangkuman Keseimbangan
> >
> > Normalisasi mengurangi anomali, denormalisasi meningkatkan kinerja query. Jadikan **query sebagai panduan**: terlalu ternormalisasi menyebabkan query butuh join, terlalu terdenormalisasi menghasilkan dokumen besar yang memicu pembacaan data tak perlu.

> [!cornell] #### Summary
>
> **One-to-many** dimodelkan dengan dokumen induk berisi array dokumen tersemat; **many-to-many** dengan dua collection yang saling menyimpan **daftar ID**. **Hierarki** memakai **parent reference**, **child references**, atau **list of ancestors** sesuai pola akses. Denormalisasi **jangan berlebihan** karena dokumen besar menambah pembacaan blok; join di aplikasi diterima bila perlu. Kunci utamanya adalah menyeimbangkan normalisasi dan denormalisasi berdasarkan **query**.

> [!ad-libitum]- Additional Information
>
> #### Pola Hierarki Lain
>
> Selain tiga pola di slide, dikenal **materialized path** (`path: "/P01/PC37/PC72"`) dan **nested set**. Materialized path memudahkan query subtree dengan regex prefix.
>
> #### Join di Database
>
> MongoDB menyediakan `$lookup` pada aggregation pipeline sebagai alternatif join di kode aplikasi, meski tidak seefisien join relasional.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan relasi mahasiswa-mata kuliah dan tulis query "mata kuliah milik mahasiswa X" dan sebaliknya.
> 2. Bandingkan ketiga pola hierarki untuk query "semua leluhur" dan "semua anak".
>
> #### Bacaan Lanjutan
>
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 7.
> - MongoDB: "Model Tree Structures".
