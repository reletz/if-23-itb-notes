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
> > - Apa tiga langkah dasar query processing?
> >     
> > - Apa itu evaluation plan?
> >     
> > - Apa komponen biaya utama dalam query?
> >     
> > - Bagaimana biaya query diukur secara sederhana?
> >     
> 
> > ### Tiga Langkah Dasar Query Processing
> > 
> > Proses eksekusi sebuah query di dalam DBMS secara umum dibagi menjadi tiga langkah utama:
> > 
> > 1. **Parsing and Translation:** Query SQL dari pengguna diterjemahkan ke dalam bentuk internal, biasanya ekspresi aljabar relasional. Parser juga akan memeriksa sintaks dan memverifikasi nama-nama relasi.
> >     
> > 2. **Optimization:** Optimizer mencari rencana evaluasi (_evaluation plan_) dengan estimasi biaya terendah dari berbagai alternatif ekspresi yang ekuivalen. Proses ini menggunakan informasi statistik dari katalog database.
> >     
> > 3. **Evaluation:** Query-execution engine mengambil rencana evaluasi yang sudah dioptimalkan, menjalankannya, dan mengembalikan hasil query kepada pengguna.
> >     
> >
> > ### Evaluation Plan
> > 
> > Sebuah **Evaluation Plan** adalah sebuah ekspresi aljabar relasional yang diberi anotasi detail. Anotasi ini mendefinisikan strategi evaluasi secara spesifik, seperti algoritma apa yang harus digunakan untuk setiap operasi (misal, menggunakan _index scan_ atau _linear scan_).
> >
> > ### Pengukuran Biaya Query
> > 
> > Biaya sebuah query umumnya diukur sebagai total waktu yang dibutuhkan untuk menjawab query tersebut. Dari berbagai faktor seperti akses disk, CPU, dan jaringan, **akses disk adalah komponen biaya yang paling dominan**. Oleh karena itu, estimasi biaya biasanya berfokus pada aktivitas disk.
> > 
> > Secara sederhana, biaya diukur berdasarkan:
> > 
> > - **Jumlah transfer blok (b):** Berapa banyak blok yang harus dibaca/ditulis dari/ke disk.
> >     
> > - **Jumlah seek (S):** Berapa kali lengan disk harus bergerak.
> >     
> > 
> > Biaya CPU dan biaya untuk menulis hasil akhir ke disk seringkali diabaikan dalam formula estimasi untuk menyederhanakan perhitungan.

> [!cornell] #### Summary
> 
> **Query Processing** terdiri dari tiga langkah: **Parsing/Translation** (mengubah SQL ke aljabar relasional), **Optimization** (memilih _evaluation plan_ termurah), dan **Evaluation** (menjalankan rencana tersebut). Biaya sebuah _evaluation plan_ diukur terutama berdasarkan **biaya akses disk**, yang disederhanakan menjadi jumlah **transfer blok** dan **seek** yang dibutuhkan untuk mengeksekusi rencana tersebut.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Mengapa Biaya CPU Diabaikan?
> 
> Dalam sistem database tradisional, waktu yang dibutuhkan untuk operasi mekanis pada disk (_seek time_ ~milidetik) jauh lebih besar daripada waktu untuk operasi CPU (_clock cycle_ ~nanodetik). Perbedaannya bisa mencapai ribuan hingga jutaan kali lipat. Oleh karena itu, mengoptimalkan jumlah I/O disk memberikan dampak performa yang jauh lebih besar daripada mengoptimalkan beberapa siklus CPU. Namun, dengan munculnya _in-memory database_ di mana semua data berada di RAM, biaya CPU menjadi jauh lebih relevan dalam estimasi biaya.
> 
> #### Worst-Case Estimation
> 
> Saat menghitung biaya, optimizer seringkali menggunakan estimasi kasus terburuk (_worst-case_). Misalnya, ia akan mengasumsikan bahwa tidak ada blok yang dibutuhkan sudah tersedia di buffer memori dan semuanya harus dibaca dari disk. Ini dilakukan karena status buffer saat query dijalankan sangat dinamis dan sulit diprediksi. Menggunakan _worst-case_ memberikan jaminan batas atas performa yang lebih dapat diandalkan.