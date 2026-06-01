---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] Requirements Engineering Process
>
> > ## Questions/Cues
> >
> > - Mengapa rekayasa kebutuhan krusial dalam SDLC?
> > - Apa perbedaan kebutuhan fungsional vs non-fungsional?
> > - Bagaimana teknik wawancara digunakan dalam elicitation?
> > - Apa tujuan validasi kebutuhan?
> > - Bagaimana traceability matrix membantu manajemen kebutuhan?
> >
> > ## Reference Points
> >
> > - IF3141_SISTEM_INFORMASI.pdf (Halaman 8)
>
> > ### Definisi dan Tujuan Requirements Engineering
> >
> > Rekayasa Kebutuhan (Requirements Engineering) adalah proses sistematis untuk mengidentifikasi, menganalisis, mendokumentasikan, dan memvalidasi kebutuhan sistem informasi. Proses ini bertujuan menjembatani kesenjangan antara kebutuhan bisnis dan solusi teknis dengan memastikan bahwa sistem yang dikembangkan benar-benar memenuhi ekspektasi pengguna dan tujuan organisasi.
> >
> > Proses ini menjadi fondasi seluruh siklus pengembangan sistem karena kebutuhan yang tidak tepat atau tidak lengkap akan menyebabkan kesalahan desain, pembengkakan biaya, dan kegagalan proyek. Contoh nyata: Sistem pembayaran online yang gagal karena tidak mempertimbangkan kebutuhan keamanan transaksi sejak awal.
> >
> > ### Tahapan Utama Proses Rekayasa Kebutuhan
> >
> > 1. **Elicitation (Penggalian Kebutuhan)**: Proses mengumpulkan kebutuhan dari berbagai stakeholder melalui teknik seperti wawancara, observasi, atau survei. Contoh: Mengadakan sesi workshop dengan departemen keuangan untuk memahami kebutuhan sistem invoice otomatis.
> > 2. **Analysis (Analisis Kebutuhan)**: Mengidentifikasi konflik, ambiguitas, dan ketidaksesuaian dalam kebutuhan yang terkumpul. Tahap ini melibatkan pemodelan kebutuhan menggunakan diagram use case atau user story.
> > 3. **Documentation (Pendokumentasian)**: Menyusun kebutuhan secara terstruktur dalam dokumen spesifikasi kebutuhan (SRS). Format umum mencakup deskripsi fungsional, antarmuka pengguna, dan kriteria performa.
> > 4. **Validation (Validasi)**: Memverifikasi bahwa kebutuhan telah akurat merepresentasikan keinginan stakeholder melalui teknik seperti review dokumen atau prototyping.
> >
> > ### Klasifikasi Jenis Kebutuhan
> >
> > - **Fungsional**: Persyaratan tentang apa yang harus dilakukan sistem (contoh: "Sistem harus mampu menghasilkan laporan transaksi harian")
> > - **Non-Fungsional**: Persyaratan kualitas sistem seperti kecepatan, keamanan, atau skalabilitas (contoh: "Respons sistem ≤2 detik untuk 1000 user bersamaan")
> > - **Kebutuhan Bisnis**: Tujuan organisasi yang mendasari pengembangan sistem (contoh: "Mengurangi waktu proses pembayaran dari 3 hari menjadi 1 jam")
> > - **Kebutuhan Stakeholder**: Ekspektasi spesifik pengguna atau pihak terkait (contoh: "Antarmuka harus kompatibel dengan pembaca layar untuk tunanetra")
> >
> > ### Teknik Penggalian Kebutuhan (Elicitation)
> >
> > 1. **Wawancara Terstruktur**: Menggunakan daftar pertanyaan terstandar untuk mendapatkan informasi konsisten dari berbagai stakeholder
> > 2. **Observasi Lapangan**: Memantau langsung proses kerja pengguna untuk mengidentifikasi kebutuhan tersembunyi
> > 3. **Brainstorming**: Sesi kolaboratif untuk menghasilkan ide-ide inovatif
> > 4. **Prototyping**: Membuat versi sederhana sistem untuk mendapatkan umpan balik cepat
> >
> > Contoh kasus: Menggunakan teknik kartu sort (card sorting) untuk merancang struktur menu aplikasi berdasarkan preferensi pengguna.
> >
> > ### Manajemen dan Traceability Kebutuhan
> >
> > Manajemen kebutuhan meliputi pelacakan perubahan, versi dokumen, dan hubungan antar kebutuhan. Traceability matrix digunakan untuk:
> >
> > - Melacak asal-usul kebutuhan dari proposal bisnis hingga implementasi
> > - Memastikan semua kebutuhan telah teruji
> > - Mengidentifikasi dampak perubahan kebutuhan
> >
> > Contoh tabel traceability sederhana:
> >
> > | ID Kebutuhan | Sumber | Desain Terkait | Kasus Uji |
> >
> > |--------------|--------|----------------|----------|
> >
> > | REQ-001      | Wawancara CFO | Modul Laporan | TC-012 |

