---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Software Quality and the Quality Triangle
>
> > ## Questions/Cues
> >
> > - Mengapa kualitas perangkat lunak penting dan harus "fit for purpose"?
> > - Apa itu Quality Triangle dan bagaimana trade-off-nya?
> > - Bagaimana ISO 8402:1994 mendefinisikan kualitas?
> > - Apa perbedaan kebutuhan fungsional, non-fungsional, dan inherent qualities?
> > - Mengapa membangun kualitas sejak awal lebih hemat biaya?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi — Quality & Testing (Slides 2-6)
>
> > ### Pentingnya Kualitas Perangkat Lunak
> >
> > Kualitas perangkat lunak merupakan aspek penting dalam pengembangan sistem. Perangkat lunak yang diserahkan harus **'fit for purpose'** (sesuai tujuan), **reliable** (andal), dan **maintainable** agar dapat memenuhi kebutuhan yang terus berubah. Untuk mencapai hal ini, perangkat lunak perlu diuji pada berbagai tahap pengembangannya untuk memastikan produk akhir memenuhi tingkat kualitas yang diinginkan.
> >
> > Prinsip ekonomi kunci: **selalu lebih cost-effective untuk membangun kualitas ke dalam desain dan pengembangan produk daripada memperbaiki kesalahan setelah produk selesai dibangun**. Biaya perbaikan defect meningkat secara eksponensial seiring kemajuan fase SDLC. Selain itu, sistem yang berbeda memerlukan tingkat kualitas yang berbeda pula — perangkat lunak kontrol pesawat menuntut kualitas jauh lebih tinggi dibanding aplikasi game sederhana.
> >
> > ### Quality Triangle (Segitiga Kualitas)
> >
> > Saat mengembangkan sistem, selalu terjadi **trade-off antara waktu (time), biaya (cost), dan ruang lingkup (scope)**, dan ketiga faktor ini berdampak langsung pada kualitas sistem yang dibangun. Memahami dampak perubahan ketiga faktor terhadap kualitas adalah keterampilan kunci bagi manajer pengembangan perangkat lunak ketika bernegosiasi dengan stakeholder utama.
> >
> > ```mermaid
> > flowchart TD
> >     T["Time"] --> Q["Quality"]
> >     C["Cost"] --> Q
> >     S["Scope"] --> Q
> >     T <-->|trade-off| C
> >     C <-->|trade-off| S
> >     S <-->|trade-off| T
> > ```
> >
> > Ketiga sisi segitiga saling mengompromikan; mengubah salah satu memengaruhi yang lain dan berdampak langsung pada **Quality**.
> >
> > Ilustrasi trade-off ketika menghadapi keterlambatan:
> >
> > - **Time** — memperpanjang tenggat waktu, misalnya seminggu lagi. Namun ini menambah biaya, dan tekanan waktu pada developer dapat menurunkan kualitas kode.
> > - **Cost** — menambah developer lain pada tugas tersebut. Namun developer kedua mungkin kurang berpengalaman di area spesifik, yang lagi-lagi dapat menghasilkan kode berkualitas buruk.
> > - **Scope** — menyepakati dengan pengguna dan sponsor bahwa program yang belum lengkap tetap digunakan, dengan penerimaan terhadap jumlah defect yang lebih tinggi.
> >
> > ### Definisi Kualitas (ISO 8402:1994)
> >
> > Beberapa istilah yang sering digunakan untuk menggambarkan kualitas: **'excellence'** (keunggulan), **'fitness for purpose'** (kesesuaian dengan tujuan), dan **'conformance to requirements'** (kesesuaian dengan kebutuhan).
> >
> > Berdasarkan **ISO 8402:1994**, kualitas adalah: *"The totality of features and characteristics of a product or service that bear on its ability to satisfy stated or implied needs"* — keseluruhan fitur dan karakteristik produk/layanan yang berkaitan dengan kemampuannya memenuhi kebutuhan yang dinyatakan atau tersirat.
> >
> > Frasa **'implied needs'** (kebutuhan tersirat) mudah disalahtafsirkan. Contoh: kebutuhan pengguna untuk menampilkan daftar produk dapat menyiratkan bahwa produk harus ditampilkan dalam urutan tertentu, misalnya berdasarkan kategori produk, sedangkan sistem justru menampilkan produk berurutan menurut kode produk.
> >
> > ### Karakteristik Perangkat Lunak yang Baik
> >
> > **Memenuhi kebutuhan fungsional (functional requirements)**: Sistem harus melakukan apa yang dispesifikasikan dalam dokumen kebutuhan. Contoh: jika ada kebutuhan menampilkan detail pelanggan, maka sistem harus menyediakan fitur tersebut.
> >
> > **Memenuhi kebutuhan non-fungsional (non-functional requirements)**: Mencakup karakteristik seperti **reliability** (keandalan), **response time** (waktu respons), **availability** (ketersediaan), **ease of use** (kemudahan penggunaan), dan **security** (keamanan).
> >
> > **Memiliki inherent qualities (kualitas bawaan)**: Mencakup karakteristik seperti **maintainability**, **efficiency**, **flexibility/expandability (scalability)**, **reusability**, **testability**, **modularity**, **well-documented**, dan **portability**. Kualitas ini sering tidak terlihat oleh pengguna akhir namun krusial bagi tim pengembang dan pemelihara sistem dalam jangka panjang.

