---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[SBB]]

> [!cornell] Daerah Ideal Utama (DIU/PID)
> 
> > ## Questions/Cues
> > 
> > - Definisi DIU/PID
> > - Syarat Kunci: Semua Ideal Utama
> > - Identitas Bezout Umum
> > - Prima vs. Irreducible
> > - Hubungan dengan DFT/UFD
> 
> > ### Definisi Daerah Ideal Utama (DIU/PID)
> > 
> > Sebuah **Daerah Ideal Utama** atau **Principal Ideal Domain (PID)** adalah jenis Daerah Integral yang memiliki satu sifat tambahan yang sangat kuat terkait dengan idealnya.
> > 
> > Secara formal, sebuah daerah integral `D` disebut Daerah Ideal Utama jika **setiap ideal** di dalam `D` merupakan sebuah **ideal utama**.
> > 
> > ### Syarat Kunci: Semua Ideal adalah `<d>`
> > 
> > Ini adalah inti dari definisi DIU. Artinya, tidak peduli seberapa rumit sebuah ideal `I` terlihat (misalnya, ideal yang dibangkitkan oleh banyak elemen seperti `<a, b, c>`), di dalam DIU, ideal tersebut selalu dapat disederhanakan dan dibangkitkan oleh **satu elemen tunggal** `d`. Jadi, `I = <d>`.
> > 
> > ### Identitas Bezout Umum (Generalized Bezout Identity)
> > 
> > Salah satu konsekuensi paling kuat dari sifat DIU adalah generalisasi dari Identitas Bezout yang kita kenal di bilangan bulat.
> > 
> > - **Teorema:** Di dalam sebuah DIU `D`, untuk setiap elemen `a` dan `b`, Pembagi Bersama Terbesar (FPB/GCD) dari keduanya, sebut saja `d`, selalu ada dan dapat diekspresikan sebagai kombinasi linear dari `a` dan `b`.
> > - _Formal:_ `d = (a, b)` dan `d = sa + tb` untuk suatu `s, t ∈ D`.
> > - _Intuisi Bukti:_ Ideal `<a, b>` karena berada di DIU, haruslah merupakan ideal utama, katakanlah `<d>`. Elemen `d` inilah yang terbukti merupakan FPB dari `a` dan `b`.
> > 
> > ### Prima vs. Irreducible di DIU
> > 
> > Di gelanggang umum, konsep "prima" dan "irreducible" bisa berbeda. Namun, di DIU, keduanya menjadi ekuivalen.
> > 
> > - **Irreducible:** Elemen `p` yang tidak bisa difaktorkan lagi kecuali menjadi perkalian unit (misal, di `ℤ`, 7 adalah irreducible karena faktornya hanya 1x7 atau (-1)x(-7)).
> > - **Prima:** Elemen `p` yang jika `p | ab` maka `p | a` atau `p | b`.
> > - **Teorema:** Dalam sebuah DIU, sebuah elemen tak-nol bukan unit adalah **prima jika dan hanya jika** ia juga **irreducible**.
> > 
> > ### Hubungan Fundamental dengan DFT/UFD
> > 
> > Ini adalah teorema puncak dari bab ini yang menunjukkan posisi DIU dalam hierarki gelanggang.
> > 
> > - **Teorema:** Setiap **Daerah Ideal Utama (DIU)** adalah **Daerah Faktorisasi Tunggal (DFT/UFD)**.
> > - _Alasan:_ Sifat DIU menjamin bahwa proses faktorisasi menjadi elemen-elemen irreducible pasti akan berhenti (tidak akan berjalan tak hingga). Selain itu, karena di DIU elemen irreducible sama dengan elemen prima, maka faktorisasi tersebut dijamin unik (hingga urutan dan sekawan).

> [!cornell] #### Summary
> Sebuah Daerah Ideal Utama (DIU/PID) adalah daerah integral di mana setiap idealnya dapat dibangkitkan oleh satu elemen tunggal. Sifat ini sangat kuat, menjamin keberadaan FPB dalam bentuk kombinasi linear (Identitas Bezout) dan menyamakan konsep elemen prima dengan elemen irreducible. Konsekuensi terpentingnya adalah teorema bahwa setiap DIU juga merupakan Daerah Faktorisasi Tunggal (DFT/UFD), menjadikannya jembatan krusial dalam hierarki gelanggang.

> [!ad-libitum]- Additional Information & Contoh Soal
> 
> #### Informasi Tambahan
> 
> - **Hierarki Lengkap:** Hirarki yang lebih lengkap adalah `Lapangan ⊂ Daerah Euclid ⊂ Daerah Ideal Utama ⊂ Daerah Faktorisasi Tunggal ⊂ Daerah Integral`.
> - **Tidak Berlaku Sebaliknya:** Penting untuk diingat bahwa tidak semua DFT/UFD adalah DIU/PID. Contoh klasiknya adalah gelanggang polinomial `ℤ[x]`. Ia adalah UFD (faktorisasi polinomialnya unik), tetapi bukan PID.
> 
> #### Contoh Soal
> 
> 1. **Soal Identifikasi:** Apakah `ℤ` merupakan sebuah DIU? Jelaskan.
>     - **Jawaban:** Ya. Dari topik sebelumnya, kita tahu bahwa setiap ideal di `ℤ` memiliki bentuk `nℤ`. Bentuk `nℤ` ini adalah ideal utama yang dibangkitkan oleh elemen `n`, yaitu `<n>`. Karena _setiap_ idealnya berbentuk seperti ini, maka `ℤ` adalah sebuah DIU.
> 2. **Soal Konseptual:** Ideal `<6, 9>` di `ℤ` dapat ditulis sebagai ideal utama `<d>`. Berapakah nilai `d`?
>     - **Jawaban:** Berdasarkan pembuktian teorema Identitas Bezout, generator `d` dari ideal `<a, b>` adalah `d = gcd(a, b)`. Jadi, `d = gcd(6, 9) = 3`. Dengan demikian, `<6, 9> = <3> = 3ℤ`.
> 3. **Soal Non-Contoh:** Ideal `I = <2, x>` di gelanggang `ℤ[x]` (polinomial dengan koefisien bulat) bukanlah ideal utama. Mengapa?
>     - **Jawaban:** Andaikan `I` adalah ideal utama, maka `I = <p(x)>` untuk suatu polinomial `p(x)`. Ini berarti `p(x)` harus membagi `2` dan juga membagi `x`. Satu-satunya polinomial di `ℤ[x]` yang bisa membagi `2` dan `x` adalah polinomial konstan `1` atau `-1` (yang merupakan unit). Jika `p(x)=1`, maka `I = <1> = ℤ[x]`. Tapi ini tidak benar, karena `I` tidak mengandung polinomial konstan `3`, misalnya. Karena tidak ada satu polinomial pun yang bisa membangkitkan `I`, maka `I` bukan ideal utama dan `ℤ[x]` bukan DIU.