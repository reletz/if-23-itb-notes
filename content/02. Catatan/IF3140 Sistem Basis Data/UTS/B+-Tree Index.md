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
> > - Apa keunggulan B+-Tree dari indeks sekuensial?
> >     
> > - Apa saja komponen dan aturan dari B+-Tree?
> >     
> > - Seberapa efisien pencarian di B+-Tree?
> >     
> > - Apa itu B+-Tree File Organization?
> >     
> 
> > ### Keunggulan B+-Tree
> > 
> > **B+-Tree** adalah alternatif modern untuk _indexed-sequential files_ yang mengatasi masalah utama degradasi performa. Keunggulan utamanya adalah B+-Tree secara otomatis **mereorganisasi dirinya sendiri** melalui perubahan kecil dan lokal saat terjadi _insert_ dan _delete_. Ini menghilangkan kebutuhan untuk reorganisasi file secara keseluruhan, sehingga performa tetap terjaga meskipun file terus bertambah.
> >
> > ### Struktur dan Aturan B+-Tree
> > 
> > ![[Pasted image 20250916072239.png]]
> > 
> > B+-Tree adalah sebuah pohon (_tree_) yang seimbang, terdiri dari:
> > 
> > - **Root Node:** Node paling atas.
> >     
> > - **Internal Nodes:** Node perantara yang berisi _search-key_ dan penunjuk ke node level di bawahnya.
> >     
> > - **Leaf Nodes:** Node paling bawah yang berisi _search-key_ dan penunjuk ke record data asli. Semua leaf node terhubung satu sama lain dalam sebuah _linked list_ untuk mendukung _range query_.
> >     
> > 
> > Aturan utamanya adalah semua jalur dari root ke leaf memiliki panjang yang sama, dan setiap node (kecuali root) harus terisi setidaknya setengahnya. Ini memastikan pohon tetap seimbang.
> >
> > ### Efisiensi Pencarian dan Operasi
> > 
> > Pencarian pada B+-Tree sangat efisien. Karena pohonnya lebar dan pendek, jumlah node yang perlu diakses sangat sedikit. Misalnya, untuk sebuah tabel dengan 1 juta record, pencarian mungkin hanya memerlukan akses ke 4 node (blok disk).
> > 
> > Operasi _insert_ dan _delete_ ditangani melalui mekanisme **split** (jika node penuh) dan **merge** (jika node kurang dari setengah penuh). Mekanisme ini memastikan pohon tetap mematuhi aturan dan seimbang setelah setiap perubahan.
> >
> > ### B+-Tree File Organization
> > 
> > Ini adalah variasi di mana **leaf node dari B+-Tree menyimpan record data itu sendiri**, bukan hanya penunjuk. Dengan kata lain, data file diorganisir langsung dalam struktur B+-Tree. Ini memastikan data tetap terurut secara fisik (_clustered_) bahkan setelah banyak terjadi penyisipan dan penghapusan, yang sangat baik untuk performa.

> [!cornell] #### Summary
> 
> **B+-Tree** adalah struktur data indeks dinamis yang secara otomatis menjaga keseimbangannya melalui mekanisme **split dan merge**, sehingga mengatasi masalah degradasi performa pada indeks sekuensial. Strukturnya yang lebar dan pendek memungkinkan **pencarian yang sangat efisien** dengan akses disk minimal. Dalam **B+-Tree File Organization**, record data disimpan langsung di _leaf node_, menjadikannya metode yang sangat baik untuk menjaga data tetap terurut secara fisik (_clustered_).

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa B+-Tree, Bukan B-Tree?
> 
> Anda mungkin pernah mendengar tentang B-Tree. Perbedaan utamanya adalah pada B-Tree, pointer ke data bisa ada di _internal node_ maupun _leaf node_. Sedangkan pada B+-Tree, **semua pointer ke data hanya ada di leaf node**. Desain ini memberikan dua keuntungan besar:
> 
> 1. **Kapasitas Internal Node Lebih Besar:** Karena _internal node_ hanya menyimpan _search-key_, mereka bisa menampung lebih banyak penunjuk, membuat pohon menjadi lebih lebar dan lebih pendek, yang berarti lebih sedikit I/O.
>     
> 2. **Range Scan yang Efisien:** Karena semua data ada di level _leaf_ dan _leaf node_ terhubung dalam _linked list_, melakukan _range query_ (misalnya, `WHERE harga BETWEEN 100 AND 200`) menjadi sangat cepat, cukup dengan menelusuri _linked list_ tersebut.
>     
> 
> #### Fanout
> 
> "Lebar" dari sebuah B+-Tree disebut sebagai **fanout**, yaitu jumlah maksimum anak yang bisa dimiliki oleh sebuah node. _Fanout_ yang tinggi adalah kunci efisiensi B+-Tree. Jika satu node berukuran 4 KB dan setiap entri indeks (key + pointer) berukuran 40 byte, maka _fanout_-nya adalah 4096 / 40 ≈ 100. _Fanout_ yang tinggi inilah yang membuat tinggi pohonnya sangat pendek.