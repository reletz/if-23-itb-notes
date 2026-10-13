---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Protokol Autentikasi Modern OAuth OIDC dan FIDO2
>
> > ## Questions/Cues
> >
> > - Apa perbedaan OAuth 2.0, OpenID Connect, SAML 2.0, dan FIDO2/WebAuthn?
> > - Bagaimana Authorization Code Flow dengan PKCE bekerja dan apa yang dicegahnya?
> > - Klaim apa yang wajib divalidasi pada ID Token?
> > - Mengapa FIDO2/WebAuthn tahan phishing?
> > - Apa peluang dan tantangan autentikasi biometrik?
> >
> > ## Reference Points
> >
> > - IF5161 — W05 Identity, Authentication, and Authorization, bagian "Modern Authentication Protocols" s.d. "Biometric Authentication"
>
> > ### Peta Protokol
> >
> > | Protokol | Tujuan | Catatan |
> > |---|---|---|
> > | **OAuth 2.0** | **Delegasi otorisasi** (akses ke resource atas nama pengguna) | Bukan protokol autentikasi |
> > | **OpenID Connect (OIDC)** | **Lapisan autentikasi** di atas OAuth 2.0 | ID Token (JWT), UserInfo endpoint, scope `openid`, `profile`, `email`, ... |
> > | **SAML 2.0** | SSO federasi berbasis XML, umum di enterprise | Assertion antar IdP dan SP |
> > | **FIDO2/WebAuthn** | Autentikasi tanpa password berbasis kunci publik | Tahan phishing |
> >
> > ### OAuth 2.0 Authorization Code Flow dengan PKCE
> >
> > ```mermaid
> > sequenceDiagram
> >     participant U as User/Browser
> >     participant C as Client App
> >     participant A as Authorization Server
> >     participant R as Resource Server
> >     C->>C: Buat code_verifier + code_challenge
> >     U->>A: Authorization request (code_challenge, state)
> >     A->>U: Login & consent
> >     A->>C: Redirect dengan authorization code
> >     C->>A: Tukar code + code_verifier
> >     A->>C: Access token (+ ID token pada OIDC)
> >     C->>R: Request dengan access token
> > ```
> >
> > **PKCE (RFC 7636)** mencegah **pencegatan authorization code**: hanya klien yang memegang `code_verifier` asli yang dapat menukar code menjadi token.
> >
> > ### OpenID Connect
> >
> > Komponen: **ID Token** (JWT berisi klaim identitas), **UserInfo endpoint** (atribut tambahan), dan **scope**. Kesalahan umum: **tidak memvalidasi klaim `aud`, `iss`, dan `exp`**.
> >
> > ### Passwordless: FIDO2 dan WebAuthn
> >
> > Kunci privat tersimpan di perangkat/authenticator dan tidak pernah meninggalkannya; server hanya menyimpan kunci publik. Keunggulan: **tahan phishing** (kredensial terikat origin), **tidak ada database password untuk dibobol**, dan UX lebih baik. Microsoft melaporkan **pengurangan 99,9%** kompromi akun dengan passwordless.
> >
> > ### Biometrik
> >
> > Peluang: nyaman dan sulit dibagikan. Tantangan: **tidak dapat dicabut** bila bocor, serta riset aktif menghadapi **presentation attack dan deepfake yang dibuat AI**. Biometrik sebaiknya mengaktifkan kunci lokal (seperti pada passkey), bukan dikirim sebagai kredensial ke server.

> [!cornell] #### Summary
>
> **OAuth 2.0** untuk delegasi otorisasi, **OIDC** menambah autentikasi (ID Token), **SAML** untuk SSO enterprise, dan **FIDO2/WebAuthn** untuk autentikasi tanpa password yang **tahan phishing**. **PKCE** wajib untuk mencegah pencurian authorization code, dan ID Token harus divalidasi (`iss`, `aud`, `exp`, signature). Biometrik menawarkan kemudahan tetapi rentan presentation attack dan tak dapat dicabut.

> [!ad-libitum]- Additional Information
>
> #### Passkey
> **Passkey** adalah implementasi konsumen dari WebAuthn yang dapat disinkronkan antar-perangkat lewat penyedia (Apple, Google, Microsoft, password manager). Trade-off: kemudahan pemulihan vs ketergantungan pada ekosistem sinkronisasi; pemulihan akun menjadi titik lemah baru.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan login "Sign in with Google" memakai Authorization Code + PKCE pada aplikasi kecil dan verifikasi `iss`, `aud`, `exp` secara manual.
> 2. Daftarkan passkey pada layanan yang mendukung dan amati data yang dikirim (tanpa rahasia).
>
> #### Bacaan Lanjutan
> - Richer, *OAuth 2 in Action*
> - RFC 7636 (PKCE), RFC 6749 (OAuth 2.0)
> - W3C Web Authentication (WebAuthn)
