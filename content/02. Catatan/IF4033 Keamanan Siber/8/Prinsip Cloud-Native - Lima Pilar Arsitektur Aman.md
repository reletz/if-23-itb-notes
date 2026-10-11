---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Prinsip Cloud-Native - Lima Pilar Arsitektur Aman
>
> > ## Questions/Cues
> >
> > - Apa definisi cloud-native menurut CNCF dan apa pergeseran filosofinya?
> > - Apa lima premier principles keamanan cloud-native?
> > - Bagaimana penerapan konkret tiap prinsip?
> > - Apa isi architect's checklist?
> >
> > ## Reference Points
> >
> > - IF4033 Cloud-Native Security Design (Slides 2-8)
>
> > ### Apa itu Cloud-Native?
> >
> > Definisi **CNCF**: teknologi yang memberdayakan organisasi membangun dan menjalankan aplikasi **scalable** di lingkungan modern dan dinamis (public, private, hybrid cloud). Teknologi inti: **containers, service mesh, microservices, immutable infrastructure, declarative APIs**.
> >
> > Pergeseran filosofis: dari **"mengelola server"** menjadi **"mengorkestrasi desired state"**. Ini bukan sekadar *hosting* di cloud, melainkan desain ulang fundamental cara perangkat lunak dibangun, dikirim, dan diamankan (ISO 27002: 5.23 Cloud Services).
> >
> > ### Lima Premier Principles
> >
> > ```mermaid
> > flowchart TB
> >     CN["Cloud-Native Security"] --> P1["1. Security by Design<br/>& Default (ISO 8.28)"]
> >     CN --> P2["2. Shift-Left &<br/>DevSecOps (ISO 8.25)"]
> >     CN --> P3["3. Infrastructure &<br/>Policy as Code"]
> >     CN --> P4["4. Software Supply<br/>Chain Integrity"]
> >     CN --> P5["5. Zero Trust Network<br/>Architecture"]
> > ```
> >
> > **1. Security by Design & Default**
> >
> > - *Immutable infrastructure*: server/container tidak di-patch di tempat, melainkan **diganti seluruhnya**.
> > - *Least privilege at runtime*: container berjalan sebagai non-root, `privileged: false`, semua Linux capabilities di-drop (`drop: ["ALL"]`).
> > - *Secure defaults*: aman sejak awal; eskalasi hak harus diminta eksplisit, dicatat, dan diaudit.
> >
> > **2. Shift-Left & DevSecOps**
> >
> > Memindahkan validasi keamanan ke tahap **paling awal SDLC**: SAST, DAST, dan *secret scanning* otomatis di IDE dan pipeline CI/CD. Tujuan: menangkap kerentanan saat paling murah diperbaiki; contoh: gerbang yang **"break the build"** jika ada CVE kritis.
> >
> > **3. Infrastructure & Policy as Code (IaC/PaC)**
> >
> > Infrastruktur didefinisikan lewat file *declarative* (Terraform, Kubernetes YAML), **berversi di Git** (peer review, audit trail, rollback mudah), dan **Policy as Code** (OPA, Kyverno) menolak deployment tidak patuh sebelum diprovisikan.
> >
> > **4. Software Supply Chain Integrity**
> >
> > *Transparency* (SBOM untuk setiap artefak), *provenance* (penandatanganan kriptografis image/IaC dengan Sigstore/Cosign), dan *verification* (admission controller Kubernetes memverifikasi tanda tangan sebelum workload jalan).
> >
> > **5. Zero Trust Network Architecture**
> >
> > *Assume breach* (jaringan internal dianggap hostile), **micro-segmentation** default-deny, **workload identity** kriptografis (SPIFFE/SPIRE) bukan IP/password statis, dan **mTLS** untuk semua komunikasi antar-layanan.
> >
> > ### Architect's Checklist
> >
> > 1. Apakah **immutable** dan berjalan dengan **least privilege**?
> > 2. Apakah keamanan di-**shift-left** ke pipeline CI/CD?
> > 3. Apakah infrastruktur **deklaratif** dan divalidasi **Policy-as-Code**?
> > 4. Apakah supply chain diverifikasi lewat **SBOM dan tanda tangan**?
> > 5. Apakah jaringan **Zero Trust** (default-deny, mTLS, workload identity)?

> [!cornell] #### Summary
>
> **Cloud-native** (container, service mesh, microservices, immutable infrastructure, declarative API) menggeser fokus dari mengelola server ke mengorkestrasi desired state. Lima prinsip premier: **security by design & default**, **shift-left & DevSecOps**, **infrastructure/policy as code**, **software supply chain integrity** (SBOM, signing), dan **Zero Trust**. Kelimanya dirangkum dalam *architect's checklist* untuk meninjau desain.

> [!ad-libitum]- Additional Information
>
> #### Kaitan dengan Prinsip Klasik
>
> Prinsip ini adalah turunan modern dari [[Prinsip Desain Keamanan - Defense in Depth hingga Fail-Secure]]: immutable + drop capabilities = least privilege/secure by default; default-deny = fail-secure.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis Kyverno policy yang menolak Pod `privileged: true` dan image bertag `:latest`, lalu uji pada cluster kind/minikube.
>
> #### Bacaan Lanjutan
> - NIST SP 800-190 *Application Container Security Guide*.
> - SLSA Framework (slsa.dev), Sigstore.
