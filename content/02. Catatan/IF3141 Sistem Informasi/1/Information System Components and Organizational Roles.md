---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Information System Components and Organizational Roles
>
> > ## Questions/Cues
> >
> > - Mengapa brainware menjadi komponen kritis dalam SI?
> > - Bagaimana perbedaan data mentah dan informasi?
> > - Fungsi sistem informasi dalam mendukung hierarki organisasi
> > - Hubungan sistem kerja dan sistem informasi menurut Alter
> > - Kriteria efektivitas sistem informasi organisasional
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi Konsep (Slides 2-25)
>
> > ### Komponen Sistem Informasi
> >
> > Sistem Informasi (SI) merupakan integrasi kompleks dari lima komponen utama yang saling mendukung:
> >
> > 1. **Technoware**: Meliputi hardware, software, jaringan, dan infrastruktur TI yang berfungsi sebagai fondasi teknis. Contoh: server untuk penyimpanan data, aplikasi ERP untuk manajemen operasi.
> > 2. **Infoware**: Teknologi pendukung untuk pengembangan dan operasi SI seperti tools manajemen basis data atau platform integrasi sistem.
> > 3. **Organoware**: Struktur organisasi, kebijakan, dan prosedur standar yang mengatur penggunaan SI. Contoh: SOP input data pelanggan di sistem CRM.
> > 4. **Brainware**: Sumber daya manusia meliputi pengguna (end-user), pengelola (admin sistem), dan pengembang (tim IT). Contoh: kasir menggunakan mesin POS, analis data mengolah laporan penjualan.
> > 5. **Sumber Daya Data**: Terdiri dari data mentah (transaksi harian) dan informasi terproses (laporan kinerja triwulan).
> >
> > Setiap komponen harus terintegrasi secara sinergis. Misalnya di supermarket: technoware (scanner barcode), organoware (prosedur stock opname), brainware (staff gudang), dan data (riwayat penjualan) bekerja bersama untuk optimasi inventaris.
> >
> > ### Peran dalam Hierarki Organisasi
> >
> > Sistem informasi melayani tiga level organisasi dengan kebutuhan berbeda:
> >
> > - **Level Operasional**: Memproses transaksi rutin seperti pemesanan barang, pembayaran gaji, atau pendaftaran anggota. Contoh: Sistem TPS (Transaction Processing System) di bank untuk transaksi nasabah.
> > - **Level Manajerial**: Menyediakan laporan analitis untuk pengambilan keputusan taktis. Contoh: Sistem MIS (Management Information System) yang menghasilkan analisis tren penjualan per region.
> > - **Level Strategis**: Mendukung perencanaan jangka panjang dengan simulasi dan prediksi. Contoh: Sistem EIS (Executive Information System) untuk analisis ekspansi pasar.
> >
> > Sistem yang baik harus memenuhi kebutuhan setiap level tanpa redundansi. Misalnya, data transaksi dari level operasional diagregasi menjadi laporan manajerial, kemudian dianalisis lebih lanjut untuk strategi perusahaan.
> >
> > ### Fungsi Utama Sistem Informasi
> >
> > Memiliki tiga peran temporal krusial:
> >
> > 1. **Merekam Histori**: Menyimpan data masa lalu sebagai basis analisis. Contoh: arsip transaksi 5 tahun terakhir untuk perhitungan pertumbuhan bisnis.
> > 2. **Mengelola Operasional**: Mengotomasi proses bisnis real-time. Contoh: sistem inventory yang otomatis mengurangi stok saat terjadi penjualan.
> > 3. **Memprediksi Masa Depan**: Memfasilitasi perencanaan melalui pemodelan. Contoh: algoritma forecasting berdasarkan data historis dan variabel pasar.
> >
> > Integrasi ketiga fungsi ini menciptakan SI yang responsif. Contoh: sistem e-commerce yang merekam transaksi (fungsi 1), memproses pembayaran (fungsi 2), dan merekomendasikan produk (fungsi 3).
> >
> > ### Kriteria Kualitas Sistem Informasi
> >
> > Harus memenuhi enam parameter utama:
> >
> > 1. **Efektivitas**: Informasi relevan dan tepat waktu. Contoh: laporan defek produk sampai ke tim QA dalam 1 jam setelah terdeteksi.
> > 2. **Efisiensi**: Penggunaan sumber daya optimal. Contoh: kompresi data mengurangi penyimpanan tanpa kehilangan informasi penting.
> > 3. **Kerahasiaan**: Proteksi akses data. Contoh: enkripsi data payroll hanya bisa dibuka oleh departemen keuangan.
> > 4. **Integritas**: Akurasi dan kelengkapan data. Contoh: validasi input mencegah entri tanggal lahir tidak logis.
> > 5. **Ketersediaan**: Aksesibilitas tinggi. Contoh: redundansi server menjaga sistem tetap online jika ada gangguan.
> > 6. **Kepatuhan**: Sesuai regulasi. Contoh: sistem HR memenuhi UU Ketenagakerjaan dalam penyimpanan data karyawan.
> >
> > Contoh implementasi: Sistem kesehatan elektronik harus memastikan rekam medis akurat (integritas), hanya diakses dokter yang menangani (kerahasiaan), dan tersedia saat emergency (ketersediaan).

