---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Perangkat Lunak]]

> [!cornell] Requirements Elicitation Techniques and Process
>
> > ## Questions/Cues
> >
> > - Mengapa teknik elicitation berbeda dalam pengumpulan kebutuhan?
> > - Bagaimana memilih teknik yang sesuai untuk konteks proyek?
> > - Tahapan proses elicitation yang efektif?
> > - Tantangan utama dalam mengungkap kebutuhan pemangku kepentingan?
> > - Perbedaan antara kebutuhan fungsional dan non-fungsional?
> > - Bagaimana mengatasi variasi interpretasi kebutuhan?
> >
> > ## Reference Points
> >
> > - IF3141_Sistem_Informasi (Halaman 9, 13-20)
> > - IF3141_Sistem_Informasi (Halaman 23-26, 31-34)
>
> > ### Definisi dan Tujuan Elicitation
> >
> > Elicitation requirements adalah proses **penemuan** dan **pemahaman** kebutuhan pemangku kepentingan melalui teknik sistematis untuk mengungkap kebutuhan tersembunyi, harapan, dan batasan sistem. Berbeda dengan sekadar mengumpulkan permintaan, proses ini melibatkan interpretasi mendalam untuk memahami "mengapa" di balik setiap permintaan.
> >
> > Tujuan utama meliputi: (1) Memahami tujuan bisnis dan titik nyeri organisasi, (2) Mengidentifikasi semua pemangku kepentingan relevan, (3) Mendokumentasikan kebutuhan fungsional dan non-fungsional secara komprehensif, dan (4) Mengungkap konflik atau batasan sejak dini. Contoh: Dalam sistem perbankan, elicitation membantu mengungkap kebutuhan keamanan yang tidak terucapkan tetapi kritis.
> >
> > ### Teknik Elicitation yang Umum
> >
> > Terdapat tujuh teknik utama dengan karakteristik berbeda:
> >
> > 1. **Wawancara**: Dialog satu lawan satu untuk memahami perspektif individu. Cocok untuk situasi sensitif atau kompleks. Contoh: Wawancara dengan manajer operasional untuk memahami alur kerja approval kredit.
> > 2. **Workshop**: Sesi kolaboratif dengan banyak pemangku kepentingan untuk mencapai konsensus. Efektif untuk menyelesaikan konflik kebutuhan. Contoh: Workshop desain bersama tim IT dan user frontline.
> > 3. **Observasi**: Mengamati pengguna di lingkungan kerja aktual untuk memahami perilaku tak-terkatakan. Contoh: Mengamati teller bank menangani transaksi untuk mengidentifikasi bottleneck.
> >
> > Setiap teknik memiliki trade-off. Observasi memberikan wawasan perilaku nyata tapi memakan waktu, sementara workshop cepat tetapi membutuhkan fasilitasi ahli. Pemilihan teknik harus mempertimbangkan: kompleksitas domain, jumlah pemangku kepentingan, dan ketersediaan sumber daya.
> >
> > ### Proses Elicitation Sistematis
> >
> > Proses elicitation yang efektif bersifat iteratif melalui enam tahap:
> >
> > 1. **Identifikasi Pemangku Kepentingan**: Menggunakan teknik seperti matriks RACI (Responsible, Accountable, Consulted, Informed) untuk memetakan semua pihak terkait.
> > 2. **Seleksi Teknik**: Memadukan teknik berdasarkan konteks. Contoh: Wawancara untuk kebutuhan individu + workshop untuk kebutuhan kelompok.
> > 3. **Persiapan**: Riset domain, menyiapkan pertanyaan terbuka, dan menentukan tujuan sesi.
> > 4. **Pelaksanaan**: Mengumpulkan kebutuhan sambil memperhatikan bahasa tubuh dan isyarat nonverbal.
> > 5. **Dokumentasi**: Merekam kebutuhan dalam format terstruktur menggunakan template standar.
> > 6. **Validasi Awal**: Memverifikasi interpretasi dengan pemangku kepentingan melalui review dokumen.
> >
> > Contoh iterasi: Hasil observasi di-branching ke wawancara mendalam, lalu diverifikasi dalam workshop.
> >
> > ### Klasifikasi Kebutuhan
> >
> > Kebutuhan sistem diklasifikasikan menjadi dua jenis utama:
> >
> > **Fungsional**: Perilaku spesifik sistem. Contoh: "Sistem harus menghasilkan laporan transaksi harian pukul 24:00 WIB."
> >
> > **Non-Fungsional**: Karakteristik operasional sistem yang mencakup:
> >
> > - **Keandalan**: Tingkat ketersediaan sistem (99.9% uptime)
> > - **Kinerja**: Waktu respons maksimal 2 detik untuk query transaksi
> > - **Keamanan**: Enkripsi data end-to-end dengan protokol AES-256
> >
> > Tantangan umum mencakup kebutuhan non-fungsional yang sering tidak terungkap secara eksplisit. Contoh: Pengguna mungkin tidak menyadari pentingnya audit trail sampai ditanyakan secara spesifik.
> >
> > ### Tantangan dalam Elicitation
> >
> > Empat tantangan utama beserta strategi penanganannya:
> >
> > 1. **Variasi Interpretasi**: Pemangku kepentingan berbeda memahami istilah yang sama secara berbeda. Solusi: Membuat glosarium istilah teknis.
> > 2. **Kebutuhan Tersembunyi**: Pengguna tidak menyadari seluruh kebutuhan mereka. Solusi: Teknik prototipe untuk memicu umpan balik.
> > 3. **Konflik Kepentingan**: Divisi berbeda memiliki prioritas bertentangan. Solusi: Teknik MoSCoW yang diadaptasi untuk konsensus.
> > 4. **Perubahan Dinamis**: Kebutuhan berevolusi selama proyek. Solusi: Sesi elicitation berkala dengan mekanisme change control.
> >
> > Studi kasus: Proyek sistem reservasi hotel mengalami perubahan 40% kebutuhan setelah demonstrasi prototipe awal.

