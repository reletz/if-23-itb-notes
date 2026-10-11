---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Confusion, Diffusion, dan Jaringan Feistel
>
> > ## Questions/Cues
> >
> > - Apa itu prinsip confusion dan diffusion menurut Shannon?
> > - Bagaimana S-box dan P-box merealisasikan keduanya?
> > - Apa itu iterated cipher, round function, dan round key?
> > - Bagaimana jaringan Feistel bekerja dan mengapa dekripsinya mudah?
> > - Bagaimana kunci putaran dibangkitkan (key schedule)?
> > - Apa pengaruh ukuran blok dan ukuran kunci?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Block Cipher Bagian 1 (Slides 50-72)
>
> > ### Confusion dan Diffusion
> >
> > **Claude Shannon** (1949, *Communication Theory of Secrecy Systems*) memperkenalkan dua prinsip untuk mempersulit serangan statistik; keduanya memandu perancangan **stream maupun block cipher**.
> >
> > **Legenda warna diagram dan tabel:**
> >
> > - <span style="color:#8a4fd6">■ Ungu</span>: substitusi / S-box (**confusion**)
> > - <span style="color:#1f8fa3">■ Teal</span>: permutasi / pergeseran (**diffusion**)
> > - <span style="color:#4f6bed">■ Biru</span>: fungsi putaran $f$
> > - <span style="color:#d9731a">■ Oranye</span>: XOR (⊕) dan jalur silang antarbagian
> > - <span style="color:#7a8699">■ Abu-abu putus-putus</span>: kunci dan kunci putaran
> > - <span style="color:#2f9e63">■ Hijau</span>: keluaran (cipherteks / hasil putaran)
> > - <span style="color:#d6454f">■ Merah</span>: bit yang berubah
> >
> > **1. Confusion** menyembunyikan **hubungan statistik antara plainteks, cipherteks, dan kunci**, sehingga kriptanalis tidak menemukan pola statistik. Direalisasikan lewat **substitusi non-linier**, biasanya dengan **lookup table** (S-box).
> >
> > - **DES S-box**: masukan 6 bit, luaran 4 bit. Contoh masukan `110100`: **baris** = bit ke-1 dan ke-6 = `10` (baris 2); **kolom** = bit ke-2 sampai 5 = `1010` (kolom 10). Pada kotak-S6 DES, entri baris 2 kolom 10 bernilai **4** (`0100`).
> > - **AES S-box**: masukan `23` (hex) → baris 2, kolom 3 → luaran **`26`**.
> >
> > |S-box|Masukan|Baris|Kolom|Luaran|
> > |---|---|---|---|---|
> > |DES S6 (6→4)|<code><b style="color:#d9731a">1</b><span style="color:#4f6bed">1010</span><b style="color:#d9731a">0</b></code>|<b style="color:#d9731a">10</b> = 2|<span style="color:#4f6bed">1010</span> = 10|<b style="color:#8a4fd6">4</b> = `0100`|
> > |AES (8→8)|<code><b style="color:#d9731a">2</b><span style="color:#4f6bed">3</span></code>|<b style="color:#d9731a">2</b>|<span style="color:#4f6bed">3</span>|<b style="color:#8a4fd6">26</b>|
> >
> > Pada tabel ini saja: <span style="color:#d9731a">oranye</span> = bit/digit penentu **baris**, <span style="color:#4f6bed">biru</span> = penentu **kolom**, <span style="color:#8a4fd6">ungu</span> = isi S-box.
> >
> > **2. Diffusion** menyebarkan pengaruh **satu bit plainteks atau kunci ke sebanyak mungkin bit cipherteks**. Perubahan kecil (1-2 bit) harus menghasilkan perubahan cipherteks yang **tak terprediksi**. Contoh: `1111111111111111` → `0110110000101001`; bila bit pertama diubah (`0111111111111111`) cipherteks menjadi `1011001011101111`, berbeda pada **10 dari 16 bit**. Direalisasikan dengan **permutasi/transposisi berulang**.
> >
> > ||Plainteks|Cipherteks|
> > |---|---|---|
> > |Asli|<code>1111111111111111</code>|<code>0110110000101001</code>|
> > |Bit ke-1 diubah|<code><b style="color:#d6454f">0</b>111111111111111</code>|<code><b style="color:#d6454f">10</b>1<b style="color:#d6454f">1001</b>0<b style="color:#d6454f">11</b>101<b style="color:#d6454f">11</b>1</code>|
> > |Bit berbeda|**1** bit|<b style="color:#d6454f">10</b> bit|
> >
> > Satu bit merah di plainteks menyebar menjadi sepuluh bit merah di cipherteks, tersebar di seluruh blok.
> >
> > **Permutasi** mengacak susunan bit dalam blok. Bentuknya: **P-box** (matriks permutasi; entri = posisi bit asal, mis. P-box DES: bit ke-58 pindah ke posisi 1, bit ke-50 ke posisi 2, dst; sebagian juga **kompresi** atau **ekspansi**) atau **pergeseran siklik** $k$ bit (mis. ShiftRows pada AES).
> >
> > ### Cipher Berulang (Iterated Cipher)
> >
> > Agar kuat, enkripsi dilakukan **berulang** sebanyak $r$ putaran dengan fungsi transformasi $f$ (**round function**) dan **kunci putaran** (**round key** / subkey) $K_i$:
> >
> > $$C_0 = P \oplus K_0, \quad C_i = f(C_{i-1}, K_i),\ i = 1..r-1, \quad C = C_r = C_{r-1} \oplus K_r$$
> >
> > Plainteks dinyatakan $C_0$ dan cipherteks $C_r$. **DES: $r = 16$**; **AES-128/192/256: $r = 10/12/14$**. Semakin banyak putaran, diffusion makin besar, tetapi komputasi makin tak efisien, jadi jumlah putaran menyeimbangkan **keamanan dan efisiensi**.
> >
> > Tiap putaran memuat **substitusi (confusion)** lalu **permutasi (diffusion)**, dengan kunci putaran berbeda tiap putaran. Ini adalah bentuk modern dari **super-enkripsi** klasik ([[Cipher Transposisi - Columnar dan Rail Fence]]): substitusi + transposisi berlapis.
> >
> > ```mermaid
> > flowchart TD
> >     K["Kunci K"] --> KS["Key schedule"]
> >     KS --> K1["K1"]
> >     KS --> K2["K2"]
> >     KS --> Kr["Kr"]
> >     P["Plainteks P"] --> R1["Putaran 1<br/>f(., K1)"] --> R2["Putaran 2<br/>f(., K2)"] --> RD["..."] --> Rr["Putaran r<br/>f(., Kr)"] --> C["Cipherteks C"]
> >     K1 -.-> R1
> >     K2 -.-> R2
> >     Kr -.-> Rr
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class P,RD plain
> >     class K,KS,K1,K2,Kr key
> >     class R1,R2,Rr rnd
> >     class C out
> > ```
> >
> > Abu-abu putus-putus: jalur kunci. Biru: putaran yang sama diulang $r$ kali, tiap kali dengan kunci putaran berbeda.
> >
> > ```mermaid
> > flowchart TD
> >     IN["Blok masuk"] --> S["Substitusi<br/>(S-box)"] --> PB["Permutasi<br/>(P-box / geser)"] --> X(("⊕")) --> OUT["Blok keluar"]
> >     KI["Kunci putaran Ki"] -.-> X
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef sub fill:#efe7fb,stroke:#8a4fd6,stroke-width:2px,color:#15202e
> >     classDef perm fill:#dcf1f3,stroke:#1f8fa3,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class IN plain
> >     class S sub
> >     class PB perm
> >     class X xor
> >     class KI key
> >     class OUT out
> > ```
> >
> > Isi satu putaran generik: <span style="color:#8a4fd6">ungu</span> memberi confusion, <span style="color:#1f8fa3">teal</span> memberi diffusion, lalu kunci putaran dicampur dengan <span style="color:#d9731a">XOR</span>.
> >
> > ### Jaringan Feistel
> >
> > Dipakai **DES, GOST, FEAL, Lucifer, RC5, RC6**, dan lain-lain. Blok plainteks dibagi **dua bagian** $L_0$ dan $R_0$ (masing-masing $w$ bit), lalu tiap putaran:
> >
> > $$\text{Enkripsi: } L_i = R_{i-1}, \quad R_i = L_{i-1} \oplus f_i(R_{i-1}, K_i)$$
> >
> > $$\text{Dekripsi: } R_{i-1} = L_i, \quad L_{i-1} = R_i \oplus f_i(L_i, K_i)$$
> >
> > Dekripsi adalah enkripsi yang dijalankan **dari "bawah" ke "atas"** (kunci dipakai berurutan terbalik). Sifat **reversible** ini **tidak bergantung pada fungsi $f$**, karena
> >
> > $$L_{i-1} \oplus f(R_{i-1}, K_i) \oplus f(R_{i-1}, K_i) = L_{i-1}$$
> >
> > Jadi perancang bebas membuat $f$ **serumit mungkin** (tak perlu invertibel) dan **tak perlu algoritma baru** untuk dekripsi.
> >
> > ```mermaid
> > flowchart TD
> >     L0["L(i-1)"] --> X(("⊕"))
> >     R0["R(i-1)"] --> F["f(., Ki)"]
> >     Ki["Kunci putaran Ki"] -.-> F
> >     F --> X
> >     R0 --> L1["Li = R(i-1)"]
> >     X --> R1["Ri = L(i-1) ⊕ f(R(i-1), Ki)"]
> >     classDef plain fill:#ffffff,stroke:#7a8699,color:#15202e
> >     classDef key fill:#eef0f4,stroke:#7a8699,stroke-dasharray:4 3,color:#15202e
> >     classDef rnd fill:#e3e8fb,stroke:#4f6bed,stroke-width:2px,color:#15202e
> >     classDef xor fill:#fbeadb,stroke:#d9731a,stroke-width:2px,color:#b4570f
> >     classDef out fill:#dff3e8,stroke:#2f9e63,stroke-width:2px,color:#15202e
> >     class L0,R0 plain
> >     class Ki key
> >     class F rnd
> >     class X xor
> >     class L1,R1 out
> >     linkStyle 4 stroke:#d9731a,stroke-width:2.5px
> > ```
> >
> > Garis oranye: $R_{i-1}$ **menyeberang** tanpa diubah menjadi $L_i$. Hanya separuh kiri yang berubah tiap putaran; separuh kanan dipakai sebagai masukan $f$.
> >
> > **Contoh cipher Feistel mainan** (blok 8 bit, $L$ dan $R$ 4 bit, $f(R, K) = (R \oplus K) \lll 1$ seperti pada [[Konsep Cipher Blok dan Mode Operasi]], 3 putaran). Kunci $K = 1011$; key schedule sederhana $K_i = K \lll (i-1)$ sehingga $K_1 = 1011$, $K_2 = 0111$, $K_3 = 1110$. Plainteks `A2` → $L_0 = 1010$, $R_0 = 0010$.
> >
> > **Enkripsi:**
> >
> > |$i$|$L_{i-1}$|$R_{i-1}$|$K_i$|$f(R_{i-1}, K_i)$|$L_i = R_{i-1}$|$R_i = L_{i-1} \oplus f$|
> > |---|---|---|---|---|---|---|
> > |1|`1010`|`0010`|<span style="color:#7a8699">`1011`</span>|<span style="color:#4f6bed">`(0010 ⊕ 1011) ⋘ 1 = 0011`</span>|`0010`|<span style="color:#d9731a">`1010 ⊕ 0011`</span> = `1001`|
> > |2|`0010`|`1001`|<span style="color:#7a8699">`0111`</span>|<span style="color:#4f6bed">`(1001 ⊕ 0111) ⋘ 1 = 1101`</span>|`1001`|<span style="color:#d9731a">`0010 ⊕ 1101`</span> = `1111`|
> > |3|`1001`|`1111`|<span style="color:#7a8699">`1110`</span>|<span style="color:#4f6bed">`(1111 ⊕ 1110) ⋘ 1 = 0010`</span>|<b style="color:#2f9e63">1111</b>|<b style="color:#2f9e63">1011</b>|
> >
> > Cipherteks $L_3 R_3$ = `1111 1011` = <b style="color:#2f9e63">FB</b>.
> >
> > **Dekripsi** (kunci terbalik $K_3, K_2, K_1$; $R_{i-1} = L_i$, $L_{i-1} = R_i \oplus f(L_i, K_i)$):
> >
> > |$i$|$L_i$|$R_i$|$K_i$|$f(L_i, K_i)$|$L_{i-1} = R_i \oplus f$|$R_{i-1} = L_i$|
> > |---|---|---|---|---|---|---|
> > |3|`1111`|`1011`|<span style="color:#7a8699">`1110`</span>|<span style="color:#4f6bed">`0010`</span>|<span style="color:#d9731a">`1011 ⊕ 0010`</span> = `1001`|`1111`|
> > |2|`1001`|`1111`|<span style="color:#7a8699">`0111`</span>|<span style="color:#4f6bed">`1101`</span>|<span style="color:#d9731a">`1111 ⊕ 1101`</span> = `0010`|`1001`|
> > |1|`0010`|`1001`|<span style="color:#7a8699">`1011`</span>|<span style="color:#4f6bed">`0011`</span>|<b style="color:#2f9e63">1010</b>|<b style="color:#2f9e63">0010</b>|
> >
> > Hasil `1010 0010` = `A2` ✓. Kolom $f$ pada dekripsi persis sama dengan kolom $f$ pada enkripsi (dibaca dari bawah): nilai $f$ dihitung ulang dari separuh yang **tidak berubah**, lalu XOR membatalkan dirinya. Dekripsi tidak pernah menghitung $f^{-1}$.
> >
> > ### Pembangkitan Kunci Putaran
> >
> > Setiap putaran memakai **kunci internal (round key)** yang dibangkitkan dari **kunci eksternal** lewat **key expansion / key scheduling**, dengan komputasi kompleks agar tiap kunci putaran berbeda. Panjang kunci putaran **tidak selalu sama** dengan kunci eksternal (mis. DES: kunci 64 bit $\to$ 56 bit $\to$ dua bagian 28 bit $\to$ kunci putaran 48 bit).
> >
> > ### Ukuran Blok dan Kunci
> >
> > - **Ukuran blok $n$** selalu tetap (DES: 64; AES: 128/192/256 pada Rijndael). **Makin besar blok, diffusion makin besar.**
> > - **Ukuran kunci $m$** bisa sama atau beda (DES: 56; AES: 128/192/256). **Makin besar kunci, confusion lebih besar** dan lebih tahan **brute force**.

