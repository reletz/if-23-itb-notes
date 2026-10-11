---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Decision Tree (Brute Force) untuk Knapsack
>
> > ## Questions/Cues
> >
> > - Bagaimana search tree membangun semua kemungkinan pilihan, dan apa arti cabang kiri dan kanan?
> > - Berapa banyak node pada search tree, dan apa kompleksitas waktunya?
> > - Apa makna parameter `toConsider` dan `avail` pada `maxVal`?
> > - Apa tiga kasus dalam body `maxVal`?
> > - Mengapa brute force bisa cepat untuk 8 item tetapi bermasalah untuk menu besar?
> >
> > ## Reference Points
> >
> > - IF5100 — Optimization Problems (Slides 22-30)
>
> > ### Search Tree
> >
> > Brute force pada 0/1 knapsack dapat dipikirkan sebagai membangun pohon dari atas ke bawah:
> >
> > 1. Ambil elemen pertama dari item yang belum dipertimbangkan.
> > 2. Jika masih muat di ransel, buat node yang mencerminkan keputusan **mengambil** item itu (secara konvensi **anak kiri**).
> > 3. Telusuri juga keputusan **tidak mengambil** item itu (**anak kanan**).
> > 4. Terapkan proses ini secara rekursif pada anak yang bukan daun.
> > 5. Terakhir pilih node dengan nilai tertinggi yang memenuhi constraint.
> >
> > Enumerasinya bersifat **left-first, depth-first**.
> >
> > ```mermaid
> > flowchart TD
> >     R["root<br/>sisa kalori 5<br/>item: a,b,c,d"] -->|ambil a| A["{a}<br/>value 6, sisa 2"]
> >     R -->|tidak ambil a| NA["{ }<br/>value 0, sisa 5"]
> >     A -->|ambil c| AC["{a,c}<br/>value 14, sisa 0"]
> >     A -->|tidak ambil c| A2["{a}<br/>value 6, sisa 2"]
> >     NA -->|ambil b| B["{b}<br/>value 7, sisa 2"]
> >     NA -->|tidak ambil b| NB["{ }<br/>value 0, sisa 5"]
> >     B -->|ambil c| BC["{b,c}<br/>value 15, sisa 0"]
> >     B -->|tidak ambil c| B2["{b}<br/>value 7, sisa 2"]
> > ```
> >
> > Diagram di atas adalah sebagian pohon untuk menu kecil `a(6,3)`, `b(7,3)`, `c(8,2)`, `d(9,5)` dengan budget 5 kalori. Pada node `{a}` item `b` tidak muat (3 > 2), sehingga hanya ada satu anak (tidak ambil `b`); bagian ini diringkas pada gambar.
> >
> > ### Kompleksitas
> >
> > - Waktu ditentukan oleh **jumlah node** yang dibangkitkan.
> > - Jumlah level sama dengan jumlah item `n`; node pada level `i` berjumlah `2^i`.
> > - Total node adalah $\sum_{i=0}^{n} 2^i$, yang tumbuh **eksponensial**; deck menuliskannya sebagai `O(n 2^n)`.
> > - Optimasi yang jelas, yaitu tidak menelusuri bagian pohon yang melanggar constraint, **tidak mengubah kompleksitas** (kasus terburuk tetap eksponensial).
> >
> > ### Implementasi `maxVal`
> >
> > ```python
> > def maxVal(toConsider, avail):
> >     """Assumes toConsider a list of items, avail a weight
> >        Returns a tuple of the total value of a solution to 0/1
> >        knapsack problem and the items of that solution"""
> >     if toConsider == [] or avail == 0:
> >         result = (0, ())
> >     elif toConsider[0].getCost() > avail:
> >         result = maxVal(toConsider[1:], avail)
> >     else:
> >         nextItem = toConsider[0]
> >         withVal, withToTake = maxVal(toConsider[1:], avail - nextItem.getCost())
> >         withVal += nextItem.getValue()
> >         withoutVal, withoutToTake = maxVal(toConsider[1:], avail)
> >         if withVal > withoutVal:
> >             result = (withVal, withToTake + (nextItem,))
> >         else:
> >             result = (withoutVal, withoutToTake)
> >     return result
> > ```
> >
> > - `toConsider`: item yang belum dipertimbangkan oleh node-node di atasnya (panggilan rekursif sebelumnya).
> > - `avail`: sisa ruang di ransel.
> > - Tiga kasus: **(1)** tidak ada item atau ruang habis, hasil `(0, ())`; **(2)** item pertama terlalu berat, lewati; **(3)** item pertama muat, bandingkan hasil **dengan** dan **tanpa** item itu, ambil yang lebih besar.
> > - Fungsi ini **tidak benar-benar membangun pohon**; variabel lokal `result` hanya mencatat solusi terbaik sejauh ini.
> >
> > ### Hasil pada Menu 8 Makanan
> >
> > Dijalankan pada menu yang sama dengan catatan greedy:
> >
> > | Budget | `maxVal` | Item terpilih | Greedy density | Jumlah panggilan |
> > | --- | --- | --- | --- | --- |
> > | 750 | 403 | apple, coke, pizza, coffee, juice | 403 | 272 |
> > | 1000 | 453 | coke, burger, pizza, coffee, juice | 413 | 401 |
> >
> > Pada 750 kalori hasilnya sama dengan greedy by density (403); pada 1000 kalori brute force menemukan 453, lebih baik dari greedy terbaik (413). Jadi brute force **menjamin optimal**.
> >
> > ### Menu Besar: Masalahnya
> >
> > Untuk 8 item, pencarian selesai cepat, tetapi 8 bukan angka besar. Deck menguji `buildLargeMenu(numItems, 90, 250)` dengan `numItems` 5, 10, ..., 60. Dengan nilai/kalori acak, jumlah panggilan `maxVal` (seed 0, budget 750) yang terukur: 61 panggilan untuk 5 item, 954 untuk 10, 12.536 untuk 15, dan 96.946 untuk 20. Pertumbuhannya eksponensial, sehingga 60 item sudah tidak terjangkau.

