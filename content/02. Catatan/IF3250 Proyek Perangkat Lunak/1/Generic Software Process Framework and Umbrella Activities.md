---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Proyek Perangkat Lunak]]

> [!cornell] Generic Software Process Framework and Umbrella Activities
>
> > ## Questions/Cues
> >
> > - Mengapa kerangka proses bersifat generik?
> > - Peran analis sistem vs pengguna?
> > - Fungsi aktivitas payung dalam proses?
> > - Contoh implementasi modeling construction?
> > - Bagaimana adaptasi proses dilakukan?
> >
> > ## Reference Points
> >
> > - SOFTWARE PROCESS REVIEW (Slides 4-7)
>
> > ### Kerangka Proses Perangkat Lunak Generik
> >
> > Kerangka proses perangkat lunak generik merupakan struktur dasar yang terdiri dari lima aktivitas inti yang dapat diaplikasikan pada berbagai jenis proyek. Pendekatan ini bersifat adaptif dan bukan merupakan model proses yang kaku. Lima aktivitas tersebut adalah:
> >
> > 1. **Komunikasi**: Tahap kolaborasi antara analis sistem dengan pengguna untuk memahami kebutuhan dan batasan proyek. Analis sistem berperan sebagai penerjemah kebutuhan pengguna ke dalam spesifikasi teknis, berbeda dengan programmer yang fokus pada implementasi kode. Contoh: Diskusi dengan departemen keuangan untuk mengidentifikasi fitur laporan otomatis.
> > 2. **Perencanaan**: Menetapkan estimasi sumber daya (biaya, waktu, tenaga), penjadwalan, dan manajemen risiko. Menggunakan teknik seperti Work Breakdown Structure (WBS) untuk memecah pekerjaan menjadi tugas terukur.
> > 3. **Pemodelan**: Membuat representasi abstrak sistem melalui dua pendekatan utama:
> > - **Structured**: Diagram alir dan DFD (Data Flow Diagram)
> > - **Object-Oriented**: UML (Class Diagram, Sequence Diagram)
> >
> > Contoh: Membuat use case diagram untuk fitur login pengguna.
> >
> > 4. **Konstruksi**: Implementasi aktual meliputi pengkodean, pengujian unit, dan integrasi komponen. Menggunakan praktik seperti pair programming dan continuous integration.
> > 5. **Deployment**: Proses penyerahan produk ke pengguna akhir termasuk instalasi, pelatihan, dan dukungan pasca-peluncuran. Contoh: Rollout bertahap sistem ERP ke cabang-cabang perusahaan.
> >
> > ### Aktivitas Payung (Umbrella Activities)
> >
> > Aktivitas payung adalah praktik pendukung yang menyebar di seluruh siklus pengembangan:
> >
> > 1. **Pelacakan & Kontrol Proyek**: Memantau kemajuan terhadap rencana menggunakan Gantt Chart dan Earned Value Analysis. Contoh: Mengevaluasi apakah pengembangan fitur sesuai timeline sprint.
> > 2. **Manajemen Risiko**: Identifikasi potensi ancaman melalui teknik SWOT dan FMEA (Failure Mode Effects Analysis). Contoh: Mengatasi risiko keterlambatan penyedia cloud dengan menyiapkan lingkungan cadangan.
> > 3. **Jaminan Kualitas (SQA)**: Melakukan audit proses dan produk sesuai standar ISO 9001 atau CMMI. Menggunakan teknik seperti checklist inspeksi kode dan metric defect density.
> > 4. **Review Teknis**: Evaluasi formal terhadap artefak seperti requirement specification melalui inspeksi Fagan. Tujuannya menemukan kesalahan sebelum propagasi ke fase berikutnya.
> > 5. **Pengukuran**: Mengumpulkan metrik proses (lead time), proyek (velocity tim), dan produk (complexity cyclomatic). Contoh: Menggunakan dashboard COCOMO II untuk estimasi usaha.
> > 6. **Manajemen Konfigurasi**: Mengontrol perubahan melalui version control (Git), baseline management, dan change control board. Tools: Subversion, Jira.
> > 7. **Manajemen Reusabilitas**: Mengidentifikasi komponen yang dapat digunakan kembali melalui analisis commonality/variability. Contoh: Membuat library autentikasi untuk proyek multidivisi.
> > 8. **Persiapan Produk Kerja**: Pembuatan dokumentasi teknis, user manual, dan log perubahan sesuai template organisasi.
> >
> > ### Adaptasi Proses
> >
> > Proses harus disesuaikan dengan:
> >
> > - **Kompleksitas masalah**: Projek AI membutuhkan lebih banyak fase modeling
> > - **Ukuran tim**: Tim kecil (3-5 orang) bisa menggabungkan peran analis-programmer
> > - **Budaya organisasi**: Perusahaan konservatif mungkin memerlukan dokumentasi lebih rinci
> >
> > Contoh adaptasi: Mengurangi formalitas review teknis untuk proyek prototyping cepat.

