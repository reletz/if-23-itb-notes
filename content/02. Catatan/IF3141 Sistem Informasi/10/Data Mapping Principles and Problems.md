---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Data Mapping Principles and Problems
>
> > ## Questions/Cues
> >
> > - Apa definisi dari data mapping?
> > - Masalah apa saja yang muncul saat data mapping?
> > - Bagaimana isu field type dan field length ditangani?
> > - Apa peran semantics dalam pemetaan data?
> > - Bagaimana langkah perencanaan dan pengujian konversi data?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 7-9)
>
> > ### Pengertian Data Mapping
> >
> > **Data mapping** adalah istilah untuk aktivitas yang **mengidentifikasi data mana dari sistem lama yang dapat dimigrasikan ke sistem baru**. Aktivitas ini menjadi jembatan antara struktur data lama dan baru, menentukan korespondensi antar-field, dan mengungkap potensi masalah sebelum konversi aktual dijalankan.
> >
> > Contoh: Field `nama_pelanggan` di sistem lama mungkin dipetakan ke field `customer_full_name` di sistem baru, sementara field tertentu di sistem lama mungkin tidak memiliki pasangan sama sekali di sistem baru.
> >
> > ### Masalah-Masalah dalam Data Mapping
> >
> > Sejumlah isu dapat muncul saat melakukan pemetaan, antara lain:
> >
> > **Field type (tipe field)**: misalnya, nomor produk di sistem lama disimpan sebagai field **alfanumerik**, sedangkan di sistem baru nomor produk disimpan sebagai **numerik saja**. Perbedaan tipe ini memerlukan konversi dan penanganan kasus yang tidak cocok.
> >
> > **Field length (panjang field)**: jika field di sistem baru **lebih pendek** daripada di sistem lama, maka perlu dibuat **keputusan bisnis** apakah data yang terpotong (truncated) dapat diterima.
> >
> > **Field structures (struktur field)**: misalnya, alamat pelanggan di sistem lama disimpan sebagai **satu field alamat tunggal**, tetapi di sistem baru disimpan dalam **tiga field alamat** terpisah. Diperlukan logika pemecahan (parsing) untuk memetakannya.
> >
> > **Required fields (field wajib)**: beberapa data yang diperlukan oleh sistem baru mungkin **tidak tersedia** di sistem lama, sehingga harus dilengkapi dari sumber lain atau diisi dengan nilai default.
> >
> > **Semantics (semantik/makna)**: misalnya, saat memetakan data untuk **'Title'**, pada sistem lama nilainya mungkin mencakup Mister, Miss, Ms, Doctor, Sir, Lord, dan seterusnya, tetapi pada sistem baru 'Title' mungkin hanya bermakna gelar formal saja. Perbedaan makna ini harus dipetakan dengan hati-hati agar tidak salah interpretasi.
> >
> > **Validation (validasi)**: rutinitas konversi (conversion routines) dapat menyertakan **tes** untuk memvalidasi bahwa data pada sistem baru telah dikonversi dengan benar.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph OLD["Sistem Lama"]
> >         O1["product_no<br/>(alfanumerik)"]
> >         O2["address<br/>(1 field)"]
> >         O3["title<br/>(bebas)"]
> >     end
> >     subgraph NEW["Sistem Baru"]
> >         N1["product_no<br/>(numerik)"]
> >         N2["address1/2/3<br/>(3 field)"]
> >         N3["title<br/>(gelar formal)"]
> >     end
> >     O1 -->|"Field type"| N1
> >     O2 -->|"Field structure"| N2
> >     O3 -->|"Semantics"| N3
> > ```
> >
> > ### Perencanaan, Pengujian, dan Pelaksanaan Konversi
> >
> > Konversi data, seperti aktivitas atau proyek lainnya, akan **lebih berhasil jika direncanakan dengan baik**. Aktivitas perencanaan harus mencakup:
> >
> > 1. **Identify steps**: mengidentifikasi langkah-langkah yang diperlukan untuk konversi.
> > 2. **Decide timing**: memutuskan waktu kapan konversi data sebenarnya harus dilakukan (misal saat low traffic / akhir pekan).
> > 3. **Writing or purchasing the conversion routines**: menulis atau membeli rutinitas konversi.
> > 4. **Using automated test comparator**: menggunakan **automated test comparator** untuk membandingkan data baru dengan data lama dan menguji rutinitas konversi.
> > 5. **Actual file conversion**: pelaksanaan konversi file yang sebenarnya.
> >
> > Penggunaan **automated test comparator** sangat penting karena memverifikasi integritas konversi secara otomatis pada volume data besar, jauh lebih andal dibandingkan pemeriksaan manual sampel.

> [!cornell] #### Summary
>
> **Data mapping** adalah aktivitas yang mengidentifikasi data sistem lama mana yang dapat dimigrasikan ke sistem baru. Sejumlah masalah dapat muncul: perbedaan **field type** (alfanumerik vs numerik), **field length** (risiko truncation), **field structures** (satu field vs banyak field), **required fields** yang tidak tersedia di sistem lama, **semantics** (perbedaan makna seperti 'Title'), dan kebutuhan **validation** melalui rutinitas konversi. Konversi data lebih sukses bila direncanakan: identifikasi langkah, tentukan waktu, tulis/beli conversion routines, gunakan **automated test comparator** untuk membandingkan data baru dengan lama, lalu lakukan konversi file aktual.

> [!ad-libitum]- Additional Information
>
> #### Teknik Penanganan Masalah Mapping
>
> - **Type casting & default values**: konversi tipe data dengan aturan fallback untuk nilai tidak valid.
> - **String parsing & regex**: memecah field gabungan (alamat tunggal) menjadi komponen.
> - **Lookup table mapping**: tabel referensi untuk memetakan nilai semantik (mis. normalisasi 'Title').
> - **Reconciliation report**: laporan jumlah record sumber vs target untuk mendeteksi data hilang.
>
> #### Automated Test Comparator
>
> Comparator otomatis membandingkan dataset sumber dan target berdasarkan:
>
> - **Row count reconciliation**: memastikan jumlah baris cocok.
> - **Checksum/hash comparison**: verifikasi integritas nilai field kritis.
> - **Spot-check sampling**: validasi record acak secara mendetail.
>
> #### Self-Exploration Projects
>
> 1. Buat data mapping document (source-to-target) untuk migrasi tabel pelanggan dengan 5 isu mapping berbeda.
> 2. Tulis script perbandingan otomatis (Python/SQL) yang melaporkan ketidakcocokan setelah konversi.
> 3. Rancang lookup table untuk menormalisasi field 'Title' dari nilai bebas menjadi gelar formal.
>
> #### Tools dan Resources
>
> - Data quality: Talend Data Quality, OpenRefine
> - Comparison: WinMerge, Beyond Compare, SQL EXCEPT/MINUS
> - Profiling: Apache Griffin, Great Expectations
>
> #### Further Reading
>
> - Kimball, *The Data Warehouse ETL Toolkit* — bab data cleansing
> - BCS, *Business Analysis* — Data Migration
> - DAMA-DMBOK (Data Management Body of Knowledge)
