---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

# UAS Semester II 2024/2025 — Pembahasan

> IF3250 Proyek Perangkat Lunak
> Format: **Bagian I (3 esai teori)** + **Bagian II (3 esai berbasis proyek)**
> Catatan: paket ini **seluruhnya esai** dan langsung memetakan materi UAS terbaru — [[Large-Scale Software Problems and Characteristics]], [[Software Measurement Fundamentals]], [[DSSE Concepts and Three Key Factors]].

## Bagian I (Teori)

**1. Karakteristik utama large scale software development dan efeknya ke manajemen proyek.**

*Pembahasan.* Large-scale software development **bukan sekadar soal ukuran kode**, melainkan kompleksitas berlapis. Karakteristik utamanya:

- **Source code & developer dalam jumlah besar** — jutaan baris, ratusan developer yang sering **terdistribusi secara geografis** (multisite, lintas zona waktu).
- **Kompleksitas interaksi antar komponen tinggi**, penggunaan komponen *off-the-shelf*, multiple programming language & persistence mechanism, multiple platform, concurrency tinggi.
- **Dimensi kompleksitas**: software (high LOC/data/komputasi), requirement (besar, berubah, konflik), lokasi, platform, "politik" (aturan/kebijakan), dan alokasi resource.
- **Kendala teknis**: memory, time (compile/rebuild), performance, threading, safety, portability.

**Efek ke manajemen proyek:**

- **Koordinasi menjadi akar kesulitan** (intra- & inter-team) — bertumpu pada **Communication, Capacity, Cooperation (3C)**.
- Effort melonjak (mis. sistem 5 juta baris ≈ **947 person-years** → ±380 developer untuk 2,5 tahun) → butuh **partisi ke komponen kecil independen** dan **reuse** ketimbang membangun dari nol.
- Wajib menekankan **proses terdefinisi, automation (CI/CD), configuration management & version control, reproducibility**, serta penjadwalan rilis terkoordinasi.
- Penskalaan proses Agile (mis. **LeSS/SAFe**) untuk mengelola banyak tim dengan shared backlog. Lihat [[Scaling Agile for Large Teams (LeSS and SAFe)]] & [[Principles and Coordination in Large-Scale Development]].

**2. Apa kegunaan measurement pada pengembangan software?**

*Pembahasan.* Mengukur **mengubah "seni" menjadi "sains"** (Lord Kelvin; "you cannot control what you cannot measure" — De Marco). Tiga kegunaan inti:

- **Understand** — membuat aktivitas terlihat (visible) & menetapkan baseline/guideline.
- **Control** — memprediksi outcome dan menyesuaikan proses.
- **Improve** — menetapkan target kualitas dan mengukur kemajuan menuju target.

Tujuan konkret mengukur software: **estimasi cost & effort, meningkatkan produktivitas, kualitas, reliabilitas, serta mengevaluasi metode & tools**. Pengukuran memakai **measure/metric/indicator**, skala **nominal→ordinal→interval→ratio**, dan dibedakan **direct measure** (LOC, effort, speed) vs **indirect** (quality, complexity, maintainability). Metrik yang baik harus **valid & reliable**. Lihat [[Software Measurement Fundamentals]], [[Size and Complexity Metrics]], dan [[Software Measurement Tools]].

**3. Apa yang kamu pahami tentang DSSE? Kapan cocok digunakan dan kapan kurang tepat?**

*Pembahasan.* **Domain-Specific Software Engineering (DSSE)** adalah pendekatan rekayasa perangkat lunak yang **memanfaatkan secara ekstensif pengetahuan domain yang sudah ada** (*leveraging existing domain knowledge*). Idenya: *similar problem → similar solution*, sehingga alih-alih membangun *de novo*, kita memetakan region problem space (domain) ke **DSSA**, lalu ke arsitektur aplikasi spesifik, dan cukup membangun "the difference". DSSE berdiri di irisan **tiga faktor: Domain, Business, Technology**.

**Cocok digunakan ketika:**
- Domain **matang & stabil**, sudah ada banyak sistem serupa (commonality & variability terlihat jelas).
- Organisasi ingin membangun **banyak produk terkait** (product line) → reuse menekan biaya & mempercepat time-to-market.
- Tersedia keahlian domain, reference architecture, dan komponen reusable.

