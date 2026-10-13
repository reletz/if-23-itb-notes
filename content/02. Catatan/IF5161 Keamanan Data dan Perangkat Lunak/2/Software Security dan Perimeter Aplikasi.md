---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Software Security dan Perimeter Aplikasi
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud software security dan apa bedanya dengan network security?
> > - Mengapa firewall, SSL, IDS, dan hardening tidak cukup menghentikan serangan layer aplikasi?
> > - Mengapa kode kita sendiri termasuk perimeter keamanan?
> > - Mengapa keamanan aplikasi menjadi tanggung jawab developer?
> > - Apa konsekuensi serangan web yang berhasil?
> >
> > ## Reference Points
> >
> > - IF5161 — W01 Introduction to Data & Software Security, "Software Security" s.d. "Why is it ours?"
>
> > ### Software Security Bukan Network Security
> >
> > **Software security** berfokus pada pengamanan *custom code* yang menjalankan aplikasi web, library yang dipakai, sistem backend, serta web dan application server. Sebaliknya, **network security** (firewall, SSL, IDS, hardening OS dan database) *sebagian besar mengabaikan isi lalu lintas HTTP*. Firewall mengizinkan port 80/443 lewat, lalu apa pun yang dibawa di dalam request, termasuk payload SQL injection, lolos begitu saja.
> >
> > ### Kode Anda Adalah Bagian dari Perimeter
> >
> > Model keamanan klasik menggambarkan lapisan konsentris: firewall, hardened OS, web server, app server, lalu kode aplikasi. Masalahnya, **serangan layer aplikasi menembus "lubang besar" di perimeter** karena kode custom langsung menerima input dari pengguna anonim di internet. Lapisan seperti *legacy systems, web services, directories, human resources, billing, database, dan network layer* di belakangnya semuanya terjangkau lewat aplikasi yang sama.
> >
> > ```mermaid
> > flowchart TB
> >     ATK["Attacker"] --> FW["Firewall (port 80/443 diizinkan)"]
> >     FW --> WS["Web Server"]
> >     WS --> AS["App Server"]
> >     AS --> CODE["Custom Application Code<br/>(lubang perimeter)"]
> >     CODE --> BE["Database, Legacy, Web Services,<br/>Directories, Billing"]
> >     NET["Perlindungan network layer<br/>(firewall, SSL, IDS, hardening)"] -.tidak melihat isi HTTP.-> CODE
> > ```
> >
> > ### Mengapa Ini Tanggung Jawab Kita?
> >
> > - Serangan aplikasi web **sangat lazim** dan **mudah dieksploitasi** tanpa alat khusus.
> > - **Kemungkinan terdeteksi kecil**, karena terlihat seperti lalu lintas HTTP normal.
> > - Ada ratusan ribu developer, tetapi hanya **sebagian kecil yang paham keamanan**.
> >
> > **Konsekuensinya**: korupsi atau pembocoran isi database, akses root ke web/application server, hilangnya authentication dan access control, defacement, dan **serangan sekunder dari situs Anda** terhadap pihak lain.
> >
> > Ironisnya, mayoritas anggaran keamanan masih dialokasikan untuk jaringan, padahal **application security sama pentingnya dengan network security**. Karena itu materi OWASP dalam folder `1` dan kajian threat di [[Alur dan Komponen Threat Analysis]] berpusat pada layer aplikasi.

> [!cornell] #### Summary
>
> **Software security** mengamankan kode custom, library, backend, serta web/app server, sedangkan **network security** tidak memeriksa isi HTTP sehingga **tidak dapat menghentikan serangan layer aplikasi**. Kode aplikasi adalah bagian dari perimeter dan sering menjadi lubang terbesar: serangan web lazim, mudah, jarang terdeteksi, dan berdampak besar. Maka keamanan aplikasi adalah **tanggung jawab developer**, setara pentingnya dengan keamanan jaringan.

> [!ad-libitum]- Additional Information
>
> #### WAF dan RASP
> Untuk menutup celah di layer aplikasi, lahir **Web Application Firewall (WAF)** yang memeriksa isi HTTP, dan **RASP (Runtime Application Self-Protection)** yang menanam deteksi di dalam runtime aplikasi. Keduanya bersifat tambahan; fondasinya tetap secure coding dan secure design.
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan OWASP Juice Shop lokal dan kirim satu payload SQL injection lewat proxy (Burp/ZAP). Amati bahwa request lolos tanpa hambatan di layer jaringan.
> 2. Pasang ModSecurity dengan OWASP Core Rule Set di depan aplikasi yang sama dan bandingkan hasilnya.
>
> #### Bacaan Lanjutan
> - OWASP Top 10 (lihat [[Summary OWASP Top 10]])
> - Stuttard & Pinto, *The Web Application Hacker's Handbook*
