---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Playfair dan Affine Cipher
>
> > ## Questions/Cues
> >
> > - Apa itu polygram cipher dan mengapa Playfair bekerja per bigram?
> > - Bagaimana menyusun matriks kunci Playfair $5 \times 5$ dan mengapa huruf J dibuang?
> > - Apa langkah preprocessing pesan dan tiga aturan enkripsi Playfair?
> > - Bagaimana rumus Affine cipher dan syarat kuncinya?
> > - Bagaimana dekripsi Affine memakai invers modulo?
> > - Bagaimana kedua cipher ini dikriptanalisis?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Klasik Bagian 2 (Slides 66-94)
>
> > ### Playfair Cipher — Polygram
> >
> > Ditemukan **Charles Wheatstone** (1854), dipromosikan **Baron Lyon Playfair**. Termasuk **polygram cipher**: satu **blok** huruf plainteks disubstitusi dengan satu blok cipherteks. Playfair bekerja per **bigram** (2 huruf) — mis. `AS → RT`, `BY → SL`.
> >
> > ### Matriks Kunci $5 \times 5$
> >
> > Kunci disusun sebagai matriks $5 \times 5$ berisi huruf A–Z. Karena hanya 25 sel untuk 26 huruf, **huruf J dibuang** (secara historis I dan J tak dibedakan; semua J diperlakukan sebagai I). Jumlah kemungkinan matriks: $25! \approx 1{,}55 \times 10^{25}$.
> >
> > Contoh kunci dari kalimat `JALAN GANESHA SEPULUH`: buang duplikat & J → `ALNGESHPU`, sambung sisa alfabet (tanpa J) → `ALNGESHPUBCDFIKMOQRTVWXYZ`:
> >
> > ```
> > A L N G E
> > S H P U B
> > C D F I K
> > M O Q R T
> > V W X Y Z
> > ```
> >
> > ### Preprocessing Pesan
> >
> > 1. Buang semua spasi.
> > 2. Ganti `j` dengan `i`.
> > 3. Tulis pesan berpasangan (bigram).
> > 4. Jika sebuah bigram berisi dua huruf sama, sisipkan `x` di tengahnya.
> > 5. Jika jumlah huruf ganjil, tambahkan `x` di akhir.
> >
> > Contoh `temui ibu nanti malam` → `te mu ii bu na nt im al am` → (sisip x) `te mu ix ib un an ti ma la m` → (padding) `te mu ix ib un an ti ma la mx`.
> >
> > ### Tiga Aturan Enkripsi
> >
> > ```mermaid
> > flowchart TD
> >     B["Bigram (h1, h2)"] --> Q1{"Sebaris?"}
> >     Q1 -- ya --> R1["Ganti tiap huruf dengan<br/>huruf di KANANnya (siklik)"]
> >     Q1 -- tidak --> Q2{"Sekolom?"}
> >     Q2 -- ya --> R2["Ganti tiap huruf dengan<br/>huruf di BAWAHnya (siklik)"]
> >     Q2 -- tidak --> R3["Aturan persegi panjang:<br/>tiap huruf → perpotongan barisnya<br/>dengan kolom huruf pasangannya"]
> > ```
> >
> > 1. **Sebaris** — tiap huruf diganti huruf di **kanannya** (siklik). Mis. `di → FK`.
> > 2. **Sekolom** — tiap huruf diganti huruf di **bawahnya** (siklik). Mis. `nq → PX`.
> > 3. **Persegi panjang** — huruf pertama diganti huruf pada perpotongan **barisnya** dengan **kolom huruf kedua**; huruf kedua diganti dari sudut keempat persegi panjang. Mis. `hz → BW`.
> >
> > Hasil: `temui ibu nanti malam` → bigram `te mu ix ib un an ti ma la mx` → cipherteks `ZB RS FY KU PG LG RK VS NL QV`.
> >
> > **Dekripsi** membalik: sebaris → geser **kiri**; sekolom → geser **atas**; persegi panjang → aturan sama; terakhir buang `x` yang tak bermakna.
> >
> > ### Kriptanalisis Playfair
> >
> > Ada $26 \times 26 = 676$ bigram, jadi identifikasi bigram individual **lebih sukar** dari huruf tunggal. Tetapi ukuran poligramnya **hanya 2** — tetap tidak aman:
> >
> > - Dapat dipecahkan dengan **analisis frekuensi pasangan huruf** (TH, HE tersering di B. Inggris) bila cipherteks cukup banyak.
> > - **Bigram dan kebalikannya** (AB vs BA) menghasilkan pola plainteks bertukar (RE vs ER) — bahasa Inggris penuh kata seperti re**ceiv**er, de**part**ed.
> > - Dari dugaan (mis. cipherteks `BM` sering → plainteks `TH`), rekonstruksi **matriks parsial** dengan menguji aturan baris/kolom/persegi panjang.
> >
> > ### Affine Cipher
> >
> > Perluasan Caesar cipher dengan **dua parameter kunci** $m$ dan $b$:
> >
> > $$\text{Enkripsi: } C = (mP + b) \bmod n \qquad \text{Dekripsi: } P = m^{-1}(C - b) \bmod n$$
> >
> > dengan $n$ = ukuran alfabet, $b$ = pergeseran, dan **$m$ harus relatif prima dengan $n$** ($\gcd(m, n) = 1$) agar $m^{-1} \bmod n$ ada. Caesar cipher = kasus khusus $m = 1$.
> >
> > Contoh, plainteks `kripto` = $(10, 17, 8, 15, 19, 14)$, $n = 26$, $m = 7$, $b = 10$:
> >
> > - $c_1 = (7 \cdot 10 + 10) \bmod 26 = 80 \bmod 26 = 2 = C$
> > - $c_2 = (7 \cdot 17 + 10) \bmod 26 = 129 \bmod 26 = 25 = Z$
> >
> > → cipherteks `CZOLNE`. **Dekripsi**: $7^{-1} \bmod 26 = 15$ (sebab $7 \cdot 15 = 105 \equiv 1$), jadi $P = 15(C - 10) \bmod 26$. Cek $c_1 = 2$: $P = 15(2 - 10) = -120 \equiv 10 \pmod{26} = k$. ✓
> >
> > ### Kriptanalisis Affine
> >
> > - **Known-plaintext attack** — dua pasang $(P_1, C_1)$, $(P_2, C_2)$ memberi kekongruenan simultan $C_1 \equiv mP_1 + b$, $C_2 \equiv mP_2 + b \pmod n$; kurangkan → $m$, substitusi → $b$. Contoh: $C \leftrightarrow K$, $E \leftrightarrow O$ memberi $2 \equiv 10m + b$, $4 \equiv 14m + b$ → $2 \equiv 4m$ → $m = 7$, lalu $b = 10$.
> > - **Exhaustive key search** — hanya $12 \times 25 = 300$ kombinasi ($12$ nilai $m$ relatif prima dengan 26, $25$ nilai $b$). Sangat sedikit.
> > - **Memperbesar faktor kerja** — enkripsi per **blok huruf**, bukan huruf individual. Blok 4-huruf `krip` → $10170815$, pakai modulus $n = 25252525$ (`ZZZZ`), $m$ relatif prima dengan $n$ (mis. $21035433$).

