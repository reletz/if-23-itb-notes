---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Implementation in the Lifecycle and Planning
>
> > ## Questions/Cues
> >
> > - Apa tujuan utama dari fase implementasi?
> > - Mengapa perencanaan implementasi harus dimulai sedini mungkin?
> > - Siapa saja stakeholder kunci dalam implementasi?
> > - Apa peran project manager dalam implementasi?
> > - Pertimbangan apa saja yang masuk dalam perencanaan implementasi?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 2-4)
>
> > ### Tujuan Fase Implementasi
> >
> > Tujuan utama dari fase implementasi adalah **membuat sistem baru menjadi operasional** (operational). Hal ini dicapai melalui transfer modul-modul software yang **telah teruji** (tested software modules) dari lingkungan pengembangan/pengujian ke **lingkungan operasional atau "live"**, beserta penyiapan data yang dibutuhkan oleh sistem baru tersebut.
> >
> > Poin penting: implementasi hanya dilakukan **setelah** solusi sepenuhnya diuji (fully tested), diterima (accepted), dan ditandatangani persetujuannya (signed off) oleh sponsor. Artinya, implementasi bukanlah tahap untuk menemukan bug fungsional, melainkan tahap untuk memindahkan sistem yang sudah siap pakai ke produksi secara aman dan terkendali.
> >
> > Contoh: Sebuah bank yang telah menyelesaikan pengujian sistem core banking baru tidak akan langsung "menyalakan" sistem tersebut. Modul yang sudah diverifikasi dipindahkan secara hati-hati ke server produksi, data nasabah disiapkan, dan barulah sistem dijalankan untuk melayani transaksi nyata.
> >
> > ### Pentingnya Perencanaan Sejak Dini
> >
> > Perencanaan implementasi dan changeover harus dimulai **sedini mungkin** dalam systems development lifecycle (SDLC). Tujuannya agar berbagai isu, penjadwalan (timings), pelatihan (training), dan kebutuhan sumber daya (resources) dapat dipertimbangkan dan direncanakan dengan matang. Kegagalan dalam melaksanakan implementasi yang sukses dapat menimbulkan **konsekuensi serius** bagi organisasi, mulai dari gangguan operasional bisnis hingga kerugian finansial dan reputasi.
> >
> > Perencanaan implementasi merupakan **tanggung jawab penting dari project manager**. Untuk menentukan seluruh faktor yang relevan, project manager memerlukan masukan (input) dari para stakeholder kunci.
> >
> > ### Stakeholder Kunci dalam Implementasi
> >
> > Masukan dari para stakeholder berikut diperlukan untuk merencanakan implementasi secara lengkap:
> >
> > - **Service manager**: memahami kemungkinan dampak terhadap service level (tingkat layanan).
> > - **Users (pengguna)**: untuk menentukan kebutuhan dan cara penyampaian pelatihan, serta implikasi bisnis dan finansial.
> > - **Sponsor**: untuk menyepakati segala risiko dan dampak bisnis (business risks and impacts).
> > - **Business analysts**: untuk melakukan validasi data dan proses bisnis (business data and processes).
> > - **Technical specialists**: menentukan metode terbaik untuk konversi file dan data (file and data conversion).
> >
> > Setiap stakeholder membawa perspektif berbeda; misalnya service manager fokus pada kontinuitas layanan, sementara technical specialist fokus pada aspek teknis migrasi data.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph LC["Posisi dalam Lifecycle"]
> >         direction LR
> >         DEV["Development"] --> TEST["Testing<br/>(sign off)"] --> IMPL["Implementation<br/>(live/operational)"]
> >     end
> >     SM["Service manager"] --> PLAN["Implementation Plan<br/>(Project Manager)"]
> >     US["Users"] --> PLAN
> >     SP["Sponsor"] --> PLAN
> >     BA["Business analysts"] --> PLAN
> >     TS["Technical specialists"] --> PLAN
> >     PLAN --> IMPL
> > ```
> >
> > ### Pertimbangan dalam Perencanaan
> >
> > Beberapa pertimbangan dalam perencanaan implementasi meliputi:
> >
> > 1. **Cara menyiapkan data** di sistem baru.
> > 2. **Modul software mana** yang harus dimigrasikan dari test environment ke operational environment, dan **kapan** waktunya.
> > 3. **Pemeriksaan (checks) apa** yang dibutuhkan untuk mengonfirmasi bahwa migrasi telah berhasil.
> > 4. **Kapan tepatnya** implementasi akan terjadi.
> > 5. **Berapa lama** implementasi akan berlangsung.
> > 6. **Dokumentasi apa** yang dibutuhkan untuk mengelola dan mengoperasikan sistem baru.
> > 7. **Keterampilan dan pelatihan baru** apa yang dibutuhkan pengguna serta operator, dan mekanisme penyampaian terbaiknya.
> > 8. **Cara terbaik untuk changeover** dari sistem lama ke sistem baru.

> [!cornell] #### Summary
>
> Fase **implementasi** bertujuan menjadikan sistem baru **operasional** dengan mentransfer modul yang telah **tested** ke **lingkungan live** beserta penyiapan datanya, dan hanya dilakukan setelah solusi di-**sign off** oleh sponsor. Perencanaan harus dimulai **sedini mungkin** dalam SDLC karena kegagalan implementasi berkonsekuensi serius bagi organisasi. **Project manager** bertanggung jawab atas perencanaan dengan masukan dari stakeholder kunci: **service manager, users, sponsor, business analysts, dan technical specialists**. Pertimbangan perencanaan mencakup penyiapan data, pemilihan dan waktu migrasi modul, pemeriksaan keberhasilan, durasi, dokumentasi, pelatihan, hingga strategi changeover.

> [!ad-libitum]- Additional Information
>
> #### Lingkungan dalam Deployment Pipeline
>
> Implementasi yang baik bergantung pada pemisahan lingkungan (environment) yang jelas:
>
> - **Development**: tempat developer menulis dan menguji kode awal.
> - **Testing/QA**: tempat pengujian terkontrol oleh tim QA.
> - **Staging/Pre-production**: replika persis lingkungan produksi untuk uji akhir.
> - **Production (live)**: lingkungan operasional yang dipakai pengguna nyata.
>
> Promosi modul mengikuti urutan ini secara terkendali untuk meminimalkan risiko.
>
> #### Peran Project Manager
>
> Project manager mengoordinasikan implementasi melalui:
>
> - **Risk management plan**: identifikasi dan mitigasi risiko changeover.
> - **Communication plan**: memastikan seluruh stakeholder mendapatkan informasi tepat waktu.
> - **Resource scheduling**: alokasi SDM dan infrastruktur saat cut-over.
>
> #### Self-Exploration Projects
>
> 1. Susun stakeholder matrix (RACI) untuk implementasi sistem HR di perusahaan menengah.
> 2. Buat checklist perencanaan implementasi berdasarkan 8 pertimbangan di slide.
> 3. Analisis sebuah kasus kegagalan go-live (misal sistem TSB Bank 2018) dan identifikasi penyebab perencanaan yang kurang.
>
> #### Tools dan Resources
>
> - Project Management: Microsoft Project, Jira, Asana
> - Change/Release: ServiceNow, Azure DevOps
> - Kerangka acuan: ITIL (Service Transition), PMBOK
>
> #### Further Reading
>
> - BCS, *Business Analysis* (Paul, Cadle, Yeates)
> - ITIL 4: Create, Deliver and Support
> - PMI, *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*
