---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Rekursi - Scope Pemanggilan, Penalaran Induktif, dan Contoh Klasik
>
> > ## Questions/Cues
> >
> > - Apa yang terjadi pada scope/environment setiap kali fungsi rekursif dipanggil?
> > - Bagaimana kendali eksekusi berpindah saat pemanggilan rekursif `return`?
> > - Bagaimana induksi matematika meyakinkan kita bahwa kode rekursif benar?
> > - Bagaimana pengecekan palindrome dirumuskan secara rekursif?
> > - Apa base case dan recursive step untuk bilangan Fibonacci?
> > - Bagaimana strategi rekursif menyelesaikan Menara Hanoi?
> >
> > ## Reference Points
> >
> > - IF5100 — Recursion (Slides 10-11, 13-26)
>
> > ### Scope pada Fungsi Rekursif
> >
> > Setiap pemanggilan rekursif ke sebuah fungsi **membuat scope/environment-nya sendiri**:
> >
> > - Nama variabel yang dipakai bisa **sama**, tetapi merujuk **objek yang berbeda** di scope yang terpisah.
> > - **Binding** variabel di suatu scope **tidak diubah** oleh pemanggilan rekursif di dalamnya.
> > - **Kendali eksekusi kembali** ke scope pemanggil begitu pemanggilan fungsi mengembalikan nilai.
> >
> > ```mermaid
> > flowchart TD
> >     G["Global: x = 3, y = fact(x)"] --> S3["Scope fact(3): n = 3<br/>tunggu hasil fact(2)"]
> >     S3 --> S2["Scope fact(2): n = 2<br/>tunggu hasil fact(1)"]
> >     S2 --> S1["Scope fact(1): n = 1<br/>base case, kembalikan 1"]
> >     S1 -->|"return 1"| S2
> >     S2 -->|"return 2 x 1 = 2"| S3
> >     S3 -->|"return 3 x 2 = 6"| G
> > ```
> >
> > Untuk `fact(n)` dengan `x = 3`: `fact(3)` menghitung `3 * fact(2)`, yang menghitung `2 * fact(1)`, yang mencapai **base case** dan mengembalikan `1`. Nilai mengalir balik: `2 * 1 = 2`, lalu `3 * 2 = 6`, dan akhirnya `y = 6`. Tiap frame `n` (`3`, `2`, `1`) hidup bersamaan di stack tetapi terisolasi.
> >
> > ### Penalaran Induktif
> >
> > Bagaimana kita **yakin** kode rekursif akan bekerja? Dengan penalaran ala **induksi matematika**. Argumen terminasi untuk `mult`:
> >
> > - `mult` dengan `b == 1` tidak membuat pemanggilan rekursif dan langsung berhenti.
> > - `mult` dengan `b > 1` membuat pemanggilan rekursif dengan `b` yang lebih kecil, sehingga **pasti akhirnya** mencapai `b == 1`.
> >
> > **Induksi matematika** untuk membuktikan pernyataan berindeks bilangan bulat benar untuk semua `n`:
> >
> > 1. Buktikan benar untuk nilai terkecil (mis. `n = 0` atau `n = 1`).
> > 2. Buktikan: jika benar untuk `n` sembarang, maka benar untuk `n + 1`.
> >
> > Contoh: `0 + 1 + 2 + ... + n = n(n+1)/2`. Untuk `n = 0`, ruas kiri `0` dan ruas kanan `0`, benar. Asumsikan benar untuk `k`; maka `0 + ... + k + (k+1) = k(k+1)/2 + (k+1)`, yang secara aljabar menjadi `(k+1)(k+2)/2`. Jadi benar untuk semua `n >= 0`.
> >
> > **Relevansi ke kode rekursif**: untuk base case kita tunjukkan hasilnya benar; untuk recursive step kita **asumsikan** fungsi benar untuk masalah berukuran lebih kecil dari `b`, lalu langkah penggabungan (mis. penjumlahan) membuatnya benar untuk ukuran `b`. Dengan induksi, kode mengembalikan jawaban yang benar.
> >
> > ### Contoh: Pengecek Palindrome
> >
> > **Palindrome** adalah kata/frasa/urutan karakter yang terbaca sama dari depan dan belakang (`madam`, `racecar`, "*Able was I, ere I saw Elba*").
> >
> > - **Pra-pemrosesan**: buang tanda baca dan ubah ke huruf kecil → `"Able was I, ere I saw Elba"` menjadi `"ablewasiereisawleba"`.
> > - **Base case**: string dengan panjang `0` atau `1` adalah palindrome.
> > - **Recursive step**: jika karakter **pertama sama dengan karakter terakhir**, maka string adalah palindrome bila **bagian tengahnya** juga palindrome.
> >
> > ```python
> > def is_palindrome(s):
> >     if len(s) <= 1:
> >         return True
> >     return s[0] == s[-1] and is_palindrome(s[1:-1])
> > ```
> >
> > ### Contoh: Bilangan Fibonacci
> >
> > Fibonacci (Leonardo dari Pisa) merumuskan teka-teki kelinci: sepasang kelinci baru lahir ditaruh di ladang; tiap pasang mulai kawin pada umur satu bulan; masa hamil satu bulan; kelinci tak pernah mati. Berapa pasang setelah satu tahun?
> >
> > Setiap betina yang hidup pada bulan `n-2` menghasilkan satu betina baru di bulan `n`, ditambah semua yang hidup di bulan `n-1`:
> >
> > - **Multiple base case**: `females(0) = 1`, `females(1) = 1`.
> > - **Recursive step**: `females(n) = females(n-1) + females(n-2)`.
> >
> > Deret: `1, 1, 2, 3, 5, 8, 13, 21, ...` — juga muncul sebagai penataan persegi (spiral Fibonacci) yang mendekati *golden spiral*.
> >
> > ### Contoh: Menara Hanoi
> >
> > Tiga tiang; tumpukan `n` cakram berbeda ukuran di tiang pertama. **Tujuan**: pindahkan seluruh tumpukan ke tiang kedua. **Aturan**: pindahkan hanya **satu cakram** dalam satu waktu; **cakram yang lebih besar tidak boleh menutupi cakram yang lebih kecil**.
> >
> > Ide rekursif dengan `n` sebagai parameter — untuk memindahkan `n` cakram dari `asal` ke `tujuan` memakai `bantu`:
> >
> > 1. Pindahkan `n-1` cakram teratas dari `asal` ke `bantu` (rekursif).
> > 2. Pindahkan **1 cakram terbesar** dari `asal` ke `tujuan`.
> > 3. Pindahkan `n-1` cakram dari `bantu` ke `tujuan` (rekursif).
> >
> > Base case: `n == 1` cukup memindahkan satu cakram langsung.

