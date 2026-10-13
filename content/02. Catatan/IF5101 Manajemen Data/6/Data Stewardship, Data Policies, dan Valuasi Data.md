---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Data Stewardship, Data Policies, dan Valuasi Data
>
> > ## Questions/Cues
> >
> > - Apa itu **data stewardship** dan siapa **data steward**?
> > - Apa saja aktivitas steward?
> > - Apa saja **tipe data steward**?
> > - Apa itu **data policy** dan **data asset valuation**?
> > - Bagaimana cara mengukur nilai data?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Governance (Slides 20-22)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 3.2.5, 3.3.2
>
> > ### Data Stewardship
> >
> > **Data stewardship** adalah label paling umum untuk **akuntabilitas dan tanggung jawab** atas data dan proses yang memastikan kontrol dan penggunaan aset data yang efektif. Dapat diformalkan lewat jabatan/job description atau berupa fungsi yang lebih informal. Kadang disebut *data custodian* atau *data trustee*.
> >
> > Aktivitas stewardship:
> >
> > - Membuat dan mengelola **metadata inti**.
> > - Mendokumentasikan **aturan dan standar**.
> > - Mengelola **isu kualitas data**.
> > - Menjalankan aktivitas **operasional data governance**.
> >
> > Steward mengelola aset data **atas nama pihak lain** (stakeholder) dan demi **kepentingan terbaik organisasi**.
> >
> > ### Tipe Data Steward
> >
> > | Tipe | Peran |
> > | --- | --- |
> > | **Chief data steward** | Ketua badan data governance |
> > | **Executive data steward** | Manajer senior; duduk di data governance council |
> > | **Enterprise data steward** | Mengawasi satu *data domain* lintas fungsi bisnis |
> > | **Business data steward** | Profesional bisnis, pakar domain (SME) |
> > | **Data owner** | Business data steward dengan **otoritas persetujuan** keputusan data di domainnya |
> > | **Technical data steward** | Profesional TI di knowledge area tertentu: data integration specialist, DBA, BI specialist, data quality analyst |
> > | **Coordinating data steward** | Memimpin dan mewakili tim steward bisnis & teknis lintas tim dan ke executive steward |
> >
> > ```mermaid
> > flowchart TD
> >     CH["Chief data steward"] --> EX["Executive data stewards<br/>(council)"]
> >     EX --> EN["Enterprise data stewards<br/>(per domain)"]
> >     EN --> CO["Coordinating data stewards"]
> >     CO --> BU["Business data stewards<br/>+ data owners"]
> >     CO --> TE["Technical data stewards"]
> > ```
> >
> > ### Data Policies
> >
> > **Data policy** adalah **direktif yang mengkodifikasi prinsip dan niat manajemen** menjadi aturan fundamental mengenai **pembuatan, perolehan, integritas, keamanan, kualitas, dan penggunaan** data dan informasi.
> >
> > ### Data Asset Valuation
> >
> > Proses memahami dan menghitung **nilai ekonomi** data bagi organisasi. Cara mengukur:
> >
> > - **Penggunaan** data vs biaya perolehan, penyimpanan, dan manajemen risiko.
> > - **Replacement cost** — biaya mengganti bila hilang.
> > - **Market value** — harga pasar data sejenis.
> > - **Identified opportunities** — peluang bisnis yang dibuka.
> > - **Selling data** — pendapatan dari penjualan data.
> > - **Risk cost** — biaya risiko bila data bocor/salah.

> [!cornell] #### Summary
>
> **Data stewardship** adalah akuntabilitas dan tanggung jawab atas data dan proses yang menjamin kontrol dan penggunaan data yang efektif; steward mengelola aset **atas nama stakeholder**. Tipe: chief, executive, enterprise, business, **data owner**, technical, dan coordinating steward. **Data policy** mengkodifikasi prinsip menjadi aturan atas pembuatan, perolehan, integritas, keamanan, kualitas, dan penggunaan data. **Valuasi aset data** dilakukan lewat penggunaan vs biaya, replacement cost, market value, peluang, penjualan data, dan risk cost.

> [!ad-libitum]- Additional Information
>
> #### Owner vs steward vs custodian
>
> *Owner* memutuskan (akuntabel), *steward* mengelola kualitas/definisi sehari-hari (responsible), *custodian* mengoperasikan penyimpanan dan keamanan teknis. Banyak organisasi yang gagal karena tidak menunjuk nama konkret.
>
> #### Contoh kebijakan data
>
> "Semua data PII wajib dienkripsi saat disimpan dan diakses hanya via peran berizin"; "Retensi log akses 12 bulan"; "Definisi *Active Customer* ditetapkan oleh Business Data Owner Penjualan".
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tetapkan struktur steward untuk domain *Mahasiswa* di kampus: siapa owner, siapa technical steward.
> 2. Estimasi valuasi dataset sederhana dengan tiga pendekatan di atas dan bandingkan hasilnya.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 3.2.5 dan 3.3.
> - Seiner, R. S. (2014). *Non-Invasive Data Governance* (bab tentang steward).
