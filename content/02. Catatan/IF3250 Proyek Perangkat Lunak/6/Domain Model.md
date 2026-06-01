---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Domain Model
>
> > ## Questions/Cues
> >
> > - Apa itu domain model dan apa fungsinya?
> > - Apa tiga sub-model penyusun domain model?
> > - Diagram apa saja yang ada di Information, Feature, dan Operational Model?
> > - Apa peran Domain Dictionary?
> > - Bagaimana Bjorner mengkarakterisasi domain?
> >
> > ## Reference Points
> >
> > - Domain Specific Software Engineering (Halaman 18-19, 24-35)
> > - Domain Specific Software Engineering (Halaman 38-41)
>
> > ### Becoming More Concrete: Artefak DSSE
> >
> > Menerapkan DSSE berarti mengembangkan sekumpulan artefak yang **lebih spesifik** daripada software architecture biasa — fokus pada aspek domain serta solusi, teknik, dan pattern domain-specific. Artefak tersebut:
> >
> > - **A domain model**
> > - **Architecture & Styles** (domain-specific software architecture, DSSA)
> > - **Tools**
> > - **Software product line**
> >
> > ### Definisi Domain Model
> >
> > **Domain model** adalah sekumpulan artefak yang menangkap informasi tentang sebuah domain:
> >
> > - **Functions** yang dilakukan.
> > - **Objects (entities)** yang melakukan fungsi dan yang dikenai fungsi.
> > - **Data dan informasi** yang mengalir melalui sistem.
> >
> > Domain model **menstandardisasi terminologi dan semantik**, serta menyediakan basis untuk menstandardisasi (atau setidaknya menormalisasi) deskripsi masalah yang akan diselesaikan dalam domain. Contoh nyata: domain model Banking oleh **OpenBank** dipakai untuk membangun software berbasis domain model yang sudah ada, mempercepat analisis entitas, dan "membonceng" pengetahuan domain.
> >
> > ### Struktur Domain Model
> >
> > Domain model terdiri atas **Domain Dictionary** + tiga sub-model: **Information Model**, **Feature Model**, dan **Operational Model**.
> >
> > ```mermaid
> > flowchart TB
> >     DM["Domain Model"]
> >     DM --> DD["Domain Dictionary<br/>(defines vocabulary)"]
> >     DM --> IM["Information Model<br/>(entities & data)"]
> >     DM --> FM["Feature Model<br/>(how entities/data → features)"]
> >     DM --> OM["Operational Model<br/>(how data & control flow)"]
> >     IM --> IM1["Context Information Diagram"]
> >     IM --> IM2["Entity Relationship Diagram"]
> >     IM --> IM3["Semantic Network"]
> >     IM --> IM4["Object Diagram"]
> >     FM --> FM1["Feature-Relationship Diagram"]
> >     FM --> FM2["Use-Case Diagram"]
> >     FM --> FM3["Representation Model"]
> >     OM --> OM1["Data-Flow Diagram"]
> >     OM --> OM2["Control Flow Diagram"]
> >     OM --> OM3["State-Transition Network"]
> > ```
> >
> > - **Domain Dictionary** — mendefinisikan **vocabulary** untuk domain.
> > - **Information Model** — mendeskripsikan **entities dan data** dalam domain (Context Information Diagram, Entity Relationship Diagram, Semantic Network, Object Diagram).
> > - **Feature Model** — mendefinisikan bagaimana entities dan data **bergabung memberikan features** (Feature-Relationship Diagram, Use-Case Diagram, Representation Model).
> > - **Operational Model** — mendefinisikan bagaimana **data dan control mengalir** melalui entities (Data-Flow Diagram, Control Flow Diagram, State-Transition Network).
> >
> > ### Feature Model
> >
> > - **Feature-Relationship Diagram** — mendeskripsikan **mission operations** keseluruhan sistem, fitur utama, dan dekomposisinya. Contoh *Landing Phase* Lunar Lander memuat **Mandatory** (mis. membaca altitude terus-menerus dengan latency <500 msec), **Optional/Variant** (auto/manual landing), dan **Quality Requirements** (real-time: thruster & descent engine harus respons real-time; fault tolerance: tetap jalan meski PNGC down).
> > - **Use-Case Diagram** — mendefinisikan use case dalam domain; mirip use case model di UML (mis. Astronaut: select auto/manual navigation, set rate of descent, set attitude, dengan relasi `<<include>>`).
> > - **Representation Diagram** — mendefinisikan bagaimana informasi **dipresentasikan ke human users**. Contoh DSKY (Display and Keyboard Unit): register, keys, warning lights, perintah via **VERB & NOUN** (VERB = action, NOUN = object), dan PROGRAM untuk tiap fase descent (P63 Braking, P64 Approach, P65 Landing).
> >
> > ### Operational Model
> >
> > - **Data-Flow Diagram (DFD)** — fokus pada **aliran data antar entitas tanpa notasi control**. Contoh: Landing Radar (Sensor) → Calculate Burn Rate → Descent Engine; DSKY untuk display/entry.
> > - **Control Flow Diagram** — fokus pada **aliran kontrol antar entitas, terpisah dari data flow**. Contoh keputusan "Is Auto-Nav Control On?".
> > - **State-Transition Diagram** — fokus pada **states sistem dan transisi** antar state; menyerupai UML state diagram. Contoh Lunar Lander: S0 (Descent Orbit) → S1 (Braking) → S2 (Visibility) → S3 (Landing) → S4 (Touchdown) / S5 (Crashed), dengan batas altitude per state.
> >
> > ### Karakterisasi Domain (Bjorner)
> >
> > Dari *From Domains to Requirements* (Dines Bjorner):
> >
> > - **Definition 1 – Domain**: sekumpulan **entities** (*endurants* = fenomena yang "lasts", dan *perdurants* = actions, events, behaviours over endurants), fokus pada domain yang diciptakan manusia sebagai komponen **societal infrastructure**.
> > - **Definition 2 – Domain Engineering**: proses menganalisis & mendeskripsikan domain — menentukan range stakeholder, mengumpulkan & menganalisis informasi, mendeskripsikan, menguji/memverifikasi deskripsi yang berevolusi, dan memvalidasinya.
> > - **Definition 3 – Domain Stakeholder**: orang/kelompok/institusi yang "united" oleh kepentingan atau ketergantungan pada domain (requirements).
> >
> > **Domain is characterized** oleh: **Entity, Function/Action, State, Behavior, Event, Axiom, Stakeholder**.
> >
> > **Definisi domain** dapat dipandang lewat: derajat abstraksi; himpunan atau anggota; "transport atau bus?"; Class (atribut + method) vs feature (karakteristik + ability); di dunia: noun, verb, adjective/adverb.

