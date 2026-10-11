---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Dasar Digital Forensics dan Aktivitas Investigasi
>
> > ## Questions/Cues
> >
> > - Apa definisi Digital Forensic Science menurut DFRWS?
> > - Apa tujuan computer forensics dan bedanya dengan incident response?
> > - Apa aktivitas utama dalam sebuah investigasi?
> > - Siapa saja pengguna computer forensics dan apa fokus utamanya?
> >
> > ## Reference Points
> >
> > - IF4033 Computer Forensics (Slides 2-8)
> > - IF4033 Computer Forensics (Slides 14-24)
>
> > ### Digital Forensic Science (DFRWS, 2001)
> >
> > "Penggunaan metode yang secara ilmiah diturunkan dan terbukti untuk **preservasi, koleksi, validasi, identifikasi, analisis, interpretasi, dokumentasi, dan presentasi** bukti digital dari sumber digital, guna memfasilitasi atau memajukan rekonstruksi peristiwa yang terbukti kriminal, atau membantu mengantisipasi tindakan tidak sah yang mengganggu operasi terencana."
> >
> > **Computer forensics** secara ringkas: koleksi, preservasi, analisis, dan presentasi bukti terkait komputer, untuk **menentukan tindakan masa lalu** pada sebuah sistem.
> >
> > ### Tujuan: Forensik Klasik vs Incident Response
> >
> > | Aspek | Investigation (forensik) | Incident Response |
> > |---|---|---|
> > | Tujuan | Penuntutan | *Situational awareness*: root cause, strategi containment, recovery |
> > | Aktivitas kritis | Akuisisi bukti | Business continuity |
> > | Kriteria utama | Kelas bukti yang dihasilkan | Kecepatan pemulihan |
> > | Analisis | *Post-mortem* | *Live system analysis* |
> >
> > Computer forensics berupaya mengambil informasi walau telah diubah atau dihapus agar dapat dipakai memburu penyerang.
> >
> > ### Aktivitas Utama Investigasi
> >
> > ```mermaid
> > flowchart LR
> >     A["Identify &<br/>gather evidence"] --> B["Examine, analyze,<br/>& preserve"]
> >     B --> C["Chain of custody &<br/>integrity"]
> >     C --> D["Present findings"]
> > ```
> >
> > - **Identifikasi dan kumpulkan bukti**: TKP dan sumber/wadah bukti potensial.
> > - **Periksa, analisis, dan preservasi**; bangun **chain of custody** (catatan setiap bukti dipindah/disimpan ke custodian lain) dan jaga integritas.
> > - **Presentasi temuan**: interpretasi hasil, dikomunikasikan sesuai audiens, beserta alasan investigasi dan rantai bukti.
> >
> > ### Jenis Investigasi Tipikal
> >
> > Pencurian rahasia perusahaan (daftar klien/karyawan), sabotase karyawan, penipuan kartu kredit, kejahatan keuangan, penggelapan, pelecehan, pornografi anak, pencurian identitas, dan kejahatan besar lain.
> >
> > ### Pengguna Computer Forensics
> >
> > Penegak hukum (di Indonesia termasuk **PPNS**, Penyidik Pegawai Negeri Sipil; sering terkendala dana), organisasi forensik swasta, **militer** (mengidentifikasi breach atau *mole*, analisis cepat untuk intelijen), program universitas, serta profesional keamanan dan TI.
> >
> > ### Fokus Utama Forensik
> >
> > - **Attribution**: metadata dan log mengaitkan aksi dengan individu.
> > - **Alibi dan pernyataan**: dicocokkan dengan bukti digital.
> > - **Intent** (*mens rea*): membuktikan niat.
> > - **Evaluation of source**: artefak dan metadata menunjukkan asal data.
> > - **Document authentication**: metadata dokumen mudah diubah.
> >
> > Intinya, computer forensics membantu menjawab **WHO, WHAT, WHEN, WHERE** pada kejahatan atau pelanggaran berbasis komputer.

> [!cornell] #### Summary
>
> **Digital forensic science** adalah penerapan metode ilmiah untuk preservasi, koleksi, analisis, dan presentasi bukti digital. Berbeda dengan **incident response** (kecepatan pemulihan, live analysis), forensik berorientasi **penuntutan** dengan akuisisi bukti dan analisis post-mortem. Aktivitas intinya: identifikasi dan pengumpulan bukti, pemeriksaan dan preservasi dengan **chain of custody**, lalu presentasi temuan. Fokusnya attribution, alibi, intent, sumber, dan keaslian dokumen.

> [!ad-libitum]- Additional Information
>
> #### Kerangka Standar
>
> Proses ini sejalan dengan **ISO/IEC 27037** (identifikasi, koleksi, akuisisi, preservasi bukti digital) dan **NIST SP 800-86**. Di Indonesia, bukti elektronik diakui oleh UU ITE (Pasal 5).
>
> #### Proyek Eksplorasi Mandiri
> 1. Susun template formulir chain-of-custody satu halaman dan isi dengan skenario pengambilan flash drive.
>
> #### Bacaan Lanjutan
> - Carrier, B. *File System Forensic Analysis*.
> - NIST SP 800-86 *Guide to Integrating Forensic Techniques into Incident Response*.
