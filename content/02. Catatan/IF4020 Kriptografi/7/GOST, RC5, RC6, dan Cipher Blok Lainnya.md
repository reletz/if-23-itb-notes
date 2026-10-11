---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] GOST, RC5, RC6, dan Cipher Blok Lainnya
>
> > ## Questions/Cues
> >
> > - Apa itu GOST (Magma) dan apa bedanya dengan DES?
> > - Bagaimana key schedule dan fungsi $f$ GOST bekerja?
> > - Apa yang khas dari RC5 (parameter variabel, operasi rotasi bergantung data)?
> > - Bagaimana RC6 memperluas RC5?
> > - Apa ciri Blowfish, Serpent, Twofish, dan MARS?
> > - Cipher simetri mana yang direkomendasikan?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Review Beberapa Block Cipher, Bagian 3: GOST, RC5, RC6, Serpent, dll (Slides 2-37)
>
> > **Legenda warna diagram dan tabel:**
> >
> > - <span style="color:#8a4fd6">■ Ungu</span>: kotak-S / operasi non-linier (**confusion**)
> > - <span style="color:#1f8fa3">■ Teal</span>: rotasi / pergeseran (**diffusion**)
> > - <span style="color:#d9731a">■ Oranye</span>: XOR (⊕) dan penjumlahan modular (⊞)
> > - <span style="color:#7a8699">■ Abu-abu putus-putus</span>: kunci dan kunci putaran
> > - <span style="color:#4f6bed">■ Biru</span>: struktur Feistel
> > - <span style="color:#2f9e63">■ Hijau</span>: keluaran / pilihan yang direkomendasikan
> > - <span style="color:#d6454f">■ Merah</span>: tidak aman / tidak disarankan
> >
> > ### GOST (Magma)
> >
> > **GOST** = *Gosudarstvenny Standard* ("standar pemerintah"), tercantum dalam **GOST 28147-89** (RFC 5830). Cipher blok standar **Uni Soviet**, dikembangkan **1970** tetapi baru dirilis publik **1990** setelah Uni Soviet bubar; dibuat sebagai alternatif DES. Pada standar baru **GOST R 34.12-2015** (RFC 7801, 8891) cipher ini bernama **Magma**; standar itu juga menetapkan cipher blok 128-bit **Kuznyechik**. Struktur mirip DES: **jaringan Feistel**.
> >
> > - Blok **64 bit**, kunci **256 bit**, **32 putaran**.
> > - Hanya ada **8 kunci putaran** ($K_1 \dots K_8$, tiap 32 bit, hasil membagi kunci 256 bit menjadi 8 bagian); penjadwalan pada 32 putaran: **$K_1..K_8$ tiga kali** (putaran 1-24), lalu **$K_8..K_1$ terbalik** (putaran 25-32). Contoh kunci `abcdefghijklmnopqrstuvwxyz123456`: $K_1$ = `abcd`, $K_2$ = `efgh`, ..., $K_8$ = `3456`.
> >
> > |Putaran|1|2|3|4|5|6|7|8|
> > |---|---|---|---|---|---|---|---|---|
> > |1-8|$K_1$|$K_2$|$K_3$|$K_4$|$K_5$|$K_6$|$K_7$|$K_8$|
> > |9-16|$K_1$|$K_2$|$K_3$|$K_4$|$K_5$|$K_6$|$K_7$|$K_8$|
> > |17-24|$K_1$|$K_2$|$K_3$|$K_4$|$K_5$|$K_6$|$K_7$|$K_8$|
> > |25-32|<b style="color:#1f8fa3">$K_8$</b>|<b style="color:#1f8fa3">$K_7$</b>|<b style="color:#1f8fa3">$K_6$</b>|<b style="color:#1f8fa3">$K_5$</b>|<b style="color:#1f8fa3">$K_4$</b>|<b style="color:#1f8fa3">$K_3$</b>|<b style="color:#1f8fa3">$K_2$</b>|<b style="color:#1f8fa3">$K_1$</b>|
> >
> > Baris teal: delapan putaran terakhir memakai kunci **terbalik**. Tidak ada komputasi key schedule sama sekali, hanya pemotongan dan pengurutan.
> >
> > **Satu putaran**: $L_i = R_{i-1}$, $R_i = L_{i-1} \oplus f(R_{i-1}, K_i)$. Fungsi $f$:
> >
> > 1. **Penjumlahan modulo $2^{32}$**: $R_{i-1} + K_i$ (32 bit).
> > 2. **Substitusi**: dibagi **8 bagian 4 bit**, masing-masing ke **kotak-S** (8 kotak, tiap kotak permutasi 0..15; **4 bit masuk, 4 bit keluar**). Contoh S1: masukan `0010` (2) $\to$ elemen ke-2 = 9 = `1001`.
> > 3. **Geser sirkuler kiri 11 bit** hasil gabungan 32 bit, lalu XOR dengan $L_{i-1}$.
> >
> > ```mermaid
> > flowchart TD
> >     R["R(i-1)<br/>32 bit"] --> ADD(("⊞<br/>mod 2³²"))
> >     KI["Ki (32 bit)"] -.-> ADD
> >     ADD --> SB["8 kotak-S<br/>4 → 4 bit"]
> >     SB --> ROT["⋘ 11"]
> >     ROT --> X(("⊕"))
> >     L["L(i-1)"] --> X
> >     X --> RI["Ri"]
> >     R --> LI["Li = R(i-1)"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class R,L plain
> >     class ADD,X xor
> >     class KI key
> >     class SB sub
> >     class ROT perm
> >     class RI,LI out
> >     linkStyle 7 stroke:#4f6bed,stroke-width:2.5px
> > ```
> >
> > Bandingkan dengan fungsi $f$ DES ([[DES dan Triple DES]]): tidak ada ekspansi, kunci dicampur dengan **penjumlahan** (bukan XOR), dan P-box diganti satu **rotasi** 11 bit. Garis biru: jalur silang Feistel.
> >
> > Dekripsi kebalikan enkripsi (Feistel dari "bawah" ke "atas").
> >
> > **Perbedaan GOST vs DES:**
> >
> > | Aspek | DES | GOST |
> > |---|---|---|
> > | Kunci | <b style="color:#d6454f">56 bit</b> | <b style="color:#2f9e63">256 bit</b> (brute force jauh lebih sukar) |
> > | Putaran | 16 | **32** |
> > | Kotak-S | $6 \to 4$ bit | $4 \to 4$ bit |
> > | Key schedule | rumit | **sederhana** |
> > | Permutasi | tak teratur (P-box) | **geser sirkuler 11 bit** |
> >
> > ### RC5
> >
> > Dibuat **Ronald Rivest (1994)**, RSA Laboratories; RC6 (finalis AES) dikembangkan darinya. Khas: **ukuran blok, panjang kunci, dan jumlah putaran semuanya variabel**.
> >
> > | Parameter | Simbol | Nilai |
> > |---|---|---|
> > | Ukuran word (blok = 2 word) | $w$ | 16, 32, 64 bit |
> > | Jumlah putaran | $r$ | 0..255 |
> > | Panjang kunci (byte) | $b$ | 0..255 (0 sampai 2040 bit) |
> >
> > **Kunci putaran**: $t = 2r + 2$ word $S[0..t-1]$. Kunci $K$ disalin ke larik $L$ ($c$ word), lalu $S$ diinisialisasi dengan konstanta dari $e$ dan $\phi$ (rasio emas):
> >
> > $$S[0] = P_w,\quad S[i] = S[i-1] + Q_w \quad (P_{32} = \text{B7E15163},\ Q_{32} = \text{9E3779B9})$$
> >
> > $P_w = Odd[(e-2)2^w]$, $Q_w = Odd[(\phi-1)2^w]$. Akhirnya $L$ dan $S$ **dicampur** sebanyak $3 \max(r, c)$ iterasi (penjumlahan, rotasi 3, rotasi bergantung $X+Y$).
> >
> > **Enkripsi** (blok 64 bit, $A$ dan $B$ masing-masing 32 bit):
> >
> > $$A \leftarrow A + S[0], \quad B \leftarrow B + S[1]$$
> > $$\text{untuk } i = 1..r: \quad A \leftarrow ((A \oplus B) \lll B) + S[2i], \quad B \leftarrow ((B \oplus A) \lll A) + S[2i+1]$$
> >
> > Cipherteks = gabungan $A$ dan $B$. Kekhasan: **rotasi bergantung data** ($\lll B$, $\lll A$).
> >
> > ```mermaid
> > flowchart TD
> >     A["A"] --> X1(("⊕"))
> >     B["B"] --> X1
> >     X1 --> R1["⋘ B"]
> >     B -. jumlah rotasi .-> R1
> >     R1 --> P1(("⊞"))
> >     S1["S[2i]"] -.-> P1
> >     P1 --> A2["A baru"]
> >     B --> X2(("⊕"))
> >     A2 --> X2
> >     X2 --> R2["⋘ A"]
> >     A2 -. jumlah rotasi .-> R2
> >     R2 --> P2(("⊞"))
> >     S2["S[2i+1]"] -.-> P2
> >     P2 --> B2["B baru"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class A,B plain
> >     class X1,X2,P1,P2 xor
> >     class R1,R2 perm
> >     class S1,S2 key
> >     class A2,B2 out
> >     linkStyle 3,10 stroke:#d6454f,stroke-width:2.5px,stroke-dasharray:4 3
> > ```
> >
> > Hanya tiga operasi: ⊕, ⊞, dan ⋘ (teal). Garis merah putus-putus: **besar rotasi diambil dari data** ($\lg w$ bit terendah dari $B$ atau $A$), bukan konstanta. Itulah sumber non-linieritas RC5, karena tidak ada S-box.
> >
> > ### RC6
> >
> > Dibuat Rivest, Robshaw, Sidney, dan Yin (RSA Labs, 1998) untuk **kompetisi AES**. Pengembangan RC5: blok **128 bit** (4 register $A, B, C, D$ berukuran $w$ bit), kunci 128, 192, 256 hingga 2040 bit, key schedule identik dengan RC5. Operasi: XOR, penjumlahan, rotasi, plus **perkalian**. Dapat dipandang sebagai **dua RC5 paralel**. Fungsi $f(x) = x(2x + 1)$.
> >
> > ```
> > B = B + S[0];  D = D + S[1]
> > for i = 1 to r:
> >     t = (B * (2B + 1)) <<< lg w
> >     u = (D * (2D + 1)) <<< lg w
> >     A = ((A xor t) <<< u) + S[2i]
> >     C = ((C xor u) <<< t) + S[2i + 1]
> >     (A, B, C, D) = (B, C, D, A)
> > A = A + S[2r + 2];  C = C + S[2r + 3]
> > ```
> >
> > ```mermaid
> > flowchart TD
> >     B["B"] --> FB["f(B) = B(2B+1)<br/>⋘ lg w"] --> T["t"]
> >     D["D"] --> FD["f(D) = D(2D+1)<br/>⋘ lg w"] --> U["u"]
> >     A["A"] --> XA(("⊕ t")) --> RA["⋘ u"] --> PA(("⊞ S[2i]")) --> AN["A'"]
> >     C["C"] --> XC(("⊕ u")) --> RC["⋘ t"] --> PC(("⊞ S[2i+1]")) --> CN["C'"]
> >     T -.-> XA
> >     U -.-> XC
> >     U -.-> RA
> >     T -.-> RC
> >     AN --> SW["(A,B,C,D) ← (B,C,D,A)"]
> >     CN --> SW
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class A,B,C,D,T,U plain
> >     class FB,FD sub
> >     class XA,XC,PA,PC xor
> >     class RA,RC perm
> >     class AN,CN out
> >     class SW rnd
> > ```
> >
> > Dua jalur RC5 berdampingan: $(A, B)$ dan $(C, D)$, tetapi rotasinya **disilangkan** ($A$ dirotasi oleh $u$ dari $D$, $C$ oleh $t$ dari $B$). Perkalian $x(2x+1)$ (ungu) menggantikan S-box sebagai sumber non-linieritas.
> >
> > Dekripsi membalik langkah (pengurangan, rotasi kanan). Rotasi memakai $\lg w$ bit terendah dari operan.
> >
> > ### Cipher Blok Lainnya
> >
> > | Cipher | Perancang | Blok | Kunci | Putaran | Catatan |
> > |---|---|---|---|---|---|
> > | **Blowfish** | Bruce Schneier (1993) | 64 bit | 32-448 bit | 16 | 4 S-box, substitusi-permutasi |
> > | **Serpent** | Anderson, Biham, Knudsen | 128 bit | 128/192/256 | **32** | finalis AES, 8 S-box; IP awal, linear transformation |
> > | **Twofish** | Bruce Schneier | 128 bit | s.d. 256 | 16 | finalis AES; penerus Blowfish; 5 S-box |
> > | **MARS** | IBM | 128 bit | 128-448 (langkah 32) | 32 | finalis AES; forward mixing, backward mixing |
> >
> > **Pengelompokan menurut struktur:**
> >
> > ```mermaid
> > flowchart LR
> >     CB["Cipher blok"] --> FE["Feistel<br/>(separuh blok per putaran)"]
> >     CB --> SPN["SPN<br/>(seluruh blok per putaran)"]
> >     FE --> F1["DES, 3DES"]
> >     FE --> F2["GOST / Magma"]
> >     FE --> F3["Blowfish, Twofish"]
> >     FE --> F4["RC5, RC6, MARS<br/>(varian Feistel)"]
> >     SPN --> S1["AES / Rijndael"]
> >     SPN --> S2["Serpent"]
> >     SPN --> S3["Kuznyechik"]
> >     classDef root fill:#eef0f4,stroke:#7a8699,color:#15202e
> >     classDef fei fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef spn fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     class CB root
> >     class FE,F1,F2,F3,F4 fei
> >     class SPN,S1,S2,S3 spn
> > ```
> >
> > <span style="color:#4f6bed">■ Biru</span> = Feistel (dekripsi = enkripsi dengan kunci terbalik), <span style="color:#8a4fd6">■ ungu</span> = SPN (dekripsi butuh lapisan invers).
> >
> > ### Rekomendasi Cipher Simetri (ringkasan slide)
> >
> > | Cipher | Pembuat | Panjang kunci | Keterangan |
> > |---|---|---|---|
> > | Blowfish | Schneier | 1-448 bit | old and slow |
> > | DES | IBM | 56 bit | <b style="color:#d6454f">too weak to use now</b> |
> > | IDEA | Massey dan Xuejia | 128 bit | good, but patented |
> > | RC4 | Rivest | 1-2048 bit | <b style="color:#d6454f">caution: some keys are weak</b> |
> > | RC5 | Rivest | 128-256 bit | good, but patented |
> > | **Rijndael** | Daemen dan Rijmen | 128-256 bit | <b style="color:#2f9e63">best choice</b> |
> > | Serpent | Anderson, Biham, Knudsen | 128-256 bit | <b style="color:#2f9e63">very strong</b> |
> > | Triple DES | IBM | 168 bit | <b style="color:#2f9e63">second best choice</b> |
> > | Twofish | Schneier | 128-256 bit | <b style="color:#2f9e63">very strong; widely used</b> |
> >
> > Hijau = direkomendasikan, merah = hindari (tabel ini dari slide; saat ini 3DES juga sudah di-deprecate NIST, lihat [[DES dan Triple DES]]).

