---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Jenis-jenis NoSQL Database
>
> > ## Questions/Cues
> >
> > - Apa saja empat jenis utama NoSQL database?
> > - Bagaimana model data dan operasi dasar **key-value store**?
> > - Apa bedanya **column store** dengan row store?
> > - Apa itu **document store** dan bagaimana contoh dokumen CouchDB?
> > - Kapan **graph database** menjadi pilihan?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to NoSQL Databases (Pages 22-37)
> > - Hare, K. W. — *A Comparison of SQL and NoSQL Database* (ISO/IEC JTC1 SC32 WG3)
>
> > ### Peta Jenis NoSQL
> >
> > Membahas NoSQL tidak sederhana karena ada banyak jenis. Empat yang utama:
> >
> > ```mermaid
> > flowchart TD
> >     N["NoSQL Database"]
> >     N --> KV["Key-Value Store<br/>hash table dari key"]
> >     N --> CS["Column Store<br/>blok per kolom"]
> >     N --> DS["Document Store<br/>(key, dokumen JSON/XML)"]
> >     N --> GR["Graph Database<br/>node dan edge"]
> >     KV --> KVe["Redis, Riak, Voldemort,<br/>MemCacheDB"]
> >     CS --> CSe["HBase, Cassandra,<br/>Actian Vector"]
> >     DS --> DSe["MongoDB, CouchDB"]
> >     GR --> GRe["Neo4j, ArangoDB"]
> > ```
> >
> > ### Key-Value Store
> >
> > Antarmuka sangat sederhana: model data **(key, value)** dengan operasi `Insert(key, value)`, `Fetch(key)`, `Update(key)`, `Delete(key)`. Implementasi menekankan efisiensi, skalabilitas, dan *fault tolerance*: record **didistribusikan ke node berdasarkan key**, direplikasi, dengan transaksi **single-record** dan **eventual consistency**.
> >
> > | Kelebihan | Kekurangan |
> > | --- | --- |
> > | Sangat cepat dan scalable | Banyak struktur data (objek) sulit dimodelkan sebagai pasangan key-value |
> > | Model sederhana | Hanya cocok bila query lewat **satu key** |
> > | Mudah didistribusikan secara horizontal | |
> >
> > Contoh: **Project Voldemort** (LinkedIn), **MemCacheDB**, **Microsoft AppFabric Cache** (legacy), **Redis** (in-memory, juga sebagai cache dan message broker), **Riak** (berbasis Dynamo Amazon). Dibahas lebih dalam di [[Istilah Pemodelan dan Arsitektur Key-Value Database]].
> >
> > ### Column Store
> >
> > Setiap blok penyimpanan berisi data dari **satu kolom saja**, memakai *sparse, distributed, multi-dimensional sorted map*. Lebih efisien daripada row/document store jika:
> >
> > - banyak record **di-insert bersamaan** sehingga update blok kolom bisa digabung, dan
> > - pembacaan hanya mengakses **sebagian kolom** dari suatu record.
> >
> > Pada **row-oriented**, nilai satu baris (`1, John, john@foo.com, Sales`) disimpan berdekatan; pada **column-oriented**, seluruh nilai `username` disimpan berdekatan, seluruh `email` berdekatan, dan seterusnya. Contoh: **Hadoop/HBase** (meniru Google Bigtable; dipakai Yahoo, Facebook), **Apache Cassandra** (wide-column terdistribusi), **Actian Vector** (column store terintegrasi dengan database SQL).
> >
> > ### Document Store
> >
> > Seperti key-value, tetapi value-nya adalah **dokumen** (JSON, XML, atau format semi-terstruktur lain): model **(key, document)**. Operasi dasarnya sama, namun *fetch* dapat dilakukan **berdasarkan isi dokumen**. Query memakai JavaScript atau bahasa khusus, agregasi dengan **Map/Reduce**, dan index berbasis **B-Tree**. Cocok untuk beragam aplikasi karena model fleksibel, bisa query pada field apa pun, dan dokumen terpetakan alami ke objek bahasa pemrograman modern.
> >
> > Contoh: **CouchDB** (dipakai BBC 2009-2011) dan **MongoDB** (dipakai IBM, Cisco, SAP). Dokumen CouchDB memiliki:
> >
> > - `_id`: GUID (diberikan atau dibangkitkan CouchDB),
> > - `_rev`: nomor revisi, mekanisme **versioning**,
> > - tag bebas seperti `type`, `author`, `title`, `body`, `creation_timestamp` (schema-less; validasi dapat dilakukan belakangan lewat rutin buatan pengguna).
> >
> > ### Graph Database
> >
> > Model data berupa **node dan edge**: node dapat memiliki *properties* (termasuk ID) dan edge dapat memiliki *label* atau peran. Berbasis **teori graf**, **scale vertically** (tanpa clustering), dan memudahkan penggunaan algoritma graf. Cocok bila **relasi adalah inti aplikasi**, misalnya jejaring sosial. Contoh: **Neo4j** (graph native hingga level storage) dan **ArangoDB** (multi-model: graph, dokumen JSON, dan key-value dalam satu core).
> >
> > ### Jenis Lain
> >
> > XML database, **Codasyl** (model jaringan), object-oriented database, time-series database, dan seterusnya.

> [!cornell] #### Summary
>
> NoSQL terdiri dari empat jenis utama: **key-value store** (pasangan key-value, sangat cepat dan scalable tetapi query hanya lewat key), **column store** (blok per kolom, efisien untuk insert massal dan pembacaan sebagian kolom; HBase, Cassandra), **document store** (key-dokumen JSON/XML, query pada isi dokumen; MongoDB, CouchDB), dan **graph database** (node-edge untuk data yang kaya relasi; Neo4j). Jenis lain mencakup XML, Codasyl, object-oriented, dan time-series database.

> [!ad-libitum]- Additional Information
>
> #### Memilih jenis database
>
> | Kebutuhan | Pilihan umum |
> | --- | --- |
> | Cache, sesi, konfigurasi cepat | Key-value (Redis) |
> | Analitik, data log, *wide table* | Column store (Cassandra, HBase) |
> | Konten semi-terstruktur, katalog produk | Document (MongoDB) |
> | Rekomendasi, jaringan sosial, deteksi fraud | Graph (Neo4j) |
>
> #### Contoh query
>
> Document: `db.users.find({ "address.city": "Bandung" })` di MongoDB. Graph: `MATCH (a:Person)-[:FRIEND]->(b) RETURN b` di Cypher (Neo4j).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Simpan 5 data mahasiswa dalam format JSON, lalu muat ke MongoDB dan lakukan query berdasarkan field bersarang.
> 2. Modelkan graf pertemanan 10 orang di Neo4j dan cari teman-dari-teman.
>
> #### Bacaan Lanjutan
>
> - Abadi, D. *Distinguishing Two Major Types of Column-Stores* (2010).
> - Kovács, K. *Cassandra vs MongoDB vs CouchDB vs Redis vs Riak vs HBase comparison*.
> - Dean, J. & Ghemawat, S. *MapReduce: Simplified Data Processing on Large Clusters* (2004).
