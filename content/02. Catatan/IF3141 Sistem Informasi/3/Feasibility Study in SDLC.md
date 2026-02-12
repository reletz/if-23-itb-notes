---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[System Development LifeCycle]]

> [!cornell] Feasibility Study in SDLC
>
> > ## Questions/Cues
> >
> > - Mengapa feasibility study penting dalam SDLC?
> > - Jenis-jenis kelayakan apa yang dianalisis?
> > - Bagaimana menghitung Total Cost of Ownership?
> > - Perbedaan manfaat tangible vs intangible?
> > - Faktor yang memengaruhi durasi studi kelayakan?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Halaman 6-7)
>
> > ### Pengertian dan Tujuan Studi Kelayakan
> >
> > Studi kelayakan merupakan investigasi mendalam untuk mengevaluasi potensi keberhasilan proyek sistem informasi sebelum pengembangan dimulai. Proses ini membandingkan sumber daya dan biaya yang diperlukan dengan nilai yang akan diperoleh organisasi. Tujuannya adalah mendukung pengambilan keputusan apakah proyek layak dilanjutkan atau tidak berdasarkan analisis objektif.
> >
> > Contoh: Seperti membangun rumah, kita perlu memastikan tanah kuat, anggaran mencukupi, dan desain sesuai kebutuhan sebelum mulai konstruksi. Studi kelayakan dalam SDLC berfungsi sebagai "pemeriksaan realitas" untuk memverifikasi bahwa solusi teknologi yang diusulkan benar-benar dapat diwujudkan dan memberikan manfaat nyata.
> >
> > ### Jenis-Jenis Analisis Kelayakan
> >
> > **Kelayakan Teknis**: Mengevaluasi apakah teknologi yang diperlukan tersedia dan dapat diimplementasikan. Pertanyaan kunci: Apakah tim memiliki keahlian teknis? Apakah infrastruktur pendukung memadai? Apakah solusi memenuhi kebutuhan kinerja?
> >
> > **Kelayakan Ekonomi**: Menganalisis biaya vs manfaat melalui perhitungan Total Cost of Ownership (TCO) yang mencakup biaya pengembangan, lisensi, pelatihan, dan pemeliharaan. Manfaat dibagi menjadi tangible (kuantitatif seperti peningkatan pendapatan) dan intangible (kualitatif seperti kepuasan pelanggan).
> >
> > **Kelayakan Operasional**: Menilai kesiapan organisasi dalam mengadopsi sistem baru. Faktor yang dianalisis meliputi resistensi pengguna, dampak terhadap workflow, dan kebutuhan pelatihan. Contoh: Sistem ERP mungkin secara teknis canggih tetapi gagal jika staf tidak siap beralih dari proses manual.
> >
> > **Kelayakan Regulasi**: Memastikan sistem mematuhi peraturan industri dan standar legal seperti GDPR untuk perlindungan data atau PCI DSS untuk keamanan transaksi finansial.
> >
> > **Kelayakan Jadwal**: Mengevaluasi apakah proyek dapat diselesaikan dalam waktu yang ditentukan. Pertimbangan termasuk ketersediaan sumber daya, dependensi tugas, dan risiko penundaan.
> >
> > ### Metrik dan Perhitungan Penting
> >
> > **Return on Investment (ROI)** dihitung dengan rumus:
> >
> > `ROI = ((Manfaat Bersih - Biaya Total) / Biaya Total) × 100%`
> >
> > Proyek dengan ROI di atas ambang batas minimum (biasanya 15-20%) dianggap layak.
> >
> > **Total Cost of Ownership (TCO)** mencakup:
> >
> > - Biaya langsung: Pembelian hardware/software, pengembangan kustomisasi
> > - Biaya tidak langsung: Pelatihan, downtime selama implementasi, biaya dukungan teknis
> > - Biaya tersembunyi: Migrasi data, integrasi sistem legacy, biaya pemeliharaan jangka panjang
> >
> > Contoh kuantifikasi manfaat intangible: Peningkatan kepuasan pelanggan dapat diukur melalui pengurangan keluhan sebesar X% yang setara dengan penghematan biaya dukungan pelanggan sebesar Y juta rupiah per tahun.

