---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Pre-UML and UML Modelling Techniques
>
> > ## Questions/Cues
> >
> > - Apa saja teknik pemodelan pre-UML untuk facet fungsional?
> > - Teknik apa yang memodelkan data statis (structural facet)?
> > - Bagaimana facet behavioral dimodelkan sebelum UML?
> > - Apa diagram UML yang setara dengan teknik pre-UML?
> > - Bagaimana ketiga facet dipetakan ke diagram UML?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 11-13)
>
> > ### Teknik Pre-UML: Functional Facet
> >
> > Sebelum UML menjadi standar, **functional facet** (apa yang dilakukan sistem) dimodelkan dengan teknik berikut:
> >
> > **Data Flow Diagram (DFD)**: Memodelkan aliran data antar proses, penyimpanan data (*data store*), dan entitas eksternal. DFD menjawab pertanyaan "data dari mana, diolah apa, mengalir ke mana".
> >
> > **Flow Chart**: Bagan alir yang menggambarkan urutan langkah dan keputusan dalam suatu proses, termasuk varian seperti **swimlane diagram** yang membagi aktivitas ke dalam lajur tanggung jawab (per aktor atau departemen).
> >
> > **Jackson Structure Chart**: Teknik dari metode Jackson Structured Programming (JSP) yang merepresentasikan struktur program/proses secara hierarkis menggunakan konstruksi sequence, selection, dan iteration.
> >
> > ### Teknik Pre-UML: Structural Facet
> >
> > **Structural facet** menyoroti data statis (*static data*) yang dikelola sistem:
> >
> > **Entity Relationship Diagram (ERD)**: Juga dikenal sebagai **Logical data model**, memodelkan entitas data beserta relasi (*relationship*) dan kardinalitas antar entitas. ERD menjadi fondasi perancangan basis data relasional.
> >
> > **Hierarchical Tree Diagram**: Merepresentasikan struktur data yang bersifat hierarkis (parent-child) seperti struktur organisasi atau klasifikasi bertingkat.
> >
> > **Bubble Diagram**: Diagram informal berbentuk gelembung yang dipakai pada tahap awal untuk mengeksplorasi entitas data dan keterkaitannya sebelum diformalkan menjadi ERD.
> >
> > ### Teknik Pre-UML: Behavioral Facet
> >
> > **Behavioral facet** menggambarkan kejadian (*events*) dan bagaimana sistem berubah keadaan:
> >
> > **Entity Life History (ELH)**: Memodelkan seluruh siklus hidup sebuah entitas data — kejadian apa saja yang dapat menciptakan, mengubah, dan menghapusnya — misalnya menggunakan struktur Jackson.
> >
> > **Statechart**: Diagram keadaan (*state*) dan transisi antar keadaan, misalnya yang dipromosikan oleh **David Harel** sebelum era UML. Statechart Harel menambahkan konsep state bersarang (*nested*) dan paralel yang kemudian diadopsi UML.
> >
> > ### Padanan UML: Functional Facet
> >
> > UML (Unified Modeling Language) menyatukan dan menstandardisasi teknik-teknik pemodelan tersebut. Untuk **functional facet**, UML menyediakan:
> >
> > **Use Case Diagram**: Menggambarkan interaksi antara aktor (external entity) dan fungsi-fungsi (use case) yang disediakan sistem.
> >
> > **Activity Diagram**: Memodelkan alur kerja/proses bisnis termasuk percabangan, paralelisme, dan swimlane — padanan modern dari flow chart.
> >
> > **Interaction Diagrams**: Kelompok diagram yang memodelkan interaksi antar objek, terdiri dari **sequence diagram** (urutan pesan terhadap waktu), **communication diagram** (penekanan pada relasi antar objek), **timing diagram** (penekanan pada batasan waktu), dan **interaction overview diagram** (gabungan tingkat tinggi).
> >
> > ### Padanan UML: Structural dan Behavioral Facet
> >
> > **Structural Facet — Class Diagram**: Padanan UML dari ERD. Class diagram memodelkan class beserta atribut, operasi (*method*), dan relasi (asosiasi, agregasi, komposisi, pewarisan). Berbeda dengan ERD yang hanya menangkap data, class diagram juga menangkap perilaku objek.
> >
> > **Behavioral Facet — State Machine**: Padanan UML dari statechart dan ELH. State machine diagram memodelkan keadaan suatu objek dan transisi yang dipicu oleh event, mewarisi notasi Harel.
> >
> > Dengan demikian, setiap teknik pre-UML memiliki padanan dalam UML, namun UML menyatukannya dalam satu notasi terstandardisasi dengan semantik yang lebih konsisten dan kaya.
> >
> > ```mermaid
> > flowchart LR
> >     Func["Functional Facet"] --> UC["Use Case Diagram"]
> >     Func --> Act["Activity Diagram"]
> >     Func --> Int["Interaction Diagrams<br/>(sequence, communication,<br/>timing, overview)"]
> >     Struct["Structural Facet"] --> Cls["Class Diagram"]
> >     Behav["Behavioral Facet"] --> Sm["State Machine"]
> > ```

> [!cornell] #### Summary
>
> Teknik pemodelan dikelompokkan menurut tiga facet. **Functional facet** pre-UML menggunakan **DFD, flow chart (termasuk swimlane), dan Jackson structure chart**; **structural facet** menggunakan **ERD/logical data model, hierarchical tree, dan bubble diagram**; **behavioral facet** menggunakan **Entity Life History (ELH) dan statechart (Harel)**. UML menyatukan teknik-teknik ini: functional facet diwakili **use case, activity, dan interaction diagrams (sequence, communication, timing, overview)**; structural facet oleh **class diagram**; behavioral facet oleh **state machine**. UML tidak menggantikan ide-ide lama melainkan menstandardisasinya dalam satu notasi yang konsisten dan kaya semantik.

> [!ad-libitum]- Additional Information
>
> #### 14 Diagram UML 2.x
>
> UML 2.x memiliki 14 jenis diagram terbagi dua: **structural** (class, object, component, deployment, package, composite structure, profile) dan **behavioral** (use case, activity, state machine, dan empat interaction diagram). Hanya sebagian yang umum dipakai dalam praktik analisis sistem informasi.
>
> #### Dari DFD ke Activity Diagram
>
> Meski sering dipertukarkan, DFD menekankan **aliran data**, sedangkan activity diagram menekankan **aliran kontrol/aktivitas**. Memahami perbedaan ini penting agar tidak salah memilih teknik untuk tujuan tertentu.
>
> #### Tools Pemodelan
>
> - **PlantUML** dan **Mermaid**: pemodelan berbasis teks/kode, cocok untuk version control.
> - **Lucidchart, draw.io, Visual Paradigm, Enterprise Architect**: editor diagram visual.
> - **StarUML**: gratis dan ringan untuk pembelajaran UML.
>
> #### Self-Exploration Projects
>
> 1. Ambil satu proses bisnis dan modelkan dua kali: dengan DFD klasik dan dengan activity diagram UML, lalu bandingkan.
> 2. Konversikan sebuah ERD menjadi class diagram dan identifikasi informasi tambahan yang perlu ditambahkan.
> 3. Buat state machine diagram untuk siklus hidup objek "Pesanan" dalam sistem e-commerce.
>
> #### Bacaan Lanjutan
>
> - Fowler, M. (2003). *UML Distilled* (3rd ed.). Addison-Wesley.
> - Harel, D. (1987). *Statecharts: A Visual Formalism for Complex Systems*.
> - Yourdon, E. (1989). *Modern Structured Analysis*. Prentice Hall.
