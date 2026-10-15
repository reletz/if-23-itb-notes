---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Decoupling Deployment from Release and Metric-Driven Rollbacks
>
> > ## Questions/Cues
> >
> > - Apa beda deployment dan release?
> > - Bagaimana feature flag memisahkan keduanya?
> > - Seperti apa rollback yang sehat?
> > - Bagaimana skenario canary dengan rollback otomatis berjalan?
> >
> > ## Reference Points
> >
> > - IF4054 Release Engineering & Progressive Delivery (Slides 14-15)
> > - IF4054 Release Engineering & Progressive Delivery (Slides 34-39)
>
> > ### Deployment vs Release
> >
> > | | Deployment | Release |
> > |---|---|---|
> > | Makna | Memindahkan kode ke produksi | Mengekspos fitur kepada pengguna |
> > | Sifat | Teknis | Bisnis |
> >
> > **Feature flag** memungkinkan kode di-deploy dengan aman namun **tetap dorman**. Dengan begitu kita bisa melakukan **continuous deployment tanpa perubahan terlihat pengguna yang kontinu**, dan merilis fitur kapan pun bisnis siap.
> >
> > ### Psikologi Rollback
> >
> > - Rollback harus **blameless dan tanpa friksi**.
> > - Jika rollback memakan 30 menit, **strategi deployment Anda gagal**.
> > - Tujuan: rollback **otomatis dan berbasis metrik** dengan acuan **error budget SLO** (SRE Workbook Bab 14).
> >
> > ### Ilustrasi: GitOps dan Progressive Delivery
> >
> > Skenario di cluster Kind/Minikube dengan **ArgoCD, Argo Rollouts, dan Prometheus**:
> >
> > 1. **Baseline** — repo Git berisi Helm chart `app-v1`, ArgoCD synced, 100% trafik ke v1, Prometheus mengumpulkan metrik (HTTP 200, latensi).
> > 2. **Trigger canary** — developer mengubah `values.yaml` untuk `app-v2`; ArgoCD mendeteksi drift dan sync; Argo Rollouts mencegat, membuat canary pod, dan menggeser **10% trafik** ke v2.
> > 3. **Rollback otomatis** — skrip menyuntikkan HTTP 500 di v2; **Analysis Template** meng-query Prometheus ("apakah error rate > 5%?"); analisis gagal sehingga Argo Rollouts **membatalkan dan mengembalikan trafik ke v1** tanpa intervensi manusia.
> >
> > ```mermaid
> > flowchart TD
> >     G["Git: values.yaml<br/>app-v2"] --> A["ArgoCD sync"]
> >     A --> R["Argo Rollouts<br/>canary 10%"]
> >     R --> P["Prometheus<br/>error rate?"]
> >     P -->|"> 5%: gagal"| RB["Abort dan<br/>revert ke v1"]
> >     P -->|"sehat"| PR["Promosi bertahap<br/>ke 100%"]
> > ```
> >
> > Pelajaran: deteksi dalam **detik/menit**, blast radius **terbatas 10%** pengguna, dan rollback otomatis **menghilangkan kepanikan manusia**.

> [!cornell] #### Summary
>
> **Deployment** (teknis, memindahkan kode ke produksi) dipisahkan dari **release** (bisnis, mengekspos fitur) lewat **feature flag**, sehingga continuous deployment tak berarti perubahan terlihat pengguna terus-menerus. Rollback harus **blameless, cepat, dan otomatis berbasis metrik/SLO**. Demonstrasi ArgoCD + Argo Rollouts + Prometheus memperlihatkan canary 10% yang dibatalkan otomatis saat error rate melebihi 5%, dengan blast radius terbatas dan tanpa intervensi manusia.

> [!ad-libitum]- Additional Information
>
> #### Error Budget
>
> **Error budget** adalah sisa toleransi kegagalan dari SLO (mis. SLO 99,9% berarti 0,1% budget). Jika budget habis, rilis fitur baru dihentikan hingga stabilitas pulih — mengikat kecepatan rilis dengan keandalan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan feature flag sederhana (env var atau layanan flag) pada layanan Anda, deploy kode dengan flag mati, lalu aktifkan tanpa redeploy.
>
> #### Bacaan Lanjutan
> - Argo Rollouts — *Analysis and Progressive Delivery*.
> - Pete Hodgson — *Feature Toggles* (martinfowler.com).
