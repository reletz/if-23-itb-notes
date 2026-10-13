---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Algoritma RSA
>
> > ## Questions/Cues
> >
> > - Siapa pembuat RSA dan pada persoalan sulit apa keamanannya bersandar?
> > - Apa saja properti dan parameter RSA (p, q, n, φ(n), e, d)?
> > - Bagaimana rumus enkripsi/dekripsi diturunkan dari Teorema Euler?
> > - Bagaimana membangkitkan pasangan kunci RSA?
> > - Bagaimana contoh enkripsi pesan angka dan teks (blok)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Algoritma RSA (Slides 2-16)
>
> > ### Pendahuluan
> >
> > **RSA** adalah algoritma kunci-publik **paling terkenal dan paling luas aplikasinya**, dibuat tiga peneliti MIT: **Ronald Rivest, Adi Shamir, Leonard Adleman** (RSA = Rivest-Shamir-Adleman; slide menyebut 1976). Keamanannya terletak pada **sulitnya memfaktorkan bilangan bulat besar** menjadi faktor primanya.
> >
> > ### Properti RSA
> >
> > | Parameter | Keterangan | Status |
> > |---|---|---|
> > | $p, q$ | bilangan prima | **rahasia** |
> > | $n = p \cdot q$ | modulus | tidak rahasia |
> > | $\phi(n) = (p-1)(q-1)$ | fungsi totient Euler | **rahasia** |
> > | $e$ | kunci enkripsi, syarat $\gcd(e, \phi(n)) = 1$ | tidak rahasia (**kunci publik**) |
> > | $d \equiv e^{-1} \pmod{\phi(n)}$ | kunci dekripsi | **rahasia (kunci privat)** |
> > | $m$ | plainteks | rahasia |
> > | $c$ | cipherteks | tidak rahasia |
> >
> > ### Penurunan Rumus
> >
> > Berdasar **Teorema Euler**: $a^{\phi(n)} \equiv 1 \pmod n$ untuk $\gcd(a, n) = 1$. **Totient Euler** $\phi(n)$ = banyak bilangan di $1..n$ yang relatif prima dengan $n$. Contoh $\phi(20) = 8$ (yaitu 1, 3, 7, 9, 11, 13, 17, 19). Bila $n = pq$ dengan $p, q$ prima, $\phi(n) = \phi(p)\phi(q) = (p-1)(q-1)$ (lihat [[Teori Bilangan untuk Kriptografi]]).
> >
> > Pangkatkan kedua ruas dengan $k$, ganti $a$ dengan $m$, lalu kalikan $m$:
> >
> > $$m^{k\phi(n)} \equiv 1 \pmod n \ \Rightarrow\ m^{k\phi(n) + 1} \equiv m \pmod n$$
> >
> > Pilih $e$ dan $d$ dengan $ed \equiv 1 \pmod{\phi(n)}$, yaitu $ed = k\phi(n) + 1$. Maka $m^{ed} \equiv m \pmod n$, sehingga:
> >
> > $$\text{Enkripsi: } c = m^e \bmod n \qquad \text{Dekripsi: } m = c^d \bmod n$$
> >
> > ### Pembangkitan Kunci
> >
> > 1. Pilih dua bilangan prima $p$ dan $q$ (sebaiknya $p \ne q$).
> > 2. Hitung $n = pq$.
> > 3. Hitung $\phi(n) = (p-1)(q-1)$.
> > 4. Pilih $e$ relatif prima terhadap $\phi(n)$.
> > 5. Hitung $d \equiv e^{-1} \pmod{\phi(n)}$, atau $d = \dfrac{1 + k\phi(n)}{e}$ (cari $k$ hingga bulat).
> >
> > **Kunci publik = $(e, n)$**, **kunci privat = $(d, n)$**.
> >
> > ```mermaid
> > flowchart TD
> >     PQ["Pilih prima p, q"] --> N["n = p x q"]
> >     PQ --> PHI["phi(n) = (p-1)(q-1)"]
> >     PHI --> E["Pilih e,<br/>gcd(e, phi) = 1"]
> >     E --> D["d = e^-1 mod phi(n)"]
> >     N --> PUB["Kunci publik (e, n)"]
> >     E --> PUB
> >     D --> PRIV["Kunci privat (d, n)"]
> >     N --> PRIV
> > ```
> >
> > ### Enkripsi dan Dekripsi
> >
> > - **Enkripsi**: (1) *preprocessing*: kodekan pesan menjadi integer $m$; bila besar, pecah menjadi blok $m_i$ dengan $0 \le m_i < n - 1$. (2) $c_i = m_i^e \bmod n$.
> > - **Dekripsi**: (1) $m_i = c_i^d \bmod n$. (2) *postprocessing*: kodekan kembali menjadi pesan.
> >
> > ### Contoh: Pembangkitan Kunci Alice
> >
> > $p = 47$, $q = 71$ $\Rightarrow$ $n = 3337$, $\phi(n) = 46 \cdot 70 = 3220$ (slide menulis 60; yang benar $71 - 1 = 70$, sehingga $46 \times 70 = 3220$). Pilih $e = 79$ ($\gcd(79, 3220) = 1$). Kunci publik $(79, 3337)$.
> >
> > Hitung $d = (1 + 3220k)/79$: $k = 1 \to 40{,}77$, $k = 2 \to 81{,}53$, ..., $k = 25 \to 80501/79 = 1019$ (bulat). Kunci privat **$(1019, 3337)$**.
> >
> > ### Contoh 1: Pesan Angka
> >
> > Bob mengirim $m = 16$: $c = 16^{79} \bmod 3337 = 1493$. Alice mendekripsi: $m = 1493^{1019} \bmod 3337 = 16$.
> >
> > ### Contoh 2: Teks `HELLO ALICE`
> >
> > Kodekan $A = 00, \dots, Z = 25$ (spasi diabaikan): $m = 07041111140011080204$. Terlalu besar untuk $[0, 3336]$, jadi dipecah blok 4 digit: $704,\ 1111,\ 1400,\ 1108,\ 0204$.
> >
> > | Blok $m_i$ | $c_i = m_i^{79} \bmod 3337$ |
> > |---|---|
> > | 0704 | 328 |
> > | 1111 | 301 |
> > | 1400 | 2653 |
> > | 1108 | 2986 |
> > | 0204 | 1164 |
> >
> > Cipherteks: `0328 0301 2653 2986 1164`. Dekripsi $c_i^{1019} \bmod 3337$ mengembalikan blok-blok itu, dikodekan kembali menjadi **`HELLO ALICE`**.

