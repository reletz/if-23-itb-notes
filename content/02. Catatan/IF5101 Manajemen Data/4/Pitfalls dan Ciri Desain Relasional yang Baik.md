---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Pitfalls dan Ciri Desain Relasional yang Baik
>
> > ## Questions/Cues
> >
> > - Apa dua **pitfall utama** dalam merancang skema basis data?
> > - Mengapa **redundancy** berbahaya, dan apa hubungannya dengan inkonsistensi?
> > - Apa maksud **incompleteness** dalam desain skema?
> > - Apa masalah yang muncul bila `instructor` dan `department` digabung menjadi `in_dep`?
> > - Apa saja anomali (update, insert, delete) akibat desain buruk?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 4 (Slides 5-6)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 7 (Relational Database Design)
>
> > ### Dua Pitfall Utama
> >
> > Saat merancang skema basis data kita harus menghindari dua jebakan besar:
> >
> > | Pitfall | Arti | Dampak |
> > | --- | --- | --- |
> > | **Redundancy** | Desain yang buruk **mengulang informasi** yang sama di banyak tempat | Salinan informasi dapat menjadi **tidak konsisten** bila update tidak dilakukan dengan benar |
> > | **Incompleteness** | Desain yang buruk membuat aspek tertentu dari enterprise **sulit atau mustahil dimodelkan** | Fakta nyata tidak bisa disimpan tanpa trik (mis. nilai `null`) |
> >
> > Masalah terbesar dari representasi informasi yang redundan adalah **inkonsistensi**: dua salinan dari satu fakta bisa berbeda karena salah satunya lupa di-update.
> >
> > ### Contoh: Skema `in_dep`
> >
> > Misalkan `instructor` dan `department` digabung menjadi satu relasi **`in_dep`**, yaitu hasil **natural join** keduanya:
> >
> > ```
> > in_dep = (ID, name, salary, dept_name, building, budget)
> > ```
> >
> > Akibatnya:
> >
> > - **Terjadi pengulangan informasi.** Setiap dosen di departemen Physics membawa ulang `building` dan `budget` Physics.
> > - **Perlu memakai `null`.** Bila ditambahkan departemen baru yang belum punya dosen, kolom `ID`, `name`, `salary` harus `null` hanya agar departemen itu bisa disimpan.
> >
> > ### Anomali yang Timbul
> >
> > Redundancy dalam satu tabel besar memunculkan tiga **anomali**:
> >
> > - **Update anomaly** — mengubah `budget` Physics harus dilakukan di *setiap baris* dosen Physics; satu baris terlewat = data kontradiktif.
> > - **Insertion anomaly** — departemen baru tidak bisa dicatat tanpa dosen (atau harus memakai `null`).
> > - **Deletion anomaly** — menghapus dosen terakhir suatu departemen ikut **menghilangkan** informasi departemennya (building, budget).
> >
> > ```mermaid
> > flowchart LR
> >     BAD["Desain buruk<br/>in_dep (join instructor + department)"]
> >     BAD --> R["Redundancy<br/>building &amp; budget berulang"]
> >     BAD --> I["Incompleteness<br/>perlu null untuk dept tanpa dosen"]
> >     R --> A1["Update anomaly"]
> >     R --> A3["Deletion anomaly"]
> >     I --> A2["Insertion anomaly"]
> > ```
> >
> > ### Satu-satunya Jalan Keluar
> >
> > Satu-satunya cara menghilangkan pengulangan informasi pada `in_dep` adalah **dekomposisi** menjadi dua skema, `instructor` dan `department` — topik catatan berikutnya.

> [!cornell] #### Summary
>
> Dua pitfall utama desain skema adalah **redundancy** (informasi berulang sehingga salinan bisa **inkonsisten**) dan **incompleteness** (aspek enterprise sulit/mustahil dimodelkan). Menggabungkan `instructor` dan `department` menjadi **`in_dep`** mengulang `building`/`budget` dan memaksa pemakaian **`null`** untuk departemen tanpa dosen, menimbulkan **update, insertion, dan deletion anomaly**. Solusinya adalah **dekomposisi** skema yang baik.

> [!ad-libitum]- Additional Information
>
> #### Anomali sebagai alat uji
>
> Sebelum mulai menghitung functional dependency, cara cepat menilai sebuah tabel adalah mencoba tiga operasi: ubah satu fakta, tambahkan fakta baru yang berdiri sendiri, hapus satu entitas. Bila salah satu operasi memaksa Anda mengubah banyak baris, memakai `null`, atau kehilangan fakta lain, tabel itu hampir pasti belum ternormalisasi.
>
> #### Denormalisasi yang disengaja
>
> Redundancy tidak selalu salah. Pada data warehouse / OLAP, tabel fakta yang di-denormalisasi mempercepat query karena menghindari join. Bedanya, redundancy tersebut **disengaja, terkontrol, dan dimuat ulang dari sumber** — bukan hasil desain yang tidak sengaja.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat tabel `in_dep` di PostgreSQL dari `instructor NATURAL JOIN department`, lalu coba tiga anomali di atas dan catat hasilnya.
> 2. Cari satu tabel dari proyek/tugas Anda sendiri yang punya kolom berulang, lalu identifikasi anomali apa yang mungkin terjadi.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 7.1 (Features of Good Relational Designs).
> - Codd, E. F. (1972). "Further Normalization of the Data Base Relational Model".
