---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] MLOps Maturity Levels 0 to 2
>
> > ## Questions/Cues
> >
> > - Apa ciri MLOps level 0 (manual)?
> > - Apa yang berubah pada level 1 (ML pipeline automation)?
> > - Apa tambahan pada level 2 (CI/CD pipeline automation)?
> > - Mengapa tingkat otomasi menentukan kemampuan beradaptasi?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps to MLOps + DataOps (Slides 13-15)
>
> > ### Tiga Level Kematangan
> >
> > Slide mengikuti model kematangan MLOps dari Google Cloud. Semakin tinggi level, semakin sedikit langkah manual dan semakin cepat model diperbarui.
> >
> > | Level | Nama | Ciri utama |
> > |---|---|---|
> > | **0** | Manual | Proses manual dan berbasis skrip, **tanpa CI/CD**, ML dan operations **terputus**, rilis jarang, tanpa monitoring performa aktif |
> > | **1** | ML pipeline automation | Pelatihan model **diotomasi sebagai pipeline**, sehingga model dapat dilatih ulang secara kontinu |
> > | **2** | CI/CD pipeline automation | Pipeline itu sendiri dibangun, diuji, dan di-deploy otomatis lewat **CI/CD** |
> >
> >
> > ### Level 0: Manual
> >
> > Data scientist menyerahkan model hasil notebook kepada engineer untuk di-deploy. Karena **disconnection antara ML dan operations**, rilis jarang, dan tidak ada pemantauan aktif sehingga degradasi model sulit terdeteksi.
> >
> > ### Level 1: Otomasi Pipeline ML
> >
> > Langkah-langkah (data validation, training, evaluasi, validasi model) dirangkai menjadi pipeline sehingga **continuous training** dimungkinkan ketika data baru atau drift terdeteksi.
> >
> > ### Level 2: Otomasi CI/CD
> >
> > Kode pipeline, komponen, dan model melewati **build, test, dan deploy otomatis**. Tim dapat bereksperimen cepat dengan ide baru dan merilisnya dengan aman.

> [!cornell] #### Summary
>
> **MLOps level 0** manual dan berbasis skrip tanpa CI/CD (ML terputus dari operations, rilis jarang, tanpa monitoring). **Level 1** mengotomasi **pipeline ML** sehingga model dapat dilatih ulang terus-menerus. **Level 2** menambahkan **otomasi CI/CD pada pipeline** itu sendiri. Makin tinggi level, makin cepat dan andal model diperbarui dalam menghadapi drift.

> [!ad-libitum]- Additional Information
>
> #### Continuous Training (CT)
>
> Selain CI dan CD, MLOps memperkenalkan **CT** — pelatihan ulang otomatis ketika terdeteksi drift atau data baru. CT adalah elemen yang membedakan MLOps level 1 ke atas.
>
> #### Proyek Eksplorasi Mandiri
> 1. Nilai proyek ML yang pernah Anda kerjakan: ia berada di level mana? Apa satu langkah otomasi yang akan menaikkannya?
>
> #### Bacaan Lanjutan
> - Google Cloud Architecture Center — *MLOps: Continuous delivery and automation pipelines in machine learning*.
