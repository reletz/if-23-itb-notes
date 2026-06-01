---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]
> [!cornell] Subgrup
> 
> > ## Questions/Cues
> > 
> > - Definisi Subgrup
> > - Tes Subgrup (Tiga Langkah)
> > - Tes Subgrup (Satu Langkah)
> > - Tes Subgrup Hingga
> > - Contoh-contoh Subgrup
> > - Subgrup Spesial: Center `Z(G)`
> > - Subgrup Spesial: Centralizer `C(a)`
> 
> > ### Definisi Subgrup
> > 
> > Sebuah **Subgrup** `H` adalah sebuah himpunan bagian (subset) dari grup `G` yang juga membentuk sebuah grup dengan menggunakan **operasi biner yang sama** seperti di `G`.
> > 
> > - **Notasi:** `H ≤ G` dibaca "H adalah subgrup dari G".
> > - **Warisan Sifat:** Karena `H` adalah bagian dari `G`, sifat **asosiatif** secara otomatis diwariskan oleh `H` dari `G`. Ini menyederhanakan proses pembuktian.
> > 
> > ### Tes Subgrup (Tiga Langkah)
> > 
> > Ini adalah cara standar untuk memeriksa apakah sebuah himpunan bagian `H` dari `G` merupakan subgrup. `H` adalah subgrup jika dan hanya jika ketiga kondisi ini terpenuhi:
> > 
> > 1. **Mengandung Identitas:** Elemen identitas `e` dari `G` juga harus ada di dalam `H`. (`e ∈ H`).
> > 2. **Tertutup terhadap Operasi:** Jika `h₁` dan `h₂` ada di `H`, maka hasil operasinya `h₁ * h₂` juga harus ada di `H`.
> > 3. **Tertutup terhadap Invers:** Jika `h` ada di `H`, maka inversnya `h⁻¹` juga harus ada di `H`.
> > 
> > ### Tes Subgrup (Satu Langkah)
> > 
> > Ini adalah tes yang lebih ringkas dan efisien. Sebuah himpunan bagian tak-kosong `H` dari `G` adalah subgrup jika dan hanya jika:
> > 
> > - **Kondisi Tunggal:** Untuk setiap `g, h ∈ H`, berlaku `g * h⁻¹ ∈ H`.
> > - _Kekuatan Tes Ini:_ Kondisi tunggal ini secara cerdas sudah mencakup syarat tertutup terhadap invers dan operasi sekaligus.
> > 
> > ### Tes Subgrup Hingga (Finite Subgroup Test)
> > 
> > Ini adalah "jalan pintas" khusus jika grup `G` (dan consequently `H`) adalah grup hingga. Sebuah himpunan bagian tak-kosong `H` dari grup hingga `G` adalah subgrup jika dan hanya jika:
> > 
> > - **Kondisi Tunggal:** `H` **tertutup** di bawah operasi grup.
> > - _Mengapa Cukup?_ Dalam konteks himpunan hingga, sifat tertutup saja sudah cukup untuk menjamin adanya elemen identitas dan invers di dalam `H`.
> > 
> > ### Contoh-contoh Subgrup
> > 
> > - **Subgrup Trivial:** Setiap grup `G` pasti memiliki dua subgrup trivial: `{e}` (hanya berisi elemen identitas) dan `G` itu sendiri.
> > - **`(ℤ, +) ≤ (ℚ, +) ≤ (ℝ, +)`:** Himpunan bilangan bulat adalah subgrup dari himpunan bilangan rasional, yang juga merupakan subgrup dari himpunan bilangan real, semuanya dengan operasi penjumlahan.
> > - **`nℤ ≤ ℤ`:** Himpunan semua kelipatan bilangan bulat `n` (misalnya, `3ℤ = {..., -3, 0, 3, ...}`) selalu membentuk subgrup dari `(ℤ, +)`.
> > 
> > ### Subgrup Spesial: Center `Z(G)`
> > 
> > **Center** dari sebuah grup `G`, dinotasikan `Z(G)`, adalah himpunan semua elemen di `G` yang bersifat komutatif dengan **setiap** elemen lain di `G`.
> > 
> > - _Formal:_ `Z(G) = {x ∈ G | gx = xg untuk semua g ∈ G}`.
> > - `Z(G)` selalu merupakan subgrup dari `G`.
> > - Jika `G` adalah grup Abelian, maka semua elemennya komutatif, sehingga `Z(G) = G`.
> > 
> > ### Subgrup Spesial: Centralizer `C(a)`
> > 
> > **Centralizer** dari sebuah elemen `a` di `G`, dinotasikan `C(a)`, adalah himpunan semua elemen di `G` yang bersifat komutatif **hanya dengan elemen `a` tersebut**.
> > 
> > - _Formal:_ `C(a) = {g ∈ G | ag = ga}`.
> > - `C(a)` juga selalu merupakan subgrup dari `G`.
> > - Hubungan dengan Center: Center `Z(G)` adalah irisan dari semua Centralizer `C(a)` untuk setiap `a` di `G`.

