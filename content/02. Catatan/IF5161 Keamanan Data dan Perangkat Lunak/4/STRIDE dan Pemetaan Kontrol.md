---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] STRIDE dan Pemetaan Kontrol
>
> > ## Questions/Cues
> >
> > - Apa kepanjangan STRIDE dan siapa yang mengembangkannya?
> > - Properti keamanan apa yang dilanggar oleh tiap kategori STRIDE?
> > - Kontrol apa yang cocok untuk tiap ancaman?
> > - Kapan STRIDE dipakai dan apa batasannya?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian "STRIDE" dan "Identify Threats - Illustration"
>
> > ### Apa itu STRIDE
> >
> > **STRIDE** adalah metodologi mengidentifikasi ancaman yang dikembangkan **Microsoft (1990-an)** untuk threat modeling sistem mereka. Fokusnya **software-centric dan pada cacat keamanan tingkat komponen**: tiap elemen DFD ditinjau terhadap enam kategori ancaman.
> >
> > | Huruf | Ancaman | Properti dilanggar | Deskripsi |
> > |---|---|---|---|
> > | **S** | Spoofing identity | Authenticity | Adversary menyamar sebagai pengguna sah |
> > | **T** | Tampering with data | Integrity | Data ke/dari aplikasi harus diamankan agar tidak diubah |
> > | **R** | Repudiation | Non-repudiation | Pengguna tak jujur menyangkal transaksi karena audit/rekaman tidak memadai |
> > | **I** | Information disclosure | Confidentiality | Data pengguna/rahasia terbongkar: hilang kepercayaan dan kerugian finansial |
> > | **D** | Denial of Service | Availability | Aplikasi harus siap menghadapi DoS |
> > | **E** | Elevation of privilege | Authorization | Pengguna biasa menaikkan perannya ke peran lebih tinggi (admin) |
> >
> > ### Pemetaan Ancaman ke Kontrol
> >
> > | Ancaman | "Apa itu" | Teknik software | Keamanan lanjutan |
> > |---|---|---|---|
> > | **Spoof** | Impersonation, social engineering | Enkripsi password, tanpa backdoor, secure password | Digital certificate, security awareness |
> > | **Tamper** | No integrity / fraud | Validasi input, cegah buffer overrun, tutup resource tak terpakai | Authentication, access control, message digest |
> > | **Repudiation** | "I did not do that!" | Wajibkan password, log transaksi pengguna | Transaction logging, digital signature |
> > | **Info disclosure** | No confidentiality | Enkripsi data dan paket, permission minimal | Encryption, authentication, secure handling |
> > | **DoS** | No availability: sistem/jaringan/DB penuh | Validasi pengguna nyata (CAPTCHA), uji kegagalan | Firewall, Intrusion Prevention System |
> > | **Elevation of privilege** | Melampaui wewenang | Hati-hati pesan error, sembunyikan file sistem, minta approval | Access control, segregation of duties |
> >
> > ```mermaid
> > flowchart LR
> >     S["Spoofing"] -->|"lawan dengan"| A["Authentication"]
> >     T["Tampering"] -->|"lawan dengan"| I["Integrity (hash, MAC)"]
> >     R["Repudiation"] -->|"lawan dengan"| N["Logging &amp; signature"]
> >     ID["Info Disclosure"] -->|"lawan dengan"| C["Encryption"]
> >     D["DoS"] -->|"lawan dengan"| AV["Rate limit, redundancy"]
> >     E["Elevation"] -->|"lawan dengan"| AZ["Authorization, least privilege"]
> > ```
> >
> > ### Catatan Penggunaan
> >
> > STRIDE menjawab pertanyaan **"apa yang bisa salah pada tiap komponen teknis?"** Karena software-centric, ia kurang menjawab konteks bisnis (ranah [[PASTA dan LINDDUN]]). Setiap hasil perlu ditautkan ke kontrol dan diverifikasi; pelajari juga pemetaan STRIDE ke teknik ATT&CK pada [[Cyber Kill Chain, MITRE ATT-CK, dan Kasus Capital One]].

> [!cornell] #### Summary
>
> **STRIDE** (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege) mengelompokkan ancaman per komponen software dan memetakan tiap kelas pada **properti keamanan** yang dilanggar. Setiap kategori punya kontrol padanan: authentication, integrity, logging/signature, enkripsi, ketersediaan, dan access control. STRIDE kuat untuk analisis teknis tetapi tidak menimbang risiko bisnis.

> [!ad-libitum]- Additional Information
>
> #### STRIDE per Element
> Varian praktis **STRIDE-per-element** memetakan kategori mana yang relevan untuk tiap tipe elemen DFD: *external entity* (S, R), *process* (semua), *data store* (T, R, I, D), *data flow* (T, I, D). Ini menghemat waktu dibanding memeriksa 6 kategori untuk setiap elemen.
>
> #### Proyek Eksplorasi Mandiri
> 1. Terapkan STRIDE per element pada fitur login dan checkout aplikasi e-commerce buatan Anda.
> 2. Buat tabel: ancaman → kontrol → bukti verifikasi (test/log).
>
> #### Bacaan Lanjutan
> - Howard & Lipner, *The Security Development Lifecycle*
> - Microsoft Threat Modeling Tool documentation
