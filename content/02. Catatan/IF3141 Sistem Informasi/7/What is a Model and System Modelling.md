---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] What is a Model and System Modelling
>
> > ## Questions/Cues
> >
> > - Apa definisi model dan apa subjek yang direpresentasikannya?
> > - Karakteristik apa saja yang dimiliki sebuah sistem?
> > - Apa peran boundary dan external entities dalam sebuah sistem?
> > - Bagaimana komponen, behaviour, dan data saling berkaitan?
> > - Mengapa modelling disebut sebagai tindakan abstraksi?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 3-4)
>
> > ### Pengertian Model
> >
> > Sebuah **model** adalah representasi dari suatu subjek (*subject*). Subjek tersebut umumnya berupa objek atau sistem dunia nyata (*real-world*) yang bisa jadi sudah ada saat ini maupun yang baru akan ada di masa depan. Dengan kata lain, model bukan sekadar gambaran statis, melainkan tiruan terkendali yang menangkap aspek-aspek penting dari sesuatu agar dapat dipelajari, didiskusikan, dan dianalisis tanpa harus menyentuh objek aslinya.
> >
> > Contoh: Maket bangunan yang dibuat arsitek adalah model dari gedung yang belum dibangun, sementara peta kota adalah model dari kota yang sudah ada. Keduanya menyederhanakan realitas namun tetap berguna untuk tujuan tertentu. Dalam konteks sistem informasi, sebuah diagram alur proses bisnis adalah model dari cara perusahaan menjalankan operasinya.
> >
> > ### Karakteristik Sebuah Sistem
> >
> > Untuk memodelkan sistem dengan benar, kita perlu memahami karakteristik fundamental yang dimilikinya:
> >
> > **Boundary (Batas Sistem)**: Setiap sistem memiliki **boundary** yang memisahkan apa yang berada di dalam sistem (*system in focus*) dari apa yang berada di luarnya. Penentuan boundary adalah keputusan krusial karena menentukan ruang lingkup pemodelan.
> >
> > **External Entities (Entitas Eksternal)**: Di luar boundary terdapat **external entities** berupa orang (*people*) atau sistem lain yang berinteraksi dengan sistem yang menjadi fokus. Contoh: dalam sistem e-commerce, pelanggan dan gateway pembayaran adalah entitas eksternal.
> >
> > **Components (Komponen)**: Di dalam sistem terdapat **components** (bisa berupa subsistem maupun orang) yang mengimplementasikan **behaviour** atau perilaku dari sistem tersebut. Komponen inilah yang melakukan pekerjaan nyata sistem.
> >
> > **Behaviour (Perilaku)**: Interaksi antar komponen dan dengan entitas eksternal membentuk perilaku sistem, yaitu bagaimana sistem merespons input dan menghasilkan output.
> >
> > **Data**: Interaksi dan perilaku internal ini melibatkan **data** yang dipertukarkan (*exchanged*), ditransformasi (*transformed*), dan disimpan (*stored*). Data merupakan elemen yang mengalir melintasi seluruh sistem.
> >
> > ```mermaid
> > flowchart LR
> >     User["External Entity<br/>(People)"]
> >     Ext["External Entity<br/>(Other System)"]
> >     subgraph Boundary["System Boundary (System in Focus)"]
> >         C1["Component A<br/>(Behaviour)"]
> >         C2["Component B<br/>(Behaviour)"]
> >         DS[("Data<br/>stored")]
> >         C1 -->|"data exchanged"| C2
> >         C1 -->|"transformed"| DS
> >         C2 --> DS
> >     end
> >     User -->|"input"| C1
> >     C2 -->|"output"| User
> >     Ext -->|"data"| C1
> > ```
> >
> > ### Konteks dan Kebutuhan Sistem
> >
> > Setiap sistem berada dalam **konteks yang lebih luas** (*broader context*) yang perlu dipahami terlebih dahulu. Sistem harus didefinisikan berdasarkan bagaimana ia menghadirkan fungsionalitas dan layanan dalam konteks tersebut, yang biasanya dinyatakan dalam bentuk **requirements** (kebutuhan).
> >
> > Contoh: Sebuah sistem informasi akademik tidak berdiri sendiri; ia berada dalam konteks regulasi pendidikan, kebijakan kampus, serta kebutuhan dosen dan mahasiswa. Memahami konteks ini memastikan model yang dibuat relevan dengan tujuan organisasi.
> >
> > ### Modelling sebagai Tindakan Abstraksi
> >
> > **Modelling** adalah tindakan menghasilkan model-model sistem yang tepat melalui tindakan fundamental berupa **abstraksi** (*abstraction*). Abstraksi memungkinkan seluruh isu (boundary, entitas, komponen, perilaku, dan data) untuk diperiksa, dieksplorasi, dan disempurnakan **sebelum** elemen sistem benar-benar dikembangkan.
> >
> > Inilah nilai utama pemodelan: kesalahan dapat ditemukan dan diperbaiki di atas kertas atau diagram, yang jauh lebih murah dibanding memperbaikinya setelah sistem dibangun. Analogi: lebih baik merevisi blueprint rumah daripada membongkar tembok yang sudah jadi.

