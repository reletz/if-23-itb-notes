---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Spyware, Scareware, Ransomware, dan Botnet
>
> > ## Questions/Cues
> >
> > - Apa itu spyware, keylogger, dan screen scraper?
> > - Bagaimana scareware memanfaatkan social engineering?
> > - Bagaimana ransomware bekerja?
> > - Bagaimana botnet dibangun dan dipakai untuk serangan DDoS?
> > - Ke mana arah masa depan crimeware?
> >
> > ## Reference Points
> >
> > - IF4033 Malware (Slides 38-47)
> > - IF4033 Malware (Slide 66)
>
> > ### Spyware
> >
> > Malware yang mengumpulkan sedikit demi sedikit informasi pengguna **tanpa sepengetahuan** mereka: **keylogger** (merekam ketikan), **screen scraper** (membaca isi layar), pelacak kebiasaan browsing, pengalih peramban, dan penampil iklan.
> >
> > ### Scareware
> >
> > Software dengan payload jahat atau manfaat minim yang **dijual lewat social engineering** untuk menimbulkan kejutan, kecemasan, atau persepsi ancaman (mis. antivirus palsu). Pertumbuhan pesat: paket scareware naik dari 2.850 ke 9.287 (semester 2 2008); APWG mencatat kenaikan **583%** pada semester 1 2009; studi Google 2010 menemukan 11.000 domain antivirus palsu, **50%** malware yang tersebar lewat iklan Internet.
> >
> > ### Ransomware
> >
> > Menyandera sistem atau data korban dengan tuntutan **tebusan**. Bentuk: menonaktifkan layanan penting atau mengunci layar saat startup; atau **mengenkripsi** berkas pribadi (awalnya disebut *cryptovirus/cryptotrojan/cryptoworm*). Korban harus memasukkan kode yang hanya diperoleh setelah membayar (transfer atau SMS) atau membeli alat dekripsi/penghapus.
> >
> > ### Zombie dan Botnet
> >
> > Penyerang diam-diam mengambil alih komputer lain dengan mengeksploitasi cacat software dan membentuk **botnet**: kumpulan mesin terkompromi yang menjalankan worm/trojan/backdoor di bawah infrastruktur **command and control**. Dipakai untuk DDoS, phishing, spamming, dan cracking.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Attacker
> >     participant Z as Zombies
> >     participant M as Master Server
> >     participant T as Target
> >     A->>Z: 1-2. Scan dan pasang agen zombie
> >     Z->>M: 3. "Phone home"
> >     A->>M: 4. Perintah serangan DDoS
> >     M->>Z: 5. Sinyal serang
> >     Z->>T: 6. Banjir request, user sah ditolak
> > ```
> >
> > ### Masa Depan Crimeware
> >
> > Crimeware, vandalware, terrorware, dan ransomware akan: memakai trafik **SSL terenkripsi** untuk berbaur; menyasar **platform baru** (ponsel, mobil, wearable) dan aplikasi "berisiko" (judi, warez); memakai **jejaring sosial** untuk bootstrap serangan; **malware berbasis AI**; dan makin resilien berkat library enkripsi, infrastruktur terdesentralisasi, serta mata uang kripto.

> [!cornell] #### Summary
>
> **Spyware** (keylogger, screen scraper) mencuri informasi diam-diam; **scareware** menjual perangkat lunak palsu lewat ketakutan; **ransomware** mengunci atau mengenkripsi data demi tebusan; **botnet** mengendalikan zombie lewat master server untuk DDoS, spam, dan phishing. Ke depan, crimeware makin memakai enkripsi, platform baru, AI, dan infrastruktur terdesentralisasi.

> [!ad-libitum]- Additional Information
>
> #### Ransomware-as-a-Service dan Double Extortion
>
> Ekonomi ransomware modern berbentuk **RaaS** (afiliasi menyewa platform), memakai **double extortion** (data dicuri lalu dibocorkan jika tidak bayar). Pertahanan inti: **backup offline/immutable yang diuji pemulihannya**, segmentasi, dan MFA; sejalan dengan fungsi *Recover* NIST CSF ([[Kerangka Countermeasure - NIST CSF dan ISO 27002]]). Detail DDoS ada di [[Serangan Jaringan - DDoS, Reflection, Replay, dan Man-in-the-Middle]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Rancang prosedur pemulihan ransomware (RTO/RPO, backup 3-2-1) untuk laboratorium kecil dan uji restore secara berkala.
>
> #### Bacaan Lanjutan
> - CISA *#StopRansomware Guide*.
> - Sophos *State of Ransomware* (laporan tahunan).
