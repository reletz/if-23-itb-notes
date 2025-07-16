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
> > - Mengapa pemilihan urutan join itu sulit?
> >     
> > - Bagaimana Dynamic Programming digunakan untuk optimasi?
> >     
> > - Apa itu Heuristic Optimization?
> >     
> > - Apa itu dekorrelasi (decorrelation)?
> >     
> 
> > ### Pemilihan Rencana Eksekusi
> > 
> > Optimizer tidak bisa mencoba semua kemungkinan rencana eksekusi. Jumlah kemungkinan urutan join (_join order_) untuk `n` tabel bisa mencapai miliaran, sehingga tidak praktis untuk dievaluasi satu per satu. Oleh karena itu, optimizer menggunakan pendekatan yang lebih cerdas.
> >
> > ### Dynamic Programming untuk Join Order
> > 
> > **Dynamic Programming** adalah algoritma utama untuk menemukan urutan join termurah tanpa harus memeriksa semua kemungkinan. Caranya adalah dengan mencari rencana terbaik untuk subset relasi yang kecil terlebih dahulu (misal, `r1 ⋈ r2`), menyimpan biaya dan rencananya, lalu menggunakan hasil tersebut untuk mencari rencana terbaik untuk subset yang lebih besar (misal, `(r1 ⋈ r2) ⋈ r3`). Ini memastikan rencana untuk setiap sub-problem hanya dihitung sekali. Banyak optimizer juga membatasi pencarian hanya pada **left-deep join trees** untuk mengurangi kompleksitas.
> >
> > ### Heuristic Optimization
> > 
> > Sebagai alternatif atau pelengkap dari _cost-based optimization_ yang mahal, sistem dapat menggunakan **Heuristic Optimization**. Ini adalah optimasi berbasis aturan yang umumnya meningkatkan performa, seperti "lakukan seleksi dan proyeksi sedini mungkin" dan "kerjakan operasi yang paling restriktif/selektif terlebih dahulu".
> >
> > ### Topik Lanjutan: Optimasi Subquery
> > 
> > _Nested subquery_ (subquery di dalam klausa `WHERE`) bisa sangat tidak efisien jika dievaluasi berulang kali untuk setiap baris dari query luar. Proses untuk mengubah _nested subquery_ ini menjadi operasi `JOIN` yang ekuivalen disebut **dekorrelasi (decorrelation)**. Sebagian besar optimizer modern akan mencoba melakukan ini secara otomatis.

> [!cornell] #### Summary
> 
> Untuk memilih rencana eksekusi termurah dari miliaran kemungkinan, optimizer menggunakan algoritma cerdas seperti **Dynamic Programming** untuk menemukan urutan join optimal secara efisien, seringkali dengan membatasinya pada **left-deep trees**. Selain itu, optimizer juga menggunakan **Heuristic Optimization** sebagai aturan praktis untuk menyederhanakan query. Teknik-teknik lanjutan seperti **dekorrelasi** subquery juga digunakan untuk mengubah query yang tidak efisien menjadi operasi `JOIN` yang lebih cepat.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Left-Deep vs. Bushy Trees
> 
> - **Left-Deep Tree:** Sebuah rencana join di mana relasi di sebelah kanan dari setiap operator join selalu merupakan tabel asli, bukan hasil dari join perantara. Contoh: `((r1 ⋈ r2) ⋈ r3) ⋈ r4`. Rencana ini lebih mudah dioptimalkan dan sangat cocok untuk _pipelined execution_.
>     
> - **Bushy Tree:** Rencana join yang lebih fleksibel di mana kedua input dari sebuah operator join bisa merupakan hasil dari join perantara. Contoh: `(r1 ⋈ r2) ⋈ (r3 ⋈ r4)`. Ini membuka lebih banyak kemungkinan rencana (beberapa mungkin lebih baik dari semua _left-deep tree_), tetapi ruang pencariannya menjadi jauh lebih besar dan lebih mahal untuk dioptimalkan.
>     
> 
> #### Plan Caching
> 
> Proses optimasi itu sendiri memakan waktu. Untuk query yang sering dijalankan berulang kali (misalnya dengan nilai parameter yang berbeda), banyak sistem database modern menerapkan **Plan Caching**. Setelah sebuah rencana optimal dibuat untuk sebuah query, rencana tersebut disimpan di dalam _cache_. Ketika query yang sama (atau serupa) dieksekusi lagi, sistem bisa langsung menggunakan rencana dari _cache_ tanpa harus melakukan proses optimasi ulang, sehingga menghemat waktu.