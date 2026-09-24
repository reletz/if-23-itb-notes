---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Algoritma ElGamal
>
> > ## Questions/Cues
> >
> > - Siapa pembuat ElGamal dan berbasis persoalan sulit apa?
> > - Apa itu akar primitif dan logaritma diskrit?
> > - Bagaimana membangkitkan kunci, mengenkripsi, dan mendekripsi ElGamal?
> > - Mengapa cipherteks berukuran dua kali plainteks?
> > - Bagaimana bukti korektness dekripsi?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Algoritma ElGamal (Slides 2-20)
>
> > ### Pendahuluan
> >
> > Dibuat **Taher Elgamal (1985)** dalam makalah *"A public key cryptosystem and a signature scheme based on discrete logarithms"* (IEEE Trans. Information Theory 31(4)). Keamanannya terletak pada **sulitnya menghitung logaritma diskrit**: diberi prima $p$ dan bilangan bulat $g, y$, cari $x$ dengan $g^x \equiv y \pmod p$. Contoh: $7^x \equiv 15 \pmod{41}$, $x = ?$ Jawab: **$x = 3$** sebab $7^3 = 343 \equiv 15$.
> >
> > ### Akar Primitif
> >
> > Bilangan $a$ adalah **akar primitif** dari prima $p$ bila pangkat $a^1, a^2, \dots, a^{p-1} \pmod p$ menghasilkan **nilai-nilai berbeda** (semua bilangan $1..p-1$ muncul tepat sekali), yaitu siklus berpanjang $p - 1$ (mengingat $\phi(p) = p - 1$).
> >
> > - $p = 7$, $a = 3$ **akar primitif**: $3^1..3^6 \bmod 7 = 3, 2, 6, 4, 5, 1$ (semua berbeda).
> > - $p = 7$, $a = 2$ **bukan**: $2^1..2^6 \bmod 7 = 2, 4, 1, 2, 4, 1$ (berulang, panjang siklus 3).
> >
> > Untuk mencari semua akar primitif, coba $a = 2, 3, \dots$.
> >
> > ### Logaritma Diskrit
> >
> > Bila $a$ akar primitif dari $p$, untuk setiap bilangan bulat $b$ ada $x$ ($0 \le x \le p-1$) dengan $b \equiv a^x \pmod p$; $x$ disebut **logaritma diskrit** dari $b$ berbasis $a$. **Perpangkatan modular mudah, logaritma diskrit sulit** untuk bilangan besar. Contoh: 7 akar primitif dari 41, $15 \equiv 7^x \pmod{41} \Rightarrow x = 3$.
> >
> > ### Properti dan Pembangkitan Kunci
> >
> > | Parameter | Keterangan | Status |
> > |---|---|---|
> > | $p$ | prima (boleh dipakai bersama kelompok) | tidak rahasia |
> > | $g$ | akar primitif dari $p$, $g < p$ | tidak rahasia |
> > | $x$ | acak, $2 \le x \le p - 2$ | **rahasia (privat)** |
> > | $y = g^x \bmod p$ | | tidak rahasia (publik) |
> > | $m$ | plainteks | rahasia |
> > | $(a, b)$ | cipherteks | tidak rahasia |
> >
> > **Kunci publik: tripel $(y, g, p)$. Kunci privat: pasangan $(x, p)$.**
> >
> > ### Enkripsi dan Dekripsi
> >
> > **Enkripsi**: pecah plainteks menjadi blok $m$ dengan $0 \le m \le p - 1$. Pilih bilangan acak $k$, $1 \le k \le p - 2$ (baru untuk tiap blok):
> >
> > $$a = g^k \bmod p \qquad b = y^k m \bmod p$$
> >
> > Cipherteks blok = **pasangan $(a, b)$**, sehingga **ukuran cipherteks dua kali plainteks**.
> >
> > **Dekripsi**: hitung $(a^x)^{-1} = a^{p-1-x} \bmod p$ (Teorema Kecil Fermat), lalu
> >
> > $$m = b / a^x \bmod p = b \cdot (a^x)^{-1} \bmod p$$
> >
> > **Bukti**: $a = g^k \Rightarrow a^x \equiv g^{xk}$; $b \equiv y^k m$ dan $y = g^x$, maka $\dfrac{b}{a^x} \equiv \dfrac{y^k m}{a^x} \equiv \dfrac{g^{xk} m}{g^{xk}} \equiv m \pmod p$.
> >
> > ```mermaid
> > flowchart LR
> >     M["m"] --> ENC["a = g^k mod p<br/>b = y^k * m mod p"]
> >     K["k acak"] --> ENC
> >     PUB["y, g, p"] --> ENC
> >     ENC --> CT["Cipherteks (a, b)"]
> >     CT --> DEC["(a^x)^-1 = a^(p-1-x)<br/>m = b * (a^x)^-1 mod p"]
> >     PRIV["x (privat)"] --> DEC
> >     DEC --> M2["m"]
> > ```
> >
> > ### Contoh 1: Bob Membangkitkan Kunci
> >
> > $p = 2357$, $g = 2$ (akar primitif), $x = 1751$; $y = 2^{1751} \bmod 2357 = 1185$. Kunci publik $(1185, 2, 2357)$, privat $(1751, 2357)$.
> >
> > Alice mengenkripsi $m = 2035$ dengan $k = 1520$: $a = 2^{1520} \bmod 2357 = 1430$, $b = 1185^{1520} \cdot 2035 \bmod 2357 = 697$. Cipherteks $(1430, 697)$.
> >
> > Bob: $(a^x)^{-1} = 1430^{2357-1-1751} \bmod 2357 = 1430^{605} \bmod 2357 = 872$; $m = 697 \cdot 872 \bmod 2357 = 2035$. ✓
> >
> > ### Contoh 2: Pesan `HALO`
> >
> > Alice: $p = 2273$, $g = 3$, $x = 243$, $y = 3^{243} \bmod 2273 = 461$. Bob mengodekan `HALO` = $07001114$, dipecah blok $m_1 = 0700$, $m_2 = 1114$ (semua $< 2273$):
> >
> > | Blok | $k$ | $a = g^k$ | $b = y^k m$ | Dekripsi $(a^x)^{-1}$ | $m$ |
> > |---|---|---|---|---|---|
> > | 0700 | 1463 | 1439 | 74 | 1791 | 700 |
> > | 1114 | 2001 | 1220 | 1682 | 1125 | 1114 |
> >
> > Cipherteks: $(1439, 74)$ dan $(1220, 1682)$; Alice memperoleh kembali `HALO`.

