---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Security Control, Countermeasure, dan Manajemen Risiko
>
> > ## Questions/Cues
> >
> > - Apa lima cara mengendalikan sebuah threat?
> > - Mengapa countermeasure bisa menimbulkan vulnerability baru?
> > - Bagaimana risiko didefinisikan dan dikelola?
> > - Kapan sebuah security control dianggap "cukup" dan sesuai?
> >
> > ## Reference Points
> >
> > - IF4033 Security Foundation (Slides 49-58)
> > - IF4033 Security Concepts (Slides 27-37)
>
> > ### Lima Cara Mengendalikan Threat
> >
> > Sebuah security control dapat bertujuan untuk:
> >
> > - **Prevent**: memblokir serangan atau menutup vulnerability.
> > - **Deter**: membuat serangan lebih sulit, tetapi tidak mustahil.
> > - **Deflect**: membuat target lain lebih menarik (atau target ini kurang menarik), misalnya *honeypot*.
> > - **Detect**: mengetahui serangan saat terjadi atau sesudahnya.
> > - **Recover**: pulih dari dampaknya.
> >
> > Countermeasure juga bisa **non-IT**: keamanan fisik gedung, penyaringan personel, kerangka hukum untuk menjerakan pelaku, dan pelatihan karyawan.
> >
> > ### Countermeasure Dapat Menimbulkan Vulnerability Baru
> >
> > - Mengunci akun setelah **tiga kali login gagal** menahan brute force, tetapi membuka celah **DoS**: penyerang sengaja mengunci akun korban.
> > - Control berbasis software baru bisa mengandung bug sehingga **tidak efektif** atau malah **menambah kelemahan**. Contoh: worm **Witty** (Maret 2004) mengeksploitasi software keamanan ISS.
> >
> > ### Pendekatan Risiko
> >
> > Berdasarkan ISO Guide 73, **risiko** adalah kombinasi **probabilitas** suatu kejadian dan **konsekuensi negatifnya**. Control mengurangi risiko tetapi punya **biaya** dan bisa mengurangi fungsionalitas atau kenyamanan. Solusi ideal **meminimalkan risiko pada biaya yang dapat diterima** pelanggan, dan penilaiannya sangat subjektif (contoh: ISO 27005). Karena itu dilakukan *trade-off analysis*.
> >
> > ### Proses Risk Management
> >
> > ```mermaid
> > flowchart LR
> >     RA["Risk Assessment<br/>identify, describe,<br/>estimate, evaluate"] --> RT["Risk Treatment<br/>pilih perlakuan"]
> >     RT --> RC["Risk Acceptance<br/>evaluasi residual risk"]
> >     RC --> CM["Risk Communication<br/>ke seluruh organisasi"]
> >     CM -.-> RA
> > ```
> >
> > Kerangka pengelolaannya antara lain **ISO/IEC 27001**, dengan tujuan menjaga keamanan informasi pada tingkat yang dapat diterima.
> >
> > ### Control yang Tepat
> >
> > Control yang baik **terjangkau**, **proporsional terhadap threat**, dan **meminimalkan gangguan** bagi pengguna sah. Control yang rapuh, merepotkan, dan tidak efektif cenderung dilewati pengguna (mis. password ditempel di monitor). Hindari rasa aman palsu seperti "saya aman karena firewall terbaik": banyak jalan menuju Roma, dan sistem sekuat mata rantai terlemahnya.

> [!cornell] #### Summary
>
> Threat dikendalikan dengan **prevent, deter, deflect, detect, dan recover**, baik lewat IT maupun non-IT. Countermeasure dapat **melahirkan vulnerability baru** (account lockout memicu DoS; software keamanan yang ber-bug seperti pada worm Witty). **Risiko** = probabilitas × konsekuensi negatif; tujuan manajemen risiko (assessment, treatment, acceptance, communication) adalah menekan risiko ke **tingkat yang dapat diterima dengan biaya wajar**, memakai control yang terjangkau, proporsional, dan minim gangguan.

> [!ad-libitum]- Additional Information
>
> #### Opsi Risk Treatment
>
> Empat opsi standar: **mitigate** (kurangi), **transfer** (asuransi/outsourcing), **avoid** (hapus aktivitas), dan **accept** (terima risiko residual). Risiko kuantitatif sering dihitung dengan *Annualized Loss Expectancy* (ALE = SLE × ARO).
>
> #### Proyek Eksplorasi Mandiri
> 1. Susun *risk register* sederhana (10 risiko) untuk sebuah aplikasi kampus, lengkap dengan likelihood, impact, dan treatment.
>
> #### Bacaan Lanjutan
> - ISO/IEC 27005 *Information security risk management*.
> - NIST SP 800-30 *Guide for Conducting Risk Assessments*.
