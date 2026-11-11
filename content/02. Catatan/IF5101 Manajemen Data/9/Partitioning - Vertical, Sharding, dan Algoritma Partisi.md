---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Partitioning - Vertical, Sharding, dan Algoritma Partisi
>
> > ## Questions/Cues
> >
> > - Apa bedanya **vertical** dan **horizontal partitioning**?
> > - Apa itu **shard** dan **shard key**?
> > - Apa perbedaan **range**, **hash**, dan **list partitioning**?
> > - Mengapa sharding penting untuk skalabilitas?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 68-75)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 7
>
> > ### Dua Jenis Partisi
> >
> > ```mermaid
> > flowchart TD
> >     P["Partitioning"] --> V["Vertical<br/>pisah kolom"]
> >     P --> H["Horizontal (sharding)<br/>pisah dokumen/baris"]
> >     H --> R["Range"]
> >     H --> Ha["Hash"]
> >     H --> L["List"]
> > ```
> >
> > ### Vertical Partitioning
> >
> > Teknik meningkatkan kinerja dengan **memisahkan kolom** suatu tabel relasional ke beberapa tabel. Berguna bila sebagian kolom sering diakses dan sebagian jarang. Lebih sering dipakai pada RDBMS daripada document database.
> >
> > ### Horizontal Partitioning (Sharding)
> >
> > Membagi database **berdasarkan dokumen** (atau baris pada relasional). Bagian-bagiannya disebut **shard** dan disimpan di **server berbeda**. Sharding adalah proses fundamental yang memungkinkan banyak document database **berskala** menghadapi banyak pengguna atau beban berat. Bila klaster menerapkan **replikasi**, satu shard tersedia di beberapa server.
> >
> > ### Shard Key
> >
> > **Shard key** adalah satu atau beberapa field yang ada di semua dokumen dalam collection dan dipakai untuk memisahkan dokumen. Kandidat: ID dokumen unik, nama, tanggal (misal tanggal pembuatan), kategori atau tipe, wilayah geografis. Shard key menjadi **input algoritma partisi** yang menghasilkan shard tujuan.
> >
> > ### Algoritma Partisi
> >
> > | Algoritma | Cara kerja | Contoh | Cocok untuk |
> > | --- | --- | --- | --- |
> > | **Range** | Dokumen dikelompokkan menurut rentang nilai shard key | Shard bulanan menurut `creation date`: Shard-1 Januari 2015, Shard-2 Februari 2015 | Nilai berurutan (tanggal, angka) |
> > | **Hash** | Fungsi hash menentukan lokasi; nilai tersebar merata | Klaster 8 server, hash menghasilkan 1-8, dokumen terbagi kira-kira sama | Distribusi merata |
> > | **List** | Daftar nilai menentukan lokasi | Tipe produk (elektronik, peralatan, rumah tangga, buku, pakaian) dialokasikan ke 5 server | Kategori diskret |
> >
> > Range memudahkan query rentang tetapi dapat membuat *hot shard* (misal shard bulan terbaru); hash meratakan beban tetapi menyulitkan query rentang.

> [!cornell] #### Summary
>
> **Vertical partitioning** memisahkan kolom (lebih umum di relasional), sedangkan **horizontal partitioning/sharding** memisahkan dokumen ke **shard** di server berbeda sehingga database dapat **berskala**. **Shard key** (ID, nama, tanggal, kategori, wilayah) menjadi input algoritma: **range** untuk nilai berurutan, **hash** untuk sebaran merata, dan **list** untuk kategori diskret.

> [!ad-libitum]- Additional Information
>
> #### Sharding di MongoDB
>
> MongoDB mendukung *ranged sharding* dan *hashed sharding* lewat `sh.shardCollection("db.coll", {key: 1})` atau `{key: "hashed"}`; komponen: `mongos` (router), config servers, dan shard. Kunci dengan kardinalitas rendah atau monoton naik (timestamp) berisiko membuat hotspot.
>
> #### Kaitan dengan CAP dan Partisi
>
> Sharding adalah bentuk *partitioning* pada [[BASE dan CAP Theorem]]; lihat juga pembahasan partisi key-value di [[Desain Key, Partisi, Structured Value, dan Keterbatasan Key-Value]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Simulasikan range dan hash partitioning 1000 dokumen ke 4 shard dengan Python, bandingkan sebaran.
> 2. Pilih shard key untuk collection `orders` dan jelaskan risiko hotspot.
>
> #### Bacaan Lanjutan
>
> - MongoDB: Sharding Concepts.
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 7.
