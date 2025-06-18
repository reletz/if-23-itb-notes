_Back to_ [[IF2211 Strategi Algoritma]]

> [!cornell] Hubungan P, NP, NP-Complete, dan NP-Hard
> 
> > ## Questions/Cues
> > 
> > - Hubungan P dan NP (Venn Diagram)
> > - Kemungkinan P=NP atau P≠NP
> > - Pentingnya Masalah P vs NP
> > - Status P vs NP Saat Ini
> > - Persoalan di luar NP
> > - Millennium Prize Problems
> > - Definisi NP-Complete (NPC)
> > - Konsekuensi NPC (Solve One, Solve All)
> > - Properti NP-Complete (Reduksi)
> > - Langkah Pembuktian Z adalah NPC
> > - Contoh Pembuktian TSDP adalah NPC (HCP Reduksi)
> > - Daftar Persoalan NP-Complete
> > - Definisi NP-Hard
> > - Hubungan NPC & NP-Hard
> > - Contoh NP-Hard (Optimasi)
> 
> > ### Hubungan P, NP, NP-Complete, dan NP-Hard
> > 
> > **11. Hubungan antara P dan NP**
> > 
> > - **P adalah himpunan bagian dari NP, atau P⊆NP**.
> > - Ini karena **setiap persoalan keputusan yang kompleksitas waktunya polinomial solusinya juga dapat diverifikasi dalam waktu polinomial**. Pada dasarnya, dalam persoalan P, tidak ada tahap menerka; komputasi itu sendiri sudah bersifat polinomial, sehingga verifikasi (yang hanya perlu menjalankan komputasi) juga polinomial.
> > - Diagram Venn biasanya menggambarkan P di dalam NP.
> > - P⊆NP mengindikasikan dua kemungkinan:
> >     1. **P=NP** (subset yang tidak pantas/improper subset): Berarti setiap persoalan yang solusinya dapat diverifikasi dengan cepat juga dapat dipecahkan dengan cepat.
> >     2. **P=NP** (atau P⊂NP, proper subset): Berarti ada persoalan yang solusinya dapat diverifikasi dengan cepat, tetapi tidak dapat dipecahkan dengan cepat.
> > - **Tidak seorang pun pernah membuktikan bahwa P=NP atau P=NP**. Ini adalah **salah satu pertanyaan penting dan belum terpecahkan dalam ilmu komputer**. Ini adalah "Holy Grail" dari ilmu komputer teoritis.
> > - Pertanyaan ini sangat penting karena **kebanyakan persoalan keputusan yang kita hadapi adalah NP**. Jika P=NP terbukti, maka banyak persoalan keputusan yang saat ini dianggap sulit (membutuhkan waktu eksponensial) **dapat dipecahkan secara efisien dengan algoritma waktu-polinomial**.
> > - Namun, karena banyak ahli telah **gagal menemukan algoritma waktu-polinomial untuk persoalan NP**, cukup aman untuk **mengasumsikan saat ini bahwa P=NP**.
> > - **Adakah persoalan yang tidak termasuk ke dalam NP?** Ya, ada, yaitu **persoalan _unsolvable_**, contohnya Halting Problem.
> > - **Masalah P versus NP** adalah salah satu dari **tujuh Millennium Prize Problems** yang dipilih oleh Clay Mathematics Institute, dengan hadiah US$1.000.000 untuk solusi pertama yang benar. Masalah ini diperkenalkan pada tahun 1971 oleh Stephen Cook. Secara informal, ini bertanya apakah setiap persoalan yang solusinya dapat diverifikasi dengan cepat oleh komputer (NP) juga dapat dipecahkan dengan cepat oleh komputer (P).
> > 
> > **12. Kelas Persoalan NP-Complete (NPC)**
> > 
> > - **NP-Complete (NPC)** adalah **persoalan NP yang paling menarik perhatian** karena mereka adalah "yang paling sulit" dalam kelas NP.
> > - **Definisi NPC:** Sebuah persoalan X dikatakan NPC jika:
> >     1. X termasuk ke dalam kelas **NP**.
> >     2. **Setiap persoalan di dalam NP dapat direduksi menjadi X dalam waktu polinomial**. (Reduksi dalam waktu polinomial berarti sebuah _instance_ dari persoalan NP dapat ditransformasikan menjadi _instance_ dari persoalan X dalam waktu polinomial sedemikian rupa sehingga solusi untuk _instance_ X dapat digunakan untuk menentukan solusi untuk _instance_ persoalan NP asli).
> > - **Konsekuensi dari definisi ini:** Jika kita dapat menemukan algoritma dengan waktu polinomial untuk menyelesaikan **satu persoalan X yang NPC**, maka kita dapat memecahkan **semua persoalan di dalam kelas NP dalam waktu polinomial**.
> > - Ini asal nama "NP-Complete" dari "Nondeterministic Polynomial" dan "Complete - “Solve one, Solve them all”".
> > - **Properti NP-Complete:**
> >     1. Persoalan X adalah NPC jika sembarang persoalan lain di dalam NP dapat direduksi (ditransformasikan) menjadi X dalam waktu polinomial.
> >     2. Dua persoalan sembarang di dalam NPC dapat ditransformasikan satu sama lain dalam waktu polinomial. Yaitu, X dapat ditransformasi menjadi Y dalam waktu polinomial, dan Y dapat ditransformasi menjadi X dalam waktu polinomial.
> > - **Cara termudah untuk membuktikan sebuah persoalan baru Z adalah NPC** adalah dengan **menemukan sebuah algoritma dalam waktu polinomial untuk mentransformasikan sebuah persoalan Y yang sudah dikenal NPC menjadi persoalan Z**.
> > - **Langkah-langkah untuk menunjukkan Z adalah NPC:**
> >     1. Tunjukkan bahwa Z adalah anggota NP.
> >     2. Pilih Y yang sesuai dari koleksi persoalan NPC yang sudah diketahui.
> >     3. Tunjukkan sebuah algoritma dalam waktu polinomial untuk mentransformasikan _instance_ persoalan Y menjadi _instance_ persoalan Z.
> > - **Contoh Pembuktian TSDP adalah NPC:**
> >     - Kita pilih persoalan Sirkuit Hamilton (HCP, Hamiltonian Circuit Problem) sebagai Y, karena HCP adalah persoalan yang sudah dikenal sebagai NPC. Z adalah TSDP.
> >     - Persoalan HCP: Diberikan sebuah graf G dengan n simpul, apakah graf tersebut mengandung sirkuit Hamilton?
> >     - Untuk mentransformasikan _instance_ HCP (graf G) menjadi _instance_ TSDP:
> >         1. Setiap sisi di dalam graf G diberi nilai (bobot) 1.
> >         2. Nyatakan persoalannya menjadi TSDP: Adakah tur dengan total bobot ≤n? (Sirkuit Hamilton melalui setiap simpul tepat sekali, jadi total n simpul; tur di TSDP mengunjungi n simpul dan kembali ke asal. Jika semua bobot 1, total bobot tur = n jika ada sirkuit Hamilton).
> >     - Transformasi ini (memberi bobot 1 ke setiap sisi) membutuhkan waktu polinomial, yaitu O(m) di mana m adalah jumlah sisi dalam graf G. Algoritmanya adalah mengulang sebanyak m kali untuk menetapkan bobot 1 pada setiap sisi.
> >     - Dengan transformasi ini, persoalan HCP sudah ditransformasi menjadi _instance_ persoalan TSDP.
> >     - Transformasi ini memberi sugesti bahwa **jika TSDP dapat diselesaikan dalam waktu polinomial, maka HCP juga dapat diselesaikan dalam waktu polinomial**. Karena HCP sudah terbukti NPC (dan sulit diselesaikan dalam waktu polinomial), ini mendukung bahwa TSDP juga NPC.
> > - Sejauh ini, lebih dari 300 persoalan sudah terbukti NP-Complete.
> > - **Daftar persoalan yang termasuk NP-Complete** (semuanya adalah _decision problem_):
> >     - SAT (Satisfiable Problem)
> >     - TSP (Travelling Salesperson Problem)
> >     - HAMILTONIAN CYCLE problem
> >     - PARTITION problem
> >     - SUM OF SUBSET problem
> >     - CLIQUE problem
> >     - GRAPH COLORING problem
> >     - Vertex Cover
> >     - N-PUZZLE
> >     - Knapsack problem
> >     - Subgraph isomorphism problem
> >     - MINESWEEPER
> > - Kembali ke definisi NPC: X dikatakan NPC jika X termasuk NP, dan setiap persoalan NP dapat direduksi ke X dalam waktu polinomial. Definisi ini menegaskan bahwa **jika algoritma waktu-polinomial ditemukan untuk suatu persoalan X yang NPC, maka P=NP akan terbukti**.
> > 
> > **13. Kelas Persoalan NP-Hard**
> > 
> > - **NP-hard** adalah **himpunan persoalan yang sesukar NPC, namun tidak harus berupa persoalan keputusan**. Bisa berupa persoalan optimasi atau persoalan lainnya.
> > - Umumnya memiliki **kompleksitas algoritma dengan waktu eksponensial**.
> > - **Contoh:** TSP (versi optimasi, bukan _decision problem_) adalah NP-Hard. Semua persoalan NP-Complete adalah subset dari NP-Hard (karena mereka adalah persoalan keputusan yang memenuhi kriteria NP-Hard), tetapi tidak semua NP-Hard adalah NPC.
> > 
> > **14. Latihan** Sumber juga menyertakan beberapa contoh latihan (diambil dari soal UAS) terkait materi ini untuk menguji pemahaman tentang hubungan antara P, NP, dan NP-Complete.
 
