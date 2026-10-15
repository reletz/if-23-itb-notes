---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Presidio, Great Expectations, dbt and Pipeline Orchestration
>
> > ## Questions/Cues
> >
> > - Apa peran Presidio, Great Expectations, dbt, dan schema registry?
> > - Bagaimana PII ditokenisasi secara aman dengan Presidio?
> > - Mengapa butuh recognizer lokal?
> > - Kapan memakai GX dan kapan dbt tests?
> > - Bagaimana pipeline end-to-end disusun dan apa strategi saat cek gagal?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps: Security, Quality & Privacy (Slides 33-46)
>
> > ### Tool sebagai Enabler DMBOK
> >
> > | Tool | Peran | Area |
> > |---|---|---|
> > | **Presidio** | Deteksi dan transformasi PII | Data Security |
> > | **Great Expectations (GX)** | Menegaskan kualitas pada batch dan menghasilkan bukti | Data Quality |
> > | **dbt Core** | Transformasi + tes di dalam warehouse | Data Quality / Governance |
> > | **Schema registry** | Menegakkan struktur di tepi | Data Contracts |
> >
> > ### Langkah 1: Penanganan PII dengan Presidio
> >
> > Kode slide menggabungkan `AnalyzerEngine` dan `AnonymizerEngine` dengan operator: `US_SSN` → **token deterministik berkunci** (`hmac.new(KEY, value, sha256)`, awalan `tkn_`), `CREDIT_CARD` → **mask** (`*`, 15 karakter dari awal). Poin penting: kunci diambil dari **KMS/secret store, bukan dari kode**; sanitasi dilakukan **per field**, bukan `str(dict)`.
> >
> > **Recognizer lokal**: recognizer bawaan memahami format AS, padahal data Anda mungkin Indonesia. Contoh `PatternRecognizer` untuk **NIK** (16 digit) dengan *context words* ("nik", "ktp", "identitas") untuk menaikkan skor. Regex 16 digit polos **over-match** (nomor kartu, order ID), sehingga perlu konteks dan fungsi validasi (NIK punya struktur kode wilayah, tanggal lahir, urutan).
> >
> > ### Langkah 2: Kualitas Data dengan Great Expectations
> >
> > Suite `paylend_suite` berisi expectation: `transaction_id` tidak null dan **unique**, `currency_code` **in set** (USD, EUR, GBP, IDR), `transaction_type` **tidak null**, `transaction_amount` **between 0 dan 10000**. Validasi dengan `result_format="BOOLEAN_ONLY"` agar **nilai buruk tidak ikut dicetak** (menghindari kebocoran lewat laporan).
> >
> > ### Langkah 3: Aturan yang Sama di dbt
> >
> > | Pakai GX bila | Pakai dbt tests bila |
> > |---|---|
> > | Memvalidasi data **sebelum mendarat** (stream, file, DataFrame) | Memvalidasi tabel yang **sudah di warehouse** |
> > | Butuh profiling dan laporan bukti kaya | Ingin tes **berdampingan dengan kode transformasi** |
> >
> > Di dbt: `contract: { enforced: true }` (nama dan tipe kolom harus cocok), `not_null`, `unique`, `accepted_values`, dan `relationships` (ke `dim_users`) untuk konsistensi antar-tabel.
> >
> > ### Orkestrasi End-to-End
> >
> > ```mermaid
> > flowchart TD
> >     K["Kafka<br/>event mentah"] --> V["Validasi format SSN<br/>(sebelum tokenisasi)"]
> >     V --> P["Presidio<br/>kontrol Security"]
> >     P --> G["Great Expectations<br/>kontrol Quality"]
> >     G -->|"lolos"| FS["Feature store<br/>hanya data valid dan bersih"]
> >     G -->|"gagal"| DLQ["DLQ<br/>terenkripsi, dibatasi, kedaluwarsa"]
> > ```
> >
> > Catatan: **urutan penting**, validasi format SSN **sebelum** tokenisasi karena token selalu tampak valid. **DLQ menyimpan record buruk mentah**, sehingga sama sensitifnya dengan sumber: enkripsi, batasi akses, dan beri masa kedaluwarsa. Orkestrasi penuh (scheduling, retries, backfills) dilengkapi alat orkestrator.
> >
> > ### Apa yang Terjadi Saat Cek Gagal?
> >
> > | Strategi | Perilaku | Dipakai bila |
> > |---|---|---|
> > | **Block** | Tolak record/batch; tak ada ke hilir | Cacat tidak aman (kebocoran PII, key korup) |
> > | **Quarantine** | Rutekan yang buruk ke DLQ, loloskan yang baik | Kegagalan parsial dan independen |
> > | **Warn** | Loloskan dan beri alert | Severity rendah, awal roll-out aturan baru |
> > | **Circuit breaker** | Hentikan semua bila failure rate melewati ambang | Producer rusak, bukan "beberapa baris buruk" |
> >
> > Bila **40% record masuk DLQ, itu bukan masalah kualitas data, melainkan insiden.**
> >
> > ### Ringkasan Pemetaan
> >
> > | Topik kuliah | Area DMBOK |
> > |---|---|
> > | Shift-left testing, DQ lifecycle (Control), enam dimensi | Data Quality |
> > | PII handling, CIA, tokenization, masking, audit | Data Security |
> > | Glossary, klasifikasi, katalog | Metadata Management |
> > | Kebijakan, kepemilikan, jejak audit, orkestrasi | Data Governance |

> [!cornell] #### Summary
>
> **Presidio** (deteksi/transformasi PII, token HMAC berkunci dari KMS, recognizer lokal seperti NIK), **Great Expectations** (assertion batch dengan bukti, tanpa membocorkan nilai buruk), **dbt** (tes dan contract di warehouse), dan **schema registry** mengoperasionalkan area DMBOK. Pipeline berurutan Kafka → validasi → Presidio → GX → feature store/DLQ, dengan DLQ diperlakukan sama sensitif seperti sumber. Respons kegagalan: **block, quarantine, warn, atau circuit breaker**; failure rate sangat tinggi berarti insiden, bukan masalah kualitas.

> [!ad-libitum]- Additional Information
>
> #### Orkestrator dan Alternatif
>
> Orkestrasi penuh biasanya memakai **Airflow, Dagster, atau Prefect**. Alternatif validasi: **Soda Core**, **Pandera**, **dbt-expectations**. Untuk PII di warehouse: fitur bawaan (Snowflake tag-based masking, BigQuery policy tags).
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun pipeline mini: sanitasi event PayLend dengan Presidio, validasi dengan GX, rutekan yang gagal ke "DLQ" terenkripsi (file), lalu ukur persentase karantina dan tentukan strategi (block, quarantine, atau circuit breaker).
>
> #### Bacaan Lanjutan
> - Microsoft Presidio Docs — *Analyzer* dan *Anonymizer*.
> - Great Expectations Docs 1.x; dbt Docs — *Data tests* dan *Model contracts*.
