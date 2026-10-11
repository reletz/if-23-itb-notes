---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Kriptanalisis dan Protokol Keamanan Email
>
> > ## Questions/Cues
> >
> > - Apa itu kriptanalisis dan apa kaitannya dengan prinsip Kerckhoffs?
> > - Apa saja jenis serangan terhadap kriptosistem?
> > - Mengapa faktor manusia dan implementasi sering menjadi titik lemah?
> > - Bagaimana PGP dan S/MIME mengamankan email?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 97-103)
>
> > ### Kriptanalisis
> >
> > Studi tentang metode memecahkan kriptosistem, sering ditujukan untuk **memperoleh kunci**. Serangan dapat **pasif** atau **aktif**. Menurut **prinsip Kerckhoffs**, satu-satunya yang boleh dirahasiakan dalam kriptosistem adalah **kunci**; kekuatan sistem diukur dari seberapa sulit menemukan rahasia tersebut.
> >
> > ### Jenis Serangan
> >
> > | Kelompok | Serangan | Penjelasan |
> > |---|---|---|
> > | Berbasis kunci/teks | **Brute force** | Mencoba semua nilai di keyspace |
> > | | **Frequency analysis** | Menebak dari frekuensi kemunculan huruf |
> > | | **Dictionary attack** | Mencari plaintext dari kata umum |
> > | | **Factoring attack** | Mencari kunci lewat faktorisasi prima (RSA) |
> > | Berdasarkan akses | **Ciphertext-only** | Hanya punya ciphertext |
> > | | **Known plaintext** | Format/isi sebagian plaintext diketahui |
> > | | **Chosen plaintext** | Penyerang dapat mengenkripsi plaintext pilihan |
> > | | **Chosen ciphertext** | Mendekripsi ciphertext tertentu untuk menemukan kunci |
> > | Protokol | **Replay attack** | Mengulang nilai yang diketahui |
> > | Implementasi | **Side channel / differential power analysis** | Mengidentifikasi algoritma dan panjang kunci dari konsumsi daya/waktu |
> > | | **RNG attack** | Memprediksi IV/nonce |
> > | | **Temporary files** | Berkas sementara dapat berisi plaintext |
> > | Manusia | **Social engineering** | Manusia mata rantai terlemah |
> >
> > ### Protokol Keamanan Email
> >
> > - **PEM (Privacy Enhanced Mail)**: protokol awal.
> > - **PGP (Pretty Good Privacy)**: model **distributed trust**; tiap pengguna membangkitkan pasangan kunci sendiri (web of trust).
> > - **S/MIME**: membutuhkan **PKI**, didukung sebagian besar klien email.
> >
> > ```mermaid
> > flowchart TB
> >     E["Keamanan Email"] --> PGP["PGP<br/>distributed trust,<br/>web of trust"]
> >     E --> SM["S/MIME<br/>berbasis PKI/CA"]
> > ```

> [!cornell] #### Summary
>
> **Kriptanalisis** berupaya memecahkan kriptosistem, terutama mendapat kunci, dengan serangan seperti **brute force, frequency analysis, dictionary, factoring**, serta variasi akses (**ciphertext-only, known/chosen plaintext, chosen ciphertext**) dan serangan implementasi (**side channel, RNG, file sementara, social engineering**). Prinsip **Kerckhoffs**: hanya kunci yang rahasia. Keamanan email dicapai dengan **PGP** (distributed trust) atau **S/MIME** (berbasis PKI).

> [!ad-libitum]- Additional Information
>
> #### Serangan Implementasi Terkenal
>
> **Heartbleed** (2014, bug OpenSSL), **ROCA** (2017, pembangkitan kunci RSA lemah pada chip), dan **Spectre/Meltdown** adalah contoh bahwa kegagalan sering berada pada implementasi, selaras dengan Schneier pada [[Ancaman Jaringan dan Keamanan per Lapisan OSI]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Selesaikan tantangan kriptografi CTF (mis. cryptopals set 1-2) dan dokumentasikan serangan yang dipakai.
>
> #### Bacaan Lanjutan
> - Cryptopals Crypto Challenges.
> - Ferguson, Schneier, Kohno. *Cryptography Engineering*.
