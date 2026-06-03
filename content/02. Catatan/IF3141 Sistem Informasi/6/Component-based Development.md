---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Component-based Development
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud komponen sebagai black box?
> > - Apa peran external specification sebuah komponen?
> > - Dari mana sumber komponen yang dirakit?
> > - Bagaimana komponen saling berinteraksi melalui services?
> > - Mengapa CBD menjadi paradigma sistem modern?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 7-8)
>
> > ### Sistem sebagai Building Blocks
> >
> > Pada praktiknya, **sistem informasi modern terdiri dari serangkaian building blocks yang terpisah namun terintegrasi**, yang disebut **komponen (components)**. Alih-alih satu monolit raksasa, sistem dipecah menjadi unit-unit fungsional yang dapat dikembangkan, diuji, dan dipelihara secara independen lalu dirakit menjadi solusi utuh.
> >
> > Pendekatan ini, yang dikenal sebagai **Component-based Development (CBD)**, mendukung filosofi modern bahwa pengembangan adalah aktivitas **perakitan (assembly)** komponen siap pakai. Manfaatnya mencakup reusabilitas, paralelisasi pekerjaan tim, dan kemudahan penggantian satu komponen tanpa mengganggu keseluruhan sistem.
> >
> > ### Komponen sebagai Black Box dan External Specification
> >
> > Sebuah **komponen adalah sesuatu yang dapat di-deploy sebagai black box (kotak hitam)**. Artinya, pengguna komponen tidak perlu — dan tidak boleh perlu — mengetahui cara kerja internalnya. Komponen memiliki **external specification (spesifikasi eksternal) yang independen terhadap mekanisme internalnya**.
> >
> > Konsep ini sejalan dengan prinsip **encapsulation** dan **information hiding**. Spesifikasi eksternal mendefinisikan **kontrak**: apa yang diterima komponen sebagai input dan apa yang dihasilkannya sebagai output, melalui antarmuka (interface) yang terdefinisi. Selama kontrak ini dipenuhi, implementasi internal dapat diubah total tanpa memengaruhi komponen lain. Analogi: stop kontak listrik adalah black box — kita cukup tahu spesifikasi colokannya (eksternal), tanpa perlu memahami jaringan distribusi listrik di baliknya.
> >
> > ### Perakitan dari Beragam Sumber, Bahasa, dan Platform
> >
> > Dengan component-based development, aplikasi perangkat lunak **dirakit dari komponen yang berasal dari beragam sumber (a variety of sources)**. Komponen-komponen itu sendiri **dapat ditulis dalam beberapa bahasa pemrograman yang berbeda** dan **berjalan di beberapa platform yang berbeda**.
> >
> > Inilah kekuatan utama CBD: heterogenitas. Sebuah solusi nyata mungkin merakit komponen autentikasi yang dibeli dari vendor (COTS), library pemrosesan citra open source yang ditulis dalam C++, layanan analitik internal yang ditulis dalam Python, dan modul antarmuka berbasis JavaScript — masing-masing berjalan di lingkungan yang mungkin berbeda namun terintegrasi melalui antarmuka yang disepakati.
> >
> > ### Interaksi Komponen melalui Services
> >
> > Komponen **dapat eksis secara independen satu sama lain**, tetapi juga **dapat dirakit bersama untuk membangun solusi baru**. Mekanisme interaksinya bersifat timbal balik: komponen **menyediakan services kepada komponen lain** dan **menggunakan services yang disediakan komponen lain**.
> >
> > Model "menyediakan dan menggunakan services" inilah yang membuat komponen dapat dikomposisikan (composable). Antarmuka yang disediakan disebut **provided interface**, dan antarmuka yang dibutuhkan disebut **required interface**. Konsep ini menjadi fondasi langsung bagi paradigma **service-oriented** dan arsitektur microservices modern, di mana setiap komponen berkomunikasi melalui kontrak layanan yang jelas.
> >
> > ```mermaid
> > flowchart LR
> >     A["Komponen A<br/>(black box)"]
> >     B["Komponen B<br/>(black box)"]
> >     A -->|"menyediakan service<br/>(provided interface)"| B
> >     B -->|"menyediakan service<br/>(provided interface)"| A
> > ```
>
> [!cornell] #### Summary
>
> **Component-based Development (CBD)** memandang sistem informasi modern sebagai rangkaian **building blocks** terpisah namun terintegrasi yang disebut **komponen**. Setiap komponen di-deploy sebagai **black box** dengan **external specification yang independen dari mekanisme internalnya**, menerapkan prinsip **encapsulation**. Aplikasi **dirakit (assembled)** dari komponen berbagai **sumber, bahasa pemrograman, dan platform**. Komponen dapat berdiri sendiri maupun dikomposisikan, saling **menyediakan dan menggunakan services** melalui antarmuka yang terdefinisi — fondasi yang mengarah ke paradigma service-oriented dan microservices.

> [!ad-libitum]- Additional Information
>
> #### Anatomi Sebuah Komponen
>
> - **Provided interface**: layanan yang ditawarkan komponen ke luar.
> - **Required interface**: layanan yang dibutuhkan komponen dari komponen lain.
> - **Implementation**: mekanisme internal yang tersembunyi (black box).
> - Dalam UML, digambarkan dengan **Component Diagram** menggunakan notasi lollipop (provided) dan socket (required).
>
> #### Teknologi dan Standar Komponen
>
> - **Klasik**: CORBA, Microsoft COM/DCOM, Enterprise JavaBeans (EJB), .NET Assemblies.
> - **Modern**: package manager (npm, Maven, NuGet, PyPI), container (Docker), dan microservices yang berkomunikasi via REST/gRPC.
>
> #### Prinsip Desain Pendukung
>
> - **Loose coupling & high cohesion** agar komponen mudah diganti.
> - **Dependency Injection** untuk mengurangi keterikatan implementasi konkret.
> - **Semantic Versioning** untuk mengelola kompatibilitas antarmuka antar versi komponen.
>
> #### Self-Exploration Projects
>
> 1. Rakit aplikasi web sederhana dari komponen lintas bahasa: frontend React, backend Python (FastAPI), dan layanan auth pihak ketiga (Auth0).
> 2. Buat Component Diagram UML untuk sistem pemesanan tiket dengan provided/required interface.
> 3. Bandingkan arsitektur monolitik vs berbasis komponen pada sebuah aplikasi open source.
>
> #### Further Reading
>
> - Szyperski, C. *Component Software: Beyond Object-Oriented Programming*.
> - Newman, S. *Building Microservices*. O'Reilly.
> - Dokumentasi OASIS untuk SCA (Service Component Architecture).
