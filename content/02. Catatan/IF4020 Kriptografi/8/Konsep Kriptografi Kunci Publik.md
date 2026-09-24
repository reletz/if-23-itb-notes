---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Konsep Kriptografi Kunci Publik
>
> > ## Questions/Cues
> >
> > - Masalah apa pada kriptografi simetri yang mendorong lahirnya kunci publik?
> > - Bagaimana gagasan Diffie-Hellman (1976) dan apa isi makalahnya?
> > - Bagaimana cara kerja kunci publik dan kunci privat?
> > - Persoalan matematika sulit apa yang menjadi dasar keamanannya?
> > - Apa kelebihan dan kelemahan kunci publik dibanding simetri?
> > - Apa tiga aplikasi utamanya?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Kunci-Publik (Slides 2-24)
>
> > ### Masalah Kriptografi Simetri
> >
> > Sebelum pertengahan 1970-an hanya ada kriptografi **kunci-simetri**: pengirim dan penerima berbagi kunci rahasia $K$ yang sama, $E_K(P) = C$ dan $D_K(C) = P$. Masalahnya: **bagaimana membagikan $K$ kepada penerima?**
> >
> > - Mengirim kunci lewat saluran publik (telepon, internet, pos) **sangat tidak aman**.
> > - Kunci harus dikirim lewat **saluran kedua yang benar-benar aman** (kurir) atau disepakati lebih dulu secara tatap muka.
> > - Cara *offline* itu umumnya **lambat, mahal, dan tidak praktis** (masalah yang sama dengan OTP, lihat [[Kelemahan dan Penggunaan OTP]]).
> >
> > ### Sejarah
> >
> > Pada **1976** **Whitfield Diffie** dan **Martin E. Hellman** (Stanford) menulis makalah **"New Directions in Cryptography"** (IEEE), penemu konsep kriptografi kunci-publik. Makalah itu **belum** memuat algoritma kunci-publik yang sesungguhnya, hanya konsep dan persoalan matematika yang dipakai.
> >
> > ### Cara Kerja
> >
> > Enkripsi dan dekripsi memakai **kunci berbeda**:
> >
> > - **Kunci publik ($K_1$)** untuk mengenkripsi, tidak rahasia.
> > - **Kunci privat ($K_2$)** untuk mendekripsi, rahasia.
> >
> > $$E_{K_1}(P) = C \qquad D_{K_2}(C) = P$$
> >
> > Karena kuncinya tidak sama, disebut juga kriptografi **nir-simetri** (*asymmetric-key*). Contoh: **Bob** mengirim ke **Alice** dengan mengenkripsi memakai **kunci publik Alice**; Alice mendekripsi dengan **kunci privatnya sendiri**. Bila Alice membalas, ia memakai **kunci publik Bob**. Kunci privat **tidak pernah dikirim**.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant B as Bob
> >     participant E as Eve/Carol (penyadap)
> >     participant A as Alice
> >     A->>B: kunci publik Alice (saluran tak aman)
> >     B->>A: C = E(kunci publik Alice, P)
> >     Note over E: melihat C dan kunci publik,<br/>tidak bisa mendekripsi
> >     A->>A: P = D(kunci privat Alice, C)
> > ```
> >
> > **Analogi kotak surat / PO Box**: alamat kotak = kunci publik, kunci kotak = kunci privat. Siapa pun bisa memasukkan surat, hanya pemilik kunci yang bisa membukanya.
> >
> > Kunci publik dapat disimpan di **repositori publik** dan dikirim lewat **saluran tak aman** (bahkan saluran yang sama dengan cipherteks). Penyadap yang melihat cipherteks dan kunci publik tetap tidak dapat mendekripsi karena tak tahu kunci privat. Dasarnya: menghitung kunci publik **mudah**, tetapi menurunkan kunci privat dari kunci publik **secara komputasi hampir mustahil** (*infeasible*), sedangkan enkripsi/dekripsi itu sendiri mudah.
> >
> > ### Persoalan Sulit sebagai Dasar Keamanan
> >
> > | Persoalan | Definisi singkat | Algoritma |
> > |---|---|---|
> > | **Pemfaktoran** | faktorkan $n$ menjadi faktor prima (mis. $252601 = 41 \cdot 61 \cdot 101$; $2^{113} - 1 = 3391 \cdot 23279 \cdot 65993 \cdot 1868569 \cdot 1066818132868207$) | RSA |
> > | **Logaritma diskrit** | cari $x$ dengan $a^x \equiv b \pmod n$ (mis. $3^x \equiv 15 \pmod{17} \Rightarrow x = 6$); kebalikan perpangkatan modular ($b$ mudah, $x$ sulit) | ElGamal, DSA, Diffie-Hellman |
> > | **ECDLP** | diberi titik $P, Q$ pada kurva eliptik, cari $n$ dengan $P = nQ$ | ECC |
> > | **Knapsack** | cari $b_i \in \{0,1\}$ dengan $M = \sum b_i w_i$ | Merkle-Hellman |
> > | **Persamaan Diophantine** | solusi integer non-negatif $a_1x_1 + \dots + a_nx_n = c$ (bentuk polinom: NP-complete) | Diophantine cryptosystem |
> >
> > ### Simetri vs Kunci Publik
> >
> > | | Kunci-simetri | Kunci-publik |
> > |---|---|---|
> > | Kecepatan | **lebih cepat** | lebih lambat (bilangan besar, pangkat besar) |
> > | Ukuran kunci | relatif pendek | relatif besar |
> > | Distribusi kunci | **harus lewat saluran aman**; kunci sering diganti tiap sesi | hanya kunci privat yang dirahasiakan, **tak perlu dikirim**; pasangan kunci jarang diganti |
> > | Otentikasi pengirim | langsung (hanya dua pihak tahu kunci) | **tidak** dari cipherteks (kunci publik diketahui semua orang) |
> > | Ukuran cipherteks | sama dengan plainteks | lebih besar (2-4 kali) |
> > | Bukti keamanan | tidak terbukti aman | tidak terbukti aman (bergantung asumsi persoalan sulit) |
> >
> > Keunggulan lain kunci publik: **jumlah kunci ditekan** (tiap orang cukup satu pasang; kunci orang lain diambil dari repositori), dapat **mengamankan pengiriman kunci simetri**, dan beberapa algoritmanya bisa dipakai untuk **tanda tangan digital**.
> >
> > ### Tiga Aplikasi Utama
> >
> > 1. **Enkripsi/dekripsi pesan**: RSA, Rabin, Knapsack, ElGamal, Paillier, ECEG.
> > 2. **Tanda tangan digital** (otentikasi pesan dan pengirim): RSA, ElGamal, DSA, ECC.
> > 3. **Pertukaran kunci** (berbagi kunci simetri): Diffie-Hellman.
> >
> > Algoritma lain: EPOC, McEliece, XTR, Kyber, Cramer-Shoup, dan lain-lain.

> [!cornell] #### Summary
>
> Kriptografi simetri terbentur **masalah distribusi kunci**. **Diffie dan Hellman (1976, *New Directions in Cryptography*)** melahirkan konsep **kunci publik**: pasangan **kunci publik (enkripsi, tidak rahasia)** dan **kunci privat (dekripsi, rahasia)**, $E_{K_1}(P) = C$, $D_{K_2}(C) = P$, sehingga kunci privat tak pernah dikirim dan kunci publik boleh melewati saluran tak aman. Keamanannya bergantung pada persoalan **mudah dihitung searah tetapi sukar dibalik**: **pemfaktoran (RSA), logaritma diskrit (ElGamal, DSA, DH), ECDLP (ECC), knapsack, Diophantine**. Dibanding simetri, ia **lebih lambat, berkunci dan cipherteks lebih besar, tak memberi otentikasi langsung**, tetapi memangkas jumlah kunci dan membuka **tanda tangan digital** serta **pertukaran kunci**. Algoritma paling terkenal dibahas di [[Algoritma RSA]], [[Algoritma ElGamal]], [[Hybrid Cryptography dan Diffie-Hellman]], dan [[Algoritma Knapsack Merkle-Hellman]].

> [!ad-libitum]- Additional Information
>
> #### Trapdoor One-Way Function
>
> Secara formal kunci publik memerlukan **fungsi satu arah berpintu jebakan** (*trapdoor one-way function*): mudah dihitung ke depan, sulit dibalik kecuali tahu *trapdoor* (kunci privat). Pada RSA, $c = m^e \bmod n$ mudah, memulihkan $m$ sulit tanpa $d$ (atau faktor $n$).
>
> #### Penemuan Paralel di GCHQ
>
> Konsep yang sama ditemukan lebih dulu (1969-1973) secara rahasia oleh **James Ellis, Clifford Cocks, dan Malcolm Williamson** di GCHQ Inggris (Cocks menemukan setara RSA, Williamson setara Diffie-Hellman), baru dibuka publik pada 1997. Kredit publik tetap ke Diffie-Hellman, dan Ralph Merkle (*Merkle puzzles*, 1974-1978) dianggap ikut menemukan konsep ini.
>
> #### Ukuran Kunci Setara
>
> Keamanan setara 128 bit simetri kira-kira setara **RSA/DH/ElGamal 3072 bit** atau **ECC 256 bit** (NIST SP 800-57). Itu sebabnya ECC dipakai luas pada perangkat terbatas.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat tabel sederhana jumlah kunci untuk $n$ pengguna: simetri $n(n-1)/2$ vs kunci publik $2n$, lalu plot untuk $n$ hingga 1000.
> 2. Ukur waktu enkripsi 1 MB data dengan AES-256 dan RSA-2048 (blok demi blok) untuk melihat gap kecepatan dan alasan dipakainya hybrid.
>
> #### Bacaan Lanjutan
>
> - W. Diffie & M. Hellman, *"New Directions in Cryptography"*, IEEE Trans. Information Theory, 1976.
> - Simon Singh, *The Code Book*, Bab 6 (Alice and Bob Go Public).