> [!cornell] Summary
> **P** adalah subset dari **NP** (P⊆NP), yang berarti masalah yang dapat diselesaikan secara polinomial juga dapat diverifikasi secara polinomial. Pertanyaan apakah P=NP atau P=NP adalah salah satu masalah terbuka terbesar di ilmu komputer. **NP-Complete (NPC)** adalah set persoalan paling sulit dalam NP, di mana setiap masalah NP dapat direduksi ke dalamnya dalam waktu polinomial. Jika satu masalah NPC dapat diselesaikan secara polinomial, semua masalah NP dapat diselesaikan secara polinomial. **NP-Hard** adalah set masalah yang sesulit NPC tetapi tidak harus persoalan keputusan (bisa optimasi) dan umumnya memiliki kompleksitas eksponensial; NPC adalah subset dari NP-Hard.

---

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Aspek Teknis Lanjutan:
> 
> - **Intuisi di Balik P vs NP:**
>     - P: "Mudah dipecahkan." (Anda bisa menemukan solusi dengan cepat.)
>     - NP: "Mudah diverifikasi." (Anda bisa memeriksa jawaban yang diberikan dengan cepat, meskipun menemukan jawaban itu sendiri mungkin sulit.)
>     - Pertanyaan P=NP pada dasarnya adalah: Jika mudah untuk memeriksa suatu solusi, apakah juga mudah untuk menemukan solusi itu?
> - **Pentingnya Reduksi Polinomial:** Konsep reduksi polinomial adalah inti dari pembuktian NP-Completeness. Ini menunjukkan bahwa jika ada algoritma polinomial untuk persoalan X, maka algoritma yang sama (setelah transformasi) dapat digunakan untuk menyelesaikan persoalan Y (yang direduksi ke X) dalam waktu polinomial juga. Ini membangun "rantai" kesulitan di mana jika satu NPC dipecahkan, semua NPC akan runtuh.
> - **Aplikasi Praktis NP-Completeness:** Ketika sebuah persoalan terbukti NP-Complete, itu memberitahu kita bahwa kemungkinan besar tidak ada algoritma polinomial yang efisien untuk menyelesaikannya. Daripada terus mencari algoritma eksak yang cepat, kita bisa beralih ke pendekatan lain seperti:
>     - **Algoritma Aproksimasi:** Mencari solusi yang "cukup baik" tetapi tidak selalu optimal.
>     - **Heuristik:** Aturan praktis yang sering bekerja dengan baik tetapi tanpa jaminan optimalitas atau kecepatan.
>     - **Pembatasan Masukan:** Mencari solusi eksak untuk kasus khusus atau ukuran masukan yang kecil.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks Klasik:**
>     - **"Computers and Intractability: A Guide to the Theory of NP-Completeness" oleh Michael R. Garey dan David S. Johnson:** Ini adalah referensi klasik dan komprehensif untuk teori NP-Completeness.
>     - **"Introduction to Algorithms" oleh Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, dan Clifford Stein (CLRS):** Bagian tentang teori NP-Completeness memberikan penjelasan yang kuat dan rinci.
> - **Online Resources:**
>     - **Clay Mathematics Institute - Millennium Prize Problems:** Detail lebih lanjut tentang masalah P vs NP dan mengapa itu penting.
>     - **Stanford University - CS Theory Courses:** Banyak materi kuliah online yang membahas topik ini secara mendalam.
> 
> #### Eksplorasi Mandiri:
> 
> - **Pelajari Lebih Lanjut tentang Reduksi:** Pilih dua persoalan NPC yang berbeda (misalnya, _Vertex Cover_ dan _Clique Problem_) dan coba pahami atau cari tahu bagaimana satu dapat direduksi ke yang lain. Ini akan memperkuat pemahaman Anda tentang reduksi polinomial.
> - **Cari Algoritma Aproksimasi:** Untuk salah satu persoalan NP-Hard (misalnya, _Knapsack Problem_ atau _TSP_), cari tahu bagaimana algoritma aproksimasi bekerja. Bagaimana mereka mengorbankan optimalitas untuk mendapatkan kecepatan?
> - **Pikirkan Masalah Sehari-hari:** Coba identifikasi persoalan-persoalan dalam kehidupan nyata Anda atau di bidang studi Anda yang mungkin termasuk dalam kategori NP-Hard. Bagaimana pendekatan yang berbeda (misalnya, heuristic, batasan) digunakan untuk menanganinya?