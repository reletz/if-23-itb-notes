---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rangkuman - Definisi dan Contoh 1 - Fondasi, Software Security, VA, dan Network
>
> > ## Questions/Cues
> >
> > - Apa definisi dan contoh istilah inti keamanan (CIA, AAA, VTAC)?
> > - Apa saja definisi pada software security dan prinsip desain?
> > - Apa definisi VA, pentest, kill chain, CVE/CWE/NVD/CVSS?
> > - Apa definisi serangan dan kontrol jaringan (DDoS, MitM, firewall, IDS, DMZ)?
> >
> > ## Reference Points
> >
> > - Rangkuman payung 1 (Security Foundation & Concepts)
> > - Rangkuman payung 2 (Software Security & Countermeasure)
> > - Rangkuman payung 3 (Vulnerability Assessment)
> > - Rangkuman payung 4 (Network Security)
>
> > ### Payung 1 - Fondasi Keamanan
> >
> > | Istilah | Definisi singkat | Contoh |
> > |---|---|---|
> > | **Vulnerability** | Kelemahan pada sistem keamanan | Server belum di-patch, input tidak divalidasi |
> > | **Threat** | Keadaan yang berpotensi menimbulkan kerugian | Peretas yang mengincar database |
> > | **Attack** | Manusia yang mengeksploitasi vulnerability | SQL Injection ke form login |
> > | **Control** | Tindakan pelindung | Firewall, patching, enkripsi |
> > | **Confidentiality** | Hanya yang berhak boleh mengakses isi data/komunikasi | Enkripsi pesan Alice-Bob agar tak terbaca Eve |
> > | **Integrity** | Data/layanan tidak rusak atau berubah tanpa izin | Hash/MAC mendeteksi "x=1" diubah jadi "x=10000" |
> > | **Availability** | Pengguna sah selalu dapat mengakses layanan | Redundansi server; lawan: DoS |
> > | **Authentication** | Verifikasi klaim identitas/peran | Password (know), token (have), sidik jari (are) |
> > | **Authorization** | Memeriksa apakah subject berhak melakukan aksi pada object | ACL: Alice boleh read/write `/home/Alice/*` |
> > | **Accountability** | Mampu menentukan pelaku lewat log dan audit trail | Log: Bob memesan DVD-R 1100 |
> > | **Non-repudiation** | Pelaku tidak dapat menyangkal transaksi, bisa dibuktikan ke pihak ketiga | Tanda tangan digital, receipt |
> > | **Principal** | Pengguna yang telah terautentikasi | Bob setelah login |
> > | **Two-factor authentication** | Menggabungkan dua faktor autentikasi | Kartu ATM + PIN |
> > | **Mutual authentication** | Client dan server saling memverifikasi | TLS dengan sertifikat client |
> > | **Risk** | Probabilitas kejadian × konsekuensi negatifnya (ISO Guide 73) | Risiko kebocoran data pelanggan |
> > | **Security control (5 fungsi)** | Prevent, deter, deflect, detect, recover | Firewall (prevent), IDS (detect), backup (recover) |
> > | **Risk management** | Assessment, treatment, acceptance, communication | Risk register |
> > | **Defense in depth** | Banyak lapis kontrol; satu gagal masih ada lainnya | Password + OTP + audit trail |
> >
> > ### Payung 2 - Software Security dan Countermeasure
> >
> > | Istilah | Definisi singkat | Contoh |
> > |---|---|---|
> > | **Software security** | Mengamankan custom code, library, backend, web/app server (bukan network security) | Validasi input pada web app |
> > | **Application layer attack** | Serangan pada kode aplikasi yang tidak terlihat firewall/IDS | Path traversal `../../etc/shadow` |
> > | **DoS** | Membuat layanan tidak tersedia | Request kosong meng-crash SimpleWebServer |
> > | **Path traversal** | Membaca file di luar direktori web lewat `../` | `GET ../../../../etc/shadow` |
> > | **NIST CSF** | Identify, Protect, Detect, Respond, Recover | Pemetaan control ke fungsi |
> > | **ISO 27002 (4 kategori)** | Organizational, People, Physical, Technological | 8.28 Secure coding |
> > | **Least privilege** | Hak minimum untuk menyelesaikan tugas | Server berjalan sebagai user biasa; akun DB hanya SELECT |
> > | **Separation of duties** | Tugas dipecah ke pihak berbeda | Pengusul dan penyetuju pinjaman |
> > | **Secure by default** | Konfigurasi awal sudah aman | Firewall menyala, password router unik |
> > | **Fail-secure** | Saat gagal, jatuh ke keadaan aman | Auth server mati, akses ditolak |
> > | **Open design (Kerckhoffs)** | Keamanan tidak bergantung pada kerahasiaan desain, hanya kunci | OAuth, TLS |
> > | **Reuse komponen** | Pakai komponen teruji, jangan buat sendiri | OpenSSL, Bouncy Castle |
> >
> > ### Payung 3 - Vulnerability Assessment
> >
> > | Istilah | Definisi singkat | Contoh |
> > |---|---|---|
> > | **Vulnerability assessment** | Proses sistematis mengidentifikasi, mengevaluasi, melaporkan kelemahan | Scan dengan Nessus/OpenVAS |
> > | **Penetration testing** | Menguji kekuatan seluruh control (teknologi, prosedural, operasional) dengan mengeksploitasi | Eksploitasi dengan Metasploit |
> > | **Cyber Kill Chain** | 7 tahap serangan (Lockheed Martin) | Recon → Weaponization → Delivery → Exploitation → Installation → C2 → Action |
> > | **Reconnaissance** | Mengumpulkan informasi target | WHOIS, Google dorking, Nmap |
> > | **Enumeration/scanning** | Menemukan host, port, service | `nmap -sS -sV` |
> > | **CVE** | ID unik kerentanan yang diungkap publik | CVE-2021-44228 |
> > | **CWE** | Kategori kelemahan | CWE-22 path traversal |
> > | **NVD** | Database yang memperkaya CVE dengan skor dan metadata | Skor CVSS di NVD |
> > | **CVSS** | Skor severity 0.0-10.0 + vector string | Log4Shell = 10 |
> > | **BAS** | Simulasi serangan otomatis dan berkelanjutan | MITRE Caldera |
> >
> > ### Payung 4 - Network Security
> >
> > | Istilah | Definisi singkat | Contoh |
> > |---|---|---|
> > | **Security protocol** | Protokol yang menjalankan fungsi keamanan dengan kriptografi | TLS, IPsec, SSH |
> > | **DDoS** | Membanjiri layanan dari banyak mesin terkompromi | HTTP/SYN/UDP flood dari botnet |
> > | **Reflection attack** | Memalsukan sumber agar pihak ketiga membalas ke korban | Amplifikasi DNS/NTP |
> > | **Replay attack** | Memutar ulang trafik terekam untuk mendapat sesi valid | Mengulang "Transfer $1M" + MAC |
> > | **Man-in-the-middle** | Penyerang berada di tengah dan dapat mengubah komunikasi | ARP poisoning, evil twin |
> > | **Network segregation** | Memisahkan jaringan agar bagian tidak berinteraksi kecuali diizinkan | Subnet, VLAN, ACL |
> > | **Firewall** | Choke point yang memfilter trafik antar jaringan berbeda kepercayaan | Packet filter, stateful, next-gen |
> > | **VPN** | Koneksi aman lewat medium tidak aman | IPsec, OpenVPN |
> > | **NAC** | Identifikasi, autentikasi, compliance check, access control perangkat | Hanya laptop ber-patch terbaru yang boleh masuk |
> > | **DMZ** | Segmen antara Internet dan jaringan internal untuk server publik | Web/mail server |
> > | **IDS** | Memonitor dan mencatat aktivitas jahat; IPS juga memblokir | Snort, Suricata |
> > | **Redundancy** | Cadangan agar tidak ada single point of failure | Dua link, dua firewall HA |
> > | **Link encryption** | Enkripsi header + data per hop | Enkripsi antar router |
> > | **End-to-end encryption** | Hanya data aplikasi, dari sumber ke tujuan | HTTPS/TLS |

