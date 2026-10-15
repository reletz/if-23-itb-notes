---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Shift-Left Data Testing and Data Contracts
>
> > ## Questions/Cues
> >
> > - Mengapa data diuji di tepi (edge), bukan di model?
> > - Apa komponen data contract dan siapa yang menegakkan tiap lapisan?
> > - Apa yang tidak bisa ditangkap schema registry?
> > - Bagaimana enum mencegah `USDD`?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps: Security, Quality & Privacy (Slides 15-21)
>
> > ### Uji Data di Tepi, Bukan di Model
> >
> > - **Data contract**: kesepakatan producer dan consumer atas skema, tipe, dan rentang nilai.
> > - **Shift-left**: tangkap error saat **ingestion**, bukan setelah merusak feature store.
> > - **Preventative > reactive**: selaras dengan prinsip *preventative DQ* DMBOK.
> >
> > ### Kontrak = Schema + Semantics + SLA + Owner
> >
> > | Lapisan | Contoh | Ditegakkan oleh |
> > |---|---|---|
> > | **Structure** | `currency_code` bertipe string, `amount` desimal | Avro/Protobuf saat serialisasi |
> > | **Domain** | `currency_code` anggota ISO 4217 | Avro enum atau expectation GX |
> > | **Semantics** | `amount >= 0`; `transaction_type` dalam {charge, refund} | GX / dbt tests |
> > | **SLA** | Event tiba dalam 5 menit dari timestamp | freshness check + alert |
> > | **Ownership** | Siapa di-page bila ini gagal? | metadata kontrak |
> >
> > Catatan kunci: **schema registry menangkap struktur, bukan makna.**
> >
> > ### Enum Mencegah `USDD`
> >
> > Mendefinisikan `currency_code` sebagai **Avro enum** (`USD, EUR, GBP, IDR`) berarti `"USDD"` **bahkan tidak dapat diserialisasi** sehingga tidak pernah mencapai Kafka. Validasi dipindah ke producer, titik paling kiri.
> >
> > ```mermaid
> > flowchart TD
> >     P["Producer"] -->|"enum: USDD tak bisa diserialisasi"| X["Ditolak di producer"]
> >     P -->|"valid"| SR["Schema registry<br/>struktur"]
> >     SR --> K["Kafka"]
> >     K --> GX["GX / dbt tests<br/>semantik, SLA"]
> >     GX --> L["Data lake / feature store"]
> > ```
> >
> > ### Latihan: Temukan Pelanggaran
> >
> > | Field | Nilai | Dimensi dilanggar |
> > |---|---|---|
> > | `transaction_amount` | -50.00 (tanpa flag tipe) | Completeness / contextual accuracy |
> > | `currency_code` | "USDD" | Validity (bukan ISO 4217) |
> > | `email` | (hilang) | Completeness |
> > | `user_id` | "usr_9921" | OK |
> >
> > Pertanyaan renungan: apa yang terjadi bila `"USDD"` mencapai model ML?

> [!cornell] #### Summary
>
> **Shift-left data testing** menangkap error di ingestion lewat **data contract** (schema + semantics + SLA + owner) yang bersifat preventif. **Schema registry hanya menegakkan struktur**; domain, semantik, dan SLA ditegakkan oleh **enum, Great Expectations, dbt tests, dan freshness check**. Dengan Avro enum, nilai seperti `USDD` bahkan tak dapat diserialisasi, sehingga tidak pernah masuk Kafka.

> [!ad-libitum]- Additional Information
>
> #### Data Contract di CI
>
> Kontrak sebaiknya berupa file di Git (mis. YAML) yang divalidasi di CI terhadap skema dan contoh data, dan diuji kompatibilitasnya terhadap versi sebelumnya. Hal ini terhubung ke drill "Contract Check in CI" pada payung DataOps Foundation.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis kontrak data satu halaman (YAML) untuk event `PayLend` dengan lima lapisan di atas, lalu buat skrip yang memvalidasinya terhadap contoh payload.
>
> #### Bacaan Lanjutan
> - Open Data Contract Standard (bitol.io).
> - Great Expectations Docs — *Expectations*.