> [!cornell] #### Summary
>
> **Playfair cipher** (Wheatstone, 1854) adalah polygram cipher yang mengenkripsi **per bigram** memakai **matriks kunci $5 \times 5$** (huruf J dibuang, diperlakukan sebagai I). Setelah preprocessing (buang spasi, `j→i`, pisah bigram kembar dengan `x`, padding `x`), tiap bigram dienkripsi dengan **tiga aturan**: sebaris → geser kanan; sekolom → geser bawah; selainnya → aturan persegi panjang. Ia dipecahkan dengan **analisis frekuensi bigram** dan kelemahan bigram-terbalik. **Affine cipher** menggeneralisasi Caesar: $C = (mP + b) \bmod n$ dengan $\gcd(m, n) = 1$; dekripsi $P = m^{-1}(C - b) \bmod n$ butuh **invers modulo** (lihat [[Teori Bilangan untuk Kriptografi]]). Affine jatuh oleh **known-plaintext attack** (2 pasang huruf cukup) atau *brute force* atas hanya 300 kunci. Cipher poligram berbasis aljabar linier yang lebih kuat adalah Hill cipher — [[Hill Cipher dan Enigma Cipher]].

> [!ad-libitum]- Additional Information
>
> #### Mengapa $m$ Harus Relatif Prima dengan $n$
>
> Bila $\gcd(m, n) = d > 1$, fungsi $P \mapsto mP \bmod n$ **tidak injektif** — beberapa plainteks berbeda memetakan ke cipherteks sama, sehingga dekripsi mustahil. Untuk $n = 26$, nilai $m$ yang valid: $\{1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25\}$ (12 nilai, yaitu $\varphi(26)$).
>
> #### Playfair di Medan Perang
>
> Playfair dipakai Inggris pada Perang Boer dan PD I, serta Australia pada PD II — bukan karena tak bisa dipecahkan, tetapi karena **cukup cepat dipakai di lapangan** dan pesan taktis kedaluwarsa dalam hitungan jam, lebih singkat dari waktu yang dibutuhkan kriptanalis. Ini pelajaran penting: keamanan hanya perlu bertahan selama nilai pesan.
>
> #### Affine sebagai Jembatan ke Hill
>
> Affine cipher $C = mP + b$ atas skalar diperluas Hill cipher menjadi $C = KP + b$ (biasanya $b = 0$) atas **vektor**, dengan $K$ matriks dan syarat $\gcd(\det K, n) = 1$ menggantikan $\gcd(m, n) = 1$. Struktur linier yang membuat keduanya elegan juga yang membuat keduanya rapuh terhadap known-plaintext.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan Playfair lengkap (encode/decode + generator matriks kunci) dan pemecah semi-otomatis berbasis frekuensi bigram.
> 2. Tulis known-plaintext solver Affine yang menerima dua pasang huruf dan mengembalikan $(m, b)$; tangani kasus tanpa solusi unik.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 3.2 (Playfair, Hill).
> - Demo: `planetcalc.com/7751` (Playfair), `cryptii.com/pipes/affine-cipher`.
