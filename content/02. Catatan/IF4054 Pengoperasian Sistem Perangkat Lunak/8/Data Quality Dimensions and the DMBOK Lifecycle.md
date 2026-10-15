---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Data Quality Dimensions and the DMBOK Lifecycle
>
> > ## Questions/Cues
> >
> > - Apa saja dimensi kualitas data inti?
> > - Bagaimana dimensi dipetakan ke pelanggaran nyata di PayLend?
> > - Mana yang bisa diperiksa per baris dan mana yang butuh dataset lain?
> > - Apa lima tahap DMBOK Data Quality Lifecycle?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps: Security, Quality & Privacy (Slides 12-14)
>
> > ### Dimensi Kualitas Data Inti
> >
> > Berdasarkan DAMA-DMBOK2 Bab 13, slide menerapkan dimensi berikut pada PayLend:
> >
> > | Pengamatan | Dimensi | Ide tes |
> > |---|---|---|
> > | `currency_code = "USDD"` | **Validity** | `in_set` / enum |
> > | Tidak ada `transaction_type` pada jumlah negatif | **Completeness** | `not_null` + `in_set` |
> > | `txn_000481` terkirim dua kali (at-least-once) | **Uniqueness** | `unique(transaction_id)` |
> > | `timestamp` berumur 3 hari | **Timeliness** | freshness check |
> > | `transaction_amount = 5.000.000` | **Reasonability** | batas rentang atau statistik |
> > | `user_id` tak ada di tabel `users` | **Integrity** (relationships) | referential check |
> > | Negara pengguna berbeda antara dua layanan | **Consistency** | perbandingan lintas-sistem |
> > | Jumlah berbeda 0,01 dari ledger | **Accuracy** | reconciliation job |
> >
> > **Pertanyaan diskusi**: mana yang dapat ditangkap dengan **row-level check**, dan mana yang butuh **dataset lain**? Validity, completeness, uniqueness (dalam batch), dan reasonability bisa row-level/batch; **integrity, consistency, dan accuracy** membutuhkan data pembanding (tabel users, layanan lain, ledger).
> >
> > ### DMBOK Data Quality Lifecycle
> >
> > ```mermaid
> > flowchart TD
> >     D["Define<br/>aturan bisnis,<br/>ambang, SLA"] --> M["Measure<br/>profiling,<br/>skor DQ"]
> >     M --> A["Analyze<br/>akar masalah"]
> >     A --> I["Improve<br/>perbaiki di sumber"]
> >     I --> C["Control<br/>monitoring dan alert"]
> >     C --> D
> > ```
> >
> > - **Define**: aturan bisnis, ambang batas, SLA.
> > - **Measure**: profiling data, hitung skor DQ.
> > - **Analyze**: cari akar masalah (producer hulu? bug transformasi?).
> > - **Improve**: perbaiki **di sumber** (diutamakan) atau lewat transformasi.
> > - **Control**: monitoring dan alerting kontinu.
> >
> > **Prinsip penting**: utamakan perbaikan di sumber. Transformasi yang diam-diam "memperbaiki" `USDD` justru **menyembunyikan bug producer**.

> [!cornell] #### Summary
>
> Dimensi kualitas data (validity, completeness, uniqueness, timeliness, reasonability, integrity, consistency, accuracy) menerjemahkan pelanggaran nyata PayLend menjadi **ide tes yang dapat diotomasi**. Sebagian dapat diperiksa **per baris**, sedangkan integrity, consistency, dan accuracy membutuhkan **dataset pembanding**. **DMBOK DQ lifecycle** — Define, Measure, Analyze, Improve, Control — menekankan perbaikan **di sumber** agar tidak menyembunyikan bug producer.

> [!ad-libitum]- Additional Information
>
> #### Enam vs Delapan Dimensi
>
> Takeaway slide menyebut **6 dimensi inti DMBOK** (completeness, uniqueness, timeliness, validity, accuracy, consistency); tabel studi kasus menambahkan reasonability dan integrity sebagai pelengkap praktis. Berbagai sumber menghitung dimensi secara berbeda, jadi cek definisi yang dipakai.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih satu tabel dan tulis satu tes untuk tiap dimensi. Tandai mana yang butuh tabel lain, lalu implementasikan dengan dbt tests atau Great Expectations.
>
> #### Bacaan Lanjutan
> - DAMA-DMBOK2, Bab 13 (*Data Quality*).
> - ISO 8000 — *Data quality*.
