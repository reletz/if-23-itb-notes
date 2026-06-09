---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3210 Pengembangan Aplikasi Piranti Bergerak]]

> [!cornell] OWASP Mobile Top 10 and Mobile Security Landscape
>
> > ## Questions/Cues
> >
> > - Mengapa mobile device memiliki risiko keamanan yang unik dibanding platform lain?
> > - Bagaimana evolusi OWASP Mobile Top 10 dari 2014 ke 2016 hingga 2024?
> > - Apa perbedaan utama antara OWASP Mobile Top 10 2016 dan 2024?
> > - Apa saja lima tantangan keamanan enterprise di era mobile?
> > - Bagaimana tiga domain keamanan (device, network, application) saling berkaitan?
> >
> > ## Reference Points
> >
> > - IF3210 Pengembangan Aplikasi Piranti Bergerak (Slides 1-17)
>
> > ### Mobile sebagai Platform Dominan dan Tantangan Keamanannya
> >
> > Perangkat mobile telah menjadi platform utama dalam kehidupan digital modern. Lima tren besar mendorong dominasi ini: mobile sebagai **primary platform** untuk akses internet, sumber **insights dari data** pengguna, media utama untuk **bertransaksi** (mobile commerce), membangun **continuous brand experience**, dan menjadi gateway menuju ekosistem **IoT**. Dominasi ini menjadikan mobile sebagai target empuk bagi penyerang.
> >
> > Keunikan mobile sebagai platform menciptakan tantangan keamanan tersendiri. Perangkat mobile **dibagi ke lebih banyak orang** (keluarga, kolega), mendukung **multiple personas** (pribadi sekaligus kerja), bersifat **beragam** (berbeda OS, carrier, dan versi), **digunakan di lebih banyak lokasi** (termasuk jaringan publik yang tidak aman), dan desainnya lebih **user-centric** sehingga sering mengutamakan kemudahan di atas keamanan.
> >
> > ### Evolusi OWASP Mobile Top 10
> >
> > **OWASP (Open Web Application Security Project)** secara berkala menerbitkan daftar risiko keamanan paling kritis. Untuk mobile, daftar ini telah berkembang tiga kali sejak 2014:
> >
> > **OWASP Mobile Top 10 (2014)**: Daftar pertama yang mendefinisikan landscape keamanan mobile, mencakup M1–M10 dengan fokus pada kelemahan klien-sisi seperti penyimpanan data tidak aman, transmisi data tidak aman, dan autentikasi lemah.
> >
> > **OWASP Mobile Top 10 (2016)**: Revisi signifikan yang memperkenalkan kategorisasi lebih presisi:
> > - **M1** Improper Platform Usage
> > - **M2** Insecure Data Storage
> > - **M3** Insecure Communication
> > - **M4** Insecure Authentication
> > - **M5** Insufficient Cryptography
> > - **M6** Insecure Authorization
> > - **M7** Client Code Quality
> > - **M8** Code Tampering
> > - **M9** Reverse Engineering
> > - **M10** Extraneous Functionality
> >
> > **OWASP Mobile Top 10 (2024)**: Pembaruan terkini yang mencerminkan ancaman modern, terutama terkait supply chain dan privacy:
> > - **M1** Improper Credential Usage
> > - **M2** Inadequate Supply Chain Security
> > - **M3** Insecure Authentication/Authorization
> > - **M4** Insufficient Input/Output Validation
> > - **M5** Insecure Communication
> > - **M6** Inadequate Privacy Controls
> > - **M7** Insufficient Binary Protections
> > - **M8** Security Misconfiguration
> > - **M9** Insecure Data Storage
> > - **M10** Insufficient Cryptography
> >
> > ### Perbandingan OWASP Mobile Top 10: 2016 vs 2024
> >
> > ```mermaid
> > flowchart LR
> >     subgraph v2016["OWASP Mobile 2016"]
> >         A1["M1 Improper Platform Usage"]
> >         A2["M2 Insecure Data Storage"]
> >         A3["M3 Insecure Communication"]
> >         A4["M8 Code Tampering"]
> >         A5["M9 Reverse Engineering"]
> >     end
> >     subgraph v2024["OWASP Mobile 2024"]
> >         B1["M1 Improper Credential Usage"]
> >         B2["M2 Supply Chain Security"]
> >         B3["M5 Insecure Communication"]
> >         B4["M7 Binary Protections"]
> >         B5["M9 Insecure Data Storage"]
> >     end
> >     A1 -.->|"berevolusi"| B1
> >     A2 -.->|"tetap relevan"| B5
> >     A3 -.->|"tetap relevan"| B3
> >     A4 -.->|"diperluas"| B4
> >     A5 -.->|"digabung"| B4
> > ```
> >
> > Perubahan terbesar dari 2016 ke 2024 adalah kemunculan **M2 Inadequate Supply Chain Security** yang sebelumnya tidak ada — mencerminkan meningkatnya serangan melalui library pihak ketiga dan proses build. Selain itu, **M6 Inadequate Privacy Controls** (2024) menunjukkan meningkatnya kesadaran regulasi privasi seperti GDPR.
> >
> > ### Tantangan Keamanan Enterprise
> >
> > Dari perspektif enterprise, ada lima area tantangan utama dalam mengamankan ekosistem mobile korporat:
> >
> > 1. **Data separation**: Memisahkan data pribadi dan data perusahaan di perangkat yang sama (terutama BYOD)
> > 2. **BYOD adaptation**: Menyesuaikan kebijakan keamanan dengan perangkat milik karyawan
> > 3. **Secure access to enterprise apps**: Memastikan hanya pengguna terautentikasi yang dapat mengakses aplikasi internal
> > 4. **Developing secure apps**: Membangun aplikasi dengan security by design, bukan sebagai tambahan
> > 5. **Adaptive security posture**: Kemampuan merespons ancaman baru secara cepat dan dinamis
> >
> > Ketiga domain keamanan yang harus dikelola adalah: **device management** (MDM, enkripsi perangkat), **network/data management** (VPN, enkripsi transmisi), dan **application management** (code signing, app wrapping, container). IBM dan vendor enterprise lainnya menawarkan framework strategi yang mengintegrasikan ketiga domain ini.

