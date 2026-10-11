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
> >
> > ### Contoh Kode Lengkap
> >
> > **String dan loop** (slide 9) — dua potongan di bawah melakukan hal sama; versi `for char in s` lebih *pythonic*. Perhatikan perbandingan harus `==` (slide asli salah menulis `=`):
> >
> > ```python
> > s = "abcdefghi"
> >
> > for index in range(len(s)):
> >     if s[index] == 'i' or s[index] == 'u':
> >         print("There is an i or u")
> >
> > for char in s:
> >     if char == 'i' or char == 'u':
> >         print("There is an i or u")
> > ```
> >
> > **Robot Cheerleaders** (slide 10) — `an` dipakai untuk huruf yang dilafalkan berawalan vokal (*an* H, *an* L, *an* X, dst.):
> >
> > ```python
> > an_letters = "aefhilmnorsxAEFHILMNORSX"
> >
> > word = input("I will cheer for you! Enter a word: ")
> > times = int(input("Enthusiasm level (1-10): "))
> >
> > i = 0
> > while i < len(word):
> >     char = word[i]
> >     if char in an_letters:
> >         print("Give me an " + char + "! " + char)
> >     else:
> >         print("Give me a " + char + "! " + char)
> >     i += 1
> >
> > print("What does that spell?")
> > for i in range(times):
> >     print(word, "!!!")
> > ```
> >
> > Catatan: kode di slide menyelipkan `for char in word:` di dalam cabang `if char in an_letters`. Loop dalam itu **bug (sisa yang tidak disengaja)**: untuk tiap huruf `an` seluruh kata akan dicetak ulang, dan `char` ditimpa oleh variabel loop dalam. Versi di atas sudah membuangnya sehingga hanya ada satu baris cheer per huruf.
> >
> > **Latihan nested loop `s1`/`s2`** (slide 11) — `break` hanya keluar dari loop **terdalam**, bukan keduanya:
> >
> > ```python
> > s1 = "itb u rock"
> > s2 = "i rule itb"
> > if len(s1) == len(s2):
> >     for char1 in s1:
> >         for char2 in s2:
> >             if char1 == char2:
> >                 print("common letter")
> >                 break
> > # mencetak "common letter" 7 kali: satu per karakter s1
> > # yang ada di s2 (i, t, b, spasi, u, spasi, r), bukan satu kali.
> > ```
> >
> > **Menukar nilai: naif vs temp vs tuple** (slide 14):
> >
> > ```python
> > x, y = 1, 2
> >
> > # naif: SALAH, nilai x asli hilang
> > x = y
> > y = x          # x = 2, y = 2
> >
> > x, y = 1, 2
> > # dengan variabel temporer
> > temp = x
> > x = y
> > y = temp       # x = 2, y = 1
> >
> > x, y = 1, 2
> > # tuple: tanpa variabel temporer
> > (x, y) = (y, x)   # x = 2, y = 1
> > ```
> >
> > **Manipulasi tuple `get_data`** (slide 15) — membangun tuple baru lewat `+` dengan **singleton** `(t[0],)`, karena tuple immutable:
> >
> > ```python
> > def get_data(aTuple):
> >     """aTuple: tuple of (int, string) tuples
> >     returns (angka terkecil, angka terbesar, jumlah kata unik)"""
> >     nums = ()       # tuple kosong
> >     words = ()
> >     for t in aTuple:
> >         nums = nums + (t[0],)           # singleton tuple
> >         if t[1] not in words:
> >             words = words + (t[1],)
> >     min_n = min(nums)
> >     max_n = max(nums)
> >     unique_words = len(words)
> >     return (min_n, max_n, unique_words)
> >
> > print(get_data(((1, "mine"), (2, "yours"), (3, "mine"))))   # (1, 3, 2)
> > ```
> >
> > **Pola iterasi list** (slide 20) — dua cara menghitung jumlah elemen:
> >
> > ```python
> > L = [4, 5, 6]
> >
> > total = 0
> > for i in range(len(L)):    # iterasi lewat indeks 0..len(L)-1
> >     total += L[i]
> > print(total)               # 15
> >
> > total = 0
> > for i in L:                # iterasi langsung elemen (seperti string)
> >     total += i
> > print(total)               # 15
> > ```
> >
> > **Menghapus elemen: `remove`, `del`, `pop`** (slide 23) — jalankan **berurutan**, tiap langkah memutasi `L`:
> >
> > ```python
> > L = [2, 1, 3, 6, 3, 7, 0]
> > L.remove(2)    # L = [1, 3, 6, 3, 7, 0]
> > L.remove(3)    # L = [1, 6, 3, 7, 0]   (hanya kemunculan pertama)
> > del(L[1])      # L = [1, 3, 7, 0]
> > L.pop()        # mengembalikan 0; L = [1, 3, 7]
> > ```
> >
> > **List of lists dan aliasing** (slide 29-32) — alias, clone, dan nested list:
> >
> > ```python
> > warm = ['red', 'yellow', 'orange']
> > hot = warm                 # alias: menunjuk objek yang sama
> > hot.append('pink')
> > print(warm)                # ['red', 'yellow', 'orange', 'pink']
> >
> > cool = ['blue', 'green']
> > chill = cool[:]            # clone: objek baru
> > chill.append('black')
> > print(cool)                # ['blue', 'green'] -- tidak berubah
> >
> > # nested list: elemen dalam tetap DIBAGI oleh clone dangkal
> > a = [[1, 2], [3]]
> > b = a[:]
> > b[0].append(99)
> > print(a)                   # [[1, 2, 99], [3]] -- side effect tetap terjadi
> > ```
> >
> > **Parallel list dan `get_grade`** (slide 35-36) — info mahasiswa disimpan di beberapa list sejajar:
> >
> > ```python
> > names = ["Anna", "John", "Denise", "Katy"]
> > grade = ["B", "A+", "A", "A"]
> > course = [2.00, 6.0001, 20.0002, 9.01]
> >
> > def get_grade(student, name_list, grade_list, course_list):
> >     i = name_list.index(student)
> >     grade = grade_list[i]
> >     course = course_list[i]
> >     return (course, grade)
> >
> > print(get_grade("John", names, grade, course))   # (6.0001, 'A+')
> > ```
> >
> > Kelemahan pendekatan ini: **berantakan** bila info bertambah, harus **memelihara banyak list** dan mengopernya sebagai argumen, **selalu diindeks dengan integer**, dan harus **mengubah beberapa list sekaligus** agar tetap sinkron. Solusinya: dictionary.
> >
> > **Tiga fungsi analisis lirik** (slide 45-47), termasuk `words_often`:
> >
> > ```python
> > def lyrics_to_frequencies(lyrics):
> >     myDict = {}
> >     for word in lyrics:
> >         if word in myDict:
> >             myDict[word] += 1
> >         else:
> >             myDict[word] = 1
> >     return myDict
> >
> > def most_common_words(freqs):
> >     values = freqs.values()    # iterable, bisa dipakai max()
> >     best = max(values)
> >     words = []
> >     for k in freqs:            # iterasi key dictionary
> >         if freqs[k] == best:
> >             words.append(k)
> >     return (words, best)
> >
> > def words_often(freqs, minTimes):
> >     result = []
> >     done = False
> >     while not done:
> >         temp = most_common_words(freqs)
> >         if temp[1] >= minTimes:
> >             result.append(temp)
> >             for w in temp[0]:
> >                 del(freqs[w])  # memutasi dictionary asli
> >         else:
> >             done = True
> >     return result
> >
> > song = "she loves you yeah yeah yeah she loves you yeah yeah yeah you think you lost your love".split()
> > freqs = lyrics_to_frequencies(song)
> > print(words_often(freqs, 2))
> > # [(['yeah'], 6), (['you'], 4), (['she', 'loves'], 2)]
> > print(freqs)
> > # {'think': 1, 'lost': 1, 'your': 1, 'love': 1}  <- freqs ikut berubah!
> > ```
> >
> > **Gotcha `words_often`**: fungsi ini **memutasi `freqs` milik pemanggil** (side effect) — setelah dipanggil, kata-kata yang lolos ambang sudah terhapus dari dictionary. Bila data asli masih dibutuhkan, oper salinan: `words_often(dict(freqs), 2)`. Perhatikan juga bahwa bila **semua** kata lolos ambang (mis. `minTimes=1`), dictionary menjadi kosong dan `max()` memunculkan `ValueError`.

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
