---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] OAuth dan Usage Control
>
> > ## Questions/Cues
> >
> > - Apa tujuan OAuth dan siapa saja aktornya?
> > - Bagaimana alur otorisasi OAuth?
> > - Apa kekurangan OAuth?
> > - Apa itu Usage Control (UCON) dan apa yang membedakannya dari model tradisional?
> > - Apa itu tiga fase penggunaan dan tujuh core model UCON?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 91-115)
>
> > ### OAuth
> >
> > **OAuth** adalah protokol **delegated authorization** yang ringan: aplikasi pihak ketiga dapat mengakses data pengguna di service provider **tanpa username dan password**, dengan **persetujuan eksplisit** pengguna. Tujuan: situs X mengakses data terlindungi di API Y tanpa membagikan password di luar situs. Fitur: *signed HTTP requests* dan pertukaran token tanpa password.
> >
> > **Tiga aktor**: *User* (pemilik data), *Service Provider* (menyimpan data), *Consumer* (aplikasi pihak ketiga).
> > **Tiga token** (analogi tiket arcade): *access token*, *request token*, dan *consumer key*.
> > **Tiga URL**: *request token issuer*, *authorization page*, dan *access token exchanger*.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant U as User
> >     participant C as Consumer (LinkedIn)
> >     participant AS as Authorization Server
> >     participant RS as Resource Server
> >     U->>C: 1. Buka aplikasi
> >     C->>AS: 2. Minta otorisasi (token request)
> >     AS->>U: 3. Autentikasi + minta persetujuan
> >     U->>AS: 4. Setuju
> >     AS-->>C: 5. Access token
> >     C->>RS: 6. Panggil API + token
> >     RS-->>C: 7. Data terlindungi
> > ```
> >
> > Catatan: authorization server dan resource server tidak harus dioperasikan entitas yang sama; autentikasi dapat didelegasikan (mis. ke OpenID). Meminta persetujuan sebelum berbagi data dianggap ramah privasi, meski UI persetujuan sering buruk. Banyak resource server mewajibkan **registrasi client** sebelumnya. Contoh: aplikasi pihak ketiga meminta akses ke Google Calendar pengguna.
> >
> > **Kekurangan**: granularitas delegasi, penanganan error, dan token expiration vs revocation.
> >
> > ### Usage Control (UCON)
> >
> > UCON adalah kerangka terpadu "access control generasi berikutnya" yang mengatasi keterbatasan model tradisional: hanya otorisasi (tanpa **obligation** dan **condition**), hanya berbasis identitas (tanpa atribut), keputusan **sebelum** akses (tanpa kontrol berkelanjutan), tidak ada hak yang dikonsumsi/atribut yang berubah, dan hak yang terdefinisi di awal. UCON melampaui **DRM** (fokus proteksi hak kekayaan intelektual, tanpa model access control) dan **trust management** (otorisasi orang asing berbasis kredensial, tanpa model atribut abstrak).
> >
> > **Komponen**: subject dan atribut, object dan atribut, generic rights, serta komponen keputusan **authorization (A), obligation (B), condition (C)**.
> >
> > **Sifat unik**:
> >
> > - **Tiga fase** penggunaan: *pre*, *ongoing (on)*, dan *post*.
> > - **Continuity**: pemeriksaan keputusan dapat dilakukan pada fase pre dan ongoing.
> > - **Mutability**: atribut dapat diperbarui akibat aksi penggunaan di ketiga fase.
> >
> > **Tujuh core model otorisasi** (berdasarkan titik pembaruan atribut): preA0, preA1, preA3, onA0, onA1, onA2, onA3 (keputusan sebelum/selama akses; atribut tidak diperbarui, atau diperbarui sebelum/selama/sesudah). Model serupa ada untuk obligation dan condition; sistem nyata dapat berupa hibrida.

> [!cornell] #### Summary
>
> **OAuth** adalah protokol delegated authorization: pihak ketiga mengakses data pengguna lewat **token** dan persetujuan eksplisit tanpa membagikan password (tiga aktor: user, service provider, consumer). Kekurangannya terletak pada granularitas, error handling, dan expiry/revocation. **UCON** memperluas access control dengan **authorization, obligation, condition**, **kontrol berkelanjutan** (continuity), dan **atribut yang berubah** (mutability) melalui tiga fase penggunaan dan tujuh core model.

> [!ad-libitum]- Additional Information
>
> #### OAuth 2.0 Modern
>
> OAuth 2.0 (RFC 6749) mengganti tanda tangan request dengan **bearer token** di atas TLS dan menambah *grant types* (Authorization Code + **PKCE**, Client Credentials). Praktik terbaik terkini: hindari Implicit grant, gunakan PKCE untuk semua public client.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan "Login dengan Google" memakai Authorization Code + PKCE pada aplikasi kecil, lalu amati token dengan jwt.io.
>
> #### Bacaan Lanjutan
> - RFC 6749 (OAuth 2.0), RFC 7636 (PKCE).
> - Park & Sandhu (2004). *The UCON-ABC Usage Control Model*.
