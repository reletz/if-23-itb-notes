---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Aljabar Abstrak - Grup, Medan, dan Galois Field
>
> > ## Questions/Cues
> >
> > - Apa saja aksioma yang membuat sebuah himpunan dan operasi disebut grup?
> > - Apa bedanya grup biasa dengan grup abelian?
> > - Apa itu medan (field) dan mengapa medan berhingga disebut Galois Field?
> > - Bagaimana aritmetika di $GF(p)$ dan di $GF(2^m)$?
> > - Mengapa perkalian di $GF(2^8)$ membutuhkan irreducible polynomial?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Elliptic Curve Cryptography Bagian 1 (Slides 3-23)
>
> > ### Mengapa Perlu Aljabar Abstrak?
> >
> > Sebelum membahas kurva eliptik ([[Kurva Eliptik dan Operasi Titik]]), perlu dipahami struktur aljabar yang mendasarinya: **grup**, **cincin**, **medan**, dan **Galois field**. Kurva eliptik dipakai dalam kriptografi karena himpunan titiknya membentuk **grup**, dan perhitungannya dilakukan di dalam **medan berhingga** agar semua bilangan bersifat bulat dan tepat.
> >
> > ### Grup
> >
> > **Grup** $\langle G, * \rangle$ adalah sebuah himpunan $G$ dengan satu operasi biner $*$ yang memenuhi, untuk semua $a, b, c \in G$:
> >
> > 1. **Closure**: $a * b \in G$.
> > 2. **Asosiatif**: $a * (b * c) = (a * b) * c$.
> > 3. **Elemen netral**: ada $e \in G$ sehingga $a * e = e * a = a$.
> > 4. **Elemen invers**: ada $a' \in G$ sehingga $a * a' = a' * a = e$.
> >
> > Contoh: $\langle \mathbb{R}, + \rangle$ ($e = 0$, $a' = -a$); $\langle \mathbb{R}^*, \times \rangle$ ($e = 1$, $a' = a^{-1}$); $\langle \mathbb{Z}, + \rangle$; $\langle \mathbb{Z}_n, \oplus \rangle$ (penjumlahan modulo $n$, mis. $3 \oplus 4 = 7 \bmod 5 = 2$); dan $\langle \mathbb{Z}_p^*, \otimes \rangle$ (perkalian modulo prima $p$, himpunan $\{1, \dots, p-1\}$).
> >
> > Grup disebut **komutatif/abelian** bila juga berlaku $a * b = b * a$ (nama dari **Niels Henrik Abel**, matematikawan Norwegia, 1802-1829). $\langle \mathbb{R}, + \rangle$ dan $\langle \mathbb{Z}, + \rangle$ abelian, tetapi himpunan matriks $2 \times 2$ berdeterminan $\ne 0$ terhadap perkalian **bukan** abelian karena perkalian matriks tidak komutatif ($AB \ne BA$).
> >
> > ### Medan (Field)
> >
> > **Medan** $\langle F, +, \cdot \rangle$ adalah struktur aljabar dengan dua operasi yang memenuhi:
> >
> > 1. $\langle F, + \rangle$ grup abelian,
> > 2. $\langle F - \{0\}, \cdot \rangle$ grup abelian,
> > 3. $\cdot$ **distributif** terhadap $+$: $x \cdot (y + z) = x \cdot y + x \cdot z$.
> >
> > Contoh medan: bilangan riil $\mathbb{R}$ dan bilangan rasional $\mathbb{Q}$. (Catatan: dengan definisi di atas $\mathbb{Z}$ sebenarnya **bukan** medan karena tidak semua bilangan bulat punya invers perkalian; ia hanya cincin, walau slide kuliah menyebutnya sebagai contoh.) Medan yang himpunannya **berhingga** disebut **finite field** atau **Galois Field** (untuk menghormati **Évariste Galois**, 1811-1832, yang meninggal pada usia 20 tahun).
> >
> > ### Medan Berhingga $F_p$ = $GF(p)$
> >
> > Kelas terpenting: $F_p$ dengan $p$ **prima**, berisi $\{0, 1, \dots, p-1\}$ dengan penjumlahan dan perkalian **modulo $p$**. Karena $p$ prima, setiap elemen tak-nol punya invers perkalian modulo $p$ sehingga pembagian selalu mungkin.
> >
> > Contoh di $F_{23}$: $12 + 20 = 32 \bmod 23 = 9$ dan $8 \times 9 = 72 \bmod 23 = 3$. Tabel $GF(2)$ dan $GF(3)$ dapat disusun langsung; di $GF(11)$, persamaan $x^2 \equiv 5 \pmod{11}$ diselesaikan dengan mencari entri 5 pada tabel perkalian, hasilnya $x = 4$ atau $x = 7$ ($4^2 = 16 \equiv 5$ dan $7^2 = 49 \equiv 5$).
> >
> > Secara umum **Galois field** punya $p^m$ elemen, ditulis $GF(p^m)$ dengan $p$ prima dan $m \ge 1$; kasus $m = 1$ adalah $GF(p)$.
> >
> > ### Medan Biner $GF(2^m)$
> >
> > Bila $p = 2$ diperoleh $GF(2^m)$ (**medan berhingga biner**). Tiap elemen adalah string $m$ bit $b_{m-1} \dots b_1 b_0$ yang dipandang sebagai **polinom**
> >
> > $$b_{m-1}x^{m-1} + \dots + b_1 x + b_0, \quad b_i \in \{0, 1\}$$
> >
> > Contoh: `1101` di $GF(2^4)$ adalah $x^3 + x^2 + 1$; `01010111` di $GF(2^8)$ adalah $x^6 + x^4 + x^2 + x + 1$.
> >
> > - **Penjumlahan**: koefisien dijumlahkan modulo 2, **identik dengan XOR** bit demi bit.
> > - **Perkalian**: kalikan kedua polinom (koefisien modulo 2), lalu **reduksi** dengan sisa pembagian oleh sebuah **irreducible polynomial** berderajat $m$ agar hasil tetap berderajat $< m$.
> >
> > Polinom **irreducible** tidak dapat dinyatakan sebagai perkalian dua polinom lain (selain 1 dan dirinya). $x^2 + 1$ dan $x^4 + x + 1$ irreducible, sedangkan $x^5 + x^2 + x + 1 = (x^5 + x^2 + 1)(x^2 + 1)$ reducible (menurut slide). Perannya mirip bilangan prima pada $GF(p)$.
> >
> > ### Contoh Perhitungan di $GF(2^8)$
> >
> > $a = \text{0x57} = x^6 + x^4 + x^2 + x + 1$, $b = \text{0x83} = x^7 + x + 1$:
> >
> > | Operasi | Hasil |
> > |---|---|
> > | $a + b$ | `01010111` XOR `10000011` = `11010100` = **0xD4** |
> > | $a \cdot b$ (sebelum reduksi) | $x^{13} + x^{11} + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + 1$ |
> > | $a \cdot b \bmod f(x)$, $f(x) = x^8 + x^4 + x^3 + x + 1$ | $x^7 + x^6 + 1$ = `11000001` = **0xC1** |
> >
> > Polinom $f(x) = x^8 + x^4 + x^3 + x + 1$ adalah irreducible polynomial yang dipakai **AES/Rijndael** ([[AES Rijndael]]). Contoh lain di $GF(2^4)$ dengan $f(x) = x^4 + x + 1$: $(x^3 + x^2 + 1)(x^2 + x) = x^5 + x^3 + x^2 + x \bmod f(x) = x^3$ = `1000`.
> >
> > ```mermaid
> > flowchart TD
> >     G["Grup<br/>1 operasi: closure, asosiatif,<br/>netral, invers"]
> >     A["Grup Abelian<br/>+ komutatif"]
> >     F["Medan (Field)<br/>2 operasi, kedua grup abelian,<br/>distributif"]
> >     FF["Medan Berhingga<br/>= Galois Field GF(p^m)"]
> >     P["GF(p)<br/>mod bilangan prima"]
> >     B["GF(2^m)<br/>polinom biner + XOR"]
> >     G --> A --> F --> FF
> >     FF --> P
> >     FF --> B
> > ```

