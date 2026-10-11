---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Efisiensi Program dan Orders of Growth (Big-O)
>
> > ## Questions/Cues
> >
> > - Mengapa efisiensi program tetap penting walau komputer semakin cepat?
> > - Mengapa mengukur dengan timer (`time`) atau menghitung operasi masih belum cukup untuk membandingkan algoritma?
> > - Apa beda **best case**, **average case**, dan **worst case**, dan mana yang biasanya dipakai?
> > - Apa yang diukur oleh notasi **Big O**, dan mengapa kita memakai batas atas yang "ketat"?
> > - Bagaimana aturan menyederhanakan ekspresi jumlah operasi menjadi Big O?
> >
> > ## Reference Points
> >
> > - IF5100 — Algorithmic Complexity (Slides 2-19)
>
> > ### Mengapa Efisiensi Penting
> >
> > Komputer memang cepat dan makin cepat, tetapi **data set bisa sangat besar** — misalnya Facebook (Juli 2022) melayani sekitar 2,934 miliar pengguna dengan sekitar 1 triliun *edge*/pertemanan; mencari secara *brute force* di data sebesar itu akan sangat lama. Solusi yang sederhana bisa saja **tidak scalable** terhadap ukuran data.
> >
> > Efisiensi dipisah menjadi **efisiensi waktu** dan **efisiensi ruang**, dan keduanya sering berupa **tradeoff**: hasil dihitung lebih dulu lalu disimpan, kemudian diambil lewat *lookup* (contoh: **memoization** pada Fibonacci). Catatan ini fokus pada **efisiensi waktu**.
> >
> > Tantangannya: satu program bisa diimplementasikan dalam banyak cara, sedangkan hanya ada sedikit algoritma berbeda untuk satu masalah. Kita ingin **memisahkan pilihan implementasi dari pilihan algoritma yang lebih abstrak**.
> >
> > ### Tiga Cara Mengevaluasi Efisiensi
> >
> > ```mermaid
> > flowchart LR
> >     A["Metode 1<br/>Timer"] --> B["Metode 2<br/>Hitung operasi"]
> >     B --> C["Metode 3<br/>Order of growth<br/>Big O"]
> >     A -. "mengukur implementasi<br/>dan mesin" .-> D["Kurang cocok<br/>menilai algoritma"]
> >     B -. "bergantung implementasi" .-> D
> >     C -. "menilai algoritma<br/>dan skalabilitas" .-> E["Paling sesuai"]
> > ```
> >
> > #### Metode 1: Timer
> >
> > Memakai modul `time`: catat waktu sebelum dan sesudah kode dijalankan, lalu ambil selisihnya. Kekurangannya, hasil **tidak konsisten**:
> >
> > | Sifat | Terpenuhi? |
> > |---|---|
> > | Waktu berbeda antar algoritma (yang kita inginkan) | Ya |
> > | Waktu berbeda antar implementasi | Tidak diinginkan |
> > | Waktu berbeda antar komputer | Tidak diinginkan |
> > | Waktu tak bisa diprediksi dari input kecil | Tidak diinginkan |
> > | Hubungan input-waktu tak bisa dinyatakan | Tidak diinginkan |
> >
> > #### Metode 2: Menghitung Operasi
> >
> > Asumsikan langkah berikut memakan **waktu konstan**: operasi matematika, perbandingan, assignment, dan mengakses objek di memori. Lalu hitung jumlah operasi sebagai **fungsi ukuran input**. Hasilnya bebas dari komputer dan bergantung pada algoritma, **tetapi** masih bergantung implementasi, tidak ada definisi jelas operasi mana yang dihitung, dan belum menyatakan hubungan input-waktu secara umum.
> >
> > #### Metode 3: Order of Growth
> >
> > Timer dan hitung operasi menilai **implementasi** (timer bahkan menilai **mesin**). Yang kita mau: menilai **algoritma**, menilai **skalabilitas**, dan menyatakannya dalam **ukuran input**. Karena itu kita tetap menghitung operasi, tetapi **tidak peduli variasi kecil** (mis. 3 atau 4 operasi primitif per iterasi) dan memperhatikan perilaku saat ukuran masalah **membesar tanpa batas**.
> >
> > ### Memilih Input dan Kasus: Best, Average, Worst
> >
> > Kita harus memutuskan "apa input-nya": bisa sebuah integer (`mysum(x)`), panjang list (`list_sum(L)`), atau, jika ada beberapa parameter, **Anda yang menentukan** (mis. `search_for_elmt(L, e)`).
> >
> > ```python
> > def search_for_elmt(L, e):
> >     for i in L:
> >         if i == e:
> >             return True
> >     return False
> > ```
> >
> > | Kasus | Definisi | Pada `search_for_elmt` |
> > |---|---|---|
> > | **Best case** | waktu minimum atas semua input berukuran `len(L)` | `e` elemen pertama: konstan |
> > | **Average case** | rata-rata waktu atas semua input berukuran `len(L)` | memeriksa sekitar separuh elemen: ukuran praktis |
> > | **Worst case** | waktu maksimum atas semua input berukuran `len(L)` | `e` tidak ada, seluruh list diperiksa: linear |
> >
> > Secara umum kita **berfokus pada worst case**.
> >
> > ### Big O: Batas Atas Pertumbuhan
> >
> > **Big O** (`O()`) mengukur **batas atas pertumbuhan asimtotik**, disebut **order of growth**.
> >
> > - Dipakai untuk **worst case**, karena kasus ini sering terjadi dan menjadi **bottleneck**.
> > - Menyatakan laju pertumbuhan program **relatif terhadap ukuran input**.
> > - Mengevaluasi **algoritma**, bukan mesin atau implementasi.
> > - Cukup "**order of**", bukan pertumbuhan eksak, tetapi batas atas harus **seketat mungkin**.
> >
> > #### Contoh: `fact_iter`
> >
> > ```python
> > def fact_iter(n):
> >     """assumes n an int >= 0"""
> >     answer = 1
> >     while n > 1:
> >         answer *= n
> >         n -= 1
> >     return answer
> > ```
> >
> > Jumlah operasi: `1 + 5n + 1`. Kompleksitas asimtotik worst case: **O(n)**, karena **konstanta aditif diabaikan** dan **faktor pengali konstan diabaikan**.
> >
> > ### Aturan Penyederhanaan
> >
> > Untuk sebuah jumlah suku, fokus pada **suku yang tumbuh paling cepat** (*dominant term*), dan abaikan faktor pengali konstan karena kita hanya ingin tahu **seberapa cepat waktu naik** ketika input membesar.
> >
> > | Ekspresi | Big O |
> > |---|---|
> > | `n^2 + 2n + 2` | O(n^2) |
> > | `n^2 + 100000n + 3^1000` | O(n^2) |
> > | `log(n) + n + 4` | O(n) |
> > | `0.0001*n*log(n) + 300n` | O(n log n) |
> > | `2n^30 + 3^n` | O(3^n) |

