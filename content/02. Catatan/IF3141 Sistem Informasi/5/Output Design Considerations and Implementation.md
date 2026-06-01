---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] Output Design Considerations and Implementation
>
> > ## Questions/Cues
> >
> > - Mengapa efisiensi menjadi prioritas dalam desain output?
> > - Bagaimana memastikan relevansi informasi dalam output?
> > - Teknologi output apa yang cocok untuk pengguna tunanetra?
> > - Kapan menggunakan output jenis exception report?
> > - Faktor apa saja yang memengaruhi biaya produksi output?
> >
> > ## Reference Points
> >
> > - Lecture_01_System_Design.pptx (Halaman 17-22)
> > - Advanced_System_Design.pdf (Halaman 34-39)
>
> > ### Pertimbangan Desain Output
> >
> > Desain output yang efektif memerlukan analisis mendalam terhadap tujuh faktor kritis. **Efisiensi** mengacu pada penggunaan optimal sumber daya seperti daya listrik, memori, dan bahan habis pakai (kertas, tinta). Contoh nyata: desain laporan yang meminimalkan halaman kosong mengurangi konsumsi kertas hingga 30%. **Keandalan dan waktu** menjamin ketersediaan output saat dibutuhkan, seperti laporan harian yang harus siap sebelum rapat pagi.
> >
> > **Akurasi** memastikan data yang ditampilkan mutakhir dan benar, terutama untuk output keuangan atau medis. **Kemudahan penggunaan** melibatkan penyajian informasi yang intuitif, misalnya menggunakan grafik warna-warni untuk data statistik. **Kejelasan** adalah turunan dari usability yang mensyaratkan format konsisten tanpa perlu panduan tambahan. **Relevansi** membatasi output hanya pada data esensial - laporan penjualan tidak perlu mencantumkan nomor telepon pelanggan kecuali diperlukan.
> >
> > **Kualitas** output ditentukan oleh audiens target. Laporan eksternal untuk regulator memerlukan desain profesional dengan logo perusahaan, berbeda dengan catatan internal. **Biaya** produksi harus proporsional dengan manfaat, contohnya cetak dokumen berwarna hanya untuk presentasi klien penting.
> >
> > ### Teknologi Output Umum
> >
> > Pemilihan teknologi output didasarkan pada konteks penggunaan dan kebutuhan pengguna. **Monitor** (LCD, LED, OLED) cocok untuk output interaktif real-time seperti dashboard manajemen. **Printer** laser untuk volume tinggi, inkjet untuk dokumen berwarna, dan thermal untuk struk transaksi. **Pembicara dan headphone** menjadi solusi bagi pengguna tunanetra, terutama untuk sistem informasi publik.
> >
> > Teknologi digital seperti **SMS/MMS** digunakan untuk notifikasi pelanggan, sementara **email** untuk komunikasi formal. **Media penyimpanan** (SSD, cloud storage) ideal untuk arsip jangka panjang. Format **XML** memfasilitasi pertukaran data antar sistem berbeda, contohnya antara sistem akuntansi dan inventory. Studi kasus: rumah sakit menggunakan kombinasi monitor LCD di ruang operasi, printer thermal untuk label obat, dan SMS untuk pengingat janji pasien.
> >
> > ### Jenis Antarmuka Output
> >
> > Terdapat lima pola dasar antarmuka output yang disesuaikan dengan kebutuhan bisnis. **On-demand** diproduksi saat dibutuhkan untuk query ad-hoc, seperti laporan stok barang tertentu. **Summary** menyajikan agregat data (total penjualan kuartal) tanpa detail transaksi. **Exception report** menyoroti kondisi abnormal yang memerlukan tindakan, contohnya inventori di bawah level aman.
> >
> > **Data dump** mengekspor data mentah untuk analisis lanjutan di tools seperti Excel atau Power BI. **Archive** dibuat saat data tidak lagi aktif di sistem utama namun perlu disimpan untuk kepatuhan regulasi. Contoh implementasi: sistem perbankan menghasilkan laporan transaksi mencurigakan (exception) otomatis setiap pagi, sementara laporan tahunan (summary) dibuat on-demand.
> >
> > ### Kriteria Pemilihan Teknologi Output
> >
> > Proses seleksi teknologi output melibatkan empat dimensi analisis. **Aplikasi** menentukan format output - sistem control panel pabrik membutuhkan monitor tahan debu, sedangkan aplikasi mobile memerlukan tampilan responsif. **Konstrain pengguna dan lingkungan**: pekerja lapangan membutuhkan perangkat genggam tahan air, ruang server memerlukan monitor jarak jauh.
> >
> > **Keterbatasan fisik pengguna** mempengaruhi pilihan teknologi. Sistem informasi publik harus menyediakan output audio untuk tunanetra dan touchscreen besar untuk lansia. **Biaya** meliputi investasi awal dan operasional - proyektor laser mungkin mahal tetapi lebih hemat energi jangka panjang. Studi kasus: museum menggunakan QR code + audio guide sebagai solusi output biaya efektif untuk pengunjung.

