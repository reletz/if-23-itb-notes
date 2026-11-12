---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Random Walk - Abstraksi dan Implementasi Simulasi
>
> > ## Questions/Cues
> >
> > - Mengapa **random walk** penting, dan apa hubungannya dengan **Brownian motion**?
> > - Mengapa jarak yang diharapkan setelah 100.000 langkah dicari lewat simulasi, bukan dihitung langsung?
> > - Apa tiga abstraksi `Location`, `Field`, dan `Walker`, dan mengapa `Location` dibuat immutable?
> > - Apa beda `UsualWalker` dan `NorthernWalker`, dan mengapa `Walker` dibuat sebagai base class?
> > - Bagaimana fungsi `walk`, `simWalks`, dan `walkTest` tersusun menjadi satu simulasi?
> >
> > ## Reference Points
> >
> > - IF5100 — Stochastic Thinking and Random Walk (Pages 26-42)
>
> > ### Mengapa Random Walk?
> >
> > **Random walk** penting di banyak bidang: memahami pasar saham (mungkin), memodelkan proses **difusi**, dan lain-lain. Bagi kuliah ini ia juga contoh bagus cara memakai simulasi untuk memahami sesuatu, sekaligus dalih untuk berlatih **class** dan **plotting**.
> >
> > **Brownian motion** (pedesis) adalah gerak acak partikel yang tersuspensi dalam medium (cairan atau gas), dan merupakan salah satu contoh random walk (Feynman, *The Feynman Lectures on Physics*, vol. I).
> >
> > ### Drunkard's Walk
> >
> > Bayangkan seorang pemabuk di lapangan: **initial state** di titik asal (origin). Pada setiap langkah ia memilih satu dari empat arah (utara, selatan, timur, barat) secara acak. Slide menunjukkan kemungkinan langkah pertama dan **kemungkinan jarak setelah dua langkah** (mis. kembali ke asal, atau 2 satuan dari asal, atau akar 2).
> >
> > Pertanyaan utama: **berapa jarak yang diharapkan setelah 100.000 langkah?** Menghitung semua jalur secara manual tidak realistis (`4^100000` jalur), sehingga dibutuhkan pendekatan lain: **simulasi**. Strukturnya:
> >
> > 1. Simulasikan **satu walk** sebanyak `k` langkah.
> > 2. Simulasikan **n** walk seperti itu.
> > 3. Laporkan **rata-rata jarak** dari origin.
> >
> > ### Tiga Abstraksi Berguna
> >
> > - **Location**: sebuah tempat.
> > - **Field**: kumpulan tempat dan walker.
> > - **Walker**: pihak yang berpindah dari tempat ke tempat di dalam field.
> >
> > ```mermaid
> > graph TD
> >     W["Walker (base class)"] --> U["UsualWalker"]
> >     W --> N["NorthernWalker"]
> >     F["Field<br/>dict walker -> Location"] --> L["Location<br/>(x, y), immutable"]
> >     F -- "moveWalker" --> W
> >     S["walk(f, w, numSteps)"] --> F
> >     M["simWalks(...)"] --> S
> >     T["walkTest(...)"] --> M
> > ```
> >
> > ### Class `Location`
> >
> > `Location` menyimpan koordinat `x` dan `y` (float). Metode `move(deltaX, deltaY)` **tidak mengubah objek**, melainkan mengembalikan `Location` baru. Tidak ada setter, sehingga ia bertipe **immutable**. Metode `distFrom(other)` menghitung jarak Euclidean `sqrt(xDist² + yDist²)`.
> >
> > ```python
> > class Location(object):
> >     def __init__(self, x, y):
> >         self.x = x
> >         self.y = y
> >     def move(self, deltaX, deltaY):
> >         return Location(self.x + deltaX, self.y + deltaY)
> >     def getX(self): return self.x
> >     def getY(self): return self.y
> >     def distFrom(self, other):
> >         xDist = self.x - other.getX()
> >         yDist = self.y - other.getY()
> >         return (xDist ** 2 + yDist ** 2) ** 0.5
> > ```
> >
> > ### Walker dan Dua Subtipe
> >
> > `Walker` adalah **base class** yang tidak berguna sendiri; ia hanya untuk diwarisi. Dua subtipe:
> >
> > - **UsualWalker**: pejalan biasa, memilih acak antara `(0, 1)`, `(0, -1)`, `(1, 0)`, `(-1, 0)`.
> > - **NorthernWalker**: cenderung ke utara; pilihannya `(0.0, 1.1)`, `(0.0, -0.9)`, `(1.0, 0.0)`, `(-1.0, 0.0)`, sehingga langkah ke utara sedikit lebih panjang dari langkah ke selatan.
> >
> > Keduanya hanya mendefinisikan `takeStep()` yang mengembalikan pasangan perubahan `(dx, dy)` lewat `random.choice`. Dengan demikian `Field` tidak perlu tahu jenis walker-nya (**polymorphism**).
> >
> > ### Class `Field`
> >
> > `Field` menyimpan `dict` yang memetakan walker ke `Location`-nya. `addWalker(walker, loc)` menolak duplikat (`ValueError('Duplicate')`), `getLoc` menolak walker yang tidak terdaftar, dan `moveWalker` meminta langkah dari `walker.takeStep()` lalu memperbarui lokasi dengan `loc.move(xDist, yDist)`.
> >
> > ### Satu Walk, Banyak Walk, dan Pelaporan
> >
> > ```python
> > def walk(f, w, numSteps):
> >     start = f.getLoc(w)
> >     for s in range(numSteps):
> >         f.moveWalker(w)
> >     return start.distFrom(f.getLoc(w))
> >
> > def simWalks(numSteps, numTrials, dClass):
> >     walker = dClass()
> >     origin = Location(0, 0)
> >     distances = []
> >     for t in range(numTrials):
> >         f = Field()
> >         f.addWalker(walker, origin)
> >         distances.append(round(walk(f, walker, numTrials), 1))
> >     return distances
> >
> > def walkTest(walkLengths, numTrials, dClass):
> >     for numSteps in walkLengths:
> >         distances = simWalks(numSteps, numTrials, dClass)
> >         print(dClass.__name__, ' random walk of ', numSteps, ' steps')
> >         print(' Mean =', round(sum(distances) / len(distances), 4))
> >         print(' Max =', max(distances), 'Min =', min(distances))
> > ```
> >
> > Fungsi `walk` mengembalikan jarak antara posisi akhir dan awal setelah `numSteps` langkah. `simWalks` mengulangnya `numTrials` kali dengan `Field` baru dan mengembalikan daftar jarak. `walkTest` menjalankannya untuk beberapa panjang walk dan melaporkan **mean, max, min**. Perhatikan bahwa pada `simWalks` di slide terdapat kesalahan ketik, `walk(f, walker, numTrials)` seharusnya `numSteps`; bug ini diungkap pada sanity check di catatan berikutnya.

