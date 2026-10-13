---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Information Security dan Properti CIA
>
> > ## Questions/Cues
> >
> > - Bagaimana NIST dan ISO 27000 mendefinisikan keamanan informasi?
> > - Apa itu triad Confidentiality, Integrity, Availability, dan mengapa disebut fondasi?
> > - Properti tambahan apa saja (authenticity, accountability, non-repudiation, reliability) dan apa bedanya?
> > - Bagaimana sistem perangkat lunak berinteraksi dengan organisasi, orang, prosedur, dan kebijakan?
> > - Bagaimana setiap properti terlihat dalam kasus nyata (DVD-Factory)?
> >
> > ## Reference Points
> >
> > - IF5161 — W01 Introduction to Data & Software Security, "Information Security" s.d. "Concepts at Case (3)"
>
> > ### Definisi Keamanan Informasi
> >
> > **NIST** mendefinisikan keamanan informasi sebagai upaya *melindungi informasi dan sistem informasi dari akses, penggunaan, pengungkapan, gangguan, modifikasi, atau perusakan yang tidak sah* demi menjaga **integrity, confidentiality, dan availability**. **ISO 27000:2018** meringkasnya sebagai *preservation of confidentiality, integrity, and availability of information*. Jadi inti keduanya sama: keamanan informasi bukan sekadar "anti-peretas", melainkan **menjaga sifat-sifat tertentu dari informasi** sepanjang siklus hidupnya.
> >
> > Selain tiga sifat inti, standar yang sama mengizinkan sifat lain dilibatkan sesuai konteks: **authenticity, accountability, non-repudiation, dan reliability**.
> >
> > ### Properti Keamanan
> >
> > | Properti | Definisi singkat | Pertanyaan pemandu |
> > |---|---|---|
> > | **Confidentiality** | Informasi tidak tersedia/terungkap kepada individu, entitas, atau proses yang tidak berwenang | Siapa yang boleh *melihat*? |
> > | **Integrity** | Akurasi dan kelengkapan informasi | Apakah data *tidak berubah* tanpa izin? |
> > | **Availability** | Dapat diakses dan digunakan sesuai permintaan oleh entitas berwenang | Apakah bisa dipakai *saat dibutuhkan*? |
> > | **Authenticity** | Entitas memang seperti yang diklaimnya | Apakah ini *benar-benar* dia? |
> > | **Accountability** | Tindakan entitas dapat ditelusuri secara unik kepadanya (NIST) | Siapa yang *melakukan* ini? |
> > | **Non-repudiation** | Kemampuan membuktikan terjadinya suatu aksi beserta pelakunya | Bisakah pelaku *mengelak*? |
> > | **Reliability** | Perilaku dan hasil konsisten sesuai maksud | Apakah *selalu* berperilaku semestinya? |
> >
> > Accountability dan non-repudiation sering tertukar: **accountability** adalah kemampuan menelusuri (log), sedangkan **non-repudiation** adalah kemampuan *membuktikan* ke pihak ketiga sehingga pelaku tidak bisa menyangkal (tanda tangan digital).
> >
> > ### Konteks Sistem Perangkat Lunak
> >
> > Perangkat lunak tidak berdiri sendiri. Ia bagian dari sistem sosio-teknis: **organisasi** (orang, prosedur, kebijakan) berinteraksi dengan **software system** (aplikasi, framework, database engine, process engine), yang berjalan di atas **infrastruktur** (komputer dan jaringan), dan menghasilkan **data/file**. **Control** hadir di semua lapisan ini, tidak hanya di kode.
> >
> > ```mermaid
> > flowchart TB
> >     ORG["Organisasi<br/>People / Procedure / Policy"]
> >     SW["Software System<br/>Application / Framework<br/>Database Engine / Process Engine"]
> >     INF["Infrastructure<br/>Computer / Network"]
> >     DATA["Data / File / Information"]
> >     CTRL["Control"]
> >     ORG --> SW
> >     SW --> INF
> >     SW --> DATA
> >     CTRL -.melindungi.-> ORG
> >     CTRL -.melindungi.-> SW
> >     CTRL -.melindungi.-> INF
> > ```
> >
> > ### Properti dalam Kasus DVD-Factory
> >
> > Bob (PCs-R-US) memesan suku cadang lewat situs B2B DVD-Factory. Setiap properti punya padanan konkret:
> >
> > - **Availability** — situs DVD-Factory berjalan 24/7.
> > - **Authentication** — Bob membuktikan dirinya ke DVD-Factory, dan server membuktikan dirinya ke Bob (sertifikat; ikon gembok di browser).
> > - **Confidentiality** — browser dan web server membangun koneksi terenkripsi.
> > - **Integrity** — checksum di setiap paket TCP/IP, dan SSL memakai **MAC**.
> > - **Accountability** — DVD-Factory mencatat bahwa Bob memesan Sony DVD-R 1100.
> > - **Non-repudiation** — Bob tidak dapat menyangkal pesanannya.
> > - **Reliability** — sistem pemesanan benar-benar merekam pesanan Bob.

> [!cornell] #### Summary
>
> **Keamanan informasi** (NIST/ISO 27000) adalah upaya menjaga **confidentiality, integrity, availability (CIA)** informasi dari akses, modifikasi, atau gangguan tidak sah. Dalam praktik, triad ini diperluas dengan **authenticity, accountability, non-repudiation, dan reliability**. Karena perangkat lunak adalah bagian dari sistem sosio-teknis yang melibatkan orang, prosedur, kebijakan, dan infrastruktur, setiap properti harus dipenuhi oleh kombinasi **control** di berbagai lapisan, bukan hanya oleh kode.

> [!ad-libitum]- Additional Information
>
> #### Parkerian Hexad dan Pemetaan ke Mekanisme
> Donn Parker memperluas CIA menjadi enam elemen (menambah *possession/control*, *authenticity*, dan *utility*). Pemetaan praktis properti ke mekanisme: confidentiality → enkripsi dan access control; integrity → hash, MAC, tanda tangan digital; availability → redundansi, rate limiting, backup; accountability → audit log; non-repudiation → tanda tangan digital dengan PKI.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih satu aplikasi yang Anda pakai sehari-hari (mis. m-banking). Petakan setiap properti CIA+ ke satu fitur konkret di aplikasi tersebut.
> 2. Cari satu kasus di mana *availability* dikorbankan demi *confidentiality* (atau sebaliknya) dan jelaskan trade-off-nya.
>
> #### Bacaan Lanjutan
> - NIST FIPS 199 — Standards for Security Categorization
> - ISO/IEC 27000:2018 — Overview and vocabulary
> - Anderson, *Security Engineering*, bab 1
