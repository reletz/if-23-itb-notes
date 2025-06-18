---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Gelanggang (Ring)
> 
> > ## Questions/Cues
> > 
> > - Definisi Gelanggang
> > - Tiga Aksioma Gelanggang
> > - Jenis-jenis Gelanggang
> > - Contoh-contoh Gelanggang
> > - Subgelanggang & Tesnya
> 
> > ## Catatan
> > 
> > ### Definisi Gelanggang
> > 
> > Sebuah **Gelanggang (Ring)** adalah sebuah sistem matematika yang dinotasikan sebagai `(R, +, ⋅)`, yang terdiri dari himpunan tak-kosong `R` dan **dua operasi biner**, yaitu penjumlahan `(+)` dan perkalian `(⋅)`. Ini merupakan struktur yang lebih kompleks dibandingkan grup yang hanya memiliki satu operasi.
> > 
> > ### Tiga Aksioma Gelanggang
> > 
> > Agar sebuah sistem `(R, +, ⋅)` dapat disebut gelanggang, ia wajib memenuhi tiga syarat utama berikut:
> > 
> > 1. **Struktur Grup Aditif:** Terhadap operasi penjumlahan, `(R, +)` harus membentuk sebuah **Grup Komutatif**. Ini berarti penjumlahan harus asosiatif, komutatif, memiliki elemen identitas (biasanya `0`), dan setiap elemen harus memiliki invers aditif (misalnya, invers dari `a` adalah `-a`).
> > 2. **Struktur Semigrup Multiplikatif:** Terhadap operasi perkalian, `(R, ⋅)` harus bersifat **Asosiatif**. Artinya, `(a ⋅ b) ⋅ c = a ⋅ (b ⋅ c)` untuk semua elemen.
> > 3. **Hukum Distributif:** Operasi perkalian harus distributif terhadap operasi penjumlahan. Ini adalah hukum yang mengikat kedua operasi tersebut.
> >     - Distributif Kiri: `a ⋅ (b + c) = (a ⋅ b) + (a ⋅ c)`
> >     - Distributif Kanan: `(a + b) ⋅ c = (a ⋅ c) + (b ⋅ c)`
> > 
> > ### Jenis-jenis Gelanggang (Klasifikasi)
> > 
> > Gelanggang dapat diklasifikasikan lebih lanjut berdasarkan sifat tambahan:
> > 
> > - **Gelanggang Komutatif:** Sebuah gelanggang disebut komutatif jika operasi perkaliannya bersifat komutatif (`a ⋅ b = b ⋅ a`).
> > - **Gelanggang dengan Elemen Satuan (Unity):** Sebuah gelanggang yang memiliki elemen identitas untuk operasi perkalian (biasanya dinotasikan sebagai `1`).
> > - **Unit:** Dalam gelanggang dengan elemen satuan, sebuah **unit** adalah elemen yang memiliki invers perkalian.
> > 
> > ### Contoh-contoh Gelanggang
> > 
> > - **`(ℤ, +, ⋅)` dan `(ℤₙ, +, ⋅)`:** Keduanya adalah contoh utama dari gelanggang komutatif dengan elemen satuan.
> > - **`(2ℤ, +, ⋅)`:** Himpunan bilangan genap. Ini adalah gelanggang komutatif, tetapi tidak memiliki elemen satuan (karena `1` bukan bilangan genap).
> > - **`(M₂(ℝ), +, ⋅)`:** Gelanggang matriks 2x2 dengan entri bilangan real. Ini adalah gelanggang dengan elemen satuan (matriks identitas), tetapi **tidak komutatif** karena perkalian matriks tidak komutatif.
> > 
> > ### Subgelanggang (Sub-ring)
> > 
> > - **Definisi:** Sebuah himpunan bagian tak-kosong `S` dari gelanggang `R` disebut **subgelanggang** jika `S` sendiri membentuk sebuah gelanggang dengan menggunakan operasi `+` dan `⋅` yang sama dari `R`.
> > - **Tes Subgelanggang:** Untuk membuktikan `S` adalah subgelanggang dari `R`, kita hanya perlu memeriksa dua kondisi untuk setiap `a, b ∈ S`:
> >     1. `a - b ∈ S` (Tertutup terhadap pengurangan, yang menjamin `(S,+)` adalah subgrup).
> >     2. `a ⋅ b ∈ S` (Tertutup terhadap perkalian).

