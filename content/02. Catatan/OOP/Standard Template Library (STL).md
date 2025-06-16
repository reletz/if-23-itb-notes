---

type: Note

cssclasses:

- cornell-notes

---

_Back to_ [[OOP]]

> [!cornell] Standard Template Library (STL)
> 
> > ## Questions/Cues
> >
> > - Apa motivasi & komponen STL?
> > - Apa itu _Iterators_ dan jenisnya?
> > - Apa itu _Algorithms_?
> > - Apa saja **Sequence Containers** & operasinya?
> > - Apa saja **Associative Containers** & operasinya?
> > - Apa saja **Container Adapters** & operasinya?
> >
> > ## Reference Points
> >
> > - "How to Program in C++" oleh Deitel & Deitel
> > - Website cppreference.com
> > - Tutorial 3
> 
> >
> > ### Motivasi dan Tiga Komponen Utama STL
> > **Motivasi STL** berasal dari pemikiran Alexander Stepanov bahwa algoritma bisa dibuat generik jika ia hanya bergantung pada cara mengakses elemen, bukan pada struktur data spesifiknya. Tujuannya adalah membangun algoritma yang segenerik mungkin tanpa mengorbankan efisiensi.
> >
> > **STL** adalah sebuah library komponen yang terdiri dari tiga pilar utama:
> > 1. **Containers**: Template dari struktur data untuk menyimpan koleksi objek.
> > 2. **Iterators**: Objek yang berperilaku seperti pointer, berfungsi sebagai jembatan untuk mengakses elemen di dalam *container*.
> > 3. **Algorithms**: Fungsi generik (misalnya, `sort()`, `find()`) yang beroperasi pada *container* melalui *iterator*.
> >
> > ### Containers: Wadah Penyimpanan Data
> > *Container* adalah objek yang mengelola koleksi elemen. Ada tiga jenis utama:
> > - **Sequence Containers**: Menyimpan elemen dalam urutan linear. Contoh: `vector`, `deque`, `list`.
> > - **Associative Containers**: Menyimpan elemen (seringkali sebagai pasangan key-value) yang dioptimalkan untuk pencarian cepat. Contoh: `set`, `map`, `multiset`, `multimap`.
> > - **Container Adapters**: Memberikan antarmuka yang lebih terbatas di atas *container* lain untuk menyediakan perilaku spesifik. Contoh: `stack`, `queue`, `priority_queue`.
> >
> > ### Iterators: Jembatan Antar Komponen
> > **Iterator** adalah konsep paling fundamental di STL. Ia adalah sebuah objek yang **mengabstraksi cara mengakses elemen**, memungkinkan algoritma generik untuk bekerja pada *container* apa pun tanpa perlu tahu detail implementasi internalnya. Ia menyediakan antarmuka yang seragam seperti pointer:
> > - `*it`: Mendapatkan nilai elemen yang ditunjuk (dereference).
> > - `it++`: Pindah ke elemen berikutnya.
> > - `it1 == it2`: Membandingkan posisi iterator.
> >
> > Setiap *container* menyediakan method `begin()` (iterator ke elemen pertama) dan `end()` (iterator ke posisi **setelah** elemen terakhir). Algoritma STL bekerja pada rentang `[begin, end)`.
> > ```cpp
> > std::vector<int> numbers = {10, 20, 30};
> > std::vector<int>::iterator it;
> > for (it = numbers.begin(); it != numbers.end(); ++it) {
> > std::cout << *it << " "; // Mengakses nilai melalui iterator
> > }
> > ```
> >
> > #### Jenis-jenis Iterator
> > Iterator dikategorikan berdasarkan kemampuannya, dari yang paling terbatas hingga paling kuat:
> > 1. **Input Iterator**: Hanya bisa **membaca** nilai secara sekuensial dan hanya bisa **maju** (`++`). Setiap elemen hanya dijamin bisa dibaca satu kali.
> > 2. **Output Iterator**: Hanya bisa **menulis** nilai secara sekuensial dan hanya bisa **maju** (`++`).
> > 3. **Forward Iterator**: Gabungan Input dan Output, bisa membaca/menulis dan maju. Bisa melewati urutan data berkali-kali (*multi-pass*).
> > 4. **Bidirectional Iterator**: Seperti *Forward*, ditambah kemampuan untuk bergerak **mundur** (`--`). `std::list`, `std::set`, dan `std::map` mendukung iterator ini.
> > 5. **Random Access Iterator**: Paling kuat. Bisa melakukan semua hal di atas ditambah akses acak (`it + n`, `it[n]`) dalam waktu konstan. `std::vector` dan `std::deque` mendukung iterator ini.
> >
> > ### Algorithms: Prosesor Generik
> > *Algorithm* adalah fungsi global yang beroperasi pada **rentang iterator**, bukan pada *container* secara langsung.
> > - Contoh: `find(iter1, iter2, value)`, `sort(iter1, iter2)`, `binary_search(iter1, iter2, value)`.
> > ### Studi Kasus Mendalam: STL Containers
> >
> > Berikut adalah daftar _container_ yang umum dipakai, dibagi berdasarkan kategorinya.
> >
> > #### Sequence Containers (Urutan Linear)
> >
> > - **`std::vector`**
> >     - **Deskripsi**: Implementasi _dynamic array_ yang paling umum. Menyimpan elemen secara kontigu di memori.
> >     - **Operasi Umum**: `push_back`, `pop_back`, `at`, `[]`, `front`, `back`, `size`, `capacity`, `empty`, `clear`, `insert`, `erase`.
> >     - **Studi Kasus**: Mengelola daftar skor pemain yang bisa bertambah kapan saja.
> >         
> >         C++
> >         
> >         ```
> >         std::vector<int> scores;
> >         scores.push_back(100); // Tambah skor baru
> >         scores.push_back(150);
> >         int first_score = scores[0]; // Akses skor pertama
> >         ```
> >         
> > - **`std::list`**
> >     - **Deskripsi**: Implementasi _doubly-linked list_.
> >     - **Operasi Umum**: `push_front`, `pop_front`, `push_back`, `pop_back`, `insert`, `erase`, `sort`. Tidak mendukung akses acak (`[]`).
> >     - **Studi Kasus**: Mengelola daftar urutan "undo/redo" pada editor teks, di mana penyisipan dan penghapusan di tengah daftar sering terjadi.
> >        
> >         
> >         ```cpp
> >         std::list<std::string> history;
> >         history.push_back("Ketik 'A'");
> >         history.push_back("Ketik 'B'");
> >         history.pop_back(); // Undo aksi terakhir
> >         ```
> >         
> > - **`std::deque`**
> >     - **Deskripsi**: Singkatan dari _double-ended queue_. Mirip `vector` tetapi mendukung penambahan/penghapusan yang efisien di **kedua ujung** (depan dan belakang).
> >     - **Operasi Umum**: `push_front`, `pop_front`, `push_back`, `pop_back`, `[]`, `at`.
> >     - **Studi Kasus**: Implementasi sebuah _buffer_ atau antrian tugas di mana item bisa ditambahkan atau diambil dari kedua sisi.
> >         
> > 
> >         
> >         ```cpp
> >         std::deque<int> tasks;
> >         tasks.push_back(10);  // Tugas biasa
> >         tasks.push_front(99); // Tugas prioritas tinggi
> >         ```
> >         
> >
> > #### Associative Containers (Pencarian Cepat)
> >
> > - **`std::map`**
> >     - **Deskripsi**: Menyimpan pasangan **key-value** unik, diurutkan secara otomatis berdasarkan _key_.
> >     - **Operasi Umum**: `insert`, `erase`, `find`, `[]` (untuk akses/penambahan), `at`.
> >     - **Studi Kasus**: Menyimpan kamus atau data konfigurasi, misalnya nama pengguna dipetakan ke ID pengguna.
> >         
> >        
> >         
> >         ```cpp
> >         std::map<std::string, int> userIDs;
> >         userIDs["alice"] = 101;
> >         userIDs["bob"] = 102;
> >         // int id = userIDs["alice"]; // id akan bernilai 101
> >         ```
> >         
> > - **`std::set`**
> >     - **Deskripsi**: Menyimpan kumpulan **elemen unik** yang terurut.
> >     - **Operasi Umum**: `insert`, `erase`, `find`, `count`.
> >     - **Studi Kasus**: Mencatat daftar tag unik pada sebuah postingan blog, duplikat akan otomatis diabaikan.
> >         
> >         
> >         ```cpp
> >         std::set<std::string> tags;
> >         tags.insert("c++");
> >         tags.insert("stl");
> >         tags.insert("c++"); // Ini akan diabaikan
> >         // if (tags.count("stl")) { /* ... */ } // Cek keberadaan tag
> >         ```
> >         
> >
> > #### Container Adapters (Antarmuka Terbatas)
> >
> > - **`std::stack`**
> >     - **Deskripsi**: Menyediakan antarmuka LIFO (Last-In, First-Out).
> >     - **Operasi Umum**: `push`, `pop`, `top`.
> >     - **Studi Kasus**: Implementasi riwayat navigasi "back" pada browser atau rekursi pada pemanggilan fungsi.
> >         
> >         
> >         ```cpp
> >         std::stack<std::string> page_history;
> >         page_history.push("google.com");
> >         page_history.push("wikipedia.org");
> >         // page_history.pop(); // Kembali ke google.com
> >         ```
> >         
> > - **`std::queue`**
> >     - **Deskripsi**: Menyediakan antarmuka FIFO (First-In, First-Out).
> >     - **Operasi Umum**: `push` (ke belakang), `pop` (dari depan), `front`, `back`.
> >     - **Studi Kasus**: Mensimulasikan antrian cetak (print queue) atau antrian pelanggan di kasir.
> >         
> >      
> >         
> >         ```cpp
> >         std::queue<std::string> print_jobs;
> >         print_jobs.push("document1.pdf");
> >         print_jobs.push("document2.pdf");
> >         // std::string next_job = print_jobs.front();
> >         // print_jobs.pop();
> >         ```
> >         
> > - **`std::priority_queue`**
> >     - **Deskripsi**: Antrian di mana elemen dengan prioritas tertinggi (secara default adalah nilai terbesar) selalu berada di depan.
> >     - **Operasi Umum**: `push`, `pop`, `top`.
> >     - **Studi Kasus**: Penjadwalan tugas di sistem operasi berdasarkan prioritas, atau event dalam simulasi.
> >         
> >         
> >         ```cpp
> >         std::priority_queue<int> tasks_by_priority;
> >         tasks_by_priority.push(10);  // Prioritas rendah
> >         tasks_by_priority.push(50);  // Prioritas sedang
> >         tasks_by_priority.push(99);  // Prioritas tinggi
> >         // int highest_priority_task = tasks_by_priority.top(); // Hasilnya 99
> >         ```
> >         


