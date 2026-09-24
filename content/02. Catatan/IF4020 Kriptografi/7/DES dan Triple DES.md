---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] DES dan Triple DES
>
> > ## Questions/Cues
> >
> > - Bagaimana sejarah DES dan apa beda DES dengan DEA?
> > - Bagaimana struktur global DES (IP, 16 putaran Feistel, IP⁻¹)?
> > - Bagaimana fungsi $f$ bekerja (ekspansi, XOR kunci, S-box, P-box)?
> > - Bagaimana kunci putaran 48-bit dibangkitkan dari kunci 64-bit?
> > - Mengapa DES tidak lagi aman dan bagaimana dipecahkan?
> > - Mengapa Double DES gagal (meet-in-the-middle) dan bagaimana Triple DES memperbaikinya?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Review Beberapa Block Cipher, Bagian 1: DES dan Triple DES (Slides 2-53)
>
> > ### Sejarah DES
> >
> > - **1972**: NIST meminta standar enkripsi cipher blok.
> > - **1974**: Horst Feistel (IBM) merancang **Lucifer** (kunci 128 bit, blok 128 bit).
> > - Lucifer berkembang menjadi DES dengan masukan **NSA**: **kunci 56 bit**, **blok 64 bit**, **16 putaran**.
> > - **1976**: DES disetujui NBS setelah dinilai NSA; diimplementasikan luas (perangkat lunak dan keras).
> >
> > DES adalah **standar**, sedangkan algoritmanya bernama **DEA** (*Data Encryption Algorithm*); kedua nama sering dikacaukan. DES adalah cipher blok kunci-simetri berblok **64 bit**. Kunci eksternal **64 bit** tetapi hanya **56 bit** dipakai (8 **bit parity**, yaitu bit ke-8, 16, 24, ..., dibuang).
> >
> > ### Struktur Global
> >
> > Tiap blok mengalami **permutasi awal (IP)**, **16 putaran enciphering** (jaringan Feistel, tiap putaran memakai kunci internal 48 bit berbeda), lalu **inversi permutasi awal (IP⁻¹)**.
> >
> > ```mermaid
> > flowchart TD
> >     P["Plainteks 64 bit"] --> IP["IP (permutasi awal)"]
> >     IP --> S["Pisah L0 (32) dan R0 (32)"]
> >     S --> F["16 putaran Feistel<br/>Li = R(i-1)<br/>Ri = L(i-1) XOR f(R(i-1), Ki)"]
> >     F --> SW["Gabung R16 L16"]
> >     SW --> IPI["IP^-1"]
> >     IPI --> C["Cipherteks 64 bit"]
> >     K["Kunci 64 bit"] --> KS["Key schedule<br/>K1..K16 (48 bit)"]
> >     KS --> F
> > ```
> >
> > ### Pembangkitan Kunci Internal (Key Schedule)
> >
> > 1. Kunci 64 bit $\to$ **PC-1** (permutasi kompresi) membuang bit parity $\to$ **56 bit**, dibagi $C_0$ dan $D_0$ (28 bit).
> > 2. Tiap putaran $i$: $C_{i-1}, D_{i-1}$ digeser **kiri** (siklik) sejauh **1 atau 2 bit** (putaran 1, 2, 9, 16 digeser 1; lainnya 2; total 28).
> > 3. $C_i D_i$ (56 bit) $\to$ **PC-2** (permutasi kompresi) $\to$ kunci putaran **$K_i$ 48 bit**.
> >
> > ### Fungsi $f$ dalam Satu Putaran
> >
> > $$L_i = R_{i-1}, \qquad R_i = L_{i-1} \oplus f(R_{i-1}, K_i)$$
> >
> > 1. **Ekspansi $E$**: $R_{i-1}$ 32 bit $\to$ 48 bit (permutasi ekspansi; sebagian bit diduplikasi).
> > 2. **XOR kunci**: $A = E(R_{i-1}) \oplus K_i$ (48 bit).
> > 3. **Substitusi**: $A$ dibagi **8 kelompok 6 bit**, masing-masing masuk **kotak-S** ($S_1 \dots S_8$; 6 bit masuk, **4 bit** keluar) $\to$ blok $B$ 32 bit. Baris S-box = bit ke-1 dan ke-6, kolom = bit ke-2 sampai ke-5. Tiap baris S-box adalah **permutasi 0..15**; mengubah 1 bit masukan mengubah **minimal 2 bit** keluaran (**confusion**).
> > 4. **Permutasi $P$** (P-box) mengacak $B$ $\to$ $P(B)$ (**diffusion**); $R_i = L_{i-1} \oplus P(B)$.
> >
> > Contoh S1: masukan `101010` $\to$ baris `10` = 2, kolom `0101` = 5, luaran 13 = `1101`.
> >
> > ### Dekripsi
> >
> > **Algoritma yang sama** untuk enkripsi dan dekripsi; hanya **urutan kunci dibalik**: $K_{16}, K_{15}, \dots, K_1$. Tiap putaran dekripsi: $R_{i-1} = L_i$, $L_{i-1} = R_i \oplus f(L_i, K_i)$.
> >
> > ### Efek Longsoran, Mode, dan Kunci Lemah
> >
> > - **Avalanche effect**: satu bit plainteks atau kunci berubah menghasilkan perubahan besar pada cipherteks; DES menunjukkannya kuat.
> > - **Mode**: ECB, CBC, OFB, CFB, Counter ([[Konsep Cipher Blok dan Mode Operasi]]); karena sederhana, **DES-ECB** paling sering dipakai pada paket komersial.
> > - **Kunci lemah**: kunci $K$ dengan $E_K(E_K(x)) = x$ untuk semua $x$ (enkripsi = dekripsi) karena semua kunci putaran sama. DES punya **4 kunci lemah** (56 bit, hex): `00000000000000`, `0000000FFFFFFF`, `FFFFFFF0000000`, `FFFFFFFFFFFFFF`. Harus dihindari.
> > - **Implementasi**: chip perangkat keras (16,8 juta blok/detik $\approx$ 1 Gbps); perangkat lunak 32.000 blok/detik pada IBM 3090 (1976).
> >
> > ### Keamanan DES
> >
> > Keamanan ditentukan kunci. IBM mengusulkan 128 bit, tetapi **atas permintaan NSA** diperkecil menjadi **56 bit**: ruang kunci $2^{56} = 72.057.594.037.927.936$, **terlalu kecil**. Serangan **exhaustive key search** dengan known-plaintext: coba semua $k$ hingga `DES(k,p) == c`; kunci diharapkan ditemukan sebelum $2^{55}$ iterasi. Pada satu juta kunci per detik, seluruh ruang butuh $\approx 2283$ tahun dan **rata-rata setengahnya, $\approx 1142$ tahun** (angka slide).
> >
> > **Bukti praktis:**
> >
> > - **1997**: RSA Security menyelenggarakan kontes berhadiah US$10.000; dimenangkan **DESCHALL Project** dengan *idle cycles* ribuan komputer di Internet.
> > - **1998**: **EFF** membuat perangkat keras khusus (**Deep Crack**, US$250.000, 1.856 chip) yang menemukan kunci DES dalam **sedikit lebih dari 2 hari**.
> > - **1999**: perangkat EFF + kolaborasi >100.000 komputer menemukan kunci **kurang dari 1 hari**.
> >
> > Motivasi EFF: menunjukkan DES dapat dipecahkan secara praktis, bukan hanya teori. Catatan tambahan: DES dengan **kurang dari 16 putaran** dapat dipecahkan dengan known-plaintext attack, dan isi S-box masih misterius (nilai awalnya diubah).
> >
> > ### Double DES dan Meet-in-the-Middle
> >
> > **DES berganda** = DES berkali-kali dengan kunci ganda. **Double DES**: $C = E_{K_2}(E_{K_1}(P))$, $P = D_{K_1}(D_{K_2}(C))$. Kelihatannya kunci efektif $2^{112}$, tetapi **rentan meet-in-the-middle**: dari $X = E_{K_1}(P) = D_{K_2}(C)$ dan pasangan (P, C) yang diketahui,
> >
> > 1. Enkripsi $P$ dengan **semua** $K_1$ ($2^{56}$) dan simpan semua $X$ dalam **tabel**.
> > 2. Dekripsi $C$ dengan **semua** $K_2$ ($2^{56}$), cari $X$ yang **sama** di tabel.
> > 3. Uji pasangan $(K_1, K_2)$ kandidat dengan pasangan P-C lain.
> >
> > Biaya $\approx 2^{56} + 2^{56}$, bukan $2^{112}$: keamanan Double DES hanya sedikit di atas DES.
> >
> > ### Triple DES (3DES)
> >
> > Menggunakan DES **tiga kali** untuk menahan MITM. **Mode EEE**: $C = E_{K_3}(E_{K_2}(E_{K_1}(P)))$, $P = D_{K_1}(D_{K_2}(D_{K_3}(C)))$. Untuk menyederhanakan, langkah tengah diganti $D$: **mode EDE** $C = E_{K_1}(D_{K_2}(E_{K_1}(P)))$ (2 kunci) atau $E_{K_3}(D_{K_2}(E_{K_1}(P)))$ (3 kunci). **Alasan EDE**: kompatibel dengan DES tunggal (bila $K_1 = K_2 = K_3$ hasilnya DES biasa).
> >
> > | Varian | Kunci | Panjang kunci |
> > |---|---|---|
> > | 3DES 2 kunci ($K_1, K_2$) | 2 | $56 + 56 = 112$ bit |
> > | 3DES 3 kunci ($K_1, K_2, K_3$) | 3 | $56 \times 3 = 168$ bit |

