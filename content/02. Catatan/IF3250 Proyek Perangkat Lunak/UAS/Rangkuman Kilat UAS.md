---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

# ⚡ Rangkuman Kilat UAS — IF3250 PPL

> Baca cepat 1 jam sebelum UAS. Fokus konsep yang **berulang tiap tahun** + jebakan **KECUALI**.

## 🎯 Jebakan "KECUALI" (paling sering keluar — hafalkan!)

| Pertanyaan | Jawaban KECUALI (yang SALAH/bukan) |
|---|---|
| Peran arsitektur, KECUALI | **Prototipe dari sistem** |
| Komponen DSSA, KECUALI | **Reference model** |
| Kelebihan **GPL**, KECUALI | **Mudah digunakan oleh domain expert** (itu DSL) |
| Kelebihan **DSL**, KECUALI | **Banyaknya dukungan IDE yang baik** (itu GPL) |
| 'Flexibility' SPLE, KECUALI | **Produk spesifik diubah jadi produk spesifik lain** |
| Tugas Scrum Master, KECUALI | bagi tugas / tentukan tech stack / code review |
| Behaviour diagram, KECUALI | **Object / Deployment** (itu structure) |
| Interaction diagram, KECUALI | **Object diagram** |

## 🌀 Scrum (WAJIB — keluar tiap paket)

- **3 Role:** Product Owner · Scrum Master · Development Team → **BUKAN role: Team Leader**
- **Scrum Master** = fasilitator (pimpin daily, hilangkan hambatan). BUKAN: bagi tugas, tentukan tech stack, code review.
- **4 Ceremony:** Sprint Planning · Daily Scrum · Sprint Review · Sprint Retrospective → BUKAN: formal review
- **Artefak:** Product Backlog · Sprint Backlog · Increment · (Burndown chart) → **BUKAN artefak: Kanban board**
- **Daily meeting bahas:** **Hambatan** (impediment) — bukan biaya/jadwal/alokasi orang
- **Retrospective bahas:** **Continue / Stop / Start** (dilanjutkan / dihentikan / mulai dilaksanakan)
- **Kanban board:** kelancaran task + **bottleneck**
- **Burndown naik di Day X:** bug pada task yg sudah closed / salah estimasi beban
- **Metodologi agile:** Scrum, Extreme Programming (XP)

## 📐 UML (klasifikasi — sering keluar)

- **Structure:** class, **object**, component, **deployment**, package, **profile**, composite
- **Behaviour:** activity, state machine, use case (+ interaction)
- **Interaction:** **sequence**, communication, timing, interaction overview
- **Domain model / meta-model → Profile diagram**
- Object diagram = structure → jawaban "bukan behaviour" & "bukan interaction"

## 🏭 MDA (Model Driven Architecture)

- Model: **CIM → PIM → PSM** (Computation/Platform Independent/Specific)
- Mapping PIM→PSM format: **XML, DTD, XSD**

## 🧩 DSL vs GPL

- **DSL** (Domain-Specific Language): khusus domain, ekspresif & mudah, sederhana→produktif, **mudah utk domain expert**; ❌ minim IDE. Contoh: **HTML, SQL, R**.
- **GPL** (General Purpose Language): banyak programmer & **dukungan IDE**, berkembang lewat pustaka; ❌ tidak ramah domain expert.
- **Internal DSL** untung: pakai infrastruktur bahasa host, ekspresif/dekat domain, integrasi mulus (contoh: jQuery, Gherkin).

## 🏗️ SPLE / Product Line / Variability

- **Kegunaan platform:** bangun variasi produk + dasar teknologi seragam + **turunkan cost** → BUKAN: sediakan komponen produk spesifik
- **Motivasi PLE (4):** ↑kualitas · ↓time-to-market · ↑akurasi estimasi biaya · ↓effort perawatan
- **Langkah variability:** Identifikasi variability **subject** → definisikan variability **point** → definisikan **varian**
- **Causes of variability:** different customer/market needs + technical constraints HW/platform
- **Flexibility = variability**, tetap ada batasannya
- **Domain Eng** ("for reuse": core asset) vs **Application Eng** ("with reuse": produk spesifik)

## 🌿 Feature Model

- **Tipe relasi feature:** Mandatory · Optional · OR · Alternative (XOR) → BUKAN: AND
- **Cross-tree constraint:** **Require** · Exclude/Conflict

## 🏛️ Arsitektur & DSSA

