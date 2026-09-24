---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] AES Rijndael
>
> > ## Questions/Cues
> >
> > - Mengapa AES dibuat dan bagaimana kompetisinya berlangsung?
> > - Apa persyaratan AES dan siapa saja finalisnya?
> > - Apa beda AES-128/192/256 (kunci, blok, putaran)?
> > - Apa saja empat transformasi Rijndael (SubBytes, ShiftRows, MixColumns, AddRoundKey)?
> > - Bagaimana aritmetika GF(2⁸) dipakai pada MixColumns dan S-box?
> > - Bagaimana kunci putaran dibangkitkan dan bagaimana dekripsi dilakukan?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Review Beberapa Block Cipher, Bagian 2: AES (Slides 1-52 dan Lampiran GF(2^m))
>
> > ### Latar Belakang dan Kompetisi
> >
> > DES dianggap tidak aman (kunci dapat di-brute-force). **NIST** mengadakan kompetisi terbuka untuk standar baru, yaitu **AES** (*Advanced Encryption Standard*).
> >
> > **Persyaratan AES:**
> >
> > 1. Cipher blok simetri.
> > 2. Rancangan **publik** (tidak ada yang disembunyikan).
> > 3. Panjang kunci fleksibel: **128, 192, 256 bit**.
> > 4. Ukuran blok **128 bit**.
> > 5. Dapat diimplementasikan di **perangkat lunak maupun keras**.
> >
> > **Lima finalis:** **Rijndael** (Vincent Rijmen dan Joan Daemen, Belgia, **86 suara**), **Serpent** (Anderson, Biham, Knudsen; 59), **Twofish** (Bruce Schneier; 31), **RC6** (RSA Labs; 23), **MARS** (IBM; 13). **Oktober 2000** NIST memilih **Rijndael** (dibaca "Rhine-doll"); **November 2001** ditetapkan sebagai AES. Diharapkan dominan minimal 10 tahun.
> >
> > ### Spesifikasi
> >
> > Rijndael mendukung kunci 128-256 bit (kelipatan 32) dan **ukuran blok independen dari kunci**. AES membatasi blok 128 bit dan kunci 128/192/256 (1 word = 32 bit):
> >
> > | | Kunci ($N_k$ word) | Blok ($N_b$ word) | Putaran ($N_r$) |
> > |---|---|---|---|
> > | AES-128 | 4 | 4 | 10 |
> > | AES-192 | 6 | 4 | 12 |
> > | AES-256 | 8 | 4 | 14 |
> >
> > Secara de-facto hanya AES-128 dan AES-256 yang dipakai. Ruang kunci 128-bit: $2^{128} = 3{,}4 \times 10^{38}$. Pada satu juta kunci per detik, seluruhnya butuh $\approx 1{,}08 \times 10^{25}$ tahun (rata-rata setengahnya, $5{,}4 \times 10^{24}$ tahun, angka slide); AES tahan brute force.
> >
> > ### Struktur Rijndael
> >
> > Berorientasi **byte** (DES berorientasi bit), **bukan jaringan Feistel** (struktur SPN). Untuk blok dan kunci 128 bit:
> >
> > 1. **AddRoundKey** awal: XOR state dengan cipher key.
> > 2. **$N_r - 1$ putaran** biasa: **SubBytes $\to$ ShiftRows $\to$ MixColumns $\to$ AddRoundKey**.
> > 3. **Putaran akhir**: SubBytes $\to$ ShiftRows $\to$ AddRoundKey (**tanpa MixColumns**).
> >
> > ```mermaid
> > flowchart TD
> >     PT["Plainteks 128 bit"] --> A0["AddRoundKey (K0)"]
> >     A0 --> RD["Putaran 1..Nr-1:<br/>SubBytes, ShiftRows,<br/>MixColumns, AddRoundKey"]
> >     RD --> FR["Putaran akhir:<br/>SubBytes, ShiftRows,<br/>AddRoundKey"]
> >     FR --> CT["Cipherteks 128 bit"]
> > ```
> >
> > Data disimpan dalam **state**, matriks byte **$4 \times 4$** (untuk blok 128 bit); 16 byte masukan diisi **kolom demi kolom**, dan pada akhir state disalin ke cipherteks.
> >
> > ### Empat Transformasi
> >
> > **SubBytes** memetakan tiap byte state lewat **S-box** (substitusi non-linier, **confusion**). Contoh: `23` (baris 2, kolom 3) $\to$ `26`.
> >
> > **ShiftRows** menggeser **siklik ke kiri** baris state (**diffusion**): baris 0 tidak digeser, baris 1 sejauh 1 byte, baris 2 sejauh 2, baris 3 sejauh 3.
> >
> > **MixColumns** mengalikan tiap kolom state dengan matriks tetap dalam **GF($2^8$)**:
> >
> > $$\begin{bmatrix} s'_0 \\ s'_1 \\ s'_2 \\ s'_3 \end{bmatrix} = \begin{bmatrix} 02 & 03 & 01 & 01 \\ 01 & 02 & 03 & 01 \\ 01 & 01 & 02 & 03 \\ 03 & 01 & 01 & 02 \end{bmatrix} \begin{bmatrix} s_0 \\ s_1 \\ s_2 \\ s_3 \end{bmatrix}$$
> >
> > Contoh kolom $(26, 7B, BD, 43)$: baris 1: $(02 \bullet 26) \oplus (03 \bullet 7B) \oplus (01 \bullet BD) \oplus (01 \bullet 43) = 4C \oplus 8D \oplus BD \oplus 43 = $ **3F**. Baris lain menghasilkan **4F, F9, 2A**. Perkalian dan penjumlahan dilakukan dalam GF($2^8$).
> >
> > **AddRoundKey** meng-XOR state dengan round key.
> >
> > ### S-box: Dibangun, Bukan Acak
> >
> > S-box terlihat acak tetapi dihitung: (1) isi tabel naik `00..FF`; (2) tiap nilai diganti **inversnya di GF($2^8$)** (`00` tetap `00`); (3) ubah ke vektor bit; (4) kalikan dengan **matriks affine** dan tambah konstanta `63`; (5) konversi ke hex. Contoh `S(00) = 63`, `S(01) = 7C`.
> >
> > ### Galois Field GF($2^m$)
> >
> > Elemen GF($2^m$) adalah string biner $b_{m-1} \dots b_0$ yang dipandang sebagai **polinom** $b_{m-1}x^{m-1} + \dots + b_1 x + b_0$. Contoh `01010111` = $x^6 + x^4 + x^2 + x + 1$.
> >
> > - **Penjumlahan** = koefisien dijumlahkan mod 2 = **XOR**. Contoh: `0D` + `06` = `0B`; `57` + `83` = `D4`.
> > - **Perkalian** = perkalian polinom, direduksi modulo **polinom irreducible** derajat $m$. Rijndael memakai
> >
> > $$f(x) = x^8 + x^4 + x^3 + x + 1$$
> >
> > Contoh `57 . 83`: hasil $x^{13} + x^{11} + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + 1 \bmod f(x) = x^7 + x^6 + 1$ = `C1`.
> > - Contoh MixColumns: $02 \bullet 26 = x \cdot (x^5 + x^2 + x) = x^6 + x^3 + x^2 = $ `4C`; $03 \bullet 7B = 8D$.
> >
> > ### Key Expansion
> >
> > Kunci putaran dibangkitkan oleh **KeyExpansion** dari cipher key. Untuk AES-128: kunci 16 byte disalin ke $w[0..3]$ (word 4 byte), lalu untuk $i = 4..43$: $temp = w[i-1]$; bila $i$ **kelipatan 4** terapkan fungsi $g$: **RotWord** (geser 1 byte kiri) $\to$ **SubWord** (S-box) $\to$ **XOR Rcon[$i/4$]**; kemudian $w[i] = w[i-4] \oplus temp$. **Rcon**: `01, 02, 04, 08, 10, 20, 40, 80, 1B, 36` ($RC[j] = 2 \bullet RC[j-1]$ di GF($2^8$)).
> >
> > **AES-256** berbeda dalam: 14 putaran, kunci 256 bit, dan key expansion (bila $i \bmod 8 = 0$: RotWord$\to$SubWord$\to$Rcon; bila $i \bmod 8 = 4$: **SubWord saja**).
> >
> > ### Dekripsi
> >
> > Membalik tiap langkah: **InvSubBytes** (S-box invers), **InvShiftRows** (geser ke **kanan**), **InvMixColumns** (matriks invers `0E 0B 0D 09`), dan AddRoundKey (XOR, sama), dengan urutan round key terbalik.
> >
> > ### Contoh Program (Python, pycryptodome)
> >
> > Enkripsi AES-CBC: bangkitkan **IV acak 16 byte**, `pad` plainteks ke kelipatan 16 byte, `AES.new(kunci, AES.MODE_CBC, iv).encrypt(...)`, lalu simpan **IV + cipherteks** (mis. Base64). Dekripsi: ambil IV dari 16 byte awal, dekripsi, lalu `unpad`. Kunci harus 16 karakter untuk AES-128.

