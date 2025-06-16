---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[SBB]]
> [!cornell] Properti Elemen Grup
> 
> > ## Questions/Cues
> > 
> > - Ketunggalan Identitas
> > - Ketunggalan Invers
> > - Invers dari Invers
> > - Invers dari Perkalian (Socks-Shoes)
> > - Hukum Kanselasi (Pembatalan)
> > - Notasi Pangkat
> 
> > ### Properti Fundamental
> > 
> > Setelah sebuah himpunan dan operasi terbukti sebagai sebuah grup, ada beberapa properti fundamental yang secara otomatis berlaku untuk semua elemen di dalamnya. Properti ini membuat struktur grup menjadi sangat konsisten dan dapat diprediksi.
> > 
> > ### Ketunggalan Elemen Identitas
> > 
> > **Teorema:** Dalam sebuah grup `(G, *)`, elemen identitas `e` bersifat **unik**.
> > 
> > - _Artinya:_ Tidak mungkin ada dua atau lebih elemen identitas yang berbeda dalam satu grup. Hanya ada satu.
> > - _Intuisi Bukti:_ Jika kita asumsikan ada dua identitas, `e₁` dan `e₂`, kita bisa menunjukkan bahwa keduanya sebenarnya sama dengan melihat hasil operasi `e₁ * e₂`.
> > 
> > ### Ketunggalan Elemen Invers
> > 
> > **Teorema:** Untuk setiap elemen `a` dalam grup `G`, elemen inversnya (ditulis `a⁻¹`) bersifat **unik**.
> > 
> > - _Artinya:_ Setiap elemen hanya memiliki tepat satu "pasangan" invers.
> > - _Intuisi Bukti:_ Jika kita asumsikan `b` dan `c` keduanya adalah invers dari `a`, kita bisa membuktikan `b = c` dengan menggunakan sifat asosiatif dan definisi invers (`b = b*(a*c) = (b*a)*c = c`).
> > 
> > ### Invers dari Invers
> > 
> > **Properti:** Invers dari sebuah elemen invers adalah elemen itu sendiri.
> > 
> > - _Formal:_ `(a⁻¹)⁻¹ = a`
> > - _Contoh:_ Dalam `(ℤ, +)`, invers dari `5` adalah `-5`. Invers dari `-5` adalah `5`.
> > 
> > ### Invers dari Perkalian (Properti Kaus Kaki-Sepatu)
> > 
> > **Properti:** Invers dari hasil perkalian dua elemen adalah perkalian dari invers masing-masing elemen, tetapi dalam **urutan terbalik**.
> > 
> > - _Formal:_ `(a * b)⁻¹ = b⁻¹ * a⁻¹`
> > - _Analogi "Socks-Shoes":_ Untuk membatalkan tindakan memakai kaus kaki (`a`) lalu sepatu (`b`), Anda harus melepas sepatu (`b⁻¹`) terlebih dahulu, baru kemudian melepas kaus kaki (`a⁻¹`). Urutannya dibalik.
> > 
> > ### Hukum Kanselasi (Pembatalan)
> > 
> > **Teorema:** Dalam sebuah grup, kita dapat melakukan "pencoretan" atau kanselasi pada persamaan.
> > 
> > - **Kanselasi Kiri:** Jika `a * b = a * c`, maka dapat disimpulkan `b = c`.
> > - **Kanselasi Kanan:** Jika `b * a = c * a`, maka dapat disimpulkan `b = c`.
> > - _Penting:_ Ini berlaku karena kita selalu bisa mengalikan kedua sisi persamaan dengan `a⁻¹` (dari kiri atau dari kanan, tergantung posisinya) untuk menghilangkan `a`.
> > 
> > ### Notasi Pangkat
> > 
> > Dalam konteks grup, notasi pangkat digunakan sebagai singkatan untuk operasi berulang:
> > 
> > - **Pangkat Positif:** `gⁿ = g * g * ... * g` (sebanyak `n` kali).
> > - **Pangkat Nol:** `g⁰ = e` (elemen identitas).
> > - **Pangkat Negatif:** `g⁻ⁿ = (g⁻¹)ⁿ = (gⁿ)⁻¹`.

> [!cornell] #### Summary
> Setiap grup secara inheren memiliki sifat-sifat fundamental: elemen identitas dan elemen invers untuk setiap anggota bersifat unik. Properti penting lainnya termasuk invers dari perkalian yang urutannya dibalik (`(ab)⁻¹ = b⁻¹a⁻¹`), yang dikenal sebagai properti kaus kaki-sepatu, serta berlakunya hukum kanselasi kiri dan kanan yang memungkinkan 'pencoretan' elemen dalam persamaan grup.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Tidak Ada Pembagian:** Hukum kanselasi adalah alasan mengapa dalam teori grup abstrak kita tidak berbicara tentang "pembagian". Alih-alih "membagi dengan `a`", kita "mengalikan dengan invers `a`". Konsep ini lebih umum dan berlaku bahkan ketika operasinya bukan aritmetika biasa.
> 
> #### Contoh Soal
> 
> 1. **Soal Sederhana:** Dalam grup `(ℤ₁₀, +)`, tentukan invers dari `4`. Lalu, buktikan bahwa `(4⁻¹)⁻¹ = 4`.
>     - **Jawaban:** Kita mencari `x` sehingga `4 + x ≡ 0 mod 10`. Jawabannya adalah `x = 6`. Jadi, `4⁻¹ = 6`.
>     - Selanjutnya, kita cari invers dari `6`. Kita butuh `y` sehingga `6 + y ≡ 0 mod 10`. Jawabannya adalah `y = 4`.
>     - Jadi, `(4⁻¹)⁻¹ = 6⁻¹ = 4`, terbukti.
> 2. **Soal "Socks-Shoes":** Dalam grup matriks `GL₂(ℝ)`, jika `A = [[1, 2], [0, 1]]` dan `B = [[0, 1], [1, 0]]`, hitung `(AB)⁻¹` menggunakan properti invers perkalian.
>     - **Jawaban:** Kita tidak perlu menghitung `AB` terlebih dahulu. Kita gunakan `(AB)⁻¹ = B⁻¹A⁻¹`.
>         - `A⁻¹ = [[1, -2], [0, 1]]`
>         - `B⁻¹ = [[0, 1], [1, 0]]` (matriks ini adalah inversnya sendiri).
>         - `(AB)⁻¹ = B⁻¹A⁻¹ = [[0, 1], [1, 0]] * [[1, -2], [0, 1]] = [[0, 1], [1, -2]]`.
> 3. **Soal Penyederhanaan:** Dalam sebuah grup `G`, sederhanakan ekspresi `b * a * (b * a)⁻¹ * b`.
>     - **Jawaban:** `b * a * (b * a)⁻¹ * b` `= b * a * (a⁻¹ * b⁻¹) * b` (menggunakan properti "socks-shoes") `= b * (a * a⁻¹) * b⁻¹ * b` (menggunakan asosiatif) `= b * e * b⁻¹ * b` (definisi invers `a * a⁻¹ = e`) `= (b * b⁻¹) * b` (definisi identitas `b * e = b`) `= e * b` (definisi invers `b * b⁻¹ = e`) `= b` (definisi identitas `e * b = b`).
>     - Jadi, ekspresi tersebut menyederhanakan menjadi `b`.