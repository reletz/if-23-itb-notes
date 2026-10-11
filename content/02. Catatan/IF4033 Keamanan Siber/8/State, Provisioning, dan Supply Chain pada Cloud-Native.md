---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] State, Provisioning, dan Supply Chain pada Cloud-Native
>
> > ## Questions/Cues
> >
> > - Bagaimana state dan secrets dikelola pada desain stateless?
> > - Mengapa IaC dan Policy-as-Code menggantikan konfigurasi manual?
> > - Mengapa supply chain menjadi komponen arsitektural?
> > - Apa itu SBOM, provenance, dan signing?
> >
> > ## Reference Points
> >
> > - IF4033 Cloud-Native Security Design (Slides 15-18)
>
> > ### 5. State & Data Protection
> >
> > - **Klasik**: state sering disimpan lokal di disk server; backup berupa snapshot periodik seluruh VM.
> > - **Cloud-native**: **stateless by design** (container efemeral, disk lokal terhapus saat restart); **externalized state** (database, cache, object storage dipisah dari compute); **secrets management**: tidak pernah di kode atau file lokal, diinjeksi saat runtime lewat Secrets API atau vault eksternal (**HashiCorp Vault, AWS Secrets Manager**).
> >
> > ### 6. Provisioning & Configuration
> >
> > - **Klasik**: klik GUI manual atau skrip SSH ad-hoc (**"snowflake servers"**); *configuration drift* umum sehingga baseline keamanan menurun.
> > - **Cloud-native**: **Infrastructure as Code** (Terraform, CloudFormation); **Policy-as-Code** (OPA/Gatekeeper, Kyverno); **shift-left**: template IaC dipindai terhadap misconfiguration sebelum deployment.
> >
> > ### 7. Supply Chain sebagai Komponen Arsitektural
> >
> > - **Klasik**: software di-build lokal atau di jump server terisolasi; kepercayaan implisit: *"it compiled, so it's safe"*.
> > - **Cloud-native**: **pipeline CI/CD adalah komponen arsitektural kritis**; **SBOM** wajib untuk mengetahui dependensi transitif; **provenance & signing** (Sigstore/Cosign) dengan verifikasi oleh cluster sebelum workload dieksekusi.
> >
> > ```mermaid
> > flowchart LR
> >     C["Kode + IaC"] --> CI["CI/CD:<br/>SAST, scan, SBOM"] --> SG["Sign image<br/>(Cosign)"] --> REG["Registry"] --> AD["Admission controller<br/>verifikasi tanda tangan"] --> RUN["Workload berjalan"]
> > ```

> [!cornell] #### Summary
>
> Desain cloud-native menjadikan aplikasi **stateless** dengan **externalized state** dan **secrets** dari vault; provisioning memakai **IaC + Policy-as-Code** yang dipindai sejak awal (shift-left) untuk mencegah drift; dan **supply chain** diperlakukan sebagai komponen arsitektural dengan **SBOM**, **penandatanganan** image, serta **verifikasi** oleh cluster sebelum eksekusi.

> [!ad-libitum]- Additional Information
>
> #### Kasus Nyata Supply Chain
>
> Insiden **SolarWinds (2020)** dan **Log4Shell** ([[Studi Insiden Keamanan - Log4Shell, Starwood, dan SingHealth]]) mendorong adopsi SBOM (SPDX, CycloneDX) dan kerangka **SLSA**. Perintah praktis: `cosign sign`, `cosign verify`, `syft` untuk membuat SBOM, `grype`/`trivy` untuk pemindaian.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun image kecil, buat SBOM dengan Syft, pindai dengan Trivy, tanda tangani dengan Cosign, lalu buat Kyverno policy `verifyImages` yang menolak image tanpa tanda tangan.
>
> #### Bacaan Lanjutan
> - SLSA specification, Sigstore documentation.
> - NIST SP 800-218 (SSDF).
