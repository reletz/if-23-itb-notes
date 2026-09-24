---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Stream Cipher dan LFSR
>
> > ## Questions/Cues
> >
> > - Bagaimana stream cipher mengenkripsi, dan apa itu keystream?
> > - Mengapa keystream berupa pseudo-random, bukan true random?
> > - Apa peran seed sebagai kunci eksternal?
> > - Apa karakteristik penjalaran kesalahan stream cipher?
> > - Bagaimana LFSR bekerja dan berapa periodenya?
> > - Di mana stream cipher dipakai?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Modern dan Stream Cipher (Slides 24-39)
>
> > ### Cipher Alir (Stream Cipher)
> >
> > Stream cipher mengenkripsi dengan meng-XOR-kan **1 bit plainteks dengan 1 bit kunci**, atau 1 byte dengan 1 byte kunci, atau $n$ bit dengan $n$ bit kunci, setiap kali enkripsi. Dekripsi identik (XOR cipherteks dengan kunci).
> >
> > Bit-bit kunci alir disebut **keystream**, dibangkitkan oleh **keystream generator** dari sebuah umpan (**seed**) $U$:
> >
> > $$c_i = p_i \oplus k_i \qquad p_i = c_i \oplus k_i$$
> >
> > ```mermaid
> > flowchart LR
> >     U1["Seed U"] --> G1["Keystream<br/>generator"] --> K1["k_i"]
> >     P["p_i (plainteks)"] --> X1(("XOR"))
> >     K1 --> X1
> >     X1 --> C["c_i (cipherteks)"]
> >     C --> X2(("XOR"))
> >     U2["Seed U (sama)"] --> G2["Keystream<br/>generator"] --> K2["k_i"]
> >     K2 --> X2
> >     X2 --> P2["p_i"]
> > ```
> >
> > Enkripsi/dekripsi sederhana dan **cepat**. Generator diimplementasikan sebagai prosedur yang **sama** di pengirim dan penerima.
> >
> > ### Keystream: Pseudo-Random
> >
> > Bit keystream bersifat acak tetapi **bukan true random, melainkan pseudo-random**: dapat dibangkitkan ulang di kedua sisi asalkan **seed sama**. Bit pseudo-random punya **periode** (barisan dapat terulang setelah beberapa iterasi). Seed $U$ dijaga rahasia dan dapat dipandang sebagai **kunci eksternal**. Ini beda dari OTP yang memakai kunci acak sejati ([[One-Time Pad dan Perfect Secrecy]]): stream cipher meniru OTP dengan seed pendek, sehingga keamanannya komputasional, bukan sempurna.
> >
> > Contoh: $U = 1111$, aturan "XOR bit ke-1 dengan bit ke-4 dari empat bit sebelumnya" → `111101011001000` (berulang tiap 15 bit). Untuk seed $n$ bit, keystream tidak berulang sampai $2^n - 1$ bit.
> >
> > Contoh enkripsi: $P = 0101\ 0111\ 0001\ 1001\ 0110\ 0100$ (hex `571964`), $K = 111101011001000111101011$ → $C = 1010\ 0010\ 1000\ 1000\ 1000\ 1111$ (hex **`A2888F`**). Dekripsi $C \oplus K$ mengembalikan `571964`.
> >
> > ### Lokalisasi Kesalahan
> >
> > **Karakteristik**: kesalahan 1 bit pada cipherteks hanya menghasilkan **kesalahan 1 bit** pada plainteks. Contoh: `A2888F` dengan bit ke-5 berubah (`1010 1010 ...`) terdekripsi menjadi **`5F1964`** (seharusnya `571964`): hanya satu bit berbeda. Inilah yang membuat stream cipher tahan derau saluran.
> >
> > ### Feedback Shift Register (FSR) dan LFSR
> >
> > **FSR** adalah contoh keystream generator, umumnya berupa **perangkat keras**. Terdiri dari **register geser** $n$ bit dan **fungsi umpan balik** $f$:
> >
> > $$b_n = f(b_n, b_{n-1}, \dots, b_2, b_1)$$
> >
> > **LFSR** (*Linear Feedback Shift Register*) memakai fungsi **XOR**: $b_n = b_n \oplus b_{n-1} \oplus \dots \oplus b_1$ (untuk bit yang dipilih, disebut *taps*). Setiap pembangkitan bit: seluruh bit digeser satu ke kanan, $b_1$ **terlempar keluar** menjadi **bit keluaran (keystream)**, lalu $b_n$ baru dihitung dari fungsi umpan balik.
> >
> > **Contoh LFSR 4-bit**, $b_4 = b_1 \oplus b_4$, seed $U = 1111$:
> >
> > | i | Isi register ($b_4 b_3 b_2 b_1$) | Bit keluar ($b_1$) |
> > |---|---|---|
> > | 0 | 1111 | 1 |
> > | 1 | 0111 | 1 |
> > | 2 | 1011 | 1 |
> > | 3 | 0101 | 1 |
> > | 4 | 1010 | 0 |
> > | 5 | 1101 | 1 |
> > | 6 | 0110 | 0 |
> > | 7 | 0011 | 1 |
> > | 8 | 1001 | 1 |
> > | 9 | 0100 | 0 |
> > | 10 | 0010 | 0 |
> > | 11 | 0001 | 1 |
> > | 12 | 1000 | 0 |
> > | 13 | 1100 | 0 |
> > | 14 | 1110 | 0 |
> >
> > Keluaran: `1 1 1 1 0 1 0 1 1 0 0 1 0 0 0 ...` dengan **periode $2^n - 1 = 15$** (semua status non-nol terkunjungi).
> >
> > ### Aplikasi Stream Cipher
> >
> > Cocok untuk **aliran data kontinu**: (1) enkripsi saluran antar dua komputer, (2) **suara pada jaringan GSM**. Alasan: kesalahan bit hanya berdampak satu bit (lokal), dan komputasinya **cepat** untuk pemrosesan *real-time*.
> >
> > Contoh stream cipher (tahun): **RC4** (1987), **A5** (1989), **SEAL** (1997), **Salsa20** (2004), **Trivium** (2004), **Rabbit** (2003), **Grain** (2004), **MICKEY** (2004), **SNOW** (2003), **Turing**, **SOBER-128**, **WAKE**, **CryptMT**, **VEST**, **ISAAC**, **FISH** (1993), dan lain-lain.

