---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Kriptografi Modern dan Operasi XOR
>
> > ## Questions/Cues
> >
> > - Apa yang membedakan kriptografi modern dari klasik?
> > - Bagaimana pesan direpresentasikan sebagai bit, byte, dan heksadesimal?
> > - Apa sifat-sifat operasi XOR dan mengapa begitu dominan?
> > - Bagaimana cipher XOR sederhana bekerja dan mengapa ia tidak aman?
> > - Apa dua kategori cipher berbasis bit?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Modern dan Stream Cipher (Slides 2-23)
>
> > ### Era Kriptografi Modern
> >
> > **Kriptografi modern** adalah era setelah ditemukannya **komputer digital** (awal 1970-an). Komputer merepresentasikan data dalam **biner**, sehingga algoritma modern beroperasi dalam **mode bit** (klasik: mode karakter): kunci, plainteks, dan cipherteks diproses sebagai rangkaian bit, dan operasi **XOR** paling banyak dipakai.
> >
> > Meski modern, algoritmanya tetap memakai dua teknik dasar klasik, yaitu **substitusi** dan **transposisi (permutasi)** ([[Cipher Transposisi - Columnar dan Rail Fence]]), tetapi dibuat jauh lebih kompleks agar sulit dikriptanalisis. Ditambah teknik lain: **rotasi, kompresi, ekspansi, penjumlahan modulo**, dan lain-lain.
> >
> > Era ini juga melahirkan konsep baru: **kriptografi kunci-publik, fungsi hash, protokol kriptografi, tanda tangan digital, pembangkit bilangan acak, skema pembagian kunci**. Peta besarnya:
> >
> > ```mermaid
> > flowchart TD
> >     KL["Cryptology"] --> KG["Cryptography"]
> >     KL --> KA["Cryptanalysis"]
> >     KG --> SY["Symmetric ciphers"]
> >     KG --> AS["Asymmetric ciphers"]
> >     KG --> PR["Protocols"]
> >     KG --> HF["Hash functions"]
> >     SY --> BC["Block ciphers"]
> >     SY --> SC["Stream ciphers"]
> > ```
> >
> > ### Bit, Byte, dan Heksadesimal
> >
> > Pesan dienkripsi **bit-per-bit**, **byte-per-byte** (1 byte = 8 bit), atau dalam kelompok bit. Sebagian algoritma mengkodekan pesan dalam **heksadesimal** (1 digit hex = 4 bit; `0000 = 0` ... `1010 = A` ... `1111 = F`).
> >
> > - Pesan `1001110101101010` dibagi blok 4-bit: `1001 1101 0110 1010` = **`9D6A`**.
> > - Teks ke biner (ASCII): `Halo` → `01001000 01100001 01101100 01101111`.
> >
> > ### Operasi XOR
> >
> > Notasi $\oplus$. Tabel kebenaran: $0 \oplus 0 = 0,\ 0 \oplus 1 = 1,\ 1 \oplus 0 = 1,\ 1 \oplus 1 = 0$ (bernilai 1 bila kedua bit **berbeda**). Sifat:
> >
> > 1. $a \oplus a = 0$
> > 2. $a \oplus b = b \oplus a$ (komutatif)
> > 3. $a \oplus (b \oplus c) = (a \oplus b) \oplus c$ (asosiatif)
> >
> > Dari sifat 1: $(P \oplus K) \oplus K = P$, sehingga **XOR adalah inversnya sendiri**. Itulah sebabnya enkripsi dan dekripsi memakai operasi yang sama. Untuk dua rangkaian bit, XOR dilakukan **bit demi bit**: $10011 \oplus 11001 = 01010$.
> >
> > ### Cipher XOR Sederhana
> >
> > Sama seperti Vigenère ([[Vigenère Cipher dan Kriptanalisis Kasiski]]) tetapi dalam mode bit:
> >
> > $$C = P \oplus K \qquad P = C \oplus K$$
> >
> > Contoh: plainteks `01100101` (`e`) $\oplus$ kunci `00110101` (`5`) = cipherteks `01010000` (`P`); XOR lagi dengan kunci menghasilkan `01100101` (`e`) kembali.
> >
> > Bila kunci lebih pendek dari pesan, bit kunci **diulang periodik** (seperti Vigenère). Contoh: plainteks `10010010101110101010001110001` dengan kunci `11011011011011011011011011011` menghasilkan `01001001110101110001010101010`. Cipher ini bisa dipakai untuk file sembarang (PDF, gambar) byte demi byte.
> >
> > **Tidak aman**: karena kuncinya berulang, ia mudah dikriptanalisis dengan metode yang sama seperti **Kasiski**. Kunci sepanjang pesan yang acak sejati, sekali pakai, menjadi one-time pad ([[One-Time Pad dan Perfect Secrecy]]).
> >
> > ### Dua Kategori Cipher Berbasis Bit
> >
> > | | Cipher alir (stream) | Cipher blok (block) |
> > |---|---|---|
> > | Unit | bit atau byte satu per satu | blok bit (mis. 128 bit = 16 byte) |
> > | Operasi | hanya **XOR** dengan keystream | komputasi kompleks, **berulang dalam putaran** |
> > | Bahasan | [[Stream Cipher dan LFSR]] | [[Konsep Cipher Blok dan Mode Operasi]] |

