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
> > flowchart LR
> >     M["Mode operasi cipher blok"]
> >     M --> ECB["ECB<br/>blok independen"]
> >     M --> CBC["CBC<br/>chaining blok sebelumnya"]
> >     M --> CFB["CFB<br/>umpan balik cipherteks<br/>(gaya stream)"]
> >     M --> OFB["OFB<br/>umpan balik keluaran E<br/>(gaya stream)"]
> >     M --> CTR["Counter<br/>counter dienkripsi<br/>(gaya stream)"]
> >     classDef root fill:#eef0f4,stroke:#7a8699,color:#15202e
> >     classDef blok fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef stream fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#15202e
> >     class M root
> >     class ECB,CBC blok
> >     class CFB,OFB,CTR stream
> > ```
> > 
> > <span style="color:#4f6bed">■ Biru</span> = gaya blok, <span style="color:#d9731a">■ oranye</span> = gaya stream.
> > 
> > **Contoh yang dipakai di semua mode:** blok 4 bit, $K = 1011$, $IV = 0000$, $E_K(P) = (P \oplus K) \lll 1$, plainteks `A23A9` = `1010 0010 0011 1010 1001` (5 blok).
> > 
> > **Legenda warna diagram dan tabel:**
> > 
> > - <span style="color:#4f6bed">■ Biru</span>: fungsi enkripsi $E_K$
> > - <span style="color:#d9731a">■ Oranye</span>: XOR (⊕), keystream, dan garis umpan balik ke blok berikutnya
> > - <span style="color:#2f9e63">■ Hijau</span>: cipherteks hasil
> > - <span style="color:#7a8699">■ Abu-abu putus-putus</span>: IV atau counter
> > - <span style="color:#d6454f">■ Merah</span>: blok yang rusak pada uji error
> > 
> > |Mode|Cipherteks `A23A9`|
> > |---|---|
> > |ECB|<b style="color:#2f9e63">23124</b>|
> > |CBC|<b style="color:#2f9e63">27FDF</b>|
> > |CFB ($s = b = 4$)|<b style="color:#2f9e63">DE9E3</b>|
> > |OFB ($s = b = 4$)|<b style="color:#2f9e63">DB751</b>|
> > |CTR ($T_1 = 0000$)|<b style="color:#2f9e63">D70B6</b>|
> > 
> > ### 1. ECB (Electronic Code Book)
> > 
> > Tiap blok dienkripsi **individual dan independen**: $C_i = E_K(P_i)$, $P_i = D_K(C_i)$.
> > 
> > ```mermaid
> > flowchart TB
> >     P1["Pᵢ"] --> E1["Eₖ"] --> C1["Cᵢ"]
> >     P2["Pᵢ₊₁"] --> E2["Eₖ"] --> C2["Cᵢ₊₁"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef enc fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class P1,P2 plain
> >     class E1,E2 enc
> >     class C1,C2 out
> > ```
> > 
> > Tidak ada garis antarblok: blok $i$ dan blok $i+1$ tidak saling memengaruhi.
> > 
> > Contoh (blok 4-bit, $K = 1011$, $E_K(P) = (P \oplus K) \lll 1$): plainteks `A23A9` = `1010 0010 0011 1010 1001` → XOR $K$ → `0001 1001 1000 0001 0010` → geser kiri → `0010 0011 0001 0010 0100` = **`23124`**. Blok `1010` muncul dua kali dan **selalu** menjadi `0010`.
> > 
> > **Langkah per blok:**
> > 
> > |$i$|$P_i$|$P_i \oplus K$|$\lll 1$|$C_i$|
> > |---|---|---|---|---|
> > |1|<mark>`1010` (A)</mark>|`1010 ⊕ 1011 = 0001`|`0010`|<mark><b style="color:#2f9e63">2</b></mark>|
> > |2|`0010` (2)|`0010 ⊕ 1011 = 1001`|`0011`|<b style="color:#2f9e63">3</b>|
> > |3|`0011` (3)|`0011 ⊕ 1011 = 1000`|`0001`|<b style="color:#2f9e63">1</b>|
> > |4|<mark>`1010` (A)</mark>|`1010 ⊕ 1011 = 0001`|`0010`|<mark><b style="color:#2f9e63">2</b></mark>|
> > |5|`1001` (9)|`1001 ⊕ 1011 = 0010`|`0100`|<b style="color:#2f9e63">4</b>|
> > 
> > Baris yang disorot: plainteks sama → cipherteks sama. Inilah pola yang bocor pada ECB.
> > 
> > Cek dekripsi blok 2: $D_K(0011) = (0011 \ggg 1) \oplus K = 1001 \oplus 1011 = 0010$ ✓.
> > 
> > Karena blok sama selalu menghasilkan cipherteks sama, secara teori dapat dibuat **buku kode** (_code book_) plainteks-cipherteks, satu per kunci. Untuk blok $n$ bit ada $2^n$ entri; blok 64 bit berarti $2^{64}$ entri, terlalu besar disimpan. Bila panjang plainteks bukan kelipatan blok, blok terakhir diberi **padding** (bit 0, bit 1, atau berselang-seling).
> > 
> > **Kelebihan:** blok independen sehingga bisa dienkripsi **tidak berurutan** (cocok untuk arsip yang diakses acak, mis. record basisdata); **kesalahan bit** pada satu blok cipherteks hanya memengaruhi **blok itu** saat dekripsi.
> > 
> > **Uji error:** bit teratas $C_2$ dibalik (`3` → `B`), cipherteks jadi `2B124`. Hasil dekripsi: A<b style="color:#d6454f">6</b>3A9. Hanya $P_2$ yang rusak.
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
> > Tiap blok cipherteks bergantung pada blok plainteksnya **dan seluruh blok sebelumnya**: hasil enkripsi blok sebelumnya diumpan-balikkan. Blok pertama memerlukan blok semu $C_0 =$ **IV** (_initialization vector_), diberikan pengguna atau dibangkitkan acak.
> > 
> > $$C_i = E_K(P_i \oplus C_{i-1}) \qquad P_i = D_K(C_i) \oplus C_{i-1}, \quad C_0 = IV$$
> > 
> > ```mermaid
> > flowchart TB
> >     IV["Cᵢ₋₁<br/>(blok pertama: IV)"] --> X1(("⊕"))
> >     P1["Pᵢ"] --> X1 --> E1["Eₖ"] --> C1["Cᵢ"]
> >     C1 -. umpan balik .-> X2(("⊕"))
> >     P2["Pᵢ₊₁"] --> X2 --> E2["Eₖ"] --> C2["Cᵢ₊₁"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef iv fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef enc fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class P1,P2 plain
> >     class IV iv
> >     class E1,E2 enc
> >     class X1,X2 xor
> >     class C1,C2 out
> >     linkStyle 0,4 stroke:#d9731a,stroke-width:2.5px
> > ```
> > 
> > Plainteks di-XOR dengan cipherteks sebelumnya **sebelum** masuk ke $E_K$. Garis oranye menunjukkan rantai $C_{i-1} \to$ XOR.
> > 
> > Contoh (plainteks `A23A9`, $K = 1011$, $IV = 0000$): $C_1 = 0010$ (2), $C_2 = 0111$ (7), $C_3 = 1111$ (F), $C_4 = 1101$ (D), $C_5 = 1111$ (F) → **CBC: `27FDF`** versus **ECB: `23124`**.
> > 
> > **Langkah per blok:**
> > 
> > |$i$|$P_i$|$P_i \oplus C_{i-1}$|$\oplus K$|$\lll 1 = C_i$|
> > |---|---|---|---|---|
> > |1|`1010`|`1010 ⊕ 0000 = 1010`|`0001`|`0010` (<b style="color:#2f9e63">2</b>)|
> > |2|`0010`|`0010 ⊕ 0010 = 0000`|`1011`|`0111` (<b style="color:#2f9e63">7</b>)|
> > |3|`0011`|`0011 ⊕ 0111 = 0100`|`1111`|`1111` (<b style="color:#2f9e63">F</b>)|
> > |4|`1010`|`1010 ⊕ 1111 = 0101`|`1110`|`1101` (<b style="color:#2f9e63">D</b>)|
> > |5|`1001`|`1001 ⊕ 1101 = 0100`|`1111`|`1111` (<b style="color:#2f9e63">F</b>)|
> > 
> > Blok 1 dan 4 sama-sama `A`, tetapi cipherteksnya berbeda (2 dan D), karena $C_{i-1}$ yang dicampurkan berbeda.
> > 
> > Cek dekripsi blok 2: $D_K(0111) = 1011 \oplus 1011 = 0000$, lalu $\oplus, C_1 = 0000 \oplus 0010 = 0010$ ✓.
> > 
> > **Kelebihan:** blok plainteks sama **tidak** menghasilkan blok cipherteks sama, sehingga kriptanalisis lebih sulit (alasan utama memakai CBC).
> > 
> > **Kelemahan/karakter kesalahan:** kesalahan 1 bit pada blok **plainteks** merambat ke blok cipherteks itu **dan semua berikutnya**. Sebaliknya saat **dekripsi**, kesalahan 1 bit pada blok cipherteks hanya memengaruhi blok plainteks yang bersangkutan dan **1 bit yang berkoresponden** pada blok plainteks berikutnya.
> > 
> > **Uji error:** bit teratas $C_2$ dibalik (`7` → `F`), cipherteks jadi `2FFDF`. Hasil dekripsi: A<b style="color:#d6454f">6</b><b style="color:#d6454f">B</b>A9. $P_2$ rusak (`2` → `6`) dan $P_3$ salah tepat 1 bit (`3` → `B`, bit teratas), sisanya benar.
> > 
> > ### 3. CFB (Cipher Feedback)
> > 
> > Mengatasi kekurangan CBC pada data yang **belum mencapai satu blok**. Data dienkripsi dalam unit $s$ bit ($s \le b$, $b$ = ukuran blok): 1, 2, 4, 8 bit, dst. CFB 8-bit mengenkripsi satu karakter tiap kali. **CFB memperlakukan cipher blok seperti stream cipher.** Butuh **antrian (shift register)** $b$ bit, diinisialisasi dengan IV.
> > 
> > $$C_j = P_j \oplus MSB_s(E_K(X_j)) \qquad X_{j+1} = LSB_{b-s}(X_j) ,|, C_j$$
> > 
> > ```mermaid
> > flowchart TB
> >     Q1["Antrian = Cᵢ₋₁<br/>(awal: IV)"] --> E1["Eₖ"] --> X1(("⊕"))
> >     P1["Pᵢ"] --> X1 --> C1["Cᵢ"]
> >     C1 -. umpan balik .-> E2["Eₖ"] --> X2(("⊕"))
> >     P2["Pᵢ₊₁"] --> X2 --> C2["Cᵢ₊₁"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef iv fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef enc fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class P1,P2 plain
> >     class Q1 iv
> >     class E1,E2 enc
> >     class X1,X2 xor
> >     class C1,C2 out
> >     linkStyle 4 stroke:#d9731a,stroke-width:2.5px
> > ```
> > 
> > Plainteks **tidak** masuk ke $E_K$. Yang dienkripsi adalah antrian; hasilnya dipakai sebagai keystream untuk di-XOR dengan plainteks. Garis oranye: **cipherteks** yang keluar menjadi isi antrian berikutnya.
> > 
> > Dekripsi: $P_j = C_j \oplus MSB_s(E_K(X_j))$ dengan pembaruan antrian sama. Untuk $s = b$: $C_i = P_i \oplus E_K(C_{i-1})$, $C_0 = IV$. Kesalahan 1 bit plainteks merambat ke $C$ yang bersangkutan dan seterusnya; pada dekripsi, kesalahan 1 bit cipherteks memengaruhi **blok plainteks itu dan satu blok berikutnya**.
> > 
> > **Langkah per blok** ($s = b = 4$, sehingga antrian berikutnya = $C_i$):
> > 
> > |$i$|Antrian|$E_K(\text{antrian})$|$P_i \oplus E_K$|$C_i$|
> > |---|---|---|---|---|
> > |1|`0000` (IV)|`(0000 ⊕ 1011) ⋘ 1 = 0111`|`1010 ⊕ 0111`|`1101` (<b style="color:#2f9e63">D</b>)|
> > |2|`1101`|`(1101 ⊕ 1011) ⋘ 1 = 1100`|`0010 ⊕ 1100`|`1110` (<b style="color:#2f9e63">E</b>)|
> > |3|`1110`|`(1110 ⊕ 1011) ⋘ 1 = 1010`|`0011 ⊕ 1010`|`1001` (<b style="color:#2f9e63">9</b>)|
> > |4|`1001`|`(1001 ⊕ 1011) ⋘ 1 = 0100`|`1010 ⊕ 0100`|`1110` (<b style="color:#2f9e63">E</b>)|
> > |5|`1110`|`(1110 ⊕ 1011) ⋘ 1 = 1010`|`1001 ⊕ 1010`|`0011` (<b style="color:#2f9e63">3</b>)|
> > 
> > Hasil **CFB: `DE9E3`**. Kolom "Antrian" di baris $i+1$ selalu sama dengan $C_i$ di baris $i$. Cek dekripsi blok 2: $C_2 \oplus E_K(C_1) = 1110 \oplus 1100 = 0010$ ✓. Perhatikan dekripsi juga memakai $E_K$, bukan $D_K$.
> > 
> > **Uji error:** bit teratas $C_2$ dibalik (`E` → `6`), cipherteks jadi `D69E3`. Hasil dekripsi: A<b style="color:#d6454f">A</b><b style="color:#d6454f">2</b>A9. $P_2$ salah 1 bit (karena XOR langsung), lalu $P_3$ ikut rusak karena $C_2$ yang salah masuk ke antrian. $P_4$ dan $P_5$ benar lagi.
> > 
> > ### 4. OFB (Output Feedback)
> > 
> > Mirip CFB, kecuali **$s$ bit hasil enkripsi antrian** (bukan cipherteks) disalin ke posisi paling kanan antrian. Akibatnya keystream **tidak bergantung pada plainteks/cipherteks**. Kesalahan 1 bit plainteks hanya memengaruhi blok cipherteks yang bersangkutan (dan sebaliknya saat dekripsi): **tidak ada penjalaran kesalahan**, cocok untuk transmisi analog terdigitisasi (suara, video) yang menoleransi kesalahan 1 bit.
> > 
> > $$O_i = E_K(O_{i-1}),; O_0 = IV \qquad C_i = P_i \oplus O_i \qquad (s = b)$$
> > 
> > ```mermaid
> > flowchart TB
> >     Q1["Antrian = Oᵢ₋₁<br/>(awal: IV)"] --> E1["Eₖ"] --> O1["Oᵢ (keystream)"] --> X1(("⊕"))
> >     P1["Pᵢ"] --> X1 --> C1["Cᵢ"]
> >     O1 -. umpan balik .-> E2["Eₖ"] --> O2["Oᵢ₊₁"] --> X2(("⊕"))
> >     P2["Pᵢ₊₁"] --> X2 --> C2["Cᵢ₊₁"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef iv fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef enc fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef ks fill:#fff6ee,stroke:#d9731a,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class P1,P2 plain
> >     class Q1 iv
> >     class E1,E2 enc
> >     class O1,O2 ks
> >     class X1,X2 xor
> >     class C1,C2 out
> >     linkStyle 5 stroke:#d9731a,stroke-width:2.5px
> > ```
> > 
> > Beda dengan CFB hanya di **titik ambil umpan balik** (garis oranye): OFB mengambilnya **sebelum** XOR ($O_i$), CFB **sesudah** XOR ($C_i$).
> > 
> > **Langkah per blok:**
> > 
> > |$i$|$O_{i-1}$|$O_i = E_K(O_{i-1})$|$P_i \oplus O_i$|$C_i$|
> > |---|---|---|---|---|
> > |1|`0000` (IV)|`(0000 ⊕ 1011) ⋘ 1 = 0111`|`1010 ⊕ 0111`|`1101` (<b style="color:#2f9e63">D</b>)|
> > |2|`0111`|`(0111 ⊕ 1011) ⋘ 1 = 1001`|`0010 ⊕ 1001`|`1011` (<b style="color:#2f9e63">B</b>)|
> > |3|`1001`|`(1001 ⊕ 1011) ⋘ 1 = 0100`|`0011 ⊕ 0100`|`0111` (<b style="color:#2f9e63">7</b>)|
> > |4|`0100`|`(0100 ⊕ 1011) ⋘ 1 = 1111`|`1010 ⊕ 1111`|`0101` (<b style="color:#2f9e63">5</b>)|
> > |5|`1111`|`(1111 ⊕ 1011) ⋘ 1 = 1000`|`1001 ⊕ 1000`|`0001` (<b style="color:#2f9e63">1</b>)|
> > 
> > Hasil **OFB: `DB751`**. Keystream <span style="color:#d9731a">**`7 9 4 F 8`**</span> bisa dihitung **sebelum** plainteks ada, karena hanya bergantung pada $K$ dan IV.
> > 
> > **Uji error:** bit teratas $C_2$ dibalik (`B` → `3`), cipherteks jadi `D3751`. Hasil dekripsi: A<b style="color:#d6454f">A</b>3A9. Hanya $P_2$ yang salah, tepat 1 bit. Tidak ada penjalaran.
> > 
> > ### 5. Counter Mode (CTR)
> > 
> > Tanpa chaining. **Counter** $T_j$ berukuran sama dengan blok; nilainya **berbeda untuk tiap blok** (awal diinisialisasi, lalu +1 tiap blok). Cipherteks: $C_j = P_j \oplus E_K(T_j)$.
> > 
> > ```mermaid
> > flowchart TB
> >     T1["Tᵢ"] --> E1["Eₖ"] --> X1(("⊕"))
> >     P1["Pᵢ"] --> X1 --> C1["Cᵢ"]
> >     T2["Tᵢ₊₁ = Tᵢ + 1"] --> E2["Eₖ"] --> X2(("⊕"))
> >     P2["Pᵢ₊₁"] --> X2 --> C2["Cᵢ₊₁"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef iv fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef enc fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class P1,P2 plain
> >     class T1,T2 iv
> >     class E1,E2 enc
> >     class X1,X2 xor
> >     class C1,C2 out
> > ```
> > 
> > Tidak ada garis umpan balik: tiap blok hanya butuh nilai counter-nya sendiri.
> > 
> > **Langkah per blok** (counter awal $T_1 = 0000$):
> > 
> > |$i$|$T_i$|$E_K(T_i)$|$P_i \oplus E_K(T_i)$|$C_i$|
> > |---|---|---|---|---|
> > |1|`0000`|`(0000 ⊕ 1011) ⋘ 1 = 0111`|`1010 ⊕ 0111`|`1101` (<b style="color:#2f9e63">D</b>)|
> > |2|`0001`|`(0001 ⊕ 1011) ⋘ 1 = 0101`|`0010 ⊕ 0101`|`0111` (<b style="color:#2f9e63">7</b>)|
> > |3|`0010`|`(0010 ⊕ 1011) ⋘ 1 = 0011`|`0011 ⊕ 0011`|`0000` (<b style="color:#2f9e63">0</b>)|
> > |4|`0011`|`(0011 ⊕ 1011) ⋘ 1 = 0001`|`1010 ⊕ 0001`|`1011` (<b style="color:#2f9e63">B</b>)|
> > |5|`0100`|`(0100 ⊕ 1011) ⋘ 1 = 1111`|`1001 ⊕ 1111`|`0110` (<b style="color:#2f9e63">6</b>)|
> > 
> > Hasil **CTR: `D70B6`**. Blok ke-4 bisa langsung dihitung dari $T_4$ tanpa menunggu blok 1–3, sehingga paralel dan akses acak.
> > 
> > **Uji error:** bit teratas $C_2$ dibalik (`7` → `F`), cipherteks jadi `DF0B6`. Hasil dekripsi: A<b style="color:#d6454f">A</b>3A9. Hanya $P_2$ salah 1 bit, sama seperti OFB.
> > 
> > **Kelebihan:** hanya butuh algoritma **enkripsi** $E$; dapat mengenkripsi blok **secara acak** (tak harus berurutan); blok dapat diproses **paralel**; sederhana dan cepat. **Syarat:** counter tidak diketahui/tidak dapat diprediksi dan tak boleh berulang untuk kunci yang sama.
> > 
> > |Mode|Blok independen?|Paralel enkripsi|Propagasi error dekripsi|Gaya|
> > |---|---|---|---|---|
> > |ECB|ya|ya|hanya blok itu|<span style="color:#4f6bed">blok</span>|
> > |CBC|tidak|tidak (dekripsi ya)|blok itu + 1 bit di blok berikut|<span style="color:#4f6bed">blok</span>|
> > |CFB|tidak|tidak|blok itu + satu blok berikut|<span style="color:#d9731a">stream</span>|
> > |OFB|tidak (keystream)|tidak|tidak menjalar|<span style="color:#d9731a">stream</span>|
> > |CTR|ya (keystream)|ya|tidak menjalar|<span style="color:#d9731a">stream</span>|

> [!cornell] #### Summary
> 
> **Cipher blok** mengenkripsi blok bit berpanjang tetap ($C = E_K(P)$, $P = D_K(C)$), dengan fungsi $E$ yang rumit dan berputar berulang. **Mode operasi** mengatur cara blok diproses: **ECB** (independen, $C_i = E_K(P_i)$; blok sama menghasilkan cipherteks sama sehingga rentan analisis pola dan manipulasi/penghapusan blok), **CBC** ($C_i = E_K(P_i \oplus C_{i-1})$ dengan IV; menghilangkan pola tetapi error menjalar), **CFB** dan **OFB** (mengubah cipher blok menjadi stream cipher dengan antrian; OFB tanpa penjalaran error), serta **Counter** (mengenkripsi counter unik; paralel dan akses acak). Pada contoh sama (`A23A9`, $K = 1011$, $IV = 0000$): ECB `23124`, CBC `27FDF`, CFB `DE9E3`, OFB `DB751`, CTR `D70B6`. Prinsip perancangan di balik $E$ dibahas di [[Confusion, Diffusion, dan Jaringan Feistel]].

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
> - NIST SP 800-38A, _Recommendation for Block Cipher Modes of Operation_.
> - William Stallings, _Cryptography and Network Security_, Bab 6-7.