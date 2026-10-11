---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Kriptografi Simetris - DES, 3DES, dan AES
>
> > ## Questions/Cues
> >
> > - Apa saja algoritma simetris yang dikenal?
> > - Bagaimana DES bekerja dan mengapa dianggap tidak aman lagi?
> > - Bagaimana 3DES memperkuat DES?
> > - Bagaimana struktur dan ronde AES?
> > - Mengapa AES lebih aman daripada DES?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 17-29)
>
> > ### Algoritma Simetris
> >
> > DES (mode ECB, CBC, CFB, OFB), 3DES, AES, IDEA, Blowfish, RC4, RC5, CAST, SAFER, Twofish.
> >
> > ### DES (Data Encryption Standard)
> >
> > - Standar enkripsi AS (NIST 1993): **kunci 56-bit**, input plaintext **64-bit**, block cipher.
> > - Alur: **initial permutation**, **16 ronde** identik (tiap ronde memakai 48 bit subkey), lalu **final permutation**. Strukturnya **Feistel**.
> > - Keamanan: *DES Challenge* memecahkan frasa ber-kunci 56-bit dengan brute force **kurang dari sehari**; tidak ada serangan analitik yang baik.
> > - Penguatan: **3DES**, yaitu enkripsi 3 kali dengan 3 kunci berbeda (sebenarnya *encrypt-decrypt-encrypt*).
> >
> > ### Block Cipher Iteratif
> >
> > Block cipher dibangun dengan mengiterasi **round function** `R(k, m)` memakai *key expansion*; 3DES memakai n=48 ronde dan AES-128 memakai n=10.
> >
> > ### AES (Advanced Encryption Standard)
> >
> > NIST (Januari 1997) meminta algoritma yang **tidak rahasia, terbuka, bebas royalti, simetris, blok 128-bit, dan kunci 128/192/256-bit**. Pemenang Rijndael ditetapkan standar pada **November 2001**, menggantikan DES.
> >
> > - Blok **128 bit**, kunci **128/192/256 bit**.
> > - Berbeda dari DES, AES adalah **jaringan substitusi-permutasi (SP network)**, bukan Feistel.
> > - Brute force yang memakan 1 detik pada DES butuh **±149 triliun tahun** pada AES.
> >
> > ```mermaid
> > flowchart TB
> >     IN["Input 16 byte + k0"] --> R["Ronde 1-9:<br/>ByteSub, ShiftRow, MixColumn, AddRoundKey"]
> >     R --> L["Ronde 10:<br/>ByteSub, ShiftRow, AddRoundKey"]
> >     L --> OUT["Output"]
> > ```
> >
> > AES-128 memakai **10 ronde**; *key expansion* mengubah 16 byte menjadi 176 byte. Fungsi ronde: **ByteSub** (S-box 1 byte, tabel 256 byte), **ShiftRows**, dan **MixColumns**.
> >
> > ### Trade-off Implementasi
> >
> > Pra-hitung seluruh round function (24KB/4KB) memberi performa tertinggi (table lookup + XOR); hanya S-box (256 byte) memberi kompromi; tanpa pra-hitung kode paling kecil tetapi paling lambat (mis. library AES JavaScript SJCL 6,4KB). Pada hardware, instruksi **AES-NI** (`aesenc`, `aesenclast`, `aeskeygenassist`) memberi percepatan sekitar 14x dibanding OpenSSL software.

> [!cornell] #### Summary
>
> **DES** (kunci 56-bit, blok 64-bit, 16 ronde Feistel) sudah dapat dibobol brute force sehingga diperkuat menjadi **3DES** (E-D-E dengan tiga kunci). **AES/Rijndael** (standar 2001) memakai blok 128-bit, kunci 128/192/256-bit, jaringan substitusi-permutasi dengan 10 ronde (AES-128: ByteSub, ShiftRows, MixColumns, AddRoundKey), dan sangat tahan brute force. Implementasi AES dapat dioptimalkan dengan tabel pra-hitung atau instruksi hardware AES-NI.

> [!ad-libitum]- Additional Information
>
> #### Ronde AES per Panjang Kunci
>
> AES-128 = 10 ronde, AES-192 = 12 ronde, AES-256 = 14 ronde. Detail matematis (GF(2^8)) dan DES/3DES dibahas lengkap di [[AES Rijndael]] dan [[DES dan Triple DES]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan satu ronde AES (ByteSub, ShiftRows, MixColumns) di Python dan cocokkan dengan vektor uji FIPS-197.
>
> #### Bacaan Lanjutan
> - FIPS 197 (AES), FIPS 46-3 (DES).
> - Daemen & Rijmen. *The Design of Rijndael*.
