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
> > - Bagaimana cara kerja Hash Index?
> >     
> > - Apa itu bucket dan collision?
> >     
> > - Apa perbedaan Static dan Dynamic Hashing?
> >     
> > - Apa itu Hash File Organization?
> >     
> 
> > ### Konsep Dasar Hash Index
> > 
> > **Hash Index** menggunakan sebuah **fungsi hash** untuk memetakan nilai _search-key_ secara langsung ke sebuah "bucket". Bucket adalah sebuah unit penyimpanan (biasanya satu blok disk) yang berisi entri-entri indeks. Berbeda dengan indeks terurut yang memerlukan penelusuran, hash index bertujuan untuk mendapatkan lokasi data dalam satu kali perhitungan. Metode ini sangat efisien untuk _equality queries_ (misal, `WHERE id = 123`), tetapi tidak mendukung _range queries_ (misal, `WHERE harga > 100`).
> >
> > ### Collision dan Overflow Chaining
> > 
> > **Collision** (tabrakan) terjadi ketika fungsi hash memetakan beberapa _search-key_ yang berbeda ke bucket yang sama. Ketika sebuah bucket menjadi penuh karena _collision_, bucket tambahan yang disebut **overflow bucket** akan digunakan. Bucket-bucket overflow ini kemudian dihubungkan dalam sebuah _linked list_, yang dikenal sebagai **overflow chaining**. Jika terjadi _collision_, sistem harus mencari secara sekuensial di sepanjang rantai bucket tersebut untuk menemukan record yang tepat.
> >
> > ### Static vs. Dynamic Hashing
> > 
> > - **Static Hashing:** Jumlah bucket ditentukan di awal dan bersifat tetap. Kelemahannya adalah jika jumlah data membengkak, _collision_ akan semakin sering terjadi dan menurunkan performa. Jika data menyusut, banyak bucket akan kosong dan membuang-buang ruang.
> >     
> > - **Dynamic Hashing:** Jumlah bucket dapat bertambah atau berkurang seiring dengan perubahan jumlah data. Ketika sebuah bucket meluap, sistem dapat mereorganisasi indeks dengan menambah jumlah bucket. Metode ini lebih fleksibel dan dapat beradaptasi, meskipun implementasinya lebih kompleks.
> >     
> >
> > ### Hash File Organization
> > 
> > Serupa dengan B+-Tree File Organization, **Hash File Organization** adalah sebuah metode di mana fungsi hash digunakan untuk menentukan bucket (blok disk) tempat **record data itu sendiri akan disimpan**, bukan hanya entri indeksnya. Fungsi hash diterapkan pada _search-key_ dari sebuah record untuk secara langsung menentukan di blok mana record tersebut harus ditempatkan.

> [!cornell] #### Summary
> 
> **Hash Index** menggunakan **fungsi hash** untuk memetakan _search-key_ secara langsung ke sebuah **bucket** penyimpanan, yang sangat efisien untuk pencarian kesetaraan (_equality query_). Ketika beberapa key dipetakan ke bucket yang sama, terjadi **collision** yang ditangani dengan **overflow chaining**. _Hashing_ dapat bersifat **Static** (jumlah bucket tetap) atau **Dynamic** (jumlah bucket bisa berubah). Dalam **Hash File Organization**, fungsi hash digunakan untuk menentukan lokasi penyimpanan dari record data secara langsung.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Memilih Fungsi Hash yang Baik
> 
> Kualitas sebuah _hash index_ sangat bergantung pada fungsi hash yang digunakan. Fungsi hash yang ideal memiliki dua properti:
> 
> 1. **Uniform:** Fungsi hash harus menyebarkan key secara merata ke semua bucket. Tidak boleh ada bucket yang cenderung menerima lebih banyak key daripada yang lain.
>     
> 2. **Random:** Efek penyebarannya harus terlihat acak, tidak peduli distribusi asli dari nilai _search-key_. Bahkan jika key yang masuk cenderung berurutan (misal: 100, 101, 102), fungsi hash harus tetap menyebarkannya ke bucket yang berbeda-beda.
>     
> 
> #### Kapan Hash Index Unggul?
> 
> Hash index adalah pilihan yang sangat baik untuk kolom yang sering digunakan dalam klausa `WHERE` dengan operator `=`. Contoh paling umum adalah pencarian berdasarkan _primary key_. Karena _primary key_ unik, pencarian `SELECT * FROM pengguna WHERE user_id = 'xyz'` akan sangat cepat karena fungsi hash akan langsung menunjuk ke satu bucket spesifik. Sebaliknya, B+-Tree akan lebih unggul untuk query seperti `WHERE tanggal_transaksi > '2024-01-01'`.