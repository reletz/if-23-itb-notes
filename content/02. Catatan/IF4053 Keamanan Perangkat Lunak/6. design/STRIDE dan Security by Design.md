---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] STRIDE dan Security by Design
>
> > ## Questions/Cues
> >
> > - Apa enam kategori ancaman dalam model STRIDE?
> > - Bagaimana setiap ancaman STRIDE dipetakan ke security requirement tertentu?
> > - Mengapa keamanan tidak boleh diperlakukan sebagai afterthought?
> > - Apa makna pendekatan Security by Design dalam siklus pembangunan sistem?
> > - Kapan paling efektif untuk mengurangi vulnerability dalam pengembangan produk?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W08 Software Security Design — bagian "STRIDE & Security by Design")
>
> > ### Model STRIDE: Kategorisasi Ancaman
> >
> > **STRIDE** adalah kerangka kerja untuk mengkategorikan ancaman keamanan yang dikembangkan oleh Microsoft, dan namanya merupakan akronim dari enam jenis ancaman utama: **Spoofing**, **Tampering**, **Repudiation**, **Information Disclosure**, **Denial of Service**, dan **Elevation of Privilege**. Tujuan dari kategorisasi ini adalah memberikan kosakata terstruktur sehingga seorang perancang sistem dapat memikirkan secara sistematis "apa yang bisa salah" pada sebuah komponen, alih‑alih mengandalkan intuisi yang tidak lengkap. Dengan menelusuri setiap aset, alur data, dan batas kepercayaan (trust boundary) menggunakan keenam lensa ini, tim dapat menemukan ancaman yang mungkin terlewat jika hanya berpikir secara ad‑hoc.
> >
> > Mari kita uraikan masing‑masing. **Spoofing** adalah ancaman ketika penyerang menyamar sebagai entitas lain, misalnya memalsukan identitas pengguna atau server. **Tampering** adalah modifikasi data atau kode tanpa otorisasi, baik saat data sedang ditransmisikan maupun saat disimpan. **Repudiation** terjadi ketika seorang aktor dapat menyangkal telah melakukan suatu tindakan karena tidak ada bukti yang cukup (misalnya log yang tidak lengkap). **Information Disclosure** adalah pembocoran informasi kepada pihak yang tidak berhak mengaksesnya.
> >
> > Dua kategori terakhir melengkapi gambaran. **Denial of Service (DoS)** adalah upaya membuat sistem atau layanan tidak tersedia bagi pengguna yang sah, misalnya membanjiri server dengan permintaan. **Elevation of Privilege** adalah situasi ketika penyerang dengan hak akses terbatas berhasil memperoleh hak istimewa yang lebih tinggi, misalnya seorang pengguna biasa yang mendapatkan akses administrator. Setiap kategori ini bukan sekadar label, melainkan titik awal untuk merumuskan kontrol keamanan yang tepat.
> >
> > ### Pemetaan Threats ke Security Requirements
> >
> > Kekuatan utama STRIDE terletak pada kemampuannya dipetakan langsung ke **security requirement** (kebutuhan keamanan) yang konkret. Pemetaan ini bersifat satu‑ke‑satu: setiap kategori ancaman memiliki properti keamanan yang menjadi penangkalnya. **Spoofing** dilawan dengan **authentication** (memastikan entitas benar‑benar siapa yang mereka klaim). **Tampering with information** dilawan dengan **integrity** (menjamin data tidak diubah tanpa otorisasi, misalnya melalui hashing atau digital signature). **Information disclosure** dilawan dengan **confidentiality** (menjaga kerahasiaan, biasanya melalui enkripsi).
> >
> > Tiga pemetaan berikutnya menyempurnakan model ini. **Denial of Service (DoS)** dilawan dengan **availability** (memastikan layanan tetap dapat diakses, misalnya melalui rate limiting, redundancy, atau load balancing). **Elevation of access** dilawan dengan **authorization** (memastikan setiap aktor hanya dapat melakukan tindakan sesuai hak yang diberikan, melalui access control yang ketat). Perlu dicatat bahwa kategori **Repudiation** dalam praktik sering dipetakan ke properti **non‑repudiation** yang dijamin oleh audit logging dan digital signature, meskipun slide menekankan lima pasangan utama di atas.
> >
> > Pemetaan ini sangat praktis bagi perancang. Ketika sebuah threat model menemukan ancaman "Tampering" pada saluran komunikasi antara klien dan server, perancang langsung tahu bahwa requirement yang harus dipenuhi adalah **integrity**, dan dapat memilih mekanisme seperti **HMAC** atau **TLS**. Dengan demikian, STRIDE bukan hanya alat analisis, melainkan jembatan dari identifikasi ancaman menuju spesifikasi kebutuhan keamanan yang dapat ditindaklanjuti.
> >
> > ```mermaid
> > flowchart LR
> >     S["Spoofing"] --> SA["Authentication"]
> >     T["Tampering"] --> TI["Integrity"]
> >     I["Information Disclosure"] --> IC["Confidentiality"]
> >     D["Denial of Service"] --> DA["Availability"]
> >     E["Elevation of Privilege"] --> EZ["Authorization"]
> > ```
> >
> > ### Security by Design
> >
> > **Security by Design** adalah pendekatan yang menekankan agar pertimbangan keamanan dibangun ke dalam **desain dan konstruksi** sistem sejak awal, bukan ditambahkan belakangan. Prinsip intinya ringkas namun fundamental: **keamanan bukanlah afterthought** (renungan belakangan). Terlalu sering, tim pengembang fokus pada fungsionalitas terlebih dahulu lalu mencoba "menempelkan" keamanan menjelang rilis, sebuah pola yang menghasilkan tambalan rapuh dan celah yang sulit diperbaiki karena bertentangan dengan arsitektur dasar.
> >
> > Tujuan utama Security by Design adalah **mengurangi vulnerability atau exploitable flaws sebelum mereka digunakan** di lingkungan produksi atau pasar. Memperbaiki kelemahan pada tahap desain jauh lebih murah dan efektif dibandingkan memperbaikinya setelah sistem dirilis, ketika biaya perbaikan membengkak dan reputasi organisasi sudah terancam. Dengan memasukkan threat modeling (misalnya menggunakan STRIDE) sejak fase requirement dan arsitektur, kelemahan dapat diidentifikasi dan dieliminasi sebelum sebaris kode pun ditulis.
> >
> > Dalam praktik, Security by Design berarti membuat keputusan arsitektural yang aman secara default: memilih protokol terenkripsi, menerapkan prinsip least privilege, dan merancang trust boundary yang jelas. Sebagai contoh konkret, ketika sebuah aplikasi e‑commerce dirancang, tim tidak menunggu sampai fitur pembayaran selesai untuk memikirkan keamanan transaksi, melainkan sejak awal menetapkan bahwa seluruh komunikasi pembayaran harus melalui **TLS**, data kartu harus dienkripsi saat disimpan, dan setiap akses ke data sensitif harus diotorisasi dan dicatat. Pendekatan ini mengubah keamanan dari beban menjadi properti intrinsik sistem.
>
> [!cornell] #### Summary
>
> **STRIDE** menyediakan enam kategori ancaman—Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, dan Elevation of Privilege—yang memungkinkan analisis ancaman secara sistematis. Kekuatan model ini terletak pada pemetaan langsungnya ke **security requirement**: spoofing→authentication, tampering→integrity, information disclosure→confidentiality, DoS→availability, dan elevation of access→authorization. Pemetaan ini menjembatani identifikasi ancaman menuju spesifikasi kontrol yang konkret. Semua ini berakar pada filosofi **Security by Design**, yang menempatkan keamanan sebagai bagian intrinsik dari desain dan konstruksi sistem—bukan afterthought—dengan tujuan mengurangi vulnerability sebelum sistem masuk produksi, ketika biaya perbaikan masih rendah.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber: DREAD dan Pemodelan Risiko Kuantitatif
>
> Sementara STRIDE membantu mengkategorikan ancaman, ia tidak memberikan cara untuk memprioritaskannya. Microsoft melengkapinya dengan model **DREAD** (Damage, Reproducibility, Exploitability, Affected users, Discoverability), di mana setiap ancaman diberi skor 1–10 pada lima dimensi tersebut lalu dijumlahkan untuk menentukan prioritas penanganan. Misalnya, ancaman dengan Damage tinggi dan Exploitability rendah mungkin diberi prioritas lebih rendah daripada ancaman dengan keduanya tinggi. Meskipun DREAD kini lebih jarang dipakai karena dianggap subjektif, prinsipnya—memisahkan identifikasi dari prioritisasi—tetap relevan dan tercermin dalam pendekatan modern seperti CVSS.
>
> #### Lebih dalam — Trust Boundary dan Data Flow Diagram (DFD)
>
> Penerapan STRIDE yang serius biasanya dimulai dengan menggambar **Data Flow Diagram (DFD)** yang menunjukkan external entities, processes, data stores, dan data flows. Ancaman kemudian dianalisis pada setiap **trust boundary**—garis di mana tingkat kepercayaan berubah, misalnya antara internet publik dan jaringan internal. STRIDE‑per‑element dan STRIDE‑per‑interaction adalah dua varian metodologi: yang pertama menerapkan kategori ancaman relevan pada setiap elemen DFD, yang kedua menganalisis setiap interaksi antar elemen. Alat seperti **Microsoft Threat Modeling Tool** dan **OWASP Threat Dragon** mengotomatiskan sebagian proses ini.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil sebuah aplikasi web sederhana (misalnya aplikasi to‑do list dengan login), gambar DFD‑nya, identifikasi trust boundary, lalu terapkan STRIDE pada setiap elemen. Hasilkan tabel ancaman beserta security requirement penangkalnya.
> 2. Bandingkan STRIDE dengan metodologi threat modeling lain seperti **PASTA** (Process for Attack Simulation and Threat Analysis) atau **LINDDUN** (yang fokus pada privacy). Buat ringkasan kapan masing‑masing paling cocok digunakan.
> 3. Gunakan Microsoft Threat Modeling Tool untuk memodelkan arsitektur sebuah sistem mikroservis dan dokumentasikan ancaman otomatis yang dihasilkannya.
>
> #### Bacaan Lanjutan
> - Adam Shostack, *Threat Modeling: Designing for Security* (Wiley, 2014) — referensi definitif untuk STRIDE dan DFD.
> - OWASP, "Threat Modeling Process" dan proyek Threat Dragon.
> - Saltzer & Schroeder, "The Protection of Information in Computer Systems" (1975) — fondasi prinsip secure design.
