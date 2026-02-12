---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] SDLC Framework Elements
>
> > ## Questions/Cues
> >
> > - Mengapa konteks organisasi penting dalam SDLC?
> > - Perbedaan lifecycle linear vs evolusioner?
> > - Jenis peran kunci dalam pengembangan sistem?
> > - Contoh deliverables dalam fase desain?
> > - Bagaimana teknik disesuaikan dengan konteks proyek?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 13-19)
> > - IF3141 Sistem Informasi (Slides 34-36)
>
> > ### Konteks Organisasi dalam SDLC
> >
> > Konteks organisasi merujuk pada faktor-faktor lingkungan yang memengaruhi pelaksanaan SDLC. Elemen ini menentukan bagaimana tim harus beradaptasi dalam mengembangkan sistem informasi. Faktor-faktor penting meliputi kompleksitas sistem, lokasi tim pengembang, ketersediaan keahlian teknis, dan persyaratan regulasi khusus. Contoh praktis: pengembangan sistem perbankan memerlukan konteks kepatuhan regulasi yang lebih ketat dibandingkan aplikasi startup.
> >
> > Pentingnya memahami konteks terlihat dalam keputusan teknis seperti pemilihan arsitektur sistem. Tim yang tersebar secara geografis mungkin memerlukan alat kolaborasi khusus, sementara proyek dengan persyaratan perubahan cepat membutuhkan pendekatan lebih fleksibel. Studi kasus: perusahaan multinasional mengadopsi framework DevOps untuk menyinkronkan tim pengembang di 5 negara berbeda.
> >
> > ### Model Lifecycle Pengembangan
> >
> > Terdapat dua paradigma utama dalam lifecycle SDLC: linear dan evolusioner. Model linear (seperti Waterfall) menjalankan fase secara berurutan tanpa iterasi, cocok untuk proyek dengan kebutuhan stabil. Model evolusioner memungkinkan iterasi berkelanjutan melalui prototyping, ideal untuk sistem dengan persyaratan dinamis.
> >
> > Perbedaan utama terletak pada fleksibilitas dan manajemen risiko. Pendekatan linear memberikan struktur jelas tetapi sulit beradaptasi dengan perubahan kebutuhan. Sebaliknya, model evolusioner membutuhkan manajemen proyek lebih canggih namun mengurangi risiko mismatch kebutuhan pengguna. Contoh konkret: pengembangan sistem reservasi hotel menggunakan model linear, sedangkan aplikasi AI menggunakan pendekatan evolusioner.
> >
> > ### Proses dan Alur Kerja
> >
> > Proses SDLC mencakup serangkaian tindakan terstandarisasi untuk mencapai tujuan pengembangan sistem. Alur kerja ini harus selaras dengan konteks organisasi dan model lifecycle yang dipilih. Proses khas meliputi perencanaan kebutuhan, desain solusi, implementasi teknis, validasi fungsional, dan deployment.
> >
> > Pentingnya dokumentasi proses terlihat dalam proyek berskala besar. Setiap langkah harus memiliki kriteria masuk (entry criteria) dan kriteria keluar (exit criteria) yang terukur. Contoh: fase desain memerlukan spesifikasi kebutuhan yang disetujui sebagai kriteria masuk, dan diagram arsitektur yang terverifikasi sebagai kriteria keluar.
> >
> > ### Peran dan Tanggung Jawab
> >
> > SDLC melibatkan empat kategori peran utama: bisnis, proyek, teknis, dan operasional. Peran bisnis (seperti sponsor dan analis bisnis) bertanggung jawab atas kebutuhan fungsional. Peran teknis (arsitek dan pengembang) mengimplementasikan solusi teknologi. Kolaborasi efektif antar peran menentukan keberhasilan proyek.
> >
> > Contoh pembagian tanggung jawab: Business Analyst menterjemahkan kebutuhan bisnis ke spesifikasi teknis, Solution Architect mendesain arsitektur sistem, Developer mengimplementasikan kode, dan Tester memvalidasi fungsionalitas. Dalam proyek Agile, peran-peran ini sering tumpang tindih untuk meningkatkan kolaborasi.
> >
> > ### Deliverables dan Artefak
> >
> > Deliverables merupakan output konkret dari setiap fase SDLC yang mendokumentasikan kemajuan proyek. Termasuk di antaranya dokumen kebutuhan, model desain (seperti diagram UML), rencana uji, dan komponen perangkat lunak. Artefak ini berfungsi sebagai alat komunikasi antar stakeholder dan dasar untuk pengembangan selanjutnya.
> >
> > Contoh deliverables kritis: use case diagram pada fase analisis, entity-relationship model pada fase desain, test script pada fase validasi, dan deployment checklist pada fase implementasi. Kualitas dokumentasi ini menentukan kemudahan pemeliharaan sistem jangka panjang.
> >
> > ### Teknik dan Framework Pendukung
> >
> > Pemilihan teknik pengembangan disesuaikan dengan preferensi tim, kompleksitas sistem, dan standar organisasi. Framework seperti MODAF atau DODAF menyediakan template untuk pengembangan sistem kompleks. Teknik spesifik seperti UML modeling atau Test-Driven Development dipilih berdasarkan kriteria proyek.
> >
> > Faktor penentu pemilihan teknik termasuk tingkat kematangan tim, kompleksitas teknis, dan kebutuhan interoperabilitas. Contoh implementasi: proyek pemerintah menggunakan MODAF untuk memastikan kepatuhan standar, sementara startup memilih Agile untuk iterasi cepat tanpa dokumentasi formal berlebihan.

