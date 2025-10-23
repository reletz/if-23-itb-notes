---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Serializability: Menjamin Konsistensi dalam Konkurensi
> 
> > ## Questions/Cues
> > 
> > - Mengapa serializability penting?
> >     
> > - Apa itu instruksi yang berkonflik?
> >     
> > - Apa itu _Conflict Serializability_?
> >     
> > - Kapan dua schedule disebut _conflict equivalent_?
> >     
> > - Apa itu _View Serializability_?
> >     
> > - Apa saja 3 syarat _view equivalent_?
> >     
> > - Bagaimana cara menguji _Conflict Serializability_?
> >     
> > - Apa itu _Precedence Graph_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 17-29
> >     
>
> > ### Apa itu Serializability?
> > 
> > **Serializability** adalah sebuah konsep untuk menjamin bahwa sebuah schedule konkuren (non-serial) akan menghasilkan output dan menjaga konsistensi basis data yang **setara** dengan seolah-olah transaksi-transaksi tersebut dieksekusi secara serial (satu per satu).
> > 
> > Asumsi dasarnya adalah setiap transaksi individu sudah benar dan menjaga konsistensi. Oleh karena itu, eksekusi serial pasti akan menjaga konsistensi. Tujuan kita adalah menemukan schedule konkuren yang aman, yaitu yang _serializable_.
> > 
> > Ada dua jenis utama serializability:
> > 
> > 1. **Conflict Serializability** (lebih ketat, lebih mudah diuji)
> >     
> > 2. **View Serializability** (lebih umum, lebih sulit diuji)
> >     
> > 
> > ### Conflicting Instructions (Instruksi yang Berkonflik)
> > 
> > Dua instruksi dari dua transaksi yang berbeda (Ii​ dari Ti​ dan Ij​ dari Tj​) dikatakan berkonflik jika keduanya mengakses item data **yang sama** (Q), dan **setidaknya salah satu** dari instruksi tersebut adalah operasi `write(Q)`.
> > 
> > ![[Pasted image 20251024032704.png]]
> > 
> > |**Ii​ dari Ti​**|**Ij​ dari Tj​**|**Konflik?**|**Alasan**|
> > |---|---|---|---|
> > |`read(Q)`|`read(Q)`|Tidak|Keduanya hanya membaca, urutan tidak berpengaruh.|
> > |`read(Q)`|`write(Q)`|Ya|Hasil `read` akan berbeda jika urutannya diubah.|
> > |`write(Q)`|`read(Q)`|Ya|Hasil `read` akan berbeda jika urutannya diubah.|
> > |`write(Q)`|`write(Q)`|Ya|Nilai akhir Q akan berbeda jika urutannya diubah.|
> > 
> > ### Conflict Serializability
> > 
> > Sebuah schedule S disebut **conflict serializable** jika ia _conflict equivalent_ dengan sebuah schedule serial.
> > 
> > Dua schedule disebut **conflict equivalent** jika schedule yang satu dapat diubah menjadi schedule yang lain melalui serangkaian penukaran posisi (**swap**) dari instruksi-instruksi yang **tidak berkonflik**.
> > 
> > **Contoh:** Schedule 3 pada slide dapat diubah menjadi Schedule 1 (sebuah schedule serial T1 → T2) dengan menukar instruksi-instruksi yang tidak berkonflik. Oleh karena itu, Schedule 3 adalah _conflict serializable_.
> > 
> > ![[Pasted image 20251024032800.png]]
> > ![[Pasted image 20251024032822.png]]
> > 
> > ### View Serializability
> > 
> > Sebuah schedule S disebut **view serializable** jika ia _view equivalent_ dengan sebuah schedule serial. Konsep ini lebih longgar daripada _conflict serializability_.
> > 
> > Dua schedule S dan S' disebut **view equivalent** jika tiga kondisi berikut terpenuhi:
> > 
> > 1. **Initial Read:** Jika transaksi Ti​ membaca nilai awal dari data Q di schedule S, maka Ti​ juga harus membaca nilai awal Q di schedule S'.
> >     
> > 2. **Reads-From:** Jika transaksi Ti​ membaca nilai Q yang ditulis oleh transaksi Tj​ di schedule S, maka Ti​ juga harus membaca nilai Q yang ditulis oleh Tj​ di schedule S'.
> >     
> > 3. **Final Write:** Transaksi yang melakukan operasi `write(Q)` terakhir di schedule S harus juga menjadi transaksi yang melakukan `write(Q)` terakhir di schedule S'.
> >     
> >     ![[Pasted image 20251024032926.png]]
> > 
> > ### Testing for Conflict Serializability: Precedence Graph
> > 
> > Cara paling efisien untuk menguji apakah sebuah schedule _conflict serializable_ adalah dengan menggunakan **Precedence Graph** (Graf Keterdahuluan).
> > 
> > - **Vertices (Node):** Setiap transaksi dalam schedule direpresentasikan sebagai satu node.
> >     
> > - **Edges (Panah):** Sebuah panah digambar dari Ti​ ke Tj​ jika ada instruksi di Ti​ yang berkonflik dengan instruksi di Tj​, dan instruksi Ti​ tersebut muncul **lebih dulu** dalam schedule.
> >   
> >   ![[Pasted image 20251024033106.png]]
> > 
> > **Aturan Kunci:**
> > 
> > > Sebuah schedule adalah **conflict serializable** jika dan hanya jika **Precedence Graph-nya tidak memiliki siklus (acyclic)**.
> > 
> > Jika grafnya acyclic, urutan serial yang setara dapat ditemukan dengan melakukan _topological sort_ pada graf tersebut. Sebaliknya, jika ada siklus (misalnya, T1​→T2​ dan T2​→T1​), maka schedule tersebut **tidak conflict serializable**.

