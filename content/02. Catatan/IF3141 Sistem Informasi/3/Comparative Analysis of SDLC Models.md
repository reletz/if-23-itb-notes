---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Sistem Informasi]]

> [!cornell] Analisis Komparatif Model SDLC
>
> > ## Questions/Cues
> >
> > - Mengapa model Waterfall cocok untuk kebutuhan stabil?
> > - Bagaimana model Spiral mengelola risiko proyek?
> > - Kapan sebaiknya menggunakan pendekatan Incremental?
> > - Perbedaan utama antara model V dan Waterfall
> > - Keuntungan model Iterative untuk proyek kompleks
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slide 20-34)
> > - Materi Tambahan SDLC (Halaman 15-28)
>
> > ### Model SDLC Linier
> >
> > Model SDLC linier mengikuti urutan tahapan yang kaku dimana setiap fase harus diselesaikan sepenuhnya sebelum melanjutkan ke tahap berikutnya. Pendekatan ini cocok untuk proyek dengan kebutuhan yang stabil dan sudah dipahami dengan baik sejak awal. Contoh implementasinya adalah model Waterfall yang sering digunakan dalam pengembangan sistem yang membutuhkan prediktabilitas tinggi seperti sistem keuangan bank.
> >
> > Kelebihan utama model ini adalah kemudahan dalam mengelola proyek karena struktur yang jelas dan milestones yang terdefinisi. Namun kekurangannya terletak pada ketidakfleksibelannya terhadap perubahan kebutuhan selama pengembangan, dimana modifikasi di tengah proses dapat menyebabkan pembengkakan biaya dan waktu. Analoginya seperti membangun rumah dimana fondasi harus selesai sempurna sebelum mulai mendirikan dinding.
> >
> > ### Model Waterfall
> >
> > Model Waterfall merupakan contoh klasik pendekatan linier dengan tahapan berurutan: perencanaan, analisis, desain, implementasi, pengujian, dan pemeliharaan. Cocok untuk proyek skala kecil hingga menengah dengan kebutuhan yang tidak berubah. Contoh nyata adalah pengembangan sistem payroll perusahaan dimana persyaratan bisnis sudah stabil.
> >
> > Keunggulan utamanya adalah dokumentasi yang komprehensif di setiap tahap, memudahkan pelacakan kemajuan proyek. Namun model ini berisiko tinggi jika terjadi perubahan kebutuhan di fase akhir karena sulit untuk kembali ke tahap sebelumnya. Seperti kereta api yang harus mengikuti rel yang sudah ditetapkan sejak awal perjalanan.
> >
> > ### Model V
> >
> > Model V (V-Model) memperkuat pendekatan Waterfall dengan menekankan verifikasi dan validasi paralel di setiap tahap pengembangan. Setiap fase desain memiliki fase pengujian yang terkait langsung, membentuk pola huruf 'V'. Contoh aplikasinya pada sistem keselamatan pesawat terbang dimana kualitas kritis.
> >
> > Kelebihan utama adalah jaminan kualitas melalui pengujian yang ketat sejak awal. Namun memerlukan sumber daya lebih besar untuk menyiapkan dokumen pengujian di awal proyek. Analoginya seperti pemeriksaan kualitas di setiap stasiun kerja pabrik, bukan hanya di akhir proses produksi.
> >
> > ### Pendekatan Incremental
> >
> > Model Incremental membagi sistem menjadi modul-modul yang dikembangkan dan dikirimkan secara bertahap. Setiap increment merupakan sistem fungsional yang dapat digunakan. Contoh implementasi: pengembangan sistem ERP dimana modul HR dikirim terlebih dahulu sebelum modul Finance.
> >
> > Keuntungan utamanya adalah pengguna mendapatkan manfaat lebih cepat dari sebagian sistem yang sudah berfungsi. Risiko proyek juga dapat diminimalkan dengan menyelesaikan bagian paling kritis terlebih dahulu. Tantangannya terletak pada kebutuhan desain arsitektur yang matang di awal untuk memastikan integrasi antar modul.
> >
> > ### Model Iteratif
> >
> > Model iteratif mengembangkan sistem melalui serangkaian siklus pendek (iterasi) yang menghasilkan versi lebih lengkap secara progresif. Setiap iterasi mencakup semua tahap SDLC dalam skala kecil. Cocok untuk proyek dengan kebutuhan yang belum sepenuhnya terdefinisi seperti pengembangan aplikasi startup.
> >
> > Keunggulan utama adalah fleksibilitas dalam mengakomodasi perubahan kebutuhan dan umpan balik pengguna. Namun memerlukan manajemen proyek yang ketat untuk menghindari scope creep. Contoh implementasi: pengembangan aplikasi mobile dimana fitur dasar dirilis dulu kemudian disempurnakan berdasarkan masukan pengguna.
> >
> > ### Model Spiral
> >
> > Model Spiral menggabungkan pendekatan iteratif dengan analisis risiko terstruktur. Setiap spiral terdiri dari empat kuadran: identifikasi tujuan, analisis risiko, pengembangan, dan perencanaan iterasi berikutnya. Ideal untuk proyek besar dengan risiko tinggi seperti sistem pertahanan.
> >
> > Kelebihan utamanya adalah fokus pada mitigasi risiko sejak awal melalui prototipe dan evaluasi berkelanjutan. Kekurangannya adalah kompleksitas manajemen dan biaya lebih tinggi karena banyaknya iterasi. Contoh implementasi: sistem kontrol lalu lintas udara yang memerlukan validasi keamanan berlapis.