> [!cornell] #### Summary
>
> Shannon (1949) mengajukan dua prinsip: **confusion** (menyembunyikan hubungan statistik plainteks-cipherteks-kunci, lewat **substitusi non-linier / S-box**, mis. DES 6→4 bit dan AES 8→8 bit) dan **diffusion** (menyebarkan pengaruh satu bit ke banyak bit cipherteks, lewat **permutasi/P-box** atau pergeseran siklik). Cipher blok modern adalah **iterated cipher**: $C_i = f(C_{i-1}, K_i)$ selama $r$ putaran (DES 16; AES 10/12/14) dengan kunci putaran dari **key schedule**. **Jaringan Feistel** membagi blok menjadi $L$ dan $R$: $L_i = R_{i-1}$, $R_i = L_{i-1} \oplus f(R_{i-1}, K_i)$; ia **reversible** independen dari $f$, sehingga dekripsi cukup membalik urutan kunci dan $f$ boleh serumit mungkin. Ukuran blok besar menambah diffusion, ukuran kunci besar menambah confusion dan ketahanan brute force. Penerapannya dibahas di [[DES dan Triple DES]] dan [[AES Rijndael]].

> [!ad-libitum]- Additional Information
>
> #### SPN vs Feistel
>
> Dua arsitektur utama cipher blok: **Feistel** (DES, Blowfish, RC5, GOST: hanya separuh blok berubah per putaran, $f$ tak perlu invertibel) dan **SPN, Substitution-Permutation Network** (AES, Serpent: seluruh blok disubstitusi lalu dipermutasi tiap putaran, S-box dan lapisan linier harus invertibel). Feistel butuh lebih banyak putaran; SPN berdifusi lebih cepat.
>
> #### Avalanche dan Kriteria Desain S-box
>
> Efek longsor (*avalanche*) menuntut $\approx 50\%$ bit cipherteks berubah untuk perubahan 1 bit. S-box yang baik memiliki **nonlinearity** tinggi (tahan **linear cryptanalysis**, Matsui 1993) dan **differential uniformity** rendah (tahan **differential cryptanalysis**, Biham-Shamir 1990). Sifat DES yang berubah 2 bit pada keluaran per 1 bit masukan adalah salah satu kriteria awalnya.
>
> #### Luby-Rackoff
>
> Teorema Luby-Rackoff: jaringan Feistel 3 putaran dengan fungsi putaran pseudorandom menghasilkan **permutasi pseudorandom**, dan 4 putaran menjadi **super-pseudorandom**. Ini alasan teoretis mengapa Feistel aman walau $f$ tak invertibel.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun jaringan Feistel 4 putaran dengan $f$ sembarang (mis. hash pendek) dan buktikan secara program bahwa dekripsi memulihkan plainteks untuk 10.000 pasangan acak.
> 2. Ukur efek longsor cipher mainanmu: ubah 1 bit plainteks, hitung rata-rata jumlah bit cipherteks yang berubah untuk $r = 1..16$, dan plot.
>
> #### Bacaan Lanjutan
>
> - C. E. Shannon, *"Communication Theory of Secrecy Systems"*, 1949.
> - H. Feistel, *"Cryptography and Computer Privacy"*, Scientific American, 1973.
> - Stallings, *Cryptography and Network Security*, Bab 3 (Block Ciphers and DES).
