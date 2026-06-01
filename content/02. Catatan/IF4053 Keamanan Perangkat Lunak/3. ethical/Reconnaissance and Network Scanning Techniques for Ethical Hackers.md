---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Course Name]]

> [!cornell] Reconnaissance and Network Scanning Techniques for Ethical Hackers
>
> > ## Questions/Cues
> >
> > - Bagaimana cara mengumpulkan informasi tanpa kontak jaringan?
> > - Apa perbedaan antara WHOIS dan DNS query?
> > - Mengapa pemindaian stealth penting dalam rekonsiliasi?
> > - Bagaimana Nmap menentukan layanan pada port terbuka?
> > - Apa arti “timing template” pada pemindaian jaringan?
> > - Kapan traceroute menjadi alat penting dalam enumerasi?
> > - Bagaimana teknik OS fingerprinting bekerja?
> >
> > ## Reference Points
> >
> > - Lecture_Notes_Reconnaissance.pdf (Pages 12-14)
> > - Nmap_Example_Output.txt (Page 15)
> > - CEH_Phases_Slides.pptx (Slide 10)
>
> > ### Reconnaissance: Definisi dan Tujuan
> >
> > Rekonsiliasi (reconnaissance) merupakan fase awal dalam siklus hacking etis di mana peneliti berusaha mengumpulkan sebanyak‑banyak informasi tentang target tanpa melakukan interaksi langsung dengan sistem jaringan target. Tujuan utama adalah memperoleh gambaran menyeluruh mengenai infrastruktur, kepemilikan domain, dan jejak digital yang dapat menjadi titik masuk selanjutnya. Pada tahap ini, teknik yang dipakai bersifat pasif: penelusuran basis data publik, pencarian melalui mesin pencari, serta analisis metadata pada dokumen yang tersedia secara terbuka. Pendekatan pasif ini penting karena tidak meninggalkan jejak pada jaringan target, sehingga mengurangi risiko terdeteksi oleh sistem pertahanan.
> >
> > Contoh konkret: seorang etis hacker dapat menggunakan layanan WHOIS untuk mengekstrak informasi registrasi domain seperti nama pemilik, alamat email administratif, dan server nama (NS) yang mengelola zona DNS. Informasi ini membantu mengidentifikasi entitas yang mengelola infrastruktur serta potensi titik lemah administratif. Selain WHOIS, pencarian melalui Google dorking (menggunakan operator pencarian lanjutan) dapat mengungkap dokumen yang tidak sengaja dipublikasikan, seperti laporan internal atau konfigurasi server yang terlepas ke internet.
> >
> > Mengapa fase ini krusial? Karena setiap langkah selanjutnya—pemindaian jaringan, enumerasi layanan, atau eksploitasi—akan lebih terarah dan efisien bila didasarkan pada data yang akurat. Tanpa rekonsiliasi yang matang, peneliti dapat menghabiskan waktu pada host yang tidak relevan atau melewatkan aset kritis yang tersembunyi.
> >
> > ### Network Enumeration and Scanning: Metode Inti
> >
> > Setelah fase pasif selesai, etis hacker beralih ke enumerasi jaringan dan pemindaian (scanning). Pada tahap ini, tujuan utama adalah mengidentifikasi host yang aktif (live hosts), port yang terbuka, layanan yang berjalan, serta versi perangkat lunak yang dapat dieksploitasi. Alat paling populer untuk tugas ini adalah **Nmap** (Network Mapper), yang menyediakan beragam teknik pemindaian mulai dari SYN scan (stealth) hingga UDP scan, serta kemampuan skrip (NSE) untuk mengumpulkan informasi tambahan.
> >
> > Proses umum dimulai dengan **ping sweep** untuk menemukan host yang responsif, diikuti oleh **port scanning** untuk menentukan port mana yang terbuka. Nmap menggunakan teknik “half‑open” SYN scan (`-sS`) yang mengirimkan paket SYN dan menunggu respons SYN‑ACK tanpa menyelesaikan tiga‑way handshake, sehingga lebih sulit dideteksi oleh firewall atau IDS. Hasil pemindaian biasanya menampilkan daftar port, status (open/closed/filtered), dan layanan yang terdeteksi, seperti contoh pada slide: port 21 (FTP), 22 (SSH), 631 (IPP), dan 6000 (X11).
> >
> > Selain Nmap, **DNS querying** (misalnya `dig` atau `nslookup`) membantu mengungkap subdomain, catatan MX, dan server nama yang dapat menjadi pintu masuk. **Traceroute** memberikan peta jalur jaringan dari sumber ke target, mengidentifikasi router perantara dan potensi titik bottleneck atau filter. Kombinasi ketiga teknik ini memberikan gambaran topologi jaringan yang lengkap.
> >
> > ### Teknik Pemindaian Lanjutan dan Evasion
> >
> > Pada jaringan yang dilindungi oleh firewall atau sistem deteksi intrusi (IDS), pemindaian standar dapat dengan mudah terblokir atau terdeteksi. Oleh karena itu, etis hacker mengadopsi teknik **evasion** seperti mengubah **timing template** (`-T0` hingga `-T5`) untuk menyesuaikan kecepatan paket, atau menggunakan **fragmentasi paket** (`-f`) agar paket terpecah menjadi fragmen kecil yang sulit diinterpretasikan oleh IDS. Teknik lain termasuk **decoy scanning** (`-D`) yang menyisipkan alamat IP palsu dalam lalu lintas pemindaian, sehingga menyulitkan analisis log.
> >
> > **OS fingerprinting** juga merupakan bagian penting dari scanning lanjutan. Nmap dapat melakukan fingerprinting aktif (`-O`) dengan mengirimkan serangkaian probe khusus dan menganalisis respons TCP/IP untuk menebak sistem operasi target. Hasil ini membantu menentukan kerentanan spesifik yang relevan dengan versi OS tertentu. Ada pula fingerprinting pasif, di mana peneliti mengamati paket yang dikirim oleh target tanpa mengirimkan apa pun, misalnya dengan menggunakan pcap capture pada jaringan yang terhubung.
> >
> > **Service version detection** (`-sV`) memungkinkan identifikasi versi tepat dari layanan yang berjalan, misalnya `OpenSSH 7.9p1`. Informasi ini sangat berharga untuk mencocokkan dengan basis data CVE (Common Vulnerabilities and Exposures) dan menilai tingkat risiko.
> >
> > ### Dokumentasi dan Pelaporan Hasil Rekonsiliasi
> >
> > Semua temuan harus dicatat secara sistematis untuk memudahkan analisis selanjutnya dan pembuatan laporan. Struktur laporan biasanya mencakup: (1) Ringkasan eksekutif, (2) Metodologi yang digunakan, (3) Daftar host dan layanan yang teridentifikasi, (4) Analisis risiko berdasarkan versi layanan, dan (5) Rekomendasi mitigasi. Penggunaan format standar seperti **STIX** (Structured Threat Information Expression) atau **OpenVAS XML** dapat mempermudah integrasi dengan alat manajemen kerentanan organisasi.
> >
> > Penting untuk menandai setiap temuan dengan referensi sumber (misalnya, output Nmap, hasil WHOIS, atau catatan DNS) serta mencantumkan timestamp. Dokumentasi yang lengkap tidak hanya membantu tim keamanan internal memahami peta serangan, tetapi juga menjadi bukti audit yang sah bila diperlukan.

