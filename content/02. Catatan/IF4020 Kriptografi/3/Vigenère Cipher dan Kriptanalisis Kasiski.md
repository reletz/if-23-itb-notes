---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Vigenère Cipher dan Kriptanalisis Kasiski
>
> > ## Questions/Cues
> >
> > - Apa beda cipher abjad-majemuk (polyalphabetic) dengan abjad-tunggal?
> > - Bagaimana rumus enkripsi/dekripsi Vigenère dan cara pakai Vigenère square?
> > - Mengapa histogram cipherteks Vigenère cenderung datar?
> > - Apa varian Vigenère (Full, Auto-Key, Running-Key, Extended)?
> > - Bagaimana metode Kasiski menemukan panjang kunci?
> > - Setelah panjang kunci diketahui, bagaimana huruf kunci ditemukan?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Klasik Bagian 2 (Slides 27-65)
>
> > ### Cipher Abjad-Majemuk
> >
> > **Polyalphabetic cipher** memakai **kunci berbeda untuk tiap huruf** plainteks, berbeda dari monoalphabetic yang memakai satu kunci untuk semua huruf. Tujuannya **mengatasi kelemahan** cipher abjad-tunggal terhadap analisis frekuensi.
> >
> > Bentuk umum: kunci $K = k_1 k_2 \dots k_m$ (panjang $m$). Karena $m$ lebih pendek dari plainteks, kunci **diulang periodik**. Cipherteks:
> >
> > $$C = E_k(P) = f_{k_1}(p_1)\, f_{k_2}(p_2) \dots f_{k_m}(p_m)\, f_{k_1}(p_{m+1}) \dots$$
> >
> > dengan $f$ = fungsi enkripsi cipher abjad-tunggal. Untuk $m = 1$ ia ekuivalen cipher abjad-tunggal.
> >
> > ### Vigenère Cipher
> >
> > Setiap huruf plainteks dienkripsi dengan **Caesar cipher** memakai huruf kunci di bawahnya ($A = 0, \dots, Z = 25$):
> >
> > $$\text{Enkripsi: } c_j = (p_j + k_i) \bmod 26 \qquad \text{Dekripsi: } p_j = (c_j - k_i) \bmod 26$$
> >
> > Contoh, kunci `soreang`:
> >
> > ```
> > Plainteks : t e r i m a p e s a n a n g u l a i k a m b i n g
> > Kunci     : s o r e a n g s o r e a n g s o r e a n g s o r e
> > Cipherteks: L S I M M N V W G R R A A M M Z R M K N S T W E K
> > ```
> >
> > Contoh hitung: $(t + s) = (19 + 18) \bmod 26 = 37 \bmod 26 = 11 = L$; $(e + o) = (4 + 14) \bmod 26 = 18 = S$.
> >
> > **Vigenère square** (tabel $26 \times 26$): baris $i$ adalah pergeseran alfabet sejauh $i$; enkripsi = titik potong baris huruf kunci dengan kolom huruf plainteks. Tak wajib — perhitungan modular di atas sudah cukup.
> >
> > ### Kelebihan dan Histogram Datar
> >
> > Huruf plainteks yang sama **tidak selalu** menjadi huruf cipherteks yang sama (bergantung huruf kunci). Sebaliknya, satu huruf cipherteks bisa mewakili banyak huruf plainteks. Akibatnya **distribusi huruf cipherteks mendekati seragam** dan **histogramnya datar (flat)** — inilah yang menyulitkan analisis frekuensi langsung.
> >
> > ### Sejarah
> >
> > - Digambarkan pertama kali oleh **Giovan Battista Bellaso** (1553, buku *La Cifra del Sig. Giovan Battista Bellaso*).
> > - Disempurnakan & dipublikasikan diplomat Prancis **Blaise de Vigenère** (1586). Pada abad ke-19 orang mengira ia penemunya → dikenal sebagai **Vigenère Cipher**.
> > - Dipecahkan **Babbage** dan **Kasiski** pada pertengahan abad ke-19. Sempat dijuluki *"le chiffre indéchiffrable"*.
> > - Dipakai **Tentara Konfederasi** pada Perang Sipil Amerika — padahal cipher ini sudah bisa dipecahkan saat itu.
> >
> > ### Varian Vigenère
> >
> > - **Extended Vigenère** — untuk 256 karakter ASCII: $c_j = (p_j + k_i) \bmod 256$.
> > - **Full Vigenère** — tiap baris tabel bukan pergeseran, melainkan **permutasi acak** alfabet; tabel harus dirahasiakan.
> > - **Auto-Key Vigenère** — kunci disambung dengan plainteks itu sendiri hingga sepanjang plainteks. Mis. kunci `INDO` + pesan → `INDONEGARAPENG...`.
> > - **Running-Key Vigenère** — kunci adalah teks bermakna yang **sangat panjang** (naskah proklamasi, Pembukaan UUD 1945, ayat kitab suci).
> >
> > Ketiga varian terakhir dibuat untuk **melawan metode Kasiski** yang mengeksploitasi pengulangan kunci periodik.
> >
> > ### Kriptanalisis: Metode Kasiski
> >
> > **Friedrich Kasiski** (1863) — metodenya **tidak langsung menemukan kunci**, tetapi **mengestimasi panjang kunci**. Intuisi: bila jarak antara dua string berulang di plainteks **kelipatan panjang kunci**, string itu menghasilkan **kriptogram yang sama**.
> >
> > Contoh: plainteks `cryptoisshortforcryptography`
> > - Kunci `abcd` ($m = 4$): jarak dua `crypto` = 16 = kelipatan 4 → `crypto` → kriptogram sama (`CSASTP`).
> > - Kunci `abcdef` ($m = 6$): jarak 16 **bukan** kelipatan 6 → kriptogram berbeda.
> >
> > **Langkah metode Kasiski:**
> >
> > 1. Temukan semua kriptogram yang berulang di cipherteks.
> > 2. Hitung jarak antar-perulangan.
> > 3. Cari semua **faktor pembagi** tiap jarak (kandidat panjang kunci).
> > 4. Ambil **irisan** himpunan faktor → nilai yang muncul di semua adalah dugaan panjang kunci.
> >
> > Contoh: `DYDUXRMHTVDVNQDQNWDYDUXRMHARTJGWNQD` — `DYDUXRMH` berjarak 18 (faktor $\{2,3,6,9,18\}$), `NQD` berjarak 20 (faktor $\{2,4,5,10,20\}$). Irisan = **2** → panjang kunci $\approx 2$.
> >
> > ```mermaid
> > flowchart TD
> >     A["Cari kriptogram berulang<br/>di cipherteks"] --> B["Hitung jarak antar-perulangan"]
> >     B --> C["Faktorkan tiap jarak"]
> >     C --> D["Irisan faktor → panjang kunci n"]
> >     D --> E["Kelompokkan huruf berjarak n<br/>→ n 'pesan' Caesar"]
> >     E --> F["Analisis frekuensi tiap kelompok<br/>→ tiap huruf kunci"]
> >     F --> G["Susun kunci, dekripsi"]
> > ```
> >
> > ### Menemukan Huruf Kunci
> >
> > Setelah panjang kunci $n$ diketahui: setiap huruf **berjarak $n$** dienkripsi dengan **huruf kunci yang sama**. Kelompokkan menjadi $n$ "pesan", masing-masing adalah **Caesar cipher** → pecahkan tiap kelompok dengan **analisis frekuensi** (huruf tersering tiap kelompok ≈ `e`). Alternatif: *exhaustive key search* $26^n$ (lebih lambat).
> >
> > Contoh: cipherteks dengan `LJV` berulang berjarak 15 dan 10 → faktor $\{3,5,15\}$ dan $\{2,5,10\}$, irisan **5**. Kelompokkan tiap 5 huruf; huruf tersering tiap kelompok: L, J, V, N, A. Karena `LJV` tersering = `the`, diperoleh kunci **SCRAM** ($S=18, C=2, R=17, A=0, M=12$), dan cipherteks terdekripsi: *"THE BEAR WENT OVER THE MOUNTAIN..."*

