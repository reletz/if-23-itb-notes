---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

# UAS Semester II 2021/2022 — Pembahasan

> Closed Book
> Format: **BAGIAN 1 (18 pilihan ganda, format Google Form)** + **Bagian 2 (6 esai berbasis proyek)**

## Bagian 1 (Pilihan Ganda)

> Jawaban kunci ditandai **tebal**. Soal dengan beberapa checkbox = pilih semua yang benar.

**1. Diagram UML yang BUKAN behaviour diagram → Object diagram.**
Object diagram = *structure diagram*. Behaviour = activity, state machine, use case (+ interaction).

**2. Diagram UML yang termasuk interaction diagram → Sequence diagram.**
Interaction = sequence, communication, timing, interaction overview. Object/timing? → Object bukan interaction.

**3. Diagram UML yang cocok untuk membuat model domain → Profile diagram.**
Profile = mekanisme ekstensi UML untuk domain spesifik. Lihat [[Domain Model]].

**4. Yang BUKAN role dalam metodologi Scrum → Team Leader.**
Role Scrum: Team, Scrum Master, Product Owner. Tidak ada "Team Leader".

**5. Artifak yang dihasilkan pada Scrum → Burndown chart, Product backlog, Sprint Backlog.**
*Kanban board* bukan artefak baku Scrum.

**6. Ceremony pada Scrum → Sprint planning, Sprint retrospective, Sprint review** (+ daily scrum).
*Formal review* bukan ceremony Scrum.

**7. Yang dibahas pada Scrum daily meeting → Hambatan (impediment).**
Bukan biaya/alokasi orang/jadwal.

**8. Yang dibahas pada Sprint Retrospective → apa yang dilanjutkan, dihentikan, mulai dilaksanakan (continue/stop/start).**
Bukan "apa yang harus dipilih".

**9. Arsitektur dapat berperan, KECUALI → Prototipe dari sistem.**
Peran: abstraksi sistem, alat komunikasi stakeholder, manifestasi keputusan desain.

**10. Komponen DSSA, KECUALI → Reference model.**
Komponen: component library, domain model, reference architecture, reference requirements, application configuration method.

**11. Kegunaan platform pada SPLE → memungkinkan membangun berbagai variasi produk, menyediakan dasar teknologi seragam, menurunkan cost.**
Bukan "menyediakan komponen untuk produk spesifik".

**12. Pernyataan benar tentang 'flexibility' SPLE, KECUALI → produk spesifik yang satu mampu diubah menjadi produk spesifik lainnya.**

**13. Motivasi product line engineering → peningkatan kualitas, minimalkan time-to-market, peningkatan akurasi estimasi biaya, minimalkan effort perawatan** (semua benar).

**14. Langkah menerapkan variability → Identifikasi variability subject, definisikan variability point, definisikan varian.**

**15. Kelebihan GPL, KECUALI → Mudah digunakan oleh domain expert.**
Itu kelebihan DSL. GPL: banyak programmer, dukungan IDE, berkembang lewat pustaka.

**16. Kelebihan DSL, KECUALI → Banyaknya dukungan IDE yang baik.**
Kelebihan DSL: khusus domain, ekspresif & mudah, sederhana → produktif.

**17. Tools GitLab untuk mendukung CI/CD → Pipeline** (dan Runner). Bukan Ansible/Worker/Code Review.

**18. Testing yang dapat dilakukan dengan GitLab → Integration Testing, Unit Testing.**
Bukan user/system testing.

## Bagian 2 (Esai Berbasis Proyek)

> Menilai proyek kelompok kamu. Berikut kerangka & contoh jawaban model.

**1. Jelaskan dengan singkat topik proyek kelompok Anda.**
Sebutkan: nama aplikasi, masalah yang diselesaikan, target user, fitur utama (1–2 kalimat tiap poin).

**2. Jelaskan peran dan kontribusi Anda dalam proyek.**
Sebutkan peran (mis. Programmer + CI/CD) + kontribusi konkret + persentase bila perlu.

