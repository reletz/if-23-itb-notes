---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Cyber Kill Chain
>
> > ## Questions/Cues
> >
> > - Apa itu Cyber Kill Chain dan siapa yang mengembangkannya?
> > - Apa tujuh tahapnya?
> > - Teknik dan tool apa yang khas pada tiap tahap?
> > - Bagaimana model ini membantu pertahanan?
> >
> > ## Reference Points
> >
> > - IF4033 Vulnerability Assessment (Slides 6-14)
>
> > ### Model Tujuh Tahap
> >
> > **Cyber Kill Chain** dikembangkan oleh **Lockheed Martin** untuk menggambarkan tahapan serangan siber dari awal hingga mencapai tujuan penyerang. Dengan memahami rantainya, pembela dapat **memutus rantai** di tahap mana pun.
> >
> > ```mermaid
> > flowchart LR
> >     R["1. Reconnaissance"] --> W["2. Weaponization"] --> D["3. Delivery"] --> E["4. Exploitation"] --> I["5. Installation"] --> C["6. Command &<br/>Control"] --> A["7. Action on<br/>Objective"]
> > ```
> >
> > | Tahap | Tujuan | Contoh metode/tool |
> > |---|---|---|
> > | **Reconnaissance** | Mengumpulkan informasi target sebanyak mungkin **tanpa kontak jaringan langsung** | WHOIS, Google Dorking, menelusuri situs |
> > | **Weaponization** | Membuat/memodifikasi malware atau serangan yang memanfaatkan kerentanan | Metasploit, Exploit-DB, ransomware |
> > | **Delivery** | Menyusup ke jaringan/pengguna dan mengirim malware | Email, *drive-by download*, trojan horse, intrusion, USB terinfeksi |
> > | **Exploitation** | Menjalankan payload, bergerak lateral, mencari target bernilai lain | SQL Injection, buffer overflow, RCE |
> > | **Installation** | Mendapat akses lebih baik | Memasang RAT/malware, DLL hijacking, rootkit |
> > | **Command & Control (C2)** | Menyiapkan akses persisten dan mengendalikan malware dari jauh | Rootkit, botnet |
> > | **Action on Objective** | Melaksanakan tujuan akhir | DDoS/spam botnet, eksfiltrasi data, **ransomware** sebagai alat pemerasan |
> >
> > ### Relevansi
> >
> > Dalam VA/pentest, tahap awal (reconnaissance, scanning) identik dengan aktivitas penyerang sungguhan. Pembela dapat menempatkan control per tahap: threat intelligence dan pengurangan jejak informasi (recon), email filtering (delivery), patching (exploitation), EDR (installation), dan egress filtering (C2).

> [!cornell] #### Summary
>
> **Cyber Kill Chain** (Lockheed Martin) membagi serangan menjadi tujuh tahap: **reconnaissance, weaponization, delivery, exploitation, installation, command & control, action on objective**. Tiap tahap punya teknik khas (WHOIS/dorking, Metasploit, email/drive-by, SQLi/RCE, rootkit/DLL hijacking, botnet, ransomware/eksfiltrasi). Memahami rantai ini memungkinkan pertahanan memutus serangan sedini mungkin.

> [!ad-libitum]- Additional Information
>
> #### Kill Chain vs MITRE ATT&CK
>
> Kill Chain bersifat linear dan tingkat tinggi; **MITRE ATT&CK** lebih granular (taktik dan teknik, tidak harus berurutan) dan lebih sering dipakai untuk pemetaan deteksi. Banyak organisasi memakai keduanya.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih satu laporan insiden ransomware, petakan ke tujuh tahap, lalu tentukan control yang akan memutus rantai di tiap tahap.
>
> #### Bacaan Lanjutan
> - Hutchins, Cloppert, Amin (2011). *Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains*.
> - MITRE ATT&CK Enterprise Matrix.
