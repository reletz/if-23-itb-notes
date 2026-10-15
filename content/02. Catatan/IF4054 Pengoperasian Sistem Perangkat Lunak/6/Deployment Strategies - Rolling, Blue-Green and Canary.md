---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Deployment Strategies - Rolling, Blue-Green and Canary
>
> > ## Questions/Cues
> >
> > - Bagaimana cara kerja rolling update, blue-green, dan canary?
> > - Apa kelebihan dan kekurangan masing-masing?
> > - Strategi mana yang cocok untuk kondisi apa?
> >
> > ## Reference Points
> >
> > - IF4054 Release Engineering & Progressive Delivery (Slides 7-13)
>
> > ### Strategi 1: Rolling Updates
> >
> > Strategi default Deployment Kubernetes: **mengganti pod lama dengan pod baru secara bertahap**.
> >
> > - **Pros**: tanpa biaya infrastruktur tambahan, zero downtime.
> > - **Cons**: **dua versi kode berjalan bersamaan**.
> > - **Keterbatasan**: sangat buruk untuk perubahan skema database yang **tidak backward-compatible**.
> >
> > ### Strategi 2: Blue-Green
> >
> > Menjaga dua lingkungan identik: **Blue** (saat ini) dan **Green** (baru). Lalu lintas dialihkan **instan** di router atau load balancer.
> >
> > - **Pros**: rollback instan, Green dapat diuji sebelum cut-over.
> > - **Cons**: butuh **kapasitas infrastruktur 2x**.
> >
> > ```mermaid
> > flowchart TD
> >     U["Users"] --> LB["Router / Load balancer"]
> >     LB -->|"100% sebelum cut-over"| BL["Blue<br/>versi saat ini"]
> >     LB -.->|"switch instan"| GR["Green<br/>versi baru, sudah diuji"]
> > ```
> >
> > ### Strategi 3: Canary
> >
> > Mengarahkan persentase kecil lalu lintas (mis. **5%**) ke versi baru, dan **menaikkannya bertahap bila metrik sehat**.
> >
> > - **Pros**: blast radius minimal, pemantauan pengguna nyata.
> > - **Cons**: butuh **observability** yang kuat dan kemampuan **traffic splitting**.
> >
> > ```mermaid
> > flowchart TD
> >     U["Users"] --> LB["Traffic splitter"]
> >     LB -->|"90-95%"| S["Stable v1"]
> >     LB -->|"5-10%"| C["Canary v2"]
> >     C --> M["Metrik<br/>error rate, latency"]
> >     M -->|"sehat: naikkan"| LB
> > ```
> >
> > ### Perbandingan
> >
> > | | Rolling | Blue-Green | Canary |
> > |---|---|---|---|
> > | Biaya infrastruktur | Tidak ada tambahan | 2x kapasitas | Sedikit tambahan |
> > | Kecepatan rollback | Sedang | Instan | Cepat (alihkan trafik) |
> > | Blast radius | Sedang | Tinggi saat cut-over (100% sekaligus) | **Minimal** |
> > | Syarat | Kompatibilitas mundur | Dua environment identik | Observability + traffic splitting |
> >
> > ### Progressive Delivery
> >
> > **Progressive Delivery** adalah **otomasi** Canary/Blue-Green yang bertumpu pada **telemetry** (metrik, log, trace). Keputusan **Go/No-Go diambil sistem, bukan manusia**. Literatur juga membahas A/B testing, ring deployment, dan dark launching.

> [!cornell] #### Summary
>
> **Rolling** mengganti pod bertahap (tanpa biaya tambahan, tetapi dua versi hidup bersamaan dan buruk untuk perubahan skema DB tak kompatibel). **Blue-Green** menjaga dua environment dan beralih instan dengan rollback seketika (biaya 2x). **Canary** mengekspos persentase kecil trafik dan menaikkannya berdasarkan metrik (blast radius minimal, butuh observability). **Progressive delivery** mengotomasi keputusan Go/No-Go lewat telemetry.

> [!ad-libitum]- Additional Information
>
> #### Expand-Contract untuk Skema Database
>
> Keterbatasan rolling update pada skema DB diatasi dengan pola **expand-contract**: tambahkan kolom baru (kompatibel) → migrasi data dan kode → hapus kolom lama pada rilis berikutnya.
>
> #### Proyek Eksplorasi Mandiri
> 1. Di cluster Kind, deploy dua versi sebuah layanan dengan Deployment berbeda di balik satu Service dan atur rasio replika untuk meniru canary kasar.
>
> #### Bacaan Lanjutan
> - Argo Rollouts Docs — *Deployment Strategies*.
> - Flagger Docs — *Deployment strategies*.
