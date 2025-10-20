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
> > - Kapan sebaiknya indeks digunakan (dari sisi penulis SQL)?
> >     
> > - Mengapa penggunaan fungsi pada kolom bisa memperlambat query?
> >     
> > - Bagaimana cara menulis ekspresi kondisional yang efisien?
> >     
> > - Mengapa urutan kondisi dalam `AND` dan `OR` penting?
> >     
> 
> > ### Panduan Praktis Index Tuning
> > 
> > Meskipun optimizer DBMS sudah canggih, performa query sangat bergantung pada penulisan SQL yang baik. Indeks adalah teknik optimasi terpenting. Secara umum, buatlah indeks pada kolom-kolom yang:
> > 
> > - Digunakan sendirian dalam klausa `WHERE`, `HAVING`, `GROUP BY`, atau `ORDER BY`.
> >     
> > - Menjadi target fungsi `MAX()` atau `MIN()`.
> >     
> > - Memiliki sebaran data yang tinggi (_high sparsity_ atau banyak nilai unik).
> >     
> > 
> > Namun, perlu diingat bahwa terlalu banyak indeks akan memperlambat operasi `INSERT`, `UPDATE`, dan `DELETE`.
> >
> > ### Tuning Ekspresi Kondisional
> > 
> > Menulis klausa `WHERE` yang efisien sangat krusial. Beberapa praktik terbaiknya adalah:
> > 
> > - **Gunakan Operand Sederhana:** Hindari penggunaan fungsi pada kolom di dalam kondisi. `V_STATE = 'FL'` jauh lebih cepat daripada `UPPER(V_STATE) = 'FL'`, karena pada kasus kedua, indeks tidak bisa digunakan dan fungsi harus dieksekusi untuk setiap baris.
> >     
> > - **Pilih Tipe Data Cepat:** Perbandingan numerik lebih cepat daripada perbandingan karakter atau tanggal. Perbandingan dengan `NULL` cenderung paling lambat.
> >     
> > - **Utamakan Kesetaraan:** Perbandingan `=` lebih cepat daripada `>` atau `<`. Operator `LIKE` dengan wildcard di awal (`%text%`) adalah salah satu yang paling lambat.
> >     
> > - **Hindari Operator `NOT`:** Jika memungkinkan, ubah kondisi `NOT` menjadi ekspresi positifnya. Contoh: `NOT (HARGA > 100)` menjadi `HARGA <= 100`.
> >     
> >
> > ### Urutan Kondisi (Short-Circuit Evaluation)
> > 
> > DBMS mengevaluasi kondisi secara berurutan dan akan berhenti jika hasilnya sudah pasti (prinsip _short-circuit_). Manfaatkan ini dengan:
> > 
> > - **Untuk `AND`:** Letakkan kondisi yang kemungkinan besar bernilai **salah** di paling depan.
> >     
> > - **Untuk `OR`:** Letakkan kondisi yang kemungkinan besar bernilai **benar** di paling depan.
> >     

> [!cornell] #### Summary
> 
> **SQL Performance Tuning** adalah tentang bagaimana programmer menulis query yang "ramah" terhadap optimizer. Ini dicapai melalui dua cara utama: **Index Tuning**, yaitu membuat indeks secara strategis pada kolom-kolom yang sering difilter atau diurutkan, dan **menulis Ekspresi Kondisional yang efisien**, dengan mengutamakan perbandingan sederhana, menghindari fungsi pada kolom, dan menyusun urutan kondisi `AND`/`OR` secara cerdas untuk memanfaatkan _short-circuit evaluation_.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Function-Based Index
> 
> Beberapa DBMS modern seperti Oracle dan SQL Server mendukung **Function-Based Index**. Ini adalah indeks yang dibuat bukan pada kolom mentah, tetapi pada hasil dari sebuah fungsi pada kolom tersebut. Contoh: `CREATE INDEX idx_tahun_inv ON penjualan(YEAR(tgl_invoice));`. Dengan indeks ini, query seperti `WHERE YEAR(tgl_invoice) = 2024` bisa menjadi sangat cepat karena sistem bisa langsung menggunakan indeks tersebut tanpa perlu mengeksekusi fungsi `YEAR()` untuk setiap baris.
> 
> #### SARGable Predicates
> 
> Istilah teknis untuk kondisi `WHERE` yang "ramah" terhadap indeks adalah **SARGable** (_Search ARGument-able_). Sebuah predikat (kondisi) disebut SARGable jika DBMS dapat menggunakan indeks untuk mempercepat eksekusinya. `HARGA = 100` adalah SARGable. `SUBSTRING(NAMA, 1, 1) = 'A'` umumnya tidak SARGable, tetapi `NAMA LIKE 'A%'` adalah SARGable. Tujuan utama dari tuning ekspresi kondisional adalah untuk membuat predikat kita menjadi SARGable.