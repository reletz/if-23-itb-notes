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
> > **Indeks** adalah sebuah struktur data yang digunakan untuk mempercepat akses ke data yang diinginkan, mirip seperti katalog di perpustakaan. Setiap entri indeks terdiri dari **search-key** (nilai dari kolom yang diindeks) dan **pointer** (penunjuk ke lokasi record data). 
> > 
> >  **File Indeks** biasanya _lebih kecil_ ukurannya dibandingkan file utamanya.
> >  
> > Secara fundamental, ada dua jenis indeks: **Indeks Terurut (Ordered Index)**, di mana entri disimpan secara terurut, dan **Indeks Hash (Hash Index)**, di mana entri disebar ke dalam "bucket" menggunakan fungsi hash.
> > 
> > ### Parameter/Metrik Evaluasi Indeks
> > 1. **Tipe Akses yang Didukung (Access Types)**: Seberapa efisien sebuah indeks mendukung berbagai jenis kueri atau cara mengakses data. Dua tipe akses yang paling umum adalah:
> >	- **Pencarian Nilai Spesifik (Point Query):** Mencari record berdasarkan nilai atribut yang tepat. Contoh: `SELECT * FROM mahasiswa WHERE nim = '12345';`
> >	- **Pencarian Rentang Nilai (Range Query):** Mencari record yang nilai atributnya berada dalam rentang tertentu. Contoh: `SELECT * FROM produk WHERE harga BETWEEN 10000 AND 50000;`
> > 
> > 	Sebuah indeks yang baik harus bisa menangani kedua tipe akses ini dengan cepat.
> > 
> > 2. **Waktu Akses (Access Time)**: Waktu yang dibutuhkan untuk menemukan data atau record tertentu menggunakan indeks.
> > 	
> > 3. **Waktu Penyisipan (Insertion Time)**: Waktu yang dibutuhkan untuk menyisipkan (insert) record baru ke dalam tabel dan sekaligus memperbarui struktur indeksnya. Indeks yang kompleks mungkin memerlukan waktu lebih lama untuk penyisipan karena harus menjaga keterurutan dan struktur internalnya.
> > 
> >  4. **Waktu Penghapusan (Deletion Time)** : Waktu yang dibutuhkan untuk menghapus record dari tabel dan juga dari struktur indeks. Sama seperti penyisipan, proses ini juga melibatkan pembaruan pada indeks.
> > 
> >  5. **Overhead Ruang (Space Overhead)** : Ini adalah ruang penyimpanan tambahan yang dibutuhkan oleh file indeks itu sendiri. Setiap indeks yang kita buat akan memakan ruang di disk. Metrik ini mengukur seberapa besar "biaya" ruang yang harus dikeluarkan untuk mendapatkan keuntungan kinerja dari indeks tersebut. Idealnya, kita menginginkan overhead ruang yang sekecil mungkin.
> > 
> > ### Primary vs. Secondary Index
> > ![[Pasted image 20250915144326.png]]
> > - **Primary Index (Clustering Index):** Sebuah indeks di mana _search key_-nya menentukan urutan fisik dari record di dalam file. Karena record hanya bisa diurutkan secara fisik dalam satu cara, sebuah tabel **hanya bisa memiliki satu** primary/clustering index.
> >     
> > - **Secondary Index (Non-Clustering Index):** Sebuah indeks di mana urutan _search key_-nya berbeda dari urutan fisik record di dalam file. Sebuah tabel bisa memiliki banyak secondary index.
> >     
> >
> > ### Dense vs. Sparse Index
> > 
> > - **Dense Index:** Berisi entri untuk **setiap nilai search-key** yang ada di dalam file data. _Secondary Index_ harus selalu bersifat _dense_.
> >	![[Pasted image 20250915145300.png]]
> >     
> > - **Sparse Index:** Hanya berisi entri untuk **beberapa nilai search-key** (misalnya, entri untuk setiap blok data). Ini hanya bisa diterapkan pada file yang sudah terurut berdasarkan _search key_ yang sama (yaitu pada _primary index_). _Sparse index_ lebih hemat ruang tetapi umumnya lebih lambat untuk pencarian dibandingkan _dense index_.
> >     ![[Pasted image 20250915145342.png]]
> > 
> > ### Masalah Utama Ordered Indices: Overflow Blocks
> > - **Efek Operasi Data:** Ketika data baru ditambahkan (`Insert`), dihapus (`Delete`), atau diubah (`Update`), file akan terus bertambah besar. Masalahnya, data harus tetap terurut. Jika sebuah blok data sudah penuh dan ada data baru yang seharusnya masuk ke blok tersebut, data baru itu akan ditempatkan di area khusus yang disebut **overflow block**.
> > 
> > ![[Pasted image 20250916070629.png]]
> > - **Contoh pada Gambar:**
> > 	- Terdapat indeks untuk `dept_name` (Biology, Comp. Sci., dst.) yang menunjuk ke record data pertama untuk setiap departemen.
> > 	- Sebuah data baru (`new inserted tupple`) untuk departemen "Comp. Sci." dengan nama "Gold" ditambahkan.
> > 	- Karena blok data untuk "Comp. Sci." kemungkinan sudah penuh, record baru ini dimasukkan ke dalam _overflow block_. Pointer dari blok utama kemudian akan menunjuk ke blok tambahan ini.
> >        
> >
> > **Konsekuensi: Penurunan Kinerja**
> >
> > - **Peningkatan Random Disk I/O:** Semakin banyak _overflow block_ yang dibuat, semakin banyak pula operasi baca/tulis disk secara acak (_random disk I/O_) yang dibutuhkan.
> > - **Mengapa Ini Terjadi?** Saat kita mencari data (misalnya, semua mahasiswa di "Comp. Sci."), sistem database tidak lagi bisa membaca data secara sekuensial (berurutan) yang cepat. Sebaliknya, ia harus:
> >
> > 	1. Membaca blok data utama.
> > 	      
> > 	2. Mengikuti pointer untuk "melompat" ke _overflow block_.
> > 	      
> > 	3. Jika ada lebih banyak _overflow block_, ia harus melompat lagi.
> >        
> > - Proses "lompat-lompat" antar blok di disk ini jauh lebih lambat daripada membaca satu blok data yang berurutan, sehingga kinerja kueri menurun.
> >  
> > **Solusi: Reorganisasi Periodik**
> > - **Tujuan:** Untuk mengatasi penurunan kinerja, diperlukan **reorganisasi file secara berkala** (_periodic reorganization_).
> > - **Proses:** Reorganisasi pada dasarnya adalah proses membangun kembali file data dan indeksnya. Semua data dari _overflow block_ akan diintegrasikan kembali ke dalam struktur file utama sesuai urutannya.
> > - **Hasil:** Setelah reorganisasi, semua _overflow block_ akan hilang, dan akses data kembali menjadi efisien dan sekuensial. Kinerja kueri pun kembali optimal.
> > 
> > 
> > ### Multilevel Index dan Kelemahannya
> > 
> > ![[Pasted image 20250915145431.png]]
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