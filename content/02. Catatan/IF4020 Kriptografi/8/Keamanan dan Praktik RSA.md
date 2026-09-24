---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Keamanan dan Praktik RSA
>
> > ## Questions/Cues
> >
> > - Mengapa memfaktorkan $n$ sama dengan memecahkan RSA?
> > - Berapa panjang $n$ yang aman dan bagaimana sejarah sayembara RSA?
> > - Bagaimana ancaman komputer kuantum (algoritma Shor)?
> > - Mengapa RSA dipakai dalam hybrid cryptography, bukan untuk pesan besar?
> > - Bagaimana man-in-the-middle menyerang distribusi kunci publik?
> > - Apa itu PKCS#1 dan OAEP, dan bagaimana RSA dipakai di Python?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Algoritma RSA (Slides 17-54)
>
> > ### Keamanan: Pemfaktoran
> >
> > Kunci publik $(e, n)$ diumumkan. Bila $n$ berhasil difaktorkan menjadi $p$ dan $q$, maka $\phi(n) = (p-1)(q-1)$ dapat dihitung, lalu **$d \equiv e^{-1} \pmod{\phi(n)}$ ikut terhitung**. Jadi keamanan RSA = **kesulitan memfaktorkan $n$**; makin besar $n$, makin sulit.
> >
> > - Penemu RSA menyarankan $p$ dan $q$ **lebih dari 100 digit** sehingga $n$ lebih dari 200 digit.
> > - Dengan algoritma pemfaktoran tercepat dan komputer 1 milidetik per operasi, memfaktorkan bilangan **200 digit butuh $\approx 4$ miliar tahun**, **500 digit $\approx 10^{25}$ tahun** (angka slide).
> > - Kompleksitas algoritma pemfaktoran tercepat (*number field sieve*): $O\left(\exp\left(\left(\tfrac{64}{9}b\right)^{1/3}(\log b)^{2/3}\right)\right)$ untuk $n$ sepanjang $b$ bit: **sub-eksponensial, belum polinomial**.
> >
> > **Panjang kunci**: $n \le 256$ bit dapat difaktorkan **dalam beberapa jam di sebuah PC** dengan program bebas; $n \le 512$ bit oleh **beberapa ratus komputer**; kini kunci aman bila $n$ **di atas 1024 bit**. Contoh parameter: $n$ 1024 bit ($\approx 300$ digit desimal), $p$ dan $q$ masing-masing $\approx 154$ digit.
> >
> > **Sayembara**: 1977 penemu RSA menantang pembaca *Scientific American* memecahkan cipherteks RSA (hadiah **$100**); **1994** kelompok kolaborasi internet memecahkannya dalam **8 bulan**.
> >
> > **Ancaman kuantum**: RSA terancam komputer kuantum karena $n$ dapat difaktorkan dalam **waktu polinomial** oleh **algoritma Shor**.
> >
> > ### Kelemahan Praktis dan Hybrid Cryptography
> >
> > RSA **lebih lambat** dari DES/AES. Dalam praktik RSA **tidak dipakai untuk pesan besar**, melainkan untuk **mengenkripsi kunci simetri (kunci sesi)** dengan kunci publik penerima, sedangkan pesan dienkripsi AES/DES. Kunci terenkripsi dan pesan dikirim bersamaan; penerima mendekripsi kunci simetri dengan kunci privatnya lalu mendekripsi pesan. Kombinasi ini disebut **hybrid cryptography** ([[Hybrid Cryptography dan Diffie-Hellman]]).
> >
> > ### Man-in-the-Middle pada Kunci Publik
> >
> > Karena kunci publik harus dibagikan, distribusinya rawan **man-in-the-middle**. Carol mengintersepsi pertukaran: ia mengirim **kunci publiknya sendiri** kepada Bob (Bob mengira itu kunci Alice) dan kepada Alice (Alice mengira itu kunci Bob). Carol lalu **mendekripsi** pesan dari Bob dengan kunci privatnya, menyalinnya, **mengenkripsi ulang** dengan kunci publik Alice yang asli, dan meneruskannya. Alice dan Bob tak dapat mendeteksi Carol ([[Serangan Pasif, Aktif, dan Side-Channel]]). Akar masalah: **kunci publik tidak diotentikasi**.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant B as Bob
> >     participant C as Carol (MITM)
> >     participant A as Alice
> >     A->>C: PK_Alice
> >     C->>B: PK_Carol (Bob kira PK_Alice)
> >     B->>C: pesan dienkripsi PK_Carol
> >     Note over C: dekripsi dengan SK_Carol,<br/>salin, ubah bila mau
> >     C->>A: pesan dienkripsi PK_Alice
> > ```
> >
> > ### RSA di Python (PyCryptodome)
> >
> > Tiga pola kode pada slide: (1) simulasi manual: `getPrime(512)` untuk $p, q$, $n = pq$, $\phi = (p-1)(q-1)$, $e = 65537$, `d = inverse(e, phi)`, lalu `RSA.construct((n, e, d, p, q))`; (2) `RSA.generate(1024)` dan simpan kunci publik/privat ke **file PEM** (privat diberi *passphrase*); (3) dua pihak (Alice dan Bob) masing-masing membangkitkan pasangan kunci, lalu **Bob mengenkripsi dengan kunci publik Alice** dan **Alice mendekripsi dengan kunci privatnya**, begitu pula balasannya. Nilai $e$ default `PyCryptodome` adalah **65537 (0x10001)**; bila memilih $e$ lain, harus **ganjil dan tidak terlalu kecil**.
> >
> > ### PKCS#1 dan OAEP
> >
> > - **PKCS #1** adalah standar RSA Laboratories: enkripsi RSA, tanda tangan digital RSA, format kunci, dan skema padding.
> > - **OAEP** (*Optimal Asymmetric Encryption Padding*, Bellare dan Rogaway, 1994) menambah **padding acak** sebelum enkripsi RSA: $M \to$ OAEP $\to$ pesan terkode $\to$ RSA. Alasannya: **RSA tidak boleh mengenkripsi pesan mentah** ("textbook RSA" rentan berbagai serangan). OAEP membuat enkripsi **tidak deterministik** (pesan sama, cipherteks berbeda tiap kali) dan **aman terhadap chosen-ciphertext attack** ([[Serangan Berdasarkan Informasi yang Dimiliki]]).

> [!cornell] #### Summary
>
> **Keamanan RSA = sulitnya memfaktorkan $n = pq$**: bila $p, q$ diketahui, $\phi(n)$ dan $d$ mudah dihitung. Algoritma pemfaktoran tercepat masih sub-eksponensial; $n \le 256$ bit jatuh dalam jam, $\le 512$ bit oleh ratusan komputer, sehingga kini diperlukan **$n > 1024$ bit** (sayembara 1977 dipecahkan 1994). **Algoritma Shor** pada komputer kuantum mengancamnya. Karena lambat, RSA dipakai untuk **mengenkripsi kunci sesi** dalam **hybrid cryptography**. Distribusi kunci publik rentan **man-in-the-middle** (Carol menukar kunci publik). Praktik modern memakai **PKCS#1 dengan padding OAEP** agar enkripsi acak dan tahan chosen-ciphertext. Ada pula RSA di Python via PyCryptodome (`RSA.generate`, format PEM, `PKCS1_OAEP`). Kelanjutan: pertukaran kunci di [[Hybrid Cryptography dan Diffie-Hellman]].

> [!ad-libitum]- Additional Information
>
> #### Serangan pada Textbook RSA
>
> RSA polos bersifat **deterministik** dan **malleable**: $c_1 c_2 \bmod n$ mendekripsi menjadi $m_1 m_2$ (bisa dimanipulasi), $e$ kecil dengan $m^e < n$ dapat diakar langsung, dan $e = 3$ dikirim ke 3 penerima jatuh oleh **Håstad broadcast attack**. Serangan **Bleichenbacher (1998)** memecahkan padding PKCS#1 v1.5 lewat oracle pesan galat; itu sebabnya OAEP (enkripsi) dan **PSS** (tanda tangan) dianjurkan.
>
> #### Rekomendasi Panjang Kunci
>
> NIST menyarankan **RSA minimal 2048 bit** (setara $\approx 112$ bit keamanan) dan **3072 bit** untuk 128 bit; RSA 1024 bit sudah dianggap tidak aman. Pada 2020, RSA-250 (829 bit) berhasil difaktorkan. **NIST PQC** (ML-KEM/ML-DSA) disiapkan menggantikan RSA sebelum komputer kuantum praktis ([[Ekosistem, Tantangan Masa Depan, dan Miskonsepsi]]).
>
> #### Mengapa Kunci $p$ dan $q$ Harus Acak dan Tidak Berdekatan
>
> Bila $p \approx q$, $n$ difaktorkan cepat dengan **metode Fermat**; bila prima dibangkitkan dari RNG lemah, $n$ dari dua perangkat dapat berbagi satu faktor sehingga `gcd(n1, n2)` membocorkan keduanya (kelemahan nyata pada ribuan kunci TLS dan SSH).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Faktorkan RSA kecil (mis. $n = 3337$ dan $n$ 64 bit) dengan trial division, Fermat, dan Pollard rho; ukur waktu untuk $n$ 32, 48, 64, 80 bit dan ekstrapolasi.
> 2. Demonstrasikan sifat *malleable*: dari $c = m^e \bmod n$ buat $c' = c \cdot 2^e \bmod n$ dan tunjukkan dekripsinya $2m$; lalu cek bahwa OAEP menggagalkannya.
>
> #### Bacaan Lanjutan
>
> - RFC 8017, *PKCS #1: RSA Cryptography Specifications v2.2*.
> - D. Boneh, *"Twenty Years of Attacks on the RSA Cryptosystem"*, 1999.
> - `di-mgt.com.au/rsa_alg.html` (sumber contoh parameter pada slide).
