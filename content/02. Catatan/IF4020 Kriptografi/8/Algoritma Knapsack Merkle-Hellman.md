---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Algoritma Knapsack Merkle-Hellman
>
> > ## Questions/Cues
> >
> > - Apa itu knapsack problem dan mengapa dipakai untuk kriptografi?
> > - Mengapa knapsack biasa hanya bisa dienkripsi tetapi tidak didekripsi?
> > - Apa itu barisan superincreasing dan bagaimana menyelesaikannya dalam $O(n)$?
> > - Bagaimana Merkle-Hellman membangun kunci publik dari kunci privat?
> > - Bagaimana enkripsi dan dekripsinya?
> > - Bagaimana Shamir memecahkannya?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Algoritma Kriptografi Knapsack (Slides 2-24)
>
> > ### Pendahuluan
> >
> > Salah satu algoritma kunci-publik **awal**, ditemukan **Ralph Merkle dan Martin Hellman (1978)**; disebut juga **algoritma Merkle-Hellman**. Berbasis **Knapsack Problem**: diberi bobot knapsack $M$ dan $n$ objek berbobot $w_1, \dots, w_n$, tentukan $b_i \in \{0, 1\}$ dengan
> >
> > $$M = b_1 w_1 + b_2 w_2 + \dots + b_n w_n \tag{1}$$
> >
> > $b_i = 1$ berarti objek $i$ dimasukkan. Knapsack termasuk **NP-complete**: tidak diketahui penyelesaian berorde polinomial. **Ide dasar**: pesan dikodekan sebagai rangkaian solusi knapsack; bobot $w_i$ adalah **kunci**, bit-bit plainteks adalah $b_i$.
> >
> > ### Knapsack Biasa
> >
> > $n = 6$, $w = \{1, 5, 6, 11, 14, 20\}$, plainteks `111001 010110 000000 011000` (blok 6 bit):
> >
> > | Blok | Kriptogram |
> > |---|---|
> > | 111001 | $1 + 5 + 6 + 20 = 32$ |
> > | 010110 | $5 + 11 + 14 = 30$ |
> > | 000000 | $0$ |
> > | 011000 | $5 + 6 = 11$ |
> >
> > Cipherteks: `32 30 0 11`. Namun algoritma sederhana ini **hanya bisa dipakai untuk enkripsi, bukan dekripsi**: menemukan $b_i$ dari kriptogram 32 (persamaan (1)) tak dapat dipecahkan dalam waktu polinomial bila barisan bobot tidak berurutan menaik. Justru ini **kekuatannya**.
> >
> > ### Superincreasing Knapsack
> >
> > **Barisan superincreasing**: tiap nilai **lebih besar daripada jumlah semua nilai sebelumnya**. Contoh: $\{1, 3, 6, 13, 27, 52\}$ superincreasing; $\{1, 3, 4, 9, 15, 25\}$ bukan ($4 = 1 + 3$). Knapsack superincreasing dapat dipecahkan dalam **$O(n)$** (polinomial) sehingga mudah dan lemah bila dipakai langsung.
> >
> > **Algoritma penyelesaian (dekripsi)**: dari bobot terbesar ke terkecil, bila bobot $\le$ sisa $M$, masukkan dan kurangkan; jika tidak, lewati. Bila sisa akhir $= 0$, solusi ada.
> >
> > **Contoh**: $\{2, 3, 6, 13, 27, 52\}$, $M = 70$:
> >
> > | Bobot | $\le$ sisa? | $b_i$ | Sisa |
> > |---|---|---|---|
> > | 52 | 52 $\le$ 70 | $b_6 = 1$ | 18 |
> > | 27 | 27 > 18 | $b_5 = 0$ | 18 |
> > | 13 | 13 $\le$ 18 | $b_4 = 1$ | 5 |
> > | 6 | 6 > 5 | $b_3 = 0$ | 5 |
> > | 3 | 3 $\le$ 5 | $b_2 = 1$ | 2 |
> > | 2 | 2 $\le$ 2 | $b_1 = 1$ | 0 |
> >
> > Sisa 0, jadi plainteks `110101` ($70 = 2 + 3 + 13 + 52$). (Slide menulis "$b_1 = 0$" pada langkah terakhir, tetapi 2 dimasukkan sehingga $b_1 = 1$.)
> >
> > ### Knapsack Kunci-Publik (Merkle-Hellman)
> >
> > Superincreasing dijadikan **non-superincreasing** (sulit, waktu eksponensial): **kunci publik = barisan non-superincreasing**, **kunci privat = barisan superincreasing asal**.
> >
> > **Pembangkitan kunci**: (1) tentukan barisan superincreasing; (2) kalikan tiap elemen dengan $n$ modulo $m$, dengan **$m$ lebih besar dari jumlah semua elemen** dan **$\gcd(n, m) = 1$**; (3) hasilnya kunci publik, barisan asal kunci privat.
> >
> > **Contoh**: $\{2, 3, 6, 13, 27, 52\}$, $m = 105$, $n = 31$:
> >
> > $2 \cdot 31 \bmod 105 = 62$, $3 \to 93$, $6 \to 81$, $13 \to 88$, $27 \to 102$, $52 \to 37$. **Kunci publik $\{62, 93, 81, 88, 102, 37\}$**, privat $\{2, 3, 6, 13, 27, 52\}$.
> >
> > ```mermaid
> > flowchart TD
> >     S["Barisan superincreasing<br/>{2,3,6,13,27,52}<br/>(kunci privat)"] --> MUL["x n mod m<br/>n = 31, m = 105"]
> >     MUL --> PUB["Barisan non-superincreasing<br/>{62,93,81,88,102,37}<br/>(kunci publik)"]
> >     PUB --> ENC["Enkripsi: jumlahkan elemen<br/>sesuai bit 1 plainteks"]
> >     ENC --> C["Kriptogram"]
> >     C --> DEC["x n^-1 mod m<br/>lalu selesaikan superincreasing"]
> >     S --> DEC
> > ```
> >
> > ### Enkripsi
> >
> > Pecah plainteks menjadi blok sepanjang kardinalitas kunci publik; kalikan tiap bit dengan elemen kunci publik yang berkoresponden lalu jumlahkan. Plainteks `011000 110101 101110`:
> >
> > | Blok | Perhitungan | Kriptogram |
> > |---|---|---|
> > | 011000 | $93 + 81$ | 174 |
> > | 110101 | $62 + 93 + 88 + 37$ | 280 |
> > | 101110 | $62 + 81 + 88 + 102$ | 333 |
> >
> > Cipherteks: **174, 280, 333**.
> >
> > ### Dekripsi
> >
> > Hitung $n^{-1}$ dengan $n \cdot n^{-1} \equiv 1 \pmod m$ (**$31^{-1} \equiv 61 \pmod{105}$**). Kalikan tiap kriptogram dengan $n^{-1} \bmod m$, lalu selesaikan **superincreasing knapsack** dengan kunci privat:
> >
> > - $174 \cdot 61 \bmod 105 = 9 = 3 + 6 \to$ `011000`
> > - $280 \cdot 61 \bmod 105 = 70 = 2 + 3 + 13 + 52 \to$ `110101`
> > - $333 \cdot 61 \bmod 105 = 48 = 2 + 6 + 13 + 27 \to$ `101110`
> >
> > Plainteks kembali: `011000110101101110`.
> >
> > ### Implementasi dan Kriptanalisis
> >
> > Cipherteks **lebih besar** daripada plainteks. Untuk kekuatan, kunci sebaiknya **minimal 250 elemen**, tiap elemen **200-400 bit**, modulus **100-200 bit**; brute force butuh "1046 tahun" menurut slide (pada $10^6$ percobaan/detik; kemungkinan besar maksudnya $10^{46}$ tahun, pangkat hilang saat konversi).
> >
> > Namun knapsack **sudah tidak aman**: **Adi Shamir (1982)** memecahkan Merkle-Hellman dasar dalam **waktu polinomial** dengan mentransformasi kembali knapsack biasa menjadi superincreasing ("*A polynomial time algorithm for breaking the basic Merkle-Hellman cryptosystem*", FOCS 1982).

