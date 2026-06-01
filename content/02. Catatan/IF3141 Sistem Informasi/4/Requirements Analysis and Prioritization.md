---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Rekayasa Kebutuhan Perangkat Lunak]]

> [!cornell] Requirements Analysis and Prioritization
>
> > ## Questions/Cues
> >
> > - Mengapa analisis kebutuhan penting dalam pengembangan sistem?
> > - Apa perbedaan antara kebutuhan fungsional dan non-fungsional?
> > - Bagaimana teknik MoSCoW digunakan dalam prioritisasi?
> > - Kriteria apa saja yang menentukan kualitas kebutuhan?
> > - Bagaimana konflik antar kebutuhan diidentifikasi dan diselesaikan?
> > - Mengapa pemodelan diperlukan dalam analisis kebutuhan?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 24-34)
> > - Chaos Chronicles, III, 2003 (Slide 2)
>
> > ### Definisi Analisis Kebutuhan
> >
> > Analisis kebutuhan adalah proses sistematis untuk menguji, menyempurnakan, menyusun, dan memprioritaskan kebutuhan yang telah dikumpulkan guna memastikan kelengkapan, kejelasan, dan kelayakan implementasi. Proses ini mentransformasi kebutuhan "mentah" menjadi spesifikasi berkualitas tinggi yang dapat memandu perancangan dan pengembangan sistem.
> >
> > Analogi penting dalam proses ini adalah seperti seorang arsitek yang mengubah daftar keinginan klien menjadi blueprint teknis yang terukur. Tanpa analisis mendalam, kebutuhan yang ambigu atau bertentangan dapat menyebabkan kegagalan sistem di kemudian hari. Data dari Meta Group (2003) menunjukkan bahwa 60-70% kegagalan proyek TI disebabkan oleh kelemahan dalam penentuan dan analisis kebutuhan.
> >
> > ### Tujuan Analisis Kebutuhan
> >
> > Proses analisis memiliki beberapa tujuan kritis:
> >
> > 1. **Memastikan kejelasan dan konsistensi** - Mengubah pernyataan ambigu menjadi spesifikasi terukur (misal: mengganti "sistem harus cepat" dengan "waktu respons maksimal 2 detik")
> > 2. **Mendeteksi dan menyelesaikan konflik** - Mengidentifikasi kebutuhan yang saling bertentangan sebelum implementasi
> > 3. **Menetapkan prioritas** - Menentukan urutan implementasi berdasarkan nilai bisnis dan kelayakan teknis
> > 4. **Memastikan keterujian** - Setiap kebutuhan harus memiliki kriteria penerimaan yang terukur
> > 5. **Membangun kemampuan pelacakan** - Menghubungkan setiap kebutuhan dengan sumber stakeholder dan solusi akhir
> >
> > ### Aktivitas Kunci dalam Analisis
> >
> > ### Klarifikasi & Penyempurnaan
> >
> > Proses membersihkan bahasa yang ambigu dengan teknik "5 Why". Contoh transformasi kebutuhan:
> >
> > - Sebelum: "Sistem harus mudah digunakan"
> > - Sesudah: "90% pengguna baru harus dapat menyelesaikan pendaftaran mandiri dalam 3 menit tanpa bantuan"
> >
> > ### Kategorisasi
> >
> > Pengelompokan kebutuhan berdasarkan jenis:
> >
> > - **Fungsional**: Perilaku sistem (misal: "Sistem harus mengirim notifikasi saat invoice terlambat")
> > - **Non-fungsional**: Kualitas sistem menggunakan kerangka PIECES:
> > - **P**erformance (Kinerja)
> > - **I**nformation (Manajemen Informasi)
> > - **E**conomy (Penghematan Biaya)
> > - **C**ontrol (Pengendalian)
> > - **E**fficiency (Efisiensi)
> > - **S**ervice (Layanan)
> >
> > ### Validasi Karakteristik Kebutuhan Baik
> >
> > Mengevaluasi kebutuhan menggunakan checklist 12 kriteria:
> >
> > 1. Relevan dengan lingkup proyek
> > 2. Dapat dicapai secara teknis
> > 3. Jelas dan tidak ambigu
> > 4. Dapat diuji
> > 5. Fokus pada kebutuhan bukan solusi
> > 6. Konsisten dengan kebutuhan lain
> > 7. Kepemilikan jelas
> > 8. Unik dan atomik
> > 9. Dapat dilacak
> > 10. Ringkas
> > 11. Lengkap
> > 12. Sesuai standar organisasi
> >
> > ### Pemodelan
> >
> > Penggunaan diagram untuk memvisualisasikan hubungan kompleks:
> >
> > - Diagram aliran data (Data Flow Diagram)
> > - Diagram kasus penggunaan (Use Case Diagram)
> > - Model entitas-relasi (Entity-Relationship Diagram)
> >
> > Contoh: Pemodelan proses pembayaran untuk mengidentifikasi titik kegagalan potensial.
> >
> > ### Prioritisasi dengan MoSCoW
> >
> > Teknik klasifikasi empat tingkat:
> >
> > - **Must Have**: Fundamental (misal: fungsi pencatatan inventori)
> > - **Should Have**: Penting tapi bisa ditunda implementasi
> > - **Could Have**: Diinginkan tapi tidak esensial
> > - **Won't Have**: Ditunda untuk versi berikutnya
> >
> > Kriteria prioritisasi meliputi nilai bisnis, dampak teknis, dan ketergantungan antar kebutuhan.

