---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] SHA-2 - SHA-256 dan SHA-512
>
> > ## Questions/Cues
> >
> > - Apa perbedaan SHA-256 dan SHA-512 dari SHA-1?
> > - Fungsi logika apa saja yang dipakai pada SHA-256 (Ch, Ma, Sigma)?
> > - Berapa putaran, buffer awal, dan ukuran blok tiap varian?
> > - Bagaimana menghitung hash di Python (teks, file, dan memeriksa integritas)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Beberapa Fungsi Hash (Slides 20-39)
>
> > ### SHA-256
> >
> > SHA-256 memakai kerangka Merkle-Damgård yang sama dengan SHA-1 ([[SHA-1 dan Konstruksi Merkle-Damgard]]): padding hingga $\equiv 448 \pmod{512}$, tambahan 64 bit panjang pesan, lalu pemrosesan blok 512 bit. Bedanya: **8 buffer** 32 bit (bukan 5) dan **64 putaran** (bukan 80), digest **256 bit**.
> >
> > **Buffer awal** ($a$ sampai $h$):
> >
> > | a | b | c | d |
> > |---|---|---|---|
> > | `6a09e667` | `bb67ae85` | `3c6ef372` | `a54ff53a` |
> > | **e** | **f** | **g** | **h** |
> > | `510e527f` | `9b05688c` | `1f83d9ab` | `5be0cd19` |
> >
> > Konstanta putaran $K[0..63]$ (64 buah) dipakai satu per putaran.
> >
> > **Fungsi logika per putaran** ($+$ = penjumlahan modulo $2^{32}$, $\ggg$ = rotasi kanan):
> >
> > $$\text{Ch}(E,F,G) = (E \wedge F) \oplus (\lnot E \wedge G)$$
> > $$\text{Ma}(A,B,C) = (A \wedge B) \oplus (A \wedge C) \oplus (B \wedge C)$$
> > $$\Sigma_0(A) = (A \ggg 2) \oplus (A \ggg 13) \oplus (A \ggg 22)$$
> > $$\Sigma_1(E) = (E \ggg 6) \oplus (E \ggg 11) \oplus (E \ggg 25)$$
> >
> > **Ch (choose)**: $E$ memilih bit dari $F$ bila 1, dari $G$ bila 0. **Ma (majority)**: keluar 1 bila minimal dua dari $A, B, C$ bernilai 1. Pada tiap putaran, dua temporary dihitung dari kedua fungsi itu (ditambah $h$, $W_t$, $K_t$), lalu keempat buffer digeser ($h \leftarrow g$, $g \leftarrow f$, dst.). Setelah 64 putaran hasil dijumlahkan ke buffer awal blok tersebut.
> >
> > ### SHA-512
> >
> > Struktur serupa dengan ukuran lebih besar: **blok 1024 bit**, **buffer 64 bit** (delapan buah, $a$ sampai $h$, nilai awal $H_0$ dari pecahan akar kuadrat bilangan prima pertama), **80 putaran**, digest **512 bit**; panjang pesan ditambahkan dalam 128 bit. **SHA-384** adalah SHA-512 dengan digest dipotong 384 bit dan nilai awal berbeda; **SHA-224** serupa untuk SHA-256.
> >
> > | Varian | Digest | Blok | Putaran | Kolisi |
> > |---|---|---|---|---|
> > | SHA-1 | 160 | 512 | 80 | ada cacat |
> > | SHA-224/256 | 224/256 | 512 | 64 | belum |
> > | SHA-384/512 | 384/512 | 1024 | 80 | belum |
> >
> > ### Hash dengan Python (`hashlib`)
> >
> > ```python
> > import hashlib
> > pesan = b'Yogyakarta kota kenangan'          # b: string menjadi bytes
> > print(hashlib.md5(pesan).hexdigest())        # df6ec566eb228237a59e012e343ecb13
> > print(hashlib.sha1(pesan).hexdigest())       # aa8adef498e0ffd2222f49a0021d645b9f8cfa4d
> > print(hashlib.sha256(pesan).hexdigest())     # c2494851d6345fac3810...2145707f
> > ```
> >
> > Tiga pola pemakaian di slide:
> >
> > 1. **Teks dari kode**: pakai literal `b'...'`.
> > 2. **Teks dari keyboard**: `message.encode('utf-8')` karena hash bekerja pada **bytes**, bukan string.
> > 3. **File**: `hash = hashlib.sha256()`, baca berkas mode `'rb'` per 1024 byte, `hash.update(chunk)` berulang, lalu `hash.hexdigest()`.
> >
> > **Memeriksa integritas**: hash `Yogyakarta kota kenangan` dan `Yogyakarta koti kenangan` dibandingkan dengan `==`; berbeda $\to$ "Pesan sudah diubah".
> >
> > ```mermaid
> > flowchart TD
> >     A["SHA-256: 8 buffer 32-bit<br/>64 putaran, blok 512"] --> B["Ch, Ma, Sigma0, Sigma1<br/>penjumlahan mod 2^32"]
> >     C["SHA-512: 8 buffer 64-bit<br/>80 putaran, blok 1024"] --> B
> > ```

