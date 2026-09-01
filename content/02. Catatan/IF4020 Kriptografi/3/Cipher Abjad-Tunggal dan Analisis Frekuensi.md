---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Cipher Abjad-Tunggal dan Analisis Frekuensi
>
> > ## Questions/Cues
> >
> > - Apa itu cipher abjad-tunggal (monoalphabetic) dan berapa ruang kuncinya?
> > - Bagaimana membentuk tabel substitusi dari kalimat kunci?
> > - Apa kelemahan fundamental cipher abjad-tunggal?
> > - Bagaimana langkah-langkah teknik analisis frekuensi?
> > - Apa peran huruf, bigram, dan trigram tersering?
> > - Apa itu Index of Coincidence dan untuk apa?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Kriptografi Klasik Bagian 2 (Slides 1-26)
>
> > ### Cipher Abjad-Tunggal
> >
> > **Monoalphabetic cipher** adalah kelompok cipher substitusi yang mengganti **satu huruf dengan satu huruf lain** secara tetap. Caesar cipher adalah salah satunya (substitusi berdasarkan pergeseran $k$), tetapi bukan satu-satunya.
> >
> > Secara umum, tabel substitusi bisa **sembarang permutasi** 26 huruf. Jumlah kemungkinan tabel:
> >
> > $$26! = 403.291.461.126.605.635.584.000.000$$
> >
> > Ruang kunci ini **sangat besar** — *exhaustive key search* mustahil — namun cipher ini tetap lemah karena alasan lain (lihat di bawah).
> >
> > ### Tabel Substitusi dari Kalimat Kunci
> >
> > Agar kunci mudah diingat, bentuk tabel dari sebuah kalimat:
> >
> > 1. Kalimat kunci: `di bawah sinar bulan purnama hati resah jadi senang`.
> > 2. Buang duplikasi huruf: `dibawhsnrulpmtejg`.
> > 3. Sambung dengan sisa huruf alfabet yang belum ada: `dibawhsnrulpmtejgcfkoqvwxyz`.
> > 4. Petakan berurutan ke A–Z:
> >
> > ```
> > Plainteks  : A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
> > Cipherteks : D I B A W H S N R U L P M T E J G C F K O V W X Y Z
> > ```
> >
> > ### Kelemahan Fundamental
> >
> > Cipher abjad-tunggal **tidak dapat menyembunyikan hubungan statistik** antara plainteks dan cipherteks:
> >
> > - Huruf yang sama selalu dienkripsi menjadi huruf cipherteks yang sama.
> > - Huruf yang sering muncul di plainteks juga sering muncul di cipherteks (huruf koresponden).
> > - **Struktur statistik bahasa tetap tampak** di cipherteks.
> >
> > Akibatnya cipherteks dapat dipecahkan **tanpa mengetahui kunci** dengan **teknik analisis frekuensi** (pertama kali dirumuskan Al-Kindi, abad ke-9 — lihat [[Kriptanalisis dan Kriptologi]]).
> >
> > ### Teknik Analisis Frekuensi
> >
> > Kriptanalis memanfaatkan tabel frekuensi kemunculan huruf, **bigram** (pasangan), dan **trigram** dalam bahasa natural:
> >
> > - **Top huruf B. Inggris:** E, T, A, O, I, N, S, H, R, D, L, U.
> > - **Top bigram:** TH, HE, IN, EN, NT, RE, ER, AN, TI, ES.
> > - **Top trigram:** THE, AND, THA, ENT, ING, ION, TIO, FOR, NDE, HAS.
> >
> > **Langkah-langkah:**
> >
> > 1. Hitung frekuensi relatif tiap huruf dalam cipherteks.
> > 2. Bandingkan dengan tabel frekuensi bahasa: huruf tersering di cipherteks kemungkinan besar = `e`.
> > 3. Ulangi untuk huruf tersering berikutnya (biasanya cukup 2–3 huruf pertama).
> > 4. Ulangi dengan **bigram dan trigram** tersering di cipherteks — cocokkan dengan `the`, `and`, dst.
> > 5. Isi tabel substitusi bertahap dengan *trial and error* dan pengetahuan bahasa; terka kata dari pola yang muncul (mis. `t*e` → `the`, `ha*e` → `have/hate/hale/haze`).
> >
> > ```mermaid
> > flowchart TD
> >     A["Hitung frekuensi huruf<br/>di cipherteks"] --> B["Cocokkan huruf tersering<br/>→ e, t, a, o, ..."]
> >     B --> C["Cocokkan bigram/trigram tersering<br/>→ the, and, th, he"]
> >     C --> D["Terka kata dari pola parsial<br/>(t*e, ha*e, ...)"]
> >     D --> E{"Tabel substitusi<br/>lengkap &amp; konsisten?"}
> >     E -- belum --> C
> >     E -- ya --> F["Plainteks terungkap"]
> > ```
> >
> > ### Contoh Kriptanalisis (ringkas)
> >
> > Cipherteks `UZ QSO VUOHXMOPV GPOZPEVSG ...` ($N = 120$ huruf). Huruf tersering: **P** dan **Z** → dugaan `P → e`, `Z → t`. Trigram `ZWP` dan kata `ZWSZ` → `W → h`, sehingga `ZWP` = `the`, `ZWSZ` = `that` (jadi `S → a`). Lanjut: `WSFP` = `ha*e` → uji `F` = v/t/l/z, yang cocok `v` → `have`. Kriptogram `EPYEPOPDZSZUFPO` menjadi `*e*e*e*tat*ve*` → `representatives`. Hasil akhir: *"It was disclosed yesterday that several informal but direct contacts have been made with political representatives of the Viet Cong in Moscow."*
> >
> > ### Index of Coincidence (CI)
> >
> > $$CI = \sum_{i=1}^{26} \frac{f_i (f_i - 1)}{N(N - 1)}$$
> >
> > dengan $f_i$ = frekuensi huruf ke-$i$, $N$ = total huruf. Nilai acuan:
> >
> > | $CI$ | Interpretasi |
> > |---|---|
> > | $\approx 0{,}065$ | teks bahasa Inggris biasa → **monoalphabetic cipher** |
> > | $\approx 0{,}038$ | teks acak / **polyalphabetic cipher** |
> >
> > Pada contoh di atas $CI = 916 / (120 \cdot 119) = 0{,}0641$ — sangat dekat $0{,}065$, jadi hampir pasti cipher abjad-tunggal. $CI$ juga jadi alat penting untuk memperkirakan panjang kunci Vigenère.