> [!cornell] #### Summary
>
> **Analisis kebutuhan** merupakan proses kritis yang mentransformasi kebutuhan mentah menjadi spesifikasi teknis melalui klarifikasi, kategorisasi, dan validasi karakteristik kualitas. Teknik **prioritisasi MoSCoW** membantu mengalokasikan sumber daya terbatas dengan memfokuskan pada kebutuhan paling kritis (Must Have) terlebih dahulu. Keberhasilan analisis ditentukan oleh kemampuan menghasilkan kebutuhan yang **jelas, terukur, konsisten, dan dapat dilacak**, serta mengantisipasi potensi konflik sejak tahap awal. Proses ini secara langsung mempengaruhi **60-70% kesuksesan proyek** menurut studi Meta Group.

> [!ad-libitum]- Additional Information
>
> #### Studi Kasus Kompleks Prioritisasi
>
> Dalam proyek enterprise dengan 500+ kebutuhan, teknik kombinasi MoSCoW dan matriks Kano dapat mengatasi keterbatasan prioritisasi linier. Matriks Kano mengklasifikasikan kebutuhan berdasarkan dampaknya terhadap kepuasan pengguna:
>
> - Basic Needs (harus ada)
> - Performance Needs (semakin banyak semakin baik)
> - Excitement Needs (pembeda kompetitif)
>
> Contoh konflik: Kebutuhan keamanan tinggi (Must Have) vs kebutuhan kemudahan akses (Should Have). Solusi: Implementasi autentikasi bertingkat dengan opsi SSO (Single Sign-On) untuk pengguna terdaftar.
>
> #### Alat Bantu Analisis Lanjutan
>
> 1. **Requirements Traceability Matrix (RTM)**: Melacak hubungan kebutuhan dari sumber bisnis hingga test case
> 2. **Decision Tree Analysis**: Memetakan keputusan kompleks berdasarkan kondisi bisnis
> 3. **QFD (Quality Function Deployment)**: Menerjemahkan kebutuhan pelanggan ke spesifikasi teknis
>
> #### Tantangan Praktis
>
> - **Masalah false consensus**: Stakeholder menyetujui kebutuhan ambigu untuk menghindari konflik
> - **Efek anchoring**: Prioritisasi terpengaruh urutan penyampaian kebutuhan
> - **Keterbatasan kognitif**: Rata-rata manusia hanya dapat membandingkan 7±2 kebutuhan sekaligus secara efektif
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis kasus kegagalan sistem NHS UK: Identifikasi 5 kesalahan analisis kebutuhan pada proyek NPfIT
> 2. Bangun matriks prioritisasi untuk aplikasi e-commerce dengan 50 fitur menggunakan kombinasi MoSCoW dan Kano
> 3. Eksperimen A/B testing untuk mengukur dampak kebutuhan non-fungsional (waktu respons) terhadap konversi pengguna
>
> #### Bacaan Lanjutan
>
> - Wiegers, K. & Beatty, J. (2013). "Software Requirements"
> - Robertson, S. & Robertson, J. (2012). "Mastering the Requirements Process"
> - Leffingwell, D. (2011). "Agile Software Requirements"
> - ISO/IEC/IEEE 29148:2018 Standard untuk dokumentasi kebutuhan