---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Tanda-tangan Digital dengan Hash dan RSA
>
> > ## Questions/Cues
> >
> > - Mengapa tanda tangan digital biasanya memakai hash, bukan mengenkripsi seluruh pesan?
> > - Bagaimana langkah signing dan verification dengan hash + RSA?
> > - Bagaimana contoh numerik signature dan verifikasinya?
> > - Apa saja algoritma tanda tangan digital standar (DSA, ElGamal, ECDSA)?
> > - Bagaimana programnya di Python dan apa yang terjadi bila pesan diubah?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Tanda-tangan Digital (Slides 15-35)
>
> > ### Mengapa Kombinasi Hash + Kunci Publik?
> >
> > Menandatangani dengan mengenkripsi seluruh pesan memberi dua fungsi: kerahasiaan dan otentikasi pengirim, tetapi **tidak menjamin keaslian pesan**. Sering kali **otentikasi diperlukan tanpa kerahasiaan** (pesan tidak rahasia). Untuk itu dipakai **kombinasi fungsi hash dan kriptografi kunci publik**: yang ditandatangani adalah **message digest** (kecil dan berukuran tetap), bukan seluruh pesan, sehingga jauh lebih cepat.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph SG["Signer (Alice)"]
> >         direction LR
> >         M["Pesan M"] --> H1["Hash"] --> MD["digest h"]
> >         MD -->|"enkripsi dengan<br/>kunci privat Alice"| SIG["Signature S"]
> >     end
> >     subgraph VR["Verifier (Bob)"]
> >         direction LR
> >         MR["M + S diterima"] --> H2["Hash"] --> MD2["digest h (dihitung)"]
> >         MR --> DEC["dekripsi S dengan<br/>kunci publik Alice"] --> MD3["digest h'"]
> >         MD2 --> CMP{"h = h' ?"}
> >         MD3 --> CMP
> >     end
> >     SG -->|"M + S"| VR
> > ```
> >
> > ### Algoritma Tanda Tangan Digital Standar
> >
> > **RSA signature**, **ElGamal signature** (varian ElGamal khusus tanda tangan), **DSA (Digital Signature Algorithm**, standar NIST), dan **ECDSA (Elliptic Curve DSA)**. Pada RSA, enkripsi dan dekripsi identik sehingga signing dan verifying juga identik.
> >
> > ### Tanda Tangan Digital dengan RSA
> >
> > **Signing** (pengirim):
> >
> > 1. Hitung hash pesan: $h = H(M)$.
> > 2. Enkripsi $h$ dengan **kunci privat** ($SK = d$) memakai persamaan RSA: $S = h^{SK} \bmod n$ ($n = pq$).
> > 3. Kirim **$M + S$**.
> >
> > **Verifying** (penerima):
> >
> > 1. Hitung hash pesan yang diterima: $h = H(M)$.
> > 2. Dekripsi $S$ dengan **kunci publik** pengirim ($PK = e$): $h' = S^{PK} \bmod n$.
> > 3. Bandingkan: $h = h'$ $\to$ **tanda tangan otentik**; tidak sama $\to$ tanda tangan/pesan **tidak asli** atau pengirim bukan yang dikira.
> >
> > ### Contoh Numerik (dari slide)
> >
> > $h = H(M) = \text{A4C05176E1440FC879C06C72FA603A24}$ (heks) $= 218991964599382371228554013295471770148$ (desimal). $n = 223427$ ($= 373 \times 599$), $PrivK = 171635$, $PubK = 731$.
> >
> > - Nilai yang dipakai: $h \bmod n = 125468$.
> > - **Signing**: $S = h^{PrivK} \bmod n = 125468^{171635} \bmod 223427 = \mathbf{46489}$.
> > - **Verifying**: $h' = S^{PubK} \bmod n = 46489^{731} \bmod 223427 = \mathbf{125468}$.
> > - $h' = h \bmod n$ ($125468$) $\to$ **tanda tangan valid**.
> >
> > Slide juga memperlihatkan bahwa mengubah isi pesan sedikit saja (mis. `1445 H` menjadi `1446 H`) membuat hash berbeda dan **verifikasi gagal**.
> >
> > ### Program Python (PyCryptodome)
> >
> > Alur program (RSA 1024 bit, SHA-256, skema `pkcs1_15`):
> >
> > ```python
> > key = RSA.generate(1024)                 # e = 65537
> > nilai_hash = SHA256.new(pesan.encode('utf-8'))
> > tanda_tangan = pkcs1_15.new(kunci_privat).sign(nilai_hash)      # signing
> > pkcs1_15.new(kunci_publik).verify(nilai_hash, tandatangan)      # verifying
> > ```
> >
> > `verify` melempar `ValueError` bila tidak cocok (dianggap tidak valid). Pada demo, pesan `Guys, apakah kalian sudah membuat proposal Tugas Akhir?` terverifikasi **valid**; setelah huruf pertama diganti `*` pesan menjadi `*uys, apakah ...` dan verifikasi **tidak valid**. Kunci disimpan format **PEM** (privat dilindungi password).

> [!cornell] #### Summary
>
> Karena enkripsi pesan penuh tidak menjamin keaslian dan lambat, tanda tangan digital biasanya **mengombinasikan fungsi hash dan kunci publik**: pengirim menghitung $h = H(M)$, menandatangani **digest** dengan **kunci privat** ($S = h^{d} \bmod n$ pada RSA), dan mengirim $M + S$; penerima menghitung $h = H(M)$, mendekripsi $S$ dengan **kunci publik** ($h' = S^{e} \bmod n$), dan **membandingkan $h$ dengan $h'$**: sama berarti otentik. Contoh slide: $n = 223427$, $d = 171635$, $e = 731$, $S = 46489$, $h' = 125468$ **valid**. Algoritma standar: **RSA, ElGamal signature, DSA (NIST), ECDSA**. Mengubah satu bit pesan membuat verifikasi gagal (terlihat pada program Python berbasis `pkcs1_15` dan SHA-256).

> [!ad-libitum]- Additional Information
>
> #### Memeriksa Contoh Numerik
>
> $n = 223427 = 373 \times 599$, $\phi(n) = 372 \times 598 = 222456$; $e \cdot d = 731 \cdot 171635 \equiv 1 \pmod{222456}$ ✓. Karena $n$ jauh lebih kecil dari digest 128 bit, slide memakai $h \bmod n$ lebih dulu; RSA nyata memakai $n \ge 2048$ bit dan **padding** (PKCS#1 v1.5 atau **PSS**) yang membungkus digest agar aman.
>
> #### Mengapa Harus Ada Padding?
>
> Tanda tangan "mentah" $S = h^d \bmod n$ bersifat **homomorfik** ($S_1 S_2 = (h_1 h_2)^d$), sehingga penyerang dapat memalsukan tanda tangan pesan baru dari tanda tangan yang sudah ada (*existential forgery*). Padding terstruktur dan hash menghilangkan sifat itu.
>
> #### Hash yang Lemah Menghancurkan Tanda Tangan
>
> Jika penyerang menemukan kolisi $H(M_1) = H(M_2)$ ([[Fungsi Hash dan Sifat-sifatnya]]), tanda tangan atas $M_1$ juga valid untuk $M_2$. Karena itu **MD5 dan SHA-1 tidak boleh dipakai** untuk tanda tangan; pakai SHA-256 atau SHA-3 ([[SHA-3 Keccak dan Konstruksi Spons]]).
>
> #### DSA/ECDSA Secara Ringkas
>
> DSA tidak memakai "enkripsi dengan kunci privat"; ia menghasilkan pasangan $(r, s)$ dari hash dan bilangan acak per-tanda-tangan $k$ (**$k$ tidak boleh bocor atau dipakai ulang**). ECDSA melakukan hal sama pada kurva eliptik dengan kunci jauh lebih pendek ([[ECC - ECDH, ElGamal, dan Encoding Pesan]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ulangi contoh slide: hitung SHA-256 sebuah file, tandatangani dengan RSA kecil bikinan sendiri ($p, q \approx 10^3$), lalu verifikasi sebelum dan sesudah mengubah 1 byte file.
> 2. Jalankan program PyCryptodome pada slide dengan `pkcs1_15` dan ganti ke `pss`; amati bahwa tanda tangan yang sama untuk pesan sama berbeda tiap run (PSS acak).
>
> #### Bacaan Lanjutan
>
> - RFC 8017 (PKCS #1 v2.2), bagian RSASSA-PKCS1-v1_5 dan RSASSA-PSS.
> - FIPS 186-5, *Digital Signature Standard*.
> - Demo: `8gwifi.org/rsasignverifyfunctions.jsp`.
