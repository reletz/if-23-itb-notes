---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Persyaratan]]

> [!cornell] Requirements Documentation Standards
>
> > ## Questions/Cues
> >
> > - Mengapa katalog persyaratan penting?
> > - Bagaimana glosarium mengatasi ambiguitas?
> > - Perbedaan model fungsional vs data
> > - Standar IEEE 830 untuk dokumentasi
> > - Manajemen konfigurasi dalam versi dokumen
> > - Prinsip _traceability_ maju-mundur
> > - Alat manajemen persyaratan modern
> >
> > ## Reference Points
> >
> > - IF3141_SISTEM_INFORMASI (Halaman 41-42)
> > - IF3141_SISTEM_INFORMASI (Halaman 43)
>
> > ### Katalog Persyaratan (Requirements Catalogue)
> >
> > Katalog persyaratan merupakan repositori terpusat yang menyimpan semua persyaratan proyek secara terstruktur. Fungsi utamanya adalah memastikan **keterlacakan** (traceability) dan **konsistensi** dokumen sepanjang siklus hidup pengembangan sistem. Setiap entri dalam katalog harus memuat ID unik, deskripsi lengkap, prioritas, status, dan pemilik persyaratan.
> >
> > Contoh penerapan: Dalam pengembangan sistem e-commerce, katalog akan mencatat persyaratan seperti "Sistem harus memungkinkan pembayaran menggunakan 3 metode: kartu kredit, transfer bank, dan dompet digital" dengan ID REQ-ECOM-008. Format standar ini mempermudah **referensi silang** antara dokumen desain, kasus uji, dan laporan bug.
> >
> > Manfaat utama meliputi: (1) Mencegah duplikasi persyaratan, (2) Memungkinkan analisis dampak perubahan, (3) Memfasilitasi audit kepatuhan. Tanpa katalog terpusat, tim risiko mengalami **fragmentasi informasi** dimana versi persyaratan berbeda tersebar di email, catatan rapat, dan dokumen terpisah.
> >
> > ### Glosarium Istilah Teknis
> >
> > Glosarium berfungsi sebagai **kamus proyek** yang mendefinisikan semua terminologi khusus domain secara eksplisit. Komponen ini penting karena istilah bisnis sering memiliki interpretasi berbeda antar divisi. Misalnya, "pelanggan premium" bisa berarti pengguna dengan riwayat transaksi >Rp10 juta di divisi penjualan, tetapi >Rp50 juta di divisi pemasaran.
> >
> > Struktur ideal glosarium mencakup: (1) Istilah teknis, (2) Definisi operasional, (3) Contoh penggunaan, (4) Sinonim/antonim terkait. Praktik terbaik menyarankan penyusunan glosarium sejak fase awal proyek melalui **workshop kolaboratif** dengan perwakilan semua unit bisnis.
> >
> > Studi kasus: Proyek sistem perbankan mengurangi 40% kesalahan interpretasi setelah membuat glosarium yang menjelaskan perbedaan antara "pembiayaan" (akad bagi hasil) vs "kredit" (akad pinjaman berbunga). Alat seperti IBM DOORS menyediakan fitur **glossary linkage** yang otomatis menampilkan definisi saat istilah muncul di dokumen.
> >
> > ### Pemodelan Persyaratan
> >
> > Terdapat dua jenis model utama dalam dokumentasi persyaratan:
> >
> > **Model Fungsional** merepresentasikan perilaku sistem melalui diagram alir (data flow diagram) atau diagram kasus penggunaan (use case diagram). Contoh: Diagram alir proses approval kredit menunjukkan interaksi antara modul input data, engine scoring, dan notifikasi hasil.
> >
> > **Model Data** mendokumentasikan struktur informasi menggunakan diagram entitas-relasi (ERD) atau class diagram. Contoh: ERD sistem HRD menjelaskan hubungan antara entitas Karyawan, Departemen, dan Riwayat Jabatan beserta atribut masing-masing.
> >
> > Integrasi kedua model ini menciptakan **dokumentasi holistik** dimana perubahan pada model fungsional otomatis memicu pemeriksaan konsistensi di model data. Tools seperti Enterprise Architect menyediakan fitur **model synchronization** untuk menjaga koherensi antar diagram.
> >
> > ### Standar Dokumentasi IEEE 830
> >
> > Standar IEEE 830-1998 menetapkan struktur tetap untuk Spesifikasi Persyaratan Perangkat Lunak (SRS) yang terdiri dari:
> >
> > 1. Pendahuluan (tujuan, ruang lingkup, definisi)
> > 2. Deskripsi keseluruhan (perspektif produk, fungsi utama)
> > 3. Persyaratan spesifik (fungsional, antarmuka, kinerja)
> >
> > Keunggulan standar ini terletak pada **komprehensivitas** dan **keterujian** (testability) persyaratan. Setiap klausul harus memuat kriteria penerimaan terukur. Contoh buruk: "Sistem harus mudah digunakan" diperbaiki menjadi "Pengguna pertama kali harus bisa menyelesaikan transaksi dalam ≤5 menit tanpa pelatihan".
> >
> > Implementasi modern mengadaptasi IEEE 830 dengan menambahkan bagian **risk assessment** dan **change history**. Standar ini cocok untuk proyek regulasi ketat seperti sistem medis atau avionik, namun mungkin terlalu rigid untuk pengembangan agile skala kecil.

