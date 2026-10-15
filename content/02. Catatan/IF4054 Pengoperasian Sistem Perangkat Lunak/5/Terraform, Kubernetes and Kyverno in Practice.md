---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Terraform, Kubernetes and Kyverno in Practice
>
> > ## Questions/Cues
> >
> > - Bagaimana Terraform mem-provision resource Kubernetes?
> > - Seperti apa Deployment yang aman di cluster lokal?
> > - Bagaimana Kyverno dipasang dan diverifikasi?
> > - Apa deliverable milestone dan pitfall yang harus dihindari?
> >
> > ## Reference Points
> >
> > - IF4054 IaC & Cluster Security (Slides 30-39)
>
> > ### Terraform: Provisioning Deklaratif
> >
> > Terraform memakai **HCL** untuk mendeskripsikan resource; CLI melakukan plan dan apply terhadap sebuah **provider** (plugin yang menerjemahkan blok resource ke panggilan API platform target: AWS, GCP, Kubernetes, dll.). Workflow **write, plan, apply** identik baik untuk VM cloud maupun namespace Kubernetes.
> >
> > Contoh pada slide: resource `kubernetes_namespace` bernama `rps-week3` bersama `kubernetes_resource_quota` (`requests.cpu = 2`, `requests.memory = 4Gi`). Terraform memahami dependency otomatis dari referensi `kubernetes_namespace.app.metadata[0].name`; `plan` menampilkan keduanya sebagai "to be created", dan menghapus blok lalu apply meruntuhkan persis kedua resource itu.
> >
> > ### Kubernetes Lokal
> >
> > `kind create cluster` atau `minikube start` memberi API Kubernetes lokal yang disposable; `kubectl apply -f deployment.yaml` mengirim deklarasi ke API server. Deployment contoh (`rps-api`, 3 replika, image `myapp:sha256-9f3a`) menyertakan `securityContext.runAsNonRoot: true`, persyaratan yang sama yang kelak ditegakkan Kyverno sebagai policy.
> >
> > ### Kyverno: Instalasi dan Verifikasi
> >
> > - Dipasang sebagai kumpulan controller di dalam cluster (`kubectl apply -f` atau Helm).
> > - Mendaftarkan diri sebagai **validating/mutating webhook**; setiap `kubectl apply` berikutnya melewatinya.
> > - `kubectl get clusterpolicies` menampilkan policy aktif; `kubectl describe` pada resource yang ditolak menunjukkan policy mana yang memblokir.
> > - Policy dapat diuji lokal terhadap manifest contoh sebelum ditegakkan cluster-wide, mirip *dry-run* di CI.
> >
> > ### Arsitektur End-to-End
> >
> > ```mermaid
> > flowchart TD
> >     TF["Terraform<br/>provision namespace"] --> K["Cluster Kind/Minikube"]
> >     IMG["Image ter-scan<br/>dari pipeline CI"] --> D["Deployment<br/>runAsNonRoot"]
> >     D --> K
> >     KY["Kyverno ClusterPolicy<br/>require-non-root"] --> K
> > ```
> >
> > ### Milestone: Provisioning and Cluster Policy
> >
> > Provision cluster lokal dan namespace via Terraform, deploy image hasil pipeline minggu sebelumnya dengan Deployment, lalu definisikan dan tegakkan minimal satu **Kyverno ClusterPolicy** (non-root sebagai baseline). **Deliverable**: deployment berjalan di namespace tersebut, plus demonstrasi manifest tak patuh yang **ditolak** Kyverno.
> >
> > ### Pitfall dan Anti-Pattern
> >
> > - **Manual cluster drift** — `kubectl edit` pada resource live membatalkan inti IaC.
> > - **Unlocked shared state** — apply tanpa remote state locking memicu race condition antar-anggota tim.
> > - **ClusterRole terlalu luas** — `cluster-admin` "agar tidak terblokir" merusak least privilege secara permanen.
> > - **Audit-only forever** — policy Audit tanpa pernah ke Enforce hanya mencatat, tidak memblokir.

> [!cornell] #### Summary
>
> **Terraform** (HCL, provider, plan/apply) dapat mem-provision resource Kubernetes seperti namespace dan quota secara deklaratif. Di cluster lokal (**Kind/Minikube**), **Deployment** berisi `runAsNonRoot` dan **Kyverno** (webhook admission) menolak manifest tak patuh. Milestone-nya menggabungkan ketiganya dengan image dari pipeline CI. Hindari **drift manual, state tanpa lock, ClusterRole terlalu luas, dan policy Audit selamanya**.

> [!ad-libitum]- Additional Information
>
> #### GitOps Mengatasi Drift
>
> Pitfall *manual cluster drift* diatasi dengan **GitOps** (Argo CD/Flux) yang terus merekonsiliasi cluster dari Git — dibahas pada payung Release Engineering and Delivery.
>
> #### Proyek Eksplorasi Mandiri
> 1. Selesaikan milestone: namespace via Terraform, Deployment image Anda, dan satu policy Kyverno; dokumentasikan keluaran penolakan manifest root.
>
> #### Bacaan Lanjutan
> - Terraform Registry — *Kubernetes provider*.
> - Google SRE Book — Bab 8 (*Release Engineering*).
