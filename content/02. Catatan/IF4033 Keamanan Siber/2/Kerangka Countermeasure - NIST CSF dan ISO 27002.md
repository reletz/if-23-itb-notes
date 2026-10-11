---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Kerangka Countermeasure - NIST CSF dan ISO 27002
>
> > ## Questions/Cues
> >
> > - Apa lima core function dalam NIST Cybersecurity Framework?
> > - Apa saja empat kategori control pada ISO/IEC 27002:2022?
> > - Apa contoh control pada tiap kategori?
> > - Mengapa countermeasure tidak cukup berupa IT saja?
> >
> > ## Reference Points
> >
> > - IF4033 Security Countermeasure (Slides 12-21)
>
> > ### Sifat Security Control
> >
> > Sebuah control dapat **prevent, deter, deflect, detect, atau recover** (lihat [[Security Control, Countermeasure, dan Manajemen Risiko]]). Countermeasure juga tidak hanya IT, tetapi mencakup aspek **fisik, personel, hukum, pelatihan, dan organisasi/administratif**. Bahkan, countermeasure sendiri dapat menambah *attack surface*.
> >
> > ### NIST CSF: Cyber Security Core Function
> >
> > | Function | Makna |
> > |---|---|
> > | **Identify** | Mengidentifikasi aset kritis, proses bisnis, dan potensi threat |
> > | **Protect** | Menerapkan control untuk melindungi aset dan data |
> > | **Detect** | Mendeteksi insiden dan anomali |
> > | **Respond** | Rencana untuk merespons insiden secara efektif |
> > | **Recover** | Memulihkan operasi dan sistem setelah insiden |
> >
> > ```mermaid
> > flowchart LR
> >     I["Identify"] --> P["Protect"] --> D["Detect"] --> R["Respond"] --> RC["Recover"]
> >     RC -.-> I
> > ```
> >
> > ### ISO/IEC 27002:2022: Empat Kategori Control
> >
> > | Kategori | Cakupan (contoh) |
> > |---|---|
> > | **5. Organizational** (37 control) | Kebijakan keamanan, peran dan tanggung jawab, *segregation of duties*, threat intelligence, klasifikasi dan pelabelan informasi, access control, identity management, hubungan dengan supplier, **keamanan layanan cloud (5.23)**, manajemen insiden, pengumpulan bukti (5.28), business continuity, kepatuhan hukum, privasi dan PII |
> > | **6. People** (8 control) | Screening, syarat kerja, awareness dan pelatihan, proses disiplin, tanggung jawab setelah resign, NDA, remote working, pelaporan event |
> > | **7. Physical** (14 control) | Perimeter fisik, entry control, pengamanan ruangan, monitoring fisik, *clear desk and clear screen*, keamanan aset off-premises, media penyimpanan, kabel, pembuangan peralatan |
> > | **8. Technological** (34 control) | Endpoint, hak istimewa, autentikasi aman, anti-malware, manajemen kerentanan teknis, backup, redundansi, logging dan monitoring, sinkronisasi jam, keamanan jaringan, segregasi jaringan, web filtering, kriptografi, **secure development life cycle**, secure coding (8.28), security testing, pemisahan lingkungan dev/test/prod |
> >
> > Dengan demikian ISO 27002 menyediakan daftar periksa komprehensif untuk menjawab "control apa yang perlu dipilih" setelah risiko diidentifikasi.

> [!cornell] #### Summary
>
> Pemilihan countermeasure dapat dipandu oleh **NIST CSF** (*Identify, Protect, Detect, Respond, Recover*) dan katalog control **ISO/IEC 27002:2022** yang terdiri dari empat kategori: **Organizational (5.x)**, **People (6.x)**, **Physical (7.x)**, dan **Technological (8.x)**. Countermeasure tidak hanya IT; ia mencakup kebijakan, personel, fisik, hukum, dan pelatihan, serta dapat memperbesar attack surface sehingga harus dipilih berdasarkan risiko.

> [!ad-libitum]- Additional Information
>
> #### Versi 2013 vs 2022
>
> ISO 27002:2013 memiliki 114 control dalam 14 domain; revisi 2022 meringkas menjadi **93 control** dalam 4 tema, menambah control baru seperti *threat intelligence*, *cloud services*, *data masking*, *data leakage prevention*, dan *secure coding*. NIST CSF 2.0 menambahkan fungsi keenam, **Govern**.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih 10 control ISO 27002 dan petakan ke fungsi NIST CSF yang relevan.
>
> #### Bacaan Lanjutan
> - ISO/IEC 27002:2022.
> - NIST Cybersecurity Framework 2.0.
