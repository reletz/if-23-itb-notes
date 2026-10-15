---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Release Best Practices and Anti-Patterns
>
> > ## Questions/Cues
> >
> > - Apa tiga best practice utama release engineering?
> > - Apa saja anti-pattern yang harus dihindari dan perbaikannya?
> > - Mengapa "tidak ada satu cara yang benar"?
> >
> > ## Reference Points
> >
> > - IF4054 Release Engineering & Progressive Delivery (Slides 40-49)
>
> > ### Tidak Ada "One True Way"
> >
> > Kuliah memakai ArgoCD dan canary sebagai ilustrasi. Alternatif tool: **Flux** (CNCF), **Spinnaker** (kompleks, multi-cloud), **Flagger**. Alternatif strategi: **Blue-Green** (sering dipilih untuk aplikasi stateful), **A/B Testing** (untuk UX), **Ring Deployments**. Tujuannya memahami **prinsip** agar bisa beradaptasi ke tool apa pun.
> >
> > ### Tiga Best Practice
> >
> > 1. **Immutable artifacts** — bangun image sekali di CI, promosikan image yang sama (dengan **digest**, bukan hanya tag) dari staging ke produksi. Menjamin apa yang diuji di staging persis yang berjalan di produksi.
> > 2. **Git sebagai sumber kebenaran mutlak** — semua perubahan produksi berasal dari commit Git; hotfix lewat **emergency PR**, bukan `kubectl apply` langsung. Menjamin auditability, rollback mudah, dan mencegah konfigurasi "Shadow IT".
> > 3. **Rollback otomatis berbasis metrik** — definisikan **SLI** jelas (mis. error rate < 1%, p99 latency < 200 ms); bila canary melanggar, sistem rollback otomatis. Manusia buruk dalam memantau dashboard saat deployment.
> >
> > ### Empat Anti-Pattern
> >
> > | Anti-pattern | Masalah | Perbaikan |
> > |---|---|---|
> > | **"Snowflake" clusters** | Perubahan manual tak terdokumentasi di cluster; cluster tak dapat direproduksi, OutOfSync diabaikan | Tegakkan self-healing GitOps ketat |
> > | **Push-based "GitOps"** | GitHub Actions menjalankan `kubectl apply`; kredensial K8s berprivilese tinggi tersimpan di CI (attack surface besar) | Pindah ke model **pull**; CI hanya push ke Git |
> > | **Big Bang Friday deployments** | Deploy ke 100% pengguna sekaligus, apalagi akhir pekan; blast radius maksimal, staf minim | **Progressive delivery**: batch kecil berkelanjutan |
> > | **Canary tanpa observability** | 10% trafik ke versi baru tanpa dashboard pembanding; hanya deployment parsial berisiko | "Jika tidak bisa diukur, jangan canary"; terapkan Analysis Template ketat |
> >
> > ```mermaid
> > flowchart LR
> >     R["Release Engineering"] --> P["Progressive delivery<br/>kelola risiko"]
> >     R --> G["GitOps pull model<br/>aman, dapat diaudit"]
> >     R --> H["Helm<br/>packaging dan templating"]
> >     R --> S["DevSecOps<br/>sign, scan, secret, RBAC"]
> >     P --> A["Rollback otomatis<br/>via telemetry"]
> > ```

> [!cornell] #### Summary
>
> Tiga best practice: **artefak immutable dipromosikan via digest**, **Git sebagai sumber kebenaran mutlak** (hotfix lewat emergency PR), dan **rollback otomatis berbasis SLI**. Empat anti-pattern: **snowflake cluster** (perbaikan: self-healing), **push-based GitOps** (perbaikan: pull model), **big bang Friday deployment** (perbaikan: progressive delivery), dan **canary tanpa observability** (perbaikan: Analysis Template). Intinya: pahami prinsip, bukan satu tool tertentu.

> [!ad-libitum]- Additional Information
>
> #### Metrik Delivery
>
> Keberhasilan praktik ini dapat diukur dengan **DORA metrics** (deployment frequency, lead time, change failure rate, time to restore) yang dibahas pada payung DevOps, Containers dan Foundations.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis *release runbook* satu halaman untuk layanan Anda: strategi (canary/blue-green), SLI gate, kriteria rollback, dan siapa yang berwenang.
>
> #### Bacaan Lanjutan
> - Google — *The SRE Workbook*, Bab 14 (*Canarying Releases*).
> - Flagger dan Flux Docs — *Progressive Delivery*.
