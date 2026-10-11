---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Model Optimasi dan Knapsack Problem
>
> > ## Questions/Cues
> >
> > - Apa tiga jenis model komputasional, dan di mana posisi model optimasi?
> > - Apa dua komponen utama sebuah model optimasi (objective function dan constraint)?
> > - Apa perbedaan 0/1 knapsack problem dengan continuous (fractional) knapsack problem?
> > - Bagaimana 0/1 knapsack diformalkan dengan vektor `I` dan `V`?
> > - Bagaimana algoritma brute force bekerja, dan mengapa sering tidak praktis?
> >
> > ## Reference Points
> >
> > - IF5100 — Optimization Problems (Slides 3-9)
>
> > ### Model Komputasional
> >
> > **Model komputasional** memakai komputasi untuk membantu memahami dunia tempat kita hidup: sebagai *experimental device* untuk memahami sesuatu yang sudah terjadi atau memprediksi masa depan. Ada tiga keluarga besar: **optimization model**, **statistical model**, dan **simulation model**. Catatan ini membahas yang pertama.
> >
> > ### Apa Itu Model Optimasi?
> >
> > Sebuah **optimization model** terdiri dari dua bagian:
> >
> > - **Objective function** yang ingin di-*maximize* atau di-*minimize*, misalnya meminimalkan waktu perjalanan dari New York ke Boston.
> > - **Constraint** (boleh kosong) yang harus dipenuhi, misalnya tidak boleh menghabiskan lebih dari $100 dan harus tiba di Boston sebelum pukul 17.00.
> >
> > ### Knapsack Problem
> >
> > Kekuatan kita terbatas sehingga ada **berat maksimum** yang bisa dibawa dalam ransel (*knapsack*), padahal kita ingin membawa lebih banyak barang daripada yang muat. Pertanyaannya: barang mana yang dibawa dan mana yang ditinggal? Ada dua varian:
> >
> > | Varian | Aturan |
> > | --- | --- |
> > | **0/1 knapsack** | Setiap barang diambil utuh atau tidak sama sekali |
> > | **Continuous / fractional knapsack** | Barang boleh diambil sebagian (pecahan) |
> >
> > Deck ini berfokus pada **0/1 knapsack**.
> >
> > ### Formalisasi 0/1 Knapsack
> >
> > - Setiap barang adalah pasangan `<value, weight>`.
> > - Ransel menampung total berat paling banyak `w`.
> > - Vektor `I` (panjang `n`) menyimpan himpunan barang yang tersedia.
> > - Vektor `V` (panjang `n`) menandai pilihan: `V[i] = 1` berarti `I[i]` diambil, `V[i] = 0` berarti tidak.
> >
> > Cari `V` yang memaksimalkan
> >
> > $$\sum_{i=0}^{n-1} V[i] \cdot I[i].\text{value}$$
> >
> > dengan constraint
> >
> > $$\sum_{i=0}^{n-1} V[i] \cdot I[i].\text{weight} \le w$$
> >
> > ### Algoritma Brute Force
> >
> > 1. **Enumerasi** semua kombinasi barang, yaitu membangkitkan semua himpunan bagian dari himpunan barang (disebut **power set**).
> > 2. **Buang** kombinasi yang total berat/unitnya melebihi batas.
> > 3. Dari kombinasi yang tersisa, **pilih** salah satu yang nilainya terbesar.
> >
> > ### Mengapa Sering Tidak Praktis
> >
> > Karena `V` adalah bilangan biner `n` bit, ada `2^n` kemungkinan nilai `V`, sehingga ukuran power set adalah `2^n`. Untuk 100 barang, ukurannya `2^100 = 1.267.650.600.228.229.401.496.703.205.376`. Jadi 0/1 knapsack secara inheren **eksponensial** (tetapi, kata deck, "don't despair": ada algoritma greedy dan dynamic programming).
> >
> > ```mermaid
> > flowchart TD
> >     M["Model komputasional"] --> O["Optimization model"]
> >     M --> S["Statistical model"]
> >     M --> Si["Simulation model"]
> >     O --> OF["Objective function<br/>maximize / minimize"]
> >     O --> C["Constraint<br/>(boleh kosong)"]
> >     O --> K["Contoh: Knapsack"]
> >     K --> K1["0/1 knapsack"]
> >     K --> K2["Fractional knapsack"]
> >     K1 --> BF["Brute force<br/>power set 2^n"]
> > ```

> [!cornell] #### Summary
>
> **Model optimasi** terdiri dari **objective function** yang dimaksimalkan/diminimalkan dan **constraint** yang harus dipenuhi. **Knapsack problem** memilih barang `<value, weight>` agar total nilai maksimum tanpa melebihi kapasitas `w`; varian **0/1** mengambil barang utuh atau tidak sama sekali, varian **continuous** membolehkan pecahan. Diformalkan dengan vektor biner `V`: maksimalkan `sum V[i]*I[i].value` dengan `sum V[i]*I[i].weight <= w`. **Brute force** mengenumerasi **power set** (`2^n` himpunan bagian), membuang yang melanggar batas, lalu memilih yang terbaik; karena eksponensial, cara ini sering tidak praktis.

> [!ad-libitum]- Additional Information
>
> #### Catatan tentang Angka 2^100
>
> Pada slide tertulis `1,297,650,600,228,229,401,496,703,205,376`. Nilai yang benar dari `2**100` di Python adalah `1,267,650,600,228,229,401,496,703,205,376`; selisih pada digit ketiga tampaknya salah ketik di slide. Intinya tidak berubah: ukurannya sekitar `1,27 x 10^30`.
>
> #### Kelas Kompleksitas
>
> 0/1 knapsack adalah masalah **NP-hard**; belum diketahui algoritma polinomial untuk kasus umum. Varian **fractional** justru bisa diselesaikan optimal oleh algoritma greedy (urutkan menurut rasio nilai/berat), sehingga perbedaan 0/1 vs continuous bukan sekadar detail.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis fungsi yang membangkitkan power set dari list `[a, b, c, d]` memakai `itertools.combinations` dan hitung ukurannya.
> 2. Ukur waktu enumerasi power set untuk `n = 10, 15, 20, 22` dan amati pertumbuhannya.
> 3. Formalkan sendiri satu masalah sehari-hari (misalnya memilih tugas dengan batas waktu) sebagai model optimasi: tulis objective function dan constraint-nya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 14.1 dan Bab 15 (Knapsack and Graph Optimization Problems).
> - MIT OCW 6.0002, *Lecture 1: Introduction, Optimization Problems*.
