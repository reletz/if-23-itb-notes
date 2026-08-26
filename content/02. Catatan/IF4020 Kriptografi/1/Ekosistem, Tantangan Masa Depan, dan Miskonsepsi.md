---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Ekosistem, Tantangan Masa Depan, dan Miskonsepsi
>
> > ## Questions/Cues
> >
> > - Lembaga apa yang menangani kriptografi/persandian di Indonesia?
> > - Apa itu Museum Sandi dan mengapa istimewa?
> > - Apa saja tantangan masa depan kriptografi?
> > - Mengapa lightweight dan post-quantum cryptography penting?
> > - Apa miskonsepsi umum orang yang tidak paham kriptografi?
> > - Kapan pakai symmetric vs asymmetric encryption?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Pengantar Kriptografi (Slides 64-73)
>
> > ### Lembaga Terkait Kriptografi di Indonesia
> >
> > - **Badan Siber dan Sandi Negara (BSSN)** — `bssn.go.id`. Merupakan penggabungan **Lembaga Sandi Negara (Lemsaneg)** dan **Direktorat Jenderal Aplikasi Informatika (Aptika)** Kementerian Komunikasi dan Informatika.
> > - **Politeknik Siber dan Sandi Negara (PSSN / Poltek SSN)** — `poltekssn.ac.id`. Perguruan tinggi kedinasan yang mendidik ahli persandian.
> >
> > ### Museum Sandi Yogyakarta
> >
> > Beralamat di Jl. Faridan Muridan Noto No. 21, Kota Baru, Yogyakarta. Ini **museum sandi satu-satunya di Indonesia, bahkan diklaim satu-satunya di dunia**. Di dalamnya terdapat berbagai koleksi **alat sandi** dan **mesin sandi** yang pernah digunakan di Indonesia — konteks sejarah perjuangan persandian nasional.
> >
> > ### Tantangan Masa Depan Kriptografi
> >
> > - **Lightweight cryptography** — primitif kriptografi hemat sumber daya untuk perangkat **IoT** (daya, memori, dan komputasi terbatas), mis. sensor dan RFID.
> > - **Post-quantum cryptography (PQC)** — algoritma yang tahan terhadap serangan **komputer kuantum**. Algoritma Shor mengancam RSA dan ECC; PQC mencari fondasi baru (lattice, hash-based, code-based, multivariate).
> > - **Kriptografi berbasis AI dan serangan AI** — pemanfaatan machine learning untuk merancang maupun menyerang skema kriptografi.
> > - **Selective encryption for multimedia data** — hanya mengenkripsi **bagian penting** dari data video/gambar agar hemat komputasi namun tetap melindungi konten (mis. hanya frame kunci atau koefisien tertentu).
> >
> > ```mermaid
> > flowchart LR
> >     T["Tantangan Masa Depan Kriptografi"]
> >     T --> L["Lightweight cryptography<br/>untuk IoT"]
> >     T --> P["Post-quantum cryptography<br/>tahan komputer kuantum"]
> >     T --> AI["Kriptografi berbasis AI<br/>&amp; serangan berbasis AI"]
> >     T --> M["Selective encryption<br/>untuk data multimedia"]
> > ```
> >
> > ### Kesalahan Umum karena Tidak Paham Kriptografi
> >
> > - **Menganggap enkripsi = encoding, hashing, atau tokenisasi.** Padahal keempatnya berbeda: *encoding* (mis. Base64) hanya mengubah representasi dan **reversibel tanpa kunci** — bukan untuk kerahasiaan; *hashing* **irreversible** dan tanpa kunci — untuk integritas, bukan untuk memulihkan data; *tokenisasi* mengganti data sensitif dengan token yang dipetakan lewat tabel/vault; hanya **enkripsi** yang menyembunyikan makna dan dapat dibuka kembali **dengan kunci**.
> > - **Tidak paham perbedaan symmetric dan asymmetric encryption**, serta **kapan** memakai masing-masing:
> >   - **Symmetric** — cepat, untuk mengenkripsi **data dalam jumlah besar** (file, lalu lintas jaringan) ketika kedua pihak sudah/berbisa berbagi kunci.
> >   - **Asymmetric** — lambat, untuk **pertukaran kunci**, **tanda tangan digital**, dan mengirim pesan ke pihak yang belum berbagi kunci rahasia.
> >
> > Miskonsepsi ini berbahaya dalam praktik: memilih primitif yang salah (mis. "meng-hash" password lalu menganggapnya "terenkripsi", atau mengenkripsi file besar langsung dengan RSA) menghasilkan sistem yang lambat atau tidak aman.

