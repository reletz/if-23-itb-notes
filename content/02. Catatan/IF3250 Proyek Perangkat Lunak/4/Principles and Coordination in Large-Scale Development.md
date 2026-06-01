---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Principles and Coordination in Large-Scale Development
>
> > ## Questions/Cues
> >
> > - Apa prinsip-prinsip dasar pengembangan large-scale software?
> > - Mengapa "process" dan "automation" ditekankan?
> > - Apa akar penyebab kesulitan koordinasi pada tim besar?
> > - Apa tiga faktor utama koordinasi kerja?
> > - Apa yang dimaksud Very Large-Scale Software Engineering (VLSSE)?
> >
> > ## Reference Points
> >
> > - Large Scale Software Development (Halaman 6-7)
> > - Large Scale Software Development (Halaman 16-17)
>
> > ### Prinsip Pengembangan Large-Scale Software
> >
> > Lima prinsip operasional yang menjadi fondasi:
> >
> > 1. **Reproducibility** — proses dan hasil build harus dapat direproduksi secara konsisten.
> > 2. **Policy Enforcement versus Policy Auditing** — perlu keseimbangan antara *menegakkan* kebijakan secara otomatis dan *mengaudit* kepatuhan kebijakan.
> > 3. **Process, Process, Process** — *"A process must be defined to be improved."* Sebuah proses harus terdefinisi dulu agar bisa diperbaiki.
> > 4. **Automation** — *"A process must be automated to be repeatable."* Proses harus diotomasi agar dapat diulang secara andal.
> > 5. **Continuous Functional Integration and Test** — integrasi dan pengujian fungsional berkelanjutan.
> >
> > Rantai logikanya: **define → improve**, lalu **automate → repeatable**. Tanpa proses yang terdefinisi, tidak ada yang bisa diperbaiki; tanpa otomasi, proses tidak dapat diulang dengan andal pada skala besar.
> >
> > ### Akar Masalah: Koordinasi Kerja
> >
> > > *"The root cause is work coordination between team developers."*
> >
> > Kesulitan utama large-scale development adalah **koordinasi kerja antar developer**, baik **intra-team** (dalam satu tim) maupun **inter-team** (antar tim). Inilah yang membuat sistem besar sulit, bukan kerumitan algoritma per-modul.
> >
> > ### Tiga Faktor Utama Koordinasi (3C)
> >
> > - **Communication** — kemampuan bertukar informasi yang relevan secara tepat waktu antar individu dan antar tim.
> > - **Capacity** — kapasitas sumber daya (orang, waktu, infrastruktur) untuk menyerap pekerjaan.
> > - **Cooperation** — kemauan dan mekanisme untuk saling bekerja sama menuju tujuan bersama.
> >
> > ```mermaid
> > flowchart TD
> >     RC["Akar Masalah:<br/>Koordinasi kerja antar developer"]
> >     RC --> Intra["Intra-team coordination"]
> >     RC --> Inter["Inter-team coordination"]
> >     subgraph Faktor["Major Factors (3C)"]
> >         Comm["Communication"]
> >         Cap["Capacity"]
> >         Coop["Cooperation"]
> >     end
> >     Intra --> Faktor
> >     Inter --> Faktor
> > ```
> >
> > ### Very Large-Scale Software Engineering (VLSSE)
> >
> > VLSSE menyoroti elemen-elemen rekayasa pada skala sangat besar (dikaitkan dengan riset Walt Scacchi tentang Open Source & Very Large-Scale Software Engineering):
> >
> > - **Architectural specification** — sistem, services (data, protocols, processes), serta struktur tim/organisasi.
> > - **Configuration management and version control**.
> > - **Process automation** — builds, regression tests, dll.
> > - **Reliance on *informalisms*** untuk pengembangan (banyak pengetahuan tersimpan informal, bukan dokumen formal).
> >
> > **VLSSE — The Process** menambahkan dimensi:
> >
> > - Configuration management and version control
> > - Architectural specification and maintenance
> > - Collaboration, leadership, control, and conflict management
> > - Community development and support
> > - Software source code and artifact data mining

> [!cornell] #### Summary
>
> Pengembangan skala besar berdiri di atas lima prinsip: **reproducibility, policy enforcement vs auditing, process, automation, dan continuous integration & test** — dengan rantai kunci *define→improve* dan *automate→repeatable*. **Akar kesulitannya adalah koordinasi kerja** antar developer (intra- & inter-team), yang bertumpu pada tiga faktor: **Communication, Capacity, Cooperation (3C)**. Pada skala sangat besar, **VLSSE** menekankan spesifikasi arsitektur, configuration management, otomasi proses, serta pengandalan *informalisms*, kolaborasi, dan data mining artefak perangkat lunak.

> [!ad-libitum]- Additional Information
>
> #### Policy Enforcement vs Policy Auditing
>
> **Enforcement** mencegah pelanggaran kebijakan sejak awal (mis. pipeline menolak commit yang gagal lint). **Auditing** mendeteksi pelanggaran setelah terjadi (mis. laporan kepatuhan berkala). Keduanya komplementer: enforcement penuh bisa terlalu kaku, auditing penuh terlambat — keseimbangan menyesuaikan risiko.
>
> #### Kaitan dengan CI/CD
>
> Prinsip *automation* dan *continuous functional integration and test* adalah cikal bakal praktik **CI/CD** modern. Lihat juga koneksi ke metrik kualitas otomatis di [[Software Measurement Tools]] (SonarQube quality gate) yang menegakkan kebijakan secara otomatis.
>
> #### Further Reading
>
> - Walt Scacchi, *Open Source Software Development and Very Large-Scale Software Engineering*, Institute for Software Research, UC Irvine, 2005.
