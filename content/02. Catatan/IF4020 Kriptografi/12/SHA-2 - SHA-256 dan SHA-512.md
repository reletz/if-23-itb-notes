---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] SHA-2 - SHA-256 dan SHA-512
>
> > ## Questions/Cues
> >
> > - Apa perbedaan SHA-256 dan SHA-512 dari SHA-1?
> > - Fungsi logika apa saja yang dipakai pada SHA-256 (Ch, Ma, Sigma)?
> > - Berapa putaran, buffer awal, dan ukuran blok tiap varian?
> > - Bagaimana menghitung hash di Python (teks, file, dan memeriksa integritas)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Beberapa Fungsi Hash (Slides 20-39)
>
> > ### SHA-256
> >
> > SHA-256 memakai kerangka Merkle-Damgård yang sama dengan SHA-1 ([[SHA-1 dan Konstruksi Merkle-Damgard]]): padding hingga $\equiv 448 \pmod{512}$, tambahan 64 bit panjang pesan, lalu pemrosesan blok 512 bit. Bedanya: **8 buffer** 32 bit (bukan 5) dan **64 putaran** (bukan 80), digest **256 bit**.
> >
> > **Buffer awal** ($a$ sampai $h$):
> >
> > | a | b | c | d |
> > |---|---|---|---|
> > | `6a09e667` | `bb67ae85` | `3c6ef372` | `a54ff53a` |
> > | **e** | **f** | **g** | **h** |
> > | `510e527f` | `9b05688c` | `1f83d9ab` | `5be0cd19` |
> >
> > **Konstanta putaran $K[0..63]$** (64 buah, satu per putaran; urut dari kiri ke kanan, 8 per baris):
> >
> > | | | | | | | | |
> > |---|---|---|---|---|---|---|---|
> > | `428a2f98` | `71374491` | `b5c0fbcf` | `e9b5dba5` | `3956c25b` | `59f111f1` | `923f82a4` | `ab1c5ed5` |
> > | `d807aa98` | `12835b01` | `243185be` | `550c7dc3` | `72be5d74` | `80deb1fe` | `9bdc06a7` | `c19bf174` |
> > | `e49b69c1` | `efbe4786` | `0fc19dc6` | `240ca1cc` | `2de92c6f` | `4a7484aa` | `5cb0a9dc` | `76f988da` |
> > | `983e5152` | `a831c66d` | `b00327c8` | `bf597fc7` | `c6e00bf3` | `d5a79147` | `06ca6351` | `14292967` |
> > | `27b70a85` | `2e1b2138` | `4d2c6dfc` | `53380d13` | `650a7354` | `766a0abb` | `81c2c92e` | `92722c85` |
> > | `a2bfe8a1` | `a81a664b` | `c24b8b70` | `c76c51a3` | `d192e819` | `d6990624` | `f40e3585` | `106aa070` |
> > | `19a4c116` | `1e376c08` | `2748774c` | `34b0bcb5` | `391c0cb3` | `4ed8aa4a` | `5b9cca4f` | `682e6ff3` |
> > | `748f82ee` | `78a5636f` | `84c87814` | `8cc70208` | `90befffa` | `a4506ceb` | `bef9a3f7` | `c67178f2` |
> >
> > **Asal nilainya** (bukan angka acak): $K[i]$ adalah **32 bit pertama dari bagian pecahan akar pangkat tiga** bilangan prima ke-$i$ (2, 3, 5, 7, ...). Mis. $\sqrt[3]{2} = 1{,}2599\ldots$, pecahan $0{,}2599\ldots \times 2^{32} \to$ `428a2f98`. Dengan cara yang sama, buffer awal $a$ sampai $h$ berasal dari pecahan **akar kuadrat** delapan prima pertama. Tujuannya membuktikan tidak ada "pintu belakang" tersembunyi (*nothing-up-my-sleeve numbers*).
> >
> > **Fungsi logika per putaran** ($+$ = penjumlahan modulo $2^{32}$, $\ggg$ = rotasi kanan):
> >
> > $$\text{Ch}(E,F,G) = (E \wedge F) \oplus (\lnot E \wedge G)$$
> > $$\text{Ma}(A,B,C) = (A \wedge B) \oplus (A \wedge C) \oplus (B \wedge C)$$
> > $$\Sigma_0(A) = (A \ggg 2) \oplus (A \ggg 13) \oplus (A \ggg 22)$$
> > $$\Sigma_1(E) = (E \ggg 6) \oplus (E \ggg 11) \oplus (E \ggg 25)$$
> >
> > - **Ch (choose)**: $E$ memilih bit dari $F$ bila 1, dari $G$ bila 0. 
> > - **Ma (majority)**: keluar 1 bila minimal dua dari $A, B, C$ bernilai 1. Pada tiap putaran, dua temporary dihitung dari kedua fungsi itu (ditambah $h$, $W_t$, $K_t$), lalu keempat buffer digeser ($h \leftarrow g$, $g \leftarrow f$, dst.). Setelah 64 putaran hasil dijumlahkan ke buffer awal blok tersebut.
> > 
> > ![[Pasted image 20261020162428.png]]
> >
> > **Penjadwalan pesan SHA-256 (slide 23)**: satu blok 512 bit dipecah menjadi 16 word 32 bit $W_0 \dots W_{15}$; **proses ME (*message expansion*)** memperluasnya menjadi $W_{16} \dots W_{63}$ (jadi 64 word, satu per putaran):
> >
> > $$W_j = \sigma_1(W_{j-2}) + W_{j-7} + \sigma_0(W_{j-15}) + W_{j-16}, \quad 16 \le j \le 63$$
> >
> > $$\sigma_0(x) = S^{7}(x) \oplus S^{18}(x) \oplus R^{3}(x), \qquad \sigma_1(x) = S^{17}(x) \oplus S^{19}(x) \oplus R^{10}(x)$$
> >
> > $S^n$ = rotasi kanan $n$ bit, $R^n$ = geser kanan $n$ bit, $+$ = penjumlahan mod $2^{32}$. (Ini berbeda dari SHA-1 yang hanya memakai XOR dan rotasi 1 bit.)
> >
> > **Perbandingan SHA-1 dan SHA-256 (slide 20 dan 25)**:
> >
> > | Aspek | SHA-1 | SHA-256 |
> > |---|---|---|
> > | Struktur | Merkle-Damgård | Merkle-Damgård |
> > | Ukuran blok / word | 512 bit / 32 bit | 512 bit / 32 bit |
> > | Jumlah putaran | 80 | 64 |
> > | Register internal | 5 (A-E) | 8 (A-H) |
> > | Fungsi boolean | 4 fungsi berbeda menurut rentang putaran (AND, OR, XOR, majority) | tetap: Ch, Maj, $\Sigma_0$, $\Sigma_1$ |
> > | Konstanta putaran $K$ | 4 nilai (tergantung rentang putaran) | 64 konstanta (dari akar kubik prima) |
> > | Operasi utama | rotasi dan penjumlahan mod $2^{32}$ | rotasi, shift, dan penjumlahan mod $2^{32}$ |
> > | *Collision resistance* | **sudah ditembus** (Google dan CWI 2017, SHAttered) | belum ada kolisi yang diketahui |
> > | *Preimage resistance* | melemah, tidak lagi direkomendasikan | masih sangat kuat |
> > | Status keamanan | **tidak aman**, tidak direkomendasikan untuk kriptografi modern | **aman**, direkomendasikan NIST |
> > | Keluarga | SHA-1 | SHA-2 (SHA-224/256/384/512) |
> >
> > ### SHA-512
> > 
> > ![[Pasted image 20261020163509.png]]
> >
> > Struktur serupa dengan ukuran lebih besar: **blok 1024 bit**, **buffer 64 bit** (delapan buah, $a$ sampai $h$, nilai awal $H_0$ dari pecahan akar kuadrat bilangan prima pertama), **80 putaran**, digest **512 bit**; panjang pesan ditambahkan dalam 128 bit. **SHA-384** adalah SHA-512 dengan digest dipotong 384 bit dan nilai awal berbeda; **SHA-224** serupa untuk SHA-256.
> >
> > **Inisialisasi buffer $a$ sampai $h$ ($H_0$)**: delapan word **64 bit**, nilainya 64 bit pertama dari pecahan **akar kuadrat** delapan prima pertama (2, 3, 5, 7, 11, 13, 17, 19). Bandingkan dengan SHA-256 yang memakai 32 bit pertama dari nilai yang sama (`6a09e667`, `bb67ae85`, ...):
> >
> > | Buffer | $H_0$ (awal) | Setelah putaran 1 | Setelah putaran 2 |
> > |---|---|---|---|
> > | $a$ | `6a09e667f3bcc908` | `f6afceb8bcfcddf5` | `1320f8c9fb872cc0` |
> > | $b$ | `bb67ae8584caa73b` | `6a09e667f3bcc908` | `f6afceb8bcfcddf5` |
> > | $c$ | `3c6ef372fe94f82b` | `bb67ae8584caa73b` | `6a09e667f3bcc908` |
> > | $d$ | `a54ff53a5f1d36f1` | `3c6ef372fe94f82b` | `bb67ae8584caa73b` |
> > | $e$ | `510e527fade682d1` | `58cb02347ab51f91` | `c3d4ebfd48650ffa` |
> > | $f$ | `9b05688c2b3e6c1f` | `510e527fade682d1` | `58cb02347ab51f91` |
> > | $g$ | `1f83d9abfb41bd6b` | `9b05688c2b3e6c1f` | `510e527fade682d1` |
> > | $h$ | `5be0cd19137e2179` | `1f83d9abfb41bd6b` | `9b05688c2b3e6c1f` |
> >
> > Kolom pertama adalah nilai awal $H_0$. Dua kolom berikutnya (pada gambar slide) memperlihatkan **bagaimana isi buffer bergeser** tiap putaran: nilai baru hanya muncul di $a$ dan $e$ (hasil hitungan putaran), sedangkan $b, c, d$ menerima nilai $a, b, c$ sebelumnya dan $f, g, h$ menerima $e, f, g$ sebelumnya. Nilai di dua kolom itu cocok dengan hasil putaran 1 dan 2 untuk pesan `abc` (kuverifikasi dengan program), jadi anggap keduanya contoh penelusuran, bukan nilai inisialisasi.
> >
> > | Varian | Digest | Blok | Putaran | Kolisi |
> > |---|---|---|---|---|
> > | SHA-1 | 160 | 512 | 80 | ada cacat |
> > | SHA-224/256 | 224/256 | 512 | 64 | belum |
> > | SHA-384/512 | 384/512 | 1024 | 80 | belum |
> >
> > **Detail SHA-512 (slide 26-33)**:
> >
> > - **Alur pesan** (gambar 11.8): pesan $L$ bit + padding `1000...0` + **128 bit panjang pesan** menjadi $N \times 1024$ bit, dipecah menjadi blok $M_1 \dots M_N$ (1024 bit). Mulai dari $IV = H_0$ (512 bit), tiap blok masuk fungsi kompresi $F$ lalu hasilnya dijumlahkan (**word demi word, mod $2^{64}$**) dengan nilai sebelumnya, menghasilkan $H_1, \dots, H_N$; **$H_N$ adalah *hash code*** 512 bit.
> > - **Satu blok** (gambar 11.9): modul *message schedule* membentuk $W_0 \dots W_{79}$ dari $M_i$; ada 80 putaran, putaran ke-$t$ memakai $W_t$ dan $K_t$; keluaran putaran ke-79 dijumlahkan dengan $H_{i-1}$ menjadi $H_i$.
> > - **Penjadwalan pesan** (gambar 11.11): $W_0 \dots W_{15}$ diambil langsung dari 16 word 64 bit blok, dan untuk $16 \le t \le 79$:
> >
> > $$W_t = \sigma_1^{512}(W_{t-2}) + W_{t-7} + \sigma_0^{512}(W_{t-15}) + W_{t-16}$$
> >
> > $$\sigma_0^{512}(x) = \text{ROTR}^{1}(x) \oplus \text{ROTR}^{8}(x) \oplus \text{SHR}^{7}(x), \quad \sigma_1^{512}(x) = \text{ROTR}^{19}(x) \oplus \text{ROTR}^{61}(x) \oplus \text{SHR}^{6}(x)$$
> >
> >   ROTR = rotasi kanan 64 bit; SHR = geser kanan (nol masuk dari kiri; keterangan slide menyebut "left shift ... zeros on the right", yang merupakan salah tulis dari buku sumber).
> > - **Satu putaran** (gambar 11.10 dan 11.12):
> >
> > ```
> > T1 = h + Ch(e,f,g) + Sigma1(e) + W_t + K_t
> > T2 = Sigma0(a) + Maj(a,b,c)
> > h = g;  g = f;  f = e;  e = d + T1
> > d = c;  c = b;  b = a;  a = T1 + T2
> > Ch(e,f,g) = (e AND f) XOR (NOT e AND g)   "jika e maka f, jika tidak g"
> > ```
> >
> >   $0 \le t \le 79$; semua penjumlahan modulo $2^{64}$.
> > - **Algoritma lengkap** (slide 33): untuk $i = 1 \dots N$: (1) siapkan $W$, (2) inisialisasi $a \dots h = H_{i-1,0} \dots H_{i-1,7}$, (3) lakukan 80 putaran seperti di atas, (4) hitung nilai hash antara $H_{i,j} = (\text{variabel}_j + H_{i-1,j}) \bmod 2^{64}$ (langkah ini terpotong di slide, tetapi demikian standarnya).
> >
> > **Konstanta SHA-512 $K[0..79]$ (80 buah, 64 bit)**, dibaca dari kiri ke kanan lalu ke bawah:
> >
> > | | | | |
> > |---|---|---|---|
> > | `428a2f98d728ae22` | `7137449123ef65cd` | `b5c0fbcfec4d3b2f` | `e9b5dba58189dbbc` |
> > | `3956c25bf348b538` | `59f111f1b605d019` | `923f82a4af194f9b` | `ab1c5ed5da6d8118` |
> > | `d807aa98a3030242` | `12835b0145706fbe` | `243185be4ee4b28c` | `550c7dc3d5ffb4e2` |
> > | `72be5d74f27b896f` | `80deb1fe3b1696b1` | `9bdc06a725c71235` | `c19bf174cf692694` |
> > | `e49b69c19ef14ad2` | `efbe4786384f25e3` | `0fc19dc68b8cd5b5` | `240ca1cc77ac9c65` |
> > | `2de92c6f592b0275` | `4a7484aa6ea6e483` | `5cb0a9dcbd41fbd4` | `76f988da831153b5` |
> > | `983e5152ee66dfab` | `a831c66d2db43210` | `b00327c898fb213f` | `bf597fc7beef0ee4` |
> > | `c6e00bf33da88fc2` | `d5a79147930aa725` | `06ca6351e003826f` | `142929670a0e6e70` |
> > | `27b70a8546d22ffc` | `2e1b21385c26c926` | `4d2c6dfc5ac42aed` | `53380d139d95b3df` |
> > | `650a73548baf63de` | `766a0abb3c77b2a8` | `81c2c92e47edaee6` | `92722c851482353b` |
> > | `a2bfe8a14cf10364` | `a81a664bbc423001` | `c24b8b70d0f89791` | `c76c51a30654be30` |
> > | `d192e819d6ef5218` | `d69906245565a910` | `f40e35855771202a` | `106aa07032bbd1b8` |
> > | `19a4c116b8d2d0c8` | `1e376c085141ab53` | `2748774cdf8eeb99` | `34b0bcb5e19b48a8` |
> > | `391c0cb3c5c95a63` | `4ed8aa4ae3418acb` | `5b9cca4f7763e373` | `682e6ff3d6b2b8a3` |
> > | `748f82ee5defb2fc` | `78a5636f43172f60` | `84c87814a1f0ab72` | `8cc702081a6439ec` |
> > | `90befffa23631e28` | `a4506cebde82bde9` | `bef9a3f7b2c67915` | `c67178f2e372532b` |
> > | `ca273eceea26619c` | `d186b8c721c0c207` | `eada7dd6cde0eb1e` | `f57d4f7fee6ed178` |
> > | `06f067aa72176fba` | `0a637dc5a2c898a6` | `113f9804bef90dae` | `1b710b35131c471b` |
> > | `28db77f523047d84` | `32caab7b40c72493` | `3c9ebe0a15c9bebc` | `431d67c49c100d4c` |
> > | `4cc5d4becb3e42b6` | `597f299cfc657e2a` | `5fcb6fab3ad6faec` | `6c44198c4a475817` |
> >
> > (Seperti SHA-256, $K_t$ adalah 64 bit pertama pecahan akar pangkat tiga bilangan prima ke-$t$; kuverifikasi dengan program.)
> >
> > ### Hash dengan Python (`hashlib`)
> >
> > ```python
> > import hashlib
> > pesan = b'Yogyakarta kota kenangan'          # b: string menjadi bytes
> > print(hashlib.md5(pesan).hexdigest())        # df6ec566eb228237a59e012e343ecb13
> > print(hashlib.sha1(pesan).hexdigest())       # aa8adef498e0ffd2222f49a0021d645b9f8cfa4d
> > print(hashlib.sha256(pesan).hexdigest())     # c2494851d6345fac3810...2145707f
> > ```
> >
> > Tiga pola pemakaian di slide:
> >
> > 1. **Teks dari kode**: pakai literal `b'...'`.
> > 2. **Teks dari keyboard**: `message.encode('utf-8')` karena hash bekerja pada **bytes**, bukan string.
> > 3. **File**: `hash = hashlib.sha256()`, baca berkas mode `'rb'` per 1024 byte, `hash.update(chunk)` berulang, lalu `hash.hexdigest()`.
> >
> > Contoh keluaran slide 38 untuk berkas `07-AES-(2025).pptx`: `386e7a95c3b3e73d3fcd4e05e7e05efb7cd926844741e5cf434e66c16efe1fe7`. Slide mencetak label "Nilai hash SHA1", padahal kodenya memakai `hashlib.sha256()` dan keluarannya 64 digit heksa (256 bit); label itu salah tulis. Contoh teks dari keyboard (slide 36): `Mereka pergi ke Gunung Tangkubanperahu pukul 9.00` $\to$ SHA-256 `389384279fda7612c44045fb433ccb8069c642f59049395c3b5a5490fd4ccb4c`.
> >
> > **Memeriksa integritas**: hash `Yogyakarta kota kenangan` dan `Yogyakarta koti kenangan` dibandingkan dengan `==`; berbeda $\to$ "Pesan sudah diubah".
> >
> > ```mermaid
> > flowchart TD
> >     A["SHA-256: 8 buffer 32-bit<br/>64 putaran, blok 512"] --> B["Ch, Ma, Sigma0, Sigma1<br/>penjumlahan mod 2^32"]
> >     C["SHA-512: 8 buffer 64-bit<br/>80 putaran, blok 1024"] --> B
> > ```