> [!cornell] #### Summary
>
> **Desain output** yang efektif mempertimbangkan tujuh aspek kritis: efisiensi, keandalan, akurasi, usability, kejelasan, relevansi, dan biaya. Pemilihan teknologi output (monitor, printer, digital) harus disesuaikan dengan **konteks aplikasi**, **kebutuhan pengguna**, dan **keterbatasan lingkungan**. Lima pola antarmuka utama (on-demand, summary, exception, data dump, archive) memenuhi kebutuhan bisnis berbeda dengan **prioritas pada informasi esensial**. Implementasi yang sukses memerlukan analisis biaya-manfaat dan **aksesibilitas untuk pengguna berkebutuhan khusus**.

> [!ad-libitum]- Additional Information
>
> #### Standar Teknis dan Regulasi
>
> Desainer output harus mematuhi standar industri seperti ISO 27001 untuk keamanan informasi dan spesifikasi XML untuk pertukaran data antar sistem. Format PDF/A menjadi standar internasional untuk dokumentasi arsip jangka panjang karena kompatibilitas lintas platform. Standar aksesibilitas WCAG 2.1 mensyaratkan rasio kontras minimum 4.5:1 untuk teks pada layar.
>
> Implementasi output untuk industri spesifik memiliki regulasi ketat: laporan keuangan mengikuti PSAK, label obat wajib memenuhi persyaratan BPOM. Pelanggaran standar dapat berakibat hukum serius, contohnya denda GDPR sebesar 4% pendapatan global untuk kebocoran data pribadi.
>
> #### Interoperabilitas dan Pertukaran Data
>
> Sistem modern menggunakan middleware berbasis REST API atau SOAP untuk integrasi output antar platform. Protokol MQTT menjadi standar de facto untuk output perangkat IoT karena footprint ringan. Contoh implementasi: sistem ERP terintegrasi dengan aplikasi mobile melalui JSON API, memungkinkan notifikasi real-time ke manajemen.
>
> Tantangan utama meliputi sinkronisasi data real-time dan penanganan versi skema berbeda. Solusi menggunakan version control untuk definisi skema XML dan mekanisme fallback untuk kompatibilitas mundur. Tools seperti Apache Kafka memfasilitasi streaming output data volum tinggi antar sistem.
>
> #### Kontrol Output dan Audit
>
> Mekanisme kontrol mencakup **control totals** untuk memverifikasi kelengkapan output, misalnya jumlah halaman laporan. **Pre-numbering** pada dokumen resmi (faktur, cek) mencegah pemalsuan. **Spot checks** menggunakan sampling statistik untuk mendeteksi anomaly pada output volum besar.
>
> Audit trail output harus mencatat: identitas pembuat, waktu generasi, dan penerima. Sistem enterprise menggunakan digital signature dan watermark untuk autentikasi dokumen. Contoh implementasi: sistem perpajakan menghasilkan hash SHA-256 untuk setiap laporan sebagai bukti integritas.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun dashboard interaktif menggunakan Power BI/Tableau dengan data sampel penjualan. Eksperimen dengan berbagai visualisasi (heatmap, trendline) dan ukur waktu pemahaman pengguna.
> 2. Implementasi sistem notifikasi multi-channel (email, SMS, push notification) dengan Python dan Twilio API. Bandingkan deliverability dan latency masing-masing channel.
>
> #### Tools dan Resources
>
> - XMLSpy (editor XML untuk definisi skema output)
> - Apache FOP (tools generasi PDF dari XML)
> - Google Charts API (visualisasi data web-based)
> - NVDA screen reader (testing aksesibilitas output)
>
> #### Bacaan Lanjutan
>
> - "Designing Data-Intensive Applications" oleh Martin Kleppmann (Bab 11: Output Systems)
> - ISO 9241-210:2019 Ergonomics of human-system interaction
> - Pedoman Aksesibilitas Konten Web (WCAG) 2.1
> - Dokumentasi Resmi OASIS untuk Standar XML