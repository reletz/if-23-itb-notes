---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Mutable Documents dan Strategi Indexing
>
> > ## Questions/Cues
> >
> > - Apa yang perlu dipertimbangkan pada dokumen yang **sering berubah** ukurannya?
> > - Apa dua opsi desain pada kasus **fleet management**?
> > - Mengapa dokumen yang membesar dapat menimbulkan masalah fisik?
> > - Bagaimana strategi **index** untuk aplikasi read-heavy dan write-heavy?
> >
> > ## Reference Points
> >
> > - IF5101 — Document Databases (Pages 50-57)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 7
>
> > ### Merencanakan Mutable Documents
> >
> > Sebagian dokumen sering berubah, sebagian jarang. Pertimbangkan bukan hanya **seberapa sering** dokumen berubah, tetapi juga bagaimana **ukurannya** berubah. Studi kasus: truk armada mengirim lokasi, konsumsi bahan bakar, dan metrik operasi lain **setiap tiga menit** ke database fleet management. Seiring waktu, jumlah data yang ditulis terus bertambah.
> >
> > ### Dua Opsi Desain
> >
> > **Opsi 1: satu dokumen per set data.** Tiap truk mengirim 20 set per jam; dengan 10 jam operasi, ada **200 dokumen per hari**. Field `truck_id`, `date`, dan `driver_name` sama di semua 200 dokumen (redundan).
> >
> > **Opsi 2: satu dokumen per truk per hari**, dengan array `operational_data` berisi `{time, fuel_consumption_rate, ...}` yang tersemat. Dokumen mulai dengan satu entri dan berakhir dengan 200 entri di akhir shift.
> >
> > ### Masalah Fisik pada Opsi 2
> >
> > Secara logis opsi 2 sah. Namun secara fisik, saat dokumen tumbuh **melebihi ruang yang dialokasikan**, ia dapat **dipindahkan** ke lokasi lain, menambah beban sistem penyimpanan dan menurunkan kinerja.
> >
> > ### Hindari Memindahkan Dokumen Berukuran Besar
> >
> > Solusinya: **alokasikan ruang cukup** saat dokumen dibuat. Untuk dokumen operasi truk, buat dokumen dengan array **200 dokumen tersemat** berisi field waktu dan lainnya dengan nilai default, lalu isi seiring waktu.
> >
> > ```mermaid
> > flowchart LR
> >     A["Dokumen kecil<br/>1 entri"] -->|"tumbuh"| B["Melebihi ruang<br/>teralokasi"]
> >     B --> C["Dokumen dipindah<br/>beban storage naik"]
> >     A -.->|"preallocate 200 entri"| D["Ruang cukup<br/>tanpa relokasi"]
> > ```
> >
> > ### Indexing: Read-Heavy
> >
> > Aplikasi dengan persentase read tinggi, seperti **business intelligence** dan analitik, bersifat iteratif: hampir semua field bisa dipakai untuk memfilter. Maka **index dibuat pada hampir semua field** yang dipakai untuk menyaring hasil.
> >
> > ### Indexing: Write-Heavy
> >
> > Index adalah struktur data yang harus dibuat dan diperbarui, sehingga memakan **CPU, penyimpanan persisten, dan memori**, serta menambah waktu insert dan update. Pada aplikasi write-heavy, index dibatasi seperlunya.
> >
> > ### Bila Keduanya Dibutuhkan
> >
> > Bila aplikasi write-heavy dan read-heavy harus dilayani sekaligus, **solusi dua database** bisa menjadi pilihan terbaik (satu untuk operasi tulis, satu untuk analitik).

> [!cornell] #### Summary
>
> Rencanakan **mutable documents** dengan memperhatikan frekuensi dan **pertumbuhan ukuran**. Pada kasus fleet management, menyematkan 200 entri dalam satu dokumen sah secara logis tetapi dapat memicu **relokasi dokumen** saat membesar; solusinya **preallocation**. Aplikasi **read-heavy** layak punya index pada banyak field, sedangkan **write-heavy** harus membatasi index karena biaya CPU, memori, dan storage; bila keduanya perlu, pertimbangkan **dua database**.

> [!ad-libitum]- Additional Information
>
> #### Catatan Engine Modern
>
> Relokasi dokumen paling relevan pada engine lama (MMAPv1). WiredTiger memakai model berbeda, tetapi prinsip menghindari dokumen yang tumbuh tanpa batas tetap berlaku. Alternatif lain adalah **bucket pattern**: satu dokumen per jam atau per shift.
>
> #### Jenis Index
>
> Single-field, compound, multikey (untuk array), TTL, dan text index. Compound index mengikuti prinsip left-prefix (lihat [[Studi Kasus Manifest Pengiriman dan Prinsip Desain Collection]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Simulasikan 200 pembacaan sensor dengan dua desain, lalu bandingkan ukuran dan waktu insert.
> 2. Gunakan `explain()` di MongoDB untuk membandingkan query dengan dan tanpa index.
>
> #### Bacaan Lanjutan
>
> - MongoDB: Bucket Pattern dan Indexes.
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 7.
