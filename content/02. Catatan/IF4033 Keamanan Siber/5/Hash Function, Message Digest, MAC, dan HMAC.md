---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Hash Function, Message Digest, MAC, dan HMAC
>
> > ## Questions/Cues
> >
> > - Apa sifat yang diinginkan dari fungsi hash?
> > - Mengapa Internet checksum bukan message digest yang baik?
> > - Apa itu birthday attack?
> > - Apa beda hash, MAC, dan HMAC?
> > - Bagaimana nonce menangkal replay attack?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 66-78)
>
> > ### Algoritma Hash
> >
> > | Algoritma | Keluaran | Catatan |
> > |---|---|---|
> > | **MD5** | 128-bit | Dipakai luas untuk file integrity |
> > | **SHA-1** | 160-bit | Message digest yang disetujui NIST |
> > | **HAVAL** | 128-256 bit | 3-5 ronde |
> > | **RIPEMD-160** | 160-bit | Eropa, 1996, bebas paten |
> >
> > ### Message Digest dan Sifatnya
> >
> > Fungsi **H()** menerima pesan sepanjang apa pun dan menghasilkan string berukuran tetap ("message signature"); bersifat **many-to-1**. Sifat yang diinginkan:
> >
> > - **Mudah dihitung**.
> > - **Irreversibility** (*one-way*): tidak bisa mendapat m dari H(m).
> > - **Collision resistance**: sulit menemukan m dan m' dengan H(m) = H(m').
> > - Keluaran tampak acak.
> >
> > **Internet checksum** adalah digest yang buruk: mudah membuat pesan lain dengan checksum sama. Contoh slide: "IOU1 00.9 9BOB" dan "IOU9 00.1 9BOB" memiliki checksum identik (B2 C1 D2 AC) walau pesannya berbeda.
> >
> > ### Birthday Attack
> >
> > Mencari **collision** (dua pesan dengan hash sama) memanfaatkan *birthday paradox*: peluang tabrakan muncul setelah sekitar √N percobaan untuk ruang hash N. Hash harus tahan terhadapnya, sehingga panjang digest harus cukup (bukan sekadar 64-bit).
> >
> > ### Message Integrity
> >
> > Pihak yang berkomunikasi ingin memastikan: isi tidak berubah, **sumber benar**, tidak ada **penundaan buatan (playback)**, dan **urutan pesan terjaga**.
> >
> > ### MAC dan HMAC
> >
> > **MAC** adalah blok data kecil yang dibangkitkan dengan **kunci rahasia** dan ditambahkan ke pesan: MD = H(s || m), kirim m || MD. Ia mengautentikasi pengirim dan memverifikasi integritas, **tanpa enkripsi** ("keyed hash").
> >
> > **HMAC (RFC 2104)** menutup kelemahan halus: (1) menggabungkan rahasia di depan pesan, (2) hash, (3) menggabungkan rahasia di depan digest, (4) hash lagi. Dipakai pada SSL/TLS dan IPsec.
> >
> > ### End-Point Authentication dan Replay
> >
> > MAC membuktikan Alice yang *membuat* pesan, tetapi bukan bahwa ia *mengirimnya* sekarang. Penyerang dapat merekam dan memutar ulang "Transfer $1M dari Bill ke Trudy" beserta MAC-nya. Pertahanan: sertakan **nonce** R pada MAC = f(msg, s, R) sehingga setiap sesi unik.
> >
> > ```mermaid
> > flowchart LR
> >     M["Pesan m + rahasia s + nonce R"] --> H["HMAC"] --> T["Tag"]
> >     T --> V["Penerima menghitung ulang<br/>dan membandingkan"]
> > ```

> [!cornell] #### Summary
>
> **Hash function** (MD5, SHA-1, RIPEMD-160) memetakan pesan ke digest tetap dengan sifat mudah dihitung, **one-way**, dan **collision resistant**; checksum biasa terlalu lemah, dan **birthday attack** mencari tabrakan. **MAC/HMAC** menambahkan **kunci rahasia** sehingga mengautentikasi pengirim dan menjaga integritas tanpa enkripsi. **Replay attack** dilawan dengan **nonce**. MD5 dan SHA-1 kini dianggap tidak aman untuk integritas keamanan; gunakan SHA-256/SHA-3.

> [!ad-libitum]- Additional Information
>
> #### Status Keamanan Hash
>
> MD5 (tabrakan praktis sejak 2004) dan SHA-1 (SHAttered, 2017) sudah dipatahkan untuk collision. Penyimpanan password sebaiknya memakai *password hashing* lambat (bcrypt, scrypt, Argon2) dengan salt, bukan hash cepat.
>
> #### Proyek Eksplorasi Mandiri
> 1. Cari dua input yang hash-nya berbagi 32 bit awal (partial collision) dengan brute force dan ukur jumlah percobaannya terhadap prediksi birthday.
>
> #### Bacaan Lanjutan
> - RFC 2104 (HMAC), FIPS 180-4 (SHA), FIPS 202 (SHA-3).
