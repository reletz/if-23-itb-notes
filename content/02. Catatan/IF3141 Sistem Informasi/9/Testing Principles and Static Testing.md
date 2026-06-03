---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Testing Principles and Static Testing
>
> > ## Questions/Cues
> >
> > - Mengapa testing merupakan aktivitas krusial dalam SDLC?
> > - Mengapa complete/exhaustive testing tidak mungkin dilakukan?
> > - Apa saja 7 prinsip pengujian menurut ISTQB?
> > - Apa itu defect clustering, pesticide paradox, dan absence-of-errors fallacy?
> > - Apa perbedaan error, defect, dan failure?
> > - Apa perbedaan static testing dan dynamic testing?
> > - Artefak apa saja yang ditinjau dan apa teknik review-nya?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi — Quality & Testing (Slides 7-18)
>
> > ### Testing sebagai Aktivitas Krusial
> >
> > Setelah tingkat karakteristik kualitas yang diperlukan didefinisikan dan disepakati, pertanyaannya adalah bagaimana memastikan, atau menguji, bahwa perangkat lunak menunjukkan karakteristik tersebut. **Testing adalah aktivitas krusial dalam System Development Lifecycle**, namun banyak orang keliru meyakini bahwa program dapat diuji secara penuh (fully tested) dan dengan pengujian lengkap tersebut program akan bekerja benar dengan semua error terhapus.
> >
> > ### Complete Testing Tidak Mungkin
> >
> > **Pengujian lengkap (complete testing) tidak mungkin** karena:
> >
> > - terlalu banyak jalur dan kombinasi jalur (paths) melalui perangkat lunak untuk diuji secara penuh;
> > - domain input yang mungkin terlalu besar;
> > - isu user interface terlalu kompleks;
> > - terlalu banyak lapisan komponen hardware dan aplikasi/modul software yang saling terhubung untuk direplikasi ke lingkungan pengujian;
> > - anggaran, waktu, dan sumber daya yang tersedia membatasi jumlah dan cakupan pengujian.
> >
> > Bahkan tools software yang digunakan untuk mengembangkan dan menguji komponen pun sebenarnya harus diuji juga. **Contoh kompleksitas** — aplikasi berbasis internet yang berjalan pada ponsel melibatkan banyak lapisan: aplikasi itu sendiri, sistem operasi ponsel, user interface, konektivitas fisik, konektivitas ke router lokal dan ISP, hingga host service provider beserta seluruh hardware/software terkait. Karena itu **sistem tidak dapat dijamin bebas-fault**, sehingga ekspektasi pengguna harus dikelola dan aktivitas testing difokuskan untuk mengidentifikasi sebanyak mungkin defect (atau defect kritis) dalam batas waktu dan anggaran.
> >
> > ### Tujuh Prinsip Pengujian ISTQB
> >
> > Menurut **ISTQB (International Software Testing Qualifications Board)**:
> >
> > 1. **Testing shows the presence of defects** — Testing dapat menunjukkan bahwa defect ada, tetapi tidak dapat membuktikan tidak ada defect.
> > 2. **Exhaustive testing is impossible** — Variasi input pengguna serta kompleksitas lapisan hardware/software membuat pengujian menyeluruh mustahil.
> > 3. **Early testing is beneficial** — Error dan fault yang ditemukan lebih awal lebih mudah dan murah diperbaiki.
> > 4. **Defect clustering** — Defect cenderung mengelompok (clustering), misalnya pada modul programmer tertentu atau paket/interface tertentu.
> > 5. **Pesticide paradox** — Menggunakan tes yang sama berulang kali tidak mengungkap defect baru; test case perlu ditinjau, direvisi, dan ditambah.
> > 6. **Testing is context dependent** — Jenis tes bergantung pada sistem yang diuji (aplikasi KPR vs navigasi pesawat).
> > 7. **Absence of errors fallacy** — Sistem bebas-defect tetap tidak cukup jika tidak memenuhi kebutuhan pengguna.
> >
> > ### Tujuan Pengujian (Testing Goals)
> >
> > Tujuan testing adalah memastikan kualitas sistem akhir setinggi mungkin dengan: **removing errors** (kesalahan manusia); **removing defects** (fault dalam kode, alias **bugs**); dan **preventing failure** (mencegah sistem gagal melakukan apa yang seharusnya, dan mencegah sistem melakukan yang tidak seharusnya). Rantai kausalnya: error manusia → defect/fault → failure saat dieksekusi.
> >
> > ### Static Testing vs Dynamic Testing
> >
> > **Static testing** mengidentifikasi dan mengoreksi **error** (kesalahan manusia, seperti dalam dokumen atau kode sumber) — berlaku untuk bentuk pengujian apa pun di mana **kode program tidak dijalankan (not exercised)**. **Dynamic testing** mengidentifikasi dan mengoreksi **defect** dengan **menjalankan kode program menggunakan test data**.
> >
> > Dalam **V-Model**, keduanya saling melengkapi: artefak sisi kiri (kebutuhan, spesifikasi fungsional, desain) diverifikasi lewat static testing sejak awal, sementara sisi kanan berisi tahapan dynamic testing yang mengeksekusi kode.
> >
> > ```mermaid
> > flowchart LR
> >     R["Requirements<br/>Specification"] -.static review.-> UAT["User Acceptance<br/>Testing"]
> >     F["Functional<br/>Specification"] -.static review.-> ST["System<br/>Testing"]
> >     D["Design<br/>Specification"] -.static review.-> IT["Integration<br/>Testing"]
> >     M["Module<br/>Specification"] -.static review.-> UT["Unit<br/>Testing"]
> >     M --> CODE["Coding"]
> >     CODE --> UT
> >     UT --> IT --> ST --> UAT
> > ```
> >
> > Sisi kiri (turun) = artefak yang ditinjau static testing; sisi kanan (naik) = tahapan dynamic testing.
> >
> > ### Static Testing dalam Lifecycle
> >
> > Karena tidak menjalankan kode, static testing dapat diterapkan **lebih awal dalam lifecycle bahkan sebelum kode ditulis** — sangat hemat biaya karena error ditangkap pada tahap dokumentasi sebelum berpropagasi menjadi defect kode yang mahal. Static testing utamanya melibatkan **review** terhadap artefak saat diproduksi, lalu dibandingkan dengan artefak tahap sebelumnya untuk memeriksa **completeness** dan **correctness**.
> >
> > ### Artefak yang Direview
> >
> > - **Requirements specification** — diperiksa terhadap *Project Initiation Document* (PID)/*Terms of Reference* (TOR) dan business case.
> > - **Functional specification** — diperiksa terhadap requirements untuk kebenaran teknis dan kelayakan.
> > - **Design specification** — diperiksa terhadap functional & requirements specification untuk akurasi dan kelengkapan.
> > - **Module/program specification** — diperiksa terhadap design specification untuk kelengkapan, maintainability, efficiency, reliability, dan kebenaran passing data antar program.
> >
> > ### Teknik Review (Formalitas Meningkat)
> >
> > **Informal/peer review**: satu analis/programmer meninjau pekerjaan rekan; paling murah, tanpa proses formal. **Walkthrough**: produk ditelusuri baris/bagian/halaman demi halaman untuk mengidentifikasi error, biasanya dipimpin penulis. **Technical review**: ditinjau sekelompok pakar teknis dengan **checklist** masalah umum. **Inspection**: pertemuan review **formal** dengan **peran terdefinisi** (moderator, author, reviewer, scribe) — teknik paling ketat dan terdokumentasi.

> [!cornell] #### Summary
>
> **Testing** adalah aktivitas krusial SDLC, tetapi **complete/exhaustive testing mustahil** karena ledakan jalur, domain input besar, kompleksitas UI, dan lapisan hardware/software berlapis; karenanya testing difokuskan menemukan sebanyak/sekritis mungkin defect dalam batas waktu-biaya. **Tujuh prinsip ISTQB** — presence of defects, exhaustive impossible, early testing, **defect clustering**, **pesticide paradox**, context dependent, **absence-of-errors fallacy** — memandu strategi. Tujuannya menghapus **error** (kesalahan manusia), **defect/bug** (fault kode), dan mencegah **failure**. **Static testing** menemukan **error tanpa mengeksekusi kode** sehingga dapat diterapkan **sejak awal lifecycle**, kebalikan **dynamic testing** yang menjalankan kode untuk menemukan **defect**; dalam **V-Model** keduanya saling melengkapi. Static testing berpusat pada **review** artefak (requirements, functional, design, module specification) dengan empat teknik berformalitas meningkat: **informal/peer review**, **walkthrough**, **technical review**, dan **inspection**.

> [!ad-libitum]- Additional Information
>
> #### Hubungan Error → Defect → Failure
>
> Rantai kausal standar ISTQB: manusia membuat **error/mistake** → menghasilkan **defect/fault/bug** dalam artefak atau kode → ketika kode dieksekusi defect dapat memicu **failure**. Tidak setiap defect memicu failure (mungkin tak pernah dieksekusi).
>
> #### Combinatorial Explosion
>
> Program dengan n input boolean independen memiliki 2^n kombinasi; loop dan kondisi membuat jumlah jalur tumbuh tak terbatas. Teknik **equivalence partitioning** dan **boundary value analysis** mengurangi ruang uji tanpa kehilangan efektivitas. Mengatasi **pesticide paradox**: rotasi/regenerasi test case, mutation testing, dan risk-based testing.
>
> #### Static Analysis Otomatis & Fagan Inspection
>
> Selain review manual, **static code analysis** otomatis memindai kode tanpa menjalankannya (null-pointer, memory leak, security vulnerability, pelanggaran standar): **SonarQube, Coverity, Fortify**, serta linter **ESLint, Pylint, Checkstyle, SpotBugs** terintegrasi CI. Metode formal **Fagan Inspection** mendefinisikan peran (Moderator, Author, Reader, Scribe) dan tahap: planning, overview, preparation, inspection meeting, rework, follow-up.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Hitung jumlah jalur sebuah fungsi via cyclomatic complexity dan diskusikan implikasinya pada exhaustive testing.
> 2. Lakukan walkthrough sebuah SRS dan catat temuan dengan defect log terstruktur.
> 3. Integrasikan SonarQube ke pipeline CI dan terapkan quality gate sebagai static testing otomatis.
>
> #### Bacaan Lanjutan
>
> - ISTQB Foundation Level Syllabus (Certified Tester)
> - Myers, G.J. *The Art of Software Testing*. Wiley.
> - Fagan, M.E. (1976). *Design and Code Inspections to Reduce Errors in Program Development*. IBM Systems Journal.
> - IEEE 1028 — Standard for Software Reviews and Audits
