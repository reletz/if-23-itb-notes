---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Konsep Tanda-tangan Digital
>
> > ## Questions/Cues
> >
> > - Apa saja empat layanan keamanan dan alat untuk masing-masing?
> > - Apa karakteristik tanda tangan di dokumen cetak dan bagaimana padanannya secara digital?
> > - Apa bedanya tanda tangan digital dengan digitized signature?
> > - Apa persyaratan tanda tangan digital?
> > - Mengapa pesan harus dienkripsi dengan kunci privat pengirim, bukan kunci publik penerima?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Tanda-tangan Digital (Slides 2-14)
>
> > ### Review: Empat Layanan Keamanan
> >
> > ([[Definisi dan Layanan Kriptografi]]) Layanan 1 **kerahasiaan** direalisasikan dengan enkripsi/dekripsi; layanan 2 **keaslian pesan (integritas)** dengan **fungsi hash dan MAC** ([[Konsep MAC]]); layanan 3 **otentikasi** dan 4 **anti-penyangkalan (non-repudiation)** dengan **tanda-tangan digital**.
> >
> > ### Tanda Tangan Biasa dan Padanan Digitalnya
> >
> > Tanda tangan pada dokumen cetak memiliki lima karakteristik: (1) bukti otentik keaslian dokumen, (2) tidak dapat dilupakan, (3) tidak dapat dipindah untuk dipakai ulang, (4) dokumen yang sudah ditandatangani tidak dapat diubah, (5) tidak dapat disangkal.
> >
> > **Tanda-tangan digital** menerapkan fungsi itu pada data digital. Ia **tidak sama** dengan **digitized signature** (tanda tangan yang dipindai atau difoto). Tanda tangan digital adalah **nilai kriptografis yang bergantung pada isi pesan dan kunci**. Tanda tangan di kertas selalu sama apa pun isi dokumennya, tetapi tanda tangan digital **berbeda untuk tiap pesan dan/atau tiap kunci**. Pada contoh slide 6 (surat Bob kepada Alice dari Paris, 31 Desember 2018), tanda tangan muncul sebagai blok heksadesimal di antara `-- BEGIN SIGNATURE --` dan `-- END SIGNATURE --`: `13706B6D42442620B2FD1098BD4D54ADFA9F7DC27576954ADCE5E5FC901`. Contoh tanda tangan kertas pada slide 3 adalah surat undangan yang ditandatangani panitia; contoh *digitized signature* pada slide 4 adalah gambar tanda tangan yang dipindai (kartu *The White House*) dan tanda tangan di layar tablet; keduanya hanya gambar yang bisa disalin dan ditempel ke dokumen lain.
> >
> > ### Persyaratan Tanda Tangan Digital
> >
> > 1. Berupa rangkaian bit yang **bergantung pada pesan** yang ditandatangani.
> > 2. Memakai **informasi unik (kunci)** pengirim, untuk mencegah **pemalsuan dan penyangkalan**.
> > 3. **Mudah dibangkitkan.**
> > 4. **Mudah dikenali dan diverifikasi.**
> > 5. **Hampir mustahil dipalsukan**: baik membuat pesan baru untuk tanda tangan yang sudah ada, maupun membuat tanda tangan curang untuk pesan tertentu.
> > 6. **Mudah disimpan** salinannya.
> >
> > ### Dua Proses dan Dua Cara Menandatangani
> >
> > Proses: **signing** (memberi tanda tangan) dan **verification** (memeriksa keabsahannya). Cara menandatangani: (1) **mengenkripsi pesan** (khusus pesan rahasia), atau (2) **kombinasi fungsi hash dan kriptografi kunci publik** (pesan yang tidak perlu rahasia; lihat [[Tanda-tangan Digital dengan Hash dan RSA]]).
> >
> > ### Menandatangani dengan Mengenkripsi Pesan
> >
> > **Enkripsi normal** kunci publik: $E_{PK}(M) = C$ dengan **kunci publik penerima**, $D_{SK}(C) = M$ dengan **kunci privat penerima** ([[Konsep Kriptografi Kunci Publik]]). Cara ini **tidak mengotentikasi pengirim** karena kunci publik diketahui siapa pun.
> >
> > Agar kunci publik dapat berfungsi sebagai tanda tangan, **prosesnya dibalik**:
> >
> > $$\text{Signing: } S = E_{SK}(M) \qquad \text{Verifying: } M = D_{PK}(S)$$
> >
> > ($SK$, $PK$ adalah **kunci privat dan publik pengirim**.) Cipherteks $S$ sekaligus menjadi **signature**. Mengenkripsi dengan kunci privat = **menandatangani**; mendekripsi dengan kunci publik = **memverifikasi**.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph N["Enkripsi normal"]
> >         direction LR
> >         M1["M"] -->|"PK penerima"| C1["C"] -->|"SK penerima"| M2["M"]
> >     end
> >     subgraph T["Tanda tangan"]
> >         direction LR
> >         M3["M"] -->|"SK pengirim"| S["S (signature)"] -->|"PK pengirim"| M4["M"]
> >     end
> > ```
> >
> > Dengan cara ini **kerahasiaan** dan **otentikasi pengirim** tercapai sekaligus, tetapi **tidak dapat mengotentikasi integritas pesan**. Algoritma yang dapat dipakai harus memenuhi $D_{SK}(E_{PK}(M)) = M$ **dan** $D_{PK}(E_{SK}(M)) = M$. **RSA** memenuhinya karena persamaan enkripsi dan dekripsinya identik (kunci publik/privat dapat dipertukarkan): normal $c = m^e$, $m = c^d$; tanda tangan $S = m^d \bmod n$, verifikasi $m = S^e \bmod n$ ([[Algoritma RSA]]).

> [!cornell] #### Summary
>
> **Tanda-tangan digital** memenuhi layanan **otentikasi dan non-repudiation** dan berbeda dari *digitized signature*: ia adalah nilai kriptografis yang **bergantung pada isi pesan dan kunci**, sehingga berbeda untuk tiap pesan. Persyaratannya: bergantung pada pesan, memakai kunci unik pengirim, mudah dibuat dan diverifikasi, nyaris mustahil dipalsukan, mudah disimpan. Prosesnya **signing** dan **verification**. Cara sederhana: enkripsi pesan dengan **kunci privat pengirim** ($S = E_{SK}(M)$) dan verifikasi dengan **kunci publik pengirim** ($M = D_{PK}(S)$), kebalikan enkripsi normal; ini memberi kerahasiaan dan otentikasi pengirim, tetapi **tidak otentikasi integritas**. **RSA** cocok karena $D_{PK}(E_{SK}(M)) = M$.

> [!ad-libitum]- Additional Information
>
> #### Catatan Kritis pada Slide
>
> Menandatangani pesan dengan **mengenkripsi dengan kunci privat** hanya memberi **otentikasi pengirim**, bukan kerahasiaan sebenarnya: **siapa pun** yang punya kunci publik pengirim (publik) dapat mendekripsinya. Kerahasiaan baru tercapai bila pesan **juga** dienkripsi dengan kunci publik penerima (sign-then-encrypt). Pernyataan slide "kerahasiaan dan otentikasi tercapai sekaligus" perlu dibaca dengan konteks itu.
>
> #### MAC vs Tanda Tangan Digital
>
> | | MAC | Tanda tangan digital |
> |---|---|---|
> | Kunci | simetris, dipegang **kedua** pihak | asimetris, privat hanya pengirim |
> | Otentikasi pengirim | ya (antara dua pihak) | ya (oleh siapa pun) |
> | **Non-repudiation** | **tidak** | **ya** |
> | Kecepatan | sangat cepat | lebih lambat |
>
> #### Tanda Tangan "Buta" dan Aplikasi
>
> Tanda tangan digital dipakai untuk **sertifikat X.509**, **code signing**, **e-mail (PGP/S/MIME)**, **dokumen elektronik**, **blockchain**. Bentuk khusus: *blind signature* (e-cash), *ring signature*, *threshold signature*.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Dengan RSA kecil (mis. $p = 11$, $q = 13$) hitung $S = m^d \bmod n$ dan verifikasi $S^e \bmod n = m$; tunjukkan bahwa dengan kunci publik yang salah verifikasi gagal.
> 2. Cari contoh *digitized signature* dan jelaskan mengapa ia tidak aman (dapat disalin dan ditempel).
>
> #### Bacaan Lanjutan
>
> - Diffie & Hellman (1976), *New Directions in Cryptography* (gagasan tanda tangan digital).
> - Rivest, Shamir, Adleman (1978), *A Method for Obtaining Digital Signatures and Public-Key Cryptosystems*.
> - Menezes et al., *Handbook of Applied Cryptography*, Bab 11 (Digital Signatures).
