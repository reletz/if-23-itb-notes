---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] MLOps Flow - Development, Serving and Monitoring
>
> > ## Questions/Cues
> >
> > - Apa saja tahapan dalam alur MLOps?
> > - Apa isi tahap model development?
> > - Bagaimana model yang sudah divalidasi disajikan (serving)?
> > - Mengapa monitoring memicu iterasi baru?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps to MLOps + DataOps (Slides 9-12)
>
> > ### Alur MLOps
> >
> > Alur MLOps bersifat **siklus**: data disiapkan, model dikembangkan, divalidasi, di-deploy, lalu dimonitor; hasil monitoring dapat memicu iterasi baru.
> >
> > ```mermaid
> > flowchart TD
> >     D["Data<br/>gathering and prep"] --> M["Model<br/>development"]
> >     M --> V["Validation"]
> >     V --> S["Deployment<br/>and serving"]
> >     S --> MO["Monitoring"]
> >     MO -->|"drift atau<br/>performa turun"| D
> > ```
> >
> > ### Model Development
> >
> > Tujuh langkah pada slide:
> >
> > 1. **Establish business objectives** — tentukan masalah bisnis dan metrik keberhasilan.
> > 2. **Data sources** — identifikasi dan akses sumber data.
> > 3. **Exploratory Data Analysis (EDA)** — pahami distribusi dan kualitas data.
> > 4. **Feature engineering and selection**.
> > 5. **Training and evaluation**.
> > 6. **Validation** — uji pada data yang belum pernah dilihat.
> > 7. **Reproducibility** — hasil harus dapat diulang (data, kode, parameter, lingkungan).
> >
> > ### Deployment and Serving
> >
> > Model tervalidasi di-deploy ke lingkungan target. Opsi pada slide:
> >
> > - **Microservice dengan REST API** untuk prediksi online.
> > - **Embedded model** pada perangkat edge atau mobile.
> > - Bagian dari **batch prediction system**.
> >
> > ### Monitoring
> >
> > Performa model dipantau terus-menerus; penurunan performa (mis. akibat **drift**) dapat memicu **iterasi baru** pada proses ML.

> [!cornell] #### Summary
>
> Alur MLOps adalah **siklus**: persiapan data → **model development** (tujuan bisnis, sumber data, EDA, feature engineering, training/evaluasi, validasi, reproducibility) → **deployment dan serving** (REST microservice, embedded edge/mobile, atau batch) → **monitoring** yang dapat memicu iterasi baru. **Reproducibility** dan monitoring terhadap drift adalah pembeda utama dari DevOps biasa.

> [!ad-libitum]- Additional Information
>
> #### Jenis Drift
>
> **Data drift** (distribusi input berubah) dan **concept drift** (hubungan input-output berubah) adalah dua pemicu retraining yang umum. Deteksinya biasanya memakai uji statistik pada distribusi fitur dan pemantauan metrik performa.
>
> #### Proyek Eksplorasi Mandiri
> 1. Sajikan model sederhana sebagai REST API (FastAPI) dalam container, lalu catat latensi dan input yang dilihatnya sebagai bahan monitoring.
>
> #### Bacaan Lanjutan
> - Google Cloud — *MLOps: Continuous delivery and automation pipelines in machine learning*.
