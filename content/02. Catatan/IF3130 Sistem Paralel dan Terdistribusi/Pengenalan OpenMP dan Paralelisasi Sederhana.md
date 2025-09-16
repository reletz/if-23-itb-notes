---
type: Note

cssclasses:
- cornell-notes
---
_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa itu OpenMP?
> >     
> > - Apa itu "Pragma"?
> >     
> > - Bagaimana cara kerja `#pragma omp parallel`?
> >     
> > - Bagaimana alur eksekusi OpenMP?
> >     
> > - Apa itu _team_, _master_, & _slave_?
> >     
> > - Bagaimana kompilasi & eksekusi program OpenMP?
> >     
> > - Cara membuat kode portabel?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory - OpenMP" (Hal. 3-14)
> >     
> 
> > ### Apa itu OpenMP?
> >
> > **OpenMP** (Open Multi-Processing) adalah sebuah **API** (Application Programming Interface) yang dirancang untuk menyederhanakan pemrograman paralel pada sistem **shared-memory**. Berbeda dengan Pthreads yang bersifat _low-level_ dan manual, OpenMP bekerja pada level yang lebih tinggi, sering kali hanya dengan menambahkan instruksi khusus ke kode serial yang sudah ada. Tujuannya adalah membuat paralelisasi menjadi lebih mudah dan portabel.
> >
> > ### Konsep Inti: Pragmas
> >
> > OpenMP sebagian besar diimplementasikan menggunakan **Pragmas**.
> >
> > - **Definisi**: Pragma (`#pragma`) adalah sebuah direktif atau instruksi khusus untuk _compiler_. Ini bukan bagian dari standar bahasa C, melainkan ekstensi.
> >     
> > - **Sifat Elegan**: Jika sebuah _compiler_ tidak mengenali atau tidak mendukung OpenMP, ia akan **mengabaikan pragma tersebut**. Artinya, kode Anda akan tetap bisa dikompilasi dan berjalan sebagai program serial biasa. Ini membuat kode OpenMP sangat portabel.
> >     
> >
> > ### Direktif Dasar: `#pragma omp parallel`
> >
> > Ini adalah direktif paling fundamental di OpenMP. Saat _compiler_ menemukannya, ia akan melakukan hal berikut:
> >
> > 1. Menandai blok kode terstruktur yang mengikutinya (misalnya, blok `{...}`).
> >     
> > 2. Membuat sekelompok _thread_ baru (disebut _team_).
> >     
> > 3. Setiap _thread_ dalam _team_ tersebut akan mengeksekusi blok kode yang sama secara bersamaan.
> >     
> >
> > ### Alur Eksekusi: Model Fork-Join
> >
> > Program OpenMP mengikuti model _fork-join_:
> >
> > 1. **Mulai Serial**: Program dimulai dengan satu _thread_ utama, yang disebut **master thread**.
> >     
> > 2. **Fork (Membelah)**: Saat bertemu `#pragma` omp `parallel`, _master thread_ akan "membelah diri" dan membuat beberapa **slave threads**.
> >     
> > 3. **Eksekusi Paralel**: _Master_ thread bersama dengan para _slave threads_ membentuk sebuah **team** dan mengeksekusi blok paralel secara bersamaan.
> >     
> > 4. **Join (Bergabung)**: Di akhir blok paralel, terdapat _barrier_ implisit. Semua _thread_ akan menunggu di sini. Setelah semua _thread_ selesai, para _slave threads_ akan "dihancurkan", dan hanya _master thread_ yang melanjutkan eksekusi bagian serial berikutnya.
> >     
> >
> > ### Kompilasi dan Eksekusi
> >
> > Untuk mengaktifkan OpenMP, kita perlu memberitahu _compiler_ menggunakan _flag_ khusus.
> >
> > - **Kompilasi (GCC)**: `gcc -g -Wall -fopenmp -o nama_program program.c`
> >     
> >     - Flag `-fopenmp` sangat penting; tanpanya, pragma akan diabaikan.
> >         
> > - **Eksekusi**: `./nama_program <jumlah_thread>`
> >     
> >     - Jumlah _thread_ bisa ditentukan melalui klausa `num_threads()` pada pragma atau melalui _environment variable_ `OMP_NUM_THREADS`.
> >         
> >
> > ### Menjaga Kode Tetap Portabel
> >
> > OpenMP mendefinisikan sebuah makro `_OPENMP`. Kita bisa menggunakannya untuk menulis kode yang bisa beradaptasi, misalnya untuk memanggil fungsi OpenMP hanya jika OpenMP diaktifkan.
> >
> > ```c
> > #ifdef _OPENMP
> >   // Kode ini hanya akan dikompilasi jika -fopenmp digunakan
> >   #include <omp.h>
> >   int my_rank = omp_get_thread_num();
> > #else
> >   // Fallback untuk kompiler non-OpenMP
> >   int my_rank = 0;
> > #endif
> > ```

> [!cornell] #### Summary
> OpenMP adalah API tingkat tinggi yang menyederhanakan pemrograman paralel pada _**shared memory**_ dengan menggunakan _**pragmas**_, di mana direktif inti `#pragma omp parallel` mengimplementasikan model _**fork-join**_ untuk mengeksekusi blok kode secara konkuren oleh sebuah _**team**_ thread. Kode OpenMP bersifat portabel karena _**compiler**_ non-OpenMP akan mengabaikan _**pragmas**_, dan kompilasinya diaktifkan melalui flag `-fopenmp`.

> [!ad-libitum]- Additional Information
> 
> #### Contoh Kode: "Hello World"
> 
> Berikut adalah program "Hello World" kanonis di OpenMP yang menunjukkan konsep-konsep di atas:
> 
> ```c
> #include <stdio.h>
> #include <stdlib.h>
> #include <omp.h> // Header untuk fungsi OpenMP
>
> void Hello(void); // Prototipe fungsi yang akan dijalankan thread
>
> int main(int argc, char* argv[]) {
> 
> 	int thread_count = strtol(argv[1], NULL, 10);
>	
> 	// Fork: Buat sebuah team dengan 'thread_count' thread.
> 	// Setiap thread akan menjalankan fungsi Hello().
> 	#pragma omp parallel num_threads(thread_count)
> 	{
> 	    Hello();
> 	} 
> 	// Join: Barrier implisit di sini. Master thread menunggu semua slave.
> 	return 0;
> }
>
> void Hello(void) {
> 
> 	// Fungsi OpenMP untuk mendapatkan ID thread (rank)
> 	
> 	int my_rank = omp_get_thread_num();
> 	
> 	// Fungsi OpenMP untuk mendapatkan total thread dalam team
> 	
> 	int thread_count = omp_get_num_threads();
>	
> 	printf("Hello from thread %d of %d\n", my_rank, thread_count);
> }
> 
> ```
> 
> Output dari program ini tidak akan pernah bisa diprediksi urutannya, karena sistem operasi bebas menjadwalkan eksekusi setiap thread.
> 
>
> #### Kontrol Jumlah Thread
>
> Selain menggunakan klausa `num_threads(count)` di dalam kode, Anda juga bisa mengontrol jumlah thread dari luar program menggunakan _environment variable_. Ini lebih fleksibel karena tidak perlu kompilasi ulang.
>
> ```env
> # Set variabel OMP_NUM_THREADS ke 8 untuk sesi terminal ini
> export OMP_NUM_THREADS=8
> ```
> 
> ```bash
> # Jalankan program, ia akan menggunakan 8 thread
> ./nama_program
> ```
> 
> Prioritasnya adalah: `num_threads()` \> `OMP_NUM_THREADS` \> *default sistem*