---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Konsep Cipher Blok dan Mode Operasi
>
> > ## Questions/Cues
> >
> > - Bagaimana cipher blok bekerja dan apa beda ukuran blok dan ukuran kunci?
> > - Apa itu mode operasi dan apa lima modenya?
> > - Mengapa ECB tidak aman walau algoritmanya kuat?
> > - Bagaimana CBC mengatasi kelemahan ECB, dan apa peran IV?
> > - Bagaimana CFB, OFB, dan Counter mengubah cipher blok menjadi stream cipher?
> > - Bagaimana penjalaran kesalahan pada tiap mode?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Block Cipher Bagian 1 (Slides 2-49)
>
> > ### Cipher Blok
> >
> > Berbeda dengan stream cipher ([[Stream Cipher dan LFSR]]), **cipher blok membagi plainteks menjadi blok-blok bit berpanjang sama** (umum 64, 128, 256 bit). Panjang blok cipherteks = panjang blok plainteks. Kunci eksternal tidak harus sama panjang dengan blok (mis. DES: blok 64, kunci 56; AES: blok 128, kunci 128/192/256).
> >
> > $$C = E_K(P) \qquad P = D_K(C)$$
> >
> > **Contoh fungsi $E$ sederhana (lemah)**: $E_K(P) = (P \oplus K) \lll 1$ (XOR dengan kunci lalu geser wrapping 1 bit ke kiri); $D_K(C) = (C \ggg 1) \oplus K$. Plainteks `110111010001000101000101` dibagi 3 blok 8-bit `11011101 00010001 01000101`, kunci $K = 01010110$: blok 1: $11011101 \oplus 01010110 = 10001011$, geser kiri $\to$ **$C_1 = 00010111$**; dekripsi: geser kanan $\to 10001011$, XOR $K \to 11011101$. Cipher blok modern membuat $E$ dan $D$ jauh lebih rumit (substitusi, permutasi, shifting, kompresi, ekspansi) dan **mengulangnya dalam banyak putaran**.
> >
> > Daftar sebagian cipher blok: Lucifer, DES, GOST, 3DES, RC2, RC5, Blowfish, AES, IDEA, LOKI, FEAL, CAST-128, SAFER, Twofish, Serpent, RC6, Camellia, Skipjack, TEA, XTEA, SEED, MARS, CRYPTON, LEA, dan lain-lain.
> >
> > ### Mode Operasi
> >
> > **Mode operasi** menyangkut cara blok pesan dioperasikan **sebelum** dienkripsi/didekripsi oleh $E$ dan $D$. Ada lima: **ECB, CBC, CFB, OFB, Counter**.
> >
> > ```mermaid
> > flowchart TD
> >     M["Mode operasi cipher blok"]
> >     M --> ECB["ECB<br/>blok independen"]
> >     M --> CBC["CBC<br/>chaining blok sebelumnya"]
> >     M --> CFB["CFB<br/>umpan balik cipherteks<br/>(gaya stream)"]
> >     M --> OFB["OFB<br/>umpan balik keluaran E<br/>(gaya stream)"]
> >     M --> CTR["Counter<br/>counter dienkripsi<br/>(gaya stream)"]
> > ```
> >
> > ### 1. ECB (Electronic Code Book)
> >
> > Tiap blok dienkripsi **individual dan independen**: $C_i = E_K(P_i)$, $P_i = D_K(C_i)$.
> >
> > Contoh (blok 4-bit, $K = 1011$, $E_K(P) = (P \oplus K) \lll 1$): plainteks `A23A9` = `1010 0010 0011 1010 1001` → XOR $K$ → `0001 1001 1000 0001 0010` → geser kiri → `0010 0011 0001 0010 0100` = **`23124`**. Blok `1010` muncul dua kali dan **selalu** menjadi `0010`.
> >
> > Karena blok sama selalu menghasilkan cipherteks sama, secara teori dapat dibuat **buku kode** (*code book*) plainteks-cipherteks, satu per kunci. Untuk blok $n$ bit ada $2^n$ entri; blok 64 bit berarti $2^{64}$ entri, terlalu besar disimpan. Bila panjang plainteks bukan kelipatan blok, blok terakhir diberi **padding** (bit 0, bit 1, atau berselang-seling).
> >
> > **Kelebihan:** blok independen sehingga bisa dienkripsi **tidak berurutan** (cocok untuk arsip yang diakses acak, mis. record basisdata); **kesalahan bit** pada satu blok cipherteks hanya memengaruhi **blok itu** saat dekripsi.
> >
> > **Kelemahan:**
> >
> > 1. Plainteks berulang (mis. spasi panjang) menghasilkan **blok cipherteks berulang** sehingga rentan analisis frekuensi.
> > 2. Lawan dapat **memanipulasi cipherteks**. Contoh: pesan "Uang ditransfer lima satu juta rupiah" (blok 2 karakter, C1..C16). Bila kriptanalis tahu blok nominal (C8 dan C9) dan **membuang** keduanya, penerima mendekripsi menjadi "Uang ditransfer satu juta rupiah" (bermakna) dan menyimpulkan nominal salah.
> >
> > Solusinya: enkripsi tiap blok **bergantung pada blok-blok sebelumnya** (prinsip CBC).
> >
> > ### 2. CBC (Cipher Block Chaining)
> >
> > Tiap blok cipherteks bergantung pada blok plainteksnya **dan seluruh blok sebelumnya**: hasil enkripsi blok sebelumnya diumpan-balikkan. Blok pertama memerlukan blok semu $C_0 = $ **IV** (*initialization vector*), diberikan pengguna atau dibangkitkan acak.
> >
> > $$C_i = E_K(P_i \oplus C_{i-1}) \qquad P_i = D_K(C_i) \oplus C_{i-1}, \quad C_0 = IV$$
> >
> > Contoh (plainteks `A23A9`, $K = 1011$, $IV = 0000$): $C_1 = 0010$ (2), $C_2 = 0111$ (7), $C_3 = 1111$ (F), $C_4 = 1101$ (D), $C_5 = 1111$ (F) → **CBC: `27FDF`** versus **ECB: `23124`**. (Slide menulis `27FBF`; hasil hitung ulang huruf ke-4 adalah **D**, bukan B.)
> >
> > **Kelebihan:** blok plainteks sama **tidak** menghasilkan blok cipherteks sama, sehingga kriptanalisis lebih sulit (alasan utama memakai CBC).
> >
> > **Kelemahan/karakter kesalahan:** kesalahan 1 bit pada blok **plainteks** merambat ke blok cipherteks itu **dan semua berikutnya**. Sebaliknya saat **dekripsi**, kesalahan 1 bit pada blok cipherteks hanya memengaruhi blok plainteks yang bersangkutan dan **1 bit yang berkoresponden** pada blok plainteks berikutnya.
> >
> > ### 3. CFB (Cipher Feedback)
> >
> > Mengatasi kekurangan CBC pada data yang **belum mencapai satu blok**. Data dienkripsi dalam unit $s$ bit ($s \le b$, $b$ = ukuran blok): 1, 2, 4, 8 bit, dst. CFB 8-bit mengenkripsi satu karakter tiap kali. **CFB memperlakukan cipher blok seperti stream cipher.** Butuh **antrian (shift register)** $b$ bit, diinisialisasi dengan IV.
> >
> > $$C_j = P_j \oplus MSB_s(E_K(X_j)) \qquad X_{j+1} = LSB_{b-s}(X_j) \,\|\, C_j$$
> >
> > Dekripsi: $P_j = C_j \oplus MSB_s(E_K(X_j))$ dengan pembaruan antrian sama. Untuk $s = b$: $C_i = P_i \oplus E_K(C_{i-1})$, $C_0 = IV$. Kesalahan 1 bit plainteks merambat ke $C$ yang bersangkutan dan seterusnya; pada dekripsi, kesalahan 1 bit cipherteks memengaruhi **blok plainteks itu dan satu blok berikutnya**.
> >
> > ### 4. OFB (Output Feedback)
> >
> > Mirip CFB, kecuali **$s$ bit hasil enkripsi antrian** (bukan cipherteks) disalin ke posisi paling kanan antrian. Akibatnya keystream **tidak bergantung pada plainteks/cipherteks**. Kesalahan 1 bit plainteks hanya memengaruhi blok cipherteks yang bersangkutan (dan sebaliknya saat dekripsi): **tidak ada penjalaran kesalahan**, cocok untuk transmisi analog terdigitisasi (suara, video) yang menoleransi kesalahan 1 bit.
> >
> > ### 5. Counter Mode (CTR)
> >
> > Tanpa chaining. **Counter** $T_j$ berukuran sama dengan blok; nilainya **berbeda untuk tiap blok** (awal diinisialisasi, lalu +1 tiap blok). Cipherteks: $C_j = P_j \oplus E_K(T_j)$.
> >
> > **Kelebihan:** hanya butuh algoritma **enkripsi** $E$; dapat mengenkripsi blok **secara acak** (tak harus berurutan); blok dapat diproses **paralel**; sederhana dan cepat. **Syarat:** counter tidak diketahui/tidak dapat diprediksi dan tak boleh berulang untuk kunci yang sama.
> >
> > | Mode | Blok independen? | Paralel enkripsi | Propagasi error dekripsi | Gaya |
> > |---|---|---|---|---|
> > | ECB | ya | ya | hanya blok itu | blok |
> > | CBC | tidak | tidak (dekripsi ya) | blok itu + 1 bit di blok berikut | blok |
> > | CFB | tidak | tidak | blok itu + satu blok berikut | stream |
> > | OFB | tidak (keystream) | tidak | tidak menjalar | stream |
> > | CTR | ya (keystream) | ya | tidak menjalar | stream |

