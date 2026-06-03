---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Migration, Documentation, and Training
>
> > ## Questions/Cues
> >
> > - Mengapa migrasi versi modul yang benar bersifat kritis?
> > - Apa peran configuration management dan release management?
> > - Mengapa instalasi hardware menjadi prasyarat implementasi?
> > - Jenis dokumentasi apa yang dibutuhkan pengguna dan operator?
> > - Apa saja metode penyampaian pelatihan?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 10-15)
>
> > ### Migrasi Modul Software
> >
> > Selain migrasi data, modul software yang baru atau yang berubah juga perlu **dimigrasikan dari test environment ke operational environment**. Kegagalan memigrasikan modul yang benar dan, yang lebih penting lagi, **versi modul yang benar**, dapat mengakibatkan **system failure**, yang pada gilirannya menyebabkan hilangnya operasi bisnis (loss of business operations).
> >
> > Beberapa pertimbangan kunci untuk migrasi software meliputi:
> >
> > - **Configuration management**: diperlukan untuk memastikan bahwa **hanya versi modul software yang benar** dan relevan dengan implementasi yang dipilih untuk dimigrasikan.
> > - **Release management**: aktivitas ini memeriksa bahwa **hanya implementasi yang kompatibel** yang dipaketkan bersama dan ditransfer ke operational environment dalam satu migrasi tunggal.
> > - **Timing**: terkadang berguna untuk memigrasikan modul dalam keadaan **non-aktif (de-activated)** sehingga tidak ada gangguan terhadap kontinuitas bisnis, dan mengaktifkannya hanya ketika diperlukan.
> > - **Validation**: validasi bahwa software yang dimigrasikan bekerja dengan benar dapat dilakukan **secara bertahap (in stages)**.
> >
> > ```mermaid
> > flowchart LR
> >     TEST["Test Environment<br/>(modul teruji)"] --> CM["Configuration Management<br/>(versi yang benar)"]
> >     CM --> RM["Release Management<br/>(paket kompatibel)"]
> >     RM --> OP["Operational Environment<br/>(live)"]
> > ```
> >
> > ### Instalasi Hardware dan Infrastruktur
> >
> > Cukup sering, komponen hardware dan infrastruktur perlu diinstal di operational environment sebagai **prasyarat (prerequisite)** untuk migrasi data dan software. Contohnya, volume data, jumlah pengguna, dan tingkat aktivitas pengguna pada sistem baru mungkin **menuntut** perangkat penyimpanan yang lebih besar, kapabilitas pemrosesan yang lebih tinggi, dan kapasitas jaringan yang lebih besar.
> >
> > Upgrade terhadap, atau penggantian, hardware dan infrastruktur yang ada perlu **dikelola, direncanakan, dan diuji** layaknya proyek IT lainnya. Terkadang perubahan hardware dan infrastruktur merupakan **proyek mandiri (stand-alone project)** tersendiri sebagai pendahulu implementasi aktivitas bisnis, misalnya roll-out komputer desktop, telepon, dan headset ke sebuah call center baru.
> >
> > ### Peran Dokumentasi Pendukung
> >
> > Pengguna membutuhkan **dokumentasi** untuk membantu mereka menjalankan pekerjaan sehari-hari dan memberikan bantuan awal jika terjadi masalah dalam menggunakan sistem baru. Staf operasional (operations staff) membutuhkan dokumentasi yang membantu mereka mendukung sistem baru, baik untuk pengoperasian dan pemeliharaan rutin, maupun ketika muncul masalah atau kegagalan tak terduga.
> >
> > Jenis utama dokumentasi meliputi: **online help, printed user guides (panduan pengguna cetak), operational manuals (manual operasional), dan technical documentation (dokumentasi teknis)**. Akses cepat ke dokumentasi yang benar menjadi aspek vital; banyak organisasi pernah mengalami situasi di mana penyelesaian masalah operasional memakan waktu lama akibat **kurangnya dokumentasi yang up-to-date**.
> >
> > ### Pendekatan Pelatihan (Training)
> >
> > Selain dokumentasi, pengguna dan staf operasional kemungkinan perlu **dilatih** dalam sistem baru. Elemen utama yang dipertimbangkan:
> >
> > - **Identify competencies**: sistem baru memiliki proses bisnis dan prosedur operasional baru/berubah, yang membutuhkan kompetensi dan keterampilan baru/berubah pula.
> > - **Define training strategy**: membandingkan kompetensi yang dibutuhkan dengan kompetensi yang sudah dimiliki pengguna dan staf (**training need analysis**).
> > - **Deliver training**: pertimbangan mencakup dampak (impact), berapa banyak, kompleksitas, dan keterampilan.
> >
> > Metode utama penyampaian pelatihan:
> >
> > 1. **Traditional lectures and workshops**: pelatihan tatap muka kepada calon pengguna oleh seseorang yang benar-benar memahami fitur baru.
> > 2. **Remotely delivered training**: pelatihan jarak jauh seperti webcast dan teleconferencing, mempertemukan trainer dan trainee melalui teknologi untuk periode relatif singkat.
> > 3. **Train the trainer**: sekelompok kecil **'super-users'** dilatih hingga standar dan tingkat keahlian lebih tinggi, kemudian melatih komunitas pengguna lainnya serta menyediakan pusat keunggulan dan dukungan.

> [!cornell] #### Summary
>
> Migrasi software memindahkan modul baru/berubah dari test ke operational environment; salah versi dapat menyebabkan **system failure**. Kuncinya: **configuration management** (versi benar), **release management** (paket kompatibel), **timing** (migrasi dalam keadaan de-activated), dan **validation** bertahap. **Hardware/infrastruktur** sering menjadi prasyarat dan dikelola seperti proyek IT tersendiri. **Dokumentasi** (online help, user guides, operational manuals, technical docs) vital bagi pengguna dan operations staff. **Pelatihan** melibatkan identifikasi kompetensi, training need analysis, dan penyampaian melalui **lectures/workshops, remote training, atau train-the-trainer (super-users)**.

> [!ad-libitum]- Additional Information
>
> #### Configuration vs Release Management
>
> - **Configuration Management (CM)**: mengelola Configuration Items (CI) dan baseline versi melalui CMDB, memastikan ketertelusuran (traceability) versi.
> - **Release Management**: merencanakan, menjadwalkan, dan mengontrol pemaketan rilis ke produksi, sering memakai feature flag untuk migrasi de-activated.
>
> #### Kategori Dokumentasi
>
> - **End-user docs**: quick start, FAQ, online help kontekstual.
> - **Operational docs**: runbook, SOP backup/restore, escalation matrix.
> - **Technical docs**: arsitektur, API reference, konfigurasi deployment.
>
> #### Self-Exploration Projects
>
> 1. Susun runbook operasional untuk incident response sistem produksi.
> 2. Rancang training need analysis untuk migrasi tim ke sistem CRM baru.
> 3. Bandingkan efektivitas train-the-trainer vs lecture klasik untuk 500 pengguna tersebar.
>
> #### Tools dan Resources
>
> - CM/Release: Git, Ansible, ServiceNow, Octopus Deploy
> - Dokumentasi: Confluence, MkDocs, Read the Docs, Swagger/OpenAPI
> - Training: Moodle, Articulate, Zoom/Teams webinar
>
> #### Further Reading
>
> - ITIL 4: Release Management & Service Validation
> - BCS, *Business Analysis* — Implementation chapter
> - "Documenting Software Architectures" (SEI)