> [!cornell] #### Summary
>
> **Studi kelayakan** merupakan fase kritis dalam SDLC yang menentukan kelanjutan proyek melalui analisis **lima dimensi kelayakan**: teknis, ekonomi, operasional, regulasi, dan jadwal. Proses ini menghitung **ROI** dengan membandingkan **TCO** terhadap manfaat tangible/intangible. Durasi studi bervariasi tergantung kompleksitas masalah, dimana proyek dengan **nilai strategis tinggi** memerlukan investigasi lebih mendalam. Hasil akhirnya adalah rekomendasi go/no-go yang didukung data kuantitatif dan kualitatif.

> [!ad-libitum]- Additional Information
>
> #### Analisis ROI Mendalam
>
> Teknik **Net Present Value (NPV)** digunakan untuk menilai profitabilitas proyek jangka panjang dengan mendiskontokan arus kas masa depan:
>
> ```
>
> NPV = Σ (Cash Flow_t / (1+r)^t) - Initial Investment
>
> ```
>
> Dimana r = discount rate, t = periode waktu. NPV > 0 menunjukkan proyek menguntungkan. **Payback Period** menghitung waktu yang dibutuhkan untuk mengembalikan investasi awal.
>
> #### Studi Kasus Implementasi
>
> **Kasus 1:** Bank ABC menghemat Rp 2,4 miliar/tahun setelah mengganti sistem legacy dengan solusi berbasis cloud. TCO 3 tahun = Rp 3,1 miliar, manfaat tangible = Rp 5,5 miliar → ROI = 77%.
>
> **Kasus 2:** Rumah Sakit XYZ membatalkan proyek EMR setelah studi kelayakan mengungkap ketidaksesuaian dengan protokol Kemenkes dan kebutuhan pelatihan staf yang melebihi anggaran.
>
> #### Teknik Kuantifikasi Manfaat Intangible
>
> 1. **Analisis Biaya-Kegagalan**: Estimasi kerugian jika sistem tidak diimplementasikan (misal: kehilangan pelanggan karena layanan ketinggalan zaman)
> 2. **Penilaian Pakar**: Workshop dengan stakeholder untuk memberi skor manfaat (1-10) lalu dikonversi ke nilai moneter
> 3. **Analisis Komparatif**: Benchmarking dengan organisasi sejenis yang sudah mengimplementasikan sistem serupa
>
> #### Alat Bantu Analisis
>
> - **Microsoft Project**: Simulasi jadwal dan alokasi sumber daya
> - **IBM Rational DOORS**: Manajemen persyaratan dan analisis dampak
> - **Monte Carlo Simulation**: Pemodelan risiko finansial dengan variabel acak
> - **SWOT Matrix**: Evaluasi Strengths, Weaknesses, Opportunities, Threats
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis studi kelayakan sistem e-learning untuk universitas dengan 10.000 mahasiswa. Hitung TCO, buat asumsi manfaat, dan tentukan payback period.
> 2. Bandingkan kelayakan implementasi SaaS vs on-premise ERP untuk UMKM di sektor manufaktur.
> 3. Lakukan risk assessment untuk proyek sistem IoT dalam smart farming dengan metode FMEA (Failure Mode and Effects Analysis).
>
> #### Bacaan Lanjutan
>
> - Parker, M. (2020). *IT Strategic Planning: Practical Tools for Digital Transformation*. Wiley.
> - Marchewka, J.T. (2016). *Information Technology Project Management*. Wiley.
> - Framework COBIT 2019 untuk Tata Kelola TI (ISACA)
> - Pedoman Studi Kelayakan TI (Kementerian Komunikasi dan Informatika RI)