> [!cornell] #### Summary
>
> **Vigenère cipher** adalah cipher abjad-majemuk: kunci $K = k_1\dots k_m$ diulang periodik, tiap huruf dienkripsi Caesar dengan huruf kuncinya — $c_j = (p_j + k_i) \bmod 26$. Karena huruf sama bisa jadi cipher berbeda, **histogram cipherteks datar** dan analisis frekuensi langsung gagal. Dirumuskan Bellaso (1553), dipopulerkan Vigenère (1586), dipecahkan **Kasiski** (1863). **Metode Kasiski** mengestimasi panjang kunci: cari kriptogram berulang → jarak → faktor → **irisan faktor**. Setelah panjang kunci $n$ diketahui, kelompokkan huruf berjarak $n$ menjadi $n$ Caesar cipher dan pecahkan tiap kelompok dengan **analisis frekuensi**. Varian **Full / Auto-Key / Running-Key** menghilangkan periodisitas kunci untuk menggagalkan Kasiski. Cipher poligram [[Playfair dan Affine Cipher]] menempuh strategi berbeda.

> [!ad-libitum]- Additional Information
>
> #### Uji Friedman (Index of Coincidence)
>
> Selain Kasiski, panjang kunci Vigenère diestimasi dengan **Friedman test**: $\hat{m} \approx \dfrac{0{,}027 N}{(N-1)\,CI - 0{,}038 N + 0{,}065}$, dengan $CI$ = index of coincidence cipherteks (lihat [[Cipher Abjad-Tunggal dan Analisis Frekuensi]]). Metode ini lebih robust untuk cipherteks pendek karena tidak bergantung pada adanya kriptogram berulang.
>
> #### Kelemahan Setiap Varian
>
> **Auto-Key** masih bocor karena bagian kunci = plainteks, sehingga tebakan kata umum (`the`, `and`) merambat. **Running-Key** rentan bila kunci diambil dari teks terkenal — serangan menggeser dua teks bermakna satu sama lain (*crib dragging*). **Full Vigenère** paling kuat, tapi tabel rahasia $26 \times 26$ sulit didistribusikan — masalah manajemen kunci yang sama seperti cipher simetri lain.
>
> #### One-Time Pad sebagai Batas Ideal
>
> Vigenère dengan kunci **sejati-acak, sepanjang pesan, sekali pakai** = **one-time pad**, satu-satunya cipher dengan *perfect secrecy* terbukti (Shannon). Kasiski gagal total karena tidak ada periodisitas. Yang menjatuhkan Vigenère praktis selalu: kunci pendek, berulang, atau bermakna.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan pemecah Vigenère lengkap: Kasiski + Friedman untuk panjang kunci, lalu chi-squared per kolom untuk huruf kunci.
> 2. Bandingkan histogram huruf cipherteks untuk kunci panjang 1, 3, 7, dan sepanjang pesan; ukur seberapa cepat mendekati flat.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 3.2 (Polyalphabetic Ciphers).
> - Simon Singh, *The Code Book*, Bab 2–3 (Vigenère & Babbage).
> - Demo: `cryptii.com/pipes/vigenere-cipher`, `boxentriq.com/code-breaking/vigenere-cipher`.