> [!cornell] #### Summary
>
> **Cipher abjad-tunggal** mengganti tiap huruf dengan satu huruf tetap; ruang kuncinya $26! \approx 4 \times 10^{26}$ sehingga kebal *brute force*, dan kuncinya bisa dibangun dari **kalimat kunci** (buang duplikat, sambung sisa alfabet). Namun cipher ini **membocorkan statistik bahasa**: huruf sama → cipher sama, huruf sering → cipher sering. **Analisis frekuensi** mengeksploitasinya: cocokkan huruf/bigram/trigram tersering cipherteks dengan yang tersering di bahasa (E/T/A…, THE/AND…), terka kata dari pola parsial, isi tabel substitusi bertahap. **Index of Coincidence** $CI = \sum f_i(f_i-1) / [N(N-1)]$ membedakan monoalphabetic ($\approx 0{,}065$) dari polyalphabetic/acak ($\approx 0{,}038$). Untuk melawan serangan ini lahir cipher abjad-majemuk — [[Vigenère Cipher dan Kriptanalisis Kasiski]].

> [!ad-libitum]- Additional Information
>
> #### Frekuensi Huruf Bahasa Indonesia
>
> Analisis frekuensi bergantung bahasa. Dalam bahasa Indonesia huruf tersering kira-kira **A, N, E, I, T, R, S, U, K, D, M** — huruf `A` jauh mendominasi (berbeda dari `E` pada bahasa Inggris) karena imbuhan (`me-`, `-kan`, `-an`, `ber-`). Kriptanalis harus memakai tabel frekuensi yang sesuai bahasa asumsi.
>
> #### Contoh Berbahasa Panjang: "The Gold-Bug"
>
> Contoh kedua di slide (cipherteks `LIVITCSWPIYVEWHEVSRIQMXLE...`) dipecahkan bertahap: `I → e`, `XLI → the`, `XLEX → that`, lalu `state`, `here`, `at that time` → akhirnya terungkap paragraf dari cerpen Edgar Allan Poe, *The Gold-Bug* (1843) — kisah fiksi yang justru mempopulerkan analisis frekuensi ke publik.
>
> #### Nomenclator: Jalan Tengah Sejarah
>
> Sebelum Vigenère populer, diplomat memakai **nomenclator** — substitusi abjad-tunggal + daftar simbol khusus untuk nama/kata umum + *null* (simbol tanpa arti). Ini memperlambat, tapi tidak menghentikan, analisis frekuensi; kasus **Queen Mary of Scotland** ([[Sejarah Kriptografi]]) memakai nomenclator yang dipecahkan Phelippes.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun *assistant* analisis frekuensi interaktif: tampilkan histogram cipherteks, terima tebakan pemetaan, tampilkan plainteks parsial secara langsung.
> 2. Hitung $CI$ untuk beberapa cipherteks (Caesar, substitusi acak, Vigenère kunci-3, Vigenère kunci-10) dan verifikasi tren menuju $0{,}038$.
>
> #### Bacaan Lanjutan
>
> - Simon Singh, *The Code Book*, Bab 1 (Al-Kindi & analisis frekuensi).
> - William Stallings, *Cryptography and Network Security*, Bab 3.2.
> - Kakas online: `cryptool.org/en/cto/n-gram-analysis`.