> [!cornell] #### Summary
>
> Di Indonesia, kriptografi dan persandian ditangani **BSSN** (gabungan Lemsaneg + Aptika) dengan pendidikan kader di **Poltek SSN**; sejarahnya terekam di **Museum Sandi Yogyakarta**. Empat tantangan masa depan: **lightweight cryptography** untuk IoT, **post-quantum cryptography** menghadapi komputer kuantum, **kriptografi/serangan berbasis AI**, dan **selective encryption** untuk multimedia. Dua miskonsepsi umum yang perlu dihindari: **menyamakan enkripsi dengan encoding/hashing/tokenisasi** (padahal hanya enkripsi yang menyembunyikan makna dan dibuka dengan kunci), dan **tidak tahu kapan memakai symmetric vs asymmetric** — simetri untuk data besar, asimetri untuk pertukaran kunci dan tanda tangan. Pemahaman ini menutup rangkaian pengantar; detail tiap algoritma ada di [[Algoritma Kriptografi]].

> [!ad-libitum]- Additional Information
>
> #### NIST PQC Standardization
>
> Setelah proses seleksi bertahun-tahun, NIST menstandarkan (2024) **ML-KEM** (Kyber, key encapsulation berbasis lattice), **ML-DSA** (Dilithium) dan **SLH-DSA** (SPHINCS+, hash-based) untuk tanda tangan. Ancaman *"harvest now, decrypt later"* — musuh menyimpan cipherteks hari ini untuk didekripsi saat komputer kuantum matang — membuat migrasi ke PQC mendesak untuk data berumur panjang.
>
> #### Lightweight Crypto: Ascon
>
> NIST memilih **Ascon** (2023) sebagai standar lightweight untuk *authenticated encryption* dan *hashing* pada perangkat terbatas. Trade-off desainnya: state kecil, operasi sederhana, tahan side-channel — dengan margin keamanan yang tetap konservatif.
>
> #### Enkripsi vs Encoding vs Hashing vs Tokenisasi
>
> | Teknik | Butuh kunci? | Reversibel? | Tujuan |
> |---|---|---|---|
> | Encoding (Base64) | tidak | ya (siapa pun) | representasi/transport |
> | Hashing (SHA-256) | tidak | tidak | integritas, penyimpanan password |
> | Tokenisasi | tidak (pakai vault) | ya (lewat vault) | menghapus data sensitif dari sistem |
> | Enkripsi (AES, RSA) | ya | ya (pemegang kunci) | kerahasiaan |
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Kunjungi (atau telusuri arsip daring) Museum Sandi Yogyakarta dan buat katalog singkat 5 mesin sandi beserta prinsip kerjanya.
> 2. Bandingkan ukuran kunci/cipherteks RSA-2048 vs ML-KEM-768 dan diskusikan implikasi bandwidth migrasi PQC.
>
> #### Bacaan Lanjutan
>
> - NIST, *FIPS 203/204/205* (ML-KEM, ML-DSA, SLH-DSA), 2024.
> - NIST, *Lightweight Cryptography: Ascon Family*, 2023.
> - situs resmi **BSSN** (`bssn.go.id`) dan **Poltek SSN** (`poltekssn.ac.id`).
