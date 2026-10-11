---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Threat Modeling STRIDE dan Checklist Cloud-Native
>
> > ## Questions/Cues
> >
> > - Bagaimana STRIDE diterapkan pada lingkungan cloud-native?
> > - Apa contoh serangan dan pertahanan untuk tiap kategori STRIDE?
> > - Apa enam pertanyaan pada cloud-native security design checklist?
> >
> > ## Reference Points
> >
> > - IF4033 Cloud-Native Security Design (Slides 19-20)
>
> > ### STRIDE pada Cloud-Native
> >
> > | Ancaman | Skenario | Pertahanan |
> > |---|---|---|
> > | **S**poofing | Penyerang menyamar sebagai Service Account untuk mengakses K8s API | Workload identity, mTLS |
> > | **T**ampering | Penyerang memodifikasi container image di registry | Image signing dan verification |
> > | **R**epudiation | Penyerang menghapus pod tanpa jejak | Audit logging terpusat dan immutable |
> > | **I**nformation disclosure | Jaringan datar memungkinkan pod membaca memori/trafik pod lain | NetworkPolicy dan mTLS |
> > | **D**enial of service | Kehabisan resource pada node bersama | Resource requests/limits, Pod Disruption Budgets |
> > | **E**levation of privilege | Container escape ke root host | Drop ALL capabilities, read-only root FS, gVisor |
> >
> > ### Cloud-Native Security Design Checklist
> >
> > 1. **Boundary**: apakah Zero Trust ditegakkan (default-deny network, mTLS)?
> > 2. **Compute**: apakah level isolasi sesuai threat model (runc vs gVisor)?
> > 3. **Identity**: apakah memakai workload identity, bukan kepercayaan berbasis IP?
> > 4. **State**: apakah aplikasi stateless dengan secrets dikelola eksternal?
> > 5. **Provisioning**: apakah semuanya didefinisikan di IaC dan divalidasi Policy-as-Code?
> > 6. **Supply chain**: apakah image dipindai, SBOM dibuat, dan artefak ditandatangani?
> >
> > ```mermaid
> > flowchart LR
> >     B["Boundary"] --> C["Compute"] --> I["Identity"] --> S["State"] --> P["Provisioning"] --> SC["Supply Chain"]
> > ```

> [!cornell] #### Summary
>
> STRIDE (spoofing, tampering, repudiation, information disclosure, DoS, elevation of privilege) dipetakan ke pertahanan cloud-native: **workload identity/mTLS, image signing, audit log immutable, NetworkPolicy, resource limits, drop capabilities/gVisor**. Enam pertanyaan checklist (**boundary, compute, identity, state, provisioning, supply chain**) dipakai untuk meninjau desain.

> [!ad-libitum]- Additional Information
>
> #### Kerangka Pendukung
>
> **CIS Kubernetes Benchmark**, **Pod Security Standards** (privileged, baseline, restricted), dan **MITRE ATT&CK for Containers** melengkapi STRIDE. Penerapan nyata dari mispractice ini terlihat pada [[Anatomi Breach Cloud-Native dan Respons Insiden]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Gambar DFD sederhana sebuah aplikasi 3-tier pada Kubernetes, lalu isi tabel STRIDE per elemen dan per trust boundary.
>
> #### Bacaan Lanjutan
> - Shostack, A. *Threat Modeling: Designing for Security*.
> - Kubernetes Threat Matrix (Microsoft/MITRE).