> [!cornell] #### Summary
>
> Brute force knapsack dapat dilihat sebagai **search tree** dengan cabang kiri "ambil" dan kanan "tidak ambil", ditelusuri **left-first depth-first**. Jumlah node tumbuh `2^i` per level sehingga total **eksponensial**; menghindari cabang yang melanggar constraint tidak mengubah kompleksitas. `maxVal(toConsider, avail)` mengimplementasikannya secara rekursif dengan tiga kasus (kosong/habis, item terlalu berat, bandingkan dengan vs tanpa item) dan mengembalikan `(value, items)`. Pada menu 8 makanan, budget 1000 kalori menghasilkan 453, lebih baik daripada greedy density (413), tetapi untuk menu besar jumlah panggilan meledak.

> [!ad-libitum]- Additional Information
>
> #### Mengapa `O(n 2^n)` dan Bukan `O(2^n)`
>
> Jumlah node pohon penuh adalah `2^(n+1) - 1`, yaitu `O(2^n)`. Faktor `n` tambahan pada deck dapat dibaca sebagai biaya per node: setiap panggilan membuat salinan list lewat `toConsider[1:]`, yang berbiaya `O(n)`. Dalam praktik, keduanya sama-sama eksponensial.
>
> #### Slicing Menyalin List
>
> `toConsider[1:]` membuat list baru setiap panggilan. Versi yang lebih efisien memakai indeks (`maxVal(items, i, avail)`) tanpa menyalin list; hasil dan jumlah node tetap sama.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan penghitung panggilan global pada `maxVal` dan reproduksi tabel jumlah panggilan untuk `numItems` 5 sampai 25.
> 2. Ubah `maxVal` agar memakai indeks daripada slicing, lalu bandingkan waktunya.
> 3. Gambar tangan search tree untuk menu `x(60,10)`, `y(100,20)`, `z(120,30)` dengan budget 50.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 15.3 (An Optimal Solution to the 0/1 Knapsack Problem).
> - MIT OCW 6.0002, *Lecture 2: Optimization Problems*.
