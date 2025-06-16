---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[SBB]]

> [!cornell] Homomorfisma & Isomorfisma Gelanggang
> 
> > ## Questions/Cues
> > 
> > - Definisi Homomorfisma
> > - Sifat Mengawetkan Struktur
> > - Definisi Isomorfisma
> > - Makna "Isomorfik"
> > - Contoh: Peta Modulo n
> 
> > ### Definisi Homomorfisma Gelanggang
> > 
> > Sebuah **Homomorfisma Gelanggang** adalah sebuah fungsi atau "peta" (`f`) dari sebuah gelanggang `(R₁, +, ⋅)` ke gelanggang lain `(R₂, +, ⋅)` yang menjaga (mengawetkan) struktur dari kedua operasi.
> > 
> > Sebuah fungsi `f: R₁ → R₂` adalah homomorfisma jika untuk setiap `a, b ∈ R₁` berlaku:
> > 
> > 1. **Mengawetkan Penjumlahan:** `f(a + b) = f(a) + f(b)`.
> > 2. **Mengawetkan Perkalian:** `f(a ⋅ b) = f(a) ⋅ f(b)`.
> > 
> > - **Syarat Tambahan:** Jika `R₁` dan `R₂` adalah gelanggang dengan elemen satuan, maka homomorfisma juga harus memetakan elemen satuan ke elemen satuan: `f(1_R₁) = 1_R₂`.
> > 
> > ### Sifat Mengawetkan Struktur
> > 
> > Secara intuitif, homomorfisma berarti "melakukan operasi di gelanggang asal lalu memetakannya sama dengan memetakan elemen-elemennya terlebih dahulu lalu melakukan operasi di gelanggang tujuan". Ini menunjukkan adanya hubungan struktural yang mendasar antara kedua gelanggang tersebut.
> > 
> > ### Definisi Isomorfisma Gelanggang
> > 
> > Sebuah **Isomorfisma Gelanggang** adalah sebuah homomorfisma yang juga bersifat **bijektif** (yaitu, satu-satu dan pada). Ini adalah jenis pemetaan antar gelanggang yang paling kuat.
> > 
> > ### Makna "Isomorfik" `(≅)`
> > 
> > Jika terdapat sebuah isomorfisma antara gelanggang `R₁` dan `R₂`, kita katakan bahwa `R₁` **isomorfik** dengan `R₂` (ditulis `R₁ ≅ R₂`).
> > 
> > - _Artinya:_ Kedua gelanggang tersebut secara esensial **identik secara struktural**. Meskipun nama elemen dan operasinya mungkin terlihat berbeda, "aturan main" aljabarnya persis sama. Satu gelanggang bisa dianggap sebagai "versi ganti nama" dari yang lain.
> > 
> > ### Contoh: Peta Modulo n dan Gelanggang Kuosien
> > 
> > - **Peta Modulo:** Fungsi `f: ℤ → ℤₙ` yang didefinisikan oleh `f(a) = [a]` (kelas residu `a` modulo `n`) adalah sebuah contoh klasik dari homomorfisma gelanggang.
> > - **Teorema Isomorfisma:** Konsep ini mengarah pada salah satu teorema paling fundamental dalam teori gelanggang, yaitu bahwa **gelanggang kuosien** `ℤ/nℤ` (di mana `nℤ` adalah sebuah ideal dari `ℤ`) adalah isomorfik dengan `ℤₙ`. Ini secara formal menunjukkan bahwa `ℤₙ` adalah hasil dari "pembagian" `ℤ` oleh ideal `nℤ`.

> [!cornell] #### Summary
> Sebuah Homomorfisma Gelanggang adalah fungsi antar gelanggang yang mengawetkan operasi penjumlahan dan perkalian. Jika homomorfisma tersebut juga bijektif, ia disebut Isomorfisma, yang menandakan bahwa kedua gelanggang secara struktural identik. Konsep ini sangat penting untuk memahami hubungan dan kemiripan antar gelanggang, dengan contoh kunci adalah isomorfisma antara gelanggang kuosien `ℤ/nℤ` dan gelanggang `ℤₙ`.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Kernel Homomorfisma:** **Kernel** dari sebuah homomorfisma `f: R₁ → R₂`, ditulis `Ker(f)`, adalah himpunan semua elemen di `R₁` yang dipetakan ke elemen nol di `R₂`. `Ker(f) = {a ∈ R₁ | f(a) = 0_R₂}`.
> - **Hubungan Kernel dan Ideal:** Kernel dari sebuah homomorfisma gelanggang **selalu merupakan sebuah ideal** dari gelanggang domain `R₁`. Ini adalah jembatan konseptual yang sangat penting antara homomorfisma dan ideal.
> 
> #### Contoh Soal
> 
> 1. **Soal Verifikasi Homomorfisma:** Tunjukkan bahwa peta `f: ℤ → ℤ` yang didefinisikan oleh `f(x) = 2x` **bukan** merupakan homomorfisma gelanggang.
>     - **Jawaban:** Kita periksa kedua syarat.
>         1. **Penjumlahan:** `f(x+y) = 2(x+y) = 2x + 2y = f(x) + f(y)`. Syarat penjumlahan terpenuhi.
>         2. **Perkalian:** `f(x⋅y) = 2(xy)`. Sedangkan `f(x)⋅f(y) = (2x)(2y) = 4xy`. Karena `2xy ≠ 4xy`, syarat perkalian tidak terpenuhi. Jadi, `f` bukan homomorfisma gelanggang.
> 2. **Soal Konseptual Isomorfisma:** Apakah gelanggang `ℤ` dan `2ℤ` isomorfik?
>     - **Jawaban:** Tidak. Gelanggang `ℤ` memiliki elemen satuan (yaitu `1`), sedangkan gelanggang `2ℤ` (himpunan bilangan genap) tidak memiliki elemen satuan. Karena isomorfisma harus mempertahankan semua properti struktural, termasuk keberadaan elemen satuan, maka kedua gelanggang ini tidak isomorfik.
> 3. **Soal Kernel:** Tentukan Kernel dari homomorfisma `f: ℤ → ℤ₄` yang didefinisikan oleh `f(a) = [a] mod 4`.
>     - **Jawaban:** Kernel adalah himpunan semua `a ∈ ℤ` yang dipetakan ke `[0]` di `ℤ₄`. `f(a) = [a] = [0]` jika dan hanya jika `a` adalah kelipatan dari 4.
>     - Jadi, `Ker(f) = {..., -8, -4, 0, 4, 8, ...}` yang tidak lain adalah ideal `4ℤ`.