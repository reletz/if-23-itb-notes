---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Exhaustive Enumeration dan Bisection Search untuk Akar Kuadrat
>
> > ## Questions/Cues
> >
> > - Apa itu exhaustive enumeration dan mengapa ia sering "cukup praktis"?
> > - Bagaimana exhaustive enumeration bekerja untuk akar pangkat tiga bilangan bulat?
> > - Mengapa strategi increment integer tidak bisa dipakai langsung untuk akar kuadrat (angka real)?
> > - Mengapa `sqroot_ex` dengan `step = epsilon**2` sangat lambat?
> > - Bagaimana bisection search mempercepat pencarian dengan cara membagi dua ruang pencarian?
> >
> > ## Reference Points
> >
> > - IF5100 — Simple-Numerical Programs (Slides 2-4)
>
> > ### Exhaustive Enumeration
> >
> > **Exhaustive enumeration** (pencarian menyeluruh) adalah kelas algoritma yang **mencoba semua kemungkinan jawaban satu per satu**, sampai jawaban yang benar ditemukan atau seluruh kemungkinan habis dicoba. Terdengar naif, tetapi ini sering menjadi **cara paling praktis**: mudah dipahami, mudah ditulis, dan untuk ukuran masalah yang wajar biasanya **cukup cepat**.
> >
> > Contoh klasik: mencari **akar pangkat tiga** (*cube root*) dari sebuah bilangan bulat yang merupakan kubus sempurna (*perfect cube*). Idenya: mulai dari tebakan `ans = 0`, naikkan satu per satu (`ans = ans + 1`) selama `ans**3` masih lebih kecil dari `abs(x)`. Karena domainnya bilangan bulat, incrementnya jelas: **`+1`**.
> >
> > ```python
> > #Find the cube root of a perfect cube
> > x = int(input('Enter an integer: '))
> > ans = 0
> > while ans**3 < abs(x):
> >     ans = ans + 1
> > if ans**3 != abs(x):
> >     print(x, 'is not a perfect cube')
> > else:
> >     if x < 0:
> >         ans = -ans
> >     print('Cube root of', x,'is', ans)
> > ```
> >
> > Perhatikan `abs(x)` dan penanganan tanda di akhir — ini trik agar kode tetap bekerja untuk `x` negatif (akar pangkat tiga dari bilangan negatif adalah negatif), tanpa perlu mengubah logika loop utama.
> >
> > ### Kenapa Pendekatan Ini Gagal untuk Akar Kuadrat
> >
> > Untuk **akar kuadrat**, kita umumnya bekerja dengan bilangan **real** (floating point), bukan bilangan bulat. Tidak ada lagi "increment alami" seperti `+1` — jawabannya bisa berupa desimal di mana pun di antara dua bilangan bulat. Solusinya: ganti increment integer dengan **step floating point yang sangat kecil**, dan ganti pengecekan kesetaraan persis (`==`) dengan **toleransi error** `epsilon`.
> >
> > ```python
> > def sqroot_ex(x, epsilon=0.01):
> >     """
> >     Square root exhaustive search
> >     """
> >     step = epsilon**2
> >     ans = 0.0
> >
> >     while abs(ans**2 - x) >= epsilon and ans <= x:
> >         print(ans)
> >         ans += step
> >     if abs(ans**2 - x) >= epsilon:
> >         print('Failed on square root of', x)
> >     else:
> >         print(ans, 'is close to square root of', x)
> >
> >     return ans
> > ```
> >
> > Masalahnya: agar tidak "melompati" jawaban yang benar, `step` harus **sangat kecil** — di sini dipilih `epsilon**2` (mis. untuk `epsilon = 0.01`, `step = 0.0001`). Akibatnya, untuk `x` yang besar, jumlah iterasi yang dibutuhkan bisa **sangat banyak** (`x / step` iterasi) — pendekatan ini menjadi **sangat lambat** justru saat mencoba lebih presisi. Inilah motivasi mencari algoritma yang lebih cerdas: bukan **melangkah kecil-kecil secara linear**, melainkan **membagi ruang pencarian secara eksponensial** — itulah **bisection search**.
> >
> > ### Bisection Search
> >
> > **Bisection search** (pencarian biner) mendekati jawaban yang benar dengan cara **membagi dua rentang tebakan berulang kali**, alih-alih melangkah kecil satu per satu. Karena tiap iterasi memangkas ruang pencarian menjadi **setengahnya**, bisection jauh lebih cepat konvergen dibanding exhaustive enumeration.
> >
> > Untuk akar kuadrat dari `x`, kita tahu jawabannya berada di antara `low = 0.0` dan `high = max(1.0, x)` (batas atas `max(1.0, x)` diperlukan karena untuk `0 < x < 1`, akar kuadratnya justru **lebih besar** dari `x`). Tebakan awal `ans` adalah titik tengah `(high + low) / 2.0`. Setiap iterasi:
> >
> > - Jika `ans**2 < x`, tebakan **terlalu kecil** → jawaban ada di **separuh atas** → `low = ans`.
> > - Jika `ans**2 >= x`, tebakan **terlalu besar (atau pas)** → jawaban ada di **separuh bawah** → `high = ans`.
> > - Hitung ulang titik tengah baru: `ans = (high + low) / 2.0`.
> >
> > Loop berhenti begitu `abs(ans**2 - x) < epsilon`, yaitu tebakan sudah cukup dekat dengan jawaban sebenarnya.
> >
> > ```python
> > def sqrt_bs(x, epsilon=0.01):
> >     """
> >     square root bisection
> >     """
> >     low = 0.0
> >     high = max(1.0, x)
> >     ans = (high + low) / 2.0
> >
> >     while abs(ans**2 - x) >= epsilon:
> >         print('low =', low, 'high =', high, 'ans =', ans)
> >         if ans**2 < x:
> >             low = ans
> >         else:
> >             high = ans
> >         ans = (high + low) / 2.0
> >
> >     print(ans, 'is close to square root of', x)
> >     return ans
> > ```
> >
> > Diagram berikut menggambarkan bagaimana interval `[low, high]` menyempit setiap iterasi, dengan `ans` sebagai titik tengah yang dievaluasi:
> >
> > ```mermaid
> > flowchart TD
> >     A["low=0.0, high=x<br/>ans = tengah"] -->|"ans^2 < x → naikkan low"| B["low=ans, high=x<br/>ans baru = tengah"]
> >     B -->|"ans^2 >= x → turunkan high"| C["low=ans, high=ans_lama<br/>ans baru = tengah"]
> >     C -->|"..."| D["interval menyempit terus"]
> >     D -->|"abs(ans^2 - x) < epsilon"| E["ans dikembalikan sebagai jawaban"]
> > ```
> >
> > Karena lebar interval terbelah dua setiap putaran, jumlah iterasi yang dibutuhkan tumbuh secara **logaritmik** terhadap presisi yang diminta (`O(log((high-low)/epsilon))`), jauh lebih baik dibanding pertumbuhan **linear** pada exhaustive enumeration.

