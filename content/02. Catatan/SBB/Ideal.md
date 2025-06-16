---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[SBB]]
> [!cornell] Ideal
> 
> > ## Questions/Cues
> > 
> > - Definisi Ideal
> > - Sifat Kunci: "Menyerap"
> > - Tes Ideal
> > - Ideal vs. Subgelanggang
> > - Ideal Utama `<r>`
> > - Ideal dalam `ℤ`
> 
> > ### Definisi Ideal
> > 
> > Sebuah **Ideal** adalah jenis subhimpunan yang lebih spesial dan lebih kuat daripada subgelanggang. Sebuah himpunan bagian tak-kosong `I` dari sebuah gelanggang `R` disebut ideal jika ia merupakan subgrup terhadap penjumlahan dan memiliki sifat "penyerapan" terhadap perkalian.
> > 
> > ### Sifat Kunci: "Menyerap" Perkalian
> > 
> > Inilah yang membuat ideal berbeda dari subgelanggang. Sebuah ideal `I` harus "menyerap" perkalian dari elemen mana pun di gelanggang induk `R`.
> > 
> > - **Formal:** Untuk setiap `i ∈ I` dan setiap `r ∈ R` (elemen dari gelanggang `R`), hasil perkalian `r ⋅ i` dan `i ⋅ r` keduanya harus "jatuh kembali" ke dalam `I`.
> > - **Ideal Kiri & Kanan:** Jika hanya `r ⋅ i ∈ I` yang terpenuhi, ia disebut _ideal kiri_. Jika hanya `i ⋅ r ∈ I` yang terpenuhi, ia disebut _ideal kanan_. Sebuah "ideal" (tanpa keterangan) berarti memenuhi keduanya.
> > 
> > ### Tes Ideal
> > 
> > Sebuah himpunan bagian tak-kosong `I` dari `R` adalah sebuah ideal jika memenuhi dua syarat berikut untuk setiap `a, b ∈ I` dan `r ∈ R`:
> > 
> > 1. `a - b ∈ I` (Menjamin `(I,+)` adalah subgrup).
> > 2. `r ⋅ a ∈ I` dan `a ⋅ r ∈ I` (Sifat penyerapan).
> > 
> > ### Ideal vs. Subgelanggang
> > 
> > Hubungan keduanya sangat jelas:
> > 
> > - **Setiap ideal adalah subgelanggang**. Ini karena jika `a,b ∈ I`, maka sifat penyerapan menjamin `a ⋅ b ∈ I` (dengan memilih `r=a`).
> > - **Tidak semua subgelanggang adalah ideal.** Ini adalah pembeda utamanya.
> > - _Contoh:_ `ℤ` adalah subgelanggang dari `ℚ`. Namun, `ℤ` **bukan** ideal dari `ℚ` karena ia tidak menyerap perkalian. Ambil `3 ∈ ℤ` dan `(1/2) ∈ ℚ`. Hasilnya `(1/2) ⋅ 3 = 3/2`, dan `3/2` tidak ada di `ℤ`.
> > 
> > ### Ideal Utama (Principal Ideal) `<r>`
> > 
> > Dalam sebuah gelanggang komutatif `R`, ideal yang paling sederhana adalah yang dapat dibangkitkan oleh satu elemen saja.
> > 
> > - **Definisi:** Ideal utama yang dibangkitkan oleh `r ∈ R`, dinotasikan `<r>`, adalah himpunan semua kelipatan `r` oleh elemen-elemen dari `R`.
> > - _Formal:_ `<r> = {s ⋅ r | s ∈ R}`.
> > 
> > ### Ideal dalam `ℤ`
> > 
> > Gelanggang bilangan bulat `ℤ` memiliki sifat yang sangat rapi terkait idealnya.
> > 
> > - **Teorema:** Setiap ideal dari `ℤ` adalah sebuah ideal utama. Ini berarti semua ideal di `ℤ` dapat ditulis dalam bentuk `nℤ` untuk suatu `n ∈ ℤ`.

> [!cornell] #### Summary
> 
> - **Sebuah Ideal adalah jenis subgelanggang spesial yang tidak hanya tertutup terhadap perkalian internal, tetapi juga 'menyerap' perkalian dari elemen manapun di gelanggang induknya. Sifat 'penyerapan' (`ra ∈ I` dan `ar ∈ I`) ini adalah pembeda utamanya. Ideal yang dapat dibangkitkan oleh satu elemen disebut Ideal Utama, dan di dalam gelanggang bilangan bulat `ℤ`, semua ideal memiliki bentuk `nℤ`.**

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Peran Ideal:** Ideal dalam teori gelanggang memiliki peran yang analog dengan **subgrup normal** dalam teori grup. Keberadaan ideal memungkinkan kita untuk membangun struktur baru yang disebut **Gelanggang Faktor** atau **Gelanggang Kuosien** (`R/I`), yang sangat fundamental dalam studi aljabar abstrak.
> 
> #### Contoh Soal
> 
> 1. **Soal Verifikasi:** Buktikan bahwa `I = 6ℤ` adalah ideal dari gelanggang `ℤ`.
>     - **Jawaban:** Ambil `a, b ∈ 6ℤ` dan `r ∈ ℤ`. Maka `a=6k₁` dan `b=6k₂` untuk suatu `k₁, k₂ ∈ ℤ`.
>         1. `a - b = 6k₁ - 6k₂ = 6(k₁-k₂)`. Karena `k₁-k₂ ∈ ℤ`, maka `a-b ∈ 6ℤ`. ✔️
>         2. `r ⋅ a = r(6k₁) = 6(rk₁)`. Karena `rk₁ ∈ ℤ`, maka `r⋅a ∈ 6ℤ`. (Karena `ℤ` komutatif, `a⋅r` juga ada di `6ℤ`). ✔️ Karena kedua syarat terpenuhi, `6ℤ` adalah ideal dari `ℤ`.
> 2. **Soal Ideal Trivial:** Apa saja ideal dari gelanggang lapangan (field) `F`?
>     - **Jawaban:** Sebuah lapangan `F` hanya memiliki dua ideal: `{0}` (ideal nol) dan `F` itu sendiri (ideal tak sejati). Ini karena jika sebuah ideal `I` dari `F` mengandung elemen tak-nol `x`, maka `x` memiliki invers `x⁻¹ ∈ F`. Berdasarkan sifat penyerapan, `x⁻¹ ⋅ x = 1` harus ada di `I`. Jika `1 ∈ I`, maka untuk setiap `r ∈ F`, `r ⋅ 1 = r` juga harus ada di `I`. Ini berarti `I = F`.
> 3. **Soal Ideal Utama:** Tuliskan ideal `<2, 3>` di dalam `ℤ` sebagai sebuah ideal utama.
>     - **Jawaban:** Ideal `<2, 3>` didefinisikan sebagai `{2a + 3b | a, b ∈ ℤ}`. Berdasarkan Identitas Bezout, kita tahu bahwa `gcd(2, 3) = 1` dapat ditulis sebagai kombinasi linear dari 2 dan 3. Misalnya, `(-1)⋅2 + (1)⋅3 = 1`. Karena `1` dapat dihasilkan, maka setiap bilangan bulat `n` dapat dihasilkan (`n = n⋅1 = n(-1)⋅2 + n(1)⋅3`). Jadi, `<2, 3> = ℤ` atau `<1>`.