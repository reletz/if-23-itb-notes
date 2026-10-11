---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] IDS, Redundancy, Enkripsi Jaringan, dan Studi Kasus Target
>
> > ## Questions/Cues
> >
> > - Apa fungsi IDS/IPS dan apa jenis deteksinya?
> > - Mengapa redundancy penting?
> > - Apa beda link encryption dan end-to-end encryption?
> > - Pelajaran apa dari breach Target?
> >
> > ## Reference Points
> >
> > - IF4033 Network Security (Slides 26-34)
>
> > ### Intrusion Detection System (IDS)
> >
> > IDS memonitor jaringan/sistem untuk **mengidentifikasi aktivitas jahat dan pelanggaran kebijakan** lalu mencatatnya. **IPS** serupa tetapi juga mencoba **memblokir** aktivitas tersebut.
> >
> > | Dimensi | Jenis |
> > |---|---|
> > | **Detection type** | *Signature-based* (pola dikenal), *heuristic* (perilaku anomali), *stealth* |
> > | **Deployment** | *Network-based* (NIDS), *host-based* (HIDS) |
> >
> > ### Redundancy
> >
> > Memakai sumber daya jaringan cadangan untuk meminimalkan atau mencegah downtime akibat gangguan listrik, kegagalan hardware, human error, kegagalan sistem, atau serangan siber. Tujuan utama: **menghindari single point of failure**.
> >
> > ### Defense in Depth pada Jaringan
> >
> > Kombinasi segregasi, firewall, IDS/IPS, redundansi, dan enkripsi: kegagalan satu lapis tidak langsung menjatuhkan seluruh sistem.
> >
> > ### Enkripsi: Link vs End-to-End
> >
> > | Aspek | Link Encryption | End-to-End Encryption |
> > |---|---|---|
> > | Yang dienkripsi | Header **dan** data | Hanya data lapisan aplikasi |
> > | Transparansi | Transparan bagi pengguna | Perangkat jaringan tidak perlu tahu |
> > | Posisi | Per hop (antar-node) | Dari sumber ke tujuan |
> > | Kelemahan | Data terbuka di tiap node perantara | Header/metadata tetap terlihat |
> >
> > ```mermaid
> > flowchart LR
> >     S["Sumber"] -->|"enkripsi per link"| R1["Router 1"] -->|"enkripsi per link"| R2["Router 2"] -->|"enkripsi per link"| T["Tujuan"]
> > ```
> >
> > ### Studi Kasus: Breach Target
> >
> > Diskusi dalam materi menyoroti: kegagalan **incident detection and response** (alert tidak ditindaklanjuti tepat waktu), pentingnya **security awareness dan training**, **dampak finansial dan reputasi**, perlunya **audit, pentest, dan monitoring berkelanjutan**, serta **third-party risk management**: breach difasilitasi keamanan vendor yang lemah, sehingga akses vendor perlu *vetting*, kontrol akses ketat, dan asesmen berkala.

> [!cornell] #### Summary
>
> **IDS** mendeteksi (dan **IPS** memblokir) aktivitas jahat dengan metode signature, heuristic, atau stealth, ditempatkan di jaringan atau host. **Redundancy** menghilangkan single point of failure. **Link encryption** melindungi header dan data per hop, sedangkan **end-to-end** hanya mengenkripsi data aplikasi dari sumber ke tujuan. Kasus **Target** menegaskan pentingnya respons insiden yang cepat, awareness, dan **manajemen risiko pihak ketiga**.

> [!ad-libitum]- Additional Information
>
> #### Detail Kasus Target (2013)
>
> Penyerang menembus jaringan melalui kredensial vendor HVAC, bergerak lateral karena segmentasi lemah, lalu memasang malware pada POS dan mencuri sekitar 40 juta data kartu. Alert dari sistem FireEye sebenarnya sudah muncul tetapi tidak ditindaklanjuti.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pasang Suricata atau Snort pada lab, buat satu rule kustom untuk mendeteksi port scan Nmap.
>
> #### Bacaan Lanjutan
> - Krebs on Security: *Target Hackers Broke in Via HVAC Company*.
> - NIST SP 800-94 *Guide to IDPS*.
