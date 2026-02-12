---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Scenario-Based Modeling Methodology
>
> > ## Questions/Cues
> >
> > - Mengapa pemodelan berbasis skenario penting?
> > - Langkah-langkah metodologi pemodelan skenario
> > - Kriteria use-case yang efektif
> > - Komponen deskripsi skenario lengkap
> > - Dampak granularitas use-case terhadap model
> >
> > ## Reference Points
> >
> > - SCENARIO BASED MODELING REVIEW (Halaman 2-27)
>
> > ### Konsep Dasar Pemodelan Berbasis Skenario
> >
> > Pemodelan berbasis skenario merupakan pendekatan sistematis untuk merepresentasikan interaksi antara pengguna (aktor) dengan sistem perangkat lunak. Teknik ini berfokus pada penangkapan kebutuhan fungsional melalui deskripsi naratif dan diagram yang menggambarkan alur penggunaan sistem. Pemodelan ini berperan sebagai jembatan komunikasi antara pemangku kepentingan dan pengembang, memastikan persepsi yang sama tentang perilaku sistem yang diharapkan.
> >
> > Contoh praktis: Dalam sistem akademik, skenario "Pengambilan Mata Kuliah" akan mendokumentasikan langkah-langkah yang dilakukan mahasiswa (aktor) mulai dari login, pencarian kelas, hingga konfirmasi pendaftaran, beserta respons sistem pada setiap tahapan.
> >
> > ### Langkah Metodologis Pemodelan
> >
> > **Langkah 1 - Identifikasi Aktor**:
> >
> > Proses ini melibatkan penentuan seluruh entitas eksternal yang berinteraksi dengan sistem, baik secara aktif maupun pasif. Aktor dapat berupa manusia, sistem lain, atau perangkat keras. Identifikasi harus mempertimbangkan peran semantik yang berbeda dan tanggung jawab unik masing-masing aktor.
> >
> > **Langkah 2 - Identifikasi Use-Case**:
> >
> > Setiap use-case merepresentasikan unit fungsional lengkap yang memberikan nilai tambah bagi aktor. Use-case yang baik harus memenuhi kriteria: (1) diawali kata kerja, (2) memiliki awal dan akhir yang jelas, (3) menghasilkan output bermakna, dan (4) berdiri secara independen.
> >
> > **Langkah 3 - Penyusunan Diagram**:
> >
> > Tahap ini melibatkan visualisasi hubungan antara aktor dan use-case. Prinsip utamanya adalah memastikan setiap use-case terhubung minimal ke satu aktor dan menunjukkan inisiator interaksi. Diagram harus merefleksikan alur logis tanpa redundansi.
> >
> > **Langkah 4 - Pengembangan Skenario**:
> >
> > Setiap skenario mendokumentasikan alur interaksi spesifik dari perspektif aktor utama, mencakup: kondisi awal, tujuan aktor, urutan aksi-respon, informasi yang dipertukarkan, dan varian alur alternatif. Contoh: Pada sistem e-commerce, skenario "Pemrosesan Pembayaran" akan mencakup verifikasi stok, autentikasi pembayaran, dan konfirmasi pesanan.
> >
> > ### Prinsip Deskripsi Skenario Efektif
> >
> > Deskripsi skenario yang komprehensif harus menjawab tujuh pertanyaan kunci: (1) Aktor utama dan pendukung, (2) Tujuan fungsional, (3) Kondisi awal sistem, (4) Urutan tugas utama, (5) Fungsi tambahan opsional, (6) Varian interaksi yang mungkin, dan (7) Persyaratan informasi input/output. Deskripsi yang baik menggunakan format tabel dua kolom (Aksi Aktor vs Respons Sistem) untuk kejelasan.
> >
> > Contoh implementasi: Pada skenario "Pembatalan Pesanan", deskripsi harus mencakup langkah inisiasi pembatalan oleh pelanggan, verifikasi oleh sistem, pembaruan inventaris, dan notifikasi konfirmasi.
> >
> > ### Manajemen Kompleksitas Model
> >
> > Untuk sistem berskala besar, dilakukan modularisasi melalui teknik packaging yang mengelompokkan use-case berdasarkan kesamaan fungsional atau domain bisnis. Kriteria packaging efektif meliputi: kohesivitas tinggi antar komponen dalam paket, kopling rendah antar paket, dan granularitas yang seimbang. Pendekatan ini memfasilitasi pembagian kerja tim dan manajemen konfigurasi versi sistem.

