---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Daerah Integral (Integral Domain)
> 
> > ## Questions/Cues
> > 
> > - Definisi Daerah Integral
> > - Syarat Kunci: Tanpa Pembagi Nol
> > - Hukum Pencoretan
> > - Contoh & Non-Contoh
> > - Hubungan dengan `ℤₙ`
> 
> > ### Definisi Daerah Integral
> > 
> > Sebuah **Daerah Integral** adalah tingkatan selanjutnya setelah gelanggang komutatif. Ia adalah struktur yang sifat-sifatnya mulai sangat mirip dengan himpunan bilangan bulat `(ℤ)`.
> >
> > Secara formal, sebuah gelanggang `(R, +, ⋅)` disebut Daerah Integral jika memenuhi tiga syarat berikut:
> > 1. Merupakan **Gelanggang Komutatif**.
> > 2. Memiliki **Elemen Satuan** (`1`, di mana `1 ≠ 0`).
> > 3. **Tidak Memiliki Pembagi Nol**.
> > 
> > ### Syarat Kunci: Tanpa Pembagi Nol
> > 
> > Ini adalah properti yang membedakan Daerah Integral dari gelanggang komutatif biasa.
> > 
> > - Pembagi Nol: Sebuah elemen tak-nol a disebut pembagi nol jika terdapat elemen tak-nol b sehingga a ⋅ b = 0.
> > 
> > - Tanpa Pembagi Nol: Dalam sebuah daerah integral, jika a ⋅ b = 0, maka kesimpulannya pasti salah satu dari a atau b (atau keduanya) adalah nol3. Hal ini persis seperti yang terjadi pada perkalian bilangan bulat biasa.
> > 
> > ### Hukum Pencoretan (Cancellation Law)
> > 
> > Sifat "tanpa pembagi nol" secara langsung melahirkan kembali sebuah hukum yang sangat kita kenal: Hukum Pencoretan.
> > 
> > > - Teorema: Dalam sebuah daerah integral D, jika a ≠ 0 dan berlaku a ⋅ b = a ⋅ c, maka kita dapat "mencoret" a dan menyimpulkan bahwa b = c4.
> > 
> > - _Mengapa ini penting?_ Hukum ini tidak berlaku di semua gelanggang. Ia hanya berlaku di gelanggang yang tidak memiliki pembagi nol.
> > 
> > ### Contoh & Non-Contoh
> > 
> > - **Contoh Daerah Integral:** > - `(ℤ, +, ⋅)` adalah contoh prototipe dari sebuah daerah integral5.
> >     
> >     - Gelanggang bilangan rasional `(ℚ, +, ⋅)` dan bilangan real `(ℝ, +, ⋅)`. > - Gelanggang Gaussian `ℤ[i] = {a+bi | a,b ∈ ℤ}` juga merupakan daerah integral6666.
> >         
> > - **Non-Contoh (Bukan Daerah Integral):**
> >     - `(ℤₙ, +, ⋅)` di mana `n` adalah bilangan **komposit**. Contohnya, `ℤ₆` bukan daerah integral karena `[2] ⋅ [3] = [6] = [0]`, padahal `[2]` dan `[3]` keduanya bukan nol. Di sini, `[2]` dan `[3]` adalah pembagi nol7.
> >         
> > 
> > ### Hubungan dengan `ℤₙ`
> > 
> > Terdapat hubungan yang sangat jelas antara `ℤₙ` dan konsep daerah integral:
> > 
> > - **Teorema:** Gelanggang `(ℤₙ, +, ⋅)` merupakan sebuah **daerah integral jika dan hanya jika `n` adalah bilangan prima**.
> > - _Alasan:_ Jika `n` prima, tidak mungkin ada perkalian dua bilangan yang lebih kecil dari `n` yang hasilnya adalah kelipatan `n`. Ini menjamin tidak adanya pembagi nol.

> [!cornell] #### Summary
> Sebuah Daerah Integral adalah gelanggang komutatif dengan elemen satuan yang meniru sifat penting bilangan bulat, yaitu dengan tidak memiliki pembagi nol. Sifat kunci ini memungkinkan berlakunya kembali Hukum Pencoretan, yang tidak selalu berlaku di gelanggang umum. Gelanggang `ℤₙ` menjadi sebuah daerah integral jika dan hanya jika `n` adalah bilangan prima

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Unit, Unsur Prima, dan Bilangan Sekawan:** Di dalam daerah integral, kita bisa mulai mendefinisikan konsep-konsep yang berkaitan dengan faktorisasi. - **Unit:** Elemen yang memiliki invers perkalian8. Di `ℤ`, unitnya hanya `1` dan `-1`. - **Unsur Prima:** Elemen `p` (bukan unit) yang jika `p` membagi `ab`, maka `p` harus membagi `a` atau `p` membagi `b`9. - **Bilangan Sekawan (Associates):** Dua elemen `a` dan `b` disebut sekawan jika `a = bu` untuk suatu unit `u`10. Di `ℤ`, `5` dan `-5` adalah sekawan. Konsep-konsep ini menjadi fondasi untuk topik Daerah Faktorisasi Tunggal (UFD).
>     
> 
> #### Contoh Soal
> 
> 1. **Soal Identifikasi Pembagi Nol:** Tentukan semua pembagi nol dalam gelanggang `ℤ₁₀`.
>     - **Jawaban:** Pembagi nol di `ℤ₁₀` adalah kelas residu `[a]` di mana `a ≠ 0` dan `gcd(a, 10) > 1`. Mereka adalah: `[2]`, `[4]`, `[5]`, `[6]`, dan `[8]`. (Contoh: `[2]⋅[5]=[10]=[0]`).
> 2. **Soal Verifikasi:** Apakah gelanggang matriks `M₂(ℝ)` (semua matriks 2x2 dengan entri real) merupakan sebuah daerah integral? Jelaskan.
>     - **Jawaban:** Tidak. `M₂(ℝ)` gagal pada dua syarat:
>         1. **Tidak Komutatif:** Perkalian matriks pada umumnya tidak komutatif.
>         2. **Memiliki Pembagi Nol:** Sangat mungkin menemukan dua matriks tak-nol `A` dan `B` yang hasil kalinya adalah matriks nol. Contoh: `A=[[1, 0], [0, 0]]` dan `B=[[0, 0], [0, 1]]`. `A ⋅ B` adalah matriks nol.
> 3. **Soal Aplikasi Hukum Pencoretan:** Di `ℤ₁₅`, persamaan `[3]x = [3][7]` memiliki solusi `x=[7]`. Apakah `x=[7]` satu-satunya solusi?
>     - **Jawaban:** Tidak. `ℤ₁₅` bukan daerah integral karena `3` dan `5` adalah faktor dari `15`. `[3]` adalah pembagi nol (`[3][5]=[0]`). Hukum pencoretan tidak berlaku untuk `[3]`.
>     - Kita bisa periksa solusi lain. `[3]x = [21] ≡ [6]`.
>         - `x=[2]` → `[3][2]=[6]` (Solusi lain!)
>         - `x=[7]` → `[3][7]=[21]≡[6]` (Solusi awal).
>         - `x=[12]` → `[3][12]=[36]≡[6]` (Solusi lain!)
>     - Ada lebih dari satu solusi karena kita tidak bisa "mencoret" `[3]` begitu saja.