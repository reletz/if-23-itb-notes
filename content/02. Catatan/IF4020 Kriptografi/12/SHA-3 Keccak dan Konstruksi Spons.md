---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] SHA-3 Keccak dan Konstruksi Spons
>
> > ## Questions/Cues
> >
> > - Mengapa NIST mengadakan kompetisi SHA-3 dan siapa pemenangnya?
> > - Apa yang membedakan Keccak dari finalis lain (konstruksi spons)?
> > - Apa arti $r$ (bitrate), $c$ (capacity), dan $b = r + c$?
> > - Bagaimana fase absorbing dan squeezing bekerja?
> > - Langkah apa saja pada fungsi permutasi Keccak-f?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Beberapa Fungsi Hash (Slides 40-61)
>
> > ### Latar Belakang dan Kompetisi
> >
> > Seperti sejarah AES, **NIST** menyelenggarakan **kompetisi terbuka** untuk fungsi hash baru bernama **SHA-3**, sebagai **pelengkap** SHA-1 dan SHA-2. Kompetisi diumumkan pada **2007** dan berakhir **Oktober 2012**.
> >
> > | Tahap | Jumlah |
> > |---|---|
> > | Submission | 64 rancangan |
> > | Putaran pertama (penyisihan) | 51 |
> > | Putaran kedua (semi final) | 14 |
> > | Final | 5 finalis |
> >
> > **Lima finalis**: 
> > - **BLAKE** (digest 224/256/384/512; 14 atau 16 putaran), 
> > - **Grøstl** (256/512), 
> > - **JH** (224/256/384/512; Hongjun Wu), 
> > - **Keccak** (digest sembarang; Bertoni, Daemen, Peeters, Van Assche) dan 
> > - **Skein** (digest sembarang; Schneier dkk.; 72 atau 80 putaran). 
> >
> > **Pemenang: Keccak**, terpilih sebagai SHA-3. Nama "Keccak" berasal dari **Kecak**, tari dari Bali.
> >
> > ### Konstruksi Spons (Sponge)
> >
> > Berbeda dari finalis lain yang bertumpu pada **fungsi kompresi** (Merkle-Damgård, [[SHA-1 dan Konstruksi Merkle-Damgard]]), Keccak memakai **konstruksi spons** dengan **fungsi permutasi** (bukan kompresi) yang "menyerap" masukan lalu "memeras" digest. NIST menilai pendekatan yang berbeda justru lebih baik.
> >
> > **Parameter**:
> >
> > - $d$ = panjang digest yang diinginkan (bit); $r$ = **bitrate**, ukuran blok masukan/keluaran per iterasi.
> > - $c$ = **capacity**, bagian state yang tidak dipakai langsung untuk absorb/squeeze dan **menentukan keamanan** (makin besar $c$ makin tinggi ketahanan).
> > - $b = r + c$ = ukuran total state $S$.
> >
> > **SHA3-256**: $r = 1088$ bit (136 byte), $c = 512$ bit (64 byte), $b = 1088 + 512 = 1600$ bit.
> >
> > **Praproses**: 
> > ![[Pasted image 20261020165041.png]]
> > pesan $M$ di-padding menjadi $P$ yang panjangnya kelipatan $r$; $P$ dipecah menjadi blok $P_i$ berukuran $r$ bit; state $S$ (sebesar $b$ bit) diisi nol.
> >
> >![[Pasted image 20261020165213.png]]
> >
> > **Fase penyerapan (absorbing)**: untuk tiap blok $P_i$, XOR-kan dengan $r$ bit pertama $S$, lalu seluruh $S$ ($r + c$ bit) dimasukkan ke permutasi $f$ menghasilkan $S$ baru. Setelah semua blok diproses, beralih ke fase pemerasan.
> >
> > **Fase pemerasan (squeezing)**: $Z$ diinisialisasi kosong. Selama $|Z| < d$: sambungkan $r$ bit pertama $S$ ke $Z$; bila $|Z|$ masih $< d$, jalankan $S \leftarrow f(S)$.
> >
> > **Catatan keamanan**: $c$ bit terakhir state **tidak pernah dipengaruhi langsung** oleh blok masukan dan **tidak pernah keluar** saat pemerasan, sehingga mencegah kolisi.
> >
> > ```mermaid
> > flowchart TD
> >     subgraph ABS["Absorbing"]
> >         direction LR
> >         S0["S = 0<br/>(r+c bit)"] --> X1["XOR P1<br/>(ke r bit)"] --> F1["f"]
> >         F1 --> X2["XOR P2"] --> F2["f"]
> >     end
> >     subgraph SQZ["Squeezing"]
> >         direction LR
> >         Z1["ambil r bit<br/>→ Z"] --> G1["f"] --> Z2["ambil r bit<br/>→ Z"]
> >     end
> >     F2 --> Z1
> > ```
> >
> > ### Fungsi Permutasi Keccak-f
> >
> > Keccak-f menjalankan sejumlah putaran `Round`, masing-masing lima langkah pada state $A[x, y]$ (matriks $5 \times 5$ dari word):
> >
> > | Langkah | Operasi |
> > |---|---|
> > | $\theta$ | $C[x] = \bigoplus_y A[x,y]$; $D[x] = C[x-1] \oplus \text{rot}(C[x+1], 1)$; $A[x,y] \mathrel{\oplus}= D[x]$ |
> > | $\rho, \pi$ | rotasi tiap word dengan offset berbeda, lalu permutasi posisi: $B[y, 2x+3y] = \text{rot}(A[x,y], r[x,y])$ |
> > | $\chi$ | $A[x,y] = B[x,y] \oplus (\lnot B[x+1,y] \wedge B[x+2,y])$ (satu-satunya langkah **non-linear**) |
> > | $\iota$ | $A[0,0] \mathrel{\oplus}= RC$ (konstanta putaran) |
> >
> > **Pseudocode Keccak (slide 58-59)**:
> >
> > ```
> > Keccak[r,c](Mbytes || Mbits) {
> >   # Padding
> >   d = 2^|Mbits| + sum for i=0..|Mbits|-1 of 2^i * Mbits[i]
> >   P = Mbytes || d || 0x00 || ... || 0x00
> >   P = P xor (0x00 || ... || 0x00 || 0x80)
> >
> >   # Initialization
> >   S[x,y] = 0, for (x,y) in (0..4, 0..4)
> >
> >   # Absorbing phase
> >   for each block Pi in P
> >     S[x,y] = S[x,y] xor Pi[x+5*y], for (x,y) such that x+5*y < r/w
> >     S = Keccak-f[r+c](S)
> >
> >   # Squeezing phase
> >   Z = empty string
> >   while output is requested
> >     Z = Z || S[x,y], for (x,y) such that x+5*y < r/w
> >     S = Keccak-f[r+c](S)
> >   return Z
> > }
> >
> > Keccak-f[b](A) {
> >   for i in 0..n-1: A = Round[b](A, RC[i])
> >   return A
> > }
> >
> > Round[b](A, RC) {
> >   # theta
> >   C[x] = A[x,0] xor A[x,1] xor A[x,2] xor A[x,3] xor A[x,4]
> >   D[x] = C[x-1] xor rot(C[x+1], 1)
> >   A[x,y] = A[x,y] xor D[x]
> >   # rho and pi
> >   B[y, 2*x+3*y] = rot(A[x,y], r[x,y])
> >   # chi
> >   A[x,y] = B[x,y] xor ((not B[x+1,y]) and B[x+2,y])
> >   # iota
> >   A[0,0] = A[0,0] xor RC
> >   return A
> > }
> > ```
> >
> > Keterangan: $w$ adalah ukuran satu *lane* (word) state; state $b = 25w$ bit disusun sebagai matriks $5 \times 5$ lane (untuk $b = 1600$, $w = 64$). Padding menambahkan bit penanda `d`, nol, lalu mengatur bit tertinggi blok terakhir menjadi `0x80`; sumber: `keccak.team/keccak_specs_summary.html`.
> >
> > Pada demo daring (`emn178.github.io/online-tools/keccak_256.html`) tersedia pula **SHA3-224/256/384/512**, **Keccak-224/256/384/512**, **SHA-512/224**, dan **SHA-512/256**.
> >
> > **Contoh digest Keccak-256**: `keccak256("halo")` = `51e5ddea...16d836`; `keccak256("halu")` = `beccbf92...59d144` (satu huruf berbeda, digest sama sekali berbeda).