> [!cornell] #### Summary
> Sebuah Gelanggang (Ring) adalah struktur aljabar dengan dua operasi, `+` dan `⋅`, di mana himpunannya membentuk grup komutatif terhadap penjumlahan, operasinya asosiatif terhadap perkalian, dan berlaku hukum distributif yang menghubungkan keduanya. Gelanggang bisa diklasifikasikan lebih lanjut, misalnya sebagai komutatif atau memiliki elemen satuan. Subhimpunannya yang juga gelanggang disebut subgelanggang, yang dapat diverifikasi dengan tes sederhana.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Ideal:** Konsep yang lebih kuat dari subgelanggang adalah **Ideal**. Sebuah ideal `I` tidak hanya tertutup terhadap perkalian internal (`i₁ ⋅ i₂ ∈ I`), tetapi juga "menyerap" perkalian eksternal. Artinya, untuk setiap `i ∈ I` dan `r ∈ R` (elemen dari gelanggang utama), hasil `r ⋅ i` dan `i ⋅ r` harus tetap berada di dalam `I`. Ideal sangat penting untuk membangun gelanggang kuosien, mirip seperti subgrup normal pada teori grup.
> 
> #### Contoh Soal
> 
> 1. **Soal Identifikasi:** Jelaskan mengapa himpunan `(Uₙ, +, ⋅)` (himpunan unit dari `ℤₙ`) bukan merupakan sebuah gelanggang.
>     - **Jawaban:** Syarat pertama sebuah gelanggang adalah himpunan tersebut harus membentuk grup komutatif terhadap penjumlahan. Himpunan `Uₙ` tidak memenuhi syarat ini. Contohnya di `U₈ = {[1], [3], [5], [7]}`, hasil dari `[3] + [5] = [8] = [0]`, tetapi `[0]` tidak termasuk dalam `U₈`. Jadi, `Uₙ` tidak tertutup terhadap penjumlahan dan bukan merupakan gelanggang.
> 2. **Soal Subgelanggang:** Buktikan bahwa `S = {[[a, 0], [0, b]] | a, b ∈ ℤ}` (himpunan matriks diagonal 2x2 dengan entri integer) adalah subgelanggang dari `M₂(ℤ)`.
>     - **Jawaban:** Kita gunakan tes subgelanggang. Ambil dua matriks sembarang `X = [[a₁, 0], [0, b₁]]` dan `Y = [[a₂, 0], [0, b₂]]` di `S`.
>         1. `X - Y = [[a₁-a₂, 0], [0, b₁-b₂]]`. Karena `a₁-a₂` dan `b₁-b₂` adalah bilangan bulat, `X-Y` memiliki bentuk matriks diagonal dan ada di `S`. ✔️
>         2. `X ⋅ Y = [[a₁a₂, 0], [0, b₁b₂]]`. Karena `a₁a₂` dan `b₁b₂` adalah bilangan bulat, `X⋅Y` juga memiliki bentuk matriks diagonal dan ada di `S`. ✔️ Karena kedua syarat terpenuhi, `S` adalah subgelanggang dari `M₂(ℤ)`.
> 3. **Soal Unit:** Tentukan semua **unit** dalam gelanggang `ℤ₁₂`.
>     - **Jawaban:** Unit dalam `ℤₙ` adalah elemen-elemen `[a]` di mana `(a, n) = 1`. Untuk `n=12`, kita mencari semua bilangan kurang dari 12 yang relatif prima terhadap 12. Bilangan-bilangan tersebut adalah 1, 5, 7, dan 11. Jadi, unit-unit di `ℤ₁₂` adalah `[1]`, `[5]`, `[7]`, dan `[11]`. Himpunan ini membentuk grup `U(12)`.