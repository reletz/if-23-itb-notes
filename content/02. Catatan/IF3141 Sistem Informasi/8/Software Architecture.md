---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Software Architecture
>
> > ## Questions/Cues
> >
> > - Apa tujuan dan struktur software architecture?
> > - Faktor implementation-specific apa yang dipertimbangkan software architect?
> > - Apa perbedaan two-tier, three-tier, dan N-tier?
> > - Apa karakteristik component-based software architecture?
> > - Apa maksud spesifikasi komponen 'black-box'?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 25-27)
>
> > ### Purpose dan Structure Software Architecture
> >
> > **Software architecture** secara fundamental berkaitan dengan **purpose dan structure** dari aplikasi software, termasuk **software components** yang dapat dianggap menyediakan *platform services* dalam **Infrastructure architecture**.
> >
> > Jika beroperasi dalam **solution architecture** yang telah dideskripsikan, maka tujuan software architecture adalah **memecah (decompose)** functional building blocks atau komponen dari solution architecture menjadi **software components yang lebih granular**, terdekomposisi, dan akhirnya lebih **dapat diimplementasikan secara fisik** jika diperlukan. Software architecture adalah tingkat granularitas **paling rendah dan paling teknis** di antara EA, solution, dan software architecture.
> >
> > ### Faktor Implementation-Specific
> >
> > **Software architect** memasukkan faktor-faktor yang lebih **spesifik terhadap implementasi**, seperti:
> >
> > - **Choice of development languages dan tools** — pemilihan bahasa pemrograman dan perangkat pengembangan
> > - **Structural constraints** yang ditimbulkan oleh **platform technologies** yang dipilih
> > - Mengidentifikasi dan menerapkan **logical dan physical design patterns** yang sesuai untuk mendorong desain serta implementasi software yang robust
> >
> > Di sinilah keputusan teknis konkret (framework, library, design pattern) diambil, yang berada di luar cakupan solution architecture yang lebih abstrak.
> >
> > ### Tiered Software Architecture
> >
> > Software architecture sering distrukturkan dalam bentuk **tier (lapisan)**:
> >
> > - **Two-tier (client-server)**: client berinteraksi langsung dengan server (misal aplikasi desktop yang mengakses database langsung). Logika terbagi antara dua tingkat.
> > - **Hierarchical client-server**: variasi di mana server dapat menjadi client bagi server lain, membentuk hierarki layanan.
> > - **Three-tiered**: pemisahan menjadi tiga lapisan — **presentation** (UI), **application/business logic**, dan **data**. Setiap lapisan dapat berkembang independen.
> > - **N-tiered**: pemisahan menjadi banyak lapisan (misal web tier, API tier, business tier, integration tier, data tier), memberikan skalabilitas dan separation of concerns yang lebih baik.
> >
> > Prinsip tiered mengikuti hierarchical architecture: lapisan atas bergantung pada layanan lapisan di bawahnya.
> >
> > ```mermaid
> > flowchart TD
> >     P["Presentation Tier<br/>(UI)"]
> >     B["Business Logic Tier<br/>(application)"]
> >     D["Data Tier<br/>(database)"]
> >     P --> B
> >     B --> D
> > ```
> >
> >
> > ### Component-Based Software Architecture
> >
> > **Component-based software architecture** memiliki karakteristik:
> >
> > - **Systems as assemblies of components** — sistem dibangun sebagai rakitan komponen
> > - **Functionality provided through component interactions** — fungsionalitas muncul dari interaksi antar komponen
> > - **Component specification at 'black-box' level** — spesifikasi komponen umumnya dilakukan pada tingkat **black-box**: yang penting adalah *interface*-nya (apa yang masuk dan keluar), bukan implementasi internalnya. Ini mendukung **loose coupling** dan kemudahan penggantian
> > - **Testing components** — komponen dapat diuji secara terisolasi karena interface-nya jelas
> >
> > Pendekatan ini mendukung *reusability*, *replaceability*, dan *maintainability* karena komponen dapat dikembangkan, diuji, dan diganti secara independen selama kontrak interface-nya dipenuhi.

> [!cornell] #### Summary
>
> **Software Architecture** adalah tingkat granularitas **terendah dan paling teknis**, berkaitan dengan **purpose dan structure** aplikasi software serta komponennya. Ia **mendekomposisi** building blocks solution architecture menjadi software components yang lebih granular dan **implementable**. Software architect memasukkan faktor **implementation-specific**: pemilihan **languages/tools**, **structural constraints** platform, dan **design patterns** untuk desain robust. Struktur umum berupa **tiered architecture** (two-tier client-server, hierarchical client-server, three-tier presentation/logic/data, dan N-tier) serta **component-based architecture** di mana sistem adalah rakitan komponen yang berinteraksi, dispesifikasi pada level **black-box** (fokus interface) dan dapat diuji secara terisolasi.

> [!ad-libitum]- Additional Information
>
> #### Architectural Styles Lanjutan
>
> Selain tiered dan component-based, dikenal pula: **Layered**, **Microservices**, **Event-Driven**, **Microkernel/Plugin**, **Pipe-and-Filter**, dan **Space-Based** architecture. Pemilihan style bergantung pada quality attributes yang diprioritaskan.
>
> #### Design Patterns (GoF)
>
> Software architect kerap memanfaatkan pola desain: **Creational** (Factory, Singleton, Builder), **Structural** (Adapter, Facade, Proxy, Composite), dan **Behavioral** (Observer, Strategy, Command). Pola arsitektur level lebih tinggi: MVC, MVVM, Repository, CQRS.
>
> #### Component Technologies
>
> - **Interface contracts**: API, gRPC/Protobuf, OpenAPI
> - **Containerization**: Docker, Kubernetes untuk deployment komponen
> - **Dependency Injection**: Spring (Java), .NET DI, Dagger
>
> #### Self-Exploration Projects
>
> 1. Rancang aplikasi inventory sederhana dalam arsitektur three-tier dan jelaskan tanggung jawab tiap tier.
> 2. Dekomposisi satu building block solution architecture menjadi komponen black-box dengan interface terdefinisi.
>
> #### Further Reading
>
> - Richards, M., Ford, N. *Fundamentals of Software Architecture*
> - Gamma, E. et al. *Design Patterns: Elements of Reusable Object-Oriented Software*
> - Martin, R. C. *Clean Architecture*
