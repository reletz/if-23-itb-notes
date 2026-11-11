---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Operasi Dasar Document Database dengan MongoDB
>
> > ## Questions/Cues
> >
> > - Apa empat **operasi dasar** pada document database?
> > - Bagaimana sintaks **insert** dan **remove** di MongoDB?
> > - Mengapa `update` butuh dua parameter, dan apa fungsi `$set` dan `$inc`?
> > - Operator apa saja yang tersedia untuk `find`?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 22-27)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 6
>
> > ### Empat Operasi
> >
> > Operasi dasar adalah **inserting, deleting, updating, dan retrieving**. Tidak ada bahasa manipulasi data standar lintas document database, sehingga slide memakai **MongoDB** sebagai contoh. Hierarkinya: database adalah wadah collection, dan collection adalah wadah dokumen.
> >
> > ```mermaid
> > flowchart LR
> >     DB["Database"] --> C["Collection (books)"] --> D["Document"]
> >     D --> I["insert"]
> >     D --> R["remove"]
> >     D --> U["update"]
> >     D --> F["find"]
> > ```
> >
> > ### Insert
> >
> > ```js
> > db.books.insert({"title": "Mother Night", "author": "Kurt Vonnegut, Jr."})
> > db.books.insert({book_id: 1298747, "title": "Mother Night", "author": "Kurt Vonnegut, Jr."})
> > db.books.insert([ {...}, {...}, {...} ])   // banyak dokumen sekaligus lewat array
> > ```
> >
> > Dokumen boleh disisipkan tanpa `book_id` (sesuai sifat schema-less), dan array memungkinkan banyak dokumen dimasukkan dalam satu perintah.
> >
> > ### Remove
> >
> > ```js
> > db.books.remove()                                  // semua dokumen
> > db.books.remove({"book_id": 639397})               // berdasar id
> > db.books.remove({"author": "Kurt Vonnegut, Jr."})  // berdasar atribut
> > ```
> >
> > ### Update
> >
> > `update` memerlukan dua parameter: **query dokumen** (mana yang diubah) dan **set key-value** yang diubah.
> >
> > ```js
> > db.books.update({"book_id": 1298747}, {$set: {"quantity": 10}})  // set nilai
> > db.books.update({"book_id": 1298747}, {$inc: {"quantity": 5}})   // tambah 5
> > ```
> >
> > ### Find
> >
> > ```js
> > db.books.find()                                           // semua
> > db.books.find({"author": "Kurt Vonnegut, Jr."})           // filter
> > db.books.find({"author": "Kurt Vonnegut, Jr."}, {"title": 1})  // proyeksi: hanya title
> > db.books.find({"quantity": {"$gte": 10, "$lt": 50}})      // rentang
> > ```
> >
> > Operator kondisi yang didukung: `$lt` (kurang dari), `$lte` (kurang dari atau sama dengan), `$gt` (lebih dari), `$gte` (lebih dari atau sama dengan), `$in` (nilai dalam himpunan untuk satu key), `$or` (nilai pada beberapa key), dan `$not` (negasi).
> >
> > | Operasi | SQL padanan | MongoDB |
> > | --- | --- | --- |
> > | Insert | `INSERT INTO` | `insert()` |
> > | Delete | `DELETE FROM ... WHERE` | `remove(query)` |
> > | Update | `UPDATE ... SET ... WHERE` | `update(query, {$set})` |
> > | Retrieve | `SELECT ... WHERE` | `find(query, projection)` |

> [!cornell] #### Summary
>
> Document database mendukung **insert, remove, update, dan find** pada dokumen dalam collection, tanpa bahasa standar lintas produk. Di **MongoDB**, `insert` menerima satu dokumen atau array dokumen, `remove` memakai query filter, `update` memerlukan **query** dan operator seperti **`$set`** serta **`$inc`**, dan `find` mendukung proyeksi serta operator `$lt`, `$gt`, `$gte`, `$in`, `$or`, dan `$not`.

> [!ad-libitum]- Additional Information
>
> #### API Modern MongoDB
>
> Driver terbaru memakai `insertOne`/`insertMany`, `deleteOne`/`deleteMany`, `updateOne`/`updateMany`; `insert`, `remove`, dan `update` pada slide adalah bentuk lama (legacy). Sintaks `$set` yang benar memakai titik dua: `{$set: {quantity: 10}}`.
>
> #### Kaitan dengan SQL
>
> Bandingkan dengan [[Modifikasi Basis Data - Insert, Update, Delete]] dan [[Struktur Dasar Query SQL - select-from-where]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan MongoDB lokal (Docker), buat collection `books`, lalu coba keempat operasi.
> 2. Tulis query SQL ekuivalen untuk tiap contoh `find` di atas.
>
> #### Bacaan Lanjutan
>
> - Dokumentasi MongoDB: CRUD Operations.
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 6.
