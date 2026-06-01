---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] Data, Information, and Knowledge Fundamentals
>
> > ## Questions/Cues
> >
> > - Apa perbedaan mendasar antara data dan informasi?
> > - Mengapa makna informasi bersifat relatif?
> > - Bagaimana pengetahuan terbentuk dari informasi?
> > - Apa karakteristik pekerja berpengetahuan (knowledge worker)?
> > - Apa 3 dimensi kualitas informasi secara personal?
> >
> > ## Reference Points
> >
> > - Slide_Materi_IF3141 (Slides 1-21)
>
> > ### Definisi Data
> >
> > Data merupakan fakta mentah yang belum diproses, terdiri dari simbol-simbol yang merepresentasikan fenomena tertentu. Data dapat berbentuk nilai terformat (tanggal, waktu), teks, citra, audio, atau video. Contoh konkret: angka 35, 37, 39 pada jam tertentu (Slide 2). Data bersifat objektif namun belum memiliki makna - seperti deret angka suhu tubuh tanpa konteks waktu pengukuran (Slide 4).
> >
> > Penting dipahami bahwa data yang relevan berbeda berdasarkan kepentingan pengguna. Data curah hujan penting untuk petani tapi mungkin tidak relevan bagi programmer (Slide 2). Contoh lain: rekaman CCTV mentah adalah data yang baru menjadi informasi ketika diidentifikasi kejadian tertentu.
> >
> > ### Hakikat Informasi
> >
> > Informasi adalah data yang telah diproses sehingga meningkatkan pengetahuan pengguna (McFadden, 1999). Shannon & Weaver mendefinisikannya sebagai "pengurangan ketidakpastian" - contoh: laporan suhu tubuh pasien yang menunjukkan tren demam membantu dokter mengambil keputusan (Slide 3-4).
> >
> > Makna informasi bersifat relatif tergantung konteks pemakai. Laporan keuangan berarti bagi akuntan tapi tidak bagi anak kecil (Slide 8). Davis (1999) mengidentifikasi lima kandungan informasi: (1) Kebenaran fakta, (2) Kebaruan, (3) Pembaharuan data lama, (4) Koreksi kesalahan, (5) Penegasan keyakinan (Slide 9). Contoh: pemberitahuan perubahan jadwal kuliah mengandung unsur pembaharuan dan koreksi.
> >
> > ### Konstruksi Pengetahuan
> >
> > Pengetahuan terbentuk dari kombinasi informasi, pengalaman, dan keahlian yang mengarah pada tindakan (Alter, 1992). Ini merupakan struktur terintegrasi yang membantu memahami dunia - misalnya: pola hubungan antara musim hujan dan hasil panen berdasarkan data historis (Slide 10-11).
> >
> > Pekerja berpengetahuan (knowledge worker) adalah profesional yang menciptakan/memodifikasi pengetahuan melalui analisis informasi - seperti data scientist yang mengubah data penjualan menjadi strategi pemasaran (Slide 12). Masyarakat pengetahuan mengutamakan aset intelektual di atas fisik, memerlukan manajemen pengetahuan efektif melalui integrasi data dan preservasi pengetahuan organisasi.
> >
> > ### Hierarki Nilai: Data ke Kebijaksanaan
> >
> > Piramida nilai dimulai dari data mentah (unit penjualan), menjadi informasi saat diberi konteks (produk terlaris), lalu pengetahuan saat dianalisis penyebabnya, hingga kebijaksanaan (wisdom) berupa solusi perbaikan berdasarkan pengalaman (Slide 14-16). Contoh praktis:
> >
> > - Data: 1000 unit terjual
> > - Informasi: Penjualan turun 20% di Q3
> > - Pengetahuan: Analisis penyebab turunnya permintaan
> > - Kebijaksanaan: Rekomendasi strategi pemulihan berbasis pengalaman sebelumnya
> >
> > ### Siklus Hidup Informasi
> >
> > Informasi mengalami siklus lengkap mulai dari akuisisi data, pemrosesan, penyimpanan, hingga penghapusan (Slide 20-21). Tahap kritis termasuk analisis (data mining), visualisasi untuk pemahaman mudah, dan preservasi untuk arsip jangka panjang. Contoh nyata: sistem rumah sakit mengelola data pasien dari pendaftaran (akuisisi), diagnosis (analisis), rekam medis digital (penyimpanan), sampai pemusnahan data sesuai regulasi.
> >
> > ### Atribut Kualitas Informasi
> >
> > Terdapat tiga dimensi utama kualitas informasi secara personal (Slide 18):
> >
> > 1. **Waktu**: Tersedia saat dibutuhkan dan mencakup periode relevan (contoh: laporan real-time saham)
> > 2. **Lokasi**: Dapat diakses dimana saja (cloud-based document)
> > 3. **Bentuk**: Mudah dipahami (dashboard visual) dan bebas kesalahan
> >
> > Secara organisasi, informasi harus akurat, relevan, dan konsisten untuk mendukung pengambilan keputusan strategis.