> [!cornell] #### Summary
>
> **Dokumentasi persyaratan yang baik** memerlukan katalog terpusat untuk _single source of truth_, glosarium istilah untuk menghilangkan ambiguitas, dan model visual untuk merepresentasikan logika sistem. Standar IEEE 830 menyediakan **kerangka terstruktur** dengan penekanan pada persyaratan terukur dan dapat diuji. **Manajemen konfigurasi** melalui version control dan _traceability matrix_ menjadi kunci menjaga konsistensi dokumen sepanjang perubahan iteratif. Tantangan utama terletak pada keseimbangan antara kelengkapan dokumentasi dan kelincahan pengembangan.

> [!ad-libitum]- Additional Information
>
> #### Standar Internasional Lainnya
>
> ISO/IEC/IEEE 29148:2018 memperbarui standar dokumentasi persyaratan dengan penekanan pada _lifecycle management_ dan _requirements provenance_. Standar ini memperkenalkan konsep _requirement attributes_ yang mencakup 23 metadata tambahan seperti _decision rationale_ dan _verification method_.
>
> BABOK v3 dari IIBA memasukkan _documentation standards_ sebagai bagian dari _Business Analysis Core Concept Model_ dengan _template_ khusus untuk konteks bisnis vs teknis. Perbedaan utama terletak pada tingkat abstraksi: dokumen bisnis menggunakan _user stories_ sementara dokumen teknis memerlukan _state-transition diagrams_.
>
> #### Alat Manajemen Persyaratan Modern
>
> 1. **IBM DOORS Next Generation**: Mendukung _baselining_, _impact analysis_, dan _requirements versioning_ dengan integrasi Jira
> 2. **Jama Connect**: Menyediakan _traceability visualization_ dan _live traceability_ untuk perubahan real-time
> 3. **Sparx Systems Enterprise Architect**: Tools pemodelan UML dengan _requirements simulation_
>
> Benchmarking menunjukkan Jama Connect unggul dalam _user experience_ tetapi kurang cocok untuk proyek regulated industry dibandingkan DOORS.
>
> #### Studi Kasus Kompleks
>
> Proyek sistem kontrol lalu lintas udara di Bandara Changi menggunakan _model-based requirements engineering_ dengan pendekatan dual documentation:
>
> - Dokumen tekstual mengikuti MIL-STD-498 untuk audit regulator
> - Model SysML untuk simulasi skenario kegagalan
>
> Integrasi keduanya dicapai melalui _automated document generation_ dari model menggunakan plugin Cameo Document Publisher.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bandingkan template SRS IEEE 830 dengan Volere Requirements Specification Template dalam aspek _stakeholder engagement_ dan _change management_
> 2. Implementasikan _requirements traceability matrix_ sederhana menggunakan Python dan SQLite dengan fitur:
> - Version history dengan diff checker
> - Impact analysis graph
> - Export ke format Docx/PDF
> 3. Analisis kasus kegagalan dokumentasi persyaratan pada proyek HealthCare.gov menggunakan framework SEI Quality Attribute Workshop
>
> #### Bacaan Lanjutan
>
> - IEEE Computer Society. (2011). "Guide to the Software Engineering Body of Knowledge" Bab 3: _Software Requirements_
> - Wiegers, K. & Beatty, J. (2013). "Software Requirements" Edisi ke-3, Bab 10: _Documenting the Requirements_
> - ISO/IEC/IEEE 29148:2018 "Systems and software engineering — Life cycle processes — Requirements engineering"
> - Tutorial Sparx EA Requirements Management: https://sparxsystems.com/resources/demos/requirements/index.html