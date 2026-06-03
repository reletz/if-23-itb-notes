---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Changeover Strategies and the Implementation Plan
>
> > ## Questions/Cues
> >
> > - Apa empat opsi utama strategi changeover?
> > - Mengapa direct changeover berisiko tinggi?
> > - Apa kelebihan dan kekurangan parallel running?
> > - Kapan pilot dan phased implementation tepat digunakan?
> > - Apa isi dari sebuah implementation plan?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 16-22)
>
> > ### Empat Opsi Changeover
> >
> > Pertimbangan penting saat merencanakan implementasi adalah cara **switch over** atau **'changeover'** ke sistem baru dari yang lama, yaitu mendeploy sistem baru ke dalam operasi. Terdapat **empat opsi utama** untuk changeover:
> >
> > 1. **Direct changeover** atau **'big bang'**
> > 2. **Parallel running**
> > 3. **Pilot implementation**
> > 4. **Phased implementation**
> >
> > ### Direct Changeover ('Big Bang')
> >
> > Sistem baru langsung dijalankan dan sistem lama (atau sistem manual, jika tidak ada sistem sebelumnya) **dimatikan**. Ini berarti peralihan langsung tanpa transisi bertahap.
> >
> > **Kelebihan**: ada **'clean break'** dari sistem lama ke baru; pengguna terpaksa langsung menggunakan sistem baru; **lebih murah (less expensive)**.
> >
> > **Kekurangan**: **risiko tinggi** karena tidak ada fall back; dapat menimbulkan **kerusakan reputasi (reputational damage)** bagi organisasi jika gagal.
> >
> > ### Parallel Running
> >
> > Sistem lama dan baru **dioperasikan berdampingan** (side by side) hingga organisasi yakin sistem baru beroperasi memuaskan, lalu sistem lama dimatikan.
> >
> > **Kelebihan**: **risiko lebih rendah** dari direct changeover; jika sistem baru gagal, sistem lama menjadi **fallback**; pengguna dapat bertransisi secara bertahap; data sistem baru dapat **dibandingkan** dengan sistem lama untuk validasi.
> >
> > **Kekurangan**: **lebih mahal** dari direct changeover (menjalankan dua sistem sekaligus); pengguna mungkin **enggan** pindah ke sistem baru.
> >
> > ### Pilot Implementation
> >
> > Sistem baru awalnya diimplementasikan di **satu atau beberapa site**, atau dengan **subset pengguna**, alih-alih ke seluruh organisasi sekaligus.
> >
> > **Kelebihan**: **risiko lebih rendah**; sistem baru hanya di-deploy ke seluruh organisasi setelah lebih stabil dan masalah besar tereliminasi; penggunaan operasional saat pilot memungkinkan sistem **di-'tune'** agar lebih efektif; **lebih murah** menyelesaikan error pada lingkup pilot.
> >
> > **Kekurangan**: area pilot mungkin **tidak representatif** terhadap pengguna dan site secara keseluruhan; jika pengalaman pengguna saat pilot buruk, dapat **merusak kepercayaan** terhadap sistem baru.
> >
> > ### Phased Implementation
> >
> > Fungsionalitas sistem baru di-deploy **dalam tahapan/inkremen**: fase pertama menyebarkan subset fungsionalitas, lalu komponen tambahan ditambahkan di tahap berikutnya hingga sistem beroperasi penuh.
> >
> > **Kelebihan**: requirement prioritas tinggi dapat dikirim lebih cepat; risiko berkurang; pengguna bertransisi bertahap dan membangun kepercayaan; lebih mudah **fall back** ke fase sebelumnya jika ada masalah.
> >
> > **Kekurangan**: pengguna mungkin **kehilangan minat** setelah fitur prioritasnya terkirim; mungkin tidak mengadopsi fase awal jika hanya tertarik fitur fase akhir; bisa **mahal**; pengguna mungkin **berpegang** pada sistem lama dan cara kerja lama.
> >
> > ```mermaid
> > flowchart TB
> >     DIR["Direct / Big Bang<br/>lama OFF, baru ON sekaligus<br/>risiko TINGGI, murah, no fallback"]
> >     PAR["Parallel Running<br/>lama + baru jalan berdampingan<br/>risiko RENDAH, ada fallback, mahal"]
> >     PIL["Pilot<br/>baru di subset site/pengguna dulu<br/>risiko RENDAH, bisa di-tune, mungkin tak representatif"]
> >     PHA["Phased<br/>fungsionalitas di-deploy bertahap<br/>prioritas cepat, fallback per fase, minat bisa turun"]
> >     CO(["Changeover<br/>lama → baru"]) --> DIR
> >     CO --> PAR
> >     CO --> PIL
> >     CO --> PHA
> > ```
> >
> > ### The Implementation Plan
> >
> > **Implementation plan** adalah dokumen kunci dalam SDLC, digunakan oleh semua pihak yang terlibat untuk memastikan seluruh langkah **terperinci, dipahami, dan layak (feasible)**. Dokumen ini juga menyatakan tindakan apa yang harus diikuti untuk **memvalidasi** keberhasilan implementasi, serta tindakan dan **eskalasi** apa yang dipicu saat terjadi masalah.
> >
> > Implementation plan tipikal mencakup: **Author and sign-offs**, **Revision history**, **Purpose**, **System overview**, **Stakeholders**, **Points of contact**, **Implementation schedule**, **Entry criteria**, dan **Exit criteria**.

