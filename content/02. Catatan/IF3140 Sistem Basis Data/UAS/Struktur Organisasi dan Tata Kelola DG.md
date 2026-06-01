---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Organisasi Data-Centric?
> >     
> > - Apa saja 3 fungsi organisasi DG?
> >     
> > - Apa saja badan/lembaga DG utama?
> >     
> > - Apa peran Steering Committee?
> >     
> > - Apa peran DGC dan DGO?
> >     
> > - 3 Model Operasi DG?
> >     
> > - Model Sentralisasi (Centralized)?
> >     
> > - Model Replikasi (Replicated)?
> >     
> > - Model Federasi (Federated)?
> >     
> > - Apa itu Data Stewardship?
> >     
> > - Apa tugas Data Steward?
> >     
> > - Apa saja jenis-jenis Data Steward?
> >     
> > - Beda Business vs Technical Steward?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 14-21
> >     
> 
> > ### Organisasi Data-Centric
> > 
> > Sebuah organisasi yang **menghargai data sebagai aset** dan mengelola data tersebut di semua fase siklus hidupnya.
> > 
> > Prinsip utamanya adalah:
> > 
> > 1. Data harus dikelola sebagai aset korporat.
> >     
> > 2. Manajemen data berbeda dari manajemen IT.
> >     
> > 3. Praktik terbaik manajemen data harus diberi insentif.
> >     
> > 4. Strategi data enterprise harus selaras dengan strategi bisnis.
> >     
> > 5. Proses manajemen data harus terus menerus diperbaiki.
> >     
> > 
> > ### Struktur Organisasi Data Governance
> > 
> > ![[Pasted image 20251219003734.png]]
> > 
> > Organisasi DG (Data Governance) memiliki tiga fungsi utama yang mirip dengan pemerintahan (Slide 15):
> > 
> > 1. **Legislatif:** Menetapkan kebijakan, standar, dan Arsitektur Data Enterprise. (Contoh: "Do the right things").
> >     
> > 2. **Yudisial:** Menangani manajemen isu dan eskalasi (jika ada konflik atau masalah).
> >     
> > 3. **Eksekutif:** Melindungi, melayani, dan menjalankan tanggung jawab administratif. (Contoh: "Do things right").
> >     
> > 
> > ### Badan-Badan Kunci Data Governance (Slide 16)
> > 
> > - **Data Governance Steering Committee:**
> >     
> >     - Otoritas tertinggi untuk DG di organisasi.
> >         
> >     - Bertanggung jawab atas pengawasan, dukungan, dan pendanaan.
> >         
> >     - Terdiri dari eksekutif senior lintas fungsi.
> >         
> > - **Data Governance Council (DGC):**
> >     
> >     - Mengelola inisiatif DG (misal: pengembangan kebijakan, metrik), menangani isu, dan eskalasi.
> >         
> >     - Terdiri dari para eksekutif (levelnya di bawah Steering Committee).
> >         
> > - **Data Governance Office (DGO):**
> >     
> >     - Tim operasional harian.
> >         
> >     - Fokus pada definisi data level enterprise dan standar manajemen data.
> >         
> >     - Biasanya diisi oleh peran koordinator seperti Data Stewards atau Data Owners.
> >         
> > - **Data Stewardship Teams:**
> >     
> >     - Komunitas (Communities of Interest) yang fokus pada 1 atau lebih area subjek data (misal: tim data produk, tim data pelanggan).
> >         
> >     - Terdiri dari Business dan Technical Data Stewards.
> >         
> > - **Local Data Governance Committee:**
> >     
> >     - Mungkin ada di organisasi besar, di mana setiap divisi punya dewan DG sendiri di bawah DGC enterprise.
> >         
> > 
> > ### Tiga Model Operasi Data Governance
> > 
> > Ini adalah cara bagaimana struktur DG diterapkan di seluruh organisasi:
> > 
> > 1. **Centralized (Sentralisasi) - Slide 17:**
> > 
> > 	![[Pasted image 20251219003841.png]]
> >     
> >     - Satu organisasi DG mengawasi _semua_ aktivitas di _semua_ area subjek.
> >         
> >     - **Kelebihan:** Kontrol ketat, standar konsisten.
> >         
> >     - **Kekurangan:** Bisa lambat dan kaku untuk organisasi besar.
> >         
> > 2.  **Replicated (Replikasi) - Slide 18:**
> > 
> > 	![[Pasted image 20251219003901.png]]
> >     
> >     - Model dan standar DG yang _sama_ diadopsi (di-copy) oleh setiap unit bisnis.
> >         
> >     - Setiap unit bisnis punya badan DG-nya sendiri, tapi strukturnya seragam.
> >         
> > 3. **Federated (Federasi) - Slide 19:**
> >
> >	![[Pasted image 20251219003925.png]]
> >     
> >     - Satu organisasi DG pusat **berkoordinasi** dengan berbagai Unit Bisnis untuk menjaga konsistensi definisi dan standar.
> >         
> >     - Ini adalah model campuran (hybrid) yang paling umum, menyeimbangkan antara kontrol pusat (untuk hal-hal enterprise) dan otonomi lokal (untuk hal-hal spesifik unit bisnis).
> >         
> > 
> > ### Data Stewardship
> > 
> > **Data Stewardship** adalah istilah paling umum untuk mendeskripsikan **akuntabilitas dan tanggung jawab** atas data dan proses yang memastikan kontrol dan penggunaan aset data yang efektif.
> > 
> > Seorang **Data Steward** adalah orang yang mengelola aset data **atas nama orang lain** (stakeholder) dan untuk kepentingan terbaik seluruh organisasi. Peran ini bisa formal (jabatan resmi) atau informal.
> > 
> > **Aktivitas Data Steward (Slide 20):**
> > 
> > - Membuat dan mengelola Metadata inti (misal: mengisi Business Glossary).
> >     
> > - Mendokumentasikan aturan dan standar data.
> >     
> > - Mengelola isu kualitas data (Data Quality).
> >     
> > - Menjalankan aktivitas operasional DG sehari-hari.
> >     
> > 
> > ### Jenis-Jenis Data Steward (Slide 21)
> > 
> > - **Executive Data Stewards:** Manajer senior, duduk di Data Governance Council (DGC).
> >     
> > - **Enterprise Data Stewards:** Mengawasi satu domain data (misal: data pelanggan) lintas fungsi bisnis.
> >     
> > - **Business Data Stewards:** Profesional bisnis yang merupakan Subject Matter Expert (SME) di areanya. Mereka paling paham konteks bisnis data.
> >     
> > - **Data Owners:** Ini adalah _Business Data Steward_ yang memiliki wewenang **persetujuan (approval)** atas keputusan terkait data di domain mereka (misal: menyetujui siapa yang boleh akses data).
> >     
> > - **Technical Data Stewards:** Profesional IT yang beroperasi di area teknis (misal: Database Administrators/DBA, Data Integration Specialists, Data Quality Analysts).
> >     
> > - **Coordinating Data Stewards:** Pemimpin tim yang mewakili tim steward (bisnis & teknis) dalam diskusi lintas tim.
> >     

