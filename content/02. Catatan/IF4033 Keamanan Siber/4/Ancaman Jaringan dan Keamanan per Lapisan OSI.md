---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Ancaman Jaringan dan Keamanan per Lapisan OSI
>
> > ## Questions/Cues
> >
> > - Apa itu protokol dan security protocol?
> > - Ancaman apa saja yang ada pada jaringan?
> > - Keamanan apa yang diterapkan pada tiap lapisan OSI?
> > - Mengapa SSH yang dirancang aman justru menjadi sumber kerentanan?
> >
> > ## Reference Points
> >
> > - IF4033 Network Security (Slides 2-11)
>
> > ### Protokol dan Security Protocol
> >
> > **Protokol** adalah aturan khusus yang dipakai kedua ujung komunikasi (pengguna dengan aplikasi, komputer dengan card reader, komputer dengan komputer). **Security protocol** adalah protokol yang menjalankan fungsi terkait keamanan dengan metode **kriptografi**.
> >
> > ### Ancaman pada Jaringan
> >
> > Ancaman terhadap komunikasi jaringan mencakup:
> >
> > - **Menyadap** data yang lewat (*interception*).
> > - **Mengakses**, **memodifikasi**, atau **meng-crash** program/data/layanan pada host jarak jauh, bahkan **menjalankan program** di sana.
> > - **Memodifikasi** data saat transit, **menyisipkan** komunikasi, atau **mengulang** komunikasi sebelumnya (*replay*).
> > - **Menyamar** sebagai pengguna/IP/MAC (*spoofing*).
> > - **Membanjiri** layanan dengan trafik berlebih, **memblokir** trafik tertentu atau seluruhnya.
> >
> > ### Keamanan pada Lapisan Berbeda
> >
> > | Lapisan | Mekanisme |
> > |---|---|
> > | Application | PGP, Kerberos, SSH, dll. |
> > | Transport | TLS (Transport Layer Security) |
> > | Network | IPsec (IP Security) |
> > | Data Link | Enkripsi hardware |
> >
> > ```mermaid
> > flowchart TB
> >     A["Application: PGP, Kerberos, SSH"] --> T["Transport: TLS"] --> N["Network: IPsec"] --> D["Data Link: hardware encryption"]
> > ```
> >
> > ### Paradoks SSH
> >
> > SSH dibuat untuk mencegah penyadapan, tetapi menjadi sumber kerentanan baru (CERT advisory 2001-2003: *buffer overflow* berkali-kali, kerentanan challenge-response, bahkan distribusi OpenSSH yang mengandung **trojan horse**). Sumbernya bukan kriptografi, melainkan **kesalahan protokol/implementasi** (contoh WEP pada WiFi), **kesalahan pemrograman** (buffer overflow), dan **kesalahan distribusi** (trojan).
> >
> > Bruce Schneier: *"Saat ini enkripsi adalah mata rantai terkuat. Semua yang lain lebih buruk: software, jaringan, manusia. Tidak ada gunanya memperkuat mata rantai terkuat."*

> [!cornell] #### Summary
>
> Jaringan menghadapi ancaman penyadapan, modifikasi, penyisipan, replay, spoofing, flooding, dan pemblokiran. **Security protocol** menambahkan kriptografi pada protokol, dengan mekanisme di tiap lapisan: **PGP/Kerberos/SSH** (aplikasi), **TLS** (transport), **IPsec** (network), enkripsi hardware (data link). Contoh **SSH** menunjukkan bahwa kerentanan sering berasal dari **implementasi, pemrograman, dan distribusi**, bukan kriptografi, sehingga memperkuat enkripsi saja tidak cukup.

> [!ad-libitum]- Additional Information
>
> #### Supply-Chain pada Distribusi
>
> Kasus trojan pada distribusi OpenSSH (2002) adalah contoh awal serangan *supply chain*, yang kini ditangkal dengan tanda tangan digital dan *reproducible builds*; bandingkan [[Prinsip Cloud-Native - Lima Pilar Arsitektur Aman]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Tangkap trafik Telnet vs SSH dengan Wireshark dan bandingkan apa yang terlihat.
>
> #### Bacaan Lanjutan
> - Schneier, B. *Secrets and Lies*.
> - RFC 4251 (SSH architecture).