> [!cornell] #### Summary
>
> **Kerangka proses generik** menyediakan struktur dasar melalui lima aktivitas inti: komunikasi, perencanaan, pemodelan, konstruksi, dan deployment yang dapat diadaptasi sesuai konteks proyek. **Aktivitas payung** seperti manajemen risiko dan jaminan kualitas beroperasi secara transversal untuk mendukung seluruh siklus hidup pengembangan. **Adaptasi proses** merupakan keharusan dimana kerangka harus disesuaikan dengan kompleksitas masalah, karakteristik tim, dan lingkungan organisasi untuk mencapai efisiensi maksimal.

> [!ad-libitum]- Additional Information
>
> #### Metrik Pengukuran Lanjutan
>
> **Defect Removal Efficiency (DRE)** = (Defect ditemukan sebelum release) / (Total defect) × 100%.
>
> Target industri: >85%. **Function Point Analysis** untuk mengukur ukuran fungsional perangkat lunak dengan bobot kompleksitas:
>
> - Input pengguna: 4 FP
> - Output: 5 FP
> - Inquiry: 4 FP
> - File logis: 7 FP
> - Antarmuka eksternal: 10 FP
>
> #### Manajemen Konfigurasi Mendalam
>
> **Branching strategy** pada Git:
>
> - GitFlow: develop → feature → release → hotfix
> - Trunk-Based: langsung ke main branch dengan feature flags
>
> **Versioning schema**: Semantic Versioning (Major.Minor.Patch) di mana Major berubah saat ada breaking changes.
>
> #### Studi Kasus Adaptasi Proses
>
> **Proyek embedded system medis** (safety-critical):
>
> - Penambahan formal methods pada fase modeling
> - Double review pada semua artefak desain
> - Penggunaan static analysis tools (Coverity, Klocwork)
>
> **Startup MVP**:
>
> - Kombinasi fase komunikasi-konstruksi
> - Penerapan continuous deployment
> - Dokumentasi minimalis
>
> #### Self-Exploration Projects
>
> 1. Implementasikan GitFlow pada repositori GitHub dengan fitur branching protection rules
> 2. Bangun dashboard metrik proyek menggunakan ELK Stack (Elasticsearch, Logstash, Kibana)
> 3. Lakukan analisis Function Point pada aplikasi open source
>
> #### Tools dan Resources
>
> - **Manajemen Kode**: GitLab, Bitbucket
> - **CI/CD**: Jenkins, GitHub Actions
> - **Static Analysis**: SonarQube, PMD
> - **Manajemen Persyaratan**: Jama Connect, IBM DOORS
>
> #### Further Reading
>
> - Sommerville, Ian. *Software Engineering*, Edisi 10. Bab 4 (Process Models)
> - Pressman, Roger S. *Software Engineering: A Practitioner's Approach*. Bab 2 (Process Framework)
> - ISO/IEC 12207:2017 - Systems and software engineering standards
> - Tutorial Git Advanced: https://www.atlassian.com/git/tutorials/advanced-overview