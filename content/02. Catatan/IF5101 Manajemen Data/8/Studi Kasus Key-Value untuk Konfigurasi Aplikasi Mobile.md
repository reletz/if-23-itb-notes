---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Studi Kasus Key-Value untuk Konfigurasi Aplikasi Mobile
>
> > ## Questions/Cues
> >
> > - Apa kebutuhan sistem **TGTS Tracker**?
> > - Mengapa key-value cocok untuk kasus ini?
> > - Bagaimana namespace dan konvensi key dirancang?
> > - Apa empat entity type dan atributnya?
> > - Struktur value apa yang dipakai untuk tiap entity?
> >
> > ## Reference Points
> >
> > - IF5101 — Key-Value Database (Pages 50-57)
> > - Sullivan, D. — *NoSQL for Mere Mortals*, 2015, Chapter 5 (Case Study)
>
> > ### Deskripsi Kasus
> >
> > **TransGlobal Transport and Shipping (TGTS)** mengoordinasikan pengiriman barang ke seluruh dunia. Untuk membantu pelanggan melacak kiriman, TGTS membuat aplikasi mobile **TGTS Tracker**. Konfigurasi tiap pelanggan disimpan terpusat agar bisa diakses dari perangkat mana pun: nama dan nomor akun, mata uang default, atribut kiriman di dashboard, preferensi alert/notifikasi, dan opsi UI (skema warna, font).
> >
> > Persyaratan: dashboard ringkasan harus tampil **cepat** (detail kiriman boleh lebih lambat), mendukung hingga **10.000 pengguna simultan**, dengan **90% operasi adalah read**. Pola akses sederhana, read-heavy, dan latensi rendah ini cocok untuk key-value.
> >
> > ### Keputusan Desain
> >
> > ```mermaid
> > flowchart TD
> >     NS["Namespace: TrackerNS"] --> K["Key = entityType:accountNumber"]
> >     K --> E1["cust: nama, currency"]
> >     K --> E2["dshb: atribut dashboard (maks. 6)"]
> >     K --> E3["alrt: daftar alert dan penerima"]
> >     K --> E4["ui: font dan skema warna"]
> > ```
> >
> > - **Namespace**: data yang dibutuhkan terbatas, sehingga satu namespace `TrackerNS` cukup.
> > - **Key**: nomor akun dipilih sebagai identifier unik pelanggan; konvensi `entityType:accountNumber`.
> > - **Empat entity type**: `cust` (informasi pelanggan), `dshb` (opsi dashboard), `alrt` (alert dan notifikasi), `ui` (konfigurasi antarmuka).
> >
> > ### Atribut tiap Entity
> >
> > | Entity | Isi value | Contoh |
> > | --- | --- | --- |
> > | `cust` | `name` dan `currency`, karena sering ditampilkan bersama | `TrackerNS['cust:4719364'] = {'name':'Prime Machine, Inc.', 'currency':'USD'}` |
> > | `dshb` | List hingga 6 atribut kiriman: `shpComp`, `shpCity`, `shpState`, `shpCountry`, `shpDate`, `shpDelivDate`, `shpCnt`, `shpType`, `shpWght`, `shpNotes` | `{'shpComp','shpState','shpDate','shpDelivDate'}` |
> > | `alrt` | **List of lists**: tiap penerima (email atau nomor telepon) dengan kondisi pemicu (`pickup`, `delivered`, `delay`) | `{'jane.washingon@primemachineinc.com','pickup'}, {'(202)555-9812','delay'}` |
> > | `ui` | Pasangan atribut-nilai sederhana | `{'fontName':'Cambria', 'fontSize':9, 'colorScheme':'default'}` |
> >
> > Penggabungan `name` dan `currency` dalam satu value mengikuti prinsip *structured value* untuk menekan jumlah fetch pada tampilan yang sama (lihat [[Desain Key, Partisi, Structured Value, dan Keterbatasan Key-Value]]).

> [!cornell] #### Summary
>
> Kasus **TGTS Tracker** menyimpan konfigurasi pelanggan aplikasi mobile (10.000 pengguna simultan, 90% read, dashboard cepat) di key-value database dengan satu namespace **TrackerNS** dan key `entityType:accountNumber`. Empat entity type: **cust** (nama, currency), **dshb** (maks. enam atribut kiriman), **alrt** (list of lists penerima dan kondisi), **ui** (pasangan font/warna). Desain ini menunjukkan penerapan key naming, structured value, dan pola akses sederhana yang read-heavy.

> [!ad-libitum]- Additional Information
>
> #### Koreksi kecil pada slide
>
> Contoh pada slide memakai prefix `dash:` untuk dashboard padahal singkatan yang ditetapkan adalah `dshb`, dan contoh UI memakai key `alrt:4719364` padahal seharusnya `ui:4719364`. Dalam implementasi, konsistenkan dengan singkatan yang ditetapkan.
>
> #### Pengembangan
>
> Bila kelak perlu mencari pelanggan berdasarkan mata uang, tambahkan **inverted index** (`idx:currency:USD` berisi set account number), lihat [[Design Patterns Key-Value Database]]. Bila konfigurasi tumbuh kompleks dan perlu query atas isi, pindah ke document database.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan keempat entity di Redis (hash untuk `cust` dan `ui`, list untuk `dshb`, JSON untuk `alrt`).
> 2. Tambahkan entity `lang` untuk preferensi bahasa dan tentukan konvensi key-nya.
>
> #### Bacaan Lanjutan
>
> - Sullivan, D. *NoSQL for Mere Mortals*, Chapter 5.
> - Dokumentasi Redis: hash dan JSON.