> [!cornell] #### Summary
>
> **Cipher blok** mengenkripsi blok bit berpanjang tetap ($C = E_K(P)$, $P = D_K(C)$), dengan fungsi $E$ yang rumit dan berputar berulang. **Mode operasi** mengatur cara blok diproses: **ECB** (independen, $C_i = E_K(P_i)$; blok sama menghasilkan cipherteks sama sehingga rentan analisis pola dan manipulasi/penghapusan blok), **CBC** ($C_i = E_K(P_i \oplus C_{i-1})$ dengan IV; menghilangkan pola tetapi error menjalar), **CFB** dan **OFB** (mengubah cipher blok menjadi stream cipher dengan antrian; OFB tanpa penjalaran error), serta **Counter** (mengenkripsi counter unik; paralel dan akses acak). Pada contoh sama, ECB `23124` sedangkan CBC `27FDF`. Prinsip perancangan di balik $E$ dibahas di [[Confusion, Diffusion, dan Jaringan Feistel]].

> [!ad-libitum]- Additional Information
>
> #### Efek Penguin ECB
>
> Mengenkripsi gambar bitmap dengan ECB tetap memperlihatkan **siluet gambar** (blok warna sama menjadi cipherteks sama). Demonstrasi klasik logo Tux menunjukkan mengapa **ECB tidak boleh dipakai** untuk data terstruktur, walau cipher-nya AES.
>
> #### Mode Modern: AEAD
>
> Pada praktik, hindari mode "polos": pakai **AES-GCM** atau **ChaCha20-Poly1305** (CTR + otentikasi) agar terlindung dari bit-flipping. CBC tanpa MAC rentan **padding oracle attack** (Vaudenay 2002). Aturan IV: CBC butuh IV **tak terprediksi**; CTR/GCM butuh nonce **unik**, jangan berulang.
>
> #### Ciphertext Stealing dan Padding
>
> Alih-alih padding, **ciphertext stealing** membuat panjang cipherteks = panjang plainteks. Padding standar **PKCS#7** menambahkan $k$ byte bernilai $k$ ( `pad`/`unpad` di pustaka Python).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan cipher toy $E_K(P) = (P \oplus K) \lll 1$ dan kelima mode; verifikasi angka `23124` (ECB) dan `27FDF` (CBC) pada contoh di atas.
> 2. Enkripsi gambar PNG dengan AES-ECB vs AES-CBC dan bandingkan hasilnya secara visual; lalu demonstrasikan serangan penghapusan blok pada ECB.
>
> #### Bacaan Lanjutan
>
> - NIST SP 800-38A, *Recommendation for Block Cipher Modes of Operation*.
> - William Stallings, *Cryptography and Network Security*, Bab 6-7.
