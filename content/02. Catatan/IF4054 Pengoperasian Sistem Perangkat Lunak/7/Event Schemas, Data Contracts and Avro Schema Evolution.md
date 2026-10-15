---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Event Schemas, Data Contracts and Avro Schema Evolution
>
> > ## Questions/Cues
> >
> > - Mengapa "schema adalah API"?
> > - Apa beda schema-on-write dan schema-on-read?
> > - Bagaimana JSON, Avro, dan Protobuf dibandingkan?
> > - Apa fungsi Schema Registry dan mode kompatibilitas?
> > - Apa itu data contract?
> > - Perubahan skema mana yang aman dan mana yang breaking?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps - Foundation (Slides 52-78)
>
> > ### Schema adalah API
> >
> > Producer dan consumer dimiliki tim berbeda. Tanpa kontrak, **rename oleh producer diam-diam merusak setiap consumer**. Skema membuat perubahan **eksplisit dan dapat diperiksa**.
> >
> > ### Schema-on-Write vs Schema-on-Read
> >
> > | | Schema-on-write (database) | Schema-on-read (data lake) |
> > |---|---|---|
> > | Penegakan | Saat insert | Saat query |
> > | Sifat | Kaku, mencegah data buruk masuk, sulit diubah | Fleksibel, mudah ingest apa pun, risiko "garbage in, garbage out" |
> >
> > Skenario nyeri: producer mengirim `{order_id, user_id, amount}`, lalu developer menambah `discount_code`; consumer yang mengharapkan 3 field menerima 4 dan **crash atau menjatuhkan data**. Skema pasti berubah; pertanyaannya bagaimana menanganinya tanpa merusak produksi.
> >
> > ### Format Serialisasi
> >
> > | | JSON | Avro | Protobuf |
> > |---|---|---|---|
> > | Ukuran | Verbose | Compact | Compact |
> > | Skema ditegakkan | Tidak | Ya | Ya |
> > | Model evolusi | Ad hoc | Schema resolution | Field numbers |
> > | Sweet spot | API, debugging | **Data pipeline** | Service-to-service |
> >
> > ### Schema Registry dan Kompatibilitas
> >
> > Producer menyerialisasi data **plus schema ID**; consumer memakai ID untuk mengambil skema dari **Schema Registry** dan men-deserialize. Mode kompatibilitas:
> >
> > | Mode | Jaminan |
> > |---|---|
> > | **Backward** | Skema baru dapat membaca data lama |
> > | **Forward** | Skema lama dapat membaca data baru |
> > | **Full** | Keduanya |
> >
> > **Aman**: menambah field opsional dengan default. **Breaking**: menghapus/rename field wajib, atau mengubah tipe.
> >
> > ### Data Contract
> >
> > **Data contract** = **schema + semantik + kepemilikan**: nama field, makna, tipe; wajib vs opsional; rentang nilai (mis. `amount > 0`); jaminan delivery dan ekspektasi freshness; klasifikasi PII per field. Ditegakkan **di sisi producer sebelum publish**.
> >
> > ### Evolusi Skema Avro: ShopStream
> >
> > V1: `{order_id, user_id, amount}`. Permintaan produk: tambah `delivery_method` untuk model delay. Field didefinisikan sebagai **union `["null","string"]` dengan `default: null`**, sehingga:
> >
> > - Producer V2 → consumer V1: **berhasil** (V1 mengabaikan field baru).
> > - Producer V1 → consumer V2: **berhasil** (V2 mengisi `null`).
> >
> > ```mermaid
> > flowchart TD
> >     P2["Producer v2<br/>+ delivery_method"] --> SR["Schema Registry<br/>cek kompatibilitas"]
> >     SR -->|"compatible"| K["Kafka topic"]
> >     SR -->|"409 Conflict"| X["Ditolak<br/>(breaking)"]
> >     K --> C1["Consumer v1<br/>mengabaikan field"]
> >     K --> C2["Consumer v2<br/>membaca field"]
> > ```
> >
> > ### Latihan: Aman atau Breaking?
> >
> > | Perubahan | Penilaian |
> > |---|---|
> > | Tambah `coupon_code` opsional | **Aman** (union null + default) |
> > | Rename `total_amount` → `order_total` | **Breaking** (field lama hilang) |
> > | Ubah `items_count` dari int ke string | **Breaking** (perubahan tipe) |
> > | Hapus `shipping_address` | **Breaking** bila wajib dan dipakai consumer |
> > | Tambah `currency` wajib tanpa default | **Breaking** (data lama tak punya nilai) |
> >
> > ### Checklist Verifikasi dan Keamanan
> >
> > Pesan terlihat di Kafka console consumer; file di MinIO pada path `dt=/hour=` yang benar; jumlah event di file = event yang diproduksi (**reconcile**); image consumer lolos Trivy. Keamanan: kredensial via env/secret, TLS dan topic ACL di produksi, dan **PII mentah di bronze** sehingga akses bucket harus dibatasi.

> [!cornell] #### Summary
>
> **Schema adalah API** antara tim producer dan consumer. **Avro** (ringkas, skema ditegakkan, schema resolution) cocok untuk pipeline dan bekerja dengan **Schema Registry** yang menegakkan mode **backward/forward/full**. **Data contract** melengkapi skema dengan semantik, kepemilikan, rentang nilai, freshness, dan klasifikasi PII. Evolusi aman: tambah field opsional dengan **union null + default**; breaking: hapus/rename field wajib, ubah tipe, atau tambah field wajib tanpa default.

> [!ad-libitum]- Additional Information
>
> #### Alat Kontrak Data
>
> Selain Schema Registry, ada spesifikasi **Open Data Contract Standard** dan alat seperti **Soda**, **dbt contracts**, dan **Pact** (untuk API). Pada sisi CI, gunakan cek kompatibilitas otomatis sebelum merge.
>
> #### Proyek Eksplorasi Mandiri
> 1. Daftarkan skema `OrderPlaced` v1 ke Schema Registry (mode BACKWARD), lalu coba daftarkan versi yang menghapus `order_id` dan catat respons 409.
>
> #### Bacaan Lanjutan
> - Confluent Docs — *Schema Evolution and Compatibility*.
> - Apache Avro — *Specification: Schema Resolution*.
