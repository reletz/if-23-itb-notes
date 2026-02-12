---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Proses Pengembangan Perangkat Lunak]]

> [!cornell] Prescriptive and Specialized Software Process Models
>
> > ## Questions/Cues
> >
> > - Karakteristik utama model Waterfall vs V-Model
> > - Kapan menggunakan model Incremental Process?
> > - Perbedaan Prototyping dan Spiral Model
> > - Keuntungan Component-Based Development
> > - Penerapan Formal Methods Model
> > - Konsep Aspect-Oriented Software Development
> > - Implementasi Concurrent Models
> >
> > ## Reference Points
> >
> > - SOFTWARE PROCESS REVIEW IF3250 (Slides 10-16)
>
> > ### Model Preskriptif Tradisional
> >
> > **Model Waterfall** merupakan pendekatan linier klasik dengan fase berurutan: analisis kebutuhan, desain, implementasi, verifikasi, dan pemeliharaan. Setiap fase harus diselesaikan sepenuhnya sebelum beralih ke fase berikutnya, mirip seperti aliran air terjun. Cocok untuk proyek dengan kebutuhan stabil dan teknologi matang, namun kurang fleksibel terhadap perubahan.
> >
> > **Model V-Model** memperluas Waterfall dengan menghubungkan setiap fase pengembangan dengan fase pengujian terkait. Sisi kiri "V" mewakili spesifikasi kebutuhan dan desain, sementara sisi kanan menunjukkan aktivitas verifikasi dan validasi yang sesuai. Contoh: Desain sistem diuji melalui integrasi testing, desain detail melalui unit testing.
> >
> > ### Model Iteratif dan Evolusioner
> >
> > **Model Incremental** membagi produk menjadi modul-modul kecil yang dikembangkan secara iteratif. Setiap inkremen menambahkan fungsionalitas baru ke sistem yang sudah beroperasi. Misalnya: pengembangan sistem e-commerce dimulai dengan modul katalog produk, lalu keranjang belanja, kemudian pembayaran.
> >
> > **Evolutionary Prototyping** berfokus pada pembuatan prototipe cepat untuk memvalidasi kebutuhan dengan pengguna. Prototipe awal dikembangkan, diuji, dan disempurnakan secara iteratif berdasarkan umpan balik. Cocok untuk proyek dengan kebutuhan ambigu seperti pengembangan UI/UX.
> >
> > **Spiral Model** menggabungkan prototyping dengan tahapan Waterfall dalam kerangka pengelolaan risiko. Terdiri dari empat kuadran: perencanaan, analisis risiko, pengembangan, dan evaluasi. Setiap spiral mewakili fase proyek dengan kompleksitas meningkat. Contoh pengembangan sistem penerbangan dimana risiko keamanan dianalisis secara iteratif.
> >
> > ### Model Khusus
> >
> > **Component-Based Development (CBD)** menggunakan komponen perangkat lunak yang dapat digunakan kembali (reusable components) sebagai fondasi. Prosesnya meliputi: identifikasi komponen yang sesuai, adaptasi komponen, dan pengintegrasian ke arsitektur sistem. Mengurangi waktu pengembangan hingga 70% untuk proyek dengan domain spesifik seperti sistem ERP.
> >
> > **Formal Methods Model** menerapkan teknik matematis untuk spesifikasi, pengembangan, dan verifikasi sistem. Menggunakan notasi formal seperti Z Notation atau B-Method. Contoh penerapan: sistem kontrol kereta api dimana kebenaran algoritma diverifikasi secara matematis sebelum implementasi.
> >
> > **Aspect-Oriented Software Development (AOSD)** memisahkan cross-cutting concerns (fungsi yang tersebar di berbagai modul) seperti logging, autentikasi, atau transaksi ke dalam aspek terpisah. Menggunakan konsep weaving untuk mengintegrasikan aspek ke kode inti. Mempermudah pemeliharaan sistem enterprise dengan fungsionalitas kompleks.
> >
> > ### Concurrent Models
> >
> > Model ini mengorganisir aktivitas pengembangan sebagai jaringan tugas-tugas paralel yang berinteraksi. Setiap aktivitas (misalnya desain database, pengembangan antarmuka) memiliki status: menunggu, sedang berjalan, selesai, atau direvisi. Cocok untuk proyek skala besar dengan tim terdistribusi, memungkinkan kemajuan paralel pada berbagai komponen sistem.

> [!cornell] #### Summary
>
> **Model proses preskriptif** seperti Waterfall dan V-Model menawarkan pendekatan terstruktur namun kurang fleksibel, cocok untuk proyek dengan kebutuhan stabil. **Model evolusioner** (Incremental, Prototyping, Spiral) memberikan fleksibilitas melalui iterasi dan manajemen risiko aktif. **Model khusus** seperti CBD dan Formal Methods menangani kebutuhan spesifik: reuse komponen dan sistem kritis. **Concurrent Models** mengoptimalkan kerja paralel tim besar. Pemilihan model harus mempertimbangkan **karakteristik proyek**, **tingkat ketidakpastian kebutuhan**, dan **tingkat kematangan teknologi**.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparasi Mendalam
>
> | Model          | Risiko yang Ditangani | Biaya Perubahan | Kesesuaian Domain        |
>
> |----------------|------------------------|-----------------|--------------------------|
>
> | Waterfall      | Rendah                 | Tinggi          | Sistem embedded          |
>
> | Spiral         | Tinggi                 | Sedang          | Sistem kritis            |
>
> | CBD            | Sedang                 | Rendah          | Sistem enterprise        |
>
> | Formal Methods | Sangat Tinggi          | Sangat Tinggi   | Sistem safety-critical   |
>
> #### Implementasi Component-Based Development
>
> Teknik identifikasi komponen:
>
> 1. Domain analysis: mengidentifikasi komponen umum dalam domain serupa
> 2. Legacy system wrapping: membungkus sistem warisan sebagai komponen
> 3. COTS evaluation: mengevaluasi komponen komersial siap pakai
>
> #### Verifikasi Formal dengan B-Method
>
> Langkah implementasi:
>
> 1. Spesifikasi abstrak dalam notasi matematis
> 2. Refinement bertahap ke implementasi konkret
> 3. Pembuktian kebenaran menggunakan theorem prover
> 4. Generasi kode otomatis dari spesifikasi terverifikasi
>
> #### Studi Kasus AOSD
>
> Implementasi sistem perbankan dengan aspek:
>
> - Security aspect: menangani autentikasi dan otorisasi
> - Transaction aspect: mengelola ACID properties
> - Logging aspect: mencatat aktivitas sistem terpusat
>
> #### Self-Exploration Projects
>
> 1. Bangun sistem e-commerce sederhana menggunakan komponen reusable dari repositori GitHub
> 2. Implementasikan algoritma sorting dengan verifikasi formal menggunakan bahasa Dafny
> 3. Terapkan cross-cutting concern logging menggunakan AspectJ dalam aplikasi Java
>
> #### Tools dan Resources
>
> - Component repositories: GitHub, Maven Central, npmjs
> - Formal methods tools: Atelier B, Z/EVES, Alloy Analyzer
> - AOSD frameworks: AspectJ (Java), PostSharp (.NET)
>
> #### Further Reading
>
> - "Component Software: Beyond Object-Oriented Programming" oleh Clemens Szyperski
> - "Software Engineering with Formal Methods" karya Jonathan P. Bowen
> - "Aspect-Oriented Software Development" edisi oleh Robert E. Filman