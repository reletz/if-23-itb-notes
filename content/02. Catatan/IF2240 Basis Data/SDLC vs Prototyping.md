---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa dua pendekatan pengembangan DB & IS?
> > - Apa itu SDLC?
> > - Karakteristik SDLC?
> > - Tahapan SDLC?
> > - Tujuan dan Aktivitas DB tahap Planning?
> > - Tujuan dan Aktivitas DB tahap Analysis?
> > - Tujuan dan Aktivitas DB tahap Logical Design?
> > - Tujuan dan Aktivitas DB tahap Physical Design?
> > - Tujuan dan Aktivitas DB tahap Implementation?
> > - Tujuan dan Aktivitas DB tahap Maintenance?
> > - Apa itu Prototyping?
> > - Karakteristik Prototyping?
> > - Tahapan Prototyping?
> > - Aktivitas DB tahap Identify Problem (Prototyping)?
> > - Aktivitas DB tahap Develop Initial Prototype (Prototyping)?
> > - Aktivitas DB tahap Implement & Use Prototype (Prototyping)?
> > - Aktivitas DB tahap Revise & Enhance Prototype (Prototyping)?
> > - Aktivitas DB tahap Convert to Operational System (Prototyping)?
> >
> > ## Reference Points
> > - Slide 3-15 dari "22. IF2240-SemII_2324-m15-1-DB-Development-Process.pdf"
>
> > ### Dua Pendekatan Pengembangan Database dan Sistem Informasi (IS)
> > Terdapat dua pendekatan utama dalam pengembangan *database* dan Sistem Informasi (IS):
> > 1.  **SDLC (System Development Life Cycle)** : Sebuah proses pengembangan yang terperinci dan terencana dengan baik.
> > 2.  **Prototyping** : Sebuah pendekatan pengembangan aplikasi cepat (RAD).
> >
> > ### SDLC (System Development Life Cycle)
> > - **SDLC** adalah proses pengembangan yang **terperinci dan terencana dengan baik**.
> > - Meskipun memakan waktu yang lama (*time-consuming*), SDLC sangat **komprehensif**.
> > - Memiliki **siklus pengembangan yang panjang**.
> > - **Tahapan SDLC**: SDLC terdiri dari enam tahapan berurutan:
> >   1.  **Planning (Perencanaan)** 
> >   2.  **Analysis (Analisis)** 
> >   3.  **Logical Design (Desain Logis)** 
> >   4.  **Physical Design (Desain Fisik)** 
> >   5.  **Implementation (Implementasi)** 
> >   6.  **Maintenance (Pemeliharaan)** 
> >
> > - **Detail Tahapan SDLC dan Aktivitas Database**:
> >   - **1. Planning (Perencanaan)**:
> >     - **Tujuan**: Pemahaman awal tentang proyek.
> >     - **Deliverable**: Permintaan untuk studi (*request for study*).
> >     - **Aktivitas Database**: Pemodelan *enterprise* dan pemodelan data konseptual awal (*early conceptual data modeling*).
> >   - **2. Analysis (Analisis)**:
> >     - **Tujuan**: Analisis dan penstrukturan persyaratan yang menyeluruh.
> >     - **Deliverable**: Spesifikasi fungsional sistem (*functional system specifications*).
> >     - **Aktivitas Database**: Pemodelan data konseptual yang menyeluruh dan terintegrasi (*thorough and integrated conceptual data modeling*).
> >   - **3. Logical Design (Desain Logis)**:
> >     - **Tujuan**: Elicitasi dan penstrukturan persyaratan informasi.
> >     - **Deliverable**: Spesifikasi desain terperinci (*detailed design specifications*).
> >     - **Aktivitas Database**: Desain *database* logis (termasuk transaksi, form, tampilan, *view*, integritas data, dan keamanan).
> >   - **4. Physical Design (Desain Fisik)**:
> >     - **Tujuan**: Mengembangkan spesifikasi teknologi dan organisasi.
> >     - **Deliverable**: Struktur program/data, pembelian teknologi, desain ulang organisasi.
> >     - **Aktivitas Database**: Desain *database* fisik (mendefinisikan *database* ke DBMS, organisasi data fisik, program pemrosesan *database*).
> >   - **5. Implementation (Implementasi)**:
> >     - **Tujuan**: Pemrograman, pengujian, pelatihan, instalasi, dokumentasi.
> >     - **Deliverable**: Program operasional, dokumentasi, materi pelatihan.
> >     - **Aktivitas Database**: Implementasi *database*, termasuk program yang di-*code*, dokumentasi, instalasi, dan konversi.
> >   - **6. Maintenance (Pemeliharaan)**:
> >     - **Tujuan**: Memantau, memperbaiki, meningkatkan (*enhance*).
> >     - **Deliverable**: Audit periodik.
> >     - **Aktivitas Database**: Pemeliharaan *database*, analisis dan *tuning* performa, koreksi *error*.
> >
> > ### Prototyping
> > - **Prototyping** adalah metode pengembangan aplikasi cepat (**RAD - Rapid Application Development**).
> > - Melakukan upaya singkat pada pemodelan data konseptual (*cursory attempt at conceptual data modeling*).
> > - **Mendefinisikan *database* selama pengembangan prototipe awal**.
> > - **Mengulangi aktivitas implementasi dan pemeliharaan** dengan versi prototipe yang baru.
> > - **Tahapan Metodologi Prototyping Database**:
> >   1.  **Identify Problem (Identifikasi Masalah)**.
> >   2.  **Develop Initial Prototype (Mengembangkan Prototipe Awal)**, dimulai dari *Initial Requirements*.
> >   3.  **Implement and Use Prototype (Implementasi dan Menggunakan Prototipe)**.
> >   4.  **Revise and Enhance Prototype (Revisi dan Peningkatan Prototipe)**, jika ada *New Requirements* atau *Problems* dari langkah implementasi.
> >   5.  **Convert to Operational System (Konversi ke Sistem Operasional)**, jika prototipe sudah efisien dan sesuai. Jika tidak efisien, kembali ke *Revise and Enhance Prototype*.
> > - **Detail Tahapan Prototyping dan Aktivitas Database**:
> >   - **Conceptual Data Modeling (termasuk dalam Identify Problem dan Develop Initial Prototype)**:
> >     - Menganalisis persyaratan (*Analyze requirements*).
> >     - Mengembangkan model data awal (*Develop preliminary data model*).
> >   - **Logical Database Design (termasuk dalam Develop Initial Prototype)**:
> >     - Menganalisis persyaratan secara rinci (*Analyze requirements in detail*).
> >     - Mengintegrasikan *view* *database* ke dalam model data konseptual (*Integrate database views into conceptual data model*).
> >   - **Physical Database Design and Definition (termasuk dalam Develop Initial Prototype)**:
> >     - Mendefinisikan konten *database* baru ke DBMS (*Define new database contents to DBMS*).
> >     - Memutuskan organisasi fisik untuk data baru (*Decide on physical organization for new data*).
> >     - Mendesain program pemrosesan *database* (*Design database processing programs*).
> >   - **Database Implementation (termasuk dalam Implement and Use Prototype)**:
> >     - Meng-*code* program pemrosesan *database* (*Code database processing programs*).
> >     - Menginstal konten *database* baru, biasanya dari sumber data yang sudah ada (*Install new database contents, usually from existing data sources*).
> >   - **Database Maintenance (termasuk dalam Revise and Enhance Prototype dan Convert to Operational System)**:
> >     - Menganalisis *database* untuk memastikan memenuhi kebutuhan aplikasi (*Analyze database to ensure it meets application needs*).
> >     - Memperbaiki *error* dalam *database* (*Fix errors in database*).

