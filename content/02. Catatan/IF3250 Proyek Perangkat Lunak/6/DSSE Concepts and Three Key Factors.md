---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] DSSE: Concepts and Three Key Factors
>
> > ## Questions/Cues
> >
> > - Apa motivasi Domain-Specific Software Engineering (DSSE)?
> > - Apa beda Traditional, Architecture-Based, dan Domain-Specific SE?
> > - Apa contoh domain (vertikal vs horizontal)?
> > - Apa tiga faktor kunci DSSE dan kombinasi irisannya?
> > - Apa itu product-line architecture dan domain-specific tools?
> >
> > ## Reference Points
> >
> > - Domain Specific Software Engineering (Halaman 4-8, 9-17)
> > - Domain Specific Software Architecture (Halaman 10-13, 20)
>
> > ### Motivasi DSSE
> >
> > Pandangan tradisional software engineering mengajarkan cara membuat solusi untuk masalah **de novo** (dari nol). Namun **mulai dari nol setiap kali itu tidak feasible** — akan banyak "menemukan ulang roda".
> >
> > Logikanya: **Similar problem → Similar solution → similar software**. Begitu kita telah membangun sejumlah sistem yang melakukan hal serupa, kita memperoleh **pengetahuan kritis** untuk mengeksploitasi solusi umum atas masalah umum. Secara teori, kita cukup membangun **"the difference"** antara sistem target baru dan sistem-sistem sebelumnya.
> >
> > Definisi ringkas: **DSSE adalah pendekatan software engineering yang dicirikan oleh pemanfaatan ekstensif *existing domain knowledge*** (leveraging existing domain knowledge).
> >
> > ### Examples of Domains
> >
> > Contoh domain: compiler bahasa pemrograman, consumer electronics, e-commerce/web stores, video game, business applications (Basic/Standard/"Pro"). Domain dapat **disubdivisi**: Avionics systems → Boeing Jets → Boeing 747-400 (System Family → Specific System dalam Application Domain pada Problem Space).
> >
> > **Contoh Domain** (klasifikasi):
> >
> > - **Domain Vertikal (Industry-specific)**: Perbankan, Pertambangan, Pendidikan, Airline, …
> > - **Domain Horizontal**: Office Automation, ERP, CRM, CASE Tools, Compiler bahasa pemrograman, …
> >
> > ### Traditional vs Architecture-Based vs Domain-Specific SE
> >
> > ```mermaid
> > flowchart TD
> >     subgraph T["Traditional SE"]
> >         T1["1 problem → tak terhitung cara<br/>'Too many choices', 'Different concepts'"]
> >     end
> >     subgraph A["Architecture-Based SE"]
> >         A1["1 problem → segelintir architectural styles<br/>→ implementasi spesifik"]
> >     end
> >     subgraph D["Domain-Specific SE"]
> >         D1["region problem space (domain)<br/>→ DSSA → application-specific arch → implementasi"]
> >     end
> >     T --> A --> D
> > ```
> >
> > - **Traditional Software Engineering** — satu masalah bisa diselesaikan dengan **cara tak terhitung banyaknya** ("too many choices", konsep berbeda-beda). Pemetaan problem space ke solution space sangat lebar.
> > - **Architecture-Based Software Engineering** — diberi satu masalah, kita memilih dari **segelintir architectural styles/architectures**, lalu menuju implementasi spesifik. Pertanyaan: "What's the effective software architectures?" dan "How to implement?".
> > - **Domain-Specific Software Engineering** — kita memetakan **region problem space (domain)** ke **domain-specific software architectures (DSSA)**, yang dispesialisasi menjadi **application-specific architectures**, lalu diimplementasi. Alur: *Which domain? → Reference architecture → Application-specific architecture → How to implement?*
> >
> > ### Tiga Faktor Kunci DSSE
> >
> > ```mermaid
> > flowchart TB
> >     subgraph Venn["Tiga Faktor Kunci"]
> >         D["Domain"]
> >         B["Business"]
> >         T["Technology"]
> >     end
> >     D ---|"Corporate Core Competencies"| B
> >     D ---|"Application Family Architectures"| T
> >     B ---|"Domain Independent Infrastructure"| T
> >     D --- DBT["Domain + Business + Technology<br/>= DSSE"]
> >     B --- DBT
> >     T --- DBT
> > ```
> >
> > - **Domain** — harus ada domain untuk **membatasi problem space** dan memfokuskan pengembangan.
> > - **Technology** — harus ada beragam solusi teknologi (tools, patterns, architectures & styles, legacy systems) untuk diterapkan pada domain.
> > - **Business** — tujuan bisnis memotivasi penggunaan DSSE: **minimizing costs** (reuse aset bila mungkin) dan **maximize market** (kembangkan banyak aplikasi terkait untuk berbagai end user).
> >
> > **Kombinasi irisan**:
> >
> > | Kombinasi | Hasil |
> > |---|---|
> > | **Domain + Business** | **Corporate Core Competencies** — keahlian domain yang diperkuat *business acumen* & pengetahuan pasar |
> > | **Domain + Technology** | **Application Family Architectures** — semua solusi teknologi yang mungkin untuk masalah dalam domain, tapi *uninformed* & tak dibatasi tujuan bisnis |
> > | **Business + Technology** | **Domain Independent Infrastructure** — tools & teknik membangun sistem lepas dari domain tertentu (mis. ADL generik, UML, compiler, word processor, PC general-purpose) |
> > | **Domain + Business + Technology** | **Domain-Specific Software Engineering** — menerapkan teknologi pada tujuan domain-specific, dimoderasi pengetahuan bisnis & pasar |
> >
> > **Product-Line Architectures** — sekumpulan solusi spesifik yang terkait dalam DSSE yang lebih luas; lebih fokus pada **commonalities dan variability** antar solusi individual.
> >
> > ### Domain-Specific Tools
> >
> > **CASE Tool atau Language** spesifik domain (mis. **Unity3D** untuk game, **Actulus Modeling Language** untuk pemodelan risiko) memberi: pengembangan lebih cepat, serta menyatukan **native problem concepts dan programming concepts**. Contoh ekspresi DSL Actulus: `riskmodel RiskLifeDeath(p : Person) : LifeDeath(p) where ...`.

