---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] File and Data Conversion - ETL
>
> > ## Questions/Cues
> >
> > - Apa perbedaan implementasi sistem baru vs upgrade?
> > - Mengapa konversi data diperlukan saat mengganti sistem?
> > - Apa yang dimaksud dengan proses ETL?
> > - Apa saja tahapan dalam ETL?
> > - Kapan re-keying lebih baik daripada ETL otomatis?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 5-6)
>
> > ### Sistem Baru vs Upgrade/Penggantian
> >
> > Implementasi sistem baru pasti akan **membutuhkan data**. Terdapat dua skenario utama:
> >
> > **Sistem yang sepenuhnya baru (entirely new)**: jika tidak ada sistem pendahulu, maka data harus **dibuat secara manual** atau dari catatan kertas (paper records) seperti faktur (invoices) atau pesanan pelanggan (customer orders) yang sudah ada. Proses ini umumnya lambat dan rawan kesalahan input manusia.
> >
> > **Upgrade atau penggantian (replacement)**: di era sekarang, **sebagian besar implementasi** merupakan upgrade terhadap, atau penggantian dari, sistem yang sudah ada. Dalam kasus ini, data lama yang sudah ada perlu **dikonversi ke format baru**, dan diperlukan latihan **data mapping** untuk menentukan cara terbaik mengonversi data lama ke baru serta mengidentifikasi potensi masalah.
> >
> > Contoh: Sebuah retailer yang berpindah dari sistem POS lama ke ERP modern harus mengonversi jutaan record produk, harga, dan riwayat transaksi, bukan menginputnya ulang dari nol.
> >
> > ### Proses ETL (Extract, Transform, Load)
> >
> > Proses konversi data dari sistem lama ke sistem baru dapat **diotomasi**, baik melalui software **bespoke** (dibuat khusus) maupun paket **commercial off-the-shelf (COTS)**. Proses ini disebut **ETL (Extract, Transform, and Load)**, yang menandakan tiga langkah berikut:
> >
> > 1. **Extract**: ekstraksi data dari sistem lama (old system). Data ditarik dari sumbernya, yang bisa berupa database relasional, file flat, atau sistem legacy.
> > 2. **Transform**: melakukan suatu bentuk **transformasi** atas data yang diekstrak agar **sesuai (suitable)** untuk sistem baru. Tahap ini mencakup pembersihan data (cleansing), penyesuaian format, penggabungan/pemisahan field, dan penerapan aturan bisnis.
> > 3. **Load**: memuat (load) data yang telah ditransformasi ke dalam sistem baru.
> >
> > ```mermaid
> > flowchart LR
> >     OLD["Old System<br/>(data lama)"] --> E["Extract<br/>(tarik data)"]
> >     E --> T["Transform<br/>(sesuaikan format,<br/>cleansing)"]
> >     T --> L["Load<br/>(muat data)"]
> >     L --> NEW["New System<br/>(data baru)"]
> > ```
> >
> > ETL merupakan tulang punggung migrasi data dan juga banyak digunakan dalam data warehousing serta business intelligence.
> >
> > ### Bespoke vs COTS vs Re-keying
> >
> > Terdapat tiga pendekatan untuk melakukan konversi data:
> >
> > **Bespoke ETL software**: program konversi yang dikembangkan khusus untuk kebutuhan migrasi tertentu. Fleksibel namun memerlukan biaya dan waktu pengembangan.
> >
> > **COTS package**: paket komersial siap pakai untuk ETL. Lebih cepat tersedia tetapi memerlukan biaya lisensi pembelian.
> >
> > **Re-keying (input ulang manual)**: terkadang biaya pengembangan bespoke ETL atau pembelian COTS terlalu **berlebihan (excessive)** atau **tidak memungkinkan dalam batasan waktu (time constraints)**. Dalam kasus ini, mungkin lebih **cepat dan mudah** untuk meng-input ulang (re-key) data secara manual ke sistem baru. Pendekatan ini biasanya hanya layak untuk volume data yang kecil.

> [!cornell] #### Summary
>
> Implementasi pasti membutuhkan **data**: sistem yang **sepenuhnya baru** memerlukan pembuatan data manual dari catatan kertas, sedangkan **upgrade/penggantian** memerlukan **konversi** data lama ke format baru melalui **data mapping**. Proses konversi otomatis disebut **ETL (Extract, Transform, Load)** yang dapat diimplementasikan via software **bespoke** atau paket **COTS**. ETL terdiri dari **extract** data lama, **transform** agar sesuai sistem baru, dan **load** ke sistem baru. Bila biaya bespoke/COTS terlalu mahal atau terkendala waktu, **re-keying** manual bisa menjadi alternatif yang lebih cepat untuk volume data kecil.

> [!ad-libitum]- Additional Information
>
> #### Tahap Transform Lebih Dalam
>
> Operasi umum dalam tahap Transform meliputi:
>
> - **Data cleansing**: menghapus duplikat, memperbaiki nilai tidak valid, menstandarkan format.
> - **Deduplication**: menggabungkan record yang merujuk entitas sama.
> - **Derivation**: menghitung field turunan (misal usia dari tanggal lahir).
> - **Lookup/enrichment**: memperkaya data dengan referensi eksternal.
>
> #### ELT sebagai Variasi Modern
>
> Pada arsitektur big data dan cloud, urutan kadang dibalik menjadi **ELT (Extract, Load, Transform)**: data mentah dimuat dulu ke data lake/warehouse (misal BigQuery, Snowflake) lalu ditransformasi di tempat menggunakan tenaga komputasi platform.
>
> #### Tools dan Resources
>
> - ETL/ELT: Talend, Apache NiFi, Informatica, Pentaho, dbt
> - Cloud: AWS Glue, Azure Data Factory, Google Dataflow
> - Validasi: Great Expectations, custom test comparator
>
> #### Self-Exploration Projects
>
> 1. Bangun pipeline ETL sederhana dengan Python (pandas) untuk memigrasikan CSV legacy ke skema database baru.
> 2. Bandingkan biaya dan waktu antara re-keying manual vs ETL otomatis untuk dataset 1.000 dan 1.000.000 record.
> 3. Eksplorasi transformasi data cleansing pada dataset alamat pelanggan yang tidak konsisten.
>
> #### Further Reading
>
> - Kimball & Caserta, *The Data Warehouse ETL Toolkit*
> - Documentation Talend Open Studio
> - BCS, *Business Analysis* — bab Implementation