> [!cornell] #### Summary
>
> **Rekayasa Kebutuhan** merupakan proses kritis dalam SDLC yang berfokus pada pengidentifikasian dan pengelolaan kebutuhan sistem secara sistematis. Proses ini mencakup empat tahap utama: **penggalian, analisis, dokumentasi, dan validasi** kebutuhan dengan menggunakan berbagai teknik seperti wawancara dan prototyping. Kebutuhan diklasifikasikan menjadi **fungsional, non-fungsional, bisnis, dan stakeholder** yang masing-masing memerlukan pendekatan dokumentasi berbeda. **Traceability matrix** berperan penting dalam memastikan semua kebutuhan terpenuhi dan dapat dilacak sepanjang siklus pengembangan.

> [!ad-libitum]- Additional Information
>
> #### Metode Formal Spesifikasi Kebutuhan
>
> Teknik formal seperti **UML (Unified Modeling Language)** dan **SysML (Systems Modeling Language)** digunakan untuk kebutuhan kompleks. UML menggunakan diagram use case untuk merepresentasikan interaksi aktor-sistem, sedangkan diagram aktivitas memodelkan aliran kerja. Contoh persyaratan formal dengan notasi matematis:
>
> ```
>
> ∀ transaksi ∈ SistemPembayaran •
>
> transaksi.status = 'selesai' ⇒
>
> ∃ catatan ∈ AuditTrail • catatan.id_transaksi = transaksi.id
>
> ```
>
> #### Teknik Analisis Kebutuhan Lanjutan
>
> **Quality Function Deployment (QFD)** mentransformasikan kebutuhan pelanggan menjadi spesifikasi teknis melalui matriks House of Quality. **Analisis Akar Masalah** dengan diagram Ishikawa membantu mengidentifikasi kebutuhan tersembunyi. Untuk sistem kritis, digunakan teknik **FORMAL METHODS** seperti Z Notation atau B Method yang membutuhkan keahlian khusus.
>
> #### Studi Kasus Kompleks
>
> Pada proyek sistem kontrol lalu lintas udara, rekayasa kebutuhan melibatkan:
>
> - Analisis fail-safe untuk skenario kegagalan sistem
> - Persyaratan waktu nyata (real-time) dengan toleransi latency <50ms
> - Protokol komunikasi redundansi ganda
>
> Tantangan utama mencakup mengelola 5000+ kebutuhan dengan prioritas berkonflik dari 15 stakeholder berbeda.
>
> #### Alat Bantu (Tools)
>
> - **JIRA** dengan plugin Requirements Hub untuk pelacakan kebutuhan
> - **IBM DOORS** untuk proyek berskala besar dengan regulasi ketat
> - **Enterprise Architect** untuk pemodelan kebutuhan visual
> - **ReqView** untuk manajemen kebutuhan berbasis web
>
> #### Self-Exploration Projects
>
> 1. Analisis kebutuhan untuk sistem reservasi restoran: Identifikasi 10 kebutuhan fungsional dan 5 non-fungsional, lalu buat prototype sederhana menggunakan Figma
> 2. Bandingkan dokumen SRS proyek open-source di GitHub (contoh: Apache Kafka vs MySQL)
> 3. Buat traceability matrix untuk fitur-fitur aplikasi kalkulator ilmiah
>
> #### Further Reading
>
> - "Requirements Engineering: Fundamentals, Principles, and Techniques" oleh Klaus Pohl
> - "Mastering the Requirements Process" oleh Suzanne dan James Robertson
> - IEEE Standard 830-1998 untuk Spesifikasi Kebutuhan Perangkat Lunak
> - Tutorial Sparx Systems: https://sparxsystems.com/resources/tutorials/requirements
> - Kursus Coursera "Requirements Engineering: Secure Software Specifications"