> [!cornell] #### Summary
> 
> - STL menyediakan berbagai jenis **Containers** untuk kebutuhan penyimpanan yang berbeda: **Sequence** untuk data terurut linear, **Associative** untuk pencarian berbasis kunci yang cepat, dan **Adapters** untuk perilaku spesifik seperti LIFO/FIFO.
> - Setiap _container_ memiliki serangkaian operasi umum yang dioptimalkan untuk struktur datanya, dan pemahaman karakteristik masing-masing (`vector` untuk akses cepat, `list` untuk penyisipan cepat, `map` untuk lookup cepat) sangat penting untuk menulis kode C++ yang efisien.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Unordered Associative Containers (C++11)
> 
> - Sejak C++11, ada versi "unordered" dari `map` dan `set` (`std::unordered_map`, `std::unordered_set`). Mereka menggunakan _hash table_ di belakangnya, bukan pohon biner.
> - **Kelebihan**: Pencarian, penambahan, dan penghapusan memiliki kompleksitas rata-rata **O(1)**, yang secara signifikan lebih cepat daripada O(log n) pada `map`/`set` biasa.
> - **Kekurangan**: Elemen tidak disimpan dalam urutan terurut. Gunakan ini saat kecepatan adalah prioritas utama dan urutan tidak penting.