> [!cornell] #### Summary
>
> **DES** (dari Lucifer/IBM, distandarkan 1976) adalah cipher blok Feistel **64-bit**, kunci **56-bit** (dari 64 dengan 8 parity), **16 putaran** dengan kunci putaran **48-bit**: **IP $\to$ 16 putaran $\to$ IP⁻¹**. Fungsi $f$: **ekspansi 32$\to$48, XOR kunci, 8 kotak-S (6$\to$4 bit, confusion), P-box (diffusion)**. Dekripsi memakai algoritma sama dengan urutan kunci terbalik. DES punya avalanche kuat, 4 kunci lemah, tetapi **ruang kunci $2^{56}$ terlalu kecil**: dipecahkan lewat DESCHALL (1997), Deep Crack EFF (2 hari, 1998), dan <1 hari (1999). **Double DES** gagal oleh **meet-in-the-middle** (biaya $\approx 2^{57}$, bukan $2^{112}$); **Triple DES** (EEE/EDE, 2 kunci = 112 bit, 3 kunci = 168 bit) memperbaikinya dan kompatibel dengan DES. Pengganti DES adalah [[AES Rijndael]].

> [!ad-libitum]- Additional Information
>
> #### Kriptanalisis Cerdas terhadap DES
>
> Selain brute force, **differential cryptanalysis** (Biham-Shamir 1990; kompleksitas $2^{47}$ chosen plaintext) dan **linear cryptanalysis** (Matsui 1993; $2^{43}$ known plaintext) lebih efisien daripada $2^{55}$, tetapi butuh banyak data. Belakangan diketahui IBM/NSA sudah mengenal differential cryptanalysis sejak 1974 dan mendesain S-box DES agar tahan terhadapnya, sementara panjang kunci 56 bit adalah titik lemah utamanya.
>
> #### Nasib 3DES
>
> 3DES tiga kunci hanya menawarkan keamanan efektif $\approx 112$ bit (karena MITM) dan berblok 64 bit sehingga rentan **Sweet32** (kolisi blok setelah $\approx 2^{32}$ blok pada mode CBC). NIST **menghentikan (deprecate) 3DES pada 2023**; gunakan AES.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan S-box lookup DES dan uji contoh `101010 -> 1101` pada S1; lalu bangun satu putaran Feistel DES lengkap (E, XOR, S-box, P) dan cocokkan dengan pustaka `pycryptodome`.
> 2. Simulasikan meet-in-the-middle pada Double-DES mini (kunci 20 bit dengan cipher toy) dan bandingkan waktu vs brute force $2^{40}$.
>
> #### Bacaan Lanjutan
>
> - FIPS PUB 46-3, *Data Encryption Standard*.
> - E. Biham & A. Shamir, *Differential Cryptanalysis of the Data Encryption Standard*, Springer, 1993.
> - EFF, *Cracking DES*, O'Reilly, 1998.
