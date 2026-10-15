---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] CI Tooling and Full Pipeline Assembly
>
> > ## Questions/Cues
> >
> > - Bagaimana GitLab CI dan GitHub Actions mendefinisikan pipeline?
> > - Apa perbedaan keduanya?
> > - Apa peran SonarQube dan Quality Gate?
> > - Bagaimana Trivy dipakai sebagai gate?
> > - Apa anti-pattern umum dalam pipeline CI?
> >
> > ## Reference Points
> >
> > - IF4054 CI Automation & Shift-Left (Slides 34-43)
>
> > ### GitLab CI: Pipeline as Code
> >
> > - Pipeline didefinisikan deklaratif di **`.gitlab-ci.yml`** yang hidup di repositori dan berversi bersama kode.
> > - Diorganisasi menjadi **stages** (lint, test, scan, build, deploy); job dalam satu stage berjalan paralel secara default.
> > - Registry bawaan, template SAST/dependency scanning bawaan, dan integrasi merge-request.
> > - **Runner** dapat shared, group-level, atau self-hosted.
> >
> > ### GitHub Actions: Workflow as Code
> >
> > - Workflow berupa YAML di **`.github/workflows/`**, dipicu event (push, pull_request, schedule, manual dispatch).
> > - **Marketplace** Action publik; tugas umum (checkout, cache, scan, deploy) hanya satu baris.
> > - **Matrix build** menguji beberapa versi bahasa atau OS secara paralel.
> > - Integrasi native dengan PR, status check, dan required review.
> >
> > | | GitLab CI | GitHub Actions |
> > |---|---|---|
> > | Platform | Terintegrasi: repo, CI, registry, security scan | Ekosistem Marketplace besar |
> > | Gaya | Opinionated, template SAST/SCA siap pakai | Cepat disusun dari komponen yang ada |
> > | Cocok untuk | Organisasi self-hosted / on-prem | Integrasi PR dan matrix multi-target |
> > | Model | Stages: mental model linear | Event dan workflow |
> >
> > ### SonarQube dan Trivy
> >
> > **SonarQube** menggabungkan analisis statis, SAST, dan metrik kualitas (kompleksitas, duplikasi, coverage) dalam satu dashboard. **Quality Gate** adalah ambang lulus/gagal (mis. nol issue Critical baru, coverage 80%+ pada kode baru) yang ditegakkan CI. Ia memisahkan **new code** dari legacy debt agar proyek lama dapat mengadopsinya tanpa terblokir. Hasil muncul sebagai komentar inline di PR.
> >
> > **Trivy** adalah scanner open-source cepat yang mencakup container image, filesystem, repo Git, dan file IaC; mendeteksi kerentanan paket OS, CVE dependency, misconfiguration, dan secret terpapar dalam satu pass. Desain berbasis **exit code** membuatnya mudah menjadi gate: `trivy image --exit-code 1 --severity CRITICAL,HIGH myapp:sha`.
> >
> > ### Merakit Pipeline Penuh
> >
> > ```mermaid
> > flowchart TD
> >     L["lint<br/>flake8"] --> T["unit_test<br/>pytest --cov"] --> S["sast<br/>sonar-scanner"]
> >     S --> B["build<br/>docker build"] --> CS["container_scan<br/>trivy exit-code 1"]
> >     CS --> P["publish<br/>docker push, hanya main"]
> > ```
> >
> > Enam stage berjalan berurutan dan masing-masing harus lolos; exit code non-zero dari `container_scan` adalah gate, dan `publish` hanya jalan di `main` bila semuanya sukses. Pada skenario slide, bump dependency rutin memunculkan CVE Critical; Trivy menggagalkan pipeline dalam dua menit sehingga publish tidak pernah berjalan, dan versi patch yang dipin membuat pipeline hijau.
> >
> > ### Pitfall dan Anti-Pattern
> >
> > - **Alert fatigue** — gate pada setiap temuan Low melatih tim mengabaikan pipeline.
> > - **Flaky tests** — tes yang kadang gagal mengikis kepercayaan lebih parah daripada tanpa tes; perbaiki atau karantina.
> > - **Mutable `latest` tag** — deploy via tag mengambang merusak build-once-promote-everywhere.
> > - **Secrets in logs** — log CI verbose yang mencetak token adalah vektor kebocoran yang bisa dihindari.

> [!cornell] #### Summary
>
> **GitLab CI** (`.gitlab-ci.yml`, stages, runner) dan **GitHub Actions** (workflow YAML, Marketplace, matrix) mengorkestrasi pipeline-as-code; **SonarQube** menegakkan **Quality Gate** dan SAST, sedangkan **Trivy** memindai image, filesystem, dan IaC dengan gate berbasis exit code. Pipeline lengkap berurutan lint → test → SAST → build → container scan → publish (hanya di `main`). Hindari **alert fatigue, flaky test, tag `latest`, dan secret di log**; prinsip rangkumannya: shift left, piramid bukan cone, gate bukan saran, build sekali.

> [!ad-libitum]- Additional Information
>
> #### Pilihan Tool Lain
>
> Alternatif SAST/SCA: **Semgrep**, **CodeQL**, **Snyk**, **Grype**. Alternatif CI: **Jenkins**, **CircleCI**, **Tekton**. Pilihan platform biasanya mengikuti tempat repositori Anda berada.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun pipeline GitHub Actions 5 stage (lint, test, build, trivy, push) untuk layanan hasil milestone minggu 2, lalu sengaja tambahkan dependency rentan dan amati pipeline menggagalkannya.
>
> #### Bacaan Lanjutan
> - Google — *The Site Reliability Workbook*, Bab 8.
> - Dokumentasi GitLab CI/CD, GitHub Actions, SonarQube, dan Trivy.
