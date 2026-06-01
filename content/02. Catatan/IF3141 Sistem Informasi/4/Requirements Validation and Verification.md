---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Persyaratan Sistem Informasi]]

> [!cornell] Requirements Validation and Verification
>
> > ## Questions/Cues
> >
> > - Mengapa validasi dilakukan sebelum fase pengembangan?
> > - Apa beda utama verifikasi vs validasi persyaratan?
> > - Kriteria apa yang digunakan untuk validasi persyaratan?
> > - Bagaimana prototipe mendukung proses validasi?
> > - Masalah umum dalam validasi persyaratan?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Halaman 34-41)
> > - Chaos Chronicles, III, 2003 (Halaman 2)
>
> > ### Definisi dan Perbedaan Konsep
> >
> > **Validasi persyaratan** adalah proses memastikan bahwa persyaratan yang didokumentasi benar-benar memenuhi kebutuhan pemangku kepentingan dan tujuan bisnis. Ini menjawab pertanyaan: "Apakah kita membangun produk yang *tepat*?" Sedangkan **verifikasi persyaratan** fokus pada pemeriksaan formal apakah persyaratan memenuhi standar kualitas teknis seperti kelengkapan, konsistensi, dan keterujian—menjawab: "Apakah kita membangun produk *dengan benar*?"
> >
> > Analogi: Bayangkan memesan kue ulang tahun. Validasi adalah memastikan desain kue (rasa, ukuran, hiasan) sesuai keinginan Anda. Verifikasi adalah memeriksa apakah resep kue tersebut memungkinkan untuk dibuat dengan bahan yang tersedia dan waktu produksi.
> >
> > ### Tujuan Validasi Persyaratan
> >
> > Proses ini memiliki empat tujuan utama: (1) Mendapatkan persetujuan formal dari pemangku kepentingan sebelum pengembangan dimulai, (2) Menangkap kesalahan interpretasi kebutuhan sejak dini untuk menghindari biaya perbaikan yang mahal di fase selanjutnya (menurut studi, kesalahan yang terdeteksi pada fase validasi 10-100x lebih murah diperbaiki dibanding jika terdeteksi saat pengujian), (3) Memastikan setiap persyaratan dapat diuji dan diukur secara objektif, (4) Mengidentifikasi celah atau ketidaksesuaian dengan strategi bisnis organisasi.
> >
> > ### Teknik dan Aktivitas Validasi
> >
> > Enam teknik utama digunakan:
> >
> > 1. **Sesi Tinjauan Persyaratan**: Workshop kolaboratif dengan pemangku kepentingan, analis, dan penguji untuk mengevaluasi kejelasan, konsistensi, dan kelengkapan. Contoh: Menggunakan checklist "5C" (Clear, Consistent, Complete, Correct, Concise).
> > 2. **Prototipe Fidelitas Rendah**: Menunjukkan mockup antarmuka atau alur kerja untuk memvalidasi pemahaman bersama. Contoh: Prototipe kertas alur pendaftaran pengguna.
> > 3. **Eksperimen Konsep**: Simulasi skenario bisnis kritis menggunakan skrip role-play. Contoh: Mensimulasikan proses klaim asuransi dengan data uji.
> > 4. **Matriks Jejak Kebutuhan**: Memetakan persyaratan ke sumber aslinya (misalnya wawancara stakeholder) dan ke kasus uji masa depan.
> > 5. **Definisi Kriteria Penerimaan**: Menentukan kondisi "selesai" yang terukur. Contoh: "Sistem harus memproses 100 transaksi/detik dengan latency <2 detik".
> > 6. **Analisis Dampak Perubahan**: Menilai efek modifikasi persyaratan terhadap cakupan proyek dan anggaran.
> >
> > ### Masalah Umum dalam Validasi
> >
> > Lima masalah sering muncul:
> >
> > 1. **Ambiguity Semantik**: Persyaratan yang terbuka untuk interpretasi ganda. Contoh: "Sistem harus mudah digunakan" tanpa definisi "mudah".
> > 2. **Konflik Persyaratan**: Ketidakcocokan antar kebutuhan. Contoh: Persyaratan keamanan tinggi vs aksesibilitas publik.
> > 3. **Celah Fungsional**: Alur proses yang tidak lengkap. Contoh: Tidak mencakup skenario pemulihan saat sistem gagal.
> > 4. **Bias Konfirmasi**: Pemangku kepentingan hanya memvalidasi persyaratan yang sesuai ekspektasi awal.
> > 5. **Keterujian yang Tidak Memadai**: Persyaratan yang tidak dapat diuji secara objektif. Contoh: "Sistem harus ramah pengguna" tanpa metrik usability.

> [!cornell] #### Summary
>
> **Validasi persyaratan** memastikan kita membangun solusi yang *tepat* dengan mengonfirmasi kebutuhan pemangku kepentingan melalui teknik seperti tinjauan dokumen, prototipe, dan definisi kriteria penerimaan. **Verifikasi** memastikan persyaratan itu sendiri *terdefinisi dengan baik* melalui pemeriksaan konsistensi dan keterujian. Proses ini kritis karena **60-70% kegagalan proyek IT** bersumber dari kesalahan persyaratan (Meta Group, 2003). Validasi efektif memerlukan pemeriksaan terhadap **ambiguity, konflik internal, dan celah fungsional**, sementara alat seperti matriks jejak kebutuhan membantu melacak asal-usul setiap persyaratan.

> [!ad-libitum]- Additional Information
>
> #### Teknik Validasi Formal
>
> **Inspection Fagan**: Metode terstruktur dengan tujuh langkah: perencanaan, orientasi, persiapan, inspeksi, perbaikan, tindak lanjut. Setiap inspektor memiliki peran khusus (moderator, pencatat, pembaca). Studi NASA menunjukkan teknik ini mengurangi 80% defect pada persyaratan.
>
> **Analisis Model Formal**: Menggunakan notasi matematis seperti Z Notation atau Alloy untuk menspesifikasikan persyaratan dan melakukan pemeriksaan konsistensi otomatis. Cocok untuk sistem kritis seperti kontrol pesawat.
>
> #### Alat Manajemen Persyaratan
>
> - **IBM DOORS**: Mendukung traceability end-to-end dengan kemampuan impact analysis
> - **Jama Connect**: Kolaborasi persyaratan dengan integrasi pengujian
> - **ReqView**: Solusi ringan dengan manajemen baseline dan pelaporan
>
> #### Studi Kasus Kegagalan Validasi
>
> **Therac-25 (1985)**: Kesalahan dosis radiasi akibat persyaratan safety yang tidak tervalidasi. Sistem mengandalkan asumsi "pengguna tidak akan memasukkan perintah tertentu secara berurutan", tetapi tidak ada validasi skenario edge case ini.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan skema validasi untuk sistem parkir cerdas: Buat checklist validasi untuk persyaratan seperti deteksi plat nomor, integrasi pembayaran digital, dan notifikasi slot kosong.
> 2. Analisis kasus kegagalan proyek IT: Pelajari 3 studi kasus (Healthcare.gov, Boeing 787, dll), identifikasi celah validasi persyaratan, dan usulkan mitigasinya.
>
> #### Bacaan Lanjutan
>
> - Wiegers, K. & Beatty, J. (2013). "Software Requirements"
> - ISO/IEC/IEEE 29148:2018 - Standar dokumentasi persyaratan
> - Tutorial Sparx Systems: Validasi persyaratan dengan Enterprise Architect