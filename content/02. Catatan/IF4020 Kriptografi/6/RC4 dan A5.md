---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] RC4 dan A5
>
> > ## Questions/Cues
> >
> > - Bagaimana RC4 membangkitkan keystream (KSA dan PRGA)?
> > - Mengapa RC4 kini dianggap tidak aman dan dilarang di TLS?
> > - Apa itu A5/1, dan bagaimana tiga LFSR dengan kaidah mayoritas bekerja?
> > - Bagaimana A5/1 diinisialisasi dari kunci sesi dan nomor frame?
> > - Bagaimana A5/1 dipecahkan?
> > - Mengapa A5 tidak aktif di Indonesia?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Modern dan Stream Cipher (Slides 40-73)
>
> > ### RC4
> >
> > Stream cipher paling populer, dibuat **Ronald Rivest (1987)** di RSA Laboratories (*Ron's Code* / *Rivest Cipher*), **namun kini tidak aman**. Dipakai di **SSL/TLS**, **WEP** (IEEE 802.11), dan **WPA**.
> >
> > - Kunci rahasia panjang **maks 256 byte**; bila lebih pendek, karakter kunci diulang periodik.
> > - Keluaran: keystream berpanjang tak terbatas, dibangkitkan **byte demi byte** lalu di-XOR dengan byte plainteks.
> > - Status internal: larik **$S[0..255]$** (permutasi 0-255 yang bergantung kunci) dan dua pencacah indeks **$i$, $j$**.
> > - Dua sub-proses: **KSA** dan **PRGA**.
> >
> > **KSA (Key-Scheduling Algorithm)**:
> >
> > ```
> > for i = 0 to 255: S[i] = i
> > j = 0
> > for i = 0 to 255:
> >     j = (j + S[i] + K[i mod Length(K)]) mod 256
> >     swap(S[i], S[j])
> > ```
> >
> > **PRGA (Pseudo-Random Generation Algorithm)**:
> >
> > ```
> > i = 0; j = 0
> > for idx = 0 to Length(P) - 1:
> >     i = (i + 1) mod 256
> >     j = (j + S[i]) mod 256
> >     swap(S[i], S[j])
> >     t = (S[i] + S[j]) mod 256
> >     u = S[t]              // keystream byte
> >     c = u XOR P[idx]
> > ```
> >
> > Verifikasi: kunci `Key` dan plainteks `Plaintext` menghasilkan cipherteks `BBF316E8D940AF0AD3` (vektor uji standar).
> >
> > ```mermaid
> > flowchart LR
> >     K["Kunci rahasia K"] --> KSA["KSA<br/>acak larik S[0..255]"]
> >     KSA --> PRGA["PRGA<br/>swap S[i],S[j]; u = S[(S[i]+S[j]) mod 256]"]
> >     PRGA --> U["Keystream byte u"]
> >     P["Plainteks byte"] --> X(("XOR"))
> >     U --> X
> >     X --> C["Cipherteks byte"]
> > ```
> >
> > **Keamanan RC4**: byte awal keystream **berkorelasi tinggi dengan byte awal kunci** (karena itu disarankan **membuang 256-512 byte pertama**); sebagai stream cipher ia tidak tahan **flip-bit attack**; dipecahkan dalam **jam atau hari**; sejak **Februari 2015 dilarang di TLS (RFC 7465)**. Varian perbaikan: **Spritz, RC4A, VMPC, RC4+**.
> >
> > ### A5
> >
> > **A5** adalah stream cipher untuk mengenkripsi sinyal percakapan **GSM**. Frame GSM 228 bit dikirim tiap 4,6 ms; A5 menghasilkan keystream **228 bit** yang di-XOR dengan frame. Kunci sesi **64 bit**. Dikembangkan Prancis. Dua versi: **A5/1** (kuat, Eropa) dan **A5/2** (lemah, versi ekspor). A5/1 semula rahasia tetapi terbongkar lewat *reverse engineering* pada **1994**.
> >
> > **Struktur A5/1**: tiga LFSR berpanjang **19, 22, 23 bit** (total 64). Bit dengan indeks 0 = LSB (paling kanan). Keluaran = **XOR ketiga LFSR**. Tiap register punya bit kendali detak dan bit umpan balik:
> >
> > | Register | Panjang | Bit kendali detak | Bit umpan balik (taps) |
> > |---|---|---|---|
> > | R1 | 19 | bit 8 | 13, 16, 17, 18 |
> > | R2 | 22 | bit 10 | 20, 21 |
> > | R3 | 23 | bit 10 | 7, 20, 21, 22 |
> >
> > **Kaidah mayoritas (stop/go)**: tiap putaran, bit kendali ketiga register diperiksa, dicari bit mayoritas; register yang bit kendalinya **sama dengan mayoritas** didetak. Biasanya 2 atau 3 register didetak; peluang sebuah register didetak = $\tfrac{3}{4}$. Saat didetak, bit-bit taps di-XOR dan hasilnya masuk ke LSB (geser ke kiri); bit MSB yang terlempar di-XOR bersama menjadi keluaran.
> >
> > **Pembangkitan keystream**:
> >
> > 1. Semua register di-nol-kan. Selama **64 putaran**, tiap bit kunci sesi $K[i]$ di-XOR ke LSB tiap register, lalu semua didetak.
> > 2. Selama **22 putaran**, bit nomor frame $Fn[i]$ dicampurkan dengan cara sama.
> > 3. **100 putaran** stop/go (kaidah mayoritas), keluaran **dibuang**.
> > 4. **228 putaran** stop/go menghasilkan **228 bit keystream** untuk mengenkripsi satu frame.
> >
> > A5/1 ditanam di chip **SIM card**. Di negara yang melarang operator mengenkripsi percakapan, **termasuk Indonesia**, A5 **dinonaktifkan** dan sinyal terkirim sebagai plainteks.
> >
> > ### Keamanan A5/1
> >
> > Tujuan kriptanalisis: menemukan **kunci sesi**, dengan asumsi penyerang mengetahui keluaran A5/1 pada awal komunikasi (**known-plaintext**) sehingga sisa percakapan dapat didekripsi. Serangan pertama oleh **Ross Anderson (1994)**: menebak **42 bit** isi R1 dan R2 lalu menurunkan 23 bit R3; butuh **lebih dari sebulan** di PC. Kemudian kunci ditemukan dalam **hitungan menit**. A5/1 sudah berhasil dikriptanalisis.

> [!cornell] #### Summary
>
> **RC4** (Rivest, 1987) membangkitkan keystream byte demi byte dari larik permutasi $S[0..255]$ lewat **KSA** (mengacak $S$ dengan kunci) dan **PRGA** (swap dan $u = S[(S[i]+S[j]) \bmod 256]$, lalu $c = u \oplus p$). Dulu dipakai di TLS, WEP, WPA, tetapi byte awalnya berkorelasi dengan kunci, rentan flip-bit, dipecahkan dalam jam/hari, dan **dilarang di TLS (RFC 7465, 2015)**. **A5/1** mengenkripsi frame GSM 228 bit dengan **tiga LFSR (19+22+23 = 64 bit)** yang didetak **stop/go berkaidah mayoritas**; diinisialisasi dari kunci sesi 64 bit dan nomor frame 22 bit, dengan 100 putaran pemanasan. Rahasianya terbongkar 1994 dan diserang known-plaintext (Anderson 1994; kini hitungan menit). Di Indonesia A5 dinonaktifkan sehingga sinyal GSM plainteks. Contoh stream cipher modern yang menggantikannya: [[Trivium, Salsa20, dan ChaCha20]].

> [!ad-libitum]- Additional Information
>
> #### Serangan pada RC4
>
> **Fluhrer-Mantin-Shamir (2001)** menunjukkan bahwa IV WEP yang dilekatkan di depan kunci membocorkan byte kunci: cukup ratusan ribu paket untuk memulihkan kunci WEP (kemudian alat seperti `aircrack-ng`). **Bias Mantin-Shamir**: byte kedua keystream bernilai 0 dengan peluang $\approx 2/256$, dua kali lipat acak. Serangan **RC4 NOMORE (2015)** memulihkan cookie HTTPS dalam hitungan jam. Inilah latar belakang RFC 7465.
>
> #### Mengapa A5/1 Dipecahkan
>
> Ruang statusnya efektif hanya 64 bit (tepatnya lebih kecil karena kaidah mayoritas menciptakan bias) sehingga **time-memory trade-off** dengan tabel pelangi (Karsten Nohl, 2009) memulihkan kunci dari beberapa detik rekaman. Penggantinya: **A5/3 (KASUMI)** dan **A5/4** (cipher blok), lalu 128-EEA/EIA (SNOW 3G, AES, ZUC) pada 4G/5G.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan RC4 dari nol, verifikasi vektor uji `Key/Plaintext`, lalu ukur bias byte kedua keystream pada 1 juta kunci acak.
> 2. Simulasikan A5/1 kecil (tiga LFSR + majority clocking) dan tulis serangan tebak-dan-tentukan pada versi mini (register 8-10 bit).
>
> #### Bacaan Lanjutan
>
> - RFC 7465, *Prohibiting RC4 Cipher Suites*, 2015.
> - Ross Anderson, *"A5 (Was: HACKING DIGITAL PHONES)"*, sci.crypt, 1994.
> - Demo: `crypt-online.ru/en/crypts/rc4`, simulator A5/1 `733amir.github.io/a51-cipher-simulator`.
