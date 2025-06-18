_Back to_ [[IF2211 Strategi Algoritma]]

> [!cornell] Klasifikasi Persoalan Berdasarkan Kebutuhan Waktu Algoritma
> 
> > ## Questions/Cues
> > 
> > - Klasifikasi Algoritma Berdasarkan Waktu
> > - Algoritma Waktu-Polinom
> > - Contoh Kompleksitas Polinomial
> > - Keunggulan Algoritma Polinomial
> > - Algoritma Waktu-Non-Polinom
> > - Contoh Kompleksitas Non-Polinomial
> > - Persoalan "Sulit"
> > - Contoh Persoalan "Sulit"
> 
> > ### Klasifikasi Persoalan Berdasarkan Kebutuhan Waktu Algoritma
> > 
> > Materi ini membahas klasifikasi persoalan berdasarkan kebutuhan waktu untuk menyelesaikannya menggunakan algoritma, serta memperkenalkan konsep penting dalam ilmu komputer seperti algoritma deterministik dan non-deterministik, persoalan keputusan, serta kelas kompleksitas P, NP, dan NP-Complete.
> > 
> > **1. Algoritma Berdasarkan Kebutuhan Waktu** Berdasarkan kebutuhan waktunya, algoritma untuk menyelesaikan persoalan dapat dibagi menjadi dua kelompok besar:
> > 
> > - **Algoritma waktu-polinom (Polynomial-time algorithms)**
> >     
> >     - Adalah algoritma yang **kompleksitas waktunya dibatasi oleh fungsi polinom** dari ukuran masukannya (n). Ini berarti, seiring bertambahnya ukuran masukan, waktu komputasi tidak akan tumbuh lebih cepat dari suatu fungsi polinomial terhadap n.
> >     - **Contoh kompleksitas waktu:** O(n), O(nlogn), O(n2), O(n3), O(n2.83) (ini adalah contoh, bukan eksponen yang umum, tetapi tetap polinomial).
> >     - Algoritma ini umumnya tergolong "**bagus**" dan **efisien** karena waktu eksekusinya tumbuh relatif lambat seiring dengan peningkatan ukuran masukan. Dalam praktiknya, algoritma ini dianggap layak untuk diterapkan pada masukan yang besar.
> > - **Algoritma waktu-non-polinom (Nonpolynomial-time algorithms)**
> >     
> >     - Adalah algoritma yang **kompleksitas waktunya dibatasi oleh fungsi non-polinom** dari ukuran masukannya (n). Ini berarti waktu komputasinya tumbuh jauh lebih cepat dibandingkan fungsi polinomial.
> >     - **Contoh kompleksitas waktu:** O(n!) (faktorial), O(2n) (eksponensial), O(nn) (untuk n yang kecil, ini juga tumbuh sangat cepat).
> >     - Persoalan yang diselesaikan oleh algoritma ini sering disebut sebagai persoalan "**sulit**" (_hard problem_). Meskipun dapat diselesaikan, waktu yang dibutuhkan menjadi tidak praktis seiring dengan bertambahnya ukuran masukan.
> >     - **Contoh persoalan sulit:**
> >         - **TSP (Travelling Salesperson Problem):** Mencari rute terpendek yang mengunjungi setiap kota tepat satu kali dan kembali ke kota asal.
> >         - **Integer Knapsack Problem:** Memilih item-item untuk dimasukkan ke dalam tas dengan kapasitas terbatas untuk memaksimalkan total nilai.
> >         - **Graph Coloring:** Memberikan warna pada simpul-simpul graf sehingga tidak ada dua simpul bertetangga yang memiliki warna yang sama, dengan jumlah warna minimum.
> >         - **Sum of Subset:** Mencari subset dari sekumpulan angka yang jumlahnya sama dengan target tertentu.
> >         - **Bin Packing Problem:** Mengemas sejumlah item ke dalam wadah (bin) berkapasitas terbatas dengan jumlah wadah minimum.

> [!cornell] Summary
> Algoritma diklasifikasikan berdasarkan kebutuhan waktu menjadi **waktu-polinom** (O(nk)) yang dianggap efisien dan "bagus," serta **waktu-non-polinom** (O(n!),O(2n)) yang diasosiasikan dengan persoalan "sulit" karena kebutuhan waktunya tumbuh eksponensial terhadap ukuran masukan, seperti TSP dan Knapsack.