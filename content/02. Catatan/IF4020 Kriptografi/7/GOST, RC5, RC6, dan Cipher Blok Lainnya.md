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
> > ### GOST (Magma)
> >
> > **GOST** = *Gosudarstvenny Standard* ("standar pemerintah"), tercantum dalam **GOST 28147-89** (RFC 5830). Cipher blok standar **Uni Soviet**, dikembangkan **1970** tetapi baru dirilis publik **1990** setelah Uni Soviet bubar; dibuat sebagai alternatif DES. Pada standar baru **GOST R 34.12-2015** (RFC 7801, 8891) cipher ini bernama **Magma**; standar itu juga menetapkan cipher blok 128-bit **Kuznyechik**. Struktur mirip DES: **jaringan Feistel**.
> >
> > - Blok **64 bit**, kunci **256 bit**, **32 putaran**.
> > - Hanya ada **8 kunci putaran** ($K_1 \dots K_8$, tiap 32 bit, hasil membagi kunci 256 bit menjadi 8 bagian); penjadwalan pada 32 putaran: **$K_1..K_8$ tiga kali** (putaran 1-24), lalu **$K_8..K_1$ terbalik** (putaran 25-32). Contoh kunci `abcdefghijklmnopqrstuvwxyz123456`: $K_1$ = `abcd`, $K_2$ = `efgh`, ..., $K_8$ = `3456`.
> >
> > **Satu putaran**: $L_i = R_{i-1}$, $R_i = L_{i-1} \oplus f(R_{i-1}, K_i)$. Fungsi $f$:
> >
> > 1. **Penjumlahan modulo $2^{32}$**: $R_{i-1} + K_i$ (32 bit).
> > 2. **Substitusi**: dibagi **8 bagian 4 bit**, masing-masing ke **kotak-S** (8 kotak, tiap kotak permutasi 0..15; **4 bit masuk, 4 bit keluar**). Contoh S1: masukan `0010` (2) $\to$ elemen ke-2 = 9 = `1001`.
> > 3. **Geser sirkuler kiri 11 bit** hasil gabungan 32 bit, lalu XOR dengan $L_{i-1}$.
> >
> > Dekripsi kebalikan enkripsi (Feistel dari "bawah" ke "atas").
> >
> > **Perbedaan GOST vs DES:**
> >
> > | Aspek | DES | GOST |
> > |---|---|---|
> > | Kunci | 56 bit | **256 bit** (brute force jauh lebih sukar) |
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
> > ### Rekomendasi Cipher Simetri (ringkasan slide)
> >
> > | Cipher | Pembuat | Panjang kunci | Keterangan |
> > |---|---|---|---|
> > | Blowfish | Schneier | 1-448 bit | old and slow |
> > | DES | IBM | 56 bit | too weak to use now |
> > | IDEA | Massey dan Xuejia | 128 bit | good, but patented |
> > | RC4 | Rivest | 1-2048 bit | caution: some keys are weak |
> > | RC5 | Rivest | 128-256 bit | good, but patented |
> > | **Rijndael** | Daemen dan Rijmen | 128-256 bit | **best choice** |
> > | Serpent | Anderson, Biham, Knudsen | 128-256 bit | very strong |
> > | Triple DES | IBM | 168 bit | second best choice |
> > | Twofish | Schneier | 128-256 bit | very strong; widely used |

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
