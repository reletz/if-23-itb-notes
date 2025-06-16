---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[SBB]]

> [!cornell] Fungsi Euler-Phi
> 
> > ## Questions/Cues
> > 
> > - Himpunan Unit `Un`
> > - Definisi Fungsi Euler-Phi `φ(n)`
> > - Teorema Euler
> > - Sifat Multiplikatif `φ(n)`
> > - Formula Perhitungan `φ(n)`
> 
> > ### Himpunan Unit `Un`
> > 
> > Himpunan **Unit** pada `ℤn`, yang dinotasikan sebagai `Un`, adalah himpunan semua kelas residu `[a]` di `ℤn` yang memiliki invers perkalian.
> > 
> > - Sebuah elemen `[a]` memiliki invers perkalian jika dan hanya jika `a` relatif prima terhadap `n`, atau `(a, n) = 1`.
> > - _Formal:_ `Un = {[a] ∈ ℤn | (a, n) = 1}`.
> > - Himpunan `(Un, ⋅)` dengan operasi perkalian modulo n membentuk sebuah **Grup Komutatif**, yang sering disebut **Grup Unit dari `ℤn`**.
> > 
> > ### Definisi Fungsi Euler-Phi `φ(n)`
> > 
> > **Fungsi Euler-Phi** (atau Fungsi Totient Euler), dinotasikan sebagai `φ(n)`, didefinisikan sebagai banyaknya anggota dalam himpunan `Un`.
> > 
> > - _Formal:_ `φ(n) = |Un|`.
> > - _Makna Praktis:_ `φ(n)` menghitung banyaknya bilangan bulat positif dari 1 hingga `n` yang relatif prima terhadap `n`.
> > - _Contoh:_ Untuk `n = 10`, bilangan yang relatif prima adalah `{1, 3, 7, 9}`. Ada 4 bilangan, maka `φ(10) = 4`.
> > 
> > ### Teorema Euler
> > 
> > Ini adalah salah satu teorema paling penting dalam teori bilangan elementer dan merupakan generalisasi dari Teorema Kecil Fermat.
> > 
> > - **Pernyataan:** Jika `a` adalah bilangan bulat yang relatif prima terhadap `n` (yaitu, `(a, n) = 1`), maka: `a^φ(n) ≡ 1 mod n`
> > - Teorema ini sangat berguna untuk menyederhanakan perpangkatan dalam aritmetika modular.
> > 
> > ### Sifat Multiplikatif `φ(n)`
> > 
> > Fungsi Euler-Phi bersifat **multiplikatif**. Artinya, jika dua bilangan `m` dan `n` saling relatif prima, maka `φ` dari perkaliannya adalah perkalian dari `φ` masing-masing.
> > 
> > - **Pernyataan:** Jika `(m, n) = 1`, maka `φ(mn) = φ(m)φ(n)`.
> > - Sifat ini adalah kunci untuk menurunkan formula umum perhitungan `φ(n)`.
> > - _Contoh:_ `φ(10) = φ(2 ⋅ 5)`. Karena `(2, 5) = 1`, maka `φ(10) = φ(2) ⋅ φ(5) = 1 ⋅ 4 = 4`.
> > 
> > ### Formula Perhitungan `φ(n)`
> > 
> > Untuk menghitung `φ(n)` secara efisien, kita gunakan faktorisasi prima dari `n`.
> > 
> > - Misalkan faktorisasi prima dari `n` adalah `n = p₁^k₁ ⋅ p₂^k₂ ⋅ ... ⋅ pᵣ^kᵣ`.
> > - **Formula 1:** `φ(n) = n ⋅ (1 - 1/p₁) ⋅ (1 - 1/p₂) ⋅ ... ⋅ (1 - 1/pᵣ)`.
> > - **Formula 2 (alternatif):** $φ(n) = (p₁^{k₁} - p₁^{(k₁-1)}) ⋅ (p₂^{k₂} - p₂^{(k₂-1)}) ⋅ ...$
> > - _Contoh:_ Hitung `φ(36)`
> >     - Faktorisasi: `36 = 4 ⋅ 9 = 2² ⋅ 3²`.
> >     - Menggunakan Formula 1: `φ(36) = 36 ⋅ (1 - 1/2) ⋅ (1 - 1/3) = 36 ⋅ (1/2) ⋅ (2/3) = 12`.