> [!cornell] #### Summary
>
> **ElGamal** (Taher Elgamal, 1985) berbasis **logaritma diskrit**: diberi $g^x \equiv y \pmod p$, mencari $x$ sulit sementara pemangkatan mudah. Ia memakai **akar primitif** $g$ dari prima $p$ (pangkatnya menelusuri semua $1..p-1$). Kunci: privat $x$ ($2 \le x \le p-2$), **publik $(y = g^x \bmod p,\ g,\ p)$**. Enkripsi blok $m$ dengan $k$ acak: **$a = g^k$, $b = y^k m \bmod p$**, cipherteks $(a, b)$ **dua kali ukuran plainteks**. Dekripsi: $m = b \cdot (a^x)^{-1} = b \cdot a^{p-1-x} \bmod p$; benar karena $y^k = g^{xk} = a^x$. Contoh $p = 2357, g = 2, x = 1751$: $m = 2035 \mapsto (1430, 697) \mapsto 2035$. Persoalan logaritma diskrit yang sama menopang [[Hybrid Cryptography dan Diffie-Hellman]].

> [!ad-libitum]- Additional Information
>
> #### $k$ Harus Acak dan Tidak Dipakai Ulang
>
> Bila $k$ sama dipakai dua blok, $b_1 / b_2 = m_1 / m_2$ sehingga bila satu plainteks diketahui yang lain terbongkar. $k$ juga harus **dibangkitkan acak sejati per pesan**; pada *ElGamal signature* dan **DSA**, kebocoran atau bias $k$ langsung membocorkan kunci privat (kasus PS3 dan Bitcoin nyata).
>
> #### Sifat Randomized
>
> Karena $k$ acak, plainteks sama menghasilkan cipherteks berbeda (**probabilistik**), berbeda dengan textbook RSA yang deterministik. Ini keuntungan keamanan semantik (IND-CPA di bawah asumsi DDH). Namun ElGamal murni **malleable** (mengalikan $b$ dengan $t$ mengalikan plainteks dengan $t$).
>
> #### Penerapan
>
> ElGamal dipakai pada **GnuPG/PGP**, dan bentuk kurva eliptiknya (**ECEG**, **ECIES**) pada TLS dan enkripsi modern. Tanda tangan ElGamal adalah dasar **DSA** dan **ECDSA**.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan ElGamal (cari akar primitif, `pow(a, p-1-x, p)`) dan verifikasi angka `(1430, 697)` dan `(1439, 74), (1220, 1682)`.
> 2. Demonstrasikan bahaya pemakaian ulang $k$: enkripsi dua pesan dengan $k$ sama, lalu pulihkan pesan kedua dari yang pertama.
>
> #### Bacaan Lanjutan
>
> - T. ElGamal, *"A public key cryptosystem and a signature scheme based on discrete logarithms"*, IEEE TIT, 1985.
> - Demo: `debjitbiswas.com/elgamal/`.
