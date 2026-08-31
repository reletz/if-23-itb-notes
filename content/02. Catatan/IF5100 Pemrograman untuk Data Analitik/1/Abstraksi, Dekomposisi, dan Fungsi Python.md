---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Abstraksi, Dekomposisi, dan Fungsi Python
>
> > ## Questions/Cues
> >
> > - Apa itu abstraksi dan dekomposisi, dan apa analoginya di dunia nyata?
> > - Bagaimana kedua konsep itu diterapkan dalam pemrograman?
> > - Apa fungsi docstring dan apa itu PEP 257?
> > - Apa saja karakteristik sebuah fungsi Python?
> > - Apa yang terjadi pada scope/frame saat fungsi dipanggil?
> > - Apa aturan akses dan modifikasi variabel luar dari dalam fungsi?
> >
> > ## Reference Points
> >
> > - IF5100 — Abstractions and Functions (Slides 3-17)
>
> > ### Abstraksi dan Dekomposisi
> >
> > **Kode yang banyak belum tentu kode yang baik** — produktivitas programmer diukur dari **jumlah fungsionalitas**, bukan baris. **Fungsi** adalah mekanisme untuk mencapai abstraksi dan dekomposisi.
> >
> > **Abstraksi** — analogi TV sebagai *black box*: kita tidak tahu cara kerjanya, tetapi tahu cara memakai antarmukanya. Idenya: **tidak perlu tahu detail cara kerja sesuatu untuk bisa memakainya**.
> >
> > **Dekomposisi** — analogi menampilkan satu gambar besar yang dipecah ke banyak TV: tiap TV menangani bagian berbeda dan menghasilkan output terpisah, tetapi semuanya bekerja sama mencapai satu tujuan. Idenya: **komponen berbeda bekerja sama untuk satu tujuan akhir**.
> >
> > ### Dari Konsep ke Kode: Modul dan Fungsi
> >
> > **Dekomposisi dalam pemrograman**: bagi kode menjadi **modul** yang *self-contained*, dimaksudkan **reusable**, menjaga kode tetap terorganisasi dan koheren. Minggu ini dekomposisi dicapai lewat **fungsi**; beberapa minggu ke depan lewat **class**.
> >
> > **Abstraksi dalam pemrograman**: pandang sepotong kode sebagai *black box* — tidak bisa, tidak perlu, dan tidak ingin melihat detailnya; sembunyikan detail koding yang membosankan. Dicapai lewat **spesifikasi fungsi / docstring**.
> >
> > Keduanya kuat bila dipakai bersama: **kode bisa dipakai berkali-kali tetapi hanya perlu di-debug sekali**.
> >
> > ### Docstring (PEP 257)
> >
> > **Docstring** adalah string dokumentasi tepat di bawah header fungsi yang menjelaskan *apa* yang dilakukan fungsi (spesifikasi), bukan *bagaimana*. Konvensinya diatur **PEP 257** (PEP = *Python Enhancement Proposal*, mekanisme standardisasi di ekosistem Python). Ada gaya sederhana dan gaya **Sphinx** (dengan penanda `:param:`, `:return:`) untuk pembangkitan dokumentasi otomatis.
> >
> > ```python
> > def area(radius):
> >     """Menghitung luas lingkaran.
> >     radius: angka non-negatif (jari-jari)
> >     returns: luas lingkaran sebagai float
> >     """
> >     return 3.14159 * (radius ** 2)
> > ```
> >
> > ### Anatomi dan Karakteristik Fungsi
> >
> > Fungsi adalah potongan kode *reusable*; **tidak dijalankan sampai "dipanggil" (called/invoked)** dalam program. Karakteristiknya:
> >
> > - punya **nama**
> > - punya **parameter** (0 atau lebih)
> > - punya **docstring** (opsional tetapi disarankan)
> > - punya **body**
> > - **mengembalikan sesuatu** (return)
> >
> > ### Variable Scope dan Frame
> >
> > Saat fungsi dipanggil, **formal parameter** di-bind ke nilai **actual parameter** (argumen). Setiap kali masuk ke sebuah fungsi, **scope/frame/environment baru dibuat** — sebuah *scope* adalah **pemetaan nama ke objek**. Nama di dalam frame fungsi terpisah dari nama bernama sama di scope global.
> >
> > ```mermaid
> > flowchart TD
> >     subgraph Global["Global scope"]
> >         G1["z = 3"]
> >         G2["f = objek fungsi"]
> >     end
> >     subgraph FrameF["Frame f (dibuat saat dipanggil)"]
> >         F1["x = 3 (formal param = actual param z)"]
> >         F2["return x + 1"]
> >     end
> >     G2 -->|"panggil f(z)"| FrameF
> >     FrameF -->|"hasil 4"| Global
> > ```
> >
> > ### Aturan Scope dan Nilai None
> >
> > - Dari dalam fungsi, **bisa mengakses** variabel yang didefinisikan di luar.
> > - Dari dalam fungsi, **tidak bisa memodifikasi** variabel yang didefinisikan di luar (assignment di dalam fungsi membuat nama lokal baru).
> > - Bisa memakai variabel global lewat keyword `global`, tetapi **dianggap praktik buruk** (*frowned upon*).
> > - Bila fungsi **tidak punya statement `return`**, Python otomatis mengembalikan **`None`** — merepresentasikan ketiadaan nilai.
> >
> > ### Fungsi sebagai Argumen
> >
> > Karena **"semua di Python adalah objek"** — termasuk fungsi — sebuah argumen bisa bertipe apa pun, **bahkan fungsi lain**. Ini memungkinkan pola seperti mengoper fungsi pembanding atau fungsi transformasi ke fungsi lain (*higher-order function*).