> [!cornell] #### Summary
>
> Terdapat **empat opsi changeover**. **Direct changeover (big bang)** langsung mengganti sistem lama: murah dan clean break, tetapi berisiko tinggi tanpa fallback. **Parallel running** menjalankan dua sistem berdampingan: risiko rendah dengan fallback dan validasi data, tetapi mahal. **Pilot implementation** menerapkan ke subset site/pengguna dulu: risiko rendah dan dapat di-tune, tetapi area pilot bisa tidak representatif. **Phased implementation** men-deploy fungsionalitas bertahap: prioritas tinggi cepat terkirim dan risiko berkurang, tetapi bisa mahal dan minat pengguna menurun. **Implementation plan** adalah dokumen kunci berisi sign-off, revision history, purpose, system overview, stakeholders, points of contact, schedule, serta entry dan exit criteria.

> [!ad-libitum]- Additional Information
>
> #### Memilih Strategi Changeover
>
> Faktor pemilihan: tingkat **kritikalitas sistem**, toleransi risiko organisasi, anggaran, ukuran basis pengguna, dan kompleksitas. Sistem mission-critical (perbankan, kesehatan) cenderung menghindari big bang dan memilih parallel/pilot/phased.
>
> #### Entry vs Exit Criteria
>
> - **Entry criteria**: kondisi yang harus terpenuhi sebelum changeover dimulai (testing selesai, sign-off sponsor, data siap, backup tersedia).
> - **Exit criteria**: kondisi yang menandakan changeover berhasil (sistem stabil, KPI terpenuhi, tidak ada critical defect).
>
> #### Rollback dan Go/No-Go
>
> Setiap rencana harus memiliki **rollback plan** dan checkpoint **go/no-go** sebelum titik tanpa kembali (point of no return).
>
> #### Self-Exploration Projects
>
> 1. Buat decision matrix membandingkan 4 strategi changeover untuk sistem e-commerce vs sistem internal HR.
> 2. Susun implementation plan lengkap (template 9 bagian) untuk go-live aplikasi mobile banking.
> 3. Analisis kegagalan big bang nyata dan usulkan strategi alternatif yang lebih aman.
>
> #### Tools dan Resources
>
> - Planning: Microsoft Project, Smartsheet, Jira
> - Deployment: feature flags (LaunchDarkly), blue-green deployment, canary release
> - Kerangka: ITIL Change Management, PMBOK
>
> #### Further Reading
>
> - BCS, *Business Analysis* — System Implementation
> - "Continuous Delivery" oleh Jez Humble (blue-green & canary)
> - ITIL 4: Change Enablement
