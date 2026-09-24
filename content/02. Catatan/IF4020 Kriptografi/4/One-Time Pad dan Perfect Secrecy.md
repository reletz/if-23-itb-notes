---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] One-Time Pad dan Perfect Secrecy
>
> > ## Questions/Cues
> >
> > - Apakah unbreakable cipher benar-benar ada, dan apa syaratnya?
> > - Siapa penemu OTP dan siapa yang membuktikan keamanannya?
> > - Bagaimana enkripsi dan dekripsi OTP, dan apa bedanya dengan Vigenère?
> > - Mengapa kunci dari teks novel atau kunci yang dipakai dua kali membuat OTP gagal?
> > - Mengapa cipherteks OTP tidak bisa dipecahkan (pemetaan satu-ke-satu)?
> > - Apa definisi perfect secrecy menurut Shannon?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — One-Time Pad (Slides 1-19)
>
> > ### Unbreakable Cipher
> >
> > *Unbreakable cipher* adalah klaim kriptografer atas algoritma rancangannya, tetapi kebanyakan algoritma yang pernah dibuat adalah **breakable cipher**. Caesar, Vigenère, Playfair, Affine, Enigma, dan Hill sudah kedaluwarsa karena semuanya breakable (lihat [[Caesar Cipher dan ROT13]] sampai [[Hill Cipher dan Enigma Cipher]]).
> >
> > Apakah cipher yang tak terpecahkan benar-benar ada? **Ada.** Syaratnya ada tiga:
> >
> > 1. **Kunci acak sejati** (*truly random*).
> > 2. **Panjang kunci = panjang plainteks**.
> > 3. **Kunci hanya dipakai sekali**, tidak boleh dipakai ulang untuk pesan lain.
> >
> > **Acak sejati** berarti nilainya tidak dapat diprediksi dan pembangkitannya tidak dapat diulang. Ini berbeda dengan **pseudo-random**, yang bisa diulang persis bila *seed*-nya sama. Akibat syarat 1 dan 2: plainteks yang sama tidak selalu menghasilkan cipherteks yang sama.
> >
> > ### One-Time Pad (OTP)
> >
> > **One-time pad** adalah satu-satunya algoritma kriptografi dengan **perfect secrecy**. Ditemukan oleh **Gilbert Vernam (1917)** dan dibuktikan secara matematis oleh **Claude Shannon (1949)**.
> >
> > OTP menambal kelemahan Vigenère. Vigenère mengulang kunci secara periodik sehingga jatuh oleh metode Kasiski ([[Vigenère Cipher dan Kriptanalisis Kasiski]]); pada OTP panjang kunci sama dengan panjang plainteks dan seluruh karakternya acak sejati.
> >
> > **Pad** berarti bloknot: lembaran berisi deretan huruf kunci acak. Pengirim dan penerima memegang **salinan pad yang sama**. Satu pad hanya dipakai sekali lalu **dihancurkan** agar tidak dipakai lagi, sehingga kriptanalisis makin sulit.
> >
> > ```mermaid
> > flowchart LR
> >     G["Bangkitkan pad<br/>acak sejati, sepanjang pesan"] --> S["Salin pad ke<br/>pengirim &amp; penerima<br/>(saluran aman)"]
> >     S --> E["Pengirim: C = (P + K) mod 26"]
> >     E --> D["Penerima: P = (C - K) mod 26"]
> >     D --> X["Hancurkan pad<br/>(tidak boleh dipakai lagi)"]
> > ```
> >
> > ### Enkripsi dan Dekripsi
> >
> > Aturannya persis seperti Vigenère, hanya **tanpa pengulangan kunci**:
> >
> > $$C = (P + K) \bmod 26 \qquad P = (C - K) \bmod 26$$
> >
> > Contoh $P = \text{o}, K = \text{t}$: $C = (14 + 19) \bmod 26 = 7 = \text{H}$. Dekripsi $C = \text{H}, K = \text{t}$: $P = (7 - 19) \bmod 26 = -12 \bmod 26 = 14 = \text{o}$.
> >
> > | | |
> > |---|---|
> > | Plainteks | `onetimepad` |
> > | Kunci | `tbfrgfarfm` |
> > | Cipherteks | `HOJKOREGFP` |
> >
> > *Catatan verifikasi: slide menulis cipherteks `HOJKOREGHP`, tetapi hasil hitung ulang `a + f = 0 + 5 = F` memberi huruf ke-9 = **F**, bukan H. Catatan ini memakai hasil yang dihitung ulang.*
> >
> > ### Pelanggaran Syarat = Bukan OTP Lagi
> >
> > - **Kunci diambil dari teks panjang** (novel, buku, berita): bukan lagi OTP karena teks bermakna tidak acak. Tidak ada perfect secrecy dan cipherteks dapat dipecahkan (setara *running-key Vigenère*).
> > - **Kunci dipakai dua kali**: menjadi **two-time pad** dan tidak aman. Dua cipherteks berkunci sama, bila dikurangkan, menghilangkan kunci dan menyisakan selisih dua plainteks, yang bisa diurai dengan analisis frekuensi dan tebakan kata.
> >
> > ### Mengapa OTP Tidak Dapat Dipecahkan
> >
> > 1. **Kunci acak + plainteks tidak acak = cipherteks acak.**
> > 2. **Pemetaan satu-ke-satu**: untuk sembarang pasangan plainteks dan cipherteks hanya ada **satu kunci** yang memetakannya. Kriptanalis yang mencoba banyak kunci akan mendapat **banyak plainteks bermakna** dan tidak punya dasar memilih yang benar.
> >
> > Contoh (cipherteks `HOJKOREGFP`, 10 huruf): kunci `POYYAEAAZX` menghasilkan `salmoneggs` (telur ikan salmon), sedangkan kunci `BXFGBMWCUM` menghasilkan `greenfield` (lapangan hijau). Keduanya bermakna; tidak ada cara memutuskan mana yang asli.
> >
> > *Nilai kunci di slide (`LMCCAWAAZD` dan `ZDVUZOEYEO`) tidak mereproduksi kedua plainteks itu saat dihitung ulang; prinsipnya tetap sama.*
> >
> > ### Bukti Ringkas
> >
> > Misalkan $C = (P + K) \bmod 26$ dengan $K$ seragam: $P(K = k) = \tfrac{1}{26}$. Untuk setiap plainteks tetap $P = p$, pemetaan $K \mapsto C$ bersifat satu-ke-satu, sehingga
> >
> > $$P(C = c \mid P = p) = \tfrac{1}{26} \quad \text{untuk setiap } c$$
> >
> > yakni cipherteks berdistribusi **seragam** apa pun plainteksnya.
> >
> > ### Perfect Secrecy
> >
> > **Perfect secrecy**: cipherteks tidak memberi informasi apa pun tentang plainteks maupun kunci. Shannon membuktikan OTP memilikinya dalam *"Communication Theory of Secrecy Systems"* (Bell System Technical Journal, 28(4), 1949). Secara matematis, informasi tentang plainteks tidak bertambah setelah cipherteks diamati:
> >
> > $$P(P = p \mid C = c) = P(P = p)$$
> >
> > Peluang plainteks tertentu **sama** sebelum dan sesudah cipherteks dilihat.

