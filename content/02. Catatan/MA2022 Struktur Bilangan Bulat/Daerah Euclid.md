---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Daerah Euclid (Euclidean Domain)
> 
> > ## Questions/Cues
> > 
> > - Definisi Daerah Euclid
> > - Syarat Kunci: Algoritma Pembagian
> > - Fungsi Euklides `δ`
> > - Contoh Daerah Euclid
> > - Hubungan dengan DIU (PID)
> 
> > ### Definisi Daerah Euclid
> > 
> > Sebuah **Daerah Euclid** adalah jenis Daerah Integral yang lebih spesifik, di mana konsep **pembagian bersisa** yang kita kenal dari bilangan bulat dijamin dapat dilakukan.
> > 
> > Secara formal, sebuah daerah integral `D` disebut Daerah Euclid jika terdapat sebuah fungsi `δ` (disebut fungsi Euklides) dari elemen tak-nol `D` ke himpunan bilangan asli, yang memenuhi dua syarat.
> > 
> > ### Syarat Kunci: Algoritma Pembagian
> > 
> > Ini adalah properti inti dari Daerah Euclid. Dengan adanya fungsi Euklides `δ`, maka untuk setiap elemen `b` dan `a` (dengan `a ≠ 0`) di `D`, selalu dapat ditemukan elemen `q` (hasil bagi) dan `r` (sisa) sehingga:
> > 
> > `b = qa + r`
> > 
> > di mana salah satu dari dua kondisi ini terpenuhi:
> > 
> > 1. Sisa `r = 0`, atau
> > 2. "Ukuran" sisa lebih kecil dari "ukuran" pembagi, yaitu `δ(r) < δ(a)`.
> > 
> > ### Fungsi Euklides `δ`
> > 
> > Fungsi Euklides `δ` adalah pemetaan yang memberikan "ukuran" atau "norma" berupa bilangan asli kepada setiap elemen tak-nol dalam gelanggang. Selain syarat algoritma pembagian, fungsi ini juga harus memenuhi:
> > 
> > - `δ(a) ≤ δ(ab)` untuk setiap `a, b` tak-nol. Ini berarti "ukuran" sebuah elemen tidak akan menjadi lebih kecil setelah dikalikan dengan elemen tak-nol lain.
> > 
> > ### Contoh-contoh Daerah Euclid
> > 
> > - **`ℤ` (Bilangan Bulat):** Ini adalah contoh prototipe. Fungsi Euklidesnya adalah nilai absolut, `δ(x) = |x|`.
> > - **Setiap Lapangan (Field) `F`:** Sebuah lapangan selalu merupakan Daerah Euclid. Kita bisa definisikan `δ(x) = 1` untuk semua `x ≠ 0`. Algoritma pembagiannya menjadi `b = (ba⁻¹)a + 0`, dengan sisa selalu `0`.
> > - **`ℤ[i]` (Bilangan Bulat Gaussian):** Himpunan bilangan kompleks berbentuk `a+bi` di mana `a` dan `b` adalah bilangan bulat. Fungsi Euklidesnya adalah norm kuadrat, `δ(a+bi) = a² + b²`.
> > 
> > ### Hubungan Penting dengan DIU (Principal Ideal Domain)
> > 
> > Adanya algoritma pembagian adalah properti yang sangat kuat dan mengarah langsung pada teorema penting berikut:
> > 
> > - **Teorema:** Setiap **Daerah Euclid** adalah **Daerah Ideal Utama (DIU)**.
> > - _Intuisi Bukti:_ Untuk ideal `I` manapun, kita bisa pilih elemen tak-nol `d ∈ I` yang memiliki nilai `δ(d)` paling kecil. Dengan algoritma pembagian, kita bisa tunjukkan bahwa sisa dari pembagian elemen lain di `I` oleh `d` haruslah nol. Ini berarti semua elemen lain di `I` adalah kelipatan dari `d`, sehingga `I = <d>`.

> [!cornell] #### Summary
> Sebuah Daerah Euclid adalah daerah integral yang dilengkapi dengan algoritma pembagian, yang dijamin oleh adanya fungsi Euklides `δ`. Fungsi ini memungkinkan setiap pembagian `b` oleh `a` menghasilkan sisa `r` yang 'lebih kecil' (`δ(r) < δ(a)`) atau nol. Properti yang sangat kuat ini secara langsung membuktikan bahwa setiap Daerah Euclid juga merupakan Daerah Ideal Utama (DIU), karena elemen dengan nilai `δ` terkecil dalam sebuah ideal dapat membangkitkan ideal tersebut.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Hirarki yang Semakin Jelas:** Dengan ini, kita bisa melihat hirarki struktur yang semakin ketat: `Lapangan ⊂ Daerah Euclid ⊂ Daerah Ideal Utama ⊂ Daerah Integral`.
> - **Algoritma Euklides:** Karena Daerah Euclid memiliki algoritma pembagian, maka kita juga bisa menerapkan **Algoritma Euklides** untuk mencari Pembagi Bersama Terbesar (FPB/GCD) dari dua elemen manapun di dalamnya.
> 
> #### Contoh Soal
> 
> 1. **Soal Konseptual:** Mengapa properti algoritma pembagian sangat berguna dalam sebuah gelanggang?
>     - **Jawaban:** Properti ini memungkinkan kita untuk melakukan proses yang mirip dengan "long division" dan, yang lebih penting, menerapkan Algoritma Euklides. Algoritma Euklides adalah fondasi untuk menemukan FPB (GCD), yang selanjutnya digunakan untuk menyelesaikan persamaan Diophantine dan banyak masalah fundamental lainnya dalam teori bilangan dan aljabar.
> 2. **Soal Verifikasi di `ℤ`:** Di gelanggang `ℤ`, gunakan algoritma pembagian untuk `b = -35` dan `a = 8`. Tentukan `q` dan `r`.
>     - **Jawaban:** Kita ingin `-35 = q ⋅ 8 + r` dengan `0 ≤ r < 8`.
>         - `-35 = (-5) ⋅ 8 + 5`.
>         - Jadi, `q = -5` dan `r = 5`. Syarat `0 ≤ 5 < 8` terpenuhi.
> 3. **Soal Verifikasi di `ℤ[i]`:** Di gelanggang `ℤ[i]`, lakukan algoritma pembagian untuk `b = 7 - 2i` dan `a = 3 + i`. Tentukan `q` dan `r`.
>     - **Jawaban:**
>         
>         1. Bagi `b` dengan `a` di `ℂ`: `b/a = (7 - 2i) / (3 + i) = [(7 - 2i)(3 - i)] / [(3 + i)(3 - i)] = (21 - 7i - 6i + 2i²) / (9 - i²) = (19 - 13i) / 10 = 1.9 - 1.3i`.
>         2. Bulatkan ke bilangan bulat Gaussian terdekat: `q = 2 - i`.
>         3. Hitung sisa `r = b - qa`: `r = (7 - 2i) - [(2 - i)(3 + i)]` `r = (7 - 2i) - [6 + 2i - 3i - i²] = (7 - 2i) - [7 - i]` `r = 0 - i = -i`.
>         4. Periksa "ukuran" sisa: `δ(r) = δ(-i) = 0² + (-1)² = 1`. "Ukuran" pembagi: `δ(a) = δ(3+i) = 3² + 1² = 10`.
>         
>         - Karena `δ(r) < δ(a)` (yaitu, `1 < 10`), maka algoritma pembagian berhasil dengan `q = 2 - i` dan `r = -i`.