> [!cornell] #### Summary
>
> **Elicitation requirements** merupakan proses kritis untuk mengungkap kebutuhan tersembunyi melalui teknik terstruktur seperti wawancara, workshop, dan observasi. Proses ini bersifat **iteratif** dengan tahapan identifikasi pemangku kepentingan, seleksi teknik, dan validasi berkelanjutan. Tantangan utama mencakup **variasi interpretasi** dan **kebutuhan dinamis** yang memerlukan pendekatan adaptif. Kebutuhan terbagi menjadi **fungsional** (perilaku sistem) dan **non-fungsional** (karakteristik operasional), dimana yang terakhir sering membutuhkan probing lebih dalam. Keberhasilan elicitation bergantung pada **pemilihan teknik yang kontekstual** dan **kemampuan analis dalam menginterpretasi kebutuhan tak-terkatakan**.

> [!ad-libitum]- Additional Information
>
> #### Framework Kematangan Elicitation
>
> Model CMMI untuk elicitation membagi kedewasaan proses dalam lima level:
>
> 1. **Initial**: Ad-hoc, tergantung individu
> 2. **Managed**: Proses terstandar dasar
> 3. **Defined**: Proses terdefinisi dengan metrik kualitas
> 4. **Quantitatively Managed**: Pengukuran statistik untuk perbaikan
> 5. **Optimizing**: Fokus pada inovasi berkelanjutan
>
> Organisasi level 3 biasanya mengurangi kesalahan kebutuhan hingga 60% dibanding level 1.
>
> #### Teknik Elicitation Lanjutan
>
> **Cognitive Task Analysis (CTA)**: Mengurai pengetahuan ahli melalui:
>
> - Diagram kedalaman (Depth Chart)
> - Simulasi skenario kritis
> - Analisis keputusan berbasis pengetahuan
>
> **Ethnographic Study**: Imersi analis dalam lingkungan pengguna selama periode panjang (minggu/bulan) untuk memahami konteks kultural yang mempengaruhi kebutuhan.
>
> #### Analisis Risiko Elicitation
>
> Matriks risiko untuk mengidentifikasi:
>
> - Probabilitas kegagalan mengungkap kebutuhan kritis
> - Dampak finansial dari kebutuhan yang terlewat
> - Mitigasi melalui teknik triangulasi (gabungan metode elicitation)
>
> Contoh perhitungan: Risk Exposure = Probability × Impact
>
> #### Proyek Eksperimen Mandiri
>
> 1. **Simulasi Elicitation Virtual**:
> - Buat skenario proyek fiktif dengan persona pemangku kepentingan
> - Lakukan sesi elicitation via platform kolaboratif (Miro/MURAL)
> - Analisis gap antara kebutuhan yang diungkap vs tersembunyi
> 2. **Studi Kasus Komparatif**:
> - Bandingkan hasil elicitation untuk domain berbeda (kesehatan vs manufaktur)
> - Identifikasi pola teknik efektif berdasarkan kompleksitas proyek
>
> #### Alat Bantu Modern
>
> - **ReqSuite**: Platform AI untuk analisis otomatis transkrip elicitation
> - **QualiWare**: Tool manajemen kebutuhan dengan traceability matrix
> - **MindManager**: Pemetaan kebutuhan berbasis visual thinking
>
> #### Bacaan Lanjutan
>
> - "Mastering the Requirements Process" oleh Suzanne & James Robertson
> - "Requirements Engineering: From System Goals to UML Models" oleh Axel van Lamsweerde
> - ISO/IEC/IEEE 29148:2018 Standard for Requirements Engineering
> - Tutorial Requirements Elicitation di Coursera oleh University of Alberta