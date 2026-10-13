---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Riset Terkini Secure Design
>
> > ## Questions/Cues
> >
> > - Apa itu Threat Modeling as Code dan bagaimana ia masuk ke pipeline DevOps?
> > - Bagaimana AI/ML dapat dan tidak dapat membantu design review?
> > - Apa kegunaan formal methods seperti TLA+?
> > - Apa itu FHE, SMPC, dan ZKP sebagai Privacy-Enhancing Technologies?
> > - Apa peran eBPF dalam penegakan runtime?
> > - Mengapa trade-off harus didokumentasikan?
> >
> > ## Reference Points
> >
> > - IF5161 — W04 Secure Architecture and Design Review, "Part 3: Recent Advances & Research Frontiers" (Research 1–5 dan "No Free Lunch")
>
> > ### Lima Frontier Riset
> >
> > | # | Topik | Konsep | Catatan praktis |
> > |---|---|---|---|
> > | 1 | **Threat Modeling as Code (TMaaC)** | Threat model ditulis sebagai kode dan diverifikasi otomatis | Alat: **pytm**, **ThreatSpec**; terintegrasi pipeline DevOps |
> > | 2 | **AI/ML dalam design review** | **LLM** mem-parse model C4 untuk menyarankan kontrol yang hilang; **GNN** menganalisis topologi untuk propagasi kerentanan | Wajib **Human-in-the-Loop** agar tak terjadi halusinasi |
> > | 3 | **Formal methods (TLA+)** | Membuktikan properti keamanan secara matematis | Konsensus terdistribusi, verifikasi kebijakan IAM; **AWS memakainya untuk S3 dan DynamoDB** |
> > | 4 | **Privacy-Enhancing Technologies** | **FHE** (komputasi pada data terenkripsi), **SMPC** (analisis kolaboratif tanpa berbagi data), **ZKP** (membuktikan fakta tanpa membuka data) | Mengurangi kebutuhan mempercayai pemroses data |
> > | 5 | **eBPF** | Program tersandbox di kernel Linux | Observability mendalam dan **PEP dinamis**; alat: **Cilium, Tetragon** |
> >
> > ```mermaid
> > flowchart LR
> >     D["Design"] --> TM["TMaaC<br/>pytm / ThreatSpec"]
> >     TM --> AI["AI-assisted review<br/>(HITL)"]
> >     AI --> FM["Formal verification<br/>(TLA+)"]
> >     FM --> RT["Runtime enforcement<br/>(eBPF: Cilium, Tetragon)"]
> >     PET["PETs: FHE, SMPC, ZKP"] -.melindungi data di semua tahap.-> D
> > ```
> >
> > ### "No Free Lunch" dalam Keamanan
> >
> > Setiap kontrol menambah biaya: latensi (enkripsi, mTLS), kompleksitas operasional, atau pengalaman pengguna. Tidak ada desain yang unggul di keamanan, performa, usability, dan biaya sekaligus. Deliverable tingkat magister: **selalu dokumentasikan residual risk yang diterima** ketika trade-off memilih performa atau biaya.

> [!cornell] #### Summary
>
> Lima frontier: **TMaaC** (threat model sebagai kode di pipeline), **AI/ML** untuk design review (selalu dengan human-in-the-loop), **formal methods/TLA+** untuk bukti properti, **PET** (FHE, SMPC, ZKP) untuk privasi, dan **eBPF** untuk penegakan runtime. Semuanya tunduk pada prinsip **no free lunch**: trade-off keamanan vs performa/biaya harus dicatat beserta residual risk yang diterima.

> [!ad-libitum]- Additional Information
>
> #### Memilih Teknologi
> Aturan praktis: gunakan **TMaaC** bila tim sudah matang di CI/CD; **TLA+** untuk protokol dan kebijakan kritis berbiaya kesalahan tinggi; **FHE/ZKP** hanya saat model ancaman memang tidak mempercayai pemroses karena overhead komputasinya besar; **eBPF** saat butuh observability tanpa mengubah aplikasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis model pytm untuk aplikasi 3-tier sederhana dan hasilkan DFD serta daftar ancaman otomatis.
> 2. Tulis spesifikasi TLA+ kecil (mis. mutual exclusion) dan jalankan model checker TLC.
>
> #### Bacaan Lanjutan
> - Newcombe et al., *How Amazon Web Services Uses Formal Methods*
> - Dokumentasi pytm dan Cilium Tetragon
