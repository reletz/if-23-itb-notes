---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Istilah Pemodelan dan Arsitektur Key-Value Database
>
> > ## Questions/Cues
> >
> > - Apa itu **key**, **value**, **namespace**, dan **schemaless** pada key-value database?
> > - Bagaimana konvensi penamaan key yang baik?
> > - Apa itu **partition**, **partition key**, **cluster**, dan **ring**?
> > - Apa bedanya cluster **master-slave** dan **masterless**?
> > - Mengapa **replication** penting dan apa trade-off jumlah replika?
> >
> > ## Reference Points
> >
> > - IF5101 — Key-Value Database (Pages 3-21)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 4
>
> > ### Istilah Pemodelan Data
> >
> > **Key** adalah referensi ke value, seperti alamat. Key bukan nilai, melainkan cara menemukan dan memanipulasi value. Minimal berupa string (misalnya `Cust9876` atau `Patient:A384J:Allergies`); beberapa database seperti Redis mendukung struktur lebih kompleks sebagai key (string, list, set, sorted set, hash, bit array). Key juga dipakai untuk **mengorganisasi data di banyak server**.
> >
> > **Konvensi penamaan key**: gabungkan nama tabel, nilai primary key, dan nama atribut, misalnya `cust:8983:fullName`. Jangan terlalu panjang (boros memori, padahal key-value database sudah intensif memori) dan jangan terlalu pendek (rawan konflik nama).
> >
> > **Value** adalah objek, umumnya sekumpulan byte, yang diasosiasikan dengan key: integer, float, string, **BLOB**, JSON, gambar, audio, dan apa pun yang bisa direpresentasikan sebagai byte. Batasnya berbeda tiap implementasi (Redis hingga 512 MB per string; FoundationDB 100.000 byte).
> >
> > **Namespace** adalah kumpulan pasangan key-value **tanpa key duplikat** (value duplikat diperbolehkan). Bisa berupa set, collection, bucket, bahkan seluruh database. Ketika beberapa tim/aplikasi memakai database yang sama, namespace mencegah **konflik nama key** dengan menambahkan prefix implisit.
> >
> > **Schemaless** berarti key dan tipe value **tidak perlu didefinisikan sebelumnya**. Misalnya `cust:8983:fullName = 'Jane Anderson'` dapat langsung disimpan, lalu kelak diubah menjadi `cust:8983:firstName = 'Jane'` dan `cust:8983:lastName = 'Anderson'` tanpa mengubah skema; dua representasi data yang sama dapat hidup berdampingan.
> >
> > ### Istilah Arsitektur
> >
> > ```mermaid
> > flowchart LR
> >     K["Partition key<br/>(mis. hash dari key)"] --> P["Partition"]
> >     P --> S1["Server 1<br/>kunci A-L"]
> >     P --> S2["Server 2<br/>kunci M-Z"]
> >     S1 --- C["Cluster"]
> >     S2 --- C
> >     C --> R["Ring + Replication"]
> > ```
> >
> > - **Partition**: cluster dipartisi, yaitu tiap server/instance mengelola **subset** database. Contoh sederhana dua server: kunci berawalan A-L ke Server 1, M-Z ke Server 2. Jika banyak key berawalan "C", beban menjadi **tidak seimbang**; skema partisi harus menyebar beban merata, dan server dapat ditambah lalu instance dialokasikan ulang.
> > - **Partition key**: key yang menentukan partisi tujuan sebuah value. Strategi sederhana: huruf pertama, nilai numerik, atau string. Bila tidak ada key yang menyebar merata, gunakan **fungsi hash** (memetakan input ke string berukuran tetap yang biasanya unik).
> > - **Cluster**: kumpulan komputer terhubung yang berkoordinasi; bisa *loosely coupled* (server cukup independen, ciri key-value) atau *tightly coupled* (komunikasi intens). Node saling berbagi informasi rentang data dan mengirim pesan penanda hidup; bila satu node gagal, node lain **mengambil alih** tugasnya.
> >   - **Master node** (contoh Redis): master menerima read/write dan mereplikasi ke slave yang melayani read; bila master gagal, node sisa memilih master baru.
> >   - **Masterless** (contoh Riak): semua node melayani read dan write; bila satu gagal, node lain mengambil alih.
> > - **Ring**: pola melingkar tempat tiap server terhubung ke dua server tetangga dan mengelola rentang data berdasarkan partition key. Contoh: hash memetakan `cust:8983:firstName` ke angka 0-95, lalu partisi dipetakan ke 8 server. Data yang ditulis ke satu server juga ditulis ke **dua tetangganya**, sehingga bila Server 4 gagal, Server 3 dan 5 dapat melayani read maupun write untuknya, lalu menyinkronkannya saat Server 4 pulih.
> > - **Replication**: menyimpan beberapa salinan data di cluster. Makin banyak replika, makin kecil risiko kehilangan data, tetapi performa bisa turun. Data yang mudah diregenerasi cukup dengan replika sedikit; data yang tidak boleh hilang perlu replika lebih banyak.

> [!cornell] #### Summary
>
> Pemodelan key-value berpusat pada **key** (referensi ke value, juga dasar distribusi data), **value** (byte apa pun), **namespace** (koleksi key unik yang mencegah konflik antar aplikasi), dan sifat **schemaless**. Arsitekturnya memakai **partition** berdasarkan **partition key** (sering dengan **hash** agar beban merata), **cluster** yang *loosely coupled* (master-slave seperti Redis atau masterless seperti Riak), topologi **ring** yang menulis data ke node tetangga untuk **high availability**, dan **replication** dengan trade-off antara keamanan data dan performa.

> [!ad-libitum]- Additional Information
>
> #### Consistent hashing
>
> Ring pada slide merupakan gambaran sederhana dari **consistent hashing** (dipakai Dynamo, Riak, Cassandra): saat node ditambah atau dihapus, hanya sebagian kecil key yang berpindah, bukan seluruhnya seperti pada `hash(key) mod N`.
>
> #### Quorum
>
> Dengan N replika, penulisan ke W node dan pembacaan dari R node, kondisi **R + W > N** menjamin pembacaan melihat penulisan terbaru. Ini cara mengatur trade-off konsistensi vs availability (lihat [[BASE dan CAP Theorem]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Simulasikan hash-based partitioning 1.000 key ke 4 server di Python; bandingkan sebaran dengan partisi berdasarkan huruf pertama.
> 2. Jalankan Redis, simpan `cust:8983:firstName`, dan eksplorasi tipe data hash/list/set.
>
> #### Bacaan Lanjutan
>
> - DeCandia, G. dkk. *Dynamo: Amazon's Highly Available Key-value Store*. SOSP, 2007.
> - Dokumentasi Redis (redis.io) dan Riak.
