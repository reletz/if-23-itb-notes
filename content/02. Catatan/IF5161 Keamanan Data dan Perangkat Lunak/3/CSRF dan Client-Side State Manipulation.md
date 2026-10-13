---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] CSRF dan Client-Side State Manipulation
>
> > ## Questions/Cues
> >
> > - Mengapa browser yang otomatis menyertakan kredensial membuat CSRF mungkin?
> > - Bagaimana serangan CSRF dengan tag `<img>` tersembunyi bekerja?
> > - Mengapa token rahasia efektif mencegah CSRF?
> > - Apa risiko saat state aplikasi disimpan di sisi klien?
> >
> > ## Reference Points
> >
> > - IF5161 — W02 Web Application Vulnerability, bagian "Cross Site Request Forgery (CSRF)" s.d. "Client-Side State Manipulation"
>
> > ### Cross-Site Request Forgery
> >
> > **CSRF** adalah serangan di mana **browser korban ditipu untuk mengirim perintah** ke aplikasi web rentan. Penyebabnya: browser **otomatis menyertakan data autentikasi** (session ID, alamat IP, kredensial domain Windows, sertifikat klien SSL, basic auth) pada setiap request, *bahkan untuk request yang dipicu form, skrip, atau gambar di situs lain*. Situs yang hanya mengandalkan kredensial otomatis semuanya rentan.
> >
> > Bayangkan penyerang bisa mengarahkan mouse Anda di aplikasi online banking. Dampaknya: memulai transaksi (transfer dana, logout, tutup akun), mengakses data sensitif, mengubah detail akun.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Attacker site
> >     participant V as Victim Browser (sudah login)
> >     participant S as Vulnerable App
> >     A->>V: Halaman berisi img src=server/deleteblog.do?blogId=ID (hidden)
> >     V->>S: GET deleteblog.do (cookie sesi ikut otomatis)
> >     S->>S: Melihat request sah dari korban
> >     S-->>V: Aksi dijalankan (blog terhapus)
> > ```
> >
> > ### Pencegahan
> >
> > Tambahkan **token rahasia yang tidak otomatis terkirim** pada semua request sensitif, sehingga penyerang tidak dapat memalsukan request (kecuali ada celah XSS). Token harus kuat secara kriptografis atau acak.
> >
> > | Opsi | Catatan |
> > |---|---|
> > | Satu token di session, ditambahkan ke semua form/link | Sederhana |
> > | Hidden field `<input name="token" ...>` | **Direkomendasikan** |
> > | Single-use URL / form token pada query | Hati-hati bocor lewat header `Referer` |
> > | Token per fungsi: hash(nama fungsi, session id, secret) | Granular |
> > | Autentikasi sekunder untuk fungsi sensitif | Contoh: eTrade |
> >
> > Tambahan: jangan biarkan penyerang menyimpan serangan di situs Anda (encode semua keluaran agar link/request menjadi inert).
> >
> > ### Client-Side State Manipulation
> >
> > Pengguna dapat **mengubah data apa pun di sisi klien** dan mengirim HTTP request sesukanya (hidden field, cookie, parameter URL). Jika aplikasi memercayai state yang disimpan di klien, penyerang dapat mengubah data demi keuntungannya atau memaksa aplikasi berperilaku sesuai keinginannya. Prinsipnya: **state yang menentukan keamanan harus dipegang dan divalidasi di server**.

> [!cornell] #### Summary
>
> **CSRF** memanfaatkan fakta bahwa browser menyertakan kredensial otomatis; request palsu dari situs lain tampak sah di mata server. Pertahanannya adalah **token rahasia yang tidak otomatis terkirim** (idealnya hidden field per request/fungsi). **Client-side state manipulation** mengingatkan bahwa semua yang ada di klien dapat diubah, sehingga server tidak boleh memercayainya.

> [!ad-libitum]- Additional Information
>
> #### SameSite Cookie dan Double Submit
> Pertahanan modern menambahkan atribut cookie **SameSite=Lax/Strict**, yang membuat browser tidak mengirim cookie pada request lintas situs. Varian token lain: *double-submit cookie* dan pengecekan header `Origin`/`Referer`. Di OWASP 2021, CSRF dilebur ke dalam Broken Access Control ([[OWASP Top 10 2021]]).
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat dua halaman lokal: aplikasi dengan aksi POST dan halaman penyerang dengan form auto-submit, lalu tambahkan token CSRF.
> 2. Bandingkan efek `SameSite=None`, `Lax`, dan `Strict` pada serangan yang sama.
>
> #### Bacaan Lanjutan
> - OWASP CSRF Prevention Cheat Sheet
> - RFC 6265bis (SameSite cookies)
