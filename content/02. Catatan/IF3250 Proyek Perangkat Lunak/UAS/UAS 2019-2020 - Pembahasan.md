---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

# UAS Semester II 2019/2020 — Pembahasan

> Selasa, 5 Mei 2021 · Waktu 150 menit · Closed Book
> Format: **PART 1 (Q-Word / isian & pilihan, 30 soal)** + **PART 2 (esai berbasis proyek, 6 soal)**

## PART 1 (Q-Word)

> Jawaban kunci ditandai **tebal**.

**1. Diagram UML yang cocok untuk membuat meta-model domain → Profile diagram.**
*Profile diagram* adalah mekanisme ekstensi UML (stereotype, tagged value, constraint) untuk mengadaptasi UML ke domain tertentu — karena itu cocok untuk meta-model/model domain. Bandingkan dengan [[Domain Model]].

**2. Pada MDA, mapping PIM ke PSM menggunakan format → XML, DTD, dan XSD.**
MDA: CIM → PIM (Platform Independent Model) → PSM (Platform Specific Model). Transformasi antar model direpresentasikan/dipertukarkan via format berbasis XML (DTD & XSD sebagai skema).

**3. Ceremony pada Scrum → sprint planning, sprint retrospective, dan sprint review** (+ daily scrum).
Lihat [[Scrum Execution and Deliverable Management]] & [[Sprint Closure and Retrospective Practices]].

**4. Kegunaan platform pada SPLE → (a) membangun berbagai variasi produk, (b) menyediakan dasar teknologi seragam, (c) menurunkan cost.** Ketiganya benar.

**5. Pernyataan benar tentang 'flexibility' SPLE, KECUALI → "produk spesifik yang satu mampu diubah menjadi produk spesifik lainnya".**
Flexibility/variability berarti **core asset/platform** cukup fleksibel diadaptasi ke berbagai produk spesifik — **bukan** mengubah satu produk jadi produk lain. Flexibility = variability dan tetap ada batasannya.

**6. Kelebihan DSL, KECUALI → "Banyaknya dukungan IDE yang baik".**
DSL justru **lemah** dukungan IDE/tooling. Kelebihan DSL: dibuat khusus untuk domain, ekspresif & mudah, sederhana → mudah dirawat & produktif, mudah dipakai domain expert.

**7. Contoh DSL → HTML, SQL, R.**
Ketiganya bahasa khusus domain (markup, query, statistik).

**8. BUKAN tugas Scrum Master → (a) membagi tugas ke anggota, (b) menentukan technology stack, (c) melakukan code review.**
Tim **self-organizing** (membagi tugas sendiri), tech stack keputusan tim, code review tugas developer. Tugas SM: fasilitasi ceremony, hilangkan *impediment*, coaching.

**9. Fungsi Kanban Board → (a) menjamin kelancaran penyelesaian task, (b) mengetahui bottleneck.**
Kanban memvisualkan alur kerja (WIP) sehingga hambatan/penumpukan terlihat.

**10. Artifak relevan untuk identifikasi & analisis kebutuhan PL → (a) Product Backlog, (b) Use Case, (d) Feature Model.**
Ketiganya menangkap kebutuhan. *Product Arsitektur* (c) adalah artefak **desain/solusi**, bukan kebutuhan.

**11. Burndown chart Day 4 & 5 (effort tersisa naik) → (a) terjadi bug pada task yang sudah closed dan/atau (b) salah melakukan estimasi beban task.**
Garis *remaining effort* yang **naik** menandakan effort bertambah: task lama dibuka lagi karena bug, atau re-estimasi karena estimasi awal salah. "Task selesai" (c) justru menurunkan effort.

**12. Software architecture → "It represents the earliest set of design decision".**
Arsitektur = keputusan desain paling awal yang membatasi implementasi. Lihat [[Domain-Specific Software Architecture (DSSA)]].

**13. Causes of variability → (a) different customer/market needs, (b) technical constraints of hardware/platform.**
Variability muncul dari kebutuhan pasar berbeda dan kendala teknis platform.

**14. Diagram UML yang BUKAN behaviour diagram → Object Diagram.**
Object diagram = *structure diagram*. Behaviour: activity, state machine, use case + interaction.

