---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Algoritma Kriptografi
>
> > ## Questions/Cues
> >
> > - Apa tiga jenis algoritma kriptografi?
> > - Bagaimana cara kerja kriptografi simetri dan apa masalah utamanya?
> > - Apa itu kriptografi nir-simetri (kunci publik) dan sejak kapan ada?
> > - Kunci mana yang publik dan mana yang privat pada asymmetric?
> > - Apa itu fungsi hash dan mengapa ia irreversible?
> > - Kapan tiap jenis dipakai?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Pengantar Kriptografi (Slides 58-63)
>
> > ### Tiga Jenis Algoritma Kriptografi
> >
> > Algoritma kriptografi dibagi menjadi tiga: **simetri**, **nir-simetri (kunci publik)**, dan **fungsi hash**.
> >
> > ```mermaid
> > flowchart TD
> >     K["Algoritma Kriptografi"]
> >     K --> S["Simetri<br/>1 kunci rahasia bersama"]
> >     K --> A["Nir-simetri<br/>kunci publik + kunci privat"]
> >     K --> H["Fungsi Hash<br/>tanpa kunci, irreversible"]
> >     S --> S1["DES, AES, Blowfish, RC4, 3DES, IDEA"]
> >     A --> A1["RSA, ElGamal, DSA, Diffie-Hellman, ECC"]
> >     H --> H1["MD5, SHA-1, SHA-2, SHA-3 (Keccak), RIPEMD"]
> > ```
> >
> > ### Kriptografi Simetri (Symmetric-key)
> >
> > - **Kunci enkripsi = kunci dekripsi**, dan harus dijaga **privat / rahasia** (*secret* / *shared secret*).
> > - Notasi: `E_K(P) = C` dan `D_K(C) = P` dengan **K yang sama**.
> > - Sudah ada sejak ribuan tahun lalu hingga tahun **1976** (saat itu satu-satunya jenis kriptografi).
> > - Contoh: **DES, AES, Serpent, Blowfish, Loki, MARS, RC6, Twofish, 3-DES, IDEA, FEAL, RC4, SEAL, Panama**.
> >
> > **Masalah utama:** distribusi kunci. Alice dan Bob harus lebih dahulu menyepakati kunci rahasia yang sama lewat saluran aman — padahal justru saluran aman itulah yang belum mereka punya. Selain itu jumlah kunci membengkak: `n` pihak yang saling berkomunikasi butuh `n(n-1)/2` kunci.
> >
> > ### Kriptografi Nir-Simetri (Asymmetric-key / Public-key)
> >
> > - **Kunci enkripsi ≠ kunci dekripsi** (K1 ≠ K2).
> > - **Kunci enkripsi → tidak rahasia (public key)**; **kunci dekripsi → rahasia (private key)**.
> > - Notasi: `E_{K1}(P) = C` dan `D_{K2}(C) = P`.
> > - Mulai ditemukan sejak tahun **1976**. Nama lain: **kriptografi kunci publik** (*public-key cryptography*).
> > - Contoh: **RSA (Rivest-Shamir-Adleman), ElGamal, DSA, Diffie-Hellman, Merkle Knapsack, Rabin, EPOC, McEliece, XTR, ECC (Elliptic Curve Cryptography)**.
> >
> > Karena kunci enkripsi boleh publik, siapa pun bisa mengirim pesan terenkripsi kepada Bob, tetapi hanya Bob (pemegang private key) yang bisa mendekripsinya. Ini **menyelesaikan masalah distribusi kunci** pada skema simetri. Bila urutan kunci dibalik (enkripsi dengan private key), skema ini menjadi dasar **tanda tangan digital**.
> >
> > ### Fungsi Hash
> >
> > - **Mengkompresi pesan berukuran sembarang** menjadi **message-digest berukuran tetap (*fixed*)**.
> > - **Irreversible** — tidak bisa dikembalikan menjadi pesan semula.
> > - Tidak memakai kunci.
> > - Contoh: **MD5, SHA-1, SHA-2, Keccak (SHA-3), RIPEMD, WHIRLPOOL**.
> >
> > **Kegunaan: memeriksa integritas pesan.** Perubahan sekecil apa pun pada masukan menghasilkan nilai hash yang sangat berbeda, sehingga penerima dapat mendeteksi bila pesan telah diubah. Contoh slide: `"Halo"` → `a6df57fb6fe377d80b4a257b4a92cba…`, nomor telepon `08122113451` → `09c88f0b91d74b292e6f89587ab63921`.
> >
> > ### Ringkasan Perbandingan
> >
> > | Aspek | Simetri | Nir-simetri | Fungsi hash |
> > |---|---|---|---|
> > | Jumlah kunci | 1 (bersama, rahasia) | 2 (publik + privat) | 0 |
> > | Sejak | ribuan tahun lalu – 1976 | 1976 | modern |
> > | Reversibel | ya (dengan kunci) | ya (dengan private key) | tidak |
> > | Kegunaan pokok | kerahasiaan, cepat | distribusi kunci, tanda tangan | integritas |
> > | Kecepatan | cepat | lambat | cepat |

