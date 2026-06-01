---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[MA2022 Struktur Bilangan Bulat]]

> [!cornell] Relasi Ekuivalen
> 
> > ## Questions/Cues
> > 
> > - Definisi Relasi Ekuivalen
> > - Tiga Sifat Kunci
> > - Contoh: Kongruensi Modulo
> > - Kelas Ekuivalen
> > - Partisi Himpunan
> > - Teorema Fundamental
> > - Hubungan dengan Struktur Lain
> 
> > 
> > ### Definisi Relasi Ekuivalen
> > 
> > Sebuah relasi, yang biasa dinotasikan dengan tilde (~), pada sebuah himpunan tak kosong A disebut sebagai **relasi ekuivalen** jika ia memenuhi tiga sifat fundamental. Secara intuitif, relasi ini digunakan untuk mengelompokkan elemen-elemen yang memiliki "kesamaan" atau "kesetaraan" tertentu.
> > 
> > ### Tiga Sifat Kunci
> > 
> > Agar sebuah relasi dapat disebut ekuivalen, ia **wajib** memenuhi ketiga sifat berikut:
> > 
> > 1. **Refleksif:** Setiap elemen berhubungan dengan dirinya sendiri.
> >     - _Formal:_ Untuk setiap `a` dalam himpunan A, berlaku `a ~ a`.
> >     - _Analogi:_ Setiap orang adalah "kerabat" dari dirinya sendiri.
> > 2. **Simetris:** Jika `a` berhubungan dengan `b`, maka `b` juga harus berhubungan dengan `a`.
> >     - _Formal:_ Jika `a ~ b`, maka harus berlaku `b ~ a`.
> >     - _Analogi:_ Jika A adalah kerabat B, maka B juga kerabat A. Hubungannya dua arah.
> > 3. **Transitif:** Jika `a` berhubungan dengan `b`, dan `b` berhubungan dengan `c`, maka `a` harus berhubungan dengan `c`.
> >     - _Formal:_ Jika `a ~ b` dan `b ~ c`, maka harus berlaku `a ~ c`.
> >     - _Analogi:_ Jika A kerabat B, dan B kerabat C, maka A juga kerabat C. Sifat ini menciptakan rantai hubungan.
> > 
> > ### Contoh Utama: Kongruensi Modulo n
> > 
> > Ini adalah contoh paling fundamental dari relasi ekuivalen dalam teori bilangan.
> > 
> > - **Definisi:** Dua bilangan bulat `a` dan `b` dikatakan kongruen modulo `n` (ditulis `a ≡ b mod n`) jika `n` habis membagi selisih `(a-b)`.
> > - **Pembuktian sebagai Relasi Ekuivalen:** Telah terbukti bahwa kongruensi modulo n adalah sebuah relasi ekuivalen.
> >     - **Refleksif:** Untuk setiap `a`, `a - a = 0`. Karena `n` selalu habis membagi 0, maka `a ≡ a mod n`.
> >     - **Simetris:** Jika `a ≡ b mod n`, artinya `n | (a-b)`. Ini berarti `n` juga habis membagi `(b-a)`, maka `b ≡ a mod n`.
> >     - **Transitif:** Jika `a ≡ b mod n` dan `b ≡ c mod n`, artinya `n | (a-b)` dan `n | (b-c)`. Berdasarkan sifat keterbagian, `n` juga harus habis membagi jumlahan keduanya: `n | (a-b) + (b-c)`, yang menyederhanakan menjadi `n | (a-c)`. Maka, `a ≡ c mod n`.
> > 
> > ### Kelas Ekuivalen ([a] atau ā)
> > 
> > Jika `~` adalah relasi ekuivalen pada himpunan A, maka **kelas ekuivalen** dari elemen `a` (ditulis `[a]`) adalah himpunan semua elemen di A yang berhubungan dengan `a`.
> > 
> > - _Formal:_ `[a] = {x ∈ A | x ~ a}`.
> > - **Karakteristik Penting:**
> >     1. Semua elemen dalam satu kelas ekuivalen berhubungan satu sama lain. Mereka seperti satu "keluarga".
> >     2. Setiap elemen di himpunan A pasti termasuk dalam **tepat satu** kelas ekuivalen.
> >     3. Dua kelas ekuivalen `[a]` dan `[b]` akan **identik** (`[a] = [b]`) jika `a ~ b`, atau akan **saling lepas/tidak beririsan** (`[a] ∩ [b] = ∅`) jika `a` tidak berhubungan dengan `b`.
> >     4. Setiap elemen dalam sebuah kelas dapat bertindak sebagai **representatif** dari kelas tersebut.
> > 
> > ### Partisi Himpunan
> > 
> > - Sebuah **partisi** dari himpunan S adalah koleksi subhimpunan-subhimpunan dari S yang tidak kosong, saling lepas (pairwise disjoint), dan gabungannya adalah S itu sendiri.
> > - _Analogi:_ Memotong sebuah kue menjadi beberapa potong. Setiap potongan adalah bagian dari kue (subhimpunan), tidak ada potongan yang tumpang tindih (saling lepas), dan semua potongan jika digabung akan membentuk kue utuh (gabungan).
> > 
> > ### Teorema Fundamental Relasi Ekuivalen
> > 
> > Teorema ini adalah jembatan yang menghubungkan ide relasi ekuivalen dan partisi.
> > 
> > - **Pernyataan 1:** Setiap relasi ekuivalen pada sebuah himpunan akan mempartisi himpunan tersebut menjadi kelas-kelas ekuivalennya.
> > - **Pernyataan 2:** Sebaliknya, setiap partisi pada sebuah himpunan akan secara alami mendefinisikan sebuah relasi ekuivalen (di mana dua elemen dianggap berhubungan jika mereka berada di bagian partisi yang sama).

