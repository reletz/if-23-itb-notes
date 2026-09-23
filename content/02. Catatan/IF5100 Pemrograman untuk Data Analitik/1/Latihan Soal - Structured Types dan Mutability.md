[[IF5100 Pemrograman untuk Data Analitik]]

---

4.1 (trace, slicing) With `s = "abcdefgh"`, evaluate: (a) `s[3:6]`; (b) `s[::-1]`; (c) `s[4:1:-2]`; (d) `s[-2]`.

4.2 (concept) Why does `s[0] = "y"` raise an error for a string, while `s = "y" + s[1:]` is allowed?

4.3 (concept) Classify each as mutable or immutable: `int`, `str`, `tuple`, `list`, `dict`.

4.4 (trace, the classic aliasing trap) Predict both lists:

```python
warm = ["red", "yellow"]
hot = warm
hot.append("orange")
print(warm)
print(hot)
```

Then change `hot = warm` to `hot = warm[:]` and give the new output.

4.5 (trace, mutation during iteration — from the deck) Why does `L1` end as `[2, 3, 4]` rather than `[3, 4]`?

```python
def remove_dups(L1, L2):
    for e in L1:
        if e in L2:
            L1.remove(e)

L1 = [1, 2, 3, 4]
L2 = [1, 2, 5, 6]
remove_dups(L1, L2)
print(L1)
```

4.6 (write, dict) Write `lyrics_to_frequencies(words)` that takes a list of words and returns a dict mapping each word to its count.

4.7 (write, dict + tuple) Using the frequency dict, write `most_common(freqs)` returning a tuple `(list_of_words, count)` for the word(s) with the highest count.

4.8 (concept) Why can a tuple be a dictionary key but a list cannot?

---

4.1. Kode verifikasi:
```python
s = "abcdefgh"
print(s[3:6])     # "def"
print(s[::-1])     # "hgfedcba"
print(s[4:1:-2])   # "ec"
print(s[-2])        # "g"
```
- (a) `s[3:6]` = indeks 3,4,5 → `"def"`.
- (b) `s[::-1]` = seluruh string dibalik → `"hgfedcba"`.
- (c) `s[4:1:-2]` = mulai indeks 4 mundur ke arah 1 (eksklusif) dengan langkah 2 → indeks 4 (`'e'`), lalu 2 (`'c'`), berhenti sebelum indeks 1 tercapai → `"ec"`.
- (d) `s[-2]` = karakter kedua dari belakang → `"g"`.

4.2. Pembahasan: `str` di Python adalah tipe **immutable** — sekali dibuat, isi karakternya tidak bisa diubah di tempat (*in place*), sehingga `s[0] = "y"` memicu `TypeError: 'str' object does not support item assignment`. Sebaliknya, `s = "y" + s[1:]` **tidak mengubah** objek string lama sama sekali — ia membuat objek string **baru** dari hasil konkatenasi, lalu nama `s` di-*rebind* untuk menunjuk ke objek baru itu. Objek lama tetap utuh (dan akan dibuang oleh *garbage collector* jika tidak ada referensi lain ke sana).

4.3. Pembahasan:
- `int` — **immutable**
- `str` — **immutable**
- `tuple` — **immutable**
- `list` — **mutable**
- `dict` — **mutable**

4.4. Kode verifikasi:
```python
warm = ["red", "yellow"]
hot = warm
hot.append("orange")
print(warm)   # ['red', 'yellow', 'orange']
print(hot)    # ['red', 'yellow', 'orange']
```
`hot = warm` **tidak membuat salinan** — keduanya adalah dua nama yang menunjuk ke **objek list yang sama** (*aliasing*). Memanggil `.append()` lewat `hot` memutasi objek itu di tempat, sehingga terlihat juga lewat `warm`.

Dengan `hot = warm[:]` (membuat **salinan dangkal**/*shallow copy* lewat *slicing* penuh), `hot` menunjuk ke objek list **baru dan terpisah**:
```python
warm = ["red", "yellow"]
hot = warm[:]
hot.append("orange")
print(warm)   # ['red', 'yellow']            -- tidak berubah
print(hot)    # ['red', 'yellow', 'orange']
```

4.5. Pembahasan: `for e in L1` mengiterasi list **sambil memutasinya** lewat `L1.remove(e)`, dan iterator internal Python bergerak berdasarkan **indeks**, bukan mengikuti elemen. Jejak eksekusi:
- Indeks 0: `e = 1`. `1 in L2` → True → `L1.remove(1)` → `L1` sekarang `[2, 3, 4]`. Semua elemen **bergeser mundur satu indeks**.
- Iterator lanjut ke **indeks 1** dari list yang sudah bergeser → itu sekarang `3` (bukan `2`, yang "terlewat" karena bergeser ke indeks 0 yang sudah dilewati iterator). `e = 3`: `3 in L2`? Tidak → dilewati.
- Indeks 2: `e = 4`: `4 in L2`? Tidak → dilewati.
- Indeks 3 tidak ada lagi (panjang `L1` sekarang 3) → loop berhenti.

Hasil akhir `L1 = [2, 3, 4]` — elemen `2` **tidak sempat diperiksa** karena bergeser ke posisi yang sudah "dilewati" iterator akibat penghapusan di tengah iterasi. Pelajarannya: **jangan memutasi list yang sedang diiterasi**; iterasi salinannya (`for e in L1[:]`) atau bangun list baru sebagai gantinya.

4.6.
```python
def lyrics_to_frequencies(words):
    freqs = {}
    for w in words:
        freqs[w] = freqs.get(w, 0) + 1
    return freqs
```
`dict.get(w, 0)` mengembalikan hitungan saat ini (atau `0` jika `w` belum ada sebagai key), sehingga aman menambah 1 tanpa perlu cek `if w in freqs` secara eksplisit.

4.7.
```python
def most_common(freqs):
    best = max(freqs.values())
    words = [w for w, c in freqs.items() if c == best]
    return (words, best)
```
Menangani kasus **seri** (lebih dari satu kata dengan hitungan tertinggi sama) dengan mengembalikan **semua** kata itu dalam satu list, dipasangkan dengan hitungannya dalam sebuah tuple.

4.8. Pembahasan: Key dictionary harus **hashable** (punya nilai hash yang tidak berubah selama umur objek), dan Python hanya menjamin objek **immutable** aman untuk itu. `tuple` immutable — isinya tidak bisa diubah setelah dibuat, jadi nilai hash-nya stabil selamanya, aman dipakai sebagai key. `list` **mutable** — isinya bisa diubah kapan saja (`append`, `remove`, dst.), yang berarti nilai hash-nya bisa berubah; jika diizinkan jadi key, dictionary bisa "kehilangan jejak" entry itu setelah list-nya dimodifikasi, karena hash saat pencarian tidak lagi cocok dengan hash saat penyimpanan. Karena itu Python melarang `list` sebagai key (`TypeError: unhashable type: 'list'`).
