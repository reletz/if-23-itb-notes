---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Attack Vectors dan Studi Kasus Serangan Supply Chain
>
> > ## Questions/Cues
> >
> > - Apa saja attack vector umum pada serangan supply chain?
> > - Apa beda Code Injection, Dependency Confusion, dan Tampered Updates?
> > - Bagaimana serangan SolarWinds (SUNBURST) bekerja dan seberapa luas dampaknya?
> > - Apa yang membuat kasus Walkie-Talkie 2024 unik sebagai serangan hardware?
> > - Mengapa ekosistem open-source punya risiko supply chain yang spesifik?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Common Supply Chain Attack Vectors")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Real-World Supply Chain Attacks")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "SolarWinds (2020) & Walkie-Talkie (2024)")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Particular Issues on Open Source Supply Chain Risks")
>
> > ### Attack Vector Umum
> >
> > Slide menyebut lima **attack vector** utama pada serangan supply chain. **(1) Code Injection**—kode jahat disisipkan ke dalam pustaka *open-source* atau pihak ketiga, sehingga setiap aplikasi yang menariknya ikut tercemar. **(2) Dependency Confusion**—penyerang menerbitkan paket berbahaya dengan **nama yang mirip** paket sah (atau nama paket internal) agar package manager keliru mengunduh versi jahat. **(3) Compromised Build Environments**—penyerang menargetkan **pipeline CI/CD** atau *build server* sehingga artefak yang dihasilkan sudah disusupi sejak proses build. **(4) Tampered Updates**—pembaruan perangkat lunak yang sah **digantikan** dengan versi berbahaya, memanfaatkan kepercayaan pengguna pada mekanisme update. **(5) Compromised Developer Accounts**—penyerang memperoleh akses ke **kredensial developer tepercaya**, lalu menyalahgunakan hak akses tersebut untuk menyuntikkan kode.
> >
> > ```mermaid
> > flowchart TD
> >     A["Attack Vectors Supply Chain"] --> B["Code Injection<br/>(pustaka open-source/3rd-party)"]
> >     A --> C["Dependency Confusion<br/>(nama paket mirip)"]
> >     A --> D["Compromised Build Env<br/>(CI/CD, build server)"]
> >     A --> E["Tampered Updates<br/>(update sah diganti jahat)"]
> >     A --> F["Compromised Dev Accounts<br/>(kredensial tepercaya)"]
> > ```
> >
> > ### Insiden Dunia Nyata
> >
> > Slide mendaftar sejumlah insiden nyata sebagai bukti dampak serangan supply chain. **NotPetya (2017)**—mekanisme update perangkat lunak akuntansi Ukraina dikompromikan, menyebarkan malware destruktif. **Event-Stream NPM (2018)**—kode jahat ditambahkan ke pustaka JavaScript populer. **SolarWinds (2020)**—proses build dikompromikan, berdampak pada ribuan organisasi. **Codecov Bash Uploader (2021)**—skrip dimodifikasi untuk **mengeksfiltrasi** variabel lingkungan CI yang sensitif. **Log4j Vulnerability (2021)**—kerentanan *remote code execution* kritis (**CVE-2021-44228**) pada pustaka logging Java Log4j yang sangat luas dipakai. **XZ Utils Backdoor (2024)**—*maintainer* tepercaya menyisipkan *backdoor* ke pustaka kritis. **Walkie-Talkie (2024)**—perangkat *walkie-talkie* diledakkan dari jarak jauh, menewaskan puluhan dan melukai ribuan orang termasuk warga sipil—contoh serangan supply chain **hardware**.
> >
> > ### Deep Dive: SolarWinds (2020)
> >
> > Pada Desember 2020 terungkap bahwa **SolarWinds**, perusahaan manajemen TI besar, menjadi korban serangan supply chain yang canggih. Penyerang mengkompromikan **proses build perangkat lunak Orion** milik SolarWinds, lalu menyisipkan **backdoor bernama SUNBURST** ke dalam **pembaruan perangkat lunak yang sah**. Update jahat ini didistribusikan ke sekitar **18.000 pelanggan**, termasuk lembaga pemerintah AS dan perusahaan Fortune 500. Serangan tidak terdeteksi **berbulan-bulan**, memberi penyerang waktu untuk melakukan **spionase dan pencurian data**.
> >
> > **Mekanisme serangan**: penyerang mendapat akses ke lingkungan pengembangan perangkat lunak SolarWinds, lalu **menyuntikkan kode jahat ke update Orion antara Maret–Juni 2020**. Pelanggan yang memasang update tanpa sadar membuka akses jaringan mereka kepada penyerang. **Dampak**: organisasi yang terkompromi mencakup **US Treasury, Department of Homeland Security, Microsoft, dan FireEye**. Penyerang memperoleh akses persisten yang memungkinkan **spionase, eksfiltrasi data, dan lateral movement** di dalam jaringan korban. Serangan diatribusikan ke aktor **negara-bangsa**, yang secara luas diyakini sebagai **APT29/Cozy Bear** (Rusia).
> >
> > **Pelajaran**: bahkan update perangkat lunak tepercaya pun dapat **dipersenjatai** bila supply chain-nya dikompromikan; organisasi harus menjaga **visibilitas** atas seluruh dependensi dan update; prinsip **zero-trust** dan **segmentasi jaringan** dapat membatasi dampak; serta **monitoring rutin, deteksi anomali, dan perencanaan incident response** bersifat kritis. Insiden ini juga mendorong adopsi **Software Bill of Materials (SBOM)** dan secure development lifecycle.
> >
> > ### Deep Dive: Walkie-Talkie (2024)
> >
> > Pada 2024 terungkap bahwa intelijen Israel (**Mossad**) menjalankan operasi selama satu dekade yang menargetkan **Hezbollah** di Lebanon menggunakan **hardware yang dikompromikan**. Mossad mendirikan **perusahaan palsu** dan memasok Hezbollah dengan lebih dari **16.000 walkie-talkie dan 5.000 pager**, semuanya dipasangi **bahan peledak tersembunyi**. Perangkat dijual dengan kedok **merek sah** (termasuk produsen Taiwan) agar tampak tepercaya dan sulit dilacak ke Israel. Pada September 2024, Mossad **meledakkannya dari jarak jauh**, menewaskan puluhan dan melukai ribuan orang termasuk warga sipil.
> >
> > **Mekanisme teknis kunci**: **Supply Chain Subversion** (menyusupi proses pengadaan), **Long-Term Dormancy** (komponen jahat diam selama bertahun-tahun), **Remote Activation** (aktivasi/detonasi jarak jauh), dan **Attribution Obfuscation** (penyamaran asal lewat shell company dan merek palsu). Skenario yang mungkin (berdasarkan laporan BBC): (1) pembuatan perusahaan dan merek palsu, (2) infiltrasi supply chain, (3) tampering hardware dan penyembunyian bahan peledak, (4) distribusi dan penggunaan operasional, (5) detonasi jarak jauh, (6) dampak lanjutan dan masalah atribusi.
> >
> > **Pelajaran**: ini contoh langka serangan **hardware supply chain** di mana lawan mengkompromikan proses pengadaan untuk mengirim perangkat jahat. Kuncinya: **Vendor Verification** (memeriksa pemasok dan keaslian peralatan kritis secara menyeluruh); **Risks of Counterfeit Products** (bahkan merek tepercaya bisa ditiru); **Long-Term Threats** (serangan supply chain bisa sabar dan persisten, dorman bertahun-tahun); dan **Attribution Challenges** (shell company dan branding palsu mempersulit pelacakan asal). Implikasi luasnya: supply chain security **tidak terbatas pada perangkat lunak**—hardware dan komponen fisik juga rentan, dan dampaknya bisa **katastrofik** terutama pada infrastruktur kritis atau saat konflik.
> >
> > ### Risiko Khas Open Source
> >
> > Slide menyoroti dua isu spesifik pada supply chain open source. **Maintainer Trust dan Project Sustainability**—banyak proyek open-source dipelihara oleh **segelintir relawan**, meningkatkan risiko *burnout*/ketidakberlanjutan (contoh **Log4j**) maupun **malicious takeover** (contoh **XZ Utils backdoor**, di mana maintainer yang sudah dipercaya menyisipkan backdoor). **Dependency Confusion**—penyerang dapat menerbitkan paket berbahaya dengan **nama mirip** paket populer, mengeksploitasi cara package manager me-resolve nama. Kedua isu ini menegaskan bahwa **kepercayaan** dalam ekosistem open source bersifat rapuh dan perlu diverifikasi, bukan diasumsikan.
>
> [!cornell] #### Summary
>
> Attack vector supply chain mencakup **Code Injection, Dependency Confusion, Compromised Build Environments, Tampered Updates, dan Compromised Developer Accounts**. Insiden nyata membentang dari **NotPetya (2017), Event-Stream NPM (2018), SolarWinds (2020), Codecov (2021), Log4j/CVE-2021-44228 (2021), XZ Utils Backdoor (2024), hingga Walkie-Talkie (2024)**. **SolarWinds** menyisipkan backdoor **SUNBURST** ke proses build Orion, menyebar ke ~**18.000 pelanggan** termasuk lembaga AS dan diatribusikan ke **APT29/Cozy Bear**. **Walkie-Talkie 2024** adalah serangan **hardware supply chain** oleh Mossad terhadap Hezbollah—perangkat berisi peledak dipasok lewat perusahaan palsu, dorman lama, lalu **diledakkan jarak jauh**. Risiko khas open source: **maintainer trust** yang rapuh (Log4j, XZ Utils) dan **dependency confusion**.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Anatomi XZ Utils Backdoor CVE-2024-3094 (DI LUAR sumber)
> Kasus XZ Utils adalah contoh **social engineering jangka panjang**: aktor (alias "Jia Tan") perlahan membangun kepercayaan sebagai kontributor selama bertahun-tahun hingga memperoleh hak maintainer, lalu menyisipkan backdoor terobfuskasi ke dalam *release tarball* (bukan ke repo git secara langsung) yang menargetkan `sshd` melalui dependensi `liblzma`. Backdoor nyaris masuk ke distribusi Linux utama sebelum tertangkap secara kebetulan oleh seorang engineer Microsoft yang menyelidiki latensi SSH. Pelajaran: **identitas maintainer dan rantai kepercayaan** adalah aset keamanan kritis.
>
> #### Lebih dalam — Mengapa Dependency Confusion Berhasil (DI LUAR sumber)
> Serangan dependency confusion (dipopulerkan riset Alex Birsan, 2021) mengeksploitasi perilaku package manager yang, saat ada paket bernama sama di registry publik dan privat, kadang **memilih versi dengan nomor lebih tinggi**—sehingga paket publik jahat bernomor besar mengalahkan paket internal. Mitigasi: gunakan **scoped/namespaced packages**, konfigurasi registry agar memprioritaskan sumber internal, dan klaim nama paket internal Anda di registry publik.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih satu insiden dari daftar slide, lalu petakan: elemen supply chain mana yang terdampak dan attack vector apa yang dipakai (sesuai format tugas pada slide).
> 2. Buat tabel ranking dampak NotPetya, Event-Stream, SolarWinds, Codecov, Log4j, dan XZ Utils berdasarkan skala korban dan kesulitan deteksi.
> 3. Reproduksi konsep dependency confusion di lab tertutup: buat paket internal dan amati perilaku resolusi package manager Anda.
>
> #### Bacaan Lanjutan
> - Laporan CISA dan FireEye/Mandiant tentang SUNBURST/SolarWinds.
> - Liputan BBC tentang operasi Walkie-Talkie/pager 2024 (rujukan skenario pada slide).
> - Alex Birsan, "Dependency Confusion: How I Hacked Into Apple, Microsoft and Dozens of Other Companies" (2021).