> [!cornell] #### Summary
> Pengembangan *database* dan Sistem Informasi dapat dilakukan melalui dua pendekatan utama: **SDLC** dan **Prototyping**. **SDLC** adalah proses yang **terperinci, komprehensif, dan berurutan** dengan siklus panjang, melalui tahapan **Planning, Analysis, Logical Design, Physical Design, Implementation, dan Maintenance**, dengan aktivitas *database* spesifik di setiap tahapannya. Sebaliknya, **Prototyping** adalah metode **Rapid Application Development (RAD)** yang lebih cepat dan iteratif, berfokus pada **pengembangan prototipe awal** yang kemudian diimplementasikan, digunakan, direvisi, dan ditingkatkan berdasarkan masukan pengguna, melibatkan pemodelan data konseptual, desain logis dan fisik, implementasi, serta pemeliharaan secara berulang hingga menjadi sistem operasional.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Keuntungan & Kerugian SDLC**:
>   - **Keuntungan**: Kontrol yang ketat, dokumentasi yang lengkap, cocok untuk proyek besar dan kompleks dengan persyaratan yang jelas.
>   - **Kerugian**: Kaku, butuh waktu lama, sulit mengakomodasi perubahan persyaratan di tengah jalan.
> - **Keuntungan & Kerugian Prototyping**:
>   - **Keuntungan**: Cepat, melibatkan pengguna aktif, lebih mudah beradaptasi dengan perubahan persyaratan, cocok untuk proyek dengan persyaratan yang tidak jelas di awal.
>   - **Kerugian**: Kurang dokumentasi, potensi *scope creep*, bisa jadi "Quick and Dirty" jika tidak dikelola dengan baik, kurang cocok untuk sistem *mission-critical* yang sangat besar.
> - **Hybrid Approaches**: Dalam praktiknya, banyak organisasi menggunakan pendekatan hibrida yang menggabungkan elemen terbaik dari SDLC dan Prototyping, atau metodologi Agile lainnya.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Jeffrey A. Hoffer, V. Ramesh, Heikki Topi: "Modern Database Management", 10th Edition, Chapter 1: The Database Environment and Development Process.
> - **Metodologi Pengembangan Sistem**: Pelajari lebih lanjut tentang metodologi lain seperti Agile, Scrum, Kanban, dan Waterfall.
>
> #### Eksplorasi Mandiri:
> - **Studi Kasus**: Cari studi kasus proyek pengembangan *database* yang berhasil atau gagal dan analisis mengapa metodologi yang dipilih berhasil/gagal.
> - **Pilih Metodologi**: Bayangkan sebuah skenario proyek pengembangan *database* tertentu (misalnya, sistem inventaris kecil untuk UMKM vs. sistem ERP perusahaan besar). Tentukan metodologi mana (SDLC atau Prototyping) yang paling cocok dan jelaskan alasannya.