---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Konsep Keamanan dan Authentication
>
> > ## Questions/Cues
> >
> > - Apa saja tujuh konsep dasar keamanan informasi?
> > - Apa yang dimaksud dengan CIA triad?
> > - Apa tiga cara umum melakukan authentication?
> > - Apa beda false positive dan false negative pada biometrik?
> > - Apa itu client, server, dan mutual authentication?
> >
> > ## Reference Points
> >
> > - IF4033 Security Foundation (Slides 10-17)
> > - IF4033 Security Concepts (Slides 1-8)
>
> > ### Tujuh Konsep Keamanan
> >
> > Keamanan informasi dibangun dari tujuh konsep: **Confidentiality**, **Data/Message Integrity**, **Availability**, **Authentication**, **Authorization**, **Accountability**, dan **Non-Repudiation**. Tiga yang pertama dikenal sebagai **CIA triad**:
> >
> > - **Confidentiality**: hanya pihak yang berhak yang boleh mengakses layanan/data.
> > - **Integrity**: layanan harus selalu berperilaku benar dan data tidak rusak/berubah.
> > - **Availability**: klien yang sah selalu dapat mengakses layanan, sekaligus menjaga *privacy* dan *accountability*, semuanya dalam kondisi ada ancaman dan kerentanan.
> >
> > ### Authentication: Verifikasi Klaim
> >
> > Authentication adalah verifikasi atas suatu klaim (identitas atau peran). Pertanyaan klasiknya: bagaimana Bob yakin ia berkomunikasi dengan Alice? Ada tiga cara umum:
> >
> > | Faktor | Contoh | Kelebihan | Kekurangan |
> > |---|---|---|---|
> > | **Something you know** | Password, PIN | Sederhana diimplementasikan dan dipahami | Mudah ditebak, dipakai ulang di banyak tempat |
> > | **Something you have** | OTP card (SecurID), smart card, token/iButton, kartu ATM | Kekuatan bergantung pada sulitnya pemalsuan | Bisa hilang/dicuri |
> > | **Something you are** | Sidik jari, iris, retina, wajah, suara, tanda tangan | "Menaikkan standar" | Salah deteksi, penerimaan sosial, privasi |
> >
> > **One-Time Password (OTP)** memakai password berbeda tiap login sehingga tidak bisa diputar ulang, tetapi sulit dihafal pengguna, karena itu biasanya dibangkitkan oleh kartu/aplikasi.
> >
> > ### Biometrik dan Kesalahan Klasifikasi
> >
> > Dalam konteks biometrik pada slide, istilahnya dibalik dari intuisi umum:
> >
> > - **False positive**: pengguna *asli* ditolak.
> > - **False negative**: *impostor* diterima.
> >
> > Efektivitas tiap teknik berbeda: sidik jari dinilai akurat, cepat, dan diterima luas (grade A); pengenalan wajah akurat dan makin diterima namun menimbulkan kekhawatiran privasi; scan retina/iris sangat akurat tetapi invasif sehingga penerimaannya terbatas; suara dan tanda tangan rentan *spoofing*/pemalsuan.
> >
> > ### Multi-Factor dan Arah Authentication
> >
> > Beberapa metode dapat digabung, misalnya kartu ATM (*have*) dengan PIN (*know*) sebagai **two-factor authentication**. Selain itu perlu ditanyakan *siapa mengautentikasi siapa*: orang ke komputer atau komputer ke komputer. Pada SSL/TLS dikenal tiga tipe:
> >
> > - **Client authentication**: server memverifikasi identitas klien.
> > - **Server authentication**: klien memverifikasi identitas server.
> > - **Mutual authentication**: keduanya saling memverifikasi.
> >
> > Pengguna yang telah terautentikasi disebut **principal**.
> >
> > ```mermaid
> > flowchart TB
> >     AU["Authentication"] --> K["Something you KNOW<br/>password, PIN"]
> >     AU --> H["Something you HAVE<br/>token, smart card, OTP"]
> >     AU --> R["Something you ARE<br/>biometrik"]
> >     K --> MF["Multi-factor<br/>(gabungan faktor)"]
> >     H --> MF
> >     R --> MF
> > ```

> [!cornell] #### Summary
>
> Keamanan informasi bertumpu pada tujuh konsep: **confidentiality, integrity, availability** (CIA triad), **authentication, authorization, accountability**, dan **non-repudiation**. **Authentication** memverifikasi klaim identitas dengan tiga faktor: **something you know** (password), **have** (token, smart card, OTP), dan **are** (biometrik), yang dapat digabung menjadi **two-factor authentication**. Biometrik "menaikkan standar" namun punya masalah false positive/negative, penerimaan sosial, dan privasi. Pada protokol seperti SSL dikenal **client**, **server**, dan **mutual authentication**, dan pengguna yang lolos disebut **principal**.

> [!ad-libitum]- Additional Information
>
> #### Password Modern dan MFA
>
> Praktik terkini (NIST SP 800-63B) menyarankan password panjang (*passphrase*), pemeriksaan terhadap daftar password bocor, dan **MFA** berbasis aplikasi atau *hardware key* (FIDO2/WebAuthn) yang tahan *phishing*, dibanding aturan kompleksitas dan rotasi paksa.
> Serangan seperti *SIM swapping* membuat OTP via SMS dianggap lebih lemah dibanding TOTP atau security key.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan TOTP (RFC 6238) sederhana dengan Python dan verifikasi dengan Google Authenticator.
> 2. Bandingkan FAR/FRR dua teknik biometrik dari makalah ilmiah.
>
> #### Bacaan Lanjutan
> - NIST SP 800-63B *Digital Identity Guidelines: Authentication and Lifecycle Management*.
> - RFC 6238 (TOTP).
