---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Worm - Sejarah dan Mekanisme Propagasi
>
> > ## Questions/Cues
> >
> > - Apa beda worm, virus, dan trojan horse?
> > - Apa fase hidup worm?
> > - Pelajaran apa dari Morris worm?
> > - Bagaimana kecepatan propagasi worm meningkat?
> > - Apa saja strategi propagasi worm?
> >
> > ## Reference Points
> >
> > - IF4033 Malware (Slides 27-37)
>
> > ### Worm
> >
> > **Worm** adalah malware yang mereplikasi diri **tanpa host program**, mengirim versi lengkapnya ke mesin lain, dan membawa **payload** (backdoor, spam relay, agen DDoS). Fase: **probing → exploitation → replication → payload**. Biasanya mengeksploitasi celah layanan yang luas dipakai; dampak: DDoS, botnet, akses/korupsi informasi sensitif.
> >
> > | Jenis | Ketergantungan |
> > |---|---|
> > | **Virus** | Kode dalam file/program; bergantung pada **intervensi manusia** |
> > | **Trojan horse** | Bergantung pada intervensi manusia |
> > | **Worm** | **Mandiri** dan menyebar otonom |
> >
> > ### Biaya Serangan Worm
> >
> > - **Morris worm (1988)**: ±6.000 mesin (±10% komputer Internet), biaya ±$10 juta.
> > - **Code Red (Juli 2001)**: >500.000 server, ±$2,6 miliar.
> > - **Love Bug**: $8,75 miliar.
> >
> > ### Morris Worm dan Pelajarannya
> >
> > Dirilis November 1988, menyerang VAX dan SUN-3 (Berkeley UNIX 4.2/4.3) dengan mengeksploitasi beberapa kerentanan Unix. Tidak ada kerusakan langsung, tetapi **replikasi** membebani jaringan dan banyak sistem dimatikan. Pelajaran (Kienzle & Elder): (1) **diversity** itu baik, (2) program besar lebih rentan, tetapi program kecil tidak otomatis aman, (3) pentingnya **password yang baik**.
> >
> > ### Worm Bersejarah
> >
> > | Worm | Tanggal | Ciri khas |
> > |---|---|---|
> > | Morris | 11/1988 | Banyak kerentanan, menyebar ke sistem "terdekat" |
> > | ADM, Ramen, Lion | 1998-2001 | Scanning acak ruang IP; tiga kerentanan; rootkit worm |
> > | Cheese | 6/2001 | *Vigilante worm* yang mengamankan sistem rentan |
> > | Code Red | 7/2001 | Worm Windows signifikan pertama, sepenuhnya di memori |
> > | Nimda | 9/2001 | Windows: client-ke-server, server-ke-server, dll. |
> > | Scalper | 6/2002 | 11 hari setelah pengumuman kerentanan; jaringan P2P |
> > | **Slammer** | 1/2003 | **Satu paket UDP** untuk pertumbuhan eksplosif |
> >
> > ### Kecepatan Propagasi
> >
> > Code Red menginfeksi populasi rentan (360.000 server) dalam **14 jam**; **SQL Slammer** (buffer overflow yang tambalannya rilis 6 bulan sebelumnya, MS02-39) menginfeksi populasi rentan dalam **kurang dari 10 menit**.
> >
> > ### Strategi Propagasi
> >
> > ```mermaid
> > flowchart TB
> >     W["Propagasi worm"] --> S["Scanning<br/>alamat acak"]
> >     W --> CS["Coordinated scanning<br/>instance membagi ruang alamat"]
> >     W --> F["Flash worm<br/>pohon host rentan disiapkan dulu"]
> >     W --> M["Meta-server<br/>tanya server, mis. Google dork"]
> >     W --> T["Topological<br/>log, address book, SSH known_hosts"]
> >     W --> C["Contagion<br/>menumpang komunikasi normal"]
> > ```
> >
> > Flash worm secara teoretis dapat menginfeksi 10⁶ host dalam < 2 detik (Staniford), belum teramati di dunia nyata.

> [!cornell] #### Summary
>
> **Worm** menyebar otonom lewat fase probing, exploitation, replication, payload, berbeda dari virus/trojan yang membutuhkan manusia. Sejarah (Morris 1988, Code Red 2001, Slammer 2003) menunjukkan kenaikan kecepatan dan biaya; pelajarannya: **diversity**, program besar rentan, dan **password baik**. Strategi propagasi: **scanning, coordinated, flash, meta-server, topological, contagion**.

> [!ad-libitum]- Additional Information
>
> #### Worm Modern
>
> **WannaCry (2017)** menggabungkan ransomware dengan worm SMB (EternalBlue), dan **NotPetya** menyebar lewat update software; keduanya menegaskan pentingnya patching dan segmentasi jaringan ([[Segregasi Jaringan, Firewall, VPN, NAC, dan DMZ]]).
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasikan model epidemi SI sederhana untuk worm scanning acak dan plot kurva infeksi pada populasi rentan berbeda.
>
> #### Bacaan Lanjutan
> - Spafford (1989). *The Internet Worm Program: An Analysis*.
> - Staniford, Paxson, Weaver (2002). *How to 0wn the Internet in Your Spare Time*.
