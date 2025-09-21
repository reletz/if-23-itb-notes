---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu 'state' dalam Local Search?
> >     
> > - Bagaimana nilai sebuah 'state' ditentukan?
> >     
> > - Apa contoh fungsi heuristik (h)?
> >     
> > - Apa itu 'successor'?
> >     
> > - Apa itu 'neighbor'?
> >     
> > - Apa saja jenis-jenis 'neighbor'?
> >     
> >
> > ## Reference Points
> >
> > - IF3170_LocalSearch.pdf (Slide 9-17)
> >     
> 
> > ### Konsep State dalam Local Search
> >
> > Dalam konteks Local Search, sebuah **state** merepresentasikan sebuah **konfigurasi solusi yang lengkap (**_**complete configuration**_**)**. Ini berbeda fundamental dari Classical Search di mana state bisa bersifat parsial atau inkremental.
> > 
> > ![[Pasted image 20250921215929.png]]
> > 
> > - **Prinsip**: Algoritma hanya menyimpan satu _current state_ dan berupaya memperbaikinya.
> >     
> > - **Contoh (8-Queens Problem)**: Sebuah _state_ bukanlah papan catur dengan 1, 2, atau 3 ratu, melainkan sebuah papan catur di mana **selalu ada 8 ratu** yang sudah ditempatkan (misalnya, satu ratu di setiap kolom). Solusi akhir (_final state_) adalah tujuan dari pencarian ini.
> >     
> >
> > ### State Value (Nilai Heuristik, h)
> >
> > Setiap _state_ memiliki nilai yang mengukur "kualitas" atau "seberapa bagus" konfigurasi tersebut. Nilai ini dihitung menggunakan **fungsi heuristik (h)** atau _objective function_. Tujuannya adalah mencari _state_ dengan nilai global optimum (maksimum atau minimum).
> >
> > - **Tujuan**: Untuk memaksimalkan nilai. Oleh karena itu, kita sering mendefinisikan heuristik sebagai nilai negatif dari "biaya" atau "kesalahan".
> >     
> > - **Contoh (8-Queens Problem)**:
> >     
> >     - $h =$ - (jumlah pasangan ratu yang saling menyerang)
> >         
> >     - Jika ada 1 pasang ratu yang saling menyerang, maka $h=−1$.
> >     - Jika tidak ada ratu yang saling menyerang, maka $h=0$. Ini adalah **global maximum** dan merupakan solusi dari masalah tersebut.
> >         
> > ![[Pasted image 20250910102934.png]]
> > _Pada gambar di atas, hanya ada satu pasang ratu yang saling serang (Q4 dan Q7), sehingga nilai heuristik untuk state ini adalah h = -1._
> >
> > ### Aksi: Pindah ke Neighbor
> >
> > Aksi dalam Local Search adalah bergerak dari _current state_ ke _state_ tetangganya (_neighbor state_). Untuk memahami _neighbor_, kita harus terlebih dahulu memahami konsep _successor_.
> >
> > - **Successor**: adalah **semua kemungkinan state** yang dapat dihasilkan dari _current state_ dengan melakukan satu aksi sederhana.
> > 	- **Contoh (8-Queens)**: Aksi didefinisikan sebagai "memindahkan satu ratu ke kotak lain di dalam kolom yang sama". Karena ada 8 ratu, dan setiap ratu bisa pindah ke 7 kotak lain di kolomnya, maka setiap *state* memiliki $8 \times 7 = 56$ *successors*.
> >
> > - **Neighbor**: adalah _successor_ yang dipilih oleh algoritma untuk menjadi kandidat _state_ berikutnya. Definisi _neighbor_ bergantung pada strategi algoritma yang digunakan. Ada dua pendekatan umum:
> > 
> > 	1.  **Neighbor sebagai Highest-Valued Successor**:
> > 		- **Definisi**: Algoritma akan mengevaluasi semua 56 *successor*, dan yang memiliki nilai **h** tertinggi akan dipilih sebagai *neighbor*.
> > 		- **Karakteristik**: Ini adalah pendekatan "serakah" (*greedy*). Jika ada beberapa *successor* dengan nilai tertinggi yang sama, salah satunya bisa dipilih secara acak.
> > 		- **Penggunaan**: Umumnya digunakan dalam algoritma **Steepest-Ascent Hill Climbing**.
> > 	2.  **Neighbor sebagai Random Successor**:
> > 		- **Definisi**: Algoritma tidak mengevaluasi semua *successor*, melainkan hanya memilih **satu *successor* secara acak** sebagai *neighbor*.
> > 		- **Karakteristik**: Pendekatan ini tidak *greedy* dan memungkinkan eksplorasi yang lebih luas, meskipun tidak selalu memilih langkah terbaik.
> > 		- **Penggunaan**: Umumnya digunakan dalam algoritma **Stochastic Hill Climbing** dan **Simulated Annealing**.
> > 
> > ![[Pasted image 20250921220341.png]]

> [!cornell] #### Summary
> Dalam Local Search, sebuah _**state**_ adalah konfigurasi solusi yang lengkap dan dievaluasi menggunakan _**nilai heuristik (h)**_. Perpindahan antar-_**state**_ terjadi dengan memilih sebuah _**neighbor**_, yang merupakan _**state**_ terpilih dari himpunan semua kemungkinan _**successor**_ (hasil dari satu langkah perubahan). Cara pemilihan _**neighbor**_ ini—apakah sebagai _**successor**_ dengan nilai terbaik atau sebagai _**successor**_ acak—menentukan strategi dan sifat dari algoritma pencarian yang digunakan.

> [!ad-libitum]- Additional Information
> 
> #### Pentingnya Desain Fungsi Heuristik (h)
> 
> Kualitas dan kecepatan Local Search sangat bergantung pada desain fungsi heuristik. Fungsi `h` yang baik harus:
> 
> - **Cepat Dihitung**: Karena akan dievaluasi berulang kali untuk banyak _successor_.
>     
> - **Berkorelasi Kuat dengan Solusi Sebenarnya**: Nilai `h` harus secara akurat mencerminkan seberapa "dekat" sebuah _state_ dengan solusi optimal. Lanskap yang diciptakan oleh fungsi `h` harus "mulus" dan mengarahkan pencarian ke arah global maximum. Heuristik yang buruk dapat menciptakan banyak _local maxima_ yang menipu.
>     
> 
> #### Trade-off: Highest-Valued vs. Random Successor
> 
> - **Highest-Valued Successor (Greedy)**: Cepat dalam menemukan puncak bukit (solusi), tetapi sangat rentan terjebak di _local maximum_ pertama yang ditemui. Eksplorasinya terbatas.
>     
> - **Random Successor (Stochastic)**: Lebih lambat untuk mencapai puncak karena bisa jadi mengambil langkah yang tidak optimal. Namun, kemampuannya untuk "melompat" secara acak memberinya kesempatan lebih baik untuk menghindari dan keluar dari _local maxima_.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Perhatikan gambar papan catur di bawah ini dari slide materi. Coba hitung secara manual nilai `h` (jumlah pasangan ratu yang saling serang) untuk konfigurasi tersebut.
>     
> - Pikirkan masalah lain, misalnya Traveling Salesperson Problem (TSP). Apa yang akan menjadi representasi _state_ yang lengkap? Bagaimana Anda mendefinisikan _successor_ dan _neighbor_? Apa fungsi heuristik (`h`) yang masuk akal untuk TSP?
>