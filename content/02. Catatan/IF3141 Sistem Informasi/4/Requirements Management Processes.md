---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Kebutuhan Perangkat Lunak]]

> [!cornell] Requirements Management Processes
>
> > ## Questions/Cues
> >
> > - Mengapa manajemen kebutuhan kritis untuk proyek IT?
> > - Bagaimana efek domino kesalahan kebutuhan terjadi?
> > - Apa komponen framework rekayasa kebutuhan?
> > - Bagaimana mengelola perubahan kebutuhan secara efektif?
> > - Apa perbedaan kebutuhan fungsional vs non-fungsional?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 1-43)
> > - Chaos Chronicles, III, 2003 (Slide 2)
> > - Meta Group, March 2003 (Slide 3)
>
> > ### Pentingnya Manajemen Kebutuhan
> >
> > Manajemen kebutuhan merupakan proses sistematis untuk mengidentifikasi, mendokumentasikan, melacak, dan mengendalikan perubahan kebutuhan selama siklus hidup pengembangan sistem. Studi Chaos Chronicles (2003) menunjukkan 17% kesuksesan proyek IT ditentukan oleh kejelasan tujuan bisnis dan 15% oleh proses kebutuhan yang tangkas. Kesalahan dalam menentukan kebutuhan dapat menyebabkan efek domino dimana kesalahan kecil di awal beramplifikasi menjadi kegagalan sistem besar di akhir proyek. Meta Group (2003) mencatat 60-70% kegagalan proyek IT disebabkan oleh kelemahan dalam analisis dan manajemen kebutuhan.
> >
> > Contoh nyata efek domino: Jika kebutuhan sistem pembayaran salah mendefinisikan metode verifikasi transaksi, kesalahan ini akan menghasilkan desain keamanan yang keliru, implementasi fungsi otorisasi yang tidak memadai, dan akhirnya kerentanan sistem terhadap penipuan. Proses manajemen kebutuhan yang baik bertindak sebagai "sistem imun" yang mendeteksi dan memperbaiki kesalahan sejak tahap awal.
> >
> > ### Framework Rekayasa Kebutuhan
> >
> > Framework rekayasa kebutuhan menyediakan struktur untuk mengelola kompleksitas kebutuhan melalui tiga pilar utama: 1) **Elicitation** (pengumpulan), 2) **Analysis** (analisis), 3) **Validation** (validasi). Meskipun aktivitas spesifik dalam setiap tahap telah dibahas di catatan lain, kerangka kerja ini menekankan pentingnya siklus iteratif dimana kebutuhan terus diperbaiki melalui umpan balik stakeholder.
> >
> > Contoh implementasi: Pada proyek sistem e-commerce, framework ini memastikan kebutuhan logistik diidentifikasi dari departemen gudang (elicitation), dianalisis untuk konsistensi dengan kebutuhan pemasaran (analysis), dan divalidasi melalui simulasi skenario pesanan puncak (validation). Manajemen yang efektif membutuhkan dokumentasi terpusat dan mekanisme pelacakan perubahan.
> >
> > ### Klasifikasi Kebutuhan Sistem
> >
> > Kebutuhan sistem diklasifikasikan menjadi dua kategori utama: 1) **Fungsional** yang mendeskripsikan perilaku sistem ("apa yang sistem lakukan"), dan 2) **Non-fungsional** yang menentukan kualitas operasional ("bagaimana sistem bekerja"). Contoh kebutuhan fungsional: "Sistem harus menghasilkan laporan penjualan harian otomatis pukul 00.00 WIB". Contoh non-fungsional: "Laporan harus tersedia dalam waktu ≤3 detik setelah permintaan".
> >
> > Perbedaan kritis: Kebutuhan fungsional dapat diverifikasi melalui pengujian fungsional langsung, sementara kebutuhan non-fungsional memerlukan pengukuran kinerja (seperti load testing). Kesalahan klasifikasi dapat menyebabkan miskomunikasi antara developer dan stakeholder, seperti menganggap kebutuhan kecepatan akses data sebagai fitur opsional padahal termasuk critical non-functional requirement.
> >
> > ### Manajemen Perubahan Kebutuhan
> >
> > Proses pengendalian perubahan meliputi: 1) Identifikasi perubahan, 2) Analisis dampak terhadap ruang lingkup/jadwal/biaya, 3) Persetujuan stakeholder, 4) Implementasi terkendali. Mekanisme version control digunakan untuk melacak revisi kebutuhan dan mempertahankan konsistensi dokumen.
> >
> > Studi kasus: Pada pengembangan aplikasi mobile banking, penambahan kebutuhan autentikasi biometrik di tengah proyek memerlukan analisis dampak terhadap modul keamanan, penyesuaian jadwal pengujian, dan persetujuan regulator. Manajemen perubahan terstruktur mencegah "scope creep" yang dapat mengganggu penyelesaian proyek.

