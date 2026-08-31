---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Structured Types dan Mutability - String, Tuple, List, Dictionary
>
> > ## Questions/Cues
> >
> > - Bagaimana indexing dan slicing `[start:stop:step]` bekerja pada sequence?
> > - Tipe mana yang immutable dan mana yang mutable?
> > - Apa itu singleton tuple dan untuk apa tuple biasa dipakai?
> > - Apa beda `+` vs `append`/`extend`, dan `sort()` vs `sorted()`?
> > - Apa itu aliasing, side effect, dan cloning list?
> > - Mengapa berbahaya memutasi list sambil mengiterasinya?
> > - Kapan memakai dictionary alih-alih list, dan apa syarat key-nya?
> >
> > ## Reference Points
> >
> > - IF5100 — Structured Types and Mutability (Slides 4-47)
>
> > ### String sebagai Sequence
> >
> > String adalah **sequence karakter yang case-sensitive**. Bisa dibandingkan dengan `==`, `>`, `<`, dst. `len(s)` mengembalikan panjangnya (`len("abc")` → `3`).
> >
> > ### Indexing dan Slicing
> >
> > Kurung siku untuk **indexing** — indeks selalu mulai dari `0`, elemen terakhir di `-1`:
> >
> > ```python
> > s = "abc"
> > s[0]   # "a"
> > s[-1]  # "c"
> > s[3]   # IndexError -- di luar batas
> > ```
> >
> > **Slicing** `[start:stop:step]`: bila hanya dua angka `[start:stop]` maka `step=1`; angka boleh dihilangkan hingga tinggal titik dua:
> >
> > ```python
> > s = "abcdefgh"
> > s[3:6]    # "def"        (sama dengan s[3:6:1])
> > s[3:6:2]  # "df"
> > s[::]     # "abcdefgh"    (salinan penuh, s[0:len(s):1])
> > s[::-1]   # "hgfedcba"    (dibalik)
> > s[4:1:-2] # "ec"
> > ```
> >
> > ### Immutability String
> >
> > **String immutable** — tak bisa dimodifikasi di tempat:
> >
> > ```python
> > s = "hello"
> > s[0] = "y"            # TypeError
> > s = "y" + s[1:len(s)] # boleh -- s di-bind ke OBJEK BARU "yello"
> > ```
> >
> > Iterasi lebih "pythonic" lewat elemen langsung, bukan lewat indeks:
> >
> > ```python
> > for char in s:        # lebih disukai
> >     ...
> > for i in range(len(s)):  # perlu bila indeks dibutuhkan
> >     ...
> > ```
> >
> > ### Tuple
> >
> > **Tuple** = sequence terurut, boleh campur tipe, **immutable**, ditulis dengan tanda kurung:
> >
> > ```python
> > t1 = ()               # tuple kosong
> > t2 = (2, "two", 3)
> > t2[0]                 # 2
> > (2, "two", 3) + (5, 6)# (2, "two", 3, 5, 6)
> > t2[1:2]               # ("two",)  -- hasil slice tuple
> > len(t2)               # 3
> > t2[1] = 4             # TypeError -- tak bisa memodifikasi
> > x = (5,)              # SINGLETON: koma menjadikannya tuple 1 elemen
> > ```
> >
> > Kegunaan khas: **menukar nilai variabel** `(x, y) = (y, x)` (tanpa variabel temporer), dan **mengembalikan lebih dari satu nilai** dari fungsi:
> >
> > ```python
> > def quotient_and_remainder(x, y):
> >     return (x // y, x % y)
> > (q, r) = quotient_and_remainder(9, 4)
> > ```
> >
> > ### List: Ordered dan Mutable
> >
> > **List** = sequence informasi terurut yang diakses lewat indeks, ditulis dengan kurung siku `[]`. Biasanya **homogen** (mis. semua int) walau boleh campur. Perbedaan kunci dari string/tuple: **list mutable** — elemennya bisa diubah:
> >
> > ```python
> > L = [2, 'a', 4, [1, 2]]
> > len(L)     # 4
> > L[2] + 1   # 5
> > L[3]       # [1, 2] -- list di dalam list
> > L[1] = 5   # mengubah nilai; L tetap OBJEK yang sama
> > ```
> >
> > ### Operasi List
> >
> > | Operasi | Efek |
> > |---|---|
> > | `L.append(x)` | tambah `x` di akhir — **memutasi** `L` |
> > | `L1 + L2` | **list baru**; `L1`, `L2` tak berubah |
> > | `L.extend(L2)` | tambah elemen `L2` ke `L` — **memutasi** `L` |
> > | `del(L[i])` | hapus elemen di indeks `i` |
> > | `L.pop()` | hapus & **kembalikan** elemen terakhir |
> > | `L.remove(x)` | hapus kemunculan **pertama** `x`; error bila tak ada |
> > | `L.sort()` | **memutasi** `L`, mengembalikan `None` |
> > | `sorted(L)` | **list baru** terurut; `L` tak berubah |
> > | `L.reverse()` | **memutasi** `L` |
> >
> > Konversi list ↔ string: `list(s)` memecah string jadi list karakter; `s.split(sep)` memecah pada `sep` (default spasi); `sep.join(L)` menyatukan list string.
> >
> > ```python
> > list("I<3")     # ['I', '<', '3']
> > "a b c".split() # ['a', 'b', 'c']
> > '_'.join(['a','b','c'])  # "a_b_c"
> > ```
> >
> > Tanda titik pada `L.append(...)` — **list adalah objek**, dan objek punya **method**; diakses lewat `nama_objek.method()`.
> >
> > ### Aliasing, Cloning, dan Side Effect
> >
> > List adalah **objek di memori**; nama variabel hanya **menunjuk** ke objek itu. Bila dua nama menunjuk objek yang sama, keduanya adalah **alias** — memutasi lewat satu nama terlihat lewat nama lain. Inilah **side effect**.
> >
> > ```mermaid
> > flowchart TD
> >     warm["warm"] --> obj["list: red, yellow, orange"]
> >     hot["hot"] --> obj
> >     obj -->|"hot.append('pink')"| obj2["list: red, yellow, orange, pink<br/>warm ikut berubah!"]
> > ```
> >
> > **Cloning** membuat objek baru berisi salinan elemen: `chill = cool[:]`. Analogi: Justin Bieber punya banyak julukan ("The Bieb", "JBeebs") yang semuanya menunjuk orang yang sama — menambah atribut lewat satu julukan mengubah "orang" yang dirujuk semua julukan.
> >
> > Ingat beda `sort()` (memutasi, `return None`) vs `sorted()` (tak memutasi, hasil harus di-assign). Nested list (`list of list`) tetap bisa memicu side effect setelah mutasi.
> >
> > ### Mutasi Saat Iterasi
> >
> > **Hindari memutasi list saat sedang mengiterasinya.**
> >
> > ```python
> > def remove_dups(L1, L2):
> >     for e in L1:
> >         if e in L2:
> >             L1.remove(e)   # BUG
> > L1 = [1, 2, 3, 4]; L2 = [1, 2, 5, 6]
> > remove_dups(L1, L2)         # L1 jadi [2, 3, 4], bukan [3, 4]
> > ```
> >
> > Python memakai **counter indeks internal**; menghapus elemen mengubah panjang list tetapi counter tidak ikut disesuaikan, sehingga elemen `2` terlewat. Solusi: iterasi **salinan** — `for e in L1[:]:`.
> >
> > ### Dictionary
> >
> > Menyimpan info paralel dengan banyak list terpisah itu berantakan: tiap list harus sama panjang, harus diindeks dengan integer, dan harus diperbarui bersamaan. **Dictionary** memetakan **key → value**, dengan key sebagai "indeks kustom" bertipe apa pun (tak harus int):
> >
> > ```python
> > my_dict = {}                       # kosong
> > grades = {"Ana": "B", "John": "A+", "Denise": "A", "Katy": "A"}
> > grades["John"]                     # "A+"
> > grades["Sylvan"]                   # KeyError -- key tak ada
> > grades["Sylvan"] = "A"             # tambah entri
> > "John" in grades                   # True -- uji keberadaan key
> > del(grades["Ana"])                 # hapus entri
> > grades.keys()                      # iterable semua key
> > grades.values()                    # iterable semua value -- TANPA urutan terjamin
> > ```
> >
> > Aturan **key**: harus **unik** dan bertipe **immutable/hashable** (`int`, `float`, `str`, `tuple`, `bool`) — hati-hati `float` sebagai key. **Value** bebas tipe (boleh duplikat, boleh list, bahkan dictionary lain): `d = {4: {1: 0}, (1, 3): "twelve", 'const': [3.14, 2.7]}`.
> >
> > ### List vs Dictionary
> >
> > | List | Dictionary |
> > |---|---|
> > | sequence elemen **terurut** | memetakan **key → value** |
> > | dilihat lewat **indeks integer** | dilihat lewat **key** apa pun (immutable) |
> > | indeks punya urutan | **tak ada urutan** yang dijamin |
> >
> > ### Studi Kasus: Frekuensi Kata Lirik Lagu
> >
> > Tiga fungsi yang memanfaatkan sifat dictionary:
> >
> > 1. **Bangun frequency dict** `str → int`: iterasi kata, `d[word] += 1` bila sudah ada, `d[word] = 1` bila belum.
> > 2. **Cari kata terbanyak**: `best = max(d.values())`, kumpulkan semua key dengan `d[k] == best` ke sebuah list, kembalikan `(words, best)` (list untuk mengantisipasi seri).
> > 3. **Cari kata dengan frekuensi ≥ X**: loop — ambil kata terbanyak, bila `freq >= minTimes` simpan lalu **hapus key itu dari dict** dan ulangi; berhenti saat tak ada lagi. Bekerja karena kita **memutasi dictionary** untuk menyederhanakan iterasi.

