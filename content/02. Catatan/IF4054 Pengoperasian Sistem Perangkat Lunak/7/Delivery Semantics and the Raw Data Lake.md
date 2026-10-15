---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Delivery Semantics and the Raw Data Lake
>
> > ## Questions/Cues
> >
> > - Apa beda at-most-once, at-least-once, dan exactly-once?
> > - Dari mana duplikat berasal dan bagaimana mengatasinya?
> > - Mengapa data mentah disimpan immutable lebih dulu?
> > - Apa itu medallion layers dan layout partisi data lake?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps - Foundation (Slides 45-51)
>
> > ### Delivery Semantics
> >
> > | Jaminan | Arti | Risiko |
> > |---|---|---|
> > | **At-most-once** | Commit dulu, baru proses | **Data hilang** |
> > | **At-least-once** | Proses dulu, baru commit | **Duplikat** |
> > | **Exactly-once** | Setiap efek tepat sekali | Sulit; cakupan terbatas |
> >
> > ### Dari Mana Duplikat Berasal
> >
> > Bila consumer **crash setelah menulis ke MinIO tetapi sebelum commit offset**, saat restart ia membaca ulang dari offset terakhir yang di-commit dan menulis lagi sehingga muncul duplikat. Itulah pertanyaan checkpoint kuliah.
> >
> > ```mermaid
> > flowchart TD
> >     R["Read event"] --> W["Write ke MinIO"]
> >     W --> X{"Crash?"}
> >     X -->|"ya, sebelum commit"| RE["Restart: baca ulang<br/>dari offset lama"]
> >     RE --> W
> >     X -->|"tidak"| CM["Commit offset"]
> > ```
> >
> > ### Effectively-Once = At-Least-Once + Idempotency
> >
> > - Terima **at-least-once delivery**.
> > - Buat consumer **idempoten**: **dedupe pada `event_id`**, atau **nama objek deterministik** (`topic-partition-startOffset`) sehingga penulisan ulang menimpa file yang sama.
> > - Sisi producer: `enable.idempotence=true`, `acks=all`.
> >
> > ### Mengapa Mendaratkan Data Mentah Immutable Lebih Dulu?
> >
> > - **Reprocessing**: perbaiki bug, jalankan ulang dari sumber kebenaran.
> > - **Auditing**: apa persisnya yang kita terima?
> > - **Schema-on-read**: tentukan struktur belakangan.
> > - **Jangan mutasi bronze; turunkan dari bronze.**
> >
> > ### Medallion Layers dan Layout Lake
> >
> > Lapisan **Bronze** (mentah) → **Silver** (dibersihkan) → **Gold** (siap konsumsi). Pada sesi ini, hanya **Bronze**. Layout partisi contoh:
> >
> > `s3://lake/bronze/orders/dt=2026-10-02/hour=14/part-0-1000.avro`
> >
> > Partisi berdasarkan **waktu event/ingest** untuk pruning dan backfill, dan hindari **small-file problem** dengan buffering berdasarkan ukuran atau waktu.

> [!cornell] #### Summary
>
> **At-most-once** berisiko kehilangan data, **at-least-once** berisiko duplikat, dan **exactly-once** sulit serta terbatas cakupannya. Pendekatan praktis adalah **effectively-once**: at-least-once ditambah consumer **idempoten** (dedupe `event_id` atau nama objek deterministik) serta producer idempoten. Data mentah didaratkan **immutable di bronze** (untuk reprocessing, audit, schema-on-read) dengan layout terpartisi waktu dan menghindari small-file problem; lapisan silver dan gold diturunkan darinya.

> [!ad-libitum]- Additional Information
>
> #### Transactional Outbox dan Exactly-Once Kafka
>
> Kafka mendukung **exactly-once** dalam lingkup Kafka-ke-Kafka (transaksi dan idempotent producer), tetapi efek ke sistem luar (mis. object store) tetap perlu idempotency di sisi consumer. Pola **outbox** membantu mencegah dual-write antara database dan broker.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan consumer yang menulis ke MinIO dengan nama objek `topic-partition-startOffset`, bunuh proses sebelum commit, restart, lalu verifikasi tidak ada duplikat.
>
> #### Bacaan Lanjutan
> - Databricks — *Medallion Architecture*.
> - Confluent Docs — *Message Delivery Semantics*.