> [!cornell] #### Summary
>
> **SHA-256** mempertahankan struktur Merkle-Damgård SHA-1 tetapi memakai **8 buffer 32-bit** (nilai awal `6a09e667`, `bb67ae85`, ...), **64 putaran**, blok **512 bit**, dan digest **256 bit** dengan fungsi **Ch**, **Ma**, $\Sigma_0$ (rotasi 2, 13, 22), $\Sigma_1$ (rotasi 6, 11, 25), serta penjumlahan modulo $2^{32}$. **SHA-512** memakai blok **1024 bit**, buffer **64 bit**, **80 putaran**, dan digest **512 bit**. Keduanya belum ditemukan kolisinya. Di Python, `hashlib` menghitung MD5/SHA-1/SHA-256/SHA-512 atas **bytes** (teks lewat `encode('utf-8')`, file dibaca per bagian), dan integritas diperiksa dengan membandingkan dua hexdigest.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Ada SHA-224 dan SHA-384?
>
> Keduanya adalah **pemotongan (truncation)** SHA-256 dan SHA-512 dengan nilai awal berbeda; dipakai bila butuh digest lebih pendek yang kompatibel dengan ukuran kunci algoritma lain (mis. SHA-224 untuk 3DES, SHA-384 untuk AES-192). Pemotongan yang cukup besar (mis. SHA-384, SHA-512/256) juga menyembunyikan sebagian state akhir sehingga **serangan length-extension** yang menimpa SHA-256/512 polos tidak lagi praktis.
>
> #### Length-Extension Attack
>
> Bila $H$ berkonstruksi Merkle-Damgård murni dan digest = seluruh state akhir, penyerang yang tahu $H(K \| M)$ dapat menghitung $H(K \| M \| \text{pad} \| M')$ **tanpa mengetahui $K$**. Inilah mengapa $H(K \| M)$ buruk sebagai MAC dan dipakai **HMAC** ([[Algoritma MAC dan HMAC]]). SHA-3 tidak terpengaruh ([[SHA-3 Keccak dan Konstruksi Spons]]).
>
> #### Mana yang Dipakai?
>
> SHA-256 adalah standar de facto (TLS, Bitcoin, sertifikat). SHA-512 sering **lebih cepat** pada CPU 64-bit karena memproses blok lebih besar dengan operasi 64-bit.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program yang menghitung SHA-256 sebuah berkas besar secara streaming dan bandingkan dengan `sha256sum`.
> 2. Hitung berapa banyak bit digest yang berubah (rata-rata mendekati 50%) ketika 1 karakter pesan diubah; uji pada MD5, SHA-1, SHA-256 (efek *avalanche*).
>
> #### Bacaan Lanjutan
>
> - FIPS 180-4, *Secure Hash Standard (SHS)*.
> - Ilustrasi putaran SHA-256: `infosecwriteups.com/breaking-down-sha-256-algorithm-2ce61d86f7a3`.
> - Dokumentasi Python `hashlib`.
