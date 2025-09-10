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
> > - Apa itu Genetic Algorithm (GA)?
> >     
> > - Apa analogi biologisnya?
> >     
> > - Bagaimana 'state' direpresentasikan?
> >     
> > - Apa itu 'fitness function'?
> >     
> > - Apa itu 'population'?
> >     
> > - Bagaimana proses 'selection' bekerja?
> >     
> > - Apa itu 'crossover'?
> >     
> > - Apa itu 'mutation'?
> >     
> >
> > ## Reference Points
> > 
> > - IF3170-Materi03-Seg05-BeyondClassicalSearch.pdf
> >     
> 
> > ### Konsep Dasar Genetic Algorithm (GA)
> > 
> > **Genetic Algorithm (GA)** adalah metode pencarian yang terinspirasi dari proses evolusi biologis dan seleksi alam. Berbeda dengan algoritma Local Search lainnya yang bekerja pada satu _state_, GA bekerja secara paralel pada sekumpulan _state_ yang disebut **populasi**.
> > 
> > - **Analogi Biologis**: Anggap setiap _state_ sebagai "individu" dalam sebuah populasi. Individu yang paling "fit" (memiliki solusi terbaik) akan memiliki kesempatan lebih besar untuk bereproduksi dan mewariskan sifat-sifatnya ke generasi berikutnya.
> >     
> > 
> > ### Representasi State (Individu/Kromosom)
> > 
> > Dalam GA, sebuah _state_ (individu) direpresentasikan sebagai sebuah string, yang disebut **kromosom**. String ini bisa berupa biner (0 dan 1) atau format lain.
> > 
> > - **Contoh (8-Queens)**: Sebuah _state_ direpresentasikan sebagai string dengan 8 angka, misal `32752411`. Angka ke-`i` pada string merepresentasikan posisi baris dari ratu di kolom `i`.
> >     
> > 
> > ### Fitness Function
> > 
> > **Fitness Function** adalah fungsi objektif yang mengukur seberapa "baik" atau "fit" sebuah individu (solusi). Nilai yang lebih tinggi menunjukkan individu yang lebih baik.
> > 
> > - **Contoh (8-Queens)**: Fitness dihitung dari jumlah pasangan ratu yang **tidak saling menyerang**.
> >     
> >     - Jumlah total pasangan ratu yang mungkin adalah (8×7)/2=28.
> >         
> >     - Jika `Fitness(state) = 28`, maka itu adalah solusi global (global maximum).
> >         
> >     - Untuk `state = 32752411`, ada 5 pasang yang menyerang, jadi `Fitness = 28 - 5 = 23`.
> >         
> > 
> > ### Proses Evolusi dalam Genetic Algorithm
> > 
> > GA bekerja dalam sebuah siklus generasi yang terdiri dari tiga langkah utama: Seleksi, Crossover, dan Mutasi.
> > 
> > 1. **Initial Population**: Algoritma dimulai dengan membuat `k` individu secara acak.
> >     
> > 2. **Selection (Seleksi)**:
> >     
> >     - **Tujuan**: Memilih individu ("orang tua") dari populasi saat ini untuk menciptakan generasi berikutnya.
> >         
> >     - **Mekanisme**: Individu dengan _fitness score_ yang lebih tinggi memiliki probabilitas lebih besar untuk terpilih. Salah satu metode populer adalah **Roulette Wheel Selection**, di mana setiap individu mendapatkan "potongan kue" proporsional dengan nilai fitness-nya.
> >         
> > 3. **Crossover (Pindah Silang)**:
> >     
> >     - **Tujuan**: Menggabungkan "materi genetik" dari dua orang tua untuk menciptakan keturunan (offspring) yang baru.
> >         
> >     - **Mekanisme**: Sebuah titik potong (_crossover point_) dipilih secara acak pada kromosom. Offspring diciptakan dengan mengambil bagian awal dari kromosom orang tua pertama dan bagian akhir dari orang tua kedua.
> >         
> >     - **Contoh**:
> >         
> >         - Parent 1: `3275`|`2411`
> >             
> >         - Parent 2: `2474`|`8552`
> >             
> >         - Offspring 1: `3275`|`8552`
> >             
> > 4. **Mutation (Mutasi)**:
> >     
> >     - **Tujuan**: Memperkenalkan variasi baru ke dalam populasi untuk mencegah konvergensi dini (terjebak di solusi yang homogen) dan membantu keluar dari _local maximum_.
> >         
> >     - **Mekanisme**: Setelah _crossover_, ada probabilitas kecil bahwa satu "gen" (satu karakter dalam string) pada offspring akan diubah secara acak. Misalnya, `32748552` bisa bermutasi menjadi `3274**1**552`.
> >         
> > 
> > Proses ini diulang terus-menerus, menciptakan populasi baru di setiap generasi, hingga ditemukan individu yang cukup fit atau batas waktu/generasi tercapai.

> [!cornell] #### Summary
> Genetic Algorithm adalah sebuah teknik pencarian evolusioner yang mengelola sebuah _**populasi**_ solusi (individu), di mana setiap individu dievaluasi oleh _**fitness function**_. Melalui proses iteratif yang meniru seleksi alam—menggunakan operator Selection (memilih yang terbaik), Crossover (menggabungkan solusi), dan Mutation (memperkenalkan keragaman)—GA secara efektif menjelajahi ruang pencarian yang kompleks untuk menemukan solusi optimal atau mendekati optimal.

> [!ad-libitum]- Additional Information
> 
> #### Kapan Genetic Algorithm Unggul?
> 
> GA sangat efektif untuk masalah optimisasi dan pencarian di mana:
> 
> - Ruang pencarian sangat besar, kompleks, atau tidak dipahami dengan baik.
>     
> - Pendekatan tradisional (seperti Hill Climbing) mudah terjebak di _local optima_ yang buruk.
>     
> - Tidak ada jaminan solusi matematis yang efisien.
>     
>     Contoh: Desain rekayasa, penjadwalan, optimisasi rute, dan pelatihan beberapa model machine learning.
>     
> 
> #### Parameter Tuning
> 
> Kinerja GA sangat bergantung pada pengaturan parameternya, seperti:
> 
> - **Ukuran Populasi**: Terlalu kecil bisa konvergen terlalu cepat, terlalu besar bisa lambat.
>     
> - **Tingkat Crossover**: Probabilitas dua orang tua akan melakukan crossover.
>     
> - **Tingkat Mutasi**: Probabilitas sebuah gen akan bermutasi. Tingkat mutasi yang terlalu tinggi dapat mengubah pencarian menjadi random walk, sementara terlalu rendah bisa menyebabkan stagnasi.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Pikirkan bagaimana Anda akan merepresentasikan solusi untuk Traveling Salesperson Problem (TSP) sebagai sebuah "kromosom". Apa yang akan menjadi _fitness function_-nya?
>     
> - Bandingkan GA dengan Simulated Annealing. Keduanya adalah metode stokastik. Apa perbedaan fundamental dalam cara mereka menjelajahi ruang pencarian? (Petunjuk: Pikirkan tentang jumlah solusi yang dilacak pada satu waktu).
>