---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Software Quality and ISO/IEC 25010
>
> > ## Questions/Cues
> >
> > - Bagaimana IEEE dan Pressman mendefinisikan kualitas perangkat lunak?
> > - Apa itu ISO/IEC 25010 (SQuaRE)?
> > - Apa delapan karakteristik kualitas produk menurut ISO 25010?
> > - Apa sub-karakteristik dari tiap karakteristik?
> >
> > ## Reference Points
> >
> > - Software Quality and Metrics (Halaman 3-4)
> > - Software Quality and Metrics (Halaman 5)
>
> > ### Definisi Kualitas Perangkat Lunak
> >
> > **Definisi IEEE**: Software quality adalah *the degree to which system, component, or process meets*:
> >
> > - **specified requirements** (persyaratan yang dispesifikasikan), dan
> > - **customer or user needs or expectations** (kebutuhan atau ekspektasi pelanggan/pengguna).
> >
> > **Definisi Pressman**: Software quality didefinisikan sebagai *conformance* terhadap:
> >
> > - **explicitly stated functional and performance requirements** (persyaratan fungsional dan performa yang dinyatakan eksplisit),
> > - **explicitly documented development standards** (standar pengembangan yang terdokumentasi eksplisit), dan
> > - **implicit characteristics** yang diharapkan dari semua perangkat lunak yang dikembangkan secara profesional.
> >
> > Kunci dari kedua definisi: kualitas = **kesesuaian** terhadap requirement eksplisit **dan** ekspektasi implisit. Karakteristik implisit (mis. "tidak crash") sering tidak ditulis namun tetap menentukan persepsi kualitas.
> >
> > ### ISO/IEC 25010:2011 — SQuaRE
> >
> > **ISO/IEC 25010:2011** adalah bagian dari **SQuaRE (Systems and software Quality Requirements and Evaluation)**. Standar ini mendefinisikan model **System/Software Product Quality** dengan **delapan karakteristik**, masing-masing memiliki sub-karakteristik.
> >
> > | Karakteristik | Sub-karakteristik |
> > |---|---|
> > | **Functional Suitability** | Functional completeness, Functional correctness, Functional appropriateness |
> > | **Performance Efficiency** | Time behaviour, Resource utilization, Capacity |
> > | **Compatibility** \* | Co-existence, Interoperability |
> > | **Usability** | Appropriateness recognizability, Learnability, Operability, User error protection, User interface aesthetics, Accessibility |
> > | **Reliability** | Maturity, Availability, Fault tolerance, Recoverability |
> > | **Security** \* | Confidentiality, Integrity, Authenticity, Non-repudiation, Accountability |
> > | **Maintainability** | Modularity, Reusability, Analysability, Modifiability, Testability |
> > | **Portability** | Adaptability, Installability, Replaceability |
> >
> > Tanda \* (Compatibility & Security) menandai karakteristik yang **baru ditambahkan/diperkuat** pada ISO 25010 dibanding pendahulunya (ISO 9126).
> >
> > ```mermaid
> > flowchart LR
> >     Q["System/Software<br/>Product Quality"]
> >     Q --> FS["Functional Suitability"]
> >     Q --> PE["Performance Efficiency"]
> >     Q --> CO["Compatibility *"]
> >     Q --> US["Usability"]
> >     Q --> RE["Reliability"]
> >     Q --> SE["Security *"]
> >     Q --> MA["Maintainability"]
> >     Q --> PO["Portability"]
> > ```

> [!cornell] #### Summary
>
> Kualitas perangkat lunak adalah **kesesuaian (conformance)** terhadap persyaratan eksplisit (fungsional, performa, standar) **dan** karakteristik/ekspektasi implisit — dirumuskan oleh **IEEE** (memenuhi specified requirements + user needs) dan **Pressman**. Standar **ISO/IEC 25010:2011 (SQuaRE)** memodelkan kualitas produk dalam **delapan karakteristik**: Functional Suitability, Performance Efficiency, Compatibility, Usability, Reliability, Security, Maintainability, dan Portability — masing-masing dengan sub-karakteristik terukur. Model ini menjadi dasar untuk **mengukur** kualitas, yang ditindaklanjuti melalui metrik di [[Software Measurement Fundamentals]].

> [!ad-libitum]- Additional Information
>
> #### ISO 9126 → ISO 25010
>
> ISO 25010 adalah penerus ISO 9126. Perubahan utama: **Security** dan **Compatibility** dinaikkan menjadi karakteristik tersendiri (sebelumnya Security hanya sub-aspek), serta penambahan sub-karakteristik seperti *accessibility* dan *user error protection* pada Usability.
>
> #### Product Quality vs Quality in Use
>
> ISO 25010 sebenarnya memuat **dua model**: *Product Quality* (8 karakteristik di atas, sifat internal/eksternal produk) dan *Quality in Use* (efektivitas, efisiensi, kepuasan, freedom from risk, context coverage — pengalaman pengguna saat memakai produk). Materi ini fokus pada Product Quality.
>
> #### Further Reading
>
> - ISO/IEC 25010:2011 — *Systems and software Quality Requirements and Evaluation (SQuaRE)*.
