---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Kurva Eliptik dan Operasi Titik
>
> > ## Questions/Cues
> >
> > - Mengapa dibutuhkan ECC jika sudah ada RSA, ElGamal, dan Diffie-Hellman?
> > - Seperti apa persamaan kurva eliptik dan apa syarat nonsingular-nya?
> > - Bagaimana penjumlahan dan penggandaan dua titik dihitung (geometri dan analitik)?
> > - Mengapa titik-titik kurva membentuk grup abelian dan apa itu titik di infinity?
> > - Apa itu ECDLP dan mengapa ia menjadi dasar keamanan ECC?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Elliptic Curve Cryptography Bagian 2 (Slides 2-23)
>
> > ### Motivasi ECC
> >
> > RSA, ElGamal, dan Diffie-Hellman memakai **bilangan bulat sangat besar** sehingga menyimpan kunci/pesan dan komputasinya mahal. **ECC (Elliptic Curve Cryptography)** menawarkan keamanan setara dengan **kunci lebih pendek**. ECC dikembangkan oleh **Neal Koblitz dan Victor S. Miller (1985)**. Klaim klasiknya: kunci ECC **160-bit** setara keamanan **RSA 1024-bit**; memori dan komputasi lebih sedikit sehingga cocok untuk **piranti nirkabel** dengan prosesor, memori, dan baterai terbatas.
> >
> > ### Kurva Eliptik
> >
> > Kurva eliptik (bentuk Weierstrass pendek) berpersamaan
> >
> > $$y^2 = x^3 + ax + b, \quad 4a^3 + 27b^2 \ne 0$$
> >
> > Syarat $4a^3 + 27b^2 \ne 0$ menjamin kurva **tidak singular** (tak punya titik runcing/berpotongan sendiri; $x^3 + ax + b$ tak punya akar kembar). Tiap pasangan $(a, b)$ memberi kurva berbeda. Contoh: $y^2 = x^3 - 4x = x(x-2)(x+2)$. Titik pada kurva bersama sebuah **titik di infinity $O$** (titik khusus $O(x, \infty)$) membentuk himpunan $G$.
> >
> > ### Penjumlahan Titik $P + Q = R$
> >
> > **Geometri**: tarik garis melalui $P$ dan $Q$; garis memotong kurva di titik ketiga $-R$; **cerminkan** $-R$ terhadap sumbu-$x$ untuk mendapat $R = P + Q$. Jika $R = (x, y)$ maka $-R = (x, -y)$.
> >
> > **Analitik** ($P \ne Q$):
> >
> > $$m = \frac{y_p - y_q}{x_p - x_q}, \qquad x_r = m^2 - x_p - x_q, \qquad y_r = m(x_p - x_r) - y_p$$
> >
> > **Contoh**: kurva $y^2 = x^3 + 2x + 4$, $P(2, 4)$, $Q(0, 2)$. $m = (4-2)/(2-0) = 1$; $x_r = 1 - 2 - 0 = -1$; $y_r = 1 \cdot (2 - (-1)) - 4 = -1$. Jadi $R(-1, -1)$. Periksa: $(-1)^2 = 1 = -1 - 2 + 4$ ✓.
> >
> > ### Invers dan Titik di Infinity
> >
> > $P + (-P) = O$: garis vertikal tidak memotong kurva di titik ketiga (atau memotong di infinity). Maka $O$ adalah **elemen netral** ($P + O = O + P = P$) dan $-P$ adalah **invers** $P$.
> >
> > ### Penggandaan Titik $2P$
> >
> > Menjumlahkan titik dengan dirinya sendiri: garis yang dipakai adalah **garis singgung** di $P$.
> >
> > $$m = \frac{3x_p^2 + a}{2y_p}, \qquad x_r = m^2 - 2x_p, \qquad y_r = m(x_p - x_r) - y_p$$
> >
> > Bila $y_p = 0$ garis singgung vertikal ($m$ tak terdefinisi) sehingga **$2P = O$**.
> >
> > ### Pelelaran dan Perkalian Titik
> >
> > **Pelelaran titik**: $kP = P + P + \dots + P$ ($k$ suku). **Perkalian skalar** $kP = Q$ dihitung dengan mengulang dua operasi dasar (penjumlahan dan penggandaan), mis. $3P = 2P + P$ dan
> >
> > $$23P = 2(2(2(2P) + P) + P) + P$$
> >
> > yaitu algoritma **double-and-add** ($\approx \log_2 k$ langkah, bukan $k$ langkah).
> >
> > ### Kurva Eliptik Membentuk Grup Abelian
> >
> > Dengan $G$ = semua titik kurva (plus $O$) dan operasi $+$, terpenuhi: **closure** (hasil selalu titik kurva), **asosiatif**, **elemen netral $O$**, **invers $-P$**, dan **komutatif** $P + Q = Q + P$. Jadi $\langle G, + \rangle$ adalah **grup abelian**: inilah alasan struktur ini cocok untuk kriptografi.
> >
> > ### ECDLP: Dasar Keamanan ECC
> >
> > Menghitung $Q = kP$ **mudah**, tetapi bila diketahui $P$ dan $Q$, mencari $k$ **sulit**. Inilah **Elliptic Curve Discrete Logarithm Problem (ECDLP)**: diberikan titik $P$ dan $Q$, carilah integer $k$ sehingga $Q = kP$. Pada ECC, **$Q$ adalah kunci publik, $k$ kunci privat, dan $P$ sembarang titik** (titik basis). Bandingkan dengan RSA yang operasi dasarnya perpangkatan: pada ECC operasi dasarnya **perkalian titik** $kP$.
> >
> > ```mermaid
> > flowchart LR
> >     K["k (privat)<br/>+ titik basis P"] -->|"mudah: kP<br/>double-and-add"| Q["Q = kP<br/>(publik)"]
> >     Q -.->|"sulit: ECDLP<br/>cari k dari P, Q"| K
> > ```