> [!cornell] #### Summary
>
> **Manajemen kebutuhan** merupakan tulang punggung kesuksesan proyek IT dengan mencegah **efek domino** kesalahan melalui proses identifikasi, analisis, dan validasi terstruktur. Framework rekayasa kebutuhan menyediakan siklus iteratif untuk **menyelaraskan kebutuhan stakeholder** dengan implementasi teknis. Klasifikasi kebutuhan yang tepat (fungsional vs non-fungsional) memastikan **spesifikasi sistem komprehensif**, sementara mekanisme manajemen perubahan menjaga **kestabilan ruang lingkup proyek**. Dokumentasi terpusat dan **pelacakan versi** menjadi kunci efektivitas proses ini.

> [!ad-libitum]- Additional Information
>
> #### Traceability Matrix Lanjutan
>
> Matriks keterlacakan (traceability matrix) tingkat lanjut menghubungkan kebutuhan dengan sumber bisnis, desain teknis, kasus uji, dan hasil implementasi. Implementasi ideal menggunakan ID unik untuk setiap kebutuhan dan relasi hierarkis (parent-child). Tools seperti IBM DOORS atau Visure Requirements Manager menyediakan automasi pelacakan perubahan dan analisis dampak otomatis.
>
> #### Manajemen Konfigurasi Kompleks
>
> Pada proyek berskala enterprise, manajemen konfigurasi kebutuhan melibatkan: 1) Branching strategy untuk lingkungan pengembangan/staging/produksi, 2) Baseline requirements untuk milestone proyek, 3) Audit trail yang memenuhi regulasi industri (ISO 27001, FDA 21 CFR Part 11). Teknik advanced seperti semantic versioning (contoh: REQ-1.2.3) membantu mengelola ratusan perubahan paralel.
>
> #### Studi Kasus Kegagalan Manajemen Kebutuhan
>
> Proyek health.gov 2013 di AS gagal karena: 1) Tidak ada proses perubahan terpusat (300+ perubahan tak terdokumentasi), 2) Kebutuhan non-fungsional kapasitas 50.000 user tidak diuji, 3) Traceability rusak antara dokumen bisnis-teknis. Biaya perbaikan mencapai $2.1M, pelajaran penting tentang pentingnya tata kelola kebutuhan ketat.
>
> #### Tools Enterprise untuk Manajemen Kebutuhan
>
> 1. **JIRA Advanced Roadmaps** - Untuk pelacakan kebutuhan Agile skala besar
> 2. **Siemens Polarion** - Solusi end-to-end dengan fitur compliance auditing
> 3. **Modern Requirements4DevOps** - Integrasi dengan Azure DevOps untuk lifecycle management
> 4. **Sparx Systems Enterprise Architect** - Pemodelan kebutuhan berbasis UML/SysML
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan pipeline CI/CD untuk dokumen kebutuhan: Gunakan GitLab + Pandoc untuk otomasi konversi dokumen (Word→PDF→HTML) dengan version control
> 2. Bangun traceability matrix otomatis: Gunakan Python untuk ekstrak ID kebutuhan dari dokumen Word/Excel dan bangun relasi graf dengan library NetworkX
> 3. Analisis kasus kegagalan proyek: Pelajari laporan investigasi NHS IT Programme (UK) dan identifikasi 5 kesalahan manajemen kebutuhan kritis
>
> #### Bacaan Lanjutan
>
> - Wiegers, K. & Beatty, J. (2013). *Software Requirements* (3rd ed.). Microsoft Press
> - ISO/IEC/IEEE 29148:2018 - Standar internasional untuk proses rekayasa kebutuhan
> - Tutorial Sparx EA: Requirements Management https://sparxsystems.com/resources/demos/requirements-management/
> - Penelitian: "Requirements Engineering Practice Gap Analysis" (IEEE TSE, 2022)