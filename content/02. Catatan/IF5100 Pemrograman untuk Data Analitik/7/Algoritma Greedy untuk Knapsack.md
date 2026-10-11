---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Algoritma Greedy untuk Knapsack
>
> > ## Questions/Cues
> >
> > - Bagaimana ide dasar algoritma greedy, dan apa arti "terbaik" di dalamnya?
> > - Bagaimana class `Food` dan `buildMenu` memodelkan barang knapsack?
> > - Bagaimana `greedy(items, maxCost, keyFunction)` dibuat fleksibel, dan apa kompleksitasnya?
> > - Apa fungsi `lambda`, dan mengapa `lambda x: 1/Food.getCost(x)` dipakai pada greedy by cost?
> > - Mengapa greedy by value, cost, dan density memberi hasil berbeda?
> > - Apa kelebihan dan kekurangan algoritma greedy?
> >
> > ## Reference Points
> >
> > - IF5100 — Optimization Problems (Slides 10-21)
>
> > ### Ide Greedy
> >
> > Alternatif praktis dari brute force:
> >
> > ```
> > while knapsack is not full
> >     put "best" available item in knapsack
> > ```
> >
> > Tetapi apa arti **best**? Tiga kriteria umum: **paling bernilai** (most valuable), **paling murah** (least expensive), dan **rasio nilai/biaya tertinggi** (highest value/units, disebut **density**).
> >
> > ### Contoh: Menu Makan dengan Budget Kalori
> >
> > Kita punya nilai (seberapa suka) tiap makanan dan batas kalori, misalnya 750. Memilih makanan adalah knapsack problem dengan `value` = kesukaan dan `weight` = kalori.
> >
> > | Food | juice | coffee | pizza | burger | fries | coke | apple | donut |
> > | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> > | Value | 89 | 90 | 95 | 100 | 90 | 79 | 50 | 10 |
> > | Calories | 100 | 123 | 258 | 354 | 365 | 150 | 95 | 195 |
> >
> > ### Class `Food` dan `buildMenu`
> >
> > ```python
> > class Food(object):
> >     def __init__(self, n, v, w):
> >         self.name = n
> >         self.value = v
> >         self.calories = w
> >     def getValue(self):
> >         return self.value
> >     def getCost(self):
> >         return self.calories
> >     def density(self):
> >         return self.getValue()/self.getCost()
> >     def __str__(self):
> >         return self.name + ': <' + str(self.value) + ', ' + str(self.calories) + '>'
> >
> > def buildMenu(names, values, calories):
> >     menu = []
> >     for i in range(len(values)):
> >         menu.append(Food(names[i], values[i], calories[i]))
> >     return menu
> > ```
> >
> > `buildMenu` menerima tiga list sepanjang sama dan mengembalikan list objek `Food`.
> >
> > ### Flexible Greedy
> >
> > ```python
> > def greedy(items, maxCost, keyFunction):
> >     itemsCopy = sorted(items, key = keyFunction, reverse = True)
> >     result = []
> >     totalValue, totalCost = 0.0, 0.0
> >     for i in range(len(itemsCopy)):
> >         if (totalCost + itemsCopy[i].getCost()) <= maxCost:
> >             result.append(itemsCopy[i])
> >             totalCost += itemsCopy[i].getCost()
> >             totalValue += itemsCopy[i].getValue()
> >     return (result, totalValue)
> > ```
> >
> > Fungsi ini **fleksibel** karena definisi "terbaik" dititipkan lewat parameter `keyFunction`: barang diurutkan menurun menurut kunci itu, lalu diambil satu per satu selama masih muat. **Efisiensi**: pengurutan `sorted` berbiaya `O(n log n)`, loop `O(n)`, sehingga totalnya `O(n log n)`, jauh dari eksponensial.
> >
> > ### Memakai Greedy dan `lambda`
> >
> > ```python
> > def testGreedy(items, constraint, keyFunction):
> >     taken, val = greedy(items, constraint, keyFunction)
> >     print('Total value of items taken =', val)
> >     for item in taken:
> >         print(' ', item)
> >
> > def testGreedys(foods, maxUnits):
> >     testGreedy(foods, maxUnits, Food.getValue)                    # by value
> >     testGreedy(foods, maxUnits, lambda x: 1/Food.getCost(x))      # by cost
> >     testGreedy(foods, maxUnits, Food.density)                     # by density
> > ```
> >
> > **`lambda`** membuat **fungsi anonim**: `lambda <id1,...,idn>: <expression>` mengembalikan fungsi dengan `n` argumen. Karena `sorted(..., reverse=True)` mengurutkan dari kunci terbesar, "paling murah dulu" diperoleh dengan kunci `1/cost`. Deck mengingatkan: jangan menulis lambda yang rumit, pakai `def`.
> >
> > ### Hasil dan Mengapa Berbeda
> >
> > Hasil yang diverifikasi dengan menjalankan kode (budget 750 dan 1000 kalori):
> >
> > | Strategi | Total value (750) | Total value (1000) |
> > | --- | --- | --- |
> > | By value | 285 | 453 |
> > | By cost | 318 | 413 |
> > | By density | 403 | 413 |
> >
> > Pada 750 kalori, density menang. Tetapi pada 1000 kalori density (413) justru kalah dari by value (453). Alasannya: **urutan pilihan optimal secara lokal tidak selalu menghasilkan solusi optimal global**. Jadi greedy by density tidak selalu pemenang.
> >
> > ```mermaid
> > flowchart TD
> >     A["Urutkan items<br/>menurut keyFunction (menurun)"] --> B["Ambil item berikutnya"]
> >     B --> C{"totalCost + cost<br/>&lt;= maxCost ?"}
> >     C -- ya --> D["Masukkan ke knapsack<br/>update value & cost"]
> >     C -- tidak --> E["Lewati item"]
> >     D --> F{"Masih ada item?"}
> >     E --> F
> >     F -- ya --> B
> >     F -- tidak --> G["Kembalikan (result, totalValue)"]
> > ```
> >
> > ### Pros dan Cons Greedy
> >
> > - **Pro**: mudah diimplementasikan dan efisien secara komputasi.
> > - **Con**: tidak selalu menghasilkan solusi terbaik, dan kita bahkan tidak tahu seberapa bagus hampirannya.