> [!cornell] #### Summary
> Sebuah Subgrup `H` adalah himpunan bagian dari grup `G` yang juga membentuk grup dengan operasi yang sama. Untuk membuktikannya, kita dapat menggunakan 'tes subgrup' yang lebih sederhana (seperti tes satu langkah: `gh⁻¹ ∈ H`), daripada memeriksa semua aksioma grup dari awal. Terdapat pula subgrup-subgrup spesial seperti Center `Z(G)` (elemen yang komutatif dengan semua) dan Centralizer `C(a)` (elemen yang komutatif dengan `a`), yang mengelompokkan elemen-elemen berdasarkan sifat komutatifnya.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Normalizer dan Subgrup Konjugasi:** Konsep yang lebih lanjut adalah **Normalizer** dari subgrup `H` (`N(H)`) dan **subgrup konjugasi** (`gHg⁻¹`). Ini adalah alat penting dalam mempelajari struktur internal grup dan dekomposisinya.
> 
> #### Contoh Soal
> 
> 1. **Soal Tes Subgrup:** Gunakan tes subgrup satu langkah untuk membuktikan bahwa `H = {a + b√2 | a, b ∈ ℤ}` adalah subgrup dari `(ℝ, +)`.
>     - **Jawaban:** Ambil dua elemen sembarang dari `H`, yaitu `x = a₁ + b₁√2` dan `y = a₂ + b₂√2`. Operasi grupnya adalah `+`, jadi invers dari `y` adalah `-y`.
>     - Kita perlu periksa apakah `x + (-y)` ada di `H`. `x - y = (a₁ + b₁√2) - (a₂ + b₂√2) = (a₁ - a₂) + (b₁ - b₂)√2`.
>     - Karena `a₁-a₂` dan `b₁-b₂` adalah bilangan bulat, hasilnya memiliki bentuk `a' + b'√2` dan dengan demikian ada di `H`. `H` adalah subgrup.
> 2. **Soal Center:** Tentukan Center dari `GL₂(ℝ)`.
>     - **Jawaban:** Center `Z(GL₂(ℝ))` adalah himpunan matriks skalar, yaitu matriks berbentuk `[[a, 0], [0, a]]` di mana `a` adalah bilangan real tak-nol. Hanya matriks jenis ini yang dijamin komutatif dengan semua matriks 2x2 lainnya yang dapat dibalik.
> 3. **Soal Centralizer:** Di grup `(ℤ₁₀, +)`, tentukan `C(2)`.
>     - **Jawaban:** Operasi grupnya adalah penjumlahan, yang bersifat komutatif. Karena itu, setiap elemen akan komutatif dengan elemen `2`. Jadi, `C(2) = ℤ₁₀` itu sendiri. Secara umum, dalam grup Abelian `G`, `C(a) = G` untuk setiap elemen `a`.