---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Normalisasi, Denormalisasi, dan Embedding vs Referencing
>
> > ## Questions/Cues
> >
> > - Apa tiga fase desain document database?
> > - Mengapa **join** mahal dan bagaimana denormalisasi mengatasinya?
> > - Apa bedanya **embedding** dan **referencing**?
> > - Faktor apa yang menentukan pilihan embed atau reference?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 28-38)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 7
> > - Rossel & Manna, "A Big Data Modeling Methodology for NoSQL Document Databases", *Database Systems Journal* XI/2020
>
> > ### Fase Desain Document Database
> >
> > ```mermaid
> > flowchart TD
> >     H["High level<br/>ER model + query patterns"] --> L["Logical level<br/>Document Interaction Diagram<br/>+ JSON Schema per tipe dokumen"]
> >     L --> P["Physical level<br/>index, sharding, replikasi,<br/>tipe data"]
> > ```
> >
> > - **High level**: model konseptual (misal ER) dan **query pattern** dari analisis kebutuhan.
> > - **Logical level**: tipe dokumen dan hubungannya, digambarkan dengan **Document Interaction Diagram (DID)**; tiap tipe dispesifikasikan dengan **JSON Schema**.
> > - **Physical level**: analisis dan optimasi model logis, seperti pembuatan index, sharding, distribusi dan replikasi data.
> >
> > ### Normalisasi dan Biaya Join
> >
> > **Normalisasi** mengorganisasi data ke tabel-tabel untuk mengurangi **anomali** (inkonsistensi data). Namun model ternormalisasi kadang berkinerja buruk: laporan yang memuat atribut dari dua tabel memerlukan **join** lewat nilai bersama (foreign key). Join dieksekusi misalnya dengan **nested loop join**, yang memeriksa setiap pasangan tuple sehingga mahal; alternatifnya indexed nested loop, merge-join, dan hash-join. Query optimizer memilih cara terbaik, tetapi join pada data besar tetap memakan waktu dan sumber daya.
> >
> > ### Denormalisasi
> >
> > **Denormalisasi** membalik normalisasi dengan memasukkan **data redundan**. Risikonya anomali dan penyimpanan tambahan, tetapi keuntungannya kinerja: tidak perlu membaca banyak tabel dan melakukan join.
> >
> > Contoh: `order_items` hanya menyimpan `product_ID: 3648`, sedangkan detail ada di collection `products`. Dengan dua collection, perlu dua lookup. Setelah denormalisasi, `product` disematkan (`product_description`, `product_name`, `product_category`, `list_price`) di dokumen order item sehingga cukup **satu lookup**, dan `product_ID` tak lagi diperlukan.
> >
> > ### Embedding vs Referencing
> >
> > - **Embedded document**: dokumen disimpan di dalam dokumen lain, membentuk struktur hierarkis bersarang.
> > - **Referenced document**: dokumen menyimpan **referensi** (biasanya `ObjectId`) ke dokumen di collection lain, mirip foreign key.
> >
> > | | Embedding | Referencing |
> > | --- | --- | --- |
> > | Relasi cocok | One-to-one, one-to-many (misal komentar pada satu post) | Many-to-many (mahasiswa-mata kuliah) |
> > | Ukuran | Sub-data kecil | Subdokumen besar atau diakses mandiri (misal review produk) |
> > | Access pattern | Sering diakses bersama | Diakses terpisah atau jarang |
> > | Update | Perlu update atomik pada data terkait | Bagian data diubah sering dan independen |
> > | Kompleksitas | Model sederhana, hierarkis | Relasi kompleks dan berevolusi |
> >
> > Empat faktor penentu: **access pattern**, **ukuran dan pertumbuhan data**, **frekuensi update**, dan **kompleksitas skema**.

> [!cornell] #### Summary
>
> Desain document database melalui fase **high level (ER + query pattern)**, **logical (DID + JSON Schema)**, dan **physical (index, sharding, replikasi)**. Normalisasi mengurangi anomali tetapi menimbulkan **join** yang mahal; **denormalisasi** menukar redundansi dengan kinerja baca. Di document database, wujudnya adalah **embedding** (data bersarang, satu lookup) atau **referencing** (ObjectId ke collection lain). Pilihan ditentukan oleh **access pattern, ukuran, frekuensi update, dan kompleksitas skema**.

> [!ad-libitum]- Additional Information
>
> #### Aturan Praktis
>
> "Data yang dibaca bersama disimpan bersama." Mulai dari query terpenting, lalu desain dokumen agar query tersebut selesai dengan satu pembacaan. MongoDB juga membatasi ukuran dokumen (16 MB), sehingga array tak terbatas sebaiknya direferensikan.
>
> #### Kaitan Materi Sebelumnya
>
> Bandingkan dengan [[Decomposition dan Lossy Decomposition]] dan [[Third Normal Form dan Perbandingan dengan BCNF]], serta [[Join Expressions]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Rancang `orders`, `order_items`, `products` dalam dua versi (embed dan reference), lalu ukur jumlah query per use case.
> 2. Gambar DID untuk sistem toko online.
>
> #### Bacaan Lanjutan
>
> - Rossel & Manna (2020), makalah metodologi pemodelan NoSQL document.
> - Dokumentasi MongoDB: Data Modeling Introduction.