> [!cornell] #### Summary
>
> **Model SDLC linier** seperti Waterfall dan V-Model cocok untuk proyek dengan **kebutuhan stabil** dan memerlukan dokumentasi ketat, sedangkan **model evolusioner** seperti Iterative dan Spiral lebih fleksibel untuk **proyek kompleks** dengan kebutuhan dinamis. Pendekatan **Incremental** menawarkan keseimbangan dengan memberikan **nilai bisnis lebih cepat** melalui pengiriman modul bertahap. **Pemilihan model** harus mempertimbangkan faktor kompleksitas sistem, stabilitas kebutuhan, tingkat risiko, dan ketersediaan sumber daya tim pengembang.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Mendalam
>
> Tabel perbandingan teknis model SDLC berdasarkan parameter kunci:
>
> | Parameter         | Waterfall | V-Model | Incremental | Iterative | Spiral     |
>
> |-------------------|-----------|---------|-------------|-----------|------------|
>
> | Fleksibilitas     | Rendah    | Rendah  | Sedang      | Tinggi    | Sangat Tinggi |
>
> | Manajemen Risiko  | Reaktif   | Proaktif| Sedang      | Proaktif  | Sangat Proaktif |
>
> | Time to Market    | Lambat    | Lambat  | Cepat (partial) | Cepat (MVP) | Variatif   |
>
> | Biaya Perubahan   | Sangat Tinggi | Tinggi | Sedang      | Rendah    | Rendah     |
>
> | Kompleksitas Manajemen | Rendah  | Sedang  | Sedang      | Tinggi    | Sangat Tinggi |
>
> #### Studi Kasus Industri
>
> 1. **Sistem Perbankan Inti**: Menggunakan kombinasi Waterfall untuk modul transaksi dasar dan Iterative untuk fitur digital banking
> 2. **Pengembangan Game AAA**: Model Spiral dengan iterasi untuk gameplay mechanics dan graphic engine
> 3. **Sistem Embedded**: V-Model untuk memastikan compliance dengan standar keselamatan ISO 26262
>
> #### Teknik Hybrid SDLC
>
> Kombinasi model untuk memaksimalkan keunggulan masing-masing pendekatan:
>
> - **Waterfall-Agile**: Desain arsitektur menggunakan Waterfall, implementasi fitur dengan Agile
> - **V-Model Incremental**: Verifikasi modular dengan pengiriman bertahap
> - **Spiral-Waterfall**: Analisis risiko spiral untuk fase awal, implementasi terkontrol dengan Waterfall
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis studi kasus kegagalan proyek IT karena kesalahan pemilihan model SDLC
> 2. Implementasi sistem sederhana dengan 3 model berbeda dan bandingkan hasilnya
> 3. Simulasi manajemen perubahan kebutuhan pada berbagai model SDLC menggunakan tools seperti Jira
>
> #### Alat Bantu Implementasi
>
> - **Visual Paradigm**: Tools untuk pemodelan proses bisnis dan diagram UML
> - **Jira + Confluence**: Manajemen proyek Agile dengan dokumentasi terintegrasi
> - **IBM Rational DOORS**: Manajemen kebutuhan untuk proyek berbasis V-Model
>
> #### Bacaan Lanjutan
>
> - "Software Engineering: A Practitioner's Approach" oleh Roger Pressman (Bab 4-5)
> - "Clean Agile: Back to Basics" karya Robert C. Martin
> - Standar IEEE 12207 untuk proses siklus hidup perangkat lunak
> - Riset terbaru tentang adaptasi SDLC untuk proyek AI/ML (arXiv:2108.07861)