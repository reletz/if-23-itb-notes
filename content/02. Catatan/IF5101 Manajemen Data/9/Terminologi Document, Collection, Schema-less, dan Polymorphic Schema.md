---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Terminologi Document, Collection, Schema-less, dan Polymorphic Schema
>
> > ## Questions/Cues
> >
> > - Apa definisi **document** dan **collection**?
> > - Apa itu **embedded document** dan bagaimana ia menghindari join?
> > - Apa arti **schema-less**: fleksibilitas apa yang didapat, tanggung jawab apa yang bertambah?
> > - Apa bedanya **schema-less** dan **polymorphic schema**?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 13-21)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 6
>
> > ### Lima Istilah Kunci
> >
> > ```mermaid
> > flowchart TD
> >     DB["Database"] --> C["Collection<br/>kelompok dokumen sejenis"]
> >     C --> D["Document<br/>himpunan terurut key-value"]
> >     D --> E["Embedded document<br/>dokumen di dalam dokumen"]
> >     C -.-> S["Schema-less<br/>tanpa skema formal"]
> >     S --> P["Polymorphic schema<br/>banyak bentuk dokumen"]
> > ```
> >
> > ### Document
> >
> > **Document** adalah himpunan **terurut** pasangan key-value. Key umumnya string, sedangkan value dapat berupa angka, string, array, dan tipe lain. Contoh: dokumen `employeeName`, `department`, `startDate`, dan `pastProjectCodes` yang berisi array kode proyek.
> >
> > ### Embedded Document
> >
> > Bila ingin menyimpan informasi proyek bersama data karyawan, dokumen proyek (`projectCode`, `projectName`, `projectManager`) dapat **disematkan** di dalam dokumen karyawan. Embedding efisien untuk data yang sering dipakai bersama dan **menghindari proses join**. Pada model relasional, data entitas berbeda dipisah di tabel berbeda sehingga mengambilnya bersamaan memerlukan join.
> >
> > ### Collection
> >
> > **Collection** adalah sekelompok dokumen yang biasanya membahas entitas yang sama (karyawan, produk, log event, profil pelanggan). Collection memungkinkan operasi pada kelompok dokumen terkait dan mendukung struktur data tambahan seperti **index**. Analogi: index di belakang buku memetakan istilah ke nomor halaman sehingga lebih cepat daripada memindai seluruh buku.
> >
> > ### Schema-less
> >
> > Document database **tidak mewajibkan** pemodel mendefinisikan struktur dokumen (skema) secara formal.
> >
> > - **Lebih fleksibel**: developer dan aplikasi dapat menambahkan pasangan key-value baru kapan saja.
> > - **Lebih bertanggung jawab**: DBMS tidak dapat menegakkan aturan berbasis struktur. Aturan ditegakkan lewat **kode aplikasi**; pengecualiannya hanya pengenal unik (unique identifier).
> >
> > Akibatnya, kode validasi data dan penanganan error tersebar di seluruh aplikasi untuk mengompensasi tidak adanya pemeriksaan otomatis berbasis skema.
> >
> > ### Polymorphic Schema
> >
> > Document database bersifat **polimorfik** karena dokumen dalam collection dapat memiliki banyak bentuk. Bedanya: *schema-less* berarti tidak ada definisi struktur formal, sedangkan *polymorphic schema* berarti **banyak struktur dokumen tersirat** di dalam himpunan dokumen sebuah collection.
> >
> > | Konsep | Inti |
> > | --- | --- |
> > | Document | Himpunan terurut key-value |
> > | Collection | Grup dokumen sejenis, bisa di-index |
> > | Embedded document | Dokumen di dalam dokumen, tanpa join |
> > | Schema-less | Tak ada skema formal; validasi di aplikasi |
> > | Polymorphic schema | Banyak bentuk dokumen dalam satu collection |

> [!cornell] #### Summary
>
> **Document** adalah himpunan terurut key-value; **collection** mengelompokkan dokumen sejenis dan mendukung **index**. **Embedded document** menyimpan data terkait dalam satu dokumen sehingga **menghindari join**. Sifat **schema-less** memberi fleksibilitas menambah field kapan saja, tetapi memindahkan tanggung jawab validasi ke **kode aplikasi**. **Polymorphic schema** berarti satu collection memuat dokumen dengan beragam struktur tersirat.

> [!ad-libitum]- Additional Information
>
> #### Schema Validation Opsional
>
> MongoDB menyediakan `$jsonSchema` validator pada collection untuk menegakkan field wajib dan tipe data bila diperlukan, sehingga "schema-less" sebenarnya spektrum: skema bisa longgar atau ketat sesuai kebutuhan.
>
> #### Padanan Istilah Relasional
>
> Database ≈ database, collection ≈ tabel, document ≈ baris, field ≈ kolom. Perbedaannya, baris relasional seragam sedangkan dokumen boleh beragam.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat collection `employees` dengan dokumen berbeda struktur, lalu tulis fungsi validasi aplikasi.
> 2. Tambahkan `$jsonSchema` validator dan amati error saat insert dokumen tidak valid.
>
> #### Bacaan Lanjutan
>
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 6.
> - Dokumentasi MongoDB: Schema Validation.