> [!cornell] #### Summary
>
> **RSA** (Rivest-Shamir-Adleman) berbasis **kesulitan memfaktorkan** $n = pq$. Kunci: pilih prima rahasia $p, q$, $n = pq$, $\phi(n) = (p-1)(q-1)$, pilih $e$ dengan $\gcd(e, \phi(n)) = 1$, hitung $d \equiv e^{-1} \pmod{\phi(n)}$; **publik $(e, n)$**, **privat $(d, n)$**. Berdasar **Teorema Euler**, $m^{ed} \equiv m \pmod n$ sehingga **$c = m^e \bmod n$** dan **$m = c^d \bmod n$**. Pesan panjang dipecah menjadi blok $0 \le m_i < n$. Contoh $p = 47$, $q = 71$, $e = 79$ memberi $d = 1019$; $m = 16 \mapsto c = 1493 \mapsto 16$, dan `HELLO ALICE` terenkripsi blok 4 digit menjadi `0328 0301 2653 2986 1164`. Keamanan, ukuran kunci, hybrid, dan implementasi ada di [[Keamanan dan Praktik RSA]].

> [!ad-libitum]- Additional Information
>
> #### Pilihan e dan Efisiensi
>
> $e$ biasanya **65537 ($2^{16}+1$)**: bit-1 hanya dua, sehingga enkripsi (kuadrat-dan-kali) cepat. Dekripsi lebih berat karena $d$ besar, dipercepat dengan **CRT (Chinese Remainder Theorem)**: hitung $c^d$ modulo $p$ dan $q$ secara terpisah lalu gabungkan (~4 kali lebih cepat).
>
> #### Mengapa Benar: Kasus $\gcd(m, n) \ne 1$
>
> Teorema Euler menuntut $\gcd(m, n) = 1$, namun RSA tetap benar untuk semua $m$ (bila $m$ kelipatan $p$ atau $q$, gunakan CRT dan Teorema Kecil Fermat pada tiap faktor). Kasus ini langka untuk prima besar tetapi menjelaskan kenapa dekripsi tidak gagal.
>
> #### Cara Menghitung $m^e \bmod n$
>
> Gunakan **perpangkatan modular cepat (square-and-multiply)**, kompleksitas $O(\log e)$ perkalian modular, bukan menghitung $m^e$ lalu memodulo. Tanpa itu, $16^{79}$ saja sudah 96 digit dan $c^{1019}$ jauh lebih besar.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan RSA "kertas": bangkitkan kunci dari dua prima kecil, `modinv` dengan extended Euclid, enkripsi teks blok demi blok, dan verifikasi angka `328, 301, 2653, 2986, 1164`.
> 2. Tambahkan dekripsi dengan CRT dan bandingkan kecepatannya pada modulus 2048 bit.
>
> #### Bacaan Lanjutan
>
> - R. Rivest, A. Shamir, L. Adleman, *"A Method for Obtaining Digital Signatures and Public-Key Cryptosystems"*, CACM, 1978.
> - Demo: `steyrerbrains.at/math/rsa.html`, `umaranis.com/rsa_calculator_demo.html`, `lddgo.net/en/encrypt/rsa`.
