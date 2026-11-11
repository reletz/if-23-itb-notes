---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Konsep Document, JSON, XML, dan Perbedaannya dengan Key-Value
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud **document** dalam document database, dan mengapa tidak sesederhana kelihatannya?
> > - Apa saja aturan sintaks **JSON**?
> > - Apa bedanya JSON dan **XML** sebagai format dokumen?
> > - Apa keunggulan document dibanding **key-value database**?
> > - Mengapa dokumen dalam satu **collection** tidak harus berstruktur sama?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 4-12)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 6
>
> > ### Dokumen Tidak Sesederhana Kelihatannya
> >
> > Contoh paling akrab adalah **dokumen HTML**. Satu berkas HTML memuat dua jenis informasi: **konten** (teks serta referensi ke gambar, audio, atau media lain) dan **perintah format** (tag bawaan seperti `<h1>` dan `<p>` yang menentukan tampilan). Browser merender konten sesuai perintah format tersebut. Intinya, dokumen menggabungkan **struktur dan isi** dalam satu objek. Standar lain yang juga menggabungkan keduanya adalah **XML** dan **JSON**.
> >
> > ### JSON (JavaScript Object Notation)
> >
> > Contoh catatan pelanggan dalam JSON:
> >
> > ```json
> > {
> >   "customer_id": 187693,
> >   "name": "Kiera Brown",
> >   "address": { "street": "1232 Sandy Blvd.", "city": "Vancouver",
> >                "state": "Washington", "zip": "99121" },
> >   "first_order": "01/15/2013",
> >   "last_order": "06/27/2014"
> > }
> > ```
> >
> > Aturan sintaks JSON:
> >
> > - Data tersusun sebagai pasangan **key-value**, mirip key-value database.
> > - Dokumen diawali `{` dan diakhiri `}`; pasangan name-value dipisah koma.
> > - **Name** berupa string, misalnya `"customer_id"` dan `"address"`.
> > - **Value** bisa berupa angka, string, Boolean (`true`/`false`), array, objek, atau `NULL`.
> > - Isi **array** ditulis dalam `[` `]`; isi **objek** ditulis sebagai pasangan key-value dalam `{` `}`.
> >
> > JSON hanyalah salah satu pilihan representasi dokumen di document database.
> >
> > ### XML
> >
> > Data yang sama dapat dituliskan dengan tag pembuka dan penutup, misalnya `<customer_record>` yang membungkus `<customer_id>`, `<name>`, dan `<address>` (yang sendiri berisi `<street>`, `<city>`, dan seterusnya). XML lebih verbose, tetapi sama-sama mendukung struktur bersarang.
> >
> > ### Dokumen vs Key-Value Pair
> >
> > Keunggulan utama dokumen: **atribut yang berkaitan dikelola dalam satu objek**. Seperti tabel relasional yang menyimpan banyak atribut dalam satu baris, dokumen memudahkan kebutuhan umum seperti *mengembalikan semua atribut suatu entitas berdasarkan filter pada salah satu atributnya*. Pada key-value database, hal ini menuntut aplikasi melakukan banyak query terpisah.
> >
> > ```mermaid
> > flowchart LR
> >     KV["Key-Value<br/>key → value opak"] --> D["Document<br/>key → kumpulan atribut terstruktur"]
> >     D --> F["Filter pada satu atribut<br/>mengembalikan seluruh entitas"]
> >     KV --> M["Banyak query<br/>untuk atribut berkaitan"]
> > ```
> >
> > ### Mengelola Banyak Dokumen dalam Collection
> >
> > Dokumen biasanya dikelompokkan dalam **collection** berisi dokumen sejenis. Desainer mengoptimalkan database agar cepat **menambah, menghapus, mengubah, dan mencari** dokumen. Dokumen dalam satu collection **tidak harus berstruktur identik**, tetapi sebaiknya berbagi struktur umum. Pada contoh slide, dua dokumen pelanggan pertama berstruktur sama, sedangkan dokumen ketiga dan keempat punya atribut tambahan seperti `loyalty_level`, `large_purchase_discount`, `large_purchase_amount`, atau `number_of_returns`.

> [!cornell] #### Summary
>
> **Document** menggabungkan konten dan struktur dalam satu objek, sebagaimana HTML, **XML**, dan **JSON**. JSON memakai pasangan **key-value** dalam `{}` dengan value berupa angka, string, Boolean, array, objek, atau null. Dibanding key-value database, document database menyimpan **atribut terkait dalam satu objek** sehingga entitas utuh mudah diambil lewat filter satu atribut. Dokumen dikelompokkan dalam **collection** dan boleh berbeda struktur selama berbagi bagian umum.

> [!ad-libitum]- Additional Information
>
> #### BSON dan Penyimpanan Fisik
>
> MongoDB tidak menyimpan JSON teks mentah, melainkan **BSON** (binary JSON) yang menambah tipe seperti `Date`, `ObjectId`, dan `Decimal128` serta lebih cepat di-parse. Sintaks yang tampak ke pengguna tetap mirip JSON.
>
> #### Contoh Document Database
>
> MongoDB, CouchDB, Couchbase, dan Amazon DocumentDB. Kaitan dengan taksonomi NoSQL: [[Jenis-jenis NoSQL Database]]; perbandingan dengan model sebelumnya: [[Istilah Pemodelan dan Arsitektur Key-Value Database]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ubah satu baris tabel `pelanggan` relasional menjadi dokumen JSON dengan alamat sebagai sub-objek.
> 2. Tulis dokumen yang sama dalam XML dan bandingkan ukurannya.
>
> #### Bacaan Lanjutan
>
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 6.
> - Spesifikasi JSON (json.org) dan dokumentasi MongoDB tentang BSON types.
