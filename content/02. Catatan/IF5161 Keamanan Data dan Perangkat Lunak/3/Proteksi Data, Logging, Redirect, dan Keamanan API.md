---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Proteksi Data, Logging, Redirect, dan Keamanan API
>
> > ## Questions/Cues
> >
> > - Apa kesalahan umum dalam menyimpan dan mengirim data sensitif?
> > - Mengapa log bisa menjadi sumber kebocoran sekaligus kunci deteksi?
> > - Bagaimana unvalidated redirect dan forward dieksploitasi?
> > - Apa tujuan attack protection (detect, respond, patch quickly)?
> > - Mengapa API "tak terpublikasi" tetap harus diamankan?
> > - Bagaimana slide menautkan ke kategori OWASP 2021 (Insecure Design, Integrity Failures, SSRF)?
> >
> > ## Reference Points
> >
> > - IF5161 — W02 Web Application Vulnerability, bagian "Insecure Cryptographic Storage" s.d. "Underprotected APIs" dan "Insecure Design", "Software & Data Integrity Failures", "SSRF"
>
> > ### Insecure Cryptographic Storage
> >
> > Kegagalan: tidak mengidentifikasi **semua data sensitif**, **semua tempat penyimpanannya** (database, file, direktori, **log**, backup), dan tidak melindunginya di setiap lokasi. Ilustrasi: error handler mencatat nomor kartu kredit saat payment gateway down, log bisa dibaca seluruh staf IT, lalu **malicious insider mencuri 4 juta nomor kartu**. Dampak: data pribadi terekspos, hilangnya kepercayaan, biaya forensik, denda dan gugatan.
> >
> > **Pencegahan**: identifikasi data dan lokasinya, pastikan **threat model** mencakup serangannya, lindungi dengan mekanisme tepat (enkripsi file/database/elemen data), pakai **algoritma standar yang kuat**, kelola kunci (generate, distribusi, lindungi, **siap untuk rotasi**).
> >
> > ### Insufficient Transport Layer Protection
> >
> > Sama, tetapi untuk data **dalam transit**: web, backend database, mitra bisnis, komunikasi internal. Penyerang eksternal maupun internal dapat menyadap kredensial dan data di jaringan. **Pencegahan**: **TLS** pada semua koneksi sensitif, enkripsi/tanda tangan pesan (XML-Encryption/XML-Signature), nonaktifkan algoritma SSL lama, kelola sertifikat, dan **verifikasi sertifikat** sebelum dipakai.
> >
> > ### Insufficient Logging dan Monitoring
> >
> > Logging dan monitoring yang kurang adalah "bedrock" hampir setiap insiden besar: penyerang mengandalkan ketiadaan monitoring dan respons. Sebagian besar serangan sukses diawali **probing kerentanan**; membiarkannya dapat menaikkan peluang eksploitasi mendekati 100%. Indikator: periksa log setelah pentest; tindakan penguji harus terekam.
> >
> > **Varian masalah**: login/gagal login/transaksi bernilai tinggi tidak dicatat; pesan error tidak jelas; log tak dimonitor; log hanya lokal; tidak ada ambang alert; scan DAST tidak memicu alert.
> >
> > **Pencegahan**: catat login, kegagalan access control, dan kegagalan validasi input dengan konteks pengguna; format mudah dikonsumsi **pusat manajemen log**; **audit trail dengan integrity control** (mis. tabel append-only) untuk transaksi penting; monitoring dan alert efektif; rencana **incident response** (mis. NIST 800-61).
> >
> > ### Unvalidated Redirects dan Forwards
> >
> > Redirect sering memuat parameter pengguna pada URL tujuan. Jika tidak divalidasi, korban dikirim ke situs pilihan penyerang (phishing/malware), contoh `claim.jsp?year=2006&dest=www.evilsite.com` dalam email "unclaimed tax refund". **Forward** (internal) yang tidak divalidasi dapat **melewati pengecekan autentikasi/otorisasi**.
> >
> > **Pencegahan**: hindari redirect/forward; jangan libatkan parameter pengguna; bila terpaksa, validasi parameter atau (**lebih baik**) pakai **pemetaan server-side** dari pilihan pengguna ke halaman tujuan, dan validasi ulang URL tujuan.
> >
> > ### Insufficient Attack Protection
> >
> > Banyak alat otomatis membantu penyerang. Tiga tujuan perlindungan:
> >
> > | Tujuan | Isi |
> > |---|---|
> > | **Detect** | Apakah ada yang mustahil dilakukan pengguna sah (input yang klien sah tak bisa buat) atau pola tak wajar (tempo tinggi, request berulang)? |
> > | **Respond** | Log dan notifikasi; blokir request/IP/rentang IP; nonaktifkan/monitor akun bermasalah |
> > | **Patch quickly** | Jika patch kritis tak bisa keluar dalam sehari, pasang **virtual patch** (WAF, RASP) |
> >
> > Teknologi: **WAF, RASP, firewall, IDS/IPS, OWASP AppSensor, honeypot**.
> >
> > ### Underprotected APIs
> >
> > Tren mobile dan microservice meningkatkan eksposur API backend. Tidak "dipublikasikan" bukan berarti tak dapat ditemukan. Karena dipakai program (bukan manusia), API sering tanpa UI, memakai protokol dan struktur data kompleks sehingga **pengujian keamanan sulit diotomasi** dan menimbulkan rasa aman semu. Praktik: pahami threat model; amankan komunikasi; autentikasi kuat dan lindungi kredensial/kunci/token; **kerasakan konfigurasi parser**; terapkan access control pada fungsi dan referensi data; lindungi dari semua bentuk injection.
> >
> > ### Jembatan ke OWASP 2021
> >
> > Slide menutup dengan kategori baru: **Insecure Design** (celah akibat *flaw*, bukan sekadar bug; perlu *shift-left* melalui secure design pattern dan threat modeling), **Software & Data Integrity Failures** (rantai pasok; pastikan integritas/keaslian kode dan artefak), dan **SSRF**.
> >
> > ```mermaid
> > flowchart LR
> >     S["Data sensitif"] --> AT["At rest<br/>Cryptographic Storage"]
> >     S --> TR["In transit<br/>Transport Layer Protection"]
> >     AT --> MON["Logging &amp; Monitoring"]
> >     TR --> MON
> >     MON --> RESP["Attack Protection:<br/>Detect, Respond, Patch"]
> > ```