> [!cornell] #### Summary
>
> Produktivitas diukur dari **fungsionalitas**, bukan baris kode; **fungsi** adalah alat untuk **abstraksi** (memakai kode sebagai *black box* tanpa tahu detail — dicapai lewat **docstring/spesifikasi**, konvensi **PEP 257**) dan **dekomposisi** (memecah kode jadi **modul/fungsi** yang *self-contained* dan *reusable*). Manfaat gabungannya: **debug sekali, pakai berkali-kali**. Fungsi punya nama, parameter (0+), docstring opsional, body, dan return. Saat dipanggil, formal parameter di-bind ke argumen dan **frame/scope baru** (pemetaan nama→objek) dibuat. Dari dalam fungsi variabel luar **bisa dibaca tetapi tidak bisa dimodifikasi** (kecuali lewat `global`, yang dihindari); tanpa `return` fungsi mengembalikan **`None`**. Karena fungsi juga objek, ia bisa dioper sebagai argumen.

> [!ad-libitum]- Additional Information
>
> #### LEGB Rule
>
> Resolusi nama Python mengikuti urutan **LEGB**: **L**ocal → **E**nclosing (fungsi pembungkus, untuk closure) → **G**lobal (modul) → **B**uilt-in. Keyword `nonlocal` mengubah nama di scope *enclosing* (berbeda dari `global`).
>
> #### Default, `*args`, `**kwargs`, dan Bahaya Default Mutable
>
> Parameter bisa punya nilai default (`def f(x, n=2)`), argumen posisional variabel (`*args`), dan keyword variabel (`**kwargs`). Hindari default *mutable* seperti `def f(a, acc=[])` — list default dibuat sekali dan dibagi antar pemanggilan; pakai `acc=None` lalu inisialisasi di dalam.
>
> #### Higher-Order Functions dan Type Hints
>
> `map`, `filter`, `sorted(key=...)`, dan `functools.reduce` menerima fungsi sebagai argumen; `lambda` membuat fungsi anonim singkat. *Type hints* (`def area(radius: float) -> float:`) tidak mengubah runtime tetapi membantu tooling seperti `mypy` dan editor.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Refactor sebuah skrip 60 baris tanpa fungsi menjadi 4-5 fungsi kecil ber-docstring PEP 257, lalu ukur berkurangnya duplikasi.
> 2. Tulis fungsi `apply_twice(f, x)` yang menerima fungsi `f` dan mengembalikan `f(f(x))`; uji dengan beberapa fungsi berbeda.
> 3. Telusuri contoh scope global vs fungsi di [pythontutor.com](https://pythontutor.com) dan gambarkan frame-nya sendiri.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 4 (Functions, Scoping, Abstraction).
> - PEP 257 — *Docstring Conventions*; PEP 8 — *Style Guide for Python Code*.
> - MIT OCW 6.0001, *Lecture 4: Decomposition, Abstraction, Functions*.
