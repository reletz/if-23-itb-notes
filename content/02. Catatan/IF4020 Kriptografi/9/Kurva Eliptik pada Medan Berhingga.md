---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Kurva Eliptik pada Medan Berhingga
>
> > ## Questions/Cues
> >
> > - Mengapa kurva eliptik pada bilangan riil tidak cocok untuk kriptografi?
> > - Bagaimana bentuk kurva eliptik di $GF(p)$ dan bagaimana mencari semua titiknya?
> > - Bagaimana rumus penjumlahan, pengurangan, dan penggandaan titik di $GF(p)$?
> > - Bagaimana pembagian dihitung di $GF(p)$?
> > - Bagaimana grup titik eliptik terlihat dari tabel $kP$?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Elliptic Curve Cryptography Bagian 2 (Slides 24-36)
>
> > ### Dari Bilangan Riil ke $GF(p)$
> >
> > Operasi kurva eliptik pada **bilangan riil** tidak akurat karena melibatkan **pembulatan**, sedangkan kriptografi bekerja di ranah **integer**. Maka kurva eliptik didefinisikan di atas **medan berhingga** $GF(p)$ atau $GF(2^m)$ ([[Aljabar Abstrak - Grup, Medan, dan Galois Field]]). Kuliah ini hanya membahas $GF(p)$:
> >
> > $$y^2 \equiv x^3 + ax + b \pmod p$$
> >
> > dengan $p$ prima dan $x, y \in \{0, 1, \dots, p-1\}$. Grafiknya bukan lagi kurva mulus, melainkan **sebaran titik** diskret.
> >
> > ### Mencari Semua Titik: $y^2 \equiv x^3 + x + 6 \pmod{11}$
> >
> > Untuk tiap $x \in \{0, \dots, 10\}$ hitung $x^3 + x + 6 \bmod 11$, lalu cari $y$ yang kuadratnya sama (akar kuadrat modulo):
> >
> > | $x$ | $x^3 + x + 6 \bmod 11$ | $y$ |
> > |---|---|---|
> > | 0 | 6 | tidak ada |
> > | 1 | 8 | tidak ada |
> > | 2 | 5 | 4, 7 |
> > | 3 | 3 | 5, 6 |
> >
> > Dilanjutkan sampai $x = 10$ diperoleh **12 titik**: $(2,4), (2,7), (3,5), (3,6), (5,2), (5,9), (7,2), (7,9), (8,3), (8,8), (10,2), (10,9)$. Ditambah $O$, grup eliptik memiliki **$n = 13$ elemen**. Kurva $y^2 \equiv x^3 + x + 1 \pmod{23}$ memiliki 26 titik (afin) pada contoh slide, dari $(0,1), (0,22)$ sampai $(19,5), (19,18)$.
> >
> > ### Operasi Titik di $GF(p)$
> >
> > Rumus sama dengan versi riil, hanya semuanya **modulo $p$**, dan pembagian berarti **perkalian dengan invers modulo $p$**.
> >
> > | Operasi | Gradien $m$ | Hasil $R = (x_r, y_r)$ |
> > |---|---|---|
> > | $P + Q$ ($P \ne \pm Q$) | $\dfrac{y_p - y_q}{x_p - x_q} \bmod p$ | $x_r = m^2 - x_p - x_q$, $y_r = m(x_p - x_r) - y_p$ (mod $p$) |
> > | $2P$ ($y_p \ne 0$) | $\dfrac{3x_p^2 + a}{2y_p} \bmod p$ | $x_r = m^2 - 2x_p$, $y_r = m(x_p - x_r) - y_p$ (mod $p$) |
> > | $P - Q$ | | $P + (-Q)$ dengan $-Q = (x_q, -y_q \bmod p)$ |
> >
> > Bila $y_p = 0$ maka $2P = O$.
> >
> > ### Contoh pada $y^2 \equiv x^3 + x + 6 \pmod{11}$
> >
> > $P(2, 4)$, $Q(5, 9)$:
> >
> > **(a) $P + Q$**: $m = (9-4)/(5-2) = 5 \cdot 3^{-1} = 5 \cdot 4 = 20 \equiv 9$. $x_r = 81 - 2 - 5 = 74 \equiv 8$. $y_r = 9(2 - 8) - 4 = -58 \equiv 8$. Jadi **$R(8, 8)$**.
> >
> > **(b) $2P$**: $m = (3 \cdot 2^2 + 1)/(2 \cdot 4) = 13/8 = 13 \cdot 8^{-1} = 13 \cdot 7 = 91 \equiv 3$ (karena $8 \cdot 7 = 56 \equiv 1$). $x_r = 9 - 4 = 5$. $y_r = 3(2 - 5) - 4 = -13 \equiv 9$. Jadi **$2P = (5, 9)$**.
> >
> > Hasil keduanya terverifikasi: $(8,8)$ dan $(5,9)$ ada di daftar 12 titik.
> >
> > ### Tabel $kP$ dan ECDLP
> >
> > Dengan titik basis $P = (2, 7)$ pada kurva yang sama:
> >
> > | $k$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
> > |---|---|---|---|---|---|---|---|---|---|---|---|---|---|
> > | $kP$ | (2,7) | (5,2) | (8,3) | (10,2) | (3,6) | (7,9) | (7,2) | (3,5) | (10,9) | (8,8) | (5,9) | (2,4) | $O$ |
> >
> > Karena $13P = O$, titik basis mempunyai **orde 13** dan membangkitkan seluruh grup (siklik). Mudah menghitung $Q = kP$ bila $k$ diketahui, tetapi **diberi $P$ dan $Q$, mencari $k$ sangat sukar** ketika orde grup besar (ECDLP). Pada contoh kecil ini cukup menelusuri tabel, pada kurva sungguhan orde grup $\approx 2^{256}$.
> >
> > ```mermaid
> > flowchart LR
> >     R["Kurva riil<br/>y² = x³ + ax + b<br/>(pembulatan, tak akurat)"] -->|"pindah ke<br/>medan berhingga"| F["GF(p)<br/>y² ≡ x³ + ax + b (mod p)"]
> >     F --> T["himpunan titik diskret<br/>+ titik O"]
> >     T --> G["grup abelian<br/>berorde n"]
> > ```

