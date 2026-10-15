---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] DataOps Definition, Motivation and Tasks
>
> > ## Questions/Cues
> >
> > - Apa definisi DataOps dan siapa saja pihak yang terlibat?
> > - Mengapa data operations menjadi penting?
> > - Tantangan apa yang dihadapi organisasi?
> > - Tugas apa saja dalam siklus DataOps?
> > - Bagaimana hubungan DataOps dengan MLOps?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps to MLOps + DataOps (Slides 16-24)
>
> > ### Definisi dan Peran
> >
> > **DataOps** mempertemukan orang yang **mengumpulkan dan menyiapkan data**, yang **menganalisisnya**, dan yang **memanfaatkan hasil analisis** untuk bisnis. Peran kuncinya: **developer, data engineer, analyst, data scientist, dan business user**.
> >
> > DataOps adalah kumpulan **praktik, prosedur, dan teknologi** pengelolaan data dengan pendekatan **terintegrasi dan berorientasi proses**, untuk meningkatkan **kualitas, kecepatan, dan kolaborasi**, serta menghasilkan **data products** dan **data apps**.
> >
> > ### Mengapa Penting
> >
> > Data adalah aset kunci; pengambilan keputusan berbasis data terbukti meningkatkan keberhasilan bisnis. Tujuannya merampingkan operasi data dan analitik agar **data lebih cepat tersedia, kualitas lebih tinggi, dan operasi lebih stabil dan tepercaya**.
> >
> > **Tantangan**: lanskap data yang terfragmentasi, tools dan teknologi yang terpisah, perubahan kebutuhan bisnis yang cepat, dan standar yang kurang.
> >
> > ### Motivasi dan Tantangan Lain
> >
> > - Data tidak statis: **Volume, Velocity, Variety**; beban kerjanya pun beragam (analytics, transactional, machine learning).
> > - **Teknologi saja tidak cukup**; dibutuhkan agility lebih besar.
> > - Permintaan selalu melampaui kapasitas, proses dan teknologi usang, tim bisnis "melewati" tim data, kepatuhan terus berubah, serta tantangan **data governance** (standar, compliance, kepemilikan).
> >
> > ### Tugas DataOps
> >
> >
> > - **Planning**: tujuan dan sasaran, sumber data, standar kualitas.
> > - **Development**: extraction, transformation, loading ke data warehouse atau data lake.
> > - **Testing**: data quality checks dan data validation.
> > - **Deployment**: deploy ETL pipeline, monitoring dan logging.
> > - **Operations**: data management, governance, security.
> > - **Feedback and improvement**: kumpulkan feedback, analisis performa, iterasi.
> >
> > ### DataOps dan MLOps
> >
> > DataOps menjadi **fondasi** MLOps karena menjamin pasokan data yang andal; keduanya sering bekerja dalam **workflow terintegrasi** (pipeline DataOps menyiapkan data, praktik MLOps men-deploy dan mengelola model), dan berbagi tujuan: **otomasi, kolaborasi, dan continuous improvement**.

> [!cornell] #### Summary
>
> **DataOps** adalah kumpulan praktik, prosedur, dan teknologi pengelolaan data yang terintegrasi dan berorientasi proses untuk meningkatkan **kualitas, kecepatan, dan kolaborasi** lintas developer, data engineer, analyst, data scientist, dan business user. Motivasinya: data yang tumbuh dalam **3V**, lanskap terfragmentasi, dan tuntutan governance. Siklusnya meliputi **planning, development (ETL), testing, deployment, operations, dan feedback**. DataOps menjadi **fondasi MLOps** dengan memasok data berkualitas untuk training dan evaluasi model.

> [!ad-libitum]- Additional Information
>
> #### Manifesto DataOps
>
> Gerakan DataOps memiliki manifesto yang menekankan kepuasan pelanggan, analitik yang berfungsi, penerimaan perubahan, dan "data sebagai kode". Pembahasan lebih dalam dilakukan pada payung DataOps Foundation.
>
> #### Proyek Eksplorasi Mandiri
> 1. Gambarkan pipeline data sederhana (CSV → transformasi → penyimpanan) lalu tandai di titik mana cek kualitas data perlu disisipkan.
>
> #### Bacaan Lanjutan
> - Reis & Housley — *Fundamentals of Data Engineering*, Bab 1-3.
> - Parikh & Johri (2022) — *Combining DataOps, MLOps and DevOps*.
