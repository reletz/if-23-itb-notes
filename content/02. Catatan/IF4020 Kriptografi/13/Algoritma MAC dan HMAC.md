---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Algoritma MAC dan HMAC
>
> > ## Questions/Cues
> >
> > - Bagaimana MAC dibangun dari block cipher (CBC-MAC, DAA)?
> > - Bagaimana MAC dibangun dari fungsi hash satu-arah?
> > - Apa itu HMAC, bagaimana rumusnya, dan mengapa lebih baik dari $H(M \| K)$?
> > - Teknik apa lagi yang dapat mengotentikasi pesan dengan kunci?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — MAC (Slides 11-20)
>
> > ### Dua Cara Membangun MAC
> >
> > MAC sama dengan fungsi hash dalam hal **kompresi irreversible**, dan dapat dibangun dari (1) **block cipher** atau (2) **fungsi hash satu-arah** yang sudah ada ([[Konsep MAC]]).
> >
> > ### (a) MAC Berbasis Block Cipher
> >
> > Pesan dienkripsi dengan block cipher **mode CBC atau CFB**; **MAC = hasil enkripsi blok terakhir** ($C_m$). Seluruh blok sebelumnya ikut mempengaruhi blok terakhir lewat umpan balik ([[Konsep Cipher Blok dan Mode Operasi]]).
> >
> > ![[Pasted image 20261020171126.png]]
> >
> > Bila DES dipakai, MAC = ukuran blok = **64 bit**, dan kunci rahasia MAC adalah kunci DES (**56 bit**) ([[DES dan Triple DES]]). **DAA (Data Authentication Algorithm)** adalah algoritma MAC berbasis **DES-CBC** yang dipakai luas.
> >
> >![[Pasted image 20261020171216.png]]
> >
> > **Detail DAA (slide 12)**: pesan dipecah menjadi blok 64 bit $D_1, D_2, \dots, D_N$ (pada $t = 1 \dots N$). Tiap blok dienkripsi **DES** dengan kunci $K$ (56 bit); mulai blok ke-2, $D_t$ di-XOR dengan luaran sebelumnya $O_{t-1}$ sebelum dienkripsi. Luaran terakhir $O_N$ menjadi **DAC (*Data Authentication Code*), diambil sebesar 16 sampai 64 bit** (bit paling kiri).
> >
> > ### (b) MAC Berbasis Fungsi Hash
> >
> > Fungsi hash seperti MD5 dan SHA dapat dipakai sebagai MAC: pesan $M$ **disambung (concatenate) dengan kunci $K$**, lalu di-hash:
> >
> > $$\text{MAC} = H(M \,\|\, K)$$
> >
> > ($\|$ = concatenation.) Panjang MAC mengikuti fungsi hash: SHA-1 menghasilkan MAC **160 bit**. Skenarionya: Alice dan Bob berbagi kunci rahasia `KEY`; Alice mengirim `DATA` bersama MAC-nya, Bob menghitung ulang dan membandingkan.
> > 
> > ![[Pasted image 20261020171439.png]]
> >
> > ### HMAC
> >
> > **HMAC** adalah algoritma pembangkit MAC dengan **fungsi hash dan kunci**, dituliskan **HMAC-x** dengan $x$ nama fungsi hash: **HMAC-MD5, HMAC-SHA1, HMAC-SHA256**, dst. Definisinya ada di **RFC 2104** (slide menulis "RFC 2014"):
> >
> > $$\text{HMAC}(K, M) = H\Big( (K' \oplus \text{opad}) \,\|\, H\big( (K' \oplus \text{ipad}) \,\|\, M \big) \Big)$$
> >
> > - $K'$ = kunci yang dipadding dengan nol (atau di-hash bila lebih panjang) hingga sepanjang **blok hash**.
> > - $\text{ipad}$ = byte `0x36` diulang; $\text{opad}$ = byte `0x5C` diulang.
> > - Hash dijalankan **dua kali** (dalam dan luar), dengan kunci masuk di kedua lapisan.
> >
> > **Rincian HMAC (slide 15-16)**: $K'$ adalah **kunci seukuran blok hash** yang diturunkan dari $K$:
> >
> > $$K' = \begin{cases} H(K) & \text{bila } K \text{ lebih panjang dari ukuran blok} \\ K & \text{selain itu (di-padding nol di kanan hingga seukuran blok)} \end{cases}$$
> >
> > `opad` = byte `0x5c` diulang sepanjang blok (*outer padding*), `ipad` = byte `0x36` diulang (*inner padding*). Pseudocode dari Wikipedia pada slide:
> >
> > ```
> > function hmac(key, message, hash, blockSize, outputSize):
> >     block_sized_key = computeBlockSizedKey(key, hash, blockSize)
> >     o_key_pad = block_sized_key xor [0x5c * blockSize]    # outer padded key
> >     i_key_pad = block_sized_key xor [0x36 * blockSize]    # inner padded key
> >     return hash(o_key_pad || hash(i_key_pad || message))
> >
> > function computeBlockSizedKey(key, hash, blockSize):
> >     if length(key) > blockSize: key = hash(key)           # kunci panjang di-hash
> >     if length(key) < blockSize: return Pad(key, blockSize) # kunci pendek di-pad nol
> >     return key
> > ```
> >
> > (Contoh `blockSize`: 64 byte untuk SHA-1, `outputSize`: 20 byte.) Alur skema berbasis hash pada slide 14: Alice dan Bob berbagi `KEY`; Alice memasukkan `KEY` dan `DATA` ke fungsi hash menghasilkan MAC, lalu mengirim `MAC + DATA`; Bob menghitung ulang MAC dari `KEY` dan `DATA` yang diterima lalu memeriksa kesamaan (`=?`).
> >
> > **Demo daring (slide 17-18)**: alat *HMAC Generator* di `freeformatter.com` menerima teks (pada slide: dua baris `Kita bikin romantis` / `Bikin paling romantis`), kunci rahasia (`MALIQ`), dan algoritma digest (**SHA256**), lalu menampilkan *computed HMAC* heksadesimal 64 digit.
> >
> > **Contoh slide**: $M$ = `Halo, Bob!`, $K$ = `12345678`, hash SHA-1 $\to$ MAC = `6f8605c7c3a649a40abfb87b44aa21f356e931a0` (ini hasil **HMAC-SHA1** asli, berbeda dari hash polos `SHA1(M || K)` yang bernilai `d3308cfe4d98c738757b9d654d61e213889a578b`).
> >
> > ### Teknik Otentikasi Lain dengan Kunci
> >
> > Selain MAC, slide menyebut tiga cara lain untuk mengotentikasi pesan memakai kunci:
> > 
> > ![[Pasted image 20261020172059.png]]
> >
> > - **(a) Enkripsi konvensional**: pengirim menghitung $H(M)$, mengenkripsinya dengan kunci simetri $K$, menempelkan hasilnya pada pesan; penerima menghitung $H(M)$ sendiri, mendekripsi bagian yang ditempel dengan $K$, lalu membandingkan keduanya.
> > - **(b) Enkripsi kunci publik**: sama, tetapi digest dienkripsi dengan **kunci privat pengirim** $PR_a$ dan didekripsi dengan **kunci publik** $PU_a$ (ini cikal bakal tanda tangan digital).
> > - **(c) Nilai rahasia $S$**: pengirim menghitung $H(M \,\|\, S)$ (pesan disambung nilai rahasia yang disepakati) dan mengirim $M$ bersama hash itu, **tanpa** mengirim $S$; penerima menyambung $M$ dengan $S$ miliknya, menghitung hash, lalu membandingkan.

