---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rangkuman - Studi Kasus Membaca Topologi
>
> > ## Questions/Cues
> >
> > - Bagaimana membaca diagram topologi jaringan?
> > - Di mana menempatkan firewall, DMZ, IDS, dan VPN?
> > - Bagaimana menemukan kelemahan sebuah topologi?
> > - Serangan apa pada bagian mana, dan kontrol apa yang menjawabnya?
> >
> > ## Reference Points
> >
> > - Rangkuman payung 4 (Network Security)
> > - Rangkuman payung 8 (Cloud-Native Security Design)
>
> > ### Cara Membaca Topologi (6 Langkah)
> >
> > 1. **Identifikasi zona dan tingkat kepercayaannya**: Internet (tidak tepercaya), DMZ, internal LAN (paling tepercaya), management.
> > 2. **Temukan perangkat penegak batas**: firewall, router/ACL, VPN gateway, NAC.
> > 3. **Telusuri aliran trafik** (panah/garis): dari mana ke mana, ke port apa, arah koneksi (siapa memulai).
> > 4. **Tandai aset berharga**: database, server file, domain controller. Pastikan tidak dapat dijangkau langsung dari zona tidak tepercaya.
> > 5. **Cari titik lemah**: single point of failure, jalur langsung Internet→LAN, server publik di LAN, segmen datar, kabel/WiFi tanpa enkripsi.
> > 6. **Pasangkan serangan ke lokasi dan kontrolnya.**
> >
> > ### Pola Topologi Referensi
> >
> > ```mermaid
> > flowchart LR
> >     NET["Internet"] --> FW1["Firewall luar"]
> >     FW1 --> DMZ["DMZ<br/>web, mail, DNS, proxy"]
> >     DMZ --> FW2["Firewall dalam"]
> >     FW2 --> LAN["Internal LAN<br/>workstation, file server"]
> >     FW2 --> DB["Zona data<br/>database"]
> >     NET -.->|"VPN (IPsec/OpenVPN)"| VG["VPN gateway"] --> LAN
> >     IDS["NIDS (SPAN/tap)"] -.-> DMZ
> > ```
> >
> > **Variasi di slide:** satu firewall multi-zona dengan Internet, DMZ1 (proxy, email, web), DMZ2 (application dan database server), dan Internal. Panah: (1) Internet→web di DMZ1, (2) DMZ1→DMZ2, (3) Internal↔DMZ2, (4) workstation→proxy (keluar via proxy).
> >
> > ### Aturan Lalu Lintas Ideal
> >
> > | Arah | Kebijakan |
> > |---|---|
> > | Internet → DMZ | Hanya port layanan publik (80/443, 25) |
> > | Internet → LAN | **Blokir** |
> > | DMZ → LAN | **Sangat terbatas** (mis. satu port ke database) |
> > | LAN → Internet | Via proxy/NAT, terfilter |
> > | Admin → DMZ | SSH/RDP terbatas dari host/VPN tertentu |
> > | Default | **Deny** |
> >
> > ### Penempatan Komponen
> >
> > | Komponen | Letak yang tepat | Alasan |
> > |---|---|---|
> > | **Firewall** | Di batas antar-zona (Internet↔DMZ↔LAN) | Choke point |
> > | **Server publik** | **DMZ**, bukan LAN | Jika bobol, LAN tetap aman |
> > | **Database** | Zona internal/data, tidak di DMZ | Aset berharga |
> > | **NIDS** | Pada trafik yang melewati firewall (SPAN/tap), di depan dan/atau di belakang firewall | Deteksi serangan yang lolos/gagal |
> > | **HIDS** | Pada server kritis | Deteksi di host |
> > | **VPN gateway** | Di tepi, dengan autentikasi kuat | Akses jarak jauh aman |
> > | **Proxy** | DMZ, untuk trafik keluar pengguna | Filter dan log |
> > | **NAC** | Di akses LAN/WiFi | Hanya perangkat patuh |
> > | **Redundansi** | Firewall HA, link ganda | Hindari SPOF |
> >
> > ### Serangan → Lokasi → Kontrol
> >
> > | Serangan | Terjadi di | Kontrol |
> > |---|---|---|
> > | DDoS/SYN flood | Tepi Internet → server publik | Rate limiting, CDN/scrubbing, redundansi, SYN cookies |
> > | Port scan/recon aktif | Internet → semua host | Firewall default-deny, IDS, tutup port |
> > | MitM / sniffing | LAN, WiFi, jalur Internet | TLS, IPsec/VPN, mutual auth, enkripsi link |
> > | Replay | Antar klien-server | Nonce, timestamp, sequence number |
> > | Spoofing IP/ARP | LAN/Internet | Ingress filtering, DAI, autentikasi |
> > | Eksploitasi web app | Web server di DMZ | WAF, patching, secure coding, least privilege |
> > | Lateral movement | Dari DMZ/LAN ke server lain | Segmentasi, aturan DMZ→LAN ketat, micro-segmentation |
> > | Akses tak sah dari luar ke aset dalam | Internet → LAN | Firewall, DMZ, VPN + MFA |
> > | Eksfiltrasi/C2 | LAN/DMZ → Internet | Egress filtering, proxy, IDS |
> > | Insider/perangkat tak patuh | LAN | NAC, segmentasi, least privilege |
> >
> > ### Kelemahan Topologi yang Sering Dicari
> >
> > - **Satu firewall tanpa redundansi** (single point of failure) atau satu firewall yang menjadi satu-satunya penghalang (dual firewall lebih berlapis).
> > - **Server publik di LAN** tanpa DMZ.
> > - **DMZ boleh bebas ke LAN** (aturan DMZ→LAN terlalu longgar).
> > - **Jaringan datar** tanpa segmentasi (VLAN/subnet).
> > - **Tidak ada IDS/log terpusat**: serangan tidak terdeteksi, tidak ada accountability.
> > - **Trafik tidak terenkripsi** pada link terbuka (WiFi, Internet).
> > - **Remote access tanpa VPN/MFA**.
> > - **Versi cloud-native:** jaringan pod datar (tanpa NetworkPolicy), tanpa egress filtering, tanpa mTLS ([[Desain Klasik vs Cloud-Native - Perimeter hingga Zero Trust]]).

> [!cornell] #### Summary
>
> Membaca topologi: **zona + tingkat kepercayaan → perangkat penegak batas → aliran trafik → aset berharga → titik lemah → serangan dan kontrol**. Pola aman: server publik di **DMZ** di antara firewall, aset internal di belakang aturan **default-deny** dengan **DMZ→LAN** sangat terbatas, **IDS** memantau, **VPN** untuk akses jarak jauh, serta **redundansi** untuk menghindari single point of failure.

> [!ad-libitum]- Additional Information
>
> #### Format Jawaban
>
> Untuk "Apa kelemahan topologi ini?": sebutkan **kelemahan → serangan yang mungkin → dampak (CIA) → perbaikan**. Untuk "Di mana IDS?": sebut jenis (NIDS/HIDS), lokasi, dan apa yang dilihatnya (sebelum firewall = semua serangan; sesudah = yang lolos).
>
> #### Detail Lengkap
> - [[Segregasi Jaringan, Firewall, VPN, NAC, dan DMZ]], [[IDS, Redundancy, Enkripsi Jaringan, dan Studi Kasus Target]], [[Serangan Jaringan - DDoS, Reflection, Replay, dan Man-in-the-Middle]], [[Ancaman Jaringan dan Keamanan per Lapisan OSI]]