> [!cornell] #### Summary
>
> Efisiensi penting karena **data bisa sangat besar**, sehingga solusi sederhana belum tentu **scalable**; fokus catatan ini adalah **efisiensi waktu** (dengan tradeoff terhadap ruang, mis. **memoization**). **Timer** tidak konsisten antar implementasi/komputer/input, dan **menghitung operasi** masih bergantung implementasi, sehingga dipakai **order of growth**: menilai **algoritma** dan **skalabilitas** terhadap **ukuran input**. Perilaku dibedakan menjadi **best**, **average**, dan **worst case**, dengan fokus pada **worst case**. **Big O** adalah **batas atas asimtotik yang ketat**; untuk menyederhanakannya, buang **konstanta aditif** dan **faktor pengali**, lalu ambil **dominant term** (mis. `1 + 5n + 1` menjadi **O(n)**).

> [!ad-libitum]- Additional Information
>
> #### Big O, Big Omega, dan Big Theta
>
> Slide hanya memakai **Big O** (batas atas). Dalam analisis algoritma formal ada juga **Big Omega** (batas bawah) dan **Big Theta** (batas atas dan bawah sekaligus). Kebiasaan menyebut "O(n)" untuk linear search sebenarnya sering bermakna Theta pada worst case; di mata kuliah ini cukup dipahami sebagai batas atas worst case.
>
> #### Catatan tentang `time.clock()`
>
> Kode timer di slide memakai `time.clock()`, yang sudah **dihapus sejak Python 3.8**. Gantilah dengan `time.perf_counter()` (atau `time.process_time()`), misalnya `t0 = time.perf_counter()` lalu `t1 = time.perf_counter() - t0`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ukur waktu `fact_iter(n)` untuk `n = 1000, 2000, 4000, 8000` dengan `time.perf_counter()`, lalu cek apakah waktu kira-kira berlipat dua saat `n` berlipat dua.
> 2. Hitung secara manual jumlah operasi `fact_iter` dan cocokkan dengan `1 + 5n + 1`; diskusikan operasi mana saja yang Anda hitung.
> 3. Buat fungsi yang best case-nya O(1) dan worst case-nya O(n), lalu tunjukkan input untuk masing-masing.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 11 (Introduction to Computational Complexity).
> - MIT OCW 6.0001, *Lecture 10: Understanding Program Efficiency, Part 1*.
