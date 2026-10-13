---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Attack Surface dan Reduksinya
>
> > ## Questions/Cues
> >
> > - Apa definisi attack surface sebuah aplikasi?
> > - Mengapa menyembunyikan/menghilangkan fitur mengurangi risiko?
> > - Apa saja dimensi attack surface (channel, protokol, hak akses, target/enabler)?
> > - Apa itu Relative Attack Surface Quotient (RASQ)?
> > - Lima pertanyaan apa yang diajukan untuk mengurangi attack surface?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian "Attack Surface", "Attack Surface Dimensions", "20 RASQ Attack Vectors", "Relative Attack Surface", "To reduce the attack surface"
>
> > ### Definisi dan Intuisi
> >
> > Untuk menyerang target, target harus **terlihat atau terekspos**. Itu sebabnya perang memakai bunker, parit, dan kamuflase: strategi pertahanan terbaik adalah **menyembunyikan objek dari pandangan publik**. Pada komputer, hanya bagian program yang **dapat diakses penyerang** yang dapat menjadi target, yaitu bagian yang terekspos lewat user interface atau API.
> >
> > **Attack surface** sebuah aplikasi adalah **gabungan (union) dari kode, antarmuka, layanan, protokol, dan praktik** yang terekspos kepada pengguna, atau penyerang. Mengurangi attack surface berarti **mengurangi risiko serangan**, dengan memahami titik masuk sistem dan **tingkat kepercayaan yang dibutuhkan** untuk mengaksesnya (autentikasi dan otorisasi). Analisis attack surface menunjukkan area yang bisa diserang; digabung dengan [[Attack Tree]], hasilnya adalah rencana aksi untuk membangun sistem aman.
> >
> > ### Dimensi Attack Surface
> >
> > | Dimensi | Isi | Contoh |
> > |---|---|---|
> > | **Channels x Protocols** | Cara pesan berpindah dan protokolnya | message passing, shared memory; RPC, streaming, FTP |
> > | **Access Rights** | Principals x Objects x Rights | Siapa boleh apa pada objek apa |
> > | **Targets & Enablers** | Proses dan data (carrier, executable) | Server web (enabler), browser (enabler), dokumen HTML (carrier), payload hasil ekstraksi |
> >
> > ```mermaid
> > flowchart TB
> >     AS["Attack Surface"]
> >     AS --> CP["Channels x Protocols"]
> >     AS --> AR["Access Rights<br/>Principals x Objects x Rights"]
> >     AS --> TE["Targets &amp; Enablers<br/>Processes, Data"]
> >     CP --> EX1["Open socket, RPC,<br/>named pipe, web handler"]
> >     AR --> EX2["Akun aktif, admin group,<br/>weak ACL"]
> >     TE --> EX3["Services, dynamic pages,<br/>scripting aktif"]
> > ```
> >
> > ### RASQ: Relative Attack Surface Quotient
> >
> > Howard (2003) merumuskan **20 vektor serangan RASQ untuk Windows**, antara lain: open socket, open RPC endpoint, open named pipe, service (default / berjalan sebagai SYSTEM), active web handler dan ISAPI filter, dynamic web page, executable vdir, enabled account (termasuk di admin group, guest), null session, weak ACL (file system/registry/share), serta VBScript/JScript/ActiveX aktif.
> >
> > Karakter RASQ: **tingkat abstraksi menengah**, netral terhadap jumlah/jenis bug kode (mis. buffer overrun), **lebih bermakna daripada hitungan CVE/advisory**, berfokus pada vektor serangan dan fitur yang berpotensi diserang berdasarkan eksploit masa lalu. Rumus intuitifnya: **Features to Attack x Security Bugs = Exploits**; fitur lebih sedikit berarti eksploit lebih sedikit, dan analisis dilakukan sebagai **perbandingan relatif**.
> >
> > ### Lima Pertanyaan untuk Mengurangi Attack Surface
> >
> > 1. **Apakah fitur ini benar-benar perlu?** Jika tidak dibutuhkan mayoritas pengguna, matikan secara default.
> > 2. **Perlukah ditawarkan dari lokasi remote?** Jika ya, dari mana dan lewat mekanisme/jaringan apa.
> > 3. **Siapa yang perlu mengaksesnya?** Tentukan pengguna sah dan mekanisme validasinya.
> > 4. **Privilege apa yang dibutuhkan?** Jika perlu eskalasi, berapa lama.
> > 5. **Apa antarmuka dengan layanan lain?** Jika crash, apa dampaknya terhadap sistem secara keseluruhan.

> [!cornell] #### Summary
>
> **Attack surface** adalah gabungan kode, antarmuka, layanan, protokol, dan praktik yang terekspos; semakin kecil, semakin kecil risikonya. Dimensinya: **channels x protocols, access rights, targets & enablers**. **RASQ** mengukur surface secara relatif lewat vektor serangan (socket terbuka, service default, akun aktif, ACL lemah). Pengurangan dilakukan lewat lima pertanyaan: perlukah fitur, remote atau tidak, siapa pengguna, privilege apa, dan dampak ke layanan lain.

> [!ad-libitum]- Additional Information
>
> #### Attack Surface Modern
> Pada sistem cloud-native, surface mencakup **endpoint API, bucket publik, secret di repositori, image container, dan dependensi pihak ketiga**. Alat enumerasi: `nmap`, `amass`, cloud security posture management (CSPM). Prinsip *secure by default* dan *least functionality* adalah padanan praktisnya; lihat [[Prinsip Desain Saltzer dan Schroeder]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan `nmap` pada mesin lab Anda, daftar port/service yang terbuka, dan putuskan mana yang bisa dimatikan memakai lima pertanyaan di atas.
> 2. Hitung "RASQ sederhana" (jumlah vektor aktif) sebelum dan sesudah hardening.
>
> #### Bacaan Lanjutan
> - Howard, Pincus & Wing, *Measuring Relative Attack Surfaces*
> - Manadhata & Wing, *An Attack Surface Metric*