>[!cornell] #### Summary
>
>  Tiap pemanggilan rekursif **membuat scope sendiri**: nama boleh sama tetapi objeknya berbeda, binding tidak diubah oleh pemanggilan di dalamnya, dan **kendali kembali ke pemanggil** setelah `return` — jejak `fact(3)` menumpuk frame `n = 3, 2, 1` lalu meng-*unwind* `1 → 2 → 6`. Keyakinan atas kebenaran kode rekursif berasal dari penalaran ala **induksi matematika**: base case benar, dan bila benar untuk ukuran lebih kecil maka langkah penggabungan membuatnya benar untuk ukuran penuh (sekaligus menjamin terminasi karena input mengecil menuju base case). Tiga contoh klasik: **palindrome** (base `len <= 1`; recursive `s[0] == s[-1] and is_palindrome(s[1:-1])`), **Fibonacci** (base ganda `females(0)=females(1)=1`; `females(n)=females(n-1)+females(n-2)`), dan **Menara Hanoi** (pindah `n-1` ke tiang bantu, pindah cakram terbesar, pindah `n-1` ke tujuan).

> [!ad-libitum]- Additional Information
>
> #### Kompleksitas Menara Hanoi dan Fibonacci Naif
>
> Menara Hanoi butuh `2^n - 1` perpindahan — 64 cakram (legenda Brahma) berarti ±5,8 × 10^11 tahun pada satu perpindahan per detik. Fibonacci rekursif naif juga eksponensial (`O(1.618^n)`) karena subproblem dihitung ulang; memoization membuatnya `O(n)`, dan rumus Binet menghitungnya `O(1)` (dengan keterbatasan presisi float).
>
> #### Rekursi Berganda dan Struktur Pohon
>
> Palindrome dan factorial adalah **rekursi linear** (satu pemanggilan per langkah). Fibonacci dan Hanoi adalah **rekursi pohon** (≥2 pemanggilan). Struktur pohon rekursi memetakan langsung ke traversal *binary tree* dan algoritma *divide-and-conquer* seperti *merge sort* / *quick sort*.
>
> #### Invarian dan Bukti Formal
>
> Untuk loop, alat analognya adalah **loop invariant**. Untuk rekursi, **structural induction** membuktikan properti pada struktur data rekursif (list, tree). Alat seperti Coq/Lean memformalkan bukti semacam ini; di praktik sehari-hari, `assert` dan *unit test* pada base case + beberapa langkah rekursif sudah menangkap mayoritas bug.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis solusi Menara Hanoi yang mencetak tiap langkah (`pindahkan cakram k dari A ke C`), jalankan untuk `n = 3` dan `n = 4`, dan hitung jumlah baris outputnya — cocokkan dengan `2^n - 1`.
> 2. Bandingkan `fib` rekursif naif vs ber-`lru_cache` dengan `time` untuk `n = 35`.
> 3. Tulis `flatten(lst)` rekursif yang meratakan list bersarang sembarang kedalaman, lalu buktikan terminasinya lewat argumen "kedalaman berkurang".
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 4 (Recursion, Inductive Reasoning).
> - MIT OCW 6.0001, *Lecture 6* (slide Recursion, Fibonacci, Towers of Hanoi).
> - Wikipedia: *Tower of Hanoi*, *Fibonacci number*, *Mathematical induction*.