**15. Diagram UML yang BUKAN interaction diagram → Object diagram.**
Interaction diagram = sequence, communication, timing, interaction overview.

**16. Model pada MDA → CIM, PIM, PSM.**
Computation Independent → Platform Independent → Platform Specific Model.

**17. Kemajuan pekerjaan dipantau melalui → Kanban board, Burndown chart.**
Keduanya artefak monitoring progres. Lihat [[Scrum Monitoring Artifacts and Control Mechanisms]].

**18. BUKAN role pada Scrum → Team Leader.**
Role Scrum: Product Owner, Scrum Master, Development Team. Tidak ada "Team Leader".

**19. Yang dibahas pada Scrum daily meeting → Hambatan (impediment).**
Plus: apa yang sudah/akan dikerjakan. Bukan biaya/jadwal/alokasi orang.

**20. Yang dibahas pada sprint retrospective → (a) apa yang dilanjutkan, (b) dihentikan, (c) mulai dilaksanakan (continue/stop/start).**

**21. Komponen DSSA, KECUALI → Reference model.**
Komponen DSSA: domain model, reference requirements, **reference architecture**, component library, application configuration method. "Reference *model*" bukan komponen.

**22. Arsitektur dapat berperan sebagai berikut, KECUALI → Prototipe dari sistem.**
Peran arsitektur: alat komunikasi stakeholder, abstraksi sistem, manifestasi keputusan desain. Bukan prototipe.

**23. Motivasi product line engineering → (a) peningkatan kualitas, (b) minimalkan time-to-market, (c) peningkatan akurasi estimasi biaya, (d) minimalkan effort perawatan.** Semua benar.

**24. Langkah menerapkan variability → Identifikasi variability subject → definisikan variability point → definisikan varian.**

**25. Kelebihan GPL, KECUALI → "Mudah digunakan oleh domain expert".**
Itu kelebihan **DSL**. Kelebihan GPL: banyak programmer berpengalaman, dukungan IDE baik, berkembang lewat pustaka.

**26. Tipe relasi feature pada feature modeling → (a) Optional, (b) OR, (c) Alternative** (+ mandatory).

**27. Relasi antar feature (cross-tree) → (a) Require, (b) Conflict/Exclude.**

**28. Yang termasuk metodologi agile → (a) Scrum, (b) Extreme Programming.**

**29. Tools pada GitLab untuk mendukung CI/CD → (a) Pipeline, (b) Runner.**

**30. Testing yang dapat dilakukan dengan GitLab → (a) Integration testing, (b) Unit testing.**

## PART 2 (Esai Berbasis Proyek)

> Soal ini menilai **proyek kelompok kamu sendiri**, jadi jawaban harus spesifik + ada *evidence* (screenshot). Berikut kerangka & contoh jawaban model.

**1. Sebutkan peran Anda dalam pengerjaan proyek (tabel Analyst/Designer, Programmer, Testing/QA, CI/CD Engineer).**
Isi persentase kontribusi per peran. Contoh: *John Doe — Analyst/Designer 30%, Programmer 50%, Testing 10%, CI/CD 10%*. Pastikan total tiap kolom = 100% antar anggota.

**2. Sebutkan kontribusi dari masing-masing rekan Anda.**
Buat baris per anggota dengan persentase per peran, lalu narasikan singkat kontribusi konkret tiap orang (mis. "A: setup pipeline GitLab + integrasi testing").

**3. Perbaikan PENTING (Issue Management, Branching, Pembagian Tugas, Teknologi & Arsitektur) + evidence.**
Untuk tiap aspek, sebutkan **satu** perbaikan konkret + bukti:
- *Issue Management*: mis. mulai memakai label & milestone di GitLab Issues agar prioritas jelas (screenshot board).
- *Branching*: mis. pindah dari commit langsung ke `main` → adopsi feature branch + Merge Request review.
- *Pembagian Tugas*: mis. estimasi story point saat planning agar beban merata.
- *Teknologi & Arsitektur*: mis. pisahkan layer (controller/service/repository) agar testable.

**4. Sebutkan perbaikan diri yang perlu Anda lakukan.**
Jawab reflektif & jujur: mis. "lebih disiplin menulis unit test sebelum push", "komunikasi blocker lebih awal di daily".

