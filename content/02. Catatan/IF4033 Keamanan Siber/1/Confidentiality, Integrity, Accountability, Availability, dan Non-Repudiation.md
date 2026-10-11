---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Confidentiality, Integrity, Accountability, Availability, dan Non-Repudiation
>
> > ## Questions/Cues
> >
> > - Bagaimana confidentiality dicapai dan beda apa dengan integrity?
> > - Teknik apa yang dipakai untuk menjaga integritas data?
> > - Apa syarat agar logging benar-benar menjamin accountability?
> > - Bagaimana availability dijaga dan diserang?
> > - Mengapa non-repudiation jarang diimplementasikan di web?
> >
> > ## Reference Points
> >
> > - IF4033 Security Foundation (Slides 22-29)
> > - IF4033 Security Concepts (Slides 13-20)
>
> > ### Confidentiality
> >
> > Tujuan: isi komunikasi atau data tersimpan tetap rahasia. Contoh: Alice dan Bob ingin percakapan mereka tidak terbaca Eve. Kuncinya adalah **rahasia bersama**, dan dicapai dengan **kriptografi, steganografi, access control**, atau *database views*.
> >
> > ### Message/Data Integrity
> >
> > Integrity berarti **tidak ada korupsi**. Pada serangan *man-in-the-middle*, Mallory dapat mengubah pesan Alice ke Bob. Integrity berbeda dari confidentiality: pesan "nilai x adalah 1" tidak rahasia, tetapi berubah menjadi "nilai x adalah 10000" atau "nilai y adalah 1" adalah kerusakan. Teknik: menambah **redundansi** berupa **hashing** (MD5, SHA-1), **checksum** (CRC), dan **Message Authentication Code (MAC)**.
> >
> > ### Accountability
> >
> > Kemampuan menentukan siapa pelaku atau principal lewat **logging & audit trail**. Syaratnya:
> >
> > - **Secure timestamping** (di level OS maupun jaringan).
> > - **Integritas log**: trail tidak boleh bisa diubah, atau perubahan harus terdeteksi. Jika tidak, penyerang akan menghapus jejaknya.
> >
> > ### Availability
> >
> > Diukur dari *uptime*, ruang penyimpanan bebas, batas downtime, atau waktu respons web server. Solusi: **redundansi** untuk menghilangkan *single point of failure* dan memberi **batas pemakaian** bagi pengguna sah. Serangan **DoS** bertujuan menurunkan availability, misalnya dengan malware yang mengirim lalu lintas berlebihan sehingga server kewalahan melayani trafik yang sah.
> >
> > ### Non-Repudiation
> >
> > Transaksi tidak dapat disangkal. Alice ingin membuktikan kepada pihak ketiga terpercaya (Trent) bahwa ia benar berkomunikasi dengan Bob, lewat bukti berupa **pernyataan bertanda tangan digital**. Dalam praktik jarang diimplementasikan; perusahaan kartu kredit menjadi *de facto* verifikator pihak ketiga.
> >
> > ### Contoh Terpadu: DVD-Factory
> >
> > | Konsep | Penerapan pada B2B website |
> > |---|---|
> > | Availability | Situs berjalan 24/7 |
> > | Authentication | Bob mengautentikasi diri; koneksi terenkripsi mengautentikasi server ke Bob |
> > | Confidentiality | Browser dan server membuat koneksi terenkripsi |
> > | Authorization | Situs mengecek DB apakah Bob boleh memesan atas nama PCs-R-Us |
> > | Integrity | Checksum pada paket TCP/IP (+ MAC pada SSL) |
> > | Accountability | Log pesanan Bob |
> > | Non-repudiation | Umumnya tidak ada karena butuh TTP |

> [!cornell] #### Summary
>
> **Confidentiality** dijaga dengan kriptografi, steganografi, dan access control; **integrity** dengan hash, checksum, dan **MAC** yang mendeteksi perubahan; **accountability** dengan **log dan audit trail** yang ber-timestamp aman dan tahan modifikasi; **availability** dengan redundansi dan pembatasan, melawan **DoS**; serta **non-repudiation** dengan tanda tangan digital dan pihak ketiga terpercaya yang jarang diterapkan di web. Contoh DVD-Factory menunjukkan ketujuh konsep bekerja bersamaan pada satu transaksi B2B.

> [!ad-libitum]- Additional Information
>
> #### MAC vs Tanda Tangan Digital
>
> MAC memakai kunci simetris sehingga memberi integrity dan authenticity antar dua pihak, tetapi **tidak** memberi non-repudiation karena kedua pihak bisa membuat MAC yang sama. Tanda tangan digital (kunci asimetris) memberi non-repudiation. Lihat [[Kriptografi Kunci Publik dan Tanda Tangan Digital]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Hitung hash SHA-256 sebuah file, ubah satu bit, dan amati perubahannya.
> 2. Rancang skema log yang *tamper-evident* memakai rantai hash.
>
> #### Bacaan Lanjutan
> - Stallings, W. *Cryptography and Network Security*, bab MAC dan digital signature.