> [!cornell] #### Summary
>
> **Stream cipher** meng-XOR plainteks dengan **keystream** dari **keystream generator** yang diberi **seed** $U$ rahasia: $c_i = p_i \oplus k_i$, $p_i = c_i \oplus k_i$. Keystream **pseudo-random** (dapat direproduksi dari seed yang sama, punya periode; seed $n$ bit menjamin periode hingga $2^n - 1$), berbeda dari OTP yang acak sejati. Sifat khasnya: **kesalahan 1 bit cipherteks = kesalahan 1 bit plainteks** (lokal). Generator klasiknya **FSR/LFSR**: register geser + umpan balik XOR; LFSR 4-bit dari seed `1111` menghasilkan `111101011001000...` berperiode **15**. Cocok untuk data kontinu dan *real-time* (mis. suara GSM). Contoh nyata dibahas di [[RC4 dan A5]] dan [[Trivium, Salsa20, dan ChaCha20]].

> [!ad-libitum]- Additional Information
>
> #### Kelemahan LFSR Murni
>
> LFSR **linier**, sehingga keystream-nya dapat direkonstruksi dari hanya $2n$ bit keluaran dengan **algoritma Berlekamp-Massey**. Karena itu LFSR tidak pernah dipakai sendirian: dikombinasikan lewat **fungsi non-linier** (mis. A5/1 dengan clock majority, Trivium dengan NLFSR dan gerbang AND) atau memakai konstruksi ARX seperti Salsa20.
>
> #### Aturan Emas Stream Cipher
>
> **Jangan pernah memakai ulang (key, nonce)**. Dua cipherteks dengan keystream sama berarti $C_1 \oplus C_2 = P_1 \oplus P_2$ (two-time pad, lihat [[One-Time Pad dan Perfect Secrecy]]). Stream cipher modern memakai **nonce/IV** unik per pesan agar keystream berbeda walau kunci sama.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan LFSR 4-bit dan 8-bit dengan polinom primitif; verifikasi periode $2^n - 1$, lalu tulis serangan Berlekamp-Massey yang memulihkan taps dari keluaran.
> 2. Buat stream cipher mini (LFSR + XOR) dan uji ketahanan lokalisasi error: flip satu bit cipherteks dan hitung bit plainteks yang berubah.
>
> #### Bacaan Lanjutan
>
> - Menezes et al., *Handbook of Applied Cryptography*, Bab 6 (Stream Ciphers).
> - eSTREAM portfolio: `www.ecrypt.eu.org/stream`.
