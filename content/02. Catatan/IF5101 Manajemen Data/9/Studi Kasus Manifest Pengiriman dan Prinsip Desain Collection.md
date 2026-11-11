---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Studi Kasus Manifest Pengiriman dan Prinsip Desain Collection
>
> > ## Questions/Cues
> >
> > - Apa tiga tip utama mendesain **collection**?
> > - Mengapa tipe entitas yang terlalu **abstrak** bermasalah?
> > - Mengapa sebaiknya **tidak** mendefinisikan skema eksplisit?
> > - Bagaimana keputusan embed, index, dan collection pada kasus **TGTS**?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 58-67, 76-82)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 7
>
> > ### Tiga Tip Desain Collection
> >
> > Collection sebaiknya menyimpan dokumen tentang **tipe entitas yang sama**, meski konsep entitas cukup abstrak dan terbuka pada interpretasi.
> >
> > **1. Hindari tipe entitas terlalu abstrak.** Contoh buruk: satu collection berisi dokumen `doc_type: "click_stream"` dan `doc_type: "server_log"` yang atributnya berbeda. Bila Anda sering memfilter berdasarkan `doc_type`, tinjau ulang: mungkin ada campuran entitas. Memfilter satu collection sering lebih lambat daripada memakai beberapa collection tunggal-tipe, karena dokumen bertipe campur berada di blok disk yang sama sehingga data terbaca tetapi tidak dipakai.
> >
> > **2. Waspadai fungsi terpisah per tipe dokumen.** Bila kode tingkat atas berupa `if` yang bercabang ke fungsi berbeda per tipe dokumen, kemungkinan tipe campuran sebaiknya dipisah ke collection berbeda. Percabangan di tingkat rendah wajar untuk atribut opsional.
> >
> > **3. Gunakan subtype bila entitas sering diagregasi atau berbagi banyak kode.** Contoh: `Products` (nama, SKU, harga, dimensi, skor review) dengan subtipe `Books` (author, publisher, page count), `CD` (artist, producer, tracks), dan `Small kitchen appliances` (color, voltage, style). Bila query seperti rata-rata produk per pelanggan, top 20 produk per negara bagian, atau penjualan 30 hari terakhir memperlakukan semuanya sama, satu collection masuk akal. Slide menegaskan: *toaster sama dengan buku desain database ketika diperlakukan sama oleh query aplikasi*. **Query memandu organisasi dokumen dan collection.** Terapkan prinsip desain secara fleksibel.
> >
> > ### Hindari Definisi Skema Eksplisit
> >
> > Skema relasional seperti `CREATE TABLE customer (...)` wajib ada, tetapi document database tidak memerlukannya dan dirancang menampung variasi dokumen. Tetap ada organisasi **implisit** yang tampak pada kode aplikasi (polymorphic schema, "banyak bentuk").
> >
> > ### Studi Kasus: Customer Manifest (TGTS)
> >
> > **TGTS** (fiktif) mengoordinasikan pengiriman barang. Semua kontainer punya field inti (nama pelanggan, fasilitas asal dan tujuan, ringkasan isi, jumlah item, indikator bahan berbahaya, kedaluwarsa, kontak). Sebagian butuh data khusus: bahan berbahaya perlu **MSDS**, makanan mudah rusak perlu data inspeksi. Analisis: 70-80% query mengambil **satu manifest** (lewat id, atau nama pelanggan + tanggal + fasilitas asal), 20-30% laporan ringkasan.
> >
> > ```mermaid
> > flowchart TD
> >     M["Manifest collection"] --> E["Perishable foods<br/>EMBED (selalu dilaporkan bersama)"]
> >     M --> R["MSDS<br/>REFERENCE via msdsID<br/>(jarang dipakai)"]
> >     M --> I["Index: manifest id<br/>+ compound (customer, date, origin)"]
> >     M --> T["Satu collection untuk semua tipe<br/>(jumlah tipe tak terbatas)"]
> > ```
> >
> > - **Embed atau tidak?** Data makanan mudah rusak rutin dilaporkan bersama field umum, sehingga disematkan. MSDS jarang dipakai, disimpan di collection terpisah dan manifest memuat `msdsID`.
> > - **Index.** Manifest id menjadi index utama. Karena daftar per tanggal atau fasilitas asal jarang, dibuat **satu index gabungan** (customer name, shipment date, origination facility), bukan tiga.
> > - **Pisah collection per tipe?** Biasanya filter sering per tipe menandakan perlu pisah, tetapi di sini jumlah tipe bisa tumbuh besar dan mengelola banyak collection kurang disukai, sehingga tetap satu collection.

> [!cornell] #### Summary
>
> Satu collection sebaiknya mewakili satu tipe entitas: hindari entitas **terlalu abstrak** dengan field `doc_type`, waspadai percabangan kode per tipe, dan gunakan **subtype** hanya bila query memperlakukan entitas sama. Hindari **skema eksplisit** karena document database memakai **polymorphic schema**. Pada kasus **TGTS**, data inspeksi di-**embed**, **MSDS di-reference**, dibuat **satu compound index**, dan satu collection dipertahankan karena jumlah tipe tak terbatas.

> [!ad-libitum]- Additional Information
>
> #### Aturan Compound Index
>
> Index (customer, date, origin) juga melayani query pada prefix kiri: (customer) dan (customer, date). Query hanya pada origin tidak terbantu. Urutan field penting.
>
> #### Alternatif: Attribute dan Inheritance Pattern
>
> Pola MongoDB untuk subtipe: *polymorphic pattern* (satu collection, field `type`) versus collection terpisah; pilihan bergantung pada query, sama seperti argumen di atas.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Rancang skema dokumen manifest TGTS lengkap dengan JSON contoh untuk tiga tipe kontainer.
> 2. Tulis tiga query laporan dan tentukan index yang melayaninya.
>
> #### Bacaan Lanjutan
>
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 7 (case study).
> - MongoDB: Polymorphic Pattern.