**5. Arsitektur Perangkat Lunak: (a) gambar UML, (b) penjelasan singkat, (c) 2 kekurangan + usulan.**
- (a) Gambar *component diagram*/layered (Presentation → Business → Data) sesuai [[Domain-Specific Software Architecture (DSSA)]].
- (b) Jelaskan tiap komponen & keterhubungannya.
- (c) Contoh kekurangan: *single point of failure* di 1 service → usul: pisah service + load balancer; coupling tinggi → usul: terapkan interface/dependency injection.

**6. Pilih satu product backlog; bagaimana tim menguji bahwa backlog itu berhasil diimplementasikan? (tujuan, prosedur, kasus uji, hasil).**
Struktur jawaban: **Tujuan** (mis. memastikan fitur login aman & benar) → **Prosedur** (unit test + integration test via pipeline, manual test sesuai acceptance criteria) → **Kasus uji** (tabel: input valid/invalid → expected output) → **Hasil** (pass/fail + screenshot pipeline hijau).

---

## Tips Cara Menjawab (per soal)

**PART 1 — strategi umum:** Ini bank konsep yang **berulang tiap tahun**. Hafalkan pola "KECUALI" — pengecualian biasanya konsep yang tertukar antar topik (mis. kelebihan DSL ditukar dengan GPL).

- **Soal 1, 14, 15, 16, 20 (pkg lain):** Kelompokkan UML jadi **Structure** (class, object, component, deployment, package, profile, composite) vs **Behaviour** (activity, state machine, use case) vs **Interaction** (sequence, communication, timing, interaction overview). Object diagram = structure → jawaban "bukan behaviour/bukan interaction".
- **Soal 2 & 16 (MDA):** Ingat rantai **CIM → PIM → PSM** dan format pertukaran **XML/DTD/XSD**.
- **Soal 3, 8, 18, 19, 20 (Scrum):** Hafalkan **3 role** (PO, SM, Dev Team — tidak ada Team Leader), **ceremony** (planning, daily, review, retrospective), **artefak** (product/sprint backlog, increment). SM = fasilitator, bukan bos.
- **Soal 4, 5, 23, 24 (SPLE/variability):** Platform → variasi + tech seragam + turunkan cost. Variability steps: **subject → point → varian**. "Flexibility" KECUALI selalu kalimat "produk spesifik diubah jadi produk spesifik lain".
- **Soal 6, 7, 25 (DSL vs GPL):** Buat tabel mental: **DSL** = domain-specific, ekspresif, mudah utk domain expert, *minim IDE*; **GPL** = umum, banyak programmer & IDE, *tidak ramah domain expert*. Pengecualian = sifat yang "nyebrang".
- **Soal 9, 11, 17 (monitoring):** Kanban → bottleneck & kelancaran; Burndown naik → bug pada closed task / salah estimasi.
- **Soal 10 (artefak kebutuhan):** Pisahkan artefak **kebutuhan** (backlog, use case, feature model) dari **desain** (arsitektur).
- **Soal 12, 21, 22 (arsitektur & DSSA):** Arsitektur = keputusan desain paling awal + alat komunikasi + abstraksi (**bukan prototipe**). Komponen DSSA tidak termasuk "reference model".
- **Soal 13, 23, 26, 27 (variability/feature & PLE):** Causes of variability = kebutuhan pasar + kendala teknis. Relasi feature: mandatory/optional/OR/alternative + require/exclude.
- **Soal 28, 29, 30 (agile & GitLab):** Agile = Scrum + XP. GitLab CI/CD = Pipeline + Runner; testing = unit + integration.

**PART 2 — strategi umum:** Jawaban **wajib spesifik ke proyek + evidence**. Pola aman: *Situasi → Tindakan → Hasil/Bukti*. Untuk soal arsitektur (5) selalu sertakan **diagram + 2 kelemahan konkret + usulan**. Untuk pengujian (6) gunakan urutan **Tujuan → Prosedur → Kasus uji (tabel) → Hasil**. Refleksi diri (3, 4) dinilai dari kejujuran & konkret, bukan jawaban "sempurna".