- **Peran arsitektur:** alat komunikasi stakeholder · abstraksi sistem · manifestasi keputusan desain (**earliest set of design decision**) → BUKAN: prototipe
- **Komponen DSSA:** domain model · reference requirements · **reference architecture** · component library · application configuration method → BUKAN: "reference model"
- **DSSA = software architecture fokus pada 1 domain** (batasi problem space)

## 📊 Software Quality & Metrics

- **ISO 25010 (8):** Functional Suitability · Performance Efficiency · Compatibility · Usability · Reliability · Security · **Maintainability** · Portability
  - **Maintainability sub:** modularity, reusability, analysability, modifiability, **testability** (⚠️ adaptability=portability, interoperability=compatibility)
- **Direct measure** (internal): **LOC, effort**, cost, speed, memory
- **Indirect measure** (external): quality, complexity, efficiency, reliability, maintainability
- **Skala:** Nominal → Ordinal → Interval → Ratio (makin ke kanan makin kuat; bisa turun, tak bisa naik)
- **Measure** (vs standar) · **Metric** (ukuran kuantitatif atribut) · **Indicator** (penanda goal)
- **Kegunaan measurement:** Understand · Control · Improve
- **Metrik baik:** valid + reliable (+ objektif, intuitif, robust, praktis)

### Rumus penting

- **McCabe Cyclomatic:** $V(G) = E - N + 2 = P + 1$ (P = predicate node). **Aman ≤ 10**.
- **Halstead:** $\eta_1,\eta_2$ (distinct operator/operand), $N_1,N_2$ (total). Volume $V=N\log_2\eta$; Difficulty $D=\frac{\eta_1}{2}\cdot\frac{N_2}{\eta_2}$; Effort $E=D\cdot V$.
- **LCOM** = $|P|-|Q|$ jika $|P|>|Q|$, else 0. (P=pasangan method tanpa instance var bersama, Q=yang berbagi)
- **OO (Chidamber-Kemerer):** WMC, DIT (kedalaman), NOC (jml anak), CBO/RFC (coupling), LCOM (cohesion)

## 🐘 Large Scale Software Development

- **Bukan sekadar ukuran kode** → kompleksitas: software, requirement, lokasi, platform, politik, resource
- **Masalah teknis:** memory, time (rebuild), performance, threads, safety, portability
- **Prinsip:** Reproducibility · Policy enforcement vs auditing · **Process** (define→improve) · **Automation** (automate→repeatable) · Continuous Integration & Test
- **Akar kesulitan = KOORDINASI** → **3C: Communication, Capacity, Cooperation**
- **ULS System:** decentralization · conflicting/unknowable requirements · continuous evolution · normal failures · erosi batas manusia/sistem. Challenge: Design&Evolution, Orchestration&Control, Monitoring&Assessment
- **Scaling Agile:** **LeSS** (minimalism, 1 PO, shared backlog, sprint sinkron) · **SAFe** (value stream, Agile Release Train 5–15 tim/≤150 org, Program Increment)

## 🎯 DSSE (Domain-Specific Software Engineering)

- = **leveraging existing domain knowledge** (similar problem→similar solution, bangun "the difference")
- Spektrum: Traditional SE (terlalu banyak pilihan) → Architecture-Based → **DSSE** (domain→DSSA→app)
- **3 faktor:** Domain · Business · Technology (irisan: Corporate Core Competencies, Application Family Arch, Domain Independent Infra)
- **Domain Model:** Domain Dictionary + Information Model + Feature Model + Operational Model
- **Cocok:** domain matang/stabil, banyak produk terkait (product line). **Kurang tepat:** domain baru/berubah, proyek one-off (reference arch *not too-early, not too-late*)

## 🔧 GitLab / CI-CD / Testing

- **GitLab CI/CD tools:** **Pipeline** + **Runner**
- **Testing via GitLab:** **Unit** + **Integration** (bukan system/user)
- **Pipeline gate** untuk Merge Request → branching (GitHub Flow) & CI saling menopang

## 🧠 Mnemonic super-cepat
- **Role Scrum** = "PO-SM-Team" (no Team Leader)
- **Ceremony** = "Plan-Daily-Review-Retro"
- **Variability** = "Subject → Point → Varian"
- **MDA** = "CIM-PIM-PSM"
- **3C koordinasi** = "Communication, Capacity, Cooperation"
- **V(G)** = "E−N+2 = P+1, aman ≤10"
- **DSL contoh** = "HTML, SQL, R"
- **DSSA** ≠ reference **model**; **arsitektur** ≠ prototipe

> 💪 Tenang. Baca tabel KECUALI sekali lagi, lalu Scrum + UML + SPLE. Itu 70% soal pilihan ganda. Good luck!