> [!cornell] #### Summary
> Fungsi Euler-Phi, `φ(n)`, menghitung banyaknya bilangan bulat positif yang kurang dari atau sama dengan `n` dan relatif prima terhadap `n`. Fungsi ini bersifat multiplikatif, yang memungkinkan adanya formula perhitungan umum berdasarkan faktorisasi prima. `φ(n)` adalah inti dari Teorema Euler (`a^φ(n) ≡ 1 mod n`), sebuah hasil fundamental dalam teori bilangan yang memiliki aplikasi luas, terutama dalam bidang kriptografi.

> [!ad-libitum]- Contoh Soal dan Pembahasan
> 
> #### Soal 1: Perhitungan Dasar
> 
> > **Soal:** Hitung nilai `φ(7)` dan `φ(12)`.
> > 
> > **Pembahasan:**
> > 
> > - **Untuk `φ(7)`:** Karena 7 adalah bilangan prima, semua bilangan dari 1 hingga 6 relatif prima terhadap 7. Bilangan-bilangan tersebut adalah `{1, 2, 3, 4, 5, 6}`. Jadi, `φ(7) = 6`. Secara umum, jika `p` adalah prima, `φ(p) = p - 1`.
> > - **Untuk `φ(12)`:** Kita cari bilangan dari 1 hingga 12 yang `(a, 12) = 1`. Bilangan-bilangan tersebut adalah `{1, 5, 7, 11}`. Ada 4 bilangan, jadi `φ(12) = 4`.
> 
> #### Soal 2: Menggunakan Formula
> 
> > **Soal:** Gunakan formula untuk menghitung `φ(90)`.
> > 
> > **Pembahasan:**
> > 
> > 1. **Faktorisasi Prima:** `90 = 9 ⋅ 10 = (3²) ⋅ (2 ⋅ 5) = 2¹ ⋅ 3² ⋅ 5¹`.
> > 2. **Gunakan Sifat Multiplikatif:** Karena 2, 9, dan 5 saling relatif prima, kita bisa hitung `φ(90) = φ(2) ⋅ φ(9) ⋅ φ(5)`.
> >     - `φ(2) = 2 - 1 = 1`.
> >     - `φ(9) = φ(3²) = 3² - 3¹ = 9 - 3 = 6`.
> >     - `φ(5) = 5 - 1 = 4`.
> > 3. **Hasil Akhir:** `φ(90) = 1 ⋅ 6 ⋅ 4 = 24`. _Atau langsung dengan formula:_ `φ(90) = 90 ⋅ (1 - 1/2) ⋅ (1 - 1/3) ⋅ (1 - 1/5) = 90 ⋅ (1/2) ⋅ (2/3) ⋅ (4/5) = 24`.
> 
> #### Soal 3: Aplikasi Teorema Euler
> 
> > **Soal:** Tentukan digit terakhir dari `7^2025`.
> > 
> > **Pembahasan:**
> > 
> > 4. **Tujuan:** Mencari digit terakhir sama dengan menghitung nilai `7^2025 mod 10`.
> > 5. **Gunakan Teorema Euler:** Kita perlu `φ(10)`. Seperti di contoh awal, `φ(10) = 4`.
> > 6. **Periksa Syarat:** Syarat Teorema Euler adalah `(a, n) = 1`. Di sini, `(7, 10) = 1`, jadi syarat terpenuhi.
> > 7. **Aplikasikan Teorema:** Menurut Teorema Euler, `7^φ(10) ≡ 7⁴ ≡ 1 mod 10`.
> > 8. **Sederhanakan Pangkat:** Kita bagi pangkat `2025` dengan `4`.
> >     - `2025 = 4 ⋅ 506 + 1`.
> > 6. **Substitusi:** `7^2025 = 7^(4 ⋅ 506 + 1) = (7⁴)^506 ⋅ 7¹` `mod 10`, ini menjadi: `≡ (1)^506 ⋅ 7¹ mod 10` `≡ 1 ⋅ 7 mod 10` `≡ 7 mod 10`
> > 
> > **Kesimpulan:** Digit terakhir dari `7^2025` adalah **7**.