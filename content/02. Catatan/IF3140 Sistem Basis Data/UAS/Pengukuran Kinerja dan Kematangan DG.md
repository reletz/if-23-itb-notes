---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu Metrik DG?
> >     
> > - 3 Kategori Metrik DG?
> >     
> > - Apa saja Tools & Teknik DG?
> >     
> > - Apa itu DG Scorecard?
> >     
> > - 5 Kategori dalam Scorecard?
> >     
> > - Apa itu DG Maturity Model?
> >     
> > - Model Kematangan IBM?
> >     
> > - 5 Level Model IBM?
> >     
> > - Model Kematangan Stanford?
> >     
> > - 3 Dimensi Model Stanford?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 24-32
> >     
> 
> > ### Data Governance Metrics (Metrik DG)
> > 
> > Metrik diperlukan untuk **mengukur kemajuan (progress)** dari peluncuran (rollout) program DG, **kepatuhan (compliance)** terhadap aturan, dan **nilai (value)** yang dibawa DG ke organisasi.
> > 
> > Tiga kategori metrik (Slide 24):
> > 
> > 1. **Value (Nilai):** Mengukur kontribusi ke tujuan bisnis.
> >     
> >     - Contoh: Pengurangan risiko, peningkatan efisiensi operasional.
> >         
> > 2. **Effectiveness (Efektivitas):** Mengukur pencapaian tujuan program DG.
> >     
> >     - Contoh: Sejauh mana steward menggunakan tools, efektivitas komunikasi/training, kecepatan adopsi perubahan.
> >         
> > 3. **Sustainability (Keberlanjutan):** Mengukur kinerja kebijakan dan proses.
> >     
> >     - Contoh: Tingkat kepatuhan (conformance) terhadap standar dan prosedur.
> >         
> > 
> > ### Tools and Techniques (Alat dan Teknik)
> > 
> > Program DG juga perlu mengelola data-nya sendiri (misal: data kebijakan, data steward, data metrik). Tools membantu tugas ini.
> > 
> > Contoh tools (Slide 25):
> > 
> > - **Online Presence / Websites:** Portal internal untuk komunikasi, publikasi kebijakan, dan pendaftaran isu.
> >     
> > - **Business Glossary:** Alat/software khusus untuk mengelola kamus istilah bisnis.
> >     
> > - **Workflow Tools:** Mengotomatiskan alur kerja, misal: alur persetujuan akses data.
> >     
> > - **Document Management Tools:** Menyimpan dan mengelola versi dokumen kebijakan dan standar.
> >     
> > - **Data Governance Scorecards:** (Dibahas di bawah)
> >     
> > - **Data Governance Maturity Model:** (Dibahas di bawah)
> >     
> > 
> > ### Data Governance Scorecards
> > 
> > **Scorecard** adalah kumpulan metrik untuk melacak aktivitas DG dan kepatuhan kebijakan, yang dilaporkan secara rutin ke DGC dan Steering Committee (Slide 26).
> > 
> > Slide 27 memberikan contoh 5 kategori yang biasa diukur dalam Scorecard:
> > 
> > 1. **Organization:** Mengukur skill, training, dan kematangan tim. (KPI: Jumlah Data Steward tersertifikasi, tingkat kepuasan karyawan).
> >     
> > 2. **Data Infrastructure:** Mengukur kemajuan infrastruktur (misal: migrasi database lama). (KPI: Jumlah sistem yang menggunakan Master Data, % pengurangan biaya).
> >     
> > 3. **Data Controls:** Mengukur kepatuhan terhadap standar dan kelengkapan metadata. (KPI: Hasil tes kepatuhan, % penurunan kegagalan kebijakan).
> >     
> > 4. **Data Quality:** Mengukur peningkatan dimensi kualitas data. (KPI: % peningkatan kelengkapan data, tingkat akurasi data).
> >     
> > 5. **Financial:** Melacak ROI (Return of Investment) dari program DG. (KPI: Total budget vs aktual, % penghematan biaya operasi).
> >     
> > 
> > ### Data Governance Maturity Model (Model Kematangan DG)
> > 
> > Ini adalah **alat asesmen** yang membantu organisasi menilai **kondisi saat ini (current state)** dari program DG mereka. Tujuannya adalah untuk memetakan jalan menuju kondisi masa depan (future state) yang lebih baik.
> > 
> > #### 1. IBM Data Governance Maturity Model (Slide 29-30)
> > 
> > - Dibuat tahun 2007, berbasis model CMM (Capability Maturity Model).
> >     
> > - Model ini memiliki **5 Level Kematangan** (Slide 29):
> >     
> >     - **Level 1: Initial (Awal):** Proses tidak terduga, tidak terkontrol, dan **REAKTIF**.
> >         
> >     - **Level 2: Managed (Terkelola):** Proses dikelola dan dikarakterisasi di level **PROYEK**.
> >         
> >     - **Level 3: Defined (Terdefinisi):** Proses distandarisasi dan dikarakterisasi di level **ORGANISASI** (enterprise) dan bersifat **PROAKTIF**.
> >         
> >     - **Level 4: Quantitatively Managed (Terkelola Kuantitatif):** Proses diukur dan dikontrol secara **KUANTITATIF** (menggunakan metrik).
> >         
> >     - **Level 5: Optimizing (Optimasi):** Ada fokus pada **perbaikan proses terus-menerus** (Continuous Improvement).
> >         
> > - Selain 5 level, model IBM juga menilai 11 domain terpisah (Slide 30) yang dibagi menjadi: Supporting Disciplines, Core Disciplines, Enablers, dan Outcomes.
> >     
> > 
> > #### 2. Stanford Data Governance Maturity Model (Slide 31-32)
> > 
> > - Dibuat tahun 2011 oleh DGO Stanford, adaptasi dari IBM dan CMM.
> >     
> > - Fokusnya pada 2 komponen (Foundational & Project) dan 3 dimensi:
> >     
> >     1. **People:** Sejauh mana kesadaran (awareness) dan formalisasi peran (stewardship).
> >         
> >     2. **Policies:** Sejauh mana kebijakan didefinisikan, diterapkan, dan ditegakkan.
> >         
> >     3. **Capabilities:** Sejauh mana ketersediaan dan penggunaan tools yang mendukung.
> >         
> > - Model ini juga membedakan tipe pengukuran: **Qualitative** (Kualitatif) dan **Quantitative** (Kuantitatif).
> >     