> [!cornell] #### Summary
>
> **Unbreakable cipher ada**, yaitu **one-time pad** (Vernam, 1917; dibuktikan Shannon, 1949), dengan tiga syarat: kunci **acak sejati**, **sepanjang plainteks**, dan **sekali pakai**. Rumusnya sama dengan Vigenère, $C = (P + K) \bmod 26$, tetapi tanpa pengulangan kunci sehingga Kasiski tak berlaku. Kunci dari teks bermakna bukan OTP, dan kunci yang dipakai dua kali menjadi **two-time pad** yang tidak aman. OTP tak terpecahkan karena pemetaan $P \leftrightarrow C$ untuk kunci tertentu bersifat **satu-ke-satu**: satu cipherteks bisa didekripsi menjadi banyak plainteks bermakna (mis. `salmoneggs` vs `greenfield`) tanpa cara membedakannya, dan cipherteks berdistribusi seragam $\tfrac{1}{26}$. Inilah **perfect secrecy**: $P(P = p \mid C = c) = P(P = p)$. Kerugiannya ada pada praktik, dibahas di [[Kelemahan dan Penggunaan OTP]].

> [!ad-libitum]- Additional Information
>
> #### OTP Biner: XOR
>
> Pada komputer OTP hampir selalu berupa **XOR**: $C = P \oplus K$, dengan dekripsi identik $P = C \oplus K$. Ini setara penjumlahan modulo 2 per bit, dan bukti perfect secrecy identik: untuk $P$ tetap, $K \mapsto P \oplus K$ adalah bijeksi. Stream cipher modern (ChaCha20, RC4) meniru OTP dengan mengganti kunci acak sejati oleh *keystream* pseudo-random dari kunci pendek, sehingga keamanannya turun dari informasi-teoretis menjadi komputasional.
>
> #### Mengapa Two-Time Pad Fatal
>
> Jika $C_1 = P_1 \oplus K$ dan $C_2 = P_2 \oplus K$, maka $C_1 \oplus C_2 = P_1 \oplus P_2$: kunci lenyap dan yang tersisa adalah XOR dua plainteks. Dengan *crib dragging* (menggeser tebakan kata umum seperti ` the `), kedua plainteks terbuka. Proyek **VENONA** (AS) memecahkan sebagian pesan intelijen Soviet karena pad diproduksi ulang dan terpakai dua kali.
>
> #### Hubungan dengan Entropi
>
> Perfect secrecy menuntut $H(K) \ge H(P)$: entropi kunci minimal setara entropi pesan ([[Teori Informasi dan Entropi]]). Itulah sebab kunci harus sepanjang pesan; kunci yang lebih pendek pasti membocorkan sesuatu.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan OTP XOR dan demonstrasikan two-time pad: enkripsi dua kalimat dengan kunci sama, lalu pulihkan keduanya lewat crib dragging.
> 2. Bangkitkan pad dari `/dev/urandom`, lalu uji distribusi cipherteks (chi-squared) untuk plainteks berbahasa Indonesia; bandingkan dengan Vigenère berkunci pendek.
>
> #### Bacaan Lanjutan
>
> - C. E. Shannon, *"Communication Theory of Secrecy Systems"*, Bell System Technical Journal, 1949.
> - Cryptomuseum: `cryptomuseum.com/crypto/otp/index.htm`.
> - Demo: `cachesleuth.com/onetimepad.html`.
