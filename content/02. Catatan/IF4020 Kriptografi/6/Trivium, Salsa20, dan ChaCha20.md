---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Trivium, Salsa20, dan ChaCha20
>
> > ## Questions/Cues
> >
> > - Apa itu eSTREAM dan mengapa Trivium cocok untuk lightweight cryptography?
> > - Bagaimana Trivium diinisialisasi dan menghasilkan keystream?
> > - Apa masukan, struktur state, dan quarter round Salsa20?
> > - Apa itu desain ARX dan mengapa cepat?
> > - Apa saja perbedaan ChaCha20 dengan Salsa20?
> > - Mengapa keystream Salsa/ChaCha bisa dibangkitkan paralel?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Modern dan Stream Cipher (Slides 74-93)
>
> > ### Trivium
> >
> > Stream cipher modern, peserta kompetisi **eSTREAM (2004-2008)**, dirancang **Christophe De Cannière dan Bart Preneel**. Memakai **tiga NLFSR** (*nonlinear feedback shift register*) berpanjang **93, 84, dan 111 bit** (total **288 sel**). Keystream = **XOR tiga keluaran NLFSR**.
> >
> > | Register | Panjang | Bit umpan balik | Bit feedforward | Input AND |
> > |---|---|---|---|---|
> > | A | 93 | 69 | 66 | 91, 92 |
> > | B | 84 | 78 | 69 | 82, 83 |
> > | C | 111 | 87 | 66 | 109, 110 |
> >
> > **Inisialisasi**: masukkan **IV 80-bit** ke A dan **kunci 80-bit** ke B; set $c_{109}, c_{110}, c_{111} = 1$, bit lain 0. **Pemanasan**: detak NLFSR $4 \times 288 = 1152$ kali **tanpa keluaran**, agar kunci/IV tercampur ke seluruh register. **Enkripsi**: XOR tiga keluaran → $s_i$, lalu $c_i = p_i \oplus s_i$.
> >
> > **Kelebihan**: cocok untuk **lightweight cryptography** karena state kecil (288 bit); sangat efisien di perangkat keras (hanya **3 gerbang AND dan 7 gerbang XOR**). Gerbang AND memberi **non-linearitas** yang tak dimiliki LFSR murni.
> >
> > ### Salsa20
> >
> > Dirancang **Daniel J. Bernstein (2005)**, juga peserta eSTREAM. Menghasilkan **blok keystream 512 bit (64 byte)**. Masukan:
> >
> > - **Kunci** 256 bit (rahasia),
> > - **Nonce** 64 bit (*number used once*, unik, tidak rahasia),
> > - **Counter** 64 bit (mulai 0, tidak rahasia).
> >
> > **Langkah:**
> >
> > 1. Tentukan key, nonce, counter.
> > 2. Bentuk **matriks state $4 \times 4$** dari 16 word (1 word = 32 bit, total 512 bit): berisi konstanta (`expand 32-byte k`), key, counter, dan nonce.
> > 3. Simpan salinan state awal $x = in$.
> > 4. Lakukan **20 putaran = 10 double-round**; tiap double-round = **1 column round + 1 row round**.
> > 5. Hasil: $y = (x' + x) \bmod 2^{32}$ (state akhir dijumlahkan dengan state awal).
> >
> > **Quarter round $QR(a,b,c,d)$**, inti Salsa20:
> >
> > $$b \mathrel{\oplus}= (a + d) \lll 7,\quad c \mathrel{\oplus}= (b + a) \lll 9,\quad d \mathrel{\oplus}= (c + b) \lll 13,\quad a \mathrel{\oplus}= (d + c) \lll 18$$
> >
> > dengan $\lll k$ rotasi bit ke kiri (siklik) dan $+$ penjumlahan mod $2^{32}$. Column round menerapkan QR pada tiap kolom state, row round pada tiap baris. Untuk pesan $n \times 512$ bit, Salsa20 dijalankan $n$ kali dengan counter +1 dan nonce tetap.
> >
> > ```mermaid
> > flowchart LR
> >     IN["State awal 4x4<br/>konstanta, key, nonce, counter"] --> DR["10 double-round<br/>column round + row round<br/>(QR: add, rotate, XOR)"]
> >     DR --> ADD["Tambah state awal<br/>mod 2^32"]
> >     ADD --> KS["Blok keystream 64 byte"]
> >     KS --> XR(("XOR dengan plainteks"))
> > ```
> >
> > **Kelebihan**: (1) **sangat cepat**, hanya operasi **ARX** (*Add, Rotate, XOR*) tanpa tabel; (2) **keamanan baik**, 20 putaran memberi **difusi kuat** (perubahan kecil pada key/nonce/counter mengubah keystream besar-besaran); (3) cocok untuk perangkat terbatas; (4) efisien di perangkat lunak dan menjadi dasar ChaCha; (5) blok keystream besar (64 byte); (6) **paralel**: blok ke-$k$ hanya bergantung pada (key, nonce, counter $= k$), sehingga blok-blok dapat dihitung independen (mendukung akses acak).
> >
> > ### ChaCha20
> >
> > Modifikasi Salsa20 oleh Bernstein (**2008**), keluarga ChaCha (ChaCha8, ChaCha12, ChaCha20). Tujuan: **difusi lebih baik** dengan tetap mempertahankan kecepatan dan kesederhanaan ARX; implementasi perangkat lunak sangat efisien. Kini **sangat populer di protokol modern**.
> >
> > **Perbedaan dengan Salsa20:**
> >
> > 1. **Susunan state awal** berbeda.
> > 2. **Quarter round** berbeda:
> >
> > $$a \mathrel{+}= b;\ d \mathrel{\oplus}= a;\ d \lll 16;\quad c \mathrel{+}= d;\ b \mathrel{\oplus}= c;\ b \lll 12;\quad a \mathrel{+}= b;\ d \mathrel{\oplus}= a;\ d \lll 8;\quad c \mathrel{+}= d;\ b \mathrel{\oplus}= c;\ b \lll 7$$
> >
> > 3. Pola putaran: **column round** dan **diagonal round** (bukan column/row), yaitu QR(0,4,8,12), QR(1,5,9,13), QR(2,6,10,14), QR(3,7,11,15) untuk kolom; QR(0,5,10,15), QR(1,6,11,12), QR(2,7,8,13), QR(3,4,9,14) untuk diagonal. Tiap word diperbarui dua kali per QR, sehingga difusi lebih cepat.

> [!cornell] #### Summary
>
> **Trivium** (eSTREAM, De Cannière dan Preneel) memakai **3 NLFSR (93+84+111 = 288 bit)**, diinisialisasi dari IV 80-bit dan kunci 80-bit, dipanaskan 1152 detak, dan keluarannya di-XOR; sangat ringan (3 AND, 7 XOR) dan cocok untuk **lightweight cryptography**. **Salsa20** (Bernstein, 2005) menghasilkan **blok 512 bit** dari key 256-bit, nonce 64-bit, counter 64-bit lewat state $4 \times 4$ word, **20 putaran ARX** dengan quarter round $b \oplus= (a+d) \lll 7, \dots$, lalu menjumlahkan dengan state awal; cepat, berdifusi kuat, dan keystream-nya dapat **dihitung paralel** per counter. **ChaCha20** (2008) mengubah state awal, quarter round (rotasi 16/12/8/7), dan pola putaran menjadi **column + diagonal** agar difusi lebih baik; kini dipakai luas di protokol modern. Setelah cipher alir, materi berlanjut ke cipher blok: [[Konsep Cipher Blok dan Mode Operasi]].

> [!ad-libitum]- Additional Information
>
> #### ChaCha20 dalam Praktik
>
> **ChaCha20-Poly1305** (RFC 8439) adalah cipher suite AEAD standar di **TLS 1.3**, **WireGuard**, **SSH**, dan Chrome/Android (khususnya perangkat tanpa akselerasi AES-NI, karena ARX cepat dan tahan timing attack). State ChaCha20 IETF: counter 32 bit + nonce 96 bit. Poly1305 menyediakan MAC sehingga pesan terlindung dari bit-flipping ([[Serangan Berdasarkan Tujuan Penyerang]]).
>
> #### Mengapa ARX?
>
> Penjumlahan modulo $2^{32}$ bersifat **non-linier terhadap XOR** (carry), rotasi memberi difusi antar-bit, dan XOR menggabungkan; tanpa lookup table sehingga **konstan waktu** (*constant-time*) dan tidak bocor lewat cache timing, berbeda dengan implementasi AES berbasis tabel ([[Serangan Pasif, Aktif, dan Side-Channel]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan quarter round ChaCha20 dan uji dengan vektor RFC 7539 (Section 2.1.1); lalu bangun blok penuh dan bandingkan `chacha20` dengan `cryptography` Python.
> 2. Ukur efek longsor: ubah 1 bit nonce dan hitung persen bit keystream yang berubah setelah 1, 2, 4, 10, dan 20 putaran.
>
> #### Bacaan Lanjutan
>
> - D. J. Bernstein, *"ChaCha, a variant of Salsa20"*, 2008.
> - RFC 8439, *ChaCha20 and Poly1305 for IETF Protocols*.
> - C. De Cannière & B. Preneel, *"Trivium"*, eSTREAM.
