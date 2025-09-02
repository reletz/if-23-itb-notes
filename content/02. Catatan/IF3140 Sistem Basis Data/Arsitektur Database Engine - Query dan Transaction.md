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
> > - Apa saja komponen dari Query Processor?
> >     
> > - Bagaimana alur pemrosesan sebuah query?
> >     
> > - Apa itu transaksi dalam basis data?
> >     
> > - Apa fungsi utama dari Transaction Management?
> >     
> 
> > ### Query Processor
> > ![[Pasted image 20250902115000.png]]
> > 
> > **Query Processor** adalah "otak" dari DBMS yang bertanggung jawab untuk menerjemahkan dan mengeksekusi permintaan data dari pengguna. Ia terdiri dari tiga bagian utama:
> > 
> > - **DDL Interpreter:** Menerjemahkan perintah Data Definition Language (seperti `CREATE TABLE`) dan mencatat definisi skema tersebut ke dalam data dictionary.
> >     
> > - **DML Compiler:** Mengubah pernyataan Data Manipulation Language (seperti `SELECT`, `UPDATE`) menjadi sebuah "evaluation plan" yang berisi instruksi level rendah. Bagian terpentingnya adalah **query optimization**, di mana ia memilih rencana eksekusi dengan estimasi biaya (sumber daya) terendah dari berbagai alternatif yang ada.
> >     
> > - **Query Evaluation Engine:** Komponen yang bertugas menjalankan instruksi level rendah yang telah dioptimalkan yang dihasilkan oleh DML compiler untuk mendapatkan hasil query.
> >     
> >
> > ### Alur Pemrosesan Query
> > 
> > Proses dari sebuah query `SELECT` yang diketik pengguna hingga menghasilkan output mengikuti tiga langkah utama:
> > 
> > 1. **Parsing and Translation:** Query dari pengguna diurai (parsed) dan diterjemahkan menjadi representasi internal yang dipahami oleh sistem, biasanya dalam bentuk ekspresi aljabar relasional.
> >     
> > 2. **Optimization:** Optimizer akan menganalisis berbagai rencana eksekusi yang ekuivalen dan, dengan bantuan data statistik tentang database, memilih satu rencana yang dianggap paling efisien (memiliki biaya terendah). Hasil dari tahap ini adalah sebuah _execution plan_ final.
> >     
> > 3. **Evaluation:** Query Evaluation Engine akan mengambil _execution plan_ yang telah dioptimalkan dan menjalankannya untuk mengambil data dari Storage Manager dan menghasilkan output akhir.
> >  
> >  _Contoh_:
> >  ![[Pasted image 20250902120042.png]]
> >
> > ### Manajemen Transaksi untuk Konsistensi Data
> > 
> > **Transaksi** adalah sebuah kumpulan operasi yang menjalankan satu fungsi logis tunggal dalam aplikasi basis data. Contoh klasiknya adalah transfer uang dari rekening A ke B, yang terdiri dari serangkaian operasi: baca A, kurangi saldo A, tulis A, baca B, tambah saldo B, dan tulis B.
> > 
> > Komponen **Transaction Management** memiliki tugas krusial untuk memastikan basis data tetap dalam keadaan **konsisten (benar)**, bahkan jika terjadi kegagalan sistem (seperti mati listrik) atau kegagalan transaksi itu sendiri. Di dalamnya terdapat **Concurrency-control manager** yang secara spesifik mengatur interaksi antar transaksi yang berjalan bersamaan agar tidak saling mengganggu dan menimbulkan kekacauan data.
> > 
> > ![[Pasted image 20250902115525.png]]

> [!cornell] #### Summary
> 
> Proses query dalam DBMS ditangani oleh **Query Processor**, yang menerjemahkan perintah, melakukan **optimasi** untuk memilih rencana eksekusi termurah, dan mengevaluasi query melalui tiga tahap: **parsing, optimization, dan evaluation**. Di sisi lain, **Transaction Management** bertugas menjaga **konsistensi** data dengan memastikan setiap transaksi (kumpulan operasi logis) bersifat "semua atau tidak sama sekali" serta mengelola akses bersamaan (_concurrency_) agar data tetap akurat, bahkan saat terjadi kegagalan sistem.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### "Biaya" dalam Query Optimization Itu Apa?
> 
> "Biaya" yang dihitung oleh optimizer bukanlah dalam bentuk uang, melainkan estimasi sumber daya komputasi yang akan digunakan. Ini bisa mencakup jumlah I/O (akses disk), penggunaan CPU, dan transfer data jaringan. Akses disk biasanya merupakan komponen biaya yang paling mahal karena paling lambat, sehingga tujuan utama optimasi sering kali adalah untuk meminimalkan jumlah data yang perlu dibaca dari disk.
> 
> #### Properti ACID
> 
> Konsep manajemen transaksi sangat terikat dengan seperangkat prinsip yang dikenal sebagai **ACID**, yang merupakan singkatan dari:
> 
> - **Atomicity:** Sebuah transaksi bersifat "semua atau tidak sama sekali". Jika satu bagian gagal, seluruh transaksi akan dibatalkan (rollback).
>     
> - **Consistency:** Transaksi hanya akan membawa basis data dari satu keadaan valid ke keadaan valid lainnya.
>     
> - **Isolation:** Transaksi yang berjalan bersamaan tidak boleh mengganggu satu sama lain, seolah-olah mereka dieksekusi secara berurutan.
>     
> - **Durability:** Setelah sebuah transaksi berhasil disimpan (commit), hasilnya akan permanen dan bertahan bahkan jika terjadi kegagalan sistem.
>