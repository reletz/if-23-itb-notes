---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Release Engineering and Blast Radius
>
> > ## Questions/Cues
> >
> > - Apa itu Release Engineering dan apa bedanya dengan sekadar menjalankan skrip deploy?
> > - Apa tiga tenet inti menurut Google SRE?
> > - Apa itu blast radius dan bagaimana mengurangi dampaknya?
> > - Bagaimana urutan evolusi strategi deployment?
> >
> > ## Reference Points
> >
> > - IF4054 Release Engineering & Progressive Delivery (Slides 2-6)
>
> > ### Learning Outcomes
> >
> > Memahami Release Engineering sebagai disiplin tersendiri, menganalisis **blast radius** dan mitigasi risiko, membedakan model progressive delivery, dan **memisahkan deployment dari release**. Referensi utama: *Site Reliability Engineering* Bab 8 dan *The SRE Workbook* Bab 14.
> >
> > ### Apa Itu Release Engineering?
> >
> > Bukan sekadar "menjalankan skrip deployment". Ia adalah **disiplin rekayasa tersendiri** yang berfokus pada pengiriman kode secara aman. Tenet inti (GSRE Bab 8):
> >
> > - **Pemisahan tegas** antara **Build, Test, dan Release**.
> > - **Kecepatan tinggi tanpa mengorbankan stabilitas**.
> > - Memperlakukan **release pipeline sebagai produk**.
> >
> > ### Masalah Inti: Blast Radius
> >
> > Setiap deployment membawa risiko. **Blast radius** adalah **jumlah pengguna atau sistem yang terdampak** bila deployment gagal. Tujuan Release Engineering: meminimalkan blast radius dan **time-to-recovery (MTTR)**. Pertanyaan pemantik slide: jika bug memengaruhi 100% pengguna, berapa blast radius-nya, dan bagaimana menguranginya? Jawabannya: dengan mengekspos versi baru **bertahap** dan dapat dibatalkan cepat.
> >
> > ### Evolusi Strategi Deployment
> >
> > ```mermaid
> > flowchart TD
> >     BB["Big Bang<br/>all-at-once<br/>risiko tinggi"] --> RU["Rolling Update<br/>default modern"]
> >     RU --> BG["Blue-Green<br/>switch instan"]
> >     BG --> CA["Canary<br/>paparan bertahap,<br/>berbasis metrik"]
> > ```

> [!cornell] #### Summary
>
> **Release Engineering** adalah disiplin rekayasa untuk mengirim kode secara aman: memisahkan **build, test, release**, menjaga kecepatan tanpa mengorbankan stabilitas, dan memperlakukan **pipeline sebagai produk**. Masalah intinya adalah **blast radius** — jumlah pengguna terdampak bila deployment gagal — sehingga tujuannya menekan blast radius dan MTTR. Strategi berevolusi dari **big bang → rolling → blue-green → canary** dengan risiko yang makin terkendali.

> [!ad-libitum]- Additional Information
>
> #### Hermetic Builds
>
> Bab 8 SRE Book juga menekankan **hermetic build** (build tidak bergantung pada tool atau library host) dan **versi yang dapat dilacak** — fondasi artefak immutable yang dibahas pada materi CI.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih satu rilis terakhir proyek Anda dan hitung blast radius serta waktu pemulihan seandainya gagal; strategi apa yang akan menurunkannya?
>
> #### Bacaan Lanjutan
> - Google — *Site Reliability Engineering*, Bab 8 (*Release Engineering*).
> - Google — *The SRE Workbook*, Bab 14.
