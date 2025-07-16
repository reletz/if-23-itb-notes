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
> > - Apa itu indeks dan apa dua jenis dasarnya?
> >     
> > - Apa perbedaan Primary dan Secondary Index?
> >     
> > - Apa perbedaan Dense dan Sparse Index?
> >     
> > - Apa kelemahan dari Indeks Terurut sederhana?
> >     
> 
> > ### Konsep Dasar Indexing
> > 
> > **Indeks** adalah sebuah struktur data yang digunakan untuk mempercepat akses ke data yang diinginkan, mirip seperti katalog di perpustakaan. Setiap entri indeks terdiri dari **search-key** (nilai dari kolom yang diindeks) dan **pointer** (penunjuk ke lokasi record data). Secara fundamental, ada dua jenis indeks: **Indeks Terurut (Ordered Index)**, di mana entri disimpan secara terurut, dan **Indeks Hash (Hash Index)**, di mana entri disebar ke dalam "bucket" menggunakan fungsi hash.
> >
> > ### Primary vs. Secondary Index
> > 
> > - **Primary Index (Clustering Index):** Sebuah indeks di mana _search key_-nya menentukan urutan fisik dari record di dalam file. Karena record hanya bisa diurutkan secara fisik dalam satu cara, sebuah tabel **hanya bisa memiliki satu** primary/clustering index.
> >     
> > - **Secondary Index (Non-Clustering Index):** Sebuah indeks di mana urutan _search key_-nya berbeda dari urutan fisik record di dalam file. Sebuah tabel bisa memiliki banyak secondary index.
> >     
> >
> > ### Dense vs. Sparse Index
> > 
> > - **Dense Index:** Berisi entri untuk **setiap nilai search-key** yang ada di dalam file data. _Secondary Index_ harus selalu bersifat _dense_.
> >     
> > - **Sparse Index:** Hanya berisi entri untuk **beberapa nilai search-key** (misalnya, entri untuk setiap blok data). Ini hanya bisa diterapkan pada file yang sudah terurut berdasarkan _search key_ yang sama (yaitu pada _primary index_). _Sparse index_ lebih hemat ruang tetapi umumnya lebih lambat untuk pencarian dibandingkan _dense index_.
> >     
> >
> > ### Multilevel Index dan Kelemahannya
> > 
> > Jika sebuah indeks (terutama _sparse index_) menjadi terlalu besar untuk dimuat ke memori, kita bisa membuat **indeks dari indeks** tersebut, yang disebut **Multilevel Index**. Namun, kelemahan mendasar dari semua struktur indeks terurut sederhana (_index-sequential file_) adalah kinerjanya akan menurun seiring dengan banyaknya operasi _insert_ dan _delete_. Hal ini menciptakan banyak **blok luapan (overflow blocks)** yang mengacaukan urutan dan memperlambat akses, sehingga memerlukan reorganisasi file secara berkala yang memakan biaya.

> [!cornell] #### Summary
> 
> **Indeks** berfungsi mempercepat pencarian data dengan menyimpan pasangan **search-key** dan **pointer**. **Indeks Terurut** menyimpan entri secara terurut dan dibedakan menjadi **Primary (Clustering)** yang urutannya sama dengan data fisik, dan **Secondary (Non-Clustering)** yang urutannya berbeda. Indeks juga bisa bersifat **Dense** (semua key ada) atau **Sparse** (hanya beberapa key). Kelemahan utama dari struktur ini adalah degradasi performa karena **overflow blocks** saat data berubah, yang menjadi motivasi untuk struktur yang lebih dinamis seperti B+-Tree.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Analogi Buku Telepon
> 
> - **Primary Index:** Bayangkan buku telepon di mana nama orang (data) sudah diurutkan secara alfabetis. Urutan buku itu sendiri adalah indeksnya. Anda hanya bisa punya satu urutan utama.
>     
> - **Secondary Index:** Sekarang, bayangkan di halaman belakang buku telepon ada daftar tambahan yang diurutkan berdasarkan _alamat jalan_. Daftar ini (indeks) menunjuk ke halaman di mana nama orang tersebut berada. Urutan berdasarkan alamat ini berbeda dengan urutan utama berdasarkan nama.
>     
> - **Sparse Index:** Alih-alih menulis setiap nama di tepi halaman, Anda hanya menulis nama pertama untuk setiap halaman (misal: "A", "B", "C"). Untuk mencari "Anderson", Anda pergi ke halaman "A" lalu mencari secara sekuensial dari sana.
>     
> - **Dense Index:** Setiap nama di buku telepon ditulis di tepi halaman. Ini tidak praktis untuk buku fisik, tetapi menggambarkan cara kerja dense index pada file data yang tidak terurut.
>