---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Technological Advances - Cloud and MDA
>
> > ## Questions/Cues
> >
> > - Bagaimana kemajuan teknologi memberi manfaat bisnis?
> > - Apa definisi cloud computing menurut NIST?
> > - Apa perbedaan SaaS, PaaS, dan IaaS?
> > - Apa itu Model Driven Architecture (MDA)?
> > - Mengapa sinkronisasi model dan sistem itu penting?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 13-15)
>
> > ### Pengaruh Kemajuan Teknologi
> >
> > **Kemajuan teknologi memberikan peluang bagi pengembang perangkat lunak** yang memungkinkan mereka menghadirkan **manfaat bisnis yang signifikan**. Terkadang manfaat ini terwujud dalam bentuk **pengembangan solusi yang lebih murah dan lebih cepat**, sementara yang lain bersifat lebih jauh jangkauannya dan dapat benar-benar **merevolusi penyediaan solusi TI bagi seluruh industri TI**.
> >
> > Dua kemajuan teknologi yang dibahas adalah **Cloud-based** dan **Model Driven Architecture (MDA)**. Keduanya tidak sekadar mengubah cara membangun perangkat lunak, tetapi mengubah cara perangkat lunak disediakan, didistribusikan, dan dikonsumsi.
> >
> > ### Cloud Computing menurut NIST
> >
> > **NIST** mendefinisikan cloud computing sebagai **'sebuah model untuk memungkinkan akses jaringan yang nyaman dan on-demand ke shared pool dari sumber daya komputasi yang dapat dikonfigurasi [...] yang dapat dengan cepat di-provision dan dilepaskan dengan upaya manajemen atau interaksi penyedia layanan yang minimal.'**
> >
> > Inti definisi ini adalah: **on-demand** (sesuai permintaan), **shared pool** (sumber daya bersama), **rapidly provisioned and released** (cepat dialokasikan dan dilepas — elastisitas), serta **minimal management effort** (swalayan). Inilah yang membedakan cloud dari sekadar hosting tradisional: pelanggan membayar sesuai pemakaian (pay-as-you-go) dan dapat menaikkan/menurunkan kapasitas secara dinamis.
> >
> > ### Tiga Jenis Layanan Cloud: SaaS, PaaS, IaaS
> >
> > Cloud computing terdiri dari tiga jenis layanan yang terpisah:
> >
> > 1. **Software as a Service (SaaS)** — penyediaan **aplikasi** di cloud. Pelanggan langsung memakai aplikasi jadi melalui browser tanpa mengelola apa pun di baliknya. Contoh: Gmail, Salesforce, Google Workspace.
> > 2. **Platform as a Service (PaaS)** — penyediaan **layanan yang memungkinkan pelanggan men-deploy aplikasi di cloud menggunakan tools yang disediakan supplier**. Pelanggan fokus pada kode aplikasi, sementara runtime, middleware, dan OS dikelola penyedia. Contoh: Heroku, Google App Engine, Azure App Service.
> > 3. **Infrastructure as a Service (IaaS)** — penyediaan **computing power, storage, dan network capacity** yang memungkinkan pelanggan menjalankan perangkat lunak (termasuk **sistem operasi dan aplikasi**) di cloud. Pelanggan punya kendali paling besar atas infrastruktur. Contoh: Amazon EC2, Google Compute Engine.
> >
> > Analogi: IaaS seperti menyewa lahan dan bahan bangunan, PaaS seperti menyewa rumah kosong siap huni, dan SaaS seperti menginap di hotel yang serba terlayani.
> >
> > ```mermaid
> > flowchart TD
> >     S["SaaS<br/>aplikasi jadi<br/>(penyedia kelola hampir semua,<br/>pelanggan kelola data)"]
> >     P["PaaS<br/>platform deploy + tools supplier<br/>(pelanggan kelola aplikasi & data)"]
> >     I["IaaS<br/>computing, storage, network<br/>(pelanggan kelola OS ke atas)"]
> >     S --> P --> I
> > ```
> >
> > ### Model Driven Architecture (MDA)
> >
> > **Model Driven Architecture** merujuk pada sebuah pendekatan untuk **memproduksi perangkat lunak executable secara langsung dari sekumpulan design models, tanpa intervensi programmer manusia**. Dengan kata lain, model (misalnya diagram UML) bukan sekadar dokumentasi, melainkan **sumber kebenaran (single source of truth)** yang dapat ditransformasikan menjadi kode jalan secara otomatis.
> >
> > Keuntungan utama pendekatan ini, dari perspektif tim pengembangan, adalah bahwa **model dan sistem fisik yang direpresentasikannya tetap tersinkronisasi**. Masalah klasik dalam pengembangan — model/diagram yang menjadi usang karena kode berkembang terpisah — teratasi karena kode dihasilkan dari model itu sendiri. Ini meningkatkan konsistensi, mengurangi kesalahan manual, dan mempercepat adaptasi terhadap perubahan desain.
>
> [!cornell] #### Summary
>
> **Kemajuan teknologi** membuka peluang manfaat bisnis, dari solusi yang lebih murah-cepat hingga revolusi seluruh industri TI; dua contohnya adalah **Cloud** dan **MDA**. **NIST** mendefinisikan cloud sebagai akses jaringan **on-demand** ke **shared pool** sumber daya yang dapat **di-provision dan dilepas cepat** dengan manajemen minimal, terdiri atas tiga layanan: **SaaS** (aplikasi jadi), **PaaS** (platform deploy dengan tools supplier), dan **IaaS** (computing power, storage, network untuk menjalankan OS & aplikasi sendiri). **Model Driven Architecture** menghasilkan perangkat lunak **executable langsung dari design models tanpa programmer manusia**, sehingga **model dan sistem fisik tetap tersinkronisasi**.

