---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] GitOps Principles and the Push vs Pull Model
>
> > ## Questions/Cues
> >
> > - Apa itu GitOps?
> > - Apa empat prinsip GitOps?
> > - Apa beda model push dan pull?
> > - Mengapa pull lebih unggul?
> >
> > ## Reference Points
> >
> > - IF4054 Release Engineering & Progressive Delivery (Slides 18-24)
>
> > ### Definisi
> >
> > **GitOps** adalah model operasi untuk Kubernetes dan sistem terdistribusi yang memakai **Git sebagai single source of truth** untuk infrastruktur dan aplikasi deklaratif. ArgoCD dan Flux adalah pemimpin industri; literatur juga membahas Jenkins X, Spinnaker, dan Rancher Fleet.
> >
> > ### Git sebagai Sumber Kebenaran
> >
> > - Git menyimpan **desired state** sistem.
> > - Semuanya **berversi, dapat diaudit, dan immutable**.
> > - Perubahan ke produksi memerlukan **commit Git dan Pull Request**.
> > - Tidak ada lagi `kubectl apply -f` dari laptop developer.
> >
> > ### Empat Prinsip GitOps
> >
> > 1. **Declarative** — seluruh sistem dideskripsikan secara deklaratif (YAML/JSON).
> > 2. **Versioned and Immutable** — state disimpan di Git dengan riwayat terjaga.
> > 3. **Pulled Automatically** — perubahan yang disetujui otomatis ditarik ke cluster.
> > 4. **Continuously Reconciled** — agen memastikan actual state sama dengan desired state.
> >
> > ### Push vs Pull
> >
> > ```mermaid
> > flowchart LR
> >     subgraph PUSH["Push model (lama)"]
> >         CI1["CI server"] -->|"kubectl / helm<br/>kredensial cluster"| C1["Cluster"]
> >     end
> >     subgraph PULL["Pull model (GitOps)"]
> >         CI2["CI server"] -->|"push manifest"| GIT["Git repo"]
> >         AG["Agent di cluster<br/>ArgoCD / Flux"] -->|"pull"| GIT
> >         AG --> C2["Cluster"]
> >     end
> > ```
> >
> > | | Push | Pull |
> > |---|---|---|
> > | Siapa yang menerapkan | CI server men-*push* artefak ke cluster | Agen **di dalam cluster** memantau Git dan menarik perubahan |
> > | Kredensial | CI butuh kredensial K8s berprivilese tinggi | CI hanya push ke Git |
> >
> > **Mengapa pull lebih unggul**:
> >
> > 1. **Security** — CI/CD server tidak perlu kredensial K8s berprivilese tinggi.
> > 2. **Network traversal** — bekerja di balik firewall/NAT korporat karena cluster yang memulai koneksi keluar ke Git.
> > 3. **Drift detection** — agen terus memantau cluster, bukan hanya saat deployment.

> [!cornell] #### Summary
>
> **GitOps** menjadikan Git sumber kebenaran desired state: semua perubahan produksi lewat commit dan PR yang berversi dan dapat diaudit. Empat prinsipnya: **declarative, versioned and immutable, pulled automatically, continuously reconciled**. Model **pull** (agen di cluster seperti ArgoCD/Flux menarik dari Git) lebih aman (CI tak butuh kredensial cluster), bekerja di balik firewall/NAT, dan mendeteksi **drift** secara kontinu dibanding model **push** lama.

> [!ad-libitum]- Additional Information
>
> #### Pemisahan Repo
>
> Praktik umum: pisahkan **repo aplikasi** (kode) dari **repo konfigurasi/manifest** (desired state). CI membangun image lalu membuat commit/PR otomatis yang memperbarui tag image di repo konfigurasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pasang ArgoCD di Kind, sambungkan ke repo manifest, lalu ubah jumlah replika langsung dengan `kubectl` dan amati status OutOfSync.
>
> #### Bacaan Lanjutan
> - OpenGitOps — *GitOps Principles v1.0*.
> - Argo CD Docs — *Declarative Setup*.