> [!cornell] #### Summary
>
> **AES** lahir dari kompetisi terbuka NIST untuk menggantikan DES: kunci 128/192/256, blok 128 bit, rancangan publik. Dari lima finalis (Rijndael, Serpent, Twofish, RC6, MARS), **Rijndael** (Daemen dan Rijmen) dipilih Oktober 2000 dan distandarkan November 2001. **AES-128/192/256** memakai **10/12/14 putaran**. Rijndael berorientasi byte dan **bukan Feistel**: state $4 \times 4$ byte melalui **AddRoundKey awal**, lalu putaran **SubBytes (S-box, confusion) $\to$ ShiftRows (diffusion baris) $\to$ MixColumns (matriks di GF($2^8$), diffusion kolom) $\to$ AddRoundKey**, dengan putaran akhir tanpa MixColumns. S-box dibangun dari **invers di GF($2^8$) + transformasi affine**, aritmetika GF memakai $f(x) = x^8 + x^4 + x^3 + x + 1$. **KeyExpansion** memakai RotWord, SubWord, dan Rcon; dekripsi memakai transformasi invers. AES-128 tahan brute force ($2^{128}$ kunci). Cipher blok lain dibahas di [[GOST, RC5, RC6, dan Cipher Blok Lainnya]].

> [!ad-libitum]- Additional Information
>
> #### AES dalam Praktik
>
> Prosesor modern punya instruksi **AES-NI** yang menjalankan satu putaran per instruksi (puluhan GB/s), serta **ARMv8 Crypto Extensions**. Pemakaian standar: **AES-GCM** di TLS 1.2/1.3, **AES-XTS** di enkripsi disk (BitLocker, LUKS), **AES-CCM** di Wi-Fi WPA2, dan enkripsi file/basisdata ([[Konsep Cipher Blok dan Mode Operasi]]). AES-256 dipakai NSA untuk data TOP SECRET (CNSA).
>
> #### Serangan pada AES
>
> Tidak ada serangan praktis pada AES penuh. **Biclique attack** (2011) hanya menurunkan kerja dari $2^{128}$ menjadi $2^{126{,}1}$ (secara teori). **Side-channel** jauh lebih nyata: **cache-timing attack** (Bernstein 2005) pada implementasi berbasis tabel, karena itu dipakai AES-NI atau implementasi *bitsliced* konstan waktu ([[Serangan Pasif, Aktif, dan Side-Channel]]). Ancaman kuantum: algoritma Grover menurunkan keamanan AES-128 menjadi $\approx 2^{64}$, jadi AES-256 lebih disarankan untuk jangka panjang.
>
> #### Catatan pada Slide
>
> Slide menulis waktu brute force AES pada $10^6$ kunci per milidetik sebagai $5{,}4 \times 10^{18}$ tahun; hitung ulang: $2^{127} / (10^9/\text{s}) \approx 5{,}4 \times 10^{21}$ tahun. Kesimpulan tetap sama: praktis mustahil.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan AES-128 dari nol (SubBytes, ShiftRows, MixColumns di GF($2^8$), KeyExpansion) dan validasi dengan vektor uji FIPS-197 Appendix B.
> 2. Hitung tabel S-box sendiri dari invers GF($2^8$) + matriks affine dan cocokkan dengan tabel standar; lalu tunjukkan bahwa `S(23) = 26`.
>
> #### Bacaan Lanjutan
>
> - FIPS PUB 197, *Advanced Encryption Standard*, 2001.
> - J. Daemen & V. Rijmen, *The Design of Rijndael*, Springer, 2002.
> - Demo: `encode-decode.com/aes128-encrypt-online`.
