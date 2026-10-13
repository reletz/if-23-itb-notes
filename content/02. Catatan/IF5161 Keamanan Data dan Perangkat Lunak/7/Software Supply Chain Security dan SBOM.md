---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Software Supply Chain Security dan SBOM
>
> > ## Questions/Cues
> >
> > - Mengapa supply chain adalah attack surface tersendiri?
> > - Apa itu SBOM, SCA, dan format SPDX/CycloneDX?
> > - Bagaimana alur dua langkah cataloging (Syft) dan matching (Grype)?
> > - Apa beda Grype dan OWASP Dependency-Check?
> > - Mengapa reachability analysis penting?
> >
> > ## Reference Points
> >
> > - IF5161 — W06 Bugs, Vulnerability, Program Analysis, and Testing, "Software Supply-Chain Security" s.d. "Tools: Generating and Scanning an SBOM"
>
> > ### Mengapa Supply Chain Menjadi Surface Tersendiri
> >
> > Program analysis tidak berhenti di repositori Anda: **source → dependensi (langsung dan transitif) → build system → paket/artefak → distribusi/registry → deployment → runtime**. Kode "milik Anda" sering hanya sebagian kecil dari yang dikirim, dan setiap tahap adalah titik kepercayaan yang bisa disalahgunakan. Penyerang menargetkan **mata rantai terlemah di hulu**, bukan aplikasi Anda yang diperkeras.
> >
> > | Insiden | Teknik |
> > |---|---|
> > | **SolarWinds SUNBURST (2020)** | Kompromi build system; kode jahat disisipkan pada update tepercaya |
> > | **xz-utils (CVE-2024-3094, 2024)** | Akun maintainer tepercaya dipakai menyisipkan backdoor ke library kompresi inti Linux |
> > | **Dependency confusion / typosquatting npm, PyPI** | Tak perlu bug di kode Anda sama sekali |
> >
> > ### SBOM dan SCA
> >
> > **SBOM (Software Bill of Materials)** adalah inventaris terbaca-mesin atas setiap komponen, versi, dan lisensi, ibarat "label bahan" perangkat lunak. Format standar: **SPDX** dan **CycloneDX**. **SCA (Software Composition Analysis)** mencocokkan inventaris itu dengan database kerentanan (feed CVE). Ini adalah program analysis satu lapis ke atas: menganalisis apa yang **dipakai** kode Anda.
> >
> > ```mermaid
> > flowchart LR
> >     M["Manifest, lockfile,<br/>package metadata"] --> CAT["Cataloger<br/>(Syft / cdxgen)"]
> >     CAT --> SBOM["SBOM<br/>name, version, PURL,<br/>license, hash"]
> >     SBOM --> MATCH["Matching engine<br/>(Grype)"]
> >     DB["NVD, OSV, GHSA,<br/>distro trackers, EPSS, KEV"] --> MATCH
> >     MATCH --> F["Temuan<br/>(wajib ditriase)"]
> > ```
> >
> > **Cataloging**: tanpa mengeksekusi kode, hanya mem-parse manifest (`package-lock.json`, `requirements.txt`, `pom.xml`, database `dpkg/rpm/apk`). Setiap komponen dinormalisasi menjadi **PURL** (mis. `pkg:npm/lodash@4.17.15`) agar tool hilir tidak menebak.
> >
> > **Matching (Grype)** memakai tiga strategi dari paling presisi: (1) **ecosystem matching** (nama + versi), (2) **distro matching**, (3) **CPE matching** sebagai fallback; dengan parser versi per ekosistem (semver, PEP 440).
> >
> > | Aspek | Grype | OWASP Dependency-Check |
> > |---|---|---|
> > | Matching utama | PURL / ecosystem-exact | CPE (fuzzy string) |
> > | Fallback | CPE | - |
> > | False positive | Lebih rendah | Lebih tinggi |
> >
> > ### Reachability Analysis
> >
> > "Paket rentan terpasang" **tidak sama** dengan "kode rentan benar-benar dipanggil". **evinse** (cdxgen) membangun call graph kode Anda dan memeriksa apakah fungsi rentan di dependensi **terjangkau**. Mirip dengan langkah manual taint-tracing: alat menandai, Anda mengonfirmasi eksploitabilitas.
> >
> > ```bash
> > syft dir:. -o cyclonedx-json > sbom.json
> > grype sbom:sbom.json
> > ```
> >
> > Komponen rentan telah dipaparkan sejak [[Misconfiguration, Deserialization, dan Vulnerable Components]]; pada OWASP 2021 menjadi **A06** dan **A08** ([[OWASP Top 10 2021]]).

> [!cornell] #### Summary
>
> **Supply chain** (dependensi, build, registry) adalah attack surface tersendiri, terbukti oleh SolarWinds, xz-utils, dan dependency confusion. **SBOM** (SPDX/CycloneDX) plus **SCA** (Syft → Grype) memberi visibilitas komponen dan kerentanannya, tetapi setiap temuan harus **ditriase** dan idealnya dikonfirmasi lewat **reachability analysis**.

> [!ad-libitum]- Additional Information
>
> #### SLSA dan Penandatanganan Artefak
> **SLSA** (Supply-chain Levels for Software Artifacts) mendefinisikan level jaminan build, sedangkan **Sigstore/cosign** dan *provenance attestation* memungkinkan verifikasi asal-usul artefak. Praktik penting lain: pin versi dan hash di lockfile, registry privat/mirror, dan MFA wajib bagi maintainer.
>
> #### Proyek Eksplorasi Mandiri
> 1. Hasilkan SBOM CycloneDX untuk satu proyek Anda dengan Syft, pindai dengan Grype dan Dependency-Check, lalu bandingkan false positive-nya.
> 2. Jalankan cdxgen + evinse dan catat temuan mana yang ternyata tak terjangkau.
>
> #### Bacaan Lanjutan
> - NTIA, *The Minimum Elements for an SBOM*
> - SLSA specification, OpenSSF Scorecard
