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
> > - Apa saja algoritma untuk operasi seleksi?
> >     
> > - Bagaimana cara kerja External Sort-Merge?
> >     
> > - Bagaimana algoritma untuk operasi kompleks (AND, OR, NOT)?
> >     
> 
> > ### Algoritma Operasi Seleksi
> > 
> > Operasi seleksi (`SELECT`) dapat dieksekusi dengan beberapa algoritma, tergantung pada kondisi dan ketersediaan indeks:
> > 
> > - **A1 (Linear Search):** Algoritma paling dasar yang memindai setiap blok file dan menguji setiap record. Ini bisa diterapkan pada kondisi apa pun tetapi merupakan yang paling lambat.
> >     
> > - **A2 (Primary Index, Equality on Key):** Menggunakan indeks primer untuk mengambil satu record unik. Sangat cepat.
> >     
> > - **A3 (Primary Index, Equality on Non-key):** Menggunakan indeks primer untuk mengambil beberapa record yang cocok. Karena data terurut secara fisik, record-record ini akan berada di blok yang berurutan.
> >     
> > - **A4 (Secondary Index, Equality):** Menggunakan indeks sekunder. Jika banyak record yang cocok, ini bisa sangat mahal karena setiap record mungkin berada di blok disk yang berbeda, menyebabkan banyak I/O acak.
> >     
> > - **A5 & A6 (Index for Comparison):** Menggunakan indeks (primer atau sekunder) untuk menemukan titik awal dari sebuah perbandingan (`<` atau `>`) lalu memindai dari sana. Untuk indeks sekunder, ini bisa lebih mahal daripada _linear scan_ jika banyak record yang cocok.
> >     
> >
> > ### Algoritma untuk Seleksi Kompleks
> > 
> > - **Konjungsi (AND):** Untuk kondisi `θ1 AND θ2`, optimizer akan memilih algoritma termurah untuk salah satu kondisi, mengambil hasilnya ke memori, lalu menerapkan kondisi lainnya pada hasil tersebut. Jika ada indeks untuk beberapa kondisi, ia bisa mengambil semua pointer record yang cocok dari setiap indeks lalu melakukan **irisan (intersection)**.
> >     
> > - **Disjungsi (OR):** Untuk kondisi `θ1 OR θ2`, jika semua kondisi memiliki indeks, sistem dapat mengambil pointer dari setiap indeks dan melakukan **gabungan (union)**. Jika tidak, _linear scan_ harus digunakan.
> >     
> > - **Negasi (NOT):** Hampir selalu memerlukan _linear scan_.
> >     
> >
> > ### Algoritma Sorting: External Sort-Merge
> > 
> > Ketika data yang perlu diurutkan tidak muat di dalam memori, algoritma **External Sort-Merge** digunakan. Prosesnya terdiri dari dua fase:
> > 
> > 1. **Create Runs:** Sistem membaca sebagian data (sebanyak yang muat di memori), mengurutkannya di dalam memori, lalu menulisnya kembali ke disk sebagai "run" (segmen terurut) sementara. Proses ini diulang hingga semua data telah menjadi bagian dari sebuah run.
> >     
> > 2. **Merge Runs:** Sistem membaca blok pertama dari setiap run ke dalam buffer input, lalu secara berulang memilih record terkecil dari semua buffer, menuliskannya ke buffer output, dan melanjutkan hingga semua run tergabung menjadi satu file akhir yang terurut.
> >     

> [!cornell] #### Summary
> 
> Algoritma untuk **operasi seleksi** bervariasi dari **linear scan** yang lambat hingga penggunaan **indeks primer dan sekunder** yang cepat untuk pencarian kesetaraan dan perbandingan. Untuk seleksi kompleks, operasi **AND** dapat menggunakan irisan pointer dari beberapa indeks, sementara **OR** menggunakan gabungan. Untuk mengurutkan data yang besar, algoritma **External Sort-Merge** digunakan dengan cara membuat segmen-segmen terurut (_runs_) terlebih dahulu, lalu menggabungkannya menjadi satu hasil akhir.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Kapan Linear Scan Lebih Baik?
> 
> Meskipun terdengar tidak efisien, ada kalanya _linear scan_ lebih cepat daripada menggunakan _secondary index_. Ini terjadi ketika query Anda sangat tidak selektif, artinya ia mengembalikan sebagian besar baris dari tabel (misalnya, `WHERE status = 'AKTIF'` di mana 95% data berstatus aktif). Menggunakan _secondary index_ dalam kasus ini akan menyebabkan "lompatan" acak ke seluruh disk untuk mengambil setiap record satu per satu, yang totalnya lebih lambat daripada membaca seluruh tabel secara berurutan.
> 
> #### Biaya External Sort-Merge
> 
> Biaya utama dari _external sort-merge_ adalah jumlah transfer blok. Pada fase pertama (_create runs_), seluruh relasi dibaca dan ditulis kembali sekali (2 * br blok transfer, di mana br adalah jumlah blok relasi). Pada fase kedua (_merge_), seluruh relasi dibaca lagi. Jika jumlah _runs_ lebih banyak dari jumlah buffer memori yang tersedia, beberapa _merge pass_ mungkin diperlukan, yang masing-masing akan membaca dan menulis kembali seluruh relasi.