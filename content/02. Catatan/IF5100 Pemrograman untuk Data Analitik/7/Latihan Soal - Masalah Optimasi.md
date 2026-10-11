[[IF5100 Pemrograman untuk Data Analitik]]

---

10.1 (concept) Sebutkan dua komponen sebuah model optimasi dan identifikasi keduanya pada 0/1 knapsack problem dengan vektor `I` (barang) dan `V` (pilihan). Apa bedanya dengan fractional knapsack?

10.2 (compute) Berapa banyak kombinasi yang harus dievaluasi brute force untuk 20 barang? Bagaimana jika menjadi 40 barang? Mengapa jumlah ini disebut power set?

10.3 (trace) Diberikan barang `x = (value 60, cost 10)`, `y = (100, 20)`, `z = (120, 30)` dan budget 50. Jalankan `greedy` dengan `keyFunction` berupa `Food.getValue`, `Food.density`, dan `lambda f: 1/f.getCost()`. Berapa total nilai masing-masing, dan berapa nilai optimalnya?

10.4 (trace) Untuk menu `a(6,3)`, `b(7,3)`, `c(8,2)`, `d(9,5)` (format `value, calories`) dan budget 5, apa yang dikembalikan `maxVal`? Berapa jumlah panggilan `maxVal`, dan berapa jumlah panggilan versi ber-memo `fastMaxVal`?

10.5 (compute) Hitung jumlah panggilan `fib(10)` dan `fastFib(10)` (dengan `fib(0) = fib(1) = 1`). Apa nilai `fib(10)`?

10.6 (write) Tulis satu pemanggilan `greedy` yang mengurutkan barang menurut selisih `value - cost` (terbesar dahulu) memakai `lambda`. Lalu tulis juga `lambda` yang mengurutkan list kata menurut panjangnya, lalu alfabet.

10.7 (debug) Seorang mahasiswa memanggil `fastMaxVal(A, 5)` lalu `fastMaxVal(B, 5)` untuk list `B` lain yang panjangnya sama, tetapi hasil kedua salah. Jelaskan penyebabnya dan perbaiki kodenya.