> [!ad-libitum]- Additional Information
>
> #### Lima Karakteristik Esensial Cloud (NIST)
>
> 1. **On-demand self-service**
> 2. **Broad network access**
> 3. **Resource pooling** (multi-tenant)
> 4. **Rapid elasticity**
> 5. **Measured service** (pay-per-use)
>
> Empat model deployment NIST: **public, private, community, hybrid cloud**.
>
> #### Pembagian Tanggung Jawab (Shared Responsibility)
>
> - **IaaS**: penyedia kelola hardware/virtualisasi; pelanggan kelola OS ke atas.
> - **PaaS**: penyedia kelola hingga runtime; pelanggan kelola aplikasi & data.
> - **SaaS**: penyedia kelola hampir semuanya; pelanggan kelola data & konfigurasi.
> - Model lanjutan: **FaaS/Serverless** (mis. AWS Lambda) — eksekusi per fungsi tanpa mengelola server.
>
> #### Ekosistem MDA (OMG)
>
> MDA distandarkan oleh **OMG** dengan tiga level model:
>
> - **CIM** (Computation Independent Model) — perspektif bisnis.
> - **PIM** (Platform Independent Model) — logika tanpa teknologi.
> - **PSM** (Platform Specific Model) — terikat platform, lalu di-generate menjadi kode.
>
> Pendukung: meta-model **MOF**, **UML**, dan transformasi **QVT**. Konsep terkait: Low-Code/No-Code platforms.
>
> #### Self-Exploration Projects
>
> 1. Deploy aplikasi web yang sama pada IaaS (VM EC2) dan PaaS (Heroku), lalu bandingkan effort dan biaya.
> 2. Buat PIM sederhana dalam UML dan generate kode kerangka menggunakan tool MDA (mis. Eclipse EMF/Acceleo).
> 3. Susun analisis shared responsibility untuk skenario kebocoran data pada layanan SaaS.
>
> #### Further Reading
>
> - NIST SP 800-145 — *The NIST Definition of Cloud Computing*.
> - OMG — *MDA Guide* (revisi terbaru).
> - Armbrust, M. et al. *A View of Cloud Computing*. Communications of the ACM.