> [!cornell] #### Summary
> 
> **Serializability adalah properti krusial yang memastikan schedule eksekusi konkuren setara dengan eksekusi serial, sehingga menjaga konsistensi data.** _**Conflict serializability**_**, jenis yang lebih ketat, dapat diuji dengan membangun sebuah** _**Precedence Graph**_**, di mana node adalah transaksi dan panah merepresentasikan konflik. Sebuah schedule dinyatakan** _**conflict serializable**_ **jika dan hanya jika graf tersebut tidak mengandung siklus (acyclic). Sementara itu,** _**view serializability**_ **adalah konsep yang lebih umum namun secara komputasi jauh lebih sulit untuk diuji.**

> [!ad-libitum]- Additional Information
> 
> #### Analogi: Resep Masakan Kolaboratif
> 
> Bayangkan dua orang (T1 dan T2) memasak menggunakan satu mangkuk adonan (data Q).
> 
> - **Konflik Read-Write:** T1 membaca resep (`read`) dan T2 menambahkan gula (`write`). Urutan ini penting. Jika T2 menambahkan gula dulu, T1 akan membaca resep yang berbeda.
>     
> - **Konflik Write-Write:** T1 menambahkan garam (`write`) dan T2 menambahkan gula (`write`). Urutan sangat penting karena akan menentukan rasa akhir adonan.
>     
> - **Precedence Graph:** Jika T1 menambahkan garam sebelum T2 menambahkan gula, kita menggambar panah T1 → T2.
>     
> - **Siklus (Cycle):** Bayangkan T1 perlu menambahkan garam sebelum T2 menambahkan gula (T1 → T2), tetapi di resep lain, T2 harus mencicipi adonan (setelah ada gula) sebelum T1 menambahkan telur (T2 → T1). Ini menciptakan siklus yang mustahil diikuti dan schedule ini tidak akan konsisten.
>     
> 
> #### Mengapa View Serializability Lebih Kompleks?
> 
> _View serializability_ mengizinkan beberapa schedule yang tidak _conflict serializable_ tetapi tetap aman. Contoh klasiknya adalah "blind writes".
> 
> Misalkan schedule-nya: T1: write(Q), T2: write(Q), T3: write(Q).
> 
> Schedule ini tidak conflict serializable karena ada konflik antara T1-T2, T1-T3, T2-T3. Namun, schedule ini view equivalent dengan schedule serial <T1, T2, T3> karena T1 dan T2 melakukan blind write (menulis tanpa membaca terlebih dahulu), dan T3 melakukan final write. Karena pengujiannya harus memeriksa semua kemungkinan schedule serial, biayanya menjadi sangat mahal (eksponensial).
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Topological Sort:** Pelajari algoritma _Topological Sort_ untuk memahami bagaimana urutan eksekusi serial yang ekuivalen dapat diturunkan dari sebuah _precedence graph_ yang acyclic.
>