> [!cornell] #### Summary
>
> **SHA-256** mempertahankan struktur Merkle-Damgård SHA-1 tetapi memakai **8 buffer 32-bit** (nilai awal `6a09e667`, `bb67ae85`, ...), **64 putaran**, blok **512 bit**, dan digest **256 bit** dengan fungsi **Ch**, **Ma**, $\Sigma_0$ (rotasi 2, 13, 22), $\Sigma_1$ (rotasi 6, 11, 25), serta penjumlahan modulo $2^{32}$. **SHA-512** memakai blok **1024 bit**, buffer **64 bit**, **80 putaran**, dan digest **512 bit**. Keduanya belum ditemukan kolisinya. Di Python, `hashlib` menghitung MD5/SHA-1/SHA-256/SHA-512 atas **bytes** (teks lewat `encode('utf-8')`, file dibaca per bagian), dan integritas diperiksa dengan membandingkan dua hexdigest.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Ada SHA-224 dan SHA-384?
>
> Keduanya adalah **pemotongan (truncation)** SHA-256 dan SHA-512 dengan nilai awal berbeda; dipakai bila butuh digest lebih pendek yang kompatibel dengan ukuran kunci algoritma lain (mis. SHA-224 untuk 3DES, SHA-384 untuk AES-192). Pemotongan yang cukup besar (mis. SHA-384, SHA-512/256) juga menyembunyikan sebagian state akhir sehingga **serangan length-extension** yang menimpa SHA-256/512 polos tidak lagi praktis.
>
> #### Length-Extension Attack
>
> Bila $H$ berkonstruksi Merkle-Damgård murni dan digest = seluruh state akhir, penyerang yang tahu $H(K \| M)$ dapat menghitung $H(K \| M \| \text{pad} \| M')$ **tanpa mengetahui $K$**. Inilah mengapa $H(K \| M)$ buruk sebagai MAC dan dipakai **HMAC** ([[Algoritma MAC dan HMAC]]). SHA-3 tidak terpengaruh ([[SHA-3 Keccak dan Konstruksi Spons]]).
>
> #### Mana yang Dipakai?
>
> SHA-256 adalah standar de facto (TLS, Bitcoin, sertifikat). SHA-512 sering **lebih cepat** pada CPU 64-bit karena memproses blok lebih besar dengan operasi 64-bit.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program yang menghitung SHA-256 sebuah berkas besar secara streaming dan bandingkan dengan `sha256sum`.
> 2. Hitung berapa banyak bit digest yang berubah (rata-rata mendekati 50%) ketika 1 karakter pesan diubah; uji pada MD5, SHA-1, SHA-256 (efek *avalanche*).
>
> #### Bacaan Lanjutan
>
> - FIPS 180-4, *Secure Hash Standard (SHS)*.
> - Ilustrasi putaran SHA-256: `infosecwriteups.com/breaking-down-sha-256-algorithm-2ce61d86f7a3`.
> - Dokumentasi Python `hashlib`.
