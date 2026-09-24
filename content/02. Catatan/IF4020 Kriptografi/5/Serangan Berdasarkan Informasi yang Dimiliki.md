---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Serangan Berdasarkan Informasi yang Dimiliki
>
> > ## Questions/Cues
> >
> > - Apa itu serangan terhadap kriptografi dan apa yang diasumsikan diketahui penyerang?
> > - Apa lima jenis serangan berdasarkan informasi yang tersedia?
> > - Mengapa ciphertext-only attack paling sulit dan chosen-ciphertext paling "kuat"?
> > - Bagaimana Caesar dan Vigenère jatuh oleh tiap model serangan?
> > - Kapan algoritma disebut aman secara komputasi (computationally secure)?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Serangan pada Kriptografi (Slides 1-21)
>
> > ### Pendahuluan dan Definisi Serangan
> >
> > Inti kriptografi adalah menjaga kerahasiaan pesan atau kunci dari **pihak ketiga**: musuh, lawan, penyadap, **kriptanalis**. Lawan berusaha memecahkan cipherteks dengan **menyerang sistem kriptografi**. Tujuannya: **mengungkap plainteks** dari cipherteks, atau **mendapatkan kunci dekripsi** agar bisa mendekripsi potongan cipherteks lain.
> >
> > **Serangan** (*attack*) adalah setiap usaha atau percobaan penyerang untuk menemukan kunci atau plainteks dari cipherteksnya. Asumsinya: **penyerang mengetahui algoritma** yang dipakai. Ini **Prinsip Kerckhoffs**: semua algoritma harus publik, hanya kunci yang rahasia ([[Terminologi Dasar Kriptografi]]). Jadi **keamanan sistem terletak pada kunci**.
> >
> > ### Lima Jenis Serangan Berdasarkan Informasi
> >
> > | # | Serangan | Yang dimiliki/dikuasai penyerang |
> > |---|---|---|
> > | 1 | **Ciphertext-only** | hanya cipherteks |
> > | 2 | **Known-plaintext** | pasangan (plainteks, cipherteks) tertentu |
> > | 3 | **Chosen-plaintext** | bisa memilih plainteks lalu mendapat cipherteksnya |
> > | 4 | **Adaptive-chosen-plaintext** | memilih plainteks bertahap berdasarkan hasil sebelumnya |
> > | 5 | **Chosen-ciphertext** | bisa memilih cipherteks lalu mendapat plainteksnya (oracle dekripsi) |
> >
> > ```mermaid
> > flowchart LR
> >     A["Ciphertext-only<br/>(paling sulit)"] --> B["Known-plaintext"]
> >     B --> C["Chosen-plaintext"]
> >     C --> D["Adaptive<br/>chosen-plaintext"]
> >     B --> E["Chosen-ciphertext"]
> >     A -. "informasi &amp; kendali penyerang bertambah" .-> D
> > ```
> >
> > ### 1. Ciphertext-Only Attack
> >
> > Kriptanalis **hanya punya cipherteks**. Ini serangan **paling sulit** karena informasinya paling sedikit. Teknik: *exhaustive key search*, terkaan, **analisis frekuensi**, dan sebagainya.
> >
> > Diberikan $C_i = E_k(P_i)$ untuk beberapa $i$; deduksi $P_1, \dots, P_i$ atau $k$ untuk mendapatkan $P_{i+1}$ dari $C_{i+1}$.
> >
> > Contoh Caesar: penyerang hanya punya `KHOORZRUOG`. Karena hanya ada 25 pergeseran, ia mencoba semuanya (*brute force*); pergeseran 3 ke kiri menghasilkan `HELLOWORLD`, kunci dan pesan terungkap.
> >
> > ### 2. Known-Plaintext Attack
> >
> > Diberikan pasangan $P_i$ dan $C_i = E_k(P_i)$; deduksi $k$ untuk mendapatkan $P_{i+1}$ dari $C_{i+1}$. Sering terjadi karena **sebagian isi pesan bisa ditebak**, khususnya pesan berformat terstruktur:
> >
> > - `From` dan `To` pada email, salam pembuka `Dengan hormat` dan penutup `wassalam` pada surat resmi.
> > - `#include` dan kata kunci `program` pada *source code*, *header* file, protokol standar.
> >
> > Dengan pasangan itu, kunci dapat dicari (lihat [[Playfair dan Affine Cipher]] dan [[Hill Cipher dan Enigma Cipher]]: $K = CP^{-1}$). Contoh Caesar: cipherteks `KHOOR ZRUOG` dan diketahui plainteks memuat `HELLO`; pasangan $H \to K$ memberi pergeseran $k = 3$, lalu seluruh cipherteks didekripsi.
> >
> > ### 3. Chosen-Plaintext Attack
> >
> > Kriptanalis **memilih plainteks sesuka hati** (yang paling mengarahkan penemuan kunci), mengirimkannya ke sistem enkripsi, dan mengamati cipherteks. **Asumsi: penyerang punya akses ke sistem enkripsi.**
> >
> > - **Caesar**: pilih `AAAAA`; keluar `FFFFF`, jadi $A \to F$ dan pergeseran = 5.
> > - **Vigenère**: pilih $P = \text{AAAA}\ldots = 000\ldots$; karena $C = (P + K) \bmod 26$, maka **$C = K$**. Cipherteks yang keluar *adalah* kuncinya.
> > - **Ilustrasi ATM**: kriptanalis ke-1 mengubah PIN dan memasukkannya ke ATM; ATM mengenkripsi PIN dengan kunci $k$ dan mengirim cipherteks ke bank; kriptanalis ke-2 menyadap cipherteks itu dan mempelajarinya untuk menyimpulkan $k$.
> >
> > ### 4. Adaptive-Chosen-Plaintext Attack
> >
> > Variasi chosen-plaintext: penyerang tidak hanya memilih plainteks, tetapi **menyesuaikan plainteks berikutnya berdasarkan cipherteks query sebelumnya**. Ia "belajar" bertahap, memilih plainteks yang lebih cerdas.
> >
> > - **Caesar**: kirim `A` dan dapat `F` (dugaan pergeseran 5); untuk memastikan kirim `B` dan dapat `G`. Pola konsisten, kunci pasti 5.
> > - **Vigenère**: kirim `AAAA` (dapat $C = K$), lalu `BBBB` (`1111`) untuk memverifikasi hasil dengan $K$ yang sama.
> >
> > ### 5. Chosen-Ciphertext Attack
> >
> > Penyerang **memilih cipherteks** dan mendekripsinya dengan sebuah **oracle dekripsi**, lalu memakai hasilnya untuk memecahkan cipher atau mencari kunci: $C_i$, $P_i = D_k(C_i)$. Deduksi $k$ (yang mungkin diperlukan untuk mendekripsi pesan di masa depan).
> >
> > Contoh Caesar: penyerang memilih cipherteks `A`, dekripsi menghasilkan `X`; jadi pergeseran $k = 3$.
> >
> > ### Aman Secara Komputasi
> >
> > Berbeda dengan OTP yang aman secara informasi-teoretis ([[One-Time Pad dan Perfect Secrecy]]), algoritma dikatakan **computationally secure** bila memenuhi tiga kriteria:
> >
> > 1. Persamaan matematika operasinya **sangat kompleks** sehingga tidak mungkin dipecahkan secara analitik.
> > 2. **Biaya** memecahkan cipherteks **melampaui nilai informasi** yang dikandungnya.
> > 3. **Waktu** memecahkan cipherteks **melampaui lamanya informasi itu harus dirahasiakan**.