> [!cornell] #### Summary
>
> Payung 1-4 menekankan **rantai konsep** (vulnerability → threat → attack, dicegah **control**), **tujuh properti** (C, I, A, authN, authZ, accountability, non-repudiation), **prinsip desain** (least privilege, separation of duties, secure by default, fail-secure, defense in depth, open design), **proses VA/pentest** (kill chain, CVE/CWE/NVD/CVSS), dan **serangan serta kontrol jaringan** (DDoS, replay, MitM; firewall, DMZ, IDS/IPS, VPN, enkripsi link vs end-to-end).

> [!ad-libitum]- Additional Information
>
> #### Cara Menjawab "Definisi dan Contoh"
>
> Format aman: **definisi satu kalimat → contoh konkret → (bila diminta) kaitan dengan istilah lain**. Contoh: "*Least privilege* adalah prinsip bahwa setiap program/pengguna hanya diberi hak minimum untuk menyelesaikan tugasnya. Contoh: web app memakai akun database yang hanya punya SELECT sehingga jika terkena SQL Injection, penyerang tidak bisa mengubah data."
>
> #### Detail Lengkap
> - [[Security Holistik, Vulnerability, Threat, Attack, dan Control]], [[Konsep Keamanan dan Authentication]], [[Confidentiality, Integrity, Accountability, Availability, dan Non-Repudiation]]
> - [[Prinsip Desain Keamanan - Defense in Depth hingga Fail-Secure]], [[Vulnerability Assessment vs Penetration Testing]], [[Segregasi Jaringan, Firewall, VPN, NAC, dan DMZ]]
