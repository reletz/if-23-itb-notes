---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Design Patterns Key-Value Database
>
> > ## Questions/Cues
> >
> > - Apa saja enam **design pattern** untuk key-value database?
> > - Kapan **TTL key** berguna?
> > - Sampai sejauh mana **tabel** bisa diemulasikan?
> > - Apa bedanya **aggregate** dan **atomic aggregate**?
> > - Bagaimana **enumerable key** dan **inverted index** bekerja?
> >
> > ## Reference Points
> >
> > - IF5101 — Key-Value Database (Pages 40-49)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 5
>
> > ### Enam Pola
> >
> > ```mermaid
> > flowchart LR
> >     DP["Design Patterns<br/>Key-Value"] --> A["TTL keys"]
> >     DP --> B["Emulating tables"]
> >     DP --> C["Aggregates"]
> >     DP --> D["Atomic aggregates"]
> >     DP --> E["Enumerable keys"]
> >     DP --> F["Indexes"]
> > ```
> >
> > Contoh yang dipakai adalah aplikasi tiket konser (`ConcertApp`).
> >
> > ### Time to Live (TTL)
> >
> > **TTL** menandai objek sementara: key otomatis kedaluwarsa setelah waktu tertentu. Berguna saat men-*cache* data di server bermemori terbatas atau saat key dipakai untuk **menahan resource** selama periode tertentu. Contoh: saat pelanggan membayar, kursi ditahan dengan pasangan key-value ber-TTL **lima menit**; jika pembayaran tak selesai, key hilang dan kursi tersedia lagi.
> >
> > ### Emulating Tables
> >
> > Memakai konvensi `entitas:identifier:atribut` untuk meniru tabel. Tidak praktis meniru semua fitur relasional (tidak ada query ala SQL, hanya operasi **get dan set**). Berguna bila rutin mengambil/mengisi sekumpulan atribut terkait dan jumlah tabel yang diemulasikan **sedikit**. Jika banyak tabel atau perlu filter kompleks dan range search, pertimbangkan pendekatan lain.
> >
> > ### Aggregates
> >
> > Mendukung **atribut berbeda untuk subtipe berbeda** dari suatu entitas. Satu tipe entitas, misalnya `concert`, dipakai untuk semua jenis tiket (festival, stadion, venue kecil), nilainya berupa **list pasangan atribut-nilai** khusus tiap tipe, ditambah **indikator tipe**. Pada relasional, hal ini dimodelkan dengan tabel umum plus tabel per subtipe.
> >
> > ### Atomic Aggregates
> >
> > Berisi semua value yang **harus diubah bersama atau tidak sama sekali** (seperti **A** pada ACID). Bila database tidak menyediakan transaksi, gunakan **satu pernyataan assignment** untuk menyimpan banyak value. Contoh: log pembelian tiket stadion mencatat tanggal, lokasi, dan kursi sekaligus; mencatat tiap atribut terpisah berisiko hanya sebagian berhasil.
> >
> > ### Enumerable Keys
> >
> > Key dibentuk dari **counter atau urutan** sehingga sekelompok key bisa diambil dengan membangkitkan serangkaian key. Untuk mengambil log tiket pada hari tertentu, gunakan format `ticketLog:20140617:10` (nama + tanggal + counter), lalu iterasi counter dari 1.
> >
> > ### Inverted Index
> >
> > **Index** berupa pasangan key-value yang memungkinkan mencari key atau value lewat atribut lain dari entitas yang sama. Mencatat kursi per konser memudahkan daftar semua kursi, tetapi sulit menampilkan kursi pada lokasi tertentu tanpa fitur search. Solusinya fungsi seperti `addLocAssgnSeat('Springfield Civic Center', 'J38')` yang mengisi `ConcertApp['Springfield Civic Center'] = {'J38'}`; setelah kursi J39, A17, A18, A19, R22 terjual, nilainya menjadi himpunan semua kursi tersebut.
> >
> > | Pola | Masalah yang diselesaikan |
> > | --- | --- |
> > | TTL | Reservasi sementara, cache terbatas |
> > | Emulating tables | Get/set atribut terkait |
> > | Aggregates | Subtipe dengan atribut berbeda |
> > | Atomic aggregates | Update beberapa nilai sekaligus |
> > | Enumerable keys | Ambil rentang/kelompok key |
> > | Inverted index | Cari lewat atribut non-key |

> [!cornell] #### Summary
>
> Enam pola desain menutupi keterbatasan key-value: **TTL keys** (reservasi/cache sementara), **emulating tables** (konvensi key meniru tabel, terbatas get/set), **aggregates** (subtipe entitas dengan list atribut dan indikator tipe), **atomic aggregates** (banyak nilai disimpan lewat satu assignment agar atomik), **enumerable keys** (key berbasis counter/tanggal untuk mengambil rentang), dan **inverted index** (pasangan key-value untuk mencari lewat atribut lain).

> [!ad-libitum]- Additional Information
>
> #### Implementasi di Redis
>
> TTL: `SET seat:J38 held EX 300`. Atomic aggregate: `MULTI`/`EXEC` atau `HSET` dengan banyak field. Enumerable keys: `INCR ticketLog:20140617`. Inverted index: `SADD loc:springfield J38`. Pola ini langsung terpetakan ke tipe data Redis.
>
> #### Peringatan
>
> Index buatan aplikasi harus diperbarui bersamaan dengan data utama; tanpa transaksi, keduanya bisa tidak sinkron (lihat atomic aggregates dan [[Desain Key, Partisi, Structured Value, dan Keterbatasan Key-Value]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan reservasi kursi dengan TTL 5 menit di Redis, lalu uji saat TTL habis.
> 2. Bangun inverted index kursi per lokasi dan fungsi untuk menghapus kursi saat tiket dibatalkan.
>
> #### Bacaan Lanjutan
>
> - Redis documentation: `EXPIRE`, `MULTI`, dan sets.
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 5.