> [!cornell] #### Summary
>
> Data sensitif harus dilindungi **saat disimpan** (algoritma kuat, manajemen kunci, termasuk di log dan backup) dan **saat dikirim** (TLS, verifikasi sertifikat). Tanpa **logging dan monitoring** serangan tak terdeteksi, sehingga perlu audit trail, alert, dan **attack protection** (detect, respond, patch quickly). **Redirect/forward** harus divalidasi atau dipetakan di server, dan **API** perlu threat model, autentikasi, serta access control sendiri. Kategori Insecure Design, Integrity Failures, dan SSRF menjembatani ke OWASP 2021.

> [!ad-libitum]- Additional Information
>
> #### Dari Logging ke Deteksi
> Logging yang baik mencatat **siapa, apa, kapan, dari mana, hasil** dan tidak memuat rahasia. Hubungkan ke SIEM (mis. Wazuh, ELK) agar korelasi dan alert otomatis. Rencana respons insiden merujuk NIST SP 800-61. Kunci pembahasan kripto yang benar ada di [[Bug Kriptografi Lima Kelas Utama]] dan [[Rekayasa Kriptografi Terapan]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Audit satu aplikasi Anda: daftar semua tempat data sensitif tersimpan (termasuk log) dan tentukan perlindungannya.
> 2. Jalankan OWASP ZAP terhadap aplikasi lokal dan periksa apakah log aplikasi memunculkan alert.
>
> #### Bacaan Lanjutan
> - OWASP Transport Layer Protection Cheat Sheet
> - OWASP Logging Cheat Sheet
> - NIST SP 800-61 Rev. 2