> [!cornell] #### Summary
> Relasi ekuivalen adalah sebuah aturan matematis yang mengelompokkan elemen-elemen dalam sebuah himpunan berdasarkan tiga sifat ketat: refleksif, simetris, dan transitif. Konsep ini secara fundamental melahirkan gagasan tentang "kelas ekuivalen", yaitu keluarga elemen-elemen yang saling berhubungan. Teorema Fundamental menyatakan bahwa kumpulan semua kelas ekuivalen ini secara sempurna mempartisi (memecah tanpa tumpang tindih) himpunan aslinya, menunjukkan hubungan dua arah yang mendalam antara "menghubungkan" (relasi) dan "mengelompokkan" (partisi).

> [!ad-libitum]- Contoh Soal dan Pembahasan
> 
> #### Soal 1: Relasi pada Bilangan Bulat
> 
> > Soal:
> > 
> > Tunjukkan bahwa relasi ~ pada himpunan bilangan bulat ℤ yang didefinisikan oleh m ~ n ⇔ m + n adalah bilangan genap, merupakan sebuah relasi ekuivalen. Kemudian, tentukan kelas-kelas ekuivalennya.
> > 
> > Pembahasan:
> > 
> > Kita harus memeriksa tiga sifat:
> > 
> > 1. **Refleksif:** Ambil sembarang `m ∈ ℤ`. Perhatikan bahwa `m + m = 2m`. Karena `2m` selalu merupakan kelipatan 2, maka `m + m` adalah bilangan genap. Dengan demikian, `m ~ m` berlaku untuk semua `m`. Sifat refleksif **terpenuhi**.
> > 2. **Simetris:** Asumsikan `m ~ n` berlaku. Ini berarti `m + n` adalah bilangan genap. Karena operasi penjumlahan bersifat komutatif, `n + m = m + n`. Jadi, `n + m` juga pasti genap. Dengan demikian, `n ~ m` juga berlaku. Sifat simetris **terpenuhi**.
> > 3. **Transitif:** Asumsikan `m ~ n` dan `n ~ p` berlaku. Ini berarti `m + n` adalah genap dan `n + p` adalah genap. Kita bisa tulis `m + n = 2k` dan `n + p = 2j` untuk suatu bilangan bulat `k` dan `j`. Jika kita jumlahkan kedua persamaan: `(m + n) + (n + p) = 2k + 2j`, yang menjadi `m + 2n + p = 2(k + j)`. Dengan mengatur ulang, kita dapatkan `m + p = 2(k + j) - 2n = 2(k + j - n)`. Karena `(k + j - n)` adalah bilangan bulat, maka `m + p` adalah bilangan genap. Dengan demikian, `m ~ p`. Sifat transitif **terpenuhi**.
> > 
> > **Kesimpulan:** Karena ketiga sifat terpenuhi, relasi ini adalah relasi ekuivalen.
> > 
> > **Kelas-Kelas Ekuivalen:**
> > 
> > - **Kelas 1:** Mari kita lihat kelas ekuivalen dari 0, yaitu `[0]`. `0 ~ n` jika `0 + n` genap, yang berarti `n` harus genap. Jadi, `[0]` adalah himpunan semua bilangan bulat genap: `{..., -4, -2, 0, 2, 4, ...}`.
> > - **Kelas 2:** Sekarang kita lihat kelas ekuivalen dari 1, yaitu `[1]`. `1 ~ n` jika `1 + n` genap, yang berarti `n` harus ganjil. Jadi, `[1]` adalah himpunan semua bilangan bulat ganjil: `{..., -3, -1, 1, 3, 5, ...}`.
> > - Karena setiap bilangan bulat pasti genap atau ganjil, hanya ada **dua** kelas ekuivalen yang mempartisi `ℤ`: himpunan bilangan genap dan himpunan bilangan ganjil.
> 
> #### Soal 2: Interpretasi Geometris
> 
> > Soal:
> > 
> > Pada himpunan titik di bidang Kartesius ℝ x ℝ, sebuah relasi ~ didefinisikan sebagai (x₁, y₁) ~ (x₂, y₂) ⇔ y₁ - x₁² = y₂ - x₂². Tentukan apakah ini relasi ekuivalen dan deskripsikan kelas ekuivalennya secara geometris.
> > 
> > Pembahasan:
> > 
> > Kita periksa tiga sifat:
> > 
> > 1. **Refleksif:** Untuk sembarang titik `(a, b)`, berlaku `b - a² = b - a²`. Jadi, `(a, b) ~ (a, b)`. Sifat refleksif **terpenuhi**.
> > 2. **Simetris:** Asumsikan `(x₁, y₁) ~ (x₂, y₂)`. Ini berarti `y₁ - x₁² = y₂ - x₂²`. Dengan menggunakan sifat simetri dari kesamaan, kita bisa langsung menyatakan `y₂ - x₂² = y₁ - x₁²`, yang berarti `(x₂, y₂) ~ (x₁, y₁)`. Sifat simetris **terpenuhi**.
> > 3. **Transitif:** Asumsikan `(x₁, y₁) ~ (x₂, y₂)` dan `(x₂, y₂) ~ (x₃, y₃)`. Ini berarti `y₁ - x₁² = y₂ - x₂²` dan `y₂ - x₂² = y₃ - x₃²`. Dengan sifat transitif dari kesamaan, kita dapat simpulkan `y₁ - x₁² = y₃ - x₃²`. Ini berarti `(x₁, y₁) ~ (x₃, y₃)`. Sifat transitif **terpenuhi**.
> > 
> > **Kesimpulan:** Relasi ini adalah relasi ekuivalen.
> > 
> > **Deskripsi Geometris Kelas Ekuivalen:**
> > 
> > - Sebuah kelas ekuivalen adalah himpunan semua titik `(x, y)` yang nilai `y - x²`-nya sama. Misalkan nilai ini adalah konstanta `k`.
> > - Maka, semua titik dalam satu kelas ekuivalen memenuhi persamaan `y - x² = k`.
> > - Persamaan ini dapat ditulis ulang sebagai **`y = x² + k`**.
> > - Ini adalah persamaan untuk sebuah **parabola** yang terbuka ke atas dengan titik puncak di `(0, k)`.
> > - Jadi, setiap kelas ekuivalen adalah sebuah parabola vertikal. Semua titik yang terletak pada parabola yang sama dianggap "ekuivalen" oleh relasi ini.