> [!cornell] #### Summary
>
> **Pemodelan berbasis skenario** merupakan metodologi terstruktur yang mencakup empat langkah utama: identifikasi aktor, use-case, diagram, dan pengembangan skenario. Kualitas model ditentukan oleh ketepatan granularitas use-case, kelengkapan deskripsi skenario, dan efektivitas teknik modularisasi. Pendekatan ini berfungsi sebagai **blueprint komunikasi** antara pemangku kepentingan dan pengembang, sekaligus **dokumentasi perilaku sistem** yang esensial untuk tahap pengembangan selanjutnya. Keberhasilan implementasi bergantung pada konsistensi dalam menangkap interaksi aktor-sistem dan kemampuan mengelola kompleksitas melalui teknik packaging yang tepat.

> [!ad-libitum]- Additional Information
>
> #### Teknik Identifikasi Aktor Lanjutan
>
> Pendekatan berbasis pola (pattern-based identification) memanfaatkan katalog pola interaksi umum untuk menemukan aktor potensial. Analisis relasi ketergantungan (dependency analysis) mengidentifikasi aktor melalui ketergantungan sistem eksternal. Teknik wawancara kontekstual (contextual inquiry) dengan observasi langsung pengguna dalam lingkungan kerjanya dapat mengungkap aktor tersembunyi (hidden actors) yang tidak teridentifikasi melalui metode konvensional.
>
> #### Pendekatan Granularitas Use-Case
>
> Konsep "perfect granularity" dicapai ketika use-case memenuhi kriteria: (1) menyelesaikan satu tujuan bisnis lengkap, (2) dapat diimplementasikan dalam satu iterasi pengembangan, dan (3) memiliki rasio aktor-use-case yang seimbang. Metrika ukuran seperti jumlah langkah (5-25 langkah utama) dan kompleksitas keputusan (maksimal 3-5 cabang alternatif) membantu menentukan tingkat granularitas yang optimal.
>
> #### Studi Kasus Kompleks: Sistem Perbankan Multichannel
>
> Analisis penerapan metodologi pada sistem perbankan dengan 15+ channel interaksi menunjukkan pentingnya model paket terdistribusi berdasarkan layanan (account management, transaction processing, customer service). Pola umum yang teridentifikasi: use-case lintas saluran (cross-channel use-cases) memerlukan mekanisme koordinasi khusus melalui controller use-case yang mengelola status transaksi antar saluran.
>
> #### Alat Bantu Pemodelan
>
> 1. **Enterprise Architect**: Mendukung dokumentasi skenario lengkap dengan fitur traceability matrix
> 2. **IBM Rational Rhapsody**: Menyediakan simulasi eksekusi skenario berbasis model
> 3. **Visual Paradigm**: Memfasilitasi kustomisasi template deskripsi skenario
> 4. **PlantUML**: Alternatif open-source untuk generasi diagram berbasis teks
>
> #### Self-Exploration Projects
>
> 1. Analisis kasus sistem e-government: Bandingkan granularitas use-case pada modul layanan publik versus administrasi internal
> 2. Eksperimen pembagian paket: Implementasikan model use-case sistem RS dengan tiga strategi packaging berbeda (berdasarkan aktor, fungsionalitas, dan lokasi layanan)
> 3. Studi perbandingan: Ukur waktu pemahaman kebutuhan antara dokumentasi skenario tekstual versus diagram interaksi pada kasus yang sama
>
> #### Further Reading
>
> - Cockburn, A. (2000). Writing Effective Use Cases. Addison-Wesley Professional.
> - Bittner, K. (2002). Use Case Modeling. Addison-Wesley.
> - UML Specification versi 2.5.1, Bab 16: Use Cases (https://www.omg.org/spec/UML/)
> - Repository Pola Use-Case: https://www.usecasepatterns.com
> - Studi Kasus Industri: "Scenario Modeling in Large-Scale Banking Systems" (Journal of Systems Engineering, 2023)