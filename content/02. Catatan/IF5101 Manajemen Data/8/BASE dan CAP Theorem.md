---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] BASE dan CAP Theorem
>
> > ## Questions/Cues
> >
> > - Apa kepanjangan dan makna **BASE**, dan apa bedanya dengan **ACID**?
> > - Apa karakteristik transaksi BASE?
> > - Apa isi **CAP Theorem** (Brewer) dan siapa yang membuktikannya?
> > - Apa definisi **Consistency**, **Availability**, dan **Partition Tolerance**?
> > - Mengapa sistem terdistribusi harus berkompromi?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to NoSQL Databases (Pages 15-21)
> > - Brewer, E. — *Towards Robust Distributed Systems*, PODC Keynote, 2000
> > - Pritchett, D. — *BASE: An Acid Alternative*, 2008
>
> > ### BASE: Kebalikan dari ACID
> >
> > **BASE** adalah akronim yang sengaja dibuat sebagai lawan dari ACID. Pada sistem terdistribusi berskala besar, menjaga ACID ketat di semua node terlalu mahal, sehingga NoSQL memilih model yang lebih longgar:
> >
> > - **Basically Available**: node dalam lingkungan terdistribusi boleh *down*, tetapi sistem secara keseluruhan tidak boleh terganggu.
> > - **Soft State** (scalable): state sistem dan data **berubah seiring waktu**, bahkan tanpa input baru, karena proses sinkronisasi di belakang layar.
> > - **Eventually Consistent**: bila diberi waktu cukup, data akan **konsisten** di seluruh sistem.
> >
> > Karakteristik transaksi BASE: *weak consistency* (data usang/*stale* masih diterima), **availability didahulukan**, *best effort*, jawaban perkiraan boleh, bersifat agresif/optimistik, serta **lebih sederhana dan lebih cepat**.
> >
> > | Aspek | ACID | BASE |
> > | --- | --- | --- |
> > | Prioritas | Konsistensi | Ketersediaan |
> > | Data | Selalu konsisten | Boleh *stale* sementara |
> > | Pendekatan | Pesimistik, ketat | Optimistik, *best effort* |
> > | Cocok untuk | Transaksi keuangan | Aplikasi web berskala besar |
> >
> > ### Brewer's CAP Theorem
> >
> > Sistem terdistribusi **hanya dapat menjamin dua dari tiga** sifat berikut secara bersamaan:
> >
> > 1. **Consistency (C)**: semua node melihat data yang sama pada waktu yang sama; setiap *read* menerima *write* terbaru atau error. Klien merasa seolah operasi terjadi sekaligus (mirip *Atomic* pada ACID).
> > 2. **Availability (A)**: kegagalan node tidak menghentikan node lain untuk terus beroperasi; setiap operasi harus berakhir dengan respons yang dimaksud.
> > 3. **Partition Tolerance (P)**: sistem tetap berjalan meski sejumlah pesan antar node hilang atau tertunda oleh jaringan; operasi tetap selesai walau sebagian komponen tidak tersedia.
> >
> > Teorema ini dikemukakan oleh **Prof. Eric Brewer** (UC Berkeley, 2000) dan dibuktikan secara formal oleh **Nancy Lynch dkk.** (MIT).
> >
> > ```mermaid
> > flowchart TD
> >     CAP["CAP Theorem<br/>pilih maksimal 2 dari 3"]
> >     CAP --> C["Consistency<br/>semua node lihat data sama"]
> >     CAP --> A["Availability<br/>setiap operasi mendapat respons"]
> >     CAP --> P["Partition Tolerance<br/>tahan pesan hilang/tertunda"]
> >     C --- CA["CA: konsisten dan tersedia<br/>(tanpa toleransi partisi)"]
> >     A --- CA
> >     C --- CP["CP: konsisten, korbankan availability"]
> >     P --- CP
> >     A --- AP["AP: tersedia, korbankan konsistensi"]
> >     P --- AP
> > ```
> >
> > Karena jaringan antar mesin yang tersebar luas **pasti** bisa terpartisi, pilihan praktisnya adalah antara **CP** dan **AP**. Sistem NoSQL yang menomorsatukan availability memilih **eventual consistency**, itulah sebab BASE dan CAP selalu dibahas bersamaan.

> [!cornell] #### Summary
>
> **BASE** (*Basically Available, Soft State, Eventually Consistent*) adalah alternatif longgar dari **ACID** yang mengutamakan **availability**, menerima data *stale* sementara, dan lebih sederhana serta cepat. **CAP Theorem** (Brewer 2000, dibuktikan Lynch dkk.) menyatakan sistem terdistribusi hanya dapat menjamin **dua dari tiga**: **Consistency**, **Availability**, **Partition Tolerance**; karena partisi jaringan tak terhindarkan, desain NoSQL umumnya memilih antara **CP** dan **AP**.

> [!ad-libitum]- Additional Information
>
> #### Contoh produk per kategori
>
> Secara umum (bergantung konfigurasi), MongoDB dan HBase condong ke **CP**, sedangkan Cassandra dan Riak/Dynamo condong ke **AP** dengan *tunable consistency*. Database relasional satu-node praktis berada di **CA** karena tidak menghadapi partisi.
>
> #### PACELC
>
> Perluasan CAP oleh Daniel Abadi: bila terjadi partisi (**P**) pilih **A** atau **C**; *Else* (tanpa partisi) pilih antara **L**atency dan **C**onsistency. Ini menjelaskan mengapa sistem AP pun sering menukar konsistensi demi latensi di kondisi normal.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Rancang skenario dua node dengan jaringan terputus; tuliskan apa yang terjadi pada operasi *read/write* jika memilih CP vs AP.
> 2. Cari tahu opsi *consistency level* (`ONE`, `QUORUM`, `ALL`) di Cassandra dan kaitkan dengan CAP.
>
> #### Bacaan Lanjutan
>
> - Brewer, E. *CAP Twelve Years Later: How the "Rules" Have Changed*. IEEE Computer, 2012.
> - Pritchett, D. *BASE: An Acid Alternative*. ACM Queue, 2008.
> - Browne, J. *Brewer's CAP Theorem* (2009).
