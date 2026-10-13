---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] ECC - ECDH, ElGamal, dan Encoding Pesan
>
> > ## Questions/Cues
> >
> > - Parameter apa yang harus disepakati dua pihak sebelum memakai ECC?
> > - Bagaimana Diffie-Hellman dipindahkan ke kurva eliptik (ECDH)?
> > - Bagaimana enkripsi dan dekripsi pada Elliptic Curve ElGamal?
> > - Mengapa pesan harus di-encode menjadi titik, dan bagaimana metode Koblitz bekerja?
> > - Apa keunggulan dan aplikasi ECC?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Elliptic Curve Cryptography Bagian 2 (Slides 37-52)
>
> > ### Kerangka ECC
> >
> > ECC adalah sistem **kunci-publik** sejenis RSA, Rabin, ElGamal, dan Diffie-Hellman: tiap pengguna punya kunci publik (enkripsi/verifikasi tanda tangan) dan kunci privat (dekripsi/pembuatan tanda tangan). Kurva eliptik dipakai sebagai **perluasan** sistem lain: **ECDH**, **EC ElGamal (ECEG)**, dan **ECDSA**. Operasi matematika dasarnya adalah **perkalian titik $kP$** (padanan perpangkatan pada RSA).
> >
> > **Parameter publik** yang disepakati:
> >
> > 1. Persamaan kurva $y^2 \equiv x^3 + ax + b \pmod p$ (nilai $a$, $b$, dan prima $p$),
> > 2. grup eliptik yang dihasilkan,
> > 3. **titik basis** $B(x_B, y_B)$ dari grup tersebut.
> >
> > **Pasangan kunci**: kunci privat = integer $x \in [1, p-1]$; kunci publik = titik $Q = xB$.
> >
> > ### Elliptic Curve Diffie-Hellman (ECDH)
> >
> > Padanan [[Hybrid Cryptography dan Diffie-Hellman]]: eksponensiasi $g^a$ diganti perkalian titik $aB$.
> >
> > | Langkah | Alice | Bob |
> > |---|---|---|
> > | 1 | privat $a$, publik $P_A = aB$ | privat $b$, publik $P_B = bB$ |
> > | 2 | kirim $P_A$, terima $P_B$ | kirim $P_B$, terima $P_A$ |
> > | 3 | $K = aP_B = a(bB)$ | $K = bP_A = b(aB)$ |
> >
> > Keduanya mendapat $K = abB$ karena $ab = ba$. Penyadap hanya tahu $B, aB, bB$; menghitung $abB$ darinya adalah **masalah Diffie-Hellman kurva eliptik**, yang bergantung pada ECDLP.
> >
> > **Contoh** (kurva $y^2 = x^3 + 2x + 1 \bmod 5$, $B = (0, 1)$): Alice memilih $a = 2$: $P_A = 2B = (1, 3)$. Bob memilih $b = 3$: $P_B = 3B = 2B + B = (3, 3)$. Alice: $K = 2P_B = (0, 4)$; Bob: $K = 3P_A = (0, 4)$. **Kunci rahasia bersama $(0, 4)$.**
> >
> > ### Elliptic Curve ElGamal (ECEG)
> >
> > Alice mengirim pesan $M$ ke Bob (privat $b$, publik $P_B = bB$):
> >
> > 1. Encode $M$ menjadi titik $P_M$ pada kurva.
> > 2. Pilih bilangan acak $k \in [1, p-1]$.
> > 3. **Cipherteks** adalah pasangan titik: $P_C = \big[\, kB,\; P_M + kP_B \,\big]$.
> >
> > **Dekripsi**: Bob menghitung $b(kB)$ lalu mengurangkannya dari titik kedua:
> >
> > $$(P_M + kP_B) - b(kB) = P_M + k(bB) - b(kB) = P_M$$
> >
> > lalu men-decode $P_M$ menjadi $M$.
> >
> > | | ElGamal biasa ([[Algoritma ElGamal]]) | EC ElGamal |
> > |---|---|---|
> > | Cipherteks | $(g^k \bmod p,\; m \cdot y_B^k \bmod p)$ | $(kB,\; P_M + kP_B)$ |
> > | Menutupi pesan | **dikalikan** $y_B^k$ | **ditambahkan** $kP_B$ |
> > | Dekripsi | bagi dengan $(g^k)^b$ | **kurangi** dengan $b(kB)$ |
> >
> > ### Encoding Pesan Menjadi Titik
> >
> > Pesan harus diubah menjadi titik kurva sebelum dienkripsi.
> >
> > - **Metode sederhana**: petakan tiap karakter ASCII ke satu titik. Untuk 256 karakter diperlukan kurva dengan minimal 256 titik. Mis. `ENCRYPT` = 69 78 67 82 89 80 84, tiap nilai ke satu titik. Kurang aman karena pemetaannya tetap (mirip substitusi monoalfabetik).
> > - **Metode Koblitz**: pilih kurva dengan $N$ titik; kodekan karakter menjadi $m$ (angka 0-9, huruf A-Z = 10-35); pilih parameter basis $k$ (disepakati); untuk tiap $m$ coba $x = mk + 1, mk + 2, \dots$ sampai $x^3 + ax + b$ merupakan kuadrat residu sehingga $y$ ada. **Decoding**: $m = \lfloor (x - 1)/k \rfloor$.
> >
> > **Contoh**: $y^2 \equiv x^3 - x + 188 \pmod{751}$ ($N = 727$ titik), huruf `B` $\to m = 11$, $k = 20$. $x = 221, 222, 223$ tidak punya $y$; $x = 224$ memberi $y = 248$ (cek: $224^3 - 224 + 188 \equiv 673 \equiv 248^2 \pmod{751}$). Jadi `B` $\to (224, 248)$. Decode: $\lfloor 223/20 \rfloor = 11$ $\to$ `B`.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Alice
> >     participant B as Bob
> >     Note over A,B: sepakat kurva dan titik basis B
> >     B->>A: P_B = bB (kunci publik)
> >     Note over A: encode M menjadi P_M, pilih acak k
> >     A->>B: P_C = [kB, P_M + kP_B]
> >     Note over B: P_M = (P_M + kP_B) - b(kB)
> >     Note over B: decode P_M menjadi M
> > ```
> >
> > ### Keamanan, Aplikasi, dan Keuntungan
> >
> > Untuk melindungi kunci **AES-128**, RSA memerlukan **3072 bit** sedangkan ECC cukup **256 bit**. Meningkatkan keamanan RSA berarti memperbesar kunci secara drastis, sedangkan pada ECC pertambahan ukuran kunci tidak signifikan. **Aplikasi**: piranti nirkabel, smart card, web server yang menangani banyak sesi enkripsi, dan perangkat dengan daya/penyimpanan/komputasi terbatas. **Keuntungan**: selain confidentiality, integrity, authentication, dan non-repudiation seperti sistem lain, ECC memberi **kunci lebih pendek**, proses enkripsi/dekripsi/verifikasi tanda tangan **lebih cepat**, serta **hemat storage dan bandwidth**.

> [!cornell] #### Summary
>
> ECC memakai parameter publik berupa **kurva, prima $p$, dan titik basis $B$**; kunci privat adalah integer $x$ dan kunci publik titik $Q = xB$. **ECDH**: Alice dan Bob bertukar $aB$ dan $bB$ lalu keduanya menghitung **$K = abB$** (contoh: $(0, 4)$). **EC ElGamal**: pesan di-encode menjadi titik $P_M$, cipherteks adalah **$[kB,\; P_M + kP_B]$**, dekripsi dengan mengurangkan $b(kB)$. Pesan dikonversi menjadi titik lewat pemetaan sederhana (kurang aman) atau **metode Koblitz** ($x = mk + i$, decode $m = \lfloor (x-1)/k \rfloor$). ECC memberi keamanan setara RSA dengan kunci jauh lebih pendek (256 vs 3072 bit untuk AES-128), cocok untuk perangkat terbatas.

> [!ad-libitum]- Additional Information
>
> #### ECDSA: Tanda Tangan Digital
>
> Slide menyebut ECDSA tetapi tidak merincinya. Skema: privat $d$, publik $Q = dG$, titik basis berorde $n$. **Tanda tangan** pesan dengan hash $h$: pilih acak $k$, $r = x(kG) \bmod n$, $s = k^{-1}(h + dr) \bmod n$; kirim $(r, s)$. **Verifikasi**: $w = s^{-1}$, $u_1 = hw$, $u_2 = rw$, terima jika $x(u_1 G + u_2 Q) \equiv r \pmod n$. $k$ **tidak boleh bocor atau dipakai ulang**: kasus **Sony PS3 (2010)** dan beberapa dompet Bitcoin kehilangan kunci privat karena $k$ berulang.
>
> #### Praktik Modern
>
> - **ECDHE** (ephemeral) pada TLS 1.3 memberi *forward secrecy*, umumnya dengan **X25519**.
> - **Ed25519** untuk tanda tangan (SSH, Signal). **ECIES** adalah skema enkripsi hibrida standar untuk kurva eliptik, menggantikan pendekatan "encode pesan menjadi titik" karena tidak ada kebutuhan encoding: titik hasil ECDH hanya diturunkan menjadi kunci simetrik.
> - Ancaman: **algoritma Shor** pada komputer kuantum memecahkan ECDLP; mitigasinya kriptografi pasca-kuantum (ML-KEM, ML-DSA) atau skema hibrida.
>
> #### Catatan Keamanan
>
> Validasi titik yang diterima (apakah di kurva dan berorde benar) wajib untuk mencegah **invalid-curve attack**. Kurva yang memiliki orde berfaktor kecil juga rentan **small-subgroup attack**; karena itu dipakai kofaktor dan pemeriksaan titik.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan ECDH dan EC ElGamal (dengan encoding Koblitz) pada kurva $y^2 \equiv x^3 - x + 188 \pmod{751}$; enkripsi kata `HELLO` dan dekripsi kembali.
> 2. Bandingkan waktu RSA-3072 dan ECDH P-256 memakai `openssl speed rsa3072 ecdhp256`.
>
> #### Bacaan Lanjutan
>
> - Stallings, *Cryptography and Network Security*, Bab "Elliptic Curve Cryptography".
> - RFC 7748 (X25519/X448) dan RFC 6979 (ECDSA deterministik).
> - Bernstein & Lange, *SafeCurves*: `safecurves.cr.yp.to`.
