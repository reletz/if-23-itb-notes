---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Continuous Integration and the Shift-Left Cost Curve
>
> > ## Questions/Cues
> >
> > - Apa itu Continuous Integration dan pertanyaan apa yang dijawabnya?
> > - Mengapa defect yang ditemukan belakangan jauh lebih mahal?
> > - Apa arti shift-left dan cek apa yang dipindah ke awal?
> > - Di mana posisi CI dalam delivery lifecycle?
> >
> > ## Reference Points
> >
> > - IF4054 CI Automation & Shift-Left (Slides 5-8)
>
> > ### Apa Itu Continuous Integration?
> >
> > **CI** adalah praktik di mana developer **menggabungkan kode ke shared trunk secara sering** (beberapa kali sehari, bukan sekali seminggu). Setiap merge **otomatis memicu build dan test suite**, tanpa perlu ada manusia yang mengingat menjalankannya. Tujuannya bukan otomasi demi otomasi, melainkan menjadikan **integrasi sebagai non-event, bukan krisis**. CI terus-menerus menjawab satu pertanyaan: *"apakah software masih berfungsi sekarang, dengan perubahan terbaru semua orang?"*
> >
> > ### Kurva Biaya Defect
> >
> > Biaya memperbaiki bug yang sama bergantung pada kapan ia ditemukan:
> >
> > | Saat ditemukan | Biaya relatif |
> > |---|---|
> > | Saat menulis kode (IDE / pre-commit) | **1x** |
> > | Setelah di-merge dan ditemukan di CI | **15x** |
> > | Setelah sampai produksi (incident, rollback, dampak ke pelanggan) | **100x+** |
> >
> > ### Shift-Left
> >
> > **Shift-left** berarti memindahkan kualitas dan keamanan **lebih awal** (ke kiri) dalam alur kerja. Pemetaan cek per tahap:
> >
> > ```mermaid
> > flowchart TD
> >     C["Code<br/>IDE lint,<br/>pre-commit hook"] --> CO["Commit<br/>unit test,<br/>SAST pada diff"]
> >     CO --> B["Build<br/>compile,<br/>dependency scan"]
> >     B --> P["Package<br/>container scan,<br/>sign artifact"]
> >     P --> D["Deploy<br/>policy check,<br/>last line of defense"]
> > ```
> >
> > ### Posisi CI dalam Lifecycle
> >
> > **Plan** (desain, tiket, branch) → **Code** (dev lokal, pre-commit) → **Integrate (CI)**: build, test, scan, package → **Release (CD)**: promosi antar-environment → **Operate**: monitor, observe, respond.

> [!cornell] #### Summary
>
> **Continuous Integration** adalah merge kode yang sering ke shared trunk dengan **build dan test otomatis** di setiap merge, sehingga integrasi menjadi non-event. Menurut **kurva biaya defect**, bug yang diperbaiki di IDE berbiaya **1x**, di CI **15x**, dan di produksi **100x+**, sehingga **shift-left** memindahkan cek kualitas dan keamanan ke tahap yang lebih awal (lint, unit test, SAST, dependency scan, container scan, policy check). CI berada di antara tahap Code dan Release (CD) pada lifecycle.

> [!ad-libitum]- Additional Information
>
> #### CI vs CD vs Continuous Deployment
>
> **Continuous Delivery** menjaga artefak selalu siap dirilis (rilis ke produksi tetap keputusan manusia), sedangkan **Continuous Deployment** merilis otomatis setiap perubahan yang lolos pipeline. CI adalah prasyarat keduanya.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pasang pre-commit hook (lint + format) di repositori Anda, lalu bandingkan berapa banyak masalah yang tertangkap sebelum push dibanding di CI.
>
> #### Bacaan Lanjutan
> - Martin Fowler — *Continuous Integration*.
> - Google — *Building Secure & Reliable Systems*, Bab 12 dan 14.
