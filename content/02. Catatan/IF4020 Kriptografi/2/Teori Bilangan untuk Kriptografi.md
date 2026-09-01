---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Teori Bilangan untuk Kriptografi
>
> > ## Questions/Cues
> >
> > - Cabang matematika apa saja yang menjadi landasan kriptografi?
> > - Bagaimana mendefinisikan operasi `mod`, termasuk untuk bilangan negatif?
> > - Apa itu kekongruenan (congruence) dan notasi $a \equiv b \pmod{n}$?
> > - Apa arti dua bilangan "relatif prima" dan bagaimana perannya?
> > - Apa itu balikan (invers) modulo dan kapan ia ada?
> > - Mengapa bilangan prima penting untuk kriptografi?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Landasan Matematika untuk Kriptografi (Slides 1-3)
>
> > ### Materi Matematika untuk Kriptografi
> >
> > Kriptografi berdiri di atas lima cabang matematika:
> >
> > 1. **Teori Bilangan** — integer dan aritmetika modulo, algoritma Euclidean, kekongruenan, relatif prima, balikan (invers) modulo, bilangan prima.
> > 2. **Probabilitas dan Statistik** — untuk analisis frekuensi dan menilai keacakan.
> > 3. **Kompleksitas algoritma** — untuk menilai apakah sebuah serangan "layak" secara komputasi.
> > 4. **Teori Informasi** — entropi dan ukuran ketidakpastian pesan (lihat [[Teori Informasi dan Entropi]]).
> > 5. **Aljabar abstrak** — grup, ring, dan field; dibahas kelak pada materi **ECC** (*Elliptic Curve Cryptography*).
> >
> > Poin 1–3 sudah dipelajari di **Matematika Diskrit** dan **Probabilitas & Statistik**; catatan ini merangkumnya kembali dalam konteks kriptografi.
> >
> > ### Aritmetika Modulo
> >
> > **$a \bmod n$** adalah sisa pembagian $a$ oleh $n$, dengan hasil selalu berada di rentang $0 \le r < n$. Untuk bilangan negatif, tambahkan kelipatan $n$ hingga hasilnya non-negatif.
> >
> > - $23 \bmod 5 = 3$ — karena $23 = 4 \cdot 5 + 3$.
> > - $-41 \bmod 9 = 4$ — karena $|-41| \bmod 9 = 5$, lalu $9 - 5 = 4$.
> >
> > Operasi ini adalah inti setiap cipher klasik: Caesar cipher bekerja `mod 26` untuk alfabet dan `mod 256` untuk ASCII.
> >
> > ### Kekongruenan (Congruence)
> >
> > $a \equiv b \pmod{n}$ dibaca "$a$ kongruen $b$ modulo $n$", artinya **$n$ membagi habis $(a - b)$**, atau $a$ dan $b$ bersisa sama bila dibagi $n$.
> >
> > - $17 \equiv 2 \pmod 3$ — karena $3 \mid (17 - 2)$.
> > - $-7 \equiv 15 \pmod{11}$ — karena $11 \mid (-7 - 15) = -22$.
> >
> > ### Relatif Prima (Coprime)
> >
> > Dua bilangan bulat **relatif prima** bila **$\gcd(a, b) = 1$** (dalam notasi Indonesia: $\text{PBB}(a,b) = 1$) — tidak punya faktor bersama selain 1.
> >
> > - $23$ dan $40$ relatif prima sebab $\gcd(23, 40) = 1$.
> >
> > $\gcd$ dihitung efisien dengan **algoritma Euclidean**: $\gcd(a, b) = \gcd(b, a \bmod b)$, diulang hingga sisa 0. Syarat relatif prima muncul di **Affine cipher** (kunci $m$ harus relatif prima dengan ukuran alfabet $n$) dan **RSA**.
> >
> > ### Balikan (Invers) Modulo
> >
> > **$a^{-1} \pmod n$** adalah bilangan $x$ sedemikian sehingga $a \cdot x \equiv 1 \pmod n$.
> >
> > - $4^{-1} \equiv 7 \pmod 9$ — karena $4 \cdot 7 = 28 \equiv 1 \pmod 9$.
> > - $23^{-1} \equiv -3 \equiv 7 \pmod{10}$ — karena $23 \cdot (-3) = -69 \equiv 1 \pmod{10}$.
> >
> > **Invers modulo hanya ada bila $\gcd(a, n) = 1$**, dan dihitung dengan **extended Euclidean algorithm**. Invers modulo dipakai pada **dekripsi** Affine cipher ($m^{-1}$), **Hill cipher** (invers matriks mod 26), dan RSA (menghitung kunci privat $d$).
> >
> > ### Bilangan Prima
> >
> > **Bilangan prima** adalah bilangan bulat $> 1$ yang hanya habis dibagi 1 dan dirinya sendiri. Kriptografi kunci publik modern (RSA, Diffie-Hellman, ElGamal) bergantung pada sifat bilangan prima besar dan kesulitan **memfaktorkan** hasil kali dua prima besar.
> >
> > ```mermaid
> > flowchart LR
> >     M["Aritmetika modulo"] --> Caesar["Caesar &amp; Vigenere<br/>(mod 26 / 256)"]
> >     RP["Relatif prima (gcd = 1)"] --> Affine1["Affine: kunci m"]
> >     INV["Invers modulo"] --> Affine2["Affine &amp; Hill: dekripsi"]
> >     INV --> RSA1["RSA: kunci privat d"]
> >     PR["Bilangan prima"] --> RSA2["RSA, Diffie-Hellman, ElGamal"]
> > ```
> >
> > ### Latihan
> >
> > - **(a)** $-24 \bmod 11 = ?$ → $-24 + 33 = 9$, jadi **9** (cek: $-24 = 11 \cdot (-3) + 9$).
> > - **(b)** $12^{-1} \pmod 5 = ?$ → $12 \equiv 2 \pmod 5$; cari $2x \equiv 1 \pmod 5$ → $x = 3$ (sebab $2 \cdot 3 = 6 \equiv 1$). Jadi **$12^{-1} \equiv 3 \pmod 5$**.

