---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Prinsip Desain Saltzer dan Schroeder
>
> > ## Questions/Cues
> >
> > - Mengapa arsitektur/desain adalah titik ungkit utama keamanan?
> > - Bagaimana kurva Boehm menjelaskan biaya memperbaiki cacat desain?
> > - Apa delapan prinsip Saltzer & Schroeder?
> > - Bagaimana prinsip dilanggar dan diterapkan dalam contoh nyata?
> > - Apa kesalahan pada contoh insecure data flow dan perbaikannya?
> >
> > ## Reference Points
> >
> > - IF5161 — W04 Secure Architecture and Design Review, "Part 1: Foundation of Secure Architecture" (bagian "Why Architecture Matters" s.d. "Principle Application: Least Privilege")
>
> > ### Mengapa Arsitektur Penting
> >
> > Kutipan Gene Spafford membuka sesi: sistem aman tak dapat dicapai hanya dengan menambal; **desain adalah titik ungkit utama**. Kurva **Boehm** menunjukkan biaya memperbaiki cacat naik secara eksponensial: cacat desain yang ditemukan hari ini bernilai sekitar **$100**, tetapi di produksi dapat mencapai **$10.000+**. Selain itu, **"bolt-on fallacy"**: keamanan yang ditempelkan setelah deployment membuat sistem rapuh.
> >
> > **Contoh insecure data flow**: tanpa validasi input (**CWE-20**), database tak terenkripsi (**CWE-311**), dan secret hardcoded (**CWE-798**). **Arsitektur terkoreksi** menambahkan WAF, API Gateway, secrets management, dan enkripsi DB.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph BEFORE["Sebelum"]
> >         C1["Client"] --> A1["App (input tak divalidasi,<br/>secret hardcoded)"] --> D1[("DB tak terenkripsi")]
> >     end
> >     subgraph AFTER["Sesudah"]
> >         C2["Client"] --> W["WAF"] --> G["API Gateway"] --> A2["App"]
> >         A2 --> K["Secrets Management"]
> >         A2 --> D2[("DB terenkripsi")]
> >     end
> > ```
> >
> > ### Delapan Prinsip Saltzer & Schroeder (1975)
> >
> > | # | Prinsip | Inti |
> > |---|---|---|
> > | 1 | **Economy of Mechanism** | Desain sesederhana mungkin; kompleksitas adalah musuh |
> > | 2 | **Fail-Safe Defaults** | Default **deny**; akses diberikan secara eksplisit, bukan dilarang secara eksplisit |
> > | 3 | **Complete Mediation** | **Setiap** akses ke setiap objek diperiksa, termasuk respons yang di-cache |
> > | 4 | **Open Design** | Keamanan tak bergantung pada kerahasiaan desain (Kerckhoffs) |
> > | 5 | **Separation of Privilege** | Butuh lebih dari satu kondisi/kunci untuk aksi sensitif |
> > | 6 | **Least Privilege** | Beri hak minimum yang diperlukan, selama diperlukan |
> > | 7 | **Least Common Mechanism** | Minimalkan mekanisme bersama antar-pengguna/komponen |
> > | 8 | **Psychological Acceptability** | Keamanan yang mudah dipakai akan benar-benar dipakai |
> >
> > **Pelanggaran: incomplete mediation.** Jika sebuah izin diperiksa sekali lalu di-cache, perubahan hak setelahnya tidak berlaku sehingga terbuka celah **TOCTOU** (time-of-check to time-of-use). Pelajarannya: *setiap akses harus dicek, bahkan respons ter-cache*.
> >
> > **Penerapan: least privilege.** Memberi tiap komponen identitas dan izin yang tepat (mis. service pembaca laporan hanya `SELECT` pada tabel laporan) membatasi *blast radius* bila komponen itu dikompromikan.
> >
> > Prinsip yang sama muncul sebagai pelajaran praktis pada [[Studi Kasus SimpleWebServer]] (least privilege, jangan percaya input) dan dijalankan pada tingkat infrastruktur lewat [[Zero Trust dan Defense in Depth]].

> [!cornell] #### Summary
>
> Biaya cacat **membesar secara eksponensial** menjelang produksi, sehingga keamanan harus **dirancang sejak awal**, bukan ditempel. Delapan prinsip **Saltzer & Schroeder** (economy of mechanism, fail-safe defaults, complete mediation, open design, separation of privilege, least privilege, least common mechanism, psychological acceptability) tetap menjadi fondasi: kompleksitas adalah musuh dan *default deny* adalah teman.

> [!ad-libitum]- Additional Information
>
> #### Prinsip Tambahan Modern
> Selain delapan prinsip klasik, praktik modern menambahkan **defense in depth**, **secure by default**, **fail securely** (kegagalan tidak membuka akses), dan **keep security simple** (OWASP Secure Design Principles). NIST SP 800-160 memuat daftar lebih lengkap untuk systems security engineering.
>
> #### Proyek Eksplorasi Mandiri
> 1. Petakan setiap prinsip ke satu fitur konkret pada aplikasi Anda; tandai prinsip yang paling sering dilanggar.
> 2. Tulis skenario TOCTOU pada pengecekan izin file/upload dan cara menutupnya.
>
> #### Bacaan Lanjutan
> - Saltzer & Schroeder (1975), *The Protection of Information in Computer Systems*
> - OWASP SAMM — Secure Architecture practice