> [!cornell] #### Summary
>
> **Domain model** menangkap functions, objects/entities, dan data sebuah domain, **menstandardisasi terminologi & semantik**. Strukturnya: **Domain Dictionary** (vocabulary) + tiga sub-model — **Information Model** (Context/ER/Semantic Network/Object Diagram untuk entitas & data), **Feature Model** (Feature-Relationship/Use-Case/Representation untuk fitur), dan **Operational Model** (Data-Flow/Control Flow/State-Transition untuk aliran data & kontrol). **Bjorner** mengkarakterisasi domain lewat *endurants & perdurants*, mendefinisikan **Domain Engineering** dan **Domain Stakeholder**, dengan elemen: Entity, Function, State, Behavior, Event, Axiom, Stakeholder. Domain model adalah artefak inti yang menjadi input bagi [[Domain-Specific Software Architecture (DSSA)]].

> [!ad-libitum]- Additional Information
>
> #### Endurants vs Perdurants
>
> *Endurant* adalah entitas yang "bertahan" sepanjang waktu (mis. sebuah rekening bank — ada terus). *Perdurant* adalah entitas yang "terjadi" dalam waktu (mis. transaksi — sebuah event/action). Membedakan keduanya membantu memodelkan apa yang **statis** (struktur data) vs **dinamis** (perilaku) dalam domain.
>
> #### Mengapa Tiga Sub-Model Saling Melengkapi
>
> Information Model menjawab *"apa entitas & datanya"*, Feature Model menjawab *"fitur apa yang dibentuk"*, dan Operational Model menjawab *"bagaimana data & kontrol mengalir"*. Ketiganya memberi tampilan struktural, fungsional, dan perilaku — paralel dengan tiga sudut pandang pada [[Scenario-Based Modeling Methodology]].
