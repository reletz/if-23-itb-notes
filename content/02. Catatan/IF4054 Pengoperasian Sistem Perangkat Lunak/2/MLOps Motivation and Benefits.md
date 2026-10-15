---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] MLOps Motivation and Benefits
>
> > ## Questions/Cues
> >
> > - Apa yang membedakan perangkat lunak berbasis ML dari perangkat lunak biasa?
> > - Mengapa membangun model saja tidak cukup?
> > - Apa motivasi dan manfaat MLOps?
> > - Apa hubungan MLOps dengan DevOps?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps to MLOps + DataOps (Slides 2-8)
>
> > ### Karakteristik Perangkat Lunak Berbasis ML
> >
> > Sistem ML punya ciri khusus yang tidak ada pada software konvensional:
> >
> > - **Data dependency** — bergantung pada ingestion, kualitas, konsistensi, dan sensitivitas data.
> > - **Model drift** — performa menurun seiring waktu sehingga perlu **monitoring** dan **retraining** berkala.
> > - **Experimental & interaction** — banyak eksperimen, sehingga **versi model** perlu dikontrol dan dilacak.
> > - **Specialized tools & techniques** — dan perlu integrasi dengan tim data science.
> > - **Model performance** — butuh evaluasi kontinu dan *feedback loop*.
> >
> > ### Motivasi MLOps
> >
> > Membawa model ke dunia nyata **lebih dari sekadar membangunnya**. Notebook yang akurat belum tentu bisa di-deploy, dipantau, dan diperbarui secara andal. Motivasi MLOps:
> >
> > - **Accelerated time to market**
> > - **Improved model performance**
> > - **Enhanced collaboration** (data scientist, engineer, ops)
> > - **Reduced risk**
> > - **Scalability**
> >
> > ### Manfaat
> >
> > **Increased efficiency**, **improved model reliability**, **enhanced governance**, **cost reduction**, dan **competitive advantage**.
> >
> > ### Posisi MLOps terhadap DevOps
> >
> > **DevOps : Software Engineering = MLOps : Machine Learning Engineering.** MLOps berarti mengembangkan, menguji, men-deploy, memonitor, dan mengoperasikan sistem ML dengan **prinsip dan praktik DevOps**, serta sama-sama bergantung pada **integrasi dan otomasi**.
> >
> > ### Tugas dalam MLOps
> >
> > - **Data**: mengumpulkan, memproses data mentah, analisis, persiapan.
> > - **Model**: pengembangan, *serving*, pemantauan kesehatan model.
> > - **Orchestration and governance**.

> [!cornell] #### Summary
>
> Sistem ML bergantung pada **data**, mengalami **model drift**, penuh eksperimen, dan butuh evaluasi kontinu, sehingga membangun model saja tidak cukup. **MLOps** menerapkan prinsip **DevOps** pada siklus hidup ML (develop, test, deploy, monitor, operate). Manfaatnya: **time-to-market lebih cepat, performa dan reliabilitas model lebih baik, kolaborasi lebih baik, risiko dan biaya lebih rendah, governance lebih kuat, serta skalabilitas**. Tugas MLOps mencakup **data, model, dan orchestration/governance**.

> [!ad-libitum]- Additional Information
>
> #### Technical Debt pada Sistem ML
>
> Makalah Sculley dkk. *Hidden Technical Debt in Machine Learning Systems* menunjukkan bahwa kode model hanya sebagian kecil dari sistem ML; sisanya data pipeline, konfigurasi, serving, dan monitoring. Ini alasan MLOps dibutuhkan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil model sederhana (mis. klasifikasi scikit-learn), lalu catat apa saja yang perlu dilacak agar hasilnya reproducible: data, parameter, kode, dan lingkungan.
>
> #### Bacaan Lanjutan
> - Sculley dkk. (2015) — *Hidden Technical Debt in Machine Learning Systems*.
> - Huyen — *Designing Machine Learning Systems*.
