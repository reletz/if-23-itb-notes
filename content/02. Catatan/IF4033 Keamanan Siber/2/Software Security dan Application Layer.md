---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Software Security dan Application Layer
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud software security dan apa bedanya dengan network security?
> > - Mengapa firewall, SSL, dan IDS tidak cukup menghentikan serangan aplikasi?
> > - Mengapa keamanan aplikasi menjadi tanggung jawab developer?
> > - Apa saja konsekuensi serangan pada aplikasi web?
> >
> > ## Reference Points
> >
> > - IF4033 Software Security (Slides 2-9)
> > - IF4033 Security Foundation (Slides 70-76)
>
> > ### Apa itu Software Security?
> >
> > Software security **bukan** network security. Fokusnya adalah mengamankan:
> >
> > - **custom code** yang menjalankan aplikasi web,
> > - **library** yang dipakai,
> > - **backend systems** (database, layanan),
> > - **web server dan application server**.
> >
> > Network security umumnya **mengabaikan isi lalu lintas HTTP**: firewall, SSL, IDS, OS hardening, dan database hardening tidak memahami apakah sebuah request HTTP berisi payload serangan.
> >
> > ### Kode Anda adalah Bagian dari Perimeter
> >
> > Perimeter keamanan memiliki "lubang besar" pada lapisan aplikasi. Lapisan jaringan (firewall, hardened OS) rapi, tetapi *custom developed application code* yang berada di atas web server dan app server diakses langsung oleh penyerang, lalu tersambung ke database, legacy systems, web services, direktori, HR, dan billing.
> >
> > ```mermaid
> > flowchart TB
> >     ATK["Application attack"] --> FW["Firewall (lolos: port 80/443 diizinkan)"]
> >     FW --> WS["Web Server"]
> >     WS --> AS["App Server"]
> >     AS --> CODE["Custom Application Code<br/>(lubang keamanan di sini)"]
> >     CODE --> DB["Databases"]
> >     CODE --> LG["Legacy Systems"]
> >     CODE --> WSV["Web Services"]
> > ```
> >
> > Pesan kuncinya: **perlindungan lapisan jaringan tidak bisa menghentikan atau mendeteksi serangan lapisan aplikasi**.
> >
> > ### Mengapa Ini Tanggung Jawab Kita?
> >
> > - Serangan aplikasi web **sangat lazim**, **mudah dieksploitasi tanpa alat khusus**, dan **kecil kemungkinan terdeteksi**.
> > - Ada ratusan ribu developer, namun hanya sebagian kecil yang paham keamanan.
> > - Konsekuensi: rusak atau bocornya isi database, akses root ke web/app server, hilangnya authentication dan access control, *defacement*, dan serangan sekunder yang berasal dari situs Anda.
> >
> > Karena itu **application security sama pentingnya dengan network security**, padahal mayoritas anggaran keamanan justru dihabiskan untuk jaringan.

> [!cornell] #### Summary
>
> **Software security** mengamankan custom code, library, backend, serta web/application server, berbeda dari **network security** yang mengabaikan isi HTTP. Karena firewall, SSL, IDS, dan hardening tidak dapat menghentikan serangan **application layer**, kode aplikasi adalah bagian dari perimeter keamanan dan perimeter itu "bolong". Serangan aplikasi lazim, mudah, dan sulit terdeteksi, dengan konsekuensi serius (korupsi data, root access, defacement, serangan sekunder), sehingga application security sama pentingnya dengan network security.

> [!ad-libitum]- Additional Information
>
> #### WAF dan OWASP Top 10
>
> Untuk melihat isi lalu lintas HTTP dipakai **Web Application Firewall (WAF)**, tetapi WAF bukan pengganti secure coding. Daftar risiko utama aplikasi web dirangkum dalam **OWASP Top 10** (mis. Broken Access Control, Injection, Cryptographic Failures).
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan OWASP Juice Shop atau DVWA secara lokal dan temukan minimal tiga kerentanan.
>
> #### Bacaan Lanjutan
> - OWASP Top 10 dan OWASP ASVS.
> - McGraw, G. *Software Security: Building Security In*.
