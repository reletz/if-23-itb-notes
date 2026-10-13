---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Klasifikasi Data, DLP, dan Regulasi
>
> > ## Questions/Cues
> >
> > - Mengapa data harus diklasifikasikan sebelum dilindungi?
> > - Bagaimana kontrol berbeda untuk data at rest, in transit, dan in use?
> > - Apa yang dilakukan DLP (discover, monitor, enforce)?
> > - Apa tuntutan teknis GDPR, UU PDP, dan PCI-DSS?
> > - Bagaimana kripto melindungi data pada sistem dengan jutaan rekaman?
> >
> > ## Reference Points
> >
> > - IF5161 — W07 Crypto and Data Security, "Data Security, Applied Crypto for Data Protection, DLP & Regulation" (Foundation: Classify Before You Protect s.d. Discussion / Q&A)
>
> > ### Klasifikasi Sebelum Proteksi
> >
> > **Klasifikasi mendorong setiap keputusan berikutnya**: kekuatan enkripsi, akses, retensi, logging. Data yang tak diklasifikasikan akan dilindungi pada tingkat **asumsi terlemah**. Contoh tingkatan: publik, internal, rahasia, sangat rahasia / data pribadi spesifik.
> >
> > ### Siklus Hidup Data
> >
> > | State | Kontrol |
> > |---|---|
> > | **At rest** | Enkripsi disk/database, kontrol kunci |
> > | **In transit** | TLS |
> > | **In use** | TEE, PET |
> >
> > **Backup, log, cache, dan salinan analitik** juga bagian dari siklus hidup dan sering dilupakan (lihat insiden log berisi nomor kartu di [[Proteksi Data, Logging, Redirect, dan Keamanan API]]).
> >
> > ### Data Loss Prevention (DLP)
> >
> > | Fungsi | Isi |
> > |---|---|
> > | **Discover** | Menemukan data sensitif (pola, kamus, fingerprint, classifier ML) |
> > | **Monitor** | Endpoint, egress jaringan, email, cloud storage, SaaS |
> > | **Enforce** | Blokir, karantina, enkripsi, redaksi, alert |
> >
> > Teknik: **regex dan checksum** (nomor kartu, ID), **exact data matching**, **document fingerprinting**, **tokenisasi dan masking**.
> >
> > ### Regulasi: Apa yang Diminta Hukum secara Teknis
> >
> > | Kerangka | Kewajiban relevan (pembacaan teknis) |
> > |---|---|
> > | **GDPR** | Minimisasi data dan batas penyimpanan (Ps. 5), *data protection by design* (Ps. 25), keamanan pemrosesan termasuk enkripsi (Ps. 32), notifikasi pelanggaran (Ps. 33) |
> > | **UU PDP Indonesia (UU No. 27 Tahun 2022)** | Dasar hukum dan pembatasan tujuan, keamanan data pribadi, kewajiban notifikasi pelanggaran, aturan transfer lintas negara |
> > | **PCI-DSS** | Lindungi data akun tersimpan (Req. 3), kripto kuat untuk transmisi (Req. 4) |
> >
> > Prinsip: **hukum menyatakan hasil, insinyur memilih kontrolnya**.
> >
> > ### Kripto untuk Perlindungan Data pada Skala Sistem
> >
> > Kripto mengamankan satu rekaman di satu fungsi, sedangkan sistem nyata punya **jutaan rekaman dan banyak service**. Pertanyaan yang harus dijawab: siapa boleh membaca field mana? di mana kunci disimpan? bagaimana merotasi tanpa mengenkripsi ulang semuanya? bagaimana bila database dicuri? **Tujuan: database atau bucket yang dicuri tidak boleh membuka data sensitif dengan sendirinya.**
> >
> > ```mermaid
> > flowchart TB
> >     C["Klasifikasi data"] --> P["Pilih kontrol per state<br/>rest / transit / use"]
> >     P --> K["Field-level encryption<br/>+ KMS (envelope)"]
> >     K --> D["DLP: discover, monitor, enforce"]
> >     D --> R["Kepatuhan:<br/>GDPR, UU PDP, PCI-DSS"]
> >     K -.dicuri tanpa kunci.-> S["DB bocor tetap tak terbaca"]
> > ```
> >
> > ### Diskusi
> >
> > Bug kripto mana dari lima kelas yang paling mungkin ada pada kode lama Anda? Di mana salinan sistem yang dicuri akan membuka plaintext hari ini? Berapa nilai ε (privasi diferensial) yang akan Anda terima untuk dataset tertentu, dan siapa yang berhak memutuskan?

> [!cornell] #### Summary
>
> **Klasifikasi data** mendahului semua keputusan proteksi; kontrol berbeda untuk **at rest, in transit, in use**, dan mencakup backup/log/cache. **DLP** menemukan, memantau, dan menegakkan perlindungan. Regulasi (**GDPR, UU PDP, PCI-DSS**) menyatakan hasil sedangkan engineer memilih kontrol. Pada skala sistem, desain harus memastikan **database yang dicuri saja tidak membuka data sensitif** lewat enkripsi field, KMS, dan rotasi kunci.

> [!ad-libitum]- Additional Information
>
> #### Teknik Pelindung Data Praktis
> **Tokenisasi** (mengganti nilai dengan token, nilai asli di vault), **format-preserving encryption**, **masking dinamis** pada query, dan **privasi diferensial** (menambah noise terkalibrasi ε untuk analitik). Pilihan bergantung apakah data harus dapat dikembalikan, dicari, atau hanya diagregasi. Teknologi PET lebih lanjut dibahas di [[Riset Terkini Secure Design]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat matriks klasifikasi untuk skema database proyek Anda dan tetapkan kontrol per kolom.
> 2. Implementasikan field-level encryption untuk satu kolom sensitif dengan envelope encryption ([[Rekayasa Kriptografi Terapan]]) dan skenarionya jika dump database bocor.
>
> #### Bacaan Lanjutan
> - UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
> - GDPR Pasal 5, 25, 32, 33
> - PCI DSS v4.0 Requirement 3 dan 4