> [!cornell] #### Summary
>
> **Elemen framework SDLC** memberikan struktur dasar untuk pengembangan sistem informasi yang efektif, dengan **konteks organisasi** sebagai penentu utama adaptasi proses. Perbedaan mendasar antara **lifecycle linear dan evolusioner** terletak pada fleksibilitas menghadapi perubahan kebutuhan. Kolaborasi antar **peran multidisiplin** (bisnis, teknis, proyek) menjadi kunci sukses implementasi, didukung oleh **deliverables terstandarisasi** yang memastikan traceability. Pemilihan **teknik dan framework** harus mempertimbangkan kompleksitas sistem dan kematangan organisasi, dengan dokumentasi memadai sebagai fondasi pemeliharaan jangka panjang.

> [!ad-libitum]- Additional Information
>
> #### Implementasi Framework di Organisasi Besar
>
> Organisasi berskala enterprise sering mengadopsi hybrid framework yang menggabungkan elemen linear dan evolusioner. COBIT dan ITIL menyediakan praktik terbaik untuk mengintegrasikan SDLC dengan tata kelola TI. Tantangan utama termasuk sinkronisasi antar tim multidisiplin dan pemeliharaan konsistensi dokumentasi. Studi kasus: implementasi SAP ERP di perusahaan manufaktur memerlukan adaptasi 14 proses SDLC inti dengan framework COBIT 2019.
>
> #### Manajemen Konfigurasi dalam SDLC
>
> Sistem Configuration Management (SCM) menjadi komponen kritis dalam proyek kompleks. Tools seperti GitLab atau Azure DevOps digunakan untuk version control, build automation, dan deployment management. Praktik terbaik meliputi branch strategy yang jelas, automated testing pipeline, dan immutable infrastructure pattern.
>
> #### Tantangan Lintas Budaya
>
> Proyek global menghadapi tantangan harmonisasi praktik SDLC antar wilayah berbeda. Perbedaan zona waktu, bahasa, dan norma kerja memerlukan adaptation layer dalam proses pengembangan. Framework seperti Distributed Scrum menyediakan solusi untuk koordinasi tim terdistribusi melalui virtual stand-ups dan pair programming asynchronous.
>
> #### Tools Pendukung SDLC
>
> - Enterprise Architect: Pemodelan sistem berbasis UML
> - JIRA: Pelacakan isu dan manajemen proyek Agile
> - Selenium: Automated testing untuk aplikasi web
> - Docker: Kontainerisasi lingkungan pengembangan
> - Prometheus: Pemantauan performa sistem produksi
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Analisis comparative framework TOGAF vs Zachman dalam konteks transformasi digital
> 2. Implementasi CI/CD pipeline menggunakan Jenkins untuk aplikasi mikroservis
> 3. Studi kasus penerapan DevOps di institusi finansial dengan compliance ketat
>
> #### Bacaan Lanjutan
>
> - "Software Engineering Body of Knowledge" (SWEBOK) oleh IEEE
> - "Disciplined Agile Delivery" oleh Scott Ambler
> - Kerangka kerja NIST SP 800-64: SDLC untuk sistem keamanan kritis
> - Coursera: "Engineering Practices for Building Quality Software"
> - OpenGroup Architecture Framework (TOGAF) versi 10