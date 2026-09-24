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
> > **1. Confusion** menyembunyikan **hubungan statistik antara plainteks, cipherteks, dan kunci**, sehingga kriptanalis tidak menemukan pola statistik. Direalisasikan lewat **substitusi non-linier**, biasanya dengan **lookup table** (S-box).
> >
> > - **DES S-box**: masukan 6 bit, luaran 4 bit. Contoh masukan `110100`: **baris** = bit ke-1 dan ke-6 = `10` (baris 2); **kolom** = bit ke-2 sampai 5 = `1010` (kolom 10). Pada kotak-S6 DES, entri baris 2 kolom 10 bernilai **4** (`0100`).
> > - **AES S-box**: masukan `23` (hex) → baris 2, kolom 3 → luaran **`26`**.
> >
> > **2. Diffusion** menyebarkan pengaruh **satu bit plainteks atau kunci ke sebanyak mungkin bit cipherteks**. Perubahan kecil (1-2 bit) harus menghasilkan perubahan cipherteks yang **tak terprediksi**. Contoh: `1111111111111111` → `0110110000101001`; bila bit pertama diubah (`0111111111111111`) cipherteks menjadi `1011001011101111`, berbeda pada **10 dari 16 bit**. Direalisasikan dengan **permutasi/transposisi berulang**.
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
> > flowchart LR
> >     K["Kunci K"] --> KS["Key schedule"]
> >     KS --> K1["K1"]
> >     KS --> K2["K2"]
> >     KS --> Kr["Kr"]
> >     P["Plainteks P"] --> R1["Putaran 1<br/>f(., K1)"] --> R2["Putaran 2<br/>f(., K2)"] --> RD["..."] --> Rr["Putaran r<br/>f(., Kr)"] --> C["Cipherteks C"]
> >     K1 --> R1
> >     K2 --> R2
> >     Kr --> Rr
> > ```
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
> >     L0["L(i-1)"] --> X(("XOR"))
> >     R0["R(i-1)"] --> F["f(., Ki)"]
> >     Ki["Kunci putaran Ki"] --> F
> >     F --> X
> >     R0 --> L1["Li = R(i-1)"]
> >     X --> R1["Ri = L(i-1) XOR f(R(i-1), Ki)"]
> > ```
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
