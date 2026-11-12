---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Estimasi Pi dan Validitas Statistik
>
> > ## Questions/Cues
> >
> > - Bagaimana sejarah estimasi nilai pi (Rhind Papyrus, Archimedes, Buffon-Laplace)?
> > - Bagaimana simulasi Buffon-Laplace memperkirakan pi?
> > - Mengapa jawaban yang benar saja belum cukup, dan apa peran standard deviation?
> > - Apa beda dua pernyataan tentang interval pi, dan mengapa hanya satu yang valid secara statistik?
> >
> > ## Reference Points
> >
> > - IF5100 — Confidence Interval (Pages 19-28)
>
> > ### Sejarah Estimasi Pi
> >
> > Deck memotivasi **confidence interval** lewat pertanyaan: bagaimana memperkirakan nilai pi? Tiga pendekatan ditampilkan:
> >
> > - **Rhind Papyrus** (sekitar 1550 SM): pi kira-kira 4 x (8/9)^2 = 3,16.
> > - **Archimedes**: batas atas dan bawah, 223/71 < pi < 22/7. Ini sebenarnya sebuah *interval* dengan jaminan matematis.
> > - **Metode Buffon-Laplace**: pendekatan **simulasi** acak, dibahas berikut.
> >
> > ### Simulasi Buffon-Laplace
> >
> > Ide metode ini adalah menjatuhkan jarum secara acak lalu menghitung seberapa sering jarum memenuhi suatu kondisi geometris (menyilang garis); proporsi itu berhubungan dengan pi sehingga pi dapat **diturunkan dari frekuensi** hasil acak. Slide 22-26 (geometri, kode, dan output) hanya berupa gambar sehingga detailnya tidak tertulis di teks deck; yang jelas dari slide berikutnya, outputnya berupa estimasi pi beserta **standard deviation** dan interval di sekitarnya (3,13743875875 sampai 3,14567467875).
> >
> > Pola umum simulasi semacam ini: makin banyak jarum, makin **kecil standard deviation** estimasi, dan makin sempit interval di sekitar pi.
> >
> > ### Benar Saja Tidak Cukup
> >
> > Menghasilkan jawaban yang bagus **tidak cukup**; kita perlu **alasan untuk percaya** bahwa jawaban itu dekat dengan nilai sebenarnya. Dalam kasus ini, standard deviation yang kecil menunjukkan estimasi dekat dengan pi. Slide menutup dengan pertanyaan "Right?", mengingatkan bahwa kesimpulan ini perlu diuji.
> >
> > ### Dua Pernyataan, Satu yang Valid
> >
> > Misalkan hasil simulasi memberi interval 3,13743875875 sampai 3,14567467875. Bandingkan:
> >
> > 1. "**95% dari simulasi** yang kita jalankan akan menghasilkan estimasi pi di antara 3,13743875875 dan 3,14567467875."
> > 2. "Dengan **probabilitas 0,95, nilai pi sebenarnya** berada di antara 3,13743875875 dan 3,14567467875."
> >
> > Keduanya *secara faktual benar*, tetapi hanya **pernyataan pertama** yang dapat **disimpulkan dari simulasi**. Pernyataan kedua memakai pengetahuan di luar simulasi (kita sudah tahu pi). Dari data simulasi saja kita hanya sah berbicara tentang perilaku estimasi, bukan tentang kebenaran nilai sejati. Moral slide: **statistically valid is not the same as true**.
> >
> > ```mermaid
> > graph TD
> >     S["Hasil simulasi"] --> V["Valid secara statistik:<br/>95% run menghasilkan estimasi<br/>dalam interval ini"]
> >     S --> X["Tidak dapat disimpulkan:<br/>pi sejati di interval ini<br/>dengan peluang 0,95"]
> >     V --> M["Statistically valid bukan berarti true"]
> > ```

> [!cornell] #### Summary
>
> Estimasi **pi** dari Rhind Papyrus (3,16), Archimedes (223/71 < pi < 22/7), hingga simulasi **Buffon-Laplace** menjadi contoh penggunaan simulasi acak dengan confidence interval. Jawaban yang baik tidak cukup; kita perlu alasan percaya bahwa ia dekat nilai sebenarnya, dan standard deviation yang kecil mendukung hal itu. Pernyataan "95% run simulasi menghasilkan estimasi pi dalam interval ini" valid secara statistik, sedangkan "dengan peluang 0,95 pi sejati ada di interval ini" tidak dapat disimpulkan dari simulasi meski benar secara faktual. Jadi **statistically valid tidak sama dengan true**.

> [!ad-libitum]- Additional Information
>
> #### Rumus Jarum Buffon
>
> Pada versi klasik, jarum dengan panjang L dijatuhkan pada lantai bergaris sejajar berjarak D (L <= D). Probabilitas jarum menyilang garis adalah 2L / (pi D), sehingga pi dapat diestimasi sebagai 2L N / (D H), dengan N jumlah jarum dan H jumlah yang menyilang. Estimator ini menjadi tak stabil saat H kecil, itulah sebabnya jumlah jarum harus besar. Pastikan membandingkan dengan gambar pada slide 22-26 untuk detail versi yang dipakai kuliah.
>
> #### Pendekatan Monte Carlo Lain
>
> Cara populer lain: lempar titik acak (x, y) ke dalam persegi satuan; pi diperkirakan sebagai 4 kali proporsi titik dengan x^2 + y^2 <= 1. Galat standarnya berkurang sebanding 1 / sqrt(n), konsisten dengan CLT.
>
> ```python
> import random
> def estPi(n):
>     hit = sum(random.random()**2 + random.random()**2 <= 1 for _ in range(n))
>     return 4 * hit / n
> ```
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `estPi` untuk n = 100, 10 ribu, 1 juta, ulangi 100 kali tiap n, lalu hitung mean, std, dan interval 1,96 std.
> 2. Periksa apakah std turun dengan faktor 10 saat n naik 100 kali.
> 3. Rumuskan sendiri dengan kalimat sendiri mengapa pernyataan ke-2 pada slide 28 tidak valid.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 16.4 (Finding pi).
> - MIT OCW 6.0002, *Lecture 7: Confidence Intervals*.
