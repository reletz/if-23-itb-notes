---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] DAMA-DMBOK Knowledge Areas
>
> > ## Questions/Cues
> >
> > - Apa itu DAMA dan DMBOK?
> > - Apa saja 11 knowledge area DMBOK2?
> > - Tiga "lensa" apa yang dipakai di kuliah ini dan bagaimana kaitannya dengan governance?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps: Security, Quality & Privacy (Slides 8-11)
>
> > ### Apa Itu DAMA-DMBOK?
> >
> > - **DAMA** = *Data Management Association International*.
> > - **DMBOK** = *Data Management Body of Knowledge*: kosakata dan kerangka untuk mengelola **data sebagai aset**.
> > - Ia **bukan tool atau metodologi**; ia memberi tahu **area apa yang harus dicakup**, bukan produk apa yang dibeli.
> > - DMBOK2 mendefinisikan **11 knowledge area** dengan **Data Governance di pusat**.
> >
> > ### 11 Knowledge Area
> >
> > | # | Area | Pertanyaan yang dijawab |
> > |---|---|---|
> > | 1 | **Data Governance** | Siapa memutuskan, siapa pemilik, apa aturannya? |
> > | 2 | Data Architecture | Apa cetak biru aliran data? |
> > | 3 | Data Modeling and Design | Bagaimana data distrukturkan dan direpresentasikan? |
> > | 4 | Data Storage and Operations | Di mana data tinggal; bagaimana dijalankan dan dipulihkan? |
> > | 5 | **Data Security** | Siapa boleh mengakses, mengubah, atau menghilangkan apa? |
> > | 6 | Data Integration and Interoperability | Bagaimana data berpindah dan digabung antar-sistem? |
> > | 7 | Document and Content Management | Bagaimana konten tak terstruktur dan record dikelola? |
> > | 8 | Reference and Master Data | Apa versi tunggal yang disepakati untuk entitas kunci? |
> > | 9 | Data Warehousing and BI | Bagaimana data disiapkan untuk analisis dan pelaporan? |
> > | 10 | **Metadata Management** | Apa yang kita ketahui tentang data kita? |
> > | 11 | **Data Quality** | Apakah data layak untuk penggunaan yang dimaksud? |
> >
> > ### Tiga Lensa Kuliah, Diikat Governance
> >
> > | Area | Pertanyaan inti | Contoh PayLend |
> > |---|---|---|
> > | **Data Quality** | Layakkah dipakai? | `currency_code = "USDD"` tak valid; `transaction_id` datang dua kali |
> > | **Data Security** | Terlindungikah? | SSN ditokenisasi, kartu menjadi 4 digit terakhir, masking per role |
> > | **Metadata Management** | Tahukah kita apa yang kita punya? | `ssn` ditag PII, `credit_card_num` ditag PCI di katalog |
> > | **Data Governance** | Siapa yang akuntabel? | Pemilik kontrak transaksi; siapa yang menyetujui akses ke token |
> >
> > ```mermaid
> > flowchart TB
> >     G["Data Governance<br/>akuntabilitas, kebijakan, audit"]
> >     G --> Q["Data Quality<br/>fit for use?"]
> >     G --> S["Data Security<br/>protected?"]
> >     G --> M["Metadata Management<br/>do we know what we have?"]
> >     M -->|"tag PII/PCI"| S
> >     Q -.->|"validasi juga kontrol keamanan"| S
> > ```

> [!cornell] #### Summary
>
> **DAMA-DMBOK** adalah kerangka pengetahuan (bukan tool) untuk mengelola data sebagai aset, dengan **11 knowledge area** dan **Data Governance** sebagai pusat. Kuliah ini memakai tiga lensa — **Data Quality, Data Security, Metadata Management** — yang diikat oleh governance (siapa akuntabel). Metadata (tag PII/PCI) memicu kontrol keamanan, sedangkan validasi kualitas juga berfungsi sebagai kontrol keamanan.

> [!ad-libitum]- Additional Information
>
> #### Kerangka Pelengkap
>
> **DCAM** (EDM Council) dan **ISO 8000** (kualitas data) melengkapi DMBOK; untuk privasi, **GDPR** dan **UU PDP** Indonesia. Alat katalog: DataHub, OpenMetadata, Apache Atlas.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih tiga dari 11 area dan petakan satu artefak nyata di proyek Anda untuk tiap area (mis. skema = data modeling, katalog = metadata).
>
> #### Bacaan Lanjutan
> - DAMA International — *DAMA-DMBOK2*.
> - OpenMetadata Docs — *Data Governance*.
