---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Goals, Principles, dan Data-centric Organization
>
> > ## Questions/Cues
> >
> > - Apa **tujuan** data governance dan tiga sifat program yang berhasil?
> > - Apa enam **prinsip** data governance?
> > - Apa ciri **data-centric organization**?
> > - Mengapa mengelola data berbeda dengan mengelola TI?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Governance (Slides 11-14)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 3.1.2-3.2
>
> > ### Tujuan Data Governance
> >
> > Memungkinkan organisasi **mengelola data sebagai aset**. DG menyediakan **prinsip, kebijakan, proses, framework, metrics, dan oversight** untuk mengelola data sebagai aset dan memandu aktivitas data management di semua tingkat, serta **memantau dan mengarahkan** kepatuhan kebijakan, penggunaan data, dan aktivitas pengelolaan.
> >
> > Agar berhasil, program DG harus:
> >
> > | Sifat | Arti |
> > | --- | --- |
> > | **Sustainable** | Proses berkelanjutan yang butuh komitmen organisasi: kepemimpinan, sponsor, dan *ownership* bisnis |
> > | **Embedded** | Tertanam dalam metode pengembangan perangkat lunak, analytics, master data, dan manajemen risiko |
> > | **Measured** | Berdampak finansial positif; membuktikannya butuh *baseline* dan rencana perbaikan terukur |
> >
> > ### Enam Prinsip
> >
> > 1. **Leadership and strategy** — dimulai dari kepemimpinan visioner dan berkomitmen; aktivitas dipandu *data strategy* yang diturunkan dari strategi bisnis.
> > 2. **Business-driven** — DG adalah program bisnis; mengatur keputusan TI terkait data sama seperti interaksi bisnis dengan data.
> > 3. **Shared responsibility** — tanggung jawab bersama antara *business data steward* dan profesional data management teknis.
> > 4. **Multi-layered** — terjadi di tingkat enterprise, lokal, dan di antaranya.
> > 5. **Framework-based** — butuh *operating framework* yang mendefinisikan akuntabilitas dan interaksi.
> > 6. **Principle-based** — prinsip adalah fondasi aktivitas dan kebijakan DG.
> >
> > ### Data-centric Organization
> >
> > Organisasi yang **menghargai data sebagai aset** dan mengelolanya di seluruh fase lifecycle; kualitas data tinggi menjadi tujuan proses bisnis. Perlu disadari bahwa **mengelola data berbeda dengan mengelola TI**.
> >
> > Prinsip bersama:
> >
> > - Data dikelola sebagai **aset korporasi**.
> > - Praktik terbaik data management **diberi insentif** di seluruh organisasi.
> > - **Strategi data enterprise** selaras langsung dengan strategi bisnis.
> > - Proses data management **terus diperbaiki**.
> >
> > ```mermaid
> > flowchart TD
> >     BS["Strategi bisnis"] --> DS["Strategi data enterprise"]
> >     DS --> P["Prinsip &amp; kebijakan DG"]
> >     P --> F["Operating framework<br/>akuntabilitas &amp; interaksi"]
> >     F --> E["Eksekusi data management<br/>(embedded, measured)"]
> >     E -->|"metrics"| BS
> > ```

> [!cornell] #### Summary
>
> Tujuan DG: mengelola data sebagai aset lewat **prinsip, kebijakan, proses, framework, metrics, dan oversight**. Program harus **sustainable, embedded, dan measured**. Enam prinsip: **leadership & strategy, business-driven, shared responsibility, multi-layered, framework-based, principle-based**. **Data-centric organization** memandang data sebagai aset korporasi, memberi insentif praktik baik, menyelaraskan strategi data dengan strategi bisnis, dan terus memperbaiki prosesnya — dan membedakan mengelola data dari mengelola TI.

> [!ad-libitum]- Additional Information
>
> #### Contoh "embedded"
>
> Menambahkan *data impact review* ke checklist Definition of Done, atau gate persetujuan skema di pipeline CI/CD sehingga perubahan skema yang melanggar standar penamaan/PII ditolak otomatis.
>
> #### Strategi data vs. strategi TI
>
> Strategi TI menjawab "sistem apa yang kita bangun"; strategi data menjawab "data apa yang dibutuhkan bisnis, kualitas, dan siapa yang bertanggung jawab". Keduanya terkait tetapi tidak identik.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil enam prinsip dan nilai sebuah organisasi (kampus/perusahaan) 1-5 untuk masing-masing, jelaskan bukti.
> 2. Rancang tiga metrik yang membuktikan program DG "measured".
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 3.1.2 (Goals & Principles).
> - Seiner, R. S. (2014). *Non-Invasive Data Governance*. Technics Publications.
