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
> > - Apa itu _scope_ variabel di OpenMP?
> >     
> > - Beda `shared` & `private`?
> >     
> > - Apa itu _race condition_ agregasi?
> >     
> > - Bagaimana `reduction` bekerja?
> >     
> > - Operator `reduction` apa saja yang ada?
> >     
> > - Mengapa `default(none)` penting?
> >     
> > - Apa itu _data dependency_?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory - OpenMP" (Hal. 25-34, 41-47)
> >     
> 
> > ### Scope Variabel: Milik Bersama atau Milik Pribadi?
> >
> > Saat sebuah blok kode dijalankan oleh banyak _thread_, kita harus menentukan variabel mana yang bisa diakses bersama dan mana yang harus dimiliki secara pribadi oleh setiap _thread_. Ini disebut **scope**.
> >
> > - **`shared`**: Satu variabel asli yang dapat dilihat dan dimodifikasi oleh semua _thread_. Ini adalah _default_ untuk variabel yang dideklarasikan di luar blok paralel. Potensi _race condition_ sangat tinggi di sini.
> >     
> > - **`private`**: Setiap _thread_ mendapatkan salinan (kopi) variabelnya sendiri yang terpisah. Perubahan yang dibuat oleh satu _thread_ tidak akan terlihat oleh _thread_ lain. Ini adalah _default_ untuk variabel yang dideklarasikan di dalam blok paralel (termasuk variabel iterator loop).
> >     
> >
> > ### Masalah Klasik: Race Condition pada Agregasi
> >
> > Bayangkan setiap _thread_ menghitung hasil lokal (`my_result`) dan mencoba menambahkannya ke hasil global (`global_result`).
> >
> > ```c
> > global_result += my_result; // BAHAYA!
> > ```
> >
> > Operasi ini tidak _atomic_ (instan). Ia terdiri dari tiga langkah: (1) Baca `global_result`, (2) Tambahkan `my_result`, (3) Tulis kembali ke `global_result`. Jika dua _thread_ melakukannya bersamaan, salah satu pembaruan bisa hilang.
> >
> > **Solusi Buruk**: Menggunakan `#pragma omp critical` untuk melindungi baris ini. Cara ini aman, tetapi **sangat lambat** karena memaksa semua _thread_ untuk antre (serialisasi), menghilangkan keuntungan dari paralelisasi.
> >
> > ### Solusi Elegan: Klausa `reduction`
> >
> > `reduction` adalah cara OpenMP yang paling efisien dan tepat untuk melakukan operasi agregasi secara paralel dan aman.
> >
> > - **Cara Kerja**:
> >     
> >     1. Setiap _thread_ secara otomatis mendapatkan salinan `private` dari variabel reduksi (misal, `approx`), yang diinisialisasi sesuai operatornya (0 untuk `+`, 1 untuk `*`).
> >         
> >     2. Setiap _thread_ bekerja hanya pada salinan `private`-nya, tanpa ada _race condition_.
> >         
> >     3. Setelah semua _thread_ selesai, OpenMP akan mengambil semua nilai dari salinan `private` dan menggabungkannya menjadi satu nilai pada variabel global asli menggunakan operator yang ditentukan.
> >         
> >
> > **Sintaks**: `reduction(<operator>:<variabel>)`
> >
> > ```c
> > #pragma omp parallel for reduction(+: approx)
> > for (i = 1; i <= n - 1; i++) {
> >     approx += f(a + i * h); // Aman, 'approx' di sini adalah private
> > }
> > // Di akhir, semua 'approx' private dijumlahkan ke 'approx' global
> > ```
> >
> > - **Operator Umum**: `+`, `*`, `-`, `&` (bitwise AND), `|` (bitwise OR), `^` (bitwise XOR), `&&` (logical AND), `||` (logical OR). Versi lebih baru juga mendukung `min` dan `max`.
> >     
> >
> > ### Praktik Terbaik: `default(none)`
> >
> > Untuk menghindari kesalahan _scope_ yang tidak disengaja, sangat disarankan untuk menggunakan klausa `default(none)`. Klausa ini memaksa _programmer_ untuk secara eksplisit menentukan _scope_ dari setiap variabel yang digunakan di dalam blok paralel.
> >
> > ```c
> > #pragma omp parallel for default(none) \
> >                          private(i, factor) \
> >                          shared(n) \
> >                          reduction(+: sum)
> > ```
> >
> > _Compiler_ akan memberikan _error_ jika ada variabel yang _scope_-nya belum ditentukan. Ini adalah jaring pengaman yang sangat baik.
> >
> > ### Masalah Dependensi Data
> >
> > `reduction` hanya bekerja untuk operasi yang **asosiatif dan komutatif**. Ia tidak bisa menyelesaikan masalah **dependensi data antar iterasi**. Contohnya adalah pada perhitungan deret Fibonacci: `fibo[i] = fibo[i-1] + fibo[i-2]`. Nilai `fibo[i]` bergantung langsung pada hasil iterasi sebelumnya. Memparalelkan loop semacam ini akan menghasilkan jawaban yang salah, bahkan dengan `reduction`. Tanggung jawab untuk memastikan iterasi independen ada pada _programmer_.

> [!cornell] #### Summary
> Manajemen data yang aman dalam OpenMP bergantung pada pengaturan _**scope**_ variabel yang benar (`shared` atau `private`). Untuk operasi agregasi, klausa `reduction` adalah mekanisme yang aman dan efisien untuk menghindari _**race condition**_ dengan memberikan setiap _**thread**_ salinan privat dari variabel dan menggabungkan hasilnya di akhir. Menggunakan `default(none)` adalah praktik krusial untuk memaksa deklarasi _**scope**_ secara eksplisit dan mencegah bug.

> [!ad-libitum]- Additional Information
> 
> #### Studi Kasus: Perhitungan π dengan Dependensi Terselubung
> 
> Perhatikan loop untuk menghitung π berikut:
> 
> ```c
> double sum = 0.0;
> double factor = 1.0;
> // Loop ini memiliki dependensi data pada 'factor'
> for (k = 0; k < n; k++) {
>     sum += factor / (2*k + 1);
>     factor = -factor; // Nilai 'factor' di iterasi k+1 bergantung pada iterasi k
> }
> ```
> 
> Jika kita memparalelkan loop ini, `factor` yang di-_share_ akan menjadi kacau. Solusinya bukan `reduction` pada `factor`, melainkan menghilangkan dependensinya:
> 
> ```c
> double sum = 0.0;
> #pragma omp parallel for reduction(+:sum) private(factor)
> for (k = 0; k < n; k++) {
>     if (k % 2 == 0)
>         factor = 1.0;
>     else
>         factor = -1.0;
>     sum += factor / (2*k + 1); // 'factor' kini private dan dihitung ulang
> }
> ```
> 
> Dengan membuat `factor` menjadi `private` dan menghitung nilainya berdasarkan `k` (variabel iterator loop yang juga implisitnya `private`), kita menghilangkan dependensi antar iterasi dan loop bisa diparalelkan dengan aman.
> 
> #### Eksplorasi Mandiri
> 
> - Coba tulis sebuah program OpenMP untuk mencari nilai maksimum dalam sebuah array besar. Gunakan `reduction` dengan operator `max`. (Petunjuk: Anda mungkin perlu versi OpenMP yang lebih baru atau menggunakan trik dengan `critical section` untuk membandingkan.)
>     
> - Apa yang akan terjadi jika Anda lupa menambahkan `reduction(+: sum)` pada contoh perhitungan π di atas, tetapi variabel `sum` tetap _shared_? Simulasikan skenario _race condition_-nya.