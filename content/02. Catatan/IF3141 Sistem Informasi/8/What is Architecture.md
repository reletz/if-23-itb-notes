---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] What is Architecture
>
> > ## Questions/Cues
> >
> > - Apa definisi arsitektur menurut ISO/IEC 42010?
> > - Mengapa arsitektur lebih dari sekadar struktur?
> > - Apa peran principles dalam arsitektur?
> > - Bagaimana requirements dan constraints memengaruhi arsitektur?
> > - Apa output utama dari pekerjaan arsitektur?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 2-3)
>
> > ### Definisi Arsitektur (ISO/IEC 42010)
> >
> > Segala sesuatu yang dapat diklasifikasikan sebagai **sistem** memiliki arsitektur, termasuk bangunan, organisme hidup (termasuk manusia), organisasi, sistem TI enterprise yang kompleks, aplikasi perangkat lunak, hingga komponen-komponen individual di dalamnya. Standar **ISO/IEC 42010:2011** ('Systems and software engineering – Architecture description') mendefinisikan arsitektur sebagai:
> >
> > *"The fundamental organization of a system embodied in its **components**, their **relationships to each other**, and to the **environment**, and the **principles** guiding its design and evolution."*
> >
> > Definisi ini menekankan empat elemen kunci: **komponen** sistem, **relasi antar komponen**, relasi terhadap **environment** (lingkungan), serta **principles** (prinsip) yang memandu desain dan evolusinya.
> >
> > ```mermaid
> > flowchart TD
> >     A["System Architecture<br/>(ISO/IEC 42010)"]
> >     A --> C["Components"]
> >     A --> R["Relationships<br/>(antar komponen)"]
> >     A --> E["Environment"]
> >     A --> P["Principles<br/>(guiding design & evolution)"]
> > ```
> >
> > Contoh: Pada sebuah sistem perbankan digital, komponen mencakup modul autentikasi, core banking, dan payment gateway; relasinya adalah bagaimana mereka saling memanggil layanan; environment-nya adalah regulasi OJK dan infrastruktur cloud; sedangkan principles dapat berupa "semua transaksi harus dienkripsi end-to-end".
> >
> > ### Tujuan Pekerjaan Arsitektur
> >
> > Tujuan utama setiap orang yang bekerja pada arsitektur adalah menentukan cara yang tepat untuk **merepresentasikan deskripsi arsitektur** tersebut. Representasi ini sering kali berbentuk **dokumentasi** yang berisi sekumpulan **model** yang sesuai. Model-model ini menjadi alat komunikasi antara arsitek, stakeholder, dan tim pengembang sehingga keputusan desain dapat dipahami, divalidasi, dan dievolusi secara konsisten.
> >
> > Analogi: Seperti seorang arsitek bangunan yang tidak hanya membayangkan rumah di kepalanya, tetapi menuangkannya dalam blueprint, denah, dan spesifikasi material agar dapat dikomunikasikan kepada kontraktor.
> >
> > ### Arsitektur Lebih dari Sekadar Struktur
> >
> > Bagian terakhir dari definisi ISO 42010 — *"… and the principles guiding its design and evolution"* — sangat penting. Hal ini menegaskan bahwa arsitektur mencakup aspek seperti **requirements** dan **constraints** (khususnya **architecture principles**) yang menginformasikan seperti apa arsitektur itu harus dibentuk untuk memenuhi **key concerns** dari major stakeholders.
> >
> > Dengan kata lain, struktur (komponen dan relasinya) hanyalah satu sisi. Sisi lainnya adalah *mengapa* struktur itu dibentuk demikian — alasan, batasan, dan aturan yang mengarahkan keputusan saat ini maupun saat sistem berevolusi di masa depan.
> >
> > ### Konsistensi Definisi Lintas Disiplin
> >
> > Meskipun standar ISO 42010 secara spesifik ditujukan untuk **systems and software engineering**, definisi yang dikandungnya digunakan secara **konsisten** untuk merujuk pada tipe-tipe arsitektur terkait lainnya, seperti **Enterprise Architecture**, **Solution Architecture**, dan **Software Architecture**. Konsistensi ini memungkinkan komunikasi yang seragam antar tingkat granularitas arsitektur.

> [!cornell] #### Summary
>
> **Arsitektur** adalah organisasi fundamental dari sebuah sistem yang terwujud dalam **komponen**, **relasi antar komponen**, relasi terhadap **environment**, dan **principles** yang memandu desain serta evolusinya, sebagaimana didefinisikan **ISO/IEC 42010:2011**. Setiap entitas yang dapat disebut sistem memiliki arsitektur. Arsitektur **lebih dari sekadar struktur** karena mencakup **requirements** dan **constraints** (terutama architecture principles) yang memenuhi key concerns stakeholder. Tugas arsitek adalah merepresentasikan deskripsi arsitektur dalam bentuk **dokumentasi dan model** yang tepat, dan definisi ISO ini berlaku konsisten lintas disiplin arsitektur.

> [!ad-libitum]- Additional Information
>
> #### Komponen Deskripsi Arsitektur (ISO 42010)
>
> Standar ISO/IEC 42010 memperkenalkan konsep kunci dalam *architecture description*:
>
> - **Stakeholder**: pihak dengan kepentingan terhadap sistem
> - **Concern**: kepentingan/perhatian stakeholder (misal keamanan, performa, biaya)
> - **Viewpoint**: konvensi untuk membangun dan menggunakan sebuah view
> - **View**: representasi sistem dari perspektif concern tertentu
> - **Architecture Rationale**: justifikasi keputusan arsitektur
>
> #### Quality Attributes (Non-Functional Requirements)
>
> Principles dan constraints sering terkait dengan **quality attributes** seperti scalability, availability, maintainability, security, dan performance. Atribut ini sering disebut sebagai *-ilities* dan menjadi pendorong utama keputusan arsitektur ketimbang fungsionalitas semata.
>
> #### Tools dan Notasi
>
> - **ArchiMate**: bahasa pemodelan untuk enterprise architecture
> - **UML**: notasi untuk software architecture
> - **C4 Model**: pendekatan Context-Container-Component-Code untuk visualisasi
> - **Sparx Enterprise Architect, Archi, draw.io**: tools pemodelan arsitektur
>
> #### Self-Exploration Projects
>
> 1. Buat deskripsi arsitektur sebuah aplikasi familiar (misal Gojek) dengan mengidentifikasi komponen, relasi, environment, dan principles.
> 2. Tulis 5 architecture principles untuk sistem informasi akademik kampus dan jelaskan rationale-nya.
>
> #### Further Reading
>
> - ISO/IEC/IEEE 42010:2011 *Systems and software engineering – Architecture description*
> - Bass, L., Clements, P., Kazman, R. *Software Architecture in Practice*
> - Rozanski, N., Woods, E. *Software Systems Architecture: Working with Stakeholders Using Viewpoints and Perspectives*