> [!cornell] #### Summary
>
> Kriptografi bertumpu pada lima cabang matematika; tiga di antaranya — **teori bilangan, probabilitas/statistik, kompleksitas** — sudah dari Matdis & Probstat. **Aritmetika modulo** ($a \bmod n$ selalu di $[0, n)$) adalah mesin setiap cipher klasik. **Kekongruenan** $a \equiv b \pmod n$ berarti $n \mid (a-b)$. Dua bilangan **relatif prima** bila $\gcd = 1$ (dihitung dengan **algoritma Euclidean**), syarat yang dituntut kunci Affine cipher dan RSA. **Invers modulo** $a^{-1}$ memenuhi $a \cdot a^{-1} \equiv 1 \pmod n$, ada hanya bila $\gcd(a,n)=1$, dan dipakai untuk dekripsi Affine, Hill, serta menghitung kunci privat RSA. **Bilangan prima** besar menopang kriptografi kunci publik. Landasan ini dipakai langsung di [[Caesar Cipher dan ROT13]], [[Playfair dan Affine Cipher]], dan [[Hill Cipher dan Enigma Cipher]].

> [!ad-libitum]- Additional Information
>
> #### Extended Euclidean Algorithm
>
> Selain menghitung $\gcd(a, n)$, algoritma Euclidean yang diperluas menghasilkan bilangan $x, y$ dengan $ax + ny = \gcd(a, n)$. Bila $\gcd(a,n) = 1$, maka $x \bmod n$ adalah $a^{-1} \pmod n$. Inilah cara praktis mencari invers modulo tanpa mencoba satu per satu — kompleksitasnya $O(\log n)$.
>
> #### Fungsi Euler dan Teorema Kecil Fermat
>
> $\varphi(n)$ (totient Euler) menghitung banyak bilangan $\le n$ yang relatif prima dengan $n$. Bila $p$ prima, $\varphi(p) = p - 1$. **Teorema Euler**: $a^{\varphi(n)} \equiv 1 \pmod n$ untuk $\gcd(a,n)=1$ — fondasi korektness RSA. Kasus khususnya, **Teorema Kecil Fermat**: $a^{p-1} \equiv 1 \pmod p$.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan `gcd`, `extended_gcd`, dan `modinv` dari nol, lalu pakai `modinv` untuk mendekripsi Affine cipher.
> 2. Tulis saringan Eratosthenes dan uji primalitas Miller–Rabin; bandingkan kecepatannya untuk mencari prima 512-bit.
>
> #### Bacaan Lanjutan
>
> - Rinaldi Munir, *Matematika Diskrit*, Informatika Bandung — bab Teori Bilangan.
> - *Handbook of Applied Cryptography*, Bab 2 (Number Theory) dan Bab 4 (Public-Key Parameters).
