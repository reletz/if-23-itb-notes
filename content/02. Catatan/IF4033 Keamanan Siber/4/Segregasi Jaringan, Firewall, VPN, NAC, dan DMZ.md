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
> > **Subnetting** memecah jaringan besar menjadi segmen kecil terisolasi, meningkatkan keamanan, kinerja, dan kemudahan pengelolaan lewat kontrol aliran trafik antar-segmen.
> >
> > ### Firewall
> >
> > Titik **choke point** untuk kontrol dan monitoring yang menghubungkan jaringan dengan tingkat kepercayaan berbeda. Fungsinya: membatasi layanan jaringan (hanya trafik yang berwenang), melindungi dari ancaman eksternal, membagi jaringan menjadi segmen aman, audit dan kontrol akses, alarm untuk perilaku abnormal, dan menjadi pertahanan perimeter; ia sendiri harus **kebal terhadap penetrasi**.
> >
> > Cara kerja: **1) packet inspection, 2) rule application, 3) stateful monitoring, 4) logging dan alert**.
> >
> > Jenis: *packet filtering gateway/screening router*, *stateful inspection*, *application proxy*, *guard*, *personal firewall*, *application firewall*, *database firewall*, *NAT*, dan **next-generation firewall**.
> >
> > ### VPN
> >
> > Mekanisme membuat koneksi aman antara perangkat dan jaringan, atau antar dua jaringan, melalui medium tidak aman seperti Internet publik. Protokol: **OpenVPN, IPsec, L2TP, PPTP**.
> >
> > ### Network Access Control (NAC)
> >
> > Empat langkah: **device identification, authentication, compliance check, access control**, sehingga hanya perangkat teridentifikasi dan patuh yang boleh terhubung.
> >
> > ### De-Militarized Zone (DMZ)
> >
> > Segmen jaringan (fisik/logis) yang menghubungkan host yang berinterface dengan **jaringan eksternal tidak tepercaya** (Internet) dan **jaringan internal privat**, terisolasi dari keduanya. Server publik (web, mail) ditaruh di DMZ agar jika dikompromikan, jaringan internal tetap terlindungi.
> >
> > ```mermaid
> > flowchart LR
> >     NET["Internet<br/>(tidak tepercaya)"] --> FW1["Firewall 1"]
> >     FW1 --> DMZ["DMZ<br/>web, mail, DNS"]
> >     DMZ --> FW2["Firewall 2"]
> >     FW2 --> LAN["Internal LAN"]
> > ```

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
