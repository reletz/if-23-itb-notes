---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Integrity Access Control - Model Biba dan Transaksi ACID
>
> > ## Questions/Cues
> >
> > - Apa intuisi model Biba dan bagaimana ia berbeda dari Bell-LaPadula?
> > - Apa aturan no read down dan no write up?
> > - Apa itu low-water mark?
> > - Mengapa integritas lebih dari sekadar siapa membaca apa?
> > - Apa itu transaksi ACID?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 47-54)
>
> > ### Intuisi Biba
> >
> > Data dari proses level lebih tinggi lebih **tepercaya**; yang penting bukan siapa yang membaca, melainkan **siapa yang memproduksi**. Subjek dipercaya menghasilkan data lebih baik daripada subjek level lebih rendah, dan objek level tinggi memiliki nilai lebih baik. Kebijakan memakai pasangan ⟨level, category⟩ seperti pada [[Mandatory Access Control dan Multi-Level Security]].
> >
> > ### Properti Strict Integrity (Dual dari MLS)
> >
> > | Model | Baca | Tulis | Tujuan |
> > |---|---|---|---|
> > | Bell-LaPadula | no read **up** | no write **down** | Confidentiality |
> > | **Biba** | no read **down** | no write **up** | Integrity |
> >
> > - **Simple integrity**: S boleh membaca O hanya jika l(O) ≽ l(S) (jangan membaca data yang lebih "kotor").
> > - **\*-integrity**: S boleh menulis O hanya jika l(S) ≽ l(O) (jangan mengotori data yang lebih tepercaya).
> >
> > ### Alternatif: Low-Water Mark
> >
> > Prinsip: "lakukan apa saja, tetapi turun level jika bekerja dengan sampah".
> >
> > - **Untuk subjek**: subjek boleh membaca apa saja, lalu level-nya turun: l(S) := GLB(l(S), l(O)). Menulis hanya jika l(S) ≽ l(O). Masalah: urutan operasi berpengaruh.
> > - **Untuk objek**: subjek boleh menulis apa saja, lalu objek yang diakses diturunkan: l(O) := GLB(l(S), l(O)). Membaca hanya jika l(O) ≽ l(S). Masalah: tidak melindungi, hanya menandai bahwa integritas telah terkompromi.
> >
> > ### Melampaui Biba
> >
> > Integritas bukan hanya **siapa membaca apa**, tetapi juga **bagaimana**. Prinsip: tidak ada resource (data maupun program) yang boleh dimodifikasi secara tidak sah atau tidak pantas, dan data harus mencerminkan dunia nyata. Karenanya dibutuhkan konsep **transaksi**, yang harus **ACID**:
> >
> > - **Atomicity**: semua-atau-tidak-sama-sekali.
> > - **Consistency**: konsistensi data terjaga.
> > - **Isolation**: modifikasi tidak terlihat sebelum commit.
> > - **Durability**: efek setelah commit tidak hilang karena kegagalan berikutnya.
> >
> > ACID cocok bila semua orang jujur; namun **siapa yang menjalankan transaksi**? Contoh: transfer rekening dapat dieksekusi oleh orang yang bukan pemilik kedua rekening, sehingga ACID perlu dilengkapi kontrol akses.

> [!cornell] #### Summary
>
> **Biba** adalah kebalikan Bell-LaPadula untuk **integrity**: **no read down, no write up**, dengan varian **low-water mark** (subjek atau objek diturunkan levelnya setelah berinteraksi dengan data kurang tepercaya). Integritas juga menuntut **transaksi ACID** (atomicity, consistency, isolation, durability) dan kontrol atas *siapa* yang menjalankan transaksi, bukan hanya aturan baca/tulis.

> [!ad-libitum]- Additional Information
>
> #### Clark-Wilson
>
> Model **Clark-Wilson** mengusulkan integritas lewat *well-formed transactions* dan *separation of duty*: data hanya boleh diubah lewat program tervalidasi (TP), yang lebih dekat dengan praktik bisnis dibanding Biba.
>
> #### Proyek Eksplorasi Mandiri
> 1. Rancang kebijakan integritas Biba untuk pipeline CI/CD: level untuk kode pengembang, build artifact, dan deployment produksi.
>
> #### Bacaan Lanjutan
> - Biba, K. (1977). *Integrity Considerations for Secure Computer Systems*.
> - Clark & Wilson (1987). *A Comparison of Commercial and Military Computer Security Policies*.
