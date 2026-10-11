---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Protokol Autentikasi Terdistribusi - Kerberos, CAS, OpenID, dan SAML
>
> > ## Questions/Cues
> >
> > - Teknologi AUTH* apa saja yang dibahas?
> > - Bagaimana alur Kerberos dengan ticket-granting?
> > - Apa kelebihan dan kekurangan CAS dan OpenID?
> > - Apa itu SAML assertion dan apa tiga jenisnya?
> > - Bagaimana perbandingan Kerberos, CAS, dan OpenID?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 72-90)
>
> > ### Teknologi AUTH*
> >
> > Kerberos, SAML, OpenID, CAS (Central Authentication Service), OAuth, dan XACML. Tujuan bersama: **single sign-on**, federasi identitas, dan delegasi otorisasi lintas domain.
> >
> > ### Kerberos
> >
> > ```mermaid
> > sequenceDiagram
> >     participant U as User
> >     participant AS as Authentication Server
> >     participant TGS as Ticket Granting Server
> >     participant S as Service Server
> >     U->>AS: 1. Login, minta TGT
> >     AS-->>U: 2. TGT + session key (dienkripsi dengan password user)
> >     U->>TGS: 3. TGT + authenticator
> >     TGS-->>U: 4. Service ticket
> >     U->>S: 5. Ticket + authenticator
> >     S-->>U: 6. Akses layanan
> > ```
> >
> > Server memverifikasi ticket dan authenticator (nama pengguna, alamat jaringan) sebelum memberi akses.
> >
> > ### CAS (Central Authentication Service)
> >
> > Memakai HTTPS untuk confidentiality dan integrity. Pengguna dialihkan ke CAS lalu kembali dengan **service ticket** (`casticket=ST-...`). **Kelebihan**: sederhana, **SSO** (ticket-granting cookie). **Kekurangan**: **single point of failure** dan ID federation.
> >
> > ### OpenID
> >
> > Pihak *relying party* menemukan *identity provider* lewat identifier (XRI, Yadis, discovery berbasis HTTP) lalu membentuk asosiasi. Berbagi atribut melalui *Simple Registration Extension* dan *Attribute Exchange*. **Kekurangan**: bila kredensial dicuri atau di-*phishing*, semua situs terdaftar menjadi target; kualitas provider bervariasi; pertanyaan kepercayaan dan siapa yang disalahkan bila terjadi breach; API proprietary.
> >
> > ### Perbandingan
> >
> > | Aspek | Kerberos | CAS | OpenID |
> > |---|---|---|---|
> > | Lapisan | TCP/UDP | HTTP | HTTP |
> > | Confidentiality + integrity | Bawaan | SSL | SSL |
> > | Cross-domain | Sangat sulit | Sulit | Mudah |
> > | Single point of failure | Ya | Ya | Ya |
> > | Single sign-on | Ya | Ya | Ya |
> > | Rentan replay | Ya (perlu timestamp) | Ya | Ya |
> > | ID federation | Tidak | Tidak | Ya |
> >
> > ### SAML
> >
> > **Security Assertion Markup Language** (OASIS) adalah kerangka berbasis XML untuk mengomunikasikan informasi **autentikasi, entitlement, dan atribut**: assertions, protocols, bindings, profiles. **Assertion** adalah pernyataan fakta tentang subjek oleh *issuer*, dapat ditandatangani digital. Isi umum: issuer dan timestamp, assertion ID, subject (nama + security domain), *conditions* (termasuk masa berlaku), dan *advice*.
> >
> > - **Authentication assertion**: subjek S diautentikasi dengan metode M pada waktu T (pengecekan/pencabutan kredensial di luar cakupan SAML).
> > - **Attribute assertion**: S berasosiasi dengan atribut (mis. "john.doe" di example.com punya Department = Human Resources), biasanya dari LDAP.
> > - **Authorization decision assertion**: otoritas memutuskan apakah S boleh melakukan tindakan A pada resource R berdasarkan bukti E.
> >
> > Skenario: **SSO pull** (pengguna mengakses situs tujuan, dialihkan ke asserting party) dan **back-office transaction** (transaksi antar-server).

> [!cornell] #### Summary
>
> **Kerberos** memakai ticket (TGT dan service ticket) dari AS dan TGS dengan kunci simetris; **CAS** memberi SSO berbasis HTTPS dengan service ticket tetapi menjadi single point of failure; **OpenID** menawarkan federasi identitas yang rentan jika kredensial dicuri; **SAML** mengomunikasikan **authentication, attribute, dan authorization decision assertion** berbasis XML yang dapat ditandatangani. Keempatnya mendukung SSO dengan trade-off yang berbeda.

> [!ad-libitum]- Additional Information
>
> #### Penerus Modern
>
> **OpenID Connect (OIDC)** menggantikan OpenID 2.0 dengan lapisan identitas di atas OAuth 2.0 (ID token berbentuk JWT). SAML masih dominan pada SSO enterprise; Kerberos dipakai pada Active Directory.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pasang Keycloak dan konfigurasikan SSO untuk dua aplikasi dummy, satu dengan SAML dan satu dengan OIDC; bandingkan token yang diterima.
>
> #### Bacaan Lanjutan
> - RFC 4120 (Kerberos V5), OASIS SAML 2.0 Core.
> - OpenID Connect Core 1.0.