> [!cornell] #### Summary
>
> Ada tiga jenis algoritma kriptografi. **Simetri** memakai **satu kunci rahasia yang sama** untuk enkripsi dan dekripsi (`E_K(P)=C`, `D_K(C)=P`) — cepat, tetapi menghadapi masalah **distribusi kunci** dan pembengkakan jumlah kunci; contohnya DES, AES, RC4. **Nir-simetri / kunci publik** (sejak **1976**) memakai **pasangan kunci**: kunci enkripsi **publik**, kunci dekripsi **privat** — menyelesaikan distribusi kunci dan mendasari tanda tangan digital; contohnya RSA, ElGamal, Diffie-Hellman, ECC. **Fungsi hash** memampatkan pesan sembarang menjadi **message-digest tetap** yang **irreversible** dan tanpa kunci, dipakai untuk **memeriksa integritas**; contohnya MD5, SHA-3. Dalam praktik ketiganya dikombinasikan, dan miskonsepsi seputar pemilihannya dibahas di [[Ekosistem, Tantangan Masa Depan, dan Miskonsepsi]].

> [!ad-libitum]- Additional Information
>
> #### Hybrid Cryptosystem
>
> Sistem nyata (TLS, PGP, Signal) memakai **hybrid**: kriptografi kunci publik hanya untuk **menukar kunci sesi** yang kecil, lalu seluruh data besar dienkripsi dengan **cipher simetri** yang jauh lebih cepat. Ini menggabungkan keunggulan keduanya — distribusi kunci mudah, throughput tinggi.
>
> #### Properti Fungsi Hash Kriptografis
>
> Hash yang layak kripto harus punya: **preimage resistance** (sulit mencari pesan dari digest), **second-preimage resistance** (sulit mencari pesan lain dengan digest sama), dan **collision resistance** (sulit mencari dua pesan berbeda berdigest sama). **MD5 dan SHA-1 sudah patah** untuk collision resistance — gunakan SHA-256 atau SHA-3.
>
> #### Kapan Pakai yang Mana
>
> - Enkripsi file besar / lalu lintas jaringan → **simetri (AES-GCM)**.
> - Menukar kunci atau mengirim pesan ke penerima yang belum berbagi kunci → **kunci publik (RSA-OAEP, ECDH)**.
> - Menjamin integritas / menyimpan password (dengan salt + KDF) / checksum → **fungsi hash (SHA-256, Argon2)**.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ukur throughput AES vs RSA untuk mengenkripsi file 100 MB, lalu jelaskan mengapa sistem nyata memilih pendekatan hybrid.
> 2. Demonstrasikan efek *avalanche*: ubah satu bit pada masukan SHA-256 dan hitung berapa bit digest yang berubah.
>
> #### Bacaan Lanjutan
>
> - W. Diffie & M. Hellman, *"New Directions in Cryptography"*, IEEE Trans. Information Theory, 1976.
> - *Handbook of Applied Cryptography*, Bab 7 (simetri), Bab 8 (kunci publik), Bab 9 (fungsi hash).
