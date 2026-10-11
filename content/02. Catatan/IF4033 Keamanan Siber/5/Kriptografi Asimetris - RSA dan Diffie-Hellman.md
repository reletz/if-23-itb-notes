---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Kriptografi Asimetris - RSA dan Diffie-Hellman
>
> > ## Questions/Cues
> >
> > - Bagaimana prinsip kriptografi kunci publik?
> > - Bagaimana RSA membangkitkan kunci, mengenkripsi, dan mendekripsi?
> > - Mengapa RSA bekerja dan mengapa aman?
> > - Mengapa dipakai session key?
> > - Bagaimana Diffie-Hellman menyepakati kunci bersama?
> > - Apa kelemahan RSA?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 36-57)
>
> > ### Prinsip Kunci Publik
> >
> > Algoritma asimetris: **Diffie-Hellman, RSA, ElGamal, ECC**. Bob memiliki kunci publik K⁺ dan privat K⁻ sehingga `K⁻(K⁺(m)) = m`, dan **mustahil** menghitung K⁻ dari K⁺. Motivasinya mengatasi **key proliferation**: pada simetris, tiap pasangan butuh kunci tersendiri. Kegunaan: enkripsi/dekripsi, **key exchange**, *hash function*, **digital signature**, protokol (SSL), dan sertifikat.
> >
> > ### RSA: Pembangkitan Kunci
> >
> > 1. Pilih dua bilangan prima besar **p, q** (mis. 1024 bit).
> > 2. Hitung **n = pq**, **z = (p-1)(q-1)**.
> > 3. Pilih **e < n** yang relatif prima terhadap z.
> > 4. Pilih **d** sehingga **ed mod z = 1**.
> > 5. Kunci publik **(n, e)**, kunci privat **(n, d)**.
> >
> > ### RSA: Enkripsi dan Dekripsi
> >
> > - Enkripsi: **c = mᵉ mod n**
> > - Dekripsi: **m = cᵈ mod n**
> >
> > **Contoh**: p=5, q=7 → n=35, z=24, e=5, d=29. Untuk m=12: c = 12⁵ mod 35 = 248832 mod 35 = **17**; dekripsi m = 17²⁹ mod 35 = **12**.
> >
> > **Mengapa bekerja**: cᵈ mod n = (mᵉ mod n)ᵈ mod n = mᵉᵈ mod n = m^(ed mod z) mod n = m¹ mod n = m. Sifat penting: urutan publik-lalu-privat dan privat-lalu-publik **memberi hasil sama**, dasar tanda tangan digital.
> >
> > **Mengapa aman**: mengetahui (n, e), mencari d berarti harus **memfaktorkan n** menjadi p dan q, yang sulit untuk bilangan besar.
> >
> > ### Session Key
> >
> > Eksponensiasi mahal secara komputasi (DES setidaknya 100x lebih cepat dari RSA). Karena itu Alice dan Bob memakai RSA untuk **menukar kunci simetris Ks**, lalu memakai simetris untuk data.
> >
> > ### Diffie-Hellman Key Agreement
> >
> > Memungkinkan dua pihak **menyepakati kunci bersama** (bukan enkripsi). p (prima besar) dan g publik; Alice memilih Sₐ, Bob memilih S_b (privat); Tₐ = g^Sₐ mod p, T_b = g^S_b mod p dipertukarkan terbuka; rahasia bersama S = (T_b)^Sₐ mod p = g^(SₐS_b) mod p = (Tₐ)^S_b mod p.
> >
> > **Contoh**: p=11, g=5, Sₐ=3, S_b=4 → Tₐ=4, T_b=9 → S = 9³ mod 11 = 4⁴ mod 11 = **3**.
> >
> > Kelemahan: **man-in-the-middle** karena Alice tidak yakin Tb benar dari Bob; perlu autentikasi (sertifikat/tanda tangan).
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Alice
> >     participant B as Bob
> >     A->>B: Ta = g^Sa mod p
> >     B->>A: Tb = g^Sb mod p
> >     Note over A,B: S = g^(Sa·Sb) mod p
> > ```
> >
> > ### Apa yang Salah dengan RSA?
> >
> > Keamanannya berbasis **keyakinan** bahwa faktorisasi sulit (belum terbukti), bilangan prima makin besar, riset faktorisasi terus berjalan, dan **komputasi kuantum** dapat membuat RSA usang.

> [!cornell] #### Summary
>
> Kriptografi asimetris memakai pasangan kunci publik/privat dengan sifat `K⁻(K⁺(m)) = m`. **RSA** membangkitkan kunci dari prima p, q (n = pq, ed ≡ 1 mod z), mengenkripsi dengan c = mᵉ mod n dan mendekripsi dengan m = cᵈ mod n; keamanannya bertumpu pada sulitnya faktorisasi. Karena lambat, RSA dipakai untuk menukar **session key** simetris. **Diffie-Hellman** menyepakati rahasia bersama g^(SₐS_b) mod p, tetapi rentan MitM tanpa autentikasi. RSA terancam oleh komputasi kuantum.

> [!ad-libitum]- Additional Information
>
> #### Padding dan Ukuran Kunci
>
> RSA "textbook" tidak aman; praktiknya memakai **OAEP** (enkripsi) dan **PSS** (tanda tangan), dengan kunci minimal 2048 bit. Untuk pertukaran kunci modern dipakai **ECDHE** yang memberi *forward secrecy*. Ancaman kuantum (algoritma Shor) mendorong **post-quantum cryptography** seperti ML-KEM (Kyber).
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan RSA kecil dari nol (generate prima, enkripsi/dekripsi) lalu patahkan kunci berukuran 32-bit dengan faktorisasi brute force.
>
> #### Bacaan Lanjutan
> - Rivest, Shamir, Adleman (1978).
> - Diffie & Hellman (1976). *New Directions in Cryptography*.