> [!cornell] #### Summary
>
> Sistem Informasi merupakan **integrasi lima komponen utama** (technoware, infoware, organoware, brainware, data) yang berfungsi untuk **merekam historis, mengelola operasional, dan memprediksi masa depan** organisasi. Efektivitas SI diukur melalui **enam parameter kualitas** mencakup aspek teknis dan organisasional, dengan penekanan pada **keselarasan antara kebutuhan bisnis dan kemampuan teknologi**. Keterlibatan **brainware** sebagai pengelola dan pengguna menjadi faktor penentu keberhasilan implementasi.

> [!ad-libitum]- Additional Information
>
> #### Model Sistem Kerja Alter
>
> Menurut Alter, SI merupakan bagian dari sistem kerja yang melibatkan interaksi manusia-mesin. Sistem kerja memiliki komponen:
>
> - **Partisipan**: Manusia dan/atau mesin
> - **Tugas**: Aktivitas yang dilakukan
> - **Teknologi**: Perangkat pendukung
> - **Struktur**: Hubungan antar komponen
>
> SI berperan sebagai subsistem yang khusus menangani siklus informasi. Contoh: Dalam sistem kerja rumah sakit, SI rekam medis mendukung tugas perawat dan dokter melalui teknologi database.
>
> #### Klasifikasi Teknologi Pendukung
>
> 1. **Development Tools**: Bahasa pemrograman, framework (contoh: Django untuk pengembangan web)
> 2. **Integration Middleware**: Platform seperti Apache Kafka untuk integrasi sistem heterogen
> 3. **Compliance Tools**: Software audit keamanan (contoh: Nessus untuk vulnerability scanning)
>
> #### Studi Kasus: Kegagalan Integrasi Komponen
>
> Kasus peluncuran sistem ERP di retailer besar gagal karena ketidakselarasan komponen:
>
> - **Technoware**: Software terlalu kompleks
> - **Organoware**: Tidak ada pelatihan SOP
> - **Brainware**: Staf resisten terhadap perubahan
> - **Data**: Format tidak kompatibel dengan sistem lama
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis komponen SI di perusahaan lokal: Identifikasi technoware, organoware, brainware, dan bagaimana interaksinya. Dokumentasikan gap antara desain dan implementasi.
> 2. Simulasi kegagalan komponen: Bangun model sederhana SI dengan Python, lalu uji efek jika salah satu komponen (misal: brainware) dihilangkan.
>
> #### Alat dan Framework
>
> - **ArchiMate**: Tools pemodelan arsitektur SI
> - **ITIL Framework**: Best practices manajemen layanan TI
> - **BPMN 2.0**: Standar pemodelan proses bisnis
>
> #### Bacaan Lanjutan
>
> - Alter, S. (2008). *Service System Fundamentals: Work System, Value Chain, and Life Cycle*. IBM Systems Journal.
> - O'Brien, J. A. & Marakas, G. M. *Management Information Systems*. Bab 2: Komponen SI.
> - Tutorialspoint: https://www.tutorialspoint.com/management_information_system