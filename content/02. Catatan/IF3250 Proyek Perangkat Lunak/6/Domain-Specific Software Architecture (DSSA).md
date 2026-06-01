---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Domain-Specific Software Architecture (DSSA)
>
> > ## Questions/Cues
> >
> > - Apa definisi DSSA dan apa komponen penyusunnya?
> > - Apa lima stage proses DSSA?
> > - Apa input/output tiap stage?
> > - Apa itu reference architecture dan artefak penyusunnya?
> > - Apa contoh reference architecture nyata dan keuntungan DSSA?
> >
> > ## Reference Points
> >
> > - Domain Specific Software Architecture (Halaman 20-23, 35-39)
> > - Domain Specific Software Architecture (Halaman 14-19, 41-50)
>
> > ### Definisi dan Komponen DSSA
> >
> > **DSSA** pada dasarnya adalah *'Software Architecture focused on a particular domain'* — untuk **membatasi problem space** dan **memfasilitasi pengembangan terfokus**.
> >
> > Definisi software architecture (rujukan): Shaw & Garlan ("computational components and interactions"), Bass-Clements-Kazman ("structures… software elements, externally visible properties, relationships"), dan IEEE 2000 ("fundamental organization… components, relationships, principles guiding design & evolution").
> >
> > Sebuah **DSSA comprises**:
> >
> > - **domain model**
> > - **reference requirements**
> > - **a reference architecture**
> > - **a component library / software elements**
> > - **an application configuration method** untuk memilih & mengonfigurasi komponen
> > - **externally visible properties** dari elemen-elemen tersebut
> >
> > ### Lima Stage Proses DSSA
> >
> > ```mermaid
> > flowchart TD
> >     S1["Stage 1: Define the Scope of the Domain<br/>(emphasis: user's needs)"]
> >     S2["Stage 2: Define/Refine Domain-Specific<br/>Concepts/Requirements (emphasis: problem space)"]
> >     S3["Stage 3: Define/Refine Domain-Specific Design<br/>& Implementation Constraints (emphasis: solution space)"]
> >     S4["Stage 4: Develop Domain Architectures/Models<br/>(emphasis: module interfaces & semantics)"]
> >     S5["Stage 5: Produce/Gather Reusable Workproducts"]
> >     S1 --> S2 --> S3 --> S4 --> S5
> > ```
> >
> > **Stage 1 — Define the Scope of the Domain** (emphasis: user's needs)
> > - *Inputs*: Experts, Existing systems, Existing documentation (textbooks, articles).
> > - *Outputs*: Block diagram domain (input/output & relasi high-level antar functional unit); daftar nama orang sebagai referensi/validasi; daftar proyek dengan pointer ke dokumentasi & source code; daftar needs yang harus dipenuhi aplikasi di domain.
> >
> > **Stage 2 — Define/Refine Domain-Specific Concepts/Requirements** (emphasis: problem space; mirip Requirements Analysis)
> > - *Inputs*: Outputs Stage 1, selected systems, selected documentation.
> > - *Outputs*: **Domain Models** (Scenarios→Feature model; Domain Dictionary, Context Information/ER/Object Diagram→Information model; Data-Flow & State-Transition Diagram→Operational model) dan **Functional requirements (Reference requirements)**.
> > - Domain model = produk **context analysis** (mendefinisikan boundary domain & relasi entitas dalam vs luar) dan **domain analysis** (mengidentifikasi, menangkap, mengorganisasi domain assets).
> > - Artefak contoh tiket: **Scenarios** (Ask, Look, Decide, Buy, Update), **Domain Dictionary** (mis. *Customer*), **Context Information Diagram**, **ER Diagram** (Theater–Section–Row–Seat; Person→Customer/Agent/Sales Manager), **Object diagram** (Seat/Row/Section/Theater + attributes & operations), **Data-Flow Diagram**, **State-Transition Diagram** (Seats Available ↔ Sold Out), dan **Functional Requirements** (Sell, Query, Transactions, Will Call-OPT).
> >
> > **Stage 3 — Define/Refine Domain-Specific Design and Implementation Constraints** (emphasis: solution space)
> > - *Inputs*: Outputs Stage 1 (terutama context diagram), Outputs Stage 2 (terutama control & data flow diagram + rationale).
> > - *Outputs*: **Non-Functional Requirements** (mis. Security-OPT, Fault Tolerance, Multi-user Access-OPT, Safety, Response), **Design Requirements** (mis. User Interface ALT1/2/3: command line / menu driven / pulldown), **Implementation Requirements** (mis. Language: Ada; OS ALT1 Unix / ALT2 DOS; Size: ≤2000 seats/performance).
> >
> > **Stage 4 — Develop Domain Architectures/Models** (mirip High-Level Design; emphasis: module/model interfaces & semantics)
> > - *Input*: input & output stage sebelumnya.
> > - *Output*: **A Reference Architecture**.
> >
> > **Stage 5 — Produce/Gather Reusable Workproducts**
> > - *Input*: interface specifications dari Stage 4 + artefak terkait dari sistem yang ada.
> > - *Output*: Reusable components + test cases & dokumentasi; cross reference komponen ke requirements, constraints, dan architecture.
> >
> > ### Reference Architecture
> >
> > **Reference Architecture** = kumpulan *principal design decisions* yang **secara simultan berlaku untuk multiple related systems**, biasanya dalam satu **application domain**, dengan **points of variation** yang didefinisikan eksplisit. **Kapan dikembangkan?** *Not too-early; not too-late.*
> >
> > Artefak penyusun reference architecture:
> >
> > - **Reference Architecture Model** — abstraksi awal berbasis architecture style (mis. *layered*: User Interface ↔ Functionality ↔ Data Structures).
> > - **Configuration Decision Tree** — subset reference requirements dipilih; konfigurasi dilakukan saat *reference architecture instantiation time* (mis. Ticket→Price/Seat/Performance, Seating→Open/Reserved, UI→Command Line/Menus).
> > - **Architecture Schema / Design Record** — titik kumpul pengetahuan tentang komponen DSSA: Name/Type, Description, Reference requirements satisfied, Data/control flow diagrams, Design rationale, Interface & architecture specifications and dependencies.
> > - **Reference Architecture Dependency Diagram** — mengungkap koneksi komponen pada granularitas yang mencerminkan architecture style (mis. UI→Theater→Section→Row→Seat, dengan relasi *Inherits* & *Calls*).
> > - **Component Interface Descriptions** — fokus pada bagaimana elemen berinteraksi dengan environment-nya (bukan implementasi); dideskripsikan dengan **Interface Description Language (IDL)** (mis. `generic package Theater [...] is ... end Theater;`).
> > - **Constraints and Rationale** — constraints = range nilai parameter, relasi antar parameter/komponen yang harus diperhatikan sepanjang pengembangan.
> >
> > ```mermaid
> > flowchart TB
> >     RA["Reference Architecture"]
> >     RA --> RAM["Reference Architecture Model"]
> >     RA --> CDT["Configuration Decision Tree"]
> >     RA --> AS["Architecture Schema / Design Record"]
> >     RA --> DD["Dependency Diagram"]
> >     RA --> CID["Component Interface Descriptions (IDL)"]
> >     RA --> CR["Constraints and Rationale"]
> > ```
> >
> > ### Contoh Reference Architecture Nyata
> >
> > Materi menampilkan beberapa reference architecture konkret (berlapis Presentation / Business / Data + Cross-Cutting: Security, Operational Management, Communication):
> >
> > - **Web Application Architecture** — Client (Browser/Rendering) + Web Server (Presentation/Business/Data Layer).
> > - **Rich Client Application** — fokus local data sources + external data.
> > - **Rich Internet Application (RIA)** — Plug-in Execution Container di client + Services Layer di server.
> > - **Mobile Apps Architecture** — Mobile Client + Mobile Support Infrastructure (data synchronization, unreliable networks).
> > - **Retail Reference Architecture by WSO2** — API Management Layer, Integration, Business Services, dll.
> > - **API Management Reference Architecture by IBM** — Capabilities for API Consumers/Providers, Marketplaces, Self-Service Portal.
> > - Reference Architecture by **Open Bank Project** — solusi teruji untuk problem domain perbankan, mengurangi kompleksitas desain & mempercepat delivery dengan lebih sedikit error.
> >
> > ### Keuntungan Utama DSSA
> >
> > - **Overall cost minimized** karena aset dapat di-reuse.
> > - **Market share meningkat** dengan mengembangkan aplikasi terkait untuk berbagai user.

> [!cornell] #### Summary
>
> **DSSA** adalah *software architecture yang difokuskan pada satu domain* untuk membatasi problem space dan memfokuskan pengembangan; ia mencakup **domain model, reference requirements, reference architecture, component library, application configuration method, dan externally visible properties**. Prosesnya **lima stage**: (1) define scope domain → (2) refine concepts/requirements (problem space) → (3) refine design/implementation constraints (solution space) → (4) develop reference architecture → (5) gather reusable workproducts. **Reference architecture** = principal design decisions untuk banyak sistem terkait dengan *points of variation*, disusun atas **model, configuration decision tree, architecture schema, dependency diagram, component interface (IDL), dan constraints/rationale**. Contoh nyata mencakup Web/RIA/Mobile/Retail WSO2/API IBM/OpenBank. Keuntungannya: **biaya minimal lewat reuse dan market share lebih luas**. DSSA mengonsumsi [[Domain Model]] dan mewujudkan konsep [[DSSE Concepts and Three Key Factors]].

> [!ad-libitum]- Additional Information
>
> #### Reference Architecture vs Application Architecture
>
> **Reference architecture** bersifat *generik untuk satu keluarga sistem* dengan titik variasi eksplisit; **application-specific architecture** adalah hasil *instantiation* reference architecture untuk satu produk konkret (via Configuration Decision Tree). Inilah mekanisme "bangun the difference" pada [[DSSE Concepts and Three Key Factors]].
>
> #### Mengapa "Not too-early; not too-late"
>
> Membuat reference architecture **terlalu dini** berisiko salah karena pengetahuan domain belum matang (variasi belum terlihat). **Terlalu lambat** kehilangan peluang reuse — banyak sistem sudah terlanjur dibangun berbeda-beda. Sweet spot-nya setelah cukup banyak sistem dibangun untuk mengenali commonality & variability.
>
> #### Further Reading
>
> - Taylor, R.N.; Medvidovic, N.; Dashofy, E.M. *Software Architecture: Foundations, Theory, and Practice*, Wiley, 2009.
> - Will Tracz, "DSSA Pedagogical Example", *Software Engineering Notes* vol 20 no 3, 1995.
> - Will Tracz, "DSSA Frequently Asked Questions (FAQ)", *SEN* vol 19 no 2, 1994.
> - Will Tracz, Lou Coglianese, "A Domain-Specific Software Architecture Engineering Process Outline", *SEN* vol 18 no 2, 1993.
