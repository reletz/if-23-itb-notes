---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Komputasi, Pengetahuan, dan Bahasa Pemrograman
>
> > ## Questions/Cues
> >
> > - Apa dua hal fundamental yang dikerjakan komputer?
> > - Apa beda declarative knowledge dan imperative knowledge?
> > - Tiga unsur apa yang membentuk sebuah algoritma?
> > - Apa perbedaan syntax, static semantics, dan semantics sebuah bahasa?
> > - Di mana saja kesalahan program bisa muncul dan seberapa mudah dideteksi?
> >
> > ## Reference Points
> >
> > - IF5100 — Python Review (Slides 3-9)
>
> > ### Apa yang Dikerjakan Komputer
> >
> > Secara fundamental komputer hanya melakukan dua hal: **melakukan kalkulasi** dan **mengingat hasil** kalkulasi tersebut. Kapasitasnya besar — misal CPU i5-9500 (8 core) @ 3.00 GHz mampu ~33 GFLOP, dengan ratusan gigabyte penyimpanan — tetapi sifat kerjanya tetap sesederhana itu.
> >
> > Jenis kalkulasi yang bisa dilakukan ada dua: yang **built-in** pada bahasa (operator dan fungsi bawaan), dan yang **didefinisikan oleh programmer**. Poin pentingnya: **komputer hanya tahu apa yang kita beri tahu** — tidak ada "akal sehat" atau pengetahuan implisit.
> >
> > ### Dua Jenis Pengetahuan
> >
> > **Declarative knowledge** adalah pernyataan fakta. Contoh: "akar kuadrat dari bilangan x adalah y sedemikian sehingga `y*y = x`". Ia mendeskripsikan *apa* yang benar, bukan cara memperolehnya.
> >
> > **Imperative knowledge** adalah "resep" atau *how-to* — urutan langkah untuk mencapai suatu hasil. Contoh: *bagaimana* cara menghitung akar kuadrat (mis. metode Heron/Newton). Menulis program pada dasarnya adalah menuangkan imperative knowledge.
> >
> > ### Resep, Algoritma, dan Bahasa
> >
> > Sebuah resep tersusun atas: (1) **sekuens langkah sederhana**, (2) **flow of control** yang menentukan kapan tiap langkah dieksekusi, dan (3) **cara menentukan kapan berhenti**. Gabungan 1 + 2 + 3 = **algoritma**. Resep dirumuskan memakai **bahasa**.
> >
> > ### Aspek Bahasa: Sintaks dan Semantik
> >
> > - **Primitive constructs** — unit terkecil. Bahasa Inggris: kata; bahasa pemrograman: angka, string, operator sederhana.
> > - **Syntax** — kombinasi unit mana yang *well-formed*. `"cat dog boy"` tidak valid secara sintaks; `"cat hugs boy"` valid. Di Python `"hi"5` tidak valid; `3.2*5` valid.
> > - **Static semantics** — di antara string yang sintaktis valid, mana yang *punya makna*. "I are hungry" valid sintaks tetapi salah static semantics. `3 + "hi"` valid sintaks tetapi merupakan **static semantic error**.
> > - **Semantics** — makna yang melekat pada string yang sudah bebas static semantic error. Bahasa alami bisa ambigu ("Flying planes can be dangerous"); bahasa pemrograman **hanya punya satu makna**, walau belum tentu sesuai maksud programmer.
> >
> > ### Di Mana Kesalahan Terjadi
> >
> > ```mermaid
> > flowchart TD
> >     A["Syntactic error"] --> A1["Umum, mudah dideteksi"]
> >     B["Static semantic error"] --> B1["Sebagian bahasa memeriksa sebelum run;<br/>bisa memicu perilaku tak terduga"]
> >     C["Tanpa error, makna beda dari maksud"] --> C1["Program crash / berhenti"]
> >     C --> C2["Program berjalan selamanya"]
> >     C --> C3["Memberi jawaban, tetapi salah"]
> > ```
> >
> > Kategori paling berbahaya adalah yang terakhir: tidak ada pesan error sama sekali, tetapi program melakukan hal berbeda dari yang diinginkan programmer.

> [!cornell] #### Summary
>
> Komputer secara fundamental hanya **menghitung** dan **mengingat hasil**; kalkulasi bisa **built-in** atau **didefinisikan programmer**, dan komputer hanya tahu apa yang diberitahukan. **Declarative knowledge** menyatakan fakta, sedangkan **imperative knowledge** menyatakan resep *how-to* yang menjadi inti pemrograman. Sebuah **algoritma** = sekuens langkah + flow of control + kriteria berhenti, yang dituangkan dalam **bahasa** dengan empat aspek: **primitive constructs**, **syntax**, **static semantics**, dan **semantics**. Kesalahan program muncul sebagai **syntactic error** (mudah ditangkap), **static semantic error** (sebagian bahasa memeriksanya sebelum run), atau **error semantik tersembunyi** — program crash, loop selamanya, atau memberi jawaban salah tanpa peringatan apa pun.

> [!ad-libitum]- Additional Information
>
> #### Turing Completeness dan Stored-Program Computer
>
> Model komputasi modern berakar pada **mesin Turing** (1936). Sebuah bahasa disebut **Turing-complete** bila mampu mensimulasikan mesin Turing — Python, C, bahkan sistem aturan yang sederhana pun memenuhinya. Arsitektur **von Neumann / stored-program** menyimpan instruksi dan data pada memori yang sama, sehingga program bisa memanipulasi program lain (itulah dasar compiler dan interpreter).
>
> #### Interpreter vs Compiler
>
> Python umumnya **diinterpretasikan** (dikompilasi ke bytecode lalu dieksekusi oleh virtual machine), sehingga banyak error baru muncul saat runtime. Bahasa seperti C atau Rust **dikompilasi lebih dulu**, sehingga lebih banyak static semantic error tertangkap sebelum program dijalankan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis dua versi penghitung akar kuadrat: satu memakai `x ** 0.5` (deklaratif lewat operator), satu memakai iterasi Newton-Raphson (imperatif). Bandingkan akurasi dan jumlah langkah.
> 2. Susun 7 potongan kode Python: beberapa memicu `SyntaxError`, satu memicu error runtime, dan satu yang "berhasil jalan" tetapi salah logika. Klasifikasikan tiap kasus ke tiga kategori error di atas.
>
> #### Bacaan Lanjutan
>
> - John V. Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed., MIT Press, 2021 — Bab 1-2.
> - MIT OpenCourseWare 6.0001, *Lecture 1: What is Computation?*
> - Wikipedia: "Algorithm characterizations", "Turing completeness".