> [!cornell] #### Summary
>
> **GOST (Magma)**: cipher Feistel Soviet, blok 64 bit, **kunci 256 bit, 32 putaran**, hanya 8 kunci putaran yang dijadwalkan; fungsi $f$ = **penjumlahan mod $2^{32}$ $\to$ 8 kotak-S 4$\to$4 $\to$ geser sirkuler 11 bit**. Dibanding DES: kunci lebih panjang, putaran lebih banyak, key schedule sederhana, tanpa P-box. **RC5** (Rivest, 1994) berparameter variabel ($w$, $r$, $b$) dengan **rotasi bergantung data**: $A = ((A \oplus B) \lll B) + S[2i]$, kunci putaran $2r+2$ word dari konstanta $e$/$\phi$. **RC6** (finalis AES) memperluasnya ke blok 128 bit (4 register, dua RC5 paralel) dengan tambahan **perkalian** $x(2x+1)$. Cipher lain: **Blowfish** (64-bit blok, kunci s.d. 448), **Serpent** (32 putaran), **Twofish**, **MARS** (finalis AES). Dari daftar rekomendasi: **Rijndael** pilihan terbaik, **3DES** kedua, sedangkan **DES** terlalu lemah. Dari sini materi bergeser ke kriptografi kunci publik.

