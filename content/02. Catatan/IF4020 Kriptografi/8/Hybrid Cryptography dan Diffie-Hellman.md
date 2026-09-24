---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Hybrid Cryptography dan Diffie-Hellman
>
> > ## Questions/Cues
> >
> > - Bagaimana Alice dan Bob berbagi kunci AES yang sama dengan aman?
> > - Bagaimana langkah-langkah hybrid cryptography?
> > - Bagaimana protokol pertukaran kunci Diffie-Hellman bekerja?
> > - Mengapa penyadap tidak dapat menghitung kunci bersama $K$?
> > - Mengapa DH rentan man-in-the-middle, dan bagaimana serangannya?
> > - Bagaimana DH diperluas untuk tiga pihak, dan siapa Merkle?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Algoritma Pertukaran Kunci Diffie-Hellman (Slides 2-22)
>
> > ### Persoalan
> >
> > Alice dan Bob sepakat memakai kunci-simetri (mis. AES), tetapi keduanya harus memiliki **kunci AES yang sama**. Bagaimana membagikannya **tanpa diketahui pihak ketiga**? Dua solusi: **(1) hybrid cryptography** dan **(2) protokol pertukaran kunci Diffie-Hellman**.
> >
> > ### Hybrid Cryptography
> >
> > Menggabungkan **kriptografi simetri (AES)** untuk pesan dengan **kunci-publik (RSA)** untuk kunci. Alice memiliki $(SK_A, PK_A)$ dan Bob $(SK_B, PK_B)$.
> >
> > 1. Alice membangkitkan **kunci rahasia $K$** (untuk AES).
> > 2. Alice mengenkripsi $K$ dengan RSA memakai $PK_B$: $C_K = E_{RSA}^{PK_B}(K)$.
> > 3. Alice mengenkripsi pesan dengan AES: $C_M = E_{AES}^{K}(M)$.
> > 4. Alice mengirim $C_K$ dan $C_M$ kepada Bob.
> > 5. Bob mendekripsi $C_K$ dengan $SK_B$ untuk memperoleh $K$.
> > 6. Bob mendekripsi $C_M$ dengan AES memakai $K$ untuk memperoleh $M$.
> >
> > ```mermaid
> > flowchart LR
> >     M["Pesan M"] --> AES["AES(K)"] --> CM["C_M"]
> >     K["Kunci sesi K"] --> AES
> >     K --> RSA["RSA(PK_Bob)"] --> CK["C_K"]
> >     CM --> BOB["Bob"]
> >     CK --> BOB
> >     BOB --> D1["RSA(SK_Bob) -> K"] --> D2["AES(K) -> M"]
> > ```
> >
> > ### Diffie-Hellman: Konsep
> >
> > Protokol (lebih tepat daripada "algoritma") **pertukaran kunci** yang memungkinkan dua pihak berbagi **kunci rahasia yang sama**, yang lalu dipakai untuk enkripsi simetri (DES, AES, dsb). Dipublikasikan **Diffie dan Hellman (1976)**. Keamanannya didasarkan pada **sulitnya logaritma diskrit** bilangan besar.
> >
> > **Analogi cat**: Alice dan Bob menyepakati cat bersama (kuning, tidak rahasia); masing-masing punya cat rahasia (merah dan biru); masing-masing mencampur cat kuning dengan cat rahasianya (oranye dan biru terang) dan **saling menukar campuran**; lalu masing-masing mencampur cat rahasianya ke campuran yang diterima, sehingga keduanya memiliki **warna akhir yang sama**. Memisahkan campuran ke warna asal itu sangat sulit.
> >
> > ### Algoritma
> >
> > **Parameter umum** (tidak rahasia, boleh lewat saluran publik): prima $p$ dan $g < p$ akar primitif dari $p$ ([[Algoritma ElGamal]]).
> >
> > | Langkah | Alice | Bob |
> > |---|---|---|
> > | 1 | bangkitkan $a$ (privat), hitung $A = g^a \bmod p$, kirim $A$ | |
> > | 2 | | bangkitkan $b$ (privat), hitung $B = g^b \bmod p$, kirim $B$ |
> > | 3 | $K = B^a \bmod p$ | $K = A^b \bmod p$ |
> >
> > Keduanya memperoleh **$K = g^{ab} \bmod p$**. Eve hanya tahu $p, g, A, B$ (semua publik); untuk mendapatkan $K$ ia perlu $a$ dari $A = g^a \bmod p$, yaitu **logaritma diskrit**, sangat sulit untuk bilangan besar.
> >
> > **Contoh**: $p = 353$, $g = 3$. Alice $a = 97$: $A = 3^{97} \bmod 353 = 40$. Bob $b = 233$: $B = 3^{233} \bmod 353 = 248$. Alice: $K = 248^{97} \bmod 353 = 160$. Bob: $K = 40^{233} \bmod 353 = 160$. Kunci bersama **$K = 160$**.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Alice
> >     participant B as Bob
> >     Note over A,B: sepakat p dan g (publik)
> >     A->>B: A = g^a mod p
> >     B->>A: B = g^b mod p
> >     Note over A: K = B^a mod p = g^(ab)
> >     Note over B: K = A^b mod p = g^(ab)
> > ```
> >
> > ### Serangan: Man-in-the-Middle
> >
> > DH aman terhadap **serangan pasif** (penyadapan), tetapi **tidak tahan serangan aktif**. Mallory mencegat: ketika Alice mengirim $g^a$, Mallory menggantinya dengan $g^m$ ke Bob; ketika Bob mengirim $g^b$, ia menggantinya dengan $g^m$ ke Alice. Akibatnya Alice menghitung $K_1 = g^{am}$ (sama dengan Mallory), Bob menghitung $K_2 = g^{bm}$ (sama dengan Mallory). Mallory dapat **membaca dan mengubah** semua pesan dengan mendekripsi/mengenkripsi ulang dengan $K_1$ dan $K_2$ ([[Serangan Pasif, Aktif, dan Side-Channel]]). Penyebabnya: pertukaran tidak **mengotentikasi** pihak lawan.
> >
> > ### DH untuk Tiga Pihak
> >
> > Alice, Bob, Carol sepakat $p, g$ dan memilih privat $a, b, c$. Nilai dioper melingkar sampai ketiganya memperoleh **$K = g^{abc} \bmod p$**: Alice mengirim $g^a$ ke Bob; Bob mengirim $g^{ab}$ ke Carol; Carol menghitung $K = g^{abc}$. Lalu $g^b \to$ Carol, $g^{bc} \to$ Alice ($K = g^{abc}$); $g^c \to$ Alice, $g^{ca} \to$ Bob ($K = g^{abc}$).
> >
> > ### Pemakaian dan Kredit
> >
> > DH dipakai di **SSL/TLS** untuk mengamankan komunikasi client-server. Pada **2002** Hellman menyarankan nama **Diffie-Hellman-Merkle** untuk menghargai kontribusi **Ralph Merkle** dalam penemuan kriptografi kunci-publik ("*a public key distribution system, a concept developed by Merkle*"). Penghargaan **IEEE Koji Kobayashi 1999** diberikan kepada Diffie, Hellman, dan Merkle; tahun **2000** kepada Rivest, Shamir, dan Adleman (RSA).

> [!cornell] #### Summary
>
> Untuk berbagi kunci AES yang sama ada dua jalan. **Hybrid cryptography**: kunci sesi $K$ dienkripsi dengan **RSA (kunci publik penerima)**, pesan dienkripsi **AES($K$)**, keduanya dikirim, penerima mendekripsi $K$ dengan kunci privatnya. **Diffie-Hellman** (1976) adalah **protokol pertukaran kunci** berbasis **logaritma diskrit**: dengan $p$ dan $g$ publik, Alice mengirim $A = g^a$, Bob mengirim $B = g^b$, dan keduanya menghitung **$K = g^{ab} \bmod p$** (contoh $p = 353$, $g = 3$: $K = 160$). Penyadap tak bisa memperoleh $K$ tanpa logaritma diskrit, tetapi DH **rentan man-in-the-middle** (Mallory berbagi $g^{am}$ dengan Alice dan $g^{bm}$ dengan Bob) karena tak ada otentikasi. DH dapat diperluas ke tiga pihak ($g^{abc}$), dipakai di SSL/TLS, dan disebut juga **Diffie-Hellman-Merkle**. Algoritma kunci publik tertua yang berbeda pendekatannya: [[Algoritma Knapsack Merkle-Hellman]].

> [!ad-libitum]- Additional Information
>
> #### DH + Tanda Tangan = Otentikasi
>
> Perbaikan standar MITM: **otentikasi** parameter DH dengan **tanda tangan digital** atau sertifikat (mis. **signed DH** pada TLS, **station-to-station protocol**). TLS 1.3 memakai **(EC)DHE** ephemeral untuk **forward secrecy**: kunci $a, b$ dibuang setelah sesi sehingga kebocoran kunci jangka panjang tak membuka sesi lama.
>
> #### Parameter Aman
>
> $p$ sebaiknya **prima aman** ($p = 2q + 1$ dengan $q$ prima) dan $\ge 2048$ bit; $g$ membangkitkan subgrup berorde besar. **Logjam attack (2015)** menunjukkan bahwa DH 512-bit (ekspor) dan prima standar yang dipakai bersama banyak server dapat dipecahkan dengan prakomputasi. Varian kurva eliptik **ECDH** (X25519) memberi keamanan setara dengan kunci 256-bit.
>
> #### Hybrid Modern: KEM
>
> Praktik terbaru merumuskan hybrid sebagai **KEM/DEM** (*key encapsulation* + *data encapsulation*): kunci publik hanya untuk membungkus kunci sesi, AES-GCM untuk data. **ML-KEM (Kyber)** adalah KEM pasca-kuantum yang menggantikan RSA/DH di TLS (mode hybrid X25519+ML-KEM).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan DH tiga pihak dengan $p = 353$, $g = 3$ dan tunjukkan ketiganya memperoleh $K$ yang sama; lalu simulasikan MITM Mallory dengan tiga proses.
> 2. Bangun hybrid mini: pertukaran kunci DH, turunkan kunci AES dengan HKDF-SHA256, dan enkripsi pesan dengan AES-GCM.
>
> #### Bacaan Lanjutan
>
> - W. Diffie & M. Hellman, *"New Directions in Cryptography"*, 1976.
> - Adrian et al., *"Imperfect Forward Secrecy: How Diffie-Hellman Fails in Practice"* (Logjam), CCS 2015.
> - Demo: `asecuritysite.com/encryption/diffie`.
