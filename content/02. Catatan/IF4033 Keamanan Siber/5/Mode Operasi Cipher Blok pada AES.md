---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Mode Operasi Cipher Blok pada AES
>
> > ## Questions/Cues
> >
> > - Apa yang terjadi jika data lebih besar dari satu blok 128-bit?
> > - Bagaimana CBC bekerja dan apa peran IV?
> > - Apa kelemahan ECB?
> > - Apa kelebihan dan kekurangan CTR, OFB, CFB, GCM, CCM, dan XTS?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 29-35)
>
> > ### Masalah Data Lebih dari Satu Blok
> >
> > Block cipher hanya mengenkripsi satu blok (128 bit pada AES). Untuk pesan lebih panjang dibutuhkan **mode operasi** yang mengatur bagaimana blok-blok digabungkan.
> >
> > ### Cipher Block Chaining (CBC)
> >
> > Enkripsi blok saat ini bergantung pada hasil blok sebelumnya:
> >
> > - Enkripsi: `c[i] = E(k, m[i] XOR c[i-1])`
> > - Dekripsi: `m[i] = D(k, c[i]) XOR c[i-1]`
> >
> > Blok pertama memerlukan **Initialization Vector (IV)** acak sebagai `c[0]`. IV **tidak harus rahasia**, tetapi harus **berbeda untuk tiap pesan/sesi** sehingga pesan sama yang dikirim berulang menghasilkan ciphertext yang selalu berbeda.
> >
> > ```mermaid
> > flowchart LR
> >     IV["IV"] --> X0["XOR m0"] --> E0["E(k)"] --> C0["c0"]
> >     C0 --> X1["XOR m1"] --> E1["E(k)"] --> C1["c1"]
> >     C1 --> X2["XOR m2"] --> E2["E(k)"] --> C2["c2"]
> > ```
> >
> > ### Perbandingan Mode AES
> >
> > | Mode | Cara kerja | Kelebihan | Kekurangan |
> > |---|---|---|---|
> > | **ECB** | Tiap blok dienkripsi independen | Sederhana | **Tidak aman**: plaintext sama menghasilkan ciphertext sama |
> > | **CBC** | Ciphertext sebelumnya di-XOR dengan plaintext | Lebih aman, ada keacakan | Rentan replay, error merambat, tidak paralel pada enkripsi |
> > | **CTR** | Nonce + counter menghasilkan keystream | Efisien, paralel, random access | Kurang aman bila salah pakai (reuse nonce) |
> > | **OFB** | Output block cipher diumpan balik sebagai keystream | Mirip CTR | Bisa kurang aman dari CTR bila salah pakai |
> > | **CFB** | Sebagian ciphertext diumpan balik | Enkripsi/dekripsi | Kurang efisien dari CTR/OFB |
> > | **GCM** | CTR + MAC (Galois) | **Confidentiality dan integrity**, efisien | Implementasi lebih kompleks |
> > | **CCM** | CTR + CBC-MAC | Mirip GCM, lebih sederhana | Potensial kurang efisien |
> > | **XTS-AES** | Mode "tweakable" untuk sektor | Cocok untuk **enkripsi disk** | Lebih kompleks |

> [!cornell] #### Summary
>
> Karena block cipher hanya menangani satu blok, dipakai **mode operasi**. **ECB** tidak aman karena blok identik menghasilkan ciphertext identik. **CBC** merantaikan blok dengan **IV** acak (tidak rahasia, unik per pesan). **CTR/OFB/CFB** mengubah block cipher menjadi stream cipher. **GCM** dan **CCM** memberi **authenticated encryption** (confidentiality + integrity), sedangkan **XTS** untuk enkripsi disk. Untuk aplikasi web modern, **AES-GCM** adalah pilihan umum.

> [!ad-libitum]- Additional Information
>
> #### Jebakan Umum
>
> Menggunakan kembali nonce pada GCM/CTR dengan kunci yang sama memecahkan kerahasiaan sekaligus memungkinkan pemalsuan tag. CBC tanpa MAC rentan *padding oracle attack*. Gunakan AEAD (GCM atau ChaCha20-Poly1305) dari library teruji. Mode operasi juga dibahas di [[Konsep Cipher Blok dan Mode Operasi]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Enkripsi gambar bitmap dengan AES-ECB dan AES-CBC, lalu bandingkan visual hasilnya (efek "ECB penguin").
>
> #### Bacaan Lanjutan
> - NIST SP 800-38A dan SP 800-38D.
