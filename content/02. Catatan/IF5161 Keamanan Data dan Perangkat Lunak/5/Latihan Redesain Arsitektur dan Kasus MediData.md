---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Latihan Redesain Arsitektur dan Kasus MediData
>
> > ## Questions/Cues
> >
> > - Cacat apa pada arsitektur serverless yang salah dan prinsip mana yang dilanggar?
> > - Bagaimana setiap cacat diperbaiki?
> > - Apa kondisi awal MediData Corp dan empat deliverable tugasnya?
> > - Bagaimana pendekatan sistematis dari DFD hingga trade-off?
> >
> > ## Reference Points
> >
> > - IF5161 — W04 Secure Architecture and Design Review, "Part 4: Mini Exercise", "Part 5: Major Student Exercise", dan "Summary & Next Steps"
>
> > ### Latihan Mini: Arsitektur Serverless yang Salah
> >
> > **Skenario**: arsitektur serverless tanpa API Gateway, **klien mengakses database langsung**, dan **tabel pembayaran dipakai bersama**. Tugas berpasangan 15 menit: temukan minimal tiga cacat kritis, petakan ke prinsip Saltzer & Schroeder dan CWE, redesign, presentasikan.
> >
> > | Cacat | Prinsip dilanggar | Perbaikan |
> > |---|---|---|
> > | Akses DB langsung dari klien | **Complete Mediation** | Tambah **API Gateway/BFF** |
> > | Tabel pembayaran dipakai bersama | **Separation of Privilege / Least Common Mechanism** | **Isolasi Payment DB** |
> > | Tanpa gateway | **Defense in Depth** | Tambah **WAF dan rate limiting** |
> >
> > ```mermaid
> > flowchart LR
> >     C["Client"] --> WAF["WAF + Rate Limit"] --> GW["API Gateway / BFF"]
> >     GW --> F1["Function: orders"] --> DB1[("Orders DB")]
> >     GW --> F2["Function: payment"] --> DB2[("Payment DB<br/>terisolasi")]
> > ```
> >
> > ### Tugas Besar: MediData Corp
> >
> > **Konteks**: Anda adalah Lead Security Architect penyedia data kesehatan *legacy*. **Kondisi awal**: aplikasi Java monolit on-premise; satu database PostgreSQL bersama berisi PII, PHI, dan log aplikasi; autentikasi dengan **kredensial hardcoded di file konfigurasi**; microservice baru berkomunikasi lewat **HTTP polos pada jaringan flat**.
> >
> > | Deliverable | Bobot | Isi |
> > |---|---|---|
> > | 1. Threat Model & DFD | 20% | DFD level 1 dan 2 kondisi saat ini, trust boundary, analisis STRIDE, 3 ancaman arsitektural teratas |
> > | 2. Target Architecture | 40% | Redesain dengan **Zero Trust dan cloud-native**; wajib tampil batas IAM, batas enkripsi (at rest/in transit), segmentasi/micro-segmentation, integrasi secret management |
> > | 3. Research Integration | 20% | Pilih satu paper/teknologi (eBPF, TMaaC, TLA+, TEE, PET); tulis 1–2 halaman cara ia memecahkan masalah MediData |
> > | 4. Trade-off Analysis | 20% | Minimal dua trade-off signifikan dari desain baru |
> >
> > Logistik: satu laporan PDF maksimal 10 halaman plus source diagram, individu (diskusi dengan teman dianjurkan), keterlambatan dikenai penalti 10% per hari (maksimal 3 hari).
> >
> > ### Ringkas Pelajaran Sesi
> >
> > 1. **Fondasi**: prinsip Saltzer & Schroeder bersifat abadi.
> > 2. **Teknik**: Zero Trust, service mesh, kontrol data-centric.
> > 3. **Riset**: otomasi design review, formal verification, kripto lanjut.
> > 4. **Mindset**: rancang sistem yang tangguh dan menyeimbangkan keamanan dengan tujuan bisnis.
> >
> > Sesi berikutnya melanjutkan ke identitas dan autentikasi: [[IAM, Identity Lifecycle, dan Faktor Autentikasi]].

> [!cornell] #### Summary
>
> Latihan mini memperlihatkan pemetaan **cacat → prinsip → CWE → perbaikan**: akses DB langsung (complete mediation → gateway/BFF), tabel bersama (separation of privilege → isolasi DB), tanpa gateway (defense in depth → WAF + rate limiting). Tugas **MediData** menuntut alur sistematis: **DFD dan STRIDE → arsitektur Zero Trust → integrasi riset → analisis trade-off**.

> [!ad-libitum]- Additional Information
>
> #### Kerangka Menjawab Tugas Besar
> Urutan kerja yang disarankan: (1) gambar DFD dan tandai trust boundary; (2) terapkan [[STRIDE dan Pemetaan Kontrol]] per elemen; (3) tentukan tiga ancaman teratas dengan risiko; (4) petakan kontrol ke lapisan [[Zero Trust dan Defense in Depth]]; (5) tulis residual risk dan trade-off. Ingat pelajaran W07: pindahkan secret hardcoded ke KMS/secret manager ([[Rekayasa Kriptografi Terapan]]).
>
> #### Proyek Eksplorasi Mandiri
> 1. Kerjakan versi mini MediData untuk aplikasi Anda sendiri dalam 2 halaman.
> 2. Minta teman memerankan DPO dan Security Architect untuk review ([[Secure Design Review]]).
>
> #### Bacaan Lanjutan
> - HIPAA Security Rule (sebagai pembanding regulasi data kesehatan)
> - UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
