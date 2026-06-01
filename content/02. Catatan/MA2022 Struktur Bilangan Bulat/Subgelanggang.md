---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Subgelanggang (Sub-ring)
> 
> > ## Questions/Cues
> > 
> > - Definisi Subgelanggang
> > - Tes Subgelanggang
> > - Warisan Sifat
> > - Contoh: Subgelanggang `nℤ`
> > - Sifat Irisan
> 
> > ### Definisi Subgelanggang
> > 
> > Sebuah **Subgelanggang** `S` adalah sebuah himpunan bagian tak-kosong dari gelanggang `R` yang juga membentuk sebuah gelanggang dengan menggunakan operasi penjumlahan `(+)` dan perkalian `(⋅)` yang sama dari `R`. Secara intuitif, ini adalah "gelanggang di dalam gelanggang".
> > 
> > ### Tes Subgelanggang (Sub-ring Test)
> > 
> > Untuk membuktikan bahwa sebuah himpunan bagian tak-kosong S dari R adalah subgelanggang, kita tidak perlu memeriksa semua aksioma gelanggang. Cukup gunakan tes yang lebih sederhana berikut:
> > 
> > S adalah subgelanggang jika dan hanya jika untuk setiap a, b ∈ S berlaku:
> > 
> > 1. **Tertutup terhadap Pengurangan:** `a - b ∈ S`. (Kondisi ini sudah cukup untuk membuktikan `(S, +)` adalah subgrup dari `(R, +)`).
> > 2. **Tertutup terhadap Perkalian:** `a ⋅ b ∈ S`.
> > 
> > ### Warisan Sifat (Inherited Properties)
> > 
> > Tes subgelanggang bisa lebih sederhana karena beberapa sifat gelanggang secara otomatis "diwariskan" oleh `S` dari `R`. Sifat-sifat seperti **asosiatif** (untuk `+` dan `⋅`), **komutatif** (untuk `+`), dan **distributif** tidak perlu dibuktikan lagi untuk `S` karena elemen-elemen `S` juga merupakan elemen `R`.
> > 
> > ### Contoh Utama: Subgelanggang dari `ℤ`
> > 
> > Terdapat teorema penting yang mengkarakterisasi semua subgelanggang dari himpunan bilangan bulat `ℤ`.
> > 
> > - **Teorema:** Sebuah himpunan bagian `S` dari `ℤ` adalah subgelanggang jika dan hanya jika `S` memiliki bentuk `nℤ` untuk suatu bilangan bulat `n`.
> > - `nℤ` adalah himpunan semua kelipatan dari `n`. Contoh: `3ℤ = {..., -6, -3, 0, 3, 6, ...}` adalah subgelanggang dari `ℤ`.
> > 
> > ### Sifat Irisan (Intersection Property)
> > 
> > **Teorema:** Jika `A` dan `B` adalah dua subgelanggang dari gelanggang `R`, maka irisan keduanya, `A ∩ B`, juga merupakan sebuah subgelanggang dari `R`.

> [!cornell] #### Summary
> 
> - **Sebuah Subgelanggang `S` adalah himpunan bagian dari gelanggang `R` yang juga merupakan gelanggang dengan operasi yang sama. Untuk membuktikannya, kita hanya perlu menggunakan tes subgelanggang sederhana: `S` harus tertutup terhadap pengurangan (`a - b ∈ S`) dan perkalian (`a ⋅ b ∈ S`). Contoh paling fundamental adalah subgelanggang dari `ℤ`, yang selalu berbentuk `nℤ`.**

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Perbedaan Subgelanggang dan Ideal:** Jangan bingung antara subgelanggang dan ideal. Sebuah subgelanggang hanya perlu tertutup terhadap perkalian _internal_ (jika `s₁, s₂ ∈ S`, maka `s₁s₂ ∈ S`). Sementara itu, sebuah **ideal** harus "menyerap" perkalian _eksternal_ (jika `s ∈ S` dan `r ∈ R`, maka `rs` dan `sr` harus ada di `S`). Setiap ideal adalah subgelanggang, tetapi tidak semua subgelanggang adalah ideal.
> 
> #### Contoh Soal
> 
> 1. **Soal Verifikasi:** Gunakan tes subgelanggang untuk membuktikan bahwa `5ℤ` adalah subgelanggang dari `ℤ`.
>     - **Jawaban:** Ambil dua elemen sembarang dari `5ℤ`, sebut saja `x = 5a` dan `y = 5b` untuk `a, b ∈ ℤ`.
>         1. **Pengurangan:** `x - y = 5a - 5b = 5(a - b)`. Karena `a-b` adalah bilangan bulat, maka `5(a-b)` adalah kelipatan 5. Jadi, `x - y ∈ 5ℤ`. ✔️
>         2. **Perkalian:** `x ⋅ y = (5a)(5b) = 25ab = 5(5ab)`. Karena `5ab` adalah bilangan bulat, maka `5(5ab)` adalah kelipatan 5. Jadi, `x ⋅ y ∈ 5ℤ`. ✔️ Karena kedua syarat terpenuhi, `5ℤ` adalah subgelanggang dari `ℤ`.
> 2. **Soal Matriks:** Apakah himpunan `S` dari semua matriks segitiga atas 2x2 (`[[a, b], [0, c]]`) dengan entri bilangan bulat merupakan subgelanggang dari `M₂(ℤ)`?
>     - **Jawaban:** Ya. Ambil dua matriks segitiga atas `X = [[a₁, b₁], [0, c₁]]` dan `Y = [[a₂, b₂], [0, c₂]]`.
>         - `X - Y = [[a₁-a₂, b₁-b₂], [0, c₁-c₂]]`. Ini masih matriks segitiga atas.
>         - `X ⋅ Y = [[a₁a₂, a₁b₂+b₁c₂], [0, c₁c₂]]`. Ini juga masih matriks segitiga atas. Karena tertutup terhadap pengurangan dan perkalian, `S` adalah subgelanggang.
> 3. **Soal Non-Contoh:** Apakah `S = {semua polinomial dengan derajat tepat 2}` merupakan subgelanggang dari gelanggang semua polinomial `P(x)`?
>     - **Jawaban:** Tidak. `S` tidak tertutup terhadap penjumlahan (atau pengurangan). Contoh: `(x² + 2x) + (-x² + 3x) = 5x`. Hasilnya adalah polinomial berderajat 1, yang tidak ada di `S`.