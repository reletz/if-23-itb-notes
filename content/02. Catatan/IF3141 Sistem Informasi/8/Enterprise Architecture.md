---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Enterprise Architecture
>
> > ## Questions/Cues
> >
> > - Mengapa EA disebut tingkat arsitektur tertinggi dan paling holistik?
> > - Mengapa organisasi dipandang sebagai sebuah sistem?
> > - Apa perbedaan strategy dan tactics dalam EA?
> > - Apa empat architecture domains dalam EA?
> > - Apa fungsi architecture principles dan policies?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 11-19)
>
> > ### EA sebagai Arsitektur Tertinggi dan Strategis
> >
> > Banyak disiplin arsitektur terkait telah berkembang selama 20 tahun terakhir, masing-masing berfokus pada bentuk sistem berbeda. Terdapat **tiga tingkat granularitas**: **Enterprise Architecture**, **Solution Architecture**, dan **Software Architecture**.
> >
> > **Enterprise Architecture (EA)** umumnya merupakan bentuk arsitektur **tingkat tertinggi dan paling holistik** yang dikembangkan dan dievolusi seputar organisasi (the enterprise) dalam **kerangka waktu strategis**. EA memandang organisasi secara menyeluruh, bukan hanya sistem TI individual.
> >
> > ### Organisasi sebagai Sistem
> >
> > Organisasi pada dasarnya adalah **sistem** dengan fitur-fitur serupa sistem lain:
> >
> > - **Context/environment** tempat ia berada
> > - **Mission** — alasan keberadaannya
> > - **Produk dan/atau layanan** yang disediakan kepada customer base
> > - **Struktur organisasi** dengan individu yang mengisi role
> > - **Proses** yang dijalankan untuk menjalankan operating model
> > - **Information dan data** yang diproses dan dipelihara tentang organisasi (untuk keperluan sendiri maupun memenuhi legal/compliance requirements)
> >
> > Karena organisasi adalah sistem, ia memiliki arsitektur — dan inilah objek yang dikelola oleh Enterprise Architecture.
> >
> > ### Strategy versus Tactics
> >
> > Yang terpenting, setiap organisasi seharusnya memiliki: **vision** tentang seperti apa context/environment masa depannya dan ingin menjadi apa agar tetap relevan; **kebutuhan untuk berevolusi** melalui perubahan menghadapi tantangan lingkungan yang terus berubah; serta **strategy** untuk mencapainya dalam periode waktu tertentu.
> >
> > Enterprise architecture utamanya berurusan dengan isu **tingkat tertinggi, jangka panjang, dan strategis**. Perubahan-perubahan individual untuk mendukung strategi tersebut umumnya dipandang sebagai **tactical changes** — jangka pendek, termasuk sebagian aktivitas *business as usual* yang dimaksudkan untuk mendukung strategi. Inilah relasi: EA memandu arah strategis, sedangkan solution architecture menangani perubahan taktis.
> >
> > ### Architecture Domains
> >
> > EA biasanya dipecah menjadi **architecture domains** yang berbeda. Framework EA yang relevan untuk kebanyakan enterprise bisnis/pemerintah umumnya menggunakan **empat domain**:
> >
> > 1. **Business architecture** — strategi, struktur, proses, dan fungsi bisnis
> > 2. **Data and/or information architecture** — struktur dan pengelolaan data/informasi
> > 3. **Application(s) architecture** — aplikasi dan interaksinya
> > 4. **Infrastructure or technology architecture** — hardware, jaringan, platform
> >
> > Setiap domain berisi subset dari keseluruhan EA; domain-domain ini **interdependent** dan terdapat **overlap of interest** di antara mereka. Umumnya domain disusun hierarkis: business di atas, didukung application/data, yang didukung technology di bawah.
> >
> > ```mermaid
> > flowchart TD
> >     B["Business Architecture<br/>(strategi, proses, fungsi)"]
> >     D["Data / Information Architecture"]
> >     A["Application(s) Architecture"]
> >     T["Infrastructure / Technology Architecture"]
> >     B --> D
> >     D --> A
> >     A --> T
> > ```
> >
> >
> > ### EA Processes, Content, Organisation, dan Frameworks
> >
> > Fungsi enterprise architecture perlu menentukan tiga hal:
> >
> > - **Organisation**: bagaimana ia diorganisir secara internal ke dalam role/responsibility, dan bagaimana ia cocok dalam organisasi secara keseluruhan
> > - **Process**: aktivitas apa yang dilakukan fungsi EA dan kapan
> > - **Content**: informasi apa tentang enterprise yang dicatat, bagaimana diklasifikasi, diorganisir, dan di-cross-reference
> >
> > Tersedia banyak **framework** yang dapat diadopsi/diadaptasi organisasi: **TOGAF**, **Zachman Framework for EA**, **FEAF** (Federal Enterprise Architecture Framework), **DODAF** (Department of Defense Architecture Framework), dan **MODAF** (Ministry of Defence Architecture Framework).
> >
> > ### EA Governance, Architecture Principles, dan Policies
> >
> > Fungsi penting EA adalah menerapkan **principles** dan **policies** yang membatasi setiap perubahan agar **strategic objectives** tercapai — inilah **EA governance**.
> >
> > **Architecture Principles** adalah constraints tingkat tinggi yang tidak langsung *actionable*, tetapi merepresentasikan aturan dan pedoman dasar yang mendorong arsitektur. Menurut **TOGAF 9.1**: *"Principles are general rules and guidelines, intended to be enduring and seldom amended, that inform and support the way in which an organization sets about fulfilling its mission."* Principles **mengisi gap** antara strategic intentions tingkat tinggi dan concrete design.
> >
> > Contoh principles per domain: *"business units are autonomous"* (business domain); *"routine tasks are automated"* (business + application); *"primary business processes are not disturbed by implementation of change"* (semua domain); *"applications have a common look and feel"* (application design); *"only in response to business needs are changes to IT systems made"* (application + technology).
> >
> > **Policies** dibutuhkan sebagai implementasi principles yang lebih *actionable*, mencakup: kepatuhan terhadap legislasi/standar/regulasi industri; bagaimana change activities dijalankan; supplier engagement; technical policy yang membatasi pilihan teknologi untuk standardisasi; dan development standards. **Governance activities** adalah peran otoritas spesifik (mungkin fungsi EA) untuk memastikan policies dipatuhi.

