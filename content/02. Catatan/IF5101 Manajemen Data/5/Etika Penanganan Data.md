---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Etika Penanganan Data
>
> > ## Questions/Cues
> >
> > - Apa itu **data handling ethics** dan tiga konsep intinya?
> > - Apa tiga prinsip etika data (Belmont) dan prinsip keempat yang diusulkan?
> > - Apa saja contoh **risiko penanganan data yang tidak etis**?
> > - Apa peran **GDPR** dalam etika data?
> > - Bagaimana membangun **budaya data etis**, dan apa kaitannya dengan governance?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to Data Management (Slides 28-34)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 2 (Data Handling Ethics)
>
> > ### Data Handling Ethics
> >
> > Etika penanganan data berkaitan dengan cara **memperoleh, menyimpan, mengelola, menggunakan, dan membuang** data sesuai prinsip etis. Berpusat pada tiga konsep:
> >
> > - **Dampak pada manusia** (impact on people)
> > - **Potensi penyalahgunaan** (potential for misuse)
> > - **Nilai ekonomi data** (economic value of data)
> >
> > ### Prinsip Etika Data
> >
> > | Prinsip | Isi |
> > | --- | --- |
> > | **Respect for persons** | Memperlakukan manusia sesuai martabat dan otonominya; bila otonomi terbatas, perlu perlindungan ekstra |
> > | **Beneficence** | (1) jangan merugikan; (2) maksimalkan manfaat dan minimalkan kerugian |
> > | **Justice** | Perlakuan yang adil dan setara |
> > | *(usulan)* **Respect for law & public interest** | Patuh hukum dan kepentingan publik |
> >
> > ### Risiko Penanganan Data yang Tidak Etis
> >
> > - **Kebohongan lewat omisi/inklusi** titik data tertentu atau pemilihan waktu laporan.
> > - **Grafik menyesatkan**, mis. mengubah skala agar tren tampak lebih baik/buruk.
> > - **Definisi tidak jelas / perbandingan tidak valid** yang menyiratkan makna yang tidak didukung data.
> > - **Bias** dapat masuk di berbagai titik lifecycle: saat data dikumpulkan/dibuat, dipilih untuk analisis, metode analisis, dan penyajian hasil.
> > - Transformasi/integrasi yang ceroboh → risiko penanganan **tidak etis atau ilegal**.
> > - **Obfuscation / redaksi** (anonimisasi) mungkin **tidak cukup** bila aktivitas downstream dapat membuka kembali data.
> >
> > ### GDPR
> >
> > **General Data Protection Regulation** Uni Eropa menjadi contoh regulasi yang mengikat: hak subjek data (akses, penghapusan, portabilitas), dasar pemrosesan yang sah, *privacy by design*, notifikasi pelanggaran. Menunjukkan bahwa etika bergeser menjadi **kewajiban hukum**.
> >
> > ### Membangun Budaya Data Etis
> >
> > ```mermaid
> > flowchart LR
> >     A["1. Tinjau praktik<br/>penanganan data saat ini"] --> B["2. Identifikasi prinsip,<br/>praktik, faktor risiko"]
> >     B --> C["3. Buat strategi &amp;<br/>roadmap etis"]
> >     C --> D["4. Adopsi model risiko<br/>etis yang bertanggung jawab sosial"]
> > ```
> >
> > ### Etika dan Governance
> >
> > **Data governance** adalah alat vital memastikan prinsip etika dipertimbangkan: memutuskan **siapa boleh melakukan apa terhadap data apa**, dan **dalam kondisi apa** pemrosesan layak. Praktisi harus mempertimbangkan **dampak dan risiko etis** bagi semua stakeholder; governance menetapkan **standar, kebijakan, dan pengawasan** praktik penanganan data.

> [!cornell] #### Summary
>
> **Data handling ethics** menyangkut perolehan, penyimpanan, pengelolaan, penggunaan, dan pembuangan data secara etis, berpusat pada **dampak pada manusia, potensi penyalahgunaan, dan nilai ekonomi**. Prinsip: **respect for persons, beneficence, justice** (+ respect for law). Risiko: omisi/inklusi data, grafik menyesatkan, definisi kabur, **bias** sepanjang lifecycle, integrasi ceroboh, dan anonimisasi yang lemah. **GDPR** menjadikan etika kewajiban hukum. Budaya etis dibangun lewat tinjauan praktik → prinsip & risiko → strategi → model risiko etis, dan ditegakkan oleh **data governance**.

> [!ad-libitum]- Additional Information
>
> #### Kondisi lokal: UU PDP
>
> Di Indonesia, **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)** berperan serupa GDPR: hak subjek data, kewajiban pengendali & prosesor data, dan sanksi.
>
> #### Re-identifikasi
>
> Dataset "anonim" bisa di-re-identifikasi dengan menggabungkan quasi-identifier (kasus Netflix Prize, AOL search logs). Konsep **k-anonymity** dan **differential privacy** dipakai untuk mitigasi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Cari satu infografik/chart menyesatkan di berita, jelaskan teknik manipulasinya dan versi yang jujur.
> 2. Audit satu aplikasi yang Anda pakai terhadap prinsip respect for persons / beneficence / justice.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 2.
> - The Belmont Report (1979).
> - Regulation (EU) 2016/679 (GDPR); UU No. 27/2022 (PDP).