> [!cornell] #### Summary
>
> **Reconnaissance** menyediakan data pasif yang menjadi landasan bagi semua langkah selanjutnya, sementara **network scanning** mengubah data pasif menjadi peta aktif jaringan target melalui teknik port, service, dan OS fingerprinting. Teknik **evasion** seperti timing adjustment, fragmentasi, dan decoy scanning memungkinkan peneliti melewati pertahanan jaringan yang ketat. Dokumentasi yang terstruktur dan terstandarisasi memastikan temuan dapat ditindaklanjuti secara efektif dan menjadi bukti audit yang sah.

> [!ad-libitum]- Additional Information
>
> #### Advanced Topic 1: Timing Templates and Performance Tuning
>
> Nmap menyediakan lima profil timing (`-T0` hingga `-T5`) yang mengatur interval antara paket, jumlah retries, dan paralelisme. `-T0` (Paranoid) mengirimkan satu paket per detik, cocok untuk jaringan yang sangat sensitif terhadap noise, sementara `-T5` (Insane) memaksimalkan kecepatan dengan mengirimkan ratusan paket per detik, ideal untuk jaringan internal yang tidak memiliki IDS. Memilih profil yang tepat memerlukan pertimbangan trade‑off antara **kecepatan** dan **deteksi**. Praktik terbaik meliputi: (a) memulai dengan `-T2` (Polite) untuk mengurangi beban jaringan, (b) meningkatkan ke `-T3` (Normal) bila tidak ada alarm, dan (c) menurunkan ke `-T1` (Sneaky) bila ada indikasi IDS aktif.
>
> Referensi: *Nmap Network Scanning* oleh Gordon “Fyodor” Lyon, 2nd ed., O’Reilly Media, 2021.
>
> #### Advanced Topic 2: Script Engine (NSE) for Service Enumeration
>
> Nmap Scripting Engine (NSE) memungkinkan peneliti menjalankan skrip Lua yang dapat melakukan probing mendalam pada layanan. Contoh skrip populer meliputi `http-enum` untuk enumerasi direktori web, `ssl-cert` untuk mengekstrak detail sertifikat TLS, dan `ssh-hostkey` untuk mengumpulkan fingerprint kunci host SSH. Penggunaan kombinasi skrip (`-sC` atau `--script=default`) dapat secara otomatis mengumpulkan data yang biasanya memerlukan alat terpisah, sehingga mempercepat fase enumerasi. Namun, skrip yang terlalu agresif dapat menimbulkan alarm, sehingga penting untuk menyesuaikan tingkat agresivitas (`--script-timeout`) dan memfilter output yang tidak relevan.
>
> Referensi: *Nmap Scripting Engine Documentation* (https://nmap.org/book/nse.html).
>
> #### Advanced Topic 3: Passive OS Fingerprinting with p0f
>
> **p0f** adalah alat passive fingerprinting yang menganalisis header TCP/IP dari paket yang lewat pada jaringan yang dipantau. Karena tidak mengirimkan paket apa pun, p0f hampir tidak terdeteksi oleh IDS. Alat ini dapat mengidentifikasi sistem operasi, versi kernel, dan bahkan jenis perangkat (router, printer) hanya dengan mengamati pola TTL, window size, dan opsi TCP. Implementasi tipikal melibatkan penempatan p0f pada segmen jaringan yang mengarah ke atau dari target, kemudian mengumpulkan log selama periode waktu tertentu. Data yang dihasilkan dapat dipadukan dengan hasil active fingerprinting untuk meningkatkan akurasi.
>
> Referensi: *Passive OS Fingerprinting* oleh Michal Zalewski, 2005, tersedia di https://www.zalewski.com/p0f.html.
>
> #### Advanced Topic 4: Legal and Ethical Considerations in Reconnaissance
>
> Meskipun fase rekonsiliasi bersifat pasif, tetap ada batasan hukum yang harus dipatuhi. Di banyak yurisdiksi, mengakses informasi WHOIS publik atau melakukan pencarian internet tidak melanggar hukum, namun **enumerasi DNS** yang melibatkan query berulang dapat dianggap sebagai serangan denial‑of‑service jika dilakukan tanpa izin. Oleh karena itu, etis hacker harus selalu memperoleh **written authorization** (surat izin) sebelum melakukan pemindaian aktif, dan memastikan bahwa semua aktivitas tercatat dalam **rules of engagement (RoE)**. Dokumentasi RoE harus mencakup ruang lingkup IP, jenis pemindaian yang diizinkan, serta batas waktu pelaksanaan.
>
> Referensi: *Computer Fraud and Abuse Act (CFAA)*, United States, dan *EU GDPR* artikel 32 tentang keamanan data.
>
> #### Self-Exploration Projects
>
> 1. **Buat skrip otomatisasi Nmap** yang menggabungkan fase ping sweep, SYN scan, dan service version detection, kemudian mengekspor hasil ke format JSON untuk analisis selanjutnya dengan Python Pandas.
> 2. **Implementasikan passive fingerprinting** menggunakan p0f pada jaringan lab, kumpulkan data selama 24 jam, dan bandingkan akurasi dengan hasil active fingerprinting Nmap pada host yang sama.
>
> #### Tools and Resources
>
> - **Nmap** (https://nmap.org) – pemindaian jaringan serbaguna.
> - **p0f** (https://lcamtuf.coredump.cx/p0f3/) – passive OS fingerprinting.
> - **Wireshark** (https://www.wireshark.org) – analisis paket untuk passive reconnaissance.
> - **dnsrecon** (https://github.com/darkoperator/dnsrecon) – enumerasi DNS lanjutan.
>
> #### Further Reading
>
> - Lyon, G. “Nmap Network Scanning”, 2nd Edition, O’Reilly Media, 2021.
> - Zalewski, M. “Passive OS Fingerprinting”, 2005, https://www.zalewski.com/p0f.html
> - “The Art of Network Penetration Testing” oleh Royce Davis, Wiley, 2020.
> - SANS Institute – Whitepaper “Network Reconnaissance and Scanning Best Practices”, 2022.