> [!cornell] #### Summary
>
> **ECC** (Koblitz dan Miller, 1985) memberi keamanan setara RSA dengan **kunci jauh lebih pendek** (ECC 160-bit $\approx$ RSA 1024-bit). Kurva eliptik $y^2 = x^3 + ax + b$ dengan $4a^3 + 27b^2 \ne 0$ plus **titik di infinity $O$** membentuk **grup abelian** terhadap **penjumlahan titik**: garis melalui $P, Q$ memotong kurva di $-R$, lalu dicerminkan menjadi $R$ ($m = (y_p - y_q)/(x_p - x_q)$, $x_r = m^2 - x_p - x_q$, $y_r = m(x_p - x_r) - y_p$). **Penggandaan** memakai garis singgung ($m = (3x_p^2 + a)/2y_p$), $O$ adalah netral, $-P = (x, -y)$ adalah invers, dan **perkalian skalar** $kP$ dihitung dengan double-and-add. Keamanan ECC bertumpu pada **ECDLP**: $Q = kP$ mudah dihitung, tetapi $k$ sulit ditemukan dari $P$ dan $Q$.

> [!ad-libitum]- Additional Information
>
> #### Perbandingan Ukuran Kunci (NIST SP 800-57)
>
> | Keamanan simetrik | RSA/DH | ECC |
> |---|---|---|
> | 80 bit | 1024 bit | 160 bit |
> | 112 bit | 2048 bit | 224 bit |
> | 128 bit | 3072 bit | 256 bit |
> | 192 bit | 7680 bit | 384 bit |
> | 256 bit | 15360 bit | 512 bit |
>
> Pertumbuhan ECC **linear**, RSA **superlinear**: karena itu kurva eliptik makin unggul di tingkat keamanan tinggi. Algoritma terbaik untuk ECDLP (mis. **Pollard's rho**) berwaktu $O(\sqrt{n})$, tidak ada serangan sub-eksponensial umum seperti index calculus pada RSA/DH.
>
> #### Mengapa Hukum Grup Bekerja?
>
> Asosiativitas $P + (Q + R) = (P + Q) + R$ adalah sifat yang paling sulit dibuktikan secara geometris (slide hanya menyatakannya). Buktinya memakai teorema Cayley-Bacharach atau komputasi aljabar; pada praktiknya cukup dipercaya dan diuji lewat implementasi.
>
> #### Kurva Standar
>
> Kurva yang dipakai nyata: **secp256r1 (NIST P-256)**, **secp256k1** (Bitcoin), **Curve25519** (X25519/Ed25519, bentuk Montgomery/Edwards). Parameter dipilih ketat untuk menghindari kurva lemah (anomalous, supersingular).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan `add(P, Q)`, `double(P)`, dan `scalar_mul(k, P)` (double-and-add) pada $y^2 = x^3 + 2x + 4$ dengan bilangan riil dan bandingkan dengan demo [andrea.corbellini.name/ecc/interactive/reals-add.html](https://andrea.corbellini.name/ecc/interactive/reals-add.html).
> 2. Gambar kurva $y^2 = x^3 - 4x$ dengan matplotlib dan visualisasikan $P + Q = R$ secara geometris.
>
> #### Bacaan Lanjutan
>
> - Andrea Corbellini, *Elliptic Curve Cryptography: a gentle introduction* (blog seri).
> - Hankerson, Menezes, Vanstone, *Guide to Elliptic Curve Cryptography*, Springer.
> - Koblitz, N. (1987), *Elliptic Curve Cryptosystems*, Mathematics of Computation; Miller, V. (1985), *Use of Elliptic Curves in Cryptography*.
