---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] DataOps Foundations - From Stale CSV to Principles
>
> > ## Questions/Cues
> >
> > - Mengapa CSV hasil ekspor manual adalah masalah?
> > - Apa definisi DataOps dan perbedaannya dengan DevOps?
> > - Mengapa data lebih sulit daripada kode?
> > - Apa prinsip inti dan pilar DataOps?
> > - Bagaimana pipeline data gagal secara diam-diam?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps - Foundation (Slides 6-26)
>
> > ### Running Example: ShopStream
> >
> > Seluruh sesi memakai satu sistem: **orders-api** (pesanan e-commerce) yang mengubah aksi bisnis menjadi **event** (`OrderPlaced`, `PaymentAuthorized`, `OrderShipped`). Tidak ada demo terpisah; satu sistem berevolusi sepanjang kuliah.
> >
> > ### Masalah: The Stale CSV
> >
> > Sebuah CSV hasil ekspor manual tersimpan di MinIO dengan timestamp ekspor tertentu. Lima pesanan baru masuk ke orders-api: bagaimana model atau pihak hilir mengetahuinya? **Tidak — sampai seseorang mengekspor lagi.** Pertanyaan diskusi: seberapa basi data saat dipakai? apa yang rusak bila dua orang mengekspor di waktu berbeda? siapa pemilik skrip ekspor? Intinya: **masalahnya bukan modelnya, melainkan cara data bergerak.**
> >
> > ### Dari DevOps ke DataOps
> >
> > **DataOps** adalah metodologi otomatis berorientasi proses yang dipakai tim analitik dan data untuk meningkatkan **kualitas** dan memangkas **cycle time** analitik. Ia meminjam dari **Agile, Lean Manufacturing, dan DevOps** (serta statistical process control), memperlakukan data pipeline sebagai **produk perangkat lunak**. Tujuannya: **data tepercaya, dikirim secara kontinu**.
> >
> > | Aspek | DevOps | DataOps |
> > |---|---|---|
> > | Artefak utama | Kode (stateless) | Data + kode (stateful) |
> > | Fokus testing | Unit, integration, E2E | Data quality, schema, anomaly detection |
> > | Dampak kegagalan | Outage, bug | "Garbage in, garbage out", model ML cacat |
> > | Version control | Git | Git + data versioning / schema registry |
> >
> > ### Mengapa Data Lebih Sulit daripada Kode
> >
> > | Kode | Data |
> > |---|---|
> > | Berubah saat deploy | Berubah kapan pun dunia berubah |
> > | Bug biasanya gagal keras | Bug sering gagal **diam-diam** |
> > | Tes deterministik | Input tak terbatas dan berantakan |
> > | Rollback = redeploy versi lama | Rollback = menulis ulang sejarah (sulit) |
> > | Satu tim pemilik | Producer dan consumer tim berbeda |
> >
> > ### Prinsip Inti DataOps
> >
> > 1. **Automation** — hapus penanganan data manual; otomasi ingestion, testing, deployment.
> > 2. **CI/CD for data** — kode pipeline dan definisi skema melewati gate CI/CD seketat kode aplikasi.
> > 3. **Observability** — pantau kesehatan pipeline **dan** kesehatan data (akurat, lengkap, segar).
> > 4. **Collaboration** — runtuhkan silo antara data engineer, data scientist, dan pakar domain.
> >
> > Slide juga memetakan **Data Engineering Lifecycle** (Reis dan Housley) dengan *undercurrents*: security, data management, DataOps, data architecture, orchestration, software engineering.
> >
> > ### ShopStream: Cara Lama vs Cara DataOps
> >
> > | Cara lama | Cara DataOps |
> > |---|---|
> > | Microservice menulis log JSON ke file lokal | Mem-publish event bertipe (Avro) ke broker (Kafka) |
> > | Skrip kustom data scientist men-scrape file | **Schema Registry** menegakkan kontrak otomatis |
> > | Skrip rusak diam-diam saat field baru muncul | Data disimpan immutable di data lake (MinIO) dengan observability |
> >
> > ### Bagaimana Pipeline Gagal Diam-Diam
> >
> > | Kegagalan | Contoh |
> > |---|---|
> > | Data terlambat/hilang | Consumer mati, lake basi |
> > | Data duplikat | Replay setelah crash |
> > | Schema drift | Field di-rename di hulu |
> > | Nilai buruk | `total_amount` negatif |
> > | Data sensitif bocor | Email mentah di lake |
> >

> [!cornell] #### Summary
>
> **Stale CSV** menunjukkan bahwa masalah data adalah soal **cara data bergerak**, bukan model. **DataOps** menerapkan Agile, Lean, dan DevOps pada pipeline data (artefak: data + kode, stateful; testing: quality, schema, anomaly). Data lebih sulit dari kode karena berubah mengikuti dunia, gagal diam-diam, tak terbatas dan berantakan, sulit di-rollback, dan dimiliki banyak pihak. Empat prinsip: **automation, CI/CD for data, observability, collaboration**. Pipeline data gagal secara diam-diam lewat data terlambat, duplikat, schema drift, nilai buruk, dan kebocoran data sensitif.

> [!ad-libitum]- Additional Information
>
> #### Data Observability
>
> Lima pilar *data observability* yang sering dipakai: **freshness, volume, schema, distribution, lineage**. Tools: Monte Carlo, Great Expectations, Soda, OpenLineage.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil satu pipeline data (atau skrip ekspor) yang Anda punya dan daftarkan kelima mode kegagalan diam-diam di atas; mana yang tak akan Anda sadari?
>
> #### Bacaan Lanjutan
> - Reis & Housley — *Fundamentals of Data Engineering*, Bab 1-3.
> - Huyen — *Designing Machine Learning Systems*, Bab 3.
