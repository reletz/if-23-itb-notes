---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Unified Process (UP) Methodology
>
> > ## Questions/Cues
> >
> > - Apa karakteristik utama Unified Process?
> > - Mengapa UP disebut "use case driven"?
> > - Bagaimana struktur iterasi dalam UP?
> > - Peran arsitektur dalam pendekatan UP?
> > - Fase-fase kunci dalam siklus hidup UP?
> >
> > ## Reference Points
> >
> > - SOFTWARE PROCESS REVIEW IF3250 PPL (Slides 17-18)
> > - SOFTWARE PROCESS REVIEW IF3250 PPL (Slide 9)
>
> > ### Pengantar Unified Process (UP)
> >
> > Unified Process (UP) adalah model proses pengembangan perangkat lunak yang bersifat iteratif dan inkremental dengan fokus pada use case dan arsitektur sistem. Model ini dikembangkan sebagai kerangka kerja adaptif yang menggabungkan praktik terbaik dari berbagai pendekatan pengembangan. UP menekankan pada pengembangan bertahap melalui serangkaian iterasi pendek (biasanya 2-6 minggu) yang menghasilkan produk yang semakin lengkap setiap siklusnya.
> >
> > Contoh konkret: Dalam pengembangan sistem e-commerce, iterasi pertama mungkin fokus pada alur pembelian dasar (use case "Beli Produk"), iterasi berikutnya menambahkan fitur keranjang belanja, dan seterusnya hingga fitur lengkap. Pendekatan ini memungkinkan umpan balik awal dari stakeholder dan mengurangi risiko kegagalan besar di akhir proyek.
> >
> > ### Karakteristik Inti UP
> >
> > UP memiliki tiga pilar utama:
> >
> > 1. **Use Case Driven**: Seluruh pengembangan dipandu oleh use case yang mendefinisikan kebutuhan fungsional sistem. Use case berfungsi sebagai "benang merah" yang mengintegrasikan aktivitas analisis, desain, implementasi, dan pengujian.
> > 2. **Architecture-Centric**: Arsitektur sistem dikembangkan sejak awal melalui serangkaian prototipe yang disebut "arsitektur baseline". Ini memastikan keputusan desain kritis dibuat sejak dini.
> > 3. **Iterative & Incremental**: Proyek dibagi menjadi iterasi kecil yang masing-masing menghasilkan produk kerja (increment). Setiap iterasi mencakup semua aktivitas pengembangan (analisis, desain, kode, uji) dalam skala kecil.
> >
> > Analogi: Membangun rumah secara UP seperti menyusun maket 3D lengkap dengan pondasi dan kerangka (arsitektur) terlebih dahulu, kemudian menambahkan ruangan (use case) satu per satu secara lengkap daripada membangun seluruh rumah sekaligus tanpa kerangka jelas.
> >
> > ### Fase dalam Siklus Hidup UP
> >
> > UP mengorganisir proyek dalam empat fase berurutan:
> >
> > 1. **Inception** (Awal):
> > - Fokus pada definisi lingkup dan kelayakan proyek
> > - Identifikasi use case inti (20% use case yang mencakup 80% kebutuhan)
> > - Pembuatan business case dan analisis risiko
> > 2. **Elaboration** (Pengembangan):
> > - Penyempurnaan arsitektur inti
> > - Penyelesaian 80% analisis kebutuhan
> > - Pembuatan rencana proyek detail
> > 3. **Construction** (Konstruksi):
> > - Pengembangan fitur dalam iterasi paralel
> > - Penyelesaian sebagian besar kode fungsional
> > - Fokus pada efisiensi pengembangan
> > 4. **Transition** (Transisi):
> > - Beta testing dan penyempurnaan akhir
> > - Pelatihan pengguna dan deployment
> > - Evaluasi pasca-implementasi
> >
> > Contoh implementasi: Pada fase elaboration proyek sistem akademik, tim mungkin menghabiskan 3 iterasi untuk menyempurnakan arsitektur basis data dan alur bisnis utama seperti registrasi mata kuliah sebelum masuk ke konstruksi fitur pendukung.
> >
> > ### Disiplin Kerja dalam UP
> >
> > UP mengorganisir aktivitas pengembangan dalam enam disiplin kerja:
> >
> > 1. **Business Modeling**: Pemetaan proses bisnis organisasi
> > 2. **Requirements**: Pengumpulan dan analisis kebutuhan
> > 3. **Analysis & Design**: Transformasi kebutuhan ke desain teknis
> > 4. **Implementation**: Konversi desain ke kode eksekutabel
> > 5. **Test**: Validasi dan verifikasi sistem
> > 6. **Deployment**: Peluncuran produk ke lingkungan produksi
> >
> > Setiap iterasi memuat proporsi berbeda dari disiplin ini. Iterasi awal lebih berat pada business modeling dan requirements, sementara iterasi akhir didominasi testing dan deployment.