> [!cornell] #### Summary
>
> **Grup** adalah himpunan dengan satu operasi yang memenuhi **closure, asosiatif, elemen netral, dan invers**; bila juga komutatif disebut **grup abelian**. **Medan** adalah struktur dengan operasi $+$ dan $\cdot$ di mana keduanya membentuk grup abelian (tanpa nol untuk perkalian) dan perkalian distributif terhadap penjumlahan. Medan berhingga disebut **Galois Field** $GF(p^m)$. $GF(p)$ memakai aritmetika **modulo prima $p$**, sedangkan $GF(2^m)$ merepresentasikan elemen sebagai **polinom biner**: penjumlahan = **XOR**, perkalian = perkalian polinom lalu **reduksi dengan irreducible polynomial** (AES memakai $x^8 + x^4 + x^3 + x + 1$). Struktur ini adalah landasan matematis ECC.

> [!ad-libitum]- Additional Information
>
> #### Cincin (Ring) yang Terlewat di Slide
>
> Slide menyebut **cincin** dalam daftar konsep tetapi tidak merincinya. **Cincin** adalah himpunan dengan $+$ dan $\cdot$ di mana $\langle R, + \rangle$ grup abelian, $\cdot$ asosiatif, dan distributif berlaku; ia **tidak** mewajibkan invers perkalian. $\mathbb{Z}$ dan $\mathbb{Z}_n$ adalah cincin; $\mathbb{Z}_n$ menjadi medan **hanya bila $n$ prima**. Karena itu RSA bekerja di cincin $\mathbb{Z}_n$ ($n = pq$), sedangkan ECC di medan $GF(p)$.
>
> #### Cara Mencari Invers Perkalian
>
> Untuk pembagian di $GF(p)$ (mis. $5/3 \bmod 11$ pada operasi titik kurva eliptik) dibutuhkan $a^{-1} \bmod p$. Dua cara: **algoritma Euclidean yang diperluas**, atau **teorema kecil Fermat** $a^{-1} = a^{p-2} \bmod p$. Contoh: $3^{-1} \bmod 11 = 4$ karena $3 \cdot 4 = 12 \equiv 1$. Lihat juga [[Teori Bilangan untuk Kriptografi]].
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis fungsi `gf256_mul(a, b)` yang mengalikan dua byte di $GF(2^8)$ dengan $f(x) = \text{0x11B}$ dan verifikasi $\text{0x57} \cdot \text{0x83} = \text{0xC1}$; lalu hitung invers $\text{0x53}^{-1} = \text{0xCA}$.
> 2. Bangun tabel perkalian $GF(11)$ dan $GF(2^4)$ dengan $x^4 + x + 1$; bandingkan struktur keduanya.
>
> #### Bacaan Lanjutan
>
> - Lidl & Niederreiter, *Finite Fields*, Cambridge University Press.
> - FIPS 197 (AES), Bagian 4 "Mathematical Preliminaries" tentang aritmetika $GF(2^8)$.
> - Paar & Pelzl, *Understanding Cryptography*, Bab 4.
