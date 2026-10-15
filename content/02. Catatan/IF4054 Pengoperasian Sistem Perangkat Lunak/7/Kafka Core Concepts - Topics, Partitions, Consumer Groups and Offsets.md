---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Kafka Core Concepts - Topics, Partitions, Consumer Groups and Offsets
>
> > ## Questions/Cues
> >
> > - Apa itu topic dan partition?
> > - Bagaimana key menjaga urutan?
> > - Bagaimana consumer group bekerja?
> > - Apa fungsi offset, commit, dan retention?
> > - Kapan memilih Kafka vs RabbitMQ?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps - Foundation (Slides 36-44)
>
> > ### Topic dan Partition
> >
> > - **Topic**: kategori/nama feed tempat record dipublikasikan (mis. `orders`).
> > - **Partition**: topic dipecah menjadi partisi (urutan immutable berurutan) untuk **paralelisme dan skala horizontal**.
> > - Pesan dialokasikan ke partisi lewat **key** (mis. `user_id`).
> > - **Urutan hanya dijamin dalam satu partisi.**
> >
> > ### Keying: Menjaga Urutan di Tempat yang Penting
> >
> > Dengan key `order_id`, semua event satu pesanan masuk ke partisi yang sama sehingga urut. Lupa memberi key berarti **urutan hilang**.
> >
> > ### Consumer Group dan Offset
> >
> > - **Consumer group**: sekumpulan consumer yang bersama-sama mengonsumsi sebuah topic; **setiap partisi dibaca tepat oleh satu consumer** dalam grup.
> > - Tambah consumer untuk menskalakan, **hingga jumlah partisi**; grup berbeda membaca secara independen.
> > - **Offset**: penunjuk pesan terakhir yang dibaca pada sebuah partisi; consumer melacak offset sendiri sehingga bisa replay atau melompat maju.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph T["Topic: shopstream.orders.v1"]
> >         P0["Partition 0"]
> >         P1["Partition 1"]
> >         P2["Partition 2"]
> >     end
> >     subgraph G["Consumer group: raw-landing"]
> >         C1["Consumer A"]
> >         C2["Consumer B"]
> >     end
> >     P0 --> C1
> >     P1 --> C1
> >     P2 --> C2
> > ```
> >
> > ### Offset, Commit, Retention
> >
> > - **Committed offset** = "saya sudah memproses sampai sini"; **commit setelah side effect berhasil**.
> > - **Retention** (waktu atau ukuran) membatasi seberapa jauh ke belakang replay dimungkinkan.
> > - **Compaction** mempertahankan nilai terbaru per key.
> >
> > ### Kafka vs RabbitMQ
> >
> > | | Kafka | RabbitMQ |
> > |---|---|---|
> > | Model | Distributed log, pull | Broker dengan routing, push |
> > | Replay | Native (rewind offset) | Terbatas |
> > | Terbaik untuk | Event stream, data pipeline | Task queue, routing kompleks |
> >
> > ### Desain Topic ShopStream
> >
> > Topic `shopstream.orders.v1`, key `order_id`, **3 partisi** (lab; produksi disesuaikan throughput), **dead-letter topic** `shopstream.orders.dlq`, dan versi pada nama topic **hanya untuk perubahan breaking**.

> [!cornell] #### Summary
>
> Kafka mengorganisasi data dalam **topic** yang dipecah menjadi **partition**; key menentukan partisi dan urutan hanya dijamin dalam satu partisi. **Consumer group** membagi partisi (satu partisi per consumer dalam grup) sehingga skala dibatasi jumlah partisi, dan **offset** yang di-commit setelah side effect berhasil memungkinkan replay dengan batas **retention**. Kafka unggul untuk event stream dan replay; RabbitMQ untuk task queue dan routing kompleks.

> [!ad-libitum]- Additional Information
>
> #### Rebalancing dan Lag
>
> Menambah atau mematikan consumer memicu **rebalance** partisi. **Consumer lag** (selisih offset terbaru dan offset commit) adalah SLI utama kesehatan streaming; dibahas pada drill failure.
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan Kafka lokal via Compose, buat topic 3 partisi, produce pesan dengan dan tanpa key, lalu amati distribusi partisi dengan `kafka-console-consumer --property print.partition=true`.
>
> #### Bacaan Lanjutan
> - Apache Kafka Docs — *Introduction* dan *Design*.
> - Narkhede, Shapira, Palino — *Kafka: The Definitive Guide*.