> [!cornell] #### Summary
> 
> **Untuk memastikan DG berhasil, kinerjanya harus diukur menggunakan `Metrics` (Value, Effectiveness, Sustainability) dan dilaporkan secara rutin melalui `Data Governance Scorecards` (mencakup 5 kategori: Organisasi, Infrastruktur, Kontrol, Kualitas, Finansial). Selain itu, organisasi dapat menilai posisinya menggunakan `Maturity Model` (alat asesmen) seperti model IBM (5 level dari Initial ke Optimizing) atau model Stanford (berbasis komponen Foundational/Project dan dimensi People/Policies/Capabilities) untuk merencanakan perbaikan berkelanjutan.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Kapan Menggunakan Model IBM vs Stanford?
> 
> - **Model IBM:** Cenderung lebih komprehensif, detail, dan 'berat'. Model ini sangat baik untuk organisasi besar (enterprise) yang ingin melakukan asesmen sangat mendalam di 11 domain berbeda (Data Quality, Metadata, Security, dll). Ini membutuhkan upaya asesmen yang lebih besar.
>     
> - **Model Stanford:** Cenderung lebih sederhana dan lebih fokus pada aspek fundamental (Foundational) dan proyek (Project). Dengan 3 dimensi (People, Policies, Capabilities), model ini lebih mudah diadopsi dan dipahami oleh organisasi yang baru memulai atau ingin asesmen yang lebih cepat dan praktis.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Berdasarkan 5 level model IBM, kira-kira program "Data Governance" di lingkungan kampus Anda (misal: pengelolaan data KRS, nilai, data mahasiswa) berada di level berapa? Apakah masih **Level 1 (Reaktif)** saat ada masalah, atau sudah **Level 3 (Terdefinisi)** dengan kebijakan yang jelas untuk seluruh universitas?
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - [1] How to create a data governance scorecard (Template) - (lightsondata.com)
>     
> - [3] The IBM Data Governance Council Maturity Model - (databaser.net)
>     
> - [4] Stanford data governance maturity models - (lightsondata.com)
>