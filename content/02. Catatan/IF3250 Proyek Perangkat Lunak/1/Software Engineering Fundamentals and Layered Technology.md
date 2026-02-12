---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Perangkat Lunak]]

> [!cornell] Software Engineering Fundamentals and Layered Technology
>
> > ## Questions/Cues
> >
> > - Definisi esensial rekayasa perangkat lunak
> > - Empat lapisan teknologi rekayasa perangkat lunak
> > - Urutan praktik fundamental pengembangan
> > - Perbedaan pendekatan sistematis vs ad-hoc
> > - Konsep "kualitas" sebagai fondasi utama
> >
> > ## Reference Points
> >
> > - SOFTWARE PROCESS REVIEW IF3250 (Halaman 2-3, 8)
> > - SOFTWARE ENGINEERING - A LAYERED TECHNOLOGY (Halaman 3)
> > - THE ESSENCE OF SOFTWARE ENGINEERING PRACTICE (Halaman 8)
>
> > ### Definisi Rekayasa Perangkat Lunak
> >
> > Rekayasa perangkat lunak adalah penerapan prinsip-prinsip teknik yang teruji untuk menghasilkan perangkat lunak yang andal, efisien, dan ekonomis. Berbeda dengan pemrograman konvensional, pendekatan ini bersifat **sistematis**, **terukur**, dan **terdokumentasi**, mencakup tiga aspek utama: proses pengembangan, teknik manajemen, dan penggunaan alat bantu. Contoh nyata: Membangun sistem perbankan memerlukan rekayasa perangkat lunak untuk memastikan keandalan transaksi, sedangkan membuat script otomasi sederhana mungkin tidak.
> >
> > ### Teknologi Berlapis dalam Rekayasa Perangkat Lunak
> >
> > Rekayasa perangkat lunak menggunakan pendekatan berlapis seperti bangunan bertingkat:
> >
> > 1. **Fokus Kualitas (Dasar)**: Mengutamakan kepuasan pengguna dan kesesuaian kebutuhan
> > 2. **Proses (Lapisan 1)**: Kerangka kerja tahapan pengembangan (contoh: analisis kebutuhan → desain → implementasi)
> > 3. **Metode (Lapisan 2)**: Teknik teknis seperti pemodelan data atau desain arsitektur
> > 4. **Alat (Lapisan 3)**: Software pendukung seperti IDE, version control (Git), atau alat testing (Selenium)
> >
> > Analogi: Seperti membangun gedung - fondasi (kualitas), struktur (proses), teknik konstruksi (metode), dan peralatan (tools).
> >
> > ### Praktik Fundamental Pengembangan
> >
> > Terdiri dari empat tahap berurutan:
> >
> > 1. **Pemahaman Masalah**: Mengumpulkan kebutuhan melalui wawancara dan observasi
> > 2. **Perencanaan Solusi**: Membuat desain sistem dan arsitektur menggunakan diagram UML
> > 3. **Implementasi**: Penulisan kode dengan standar pengkodean dan dokumentasi
> > 4. **Verifikasi**: Pengujian fungsional, penetrasi, dan penerimaan pengguna
> >
> > Contoh praktis: Pengembangan aplikasi e-commerce memerlukan analisis perilaku konsumen (tahap 1), desain workflow pembelian (tahap 2), implementasi modul pembayaran (tahap 3), dan uji coba transaksi dummy (tahap 4).

> [!cornell] #### Summary
>
> **Rekayasa perangkat lunak** merupakan disiplin yang mengintegrasikan prinsip teknik, proses terstruktur, dan alat bantu untuk menghasilkan solusi digital yang **andal** dan **efisien**. Kerangka kerjanya dibangun atas empat lapisan teknologi dimana **fokus kualitas** menjadi fondasi utama. Praktik pengembangannya mengikuti siklus sistematis mulai dari pemahaman masalah hingga verifikasi solusi, dengan penekanan pada **pendekatan terukur** dan **dokumentasi komprehensif**. Keberhasilan implementasi bergantung pada keseimbangan antara ketelitian proses dan fleksibilitas dalam menghadapi perubahan kebutuhan.

> [!ad-libitum]- Additional Information
>
> #### Evolusi Praktik Rekayasa Perangkat Lunak
>
> Sejarah rekayasa perangkat lunak dimulai dari "Krisis Perangkat Lunak" 1968 ketika proyek-proyek TI sering melebihi anggaran dan waktu. NATO Conference pertama tahun 1968 memperkenalkan konsep rekayasa sebagai solusi. Perkembangan penting termasuk munculnya model CMMI (Capability Maturity Model Integration) untuk mengukur kedewasaan proses, dan standar ISO/IEC 12207 untuk siklus hidup pengembangan.
>
> #### Metrik Kualitas Perangkat Lunak
>
> Terdapat enam karakteristik utama menurut ISO 25010:
>
> 1. Functional suitability (kesesuaian fungsi)
> 2. Performance efficiency (efisiensi kinerja)
> 3. Compatibility (kompatibilitas)
> 4. Usability (kemudahan penggunaan)
> 5. Reliability (keandalan)
> 6. Security (keamanan)
>
> Contoh pengukuran: MTBF (Mean Time Between Failures) untuk keandalan, jumlah vulnerability untuk keamanan, waktu respons untuk kinerja.
>
> #### Studi Kasus: Penerapan pada Sistem Kritikal
>
> Pada sistem pesawat Boeing 787, rekayasa perangkat lunak menerapkan:
>
> - Redundansi triple-modular untuk toleransi kesalahan
> - Formal verification menggunakan model checking
> - Coding standar DO-178B Level A
> - Real-time performance monitoring
>
> #### Alat Analisis Kode Lanjutan
>
> 1. SonarQube: Static code analysis untuk deteksi bug
> 2. Valgrind: Memory leak detection
> 3. Coverity: Security vulnerability scanning
> 4. Klocwork: Architecture violation detection
>
> #### Proyek Eksperimen Mandiri
>
> 1. Bangun pipeline CI/CD sederhana menggunakan GitHub Actions untuk otomasi testing
> 2. Analisis kode open-source di GitHub dengan SonarQube dan bandingkan metrik kualitasnya
> 3. Implementasikan unit testing dengan code coverage >80% pada proyek kecil
>
> #### Bacaan Lanjutan
>
> - Pressman, R. S. (2014). *Software Engineering: A Practitioner's Approach*. Edisi 8.
> - Sommerville, I. (2016). *Software Engineering*. Edisi 10.
> - Standar IEEE 730-2014 untuk Quality Assurance
> - Kursus online: "Software Engineering Essentials" edX