**3. Bagaimana kelompok memanfaatkan alat bantu untuk mengelola konfigurasi PL? Apa yang perlu diperbaiki?**
Sebutkan tools *configuration management*: **Git/GitLab** (version control), **GitLab CI** (pipeline), issue tracker, `.env`/config file, container (Docker). Perbaikan: mis. konsistensi `.gitignore`, branch protection, secret management (jangan hardcode credential).

**4. Gambar arsitektur PL dalam UML (komponen + keterhubungan) + penjelasan singkat.**
Buat *component diagram* layered (Presentation → Business → Data) atau client–server. Jelaskan tiap komponen & relasinya. Acuan: [[Domain-Specific Software Architecture (DSSA)]].

**5. Menurut Anda, apa yang penting diperhatikan dalam pembangunan PL skala besar? Persoalan apa yang sering timbul?**
Inti dari [[Large-Scale Software Problems and Characteristics]] & [[Principles and Coordination in Large-Scale Development]]:
- **Penting**: partisi ke komponen kecil independen, reuse, configuration management & version control, automation (CI/CD), proses terdefinisi, koordinasi tim (Communication, Capacity, Cooperation).
- **Persoalan sering timbul**: kompleksitas interaksi antar komponen, koordinasi tim besar/terdistribusi, memory/time/performance constraint, threading, portability, konflik requirement, perbedaan platform & "politik" organisasi.

**6. Pilih satu product backlog; bagaimana tim menguji bahwa backlog itu berhasil diimplementasikan? (tujuan, prosedur, kasus uji, hasil).**
Struktur: **Tujuan** → **Prosedur** (unit + integration test via pipeline + manual sesuai acceptance criteria) → **Kasus uji** (tabel input/expected) → **Hasil** (pass/fail + bukti). Lihat juga [[Software Measurement Tools]] untuk evidence kualitas.

---

## Tips Cara Menjawab (per soal)

**Bagian 1 — strategi umum:** Soal **identik** dengan paket UAS 2019/2020 & 2020/2021 — konsep yang sama berulang. Kuasai 6 kelompok berikut, semua soal tertutup:

- **Soal 1, 2, 3 (UML):** Hafalkan peta UML — **Structure** (class, object, component, deployment, profile) vs **Behaviour** (activity, state machine, use case) vs **Interaction** (sequence, communication, timing). Object = struktur; Profile = untuk domain model.
- **Soal 4, 5, 6, 7, 8 (Scrum):** 3 role (PO/SM/Team, **bukan** Team Leader), artefak (product/sprint backlog, burndown — **bukan** kanban), ceremony (planning/review/retro/daily — **bukan** formal review), daily = hambatan, retro = continue/stop/start.
- **Soal 9, 10 (arsitektur/DSSA):** Arsitektur **bukan** prototipe; komponen DSSA **tanpa** "reference model".
- **Soal 11, 12, 13, 14 (SPLE/variability):** Platform → variasi + tech seragam + turunkan cost; flexibility KECUALI = "produk diubah jadi produk lain"; motivasi PLE = 4 poin; langkah variability **subject→point→varian**.
- **Soal 15, 16 (GPL vs DSL):** Pengecualian = sifat yang tertukar. GPL bukan "mudah utk domain expert"; DSL bukan "banyak dukungan IDE".
- **Soal 17, 18 (GitLab):** CI/CD = Pipeline + Runner; testing = unit + integration.

**Bagian 2 — strategi umum:** Spesifik ke proyek + evidence. **Soal 5 adalah soal teori murni** (skala besar) — ini bisa dijawab penuh dari materi: tekankan **partisi + reuse + CM/version control + automation + koordinasi 3C**, dan persoalan **kompleksitas + koordinasi + constraint teknis**. Soal lain (1–4, 6) butuh data proyek nyata: pakai pola **Situasi → Tindakan → Bukti** dan sertakan **diagram** untuk arsitektur (4) serta **tabel kasus uji** untuk pengujian (6).
