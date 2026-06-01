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
> > - Apa langkah pertama sebelum melakukan tuning desain?
> >     
> > - Apa itu indeks dan mengapa ia mempercepat query?
> >     
> > - Apa saja metode yang digunakan dalam schema tuning?
> >     
> > - Apa itu denormalisasi dan kapan digunakan?
> >     
> 
> > ### Langkah Awal: Memahami Workload
> > 
> > Sebelum memutuskan untuk membuat indeks atau mengubah skema, langkah pertama yang krusial adalah **memahami workload** sistem. Ini berarti kita harus mengetahui: query dan update mana yang paling penting dan paling sering muncul, serta performa seperti apa yang diharapkan dari operasi-operasi tersebut. Analisis workload ini melibatkan identifikasi relasi, atribut, dan kondisi seleksi/join yang paling sering digunakan.
> >
> > ### Index Tuning: Membuat Jalan Pintas
> > 
> > **Indeks** adalah sebuah struktur data terpisah yang berfungsi untuk mempercepat akses ke data, mirip seperti katalog pengarang di perpustakaan yang menghindarkan kita dari memeriksa setiap buku satu per satu. Indeks berisi `search-key` (nilai dari kolom yang diindeks) dan `pointer` (penunjuk ke lokasi baris data asli). Dengan menggunakan indeks, operasi **pencarian, pengurutan, dan join** dapat dilakukan secara efisien tanpa harus melakukan _full table scan_, karena file indeks jauh lebih kecil dari file data aslinya.
> > 
> > ![[Pasted image 20250905091203.png]]
> > 
> > ### Schema Tuning: Memodifikasi Struktur
> > 
> > **Schema Tuning** adalah proses memodifikasi desain skema logis untuk memenuhi target performa. Pilihan skema tidak hanya dipandu oleh isu redundansi (normalisasi), tetapi juga oleh workload. Beberapa teknik yang umum digunakan adalah:
> > 
> > - **Splitting Tables (Dekomposisi):** Memecah satu tabel menjadi beberapa tabel, baik secara **horizontal** (memisahkan baris, misal: tabel transaksi aktif dan tabel arsip) maupun **vertikal** (memisahkan kolom, misal: tabel data login dan tabel profil pengguna).
> >     
> > - **Denormalization:** Sebuah proses yang secara sengaja "melanggar" aturan normalisasi untuk meningkatkan performa. Ini adalah kebalikan dari dekomposisi, di mana kita mungkin **menggabungkan tabel** atau **menambahkan kolom redundan** untuk menghilangkan kebutuhan operasi `JOIN` yang mahal.
> >     

> [!cornell] #### Summary
> 
> Tuning pada level desain dimulai dengan **memahami workload** untuk mengidentifikasi operasi paling krusial. Berdasarkan pemahaman ini, dua strategi utama dapat diterapkan: **Index Tuning**, yaitu membuat struktur data "jalan pintas" untuk mempercepat pencarian tanpa _full scan_, dan **Schema Tuning**, yang melibatkan modifikasi struktur tabel melalui teknik seperti **dekomposisi** (memecah tabel) atau **denormalisasi** (menggabungkan tabel atau menambah kolom redundan) untuk mengoptimalkan performa query.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Trade-off Indeks
> 
> Meskipun indeks mempercepat query `SELECT`, ia memiliki biaya. Setiap operasi `INSERT`, `UPDATE`, atau `DELETE` pada tabel akan menjadi sedikit lebih lambat karena sistem tidak hanya harus mengubah data di tabel, tetapi juga harus memperbarui struktur indeks yang terkait. Oleh karena itu, menambahkan terlalu banyak indeks pada tabel yang sangat sering di-update (_workload_ OLTP) bisa jadi kontra-produktif.
> 
> #### Kapan Denormalisasi Menjadi Pilihan?
> 
> Denormalisasi umumnya dipertimbangkan dalam sistem _data warehousing_ atau aplikasi _read-heavy_ (lebih banyak membaca daripada menulis). Contoh: pada sebuah situs e-commerce, daripada harus melakukan `JOIN` ke tabel kategori setiap kali menampilkan nama produk, lebih baik menyimpan nama kategori secara redundan di tabel produk. Ini sedikit menambah biaya penyimpanan dan kompleksitas update, tetapi secara drastis mempercepat query penampilan produk yang terjadi ribuan kali per detik.