---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Kriptografi Kunci Publik dan Tanda Tangan Digital
>
> > ## Questions/Cues
> >
> > - Apa sifat yang harus dimiliki tanda tangan digital?
> > - Bagaimana tanda tangan digital dibuat dan diverifikasi?
> > - Mengapa dibutuhkan Certificate Authority?
> > - Apa isi sertifikat X.509 dan bagaimana alur handshake SSL?
> > - Apa saja komponen PKI?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 78-96)
>
> > ### Sifat Tanda Tangan Digital
> >
> > Analog tanda tangan tulisan tangan dengan kriptografi kunci publik. Sebuah tanda tangan harus:
> >
> > - **Unforgeable**: tidak ada pihak lain yang dapat membuat pasangan [M, S(P,M)].
> > - **Authentic**: penerima dapat memeriksa bahwa tanda tangan benar dari P.
> > - **Not alterable**: M tidak dapat diubah setelah dikirim.
> > - **Not reusable**: pesan lama yang disajikan ulang terdeteksi.
> >
> > **Digital Signature Standard (DSS)** memakai DSA/RSA/ECDSA ditambah SHA, dan menyediakan *sender authentication*, *integrity*, dan **nonrepudiation**.
> >
> > ### Tanda Tangan = Digest yang Ditandatangani
> >
> > Menandatangani seluruh pesan dengan kunci privat mahal, sehingga yang ditandatangani adalah **hash pesan**:
> >
> > ```mermaid
> > flowchart LR
> >     M["Pesan m"] --> H["H(m)"] --> S["Enkripsi dengan<br/>kunci privat Bob<br/>= tanda tangan"]
> >     M --> KIRIM["Kirim m + tanda tangan"]
> >     S --> KIRIM
> >     KIRIM --> V["Alice: dekripsi tanda tangan<br/>dengan kunci publik Bob<br/>lalu bandingkan dengan H(m)"]
> > ```
> >
> > Jika sama, Alice yakin (1) Bob yang menandatangani, (2) tidak ada orang lain, dan (3) yang ditandatangani m, bukan m'. **Non-repudiation**: Alice dapat membawa m dan tanda tangannya ke pengadilan.
> >
> > ### Masalah Sertifikasi: "Pizza Prank"
> >
> > Trudy membuat pesanan "kirim empat pizza ke Bob", menandatangani dengan kunci privatnya, lalu mengirim kunci publiknya sambil mengaku itu kunci publik Bob. Toko pizza memverifikasi tanda tangan dan mengirim pizza ke Bob. Solusinya: **Certification Authority (CA)** yang mengikat kunci publik ke sebuah entitas.
> >
> > ### Certificate Authority dan X.509
> >
> > Entitas E mendaftarkan kunci publik ke CA dengan bukti identitas; CA membuat **sertifikat** berisi kunci publik E dan identitasnya, **ditandatangani dengan kunci privat CA**. Alice memverifikasinya dengan kunci publik CA untuk mendapat kunci publik Bob.
> >
> > Isi sertifikat **X.509 v3**: versi, nomor seri, algoritma tanda tangan, nama X.500 CA, periode validitas, nama X.500 subjek, informasi kunci publik subjek (algoritma + isi), identifier unik opsional, extensions opsional, dan tanda tangan digital CA.
> >
> > ### Handshake SSL (Ringkas)
> >
> > 1. Client Hello: daftar cipher suite.
> > 2. Server memilih cipher suite dan mengirim **sertifikat digital**.
> > 3. (Opsional) server meminta sertifikat client.
> > 4. Client mengirim secret/key/nonce terenkripsi, server mendekripsinya.
> > 5. Kunci simetris disepakati; data dikirim dengan **enkripsi simetris**.
> >
> > ### PKI dan Manajemen Kunci
> >
> > **Public Key Infrastructure** adalah seluruh komponen untuk komunikasi aman: kebijakan dan prosedur, kunci dan algoritma, perangkat lunak dan format data. Komponennya: **digital certificate**, **Certificate Authority**, **Registration Authority** (verifikasi identitas), dan **Certificate Revocation List (CRL)**. **Cross certification** membangun kepercayaan antar-CA. Alternatif distribusi kunci simetris: **Key Distribution Center** (Kerberos) dan ANSI X9.17 (hierarki kunci pada institusi keuangan).

> [!cornell] #### Summary
>
> **Tanda tangan digital** (hash pesan yang dienkripsi dengan kunci privat) memberi autentikasi pengirim, integritas, dan **non-repudiation**. Karena kunci publik bisa dipalsukan (pizza prank), **CA** mengikat kunci publik ke identitas dalam **sertifikat X.509** yang ditandatangani CA. **SSL/TLS** memakai sertifikat untuk autentikasi lalu menyepakati kunci simetris (hybrid). **PKI** mencakup sertifikat, CA, RA, CRL, dan cross-certification; KDC/Kerberos adalah alternatif untuk kunci simetris.

> [!ad-libitum]- Additional Information
>
> #### Alur Validasi Modern
>
> Browser memvalidasi **rantai sertifikat** (leaf, intermediate, root di trust store), memeriksa pencabutan dengan **OCSP/CRL**, dan mencatat penerbitan di **Certificate Transparency log**. Let's Encrypt mengotomatiskan penerbitan sertifikat DV lewat protokol ACME.
>
> #### Proyek Eksplorasi Mandiri
> 1. Dengan OpenSSL, buat CA lokal, terbitkan sertifikat server, lalu konfigurasi nginx dan verifikasi rantainya dengan `openssl s_client`.
>
> #### Bacaan Lanjutan
> - RFC 5280 (X.509 PKIX), RFC 8446 (TLS 1.3).
> - Lihat penerapan praktik pada [[Writeup Cryptography]].
