---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Elliptic Curve Cryptography dan Perbandingan Ukuran Kunci
>
> > ## Questions/Cues
> >
> > - Mengapa ECC dibutuhkan padahal sudah ada RSA?
> > - Bagaimana ukuran kunci ECC dibandingkan RSA dan simetris?
> > - Bagaimana operasi dasar ECC bekerja (point addition dan multiplication)?
> > - Apa itu ECDLP dan mengapa menjadi dasar keamanan?
> > - Apa kelebihan dan kekurangan ECC?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 57-65)
>
> > ### Mengapa ECC?
> >
> > ECC menawarkan **kunci lebih pendek**, **kompleksitas komputasi lebih rendah**, **kebutuhan daya rendah**, dan keamanan per-bit yang lebih baik, ideal untuk perangkat nirkabel dan IoT.
> >
> > ### Perbandingan Ukuran Kunci untuk Keamanan Setara
> >
> > | Simetris (bit) | RSA/DH (modulus bit) | ECC (bit) |
> > |---|---|---|
> > | 56 | 512 | 112 |
> > | 80 | 1024 | 160 |
> > | 112 | 2048 | 224 |
> > | 128 | 3072 | 256 |
> > | 192 | 7680 | 384 |
> > | 256 | 15360 | 512 |
> >
> > ### Operasi Dasar
> >
> > - **Point addition**: menjumlahkan dua titik pada kurva menghasilkan titik ketiga di kurva (refleksi titik potong garis terhadap sumbu X).
> > - **Point doubling**: garis singgung di P memotong kurva; refleksinya adalah 2P. P + 2P = 3P.
> > - **Point multiplication**: Q = kP adalah penjumlahan P sebanyak k kali, dengan **P** titik dasar (domain parameter), **k** kunci privat, dan **Q** kunci publik.
> >
> > ### Keamanan: ECDLP
> >
> > Mencari k dari Q dan P adalah **Elliptic Curve Discrete Logarithm Problem**. Serangan yang dikenal (brute force, **Pollard's Rho** dengan kompleksitas O(√n), Pohlig, Baby-step Giant-step) memerlukan waktu eksponensial.
> >
> > ### Kelebihan dan Kekurangan
> >
> > | Kelebihan | Kekurangan |
> > |---|---|
> > | Kunci pendek, keamanan setara RSA | Bidang relatif baru, mungkin masih ada kerentanan tak diketahui |
> > | Keamanan per-bit lebih tinggi | Penggunaan belum seluas RSA |
> > | Hemat daya, cocok untuk perangkat kecil | Tidak sempurna: kunci 112-bit pernah dipecahkan publik |

> [!cornell] #### Summary
>
> **ECC** memberi keamanan setara RSA dengan kunci jauh lebih pendek (ECC 256-bit ≈ RSA 3072-bit ≈ AES-128). Operasinya berupa **point addition** dan **point multiplication** (Q = kP), dengan keamanan pada sulitnya **ECDLP**. Kelebihannya hemat daya dan cepat; kekurangannya bidang yang relatif baru dan penerapan belum seluas RSA.

> [!ad-libitum]- Additional Information
>
> #### Kurva dan Skema Praktis
>
> Kurva populer: **P-256 (NIST)**, **secp256k1** (Bitcoin), dan **Curve25519** (X25519 untuk key exchange, Ed25519 untuk tanda tangan). Skema turunan: **ECDH**, **ECDSA**, **EdDSA**. ECC juga rentan terhadap komputer kuantum (algoritma Shor).
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan point addition dan scalar multiplication pada kurva kecil di atas bilangan prima lalu lakukan ECDH sederhana.
>
> #### Bacaan Lanjutan
> - Hankerson, Menezes, Vanstone. *Guide to Elliptic Curve Cryptography*.
> - RFC 7748 (Curve25519/448).
