---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Newton-Raphson dan Versi Rekursif Pencarian Akar
>
> > ## Questions/Cues
> >
> > - Apa ide inti metode Newton-Raphson, dan mengapa ia disebut *gradient-based*?
> > - Apa hubungan Newton-Raphson dengan backpropagation pada neural network?
> > - Bagaimana rumus umum `x_(r+1) = x_r - f(x_r)/f'(x_r)` diturunkan menjadi kode untuk akar kuadrat?
> > - Bagaimana bentuk rekursif dari bisection search dan Newton-Raphson?
> > - Mengapa dibutuhkan *helper function* untuk membuat versi rekursif dari fungsi-fungsi ini?
> >
> > ## Reference Points
> >
> > - IF5100 — Simple-Numerical Programs (Slides 5-8)
>
> > ### Newton-Raphson Search
> >
> > **Newton-Raphson** adalah metode pencarian akar yang **berbasis gradien** (*gradient-based*) — alih-alih membagi dua interval seperti bisection, ia mengikuti **garis singgung** (*tangent line*) dari fungsi di titik tebakan saat ini untuk melompat langsung ke perkiraan akar berikutnya. Karena memanfaatkan informasi arah (turunan/gradien), konvergensinya jauh **lebih cepat** dibanding bisection search.
> >
> > Metode ini bukan sekadar trik numerik kecil: **algoritma optimisasi di balik backpropagation** pada pelatihan neural network memakai prinsip yang sama — bergerak mengikuti gradien fungsi menuju titik optimal — hanya saja dilakukan dalam **ruang berdimensi sangat tinggi** (jutaan parameter), bukan satu variabel seperti di sini.
> >
> > Rumus umum Newton-Raphson berlaku untuk **fungsi polinomial apa pun**:
> >
> > $$x_{r+1} = x_r - \frac{f(x_r)}{f'(x_r)}$$
> >
> > Idenya: pada tebakan `x_r`, kita hitung nilai fungsi `f(x_r)` dan kemiringan garis singgungnya `f'(x_r)`. Garis singgung ini kita ikuti sampai memotong sumbu-x — titik potong itulah tebakan berikutnya, `x_(r+1)`. Diulangi terus, tebakan akan **mendekati akar sebenarnya** dengan sangat cepat karena setiap langkah "melompat" mengikuti bentuk kurva, bukan sekadar membagi interval secara membabi-buta.
> >
> > ```mermaid
> > flowchart LR
> >     X0["x_0 (tebakan awal)"] -->|"ikuti garis singgung di x_0"| X1["x_1 (lebih dekat ke akar)"]
> >     X1 -->|"ikuti garis singgung di x_1"| X2["x_2 (lebih dekat lagi)"]
> >     X2 -->|"..."| XR["x_r ≈ akar sebenarnya"]
> > ```
> >
> > ### Newton-Raphson untuk Akar Kuadrat
> >
> > Untuk mencari akar kuadrat dari `x`, kita cari akar dari fungsi `f(guess) = guess**2 - x` (nilai `guess` di mana `f(guess) = 0` berarti `guess**2 = x`, yaitu `guess` adalah akar kuadrat `x`). Turunannya `f'(guess) = 2*guess`. Substitusi ke rumus umum:
> >
> > `guess_baru = guess - (guess**2 - x) / (2*guess)`
> >
> > ```python
> > def sqrt_nr(x, epsilon=0.01):
> >     """
> >     square root newton raphson.
> >     """
> >     guess = x/2
> >     while abs(guess**2 - x)>=epsilon:
> >         print(guess)
> >         guess = guess - ((guess**2-x)/(2*guess))
> >
> >     print(f"{guess} is close to square root of {x}")
> > ```
> >
> > Tebakan awal `guess = x/2` cukup sembarang (asalkan tidak nol, karena `2*guess` menjadi pembagi). Dibandingkan bisection search yang butuh puluhan iterasi untuk presisi tinggi, Newton-Raphson biasanya konvergen hanya dalam **beberapa iterasi** saja karena laju konvergensinya **kuadratik** (jumlah digit presisi kira-kira berlipat ganda tiap iterasi), bukan sekadar linear/logaritmik seperti bisection.
> >
> > ### Menuju Versi Rekursif
> >
> > Pertanyaan alami: bisakah `sqrt_bs` dan `sqrt_nr` — yang aslinya ditulis **iteratif** memakai `while` — ditulis ulang secara **rekursif**? Ini menyambung langsung ke konsep **base case** dan **recursive step** yang sudah dibahas sebelumnya di materi Rekursi: base case di sini adalah kondisi "tebakan sudah cukup dekat" (`abs(ans**2 - x) < epsilon`), dan recursive step adalah "perbarui tebakan, lalu panggil ulang fungsi dengan tebakan baru".
> >
> > Perlu dicatat trade-off yang sama seperti dibahas di materi rekursi sebelumnya: versi rekursif **menghabiskan lebih banyak memori** dibanding versi iteratif, karena setiap pemanggilan rekursif menambah **stack frame** baru yang menyimpan *local scope* pemanggilan tersebut — sedangkan versi iteratif hanya memakai satu frame yang diperbarui berulang lewat loop.
> >
> > ### Bisection Search, Versi Rekursif
> >
> > ```python
> > def sqrt_bs_helper(x, epsilon=0.01):
> >     """
> >     square root bisection, recursive
> >     """
> >     def sqrt_bs_recc(low, high):
> >         ans = (high + low) / 2.0
> >         if abs(ans**2 - x) < epsilon:
> >             print(ans, 'is close to square root of', x)
> >             return ans
> >         print('low =', low, 'high =', high, 'ans =', ans)
> >         if ans**2 < x:
> >             return sqrt_bs_recc(ans, high)
> >         else:
> >             return sqrt_bs_recc(low, ans)
> >
> >     low = 0.0
> >     high = max(1.0, x)
> >     return sqrt_bs_recc(low, high)
> > ```
> >
> > ### Newton-Raphson, Versi Rekursif
> >
> > ```python
> > def sqrt_nr_helper(x, epsilon=0.01):
> >     """
> >     square root newton raphson, recursive
> >     """
> >     def sqrt_nr_recc(guess):
> >         if abs(guess**2 - x) >= epsilon:
> >             print(guess)
> >             return sqrt_nr_recc(guess -
> >                     ((guess**2 - x) / (2 * guess)))
> >         print(f"{guess} is close to square root of {x}")
> >         return guess
> >
> >     return sqrt_nr_recc(x / 2)
> > ```
> >
> > ### Mengapa Perlu Helper Function
> >
> > Poin yang **tidak langsung terlihat**: kenapa tidak langsung menulis `sqrt_bs(low, high)` rekursif begitu saja seperti `factorial(n)`? Sebabnya, fungsi rekursif untuk masalah ini butuh **parameter tambahan** (`low` dan `high` untuk bisection) atau **nilai yang ditutup dalam closure** (`x` dan `epsilon` untuk Newton-Raphson) yang **tidak seharusnya dipikirkan ulang oleh pemanggil** setiap kali memanggil fungsi. Pemanggil dari luar hanya ingin memanggil `sqrt_bs_helper(x)` — bukan `sqrt_bs_recc(0.0, max(1.0, x))` dengan menghitung sendiri batas awalnya.
> >
> > Solusinya: buat **fungsi helper luar** yang **tidak rekursif**, satu-satunya tugasnya adalah **menginisialisasi state awal** (`low`, `high`, atau menutup `x`/`epsilon` lewat closure) lalu **memanggil fungsi rekursif bagian dalam** (`sqrt_bs_recc` / `sqrt_nr_recc`) untuk pertama kali. Fungsi rekursif bagian dalam ini bisa didefinisikan **di dalam** fungsi helper (nested function) sehingga otomatis mendapat akses ke `x` dan `epsilon` dari *enclosing scope* tanpa perlu diteruskan ulang sebagai parameter di setiap pemanggilan rekursif. Pola ini — **helper function membungkus fungsi rekursif** — sangat umum ketika rekursi butuh state tambahan yang bukan bagian dari "antarmuka" alami fungsi tersebut bagi pemanggil.

> [!cornell] #### Summary
>
> **Newton-Raphson** adalah metode pencarian akar berbasis gradien yang mengikuti **garis singgung** fungsi di setiap tebakan, memakai rumus umum `x_(r+1) = x_r - f(x_r)/f'(x_r)` — prinsip yang sama dipakai (dalam dimensi jauh lebih tinggi) oleh optimizer di balik **backpropagation**. Untuk akar kuadrat, `f(guess) = guess**2 - x` dan `f'(guess) = 2*guess`, sehingga update-nya `guess - (guess**2-x)/(2*guess)`; konvergensinya **kuadratik**, jauh lebih cepat dari bisection. Baik `sqrt_bs` maupun `sqrt_nr` bisa ditulis ulang secara **rekursif** (base case: tebakan cukup dekat; recursive step: perbarui tebakan lalu panggil ulang), namun rekursi butuh **memori stack frame** ekstra. Karena recursive step butuh parameter tambahan (`low`/`high`) atau closure (`x`/`epsilon`) yang tidak seharusnya dipikirkan pemanggil, dipakai pola **helper function**: fungsi luar non-rekursif menginisialisasi state lalu memanggil fungsi rekursif bagian dalam (nested function) untuk pertama kali.

> [!ad-libitum]- Additional Information
>
> #### Metode Secant: Newton-Raphson Tanpa Turunan Analitik
>
> Ketika `f'(x)` sulit atau mahal dihitung secara analitik, **metode secant** mengaproksimasi turunan memakai selisih dua titik terakhir: `x_(r+1) = x_r - f(x_r) * (x_r - x_(r-1)) / (f(x_r) - f(x_r-1))`. Konvergensinya sedikit lebih lambat dari Newton-Raphson murni (orde ~1.618 vs 2) tetapi tidak butuh rumus turunan eksplisit — berguna untuk fungsi black-box.
>
> #### `scipy.optimize` di Dunia Nyata
>
> Di praktik, jarang orang menulis ulang Newton-Raphson dari nol; pustaka seperti `scipy.optimize.newton`, `scipy.optimize.bisect`, dan `scipy.optimize.brentq` (kombinasi bisection + secant + interpolasi kuadratik, sangat robust) sudah tersedia dan teruji. `brentq` khususnya sering jadi pilihan default karena menggabungkan keandalan bisection dengan kecepatan metode berbasis gradien.
>
> #### Perbandingan Laju Konvergensi
>
> | Metode | Orde konvergensi | Butuh turunan? | Selalu konvergen? |
> |---|---|---|---|
> | Exhaustive enumeration | linear (lambat) | Tidak | Ya (jika step cukup kecil) |
> | Bisection search | linear (logaritmik pada presisi) | Tidak | Ya, jika interval awal valid |
> | Secant | ~1.618 (superlinear) | Tidak (aproksimasi) | Tidak selalu |
> | Newton-Raphson | 2 (kuadratik) | Ya | Tidak selalu (bisa divergen dari tebakan awal buruk atau `f'(x)=0`) |
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis `cbrt_nr(x, epsilon=0.01)` — Newton-Raphson untuk akar pangkat tiga, dengan `f(guess) = guess**3 - x` dan `f'(guess) = 3*guess**2`.
> 2. Modifikasi `sqrt_nr` agar mencetak jumlah iterasi, lalu bandingkan dengan `sqrt_bs` untuk beberapa nilai `epsilon` (`0.01`, `0.0001`, `0.000001`) — amati bagaimana Newton-Raphson tetap butuh sedikit iterasi sementara bisection bertambah.
> 3. Coba jalankan `sqrt_nr(x=0)` — apa yang terjadi pada `guess = x/2`? Perbaiki fungsi agar menangani kasus tepi ini (`x = 0` dan `x` negatif) tanpa error.
> 4. Bandingkan hasil `sqrt_nr_helper` dengan `scipy.optimize.newton(lambda g: g**2 - x, x0=x/2)` untuk memverifikasi kebenaran implementasi manual.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 3 (Some Simple Numerical Programs) dan Bab 4 (Recursion).
> - MIT OCW 6.0001, *Lecture 3: Simple Programs, Bisection Search, Floats*.
> - Dokumentasi SciPy: `scipy.optimize.newton`, `scipy.optimize.brentq`.