> [!cornell] #### Summary
>
> **Mobile security landscape** didorong oleh dominasi mobile sebagai platform utama sekaligus keunikannya — dibagi antar pengguna, multi-persona, digunakan di lokasi beragam — yang menciptakan permukaan serangan lebih luas. **OWASP Mobile Top 10** berevolusi dari 2014 ke 2016 dan 2024 untuk mencerminkan ancaman terkini; perubahan terbesar di 2024 adalah masuknya **Supply Chain Security** dan **Privacy Controls** sebagai kategori baru. Dari sisi enterprise, lima tantangan utama mencakup data separation, BYOD, secure app access, secure development, dan adaptive posture, yang dikelola melalui tiga domain: **device**, **network/data**, dan **application management**.

> [!ad-libitum]- Additional Information
>
> #### OWASP Mobile Top 10 vs OWASP Web Top 10
>
> Meskipun keduanya diterbitkan oleh OWASP, Mobile Top 10 berbeda signifikan dari Web Top 10. Risiko web seperti SQL Injection dan XSS tetap relevan di sisi server, namun mobile memiliki risiko unik seperti Code Tampering dan Reverse Engineering yang tidak ada dalam konteks web tradisional. Pengembang mobile perlu memahami keduanya karena aplikasi mobile sering berkomunikasi dengan backend web.
>
> #### Implikasi BYOD bagi Pengembang Aplikasi
>
> Dalam konteks BYOD, pengembang harus mempertimbangkan skenario di mana aplikasi perusahaan berjalan di perangkat yang berpotensi telah di-root atau di-jailbreak. Teknik seperti **root detection**, **integrity checking**, dan **app wrapping** menjadi penting untuk melindungi data perusahaan dari penyalahgunaan di perangkat yang tidak dikelola penuh oleh IT.
>
> #### Supply Chain Attack pada Mobile
>
> Kemunculan M2 di OWASP 2024 mencerminkan tren serangan supply chain, di mana library open source yang digunakan ribuan aplikasi dapat menjadi vektor serangan. Contoh nyata: serangan pada library npm/gradle yang diinjeksi malware sebelum dipublikasikan. Mitigasi: gunakan dependency lock files, verifikasi checksum library, dan pantau advisory keamanan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Audit sebuah aplikasi Android yang Anda kembangkan menggunakan checklist OWASP Mobile Top 10 2024 — identifikasi potensi kelemahan di setiap kategori
> 2. Bandingkan kebijakan keamanan dua MDM (Mobile Device Management) solution populer (misalnya Microsoft Intune vs VMware Workspace ONE) dalam menangani BYOD
> 3. Gunakan tools seperti MobSF (Mobile Security Framework) untuk melakukan static analysis pada APK sederhana
>
> #### Bacaan Lanjutan
>
> - OWASP Mobile Application Security Verification Standard (MASVS)
> - OWASP Mobile Security Testing Guide (MSTG)
> - "Mobile App Security Best Practices" — Android Security Team Blog
> - NIST SP 800-124: "Guidelines for Managing the Security of Mobile Devices in the Enterprise"