> [!cornell] #### Summary
>
> **Random walk** dipakai memodelkan difusi, **Brownian motion**, dan mungkin pasar saham, serta menjadi contoh membangun simulasi. Jarak yang diharapkan setelah 100.000 langkah sulit dihitung langsung sehingga disimulasikan: satu walk `k` langkah, `n` walk, lalu rata-rata jarak dari origin. Desainnya memakai tiga abstraksi: `Location` (immutable, `move` mengembalikan objek baru, `distFrom` jarak Euclidean), `Walker` (base class dengan subtipe `UsualWalker` dan `NorthernWalker` yang mengimplementasikan `takeStep`), dan `Field` (dict walker ke lokasi). Fungsi `walk`, `simWalks`, dan `walkTest` menyusun satu trial, banyak trial, dan pelaporan mean/max/min.

> [!ad-libitum]- Additional Information
>
> #### Hasil Teoretis untuk 2D Lattice Walk
>
> Untuk random walk 2D dengan langkah satuan ke empat arah, jarak kuadrat rata-rata `E[d²] = n`, sehingga jarak akar-kuadrat-rata (RMS) adalah `sqrt(n)`. Jarak **rata-rata** sedikit lebih kecil, kira-kira `sqrt(πn)/2 ≈ 0,886·sqrt(n)`. Untuk `n = 10.000` itu sekitar 88,6, selaras dengan hasil simulasi sekitar 85 yang tampak pada deck (jauh lebih kecil dari 10.000 langkah). Saya menjalankan ulang simulasi sendiri: rata-rata ~9,05 untuk 100 langkah dan ~86,7 untuk 10.000 langkah (500 trial), dekat dengan perkiraan 8,86 dan 88,6.
>
> #### Desain Berorientasi Objek
>
> Memisahkan `Walker`, `Field`, dan `Location` memudahkan **ekstensi**: walker baru (mis. yang tidak boleh kembali ke langkah sebelumnya, atau berjalan di 3D) cukup subclass `Walker` tanpa mengubah `Field`. `Location` yang immutable juga dapat dipakai sebagai key dict atau dibagikan tanpa efek samping, asalkan `__eq__`/`__hash__` didefinisikan bila diperlukan.
>
> #### Vektorisasi dengan NumPy
>
> Untuk jutaan langkah, loop Python lambat. Versi NumPy: `steps = rng.integers(0, 4, size=(trials, n))`, petakan ke `dx, dy`, lalu `cumsum` sepanjang sumbu langkah dan hitung `np.hypot(x[:, -1], y[:, -1]).mean()`. Ini bisa ratusan kali lebih cepat.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ketik ulang seluruh simulasi (setelah memperbaiki `numTrials` menjadi `numSteps`) dan jalankan `walkTest((10, 100, 1000, 10000), 100, UsualWalker)`.
> 2. Tambahkan `class DiagonalWalker` atau `class StubbornWalker` (cenderung mengulang arah sebelumnya) dan bandingkan mean jaraknya.
> 3. Buat versi 3D dan verifikasi apakah `E[d²] ≈ n` tetap berlaku.
> 4. Tulis versi NumPy dan ukur selisih waktu dengan `time.perf_counter()`.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — bab random walk (bab 14 per deck).
> - MIT OCW 6.0002 (Fall 2016), *Lecture 5: Random Walks*.