> [!cornell] #### Summary
>
> **Unified Process (UP)** adalah metodologi pengembangan perangkat lunak iteratif yang berfokus pada **use case sebagai penggerak utama** dan **arsitektur sebagai fondasi sistem**. Model ini terstruktur dalam **empat fase utama** (Inception, Elaboration, Construction, Transition) yang masing-masing terdiri dari beberapa iterasi pendek untuk menghasilkan produk inkremental. Keunggulan utama UP terletak pada **fleksibilitasnya dalam menangani perubahan kebutuhan** dan **penekanan pada risiko teknis sejak dini** melalui pembangunan arsitektur inti. Pendekatan ini sangat cocok untuk proyek dengan **kompleksitas tinggi** dan **ketidakpastian kebutuhan** di awal pengembangan.

> [!ad-libitum]- Additional Information
>
> #### Fase vs Iterasi dalam UP
>
> Setiap fase UP terdiri dari beberapa iterasi dengan tujuan berbeda:
>
> - Inception: 1-2 iterasi untuk proof-of-concept
> - Elaboration: 2-3 iterasi arsitektur
> - Construction: 4+ iterasi pengembangan fitur
> - Transition: 1-3 iterasi stabilisasi
>
> Kriteria kelulusan fase:
>
> - Inception: Stakeholder setuju pada visi proyek
> - Elaboration: Arsitektur stabil dan risiko utama teratasi
> - Construction: Produk siap rilis beta
> - Transition: Produk diterima pengguna akhir
>
> #### Perbandingan UP dan RUP
>
> Rational Unified Process (RUP) adalah implementasi komersial UP oleh IBM:
>
> - RUP menyediakan template dan alat spesifik
> - UP lebih bersifat kerangka konseptual
> - RUP menambahkan komponen manajemen proyek detil
> - OpenUP adalah versi open source dari RUP
>
> #### Studi Kasus Penerapan UP
>
> Contoh nyata implementasi UP di sistem perbankan:
>
> 1. Inception: Analisis AML (Anti Money Laundering)
> 2. Elaboration: Arsitektur integrasi core banking
> 3. Construction: Pengembangan modul transaksi
> 4. Transition: Uji compliance dengan regulator
>
> #### Alat Pendukung Implementasi UP
>
> - Enterprise Architect untuk pemodelan UML
> - JIRA dengan template UP workflow
> - IBM Rational Method Composer
> - OpenUP Plug-in untuk Eclipse
>
> #### Self-Exploration Projects
>
> 1. Implementasikan UP sederhana untuk aplikasi manajemen tugas:
> - Buat diagram use case untuk fitur dasar
> - Definisikan arsitektur layered (presentation, business, data)
> - Kembangkan dalam 4 iterasi (2 minggu/iterasi)
> 2. Analisis studi kasus failure proyek:
> - Identifikasi fase UP yang diabaikan
> - Evaluasi dampak ketiadaan arsitektur baseline
> - Usulkan perbaikan berdasarkan prinsip UP
>
> #### Further Reading
>
> - Buku: "The Unified Software Development Process" oleh Ivar Jacobson
> - Paper: "Kruchten's 4+1 Architectural View Model"
> - Tutorial: OpenUP Best Practices (Eclipse Foundation)
> - Tool: UML Modeling dengan IBM Rational Rhapsody
> - Research: Adaptasi UP untuk Proyek Open Source