> [!cornell] #### Summary
>
> **Knapsack Merkle-Hellman** (1978) memakai **subset-sum/knapsack problem (NP-complete)**: bit plainteks $b_i$ memilih bobot $w_i$, kriptogram $M = \sum b_i w_i$. Knapsack biasa sulit didekripsi; **superincreasing** (tiap elemen > jumlah sebelumnya) dipecahkan **$O(n)$** secara greedy dari bobot terbesar. Kunci **privat = barisan superincreasing**; kunci **publik = tiap elemen $\times n \bmod m$** ($m >$ jumlah elemen, $\gcd(n, m) = 1$). Contoh: $\{2,3,6,13,27,52\}$, $m = 105$, $n = 31$ menghasilkan publik $\{62, 93, 81, 88, 102, 37\}$; `011000 110101 101110` $\to$ **174, 280, 333**; dekripsi mengalikan $n^{-1} = 61$ lalu menyelesaikan superincreasing. Cipherteks lebih besar dari plainteks. Meski brute force mustahil pada parameter besar, algoritma ini **dipatahkan Shamir (1982) dalam waktu polinomial**. Sisi lain keluarga kunci publik: [[Algoritma RSA]] dan [[Algoritma ElGamal]].

> [!ad-libitum]- Additional Information
>
> #### Mengapa Knapsack Runtuh
>
> Serangan Shamir mencari bilangan $n', m'$ (bukan yang asli) sehingga $w_i \cdot n'^{-1} \bmod m'$ kembali superincreasing, dengan pemrograman integer berdimensi tetap (algoritma Lenstra). Serangan yang lebih umum memakai **lattice reduction (LLL)** (Lagarias-Odlyzko 1985) yang menyelesaikan knapsack berkerapatan rendah. Versi iteratif (Chor-Rivest) juga dipatahkan (Vaudenay 1998). Pelajarannya: **kesulitan NP-complete di kasus terburuk tidak menjamin sulit di kasus rata-rata/berstruktur**.
>
> #### Lattice dalam Kriptografi Modern
>
> LLL, senjata yang memecahkan knapsack, kini menjadi alat dan sekaligus fondasi: **kriptografi berbasis lattice** (Kyber/ML-KEM, Dilithium) memakai masalah lattice (LWE) yang dipercaya sulit bahkan bagi komputer kuantum ([[Ekosistem, Tantangan Masa Depan, dan Miskonsepsi]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan Merkle-Hellman lengkap (kunci, enkripsi, dekripsi, `modinv`) dan verifikasi `174, 280, 333`.
> 2. Coba serang Merkle-Hellman kecil dengan LLL (mis. pustaka `fpylll`) untuk $n = 20$ dan tunjukkan ia memulihkan plainteks tanpa kunci privat.
>
> #### Bacaan Lanjutan
>
> - R. Merkle & M. Hellman, *"Hiding Information and Signatures in Trapdoor Knapsacks"*, IEEE TIT, 1978.
> - A. Shamir, *"A polynomial time algorithm for breaking the basic Merkle-Hellman cryptosystem"*, FOCS 1982.
> - Demo: `asecuritysite.com/encryption/knapcode`.