> [!cornell] #### Summary
>
> **Enterprise Architecture (EA)** adalah bentuk arsitektur **tertinggi, paling holistik, dan strategis**, memandang **organisasi sebagai sistem** (dengan context, mission, produk/layanan, struktur, proses, dan data). EA berurusan dengan isu **jangka panjang strategis**, sementara perubahan pendukungnya bersifat **taktis**. EA dipecah menjadi empat **architecture domains**: business, data/information, application, dan technology yang saling interdependent. Fungsi EA menentukan **organisation, process, dan content**, serta dapat mengadopsi framework **TOGAF, Zachman, FEAF, DODAF, MODAF**. Melalui **governance**, EA menerapkan **architecture principles** (aturan tingkat tinggi yang menjembatani strategi dan desain) dan **policies** (implementasi actionable) untuk memastikan strategic objectives tercapai.

> [!ad-libitum]- Additional Information
>
> #### TOGAF dan ADM
>
> TOGAF (The Open Group Architecture Framework) berpusat pada **Architecture Development Method (ADM)** — siklus iteratif: Preliminary, A (Vision), B (Business), C (Information Systems: Data & Application), D (Technology), E (Opportunities & Solutions), F (Migration Planning), G (Implementation Governance), H (Change Management), serta Requirements Management di pusat.
>
> #### Zachman Framework
>
> Matriks 6x6 yang memetakan **interrogatives** (What, How, Where, Who, When, Why) terhadap **perspectives/rows** (Contextual, Conceptual, Logical, Physical, Detailed, Functioning). Berguna sebagai taksonomi klasifikasi artefak arsitektur.
>
> #### Perbandingan Framework
>
> - **FEAF**: standar EA pemerintah federal AS
> - **DODAF / MODAF**: framework arsitektur militer (AS dan Inggris), menekankan operational/system views
> - **TOGAF**: paling umum di sektor swasta, fokus pada proses (ADM)
> - **Zachman**: taksonomi/ontologi, bukan metode proses
>
> #### Self-Exploration Projects
>
> 1. Petakan empat architecture domains untuk sebuah universitas dan identifikasi keterkaitannya.
> 2. Susun satu siklus TOGAF ADM mini untuk inisiatif transformasi digital UMKM.
>
> #### Further Reading
>
> - The Open Group. *TOGAF Standard, Version 9.2*
> - Zachman, J. *The Zachman Framework for Enterprise Architecture*
> - Ross, J., Weill, P., Robertson, D. *Enterprise Architecture as Strategy*