10.8 (write, the deck's exercise) Skor sebuah mahasiswa dihitung dengan
`score = (60-(a+b+c+d+e))*F + a*ps1 + b*ps2 + c*ps3 + d*ps4 + e*ps5`.
Diberikan `F` dan `ps1..ps5`, cari `a, b, c, d, e` yang memaksimalkan `score`, dengan constraint `a, b, c, d, e` masing-masing bernilai 10 atau 0 dan `a+b+c+d+e >= 20`. (a) Berapa banyak kandidat yang valid? (b) Tulis fungsi brute force. (c) Berapa hasilnya untuk `F=2`, `ps=[1,5,3,4,2]`?

10.9 (concept) Mengapa dynamic programming pada 0/1 knapsack tidak membuktikan `P = NP`, padahal jumlah panggilannya turun dari 65.536 menjadi sekitar 5 ribu untuk 16 item? Kapan `fastMaxVal` tetap lambat?

---

10.1. Pembahasan: Dua komponen: **objective function** (yang dimaksimalkan/diminimalkan) dan **constraint** (batasan, boleh kosong). Pada 0/1 knapsack, objective function adalah `sum V[i]*I[i].value` (dimaksimalkan) dan constraint-nya `sum V[i]*I[i].weight <= w`; `V[i]` hanya boleh 0 atau 1. Pada **fractional knapsack**, barang boleh diambil sebagian, sehingga `V[i]` boleh pecahan antara 0 dan 1; varian ini bisa diselesaikan optimal oleh greedy by density.

10.2. Pembahasan: Setiap barang punya dua pilihan (ambil/tidak), sehingga jumlah kombinasi `2^n`. Untuk `n = 20`: `2**20 = 1.048.576`. Untuk `n = 40`: `2**40 = 1.099.511.627.776`. Disebut **power set** karena kombinasi-kombinasi itu adalah semua himpunan bagian dari himpunan barang; ukuran power set dari `n` elemen adalah `2^n`. Menambah 20 barang membuat pekerjaan sekitar sejuta kali lebih besar.

10.3. Kode verifikasi:
```python
items = [Food('x', 60, 10), Food('y', 100, 20), Food('z', 120, 30)]
print(greedy(items, 50, Food.getValue)[1])                     # 220.0 (z, y)
print(greedy(items, 50, Food.density)[1])                      # 160.0 (x, y)
print(greedy(items, 50, lambda f: 1/f.getCost())[1])           # 160.0 (x, y)
print(maxVal(items, 50)[0])                                    # 220 (z, y)
```
Density barang: `x = 6.0`, `y = 5.0`, `z = 4.0`. Greedy by density mengambil `x` (cost 10) lalu `y` (cost 30 total); `z` tidak muat (30 + 30 > 50), jadi total 160. Greedy by cost menghasilkan pilihan yang sama (160). Greedy by value kebetulan menemukan optimal (220) karena mengambil `z` lalu `y`. Optimal adalah `y + z` bernilai 220 dengan cost 50. Ini contoh bahwa greedy by density tidak menjamin optimal pada 0/1 knapsack.

10.4. Kode verifikasi:
```python
menu = [Food('a',6,3), Food('b',7,3), Food('c',8,2), Food('d',9,5)]
print(maxVal(menu, 5))   # (15, (c, b))
```
Hasil: nilai **15** dengan barang `c` dan `b` (cost 2 + 3 = 5). Tuple barang berurutan `(c, b)` karena `withToTake + (nextItem,)` menambah barang yang diputuskan lebih awal di bagian akhir. `maxVal` memanggil dirinya **17 kali** (17 node pada search tree slide), sedangkan `fastMaxVal` **14 kali**: selisih tiga panggilan terjadi karena subproblem yang sama (misalnya `[c,d]` dengan sisa 2 setelah memilih `a` atau `b`) cukup dijawab dari memo tanpa menelusuri subpohonnya lagi.

10.5. Kode verifikasi:
```python
fib(10)       # 89, 177 panggilan
fastFib(10)   # 89, 19 panggilan
```
`fib(10) = 89`. Versi biasa membuat **177** panggilan, versi memo hanya **19** (satu panggilan per nilai `n` baru ditambah pencarian memo). Untuk `n = 20`: 21.891 vs 39 panggilan.

10.6.
```python
taken, val = greedy(items, 50, lambda f: f.getValue() - f.getCost())
words = ['kiwi', 'fig', 'banana', 'apple']
print(sorted(words, key=lambda w: (len(w), w)))   # ['fig', 'kiwi', 'apple', 'banana']
```
Pada `items` soal 10.3, `value - cost` bernilai `x = 50`, `y = 80`, `z = 90`, sehingga urutannya `z, y, x`; `z` dan `y` muat (50), total 220. Pada kunci urut kata, tuple `(len(w), w)` membuat panjang jadi prioritas pertama dan alfabet sebagai tie-break. Ingat, `lambda` untuk ekspresi sederhana saja; jika rumit, pakai `def`.

10.7. Pembahasan: Default argument `memo = {}` dievaluasi **satu kali** saat fungsi didefinisikan, sehingga semua pemanggilan top-level berbagi dictionary yang sama. Key memo hanya `(len(toConsider), avail)`, bukan isi list; jadi pemanggilan kedua dengan `B` (panjang sama, `avail` sama) menemukan key yang sudah ada dan mengembalikan jawaban untuk `A`. Terverifikasi: `fastMaxVal(A, 5)` mengembalikan 15, lalu `fastMaxVal(B, 5)` ikut mengembalikan 15 padahal jawaban benar untuk `B` (semua nilai 1) adalah 2. Perbaikan:
```python
def fastMaxVal(toConsider, avail, memo=None):
    if memo is None:
        memo = {}
    ...  # isi tetap sama, selalu teruskan memo pada panggilan rekursif
```
atau panggil `fastMaxVal(B, 5, {})` setiap kali top-level.

10.8. Kode verifikasi:
```python
import itertools

def best(F, ps):
    best_score, best_choice = None, None
    for choice in itertools.product((0, 10), repeat=5):
        if sum(choice) >= 20:
            score = (60 - sum(choice)) * F + sum(x * p for x, p in zip(choice, ps))
            if best_score is None or score > best_score:
                best_score, best_choice = score, choice
    return best_score, best_choice

print(best(2, [1, 5, 3, 4, 2]))   # (180, (0, 10, 10, 10, 0))
```
(a) Ada `2^5 = 32` kombinasi, dan yang memenuhi `a+b+c+d+e >= 20` (minimal dua variabel bernilai 10) adalah `C(5,2)+C(5,3)+C(5,4)+C(5,5) = 10+10+5+1 = 26` kandidat. (b) Fungsi `best` di atas mengenumerasi semua 32 kombinasi dan menyaring constraint. (c) Untuk `F=2`, `ps=[1,5,3,4,2]` hasilnya **180** dengan `a=0, b=c=d=10, e=0`. Penjelasan: setiap 10 poin yang dialokasikan ke `ps_i` menambah skor `10*(ps_i - F)` dibanding membiarkannya di `F`; jadi pilih semua `ps_i > F` (di sini 5, 3, 4), dan jika kurang dari dua, tambahkan yang terbesar berikutnya demi constraint. Skor: `(60-30)*2 + 10*(5+3+4) = 60 + 120 = 180`.

10.9. Pembahasan: Waktu `fastMaxVal` ditentukan oleh **jumlah pasangan berbeda** `<toConsider, avail>`, yaitu paling banyak `len(items)` kali jumlah nilai `avail` yang mungkin. Untuk bobot bilangan bulat kecil dan kapasitas kecil, pasangan berbeda jumlahnya terbatas (pseudo-polinomial), sehingga cepat. Ini bukan polinomial dalam ukuran input yang sebenarnya (jumlah bit kapasitas), jadi tidak mengubah status NP-hard. Dalam **kasus terburuk**, yaitu bobot berupa bilangan besar/sangat beragam sehingga hampir setiap subset punya jumlah berat berbeda dan overlap hilang, jumlah pasangan tetap mendekati `2^n` dan `fastMaxVal` kembali lambat. Pada menu 8 makanan di deck dengan budget 750, misalnya, `fastMaxVal` tetap melakukan 272 panggilan sama seperti `maxVal`, karena hampir tidak ada subproblem yang berulang.