> [!cornell] #### Summary
>
> **Kualitas perangkat lunak** adalah aspek fundamental SDLC dimana produk harus **fit for purpose, reliable, dan maintainable**, dan membangun kualitas sejak desain jauh lebih hemat biaya daripada memperbaiki defect kemudian. **Quality Triangle** menggambarkan trade-off tak terhindarkan antara **time, cost, dan scope** yang berdampak langsung pada kualitas. **ISO 8402:1994** mendefinisikan kualitas sebagai totalitas fitur dan karakteristik yang memenuhi *stated or implied needs*. Perangkat lunak yang baik memenuhi **kebutuhan fungsional**, **non-fungsional** (reliability, performa, keamanan), serta memiliki **inherent qualities** (maintainability, scalability, portability) — dengan tingkat kualitas yang disesuaikan menurut kekritisan tiap sistem.

> [!ad-libitum]- Additional Information
>
> #### Model Kualitas ISO/IEC 25010
>
> Standar modern menggantikan ISO 8402 dengan **ISO/IEC 25010** (SQuaRE) yang mendefinisikan delapan karakteristik kualitas produk: Functional Suitability, Performance Efficiency, Compatibility, Usability, Reliability, Security, Maintainability, dan Portability. Setiap karakteristik dibagi lagi ke sub-karakteristik terukur.
>
> #### Cost of Quality (CoQ)
>
> Konsep ekonomi kualitas membagi biaya menjadi: **Prevention Cost** (pelatihan, review), **Appraisal Cost** (testing, inspeksi), **Internal Failure Cost** (defect ditemukan sebelum rilis), dan **External Failure Cost** (defect ditemukan pengguna — paling mahal). Aturan empiris 1:10:100 menunjukkan biaya perbaikan naik 10x tiap fase berikutnya.
>
> #### Tools dan Framework
>
> - **SonarQube** — analisis statis untuk mengukur maintainability, code smells, dan technical debt
> - **CAST / NDepend** — pengukuran inherent quality dan kompleksitas siklomatik
> - **ISO 9126 / 25010 scorecards** — penilaian kualitas berbasis metrik
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Petakan kebutuhan fungsional vs non-fungsional sebuah aplikasi mobile banking dan tentukan target kuantitatif tiap NFR.
> 2. Lakukan negosiasi Quality Triangle pada studi kasus proyek terlambat: simulasikan dampak menambah waktu/biaya/scope.
> 3. Ukur maintainability index sebuah proyek open-source menggunakan SonarQube.
>
> #### Bacaan Lanjutan
>
> - Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson.
> - ISO/IEC 25010:2011 — Systems and software Quality Requirements and Evaluation (SQuaRE)
> - Pressman, R.S. *Software Engineering: A Practitioner's Approach*. McGraw-Hill.