> [!cornell] #### Summary
>
> Agar dapat dipakai di kriptografi, kurva eliptik didefinisikan di **medan berhingga** (di sini $GF(p)$): $y^2 \equiv x^3 + ax + b \pmod p$. Titik-titiknya dicari dengan mencoba tiap $x$ dan menyelesaikan $y$ (akar kuadrat modulo); contoh $y^2 \equiv x^3 + x + 6 \pmod{11}$ memiliki **12 titik + $O$ = 13 elemen**. Rumus penjumlahan dan penggandaan identik dengan versi riil tetapi semua modulo $p$ dan pembagian = **perkalian dengan invers modulo $p$** (mis. $P(2,4) + Q(5,9) = (8,8)$ dan $2P = (5,9)$). Pengurangan $P - Q = P + (-Q)$ dengan $-Q = (x_q, -y_q)$. Menghitung $kP$ mudah sedangkan membalikkannya (**ECDLP**) sulit.

> [!ad-libitum]- Additional Information
>
> #### Berapa Banyak Titik? Teorema Hasse
>
> Jumlah titik $N$ pada kurva atas $GF(p)$ memenuhi **batas Hasse**: $|N - (p + 1)| \le 2\sqrt{p}$. Pada contoh $p = 11$: $N$ antara $12 - 6.6$ dan $12 + 6.6$; $N = 13$ memenuhi. Kurva praktis dihitung orde grupnya dengan **algoritma Schoof/SEA**, dan dipilih agar $N$ (atau kofaktor kecilnya) **prima besar**.
>
> #### Mencari Akar Kuadrat Modulo
>
> Memeriksa apakah $x^3 + ax + b$ merupakan **kuadrat residu** memakai **kriteria Euler**: $z^{(p-1)/2} \equiv 1 \pmod p$. Untuk $p \equiv 3 \pmod 4$, akarnya adalah $z^{(p+1)/4} \bmod p$; untuk lainnya dipakai **Tonelli-Shanks**.
>
> #### $GF(2^m)$ dan Kurva Biner
>
> Di $GF(2^m)$ bentuk Weierstrass berubah menjadi $y^2 + xy = x^3 + ax^2 + b$ karena karakteristik 2. Slide tidak membahasnya, tetapi standar NIST (K-163, B-233, dsb.) memakainya karena aritmetikanya efisien di perangkat keras.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program yang menghitung semua titik $y^2 \equiv x^3 + ax + b \pmod p$ dan orde tiap titik; verifikasi batas Hasse untuk beberapa $p$.
> 2. Cari secara brute force $k$ dengan $kP = Q$ pada kurva $p = 10007$; ukur waktu lalu perkirakan untuk $p \approx 2^{256}$.
>
> #### Bacaan Lanjutan
>
> - Washington, *Elliptic Curves: Number Theory and Cryptography*, Bab 2.
> - Silverman, *The Arithmetic of Elliptic Curves*.
> - Demo: `andrea.corbellini.name/ecc/interactive/modk-add.html` (penjumlahan di $GF(p)$).
