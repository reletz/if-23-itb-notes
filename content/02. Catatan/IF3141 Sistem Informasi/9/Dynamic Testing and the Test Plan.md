---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Dynamic Testing and the Test Plan
>
> > ## Questions/Cues
> >
> > - Apa tujuan dynamic testing dan mengapa dilakukan bertahap?
> > - Apa empat tingkatan dynamic testing (unit→acceptance)?
> > - Apa perbedaan teknik black-box, white-box, dan experience-based?
> > - Apa perbedaan re-testing dan regression testing?
> > - Bagaimana posisi testing di model Waterfall, Incremental, dan Agile?
> > - Apa perbedaan verification dan validation?
> > - Komponen apa saja dalam test plan, serta entry/exit criteria?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi — Quality & Testing (Slides 19-27)
>
> > ### Dynamic Testing dan Tahapan Progresif
> >
> > Tujuan **dynamic testing** adalah memeriksa kualitas perangkat lunak dengan **mengeksekusi modul program** untuk mengidentifikasi defect. Perangkat lunak dieksekusi dalam **tahapan progresif (progressive stages)**, di mana setiap tahap membangun di atas kepercayaan (confidence) yang diperoleh pada tahap sebelumnya.
> >
> > ### Empat Tingkatan Dynamic Testing
> >
> > 1. **Unit testing** (module/component testing) — Setiap modul diuji terhadap module/program specification-nya untuk memeriksa bahwa, **secara terisolasi**, modul melakukan apa yang seharusnya.
> > 2. **Integration testing** — Modul-modul diintegrasikan progresif dan diuji untuk memastikan modul saling **meneruskan data dengan benar** dan mematuhi design specification.
> > 3. **System testing** — Sistem diuji **secara keseluruhan (as a whole)** sesuai functional specification. Tes dirancang untuk **'break'** sistem maupun memeriksa fungsi yang benar, termasuk kebutuhan **non-fungsional** (performance, reliability, security).
> > 4. **User acceptance testing (UAT)** — Pengguna memastikan sistem memberikan fitur yang dibutuhkan untuk mendukung proses bisnis dan sesuai requirements specification.
> >
> > ```mermaid
> > flowchart LR
> >     U["Unit Testing<br/>modul terisolasi"] --> I["Integration Testing<br/>passing data antar modul"]
> >     I --> S["System Testing<br/>sistem utuh + NFR"]
> >     S --> A["User Acceptance Testing<br/>validasi proses bisnis"]
> > ```
> >
> > Tiap tahap membangun confidence di atas tahap sebelumnya, dari isolasi modul hingga validasi pengguna.
> >
> > ### Teknik Dynamic Testing
> >
> > **Black-box**: tester **tidak peduli cara kerja internal**, hanya output vs input; dipakai dalam **UAT, system testing, dan integration testing**. **White-box**: berfokus pada **cara kerja internal** (kode/module specification) untuk merancang tes yang menjalankan logika program; biasanya dipakai dalam **unit testing**. **Experience-based**: pengalaman stakeholder kunci (pengguna, service manager, designer) mengidentifikasi area yang kemungkinan mengungkap defect.
> >
> > ### Re-testing vs Regression Testing
> >
> > **Re-testing** menguji bagian sistem **yang telah diubah** untuk memeriksa perubahan dibuat dengan benar. **Regression testing** memastikan bagian yang **TIDAK diubah** tidak terpengaruh secara tidak sengaja. Karena berbasis bagian tak-berubah, regression test cocok dibangun sekali lalu **digunakan berulang kali** — **kandidat ideal untuk otomasi** menggunakan test tool.
> >
> > ### Testing dalam Berbagai Model SDLC
> >
> > **Waterfall**: testing sebagai **tahap diskret** antara development dan implementation — dilakukan setelah solusi dikembangkan dan sebelum deploy. **Incremental**: testing pada tahap yang sama tetapi **diulang tiap increment**. **Agile**: testing adalah **aktivitas berkelanjutan (continuous)** lewat prototype yang makin ketat, berlandaskan dua prinsip: **Verification** (building the system right) dan **Validation** (building the right system).
> >
> > ### Komponen Test Plan
> >
> > Sebuah **test plan** umumnya mencakup **author and sign-offs**, **revision history**, **purpose**, **system overview**, **stakeholders**, dan **roles and responsibilities**. **Test schedule** mendefinisikan tahap dynamic test mana yang dijalankan, kapan tiap tahap mulai/berakhir dan berapa lama, berapa **cycle/pass** direncanakan, serta jadwal detail tiap tes dan pelaksananya.
> >
> > ### Defect Management, Traceability, Entry/Exit Criteria
> >
> > **Defect management** mendefinisikan **kategorisasi defect** (mis. *critical defect* yang mencegah pengujian berlanjut) dan cara defect dicatat serta dialokasikan ke developer. **Test data**, **test scenarios/scripts**, **traceability** (memetakan test case ke kebutuhan via traceability matrix), **test tools**, dan **test reports** turut didokumentasikan. **Entry Criteria** adalah pemeriksaan yang harus selesai **sebelum** tahap tes dimulai; **Exit Criteria** adalah pemeriksaan yang harus selesai **sebelum** tahap dianggap **complete** (mis. tidak ada open critical defect dan cakupan test minimal tercapai).

