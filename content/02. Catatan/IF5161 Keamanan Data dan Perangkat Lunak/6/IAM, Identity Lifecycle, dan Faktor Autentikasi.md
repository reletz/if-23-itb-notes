---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] IAM, Identity Lifecycle, dan Faktor Autentikasi
>
> > ## Questions/Cues
> >
> > - Mengapa identitas dan akses begitu kritis (statistik kebocoran)?
> > - Apa tiga pilar IAM (identity, authentication, authorization)?
> > - Seperti apa siklus hidup identitas dan apa masalah identity sprawl?
> > - Apa faktor autentikasi dan mengapa MFA diwajibkan NIST pada AAL2+?
> > - Mengapa password adalah masalah dan apa kesalahan umumnya?
> >
> > ## Reference Points
> >
> > - IF5161 — W05 Identity, Authentication, and Authorization, bagian "Why Identity & Access Matters" s.d. "Password Challenges"
>
> > ### Mengapa Identitas Kritis
> >
> > Statistik yang dikutip materi: **81%** pembobolan terkait peretasan memakai kredensial curian/lemah; rata-rata biaya pembobolan terkait identitas **$4,45 juta** (IBM 2024); **99,9%** kerentanan yang dieksploitasi adalah CVE yang berusia lebih dari setahun. Slogan sesi: **"identity is the new perimeter"**.
> >
> > ### Segitiga IAM
> >
> > | Pilar | Definisi | Pertanyaan |
> > |---|---|---|
> > | **Identity** | Representasi digital sebuah entitas | Siapa/apa ini? |
> > | **Authentication** | Verifikasi klaim identitas | Benarkah dia? |
> > | **Authorization** | Izin untuk melakukan aksi | Boleh melakukan apa? |
> >
> > ```mermaid
> > flowchart TB
> >     ID["Identity<br/>(representasi digital)"] --> AN["Authentication<br/>(verifikasi klaim)"]
> >     AN --> AZ["Authorization<br/>(izin aksi)"]
> >     AZ -.audit & review.-> ID
> > ```
> >
> > ### Siklus Hidup dan Identity Sprawl
> >
> > Identitas melewati siklus: **pembuatan (provisioning) → pemeliharaan → perubahan peran → penonaktifan (deprovisioning)**. Tantangan 1 adalah **identity sprawl**: rata-rata perusahaan memiliki **1000+ identitas per pengguna**, *shadow IT* menciptakan akun tak terkelola, dan **akun yatim (orphaned)** tetap aktif setelah karyawan pergi. Gartner memprediksi 75% organisasi mengalami insiden terkait identitas pada 2025.
> >
> > ### Faktor Autentikasi
> >
> > Faktor klasik: **something you know** (password/PIN), **something you have** (token, HP, kunci FIDO), **something you are** (biometrik). **NIST SP 800-63B** mensyaratkan **minimal dua faktor untuk AAL2 ke atas**.
> >
> > ### Masalah Password
> >
> > Kesalahan umum: **reuse** antar layanan, password lemah (`123456`, `password`), tak pernah dirotasi, dibagikan lewat email/chat, disimpan plaintext. Statistik: **65%** pengguna memakai ulang password, rata-rata pengguna punya **100+** password, dan serangan **credential stuffing** mencapai **193 miliar percobaan pada 2023**.
> >
> > Karena itu autentikasi modern bergeser ke MFA dan [[Protokol Autentikasi Modern OAuth OIDC dan FIDO2]], sedangkan penyimpanan password aman dibahas di [[Tantangan dan Kesalahan Implementasi IAM]].

> [!cornell] #### Summary
>
> **IAM** bertumpu pada tiga pilar: **identity, authentication, authorization**. Tantangan utamanya adalah **identity sprawl** dan akun yatim sepanjang siklus hidup identitas. Autentikasi memakai faktor **know/have/are** dan NIST mewajibkan minimal **dua faktor pada AAL2+**. Password sendiri rapuh akibat reuse dan credential stuffing sehingga dibutuhkan MFA dan metode tanpa password.

> [!ad-libitum]- Additional Information
>
> #### Authenticator Assurance Level
> NIST SP 800-63B mendefinisikan **AAL1** (satu faktor), **AAL2** (dua faktor, tahan replay), **AAL3** (autentikator berbasis hardware dan tahan phishing/verifier impersonation). Pilih level sesuai sensitivitas transaksi, bukan sama rata.
>
> #### Proyek Eksplorasi Mandiri
> 1. Audit akun pribadi Anda: berapa yang memakai password sama? Aktifkan MFA berbasis FIDO2/TOTP pada tiga akun terpenting.
> 2. Rancang proses *joiner-mover-leaver* untuk sebuah organisasi kecil dan sebutkan kontrol deprovisioning-nya.
>
> #### Bacaan Lanjutan
> - NIST SP 800-63B Digital Identity Guidelines
> - OWASP Authentication Cheat Sheet
