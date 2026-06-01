---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Sistem Informasi]]

> [!cornell] Core SDLC Execution Phases
>
> > ## Questions/Cues
> >
> > - Mengapa urutan fase SDLC bersifat krusial?
> > - Perbedaan antara perancangan logis dan fisik?
> > - Tahapan pengujian sistem yang komprehensif?
> > - Strategi implementasi sistem minim risiko?
> > - Alat pengembangan pendukung fase coding?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 9-12)
> > - IF3141 Sistem Informasi (Slides 16-20)
>
> > ### Fase Perancangan (Design)
> >
> > Fase perancangan merupakan transformasi kebutuhan fungsional menjadi cetak biru teknis. Terbagi menjadi dua tingkat: **perancangan logis** (logical design) yang fokus pada alur data dan proses bisnis tanpa mempertimbangkan platform teknologi, dan **perancangan fisik** (physical design) yang menentukan spesifikasi teknis seperti bahasa pemrograman, arsitektur database, dan infrastruktur jaringan.
> >
> > Contoh praktis: Dalam pengembangan e-commerce, perancangan logis mencakup diagram alur proses checkout, sedangkan perancangan fisik menentukan penggunaan MySQL untuk database dan React.js untuk frontend. Analogi yang tepat adalah seperti membuat blue print arsitektur (logical) baru kemudian menentukan material bangunan (physical).
> >
> > ### Fase Pengembangan (Development)
> >
> > Tahap implementasi teknis dimana tim developer membangun sistem berdasarkan spesifikasi desain. Meliputi: (1) Penyiapan lingkungan pengembangan (development environment), (2) Penulisan kode sumber, (3) Integrasi komponen/modul, dan (4) Pembuatan dokumentasi teknis. Prinsip penting adalah *version control* menggunakan tools seperti Git untuk manajemen perubahan kode.
> >
> > Studi kasus nyata: Pengembangan modul autentikasi pengguna memerlukan frontend (form login), backend (API verifikasi), dan database (penyimpanan kredensial). Implementasi yang efektif menggunakan pendekatan modular dimana tiap komponen dikembangkan terpisah lalu diintegrasikan.
> >
> > ### Fase Pengujian (Testing)
> >
> > Proses verifikasi sistem terhadap kebutuhan melalui empat lapisan pengujian:
> >
> > 1. **Unit Testing**: Menguji komponen terkecil (fungsi/method) secara terisolasi
> > 2. **Integration Testing**: Memverifikasi interaksi antar modul
> > 3. **System Testing**: Validasi sistem menyeluruh termasuk non-fungsional (keamanan, performa)
> > 4. **Acceptance Testing**: Konfirmasi kesesuaian dengan kebutuhan pengguna akhir
> >
> > Contoh praktis: Untuk fitur pembayaran online, unit testing memverifikasi kalkulasi pajak, integration testing memeriksa integrasi dengan gateway pembayaran, system testing menguji beban transaksi tinggi, sedangkan acceptance testing melibatkan pengguna nyata.
> >
> > ### Fase Implementasi (Deployment)
> >
> > Proses migrasi sistem ke lingkungan produksi dengan strategi:
> >
> > - **Big Bang**: Implementasi sekaligus mengganti sistem lama
> > - **Phased**: Rollout bertahap per modul/lokasi
> > - **Parallel**: Sistem baru dan lama berjalan bersamaan sementara
> > - **Pilot**: Uji coba terbatas pada kelompok pengguna tertentu
> >
> > Tantangan kritis termasuk manajemen perubahan (change management), pelatihan pengguna, dan rencana rollback jika terjadi kegagalan. Best practice menggunakan checklist deployment dan environment staging yang identik dengan produksi.

> [!cornell] #### Summary
>
> **Core SDLC Execution Phases** membentuk kerangka kerja sistematis untuk transformasi kebutuhan menjadi sistem operasional. Fase **Perancangan** memetakan solusi teknis melalui abstraksi logis dan spesifikasi fisik. **Pengembangan** mengimplementasikan desain dengan pendekatan modular dan kontrol versi. **Pengujian** multi-layer memvalidasi fungsionalitas dan kinerja sistem secara komprehensif. **Implementasi** yang sukses memerlukan strategi deployment tepat dan mitigasi risiko perubahan. **Keterkaitan antar fase** bersifat kumulatif dimana output suatu fase menjadi input fase berikutnya.

> [!ad-libitum]- Additional Information
>
> #### Teknik Perancangan Lanjut
>
> Penggunaan diagram UML (Unified Modeling Language) untuk pemodelan sistem:
>
> - **Class Diagram**: Memetakan struktur objek dan relasinya
> - **Sequence Diagram**: Memvisualisasikan interaksi antar komponen
> - **Activity Diagram**: Memodelkan alur proses bisnis
>
> Tools: Enterprise Architect, Lucidchart, atau PlantUML untuk generasi otomatis.
>
> #### Optimasi Proses Pengembangan
>
> Penerapan DevOps melalui:
>
> - **Continuous Integration**: Otomasi pengujian tiap commit kode
> - **Infrastructure as Code**: Manajemen lingkungan via Terraform/Ansible
> - **Containerization**: Pengemasan aplikasi dengan Docker/Kubernetes
>
> Metrik kunci: Lead Time, Deployment Frequency, Mean Time to Recovery (MTTR)
>
> #### Teknik Pengujian Otomatis
>
> Framework pengujian otomatis:
>
> - Unit: JUnit (Java), pytest (Python)
> - Integration: Postman (API), Selenium (UI)
> - Load Testing: JMeter, Locust
>
> Pola desain: Page Object Model (POM) untuk pengujian UI yang maintainable
>
> #### Self-Exploration Projects
>
> 1. Bangun pipeline CI/CD sederhana menggunakan GitHub Actions untuk aplikasi web
> 2. Analisis comparative strategi deployment pada sistem open-source (contoh: Moodle LMS)
> 3. Implementasi test automation suite untuk REST API menggunakan Postman Collections
>
> #### Tools dan Resources
>
> - Version Control: GitLab, GitHub
> - CI/CD: Jenkins, CircleCI
> - Testing: SoapUI, Cypress
> - Monitoring: Prometheus, Grafana
>
> #### Further Reading
>
> - "Clean Architecture" oleh Robert C. Martin
> - "Continuous Delivery" oleh Jez Humble
> - Dokumentasi resmi ISTQB (International Software Testing Qualifications Board)
> - Tutorial Microsoft Learn: "DevOps for Beginners"