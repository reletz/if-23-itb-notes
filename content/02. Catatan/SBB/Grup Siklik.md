---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Subgrup]]

> [!cornell] Grup Siklik
> 
> > ## Questions/Cues
> > 
> > - Orde Elemen
> > - Subgrup Siklik `<a>`
> > - Definisi Grup Siklik
> > - Sifat-sifat Grup Siklik
> > - Teorema Generator & Orde
> > - Contoh & Non-Contoh
> > - Teorema Penting Lainnya
> 
> > ### Orde Elemen
> > 
> > **Orde** dari sebuah elemen `a` dalam grup `G`, dinotasikan `|a|`, adalah bilangan bulat positif **terkecil** `n` sehingga `aⁿ = e` (di mana `e` adalah elemen identitas). Jika tidak ada `n` yang memenuhi, maka orde elemen tersebut tak hingga.
> > 
> > - _Catatan Notasi:_ Dalam grup dengan operasi `+` seperti `ℤₙ`, `aⁿ` berarti `a + a + ... + a` (sebanyak `n` kali), dan `e` adalah `0`.
> > 
> > ### Subgrup Siklik yang Dibangkitkan oleh `a`
> > 
> > Untuk setiap elemen `a` dalam grup `G`, kita bisa membentuk himpunan yang berisi semua pangkat bilangan bulat dari `a`. Himpunan ini disebut **subgrup siklik yang dibangkitkan oleh `a`**, dan dinotasikan sebagai `<a>`.
> > 
> > - _Formal:_ `<a> = { aᵏ | k ∈ ℤ } = {..., a⁻², a⁻¹, a⁰, a¹, a²,...}`.
> > - **Teorema:** `<a>` selalu membentuk sebuah subgrup dari `G`, dan merupakan subgrup terkecil yang memuat elemen `a`.
> > 
> > ### Definisi Grup Siklik
> > 
> > Sebuah grup `G` disebut **Grup Siklik** jika terdapat sebuah elemen `a` di `G` yang dapat membangkitkan **seluruh** elemen di `G`. Dengan kata lain, `G = <a>`.
> > 
> > - Elemen `a` yang istimewa ini disebut **generator** dari grup `G`.
> > - Sebuah grup siklik bisa memiliki lebih dari satu generator.
> > 
> > ### Sifat-sifat Penting Grup Siklik
> > 
> > 1. **Setiap Grup Siklik adalah Abelian:** Jika sebuah grup dapat dibangkitkan oleh satu elemen, maka operasinya dijamin bersifat komutatif (`a*b = b*a`).
> > 2. **Setiap Subgrup dari Grup Siklik juga Siklik:** Jika `G` adalah siklik dan `H ≤ G`, maka `H` juga pasti siklik (memiliki generatornya sendiri).
> > 
> > - _Penting:_ Kebalikannya tidak selalu berlaku. Sebuah grup non-siklik bisa saja memiliki semua subgrupnya siklik (contoh: Grup Klein 4).
> > 
> > ### Teorema Generator & Orde
> > 
> > Ini adalah aturan-aturan kunci untuk grup siklik hingga `G = <a>` dengan orde `n` (yaitu `|G| = n`):
> > 
> > - **Orde Elemen:** Orde dari elemen `aᵏ` adalah `|aᵏ| = n / gcd(n, k)`.
> > - **Kondisi Generator:** Elemen `aᵏ` adalah sebuah generator untuk `G` jika dan hanya jika `gcd(n, k) = 1`.
> > - **Jumlah Generator:** Banyaknya generator dalam grup siklik berorde `n` adalah `φ(n)` (fungsi Euler-phi).
> > 
> > ### Contoh & Non-Contoh
> > 
> > - **Grup Siklik:**
> >     - `(ℤ, +)`: Grup siklik tak hingga, generatornya adalah `1` dan `-1`.
> >     - `(ℤₙ, +)`: Selalu siklik untuk setiap `n`. Generatornya adalah `[k]` di mana `(k, n) = 1`.
> >     - `(U(14), ⋅)`: Siklik, karena `U(14) = <3>`.
> > - **Grup Non-Siklik:**
> >     - `(U(15), ⋅)`: Bukan siklik. `|U(15)|=8`, tetapi tidak ada elemen yang memiliki orde 8.
> > 
> > ### Teorema Penting Lainnya
> > 
> > - **Grup Berorde Prima:** Setiap grup yang ordenya (jumlah elemennya) adalah bilangan prima, pasti merupakan grup siklik.
> > - **Teorema Akar Primitif:** Memberi tahu kita kapan `U(n)` siklik. `U(n)` siklik jika dan hanya jika `n` adalah `1, 2, 4, pᵏ`, atau `2pᵏ` di mana `p` adalah bilangan prima ganjil.

> [!cornell] #### Summary
> Sebuah Grup Siklik adalah grup yang seluruh elemennya dapat 'dibangkitkan' dari satu elemen tunggal yang disebut generator. Grup ini secara inheren bersifat Abelian dan semua subgrupnya juga siklik. Orde dari elemen-elemennya dan identitas para generatornya dapat ditentukan secara presisi menggunakan `gcd` dan fungsi `φ` Euler, menjadikannya salah satu jenis grup yang paling terstruktur dan dapat dipahami dalam aljabar abstrak.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Isomorfisma:** Dalam aljabar, semua grup siklik tak hingga secara struktur identik (isomorfik) dengan `(ℤ, +)`. Sementara itu, semua grup siklik hingga berorde `n` isomorfik dengan `(ℤₙ, +)`. Artinya, `ℤ` dan `ℤₙ` adalah "prototipe" dari semua grup siklik.
> 
> #### Contoh Soal
> 
> 1. **Soal Orde & Generator:** Di `ℤ₁₂`, tentukan orde dari elemen `[9]`. Apakah `[9]` bisa menjadi generator `ℤ₁₂`?
>     - **Jawaban:** Kita gunakan rumus `|aᵏ| = n / gcd(n, k)`. Di sini, `n=12` dan `k=9`. `gcd(12, 9) = 3`. Maka, orde dari `[9]` adalah `12 / 3 = 4`. Karena ordenya `4` (bukan `12`), `[9]` tidak bisa menjadi generator `ℤ₁₂`.
> 2. **Soal Menentukan Generator:** Berapa banyak generator yang dimiliki oleh `ℤ₂₀`? Sebutkan tiga di antaranya.
>     - **Jawaban:** Jumlah generatornya adalah `φ(20)`. `φ(20) = φ(4 ⋅ 5) = φ(2²)φ(5) = (2²-2¹) ⋅ (5-1) = 2 ⋅ 4 = 8`. Ada 8 generator. Generatornya adalah `[k]` di mana `gcd(k, 20) = 1`. Tiga contoh di antaranya adalah `[1]`, `[3]`, dan `[7]`.
> 3. **Soal Aplikasi Teorema:** Apakah grup `U(24)` siklik? Jelaskan.
>     - **Jawaban:** Tidak. Kita gunakan Teorema Akar Primitif. `24` tidak berbentuk `1, 2, 4, pᵏ`, atau `2pᵏ`. `24 = 8 ⋅ 3 = 2³ ⋅ 3`. Ini adalah bentuk `4p` (dengan `p` ganjil) yang dikalikan 2. Menurut catatan teorema (atau pengembangannya), bentuk ini tidak menghasilkan grup `U(n)` yang siklik. Jadi, `U(24)` tidak siklik.