> [!ad-libitum]- Additional Information (Optional)
> 
> #### Aspek Teknis Lanjutan
> 
> - **Matriks Insidensi (Incidence Matrix):** Sebuah relasi dapat direpresentasikan sebagai matriks biner (0 dan 1). Jika sebuah relasi adalah relasi ekuivalen, maka baris dan kolom matriks insidensinya dapat diatur ulang sedemikian rupa sehingga membentuk blok-blok submatriks berisi angka '1' di sepanjang diagonal utama. Blok-blok ini secara visual merepresentasikan kelas-kelas ekuivalen.
> - **Well-Defined Operations:** Konsep kelas ekuivalen sangat penting saat mendefinisikan operasi pada himpunan baru seperti `ℤn`. Ketika kita mendefinisikan `[a] + [b] = [a+b]`, kita harus yakin bahwa hasilnya tidak bergantung pada representatif `a` atau `b` yang kita pilih. Relasi ekuivalen memastikan operasi ini "well-defined" (terdefinisi dengan baik).
> 
> #### Sumber & Referensi Lanjutan
> 
> - Konsep ini adalah fondasi untuk membangun struktur aljabar seperti **Grup, Gelanggang, dan Lapangan**. Himpunan kelas-kelas residu modulo n, `ℤn`, adalah contoh pertama dan terpenting dari struktur Gelanggang hingga (finite ring).
> 
> #### Eksplorasi Mandiri
> 
> - Coba buktikan bahwa relasi "memiliki nama belakang yang sama" pada sekelompok orang adalah relasi ekuivalen. Apa sajakah kelas-kelas ekuivalennya?
> - Misalkan relasi `~` pada bidang Kartesius (`ℝ x ℝ`) didefinisikan sebagai `(x1, y1) ~ (x2, y2)` jika `x1² + y1² = x2² + y2²`. Buktikan ini relasi ekuivalen dan deskripsikan secara geometris seperti apa bentuk kelas ekuivalennya. (Petunjuk: Pikirkan tentang lingkaran dengan pusat di (0,0)).