> [!cornell] #### Summary
>
> **Exhaustive enumeration** mencoba semua kemungkinan jawaban secara berurutan — praktis untuk domain diskret seperti akar pangkat tiga bilangan bulat (increment `+1`), tetapi untuk **akar kuadrat** pada bilangan real, "increment" harus berupa `step` floating point yang sangat kecil (`sqroot_ex` memakai `step = epsilon**2`), membuatnya **sangat lambat** untuk `x` besar. **Bisection search** (`sqrt_bs`) mengatasi ini dengan **membagi dua interval `[low, high]`** setiap iterasi berdasarkan apakah tebakan tengah (`ans`) terlalu kecil atau terlalu besar terhadap `x`, sehingga konvergen secara **logaritmik**, jauh lebih cepat daripada pendekatan linear.

> [!ad-libitum]- Additional Information
>
> #### Bisection Search sebagai Pola Umum
>
> Bisection search bukan hanya untuk akar kuadrat — ini adalah pola umum untuk mencari nilai pada **fungsi monoton** (selalu naik atau selalu turun) pada suatu interval, seperti Python `bisect` module untuk pencarian pada list terurut, atau algoritma `git bisect` untuk mencari commit yang memperkenalkan bug. Modul `bisect.bisect_left`/`bisect_right` di pustaka standar Python adalah implementasi bisection search untuk list.
>
> #### Kompleksitas: Linear vs Logaritmik
>
> Exhaustive enumeration dengan step tetap butuh `O((high-low)/step)` iterasi — linear terhadap lebar ruang pencarian dibagi presisi. Bisection search butuh `O(log2((high-low)/epsilon))` iterasi — untuk mencari akar kuadrat dari `x = 10000` dengan `epsilon = 0.0001`, exhaustive enumeration bisa butuh jutaan iterasi, sedangkan bisection hanya puluhan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Modifikasi `sqroot_ex` agar mencetak berapa banyak iterasi yang dijalankan untuk `x = 100` dan `x = 10000`, lalu bandingkan dengan jumlah iterasi `sqrt_bs` pada input yang sama.
> 2. Tulis `cbrt_bs(x, epsilon=0.01)` — versi bisection search untuk akar pangkat tiga (termasuk kasus `x` negatif, di mana `low` harus bisa negatif).
> 3. Gunakan bisection search untuk mencari akar (*root*) dari fungsi monoton sembarang, misalnya menyelesaikan `2**y = x` untuk `y` (logaritma basis 2) tanpa memakai `math.log2`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 3 (Some Simple Numerical Programs).
> - MIT OCW 6.0001, *Lecture 3: Simple Programs, Bisection Search, Floats*.
> - Dokumentasi Python: modul `bisect`.
