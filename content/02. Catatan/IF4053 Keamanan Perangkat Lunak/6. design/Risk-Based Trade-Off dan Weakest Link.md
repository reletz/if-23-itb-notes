---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Risk-Based Trade-Off dan Weakest Link
>
> > ## Questions/Cues
> >
> > - Mengapa "when enough is enough" relevan dalam memilih security control?
> > - Bagaimana risiko didefinisikan menurut ISO Guide 73:2002?
> > - Apa empat strategi dalam Risk Treatment dan kapan masing‑masing dipilih?
> > - Bagaimana sebuah countermeasure justru bisa menimbulkan vulnerability baru?
> > - Mengapa keamanan hanya sekuat mata rantai terlemahnya dan bukan soal teknologi semata?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W08 Software Security Design — bagian "Risk-Based Trade-Off & Weakest Link")
>
> > ### When Enough Is "Enough"?
> >
> > Pertanyaan **"When enough is enough?"** mengingatkan kita pada kebenaran ekonomi yang sering diabaikan: **security control selalu datang dengan biaya** (some cost). Tidak ada perlindungan yang gratis—setiap kontrol membutuhkan investasi finansial untuk pengadaan dan pemeliharaan, dan sering kali **mengurangi fungsionalitas atau kenyamanan** bagi pengguna sah. Menambahkan langkah autentikasi ekstra meningkatkan keamanan tetapi memperlambat pengguna; mengenkripsi semua data melindungi kerahasiaan tetapi membebani performa.
> >
> > Karena itu, keamanan bukanlah tentang mencapai "perlindungan maksimal" secara absolut, melainkan tentang menemukan titik keseimbangan yang tepat. Menerapkan kontrol secara berlebihan dapat membuat sistem mahal, lambat, dan menjengkelkan—sampai‑sampai pengguna mencari cara untuk menghindarinya, yang justru menurunkan keamanan. Sebaliknya, kontrol yang terlalu sedikit meninggalkan celah berbahaya. Tantangan perancang adalah menentukan kapan tingkat keamanan sudah "cukup" relatif terhadap nilai aset yang dilindungi dan ancaman yang dihadapi.
> >
> > ### Risk Approach
> >
> > Untuk menentukan kapan "cukup", kita memerlukan kerangka risiko. Menurut **ISO Guide 73:2002**, **risiko** didefinisikan sebagai **kombinasi dari probabilitas suatu peristiwa dan konsekuensi (negatif) yang ditimbulkannya**. Secara konseptual, ini sering disederhanakan sebagai Risk ≈ Probability × Consequence. Dengan definisi ini, dua peristiwa dapat memiliki tingkat risiko yang sama meskipun karakteristiknya berbeda—satu sering terjadi dengan dampak kecil, satu lagi jarang terjadi tetapi berdampak katastrofik.
> >
> > Dalam kerangka ini, **security control mengurangi risiko, tetapi memiliki biaya** dan mungkin mengurangi fungsionalitas atau kenyamanan. **Solusi ideal meminimalkan risiko pada biaya yang dapat diterima (acceptable cost) oleh pelanggan.** Yang penting dipahami, penentuan "acceptable" ini bersifat **sangat subjektif** (highly subjective!)—bergantung pada toleransi risiko, nilai aset, dan konteks bisnis masing‑masing organisasi. Standar **ISO 27005** menyediakan metodologi terstruktur untuk melakukan manajemen risiko keamanan informasi ini secara sistematis.
> >
> > ### Trade-Off Analysis dan Risk Treatment
> >
> > Setelah risiko diidentifikasi dan dinilai, organisasi melakukan **Trade‑Off Analysis** untuk memutuskan **Risk Treatment** (penanganan risiko). Terdapat empat strategi utama. **Risk Reduction** (mengurangi risiko) dengan menerapkan kontrol untuk menurunkan probabilitas atau dampak. **Risk Avoidance** (menghindari risiko) dengan tidak melakukan aktivitas yang berisiko sama sekali. **Risk Transfer** (mengalihkan risiko) ke pihak lain, misalnya melalui asuransi siber. Dan **Risk Acceptance** (menerima risiko) ketika biaya penanganan melebihi potensi kerugian.
> >
> > Pemilihan strategi dipandu oleh posisi risiko dalam kuadran **frekuensi × dampak**: kombinasi **Low/High Frequency** pada satu sumbu dan **Low/High Impact** pada sumbu lain. Sebagai panduan umum, risiko dengan frekuensi tinggi namun dampak rendah cocok dikurangi (reduction); risiko dengan dampak tinggi dan frekuensi tinggi sebaiknya dihindari (avoidance); risiko dampak tinggi namun frekuensi rendah cocok dialihkan (transfer, misalnya asuransi); sedangkan risiko frekuensi dan dampak rendah dapat diterima saja (acceptance). Sumber biaya kontrol yang dipertimbangkan meliputi firewall, anti‑virus, intrusion detection/prevention, vulnerability management, AAA/identity management, kriptografi, hingga secure communications and data storage. Sementara aset yang dilindungi mencakup uang, peralatan fisik, data dan software, informasi, reputasi, operasi bisnis, hingga privasi.
> >
> > ```mermaid
> > quadrantChart
> >     title Risk Treatment Matrix
> >     x-axis Low Frequency --> High Frequency
> >     y-axis Low Impact --> High Impact
> >     quadrant-1 Avoidance
> >     quadrant-2 Transfer
> >     quadrant-3 Acceptance
> >     quadrant-4 Reduction
> > ```
> >
> > ### Countermeasures dan Vulnerability Baru
> >
> > Sebuah paradoks penting: **countermeasure dapat justru menimbulkan vulnerability baru**. Contoh klasik yang diberikan: jika kita hanya mengizinkan **tiga kali login salah** sebagai countermeasure terhadap brute‑force attack (akun dibekukan setelahnya), vulnerability baru apa yang kita perkenalkan? Jawabannya adalah **Denial of Service attack**—penyerang dapat dengan sengaja memasukkan password salah tiga kali pada akun orang lain untuk membekukannya, mengunci pengguna sah dari sistem mereka sendiri.
> >
> > Sumber kerentanan baru lainnya adalah ketika **countermeasure bergantung pada software baru**. Bug dalam software baru ini dapat berarti countermeasure tersebut **tidak efektif**, atau yang lebih buruk, **memperkenalkan kelemahan tambahan**. Contoh historis yang diberikan adalah **Witty worm** yang muncul pada Maret 2004—worm ini justru **mengeksploitasi software keamanan ISS** (Internet Security Systems). Ironisnya, perangkat yang dipasang untuk melindungi sistem malah menjadi pintu masuk serangan, membuktikan bahwa menambahkan kontrol tanpa pertimbangan matang dapat memperluas attack surface alih‑alih menguranginya.
> >
> > Karena itu, **appropriate security control** harus memenuhi tiga kriteria: **affordable** (terjangkau secara biaya), **proportionate to the threat** (sebanding dengan ancaman yang dihadapi, tidak berlebihan maupun kurang), dan **minimise disruption to legitimate users** (meminimalkan gangguan bagi pengguna sah). Slide juga menyindir asumsi keliru "I'm safe because of my state‑of‑the‑art firewall"—karena "many streets go to Rome", satu kontrol canggih tidak menjamin keamanan jika jalur lain dibiarkan terbuka.
> >
> > ### As Strong as the Weakest Link
> >
> > Prinsip **"as strong as the weakest link"** menegaskan bahwa **ketahanan (resiliency) sebuah sistem terhadap upaya peretasan sangat bergantung pada perlindungan komponen terlemahnya**. Tidak peduli seberapa kuat firewall atau enkripsi yang Anda miliki, jika ada satu titik lemah—password yang mudah ditebak, karyawan yang mudah ditipu, atau server yang tidak ter‑patch—penyerang akan menargetkannya. Investasi besar pada satu area menjadi sia‑sia jika area lain diabaikan, karena penyerang selalu mencari jalur yang paling mudah.
> >
> > Sering kali, **mata rantai terlemah adalah manusia**. Slide menyoroti bahwa "security gets in the way!"—jika staf dan pelanggan tidak memahami perlunya keamanan, mereka akan mencari cara untuk menghindarinya (misalnya menempel password di monitor, atau menonaktifkan kontrol yang merepotkan). Namun ada sisi positifnya: **edukasi dan kesadaran (awareness) dapat menjadikan manusia bagian dari solusi**, bukan sekadar titik lemah. Dengan pelatihan yang tepat, karyawan berubah dari liability menjadi lapisan pertahanan aktif.
> >
> > Ini membawa kita pada wawasan terdalam: **keamanan adalah tentang sistem, bukan (hanya) teknologi**. Keamanan adalah rekayasa properti non‑fungsional dari sistem kompleks, yang membutuhkan koordinasi harmonis antar komponen terspesialisasi—seperti "interlocking articulated armour"—dan memerlukan pandangan **holistik/sistemik** di mana **manusia adalah bagian dari sistem**. Pernyataan terkenal dari **Paul Simmonds (ICI)** merangkumnya: **"80% of security is about people, processes and procedures and only 20% is about technology."** Keamanan, pada akhirnya, juga soal persepsi—"you don't know when it is working, but you know when it fails"—dan bersifat probabilistik, sama seperti orang merasa lebih aman bepergian dengan mobil dibanding pesawat meski statistik korban mobil jauh lebih tinggi.
> >
> > ```mermaid
> > flowchart LR
> >     P["People &amp; Awareness &#40;80%&#41;"] --> SYS["Sistem Keamanan Holistik"]
> >     PR["Processes &amp; Procedures"] --> SYS
> >     T["Technology &#40;20%&#41;"] --> SYS
> >     SYS --> R["Resiliency = sekuat mata rantai terlemah"]
> > ```
>
> [!cornell] #### Summary
>
> Keamanan adalah soal **mengelola risiko**, bukan mengejar perlindungan absolut—karena setiap **security control memiliki biaya** dan dapat mengurangi fungsionalitas. Menurut **ISO Guide 73:2002**, risiko adalah kombinasi probabilitas dan konsekuensi, dan solusi ideal meminimalkan risiko pada biaya yang dapat diterima (sangat subjektif; lihat **ISO 27005**). **Trade‑Off Analysis** memilih di antara empat **Risk Treatment**—reduction, avoidance, transfer, acceptance—berdasarkan kuadran frekuensi × dampak. Yang krusial, **countermeasure dapat menimbulkan vulnerability baru** (batas tiga login gagal → DoS; Witty worm mengeksploitasi software ISS), sehingga kontrol harus **affordable, proportionate, dan minim mengganggu pengguna sah**. Akhirnya, keamanan **sekuat mata rantai terlemahnya** dan merupakan properti **sistem, bukan teknologi semata**—seperti kata Paul Simmonds, 80% adalah soal people, processes, dan procedures, hanya 20% teknologi.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber: ALE, SLE, dan ARO dalam Risiko Kuantitatif
>
> Untuk menjadikan "probability × consequence" dapat dihitung, praktisi menggunakan metrik kuantitatif. **SLE (Single Loss Expectancy)** = nilai aset × Exposure Factor (proporsi aset yang hilang per insiden). **ARO (Annualized Rate of Occurrence)** = berapa kali per tahun insiden diperkirakan terjadi. **ALE (Annualized Loss Expectancy)** = SLE × ARO, yaitu ekspektasi kerugian tahunan. Sebuah kontrol layak diterapkan jika biayanya lebih kecil daripada pengurangan ALE yang dihasilkannya—inilah formalisasi dari "when enough is enough". Pendekatan ini mengubah keputusan keamanan dari intuisi menjadi analisis cost‑benefit yang dapat dipertanggungjawabkan kepada manajemen.
>
> #### Lebih dalam — Human Factor: Social Engineering dan Security Culture
>
> Klaim Paul Simmonds bahwa 80% keamanan adalah soal manusia tercermin dalam dominasi **social engineering** pada serangan nyata: phishing, pretexting, dan baiting mengeksploitasi psikologi, bukan kelemahan teknis. Membangun **security culture** yang kuat—di mana melaporkan insiden dihargai dan keamanan dianggap tanggung jawab bersama—sering lebih efektif daripada membeli alat mahal. Program seperti simulasi phishing berkala, security champion di tiap tim, dan kebijakan yang ramah pengguna (Psychological Acceptability) mengubah mata rantai terlemah menjadi lapisan pertahanan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih sebuah aset (misalnya database pelanggan), estimasi SLE, ARO, dan ALE‑nya, lalu hitung apakah investasi pada sebuah kontrol tertentu (misalnya enkripsi at‑rest) dapat dibenarkan secara finansial.
> 2. Buat studi kasus tentang sebuah countermeasure yang menimbulkan vulnerability baru (selain Witty worm dan lockout DoS). Telusuri insiden nyata dan analisis bagaimana hal itu bisa dicegah.
> 3. Rancang program awareness keamanan singkat untuk sebuah organisasi kecil dan ukur efektivitasnya melalui simulasi phishing sebelum dan sesudah pelatihan.
>
> #### Bacaan Lanjutan
> - ISO/IEC 27005, "Information security risk management".
> - Bruce Schneier, *Secrets and Lies* dan *Beyond Fear* — pembahasan mendalam tentang trade‑off keamanan dan faktor manusia.
> - Artikel Wikipedia tentang Witty worm dan analisis pasca‑insiden ISS (2004).
