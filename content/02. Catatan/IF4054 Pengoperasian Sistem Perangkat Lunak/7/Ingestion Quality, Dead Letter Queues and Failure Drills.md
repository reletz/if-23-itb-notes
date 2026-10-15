---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Ingestion Quality, Dead Letter Queues and Failure Drills
>
> > ## Questions/Cues
> >
> > - Bagaimana kualitas data dikelola saat ingestion?
> > - Apa itu Dead Letter Queue dan bagaimana alurnya?
> > - Apa empat drill kegagalan dan perbaikannya?
> > - Pitfall apa yang umum dan apa yang berubah dari CSV?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps - Foundation (Slides 79-98)
>
> > ### Mengelola Kualitas Data saat Ingestion
> >
> > - **Shift-left data testing**: validasi data **sebelum masuk data lake**, dengan Great Expectations atau validator skema kustom di pipeline CI.
> > - **Realita produksi**: data buruk **pasti lolos** (gangguan jaringan, partial write, sistem legacy), sehingga perlu jaring pengaman.
> >
> > ### Dead Letter Queue (DLQ)
> >
> > **DLQ** adalah topic/queue terpisah untuk pesan yang tidak dapat diproses. Consumer mencoba memproses; bila gagal (pelanggaran skema, amount negatif), ia **merutekan pesan mentah ke `orders-dlq`** dengan header `error_reason`, lalu **melanjutkan ke pesan berikutnya**.
> >
> > ```mermaid
> > flowchart TD
> >     K["shopstream.orders.v1"] --> C["Consumer<br/>validate_order()"]
> >     C -->|"valid"| L["Data lake<br/>MinIO bronze"]
> >     C -->|"ValidationError"| D["shopstream.orders.dlq<br/>+ header error_reason"]
> >     C --> N["Lanjut ke pesan berikutnya"]
> > ```
> >
> > ### Empat Drill "Break It and Fix It"
> >
> > | Drill | Injeksi | Latihan | Perbaikan |
> > |---|---|---|---|
> > | **A** | Crash sebelum commit | Idempotency | Nama objek deterministik atau dedupe `event_id` |
> > | **B** | Hapus field wajib | Penegakan kontrak di CI | Cek kompatibilitas skema di pipeline; registry menolak dengan **409 Conflict** |
> > | **C** | Payload malformed (poison message) | Dead-letter queue | Rutekan ke DLQ dengan metadata error, terus proses |
> > | **D** | Jeda consumer, banjir 10.000 event | Monitoring lag | Pantau `kafka-consumer-groups --describe`, lihat lag naik lalu turun |
> >
> > Pertanyaan diskusi drill D: **berapa lag yang dapat diterima untuk model delay, dan siapa yang di-page?** (terkait SLI pada SRE).
> >
> > ### Pitfall Umum
> >
> > - **Commit offset sebelum menulis** → data hilang.
> > - **Lupa memberi key `order_id`** → urutan hilang.
> > - **Satu file kecil per event** → small-file problem.
> > - **Tanpa mode kompatibilitas pada subject** → kontrak tak terlindungi.
> > - **Retry tak terbatas pada pesan buruk** → partisi macet.
> >
> > ### Apa yang Berubah dari CSV?
> >
> > | CSV (Minggu 5) | Hari ini |
> > |---|---|
> > | Manual, basi | **Kontinu** |
> > | Snapshot sekali | **Replayable** |
> > | Kolom implisit | **Diatur skema** |
> > | Salinan termutasi | **Mentah dan immutable** |

> [!cornell] #### Summary
>
> Kualitas data dikelola dengan **shift-left validation** sebelum lake, sambil menerima bahwa data buruk tetap lolos. **Dead Letter Queue** menampung pesan yang gagal diproses (dengan metadata error) agar consumer terus berjalan. Empat drill melatih **idempotency** (duplikat), **penegakan kontrak di CI** (breaking change ditolak 409), **DLQ** (poison message), dan **monitoring lag**. Pitfall utama: commit sebelum tulis, tanpa key, file kecil, tanpa mode kompatibilitas, dan retry tak terbatas.

> [!ad-libitum]- Additional Information
>
> #### Retry dengan Backoff dan Parking Lot
>
> Pola lanjutan: **retry topic** dengan exponential backoff sebelum DLQ, dan **parking lot** untuk pesan yang butuh intervensi manusia. DLQ tanpa proses triase hanya memindahkan masalah.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan consumer dengan validasi dan DLQ, publikasikan 5 pesan valid dan 2 malformed, lalu tulis skrip yang me-reconcile jumlah event: lake + DLQ = produced.
>
> #### Bacaan Lanjutan
> - Great Expectations Docs — *Getting Started*.
> - Google SRE Workbook — Bab 2-3 (SLI dan SLO).
