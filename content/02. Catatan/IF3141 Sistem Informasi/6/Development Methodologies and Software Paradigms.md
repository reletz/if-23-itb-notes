---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Development Methodologies and Software Paradigms
>
> > ## Questions/Cues
> >
> > - Apa perbedaan defined process dan empirical process?
> > - Kapan defined process tepat digunakan?
> > - Mengapa pengembangan sistem cenderung empiris?
> > - Apa contoh metodologi defined dan empirical?
> > - Apa tiga paradigma software engineering utama?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 9-12)
>
> > ### Dua Kategori Proses: Defined vs Empirical
> >
> > Proses pengembangan sistem secara garis besar **terbagi menjadi dua kategori**: **'defined'** atau **'empirical'**. Pembedaan ini berakar pada teori pengendalian proses dan menentukan metodologi mana yang paling sesuai untuk konteks proyek tertentu.
> >
> > Pemilihan kategori bukan soal mana yang "lebih baik" secara mutlak, melainkan soal **kesesuaian dengan tingkat ketidakpastian** pekerjaan. Semakin pasti dan dipahami sebuah proses, semakin cocok pendekatan defined; semakin kompleks dan tidak terprediksi, semakin perlu pendekatan empirical.
> >
> > ### Defined Process
> >
> > Premis di balik **defined process** adalah bahwa **setiap potongan pekerjaan dapat dipahami sepenuhnya** dan bahwa, **diberikan sekumpulan input yang terdefinisi dengan baik, output yang sama dihasilkan setiap kali**. Proses ini bersifat **prediktabel dan repeatable**.
> >
> > Defined process **berguna ketika mekanisme yang mendasari operasi proses sudah dipahami dengan cukup baik**. Ibarat lini produksi pabrik: bahan baku yang sama menghasilkan produk identik setiap kali.
> >
> > Metodologi dan framework **defined (procedural)** yang umum antara lain: **SSADM** (Structured Systems Analysis and Design Method), **Structured Analysis**, **Structured Design**, **Yourdon Structured Method**, **Information Engineering**, **SADT**, **SSM** (Soft Systems Methodology), **Structured Programming**, **JSP** (Jackson Structured Programming), **IDEF0**, **Structured Methods**, dan **UP** (Unified Process).
> >
> > ### Empirical Process
> >
> > Masalah dalam menerapkan defined process pada disiplin pengembangan sistem adalah bahwa defined process **berlandaskan premis bahwa produk yang dibangun selalu sama**, sehingga prosesnya prediktabel dan repeatable. Pada kenyataannya, **pengembangan sistem lebih menyerupai riset dan pengembangan produk baru (research and development)**, yang lebih bersifat **empirical**.
> >
> > Karena itulah muncul **tren menuju pengembangan 'Agile'**, yang dibangun di atas **model empirical process**. Proses yang **tidak dapat diulang karena kompleksitas inherennya perlu mengadopsi mekanisme ini** — mekanisme berbasis inspeksi dan adaptasi berkala (transparency, inspection, adaptation).
> >
> > Pendekatan **empirical** yang umum antara lain: **RAD** (Rapid Application Development) dan keluarga **Agile** — **XP** (Extreme Programming), **DSDM**, **Scrum**, **Adaptive Software Development**, **Crystal Clear**, **Lean Systems Development**, **Test-Driven Development**, **Feature-Driven Development**, **Kanban**, dan **Agile UP**.
> >
> > ```mermaid
> > flowchart TD
> >     P["Proses Pengembangan"]
> >     P --> D["Defined<br/>(prediktabel & repeatable)"]
> >     P --> E["Empirical<br/>(inspeksi & adaptasi)"]
> >     D --> DM["SSADM, Structured Analysis/Design,<br/>JSP, IDEF0, UP"]
> >     E --> EM["RAD, Agile:<br/>Scrum, XP, Kanban, TDD, FDD"]
> > ```
> >
> > ### Software Engineering Paradigms
> >
> > Sejumlah **paradigma** berbeda — yaitu **world views (cara pandang) yang mendasari teori dan metodologi software engineering dan pemrograman** — telah berevolusi sejak awal 1960-an, masing-masing mengusulkan pendekatan yang **secara radikal berbeda** dalam membangun perangkat lunak.
> >
> > Tiga paradigma paling lazim yang menjadi fondasi pengembangan perangkat lunak modern adalah: **Structured Programming** (dekomposisi fungsional dengan urutan, seleksi, perulangan), **Object-Oriented Programming** (pemodelan dunia sebagai objek yang mengenkapsulasi data dan perilaku), dan **Service-Oriented Development** (sistem disusun dari layanan-layanan otonom yang saling berkomunikasi). Materi ini ditandai untuk **dieksplorasi secara mandiri**.
>
> [!cornell] #### Summary
>
> Proses pengembangan sistem terbagi menjadi **defined** dan **empirical**. **Defined process** mengasumsikan pekerjaan dipahami sepenuhnya sehingga input terdefinisi selalu menghasilkan output sama — **prediktabel dan repeatable** — cocok bila mekanismenya dipahami baik (contoh: **SSADM**, Structured Methods, **UP**). **Empirical process** mengakui bahwa pengembangan sistem mirip **R&D** yang kompleks dan tak terprediksi, melandasi tren **Agile** (Scrum, XP, Kanban, TDD, **RAD**) berbasis inspeksi-adaptasi. Di atas itu berdiri tiga **paradigma** software engineering sebagai **world views**: **Structured**, **Object-Oriented**, dan **Service-Oriented development**.

> [!ad-libitum]- Additional Information
>
> #### Teori Pengendalian Proses (Process Control Theory)
>
> Pembedaan defined vs empirical berasal dari teori kontrol proses industri. **Defined control** dipakai bila proses dapat diprediksi penuh; **empirical control** dipakai bila proses kompleks dengan tiga pilar: **transparency, inspection, adaptation** — landasan teoretis Scrum.
>
> #### Manifesto Agile
>
> Empat nilai inti (2001): individu & interaksi di atas proses & alat; software bekerja di atas dokumentasi komprehensif; kolaborasi pelanggan di atas negosiasi kontrak; merespons perubahan di atas mengikuti rencana.
>
> #### Pendalaman Tiga Paradigma
>
> - **Structured**: top-down decomposition, DFD, Nassi-Shneiderman; bahasa Pascal/C.
> - **Object-Oriented**: encapsulation, inheritance, polymorphism; UML; bahasa Java, C++, Python.
> - **Service-Oriented**: layanan loosely-coupled, kontrak WSDL/OpenAPI, ESB, evolusi ke microservices.
>
> #### Self-Exploration Projects
>
> 1. Jalankan satu sprint Scrum mini (1 minggu) untuk fitur kecil, lengkap dengan sprint review & retrospective.
> 2. Modelkan masalah yang sama dengan paradigma structured dan object-oriented, lalu bandingkan.
> 3. Petakan sebuah proyek nyata: tergolong defined atau empirical, dan justifikasi pilihan metodologinya.
>
> #### Further Reading
>
> - Schwaber, K. & Sutherland, J. *The Scrum Guide*.
> - Avison, D. & Fitzgerald, G. *Information Systems Development: Methodologies, Techniques and Tools*.
> - Kuhn, T. *The Structure of Scientific Revolutions* (asal usul istilah "paradigma").