> [!ad-libitum]- Additional Information
>
> #### GOST Hari Ini
>
> **Kuznyechik** (GOST R 34.12-2015, blok 128 bit, kunci 256 bit, 10 putaran; struktur SPN seperti AES) menggantikan GOST 28147-89 sebagai standar Rusia, dipakai berdampingan dengan **Streebog** (hash). Kotak-S GOST 28147-89 tidak ditetapkan dalam standar (dijadikan parameter rahasia/pilihan), sehingga keamanannya bergantung pilihan S-box; pada 2011 ditemukan serangan reflection yang menurunkan kompleksitas jauh di bawah $2^{256}$ (masih tak praktis).
>
> #### Keamanan RC5/RC6
>
> RC5 bergantung pada **rotasi bergantung data** untuk melawan differential/linear cryptanalysis; dengan $r \ge 12$ pada $w = 32$ dianggap aman terhadap serangan differential. Label "patented" pada tabel slide berarti pemakaian komersial dulu butuh lisensi; Rijndael yang bebas royalti punya keunggulan tambahan dalam kompetisi AES.
>
> #### Blowfish dan Bcrypt
>
> Key schedule **Blowfish** yang lambat (mengisi S-box lewat enkripsi berulang) dimanfaatkan **bcrypt** untuk *password hashing* yang sengaja mahal komputasi. Blok 64 bit membuat Blowfish rentan **Sweet32**, jadi untuk enkripsi data pilih Twofish atau AES.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan GOST 28147-89 (32 putaran) dengan S-box dari RFC 4357, verifikasi dengan vektor uji, lalu bandingkan kode dan kecepatannya dengan DES.
> 2. Tulis RC5-32/12/16, uji vektor uji Rivest, dan ukur seberapa berbeda cipherteks bila satu bit kunci berubah (avalanche).
>
> #### Bacaan Lanjutan
>
> - R. Rivest, *"The RC5 Encryption Algorithm"*, 1994; Rivest et al., *"The RC6 Block Cipher"*, 1998.
> - RFC 5830 dan RFC 8891 (GOST).
> - B. Schneier, *Applied Cryptography*, bab tentang cipher blok.