> [!cornell] #### Summary
>
> **String, tuple, list, dan dictionary** adalah *structured type*. Semua sequence mendukung **indexing** (mulai `0`, terakhir `-1`) dan **slicing `[start:stop:step]`** (default `step=1`, `s[::-1]` membalik). **String dan tuple immutable**; **list dan dictionary mutable** — perbedaan ini menentukan perilaku. **Tuple** (kurung, singleton butuh koma `(5,)`) dipakai untuk swap `(x,y)=(y,x)` dan return banyak nilai. **List** (kurung siku) bisa diubah di tempat: `append`/`extend`/`sort`/`reverse` **memutasi**, sedangkan `+` dan `sorted()` menghasilkan **objek baru**. Karena nama hanya **menunjuk** objek, dua nama bisa jadi **alias** dan mutasi memicu **side effect**; **cloning `L[:]`** menghindarinya. **Jangan memutasi list saat mengiterasinya** — counter indeks internal tak menyesuaikan; iterasi salinan `L[:]`. **Dictionary** memetakan **key hashable/immutable yang unik** ke **value bebas tipe**, tanpa urutan terjamin, dan menggantikan pola banyak list paralel — seperti tampak pada studi kasus frekuensi kata.

> [!ad-libitum]- Additional Information
>
> #### `copy` vs `deepcopy`
>
> `L[:]`, `list(L)`, dan `L.copy()` semuanya **shallow copy** — elemen bagian dalam (nested list) masih dibagi. Untuk salinan mandiri sepenuhnya gunakan `copy.deepcopy(L)`. Ini sumber bug halus pada matriks (list of list).
>
> #### Comprehension dan `collections`
>
> *List/dict/set comprehension* (`[x*x for x in xs if x > 0]`, `{k: v for ...}`) adalah cara idiomatik membangun koleksi. `collections.Counter` langsung membuat frequency dict; `collections.defaultdict(int)` menghapus kebutuhan cek "key sudah ada?". Sejak Python 3.7 dictionary **mempertahankan urutan penyisipan** (walau materi kuliah menekankan "jangan mengandalkan urutan").
>
> #### Hashability Secara Formal
>
> Sebuah objek *hashable* bila punya `__hash__` yang tetap seumur hidupnya dan `__eq__` yang konsisten. Tuple hashable **hanya bila** semua elemennya hashable — `((1, 2), 3)` boleh jadi key, `([1, 2], 3)` tidak. `float` sebagai key berisiko karena `0.1 + 0.2 != 0.3`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan ketiga fungsi analisis lirik, lalu bandingkan dengan versi memakai `collections.Counter` dan `most_common()`.
> 2. Telusuri di [pythontutor.com](http://pythontutor.com) contoh aliasing `warm`/`hot` dan `remove_dups`, gambar sendiri diagram objek + pointer-nya.
> 3. Tulis fungsi `transpose(matrix)` untuk list of list; pastikan tidak terjadi aliasing baris lewat uji mutasi.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 5 (Structured Types, Mutability, Higher-Order Functions).
> - Dokumentasi Python: *Data Structures* (list, tuple, dict), modul `copy`, modul `collections`.
> - MIT OCW 6.0001, *Lectures 5-6: Tuples, Lists, Dictionaries*.
