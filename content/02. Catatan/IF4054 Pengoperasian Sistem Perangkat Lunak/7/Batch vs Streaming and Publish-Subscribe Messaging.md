---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Batch vs Streaming and Publish-Subscribe Messaging
>
> > ## Questions/Cues
> >
> > - Apa beda batch dan streaming serta trade-off-nya?
> > - Use case mana yang cocok untuk masing-masing?
> > - Apa beda point-to-point dan publish/subscribe?
> > - Mengapa log abstraction membuat Kafka bukan "sekadar queue"?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps - Foundation (Slides 27-35)
>
> > ### Batch vs Streaming
> >
> > - **Batch**: dataset terbatas (*bounded*); diproses setelah lengkap.
> > - **Streaming**: urutan event tak terbatas (*unbounded*); diproses saat tiba.
> > - Sumbu trade-off: **latency, throughput, cost, complexity**. Streaming adalah sebuah **spektrum**, bukan dikotomi.
> >
> > | | Batch | Streaming |
> > |---|---|---|
> > | Latency | Menit hingga jam | Milidetik hingga detik |
> > | Kompleksitas | Lebih rendah | Lebih tinggi (state, ordering, retries) |
> > | Reprocessing | Jalankan ulang job | Butuh **replayable log** |
> > | Model biaya | Burst compute | Always-on |
> > | Mode gagal | Job terlambat | Lag, duplikat, poison message |
> >
> > ### ShopStream: Siapa Butuh Apa?
> >
> > | Use case | Paradigma | Alasan |
> > |---|---|---|
> > | Laporan pendapatan malam | Batch | Kesegaran tidak kritis |
> > | Fraud check saat checkout | Streaming | Keputusan dibutuhkan dalam detik |
> > | Fitur model delay | Tergantung SLO | Terkait freshness SLI |
> >
> > ### Point-to-Point vs Publish/Subscribe
> >
> > | | Point-to-point (request/response) | Pub/Sub |
> > |---|---|---|
> > | Contoh | REST API, gRPC | Message broker (Kafka, RabbitMQ) |
> > | Coupling | Ketat antara producer dan consumer | **Longgar**; producer tak tahu siapa consumer |
> > | Saat consumer mati | Gagal | Pesan **di-buffer** |
> >
> > Producer mem-publish ke **topic**, consumer berlangganan, dan **broker** berada di antaranya: terpisah dalam **waktu, ruang, dan laju**.
> >
> > ```mermaid
> > flowchart LR
> >     P1["orders-api<br/>producer"] --> T["Topic: orders<br/>(broker)"]
> >     T --> C1["Raw landing<br/>consumer"]
> >     T --> C2["Fraud check<br/>consumer"]
> >     T --> C3["Analytics<br/>consumer"]
> > ```
> >
> > ### The Log Abstraction
> >
> > Log adalah urutan record **append-only, berurutan, dan immutable**; setiap record punya **offset**. Consumer melacak posisinya sendiri sehingga log dapat **di-replay**. Inilah mengapa Kafka **bukan sekadar queue**.

> [!cornell] #### Summary
>
> **Batch** memproses dataset terbatas dengan latensi menit-jam dan kompleksitas rendah, sedangkan **streaming** memproses event tak terbatas dengan latensi milidetik-detik tetapi lebih kompleks dan butuh log yang dapat di-replay. Pilihan bergantung pada kebutuhan kesegaran (laporan malam = batch, fraud check = streaming). **Pub/Sub** memisahkan producer dan consumer dalam waktu, ruang, dan laju lewat broker, dan **log** append-only dengan offset menjadikan replay mungkin.

> [!ad-libitum]- Additional Information
>
> #### Lambda dan Kappa
>
> Arsitektur **Lambda** menggabungkan jalur batch dan stream; **Kappa** hanya memakai stream dengan log yang dapat di-replay untuk reprocessing. Frameworks: Spark Structured Streaming, Flink.
>
> #### Proyek Eksplorasi Mandiri
> 1. Untuk tiga use case di sistem Anda, tentukan paradigma (batch/stream) dan target latensi yang diperlukan, lalu justifikasi.
>
> #### Bacaan Lanjutan
> - Kleppmann — *Designing Data-Intensive Applications*, Bab 11.
> - Jay Kreps — *The Log: What every software engineer should know...*.