**Kurang tepat ketika:**
- Domain **baru / belum dipahami / sangat berubah** — belum cukup pengetahuan untuk mengenali pola umum (reference architecture dibuat **terlalu dini** berisiko salah).
- Proyek **one-off / unik** tanpa rencana keluarga produk — overhead membangun aset reusable tidak terbayar.
- Variability antar produk sangat kecil atau justru sangat liar sehingga abstraksi domain tidak stabil.

Lihat [[DSSE Concepts and Three Key Factors]], [[Domain Model]], dan [[Domain-Specific Software Architecture (DSSA)]].

## Bagian II (Esai Berbasis Proyek)

> Menilai proyek kelompok kamu. Berikut kerangka & contoh jawaban model.

**1. Tech stack di kelompok. Setelah proyek selesai, apakah pemilihan tech stack tepat?**
Struktur jawaban: **(a) Sebutkan stack** (frontend, backend, database, infra/CI). **(b) Alasan pemilihan** awal (familiar, ekosistem, performa). **(c) Evaluasi pasca-proyek** — tepat di mana (mis. framework mempercepat development) dan kurang tepat di mana (mis. DB sulit di-scale, atau learning curve tinggi). **(d) Bila mengulang**, apa yang diubah. Jujur & berbasis pengalaman nyata.

**2. Apa perencanaan evaluasi di kelompok? Jelaskan secara singkat.**
Jelaskan mekanisme evaluasi yang dipakai: **Sprint Review** (demo increment ke stakeholder), **Sprint Retrospective** (continue/stop/start), **burndown chart / kanban** untuk pantau progres, **code review via Merge Request**, dan **testing otomatis (pipeline)** sebagai gerbang kualitas. Sebutkan kapan & siapa yang terlibat. Kaitkan ke [[Sprint Closure and Retrospective Practices]] & [[Software Measurement Tools]].

**3. Pembagian tugas di kelompok agar target tiap sprint tercapai.**
Jelaskan: **(a)** pemecahan product backlog → sprint backlog saat **Sprint Planning**; **(b)** estimasi **story point** agar beban merata sesuai kapasitas; **(c)** penugasan sesuai peran (Analyst/Programmer/QA/CI-CD) dengan prinsip **self-organizing team**; **(d)** sinkronisasi harian via **daily standup** untuk deteksi blocker dini; **(e)** Definition of Done jelas agar task benar-benar selesai. Tegaskan bagaimana ini menjaga target sprint tercapai.

---

## Tips Cara Menjawab (per soal)

**Bagian I (teori) — strategi umum:** Paket ini **paling mudah dipersiapkan** karena jawabannya ada langsung di catatan UAS. Gunakan pola **Definisi → Poin-poin terstruktur → Contoh/angka**.

- **Soal 1 (large scale):** Buka dengan kalimat kunci *"bukan sekadar ukuran kode"*. Pisahkan **karakteristik** dan **efek ke manajemen** menjadi dua blok. Sebut angka ikonik (**947 person-years**, **3C**) sebagai bukti pemahaman. Tutup dengan strategi (partisi + reuse + CM + automation + scaled agile).
- **Soal 2 (measurement):** Hafalkan triad **Understand–Control–Improve** + kutipan (Kelvin/De Marco). Tambahkan klasifikasi **direct vs indirect** dan syarat **valid & reliable** untuk poin lebih.
- **Soal 3 (DSSE):** Wajib jawab **dua sisi** (kapan cocok vs kurang tepat) karena soal memintanya eksplisit. Kunci "kurang tepat" = **domain baru/berubah** & **proyek one-off** (reference architecture *not too-early, not too-late*).

**Bagian II (proyek) — strategi umum:** Jawaban harus **spesifik ke proyek nyata + reflektif**. Untuk evaluasi tech stack (1) tunjukkan **trade-off**, bukan sekadar "sudah tepat". Untuk perencanaan evaluasi (2) hubungkan ke **ceremony Scrum + pipeline**. Untuk pembagian tugas (3) tekankan **planning + estimasi + self-organizing + daily standup + Definition of Done** sebagai rantai yang menjamin target sprint. Pola aman: *Apa yang dilakukan → Mengapa → Hasil/Refleksi*.