> [!cornell] #### Summary
>
> **Kriptografi modern** (sejak 1970-an) beroperasi pada **bit/byte**, memakai substitusi dan transposisi klasik yang dibuat lebih kompleks, ditambah rotasi, kompresi, ekspansi, dan penjumlahan modulo. Data direpresentasikan sebagai bit, byte (8 bit), dan **hex** (4 bit per digit). **XOR** ($\oplus$) adalah operasi utama karena $a \oplus a = 0$, komutatif, asosiatif, dan **invers dirinya sendiri**: $C = P \oplus K$, $P = C \oplus K$. **Cipher XOR sederhana** dengan kunci berulang adalah Vigenère versi bit dan mudah dipecahkan ala Kasiski; kunci acak sejati sepanjang pesan adalah OTP. Cipher berbasis bit dibagi menjadi **stream cipher** (bit/byte satu per satu, hanya XOR dengan keystream) dan **block cipher** (blok bit, putaran berulang). Berlanjut ke [[Stream Cipher dan LFSR]].

> [!ad-libitum]- Additional Information
>
> #### Mengapa XOR?
>
> XOR setara **penjumlahan modulo 2** pada $GF(2)$: linier, tanpa carry, berlatensi minimal di perangkat keras, dan bijektif untuk kunci tetap sehingga cipherteks seragam bila kunci seragam (dasar bukti OTP). Kelemahan: **kelinieran** — XOR saja tidak memberi confusion; karena itu cipher modern menyisipkan komponen non-linier (S-box, AND, penjumlahan modulo $2^{32}$).
>
> #### Sifat Malleability
>
> Pada $C = P \oplus K$, penyerang yang tahu posisi plainteks dapat membalik bit tertentu tanpa kunci: $C' = C \oplus \Delta$ menghasilkan $P' = P \oplus \Delta$. Ini **bit-flipping attack**; karena itu enkripsi XOR/stream wajib disertai **integrity** (MAC atau AEAD).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis enkripsi file dengan cipher XOR berkunci berulang (per byte), lalu pecahkan dengan Kasiski/Index of Coincidence dari [[Cipher Abjad-Tunggal dan Analisis Frekuensi]].
> 2. Demonstrasikan bit-flipping: ubah `TRANSFER 100` menjadi `TRANSFER 900` dalam cipherteks XOR tanpa mengetahui kunci.
>
> #### Bacaan Lanjutan
>
> - Katz & Lindell, *Introduction to Modern Cryptography*, Bab 2-3.
> - Konversi teks-biner-hex: `rapidtables.com/convert/number/string-to-binary.html`.
