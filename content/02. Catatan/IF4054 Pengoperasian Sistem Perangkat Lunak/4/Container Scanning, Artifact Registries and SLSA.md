---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Container Scanning, Artifact Registries and SLSA
>
> > ## Questions/Cues
> >
> > - Apa yang dipindai pada container image?
> > - Apa isi sebuah container image?
> > - Mengapa registry dan digest penting?
> > - Apa itu SLSA dan provenance?
> > - Apa isi checklist integritas build-time?
> >
> > ## Reference Points
> >
> > - IF4054 CI Automation & Shift-Left (Slides 28-32)
>
> > ### Container Image Scanning
> >
> > Memperluas pola pikir SCA ke **seluruh container**: paket OS, base image, dan setiap layer, bukan hanya dependency aplikasi. Base image yang **minimal dan ter-patch** (distroless atau slim yang aktif dirawat) memperkecil attack surface bahkan sebelum scan. Scan berjalan **setelah image dibangun tetapi sebelum di-push ke registry**, sebagai gate build-time terakhir, dengan gate severity yang sama seperti SCA (blok Critical/High, lacak Medium/Low).
> >
> > ### Isi Sebuah Container Image
> >
> > ```mermaid
> > flowchart TB
> >     A["App code<br/>source Anda"]
> >     B["App dependencies<br/>pip, npm"]
> >     C["OS packages<br/>apt, apk"]
> >     D["Runtime layer<br/>Python, Node"]
> >     E["Base OS layer<br/>Debian slim, distroless"]
> >     A --- B --- C --- D --- E
> > ```
> >
> > ### Artifact Registry dan Provenance
> >
> > - Registry hanya menyimpan **output build yang tervalidasi dan berversi**; tidak ada environment yang boleh menarik image dari tempat lain.
> > - Artefak **content-addressed** (digest, bukan tag mutable seperti `latest`), sehingga yang di-deploy persis yang dipindai.
> > - Registry menegakkan siapa yang boleh push dan pull; kredensial build **tidak boleh** punya hak deploy produksi.
> > - Kebijakan retensi dan promosi (dev-registry → prod-registry) menciptakan jejak audit.
> >
> > ### SLSA
> >
> > **Supply-chain Levels for Software Artifacts (SLSA)** adalah kerangka level integritas build yang meningkat. Intinya: **membuktikan** bahwa artefak dibangun oleh proses tepercaya yang tahan manipulasi, bukan sekadar memindai kode sekali. **Provenance metadata** mencatat sumber, pipeline, dan input yang menghasilkan artefak. Pipeline *test → scan → sign → registry* adalah on-ramp praktis menuju kepatuhan SLSA.
> >
> > ### Checklist Integritas Build-Time
> >
> > - **Code quality gate** — lint dan unit test lolos lebih dulu.
> > - **Static analysis gate** — SAST bersih dari temuan Critical/High.
> > - **Dependency gate** — SCA bersih dari CVE Critical/High yang diketahui.
> > - **Container gate** — image scan bersih sebelum push ke registry.

> [!cornell] #### Summary
>
> **Container scanning** memeriksa seluruh layer image (OS, runtime, dependency, kode) setelah build dan sebelum push, dengan gate severity yang sama seperti SCA. **Artifact registry** hanya menyimpan artefak tervalidasi yang dialamati lewat **digest** (bukan tag `latest`) dengan kontrol akses dan jejak audit. **SLSA** menaikkan integritas build lewat **provenance** yang membuktikan artefak dibangun oleh proses tepercaya. Empat gate (code quality, SAST, dependency, container) menjadi checklist integritas build-time.

> [!ad-libitum]- Additional Information
>
> #### Signing dengan Sigstore
>
> **Cosign** (Sigstore) memungkinkan penandatanganan image dan penyimpanan attestation provenance di registry; admission controller (mis. Kyverno) dapat menolak image tanpa tanda tangan valid. Ini terhubung dengan materi cluster security.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pindai image proyek Anda dengan Trivy, tulis ulang Dockerfile memakai base image distroless, lalu bandingkan jumlah temuan.
>
> #### Bacaan Lanjutan
> - slsa.dev — *Specification*.
> - Sigstore — *Cosign documentation*.
