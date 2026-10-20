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
> > ```mermaid
> > flowchart LR
> >     P1["P1"] --> X1["XOR IV=0"] --> E1["E_K"] --> C1["C1"]
> >     C1 --> X2["XOR P2"]
> >     P2["P2"] --> X2 --> E2["E_K"] --> C2["C2"]
> >     C2 --> D["..."] --> Cm["Cm = MAC"]
> > ```
> >
> > Bila DES dipakai, MAC = ukuran blok = **64 bit**, dan kunci rahasia MAC adalah kunci DES (**56 bit**) ([[DES dan Triple DES]]). **DAA (Data Authentication Algorithm)** adalah algoritma MAC berbasis **DES-CBC** yang dipakai luas.
> >
> > ### (b) MAC Berbasis Fungsi Hash
> >
> > Fungsi hash seperti MD5 dan SHA dapat dipakai sebagai MAC: pesan $M$ **disambung (concatenate) dengan kunci $K$**, lalu di-hash:
> >
> > $$\text{MAC} = H(M \,\|\, K)$$
> >
> > ($\|$ = concatenation.) Panjang MAC mengikuti fungsi hash: SHA-1 menghasilkan MAC **160 bit**. Skenarionya: Alice dan Bob berbagi kunci rahasia `KEY`; Alice mengirim `DATA` bersama MAC-nya, Bob menghitung ulang dan membandingkan.
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
> > **Contoh slide**: $M$ = `Halo, Bob!`, $K$ = `12345678`, hash SHA-1 $\to$ MAC = `6f8605c7c3a649a40abfb87b44aa21f356e931a0` (ini hasil **HMAC-SHA1** asli, berbeda dari hash polos `SHA1(M || K)` yang bernilai `d3308cfe4d98c738757b9d654d61e213889a578b`).
> >
> > ### Teknik Otentikasi Lain dengan Kunci
> >
> > Selain MAC, slide menyebut tiga cara lain untuk mengotentikasi pesan memakai kunci:
> >
> > - **(a)** fungsi hash + **enkripsi simetri** (hash pesan dienkripsi dengan kunci simetri),
> > - **(b)** **kriptografi kunci publik** (basis tanda tangan digital, [[Tanda-tangan Digital dengan Hash dan RSA]]),
> > - **(c)** **nilai rahasia $S$** yang disepakati pengirim dan penerima (ditambahkan ke pesan sebelum di-hash).

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
