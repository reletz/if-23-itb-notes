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
> > - Apa itu paralelisasi loop?
> >     
> > - Bagaimana cara kerja `#pragma omp parallel for`?
> >     
> > - Bagaimana OpenMP membagi iterasi?
> >     
> > - Apa saja aturan loop yang bisa diparalelkan?
> >     
> > - Apa contoh kasusnya?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory - OpenMP" (Hal. 15-24, 35-42, 48-53)
> >     
> 
> > ### Paralelisasi Loop: "Bagi Rata Tugas"
> >
> > Sebagian besar program komputasi menghabiskan waktunya di dalam _loop_. Ide dari paralelisasi loop adalah membagi total iterasi sebuah loop kepada beberapa _thread_ untuk dikerjakan secara bersamaan. Jika sebuah loop memiliki 1000 iterasi dan kita punya 4 _thread_, maka setiap _thread_ bisa mengerjakan 250 iterasi. Ini adalah sumber utama percepatan dalam banyak aplikasi ilmiah dan teknik.
> >
> > ### Direktif `#pragma omp parallel for`
> >
> > Direktif ini adalah "jalan pintas" yang menggabungkan `#pragma omp parallel` dan sebuah _work-sharing construct_ khusus untuk `for loop`. Saat _compiler_ menemukannya, ia akan:
> >
> > 1. **Fork**: Membuat sebuah _team_ thread (sama seperti `#pragma omp parallel`).
> >     
> > 2. **Divide & Conquer**: Secara otomatis mempartisi (membagi) iterasi dari `for loop` yang mengikutinya di antara para _thread_ dalam _team_.
> >     
> > 3. **Join**: Setelah semua iterasi selesai, _thread-thread_ akan sinkronisasi di _barrier_ implisit pada akhir loop, lalu bergabung kembali.
> >     
> >
> > ### Studi Kasus: Aturan Trapesium
> >
> > Mari kita lihat bagaimana sebuah loop serial untuk menghitung integral dengan aturan trapesium bisa diubah.
> >
> > **Versi Serial:**
> >
> > ```c
> > approx = (f(a) + f(b)) / 2.0;
> > for (i = 1; i <= n - 1; i++) {
> >     approx += f(a + i * h);
> > }
> > approx = h * approx;
> > ```
> >
> > **Versi Paralel dengan OpenMP:**
> >
> > ```c
> > approx = (f(a) + f(b)) / 2.0;
> > // Cukup tambahkan pragma ini!
> > #pragma omp parallel for num_threads(thread_count) reduction(+: approx)
> > for (i = 1; i <= n - 1; i++) {
> >     approx += f(a + i * h);
> > }
> > approx = h * approx;
> > ```
> >
> > Dengan satu baris pragma, loop tersebut kini berjalan secara paralel. Klausa `reduction` (akan dibahas di catatan berikutnya) digunakan untuk menggabungkan hasil `approx` dari setiap _thread_ secara aman.
> >
> > ### Aturan & Batasan Loop
> >
> > Tidak semua `for loop` bisa diparalelkan. OpenMP memiliki aturan ketat untuk memastikan hasilnya benar. Loop harus memiliki bentuk "kanonis":
> >
> > - **Bentuk Loop**: Harus `for (var = start; var op end; var incr)`.
> >     
> > - **Kondisi (`op`)**: Harus `<`, `<=`, `>`, atau `>=`.
> >     
> > - **Peningkatan (`incr`)**: Harus `++var`, `var++`, `--var`, `var--`, `var += C`, `var -= C`, `var = var + C`.
> >     
> > - **Deterministik**: Nilai `start`, `end`, dan `incr` tidak boleh berubah selama eksekusi loop.
> >     
> > - **Variabel Loop (`var`)**: Tidak boleh diubah secara manual di dalam badan loop.
> >     
> > - **Independensi Iterasi**: Ini yang paling penting. Hasil dari satu iterasi **tidak boleh bergantung** pada hasil iterasi lain. Contoh loop yang **tidak bisa** diparalelkan adalah deret Fibonacci: `fibo[i] = fibo[i-1] + fibo[i-2];`, karena `fibo[i]` butuh hasil dari `i-1` dan `i-2`.
> >     

> [!cornell] #### Summary
> OpenMP menyederhanakan paralelisasi loop secara drastis melalui direktif `#pragma omp parallel for`, yang secara otomatis membuat _**team thread**_ dan membagi iterasi loop di antara mereka. Agar valid dan menghasilkan output yang benar, loop harus memiliki bentuk kanonis dan yang terpenting, iterasinya harus independen satu sama lain, karena OpenMP tidak memeriksa dependensi data antar iterasi.

> [!ad-libitum]- Additional Information
> 
> #### Studi Kasus Lanjutan: Odd-Even Transposition Sort
> 
> Algoritma sorting ini menarik karena loop di dalamnya memiliki dependensi, tetapi dependensinya terstruktur. Sorting ini bekerja dalam beberapa fase. Di setiap fase, ada dua sub-fase (ganjil dan genap) yang membandingkan dan menukar elemen-elemen yang berdekatan.
> 
> ```c
> // Outer loop (serial) karena setiap fase bergantung pada fase sebelumnya
> for (phase = 0; phase < n; phase++) {
>     if (phase % 2 == 0) { // Fase Genap
>         // Inner loop ini bisa diparalelkan karena semua perbandingan (a[0]-a[1], a[2]-a[3], ...) independen
>         #pragma omp parallel for
>         for (i = 1; i < n; i += 2)
>             if (a[i-1] > a[i]) swap(&a[i-1], &a[i]);
>     } else { // Fase Ganjil
>         // Inner loop ini juga bisa diparalelkan
>         #pragma omp parallel for
>         for (i = 1; i < n-1; i += 2)
>             if (a[i] > a[i+1]) swap(&a[i], &a[i+1]);
>     }
> }
> ```
> 
> Ini adalah contoh bagus di mana tidak seluruh algoritma bisa diparalelkan, tetapi bagian-bagian komputasi intensif di dalamnya (inner loop) bisa.
> 
> #### Apa yang Terjadi Jika Aturan Dilanggar?
> 
> Jika Anda mencoba memparalelkan loop dengan dependensi iterasi (seperti Fibonacci), OpenMP tidak akan memberikan peringatan atau error saat kompilasi. Namun, program Anda akan menghasilkan **hasil yang salah** karena _race condition_. Misalnya, `thread 0` menghitung `fibo[2]` sementara `thread 1` menghitung `fibo[10]`. `thread 1` akan membaca nilai `fibo[8]` dan `fibo[9]` yang mungkin belum dihitung (masih nol), sehingga `fibo[10]` menjadi salah. OpenMP menyerahkan tanggung jawab untuk memastikan independensi iterasi sepenuhnya kepada programmer.
> 
> #### Eksplorasi Mandiri
> 
> - Lihat kembali kode perkalian matriks-vektor dari materi Pthreads. Bagaimana Anda akan memparalelkannya menggunakan `#pragma omp parallel for`? Loop mana yang akan Anda targetkan? Apakah ada potensi _race condition_?