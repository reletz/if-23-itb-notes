---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Lapangan (Field)
> 
> > ## Questions/Cues
> > 
> > - Definisi Lapangan
> > - Syarat Kunci: Invers Perkalian
> > - Hubungan dengan Struktur Lain
> > - Daerah Integral Berhingga
> > - Sifat Ideal Lapangan
> 
> > ### Definisi Lapangan
> > 
> > Sebuah **Lapangan (Field)** adalah struktur gelanggang yang paling "lengkap" dan "sempurna". Ini adalah gelanggang komutatif dengan elemen satuan di mana **setiap elemen tak-nol memiliki invers perkalian**.
> > 
> > Secara intuitif, lapangan adalah sebuah sistem di mana kita bisa melakukan operasi tambah, kurang, kali, dan bagi (dengan pembagi tak-nol) dengan bebas, seperti pada himpunan bilangan rasional `(ℚ)` atau real `(ℝ)`.
> > 
> > ### Syarat Kunci: Invers Perkalian
> > 
> > Inilah properti yang membedakan lapangan dari daerah integral.
> > 
> > - Untuk setiap elemen `a ≠ 0` dalam sebuah lapangan `F`, dijamin ada elemen `a⁻¹ ∈ F` sehingga `a ⋅ a⁻¹ = 1`.
> > - Ini berarti himpunan elemen tak-nol dari sebuah lapangan, `F* = F \ {0}`, membentuk sebuah **grup komutatif** terhadap operasi perkalian.
> > 
> > ### Hubungan dengan Struktur Lain (Hierarki)
> > 
> > Lapangan menempati posisi puncak dalam hierarki gelanggang yang telah kita bangun.
> > 
> > - **Setiap Lapangan adalah Daerah Euclid.** Kita bisa membuktikannya dengan mendefinisikan fungsi Euklides `δ(x)=1` untuk semua `x≠0`. Algoritma pembagian `b = qa + r` selalu terpenuhi dengan `q = ba⁻¹` dan `r = 0`.
> > - **Setiap Lapangan adalah Daerah Integral.** Ini karena keberadaan invers perkalian menjamin tidak adanya pembagi nol.
> > - **Hierarki Final:** `Lapangan ⊂ Daerah Euclid ⊂ DIU ⊂ DFT ⊂ Daerah Integral ⊂ Gelanggang`.
> > 
> > ### Daerah Integral Berhingga adalah Lapangan
> > 
> > Ini adalah teorema yang sangat penting dan berguna.
> > 
> > - **Teorema:** Setiap **daerah integral yang berhingga** juga merupakan sebuah **lapangan**.
> > - _Implikasi:_ Kita tahu `ℤₙ` adalah daerah integral jika `n` prima. Karena `ℤₙ` juga berhingga, maka `ℤₚ` (untuk `p` prima) pasti merupakan sebuah lapangan.
> > 
> > ### Sifat Ideal Lapangan
> > 
> > Struktur ideal dari sebuah lapangan sangat sederhana.
> > 
> > - **Teorema:** Sebuah lapangan `F` hanya memiliki dua ideal: ideal trivial `{0}` dan `F` itu sendiri.
> > - Ini terjadi karena jika sebuah ideal mengandung satu saja elemen tak-nol, ia pasti akan mengandung inversnya (melalui perkalian dengan elemen lain di F), yang akan menghasilkan `1`, dan akhirnya akan mencakup seluruh lapangan.

> [!cornell] #### Summary
> Sebuah Lapangan (Field) adalah struktur gelanggang paling 'lengkap', yaitu gelanggang komutatif dengan elemen satuan di mana setiap elemen tak-nolnya memiliki invers perkalian. Sifat ini memungkinkan adanya operasi pembagian dan menempatkan lapangan di puncak hierarki gelanggang, karena setiap lapangan adalah Daerah Euclid (dan DIU, DFT, Daerah Integral). Teorema penting lainnya menyatakan bahwa setiap daerah integral berhingga juga merupakan sebuah lapangan.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Visualisasi Hierarki:** Hirarki gelanggang yang telah kita pelajari dapat divisualisasikan sebagai serangkaian lingkaran konsentris. **Lapangan** adalah lingkaran terdalam dan paling 'spesial', diikuti oleh **Daerah Euclid**, **DIU**, **DFT**, **Daerah Integral**, dan **Gelanggang Komutatif** sebagai lingkaran terluar.
> 
> #### Contoh Soal
> 
> 1. **Soal Identifikasi:** Manakah dari himpunan berikut yang merupakan lapangan: `ℤ`, `ℚ`, `ℝ`, `ℂ`, `ℤ₆`, dan `ℤ₇`?
>     - **Jawaban:**
>         - `ℚ`, `ℝ`, `ℂ` adalah lapangan.
>         - `ℤ₇` adalah lapangan karena 7 adalah bilangan prima.
>         - `ℤ` bukan lapangan karena tidak semua elemennya punya invers perkalian (misal, invers dari 2 adalah 1/2, bukan bilangan bulat).
>         - `ℤ₆` bukan lapangan karena ia bahkan bukan daerah integral (memiliki pembagi nol).
> 2. **Soal Invers:** Di lapangan `ℤ₅`, tentukan invers perkalian dari setiap elemen tak-nol.
>     - **Jawaban:** Kita cari `x` sehingga `a ⋅ x ≡ 1 mod 5`.
>         - Invers dari `[1]` adalah `[1]` (`1⋅1=1`).
>         - Invers dari `[2]` adalah `[3]` (`2⋅3=6≡1`).
>         - Invers dari `[3]` adalah `[2]` (`3⋅2=6≡1`).
>         - Invers dari `[4]` adalah `[4]` (`4⋅4=16≡1`).
> 3. **Soal Konseptual:** Mengapa keberadaan invers perkalian untuk setiap elemen tak-nol secara otomatis menghilangkan pembagi nol?
>     - **Jawaban:** Misalkan kita punya persamaan `a ⋅ b = 0` di sebuah lapangan, dengan `a ≠ 0`. Karena `a ≠ 0`, maka inversnya, `a⁻¹`, ada. Kita bisa kalikan kedua sisi dengan `a⁻¹`: `a⁻¹ ⋅ (a ⋅ b) = a⁻¹ ⋅ 0` `(a⁻¹ ⋅ a) ⋅ b = 0` `1 ⋅ b = 0` `b = 0` Ini membuktikan bahwa jika `a` tidak nol, maka `b` _harus_ nol. Jadi, tidak mungkin ada dua elemen tak-nol yang hasil kalinya nol.

