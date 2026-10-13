---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Riset dan Praktik Terbaik Identity Security
>
> > ## Questions/Cues
> >
> > - Apa itu Decentralized Identity (DID) dan Verifiable Credentials?
> > - Bagaimana ZKP dipakai dalam autentikasi?
> > - Apa itu continuous authentication dan formal verification otorisasi?
> > - Apa yang berubah pada OAuth 2.1?
> > - Apa checklist implementasi autentikasi dan otorisasi?
> > - Pelajaran apa dari SolarWinds?
> >
> > ## Reference Points
> >
> > - IF5161 — W05 Identity, Authentication, and Authorization, bagian "Research 1–6", "Best Practices", "Case Study", "Summary & Resources"
>
> > ### Riset Terkini
> >
> > | # | Topik | Inti | Referensi |
> > |---|---|---|---|
> > | 1 | **Decentralized Identity** | Pengguna memegang identitas lewat **DID** dan **Verifiable Credentials** W3C | W3C DID v1.0 (2022), VC Data Model (2022) |
> > | 2 | **Zero-Knowledge Proof untuk auth** | ZK-SNARK: verifikasi umur tanpa membuka tanggal lahir; kredensial tanpa membuka detail | *zkLogin* (2024) |
> > | 3 | **Continuous authentication** | Biometrik perilaku dan AI memverifikasi pengguna terus-menerus | IEEE S&P 2023, USENIX Security 2024 (keystroke dynamics) |
> > | 4 | **Formal verification AuthZ** | Membuktikan kebenaran kebijakan secara matematis (Z3, Alloy, Cedar validator, OPA testing) | CCS 2023 (AWS IAM) |
> > | 5 | **OAuth 2.1** | Penguatan: PKCE wajib, hapus implicit flow dan password grant | IETF Draft 2024 |
> > | 6 | **AI/ML untuk deteksi ancaman identitas** | Deteksi anomali, credential stuffing | NDSS 2024 |
> >
> > ### Checklist Praktik Terbaik
> >
> > | Autentikasi | Otorisasi |
> > |---|---|
> > | OAuth 2.1 + OIDC dengan PKCE | Principle of least privilege |
> > | MFA (FIDO2/WebAuthn diutamakan) | **Pengecekan server-side pada SETIAP request** |
> > | Cookie sesi aman (HttpOnly, Secure, SameSite) | RBAC untuk kesederhanaan, ABAC untuk granularitas |
> > | Rate limiting pada endpoint auth | Access review berkala |
> > | Hashing Argon2id/bcrypt | Audit logging |
> > | Validasi JWT (alg, iss, aud, exp), rotasi dan revokasi token | **Default deny policy** |
> >
> > Pola arsitektur: **Zero Trust** (never trust, always verify; lihat [[Zero Trust dan Defense in Depth]]). Metrik monitoring: **MTTD, MTTR, failed login rate, account lockout rate**.
> >
> > ### Studi Kasus: SolarWinds (2020)
> >
> > Serangan supply chain terhadap SolarWinds berujung pada kompromi identitas dan akses istimewa luas. Pelajaran: (1) verifikasi **code signing**, (2) keamanan **supply chain**, (3) **segmentasi jaringan**, (4) **privileged access management**, (5) **monitoring berkelanjutan**. Kaitannya dengan rantai pasok dibahas di [[Software Supply Chain Security dan SBOM]].
> >
> > ```mermaid
> > flowchart LR
> >     B["Build pipeline<br/>dikompromikan"] --> U["Update bertanda tangan<br/>berisi backdoor"]
> >     U --> V["Pelanggan memasang update"]
> >     V --> P["Kredensial/akses istimewa<br/>disalahgunakan"]
> >     P --> L["Pergerakan lateral &amp; eksfiltrasi"]
> > ```
> >
> > **Pesan penutup sesi**: identity is the new perimeter; never trust, always verify; defense in depth untuk auth; uji keamanan secara berkala; ikuti ancaman baru.

> [!cornell] #### Summary
>
> Riset identitas bergerak ke **DID/VC, ZKP, continuous authentication, formal verification kebijakan, OAuth 2.1, dan deteksi anomali berbasis ML**. Praktik terbaiknya: **PKCE, MFA FIDO2, cookie aman, rate limiting, Argon2id, validasi JWT, least privilege, otorisasi per request, access review, audit log, default deny**. Kasus **SolarWinds** menegaskan perlunya code signing, keamanan supply chain, segmentasi, PAM, dan monitoring berkelanjutan.

> [!ad-libitum]- Additional Information
>
> #### Mengukur Efektivitas
> MTTD dan MTTR mengukur kecepatan deteksi/respons; tambahkan rasio akun dengan MFA, jumlah akun yatim, dan persentase hak yang tidak dipakai (*unused entitlements*) sebagai indikator privilege creep.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat dashboard sederhana (dari log autentikasi aplikasi Anda) untuk failed login rate dan lockout rate.
> 2. Baca satu makalah dari daftar riset di atas dan rangkum dalam satu halaman: masalah, ide, keterbatasan.
>
> #### Bacaan Lanjutan
> - NIST SP 800-63B
> - IETF OAuth 2.1 Draft
> - W3C DID dan Verifiable Credentials
