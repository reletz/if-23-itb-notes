---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Session Management dan Token-Based Authentication
>
> > ## Questions/Cues
> >
> > - Bagaimana struktur JWT dan apa kesalahan implementasinya?
> > - Apa saja pengaturan penting cookie sesi?
> > - Seperti apa konfigurasi sesi yang rentan vs aman?
> > - Serangan apa yang dimungkinkan oleh sesi yang lemah?
> >
> > ## Reference Points
> >
> > - IF5161 — W05 Identity, Authentication, and Authorization, bagian "Token-Based Auth", "Session Management", "Mistake 3: JWT Implementation Errors", "Mistake 7: Session Security Failures"
>
> > ### Token-Based Authentication (JWT)
> >
> > **JWT** terdiri dari tiga bagian: **Header.Payload.Signature**. Header menyatakan algoritma, payload berisi klaim (`sub`, `iss`, `aud`, `exp`, ...), dan signature menjamin integritas. Praktik terbaik: **selalu validasi signature, algoritma, dan klaim**, dan **jangan menyimpan data sensitif** di payload karena hanya di-encode (Base64), bukan dienkripsi.
> >
> > Kesalahan implementasi JWT yang lazim: menerima `alg: none`, tidak memverifikasi signature, mengabaikan `exp`/`aud`/`iss`, memakai secret lemah, dan tidak menyediakan **rotasi serta revokasi** token.
> >
> > ### Secure Session Handling
> >
> > | Pengaturan | Fungsi |
> > |---|---|
> > | **HttpOnly** | Mencegah pencurian cookie oleh skrip (XSS) |
> > | **Secure** | Cookie hanya dikirim lewat HTTPS |
> > | **SameSite** | Perlindungan CSRF |
> > | **Expiration pendek + rotasi** | Membatasi jendela penyalahgunaan |
> >
> > ### Kode Rentan vs Aman
> >
> > Versi rentan menyetel cookie `session_id` tanpa flag keamanan dan `max_age=31536000` (**satu tahun**). Akibatnya: (1) XSS mencuri cookie (tanpa HttpOnly), (2) MITM menyadap di HTTP (tanpa Secure), (3) CSRF dari situs lain (SameSite=None), (4) sesi berumur panjang menaikkan risiko.
> >
> > Konfigurasi aman: `HttpOnly=True, Secure=True, SameSite='Strict', max_age=1800` (30 menit).
> >
> > ```mermaid
> > flowchart LR
> >     L["Login sukses"] --> N["Generate session ID baru<br/>(acak, kuat)"]
> >     N --> C["Set cookie:<br/>HttpOnly, Secure, SameSite, umur pendek"]
> >     C --> R["Request: validasi di server"]
> >     R --> X["Logout / idle timeout:<br/>hancurkan sesi di server"]
> > ```
> >
> > Konsep ini sejalan dengan temuan lama di [[Broken Authentication, IDOR, dan URL Access Control]] dan pertahanan CSRF di [[CSRF dan Client-Side State Manipulation]].

> [!cornell] #### Summary
>
> **JWT** (header.payload.signature) harus divalidasi penuh (signature, algoritma, klaim) dan tidak boleh memuat data sensitif. **Cookie sesi** wajib `HttpOnly`, `Secure`, `SameSite` dengan umur pendek dan rotasi. Sesi tanpa flag dan berumur setahun membuka XSS theft, MITM, CSRF, dan penyalahgunaan jangka panjang.

> [!ad-libitum]- Additional Information
>
> #### Session vs JWT
> Sesi server-side mudah dicabut tetapi butuh penyimpanan bersama; JWT stateless tetapi sulit direvokasi sebelum `exp`. Kompromi umum: **access token berumur pendek + refresh token yang dirotasi** dan daftar revokasi untuk kasus darurat. Hindari menyimpan token di `localStorage` jika ada risiko XSS.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat endpoint login yang rentan (cookie tanpa flag), eksploitasi dengan XSS sederhana, lalu perbaiki.
> 2. Uji library JWT pilihan Anda terhadap token `alg: none` dan algorithm confusion (RS256 → HS256).
>
> #### Bacaan Lanjutan
> - RFC 8725 JSON Web Token Best Current Practices
> - OWASP Session Management Cheat Sheet