> [!cornell] #### Summary
>
> **Greedy** berulang kali memasukkan item "terbaik" yang masih muat. Implementasi fleksibel `greedy(items, maxCost, keyFunction)` mengurutkan item menurut `keyFunction` (`O(n log n)`) lalu mengambil yang muat; kriteria bisa **value**, **cost** (`lambda x: 1/Food.getCost(x)`), atau **density** (`value/cost`). Pada menu 8 makanan, budget 750 memberi 285 / 318 / 403, sedangkan budget 1000 memberi 453 / 413 / 413, sehingga density tidak selalu menang karena pilihan optimal lokal tidak menjamin optimal global. Greedy mudah dan cepat tetapi tidak menjamin solusi optimal dan tidak diketahui seberapa dekat hasilnya.

> [!ad-libitum]- Additional Information
>
> #### Kapan Greedy Terbukti Optimal
>
> Untuk **fractional knapsack**, greedy by density terbukti optimal. Untuk 0/1 knapsack tidak. Contoh tandingan sederhana: barang `(value, berat)` = `(60,10)`, `(100,20)`, `(120,30)` dengan kapasitas 50; greedy by density mengambil dua barang pertama (160), padahal optimal adalah barang 2 dan 3 (220). Lihat [[Latihan Soal - Masalah Optimasi]].
>
> #### Stabilitas Sorting dan Tie-Break
>
> `sorted` bersifat stabil, jadi dua item dengan kunci sama mempertahankan urutan awal di `items`. Jika dua kriteria perlu dipakai, kunci bisa berupa tuple, misalnya `lambda f: (f.density(), f.getValue())`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `testGreedys(foods, 750)` dan `testGreedys(foods, 1000)` lalu cocokkan tabel hasil di atas.
> 2. Cari budget kalori antara 100 dan 1500 di mana greedy by value mengalahkan greedy by density.
> 3. Tambahkan kriteria keempat (misalnya `value - cost`) lewat `lambda` dan bandingkan hasilnya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 15.2 (Greedy Algorithms).
> - MIT OCW 6.0002, *Lecture 1*, kode `lecture1.py`.
