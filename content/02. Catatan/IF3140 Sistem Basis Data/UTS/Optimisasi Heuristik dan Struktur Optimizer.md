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
> > - Apa itu optimisasi heuristik?
> >     
> > - Apa saja aturan-aturan heuristik?
> >     
> > - Kapan pendekatan ini digunakan?
> >     
> > - Bagaimana struktur umum query optimizer?
> >     
> > - Apa itu _plan caching_?
> >     
> > - Bagaimana optimizer menangani kueri yang berbeda kompleksitasnya?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides: 7 - Query Optimization.pdf (Hal. 35-37)
> >     
> 
> > ### Optimisasi Heuristik (Heuristic Optimization)
> > 
> > Optimisasi heuristik adalah pendekatan optimisasi kueri yang menggunakan **aturan praktis (rules of thumb)** untuk mengubah pohon kueri menjadi bentuk yang _kemungkinan besar_ lebih efisien. Pendekatan ini tidak menjamin akan menemukan rencana yang absolut terbaik, tetapi prosesnya jauh lebih cepat dan lebih murah daripada optimisasi berbasis biaya penuh.
> > 
> > Tujuannya adalah untuk mendapatkan rencana yang "cukup baik" dengan cepat, terutama ketika biaya untuk melakukan optimisasi penuh mungkin lebih mahal daripada keuntungan yang didapat.
> > 
> > ### Aturan-Aturan Utama Heuristik
> > 
> > Aturan heuristik yang paling umum didasarkan pada prinsip mengurangi ukuran data perantara secepat mungkin:
> > 
> > 1. **Lakukan Seleksi Sedini Mungkin:** Ini adalah aturan yang paling penting. Dengan menerapkan `WHERE` lebih awal, jumlah baris yang harus diproses oleh operasi selanjutnya (seperti join) berkurang secara signifikan.
> >     
> > 2. **Lakukan Proyeksi Sedini Mungkin:** Dengan membuang kolom yang tidak perlu lebih awal, ukuran setiap baris menjadi lebih kecil. Ini mengurangi jumlah data yang perlu dipindahkan dari disk ke memori dan di antara operator.
> >     
> > 3. **Lakukan Operasi Paling Restriktif Terlebih Dahulu:** Ketika ada beberapa kondisi seleksi atau join, lakukan yang paling selektif (yang menghasilkan hasil terkecil) terlebih dahulu.
> >     
> > 
> > ### Penggunaan Optimisasi Heuristik
> > 
> > Pendekatan heuristik dapat digunakan dalam beberapa cara:
> > 
> > - **Sistem Sederhana:** Beberapa sistem basis data mungkin hanya mengandalkan heuristik sepenuhnya.
> >     
> > - **Pendekatan Hibrida:** Ini yang paling umum. Optimizer menggunakan heuristik untuk melakukan "pembersihan" awal pada pohon kueri (seperti mendorong semua seleksi ke bawah). Setelah itu, untuk tugas yang lebih kompleks seperti _join ordering_, ia akan beralih ke optimisasi berbasis biaya pada pohon yang sudah disederhanakan tersebut.
> >     
> > 
> > ### Struktur Umum Query Optimizer Modern
> > 
> > Optimizer modern sering kali merupakan sistem yang canggih dan berlapis-lapis.
> > 
> > - **Fokus pada Left-Deep Trees:** Banyak yang masih memprioritaskan rencana _left-deep join_ karena efisiensinya dalam pipelining.
> >     
> > - **Rewriting Bertahap:** Prosesnya sering kali berupa penulisan ulang (rewriting) bertahap. Misalnya, satu tahap untuk menyederhanakan subkueri, tahap berikutnya untuk mendorong seleksi, dan tahap akhir untuk optimisasi join berbasis biaya.
> >     
> > - _**Plan Caching**_**:** Optimizer akan menyimpan rencana eksekusi yang telah dibuat. Jika kueri yang sama (atau serupa secara struktural, hanya berbeda nilai literalnya) dieksekusi lagi, sistem dapat menggunakan kembali rencana yang sudah ada tanpa harus menjalankan proses optimisasi lagi. Ini sangat penting untuk performa aplikasi OLTP (Online Transaction Processing).
> >     
> > - **Strategi Adaptif:** Optimizer cukup pintar untuk tidak membuang-buang waktu.
> >     
> >     - Untuk kueri yang sangat sederhana dan murah, ia mungkin hanya akan menggunakan heuristik dasar.
> >         
> >     - Untuk kueri yang kompleks dan mahal yang melibatkan banyak join pada tabel besar, ia akan mendedikasikan lebih banyak waktu untuk melakukan pencarian berbasis biaya yang mendalam.
> >         

> [!cornell] #### Summary
> 
> **Optimisasi heuristik menawarkan alternatif yang cepat untuk optimisasi berbasis biaya dengan menerapkan aturan praktis yang terbukti efektif, seperti melakukan seleksi dan proyeksi sedini mungkin untuk mengurangi volume data. Optimizer modern sering kali menggunakan pendekatan hibrida, di mana heuristik diterapkan untuk penyederhanaan awal sebelum melakukan optimisasi join berbasis biaya yang lebih mahal. Fitur-fitur canggih seperti** _**plan caching**_ **(menyimpan dan menggunakan kembali rencana) dan strategi adaptif (menyesuaikan tingkat optimisasi berdasarkan kompleksitas kueri) sangat penting untuk memastikan performa yang efisien secara keseluruhan.**