> [!cornell] #### Summary
>
> **Dynamic testing** mengeksekusi kode dengan test data untuk menemukan **defect**, dalam **tahapan progresif**: **unit** (modul terisolasi), **integration** (passing data antar modul), **system** (sistem utuh + NFR, dirancang untuk merusak), dan **UAT** (validasi proses bisnis). Tekniknya: **black-box** (UAT/system/integration), **white-box** (unit), dan **experience-based**. **Re-testing** memverifikasi bagian yang diubah; **regression testing** menjaga bagian tak-berubah dan ideal untuk **otomasi**. Posisi **testing dalam SDLC** berbeda: **Waterfall** (tahap diskret), **Incremental** (diulang tiap increment), **Agile** (berkelanjutan, berbasis **verification** & **validation**). **Test plan** mendokumentasikan author/sign-off, purpose, stakeholder, peran, **test schedule** (tahap/durasi/cycle), **defect management**, test data, scenarios/scripts, **traceability**, tools, reports, serta **entry/exit criteria**.

> [!ad-libitum]- Additional Information
>
> #### Strategi Integrasi & Teknik White-box
>
> Integration testing: **Big Bang**, **Top-Down** (*stubs*), **Bottom-Up** (*drivers*), **Sandwich/Hybrid**. Teknik white-box spesifik: **statement/branch/path coverage**, **cyclomatic complexity** (jumlah jalur uji minimum), dan **MC/DC** (wajib untuk safety-critical, DO-178C).
>
> #### Tools Otomasi
>
> - **Selenium, Cypress, Playwright** — UI/system regression
> - **JUnit, pytest, TestNG** — unit & integration
> - **Postman/Newman, REST Assured** — API regression; **GitHub Actions, Jenkins** untuk eksekusi tiap commit
> - **Jira + Xray/Zephyr, TestRail** — manajemen test case & traceability; **Jira, Bugzilla, Mantis** — defect tracking
>
> #### Standar Dokumentasi & V vs V
>
> Struktur test plan mengacu pada **IEEE 829** (Test Plan, Test Design/Case Spec, Test Procedure, Test Log, Test Summary Report), dimodernisasi oleh **ISO/IEC/IEEE 29119**. **Verification** = "membangun produk dengan benar?" (review, static testing); **Validation** = "membangun produk yang benar?" (dynamic testing, UAT).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun suite unit test white-box untuk mencapai 90% branch coverage dan otomatiskan regression UI dengan Playwright di CI.
> 2. Rancang skenario integration testing top-down lengkap dengan stub dan driver.
> 3. Susun test plan IEEE 829 lengkap dengan Requirements Traceability Matrix serta entry/exit criteria terukur.
>
> #### Bacaan Lanjutan
>
> - ISTQB Foundation Level — Test Levels & Test Types
> - Graham, D. et al. *Foundations of Software Testing*. Cengage.
> - IEEE 829-2008 / ISO/IEC/IEEE 29119 — Software Test Documentation
> - Black, R. *Managing the Testing Process*. Wiley.