> [!cornell] #### Summary
>
> **DSSE** berangkat dari ketidakefisienan membangun *de novo*: karena *similar problem → similar solution*, kita bisa **memanfaatkan domain knowledge** dan hanya membangun "the difference". Spektrum pendekatan: **Traditional SE** (terlalu banyak pilihan) → **Architecture-Based SE** (pilih dari segelintir style) → **DSSE** (petakan domain ke DSSA lalu ke aplikasi). Domain bisa **vertikal** (industry-specific) atau **horizontal**. DSSE berdiri di irisan **tiga faktor: Domain, Business, Technology** — dengan kombinasi menghasilkan *Corporate Core Competencies*, *Application Family Architectures*, dan *Domain Independent Infrastructure*. Konsep ini diwujudkan via [[Domain Model]] dan [[Domain-Specific Software Architecture (DSSA)]].

> [!ad-libitum]- Additional Information
>
> #### Hubungan dengan Reuse Large-Scale
>
> Prinsip "bangun dari komponen reuse, sisakan kode baru untuk requirement baru" pada [[Large-Scale Software Problems and Characteristics]] adalah motivasi yang sama dengan DSSE — keduanya menolak membangun dari nol pada masalah yang berulang.
>
> #### Vertikal vs Horizontal
>
> Domain **vertikal** menukik ke satu industri (perbankan, penerbangan) — pengetahuannya dalam tetapi sempit. Domain **horizontal** memotong banyak industri (ERP, CRM, office automation) — luas tetapi generik. Product line sering dibangun di domain vertikal agar commonality-nya kuat.
>
> #### Further Reading
>
> - Richard N. Taylor, Nenad Medvidovic, Eric Dashofy, *Software Architecture: Foundations, Theory, and Practice*, John Wiley & Sons, 2019 — Chapter 15.
> - Dines Bjorner, *From Domains to Requirements*.
