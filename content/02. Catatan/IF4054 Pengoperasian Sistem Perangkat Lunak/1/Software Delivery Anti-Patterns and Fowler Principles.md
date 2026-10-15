---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Software Delivery Anti-Patterns and Fowler Principles
>
> > ## Questions/Cues
> >
> > - Apa anti-pattern yang umum dalam rilis perangkat lunak?
> > - Mengapa proses build–deploy–test–release harus otomatis dan sering?
> > - Apa tiga kriteria agar feedback berguna?
> > - Apa manfaat dan delapan prinsip software delivery menurut Fowler?
> >
> > ## Reference Points
> >
> > - IF4054 X-Ops Introduction (Slides 2-7)
>
> > ### Anti-Pattern dalam Pengiriman Perangkat Lunak
> >
> > Slide membuka dengan latar belakang *common deployment pipeline* dan tiga **anti-pattern**:
> >
> > - **Deploying software manually** — langkah rilis dikerjakan tangan, bergantung pada orang tertentu.
> > - **Deploying to a production-like environment only after development is complete** — masalah lingkungan baru ketahuan di ujung proyek, saat biaya perbaikan paling mahal.
> > - **Manual configuration management of production environments** — konfigurasi server dikelola manual sehingga antar-lingkungan berbeda (*configuration drift*).
> >
> > ### Gerakan "Kita Bisa Lebih Baik"
> >
> > Solusinya bertumpu pada dua kata kunci:
> >
> > - **Automated** — jika proses build, deploy, test, dan release tidak diotomasi, ia **tidak repeatable**. Setiap eksekusi akan berbeda karena perubahan software, konfigurasi, lingkungan, dan proses rilis.
> > - **Frequent** — rilis yang sering membuat *delta* antar-rilis kecil, sehingga **risiko turun**, **rollback lebih mudah**, dan **feedback lebih cepat**.
> >
> > Slide juga menyinggung pertemuan 17 orang di Snowbird, Utah (2001) — lahirnya *Agile Manifesto* — sebagai konteks bahwa gerakan ini punya akar sejarah yang serupa.
> >
> > ### Feedback sebagai Motivasi
> >
> > Alasan utama melakukan semua ini adalah **feedback**. Tiga kriteria agar feedback berguna:
> >
> > 1. **Setiap perubahan**, apa pun jenisnya, harus memicu proses feedback.
> > 2. Feedback harus disampaikan **secepat mungkin**.
> > 3. Tim delivery harus **menerima dan bertindak** atas feedback tersebut.
> >
> > ### Manfaat
> >
> > **Empowering teams**, **reducing errors**, **lowering stress**, **deployment flexibility**, dan **practice makes perfect** (rilis yang sering membuat tim terlatih).
> >
> > ### Delapan Prinsip Software Delivery
> >
> > 1. Create a repeatable, reliable process for releasing software.
> > 2. **Automate almost everything.**
> > 3. **Keep everything in version control.**
> > 4. **If it hurts, do it more frequently**, and bring the pain forward.
> > 5. **Build quality in.**
> > 6. **Done means released.**
> > 7. **Everybody is responsible** for the delivery process.
> > 8. **Continuous improvement.**
> >

> [!cornell] #### Summary
>
> Menurut Fowler, rilis yang **manual, terlambat diuji di lingkungan mirip produksi, dan dikonfigurasi manual** adalah anti-pattern. Perbaikannya adalah proses yang **otomatis** (agar repeatable) dan **sering** (agar delta kecil, risiko rendah, rollback mudah, feedback cepat). Motivasi intinya adalah **feedback** yang dipicu oleh setiap perubahan, cepat, dan ditindaklanjuti. Delapan prinsip delivery — otomasi, version control untuk semuanya, "if it hurts do it more often", build quality in, done means released, tanggung jawab bersama, dan continuous improvement — menjadi fondasi DevOps.

> [!ad-libitum]- Additional Information
>
> #### Hubungan dengan Continuous Delivery
>
> Prinsip-prinsip ini bersumber dari gagasan **Continuous Delivery** (Humble & Farley). Pipeline otomatis dari commit sampai produksi adalah wujud konkret prinsip 1-3, sedangkan "bring the pain forward" mendorong integrasi dan pengujian dilakukan lebih awal (*shift-left*, dibahas di materi CI).
>
> #### Proyek Eksplorasi Mandiri
> 1. Tuliskan langkah rilis proyek kuliah Anda (dari commit hingga bisa diakses pengguna). Tandai langkah mana yang masih manual dan seberapa sering gagal.
> 2. Pilih satu langkah manual, lalu rancang cara mengotomasinya (skrip, CI job, atau tool lain).
>
> #### Bacaan Lanjutan
> - Humble & Farley — *Continuous Delivery* (2010).
> - Martin Fowler — artikel "Continuous Delivery" di martinfowler.com.
