---

type: Note

cssclasses:

- cornell-notes
    

---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Nested-Loop Join dan variannya?
> >     
> > - Bagaimana cara kerja Merge-Join?
> >     
> > - Apa dua fase utama dalam Hash-Join?
> >     
> > - Apa itu Hybrid Hash-Join?
> >     
> 
> > ### Nested-Loop Join
> > 
> > Ini adalah algoritma join yang paling dasar. Untuk setiap tuple di relasi luar (_outer_), ia akan memindai keseluruhan relasi dalam (_inner_). Algoritma ini sangat mahal tetapi fleksibel karena bisa digunakan untuk semua jenis kondisi join.
> > 
> > Varian yang lebih baik adalah:
> > 
> > - **Block Nested-Loop Join:** Bekerja per blok, bukan per tuple. Untuk setiap blok relasi luar, ia akan memindai semua blok relasi dalam. Ini secara drastis mengurangi I/O disk.
> >     
> > - **Indexed Nested-Loop Join:** Jika ada indeks pada atribut join di relasi dalam, untuk setiap tuple relasi luar, ia akan menggunakan indeks tersebut untuk mencari pasangan secara langsung, menghindari pemindaian penuh.
> >     
> >
> > ### Merge-Join
> > 
> > Algoritma ini hanya bisa digunakan untuk equi-join dan natural join. Syarat utamanya adalah kedua relasi harus sudah terurut pada atribut join. Prosesnya sangat efisien:
> > 
> > 1. Jika belum terurut, kedua relasi diurutkan terlebih dahulu (biasanya dengan _external sort-merge_).
> >     
> > 2. Kedua relasi yang sudah terurut kemudian "digabungkan" (seperti pada fase _merge_ di algoritma sorting) untuk menemukan pasangan yang cocok. Setiap blok hanya perlu dibaca sekali.
> >     
> >
> > ### Hash-Join
> > 
> > Ini adalah algoritma yang sangat efisien untuk equi-join dan terdiri dari dua fase:
> > 
> > 3. **Fase Partisi (Build):** Menggunakan sebuah fungsi hash pada atribut join untuk memecah kedua relasi menjadi beberapa partisi yang lebih kecil. Relasi `r` menjadi `r0, r1, ...` dan `s` menjadi `s0, s1, ...`. Tujuannya adalah agar tuple di `ri` hanya perlu dibandingkan dengan tuple di `si`.
> >     
> > 4. **Fase Pencocokan (Probe):** Untuk setiap pasang partisi `(ri, si)`, partisi yang lebih kecil (misal `si`) dimuat ke memori dan sebuah tabel hash di-build di atasnya. Kemudian, setiap tuple dari partisi `ri` digunakan untuk mencari (probe) pasangan di dalam tabel hash `si` tersebut.
> >     
> >
> > ### Hybrid Hash-Join
> > 
> > Ini adalah optimasi dari Hash-Join standar. Saat melakukan partisi, partisi pertama dari relasi _build_ tidak ditulis ke disk, melainkan langsung disimpan di memori. Ketika relasi _probe_ dipartisi, tuple yang masuk ke partisi pertama bisa langsung dicocokkan dengan yang sudah ada di memori, sehingga menghemat satu siklus tulis-baca disk untuk partisi tersebut.

> [!cornell] #### Summary
> 
> Algoritma untuk operasi `JOIN` meliputi **Nested-Loop Join** yang sederhana namun mahal, **Merge-Join** yang efisien jika data sudah terurut, dan **Hash-Join** yang sangat cepat untuk equi-join dengan menggunakan partisi hash. Varian seperti **Indexed Nested-Loop** memanfaatkan indeks, sementara **Hybrid Hash-Join** mengoptimalkan penggunaan memori untuk mengurangi I/O. Pemilihan algoritma yang tepat oleh optimizer sangat krusial untuk performa query.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Pemilihan Relasi Luar dan Dalam
> 
> Dalam algoritma join asimetris seperti _Nested-Loop_ dan _Hash-Join_, pemilihan relasi mana yang menjadi _outer/probe_ dan mana yang menjadi _inner/build_ sangat penting. Kaidah umumnya adalah memilih **relasi yang lebih kecil sebagai relasi inner/build**. Tujuannya adalah agar relasi yang lebih kecil ini bisa dimuat sebanyak mungkin ke dalam memori. Dalam _Hash-Join_, memuat relasi yang lebih kecil ke dalam memori untuk di-build menjadi tabel hash akan meminimalkan kemungkinan _overflow_ dan _recursive partitioning_.
> 
> #### Materialization vs. Pipelining
> 
> Saat mengevaluasi ekspresi kompleks yang melibatkan beberapa join, DBMS punya dua pilihan: **Materialization**, di mana hasil dari satu join disimpan ke disk sebagai tabel temporer sebelum digunakan untuk join berikutnya. Ini selalu bisa dilakukan tapi mahal. Pilihan kedua adalah **Pipelining**, di mana hasil tuple dari satu join langsung "dialirkan" sebagai input ke operator join berikutnya tanpa disimpan ke disk. Pipelining jauh lebih murah, tetapi tidak semua algoritma join mendukungnya (misal, _merge-join_ dan _hash-join_ standar perlu memproses seluruh inputnya terlebih dahulu sebelum menghasilkan output).