> [!cornell] #### Summary
>
> MAC dapat dibangun dari **block cipher** atau **fungsi hash**. **MAC berbasis block cipher** memakai mode **CBC/CFB** dan mengambil **blok cipherteks terakhir** sebagai MAC (**DAA** = DES-CBC; MAC 64 bit, kunci 56 bit). **MAC berbasis hash** menyambung pesan dengan kunci, $\text{MAC} = H(M \| K)$, dengan panjang sesuai hash (SHA-1: 160 bit). **HMAC-x** (RFC 2104) adalah konstruksi yang lebih aman: $H((K' \oplus \text{opad}) \| H((K' \oplus \text{ipad}) \| M))$ dengan `ipad = 0x36` dan `opad = 0x5C`. Teknik otentikasi berkunci lain: hash + enkripsi simetri, kunci publik, dan nilai rahasia $S$.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Bukan $H(K \| M)$ atau $H(M \| K)$ Polos?
>
> - **$H(K \| M)$** (kunci di depan) rentan **length-extension attack** pada hash Merkle-Damgård (SHA-1/SHA-2): dari $H(K \| M)$ penyerang dapat menghitung $H(K \| M \| \text{pad} \| M')$ tanpa $K$ ([[SHA-2 - SHA-256 dan SHA-512]]).
> - **$H(M \| K)$** (kunci di belakang, seperti di slide) bebas dari length-extension, tetapi **bergantung penuh pada collision resistance** hash: bila penyerang menemukan kolisi $H(M_1) = H(M_2)$ (seperti MD5/SHA-1), maka $H(M_1 \| K) = H(M_2 \| K)$ untuk kunci apa pun.
> - **HMAC** aman bahkan jika hash-nya punya kelemahan kolisi tertentu, dan tidak terkena length-extension; karena itu menjadi standar (TLS, IPsec, JWT `HS256`).
>
> #### CBC-MAC: Catatan Penting
>
> CBC-MAC polos **aman hanya untuk pesan dengan panjang tetap**. Untuk panjang bervariasi, penyerang dapat memalsukan pasangan pesan-MAC baru. Perbaikannya: **CMAC/OMAC** (kunci tambahan untuk blok terakhir) atau menyertakan panjang pesan di awal.
>
> #### MAC Lain
>
> **Poly1305** (dengan ChaCha20: ChaCha20-Poly1305), **GMAC** (bagian dari AES-GCM), **KMAC** (berbasis [[SHA-3 Keccak dan Konstruksi Spons]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Verifikasi contoh slide dengan Python: `hmac.new(b'12345678', b'Halo, Bob!', hashlib.sha1).hexdigest()` dan bandingkan dengan `hashlib.sha1(b'Halo, Bob!12345678')`.
> 2. Implementasikan HMAC sendiri dari definisi (ipad/opad) dan cocokkan dengan modul `hmac`.
>
> #### Bacaan Lanjutan
>
> - RFC 2104, *HMAC: Keyed-Hashing for Message Authentication*.
> - FIPS 113 (DAA) dan NIST SP 800-38B (CMAC).
> - Demo: `freeformatter.com/hmac-generator.html`.
