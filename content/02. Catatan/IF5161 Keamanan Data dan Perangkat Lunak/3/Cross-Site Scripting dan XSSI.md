---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Cross-Site Scripting dan XSSI
>
> > ## Questions/Cues
> >
> > - Apa itu XSS dan kapan ia terjadi (stored, reflected, DOM)?
> > - Apa itu Same Origin Policy dan bagaimana XSSI (script inclusion) menyiasatinya?
> > - Bagaimana cookie sesi dapat dicuri lewat XSS?
> > - Mengapa output encoding bergantung pada konteks HTML?
> > - Mitigasi tambahan apa yang tersedia (HttpOnly, sanitasi)?
> >
> > ## Reference Points
> >
> > - IF5161 — W02 Web Application Vulnerability, bagian "XSS-related attacks", "A2 – Cross-Site Scripting", "Avoiding XSS Flaws", "Mitigating from XSS Attacks"
>
> > ### Same Origin Policy dan XSSI
> >
> > **Same Origin Policy (SOP)** mengizinkan skrip pada halaman suatu situs hanya mengakses halaman dari situs yang sama; browser mencegah satu domain *membaca* halaman domain lain, tetapi **tidak mencegah halaman mereferensikan sumber daya domain lain** (mis. `<script src=...>`).
> >
> > **Cross-Domain Script Inclusion (XSSI)**: kita menyertakan skrip pihak lain tanpa kontrol penuh atas isinya, padahal skrip itu **berjalan dalam konteks halaman kita** dan punya akses penuh ke data klien terkait sesi pengguna. Contoh: endpoint JSON-P `.../nav_data?callback=UpdateHeader` mengembalikan `UpdateHeader({... "logged_in_user":"...", "account_balance":256.98})`. Situs penyerang mendefinisikan fungsi `UpdateHeader` sendiri lalu menyertakan skrip tadi; karena browser korban menyertakan cookie sesi, data akun korban jatuh ke tangan penyerang.
> >
> > **Menghindari XSSI**: *authentication action token*, membatasi ke request POST, dan mencegah akses resource dari domain lain.
> >
> > ### Cross-Site Scripting (XSS)
> >
> > XSS terjadi setiap kali **data mentah dari penyerang dikirim ke browser pengguna tak bersalah**. Data mentah itu bisa:
> >
> > - **Tersimpan** di database/data pihak ketiga (*stored XSS*), mis. profil yang dimodifikasi penyerang.
> > - **Dipantulkan** dari input web: form field, hidden field, URL (*reflected XSS*).
> > - **Dikirim langsung** ke JavaScript klien yang kaya (*DOM-based*).
> >
> > Hampir setiap aplikasi web punya masalah ini. Dampak: mencuri sesi dan data sensitif, menulis ulang halaman, mengarahkan ke situs phishing/malware; paling parah, memasang **XSS proxy** yang memungkinkan penyerang mengamati dan mengarahkan seluruh perilaku korban.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant M as Attacker
> >     participant S as Aplikasi (stored XSS)
> >     participant V as Victim Browser
> >     M->>S: Update profil berisi script berbahaya
> >     V->>S: Lihat halaman profil penyerang
> >     S->>V: Halaman memuat script penyerang
> >     V->>M: Script diam-diam mengirim cookie sesi korban
> > ```
> >
> > Contoh reflected: `query?question=cookies<script>...</script>` menghasilkan `<p>Your query for 'cookies<script>...</script>' returned...</p>` sehingga skrip berjalan dan mengirim `document.cookie` ke `hackerhome.org`.
> >
> > ### Menghindari XSS
> >
> > - **Hilangkan celahnya**: jangan sertakan input pengguna/data tak tepercaya ke halaman keluaran.
> > - **Output encode** semua input (rekomendasi utama; OWASP **ESAPI**), mengganti `<`, `>` dengan `&lt;`, `&gt;`.
> > - **Whitelist validation** pada input; untuk HTML buatan pengguna gunakan **AntiSamy** untuk sanitasi.
> >
> > Skema escaping bergantung pada **konteks eksekusi**:
> >
> > | Konteks | Contoh | Skema (ESAPI) |
> > |---|---|---|
> > | Isi elemen HTML | `<div>teks</div>` | `&`,`<`,`>`,`"` → `&entity;` ; `'`,`/` → `&#xHH;` — `encodeForHTML()` |
> > | Nilai atribut HTML | `value='...'` | non-alfanumerik < 256 → `&#xHH` — `encodeForHTMLAttribute()` |
> > | Data JavaScript | `<script>...</script>` | → `\xHH` — `encodeForJavaScript()` |
> > | Properti style | `color: red` | → `\HH` — `encodeForCSS()` |
> > | Atribut URI | `href="..."` | → `%HH` — `encodeForURL()` |
> >
> > Konteks lain **tidak boleh** menyertakan data tak tepercaya. Rekomendasi: izinkan hanya #1 dan #2.
> >
> > ### Mitigasi Tambahan
> >
> > Gunakan flag **HttpOnly** pada cookie agar tidak terbaca skrip sisi klien, dan ikat cookie sesi dengan alamat IP. Ini hanya memperkecil dampak, bukan menghilangkan celah.

> [!cornell] #### Summary
>
> **XSS** terjadi ketika data penyerang sampai ke browser korban tanpa disanitasi, baik **stored, reflected, maupun DOM-based**, dan memberi penyerang kendali atas sesi korban. **XSSI** memanfaatkan fakta bahwa SOP tidak melarang penyertaan skrip lintas domain. Pertahanan utamanya adalah **output encoding sesuai konteks**, whitelist validation, sanitasi HTML, serta **HttpOnly** untuk membatasi dampak.

> [!ad-libitum]- Additional Information
>
> #### Content Security Policy
> Lapisan pertahanan modern adalah **CSP** (`Content-Security-Policy`) yang membatasi sumber skrip. Dengan `script-src 'self'` dan nonce, injeksi inline akan ditolak browser walaupun encoding terlewat. Framework modern (React, Angular) meng-escape secara default; risiko kembali muncul pada `dangerouslySetInnerHTML` atau `innerHTML`.
>
> #### Proyek Eksplorasi Mandiri
> 1. Temukan reflected XSS dan stored XSS pada Juice Shop, lalu tuliskan encoding yang tepat untuk tiap konteks.
> 2. Pasang header CSP pada aplikasi kecil dan amati blokirnya lewat console browser.
>
> #### Bacaan Lanjutan
> - OWASP XSS Prevention Cheat Sheet
> - OWASP Content Security Policy Cheat Sheet
