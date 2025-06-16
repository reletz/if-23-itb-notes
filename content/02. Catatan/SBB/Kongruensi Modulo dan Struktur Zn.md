---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[SBB]]

> [!cornell] Kongruensi Modulo dan Struktur Zn
> 
> > ## Questions/Cues
> > 
> > - Definisi Kongruensi Modulo
> > - Kongruensi sebagai Relasi Ekuivalen
> > - Kelas Residu Modulo n
> > - Definisi Himpunan `Zn`
> > - Operasi pada `Zn`
> > - Sifat "Well-Defined"
> > - Struktur Aljabar `Zn`
> 
> > ### Definisi Kongruensi Modulo
> > 
> > Dua bilangan bulat `a` dan `b` dikatakan **kongruen modulo n** (ditulis `a ≡ b mod n`) jika dan hanya jika `n` habis membagi selisih `(a - b)`.
> > 
> > - _Contoh Praktis:_ `17 ≡ 2 mod 5` karena `17 - 2 = 15`, dan 15 habis dibagi 5. Ini berarti 17 dan 2 memiliki sisa yang sama ketika dibagi 5.
> > 
> > ### Kongruensi sebagai Relasi Ekuivalen
> > 
> > Relasi kongruensi modulo `n` adalah contoh utama dari sebuah relasi ekuivalen karena ia memenuhi ketiga sifat yang diperlukan:
> > 
> > 1. **Refleksif:** `a ≡ a mod n`
> > 2. **Simetris:** Jika `a ≡ b mod n`, maka `b ≡ a mod n`
> > 3. **Transitif:** Jika `a ≡ b mod n` dan `b ≡ c mod n`, maka `a ≡ c mod n`
> > 
> > ### Kelas Residu Modulo n
> > 
> > Karena kongruensi adalah relasi ekuivalen, ia mempartisi himpunan bilangan bulat `ℤ` menjadi beberapa kelompok yang disebut **kelas ekuivalen** atau **kelas residu**.
> > 
> > - Kelas residu dari `a`, ditulis `[a]` atau `ā`, adalah himpunan semua bilangan bulat yang kongruen dengan `a` modulo `n`.
> > - _Contoh (mod 4):_
> >     - `[0] = {..., -8, -4, 0, 4, 8, ...}` (semua bilangan yang habis dibagi 4)
> >     - `[1] = {..., -7, -3, 1, 5, 9, ...}` (semua bilangan yang bersisa 1 jika dibagi 4)
> > 
> > ### Definisi Himpunan `Zn`
> > 
> > Himpunan `ℤn` (dibaca "Z n") adalah **himpunan dari semua kelas residu modulo n**.
> > 
> > - Himpunan ini memiliki tepat `n` anggota.
> > - _Formal:_ `ℤn = {[0], [1], [2], ..., [n-1]}`.
> > - _Penyederhanaan Notasi:_ Dalam praktiknya, `ℤn` sering ditulis sebagai `{0, 1, 2, ..., n-1}`. Namun, sangat penting untuk diingat bahwa setiap angka di sini sebenarnya **mewakili seluruh kelas residu**.
> > 
> > ### Operasi pada `Zn`
> > 
> > Kita dapat mendefinisikan operasi penjumlahan dan perkalian pada elemen-elemen `ℤn`:
> > 
> > - **Penjumlahan:** `[a] + [b] = [a + b]`
> > - **Perkalian:** `[a] ⋅ [b] = [a ⋅ b]`
> > - _Contoh di `ℤ₆`_:
> >     - `[4] + [5] = [4 + 5] = [9]`. Karena `9 ≡ 3 mod 6`, maka `[9] = [3]`. Jadi, `[4] + [5] = [3]`.
> >     - `[4] ⋅ [5] = [4 ⋅ 5] = [20]`. Karena `20 ≡ 2 mod 6`, maka `[20] = [2]`. Jadi, `[4] ⋅ [5] = [2]`.
> > 
> > ### Sifat "Well-Defined"
> > 
> > Sifat ini krusial untuk operasi di `ℤn`. Artinya, hasil operasi tidak akan berubah meskipun kita menggunakan perwakilan (representatif) yang berbeda dari kelas yang sama.
> > 
> > - _Contoh di `ℤ₆`_: Kita tahu `[4] = [10]` dan `[5] = [-1]`.
> >     - Operasi `[10] + [-1] = [9] = [3]`. Hasilnya sama dengan `[4] + [5]`.
> > - Ini membuktikan bahwa operasi tersebut konsisten dan terdefinisi dengan baik (well-defined).
> > 
> > ### Struktur Aljabar `Zn`
> > 
> > Dengan operasi penjumlahan dan perkalian yang telah didefinisikan, `ℤn` membentuk sebuah struktur aljabar yang penting:
> > 
> > 1. `(ℤn, +)`: Himpunan `ℤn` dengan operasi penjumlahan membentuk sebuah **Grup Komutatif** (memiliki asosiatif, identitas `[0]`, invers untuk setiap elemen, dan komutatif).
> > 2. `(ℤn, +, ⋅)`: Himpunan `ℤn` dengan kedua operasi membentuk sebuah **Gelanggang Komutatif dengan Elemen Satuan** (Commutative Ring with Unity), di mana elemen satuannya adalah `[1]`.

> [!cornell] #### Summary
> Kongruensi modulo n adalah sebuah relasi ekuivalen yang mempartisi himpunan bilangan bulat `ℤ` menjadi `n` himpunan bagian yang disebut kelas residu. Kumpulan dari semua kelas residu ini, yang dinamakan `ℤn`, dapat dilengkapi dengan operasi penjumlahan dan perkalian yang terdefinisi dengan baik (well-defined), sehingga membentuk sebuah struktur aljabar fundamental yang dikenal sebagai Gelanggang Komutatif.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Pembagi Nol (Zero Divisors)
> 
> - Salah satu sifat menarik dari `ℤn` adalah keberadaan **pembagi nol** jika `n` bukan bilangan prima. Pembagi nol adalah elemen tak-nol `[a]` dan `[b]` yang jika dikalikan hasilnya `[0]`.
> - _Contoh di `ℤ₆`_: `[2] ≠ [0]` dan `[3] ≠ [0]`, tetapi `[2] ⋅ [3] = [6] = [0]`. Jadi `[2]` dan `[3]` adalah pembagi nol.
> 
> #### `Zn` sebagai Lapangan (Field)
> 
> - Struktur `ℤn` akan menjadi lebih "istimewa", yaitu menjadi sebuah **Lapangan (Field)**, jika dan hanya jika `n` adalah sebuah **bilangan prima**. Dalam lapangan, setiap elemen tak-nol memiliki invers perkalian, dan tidak ada pembagi nol.
> 
> #### Aplikasi
> 
> - Aritmetika modular dan struktur `ℤn` adalah tulang punggung dari banyak aplikasi modern, termasuk **kriptografi** (seperti pada algoritma RSA), **teori kode** (untuk deteksi dan koreksi kesalahan), dan **generasi bilangan acak** pada komputer.