> [!cornell] #### Summary
>
> **SHA-3** dipilih NIST lewat kompetisi terbuka (2007-**Oktober 2012**; 64 submission $\to$ 51 $\to$ 14 $\to$ 5 finalis **BLAKE, Grøstl, JH, Keccak, Skein**) dan dimenangkan oleh **Keccak** (Bertoni, Daemen, Peeters, Van Assche; nama dari tari **Kecak**). Keccak memakai **konstruksi spons**: state $b = r + c$ bit (**bitrate $r$**, **capacity $c$**; SHA3-256: $r = 1088$, $c = 512$, $b = 1600$). Pada fase **absorbing**, tiap blok $P_i$ di-XOR ke $r$ bit pertama state lalu di-permutasi dengan $f$; pada fase **squeezing**, $r$ bit pertama state diambil ke digest $Z$ dan state dipermutasi lagi sampai panjang $d$ terpenuhi. $c$ bit tidak pernah menyentuh masukan/keluaran, sehingga menjaga keamanan. Permutasi Keccak-f memakai langkah $\theta, \rho, \pi, \chi, \iota$.

> [!ad-libitum]- Additional Information
>
> #### Keccak vs SHA3-256 Resmi
>
> **Keccak-256** (yang dipakai Ethereum) dan **SHA3-256** (FIPS 202) **menghasilkan digest berbeda** untuk pesan yang sama karena **bit padding berbeda**: Keccak asli memakai `0x01`, SHA-3 standar menambahkan sufiks domain `01` sehingga padding `0x06`. Jadi digest pada slide (`keccak256("halo")`) tidak sama dengan `hashlib.sha3_256(b"halo")` (= `92d677c2...d2d7165`).
>
> #### Jumlah Putaran dan Keunggulan
>
> Keccak-f[1600] memakai **24 putaran**. Keunggulan SHA-3: kebal terhadap **length-extension attack** (karena $c$ bit tersembunyi), desain berbeda dari SHA-2 sehingga serangan pada SHA-2 tidak otomatis berlaku, serta fleksibel (digest panjang sembarang lewat **XOF**: **SHAKE128/SHAKE256**, dan dapat dipakai sebagai MAC langsung (KMAC), PRNG, atau stream cipher).
>
> #### Mengapa Capacity Menentukan Keamanan?
>
> Menurut analisis spons, upaya serangan kolisi $\approx \min(2^{d/2},\ 2^{c/2})$ dan preimage $\approx \min(2^{d},\ 2^{c/2})$. Pada SHA3-256 ($d = 256$, $c = 512$) kolisi tetap $\approx 2^{128}$ (dibatasi $d$, bukan $c$), jadi $c = 512$ memberi cadangan keamanan. Harganya kecepatan: makin besar $c$, makin kecil $r$ (lebih sedikit data diserap per permutasi), makin lambat.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Gunakan `hashlib.sha3_256` dan `hashlib.shake_128` untuk menghasilkan digest berbeda panjang dari pesan yang sama.
> 2. Implementasikan Keccak-f[1600] dalam Python (24 putaran, lima langkah di atas) dan verifikasi terhadap vektor uji dari keccak.team.
>
> #### Bacaan Lanjutan
>
> - FIPS 202, *SHA-3 Standard: Permutation-Based Hash and Extendable-Output Functions*.
> - Bertoni, Daemen, Peeters, Van Assche, *The Keccak reference* dan `keccak.team/keccak_specs_summary.html`.
> - Demo: `emn178.github.io/online-tools/keccak_256.html`.