> [!cornell] #### Summary
>
> **Data** adalah fakta mentah tanpa konteks, sedangkan **informasi** adalah data terproses yang mengurangi ketidakpastian dan bersifat relatif terhadap pemakai. **Pengetahuan** terbentuk melalui integrasi informasi dengan pengalaman, mengarah pada tindakan bernilai. Hierarki nilai berkembang dari data → informasi → pengetahuan → kebijaksanaan, dimana setiap tingkat meningkatkan kapabilitas pengambilan keputusan. Kualitas informasi ditentukan oleh keteraksesan waktu/lokasi, kejelasan bentuk, dan akurasi konten dalam siklus hidup yang terkelola.

> [!ad-libitum]- Additional Information
>
> #### Dimensi Teknis Kualitas Data
>
> - **Akurasi**: Persentase data bebas kesalahan (contoh: 99.9% akurasi data sensor IoT)
> - **Konsistensi**: Uniformitas format antar sumber (ISO 8000 standar data)
> - **Kelengkapan**: Cakupan semua atribut yang diperlukan (contoh: formulir dengan field wajib)
> - **Ketepatan Waktu**: Latensi pengumpulan-data ke penyajian (real-time vs batch processing)
>
> #### Manajemen Pengetahuan Organisasional
>
> Teknik ontologi pengetahuan untuk memetakan relasi antar konsep menggunakan framework seperti SKOS (Simple Knowledge Organization System). Studi kasus: Siemens menggunakan sistem shareNet untuk berbagi pengetahuan teknik antar engineer global, mengurangi duplikasi solusi sebesar 40%.
>
> #### Tantangan Siklus Informasi Modern
>
> - **Volume Big Data**: Teknik kompresi lossless vs lossy untuk optimasi penyimpanan
> - **Preservasi Digital**: Migrasi format berkala untuk hindari technological obsolescence
> - **Keamanan Siklus**: Enkripsi end-to-end selama transportasi data
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis dataset publik (contoh: data COVID-19 WHO) untuk identifikasi pola dan transformasi menjadi informasi actionable
> 2. Bangun model siklus informasi sederhana menggunakan Python (pandas untuk pemrosesan, matplotlib untuk visualisasi)
> 3. Studi komparasi 3 tools manajemen pengetahuan: Confluence vs MediaWiki vs Notion
>
> #### Tools & Referensi Lanjut
>
> - **Tools**: KNIME (analisis data), Protege (pemodelan pengetahuan), Talend (data integration)
> - **Buku Wajib**: "Data Science for Business" (Provost & Fawcett), "Knowledge Management in Theory and Practice" (Dalkir)
> - **Paper**: "DIKW Pyramid" (Rowley, 2007) - Kritik dan evolusi model hierarki
> - **Sumber Online**: DataCamp (kursus data literacy), Stanford Encyclopedia of Philosophy (entri "Knowledge How")