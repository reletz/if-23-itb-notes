---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Desain Key, Partisi, Structured Value, dan Keterbatasan Key-Value
>
> > ## Questions/Cues
> >
> > - Apa pedoman penamaan key dan bagaimana menangani **rentang nilai**?
> > - Apa beda partisi **hashing** dan **range partitioning**?
> > - Bagaimana **structured value** dan duplikasi data mengurangi latensi?
> > - Mengapa value yang terlalu besar berbahaya?
> > - Apa tiga keterbatasan utama key-value database?
> >
> > ## Reference Points
> >
> > - IF5101 — Key-Value Database (Pages 22-39)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 4-5
>
> > ### Desain Key dan Partisi
> >
> > Konvensi penamaan yang baik memudahkan developer menyusun key untuk entitas, instance, dan atribut baru. Pedoman umum:
> >
> > - gunakan komponen nama yang **bermakna dan tidak ambigu** (`cust`, `inv`),
> > - gunakan komponen **berbasis rentang** (tanggal, counter) bila perlu mengambil sekelompok value,
> > - pakai **delimiter yang sama** (umumnya `:`),
> > - buat key **sependek mungkin** tanpa mengorbankan poin lain.
> >
> > Pola key = *tipe entitas* + *identifier unik* + *nama atribut* (misalnya `customer:198277:fname`) menghemat kode karena fungsi akses/set dapat dibuat generik, dan sebaiknya namespace juga punya konvensi penamaan. Untuk **rentang**, contoh fungsi `getCustPurchaseByDate` mengambil daftar customer ID yang membeli pada tanggal tertentu dengan key yang mengandung tanggal.
> >
> > Key harus memperhatikan **batasan implementasi**: FoundationDB membatasi key hingga 10.000 byte, Riak memperlakukan key sebagai biner/string, Redis lebih longgar dengan struktur kompleks.
> >
> > **Partisi** mengelompokkan pasangan key-value dan menugaskannya ke node:
> >
> > | Metode | Cara kerja | Catatan |
> > | --- | --- | --- |
> > | **Hashing** | Hash key menyebar merata ke semua node | Beban seimbang, tetapi urutan key hilang |
> > | **Range partitioning** | Nilai berurutan dikirim ke node yang sama | Mendukung ambil rentang, rawan *hotspot* |
> >
> > ### Desain Structured Value
> >
> > Fetch dari database lebih lambat dibanding operasi primitif. Bila alamat customer dibutuhkan sekitar 80% dari waktu saat nama dibutuhkan, lebih baik ada satu fungsi `getCustNameAddr` yang mengambil keduanya sekaligus. Cara mempercepat:
> >
> > - simpan value yang sering dipakai di **memori**,
> > - simpan atribut yang sering dipakai **bersama** (misalnya list berisi nama dan alamat), karena membaca satu blok lebih cepat daripada banyak blok lewat banyak key.
> >
> > **Duplikasi data** (analog **denormalisasi** pada relasional) wajar dipakai: bila nama sering dibutuhkan tanpa alamat, simpan juga nama secara terpisah.
> >
> > **Value besar** menurunkan efisiensi: bila ukuran value melebihi satu blok, banyak blok harus dibaca; saat menulis, seluruh value ditulis ulang walau hanya sebagian kecil berubah. Value kecil memungkinkan banyak atribut masuk cache sekaligus. Jika sering harus mendesain struktur value besar (misalnya customer dan semua ordernya), pertimbangkan **document database**.
> >
> > ### Keterbatasan Key-Value Database
> >
> > ```mermaid
> > flowchart TD
> >     L["Keterbatasan Key-Value"] --> L1["Lookup hanya lewat key"]
> >     L --> L2["Tidak mendukung range query"]
> >     L --> L3["Tidak ada bahasa query standar"]
> >     L1 --> S1["Solusi: text search (Riak),<br/>secondary index"]
> >     L2 --> S2["Solusi: konvensi nama + lookup table,<br/>ordered key-value, secondary index"]
> >     L3 --> S3["Solusi: dukungan JSON/XML,<br/>library seperti Solr dan Lucene"]
> > ```
> >
> > - **Lookup hanya lewat key**: sulit mencari objek tanpa tahu key-nya. Mitigasi: fitur *text search* yang mengindeks value saat ditambahkan (misalnya Riak) atau **secondary index**.
> > - **Tanpa range query** (misalnya tanggal antara awal dan akhir atau nama dalam rentang alfabet), kecuali memakai konvensi penamaan khusus dan lookup table, **ordered key-value database** (struktur terurut), atau secondary index.
> > - **Tidak ada bahasa query standar** seperti SQL. Sebagian database memahami struktur umum seperti XML dan JSON, dan banyak bahasa pemrograman punya library untuk membangun/mem-parsing keduanya (contoh Solr dan Lucene).

> [!cornell] #### Summary
>
> Desain key yang baik memakai komponen **bermakna, delimiter konsisten, berbasis rentang bila perlu, dan sependek mungkin**, serta menyesuaikan **batas implementasi**. Partisi dilakukan lewat **hashing** (merata) atau **range partitioning** (mendukung rentang). **Structured value** dan **duplikasi data** mengurangi latensi, tetapi **value terlalu besar** memperlambat baca/tulis sehingga **document database** bisa lebih tepat. Keterbatasan utama key-value: **lookup hanya lewat key, tanpa range query, dan tanpa bahasa query standar**, yang dapat dikurangi dengan secondary index, search, dan ordered key-value.

> [!ad-libitum]- Additional Information
>
> #### Hot key
>
> Walau hashing menyebar key, satu key yang sangat populer (misalnya produk viral) tetap membebani satu node. Teknik umum: *key sharding* dengan akhiran acak (`views:prod9:{0..9}`) lalu jumlahkan saat membaca.
>
> #### Mengapa tetap dipakai
>
> Keterbatasan ini adalah harga dari kesederhanaan: tanpa join dan query kompleks, sistem bisa mencapai latensi sub-milidetik dan skala horizontal besar (lihat [[Design Patterns Key-Value Database]] untuk pola yang menutupi sebagian kekurangan).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Rancang skema key untuk sistem perpustakaan (anggota, buku, peminjaman) dengan delimiter dan tanggal agar peminjaman per hari bisa diambil sebagai rentang.
> 2. Ukur selisih waktu di Redis antara dua `GET` terpisah vs satu `HGETALL` untuk data nama dan alamat.
>
> #### Bacaan Lanjutan
>
> - Redis documentation: data types, `SCAN`, dan sorted sets.
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 4-5.
