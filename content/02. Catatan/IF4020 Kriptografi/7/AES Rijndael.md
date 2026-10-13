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
> > **Legenda warna diagram dan tabel:**
> >
> > - <span style="color:#8a4fd6">■ Ungu</span>: SubBytes / SubWord (S-box, **confusion**)
> > - <span style="color:#1f8fa3">■ Teal</span>: ShiftRows, MixColumns, RotWord (**diffusion**)
> > - <span style="color:#d9731a">■ Oranye</span>: AddRoundKey dan XOR lain (⊕)
> > - <span style="color:#7a8699">■ Abu-abu putus-putus</span>: cipher key, round key, Rcon
> > - <span style="color:#4f6bed">■ Biru</span>: satu putaran utuh
> > - <span style="color:#2f9e63">■ Hijau</span>: keluaran (cipherteks / hasil)
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
> >     KE["KeyExpansion<br/>K0 .. K_Nr"] -.-> A0
> >     KE -.-> RD
> >     KE -.-> FR
> >     RD -. ulang Nr-1 kali .-> RD
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class PT plain
> >     class A0 xor
> >     class RD,FR rnd
> >     class KE key
> >     class CT out
> > ```
> >
> > **Isi satu putaran biasa:**
> >
> > ```mermaid
> > flowchart TD
> >     S0["State"] --> SB["SubBytes"] --> SR["ShiftRows"] --> MC["MixColumns"] --> ARK(("⊕<br/>AddRoundKey"))
> >     RK["Round key Ki"] -.-> ARK
> >     ARK --> S1["State baru"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class S0 plain
> >     class SB sub
> >     class SR,MC perm
> >     class ARK xor
> >     class RK key
> >     class S1 out
> > ```
> >
> > Satu ungu (confusion), dua teal (diffusion baris lalu kolom), satu oranye (kunci). Putaran akhir menghilangkan MixColumns.
> >
> > Data disimpan dalam **state**, matriks byte **$4 \times 4$** (untuk blok 128 bit); 16 byte masukan diisi **kolom demi kolom**, dan pada akhir state disalin ke cipherteks.
> >
> > |Baris|Kolom 0|Kolom 1|Kolom 2|Kolom 3|
> > |---|---|---|---|---|
> > |0|$in_0$|$in_4$|$in_8$|$in_{12}$|
> > |1|$in_1$|$in_5$|$in_9$|$in_{13}$|
> > |2|$in_2$|$in_6$|$in_{10}$|$in_{14}$|
> > |3|$in_3$|$in_7$|$in_{11}$|$in_{15}$|
> >
> > $s_{r,c} = in_{r + 4c}$: byte 0-3 mengisi kolom 0, byte 4-7 kolom 1, dst.
> >
> > ### Empat Transformasi
> >
> > **SubBytes** memetakan tiap byte state lewat **S-box** (substitusi non-linier, **confusion**). Contoh: `23` (baris 2, kolom 3) $\to$ `26`.
> >
> > **ShiftRows** menggeser **siklik ke kiri** baris state (**diffusion**): baris 0 tidak digeser, baris 1 sejauh 1 byte, baris 2 sejauh 2, baris 3 sejauh 3.
> >
> > |Baris|Geser|Sebelum|Sesudah|
> > |---|---|---|---|
> > |0|0|$s_{00}\ s_{01}\ s_{02}\ s_{03}$|$s_{00}\ s_{01}\ s_{02}\ s_{03}$|
> > |1|1|$s_{10}\ s_{11}\ s_{12}\ s_{13}$|$s_{11}\ s_{12}\ s_{13}$ <b style="color:#1f8fa3">$s_{10}$</b>|
> > |2|2|$s_{20}\ s_{21}\ s_{22}\ s_{23}$|$s_{22}\ s_{23}$ <b style="color:#1f8fa3">$s_{20}\ s_{21}$</b>|
> > |3|3|$s_{30}\ s_{31}\ s_{32}\ s_{33}$|$s_{33}$ <b style="color:#1f8fa3">$s_{30}\ s_{31}\ s_{32}$</b>|
> >
> > Teal = byte yang "memutar" dari kiri ke kanan. Setelah ShiftRows, tiap kolom berisi **satu byte dari tiap kolom asal**, sehingga MixColumns berikutnya mencampur keempat kolom.
> >
> > **MixColumns** mengalikan tiap kolom state dengan matriks tetap dalam **GF($2^8$)**:
> >
> > $$\begin{bmatrix} s'_0 \\ s'_1 \\ s'_2 \\ s'_3 \end{bmatrix} = \begin{bmatrix} 02 & 03 & 01 & 01 \\ 01 & 02 & 03 & 01 \\ 01 & 01 & 02 & 03 \\ 03 & 01 & 01 & 02 \end{bmatrix} \begin{bmatrix} s_0 \\ s_1 \\ s_2 \\ s_3 \end{bmatrix}$$
> >
> > Contoh kolom $(26, 7B, BD, 43)$: baris 1: $(02 \bullet 26) \oplus (03 \bullet 7B) \oplus (01 \bullet BD) \oplus (01 \bullet 43) = 4C \oplus 8D \oplus BD \oplus 43 =$ **3F**. Baris lain menghasilkan **4F, F9, 2A**. Perkalian dan penjumlahan dilakukan dalam GF($2^8$).
> >
> > |Baris matriks|$\bullet\,26$|$\bullet\,7B$|$\bullet\,BD$|$\bullet\,43$|$\oplus$ semua|
> > |---|---|---|---|---|---|
> > |`02 03 01 01`|`02•26 = 4C`|`03•7B = 8D`|`BD`|`43`|<b style="color:#2f9e63">3F</b>|
> > |`01 02 03 01`|`26`|`02•7B = F6`|`03•BD = DC`|`43`|<b style="color:#2f9e63">4F</b>|
> > |`01 01 02 03`|`26`|`7B`|`02•BD = 61`|`03•43 = C5`|<b style="color:#2f9e63">F9</b>|
> > |`03 01 01 02`|`03•26 = 6A`|`7B`|`BD`|`02•43 = 86`|<b style="color:#2f9e63">2A</b>|
> >
> > Tiap byte keluaran bergantung pada **keempat** byte masukan kolom. Perkalian `02•` = geser kiri 1 bit (XOR `1B` bila bit teratas 1, mis. `02•BD`); `03•x` = `(02•x) ⊕ x`.
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
> > ```mermaid
> > flowchart TD
> >     W1["w[i-1]"] --> RW["RotWord<br/>geser 1 byte kiri"]
> >     RW --> SW["SubWord<br/>S-box tiap byte"]
> >     SW --> XR(("⊕"))
> >     RC["Rcon[i/4]"] -.-> XR
> >     XR --> T["temp = g(w[i-1])"]
> >     T --> X2(("⊕"))
> >     W4["w[i-4]"] --> X2
> >     X2 --> WI["w[i]"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class W1,W4,T plain
> >     class RW perm
> >     class SW sub
> >     class XR,X2 xor
> >     class RC key
> >     class WI out
> > ```
> >
> > Jalur di atas hanya untuk $i$ kelipatan 4 (fungsi $g$). Untuk $i$ lain, $temp = w[i-1]$ langsung di-XOR dengan $w[i-4]$.
> >
> > |Putaran $j$|1|2|3|4|5|6|7|8|9|10|
> > |---|---|---|---|---|---|---|---|---|---|---|
> > |$RC[j]$|`01`|`02`|`04`|`08`|`10`|`20`|`40`|`80`|<b style="color:#1f8fa3">`1B`</b>|<b style="color:#1f8fa3">`36`</b>|
> > |Word yang dibentuk|w4-7|w8-11|w12-15|w16-19|w20-23|w24-27|w28-31|w32-35|w36-39|w40-43|
> >
> > Teal: setelah `80`, penggandaan meluap dan direduksi modulo $f(x)$ sehingga menjadi `1B`, lalu `36`.
> >
> > **AES-256** berbeda dalam: 14 putaran, kunci 256 bit, dan key expansion (bila $i \bmod 8 = 0$: RotWord$\to$SubWord$\to$Rcon; bila $i \bmod 8 = 4$: **SubWord saja**).
> >
> > ### Dekripsi
> >
> > Membalik tiap langkah: **InvSubBytes** (S-box invers), **InvShiftRows** (geser ke **kanan**), **InvMixColumns** (matriks invers `0E 0B 0D 09`), dan AddRoundKey (XOR, sama), dengan urutan round key terbalik.
> >
> > ```mermaid
> > flowchart TD
> >     C["Cipherteks"] --> A0(("⊕ K_Nr"))
> >     A0 --> ISR["InvShiftRows"] --> ISB["InvSubBytes"] --> A1(("⊕ Ki")) --> IMC["InvMixColumns"]
> >     IMC -. ulang i = Nr-1 sampai 1 .-> ISR
> >     IMC --> L["InvShiftRows,<br/>InvSubBytes,<br/>⊕ K0"] --> P["Plainteks"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class C plain
> >     class A0,A1 xor
> >     class ISR,IMC perm
> >     class ISB sub
> >     class L rnd
> >     class P out
> > ```
> >
> > Berbeda dengan Feistel, SPN **butuh algoritma dekripsi sendiri**: tiap lapisan harus dibalik (S-box invers, matriks invers), bukan sekadar membalik urutan kunci.
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