> [!cornell] #### Summary
> 
> **Struktur organisasi DG yang efektif memisahkan fungsi legislatif (penetapan aturan) dan eksekutif (pelaksanaan), serta didukung oleh badan-badan kunci seperti Steering Committee (pendanaan), DGC (inisiatif), dan DGO (operasional). Struktur ini dapat diterapkan melalui tiga model: Centralized (1 tim pusat), Replicated (tiap unit bisnis meng-copy model), atau Federated (koordinasi pusat dan unit bisnis). Inti dari pelaksanaan DG harian adalah Data Stewardship, yaitu peran (baik Business maupun Technical) yang diberi akuntabilitas dan tanggung jawab untuk mengelola aset data atas nama organisasi.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Owner vs Steward vs Custodian
> 
> Dalam praktik, sering terjadi kebingungan antara tiga istilah ini. DAMA DMBOK membantu memperjelas:
> 
> - **Data Owner:**
>     
>     - Peran **Bisnis** (biasanya level Senior/Eksekutif).
>         
>     - Memiliki **Akuntabilitas** tertinggi untuk data di domainnya.
>         
>     - Fokus pada: **Otoritas Persetujuan (Approval)**.
>         
>     - Contoh: "Direktur Marketing adalah Data Owner untuk data Pelanggan. Dia yang berhak menyetujui kebijakan siapa boleh pakai data itu."
>         
> - **Data Steward:**
>     
>     - Peran **Bisnis** atau **Teknis** (levelnya bisa Manajer, Analis, atau SME).
>         
>     - Memiliki **Tanggung Jawab (Responsibility)** atas data sehari-hari.
>         
>     - Fokus pada: **Manajemen Harian & Kualitas**.
>         
>     - Contoh: "Senior Marketing Analyst adalah Business Data Steward untuk data Pelanggan. Dia yang bertanggung jawab memastikan definisi data pelanggan di Business Glossary akurat dan mengelola laporan isu kualitas data."
>         
> - **Data Custodian:**
>     
>     - Peran **Teknis** (hampir selalu dari IT).
>         
>     - Fokus pada: **Implementasi Teknis & Keamanan**.
>         
>     - Contoh: "DBA adalah Data Custodian untuk data Pelanggan. Dia yang bertanggung jawab menerapkan kontrol akses, melakukan backup, dan memastikan keamanan teknis database sesuai kebijakan yang disetujui Data Owner."
>         
> 
> Singkatnya: **Owner** menyetujui, **Steward** mengelola definisi & kualitas, **Custodian** mengamankan secara teknis.
> 
> #### Eksplorasi Mandiri
> 
> - Coba petakan di organisasi (kampus atau perusahaan), siapa yang kira-kira berperan sebagai Data Owner, Data Steward, dan Data Custodian untuk data "Mahasiswa"?
>