> [!cornell] #### Summary
>
> Sebuah **model** adalah representasi dari subjek dunia nyata yang sudah atau akan ada, dibuat untuk menyederhanakan realitas demi tujuan analisis. **System modelling** menuntut pemahaman atas karakteristik sistem: **boundary** yang memisahkan sistem dari **external entities**, **components** internal yang mengimplementasikan **behaviour**, serta **data** yang dipertukarkan, ditransformasi, dan disimpan. Setiap sistem hidup dalam **konteks** yang lebih luas dan didefinisikan melalui **requirements**. Pada intinya, modelling adalah tindakan **abstraksi** yang memungkinkan eksaminasi dan penyempurnaan sistem sebelum pengembangan dimulai, sehingga menekan biaya kesalahan.

> [!ad-libitum]- Additional Information
>
> #### Jenis-Jenis Sistem dalam Pemodelan
>
> - **Sistem terbuka vs tertutup**: Sistem terbuka berinteraksi dengan lingkungannya (mayoritas sistem informasi), sedangkan sistem tertutup terisolasi.
> - **Sistem deterministik vs probabilistik**: Deterministik berperilaku dapat diprediksi penuh; probabilistik mengandung ketidakpastian.
> - **Soft system vs hard system**: Soft system melibatkan faktor manusia dan sosial (pendekatan Checkland's SSM), hard system bersifat teknis dan terstruktur.
>
> #### Konsep Boundary yang Tepat
>
> Penentuan boundary yang terlalu sempit dapat membuat model kehilangan interaksi penting, sementara boundary terlalu luas membuat model menjadi kompleks dan sulit dikelola. Teknik **context diagram** sering dipakai untuk memvisualisasikan boundary dan entitas eksternal secara eksplisit pada tingkat tertinggi.
>
> #### Self-Exploration Projects
>
> 1. Identifikasi boundary, external entities, komponen, dan data flow dari sistem perpustakaan kampus Anda.
> 2. Buat daftar konteks (regulasi, stakeholder, kebijakan) yang memengaruhi sistem pembayaran SPP mahasiswa.
> 3. Bandingkan model maket fisik vs model digital (BIM) dalam hal kelengkapan dan kemudahan revisi.
>
> #### Bacaan Lanjutan
>
> - Booch, G., Rumbaugh, J., Jacobson, I. (2005). *The Unified Modeling Language User Guide*. Addison-Wesley.
> - Checkland, P. (1999). *Systems Thinking, Systems Practice*. Wiley.
> - BCS, *Business Analysis* (3rd ed.), Bab tentang Modelling Concepts.
