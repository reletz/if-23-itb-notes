---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Cluster Security - RBAC, Admission Control and Kyverno
>
> > ## Questions/Cues
> >
> > - Bagaimana RBAC mengatur akses ke API server?
> > - Bagaimana prinsip least privilege diterapkan pada workload?
> > - Apa fungsi admission controller?
> > - Bagaimana Kyverno menegakkan policy sebagai kode?
> > - Apa yang dimaksud defense in depth?
> >
> > ## Reference Points
> >
> > - IF4054 IaC & Cluster Security (Slides 23-29)
>
> > ### RBAC: Role-Based Access Control
> >
> > Setiap request ke API server **diautentikasi** (siapa Anda?) lalu **diotorisasi** (bolehkah?); RBAC mengatur langkah kedua.
> >
> > - **Role**: kumpulan izin (verb `get/list/create/delete` pada resource seperti pods/secrets) dalam **satu namespace**.
> > - **RoleBinding**: memberikan Role kepada user, group, atau service account.
> > - **ClusterRole** dan **ClusterRoleBinding**: padanan cluster-wide, dipakai hemat karena berlaku di mana-mana sekaligus.
> >
> > ### Least Privilege dan Runtime Non-Root
> >
> > Prinsip least privilege diterapkan pada workload: pod hanya punya izin yang ia butuhkan. Container yang berjalan sebagai **root** dapat, pada banyak misconfiguration, mengeskalasi hingga akses setara root di node. `runAsNonRoot: true` dan **read-only root filesystem** memperkecil blast radius container yang dikompromikan, memperluas SecOps dari scan build-time ke lapisan runtime.
> >
> > ### Admission Controllers
> >
> > Mencegat setiap request **setelah autentikasi dan otorisasi, tetapi sebelum disimpan** — checkpoint terakhir.
> >
> > - **Mutating**: dapat mengubah request (inject sidecar, set default resource limit).
> > - **Validating**: hanya menerima atau menolak; di sinilah **policy enforcement** (seperti Kyverno) berada.
> > - Pola ini mirip CI gate: cek murah (RBAC) lebih dulu, policy engine yang lebih mahal terakhir.
> >
> > ### Policy as Code dengan Kyverno
> >
> > **Kyverno** menulis policy Kubernetes-native sebagai **YAML** tanpa bahasa policy baru. Policy dapat **validate** (blokir resource tak patuh), **mutate** (perbaiki otomatis atau inject default), atau **generate** (buat resource terkait). Ia berjalan sebagai admission controller, sehingga setiap `kubectl apply` melewatinya.
> >
> > Contoh `ClusterPolicy` pada slide:
> >
> > - `validationFailureAction: Enforce` — pod yang melanggar **ditolak**, bukan sekadar dicatat.
> > - Blok `pattern` mensyaratkan `securityContext.runAsNonRoot: true` pada container.
> > - Mengganti `Enforce` dengan `Audit` memungkinkan roll-out policy aman dengan mengamati pelanggaran dahulu.
> >
> > ### Defense in Depth
> >
> > ```mermaid
> > flowchart TD
> >     B["Build-time gate<br/>CI scan dan blokir artefak rentan"] --> PR["Provisioning gate<br/>Terraform plan + review"]
> >     PR --> AC["Access gate<br/>RBAC ke API server"]
> >     AC --> RT["Runtime gate<br/>Kyverno admission policy"]
> >     RT --> POD["Pod berjalan"]
> > ```

> [!cornell] #### Summary
>
> **RBAC** (Role/RoleBinding, ClusterRole) mengatur otorisasi ke API server; **least privilege** dan `runAsNonRoot` membatasi blast radius container. **Admission controller** (mutating dan validating) adalah gerbang terakhir sebelum objek disimpan, dan **Kyverno** menegakkan **policy as code** berbasis YAML (validate/mutate/generate; mode Enforce vs Audit). Keamanan bersifat **berlapis**: build-time gate, provisioning gate, access gate, dan runtime gate.

> [!ad-libitum]- Additional Information
>
> #### Pod Security Standards dan Alternatif
>
> Kubernetes memiliki **Pod Security Admission** (profil privileged/baseline/restricted) bawaan. Alternatif Kyverno: **OPA Gatekeeper** (bahasa Rego) dan **ValidatingAdmissionPolicy** (CEL, bawaan Kubernetes).
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat ServiceAccount dengan Role hanya-baca pada pods di satu namespace, lalu uji dengan `kubectl auth can-i`.
> 2. Tulis policy Kyverno yang melarang tag `latest`, uji dalam mode Audit sebelum Enforce.
>
> #### Bacaan Lanjutan
> - Kubernetes Docs — *RBAC Authorization* dan *Admission Controllers*.
> - Kyverno Docs — *Policies*.
