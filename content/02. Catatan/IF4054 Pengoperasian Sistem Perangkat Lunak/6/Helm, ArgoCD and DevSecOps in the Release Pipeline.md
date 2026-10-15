---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Helm, ArgoCD and DevSecOps in the Release Pipeline
>
> > ## Questions/Cues
> >
> > - Apa fungsi Helm dan konsep chart, release, repository?
> > - Bagaimana ArgoCD bekerja dan apa itu reconciliation loop?
> > - Apa pilihan sync policy untuk menangani drift?
> > - Bagaimana security ditanamkan di jalur Git-ke-cluster?
> >
> > ## Reference Points
> >
> > - IF4054 Release Engineering & Progressive Delivery (Slides 25-32)
>
> > ### Helm: Packaging Kubernetes
> >
> > Helm adalah "apt/yum/brew" untuk Kubernetes: mengemas manifest K8s menjadi **Chart** dan mendukung **templating (Go templates)** untuk mengelola environment (dev, staging, prod) lewat `values.yaml`.
> >
> > - **Chart**: kumpulan file yang mendeskripsikan resource K8s.
> > - **Release**: instance spesifik sebuah chart yang berjalan di cluster.
> > - **Repository**: tempat chart dikumpulkan dan dibagikan.
> > - **Best practice**: simpan chart Helm di repo terpisah dari kode aplikasi (atau direktori khusus).
> >
> > ### ArgoCD: Controller GitOps
> >
> > ArgoCD adalah tool continuous delivery GitOps deklaratif untuk Kubernetes. Ia berjalan **di dalam cluster** (model pull), memantau repositori Git, dan otomatis men-sync state cluster, dengan **UI** untuk memvisualisasikan drift dan topologi aplikasi.
> >
> > **Reconciliation loop**: *Desired state* (di Git) dibandingkan dengan *actual state* (di K8s). **Drift** terjadi saat keduanya berbeda (mis. seseorang men-scale deployment secara manual); ArgoCD terus membandingkan dan mengoreksi otomatis (*self-healing*) bila dikonfigurasi.
> >
> > ```mermaid
> > flowchart TD
> >     D["Desired state<br/>Git"] --> CMP{"ArgoCD<br/>bandingkan"}
> >     A["Actual state<br/>Kubernetes"] --> CMP
> >     CMP -->|"sama"| OK["Synced"]
> >     CMP -->|"berbeda = drift"| FIX["Sync / self-heal<br/>atau alert"]
> >     FIX --> A
> > ```
> >
> > ### Menangani Drift: Sync Policy
> >
> > | Policy | Perilaku |
> > |---|---|
> > | **Manual** | ArgoCD memberi alert drift tetapi menunggu persetujuan manusia untuk memperbaiki |
> > | **Automated (Prune and Self-Heal)** | ArgoCD langsung mengembalikan perubahan manual agar sesuai Git |
> >
> > Peringatan: self-healing otomatis sangat kuat, tetapi dapat membuat developer frustrasi saat men-debug di produksi.
> >
> > ### DevSecOps pada Pipeline Release
> >
> > - **Image signing** — Cosign/Notary agar hanya image bertanda tangan yang di-deploy.
> > - **Manifest scanning** — kube-score atau Polaris memindai Helm chart sebelum mencapai cluster.
> > - **RBAC** — ArgoCD hanya berizin deploy ke namespace tertentu.
> > - **Secret management** — jangan commit secret mentah ke Git; pakai External Secrets Operator, Sealed Secrets, atau Vault.
> > - **PR approvals** — wajibkan peer review untuk semua perubahan manifest di Git.

> [!cornell] #### Summary
>
> **Helm** mengemas manifest K8s menjadi chart ber-template dengan `values.yaml` per environment (chart, release, repository). **ArgoCD** berjalan di cluster, membandingkan desired state di Git dengan actual state, dan menangani **drift** lewat sync policy manual atau automated (prune dan self-heal). Keamanan jalur Git-ke-cluster dijaga lewat **image signing, manifest scanning, RBAC sempit, secret management eksternal, dan PR approval**.

> [!ad-libitum]- Additional Information
>
> #### Alternatif Templating
>
> **Kustomize** (overlay tanpa template, bawaan `kubectl`) sering dipakai bersama atau sebagai alternatif Helm. ArgoCD mendukung keduanya.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bungkus layanan Anda sebagai Helm chart dengan `values-dev.yaml` dan `values-prod.yaml`, lalu deploy ke dua namespace lewat ArgoCD Application.
>
> #### Bacaan Lanjutan
> - Helm Docs — *Chart Template Guide*.
> - Bitnami — *Sealed Secrets*; External Secrets Operator Docs.
