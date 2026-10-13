---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Cyber Kill Chain, MITRE ATT-CK, dan Kasus Capital One
>
> > ## Questions/Cues
> >
> > - Apa itu Cyber Kill Chain dan Diamond Model?
> > - Bagaimana MITRE ATT&CK dipakai untuk memvalidasi threat model?
> > - Bagaimana memetakan ancaman STRIDE ke teknik ATT&CK?
> > - Apa yang gagal dalam breach Capital One 2019?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian "Cyber Kill Chain", "Diamond Method", "Mapping to Reality: MITRE ATT&CK", "Seminar Case Study: Capital One (2019)"
>
> > ### Kerangka Pandangan Penyerang
> >
> > **Cyber Kill Chain** (Lockheed Martin) memodelkan serangan sebagai rangkaian tahap berurutan sehingga pembela dapat memutus rantai di tahap mana pun. Tujuh tahap klasiknya: *reconnaissance, weaponization, delivery, exploitation, installation, command & control, actions on objectives*. **Diamond Model** menganalisis insiden lewat empat sisi: *adversary, capability, infrastructure, victim*.
> >
> > ### MITRE ATT&CK: Memetakan ke Realita
> >
> > **MITRE ATT&CK** adalah basis pengetahuan global tentang **taktik dan teknik adversary** berdasarkan pengamatan dunia nyata. Cara memakainya: **validasi threat model terhadap perilaku adversary yang teramati**, bukan sekadar kelemahan teoretis. Aksi praktis: pakai **ATT&CK Navigator** untuk memvisualkan celah cakupan mitigasi.
> >
> > Contoh pemetaan: ancaman STRIDE **Spoofing** dipetakan ke **T1078 (Valid Accounts)** atau **T1552 (Unsecured Credentials)**.
> >
> > ```mermaid
> > flowchart LR
> >     ST["STRIDE: Spoofing"] --> T1["T1078<br/>Valid Accounts"]
> >     ST --> T2["T1552<br/>Unsecured Credentials"]
> >     T1 --> M["Mitigasi: MFA,<br/>least privilege, monitoring"]
> >     T2 --> M
> > ```
> >
> > ### Studi Kasus: Capital One (2019)
> >
> > **Kronologi**: **SSRF** lewat WAF yang salah konfigurasi memungkinkan akses ke **AWS Instance Metadata Service (IMDSv1)**, lalu lebih dari **100 juta rekaman** dieksfiltrasi.
> >
> > | Titik kegagalan | Penjelasan |
> > |---|---|
> > | Jalur serangan SSRF tak dimodelkan | Ancaman di *trust boundary* terlewat dalam threat model |
> > | Blind spot shared responsibility cloud | Tanggung jawab penyedia vs pelanggan tidak jelas |
> > | IMDSv2 tidak ditegakkan | IMDSv2 mewajibkan session token, sehingga SSRF sederhana tidak cukup |
> >
> > **Pemetaan ATT&CK**: **T1190** (Exploit Public-Facing Application) dan **T1552.005** (Cloud Instance Metadata API).
> >
> > ```mermaid
> > flowchart LR
> >     W["WAF salah konfigurasi"] --> S["SSRF"]
> >     S --> M["IMDSv1 (metadata service)"]
> >     M --> C["Kredensial IAM role"]
> >     C --> D["100 juta+ rekaman<br/>dieksfiltrasi"]
> > ```
> >
> > Kasus ini memperlihatkan mengapa threat model harus mencakup **jalur lintas trust boundary** dan mengapa kategori SSRF masuk OWASP 2021 ([[OWASP Top 10 2021]]).

> [!cornell] #### Summary
>
> **Cyber Kill Chain** dan **Diamond Model** membantu memahami serangan sebagai rantai tahap dan relasi adversary-capability-infrastructure-victim. **MITRE ATT&CK** memvalidasi threat model terhadap perilaku nyata dan memetakan STRIDE ke teknik konkret (Spoofing → T1078/T1552). Kasus **Capital One 2019** memperlihatkan akibat jalur SSRF yang tak dimodelkan, blind spot tanggung jawab cloud, dan IMDSv2 yang tak ditegakkan.

> [!ad-libitum]- Additional Information
>
> #### Pelajaran Teknis IMDSv2
> IMDSv2 menuntut permintaan `PUT` untuk token sesi dan header khusus pada tiap pembacaan metadata, sehingga SSRF yang hanya dapat melakukan `GET` tidak lagi berhasil. Mitigasi lain: batasi izin IAM role (least privilege) dan filter egress dari workload.
>
> #### Proyek Eksplorasi Mandiri
> 1. Petakan 6 ancaman STRIDE aplikasi Anda ke teknik ATT&CK yang paling relevan dan cek di Navigator.
> 2. Susun ulang kronologi Capital One ke tujuh tahap Kill Chain.
>
> #### Bacaan Lanjutan
> - Hutchins et al., *Intelligence-Driven Computer Network Defense* (Kill Chain)
> - MITRE ATT&CK Enterprise Matrix