> [!cornell] #### Summary
>
> **Serangan** adalah usaha lawan menemukan kunci atau plainteks, dengan asumsi ia **mengetahui algoritma** (Kerckhoffs), sehingga keamanan bertumpu pada kunci. Berdasarkan informasi yang dimiliki ada lima model: **ciphertext-only** (paling sulit; brute force, frekuensi), **known-plaintext** (pasangan P-C, sering karena format pesan bisa ditebak), **chosen-plaintext** (memilih $P$, mis. `AAAA` pada Vigenère menghasilkan $C = K$), **adaptive-chosen-plaintext** (memilih $P$ bertahap sesuai hasil sebelumnya), dan **chosen-ciphertext** (memilih $C$ untuk didekripsi oracle). Cipher klasik seperti Caesar jatuh oleh semuanya. Sistem disebut **computationally secure** bila mustahil dipecahkan secara analitik, dan biaya serta waktu pemecahannya melampaui nilai dan masa rahasia informasi. Klasifikasi lain berdasarkan tujuan penyerang ada di [[Serangan Berdasarkan Tujuan Penyerang]].

> [!ad-libitum]- Additional Information
>
> #### Model Serangan dan Definisi Keamanan Modern
>
> Definisi keamanan cipher modern dirumuskan lewat model ini: **IND-CPA** (penyerang chosen-plaintext tak bisa membedakan enkripsi dua pesan pilihannya) dan **IND-CCA2** (sama, tetapi dengan akses oracle dekripsi adaptif). AES-GCM dan RSA-OAEP dirancang mencapai IND-CCA2. Chosen-ciphertext bukan teori semata: **padding oracle attack** dan **Bleichenbacher attack** pada RSA PKCS#1 v1.5 memakai oracle dekripsi nyata (pesan galat server) untuk memulihkan plainteks.
>
> #### Chosen-Plaintext di Dunia Nyata
>
> Serangan **BEAST** dan **CRIME/BREACH** pada TLS adalah chosen-plaintext: skrip penyerang di browser korban menyuntikkan plainteks pilihan ke dalam request terenkripsi dan mengamati panjang/isi cipherteks. Perang Dunia II juga mencatat "gardening": Sekutu memancing Jerman mengenkripsi teks yang bisa ditebak (mis. menanam ranjau di lokasi tertentu agar dilaporkan) sebagai crib untuk Enigma.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat *oracle* enkripsi Vigenère (kunci tersembunyi) dan tulis penyerang chosen-plaintext yang memulihkan kunci dengan satu query `AAAA...`; lalu ubah oracle menjadi cipher Hill 2x2 dan tunjukkan berapa query minimal yang dibutuhkan.
> 2. Klasifikasikan 10 serangan terkenal (mis. Bleichenbacher, BEAST, meet-in-the-middle) ke kelima model di atas.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 1 dan 2 (Overview, model serangan).
> - Hackers-Arise, *Cryptography Basics Part 2: Attack Models for Cryptanalysis*.
> - Jonathan Katz & Yehuda Lindell, *Introduction to Modern Cryptography*, Bab 3 (CPA, CCA security).
