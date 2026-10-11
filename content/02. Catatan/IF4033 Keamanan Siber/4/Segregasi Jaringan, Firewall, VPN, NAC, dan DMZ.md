---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Segregasi Jaringan, Firewall, VPN, NAC, dan DMZ
>
> > ## Questions/Cues
> >
> > - Apa tujuan dan manfaat network segregation?
> > - Bagaimana firewall bekerja dan apa saja jenisnya?
> > - Apa fungsi VPN dan Network Access Control?
> > - Apa itu DMZ?
> >
> > ## Reference Points
> >
> > - IF4033 Network Security (Slides 17-25)
>
> > ### Network Segregation
> >
> > Membuat jaringan (sub-jaringan) yang **terisolasi** sehingga bagian berbeda tidak berinteraksi kecuali diizinkan secara eksplisit. Manfaat: **memperlambat penyerang**, meningkatkan keamanan data, dan **membatasi dampak** serangan yang berhasil. Bentuknya: **pemisahan fisik** atau **logis** (subnet, VLAN, firewall, ACL, NAT).
> >
> > 
> > ### Subnet
> > ![[Pasted image 20261011225215.png]]
> > **Subnetting** memecah jaringan besar menjadi segmen kecil terisolasi, meningkatkan keamanan, kinerja, dan kemudahan pengelolaan lewat kontrol aliran trafik antar-segmen.
> >
> > ### Firewall
> > 
> > ![[Pasted image 20261011225248.png]]
> >
> > Titik **choke point** untuk kontrol dan monitoring yang menghubungkan jaringan dengan tingkat kepercayaan berbeda. Fungsinya: membatasi layanan jaringan (hanya trafik yang berwenang), melindungi dari ancaman eksternal, membagi jaringan menjadi segmen aman, audit dan kontrol akses, alarm untuk perilaku abnormal, dan menjadi pertahanan perimeter; ia sendiri harus **kebal terhadap penetrasi**.
> >
> > Cara kerja: **1) packet inspection, 2) rule application, 3) stateful monitoring, 4) logging dan alert**.
> >
> > Jenis: *packet filtering gateway/screening router*, *stateful inspection*, *application proxy*, *guard*, *personal firewall*, *application firewall*, *database firewall*, *NAT*, dan **next-generation firewall**.
> >
> > ### VPN
> > 
> > ![[Pasted image 20261011225334.png]]
> >
> > Mekanisme membuat koneksi aman antara perangkat dan jaringan, atau antar dua jaringan, melalui medium tidak aman seperti Internet publik. Protokol: **OpenVPN, IPsec, L2TP, PPTP**.
> >
> > ### Network Access Control (NAC)
> > 
> > ![[Pasted image 20261011225354.png]]
> >
> > Empat langkah: **device identification, authentication, compliance check, access control**, sehingga hanya perangkat teridentifikasi dan patuh yang boleh terhubung.
> >
> > ### De-Militarized Zone (DMZ)
> > 
> > ![[Pasted image 20261011225448.png]]
> >
> > Segmen jaringan (fisik/logis) yang menghubungkan host yang berinterface dengan **jaringan eksternal tidak tepercaya** (Internet) dan **jaringan internal privat**, terisolasi dari keduanya. Server publik (web, mail) ditaruh di DMZ agar jika dikompromikan, jaringan internal tetap terlindungi.
> >
> > ```mermaid
> > flowchart TD
> >     NET["Internet<br/>(tidak tepercaya)"] --> FW1["Firewall 1"]
> >     FW1 --> DMZ["DMZ<br/>web, mail, DNS"]
> >     DMZ --> FW2["Firewall 2"]
> >     FW2 --> LAN["Internal LAN"]
> > ```
> >
> > #### Asal Istilah dan Gagasan Dasar
> >
> > Istilah *demilitarized zone* dipinjam dari dunia militer: wilayah penyangga antara dua pihak yang tidak saling percaya. Di jaringan, gagasannya sama: layanan yang **harus bisa dijangkau dari Internet** tidak boleh berada di jaringan yang sama dengan aset internal paling berharga. Server publik adalah target paling mungkin diserang, jadi ia ditempatkan di zona "korban yang bisa dikorbankan" yang sudah dibatasi jangkauannya.
> >
> > #### Apa yang Biasanya Ditaruh di DMZ
> >
> > - **Web server** (HTTP/HTTPS) yang melayani publik.
> > - **Mail gateway/relay**, **DNS** publik (*authoritative*), dan **reverse proxy**/load balancer.
> > - **VPN gateway** dan server **FTP/SFTP** untuk pihak luar.
> > - **Bukan** di DMZ: database inti, server file, domain controller, dan sistem HR/keuangan. Ini tetap di jaringan internal.
> >
> > #### Arsitektur DMZ
> >
> > | Arsitektur | Cara | Kelebihan | Kekurangan |
> > |---|---|---|---|
> > | **Single firewall (three-legged)** | Satu firewall dengan tiga antarmuka: Internet, DMZ, LAN | Murah dan sederhana | Firewall menjadi *single point of failure*; jika dibobol, semua zona terbuka |
> > | **Dual firewall (back-to-back)** | Firewall luar (Internet↔DMZ) dan firewall dalam (DMZ↔LAN), idealnya dari vendor berbeda | Lebih kuat: penyerang harus menembus dua lapis | Biaya dan pengelolaan lebih besar |
> >
> > Diagram di atas adalah arsitektur **dual firewall**.
> >
> > #### Aturan Lalu Lintas
> >
> > Prinsipnya **default-deny** dan arah yang asimetris:
> >
> > | Arah | Kebijakan |
> > |---|---|
> > | Internet → DMZ | Diizinkan **hanya** port layanan publik (mis. 80/443, 25) |
> > | Internet → LAN | **Diblokir** |
> > | LAN → DMZ | Diizinkan secukupnya (mis. admin mengelola server, SSH/RDP dari host tertentu) |
> > | **DMZ → LAN** | **Sangat dibatasi**: hanya koneksi spesifik yang diperlukan (mis. web server ke satu port database) |
> > | DMZ → Internet | Dibatasi (hanya update/DNS yang perlu), agar server yang dikompromikan tidak mudah menghubungi C2 |
> >
> > Baris **DMZ → LAN** adalah yang paling krusial: jika server DMZ dikompromikan lalu bebas mengakses LAN, DMZ kehilangan seluruh fungsinya.
> >
> > ```mermaid
> > flowchart LR
> >     I["Internet"] -->|"80/443 saja"| D["DMZ"]
> >     I -.->|"diblokir"| L["Internal LAN"]
> >     A["Admin (LAN)"] -->|"SSH/RDP terbatas"| D
> >     D -->|"1 port DB<br/>(spesifik)"| L
> > ```
> >
> > #### Contoh Skenario
> >
> > Sebuah web aplikasi kampus berjalan di DMZ. Penyerang mengeksploitasi celah di aplikasi dan menguasai web server. Karena DMZ terisolasi, ia **tidak** bisa langsung memindai atau mengakses server nilai, file server, atau domain controller di LAN; ia hanya bisa mencoba lateral movement yang sangat dibatasi aturan firewall dalam dan terdeteksi oleh log serta IDS. Tanpa DMZ (web server di LAN yang sama), kompromi satu server berarti seluruh LAN terbuka.
> >
> > #### Keterbatasan dan Praktik Baik
> >
> > - **DMZ bukan jaminan**: server di DMZ tetap harus di-*hardening*, di-patch, dan dipantau (IDS/IPS, logging terpusat). Lihat [[Software Security dan Application Layer]]: firewall perimeter tidak melihat serangan lapisan aplikasi.
> > - **Aturan DMZ → LAN harus diaudit** berkala; pelonggaran sementara yang tidak dicabut adalah sumber kebocoran klasik.
> > - **Pemisahan lebih lanjut**: pecah DMZ menjadi beberapa subzona (mis. web, mail, database terpisah) agar satu server yang jatuh tidak membuka server DMZ lain.
> > - **Penerapan di cloud**: konsepnya diwujudkan lewat *public/private subnet*, *security group*, dan NetworkPolicy; model modern bergerak ke **Zero Trust** ([[Desain Klasik vs Cloud-Native - Perimeter hingga Zero Trust]]).
> >
> > *Catatan: bagian #### di atas (asal istilah hingga praktik baik) adalah pengayaan dari pengetahuan umum, bukan dari slide, yang hanya memuat definisi dan gambar DMZ.*

> [!cornell] #### Summary
>
> **Segregasi jaringan** (subnet, VLAN, firewall, ACL, NAT) membatasi pergerakan penyerang dan dampak insiden. **Firewall** adalah choke point yang melakukan packet inspection, penerapan aturan, stateful monitoring, serta logging; jenisnya mulai dari packet filter hingga next-gen. **VPN** mengamankan komunikasi lewat medium publik, **NAC** memastikan perangkat teridentifikasi, terautentikasi, dan patuh, sedangkan **DMZ** menampung layanan publik terisolasi dari jaringan internal.

> [!ad-libitum]- Additional Information
>
> #### Zero Trust
>
> Model perimeter (DMZ, firewall) berbasis lokasi; model modern **Zero Trust** memverifikasi tiap request berbasis identitas. Bandingkan di [[Desain Klasik vs Cloud-Native - Perimeter hingga Zero Trust]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Konfigurasi `iptables`/`nftables` default-deny di VM dan izinkan hanya SSH dan HTTP, lalu uji dengan Nmap.
>
> #### Bacaan Lanjutan
> - NIST SP 800-41 *Guidelines on Firewalls and Firewall Policy*.
