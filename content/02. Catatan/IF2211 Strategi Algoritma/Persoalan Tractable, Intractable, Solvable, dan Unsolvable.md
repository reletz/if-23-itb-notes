_Back to_ [[IF2211 Strategi Algoritma]]

> [!cornell] Persoalan Tractable, Intractable, Solvable, dan Unsolvable
> 
> > ## Questions/Cues
> > 
> > - Definisi Persoalan Tractable
> > - Definisi Persoalan Intractable
> > - Standar Waktu Wajar
> > - Definisi Persoalan Solvable
> > - Definisi Persoalan Unsolvable
> > - Contoh Persoalan Unsolvable
> > - Alan Turing & Kontribusinya
> > - Halting Problem Definisi
> > - Proses Halting Problem
> > - Bukti Halting Problem Unsolvable
> > - Contoh Program Halting/Infinite Loop
> 
> > ### Persoalan Tractable, Intractable, Solvable, dan Unsolvable
> > 
> > **2. Persoalan Tractable vs Intractable** Konsep ini berkaitan dengan apakah sebuah persoalan dapat diselesaikan dalam waktu yang praktis.
> > 
> > - Sebuah persoalan dikatakan **tractable** jika ia dapat diselesaikan dalam **waktu yang wajar (_reasonable time_)**.
> > - Sebuah persoalan dikatakan **intractable** jika ia **tidak dapat diselesaikan dalam waktu yang wajar** seiring dengan bertambahnya ukuran masukan persoalan. Ini berarti, meskipun ada algoritma yang bisa menyelesaikannya, waktu komputasinya akan menjadi terlalu lama untuk masukan yang cukup besar.
> > - Standar yang diterima untuk "waktu yang wajar" dalam ilmu komputer adalah **waktu polinomial** (yaitu, diselesaikan oleh algoritma waktu-polinom). Jadi, persoalan _tractable_ adalah persoalan yang dapat diselesaikan dalam waktu polinomial.
> > 
> > **3. Persoalan Solvable vs Unsolvable** Konsep ini lebih fundamental dan seringkali dikaitkan dengan model komputasi teoritis seperti **Mesin Turing**.
> > 
> > - Sebuah persoalan dikatakan **Solvable**, jika **terdapat mesin Turing yang dapat menyelesaikannya**. Ini berarti ada algoritma (secara teoritis) yang akan selalu memberikan jawaban dan berhenti dalam waktu terbatas. Persoalan ini juga dikenal sebagai persoalan **dapat diputuskan (_decidable_)**.
> > - Sebuah persoalan dikatakan **Unsolvable**, jika **tidak terdapat mesin Turing untuk menyelesaikannya**. Ini berarti tidak ada algoritma universal yang dapat menyelesaikan persoalan ini untuk semua kemungkinan masukan.
> > - Persoalan yang _solvable_ kemudian dibagi lagi menjadi dua kategori yang sudah kita bahas: _Tractable_ dan _Intractable_.
> > - **Adakah persoalan yang _unsolvable_?** Ya, ada. Contoh persoalan _unsolvable_ yang paling terkenal dikemukakan oleh **Alan Turing pada tahun 1963**, yaitu **Halting Problem**. Alan Turing adalah seorang matematikawan, logikawan, kriptanalis, dan ilmuwan komputer asal Inggris yang sangat berpengaruh dalam pengembangan ilmu komputer; ia dianggap sebagai bapak ilmu komputer dan kecerdasan buatan.
> > 
> > **4. Halting Problem**
> > 
> > - **Definisi:** Diberikan sebuah program komputer dan input untuk program tersebut, **tentukan apakah program akan berhenti (halt) dengan input tersebut atau berlanjut bekerja secara tak terbatas (infinite loop)**.
> > - **Misalkan A adalah algoritma** untuk menyelesaikan Halting Problem.
> >     - Algoritma A akan menerima input berupa (i) kode program P dan (ii) input untuk program P, yaitu I.
> >     - Output A(P,I) adalah:
> >         - **1**, jika program P berhenti untuk masukan I.
> >         - **0**, jika program P tidak berhenti (berhenti dalam _infinite loop_).
> > - **Bukti Alan Turing:** Turing membuktikan bahwa **tidak ada algoritma A yang dapat memutuskan apakah program P berhenti ketika dijalankan dengan masukan I itu untuk semua kasus**.
> > - Ini berarti **Halting Problem tidak bisa diselesaikan** dan merupakan **_unsolvable problem_**. Bukti ini adalah salah satu hasil fundamental dalam teori komputasi.
> > - **Contoh program yang berhenti dengan cepat:** `printf("Hello World!");`
> > - **Contoh program yang tidak pernah berhenti (infinite loop):**
> >     
> >     ```c
> >     i = 0;
> >     while (true) {
> >         i = i + 1;
> >     }
> >     ```
> >     

> [!cornell] Summary
> Persoalan diklasifikasikan sebagai **tractable** jika diselesaikan dalam waktu polinomial (wajar), atau **intractable** jika membutuhkan waktu lebih lama. Lebih fundamental, persoalan **solvable** dapat diselesaikan oleh Mesin Turing, sementara **unsolvable** (seperti **Halting Problem** yang dibuktikan oleh Alan Turing) tidak memiliki algoritma penyelesaian universal, karena tidak mungkin menentukan apakah program akan berhenti untuk semua input.