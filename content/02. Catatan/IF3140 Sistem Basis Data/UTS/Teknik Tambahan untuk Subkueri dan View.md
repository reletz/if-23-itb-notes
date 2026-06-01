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
> > - Apa itu _nested subquery_?
> >     
> > - Apa itu _correlated evaluation_?
> >     
> > - Apa itu _decorrelation_?
> >     
> > - Apa itu _materialized view_?
> >     
> > - Bagaimana _materialized view_ di-maintain?
> >     
> > - Apa itu _incremental view maintenance_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides: 7 - Query Optimization.pdf (Hal. 54-69)
> >     
> 
> > ### Optimisasi Nested Subqueries
> > 
> > Sebuah _nested subquery_ adalah kueri `SELECT` yang berada di dalam klausa `WHERE` atau `FROM` dari kueri lain.
> > 
> > **Contoh:** `SELECT name FROM instructor WHERE EXISTS (SELECT * FROM teaches WHERE instructor.ID = teaches.ID);`
> > 
> > - _**Correlated Evaluation**_: Cara evaluasi yang naif (dan lambat) adalah dengan menjalankan subkueri sekali untuk **setiap baris** dari kueri luar. Variabel dari kueri luar yang digunakan di dalam subkueri (`instructor.ID`) disebut _correlation variable_. Proses ini bisa sangat tidak efisien karena menyebabkan banyak eksekusi berulang dan potensi I/O acak.
> >     
> > - _**Decorrelation**_: Ini adalah proses cerdas di mana optimizer **menulis ulang** kueri yang mengandung _nested subquery_ menjadi kueri dengan `JOIN`. Tujuannya adalah untuk menghindari evaluasi baris-per-baris dan memanfaatkan algoritma join yang efisien. Kueri di atas, misalnya, dapat diubah menjadi `JOIN` antara `instructor` dan `teaches`. Terkadang, proses ini melibatkan pembuatan tabel temporer.
> >     
> > 
> > ### Materialized Views
> > 
> > Berbeda dengan view standar (yang merupakan kueri tersimpan), _materialized view_ adalah sebuah view yang hasilnya **telah dihitung sebelumnya (pre-computed) dan disimpan secara fisik** di disk, layaknya sebuah tabel biasa.
> > 
> > **Kegunaan:** Sangat berguna untuk kueri agregasi yang kompleks atau join mahal yang sering dijalankan. Daripada menghitung ulang setiap saat, aplikasi cukup membaca hasil yang sudah jadi dari _materialized view_, yang jauh lebih cepat.
> > 
> > ### _Materialized View Maintenance_
> > 
> > Tantangan terbesar dari _materialized view_ adalah menjaganya agar tetap _up-to-date_ ketika data di tabel dasarnya berubah. Proses ini disebut _maintenance_.
> > 
> > - **Recomputation:** Cara paling sederhana adalah dengan menghitung ulang seluruh view dari awal secara periodik (misalnya, setiap malam). Ini mudah tetapi bisa sangat lambat.
> >     
> > - _**Incremental View Maintenance**_: Pendekatan yang jauh lebih efisien. Alih-alih menghitung ulang semuanya, sistem hanya menghitung **perubahan (delta)** pada view berdasarkan perubahan (insert, update, delete) pada tabel dasarnya. Misalnya, jika satu baris baru ditambahkan ke tabel dasar, sistem hanya perlu menghitung bagaimana baris baru tersebut mempengaruhi hasil view dan menerapkan perubahan kecil tersebut.
> >     

> [!cornell] #### Summary
> 
> Optimizer menggunakan teknik lanjutan untuk menangani konstruksi SQL yang kompleks. Melalui _**decorrelation**_, ia mengubah _**nested subqueries**_ yang tidak efisien menjadi operasi `JOIN` yang lebih cepat, menghindari evaluasi berulang. Selain itu, optimizer dapat secara signifikan mempercepat kueri yang sering dijalankan dengan memanfaatkan _**materialized views**_—hasil kueri yang sudah dihitung dan disimpan. Agar tetap relevan, view ini dijaga melalui proses _**maintenance**_, di mana _**incremental maintenance**_ menjadi metode yang efisien untuk menerapkan perubahan kecil tanpa perlu komputasi ulang secara penuh.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Cara Kerja _Incremental Maintenance_
> 
> Konsep utamanya adalah menggunakan _differentials_ (himpunan tupel yang ditambahkan ir​ dan yang dihapus dr​).
> 
> - **Untuk Join (**v=r⋈s**):**
>     
>     - Jika ada baris baru di ir​, maka perubahan pada view adalah ir​⋈s. Baris-baris hasil join ini tinggal ditambahkan ke view yang ada.
>         
>     - Jika ada baris yang dihapus di dr​, maka perubahan pada view adalah dr​⋈s. Baris-baris ini dihapus dari view.
>         
> - **Untuk Agregasi (`COUNT`):**
>     
>     - Untuk setiap grup, sistem tidak hanya menyimpan hasil `COUNT`, tetapi juga _metadata_ tambahan.
>         
>     - Saat baris baru masuk, `COUNT` untuk grup yang sesuai akan di-increment.
>         
>     - Saat baris dihapus, `COUNT` akan di-decrement. Jika `COUNT` menjadi 0, baris agregasi untuk grup tersebut akan dihapus dari view.
>         
> - **Untuk Proyeksi (`Π`):**
>     
>     - Karena proyeksi dapat menghasilkan duplikat, sistem perlu menyimpan _sebuah counter_ untuk setiap baris unik di hasil proyeksi. Counter ini melacak berapa banyak baris di tabel asli yang menghasilkan baris proyeksi tersebut. Baris di view hanya akan dihapus jika counternya mencapai nol.
>         
> 
> #### Eksplorasi Mandiri: _Query Rewriting_
> 
> Optimizer modern cukup pintar untuk menggunakan _materialized view_ bahkan jika kueri pengguna tidak secara eksplisit merujuk ke view tersebut. Proses ini disebut _Query Rewriting_.
> 
> **Contoh:**
> 
> 1. Anda membuat materialized view: `CREATE MATERIALIZED VIEW v AS SELECT dept_name, SUM(salary) FROM instructor GROUP BY dept_name;`
>     
> 2. Pengguna menjalankan kueri: `SELECT dept_name, SUM(salary) FROM instructor WHERE dept_name = 'Music' GROUP BY dept_name;`
>     
> 3. Optimizer dapat **menulis ulang** kueri pengguna menjadi: `SELECT * FROM v WHERE dept_name = 'Music';`
>     
> 
> Ini jauh lebih cepat karena kueri kedua hanya memfilter hasil yang sudah ada, bukan melakukan `SUM` dan `GROUP BY` dari awal.